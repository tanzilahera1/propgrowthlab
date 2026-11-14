import { redirect } from "next/navigation";
import { getAllTerritoryIds } from "@/data/territories";

interface Props {
  params: Promise<{ territory: string }>;
}

export async function generateStaticParams() {
  const ids = getAllTerritoryIds();
  return ids.map((territory) => ({ territory }));
}

export default async function TerritoryPartnerPage({ params }: Props) {
  const { territory } = await params;
  redirect(`/coordinators/${territory}`);
}
