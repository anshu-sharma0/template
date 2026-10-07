export type PricingTier = {
  templateId: string;
  name: string;
  amountInPaise: number; // Smallest unit (e.g., 19900 paise = ₹199)
  currency: string;
  includes: string[];
};

export const PRICING_CONFIG: Record<string, PricingTier> = {
  "birthday-wish": {
    templateId: "birthday-wish",
    name: "Digital Birthday Wish",
    amountInPaise: 19900, // ₹199
    currency: "INR",
    includes: [
      "Personalized design & theme",
      "Custom recipient name & message",
      "Memory photo frames",
      "Background music & soundscapes",
      "Private shareable link",
      "Lifetime access",
    ],
  },
  "elegant-wedding": {
    templateId: "elegant-wedding",
    name: "Digital Wedding Invitation",
    amountInPaise: 49900, // ₹499
    currency: "INR",
    includes: [
      "Personalized wedding invitation",
      "Couple story & family details",
      "Multi-day function schedule",
      "Google Maps venue navigation",
      "Photo gallery & background music",
      "Mobile-friendly design & instant link",
    ],
  },
  "luxury-wedding": {
    templateId: "luxury-wedding",
    name: "Luxury Wedding Invitation",
    amountInPaise: 49900, // ₹499
    currency: "INR",
    includes: [
      "Editorial dark-mode gold design",
      "Couple story & family details",
      "Multi-day function schedule",
      "Google Maps venue navigation",
      "Photo gallery & background music",
      "Mobile-friendly design & instant link",
    ],
  },
};

/**
 * Returns the authoritative server-side price in paise for a given templateId.
 */
export function getTemplatePrice(templateId: string): PricingTier {
  const tier = PRICING_CONFIG[templateId];
  if (!tier) {
    return {
      templateId,
      name: "Digital Experience",
      amountInPaise: 19900, // ₹199
      currency: "INR",
      includes: [
        "Personalized design",
        "Custom message",
        "Shareable link",
        "Lifetime access",
      ],
    };
  }
  return tier;
}

/**
 * Formats amount in paise to clean INR display string (e.g., 19900 -> "₹199").
 */
export function formatPriceINR(amountInPaise: number): string {
  const rupees = Math.floor(amountInPaise / 100);
  return `₹${rupees}`;
}
