# Unified Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current segmented portfolio homepage with the approved cinematic, conversion-focused “system to story” experience and move all portrait-led presentation to a redesigned About page.

**Architecture:** Keep the existing Vinext/Next app, factual data source, routes, and Sites configuration. Compose the homepage from focused server components plus one client-side accessible project selector; treat GSAP as a deferred progressive enhancement, while CSS and semantic HTML provide the complete default experience. Store hero media locally and keep the current deployed versions available for rollback.

**Tech Stack:** React 19, TypeScript, Vinext/Next 16, CSS, GSAP 3, Node test runner, Playwright, axe-core, OpenNext/Cloudflare Sites.

## Global Constraints

- Preserve the exact hero copy: “I transform complex AI ideas into powerful products people understand and trust.”
- Preserve the exact support copy: “From the system behind the product to the demos and launch content that explain it, I lead the work as one connected build.”
- Preserve stage black, optical white, signal carmine, electric citrus, studio cyan, and light silver as OKLCH tokens.
- Preserve Anybody for display and Manrope for body/UI typography.
- AI engineering remains primary; AI video remains a smaller communication layer within the same practice.
- No portrait may appear on the homepage. `/about` must keep the existing portrait and factual profile content.
- Do not add third-party video/image runtime dependencies, new npm dependencies, fabricated clients, testimonials, metrics, or project outcomes.
- Do not use scroll-jacking, a custom cursor, pointer-only interactions, canvas frame buffers, repeated blanket fade-ups, or unrelated LinkFlow/Lithos assets.
- Meet WCAG 2.2 AA, preserve visible focus, support keyboard navigation, honor `prefers-reduced-motion`, and keep controls at least 44px high.
- Validate at 375px, 390px, 768px, 1024px, and 1440px with no horizontal overflow.
- Keep Sites versions 1–4 unchanged and save this redesign as an additional reversible version.

---

## File structure

### Create

- `app/components/AkMark.tsx` — reusable CSS-driven AK mark with no authored SVG.
- `app/components/HeroMedia.tsx` — decorative responsive poster, optical overlays, and signal-light layers.
- `app/components/HomepageHero.tsx` — exact hero message, CTAs, desktop note, and capability rail.
- `app/components/ProjectStage.tsx` — accessible desktop tab interface and stacked mobile project evidence.
- `app/components/ConnectedBuild.tsx` — engineering → product → communication sequence and video-format continuation.
- `app/components/AboutPortrait.tsx` — portrait plus non-destructive color-field treatment for `/about`.
- `public/hero-system-story-960.webp` — mobile/tablet hero poster.
- `public/hero-system-story-1728.webp` — desktop hero poster.

### Modify

- `app/page.tsx` — compose the approved seven-scene homepage and remove portrait markup.
- `app/about/page.tsx` — use `AboutPortrait` and preserve factual content.
- `app/components/SiteHeader.tsx` — new mark, compact discipline line, navigation labels, solid scrolled state, and accessible menu label.
- `app/components/MotionController.tsx` — replace generic reveals with the approved hero/pipeline/About enhancements.
- `app/globals.css` — replace the current conversion-home presentation with the approved cohesive visual system and responsive rules.
- `app/layout.tsx` — keep unified positioning in metadata and update hero social-description language without changing the existing OG asset.
- `tests/rendered-html.test.mjs` — semantic, copy, asset, homepage-no-portrait, About-portrait, and reduced-motion contracts.
- `tests/browser-audit.mjs` — add hero viewport and project-tab keyboard assertions while preserving all viewport checks.
- `PRODUCT.md` and `DESIGN.md` — document the approved connected-homepage structure and media/motion rules.

---

### Task 1: Lock responsive hero media

**Files:**
- Create: `public/hero-system-story-960.webp`
- Create: `public/hero-system-story-1728.webp`
- Modify: `tests/rendered-html.test.mjs:17-156`

**Interfaces:**
- Consumes: approved generated image at `C:/Users/ahsan/.codex/generated_images/019f6cb3-5d94-7b32-b2eb-309ecdb94e68/exec-9f91b49b-33d2-4d57-b5ee-348a7de7b1f0.png`.
- Produces: `/hero-system-story-960.webp` and `/hero-system-story-1728.webp`; source/render contracts used by later tasks.

- [ ] **Step 1: Add a failing responsive-media contract**

Add this asset test:

```js
test("ships local responsive hero media", async () => {
  const [small, large] = await Promise.all([
    readFile(new URL("../public/hero-system-story-960.webp", import.meta.url)),
    readFile(new URL("../public/hero-system-story-1728.webp", import.meta.url)),
  ]);
  assert.ok(small.byteLength > 40_000);
  assert.ok(large.byteLength > 100_000);
});
```

- [ ] **Step 2: Run the tests and confirm the new contract fails**

Run:

```powershell
npm test
```

Expected: failure because the two WebP assets do not exist.

- [ ] **Step 3: Generate responsive local WebP assets**

Run with the bundled workspace Python runtime:

```powershell
$python = 'C:\Users\ahsan\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
$source = 'C:\Users\ahsan\.codex\generated_images\019f6cb3-5d94-7b32-b2eb-309ecdb94e68\exec-9f91b49b-33d2-4d57-b5ee-348a7de7b1f0.png'
$root = (Resolve-Path 'public').Path
& $python -c "from PIL import Image; from pathlib import Path; src=Image.open(r'$source').convert('RGB'); root=Path(r'$root'); [(src.resize((w, round(src.height*w/src.width)), Image.Resampling.LANCZOS).save(root/f'hero-system-story-{w}.webp','WEBP',quality=86,method=6)) for w in (960,1728)]"
```

Verify:

```powershell
Get-Item public\hero-system-story-960.webp,public\hero-system-story-1728.webp | Select-Object Name,Length
```

Expected: both files exist; the 1728px asset is larger than the 960px asset.

- [ ] **Step 4: Run the asset contract and commit**

```powershell
npm test
git add public/hero-system-story-960.webp public/hero-system-story-1728.webp tests/rendered-html.test.mjs
git commit -m "test: lock unified homepage media contracts"
```

Expected: the complete existing test suite passes with the responsive hero assets present.

---

### Task 2: Build the AK mark and navigation shell

