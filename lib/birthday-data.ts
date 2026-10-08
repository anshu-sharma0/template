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
  recipientName: "Khushi",
  relationship: "Partner",
  age: "25",
  birthDate: "2026-10-14",
  senderName: "Akshat",
  message:
    "Happy birthday to the person who makes my world feel a little softer and brighter every single day.\n\nLooking back at our journey, I realize that every ordinary day becomes an adventure simply because you are in it. Thank you for your warmth, your unwavering patience, and for loving me so purely.\n\nI hope this year brings you as much unconditional happiness as you bring into my life every single moment.",
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
      emoji: "🌹",
      title: "Your Gentle Heart",
      description: "The way you notice the smallest details and make everyone around you feel deeply valued and safe.",
    },
    {
      emoji: "✨",
      title: "Your Radiant Smile",
      description: "The one thing that instantly turns any stressful day into comfort, warmth, and pure sunshine.",
    },
    {
      emoji: "💫",
      title: "Your Inspiring Spirit",
      description: "The quiet determination and passionate energy you pour into every single dream you chase.",
    },
    {
      emoji: "💖",
      title: "Your Unconditional Love",
      description: "The sweet, calming reassurance of knowing that no matter what happens, with you I am always home.",
    },
  ],
  quote:
    "Another year of you means another year of making the world a little softer, a little brighter, and infinitely more beautiful.",
  music: "romantic",
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
