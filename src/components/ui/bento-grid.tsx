"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// Animation variants for the container to stagger children
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Animation variants for each grid item
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 14,
    },
  },
};

export type BentoPattern =
  | "hero-top-left"   // Pattern 1 (Image 1): 2x2 Wide Hero on Top-Left
  | "center-tall"     // Pattern 2 (Image 2): 1x3 Tall Hero in Center
  | "hero-top-right"  // Pattern 3: 2x2 Wide Hero on Top-Right
  | "hero-left-tall"  // Pattern 4: 1x3 Tall Hero on Left, 2x1 Metric bottom-right
  | "split-editorial";// Pattern 5: Top 3 cards, 2x2 Wide Hero on Bottom-Left

export interface BentoGridShowcaseProps {
  /** Slot for Integrations / Stack & Standards */
  integrations: React.ReactNode;
  /** Slot for Feature Tags / Core Tenets */
  featureTags: React.ReactNode;
  /** Slot for Main Feature Showcase */
  mainFeature: React.ReactNode;
  /** Slot for Secondary Feature / Pillar */
  secondaryFeature: React.ReactNode;
  /** Slot for Statistic & Verified Metric */
  statistic: React.ReactNode;
  /** Slot for Delivery Cadence & Team Journey */
  journey: React.ReactNode;
  /** Optional class names for the grid container */
  className?: string;
  /** Default or controlled pattern */
  pattern?: BentoPattern;
  defaultPattern?: BentoPattern;
  /** Whether to render the interactive pattern switcher pill buttons */
  showPatternSwitcher?: boolean;
}

const PATTERN_OPTIONS: { id: BentoPattern; label: string; desc: string }[] = [
  { id: "hero-top-left", label: "Alpha • Top-Left", desc: "Wide 2x2 Hero (Reference 1)" },
  { id: "center-tall", label: "Beta • Center", desc: "Center Tall (Reference 2)" },
  { id: "hero-top-right", label: "Gamma • Top-Right", desc: "Wide 2x2 Hero on Right" },
  { id: "hero-left-tall", label: "Delta • Left Pillar", desc: "Mobile Viewport Pillar on Left" },
  { id: "split-editorial", label: "Epsilon • Editorial", desc: "Editorial Magazine Top Row" },
];

/**
 * A responsive, polymorphic Bento Grid layout component.
 * Supports 5 distinct architectural patterns, including the wide hero (Image 1)
 * and center tall centerpiece (Image 2).
 */
