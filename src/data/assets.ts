/**
 * UI illustrations (not listing content). Kept here so no component hard-codes an image
 * path — see docs/asset-inventory.md §4 for provenance.
 */
export interface UiAsset {
  src: string;
  width: number;
  height: number;
}

export const uiAssets = {
  searchbarHouse: { src: "/ui/searchbar-house.png", width: 240, height: 216 },
  discountTag: { src: "/ui/discount.svg", width: 148, height: 148 },
  laurelLeft: { src: "/ui/laurel-left.png", width: 240, height: 365 },
  laurelRight: { src: "/ui/laurel-right.png", width: 240, height: 365 },
} satisfies Record<string, UiAsset>;
