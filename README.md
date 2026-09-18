# Airbnb Listing Clone

Desktop-only clone of an Airbnb listing page — Listing Page, Photo Tour and Lightbox — built as a take-home assignment.

Live: https://airbnb-clone-olive-kappa.vercel.app

## Tech stack

- Next.js 15 (App Router) · React 19 · TypeScript
- CSS Modules
- Playwright (end-to-end tests)

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

## Tests

```bash
npm run lint
npx tsc --noEmit
npx playwright install chromium   # once
npx playwright test
```

## Structure

```
src/app          Next.js entry
src/components   UI and feature components
src/data         Static listing and photo data
src/hooks        Overlay, keyboard, focus and scroll logic
src/styles       Global styles and design tokens
public/          Images, avatars and UI assets
tests/           Playwright tests
```
