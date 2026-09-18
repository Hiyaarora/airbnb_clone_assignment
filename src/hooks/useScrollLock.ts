"use client";

import { useEffect } from "react";

let lockCount = 0;

/**
 * Ref-counted body scroll lock (`body[data-scroll-locked]` → overflow: hidden). Several
 * overlays can be open at once (tour + lightbox); the page unlocks when the last one closes.
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lockCount += 1;
    document.body.dataset.scrollLocked = "true";
    return () => {
      lockCount -= 1;
      if (lockCount === 0) delete document.body.dataset.scrollLocked;
    };
  }, [active]);
}
