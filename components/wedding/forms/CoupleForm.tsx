import type { ChangeEvent } from "react";
import type { WeddingInvitationData } from "@/lib/wedding-types";
import { Input } from "@/components/ui/Input";
import { Sparkle } from "@/components/decorative/Sparkle";

type CoupleFormProps = {
  data: WeddingInvitationData;
  onChange: (updates: Partial<WeddingInvitationData>) => void;
  errors?: { brideName?: string; groomName?: string; weddingDate?: string };
};

export function CoupleForm({ data, onChange, errors }: CoupleFormProps) {
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const result = evt.target?.result as string;
      if (result) onChange({ couplePhoto: result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="font-display text-3xl font-normal text-text">
          Let&apos;s start with the two of you.
        </h2>
        <p className="text-sm text-text-muted">
          Add couple names, your photo, and your wedding date.
        </p>
      </div>

      {/* Bride & Groom Names */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="brideName" className="block text-xs font-semibold uppercase tracking-wider text-text">
            Bride / Partner 1 <span className="text-primary">*</span>
          </label>
          <Input
            id="brideName"
            value={data.brideName}
            onChange={(e) => onChange({ brideName: e.target.value })}
            placeholder="Her name (e.g. Isha)"
            autoFocus
          />
          {errors?.brideName && (
            <p className="text-xs text-primary font-medium">{errors.brideName}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="groomName" className="block text-xs font-semibold uppercase tracking-wider text-text">
            Groom / Partner 2 <span className="text-primary">*</span>
          </label>
          <Input
            id="groomName"
            value={data.groomName}
            onChange={(e) => onChange({ groomName: e.target.value })}
            placeholder="His name (e.g. Rahul)"
          />
          {errors?.groomName && (
            <p className="text-xs text-primary font-medium">{errors.groomName}</p>
          )}
        </div>
      </div>

      {/* Couple Photo Upload */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-text">
          Couple Photo <span className="text-text-muted font-normal">(Optional)</span>
        </label>

        {data.couplePhoto ? (
          <div className="relative aspect-[4/3] w-full max-w-sm overflow-hidden rounded-2xl border-2 border-primary/30 bg-surface shadow-soft group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.couplePhoto}
              alt="Couple photo preview"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-text/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <label className="cursor-pointer rounded-full bg-white px-4 py-2 text-xs font-semibold text-text shadow-sm hover:bg-surface-soft">
                Replace
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="sr-only" />
              </label>
              <button
                type="button"
                onClick={() => onChange({ couplePhoto: "" })}
                className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-strong"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <label className="flex aspect-video w-full max-w-sm cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-surface-soft/60 p-6 text-center transition hover:border-primary/50 hover:bg-surface-soft">
            <div className="flex size-12 items-center justify-center rounded-full bg-white text-primary shadow-xs mb-2">
              <Sparkle className="text-xl" />
            </div>
            <p className="font-display text-lg text-text">+ Add Couple Photo</p>
            <p className="text-xs text-text-muted mt-1">
              Select an engagement or favorite photo together
            </p>
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="sr-only" />
          </label>
        )}
      </div>

      {/* Wedding Date & Time */}
      <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-border/60">
        <div className="space-y-2">
          <label htmlFor="weddingDate" className="block text-xs font-semibold uppercase tracking-wider text-text">
            Wedding Date <span className="text-primary">*</span>
          </label>
          <Input
            id="weddingDate"
            type="date"
            value={data.weddingDate}
            onChange={(e) => onChange({ weddingDate: e.target.value })}
          />
          {errors?.weddingDate && (
            <p className="text-xs text-primary font-medium">{errors.weddingDate}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="weddingTime" className="block text-xs font-semibold uppercase tracking-wider text-text">
            Ceremony Time <span className="text-text-muted font-normal">(Optional)</span>
          </label>
          <Input
            id="weddingTime"
            value={data.weddingTime || ""}
            onChange={(e) => onChange({ weddingTime: e.target.value })}
            placeholder="e.g. 6:00 PM"
          />
        </div>
      </div>
    </div>
  );
}
