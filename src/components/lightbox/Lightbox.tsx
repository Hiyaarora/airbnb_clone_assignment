"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";
import { DotsGridIcon } from "@/components/ui/icons";
import { IconButton } from "@/components/ui/IconButton";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { useOverlayState } from "@/hooks/useOverlayState";
import { PHOTO_QUALITY } from "@/lib/imageSizes";
import type { Photo, Room } from "@/types/listing";
import styles from "./Lightbox.module.css";

interface Props {
  photos: Photo[];
  rooms: Room[];
}

/**
 * Single-photo viewer (audit §11): white fullscreen overlay, header with grid/close, room
 * title and "N of 43" counter, prev/next arrows disabled at the ends (no wrap-around),
 * instant image swaps, backdrop click does nothing, Escape closes only the lightbox.
 */
export function Lightbox({ photos, rooms }: Props) {
  const { lightboxIndex, setLightboxIndex, closeLightbox } = useOverlayState();
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const open = lightboxIndex !== null;
  const index = lightboxIndex ?? 0;
  const photo = photos[index];
  const room = rooms.find((r) => r.id === photo?.room);
  const isFirst = index <= 0;
  const isLast = index >= photos.length - 1;

  // When the arrow that has focus becomes disabled at a boundary, focus would drop to
  // <body>; move it to Close so keyboard users stay inside the dialog.
  const previous = useCallback(() => {
    if (isFirst) return;
    setLightboxIndex(index - 1);
    if (index - 1 === 0 && document.activeElement === prevRef.current) closeRef.current?.focus();
  }, [isFirst, index, setLightboxIndex]);
  const next = useCallback(() => {
    if (isLast) return;
    setLightboxIndex(index + 1);
    if (index + 1 === photos.length - 1 && document.activeElement === nextRef.current) closeRef.current?.focus();
  }, [isLast, index, photos.length, setLightboxIndex]);

  useKeyboardNavigation(open, { onPrevious: previous, onNext: next });

  return (
    <Dialog open={open} label="Photo viewer" onClose={closeLightbox} initialFocusRef={closeRef} className={styles.overlay}>
      <header className={styles.header}>
        <IconButton label="Show all photos" onClick={closeLightbox} className={styles.grid}>
          <DotsGridIcon size={18} />
        </IconButton>
        <h2 className={styles.title}>{room?.name}</h2>
        <div className={styles.headerRight}>
          <span className={styles.counter} data-testid="lightbox-counter">
            {index + 1} of {photos.length}
          </span>
          <IconButton ref={closeRef} label="Close" onClick={closeLightbox}>
            <X size={18} strokeWidth={1.6} aria-hidden focusable={false} />
          </IconButton>
        </div>
      </header>

      <IconButton ref={prevRef} label="Previous" variant="outline" disabled={isFirst} onClick={previous} className={`${styles.arrow} ${styles.prev}`}>
        <ChevronLeft size={18} strokeWidth={1.6} aria-hidden focusable={false} />
      </IconButton>

      <div className={styles.stage}>
        {photo && (
          <Image
            key={photo.id}
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="1100px"
            quality={PHOTO_QUALITY}
            className={styles.image}
          />
        )}
      </div>

      <IconButton ref={nextRef} label="Next" variant="outline" disabled={isLast} onClick={next} className={`${styles.arrow} ${styles.next}`}>
        <ChevronRight size={18} strokeWidth={1.6} aria-hidden focusable={false} />
      </IconButton>

      {/* Screen-reader announcement of the current photo (a11y addition, see implementation-notes). */}
      <div className="visually-hidden" aria-live="polite">
        {open ? `${room?.name}, photo ${index + 1} of ${photos.length}` : ""}
      </div>
    </Dialog>
  );
}
