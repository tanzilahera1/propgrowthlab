import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { QueryProvider } from "@/components/providers/QueryProvider";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://propgrowthlab.com"),
  title: {
    default: "PropGrowth Lab | 360° Tech & Hospitality Growth Engine",
    template: "%s | PropGrowth Lab",
  },
  description:
    "The 360° Tech & Performance Growth Engine for Luxury Stays, Villas & Real Estate. Blazing-fast direct booking systems, paid guest acquisition, and high-ticket broker networks.",
  keywords: [
    "PropGrowth Lab",
    "PropTech",
    "Luxury Villa Rental",
    "Resort Marketing",
    "Direct Booking Engine",
    "Real Estate Broker Network",
    "Next.js Real Estate",
    "Hospitality Growth Agency",
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
    title: "PropGrowth Lab | 360° Tech & Hospitality Growth Engine",
    description:
      "Scale luxury stays, villas & resorts with high-converting direct booking technology and verified tenant networks.",
    url: "https://propgrowthlab.com",
    siteName: "PropGrowth Lab",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "PropGrowth Lab - 360° Hospitality & PropTech Growth",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PropGrowth Lab | 360° Tech & Hospitality Growth Engine",
    description:
      "Scale luxury stays, villas & resorts with high-converting direct booking technology and verified tenant networks.",
    images: ["/og.png"],
    creator: "@propgrowthlab",
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
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <QueryProvider>{children}</QueryProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
