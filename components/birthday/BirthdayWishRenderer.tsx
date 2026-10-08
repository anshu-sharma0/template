"use client";

import { useState } from "react";
import type { BirthdayWishData } from "@/lib/birthday-types";
import { playRomanticChime } from "@/lib/romanticAudio";

import { BirthdayUnboxingGate } from "./BirthdayUnboxingGate";
import { BirthdayHeroSection } from "./BirthdayHeroSection";
import { BirthdayCountdownAndCandles } from "./BirthdayCountdownAndCandles";
import { BirthdayMemoriesFilmstrip } from "./BirthdayMemoriesFilmstrip";
import { BirthdaySpecialReasons } from "./BirthdaySpecialReasons";
import { BirthdayPersonalLetter } from "./BirthdayPersonalLetter";
import { BirthdayQuoteSection } from "./BirthdayQuoteSection";
import { BirthdayFinaleCelebration } from "./BirthdayFinaleCelebration";

type BirthdayWishRendererProps = {
  data: BirthdayWishData;
  compact?: boolean;
  autoOpen?: boolean;
};

export function BirthdayWishRenderer({
  data,
  compact = false,
  autoOpen = false,
}: BirthdayWishRendererProps) {
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const recipient = data.recipientName || "Khushi";
  const sender = data.senderName || "Akshat";

  const handleOpenExperience = () => {
    setIsOpen(true);
    setIsPlayingMusic(true);
    playRomanticChime();
  };

  const handleToggleMusic = () => {
    const next = !isPlayingMusic;
    if (next) {
      playRomanticChime();
    }
    setIsPlayingMusic(next);
  };

  // Phase 1: Sealed Unboxing Gatekeeper Screen
  if (!isOpen) {
    return (
      <BirthdayUnboxingGate
        recipientName={recipient}
        senderName={sender}
        onOpen={handleOpenExperience}
      />
    );
  }

  // Phase 2: Full Living Keepsake Digital Gift Experience
  return (
    <div className="relative min-h-full overflow-y-auto bg-linear-to-b from-[#fffbf8] via-[#fff5f7] to-[#fff0f3] text-[#1f1a1c] select-none transition-all duration-700 animate-in fade-in zoom-in-95">
      {/* Sticky Top Audio Control Bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-4 py-2.5 bg-white/80 backdrop-blur-md border-b border-pink-100/80">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#e11d48]">
          <span className="size-2 rounded-full bg-[#ff3366] animate-ping" />
          <span>Birthday Surprise</span>
        </div>

        <button
          type="button"
          onClick={handleToggleMusic}
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 border border-pink-200 text-[10px] font-bold text-[#e11d48] shadow-2xs hover:bg-pink-50 transition-colors"
        >
          {isPlayingMusic ? (
            <div className="flex items-center gap-0.5 h-3 px-0.5">
              <span className="w-0.5 h-2 bg-[#ff3366] rounded-full animate-pulse" />
              <span className="w-0.5 h-3 bg-[#e11d48] rounded-full animate-bounce" />
              <span className="w-0.5 h-1.5 bg-[#ff758f] rounded-full animate-pulse" />
            </div>
          ) : (
            <span>🔈</span>
          )}
          <span>{isPlayingMusic ? "Playing Melody" : "Muted"}</span>
        </button>
      </div>

      {/* Chapter 1: Birthday Hero & Radiant Identity */}
      <BirthdayHeroSection
        recipientName={recipient}
        relationship={data.relationship || ""}
        age={data.age}
        birthDate={data.birthDate}
        mainPhoto={data.mainPhoto}
      />

      {/* Chapter 2: Dynamic Countdown & Interactive Candle Ritual */}
      <BirthdayCountdownAndCandles
        birthDate={data.birthDate}
        recipientName={recipient}
      />

      {/* Chapter 3: "Our Memories" Polaroid Film-strip */}
      <BirthdayMemoriesFilmstrip
        memories={data.memories}
        fallbackPhotos={data.photos}
        recipientName={recipient}
      />

      {/* Chapter 4: "Why You're Special" Soul Cards */}
      <BirthdaySpecialReasons
        reasons={data.specialReasons}
        recipientName={recipient}
      />

      {/* Chapter 5: "From My Heart" Personal Love Letter */}
      <BirthdayPersonalLetter
        message={data.message}
        senderName={sender}
        recipientName={recipient}
      />

      {/* Chapter 6: The Timeless Birthday Quote */}
      <BirthdayQuoteSection
        quote={data.quote}
        recipientName={recipient}
      />

      {/* Chapter 7: Emotional Climax & Love Reciprocation Finale */}
      <BirthdayFinaleCelebration
        recipientName={recipient}
        senderName={sender}
      />
    </div>
  );
}
