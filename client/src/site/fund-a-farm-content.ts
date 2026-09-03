import { z } from "zod";

const sitePathSchema = z
  .string()
  .regex(
    /^\/(?!\/)[^\s]*$/,
    "must be an internal site path beginning with one slash",
  );

const httpsUrlSchema = z.string().superRefine((value, context) => {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "must be a credential-free HTTPS URL",
      });
    }
  } catch {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "must be a valid HTTPS URL",
    });
  }
});

export const ctaTargetSchema = z.union([sitePathSchema, httpsUrlSchema]);

const imageSchema = z
  .object({
    src: z.union([sitePathSchema, httpsUrlSchema]),
    alt: z.string().trim().min(1, "image alt text is required").max(240),
  })
  .strict();

export const fundAFarmContentSchema = z
  .object({
    heading: z.string().trim().min(1).max(120),
    introductionLead: z.string().trim().min(1).max(240),
    introductionBody: z.string().trim().min(1).max(400),
    cta: z
      .object({
        label: z.string().trim().min(1).max(80),
        target: ctaTargetSchema,
      })
      .strict(),
    impactStatement: z.string().trim().min(1).max(400),
    heroImage: imageSchema,
  })
  .strict();

export type FundAFarmContent = z.infer<typeof fundAFarmContentSchema>;

export const defaultFundAFarmContent: FundAFarmContent =
  fundAFarmContentSchema.parse({
    heading: "Fund a Farm Today",
    introductionLead: "Your contribution can strengthen a farm for decades.",
    introductionBody:
      "Put your dollars to work and get proof of what you've built.",
    cta: { label: "Donate Now", target: "/contact" },
    impactStatement:
      "501(c)(3) nonprofit organization | 100% of your funds go to farm-level work | ESG impact reporting included",
    heroImage: {
      src: "/sourcePhotos/fund-a-farm/field-sunset.webp",
      alt: "Farmers reviewing plans in a field at sunset",
    },
  });

export function parseFundAFarmContent(input: unknown): FundAFarmContent {
  return fundAFarmContentSchema.parse(input);
}
