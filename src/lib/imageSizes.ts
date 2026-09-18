/**
 * Helpers for `next/image` so optimized sources are never upscaled.
 *
 * `next/image` picks a source by *width* (`sizes`), but an `object-fit: cover` crop in a box
 * that is taller than the photo's aspect ratio needs a source wide enough to cover the box
 * *height*. `coverSizes` returns the width that covers both dimensions at 1× so the browser
 * selects the next larger optimizer breakpoint instead of stretching a smaller one.
 */
export const PHOTO_QUALITY = 90;

interface Dimensions {
  width: number;
  height: number;
}

export function coverSizes(photo: Dimensions, boxWidth: number, boxHeight: number): string {
  const widthForHeight = boxHeight * (photo.width / photo.height);
  return `${Math.ceil(Math.max(boxWidth, widthForHeight))}px`;
}
