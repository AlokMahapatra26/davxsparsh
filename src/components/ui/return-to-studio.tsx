"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export function ReturnToStudio({ className }: { className?: string } = {}) {
  const handleReturn = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("return_to_section", "services");
      if (window.history.length > 1 && document.referrer && document.referrer.includes(window.location.host)) {
        window.history.back();
        return;
      }
      window.location.href = "/#services";
    }
  };

  return (
    <Button
      variant="push-outline"
      size="sm"
      onClick={handleReturn}
      className={cn("gap-2 cursor-pointer", className)}
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      <span>Return to Services</span>
    </Button>
  );
}
