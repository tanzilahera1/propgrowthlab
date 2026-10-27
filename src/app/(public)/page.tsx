import type { Metadata } from "next";
import { HomeClient } from "./HomeClient";

export const metadata: Metadata = {
  title: "PropGrowth Lab | 360° PropTech Systems & Hospitality Growth Engine",
  description:
    "Empowering boutique resorts, luxury villa operators, and independent brokers worldwide with turnkey booking tech, 360° direct-booking ad funnels, daily qualified lead quotas, and a co-broker closing network across the USA, UK, Canada, Australia, EU, and UAE.",
  keywords: [
    "PropTech solutions",
    "turnkey villa booking engine",
    "hospitality marketing agency",
    "eliminate OTA fees",
    "direct booking website",
    "luxury real estate leads USA",
    "broker lead quota UK Europe",
    "global holiday rental marketing",
    "co-broker real estate network",
    "Next.js real estate templates",
  ],
  alternates: {
    canonical: "https://propgrowthlab.com",
  },
  openGraph: {
    title: "PropGrowth Lab | 360° PropTech Systems & Hospitality Growth Engine",
    description:
      "Turnkey direct-booking systems, paid guest acquisition, daily lead quota subscriptions, and co-broker network for luxury villas and boutique stays.",
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
      "Turnkey direct-booking systems, paid guest acquisition, daily lead quota subscriptions, and co-broker network.",
    images: ["/og.png"],
    creator: "@propgrowthlab",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
