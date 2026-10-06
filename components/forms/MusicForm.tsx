import { useState } from "react";
import type { BirthdayWishData } from "@/lib/birthday-types";
import { MUSIC_TRACKS } from "@/lib/birthday-data";
import { MusicButton } from "@/components/invitation/MusicButton";
import { Sparkle } from "@/components/decorative/Sparkle";

type MusicFormProps = {
  data: BirthdayWishData;
  onChange: (updates: Partial<BirthdayWishData>) => void;
};

export function MusicForm({ data, onChange }: MusicFormProps) {
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  const toggleSamplePlay = (trackId: string) => {
    if (playingTrackId === trackId) {
      setPlayingTrackId(null);
    } else {
      setPlayingTrackId(trackId);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="font-display text-3xl font-normal text-text">
          Add a little atmosphere.
        </h2>
        <p className="text-sm text-text-muted">
          A familiar song can make a beautiful memory feel even closer.
        </p>
      </div>

      {/* Music Track Options Cards */}
      <div className="grid gap-3 sm:grid-cols-2 max-w-lg">
        {MUSIC_TRACKS.map((track) => {
          const isSelected = data.music === track.id;
          const isPlaying = playingTrackId === track.id;

          return (
            <div
              key={track.id}
              onClick={() => onChange({ music: track.id })}
              className={`relative flex flex-col justify-between cursor-pointer rounded-2xl border p-5 shadow-soft transition-all duration-200 ${
                isSelected
                  ? "border-primary bg-[linear-gradient(135deg,#fffdf9_0%,#fff2ef_100%)] ring-2 ring-primary/20 shadow-lift"
                  : "border-border bg-surface hover:border-border/80 hover:bg-surface-soft"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl text-text font-normal">
                    {track.title}
                  </h3>
                  <p className="text-xs text-text-muted mt-1">{track.mood}</p>
                </div>

                <div
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full border text-xs ${
                    isSelected
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-surface text-transparent"
                  }`}
                >
                  ✓
                </div>
              </div>

              {track.id !== "none" && (
                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                    {track.genre}
                  </span>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSamplePlay(track.id);
                    }}
                  >
                    <MusicButton isPlaying={isPlaying} label={isPlaying ? "Pause sample" : "Listen sample"} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-border/80 bg-surface/80 p-4 max-w-lg text-xs text-text-muted flex items-center gap-3">
        <Sparkle className="text-accent text-lg shrink-0" />
        <p>
          The chosen melody will play softly when they open their birthday surprise.
        </p>
      </div>
    </div>
  );
}
