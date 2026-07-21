import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

function extractSourceBlock(source, marker) {
  const markerIndex = source.indexOf(marker);
  assert.notEqual(markerIndex, -1, `${marker} is present`);
  const openingBrace = source.indexOf("{", markerIndex);
  assert.notEqual(openingBrace, -1, `${marker} opens a block`);

  let depth = 0;
  for (let index = openingBrace; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] !== "}") continue;
    depth -= 1;
    if (depth === 0) return source.slice(markerIndex, index + 1);
  }

  assert.fail(`${marker} closes its block`);
}

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("ships local responsive hero media", async () => {
  const [small, large] = await Promise.all([
    readFile(new URL("../public/hero-system-story-960.webp", import.meta.url)),
    readFile(new URL("../public/hero-system-story-1728.webp", import.meta.url)),
  ]);
  assert.ok(small.byteLength > 40_000);
  assert.ok(large.byteLength > 100_000);
});

test("server-renders the complete portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Ahsan Khizar — AI Engineer &amp; AI Video Producer<\/title>/i);
  assert.match(html, /<h1[^>]*id="hero-title"/i);
  assert.match(html, /I transform complex AI ideas into/i);
  assert.match(html, /powerful products people understand and trust/i);
  assert.match(html, /one connected build/i);
  assert.match(html, /Evidence before promises/i);
  assert.match(html, /id="practice"/i);
  assert.match(html, /id="process"/i);
  assert.match(html, /id="contact"/i);
  assert.match(html, /Engineer the intelligence/i);
  assert.match(html, /Make it usable/i);
  assert.match(html, /Make the value clear/i);
  assert.match(html, /Product demonstrations/i);
  assert.match(html, /Avatar-led explainers/i);
  assert.match(html, /UGC &amp; performance ads/i);
  assert.doesNotMatch(html, /Ways to work together|Have a video brief instead|Send a video brief/i);
  assert.match(html, /Discuss your project/i);
  assert.match(html, /data-hero-media/i);
  assert.match(html, /data-home-hero-copy/i);
  assert.match(html, /class="hero-capability-rail"/i);
  assert.doesNotMatch(html, /ahsan-khizar\.(?:webp|png)|Portrait of Ahsan Khizar/i);
  assert.match(html, /AI engineering/i);
  assert.match(html, /Communication layer/i);
  assert.match(html, /Audio Deepfake Detection System/i);
  assert.match(html, /DocuSync/i);
  assert.match(html, /PIGEON Reproduction/i);
  assert.match(html, /Customer Behavior Profiling/i);
  assert.match(html, /All Pakistan Prompt Engineering Competition/i);
  assert.match(html, /Global AI Hackathon/i);
  assert.match(html, /ahsankhizar1075@gmail\.com/i);
  assert.match(html, /application\/ld\+json/i);
  assert.match(html, /"@type":"Person"/i);
  assert.match(html, /"@type":"ProfessionalService"/i);
  assert.doesNotMatch(html, /"provider":\{"@type":"Person"/i);
  assert.match(html, /og:image/i);
  assert.match(html, /\/og\.png/i);
  assert.match(html, /Skip to main content/i);
  assert.match(html, /id="work"/i);
  assert.match(html, /id="practice"/i);
  assert.match(html, /id="process"/i);
  assert.match(html, /id="contact"/i);
  assert.match(html, /href="\/about"/i);
  assert.match(html, /data-project-stage/i);
  assert.match(html, /data-motion-page="home"/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("server-renders the factual portrait-led About page", async () => {
  const response = await render("/about");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>About Ahsan Khizar \u2014 AI Engineer &amp; AI Video Producer<\/title>/i);
  assert.match(html, /<link rel="canonical" href="http:\/\/localhost(?::3000)?\/about"/i);
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  assert.match(html, /University of Engineering and Technology, Taxila/i);
  assert.match(html, /Bachelor of Engineering in Software Engineering/i);
  assert.match(html, /Generative AI Application Developer/i);
  assert.match(html, /PEEF Scholar/i);
  assert.match(html, /Qadri Group/i);
  assert.match(html, /DevelopersHub Corporation/i);
  assert.match(html, /Prodigy InfoTech/i);
  const jsonLdSource = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i)?.[1];
  assert.ok(jsonLdSource, "AboutPage JSON-LD is present");
  const jsonLd = JSON.parse(jsonLdSource);
  assert.equal(jsonLd["@context"], "https://schema.org");
  assert.equal(jsonLd["@type"], "AboutPage");
  assert.match(jsonLd.url, /^http:\/\/localhost(?::3000)?\/about$/);
  assert.equal(jsonLd.mainEntity["@type"], "Person");
  assert.equal(jsonLd.mainEntity.name, "Ahsan Khizar");
  assert.equal(jsonLd.primaryImageOfPage["@type"], "ImageObject");
  assert.equal(jsonLd.primaryImageOfPage.width, 960);
  assert.equal(jsonLd.primaryImageOfPage.height, 1131);
  assert.match(jsonLd.primaryImageOfPage.url, /^http:\/\/localhost(?::3000)?\/ahsan-khizar\.webp$/);
  assert.match(
    html,
    /<img[^>]*src="\/ahsan-khizar\.webp"[^>]*width="960"[^>]*height="1131"[^>]*alt="Portrait of Ahsan Khizar"/i,
  );
  assert.match(html, /data-motion-page="about"/i);
  assert.match(html, /MotionController/i);
});

test("publishes absolute crawl endpoints", async () => {
  const [robotsResponse, sitemapResponse] = await Promise.all([render("/robots.txt"), render("/sitemap.xml")]);
  assert.equal(robotsResponse.status, 200);
  assert.equal(sitemapResponse.status, 200);
  assert.match(await robotsResponse.text(), /Sitemap: http:\/\/localhost\/sitemap\.xml/i);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /<loc>http:\/\/localhost\/<\/loc>/i);
  assert.match(sitemap, /<loc>http:\/\/localhost\/about<\/loc>/i);
});

