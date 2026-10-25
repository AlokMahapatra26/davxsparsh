import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button relative isolate inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap outline-none select-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-zinc-950/30 focus-visible:ring-offset-1 rounded-xl cursor-pointer",
  {
    variants: {
      variant: {
        push: [
          "t-push",
          "bg-zinc-950 !text-white text-zinc-100",
          "border border-zinc-800",
          "shadow-[0_4px_0_0_#000000,0_7px_10px_-4px_rgba(0,0,0,0.25)]",
          "hover:bg-zinc-900 hover:shadow-[0_5px_0_0_#000000,0_9px_14px_-4px_rgba(0,0,0,0.3)]",
          "active:shadow-[0_1px_0_0_#000000,0_2px_4px_rgba(0,0,0,0.2)]",
          "[&_svg]:!text-white",
        ],
        "push-outline": [
          "t-push",
          "bg-white !text-zinc-900",
          "border border-zinc-300",
          "shadow-[0_4px_0_0_#d4d4d8,0_6px_8px_-3px_rgba(0,0,0,0.06)]",
          "hover:bg-zinc-50 hover:border-zinc-400 hover:shadow-[0_5px_0_0_#d4d4d8,0_8px_12px_-4px_rgba(0,0,0,0.08)]",
          "active:shadow-[0_1px_0_0_#d4d4d8,0_2px_4px_rgba(0,0,0,0.04)]",
          "[&_svg]:!text-zinc-900",
        ],
        "push-secondary": [
          "t-push",
          "bg-zinc-100 !text-zinc-900",
          "border border-zinc-200",
          "shadow-[0_3px_0_0_#e4e4e7,0_5px_8px_-3px_rgba(0,0,0,0.04)]",
          "hover:bg-zinc-200 hover:shadow-[0_4px_0_0_#d4d4d8,0_7px_10px_-3px_rgba(0,0,0,0.06)]",
          "active:shadow-[0_1px_0_0_#e4e4e7,0_2px_4px_rgba(0,0,0,0.03)]",
          "[&_svg]:!text-zinc-900",
        ],
        default:
          "bg-zinc-900 text-white shadow hover:bg-zinc-800 transition-colors",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700 transition-colors",
        outline:
          "border border-zinc-200 bg-white text-zinc-900 shadow-sm hover:bg-zinc-100 transition-colors",
        secondary:
          "bg-zinc-100 text-zinc-900 shadow-sm hover:bg-zinc-200 transition-colors",
        ghost:
          "text-zinc-900 hover:bg-zinc-100 hover:text-zinc-900 transition-colors",
        link:
          "text-zinc-900 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 text-xs font-mono",
        xs: "h-7 px-2.5 text-[11px] rounded-lg font-mono",
        sm: "h-8 px-3 text-xs font-mono rounded-lg",
        lg: "h-11 px-5 text-xs font-mono tracking-wide rounded-xl",
        xl: "h-12 px-6 text-sm font-mono tracking-wide rounded-xl",
        icon: "h-10 w-10 p-0 rounded-xl",
        "icon-sm": "h-8 w-8 p-0 rounded-lg",
        "icon-xs": "h-6 w-6 p-0 rounded-md",
      },
    },
    defaultVariants: {
      variant: "push",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "push", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
