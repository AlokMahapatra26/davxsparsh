"use client";

// A portfolio index built as a wheel you turn.
//
// At rest the work sits in a ring around a title, each card tangent to the
// circle. The first notch of scroll blows the ring open into a vertical drum:
// the card at the front lies flat and full size, the ones above and below
// rotate away into hard perspective and run off the top and bottom of the
// frame. Keep turning and the drum carries the next piece round to the front.
//
// Scroll timeline:
// The section stays pinned (sticky top-0) while the user scrolls through the
// virtual track height. When all cards have finished turning, the page unpins
// and continues scrolling smoothly down to the next section.
import * as React from "react";

import { cn } from "@/lib/utils";

export interface WorksWheelItem {
  /** Project or service name. Shown beside the front card and in the index. */
  title: string;
  /** Cover art. Any src an <img> takes. */
  image: string;
  /** Where the card links to. Omit for a wheel that only browses. */
  href?: string;
}

export interface WorksWheelProps
  extends Omit<React.ComponentPropsWithoutRef<"section">, "children"> {
  items: WorksWheelItem[];
  /** Sits in the middle of the ring. @default "Services '26" */
  label?: string;
  /** Label on the card's hover affordance. Omit to drop it. @default "Explore" */
  action?: string;
  /** Virtual scroll distance per item in vh. @default 75 */
  scrollPerItem?: number;
}

/* Geometry constants */
const CARD_H = 0.30; // front card height, of the stage
const CARD_MAX_W = 0.28; // max width ratio of stage on desktop
const CARD_RATIO = 1.45; // card width / height
const STEP = 40; // degrees between cards on the drum
const DRUM = 2.22; // drum radius, in card heights
const LENS = 2.7; // perspective distance
const RING_R = 0.88; // ring radius (reduced from 1.14 so all cards are fully visible)
const BOW = 1.82;
const TITLE = 0.11; // ring label and front-card title scale
const INDEX = 0.04; // index text scale
const CULL = 1.6;

/** Fraction of the remaining distance closed each frame. 1 = no smoothing. */
const EASE = 0.12;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Stage = { w: number; h: number };

const rad = (deg: number) => (deg * Math.PI) / 180;

const bowAt = (drumDeg: number, bow: number) =>
  -bow * (1 - Math.cos(rad(drumDeg)));

