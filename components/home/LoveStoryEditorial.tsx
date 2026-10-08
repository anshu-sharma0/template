"use client";

import Link from "next/link";
import { Sparkle } from "@/components/decorative/Sparkle";

export function LoveStoryEditorial() {
  return (
    <section className="py-20 sm:py-28 bg-linear-to-b from-[#ffffff] via-[#fff5f7] to-[#ffffff] relative overflow-hidden">
      {/* Ambient Pink Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,107,139,0.12),transparent_70%)]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Editorial Statement & Contrast */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-white px-4 py-1.5 shadow-xs">
              <span className="text-xs text-[#ff3366] animate-heart-beat">♥</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#e11d48]">
                The Poetry of Gifting
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1f1a1c] leading-[1.15]">
              A text message is scrolled past in seconds. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#e11d48] via-[#ff3366] to-[#ff758f] bg-clip-text text-transparent italic font-normal">
                A love keepsake is felt forever.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#524548] leading-relaxed font-sans">
              We send hundreds of quick chats every week. But for birthdays,
              anniversaries, proposals, and heartfelt confessions, a plain text
              feels too small for feelings this big.
            </p>

            {/* Emotional Comparison Box */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 pt-2">
              {/* The Ordinary Message */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-5 backdrop-blur-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  <span>💬</span> An Ordinary Chat
                </div>
                <div className="rounded-xl bg-gray-100 p-3 text-xs text-gray-600 italic">
                  &ldquo;Happy birthday babe! Hope you have the best day love you lots ❤️&rdquo;
                </div>
                <p className="mt-3 text-[11px] text-gray-500">
                  Read in 4 seconds. Buried under 50 other notifications.
                </p>
              </div>

              {/* The Love Keepsake */}
              <div className="rounded-2xl border-2 border-pink-300 bg-gradient-to-br from-white to-[#fff0f3] p-5 shadow-lg shadow-pink-500/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 rounded-bl-xl bg-gradient-to-r from-[#ff3366] to-[#ff758f] px-3 py-0.5 text-[10px] font-bold text-white shadow-2xs">
                  UNFORGETTABLE ♥
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#e11d48] uppercase tracking-wider mb-2">
                  <span>✨</span> A Luma Keepsake
                </div>
                <div className="rounded-xl bg-white/90 p-3 text-xs text-[#1f1a1c] font-medium border border-pink-200">
                  🎵 Their song plays softly • 📸 Cherished photo flipbook • 💌 Secret wax-seal letter reveal
                </div>
                <p className="mt-3 text-[11px] text-[#e11d48] font-bold">
                  Saved to bookmarks. Reopened and smiled at for years.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/templates"
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#ff3366] via-[#ff4d6d] to-[#ff758f] px-8 py-4 text-xs sm:text-sm font-bold text-white shadow-lg shadow-pink-500/25 transition-all hover:shadow-xl hover:shadow-pink-500/35 hover:scale-105 active:scale-95"
              >
                <span>Make Someone Smile Today</span>
                <span>♥</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Layered Romantic Cards Composition */}
          <div className="lg:col-span-5 relative flex justify-center py-6">
            <div className="relative w-full max-w-sm">
              {/* Back Card: Handwritten Love Letter with Wax Seal */}
              <div className="absolute -top-4 -right-2 w-64 rotate-6 rounded-2xl border border-pink-200 bg-white p-5 shadow-md">
                <div className="flex items-center justify-between border-b border-pink-100 pb-2 mb-3">
                  <span className="font-serif italic text-xs text-[#e11d48] font-bold">
                    From the Heart
                  </span>
                  <span className="size-5 rounded-full bg-gradient-to-tr from-[#e11d48] to-[#ff3366] text-white text-[10px] grid place-items-center">
                    ♥
                  </span>
                </div>
                <p className="font-serif italic text-sm text-[#3b1219] leading-relaxed">
                  &ldquo;I wanted to give you something as gentle and wonderful
                  as you are to me...&rdquo;
                </p>
                <div className="mt-4 flex items-center justify-between text-[10px] text-[#8e7b7e]">
                  <span>Sealed with warmth</span>
                  <span>Always yours</span>
                </div>
              </div>

              {/* Front Card: Polaroid Memory with Ribbon Accent */}
              <div className="relative z-10 w-72 -rotate-3 rounded-2xl border border-pink-200 bg-white p-4 shadow-xl shadow-pink-500/10 transition-all duration-500 hover:rotate-0 hover:scale-105">
                {/* Visual Polaroid Photo Placeholder */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-tr from-[#fff0f3] via-[#ffd6e0] to-[#ffe5ec] p-4 flex flex-col items-center justify-center text-center">
                  <Sparkle className="text-[#ff3366] text-xl mb-2" />
                  <p className="font-serif text-xl font-bold text-[#1f1a1c]">
                    Our Golden Hour
                  </p>
                  <p className="text-[11px] text-[#6b5e62] mt-1">
                    October 2025 • Best Day Ever
                  </p>
                </div>

                {/* Handwritten Note underneath */}
                <div className="mt-4 text-center">
                  <p className="font-serif italic text-lg text-[#1f1a1c] leading-snug">
                    Happy Anniversary, My Soulmate ♥
                  </p>
                  <p className="mt-1 text-[11px] font-sans text-pink-600 font-bold uppercase tracking-wider">
                    Interactive Memory Card
                  </p>
                </div>
              </div>

              {/* Small Floating Rose Badge */}
              <div className="absolute -bottom-4 left-4 z-20 rounded-full bg-white/95 px-3.5 py-1.5 shadow-md shadow-pink-500/10 border border-pink-200 text-xs font-bold text-[#e11d48] flex items-center gap-1.5">
                <span>🌹</span>
                <span>Permanent Keepsake Link</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
