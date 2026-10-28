import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTerritoryById, getAllTerritoryIds } from "@/data/territories";
import { TerritoryLeadClient } from "./TerritoryLeadClient";

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
      title: "Territory Not Found | PropGrowth Lab Leads",
    };
  }

  return {
    title: `${data.name} Pre-Qualified Real Estate Leads | PropGrowth Lab`,
    description: `Exclusive tenant and buyer lead allocation for licensed brokers in ${data.name}. Pre-screened budgets, 90-second WhatsApp dispatch, and capped territory slots.`,
    openGraph: {
      title: `${data.name} Real Estate Leads | PropGrowth Lab`,
      description: `Exclusive broker allocation for ${data.name}. Average deal size ${data.avgDealSize} with guaranteed 90-sec WhatsApp delivery.`,
    },
  };
}

async function TerritoryLeadContent({ params }: Props) {
  const { territory } = await params;
  const data = getTerritoryById(territory);

  if (!data) {
    notFound();
  }

  return <TerritoryLeadClient territory={data} />;
}

export default function TerritoryLeadsPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#fbfbfa] flex items-center justify-center py-20">
          <div className="flex items-center gap-2 text-stone-500 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Loading Leads Portal...</span>
          </div>
        </div>
      }
    >
      <TerritoryLeadContent params={params} />
    </Suspense>
  );
}
