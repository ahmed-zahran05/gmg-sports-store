import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

interface ButtonProps {
  asChild?: boolean;
  size?: "default" | "sm" | "lg";
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
}

export function Button({ asChild, size = "default", variant = "primary", children, ...props }: ButtonProps & Omit<ComponentPropsWithoutRef<"button">, "asChild">) {
  const Comp: ElementType = asChild ? Slot : "button";
  return (
    <Comp
      className={clsx(
        "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gmg-gold-500",
        // Primary - Gold accent on black
        variant === "primary" && "bg-gmg-gold-500 text-gmg-black-900 shadow-premium hover:bg-gmg-gold-400 hover:shadow-elevated active:scale-95",
        // Secondary - Black with gold border
        variant === "secondary" && "bg-gmg-black-700 text-gmg-gold-400 border-2 border-gmg-gold-500 hover:bg-gmg-black-600 hover:border-gmg-gold-400",
        // Ghost - Transparent with gold text
        variant === "ghost" && "bg-transparent text-gmg-gold-500 hover:bg-gmg-gold-500/10 border-2 border-transparent hover:border-gmg-gold-500/30",
        size === "sm" && "h-9 px-4 text-sm",
        size === "lg" && "h-12 px-6 text-base",
        size === "default" && "h-11 px-5 text-sm"
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
