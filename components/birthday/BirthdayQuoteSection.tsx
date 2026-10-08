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
      <div className="mx-auto max-w-sm rounded-3xl bg-linear-to-br from-[#fff0f3] via-[#ffe5ec] to-[#fff5f7] p-6 sm:p-7 border border-pink-200/90 shadow-lg shadow-pink-500/10 relative overflow-hidden">
        {/* Decorative Quote Mark */}
        <span className="font-serif text-5xl leading-none text-[#ff758f]/40 block select-none -mb-2">
          “
        </span>

        <p className="font-serif italic text-base sm:text-lg text-[#1f1a1c] leading-relaxed font-medium">
          {quoteText}
        </p>

        {/* Small Golden Sparkle */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#b45309] font-bold">
          <Sparkle className="text-[#f59e0b] text-xs" />
          <span className="uppercase tracking-widest text-[10px]">
            Forever Cherished
          </span>
          <Sparkle className="text-[#f59e0b] text-xs" />
        </div>
      </div>
    </section>
  );
}
