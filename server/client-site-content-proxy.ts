import type { Request, Response } from "express";

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
    res
      .status(503)
      .json({ error: "Published content is temporarily unavailable" });
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
