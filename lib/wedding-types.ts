export type WeddingTemplateVariant = "elegant" | "luxury";

export type WeddingEvent = {
  id: string;
  title: string; // Mehendi, Sangeet, Wedding, Reception, etc.
  date?: string;
  time?: string;
  venue?: string;
  description?: string;
};

export type WeddingVenue = {
  name?: string;
  address?: string;
  mapsUrl?: string;
};

export type WeddingStoryItem = {
  id: string;
  date?: string;
  title: string;
  description?: string;
  image?: string;
};

export type WeddingInvitationData = {
  template: WeddingTemplateVariant;
  brideName: string;
  groomName: string;
  weddingDate: string;
  weddingTime?: string;

  couplePhoto?: string;
  invitationMessage: string;

  brideFamily?: string;
  groomFamily?: string;

  events: WeddingEvent[];

  venue: WeddingVenue;

  story: {
    title: string;
    description: string;
    timeline: WeddingStoryItem[];
  };

  gallery: string[];

  music: string; // "romantic" | "classical" | "dreamy" | "none"

  showCountdown: boolean;
  showFamily: boolean;
  showRSVP: boolean;

  rsvp: {
    heading: string;
    contact: string;
  };
};
