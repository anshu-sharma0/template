"use client";

import { useEffect, useState } from "react";
import { playTickChime } from "@/lib/romanticAudio";

interface BirthdayCraftingStageProps {
  recipientName: string;
  senderName: string;
  age: string;
  cakeFlavor?: string;
  balloonsCount?: number;
  onComplete: () => void;
}

export function BirthdayCraftingStage({
  recipientName,
  senderName,
  age,
  cakeFlavor = "Strawberry Blush",
  balloonsCount = 5,
  onComplete,
}: BirthdayCraftingStageProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  const steps = [
    { text: `Baking the ${cakeFlavor} 🍰`, key: 0 },
    { text: `Lighting candles for turning ${age || "8"} 🕯️`, key: 1 },
    { text: `Filling ${balloonsCount} balloons with your words 🎈`, key: 2 },
    { text: "Sealing your letter inside the card ✉️", key: 3 },
    { text: `Signed with love — ${senderName || "Mohammed Anthony"} ✍️`, key: 4 },
  ];

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Trigger step checks progressively
    steps.forEach((_, idx) => {
      const timer = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, idx]);
        setProgress(((idx + 1) / steps.length) * 100);
        playTickChime();
      }, 700 + idx * 800);
      timers.push(timer);
    });

    // Auto-advance after all 5 steps complete
    const finishTimer = setTimeout(() => {
      onComplete();
    }, 700 + steps.length * 800 + 800);
    timers.push(finishTimer);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="relative min-h-full h-full w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-gradient-to-b from-[#fff6f1] via-[#fae7df] to-[#f8ded6] select-none">
      {/* Dreamy Ambient Light Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-96 rounded-full bg-gradient-to-b from-rose-200/40 to-pink-300/20 blur-3xl animate-pulse"
        style={{ animationDuration: "6s" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-1/4 size-80 rounded-full bg-amber-200/30 blur-3xl"
      />

      {/* Floating Sparkles Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
        <span className="absolute top-[18%] left-[15%] text-amber-300/80 text-xl animate-bounce">✦</span>
        <span className="absolute top-[28%] right-[18%] text-rose-300/80 text-sm animate-pulse">✧</span>
        <span className="absolute bottom-[22%] left-[22%] text-pink-300/80 text-base animate-pulse">✦</span>
        <span className="absolute bottom-[16%] right-[20%] text-amber-300/80 text-lg animate-bounce">✧</span>
      </div>

      {/* Centered Checklist Card */}
      <div className="relative w-full max-w-sm sm:max-w-md rounded-3xl bg-white/95 backdrop-blur-xl p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(230,120,140,0.25)] border border-white/80 transition-all duration-500 animate-in fade-in zoom-in-95">
        {/* Top Cake Emoji */}
        <div className="flex justify-center mb-4">
          <div className="size-16 rounded-2xl bg-gradient-to-tr from-[#ffe8ef] to-[#fff4ec] flex items-center justify-center text-3xl shadow-inner border border-rose-100 animate-bounce" style={{ animationDuration: "2.4s" }}>
            🎂
          </div>
        </div>

        {/* Title */}
        <h2 className="font-serif text-center text-xl sm:text-2xl font-bold text-[#2a1720] tracking-tight mb-6">
          Crafting {recipientName}&apos;s surprise...
        </h2>

        {/* Steps List */}
        <div className="space-y-3.5 my-5">
          {steps.map((step, idx) => {
            const isDone = completedSteps.includes(idx);
            return (
              <div
                key={step.key}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-400 ${
                  isDone
                    ? "bg-[#fff8f5] text-[#2a1720] scale-[1.01]"
                    : "text-[#8e7b7e] opacity-60"
                }`}
              >
                {/* Check circle */}
                <div
                  className={`size-5 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isDone
                      ? "bg-gradient-to-tr from-amber-500 to-amber-400 text-white shadow-xs scale-110"
                      : "border-2 border-[#e8cbd4] bg-white"
                  }`}
                >
                  {isDone ? "✓" : ""}
                </div>

                {/* Step text */}
                <span className={`text-xs sm:text-sm font-medium tracking-tight ${isDone ? "font-semibold text-[#3b242e]" : ""}`}>
                  {step.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom Progress Bar */}
        <div className="mt-6 pt-2">
          <div className="h-1.5 w-full rounded-full bg-rose-100/80 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-pink-500 transition-all duration-500 shadow-xs"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-[#8e7b7e]">
            <span>Preparing celebration</span>
            <span className="font-bold text-amber-600">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Skip button for preview */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onComplete}
            className="text-[11px] text-[#b3959b] hover:text-[#e11d48] transition-colors underline underline-offset-2 cursor-pointer"
          >
            Skip loading →
          </button>
        </div>
      </div>
    </div>
  );
}