export const BentoGridShowcase = ({
  integrations,
  featureTags,
  mainFeature,
  secondaryFeature,
  statistic,
  journey,
  className,
  pattern,
  defaultPattern = "hero-top-left",
  showPatternSwitcher = true,
}: BentoGridShowcaseProps) => {
  const [internalPattern, setInternalPattern] = React.useState<BentoPattern>(
    pattern || defaultPattern
  );

  // Sync if prop changes externally
  React.useEffect(() => {
    if (pattern) {
      setInternalPattern(pattern);
    }
  }, [pattern]);

  const activePattern = pattern || internalPattern;

  return (
    <div className="w-full">
      {/* Interactive Bento Architecture Pattern Switcher */}
      {showPatternSwitcher && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 px-1">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00e1c2] shadow-[0_0_8px_#00e1c2] shrink-0" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-bold">
              Bento Architecture
            </span>
            <span className="text-zinc-300 font-medium hidden sm:inline">•</span>
            <span className="text-xs text-zinc-600 font-medium hidden sm:inline capitalize">
              {activePattern.replace(/-/g, " ")} Pattern
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-white/80 border border-zinc-200/90 shadow-2xs backdrop-blur-md self-start sm:self-auto">
            {PATTERN_OPTIONS.map((p) => {
              const isActive = activePattern === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setInternalPattern(p.id)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-zinc-950 text-white shadow-xs"
                      : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
                  )}
                  title={p.desc}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Dynamic Animated Grid */}
      <motion.section
        layout
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={activePattern}
        className={cn(
          "grid w-full grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-[repeat(3,186px)]",
          className
        )}
      >
        {activePattern === "hero-top-left" && (
          <>
            {/* Slot: Main Feature (Top Left 2x2) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-2 md:row-span-2 md:col-start-1 md:row-start-1 h-full min-h-[380px] md:min-h-0"
            >
              {mainFeature}
            </motion.div>

            {/* Slot: Statistic (Top Right 1x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-1 h-full min-h-[186px] md:min-h-0"
            >
              {statistic}
            </motion.div>

            {/* Slot: Feature Tags (Middle Right 1x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-2 h-full min-h-[186px] md:min-h-0"
            >
              {featureTags}
            </motion.div>

            {/* Slot: Journey (Bottom Left 1x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-3 h-full min-h-[186px] md:min-h-0"
            >
              {journey}
            </motion.div>

            {/* Slot: Integrations (Bottom Center 1x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-3 h-full min-h-[186px] md:min-h-0"
            >
              {integrations}
            </motion.div>

            {/* Slot: Secondary Feature (Bottom Right 1x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-3 h-full min-h-[186px] md:min-h-0"
            >
              {secondaryFeature}
            </motion.div>
          </>
        )}

        {activePattern === "center-tall" && (
          <>
            {/* Slot: Integrations (Top Left 1x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-1 h-full min-h-[186px] md:min-h-0"
            >
              {integrations}
            </motion.div>

            {/* Slot: Main Feature (Center Tall 1x3) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-3 md:col-start-2 md:row-start-1 h-full min-h-[440px] md:min-h-0"
            >
              {mainFeature}
            </motion.div>

            {/* Slot: Feature Tags (Top Right 1x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-1 h-full min-h-[186px] md:min-h-0"
            >
              {featureTags}
            </motion.div>

            {/* Slot: Secondary Feature (Middle Left 1x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-2 h-full min-h-[186px] md:min-h-0"
            >
              {secondaryFeature}
            </motion.div>

            {/* Slot: Statistic (Right Tall 1x2) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-2 md:col-start-3 md:row-start-2 h-full min-h-[300px] md:min-h-0"
            >
              {statistic}
            </motion.div>

            {/* Slot: Journey (Bottom Left 1x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-3 h-full min-h-[186px] md:min-h-0"
            >
              {journey}
            </motion.div>
          </>
        )}

        {activePattern === "hero-top-right" && (
          <>
            {/* Slot: Integrations (Top Left 1x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-1 h-full min-h-[186px] md:min-h-0"
            >
              {integrations}
            </motion.div>

            {/* Slot: Feature Tags (Middle Left 1x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-2 h-full min-h-[186px] md:min-h-0"
            >
              {featureTags}
            </motion.div>

            {/* Slot: Main Feature (Top Right 2x2) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-2 md:row-span-2 md:col-start-2 md:row-start-1 h-full min-h-[380px] md:min-h-0"
            >
              {mainFeature}
            </motion.div>

            {/* Slot: Secondary Feature (Bottom Left 1x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-3 h-full min-h-[186px] md:min-h-0"
            >
              {secondaryFeature}
            </motion.div>

            {/* Slot: Journey (Bottom Center 1x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-3 h-full min-h-[186px] md:min-h-0"
            >
              {journey}
            </motion.div>

            {/* Slot: Statistic (Bottom Right 1x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-3 h-full min-h-[186px] md:min-h-0"
            >
              {statistic}
            </motion.div>
          </>
        )}

        {activePattern === "hero-left-tall" && (
          <>
            {/* Slot: Main Feature (Left Tall 1x3) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-3 md:col-start-1 md:row-start-1 h-full min-h-[440px] md:min-h-0"
            >
              {mainFeature}
            </motion.div>

            {/* Slot: Integrations (Top Center 1x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-1 h-full min-h-[186px] md:min-h-0"
            >
              {integrations}
            </motion.div>

            {/* Slot: Feature Tags (Top Right 1x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-1 h-full min-h-[186px] md:min-h-0"
            >
              {featureTags}
            </motion.div>

            {/* Slot: Secondary Feature (Middle Center 1x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-2 h-full min-h-[186px] md:min-h-0"
            >
              {secondaryFeature}
            </motion.div>

            {/* Slot: Journey (Middle Right 1x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-2 h-full min-h-[186px] md:min-h-0"
            >
              {journey}
            </motion.div>

            {/* Slot: Statistic (Bottom Right 2x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-2 md:row-span-1 md:col-start-2 md:row-start-3 h-full min-h-[186px] md:min-h-0"
            >
              {statistic}
            </motion.div>
          </>
        )}

        {activePattern === "split-editorial" && (
          <>
            {/* Slot: Integrations (Top Left 1x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-1 h-full min-h-[186px] md:min-h-0"
            >
              {integrations}
            </motion.div>

            {/* Slot: Feature Tags (Top Center 1x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-1 h-full min-h-[186px] md:min-h-0"
            >
              {featureTags}
            </motion.div>

            {/* Slot: Secondary Feature (Top Right 1x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-1 h-full min-h-[186px] md:min-h-0"
            >
              {secondaryFeature}
            </motion.div>

            {/* Slot: Main Feature (Bottom Left 2x2) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-2 md:row-span-2 md:col-start-1 md:row-start-2 h-full min-h-[380px] md:min-h-0"
            >
              {mainFeature}
            </motion.div>

            {/* Slot: Journey (Middle Right 1x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-2 h-full min-h-[186px] md:min-h-0"
            >
              {journey}
            </motion.div>

            {/* Slot: Statistic (Bottom Right 1x1) */}
            <motion.div
              layout
              variants={itemVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-3 h-full min-h-[186px] md:min-h-0"
            >
              {statistic}
            </motion.div>
          </>
        )}
      </motion.section>
    </div>
  );
};
