import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { chromium } from "playwright";

const installedEdge = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const executablePath = process.env.BROWSER_EXECUTABLE_PATH ??
  (process.platform === "win32" && existsSync(installedEdge) ? installedEdge : undefined);
const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
const browser = await chromium.launch({ ...(executablePath ? { executablePath } : {}), headless: true });
await mkdir("artifacts", { recursive: true });

function oklchLuminance(lightness, chroma, hue) {
  const radians = (hue * Math.PI) / 180;
  const a = chroma * Math.cos(radians);
  const b = chroma * Math.sin(radians);
  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const red = Math.max(
    0,
    Math.min(1, 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
  );
  const green = Math.max(
    0,
    Math.min(1, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
  );
  const blue = Math.max(
    0,
    Math.min(1, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  );
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrast(first, second) {
  const [lighter, darker] = [first, second].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

async function expectVisible(locator) {
  await locator.waitFor({ state: "visible" });
  assert.equal(await locator.isVisible(), true);
}

const stage = oklchLuminance(0.06, 0, 0);
assert.ok(
  contrast(stage, oklchLuminance(0.64, 0.22, 25)) >= 4.5,
  "carmine panel contrast",
);
assert.ok(
  contrast(stage, oklchLuminance(0.88, 0.18, 105)) >= 4.5,
  "citrus panel contrast",
);
assert.ok(
  contrast(stage, oklchLuminance(0.82, 0.16, 190)) >= 4.5,
  "cyan panel contrast",
);
assert.ok(
  contrast(stage, oklchLuminance(0.98, 0, 0)) >= 7,
  "white text contrast",
);

async function audit(name, viewport, { mobile = false, path = "/" } = {}) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      const location = message.location().url;
      errors.push(`console: ${message.text()}${location ? ` (${location})` : ""}`);
    }
  });
  page.on("pageerror", (error) => errors.push(`page: ${error.message}`));
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`http ${response.status()}: ${response.url()}`);
  });

  await page.goto(`${baseUrl}${path === "/" ? "" : path}`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() =>
    document.documentElement.hasAttribute("data-motion"),
  );
  await page.evaluate(() => document.fonts.ready);
  assert.match(await page.title(), /Ahsan Khizar/);
  assert.equal(await page.locator("main").count(), 1);
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(
    await page.getByRole("navigation", { name: "Main navigation" }).count(),
    1,
  );
  assert.ok((await page.locator(".site-header").boundingBox()).height >= 52);
  assert.equal(await page.locator(".site-footer").count(), 1);
  if (path !== "/") {
    assert.equal(
      await page.locator(".site-header").evaluate((header) => header.classList.contains("is-scrolled")),
      true,
      `${name} uses the solid header from initial render`,
    );
  }
  assert.equal(
    await page.locator("[id]").evaluateAll((nodes) => {
      const ids = nodes.map((node) => node.id).filter(Boolean);
      return ids.length - new Set(ids).size;
    }),
    0,
  );

  const geometry = await page.evaluate(() => ({
    viewport: window.innerWidth,
    pageWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    text: document.body.innerText.length,
    headings: [...document.querySelectorAll("h1, h2, h3")].map((heading) =>
      heading.textContent?.trim(),
    ),
    unlabeled: [
      ...document.querySelectorAll("a, button, input, textarea, select"),
    ].filter(
      (node) =>
        !node.textContent?.trim() &&
        !node.getAttribute("aria-label") &&
        !node.getAttribute("title"),
    ).length,
  }));

  assert.ok(
    geometry.pageWidth <= geometry.viewport + 1,
    `${name} has horizontal overflow`,
  );
  assert.ok(
    geometry.bodyWidth <= geometry.viewport + 1,
    `${name} body has horizontal overflow`,
  );
  assert.ok(geometry.text > 1_000, `${name} content did not render`);
  assert.equal(geometry.unlabeled, 0, `${name} has unlabeled controls`);
  assert.equal(
    await page.locator(".header-cta").getAttribute("href"),
    "/contact",
    `${name} routes the desktop inquiry CTA to the contact page`,
  );
  assert.equal(
    await page.locator(".mobile-menu-cta").getAttribute("href"),
    "/contact",
    `${name} routes the mobile inquiry CTA to the contact page`,
  );
  await page.keyboard.press("Home");
  await page.keyboard.press("Tab");
  assert.equal(
    await page.locator(":focus").textContent(),
    "Skip to main content",
  );

  if (path === "/") {
    const hero = page.locator(".cinematic-hero");
    await assert.doesNotReject(() => hero.waitFor({ state: "visible" }));
    const heroBox = await hero.boundingBox();
    assert.ok(
      heroBox && heroBox.height >= Math.min(viewport.height * 0.9, 820),
      `${name} hero is not viewport-led`,
    );
    assert.equal(
      await page.locator('main[data-motion-page="home"] img[src*="ahsan-khizar"]').count(),
      0,
    );

    if (viewport.width >= 768) {
      const projectStage = page.locator("[data-project-stage]");
      const tabs = projectStage.getByRole("tab");
      assert.equal(await tabs.count(), 4, `${name} project stage must expose four tabs`);
      await tabs.nth(0).focus();
      await page.keyboard.press("ArrowRight");
      assert.equal(await tabs.nth(1).getAttribute("aria-selected"), "true");
    }
  }

  if (mobile) {
    const menu = page.locator(".menu-button");
    assert.equal(await menu.getAttribute("aria-label"), "Open menu");
    await menu.click();
    await expectVisible(
      page.getByRole("navigation", { name: "Mobile navigation" }),
    );
    assert.equal(await menu.getAttribute("aria-label"), "Close menu");
    assert.equal(await menu.getAttribute("aria-expanded"), "true");
    const menuBox = await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .boundingBox();
    assert.ok(
      menuBox && menuBox.height >= viewport.height - 1,
      `${name} enhanced mobile menu fills the viewport`,
    );
    const firstMenuLink = page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link")
      .first();
    const lastMenuLink = page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link")
      .last();
    await page.waitForFunction(
      (link) => document.activeElement === link,
      await firstMenuLink.elementHandle(),
    );

    await lastMenuLink.focus();
    await page.keyboard.press("Tab");
    assert.equal(
      await menu.evaluate((button) => document.activeElement === button),
      true,
      `${name} wraps forward focus from the last menu control to the trigger`,
    );
    assert.equal(
      await page.locator(".site-header").evaluate(
        (header) => header.dataset.menuOpen === "true" && header.contains(document.activeElement),
      ),
      true,
      `${name} keeps forward focus inside the open menu`,
    );

    await page.keyboard.press("Escape");
    assert.equal(await menu.getAttribute("aria-label"), "Open menu");
    assert.equal(await menu.getAttribute("aria-expanded"), "false");
    assert.equal(await page.locator("#mobile-menu").getAttribute("data-open"), "false");
    assert.equal(
      await menu.evaluate((button) => document.activeElement === button),
      true,
      `${name} closes from the wrapped trigger and retains trigger focus`,
    );

    await menu.click();
    await page.waitForFunction(
      (link) => document.activeElement === link,
      await firstMenuLink.elementHandle(),
    );
    await menu.focus();
    await page.keyboard.press("Shift+Tab");
    assert.equal(
      await lastMenuLink.evaluate((link) => document.activeElement === link),
      true,
      `${name} wraps reverse focus from the trigger to the last menu control`,
    );
    assert.equal(
      await page.locator(".site-header").evaluate(
        (header) => header.dataset.menuOpen === "true" && header.contains(document.activeElement),
      ),
      true,
      `${name} keeps reverse focus inside the open menu`,
    );

    await firstMenuLink.focus();
    await page.keyboard.press("Escape");
    assert.equal(await menu.getAttribute("aria-label"), "Open menu");
    assert.equal(await menu.getAttribute("aria-expanded"), "false");
    assert.equal(
      await menu.evaluate((button) => document.activeElement === button),
      true,
      `${name} restores focus to the menu trigger after Escape`,
    );

    if (path === "/") {
      await menu.click();
      await page.waitForFunction(
        (link) => document.activeElement === link,
        await firstMenuLink.elementHandle(),
      );
      await firstMenuLink.press("Enter");
      await page.waitForFunction(() => window.location.hash === "#work");
      assert.equal(await menu.getAttribute("aria-label"), "Open menu");
      assert.equal(await menu.getAttribute("aria-expanded"), "false");
      assert.equal(await page.locator("#mobile-menu").getAttribute("data-open"), "false");

      await page.evaluate(() => {
        history.replaceState(null, "", window.location.pathname);
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo(0, 0);
      });
    }
  }

  assert.deepEqual(errors, []);

  await page.screenshot({ path: `artifacts/${name}.png`, fullPage: true });
  console.log(JSON.stringify({ name, ...geometry }));
  await page.close();
}

