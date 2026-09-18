"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StarIcon } from "@/components/ui/icons";
import { PHOTO_QUALITY, coverSizes } from "@/lib/imageSizes";
import type { SimilarStay } from "@/types/listing";
import styles from "./SimilarStays.module.css";

/**
 * "More stays nearby" (audit §9): 5 of 8 square cards visible, next/prev smooth-scroll the
 * track to its end/start, counter "1 / 2". Position state is local to this component.
 */
export function SimilarStays({ items }: { items: SimilarStay[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atEnd, setAtEnd] = useState(false);
  const [atStart, setAtStart] = useState(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      setAtStart(track.scrollLeft <= 1);
      setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 1);
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    return () => track.removeEventListener("scroll", update);
  }, []);

  const scrollTo = (left: number) => trackRef.current?.scrollTo({ left, behavior: "smooth" });

  return (
    <section className={styles.section} aria-labelledby="similar-heading">
      <div className={styles.header}>
        <h2 id="similar-heading" className={styles.heading}>
          More stays nearby
        </h2>
        <div className={styles.controls}>
          <span className={styles.counter} aria-live="polite">
            {atEnd ? 2 : 1} / 2
          </span>
          <button type="button" className={styles.arrow} aria-label="Previous stays" disabled={atStart} onClick={() => scrollTo(0)}>
            <ChevronLeft size={12} strokeWidth={2.5} aria-hidden focusable={false} />
          </button>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Next stays"
            disabled={atEnd}
            onClick={() => scrollTo(trackRef.current?.scrollWidth ?? 0)}
          >
            <ChevronRight size={12} strokeWidth={2.5} aria-hidden focusable={false} />
          </button>
        </div>
      </div>
      <div ref={trackRef} className={styles.track} tabIndex={0} role="region" aria-label="Nearby stays">
        {items.map((stay) => (
          <div key={stay.id} className={styles.card}>
            <Image src={stay.image} alt={stay.title} width={720} height={480} sizes={coverSizes({ width: 720, height: 480 }, 208, 208)} quality={PHOTO_QUALITY} className={styles.image} />
            <div className={styles.title}>{stay.title}</div>
            <div className={styles.meta}>
              {stay.price} <StarIcon size={10} className={styles.star} /> {stay.rating}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
