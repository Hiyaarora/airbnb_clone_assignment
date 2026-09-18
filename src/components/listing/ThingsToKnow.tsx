import { FeatureIcon } from "@/components/ui/FeatureIcon";
import type { Listing } from "@/types/listing";
import styles from "./ThingsToKnow.module.css";

/** Three-column "Things to know" (audit §9). */
export function ThingsToKnow({ items }: { items: Listing["thingsToKnow"] }) {
  return (
    <section className={styles.section} aria-labelledby="things-heading">
      <h2 id="things-heading" className={styles.heading}>
        Things to know
      </h2>
      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.title}>
            <div className={styles.icon}>
              <FeatureIcon name={item.icon} size={24} />
            </div>
            <h3 className={styles.title}>{item.title}</h3>
            {item.lines.map((line) => (
              <p key={line} className={styles.line}>
                {line}
              </p>
            ))}
            <a href="#" className={styles.link}>
              Learn more
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
