# Ahsan Khizar Full Portfolio Expansion

## Objective

Expand the approved one-page portfolio into a complete, two-route personal website for Ahsan Khizar. The finished site must still feel like one serious person with one point of view: AI engineering is the primary practice, while AI video production is a complementary capability. The expansion adds richer personal data, clearer proof, a dedicated About page, controlled glass surfaces, and purposeful GSAP scroll choreography without replacing the approved visual direction.

## Approved Creative Direction

The existing signal-carmine, electric-citrus, studio-cyan, stage-black, optical-white, and light-silver palette remains the source of truth. The variable poster typography, hard color fields, thin rules, and asymmetric composition also remain.

The new expression is **Controlled Studio Glass**:

- Glass is functional, not decorative. It is limited to the floating navigation, the mobile menu, selected project information overlays, and compact status/proof surfaces.
- Solid poster fields continue to carry the brand. Glass never replaces the red, citrus, cyan, black, or white sections.
- The light-silver neutral provides pacing between saturated sections.
- `Media/22-SE-51.png` is the approved portrait for the About page and About preview.
- No prior personal-brand identity system or its visual assets will be inspected or reused.

## Audience and Conversion

Primary visitors are founders, product teams, and organizations seeking an AI engineer who can turn model capabilities into deployable products. Secondary visitors are marketing and product teams seeking AI-produced video without coordinating a separate production vendor.

The primary conversion remains a project inquiry by email. The secondary conversion is exploring selected engineering work. Every page must make the hierarchy unmistakable: engineering first, video second, one person throughout.

## Information Architecture

### Home — `/`

1. Floating navigation
2. Hero thesis
3. Credibility rail
4. Engineering capabilities
5. Selected engineering work
6. AI video production
7. Experience and recognition
8. Shared working process
9. About preview
10. Project inquiry
11. Footer

### About — `/about`

1. Floating navigation
2. Portrait-led introduction
3. Working philosophy
4. Current profile and education
5. Experience timeline
6. Technical capability index
7. Awards and certifications
8. Personal operating principles
9. Contact call to action
10. Footer

## Navigation

The header becomes a floating glass navigation surface with a readable solid fallback. It contains Ahsan Khizar’s name, Home, Work, Services, About, and Start a project. On the Home page, Work and Services deep-link to their sections. On the About page, the core Home and About routes remain visible while Home-section links navigate back to the corresponding anchors.

Desktop navigation is always reachable without covering content. Mobile uses a semantic button-controlled menu with `aria-expanded`, escape-key close behavior, route-change close behavior, and 44px minimum targets. The menu uses the same restrained glass material as the header, not a separate visual language.

## Home Page Design

### Hero

The first viewport preserves the approved asymmetric poster composition but becomes more spatially layered. Ahsan’s name anchors the left field; the selling line remains the memorable thesis:

> I build AI that works. And video that gets watched.

The right field introduces the two practices as solid color planes. A small glass proof strip carries factual context such as Software Engineering, applied AI, product systems, and worldwide collaboration. The primary CTA is Start a project; the secondary CTA is Explore engineering work.

### Engineering

Engineering owns the longest and strongest proof sequence. It includes deployable AI products, agents, workflow automation, integrations, model evaluation, and backend/product systems.

Selected work includes:

- Audio Deepfake Detection System
- DocuSync
- PIGEON Reproduction
- Customer Behavior Profiling

Each project presents the problem, system contribution, stack, and source link when a public repository exists. No outcomes, customers, or metrics are invented.

On desktop, one project sequence may pin while the project title and background field change with scroll. On mobile and reduced-motion modes, projects render as a normal vertical list with all information immediately visible.

### AI Video Production

The supporting practice remains shorter and clearly secondary. It presents avatar-led explainers, UGC and performance ads, product demonstrations, localized content, and creative variations. Copy focuses on message clarity, platform fit, pacing, and repeatable production rather than listing generative tools.

### Experience and Recognition

The Home page includes a concise proof band with factual highlights:

- Software Engineer Intern, Qadri Group
- Data Science & Analytics Intern, DevelopersHub Corporation
- Web Development Intern, Prodigy InfoTech
- 4th Position, All Pakistan Prompt Engineering Competition, 2026
- Top 20 Finalist, Global AI Hackathon 2026

The section links to the About page for the complete timeline.

### About Preview

The approved portrait appears in a hard-edged crop with a small glass caption containing name, location, and current focus. The adjacent copy introduces Ahsan as a final-year Software Engineering student who builds deployable AI systems and complements that work with AI video production.

## About Page Design

The About page is personal but professional. It uses the portrait as the dominant human anchor and avoids turning the page into a styled résumé.

The page includes:

- Final-year Software Engineering student at the University of Engineering and Technology, Taxila; Bachelor of Engineering in Software Engineering, September 2022 to December 2026.
- Experience at Qadri Group, DevelopersHub Corporation, and Prodigy InfoTech with concise factual contributions.
- Languages: Python, TypeScript, JavaScript, SQL, C#, and HTML/CSS.
- AI/ML: PyTorch, Scikit-learn, Pandas, NumPy, CLIP, ViT-B/32, anomaly detection, classification, and model evaluation.
- Backend/product: FastAPI, REST APIs, React, Next.js, Vite, Streamlit, PostgreSQL, Supabase, and Postman.
- Tools: Git, GitHub, GitHub Actions, Docker basics, Power BI, Codex, Claude Code, and LLM workflows.
- Recognition and certifications: All Pakistan Prompt Engineering Competition, Global AI Hackathon, Generative AI Application Developer, AI Basic to Advanced, Meta React Specialization, PEEF Scholar, and the DevelopersHub internship Best Award.

