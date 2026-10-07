import type { BirthdayWishData } from "./birthday-types";
import type { WeddingInvitationData } from "./wedding-types";
import { DEFAULT_BIRTHDAY_DATA } from "./birthday-data";
import { DEFAULT_WEDDING_DATA } from "./wedding-data";

export function normalizeBirthdayWish(
  raw?: Partial<BirthdayWishData> | null
): BirthdayWishData {
  if (!raw) return DEFAULT_BIRTHDAY_DATA;

  return {
    recipientName: typeof raw.recipientName === "string" ? raw.recipientName.trim() : DEFAULT_BIRTHDAY_DATA.recipientName,
    relationship: raw.relationship || "",
    age: typeof raw.age === "string" || typeof raw.age === "number" ? String(raw.age).trim() : "",
    senderName: typeof raw.senderName === "string" ? raw.senderName.trim() : "",
    message: typeof raw.message === "string" ? raw.message : DEFAULT_BIRTHDAY_DATA.message,
    messageStyle: raw.messageStyle || "",
    mainPhoto: typeof raw.mainPhoto === "string" ? raw.mainPhoto : "",
    photos: Array.isArray(raw.photos) ? raw.photos.filter((p) => typeof p === "string" && p.length > 0) : [],
    music: typeof raw.music === "string" ? raw.music : "romantic",
  };
}

export function normalizeWeddingInvitation(
  raw?: Partial<WeddingInvitationData> | null
): WeddingInvitationData {
  if (!raw) return DEFAULT_WEDDING_DATA;

  return {
    template: raw.template === "luxury" ? "luxury" : "elegant",
    brideName: typeof raw.brideName === "string" ? raw.brideName.trim() : DEFAULT_WEDDING_DATA.brideName,
    groomName: typeof raw.groomName === "string" ? raw.groomName.trim() : DEFAULT_WEDDING_DATA.groomName,
    weddingDate: typeof raw.weddingDate === "string" ? raw.weddingDate.trim() : DEFAULT_WEDDING_DATA.weddingDate,
    weddingTime: typeof raw.weddingTime === "string" ? raw.weddingTime.trim() : "",
    couplePhoto: typeof raw.couplePhoto === "string" ? raw.couplePhoto : "",
    invitationMessage: typeof raw.invitationMessage === "string" ? raw.invitationMessage : DEFAULT_WEDDING_DATA.invitationMessage,
    brideFamily: typeof raw.brideFamily === "string" ? raw.brideFamily.trim() : "",
    groomFamily: typeof raw.groomFamily === "string" ? raw.groomFamily.trim() : "",
    events: Array.isArray(raw.events)
      ? raw.events.map((evt) => ({
          id: evt.id || `evt_${Math.random()}`,
          title: evt.title || "Wedding Event",
          date: evt.date || "",
          time: evt.time || "",
          venue: evt.venue || "",
          description: evt.description || "",
        }))
      : DEFAULT_WEDDING_DATA.events,
    venue: {
      name: typeof raw.venue?.name === "string" ? raw.venue.name.trim() : "",
      address: typeof raw.venue?.address === "string" ? raw.venue.address.trim() : "",
      mapsUrl: typeof raw.venue?.mapsUrl === "string" ? raw.venue.mapsUrl.trim() : "",
    },
    story: {
      title: typeof raw.story?.title === "string" ? raw.story.title.trim() : "Our Story",
      description: typeof raw.story?.description === "string" ? raw.story.description.trim() : "",
      timeline: Array.isArray(raw.story?.timeline)
        ? raw.story!.timeline.map((item) => ({
            id: item.id || `item_${Math.random()}`,
            date: item.date || "",
            title: item.title || "",
            description: item.description || "",
            image: item.image || "",
          }))
        : DEFAULT_WEDDING_DATA.story.timeline,
    },
    gallery: Array.isArray(raw.gallery) ? raw.gallery.filter((g) => typeof g === "string" && g.length > 0) : [],
    music: typeof raw.music === "string" ? raw.music : "romantic",
    showCountdown: typeof raw.showCountdown === "boolean" ? raw.showCountdown : true,
    showFamily: typeof raw.showFamily === "boolean" ? raw.showFamily : true,
    showRSVP: typeof raw.showRSVP === "boolean" ? raw.showRSVP : true,
    rsvp: {
      heading: typeof raw.rsvp?.heading === "string" ? raw.rsvp.heading.trim() : "We Would Love to Celebrate With You",
      contact: typeof raw.rsvp?.contact === "string" ? raw.rsvp.contact.trim() : "",
    },
  };
}