async function auditNoJavaScript() {
  for (const viewport of [
    { width: 375, height: 812 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
  ]) {
    const page = await browser.newPage({
      viewport,
      deviceScaleFactor: 1,
      javaScriptEnabled: false,
    });

    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

    if (viewport.width < 768) {
      await expectVisible(
        page.getByRole("navigation", { name: "Mobile navigation" }),
      );
      assert.equal(
        await page.locator(".menu-button").getAttribute("aria-expanded"),
        "true",
      );
    }

    const stackedProjects = page.locator(".project-stage-mobile article");
    assert.equal(await stackedProjects.count(), 4);
    for (const projectName of [
      "DocuSync",
      "PIGEON Reproduction",
      "Audio Deepfake Detection System",
      "Customer Behavior Profiling",
    ]) {
      await expectVisible(stackedProjects.filter({ hasText: projectName }));
    }

    await page.close();
  }
}

async function auditHeaderBoundary() {
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() =>
    document.querySelector(".site-header")?.getAttribute("data-enhanced") === "true",
  );

  const boundary = await page.locator(".cinematic-hero").evaluate(
    (hero) => hero.getBoundingClientRect().bottom + window.scrollY,
  );
  await page.evaluate((top) => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, top);
  }, boundary - 100);
  await page.waitForFunction(() =>
    !document.querySelector(".site-header")?.classList.contains("is-scrolled"),
  );
  await page.evaluate((top) => window.scrollTo(0, top), boundary + 1);
  await page.waitForFunction(() =>
    document.querySelector(".site-header")?.classList.contains("is-scrolled"),
  );

  await page.close();
}

