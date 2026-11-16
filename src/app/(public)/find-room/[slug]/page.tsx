import React, { Suspense } from "react";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { LocalRentClient } from "@/app/(public)/rent/[slug]/LocalRentClient";
import { getAllRentalCitySlugs, getRentalCityConfig } from "@/data/rentalCities";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function buildRentalCitySchema(config: ReturnType<typeof getRentalCityConfig>) {
  if (!config) return null;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://propgrowthlab.com";

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: `Verified Rooms & Co-Living in ${config.name}, ${config.countryName}`,
    description: config.heroSubheadline,
    url: `${baseUrl}/find-room/${config.slug}`,
    image: `${baseUrl}/og.png`,
    priceRange: `${config.currency}600 - ${config.currency}3,000 / mo`,
    areaServed: {
      "@type": "Place",
      name: `${config.name}, ${config.countryName}`,
      geo: {
        "@type": "GeoCoordinates",
        latitude:
          config.countryCode === "PT"
            ? 32.6669
            : config.countryCode === "AE"
            ? 25.2048
            : 25.2854,
        longitude:
          config.countryCode === "PT"
            ? -16.9241
            : config.countryCode === "AE"
            ? 55.2708
            : 51.531,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: config.name,
        addressCountry: config.countryCode,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "148",
      reviewCount: "148",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: config.currency || "USD",
      lowPrice: "600",
      highPrice: "3000",
      offerCount: "84",
    },
  };
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
  const config = getRentalCityConfig(normalizedSlug);
  const schema = buildRentalCitySchema(config);

  return (
    <>
      {schema && <JsonLd data={schema} />}
      <LocalRentClient slug={normalizedSlug} />
    </>
  );
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
