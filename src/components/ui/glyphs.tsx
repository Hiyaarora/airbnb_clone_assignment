import type { ReactNode } from "react";

/**
 * Hand-drawn line glyphs matching the reference's amenity / highlight / review / policy icons
 * (32×32 viewBox, 1.6px strokes, round joins). Only icons visible on the listing page are
 * drawn here; anything else falls back to lucide in FeatureIcon.
 */
export const GLYPHS: Record<string, ReactNode> = {
  // ---- highlights -------------------------------------------------------------------------
  outdoor: (
    <>
      <path d="M4 15c2.5-6 7-9 12-9s9.5 3 12 9H4z" />
      <path d="M16 6v20M9 26h14" />
      <path d="M12 15c.5-5 2-8.5 4-9M20 15c-.5-5-2-8.5-4-9" />
    </>
  ),
  cooling: (
    <>
      <circle cx={16} cy={16} r={2.2} />
      <path d="M16 13.8c-1-3.5-.5-6.8 1.6-8.6 2.4-2 5.8-.3 5.4 2.4-.3 2.3-3 4-7 6.2z" />
      <path d="M18.2 16c3.5-1 6.8-.5 8.6 1.6 2 2.4.3 5.8-2.4 5.4-2.3-.3-4-3-6.2-7z" />
      <path d="M16 18.2c1 3.5.5 6.8-1.6 8.6-2.4 2-5.8.3-5.4-2.4.3-2.3 3-4 7-6.2z" />
      <path d="M13.8 16c-3.5 1-6.8.5-8.6-1.6-2-2.4-.3-5.8 2.4-5.4 2.3.3 4 3 6.2 7z" />
    </>
  ),
  checkin: (
    <>
      <path d="M8 4h16v24H8z" />
      <path d="M8 4l10 3v22l-10-3" />
      <circle cx={15} cy={17} r={1} fill="currentColor" stroke="none" />
    </>
  ),
  // ---- amenities --------------------------------------------------------------------------
  kitchen: (
    <>
      <path d="M8 3v8M5 3v6a3 3 0 0 0 6 0V3M8 11v18" />
      <path d="M15 3v26M15 3c3 0 4 4 4 8s-1 6-4 6" />
      <path d="M25 3c-2.5 0-4 3-4 6.5S22.5 15 25 15s4-2.5 4-5.5S27.5 3 25 3zM25 15v14" />
    </>
  ),
  wifi: (
    <>
      <path d="M3 12c7.5-6.5 18.5-6.5 26 0" />
      <path d="M7.5 17c5-4.3 12-4.3 17 0" />
      <path d="M12 22c2.4-2 5.6-2 8 0" />
      <circle cx={16} cy={26.5} r={1.4} fill="currentColor" stroke="none" />
    </>
  ),
  workspace: (
    <>
      <path d="M3 17h26M5 17v9M27 17v9M5 26h22" />
      <path d="M11 17v-4h10v4" />
      <path d="M21 9a3 3 0 0 1 3 3v1h-6v-1a3 3 0 0 1 3-3zM21 13v4" />
      <path d="M10 13H8" />
    </>
  ),
  parking: (
    <>
      <path d="M4 20l2.5-8a3 3 0 0 1 2.9-2h13.2a3 3 0 0 1 2.9 2l2.5 8" />
      <path d="M3 20h26v6H3zM6 26v3M26 26v3" />
      <circle cx={9} cy={23} r={1.3} fill="currentColor" stroke="none" />
      <circle cx={23} cy={23} r={1.3} fill="currentColor" stroke="none" />
      <path d="M12 23h8" />
    </>
  ),
  pool: (
    <>
      <path d="M9 22V6a2 2 0 0 1 4 0v3M21 22V6a2 2 0 0 1 4 0v3" />
      <path d="M9 12h12M9 17h12" />
      <path d="M3 25c2.2 0 2.2 2 4.4 2s2.2-2 4.4-2 2.2 2 4.4 2 2.2-2 4.4-2 2.2 2 4.4 2 2.2-2 4-2" />
      <path d="M3 29c2.2 0 2.2 2 4.4 2s2.2-2 4.4-2 2.2 2 4.4 2 2.2-2 4.4-2 2.2 2 4.4 2 2.2-2 4-2" />
    </>
  ),
  "hot-tub": (
    <>
      <path d="M4 16h24l-2 11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" />
      <path d="M8 16v-5a3 3 0 0 1 6 0v1M11 8V6" />
      <path d="M17 12c0-2 1.5-2 1.5-4S17 6 17 4M21 12c0-2 1.5-2 1.5-4S21 6 21 4M25 12c0-2 1.5-2 1.5-4S25 6 25 4" />
    </>
  ),
  pets: (
    <>
      <ellipse cx={9.5} cy={12} rx={2.6} ry={3.4} />
      <ellipse cx={22.5} cy={12} rx={2.6} ry={3.4} />
      <ellipse cx={4.5} cy={19} rx={2.2} ry={3} />
      <ellipse cx={27.5} cy={19} rx={2.2} ry={3} />
      <path d="M16 17c3.5 0 7 4 7 7.5 0 2-1.5 3.5-3.5 3.5-1.4 0-2.3-.8-3.5-.8s-2.1.8-3.5.8C10.5 28 9 26.5 9 24.5c0-3.5 3.5-7.5 7-7.5z" />
    </>
  ),
  camera: (
    <>
      <path d="M5 14l16-6 2 5-16 6z" />
      <path d="M10 19l-1 4h-3" />
      <path d="M21 13l3-1 1.5 4-3 1" />
      <path d="M25 12l3-1" />
      <circle cx={13} cy={13.5} r={1.2} fill="currentColor" stroke="none" />
    </>
  ),
  "co-alarm": (
    <>
      <rect x={5} y={5} width={22} height={22} rx={2} />
      <path d="M5 5l22 22" />
      <path d="M11 13v6M21 13v6M11 16h4" />
    </>
  ),
  "smoke-alarm": (
    <>
      <circle cx={16} cy={16} r={11} />
      <circle cx={16} cy={16} r={4} />
      <path d="M5 5l22 22" />
    </>
  ),
  // ---- review categories ------------------------------------------------------------------
  spray: (
    <>
      <path d="M10 13h8l3 15H7z" />
      <path d="M12 13V9h4v4M14 9V6h6" />
      <path d="M20 6h3M24 3l2-1M24 6h3M24 9l2 1" />
    </>
  ),
  "check-circle": (
    <>
      <circle cx={16} cy={16} r={12} />
      <path d="M10 16.5l4 4 8-9" />
    </>
  ),
  key: (
    <>
      <circle cx={11} cy={11} r={7} />
      <circle cx={9.5} cy={9.5} r={1.5} fill="currentColor" stroke="none" />
      <path d="M16 16l12 12M24 24l-3 3M21 21l-3 3" />
    </>
  ),
  chat: (
    <>
      <path d="M5 6h22a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-9l-6 5v-5H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
    </>
  ),
  map: (
    <>
      <path d="M3 7l9-3 8 3 9-3v21l-9 3-8-3-9 3z" />
      <path d="M12 4v21M20 7v21" />
    </>
  ),
  tag: (
    <>
      <path d="M4 5h11l14 14-11 11L4 16z" />
      <circle cx={10} cy={11} r={2} />
    </>
  ),
  // ---- things to know / host ------------------------------------------------------------
  calendar: (
    <>
      <rect x={4} y={6} width={24} height={22} rx={2} />
      <path d="M4 12h24M10 3v6M22 3v6" />
      <path d="M12.5 17l7 7M19.5 17l-7 7" />
    </>
  ),
  rules: (
    <>
      <circle cx={11} cy={11} r={7} />
      <circle cx={9.5} cy={9.5} r={1.5} fill="currentColor" stroke="none" />
      <path d="M16 16l12 12M24 24l-3 3M21 21l-3 3" />
    </>
  ),
  safety: (
    <>
      <path d="M16 3l11 4v9c0 6.5-4.5 11.5-11 13C9.5 27.5 5 22.5 5 16V7z" />
      <path d="M16 3v26" />
    </>
  ),
  cake: (
    <>
      <path d="M5 28V17a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3v11" />
      <path d="M3 28h26" />
      <path d="M5 21c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2 2-2 2-2" />
      <path d="M11 14v-4M16 14V9M21 14v-4" />
      <path d="M11 7c0-1 1-2 1-2s1 1 1 2a1 1 0 0 1-2 0zM15 6c0-1 1-2.5 1-2.5S17 5 17 6a1 1 0 0 1-2 0zM20 7c0-1 1-2 1-2s1 1 1 2a1 1 0 0 1-2 0z" />
    </>
  ),
  graduation: (
    <>
      <path d="M3 13l13-6 13 6-13 6z" />
      <path d="M8 15.5v6c2 2.5 5 4 8 4s6-1.5 8-4v-6" />
      <path d="M29 13v8" />
    </>
  ),
  lock: (
    <>
      <path d="M8 14V10a8 8 0 0 1 16 0v4" />
      <rect x={5} y={14} width={22} height={15} rx={2} />
    </>
  ),
};