async function auditReducedMotion() {
  for (const path of ["/", "/about", "/contact"]) {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });

    await page.goto(`${baseUrl}${path}`, {
      waitUntil: "domcontentloaded",
    });
    await page.waitForFunction(() =>
      document.documentElement.hasAttribute("data-motion"),
    );
    assert.equal(
      await page.locator("html").getAttribute("data-motion"),
      "reduced",
    );
    assert.equal(await page.locator(".pin-spacer").count(), 0);
    const visible = await page.locator("main").evaluate((main) => {
      const styles = getComputedStyle(main.querySelector("h1"));
      return styles.opacity === "1" && styles.transform === "none";
    });
    assert.equal(
      visible,
      true,
      `${path} keeps primary content visible with reduced motion`,
    );
    if (path === "/") {
      assert.equal(await page.locator("[data-hero-spotlight]").evaluate((node) => getComputedStyle(node).display), "none");
    } else if (path === "/about") {
      assert.equal(await page.locator("[data-fragment-assembly]").first().evaluate((node) => getComputedStyle(node).display), "none");
    }
    await page.close();
  }
}

async function auditHeroInteraction() {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.locator('[data-motion-page="home"][data-motion-ready="true"]').waitFor();
  assert.equal(await page.locator(".hero-kicker").count(), 0, "the removed hero kicker stays removed");

  const headerAlignment = await page.locator(".site-header").evaluate((header) => {
    const headerBox = header.getBoundingClientRect();
    const center = headerBox.top + headerBox.height / 2;
    const controls = [...header.querySelectorAll(".desktop-nav a, .header-cta")];
    return controls.map((control) => {
      const box = control.getBoundingClientRect();
      return Math.abs(box.top + box.height / 2 - center);
    });
  });
  assert.ok(headerAlignment.every((offset) => offset <= 1), "desktop navigation is vertically centered");

  await page.mouse.move(760, 450);
  await page.waitForTimeout(650);
  const openState = await page.locator("[data-hero-media]").evaluate((root) => ({
    spotlightX: getComputedStyle(root).getPropertyValue("--spotlight-x").trim(),
    spotlightY: getComputedStyle(root).getPropertyValue("--spotlight-y").trim(),
    spotlightOpacity: Number.parseFloat(getComputedStyle(root.querySelector("[data-hero-spotlight]")).opacity),
    spotlightMask: getComputedStyle(root.querySelector("[data-hero-spotlight]")).maskImage,
    characterTransform: getComputedStyle(root.querySelector("[data-pointer-character]")).transform,
  }));
  assert.match(openState.spotlightX, /px$/, "spotlight follows the horizontal pointer coordinate");
  assert.match(openState.spotlightY, /px$/, "spotlight follows the vertical pointer coordinate");
  assert.ok(openState.spotlightOpacity >= 0.9, "spotlight reveal opens on pointer enter");
  assert.match(openState.spotlightMask, /radial-gradient/i, "spotlight uses a soft radial mask");
  assert.notEqual(openState.characterTransform, "none", "character follows the pointer");

  const heroWords = page.locator("[data-hero-word]");
  assert.ok(await heroWords.count() > 6, "hero heading is split into accessible animated words");
  const titleState = await page.locator(".hero-title-line").first().evaluate((line) => ({
    opacity: Number.parseFloat(getComputedStyle(line.querySelector("[data-hero-word]")).opacity),
    underline: getComputedStyle(line, "::after").content,
  }));
  assert.ok(titleState.opacity >= 0.95, "hero word sequence completes after load");
  assert.ok(titleState.underline === "none" || titleState.underline === "normal", "old hero underline hover stays removed");
  await page.mouse.move(100, 40);
  await page.waitForTimeout(850);
  assert.ok(
    Number.parseFloat(await page.locator("[data-hero-spotlight]").evaluate((node) => getComputedStyle(node).opacity)) <= 0.05,
    "spotlight closes smoothly",
  );

  await page.evaluate(() => window.scrollTo(0, 460));
  await page.waitForTimeout(700);
  assert.notEqual(
    await page.locator("[data-scroll-character]").first().evaluate((node) => getComputedStyle(node).transform),
    "none",
    "hero character receives scroll-linked depth",
  );

  const heroGeometry = await page.locator(".cinematic-hero").evaluate((hero) => ({
    top: hero.getBoundingClientRect().top + window.scrollY,
    height: hero.getBoundingClientRect().height,
  }));
  await page.evaluate(
    ({ top, height }) => window.scrollTo(0, top + height - window.innerHeight + 24),
    heroGeometry,
  );
  await page.waitForTimeout(350);
  const heroBoundary = await page.evaluate(() => {
    const hero = document.querySelector(".cinematic-hero");
    const rail = document.querySelector(".hero-capability-rail");
    return {
      heroBottom: hero.getBoundingClientRect().bottom,
      railBottom: rail.getBoundingClientRect().bottom,
      progressTransform: getComputedStyle(document.querySelector("[data-hero-scroll-progress]")).transform,
    };
  });
  assert.ok(
    Math.abs(heroBoundary.heroBottom - heroBoundary.railBottom) <= 2,
    "hero capability rail remains attached to the hero boundary",
  );
  assert.notEqual(heroBoundary.progressTransform, "none", "hero scroll progress responds to the scroll scene");

  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "About", exact: true }).click();
  await page.waitForURL(/\/about$/);
  await page.goBack({ waitUntil: "networkidle" });
  await expectVisible(page.locator(".cinematic-hero"));
  assert.deepEqual(errors, [], "hero interactions and route return do not leak errors");
  await page.close();
}

