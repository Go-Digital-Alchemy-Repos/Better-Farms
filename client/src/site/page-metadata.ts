import { getSitePageMetadata } from "@shared/site-metadata";

function setMetaContent(selector: string, content: string): void {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = content;
}

function getCanonicalOrigin(): string | null {
  const value = document.head.querySelector<HTMLMetaElement>('meta[name="site-public-origin"]')?.content;
  if (!value) return null;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.origin : null;
  } catch {
    return null;
  }
}

export function applySitePageMetadata(pathname: string): void {
  const metadata = getSitePageMetadata(pathname);
  document.title = metadata.title;
  setMetaContent('meta[name="description"]', metadata.description);
  setMetaContent('meta[name="robots"]', metadata.robots);
  setMetaContent('meta[property="og:title"]', metadata.title);
  setMetaContent('meta[property="og:description"]', metadata.description);
  setMetaContent('meta[name="twitter:title"]', metadata.title);
  setMetaContent('meta[name="twitter:description"]', metadata.description);

  const canonicalOrigin = getCanonicalOrigin();
  const currentCanonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalOrigin || metadata.robots !== "index, follow") {
    currentCanonical?.remove();
    return;
  }
  const canonical = currentCanonical ?? document.createElement("link");
  canonical.rel = "canonical";
  canonical.href = `${canonicalOrigin}${pathname}`;
  if (!currentCanonical) document.head.appendChild(canonical);
}
