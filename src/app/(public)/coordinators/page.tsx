import React, { Suspense } from "react";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import CoordinatorsClient from "./CoordinatorsClient";

const coordinatorsFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the PropGrowth Lab 70/30 commission split work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Under our coordinator partnership, you retain a guaranteed 70% of the total closed transaction commission on all property leases, room rentals, and sales. PropGrowth Lab retains 30% to offset advertising spend, tech infrastructure, and inbound qualification.",
      },
    },
    {
      "@type": "Question",
      name: "Are there any upfront desk fees or monthly franchise costs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zero. There are no desk fees, onboarding charges, or monthly software fees. We operate strictly on performance.",
      },
    },
    {
      "@type": "Question",
      name: "How many coordinators are accepted per territory?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To protect your pipeline and avoid internal competition, each designated city territory is capped at a strict maximum of 2 licensed coordinators.",
      },
    },
    {
      "@type": "Question",
      name: "How are commission payments disbursed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Clients wire funds directly to a neutral title escrow account. Upon contract execution and key handover, funds are disbursed with instant wire transfer to the local coordinator.",
      },
    },
  ],
};

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
    <>
      <JsonLd data={coordinatorsFaqSchema} />
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
    </>
  );
}
