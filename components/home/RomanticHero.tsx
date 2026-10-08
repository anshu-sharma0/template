"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Heart } from "@/components/decorative/Heart";
import { Sparkle } from "@/components/decorative/Sparkle";

export function RomanticHero() {
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fff6f2] via-[#fffaf7] to-[#ffffff] pt-14 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32">
      {/* Dreamy Romantic Background Glows & Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[680px] rounded-full bg-gradient-to-tr from-[#b05765]/15 via-[#f6cfc2]/35 to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-32 size-[420px] rounded-full bg-[#c6a15b]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 -left-28 size-[380px] rounded-full bg-[#b05765]/10 blur-2xl"
      />

      {/* Subtle Floating Petals / Romantic Sparks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span className="absolute top-16 left-[12%] text-lg opacity-40 animate-petal-drift">
          🌸
        </span>
        <span className="absolute top-44 right-[15%] text-base opacity-35 animate-petal-drift-delayed">
          ✨
        </span>
        <span className="absolute bottom-28 left-[8%] text-sm opacity-30 animate-petal-drift">
          ♥
        </span>
        <span className="absolute bottom-16 right-[22%] text-lg opacity-25 animate-petal-drift-delayed">
          🌹
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* Left Column: High-Impact Romantic Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Romantic Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#eedad5] bg-white/90 px-4 py-1.5 shadow-xs backdrop-blur-sm transition-all hover:border-[#b05765]/40 mb-6">
              <span className="text-sm text-[#b05765] animate-romantic-pulse">♥</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#873d4d]">
                Crafted for Moments That Matter
              </span>
            </div>

            {/* Expressive Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[4rem] font-bold tracking-tight text-[#2c2224] leading-[1.12]">
              Because some feelings deserve{" "}
              <span className="relative inline-block text-[#873d4d] italic font-normal">
                more than a text.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3.5 text-[#d87a8c]/40"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 16 Q 50 2 100 16"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Poetic & Emotionally Compelling Body Copy */}
            <p className="mt-6 text-lg sm:text-xl text-[#6e5d60] leading-relaxed max-w-2xl font-sans">
              Transform your cherished memories, heartfelt words, and favourite
              music into an intimate, interactive digital keepsake. A private
              gift crafted in minutes, treasured for a lifetime.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                href="/templates"
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#873d4d] via-[#b05765] to-[#873d4d] bg-size-200 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#b05765]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#b05765]/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
              >
                <span>Create a Love Surprise</span>
                <span className="text-base transition-transform group-hover:scale-125">
                  ♥
                </span>
              </Link>

              <a
                href="#interactive-preview"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e8d5cf] bg-white/80 px-6 py-4 text-sm font-semibold text-[#2c2224] shadow-xs backdrop-blur-sm transition-all hover:bg-[#fff9f6] hover:border-[#b05765] hover:text-[#873d4d]"
              >
                <span>See How It Feels</span>
                <span className="text-xs transition-transform group-hover:translate-x-1">
                  ↓
                </span>
              </a>
            </div>

            {/* Social Trust & Emotional Metric Strip */}
            <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 border-t border-[#eedad5]/70 pt-8 w-full max-w-lg">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#873d4d]">
                  65,000+
                </div>
                <div className="text-xs text-[#7c6b67] mt-1 font-medium">
                  Love Surprises Sent
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#873d4d] flex items-center gap-1">
                  <span>4.98</span>
                  <span className="text-amber-500 text-lg">★</span>
                </div>
                <div className="text-xs text-[#7c6b67] mt-1 font-medium">
                  Emotional Joy Score
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#873d4d]">
                  100%
                </div>
                <div className="text-xs text-[#7c6b67] mt-1 font-medium">
                  Free Instant Preview
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Exquisite Romantic Envelope & Keepsake Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Soft Ambient Shadow Aura behind the card */}
              <div className="absolute inset-4 rounded-[36px] bg-gradient-to-tr from-[#b05765]/20 via-[#e09f87]/25 to-transparent blur-2xl -z-10" />

              {/* Romantic Phone Showcase Frame */}
              <div className="relative mx-auto w-[295px] sm:w-[330px] rounded-[44px] border-[8px] border-[#2c2224] bg-white p-3 shadow-2xl shadow-[#873d4d]/20 transition-all duration-500">
                {/* Phone Speaker Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-32 rounded-b-xl bg-[#2c2224] z-30" />

                {/* Inner Screen Container */}
                <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-b from-[#fff6f4] via-[#fffaf8] to-[#fdedeb] p-5 text-center min-h-[500px] flex flex-col justify-between border border-[#f3dfd9]">
                  {/* Floating Micro Status Bar */}
                  <div className="pt-2 flex items-center justify-between text-[11px] text-[#8e7b7e] font-sans">
                    <span className="flex items-center gap-1 font-medium text-[#873d4d]">
                      <span>🔒</span> Private Link
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsPlayingDemo((prev) => !prev)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-0.5 border border-[#e8d5cf] text-[10px] font-semibold text-[#873d4d] shadow-2xs hover:bg-[#fff0ed]"
                    >
                      <span className={isPlayingDemo ? "animate-spin" : ""}>
                        🎵
                      </span>
                      <span>{isPlayingDemo ? "Playing Melody" : "Play Sound"}</span>
                    </button>
                  </div>

                  {/* Envelope / Memory Card Body */}
                  <div className="my-auto py-4">
                    {!envelopeOpened ? (
                      /* Sealed Love Letter State */
                      <div className="space-y-4">
                        <div className="relative mx-auto size-28 rounded-3xl bg-gradient-to-br from-[#fff0ea] to-[#fce3dd] border border-[#eecfc7] shadow-md flex items-center justify-center p-3">
                          <div className="size-16 rounded-2xl bg-white shadow-inner flex flex-col items-center justify-center border border-[#edd5ce]">
                            <span className="text-3xl animate-romantic-pulse">
                              💌
                            </span>
                          </div>
                          {/* Wax Seal Detail */}
                          <div className="absolute -bottom-2 -right-2 size-9 rounded-full bg-[#873d4d] text-white flex items-center justify-center text-xs font-serif shadow-md border-2 border-white">
                            ♥
                          </div>
                        </div>

                        <div>
                          <div className="inline-block rounded-full bg-[#fceae6] px-3 py-1 text-[11px] font-bold text-[#873d4d] tracking-wide">
                            FOR SOMEONE CHERISHED
                          </div>
                          <h3 className="mt-2.5 font-serif text-2xl font-bold text-[#2c2224]">
                            A Special Surprise
                          </h3>
                          <p className="mt-1.5 text-xs text-[#6e5d60] leading-relaxed">
                            Someone who adores you made this memory just for you.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setEnvelopeOpened(true)}
                          className="w-full rounded-full bg-gradient-to-r from-[#873d4d] to-[#b05765] py-3 text-xs font-bold text-white shadow-md shadow-[#b05765]/30 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                          Tap to Open Keepsake ✨
                        </button>
                      </div>
                    ) : (
                      /* Opened Keepsake State */
                      <div className="space-y-3 animate-in fade-in zoom-in-95 duration-400">
                        <div className="relative rounded-2xl bg-white p-3 shadow-md border border-[#eecfc7]">
                          <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-[#fdeeed] to-[#fce3dd] flex flex-col items-center justify-center text-center p-3 relative overflow-hidden">
                            <span className="text-2xl mb-1">💑 ✨</span>
                            <p className="font-serif italic text-base text-[#2c2224] font-medium leading-snug">
                              &ldquo;Every love story is special, but ours is my
                              absolute favorite.&rdquo;
                            </p>
                            <span className="text-[10px] text-[#8e7b7e] mt-1 uppercase tracking-wider font-semibold">
                              October 14 • Golden Hour
                            </span>
                          </div>
                        </div>

                        <div className="rounded-xl bg-white/80 p-2.5 border border-[#eedad5] flex items-center justify-between text-left text-xs">
                          <div>
                            <div className="font-bold text-[#2c2224] text-[11px]">
                              🎵 Perfect Melody
                            </div>
                            <div className="text-[10px] text-[#8e7b7e]">
                              Acoustic Piano &amp; Rain
                            </div>
                          </div>
                          <span className="size-2 rounded-full bg-[#873d4d] animate-ping" />
                        </div>

                        <button
                          type="button"
                          onClick={() => setEnvelopeOpened(false)}
                          className="text-[11px] font-semibold text-[#873d4d] underline underline-offset-2 hover:opacity-80"
                        >
                          Close Letter ✉️
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Footnote inside the phone */}
                  <div className="text-[10px] text-[#9c898c] border-t border-[#f1ded8] pt-2.5">
                    Made with love • Works on any device
                  </div>
                </div>
              </div>

              {/* Floating Pill Badges around Phone */}
              <div className="hidden sm:flex items-center gap-2.5 absolute -top-4 -left-8 rounded-2xl bg-white/95 px-4 py-2.5 shadow-xl border border-[#eedad5] backdrop-blur-md z-30 transition-all hover:scale-105">
                <span className="text-lg">🎵</span>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#2c2224]">
                    Emotional Audio
                  </div>
                  <div className="text-[10px] text-[#7c6b67]">
                    Custom love tracks
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2.5 absolute bottom-12 -right-8 rounded-2xl bg-white/95 px-4 py-2.5 shadow-xl border border-[#eedad5] backdrop-blur-md z-30 transition-all hover:scale-105">
                <span className="text-lg text-[#873d4d]">♥</span>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#2c2224]">
                    100% Private
                  </div>
                  <div className="text-[10px] text-[#7c6b67]">
                    Private WhatsApp link
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
