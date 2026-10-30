"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import "@/styles/template-scroll.css";

export interface TemplateCardItem {
  id: string;
  title: string;
  category?: string;
  poster: string;
}

export const DEFAULT_TEMPLATE_CARDS: TemplateCardItem[] = [
  {
    id: "01",
    title: "Crystal Lotus",
    category: "3D Crystal Lotus",
    poster: "/figmaformotion/crystal-lotus.webp",
  },
  {
    id: "02",
    title: "Why so curious",
    category: "Interactive 3D Mascot",
    poster: "/figmaformotion/a2f05abe217e9823-480.webp",
  },
  {
    id: "03",
    title: "BlueBird Tech",
    category: "Corporate Tech & Security",
    poster: "/figmaformotion/35d44c00ee2b820d-480.webp",
  },
  {
    id: "04",
    title: "Step into Wonder",
    category: "Immersive Fantasy 3D",
    poster: "/figmaformotion/24d00f7218a4afa7-480.webp",
  },
  {
    id: "05",
    title: "Cinematic Dark",
    category: "Japanese Torii Gate",
    poster: "/figmaformotion/90cdd4bbe30bb3e4-480.webp",
  },
  {
    id: "06",
    title: "Precision Engineering",
    category: "Industrial Design",
    poster: "/figmaformotion/bc8a5cecc0783bb8-480.webp",
  },
  {
    id: "07",
    title: "Playful 3D Journey",
    category: "Creative Agency",
    poster: "/figmaformotion/c7a962bc3559eacf-480.webp",
  },
  {
    id: "08",
    title: "Abstract Editorial",
    category: "Sensory Design System",
    poster: "/figmaformotion/a710beb50d98696c-480.webp",
  },
  {
    id: "09",
    title: "Drone & Tech Product",
    category: "Modern Hardware",
    poster: "/figmaformotion/ec8790939e0da733-480.webp",
  },
  {
    id: "10",
    title: "Fluid Aqua 3D",
    category: "Digital Product",
    poster: "/figmaformotion/6ea3cbb1171e6c5e-1600.webp",
  },
];

