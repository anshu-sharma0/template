"use client";

import type { BirthdayWishData } from "@/lib/birthday-types";
import type { TemplateConfig } from "@/lib/creation-types";
import { BirthdayWishRenderer } from "@/components/birthday/BirthdayWishRenderer";

type BirthdayWishTemplateProps = {
  data: BirthdayWishData;
  config?: TemplateConfig;
  compact?: boolean;
  autoOpen?: boolean;
};

export function BirthdayWishTemplate({
  data,
  compact = false,
  autoOpen = false,
}: BirthdayWishTemplateProps) {
  return <BirthdayWishRenderer data={data} compact={compact} autoOpen={autoOpen} />;
}
