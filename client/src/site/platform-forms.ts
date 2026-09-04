import { z } from "zod";

const platformResponseSchema = z
  .object({
    message: z.string().min(1),
  })
  .passthrough();

const errorResponseSchema = z
  .object({
    message: z.string().min(1).optional(),
    error: z.string().min(1).optional(),
  })
  .passthrough();

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  subject: z.string().trim().min(1),
  message: z.string().trim().min(1),
});

export const newsletterSubmissionSchema = z.object({
  email: z.string().trim().email(),
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;

export function createBetterFarmsContactSubmission(input: {
  fullName: string;
  email: string;
  organization?: string;
  role?: string;
  referral?: string;
  message: string;
}): ContactSubmission {
  const context = [
    input.organization?.trim() ? `Organization: ${input.organization.trim()}` : null,
    input.role?.trim() ? `Role: ${input.role.trim()}` : null,
    input.referral?.trim() ? `Referred by: ${input.referral.trim()}` : null,
  ].filter((value): value is string => Boolean(value));

  return contactSubmissionSchema.parse({
    name: input.fullName,
    email: input.email,
    subject: "Better Farms website inquiry",
    message: [...context, input.message.trim()].join("\n\n"),
  });
}

export class PlatformFormSubmissionError extends Error {
  constructor(message = "We could not submit your request. Please try again.") {
    super(message);
    this.name = "PlatformFormSubmissionError";
  }
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const result = errorResponseSchema.safeParse(await response.json());
    if (result.success) return result.data.message ?? result.data.error ?? "";
  } catch {
    // A malformed upstream response is intentionally treated as a generic failure.
  }
  return "";
}

export async function submitPlatformForm(
  endpoint: "/api/contact" | "/api/forms/newsletter-signup/submit",
  data: ContactSubmission | z.infer<typeof newsletterSubmissionSchema>,
  fetcher: typeof fetch = fetch,
): Promise<string> {
  const response = await fetcher(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const message = await readErrorMessage(response);
    throw new PlatformFormSubmissionError(message || undefined);
  }

  const result = platformResponseSchema.safeParse(await response.json());
  if (!result.success) {
    throw new PlatformFormSubmissionError();
  }
  return result.data.message;
}
