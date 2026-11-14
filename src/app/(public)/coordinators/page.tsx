import React, { Suspense } from "react";
import type { Metadata } from "next";
import CoordinatorsClient from "./CoordinatorsClient";

export const metadata: Metadata = {
  title: "The Coordinator Network | PropGrowth Lab",
  description:
    "Join PropGrowth Lab as an exclusive real estate and room rental coordinator across the USA, UK, Canada, Australia, EU, and UAE. You manage local viewings; keep guaranteed 70% commission (70/30 split).",
  keywords: [
    "real estate coordinator network",
    "exclusive territory coordinator",
    "70-30 commission split",
    "coordinator leads worldwide",
    "property viewing coordinator",
  ],
  alternates: {
    canonical: "https://propgrowthlab.com/coordinators",
  },
  openGraph: {
    title: "The Coordinator Network | PropGrowth Lab",
    description:
      "Coordinate pre-qualified high-budget property leases and rooms on the ground and keep a guaranteed 70% commission.",
    url: "https://propgrowthlab.com/coordinators",
    siteName: "PropGrowth Lab",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "PropGrowth Lab Coordinator Network",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function CoordinatorsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#fbfbfa] flex items-center justify-center py-20">
          <div className="flex items-center gap-2 text-stone-500 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Loading Coordinator Network...</span>
          </div>
        </div>
      }
    >
      <CoordinatorsClient />
    </Suspense>
  );
}
