import { NextResponse } from "next/server";

// Boyle Heights approximate coordinates
const LAT = 34.0339;
const LON = -118.2065;

export async function GET() {
  const apiKey = process.env.AIRNOW_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "AirNow API key is not configured." },
      { status: 500 }
    );
  }

  const url = new URL(
    "https://www.airnowapi.org/aq/observation/latLong/current/"
  );
  url.searchParams.set("format", "application/json");
  url.searchParams.set("latitude", String(LAT));
  url.searchParams.set("longitude", String(LON));
  url.searchParams.set("distance", "25");
  url.searchParams.set("API_KEY", apiKey);

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 1800 }, // cache 30 min, AirNow updates hourly
    });

    if (!response.ok) {
      throw new Error(`AirNow responded with ${response.status}`);
    }

    const data: Array<{
      AQI: number;
      ParameterName: string;
      DateObserved: string;
      HourObserved: number;
      ReportingArea: string;
    }> = await response.json();

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "No AirNow data available for this location right now." },
        { status: 502 }
      );
    }

    // Multiple pollutants can be reported; use the worst (highest) AQI reading
    const worst = data.reduce((a, b) => (b.AQI > a.AQI ? b : a));

    return NextResponse.json({
      aqi: worst.AQI,
      pollutant: worst.ParameterName,
      reportingArea: worst.ReportingArea,
      dateObserved: worst.DateObserved,
      hourObserved: worst.HourObserved,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Could not reach AirNow right now. Try again shortly." },
      { status: 502 }
    );
  }
}
