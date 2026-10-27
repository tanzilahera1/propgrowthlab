import type { Metadata } from "next";
import TemplatesClient from "./TemplatesClient";

export const metadata: Metadata = {
  title: "PropTech Systems & Source Code | PropGrowth Lab",
  description:
    "Production-ready Next.js 16 real estate & hospitality codebases. Direct-booking engines with 2-way iCal sync, multi-listing brokerage portals, and rental arbitrage OS. Buy code for $27 or order 48-hour turnkey deployment for $199.",
  keywords: [
    "PropTech source code",
    "Next.js real estate template",
    "villa direct booking engine",
    "iCal calendar sync Airbnb",
    "real estate brokerage script",
    "rental arbitrage OS",
    "turnkey real estate website 48 hours",
  ],
  alternates: {
    canonical: "https://propgrowthlab.com/templates",
  },
  openGraph: {
    title: "PropTech Systems & Source Code | PropGrowth Lab",
    description:
      "Download production Next.js 16 codebases for $27 or order 48-hour turnkey deployment for $199. Direct-booking engines and multi-listing brokerage systems.",
    url: "https://propgrowthlab.com/templates",
    siteName: "PropGrowth Lab",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "PropGrowth Lab PropTech Systems",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function TemplatesPage() {
  return <TemplatesClient />;
}
