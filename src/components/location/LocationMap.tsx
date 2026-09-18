import { ChevronRight, Minus, Plus, Search } from "lucide-react";
import { HouseIcon } from "@/components/ui/icons";
import styles from "./LocationMap.module.css";

interface Props {
  location: string;
  note: string;
  neighbourhood: string;
}

/** "Where you'll be": stylised static map with inert controls (audit §9 Location). */
export function LocationMap({ location, note, neighbourhood }: Props) {
  return (
    <section id="location" className={styles.section} aria-labelledby="location-heading">
      <h2 id="location-heading" className={styles.heading}>
        Where you’ll be
      </h2>
      <div className={styles.place}>{location}</div>
      <div className={styles.map}>
        <div className={styles.terrain} role="img" aria-label={`Map of ${location}`} />
        <button type="button" className={styles.mapSearch} aria-label="Search">
          <Search size={16} strokeWidth={2} aria-hidden focusable={false} />
        </button>
        <div className={styles.zoom}>
          <button type="button" className={styles.zoomButton} aria-label="Zoom in">
            <Plus size={16} strokeWidth={2} aria-hidden focusable={false} />
          </button>
          <button type="button" className={styles.zoomButton} aria-label="Zoom out">
            <Minus size={16} strokeWidth={2} aria-hidden focusable={false} />
          </button>
        </div>
        <div className={styles.marker}>
          <HouseIcon size={26} />
        </div>
      </div>
      <div className={styles.note}>{note}</div>
      <div className={styles.subheading}>Neighbourhood highlights</div>
      <p className={styles.text}>{neighbourhood}</p>
      <button type="button" className={styles.more}>
        Show more
        <ChevronRight size={14} strokeWidth={2.5} aria-hidden focusable={false} />
      </button>
    </section>
  );
}
