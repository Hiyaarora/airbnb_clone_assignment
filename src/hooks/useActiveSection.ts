"use client";

import { useEffect, useState } from "react";

/** Reference: active link = last section whose top ≤ scrollY + 100 (audit §4). */
const ACTIVE_OFFSET = 100;
/** Reference: the bar appears once scrollY ≥ gallery bottom − 40 (audit §4). */
const SHOW_OFFSET = 40;

interface Options {
  sectionIds: string[];
  /** Element whose bottom edge decides when the sticky nav appears. */
  triggerId: string;
}

/**
 * Scroll spy for the sticky section nav. Local to the nav — not part of the overlay layer.
 */
export function useActiveSection({ sectionIds, triggerId }: Options) {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const trigger = document.getElementById(triggerId);
      const y = window.scrollY;
      if (trigger) {
        const bottom = trigger.getBoundingClientRect().bottom + y;
        setVisible(y >= bottom - SHOW_OFFSET);
      }
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + y <= y + ACTIVE_OFFSET) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sectionIds, triggerId]);

  return { visible, active };
}
