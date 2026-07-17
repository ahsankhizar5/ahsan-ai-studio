# Full Portfolio Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the approved Ahsan Khizar portfolio into a production-ready Home and About website with factual personal data, controlled glass navigation, and accessible GSAP scroll choreography.

**Architecture:** Keep both routes server-rendered and store all factual profile content in one typed module. Small client boundaries handle the mobile navigation, copy-email feedback, and GSAP/ScrollTrigger enhancement; the complete site remains visible and usable without animation. Shared components and route-specific metadata keep the two-page experience coherent without turning the project into a component framework.

**Tech Stack:** Next.js 16, React 19, TypeScript, vinext, CSS, GSAP, `@gsap/react`, Playwright, Node test runner, Sites hosting.

## Global Constraints

- Preserve the approved stage-black, optical-white, signal-carmine, electric-citrus, studio-cyan, and light-silver palette.
- Use `Media/22-SE-51.png` as the only portrait source.
- Do not inspect or reuse any prior personal-brand identity system or its visual assets.
- AI engineering remains primary; AI video production remains complementary.
- Glass is limited to navigation, mobile navigation, selected project overlays, and compact proof/status surfaces.
- Use GSAP, `@gsap/react`, and ScrollTrigger only; no paid plugins, custom cursor, scroll-jacking, or text parallax.
- Server-rendered content is visible by default; JavaScript only enhances it.
- `prefers-reduced-motion: reduce` removes pinning, scrubbing, stagger delays, and translated entrances.
- Target WCAG 2.2 AA and test at 375px, 390px, 768px, 1024px, and 1440px.
- Do not invent clients, testimonials, employment, outcomes, metrics, certifications, or project links.

---

### Task 1: Centralize factual profile data

**Files:**
- Create: `app/data/profile.ts`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Produces: `profile`, `engineeringProjects`, `videoServices`, `experience`, `recognition`, `certifications`, `technicalCapabilities`, `process`, and their exported TypeScript types.
- Consumes: factual content from the approved specification and `Resume/Ahsan_Khizar_Resume.tex`.

- [ ] **Step 1: Add failing content contracts**

Add a source contract to `tests/rendered-html.test.mjs` that requires the typed data module and its factual anchors:

```js
test("defines the factual portfolio data source", async () => {
  const source = await readFile(new URL("../app/data/profile.ts", import.meta.url), "utf8");
  assert.match(source, /Audio Deepfake Detection System/i);
  assert.match(source, /Qadri Group/i);
  assert.match(source, /University of Engineering and Technology, Taxila/i);
  assert.match(source, /Generative AI Application Developer/i);
  assert.match(source, /PEEF Scholar/i);
});
```

- [ ] **Step 2: Run the test and confirm the missing About route fails**

Run: `npm run build && node --test tests/rendered-html.test.mjs`

Expected: FAIL with `ENOENT` because `app/data/profile.ts` does not exist.

- [ ] **Step 3: Create the typed data module**

Create `app/data/profile.ts` with concrete exports:

