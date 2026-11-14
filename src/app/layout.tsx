import type { Metadata } from "next";
import "./globals.css";
import { GlowCursor } from "@/components/ui/GlowCursor";
import { SupportChatbot } from "@/components/ui/support-chatbot";

export const metadata: Metadata = {
  title: "DAVSparsh — Engineering Precision × Editorial Craft",
  description:
    "An alliance between DAVLabs (IT & Systems Engineering) and Sparsh Design (Brand & Digital Product Experience). Purpose-built software and thoughtful digital aesthetics.",
  keywords: [
    "DAVLabs",
    "Sparsh Design",
    "IT Solutions",
    "UI/UX Design",
    "Software Engineering",
    "Cloud Architecture",
    "Brand Identity",
    "Product Design",
  ],
  openGraph: {
    title: "DAVSparsh — Collaborative Studio",
    description:
      "High-impact IT solutions and elevated design systems. Engineered for scale, crafted for resonance.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="/fonts/ESKlarheitPlakatFP-Extrabold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Geist-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Geist-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&family=Geist+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="ambient-grid" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        <GlowCursor
          overlay
          color="#fca311"
          secondaryColor="#fca311"
          intensity={1.6}
          trailWidth={4.5}
          linger={1.4}
          glow={1.3}
          clickBurst
          theme="light"
          excludeSelector="footer, .footer-root, [data-thumbnail-trail], [data-glow-suppress]"
        />
        {children}
        <SupportChatbot />
      </body>
    </html>
  );
}
