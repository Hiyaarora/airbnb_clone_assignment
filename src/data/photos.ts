import type { Photo, Room } from "@/types/listing";

/**
 * Photo tour categories in display order. Amenity captions are shown under each room heading.
 */
export const rooms: Room[] = [
  { id: "living-room-1", name: "Living room 1", amenities: ["Sofa", "Air conditioning", "Ceiling fan", "TV"] },
  { id: "living-room-2", name: "Living room 2", amenities: ["Ceiling fan", "Hot tub"] },
  { id: "full-kitchen", name: "Full kitchen", amenities: ["Freezer", "Fridge", "Blender", "Cooker", "Cooking basics", "Kettle", "Microwave", "Toaster", "Wine glasses", "Coffee", "Crockery and cutlery"] },
  { id: "bedroom", name: "Bedroom", amenities: ["Double bed", "Air conditioning", "Bed linen", "Ceiling fan", "Clothes storage", "Cot", "Hangers", "Iron", "Room-darkening blinds", "Cleaning available during stay", "Cleaning products", "Long-term stays allowed", "Private entrance", "Wifi"] },
  { id: "full-bathroom", name: "Full bathroom", amenities: ["Hairdryer", "Hot water", "Shampoo", "Shower gel"] },
  { id: "gym", name: "Gym", amenities: ["Air conditioning", "Gym", "Exercise equipment", "Ceiling fan"] },
  { id: "exterior", name: "Exterior", amenities: [] },
  { id: "pool", name: "Pool", amenities: ["Pool"] },
  { id: "additional-photos", name: "Additional photos", amenities: [] },
];

/**
 * All 43 listing photos. `order` is the global index used by the Photo Tour and the Lightbox
 * (Lightbox counter = order + 1, URL modalItem = 1000 + order).
 * Files live in /public/photos and keep the reference asset hashes for traceability
 * (see docs/asset-inventory.md).
 */