```ts
export type Link = { label: string; href: string };
export type Project = {
  name: string;
  category: string;
  description: string;
  contribution: string;
  stack: readonly string[];
  href?: string;
};
export type Experience = {
  role: string;
  organization: string;
  location: string;
  period: string;
  summary: string;
};

export const profile = {
  name: "Ahsan Khizar",
  email: "ahsankhizar1075@gmail.com",
  location: "Pakistan",
  education: {
    institution: "University of Engineering and Technology, Taxila",
    degree: "Bachelor of Engineering in Software Engineering",
    period: "September 2022 — December 2026",
  },
  links: {
    github: "https://github.com/ahsankhizar5",
    linkedin: "https://www.linkedin.com/in/ahsankhizar/",
  },
} as const;

export const engineeringProjects: readonly Project[] = [
  {
    name: "Audio Deepfake Detection System",
    category: "Security-oriented AI",
    description: "An audio anti-spoofing system built around an AASIST-style detection pipeline.",
    contribution: "Backend/API and model-integration direction focused on testable inputs and deployable model behavior.",
    stack: ["Python", "FastAPI", "PyTorch", "AASIST-style pipeline"],
  },
  {
    name: "DocuSync",
    category: "AI documentation automation",
    description: "A working system connecting GitHub pull requests to LLM drafting, human review, Notion sync, APIs, and persistent state.",
    contribution: "Built the automation workflow, backend APIs, database integration, and product interface.",
    stack: ["FastAPI", "Next.js", "PostgreSQL", "Gemini", "Notion API"],
    href: "https://github.com/ahsankhizar5/docusync",
  },
  {
    name: "PIGEON Reproduction",
    category: "Visual geolocation",
    description: "A PIGEON-style image-geolocation pipeline using visual embeddings and hierarchical geographic classification.",
    contribution: "Used frozen CLIP ViT-B/32 features, S2 Geometry, and confidence-based filtering.",
    stack: ["Python", "CLIP ViT-B/32", "S2 Geometry"],
    href: "https://github.com/ahsankhizar5/PIGEON_Reproduction",
  },
  {
    name: "Customer Behavior Profiling",
    category: "Fraud and anomaly detection",
    description: "A testable behavior-profiling workflow covering preprocessing, feature preparation, clustering, and experimentation.",
    contribution: "Built the analysis workflow and Streamlit delivery surface with automated tests.",
    stack: ["Python", "Pandas", "Scikit-learn", "Streamlit", "Pytest"],
    href: "https://github.com/ahsankhizar5/customer-behavior-profiling",
  },
] as const;
```

Complete the same module with these concrete exports:

```ts
export const experience: readonly Experience[] = [
  { role: "Software Engineer Intern", organization: "Qadri Group", location: "Lahore, Pakistan", period: "July 2025 — August 2025", summary: "Built engineering automation logic and contributed to private SolidWorks-based CAD automation tooling using C#, WinForms, and the SolidWorks API." },
  { role: "Data Science & Analytics Intern", organization: "DevelopersHub Corporation", location: "Remote", period: "May 2025 — June 2025", summary: "Applied Python, Pandas, NumPy, Matplotlib, SQL, and Power BI to real datasets and received the internship Best Award." },
  { role: "Web Development Intern", organization: "Prodigy InfoTech", location: "Remote", period: "September 2024 — October 2024", summary: "Developed responsive web projects with HTML5, CSS3, JavaScript, Bootstrap, browser debugging, and UI/UX implementation practices." },
] as const;

export const recognition = [
  "4th Position, All Pakistan Prompt Engineering Competition — 2026",
  "Top 20 Finalist, Global AI Hackathon — 2026",
] as const;

export const certifications = [
  "Generative AI Application Developer — NCEAC, Top Performer",
  "AI Basic to Advanced — ITSOLERA",
  "Meta React Specialization — Meta",
  "PEEF Scholar — Punjab Educational Endowment Fund, 2018–2026",
] as const;

export const videoServices = [
  { name: "Avatar-led explainers", description: "Turn a script into a credible on-screen presenter without scheduling a studio day." },
  { name: "UGC & performance ads", description: "Produce native-looking concepts and fast creative variations built for testing." },
  { name: "Product demonstrations", description: "Show the product, problem, and payoff before attention moves elsewhere." },
  { name: "Localized content", description: "Adapt voice, captions, pacing, and edits for new audiences." },
  { name: "Creative variations", description: "Build multiple hooks, cuts, and formats from one approved message." },
] as const;

export const technicalCapabilities = {
  languages: ["Python", "TypeScript", "JavaScript", "SQL", "C#", "HTML/CSS"],
  aiMl: ["PyTorch", "Scikit-learn", "Pandas", "NumPy", "CLIP", "ViT-B/32", "Anomaly detection", "Classification", "Model evaluation"],
  backendProduct: ["FastAPI", "REST APIs", "React", "Next.js", "Vite", "Streamlit", "PostgreSQL", "Supabase", "Postman"],
  tools: ["Git", "GitHub", "GitHub Actions", "Docker basics", "Power BI", "Codex", "Claude Code", "LLM workflows"],
} as const;

export const process = [
  { name: "Discover", description: "Clarify the audience, the problem, and what success must look like." },
  { name: "Design", description: "Choose the system architecture or creative treatment before production." },
  { name: "Build", description: "Engineer the working product or produce the complete video asset." },
  { name: "Refine", description: "Test, review, revise, and deliver a result ready for real use." },
] as const;
```

