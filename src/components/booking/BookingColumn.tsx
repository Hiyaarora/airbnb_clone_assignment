import Image from "next/image";
import { ChevronDown, Flag } from "lucide-react";
import { uiAssets } from "@/data/assets";
import type { Listing } from "@/types/listing";
import styles from "./BookingColumn.module.css";

/**
 * Sticky right column (audit §8): promo card, booking card and "Report this listing".
 * Every control is inert in the reference; they remain real buttons/links for keyboard users.
 */
export function BookingColumn({ stay }: { stay: Listing["stay"] }) {
  return (
    <aside className={styles.aside}>
      <div className={styles.sticky}>
        <div className={styles.promo}>
          <Image src={uiAssets.discountTag.src} alt="" width={32} height={32} className={styles.promoIcon} aria-hidden />
          <p className={styles.promoText}>
            Get 10% off your next stay.
            <br />
            <a href="#" className={styles.promoLink}>
              Terms apply
            </a>
          </p>
          <button type="button" className={styles.claim}>
            Claim
          </button>
        </div>

        <div className={styles.card}>
          <div className={styles.priceRow}>
            <span className={styles.price}>{stay.price}</span>
            <span className={styles.priceSuffix}>for {stay.nights} nights</span>
          </div>

          <div className={styles.fields}>
            <div className={styles.dates}>
              <div className={`${styles.field} ${styles.fieldCheckIn}`}>
                <div className={styles.fieldLabel}>Check-in</div>
                <div className={styles.fieldValue}>{stay.checkInDisplay}</div>
              </div>
              <div className={styles.field}>
                <div className={styles.fieldLabel}>Checkout</div>
                <div className={styles.fieldValue}>{stay.checkOutDisplay}</div>
              </div>
            </div>
            <div className={styles.guests}>
              <div>
                <div className={styles.fieldLabel}>Guests</div>
                <div className={styles.fieldValue}>{stay.guests}</div>
              </div>
              <ChevronDown size={16} strokeWidth={2.5} aria-hidden focusable={false} />
            </div>
          </div>

          <div className={styles.cancellation}>
            Free cancellation before <b className={styles.cancellationDate}>{stay.freeCancellationBefore}</b>
          </div>

          <button type="button" className={styles.reserve}>
            Reserve
          </button>
          <div className={styles.note}>You won&apos;t be charged yet</div>
        </div>

        <div className={styles.report}>
          <Flag size={16} strokeWidth={1.5} aria-hidden focusable={false} />
          <a href="#" className={styles.reportLink}>
            Report this listing
          </a>
        </div>
      </div>
    </aside>
  );
}
