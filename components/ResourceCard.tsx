import { ResourceEntry, ResourceIcon } from "@/types/resource";

const ICON_PATHS: Record<ResourceIcon, string> = {
  purifier:
    "M12 3v3m0 12v3m9-9h-3M6 12H3m14.5-6.5-2 2m-9 9-2 2m13-2-2-2m-9-9-2-2M12 8a4 4 0 100 8 4 4 0 000-8z",
  exam: "M9 3v4a1 1 0 001 1h4a1 1 0 001-1V3M7 8v9a3 3 0 003 3h4a3 3 0 003-3V8M9 13h6",
  housing: "M4 11 12 4l8 7M6 10v9a1 1 0 001 1h4v-6h2v6h4a1 1 0 001-1v-9",
  alert:
    "M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z",
  info: "M12 16v-4m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
};

export default function ResourceCard({
  resource,
  lang,
}: {
  resource: ResourceEntry;
  lang: "en" | "es";
}) {
  const title = lang === "en" ? resource.title_en : resource.title_es;
  const body = lang === "en" ? resource.body_en : resource.body_es;

  return (
    <div className="flex gap-3 rounded-card border border-ink/10 bg-white/60 p-4">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mt-0.5 h-5 w-5 shrink-0 text-dusk"
        aria-hidden="true"
      >
        <path d={ICON_PATHS[resource.icon]} />
      </svg>
      <div>
        <p className="font-body text-[15px] font-semibold leading-snug text-ink">
          {title}
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-ink/70">{body}</p>
      </div>
    </div>
  );
}
