"use client";

import { useState } from "react";
import Image from "next/image";
import { playCelebrationChime, playRomanticChime } from "@/lib/romanticAudio";

interface BirthdayFinaleStageProps {
  recipientName: string;
  senderName: string;
  onRestart: () => void;
  onShare?: () => void;
  isPreview?: boolean;
}

export function BirthdayFinaleStage({
  recipientName,
  senderName,
  onRestart,
  onShare,
  isPreview = true,
}: BirthdayFinaleStageProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [heartsShower, setHeartsShower] = useState(false);

  const handleShareClick = () => {
    playCelebrationChime();
    setHeartsShower(true);

    if (onShare) {
      onShare();
      return;
    }

    if (typeof window !== "undefined") {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
      }
      setToastMessage("Private keepsake link copied! Ready to send 🎁");
      setTimeout(() => setToastMessage(null), 3000);
      setTimeout(() => setHeartsShower(false), 3000);
    }
  };

  const handleLoveClick = () => {
    playRomanticChime();
    setHeartsShower(true);
    setToastMessage(`Your love was sent back to ${senderName || "them"}! 💕`);
    setTimeout(() => setToastMessage(null), 3000);
    setTimeout(() => setHeartsShower(false), 3000);
  };

  return (
    <div className="relative min-h-full h-full w-full flex flex-col justify-between items-center p-4 sm:p-8 overflow-hidden bg-gradient-to-b from-[#130b24] via-[#1f1035] to-[#291345] text-white select-none">
      {/* Cosmic Twinkling Stars Background */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              top: `${(i * 19) % 95}%`,
              left: `${(i * 29) % 95}%`,
              opacity: (i % 4) * 0.25 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Celebratory Continuous Confetti Blast */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
        {Array.from({ length: 45 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-sm sm:text-base animate-bounce"
            style={{
              top: `${(i * 8) % 92 + 4}%`,
              left: `${(i * 11) % 94 + 3}%`,
              animationDuration: `${2.0 + (i % 4) * 0.5}s`,
              opacity: 0.9,
            }}
          >
            {["🎉", "✨", "🎊", "⭐", "🌸", "🎈", "💖", "💫"][i % 8]}
          </span>
        ))}
      </div>

      {/* Floating Hearts Shower on Love Reaction */}
      {heartsShower && (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="absolute animate-in fade-in zoom-in-75 text-2xl"
              style={{
                bottom: "20%",
                left: `${(i * 13) % 85 + 5}%`,
                animation: "floatUp 2.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
              }}
            >
              {["💖", "💕", "✨", "🌸", "♥", "🌷"][i % 6]}
            </span>
          ))}
        </div>
      )}

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 rounded-full bg-white/95 px-5 py-2.5 text-xs font-bold text-[#e11d48] border border-pink-200 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95">
          {toastMessage}
        </div>
      )}

      {/* Top Space for Navigation Bar */}
      <div className="pt-16 sm:pt-20" />

      {/* Center Grand Typography & Cute Mascot Cat */}
      <div className="my-auto z-20 flex flex-col items-center justify-center text-center space-y-6 max-w-lg mx-auto">
        {/* Grand Headline */}
        <div className="space-y-1 animate-in zoom-in-95 duration-500">
          <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider text-white drop-shadow-[0_4px_20px_rgba(255,255,255,0.2)]">
            HAPPY BIRTHDAY
          </h1>
          <h2 className="font-serif italic font-extrabold text-3xl sm:text-4xl md:text-5xl text-amber-300 drop-shadow-[0_4px_25px_rgba(251,191,36,0.4)]">
            {recipientName}!
          </h2>
        </div>

        {/* Celebratory Cat Mascot with Red Cap & Flower Bouquet */}
        <div
          onClick={handleLoveClick}
          className="relative size-36 sm:size-44 cursor-pointer group animate-gentle-float"
        >
          {/* Orbital Confetti Ring */}
          <div className="absolute inset-0 -m-4 rounded-full border-2 border-dashed border-pink-400/30 animate-spin" style={{ animationDuration: "20s" }} />

          {/* Glowing Aura */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500/30 to-amber-400/20 blur-xl" />

          {/* Mascot Image */}
          <div className="relative size-full rounded-full overflow-hidden border-2 border-amber-300/60 shadow-[0_10px_35px_rgba(0,0,0,0.5)] group-hover:scale-105 active:scale-95 transition-transform duration-300">
            <Image
              src="/birthday-cat-mascot.jpg"
              alt="Birthday Celebration Mascot"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Mini heart reaction badge */}
          <div className="absolute -bottom-1 -right-1 size-8 rounded-full bg-rose-600 text-white flex items-center justify-center text-sm shadow-md border-2 border-white group-hover:scale-125 transition-transform">
            💖
          </div>
        </div>

        {/* Sender Dedication */}
        <div className="space-y-1 pt-2 animate-in fade-in duration-700">
          <p className="text-xs sm:text-sm text-pink-200/90 font-medium">
            Made with love, just for you —{" "}
            <span className="font-bold text-amber-300">{senderName || "Mohammed Anthony"}</span> ❤️
          </p>
        </div>

        {/* Primary CTA Button: Send it to Recipient */}
        <div className="w-full max-w-xs space-y-2.5 pt-2">
          <button
            type="button"
            onClick={handleShareClick}
            className="w-full rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:opacity-95 active:scale-95 py-3.5 px-6 text-xs sm:text-sm font-bold text-white shadow-[0_0_30px_rgba(244,63,94,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{isPreview ? `Send it to ${recipientName} 🎁` : "Share This Surprise 🎁"}</span>
          </button>
          <p className="text-[10px] text-pink-200/60 flex items-center justify-center gap-1">
            <span>🔗</span>
            <span>This creates the private link you&apos;ll send them</span>
          </p>
        </div>
      </div>

      {/* Bottom Replay Action */}
      <div className="pb-8 text-center z-20">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs font-semibold uppercase tracking-wider border border-white/15 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
        >
          <span>Watch again</span>
          <span>↺</span>
        </button>
      </div>
    </div>
  );
}
