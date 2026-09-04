import { getSitePageMetadata } from "../shared/site-metadata";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function getPublicSiteOrigin(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    const isLoopback =
      url.protocol === "http:" &&
      ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
    if (
      (!isLoopback && url.protocol !== "https:") ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) {
      return null;
    }
    return url.origin;
  } catch {
    return null;
  }
}

function replaceMetaContent(html: string, selector: string, content: string): string {
  const escaped = escapeHtml(content);
  const pattern = new RegExp(`(<meta\\s+${selector}\\s+content=")[^"]*("\\s*>)`, "i");
  return html.replace(pattern, `$1${escaped}$2`);
}

export function renderSitePageMetadata(
  indexHtml: string,
  pathname: string,
  publicSiteOrigin = getPublicSiteOrigin(process.env.PUBLIC_SITE_ORIGIN),
): string {
  const metadata = getSitePageMetadata(pathname);
  const title = escapeHtml(metadata.title);
  let html = indexHtml.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);

  html = replaceMetaContent(html, 'name="description"', metadata.description);
  html = replaceMetaContent(html, 'name="robots"', metadata.robots);
  html = replaceMetaContent(html, 'property="og:title"', metadata.title);
  html = replaceMetaContent(html, 'property="og:description"', metadata.description);
  html = replaceMetaContent(html, 'name="twitter:title"', metadata.title);
  html = replaceMetaContent(html, 'name="twitter:description"', metadata.description);
  html = html.replace(/\s*<link\s+rel="canonical"[^>]*>/gi, "");

  if (publicSiteOrigin && metadata.robots === "index, follow") {
    const canonicalPath = pathname === "/" ? "/" : pathname;
    const canonical = `${publicSiteOrigin}${canonicalPath}`;
    html = html.replace("</head>", `    <link rel="canonical" href="${escapeHtml(canonical)}" >\n  </head>`);
  }

  return html;
}
