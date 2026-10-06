import { type ChangeEvent } from "react";
import type { WeddingInvitationData } from "@/lib/wedding-types";

type GalleryFormProps = {
  data: WeddingInvitationData;
  onChange: (updates: Partial<WeddingInvitationData>) => void;
};

export function GalleryForm({ data, onChange }: GalleryFormProps) {
  const handlePhotoAdd = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const result = evt.target?.result as string;
      if (result) {
        onChange({ gallery: [...data.gallery, result] });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (index: number) => {
    const updated = [...data.gallery];
    updated.splice(index, 1);
    onChange({ gallery: updated });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="font-display text-3xl font-normal text-text">
          Add the moments you want them to remember.
        </h2>
        <p className="text-sm text-text-muted">
          Add pre-wedding, engagement, or couple snapshots to build an editorial photo gallery.
        </p>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg">
          {data.gallery.map((imgUrl, idx) => (
            <div
              key={idx}
              className="relative aspect-square overflow-hidden rounded-xl border border-border bg-surface shadow-xs group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgUrl}
                alt={`Pre-wedding photo ${idx + 1}`}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemovePhoto(idx)}
                aria-label={`Remove photo ${idx + 1}`}
                className="absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-full bg-text/70 text-white text-xs opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>
            </div>
          ))}

          {data.gallery.length < 6 && (
            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface-soft/60 p-3 text-center transition hover:border-primary/50 hover:bg-surface-soft">
              <span className="text-2xl text-primary font-bold">+</span>
              <span className="text-xs font-medium text-text mt-1">Add Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoAdd}
                className="sr-only"
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
