# Unified Homepage Redesign

Date: 2026-07-21  
Status: Approved visual direction; implementation pending  
Prototype: `C:/Users/ahsan/.codex/visualizations/2026/07/16/019f6cb3-5d94-7b32-b2eb-309ecdb94e68/unified-homepage-prototype/homepage-full.png`

## Objective

Redesign the portfolio homepage as one coherent, conversion-focused story for Ahsan Khizar: an AI product engineer who also creates the demos and launch content that help people understand the product. AI video remains a communication layer within the same practice, not a separate persona or competing service.

The homepage must feel cinematic, serious, technically credible, and commercially useful. It must remove Ahsan's portrait from the homepage, preserve the approved copy and color system, reduce section clutter, and create a deliberate visual and narrative flow. Ahsan's portrait will become an expressive About-page asset.

## Preserved foundations

- Keep the current brand palette and OKLCH tokens: stage black, optical white, signal carmine, electric citrus, studio cyan, and light silver.
- Keep Anybody as the display family and Manrope as the body/UI family.
- Keep all factual profile, project, experience, recognition, certification, and contact data.
- Keep the approved hero message verbatim:
  - “I transform complex AI ideas into powerful products people understand and trust.”
  - “From the system behind the product to the demos and launch content that explain it, I lead the work as one connected build.”
- Keep AI engineering primary in hierarchy, proof, navigation order, and content volume.
- Do not reuse any earlier kinetic personal-brand system or introduce a second persona.
- Preserve saved Sites versions 1–4 for rollback.

## Reference synthesis

The implementation will borrow principles rather than copy layouts or assets:

- Fauna Robotics: large media moments, generous breathing room, short section headlines, and a continuous page rhythm.
- COSMOQ: dark cinematic depth, focused luminous accents, and a strong system/product presentation.
- Red-noir reference: black and deep-red atmosphere with restrained gold light, used primarily in the hero and closing conversion scene.
- Visual Identity Studio: proof before service detail and a direct path toward project inquiry.
- Attached icon reference: a compact rounded-square container with a bold abstract internal form. The final mark will be an original AK-derived glyph, not a copy of the reference logo.

## Homepage information architecture

The homepage will use seven connected scenes. They share the same content frame, rule treatment, typography, and transition language so they read as one page rather than unrelated sections.

### 1. Cinematic hero

- Full-viewport, image-led hero with no portrait.
- Use the approved generated “system to screen” studio artwork as the local poster and initial hero medium.
- Add restrained continuous motion using a slow media-scale drift and lightweight signal/glow overlays. Do not use the third-party LinkFlow or Lithos assets.
- Keep a dark left-side reading field and place the exact approved hero message in the lower-left visual zone.
- Use one primary CTA, “Discuss your project,” and one secondary CTA, “View selected work.”
- Add a short “Engineering first” note on desktop only.
- Finish the hero with a four-part capability rail: Applied AI, Product systems, Communication, and location/availability.

The hero should feel like a single system moving toward a finished screen story. It must not resemble two side-by-side service advertisements.

### 2. Positioning and credibility

- Use a large statement: “Bring the problem. Leave with something real.”
- Explain that Ahsan handles the system, product surface, and communication layer without splitting responsibility across separate teams.
- Follow with a single credibility rail containing education, professional range, and the two verified competition signals.
- Do not add invented clients, logos, statistics, or testimonials.

### 3. Selected engineering evidence

- Use one dominant case-study stage rather than a grid of equally weighted cards.
- Display four factual project selectors: DocuSync, PIGEON Reproduction, Audio Deepfake Detection, and Customer Behavior Profiling.
- The selected case shows the project name, description, contribution, stack, and a visual system flow.
- Desktop interaction changes the active case without horizontal page scrolling; mobile stacks each case in normal document order.
- Project links remain descriptive and accessible.

### 4. One connected build

- Use a single electric-citrus field with three connected phases:
  1. Engineer the intelligence.
  2. Make it usable.
  3. Make the value clear.
- The third phase is the communication layer and receives less copy than the engineering/product phases.
- The layout must read as one pipeline, not a service-pricing grid.

### 5. AI video communication layer

- Use a signal-carmine field continuing directly from the pipeline.
- Headline: “When the product needs a story, I make that too.”
- Explain that AI video communicates the same product's value.
- Present factual formats as a typographic list: product demonstrations, avatar-led explainers, UGC/performance ads, localization, and variations.
- Do not show a second persona, a second portrait, or a separate brand identity.

### 6. Process and recognition

- Use one light-silver scene containing the existing four-step process: Discover, Design, Build, Refine.
- Numbers are appropriate here because the process is sequential.
- Follow with a compact recognition band using only verified competition results.

### 7. Conversion and footer

- Close with a deep red-noir scene and the prompt: “What should your AI product make possible?”
- Use a gold/citrus text accent and one direct email CTA.
- Keep the footer compact: navigation, About, GitHub, LinkedIn, email, and location.

## Navigation and icon

