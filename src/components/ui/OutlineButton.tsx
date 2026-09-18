import type { ButtonHTMLAttributes } from "react";
import styles from "./OutlineButton.module.css";

/**
 * "Show all 50 amenities" / "Show all 19 reviews" style button:
 * 1px #222 border, 12px radius, 16px/500, 13px 23px padding, hover #F7F7F7 (audit §7.7, §9).
 */
export function OutlineButton({ className, type = "button", ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={[styles.button, className ?? ""].join(" ")} {...rest} />;
}
