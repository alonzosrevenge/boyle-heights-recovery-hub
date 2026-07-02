"use client";

type Lang = "en" | "es";

export default function LangToggle({
  lang,
  onChange,
}: {
  lang: Lang;
  onChange: (lang: Lang) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Choose language"
      className="inline-flex overflow-hidden rounded-full border border-dusk/30 bg-paper"
    >
      {(["en", "es"] as Lang[]).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={lang === option}
          className={`focus-ring px-3 py-1 text-sm font-medium transition-colors ${
            lang === option
              ? "bg-dusk text-paper"
              : "text-dusk hover:bg-dusk/10"
          }`}
        >
          {option === "en" ? "EN" : "ES"}
        </button>
      ))}
    </div>
  );
}
