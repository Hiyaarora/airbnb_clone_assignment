import Image from "next/image";
import { PHOTO_QUALITY, coverSizes } from "@/lib/imageSizes";
import type { Photo, SleepingArrangement } from "@/types/listing";
import styles from "./SleepingArrangements.module.css";

interface Props {
  items: SleepingArrangement[];
  photoById: (id: string) => Photo;
}

/** "Where you'll sleep": two 3:2 cards (audit §7.6). */
export function SleepingArrangements({ items, photoById }: Props) {
  return (
    <div className={styles.block}>
      <h2 className={styles.heading}>Where you&apos;ll sleep</h2>
      <div className={styles.grid}>
        {items.map((item) => {
          const photo = photoById(item.photoId);
          return (
            <div key={item.title}>
              <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes={coverSizes(photo, 320, 213)} quality={PHOTO_QUALITY} className={styles.image} />
              <div className={styles.title}>{item.title}</div>
              <div className={styles.detail}>{item.detail}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
