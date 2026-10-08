"use client";

import Link from "next/link";

export function RomanticCTA() {
  return (
    <section className="py-20 sm:py-28 bg-[#ffffff] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Light & Luminous Romantic Banner Card */}
        <div className="relative overflow-hidden rounded-[40px] bg-linear-to-br from-[#fff0f3] via-[#ffe5ec] to-[#fff5f7] p-8 sm:p-14 lg:p-16 border-2 border-pink-200/90 shadow-[0_20px_60px_rgba(255,51,102,0.12)]">
          {/* Subtle Ambient Shimmering Glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-[#ff758f]/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-[#ffccd5]/35 blur-3xl"
          />

          {/* Floating Subtle Petals */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <span className="absolute top-8 left-12 text-2xl opacity-40 animate-petal-drift">
              🌸
            </span>
            <span className="absolute bottom-8 right-12 text-2xl opacity-40 animate-petal-drift-delayed">
              ✨
            </span>
            <span className="absolute top-1/2 right-1/4 text-lg opacity-30 text-pink-400 animate-petal-drift">
              ♥
            </span>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
            {/* Pill */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-200/90 bg-white/95 px-4 py-1.5 shadow-xs">
              <span className="text-xs text-[#ff3366] animate-heart-beat">♥</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#e11d48]">
                Make Their Heart Melt
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1f1a1c] leading-tight">
              Don&apos;t let another special moment pass as{" "}
              <span className="bg-linear-to-r from-[#e11d48] via-[#ff3366] to-[#ff758f] bg-clip-text text-transparent italic">
                just a plain text.
              </span>
            </h2>

            {/* Body */}
            <p className="mt-4 text-base sm:text-lg text-[#524548] leading-relaxed max-w-2xl font-sans">
              Join over 65,000 creators who turned words into unforgettable feelings. Pick a
              theme, add your favourite photos &amp; melodies, and deliver a surprise they will
              revisit for years.
            </p>

            {/* Dual CTAs with radiant love linears */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/birthday/create"
                className="rounded-full bg-linear-to-r from-[#ff3366] via-[#ff4d6d] to-[#ff758f] px-8 py-4 text-xs sm:text-sm font-bold text-white shadow-xl shadow-pink-500/35 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all"
              >
                Create Birthday Surprise 🎂
              </Link>

              <Link
                href="/wedding/create"
                className="rounded-full bg-white/95 border-2 border-pink-200 px-8 py-4 text-xs sm:text-sm font-bold text-[#1f1a1c] hover:border-[#ff3366] hover:text-[#ff3366] hover:bg-pink-50/50 hover:scale-105 active:scale-95 shadow-sm transition-all"
              >
                Create Wedding &amp; Vow Keepsake 💍
              </Link>
            </div>

            {/* Reassurance Pills */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-[#524548] pt-6 border-t border-pink-200/60 font-medium">
              <span className="rounded-full bg-white/90 border border-pink-200/80 px-3.5 py-1.5 shadow-2xs flex items-center gap-1.5">
                ⚡ Free Instant Draft
              </span>
              <span className="rounded-full bg-white/90 border border-pink-200/80 px-3.5 py-1.5 shadow-2xs flex items-center gap-1.5">
                🎵 Custom Audio
              </span>
              <span className="rounded-full bg-white/90 border border-pink-200/80 px-3.5 py-1.5 shadow-2xs flex items-center gap-1.5">
                📱 Mobile-Ready
              </span>
              <span className="rounded-full bg-white/90 border border-pink-200/80 px-3.5 py-1.5 shadow-2xs flex items-center gap-1.5">
                🔒 Private Secret Link
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
