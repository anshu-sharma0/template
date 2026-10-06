"use client";

import type { WeddingInvitationData } from "@/lib/wedding-types";
import type { TemplateConfig } from "@/lib/creation-types";
import { WeddingRenderer } from "@/components/wedding/WeddingRenderer";

type LuxuryWeddingTemplateProps = {
  data: WeddingInvitationData;
  config?: TemplateConfig;
  compact?: boolean;
  autoOpen?: boolean;
};

export function LuxuryWeddingTemplate({
  data,
  compact = false,
  autoOpen = false,
}: LuxuryWeddingTemplateProps) {
  const luxuryData = { ...data, template: "luxury" as const };
  return <WeddingRenderer data={luxuryData} compact={compact} autoOpen={autoOpen} />;
}
