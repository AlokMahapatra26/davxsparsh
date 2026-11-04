"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";
import type { CSSProperties } from "react";
import { animate, useInView } from "motion/react";
import { motionTokens } from "@/components/ui/stats-band-utils/motion-tokens";
import {
  stats as exampleStats,
  type Stat,
  type StatVisual,
} from "@/components/ui/stats-band-utils/stats-band-data";
import {
  WORLD,
  worldLand,
} from "@/components/ui/stats-band-utils/stats-band-world";
import styles from "@/components/ui/stats-band-utils/stats-band.module.css";

export type {
  Stat,
  StatVisual,
} from "@/components/ui/stats-band-utils/stats-band-data";
export type StatsBandLayout = "plain" | "divided";

export interface StatsBandProps {
  /** Three or four stats read best. */
  stats?: Stat[];
  /** `plain` lets the stats float on whitespace; `divided` sets them in a hairline grid ruled above and below. */
  layout?: StatsBandLayout;
  title?: string;
  description?: string;
  /** Seconds each number takes to count up. Defaults to 1.6. */
  duration?: number;
  /** Number formatting locale. Fixed by default so server and client agree. */
  locale?: string;
  className?: string;
}

type Bezier = [number, number, number, number];
const enter = [...motionTokens.ease.enter] as Bezier;
const STAGGER = 0.09;

const REDUCE = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(REDUCE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
/** Reduced motion, read after hydration so the server and first client render agree. CSS covers the first paint. */
function useReducedMotionSafe() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCE).matches,
    () => false,
  );
}

/**
 * Formats a stat's number, split from its compact unit so the unit can sit beside the digits like a suffix. A compact
 * stat counts inside its final unit (0.0M to 2.3M) instead of jumping from K to M halfway through.
 */
function useFormat(stat: Stat, locale: string) {
  return useMemo(() => {
    const decimals = stat.decimals ?? 0;
    const digits = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      numberingSystem: "latn",
    });
    if (stat.notation !== "compact")
      return { unit: "", format: (value: number) => digits.format(value) };
    const size = Math.abs(stat.value);
    const scale =
      size >= 1e12
        ? 1e12
        : size >= 1e9
          ? 1e9
          : size >= 1e6
            ? 1e6
            : size >= 1e3
              ? 1e3
              : 1;
    const unit =
      scale === 1
        ? ""
        : (new Intl.NumberFormat(locale, { notation: "compact" })
            .formatToParts(scale)
            .find((part) => part.type === "compact")?.value ?? "");
    return { unit, format: (value: number) => digits.format(value / scale) };
  }, [stat.decimals, stat.notation, stat.value, locale]);
}

/**
 * One number that counts from zero to its value the first time the band is in view. The final value reserves the
 * width underneath, so the layout never moves while digits change. Screen readers only get the final value.
 */
function CountUp({
  stat,
  run,
  delay,
  duration,
  reduced,
  locale,
}: {
  stat: Stat;
  run: boolean;
  delay: number;
  duration: number;
  reduced: boolean;
  locale: string;
}) {
  const live = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  const { unit, format } = useFormat(stat, locale);
  const final = format(stat.value);
  const suffix = `${unit}${stat.suffix ?? ""}`;

  useLayoutEffect(() => {
    if (reduced || done.current || !live.current) return;
    live.current.textContent = format(0);
  }, [format, reduced]);

  useEffect(() => {
    const node = live.current;
    if (!node) return;
    if (reduced) {
      node.textContent = final;
      done.current = true;
      return;
    }
    if (!run || done.current) return;
    const controls = animate(0, stat.value, {
      duration,
      delay,
      ease: enter,
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
      onComplete: () => {
        node.textContent = final;
        done.current = true;
      },
    });
    return () => controls.stop();
  }, [run, reduced, stat.value, delay, duration, format, final]);

  return (
    <>
      <span className={styles.srOnly}>
        {stat.prefix}
        {final}
        {suffix}
      </span>
      <span className={styles.number} aria-hidden="true">
        {stat.prefix && <span className={styles.prefix}>{stat.prefix}</span>}
        <span className={styles.digits}>
          <span className={styles.sizer}>{final}</span>
          <span ref={live} className={styles.live}>
            {final}
          </span>
        </span>
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </span>
    </>
  );
}

/* Visuals. Each one is drawn at rest; CSS hides it until the band is in view, then draws it in. */

