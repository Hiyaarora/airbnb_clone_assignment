"use client";

import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { useOverlayState } from "@/hooks/useOverlayState";
import type { Amenity } from "@/types/listing";
import styles from "./AmenitiesGrid.module.css";

interface Props {
  items: Amenity[];
  total: number;
}

/** "What this place offers": 2-column preview + "Show all N amenities" (audit §7.7). */
export function AmenitiesGrid({ items, total }: Props) {
  const { openAmenities } = useOverlayState();
  return (
    <div id="amenities" className={styles.block}>
      <h2 className={styles.heading}>What this place offers</h2>
      <ul className={styles.grid}>
        {items.map((item) => (
          <li key={item.label} className={styles.item} data-unavailable={item.unavailable || undefined}>
            <span className={styles.icon}>
              <FeatureIcon name={item.icon} size={24} />
            </span>
            <span className={styles.label}>
              {item.label}
              {item.unavailable && <span className="visually-hidden"> (not available)</span>}
            </span>
          </li>
        ))}
      </ul>
      <OutlineButton onClick={openAmenities}>Show all {total} amenities</OutlineButton>
    </div>
  );
}
