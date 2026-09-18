import type { ReactNode } from "react";
import styles from "./PageShell.module.css";

/**
 * Page frame: `<main>` with the reference's 1280px / 80px-gutter container (the skip link
 * lives in the root layout so it is the first tab stop).
 * Overlays (Photo Tour, Lightbox, modals) are rendered as siblings of `<main>` so they can be
 * made `inert` independently.
 */
export function PageShell({ children, overlays }: { children: ReactNode; overlays?: ReactNode }) {
  return (
    <>
      <main id="main" className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>
      {overlays}
    </>
  );
}
