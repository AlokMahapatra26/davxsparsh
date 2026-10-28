"use client";

import React, { useRef } from "react";
import { useInView } from "motion/react";
import { CountingNumber } from "@/components/ui/counting-number";

export interface StatItem {
  target: number;
  suffix?: string;
  label: string;
  description?: string;
}

const defaultStats: StatItem[] = [
  {
    target: 83,
    suffix: "+",
    label: "Components shipped",
    description: "Design systems & modular UI",
  },
  {
    target: 2,
    suffix: "K",
    label: "GitHub stars",
    description: "Ecosystem community reach",
  },
  {
    target: 49,
    suffix: "K",
    label: "Monthly downloads",
    description: "Production workflows powered",
  },
  {
    target: 19,
    suffix: "",
    label: "Contributors",
    description: "Systems engineers & designers",
  },
];

export function CountingStatsSection({
  stats = defaultStats,
}: {
  stats?: StatItem[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={containerRef}
      id="metrics"
      className="relative w-full py-16 sm:py-20 bg-white border-y border-zinc-100 overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 sm:mb-14">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-zinc-500 block mb-2">
              Scale &amp; Impact
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
              Engineered with Precision
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-xs sm:text-sm text-zinc-600 max-w-sm leading-relaxed">
            Measurable traction across robust cloud foundations and sensory interface systems.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="group relative p-6 sm:p-7 rounded-2xl bg-zinc-50/80 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-baseline gap-1 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 group-hover:text-blue-600 transition-colors">
                <CountingNumber
                  target={stat.target}
                  autoStart={isInView}
                  transition={{ duration: 2.2 + idx * 0.15, ease: "easeOut" }}
                />
                <span className="text-blue-600 group-hover:text-blue-700 transition-colors">
                  {stat.suffix}
                </span>
              </div>
              <p className="mt-3 text-xs sm:text-sm font-semibold text-zinc-900 tracking-wide">
                {stat.label}
              </p>
              {stat.description && (
                <p className="mt-1 text-xs text-zinc-500">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CountingStatsSection;
