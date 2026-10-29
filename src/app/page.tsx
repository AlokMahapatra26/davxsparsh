"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";
import { ScrollStack, ScrollStackItem } from "@/components/ui/ScrollStack";
import { CardNav } from "@/components/ui/CardNav";
import { GlowCursor } from "@/components/ui/GlowCursor";
import GradientHero01 from "@/components/ui/gradient-hero-01";
import GlassFolder, { type FolderFile } from "@/components/ui/glass-folder-cards";
import { CountingStatsSection } from "@/components/ui/counting-stats-section";
import { ClipPathLinks } from "@/components/ui/clip-path-links";
import { Footer } from "@/components/ui/Footer";
import GsapFlipCard, { type GsapFlipCardItem } from "@/components/ui/gsap-card-flip";
import DossierCardFace from "@/components/ui/dossier-card-face";
import { AnimatedTestimonials, testimonials } from "@/components/ui/testimonial";


const getFileDescription = (name: string, meta?: string) => {
  if (name.includes("Brand")) {
    return "Official Sparsh Design brand identity guidelines, color palettes, editorial typography rules, and tactile print specifications.";
  }
  if (name.includes("Hierarchy") || name.includes("Component")) {
    return "Atomic design token architecture, responsive component hierarchy, and Figma 48 master design library assets.";
  }
  if (name.includes("Tokens") || name.includes("Typography")) {
    return "Editorial serif and sans-serif pairings, fluid scale calculations, and Storybook component documentation.";
  }
  if (name.includes("Zero-Trust")) {
    return "Zero-trust Kubernetes multi-cluster mesh, automated IAM boundary scopes, and Terraform infrastructure as code.";
  }
  if (name.includes("Telemetry")) {
    return "High-cardinality distributed tracing, Prometheus real-time metrics board, and Grafana anomaly detection alerts.";
  }
  if (name.includes("Microservices")) {
    return "High-throughput Go & gRPC microservices architecture, sub-5ms routes, and concurrent event streaming workers.";
  }
  if (name.includes("CI/CD")) {
    return "Automated GitHub Actions CI/CD pipeline with hermetic container builds, automated vulnerability scans, and instant rollback.";
  }
  if (name.includes("WebGL")) {
    return "Custom GLSL liquid noise shaders, interactive chromatic dispersion, and 60fps real-time physics dynamics.";
  }
  if (name.includes("Packaging")) {
    return "Sensory tactile packaging mockups, embossed paper stock specifications, and luxury print foil stamp accents.";
  }
  if (name.includes("Audit")) {
    return "Comprehensive performance and engineering audit: 100/100 Lighthouse score, zero layout shift, and instant hydration.";
  }
  return `Archived project dossier document: ${name} (${meta || "Verified Record"}).`;
};

const getFileCaption = (name: string, meta?: string) => {
  if (name.includes("Brand")) {
    return "Sensory brand identity manual, color spaces, and tactile print specs.";
  }
  if (name.includes("Hierarchy") || name.includes("Component")) {
    return "Atomic design tokens, 48 Figma components, and fluid responsive states.";
  }
  if (name.includes("Tokens") || name.includes("Typography")) {
    return "Editorial serif pairings, fluid scale calculations, and Storybook documentation.";
  }
  if (name.includes("Zero-Trust")) {
    return "K8s multi-cluster mesh, IAM zero-trust boundaries, and Terraform states.";
  }
  if (name.includes("Telemetry")) {
    return "Distributed tracing, Prometheus metrics, and automated anomaly detection.";
  }
  if (name.includes("Microservices")) {
    return "High-throughput Go & gRPC microservices with sub-5ms latency.";
  }
  if (name.includes("CI/CD")) {
    return "Hermetic container builds, automated vulnerability scans, and instant rollback.";
  }
  if (name.includes("WebGL")) {
    return "Custom GLSL noise shaders, chromatic dispersion, and interactive physics.";
  }
  if (name.includes("Packaging")) {
    return "High-touch tangible physical packaging with tactile varnish and foil accents.";
  }
  if (name.includes("Audit")) {
    return "Performance benchmark audit: 100/100 Lighthouse score and zero layout shift.";
  }
  return `Document specification for ${name} verified by DAVLabs × Sparsh Studio.`;
};

