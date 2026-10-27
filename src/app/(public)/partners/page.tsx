import type { Metadata } from "next";
import PartnersClient from "./PartnersClient";

export const metadata: Metadata = {
  title: "The Co-Broker Network | PropGrowth Lab",
  description:
    "Partner with PropGrowth Lab to close high-budget real estate leases and sales across the USA, UK, Canada, Australia, EU, and UAE. You manage physical viewings and contracts; keep guaranteed 70% commission (70/30 split).",
  keywords: [
    "co-broker network",
    "real estate partnership split",
    "USA real estate partner agent",
    "UK Europe luxury property broker partner",
    "70-30 commission split real estate",
    "partner broker leads worldwide",
  ],
  alternates: {
    canonical: "https://propgrowthlab.com/partners",
  },
  openGraph: {
    title: "The Co-Broker Network | PropGrowth Lab",
    description:
      "Close pre-qualified high-budget property leases on the ground and keep a guaranteed 70% commission.",
    url: "https://propgrowthlab.com/partners",
    siteName: "PropGrowth Lab",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "PropGrowth Lab Co-Broker Network",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function PartnersPage() {
  return <PartnersClient />;
}