- [ ] **Step 4: Type-check through the production build**

Run: `npm run build`

Expected: PASS with the existing routes and the factual data-source contract.

- [ ] **Step 5: Commit the data foundation**

```bash
git add app/data/profile.ts tests/rendered-html.test.mjs
git commit -m "feat: centralize factual portfolio data"
```

### Task 2: Build the shared glass navigation and footer

**Files:**
- Create: `app/components/SiteHeader.tsx`
- Create: `app/components/SiteFooter.tsx`
- Move: `app/CopyEmail.tsx` to `app/components/CopyEmail.tsx`
- Delete: `app/SiteHeader.tsx`
- Modify: `app/globals.css`
- Modify: `tests/browser-audit.mjs`

**Interfaces:**
- Produces: `SiteHeader({ activePage }: { activePage: "home" | "about" })` and `SiteFooter()`.
- Consumes: `profile` from `app/data/profile.ts`.

- [ ] **Step 1: Add failing navigation browser checks**

Extend `tests/browser-audit.mjs`:

```js
assert.equal(await page.getByRole("navigation", { name: "Main navigation" }).count(), 1);
assert.ok((await page.locator(".site-header").boundingBox()).height >= 52);
if (name === "mobile") {
  const menu = page.getByRole("button", { name: /open menu/i });
  await menu.click();
  await expectVisible(page.getByRole("navigation", { name: "Mobile navigation" }));
  assert.equal(await menu.getAttribute("aria-expanded"), "true");
  await page.keyboard.press("Escape");
  assert.equal(await menu.getAttribute("aria-expanded"), "false");
}
```

Define the local helper in the same file:

```js
async function expectVisible(locator) {
  await locator.waitFor({ state: "visible" });
  assert.equal(await locator.isVisible(), true);
}
```

- [ ] **Step 2: Run the browser audit and verify the current details-menu contract fails**

Run: `node tests/browser-audit.mjs`

Expected: FAIL because the current mobile menu is a `<details>` element without the required button state or Escape behavior.

- [ ] **Step 3: Implement the shared header**

Create a client component with `useState`, `useEffect`, semantic links, scroll-aware class state, menu cleanup, and route-aware anchor targets. The public interface must remain:

```tsx
export function SiteHeader({ activePage }: { activePage: "home" | "about" })
```

Use `aria-current="page"` on the active route, `aria-expanded` and `aria-controls="mobile-menu"` on the menu button, and close the menu on Escape and after any menu link click.

- [ ] **Step 4: Implement the shared footer and move CopyEmail**

`SiteFooter` reads email, GitHub, and LinkedIn from `profile`, renders the current year, and preserves 44px targets. Update all imports to `app/components/CopyEmail.tsx`.

- [ ] **Step 5: Add controlled glass CSS**

Add semantic material tokens and a solid fallback:

```css
:root {
  --glass-light: oklch(0.98 0 0 / 0.78);
  --glass-dark: oklch(0.10 0.01 25 / 0.78);
  --glass-rule: oklch(0.98 0 0 / 0.42);
  --z-nav: 40;
  --z-menu: 50;
}

.site-header {
  position: fixed;
  z-index: var(--z-nav);
  inset: max(0.75rem, env(safe-area-inset-top)) clamp(0.75rem, 3vw, 2.5rem) auto;
  background: oklch(0.98 0 0 / 0.96);
  border: 1px solid oklch(0.06 0 0 / 0.22);
}

@supports (backdrop-filter: blur(12px)) {
  .site-header,
  .mobile-menu {
    background: var(--glass-light);
    backdrop-filter: blur(16px) saturate(1.16);
  }
}
```

Keep blur on these small fixed surfaces only. Add visible hover, active, focus-visible, and pressed states without wide shadows.

- [ ] **Step 6: Run lint and browser tests**

Run: `npm run lint && node tests/browser-audit.mjs`

Expected: PASS for desktop and mobile menu behavior.

- [ ] **Step 7: Commit the shared shell**

```bash
git add app/components app/SiteHeader.tsx app/CopyEmail.tsx app/globals.css tests/browser-audit.mjs
git commit -m "feat: add shared glass navigation shell"
```

### Task 3: Rebuild the Home landing page

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `tests/rendered-html.test.mjs`
- Create: `public/ahsan-khizar.png`

