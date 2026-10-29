'use client';

import React, { useRef } from 'react';
import { ThumbnailTrailOverlay } from '@/components/ui/thumbnail-trail';

export default function ThumbnailTrailDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-neutral-950 px-6 text-center text-white"
    >
      <ThumbnailTrailOverlay containerRef={containerRef} className="z-10" />

      <div className="relative z-20 max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-widest text-indigo-400">
          Interactive Mouse Stamp Trail
        </span>
        <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">
          Move your cursor around
        </h1>
        <p className="mt-4 text-base text-neutral-400 md:text-lg">
          Cards scatter dynamically behind your mouse movement with organic tilts, drop shadows, and automatic fade-outs.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-neutral-200">
            Hovering buttons pauses stamps
          </button>
        </div>
      </div>
    </div>
  );
}
