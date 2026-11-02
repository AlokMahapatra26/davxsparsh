"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Sparkles, Layers, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: number | string;
  title: string;
  subtitle?: string;
  category?: string;
  description?: string;
  imageUrl: string;
  href?: string;
  badge?: string;
}

// --- Default Data with verified Unsplash images for our active disciplines ---
export const defaultAccordionItems: AccordionItemData[] = [
  {
    id: 1,
    title: "Web Development",
    subtitle: "Modern Next.js & Distributed Systems",
    category: "Architecture & Systems",
    description:
      "High-throughput Go topologies, Next.js server components, sub-5ms routes, and hermetic CI/CD pipelines.",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80&auto=format&fit=crop",
    href: "/services/web-development",
    badge: "Engineering",
  },
  {
    id: 2,
    title: "App Development",
    subtitle: "Native iOS & Cross-Platform",
    category: "Mobile Platforms",
    description:
      "Native Swift, Kotlin, and cross-platform apps engineered with fluid 120fps gesture navigation and local offline-first sync.",
    imageUrl:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80&auto=format&fit=crop",
    href: "/services/app-development",
    badge: "Mobile",
  },
  {
    id: 3,
    title: "AI Automation",
    subtitle: "Autonomous Agents & LLMs",
    category: "Machine Intelligence",
    description:
      "Autonomous agent pipelines, local high-security RAG embeddings, and bespoke fine-tuned reasoning models.",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80&auto=format&fit=crop",
    href: "/services/ai-automation",
    badge: "Cognitive",
  },
  {
    id: 4,
    title: "UI/UX & Web Design",
    subtitle: "Bespoke Surfaces & Fluid Motion",
    category: "Sensory Interface",
    description:
      "Artisanal digital surfaces, fluid GLSL shaders, editorial typography, and spatial micro-interactions.",
    imageUrl:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&q=80&auto=format&fit=crop",
    href: "/services/ui-ux-design",
    badge: "Design",
  },
  {
    id: 5,
    title: "Brand & Packaging",
    subtitle: "Material Luxury & Tangible Specs",
    category: "Material Identity",
    description:
      "Sensory physical packaging mockups, foil stamp accents, embossed paper stock specs, and comprehensive brand guidelines.",
    imageUrl:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=80&auto=format&fit=crop",
    href: "/services/brand-identity",
    badge: "Branding",
  },
];

export interface AccordionItemProps {
  item: AccordionItemData;
  index: number;
  isActive: boolean;
  onActivate: () => void;
  onItemClick?: (item: AccordionItemData) => void;
}

