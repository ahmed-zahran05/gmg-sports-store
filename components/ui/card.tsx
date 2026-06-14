import { clsx } from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={clsx("rounded-2xl border-2 border-gmg-gold-600/30 bg-gmg-black-800 p-6 shadow-card hover:border-gmg-gold-500/50 transition-all duration-300", className)} {...props}>
      {children}
    </div>
  );
}
