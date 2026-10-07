import type { BirthdayWishData } from "./birthday-types";
import type { WeddingInvitationData } from "./wedding-types";
export type CreationType = "birthday" | "wedding";

export type TemplateCapabilities = {
  music: boolean;
  gallery: boolean;
  countdown: boolean;
  rsvp: boolean;
  story: boolean;
};

export type TemplateTheme = {
  palette: "rose" | "champagne" | "luxury";
  background: string;
  primary: string;
  accent: string;
  headingFont: string;
};

export type TemplateConfig = {
  id: string; // "birthday-wish" | "elegant-wedding" | "luxury-wedding"
  name: string;
  type: CreationType;
  category: string;
  description: string;
  detail?: string;
  theme: TemplateTheme;
  sections: string[];
  capabilities: TemplateCapabilities;
  previewVariant: "birthday" | "wedding" | "luxuryWedding";
};

export type Creation =
  | {
      type: "birthday";
      templateId: string;
      data: BirthdayWishData;
    }
  | {
      type: "wedding";
      templateId: string;
      data: WeddingInvitationData;
    };
