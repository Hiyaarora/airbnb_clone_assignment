"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function focusables(root: HTMLElement): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
    (el) => !el.hasAttribute("inert") && el.offsetParent !== null && !el.closest("[inert]"),
  );
}

/**
 * Accessibility layer the reference lacks (docs/implementation-notes.md → deviations):
 * - on activation, remembers the opener and moves focus to `initialFocus` (or the first
 *   focusable control);
 * - keeps Tab / Shift+Tab inside `ref` while active;
 * - on deactivation, restores focus to the opener (if it is still in the document).
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  initialFocus?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!active) return;
    const root = ref.current;
    if (!root) return;
    const opener = document.activeElement as HTMLElement | null;

    const target = initialFocus?.current ?? focusables(root)[0] ?? root;
    // Move focus now (styles are already applied when effects run); `preventScroll` keeps the
    // open transition steady. Retry once on the next frame in case the target was not yet
    // focusable. No dependence on rAF alone: hidden tabs never fire it.
    target.focus({ preventScroll: true });
    const raf = requestAnimationFrame(() => {
      if (document.activeElement !== target && root.isConnected) target.focus({ preventScroll: true });
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = focusables(root);
      if (items.length === 0) {
        event.preventDefault();
        root.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement as HTMLElement | null;
      if (event.shiftKey && (current === first || !root.contains(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || !root.contains(current))) {
        event.preventDefault();
        first.focus();
      }
    };
    root.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("keydown", onKeyDown);
      // Deferred to a microtask: sibling cleanups (dialog stack → `inert` removal) run in the
      // same synchronous commit and must finish first, otherwise the opener is still inert.
      // A microtask (unlike rAF) also runs in a hidden tab.
      if (opener && typeof opener.focus === "function") {
        queueMicrotask(() => {
          if (opener.isConnected) opener.focus({ preventScroll: true });
        });
      }
    };
  }, [ref, active, initialFocus]);
}
