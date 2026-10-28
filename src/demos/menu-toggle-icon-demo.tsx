"use client";

import React, { useState } from "react";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";

export default function MenuToggleIconDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-[300px] w-full items-center justify-center bg-background p-8">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-delicate)] hover:border-[var(--border-medium)] transition-all cursor-pointer shadow-subtle hover:scale-105"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <MenuToggleIcon open={open} className="w-16 h-16 text-foreground" duration={500} />
      </button>
    </div>
  );
}
