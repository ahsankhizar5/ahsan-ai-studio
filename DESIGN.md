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

- Responsive contracts are verified at 375px, 390px, 768px, 1024px, and 1440px with no horizontal overflow or hidden substantive content.
- The viewport-led homepage hero uses local responsive WebP media; mobile keeps the positioning copy and actions above the capability rail without replacing the media or message.
- Use a 4px-based spacing scale with deliberate tight groups and generous section separations.
- Hard-edged fields and 1px rules create structure. Section and card radii never exceed 14px; avoid rounded card grids and decorative shadows.
- AI engineering receives the strongest colored field and the largest proof section. AI video remains visually distinct but shorter.

## Components

- Header: name, compact discipline statement, anchor navigation, project CTA. Purposeful glass is reserved for the hero header only.
- Hero: local cinematic media, primary selling line, short positioning copy, two outcome-led CTAs, and a capability rail.
- Project stage: four keyboard-operable tabs on tablet and desktop; all four projects become a complete linear reading sequence on mobile.
- Engineering field: selling headline, capabilities, and real project proof, followed by one connected system-to-story pipeline.
- Video field: a concise communication layer with formats including avatars, UGC, ads, demos, explainers, localization, and content variations.
- Process strip: one shared process across both capabilities.
- About/proof section: concise biography, selected recognition, GitHub and LinkedIn links. The homepage contains no portrait; the About figure layers the factual portrait over three aria-hidden carmine, citrus, and cyan color fields with a semantic caption.
- Contact section: direct email CTA with accessible copy-to-email enhancement.
- Footer: one identity, social links, current year.

## Motion

Use one orchestrated hero entrance, a focused connected-pipeline reveal, a focused About portrait reveal, and concise interaction feedback. Motion never gates content visibility. No scroll-jacking, parallax, cursor replacement, blanket section fades, or canvas effects. Keep feedback under 300ms and provide a `prefers-reduced-motion` path that removes translation and timing delays and avoids downloading motion code.

## Content Rules

- Do not invent clients, testimonials, revenue, user counts, or project outcomes.
- Use factual project descriptions from the provided resume text.
- Lead with pitches, not job titles.
- Keep “AI engineering” primary and “AI video production” secondary in navigation, order, scale, and copy length.
