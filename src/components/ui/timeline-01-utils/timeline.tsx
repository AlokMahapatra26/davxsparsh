"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  title: string;
  description: string;
  date: string;
  image?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative w-full py-8 md:py-14", className)}>
      {/* Central/Left connecting vertical rail line */}
      <div className="relative space-y-12 md:space-y-20">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14 items-center px-4 sm:px-8 md:px-12"
            >
              {/* Text Milestone Information */}
              <div
                className={cn(
                  "space-y-3 sm:space-y-4",
                  isEven ? "md:order-1" : "md:order-2"
                )}
              >
                <div className="inline-flex items-center gap-2">
                  <span className="px-3 py-1 text-xs font-mono font-bold tracking-wider rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {item.date}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    Milestone 0{index + 1}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Showcase Image Media */}
              <div
                className={cn(
                  "relative aspect-video sm:aspect-[16/10] w-full overflow-hidden rounded-3xl border border-border/70 bg-card/60 shadow-xl group",
                  isEven ? "md:order-2" : "md:order-1"
                )}
              >
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                {/* Subtle vignette gloss */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Timeline;
