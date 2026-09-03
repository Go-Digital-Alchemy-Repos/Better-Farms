import { useEffect, useState } from "react";
import { z } from "zod";
import {
  type FundAFarmContent,
  fundAFarmContentSchema,
} from "./fund-a-farm-content";

const previewEnvelopeSchema = z
  .object({
    type: z.literal("core-platform:client-site-preview"),
    protocolVersion: z.literal("1.0"),
    clientStackId: z.literal("better-farms-foundation"),
    routeId: z.literal("fund-a-farm"),
    componentKey: z.literal("fund-a-farm-page"),
    revision: z.number().int().nonnegative(),
    content: z.unknown(),
  })
  .strict();

export function parseFundAFarmPreviewMessage(
  data: unknown,
  senderOrigin: string,
  trustedAdminOrigin: string,
): FundAFarmContent | null {
  if (!trustedAdminOrigin || senderOrigin !== trustedAdminOrigin) return null;
  const envelope = previewEnvelopeSchema.safeParse(data);
  if (!envelope.success) return null;
  const content = fundAFarmContentSchema.safeParse(envelope.data.content);
  return content.success ? content.data : null;
}

export function useFundAFarmPreview(): FundAFarmContent | null {
  const [content, setContent] = useState<FundAFarmContent | null>(null);

  useEffect(() => {
    const trustedAdminOrigin =
      import.meta.env.VITE_CORE_PLATFORM_ADMIN_ORIGIN?.trim();
    if (!trustedAdminOrigin) return;

    const receivePreview = (event: MessageEvent) => {
      if (event.source !== window.parent) return;
      const parsed = parseFundAFarmPreviewMessage(
        event.data,
        event.origin,
        trustedAdminOrigin,
      );
      if (parsed) setContent(parsed);
    };

    window.addEventListener("message", receivePreview);
    return () => window.removeEventListener("message", receivePreview);
  }, []);

  return content;
}
