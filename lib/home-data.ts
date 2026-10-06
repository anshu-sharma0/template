export const navItems = [
  { label: "Birthday", href: "#birthday-wish" },
  { label: "Wedding", href: "#wedding-invitation" },
  { label: "Templates", href: "#templates" },
  { label: "How It Works", href: "#how-it-works" },
];

export const occasions = [
  {
    icon: "🎂",
    title: "Birthday Wish",
    badge: "Personal surprise",
    description:
      "More than just a birthday message. Create a personalized digital surprise they'll remember.",
    cta: "Create Birthday Wish",
    href: "#templates",
    theme: "birthday" as const,
    decorative: "Floating love note",
  },
  {
    icon: "💍",
    title: "Wedding Invitation",
    badge: "Premium invite",
    description:
      "Invite them beautifully. Create a premium digital invitation for your special day.",
    cta: "Create Wedding Invitation",
    href: "#templates",
    theme: "wedding" as const,
    decorative: "Champagne floral line",
  },
];

export const templates = [
  {
    category: "Birthday Wish",
    name: "Romantic Birthday",
    description: "Turn a simple birthday wish into a little digital surprise.",
    cta: "Try this design",
    href: "#birthday-wish",
    preview: "birthday" as const,
  },
  {
    category: "Elegant Wedding",
    name: "Elegant Wedding",
    description: "An invitation that feels as beautiful as the day itself.",
    cta: "Try this design",
    href: "#wedding-invitation",
    preview: "wedding" as const,
  },
  {
    category: "Luxury Wedding",
    name: "Luxury Wedding",
    description: "Your story deserves a beautiful beginning.",
    cta: "Try this design",
    href: "#wedding-invitation",
    preview: "luxuryWedding" as const,
  },
];

export const steps = [
  {
    number: "01",
    title: "Choose",
    description: "Pick a beautiful design.",
  },
  {
    number: "02",
    title: "Make it yours",
    description: "Add names, messages, photos and details.",
  },
  {
    number: "03",
    title: "Share the moment",
    description: "Get your personal link and send it.",
  },
];

export const testimonials = [
  {
    quote: "She opened it at midnight and called me immediately.",
    name: "Aarav",
    occasion: "Birthday Wish",
    city: "Mumbai",
  },
  {
    quote: "It felt like I had given her an actual gift.",
    name: "Meera",
    occasion: "Birthday Wish",
    city: "Bengaluru",
  },
  {
    quote: "Everyone at the wedding loved the invitation.",
    name: "Isha",
    occasion: "Wedding Invitation",
    city: "Jaipur",
  },
];

export const pricing = [
  {
    title: "Birthday Wish",
    price: "₹149",
    description: "A personal digital surprise with message, photo moments and shareable preview.",
    cta: "Create Yours",
    href: "#birthday-wish",
    tone: "birthday" as const,
  },
  {
    title: "Wedding Invitation",
    price: "₹1,499",
    description: "A premium wedding microsite preview for your story, date and celebration details.",
    cta: "Create Yours",
    href: "#wedding-invitation",
    tone: "wedding" as const,
  },
];

export const faqs = [
  {
    question: "What exactly do I create?",
    answer:
      "You create a private digital experience: a birthday wish or wedding invitation that opens as a beautiful mobile-first page, not a flat image.",
  },
  {
    question: "Do I need an account?",
    answer:
      "Not for this phase. The product flow is being designed around simple creation first, with account features planned only when they truly help.",
  },
  {
    question: "Can I preview it before paying?",
    answer:
      "Yes. The experience is built around previewing exactly what the recipient will see before any purchase step exists.",
  },
  {
    question: "Can I send it on WhatsApp?",
    answer:
      "Yes. These experiences are designed to be shared as a simple link through WhatsApp, Instagram, email or any chat app.",
  },
  {
    question: "Does it work on mobile?",
    answer:
      "Yes. Mobile is the primary canvas, so typography, touch targets, previews and section spacing are designed for small screens first.",
  },
  {
    question: "Can I add my own photos?",
    answer:
      "The visual system is ready for photo upload areas and image previews. Real uploads will come in a later backend phase.",
  },
];
