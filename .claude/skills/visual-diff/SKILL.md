---
name: visual-diff
description: Use after implementing or refining any section to compare our build with the reference measurements. Captures screenshots and a rendered-DOM measurement dump of http://localhost:3000 at 1280/1440/1536/1920 and diffs landmark geometry against docs/visual-reference-notes.md.
---

# Visual diff

## Procedure

1. Build and start the app (`npm run build && npm run start`) or use the dev server.
2. Run the measurement script:

   ```bash
   node tests/visual/measure.mjs                # all viewports, default state
   node tests/visual/measure.mjs --state tour   # photo tour open (scrollTop 0)
   node tests/visual/measure.mjs --state lightbox --index 20
   node tests/visual/measure.mjs --state amenities
   ```

   It writes `tests/visual/out/<state>-<w>x<h>.png` and `<state>-<w>x<h>.txt` (same line
   format as `docs/reference-measurements/rendered-dom-1280x576.txt`: tag, `[x,y,w,h]`, text,
   attributes, non-default computed styles).
3. Compare the 1280×576 dump against the reference dump line-by-line for the area under
   review (`grep` by visible text or aria-label in both files), and the checkpoint table in
   `docs/visual-reference-notes.md` for landmark positions.
4. Open our screenshot next to the matching `docs/reference-screens/*.jpg` and look for
   differences in: header, container width, gallery, title/metadata, columns, booking card,
   typography, spacing, colours, overlays, buttons/icons.
5. Report mismatches as `Area | Ours | Reference | Δ | Priority (P0/P1/P2)` and fix P0 → P1
   → P2. Re-run until the remaining deltas are sub-pixel or explained in
   `docs/implementation-notes.md`.

## Notes

- The reference was measured at DPR 1.5 with a 15px scrollbar (content track 1104.67px at
  1280). Our headless Chromium runs at DPR 1 with no scrollbar (content 1120px at 1280), so
  expect widths to be ~15px larger and x positions to shift accordingly; heights and vertical
  rhythm must match exactly.
- Never "fix" the reference's quirks (chip row clipping, white lightbox, inert buttons).