**Files:**
- Create: `app/components/AkMark.tsx`
- Modify: `app/components/SiteHeader.tsx:1-110`
- Modify: `app/globals.css:126-228`
- Test: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `activePage: "home" | "about"` and the existing anchor routing behavior.
- Produces: `<AkMark />`, `.site-header`, `.brand-lockup`, `.desktop-nav`, `.mobile-menu`, and `.header-cta` for every route.

- [ ] **Step 1: Add failing header assertions**

```js
assert.match(page, /<SiteHeader activePage="home"/);
assert.match(header, /<AkMark \/>/);
assert.match(header, /AI product engineer/);
assert.match(header, /Start a project/);
assert.match(header, /aria-label=\{menuOpen \? "Close menu" : "Open menu"\}/);
```

Include `header` in the source-test `Promise.all`:

```js
readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8")
```

- [ ] **Step 2: Run the source test and confirm failure**

```powershell
npm test
```

Expected: failure on `<AkMark />` and the new navigation labels.

- [ ] **Step 3: Create the CSS-driven mark**

Create `app/components/AkMark.tsx`:

```tsx
export function AkMark() {
  return (
    <span className="ak-mark-shell" aria-hidden="true">
      <span className="ak-mark-shape" />
    </span>
  );
}
```

- [ ] **Step 4: Replace the header markup and labels**

Use this navigation definition and brand lockup in `SiteHeader.tsx`:

```tsx
import { AkMark } from "./AkMark";

const navigation = [
  { label: "Work", target: "work" },
  { label: "Practice", target: "practice" },
  { label: "Process", target: "process" },
  { label: "Contact", target: "contact" },
] as const;
```

```tsx
<a className="brand-lockup" href="/" aria-label="Ahsan Khizar, home" onClick={closeMenu}>
  <AkMark />
  <span>
    <strong>Ahsan Khizar</strong>
    <small>AI product engineer · AI video producer</small>
  </span>
</a>
```

Keep the About link in the mobile menu and change the CTA/button labels:

```tsx
<a className="header-cta" href={anchorHref(activePage, "contact")} onClick={closeMenu}>
  Start a project <span aria-hidden="true">↗</span>
</a>
<button
  className="menu-button"
  type="button"
  aria-label={menuOpen ? "Close menu" : "Open menu"}
  aria-expanded={menuExpanded}
  aria-controls="mobile-menu"
  onClick={() => setMenuOpen((isOpen) => !isOpen)}
>
  <span aria-hidden="true" />
  <span aria-hidden="true" />
</button>
```

- [ ] **Step 5: Replace the header styles**

Use a 14px rounded shell, a purposeful dark-glass home state, and a solid light scrolled/About state:

```css
.site-header {
  position: fixed;
  z-index: var(--z-nav);
  inset: max(1rem, env(safe-area-inset-top)) var(--page-gutter) auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 3.875rem;
  padding: 0.45rem 0.55rem;
  border: 1px solid oklch(0.98 0 0 / 0.22);
  border-radius: 0.875rem;
  background: oklch(0.06 0 0 / 0.58);
  color: var(--white);
  backdrop-filter: blur(18px);
  transition: background 180ms var(--ease-out), color 180ms var(--ease-out), border-color 180ms var(--ease-out);
}

.site-header.is-scrolled,
body:has([data-motion-page="about"]) .site-header {
  border-color: var(--stage);
  background: var(--white);
  color: var(--stage);
  backdrop-filter: none;
}

.brand-lockup { display: inline-flex; align-items: center; gap: 0.75rem; min-height: 2.75rem; text-decoration: none; }
.brand-lockup > span:last-child { display: grid; line-height: 1.05; }
.brand-lockup strong { font-family: var(--font-display); font-size: 0.95rem; font-weight: 850; }
.brand-lockup small { margin-top: 0.2rem; font-size: 0.625rem; font-weight: 650; opacity: 0.68; }
.ak-mark-shell { position: relative; display: grid; place-items: center; width: 2.75rem; height: 2.75rem; border-radius: 0.75rem; background: var(--white); color: var(--stage); }
.ak-mark-shape { position: relative; width: 1.65rem; height: 1.35rem; }
.ak-mark-shape::before,.ak-mark-shape::after { content: ""; position: absolute; bottom: 0; background: currentColor; }
.ak-mark-shape::before { left: 0; width: 1.15rem; height: 1.35rem; clip-path: polygon(0 100%,34% 18%,53% 0,100% 0,59% 100%); }
.ak-mark-shape::after { right: 0; width: 0.82rem; height: 1.05rem; clip-path: polygon(45% 0,70% 7%,100% 100%,0 100%,22% 32%); }
```

- [ ] **Step 6: Run tests and commit**

```powershell
npm test
git add app/components/AkMark.tsx app/components/SiteHeader.tsx app/globals.css tests/rendered-html.test.mjs
git commit -m "feat: add cinematic portfolio navigation"
```

Expected: all existing tests pass.

---

### Task 3: Implement the cinematic hero

**Files:**
- Create: `app/components/HeroMedia.tsx`
- Create: `app/components/HomepageHero.tsx`
- Modify: `app/page.tsx:43-113`
- Modify: `app/globals.css:1803-1890`
- Test: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `profile.email`, `profile.location`, local responsive poster assets.
- Produces: `<HomepageHero email location />`, `.cinematic-hero`, `[data-hero-media]`, `[data-home-hero-copy]`, and `.hero-capability-rail`.

- [ ] **Step 1: Add the hero source assertions**

```js
const [hero, media] = await Promise.all([
  readFile(new URL("../app/components/HomepageHero.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/components/HeroMedia.tsx", import.meta.url), "utf8"),
]);
assert.match(hero, /I transform complex AI ideas into/);
assert.match(hero, /powerful products people understand and trust/);
assert.match(hero, /Discuss your project/);
assert.match(media, /hero-system-story-960\.webp/);
assert.match(media, /hero-system-story-1728\.webp/);
assert.match(media, /alt=""/);
```

- [ ] **Step 2: Run the test and confirm the new component imports fail**

```powershell
npm test
```

Expected: failure because `HomepageHero.tsx` and `HeroMedia.tsx` do not exist.

- [ ] **Step 3: Create `HeroMedia`**

