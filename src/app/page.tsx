import { AmenitiesGrid } from "@/components/amenities/AmenitiesGrid";
import { AmenitiesModal } from "@/components/amenities/AmenitiesModal";
import { BookingColumn } from "@/components/booking/BookingColumn";
import { HeroGallery } from "@/components/gallery/HeroGallery";
import { SiteHeader } from "@/components/header/SiteHeader";
import { StickySectionNav } from "@/components/header/StickySectionNav";
import { PageShell } from "@/components/layout/PageShell";
import { Calendar } from "@/components/listing/Calendar";
import { Description } from "@/components/listing/Description";
import { MeetHost } from "@/components/listing/MeetHost";
import { GuestFavouriteCard, Highlights, HostRow, Overview } from "@/components/listing/Overview";
import { SleepingArrangements } from "@/components/listing/SleepingArrangements";
import { ThingsToKnow } from "@/components/listing/ThingsToKnow";
import { TitleRow } from "@/components/listing/TitleRow";
import { LocationMap } from "@/components/location/LocationMap";
import { Lightbox } from "@/components/lightbox/Lightbox";
import { PhotoTour } from "@/components/photo-tour/PhotoTour";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { SimilarStays } from "@/components/similar/SimilarStays";
import { listing } from "@/data/listing";
import { heroPhotos, photoById, photos, rooms } from "@/data/photos";
import { OverlayProvider } from "@/hooks/useOverlayState";
import styles from "./page.module.css";

/** Dates rendered struck-through in the calendar (observed on the reference). */
const UNAVAILABLE_DATES = [
  "2026-11-18",
  "2026-11-19",
  "2026-11-20",
  "2026-11-21",
  "2026-11-22",
  "2026-11-23",
  "2026-11-24",
  "2026-11-29",
  "2026-11-30",
];

export default function ListingPage() {
  return (
    <OverlayProvider photoCount={photos.length}>
      <SiteHeader />
      <StickySectionNav
        price={listing.stay.price}
        nights={listing.stay.nights}
        rating={listing.rating}
        reviewCount={listing.reviewCount}
      />
      <PageShell
        overlays={
          <>
            <PhotoTour rooms={rooms} photos={photos} />
            <Lightbox photos={photos} rooms={rooms} />
            <AmenitiesModal groups={listing.amenityGroups} />
          </>
        }
      >
        <TitleRow title={listing.title} />
        <HeroGallery title={listing.title} photos={heroPhotos} />

        <div className={styles.columns}>
          <div className={styles.left}>
            <Overview title={listing.overviewTitle} meta={listing.meta} />
            <GuestFavouriteCard text={listing.guestFavouriteText} rating={listing.rating} reviewCount={listing.reviewCount} />
            <HostRow name={listing.host.name} avatar={listing.host.avatar} tenure={listing.host.tenure} />
            <Highlights items={listing.highlights} />
            <Description notice={listing.translationNotice} text={listing.description} />
            <SleepingArrangements items={listing.sleeping} photoById={photoById} />
            <AmenitiesGrid items={listing.amenitiesPreview} total={listing.amenityCount} />
            <Calendar
              nights={listing.stay.nights}
              location="Candolim"
              rangeLabel={listing.stay.rangeLabel}
              checkIn={listing.stay.checkIn}
              checkOut={listing.stay.checkOut}
              unavailable={UNAVAILABLE_DATES}
            />
          </div>
          <BookingColumn stay={listing.stay} />
        </div>

        <div className={styles.wide}>
          <ReviewsSection rating={listing.rating} reviewCount={listing.reviewCount} summary={listing.reviewSummary} reviews={listing.reviews} />
          <LocationMap location={listing.location} note={listing.locationText} neighbourhood={listing.neighbourhood} />
          <MeetHost host={listing.host} />
          <ThingsToKnow items={listing.thingsToKnow} />
          <SimilarStays items={listing.similar} />
        </div>
      </PageShell>
    </OverlayProvider>
  );
}
