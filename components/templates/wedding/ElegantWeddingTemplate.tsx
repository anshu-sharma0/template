"use client";

import type { WeddingInvitationData } from "@/lib/wedding-types";
import type { TemplateConfig } from "@/lib/creation-types";
import { WeddingRenderer } from "@/components/wedding/WeddingRenderer";

type ElegantWeddingTemplateProps = {
  data: WeddingInvitationData;
  config?: TemplateConfig;
  compact?: boolean;
  autoOpen?: boolean;
};

export function ElegantWeddingTemplate({
  data,
  compact = false,
  autoOpen = false,
}: ElegantWeddingTemplateProps) {
  const elegantData = { ...data, template: "elegant" as const };
  return <WeddingRenderer data={elegantData} compact={compact} autoOpen={autoOpen} />;
}
