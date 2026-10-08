export const navItems = [
  { label: "Create", href: "#occasions" },
  { label: "Designs", href: "#templates" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export const occasions = [
  {
    label: "Birthday Wish",
    title: "A birthday message they'll want to keep.",
    description:
      "Turn your words, memories and photos into a beautiful digital surprise.",
    cta: "Create a Birthday Wish",
    href: "#templates",
    theme: "birthday" as const,
    previewVariant: "birthday" as const,
  },
  {
    label: "Wedding Invitation",
    title: "Invite them beautifully.",
    description:
      "Share your wedding day with a digital invitation designed to feel as special as the celebration itself.",
    cta: "Create a Wedding Invitation",
    href: "#templates",
    theme: "wedding" as const,
    previewVariant: "wedding" as const,
  },
];

export const templates = [
  {
    id: "birthday-wish",
    name: "Birthday Wish",
    category: "Birthday",
    description: "Romantic, warm and personal.",
    detail: "A personalized digital birthday surprise with custom photos, heartfelt notes, memory frame, and ambient music.",
    cta: "Preview Design",
    href: "#templates",
    preview: "birthday" as const,
  },
  {
    id: "elegant-wedding",
    name: "Elegant Wedding",
    category: "Wedding",
    description: "Timeless, graceful and refined.",
    detail: "A graceful digital wedding invitation featuring delicate floral motifs, couple story, event schedule and RSVP info.",
    cta: "Preview Design",
    href: "#templates",
    preview: "wedding" as const,
  },
  {
    id: "luxury-wedding",
    name: "Luxury Wedding",
    category: "Wedding",
    description: "Sophisticated, dramatic and unforgettable.",
    detail: "An opulent champagne rose luxury wedding keepsake with gold accents, editorial photography presentation and event details.",
    cta: "Preview Design",
    href: "#templates",
    preview: "luxuryWedding" as const,
  },
];

export const steps = [
  {
    number: "01",
    title: "Choose",
    description: "Pick a beautiful design for your moment.",
  },
  {
    number: "02",
    title: "Personalize",
    description: "Add names, photos, messages and details.",
  },
  {
    number: "03",
    title: "Preview",
    description: "See exactly how your creation will feel before sharing.",
  },
  {
    number: "04",
    title: "Share",
    description: "Turn your creation into a beautiful private digital experience.",
  },
];

export const featureHighlights = [
  {
    title: "Personal",
    description: "Made around your words, memories and people.",
  },
  {
    title: "Beautiful",
    description: "Thoughtfully designed instead of looking like a generic template.",
  },
  {
    title: "Interactive",
    description: "More than a static card — something they can experience.",
  },
  {
    title: "Shareable",
    description: "Easy to send privately through WhatsApp or a link.",
  },
];

export const testimonials = [
  {
    quote: "It felt like giving them a real gift, not just sending another message.",
    name: "Aarav & Meera",
    context: "Birthday Wish",
  },
  {
    quote: "The invitation looked incredibly elegant on mobile.",
    name: "Rahul & Isha",
    context: "Wedding Invitation",
  },
  {
    quote: "The little details made the whole thing feel so personal.",
    name: "Ananya S.",
    context: "Birthday Wish",
  },
];

export const PRICING_AMOUNT = "₹499";

export const pricingConfig = {
  price: PRICING_AMOUNT,
  label: "Digital Creation",
  subtitle: "One beautiful personalized digital experience.",
  features: [
    "Premium template",
    "Personalization",
    "Photos",
    "Music",
    "Shareable private link",
  ],
  cta: "Create Something Special",
  href: "/create",
};

export const faqs = [
  {
    question: "What can I create?",
    answer: "You can currently create a digital birthday wish or wedding invitation.",
  },
  {
    question: "Can I add my own photos?",
    answer: "Yes. Personal photos are a core part of the experience.",
  },
  {
    question: "Can I add music?",
    answer: "Yes, where supported by the selected experience.",
  },
  {
    question: "Will it work on phones?",
    answer: "Yes. The experience is designed mobile-first.",
  },
  {
    question: "Can I share it on WhatsApp?",
    answer: "Yes. The final creation will be designed to be easy to share as a private link.",
  },
  {
    question: "Can I preview it before sharing?",
    answer: "Yes. Previewing is an important part of the creation experience.",
  },
];

