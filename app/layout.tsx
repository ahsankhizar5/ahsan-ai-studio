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
    title: "Ahsan Khizar — AI Engineer & AI Video Producer",
    description:
      "Ahsan Khizar transforms complex AI ideas into powerful products people understand and trust.",
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
      title: "Ahsan Khizar — AI ideas transformed into trusted products",
      description: "From the system behind the product to the content that explains it: one connected build.",
      siteName: "Ahsan Khizar",
      locale: "en_US",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "Ahsan Khizar — AI Engineer and AI Video Producer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Ahsan Khizar — AI ideas transformed into trusted products",
      description: "From the system behind the product to the content that explains it: one connected build.",
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
