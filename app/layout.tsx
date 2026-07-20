import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const isLocalHost = /^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/i.test(host);
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (isLocalHost ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: "Ahsan Khizar — AI Product Engineer",
    description:
      "Ahsan Khizar transforms complex AI ideas into products people understand and trust, from engineering through product communication.",
    alternates: { canonical: "/" },
    applicationName: "Ahsan Khizar",
    authors: [{ name: "Ahsan Khizar" }],
    creator: "Ahsan Khizar",
    formatDetection: { telephone: false },
    keywords: [
      "AI engineer",
      "AI product development",
      "AI agents",
      "workflow automation",
      "AI video production",
      "avatar video",
      "UGC ads",
    ],
    openGraph: {
      type: "website",
      url: "/",
      title: "Ahsan Khizar — AI products people understand and trust",
      description: "One connected build from AI system to clear product story.",
      siteName: "Ahsan Khizar",
      locale: "en_US",
      images: [
        {
          url: "/og.png",
          width: 1729,
          height: 910,
          alt: "Ahsan Khizar — AI Product Engineer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Ahsan Khizar — AI products people understand and trust",
      description: "One connected build from AI system to clear product story.",
      images: ["/og.png"],
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
