export const locales = ["en", "ku", "kmr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeMeta: Record<
  Locale,
  { label: string; shortLabel: string; dir: "ltr" | "rtl"; htmlLang: string }
> = {
  en: { label: "English", shortLabel: "English", dir: "ltr", htmlLang: "en" },
  ku: { label: "سۆرانی", shortLabel: "سۆرانی", dir: "rtl", htmlLang: "ckb" },
  kmr: { label: "Kurmancî", shortLabel: "Kurmancî", dir: "ltr", htmlLang: "kmr" },
};
