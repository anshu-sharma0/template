"use client";

import { useState, type ReactNode } from "react";
import { playRomanticChime, playCelebrationChime } from "@/lib/romanticAudio";
import { cn } from "@/lib/cn";

export interface FloatingBadgeItem {
  text: string;
  subtext?: string;
  icon?: string;
  position?: string;
  className?: string;
}

export interface PhonePresetData {
  recipientName?: string;
  title?: string;
  subtitle?: string;
  badgeText?: string;
  songTitle?: string;
  actionLabel?: string;
  onActionClick?: () => void;
  memoryCount?: number;
  quote?: string;
  dateBadge?: string;
  footnoteText?: string;
}

export interface PhoneMockupProps {
  /** Size preset of the device frame */
  size?: "sm" | "md" | "lg";
  /** Hardware finish theme - defaults to elegant Light Pearl-Silver */
  theme?: "pearl-silver" | "rose-gold" | "titanium";
  /** Pre-built screen design preset */
  preset?: "birthday" | "romantic-letter" | "wedding" | "custom";
  /** Custom data to populate preset screens */
  presetData?: PhonePresetData;
  /** Floating pill badges floating around the phone exterior */
  floatingBadges?: FloatingBadgeItem[];
  /** Render soft ambient gradient aura behind the device */
  ambientGlow?: boolean;
  /** Realistic glass reflection sheen across device screen */
  showGlare?: boolean;
  /** Status bar on top with clock, wifi, battery */
  showStatusBar?: boolean;
  /** Custom time display in status bar - defaults to romantic 11:11 */
  timeString?: string;
  /** Security or privacy badge text in status bar */
  statusBadgeText?: string;
  /** Audio track playing state */
  defaultAudioPlaying?: boolean;
  /** Callback when audio toggles */
  onAudioToggle?: (playing: boolean) => void;
  /** Custom screen content (overrides or extends presets) */
  children?: ReactNode;
  /** Extra class names for outer wrapper */
  className?: string;
}

