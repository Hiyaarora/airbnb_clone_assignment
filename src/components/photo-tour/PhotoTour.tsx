"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft } from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";
import { HeartIcon, ShareIcon } from "@/components/ui/icons";
import { IconButton } from "@/components/ui/IconButton";
import { useOverlayState } from "@/hooks/useOverlayState";
import { PHOTO_QUALITY, coverSizes } from "@/lib/imageSizes";
import type { Photo, Room, RoomId } from "@/types/listing";
import styles from "./PhotoTour.module.css";

interface Props {
  rooms: Room[];
  photos: Photo[];
}

/** Reference: a room section is aligned 24px below the tour bar when opened from a hero image or a category thumbnail (audit §10). */
const SECTION_OFFSET = 24;

const sectionId = (room: RoomId) => `tour-room-${room}`;

/** Tiles per room follow the reference pattern: one full-width, then a pair, repeating. */
function rows(photos: Photo[]): Photo[][] {
  const out: Photo[][] = [];
  let i = 0;
  let full = true;
  while (i < photos.length) {
    const size = full ? 1 : 2;
    out.push(photos.slice(i, i + size));
    i += size;
    full = !full;
  }
  return out;
}

/**
 * Fullscreen Photo Tour (audit §10): 88px bar, 976px column, category grid, sticky room
 * titles and 3:2 tiles. Its own scroll container scrolls while the page is locked.
 */
export function PhotoTour({ rooms, photos }: Props) {
  const { tourOpen, tourTarget, lightboxIndex, closeTour, openLightbox } = useOverlayState();
  const scrollRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);

  const scrollToRoom = useCallback((room: RoomId | null, behavior: ScrollBehavior) => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    if (!room) {
      scroller.scrollTo({ top: 0, behavior });
      return;
    }
    const section = document.getElementById(sectionId(room));
    if (!section) return;
    const top = section.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - SECTION_OFFSET;
    scroller.scrollTo({ top, behavior });
  }, []);

  // Position the tour on every open (Show all photos → top; hero image → its room).
  useEffect(() => {
    if (tourOpen) scrollToRoom(tourTarget.room, "instant");
  }, [tourOpen, tourTarget, scrollToRoom]);

  // When the lightbox closes and nothing in the tour holds focus (deep link, no opener),
  // land focus on the Back button so keyboard users are inside the top-most dialog.
  useEffect(() => {
    if (!tourOpen || lightboxIndex !== null) return;
    const id = window.setTimeout(() => {
      const root = backRef.current?.closest("[role=dialog]");
      if (root && !root.contains(document.activeElement)) backRef.current?.focus({ preventScroll: true });
    }, 0);
    return () => window.clearTimeout(id);
  }, [tourOpen, lightboxIndex]);

  return (
    <Dialog open={tourOpen} label="Photo tour" onClose={closeTour} initialFocusRef={backRef} className={styles.overlay}>
      <header className={styles.bar}>
        <IconButton ref={backRef} label="Back" onClick={closeTour} className={styles.back}>
          <ChevronLeft size={18} strokeWidth={1.5} aria-hidden focusable={false} />
        </IconButton>
        <h2 className={styles.title}>Photo tour</h2>
        <div className={styles.barActions}>
          {/* Inert in the reference; kept as labelled buttons for parity. */}
          <IconButton label="Share">
            <ShareIcon size={18} strokeWidth={1.7} />
          </IconButton>
          <IconButton label="Save">
            <HeartIcon size={18} strokeWidth={1.7} />
          </IconButton>
        </div>
      </header>

      <div ref={scrollRef} className={styles.scroll} tabIndex={0} role="region" aria-label="Photo tour content">
        <div className={styles.inner}>
          <nav aria-label="Photo categories" className={styles.nav}>
            {rooms.map((room) => {
              const thumb = photos.find((p) => p.room === room.id);
              if (!thumb) return null;
              return (
                <button key={room.id} type="button" className={styles.navItem} onClick={() => scrollToRoom(room.id, "smooth")}>
                  <Image
                    src={thumb.src}
                    alt=""
                    width={thumb.width}
                    height={thumb.height}
                    sizes={coverSizes(thumb, 112, 106)}
                    quality={PHOTO_QUALITY}
                    loading="lazy"
                    className={styles.navImage}
                  />
                  <span className={styles.navLabel}>{room.name}</span>
                </button>
              );
            })}
          </nav>

          <div className={styles.rooms}>
            {rooms.map((room) => {
              const roomPhotos = photos.filter((p) => p.room === room.id);
              return (
                <section key={room.id} id={sectionId(room.id)} className={styles.room} aria-labelledby={`${sectionId(room.id)}-title`}>
                  <div className={styles.roomHeader}>
                    <h3 id={`${sectionId(room.id)}-title`} className={styles.roomTitle}>
                      {room.name}
                    </h3>
                    {room.amenities.length > 0 && <p className={styles.roomAmenities}>{room.amenities.join("  ·  ")}</p>}
                  </div>
                  <div className={styles.tiles}>
                    {rows(roomPhotos).map((row, r) => (
                      <div key={r} className={styles.row} data-count={row.length}>
                        {row.map((photo) => (
                          <button
                            key={photo.id}
                            type="button"
                            className={styles.tile}
                            data-idx={photo.order}
                            aria-label={`${photo.alt}, photo ${photo.order + 1} of ${photos.length}`}
                            onClick={() => openLightbox(photo.order)}
                          >
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              width={photo.width}
                              height={photo.height}
                              sizes={row.length === 1 ? coverSizes(photo, 458, 305) : coverSizes(photo, 223, 149)}
                              quality={PHOTO_QUALITY}
                              loading="lazy"
                              className={styles.tileImage}
                            />
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