- Use a fixed rounded-rectangle navigation shell with purposeful dark glass over the hero and a solid accessible state after leaving the hero.
- Left: original AK mark, name, and a compact discipline line.
- Center on desktop: Work, Practice, Process, Contact.
- Right: Start a project.
- Mobile: accessible menu button and full-height menu panel using existing keyboard/focus behavior.
- All controls must have at least a 44px comfortable target and visible focus styling.

## About page

- Remove every portrait instance from the homepage.
- Keep the portrait on `/about` and make it the primary visual asset there.
- Use the existing source portrait with a background-removed or masked presentation, layered against carmine, citrus, cyan, and black color fields.
- The visual treatment may respond to scroll with restrained clip/mask movement, but the face and body must remain recognizable and unwarped.
- Preserve all factual biography, experience, education, certifications, recognition, and links.
- The About page should feel related to the homepage through the same navigation, typography, rules, and color transitions.

## Motion system

Motion will be concentrated in a few meaningful moments:

- Hero: one coordinated load sequence, slow background drift, and subtle signal-light movement.
- Work stage: GSAP-assisted active-project transition using opacity, clip, and short positional changes.
- Connected pipeline: one scroll-triggered line/progress reveal.
- About portrait: one restrained mask or color-field reveal.
- Navigation: short background and contrast transition after the hero.
- Buttons and links: sub-300ms feedback only.

There will be no scroll-jacking, custom cursor, infinite glitch text, blanket fade-up effects, large canvas frame buffers, or pointer-only interaction. Reduced-motion visitors receive static media, immediate content, and no translated entrances.

## Media and performance strategy

- Store the approved hero poster locally in `public/` and serve responsive formats where practical.
- The first implementation will create motion from the local artwork and lightweight overlays; it will not depend on unrelated third-party video URLs.
- If a custom brand-specific video loop is supplied later, the hero component can accept it behind the same poster and overlay system.
- Prioritize the hero poster, keep below-fold imagery lazy, and reserve media dimensions to prevent layout shift.
- Keep GSAP out of the critical rendering path and avoid animation work for reduced-motion visitors.
- Do not implement the supplied canvas boomerang technique because retaining a full video as many canvas frames creates avoidable memory and battery cost.

## Component boundaries

- `SiteHeader`: navigation, scroll state, mobile menu, and AK mark.
- `HeroMedia`: poster, optional future video source, overlays, and reduced-motion behavior.
- `HomepageHero`: message, CTAs, desktop note, and capability rail.
- `ProjectStage`: project selection and active-case presentation driven by existing profile data.
- `ConnectedBuild`: the three-phase engineering-to-communication sequence.
- `VideoLayer`: secondary video capability copy and formats.
- `ProcessSection`: ordered working method.
- `RecognitionBand`: verified recognition only.
- `ContactSection`: primary inquiry CTA and footer transition.
- `MotionController`: progressive GSAP enhancement with safe cleanup and reduced-motion handling.

The existing `app/data/profile` remains the source of truth. Presentation components must not duplicate factual content into separate data structures unless a small view-specific mapping is required.

## Responsive behavior

- Validate at 375px, 390px, 768px, 1024px, and 1440px.
- The hero remains readable at `100dvh` without hiding CTAs behind browser chrome.
- Long headline words must never overflow; display size and measure adapt together.
- Project interaction becomes normal stacked reading order on touch/mobile.
- Capability and process sequences stack without horizontal page scrolling.
- Desktop-only supporting notes are removed when they compete with the primary message.

## Accessibility and resilience

- Meet WCAG 2.2 AA contrast and focus requirements.
- Keep semantic headings and landmarks in logical order.
- Support keyboard navigation for the menu and project selector.
- Use descriptive links and meaningful alt text.
- Do not hide core content behind JavaScript or animation state.
- If animation or optional media fails, the poster, copy, CTAs, projects, and contact path remain fully usable.

## Validation

- Run lint and the production build.
- Update rendered HTML tests for the new semantic structure and preserved content.
- Test the homepage and About page at all target widths for overflow and unlabeled controls.
- Run axe checks on homepage and About at desktop and mobile sizes.
- Confirm reduced-motion behavior and keyboard navigation.
- Verify the hero media has a stable aspect/viewport treatment and does not block interaction.
- Check that the homepage contains no portrait image references.
- Check that `/about` contains the portrait and all factual profile content.
- Run the existing quality detector and source diff checks.

## Publishing and rollback

- Commit the exact validated source, package it, and save it as a new Sites version.
- Publish only after the implementation has been reviewed and approved.
- Keep Sites versions 1–4 unchanged. The new release becomes an additional version, allowing the current live version or any earlier design to be restored without reconstructing it.

## Acceptance criteria

The redesign is complete when:

1. The live homepage visually matches the approved prototype's hierarchy, palette, and cinematic direction.
2. The exact approved hero message is present and reads as one connected offer.
3. No portrait appears on the homepage; the portrait receives an intentional treatment on `/about`.
4. The homepage reads as a continuous narrative rather than a collection of unrelated cards or hiring-oriented sections.
5. Engineering work is the primary proof and AI video is clearly secondary.
6. Motion is purposeful, performant, responsive, and reduced-motion safe.
7. All factual content, contact paths, accessibility requirements, tests, and rollback history remain intact.
