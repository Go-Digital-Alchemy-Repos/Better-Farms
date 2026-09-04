import type { Request, Response } from "express";
import { z } from "zod";

const contactSubmissionSchema = z
  .object({
    name: z.string().trim().min(1),
    email: z.string().trim().email(),
    subject: z.string().trim().min(1),
    message: z.string().trim().min(1),
  })
  .strict();

const newsletterSubmissionSchema = z
  .object({
    email: z.string().trim().email(),
  })
  .strict();

const BETTER_FARMS_STACK_ID = "better-farms-foundation";

export function getCorePlatformApiOrigin(
  value: string | undefined,
): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    const isLoopback =
      url.protocol === "http:" &&
      ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
    if (
      (!isLoopback && url.protocol !== "https:") ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) {
      return null;
    }
    return url.origin;
  } catch {
    return null;
  }
}

export async function proxyFundAFarmContent(
  req: Request,
  res: Response,
): Promise<void> {
  const origin = getCorePlatformApiOrigin(process.env.CORE_PLATFORM_API_ORIGIN);
  if (!origin) {
    // A site checkout without a configured Core origin intentionally renders its
    // schema-validated bundled content.  Treat that as an empty publication,
    // rather than an upstream outage, so the browser does not report a false
    // failed-resource error during local and isolated review.
    res.status(204).setHeader("Cache-Control", "no-store").end();
    return;
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const headers: Record<string, string> = { Accept: "application/json" };
    const ifNoneMatch = req.get("if-none-match");
    if (ifNoneMatch) headers["If-None-Match"] = ifNoneMatch;
    const upstream = await fetch(
      `${origin}/api/client-site-content/fund-a-farm/fund-a-farm-page`,
      { headers, signal: controller.signal, redirect: "error" },
    );
    res.status(upstream.status);
    for (const name of ["etag", "cache-control", "content-type"]) {
      const value = upstream.headers.get(name);
      if (value) res.setHeader(name, value);
    }
    if (upstream.status === 304) res.end();
    else res.send(await upstream.text());
  } catch {
    res
      .status(503)
      .json({ error: "Published content is temporarily unavailable" });
  } finally {
    clearTimeout(timeout);
  }
}

export async function proxyPlatformFormSubmission(
  req: Request,
  res: Response,
  path: "/api/contact" | "/api/forms/newsletter-signup/submit",
  options: {
    corePlatformApiOrigin?: string;
    corePlatformFormProxyToken?: string;
    fetcher?: typeof fetch;
  } = {},
): Promise<void> {
  const origin = getCorePlatformApiOrigin(
    options.corePlatformApiOrigin ?? process.env.CORE_PLATFORM_API_ORIGIN,
  );
  if (!origin) {
    res
      .status(503)
      .json({ message: "Form submission is temporarily unavailable." });
    return;
  }

  const token = (
    options.corePlatformFormProxyToken ??
    process.env.CORE_PLATFORM_FORM_PROXY_TOKEN
  )?.trim();
  if (!token) {
    res
      .status(503)
      .json({ message: "Form submission is temporarily unavailable." });
    return;
  }

  const parsed =
    path === "/api/contact"
      ? contactSubmissionSchema.safeParse(req.body)
      : newsletterSubmissionSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Please review the form and try again." });
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const upstreamPath =
      path === "/api/contact"
        ? `/api/client-forms/${BETTER_FARMS_STACK_ID}/contact`
        : `/api/client-forms/${BETTER_FARMS_STACK_ID}/newsletter-signup`;
    const upstream = await (options.fetcher ?? fetch)(
      `${origin}${upstreamPath}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Client-Form-Proxy-Token": token,
        },
        body: JSON.stringify(parsed.data),
        signal: controller.signal,
        redirect: "error",
      },
    );
    const responseBody = await upstream.text();
    res.status(upstream.status);
    res.type("application/json").send(responseBody);
  } catch {
    res
      .status(503)
      .json({ message: "Form submission is temporarily unavailable." });
  } finally {
    clearTimeout(timeout);
  }
}