```tsx
export function HeroMedia() {
  return (
    <div className="hero-media" data-hero-media aria-hidden="true">
      <picture>
        <source media="(max-width: 760px)" srcSet="/hero-system-story-960.webp" />
        <img
          src="/hero-system-story-1728.webp"
          width={1728}
          height={973}
          alt=""
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <span className="hero-media-beam" />
      <span className="hero-media-vignette" />
    </div>
  );
}
```

- [ ] **Step 4: Create `HomepageHero` with exact copy**

```tsx
import { HeroMedia } from "./HeroMedia";

type HomepageHeroProps = { email: string; location: string };

const capabilities = [
  ["Applied AI", "Models · evaluation · orchestration"],
  ["Product systems", "APIs · backend · automation"],
  ["Communication", "Demos · explainers · launch content"],
] as const;

export function HomepageHero({ email, location }: HomepageHeroProps) {
  return (
    <section className="cinematic-hero" aria-labelledby="hero-title">
      <HeroMedia />
      <div className="cinematic-hero-copy" data-home-hero-copy>
        <p className="hero-kicker">One connected build</p>
        <h1 id="hero-title">
          I transform complex AI ideas into{" "}
          <span>powerful products people understand and trust.</span>
        </h1>
        <p className="cinematic-hero-support">
          From the system behind the product to the demos and launch content that explain it, I lead
          the work as one connected build.
        </p>
        <div className="cinematic-hero-actions">
          <a className="hero-button hero-button-primary" href={`mailto:${email}?subject=AI%20product%20project`}>
            Discuss your project <span aria-hidden="true">↗</span>
          </a>
          <a className="hero-button hero-button-secondary" href="#work">
            View selected work <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <aside className="hero-engineering-note">
        <strong>Engineering first.</strong>
        <span>Product communication continues the same thinking—so what gets built is clear and ready to launch.</span>
      </aside>
      <div className="hero-capability-rail" aria-label="Practice summary">
        {capabilities.map(([name, detail]) => <div key={name}><strong>{name}</strong><span>{detail}</span></div>)}
        <div><strong>{location}</strong><span>Available for remote projects</span></div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Replace the old portrait hero in `app/page.tsx`**

Import the component and replace lines 52–113 with:

```tsx
<HomepageHero email={profile.email} location={profile.location} />
```

Delete the old `operator-frame`, `operator-portrait`, and output-rail markup.

- [ ] **Step 6: Add the hero CSS**

```css
.cinematic-hero { position: relative; min-height: 54rem; height: 100dvh; max-height: 64rem; overflow: hidden; background: var(--stage); color: var(--white); }
.hero-media { position: absolute; inset: 0; overflow: hidden; }
.hero-media picture,.hero-media img { width: 100%; height: 100%; }
.hero-media img { object-fit: cover; object-position: center; animation: hero-media-drift 14s var(--ease-out) both; }
.hero-media-vignette { position: absolute; inset: 0; background: linear-gradient(90deg,oklch(0.06 0 0 / .96),oklch(0.06 0 0 / .62) 44%,transparent 78%),linear-gradient(0deg,oklch(0.06 0 0 / .92),transparent 48%); }
.hero-media-beam { position: absolute; left: 38%; top: 48%; width: 42%; height: 2px; background: var(--citrus); box-shadow: 0 0 18px var(--citrus),0 0 42px oklch(0.88 .18 105 / .55); transform-origin: left; animation: hero-beam 5s ease-in-out infinite alternate; }
.cinematic-hero-copy { position: absolute; z-index: 2; left: var(--page-gutter); bottom: 8.75rem; width: min(65rem,calc(100% - 2 * var(--page-gutter))); }
.hero-kicker { display: flex; align-items: center; gap: .75rem; margin: 0 0 1.15rem; font-size: .75rem; font-weight: 800; text-transform: uppercase; }
.hero-kicker::before { content: ""; width: 2.5rem; height: 3px; background: var(--carmine); }
.cinematic-hero h1 { max-width: 62rem; margin: 0; font-family: var(--font-display); font-size: clamp(3.625rem,6.2vw,5.25rem); font-weight: 760; line-height: .94; letter-spacing: -.035em; text-wrap: balance; }
.cinematic-hero h1 span { display: block; color: var(--citrus); }
.cinematic-hero-support { max-width: 44rem; margin: 1.5rem 0 1.75rem; color: oklch(0.98 0 0 / .78); font-size: clamp(1rem,1.3vw,1.125rem); line-height: 1.55; }
.cinematic-hero-actions { display: flex; flex-wrap: wrap; gap: .75rem; }
.hero-button { display: inline-flex; align-items: center; justify-content: center; gap: 1rem; min-height: 3rem; padding: .8rem 1.25rem; border: 1px solid oklch(0.98 0 0 / .5); border-radius: .625rem; font-size: .82rem; font-weight: 800; }
.hero-button-primary { border-color: var(--white); background: var(--white); color: var(--stage); }
.hero-button-secondary { background: oklch(0.06 0 0 / .28); backdrop-filter: blur(10px); }
.hero-engineering-note { position: absolute; z-index: 2; right: var(--page-gutter); bottom: 9.2rem; width: 17rem; padding-top: .85rem; border-top: 1px solid oklch(0.98 0 0 / .44); color: oklch(0.98 0 0 / .68); font-size: .75rem; line-height: 1.55; }
.hero-engineering-note strong { display: block; margin-bottom: .25rem; color: var(--white); font-size: .875rem; }
.hero-capability-rail { position: absolute; z-index: 2; inset: auto 0 0; display: grid; grid-template-columns: repeat(4,1fr); border-top: 1px solid oklch(0.98 0 0 / .2); background: oklch(0.06 0 0 / .42); backdrop-filter: blur(16px); }
.hero-capability-rail div { min-width: 0; padding: 1.2rem var(--page-gutter); border-right: 1px solid oklch(0.98 0 0 / .16); }
.hero-capability-rail div:last-child { border-right: 0; }
.hero-capability-rail strong,.hero-capability-rail span { display: block; }
.hero-capability-rail strong { font-size: .8rem; }
.hero-capability-rail span { margin-top: .15rem; color: oklch(0.98 0 0 / .62); font-size: .67rem; }
@keyframes hero-media-drift { from { transform: scale(1.05); } to { transform: scale(1); } }
@keyframes hero-beam { from { opacity: .45; transform: scaleX(.84); } to { opacity: .9; transform: scaleX(1); } }
```

- [ ] **Step 7: Run tests and commit**

```powershell
npm test
git add app/components/HeroMedia.tsx app/components/HomepageHero.tsx app/page.tsx app/globals.css tests/rendered-html.test.mjs
git commit -m "feat: add cinematic connected-build hero"
```

---

### Task 4: Build the accessible project stage

**Files:**
- Create: `app/components/ProjectStage.tsx`
- Modify: `app/page.tsx:187-224`
- Modify: `app/globals.css`
- Test: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `projects: readonly Project[]` from `app/data/profile.ts`.
- Produces: `<ProjectStage projects />`, desktop tab semantics, `data-project-panel`, and stacked mobile evidence.

- [ ] **Step 1: Add failing project-stage assertions**

```js
const projectStage = await readFile(new URL("../app/components/ProjectStage.tsx", import.meta.url), "utf8");
assert.match(projectStage, /role="tablist"/);
assert.match(projectStage, /role="tab"/);
assert.match(projectStage, /aria-selected/);
assert.match(projectStage, /onKeyDown/);
assert.match(projectStage, /project-stage-mobile/);
assert.match(projectStage, /data-project-panel/);
```

- [ ] **Step 2: Run the test and confirm failure**

```powershell
npm test
```

Expected: failure because `ProjectStage.tsx` does not exist.

- [ ] **Step 3: Implement `ProjectStage`**

Create a client component with this public contract and behavior:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { Project } from "../data/profile";

export function ProjectStage({ projects }: { projects: readonly Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRef = useRef<HTMLElement>(null);

  function selectFromKeyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? projects.length - 1 :
      event.key === 'ArrowRight' ? (index + 1) % projects.length : (index - 1 + projects.length) % projects.length;
    setActiveIndex(next);
    document.getElementById(`project-tab-${next}`)?.focus();
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !panelRef.current) return;
    let active = true;
    let context: { revert: () => void } | undefined;
    void import('gsap').then(({ default: gsap }) => {
      if (!active) return;
      context = gsap.context(() => {
        gsap.fromTo(panelRef.current,{ opacity:.2,clipPath:'inset(0 7% 0 0)' },{ opacity:1,clipPath:'inset(0 0 0 0)',duration:.42,ease:'power3.out',clearProps:'opacity,clipPath' });
      },panelRef);
    });
    return () => { active = false; context?.revert(); };
  }, [activeIndex]);

  const active = projects[activeIndex];
  return (
    <section id="work" className="project-stage" aria-labelledby="work-title">
      <header className="project-stage-heading">
        <h2 id="work-title">Work that makes the claim believable.</h2>
        <p>Real systems, concrete contributions, and implementation depth.</p>
      </header>
      <div className="project-tabs" role="tablist" aria-label="Selected engineering projects">
        {projects.map((project,index) => (
          <button id={`project-tab-${index}`} key={project.name} type="button" role="tab"
            aria-selected={index === activeIndex} aria-controls="active-project-panel"
            tabIndex={index === activeIndex ? 0 : -1} onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => selectFromKeyboard(event,index)}>{project.name}</button>
        ))}
      </div>
      <article id="active-project-panel" className="active-project" role="tabpanel"
        aria-labelledby={`project-tab-${activeIndex}`} ref={panelRef} data-project-panel>
        <div className="active-project-copy"><span>Selected system · {String(activeIndex + 1).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}</span><h3>{active.name}</h3><p>{active.description}</p><strong>My contribution</strong><p>{active.contribution}</p></div>
        <ol className="active-project-flow" aria-label={`${active.name} implementation stack`}>
          {active.stack.map((item,index) => <li key={item}><span>{String(index + 1).padStart(2,'0')}</span><strong>{item}</strong></li>)}
        </ol>
        {active.href ? <a href={active.href} target="_blank" rel="noreferrer">View project source <span aria-hidden="true">↗</span></a> : <span>Project summary available</span>}
      </article>
      <div className="project-stage-mobile">
        {projects.map((project,index) => <article key={project.name}><span>{String(index + 1).padStart(2,'0')} · {project.category}</span><h3>{project.name}</h3><p>{project.description}</p><strong>My contribution</strong><p>{project.contribution}</p><small>{project.stack.join(' · ')}</small></article>)}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Replace the old evidence list and order the projects**

In `app/page.tsx`, create the approved order:

```tsx
const featuredProjectNames = [
  "DocuSync",
  "PIGEON Reproduction",
  "Audio Deepfake Detection System",
  "Customer Behavior Profiling",
] as const;
const featuredProjects = featuredProjectNames.map((name) => engineeringProjects.find((project) => project.name === name)).filter((project): project is (typeof engineeringProjects)[number] => Boolean(project));
```

Replace the current evidence section with:

```tsx
<ProjectStage projects={featuredProjects} />
```

- [ ] **Step 5: Add project-stage CSS**

```css
.project-stage { padding: var(--section-space) var(--page-gutter); background: var(--stage); color: var(--white); }
.project-stage-heading { display: flex; justify-content: space-between; align-items: end; gap: 3rem; margin-bottom: 3rem; }
.project-stage-heading h2 { max-width: 52rem; margin: 0; font-family: var(--font-display); font-size: clamp(3.5rem,7vw,5.75rem); line-height: .92; letter-spacing: -.035em; }
.project-stage-heading p { max-width: 24rem; color: oklch(0.98 0 0 / .62); }
.project-tabs { display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: .875rem; }
.project-tabs button { min-height: 2.75rem; padding: .65rem .85rem; border: 1px solid oklch(0.98 0 0 / .22); border-radius: 999px; background: transparent; color: oklch(0.98 0 0 / .68); cursor: pointer; }
.project-tabs button[aria-selected="true"] { border-color: var(--citrus); background: var(--citrus); color: var(--stage); font-weight: 800; }
.active-project { position: relative; min-height: 36rem; display: grid; grid-template-columns: .8fr 1.2fr; gap: 3rem; padding: clamp(2rem,4vw,4rem); border: 1px solid oklch(0.98 0 0 / .28); border-radius: .875rem; overflow: hidden; background: linear-gradient(145deg,oklch(.16 .08 25),var(--stage) 58%); }
.active-project-copy h3 { margin: auto 0 1rem; font-family: var(--font-display); font-size: clamp(3rem,5vw,4rem); line-height: .94; }
.active-project-flow { align-self: center; display: grid; grid-template-columns: repeat(auto-fit,minmax(8rem,1fr)); gap: 1rem; list-style: none; padding: 0; }
.active-project-flow li { min-height: 8rem; display: flex; flex-direction: column; justify-content: space-between; padding: 1rem; border: 1px solid oklch(0.98 0 0 / .26); }
.project-stage-mobile { display: none; }
```

- [ ] **Step 6: Run tests and commit**

```powershell
npm test
git add app/components/ProjectStage.tsx app/page.tsx app/globals.css tests/rendered-html.test.mjs
git commit -m "feat: add accessible engineering project stage"
```

---

### Task 5: Compose the continuous homepage narrative

**Files:**
- Create: `app/components/ConnectedBuild.tsx`
- Modify: `app/page.tsx:115-330`
- Modify: `app/globals.css`
- Test: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `technicalCapabilities`, `videoServices`, `process`, `recognition`, `profile`.
- Produces: `#practice`, `#process`, `#contact`, `.positioning-scene`, `.connected-build`, `.video-layer`, `.recognition-band`, and `.red-noir-contact`.

