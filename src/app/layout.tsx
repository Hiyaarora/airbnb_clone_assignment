import type { Metadata } from "next";
import "./globals.css";
import { SkipLink } from "@/components/layout/SkipLink";
import { listing } from "@/data/listing";

export const metadata: Metadata = {
  title: `${listing.title} - ${listing.propertyType} for Rent in ${listing.location} - Airbnb`,
  description: listing.description.slice(0, 160),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
