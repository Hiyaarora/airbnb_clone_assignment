"use client";

import { useMemo, type MouseEvent } from "react";
import { StarIcon } from "@/components/ui/icons";
import { useActiveSection } from "@/hooks/useActiveSection";
import styles from "./StickySectionNav.module.css";

const LINKS = [
  { id: "photos", label: "Photos" },
  { id: "amenities", label: "Amenities" },
  { id: "reviews", label: "Reviews" },
  { id: "location", label: "Location" },
];

/** Reference: clicking a link scrolls so the section top sits 80px below the viewport top. */
const SCROLL_OFFSET = 80;

interface Props {
  price: string;
  nights: number;
  rating: string;
  reviewCount: number;
}

/**
 * Fixed 66px bar that slides in once the hero gallery scrolls out (audit §4). Section links
 * smooth-scroll without changing the hash; the price/Reserve cluster is inert like the
 * reference.
 */
export function StickySectionNav({ price, nights, rating, reviewCount }: Props) {
  const sectionIds = useMemo(() => LINKS.map((l) => l.id), []);
  const { visible, active } = useActiveSection({ sectionIds, triggerId: "hero-gallery" });

  const onLinkClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className={styles.bar} data-visible={visible} aria-hidden={!visible}>
      <div className={styles.inner}>
        <nav aria-label="Listing sections" className={styles.links}>
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={styles.link}
              data-active={active === link.id}
              aria-current={active === link.id ? "location" : undefined}
              tabIndex={visible ? 0 : -1}
              onClick={(e) => onLinkClick(e, link.id)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className={styles.cta}>
          <div className={styles.priceBlock}>
            <div>
              <span className={styles.price}>{price}</span>
              <span className={styles.nights}> for {nights} nights</span>
            </div>
            <div className={styles.rating}>
              <StarIcon size={11} className={styles.star} /> {rating} · <span>{reviewCount} reviews</span>
            </div>
          </div>
          <button type="button" className={styles.reserve} tabIndex={visible ? 0 : -1}>
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}
