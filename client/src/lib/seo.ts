import { blogPosts, getBlogPost } from "../data/blog";

export const DEFAULT_SITE_URL =
  "https://better-farms-production.up.railway.app";

export type SeoConfig = {
  path: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  heading: string;
  summary: string;
  robots?: string;
};

export const seoRoutes: SeoConfig[] = [
  {
    path: "/",
    title: "Funding Sustainable Farm Projects | Better Farms",
    description:
      "Farmers get practical project funding and hands-on support. Donors help build resilient farms and receive clear, measurable impact reporting.",
    ogTitle: "Help Build Stronger, More Sustainable Independent Farms",
    ogDescription:
      "Better Farms connects independent farmers who need practical project support with people who want to fund resilient farms and measurable change.",
    image: "/sourcePhotos/homepage/farm-aerial.webp",
    imageAlt: "Aerial view of an independent farm and surrounding fields",
    imageWidth: 1314,
    imageHeight: 608,
    heading: "We're Funding the Farms That Keep America Fed",
    summary:
      "Better Farms connects farm projects with funding, professional management, and measurable impact reporting.",
  },
  {
    path: "/how-it-works",
    title: "How Sustainable Farm Projects Get Funded | Better Farms",
    description:
      "See how Better Farms assesses, funds, manages, and measures sustainability projects—from a farmer's application to a donor-ready impact report.",
    ogTitle: "From Farm Project Idea to Measurable Impact",
    ogDescription:
      "Follow Better Farms' six-step process for turning farm needs into fully managed, measurable sustainability projects.",
    image: "/sourcePhotos/how-it-works/orchard.webp",
    imageAlt: "Freshly harvested apples in an orchard",
    imageWidth: 1307,
    imageHeight: 583,
    heading: "Invest in Farm Projects for Future Generations",
    summary:
      "Learn the six-step process Better Farms uses to move farm projects from application through verified impact reporting.",
  },
  {
    path: "/about",
    title: "Our Mission: Stronger Independent Farms | Better Farms",
    description:
      "Meet the mission behind Better Farms: practical funding, agricultural expertise, project management, and accountable results for independent farms.",
    ogTitle: "Better Farms Starts With Farmers—and the People Who Support Them",
    ogDescription:
      "Learn why Better Farms brings farmers, funders, and agricultural professionals together to complete practical, durable farm projects.",
    image: "/sourcePhotos/about/sheep-feeding.webp",
    imageAlt: "Sheep gathered at a feeding trough on a working farm",
    imageWidth: 2614,
    imageHeight: 1166,
    heading: "Better Farms Start With Better Partners",
    summary:
      "Better Farms works with farmers, funders, and agricultural professionals to deliver durable farm-level improvements.",
  },
  {
    path: "/contact",
    title: "Contact Better Farms | Farmers, Donors & Partners",
    description:
      "Are you a farmer with a project or someone ready to support independent farms? Contact Better Farms to start a practical conversation.",
    ogTitle: "Start a Conversation With Better Farms",
    ogDescription:
      "Tell us about a farm project, donation, funding partnership, or another way you want to strengthen independent agriculture.",
    image: "/sourcePhotos/contact/farmers.webp",
    imageAlt: "Two farmers inspecting crops together in a field",
    imageWidth: 642,
    imageHeight: 900,
    heading: "Take the First Step Towards Better Farms",
    summary:
      "Start a conversation with Better Farms about farm projects, partnerships, and funding opportunities.",
  },
  {
    path: "/for-farmers",
    title: "Sustainable Farm Project Funding & Support | Better Farms",
    description:
      "Independent farmers can get project funding, planning, execution support, and impact measurement for more sustainable, resilient operations.",
    ogTitle: "Build the More Resilient Farm You've Been Planning",
    ogDescription:
      "Bring Better Farms your project idea. We help assess the need, assemble funding, manage the work, and document the results.",
    image: "/figmaAssets/red_barn_farm.webp",
    imageAlt: "Red barn and silo surrounded by cultivated fields",
    imageWidth: 1920,
    imageHeight: 1080,
    heading: "The Farm You've Been Wanting to Build",
    summary:
      "Better Farms helps independent farmers scope, fund, manage, and document practical farm improvement projects.",
  },
  {
    path: "/fund-a-farm",
    title: "Donate to Support Independent Farmers | Better Farms",
    description:
      "Turn your contribution into practical infrastructure and sustainability projects for independent farms—with clear reporting on the results.",
    ogTitle: "Your Donation Can Help an Independent Farm Thrive",
    ogDescription:
      "Fund practical farm projects that strengthen local food systems, improve resilience, and create measurable impact on the ground.",
    image: "/sourcePhotos/fund-a-farm/field-sunset.webp",
    imageAlt: "Farmers reviewing project plans together in a field at sunset",
    imageWidth: 1440,
    imageHeight: 426,
    heading: "Fund a Farm Today",
    summary:
      "Contributions to Better Farms support practical farm projects designed to create durable, measurable results.",
  },
  {
    path: "/get-involved",
    title: "Support Sustainable Farming | Give or Partner With Us",
    description:
      "Support independent farms through individual giving, donor-advised funds, foundation grants, or corporate sustainability partnerships.",
    ogTitle: "Choose How You Want to Help Independent Farms Thrive",
    ogDescription:
      "Give as an individual or partner through a company, foundation, or donor-advised fund to support managed farm projects and measurable results.",
    image: "/sourcePhotos/get-involved/chickens-roaming.webp",
    imageAlt: "Free-range chickens outside a mobile farm coop",
    imageWidth: 2614,
    imageHeight: 1166,
    heading: "Help Independent Farms Thrive",
    summary:
      "Companies, foundations, donors, and agricultural partners can help independent farms complete high-impact projects.",
  },
];

