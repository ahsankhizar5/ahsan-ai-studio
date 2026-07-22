import { siteOrigin } from "../data/site";

export const dynamic = "force-static";

export function GET() {
  const pages = ["/", "/about", "/contact"];
  const urls = pages
    .map(
      (path) =>
        `  <url><loc>${siteOrigin}${path}</loc><changefreq>monthly</changefreq><priority>${path === "/" ? "1.0" : "0.8"}</priority></url>`,
    )
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(body, {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
}
