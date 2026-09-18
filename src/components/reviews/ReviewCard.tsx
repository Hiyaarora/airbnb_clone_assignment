"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { StarIcon } from "@/components/ui/icons";
import type { Review } from "@/types/listing";
import styles from "./ReviewCard.module.css";

/**
 * One review (audit §9): avatar or initial badge, name/tenure, stars · date, body clamped to
 * 4 lines with "Show more" once the text reaches four lines (reference behaviour).
 */
export function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  // Re-measure after web fonts load and on resize: the clamp depends on text metrics.
  useLayoutEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    // Reference rule (verified at 1280 and at emulated 1440/1536/1920): the toggle appears once
    // the text fills four lines, even when nothing is hidden — so compare against the clamp
    // height rather than looking for overflow.
    const measure = () => setClamped(el.scrollHeight >= el.clientHeight - 1 && el.clientHeight >= 4 * 21 - 1);
    measure();
    document.fonts?.ready.then(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        {review.avatar ? (
          <Image src={review.avatar} alt="" width={42} height={42} className={styles.avatar} />
        ) : (
          <div className={styles.initial} style={{ color: review.initialColors?.fg, background: review.initialColors?.bg }} aria-hidden>
            {review.name[0]}
          </div>
        )}
        <div>
          <div className={styles.name}>{review.name}</div>
          <div className={styles.tenure}>{review.tenure}</div>
        </div>
      </div>
      <div className={styles.meta}>
        <span className={styles.stars} role="img" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} size={10} />
          ))}
        </span>
        <span aria-hidden>·</span>
        <span>{review.date}</span>
      </div>
      <p ref={bodyRef} className={styles.body} data-expanded={expanded}>
        {review.text}
      </p>
      {(clamped || expanded) && (
        <button type="button" className={styles.toggle} aria-expanded={expanded} onClick={() => setExpanded((v) => !v)}>
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </article>
  );
}
