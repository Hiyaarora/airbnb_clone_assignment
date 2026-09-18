import type { SVGProps } from "react";

/**
 * Hand-drawn icons for the brand and shape-critical glyphs (the ones where a generic icon
 * would read as "wrong" next to the reference). Generic line icons come from lucide-react.
 */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number | undefined, fallback: number) => ({
  width: size ?? fallback,
  height: size ?? fallback,
  role: "presentation" as const,
  "aria-hidden": true,
  focusable: false,
});

/**
 * Airbnb logo (bélo + wordmark). Vector from the public Wikimedia Commons file
 * "Airbnb Logo Bélo.svg" (official brand mark, used here only to identify the clone);
 * rendered at 103×32 in `currentColor`, matching the reference header (audit §3).
 */
export function AirbnbLogo({ height = 32, ...props }: SVGProps<SVGSVGElement> & { height?: number }) {
  const width = Math.round((height * 320.1) / 99.9);
  return (
    <svg viewBox="0 0 320.1 99.9" width={width} height={height} fill="currentColor" role="presentation" aria-hidden focusable={false} {...props}>
      <path d="M168.7,25.1c0,3.6-2.9,6.5-6.5,6.5s-6.5-2.9-6.5-6.5s2.8-6.5,6.5-6.5C165.9,18.7,168.7,21.6,168.7,25.1z M141.9,38.2c0,0.6,0,1.6,0,1.6s-3.1-4-9.7-4c-10.9,0-19.4,8.3-19.4,19.8c0,11.4,8.4,19.8,19.4,19.8c6.7,0,9.7-4.1,9.7-4.1v1.7 c0,0.8,0.6,1.4,1.4,1.4h8.1V36.8c0,0-7.4,0-8.1,0C142.5,36.8,141.9,37.5,141.9,38.2z M141.9,62.3c-1.5,2.2-4.5,4.1-8.1,4.1 c-6.4,0-11.3-4-11.3-10.8s4.9-10.8,11.3-10.8c3.5,0,6.7,2,8.1,4.1V62.3z M157.4,36.8h9.6v37.6h-9.6V36.8z M300.8,35.8 c-6.6,0-9.7,4-9.7,4V18.7h-9.6v55.7c0,0,7.4,0,8.1,0c0.8,0,1.4-0.7,1.4-1.4v-1.7l0,0c0,0,3.1,4.1,9.7,4.1c10.9,0,19.4-8.4,19.4-19.8 C320.1,44.2,311.6,35.8,300.8,35.8z M299.2,66.3c-3.7,0-6.6-1.9-8.1-4.1V48.8c1.5-2,4.7-4.1,8.1-4.1c6.4,0,11.3,4,11.3,10.8 S305.6,66.3,299.2,66.3z M276.5,52.1v22.4h-9.6V53.2c0-6.2-2-8.7-7.4-8.7c-2.9,0-5.9,1.5-7.8,3.7v26.2h-9.6V36.8h7.6 c0.8,0,1.4,0.7,1.4,1.4v1.6c2.8-2.9,6.5-4,10.2-4c4.2,0,7.7,1.2,10.5,3.6C275.2,42.2,276.5,45.8,276.5,52.1z M218.8,35.8 c-6.6,0-9.7,4-9.7,4V18.7h-9.6v55.7c0,0,7.4,0,8.1,0c0.8,0,1.4-0.7,1.4-1.4v-1.7l0,0c0,0,3.1,4.1,9.7,4.1c10.9,0,19.4-8.4,19.4-19.8 C238.2,44.2,229.7,35.8,218.8,35.8z M217.2,66.3c-3.7,0-6.6-1.9-8.1-4.1V48.8c1.5-2,4.7-4.1,8.1-4.1c6.4,0,11.3,4,11.3,10.8 S223.6,66.3,217.2,66.3z M191.2,35.8c2.9,0,4.4,0.5,4.4,0.5v8.9c0,0-8-2.7-13,3v26.3h-9.6V36.8c0,0,7.4,0,8.1,0 c0.8,0,1.4,0.7,1.4,1.4v1.6C184.3,37.7,188.2,35.8,191.2,35.8z M91.5,71c-0.5-1.2-1-2.5-1.5-3.6c-0.8-1.8-1.6-3.5-2.3-5.1l-0.1-0.1 c-6.9-15-14.3-30.2-22.1-45.2l-0.3-0.6c-0.8-1.5-1.6-3.1-2.4-4.7c-1-1.8-2-3.7-3.6-5.5C56,2.2,51.4,0,46.5,0c-5,0-9.5,2.2-12.8,6 c-1.5,1.8-2.6,3.7-3.6,5.5c-0.8,1.6-1.6,3.2-2.4,4.7l-0.3,0.6C19.7,31.8,12.2,47,5.3,62l-0.1,0.2c-0.7,1.6-1.5,3.3-2.3,5.1 c-0.5,1.1-1,2.3-1.5,3.6c-1.3,3.7-1.7,7.2-1.2,10.8c1.1,7.5,6.1,13.8,13,16.6c2.6,1.1,5.3,1.6,8.1,1.6c0.8,0,1.8-0.1,2.6-0.2 c3.3-0.4,6.7-1.5,10-3.4c4.1-2.3,8-5.6,12.4-10.4c4.4,4.8,8.4,8.1,12.4,10.4c3.3,1.9,6.7,3,10,3.4c0.8,0.1,1.8,0.2,2.6,0.2 c2.8,0,5.6-0.5,8.1-1.6c7-2.8,11.9-9.2,13-16.6C93.2,78.2,92.8,74.7,91.5,71z M46.4,76.2c-5.4-6.8-8.9-13.2-10.1-18.6 c-0.5-2.3-0.6-4.3-0.3-6.1c0.2-1.6,0.8-3,1.6-4.2c1.9-2.7,5.1-4.4,8.8-4.4c3.7,0,7,1.6,8.8,4.4c0.8,1.2,1.4,2.6,1.6,4.2 c0.3,1.8,0.2,3.9-0.3,6.1C55.3,62.9,51.8,69.3,46.4,76.2z M86.3,80.9c-0.7,5.2-4.2,9.7-9.1,11.7c-2.4,1-5,1.3-7.6,1 c-2.5-0.3-5-1.1-7.6-2.6c-3.6-2-7.2-5.1-11.4-9.7c6.6-8.1,10.6-15.5,12.1-22.1c0.7-3.1,0.8-5.9,0.5-8.5c-0.4-2.5-1.3-4.8-2.7-6.8 c-3.1-4.5-8.3-7.1-14.1-7.1s-11,2.7-14.1,7.1c-1.4,2-2.3,4.3-2.7,6.8c-0.4,2.6-0.3,5.5,0.5,8.5c1.5,6.6,5.6,14.1,12.1,22.2 c-4.1,4.6-7.8,7.7-11.4,9.7c-2.6,1.5-5.1,2.3-7.6,2.6c-2.7,0.3-5.3-0.1-7.6-1c-4.9-2-8.4-6.5-9.1-11.7c-0.3-2.5-0.1-5,0.9-7.8 c0.3-1,0.8-2,1.3-3.2c0.7-1.6,1.5-3.3,2.3-5l0.1-0.2c6.9-14.9,14.3-30.1,22-44.9l0.3-0.6c0.8-1.5,1.6-3.1,2.4-4.6 c0.8-1.6,1.7-3.1,2.8-4.4c2.1-2.4,4.9-3.7,8-3.7c3.1,0,5.9,1.3,8,3.7c1.1,1.3,2,2.8,2.8,4.4c0.8,1.5,1.6,3.1,2.4,4.6l0.3,0.6 C67.7,34.8,75.1,50,82,64.9L82,65c0.8,1.6,1.5,3.4,2.3,5c0.5,1.2,1,2.2,1.3,3.2C86.4,75.8,86.7,78.3,86.3,80.9z" />
    </svg>
  );
}

