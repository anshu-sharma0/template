import type { TemplateConfig, CreationType } from "./creation-types";

export const TEMPLATE_REGISTRY: Record<string, TemplateConfig> = {
  "birthday-wish": {
    id: "birthday-wish",
    name: "Birthday Wish",
    type: "birthday",
    category: "Birthday",
    description: "Romantic, warm and personal.",
    detail:
      "A personalized digital birthday surprise with custom photos, heartfelt notes, memory frame, and ambient music.",
    theme: {
      palette: "rose",
      background: "bg-[linear-gradient(180deg,#fffaf5,#fceae6)]",
      primary: "#b05765",
      accent: "#c6a15b",
      headingFont: "Georgia, serif",
    },
    sections: [
      "opening",
      "birthdayHero",
      "mainPhoto",
      "message",
      "memories",
      "music",
      "closing",
    ],
    capabilities: {
      music: true,
      gallery: true,
      countdown: false,
      rsvp: false,
      story: false,
    },
    previewVariant: "birthday",
  },

  "elegant-wedding": {
    id: "elegant-wedding",
    name: "Elegant Wedding",
    type: "wedding",
    category: "Wedding",
    description: "Timeless, graceful and refined.",
    detail:
      "A graceful digital wedding invitation featuring delicate floral motifs, couple story, event schedule and RSVP info.",
    theme: {
      palette: "champagne",
      background: "bg-[linear-gradient(180deg,#fffdf9,#f5ead7)]",
      primary: "#b05765",
      accent: "#c6a15b",
      headingFont: "Georgia, serif",
    },
    sections: [
      "opening",
      "hero",
      "message",
      "countdown",
      "story",
      "events",
      "venue",
      "gallery",
      "rsvp",
      "music",
      "closing",
    ],
    capabilities: {
      music: true,
      gallery: true,
      countdown: true,
      rsvp: true,
      story: true,
    },
    previewVariant: "wedding",
  },

  "luxury-wedding": {
    id: "luxury-wedding",
    name: "Luxury Wedding",
    type: "wedding",
    category: "Wedding",
    description: "Sophisticated, dramatic and unforgettable.",
    detail:
      "An opulent champagne rose luxury wedding keepsake with gold accents, editorial photography presentation and event details.",
    theme: {
      palette: "luxury",
      background: "bg-[linear-gradient(180deg,#191514,#3d282c)]",
      primary: "#c6a15b",
      accent: "#8a6934",
      headingFont: "Georgia, serif",
    },
    sections: [
      "opening",
      "hero",
      "message",
      "countdown",
      "story",
      "events",
      "venue",
      "gallery",
      "rsvp",
      "music",
      "closing",
    ],
    capabilities: {
      music: true,
      gallery: true,
      countdown: true,
      rsvp: true,
      story: true,
    },
    previewVariant: "luxuryWedding",
  },
};

export function getTemplate(id: string): TemplateConfig | undefined {
  return TEMPLATE_REGISTRY[id];
}

export function getTemplatesByType(type: CreationType): TemplateConfig[] {
  return Object.values(TEMPLATE_REGISTRY).filter((t) => t.type === type);
}

export function getAllTemplates(): TemplateConfig[] {
  return Object.values(TEMPLATE_REGISTRY);
}

export function getDefaultTemplate(type: CreationType): TemplateConfig {
  if (type === "birthday") return TEMPLATE_REGISTRY["birthday-wish"];
  return TEMPLATE_REGISTRY["elegant-wedding"];
}
