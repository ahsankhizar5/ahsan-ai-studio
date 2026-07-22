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

test("ships optimized local hero and About media layers", async () => {
  const [background, backgroundSmall, character, spotlight, aboutPortrait] = await Promise.all([
    readFile(new URL("../public/media/hero-background-plate.webp", import.meta.url)),
    readFile(new URL("../public/media/hero-background-plate-1280.webp", import.meta.url)),
    readFile(new URL("../public/media/hero-character.webp", import.meta.url)),
    readFile(new URL("../public/media/hero-spotlight-reveal.webp", import.meta.url)),
    readFile(new URL("../public/media/about-ai-model-bloom-cutout.webp", import.meta.url)),
  ]);
  assert.ok(background.byteLength > 70_000);
  assert.ok(backgroundSmall.byteLength > 30_000);
  assert.ok(character.byteLength > 30_000);
  assert.ok(spotlight.byteLength > 70_000);
  assert.ok(aboutPortrait.byteLength > 250_000);
});

test("ships a distinct optimized visual for every Practice and video-service state", async () => {
  const assetNames = [
    "practice-system.webp",
    "practice-product.webp",
    "practice-story.webp",
    "service-avatar-explainers.webp",
    "service-ugc-performance.webp",
    "service-product-demo.webp",
    "service-localized-content.webp",
    "service-creative-variations.webp",
  ];
  const assets = await Promise.all(
    assetNames.map((name) => readFile(new URL(`../public/media/generated/${name}`, import.meta.url))),
  );

  assert.equal(new Set(assetNames).size, 8);
  assert.ok(assets.every((asset) => asset.byteLength > 20_000));
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
  const credibilityRail = html.match(/<section class="credibility-rail"[\s\S]*?<\/section>/i)?.[0];
  assert.ok(credibilityRail, "the credibility rail is server-rendered");
  assert.equal((credibilityRail.match(/<li>/g) ?? []).length, 4);
  assert.match(credibilityRail, /Bachelor of Engineering in Software Engineering/i);
  assert.match(credibilityRail, /Software Engineer Intern/i);
  assert.match(credibilityRail, /4th Position, All Pakistan Prompt Engineering Competition/i);
  assert.match(credibilityRail, /Top 20 Finalist, Global AI Hackathon/i);
  assert.doesNotMatch(credibilityRail, /Generative AI Application Developer/i);
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
  assert.match(html, /data-hero-spotlight/i);
  assert.match(html, /data-hero-word/i);
  assert.match(html, /hero-spotlight-reveal\.webp/i);
  assert.match(html, /media\/hero-background-plate\.webp/i);
  assert.match(html, /media\/hero-character\.webp/i);
  assert.doesNotMatch(html, /class="hero-kicker"/i);
  assert.match(html, /data-home-hero-copy/i);
  assert.match(html, /data-hero-sticky/i);
  assert.match(html, /data-hero-scroll-progress/i);
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
  assert.match(html, /data-practice-card/i);
  assert.match(html, /data-video-service-showcase/i);
  assert.match(html, /aria-pressed/i);
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
  assert.equal(jsonLd.primaryImageOfPage.width, 1024);
  assert.equal(jsonLd.primaryImageOfPage.height, 1536);
  assert.match(jsonLd.primaryImageOfPage.url, /^http:\/\/localhost(?::3000)?\/media\/about-ai-model-bloom-cutout\.webp$/);
  assert.match(
    html,
    /<img[^>]*src="\/media\/about-ai-model-bloom-cutout\.webp"[^>]*alt="Ahsan Khizar, shown as a human and applied-AI systems builder"/i,
  );
  assert.match(html, /data-portrait-particle/i);
  assert.match(html, /data-motion-page="about"/i);
  assert.match(html, /MotionController/i);
});

