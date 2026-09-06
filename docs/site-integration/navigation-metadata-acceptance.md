# Navigation metadata acceptance

The server now emits its configured public origin as separate metadata on both known and
unknown routes. Client navigation uses that value to create a canonical link only for the
seven indexed routes. Unknown routes remove the link and remain noindex; returning to a
known route recreates it. No request Host or browser origin is used to invent a public domain.
Without a configured public origin, no canonical is emitted. The viewport permits browser zoom.

Validation on 2026-09-06 UTC: 35 site-contract tests, TypeScript and production build passed.
Playwright CLI exercised the compiled production application at loopback port 5214 with a
synthetic configured origin (`https://better-farms.example`) and no Core token or provider
configuration. A direct unknown route had no canonical and was noindex. SPA navigation to
About created exactly one canonical for the configured domain. Browser Back removed it;
Forward restored exactly one About canonical and index/follow metadata. The viewport had
no maximum-scale restriction. The browser and local application were stopped afterward.

This verifies the metadata transition and removal of the explicit zoom cap, not full
accessibility conformance, public-domain SEO acceptance or a production deployment. The
existing Core two-origin pilot proof remains pinned to the preceding site revision until
that gate is rerun against this change. External hero image/CSP compatibility and approved
public content remain separate open acceptance work.
