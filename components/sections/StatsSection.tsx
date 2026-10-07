"use client";

import type { ReactNode } from "react";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/cn";

export interface StatItem {
  icon?: ReactNode;
  value: string;
  label: string;
  description?: string;
  trend?: string;
}

export interface StatsSectionProps {
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  stats?: StatItem[];
  variant?: "solid" | "glass" | "gradient";
  className?: string;
}

export function StatsSection({
  eyebrow = "Impact & Reach",
  title = "Spreading joy across thousands of celebrations",
  description = "Real-time metrics from our growing community of surprise creators.",
  stats = [
    { icon: "🎁", value: "85,000+", label: "Surprises Created", description: "Across 40+ countries", trend: "+12% this month" },
    { icon: "💍", value: "24,000+", label: "Weddings Celebrated", description: "Interactive RSVPs collected", trend: "Top rated" },
    { icon: "💌", value: "1.2M+", label: "Memories Viewed", description: "Real-time guest interactions", trend: "99.9% uptime" },
    { icon: "⭐", value: "4.95 / 5", label: "Average Joy Score", description: "From 12,000+ reviews", trend: "Loved worldwide" },
  ],
  variant = "gradient",
  className,
}: StatsSectionProps) {
  const containerBg = {
    solid: "bg-white border border-[#e8d5cf]",
    glass: "bg-white/80 backdrop-blur-md border border-[#e8d5cf]",
    gradient: "bg-gradient-to-r from-[#2c2224] via-[#3a2c30] to-[#2c2224] text-white border border-[#4a3a3e]",
  };

  const isDark = variant === "gradient";

  return (
    <section className={cn("py-16 sm:py-20 relative overflow-hidden", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {title && (
          <SectionHeader
            eyebrow={eyebrow}
            title={<span className={isDark ? "text-white" : "text-[#2c2224]"}>{title}</span>}
            description={<span className={isDark ? "text-[#caaeb3]" : "text-[#6e5d60]"}>{description}</span>}
            badgeTone="gold"
            align="center"
          />
        )}

        <div className={cn("rounded-3xl p-8 sm:p-12 shadow-xl", containerBg[variant])}>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#e8d5cf]/20">
            {stats.map((stat, idx) => (
              <div key={idx} className={cn("flex flex-col items-center text-center p-4", idx > 0 && "sm:pl-8")}>
                {stat.icon && (
                  <span className="grid size-12 place-items-center rounded-2xl bg-[#b05765]/20 text-2xl text-[#b05765] mb-4">
                    {stat.icon}
                  </span>
                )}
                
                <div className={cn("font-serif text-3xl sm:text-4xl font-bold tracking-tight", isDark ? "text-white" : "text-[#2c2224]")}>
                  {stat.value}
                </div>

                <div className={cn("mt-1 text-sm font-semibold", isDark ? "text-[#fceae6]" : "text-[#b05765]")}>
                  {stat.label}
                </div>

                {stat.description && (
                  <div className={cn("mt-1.5 text-xs", isDark ? "text-[#caaeb3]" : "text-[#8e7b7e]")}>
                    {stat.description}
                  </div>
                )}

                {stat.trend && (
                  <span className="mt-3 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                    {stat.trend}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