- [ ] **Step 1: Add failing narrative assertions**

```js
assert.match(html, /id="practice"/i);
assert.match(html, /id="process"/i);
assert.match(html, /id="contact"/i);
assert.match(html, /Engineer the intelligence/i);
assert.match(html, /Make it usable/i);
assert.match(html, /Make the value clear/i);
assert.match(html, /Product demonstrations/i);
assert.match(html, /Avatar-led explainers/i);
assert.match(html, /UGC &amp; performance ads/i);
assert.doesNotMatch(html, /Ways to work together|Have a video brief instead/i);
```

- [ ] **Step 2: Run the test and confirm failure**

```powershell
npm test
```

Expected: failure on the new connected-build copy and removal assertions.

- [ ] **Step 3: Create `ConnectedBuild`**

```tsx
type ConnectedBuildProps = {
  videoServices: readonly { name: string; description: string }[];
};

const phases = [
  { label: "System", title: "Engineer the intelligence.", copy: "Models, agents, APIs, data flows, evaluation, and dependable automation.", footer: "AI engineering" },
  { label: "Product", title: "Make it usable.", copy: "Interfaces and backend behavior shaped around real users and real workflows.", footer: "Product delivery" },
  { label: "Story", title: "Make the value clear.", copy: "Demos, explainers, launch content, and AI video that communicate what the product changes.", footer: "Communication layer" },
] as const;

export function ConnectedBuild({ videoServices }: ConnectedBuildProps) {
  return (
    <>
      <section id="practice" className="connected-build" aria-labelledby="practice-title">
        <h2 id="practice-title">The build does not stop at the model. <span>It continues until the value is understood.</span></h2>
        <ol className="connected-build-phases" data-pipeline>
          {phases.map((phase) => <li key={phase.label}><span>{phase.label}</span><h3>{phase.title}</h3><p>{phase.copy}</p><small>{phase.footer}</small></li>)}
        </ol>
      </section>
      <section className="video-layer" aria-labelledby="video-layer-title">
        <div><h2 id="video-layer-title">When the product needs a story, I make that too.</h2><p>AI video is the communication layer of the same build—made to help customers, teams, and audiences understand the product faster.</p></div>
        <ol>{videoServices.map((service,index) => <li key={service.name}><strong>{service.name}</strong><span>{String(index + 1).padStart(2,'0')}</span></li>)}</ol>
      </section>
    </>
  );
}
```

