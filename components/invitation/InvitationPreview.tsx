import { BirthdayPreview } from "./BirthdayPreview";
import { WeddingPreview } from "./WeddingPreview";

export type InvitationPreviewVariant = "birthday" | "wedding" | "luxuryWedding";

type InvitationPreviewProps = {
  variant: InvitationPreviewVariant;
  compact?: boolean;
};

export function InvitationPreview({ variant, compact = false }: InvitationPreviewProps) {
  if (variant === "birthday") {
    return <BirthdayPreview compact={compact} />;
  }

  if (variant === "luxuryWedding") {
    return <WeddingPreview tone="luxury" compact={compact} couple="Arjun & Meera" date="02.02.2027" />;
  }

  return <WeddingPreview compact={compact} />;
}
