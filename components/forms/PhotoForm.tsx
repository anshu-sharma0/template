"use client";

import { useState, type ChangeEvent, type DragEvent } from "react";
import type { BirthdayWishData } from "@/lib/birthday-types";
import { Sparkle } from "@/components/decorative/Sparkle";

type PhotoFormProps = {
  data: BirthdayWishData;
  onChange: (updates: Partial<BirthdayWishData>) => void;
};

export function PhotoForm({ data, onChange }: PhotoFormProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDraggingMain, setIsDraggingMain] = useState(false);

  const uploadFileToCloudinary = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", "birthday");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok && result.success && result.url) {
        setIsUploading(false);
        return result.url;
      }
    } catch (err) {
      console.warn("Cloudinary API upload warning, fallback to data URL:", err);
    }

    // Fallback: Data URL if server upload fails offline
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setIsUploading(false);
        resolve((e.target?.result as string) || null);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleMainPhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadFileToCloudinary(file);
    if (url) {
      onChange({ mainPhoto: url });
    }
  };

  const handleMainPhotoDrop = async (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDraggingMain(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const url = await uploadFileToCloudinary(file);
    if (url) {
      onChange({ mainPhoto: url });
    }
  };

  const handleGalleryPhotoAdd = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadFileToCloudinary(file);
    if (url) {
      onChange({ photos: [...data.photos, url] });
    }
  };

  const handleRemoveMainPhoto = () => {
    onChange({ mainPhoto: "" });
  };

  const handleRemoveGalleryPhoto = (index: number) => {
    const updated = [...data.photos];
    updated.splice(index, 1);
    onChange({ photos: updated });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="font-display text-3xl font-normal text-text">
          Add a few memories.
        </h2>
        <p className="text-sm text-text-muted">
          Photos make the surprise feel truly personal.
        </p>
      </div>

      {/* Main Hero Photo Slot with Drag & Drop */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-text">
          Main Featured Photo <span className="text-text-muted font-normal">(Optional)</span>
        </label>

        {isUploading ? (
          <div className="flex aspect-video w-full max-w-sm items-center justify-center rounded-2xl border border-primary/30 bg-surface-soft p-6">
            <div className="flex items-center gap-3 text-xs text-primary font-semibold">
              <span className="size-2.5 rounded-full bg-primary animate-ping" />
              <span>Uploading image...</span>
            </div>
          </div>
        ) : data.mainPhoto ? (
          <div className="relative aspect-4/3 w-full max-w-sm overflow-hidden rounded-2xl border-2 border-primary/30 bg-surface shadow-soft group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.mainPhoto}
              alt="Main birthday photo preview"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-text/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <label className="cursor-pointer rounded-full bg-white px-4 py-2 text-xs font-semibold text-text shadow-sm hover:bg-surface-soft">
                Replace
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainPhotoChange}
                  className="sr-only"
                />
              </label>
              <button
                type="button"
                onClick={handleRemoveMainPhoto}
                className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-strong"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingMain(true);
            }}
            onDragLeave={() => setIsDraggingMain(false)}
            onDrop={handleMainPhotoDrop}
            className={`flex aspect-video w-full max-w-sm cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition ${
              isDraggingMain
                ? "border-primary bg-primary-soft/30 scale-98"
                : "border-border bg-surface-soft/60 hover:border-primary/50 hover:bg-surface-soft"
            }`}
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-white text-primary shadow-xs mb-2">
              <Sparkle className="text-xl" />
            </div>
            <p className="font-display text-lg text-text">
              {isDraggingMain ? "Drop Image Here" : "+ Add Main Photo"}
            </p>
            <p className="text-xs text-text-muted mt-1">
              Drag & drop or click to upload
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleMainPhotoChange}
              className="sr-only"
            />
          </label>
        )}
      </div>

      {/* Memory Gallery Photos */}
      <div className="space-y-3 pt-4 border-t border-border/60">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text">
            Additional Memory Photos <span className="text-text-muted font-normal">(Optional)</span>
          </label>
          <p className="text-xs text-text-muted mt-0.5">
            Add up to 4 extra favorite snapshots to build a photo gallery.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md">
          {data.photos.map((photoUrl, idx) => (
            <div
              key={idx}
              className="relative aspect-square overflow-hidden rounded-xl border border-border bg-surface shadow-xs group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoUrl}
                alt={`Memory snapshot ${idx + 1}`}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveGalleryPhoto(idx)}
                aria-label={`Remove photo ${idx + 1}`}
                className="absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-full bg-text/70 text-white text-xs opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>
            </div>
          ))}

          {data.photos.length < 4 && (
            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface-soft/60 p-3 text-center transition hover:border-primary/50 hover:bg-surface-soft">
              <span className="text-xl text-primary font-bold">+</span>
              <span className="text-xs font-medium text-text mt-1">Add Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleGalleryPhotoAdd}
                className="sr-only"
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