export function PhoneMockup({
  size = "md",
  theme = "pearl-silver",
  preset = "birthday",
  presetData,
  floatingBadges,
  ambientGlow = true,
  showGlare = true,
  showStatusBar = true,
  timeString = "11:11",
  statusBadgeText = "Private Link 🔒",
  defaultAudioPlaying = false,
  onAudioToggle,
  children,
  className,
}: PhoneMockupProps) {
  // Interactive internal states for preset experiences
  const [isPlaying, setIsPlaying] = useState(defaultAudioPlaying);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [letterOpened, setLetterOpened] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Audio toggle handler with synthesized sound
  const handleAudioToggle = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (next) {
        playRomanticChime();
      }
      onAudioToggle?.(next);
      return next;
    });
  };

  const handleCandleToggle = () => {
    setCandlesBlown((prev) => {
      const next = !prev;
      if (next) {
        playCelebrationChime();
      }
      return next;
    });
  };

  const handleLetterOpen = () => {
    setLetterOpened(true);
    playRomanticChime();
  };

  // Default values for presets
  const data = {
    recipientName: presetData?.recipientName || "Khushi",
    title:
      presetData?.title ||
      (preset === "birthday"
        ? "Happy Birthday, Khushi! 🎂"
        : preset === "romantic-letter"
          ? "A Special Surprise"
          : "A Special Memory 💌"),
    subtitle:
      presetData?.subtitle ||
      (preset === "birthday"
        ? "Make a wish & blow the candles!"
        : preset === "romantic-letter"
          ? "Someone who adores you made this memory just for you."
          : "Someone created a keepsake for you"),
    badgeText:
      presetData?.badgeText ||
      (preset === "birthday"
        ? "SURPRISE UNLOCKED 🎁"
        : preset === "romantic-letter"
          ? "FOR SOMEONE CHERISHED"
          : "FOR SOMEONE SPECIAL ✨"),
    songTitle: presetData?.songTitle || "Perfect Melody - Acoustic",
    actionLabel:
      presetData?.actionLabel ||
      (preset === "birthday"
        ? "Open Memory Gallery 💌"
        : preset === "romantic-letter"
          ? "Tap to Open Keepsake ✨"
          : "Unlock Keepsake ✨"),
    onActionClick: presetData?.onActionClick,
    memoryCount: presetData?.memoryCount || 14,
    quote:
      presetData?.quote ||
      "Every love story is special, but ours is my absolute favorite.",
    dateBadge: presetData?.dateBadge || "October 14 • Golden Hour",
    footnoteText:
      presetData?.footnoteText || "Made with love • Works on any device",
  };

  // Dimensions based on size preset - Modern Elongated Flagship Smartphone (19.5:9 Aspect Ratio)
  const sizeStyles = {
    sm: "w-[260px] h-[475px] rounded-[44px] border-[8px]",
    md: "w-[280px] sm:w-[315px] h-[530px] sm:h-[575px] rounded-[48px] sm:rounded-[52px] border-[9px] sm:border-[10px]",
    lg: "w-[310px] sm:w-[350px] h-[570px] sm:h-[600px] rounded-[52px] sm:rounded-[56px] border-[10px] sm:border-[11px]",
  }[size];

  // Hardware finishes - Light Theme luxury hardware look with metallic side buttons
  const themeStyles = {
    "pearl-silver": {
      bezel:
        "border-[#eedfe4] bg-gradient-to-b from-white via-[#f8eff3] to-[#ebdbe2] shadow-[0_24px_60px_-15px_rgba(255,42,95,0.18)] ring-1 ring-white/95 ring-offset-2 ring-offset-pink-100/50",
      dynamicIsland: "bg-[#1f1a1c]",
      homeBar: "bg-[#1f1a1c]/25",
      buttons: "bg-[#ded0d5]",
    },
    "rose-gold": {
      bezel:
        "border-[#e8cbd4] bg-gradient-to-b from-[#fff5f7] via-[#f7e0e7] to-[#e8cdd5] shadow-[0_24px_60px_-15px_rgba(255,42,95,0.22)] ring-1 ring-pink-200/90 ring-offset-2 ring-offset-pink-100/60",
      dynamicIsland: "bg-[#2b1821]",
      homeBar: "bg-[#e11d48]/30",
      buttons: "bg-[#e2c1cb]",
    },
    titanium: {
      bezel: "border-[#2b2528] bg-[#1a1618] shadow-2xl ring-1 ring-white/15",
      dynamicIsland: "bg-[#120f10]",
      homeBar: "bg-black/35",
      buttons: "bg-[#383134]",
    },
  }[theme];

  return (
    <div className={cn("relative mx-auto flex items-center justify-center select-none", className)}>
      {/* 1. Luminous Ambient Glow Aura */}
      {ambientGlow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-4 -z-10 rounded-[48px] bg-gradient-to-tr from-[#ff3366]/20 via-[#ff758f]/25 to-pink-200/30 blur-2xl transition-opacity duration-700"
        />
      )}

      {/* 2. Device Hardware Bezel Shell (Light Ceramic / Metal Finish) */}
      <div
        className={cn(
          "relative transition-all duration-300",
          sizeStyles,
          themeStyles.bezel
        )}
      >
        {/* Hardware Physical Side Buttons */}
        {/* Right side: Power Button */}
        <div className={cn("absolute -right-[11px] top-28 h-12 w-[3px] rounded-r-[2px] transition-colors", themeStyles.buttons)} />
        {/* Left side: Action Button */}
        <div className={cn("absolute -left-[11px] top-20 h-6 w-[3px] rounded-l-[2px] transition-colors", themeStyles.buttons)} />
        {/* Left side: Volume Up */}
        <div className={cn("absolute -left-[11px] top-30 h-11 w-[3px] rounded-l-[2px] transition-colors", themeStyles.buttons)} />
        {/* Left side: Volume Down */}
        <div className={cn("absolute -left-[11px] top-44 h-11 w-[3px] rounded-l-[2px] transition-colors", themeStyles.buttons)} />

        {/* Dynamic Island / Top Camera Speaker Pill */}
        <div
          className={cn(
            "absolute top-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-between px-3 h-5 rounded-full transition-all duration-300 shadow-xs",
            isPlaying ? "w-36 bg-black text-white" : "w-28",
            themeStyles.dynamicIsland
          )}
        >
          {/* Camera Dot with AR Lens Reflection */}
          <div className="size-2 rounded-full bg-[#0a0809] ring-1 ring-white/15 flex items-center justify-center">
            <span className="size-0.5 rounded-full bg-cyan-400/40" />
          </div>

          {/* Dynamic Island Interactive Wave if playing */}
          {isPlaying ? (
            <div className="flex items-center gap-1 text-[9px] text-pink-400 font-mono">
              <span className="size-1 rounded-full bg-emerald-400 animate-ping" />
              <div className="flex items-center gap-0.5 h-2.5">
                <span className="w-0.5 h-1.5 bg-pink-400 rounded-full animate-pulse" />
                <span className="w-0.5 h-2.5 bg-rose-400 rounded-full animate-bounce" />
                <span className="w-0.5 h-2 bg-pink-300 rounded-full animate-pulse" />
              </div>
            </div>
          ) : (
            <div className="size-1 rounded-full bg-emerald-500/40" />
          )}

          {/* Microphone Sensor */}
          <div className="size-1.5 rounded-full bg-white/10" />
        </div>

        {/* 3. Screen Viewport Glass Container (Luminous Light Theme) */}
        <div className="relative overflow-hidden rounded-[38px] sm:rounded-[42px] bg-gradient-to-b from-[#fff8fa] via-white to-[#fff0f4] h-full flex flex-col justify-between border border-[#ffe0e6]/70 shadow-inner">
          {/* Glass Glare Sheen Reflection (Diagonal Light Highlight) */}
          {showGlare && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 size-64 rotate-45 bg-gradient-to-b from-white/45 via-white/10 to-transparent z-20"
            />
          )}

          {/* Top Status Bar with Live Controls */}
          {showStatusBar && (
            <div className="relative z-10 pt-3 px-4 flex items-center justify-between text-[11px] font-medium text-[#6b5e62]">
              {/* Clock (Customizable / 11:11 Wish Time) */}
              <span className="font-semibold text-[10px] tracking-tight text-[#1f1a1c]">{timeString}</span>

              {/* Status / Audio Control Pill */}
              <button
                type="button"
                onClick={handleAudioToggle}
                className="text-[10px] text-[#e11d48] font-semibold flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-pink-200/90 shadow-2xs hover:bg-pink-50 transition-colors cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <div className="flex items-center gap-0.5 h-2.5 px-0.5">
                      <span className="w-0.5 h-1.5 bg-[#ff3366] rounded-full animate-pulse" />
                      <span className="w-0.5 h-2.5 bg-[#e11d48] rounded-full animate-bounce" />
                      <span className="w-0.5 h-1.5 bg-[#ff758f] rounded-full animate-pulse" />
                    </div>
                    <span>Melody Playing</span>
                  </>
                ) : (
                  <>
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{statusBadgeText}</span>
                  </>
                )}
              </button>

              {/* Network, WiFi & Battery icons */}
              <div className="flex items-center gap-1 text-[10px] text-[#1f1a1c]">
                <svg className="size-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z" opacity="0.25" />
                  <path d="M12 7.5a4.5 4.5 0 0 0-4.5 4.5c0 1.25.51 2.38 1.34 3.19L12 18.5l3.16-3.31A4.47 4.47 0 0 0 16.5 12c0-2.48-2.02-4.5-4.5-4.5z" />
                </svg>
                {/* Battery icon with green power bar */}
                <div className="flex items-center">
                  <div className="w-4 h-2 rounded-[2px] border border-current p-0.5 flex items-center">
                    <div className="w-full h-full bg-emerald-500 rounded-[1px]" />
                  </div>
                  <div className="w-0.5 h-1 bg-current rounded-r-[1px]" />
                </div>
              </div>
            </div>
          )}

          {/* Screen Content Body */}
          <div className="relative z-10 flex-1 px-4 pt-2 pb-1 flex flex-col justify-between overflow-hidden">
            {children ? (
              // Custom children passed
              children
            ) : preset === "birthday" ? (
              // 🎂 Birthday Screen Experience
              <div className="flex flex-col justify-between h-full py-1">
                {/* Header Tag */}
                <div className="text-center mt-1">
                  <span className="inline-block rounded-full bg-[var(--love-surface-blush)] border border-[var(--love-border)] px-3 py-1 text-[10px] font-bold text-[var(--love-crimson)] tracking-wide shadow-2xs">
                    {data.badgeText}
                  </span>
                  <h3 className="mt-2 font-serif text-xl sm:text-2xl font-bold text-[var(--love-text-heading)] leading-snug">
                    {data.title}
                  </h3>
                  <p className="mt-1 text-[11px] text-[var(--love-text-muted)] font-medium">
                    {candlesBlown ? "✨ Wish granted! Best birthday ever!" : data.subtitle}
                  </p>
                </div>

                {/* Interactive Candle / Surprise Center */}
                <div className="my-auto space-y-3">
                  <button
                    type="button"
                    onClick={handleCandleToggle}
                    className="w-full rounded-2xl bg-white/95 p-4 shadow-love-card border border-[var(--love-border)] backdrop-blur-xs transition hover:scale-[1.02] active:scale-95 cursor-pointer text-center group"
                  >
                    <div className="text-4xl transition-transform duration-300 group-hover:scale-110">
                      {candlesBlown ? "💨 ✨ 🎂 🥳 🎉" : "🕯️ 🕯️ 🎂 🕯️ 🕯️"}
                    </div>
                    <div className="mt-2.5 text-[11px] font-bold text-[var(--love-crimson)] flex items-center justify-center gap-1.5">
                      <span>{candlesBlown ? "🎉 Candles Blown! (Tap to Relight)" : "Tap to Blow Candles 🌬️"}</span>
                    </div>
                  </button>

                  {/* Interactive Music Player Capsule */}
                  <div className="rounded-2xl bg-white/95 p-2.5 shadow-love-card border border-[var(--love-border)] flex items-center justify-between text-xs backdrop-blur-xs">
                    <div className="flex items-center gap-2 overflow-hidden pr-2">
                      <span className="text-sm">🎵</span>
                      <div className="text-left truncate">
                        <div className="text-[11px] font-semibold text-[var(--love-text-heading)] truncate">
                          {data.songTitle}
                        </div>
                        <div className="text-[9px] text-[var(--love-text-muted)]">Special Birthday Tune</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleAudioToggle}
                      className={cn(
                        "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                        isPlaying
                          ? "bg-[var(--love-crimson)] text-white shadow-xs"
                          : "bg-[var(--love-surface-blush)] text-[var(--love-crimson)] border border-pink-200"
                      )}
                    >
                      {isPlaying ? (
                        <>
                          <div className="flex items-center gap-0.5 h-2.5">
                            <span className="w-0.5 h-1.5 bg-white rounded-full animate-pulse" />
                            <span className="w-0.5 h-2.5 bg-white rounded-full animate-bounce" />
                            <span className="w-0.5 h-1 bg-white rounded-full animate-pulse" />
                          </div>
                          <span>Playing</span>
                        </>
                      ) : (
                        <span>▶ Play</span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Bottom Action CTA */}
                <button
                  type="button"
                  onClick={data.onActionClick}
                  className="w-full rounded-full bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] py-2.5 text-xs font-bold text-white shadow-love-lift cursor-pointer hover:opacity-95 active:scale-95 transition-all mt-1"
                >
                  {data.actionLabel}
                </button>
              </div>
            ) : preset === "romantic-letter" ? (
              // 💌 Romantic Envelope Keepsake Experience
              <div className="flex flex-col justify-between h-full py-1 text-center">
                <div>
                  <span className="inline-block rounded-full bg-pink-100/70 px-3 py-0.5 text-[10px] font-bold text-[var(--love-crimson)] tracking-wide">
                    {data.badgeText}
                  </span>
                </div>

                <div className="my-auto py-2">
                  {!letterOpened ? (
                    /* Sealed Love Letter State */
                    <div className="space-y-4">
                      <div
                        onClick={handleLetterOpen}
                        className="relative mx-auto size-28 rounded-3xl bg-gradient-to-br from-white via-[#fff0f3] to-[#ffe5ec] border border-pink-200 shadow-md flex items-center justify-center p-3 cursor-pointer hover:scale-105 active:scale-95 transition-all group"
                      >
                        <div className="size-16 rounded-2xl bg-white shadow-inner flex flex-col items-center justify-center border border-pink-100">
                          <span className="text-3xl animate-heart-beat group-hover:scale-110 transition-transform">
                            💌
                          </span>
                        </div>
                        {/* Wax Seal Detail */}
                        <div className="absolute -bottom-2 -right-2 size-8 rounded-full bg-gradient-to-tr from-[#e11d48] to-[#ff3366] text-white flex items-center justify-center text-xs font-serif shadow-md border-2 border-white">
                          ♥
                        </div>
                      </div>

                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1f1a1c]">
                          {data.title}
                        </h3>
                        <p className="mt-1 text-xs text-[#6b5e62] leading-relaxed max-w-xs mx-auto">
                          {data.subtitle}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleLetterOpen}
                        className="w-full rounded-full bg-gradient-to-r from-[#ff3366] via-[#ff4d6d] to-[#ff758f] py-2.5 text-xs font-bold text-white shadow-md shadow-pink-500/25 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                      >
                        {data.actionLabel}
                      </button>
                    </div>
                  ) : (
                    /* Opened Keepsake State */
                    <div className="space-y-3.5 animate-in fade-in zoom-in-95 duration-400">
                      <div className="relative rounded-2xl bg-white p-3.5 shadow-md border border-pink-100">
                        <div className="aspect-4/3 rounded-xl bg-gradient-to-br from-[#fff0f3] to-[#ffe5ec] flex flex-col items-center justify-center text-center p-3.5 relative overflow-hidden">
                          <span className="text-2xl mb-1">💑 ✨</span>
                          <p className="font-serif italic text-sm text-[#1f1a1c] font-medium leading-snug">
                            &ldquo;{data.quote}&rdquo;
                          </p>
                          <span className="text-[10px] text-[#e11d48] mt-2 uppercase tracking-wider font-bold">
                            {data.dateBadge}
                          </span>
                        </div>
                      </div>

                      <div className="rounded-xl bg-white p-2.5 border border-pink-100 flex items-center justify-between text-left text-xs">
                        <div>
                          <div className="font-bold text-[#1f1a1c] text-[11px]">
                            🎵 {data.songTitle}
                          </div>
                          <div className="text-[10px] text-[#6b5e62]">
                            Acoustic Piano &amp; Rain
                          </div>
                        </div>
                        <span className="size-2 rounded-full bg-[#ff3366] animate-ping" />
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="text-[10px] text-[#e11d48] font-bold">
                          📸 {data.memoryCount} Memories Attached
                        </span>
                        <button
                          type="button"
                          onClick={() => setLetterOpened(false)}
                          className="font-bold text-[#e11d48] underline underline-offset-2 hover:opacity-80 cursor-pointer"
                        >
                          Close Letter ✉️
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footnote inside the phone */}
                <div className="text-[9px] text-[#8e7b7e] py-0.5">
                  {data.footnoteText}
                </div>
              </div>
            ) : preset === "wedding" ? (
              // 💍 Wedding Invitation Experience
              <div className="flex flex-col justify-between h-full py-1 text-center">
                <div className="mt-1">
                  <div className="mx-auto size-11 rounded-full border border-amber-300 bg-amber-50 flex items-center justify-center font-serif text-amber-800 text-xs font-bold shadow-2xs">
                    R & S
                  </div>
                  <h4 className="mt-2 font-serif text-xl font-bold text-[var(--love-text-heading)]">
                    Rohit & Simran
                  </h4>
                  <p className="text-[10px] text-amber-700 font-semibold tracking-wider uppercase">
                    Save The Date • 12.12.2026
                  </p>
                </div>

                <div className="rounded-2xl bg-white/95 p-4 shadow-love-card border border-pink-100 my-auto space-y-3">
                  <div className="text-xs text-[var(--love-text-heading)] font-serif font-medium">
                    The Grand Palace, Udaipur
                  </div>
                  <div className="text-[10px] text-[var(--love-text-muted)]">
                    Ceremony at 6:00 PM • Royal Dinner Follows
                  </div>
                  <button
                    type="button"
                    onClick={() => setRsvpSubmitted((v) => !v)}
                    className={cn(
                      "w-full rounded-xl py-2.5 text-xs font-bold transition-all cursor-pointer",
                      rsvpSubmitted
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-xs"
                    )}
                  >
                    {rsvpSubmitted ? "✓ RSVP Confirmed (Attending)" : "Send RSVP & Open Map 📍"}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={data.onActionClick}
                  className="w-full rounded-full bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] py-2.5 text-xs font-bold text-white shadow-love-lift cursor-pointer mt-1"
                >
                  View Full Wedding Suite 🕊️
                </button>
              </div>
            ) : null}
          </div>

          {/* Bottom iOS Home Indicator Bar - Minimal sleek bottom margin */}
          <div className="relative z-10 pb-1.5 pt-0.5 flex justify-center">
            <div className={cn("h-1 w-28 rounded-full transition-colors", themeStyles.homeBar)} />
          </div>
        </div>
      </div>

      {/* 4. Surrounding Floating Badges */}
      {floatingBadges && floatingBadges.length > 0 && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-40 hidden sm:block">
          {floatingBadges.map((badge, idx) => (
            <div
              key={idx}
              className={cn(
                "pointer-events-auto absolute flex items-center gap-2.5 rounded-2xl bg-white/95 px-4 py-2.5 shadow-xl shadow-pink-500/10 border border-pink-100 backdrop-blur-md transition-all duration-300 hover:scale-105 animate-gentle-float",
                badge.position || (idx === 0 ? "-top-4 -left-8" : "bottom-12 -right-8"),
                badge.className
              )}
            >
              {badge.icon && <span className="text-base">{badge.icon}</span>}
              <div className="text-left">
                <div className="text-xs font-bold text-[#1f1a1c]">{badge.text}</div>
                {badge.subtext && (
                  <div className="text-[10px] text-[#6b5e62]">{badge.subtext}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
