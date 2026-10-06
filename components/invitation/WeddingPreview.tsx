import { Floral } from "@/components/decorative/Floral";
import { PhotoFrame } from "./PhotoFrame";

type WeddingPreviewProps = {
  couple?: string;
  date?: string;
  tone?: "elegant" | "luxury";
  compact?: boolean;
};

export function WeddingPreview({
  couple = "Rahul & Isha",
  date = "12.12.2026",
  tone = "elegant",
  compact = false,
}: WeddingPreviewProps) {
  const [firstName, secondName] = couple.split("&").map((name) => name.trim());
  const luxury = tone === "luxury";

  return (
    <div
      className={
        luxury
          ? "relative grid min-h-full overflow-hidden bg-[linear-gradient(180deg,#2c2524,#5b3d43_58%,#fff9ef)] p-5 text-center text-white"
          : "relative grid min-h-full overflow-hidden bg-[linear-gradient(180deg,#fffdf9,#f3e8d8_54%,#fff8f0)] p-5 text-center text-text"
      }
    >
      <div className="relative z-10 grid content-between gap-4">
        <div className="space-y-3">
          <p className={luxury ? "text-xs text-white/70" : "text-xs text-text-muted"}>
            Together with their families
          </p>
          <Floral className="mx-auto justify-center opacity-80" />
          <div className="space-y-1">
            <p className="font-display text-5xl leading-none">{firstName}</p>
            <p className={luxury ? "font-display text-2xl text-accent" : "font-display text-2xl text-primary"}>
              &
            </p>
            <p className="font-display text-5xl leading-none">{secondName}</p>
          </div>
          <p className={luxury ? "text-sm font-medium text-accent" : "text-sm font-medium text-primary"}>
            {date}
          </p>
        </div>

        <PhotoFrame
          className={compact ? "mx-auto w-28" : "mx-auto w-36"}
          variant={luxury ? "editorial" : "portrait"}
          label="Wedding couple preview"
        />

        <div className="space-y-2">
          <p className="font-display text-2xl leading-tight">You are invited</p>
          <p className={luxury ? "text-sm leading-6 text-white/70" : "text-sm leading-6 text-text-muted"}>
            to celebrate our beginning.
          </p>
        </div>
      </div>
    </div>
  );
}
