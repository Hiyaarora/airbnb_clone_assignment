"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { IconButton } from "@/components/ui/IconButton";
import { useOverlayState } from "@/hooks/useOverlayState";
import type { AmenityGroup } from "@/types/listing";
import styles from "./AmenitiesModal.module.css";

/**
 * "What this place offers" modal (audit §12): 50 % overlay, 780px dialog, max-height
 * calc(100vh − 96px), grouped list. Closes on X, backdrop click and Escape.
 */
export function AmenitiesModal({ groups }: { groups: AmenityGroup[] }) {
  const { amenitiesOpen, closeAmenities } = useOverlayState();
  const closeRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={styles.overlay} data-open={amenitiesOpen} onClick={closeAmenities}>
      <Dialog
        open={amenitiesOpen}
        label="What this place offers"
        onClose={closeAmenities}
        initialFocusRef={closeRef}
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.head}>
          <IconButton ref={closeRef} label="Close" onClick={closeAmenities} className={styles.close}>
            <X size={18} strokeWidth={1.6} aria-hidden focusable={false} />
          </IconButton>
        </div>
        <div className={styles.body} tabIndex={0} role="region" aria-label="Amenities list">
          <h2 className={styles.title}>What this place offers</h2>
          {groups.map((group) => (
            <section key={group.title} className={styles.group}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <ul className={styles.list}>
                {group.items.map((item) => (
                  <li key={item.label} className={styles.row} data-unavailable={item.unavailable || undefined}>
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
            </section>
          ))}
        </div>
      </Dialog>
    </div>
  );
}