export const previewSeoRoutes: SeoConfig[] = [
  {
    path: "/blog",
    title: "Better Farms Journal | Stories From the Field",
    description:
      "Preview practical stories and resources for farmers, funders, and partners working toward more resilient farms and food systems.",
    ogTitle: "Stories From the Field | Better Farms Journal",
    ogDescription:
      "Farm resilience, sustainable practices, project management, and impact reporting from the Better Farms editorial preview.",
    image: "/sourcePhotos/for-farmers/irrigation.webp",
    imageAlt: "Drip irrigation delivering water to young crops",
    imageWidth: 884,
    imageHeight: 382,
    heading: "Stories From the Field",
    summary:
      "The Better Farms Journal shares practical ideas for farmers, funders, and partners building resilient food systems.",
    robots: "noindex, nofollow",
  },
  ...blogPosts.map(
    (post): SeoConfig => ({
      path: `/blog/${post.slug}`,
      title: `${post.title} | Better Farms`,
      description: post.excerpt,
      ogTitle: post.title,
      ogDescription: post.excerpt,
      image: post.image,
      imageAlt: post.imageAlt,
      imageWidth: post.imageWidth,
      imageHeight: post.imageHeight,
      heading: post.title,
      summary: post.excerpt,
      robots: "noindex, nofollow",
    }),
  ),
];

export const prerenderSeoRoutes = [...seoRoutes, ...previewSeoRoutes];

export const notFoundSeo: SeoConfig = {
  path: "/404",
  title: "Page Not Found | Better Farms",
  description:
    "The requested page could not be found. Return to Better Farms to explore farm projects, partnerships, and ways to help.",
  ogTitle: "Page Not Found | Better Farms",
  ogDescription:
    "Return to Better Farms to explore support for farmers, sustainable farm projects, and ways to give.",
  image: "/sourcePhotos/homepage/farm-aerial.webp",
  imageAlt: "Aerial view of an independent farm and surrounding fields",
  imageWidth: 1314,
  imageHeight: 608,
  heading: "Page Not Found",
  summary: "The requested page does not exist or may have moved.",
  robots: "noindex, nofollow",
};

