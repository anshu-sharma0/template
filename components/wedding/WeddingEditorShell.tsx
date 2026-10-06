"use client";

import { useState, useEffect } from "react";
import { brand } from "@/lib/brand";
import type { WeddingInvitationData, WeddingTemplateVariant } from "@/lib/wedding-types";
import {
  DEFAULT_WEDDING_DATA,
  loadSavedWeddingData,
  saveWeddingDataDraft,
} from "@/lib/wedding-data";
import { Button } from "@/components/ui/Button";
import { PhonePreview } from "@/components/marketing/PhonePreview";
import { WeddingRenderer } from "./WeddingRenderer";
import { WeddingStepIndicator } from "./WeddingStepIndicator";
import { CoupleForm } from "./forms/CoupleForm";
import { WeddingInvitationForm } from "./forms/WeddingInvitationForm";
import { EventsForm } from "./forms/EventsForm";
import { VenueForm } from "./forms/VenueForm";
import { StoryForm } from "./forms/StoryForm";
import { GalleryForm } from "./forms/GalleryForm";
import { ExtrasForm } from "./forms/ExtrasForm";
import { WeddingPreviewSheet } from "./WeddingPreviewSheet";
import { Sparkle } from "@/components/decorative/Sparkle";

type WeddingEditorShellProps = {
  initialTemplate?: WeddingTemplateVariant;
};

export function WeddingEditorShell({ initialTemplate }: WeddingEditorShellProps) {
  const [data, setData] = useState<WeddingInvitationData>(() =>
    loadSavedWeddingData(initialTemplate)
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [isSavedLocally, setIsSavedLocally] = useState(true);
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);
  const [errors, setErrors] = useState<{
    brideName?: string;
    groomName?: string;
    weddingDate?: string;
  }>({});

  useEffect(() => {
    if (initialTemplate && data.template !== initialTemplate) {
      setData((prev) => ({ ...prev, template: initialTemplate }));
    }
  }, [initialTemplate]);

  const handleDataChange = (updates: Partial<WeddingInvitationData>) => {
    const next = { ...data, ...updates };
    setData(next);
    saveWeddingDataDraft(next);
    setIsSavedLocally(true);

    if (updates.brideName && errors.brideName) setErrors((p) => ({ ...p, brideName: undefined }));
    if (updates.groomName && errors.groomName) setErrors((p) => ({ ...p, groomName: undefined }));
    if (updates.weddingDate && errors.weddingDate) setErrors((p) => ({ ...p, weddingDate: undefined }));
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      const errs: typeof errors = {};
      if (!data.brideName.trim()) errs.brideName = "Add the bride's name to continue ❤️";
      if (!data.groomName.trim()) errs.groomName = "Add the groom's name to continue ❤️";
      if (!data.weddingDate.trim()) errs.weddingDate = "Select your wedding date to continue ❤️";

      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return false;
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 8) {
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
          <a href="/wedding" className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-text font-display text-sm font-semibold text-white">
              {brand.logo}
            </span>
            <span className="font-display text-xl tracking-tight text-text hidden xs:inline">
              {brand.name}
            </span>
            <span className="text-xs text-text-muted">/ Wedding Invitation</span>
          </a>

          <div className="flex items-center gap-3">
            {/* Template Switcher Dropdown */}
            <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs">
              <span className="text-text-muted font-medium hidden sm:inline">Design:</span>
              <select
                value={data.template}
                onChange={(e) => handleDataChange({ template: e.target.value as WeddingTemplateVariant })}
                className="bg-transparent font-semibold text-text focus:outline-none cursor-pointer"
              >
                <option value="elegant">Elegant Wedding</option>
                <option value="luxury">Luxury Wedding</option>
              </select>
            </div>

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

            <Button href="/wedding/preview" variant="outline" size="sm" className="hidden lg:inline-flex">
              Full Preview
            </Button>
          </div>
        </div>
      </header>

      {/* Main Split Layout */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Left Column: Editor Controls & Step Forms */}
          <div className="flex flex-col justify-between min-h-[calc(100vh-12rem)] space-y-8">
            <div className="space-y-8">
              {/* Progress Step Indicator */}
              <WeddingStepIndicator
                currentStep={currentStep}
                onStepClick={handleStepClick}
              />

              {/* Step Forms */}
              <div className="rounded-3xl border border-border/80 bg-surface p-6 sm:p-8 shadow-soft">
                {currentStep === 1 && (
                  <CoupleForm data={data} onChange={handleDataChange} errors={errors} />
                )}

                {currentStep === 2 && (
                  <WeddingInvitationForm data={data} onChange={handleDataChange} />
                )}

                {currentStep === 3 && (
                  <EventsForm data={data} onChange={handleDataChange} />
                )}

                {currentStep === 4 && (
                  <VenueForm data={data} onChange={handleDataChange} />
                )}

                {currentStep === 5 && (
                  <StoryForm data={data} onChange={handleDataChange} />
                )}

                {currentStep === 6 && (
                  <GalleryForm data={data} onChange={handleDataChange} />
                )}

                {currentStep === 7 && (
                  <ExtrasForm data={data} onChange={handleDataChange} />
                )}

                {currentStep === 8 && (
                  <div className="space-y-6 animate-fade-in text-center py-4">
                    <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent-soft text-accent-strong text-2xl">
                      💍
                    </div>
                    <div className="space-y-2 max-w-md mx-auto">
                      <h2 className="font-display text-3xl font-normal text-text">
                        Your invitation is ready!
                      </h2>
                      <p className="text-sm text-text-muted">
                        Here&apos;s the exact invitation microsite your guests will experience.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                      <Button href="/wedding/preview" size="lg" className="shadow-lift">
                        <span>See Fullscreen Invitation</span>
                        <Sparkle className="text-accent text-sm ml-2" />
                      </Button>
                      <Button onClick={() => setCurrentStep(1)} variant="secondary" size="lg">
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

              {currentStep < 8 ? (
                <Button type="button" onClick={handleNextStep} size="md">
                  <span>Continue</span>
                  <span aria-hidden="true">→</span>
                </Button>
              ) : (
                <Button href="/wedding/preview" size="md">
                  <span>Preview Invitation</span>
                </Button>
              )}
            </div>
          </div>

          {/* Right Column: Live Sticky Device Preview (Desktop) */}
          <div className="hidden lg:block sticky top-24">
            <div className="rounded-3xl border border-border bg-surface-soft/60 p-6 shadow-soft text-center space-y-3">
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span className="font-semibold uppercase tracking-widest text-primary">
                  Live Preview ({data.template === "luxury" ? "Luxury" : "Elegant"})
                </span>
                <span className="text-[11px] text-text-muted">Updates live</span>
              </div>

              <div className="flex justify-center py-2">
                <PhonePreview size="md" className="shadow-phone">
                  <WeddingRenderer data={data} autoOpen={false} />
                </PhonePreview>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Full-Screen Mobile Preview Modal */}
      <WeddingPreviewSheet
        isOpen={isMobilePreviewOpen}
        onClose={() => setIsMobilePreviewOpen(false)}
        data={data}
      />
    </div>
  );
}
