"use client";

import { useState } from "react";
import Link from "next/link";
import { getAllTemplates } from "@/lib/template-registry";
import type { TemplateConfig } from "@/lib/creation-types";
import { TemplatePreviewDialog } from "@/components/marketing/TemplatePreviewDialog";
import { InvitationPreview } from "@/components/invitation/InvitationPreview";
import { cn } from "@/lib/cn";

export function RomanticCollections() {
  const allTemplates = getAllTemplates();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateConfig | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const categories = [
    { id: "all", label: "All Romantic Keepsakes", icon: "✨" },
    { id: "love", label: "Love & Anniversaries", icon: "♥" },
    { id: "Birthday", label: "Birthday Surprises", icon: "🎂" },
    { id: "Wedding", label: "Weddings & Vows", icon: "💍" },
  ];

  const filteredTemplates = allTemplates.filter((template) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "love") return true;
    return template.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleOpenPreview = (template: TemplateConfig) => {
    setSelectedTemplate(template);
    setDialogOpen(true);
  };

  const handleSelectTemplate = (templateId: string) => {
    setDialogOpen(false);
    const target =
      templateId === "birthday-wish"
        ? "/birthday/create"
        : `/wedding/create?template=${
            templateId === "luxury-wedding" ? "luxury" : "elegant"
          }`;
    window.location.href = target;
  };

  return (
    <section id="templates" className="py-20 sm:py-28 bg-gradient-to-b from-[#ffffff] via-[#fff8fa] to-[#ffffff] relative overflow-hidden">
      {/* Background Soft Pink Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-gradient-to-b from-[#ffe5ec]/60 to-transparent blur-3xl -z-10"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-white px-4 py-1.5 shadow-xs backdrop-blur-sm mb-4">
            <span className="text-xs text-[#ff3366] animate-heart-beat">♥</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#e11d48]">
              Curated Romantic Suites
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1f1a1c] leading-tight">
            Designed to make their heart{" "}
            <span className="bg-gradient-to-r from-[#e11d48] via-[#ff3366] to-[#ff758f] bg-clip-text text-transparent italic">
              skip a beat.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#524548] leading-relaxed">
            Every template is crafted like a private work of art — interactive,
            deeply personal, and wrapped in warm romantic elegance.
          </p>

          {/* Category Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-[#ff3366] via-[#ff4d6d] to-[#ff758f] text-white shadow-md shadow-pink-500/25 scale-105"
                      : "bg-white border border-pink-200/80 text-[#6b5e62] hover:text-[#ff3366] hover:bg-pink-50/60"
                  )}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Template Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto items-stretch">
          {filteredTemplates.map((template) => {
            const createHref =
              template.id === "birthday-wish"
                ? "/birthday/create"
                : `/wedding/create?template=${
                    template.id === "luxury-wedding" ? "luxury" : "elegant"
                  }`;

            return (
              <article
                key={template.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-pink-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10 hover:border-pink-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Visual Preview Window Header */}
                <div className="relative h-88 overflow-hidden p-4 bg-gradient-to-b from-[#fff5f7] via-[#ffffff] to-[#ffeef2] transition-colors">
                  <div className="absolute inset-0 scale-100 transition-transform duration-500 group-hover:scale-[1.03]">
                    <InvitationPreview
                      variant={template.previewVariant}
                      compact
                    />
                  </div>

                  {/* Badges */}
                  <div className="absolute left-4 top-4 z-20 flex items-center gap-2">
                    <span className="rounded-full px-3 py-1 text-[11px] font-bold shadow-xs backdrop-blur-md uppercase tracking-wider bg-white/95 text-[#e11d48] border border-pink-200">
                      {template.category}
                    </span>
                    {template.id === "birthday-wish" && (
                      <span className="rounded-full bg-gradient-to-r from-[#ff3366] to-[#ff758f] text-white px-2.5 py-0.5 text-[10px] font-bold shadow-xs">
                        Most Popular ♥
                      </span>
                    )}
                  </div>
                </div>

                {/* Editorial Content & Feature Bullets */}
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#1f1a1c] transition-colors group-hover:text-[#ff3366]">
                      {template.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#6b5e62]">
                      {template.detail}
                    </p>

                    {/* Sensory Feature Tags */}
                    <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                      <span className="rounded-full bg-pink-50 px-2.5 py-1 text-[#e11d48] font-semibold border border-pink-100">
                        🎵 Ambient Audio
                      </span>
                      <span className="rounded-full bg-pink-50 px-2.5 py-1 text-[#e11d48] font-semibold border border-pink-100">
                        📸 Photo Gallery
                      </span>
                      {template.capabilities.rsvp && (
                        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[#b45309] font-semibold border border-amber-200/60">
                          📍 Venue &amp; RSVP
                        </span>
                      )}
                      {template.id === "birthday-wish" && (
                        <span className="rounded-full bg-pink-50 px-2.5 py-1 text-[#e11d48] font-semibold border border-pink-100">
                          🕯️ Virtual Candles
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-5 border-t border-pink-100 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleOpenPreview(template)}
                      className="flex-1 rounded-full border border-pink-200 bg-white py-2.5 text-xs font-bold text-[#1f1a1c] transition-all hover:bg-pink-50/60 hover:border-[#ff3366] hover:text-[#ff3366]"
                    >
                      Live Preview 👁️
                    </button>

                    <Link
                      href={createHref}
                      className="flex-1 rounded-full bg-gradient-to-r from-[#ff3366] via-[#ff4d6d] to-[#ff758f] py-2.5 text-center text-xs font-bold text-white shadow-sm shadow-pink-500/20 transition-all hover:shadow-md hover:shadow-pink-500/30 hover:scale-[1.02] active:scale-95"
                    >
                      Personalize ♥
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Helper Note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#6b5e62]">
            Looking for something custom? All themes support your own photos,
            music tracks, custom letter messages, and private WhatsApp links.
          </p>
        </div>
      </div>

      {/* Preview Dialog */}
      <TemplatePreviewDialog
        template={selectedTemplate}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSelect={handleSelectTemplate}
      />
    </section>
  );
}
