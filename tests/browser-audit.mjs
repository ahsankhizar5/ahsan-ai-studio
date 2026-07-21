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
  if (path === "/about") {
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
    "#contact",
    `${name} keeps the desktop inquiry CTA on the current page`,
  );
  assert.equal(
    await page.locator(".mobile-menu-cta").getAttribute("href"),
    "#contact",
    `${name} keeps the mobile inquiry CTA on the current page`,
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
  for (const path of ["/", "/about"]) {
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
    await page.close();
  }
}

async function auditDeferredMotion() {
  const motionAssets = /\/assets\/(gsap|ScrollTrigger)-/;
  const page = await browser.newPage({ viewport: { width: 1440, height: 800 } });

  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() =>
    document.documentElement.hasAttribute("data-motion"),
  );
  assert.equal(await page.locator("html").getAttribute("data-motion"), "full");
  assert.equal(
    await page.evaluate((pattern) =>
      performance
        .getEntriesByType("resource")
        .some((entry) => new RegExp(pattern).test(entry.name)),
      motionAssets.source,
    ),
    false,
    "GSAP stays off the initial rendering path",
  );

  await page.locator("#work").scrollIntoViewIfNeeded();
  await page.waitForFunction(
    (pattern) =>
      performance
        .getEntriesByType("resource")
        .some((entry) => new RegExp(pattern).test(entry.name)),
    motionAssets.source,
  );
  await page.close();

  const reducedPage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  await reducedPage.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await reducedPage.waitForFunction(
    () => document.documentElement.dataset.motion === "reduced",
  );
  assert.equal(
    await reducedPage.locator("html").getAttribute("data-motion"),
    "reduced",
  );
  await reducedPage.locator("#work").scrollIntoViewIfNeeded();
  assert.equal(
    await reducedPage.evaluate((pattern) =>
      performance
        .getEntriesByType("resource")
        .some((entry) => new RegExp(pattern).test(entry.name)),
      motionAssets.source,
    ),
    false,
    "reduced-motion visitors do not download GSAP",
  );
  await reducedPage.close();
}

async function auditRejectedMotionImports() {
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  const pageErrors = [];
  let resolveRejectedImport;
  const rejectedImport = new Promise((resolve) => {
    resolveRejectedImport = resolve;
  });

  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.route(/\/assets\/(?:gsap|ScrollTrigger)-/, async (route) => {
    resolveRejectedImport(route.request().url());
    await route.abort();
  });

  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() =>
    document.documentElement.hasAttribute("data-motion"),
  );
  await page.locator("#work").scrollIntoViewIfNeeded();
  await rejectedImport;

  const tabs = page.locator("[data-project-stage]").getByRole("tab");
  await tabs.nth(1).click();
  assert.equal(await tabs.nth(1).getAttribute("aria-selected"), "true");
  await expectVisible(page.getByRole("tabpanel").getByRole("heading", { name: "PIGEON Reproduction" }));
  await expectVisible(page.getByRole("heading", { name: "Engineer the intelligence." }));
  assert.deepEqual(pageErrors, [], "rejected optional imports do not become unhandled errors");

  await page.close();
}

await audit("desktop-1440", { width: 1440, height: 1000 });
await audit("laptop-1024", { width: 1024, height: 768 });
await audit("tablet-768", { width: 768, height: 1024 });
await audit("mobile-390", { width: 390, height: 844 }, { mobile: true });
await audit("mobile-375", { width: 375, height: 812 }, { mobile: true });
await audit("about-desktop-1440", { width: 1440, height: 1000 }, { path: "/about" });
await audit("about-mobile-390", { width: 390, height: 844 }, { mobile: true, path: "/about" });
await auditNoJavaScript();
await auditHeaderBoundary();
await auditReducedMotion();
await auditDeferredMotion();
await auditRejectedMotionImports();
await browser.close();
