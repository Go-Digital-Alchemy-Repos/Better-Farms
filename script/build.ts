import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { mkdir, readFile, rm, writeFile } from "fs/promises";
import path from "path";
import { pathToFileURL } from "url";
import {
  absoluteUrl,
  buildStructuredData,
  DEFAULT_SITE_URL,
  normalizeSiteUrl,
  notFoundSeo,
  prerenderSeoRoutes,
  seoRoutes,
  type SeoConfig,
} from "../client/src/lib/seo";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function jsonForHtml(value: unknown) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function createSeoHead(
  seo: SeoConfig,
  siteUrl: string,
  siteIndexable: boolean,
) {
  const canonicalUrl = absoluteUrl(seo.path, siteUrl);
  const imageUrl = absoluteUrl(seo.image, siteUrl);
  const robots =
    siteIndexable && !seo.robots ? "index, follow" : "noindex, nofollow";
  const structuredData = buildStructuredData(seo, siteUrl);

  return `<!-- seo:start -->
    <title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeHtml(seo.description)}" >
    <meta name="site-indexable" content="${String(siteIndexable)}" >
    <meta name="robots" content="${robots}" >
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" >
    <meta property="og:title" content="${escapeHtml(seo.ogTitle)}" >
    <meta property="og:description" content="${escapeHtml(seo.ogDescription)}" >
    <meta property="og:type" content="website" >
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" >
    <meta property="og:image" content="${escapeHtml(imageUrl)}" >
    <meta property="og:image:alt" content="${escapeHtml(seo.imageAlt)}" >
    <meta property="og:image:width" content="${seo.imageWidth}" >
    <meta property="og:image:height" content="${seo.imageHeight}" >
    <meta property="og:locale" content="en_US" >
    <meta property="og:site_name" content="Better Farms Foundation" >
    <meta name="twitter:card" content="summary_large_image" >
    <meta name="twitter:title" content="${escapeHtml(seo.ogTitle)}" >
    <meta name="twitter:description" content="${escapeHtml(seo.ogDescription)}" >
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" >
    <meta name="twitter:image:alt" content="${escapeHtml(seo.imageAlt)}" >
    <script id="better-farms-structured-data" type="application/ld+json">${jsonForHtml(structuredData)}</script>
    <!-- seo:end -->`;
}

function createSitemap(siteUrl: string) {
  const urls = seoRoutes
    .map(
      ({ path: routePath }) =>
        `  <url><loc>${escapeHtml(absoluteUrl(routePath, siteUrl))}</loc></url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

async function prerenderRoutes() {
  const publicDir = path.resolve("dist/public");
  const siteUrl = normalizeSiteUrl(
    process.env.PUBLIC_SITE_URL || DEFAULT_SITE_URL,
  );
  const siteIndexable = process.env.PUBLIC_SITE_INDEXABLE === "true";
  const template = await readFile(path.join(publicDir, "index.html"), "utf-8");
  const rendererUrl = pathToFileURL(
    path.resolve("dist/ssr/entry-server.mjs"),
  ).href;
  const { render } = (await import(rendererUrl)) as {
    render: (pathname: string) => Promise<string>;
  };

  for (const seo of [...prerenderSeoRoutes, notFoundSeo]) {
    const renderedApp = await render(seo.path);
    const html = template
      .replace(
        /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/,
        createSeoHead(seo, siteUrl, siteIndexable),
      )
      .replace('<div id="root"></div>', `<div id="root">${renderedApp}</div>`);
    const outputPath =
      seo.path === "/"
        ? path.join(publicDir, "index.html")
        : seo.path === "/404"
          ? path.join(publicDir, "404.html")
          : path.join(publicDir, seo.path.slice(1), "index.html");

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html);
  }

  await writeFile(path.join(publicDir, "sitemap.xml"), createSitemap(siteUrl));
  await writeFile(
    path.join(publicDir, "robots.txt"),
    `User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
  );
}

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("building server-rendering entry...");
  await viteBuild({
    build: {
      ssr: path.resolve("client/src/entry-server.tsx"),
      outDir: path.resolve("dist/ssr"),
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: "entry-server.mjs",
        },
      },
    },
  });

  console.log("pre-rendering public routes...");
  await prerenderRoutes();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
