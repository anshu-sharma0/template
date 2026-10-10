"use client";

import { useState } from "react";

interface BirthdayVideoStageProps {
  recipientName: string;
  videoUrl?: string;
  mainPhoto?: string;
  onComplete: () => void;
}

export function BirthdayVideoStage({
  recipientName,
  videoUrl = "/template.webm",
  mainPhoto,
  onComplete,
}: BirthdayVideoStageProps) {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="relative min-h-full h-full w-full flex flex-col justify-between items-center p-4 sm:p-8 overflow-hidden bg-gradient-to-b from-[#130b24] via-[#1f1035] to-[#291345] text-white select-none">
      {/* Cosmic Twinkling Stars Background */}
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
      </div>

      {/* Continuous Festive Confetti Shower */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
        {Array.from({ length: 32 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-sm sm:text-base animate-bounce"
            style={{
              top: `${(i * 9) % 90 + 5}%`,
              left: `${(i * 13) % 92 + 4}%`,
              animationDuration: `${2.2 + (i % 3) * 0.6}s`,
              opacity: 0.85,
            }}
          >
            {["🎉", "✨", "🎊", "⭐", "🌸", "🎈", "💖"][i % 7]}
          </span>
        ))}
      </div>

      {/* Empty Top Space for Navigation Bar */}
      <div className="pt-14 sm:pt-16" />

      {/* Center Video Card with Bunting Flags & Balloons */}
      <div className="my-auto z-20 flex flex-col items-center justify-center w-full max-w-sm sm:max-w-md">
        {/* Top Balloon Bunch Center */}
        <div className="flex justify-center items-center gap-1 -mb-3 z-30">
          <span className="text-xl -rotate-12 animate-gentle-float">🎈</span>
          <span className="text-2xl animate-gentle-float" style={{ animationDelay: "0.4s" }}>🎈</span>
          <span className="text-xl rotate-12 animate-gentle-float" style={{ animationDelay: "0.8s" }}>🎈</span>
        </div>

        {/* Video Card Frame */}
        <div className="relative w-full max-w-xs sm:max-w-sm aspect-[9/16] rounded-3xl overflow-hidden border-4 border-amber-300/40 shadow-[0_20px_60px_rgba(0,0,0,0.6)] bg-black/80">
          {/* Party Triangular Bunting Flags Garland across top */}
          <div className="absolute top-0 left-0 right-0 z-20 flex justify-between px-2 pt-1">
            {["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#f97316"].map(
              (color, idx) => (
                <div
                  key={idx}
                  className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px]"
                  style={{ borderTopColor: color }}
                />
              )
            )}
          </div>

          {/* Corner Floating Balloons */}
          <div className="absolute -bottom-3 -left-3 z-30 text-3xl animate-bounce" style={{ animationDuration: "3s" }}>
            🎈
          </div>
          <div className="absolute -bottom-3 -right-3 z-30 text-3xl animate-bounce" style={{ animationDuration: "3.5s" }}>
            🎈
          </div>

          {/* The Video or Celebratory Clip */}
          <div className="relative size-full flex items-center justify-center bg-black">
            <video
              src={`${videoUrl}#t=50,64`}
              poster="/birthday-cats-band.jpg"
              autoPlay
              loop
              muted
              playsInline
              className="size-full object-cover"
              onEnded={() => onComplete()}
            />

            {/* Fallback overlay in case video doesn't play automatically */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs text-white/90 bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-full">
              <span className="font-semibold truncate">Birthday Band for {recipientName} 🎶</span>
              <span className="text-amber-300 font-bold">♪ ♫</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Skip Action Button */}
      <div className="pb-8 text-center z-30">
        <button
          type="button"
          onClick={onComplete}
          className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-xs font-semibold uppercase tracking-wider border border-white/20 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
        >
          <span>Skip</span>
          <span>&gt;&gt;</span>
        </button>
      </div>
    </div>
  );
}
