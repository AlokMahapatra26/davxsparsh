"use client";

import React, { useRef, useState, useEffect } from "react";
import { FlexCarousel, DEFAULT_SERVICES_ITEMS } from "@/components/ui/FlexCarousel";
import { ScrollStack, ScrollStackItem } from "@/components/ui/ScrollStack";
import { CardNav } from "@/components/ui/CardNav";
import { GlowCursor } from "@/components/ui/GlowCursor";
import { InkBackground } from "@/components/ui/InkBackground";
import { Footer } from "@/components/ui/Footer";

export default function HomePage() {
  const servicesTrackRef = useRef<HTMLDivElement>(null);
  const [servicesProgress, setServicesProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = servicesTrackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const current = -rect.top;
      const p = Math.min(Math.max(current / total, 0), 1);
      setServicesProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const BrandLogo = (
    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium tracking-tight">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-current">
        <circle cx="8" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span className="font-semibold text-[var(--ink-primary)]">DAVLabs</span>
      <span className="opacity-40">&times;</span>
      <span className="opacity-75 text-[var(--ink-secondary)]">Sparsh</span>
    </div>
  );

  return (
    <>
      {/* Interactive Fluid GlowCursor Trail */}
      <GlowCursor
        overlay
        color="#3b82f6"
        secondaryColor="#8c4a2f"
        intensity={1.2}
        trailWidth={3.5}
        linger={1.2}
        glow={1.1}
        clickBurst
        theme="dark"
      />

      {/* Top Floating CardNav */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none">
        <div className="pointer-events-auto">
          <CardNav
            logo={BrandLogo}
            logoAlt="DAVLabs and Sparsh Design"
            logoHref="#"
            theme="light"
            surface="glass"
            cardEffect="rise"
            maxWidth={780}
            cta={{ label: "Contact", href: "mailto:contact@davlabs.in" }}
            items={[
              {
                label: "Services",
                description: "Direct email inquiry for services.",
                links: [
                  { label: "Web Development", href: "mailto:contact@davlabs.in?subject=Project%20Inquiry%20%E2%80%94%20Web%20Development%20(DAVLabs)" },
                  { label: "App Development", href: "mailto:contact@davlabs.in?subject=Project%20Inquiry%20%E2%80%94%20App%20Development%20(DAVLabs)" },
                  { label: "AI Automation", href: "mailto:contact@davlabs.in?subject=Project%20Inquiry%20%E2%80%94%20AI%20Automation%20(DAVLabs)" },
                  { label: "UI/UX & Product Design", href: "mailto:contact@sparshdesign.com?subject=Project%20Inquiry%20%E2%80%94%20UI%2FUX%20%26%20Product%20Design%20(Sparsh%20Design)" },
                  { label: "Brand Identity", href: "mailto:contact@sparshdesign.com?subject=Project%20Inquiry%20%E2%80%94%20Brand%20Systems%20%26%20Identity%20(Sparsh%20Design)" }
                ]
              },
              {
                label: "Approach",
                description: "First principles systems engineering.",
                links: [
                  { label: "Systems Foundation", href: "#approach" },
                  { label: "Engineering Precision", href: "#approach" },
                  { label: "Iterative Delivery", href: "#approach" }
                ]
              },
              {
                label: "Dialogue",
                description: "Direct inquiry for collaborations.",
                links: [
                  { label: "DAVLabs (Engineering)", href: "mailto:contact@davlabs.in" },
                  { label: "Sparsh Design (Craft)", href: "mailto:contact@sparshdesign.com" }
                ]
              }
            ]}
          />
        </div>
      </header>

      <main>
        {/* Ink Dynamics Hero Section - Full Viewport Height */}
        <section id="hero" className="relative w-full h-screen min-h-[100dvh] overflow-hidden">
          <InkBackground
            text="DAVLabs & Sparsh Design"
            accent="#8c4a2f"
            className="w-full h-full min-h-[100dvh] bg-white text-zinc-900 dark:bg-[#070709] dark:text-zinc-100 flex flex-col justify-center"
          >
            <div className="flex max-w-lg flex-col items-center gap-3 text-center pointer-events-auto">
              <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">
                Stir the surface. Resilient systems and tactile interfaces begin from first principles.
              </p>
            </div>
          </InkBackground>

          {/* Minimal scroll indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto z-10 opacity-50 hover:opacity-100 transition-opacity duration-300">
            <a
              href="#services"
              className="flex flex-col items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
              aria-label="Scroll down to services"
            >
              <span className="font-mono text-[9px] tracking-widest uppercase opacity-75">Scroll</span>
              <span className="text-xs animate-bounce">↓</span>
            </a>
          </div>
        </section>

        {/* Services Showcase: Slides horizontally on vertical scroll */}
        <div id="services" ref={servicesTrackRef} className="services-scroll-track">
          <section className="services-sticky-stage">
            <div className="services-header">
              <span className="text-xs uppercase font-mono tracking-widest text-zinc-500 block mb-2">
                Disciplines &amp; Capabilities
              </span>
              <h2 className="services-title">Services</h2>
              <p className="text-xs font-mono text-zinc-500 tracking-wider mt-2 uppercase">
                Scroll to slide &bull; Click card to email direct
              </p>
            </div>

            <div className="services-carousel-wrapper">
              <FlexCarousel
                items={DEFAULT_SERVICES_ITEMS}
                scrollProgress={servicesProgress}
                onSelect={(_idx, item) => {
                  if (item.email) {
                    const subject = encodeURIComponent(
                      `Project Inquiry — ${item.title} (${item.subtitle || item.agency || ''})`
                    );
                    window.location.href = `mailto:${item.email}?subject=${subject}`;
                  }
                }}
                preset="liquid"
                intro="rise"
                cardHeight={0.52}
                gap={16}
                radius={12}
                squeeze={0.18}
                focusOnClick={false}
                captions
                captureWheel={false}
              />
            </div>

            {/* Subtle Progress Bar */}
            <div className="services-progress-bar-wrap" aria-hidden="true">
              <div
                className="services-progress-bar"
                style={{ width: `${Math.round(servicesProgress * 100)}%` }}
              />
            </div>
          </section>
        </div>

        {/* Approach / Architecture Section using ScrollStack */}
        <section id="approach" className="approach-section">
          <div className="approach-header">
            <h2 className="services-title">Approach</h2>
          </div>

          <ScrollStack
            useWindowScroll={true}
            stackPosition="15%"
            itemDistance={140}
            itemStackDistance={28}
            itemScale={0.035}
            dimAmount={0.12}
            smoothScroll={false}
            holdDistance={220}
          >
            {/* Card 01: Architectural Foundation */}
            <ScrollStackItem itemClassName="scroll-stack-card--arch">
              <div className="scroll-stack-card__flare" />
              <div className="scroll-stack-card__pattern" aria-hidden="true">
                <svg className="w-full h-full" viewBox="0 0 800 450" fill="none" preserveAspectRatio="none">
                  <defs>
                    <pattern id="arch-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.3" />
                      <circle cx="0" cy="0" r="1.5" fill="currentColor" fillOpacity="0.6" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#arch-grid)" />
                  <circle cx="680" cy="90" r="160" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 6" />
                  <circle cx="680" cy="90" r="240" stroke="currentColor" strokeWidth="1" strokeOpacity="0.12" />
                  <path d="M 450 0 L 800 350" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3 4" />
                </svg>
              </div>

              <div className="scroll-stack-card__content">
                <div className="scroll-stack-card__top">
                  <span className="scroll-stack-card__num">01</span>
                  <span className="scroll-stack-card__author">
                    DAVLabs &times; Sparsh Design
                  </span>
                </div>
                <div className="scroll-stack-card__body">
                  <h3 className="scroll-stack-card__title">Architectural Foundation</h3>
                  <p className="scroll-stack-card__desc">
                    Building systems from first principles — pairing resilient cloud infrastructure with purposeful, tactile interface design.
                  </p>
                </div>
              </div>
            </ScrollStackItem>

            {/* Card 02: Engineering Precision */}
            <ScrollStackItem itemClassName="scroll-stack-card--precision">
              <div className="scroll-stack-card__flare" />
              <div className="scroll-stack-card__pattern" aria-hidden="true">
                <svg className="w-full h-full" viewBox="0 0 800 450" fill="none" preserveAspectRatio="none">
                  <defs>
                    <pattern id="data-pipeline" width="60" height="60" patternUnits="userSpaceOnUse">
                      <path d="M 0 30 L 60 30 M 30 0 L 30 60" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.25" />
                      <rect x="28" y="28" width="4" height="4" fill="currentColor" fillOpacity="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#data-pipeline)" />
                  <path d="M 180 450 L 420 210 L 720 210 L 800 130" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
                  <circle cx="420" cy="210" r="5" fill="currentColor" fillOpacity="0.6" />
                  <circle cx="720" cy="210" r="4" fill="currentColor" fillOpacity="0.5" />
                  <path d="M 320 450 L 520 250 L 800 250" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 4" fill="none" />
                </svg>
              </div>

              <div className="scroll-stack-card__content">
                <div className="scroll-stack-card__top">
                  <span className="scroll-stack-card__num">02</span>
                  <span className="scroll-stack-card__author">
                    DAVLabs
                  </span>
                </div>
                <div className="scroll-stack-card__body">
                  <h3 className="scroll-stack-card__title">Engineering Precision</h3>
                  <p className="scroll-stack-card__desc">
                    Scalable backend topologies, automated CI/CD pipelines, high-throughput distributed messaging, and zero-compromise security.
                  </p>
                </div>
              </div>
            </ScrollStackItem>

            {/* Card 03: Tactile Product Craft */}
            <ScrollStackItem itemClassName="scroll-stack-card--craft">
              <div className="scroll-stack-card__flare" />
              <div className="scroll-stack-card__pattern" aria-hidden="true">
                <svg className="w-full h-full" viewBox="0 0 800 450" fill="none" preserveAspectRatio="none">
                  <g stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" fill="none">
                    <ellipse cx="660" cy="190" rx="120" ry="80" />
                    <ellipse cx="660" cy="190" rx="190" ry="130" strokeDasharray="5 5" />
                    <ellipse cx="660" cy="190" rx="270" ry="190" strokeOpacity="0.18" />
                    <ellipse cx="660" cy="190" rx="360" ry="260" strokeOpacity="0.12" />
                    <path d="M 0 340 Q 250 270 500 350 T 800 310" strokeWidth="1.2" strokeOpacity="0.22" />
                    <path d="M 0 375 Q 260 305 520 385 T 800 345" strokeWidth="1" strokeOpacity="0.18" />
                  </g>
                </svg>
              </div>

              <div className="scroll-stack-card__content">
                <div className="scroll-stack-card__top">
                  <span className="scroll-stack-card__num">03</span>
                  <span className="scroll-stack-card__author">
                    Sparsh Design
                  </span>
                </div>
                <div className="scroll-stack-card__body">
                  <h3 className="scroll-stack-card__title">Tactile Product Craft</h3>
                  <p className="scroll-stack-card__desc">
                    Multi-brand design systems, spatial micro-interactions, editorial typography, and sensory digital surfaces that feel tangible.
                  </p>
                </div>
              </div>
            </ScrollStackItem>

            {/* Card 04: Iterative Delivery */}
            <ScrollStackItem itemClassName="scroll-stack-card--synthesis">
              <div className="scroll-stack-card__flare" />
              <div className="scroll-stack-card__pattern" aria-hidden="true">
                <svg className="w-full h-full" viewBox="0 0 800 450" fill="none" preserveAspectRatio="none">
                  <defs>
                    <pattern id="iso-hex" width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M 25 0 L 50 15 L 50 45 L 25 60 L 0 45 L 0 15 Z" fill="none" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.18" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#iso-hex)" />
                  <g stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.25" fill="none">
                    <circle cx="640" cy="220" r="90" />
                    <circle cx="720" cy="220" r="90" strokeDasharray="4 4" />
                    <path d="M 380 450 C 490 290 640 340 800 170" strokeWidth="1.5" strokeOpacity="0.22" />
                  </g>
                </svg>
              </div>

              <div className="scroll-stack-card__content">
                <div className="scroll-stack-card__top">
                  <span className="scroll-stack-card__num">04</span>
                  <span className="scroll-stack-card__author">
                    The Synthesis
                  </span>
                </div>
                <div className="scroll-stack-card__body">
                  <h3 className="scroll-stack-card__title">Iterative Delivery</h3>
                  <p className="scroll-stack-card__desc">
                    Lean agile execution, transparent pair-programming, fast prototyping, and continuous production-grade deployment.
                  </p>
                </div>
              </div>
            </ScrollStackItem>
          </ScrollStack>
        </section>
      </main>

      {/* Sleek Tasteful Footer */}
      <Footer />
    </>
  );
}
