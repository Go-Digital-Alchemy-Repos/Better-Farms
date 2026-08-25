import { useEffect } from "react";
import { useLocation } from "wouter";
import {
  absoluteUrl,
  buildStructuredData,
  getSeoConfig,
  normalizeSiteUrl,
} from "@/lib/seo";

const SEO_JSON_LD_ID = "better-farms-structured-data";

function setMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([name, value]) => {
    element!.setAttribute(name, value);
  });
}

export function RouteSeo() {
  const [location] = useLocation();

  useEffect(() => {
    const seo = getSeoConfig(location);
    const existingCanonical =
      document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const siteIndexable =
      document.head.querySelector<HTMLMetaElement>(
        'meta[name="site-indexable"]',
      )?.content === "true";
    const siteUrl = normalizeSiteUrl(
      existingCanonical
        ? new URL(existingCanonical.href).origin
        : window.location.origin,
    );
    const canonicalUrl = absoluteUrl(
      seo.path === "/404" ? window.location.pathname : seo.path,
      siteUrl,
    );
    const imageUrl = absoluteUrl(seo.image, siteUrl);

    document.title = seo.title;
    setMeta('meta[name="description"]', {
      name: "description",
      content: seo.description,
    });
    setMeta('meta[name="robots"]', {
      name: "robots",
      content:
        siteIndexable && !seo.robots ? "index, follow" : "noindex, nofollow",
    });
    setMeta('meta[property="og:title"]', {
      property: "og:title",
      content: seo.ogTitle,
    });
    setMeta('meta[property="og:description"]', {
      property: "og:description",
      content: seo.ogDescription,
    });
    setMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
    });
    setMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    setMeta('meta[property="og:image"]', {
      property: "og:image",
      content: imageUrl,
    });
    setMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: seo.imageAlt,
    });
    setMeta('meta[property="og:image:width"]', {
      property: "og:image:width",
      content: String(seo.imageWidth),
    });
    setMeta('meta[property="og:image:height"]', {
      property: "og:image:height",
      content: String(seo.imageHeight),
    });
    setMeta('meta[property="og:locale"]', {
      property: "og:locale",
      content: "en_US",
    });
    setMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: "Better Farms Foundation",
    });
    setMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    setMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: seo.ogTitle,
    });
    setMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: seo.ogDescription,
    });
    setMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: imageUrl,
    });
    setMeta('meta[name="twitter:image:alt"]', {
      name: "twitter:image:alt",
      content: seo.imageAlt,
    });

    let canonical = existingCanonical;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    let structuredData =
      document.head.querySelector<HTMLScriptElement>(`#${SEO_JSON_LD_ID}`);
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = SEO_JSON_LD_ID;
      structuredData.type = "application/ld+json";
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify(
      buildStructuredData(seo, siteUrl),
    );
  }, [location]);

  return null;
}
