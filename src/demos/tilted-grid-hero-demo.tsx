"use client";

import React from "react";
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";
import {
  Cloud,
  Palette,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  Workflow,
} from "lucide-react";

// Curated high-resolution Unsplash images representing each core service
const SERVICE_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    alt: "Cloud & DevOps Architecture — DAVLabs",
  },
  {
    src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    alt: "Artisanal UI/UX & Interaction Design — Sparsh Design",
  },
  {
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    alt: "Custom Fullstack Web & Mobile Engineering — DAVLabs",
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    alt: "Brand Identity Systems & Visual Grammar — Sparsh Design",
  },
  {
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    alt: "Enterprise AI, RAG & Data Automation — DAVLabs",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    alt: "Scalable Design Tokens & Storybook DesignOps — Sparsh Design",
  },
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    alt: "API Infrastructure & Zero-Downtime Networks — DAVLabs",
  },
  {
    src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
    alt: "Tactile Digital Ventures & Editorial Products — Collective Studio",
  },
];

export default function ServicesTiltedGridDemo() {
  return (
    <div className="relative w-full">
      <TiltedGridHero
        images={SERVICE_IMAGES}
        curve={75}
        speed={4.5}
        fade={14}
        className="h-[580px] w-full rounded-2xl border border-[var(--border-medium)] bg-[var(--bg-card)] shadow-[var(--shadow-float)] overflow-hidden"
      >
        <div className="relative z-10 flex h-full flex-col items-center justify-between py-10 px-4 text-center pointer-events-none">
          {/* Header pill with Lucide Icon */}
          <div className="flex flex-wrap items-center justify-center gap-2 pointer-events-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-[var(--bg-card)] border border-[var(--border-medium)] text-[var(--ink-primary)] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Continuous 3D Services Showcase</span>
            </span>
          </div>

          {/* Center Editorial Title */}
          <div className="max-w-2xl px-6">
            <h2 className="text-balance text-3xl font-medium tracking-tight text-[var(--ink-primary)] sm:text-5xl font-serif italic mb-3">
              Where IT Architecture Harmonizes With Digital Craft
            </h2>
            <p className="text-sm sm:text-base text-[var(--ink-secondary)] max-w-lg mx-auto">
              Each tile captures a live discipline &mdash; from cloud infrastructure and RAG systems to high-fidelity typography and design tokens.
            </p>
          </div>

          {/* Quick Service Badges with Lucide Icons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl pointer-events-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-[rgba(255,255,255,0.92)] backdrop-blur-md border border-[var(--border-delicate)] text-[var(--ink-primary)] shadow-sm">
              <Cloud className="w-3.5 h-3.5 text-[#1e3a5f]" />
              <span>Cloud &amp; DevOps</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-[rgba(255,255,255,0.92)] backdrop-blur-md border border-[var(--border-delicate)] text-[var(--ink-primary)] shadow-sm">
              <Palette className="w-3.5 h-3.5 text-[#8c4a2f]" />
              <span>Bespoke UI/UX</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-[rgba(255,255,255,0.92)] backdrop-blur-md border border-[var(--border-delicate)] text-[var(--ink-primary)] shadow-sm">
              <Code2 className="w-3.5 h-3.5 text-[#1e3a5f]" />
              <span>Next.js Fullstack</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-[rgba(255,255,255,0.92)] backdrop-blur-md border border-[var(--border-delicate)] text-[var(--ink-primary)] shadow-sm">
              <Layers className="w-3.5 h-3.5 text-[#8c4a2f]" />
              <span>Design Tokens</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-[rgba(255,255,255,0.92)] backdrop-blur-md border border-[var(--border-delicate)] text-[var(--ink-primary)] shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-[#1e3a5f]" />
              <span>Enterprise AI &amp; RAG</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-[rgba(255,255,255,0.92)] backdrop-blur-md border border-[var(--border-delicate)] text-[var(--ink-primary)] shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
              <span>Zero-Downtime APIs</span>
            </div>
          </div>
        </div>
      </TiltedGridHero>
    </div>
  );
}