**Interfaces:**
- Consumes: `SiteHeader`, `SiteFooter`, `CopyEmail`, and all public exports from `app/data/profile.ts`.
- Produces: semantic section IDs `work`, `services`, `experience`, `process`, `about-preview`, and `contact` plus motion hooks using `data-*` attributes.

- [ ] **Step 1: Add failing Home structure assertions**

```js
assert.match(home, /id="work"/i);
assert.match(home, /id="services"/i);
assert.match(home, /id="experience"/i);
assert.match(home, /href="\/about"/i);
assert.match(home, /data-project-stage/i);
assert.match(home, /data-motion-page="home"/i);
```

- [ ] **Step 2: Run the rendered test and confirm it fails**

Run: `npm run build && node --test tests/rendered-html.test.mjs`

Expected: FAIL on the new section and motion contracts.

- [ ] **Step 3: Replace `app/page.tsx` with the complete Home narrative**

Build the approved section order with server-rendered maps over the typed data. Use one `h1`, ordered `h2` headings, descriptive source-link text, and these stable motion hooks:

```tsx
<main id="main-content" data-motion-page="home">
  <section className="hero-v2" aria-labelledby="hero-title">
    <h1 id="hero-title" data-hero-reveal>Ahsan <span>Khizar</span></h1>
    <p className="hero-thesis" data-hero-reveal>I build AI that works. And video that gets watched.</p>
    <a href="#work">Explore engineering work</a>
    <a href="#contact">Start a project</a>
  </section>
  <section id="work" data-project-stage aria-labelledby="work-title">
    <h2 id="work-title">Engineering that survives contact with reality.</h2>
    {engineeringProjects.map((project) => <article key={project.name} data-project-panel><h3>{project.name}</h3><p>{project.description}</p><p>{project.contribution}</p></article>)}
  </section>
  <section id="services" aria-labelledby="services-title">
    <h2 id="services-title">Turn the idea into something people will watch.</h2>
    <div data-reveal-group>{videoServices.map((service) => <article key={service.name}><h3>{service.name}</h3><p>{service.description}</p></article>)}</div>
  </section>
  <section id="experience" aria-labelledby="experience-title">
    <h2 id="experience-title">Proof from the work.</h2>
    {experience.map((item) => <article key={`${item.organization}-${item.role}`}><h3>{item.role}</h3><p>{item.organization}</p><p>{item.summary}</p></article>)}
    <a href="/about">Read the full story</a>
  </section>
  <section id="process" aria-labelledby="process-title"><h2 id="process-title">One method. Different outputs.</h2><ol>{process.map((step) => <li key={step.name}><h3>{step.name}</h3><p>{step.description}</p></li>)}</ol></section>
  <section id="about-preview" data-portrait-reveal aria-labelledby="about-preview-title"><h2 id="about-preview-title">Technical enough to build it. Creative enough to make it land.</h2><img src="/ahsan-khizar.png" width={960} height={1138} alt="Portrait of Ahsan Khizar" /><a href="/about">About Ahsan</a></section>
  <section id="contact" aria-labelledby="contact-title"><h2 id="contact-title">Build the system. Create the cut.</h2><a href={`mailto:${profile.email}`}>Start a project</a></section>
</main>
```

Render all four projects and all five experience/recognition proof items. Add Person and ProfessionalService JSON-LD using only data from `profile`.

- [ ] **Step 4: Optimize the approved portrait for the Home preview and About page**

Run:

```powershell
python -c "from PIL import Image; p=r'C:\Users\ahsan\Downloads\Profile\Media\22-SE-51.png'; im=Image.open(p).convert('RGB'); im.thumbnail((960, 1200), Image.Resampling.LANCZOS); im.save(r'public\ahsan-khizar.png', optimize=True); print(im.size)"
```

Use the printed dimensions in the Home portrait attributes and retain the file for Task 4.

- [ ] **Step 5: Replace the Home CSS with the Controlled Studio Glass layout**

Preserve the approved color tokens and self-hosted fonts. Create a mobile-first composition, then enhance at 768px, 1024px, and 1440px. Use hard-edged poster fields, responsive indexed rows, one sticky desktop project stage, and no repeated card grid.

