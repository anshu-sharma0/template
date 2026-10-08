"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
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
  floatingBadges?: Array<{ text: string; icon: string; position?: string }>;
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
  floatingBadges = [
    { text: "Interactive Music 🎵", icon: "✨", position: "top-4 -left-6" },
    { text: "RSVP & Map Ready 📍", icon: "💌", position: "bottom-8 -right-6" },
  ],
  className,
}: HeroSectionProps) {
  return (
    <section className={cn("relative overflow-hidden bg-gradient-to-b from-[#fff5ee] via-[#fffaf5] to-white py-16 sm:py-24 lg:py-28", className)}>
      {/* Dynamic ambient lights */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-gradient-to-tr from-[#b05765]/15 via-[#e8b49e]/20 to-transparent blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 size-[400px] rounded-full bg-[#c6a15b]/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">

          {/* Left Column: Text & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {eyebrow && (
              <Badge tone="rose" className="mb-6 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider shadow-xs">
                ✨ {eyebrow}
              </Badge>
            )}

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2c2224] leading-[1.12]">
              {title}{" "}
              {highlightText && (
                <span className="relative inline-block text-[#b05765] italic">
                  {highlightText}
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#e09f87]/50" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 15 Q 50 0 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span>
              )}
            </h1>

            {description && (
              <p className="mt-6 text-lg sm:text-xl text-[#6e5d60] leading-relaxed max-w-2xl">
                {description}
              </p>
            )}

            {/* Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {primaryAction && (
                <Link
                  href={primaryAction.href}
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#b05765] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#b05765]/25 transition hover:bg-[#964552] hover:shadow-xl active:scale-95"
                >
                  <span>{primaryAction.label}</span>
                  <span>{primaryAction.icon || "✨"}</span>
                </Link>
              )}

              {secondaryAction && (
                <Link
                  href={secondaryAction.href}
                  className="inline-flex items-center gap-2 rounded-full border border-[#e8d5cf] bg-white/80 px-6 py-3.5 text-sm font-semibold text-[#2c2224] shadow-xs backdrop-blur-sm transition hover:bg-[#fff9f6] hover:border-[#b05765]"
                >
                  <span>{secondaryAction.label}</span>
                  <span className="text-xs">→</span>
                </Link>
              )}
            </div>

            {/* Trust Metrics */}
            {metrics && metrics.length > 0 && (
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[#eedad5]/70 pt-8 w-full max-w-lg">
                {metrics.map((metric, i) => (
                  <div key={i}>
                    <div className="font-serif text-2xl font-bold text-[#b05765]">{metric.value}</div>
                    <div className="text-xs text-[#8e7b7e] mt-1 font-medium">{metric.label}</div>
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
              <div className="relative w-full max-w-md">
                {/* Phone mockup container */}
                <div className="relative mx-auto w-[280px] sm:w-[320px] rounded-[40px] border-[8px] border-[#2c2224] bg-white p-3 shadow-2xl shadow-[#b05765]/20">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-32 rounded-b-xl bg-[#2c2224] z-20" />
                  <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-[#fff5f2] to-[#fff0e8] p-5 text-center min-h-[460px] flex flex-col justify-between border border-[#f5e1da]">
                    <div className="mt-4">
                      <div className="inline-block rounded-full bg-[#fceae6] px-3 py-1 text-[10px] font-bold text-[#b05765]">
                        SURPRISE UNLOCKED 🎁
                      </div>
                      <h3 className="mt-3 font-serif text-2xl font-bold text-[#2c2224]">Happy Birthday, Khushi! 🎂</h3>
                      <p className="mt-2 text-xs text-[#6e5d60]">Make a wish & blow the candles!</p>
                    </div>

                    <div className="my-6 space-y-3">
                      <div className="rounded-2xl bg-white/90 p-4 shadow-sm border border-[#eedad5] backdrop-blur-xs">
                        <div className="text-3xl">🕯️ 🎂 ✨</div>
                        <div className="mt-2 text-xs font-semibold text-[#b05765]">Tap to Blow Candles</div>
                      </div>
                      <div className="rounded-2xl bg-white/90 p-3 shadow-sm border border-[#eedad5] flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#2c2224]">🎵 Playing: Perfect Day</span>
                        <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                      </div>
                    </div>

                    <button className="w-full rounded-full bg-[#b05765] py-2.5 text-xs font-bold text-white shadow-md">
                      Open Memory Gallery 💌
                    </button>
                  </div>
                </div>

                {/* Floating pill badges */}
                {floatingBadges.map((badge, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "hidden sm:flex items-center gap-2 absolute rounded-2xl bg-white/95 px-4 py-2.5 shadow-xl border border-[#e8d5cf] backdrop-blur-md z-30 animate-bounce duration-1000",
                      badge.position || "top-10 -left-8"
                    )}
                  >
                    <span className="text-base">{badge.icon}</span>
                    <span className="text-xs font-semibold text-[#2c2224]">{badge.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