- [ ] **Step 4: Replace the old services, video, experience, and homepage portrait sections**

After `<HomepageHero />`, compose:

```tsx
<section className="positioning-scene" aria-labelledby="positioning-title">
  <div><h2 id="positioning-title">Bring the problem. <span>Leave with something real.</span></h2></div>
  <div><p>I work across the system, product surface, and the story around it—without splitting responsibility between technical and creative teams.</p><strong>One person.<br />One standard.</strong></div>
</section>
<section className="credibility-rail" aria-label="Evidence before promises">
  <strong>Evidence before promises</strong><ul>{proofSignals.map((signal) => <li key={signal}>{signal}</li>)}</ul>
</section>
<ProjectStage projects={featuredProjects} />
<ConnectedBuild videoServices={videoServices} />
<section id="process" className="unified-process" aria-labelledby="process-title">
  <header><h2 id="process-title">A direct path from problem to proof.</h2><p>One shared method keeps engineering, product, and communication decisions aligned.</p></header>
  <ol>{process.map((step,index) => <li key={step.name}><span>{index + 1}</span><h3>{step.name}</h3><p>{step.description}</p></li>)}</ol>
</section>
<section className="recognition-band" aria-label="Selected recognition">
  <strong>Selected signals</strong>{recognition.map((item) => <p key={item}>{item}</p>)}<a href="/about">Read the full background <span aria-hidden="true">→</span></a>
</section>
<section id="contact" className="red-noir-contact" aria-labelledby="contact-title">
  <h2 id="contact-title">What should your AI product <span>make possible?</span></h2>
  <div><p>Send the problem, audience, constraints, and desired outcome. I will reply with the clearest place to start.</p><a href={`mailto:${profile.email}?subject=AI%20product%20project`}>Start a project <span aria-hidden="true">↗</span></a><CopyEmail email={profile.email} /></div>
</section>
```

Delete the homepage `about-conversion` portrait section and the old engagement/timeline sections. Keep `<SiteFooter />`, structured data, and `<MotionController page="home" />`.

- [ ] **Step 5: Add cohesive scene CSS**

Implement the prototype's shared frame and full-bleed scene rhythm:

