export type AqiCategoryKey =
  | "good"
  | "moderate"
  | "usg"
  | "unhealthy"
  | "veryUnhealthy"
  | "hazardous";

export interface AqiCategory {
  key: AqiCategoryKey;
  label_en: string;
  label_es: string;
  guidance_en: string;
  guidance_es: string;
  colorClass: string;
}

const CATEGORIES: AqiCategory[] = [
  {
    key: "good",
    label_en: "Good",
    label_es: "Buena",
    guidance_en: "Air quality is fine. Normal outdoor activity is safe.",
    guidance_es: "La calidad del aire es buena. Puede realizar actividades al aire libre con normalidad.",
    colorClass: "bg-aqi-good",
  },
  {
    key: "moderate",
    label_en: "Moderate",
    label_es: "Moderada",
    guidance_en:
      "Air quality is acceptable. If you are unusually sensitive to smoke, consider limiting prolonged outdoor exertion.",
    guidance_es:
      "La calidad del aire es aceptable. Si es especialmente sensible al humo, considere limitar el ejercicio prolongado al aire libre.",
    colorClass: "bg-aqi-moderate",
  },
  {
    key: "usg",
    label_en: "Unhealthy for sensitive groups",
    label_es: "No saludable para grupos sensibles",
    guidance_en:
      "Keep windows closed. Skip outdoor exercise. Wear a mask outside, especially kids, older adults, and people with asthma.",
    guidance_es:
      "Mantenga las ventanas cerradas. Evite el ejercicio al aire libre. Use mascarilla al salir, especialmente ninos, adultos mayores y personas con asma.",
    colorClass: "bg-aqi-usg",
  },
  {
    key: "unhealthy",
    label_en: "Unhealthy",
    label_es: "No saludable",
    guidance_en:
      "Everyone should limit outdoor activity. Keep windows and doors closed. Wear a mask if you must go outside.",
    guidance_es:
      "Todos deben limitar la actividad al aire libre. Mantenga puertas y ventanas cerradas. Use mascarilla si debe salir.",
    colorClass: "bg-aqi-unhealthy",
  },
  {
    key: "veryUnhealthy",
    label_en: "Very unhealthy",
    label_es: "Muy no saludable",
    guidance_en:
      "Avoid all outdoor activity. Stay indoors with windows closed. Seek medical attention if you feel short of breath.",
    guidance_es:
      "Evite toda actividad al aire libre. Permanezca en interiores con las ventanas cerradas. Busque atencion medica si siente falta de aire.",
    colorClass: "bg-aqi-veryUnhealthy",
  },
  {
    key: "hazardous",
    label_en: "Hazardous",
    label_es: "Peligrosa",
    guidance_en:
      "This is an emergency health condition. Remain indoors and follow instructions from LA County Public Health and LAFD.",
    guidance_es:
      "Esta es una condicion de emergencia para la salud. Permanezca en interiores y siga las instrucciones del Departamento de Salud Publica del Condado de LA y LAFD.",
    colorClass: "bg-aqi-hazardous",
  },
];

export function categorizeAqi(aqi: number): AqiCategory {
  if (aqi <= 50) return CATEGORIES[0];
  if (aqi <= 100) return CATEGORIES[1];
  if (aqi <= 150) return CATEGORIES[2];
  if (aqi <= 200) return CATEGORIES[3];
  if (aqi <= 300) return CATEGORIES[4];
  return CATEGORIES[5];
}
