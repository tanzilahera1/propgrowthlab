import { MetadataRoute } from "next";
import { getAllCaseStudySlugs } from "@/data/case-studies";
import { getAllTerritoryIds } from "@/data/territories";
import { getAllRentalCitySlugs } from "@/data/rentalCities";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://propgrowthlab.com";
  const now = new Date();

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/find-room`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/coordinators`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/leads`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/agency`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  // Dynamic Find Room City Hubs (/find-room/[slug])
  const rentalCitySlugs = getAllRentalCitySlugs();
  const rentalCityRoutes: MetadataRoute.Sitemap = rentalCitySlugs.map((slug) => ({
    url: `${baseUrl}/find-room/${slug}`,
    lastModified: now,
    changeFrequency: "hourly",
    priority: 0.9,
  }));

  // Dynamic Coordinator Territories (/coordinators/[territory])
  const territoryIds = getAllTerritoryIds();
  const coordinatorRoutes: MetadataRoute.Sitemap = territoryIds.map((territory) => ({
    url: `${baseUrl}/coordinators/${territory}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.85,
  }));

  // Dynamic Lead Territories (/leads/[territory])
  const leadRoutes: MetadataRoute.Sitemap = territoryIds.map((territory) => ({
    url: `${baseUrl}/leads/${territory}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.85,
  }));

  // Dynamic Agency Case Studies (/agency/case-studies/[slug])
  const caseStudySlugs = getAllCaseStudySlugs();
  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudySlugs.map((slug) => ({
    url: `${baseUrl}/agency/case-studies/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...rentalCityRoutes,
    ...coordinatorRoutes,
    ...leadRoutes,
    ...caseStudyRoutes,
  ];
}
