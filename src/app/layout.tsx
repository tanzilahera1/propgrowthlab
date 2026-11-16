import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { JsonLd } from "@/components/seo/JsonLd";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
}); 

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const rawBaseUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://propgrowthlab.com";
const siteUrl = rawBaseUrl.startsWith("http://") || rawBaseUrl.startsWith("https://")
  ? rawBaseUrl
  : `https://${rawBaseUrl}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PropGrowth Lab | 360° PropTech Systems & Hospitality Growth Engine",
    template: "%s | PropGrowth Lab",
  },
  description:
    "48-hour turnkey booking engines, direct guest acquisition (0% Airbnb fees), daily verified broker lead quotas, and 70/30 territory coordinator closing network across the USA, UK, Canada, Australia, EU, and UAE.",
  keywords: [
    "PropGrowth Lab",
    "PropTech",
    "Luxury Villa Rental",
    "Resort Marketing",
    "Direct Booking Engine",
    "Real Estate Broker Network",
    "Next.js Real Estate",
    "Hospitality Growth Agency",
    "Eliminate Airbnb Fees",
    "Territory Coordinator Network 70/30",
  ],
  authors: [{ name: "PropGrowth Lab" }],
  creator: "PropGrowth Lab",
  publisher: "PropGrowth Lab",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/logo.png",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PropGrowth Lab",
  },
  openGraph: {
    title: "PropGrowth Lab | 360° PropTech Systems & Hospitality Growth Engine",
    description:
      "48-hour turnkey booking engines, direct guest acquisition (0% Airbnb fees), daily verified broker lead quotas, and 70/30 territory coordinator closing network.",
    url: siteUrl,
    siteName: "PropGrowth Lab",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "PropGrowth Lab",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PropGrowth Lab | 360° PropTech Systems & Hospitality Growth Engine",
    description:
      "48-hour turnkey booking engines, direct guest acquisition (0% Airbnb fees), daily verified broker lead quotas, and 70/30 territory coordinator closing network.",
    images: ["/og.png"],
    creator: "@propgrowthlab",
  },
};


const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PropGrowth Lab",
  alternateName: "PGL",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    "The 360° Tech & Performance Growth Engine for Luxury Stays, Villas & Real Estate.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+8801330807372",
    contactType: "customer service",
    contactOption: "WhatsApp",
    availableLanguage: ["English", "Arabic", "Portuguese"],
  },
  sameAs: [
    "https://twitter.com/propgrowthlab",
    "https://github.com/tanzilahera1/propgrowthlab",
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PropGrowth Lab",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/find-room?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={webSiteSchema} />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <QueryProvider>{children}</QueryProvider>
        <Toaster richColors position="top-right" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