```css
.positioning-scene,.connected-build,.video-layer,.unified-process,.recognition-band,.red-noir-contact { padding-inline: var(--page-gutter); }
.positioning-scene { display: grid; grid-template-columns: 1.25fr .75fr; gap: 10vw; align-items: end; padding-block: clamp(7rem,11vw,9.5rem); background: var(--white); }
.positioning-scene h2,.connected-build h2,.video-layer h2,.unified-process h2,.red-noir-contact h2 { margin: 0; font-family: var(--font-display); font-size: clamp(3.5rem,7vw,5.75rem); line-height: .92; letter-spacing: -.035em; text-wrap: balance; }
.positioning-scene h2 span { color: var(--carmine); }
.positioning-scene > div:last-child { padding-top: 1.5rem; border-top: 2px solid var(--stage); }
.credibility-rail { display: flex; gap: 2rem; align-items: center; padding-block: 1.25rem; border-block: 1px solid var(--rule); overflow: hidden; }
.credibility-rail ul { display: flex; gap: 2.75rem; margin: 0; padding: 0; list-style: none; white-space: nowrap; }
.connected-build { padding-block: var(--section-space); background: var(--citrus); }
.connected-build h2 { max-width: 64rem; margin-bottom: 4.5rem; }
.connected-build h2 span { display: block; font-weight: 420; }
.connected-build-phases { display: grid; grid-template-columns: repeat(3,1fr); margin: 0; padding: 0; border: 2px solid var(--stage); list-style: none; }
.connected-build-phases li { min-height: 22rem; display: flex; flex-direction: column; padding: 2rem; border-right: 2px solid var(--stage); }
.connected-build-phases li:last-child { border-right: 0; background: var(--stage); color: var(--white); }
.connected-build-phases h3 { margin: auto 0 1rem; font-family: var(--font-display); font-size: clamp(2rem,3vw,2.5rem); line-height: 1; }
.video-layer { position: relative; display: grid; grid-template-columns: 1.2fr .8fr; gap: 8vw; padding-block: var(--section-space); overflow: hidden; background: var(--carmine); color: var(--stage); }
.video-layer ol { align-self: end; margin: 0; padding: 0; border-top: 2px solid var(--stage); list-style: none; }
.video-layer li { display: flex; justify-content: space-between; padding: .95rem 0; border-bottom: 1px solid oklch(0.06 0 0 / .35); }
.unified-process { padding-block: var(--section-space); background: var(--silver); }
.unified-process header { display: flex; justify-content: space-between; align-items: end; gap: 3rem; }
.unified-process ol { display: grid; grid-template-columns: repeat(4,1fr); margin: 3.5rem 0 0; padding: 0; border-top: 2px solid var(--stage); list-style: none; }
.unified-process li { min-height: 17rem; padding: 1.75rem; border-right: 1px solid var(--rule); }
.recognition-band { display: grid; grid-template-columns: .5fr 1fr 1fr .65fr; gap: 2rem; align-items: center; padding-block: 2rem; background: var(--white); border-block: 1px solid var(--rule); }
.red-noir-contact { padding-block: clamp(7rem,12vw,10rem) 4rem; background: linear-gradient(135deg,oklch(.18 .08 25),var(--stage) 64%); color: var(--white); }
.red-noir-contact h2 span { display: block; color: #ffd870; }
.red-noir-contact > div { display: flex; justify-content: space-between; align-items: end; gap: 3rem; margin-top: 4rem; }
```

- [ ] **Step 6: Run tests and commit**

```powershell
npm test
git add app/components/ConnectedBuild.tsx app/page.tsx app/globals.css tests/rendered-html.test.mjs
git commit -m "feat: compose unified homepage narrative"
```

---

### Task 6: Move portrait expression to the About page

**Files:**
- Create: `app/components/AboutPortrait.tsx`
- Modify: `app/about/page.tsx:97-133`
- Modify: `app/globals.css:2860-2950`
- Test: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `name`, `location`, and `/ahsan-khizar.webp`.
- Produces: `<AboutPortrait name location />` and `[data-about-portrait]` for motion enhancement.

- [ ] **Step 1: Add failing About portrait assertions**

```js
const aboutPortrait = await readFile(new URL("../app/components/AboutPortrait.tsx", import.meta.url), "utf8");
assert.match(aboutPortrait, /ahsan-khizar\.webp/);
assert.match(aboutPortrait, /data-about-portrait/);
assert.match(aboutPortrait, /alt="Portrait of Ahsan Khizar"/);
assert.match(about, /<AboutPortrait/);
assert.match(css, /\.about-portrait-color-field/);
```

- [ ] **Step 2: Run the test and confirm failure**

```powershell
npm test
```

Expected: failure because `AboutPortrait.tsx` and its color-field styles do not exist.

- [ ] **Step 3: Create `AboutPortrait`**

```tsx
export function AboutPortrait({ name, location }: { name: string; location: string }) {
  return (
    <figure className="about-portrait-art" data-about-portrait>
      <span className="about-portrait-color-field about-portrait-red" aria-hidden="true" />
      <span className="about-portrait-color-field about-portrait-citrus" aria-hidden="true" />
      <span className="about-portrait-color-field about-portrait-cyan" aria-hidden="true" />
      <img src="/ahsan-khizar.webp" width={960} height={1131} sizes="(max-width: 760px) 100vw, 42vw" fetchPriority="high" decoding="async" alt="Portrait of Ahsan Khizar" />
      <figcaption><strong>{name}</strong><span>{location}</span><span>Applied AI systems</span></figcaption>
    </figure>
  );
}
```

- [ ] **Step 4: Use the component in `/about`**

Replace the existing figure at lines 98–115 with:

```tsx
<AboutPortrait name={profile.name} location={profile.location} />
```

Keep the existing About heading, biography, facts, experience, capabilities, recognition, process, structured data, and contact content unchanged.

- [ ] **Step 5: Add portrait-art CSS**

```css
.about-portrait-art { position: relative; min-height: 46rem; margin: 0; overflow: hidden; isolation: isolate; background: var(--stage); }
.about-portrait-art img { position: absolute; z-index: 3; inset: auto 4% 0; width: 92%; height: 96%; object-fit: cover; object-position: center top; filter: saturate(.88) contrast(1.04); }
.about-portrait-color-field { position: absolute; z-index: 1; display: block; }
.about-portrait-red { inset: 0 36% 38% 0; background: var(--carmine); }
.about-portrait-citrus { inset: 26% 0 0 48%; background: var(--citrus); }
.about-portrait-cyan { left: 8%; bottom: 7%; width: 36%; height: 22%; background: var(--cyan); mix-blend-mode: screen; opacity: .72; }
.about-portrait-art::after { content: ""; position: absolute; z-index: 4; inset: 0; background: linear-gradient(0deg,oklch(0.06 0 0 / .72),transparent 42%); pointer-events: none; }
.about-portrait-art figcaption { position: absolute; z-index: 5; inset: auto 1.5rem 1.5rem; display: grid; color: var(--white); }
```