export function normalizeSiteUrl(siteUrl = DEFAULT_SITE_URL) {
  return siteUrl.replace(/\/+$/, "");
}

export function getSeoConfig(pathname: string) {
  const normalizedPath =
    pathname !== "/" ? pathname.replace(/\/+$/, "") : pathname;
  return (
    prerenderSeoRoutes.find((route) => route.path === normalizedPath) ??
    notFoundSeo
  );
}

export function absoluteUrl(pathname: string, siteUrl = DEFAULT_SITE_URL) {
  return `${normalizeSiteUrl(siteUrl)}${
    pathname.startsWith("/") ? pathname : `/${pathname}`
  }`;
}

export function buildOrganizationJsonLd(siteUrl = DEFAULT_SITE_URL) {
  const baseUrl = normalizeSiteUrl(siteUrl);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "Better Farms Foundation",
    alternateName: "Better Farms",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/figmaAssets/logo.svg", baseUrl),
    },
    description:
      "Better Farms funds and manages practical farm projects that strengthen independent farms and resilient local agriculture.",
  };
}

export function buildWebSiteJsonLd(siteUrl = DEFAULT_SITE_URL) {
  const baseUrl = normalizeSiteUrl(siteUrl);

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Better Farms Foundation",
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
  };
}

export function buildWebPageJsonLd(
  seo: SeoConfig,
  siteUrl = DEFAULT_SITE_URL,
) {
  const baseUrl = normalizeSiteUrl(siteUrl);
  const pageUrl = absoluteUrl(seo.path, baseUrl);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: seo.title,
    description: seo.description,
    isPartOf: {
      "@id": `${baseUrl}/#website`,
    },
    about: {
      "@id": `${baseUrl}/#organization`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(seo.image, baseUrl),
      caption: seo.imageAlt,
      width: seo.imageWidth,
      height: seo.imageHeight,
    },
  };
}

export function buildBreadcrumbJsonLd(
  seo: SeoConfig,
  siteUrl = DEFAULT_SITE_URL,
) {
  if (seo.path === "/" || seo.path === "/404") return null;

  const baseUrl = normalizeSiteUrl(siteUrl);
  const blogPost = seo.path.startsWith("/blog/")
    ? getBlogPost(seo.path.replace("/blog/", ""))
    : undefined;
  const itemListElement = blogPost
    ? [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Better Farms Journal",
          item: absoluteUrl("/blog", baseUrl),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: blogPost.title,
          item: absoluteUrl(seo.path, baseUrl),
        },
      ]
    : [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: seo.heading,
          item: absoluteUrl(seo.path, baseUrl),
        },
      ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

export function buildBlogPostingJsonLd(
  seo: SeoConfig,
  siteUrl = DEFAULT_SITE_URL,
) {
  if (!seo.path.startsWith("/blog/")) return null;
  const post = getBlogPost(seo.path.replace("/blog/", ""));
  if (!post) return null;

  const baseUrl = normalizeSiteUrl(siteUrl);
  const pageUrl = absoluteUrl(seo.path, baseUrl);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${pageUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    image: {
      "@type": "ImageObject",
      url: absoluteUrl(post.image, baseUrl),
      caption: post.imageAlt,
      width: post.imageWidth,
      height: post.imageHeight,
    },
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    mainEntityOfPage: {
      "@id": `${pageUrl}#webpage`,
    },
  };
}

export function buildStructuredData(
  seo: SeoConfig,
  siteUrl = DEFAULT_SITE_URL,
) {
  const pageData = buildWebPageJsonLd(seo, siteUrl);
  const breadcrumbData = buildBreadcrumbJsonLd(seo, siteUrl);
  const blogPostingData = buildBlogPostingJsonLd(seo, siteUrl);

  return [
    ...(seo.path === "/"
      ? [buildOrganizationJsonLd(siteUrl), buildWebSiteJsonLd(siteUrl)]
      : []),
    pageData,
    ...(breadcrumbData ? [breadcrumbData] : []),
    ...(blogPostingData ? [blogPostingData] : []),
  ];
}