// --- Accordion Item Component ---
export function AccordionItem({
  item,
  index,
  isActive,
  onActivate,
  onItemClick,
}: AccordionItemProps) {
  const router = useRouter();
  const paddedIndex = String(index + 1).padStart(2, "0");

  const handleCardClick = (e: React.MouseEvent) => {
    onActivate();
    if (item.href) {
      router.push(item.href);
    }
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onActivate();
      if (item.href) {
        router.push(item.href);
      }
      if (onItemClick) {
        onItemClick(item);
      }
    }
  };

  return (
    <div
      role="link"
      tabIndex={0}
      aria-expanded={isActive}
      aria-label={`Open ${item.title}`}
      className={cn(
        "relative h-[450px] sm:h-[490px] lg:h-[530px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer select-none group",
        "transition-all duration-700 cubic-bezier(0.22, 1, 0.36, 1)",
        "border border-black/15 shadow-xl",
        isActive
          ? "w-[290px] xs:w-[320px] sm:w-[410px] md:w-[490px] lg:w-[550px] ring-2 ring-black/25 shadow-2xl"
          : "w-[60px] sm:w-[76px] md:w-[88px] lg:w-[96px] hover:w-[70px] sm:hover:w-[86px] md:hover:w-[98px]"
      )}
      onMouseEnter={onActivate}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
    >
      {/* Background Image with smooth subtle zoom */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out",
          isActive ? "scale-105" : "scale-100 brightness-[0.7] contrast-[1.1]"
        )}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src =
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80&auto=format&fit=crop";
        }}
      />

      {/* Dynamic Overlay Layer */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isActive
            ? "bg-gradient-to-t from-black/95 via-black/70 to-black/20"
            : "bg-black/65 backdrop-blur-[1px] group-hover:bg-black/50"
        )}
      />

      {/* Inactive State: Vertical Text & Index Number (Rotated -90deg bottom-to-top for clean readability) */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-between items-center py-7 pointer-events-none transition-opacity duration-300",
          isActive ? "opacity-0 invisible" : "opacity-100 visible"
        )}
      >
        {/* Index Tag */}
        <span
          className="font-mono text-xs font-bold tracking-wider !text-white drop-shadow-md"
          style={{ color: "#ffffff" }}
        >
          {paddedIndex}
        </span>

        {/* Vertical Rotated Title - readable bottom-to-top */}
        <span
          className="text-sm sm:text-base font-bold whitespace-nowrap tracking-wide -rotate-90 origin-center !text-white drop-shadow-md"
          style={{ color: "#ffffff" }}
        >
          {item.title}
        </span>

        {/* Small Bottom Indicator Dot */}
        <span className="w-1.5 h-1.5 rounded-full bg-[#9eff3e]" />
      </div>

      {/* Active State: Rich Content with High Contrast Text */}
      <div
        className={cn(
          "absolute inset-0 p-5 sm:p-7 md:p-8 flex flex-col justify-between transition-all duration-500",
          isActive
            ? "opacity-100 translate-y-0 delay-100 pointer-events-auto visible"
            : "opacity-0 translate-y-4 pointer-events-none invisible"
        )}
      >
        {/* Top Header inside Card */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="font-mono text-xs font-bold !text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-md"
              style={{ color: "#ffffff" }}
            >
              {paddedIndex}
            </span>
            {item.category && (
              <span
                className="text-[11px] font-mono uppercase tracking-widest !text-[#9eff3e] bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#9eff3e]/40 shadow-md"
                style={{ color: "#9eff3e" }}
              >
                {item.category}
              </span>
            )}
          </div>

          <div
            className="w-10 h-10 rounded-full bg-white/15 hover:bg-[#9eff3e] !text-white hover:!text-black border border-white/25 flex items-center justify-center transition-all duration-200 group-hover:scale-105 shadow-lg"
            style={{ color: "#ffffff" }}
          >
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Bottom Content Section with Frosted Glass Panel for 100% Text Visibility */}
        <div className="space-y-3 bg-black/55 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 shadow-2xl">
          {item.subtitle && (
            <p
              className="text-xs sm:text-sm font-mono !text-[#9eff3e] tracking-tight font-semibold drop-shadow-sm"
              style={{ color: "#9eff3e" }}
            >
              {item.subtitle}
            </p>
          )}
          <h3
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold !text-white tracking-[-0.03em] leading-[1.1] drop-shadow-lg"
            style={{ color: "#ffffff" }}
          >
            {item.title}
          </h3>
          {item.description && (
            <p
              className="text-xs sm:text-sm !text-zinc-100 font-normal leading-relaxed line-clamp-3 max-w-lg drop-shadow-sm"
              style={{ color: "#f4f4f5" }}
            >
              {item.description}
            </p>
          )}

          <div className="pt-1.5 flex items-center justify-between">
            <span
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold !text-white group-hover:!text-[#9eff3e] transition-colors"
              style={{ color: "#ffffff" }}
            >
              <span>Explore Discipline</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
            </span>

            <span className="text-[11px] font-mono text-zinc-400 group-hover:text-white transition-colors">
              Click to open →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface InteractiveImageAccordionProps {
  items?: AccordionItemData[];
  title?: string;
  subtitle?: string;
  badgeText?: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  className?: string;
  layout?: "stacked" | "split";
  defaultActiveIndex?: number;
}

// --- Main Interactive Image Accordion Component ---
export function InteractiveImageAccordion({
  items = defaultAccordionItems,
  title = "Every discipline, brought into focus.",
  subtitle = "Where IT architecture harmonizes with digital craft — an infinite cylindrical stream across our active practices.",
  badgeText = "Disciplines & Craft",
  ctaText = "Get Started",
  ctaHref = "/contact",
  onCtaClick,
  className,
  layout = "stacked",
  defaultActiveIndex = 0,
}: InteractiveImageAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  if (layout === "split") {
    return (
      <div className={cn("w-full py-12 md:py-20", className)}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
            {/* Left Side: Content */}
            <div className="w-full lg:w-5/12 text-center lg:text-left">
              {badgeText && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-black/5 border border-black/10 text-zinc-600 mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-zinc-800" />
                  {badgeText}
                </span>
              )}
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.035em] text-[var(--ink-primary)] leading-[1.08] mb-4">
                {title}
              </h2>
              <p className="text-base sm:text-lg text-[var(--ink-secondary)] max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
                {subtitle}
              </p>
              <div>
                <Link
                  href={ctaHref}
                  onClick={onCtaClick}
                  className="inline-flex items-center gap-3 pl-3 pr-6 py-3 rounded-full bg-[#9eff3e] text-black font-bold text-sm sm:text-base hover:bg-white hover:shadow-xl transition-all duration-200 shadow-md group cursor-pointer"
                >
                  <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-black/10 transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="w-4 h-4 text-black" />
                  </span>
                  <span>{ctaText}</span>
                </Link>
              </div>
            </div>

            {/* Right Side: Accordion */}
            <div className="w-full lg:w-7/12 overflow-x-auto no-scrollbar py-2">
              <div className="flex flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 min-w-max p-2">
                {items.map((item, index) => (
                  <AccordionItem
                    key={item.id}
                    item={item}
                    index={index}
                    isActive={index === activeIndex}
                    onActivate={() => handleItemHover(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default "stacked" layout: Center heading on top, full accordion below
  return (
    <div className={cn("w-full flex flex-col items-center", className)}>
      {/* Section Header */}
      <div className="text-center max-w-4xl px-4 mb-8 sm:mb-12">
        {badgeText && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-black/5 border border-black/10 text-zinc-600 mb-3">
            <Layers className="w-3.5 h-3.5 text-zinc-800" />
            {badgeText}
          </span>
        )}
        <h2 className="text-balance text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] text-[var(--ink-primary)] leading-[1.08] mb-3">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-[var(--ink-secondary)] font-normal tracking-[-0.012em] max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Image Accordion Container with horizontal scroll on small screens */}
      <div className="w-full max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar py-2">
        <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-3.5 md:gap-4 min-w-max mx-auto p-2">
          {items.map((item, index) => (
            <AccordionItem
              key={item.id}
              item={item}
              index={index}
              isActive={index === activeIndex}
              onActivate={() => handleItemHover(index)}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA Button redirecting to Contact page */}
      <div className="mt-10 sm:mt-12 flex justify-center px-4">
        <Link
          href={ctaHref}
          onClick={onCtaClick}
          className="inline-flex items-center gap-3.5 pl-2.5 pr-6 py-2.5 rounded-[22px] bg-[#9eff3e] text-black hover:bg-white hover:shadow-[0_8px_32px_rgba(158,255,62,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer group shadow-md"
        >
          <span className="flex items-center justify-center w-12 h-12 bg-white rounded-[14px] border border-black/10 shadow-xs transition-transform duration-200 group-hover:translate-x-0.5">
            <ArrowRight className="w-5 h-5 text-black" />
          </span>
          <span className="font-bold text-[17px] text-black tracking-tight">
            {ctaText}
          </span>
        </Link>
      </div>
    </div>
  );
}

// Named alias matching prompt
export const LandingAccordionItem = InteractiveImageAccordion;
export default InteractiveImageAccordion;
