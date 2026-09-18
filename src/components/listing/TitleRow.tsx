"use client";

import { useState } from "react";
import { HeartIcon, ShareIcon } from "@/components/ui/icons";
import { Toast } from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";
import styles from "./TitleRow.module.css";

/**
 * h1 + Share/Save (audit §5). Share shows the "Share options" toast; Save toggles the heart
 * and label with "Saved to wishlist" / "Removed from wishlist" toasts. Saved state is local
 * and in-memory, as in the reference.
 */
export function TitleRow({ title }: { title: string }) {
  const [saved, setSaved] = useState(false);
  const toast = useToast();

  const onSave = () => {
    const next = !saved;
    setSaved(next);
    toast.show(next ? "Saved to wishlist" : "Removed from wishlist");
  };

  return (
    <section id="photos" className={styles.row}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.actions}>
        <button type="button" className={styles.action} onClick={() => toast.show("Share options")}>
          <ShareIcon size={16} />
          <span className={styles.label}>Share</span>
        </button>
        <button type="button" className={styles.action} aria-pressed={saved} onClick={onSave}>
          <HeartIcon size={16} filled={saved} className={saved ? styles.heartSaved : undefined} />
          <span className={styles.label}>{saved ? "Saved" : "Save"}</span>
        </button>
      </div>
      <Toast message={toast.message} visible={toast.visible} />
    </section>
  );
}
