import { parseFundAFarmContent } from "@/site/fund-a-farm-content";
import { FundAFarmPage } from "@/pages/FundAFarm";

export const betterFarmsPuckRegistry = {
  id: "better-farms-puck",
  version: "1.0.0",
  themeAdapter: "better-farms-theme",
  components: {
    "fund-a-farm-page": {
      version: "1.0.0",
      fields: {
        heading: { type: "text", required: true },
        introductionLead: { type: "textarea", required: true },
        introductionBody: { type: "textarea", required: true },
        "cta.label": { type: "text", required: true },
        "cta.target": { type: "validated-cta-target", required: true },
        impactStatement: { type: "textarea", required: true },
        "heroImage.src": { type: "image", required: true },
        "heroImage.alt": { type: "text", required: true },
      },
      lockedBehaviors: [
        "site-shell",
        "routing",
        "navigation",
        "donation-selection",
        "form-validation",
        "submission",
        "aria-semantics",
        "responsive-layout",
        "security",
      ],
      validate: parseFundAFarmContent,
      render: (content: unknown) => (
        <FundAFarmPage content={parseFundAFarmContent(content)} />
      ),
    },
  },
} as const;
