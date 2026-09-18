"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { DotsGridIcon } from "@/components/ui/icons";
import { useOverlayState } from "@/hooks/useOverlayState";
import { PHOTO_QUALITY, coverSizes } from "@/lib/imageSizes";
import type { Photo } from "@/types/listing";
import styles from "./HeroGallery.module.css";

interface Props {
  title: string;
  photos: Photo[];
}

/**
 * 1120×494 five-photo grid (audit §6): 2fr 1fr 1fr, 8px gaps, 12px radius, first photo
 * spans both rows, hover darkens by 10 %. Every cell is a real button. Reference behaviour:
 * a photo opens the Photo Tour scrolled to that photo's room; "Show all photos" opens it at
 * the top (audit §6, interactions).
 */
export function HeroGallery({ title, photos }: Props) {
  const { openTour, tourOpen } = useOverlayState();
  const showAllRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // A deep-linked tour has no opener to restore focus to; land on "Show all photos" instead.
  useEffect(() => {
    const closing = wasOpen.current && !tourOpen;
    wasOpen.current = tourOpen;
    if (!closing) return;
    const id = window.setTimeout(() => {
      if (document.activeElement === document.body) showAllRef.current?.focus({ preventScroll: true });
    }, 0);
    return () => window.clearTimeout(id);
  }, [tourOpen]);

  return (
    <section id="hero-gallery" className={styles.section} aria-label="Photos of this place">
      <div className={styles.grid}>
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            className={styles.cell}
            aria-label={`${title}: ${photo.alt}, photo ${i + 1} of ${photos.length}. Opens the photo tour`}
            onClick={() => openTour(photo.room)}
          >
            <Image
              src={photo.src}
              alt=""
              width={photo.width}
              height={photo.height}
              // Large cell is 560×494, small cells 276×243 at the 1120px track (audit §6).
              sizes={i === 0 ? coverSizes(photo, 560, 494) : coverSizes(photo, 276, 243)}
              quality={PHOTO_QUALITY}
              priority={i === 0}
              className={styles.image}
            />
          </button>
        ))}
      </div>
      <button ref={showAllRef} type="button" className={styles.showAll} onClick={() => openTour(null)}>
        <DotsGridIcon size={15} />
        Show all photos
      </button>
    </section>
  );
}
