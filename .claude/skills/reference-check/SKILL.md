---
name: reference-check
description: Use before implementing or changing any UI section, interaction or animation in this project. Looks up the documented reference behaviour and measurements (docs/reference-*.md) for the area being built so the implementation follows the observed reference instead of memory or "standard Airbnb" assumptions.
---

# Reference check

The reference application is the specification. Never implement from memory of Airbnb.

## Procedure

1. Identify the area (e.g. "hero gallery", "lightbox next/prev", "sticky nav").
2. Grep the audit docs for it and read the matching sections **in full**:
   - `docs/reference-audit.md` — dimensions, typography, colours, spacing, transitions
   - `docs/reference-interactions.md` — what every control does (or does not do)
   - `docs/reference-states.md` — default / hover / focus / active / disabled / open states
   - `docs/visual-reference-notes.md` — measurement checkpoints, anomalies, uncertainties
   - `docs/reference-measurements/rendered-dom-1280x576.txt` — raw per-element geometry and
     computed styles at 1280×576 (search by visible text or `aria-label`)
3. Write down the exact values you will use (px, colours via tokens, durations, easing) and
   the behaviours (what click/keyboard/URL/focus does) before writing code.
4. If a value is missing or marked as an uncertainty, do **not** guess: open the reference in
   Chrome, measure it, and add the observation to the relevant doc first.
5. Implement, then verify against the same numbers (use the `visual-diff` skill).

## Reminders

- Reference > real Airbnb. Inert controls stay inert; the lightbox stays white; no
  wrap-around; backdrop click does nothing; Escape closes lightbox before tour.
- The only intentional deviations are accessibility ones (focus trap/restore, `inert`
  background) — see `docs/implementation-notes.md`.
- Colours and radii come from `src/styles/tokens.css`; measured one-off dimensions are set
  directly in the component's `.module.css` with a comment pointing to the audit section.
