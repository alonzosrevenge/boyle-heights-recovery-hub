"use client";

import { useEffect, useState } from "react";
import { categorizeAqi } from "@/lib/aqi";

interface AqiResponse {
  aqi: number;
  pollutant: string;
  reportingArea: string;
  dateObserved: string;
  hourObserved: number;
  error?: string;
}

function formatHour(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:00 ${suffix}`;
}

export default function AqiPanel({ lang }: { lang: "en" | "es" }) {
  const [data, setData] = useState<AqiResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );

  useEffect(() => {
    let cancelled = false;

    fetch("/api/aqi")
      .then((res) => res.json())
      .then((json: AqiResponse) => {
        if (cancelled) return;
        if (json.error) {
          setStatus("error");
        } else {
          setData(json);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const heading =
    lang === "en" ? "Today's air quality" : "Calidad del aire hoy";
  const errorText =
    lang === "en"
      ? "Air quality data is temporarily unavailable. Check AirNow.gov directly."
      : "Los datos de calidad del aire no estan disponibles temporalmente. Consulte AirNow.gov directamente.";
  const loadingText = lang === "en" ? "Checking current air quality" : "Consultando la calidad del aire actual";

  const category = data ? categorizeAqi(data.aqi) : null;

  return (
    <div className="overflow-hidden rounded-card bg-ink text-paper shadow-sm">
      <div className={`h-2 w-full ${category ? category.colorClass : "bg-ink/40"}`} />
      <div className="p-5">
        <p className="font-mono text-[11px] uppercase tracking-widest text-paper/60">
          {heading}
        </p>

        {status === "loading" && (
          <p className="mt-3 font-mono text-sm text-paper/70">{loadingText}</p>
        )}

        {status === "error" && (
          <p className="mt-3 text-sm leading-relaxed text-paper/85">
            {errorText}
          </p>
        )}

        {status === "ready" && data && category && (
          <>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="font-mono text-5xl font-medium tabular-nums">
                {data.aqi}
              </span>
              <span className="font-display text-lg font-semibold leading-tight">
                {lang === "en" ? category.label_en : category.label_es}
              </span>
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-paper/90">
              {lang === "en" ? category.guidance_en : category.guidance_es}
            </p>
            <p className="mt-4 font-mono text-[11px] text-paper/50">
              {data.reportingArea} · {data.pollutant} · {formatHour(data.hourObserved)}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
