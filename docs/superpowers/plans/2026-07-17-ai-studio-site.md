# Ahsan Khizar AI Studio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a responsive one-page portfolio that presents Ahsan Khizar as an AI engineer with a complementary AI-video production service.

**Architecture:** Preserve the Sites vinext/Next structure and implement the page as focused server-rendered React components with one small client enhancement for the mobile menu and copy-email feedback. Use semantic CSS tokens and no unnecessary runtime dependencies.

**Tech Stack:** React 19, Next-compatible App Router via vinext, TypeScript, CSS, Node test runner, Cloudflare Workers/Sites.

## Global Constraints

- Approved visual contract: `docs/design/approved-direction.png` and `DESIGN.md`.
- One identity; AI engineering primary, AI video secondary.
- No reused prior identity assets or tokens.
- WCAG 2.2 AA, reduced motion, 44px targets, 375–1440px responsive coverage.
- No invented clients, metrics, testimonials, or outcomes.

---

### Task 1: Replace the starter with the semantic site shell

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Create: `app/SiteHeader.tsx`
- Create: `app/CopyEmail.tsx`
- Delete: `app/_sites-preview/SkeletonPreview.tsx`
- Delete: `app/_sites-preview/preview.css`

**Interfaces:**
- `SiteHeader` renders the anchor navigation and accessible mobile control.
- `CopyEmail({ email: string })` progressively enhances a visible mail link.

- [ ] Write rendered-HTML assertions for the final title, H1, landmarks, engineering, video, and contact content.
- [ ] Run `npm test` and confirm the starter-specific assertions fail.
- [ ] Implement the complete semantic page and metadata.
- [ ] Apply the approved token, typography, layout, interaction, and reduced-motion system.
- [ ] Remove the starter preview and `react-loading-skeleton` dependency.
- [ ] Run `npm test` and confirm all rendered-HTML assertions pass.

### Task 2: Add crawlable SEO and production metadata

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`
- Create: `public/favicon.svg`

**Interfaces:**
- Root metadata supplies title template, description, canonical, Open Graph, and X fields.
- Page JSON-LD exposes `Person` and `ProfessionalService` without fabricated reviews.

- [ ] Add tests for title, description, canonical, JSON-LD, robots, and sitemap output.
- [ ] Implement the metadata and structured data.
- [ ] Run `npm test` and inspect output for unique title and single H1.

### Task 3: Validate behavior and quality

**Files:**
- Modify: `tests/rendered-html.test.mjs`
- Create: `tests/browser-quality.mjs`

**Interfaces:**
- Browser test validates keyboard navigation, anchor targets, copy-email feedback, responsive overflow, reduced motion, and console cleanliness.

- [ ] Run the production build.
- [ ] Test desktop, tablet, 375px mobile, and mobile landscape.
- [ ] Run accessibility, SEO, performance, and best-practice audits.
- [ ] Fetch and apply the current Web Interface Guidelines.
- [ ] Fix all critical and high findings, then rerun tests.

### Task 4: Publish the validated source

**Files:**
- Modify: `.openai/hosting.json` only with the Sites project ID returned by Sites.

**Interfaces:**
- The saved Sites version maps exactly to the validated pushed commit.

- [ ] Commit the exact validated source.
- [ ] Package and save one Sites version.
- [ ] Deploy privately and poll until the deployment succeeds.
- [ ] Open and return the live URL.
