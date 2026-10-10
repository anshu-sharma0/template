"use client";

import { useState } from "react";
import { playPopSound, playRomanticChime } from "@/lib/romanticAudio";
import type { SpecialReasonItem } from "@/lib/birthday-types";

interface BirthdayBalloonsStageProps {
  reasons?: SpecialReasonItem[];
  onComplete: () => void;
}

export function BirthdayBalloonsStage({ reasons, onComplete }: BirthdayBalloonsStageProps) {
  const defaultReasons: SpecialReasonItem[] = [
    {
      emoji: "💖",
      title: "Reason No. 1",
      description: "You make every room brighter and warmer the second you walk into it.",
    },
    {
      emoji: "🌸",
      title: "Reason No. 2",
      description: "The way you laugh until your cheeks hurt and make everyone laugh with you.",
    },
    {
      emoji: "✨",
      title: "Reason No. 3",
      description: "How deeply and purely you care about everyone around you.",
    },
    {
      emoji: "🌟",
      title: "Reason No. 4",
      description: "Your gentle patience and the comforting peace you bring to my soul.",
    },
    {
      emoji: "🌹",
      title: "Reason No. 5",
      description: "Because simply having you in this world is the greatest blessing.",
    },
  ];

  const items = reasons && reasons.length >= 3 ? reasons.slice(0, 5) : defaultReasons;

  // Balloon configs with distinct pastel colors
  const balloons = [
    { id: 0, color: "from-[#ff7597] to-[#f43f5e]", stringColor: "#fda4af", label: "1" },
    { id: 1, color: "from-[#c084fc] to-[#a855f7]", stringColor: "#e9d5ff", label: "2" },
    { id: 2, color: "from-[#38bdf8] to-[#0284c7]", stringColor: "#bae6fd", label: "3" },
    { id: 3, color: "from-[#fde047] to-[#eab308]", stringColor: "#fef08a", label: "4" },
    { id: 4, color: "from-[#fb923c] to-[#ea580c]", stringColor: "#fed7aa", label: "5" },
  ];

  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const [poppingId, setPoppingId] = useState<number | null>(null);

  const handlePop = (id: number) => {
    if (poppedBalloons.includes(id)) return;
    setPoppingId(id);
    playPopSound();

    setTimeout(() => {
      setPoppedBalloons((prev) => [...prev, id]);
      setPoppingId(null);
      if (poppedBalloons.length + 1 >= items.length) {
        playRomanticChime();
      }
    }, 200);
  };

  const remaining = items.length - poppedBalloons.length;
  const allPopped = remaining === 0;

  return (
    <div className="relative min-h-full h-full w-full flex flex-col justify-between p-4 sm:p-8 overflow-y-auto bg-gradient-to-b from-[#130b24] via-[#1f1035] to-[#291345] text-white select-none">
      {/* Cosmic Twinkling Stars */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
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
        <div className="absolute top-1/3 right-1/4 size-80 rounded-full bg-rose-500/10 blur-3xl" />
      </div>

      {/* Top Header */}
      <div className="pt-14 sm:pt-16 text-center z-10 animate-in fade-in duration-500">
        <h2 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
          <span>Pop the balloons</span>
          <span>🎈</span>
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-pink-200/80 font-medium max-w-sm mx-auto">
          {allPopped
            ? "You popped all 5! ❤️"
            : `${remaining} balloon${remaining > 1 ? "s" : ""}. Each one holds a reason you're loved. Pop them all ❤️`}
        </p>
      </div>

      {/* Floating Interactive Balloons Row */}
      <div className="my-6 z-20 flex justify-center items-end gap-2.5 sm:gap-4 min-h-36">
        {balloons.map((b, idx) => {
          const isPopped = poppedBalloons.includes(b.id);
          const isCurrentlyPopping = poppingId === b.id;

          if (isPopped) return null;

          return (
            <div
              key={b.id}
              onClick={() => handlePop(b.id)}
              className={`relative flex flex-col items-center cursor-pointer group transition-transform duration-300 ${
                isCurrentlyPopping ? "scale-125 opacity-0" : "animate-gentle-float hover:scale-110 active:scale-95"
              }`}
              style={{
                animationDelay: `${idx * 0.3}s`,
                animationDuration: `${3.5 + idx * 0.5}s`,
              }}
              title="Tap to pop balloon"
            >
              {/* 3D Balloon Sphere */}
              <div
                className={`relative w-12 sm:w-14 h-16 sm:h-18 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] bg-gradient-to-tr ${b.color} shadow-[0_10px_20px_rgba(0,0,0,0.3)] flex items-center justify-center border-t border-white/50`}
              >
                {/* Glossy highlight */}
                <div className="absolute top-2 left-2 w-3.5 h-6 rounded-full bg-white/40 -rotate-25 blur-2xs" />
                {/* Number glyph */}
                <span className="text-white font-bold text-xs opacity-90 drop-shadow-xs">
                  {b.label}
                </span>
                {/* Balloon knot */}
                <div className="absolute -bottom-1 size-2 rounded-full bg-inherit" />
              </div>

              {/* Dangling String */}
              <svg className="w-2 h-10 -mt-0.5 overflow-visible" viewBox="0 0 10 40">
                <path
                  d="M5 0 Q2 10 5 20 T5 40"
                  stroke={b.stringColor}
                  strokeWidth="1.2"
                  fill="none"
                />
              </svg>
            </div>
          );
        })}
      </div>

      {/* Popped Reasons Cards Stack */}
      <div className="w-full max-w-md mx-auto space-y-3 z-20 mb-4">
        {poppedBalloons.map((poppedId) => {
          const item = items[poppedId];
          if (!item) return null;

          return (
            <div
              key={poppedId}
              className="relative rounded-2xl bg-white/10 backdrop-blur-md p-4 sm:p-5 border border-amber-300/40 shadow-[0_8px_30px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom-4 zoom-in-95 duration-400"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-400/30">
                  <span>{item.emoji || "❤️"}</span>
                  <span>REASON NO. {poppedId + 1}</span>
                </span>
                <span className="text-amber-300 text-xs">✨</span>
              </div>
              <p className="text-xs sm:text-sm text-pink-100 font-medium leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Completion Action & Prompt */}
      <div className="pb-8 text-center z-20">
        {allPopped ? (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
            <p className="font-serif italic text-base sm:text-lg text-amber-300 font-medium">
              …and a thousand more reasons 💛
            </p>
            <button
              type="button"
              onClick={onComplete}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:scale-105 active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(244,63,94,0.5)] transition-all cursor-pointer"
            >
              <span>Keep going</span>
              <span>💖</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onComplete}
            className="text-[11px] text-pink-200/50 hover:text-pink-200 transition-colors underline underline-offset-2 cursor-pointer"
          >
            Skip to next step →
          </button>
        )}
      </div>
    </div>
  );
}
