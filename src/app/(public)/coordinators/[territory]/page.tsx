import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { getTerritoryById, getAllTerritoryIds } from "@/data/territories";
import TerritoryCoordinatorClient from "./TerritoryCoordinatorClient";

interface Props {
  params: Promise<{ territory: string }>;
}

function buildTerritorySchema(data: ReturnType<typeof getTerritoryById>) {
  if (!data) return null;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://propgrowthlab.com";

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${data.name} Exclusive Coordinator Allocation`,
    description: `70/30 commission split real estate and room coordinator network for ${data.name}. Zero upfront desk fees.`,
    provider: {
      "@type": "Organization",
      name: "PropGrowth Lab",
      url: baseUrl,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: data.name,
    },
    offers: {
      "@type": "Offer",
      description: "70/30 Commission Split Partnership",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export async function generateStaticParams() {
  const ids = getAllTerritoryIds();
  return ids.map((territory) => ({ territory }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { territory } = await params;
  const data = getTerritoryById(territory);

  if (!data) {
    return {
      title: "Territory Not Found | PropGrowth Lab Coordinators",
    };
  }

  return {
    title: `${data.name} Exclusive Coordinator Allocation | PropGrowth Lab`,
    description: `Apply for exclusive territory coordinator allocation in ${data.name}. 70/30 commission split, instant WhatsApp client routing, and capped 2-coordinator exclusivity per territory.`,
    alternates: {
      canonical: `https://propgrowthlab.com/coordinators/${data.id}`,
    },
    openGraph: {
      title: `${data.name} Coordinator Allocation | PropGrowth Lab`,
      description: `Exclusive territory allocation in ${data.name}. Keep 70% commission on pre-screened luxury transactions with zero upfront desk fees.`,
      url: `https://propgrowthlab.com/coordinators/${data.id}`,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "PropGrowth Lab",
        },
      ],
    },
  };
}

async function TerritoryCoordinatorContent({ params }: Props) {
  const { territory } = await params;
  const data = getTerritoryById(territory);

  if (!data) {
    notFound();
  }

  const schema = buildTerritorySchema(data);

  return (
    <>
      {schema && <JsonLd data={schema} />}
      <TerritoryCoordinatorClient territory={data} />
    </>
  );
}

export default function TerritoryCoordinatorPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#fbfbfa] flex items-center justify-center py-20">
          <div className="flex items-center gap-2 text-stone-500 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Loading Coordinator Portal...</span>
          </div>
        </div>
      }
    >
      <TerritoryCoordinatorContent params={params} />
    </Suspense>
  );
}
