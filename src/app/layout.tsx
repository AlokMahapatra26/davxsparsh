import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DAVLabs × Sparsh Design — Engineering Precision × Editorial Craft",
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
    title: "DAVLabs × Sparsh Design — Collaborative Studio",
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
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <div className="ambient-grid" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
