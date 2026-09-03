# Site Shell and Fund a Farm Integration Slice

This bounded slice establishes the first Better Farms site adapter surface without changing routing,
forms, donation behavior, or submission logic.

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

Run the bounded checks with:

```sh
npm run test:site-contract
npm run check
npm run build
```

The Puck metadata is an adapter contract for the Core Platform bridge. This slice does not add an editor
UI, publish content, connect a donation provider, change live data, or deploy the site.
