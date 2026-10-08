export type RelationshipOption =
  | "Partner"
  | "Wife"
  | "Husband"
  | "Girlfriend"
  | "Boyfriend"
  | "Best Friend"
  | "Mother"
  | "Father"
  | "Brother"
  | "Sister"
  | "Daughter"
  | "Son"
  | "Other";

export type MessageStylePreset =
  | "Romantic"
  | "Emotional"
  | "Cute"
  | "Funny"
  | "Best Friend"
  | "Family";

export type MusicTrackOption = {
  id: string;
  title: string;
  mood: string;
  genre: string;
  sampleUrl?: string;
};

export type MemoryItem = {
  photoUrl: string;
  caption: string;
  dateOrLocation?: string;
};

export type SpecialReasonItem = {
  title: string;
  description: string;
  emoji: string;
};

export type BirthdayWishData = {
  recipientName: string;
  relationship?: RelationshipOption | "";
  age?: string;
  birthDate?: string;
  senderName?: string;
  message: string;
  messageStyle?: MessageStylePreset | "";
  mainPhoto?: string;
  photos: string[];
  memories?: MemoryItem[];
  specialReasons?: SpecialReasonItem[];
  quote?: string;
  music: string; // "romantic" | "acoustic" | "ambient" | "none"
};

export type BirthdayTemplateConfig = {
  id: string;
  name: string;
  category: "birthday";
  theme: {
    primaryColor: string;
    backgroundGradient: string;
    fontFamily: string;
  };
  sections: Array<
    | "opening"
    | "birthdayHero"
    | "mainPhoto"
    | "message"
    | "memories"
    | "music"
    | "closing"
  >;
};
