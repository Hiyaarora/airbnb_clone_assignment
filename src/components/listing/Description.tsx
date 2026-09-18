"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import styles from "./Description.module.css";

interface Props {
  notice: string;
  text: string;
}

/**
 * Translation notice + description clamped to ~4 lines with a gradient mask; "Show more"
 * toggles instantly to "Show less" (audit §7.5).
 */
export function Description({ notice, text }: Props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={styles.block}>
      <div className={styles.notice}>
        <span>
          {notice}{" "}
          <a href="#" className={styles.noticeLink} onClick={(e) => e.preventDefault()}>
            Show original
          </a>
        </span>
      </div>
      <p className={styles.text} data-expanded={expanded}>
        {text}
      </p>
      <button type="button" className={styles.toggle} aria-expanded={expanded} onClick={() => setExpanded((v) => !v)}>
        {expanded ? "Show less" : "Show more"}
        <ChevronRight size={14} strokeWidth={2.5} aria-hidden focusable={false} className={styles.chevron} />
      </button>
    </div>
  );
}
