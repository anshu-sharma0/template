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
            className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
              filter === "all"
                ? "bg-[#b05765] text-white shadow-lg shadow-[#b05765]/20 scale-105"
                : "bg-white text-[#6e5d60] border border-[#e8d5cf] hover:bg-[#fff9f6] hover:text-[#2c2224]"
            }`}
          >
            All Collection ({initialTemplates.length})
          </button>
          <button
            onClick={() => setFilter("birthday")}
            className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
              filter === "birthday"
                ? "bg-[#b05765] text-white shadow-lg shadow-[#b05765]/20 scale-105"
                : "bg-white text-[#6e5d60] border border-[#e8d5cf] hover:bg-[#fff9f6] hover:text-[#2c2224]"
            }`}
          >
            🎂 Birthday Surprise
          </button>
          <button
            onClick={() => setFilter("wedding")}
            className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
              filter === "wedding"
                ? "bg-[#b05765] text-white shadow-lg shadow-[#b05765]/20 scale-105"
                : "bg-white text-[#6e5d60] border border-[#e8d5cf] hover:bg-[#fff9f6] hover:text-[#2c2224]"
            }`}
          >
            💍 Wedding Keepsakes
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full max-w-xs">
          <span className="absolute inset-y-0 left-3.5 flex items-center text-[#8e7b7e]">🔍</span>
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-[#e8d5cf] bg-white pl-10 pr-4 py-2 text-xs text-[#2c2224] focus:border-[#b05765] focus:outline-none shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-3.5 flex items-center text-xs text-[#8e7b7e] hover:text-[#2c2224]"
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
                className="bg-white rounded-3xl border border-[#e8d5cf] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                {/* Header Visual Box with Mini Phone Preview */}
                <div
                  className={`p-6 flex flex-col items-center justify-center relative overflow-hidden ${template.theme.background} border-b border-[#e8d5cf]`}
                >
                  {/* Palette Badge */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                    <span className="capitalize text-[10px] font-bold px-3 py-1 rounded-full bg-white/90 text-[#2c2224] backdrop-blur-md shadow-xs border border-white/40">
                      {template.category}
                    </span>

                    <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/40">
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
                      <h3 className="text-2xl font-serif font-bold text-[#2c2224] group-hover:text-[#b05765] transition-colors">
                        {template.name}
                      </h3>
                      <p className="text-xs text-[#8e7b7e] mt-0.5">
                        {template.description}
                      </p>
                    </div>

                    <p className="text-xs text-[#6e5d60] leading-relaxed">
                      {template.detail}
                    </p>

                    {/* Capability Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {template.capabilities.music && (
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#f8eeeb] text-[#8e7b7e] border border-[#eedad5]">
                          🎵 Ambient Music
                        </span>
                      )}
                      {template.capabilities.gallery && (
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#f8eeeb] text-[#8e7b7e] border border-[#eedad5]">
                          📸 Photo Gallery
                        </span>
                      )}
                      {template.capabilities.countdown && (
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#f8eeeb] text-[#8e7b7e] border border-[#eedad5]">
                          ⏳ Live Ticker
                        </span>
                      )}
                      {template.capabilities.story && (
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#f8eeeb] text-[#8e7b7e] border border-[#eedad5]">
                          💍 Couple Story
                        </span>
                      )}
                      {template.capabilities.rsvp && (
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#f8eeeb] text-[#8e7b7e] border border-[#eedad5]">
                          💌 RSVP Section
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[#f3e6e3]">
                    <button
                      onClick={() => setPreviewTemplate(template)}
                      className="flex-1 py-2.5 text-center rounded-xl border border-[#e8d5cf] bg-white text-xs font-semibold text-[#2c2224] hover:bg-[#fff9f6] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      👁️ Quick Preview
                    </button>

                    <Link
                      href={createUrl}
                      className="flex-1 py-2.5 text-center rounded-xl bg-[#b05765] text-white text-xs font-semibold hover:bg-[#964552] transition-colors shadow-sm flex items-center justify-center gap-1.5"
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
              className="rounded-full bg-[#b05765] px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#964552]"
            >
              Clear Search Filters
            </button>
          }
        />
      )}

      {/* Quick Preview Modal using DeviceFramePreview */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl h-[88vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-white/20">
            {/* Modal Header */}
            <div className="h-14 px-6 bg-white border-b border-[#e8d5cf] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-sm font-serif font-bold text-[#b05765]">
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
                  className="px-4 py-1.5 rounded-full bg-[#b05765] text-white text-xs font-semibold hover:bg-[#964552] transition-colors"
                >
                  Use This Template ✨
                </Link>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-neutral-700 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body with Multi-Device Frame View */}
            <div className="flex-1 overflow-y-auto bg-[#110e14] p-4 flex justify-center">
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
