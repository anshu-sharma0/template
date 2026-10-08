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
          ? "relative grid min-h-full overflow-hidden bg-linear-to-b from-[#fff5f8] via-[#fce4ec] to-[#fff8fa] p-5 text-center text-[#1f1a1c]"
          : "relative grid min-h-full overflow-hidden bg-linear-to-b from-[#fffbf7] via-[#fff0f3] to-[#fff8f5] p-5 text-center text-[#1f1a1c]"
      }
    >
      <div className="relative z-10 grid content-between gap-4">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#9d3d5e]">
            Together with their families
          </p>
          <Floral className="mx-auto justify-center opacity-80" />
          <div className="space-y-1">
            <p className="font-display text-5xl leading-none text-[#1f1a1c]">{firstName}</p>
            <p className="font-display text-2xl text-[#e11d48]">
              &
            </p>
            <p className="font-display text-5xl leading-none text-[#1f1a1c]">{secondName}</p>
          </div>
          <p className="text-sm font-semibold text-[#e11d48]">
            {date}
          </p>
        </div>

        <PhotoFrame
          className={compact ? "mx-auto w-28" : "mx-auto w-36"}
          variant={luxury ? "editorial" : "portrait"}
          label="Wedding couple preview"
        />

        <div className="space-y-2">
          <p className="font-display text-2xl leading-tight text-[#1f1a1c]">You are invited</p>
          <p className="text-sm leading-6 text-[#6b5e62]">
            to celebrate our beginning.
          </p>
        </div>
      </div>
    </div>
  );
}
