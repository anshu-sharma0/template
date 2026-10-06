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

export type BirthdayWishData = {
  recipientName: string;
  relationship?: RelationshipOption | "";
  age?: string;
  senderName?: string;
  message: string;
  messageStyle?: MessageStylePreset | "";
  mainPhoto?: string;
  photos: string[];
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
