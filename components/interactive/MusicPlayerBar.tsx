"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface MusicPlayerBarProps {
  audioUrl?: string;
  trackTitle?: string;
  autoPlay?: boolean;
  position?: "fixed" | "inline";
  className?: string;
}

export function MusicPlayerBar({
  audioUrl,
  trackTitle = "Ambient Celebration Melody",
  autoPlay = false,
  position = "fixed",
  className,
}: MusicPlayerBarProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      className={cn(
        "z-40 flex items-center justify-between gap-4 rounded-full bg-white/95 px-5 py-2.5 shadow-xl border border-[#e8d5cf] backdrop-blur-md transition-all duration-300",
        position === "fixed" && "fixed bottom-5 right-5 max-w-xs",
        className
      )}
    >
      {audioUrl && <audio ref={audioRef} src={audioUrl} loop />}

      <div className="flex items-center gap-3 overflow-hidden">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="grid size-9 shrink-0 place-items-center rounded-full bg-[#b05765] text-white shadow-sm transition hover:bg-[#964552] active:scale-95"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        {/* Track Title & Equalizer Animation */}
        <div className="truncate">
          <div className="truncate text-xs font-bold text-[#2c2224]">{trackTitle}</div>
          <div className="flex items-center gap-1 text-[10px] text-[#8e7b7e]">
            <span>{isPlaying ? "Playing background music" : "Music paused"}</span>
            {isPlaying && (
              <span className="flex items-end gap-0.5 h-3 ml-1">
                <span className="w-0.5 h-full bg-[#b05765] animate-bounce" />
                <span className="w-0.5 h-2/3 bg-[#b05765] animate-bounce delay-100" />
                <span className="w-0.5 h-1/2 bg-[#b05765] animate-bounce delay-200" />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="text-xs text-[#8e7b7e] hover:text-[#2c2224] p-1"
        aria-label="Toggle mute"
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
    </div>
  );
}
