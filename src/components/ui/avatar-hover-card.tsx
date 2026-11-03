"use client";

import React, { type ReactNode, useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export interface NativeHoverCardProps {
  /**
   * Image source URL
   */
  imageSrc?: string;
  /**
   * Alt text for the image
   */
  imageAlt?: string;
  /**
   * Display name
   */
  name: string;
  /**
   * Username or handle
   */
  username?: string;
  /**
   * Description or bio text
   */
  description?: string;
  /**
   * Button text
   * Default: "View Profile"
   */
  buttonText?: string;
  /**
   * Button click handler
   */
  onButtonClick?: () => void;
  /**
   * Custom button component
   */
  buttonContent?: ReactNode;
  /**
   * Size of the image when collapsed
   * Default: "md"
   */
  size?: "sm" | "md" | "lg" | "xl" | "badge";
  /**
   * Additional class names for the container
   */
  className?: string;
  /**
   * Additional class names for the popover card
   */
  cardClassName?: string;
  /**
   * Card variant style
   */
  variant?: "default" | "glass" | "bordered";
  /**
   * Custom avatar or trigger element (e.g. animated badge)
   */
  customAvatar?: ReactNode;
  /**
   * Popover card alignment
   */
  cardAlign?: "left" | "right" | "center";
  /**
   * Callback fired when open/hover state changes
   */
  onHoverChange?: (open: boolean) => void;
  /**
   * Trigger mode: "click" (default) or "hover"
   */
  trigger?: "click" | "hover";
  /**
   * Controlled open state
   */
  isOpen?: boolean;
  /**
   * Callback fired when open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Callback fired when closed
   */
  onClose?: () => void;
}

const imageSizeVariants: Record<string, string> = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-40 h-40",
  badge: "w-[95px] h-[95px]",
};

const cardWidthVariants: Record<string, string> = {
  sm: "w-56",
  md: "w-72",
  lg: "w-80",
  xl: "w-96",
  badge: "w-80",
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function Component({
  imageSrc = "",
  imageAlt,
  name,
  username,
  description,
  buttonText = "View Profile",
  onButtonClick,
  buttonContent,
  size = "md",
  className,
  cardClassName,
  variant = "glass",
  customAvatar,
  cardAlign = "left",
  onHoverChange,
  trigger = "click",
  isOpen: controlledIsOpen,
  onOpenChange,
  onClose,
}: NativeHoverCardProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledIsOpen !== undefined;
  const isCardOpen = isControlled ? controlledIsOpen : internalOpen;

  const handleOpen = () => {
    if (!isControlled) {
      setInternalOpen(true);
    }
    onOpenChange?.(true);
    onHoverChange?.(true);
  };

  const handleClose = () => {
    if (!isControlled) {
      setInternalOpen(false);
    }
    onOpenChange?.(false);
    onHoverChange?.(false);
    onClose?.();
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    if (trigger === "click") {
      e.stopPropagation();
      if (isCardOpen) {
        handleClose();
      } else {
        handleOpen();
      }
    }
  };

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      handleOpen();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "hover") {
      handleClose();
    }
  };

  // Close on Click Outside or Escape Key
  useEffect(() => {
    if (!isCardOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCardOpen]);

  const getVariantStyles = () => {
    switch (variant) {
      case "glass":
        return "bg-[#09090b]/95 backdrop-blur-2xl border border-white/20 !text-white shadow-[0_25px_60px_rgba(0,0,0,0.95)] ring-1 ring-white/10";
      case "bordered":
        return "bg-[#111114] border-2 border-primary/30 !text-white shadow-2xl";
      default:
        return "bg-card border border-border shadow-lg";
    }
  };

  const getAlignStyles = () => {
    switch (cardAlign) {
      case "right":
        return "right-0 top-0";
      case "center":
        return "right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 top-0";
      case "left":
      default:
        return "right-0 sm:right-auto sm:left-0 top-0";
    }
  };

  // Avatar component - renders a fresh instance to ensure updates/animations work
  const avatarElement = customAvatar ? (
    <div className="w-full h-full flex items-center justify-center">
      {customAvatar}
    </div>
  ) : (
    <Avatar className="w-full h-full">
      <AvatarImage
        src={imageSrc || "/placeholder.svg"}
        alt={imageAlt || name}
      />
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  );

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative inline-block", isCardOpen ? "z-50" : "z-10", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={false}
      animate={{
        width: isCardOpen ? "auto" : "fit-content",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Clickable Trigger Badge */}
      <motion.div
        className={cn(
          "relative rounded-full cursor-pointer select-none",
          customAvatar ? "overflow-visible" : "overflow-hidden",
          imageSizeVariants[size] || imageSizeVariants.md
        )}
        onClick={handleTriggerClick}
        layout
        animate={{
          padding: isCardOpen ? "8px" : "0px",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        {avatarElement}
      </motion.div>

      {/* Expanded Card Content */}
      <AnimatePresence>
        {isCardOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute rounded-2xl shadow-2xl overflow-hidden z-50",
              cardWidthVariants[size] || cardWidthVariants.md,
              getAlignStyles(),
              getVariantStyles(),
              cardClassName
            )}
            style={{ pointerEvents: "auto" }}
          >
            {/* Background with close icon and avatar header */}
            <div className="relative">
              {/* Close Button in Top Right */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                aria-label="Close card"
                className="absolute top-3.5 right-3.5 z-50 w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 active:bg-white/40 text-white flex items-center justify-center transition-all duration-150 cursor-pointer backdrop-blur-md border border-white/20 hover:scale-105 active:scale-95 shadow-sm"
              >
                <X className="w-3.5 h-3.5 text-white" />
              </button>

              <motion.div className="relative p-3.5 pb-1 flex justify-start items-center">
                <div className={cn(imageSizeVariants[size] || imageSizeVariants.md)}>
                  {avatarElement}
                </div>
              </motion.div>

              {/* Content Section */}
              <motion.div
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                transition={{
                  delay: 0.08,
                  duration: 0.2,
                }}
                className="p-5 pt-1 space-y-3"
              >
                {/* Name */}
                <div>
                  <motion.h3
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 }}
                    className="text-base sm:text-lg font-bold !text-white leading-tight tracking-tight drop-shadow-md pr-6"
                    style={{ color: "#ffffff" }}
                  >
                    {name}
                  </motion.h3>

                  {/* Username */}
                  {username && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      className="text-xs sm:text-sm !text-zinc-400 font-mono mt-0.5 drop-shadow-sm"
                      style={{ color: "#a1a1aa" }}
                    >
                      @{username}
                    </motion.p>
                  )}
                </div>

                {/* Description */}
                {description && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 }}
                    className="text-xs sm:text-sm !text-zinc-200 leading-relaxed drop-shadow-sm"
                    style={{ color: "#e4e4e7" }}
                  >
                    {description}
                  </motion.p>
                )}

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 }}
                  className="pt-1"
                >
                  {buttonContent ? (
                    buttonContent
                  ) : (
                    <Button
                      onClick={onButtonClick}
                      size="sm"
                      className="w-full bg-[#9eff3e] !text-black hover:bg-white hover:!text-black font-bold transition-colors duration-200"
                      style={{ color: "#000000", backgroundColor: "#9eff3e" }}
                    >
                      <span className="!text-black font-bold" style={{ color: "#000000" }}>
                        {buttonText}
                      </span>
                    </Button>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export { Component as AvatarHoverCard, Component as NativeHoverCard };
export default Component;
