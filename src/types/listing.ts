export type RoomId =
  | "living-room-1"
  | "living-room-2"
  | "full-kitchen"
  | "bedroom"
  | "full-bathroom"
  | "gym"
  | "exterior"
  | "pool"
  | "additional-photos";

export interface Room {
  id: RoomId;
  /** Heading shown in the Photo Tour and as the Lightbox title. */
  name: string;
  /** Amenity list shown under the room heading (joined with " · "). */
  amenities: string[];
}

export interface Photo {
  /** Stable id (the reference's asset hash, kept for traceability). */
  id: string;
  src: string;
  alt: string;
  room: RoomId;
  /** Global order = Photo Tour order = Lightbox order (0-based). */
  order: number;
  width: number;
  height: number;
  caption?: string;
}

export interface Highlight {
  icon: "outdoor" | "cooling" | "checkin";
  title: string;
  description: string;
}

export interface Amenity {
  label: string;
  icon: string;
  /** Rendered struck-through with a crossed icon. */
  unavailable?: boolean;
}

export interface AmenityGroup {
  title: string;
  items: Amenity[];
}

export interface SleepingArrangement {
  photoId: string;
  title: string;
  detail: string;
}

export interface CategoryScore {
  label: string;
  score: string;
  icon: string;
}

export interface TopicChip {
  label: string;
  count: number;
  icon: string;
}

export interface Review {
  id: string;
  name: string;
  /** Avatar image path, or undefined to render the initial badge. */
  avatar?: string;
  initialColors?: { fg: string; bg: string };
  tenure: string;
  date: string;
  text: string;
}

export interface CoHost {
  name: string;
  avatar?: string;
  initialColors?: { fg: string; bg: string };
}

export interface SimilarStay {
  id: string;
  image: string;
  title: string;
  price: string;
  rating: string;
}

export interface Listing {
  title: string;
  propertyType: string;
  location: string;
  overviewTitle: string;
  meta: string[];
  rating: string;
  reviewCount: number;
  guestFavouriteText: string;
  host: {
    name: string;
    avatar: string;
    tenure: string;
    reviews: string;
    rating: string;
    yearsHosting: string;
    facts: { icon: string; text: string }[];
    responseRate: string;
    responseTime: string;
    coHosts: CoHost[];
  };
  highlights: Highlight[];
  translationNotice: string;
  description: string;
  sleeping: SleepingArrangement[];
  amenitiesPreview: Amenity[];
  amenityGroups: AmenityGroup[];
  amenityCount: number;
  stay: {
    nights: number;
    checkIn: string;
    checkOut: string;
    checkInDisplay: string;
    checkOutDisplay: string;
    rangeLabel: string;
    guests: string;
    price: string;
    freeCancellationBefore: string;
  };
  reviewSummary: {
    subtitle: string;
    distribution: number[];
    categories: CategoryScore[];
    chips: TopicChip[];
  };
  reviews: Review[];
  locationText: string;
  neighbourhood: string;
  thingsToKnow: { icon: string; title: string; lines: string[] }[];
  similar: SimilarStay[];
}
