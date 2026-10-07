"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { TemplateConfig } from "@/lib/creation-types";

interface TemplateGalleryClientProps {
  initialTemplates: TemplateConfig[];
}

export default function TemplateGalleryClient({
  initialTemplates,
}: TemplateGalleryClientProps) {
  const [filter, setFilter] = useState<"all" | "birthday" | "wedding">("all");

  const filteredTemplates = initialTemplates.filter((t) => {
    if (filter === "all") return true;
    return t.type === filter;
  });

  return (
    <div className="space-y-8">
      {/* Category Filter Tabs */}
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
            filter === "all"
              ? "bg-[#b05765] text-white shadow-md"
              : "bg-white text-[#6e5d60] border border-[#e8d5cf] hover:bg-[#fff9f6]"
          }`}
        >
          All Designs ({initialTemplates.length})
        </button>
        <button
          onClick={() => setFilter("birthday")}
          className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
            filter === "birthday"
              ? "bg-[#b05765] text-white shadow-md"
              : "bg-white text-[#6e5d60] border border-[#e8d5cf] hover:bg-[#fff9f6]"
          }`}
        >
          🎂 Birthday Surprise
        </button>
        <button
          onClick={() => setFilter("wedding")}
          className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
            filter === "wedding"
              ? "bg-[#b05765] text-white shadow-md"
              : "bg-white text-[#6e5d60] border border-[#e8d5cf] hover:bg-[#fff9f6]"
          }`}
        >
          💍 Wedding Invitations
        </button>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredTemplates.map((template) => {
          const createUrl =
            template.type === "birthday"
              ? "/birthday/create"
              : template.id === "luxury-wedding"
              ? "/wedding/create?template=luxury"
              : "/wedding/create";

          const previewUrl =
            template.type === "birthday"
              ? "/birthday/preview"
              : template.id === "luxury-wedding"
              ? "/wedding/preview?template=luxury"
              : "/wedding/preview";

          return (
            <div
              key={template.id}
              className="bg-white rounded-3xl border border-[#e8d5cf] overflow-hidden shadow-lg flex flex-col justify-between hover:shadow-2xl transition-all group"
            >
              {/* Top Banner / Preview Card */}
              <div
                className={`h-48 p-6 flex flex-col justify-between relative ${template.theme.background}`}
              >
                <div className="flex justify-between items-start">
                  <span className="capitalize text-[11px] font-bold px-3 py-1 rounded-full bg-white/80 text-[#2c2224] backdrop-blur-md shadow-xs">
                    {template.category}
                  </span>
                  <span
                    className="w-4 h-4 rounded-full border border-white/50 shadow-xs"
                    style={{ backgroundColor: template.theme.primary }}
                    title={`Theme Primary Color: ${template.theme.primary}`}
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#2c2224] group-hover:text-[#b05765] transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-xs text-[#6e5d60] mt-1 line-clamp-1">
                    {template.description}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="text-xs text-[#6e5d60] leading-relaxed">
                    {template.detail}
                  </p>

                  {/* Capability Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {template.capabilities.music && (
                      <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-[#f8eeeb] text-[#8e7b7e] border border-[#eedad5]">
                        🎵 Background Music
                      </span>
                    )}
                    {template.capabilities.gallery && (
                      <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-[#f8eeeb] text-[#8e7b7e] border border-[#eedad5]">
                        📸 Photo Gallery
                      </span>
                    )}
                    {template.capabilities.countdown && (
                      <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-[#f8eeeb] text-[#8e7b7e] border border-[#eedad5]">
                        ⏳ Event Countdown
                      </span>
                    )}
                    {template.capabilities.story && (
                      <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-[#f8eeeb] text-[#8e7b7e] border border-[#eedad5]">
                        💍 Couple Story
                      </span>
                    )}
                    {template.capabilities.rsvp && (
                      <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-[#f8eeeb] text-[#8e7b7e] border border-[#eedad5]">
                        💌 RSVP Section
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#f3e6e3]">
                  <Link
                    href={previewUrl}
                    className="flex-1 py-2.5 text-center rounded-xl border border-[#e8d5cf] bg-white text-xs font-semibold text-[#2c2224] hover:bg-[#fff9f6] transition-colors"
                  >
                    👁️ Preview
                  </Link>

                  <Link
                    href={createUrl}
                    className="flex-1 py-2.5 text-center rounded-xl bg-[#b05765] text-white text-xs font-semibold hover:bg-[#964552] transition-colors shadow-sm"
                  >
                    ✨ Customize
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
