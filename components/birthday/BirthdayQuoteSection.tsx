"use client";

import { Sparkle } from "@/components/decorative/Sparkle";

interface BirthdayQuoteSectionProps {
  quote?: string;
  recipientName: string;
}

export function BirthdayQuoteSection({
  quote,
  recipientName,
}: BirthdayQuoteSectionProps) {
  const quoteText =
    quote ||
    "Another year of you means another year of making the world a little softer, a little brighter, and infinitely more beautiful.";

  return (
    <section className="relative my-8 px-4 text-center">
      <div className="mx-auto max-w-sm rounded-3xl bg-gradient-to-br from-[var(--love-surface-blush)] via-[var(--love-surface-rose)] to-[var(--love-surface-cream)] p-6 sm:p-7 border border-[var(--love-border)] shadow-love-card relative overflow-hidden">
        {/* Decorative Quote Mark */}
        <span className="font-serif text-5xl leading-none text-[var(--love-pink)]/40 block select-none -mb-2">
          “
        </span>

        <p className="font-serif italic text-base sm:text-lg text-[var(--love-text-heading)] leading-relaxed font-medium">
          {quoteText}
        </p>

        {/* Small Golden Sparkle */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[var(--love-gold)] font-bold">
          <Sparkle className="text-[var(--love-gold)] text-xs" />
          <span className="uppercase tracking-widest text-[10px]">
            Forever Cherished
          </span>
          <Sparkle className="text-[var(--love-gold)] text-xs" />
        </div>
      </div>
    </section>
  );
}
