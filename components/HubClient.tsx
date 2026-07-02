"use client";

import { useState } from "react";
import LangToggle from "@/components/LangToggle";
import AqiPanel from "@/components/AqiPanel";
import ResourceCard from "@/components/ResourceCard";
import { ResourceEntry } from "@/types/resource";

export default function HubClient({
  resources,
}: {
  resources: ResourceEntry[];
}) {
  const [lang, setLang] = useState<"en" | "es">("en");

  const sectionLabel =
    lang === "en" ? "Help available near you" : "Ayuda disponible cerca de usted";
  const disclaimer =
    lang === "en"
      ? "Built by an independent Los Angeles resident. Always verify with LAFD, AQMD, or LA County Public Health."
      : "Creado por un residente independiente de Los Angeles. Siempre verifique con LAFD, AQMD o el Departamento de Salud Publica del Condado de LA.";

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <header className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-dusk/70">
            Boyle Heights
          </p>
          <h1 className="font-display text-2xl font-bold leading-tight text-ink">
            Recovery hub
          </h1>
        </div>
        <LangToggle lang={lang} onChange={setLang} />
      </header>

      <p className="mb-4 text-[12px] text-dusk">
        {lang === "en"
          ? "For the most current official information, visit "
          : "Para la informacion oficial mas actual, visite "}
        <a
          href="https://cd14.lacity.gov/articles/boyle-heights-storage-facility-fire-current-emergency-information"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          CD14&apos;s official page
        </a>
        .
      </p>

      <AqiPanel lang={lang} />

      <h2 className="mb-3 mt-7 font-display text-sm font-semibold uppercase tracking-wide text-dusk">
        {sectionLabel}
      </h2>

      <div className="flex flex-col gap-3">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} lang={lang} />
        ))}
      </div>

      <p className="mt-8 text-center text-[11px] leading-relaxed text-ink/50">
        {disclaimer}
      </p>
    </div>
  );
}