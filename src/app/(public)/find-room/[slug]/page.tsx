import React, { Suspense } from "react";
import { Metadata } from "next";
import { LocalRentClient } from "@/app/(public)/rent/[slug]/LocalRentClient";
import { getAllRentalCitySlugs, getRentalCityConfig } from "@/data/rentalCities";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllRentalCitySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = getRentalCityConfig(slug);

  if (!config) {
    return {
      title: "Find Verified Rooms & Apartments | PropGrowth Lab",
      description:
        "Global room rental network with anti-cheat tickets and luggage moving services across Doha, Madeira, Dubai and Tier-1 hubs.",
    };
  }

  return {
    title: `Find Verified Rooms in ${config.name} (${config.countryName}) | PropGrowth Lab`,
    description: config.heroSubheadline,
    openGraph: {
      title: `${config.flag} Verified Rooms & Bedspaces in ${config.name} - PropGrowth Lab`,
      description: config.heroSubheadline,
      siteName: "PropGrowth Lab Global Rental Network",
      type: "website",
    },
  };
}

async function LocalFindRoomContent({ params }: PageProps) {
  const { slug } = await params;
  const normalizedSlug = (slug || "").toLowerCase();

  return <LocalRentClient slug={normalizedSlug} />;
}

export default function LocalFindRoomPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-stone-50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-semibold text-stone-500">Loading Local Room Portal...</span>
          </div>
        </div>
      }
    >
      <LocalFindRoomContent params={params} />
    </Suspense>
  );
}
