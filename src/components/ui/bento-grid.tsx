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

// Left card variant - enters smoothly from the left on scroll
const cardFromLeftVariants: Variants = {
  hidden: { opacity: 0, x: -75 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Right card variant - enters smoothly from the right on scroll
const cardFromRightVariants: Variants = {
  hidden: { opacity: 0, x: 75 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Center card variant - enters smoothly from bottom on scroll
const cardCenterVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const itemVariants: Variants = cardCenterVariants;

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
}: BentoGridShowcaseProps) => {
  const activePattern = pattern || defaultPattern;

  return (
    <div className="w-full">

      {/* Dynamic Animated Grid */}
      <motion.section
        layout
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        key={activePattern}
        className={cn(
          "grid w-full grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-[repeat(3,186px)] overflow-hidden sm:overflow-visible",
          className
        )}
      >
        {activePattern === "hero-top-left" && (
          <>
            {/* Slot: Main Feature (Top Left 2x2 - Enters from LEFT) */}
            <motion.div
              layout
              variants={cardFromLeftVariants}
              className="md:col-span-2 md:row-span-2 md:col-start-1 md:row-start-1 h-full min-h-[380px] md:min-h-0"
            >
              {mainFeature}
            </motion.div>

            {/* Slot: Statistic (Top Right 1x1 - Enters from RIGHT) */}
            <motion.div
              layout
              variants={cardFromRightVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-1 h-full min-h-[186px] md:min-h-0"
            >
              {statistic}
            </motion.div>

            {/* Slot: Feature Tags (Middle Right 1x1 - Enters from RIGHT) */}
            <motion.div
              layout
              variants={cardFromRightVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-2 h-full min-h-[186px] md:min-h-0"
            >
              {featureTags}
            </motion.div>

            {/* Slot: Journey (Bottom Left 1x1 - Enters from LEFT) */}
            <motion.div
              layout
              variants={cardFromLeftVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-3 h-full min-h-[186px] md:min-h-0"
            >
              {journey}
            </motion.div>

            {/* Slot: Integrations (Bottom Center 1x1 - Enters from CENTER) */}
            <motion.div
              layout
              variants={cardCenterVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-3 h-full min-h-[186px] md:min-h-0"
            >
              {integrations}
            </motion.div>

            {/* Slot: Secondary Feature (Bottom Right 1x1 - Enters from RIGHT) */}
            <motion.div
              layout
              variants={cardFromRightVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-3 h-full min-h-[186px] md:min-h-0"
            >
              {secondaryFeature}
            </motion.div>
          </>
        )}

        {activePattern === "center-tall" && (
          <>
            {/* Slot: Integrations (Top Left 1x1 - Enters from LEFT) */}
            <motion.div
              layout
              variants={cardFromLeftVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-1 h-full min-h-[186px] md:min-h-0"
            >
              {integrations}
            </motion.div>

            {/* Slot: Main Feature (Center Tall 1x3 - Enters from CENTER) */}
            <motion.div
              layout
              variants={cardCenterVariants}
              className="md:col-span-1 md:row-span-3 md:col-start-2 md:row-start-1 h-full min-h-[440px] md:min-h-0"
            >
              {mainFeature}
            </motion.div>

            {/* Slot: Feature Tags (Top Right 1x1 - Enters from RIGHT) */}
            <motion.div
              layout
              variants={cardFromRightVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-1 h-full min-h-[186px] md:min-h-0"
            >
              {featureTags}
            </motion.div>

            {/* Slot: Secondary Feature (Middle Left 1x1 - Enters from LEFT) */}
            <motion.div
              layout
              variants={cardFromLeftVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-2 h-full min-h-[186px] md:min-h-0"
            >
              {secondaryFeature}
            </motion.div>

            {/* Slot: Statistic (Right Tall 1x2 - Enters from RIGHT) */}
            <motion.div
              layout
              variants={cardFromRightVariants}
              className="md:col-span-1 md:row-span-2 md:col-start-3 md:row-start-2 h-full min-h-[300px] md:min-h-0"
            >
              {statistic}
            </motion.div>

            {/* Slot: Journey (Bottom Left 1x1 - Enters from LEFT) */}
            <motion.div
              layout
              variants={cardFromLeftVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-3 h-full min-h-[186px] md:min-h-0"
            >
              {journey}
            </motion.div>
          </>
        )}

        {activePattern === "hero-top-right" && (
          <>
            {/* Slot: Integrations (Top Left 1x1 - Enters from LEFT) */}
            <motion.div
              layout
              variants={cardFromLeftVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-1 h-full min-h-[186px] md:min-h-0"
            >
              {integrations}
            </motion.div>

            {/* Slot: Feature Tags (Middle Left 1x1 - Enters from LEFT) */}
            <motion.div
              layout
              variants={cardFromLeftVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-2 h-full min-h-[186px] md:min-h-0"
            >
              {featureTags}
            </motion.div>

            {/* Slot: Main Feature (Top Right 2x2 - Enters from RIGHT) */}
            <motion.div
              layout
              variants={cardFromRightVariants}
              className="md:col-span-2 md:row-span-2 md:col-start-2 md:row-start-1 h-full min-h-[380px] md:min-h-0"
            >
              {mainFeature}
            </motion.div>

            {/* Slot: Secondary Feature (Bottom Left 1x1 - Enters from LEFT) */}
            <motion.div
              layout
              variants={cardFromLeftVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-3 h-full min-h-[186px] md:min-h-0"
            >
              {secondaryFeature}
            </motion.div>

            {/* Slot: Journey (Bottom Center 1x1 - Enters from CENTER) */}
            <motion.div
              layout
              variants={cardCenterVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-3 h-full min-h-[186px] md:min-h-0"
            >
              {journey}
            </motion.div>

            {/* Slot: Statistic (Bottom Right 1x1 - Enters from RIGHT) */}
            <motion.div
              layout
              variants={cardFromRightVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-3 h-full min-h-[186px] md:min-h-0"
            >
              {statistic}
            </motion.div>
          </>
        )}

        {activePattern === "hero-left-tall" && (
          <>
            {/* Slot: Main Feature (Left Tall 1x3 - Enters from LEFT) */}
            <motion.div
              layout
              variants={cardFromLeftVariants}
              className="md:col-span-1 md:row-span-3 md:col-start-1 md:row-start-1 h-full min-h-[440px] md:min-h-0"
            >
              {mainFeature}
            </motion.div>

            {/* Slot: Integrations (Top Center 1x1 - Enters from CENTER) */}
            <motion.div
              layout
              variants={cardCenterVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-1 h-full min-h-[186px] md:min-h-0"
            >
              {integrations}
            </motion.div>

            {/* Slot: Feature Tags (Top Right 1x1 - Enters from RIGHT) */}
            <motion.div
              layout
              variants={cardFromRightVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-1 h-full min-h-[186px] md:min-h-0"
            >
              {featureTags}
            </motion.div>

            {/* Slot: Secondary Feature (Middle Center 1x1 - Enters from CENTER) */}
            <motion.div
              layout
              variants={cardCenterVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-2 h-full min-h-[186px] md:min-h-0"
            >
              {secondaryFeature}
            </motion.div>

            {/* Slot: Journey (Middle Right 1x1 - Enters from RIGHT) */}
            <motion.div
              layout
              variants={cardFromRightVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-2 h-full min-h-[186px] md:min-h-0"
            >
              {journey}
            </motion.div>

            {/* Slot: Statistic (Bottom Right 2x1 - Enters from RIGHT) */}
            <motion.div
              layout
              variants={cardFromRightVariants}
              className="md:col-span-2 md:row-span-1 md:col-start-2 md:row-start-3 h-full min-h-[186px] md:min-h-0"
            >
              {statistic}
            </motion.div>
          </>
        )}

        {activePattern === "split-editorial" && (
          <>
            {/* Slot: Integrations (Top Left 1x1 - Enters from LEFT) */}
            <motion.div
              layout
              variants={cardFromLeftVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-1 h-full min-h-[186px] md:min-h-0"
            >
              {integrations}
            </motion.div>

            {/* Slot: Feature Tags (Top Center 1x1 - Enters from CENTER) */}
            <motion.div
              layout
              variants={cardCenterVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-1 h-full min-h-[186px] md:min-h-0"
            >
              {featureTags}
            </motion.div>

            {/* Slot: Secondary Feature (Top Right 1x1 - Enters from RIGHT) */}
            <motion.div
              layout
              variants={cardFromRightVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-1 h-full min-h-[186px] md:min-h-0"
            >
              {secondaryFeature}
            </motion.div>

            {/* Slot: Main Feature (Bottom Left 2x2 - Enters from LEFT) */}
            <motion.div
              layout
              variants={cardFromLeftVariants}
              className="md:col-span-2 md:row-span-2 md:col-start-1 md:row-start-2 h-full min-h-[380px] md:min-h-0"
            >
              {mainFeature}
            </motion.div>

            {/* Slot: Journey (Middle Right 1x1 - Enters from RIGHT) */}
            <motion.div
              layout
              variants={cardFromRightVariants}
              className="md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-2 h-full min-h-[186px] md:min-h-0"
            >
              {journey}
            </motion.div>

            {/* Slot: Statistic (Bottom Right 1x1 - Enters from RIGHT) */}
            <motion.div
              layout
              variants={cardFromRightVariants}
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
