# Design System

## Direction

The approved direction is stored at `docs/design/approved-direction.png`. It is a north-star composition, not a flat image to reproduce. The live site uses semantic HTML and CSS to translate its variable-width poster typography, hard color fields, asymmetric grid, thin rules, and strong scale contrast.

## Color

Use OKLCH tokens only.

- Stage black: `oklch(0.06 0 0)` for primary text, rules, and dark sections.
- Optical white: `oklch(0.98 0 0)` for the main canvas and light pacing sections.
- Signal carmine: `oklch(0.64 0.22 25)` for the AI-engineering section and primary brand emphasis.
- Electric citrus: `oklch(0.88 0.18 105)` for the secondary AI-video section.
- Studio cyan: `oklch(0.82 0.16 190)` for small interaction cues only, never a dominant section.
- Light silver: `oklch(0.93 0.01 250)` for quiet supporting surfaces when a light neutral improves pacing.

Black text is used on optical white, carmine, citrus, cyan, and silver. White-on-carmine is limited to large display text because its contrast is insufficient for normal body copy.

## Typography

- Display: Anybody variable, weights 650–900, width axis used sparingly for contrast between lines.
- Body and UI: Manrope, weights 400–700.
- Five-role scale: utility, body, lead, section, display.
- Display maximum: `clamp(4rem, 11vw, 6rem)` with letter spacing no tighter than `-0.04em`.
- Body: at least `1rem`, `1.6` line height, maximum `65ch` measure.
- Short uppercase utility text may use `0.06em` tracking; body copy remains sentence case.

## Layout

- Mobile-first and responsive at 375px, 768px, 1024px, and 1440px.
- Desktop hero uses an asymmetric 7/5 composition; mobile stacks in reading order.
- Use a 4px-based spacing scale with deliberate tight groups and generous section separations.
- Hard-edged fields and 1px rules create structure. Avoid rounded card grids and decorative shadows.
- AI engineering receives the strongest colored field and the largest proof section. AI video remains visually distinct but shorter.

## Components

- Header: name, compact discipline statement, anchor navigation, project CTA.
- Hero: one unified product outcome, one accountable operator, short positioning copy, and two outcome-led CTAs.
- Engineering field: selling headline, capabilities, and real project proof.
- Video field: selling headline and service formats including avatars, UGC, ads, demos, explainers, localization, and content variations.
- Process strip: one shared process across both capabilities.
- About/proof section: concise biography, selected recognition, GitHub and LinkedIn links.
- Contact section: direct email CTA with accessible copy-to-email enhancement.
- Footer: one identity, social links, current year.

## Motion

Use one orchestrated hero entrance and concise interaction feedback. No scroll-jacking, parallax, cursor replacement, or repeated fade-up sections. Keep feedback under 300ms and provide a `prefers-reduced-motion` path that removes translation and timing delays.

## Content Rules

- Do not invent clients, testimonials, revenue, user counts, or project outcomes.
- Use factual project descriptions from the provided resume text.
- Lead with pitches, not job titles.
- Keep “AI engineering” primary and “AI video production” secondary in navigation, order, scale, and copy length.
