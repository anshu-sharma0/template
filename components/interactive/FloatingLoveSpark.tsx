"use client";

import { useState } from "react";
import { playRomanticChime } from "@/lib/romanticAudio";

interface HeartParticle {
  id: number;
  x: number;
  size: number;
  emoji: string;
}

export function FloatingLoveSpark() {
  const [particles, setParticles] = useState<HeartParticle[]>([]);
  const [sparkCount, setSparkCount] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const emojis = ["💖", "✨", "💕", "🌸", "♥", "🌷", "💗"];

  const handleSpark = () => {
    playRomanticChime();
    setSparkCount((prev) => prev + 1);
    setShowToast(true);

    const now = Date.now();
    const newParticles: HeartParticle[] = Array.from({ length: 9 }).map((_, i) => ({
      id: now + i,
      x: Math.random() * 80 + 10, // 10% to 90% horizontal position
      size: Math.random() * 14 + 16, // 16px to 30px
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    // Cleanup after animation completes
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
    }, 2400);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <>
      {/* Floating Canvas for Animated Heart Particles */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute bottom-20 select-none animate-in fade-in zoom-in-75 duration-300"
            style={{
              left: `${p.x}%`,
              fontSize: `${p.size}px`,
              animation: `floatUp 2.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards`,
            }}
          >
            {p.emoji}
          </span>
        ))}
      </div>

      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0.6) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 1;
            transform: translateY(-40px) scale(1.1) rotate(6deg);
          }
          80% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-420px) scale(0.85) rotate(-14deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Floating Spark Pill Widget */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {showToast && (
          <div className="rounded-full bg-white/95 px-3.5 py-1 text-[11px] font-bold text-[#e11d48] border border-pink-200 shadow-md backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200">
            Love spark sent! 💕
          </div>
        )}

        <button
          type="button"
          onClick={handleSpark}
          className="group flex items-center gap-2 rounded-full border border-pink-200/90 bg-white/90 px-4 py-2.5 text-xs font-bold text-[#1f1a1c] shadow-lg shadow-pink-500/15 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-pink-300 hover:bg-white hover:shadow-xl hover:shadow-pink-500/25 active:scale-95"
          aria-label="Send a love spark"
        >
          <span className="grid size-6 place-items-center rounded-full bg-linear-to-tr from-[#ff3366] via-[#ff4d6d] to-[#ff758f] text-[11px] text-white shadow-xs group-hover:animate-bounce">
            ♥
          </span>
          <span className="bg-linear-to-r from-[#e11d48] to-[#ff3366] bg-clip-text text-transparent group-hover:from-[#ff3366] group-hover:to-[#ff758f]">
            Spark Love
          </span>
          <span className="rounded-full bg-pink-50 px-1.5 py-0.5 text-[10px] text-[#e11d48] font-bold border border-pink-100">
            +{sparkCount}
          </span>
        </button>
      </div>
    </>
  );
}
