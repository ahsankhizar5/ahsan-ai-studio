import assert from "node:assert/strict";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";

const executablePath =
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
const browser = await chromium.launch({ executablePath, headless: true });

const cases = [
  { name: "home-desktop", path: "/", viewport: { width: 1440, height: 1000 } },
  { name: "home-mobile", path: "/", viewport: { width: 390, height: 844 } },
  {
    name: "about-desktop",
    path: "/about",
    viewport: { width: 1440, height: 1000 },
  },
  {
    name: "about-mobile",
    path: "/about",
    viewport: { width: 390, height: 844 },
  },
];

for (const item of cases) {
  const context = await browser.newContext({
    viewport: item.viewport,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(`${baseUrl}${item.path}`, {
    waitUntil: "domcontentloaded",
  });
  await page.waitForFunction(() =>
    document.documentElement.hasAttribute("data-motion"),
  );

  const result = await new AxeBuilder({ page })
    .withTags([
      "wcag2a",
      "wcag2aa",
      "wcag21a",
      "wcag21aa",
      "wcag22aa",
      "best-practice",
    ])
    .analyze();

  const violations = result.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    help: violation.help,
    targets: violation.nodes.map((node) => node.target.join(" ")),
  }));

  assert.deepEqual(
    violations,
    [],
    `${item.name} axe violations:\n${JSON.stringify(violations, null, 2)}`,
  );
  console.log(`${item.name}: ${result.passes.length} axe checks passed`);
  await context.close();
}

await browser.close();