test("server-renders the dedicated contact experience", async () => {
  const response = await render("/contact");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  assert.match(html, /<link rel="canonical" href="http:\/\/localhost(?::3000)?\/contact"/i);
  assert.match(html, /data-motion-page="contact"/i);
  assert.match(html, /data-contact-sequence/i);
  assert.match(html, /Bring me the hard part/i);
  assert.match(html, /ahsankhizar1075@gmail\.com/i);
  assert.match(html, /<footer[^>]*class="site-footer"/i);
});

test("publishes absolute crawl endpoints", async () => {
  const [robotsResponse, sitemapResponse] = await Promise.all([render("/robots.txt"), render("/sitemap.xml")]);
  assert.equal(robotsResponse.status, 200);
  assert.equal(sitemapResponse.status, 200);
  assert.match(await robotsResponse.text(), /Sitemap: http:\/\/localhost\/sitemap\.xml/i);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /<loc>http:\/\/localhost\/<\/loc>/i);
  assert.match(sitemap, /<loc>http:\/\/localhost\/about<\/loc>/i);
  assert.match(sitemap, /<loc>http:\/\/localhost\/contact<\/loc>/i);
});

test("source preserves accessible and responsive contracts", async () => {
  const [page, css, layout, header, hero, media, heroMediaMotion, projectStage, projectVisual, toolMarquee, connectedBuild, videoServiceShowcase, footer, contact, motion, siteMotion, browserAudit] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/HomepageHero.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/HeroMedia.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/HeroMediaMotion.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ProjectStage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ProjectVisual.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ToolMarquee.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ConnectedBuild.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/VideoServiceShowcase.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteFooter.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/contact/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/MotionController.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteMotion.tsx", import.meta.url), "utf8"),
    readFile(new URL("./browser-audit.mjs", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<SiteHeader activePage="home"/);
  assert.match(header, /<AkMark \/>/);
  assert.match(header, /AI product engineer/);
  assert.match(header, /Start a project/);
  assert.match(header, /aria-label=\{menuOpen \? "Close menu" : "Open menu"\}/);
  assert.match(header, /new IntersectionObserver/);
  assert.match(header, /hero\.getBoundingClientRect\(\)\.bottom <= 0/);
  assert.match(header, /observer\?\.disconnect\(\)/);
  assert.match(header, /querySelector<HTMLAnchorElement>\("a"\)\?\.focus\(\)/);
  assert.match(header, /querySelectorAll<HTMLAnchorElement>\("a\[href\]"\)/);
  assert.match(header, /event\.key === "Escape"/);
  assert.match(header, /event\.key !== "Tab"/);
  assert.match(header, /event\.shiftKey/);
  assert.match(header, /document\.addEventListener\("keydown", handleFocusContainment\)/);
  assert.match(header, /document\.removeEventListener\("keydown", handleFocusContainment\)/);
  assert.doesNotMatch(header, /onKeyDown=\{handleMobileMenuKeyDown\}/);
  assert.match(header, /restoreTriggerFocus\.current = true/);
  assert.match(header, /menuButtonRef\.current\?\.focus\(\)/);
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
  assert.match(css, /\.site-header\[data-enhanced="true"\]\[data-menu-open="true"\][\s\S]*?min-height:\s*100dvh/);
  assert.match(css, /overflow-wrap:\s*anywhere/);
  assert.match(css, /--signal-red:\s*#ff3347/i);
  assert.match(css, /--signal-yellow:\s*#e9f400/i);
  assert.match(css, /--signal-cyan:\s*#00d8d2/i);
  assert.match(css, /@media \(max-width:\s*760px\)/);
  assert.match(layout, /alternates:\s*\{ canonical:\s*"\/" \}/);
  assert.equal(
    (layout.match(/Ahsan Khizar transforms complex AI ideas into powerful products people understand and trust—from the system to the story that explains it\./g) ?? []).length,
    3,
  );
  assert.doesNotMatch(css, /background-clip:\s*text|repeating-linear-gradient|border-radius:\s*(3[2-9]|[4-9]\d)px/i);
  assert.match(hero, /I transform complex AI ideas into/);
  assert.match(hero, /powerful products people understand and trust/);
  assert.match(hero, /Discuss your project/);
  assert.match(hero, /cinematic-hero-sticky/);
  assert.match(hero, /data-hero-scroll-progress/);
  assert.match(media, /HeroMediaMotion/);
  assert.match(media, /ssr: false/);
  assert.match(heroMediaMotion, /@gsap\/react/);
  assert.match(heroMediaMotion, /gsap\/ScrollTrigger/);
  assert.match(media, /hero-background-plate\.webp/);
  assert.match(media, /hero-character\.webp/);
  assert.match(media, /data-hero-spotlight/);
  assert.match(media, /hero-spotlight-reveal\.webp/);
  assert.match(hero, /data-hero-word/);
  assert.match(heroMediaMotion, /quickTo/);
  assert.match(heroMediaMotion, /contextSafe/);
  assert.match(heroMediaMotion, /pointermove/);
  assert.match(heroMediaMotion, /--spotlight-x/);
  assert.match(heroMediaMotion, /titleWords/);
  assert.match(heroMediaMotion, /scrub: 0\.6/);
  assert.match(heroMediaMotion, /capabilityItems/);
  assert.match(heroMediaMotion, /scrollProgress/);
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
  assert.match(projectStage, /const \[selectionVersion, setSelectionVersion\] = useState\(0\)/);
  assert.match(projectStage, /if \(selectionVersion === 0\) return/);
  assert.match(projectStage, /setSelectionVersion\(\(version\) => version \+ 1\)/);
  assert.match(projectStage, /selectProject\(nextIndex\)/);
  assert.match(projectStage, /onClick=\{\(\) => selectProject\(index\)\}/);
  assert.match(projectStage, /\[activeIndex, selectionVersion\]/);
  assert.doesNotMatch(projectStage, /hasMountedPanel/);
  assert.match(projectStage, /project-stage-mobile/);
  assert.match(projectStage, /data-enhanced=\{enhanced\}/);
  assert.match(css, /\.project-stage\[data-enhanced="true"\] \.project-stage-desktop\s*\{\s*display:\s*block/);
  assert.match(css, /\.project-stage\[data-enhanced="true"\] \.project-stage-mobile\s*\{\s*display:\s*none/);
  assert.match(projectStage, /data-project-panel/);
  assert.match(projectStage, /<ProjectVisual project=/);
  assert.match(projectVisual, /data-project-visual/);
  assert.match(projectVisual, /TechnologyLogo/);
  assert.match(page, /<ToolMarquee \/>/);
  assert.match(toolMarquee, /data-tool-track/);
  assert.match(toolMarquee, /marqueeTechnologies/);
  assert.match(footer, /footer-invitation/);
  assert.match(footer, /href="\/contact"/);
  assert.match(contact, /data-motion-page="contact"/);
  assert.match(contact, /data-contact-sequence/);
  assert.match(browserAudit, /const projectStage = page\.locator\("\[data-project-stage\]"\)/);
  assert.match(browserAudit, /projectStage\.getByRole\("tab"\)/);
  assert.match(browserAudit, /document\.documentElement\.hasAttribute\("data-motion"\)/);
  assert.match(connectedBuild, /data-pipeline/);
  assert.match(connectedBuild, /data-reveal-group/);
  assert.match(connectedBuild, /data-practice-card/);
  assert.match(connectedBuild, /practice-card-image/);
  assert.match(connectedBuild, /media\/generated\/practice-system\.webp/);
  assert.match(connectedBuild, /media\/generated\/practice-product\.webp/);
  assert.match(connectedBuild, /media\/generated\/practice-story\.webp/);
  assert.match(connectedBuild, /VideoServiceShowcase/);
  assert.match(videoServiceShowcase, /aria-pressed/);
  assert.match(videoServiceShowcase, /data-video-service-preview/);
  assert.match(videoServiceShowcase, /onPointerEnter/);
  assert.equal((videoServiceShowcase.match(/media\/generated\/service-[\w-]+\.webp/g) ?? []).length, 5);
  assert.match(motion, /import\("\.\/SiteMotion"\)/);
  assert.match(motion, /ssr: false/);
  assert.match(motion, /reducedMotion \? null : <SiteMotion page=\{page\} \/>/);
  assert.match(siteMotion, /@gsap\/react/);
  assert.match(siteMotion, /gsap\/ScrollTrigger/);
  assert.match(siteMotion, /gsap\.matchMedia\(\)/);
  assert.match(siteMotion, /contextSafe/);
  assert.match(siteMotion, /\[data-motion-reveal\]/);
  assert.match(siteMotion, /\[data-reveal-group\]/);
  assert.match(siteMotion, /\[data-pipeline\]/);
  assert.match(siteMotion, /\[data-video-service-preview\]/);
  assert.match(siteMotion, /\[data-video-service-scan\]/);
  assert.match(siteMotion, /toggleActions: "play none none reverse"/);
  assert.match(siteMotion, /scrub: 0\.8/);
  assert.match(projectStage, /\.catch\(\(error: unknown\)/);
  assert.match(projectStage, /Project transition enhancement unavailable/);
  assert.match(siteMotion, /clipPath: "inset\(0 100% 0 0\)"/);
  assert.match(siteMotion, /duration: 0\.72/);
  assert.match(siteMotion, /stagger: 0\.1/);
  assert.match(siteMotion, /start: "top 80%"/);
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
  assert.match(css, /\.cinematic-hero-sticky\s*\{/);
  assert.match(css, /\.hero-media-vignette\s*\{/);
  assert.match(css, /\.practice-card-image\s*\{/);
  assert.match(css, /\.video-service-preview\s*\{/);
  assert.match(css, /\.footer-wordmark[\s\S]*font-size:\s*clamp\(2\.75rem, 11\.25vw, 10\.5rem\)/);
  assert.match(css, /\.unified-process\s*\{/);
  assert.match(css, /\.recognition-band\s*\{/);
  assert.match(css, /\.red-noir-contact\s*\{/);
  assert.match(css, /\.red-noir-contact-actions[\s\S]*?min-height:\s*2\.75rem/);
  assert.match(page, /"DocuSync",[\s\S]*"PIGEON Reproduction",[\s\S]*"Audio Deepfake Detection System",[\s\S]*"Customer Behavior Profiling"/);
  assert.match(page, /<ProjectStage projects=\{featuredProjects\} \/>/);
  assert.match(page, /profile\.education\.degree/);
  assert.match(page, /experience\.map\(\(\{ role \}\) => role\)/);
  assert.match(page, /recognition\[0\],[\s\S]*recognition\[1\]/);
  assert.doesNotMatch(page, /certifications/);
  assert.doesNotMatch(
    css,
    /@media \(max-width: 760px\)\s*\{\s*\.cinematic-hero/,
  );
  const firstMobileBlock = css.lastIndexOf("@media (max-width: 767px)");
  const cinematicHeroMobileIndex = css.indexOf(".cinematic-hero {", firstMobileBlock);
  const cinematicMobileStart = css.lastIndexOf("@media (max-width: 767px)", cinematicHeroMobileIndex);
  assert.notEqual(cinematicMobileStart, -1, "the authoritative 767px block exists");
  const cinematicMobileEnd = css.indexOf("@media ", cinematicHeroMobileIndex);
  const cinematicMobileCss = css.slice(cinematicMobileStart, cinematicMobileEnd === -1 ? undefined : cinematicMobileEnd);
  assert.match(cinematicMobileCss, /\.cinematic-hero\s*\{[\s\S]*min-height:\s*53rem[\s\S]*height:\s*100dvh/);
  assert.match(cinematicMobileCss, /\.hero-composite img[\s\S]*object-position:\s*82% center/);
  assert.match(cinematicMobileCss, /\.cinematic-hero-copy[\s\S]*top:\s*8\.2rem[\s\S]*bottom:\s*auto/);
  assert.match(cinematicMobileCss, /\.cinematic-hero h1[\s\S]*font-size:\s*clamp\(2\.15rem, 9\.3vw, 2\.65rem\)/);
  assert.match(css, /\.connected-build-phases:has\(li:hover\)[\s\S]*flex-grow:\s*0\.76/);
  assert.match(css, /\.connected-build-phases li:hover[\s\S]*flex-grow:\s*1\.48/);
  assert.match(browserAudit, /\{ width: 768, height: 1024 \}/);
  assert.match(browserAudit, /\{ width: 1024, height: 768 \}/);
  assert.match(browserAudit, /restores focus to the menu trigger after Escape/);
  assert.match(browserAudit, /wraps forward focus from the last menu control to the trigger/);
  assert.match(browserAudit, /wraps reverse focus from the trigger to the last menu control/);
  assert.match(browserAudit, /closes from the wrapped trigger and retains trigger focus/);
  assert.match(browserAudit, /firstMenuLink\.press\("Enter"\)/);
  assert.match(browserAudit, /window\.location\.hash === "#work"/);
  assert.match(browserAudit, /keeps forward focus inside the open menu/);
  assert.match(browserAudit, /keeps reverse focus inside the open menu/);
  assert.match(browserAudit, /async function auditHeaderBoundary/);
  assert.match(browserAudit, /async function auditHeroInteraction/);
  assert.match(browserAudit, /async function auditAboutInteraction/);
  assert.match(browserAudit, /async function auditPracticeVideoAndFooter/);
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
  const [about, css, aboutPortrait, aboutPortraitMotion] = await Promise.all([
    readFile(new URL("../app/about/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/components/AboutPortrait.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/AboutPortraitMotion.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(aboutPortrait, /about-ai-model-bloom-cutout\.webp/);
  assert.match(aboutPortrait, /AboutPortraitMotion/);
  assert.match(aboutPortrait, /ssr: false/);
  assert.match(aboutPortraitMotion, /@gsap\/react/);
  assert.match(aboutPortraitMotion, /gsap\/ScrollTrigger/);
  assert.match(aboutPortrait, /data-human-assembly/);
  assert.match(aboutPortrait, /data-ai-assembly/);
  assert.match(aboutPortrait, /data-fragment-assembly/);
  assert.match(aboutPortrait, /data-portrait-particle/);
  assert.match(aboutPortraitMotion, /particleDrift/);
  assert.match(aboutPortraitMotion, /pointermove/);
  assert.match(aboutPortraitMotion, /scrub: 0\.6/);
  assert.match(aboutPortrait, /data-about-portrait/);
  assert.match(aboutPortrait, /<figure/);
  assert.match(aboutPortrait, /<figcaption/);
  assert.match(aboutPortrait, /alt="Ahsan Khizar, shown as a human and applied-AI systems builder"/);
  assert.match(about, /<AboutPortrait/);
  assert.match(css, /\.about-portrait-fragment/);
  assert.match(css, /\.about-portrait-human/);
  assert.match(css, /\.about-portrait-ai/);
  assert.match(about, /export const metadata/);
  assert.match(about, /alternates:\s*\{ canonical:\s*"\/about" \}/);
  assert.match(about, /<main id="main-content" data-motion-page="about">/);
  assert.match(aboutPortrait, /loading="lazy"/);
  assert.match(aboutPortrait, /sizes="\(max-width: 767px\) calc\(100vw - 2\.5rem\), 42vw"/);
  assert.match(about, /<SiteHeader activePage="about"/);
  assert.match(about, /<SiteFooter \/>/);
  assert.match(about, /<MotionController page="about" \/>/);
  assert.match(css, /\.about-hero\s*\{/);
  assert.match(css, /\.about-capability-index\s*\{/);
});
