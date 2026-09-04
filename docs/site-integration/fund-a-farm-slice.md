# Site Shell and Fund a Farm Integration Slice

This bounded slice establishes the first Better Farms site adapter surface without changing routing or
donation behavior.

- `SiteShell` owns the existing `SiteHeader`, main landmark, and `SiteFooter` composition.
- `betterFarmsTheme` is the named semantic theme adapter. Components consume its token metadata and
  recipes instead of accepting editor-provided classes or JSX.
- `fundAFarmContentSchema` limits editable data to headings, copy, the hero image and required alt text,
  and the CTA label/target. CTA targets accept only internal paths or credential-free HTTPS URLs.
- `betterFarmsPuckRegistry` publishes the allowed fields and lists locked shell, routing, donation,
  validation, submission, accessibility, responsive, and security behavior. Its renderer validates
  content before constructing the page.
- The preview bridge accepts version `1.0` messages only from the exact
  `VITE_CORE_PLATFORM_ADMIN_ORIGIN`, requires the Better Farms stack/route/component identifiers, and
  validates content again before rendering.
- The public page loads a versioned published-content envelope through its same-origin `/api` route. The
  server proxies that one public endpoint to `CORE_PLATFORM_API_ORIGIN`, preserves cache headers and ETags,
  and times out after five seconds. Missing, failed, or invalid responses retain the built-in content.
- Contact and newsletter submissions use the same-origin API routes declared in the client manifest. The
  server validates only the Core Platform contact and newsletter payloads, then proxies them to the
  client-scoped Core route using the server-only `CORE_PLATFORM_FORM_PROXY_TOKEN`; browser code does not
  receive that token or the Core origin, and cannot bypass the site CSP. The routes return a clear `503`
  until the origin and token are configured. Configure them only after the client-specific Core form
  destinations and data-handling approval are complete.
- The production server injects route-specific title, description, robots, Open Graph, Twitter, and canonical
  metadata into the application shell. Canonical URLs are emitted only for declared public routes and only
  when `PUBLIC_SITE_ORIGIN` is an approved credential-free HTTPS origin. Client-side navigation keeps those
  tags synchronized; unknown routes are `noindex, nofollow` and have no canonical URL.
- Preview content takes precedence in the trusted admin iframe. Outside preview, only validated published
  content can replace the built-in fallback.

Run the bounded checks with:

```sh
npm run test:site-contract
npm run check
npm run build
```

The Puck metadata is the adapter contract for the Core Platform editor and runtime API. This slice does not
connect a donation provider, change live data, or deploy the site.
