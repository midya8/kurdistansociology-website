import "server-only";
import { defaultLocale, locales, type Locale } from "./config";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  ku: () => import("./dictionaries/ku.json").then((m) => m.default),
  kmr: () => import("./dictionaries/kmr.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>;

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  const key: Locale = (locales as readonly string[]).includes(locale)
    ? (locale as Locale)
    : defaultLocale;
  return dictionaries[key]();
};