test("source preserves accessible and responsive contracts", async () => {
  const [page, css, layout, header, hero, media, projectStage, connectedBuild, motion] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/HomepageHero.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/HeroMedia.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ProjectStage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ConnectedBuild.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/MotionController.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<SiteHeader activePage="home"/);
  assert.match(header, /<AkMark \/>/);
  assert.match(header, /AI product engineer/);
  assert.match(header, /Start a project/);
  assert.match(header, /aria-label=\{menuOpen \? "Close menu" : "Open menu"\}/);
  assert.match(page, /<main id="main-content"[^>]*data-motion-page="home"[^>]*>/);
  assert.match(projectStage, /aria-labelledby="work-title"/);
  assert.match(connectedBuild, /id="practice"/);
  assert.match(connectedBuild, /aria-labelledby="practice-title"/);
  assert.match(page, /<HomepageHero email=\{profile\.email\} location=\{profile\.location\} \/>/);
  assert.doesNotMatch(page, /ahsan-khizar\.(?:webp|png)|operator-(?:frame|portrait)/i);
  assert.match(page, /className="positioning-scene"/);
  assert.match(page, /className="unified-process"/);
  assert.match(page, /className="recognition-band"/);
  assert.match(page, /className="red-noir-contact"/);
  assert.match(page, /technicalCapabilities\.aiMl\[0\]/);
  assert.match(page, /<ConnectedBuild videoServices=\{videoServices\} \/>/);
  assert.doesNotMatch(page, /engagement-section|proof-timeline|about-conversion|Send a video brief/i);
  assert.match(page, /<MotionController page="home" \/>/);
  assert.match(projectStage, /rel="noreferrer"/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /min-height:\s*2\.75rem/);
  assert.match(css, /\.mobile-menu\s*\{[\s\S]*?gap:\s*0\.5rem/);
  assert.match(css, /overflow-wrap:\s*anywhere/);
  assert.match(css, /--signal-red:\s*#ff3347/i);
  assert.match(css, /--signal-yellow:\s*#e9f400/i);
  assert.match(css, /--signal-cyan:\s*#00d8d2/i);
  assert.match(css, /@media \(max-width:\s*760px\)/);
  assert.match(layout, /alternates:\s*\{ canonical:\s*"\/" \}/);
  assert.doesNotMatch(css, /background-clip:\s*text|repeating-linear-gradient|border-radius:\s*(3[2-9]|[4-9]\d)px/i);
  assert.match(hero, /I transform complex AI ideas into/);
  assert.match(hero, /powerful products people understand and trust/);
  assert.match(hero, /Discuss your project/);
  assert.match(media, /hero-system-story-960\.webp/);
  assert.match(media, /hero-system-story-1728\.webp/);
  assert.match(media, /width=\{960\}[\s\S]*height=\{540\}/);
  assert.match(media, /width=\{1728\}[\s\S]*height=\{973\}/);
  assert.match(media, /alt=""/);
  assert.match(projectStage, /role="tablist"/);
  assert.match(projectStage, /role="tab"/);
  assert.match(projectStage, /aria-selected/);
  assert.match(projectStage, /aria-controls="active-project-panel"/);
  assert.match(projectStage, /aria-labelledby=\{`project-tab-\$\{activeIndex\}`\}/);
  assert.match(projectStage, /tabIndex=\{index === activeIndex \? 0 : -1\}/);
  assert.match(projectStage, /onKeyDown/);
  assert.match(projectStage, /"ArrowLeft", "ArrowRight", "Home", "End"/);
  assert.match(projectStage, /getElementById\(`project-tab-\$\{nextIndex\}`\)\?\.focus\(\)/);
  assert.match(projectStage, /project-stage-mobile/);
  assert.match(projectStage, /data-project-panel/);
  assert.match(connectedBuild, /data-pipeline/);
  assert.match(connectedBuild, /data-reveal-group/);
  assert.match(motion, /data-pipeline/);
  assert.match(motion, /data-about-portrait/);
  assert.match(motion, /import\("gsap"\)/);
  const reducedMotionGate = motion.indexOf("if (prefersReducedMotion) return;");
  const gsapImports = [...motion.matchAll(/import\(\s*["'](gsap(?:\/[^"']+)?)["']\s*\)/g)];
  const importedGsapModules = gsapImports.map((match) => match[1]);
  assert.ok(reducedMotionGate >= 0, "the reduced-motion early return is present");
  assert.ok(importedGsapModules.includes("gsap"), "the core GSAP dynamic import is present");
  assert.ok(importedGsapModules.includes("gsap/ScrollTrigger"), "the ScrollTrigger dynamic import is present");
  for (const gsapImport of gsapImports) {
    assert.ok(gsapImport.index > reducedMotionGate, `${gsapImport[1]} imports after the reduced-motion gate`);
  }
  assert.doesNotMatch(motion, /querySelectorAll<HTMLElement>\("\[data-motion-reveal\]"\)/);
  assert.doesNotMatch(motion, /data-reveal-group|data-portrait-reveal|data-project-panel/);
  assert.match(motion, /page === "home" \? "#work" : "\[data-about-portrait\]"/);
  const pipelineRevealStart = motion.indexOf("gsap.from(pipeline.children");
  const aboutRevealStart = motion.indexOf("gsap.from(aboutPortrait");
  const motionGateStart = motion.indexOf("const motionGate");
  assert.ok(pipelineRevealStart >= 0 && aboutRevealStart > pipelineRevealStart, "the pipeline reveal is scoped");
  assert.ok(motionGateStart > aboutRevealStart, "the About portrait reveal is scoped");
  const pipelineReveal = motion.slice(pipelineRevealStart, aboutRevealStart);
  const aboutReveal = motion.slice(aboutRevealStart, motionGateStart);
  assert.match(pipelineReveal, /clipPath: "inset\(0 100% 0 0\)"[\s\S]*duration: 0\.62[\s\S]*stagger: 0\.08[\s\S]*ease: "power3\.out"[\s\S]*clearProps: "clipPath"[\s\S]*scrollTrigger: \{ trigger: pipeline, start: "top 78%", once: true \}/);
  assert.match(aboutReveal, /clipPath: "inset\(0 0 100% 0\)"[\s\S]*duration: 0\.72[\s\S]*ease: "expo\.out"[\s\S]*clearProps: "clipPath"[\s\S]*scrollTrigger: \{ trigger: aboutPortrait, start: "top 84%", once: true \}/);
  assert.match(css, /html\[data-motion="full"\] \[data-home-hero-copy\][\s\S]*animation: hero-copy-in 0\.85s/);
  const reducedMotionCss = extractSourceBlock(css, "@media (prefers-reduced-motion: reduce)");
  const universalSelector = reducedMotionCss.match(/\*\s*,\s*\*::before\s*,\s*\*::after\s*\{/);
  assert.ok(universalSelector, "the reduced-motion universal selector is present");
  const universalReducedMotionRule = extractSourceBlock(reducedMotionCss, universalSelector[0]);
  assert.match(universalReducedMotionRule, /animation-duration:\s*0\.01ms\s*!important/);
  assert.match(universalReducedMotionRule, /animation-iteration-count:\s*1\s*!important/);
  assert.match(universalReducedMotionRule, /transition-duration:\s*0\.01ms\s*!important/);
  assert.match(reducedMotionCss, /html\[data-motion="reduced"\] \[data-home-hero-copy\][\s\S]*animation:\s*none\s*!important/);
  assert.match(connectedBuild, /Engineer the intelligence/);
  assert.match(connectedBuild, /AI video is the communication layer of the same build/);
  assert.match(css, /\.positioning-scene\s*\{/);
  assert.match(css, /\.connected-build\s*\{/);
  assert.match(css, /\.video-layer\s*\{/);
  assert.match(css, /\.unified-process\s*\{/);
  assert.match(css, /\.recognition-band\s*\{/);
  assert.match(css, /\.red-noir-contact\s*\{/);
  assert.match(css, /\.red-noir-contact-actions[\s\S]*?min-height:\s*2\.75rem/);
  assert.match(page, /"DocuSync",[\s\S]*"PIGEON Reproduction",[\s\S]*"Audio Deepfake Detection System",[\s\S]*"Customer Behavior Profiling"/);
  assert.match(page, /<ProjectStage projects=\{featuredProjects\} \/>/);
});

test("defines the factual portfolio data source", async () => {
  const source = await readFile(new URL("../app/data/profile.ts", import.meta.url), "utf8");
  assert.match(source, /Audio Deepfake Detection System/i);
  assert.match(source, /Qadri Group/i);
  assert.match(source, /University of Engineering and Technology, Taxila/i);
  assert.match(source, /Generative AI Application Developer/i);
  assert.match(source, /PEEF Scholar/i);
});

test("About source preserves semantic, responsive, and metadata contracts", async () => {
  const [about, css, aboutPortrait] = await Promise.all([
    readFile(new URL("../app/about/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/components/AboutPortrait.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(aboutPortrait, /ahsan-khizar\.webp/);
  assert.match(aboutPortrait, /data-about-portrait/);
  assert.match(aboutPortrait, /alt="Portrait of Ahsan Khizar"/);
  assert.match(about, /<AboutPortrait/);
  assert.match(css, /\.about-portrait-color-field/);
  assert.match(about, /export const metadata/);
  assert.match(about, /alternates:\s*\{ canonical:\s*"\/about" \}/);
  assert.match(about, /<main id="main-content" data-motion-page="about">/);
  assert.match(aboutPortrait, /fetchPriority="high"/);
  assert.match(aboutPortrait, /sizes="\(max-width: 760px\) 100vw, 42vw"/);
  assert.match(about, /<SiteHeader activePage="about"/);
  assert.match(about, /<SiteFooter \/>/);
  assert.match(about, /<MotionController page="about" \/>/);
  assert.match(css, /\.about-hero\s*\{/);
  assert.match(css, /\.about-capability-index\s*\{/);
});
