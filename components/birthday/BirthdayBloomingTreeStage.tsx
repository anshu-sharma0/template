"use client";

import { useEffect, useState } from "react";
import { playRomanticChime } from "@/lib/romanticAudio";

interface BirthdayBloomingTreeStageProps {
  recipientName: string;
  age: string;
  onComplete: () => void;
}

export function BirthdayBloomingTreeStage({
  recipientName,
  age,
  onComplete,
}: BirthdayBloomingTreeStageProps) {
  const [treeGrown, setTreeGrown] = useState(false);
  const [bloomedCount, setBloomedCount] = useState(0);

  // Generate 85 decorative heart coordinates forming a full heart canopy
  const heartLeaves = [
    // Center & Core Heart cluster
    { x: 50, y: 35, s: 1.3, c: "#f43f5e", r: 12 },
    { x: 42, y: 30, s: 1.1, c: "#fb7185", r: -15 },
    { x: 58, y: 30, s: 1.2, c: "#f43f5e", r: 18 },
    { x: 35, y: 25, s: 1.0, c: "#fda4af", r: -24 },
    { x: 65, y: 25, s: 1.1, c: "#f43f5e", r: 20 },
    { x: 28, y: 22, s: 0.95, c: "#f59e0b", r: -10 },
    { x: 72, y: 22, s: 0.95, c: "#fb923c", r: 14 },
    { x: 22, y: 24, s: 0.9, c: "#f43f5e", r: -30 },
    { x: 78, y: 24, s: 0.9, c: "#ec4899", r: 28 },
    { x: 18, y: 30, s: 0.85, c: "#f43f5e", r: -40 },
    { x: 82, y: 30, s: 0.85, c: "#fb7185", r: 35 },
    { x: 20, y: 38, s: 0.9, c: "#fbbf24", r: -20 },
    { x: 80, y: 38, s: 0.9, c: "#f43f5e", r: 25 },
    { x: 26, y: 46, s: 0.95, c: "#f43f5e", r: 10 },
    { x: 74, y: 46, s: 0.95, c: "#ec4899", r: -15 },
    { x: 34, y: 54, s: 1.0, c: "#fb7185", r: 15 },
    { x: 66, y: 54, s: 1.0, c: "#f43f5e", r: -10 },
    { x: 42, y: 62, s: 1.05, c: "#f43f5e", r: 8 },
    { x: 58, y: 62, s: 1.05, c: "#fbbf24", r: -8 },
    { x: 50, y: 68, s: 1.1, c: "#f43f5e", r: 0 },

    // Dense inner heart leaves filling the canopy
    { x: 46, y: 22, s: 0.85, c: "#fef08a", r: -5 },
    { x: 54, y: 22, s: 0.85, c: "#fda4af", r: 5 },
    { x: 48, y: 28, s: 1.0, c: "#fb7185", r: 10 },
    { x: 52, y: 28, s: 1.0, c: "#f43f5e", r: -12 },
    { x: 38, y: 38, s: 1.0, c: "#f59e0b", r: -18 },
    { x: 62, y: 38, s: 1.0, c: "#f43f5e", r: 15 },
    { x: 45, y: 44, s: 1.1, c: "#fda4af", r: 4 },
    { x: 55, y: 44, s: 1.1, c: "#f43f5e", r: -6 },
    { x: 48, y: 52, s: 1.0, c: "#fb7185", r: 12 },
    { x: 52, y: 52, s: 1.0, c: "#ec4899", r: -10 },

    // Left heart lobe perimeter
    { x: 30, y: 16, s: 0.8, c: "#f43f5e", r: -15 },
    { x: 38, y: 14, s: 0.85, c: "#fbbf24", r: -5 },
    { x: 44, y: 16, s: 0.75, c: "#fb7185", r: 12 },
    { x: 25, y: 18, s: 0.8, c: "#fda4af", r: -25 },
    { x: 16, y: 26, s: 0.75, c: "#f43f5e", r: -35 },
    { x: 15, y: 34, s: 0.8, c: "#f59e0b", r: -20 },
    { x: 22, y: 42, s: 0.85, c: "#f43f5e", r: -10 },
    { x: 28, y: 50, s: 0.85, c: "#fda4af", r: 15 },
    { x: 36, y: 58, s: 0.9, c: "#f43f5e", r: 20 },
    { x: 44, y: 65, s: 0.9, c: "#fb7185", r: 10 },

    // Right heart lobe perimeter
    { x: 70, y: 16, s: 0.8, c: "#f43f5e", r: 15 },
    { x: 62, y: 14, s: 0.85, c: "#fda4af", r: 5 },
    { x: 56, y: 16, s: 0.75, c: "#fbbf24", r: -12 },
    { x: 75, y: 18, s: 0.8, c: "#fb7185", r: 25 },
    { x: 84, y: 26, s: 0.75, c: "#f43f5e", r: 35 },
    { x: 85, y: 34, s: 0.8, c: "#ec4899", r: 20 },
    { x: 78, y: 42, s: 0.85, c: "#fda4af", r: 10 },
    { x: 72, y: 50, s: 0.85, c: "#f43f5e", r: -15 },
    { x: 64, y: 58, s: 0.9, c: "#fbbf24", r: -20 },
    { x: 56, y: 65, s: 0.9, c: "#f43f5e", r: -10 },

    // Accent mini sparkles / drifting petals
    { x: 12, y: 20, s: 0.6, c: "#fda4af", r: -45 },
    { x: 88, y: 20, s: 0.6, c: "#fbbf24", r: 45 },
    { x: 26, y: 10, s: 0.65, c: "#f43f5e", r: -10 },
    { x: 74, y: 10, s: 0.65, c: "#f43f5e", r: 10 },
    { x: 50, y: 14, s: 0.7, c: "#fda4af", r: 0 },
    { x: 48, y: 73, s: 0.75, c: "#f43f5e", r: 0 },
  ];

  useEffect(() => {
    // Stage 1: Trunk and branches grow
    const trunkTimer = setTimeout(() => {
      setTreeGrown(true);
      playRomanticChime();
    }, 400);

    // Stage 2: Leaves bloom sequentially
    const bloomTimer = setInterval(() => {
      setBloomedCount((prev) => {
        if (prev < heartLeaves.length) {
          return prev + 4;
        }
        clearInterval(bloomTimer);
        return prev;
      });
    }, 90);

    return () => {
      clearTimeout(trunkTimer);
      clearInterval(bloomTimer);
    };
  }, []);

  return (
    <div
      onClick={onComplete}
      className="relative min-h-full h-full w-full flex flex-col justify-between p-4 sm:p-8 overflow-hidden bg-gradient-to-b from-[#fff5f0] via-[#fae3da] to-[#f8ded6] text-[#2a1720] select-none cursor-pointer"
    >
      {/* Radiant Sun Glow & Drifting Petals */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 size-[420px] rounded-full bg-gradient-to-tr from-amber-200/30 via-rose-200/40 to-transparent blur-3xl animate-pulse" />
        {/* Floating background heart specks */}
        <span className="absolute top-[15%] left-[8%] text-rose-300 text-sm animate-bounce" style={{ animationDuration: "4s" }}>💖</span>
        <span className="absolute top-[45%] left-[12%] text-pink-300 text-xs animate-pulse">💕</span>
        <span className="absolute top-[25%] right-[10%] text-amber-300 text-xs animate-pulse">✨</span>
        <span className="absolute bottom-[35%] right-[15%] text-rose-300 text-sm animate-bounce" style={{ animationDuration: "5s" }}>🌸</span>
      </div>

      {/* Main Grid: Left Typography & Right Tree Canopy */}
      <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 pt-12 pb-6 z-10">
        {/* Left Side: Personal Birthday Announcement */}
        <div className="flex-1 text-center md:text-left space-y-3.5 animate-in fade-in slide-in-from-left-6 duration-700">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/70 border border-rose-200/80 text-[11px] font-bold uppercase tracking-wider text-[#9d3c50] shadow-2xs backdrop-blur-xs">
            <span>✨</span>
            <span>it&apos;s officially your day</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#7e1d35] leading-tight">
            Happy Birthday,
            <br />
            <span className="text-[#a0183b]">{recipientName}</span>
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-[#874b59] font-medium">
            and just like that, you&apos;re turning {age || "8"} ✨
          </p>
        </div>

        {/* Right Side: The Blooming Heart Tree */}
        <div className="flex-1 flex justify-center items-center relative">
          <div className="relative w-72 sm:w-88 md:w-96 aspect-square">
            {/* SVG Tree Trunk & Sculpted Branches */}
            <svg
              className="absolute inset-0 size-full"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Tree Trunk */}
              <path
                d="M50 95 C49 80 47 68 50 55 C52 46 48 38 42 28"
                stroke="#3e2316"
                strokeWidth={treeGrown ? "3.2" : "0"}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
              {/* Left Branch Main */}
              <path
                d="M50 65 C43 56 32 50 25 36"
                stroke="#4a2c1b"
                strokeWidth={treeGrown ? "2.2" : "0"}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out delay-150"
              />
              {/* Left Branch Outer Top */}
              <path
                d="M42 45 C35 38 28 28 32 20"
                stroke="#543320"
                strokeWidth={treeGrown ? "1.6" : "0"}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out delay-300"
              />
              {/* Right Branch Main */}
              <path
                d="M50 65 C57 56 68 50 75 36"
                stroke="#4a2c1b"
                strokeWidth={treeGrown ? "2.2" : "0"}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out delay-150"
              />
              {/* Right Branch Outer Top */}
              <path
                d="M58 45 C65 38 72 28 68 20"
                stroke="#543320"
                strokeWidth={treeGrown ? "1.6" : "0"}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out delay-300"
              />
              {/* Branch Heart Arc Silhouettes */}
              <path
                d="M32 20 C38 14 46 18 50 25 C54 18 62 14 68 20"
                stroke="#5c3822"
                strokeWidth={treeGrown ? "1.2" : "0"}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out delay-400"
              />
            </svg>

            {/* Blooming 3D Heart Leaves Canopy */}
            {heartLeaves.map((leaf, idx) => {
              const isVisible = idx <= bloomedCount;
              return (
                <div
                  key={idx}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out ${
                    isVisible
                      ? "scale-100 opacity-100 rotate-0"
                      : "scale-0 opacity-0 rotate-45"
                  }`}
                  style={{
                    left: `${leaf.x}%`,
                    top: `${leaf.y}%`,
                    transform: isVisible
                      ? `translate(-50%, -50%) scale(${leaf.s}) rotate(${leaf.r}deg)`
                      : "translate(-50%, -50%) scale(0)",
                  }}
                >
                  {/* Glossy 3D Heart Glyph */}
                  <svg
                    className="size-5 sm:size-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
                    viewBox="0 0 24 24"
                    fill={leaf.c}
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Prompt */}
      <div className="pb-8 text-center z-20">
        <button
          type="button"
          onClick={onComplete}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/70 hover:bg-white text-[#874b59] text-xs font-bold uppercase tracking-wider border border-rose-200/80 shadow-xs backdrop-blur-md transition-all active:scale-95 animate-pulse"
        >
          <span>tap anywhere to continue</span>
          <span>✨</span>
        </button>
      </div>
    </div>
  );
}