const SERVICES_WHEEL_ITEMS: WorksWheelItem[] = [
  {
    title: "Web Development",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80&auto=format&fit=crop",
    href: "/services/web-development",
  },
  {
    title: "App Development",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80&auto=format&fit=crop",
    href: "/services/app-development",
  },
  {
    title: "AI Automation",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80&auto=format&fit=crop",
    href: "/services/ai-automation",
  },
  {
    title: "UI/UX & Web Design",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&q=80&auto=format&fit=crop",
    href: "/services/ui-ux-design",
  },
  {
    title: "Creative Logo Design",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80&auto=format&fit=crop",
    href: "/services/creative-logo-design",
  },
  {
    title: "Graphics Design & Branding",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80&auto=format&fit=crop",
    href: "/services/graphics-design",
  },
  {
    title: "Social Media Marketing",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80&auto=format&fit=crop",
    href: "/services/social-media-marketing",
  },
  {
    title: "Brand Identity & Packaging",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=80&auto=format&fit=crop",
    href: "/services/brand-identity",
  },
];

export default function HomePage() {
  const router = useRouter();

  // Scroll restoration: when returning from another page, return to that exact section rather than the hero
  useEffect(() => {
    const handleRestore = () => {
      const returnSection =
        sessionStorage.getItem("return_to_section") ||
        (typeof window !== "undefined" ? window.location.hash.replace("#", "") : "");

      if (returnSection && returnSection !== "hero") {
        sessionStorage.removeItem("return_to_section");
        const target = document.getElementById(returnSection);
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 150);
          return;
        }
      }

      const savedScroll = sessionStorage.getItem("home_scroll_pos");
      if (savedScroll && parseInt(savedScroll, 10) > 100) {
        setTimeout(() => {
          window.scrollTo({ top: parseInt(savedScroll, 10), behavior: "auto" });
        }, 120);
      }
    };

    handleRestore();

    // Continuously track current visible section
    const handleScroll = () => {
      sessionStorage.setItem("home_scroll_pos", window.scrollY.toString());
      const sections = ["services", "testimonials", "archives", "approach", "hero"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.65 && rect.bottom >= window.innerHeight * 0.15) {
            sessionStorage.setItem("home_current_section", id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Maintain live file arrays for folders so dynamically added files (+ button) are supported!
  const [designFiles, setDesignFiles] = useState<FolderFile[]>([
    { name: "Tokens & Typography", meta: "Storybook · v2.4", art: "aurora" },
    { name: "Component Hierarchy", meta: "Figma · 48 assets", art: "dusk" },
    { name: "Brand Guidelines.pdf", meta: "PDF · 8.2 MB" },
  ]);

  const [cloudFiles, setCloudFiles] = useState<FolderFile[]>([
    { name: "Zero-Trust Architecture", meta: "K8s · Terraform", art: "ember" },
    { name: "Telemetry & Logs", meta: "Prometheus · Grafana" },
    { name: "Microservices Blueprint", meta: "Go · gRPC", art: "glacier" },
    { name: "CI/CD Pipeline.yml", meta: "GitHub Actions" },
  ]);

  const [artifactFiles, setArtifactFiles] = useState<FolderFile[]>([
    { name: "Fluid WebGL Dynamics", meta: "Shaders · GLSL", art: "verdant" },
    { name: "Sensory Packaging", meta: "Print · 3D Mockup", art: "dusk" },
    { name: "Audit Report v4", meta: "PDF · 1.4 MB" },
  ]);

  const [activeFlipGallery, setActiveFlipGallery] = useState<{
    title: string;
    meta: string;
    description: string;
    items: GsapFlipCardItem[];
    initialSelectedIndex?: number;
  } | null>(null);

  const handleOpenFileGallery = (
    folderKey: string,
    clickedFile: FolderFile,
    currentFiles: FolderFile[]
  ) => {
    const folderMetaMap: Record<string, string> = {
      "Design Systems": "Sparsh Design",
      "Cloud Topologies": "DAVLabs IT",
      "Tactile Artifacts": "Case Studies",
    };
    const folderMeta = folderMetaMap[folderKey] || "DAVLabs × Sparsh";

    const items: GsapFlipCardItem[] = currentFiles.map((f, i) => ({
      id: f.name + "-" + i,
      title: f.name,
      meta: `${folderMeta} · ${f.meta || "Dossier Record"}`,
      description: getFileDescription(f.name, f.meta),
      caption: getFileCaption(f.name, f.meta),
      art: typeof f.art === "string" ? f.art : undefined,
      image: f.image,
      isDocument: !f.art && !f.image,
      renderContent: (isHero, item) => (
        <DossierCardFace item={item} isHero={isHero} />
      ),
    }));

    const targetIdx = currentFiles.findIndex((f) => f.name === clickedFile.name);

    setActiveFlipGallery({
      title: clickedFile.name,
      meta: `${folderMeta} · ${clickedFile.meta || "Dossier Record"}`,
      description: getFileDescription(clickedFile.name, clickedFile.meta),
      items,
      initialSelectedIndex: targetIdx >= 0 ? targetIdx : 0,
    });
  };



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
        excludeSelector="#hero, footer, .footer-root, [data-thumbnail-trail], [data-glow-suppress]"
      />

      {/* Top Floating CardNav (Centered 50% Width) */}
      <header className="fixed top-3 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none flex justify-center">
        <div className="w-[94%] sm:w-[80%] md:w-[65%] lg:w-[50%] mx-auto pointer-events-auto">
          <CardNav
            logo={BrandLogo}
            logoAlt="DAVLabs and Sparsh Design"
            logoHref="#"
            theme="light"
            surface="solid"
            cardEffect="rise"
            maxWidth="100%"
            cta={{ label: "Contact", href: "/contact" }}
            items={[
              {
                label: "Services",
                description: "Engineering & sensory digital design.",
                links: [
                  { label: "Web Development", href: "/services/web-development" },
                  { label: "App Development", href: "/services/app-development" },
                  { label: "AI Automation", href: "/services/ai-automation" },
                  { label: "UI/UX & Web Design", href: "/services/ui-ux-design" },
                  { label: "Creative Logo Design", href: "/services/creative-logo-design" },
                  { label: "Graphics Design & Branding", href: "/services/graphics-design" },
                  { label: "Social Media Marketing", href: "/services/social-media-marketing" },
                  { label: "Brand Identity & Packaging", href: "/services/brand-identity" }
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
                  { label: "Contact Us", href: "/contact" },
                  { label: "DAVLabs (Engineering)", href: "mailto:contact@davlabs.in" },
                  { label: "Sparsh Design (Craft)", href: "mailto:contact@sparshdesign.com" }
                ]
              }
            ]}
          />
        </div>
      </header>

      <main>
        {/* Gradient Hero Section */}
        <GradientHero01
          id="hero"
          badge="Previewing Componentry Blocks"
          title="Launch pages that feel finished from the first pass"
          description="Simple sections with considered spacing, quiet motion, and production ready code you can paste into real product work."
          primaryCtaText="Explore Blocks"
          primaryCtaHref="#services"
          secondaryCtaText="View Source"
          secondaryCtaHref="/contact"
        />

        {/* Scale & Impact Metrics with CountingNumber */}
        <CountingStatsSection />

        {/* Services 3D Interactive WorksWheel Section (Sticky Scroll Pinned Timeline) */}
        <WorksWheel
          id="services"
          items={SERVICES_WHEEL_ITEMS}
          label="Services '26"
          action="Explore"
          scrollPerItem={80}
          className="border-b border-[var(--border-delicate)]"
        />

        {/* Client Testimonials Section */}
        <section id="testimonials" className="relative w-full py-20 sm:py-28 overflow-hidden bg-[var(--bg-primary)] border-b border-[var(--border-delicate)]">
          <div className="relative max-w-5xl mx-auto px-6 text-center mb-6 sm:mb-10">
            <span className="text-xs uppercase font-mono tracking-widest text-zinc-500 block mb-2">
              Client Endorsements &amp; Trust
            </span>
            <h2 className="services-title mb-4">What Our Partners Say</h2>
            <p className="text-sm sm:text-base text-[var(--ink-secondary)] max-w-xl mx-auto leading-relaxed">
              Engineering excellence and artisanal digital craft validated by industry leaders, founders, and creative directors.
            </p>
          </div>

          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
        </section>

        {/* Interactive Tactile Glass Folder Archives Section */}
        <section id="archives" className="relative w-full py-24 sm:py-32 overflow-hidden bg-[var(--bg-secondary)] border-y border-[var(--border-delicate)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 text-foreground opacity-[0.08]"
            style={{
              backgroundImage: "radial-gradient(currentColor 1.1px, transparent 1.4px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative max-w-5xl mx-auto px-6 text-center mb-16 sm:mb-20">
            <span className="text-xs uppercase font-mono tracking-widest text-zinc-500 block mb-2">
              Interactive Archives &amp; Deliverables
            </span>
            <h2 className="services-title mb-4">Project Dossiers</h2>
            <p className="text-sm sm:text-base text-[var(--ink-secondary)] max-w-xl mx-auto leading-relaxed">
              Tactile digital dossiers engineered with real liquid noise fields. Hover to peek inside, click to fan files, or tap + to append records.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto px-4 flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-end justify-items-center gap-x-12 gap-y-16">
              <GlassFolder
                label="Design Systems"
                meta="Sparsh Design"
                art="aurora"
                seed={3}
                appearDelay={0}
                files={designFiles}
                onFilesChange={setDesignFiles}
                onFileSelect={(file) => handleOpenFileGallery("Design Systems", file, designFiles)}
              />
              <GlassFolder
                label="Cloud Topologies"
                meta="DAVLabs IT"
                art="none"
                action="more"
                labelPlacement="top-left"
                appearDelay={140}
                files={cloudFiles}
                onFilesChange={setCloudFiles}
                onFileSelect={(file) => handleOpenFileGallery("Cloud Topologies", file, cloudFiles)}
                menu={[
                  { label: "Inspect Topology", onSelect: () => handleOpenFileGallery("Cloud Topologies", cloudFiles[0], cloudFiles) },
                  { label: "Export Architecture" },
                  { label: "Purge Stale Pods", danger: true },
                ]}
              />
              <GlassFolder
                label="Tactile Artifacts"
                meta="Case Studies"
                tone="dark"
                art="ember"
                seed={11}
                action="none"
                labelPlacement="top-right"
                appearDelay={280}
                files={artifactFiles}
                onFilesChange={setArtifactFiles}
                onFileSelect={(file) => handleOpenFileGallery("Tactile Artifacts", file, artifactFiles)}
              />
            </div>

            <p className="relative mt-16 font-mono text-[11px] tracking-[0.2em] text-[var(--ink-muted)] uppercase">
              Click any card to open interactive Flip dossier &bull; + to add files
            </p>
          </div>
        </section>

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

            {/* Card 05: Interactive Ecosystem & Connect */}
            <ScrollStackItem itemClassName="scroll-stack-card--blank">
              <div className="scroll-stack-card__flare" />
              <div className="scroll-stack-card__content">
                <div className="scroll-stack-card__top">
                  <span className="scroll-stack-card__num">05</span>
                  <span className="scroll-stack-card__author">
                    Network &times; Ecosystems
                  </span>
                </div>
                <div className="scroll-stack-card__body mb-5 sm:mb-6">
                  <h3 className="scroll-stack-card__title">Connected Channels</h3>
                  <p className="scroll-stack-card__desc">
                    Directional interactive touchpoints across engineering codebases, creative networks, and collaborative spaces.
                  </p>
                </div>
                <div className="w-full mt-2">
                  <ClipPathLinks />
                </div>
              </div>
            </ScrollStackItem>
          </ScrollStack>
        </section>
      </main>

      {/* Fullscreen GSAP Flip Card Dossier Viewer */}
      {activeFlipGallery && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col justify-center items-center overflow-hidden animate-in fade-in duration-300"
        >
          <GsapFlipCard
            items={activeFlipGallery.items}
            title={activeFlipGallery.title}
            meta={activeFlipGallery.meta}
            description={activeFlipGallery.description}
            backgroundColor="transparent"
            textColor="#ffffff"
            mutedColor="#a1a1aa"
            defaultOpen={true}
            initialSelectedIndex={activeFlipGallery.initialSelectedIndex}
            onClose={() => setActiveFlipGallery(null)}
            className="w-full h-full"
          />
        </div>
      )}

      {/* Sleek Tasteful Footer */}
      <Footer />
    </>
  );
}
