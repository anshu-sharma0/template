"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

export interface CTASectionProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  badgeTone?: "champagne" | "rose" | "gold" | "sage" | "lavender" | "emerald";
  className?: string;
}

export function CTASection({
  eyebrow = "Ready to Surprise Someone?",
  title = "Make your next wish truly unforgettable",
  description = "Join 50,000+ happy creators. Pick a theme, personalise photos & music, and share in under 3 minutes.",
  primaryAction = { label: "Create Birthday Wish 🎂", href: "/birthday/create" },
  secondaryAction = { label: "Create Wedding Invite 💍", href: "/wedding/create" },
  badgeTone = "rose",
  className,
}: CTASectionProps) {
  return (
    <section className={cn("py-16 sm:py-24 bg-[#fffaf5] relative overflow-hidden", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-[#2c2224] via-[#422f33] to-[#2c2224] p-8 sm:p-14 lg:p-16 text-white shadow-2xl border border-[#523d42]">
          
          {/* Ambient Glows */}
          <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-[#b05765]/30 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-[#c6a15b]/20 blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
            {eyebrow && (
              <Badge tone={badgeTone} className="mb-4 px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-sm">
                ✨ {eyebrow}
              </Badge>
            )}

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              {title}
            </h2>

            {description && (
              <p className="mt-4 text-sm sm:text-lg text-[#caaeb3] leading-relaxed max-w-2xl">
                {description}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {primaryAction && (
                <Link
                  href={primaryAction.href}
                  className="rounded-full bg-[#b05765] px-8 py-4 text-xs sm:text-sm font-bold text-white shadow-xl shadow-[#b05765]/30 transition hover:bg-[#964552] hover:scale-105 active:scale-95"
                >
                  {primaryAction.label}
                </Link>
              )}

              {secondaryAction && (
                <Link
                  href={secondaryAction.href}
                  className="rounded-full bg-white/10 backdrop-blur-md px-7 py-4 text-xs sm:text-sm font-bold text-white border border-white/20 transition hover:bg-white/20 hover:scale-105 active:scale-95"
                >
                  {secondaryAction.label}
                </Link>
              )}
            </div>

            {/* Feature Pills */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#e8d5cf] pt-6 border-t border-white/10">
              <span className="flex items-center gap-1.5">⚡ Instant Preview</span>
              <span className="flex items-center gap-1.5">🎵 Custom Audio</span>
              <span className="flex items-center gap-1.5">📱 Mobile Responsive</span>
              <span className="flex items-center gap-1.5">🔒 Private & Secure</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
