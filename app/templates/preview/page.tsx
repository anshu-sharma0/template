"use client";

import { useState } from "react";
import { getAllTemplates } from "@/lib/template-registry";
import type { Creation, TemplateConfig } from "@/lib/creation-types";
import { DEFAULT_BIRTHDAY_DATA } from "@/lib/birthday-data";
import { DEFAULT_WEDDING_DATA } from "@/lib/wedding-data";
import { CreationRenderer } from "@/components/renderers/CreationRenderer";
import { PhonePreview } from "@/components/marketing/PhonePreview";

export default function DevelopmentTemplatePreviewPage() {
  const templates = getAllTemplates();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("birthday-wish");

  const currentTemplate: TemplateConfig =
    templates.find((t) => t.id === selectedTemplateId) || templates[0];

  const currentCreation: Creation =
    currentTemplate.type === "birthday"
      ? {
          type: "birthday",
          templateId: currentTemplate.id,
          data: DEFAULT_BIRTHDAY_DATA,
        }
      : {
          type: "wedding",
          templateId: currentTemplate.id,
          data: {
            ...DEFAULT_WEDDING_DATA,
            template: currentTemplate.id === "luxury-wedding" ? "luxury" : "elegant",
          },
        };

  return (
    <div className="flex min-h-screen flex-col bg-charcoal text-white">
      {/* Dev Header Control Bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-charcoal/90 px-6 py-4 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            Development Template Tester
          </span>
          <h1 className="font-display text-2xl font-normal text-white">
            {currentTemplate.name} ({currentTemplate.type})
          </h1>
        </div>

        {/* Template Selector Tabs */}
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 p-1.5">
          {templates.map((tpl) => {
            const isActive = tpl.id === selectedTemplateId;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => setSelectedTemplateId(tpl.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  isActive
                    ? "bg-white text-charcoal shadow-sm"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {tpl.name}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Preview Workspace */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full grid gap-10 lg:grid-cols-[1fr_22rem] items-start">
        {/* Template Metadata & Configuration Summary */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/15 bg-white/5 p-6 space-y-4">
            <h2 className="font-display text-3xl font-normal text-accent">
              Template Metadata
            </h2>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-white/50 uppercase font-semibold">ID</p>
                <p className="font-mono text-white mt-0.5">{currentTemplate.id}</p>
              </div>
              <div>
                <p className="text-white/50 uppercase font-semibold">Type</p>
                <p className="font-mono text-white mt-0.5">{currentTemplate.type}</p>
              </div>
              <div>
                <p className="text-white/50 uppercase font-semibold">Palette</p>
                <p className="font-mono text-white mt-0.5">{currentTemplate.theme.palette}</p>
              </div>
              <div>
                <p className="text-white/50 uppercase font-semibold">Sections</p>
                <p className="font-mono text-white mt-0.5">{currentTemplate.sections.length} sections</p>
              </div>
            </div>

            <div>
              <p className="text-white/50 uppercase font-semibold text-xs mb-2">Enabled Capabilities</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {Object.entries(currentTemplate.capabilities).map(([cap, enabled]) => (
                  <span
                    key={cap}
                    className={`rounded-full px-3 py-1 font-mono ${
                      enabled
                        ? "bg-accent/20 text-accent border border-accent/40"
                        : "bg-white/5 text-white/40"
                    }`}
                  >
                    {cap}: {enabled ? "true" : "false"}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Device Preview */}
        <div className="flex flex-col items-center space-y-3">
          <p className="text-xs uppercase tracking-widest font-semibold text-white/50">
            Interactive Phone Preview
          </p>
          <PhonePreview size="lg" className="shadow-phone">
            <CreationRenderer creation={currentCreation} autoOpen />
          </PhonePreview>
        </div>
      </main>
    </div>
  );
}
