"use client";

import { useState, useEffect } from "react";
import { playPaperOpen, playRomanticChime } from "@/lib/romanticAudio";

interface BirthdayLetterStageProps {
  recipientName: string;
  senderName: string;
  message: string;
  onComplete: () => void;
}

export function BirthdayLetterStage({
  recipientName,
  senderName,
  message,
  onComplete,
}: BirthdayLetterStageProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [typedChars, setTypedChars] = useState(0);

  const initial = recipientName ? recipientName.charAt(0).toUpperCase() : "C";

  const letterContent =
    message ||
    "Every year I try to find the perfect words and every year I fall short, so here is the honest version. You make my most ordinary days feel worth remembering. Happy birthday, my favourite person. I keep thinking about how lucky I got with you. You have seen me at my worst and stayed anyway, and I do not say thank you nearly enough for that. This year, I hope life is gentle with you...";

  const handleOpenEnvelope = () => {
    if (isOpened) return;
    setIsOpened(true);
    playPaperOpen();
    playRomanticChime();
  };

  useEffect(() => {
    if (!isOpened) return;

    let index = 0;
    const interval = setInterval(() => {
      index += 3;
      setTypedChars(index);
      if (index >= letterContent.length) {
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [isOpened, letterContent]);

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
        <div className="absolute top-1/3 left-1/4 size-80 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* Top Heading */}
      <div className="pt-14 sm:pt-16 text-center z-10 animate-in fade-in duration-500">
        <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
          One last thing, {recipientName}…
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-pink-200/80 font-medium">
          {senderName || "Mohammed Anthony"} wrote you a letter.
        </p>
      </div>

      {/* Center Envelope / Unfolded Letter */}
      <div className="my-auto py-6 flex flex-col items-center justify-center z-20 w-full max-w-lg mx-auto">
        {!isOpened ? (
          /* Sealed Golden Envelope */
          <div
            onClick={handleOpenEnvelope}
            className="group relative cursor-pointer flex flex-col items-center animate-in zoom-in-95 duration-500"
          >
            {/* 3D Golden Envelope Body */}
            <div className="relative w-72 sm:w-88 h-48 sm:h-56 rounded-2xl bg-gradient-to-b from-[#d99b26] via-[#c2841b] to-[#9e670c] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-amber-300/40 p-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 active:scale-95">
              {/* Envelope Flap Lines */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <svg className="size-full" viewBox="0 0 100 70" preserveAspectRatio="none">
                  {/* Bottom pocket triangles */}
                  <polygon points="0,70 50,38 100,70" fill="#ad7210" opacity="0.6" />
                  <polygon points="0,0 50,38 0,70" fill="#b87b15" opacity="0.4" />
                  <polygon points="100,0 50,38 100,70" fill="#b87b15" opacity="0.4" />
                  {/* Top triangular flap */}
                  <polygon points="0,0 50,38 100,0" fill="#e0a531" opacity="0.9" />
                </svg>
              </div>

              {/* Embossed Wax Seal in Center */}
              <div className="relative z-10 size-16 sm:size-18 rounded-full bg-gradient-to-tr from-[#a3680a] via-[#e5aa36] to-[#ffdb7d] shadow-[0_6px_20px_rgba(0,0,0,0.4)] border-2 border-amber-200 flex items-center justify-center text-amber-950 font-serif font-black text-2xl group-hover:scale-110 transition-transform">
                <span>{initial}</span>
              </div>
            </div>

            {/* Prompt */}
            <div className="mt-6 flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-300 animate-pulse">
              <span>👇</span>
              <span>Tap to open your letter</span>
            </div>
          </div>
        ) : (
          /* Opened Stationery Lined Letter */
          <div className="w-full relative rounded-3xl bg-[#fdfaf3] text-[#2c1d22] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.4)] border-2 border-amber-200/60 animate-in fade-in zoom-in-95 duration-500">
            {/* Lined Notebook Stationery Pattern */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none opacity-20"
              style={{
                backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #e5b382 28px)",
              }}
            />

            {/* Letter Header */}
            <div className="mb-4 relative z-10">
              <h3 className="font-serif italic text-lg sm:text-xl font-bold text-[#8a243d]">
                Dear {recipientName},
              </h3>
            </div>

            {/* Letter Body Typewritten */}
            <div className="min-h-44 sm:min-h-52 relative z-10">
              <p className="font-serif text-sm sm:text-base leading-relaxed text-[#3b272e] whitespace-pre-line font-medium">
                {letterContent.slice(0, typedChars)}
                {typedChars < letterContent.length && (
                  <span className="inline-block w-1.5 h-4 bg-amber-600 animate-pulse ml-0.5 align-middle" />
                )}
              </p>
            </div>

            {/* Signoff */}
            <div className="mt-6 pt-4 border-t border-amber-200/80 flex items-end justify-between relative z-10">
              <div>
                <p className="font-serif italic text-xs text-[#826a72]">With all my love,</p>
                <p className="font-serif text-base sm:text-lg font-bold text-[#8a243d]">
                  — {senderName || "Mohammed Anthony"}
                </p>
              </div>

              {/* Bottom wax seal badge */}
              <div className="size-11 rounded-full bg-gradient-to-tr from-[#d99b26] to-[#ffdb7d] text-amber-950 flex items-center justify-center font-serif font-black text-sm shadow-md border-2 border-white">
                {initial}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Continue Action */}
      <div className="pb-8 text-center z-20">
        {isOpened && (
          <button
            type="button"
            onClick={onComplete}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:scale-105 active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(244,63,94,0.5)] transition-all cursor-pointer animate-in fade-in"
          >
            <span>Continue</span>
            <span>💖</span>
          </button>
        )}
      </div>
    </div>
  );
}
