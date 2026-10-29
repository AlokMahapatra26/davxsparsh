"use client";

import React, { useEffect, useRef } from "react";

export const DEFAULT_TRAIL_IMAGES: string[] = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&q=80&auto=format&fit=crop",
];

const ROTATIONS = [-7, 4, -4, 6, -2, 5, -5];

export interface UseThumbnailTrailOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  trailRef: React.RefObject<HTMLElement | null>;
  images?: string[];
  distanceThreshold?: number; // Minimum px distance between spawns
  throttleMs?: number; // Minimum ms between spawns
  maxCount?: number; // Max concurrent visible thumbnails
  width?: number; // px width of stamp card
  height?: number; // px height of stamp card
}

export function useThumbnailTrail({
  containerRef,
  trailRef,
  images = DEFAULT_TRAIL_IMAGES,
  distanceThreshold = 28,
  throttleMs = 38,
  maxCount = 14,
  width = 108,
  height = 68,
}: UseThumbnailTrailOptions) {
  useEffect(() => {
    const container = containerRef.current;
    const trail = trailRef.current;
    if (!container || !trail || !images.length) return;

    // Accessibility & touch screen guards
    const hoverMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!hoverMedia.matches || reducedMotion.matches) return;

    // Preload image elements pool
    const loadedImages: HTMLImageElement[] = [];
    let isMounted = true;
    let lastPicked: HTMLImageElement | null = null;
    let spawnIndex = 0;

    images.slice(0, 16).forEach((src) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (isMounted && img.naturalWidth > 0) {
          loadedImages.push(img);
        }
      };
      img.src = src;
    });

    let pendingPointer: { x: number; y: number } | null = null;
    let lastSpawn: { x: number; y: number; time: number } | null = null;
    let rafId = 0;

    const clearTrail = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      pendingPointer = null;
      lastSpawn = null;
      trail.replaceChildren();
    };

    const processPointer = (timestamp: number) => {
      rafId = 0;
      const pointer = pendingPointer;
      pendingPointer = null;

      if (!pointer || !loadedImages.length) return;

      // Distance and time threshold gating
      if (lastSpawn) {
        const timeDiff = timestamp - lastSpawn.time;
        const dist = Math.hypot(pointer.x - lastSpawn.x, pointer.y - lastSpawn.y);
        if (timeDiff < throttleMs || dist < distanceThreshold) {
          return;
        }
      }

      const rect = container.getBoundingClientRect();
      const relX = pointer.x - rect.left;
      const relY = pointer.y - rect.top;

      // Ensure cursor is strictly within container bounds
      if (relX < 0 || relY < 0 || relX > rect.width || relY > rect.height) {
        return;
      }

      // Pick a random image avoiding direct repetition
      const available = loadedImages.filter((img) => img !== lastPicked);
      const pool = available.length ? available : loadedImages;
      const chosen = pool[Math.floor(Math.random() * pool.length)];
      lastPicked = chosen;

      // Create cloned thumbnail element
      const card = chosen.cloneNode() as HTMLImageElement;
      card.alt = "";
      card.draggable = false;
      card.className = "thumbnail-trail-stamp";
      card.style.left = `${relX}px`;
      card.style.top = `${relY}px`;
      card.style.width = `${width}px`;
      card.style.height = `${height}px`;

      const rotation = ROTATIONS[spawnIndex % ROTATIONS.length];
      card.style.setProperty("--trail-rotation", `${rotation}deg`);

      card.addEventListener(
        "animationend",
        () => {
          card.remove();
        },
        { once: true }
      );

      // Max active capacity check
      while (trail.childElementCount >= maxCount) {
        trail.firstElementChild?.remove();
      }

      trail.appendChild(card);
      spawnIndex += 1;
      lastSpawn = { x: pointer.x, y: pointer.y, time: timestamp };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;

      // Suppress spawning when cursor hovers interactive controls
      if (e.target instanceof Element && e.target.closest("a, button, input, textarea, select, [role='button']")) {
        pendingPointer = null;
        return;
      }

      pendingPointer = { x: e.clientX, y: e.clientY };
      if (!rafId) {
        rafId = requestAnimationFrame(processPointer);
      }
    };

    const onPointerLeave = () => {
      pendingPointer = null;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave);
    container.addEventListener("pointercancel", clearTrail);
    window.addEventListener("scroll", clearTrail, { passive: true });
    window.addEventListener("resize", clearTrail, { passive: true });
    window.addEventListener("blur", clearTrail);

    return () => {
      isMounted = false;
      clearTrail();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeEventListener("pointercancel", clearTrail);
      window.removeEventListener("scroll", clearTrail);
      window.removeEventListener("resize", clearTrail);
      window.removeEventListener("blur", clearTrail);
    };
  }, [containerRef, trailRef, images, distanceThreshold, throttleMs, maxCount, width, height]);
}

/**
 * Overlay component that can be placed inside any relative container
 */
export function ThumbnailTrailOverlay({
  containerRef,
  images = DEFAULT_TRAIL_IMAGES,
  width = 108,
  height = 68,
  className = "",
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  images?: string[];
  width?: number;
  height?: number;
  className?: string;
}) {
  const trailRef = useRef<HTMLDivElement>(null);

  useThumbnailTrail({
    containerRef,
    trailRef,
    images,
    width,
    height,
  });

  return (
    <div
      ref={trailRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-10 overflow-hidden ${className}`}
    />
  );
}

export default ThumbnailTrailOverlay;
