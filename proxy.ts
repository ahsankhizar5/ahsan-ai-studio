import { type NextRequest, NextResponse } from "next/server";

const canonicalHostname = "ahsankhizar.me";

export function proxy(request: NextRequest) {
  const requestHostname =
    request.headers.get("host")?.split(":", 1)[0]?.toLowerCase() ?? request.nextUrl.hostname;

  if (requestHostname !== `www.${canonicalHostname}`) {
    return NextResponse.next();
  }

  const canonicalUrl = request.nextUrl.clone();
  canonicalUrl.hostname = canonicalHostname;

  return NextResponse.redirect(canonicalUrl, 308);
}

export const config = {
  matcher: "/:path*",
};