- [ ] **Step 6: Build and run rendered tests**

Run: `npm run build && node --test tests/rendered-html.test.mjs`

Expected: all current Home and crawl-endpoint assertions pass.

- [ ] **Step 7: Commit the landing page**

```bash
git add app/page.tsx app/globals.css public/ahsan-khizar.png tests/rendered-html.test.mjs
git commit -m "feat: rebuild full portfolio landing page"
```

### Task 4: Build the portrait-led About page

**Files:**
- Create: `app/about/page.tsx`
- Reuse: `public/ahsan-khizar.png`
- Modify: `app/globals.css`
- Modify: `app/sitemap.xml/route.ts`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: profile data, `SiteHeader`, `SiteFooter`, and `CopyEmail`.
- Produces: `/about`, AboutPage JSON-LD, and an absolute sitemap entry for `/about`.

- [ ] **Step 1: Verify the approved portrait asset**

Read the image dimensions and confirm the Task 3 asset is no larger than 960×1200:

```powershell
python -c "from PIL import Image; im=Image.open(r'public\ahsan-khizar.png'); print(im.size); assert im.width <= 960 and im.height <= 1200"
```

Expected: the saved dimensions print and the assertion passes.

- [ ] **Step 2: Add the About route**

Create `app/about/page.tsx` with `export const metadata`, one `h1`, explicit portrait dimensions, factual biography, education, three-role experience timeline, grouped technical capability rows, awards/certifications, operating principles, and contact CTA.

Use the image contract:

```tsx
<img
  src="/ahsan-khizar.png"
  width={960}
  height={1138}
  alt="Portrait of Ahsan Khizar"
  sizes="(max-width: 760px) 100vw, 42vw"
  fetchPriority="high"
/>
```

Read the actual optimized dimensions and replace `960` and `1138` if Pillow reports different values.

- [ ] **Step 3: Extend the sitemap**

Return both absolute route entries:

```ts
const pages = ["/", "/about"];
const urls = pages.map((path) => `  <url><loc>${origin}${path}</loc><changefreq>monthly</changefreq><priority>${path === "/" ? "1.0" : "0.8"}</priority></url>`).join("\n");
```

- [ ] **Step 4: Add route, factual content, and metadata tests**

Add and satisfy the About assertions only now: `/about` status, University of Engineering and Technology, Taxila, Bachelor of Engineering in Software Engineering, Generative AI Application Developer, PEEF Scholar, title, canonical link, AboutPage JSON-LD, portrait dimensions, and both sitemap URLs.

- [ ] **Step 5: Build and run rendered tests**

Run: `npm run build && node --test tests/rendered-html.test.mjs`

Expected: all rendered-route tests PASS.

- [ ] **Step 6: Commit the About experience**

```bash
git add app/about/page.tsx app/globals.css app/sitemap.xml/route.ts public/ahsan-khizar.png tests/rendered-html.test.mjs
git commit -m "feat: add portrait-led about page"
```

### Task 5: Add accessible GSAP motion choreography

**Files:**
- Create: `app/components/MotionController.tsx`
- Modify: `app/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/globals.css`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `tests/browser-audit.mjs`

**Interfaces:**
- Produces: `MotionController({ page }: { page: "home" | "about" }): null`.
- Consumes: stable `data-hero-reveal`, `data-project-stage`, `data-project-panel`, `data-reveal-group`, and `data-portrait-reveal` hooks.

- [ ] **Step 1: Install motion dependencies**

Run: `npm install gsap @gsap/react`

Expected: `package.json` and `package-lock.json` add both packages without installing a second animation library.

- [ ] **Step 2: Add failing reduced-motion browser checks**

Create a reduced-motion page context and assert no pinned spacer or transformed content remains after load:

```js
const reducedPage = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
await reducedPage.goto("http://localhost:3000", { waitUntil: "networkidle" });
assert.equal(await reducedPage.locator(".pin-spacer").count(), 0);
assert.equal(await reducedPage.locator("html").getAttribute("data-motion"), "reduced");
await reducedPage.close();
```

- [ ] **Step 3: Implement `MotionController`**

Use one client boundary and cleanup all GSAP state:

