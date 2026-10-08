"use client";

import { useState } from "react";
import Link from "next/link";
import { playRomanticChime } from "@/lib/romanticAudio";

export function RomanticHero() {
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  const toggleSound = () => {
    setIsPlayingDemo((prev) => {
      const next = !prev;
      if (next) {
        playRomanticChime();
      }
      return next;
    });
  };

  const openKeepsake = () => {
    setEnvelopeOpened(true);
    playRomanticChime();
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#fff0f3] via-[#fff7f9] to-[#ffffff] pt-12 pb-20 sm:pt-18 sm:pb-28 lg:pt-22 lg:pb-32">
      {/* Radiant Dreamy Love Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-175 rounded-full bg-linear-to-tr from-[#ff758f]/20 via-[#ffccd5]/35 to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-32 size-112.5 rounded-full bg-[#ffccd5]/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 -left-28 size-100 rounded-full bg-[#ffe5ec]/40 blur-2xl"
      />

      {/* Floating Petals / Sparks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span className="absolute top-16 left-[10%] text-xl opacity-60 animate-petal-drift">
          🌸
        </span>
        <span className="absolute top-40 right-[12%] text-lg opacity-50 animate-petal-drift-delayed">
          ✨
        </span>
        <span className="absolute bottom-28 left-[6%] text-base opacity-45 animate-petal-drift text-pink-400">
          ♥
        </span>
        <span className="absolute bottom-16 right-[20%] text-xl opacity-40 animate-petal-drift-delayed">
          🌷
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* Left Column: Romantic Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-white/95 px-4 py-1.5 shadow-sm shadow-pink-500/5 backdrop-blur-sm transition-all hover:border-pink-300 mb-6">
              <span className="text-sm text-[#ff3366] animate-heart-beat">♥</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#e11d48]">
                Crafted for Moments That Matter
              </span>
            </div>

            {/* Expressive Editorial Headline with linear Love Accent */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[4.2rem] font-bold tracking-tight text-[#1f1a1c] leading-[1.12]">
              Because some feelings deserve{" "}
              <span className="relative inline-block bg-linear-to-r from-[#e11d48] via-[#ff3366] to-[#ff758f] bg-clip-text text-transparent italic font-normal">
                more than a text.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3.5 text-[#ff758f]/40"
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
            <p className="mt-6 text-lg sm:text-xl text-[#524548] leading-relaxed max-w-2xl font-sans">
              Transform your cherished memories, heartfelt words, and favourite
              music into an intimate, interactive digital keepsake. A private
              gift crafted in minutes, treasured for a lifetime.
            </p>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                href="/templates"
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-full bg-linear-to-r from-[#ff3366] via-[#ff4d6d] to-[#ff758f] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-pink-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
              >
                <span>Create a Love Surprise</span>
                <span className="text-base transition-transform group-hover:scale-125">
                  ♥
                </span>
              </Link>

              <a
                href="#interactive-preview"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-pink-200/80 bg-white px-7 py-4 text-sm font-bold text-[#1f1a1c] shadow-xs backdrop-blur-sm transition-all hover:bg-pink-50/60 hover:border-[#ff3366] hover:text-[#ff3366]"
              >
                <span>See How It Feels</span>
                <span className="text-xs transition-transform group-hover:translate-x-1">
                  ↓
                </span>
              </a>
            </div>

            {/* Trust Metrics Strip */}
            <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 border-t border-pink-100 pt-8 w-full max-w-lg">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold bg-linear-to-r from-[#e11d48] to-[#ff3366] bg-clip-text text-transparent">
                  65,000+
                </div>
                <div className="text-xs text-[#6b5e62] mt-1 font-semibold">
                  Love Surprises Sent
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold bg-linear-to-r from-[#e11d48] to-[#ff3366] bg-clip-text text-transparent flex items-center gap-1">
                  <span>4.98</span>
                  <span className="text-amber-500 text-lg">★</span>
                </div>
                <div className="text-xs text-[#6b5e62] mt-1 font-semibold">
                  Emotional Joy Score
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold bg-linear-to-r from-[#e11d48] to-[#ff3366] bg-clip-text text-transparent">
                  100%
                </div>
                <div className="text-xs text-[#6b5e62] mt-1 font-semibold">
                  Free Instant Preview
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Luminous Romantic Envelope & Phone Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Soft Ambient Pink Shadow Aura */}
              <div className="absolute inset-4 rounded-[40px] bg-linear-to-tr from-[#ff3366]/20 via-[#ff758f]/25 to-pink-200/30 blur-2xl -z-10" />

              {/* Phone Showcase Frame */}
              <div className="relative mx-auto w-74 sm:w-82 rounded-[44px] border-8 border-[#1f1a1c] bg-white p-3 shadow-2xl shadow-pink-500/20 transition-all duration-500">
                {/* Phone Speaker Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-32 rounded-b-xl bg-[#1f1a1c] z-30" />

                {/* Inner Screen Container */}
                <div className="relative overflow-hidden rounded-4xl bg-linear-to-b from-[#fff5f7] via-[#ffffff] to-[#fff0f3] p-5 text-center min-h-125 flex flex-col justify-between border border-pink-100">
                  {/* Floating Micro Status Bar */}
                  <div className="pt-2 flex items-center justify-between text-[11px] text-[#6b5e62] font-sans">
                    <span className="flex items-center gap-1 font-semibold text-[#e11d48]">
                      <span>🔒</span> Private Link
                    </span>
                    <button
                      type="button"
                      onClick={toggleSound}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-0.5 border border-pink-200 text-[10px] font-semibold text-[#e11d48] shadow-2xs hover:bg-pink-50 transition-colors"
                    >
                      {isPlayingDemo ? (
                        <div className="flex items-center gap-0.5 h-3 px-0.5">
                          <span className="w-0.5 h-2 bg-[#ff3366] rounded-full animate-pulse" />
                          <span className="w-0.5 h-3 bg-[#e11d48] rounded-full animate-bounce" />
                          <span className="w-0.5 h-1.5 bg-[#ff758f] rounded-full animate-pulse" />
                        </div>
                      ) : (
                        <span>🎵</span>
                      )}
                      <span>{isPlayingDemo ? "Playing Melody" : "Play Sound"}</span>
                    </button>
                  </div>

                  {/* Envelope / Memory Card Body */}
                  <div className="my-auto py-4">
                    {!envelopeOpened ? (
                      /* Sealed Love Letter State */
                      <div className="space-y-4">
                        <div className="relative mx-auto size-28 rounded-3xl bg-linear-to-br from-[#ffffff] via-[#fff0f3] to-[#ffe5ec] border border-pink-200 shadow-md flex items-center justify-center p-3">
                          <div className="size-16 rounded-2xl bg-white shadow-inner flex flex-col items-center justify-center border border-pink-100">
                            <span className="text-3xl animate-heart-beat">
                              💌
                            </span>
                          </div>
                          {/* Wax Seal Detail */}
                          <div className="absolute -bottom-2 -right-2 size-9 rounded-full bg-linear-to-tr from-[#e11d48] to-[#ff3366] text-white flex items-center justify-center text-xs font-serif shadow-md border-2 border-white">
                            ♥
                          </div>
                        </div>

                        <div>
                          <div className="inline-block rounded-full bg-pink-100/70 px-3 py-1 text-[11px] font-bold text-[#e11d48] tracking-wide">
                            FOR SOMEONE CHERISHED
                          </div>
                          <h3 className="mt-2.5 font-serif text-2xl font-bold text-[#1f1a1c]">
                            A Special Surprise
                          </h3>
                          <p className="mt-1.5 text-xs text-[#6b5e62] leading-relaxed">
                            Someone who adores you made this memory just for you.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={openKeepsake}
                          className="w-full rounded-full bg-linear-to-r from-[#ff3366] via-[#ff4d6d] to-[#ff758f] py-3 text-xs font-bold text-white shadow-md shadow-pink-500/25 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                          Tap to Open Keepsake ✨
                        </button>
                      </div>
                    ) : (
                      /* Opened Keepsake State */
                      <div className="space-y-3 animate-in fade-in zoom-in-95 duration-400">
                        <div className="relative rounded-2xl bg-white p-3 shadow-md border border-pink-100">
                          <div className="aspect-4/3 rounded-xl bg-linear-to-br from-[#fff0f3] to-[#ffe5ec] flex flex-col items-center justify-center text-center p-3 relative overflow-hidden">
                            <span className="text-2xl mb-1">💑 ✨</span>
                            <p className="font-serif italic text-base text-[#1f1a1c] font-medium leading-snug">
                              &ldquo;Every love story is special, but ours is my
                              absolute favorite.&rdquo;
                            </p>
                            <span className="text-[10px] text-[#e11d48] mt-1 uppercase tracking-wider font-bold">
                              October 14 • Golden Hour
                            </span>
                          </div>
                        </div>

                        <div className="rounded-xl bg-white p-2.5 border border-pink-100 flex items-center justify-between text-left text-xs">
                          <div>
                            <div className="font-bold text-[#1f1a1c] text-[11px]">
                              🎵 Perfect Melody
                            </div>
                            <div className="text-[10px] text-[#6b5e62]">
                              Acoustic Piano &amp; Rain
                            </div>
                          </div>
                          <span className="size-2 rounded-full bg-[#ff3366] animate-ping" />
                        </div>

                        <button
                          type="button"
                          onClick={() => setEnvelopeOpened(false)}
                          className="text-[11px] font-bold text-[#e11d48] underline underline-offset-2 hover:opacity-80"
                        >
                          Close Letter ✉️
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Footnote inside the phone */}
                  <div className="text-[10px] text-[#8e7b7e] border-t border-pink-100 pt-2.5">
                    Made with love • Works on any device
                  </div>
                </div>
              </div>

              {/* Floating Pill Badges around Phone */}
              <div className="hidden sm:flex items-center gap-2.5 absolute -top-4 -left-8 rounded-2xl bg-white/95 px-4 py-2.5 shadow-xl shadow-pink-500/10 border border-pink-100 backdrop-blur-md z-30 transition-all hover:scale-105">
                <span className="text-lg">🎵</span>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#1f1a1c]">
                    Emotional Audio
                  </div>
                  <div className="text-[10px] text-[#6b5e62]">
                    Custom love tracks
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2.5 absolute bottom-12 -right-8 rounded-2xl bg-white/95 px-4 py-2.5 shadow-xl shadow-pink-500/10 border border-pink-100 backdrop-blur-md z-30 transition-all hover:scale-105">
                <span className="text-lg text-[#ff3366] animate-heart-beat">♥</span>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#1f1a1c]">
                    100% Private
                  </div>
                  <div className="text-[10px] text-[#6b5e62]">
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
