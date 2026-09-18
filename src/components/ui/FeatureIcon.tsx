import {
  AirVent,
  AlarmSmoke,
  Armchair,
  Baby,
  Bath,
  BedDouble,
  Blend,
  Blinds,
  Cake,
  Calendar,
  CarFront,
  Cctv,
  ChefHat,
  CircleCheck,
  CircleOff,
  ClipboardList,
  Coffee,
  CookingPot,
  DoorOpen,
  Dumbbell,
  Fan,
  Flame,
  GraduationCap,
  Heater,
  KeyRound,
  Laptop,
  Map as MapIcon,
  MessageCircle,
  Microwave,
  Milk,
  PawPrint,
  Refrigerator,
  Shirt,
  ShieldCheck,
  ShowerHead,
  Snowflake,
  Sparkles,
  SprayCan,
  Tag,
  TreePalm,
  Tv,
  Umbrella,
  Utensils,
  UtensilsCrossed,
  WashingMachine,
  Wifi,
  Wind,
  Wine,
  type LucideIcon,
} from "lucide-react";
import { GLYPHS } from "./glyphs";

/**
 * Maps the data layer's icon keys (src/data/listing.ts) to line icons. Airbnb's own glyphs
 * are 1.5px-stroke line icons, so lucide at strokeWidth 1.5 reads the same at 24px.
 */
const ICONS: Record<string, LucideIcon> = {
  // highlights
  outdoor: Umbrella,
  cooling: Fan,
  checkin: DoorOpen,
  // amenities
  kitchen: Utensils,
  wifi: Wifi,
  workspace: Laptop,
  parking: CarFront,
  pool: Wind,
  "hot-tub": Bath,
  pets: PawPrint,
  camera: Cctv,
  "co-alarm": CircleOff,
  "smoke-alarm": AlarmSmoke,
  hairdryer: Wind,
  "cleaning-products": SprayCan,
  shampoo: Milk,
  "hot-water": Flame,
  "shower-gel": ShowerHead,
  washer: WashingMachine,
  hangers: Shirt,
  "bed-linen": BedDouble,
  blinds: Blinds,
  iron: Heater,
  wardrobe: Armchair,
  cot: Baby,
  tv: Tv,
  ac: Snowflake,
  fan: AirVent,
  entrance: DoorOpen,
  patio: TreePalm,
  "outdoor-dining": UtensilsCrossed,
  gym: Dumbbell,
  cleaning: Sparkles,
  "long-term": Calendar,
  "self-checkin": KeyRound,
  fridge: Refrigerator,
  freezer: Snowflake,
  microwave: Microwave,
  "cooking-basics": CookingPot,
  crockery: Utensils,
  kettle: Coffee,
  coffee: Coffee,
  wine: Wine,
  toaster: ChefHat,
  blender: Blend,
  cooker: CookingPot,
  // review categories
  spray: SprayCan,
  "check-circle": CircleCheck,
  key: KeyRound,
  chat: MessageCircle,
  map: MapIcon,
  tag: Tag,
  // host facts / things to know / misc
  cake: Cake,
  graduation: GraduationCap,
  calendar: Calendar,
  rules: ClipboardList,
  safety: ShieldCheck,
};

export function FeatureIcon({ name, size = 24, className }: { name: string; size?: number; className?: string }) {
  const glyph = GLYPHS[name];
  if (glyph) {
    return (
      <svg
        viewBox="0 0 32 32"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        focusable={false}
        className={className}
      >
        {glyph}
      </svg>
    );
  }
  const Icon = ICONS[name] ?? Sparkles;
  return <Icon size={size} strokeWidth={1.5} aria-hidden focusable={false} className={className} />;
}
