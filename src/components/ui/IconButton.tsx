import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import styles from "./IconButton.module.css";

type Variant = "ghost" | "outline";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** React 19: ref is a regular prop. */
  ref?: Ref<HTMLButtonElement>;
  label: string;
  children: ReactNode;
  /** ghost: transparent → #F2F2F2 on hover (tour/lightbox/modal); outline: 1px border (lightbox arrows). */
  variant?: Variant;
}

/** 40px circular icon button, matching the reference's icon circles. */
export function IconButton({ label, children, variant = "ghost", className, type = "button", ...rest }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={[styles.button, styles[variant], className ?? ""].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
