"use client";

import { useState } from "react";
import type { BirthdayWishData } from "@/lib/birthday-types";
import { Heart } from "@/components/decorative/Heart";
import { Sparkle } from "@/components/decorative/Sparkle";
import { Petal } from "@/components/decorative/Petal";
import { MusicButton } from "@/components/invitation/MusicButton";

type BirthdayWishRendererProps = {
  data: BirthdayWishData;
  compact?: boolean;
  autoOpen?: boolean;
};

export function BirthdayWishRenderer({
  data,
  compact = false,
  autoOpen = false,
}: BirthdayWishRendererProps) {
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const recipient = data.recipientName || "Khushi";
  const sender = data.senderName || "Akshat";
  const messageText =
    data.message ||
    "Happy birthday to the person who makes my world feel brighter every single day.";

  if (!isOpen) {
    return (
      <div className="relative flex min-h-full flex-col items-center justify-between overflow-hidden bg-[linear-gradient(180deg,#fffaf5_0%,#fceae6_50%,#fff7ef_100%)] p-6 text-center text-text select-none">
        {/* Soft Ambient Background Elements */}
        <Petal className="absolute left-4 top-8 rotate-12 opacity-70 pointer-events-none animate-bounce duration-1000" />
        <Petal className="absolute right-6 top-12 -rotate-45 opacity-60 pointer-events-none" />
        <Sparkle className="absolute right-10 bottom-16 text-primary text-xl opacity-80 pointer-events-none" />

        <div className="my-auto grid gap-6 max-w-xs animate-in fade-in duration-500">
          {/* Wax Seal / Heart Emblem */}
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-gradient-to-tr from-[#b05765] to-[#c6a15b] text-white shadow-xl shadow-[#b05765]/20 ring-4 ring-white/60">
            <Heart className="text-3xl animate-pulse" />
          </div>

          <div className="space-y-2">
            <p className="font-serif italic text-xl text-[#b05765]">
              Someone made something
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-[#2c2224]">
              special for you <Heart className="inline text-[#b05765] text-xl" />
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#b05765] px-7 py-4 text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#964552] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b05765]"
          >
            <span>Open Your Surprise 💌</span>
            <Sparkle className="text-[#c6a15b] text-sm" />
          </button>
        </div>

        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8e7b7e]">
          Digital Moments • Made With Love ❤️
        </p>
      </div>
    );
  }

  return (
    <div className="relative grid min-h-full overflow-y-auto bg-[linear-gradient(180deg,#fffaf5_0%,#fff2ef_45%,#fffaf5_100%)] p-5 text-center text-text transition-all duration-700 animate-in fade-in zoom-in-95">
      {/* Background Glow & Petals */}
      <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(176,87,101,0.12),transparent)] pointer-events-none" />
      <Sparkle className="absolute left-4 top-6 text-[#c6a15b] text-lg opacity-70 pointer-events-none" />
      <Sparkle className="absolute right-4 top-10 text-[#b05765] text-xl opacity-75 pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between gap-6 py-2">
        {/* Header Greeting */}
        <div className="space-y-2 pt-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#b05765]">
            {data.relationship ? `For My Special ${data.relationship}` : "Made For You"}
          </p>
          <h1 className="font-display text-4xl leading-none text-[#2c2224] font-bold">
            Happy Birthday
          </h1>
          <p className="font-display text-5xl font-medium leading-none text-[#b05765] italic font-serif">
            {recipient} {data.age ? `(${data.age})` : "❤️"}
          </p>
        </div>

        {/* Main Photo Frame */}
        <div className={compact ? "mx-auto w-36" : "mx-auto w-44"}>
          <div className="group relative overflow-hidden rounded-2xl border-4 border-white bg-white p-2 shadow-xl hover:rotate-1 transition-transform duration-300">
            {data.mainPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.mainPhoto}
                alt={`Birthday wish photo for ${recipient}`}
                className="aspect-[4/5] w-full rounded-xl object-cover shadow-sm"
              />
            ) : (
              <div className="flex aspect-[4/5] w-full flex-col items-center justify-center rounded-xl bg-[linear-gradient(135deg,#fce4ec,#f8bbd0)] p-4 text-center">
                <Heart className="text-[#b05765] text-2xl mb-1" />
                <p className="font-display text-xl text-[#2c2224] leading-tight font-serif">
                  {recipient}
                </p>
                <p className="text-[10px] uppercase text-[#8e7b7e] tracking-wider mt-1 font-sans font-semibold">
                  A Beautiful Keepsake
                </p>
              </div>
            )}
            <div className="mt-2 text-center">
              <span className="font-serif italic text-xs text-[#8e7b7e]">
                {new Date().getFullYear()} • Birthday Surprise
              </span>
            </div>
          </div>
        </div>

        {/* Personal Message Card */}
        <div className="mx-auto w-full max-w-[17rem] rounded-2xl border border-[#ebdcd8] bg-white/90 backdrop-blur-md p-4 shadow-md text-left">
          <p className="font-serif italic text-sm text-[#2c2224] leading-relaxed whitespace-pre-line">
            &ldquo;{messageText}&rdquo;
          </p>
          <div className="mt-4 pt-3 border-t border-[#f3e6e3] text-right">
            <p className="font-display text-xs text-[#b05765] font-semibold">
              With all my love,
            </p>
            <p className="font-display text-base text-[#2c2224] font-serif font-bold">
              {sender}
            </p>
          </div>
        </div>

        {/* Additional Memory Photos Gallery */}
        {data.photos && data.photos.length > 0 && (
          <div className="mx-auto w-full max-w-[17rem] space-y-2">
            <p className="text-[10px] uppercase tracking-widest font-bold text-[#8e7b7e]">
              Sweet Memories 📸
            </p>
            <div className="grid grid-cols-2 gap-2">
              {data.photos.map((photoUrl, idx) => (
                <div
                  key={idx}
                  className="aspect-square overflow-hidden rounded-xl border-2 border-white bg-white shadow-sm hover:scale-105 transition-transform duration-300"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photoUrl}
                    alt={`Memory ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Music Player & Closing */}
        <div className="space-y-3 pt-2">
          {data.music && data.music !== "none" && (
            <div className="flex justify-center">
              <MusicButton
                isPlaying={isPlayingMusic}
                onToggle={() => setIsPlayingMusic(!isPlayingMusic)}
              />
            </div>
          )}

          <div className="space-y-1">
            <p className="font-serif italic text-xs text-[#8e7b7e]">
              Here&apos;s to another beautiful year of you.
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#b05765]">
              Made with love ❤️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
