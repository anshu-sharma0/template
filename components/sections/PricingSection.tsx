"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { SectionHeader } from "./SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  description: string;
  priceFree?: string;
  priceOneTime: string;
  isPopular?: boolean;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
}

export interface PricingSectionProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  plans?: PricingPlan[];
  badgeTone?: "champagne" | "rose" | "gold" | "sage" | "lavender" | "emerald";
  className?: string;
}

export function PricingSection({
  eyebrow = "Transparent Pricing",
  title = "Start Free, Upgrade When You Need More",
  description = "No hidden fees. Create instant previews for free and unlock premium features whenever you're ready.",
  plans = [
    {
      id: "free",
      name: "Starter Memory",
      description: "Perfect for sending quick personal birthday wishes & simple notes.",
      priceOneTime: "₹0",
      features: [
        "Standard theme selection",
        "Personalized recipient message",
        "Up to 3 photo uploads",
        "Confetti & balloon animations",
        "Instant shareable link",
      ],
      ctaLabel: "Create Free Wish",
      ctaHref: "/birthday/create",
    },
    {
      id: "premium",
      name: "Deluxe Surprise",
      badge: "MOST POPULAR",
      description: "Full suite of interactive surprises, music, and RSVP management.",
      priceOneTime: "₹299",
      isPopular: true,
      features: [
        "All Premium Themes (Birthday & Wedding)",
        "Blow candles & interactive scratch cards",
        "Custom background audio / music",
        "Unlimited high-res photo gallery",
        "Guest RSVP & Venue Map tracking",
        "No watermark & lifetime access link",
      ],
      ctaLabel: "Unlock Premium Experience",
      ctaHref: "/templates",
    },
  ],
  badgeTone = "gold",
  className,
}: PricingSectionProps) {
  return (
    <section className={cn("py-16 sm:py-24 bg-[#fff5ee]/40 relative overflow-hidden", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          badgeTone={badgeTone}
          align="center"
        />

        <div className="mt-8 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "group relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300",
                plan.isPopular
                  ? "bg-white border-2 border-[var(--love-crimson)] shadow-love-lift scale-105 z-10"
                  : "bg-white border border-[var(--love-border)] shadow-love-card hover:shadow-love-lift"
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge tone="rose" className="px-4 py-1 text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                    🔥 MOST POPULAR
                  </Badge>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl font-bold text-[var(--love-text-heading)]">{plan.name}</h3>
                  {plan.badge && !plan.isPopular && (
                    <span className="rounded-full bg-[var(--love-surface-blush)] border border-[var(--love-border)] px-3 py-1 text-[10px] font-bold text-[var(--love-crimson)]">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="mt-2 text-xs text-[var(--love-text-muted)]">{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-serif text-4xl font-bold text-[var(--love-text-heading)]">{plan.priceOneTime}</span>
                  <span className="text-xs text-[var(--love-text-muted)] font-semibold">/ single creation</span>
                </div>

                <ul className="mt-8 space-y-3.5 border-t border-[var(--love-border-subtle)] pt-6 text-xs text-[var(--love-text-body)]">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="grid size-5 place-items-center rounded-full bg-[var(--love-surface-blush)] text-[var(--love-crimson)] border border-[var(--love-border)] text-[10px] font-bold shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href={plan.ctaHref}
                  className={cn(
                    "block w-full text-center rounded-full py-3.5 text-xs font-bold transition-all shadow-love-lift active:scale-95 cursor-pointer",
                    plan.isPopular
                      ? "bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] text-white hover:opacity-95"
                      : "bg-white text-[var(--love-text-heading)] border border-[var(--love-border)] hover:bg-[var(--love-surface-blush)]"
                  )}
                >
                  {plan.ctaLabel}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
