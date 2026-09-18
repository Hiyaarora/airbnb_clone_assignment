"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { RoomId } from "@/types/listing";

/**
 * Overlay management layer — the only shared state in the app. Owns:
 * - Photo Tour open state + the room it should scroll to on open
 * - Lightbox open state + current photo index
 * - Amenities modal open state
 * - URL/history synchronisation for tour + lightbox (reference behaviour, audit §10–11):
 *     open tour      → pushState  ?modal=PHOTO_TOUR_SCROLLABLE
 *     open lightbox  → pushState  &modalItem=1000+index
 *     prev / next    → replaceState modalItem
 *     close          → history.back() (so the browser Back button closes overlays too);
 *                      when the overlay came from a deep link there is no entry to pop, so
 *                      the parameter is removed with replaceState instead
 *     popstate       → state is re-derived from the URL
 *     initial URL    → overlays restored on mount (deep-link / reload)
 * Feature state (saved, toast, carousel, expand/collapse) stays local to its component.
 */

export const TOUR_PARAM = "modal";
export const TOUR_VALUE = "PHOTO_TOUR_SCROLLABLE";
export const ITEM_PARAM = "modalItem";
export const ITEM_BASE = 1000;

export interface TourTarget {
  /** Room whose section should be aligned to the top of the tour on open; null = top. */
  room: RoomId | null;
  /** Changes on every open so the tour re-applies the scroll even for the same room. */
  key: number;
}

interface OverlayState {
  tourOpen: boolean;
  tourTarget: TourTarget;
  lightboxIndex: number | null;
  amenitiesOpen: boolean;
  photoCount: number;
  openTour: (room?: RoomId | null) => void;
  closeTour: () => void;
  openLightbox: (index: number) => void;
  closeLightbox: () => void;
  setLightboxIndex: (index: number) => void;
  openAmenities: () => void;
  closeAmenities: () => void;
}

const OverlayContext = createContext<OverlayState | null>(null);

function readUrl(): { tourOpen: boolean; lightboxIndex: number | null } {
  const params = new URLSearchParams(window.location.search);
  const tourOpen = params.get(TOUR_PARAM) === TOUR_VALUE;
  const item = params.get(ITEM_PARAM);
  const index = item !== null ? Number(item) - ITEM_BASE : NaN;
  return { tourOpen, lightboxIndex: tourOpen && Number.isInteger(index) && index >= 0 ? index : null };
}

function buildUrl(tourOpen: boolean, lightboxIndex: number | null): string {
  const url = new URL(window.location.href);
  url.searchParams.delete(TOUR_PARAM);
  url.searchParams.delete(ITEM_PARAM);
  if (tourOpen) url.searchParams.set(TOUR_PARAM, TOUR_VALUE);
  if (tourOpen && lightboxIndex !== null) url.searchParams.set(ITEM_PARAM, String(ITEM_BASE + lightboxIndex));
  return url.pathname + url.search + url.hash;
}

export function OverlayProvider({ children, photoCount }: { children: ReactNode; photoCount: number }) {
  const [tourOpen, setTourOpen] = useState(false);
  const [tourTarget, setTourTarget] = useState<TourTarget>({ room: null, key: 0 });
  const [lightboxIndex, setLightboxIndexState] = useState<number | null>(null);
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  /** Number of history entries this layer has pushed that are still "ahead" of the base entry. */
  const pushed = useRef(0);

  // Deep link / reload: restore overlays from the URL once on mount.
  useEffect(() => {
    const initial = readUrl();
    if (initial.tourOpen) {
      setTourOpen(true);
      setTourTarget({ room: null, key: Date.now() });
      if (initial.lightboxIndex !== null && initial.lightboxIndex < photoCount) {
        setLightboxIndexState(initial.lightboxIndex);
      }
    }
  }, [photoCount]);

  // Browser Back/Forward: derive state from the URL.
  useEffect(() => {
    const onPop = () => {
      const next = readUrl();
      pushed.current = Math.max(0, pushed.current - 1);
      setTourOpen((wasOpen) => {
        // Re-opened via Forward: position at the top; otherwise keep the tour's scroll.
        if (!wasOpen && next.tourOpen) setTourTarget({ room: null, key: Date.now() });
        return next.tourOpen;
      });
      setLightboxIndexState(next.lightboxIndex !== null && next.lightboxIndex < photoCount ? next.lightboxIndex : null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [photoCount]);

  const push = useCallback((tour: boolean, index: number | null) => {
    window.history.pushState(null, "", buildUrl(tour, index));
    pushed.current += 1;
  }, []);

  const replace = useCallback((tour: boolean, index: number | null) => {
    window.history.replaceState(null, "", buildUrl(tour, index));
  }, []);

  /** Pops our own entry when there is one, otherwise rewrites the URL in place. */
  const back = useCallback(
    (tour: boolean, index: number | null) => {
      if (pushed.current > 0) {
        window.history.back(); // popstate handler updates state + counter
      } else {
        replace(tour, index);
      }
    },
    [replace],
  );

  const openTour = useCallback(
    (room: RoomId | null = null) => {
      setTourTarget({ room, key: Date.now() });
      if (!tourOpen) {
        setTourOpen(true);
        push(true, null);
      }
    },
    [tourOpen, push],
  );

  const closeTour = useCallback(() => {
    setLightboxIndexState(null);
    setTourOpen(false);
    back(false, null);
  }, [back]);

  const openLightbox = useCallback(
    (index: number) => {
      setLightboxIndexState(index);
      push(true, index);
    },
    [push],
  );

  const closeLightbox = useCallback(() => {
    setLightboxIndexState(null);
    back(true, null);
  }, [back]);

  const setLightboxIndex = useCallback(
    (index: number) => {
      const clamped = Math.min(Math.max(index, 0), photoCount - 1);
      setLightboxIndexState(clamped);
      replace(true, clamped);
    },
    [photoCount, replace],
  );

  const openAmenities = useCallback(() => setAmenitiesOpen(true), []);
  const closeAmenities = useCallback(() => setAmenitiesOpen(false), []);

  const value = useMemo<OverlayState>(
    () => ({
      tourOpen,
      tourTarget,
      lightboxIndex,
      amenitiesOpen,
      photoCount,
      openTour,
      closeTour,
      openLightbox,
      closeLightbox,
      setLightboxIndex,
      openAmenities,
      closeAmenities,
    }),
    [tourOpen, tourTarget, lightboxIndex, amenitiesOpen, photoCount, openTour, closeTour, openLightbox, closeLightbox, setLightboxIndex, openAmenities, closeAmenities],
  );
  return <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>;
}

export function useOverlayState(): OverlayState {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error("useOverlayState must be used inside <OverlayProvider>");
  return ctx;
}
