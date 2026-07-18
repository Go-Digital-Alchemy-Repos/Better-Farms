# Better Farms Foundation Security Audit

Date: July 18, 2026

## Executive summary

The audited application is a public, unauthenticated React site served by a small Express process on Railway. It currently has no registered API endpoints, database calls, authentication flow, server-side form persistence, file upload, WebSocket handler, or administrative surface. The primary security boundaries are therefore the public HTTP server, static asset delivery, the dependency supply chain, browser execution policy, and future `/api` expansion.

The audit found one material supply-chain issue and four defense-in-depth gaps. All identified code and dependency findings were remediated. A fresh production dependency audit reports zero known vulnerabilities.

## Scope and method

Reviewed:

- All tracked source, configuration, build, lockfile, and deployment-relevant files.
- Express startup, middleware ordering, routing, static serving, Vite development serving, error handling, and logging.
- Client-side external navigation, storage/cookie use, dynamic HTML/CSS generation, fetch helpers, and form behavior.
- Secret-like files and common credential signatures in the tracked tree.
- Production dependency advisories through the npm registry.
- The built production server through local HTTP requests covering headers, API fallthrough, unsupported methods, oversized bodies, immutable assets, and rate limiting.

The native Codex Security deep-scan panel did not render in this session. This report documents the comprehensive repository fallback audit and does not represent that unavailable native workflow.

## Threat model

### Assets

- Public brand content and website integrity.
- Visitor privacy and browser security.
- Railway service availability.
- Any future contact, donor, farmer, or partner information introduced through `/api` routes.

### Trust boundaries and attacker inputs

- Arbitrary public HTTP paths, methods, headers, query strings, and request bodies reach Express.
- Browser users load first-party JavaScript/assets and Google-hosted fonts.
- The npm dependency graph and build pipeline are trusted supply-chain inputs.
- Current contact and newsletter forms remain client-side and do not transmit data to this server.

### Important invariants

- Public input must not trigger unbounded work or memory consumption.
- API responses and server errors must not expose sensitive data or internals.
- Only intended first-party scripts, images, frames, connections, and form actions should execute.
- Unknown API paths must not be confused with successful SPA responses.
- Production dependencies must not contain known exploitable versions.

## Findings and remediation

### SEC-001 — Vulnerable production dependency graph

Severity: High  
Status: Resolved

The original lockfile reported ten production advisories: six high and four moderate. They included SQL identifier injection in Drizzle ORM, WebSocket memory exhaustion/disclosure, Express `path-to-regexp` denial of service, PostCSS output XSS, and transitive glob/parser denial-of-service or injection issues.

The database and WebSocket packages are not currently reachable through an application route, but Express routing is directly internet-facing and every vulnerable package shipped in production. Direct dependencies were upgraded and compatible transitive fixes were applied. A fresh `npm audit --omit=dev --json` returns zero vulnerabilities.

### SEC-002 — Missing browser security policy and server disclosure controls

Severity: Medium  
Status: Resolved

Production responses previously lacked a Content Security Policy and several standard browser protections. The server now uses Helmet, disables `X-Powered-By`, enforces a first-party CSP with explicit Google Fonts allowances, prevents framing and MIME sniffing, enables HSTS, and uses a strict-origin referrer policy.

### SEC-003 — API resource-abuse controls absent

Severity: Medium (future-facing; no current API endpoints)  
Status: Resolved

The `/api` boundary had no request-rate control. A 100-request/15-minute IP limit with standard rate-limit headers is now installed before API routes. JSON and URL-encoded request bodies are explicitly capped at 100 KB. Local production smoke testing confirmed the limit returns HTTP 429 after the configured allowance and oversized input returns HTTP 413.

### SEC-004 — Response-body logging and production error leakage

Severity: Low (future-facing; no current API endpoints)  
Status: Resolved

The request logger captured and serialized every JSON API response. Future contact or account endpoints could therefore write personal or sensitive response fields to logs. The logger now records only method, path, status, and duration. Production 5xx responses now return a generic message while full errors remain server-side.

### SEC-005 — Ambiguous SPA/API fallthrough and static cache behavior

Severity: Low  
Status: Resolved

Unknown API paths and unsupported methods could fall through to the SPA HTML response. Unknown `/api` routes now return a JSON 404, the SPA fallback is GET-only, and unsupported methods receive a JSON 404. Dotfiles are denied by the static server, fingerprinted assets receive immutable one-year caching, and other files retain short caching.

## Validation evidence

- `npm run check`: passed.
- `npm run build`: passed without server bundle warnings.
- `npm audit --omit=dev --json`: 0 vulnerabilities.
- `/`: HTTP 200 with CSP, HSTS, framing, referrer, MIME, and related security headers.
- `/api/unknown`: JSON HTTP 404 with rate-limit headers.
- `POST /not-a-route`: JSON HTTP 404 rather than SPA HTML.
- Oversized JSON body: HTTP 413.
- Fingerprinted JavaScript asset: `Cache-Control: public, max-age=31536000, immutable`.
- API rate test: final responses transitioned from HTTP 404 to HTTP 429 at the configured threshold.
- Tracked-tree credential scan: no matching private keys, common access-token signatures, or credential files found.

## Residual considerations

- The newsletter, contact, and donation experiences are not connected to production data providers. Security requirements must be revisited when those integrations are added, including server-side validation, abuse prevention, privacy retention, CSRF/session decisions where applicable, and provider-secret handling.
- The footer now presents Better Farms-specific privacy, terms, and accessibility notices. Legal counsel should approve their language before the site begins collecting visitor or payment information.
- The unused template database/authentication/storage modules are not exposed. If they become active, passwords must be hashed with an appropriate password KDF and storage must move out of process memory.
- This is an evidence-backed source and runtime audit, not a penetration-test certification.
