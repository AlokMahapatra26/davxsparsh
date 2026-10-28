import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
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
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
