import type { Metadata } from "next";
import AgencyClient from "./AgencyClient";

export const metadata: Metadata = {
  title: "360° Hospitality Growth Agency | PropGrowth Lab",
  description:
    "Eliminate 25% OTA commissions with custom direct booking funnels and targeted Meta/Google ads for luxury villas and boutique resorts. $350/month predictable retainer model.",
  keywords: [
    "hospitality growth agency",
    "direct booking agency luxury villas",
    "eliminate Airbnb commission",
    "eliminate booking.com fees",
    "USA luxury villa marketing",
    "European hospitality marketing retainer",
    "hotel Meta ads management worldwide",
  ],
  alternates: {
    canonical: "https://propgrowthlab.com/agency",
  },
  openGraph: {
    title: "360° Hospitality Growth Agency | PropGrowth Lab",
    description:
      "Stop losing 25% to OTAs. We build custom direct booking funnels and manage paid guest acquisition for $350/mo.",
    url: "https://propgrowthlab.com/agency",
    siteName: "PropGrowth Lab",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "PropGrowth Lab Hospitality Growth Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function AgencyPage() {
  return <AgencyClient />;
}