/** Airbnb-style share glyph: open box with an arrow rising out of it. */
export function ShareIcon({ size, strokeWidth = 2.2, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...base(size, 16)} {...props}>
      <path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9M16 3v20M16 3l-7 7M16 3l7 7" />
    </svg>
  );
}

export function HeartIcon({ size, filled = false, strokeWidth = 2.2, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" {...base(size, 16)} {...props}>
      <path d="M16 28c-.4 0-.8-.1-1.1-.4C7.4 21.4 3 16.9 3 11.3 3 7.2 6.2 4 10.3 4c2.4 0 4.6 1.2 5.7 3.2C17.1 5.2 19.3 4 21.7 4 25.8 4 29 7.2 29 11.3c0 5.6-4.4 10.1-11.9 16.3-.3.3-.7.4-1.1.4z" />
    </svg>
  );
}

/** 3×3 dots grid used by "Show all photos" and the lightbox grid button. */
export function DotsGridIcon({ size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...base(size, 15)} {...props}>
      {[2, 8, 14].flatMap((y) => [2, 8, 14].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r={1.6} />))}
    </svg>
  );
}

export function StarIcon({ size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" {...base(size, 10)} {...props}>
      <path d="M15.09 1.55a1 1 0 0 1 1.82 0l3.65 8.03 8.77 1.04a1 1 0 0 1 .56 1.73l-6.48 6 1.72 8.66a1 1 0 0 1-1.47 1.07L16 23.75l-7.66 4.33a1 1 0 0 1-1.47-1.07l1.72-8.66-6.48-6a1 1 0 0 1 .56-1.73l8.77-1.04z" />
    </svg>
  );
}

