"use client";

interface BirthdayTopBarProps {
  currentStage: number;
  totalStages: number;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onBack?: () => void;
  isPreview?: boolean;
}

export function BirthdayTopBar({
  currentStage,
  totalStages,
  isPlayingMusic,
  onToggleMusic,
  onBack,
  isPreview = true,
}: BirthdayTopBarProps) {
  // Determine if current stage has dark background (stages 4-8) or light (stages 0, 1, 3) or magenta (stage 2)
  const isDarkTheme = currentStage >= 4;
  const isMagenta = currentStage === 2;

  const barTextColor = isDarkTheme || isMagenta ? "text-white" : "text-[#2b1821]";
  const barBtnBg = isDarkTheme || isMagenta
    ? "bg-white/10 hover:bg-white/20 text-white/90 border-white/20"
    : "bg-white/70 hover:bg-white/90 text-[#3b242e] border-[#e8cbd4]";

  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-3.5 sm:px-6 py-3 transition-colors duration-500 pointer-events-auto">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border transition-all duration-200 active:scale-95 cursor-pointer shadow-xs ${barBtnBg}`}
        aria-label="Back"
      >
        <span className="text-sm leading-none">←</span>
        <span>Back</span>
      </button>

      {/* Center Mode Pill & Mini Progress Dots */}
      <div className="flex flex-col items-center gap-1.5">
        {isPreview && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-xs animate-in fade-in">
            <span className="text-amber-400">⚡</span>
            <span>PREVIEW MODE</span>
          </div>
        )}

        {/* Dots progress indicator */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalStages }).map((_, idx) => (
            <span
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentStage
                  ? "w-4 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                  : idx < currentStage
                  ? "w-1.5 bg-white/60"
                  : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Audio Toggle Pill Button */}
      <button
        type="button"
        onClick={onToggleMusic}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border transition-all duration-200 active:scale-95 cursor-pointer shadow-xs ${barBtnBg}`}
        aria-label={isPlayingMusic ? "Mute audio" : "Play audio"}
      >
        {isPlayingMusic ? (
          <>
            <div className="flex items-center gap-0.5 h-3 px-0.5" aria-hidden="true">
              <span className="w-0.5 h-1.5 bg-rose-400 rounded-full animate-pulse" />
              <span className="w-0.5 h-3 bg-pink-400 rounded-full animate-bounce" />
              <span className="w-0.5 h-2 bg-amber-300 rounded-full animate-pulse" />
            </div>
            <span className="text-[11px] hidden xs:inline">Melody On</span>
          </>
        ) : (
          <>
            <span className="text-xs">🔈</span>
            <span className="text-[11px] hidden xs:inline">Sound Off</span>
          </>
        )}
      </button>
    </header>
  );
}
