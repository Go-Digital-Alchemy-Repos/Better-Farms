import { useEffect, useState } from "react";
import { z } from "zod";
import {
  defaultFundAFarmContent,
  fundAFarmContentSchema,
  type FundAFarmContent,
} from "./fund-a-farm-content";

const responseSchema = z
  .object({
    stackId: z.literal("better-farms-foundation"),
    routeId: z.literal("fund-a-farm"),
    componentKey: z.literal("fund-a-farm-page"),
    revision: z.number().int().positive(),
    publishedAt: z.string().nullable(),
    content: fundAFarmContentSchema,
  })
  .strict();

export async function fetchPublishedFundAFarmContent(
  fetcher: typeof fetch = fetch,
  signal?: AbortSignal,
): Promise<FundAFarmContent> {
  try {
    const response = await fetcher(
      "/api/client-site-content/fund-a-farm/fund-a-farm-page",
      { headers: { Accept: "application/json" }, signal },
    );
    if (response.status === 204) return defaultFundAFarmContent;
    if (!response.ok) return defaultFundAFarmContent;
    const parsed = responseSchema.safeParse(await response.json());
    return parsed.success ? parsed.data.content : defaultFundAFarmContent;
  } catch (error) {
    if (signal?.aborted) throw error;
    return defaultFundAFarmContent;
  }
}

export function usePublishedFundAFarmContent(): FundAFarmContent {
  const [content, setContent] = useState(defaultFundAFarmContent);
  useEffect(() => {
    const controller = new AbortController();
    void fetchPublishedFundAFarmContent(fetch, controller.signal)
      .then(setContent)
      .catch(() => undefined);
    return () => controller.abort();
  }, []);
  return content;
}
