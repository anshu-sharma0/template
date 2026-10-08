"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { playRomanticChime, playCelebrationChime } from "@/lib/romanticAudio";

export function InteractiveLoveSimulator() {
  const [activeTab, setActiveTab] = useState<"loveLetter" | "candles" | "scratch" | "wedding">("loveLetter");

  // Interactive states for the mini simulator
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [scratchRevealed, setScratchRevealed] = useState(false);
  const [letterOpen, setLetterOpen] = useState(true);
  const [audioPlaying, setAudioPlaying] = useState(true);

  const handleCandleAction = () => {
    if (!candlesBlown) {
      playCelebrationChime();
    }
    setCandlesBlown((prev) => !prev);
  };

  const handleScratchAction = () => {
    if (!scratchRevealed) {
      playRomanticChime();
    }
    setScratchRevealed((prev) => !prev);
  };

  const handleAudioToggle = () => {
    const next = !audioPlaying;
    if (next) {
      playRomanticChime();
    }
    setAudioPlaying(next);
  };

  const tabs = [
    { id: "loveLetter", label: "Intimate Love Letter", icon: "💌" },
    { id: "candles", label: "Virtual Birthday Candles", icon: "🕯️" },
    { id: "scratch", label: "Secret Scratch Reveal", icon: "✨" },
    { id: "wedding", label: "Wedding Keepsake & RSVP", icon: "💍" },
  ] as const;

  return (
    <section id="interactive-preview" className="py-20 sm:py-28 bg-gradient-to-b from-[#ffffff] via-[#fff8fa] to-[#ffffff] relative overflow-hidden">
      {/* Background radial pink aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[700px] rounded-full bg-gradient-to-tr from-[#ff758f]/15 via-[#ffe4ea]/30 to-transparent blur-3xl -z-10"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-white px-4 py-1.5 shadow-xs backdrop-blur-sm mb-4">
            <span className="text-xs text-[#ff3366] animate-heart-beat">✨</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#e11d48]">
              Live Interactive Simulator
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1f1a1c] leading-tight">
            Try the magic{" "}
            <span className="bg-gradient-to-r from-[#e11d48] via-[#ff3366] to-[#ff758f] bg-clip-text text-transparent italic">
              before you send it.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#524548] leading-relaxed">
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
                    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-[#ff3366] via-[#ff4d6d] to-[#ff758f] text-white shadow-md shadow-pink-500/25 scale-105"
                      : "bg-white border border-pink-200/80 text-[#6b5e62] hover:text-[#ff3366] hover:bg-pink-50/60"
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
        <div className="mx-auto max-w-4xl rounded-[36px] border border-pink-200/90 bg-white p-6 sm:p-10 shadow-xl shadow-pink-500/10 relative overflow-hidden">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Context & Explanations */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {activeTab === "loveLetter" && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <span className="inline-block rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-[#e11d48]">
                    EXPERIENCE 01 • INTIMATE LETTER
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-[#1f1a1c]">
                    The Whispered Letter
                  </h3>
                  <p className="text-sm text-[#524548] leading-relaxed font-sans">
                    A digital envelope that opens with a touch. Accompanied by
                    your chosen ambient melody and high-definition photography,
                    it feels like holding a real love letter.
                  </p>
                  <ul className="space-y-2 text-xs text-[#1f1a1c] font-medium">
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#ff3366]">♥</span> Custom background audio playing automatically
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#ff3366]">♥</span> Smooth wax-seal opening transition
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#ff3366]">♥</span> Clean, distraction-free reading experience
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/templates"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff3366] to-[#ff758f] px-6 py-3 text-xs font-bold text-white shadow-md shadow-pink-500/20 hover:scale-105 transition-all"
                    >
                      Personalize a Love Letter ♥
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "candles" && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <span className="inline-block rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-[#e11d48]">
                    EXPERIENCE 02 • CANDLE RITUAL
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-[#1f1a1c]">
                    Interactive Birthday Candles
                  </h3>
                  <p className="text-sm text-[#524548] leading-relaxed font-sans">
                    Make a wish! Recipients tap the screen or blow into their
                    microphone. The flames extinguish with celebratory audio and
                    golden confetti.
                  </p>
                  <ul className="space-y-2 text-xs text-[#1f1a1c] font-medium">
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#ff3366]">🕯️</span> Tap or blow to extinguish candles
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#ff3366]">🎉</span> Golden sparkle & confetti celebration burst
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#ff3366]">🎂</span> Beautiful customized cake illustration
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/birthday/create"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff3366] to-[#ff758f] px-6 py-3 text-xs font-bold text-white shadow-md shadow-pink-500/20 hover:scale-105 transition-all"
                    >
                      Create Birthday Surprise 🎂
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "scratch" && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <span className="inline-block rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-[#e11d48]">
                    EXPERIENCE 03 • MYSTERY SCRATCH
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-[#1f1a1c]">
                    Secret Scratch Reveal Card
                  </h3>
                  <p className="text-sm text-[#524548] leading-relaxed font-sans">
                    Hide a surprise gift, a weekend getaway plan, or your
                    sweetest secret confession. The recipient swipes their finger
                    to reveal what lies beneath.
                  </p>
                  <ul className="space-y-2 text-xs text-[#1f1a1c] font-medium">
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#ff3366]">✨</span> Satisfying digital scratch-to-reveal layer
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#ff3366]">🎁</span> Perfect for surprise tickets, gifts & promises
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#ff3366]">💌</span> Unforgettable element of play and anticipation
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/templates"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff3366] to-[#ff758f] px-6 py-3 text-xs font-bold text-white shadow-md shadow-pink-500/20 hover:scale-105 transition-all"
                    >
                      Build a Scratch Card Surprise ✨
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "wedding" && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-[#b45309]">
                    EXPERIENCE 04 • WEDDING MICROSITE
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-[#1f1a1c]">
                    Timeless Wedding Invitation
                  </h3>
                  <p className="text-sm text-[#524548] leading-relaxed font-sans">
                    Give your guests an invitation they will marvel at.
                    Real-time countdown, Google Maps venue navigation, and 1-tap
                    guest RSVP tracking directly from your phone.
                  </p>
                  <ul className="space-y-2 text-xs text-[#1f1a1c] font-medium">
                    <li className="flex items-center gap-2.5">
                      <span className="text-amber-600">💍</span> Luxury serif typography with gold detailing
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-amber-600">📍</span> 1-Tap Google Maps venue routing for guests
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-amber-600">💌</span> Live guest attendance & dietary RSVP collection
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/wedding/create"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff3366] to-[#ff758f] px-6 py-3 text-xs font-bold text-white shadow-md shadow-pink-500/20 hover:scale-105 transition-all"
                    >
                      Create Wedding Invitation 💍
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Live Interactive Simulator Phone */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-[280px] sm:w-[310px] rounded-[40px] border-[7px] border-[#1f1a1c] bg-white p-3 shadow-2xl shadow-pink-500/20">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-28 rounded-b-xl bg-[#1f1a1c] z-30" />

                <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-[#fff5f7] via-[#ffffff] to-[#fff0f3] p-4 text-center min-h-[460px] flex flex-col justify-between border border-pink-100">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between text-[10px] text-[#6b5e62] pt-1">
                    <span className="font-bold text-[#e11d48]">♥ LUMA PREVIEW</span>
                    <button
                      type="button"
                      onClick={handleAudioToggle}
                      className="rounded-full bg-white px-2.5 py-0.5 border border-pink-200 font-bold text-[#e11d48] shadow-2xs hover:bg-pink-50 transition-colors"
                    >
                      {audioPlaying ? "🎵 Melody Playing" : "🔈 Sound Muted"}
                    </button>
                  </div>

                  {/* Simulator Screen Content Based on Active Tab */}
                  <div className="my-auto py-3">
                    {activeTab === "loveLetter" && (
                      <div className="space-y-3">
                        <div className="rounded-2xl bg-white p-4 shadow-sm border border-pink-100 text-center">
                          <span className="text-3xl">💌</span>
                          <h4 className="font-serif text-lg font-bold text-[#1f1a1c] mt-2">
                            To My Dearest Sarah
                          </h4>
                          <p className="font-serif italic text-xs text-[#524548] mt-1.5 leading-relaxed">
                            &ldquo;Looking back at our photos, I realize every
                            day with you has been the best adventure of my
                            life.&rdquo;
                          </p>
                          <div className="mt-3 inline-block rounded-full bg-pink-50 px-2.5 py-0.5 text-[10px] text-[#e11d48] font-bold border border-pink-200">
                            With all my love, forever ♥
                          </div>
                        </div>

                        <div className="rounded-xl bg-white p-2.5 border border-pink-100 flex items-center justify-between text-xs">
                          <span className="font-bold text-[#1f1a1c] text-[11px]">
                            📸 14 Memories Attached
                          </span>
                          <span className="text-[10px] text-[#ff3366] font-bold">
                            View Gallery →
                          </span>
                        </div>
                      </div>
                    )}

                    {activeTab === "candles" && (
                      <div className="space-y-3 text-center">
                        <div className="rounded-2xl bg-white p-4 shadow-sm border border-pink-100">
                          <div className="text-3xl tracking-widest transition-all duration-300">
                            {candlesBlown ? "💨 ✨ 🎂 ✨ 🎉" : "🕯️ 🕯️ 🎂 🕯️ 🕯️"}
                          </div>

                          <h4 className="font-serif text-lg font-bold text-[#1f1a1c] mt-3">
                            {candlesBlown
                              ? "Wish Granted! ✨"
                              : "Make a Birthday Wish"}
                          </h4>

                          <p className="text-xs text-[#524548] mt-1">
                            {candlesBlown
                              ? "May all your dreams come true this year! ❤️"
                              : "Tap the button below to blow out your candles."}
                          </p>

                          <button
                            type="button"
                            onClick={handleCandleAction}
                            className="mt-4 w-full rounded-full bg-gradient-to-r from-[#ff3366] to-[#ff758f] py-2 text-xs font-bold text-white shadow-sm shadow-pink-500/25 hover:scale-[1.02] active:scale-95 transition-all"
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
                        <div className="rounded-2xl bg-white p-4 shadow-sm border border-pink-100">
                          <span className="text-xs font-bold uppercase tracking-wider text-pink-600">
                            SECRET REVEAL CARD
                          </span>

                          <div
                            onClick={handleScratchAction}
                            className={cn(
                              "mt-3 rounded-xl p-4 cursor-pointer transition-all duration-300 border",
                              scratchRevealed
                                ? "bg-pink-50 border-pink-200"
                                : "bg-gradient-to-r from-[#ff758f] via-[#ff4d6d] to-[#ff85a1] border-pink-300 text-white shadow-md shadow-pink-500/20"
                            )}
                          >
                            {scratchRevealed ? (
                              <div className="animate-in zoom-in-95 duration-200">
                                <span className="text-2xl">✈️ 🏝️ ❤️</span>
                                <div className="font-serif text-sm font-bold text-[#e11d48] mt-1">
                                  Pack your bags!
                                </div>
                                <div className="text-[11px] text-[#524548] mt-0.5">
                                  Weekend in Paris for your birthday!
                                </div>
                              </div>
                            ) : (
                              <div>
                                <span className="text-xl">✨ 🎁 ✨</span>
                                <div className="text-xs font-bold mt-1">
                                  Tap / Scratch to Reveal!
                                </div>
                                <div className="text-[10px] opacity-90">
                                  Secret message hidden underneath
                                </div>
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={handleScratchAction}
                            className="mt-3 text-[11px] font-bold text-[#ff3366] underline hover:opacity-80"
                          >
                            {scratchRevealed ? "Hide Again" : "Reveal Secret"}
                          </button>
                        </div>
                      </div>
                    )}

                    {activeTab === "wedding" && (
                      <div className="space-y-3 text-center">
                        {/* Light Luxury Wedding Theme Card */}
                        <div className="rounded-2xl bg-gradient-to-br from-white to-[#fffbf5] text-[#1f1a1c] p-4 shadow-sm border-2 border-amber-200/90">
                          <div className="text-[10px] tracking-widest text-amber-700 uppercase font-bold">
                            TOGETHER WITH THEIR FAMILIES
                          </div>
                          <h4 className="font-serif text-xl font-bold text-[#1f1a1c] mt-1">
                            Kabir &amp; Rhea
                          </h4>
                          <div className="text-[11px] text-amber-700 mt-0.5 font-serif italic font-semibold">
                            December 18, 2026 • Udaipur
                          </div>

                          <div className="mt-3 grid grid-cols-2 gap-2 text-left">
                            <div className="rounded-lg bg-amber-50 p-2 text-[10px] border border-amber-200/50">
                              <div className="text-amber-800/70 font-semibold">VENUE</div>
                              <div className="font-bold text-[#1f1a1c]">The Oberoi Udaivilas</div>
                            </div>
                            <div className="rounded-lg bg-amber-50 p-2 text-[10px] border border-amber-200/50">
                              <div className="text-amber-800/70 font-semibold">GUEST RSVP</div>
                              <div className="font-bold text-amber-700">Confirmed (2 Guests)</div>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="mt-3 w-full rounded-full bg-gradient-to-r from-amber-500 to-amber-600 py-2 text-xs font-bold text-white shadow-sm shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                          >
                            1-Tap Google Maps Directions 📍
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Simulator Screen Bottom Hint */}
                  <div className="text-[10px] text-[#8e7b7e] border-t border-pink-100 pt-2">
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
