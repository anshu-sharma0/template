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
    <div className="relative min-h-full overflow-y-auto bg-gradient-to-b from-[var(--love-canvas-ivory)] via-[var(--love-surface-blush)] to-[var(--love-surface-peach)] text-[var(--love-text-heading)] select-none transition-all duration-700 animate-in fade-in zoom-in-95">
      {/* Sticky Top Audio Control Bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-4 py-2.5 bg-white/80 backdrop-blur-md border-b border-[var(--love-border-subtle)]">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--love-crimson)]">
          <span className="size-2 rounded-full bg-[var(--love-crimson)] animate-ping" />
          <span>Birthday Surprise</span>
        </div>

        <button
          type="button"
          onClick={handleToggleMusic}
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 border border-[var(--love-border)] text-[10px] font-bold text-[var(--love-crimson)] shadow-2xs hover:bg-[var(--love-surface-blush)] transition-colors"
        >
          {isPlayingMusic ? (
            <div className="flex items-center gap-0.5 h-3 px-0.5">
              <span className="w-0.5 h-2 bg-[var(--love-rose)] rounded-full animate-pulse" />
              <span className="w-0.5 h-3 bg-[var(--love-crimson)] rounded-full animate-bounce" />
              <span className="w-0.5 h-1.5 bg-[var(--love-pink)] rounded-full animate-pulse" />
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
