# Better Farms Foundation QA Report

Date: July 18, 2026

## Scope

Top-down QA covered every public route at phone (390 px), tablet (768 px), laptop (1024 px), and desktop (1440 px) widths:

- `/`
- `/about`
- `/how-it-works`
- `/get-involved`
- `/for-farmers`
- `/fund-a-farm`
- `/contact`

The pass included visual review, responsive geometry, image health, heading and ID checks, accessible control naming, navigation, mobile-menu focus behavior, accordion and dialog states, testimonial controls, donation selections, and contact-form validation and success behavior.

## Evidence

Fresh full-page captures are stored in:

- [`output/top-down-qa/desktop`](output/top-down-qa/desktop)
- [`output/top-down-qa/tablet`](output/top-down-qa/tablet)
- [`output/top-down-qa/mobile`](output/top-down-qa/mobile)

Corrected tablet newsletter layouts:

- [`About page`](output/top-down-qa/tablet/02-about-fixed.png)
- [`How It Works page`](output/top-down-qa/tablet/03-how-it-works-fixed.png)

## Findings corrected

1. Newsletter sections on About and How It Works switched to their two-column layout too early, producing horizontal overflow at 768 px. The breakpoint is now `lg`, with full-width forms below that size.
2. Testimonial pagination controls had 9 × 9 px click areas. They now retain the Figma-sized visual dots inside 32 × 32 px interactive targets with visible keyboard focus.
3. Mobile footer policy links had undersized tap areas. They now provide 24 px minimum target height while retaining the designed typography.
4. Multiple primary CTAs rendered as buttons without actions. Fund, donate, partnership, and farmer-application actions now route to the appropriate existing Fund or Contact flow.
5. Newsletter buttons had no action. All newsletter forms now use named, required fields, native email validation, submit semantics, and a clear non-destructive notice while the external mailing-list provider is not configured.
6. Fund-page amount controls now expose selected state through `aria-pressed`, and the custom amount has an accessible name.

## Regression result

All 28 route/breakpoint combinations passed:

- Document width equals viewport width.
- Every page has exactly one `h1`.
- No broken images.
- No duplicate element IDs.
- No unnamed buttons.
- Browser console produced no warnings or errors during interaction QA.

TypeScript checking and the production build both pass. This is a focused product QA result, not a claim of formal WCAG conformance or certification.
