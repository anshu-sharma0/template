"use client";

import { useEffect, useState } from "react";
import { playCandleBlow, playTickChime } from "@/lib/romanticAudio";

interface BirthdayCakeStageProps {
  recipientName: string;
  onComplete: () => void;
}

export function BirthdayCakeStage({ recipientName, onComplete }: BirthdayCakeStageProps) {
  const [layersBuilt, setLayersBuilt] = useState(0); // 0 to 4
  const [isCandleLit, setIsCandleLit] = useState(true);
  const [isBlown, setIsBlown] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [typedChars, setTypedChars] = useState(0);

  const greetingText = `Happy Birthday, ${recipientName}!`;

  useEffect(() => {
    // Step-by-step cake layer drop
    const t1 = setTimeout(() => {
      setLayersBuilt(1); // bottom layer
      playTickChime();
    }, 600);
    const t2 = setTimeout(() => {
      setLayersBuilt(2); // middle layer
      playTickChime();
    }, 1200);
    const t3 = setTimeout(() => {
      setLayersBuilt(3); // icing
      playTickChime();
    }, 1800);
    const t4 = setTimeout(() => {
      setLayersBuilt(4); // candle lands & lights
      playTickChime();
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleBlowCandle = () => {
    if (isBlown || layersBuilt < 4) return;
    setIsCandleLit(false);
    setIsBlown(true);
    setShowConfetti(true);
    playCandleBlow();

    // Typewriter effect for Happy Birthday text
    let count = 0;
    const typeInterval = setInterval(() => {
      count++;
      setTypedChars(count);
      if (count >= greetingText.length) {
        clearInterval(typeInterval);
      }
    }, 65);
  };

  return (
    <div className="relative min-h-full h-full w-full flex flex-col items-center justify-between p-4 sm:p-8 overflow-hidden bg-gradient-to-b from-[#130b24] via-[#1f1035] to-[#291345] text-white select-none">
      {/* Cosmic Twinkling Stars Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Star speckles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              top: `${(i * 17) % 95}%`,
              left: `${(i * 23) % 95}%`,
              opacity: (i % 5) * 0.2 + 0.3,
              animationDuration: `${2 + (i % 4)}s`,
            }}
          />
        ))}

        {/* Floating golden/purple ambient nebula */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 size-96 rounded-full bg-purple-600/15 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 size-80 rounded-full bg-pink-500/10 blur-3xl" />
      </div>

      {/* Confetti Explosion Shower */}
      {showConfetti && (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="absolute animate-in fade-in zoom-in-50 text-xl"
              style={{
                top: `${(i * 7) % 85 + 5}%`,
                left: `${(i * 11) % 90 + 5}%`,
                animation: "spin 2.5s linear infinite",
              }}
            >
              {["🎉", "✨", "⭐", "💖", "🌸", "🎊", "💫"][i % 7]}
            </span>
          ))}
        </div>
      )}

      {/* Top Title */}
      <div className="pt-16 sm:pt-20 text-center z-10 animate-in fade-in duration-500">
        <h2 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
          <span>First things first</span>
          <span>🎂</span>
        </h2>
      </div>

      {/* Center Animated Cake Assembly Area */}
      <div className="my-auto flex flex-col items-center justify-center relative z-20">
        {/* Cake Container */}
        <div
          onClick={handleBlowCandle}
          className="relative w-64 sm:w-72 h-48 flex flex-col items-center justify-end cursor-pointer group"
        >
          {/* Candle & Flame (Layer 4) */}
          <div
            className={`transition-all duration-700 flex flex-col items-center mb-1 ${
              layersBuilt >= 4
                ? "translate-y-0 opacity-100 scale-100"
                : "-translate-y-16 opacity-0 scale-75"
            }`}
          >
            {/* Candle Flame / Smoke */}
            {isCandleLit ? (
              <div className="relative flex flex-col items-center animate-pulse">
                {/* Outer warm glow */}
                <span className="absolute -top-3 size-8 rounded-full bg-amber-400/30 blur-xs" />
                {/* Teardrop flame */}
                <div className="w-3.5 h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_12px_#fbbf24] animate-bounce" style={{ animationDuration: "1.2s" }} />
              </div>
            ) : (
              /* Wisps of smoke */
              <div className="flex flex-col items-center animate-in fade-in duration-500">
                <span className="text-xl -mt-2 animate-pulse">💨</span>
                <span className="text-xs text-amber-200/80 -mt-1">✨</span>
              </div>
            )}

            {/* Candle Body (Striped Pink/White) */}
            <div className="w-3.5 h-10 rounded-t-sm bg-gradient-to-b from-pink-200 via-rose-300 to-pink-200 border-x border-pink-300/60 shadow-xs relative overflow-hidden">
              {/* Spiral stripes */}
              <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,#fff,#fff_3px,#f43f5e_3px,#f43f5e_6px)]" />
            </div>
          </div>

          {/* Dripping Vanilla/Strawberry Frosting (Layer 3) */}
          <div
            className={`w-44 sm:w-52 h-9 rounded-t-3xl bg-white shadow-md relative z-10 transition-all duration-500 ${
              layersBuilt >= 3
                ? "translate-y-0 opacity-100 scale-100"
                : "-translate-y-12 opacity-0 scale-90"
            }`}
          >
            {/* Organic Icing Drips */}
            <div className="absolute -bottom-3 left-4 w-4 h-4 rounded-full bg-white" />
            <div className="absolute -bottom-4 left-12 w-5 h-5 rounded-full bg-white" />
            <div className="absolute -bottom-2.5 left-24 w-3.5 h-3.5 rounded-full bg-white" />
            <div className="absolute -bottom-4 right-10 w-4 h-4 rounded-full bg-white" />
            <div className="absolute -bottom-2 right-4 w-3 h-3 rounded-full bg-white" />
          </div>

          {/* Middle Cake Sponge (Layer 2) */}
          <div
            className={`w-48 sm:w-56 h-10 -mt-2 bg-gradient-to-b from-[#ff8da1] to-[#e6677f] rounded-lg shadow-sm border-t border-white/40 transition-all duration-500 ${
              layersBuilt >= 2
                ? "translate-y-0 opacity-100 scale-100"
                : "-translate-y-16 opacity-0 scale-90"
            }`}
          />

          {/* Base Cake Sponge (Layer 1) */}
          <div
            className={`w-52 sm:w-60 h-11 -mt-1 bg-gradient-to-b from-[#f4728d] to-[#d64a66] rounded-b-2xl shadow-xl border-t border-pink-200/40 transition-all duration-500 ${
              layersBuilt >= 1
                ? "translate-y-0 opacity-100 scale-100"
                : "-translate-y-20 opacity-0 scale-90"
            }`}
          />

          {/* Cake Stand / Plate */}
          <div className="w-60 sm:w-68 h-2.5 bg-gradient-to-r from-amber-200/50 via-white/80 to-amber-200/50 rounded-full shadow-lg mt-1" />
        </div>

        {/* Dynamic Status / Action Prompt */}
        <div className="mt-8 text-center min-h-16">
          {layersBuilt < 4 ? (
            <p className="font-serif italic text-sm text-pink-200/80 animate-pulse">
              Baking something sweet…
            </p>
          ) : !isBlown ? (
            <button
              type="button"
              onClick={handleBlowCandle}
              className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all active:scale-95 cursor-pointer animate-pulse"
            >
              <span>Make a wish</span>
              <span className="text-base group-hover:scale-125 transition-transform">🕯️</span>
            </button>
          ) : (
            <div className="space-y-2 animate-in fade-in duration-500">
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-amber-300 tracking-tight">
                {greetingText.slice(0, typedChars)}
                {typedChars < greetingText.length && (
                  <span className="animate-pulse">|</span>
                )}
              </h3>
              <p className="text-xs text-pink-200/70 font-medium">
                Wish sent to the stars! ✨
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Continue Prompt */}
      <div className="pb-8 text-center z-20">
        <button
          type="button"
          onClick={onComplete}
          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 text-xs font-semibold uppercase tracking-wider border border-white/15 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
        >
          <span>tap anywhere to continue</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
