import { supabase } from "@/lib/supabase";
import HubClient from "@/components/HubClient";
import { ResourceEntry } from "@/types/resource";

const FALLBACK_RESOURCES: ResourceEntry[] = [
  {
    id: "fallback-purifiers",
    icon: "purifier",
    title_en: "Free air purifiers and masks",
    title_es: "Purificadores de aire y mascarillas gratis",
    body_en: "Distributed by community partners while supplies last.",
    body_es: "Distribuidos por organizaciones comunitarias mientras dure el suministro.",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "fallback-exams",
    icon: "exam",
    title_en: "Free lung exams",
    title_es: "Examenes pulmonares gratis",
    body_en: "St. John's Community Health, with InnerCity Struggle. Walk-ins welcome.",
    body_es: "St. John's Community Health, junto con InnerCity Struggle. Se aceptan pacientes sin cita.",
    sort_order: 2,
    is_active: true,
  },
];

async function getResources(): Promise<ResourceEntry[]> {
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) {
    return FALLBACK_RESOURCES;
  }

  return data as ResourceEntry[];
}

export default async function Page() {
  const resources = await getResources();
  return <HubClient resources={resources} />;
}
