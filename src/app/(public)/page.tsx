import type { Metadata } from "next";
import { HomeClient } from "./HomeClient";

export const metadata: Metadata = {
  title: "PropGrowth Lab | 360° PropTech Systems & Hospitality Growth Engine",
  description:
    "Turnkey Next.js booking engines in 48 hours, direct guest acquisition eliminating 20% OTA fees, daily verified broker lead quotas, and 70/30 co-broker closing network across the USA, UK, Canada, Australia, EU, and UAE.",
  keywords: [
    "PropTech solutions",
    "turnkey villa booking engine",
    "hospitality marketing agency",
    "eliminate OTA fees",
    "direct booking website",
    "luxury real estate leads USA",
    "broker lead quota UK Europe",
    "global holiday rental marketing",
    "co-broker real estate network 70/30",
    "Next.js real estate templates",
  ],
  alternates: {
    canonical: "https://propgrowthlab.com",
  },
  openGraph: {
    title: "PropGrowth Lab | 360° PropTech Systems & Hospitality Growth Engine",
    description:
      "48-hour turnkey booking engines, direct guest acquisition (0% Airbnb fees), daily verified broker lead quotas, and 70/30 co-broker closing network.",
    url: "https://propgrowthlab.com",
    siteName: "PropGrowth Lab",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "PropGrowth Lab - 360° PropTech & Hospitality Growth Engine",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PropGrowth Lab | 360° PropTech Systems & Hospitality Growth Engine",
    description:
      "48-hour turnkey booking engines, direct guest acquisition (0% Airbnb fees), daily verified broker lead quotas, and 70/30 co-broker closing network.",
    images: ["/og.png"],
    creator: "@propgrowthlab",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
