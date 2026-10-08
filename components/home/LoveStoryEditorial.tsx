"use client";

import Link from "next/link";
import { Heart } from "@/components/decorative/Heart";
import { Sparkle } from "@/components/decorative/Sparkle";

export function LoveStoryEditorial() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-[#fffaf7] via-[#fff3ee] to-[#fffaf7] relative overflow-hidden">
      {/* Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(176,87,101,0.08),transparent_70%)]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Editorial Statement & Contrast */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#eedad5] bg-white px-4 py-1.5 shadow-2xs">
              <span className="text-xs text-[#873d4d]">♥</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#873d4d]">
                The Poetry of Gifting
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2c2224] leading-[1.15]">
              A text message is scrolled past in seconds. <br className="hidden sm:inline" />
              <span className="text-[#873d4d] italic font-normal">
                A love keepsake is felt forever.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#6e5d60] leading-relaxed font-sans">
              We send hundreds of quick chats every week. But for birthdays,
              anniversaries, proposals, and heartfelt confessions, a plain text
              feels too small for feelings this big.
            </p>

            {/* Emotional Comparison Box */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 pt-2">
              {/* The Ordinary Message */}
              <div className="rounded-2xl border border-[#ecdcd5] bg-white/70 p-5 backdrop-blur-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#8e7b7e] uppercase tracking-wider mb-2">
                  <span>💬</span> An Ordinary Chat
                </div>
                <div className="rounded-xl bg-[#f5edea] p-3 text-xs text-[#6e5d60] italic">
                  &ldquo;Happy birthday babe! Hope you have the best day love you lots ❤️&rdquo;
                </div>
                <p className="mt-3 text-[11px] text-[#8e7b7e]">
                  Read in 4 seconds. Buried under 50 other notifications.
                </p>
              </div>

              {/* The Love Keepsake */}
              <div className="rounded-2xl border-2 border-[#b05765]/30 bg-white p-5 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 rounded-bl-xl bg-[#fceae6] px-2.5 py-0.5 text-[10px] font-bold text-[#873d4d]">
                  UNFORGETTABLE ♥
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#873d4d] uppercase tracking-wider mb-2">
                  <span>✨</span> A Luma Keepsake
                </div>
                <div className="rounded-xl bg-gradient-to-r from-[#fff5f2] to-[#fdedeb] p-3 text-xs text-[#2c2224] font-medium border border-[#f3dfd9]">
                  🎵 Their song plays softly • 📸 Cherished photo flipbook • 💌 Secret wax-seal letter reveal
                </div>
                <p className="mt-3 text-[11px] text-[#873d4d] font-semibold">
                  Saved to bookmarks. Reopened and smiled at for years.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/templates"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#873d4d] px-7 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-[#873d4d]/20 transition-all hover:bg-[#6b1d2f] hover:shadow-lg active:scale-95"
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
              <div className="absolute -top-4 -right-2 w-64 rotate-6 rounded-2xl border border-[#eedad5] bg-white p-5 shadow-md">
                <div className="flex items-center justify-between border-b border-[#f3e5e1] pb-2 mb-3">
                  <span className="font-serif italic text-xs text-[#873d4d]">
                    From the Heart
                  </span>
                  <span className="size-5 rounded-full bg-[#873d4d] text-white text-[10px] grid place-items-center">
                    ♥
                  </span>
                </div>
                <p className="font-serif italic text-sm text-[#571424] leading-relaxed">
                  &ldquo;I wanted to give you something as gentle and wonderful
                  as you are to me...&rdquo;
                </p>
                <div className="mt-4 flex items-center justify-between text-[10px] text-[#8e7b7e]">
                  <span>Sealed with warmth</span>
                  <span>Always yours</span>
                </div>
              </div>

              {/* Front Card: Polaroid Memory with Ribbon Accent */}
              <div className="relative z-10 w-72 -rotate-3 rounded-2xl border border-[#e8d5cf] bg-white p-4 shadow-xl transition-all duration-500 hover:rotate-0 hover:scale-105">
                {/* Visual Polaroid Photo Placeholder */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-tr from-[#fdeeed] via-[#f8d7dc] to-[#fceae6] p-4 flex flex-col items-center justify-center text-center">
                  <Sparkle className="text-[#873d4d] text-xl mb-2" />
                  <p className="font-serif text-xl font-bold text-[#2c2224]">
                    Our Golden Hour
                  </p>
                  <p className="text-[11px] text-[#7c6b67] mt-1">
                    Rome • October 2025
                  </p>
                </div>

                {/* Handwritten Note underneath */}
                <div className="mt-4 text-center">
                  <p className="font-serif italic text-lg text-[#2c2224] leading-snug">
                    Happy Anniversary, My Soulmate ♥
                  </p>
                  <p className="mt-1 text-[11px] font-sans text-[#8e7b7e] uppercase tracking-wider">
                    Interactive Memory Card
                  </p>
                </div>
              </div>

              {/* Small Floating Rose Badge */}
              <div className="absolute -bottom-4 left-4 z-20 rounded-full bg-white/95 px-3.5 py-1.5 shadow-md border border-[#eedad5] text-xs font-bold text-[#873d4d] flex items-center gap-1.5">
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
