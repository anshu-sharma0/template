export type PricingTier = {
  templateId: string;
  name: string;
  amountInPaise: number; // Smallest unit (e.g., 4900 paise = ₹49)
  currency: string;
};

export const PRICING_CONFIG: Record<string, PricingTier> = {
  "birthday-wish": {
    templateId: "birthday-wish",
    name: "Birthday Surprise",
    amountInPaise: 4900, // ₹49
    currency: "INR",
  },
  "elegant-wedding": {
    templateId: "elegant-wedding",
    name: "Elegant Wedding Invitation",
    amountInPaise: 14900, // ₹149
    currency: "INR",
  },
  "luxury-wedding": {
    templateId: "luxury-wedding",
    name: "Luxury Wedding Keepsake",
    amountInPaise: 29900, // ₹299
    currency: "INR",
  },
};

/**
 * Returns the authoritative server-side price in paise for a given templateId.
 */
export function getTemplatePrice(templateId: string): PricingTier {
  const tier = PRICING_CONFIG[templateId];
  if (!tier) {
    // Default fallback tier if unspecified
    return {
      templateId,
      name: "Digital Experience",
      amountInPaise: 9900, // ₹99
      currency: "INR",
    };
  }
  return tier;
}

/**
 * Formats amount in paise to clean INR display string (e.g., 4900 -> "₹49").
 */
export function formatPriceINR(amountInPaise: number): string {
  const rupees = Math.floor(amountInPaise / 100);
  return `₹${rupees}`;
}
