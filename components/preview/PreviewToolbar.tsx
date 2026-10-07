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
};

export function PreviewToolbar({
  creation,
  onBackToEdit,
  onTemplateChange,
  onRestartExperience,
  onPublishClick,
}: PreviewToolbarProps) {
  const templates = getTemplatesByType(creation.type);

  return (
    <header className="sticky top-0 z-40 flex flex-wrap items-center justify-between border-b border-white/10 bg-charcoal/95 px-4 sm:px-6 py-3.5 text-white backdrop-blur-md gap-4">
      {/* Back & Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBackToEdit}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
        >
          <span>← Back to Editing</span>
        </button>

        <span className="hidden sm:inline text-xs text-white/50">|</span>

        <div className="hidden sm:flex items-center gap-2 text-xs text-accent font-semibold">
          <Sparkle className="text-xs" />
          <span>Recipient Preview Mode</span>
        </div>
      </div>

      {/* Controls: Template Switcher & Actions */}
      <div className="flex items-center gap-3">
        {/* Template Switcher if multiple templates exist */}
        {templates.length > 1 && onTemplateChange && (
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs">
            <span className="text-white/60 hidden sm:inline">Design:</span>
            <select
              value={creation.templateId}
              onChange={(e) => onTemplateChange(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
            >
              {templates.map((tpl) => (
                <option key={tpl.id} value={tpl.id} className="bg-charcoal text-white">
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
            className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20"
          >
            Restart Experience ↺
          </button>
        )}

        {/* Continue Action */}
        <Button onClick={onPublishClick} size="sm" className="shadow-lift">
          <span>Continue</span>
        </Button>
      </div>
    </header>
  );
}
