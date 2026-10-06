"use client";

import { useState, useEffect } from "react";
import { brand } from "@/lib/brand";
import {
  DEFAULT_BIRTHDAY_DATA,
  loadSavedBirthdayWish,
  saveBirthdayWishDraft,
} from "@/lib/birthday-data";
import type { BirthdayWishData } from "@/lib/birthday-types";
import { Button } from "@/components/ui/Button";
import { PhonePreview } from "@/components/marketing/PhonePreview";
import { BirthdayWishRenderer } from "@/components/birthday/BirthdayWishRenderer";
import { BirthdayStepIndicator } from "./BirthdayStepIndicator";
import { RecipientForm } from "@/components/forms/RecipientForm";
import { MessageForm } from "@/components/forms/MessageForm";
import { PhotoForm } from "@/components/forms/PhotoForm";
import { MusicForm } from "@/components/forms/MusicForm";
import { PreviewSheet } from "./PreviewSheet";
import { Sparkle } from "@/components/decorative/Sparkle";

export function EditorShell() {
  const [data, setData] = useState<BirthdayWishData>(DEFAULT_BIRTHDAY_DATA);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSavedLocally, setIsSavedLocally] = useState(true);
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);
  const [errors, setErrors] = useState<{ recipientName?: string; message?: string }>({});

  // Load saved draft on mount
  useEffect(() => {
    const saved = loadSavedBirthdayWish();
    if (saved) {
      setData(saved);
    }
  }, []);

  // Update data and save to localStorage
  const handleDataChange = (updates: Partial<BirthdayWishData>) => {
    const next = { ...data, ...updates };
    setData(next);
    saveBirthdayWishDraft(next);
    setIsSavedLocally(true);

    // Clear validation errors when typing
    if (updates.recipientName && errors.recipientName) {
      setErrors((prev) => ({ ...prev, recipientName: undefined }));
    }
    if (updates.message && errors.message) {
      setErrors((prev) => ({ ...prev, message: undefined }));
    }
  };

  // Step validation
  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!data.recipientName.trim()) {
        setErrors((prev) => ({
          ...prev,
          recipientName: "Tell us their name first ❤️",
        }));
        return false;
      }
    }
    if (step === 2) {
      if (!data.message.trim()) {
        setErrors((prev) => ({
          ...prev,
          message: "Write a short note from the heart ❤️",
        }));
        return false;
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleStepClick = (stepNumber: number) => {
    if (stepNumber < currentStep || validateStep(currentStep)) {
      setCurrentStep(stepNumber);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-text">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-border/80 bg-background/90 py-3.5 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/birthday" className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-text font-display text-sm font-semibold text-white">
              {brand.logo}
            </span>
            <span className="font-display text-xl tracking-tight text-text hidden xs:inline">
              {brand.name}
            </span>
            <span className="text-xs text-text-muted">/ Birthday Wish</span>
          </a>

          <div className="flex items-center gap-4">
            {/* Auto-save Status */}
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-text-muted">
              <span className="size-2 rounded-full bg-success" />
              <span>{isSavedLocally ? "Saved locally" : "Saving..."}</span>
            </span>

            {/* Mobile Preview Trigger */}
            <button
              type="button"
              onClick={() => setIsMobilePreviewOpen(true)}
              className="lg:hidden flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-text shadow-soft hover:bg-surface-soft"
            >
              <span>Preview</span>
              <Sparkle className="text-primary text-xs" />
            </button>

            <Button href="/birthday/preview" variant="outline" size="sm" className="hidden lg:inline-flex">
              Full Preview
            </Button>
          </div>
        </div>
      </header>

      {/* Main Split Layout */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Left Column: Editor Controls & Step Form */}
          <div className="flex flex-col justify-between min-h-[calc(100vh-12rem)] space-y-8">
            <div className="space-y-8">
              {/* Progress Step Indicator */}
              <BirthdayStepIndicator
                currentStep={currentStep}
                onStepClick={handleStepClick}
              />

              {/* Step Forms */}
              <div className="rounded-3xl border border-border/80 bg-surface p-6 sm:p-8 shadow-soft">
                {currentStep === 1 && (
                  <RecipientForm
                    data={data}
                    onChange={handleDataChange}
                    errors={errors}
                  />
                )}

                {currentStep === 2 && (
                  <MessageForm
                    data={data}
                    onChange={handleDataChange}
                    errors={errors}
                  />
                )}

                {currentStep === 3 && (
                  <PhotoForm data={data} onChange={handleDataChange} />
                )}

                {currentStep === 4 && (
                  <MusicForm data={data} onChange={handleDataChange} />
                )}

                {currentStep === 5 && (
                  <div className="space-y-6 animate-fade-in text-center py-4">
                    <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-soft text-primary text-2xl">
                      💌
                    </div>
                    <div className="space-y-2 max-w-md mx-auto">
                      <h2 className="font-display text-3xl font-normal text-text">
                        Your surprise is ready!
                      </h2>
                      <p className="text-sm text-text-muted">
                        Here&apos;s the exact experience {data.recipientName || "they"} will see when opening their link.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                      <Button href="/birthday/preview" size="lg" className="shadow-lift">
                        <span>See Fullscreen Surprise</span>
                        <Sparkle className="text-accent text-sm ml-2" />
                      </Button>
                      <Button
                        onClick={() => setCurrentStep(1)}
                        variant="secondary"
                        size="lg"
                      >
                        Keep Editing
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Form Navigation Buttons */}
            <div className="flex items-center justify-between border-t border-border/60 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className={currentStep === 1 ? "opacity-50 pointer-events-none" : ""}
              >
                ← Back
              </Button>

              {currentStep < 5 ? (
                <Button type="button" onClick={handleNextStep} size="md">
                  <span>Continue</span>
                  <span aria-hidden="true">→</span>
                </Button>
              ) : (
                <Button href="/birthday/preview" size="md">
                  <span>Preview Wish</span>
                </Button>
              )}
            </div>
          </div>

          {/* Right Column: Live Sticky Device Preview (Desktop) */}
          <div className="hidden lg:block sticky top-24">
            <div className="rounded-3xl border border-border bg-surface-soft/60 p-6 shadow-soft text-center space-y-3">
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span className="font-semibold uppercase tracking-widest text-primary">
                  Live Interactive Preview
                </span>
                <span className="text-[11px] text-text-muted">Updates as you type</span>
              </div>

              <div className="flex justify-center py-2">
                <PhonePreview size="md" className="shadow-phone">
                  <BirthdayWishRenderer data={data} autoOpen={false} />
                </PhonePreview>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Full-Screen Mobile Preview Modal */}
      <PreviewSheet
        isOpen={isMobilePreviewOpen}
        onClose={() => setIsMobilePreviewOpen(false)}
        data={data}
      />
    </div>
  );
}
