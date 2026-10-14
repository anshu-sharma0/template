"use client";

import { useState, useRef } from "react";
import { playWhoosh, playPopSound, playRomanticChime } from "@/lib/romanticAudio";

interface BirthdayCupidStageProps {
  onComplete: () => void;
}

export function BirthdayCupidStage({ onComplete }: BirthdayCupidStageProps) {
  const [pullProgress, setPullProgress] = useState(0); // 0 to 1
  const [isShooting, setIsShooting] = useState(false);
  const [isPopped, setIsPopped] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const startYRef = useRef<number>(0);

  const handleShoot = () => {
    if (isShooting || isPopped) return;
    setIsShooting(true);
    playWhoosh();

    // Arrow hits heart after 600ms
    setTimeout(() => {
      setIsPopped(true);
      playPopSound();
      playRomanticChime();

      // Proceed to next stage after explosion
      setTimeout(() => {
        onComplete();
      }, 1200);
    }, 600);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isShooting || isPopped) return;
    setDragActive(true);
    startYRef.current = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragActive || isShooting || isPopped) return;
    const diff = e.clientY - startYRef.current;
    if (diff > 0) {
      const prog = Math.min(diff / 80, 1);
      setPullProgress(prog);
    }
  };

  const handlePointerUp = () => {
    if (!dragActive) return;
    setDragActive(false);
    if (pullProgress > 0.3) {
      handleShoot();
    } else {
      setPullProgress(0);
    }
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="relative min-h-full h-full w-full flex flex-col items-center justify-between p-4 sm:p-8 overflow-hidden bg-gradient-to-b from-[#fceee9] via-[#f7d9d0] to-[#fcebe6] select-none touch-none"
    >
      {/* Background Starlight / Sparkles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 size-96 rounded-full bg-rose-200/30 blur-3xl animate-pulse" />
        <span className="absolute top-[20%] left-[20%] text-amber-400 text-xs animate-ping">✧</span>
        <span className="absolute top-[35%] right-[25%] text-rose-400 text-sm animate-pulse">✦</span>
        <span className="absolute bottom-[40%] left-[15%] text-pink-400 text-xs animate-pulse">✧</span>
        <span className="absolute bottom-[30%] right-[18%] text-amber-300 text-sm animate-ping">✦</span>
      </div>

      {/* Top Heading */}
      <div className="pt-16 sm:pt-20 text-center animate-in fade-in duration-700">
        <h1 className="font-serif italic text-xl sm:text-2xl text-[#874b59] font-medium tracking-wide">
          a little something, for you
        </h1>
      </div>

      {/* Center 3D Floating Heart / Popped Particles */}
      <div className="relative my-auto flex items-center justify-center">
        {!isPopped ? (
          <div
            className={`relative transition-all duration-300 ${
              isShooting ? "scale-105" : "animate-gentle-float"
            }`}
          >
            {/* Soft Radiant Halo */}
            <div className="absolute inset-0 scale-150 rounded-full bg-gradient-to-tr from-[#ff4d79]/30 via-[#ff758f]/40 to-transparent blur-2xl" />

            {/* 3D Glossy Heart SVG */}
            <svg
              className="size-36 sm:size-44 drop-shadow-[0_15px_35px_rgba(230,45,95,0.35)] transition-transform duration-300"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="heartGradient" x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ff7597" />
                  <stop offset="50%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#be123c" />
                </linearGradient>
                <radialGradient id="heartGlow" cx="35%" cy="30%" r="40%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
                  <stop offset="60%" stopColor="#ff9ebb" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Heart Body */}
              <path
                d="M50 86 C25 68 10 50 10 32 C10 17 22 8 36 8 C44 8 48 13 50 17 C52 13 56 8 64 8 C78 8 90 17 90 32 C90 50 75 68 50 86 Z"
                fill="url(#heartGradient)"
              />
              {/* Glossy 3D Highlight */}
              <path
                d="M50 86 C25 68 10 50 10 32 C10 17 22 8 36 8 C44 8 48 13 50 17 C52 13 56 8 64 8 C78 8 90 17 90 32 C90 50 75 68 50 86 Z"
                fill="url(#heartGlow)"
              />
              {/* Crisp Glare Reflection */}
              <ellipse
                cx="35"
                cy="24"
                rx="10"
                ry="6"
                transform="rotate(-25 35 24)"
                fill="white"
                fillOpacity="0.65"
              />
            </svg>
          </div>
        ) : (
          /* Pop Explosion Shower */
          <div className="relative size-44 flex items-center justify-center animate-in zoom-in-75 duration-300">
            {/* Burst shockwave */}
            <div className="absolute size-48 rounded-full border-2 border-rose-400/80 scale-150 opacity-0 transition-all duration-700 animate-ping" />

            {/* Exploding mini hearts and sparkles */}
            {Array.from({ length: 24 }).map((_, idx) => {
              const angle = (idx / 24) * 2 * Math.PI;
              const distance = 80 + (idx % 4) * 25;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              const emoji = ["💖", "💕", "✨", "🌸", "⭐", "🎉"][idx % 6];

              return (
                <span
                  key={idx}
                  className="absolute text-xl sm:text-2xl transition-all duration-700 ease-out"
                  style={{
                    transform: `translate(${x}px, ${y}px) scale(${1.2 - (idx % 3) * 0.2})`,
                    opacity: 1,
                  }}
                >
                  {emoji}
                </span>
              );
            })}
          </div>
        )}

        {/* Flying Arrow in Flight */}
        {isShooting && !isPopped && (
          <div
            className="absolute z-30 transition-all ease-out"
            style={{
              animation: "flyArrow 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
            }}
          >
            <div className="flex items-center -rotate-45">
              <span className="h-0.5 w-16 sm:w-20 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-200 rounded-full" />
              <span className="text-xl -ml-2 text-rose-500 drop-shadow">💘</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bow & Arrow Interaction Area */}
      <div className="w-full max-w-sm flex flex-col items-center pb-8 z-20">
        {/* Interactive Bow in bottom left / center */}
        <div
          onPointerDown={handlePointerDown}
          onClick={handleShoot}
          className={`relative size-28 sm:size-32 cursor-pointer transition-transform duration-200 active:scale-95 group ${
            isShooting ? "opacity-30 pointer-events-none" : ""
          }`}
          style={{
            transform: `translate(${pullProgress * -8}px, ${pullProgress * 12}px)`,
          }}
          title="Drag back and release or tap to shoot"
        >
          {/* Wooden Cupid Bow with Bowstring */}
          <svg className="size-full -rotate-45" viewBox="0 0 100 100" fill="none">
            {/* Wooden Bow Arc */}
            <path
              d="M20 15 Q55 50 20 85"
              stroke="#5c3822"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Gold Accents */}
            <path
              d="M20 15 Q55 50 20 85"
              stroke="#d4af37"
              strokeWidth="1.5"
              strokeDasharray="4 8"
              strokeLinecap="round"
            />
            {/* Bowstring with dynamic draw tension */}
            <path
              d={`M20 15 Q${20 - pullProgress * 25} 50 20 85`}
              stroke="#fffaea"
              strokeWidth="1.5"
              strokeOpacity="0.9"
            />
            {/* Nocked Arrow */}
            {!isShooting && (
              <g transform={`translate(${pullProgress * -15}, 0)`}>
                <line
                  x1="12"
                  y1="50"
                  x2="65"
                  y2="50"
                  stroke="#c59b27"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Arrow Head (Heart) */}
                <path
                  d="M65 50 L56 44 L60 50 L56 56 Z"
                  fill="#e11d48"
                  stroke="#be123c"
                  strokeWidth="1"
                />
                {/* Arrow Fletching */}
                <path
                  d="M14 46 L8 50 L14 54"
                  stroke="#e11d48"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
            )}
          </svg>
        </div>

        {/* Prompt Button / Text */}
        <button
          type="button"
          onClick={handleShoot}
          disabled={isShooting || isPopped}
          className="mt-3 group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/70 hover:bg-white text-[#874b59] font-bold text-xs uppercase tracking-widest border border-rose-200/80 shadow-xs backdrop-blur-md transition-all active:scale-95 cursor-pointer"
        >
          <span>PULL &amp; RELEASE</span>
          <span className="text-sm text-rose-500 group-hover:scale-125 transition-transform">🏹</span>
        </button>
      </div>

      <style jsx>{`
        @keyframes flyArrow {
          0% {
            transform: translate(-140px, 140px) scale(0.8);
            opacity: 1;
          }
          100% {
            transform: translate(0px, 0px) scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
