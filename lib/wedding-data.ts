import type {
  WeddingInvitationData,
  WeddingEvent,
  WeddingStoryItem,
  WeddingTemplateVariant,
} from "./wedding-types";

export const INVITATION_MESSAGE_PRESETS = {
  Traditional:
    "With the love and blessings of our parents and families, we request the honor of your presence to celebrate our marriage as we begin our life together.",
  Elegant:
    "Together with their families, Rahul and Isha invite you to share in the joy of their wedding celebration as they say forever.",
  Romantic:
    "Two lives, two hearts, joined in love forever. We would be truly honored to have you with us on the day we start our forever story.",
  Minimal:
    "Rahul & Isha are getting married. Join us to celebrate our wedding day with laughter, music, and love.",
  Warm:
    "Our favorite memories are the ones shared with the people we love. Please join us as we tie the knot and celebrate our new chapter.",
};

export const DEFAULT_WEDDING_EVENTS: WeddingEvent[] = [
  {
    id: "mehendi",
    title: "Mehendi & High Tea",
    date: "2027-02-23",
    time: "4:00 PM",
    venue: "The Rose Garden, The Grand Palace",
    description: "An afternoon of henna, music, tea, and sweet celebrations.",
  },
  {
    id: "sangeet",
    title: "Sangeet & Cocktails",
    date: "2027-02-23",
    time: "7:30 PM",
    venue: "Grand Ballroom, The Grand Palace",
    description: "An evening of dance performances, music, and celebration.",
  },
  {
    id: "wedding",
    title: "Pheras / Wedding Ceremony",
    date: "2027-02-24",
    time: "6:00 PM",
    venue: "The Royal Lawns, The Grand Palace",
    description: "The main ceremony as we take our wedding vows.",
  },
  {
    id: "reception",
    title: "Dinner Reception",
    date: "2027-02-24",
    time: "8:30 PM",
    venue: "The Crystal Pavilion, The Grand Palace",
    description: "Dinner, toasts, and celebrating our new beginning together.",
  },
];

export const DEFAULT_STORY_TIMELINE: WeddingStoryItem[] = [
  {
    id: "met",
    date: "2021",
    title: "Where It All Began",
    description:
      "We met at a mutual friend's quiet rooftop gathering and spent hours talking under the stars.",
  },
  {
    id: "trip",
    date: "2023",
    title: "Our First Big Journey",
    description:
      "Traveling across the hills, realizing that every adventure is better together.",
  },
  {
    id: "proposal",
    date: "2025",
    title: "He Asked, She Said Yes",
    description:
      "A sunset walk by the water, a quiet promise, and an unforgettable moment.",
  },
  {
    id: "forever",
    date: "2027",
    title: "We Say Forever",
    description:
      "Surrounded by the people we love most, beginning our lifetime together.",
  },
];

export const DEFAULT_WEDDING_DATA: WeddingInvitationData = {
  template: "elegant",
  brideName: "Isha",
  groomName: "Rahul",
  weddingDate: "2027-02-24",
  weddingTime: "6:00 PM",
  couplePhoto: "",
  invitationMessage:
    "Together with their families, Rahul and Isha invite you to share in the joy of their wedding celebration as they begin their lifetime together.",
  brideFamily: "D/o Mr. & Mrs. Sharma",
  groomFamily: "S/o Mr. & Mrs. Kapoor",
  events: DEFAULT_WEDDING_EVENTS,
  venue: {
    name: "The Grand Palace",
    address: "123 Mall Road, Amritsar, Punjab",
    mapsUrl: "https://maps.google.com",
  },
  story: {
    title: "Our Story",
    description: "A few moments that brought us to this beautiful day.",
    timeline: DEFAULT_STORY_TIMELINE,
  },
  gallery: [],
  music: "romantic",
  showCountdown: true,
  showFamily: true,
  showRSVP: true,
  rsvp: {
    heading: "We Would Love to Celebrate With You",
    contact: "For inquiries: +91 98765 43210 or rsvp@rahulisha.test",
  },
};

export const WEDDING_STORAGE_KEY = "lumavows_wedding_invitation_draft";

export function loadSavedWeddingData(
  initialTemplate?: WeddingTemplateVariant
): WeddingInvitationData {
  if (typeof window === "undefined") {
    return {
      ...DEFAULT_WEDDING_DATA,
      template: initialTemplate || DEFAULT_WEDDING_DATA.template,
    };
  }
  try {
    const raw = localStorage.getItem(WEDDING_STORAGE_KEY);
    if (!raw) {
      return {
        ...DEFAULT_WEDDING_DATA,
        template: initialTemplate || DEFAULT_WEDDING_DATA.template,
      };
    }
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_WEDDING_DATA,
      ...parsed,
      template: initialTemplate || parsed.template || DEFAULT_WEDDING_DATA.template,
    };
  } catch {
    return {
      ...DEFAULT_WEDDING_DATA,
      template: initialTemplate || DEFAULT_WEDDING_DATA.template,
    };
  }
}

export function saveWeddingDataDraft(data: WeddingInvitationData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(WEDDING_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}
