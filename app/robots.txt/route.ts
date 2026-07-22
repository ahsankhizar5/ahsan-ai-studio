import { siteOrigin } from "../data/site";

export const dynamic = "force-static";

export function GET() {
  return new Response(`User-Agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
