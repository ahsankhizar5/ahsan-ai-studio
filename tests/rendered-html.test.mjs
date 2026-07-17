import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

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

test("server-renders the complete portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Ahsan Khizar — AI Engineer &amp; AI Video Producer<\/title>/i);
  assert.match(html, /<h1[^>]*id="hero-title"/i);
  assert.match(html, /I build AI/i);
  assert.match(html, /AI engineering/i);
  assert.match(html, /AI video production/i);
  assert.match(html, /Audio Deepfake Detection System/i);
  assert.match(html, /DocuSync/i);
  assert.match(html, /PIGEON Reproduction/i);
  assert.match(html, /Customer Behavior Profiling/i);
  assert.match(html, /Qadri Group/i);
  assert.match(html, /DevelopersHub Corporation/i);
  assert.match(html, /Prodigy InfoTech/i);
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
  assert.match(html, /id="services"/i);
  assert.match(html, /id="experience"/i);
  assert.match(html, /href="\/about"/i);
  assert.match(html, /data-project-stage/i);
  assert.match(html, /data-motion-page="home"/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("publishes absolute crawl endpoints", async () => {
  const [robotsResponse, sitemapResponse] = await Promise.all([render("/robots.txt"), render("/sitemap.xml")]);
  assert.equal(robotsResponse.status, 200);
  assert.equal(sitemapResponse.status, 200);
  assert.match(await robotsResponse.text(), /Sitemap: http:\/\/localhost\/sitemap\.xml/i);
  assert.match(await sitemapResponse.text(), /<loc>http:\/\/localhost\/<\/loc>/i);
});

test("source preserves accessible and responsive contracts", async () => {
  const [page, css, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<main id="main-content" data-motion-page="home">/);
  assert.match(page, /aria-labelledby="work-title"/);
  assert.match(page, /aria-labelledby="services-title"/);
  assert.match(page, /rel="noreferrer"/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /min-height:\s*2\.75rem/);
  assert.match(css, /\.mobile-menu\s*\{[\s\S]*?gap:\s*0\.5rem/);
  assert.match(css, /overflow-wrap:\s*anywhere/);
  assert.match(css, /@media \(max-width:\s*760px\)/);
  assert.match(layout, /alternates:\s*\{ canonical:\s*"\/" \}/);
  assert.doesNotMatch(css, /background-clip:\s*text|repeating-linear-gradient|border-radius:\s*(3[2-9]|[4-9]\d)px/i);
});

test("defines the factual portfolio data source", async () => {
  const source = await readFile(new URL("../app/data/profile.ts", import.meta.url), "utf8");
  assert.match(source, /Audio Deepfake Detection System/i);
  assert.match(source, /Qadri Group/i);
  assert.match(source, /University of Engineering and Technology, Taxila/i);
  assert.match(source, /Generative AI Application Developer/i);
  assert.match(source, /PEEF Scholar/i);
});
