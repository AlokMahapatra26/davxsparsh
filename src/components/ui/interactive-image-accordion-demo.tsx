"use client";

import React from "react";
import { LandingAccordionItem } from "@/components/ui/interactive-image-accordion";

export default function InteractiveAccordionDemo() {
  return (
    <div className="w-full bg-[#ebe8f9] py-12">
      <LandingAccordionItem />
    </div>
  );
}

export { InteractiveAccordionDemo as DemoOne };
