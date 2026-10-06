import { Heart } from "@/components/decorative/Heart";
import { PhotoFrame } from "./PhotoFrame";
import { MusicButton } from "./MusicButton";

type BirthdayPreviewProps = {
  recipient?: string;
  sender?: string;
  message?: string;
  compact?: boolean;
};

export function BirthdayPreview({
  recipient = "Priya",
  sender = "Aarav",
  message = "Every ordinary day feels brighter with you in it.",
  compact = false,
}: BirthdayPreviewProps) {
  return (
    <div className="relative grid min-h-full overflow-hidden bg-[linear-gradient(180deg,#fff9f1,#f8e5df_52%,#fffaf5)] p-5 text-center text-text">
      <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(176,87,101,0.16),transparent)]" />
      <div className="relative z-10 grid content-between gap-4">
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase text-primary-strong">Made for you</p>
          <div>
            <p className="font-display text-4xl leading-none">Happy Birthday</p>
            <p className="mt-1 font-display text-5xl leading-none text-primary">{recipient}</p>
          </div>
          <Heart className="text-xl" />
        </div>

        <PhotoFrame className={compact ? "mx-auto w-32" : "mx-auto w-40"} variant="polaroid" />

        <div className="space-y-3">
          <p className="mx-auto max-w-[14rem] text-sm leading-6 text-text-muted">{message}</p>
          <p className="font-display text-xl text-text">With all my love, {sender}</p>
          <MusicButton className="mx-auto" />
        </div>
      </div>
    </div>
  );
}
