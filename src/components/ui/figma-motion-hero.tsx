"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "@/styles/figma-motion.css";

const PREVIEW_CARDS = [
  { id: "01", src: "/figmaformotion/a2f05abe217e9823-480.webp", alt: "Why so curious 3D Mascot" },
  { id: "02", src: "/figmaformotion/35d44c00ee2b820d-480.webp", alt: "BlueBird Tech Security" },
  { id: "03", src: "/figmaformotion/24d00f7218a4afa7-480.webp", alt: "Step into Wonder 3D" },
];

const TRAIL_IMAGES = [
  "/figmaformotion/a2f05abe217e9823-480.webp",
  "/figmaformotion/35d44c00ee2b820d-480.webp",
  "/figmaformotion/24d00f7218a4afa7-480.webp",
  "/figmaformotion/90cdd4bbe30bb3e4-480.webp",
  "/figmaformotion/bc8a5cecc0783bb8-480.webp",
  "/figmaformotion/c7a962bc3559eacf-480.webp",
  "/figmaformotion/a710beb50d98696c-480.webp",
  "/figmaformotion/ec8790939e0da733-480.webp",
  "/figmaformotion/03260b49b8820236-480.webp",
];

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Who it’s for", href: "#who-its-for" },
  { label: "Templates", href: "#templates" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "the Maker", href: "#maker" },
];

export interface FigmaMotionHeroProps {
  id?: string;
  count?: string;
  badgeCount?: string;
  titleLine1?: string;
  titleLine2?: string;
  titleLine3?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export default function FigmaMotionHero({
  id = "top",
  count = "50",
  titleLine1 = "Premium",
  titleLine2 = "website",
  titleLine3 = "Templates",
  description = "Access a growing library of premium animations designed exclusively for your current stack.",
  primaryCtaText = "Get Access",
  primaryCtaHref = "#pricing",
  secondaryCtaText = "Explore",
  secondaryCtaHref = "#templates",
}: FigmaMotionHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailLayerRef = useRef<HTMLDivElement>(null);
  const [activeNav, setActiveNav] = useState("Home");
  const [navStyle, setNavStyle] = useState({ left: 8, width: 74 });
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Update active pill position in nav bar
  const handleNavClick = (label: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    setActiveNav(label);
    const target = e.currentTarget;
    if (navContainerRef.current) {
      const containerRect = navContainerRef.current.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      setNavStyle({
        left: targetRect.left - containerRect.left,
        width: targetRect.width,
      });
    }
  };

  // Dot Field Canvas Physics Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let dots: Array<{
      key: string;
      x: number;
      y: number;
      radius: number;
      opacity: number;
      energy: number;
    }> = [];

    let mouseX = -9999;
    let mouseY = -9999;
    let isHovering = false;
    let lastTime = performance.now();

    const pseudoRandom = (x: number, y: number, seed: number) => {
      const r = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
      return r - Math.floor(r);
    };

    const buildDots = (w: number, h: number) => {
      const spacing = Math.max(56, Math.sqrt((w * h) / 450));
      const newDots: typeof dots = [];
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;

      for (let r = -1; r <= rows; r++) {
        for (let c = -1; c <= cols; c++) {
          const key = `${c}:${r}`;
          const x = c * spacing + spacing * 0.5 + Math.sin(r * 0.16) * spacing * 0.22 + (pseudoRandom(c, r, 1) - 0.5) * spacing * 0.32;
          const y = r * spacing + (pseudoRandom(c, r, 2) - 0.5) * spacing * 0.3;
          newDots.push({
            key,
            x,
            y,
            radius: 0.55 + pseudoRandom(c, r, 3) * 0.65,
            opacity: 0.16 + pseudoRandom(c, r, 4) * 0.07,
            energy: 0,
          });
        }
      }
      return newDots;
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.ceil(rect.width);
      height = Math.ceil(rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = buildDots(width, height);
    };

    resize();

    const render = (now: number) => {
      const dt = Math.min(64, now - lastTime || 16.67);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      const radiusThreshold = Math.min(170, Math.max(115, width * 0.12));
      const rgb = "255, 255, 255";

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        let targetEnergy = 0;

        if (isHovering) {
          const dist = Math.hypot(dot.x - mouseX, dot.y - mouseY);
          if (dist < radiusThreshold) {
            const falloff = Math.max(0, 1 - dist / radiusThreshold);
            targetEnergy = Math.min(1, falloff * falloff * 2.2);
          }
        }

        // Exponential decay
        dot.energy = Math.max(targetEnergy, dot.energy * Math.exp(-dt / 230));

        if (dot.energy > 0.12) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.radius * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb}, ${dot.energy * 0.12})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius + dot.energy * 0.65, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${Math.min(1, dot.opacity + dot.energy * 0.9)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovering = true;
    };

