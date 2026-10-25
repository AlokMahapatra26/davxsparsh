import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>
        <div className="ambient-grid" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
