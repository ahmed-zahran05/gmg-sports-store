import { clsx } from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  title: string;
  description: string;
  children: ReactNode;
}

export function Section({ title, description, className, children, ...props }: SectionProps) {
  return (
    <section className={clsx("space-y-8", className)} {...props}>
      <div className="max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] font-bold text-gmg-gold-500">{title}</p>
        <h2 className="text-4xl md:text-5xl font-bold text-gmg-white-50">{description}</h2>
      </div>
      {children}
    </section>
  );
}
