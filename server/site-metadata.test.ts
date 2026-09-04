import assert from "node:assert/strict";
import test from "node:test";
import { getPublicSiteOrigin, renderSitePageMetadata } from "./site-metadata";

const indexHtml = `<!doctype html><html><head>
<title>Better Farms Foundation</title>
<meta name="description" content="default" >
<meta name="robots" content="index, follow" >
<meta property="og:title" content="Better Farms Foundation" >
<meta property="og:description" content="default" >
<meta name="twitter:title" content="Better Farms Foundation" >
<meta name="twitter:description" content="default" >
</head><body></body></html>`;

test("public site origin accepts HTTPS and loopback development origins", () => {
  assert.equal(getPublicSiteOrigin("https://better-farms.example"), "https://better-farms.example");
  assert.equal(getPublicSiteOrigin("http://127.0.0.1:5173"), "http://127.0.0.1:5173");
  assert.equal(getPublicSiteOrigin("https://user:pass@better-farms.example"), null);
  assert.equal(getPublicSiteOrigin("https://better-farms.example/path"), null);
});

test("server metadata uses the route contract and canonical origin without trusting request hosts", () => {
  const html = renderSitePageMetadata(indexHtml, "/fund-a-farm", "https://better-farms.example");
  assert.match(html, /<title>Fund a Farm \| Better Farms Foundation<\/title>/);
  assert.match(html, /meta name="robots" content="index, follow"/);
  assert.match(html, /meta property="og:title" content="Fund a Farm \| Better Farms Foundation"/);
  assert.match(html, /link rel="canonical" href="https:\/\/better-farms\.example\/fund-a-farm"/);
});

test("unknown routes are noindex and do not receive a canonical URL", () => {
  const html = renderSitePageMetadata(indexHtml, "/unknown", "https://better-farms.example");
  assert.match(html, /<title>Page Not Found \| Better Farms Foundation<\/title>/);
  assert.match(html, /meta name="robots" content="noindex, nofollow"/);
  assert.doesNotMatch(html, /rel="canonical"/);
});
