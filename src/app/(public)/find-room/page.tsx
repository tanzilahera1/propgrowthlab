import React, { Suspense } from "react";
import { Metadata } from "next";
import { RentHubClient } from "../rent/RentHubClient";

export const metadata: Metadata = {
  title: "Find Verified Rooms & Co-Living | Doha, Madeira, Dubai | PropGrowth Lab",
  description:
    "Search verified rooms, bedspaces, partitions, and digital nomad co-living stays across Doha (Qatar), Madeira (Portugal), and Dubai (UAE) with anti-cheat tickets and luggage moving assistance.",
  openGraph: {
    title: "Find Verified Rooms & Co-Living | PropGrowth Lab",
    description:
      "Search verified rooms, bedspaces, partitions, and co-living stays across Doha, Madeira & Dubai with anti-cheat tickets.",
    url: "https://propgrowthlab.com/find-room",
    siteName: "PropGrowth Lab",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "PropGrowth Lab",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function FindRoomHubPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-stone-50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-semibold text-stone-500">Loading Find Room Hub...</span>
          </div>
        </div>
      }
    >
      <RentHubClient />
    </Suspense>
  );
}
