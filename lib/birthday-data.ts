import type {
  BirthdayWishData,
  RelationshipOption,
  MessageStylePreset,
  MusicTrackOption,
} from "./birthday-types";

export const RELATIONSHIP_OPTIONS: RelationshipOption[] = [
  "Partner",
  "Wife",
  "Husband",
  "Girlfriend",
  "Boyfriend",
  "Best Friend",
  "Mother",
  "Father",
  "Brother",
  "Sister",
  "Daughter",
  "Son",
  "Other",
];

export const MESSAGE_PRESETS: Record<MessageStylePreset, string> = {
  Romantic:
    "Happy birthday to the person who makes my life brighter every single day. Being with you is the sweetest gift I could ever ask for.",
  Emotional:
    "I hope you know how deeply loved and cherished you are. Thank you for always bringing warmth, laughter, and so much kindness into my world.",
  Cute:
    "Happy Birthday! Wishing you a day filled with extra cake, endless smiles, and all your favorite little moments ❤️",
  Funny:
    "Happy Birthday! Another year older, but definitely not any wiser 😉 Hope your day is as hilarious and amazing as you are!",
  "Best Friend":
    "To my partner in crime and absolute favorite human — happy birthday! Here’s to another year of unforgettable memories together.",
  Family:
    "Happy Birthday! Thank you for always being our rock, our comfort, and our biggest joy. Celebrating you today and always.",
};

export const MUSIC_TRACKS: MusicTrackOption[] = [
  {
    id: "romantic",
    title: "Soft & Romantic",
    mood: "Gentle piano & strings",
    genre: "Instrumental",
  },
  {
    id: "acoustic",
    title: "Warm & Happy",
    mood: "Light acoustic guitar",
    genre: "Acoustic",
  },
  {
    id: "ambient",
    title: "Dreamy",
    mood: "Soft ambient soundscape",
    genre: "Ambient",
  },
  {
    id: "none",
    title: "No Music",
    mood: "Quiet experience",
    genre: "Silent",
  },
];

export const DEFAULT_BIRTHDAY_DATA: BirthdayWishData = {
  recipientName: "Clarke Foley",
  relationship: "Partner",
  age: "8",
  birthDate: "2018-10-14",
  senderName: "Mohammed Anthony",
  cakeFlavor: "Strawberry Blush",
  message:
    "Every year I try to find the perfect words and every year I fall short, so here is the honest version. You make my most ordinary days feel worth remembering. Happy birthday, my favourite person. I keep thinking about how lucky I got with you. You have seen me at my worst and stayed anyway, and I do not say thank you nearly enough for that. This year, I hope life is gentle with you...",
  messageStyle: "Romantic",
  mainPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  photos: [
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
  ],
  memories: [
    {
      photoUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
      caption: "The golden hour afternoon where we couldn't stop laughing.",
      dateOrLocation: "October 14 • Our Favorite Spot",
    },
    {
      photoUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
      caption: "Getting caught in the unexpected rain and dancing anyway.",
      dateOrLocation: "Monsoon Magic • City Lights",
    },
    {
      photoUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
      caption: "That quiet evening under the stars talking about our dreams.",
      dateOrLocation: "December • The Rooftop",
    },
  ],
  specialReasons: [
    {
      emoji: "💖",
      title: "Reason No. 1",
      description: "You make every room brighter and warmer the second you walk into it.",
    },
    {
      emoji: "🌸",
      title: "Reason No. 2",
      description: "The way you laugh until your cheeks hurt and make everyone laugh with you.",
    },
    {
      emoji: "✨",
      title: "Reason No. 3",
      description: "How deeply and purely you care about everyone around you.",
    },
    {
      emoji: "🌟",
      title: "Reason No. 4",
      description: "Your gentle patience and the comforting peace you bring to my soul.",
    },
    {
      emoji: "🌹",
      title: "Reason No. 5",
      description: "Because simply having you in this world is the greatest blessing.",
    },
  ],
  quote:
    "Another year of you means another year of making the world a little softer, a little brighter, and infinitely more beautiful.",
  music: "romantic",
  videoUrl: "/template.webm",
};

export const STORAGE_KEY = "lumavows_birthday_wish_draft";

export function loadSavedBirthdayWish(): BirthdayWishData {
  if (typeof window === "undefined") return DEFAULT_BIRTHDAY_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_BIRTHDAY_DATA;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_BIRTHDAY_DATA,
      ...parsed,
    };
  } catch {
    return DEFAULT_BIRTHDAY_DATA;
  }
}

export function saveBirthdayWishDraft(data: BirthdayWishData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore quota error
  }
}
