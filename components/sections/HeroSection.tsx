"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { PhoneMockup, type PhonePresetData, type FloatingBadgeItem } from "@/components/ui/PhoneMockup";
import { cn } from "@/lib/cn";

export interface HeroMetric {
  value: string;
  label: string;
}

export interface HeroSectionProps {
  eyebrow?: string;
  title: ReactNode;
  highlightText?: string;
  description?: ReactNode;
  primaryAction?: {
    label: string;
    href: string;
    icon?: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  metrics?: HeroMetric[];
  visualContent?: ReactNode;
  phonePreset?: "birthday" | "romantic-letter" | "wedding" | "custom";
  phoneTheme?: "pearl-silver" | "rose-gold" | "titanium";
  phonePresetData?: PhonePresetData;
  floatingBadges?: FloatingBadgeItem[];
  className?: string;
}

export function HeroSection({
  eyebrow = "Create & Share Digital Memories",
  title,
  highlightText,
  description,
  primaryAction = { label: "Create Your Surprise", href: "/templates" },
  secondaryAction = { label: "Explore Examples", href: "/#templates" },
  metrics = [
    { value: "50,000+", label: "Memories Created" },
    { value: "4.9★", label: "User Rating" },
    { value: "100%", label: "Free Instant Draft" },
  ],
  visualContent,
  phonePreset = "birthday",
  phoneTheme = "pearl-silver",
  phonePresetData,
  floatingBadges = [
    { text: "Interactive Music 🎵", icon: "✨", position: "top-4 -left-6" },
    { text: "RSVP & Map Ready 📍", icon: "💌", position: "bottom-8 -right-6" },
  ],
  className,
}: HeroSectionProps) {
  return (
    <section className={cn("relative overflow-hidden bg-gradient-to-b from-[#fffbf8] via-[#fff5f7] to-white py-16 sm:py-24 lg:py-28", className)}>
      {/* Dynamic ambient lights */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-gradient-to-tr from-pink-400/15 via-rose-300/15 to-transparent blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 size-[400px] rounded-full bg-amber-200/15 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">

          {/* Left Column: Text & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {eyebrow && (
              <Badge tone="rose" className="mb-6 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider shadow-2xs">
                ✨ {eyebrow}
              </Badge>
            )}

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--love-text-heading)] leading-[1.12]">
              {title}{" "}
              {highlightText && (
                <span className="relative inline-block text-[var(--love-crimson)] italic">
                  {highlightText}
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-pink-300/60" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 15 Q 50 0 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span>
              )}
            </h1>

            {description && (
              <p className="mt-6 text-lg sm:text-xl text-[var(--love-text-body)] leading-relaxed max-w-2xl">
                {description}
              </p>
            )}

            {/* Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {primaryAction && (
                <Link
                  href={primaryAction.href}
                  className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] px-7 py-3.5 text-sm font-semibold text-white shadow-love-lift transition hover:opacity-95 active:scale-95"
                >
                  <span>{primaryAction.label}</span>
                  <span>{primaryAction.icon || "✨"}</span>
                </Link>
              )}

              {secondaryAction && (
                <Link
                  href={secondaryAction.href}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--love-border)] bg-white/90 px-6 py-3.5 text-sm font-semibold text-[var(--love-text-heading)] shadow-xs backdrop-blur-sm transition hover:bg-[var(--love-surface-blush)] hover:border-[var(--love-crimson)]"
                >
                  <span>{secondaryAction.label}</span>
                  <span className="text-xs">→</span>
                </Link>
              )}
            </div>

            {/* Trust Metrics */}
            {metrics && metrics.length > 0 && (
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[var(--love-border-subtle)] pt-8 w-full max-w-lg">
                {metrics.map((metric, i) => (
                  <div key={i}>
                    <div className="font-serif text-2xl font-bold text-[var(--love-crimson)]">{metric.value}</div>
                    <div className="text-xs text-[var(--love-text-muted)] mt-1 font-medium">{metric.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Interactive Visual / Mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            {visualContent ? (
              <div className="w-full">{visualContent}</div>
            ) : (
              <PhoneMockup
                preset={phonePreset}
                theme={phoneTheme}
                presetData={phonePresetData}
                floatingBadges={floatingBadges}
              />
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