function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number,
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export function WorksWheel({
  items,
  label = "Services '26",
  action = "Explore",
  scrollPerItem = 75,
  className,
  style,
  id,
  ...props
}: WorksWheelProps) {
  const rootRef = React.useRef<HTMLElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  const turn = React.useRef(0);
  const target = React.useRef(0);
  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 });

  const count = items.length;
  const last = Math.max(count - 1, 0);

  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const maxWFactor = w > 0 && w < 640 ? 0.52 : CARD_MAX_W;
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * maxWFactor);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * RING_R;
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1;
    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: Math.max(20, cardH * TITLE),
      index: Math.max(12, cardH * INDEX),
    };
  }, [stage, count]);

  // Jump to specific step by smoothly scrolling the page window
  const jump = React.useCallback(
    (targetTurn: number) => {
      const root = rootRef.current;
      if (!root) return;
      const r = root.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      if (travel <= 0) return;
      const prog = clamp01(targetTurn / count);
      const targetScrollY = window.scrollY + r.top + prog * travel;
      window.scrollTo({
        top: targetScrollY,
        behavior: reduced ? "auto" : "smooth",
      });
    },
    [count, reduced],
  );

  // Main animation and scroll scrubbing loop
  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);

      // Measure scroll position relative to root track
      const root = rootRef.current;
      if (root) {
        const r = root.getBoundingClientRect();
        const travel = r.height - window.innerHeight;
        if (travel > 0) {
          // p is 0 when root top hits viewport top, 1 when root bottom hits viewport bottom
          const p = clamp01(-r.top / travel);
          target.current = p * count;
        }
      }

      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(
            d * (360 / count),
            drumDeg,
            ringR,
            drumR,
            bow,
            m,
          );
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
          card.style.pointerEvents =
            m <= 0.5 || Math.abs(d) < 0.6 ? "auto" : "none";
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);
      if (titleRef.current) titleRef.current.style.opacity = String(m);
      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  return (
    <section
      ref={rootRef}
      id={id}
      aria-label={label}
      className={cn(
        "bg-background text-foreground relative w-full",
        className,
      )}
      style={{
        height: `calc(100svh + ${items.length * scrollPerItem}vh)`,
        ...style,
      }}
      {...props}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        role="region"
        aria-label={label}
        className="sticky top-0 h-[100svh] w-full overflow-hidden select-none outline-none"
        style={{ perspective: `${metrics.depth}px` }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            jump(Math.min(count, Math.round(turn.current) + 1));
            event.preventDefault();
          } else if (event.key === "ArrowUp") {
            jump(Math.max(0, Math.round(turn.current) - 1));
            event.preventDefault();
          }
        }}
      >
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => {
            const Tag = (item.href ? "a" : "div") as "a";
            return (
              <React.Fragment key={item.title}>
                <Tag
                  id={`works-wheel-${i}`}
                  role="option"
                  aria-selected={i === active}
                  href={item.href}
                  ref={(node: HTMLElement | null) => {
                    cardRefs.current[i] = node;
                  }}
                  onClick={(e) => {
                    // Clicking a card that is not yet centered brings it to center
                    if (turn.current > 0.5 && i !== active) {
                      e.preventDefault();
                      jump(i + 1);
                    }
                  }}
                  className="group absolute [backface-visibility:hidden]"
                  style={{
                    width: metrics.cardW,
                    height: metrics.cardH,
                    marginLeft: -metrics.cardW / 2,
                    marginTop: -metrics.cardH / 2,
                  }}
                >
                  <span className="bg-muted shadow-foreground/12 relative block size-full overflow-hidden rounded-xl border border-zinc-200/20 dark:border-zinc-800/60 shadow-[0_18px_40px_-18px_var(--tw-shadow-color)] transition-shadow group-hover:shadow-2xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {action && item.href ? (
                      <span className="bg-background/90 text-foreground pointer-events-none absolute right-3 bottom-3 flex translate-y-1 items-center gap-1.5 rounded-full px-3 py-1 text-[0.75rem] font-medium opacity-0 backdrop-blur-md transition group-hover:translate-y-0 group-hover:opacity-100 shadow-md">
                        <svg
                          viewBox="0 0 12 12"
                          className="size-2.5"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 9 9 3M4 3h5v5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {action}
                      </span>
                    ) : null}
                  </span>
                </Tag>
              </React.Fragment>
            );
          })}
        </div>

        {/* Ring title (at rest) */}
        <div
          ref={labelRef}
          className="pointer-events-none absolute inset-0 grid place-items-center font-medium tracking-tight select-none transition-opacity"
          style={{ fontSize: metrics.title }}
        >
          {label}
        </div>

        {/* Active front-card title */}
        <div
          ref={titleRef}
          className="pointer-events-none absolute top-1/2 left-[6%] sm:left-[8%] -translate-y-1/2 max-w-[40%] font-semibold tracking-tight leading-[1.1] text-foreground opacity-0 select-none transition-opacity"
          style={{ fontSize: metrics.title }}
        >
          {items[active]?.title}
        </div>

        {/* Index list on the right */}
        <ol
          className="text-muted-foreground absolute top-[7.5%] right-[3%] sm:right-[4%] text-right leading-[1.8] select-none z-10"
          style={{ fontSize: metrics.index }}
        >
          {items.map((item, i) => (
            <li key={item.title}>
              <button
                type="button"
                onClick={() => jump(i + 1)}
                className={cn(
                  "focus-visible:outline-foreground cursor-pointer transition-all outline-none focus-visible:outline-1 hover:text-foreground",
                  i === active
                    ? "text-foreground font-semibold scale-105"
                    : "opacity-60 hover:opacity-100",
                )}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default WorksWheel;
