import { type NextRequest, NextResponse } from "next/server";

const canonicalHostname = "ahsankhizar.me";

export function proxy(request: NextRequest) {
  if (request.nextUrl.hostname !== `www.${canonicalHostname}`) {
    return NextResponse.next();
  }

  const canonicalUrl = request.nextUrl.clone();
  canonicalUrl.hostname = canonicalHostname;

  return NextResponse.redirect(canonicalUrl, 308);
}

export const config = {
  matcher: "/:path*",
};
