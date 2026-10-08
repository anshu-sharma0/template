"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function InteractiveLoveSimulator() {
  const [activeTab, setActiveTab] = useState<"loveLetter" | "candles" | "scratch" | "wedding">("loveLetter");

  // Interactive states for the mini simulator
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [scratchRevealed, setScratchRevealed] = useState(false);
  const [letterOpen, setLetterOpen] = useState(true);
  const [audioPlaying, setAudioPlaying] = useState(true);

  const tabs = [
    { id: "loveLetter", label: "Intimate Love Letter", icon: "💌" },
    { id: "candles", label: "Virtual Birthday Candles", icon: "🕯️" },
    { id: "scratch", label: "Secret Scratch Reveal", icon: "✨" },
    { id: "wedding", label: "Wedding Keepsake & RSVP", icon: "💍" },
  ] as const;

  return (
    <section id="interactive-preview" className="py-20 sm:py-28 bg-[#fffaf5] relative overflow-hidden">
      {/* Background radial aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full bg-gradient-to-tr from-[#b05765]/10 via-[#fceae6]/30 to-transparent blur-3xl -z-10"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#eedad5] bg-white px-4 py-1.5 shadow-2xs backdrop-blur-sm mb-4">
            <span className="text-xs text-[#873d4d]">✨</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#873d4d]">
              Live Interactive Simulator
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2c2224] leading-tight">
            Try the magic before you send it.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#6e5d60] leading-relaxed">
            Your recipient doesn&apos;t just read a card. They blow out real virtual
            candles, unlock secret scratch notes, and listen to music made for them.
          </p>

          {/* Tab Selector */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-[#873d4d] text-white shadow-md shadow-[#873d4d]/25 scale-105"
                      : "bg-white border border-[#eedad5] text-[#6e5d60] hover:text-[#2c2224] hover:bg-[#fff0eb]"
                  )}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Device Canvas */}
        <div className="mx-auto max-w-4xl rounded-[36px] border border-[#ecdcd5] bg-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Context & Explanations */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {activeTab === "loveLetter" && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <span className="inline-block rounded-full bg-[#fceae6] px-3 py-1 text-xs font-bold text-[#873d4d]">
                    EXPERIENCE 01 • INTIMATE LETTER
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-[#2c2224]">
                    The Whispered Letter
                  </h3>
                  <p className="text-sm text-[#6e5d60] leading-relaxed">
                    A digital envelope that opens with a touch. Accompanied by
                    your chosen ambient melody and high-definition photography,
                    it feels like holding a real love letter.
                  </p>
                  <ul className="space-y-2 text-xs text-[#2c2224] font-medium">
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#873d4d]">♥</span> Custom background audio playing automatically
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#873d4d]">♥</span> Smooth wax-seal opening transition
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#873d4d]">♥</span> Clean, distraction-free reading experience
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/templates"
                      className="inline-flex items-center gap-2 rounded-full bg-[#873d4d] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#6b1d2f]"
                    >
                      Personalize a Love Letter ♥
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "candles" && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <span className="inline-block rounded-full bg-[#fceae6] px-3 py-1 text-xs font-bold text-[#873d4d]">
                    EXPERIENCE 02 • CANDLE RITUAL
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-[#2c2224]">
                    Interactive Birthday Candles
                  </h3>
                  <p className="text-sm text-[#6e5d60] leading-relaxed">
                    Make a wish! Recipients tap the screen or blow into their
                    microphone. The flames extinguish with celebratory audio and
                    golden confetti.
                  </p>
                  <ul className="space-y-2 text-xs text-[#2c2224] font-medium">
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#873d4d]">🕯️</span> Tap or blow to extinguish candles
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#873d4d]">🎉</span> Golden sparkle & confetti celebration burst
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#873d4d]">🎂</span> Beautiful customized cake illustration
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/birthday/create"
                      className="inline-flex items-center gap-2 rounded-full bg-[#873d4d] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#6b1d2f]"
                    >
                      Create Birthday Surprise 🎂
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "scratch" && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <span className="inline-block rounded-full bg-[#fceae6] px-3 py-1 text-xs font-bold text-[#873d4d]">
                    EXPERIENCE 03 • MYSTERY SCRATCH
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-[#2c2224]">
                    Secret Scratch Reveal Card
                  </h3>
                  <p className="text-sm text-[#6e5d60] leading-relaxed">
                    Hide a surprise gift, a weekend getaway plan, or your
                    sweetest secret confession. The recipient swipes their finger
                    to reveal what lies beneath.
                  </p>
                  <ul className="space-y-2 text-xs text-[#2c2224] font-medium">
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#873d4d]">✨</span> Satisfying digital scratch-to-reveal layer
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#873d4d]">🎁</span> Perfect for surprise tickets, gifts & promises
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#873d4d]">💌</span> Unforgettable element of play and anticipation
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/templates"
                      className="inline-flex items-center gap-2 rounded-full bg-[#873d4d] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#6b1d2f]"
                    >
                      Build a Scratch Card Surprise ✨
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "wedding" && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <span className="inline-block rounded-full bg-[#fdf5e6] px-3 py-1 text-xs font-bold text-[#8a6934]">
                    EXPERIENCE 04 • WEDDING MICROSITE
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-[#2c2224]">
                    Timeless Wedding Invitation
                  </h3>
                  <p className="text-sm text-[#6e5d60] leading-relaxed">
                    Give your guests an invitation they will marvel at.
                    Real-time countdown, Google Maps venue navigation, and 1-tap
                    guest RSVP tracking directly from your phone.
                  </p>
                  <ul className="space-y-2 text-xs text-[#2c2224] font-medium">
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#8a6934]">💍</span> Luxury serif typography with gold detailing
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#8a6934]">📍</span> 1-Tap Google Maps venue routing for guests
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#8a6934]">💌</span> Live guest attendance & dietary RSVP collection
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/wedding/create"
                      className="inline-flex items-center gap-2 rounded-full bg-[#873d4d] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#6b1d2f]"
                    >
                      Create Wedding Invitation 💍
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Live Interactive Simulator Phone */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-[280px] sm:w-[310px] rounded-[40px] border-[7px] border-[#2c2224] bg-white p-3 shadow-2xl shadow-[#873d4d]/15">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-28 rounded-b-xl bg-[#2c2224] z-30" />

                <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-[#fff6f4] to-[#fdedeb] p-4 text-center min-h-[460px] flex flex-col justify-between border border-[#eedad5]">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between text-[10px] text-[#8e7b7e] pt-1">
                    <span className="font-semibold text-[#873d4d]">♥ LUMA PREVIEW</span>
                    <button
                      type="button"
                      onClick={() => setAudioPlaying((p) => !p)}
                      className="rounded-full bg-white px-2 py-0.5 border border-[#eedad5] font-semibold text-[#873d4d]"
                    >
                      {audioPlaying ? "🎵 Melody Playing" : "🔈 Sound Muted"}
                    </button>
                  </div>

                  {/* Simulator Screen Content Based on Active Tab */}
                  <div className="my-auto py-3">
                    {activeTab === "loveLetter" && (
                      <div className="space-y-3">
                        <div className="rounded-2xl bg-white p-4 shadow-sm border border-[#eedad5] text-center">
                          <span className="text-3xl">💌</span>
                          <h4 className="font-serif text-lg font-bold text-[#2c2224] mt-2">
                            To My Dearest Sarah
                          </h4>
                          <p className="font-serif italic text-xs text-[#6e5d60] mt-1.5 leading-relaxed">
                            &ldquo;Looking back at our photos, I realize every
                            day with you has been the best adventure of my
                            life.&rdquo;
                          </p>
                          <div className="mt-3 inline-block rounded-full bg-[#fff0ed] px-2.5 py-0.5 text-[10px] text-[#873d4d] font-semibold">
                            With all my love, forever ♥
                          </div>
                        </div>

                        <div className="rounded-xl bg-white/90 p-2.5 border border-[#eedad5] flex items-center justify-between text-xs">
                          <span className="font-semibold text-[#2c2224] text-[11px]">
                            📸 14 Memories Attached
                          </span>
                          <span className="text-[10px] text-[#873d4d] font-bold">
                            View Gallery →
                          </span>
                        </div>
                      </div>
                    )}

                    {activeTab === "candles" && (
                      <div className="space-y-3 text-center">
                        <div className="rounded-2xl bg-white p-4 shadow-sm border border-[#eedad5]">
                          <div className="text-3xl tracking-widest transition-all duration-300">
                            {candlesBlown ? "💨 ✨ 🎂 ✨ 🎉" : "🕯️ 🕯️ 🎂 🕯️ 🕯️"}
                          </div>

                          <h4 className="font-serif text-lg font-bold text-[#2c2224] mt-3">
                            {candlesBlown
                              ? "Wish Granted! ✨"
                              : "Make a Birthday Wish"}
                          </h4>

                          <p className="text-xs text-[#6e5d60] mt-1">
                            {candlesBlown
                              ? "May all your dreams come true this year! ❤️"
                              : "Tap the button below to blow out your candles."}
                          </p>

                          <button
                            type="button"
                            onClick={() => setCandlesBlown((prev) => !prev)}
                            className="mt-4 w-full rounded-full bg-[#873d4d] py-2 text-xs font-bold text-white shadow-sm hover:bg-[#6b1d2f]"
                          >
                            {candlesBlown
                              ? "Relight Candles 🕯️"
                              : "Blow the Candles! 💨"}
                          </button>
                        </div>
                      </div>
                    )}

                    {activeTab === "scratch" && (
                      <div className="space-y-3 text-center">
                        <div className="rounded-2xl bg-white p-4 shadow-sm border border-[#eedad5]">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#8e7b7e]">
                            SECRET REVEAL CARD
                          </span>

                          <div
                            onClick={() => setScratchRevealed((r) => !r)}
                            className={cn(
                              "mt-3 rounded-xl p-4 cursor-pointer transition-all duration-300 border",
                              scratchRevealed
                                ? "bg-[#fff0ed] border-[#f2cfc7]"
                                : "bg-gradient-to-r from-[#d4a373] to-[#c6a15b] border-[#b08d48] text-white shadow-inner"
                            )}
                          >
                            {scratchRevealed ? (
                              <div className="animate-in zoom-in-95 duration-200">
                                <span className="text-2xl">✈️ 🏝️ ❤️</span>
                                <div className="font-serif text-sm font-bold text-[#873d4d] mt-1">
                                  Pack your bags!
                                </div>
                                <div className="text-[11px] text-[#6e5d60] mt-0.5">
                                  Weekend in Paris for your birthday!
                                </div>
                              </div>
                            ) : (
                              <div>
                                <span className="text-xl">✨ 🎁 ✨</span>
                                <div className="text-xs font-bold mt-1">
                                  Tap / Scratch to Reveal!
                                </div>
                                <div className="text-[10px] opacity-80">
                                  Secret message hidden underneath
                                </div>
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => setScratchRevealed((r) => !r)}
                            className="mt-3 text-[11px] font-semibold text-[#873d4d] underline"
                          >
                            {scratchRevealed ? "Hide Again" : "Reveal Secret"}
                          </button>
                        </div>
                      </div>
                    )}

                    {activeTab === "wedding" && (
                      <div className="space-y-3 text-center">
                        <div className="rounded-2xl bg-[#20191a] text-white p-4 shadow-sm border border-[#48373b]">
                          <div className="text-[10px] tracking-widest text-[#dfc287] uppercase font-semibold">
                            TOGETHER WITH THEIR FAMILIES
                          </div>
                          <h4 className="font-serif text-xl font-bold text-white mt-1">
                            Kabir &amp; Rhea
                          </h4>
                          <div className="text-[11px] text-[#dfc287] mt-0.5 font-serif italic">
                            December 18, 2026 • Udaipur
                          </div>

                          <div className="mt-3 grid grid-cols-2 gap-2 text-left">
                            <div className="rounded-lg bg-white/10 p-2 text-[10px]">
                              <div className="text-white/60">VENUE</div>
                              <div className="font-bold text-white">The Oberoi Udaivilas</div>
                            </div>
                            <div className="rounded-lg bg-white/10 p-2 text-[10px]">
                              <div className="text-white/60">GUEST RSVP</div>
                              <div className="font-bold text-[#dfc287]">Confirmed (2 Guests)</div>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="mt-3 w-full rounded-full bg-[#c6a15b] py-1.5 text-xs font-bold text-[#191514]"
                          >
                            1-Tap Google Maps Directions 📍
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Simulator Screen Bottom Hint */}
                  <div className="text-[10px] text-[#8e7b7e] border-t border-[#f1ded8] pt-2">
                    Interactive Recipient Simulation
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
