import type { Metadata } from "next";
import { siteOrigin } from "./data/site";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL(siteOrigin),
    title: "Ahsan Khizar — AI Engineer & AI Video Producer",
    description:
      "Ahsan Khizar transforms complex AI ideas into powerful products people understand and trust—from the system to the story that explains it.",
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
      description:
        "Ahsan Khizar transforms complex AI ideas into powerful products people understand and trust—from the system to the story that explains it.",
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
      description:
        "Ahsan Khizar transforms complex AI ideas into powerful products people understand and trust—from the system to the story that explains it.",
      images: ["/og.png"],
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
