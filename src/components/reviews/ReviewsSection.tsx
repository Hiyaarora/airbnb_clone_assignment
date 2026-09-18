import Image from "next/image";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { uiAssets } from "@/data/assets";
import type { Listing } from "@/types/listing";
import { ReviewCard } from "./ReviewCard";
import styles from "./ReviewsSection.module.css";

interface Props {
  rating: string;
  reviewCount: number;
  summary: Listing["reviewSummary"];
  reviews: Listing["reviews"];
}

/** Reviews section (audit §9): big rating, category grid, topic chips, review grid. */
export function ReviewsSection({ rating, reviewCount, summary, reviews }: Props) {
  return (
    <section id="reviews" className={styles.section} aria-labelledby="reviews-heading">
      <div className={styles.summary}>
        <div className={styles.hero}>
          <Image src={uiAssets.laurelLeft.src} alt="" width={uiAssets.laurelLeft.width} height={uiAssets.laurelLeft.height} className={styles.laurel} />
          <div className={styles.bigRating} aria-hidden>
            {rating}
          </div>
          <Image src={uiAssets.laurelRight.src} alt="" width={uiAssets.laurelRight.width} height={uiAssets.laurelRight.height} className={styles.laurel} />
        </div>
        <h2 id="reviews-heading" className={styles.favTitle}>
          <span className="visually-hidden">Rated {rating} out of 5 · </span>Guest favourite
        </h2>
        <p className={styles.favSubtitle}>{summary.subtitle}</p>
        <button type="button" className={styles.howLink}>
          How reviews work
        </button>
      </div>

      <div className={styles.categories}>
        <div className={`${styles.category} ${styles.overall}`}>
          <div className={styles.categoryLabel}>Overall rating</div>
          <div className={styles.bars}>
            {summary.distribution.map((pct, i) => (
              <div key={i} className={styles.barRow}>
                <span className={styles.barLabel}>{5 - i}</span>
                <div className={styles.barTrack}>
                  <div className={styles.barFill} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {summary.categories.map((cat) => (
          <div key={cat.label} className={styles.category}>
            <div className={styles.categoryLabel}>{cat.label}</div>
            <div className={styles.score}>{cat.score}</div>
            <FeatureIcon name={cat.icon} size={32} />
          </div>
        ))}
      </div>

      <div className={styles.chips}>
        {summary.chips.map((chip) => (
          <button key={chip.label} type="button" className={styles.chip}>
            <Image src={chip.icon} alt="" width={20} height={20} className={styles.chipIcon} />
            {chip.label}
            <span className={styles.chipCount}>{chip.count}</span>
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <OutlineButton>Show all {reviewCount} reviews</OutlineButton>
    </section>
  );
}
