import { getSitePageMetadata } from "@shared/site-metadata";

function setMetaContent(selector: string, content: string): void {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = content;
}

function getCanonicalOrigin(): string | null {
  const value = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href;
  if (!value) return null;
  try {
    return new URL(value).origin;
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
  if (canonicalOrigin && currentCanonical) {
    currentCanonical.href = `${canonicalOrigin}${pathname === "/" ? "/" : pathname}`;
  }
}
