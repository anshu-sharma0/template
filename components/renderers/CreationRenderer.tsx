"use client";

import type { Creation } from "@/lib/creation-types";
import { getTemplate } from "@/lib/template-registry";
import { BirthdayWishTemplate } from "@/components/templates/birthday/BirthdayWishTemplate";
import { ElegantWeddingTemplate } from "@/components/templates/wedding/ElegantWeddingTemplate";
import { LuxuryWeddingTemplate } from "@/components/templates/wedding/LuxuryWeddingTemplate";
import { Button } from "@/components/ui/Button";

type CreationRendererProps = {
  creation: Creation;
  compact?: boolean;
  autoOpen?: boolean;
};

export function CreationRenderer({
  creation,
  compact = false,
  autoOpen = false,
}: CreationRendererProps) {
  const templateConfig = getTemplate(creation.templateId);

  // Graceful Fallback for invalid or missing template
  if (!templateConfig) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center p-6 text-center bg-surface text-text">
        <span className="text-3xl mb-2">✨</span>
        <h3 className="font-display text-2xl font-normal">This design isn&apos;t available right now.</h3>
        <p className="text-xs text-text-muted mt-1 mb-4">
          Please select another design from our template collection.
        </p>
        <Button href="/#templates" size="sm">
          Choose Another Design
        </Button>
      </div>
    );
  }

  // Handle Birthday Creation
  if (creation.type === "birthday") {
    return (
      <BirthdayWishTemplate
        data={creation.data}
        config={templateConfig}
        compact={compact}
        autoOpen={autoOpen}
      />
    );
  }

  // Handle Wedding Creation
  if (creation.type === "wedding") {
    if (creation.templateId === "luxury-wedding") {
      return (
        <LuxuryWeddingTemplate
          data={creation.data}
          config={templateConfig}
          compact={compact}
          autoOpen={autoOpen}
        />
      );
    }

    return (
      <ElegantWeddingTemplate
        data={creation.data}
        config={templateConfig}
        compact={compact}
        autoOpen={autoOpen}
      />
    );
  }

  return null;
}
