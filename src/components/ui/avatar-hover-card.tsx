"use client";

import React, {
  type ReactNode,
  useState,
  useEffect,
  useRef,
  useCallback,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
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
   * Custom body rendered in place of the description box
   */
  bodyContent?: ReactNode;
  /**
   * Hide the footer action area (buttons)
   */
  hideActions?: boolean;
  /**
   * Hide the circular avatar/badge in the open card header
   */
  hideHeaderAvatar?: boolean;
  /**
   * Hide the whole header (avatar, title, username) in the open card
   */
  hideHeader?: boolean;
  /**
   * Open card color theme. Default: "dark"
   */
  cardTheme?: "dark" | "light";
  /**
   * Extra class names for the open card title
   */
  titleClassName?: string;
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
  bodyContent,
  hideActions = false,
  hideHeaderAvatar = false,
  hideHeader = false,
  cardTheme = "dark",
  titleClassName,
  size = "md",
  className,
  cardClassName,
  customAvatar,
  onHoverChange,
  trigger = "click",
  isOpen: controlledIsOpen,
  onOpenChange,
  onClose,
}: NativeHoverCardProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // React 19 recommended client mounting check (no effect cascade)
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const isControlled = controlledIsOpen !== undefined;
  const isCardOpen = isControlled ? controlledIsOpen : internalOpen;

  const handleOpen = useCallback(() => {
    if (!isControlled) {
      setInternalOpen(true);
    }
    onOpenChange?.(true);
    onHoverChange?.(true);
  }, [isControlled, onOpenChange, onHoverChange]);

  const handleClose = useCallback(() => {
    if (!isControlled) {
      setInternalOpen(false);
    }
    onOpenChange?.(false);
    onHoverChange?.(false);
    onClose?.();
  }, [isControlled, onOpenChange, onHoverChange, onClose]);

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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isCardOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isCardOpen]);

  // Close on Escape Key
  useEffect(() => {
    if (!isCardOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCardOpen, handleClose]);

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
    <>
      <div
        ref={containerRef}
        className={cn("relative inline-block", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Clickable Trigger Badge */}
        <div
          className={cn(
            "relative rounded-full cursor-pointer select-none transition-transform duration-200 hover:scale-105 active:scale-95",
            customAvatar ? "overflow-visible" : "overflow-hidden",
            imageSizeVariants[size] || imageSizeVariants.md
          )}
          onClick={handleTriggerClick}
        >
          {avatarElement}
        </div>
      </div>

      {/* 4x Center Modal via Portal */}
      {isMounted &&
        createPortal(
          <AnimatePresence>
            {isCardOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-lg"
                onClick={handleClose}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 16 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  className={cn(
                    "relative w-full max-w-[1040px] min-h-[520px] sm:min-h-[600px] flex flex-col justify-between rounded-[36px] sm:rounded-[44px] overflow-hidden p-8 sm:p-12 md:p-14",
                    cardTheme === "light"
                      ? "bg-white backdrop-blur-2xl border border-black/10 text-black shadow-[0_30px_90px_rgba(0,0,0,0.35)] ring-1 ring-black/5"
                      : "bg-zinc-950/95 backdrop-blur-2xl border border-white/20 text-white shadow-[0_30px_90px_rgba(0,0,0,0.95)] ring-1 ring-white/10",
                    cardClassName
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button in Top Right */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClose();
                    }}
                    aria-label="Close modal"
                    className={cn(
                      "absolute top-6 right-6 sm:top-8 sm:right-8 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer backdrop-blur-md border hover:scale-110 active:scale-95 shadow-md",
                      cardTheme === "light"
                        ? "bg-black/5 hover:bg-black/10 active:bg-black/20 text-black border-black/15"
                        : "bg-white/10 hover:bg-white/25 active:bg-white/40 text-white border-white/20"
                    )}
                  >
                    <X className={cn("w-6 h-6", cardTheme === "light" ? "text-black" : "text-white")} />
                  </button>

                  {/* Header with Circular Badge and Titles */}
                  <div className={cn("flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 mb-6 pt-1", hideHeader && "hidden")}>
                    {!hideHeaderAvatar && (
                      <div className="w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] shrink-0 flex items-center justify-center rounded-3xl bg-white/[0.04] border border-white/10 p-2 shadow-inner">
                        <div className="scale-105 sm:scale-115 flex items-center justify-center">
                          {avatarElement}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2 flex-1 pr-12">
                      <h3
                        className={cn(
                          "text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] tracking-tight drop-shadow-md",
                          cardTheme === "light" ? "!text-black" : "!text-white",
                          titleClassName
                        )}
                        style={{ color: cardTheme === "light" ? "#000000" : "#ffffff" }}
                      >
                        {name}
                      </h3>

                      {username && (
                        <p
                          className="text-sm sm:text-base font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-1.5 rounded-full inline-block mt-2"
                          style={{ color: "#34d399" }}
                        >
                          @{username}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Custom body (e.g. map) */}
                  {bodyContent && (
                    <div className="my-4 sm:my-6 flex-1 flex items-center justify-center">
                      <div className="w-full">{bodyContent}</div>
                    </div>
                  )}

                  {/* Description Box (Spacious Grand Body) */}
                  {!bodyContent && description && (
                    <div className="my-6 sm:my-8 p-6 sm:p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/10 flex-1 flex items-center">
                      <p
                        className="text-base sm:text-xl md:text-2xl !text-zinc-200 leading-relaxed font-normal"
                        style={{ color: "#e4e4e7" }}
                      >
                        {description}
                      </p>
                    </div>
                  )}

                  {/* Action CTA Buttons */}
                  {!hideActions && (
                  <div className="pt-4 border-t border-white/10">
                    {buttonContent ? (
                      buttonContent
                    ) : (
                      <Button
                        onClick={onButtonClick}
                        size="lg"
                        className="w-full h-14 sm:h-16 bg-[#9eff3e] !text-black hover:bg-white hover:!text-black font-bold text-lg rounded-2xl transition-all shadow-md cursor-pointer"
                        style={{ color: "#000000", backgroundColor: "#9eff3e" }}
                      >
                        <span className="!text-black font-bold" style={{ color: "#000000" }}>
                          {buttonText}
                        </span>
                      </Button>
                    )}
                  </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

export { Component as AvatarHoverCard, Component as NativeHoverCard };
export default Component;