- [ ] **Step 6: Run tests and commit**

```powershell
npm test
git add app/components/AboutPortrait.tsx app/about/page.tsx app/globals.css tests/rendered-html.test.mjs
git commit -m "feat: move portrait art direction to about page"
```

---

### Task 7: Replace generic motion with purposeful choreography

**Files:**
- Modify: `app/components/MotionController.tsx:1-107`
- Modify: `app/globals.css`
- Test: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `[data-pipeline]`, `[data-about-portrait]`, `[data-home-hero-copy]`, and `page`.
- Produces: deferred GSAP pipeline/About enhancements and a static reduced-motion path.

- [ ] **Step 1: Add motion-contract assertions**

```js
const motion = await readFile(new URL("../app/components/MotionController.tsx", import.meta.url), "utf8");
assert.match(motion, /data-pipeline/);
assert.match(motion, /data-about-portrait/);
assert.match(motion, /import\("gsap"\)/);
assert.doesNotMatch(motion, /querySelectorAll<HTMLElement>\("\[data-motion-reveal\]"\)/);
assert.match(css, /html\[data-motion="reduced"\][\s\S]*animation:\s*none/);
```

- [ ] **Step 2: Run the test and confirm the generic reveal assertion fails**

```powershell
npm test
```

Expected: failure because the current controller still animates every `[data-motion-reveal]` element.

- [ ] **Step 3: Replace `MotionController` choreography**

Keep the existing reduced-motion gate and deferred IntersectionObserver import. Inside the GSAP context, use only:

```tsx
const pipeline = document.querySelector<HTMLElement>("[data-pipeline]");
if (pipeline && page === "home") {
  gsap.from(pipeline.children, {
    clipPath: "inset(0 100% 0 0)",
    duration: 0.62,
    stagger: 0.08,
    ease: "power3.out",
    clearProps: "clipPath",
    scrollTrigger: { trigger: pipeline, start: "top 78%", once: true },
  });
}

const aboutPortrait = document.querySelector<HTMLElement>("[data-about-portrait]");
if (aboutPortrait && page === "about") {
  gsap.from(aboutPortrait, {
    clipPath: "inset(0 0 100% 0)",
    duration: 0.72,
    ease: "expo.out",
    clearProps: "clipPath",
    scrollTrigger: { trigger: aboutPortrait, start: "top 84%", once: true },
  });
}
```

Use `#work` as the home motion gate and `[data-about-portrait]` as the About gate. Remove blanket reveal-group, portrait-on-home, and per-project scroll animations.

- [ ] **Step 4: Add CSS first-load and reduced-motion behavior**

```css
html[data-motion="full"] [data-home-hero-copy] { animation: hero-copy-in .85s var(--ease-out) both; }
@keyframes hero-copy-in { from { opacity: 0; transform: translateY(1.5rem); filter: blur(10px); } to { opacity: 1; transform: none; filter: none; } }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *,*::before,*::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
  .hero-media img,.hero-media-beam,html[data-motion="reduced"] [data-home-hero-copy] { animation: none !important; transform: none !important; filter: none !important; opacity: 1 !important; }
}
```

- [ ] **Step 5: Run tests and commit**

```powershell
npm test
git add app/components/MotionController.tsx app/globals.css tests/rendered-html.test.mjs
git commit -m "feat: focus motion on hero pipeline and portrait"
```

---

### Task 8: Finish responsive, metadata, and browser contracts

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx:11-46`
- Modify: `tests/browser-audit.mjs:70-268`
- Modify: `tests/rendered-html.test.mjs`
- Modify: `PRODUCT.md`
- Modify: `DESIGN.md`

**Interfaces:**
- Consumes: all components and selectors from Tasks 2–7.
- Produces: target-width layout, metadata, keyboard/browser audit assertions, and current product/design documentation.

- [ ] **Step 1: Add browser checks for hero and project keyboard behavior**

Inside the homepage audit path, add:

```js
const hero = page.locator('.cinematic-hero');
await assert.doesNotReject(() => hero.waitFor({ state: 'visible' }));
const heroBox = await hero.boundingBox();
assert.ok(heroBox && heroBox.height >= Math.min(viewport.height * .9, 820), `${name} hero is not viewport-led`);

