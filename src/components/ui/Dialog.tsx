"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode, type RefObject } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useScrollLock } from "@/hooks/useScrollLock";
import { isTopDialog, popDialog, pushDialog } from "./dialogStack";

interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, "role"> {
  open: boolean;
  label: string;
  onClose: () => void;
  children: ReactNode;
  /** Element to receive focus on open (defaults to the first focusable control). */
  initialFocusRef?: RefObject<HTMLElement | null>;
}

/**
 * Modal dialog shell. Always mounted (so open/close transitions can run); `open` toggles
 * visibility, scroll lock, focus trap/restore, `inert` on the rest of the page and Escape.
 * Escape only fires for the top-most open dialog.
 */
export function Dialog({ open, label, onClose, children, initialFocusRef, ...rest }: DialogProps) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollLock(open);
  useFocusTrap(ref, open, initialFocusRef);

  useEffect(() => {
    const el = ref.current;
    if (!open || !el) return;
    pushDialog(el);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isTopDialog(el)) {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      popDialog(el);
    };
  }, [open, onClose]);

  return (
    <div ref={ref} role="dialog" aria-modal="true" aria-label={label} aria-hidden={!open} tabIndex={-1} data-open={open} {...rest}>
      {children}
    </div>
  );
}
