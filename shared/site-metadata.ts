export type SitePageMetadata = {
  title: string;
  description: string;
  robots: "index, follow" | "noindex, nofollow";
};

const siteName = "Better Farms Foundation";
const defaultDescription =
  "Better Farms funds and manages practical farm projects that strengthen resilient local agriculture.";

const pageMetadata: Record<string, SitePageMetadata> = {
  "/": {
    title: siteName,
    description: defaultDescription,
    robots: "index, follow",
  },
  "/how-it-works": {
    title: `How It Works | ${siteName}`,
    description:
      "Learn how Better Farms funds practical farm projects and measures their long-term impact.",
    robots: "index, follow",
  },
  "/about": {
    title: `About Us | ${siteName}`,
    description:
      "Meet the people and principles behind Better Farms Foundation's work with independent farms.",
    robots: "index, follow",
  },
  "/contact": {
    title: `Contact | ${siteName}`,
    description:
      "Contact Better Farms Foundation about farm projects, partnerships, or ways to get involved.",
    robots: "index, follow",
  },
  "/for-farmers": {
    title: `For Farmers | ${siteName}`,
    description:
      "Explore how Better Farms works with independent farmers on practical, durable projects.",
    robots: "index, follow",
  },
  "/fund-a-farm": {
    title: `Fund a Farm | ${siteName}`,
    description:
      "Fund practical farm projects through Better Farms Foundation and see the work your support makes possible.",
    robots: "index, follow",
  },
  "/get-involved": {
    title: `Get Involved | ${siteName}`,
    description:
      "Find ways to support Better Farms Foundation through partnerships, funding, and community involvement.",
    robots: "index, follow",
  },
};

const notFoundMetadata: SitePageMetadata = {
  title: `Page Not Found | ${siteName}`,
  description: defaultDescription,
  robots: "noindex, nofollow",
};

export function getSitePageMetadata(pathname: string): SitePageMetadata {
  return pageMetadata[pathname] ?? notFoundMetadata;
}
