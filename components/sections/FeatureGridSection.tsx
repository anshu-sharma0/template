"use client";

import type { ReactNode } from "react";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/cn";

export interface FeatureItem {
  icon: ReactNode;
  title: string;
  description: string;
  badge?: string;
  linkText?: string;
  linkHref?: string;
}

export interface FeatureGridSectionProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
  variant?: "card" | "glass" | "minimal";
  badgeTone?: "champagne" | "rose" | "gold" | "sage" | "lavender" | "emerald";
  className?: string;
}

export function FeatureGridSection({
  eyebrow = "Magical Features",
  title = "Everything you need to create unforgettable moments",
  description = "Craft deeply personal digital experiences loaded with interactive surprises.",
  features,
  columns = 3,
  variant = "card",
  badgeTone = "rose",
  className,
}: FeatureGridSectionProps) {
  const gridCols = {
    2: "md:grid-cols-2 max-w-5xl",
    3: "md:grid-cols-2 lg:grid-cols-3 max-w-7xl",
    4: "md:grid-cols-2 lg:grid-cols-4 max-w-7xl",
  };

  const variantStyles = {
    card: "bg-white border border-[#e8d5cf]/80 shadow-sm hover:shadow-xl hover:border-[#b05765]/40 hover:-translate-y-1",
    glass: "bg-white/70 backdrop-blur-md border border-[#e8d5cf]/60 shadow-sm hover:shadow-lg hover:bg-white/90 hover:-translate-y-1",
    minimal: "bg-transparent border border-transparent hover:bg-white/50 p-4 hover:border-[#e8d5cf]",
  };

  return (
    <section className={cn("py-16 sm:py-24 bg-[#fffaf5] relative overflow-hidden", className)}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          badgeTone={badgeTone}
          align="center"
        />

        <div className={cn("mx-auto grid gap-6 sm:gap-8", gridCols[columns])}>
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={cn(
                "group relative rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between",
                variantStyles[variant]
              )}
            >
              <div>
                {/* Icon & Badge Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="grid size-12 place-items-center rounded-2xl bg-[#fceae6] text-2xl text-[#b05765] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#b05765] group-hover:text-white shadow-xs">
                    {feature.icon}
                  </div>
                  {feature.badge && (
                    <span className="rounded-full bg-[#f8eeeb] px-3 py-1 text-[10px] font-bold text-[#b05765] uppercase tracking-wider">
                      {feature.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl font-bold text-[#2c2224] transition-colors group-hover:text-[#b05765]">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-sm text-[#6e5d60] leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Optional Link Footer */}
              {feature.linkText && feature.linkHref && (
                <div className="mt-6 pt-4 border-t border-[#eedad5]/50 flex items-center gap-1.5 text-xs font-bold text-[#b05765] group-hover:gap-2.5 transition-all">
                  <span>{feature.linkText}</span>
                  <span>→</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