    const onPointerLeave = () => {
      isHovering = false;
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener("resize", resize);
    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  // Cursor Thumbnail Stamp Trail Engine
  useEffect(() => {
    const container = containerRef.current;
    const trailLayer = trailLayerRef.current;
    if (!container || !trailLayer) return;

    // Guard on touch/mobile
    const hoverMatch = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!hoverMatch.matches || reducedMotion.matches) return;

    const preloadedImages: HTMLImageElement[] = [];
    TRAIL_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => preloadedImages.push(img);
    });

    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;
    let count = 0;
    const ROTATIONS = [-7, 4, -3, 7, 0];

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || preloadedImages.length === 0) return;

      // Don't stamp when hovering over interactive buttons/links
      const target = e.target as HTMLElement | null;
      if (target && target.closest('a, button, [role="button"]')) return;

      const now = performance.now();
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dist = Math.hypot(x - lastX, y - lastY);
      if (dist < 32 || now - lastTime < 40) return;

      lastX = x;
      lastY = y;
      lastTime = now;

      // Pick an image
      const chosen = preloadedImages[Math.floor(Math.random() * preloadedImages.length)];
      const card = chosen.cloneNode() as HTMLImageElement;
      card.className = "f4m-trail-card";
      card.alt = "";
      card.draggable = false;
      card.style.left = `${x}px`;
      card.style.top = `${y}px`;
      card.style.setProperty("--trail-rotation", `${ROTATIONS[count % ROTATIONS.length]}deg`);

      card.addEventListener(
        "animationend",
        () => {
          card.remove();
        },
        { once: true }
      );

      while (trailLayer.childElementCount >= 12) {
        trailLayer.firstElementChild?.remove();
      }

      trailLayer.appendChild(card);
      count++;
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      container.removeEventListener("pointermove", onPointerMove);
      trailLayer.replaceChildren();
    };
  }, []);

  return (
    <div className="f4m-page-scope">
      {/* Top Floating Header & Nav */}
      <header className="f4m-header">
        <div className="f4m-header-bar">
          <Link href="#top" className="f4m-brand" aria-label="Figma for Motion home">
            <Image
              src="/figmaformotion/symble.svg"
              alt="Figma for Motion"
              width={29}
              height={29}
              className="f4m-brand-symbol"
              priority
            />
          </Link>

          {/* Desktop Nav Pill */}
          <nav className="f4m-nav-pill" ref={navContainerRef} aria-label="Main navigation">
            <div
              className="f4m-nav-indicator"
              style={{
                transform: `translateX(${navStyle.left}px)`,
                width: `${navStyle.width}px`,
              }}
            />
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="f4m-nav-link"
                data-active={activeNav === link.label}
                onClick={(e) => handleNavClick(link.label, e)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Header Action Button */}
          <div className="f4m-header-cta">
            <a href="#pricing" className="f4m-pill-btn">
              Get Access
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button type="button" className="f4m-mobile-toggle" aria-label="Open navigation">
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <section id={id} ref={containerRef} className="f4m-hero" aria-label="Figma for Motion">
        {/* Dot Field Background Layer */}
        <div className="f4m-dot-field-layer" aria-hidden="true">
          <canvas ref={canvasRef} />
        </div>

        {/* Cursor Thumbnail Stamp Trail Layer */}
        <div ref={trailLayerRef} className="f4m-trail-layer" aria-hidden="true" />

        {/* Composition Container */}
        <div className="f4m-composition">
          {/* Main Massive Heading */}
          <h1 className="f4m-heading text-white" style={{ color: "#ffffff" }}>
            <span className="f4m-count f4m-enter f4m-delay-1">
              <span>{count}</span>
              <span className="f4m-plus">+</span>
            </span>

            <span className="f4m-title text-white" style={{ color: "#ffffff" }}>
              <span className="f4m-enter f4m-delay-2 text-white" style={{ color: "#ffffff" }}>{titleLine1}</span>
              <span className="f4m-enter f4m-delay-3 text-white" style={{ color: "#ffffff" }}>
                {/* 3 Interactive Motion Preview Cards */}
                <span className="f4m-hero-previews" aria-hidden="true">
                  {PREVIEW_CARDS.map((card) => (
                    <span key={card.id}>
                      <Image
                        src={card.src}
                        alt={card.alt}
                        width={160}
                        height={90}
                        unoptimized
                        priority
                      />
                    </span>
                  ))}
                </span>
                {titleLine2}
              </span>
              <span className="f4m-enter f4m-delay-4 text-white" style={{ color: "#ffffff" }}>{titleLine3}</span>
            </span>
          </h1>

          {/* 3 Orbit Badges on Top Right */}
          <div className="f4m-badges">
            {/* Badge 1: Ready for Videocode */}
            <div className="f4m-badge-entry f4m-enter" style={{ animationDelay: "0.28s" }}>
              <div className="f4m-badge f4m-white-badge" role="img" aria-label="Ready for Videocode">
                <span className="f4m-orbit" aria-hidden="true">
                  <Image
                    src="/figmaformotion/ready-ring.svg"
                    alt=""
                    width={84}
                    height={84}
                    priority
                  />
                  <span className="f4m-orbit-dot" style={{ left: "25px", top: "16.5px" }} />
                  <span className="f4m-orbit-dot" style={{ left: "86px", top: "39.5px" }} />
                  <span className="f4m-orbit-dot" style={{ left: "45px", top: "85.5px" }} />
                </span>
                <Image
                  src="/figmaformotion/Check.svg"
                  alt=""
                  width={22}
                  height={22}
                  className="f4m-badge-icon"
                  priority
                />
              </div>
            </div>

            {/* Badge 2: Figma animations included */}
            <div className="f4m-badge-entry f4m-enter" style={{ animationDelay: "0.37s" }}>
              <div className="f4m-badge" role="img" aria-label="Figma animations included">
                <span className="f4m-orbit" aria-hidden="true">
                  <Image
                    src="/figmaformotion/figma-ring.svg"
                    alt=""
                    width={84}
                    height={84}
                    priority
                  />
                  <span className="f4m-orbit-dot" style={{ left: "31px", top: "12.5px" }} />
                  <span className="f4m-orbit-dot" style={{ left: "84px", top: "36.5px" }} />
                  <span className="f4m-orbit-dot" style={{ left: "26px", top: "79.5px" }} />
                </span>
                <Image
                  src="/figmaformotion/figma-icone-svg-150px.svg"
                  alt=""
                  width={22}
                  height={22}
                  className="f4m-badge-icon"
                  priority
                />
              </div>
            </div>

            {/* Badge 3: Watch live template creation */}
            <div className="f4m-badge-entry f4m-enter" style={{ animationDelay: "0.46s" }}>
              <div className="f4m-badge" role="img" aria-label="Watch live template creation">
                <span className="f4m-orbit" aria-hidden="true">
                  <Image
                    src="/figmaformotion/live-ring.svg"
                    alt=""
                    width={84}
                    height={84}
                    priority
                  />
                  <span className="f4m-orbit-dot" style={{ left: "40px", top: "10.5px" }} />
                  <span className="f4m-orbit-dot" style={{ left: "12px", top: "66.5px" }} />
                  <span className="f4m-orbit-dot" style={{ left: "75px", top: "74.5px" }} />
                  <span className="f4m-orbit-dot" style={{ left: "84px", top: "33.5px" }} />
                </span>
                <Image
                  src="/figmaformotion/MonitorPlay.svg"
                  alt=""
                  width={22}
                  height={22}
                  className="f4m-badge-icon"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Description Paragraph */}
          <p className="f4m-description f4m-enter f4m-delay-desc">{description}</p>

          {/* Action CTA Buttons */}
          <div className="f4m-actions">
            {/* Primary Action Button */}
            <a href={primaryCtaHref} className="f4m-btn f4m-btn-primary f4m-enter f4m-delay-btn1">
              <span className="f4m-btn-icon-box">
                <Image
                  src="/figmaformotion/arrow-right.svg"
                  alt=""
                  width={20}
                  height={20}
                  priority
                />
              </span>
              <span>{primaryCtaText}</span>
            </a>

            {/* Secondary Action Button */}
            <a href={secondaryCtaHref} className="f4m-btn f4m-btn-secondary f4m-enter f4m-delay-btn2">
              <span className="f4m-btn-icon-box">
                <Image
                  src="/figmaformotion/squares-four.svg"
                  alt=""
                  width={20}
                  height={20}
                  priority
                />
              </span>
              <span>{secondaryCtaText}</span>
            </a>
          </div>
        </div>

        {/* Bottom Centered Scroll Cue */}
        <a href="#who-its-for" className="f4m-scroll-cue" aria-label="Discover who the templates are for">
          <Image
            src="/figmaformotion/scroll.svg"
            alt=""
            width={276}
            height={147}
            priority
          />
        </a>
      </section>
    </div>
  );
}