/** Laurel branch (left side); mirror with `transform: scaleX(-1)` for the right side. */
export function LaurelIcon({ size, ...props }: IconProps & { size?: number }) {
  return (
    <svg viewBox="0 0 20 32" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" width={size ? size * 0.625 : 22.5} height={size ?? 36} role="presentation" aria-hidden focusable={false} {...props}>
      <path d="M14.5 30.5C8.5 25.5 6 19.5 6.5 12.5 7 8 9.5 4.5 13.5 2" />
      <path d="M6.6 12.4C4.4 11.2 3.3 8.4 4 5.6c2.4.9 3.8 3.4 3.4 6.2" />
      <path d="M6.6 17.6c-2.5-.2-4.4-2.3-4.8-5 2.6-.1 4.7 1.7 5.2 4.4" />
      <path d="M8.2 22.4c-2.5.6-4.9-.7-6-3.2 2.5-.8 5 .3 6.2 2.7" />
      <path d="M11 26.6c-2.3 1.2-5.1.5-6.8-1.7 2.2-1.4 5-1 6.9 1" />
      <path d="M6.6 12.4c1.3-2.4 4-3.7 6.9-3.2-.7 2.6-3 4.5-5.8 4.6" />
      <path d="M6.6 17.6c2-1.9 4.8-2.5 7.5-1.6-1.4 2.4-4.1 3.7-6.9 3.2" />
      <path d="M8.2 22.4c2.5-1.2 5.4-.9 7.5.8-2 2.1-4.9 2.8-7.5 1.9" />
      <path d="M11 26.6c2.6-.6 5.3.3 7 2.3-2.5 1.6-5.4 1.5-7.5-.1" />
    </svg>
  );
}

/** Magnifier drawn to match the reference's 32px red search button glyph. */
export function SearchIcon({ size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={5} strokeLinecap="round" {...base(size, 12)} {...props}>
      <circle cx={13} cy={13} r={8.5} />
      <path d="M19.5 19.5l8 8" />
    </svg>
  );
}

/** Small keyboard glyph shown under the calendar (decorative). */
export function KeyboardIcon({ size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" width={size ?? 20} height={(size ?? 20) * 0.7} role="presentation" aria-hidden focusable={false} {...props}>
      <path d="M4 4h1M8 4h1M12 4h1M16 4h1M4 7h1M8 7h1M12 7h1M16 7h1M6 10h9" />
    </svg>
  );
}

/** Airbnb-style house marker glyph used in the map pin. */
export function HouseIcon({ size, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...base(size, 26)} {...props}>
      <path d="M5 14 16 5l11 9v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
      <path d="M13 27v-8h6v8" />
    </svg>
  );
}
