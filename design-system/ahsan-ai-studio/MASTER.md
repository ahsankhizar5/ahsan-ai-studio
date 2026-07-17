# Ahsan AI Studio — Design System

This system turns the approved palette into hierarchy and meaning. It is not a poster translated into stacked color fields.

## Product definition

- Subject: Ahsan Khizar, one technical operator with two outputs.
- Primary offer: AI engineering for products, agents, automations, and applied ML systems.
- Secondary offer: AI-assisted video production for explainers, UGC, ads, demos, localization, and creative variations.
- Audience: founders, product teams, and marketing leads who need a capable builder they can trust.
- Site job: earn a qualified project inquiry by making capability, evidence, and the next step obvious.

## Design character

**Precise production studio.** Editorial scale supplies confidence; working-console details supply technical credibility; controlled cinematic framing gives the video practice a place without splitting the identity.

The page should feel premium because it is selective, well-spaced, legible, and evidence-led—not because every surface is glossy or every color is loud.

## Color architecture

| Semantic token | Value | Role |
|---|---:|---|
| `--ink` | `#070707` | Primary text, proof stages, authority |
| `--paper` | `#F7F7F4` | Main canvas, calm reading space |
| `--surface` | `#FFFFFF` | Elevated content and portrait field |
| `--mist` | `#E8EDF1` | Section distinction, quiet proof bands |
| `--signal-red` | `#FF3347` | Primary CTA, decision points, active status |
| `--signal-yellow` | `#E9F400` | Attention cue, capability highlight, never body copy |
| `--signal-cyan` | `#00D8D2` | Technical trace, systems metadata, focus reinforcement |
| `--line-dark` | `rgba(7,7,7,.18)` | Rules on light surfaces |
| `--line-light` | `rgba(255,255,255,.22)` | Rules on dark surfaces |

### Distribution

- 62% paper/surface: trust and legibility.
- 24% ink: authority and proof.
- 8% red: conversion and editorial emphasis.
- 4% yellow: attention and video energy.
- 2% cyan: technical signal and interaction detail.

Never place red, yellow, and cyan as three consecutive full-bleed sections. Never use yellow or cyan for paragraph text. Every color appearance must encode a role.

## Typography

- Display: **Anybody**, used for hero thesis and decisive section statements only.
- Body/UI: **Manrope**, used for explanations, navigation, metadata, and CTAs.
- Display sizes: fluid 48–132px with restrained line-height; no heading may exceed its layout track.
- Section headings: fluid 36–72px, sentence case where clarity improves scanning.
- Body: 16–20px, 1.55–1.7 line-height, maximum 68 characters.
- Utility labels: 11–13px, 600 weight, uppercase, 0.08–0.14em tracking.

Typography must create the hierarchy before color is introduced. Avoid compressing all content into uppercase display text.

## Spacing and layout

- 8px base rhythm.
- Page gutter: 20px mobile, 32px tablet, 48–72px desktop.
- Reading max width: 68ch.
- Major section spacing: 96–160px desktop, 72–112px mobile.
- Use an asymmetric 12-column desktop grid and single-column mobile flow.
- Use rules and aligned baselines to organize proof; avoid repetitive rounded card grids.

## Surface and depth

- Default radius: 0–2px for editorial surfaces; 16–20px only for functional floating glass layers.
- Glass is allowed for persistent navigation, mobile menu, and a small proof/control overlay only.
- Main content surfaces use solid paper, mist, or ink for better contrast and performance.
- Shadows are rare. Prefer borders, tonal shifts, and controlled overlap.

## Interaction

- One primary CTA per viewport: signal-red fill with ink or white text chosen by contrast.
- Secondary CTA: text link or paper button with a clear arrow.
- Touch targets: minimum 44×44px and 8px separation.
- Hover/press: 180–240ms; no layout-changing scale.
- Focus: 3px high-contrast outline using cyan on ink and ink on light surfaces.

## Motion

- Motion explains sequence: input → system → output.
- One orchestrated hero reveal and one desktop project-stage sequence are enough.
- Use transform/opacity/clip-path only; no custom cursor, scroll-jacking, or decorative parallax.
- Content is server-rendered and visible before JavaScript.
- Reduced motion removes pinning, scrub, stagger, and translated entrances.

## Factual integrity

- No client logos, testimonials, revenue claims, conversion percentages, or delivery promises without supplied evidence.
- Proof comes from real projects, roles, education, recognition, certifications, source links, and concrete contributions.
- Clearly distinguish shipped work, experiments, and offered services.

## Accessibility and responsive floor

- WCAG 2.2 AA contrast and keyboard behavior.
- One `h1`; sequential heading hierarchy.
- Test 375, 390, 768, 1024, and 1440px plus mobile landscape.
- No content loss at 200% zoom or reduced motion.
- The navigation and core inquiry path work without JavaScript.

## Forbidden defaults

- Purple/pink AI gradients.
- Generic Bento card dashboard.
- Full-screen stacks of raw palette colors.
- Fake stats, logos, testimonials, or project thumbnails.
- Repeated numbered decoration where order has no meaning.
- Every heading in uppercase condensed type.
- Glass on content cards.
- Decorative animation that delays proof or CTAs.
