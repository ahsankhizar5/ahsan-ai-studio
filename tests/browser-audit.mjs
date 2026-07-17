import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const executablePath = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await chromium.launch({ executablePath, headless: true });
await mkdir("artifacts", { recursive: true });

function oklchLuminance(lightness, chroma, hue) {
  const radians = (hue * Math.PI) / 180;
  const a = chroma * Math.cos(radians);
  const b = chroma * Math.sin(radians);
  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const red = Math.max(0, Math.min(1, 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s));
  const green = Math.max(0, Math.min(1, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s));
  const blue = Math.max(0, Math.min(1, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s));
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
assert.ok(contrast(stage, oklchLuminance(0.64, 0.22, 25)) >= 4.5, "carmine panel contrast");
assert.ok(contrast(stage, oklchLuminance(0.88, 0.18, 105)) >= 4.5, "citrus panel contrast");
assert.ok(contrast(stage, oklchLuminance(0.82, 0.16, 190)) >= 4.5, "cyan panel contrast");
assert.ok(contrast(stage, oklchLuminance(0.98, 0, 0)) >= 7, "white text contrast");

async function audit(name, viewport, { mobile = false } = {}) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`page: ${error.message}`));
  page.on("response", (response) => {
    if (response.status() >= 400) errors.push(`http ${response.status()}: ${response.url()}`);
  });

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.title(), "Ahsan Khizar — AI Engineer & AI Video Producer");
  assert.equal(await page.locator("main").count(), 1);
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await page.getByRole("navigation", { name: "Main navigation" }).count(), 1);
  assert.ok((await page.locator(".site-header").boundingBox()).height >= 52);
  assert.equal(await page.locator(".site-footer").count(), 1);
  assert.equal(await page.locator("[id]").evaluateAll((nodes) => {
    const ids = nodes.map((node) => node.id).filter(Boolean);
    return ids.length - new Set(ids).size;
  }), 0);

  const geometry = await page.evaluate(() => ({
    viewport: window.innerWidth,
    pageWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    text: document.body.innerText.length,
    headings: [...document.querySelectorAll("h1, h2, h3")].map((heading) => heading.textContent?.trim()),
    unlabeled: [...document.querySelectorAll("a, button, input, textarea, select")].filter(
      (node) => !node.textContent?.trim() && !node.getAttribute("aria-label") && !node.getAttribute("title"),
    ).length,
  }));

  assert.ok(geometry.pageWidth <= geometry.viewport + 1, `${name} has horizontal overflow`);
  assert.ok(geometry.bodyWidth <= geometry.viewport + 1, `${name} body has horizontal overflow`);
  assert.ok(geometry.text > 1_000, `${name} content did not render`);
  assert.equal(geometry.unlabeled, 0, `${name} has unlabeled controls`);
  await page.keyboard.press("Home");
  await page.keyboard.press("Tab");
  assert.equal(await page.locator(":focus").textContent(), "Skip to main content");

  if (mobile) {
    const menu = page.getByRole("button", { name: /open menu/i });
    await menu.click();
    await expectVisible(page.getByRole("navigation", { name: "Mobile navigation" }));
    assert.equal(await menu.getAttribute("aria-expanded"), "true");
    await page.keyboard.press("Escape");
    assert.equal(await menu.getAttribute("aria-expanded"), "false");
  }

  assert.deepEqual(errors, []);

  await page.screenshot({ path: `artifacts/${name}.png`, fullPage: true });
  console.log(JSON.stringify({ name, ...geometry }));
  await page.close();
}

async function auditNoJavaScriptMobile() {
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 1,
    javaScriptEnabled: false,
  });

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await expectVisible(page.getByRole("navigation", { name: "Mobile navigation" }));
  assert.equal(await page.locator(".menu-button").getAttribute("aria-expanded"), "true");
  await page.close();
}

async function auditReducedMotion() {
  for (const path of ["/", "/about"]) {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });

    await page.goto(`http://localhost:3000${path}`, { waitUntil: "networkidle" });
    assert.equal(await page.locator("html").getAttribute("data-motion"), "reduced");
    assert.equal(await page.locator(".pin-spacer").count(), 0);
    const visible = await page.locator("main").evaluate((main) => {
      const styles = getComputedStyle(main.querySelector("h1"));
      return styles.opacity === "1" && styles.transform === "none";
    });
    assert.equal(visible, true, `${path} keeps primary content visible with reduced motion`);
    await page.close();
  }
}

await audit("desktop-1440", { width: 1440, height: 1000 });
await audit("laptop-1024", { width: 1024, height: 768 });
await audit("tablet-768", { width: 768, height: 1024 });
await audit("mobile-390", { width: 390, height: 844 }, { mobile: true });
await audit("mobile-375", { width: 375, height: 812 }, { mobile: true });
await auditNoJavaScriptMobile();
await auditReducedMotion();
await browser.close();
