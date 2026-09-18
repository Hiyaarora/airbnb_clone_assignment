import styles from "./Toast.module.css";

/** Bottom-centre dark pill (`role="status"`), always mounted so the exit fade can play. */
export function Toast({ message, visible }: { message: string | null; visible: boolean }) {
  return (
    <div role="status" aria-live="polite" className={styles.toast} data-visible={visible}>
      {message}
    </div>
  );
}
