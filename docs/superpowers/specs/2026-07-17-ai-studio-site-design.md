# Ahsan Khizar AI Studio Website Design

## Objective

Build a one-page personal agency website that presents Ahsan Khizar as one serious AI engineer with a complementary AI-video production service. The page must feel like one identity, use pitch-led copy, and convert visitors to direct project inquiries.

## Information Architecture

1. Hero: name, unified promise, primary CTA.
2. AI engineering: capabilities and selected project proof.
3. AI video production: supported formats and business uses.
4. Shared process: discover, build or produce, refine, deliver.
5. About and recognition: factual credibility.
6. Contact: direct email, LinkedIn, and GitHub.

## Visual Contract

Translate `docs/design/approved-direction.png` into responsive semantic code. Preserve the optical-white base, black variable-width display typography, carmine engineering field, citrus video field, cyan interaction cue, thin rules, hard edges, asymmetric grid, and compressed poster hierarchy. Light silver may be introduced only as a supporting neutral that matches the approved direction.

## Interaction

Anchor navigation, skip link, visible focus, active hover/press feedback, copy-email control with an ARIA live confirmation, and an accessible mobile menu implemented with native button semantics. All CTAs must work without JavaScript; enhancements may add feedback but cannot be required.

## Responsive Behavior

Desktop uses strong split-field compositions. Tablet preserves contrast while reducing extreme width variation. Mobile stacks all content in logical DOM order, keeps display text within the viewport, maintains 44px targets, and avoids horizontal scrolling.

## Quality Gates

- Successful production build and rendered HTML tests.
- Keyboard-complete navigation and no console errors.
- WCAG 2.2 AA automated and manual checks.
- Valid title, description, canonical, Open Graph metadata, Person and ProfessionalService JSON-LD, robots, and sitemap.
- LCP under 2.5s, CLS under 0.1, INP under 200ms target, compressed initial JavaScript under 300KB where measurable.
- Final review against current Vercel Web Interface Guidelines and the requested web-quality audit format.

## Scope Boundaries

No CMS, database, authentication, fabricated portfolio metrics, unverified testimonials, or video hosting. The first version is a fast single-route portfolio and service landing page.