async function auditPracticeVideoAndFooter() {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.locator('[data-motion-page="home"][data-motion-ready="true"]').waitFor();

  const practiceCard = page.locator("[data-practice-card]").nth(1);
  await practiceCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const practiceImage = practiceCard.locator(".practice-card-image");
  const closedPracticeState = await practiceImage.evaluate((image) => ({
    opacity: Number.parseFloat(getComputedStyle(image).opacity),
    clipPath: getComputedStyle(image).clipPath,
  }));
  assert.ok(closedPracticeState.opacity <= 0.05, "Practice image starts concealed");
  assert.match(closedPracticeState.clipPath, /inset\(100%/i, "Practice image uses a clipped starting state");

  await practiceCard.locator(".practice-card-surface").hover();
  await page.waitForTimeout(850);
  const openPracticeState = await practiceImage.evaluate((image) => ({
    opacity: Number.parseFloat(getComputedStyle(image).opacity),
    clipPath: getComputedStyle(image).clipPath,
  }));
  assert.ok(openPracticeState.opacity >= 0.95, "Practice image reveal opens on hover");
  assert.match(openPracticeState.clipPath, /inset\(0(?:px|%)?/i, "Practice image reveal completes its clip");

  const videoShowcase = page.locator("[data-video-service-showcase]");
  await videoShowcase.scrollIntoViewIfNeeded();
  const serviceButtons = videoShowcase.getByRole("button");
  assert.equal(await serviceButtons.count(), 5, "video showcase exposes all service choices");
  await serviceButtons.nth(3).hover();
  await page.waitForTimeout(700);
  assert.equal(await serviceButtons.nth(3).getAttribute("aria-pressed"), "true");
  assert.equal(
    await videoShowcase.locator('.video-service-slide[data-active="true"]').count(),
    1,
    "video showcase keeps one visual active",
  );

  const footer = page.locator(".site-footer");
  await footer.scrollIntoViewIfNeeded();
  const footerFit = await page.evaluate(() => {
    const wordmark = document.querySelector(".footer-wordmark");
    return {
      wordmarkClientWidth: wordmark.clientWidth,
      wordmarkScrollWidth: wordmark.scrollWidth,
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    };
  });
  assert.ok(
    footerFit.wordmarkScrollWidth <= footerFit.wordmarkClientWidth + 1,
    "footer wordmark stays inside its container",
  );
  assert.ok(footerFit.documentWidth <= footerFit.viewportWidth + 1, "footer introduces no horizontal overflow");
  assert.deepEqual(errors, [], "Practice, video, and footer interactions produce no browser errors");
  await page.close();
}

async function auditAboutInteraction() {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto(`${baseUrl}/about`, { waitUntil: "networkidle" });
  await page.locator('[data-motion-page="about"][data-motion-ready="true"]').waitFor();
  const aboutTitleState = await page.locator("[data-about-title]").evaluate((title) => ({
    words: title.querySelectorAll("[data-about-word]").length,
    underline: getComputedStyle(title.querySelector("[data-about-title-line]"), "::after").content,
    bottom: title.getBoundingClientRect().bottom,
    introductionTop: title.parentElement.querySelector(".about-introduction").getBoundingClientRect().top,
  }));
  assert.ok(aboutTitleState.words >= 7, "About heading uses a staggered word sequence");
  assert.ok(aboutTitleState.underline === "none" || aboutTitleState.underline === "normal", "old About underline hover stays removed");
  assert.ok(aboutTitleState.bottom <= aboutTitleState.introductionTop, "About heading does not overlap its introduction at 100% zoom");

  const portrait = page.locator("[data-about-portrait]");
  const box = await portrait.boundingBox();
  assert.ok(box, "About portrait has stable geometry");
  await page.mouse.move(box.x + box.width * 0.24, box.y + box.height * 0.38);
  await page.waitForTimeout(650);

  const state = await portrait.evaluate((root) => ({
    tilt: getComputedStyle(root.querySelector("[data-portrait-stage]")).transform,
    ai: getComputedStyle(root.querySelector("[data-ai-pointer]")).transform,
    human: getComputedStyle(root.querySelector("[data-human-pointer]")).transform,
    lightX: getComputedStyle(root).getPropertyValue("--portrait-light-x").trim(),
  }));
  assert.notEqual(state.tilt, "none", "portrait receives restrained tilt");
  assert.notEqual(state.ai, "none", "AI half receives depth movement");
  assert.notEqual(state.human, "none", "human half remains subtly responsive");
  assert.notEqual(state.lightX, "50%", "portrait light follows pointer position");

  await portrait.dispatchEvent("pointerleave", { pointerType: "mouse" });
  await page.waitForTimeout(750);
  assert.deepEqual(errors, [], "About interaction produces no browser errors");
  await page.close();
}

async function auditScrollChoreography() {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.locator('[data-motion-page="home"][data-motion-ready="true"]').waitFor();
  const reveal = page.locator("[data-motion-reveal]").first();
  await page.waitForTimeout(400);
  assert.ok(
    Number.parseFloat(await reveal.evaluate((node) => getComputedStyle(node).opacity)) <= 0.05,
    "below-fold content begins in its prepared reveal state",
  );

  await reveal.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  assert.ok(
    Number.parseFloat(await reveal.evaluate((node) => getComputedStyle(node).opacity)) >= 0.95,
    "section reveal completes while scrolling forward",
  );

  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  });
  await page.waitForFunction(() => {
    const element = document.querySelector("[data-motion-reveal]");
    return element && Number.parseFloat(getComputedStyle(element).opacity) <= 0.05;
  });
  assert.ok(
    Number.parseFloat(await reveal.evaluate((node) => getComputedStyle(node).opacity)) <= 0.05,
    "section reveal resets cleanly when scrolling back above it",
  );
  assert.deepEqual(errors, [], "scroll choreography produces no browser errors");
  await page.close();
}

await audit("desktop-1440", { width: 1440, height: 1000 });
await audit("laptop-1024", { width: 1024, height: 768 });
await audit("tablet-768", { width: 768, height: 1024 });
await audit("mobile-390", { width: 390, height: 844 }, { mobile: true });
await audit("mobile-375", { width: 375, height: 812 }, { mobile: true });
await audit("about-desktop-1440", { width: 1440, height: 1000 }, { path: "/about" });
await audit("about-mobile-390", { width: 390, height: 844 }, { mobile: true, path: "/about" });
await audit("contact-desktop-1440", { width: 1440, height: 1000 }, { path: "/contact" });
await audit("contact-mobile-390", { width: 390, height: 844 }, { mobile: true, path: "/contact" });
await auditNoJavaScript();
await auditHeaderBoundary();
await auditReducedMotion();
await auditHeroInteraction();
await auditPracticeVideoAndFooter();
await auditAboutInteraction();
await auditScrollChoreography();
await browser.close();
