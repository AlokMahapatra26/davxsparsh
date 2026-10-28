// Built using Hyperiux Vault: https://vault.hyperiux.com
"use client";

import {
  type CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip, SplitText);
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    prefersReducedMotion,
    getServerReducedMotionSnapshot
  );
}

const CAPTION_FONT_VW = 1;
const CAPTION_LINE_RATIO = 1.3;
const CAPTION_LINE_VW = CAPTION_FONT_VW * CAPTION_LINE_RATIO;
const CAPTION_MOBILE_LINE_RATIO = 1.5;
const CAPTION_MOBILE_LINE = `${3 * CAPTION_MOBILE_LINE_RATIO}vw`;
const CAPTION_MOBILE_LINE_SM = `${3.5 * CAPTION_MOBILE_LINE_RATIO}vw`;

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&h=1000&fit=crop`;

export interface GsapFlipCardItem {
  id?: string | number;
  /** Image URL. Any size works, but a ~4:5 portrait ratio matches the default layout best. */
  image?: string;
  alt?: string;
  /** Short line shown next to the opened hero image. */
  caption?: string;
  /** Per-card title (overrides gallery title) */
  title?: string;
  /** Per-card meta line (overrides gallery meta) */
  meta?: string;
  /** Per-card description (overrides gallery description) */
  description?: string;
  /** Art preset name */
  art?: string;
  /** Document flag */
  isDocument?: boolean;
  /** Custom render content */
  renderContent?: (isHero: boolean, item: GsapFlipCardItem) => React.ReactNode;
}

export interface GsapFlipCardProps {
  /** Cards to display. Defaults to a curated set of six sample photos. */
  items?: GsapFlipCardItem[];
  /** Heading shown in the info panel once a card is opened. */
  title?: string;
  /** Small meta line under the heading. */
  meta?: string;
  /** One-line description under the meta line. */
  description?: string;
  backgroundColor?: string;
  textColor?: string;
  mutedColor?: string;
  /** Card corner radius in pixels. */
  rounded?: number;
  thumbWidth?: number;
  thumbHeight?: number;
  /** Spacing between desktop rail thumbnails in pixels. */
  thumbGap?: number;
  heroWidth?: number;
  heroHeight?: number;
  /** Flip transition duration in seconds. */
  duration?: number;
  /** GSAP ease string driving the Flip transition. */
  ease?: string;
  stackOffsetX?: number;
  stackOffsetY?: number;
  /** Rotation per card in the collapsed desktop stack, in degrees. */
  stackRotation?: number;
  /** Show the "01 / 06" slot counter. */
  showCounter?: boolean;
  captionLines?: number;
  captionFadeDuration?: number;
  captionRevealDuration?: number;
  captionLineStagger?: number;
  /** Called when the opened preview is dismissed. */
  onClose?: () => void;
  className?: string;
  /** Start with the cards already opened into hero and rail */
  defaultOpen?: boolean;
  /** Starting index of the card to display as Hero */
  initialSelectedIndex?: number;
}

const defaultItems: GsapFlipCardItem[] = [
  {
    id: 0,
    image: UNSPLASH("1500534623283-312aade485b7"),
    alt: "Coastal cliffs meeting open water",
    caption: "Late light on the headland, shot from the cliff path.",
  },
  {
    id: 1,
    image: UNSPLASH("1519681393784-d120267933ba"),
    alt: "Mountain range under night sky",
    caption: "The ridge holds its last colour long after the sun goes.",
  },
  {
    id: 2,
    image: UNSPLASH("1470252649378-9c29740c9fa8"),
    alt: "Star field over a dark ridge",
    caption: "Clear enough that night to read the whole sky at once.",
  },
  {
    id: 3,
    image: UNSPLASH("1506905925346-21bda4d32df4"),
    alt: "Mist settling across a valley",
    caption: "Mist gathers in the valley before the morning burns it off.",
  },
  {
    id: 4,
    image: UNSPLASH("1439066615861-d1af74d74000"),
    alt: "Forest ridge in low cloud",
    caption: "Cloud sits low on the treeline and refuses to lift.",
  },
  {
    id: 5,
    image: UNSPLASH("1444927714506-8492d94b4e3d"),
    alt: "Waves breaking along a shoreline",
    caption: "The tide works the same stretch of shore all afternoon.",
  },
];

/**
 * A pile of cards that fans into a hero preview and a thumbnail rail. Tap any
 * frame and the two trade places, same DOM nodes, measured and tweened via
 * GSAP Flip — never re-mounted. Falls back to a stacked mobile layout, and to
 * an instant swap (no Flip travel) under `prefers-reduced-motion`.
 */
export default function GsapFlipCard({
  items = defaultItems,
  title = "GSAP Flip Card",
  meta = "Hyperiux Vault / GSAP Flip / React",
  description = "A pile of cards that fans into a hero and a rail. Tap any frame and the two trade places, same nodes, measured and tweened, never re-mounted.",
  backgroundColor = "#e9e9e7",
  textColor = "#111111",
  mutedColor = "#8a8a86",
  rounded = 20,
  thumbWidth = 108,
  thumbHeight = 120,
  thumbGap = 12,
  heroWidth = 530,
  heroHeight = 670,
  duration = 0.7,
  ease = "power3.inOut",
  stackOffsetX = 3,
  stackOffsetY = 9,
  stackRotation = 0,
  showCounter = true,
  captionLines = 2,
  captionFadeDuration = 0.25,
  captionRevealDuration = 0.55,
  captionLineStagger = 0.07,
  onClose,
  className = "",
  defaultOpen = false,
  initialSelectedIndex,
}: GsapFlipCardProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [order, setOrder] = useState<number[]>(() => {
    const initial = items.map((_, i) => i);
    if (
      typeof initialSelectedIndex === "number" &&
      initialSelectedIndex >= 0 &&
      initialSelectedIndex < items.length
    ) {
      const idx = initial.indexOf(initialSelectedIndex);
      if (idx > -1) {
        initial.splice(idx, 1);
        initial.unshift(initialSelectedIndex);
      }
    }
    return initial;
  });
  const [opened, setOpened] = useState(defaultOpen);
  const [stageWidth, setStageWidth] = useState(0);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const flipStateRef = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const isAnimatingRef = useRef(false);
  const [shownCaption, setShownCaption] = useState<string | undefined>(
    () => items[order[0]]?.caption ?? items[0]?.caption
  );
  const captionRef = useRef<HTMLParagraphElement | null>(null);
  const captionTweenRef = useRef<gsap.core.Tween | null>(null);
  const captionSplitRef = useRef<SplitText | null>(null);

  const revertCaptionSplit = useCallback(() => {
    captionSplitRef.current?.revert();
    captionSplitRef.current = null;
  }, []);

  useEffect(() => {
    setOrder((prev) => {
      const next = items.map((_, i) => i);
      if (
        typeof initialSelectedIndex === "number" &&
        initialSelectedIndex >= 0 &&
        initialSelectedIndex < items.length
      ) {
        const idx = next.indexOf(initialSelectedIndex);
        if (idx > -1) {
          next.splice(idx, 1);
          next.unshift(initialSelectedIndex);
        }
      }
      return next;
    });
  }, [items, initialSelectedIndex]);

  useIsomorphicLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => setStageWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const registerCard = useCallback((index: number, node: HTMLButtonElement | null) => {
    if (node) cardRefs.current.set(index, node);
    else cardRefs.current.delete(index);
  }, []);

  const orderedCards = useCallback(
    () => order.map((i) => cardRefs.current.get(i)).filter(Boolean) as HTMLButtonElement[],
    [order]
  );

  // Below this the stacked single-column layout takes over; above it, the
  // hero+rail layout scales down (see `isNarrow`/`scale`) rather than switching
  // modes, so real tablets and small laptop windows keep the Flip experience.
  const isMobile = stageWidth > 0 && stageWidth < 768;
  const isNarrow = stageWidth > 0 && stageWidth < 900;
  const railCount = Math.max(items.length - 1, 0);
  const scale = isNarrow ? Math.min(1, stageWidth / 900) : 1;
  const tW = thumbWidth * scale;
  const tH = thumbHeight * scale;
  const gap = thumbGap * scale;
  const hW = Math.min(heroWidth * scale, stageWidth * 0.46);
  const hH = heroHeight * (hW / heroWidth || 1);
  const railX = Math.max(24, stageWidth * 0.045);
  const heroX = stageWidth - hW - railX;
  const stackWidth = Math.min(215 * scale, stageWidth * 0.42);
  const stackHeight = stackWidth * 1.5;

  const slotBox = useCallback(
    (slot: number) => {
      if (slot === 0) {
        return { x: heroX, y: 0, w: hW, h: hH, r: rounded * scale, z: items.length + 1 };
      }
      const railHeight = railCount * tH + (railCount - 1) * gap;
      const top = -railHeight / 2 + (slot - 1) * (tH + gap);
      return {
        x: railX,
        y: top + tH / 2,
        w: tW,
        h: tH,
        r: rounded * 0.6 * scale,
        z: items.length - slot,
      };
    },
    [heroX, hW, hH, railX, tW, tH, gap, railCount, rounded, scale, items.length]
  );

  const select = useCallback(
    (itemIndex: number) => {
      if (itemIndex === order[0] || isAnimatingRef.current) return;
      if (!isMobile) {
        flipStateRef.current = Flip.getState(orderedCards(), { props: "borderRadius" });
      }
      setOrder((prev) => {
        const next = [...prev];
        const from = next.indexOf(itemIndex);
        next[from] = next[0];
        next[0] = itemIndex;
        return next;
      });
    },
    [order, orderedCards, isMobile]
  );

  useIsomorphicLayoutEffect(() => {
    const state = flipStateRef.current;
    if (!state) return;
    flipStateRef.current = null;
    if (reducedMotion || isMobile) return;
    isAnimatingRef.current = true;
    Flip.from(state, {
      duration,
      ease,
      absolute: true,
      props: "borderRadius",
      onEnter: (els) => gsap.fromTo(els, { opacity: 0 }, { opacity: 1, duration }),
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });
  }, [order, duration, ease, reducedMotion, isMobile]);

  const open = useCallback(() => {
    if (opened || isAnimatingRef.current || stageWidth === 0) return;
    if (reducedMotion) {
      setOpened(true);
      return;
    }
    const state = Flip.getState(orderedCards(), { props: "borderRadius" });
    setOpened(true);
    requestAnimationFrame(() => {
      isAnimatingRef.current = true;
      Flip.from(state, {
        duration: duration * 1.0,
        ease,
        absolute: true,
        props: "borderRadius",
        stagger: 0.04,
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
    });
  }, [opened, stageWidth, reducedMotion, orderedCards, duration, ease]);

  const close = useCallback(() => {
    if (!opened || isAnimatingRef.current) return;
    if (reducedMotion) {
      setOpened(false);
      onClose?.();
      return;
    }
    const state = Flip.getState(orderedCards(), { props: "borderRadius" });
    setOpened(false);
    requestAnimationFrame(() => {
      isAnimatingRef.current = true;
      Flip.from(state, {
        duration: duration * 0.9,
        ease,
        absolute: true,
        props: "borderRadius",
        stagger: { each: 0.035, from: "end" },
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
    });
    onClose?.();
  }, [opened, reducedMotion, orderedCards, duration, ease, onClose]);

  const nextCaption = items[order[0]]?.caption;
  const activeCaption = reducedMotion ? nextCaption : shownCaption;

  useEffect(() => {
    if (reducedMotion || nextCaption === shownCaption) return;
    const el = captionRef.current;
    if (!el) {
      revertCaptionSplit();
      setShownCaption(nextCaption);
      return;
    }
    captionTweenRef.current?.kill();
    captionTweenRef.current = gsap.to(el, {
      opacity: 0,
      y: -8,
      duration: captionFadeDuration,
      ease: "power2.in",
      onComplete: () => {
        revertCaptionSplit();
        setShownCaption(nextCaption);
      },
    });
  }, [nextCaption, shownCaption, reducedMotion, captionFadeDuration, revertCaptionSplit]);

  useIsomorphicLayoutEffect(() => {
    const el = captionRef.current;
    if (!el || !activeCaption) return;
    if (reducedMotion) {
      revertCaptionSplit();
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    captionTweenRef.current?.kill();
    revertCaptionSplit();
    gsap.set(el, { opacity: 1, y: 0 });
    const split = SplitText.create(el, {
      type: "lines",
      linesClass: "hxs-caption-line",
      mask: "lines",
    });
    captionSplitRef.current = split;
    const lines = split.lines;
    if (!lines?.length) {
      revertCaptionSplit();
      return;
    }
    gsap.set(lines, { yPercent: 100 });
    captionTweenRef.current = gsap.to(lines, {
      yPercent: 0,
      duration: captionRevealDuration,
      stagger: captionLineStagger,
      ease: "power3.out",
    });
    return () => {
      captionTweenRef.current?.kill();
      revertCaptionSplit();
    };
  }, [activeCaption, reducedMotion, captionRevealDuration, captionLineStagger, revertCaptionSplit]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (!opened || items.length < 2) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") select(order[1]);
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") select(order[order.length - 1]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [order, select, close, opened, items.length]);

  if (items.length === 0) return null;

  const heroItemIndex = order[0];
  const heroItem = items[heroItemIndex];
  const heroSlotLabel = heroItemIndex + 1;

  const activeTitle = heroItem?.title ?? title;
  const activeMeta = heroItem?.meta ?? meta;
  const activeDescription = heroItem?.description ?? description;

  const cardStyle = (itemIndex: number): CSSProperties => {
    const slot = order.indexOf(itemIndex);
    if (!opened) {
      const w = stackWidth;
      const h = stackHeight;
      return {
        position: "absolute",
        left: stageWidth / 2 - w / 2,
        top: "50%",
        width: w,
        height: h,
        borderRadius: rounded * 0.75 * scale,
        transform: `translateY(-50%) translate(${slot * stackOffsetX}px, ${slot * stackOffsetY}px) rotate(${slot * stackRotation}deg)`,
        zIndex: items.length - slot,
      };
    }
    const box = slotBox(slot);
    return {
      position: "absolute",
      left: box.x,
      top: "50%",
      width: box.w,
      height: box.h,
      borderRadius: box.r,
      transform: `translateY(calc(-50% + ${box.y}px))`,
      zIndex: box.z,
    };
  };

  const chromeStyle: CSSProperties = {
    opacity: opened ? 1 : 0,
    transition: "opacity 0.5s ease 0.25s",
    pointerEvents: opened ? undefined : "none",
  };

  if (isMobile) {
    return (
      <div
        ref={rootRef}
        className={`hxs-gsap-flip-card relative w-full min-h-svh overflow-y-auto ${className}`}
        style={{ background: backgroundColor, color: textColor }}
      >
        <div className="min-h-svh px-[5vw] py-[8vw] flex flex-col gap-[6vw] relative">
          {/* Close button for overlay/modal mode */}
          {onClose && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={close}
                className="px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white/90 border border-white/10 text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5"
                aria-label="Close preview"
              >
                <span>&times; Close</span>
              </button>
            </div>
          )}

          {showCounter && (
            <div className="text-[3vw] tracking-[0.02em]">
              <span className="font-semibold">
                {String(heroSlotLabel).padStart(2, "0")}
              </span>
              <span style={{ color: mutedColor }}>
                {" "}
                / {String(items.length).padStart(2, "0")}
              </span>
            </div>
          )}

          {heroItem && (
            <div
              className="relative w-full flex-1 min-h-[45svh] overflow-hidden bg-[#18181b] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)]"
              style={{ borderRadius: rounded }}
            >
              {heroItem.renderContent ? (
                heroItem.renderContent(true, heroItem)
              ) : heroItem.image ? (
                <img
                  src={heroItem.image}
                  alt={heroItem.alt ?? ""}
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : null}
            </div>
          )}

          <div className="max-[1025px]:pb-[3vh]">
            <h2 className="text-[7vw] max-md:text-[8vw] leading-[1.1] m-0 font-semibold tracking-[-0.02em]">
              {activeTitle}
            </h2>
            <p className="text-[3vw] max-md:text-[3.5vw] mt-[2vw] mb-[3vw] font-mono" style={{ color: mutedColor }}>
              {activeMeta}
            </p>
            <p className="text-[3.2vw] max-md:text-[3.8vw] leading-[1.65] m-0 text-zinc-300">{activeDescription}</p>
            <div
              className="mt-[4vw] h-[calc(var(--hxs-cap-line)*var(--hxs-cap-lines))] max-md:[--hxs-cap-line:var(--hxs-cap-line-sm)]"
              style={
                {
                  "--hxs-cap-line": CAPTION_MOBILE_LINE,
                  "--hxs-cap-line-sm": CAPTION_MOBILE_LINE_SM,
                  "--hxs-cap-lines": captionLines,
                } as CSSProperties
              }
            >
              <p
                ref={captionRef}
                className="text-[3vw] text-left max-md:text-left max-md:w-[85%] max-md:text-[3.8vw] w-[85%] m-0 leading-normal text-zinc-400"
              >
                {activeCaption}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-[3vw]">
            {order.slice(1).map((itemIndex) => {
              const item = items[itemIndex];
              if (!item) return null;
              return (
                <button
                  key={item.id ?? itemIndex}
                  type="button"
                  onClick={() => select(itemIndex)}
                  aria-label={item.alt ?? item.caption ?? item.title ?? `Card ${itemIndex + 1}`}
                  className="relative p-0 border-none overflow-hidden aspect-4/5 w-full bg-[#18181b] [-webkit-tap-highlight-color:transparent]"
                  style={{ borderRadius: rounded * 0.6 }}
                >
                  {item.renderContent ? (
                    item.renderContent(false, item)
                  ) : item.image ? (
                    <img
                      src={item.image}
                      alt={item.alt ?? ""}
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={`hxs-gsap-flip-card relative w-full min-h-svh overflow-hidden ${className}`}
      style={{ background: backgroundColor, color: textColor }}
    >
      {/* Optional Close Button for Modal/Overlay Experience */}
      {onClose && (
        <button
          type="button"
          onClick={close}
          className="absolute top-6 right-6 z-60 px-4 py-2 rounded-full bg-zinc-950/80 hover:bg-zinc-900 text-white/90 hover:text-white border border-white/15 backdrop-blur-md text-xs font-mono transition-all cursor-pointer flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95"
          aria-label="Close preview"
        >
          <span className="text-base leading-none">&times;</span>
          <span>Close</span>
          <span className="text-[10px] opacity-60">(Esc)</span>
        </button>
      )}

      {showCounter && (
        <div
          className="absolute top-[2.22vw] left-[2.78vw] text-[0.9vw] tracking-[0.02em] z-60"
          style={chromeStyle}
        >
          <span className="font-semibold">{String(heroSlotLabel).padStart(2, "0")}</span>
          <span style={{ color: mutedColor }}> / {String(items.length).padStart(2, "0")}</span>
        </div>
      )}

      <div
        ref={stageRef}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className={`relative w-full min-h-svh ${opened ? "cursor-pointer" : "cursor-default"}`}
      >
        <div
          className={`absolute top-1/2 -translate-y-1/2 max-w-[22.22vw] z-30 pointer-events-none ${
            isNarrow ? "hidden" : "block"
          }`}
          style={{ ...chromeStyle, left: railX + tW + Math.max(48, stageWidth * 0.06) }}
        >
          <h2 className="text-[2.6vw] leading-[1.1] font-semibold tracking-[-0.02em] m-0">{activeTitle}</h2>
          <p className="text-[0.9vw] mt-[0.8vw] mb-[1.4vw] mx-0 font-mono tracking-wide" style={{ color: mutedColor }}>
            {activeMeta}
          </p>
          <p className="text-[0.95vw] leading-[1.65] m-0 text-zinc-300">{activeDescription}</p>
          <div className="mt-[1.6vw]" style={{ height: `${CAPTION_LINE_VW * captionLines}vw` }}>
            <p ref={captionRef} className="text-[0.95vw] w-[85%] text-left leading-[1.4] m-0 text-zinc-400">
              {activeCaption}
            </p>
          </div>
        </div>

        {items.map((item, itemIndex) => {
          const isHero = itemIndex === heroItemIndex;
          return (
            <button
              key={item.id ?? itemIndex}
              type="button"
              ref={(n) => registerCard(itemIndex, n)}
              data-flip-id={`hxs-card-${item.id ?? itemIndex}`}
              onClick={() => (opened ? select(itemIndex) : open())}
              aria-label={
                opened ? item.alt ?? item.caption ?? item.title ?? `Card ${itemIndex + 1}` : `Open gallery — ${items.length} cards`
              }
              aria-current={(opened && isHero) || undefined}
              tabIndex={!opened ? (itemIndex === order[0] ? 0 : -1) : isHero ? -1 : 0}
              className={`p-0 border-none bg-[#18181b] overflow-hidden shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)] [-webkit-tap-highlight-color:transparent] ${
                !opened || !isHero ? "cursor-pointer" : "cursor-default"
              }`}
              style={cardStyle(itemIndex)}
            >
              {item.renderContent ? (
                item.renderContent(isHero, item)
              ) : item.image ? (
                <img
                  src={item.image}
                  alt={item.alt ?? ""}
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover rounded-[inherit]"
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
