import { redirect } from "next/navigation";
import { getAllRentalCitySlugs } from "@/data/rentalCities";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllRentalCitySlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function LocalRentRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/find-room/${slug}`);
}