The writing remains direct and outcome-oriented. Dense factual groups use responsive indexed rows rather than repeated cards.

## Motion System

GSAP, `@gsap/react`, and ScrollTrigger provide motion. No paid GSAP plugins are required.

### Orchestrated moments

1. Hero load: name lines, thesis, capability fields, and navigation enter as one coordinated sequence.
2. Engineering work: one desktop-only pinned sequence updates project emphasis in response to scroll.
3. Video services: service rows reveal with a short, bounded stagger.
4. About portrait: a clip-path reveal introduces the portrait while the adjacent biography remains stable.
5. Navigation: the glass surface tightens slightly after the first viewport and reflects the active section through text and a small solid indicator.

### Motion constraints

- Native scrolling is preserved; no scroll-jacking or custom cursor.
- Text and controls are never parallaxed.
- Continuous animation is avoided.
- GSAP primarily animates transforms, opacity, and clip-path.
- Content is visible in the server-rendered default state. JavaScript enhances it after load instead of hiding it by default.
- `prefers-reduced-motion: reduce` skips timelines, pinning, scrubbing, and stagger delays while preserving the complete layout.
- Mobile uses shorter reveals and no pinned sections.
- ScrollTrigger instances are scoped and cleaned up during route changes.

## Component and Data Architecture

- `app/page.tsx`: server-rendered Home route.
- `app/about/page.tsx`: server-rendered About route with route-specific metadata.
- `app/components/SiteHeader.tsx`: responsive navigation and mobile menu.
- `app/components/SiteFooter.tsx`: shared identity and contact links.
- `app/components/MotionController.tsx`: client-only GSAP setup, scoped timelines, and cleanup.
- `app/components/CopyEmail.tsx`: accessible clipboard enhancement.
- `app/data/profile.ts`: single factual source for biography, experience, projects, capabilities, awards, certifications, and links.
- `app/globals.css`: tokens, layout, glass material, responsive behavior, reduced-motion mode, and component states.
- `public/ahsan-khizar.png`: optimized copy of the approved portrait with explicit dimensions.

The site remains functional without client-side animation. The only client state is navigation/menu behavior, active-section enhancement, and copy-email feedback.

## Glass Material

The glass surface uses a translucent stage-black or optical-white fill, a clear high-contrast border, `backdrop-filter` where supported, and a solid opaque fallback through `@supports`. Blur is capped and limited to small fixed surfaces to protect performance. Text contrast is evaluated against the composited material, not assumed from token values.

## Responsive Behavior

- 375px: single-column hierarchy, normal document flow, no pinned sections, compact glass navigation.
- 768px: expanded type rhythm, two-column proof rows where space permits.
- 1024px: asymmetric hero and selective sticky behavior.
- 1440px: full poster composition, wider project choreography, and generous pacing.
- Landscape mobile and 200% zoom retain navigation access and prevent horizontal overflow.

## Accessibility

- WCAG 2.2 AA target.
- One logical `h1` per route and sequential heading hierarchy.
- Skip link, semantic landmarks, route-aware navigation labels, descriptive project links, and visible focus states.
- Minimum 44px primary interaction targets and 8px spacing between adjacent mobile targets.
- Portrait alt text describes the image without unnecessary appearance judgments.
- Glass text maintains at least 4.5:1 contrast for body text.
- Reduced-motion behavior is fully equivalent, not an incomplete fallback.
- Mobile menu supports keyboard operation, escape close, and accurate expanded state.

## SEO and Structured Data

- Route-specific title, description, canonical URL, Open Graph data, and social preview.
- Person and ProfessionalService structured data remain factual.
- AboutPage structured data is added to `/about`.
- Sitemap includes both routes with absolute URLs derived from the request origin.
- Robots remains crawlable.
- Social preview stays aligned with the approved palette and one-person positioning.

## Performance

- Self-hosted font subsets remain.
- Portrait is resized and optimized before delivery, served with explicit dimensions and responsive sizing.
- GSAP and ScrollTrigger live in one client boundary and are not duplicated across sections.
- Below-fold content remains server-rendered.
- Blur is limited to small surfaces; large full-viewport backdrop filters are prohibited.
- No autoplay media, continuous ambient animation, or unnecessary icon library.

## Validation

The completed upgrade must pass:

1. Production build and lint.
2. Server-render tests for Home, About, metadata, structured data, sitemap, and robots.
3. Playwright checks at 1440px, 768px, 390px, and mobile landscape.
4. Navigation, mobile-menu, copy-email fallback, anchor, and About-route interaction checks.
5. Console and failed-network-request checks.
6. Horizontal-overflow and duplicate-ID checks.
7. Reduced-motion checks confirming no pinned or scrubbed experience remains active.
8. Accessibility, best-practices, SEO, and performance audits.
9. Visual screenshot review of the Home and About pages before private deployment.

## Explicit Non-Goals

- No blog, CMS, login, dashboard, pricing, testimonial, contact form backend, or invented client work.
- No broad glassmorphism theme, dark-plum redesign, gold treatment, previous kinetic identity, custom cursor, scroll-jacking, or paid GSAP plugins.
- No invented employment, clients, metrics, testimonials, outcomes, or certifications.
