export type ResourceIcon =
  | "purifier"
  | "exam"
  | "housing"
  | "alert"
  | "info";

export interface ResourceEntry {
  id: string;
  icon: ResourceIcon;
  title_en: string;
  title_es: string;
  body_en: string;
  body_es: string;
  sort_order: number;
  is_active: boolean;
}
