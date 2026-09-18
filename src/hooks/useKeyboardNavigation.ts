"use client";

import { useEffect } from "react";

interface Handlers {
  onPrevious: () => void;
  onNext: () => void;
}

/**
 * ArrowLeft / ArrowRight for the lightbox while it is open. Escape is handled by the
 * Dialog primitive (top-most dialog only), so it is deliberately not duplicated here.
 */
export function useKeyboardNavigation(active: boolean, { onPrevious, onNext }: Handlers) {
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active, onPrevious, onNext]);
}