export const photos: Photo[] = [
  { id: "a9831aeb", src: "/photos/a9831aeb-f441-44f5-a38f-4cf54e3f0fcf.jpeg", alt: "Living room 1", room: "living-room-1", order: 0, width: 1440, height: 1080 },
  { id: "a45feaa2", src: "/photos/a45feaa2-b607-4092-83ac-5fd4b2894959.jpeg", alt: "Living room 1", room: "living-room-1", order: 1, width: 1440, height: 1080 },
  { id: "f1da1c3d", src: "/photos/f1da1c3d-0d10-481e-9b63-c71f9073f30b.jpeg", alt: "Living room 1", room: "living-room-1", order: 2, width: 1440, height: 1080 },
  { id: "090d8b0b", src: "/photos/090d8b0b-b539-42c0-84f8-e1fb0cdf9a93.jpeg", alt: "Living room 2", room: "living-room-2", order: 3, width: 1440, height: 1080 },
  { id: "9be71047", src: "/photos/9be71047-fc52-438a-9270-75cb470f6752.jpeg", alt: "Living room 2", room: "living-room-2", order: 4, width: 1440, height: 1080 },
  { id: "f6de1663", src: "/photos/f6de1663-4e9c-4414-b63b-29a154a92ee1.jpeg", alt: "Living room 2", room: "living-room-2", order: 5, width: 1440, height: 1080 },
  { id: "2367476f", src: "/photos/2367476f-11c4-4a14-a7c6-267be62c1d59.jpeg", alt: "Living room 2", room: "living-room-2", order: 6, width: 1440, height: 1080 },
  { id: "34529829", src: "/photos/34529829-a971-44d3-ac2f-90ea3678a34d.jpeg", alt: "Living room 2", room: "living-room-2", order: 7, width: 1440, height: 1080 },
  { id: "153aa732", src: "/photos/153aa732-4935-48b8-a6fe-b469b6af5efc.jpeg", alt: "Living room 2", room: "living-room-2", order: 8, width: 1440, height: 1080 },
  { id: "3c6e6809", src: "/photos/3c6e6809-1bb1-47a6-8e24-aff593e1c28f.jpeg", alt: "Living room 2", room: "living-room-2", order: 9, width: 1440, height: 1080 },
  { id: "56c44812", src: "/photos/56c44812-52c0-4481-90d8-101ec1f34c7a.jpeg", alt: "Full kitchen", room: "full-kitchen", order: 10, width: 1440, height: 1080 },
  { id: "ddc853d7", src: "/photos/ddc853d7-e658-405c-bedc-8f31106c447e.jpeg", alt: "Full kitchen", room: "full-kitchen", order: 11, width: 1440, height: 1080 },
  { id: "67c61c6f", src: "/photos/67c61c6f-6260-4809-9510-0360e58a345d.jpeg", alt: "Bedroom", room: "bedroom", order: 12, width: 1440, height: 1080 },
  { id: "1c827136", src: "/photos/1c827136-4a85-4fe0-8e69-3fd8ea19bb17.jpeg", alt: "Bedroom", room: "bedroom", order: 13, width: 1440, height: 1080 },
  { id: "0622ab42", src: "/photos/0622ab42-b851-4d55-9d9f-df3143bc5909.jpeg", alt: "Bedroom", room: "bedroom", order: 14, width: 1440, height: 1080 },
  { id: "a74e3c0b", src: "/photos/a74e3c0b-3188-4442-9146-1cd4d6ea45df.jpeg", alt: "Bedroom", room: "bedroom", order: 15, width: 1440, height: 1080 },
  { id: "48a8ffbc", src: "/photos/48a8ffbc-fbf7-4f84-bc29-ee400da3f08b.jpeg", alt: "Bedroom", room: "bedroom", order: 16, width: 1440, height: 1080 },
  { id: "3cf31697", src: "/photos/3cf31697-f3f3-4c60-82c4-029acb119ae4.jpeg", alt: "Bedroom", room: "bedroom", order: 17, width: 1440, height: 1080 },
  { id: "97c78f8a", src: "/photos/97c78f8a-5090-4663-aebc-ba4e13b47092.jpeg", alt: "Full bathroom", room: "full-bathroom", order: 18, width: 1440, height: 1080 },
  { id: "9aa8e65f", src: "/photos/9aa8e65f-94ac-4ba0-9a10-9ec91e536d22.jpeg", alt: "Gym", room: "gym", order: 19, width: 1440, height: 1080 },
  { id: "246bd88d", src: "/photos/246bd88d-4dd6-4117-a401-02a36ebfcf16.jpeg", alt: "Gym", room: "gym", order: 20, width: 1440, height: 1080 },
  { id: "4fede77d", src: "/photos/4fede77d-7a71-446f-89e3-263af937f3fa.jpeg", alt: "Gym", room: "gym", order: 21, width: 1440, height: 1080 },
  { id: "79f59adb", src: "/photos/79f59adb-5a5f-4d6c-8109-1f01f4ca0d03.jpeg", alt: "Gym", room: "gym", order: 22, width: 1440, height: 1080 },
  { id: "f19d8c0a", src: "/photos/f19d8c0a-1d88-42a4-9218-686d4f0db7e4.jpeg", alt: "Gym", room: "gym", order: 23, width: 1440, height: 1080 },
  { id: "23ea6621", src: "/photos/23ea6621-6f74-4baa-acea-2fd03e312b41.jpeg", alt: "Exterior", room: "exterior", order: 24, width: 1440, height: 808 },
  { id: "5adfdf3e", src: "/photos/5adfdf3e-d497-4efc-ab8c-fc559dab311e.jpeg", alt: "Exterior", room: "exterior", order: 25, width: 1440, height: 808 },
  { id: "608748cd", src: "/photos/608748cd-6ee7-4a71-88a2-ba79d3ddba5a.jpeg", alt: "Exterior", room: "exterior", order: 26, width: 1440, height: 808 },
  { id: "5b856fde", src: "/photos/5b856fde-a393-41bf-b373-c9d02e64221f.jpeg", alt: "Exterior", room: "exterior", order: 27, width: 1440, height: 808 },
  { id: "c904e1ab", src: "/photos/c904e1ab-a39d-4ef0-bdea-8c0bd16b9e3d.jpeg", alt: "Exterior", room: "exterior", order: 28, width: 1440, height: 808 },
  { id: "42befad7", src: "/photos/42befad7-fb29-473d-91db-b03e7a544d1d.jpeg", alt: "Exterior", room: "exterior", order: 29, width: 1440, height: 808 },
  { id: "fc02f48f", src: "/photos/fc02f48f-a937-42c5-895d-f9cc3113d6ca.jpeg", alt: "Pool", room: "pool", order: 30, width: 1440, height: 1080 },
  { id: "929545d3", src: "/photos/929545d3-e241-46c0-8a70-c24531ce7b54.jpeg", alt: "Pool", room: "pool", order: 31, width: 1440, height: 1080 },
  { id: "8eb65a8b", src: "/photos/8eb65a8b-e795-4870-b141-6f63b1be24ae.jpeg", alt: "Pool", room: "pool", order: 32, width: 1440, height: 1080 },
  { id: "70325367", src: "/photos/70325367-cbae-4993-b560-18cd3f6edd53.jpeg", alt: "Additional photos", room: "additional-photos", order: 33, width: 1440, height: 1080 },
  { id: "cc7a56bd", src: "/photos/cc7a56bd-242c-498a-9aef-0cffac619e54.jpeg", alt: "Additional photos", room: "additional-photos", order: 34, width: 1440, height: 1080 },
  { id: "30ad93b2", src: "/photos/30ad93b2-293f-494d-b645-626303c6cb93.jpeg", alt: "Additional photos", room: "additional-photos", order: 35, width: 1440, height: 1080 },
  { id: "9642a60d", src: "/photos/9642a60d-e9de-4e1a-89c2-9ebd230f4a74.jpeg", alt: "Additional photos", room: "additional-photos", order: 36, width: 1440, height: 1080 },
  { id: "b6599f26", src: "/photos/b6599f26-d65c-4df0-baf2-ef18c82a86a3.jpeg", alt: "Additional photos", room: "additional-photos", order: 37, width: 1440, height: 1080 },
  { id: "dc01fd46", src: "/photos/dc01fd46-b119-48d3-a43b-f6c093e26eca.jpeg", alt: "Additional photos", room: "additional-photos", order: 38, width: 1440, height: 1080 },
  { id: "fe37b80e", src: "/photos/fe37b80e-da8a-4225-b27b-dfbb5d763c01.jpeg", alt: "Additional photos", room: "additional-photos", order: 39, width: 1440, height: 1080 },
  { id: "3c90338e", src: "/photos/3c90338e-86b4-423f-aae1-279e0ccc3a18.jpeg", alt: "Additional photos", room: "additional-photos", order: 40, width: 1440, height: 1080 },
  { id: "862d936c", src: "/photos/862d936c-0f34-4e50-af87-b519e2781d19.jpeg", alt: "Additional photos", room: "additional-photos", order: 41, width: 1440, height: 1080 },
  { id: "79addceb", src: "/photos/79addceb-8c2d-419b-80ff-e29af426a94c.jpeg", alt: "Additional photos", room: "additional-photos", order: 42, width: 1440, height: 1080 },
];

/** Photos shown in the hero gallery, in grid order (large, top-middle, top-right, bottom-middle, bottom-right). */
export const heroPhotoOrders = [6, 3, 4, 12, 28] as const;

export const heroPhotos: Photo[] = heroPhotoOrders.map((order) => photos[order]);

export const photoById = (id: string): Photo => {
  const photo = photos.find((p) => p.id === id);
  if (!photo) throw new Error(`Unknown photo id: ${id}`);
  return photo;
};
