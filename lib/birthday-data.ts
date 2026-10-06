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
  recipientName: "Priya",
  relationship: "Partner",
  age: "25",
  senderName: "Akshat",
  message:
    "Happy birthday to the person who makes my world feel a little softer and brighter every single day. I hope this year brings you as much joy as you give to everyone around you.",
  messageStyle: "Romantic",
  mainPhoto: "",
  photos: [],
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
