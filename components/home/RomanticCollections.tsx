"use client";

import { useState } from "react";
import Link from "next/link";
import { getAllTemplates } from "@/lib/template-registry";
import type { TemplateConfig } from "@/lib/creation-types";
import { TemplatePreviewDialog } from "@/components/marketing/TemplatePreviewDialog";
import { InvitationPreview } from "@/components/invitation/InvitationPreview";
import { Badge } from "@/components/ui/Badge";
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
    if (selectedCategory === "love") return true; // All templates can celebrate love & anniversaries
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
    <section id="templates" className="py-20 sm:py-28 bg-[#fffaf5] relative overflow-hidden">
      {/* Background Soft Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-gradient-to-b from-[#fceae6]/50 to-transparent blur-3xl -z-10"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#eedad5] bg-white px-4 py-1.5 shadow-2xs backdrop-blur-sm mb-4">
            <span className="text-xs text-[#b05765]">♥</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#873d4d]">
              Curated Romantic Suites
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2c2224] leading-tight">
            Designed to make their heart skip a beat.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#6e5d60] leading-relaxed">
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
                    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-[#873d4d] text-white shadow-md shadow-[#873d4d]/20 scale-105"
                      : "bg-white border border-[#e8d5cf] text-[#6e5d60] hover:text-[#2c2224] hover:bg-[#fff5ee] hover:border-[#b05765]"
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
            const isDarkTheme = template.previewVariant === "luxuryWedding";
            const createHref =
              template.id === "birthday-wish"
                ? "/birthday/create"
                : `/wedding/create?template=${
                    template.id === "luxury-wedding" ? "luxury" : "elegant"
                  }`;

            return (
              <article
                key={template.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-[#ecdcd5] bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#b05765]/40 hover:-translate-y-1 overflow-hidden"
              >
                {/* Visual Preview Window Header */}
                <div
                  className={cn(
                    "relative h-88 overflow-hidden p-4 transition-colors",
                    isDarkTheme
                      ? "bg-gradient-to-b from-[#241a1d] to-[#1a1415]"
                      : "bg-gradient-to-b from-[#fff5f2] to-[#faeee7]"
                  )}
                >
                  <div className="absolute inset-0 scale-100 transition-transform duration-500 group-hover:scale-[1.03]">
                    <InvitationPreview
                      variant={template.previewVariant}
                      compact
                    />
                  </div>

                  {/* Badges */}
                  <div className="absolute left-4 top-4 z-20 flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-[11px] font-bold shadow-xs backdrop-blur-md uppercase tracking-wider",
                        isDarkTheme
                          ? "bg-black/60 text-[#dfc287] border border-[#dfc287]/30"
                          : "bg-white/90 text-[#873d4d] border border-[#ecdcd5]"
                      )}
                    >
                      {template.category}
                    </span>
                    {template.id === "birthday-wish" && (
                      <span className="rounded-full bg-[#873d4d] text-white px-2.5 py-0.5 text-[10px] font-semibold">
                        Most Popular ♥
                      </span>
                    )}
                  </div>
                </div>

                {/* Editorial Content & Feature Bullets */}
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#2c2224] transition-colors group-hover:text-[#873d4d]">
                      {template.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#6e5d60]">
                      {template.detail}
                    </p>

                    {/* Sensory Feature Tags */}
                    <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                      <span className="rounded-full bg-[#fff2ec] px-2.5 py-1 text-[#873d4d] font-medium border border-[#eedad5]">
                        🎵 Background Audio
                      </span>
                      <span className="rounded-full bg-[#fff2ec] px-2.5 py-1 text-[#873d4d] font-medium border border-[#eedad5]">
                        📸 Photo Gallery
                      </span>
                      {template.capabilities.rsvp && (
                        <span className="rounded-full bg-[#fdf5e6] px-2.5 py-1 text-[#8a6934] font-medium border border-[#fae5be]">
                          📍 Venue &amp; RSVP
                        </span>
                      )}
                      {template.id === "birthday-wish" && (
                        <span className="rounded-full bg-[#fff2ec] px-2.5 py-1 text-[#873d4d] font-medium border border-[#eedad5]">
                          🕯️ Virtual Candles
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-5 border-t border-[#f1ded8] flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleOpenPreview(template)}
                      className="flex-1 rounded-full border border-[#eedad5] bg-[#fffaf7] py-2.5 text-xs font-semibold text-[#2c2224] transition-all hover:bg-white hover:border-[#873d4d] hover:text-[#873d4d]"
                    >
                      Live Preview 👁️
                    </button>

                    <Link
                      href={createHref}
                      className="flex-1 rounded-full bg-[#873d4d] py-2.5 text-center text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#6b1d2f] hover:shadow-md"
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
          <p className="text-xs text-[#7c6b67]">
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
