import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTerritoryById, getAllTerritoryIds } from "@/data/territories";
import { TerritoryPartnerClient } from "./TerritoryPartnerClient";

interface Props {
  params: Promise<{ territory: string }>;
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
      title: "Territory Not Found | PropGrowth Lab Partners",
    };
  }

  return {
    title: `${data.name} Exclusive Co-Broker Allocation | PropGrowth Lab Partners`,
    description: `Apply for exclusive co-broker partnership in ${data.name}. 70/30 commission split, instant WhatsApp client routing, and capped 2-broker exclusivity per territory.`,
    openGraph: {
      title: `${data.name} Broker Partnership | PropGrowth Lab`,
      description: `Exclusive territory allocation in ${data.name}. Keep 70% commission on pre-screened luxury transactions with zero upfront desk fees.`,
    },
  };
}

async function TerritoryPartnerContent({ params }: Props) {
  const { territory } = await params;
  const data = getTerritoryById(territory);

  if (!data) {
    notFound();
  }

  return <TerritoryPartnerClient territory={data} />;
}

export default function TerritoryPartnerPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#fbfbfa] flex items-center justify-center py-20">
          <div className="flex items-center gap-2 text-stone-500 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Loading Partner Portal...</span>
          </div>
        </div>
      }
    >
      <TerritoryPartnerContent params={params} />
    </Suspense>
  );
}
