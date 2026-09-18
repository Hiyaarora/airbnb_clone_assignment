import Image from "next/image";
import { LaurelIcon, StarIcon } from "@/components/ui/icons";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import type { Highlight } from "@/types/listing";
import styles from "./Overview.module.css";

/** h2 + meta line (audit §7.1). */
export function Overview({ title, meta }: { title: string; meta: string[] }) {
  return (
    <div className={styles.overview}>
      <h2 className={styles.heading}>{title}</h2>
      <p className={styles.meta}>{meta.join(" · ")}</p>
    </div>
  );
}

interface GuestFavouriteProps {
  text: string;
  rating: string;
  reviewCount: number;
}

/** Bordered 81px card with laurels, blurb, rating + stars and review count (audit §7.2). */
export function GuestFavouriteCard({ text, rating, reviewCount }: GuestFavouriteProps) {
  return (
    <div className={styles.favourite}>
      <div className={styles.badge}>
        <LaurelIcon size={36} />
        <span className={styles.badgeLabel}>
          Guest
          <br />
          favourite
        </span>
        <LaurelIcon size={36} className={styles.mirrored} />
      </div>
      <p className={styles.favouriteText}>{text}</p>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statValue}>{rating}</div>
          <div className={styles.stars} aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} size={10} />
            ))}
          </div>
        </div>
        <div className={styles.statDivider} aria-hidden />
        <div className={styles.stat}>
          <div className={styles.statValue}>{reviewCount}</div>
          <div className={styles.statLabel}>Reviews</div>
        </div>
      </div>
    </div>
  );
}

interface HostRowProps {
  name: string;
  avatar: string;
  tenure: string;
}

/** 46px avatar + "Hosted by …" (audit §7.3). */
export function HostRow({ name, avatar, tenure }: HostRowProps) {
  return (
    <div className={styles.host}>
      <Image src={avatar} alt="" width={46} height={46} className={styles.hostAvatar} />
      <div>
        <div className={styles.hostName}>Hosted by {name}</div>
        <div className={styles.hostTenure}>{tenure}</div>
      </div>
    </div>
  );
}

/** Three icon + title + description rows (audit §7.4). */
export function Highlights({ items }: { items: Highlight[] }) {
  return (
    <div className={styles.highlights}>
      {items.map((item) => (
        <div key={item.title} className={styles.highlight}>
          <div className={styles.highlightIcon}>
            <FeatureIcon name={item.icon} size={24} />
          </div>
          <div>
            <div className={styles.highlightTitle}>{item.title}</div>
            <div className={styles.highlightText}>{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
