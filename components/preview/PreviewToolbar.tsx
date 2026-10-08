"use client";

import type { Creation } from "@/lib/creation-types";
import { getTemplatesByType } from "@/lib/template-registry";
import { Sparkle } from "@/components/decorative/Sparkle";
import { Button } from "@/components/ui/Button";

type PreviewToolbarProps = {
  creation: Creation;
  onBackToEdit: () => void;
  onTemplateChange?: (templateId: string) => void;
  onRestartExperience?: () => void;
  onPublishClick?: () => void;
  theme?: "dark" | "light";
};

export function PreviewToolbar({
  creation,
  onBackToEdit,
  onTemplateChange,
  onRestartExperience,
  onPublishClick,
  theme = "dark",
}: PreviewToolbarProps) {
  const templates = getTemplatesByType(creation.type);
  const isLight = theme === "light";

  return (
    <header
      className={`sticky top-0 z-40 flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 backdrop-blur-md gap-4 ${isLight
          ? "border-b border-pink-200/80 bg-white/95 text-[#1f1a1c] shadow-xs"
          : "border-b border-white/10 bg-charcoal/95 text-white"
        }`}
    >
      {/* Back & Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBackToEdit}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition ${isLight
              ? "border border-pink-200 bg-pink-50/70 text-[#e11d48] hover:bg-pink-100"
              : "border border-white/20 bg-white/10 text-white hover:bg-white/20"
            }`}
        >
          <span>← Back to Editing</span>
        </button>

        <span className={`hidden sm:inline text-xs ${isLight ? "text-pink-300" : "text-white/50"}`}>
          |
        </span>

        <div
          className={`hidden sm:flex items-center gap-2 text-xs font-semibold ${isLight ? "text-[#e11d48]" : "text-accent"
            }`}
        >
          <Sparkle className="text-xs" />
          <span>Recipient Preview Mode</span>
        </div>
      </div>

      {/* Controls: Template Switcher & Actions */}
      <div className="flex items-center gap-3">
        {/* Template Switcher if multiple templates exist */}
        {templates.length > 1 && onTemplateChange && (
          <div
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs ${isLight
                ? "border border-pink-200 bg-pink-50/50 text-[#1f1a1c]"
                : "border border-white/20 bg-white/10 text-white"
              }`}
          >
            <span className={`hidden sm:inline ${isLight ? "text-[#6b5e62]" : "text-white/60"}`}>
              Design:
            </span>
            <select
              value={creation.templateId}
              onChange={(e) => onTemplateChange(e.target.value)}
              className={`bg-transparent font-semibold focus:outline-none cursor-pointer ${isLight ? "text-[#1f1a1c]" : "text-white"
                }`}
            >
              {templates.map((tpl) => (
                <option
                  key={tpl.id}
                  value={tpl.id}
                  className={isLight ? "bg-white text-[#1f1a1c]" : "bg-charcoal text-white"}
                >
                  {tpl.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Restart Experience Action */}
        {onRestartExperience && (
          <button
            type="button"
            onClick={onRestartExperience}
            title="Replay opening envelope reveal"
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${isLight
                ? "border border-pink-200 bg-white text-[#e11d48] hover:bg-pink-50 shadow-2xs"
                : "border border-white/20 bg-white/10 text-white hover:bg-white/20"
              }`}
          >
            Restart Experience ↺
          </button>
        )}

        {/* Continue Action */}
        <Button onClick={onPublishClick} size="sm" className="shadow-lift bg-linear-to-r from-[#ff3366] to-[#ff758f] text-white">
          <span>Continue</span>
        </Button>
      </div>
    </header>
  );
}
