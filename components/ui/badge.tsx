import { clsx } from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "ghost" | "gold";
  children: ReactNode;
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide",
        variant === "default" && "bg-gmg-gold-500/20 text-gmg-gold-400 border border-gmg-gold-500/50",
        variant === "ghost" && "bg-gmg-black-700/50 text-gmg-white-50 border border-gmg-white-200/20",
        variant === "gold" && "bg-gmg-gold-500 text-gmg-black-900 font-bold",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
