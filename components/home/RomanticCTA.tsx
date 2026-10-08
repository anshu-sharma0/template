"use client";

import Link from "next/link";

export function RomanticCTA() {
  return (
    <section className="py-20 sm:py-28 bg-[#fffaf5] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-[#3f1922] via-[#592330] to-[#3a161f] p-8 sm:p-14 lg:p-16 text-white shadow-2xl border border-[#6b2c3c]">
          {/* Subtle Ambient Shimmering Glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-[#b05765]/35 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-[#c6a15b]/20 blur-3xl"
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
            {/* Pill */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
              <span className="text-xs text-[#fceae6]">♥</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#fceae6]">
                Make Their Heart Melt
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Don&apos;t let another special moment pass as just a plain text.
            </h2>

            {/* Body */}
            <p className="mt-4 text-base sm:text-lg text-[#f0d8dc] leading-relaxed max-w-2xl font-sans">
              Join over 65,000 creators who turned words into feelings. Pick a
              theme, add your favourite photos, and deliver a surprise they will
              revisit for years.
            </p>

            {/* Dual CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/birthday/create"
                className="rounded-full bg-[#ffffff] px-8 py-4 text-xs sm:text-sm font-bold text-[#571424] shadow-xl hover:bg-[#fff0ed] hover:scale-105 active:scale-95 transition-all"
              >
                Create Birthday Surprise 🎂
              </Link>

              <Link
                href="/wedding/create"
                className="rounded-full bg-white/10 backdrop-blur-md px-8 py-4 text-xs sm:text-sm font-bold text-white border border-white/25 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all"
              >
                Create Wedding &amp; Vow Keepsake 💍
              </Link>
            </div>

            {/* Reassurance Pills */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#edd4d8] pt-6 border-t border-white/10">
              <span className="flex items-center gap-1.5">⚡ Free Instant Draft</span>
              <span className="flex items-center gap-1.5">🎵 Custom Audio</span>
              <span className="flex items-center gap-1.5">📱 Mobile-Ready</span>
              <span className="flex items-center gap-1.5">🔒 Private Secret Link</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