const ROLES = ["DEVELOPERS", "AGENCY TEAM", "FOUNDERS"];

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const ease = (v: number) => {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

// Scale factors of the stacked preview cards
const H_FACTORS = [1, 372 / 390, 347 / 390, 323.556 / 390, 288 / 390, 0.68];
// Y translation offsets in px of the stacked preview cards
const G_OFFSETS = [0, 15, 32, 48.5, 68.5, 86];

// Orbit points (10 coordinates around the audience center text)
const ORBIT_POINTS: [number, number][] = [
  [-84, -202.5],
  [84, -202.5],
  [239, -110],
  [261, 0],
  [239, 110],
  [84, 202.5],
  [-84, 202.5],
  [-238, 110],
  [-261, 0],
  [-238, -110],
];

function getDesignScale(width: number, height: number) {
  return width < 768 ? width / 440 : Math.min(width / 960, height / 650, 1.8);
}

function computeCardStep(
  index: number,
  peelT: number,
  dims: { width: number; height: number; cardWidth: number },
  isDesktopHero: boolean = false
) {
  if (index < 4 && peelT > index) {
    const i = clamp01(peelT - index);
    // Card 0 peels to the right (+1)
    // Card 1 peels to the left (-1)
    // Card 2 peels to the right (+1)
    // Card 3 peels to the left (-1)
    const dir = index === 0 ? 1 : index % 2 !== 0 ? -1 : 1;
    return {
      x: dir * (dims.width / 2 + dims.cardWidth * 0.8) * ease(i),
      y: -dims.cardWidth * 0.12 * Math.sin(i * Math.PI),
      scale: 1,
      rotation: dir * 18 * ease(i),
      opacity: 1 - ease((i - 0.75) / 0.25),
      z: 20 - index,
    };
  }

  const i = Math.max(0, index - Math.floor(peelT) - ease(peelT % 1));
  const a = Math.min(4, Math.floor(i));
  const o = ease(i - a);
  return {
    x: 0,
    y: (lerp(G_OFFSETS[a], G_OFFSETS[a + 1], o) * dims.cardWidth) / 390,
    scale: lerp(H_FACTORS[a], H_FACTORS[a + 1], o),
    rotation: 0,
    opacity: i > 4 ? 1 - clamp01(i - 4) : 1,
    z: 20 - index,
  };
}

function computeScrollState(
  scrollPx: number,
  heroHeight: number,
  stageRange: number,
  dims: { width: number; height: number; cardWidth: number },
  cardCount: number = 10,
  isDesktopHero: boolean = false
) {
  let peelT = 0;
  let circleTransition = 0;
  let orbitAngle = 0;
  let audienceOpacity = 0;
  let roleNorm = 0;

  if (isDesktopHero) {
    if (scrollPx <= heroHeight) {
      // Stage 1: While scrolling on the Hero
      // ONLY Card 0 peels gently out to the right over the full hero scroll
      const heroP = heroHeight > 0 ? clamp01(scrollPx / heroHeight) : 1;
      peelT = heroP * 1.0;
      circleTransition = 0;
      orbitAngle = 0;
      audienceOpacity = 0;
      roleNorm = 0;
    } else {
      // Stage 2: We have arrived on the second page (#ebe8f9)
      const stageP = stageRange > 0 ? clamp01((scrollPx - heroHeight) / stageRange) : 1;

      // Phase 2a: Smooth, unhurried peel of remaining cards left & right (stageP: 0.00 to 0.55)
      peelT = 1.0 + clamp01(stageP / 0.55) * 3.0; // from 1.0 to 4.0

      // Phase 2b: Smoothly expand into the circular orbit ring (stageP: 0.45 to 0.72)
      circleTransition = ease(clamp01((stageP - 0.45) / 0.27));

      // Phase 2c: Orbit ring rotates (stageP: 0.55 to 0.96)
      orbitAngle = clamp01((stageP - 0.55) / 0.41) * ((Math.PI * 5) / 6);

      // Phase 2d: Audience title gently appears
      audienceOpacity = ease(clamp01((stageP - 0.48) / 0.20));

      // Phase 2e: Roles cycle with ample reading time
      roleNorm = clamp01((stageP - 0.56) / 0.40);
    }
  } else {
    // Non-desktop fallback with gentle timeline
    const p = stageRange > 0 ? clamp01(scrollPx / stageRange) : 0;
    peelT = clamp01(p / 0.55) * 4;
    circleTransition = ease(clamp01((p - 0.45) / 0.27));
    orbitAngle = clamp01((p - 0.55) / 0.41) * ((Math.PI * 5) / 6);
    audienceOpacity = ease(clamp01((p - 0.48) / 0.20));
    roleNorm = clamp01((p - 0.56) / 0.40);
  }

  const s = getDesignScale(dims.width, dims.height);

  const cards = Array.from({ length: cardCount }, (_, cardIndex) => {
    const l = computeCardStep(cardIndex, peelT, dims, isDesktopHero);
    if (circleTransition <= 0) return l;

    const [uCoord, dCoord] = ORBIT_POINTS[cardIndex % ORBIT_POINTS.length];
    const fx = (uCoord * Math.cos(orbitAngle) - (dCoord / 213) * 261 * Math.sin(orbitAngle)) * s;
    const fy = ((uCoord / 261) * 213 * Math.sin(orbitAngle) + dCoord * Math.cos(orbitAngle)) * s;

    return {
      x: lerp(l.x, fx, circleTransition),
      y: lerp(l.y, fy, circleTransition),
      scale: lerp(l.scale, (150 * s) / dims.cardWidth, circleTransition),
      rotation: lerp(l.rotation, 0, circleTransition),
      opacity: lerp(l.opacity, 1, circleTransition),
      z: 20 - cardIndex,
    };
  });

  const maxRoleIdx = ROLES.length - 1;
  const roleFloat = roleNorm * maxRoleIdx;
  const roleBaseIdx = Math.min(Math.max(0, maxRoleIdx - 1), Math.floor(roleFloat));
  const roleFraction = roleFloat - roleBaseIdx;
  const currentRoleIdx = roleNorm >= 0.95 ? maxRoleIdx : roleFraction <= 0.5 ? roleBaseIdx : roleBaseIdx + 1;

  const rolesState = ROLES.map((_, rIdx) => {
    if (rIdx !== currentRoleIdx) return { scale: 0.72, opacity: 0 };
    if (roleNorm >= 0.95) return { scale: 1, opacity: 1 };
    if (roleFraction > 0.5) {
      const eEase = ease((roleFraction - 0.5) * 2);
      return { scale: lerp(0.72, 1, eEase), opacity: eEase };
    }
    const nEase = ease(roleFraction * 2);
    return { scale: lerp(0.72, 1, audienceOpacity) + 0.08 * nEase, opacity: 1 - nEase };
  });

  return {
    cards,
    roles: rolesState,
    scale: s,
    circle: circleTransition,
    audienceOpacity,
  };
}

const S_IDLE = 4500;
function computeIdleTurn(timeMs: number) {
  const cycle = 800 + S_IDLE;
  const n = Math.floor(timeMs / cycle);
  const r = timeMs % cycle;
  const i = Math.min(1, r / 800);
  return {
    turn: n + 1 - (1 - i) ** 2,
    wait: r >= 800 ? cycle - r : 0,
  };
}

function computeIdleCards(
  turn: number,
  dims: { width: number; height: number; cardWidth: number },
  cardCount: number
) {
  const offset = Math.floor(turn) % cardCount;
  const frac = turn % 1;
  return {
    offset,
    cards: Array.from({ length: cardCount }, (_, nIdx) =>
      computeCardStep(nIdx, frac, dims, true)
    ),
  };
}

export interface FigmaTemplateScrollProps {
  id?: string;
  heroId?: string;
  desktopHero?: boolean;
  templates?: TemplateCardItem[];
}

export default function FigmaTemplateScroll({
  id = "template-scroll",
  heroId = "hero",
  desktopHero = true,
  templates = DEFAULT_TEMPLATE_CARDS,
}: FigmaTemplateScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rolesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const audienceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const audience = audienceRef.current;
    if (!section || !stage || !audience) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const mediaDesktop = matchMedia("(min-width: 768px)");
    const heroEl = desktopHero ? document.getElementById(heroId) : null;

    let dims = { width: 440, height: 844, cardWidth: 390 };
    let heroHeight = 0;
    let idleTurn = 0;
    let idleAccumTime = 0;
    let idleWaitTimer = 0;
    let idleTimeout = 0;
    let hasScrolled = false;
    let currentOffset = 0;
    let scrollRange = 1;
    let targetScroll = 0;
    let currentScroll = 0;
    let rafId = 0;
    let lastTime = 0;
    let isIntersecting = true;

    const render = (time: number) => {
      rafId = 0;
      if (reducedMotion.matches || document.hidden || !isIntersecting) return;

      const delta = lastTime ? time - lastTime : 16.67;
      const dt = Math.min(64, delta);
      lastTime = time;

      // Smoother, gentler deceleration lerp (100ms time constant)
      currentScroll += (targetScroll - currentScroll) * (1 - Math.exp(-dt / 95));
      if (Math.abs(targetScroll - currentScroll) < 0.00005) {
        currentScroll = targetScroll;
      }

      const isDesktop = desktopHero && mediaDesktop.matches;
      const isIdleOnHero = isDesktop && !hasScrolled && targetScroll === 0 && currentScroll === 0;

      if (isIdleOnHero) {
        idleAccumTime += dt;
      }

      const idleState = computeIdleTurn(idleAccumTime);
      if (isIdleOnHero) {
        idleTurn = idleState.turn;
      }

      const idleCardData = computeIdleCards(idleTurn, dims, templates.length);
      const activeOffset = isDesktop && isIdleOnHero ? idleCardData.offset : 0;
      if (currentOffset !== activeOffset) {
        currentOffset = activeOffset;
      }

      const scrollPx = currentScroll * scrollRange;
      const stageRange = Math.max(1, scrollRange - heroHeight);

      // Two-phase scroll state calculation
      const scrollState = computeScrollState(
        scrollPx,
        heroHeight,
        stageRange,
        dims,
        templates.length,
        isDesktop
      );

      if (isIdleOnHero) {
        scrollState.cards = idleCardData.cards;
      }

      // Smooth hero unparking: stack transitions smoothly from hero corner to center stage
      const heroUnpark = isDesktop && heroHeight > 0 ? clamp01(scrollPx / heroHeight) : 1;
      const H = heroUnpark * heroUnpark * (3 - 2 * heroUnpark);
      const maxHeroCardW = Math.min(534, dims.width * 0.371);
      const W = isDesktop
        ? maxHeroCardW / dims.cardWidth + (1 - maxHeroCardW / dims.cardWidth) * H
        : 1;
      const G = isDesktop ? (dims.width * 0.789 - dims.width / 2) * (1 - H) : 0;
      const K = isDesktop ? (heroHeight * 0.615 - dims.height / 2) * (1 - H) : 0;

      // Apply transform to each template card
      scrollState.cards.forEach((cardTransform, idx) => {
        const el = cardsRef.current[(idx + currentOffset) % templates.length];
        if (el) {
          el.style.transform = `translate(-50%, -50%) translate3d(${G + cardTransform.x * W}px, ${K + cardTransform.y * W}px, 0) rotate(${cardTransform.rotation}deg) scale(${cardTransform.scale * W})`;
          el.style.opacity = String(cardTransform.opacity);
          el.style.zIndex = String(cardTransform.z);
          el.style.visibility = cardTransform.opacity > 0.001 ? "visible" : "hidden";
        }
      });

      // Update audience container opacity and scale
      audience.style.opacity = String(scrollState.audienceOpacity);
      audience.style.setProperty("--design-scale", String(scrollState.scale));

      // Update rotating audience roles
      scrollState.roles.forEach((roleTransform, rIdx) => {
        const roleEl = rolesRef.current[rIdx];
        if (roleEl) {
          roleEl.style.transform = `translate(-50%, -50%) scale(${roleTransform.scale})`;
          roleEl.style.opacity = String(roleTransform.opacity);
        }
      });

      if (currentScroll !== targetScroll || (isIdleOnHero && !idleState.wait)) {
        rafId = requestAnimationFrame(render);
      } else if (isIdleOnHero) {
        idleTimeout = window.setTimeout(scheduleRender, idleState.wait);
      }
    };

    const scheduleRender = () => {
      clearTimeout(idleTimeout);
      clearTimeout(idleWaitTimer);
      idleTimeout = 0;
      if (!rafId && !reducedMotion.matches && !document.hidden && isIntersecting) {
        rafId = requestAnimationFrame(render);
      }
    };

    const onScroll = () => {
      targetScroll = Math.max(0, Math.min(1, -section.getBoundingClientRect().top / scrollRange));
      if (desktopHero && mediaDesktop.matches) {
        const scrolled = targetScroll > 0.005;
        if ((scrolled && !hasScrolled) || (targetScroll === 0 && hasScrolled)) {
          hasScrolled = scrolled;
          lastTime = 0;
        }
      }
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        rafId = 0;
        lastTime = 0;
      }
      scheduleRender();
    };

    const onResize = () => {
      heroHeight = heroEl?.offsetHeight || 0;
      if (desktopHero && mediaDesktop.matches && heroHeight > 0) {
        section.style.setProperty("--desktop-hero-height", `${heroHeight}px`);
      }
      dims = {
        width: stage.clientWidth,
        height: stage.clientHeight,
        cardWidth: cardsRef.current[0]?.offsetWidth || 390,
      };
      scrollRange = Math.max(1, section.offsetHeight - stage.offsetHeight);
      section.style.setProperty(
        "--audience-anchor",
        `${desktopHero && mediaDesktop.matches ? heroHeight + 1.8 * dims.height : 2 * dims.height}px`
      );

      if (reducedMotion.matches) {
        clearTimeout(idleTimeout);
        clearTimeout(idleWaitTimer);
        cancelAnimationFrame(rafId);
        rafId = 0;
        lastTime = 0;
        return;
      }
      onScroll();
      currentScroll = targetScroll;
      scheduleRender();
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      if (isIntersecting) {
        onScroll();
      } else {
        clearTimeout(idleTimeout);
        clearTimeout(idleWaitTimer);
        cancelAnimationFrame(rafId);
        rafId = 0;
        lastTime = 0;
      }
    });

    const resizeObserver = new ResizeObserver(onResize);

    intersectionObserver.observe(section);
    resizeObserver.observe(stage);
    if (heroEl) resizeObserver.observe(heroEl);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onScroll);
    reducedMotion.addEventListener("change", onResize);
    mediaDesktop.addEventListener("change", onResize);

    onResize();

    return () => {
      clearTimeout(idleTimeout);
      clearTimeout(idleWaitTimer);
      cancelAnimationFrame(rafId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onScroll);
      reducedMotion.removeEventListener("change", onResize);
      mediaDesktop.removeEventListener("change", onResize);
    };
  }, [templates, desktopHero, heroId]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`f4m-scroll-section ${desktopHero ? "f4m-hero-journey" : ""}`}
      style={
        {
          "--scroll-height": "360svh",
          "--desktop-scroll-height": "350svh",
        } as React.CSSProperties
      }
      aria-labelledby="f4m-audiences-heading"
    >
      <span id="who-its-for" className="f4m-audience-anchor" aria-hidden="true" />
      <h2 id="f4m-audiences-heading" className="f4m-screen-reader">
        Ideal for developers, agency teams and founders.
      </h2>

      {/* Sticky Fullscreen Stage (Pins smoothly at a relaxed pace, then immediately releases) */}
      <div ref={stageRef} className="f4m-stage" aria-hidden="true">
        {/* Layered Motion Stack Cards */}
        <div className="f4m-cards-layer">
          {templates.map((template, idx) => (
            <div
              key={template.id}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="f4m-card"
              data-template-id={template.id}
              style={{ "--index": idx } as React.CSSProperties}
            >
              <div className="f4m-preview">
                <Image
                  src={template.poster}
                  alt={template.title}
                  width={1600}
                  height={900}
                  priority={idx < 2}
                  unoptimized
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Center Audience Role Rotation */}
        <div ref={audienceRef} className="f4m-audience">
          <span className="f4m-audience-label">Ideal for</span>
          <div className="f4m-audience-roles">
            {ROLES.map((roleName, rIdx) => (
              <span
                key={roleName}
                ref={(el) => {
                  rolesRef.current[rIdx] = el;
                }}
              >
                {roleName}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
