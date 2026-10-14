"use client";

import { useEffect } from "react";
import { playCelebrationChime } from "@/lib/romanticAudio";

interface BirthdayWishFlashStageProps {
  onComplete: () => void;
}

export function BirthdayWishFlashStage({ onComplete }: BirthdayWishFlashStageProps) {
  useEffect(() => {
    playCelebrationChime();
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      onClick={onComplete}
      className="relative min-h-full h-full w-full flex flex-col items-center justify-between p-6 sm:p-12 overflow-hidden bg-gradient-to-br from-[#c2185b] via-[#e91e63] to-[#ad1457] text-white select-none cursor-pointer"
    >
      {/* Subtle Grid Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radiant Glow Behind Text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="size-96 rounded-full bg-pink-300/25 blur-3xl scale-125 animate-pulse" />
      </div>

      {/* Top Text */}
      <div className="pt-16 sm:pt-24 text-center z-10 animate-in fade-in duration-500">
        <span className="font-serif italic text-lg sm:text-2xl text-amber-200 tracking-wide drop-shadow-sm">
          make a wish…
        </span>
      </div>

      {/* Center Big Bold Typography */}
      <div className="my-auto text-center z-10 animate-in zoom-in-90 fade-in duration-700">
        <h1 className="font-sans font-black text-5xl sm:text-7xl md:text-8xl tracking-tight leading-none text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
          Happy
          <br />
          Birthday
        </h1>
      </div>

      {/* Bottom Subtitle */}
      <div className="pb-16 sm:pb-20 text-center z-10 animate-in fade-in duration-700 delay-300">
        <p className="font-sans text-xs sm:text-sm md:text-base text-rose-100/90 font-medium tracking-widest uppercase">
          to someone worth celebrating
        </p>
      </div>
    </div>
  );
}
