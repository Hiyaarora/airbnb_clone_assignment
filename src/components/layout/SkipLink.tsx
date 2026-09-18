import styles from "./SkipLink.module.css";

/** First tab stop on the page (rendered as the first child of <body> in the root layout). */
export function SkipLink() {
  return (
    <a className={styles.skipLink} href="#main">
      Skip to content
    </a>
  );
}
