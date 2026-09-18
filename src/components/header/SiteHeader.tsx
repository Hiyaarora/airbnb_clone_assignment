"use client";

import Image from "next/image";
import { Globe, Menu } from "lucide-react";
import { AirbnbLogo, SearchIcon } from "@/components/ui/icons";
import { uiAssets } from "@/data/assets";
import styles from "./SiteHeader.module.css";

/**
 * Reference header (audit §3): 88px + 1px border, not sticky; 1fr auto 1fr grid with the
 * logo, the search pill and the right-hand nav. Every control is inert in the reference.
 */
export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.logo} href="#" aria-label="Airbnb homepage" onClick={preventDefault}>
          <AirbnbLogo height={32} />
        </a>

        <div className={styles.search} role="search">
          <button type="button" className={`${styles.segment} ${styles.segmentPrimary}`}>
            <Image src={uiAssets.searchbarHouse.src} alt="" width={48} height={48} className={styles.house} aria-hidden />
            Anywhere
          </button>
          <span className={styles.divider} aria-hidden />
          <button type="button" className={`${styles.segment} ${styles.segmentPrimary}`}>
            Anytime
          </button>
          <span className={styles.divider} aria-hidden />
          <button type="button" className={`${styles.segment} ${styles.segmentMuted}`}>
            Add guests
          </button>
          <button type="button" className={styles.searchButton} aria-label="Search">
            <SearchIcon size={12} />
          </button>
        </div>

        <nav className={styles.nav} aria-label="Site">
          <a className={styles.host} href="#" onClick={preventDefault}>
            Become a host
          </a>
          <button type="button" className={styles.circle} aria-label="Choose a language and currency">
            <Globe size={16} strokeWidth={2.2} aria-hidden focusable={false} />
          </button>
          <button type="button" className={styles.circle} aria-label="Main navigation menu">
            <Menu size={16} strokeWidth={2.4} aria-hidden focusable={false} className={styles.menuIcon} />
          </button>
        </nav>
      </div>
    </header>
  );
}

// The reference's logo / "Become a host" are `href="#"` links that do not navigate.
function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}
