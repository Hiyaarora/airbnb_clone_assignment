"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Reference toast: enters in .2s, stays ≈1.8s, fades out (audit §13). */
const VISIBLE_MS = 1800;

/**
 * Transient status message. Local to whichever feature triggers it (the title row's
 * Share/Save) — intentionally not part of the overlay provider.
 */
export function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const timer = useRef<number | null>(null);

  const show = useCallback((text: string) => {
    if (timer.current) window.clearTimeout(timer.current);
    setMessage(text);
    setVisible(true);
    timer.current = window.setTimeout(() => setVisible(false), VISIBLE_MS);
  }, []);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  return { message, visible, show };
}
