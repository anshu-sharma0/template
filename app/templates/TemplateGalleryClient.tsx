"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { TemplateConfig } from "@/lib/creation-types";
import { CreationRenderer } from "@/components/renderers/CreationRenderer";
import { DeviceFramePreview } from "@/components/interactive/DeviceFramePreview";
import { EmptyState } from "@/components/ui/EmptyState";
import { DEFAULT_BIRTHDAY_DATA } from "@/lib/birthday-data";
import { DEFAULT_WEDDING_DATA } from "@/lib/wedding-data";

interface TemplateGalleryClientProps {
  initialTemplates: TemplateConfig[];
}

export default function TemplateGalleryClient({
  initialTemplates,
}: TemplateGalleryClientProps) {
  const [filter, setFilter] = useState<"all" | "birthday" | "wedding">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState<TemplateConfig | null>(null);

  const filteredTemplates = initialTemplates.filter((t) => {
    const matchesFilter = filter === "all" || t.type === filter;
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getSampleCreationForTemplate = (template: TemplateConfig) => {
    if (template.type === "birthday") {
      return {
        type: "birthday" as const,
        templateId: template.id,
        data: DEFAULT_BIRTHDAY_DATA,
      };
    }
    return {
      type: "wedding" as const,
      templateId: template.id,
      data: DEFAULT_WEDDING_DATA,
    };
  };

  return (
    <div className="space-y-10">
      {/* Category Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
              filter === "all"
                ? "bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] text-white shadow-md shadow-pink-500/25 scale-105"
                : "bg-white text-[var(--love-text-body)] border border-[var(--love-border)] hover:bg-[#fff5f8] hover:text-[var(--love-crimson)]"
            }`}
          >
            All Collection ({initialTemplates.length})
          </button>
          <button
            onClick={() => setFilter("birthday")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
              filter === "birthday"
                ? "bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] text-white shadow-md shadow-pink-500/25 scale-105"
                : "bg-white text-[var(--love-text-body)] border border-[var(--love-border)] hover:bg-[#fff5f8] hover:text-[var(--love-crimson)]"
            }`}
          >
            🎂 Birthday Surprise
          </button>
          <button
            onClick={() => setFilter("wedding")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
              filter === "wedding"
                ? "bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] text-white shadow-md shadow-pink-500/25 scale-105"
                : "bg-white text-[var(--love-text-body)] border border-[var(--love-border)] hover:bg-[#fff5f8] hover:text-[var(--love-crimson)]"
            }`}
          >
            💍 Wedding Keepsakes
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full max-w-xs">
          <span className="absolute inset-y-0 left-3.5 flex items-center text-[var(--love-text-muted)]">🔍</span>
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-[var(--love-border)] bg-white pl-10 pr-4 py-2.5 text-xs text-[var(--love-text-heading)] focus:border-[var(--love-crimson)] focus:outline-none shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-3.5 flex items-center text-xs text-[var(--love-text-muted)] hover:text-[var(--love-text-heading)]"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Grid of Templates or Empty State */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => {
            const createUrl =
              template.type === "birthday"
                ? "/birthday/create"
                : template.id === "luxury-wedding"
                ? "/wedding/create?template=luxury"
                : "/wedding/create";

            const sampleCreation = getSampleCreationForTemplate(template);

            return (
              <div
                key={template.id}
                className="bg-white rounded-3xl border border-[var(--love-border)] overflow-hidden shadow-lg shadow-pink-500/5 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                {/* Header Visual Box with Mini Phone Preview */}
                <div
                  className={`p-6 flex flex-col items-center justify-center relative overflow-hidden ${template.theme.background} border-b border-[var(--love-border)]`}
                >
                  {/* Palette Badge */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                    <span className="capitalize text-[10px] font-bold px-3 py-1 rounded-full bg-white/95 text-[var(--love-text-heading)] backdrop-blur-md shadow-xs border border-white/60">
                      {template.category}
                    </span>

                    <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/60">
                      <span
                        className="size-3 rounded-full border border-white/60 shadow-xs"
                        style={{ backgroundColor: template.theme.primary }}
                        title="Primary Theme Color"
                      />
                      <span
                        className="size-3 rounded-full border border-white/60 shadow-xs"
                        style={{ backgroundColor: template.theme.accent }}
                        title="Accent Theme Color"
                      />
                    </div>
                  </div>

                  {/* Mini Device Mockup Container */}
                  <div className="pt-8 pb-2 transition-transform duration-500 group-hover:scale-105">
                    <div className="w-[180px] h-[240px] rounded-2xl overflow-hidden shadow-phone border-4 border-[#2c2224] bg-white relative">
                      <div className="absolute top-0 inset-x-0 h-3 bg-[#2c2224] z-20 flex justify-center">
                        <div className="w-10 h-1 bg-black rounded-b-full" />
                      </div>
                      <div className="w-full h-full overflow-hidden text-[9px] pointer-events-none scale-75 origin-top-left w-[133%] h-[133%] pt-2">
                        <CreationRenderer creation={sampleCreation} compact autoOpen={false} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="p-6 space-y-6 flex-1 flex flex-col justify-between bg-white">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-[var(--love-text-heading)] group-hover:text-[var(--love-crimson)] transition-colors">
                        {template.name}
                      </h3>
                      <p className="text-xs text-[var(--love-text-muted)] mt-0.5">
                        {template.description}
                      </p>
                    </div>

                    <p className="text-xs text-[var(--love-text-body)] leading-relaxed">
                      {template.detail}
                    </p>

                    {/* Capability Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {template.capabilities.music && (
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[var(--love-surface-blush)] text-[var(--love-crimson)] border border-[var(--love-border)]">
                          🎵 Ambient Music
                        </span>
                      )}
                      {template.capabilities.gallery && (
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[var(--love-surface-blush)] text-[var(--love-crimson)] border border-[var(--love-border)]">
                          📸 Photo Gallery
                        </span>
                      )}
                      {template.capabilities.countdown && (
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[var(--love-surface-blush)] text-[var(--love-crimson)] border border-[var(--love-border)]">
                          ⏳ Live Ticker
                        </span>
                      )}
                      {template.capabilities.story && (
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[var(--love-surface-blush)] text-[var(--love-crimson)] border border-[var(--love-border)]">
                          💍 Couple Story
                        </span>
                      )}
                      {template.capabilities.rsvp && (
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[var(--love-surface-blush)] text-[var(--love-crimson)] border border-[var(--love-border)]">
                          💌 RSVP Section
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[var(--love-border)]">
                    <button
                      onClick={() => setPreviewTemplate(template)}
                      className="flex-1 py-2.5 text-center rounded-xl border border-[var(--love-border)] bg-white text-xs font-bold text-[var(--love-text-heading)] hover:bg-[#fff5f8] hover:text-[var(--love-crimson)] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      👁️ Quick Preview
                    </button>

                    <Link
                      href={createUrl}
                      className="flex-1 py-2.5 text-center rounded-xl bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] text-white text-xs font-bold hover:shadow-md hover:scale-[1.02] transition-all shadow-xs flex items-center justify-center gap-1.5"
                    >
                      ✨ Customize
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon="🎨"
          title="No templates found"
          description="We couldn't find any design matching your search criteria. Try clearing search filters."
          action={
            <button
              onClick={() => {
                setFilter("all");
                setSearchQuery("");
              }}
              className="rounded-full bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] px-5 py-2 text-xs font-bold text-white shadow-love-lift hover:opacity-95 cursor-pointer"
            >
              Clear Search Filters
            </button>
          }
        />
      )}

      {/* Quick Preview Modal using DeviceFramePreview */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl h-[88vh] rounded-3xl overflow-hidden shadow-love-card flex flex-col border border-[var(--love-border)]">
            {/* Modal Header */}
            <div className="h-14 px-6 bg-white border-b border-[var(--love-border)] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-sm font-serif font-bold text-[var(--love-crimson)]">
                  {previewTemplate.name} — Interactive Viewport Preview
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={
                    previewTemplate.type === "birthday"
                      ? "/birthday/create"
                      : previewTemplate.id === "luxury-wedding"
                      ? "/wedding/create?template=luxury"
                      : "/wedding/create"
                  }
                  className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] text-white text-xs font-semibold shadow-love-lift hover:opacity-95 transition-all"
                >
                  Use This Template ✨
                </Link>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="px-3.5 py-1.5 rounded-full bg-[var(--love-surface-blush)] hover:bg-[var(--love-surface-rose)] text-xs font-bold text-[var(--love-text-heading)] border border-[var(--love-border)] transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body with Multi-Device Frame View */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#fffbf8] via-[#fff5f7] to-[#fff0f3] p-4 flex justify-center">
              <DeviceFramePreview defaultDevice="mobile" title={previewTemplate.name}>
                <CreationRenderer
                  creation={getSampleCreationForTemplate(previewTemplate)}
                  autoOpen
                />
              </DeviceFramePreview>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
