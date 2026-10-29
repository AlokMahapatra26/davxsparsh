"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useSpring } from "framer-motion";
import { PerspectiveTunnelCards, StageDimensions } from "@/components/ui/perspective-tunnel-hero";
import { ThumbnailTrailOverlay } from "@/components/ui/thumbnail-trail";
import { ShaderMetal, type ShaderMetalMetal } from "@/components/ui/shader-metal";

export interface GradientHero01Props {
  id?: string;
  badge?: string;
  title?: string;
  titleClassName?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  className?: string;
  enableTunnelCards?: boolean;
  enableMouseTrail?: boolean;
  enableShaderMetal?: boolean;
  metal?: ShaderMetalMetal;
  metalColor?: string;
  metalRibbons?: number;
  metalSpeed?: number;
  metalOpacity?: string;
  metalInteractive?: boolean;
  trackHeight?: string;
}

export function GradientHero01({
  id = "hero",
  badge = "Previewing Componentry Blocks",
  title = "Launch pages that feel finished from the first pass",
  titleClassName = "",
  description = "Simple sections with considered spacing, quiet motion, and production ready code you can paste into real product work.",
  primaryCtaText = "Explore Blocks",
  primaryCtaHref = "#services",
  secondaryCtaText = "View Source",
  secondaryCtaHref = "/contact",
  className = "",
  enableTunnelCards = true,
  enableMouseTrail = true,
  enableShaderMetal = true,
  metal = "chrome",
  metalColor,
  metalRibbons = 3,
  metalSpeed = 0.25,
  metalOpacity = "opacity-35",
  metalInteractive = false,
  trackHeight = "165vh",
}: GradientHero01Props = {}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const [stage, setStage] = useState<StageDimensions>({
    width: 1440,
    height: 900,
    isMobile: false,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setStage({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Native scroll-scrubbed progress: directly bound to track scroll travel
  // This eliminates race conditions between wheel events and window scroll,
  // preventing cards from ever snapping back when scrolling finishes.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.0001,
  });

  return (
    <div
      ref={trackRef}
      id={id}
      data-thumbnail-trail="true"
      data-glow-suppress="true"
      className={`relative w-full ${className}`}
      style={{ height: trackHeight }}
    >
      <section
        ref={sectionRef}
        data-thumbnail-trail="true"
        data-glow-suppress="true"
        className="sticky top-0 w-full h-screen overflow-hidden bg-background font-[system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] text-foreground"
        style={{
          perspective: stage.isMobile ? "900px" : "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Dynamic Gradient Mesh Atmosphere */}
        <div
          className="absolute inset-x-[-18%] bottom-[-34%] h-[78%] rounded-[100%] blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.58) 0%, rgba(59, 130, 246, 0.34) 34%, rgba(99, 102, 241, 0.2) 58%, transparent 78%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[68%] pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(37, 99, 235, 0.42), rgba(14, 165, 233, 0.2) 42%, transparent 78%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 55%, color-mix(in oklab, var(--background) 18%, transparent) 0%, transparent 34%, color-mix(in oklab, var(--background) 90%, transparent) 78%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, var(--background) 0%, color-mix(in oklab, var(--background) 68%, transparent) 38%, color-mix(in oklab, var(--background) 12%, transparent) 100%)",
          }}
        />

        {/* Liquid Metal Ribbons WebGL Shader Background */}
        {enableShaderMetal && (
          <ShaderMetal
            metal={metal}
            color={metalColor}
            ribbons={metalRibbons}
            speed={metalSpeed}
            iridescence={0.3}
            interactive={metalInteractive}
            className={`z-0 ${metalOpacity}`}
          />
        )}

        {/* Interactive Mouse Thumbnail Stamp Trail */}
        {enableMouseTrail && (
          <ThumbnailTrailOverlay
            containerRef={sectionRef}
            className="z-10"
            width={108}
            height={68}
          />
        )}

        {/* 3D Flying Tunnel Cards Plane */}
        {enableTunnelCards && (
          <PerspectiveTunnelCards
            progress={smoothProgress}
            stage={stage}
          />
        )}

        {/* Foreground Hero Content */}
        <div className="relative z-20 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 py-20 text-center pointer-events-auto">
          <div className="rounded-full border border-border bg-background/60 px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-md">
            {badge}
          </div>

          <h1
            className={`mt-8 max-w-5xl text-balance text-5xl md:text-6xl lg:text-7xl font-normal italic leading-[1.04] tracking-[-0.025em] text-[var(--ink-primary)] drop-shadow-sm font-serif ${titleClassName}`}
            style={{ fontFamily: "var(--font-serif, serif)" }}
          >
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground md:text-lg">
            {description}
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href={primaryCtaHref}
              className="inline-flex h-11 w-36 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_1px_0_rgba(255,255,255,0.24)_inset,0_18px_60px_rgba(0,0,0,0.12)] transition hover:opacity-90 cursor-pointer"
            >
              {primaryCtaText}
            </a>
            <a
              href={secondaryCtaHref}
              className="inline-flex h-11 w-36 items-center justify-center rounded-lg border border-border bg-background/50 px-5 text-sm font-semibold text-foreground/80 shadow-[0_1px_0_rgba(255,255,255,0.12)_inset] backdrop-blur transition hover:bg-foreground/5 hover:text-foreground cursor-pointer"
            >
              {secondaryCtaText}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GradientHero01;