```tsx
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function MotionController({ page }: { page: "home" | "about" }) {
  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
    if (reduced) return;

    gsap.from("[data-hero-reveal]", {
      y: 28,
      opacity: 0,
      duration: 0.72,
      stagger: 0.08,
      ease: "expo.out",
      clearProps: "transform,opacity",
    });

    gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
      gsap.from(group.children, {
        y: 18,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: group, start: "top 84%", once: true },
      });
    });

    const media = gsap.matchMedia();
    media.add("(min-width: 1024px)", () => {
      const stage = document.querySelector<HTMLElement>("[data-project-stage]");
      const panels = gsap.utils.toArray<HTMLElement>("[data-project-panel]");
      if (!stage || panels.length < 2) return;
      gsap.timeline({ scrollTrigger: { trigger: stage, start: "top top", end: "+=180%", scrub: 0.8, pin: true } })
        .fromTo(panels.slice(1), { autoAlpha: 0, yPercent: 8 }, { autoAlpha: 1, yPercent: 0, stagger: 0.75, ease: "none" });
    });

    return () => media.revert();
  }, { dependencies: [page], revertOnUpdate: true });

  return null;
}
```

Add this portrait reveal inside the same hook while keeping body text stationary:

```ts
const portrait = document.querySelector<HTMLElement>("[data-portrait-reveal]");
if (portrait) {
  gsap.from(portrait, {
    clipPath: "inset(100% 0 0 0)",
    duration: 0.75,
    ease: "expo.out",
    clearProps: "clipPath",
    scrollTrigger: { trigger: portrait, start: "top 82%", once: true },
  });
}
```

- [ ] **Step 4: Mount the controller once per route**

Add `<MotionController page="home" />` and `<MotionController page="about" />` as the final children before each route’s JSON-LD script.

- [ ] **Step 5: Add reduced-motion CSS**

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  [data-project-stage] { min-height: auto; }
  [data-project-panel] { position: static; opacity: 1; transform: none; }
}
```

- [ ] **Step 6: Run build, rendered tests, and browser audit**

Run: `npm run build && node --test tests/rendered-html.test.mjs && node tests/browser-audit.mjs`

Expected: PASS with no console errors, failed asset requests, horizontal overflow, or reduced-motion pin spacer.

- [ ] **Step 7: Commit motion**

```bash
git add app/components/MotionController.tsx app/page.tsx app/about/page.tsx app/globals.css package.json package-lock.json tests/browser-audit.mjs
git commit -m "feat: add accessible GSAP scroll choreography"
```

### Task 6: Final quality audit and private deployment

**Files:**
- Modify: `app/layout.tsx`
- Modify: `public/og.png` only if the existing approved card no longer matches the final route copy
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: the complete Home and About implementation.
- Produces: validated build artifacts and a new private Sites version.

- [ ] **Step 1: Finalize metadata**

Keep request-host-derived canonical and Open Graph URLs. Ensure the Home title is `Ahsan Khizar — AI Engineer & AI Video Producer`, the About title resolves to `About Ahsan Khizar`, and `public/og.png` remains 1200×630.

- [ ] **Step 2: Run standards scans**

Run:

```powershell
npm run build
node --test tests/rendered-html.test.mjs
npm run lint
node tests/browser-audit.mjs
git diff --check
```

Expected: all commands PASS.

- [ ] **Step 3: Run browser quality audits**

Audit Home and About for accessibility, best practices, SEO, and performance. Require Accessibility ≥95, Best Practices ≥95, SEO 100, no critical contrast failure, CLS <0.1, no console errors, and no missing assets. Capture full-page screenshots at 1440×1000 and 390×844 and visually inspect both routes.

- [ ] **Step 4: Commit the exact validated source**

```bash
git add -A
git commit -m "feat: complete full Ahsan portfolio experience"
git rev-parse HEAD
```

- [ ] **Step 5: Push, package, save, and privately deploy**

Reuse the existing Sites project ID from `.openai/hosting.json`, obtain a fresh short-lived source credential, push the exact validated commit, package with the Sites helper, save one version, deploy with owner-only access, and poll until the deployment succeeds or fails.

- [ ] **Step 6: Verify the deployed result**

Open the private production URL in Codex when the capability is available and confirm Home, About, portrait, navigation, and social metadata load. Return the private deployed URL as the primary user deliverable.