function Trend({ values }: { values: number[] }) {
  const min = Math.min(...values),
    max = Math.max(...values);
  const span = max - min || 1;
  const points = values.map(
    (value, index) =>
      [
        values.length > 1 ? (index / (values.length - 1)) * 100 : 100,
        36 - ((value - min) / span) * 32,
      ] as const,
  );
  const line = points
    .map(
      ([x, y], index) => `${index ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`,
    )
    .join(" ");
  const [endX, endY] = points[points.length - 1];
  return (
    <div className={styles.trend}>
      <svg
        className={styles.draw}
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
      >
        <path className={styles.area} d={`${line} L100 40 L0 40 Z`} />
        <path
          className={styles.line}
          d={line}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        className={styles.endDot}
        style={{ left: `${endX}%`, top: `${(endY / 40) * 100}%` }}
      />
    </div>
  );
}

function Uptime({ days }: { days: number[] }) {
  return (
    <div className={styles.bars} data-dense="">
      {days.map((uptime, index) => (
        <span
          key={index}
          className={styles.bar}
          data-ink={uptime < 100 ? "" : undefined}
          style={
            {
              "--j": index / days.length,
              "--h": Math.min(1, Math.max(0.3, 1 - (100 - uptime) * 0.7)),
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function Distribution({
  bins,
  max,
  marker,
  inverted,
}: {
  bins: number[];
  max: number;
  marker: number;
  inverted?: boolean;
}) {
  const peak = Math.max(...bins) || 1;
  const width = max / bins.length;
  return (
    <div className={styles.bars}>
      {bins.map((count, index) => {
        const isHighlighted = inverted
          ? index * width >= marker
          : index * width < marker;
        return (
          <span
            key={index}
            className={styles.bar}
            data-ink={isHighlighted ? "" : undefined}
            style={
              {
                "--j": index / bins.length,
                "--h": Math.max(0.04, count / peak),
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

const cellOf = (lon: number, lat: number) => {
  const x = Math.floor(
    (((((lon - WORLD.west) % 360) + 360) % 360) / (WORLD.east - WORLD.west)) *
      WORLD.columns,
  );
  const y = Math.floor(
    ((WORLD.north - lat) / (WORLD.north - WORLD.south)) * WORLD.rows,
  );
  return [
    Math.min(WORLD.columns - 1, Math.max(0, x)),
    Math.min(WORLD.rows - 1, Math.max(0, y)),
  ] as const;
};

/** Snaps a point to the nearest land dot, so a coastal city never lights a dot in the sea. */
function nearestLand(lon: number, lat: number) {
  const [x, y] = cellOf(lon, lat);
  let best = y * WORLD.columns + x,
    distance = Infinity;
  for (let dy = -2; dy <= 2; dy++)
    for (let dx = -2; dx <= 2; dx++) {
      const cx = x + dx,
        cy = y + dy;
      if (
        cx < 0 ||
        cy < 0 ||
        cx >= WORLD.columns ||
        cy >= WORLD.rows ||
        !worldLand[cy * WORLD.columns + cx]
      )
        continue;
      const d = dx * dx + dy * dy;
      if (d < distance) {
        distance = d;
        best = cy * WORLD.columns + cx;
      }
    }
  return best;
}

function WorldMap({ points }: { points: [number, number][] }) {
  const lit = useMemo(
    () => new Set(points.map(([lon, lat]) => nearestLand(lon, lat))),
    [points],
  );
  return (
    <div className={styles.map}>
      <svg
        className={styles.draw}
        viewBox={`0 0 ${WORLD.columns} ${WORLD.rows}`}
      >
        {worldLand.map(
          (land, index) =>
            land &&
            !lit.has(index) && (
              <circle
                key={index}
                className={styles.land}
                cx={(index % WORLD.columns) + 0.5}
                cy={Math.floor(index / WORLD.columns) + 0.5}
                r={0.3}
              />
            ),
        )}
        {[...lit].map((index) => (
          <circle
            key={index}
            className={styles.lit}
            cx={(index % WORLD.columns) + 0.5}
            cy={Math.floor(index / WORLD.columns) + 0.5}
            r={0.5}
          />
        ))}
      </svg>
    </div>
  );
}

function DevicesVisual() {
  return (
    <div className={styles.agencyVisual}>
      <svg
        viewBox="0 0 110 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.draw}
      >
        {/* Desktop Browser Frame */}
        <rect
          x="3"
          y="5"
          width="64"
          height="37"
          rx="3.5"
          stroke="var(--ink)"
          strokeWidth="1.2"
          opacity="0.85"
        />
        {/* Browser Top bar */}
        <line x1="3" y1="12" x2="67" y2="12" stroke="var(--soft)" strokeWidth="1" />
        {/* 3 browser dots */}
        <circle cx="8" cy="8.5" r="1.2" fill="var(--soft)" />
        <circle cx="12" cy="8.5" r="1.2" fill="var(--soft)" />
        <circle cx="16" cy="8.5" r="1.2" fill="var(--soft)" />
        {/* Browser wireframe UI lines */}
        <rect x="7" y="16" width="20" height="20" rx="2" fill="var(--soft)" opacity="0.4" />
        <line x1="31" y1="18" x2="61" y2="18" stroke="var(--ink)" strokeWidth="1.2" opacity="0.6" />
        <line x1="31" y1="23" x2="55" y2="23" stroke="var(--soft)" strokeWidth="1" />
        <line x1="31" y1="28" x2="59" y2="28" stroke="var(--soft)" strokeWidth="1" />
        <rect x="31" y="32" width="16" height="3.5" rx="1" fill="var(--ink)" opacity="0.7" />

        {/* Mobile Smartphone (overlapping in front) */}
        <rect
          x="72"
          y="1"
          width="26"
          height="42"
          rx="4.5"
          fill="var(--background)"
          stroke="var(--ink)"
          strokeWidth="1.4"
        />
        {/* Dynamic Island */}
        <rect x="80" y="3.5" width="10" height="2" rx="1" fill="var(--ink)" opacity="0.8" />
        {/* Phone UI skeleton */}
        <rect x="76" y="8" width="18" height="9" rx="2" fill="var(--soft)" opacity="0.5" />
        <line x1="76" y1="21" x2="90" y2="21" stroke="var(--ink)" strokeWidth="1" opacity="0.6" />
        <line x1="76" y1="25" x2="86" y2="25" stroke="var(--soft)" strokeWidth="0.8" />
        <rect x="76" y="29" width="8" height="8" rx="1.5" fill="var(--soft)" opacity="0.4" />
        <rect x="86" y="29" width="8" height="8" rx="1.5" fill="var(--ink)" opacity="0.5" />
        {/* Home bar */}
        <line x1="81" y1="40" x2="89" y2="40" stroke="var(--soft)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function StarsVisual({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex flex-col justify-end w-full h-full pb-0.5">
      <div className="flex items-center gap-1.5 w-full">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            viewBox="0 0 24 24"
            fill="var(--ink)"
            className="w-5 h-5 transition-transform duration-200"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono tracking-wider text-[var(--text-muted)]">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
        <span>100% Verified Client Feedback</span>
      </div>
    </div>
  );
}

function DesignCraftVisual() {
  return (
    <div className="flex flex-col justify-end w-full h-full pb-0.5">
      <div className="flex items-center gap-1.5 w-full">
        <span className="px-2 py-0.5 rounded border border-[var(--soft)] text-[10px] font-mono font-medium text-[var(--ink)] bg-black/[0.02]">
          Figma
        </span>
        <span className="px-2 py-0.5 rounded border border-[var(--soft)] text-[10px] font-mono font-medium text-[var(--ink)] bg-black/[0.02]">
          Next.js
        </span>
        <span className="px-2 py-0.5 rounded border border-[var(--soft)] text-[10px] font-mono font-medium text-[var(--ink)] bg-black/[0.02]">
          Swift
        </span>
      </div>
      <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono text-[var(--text-muted)]">
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">60 FPS</span>
        <span className="opacity-40">•</span>
        <span>Sub-second Interactive</span>
      </div>
    </div>
  );
}

function GlobalNetworkVisual() {
  return (
    <div className={styles.agencyVisual}>
      <svg
        viewBox="0 0 130 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.draw}
      >
        <ellipse cx="65" cy="22" rx="58" ry="17" stroke="var(--soft)" strokeWidth="0.8" opacity="0.35" />
        <ellipse cx="65" cy="22" rx="38" ry="17" stroke="var(--soft)" strokeWidth="0.8" opacity="0.35" />
        <ellipse cx="65" cy="22" rx="18" ry="17" stroke="var(--soft)" strokeWidth="0.8" opacity="0.35" />
        <line x1="7" y1="22" x2="123" y2="22" stroke="var(--soft)" strokeWidth="0.8" opacity="0.35" />

        <path d="M22 20 Q 42 6, 62 16" stroke="var(--ink)" strokeWidth="1.2" strokeDasharray="2.5 2.5" opacity="0.75" />
        <path d="M62 16 Q 84 8, 102 24" stroke="var(--ink)" strokeWidth="1.2" strokeDasharray="2.5 2.5" opacity="0.75" />
        <path d="M62 16 Q 75 32, 88 28" stroke="var(--ink)" strokeWidth="1.2" strokeDasharray="2.5 2.5" opacity="0.6" />

        <circle cx="22" cy="20" r="3" fill="var(--ink)" />
        <circle cx="62" cy="16" r="3.2" fill="var(--ink)" />
        <circle cx="88" cy="28" r="2.5" fill="var(--ink)" />
        <circle cx="102" cy="24" r="2.8" fill="var(--ink)" />
      </svg>
    </div>
  );
}

function Visual({ visual }: { visual: StatVisual }) {
  switch (visual.kind) {
    case "devices":
      return <DevicesVisual />;
    case "stars":
      return <StarsVisual rating={visual.rating} />;
    case "craft":
      return <DesignCraftVisual />;
    case "network":
      return <GlobalNetworkVisual />;
    case "trend":
      return <Trend values={visual.values} />;
    case "uptime":
      return <Uptime days={visual.days} />;
    case "distribution":
      return (
        <Distribution
          bins={visual.bins}
          max={visual.max}
          marker={visual.marker}
          inverted={visual.inverted}
        />
      );
    case "map":
      return <WorldMap points={visual.points} />;
  }
}

/**
 * A band of three or four headline numbers, each with an optional tiny visual that proves it: a trend, an uptime strip,
 * a latency histogram, or a dotted world. The numbers count up in a staggered sequence the first time the band is in
 * view, then the visuals draw in. Hovering or focusing a stat swaps its detail line for one line of context and gives
 * its visual the accent. Numbers use tabular figures and reserve their final width; screen readers get final values.
 */
export const StatsBand = forwardRef<HTMLElement, StatsBandProps>(
  function StatsBand(
    {
      stats = exampleStats,
      layout = "plain",
      title,
      description,
      duration = 1.6,
      locale = "en-US",
      className,
    },
    ref,
  ) {
    const id = useId();
    const list = useRef<HTMLDListElement>(null);
    const inView = useInView(list, { once: true, amount: 0.4 });
    const reduced = useReducedMotionSafe();
    const withVisuals = stats.some((stat) => stat.visual);
    return (
      <section
        ref={ref}
        className={[styles.band, className].filter(Boolean).join(" ")}
        data-layout={layout}
        data-in-view={inView || reduced ? "" : undefined}
        aria-labelledby={title ? `${id}-title` : undefined}
        aria-label={title ? undefined : "Key numbers"}
      >
        <div className={styles.inner}>
          {(title || description) && (
            <header className={styles.header}>
              {title && (
                <h2 id={`${id}-title`} className={styles.title}>
                  {title}
                </h2>
              )}
              {description && (
                <p className={styles.description}>{description}</p>
              )}
            </header>
          )}
          <dl
            ref={list}
            className={styles.stats}
            data-count={Math.min(stats.length, 4)}
            data-visuals={withVisuals ? "" : undefined}
            style={
              {
                "--count": Math.min(stats.length, 4),
                "--draw": `${Math.round(duration * 420)}ms`,
              } as CSSProperties
            }
          >
            {stats.map((stat, index) => (
              <div
                key={`${stat.label}-${index}`}
                className={styles.stat}
                style={{ "--i": index } as CSSProperties}
                tabIndex={stat.context ? 0 : undefined}
                data-context={stat.context && stat.detail ? "" : undefined}
              >
                <dt className={styles.label}>{stat.label}</dt>
                <dd className={styles.figure}>
                  <CountUp
                    stat={stat}
                    run={inView}
                    delay={index * STAGGER}
                    duration={duration}
                    reduced={reduced}
                    locale={locale}
                  />
                </dd>
                {(stat.detail || stat.context) && (
                  <dd className={styles.caption}>
                    {stat.detail && (
                      <span className={styles.detail}>{stat.detail}</span>
                    )}
                    {stat.context && (
                      <span className={styles.context}>{stat.context}</span>
                    )}
                  </dd>
                )}
                {withVisuals && (
                  <dd className={styles.visual} aria-hidden="true">
                    {stat.visual && <Visual visual={stat.visual} />}
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </section>
    );
  },
);

StatsBand.displayName = "StatsBand";

export default StatsBand;