if (viewport.width >= 768) {
  const tabs = page.getByRole('tab');
  assert.equal(await tabs.count(), 4, `${name} project stage must expose four tabs`);
  await tabs.nth(0).focus();
  await page.keyboard.press('ArrowRight');
  assert.equal(await tabs.nth(1).getAttribute('aria-selected'), 'true');
}
```

Add a homepage portrait absence check:

```js
assert.equal(await page.locator('main[data-motion-page="home"] img[src*="ahsan-khizar"]').count(), 0);
```

Repair the mobile-menu audit so its locator remains valid after the accessible name changes:

```js
const menu = page.locator(".menu-button");
assert.equal(await menu.getAttribute("aria-label"), "Open menu");
await menu.click();
assert.equal(await menu.getAttribute("aria-label"), "Close menu");
assert.equal(await menu.getAttribute("aria-expanded"), "true");
await page.keyboard.press("Escape");
assert.equal(await menu.getAttribute("aria-label"), "Open menu");
assert.equal(await menu.getAttribute("aria-expanded"), "false");
```

Strengthen the About portrait source contract:

```js
assert.match(aboutPortrait, /<figure/);
assert.match(aboutPortrait, /<figcaption/);
assert.equal((aboutPortrait.match(/aria-hidden="true"/g) ?? []).length, 3);
```

- [ ] **Step 2: Add complete responsive CSS**

```css
@media (max-width: 1023px) {
  .hero-engineering-note { display: none; }
  .hero-capability-rail { grid-template-columns: 1fr 1fr; }
  .positioning-scene,.video-layer { grid-template-columns: 1fr; }
  .active-project { grid-template-columns: 1fr; }
  .connected-build-phases,.unified-process ol { grid-template-columns: 1fr 1fr; }
  .recognition-band { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 767px) {
  :root { --page-gutter: 1.25rem; }
  .site-header { inset-inline: .75rem; }
  .brand-lockup small,.desktop-nav { display: none; }
  .cinematic-hero { min-height: 53rem; height: 100dvh; max-height: none; }
  .cinematic-hero-copy { left: var(--page-gutter); bottom: 10.25rem; width: calc(100% - 2 * var(--page-gutter)); }
  .cinematic-hero h1 { font-size: clamp(2.8rem,12vw,4rem); overflow-wrap: anywhere; }
  .cinematic-hero-actions { align-items: stretch; }
  .hero-button { flex: 1 1 100%; }
  .hero-capability-rail div { padding: .75rem var(--page-gutter); }
  .hero-capability-rail span { display: none; }
  .project-tabs,.active-project { display: none; }
  .project-stage-mobile { display: grid; gap: 0; }
  .project-stage-mobile article { padding: 2rem 0; border-top: 1px solid oklch(0.98 0 0 / .25); }
  .positioning-scene,.video-layer,.unified-process header,.red-noir-contact > div { display: block; }
  .connected-build-phases,.unified-process ol,.recognition-band { grid-template-columns: 1fr; }
  .connected-build-phases li,.unified-process li { border-right: 0; border-bottom: 1px solid var(--stage); }
  .recognition-band { gap: 1rem; }
  .about-portrait-art { min-height: 34rem; }
}
```

Remove every obsolete legacy `.about-portrait`, `.about-portrait::before`, `.about-portrait img`, and `.about-portrait-caption` rule. The live component uses `.about-portrait-art` and `.about-portrait-color-field`; do not leave competing dead styles behind.

- [ ] **Step 3: Update metadata copy**

Keep the title and canonical route. Use:

```tsx
description: "Ahsan Khizar transforms complex AI ideas into powerful products people understand and trust—from the system to the story that explains it.",
```

Use the same positioning in Open Graph and Twitter descriptions without changing `/og.png` in this iteration.

- [ ] **Step 4: Update product and design documentation**

In `PRODUCT.md`, record the seven-scene homepage, engineering-first hierarchy, and no-homepage-portrait rule. In `DESIGN.md`, record the local hero media, 14px maximum section/card radius, purposeful hero glass only, project-stage behavior, About portrait color fields, and the focused motion system.

- [ ] **Step 5: Run targeted tests**

```powershell
npm run lint
npm test
```

Expected: lint passes and all server/source tests pass.

- [ ] **Step 6: Run browser and accessibility checks**

```powershell
npm run test:all
```

Expected: homepage and About pass at 1440, 1024, 768, 390, and 375 widths; no horizontal overflow; no unlabeled controls; all axe checks pass.

- [ ] **Step 7: Run quality and source checks**

```powershell
node 'C:\Users\ahsan\Downloads\Profile\.agents\skills\impeccable\scripts\detect.mjs' --json app/page.tsx app/about/page.tsx app/components/SiteHeader.tsx app/components/HomepageHero.tsx app/components/ProjectStage.tsx app/components/ConnectedBuild.tsx app/globals.css
git diff --check
git status --short
```

Expected: detector returns no unresolved findings; diff check is clean; `.impeccable/` remains untouched and untracked.

- [ ] **Step 8: Commit the validated implementation**

```powershell
git add app public/hero-system-story-960.webp public/hero-system-story-1728.webp tests PRODUCT.md DESIGN.md
git commit -m "feat: deliver unified cinematic portfolio"
```

---

### Task 9: Save a reversible Sites version and publish after approval

**Files:**
- Verify: `.openai/hosting.json`
- Package: validated `dist/` plus Sites metadata.

**Interfaces:**
- Consumes: current pushed branch-head SHA, existing Sites project ID, validated `dist/`.
- Produces: a new saved Sites version and, only after explicit approval, a production deployment.

- [ ] **Step 1: Verify the exact release state**

```powershell
git status --short
git rev-parse HEAD
npm test
```

Expected: the isolated worktree is clean; build/tests pass; retain the printed commit SHA.

- [ ] **Step 2: Push using a short-lived Sites source credential**

Obtain a fresh credential with the existing project ID from `.openai/hosting.json`, then push the exact `HEAD` to its configured `main` branch using a per-command `Authorization: Bearer` header. Do not store the token in Git configuration or print it.

- [ ] **Step 3: Package the validated build**

```powershell
& 'C:\Program Files\Git\bin\bash.exe' 'C:/Users/ahsan/.codex/plugins/cache/openai-bundled/sites/0.1.30/scripts/package-site.sh' '/c/Users/ahsan/Downloads/Profile/Ahsan-AI-Studio/.worktrees/unified-homepage-redesign' '/c/Users/ahsan/AppData/Local/Temp/ahsan-ai-studio-unified-homepage.tar.gz'
```

Expected: the archive path is printed and the helper exits successfully.

- [ ] **Step 4: Save the new Sites version**

Call `save_site_version` with the existing project ID, the exact pushed commit SHA, and the archive. Record the returned user-facing version number and opaque version ID.

- [ ] **Step 5: Request explicit public publishing approval**

State that the current public site will be replaced while versions 1–4 and the newly saved version remain available. Do not call the public deployment tool until the user approves.

- [ ] **Step 6: Deploy and poll to a terminal state**

After approval, call `deploy_site_version`, then poll `get_deployment_status` with the returned deployment ID until `succeeded` or `failed`.

Expected on success: `https://ahsan-khizar-ai-studio.ahsankhizar.chatgpt.site` is returned as the production URL.

---

## Plan self-review

- Spec coverage: hero, local media, unified narrative, project evidence, engineering-first hierarchy, video communication layer, About portrait, motion, accessibility, responsive behavior, metadata, testing, publishing, and rollback are each assigned to a task.
- Scope: homepage and About share one visual system and one release, so they remain one implementation plan rather than independent products.
- Type consistency: `ProjectStage` consumes the existing exported `Project` type; `HomepageHero` consumes string `email` and `location`; `ConnectedBuild` consumes the existing video-service shape.
- Dependency discipline: no npm dependencies are added; existing GSAP is dynamically imported.
- Release safety: the plan creates a new version and preserves Sites versions 1–4.
