import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PropGrowth Lab | 360° Tech & Hospitality Growth Engine",
    short_name: "PropGrowth Lab",
    description:
      "The 360° Tech & Performance Growth Engine for Luxury Stays, Villas & Real Estate.",
    start_url: "/",
    id: "/",
    display: "standalone",
    background_color: "#14120f",
    theme_color: "#d97706",
    orientation: "portrait-primary",
    categories: ["business", "productivity", "travel"],
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
