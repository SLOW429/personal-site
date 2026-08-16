export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

export const localeDirections: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};

export const maintenanceCopy: Record<Locale, { eyebrow: string; title: string; body: string }> = {
  en: {
    eyebrow: "SLOW.DEV",
    title: "Site under development",
    body: "SLOW.DEV is being rebuilt with new tools, projects, content, gaming, and creator features. We will be back soon with something better.",
  },
  ar: {
    eyebrow: "SLOW.DEV",
    title: "الموقع تحت التطوير",
    body: "نعيد بناء SLOW.DEV حاليًا مع أدوات ومشاريع ومحتوى وميزات جديدة للألعاب وصناعة المحتوى. هنرجع قريبًا بشكل أفضل.",
  },
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "ar";
}

export function localizedPath(pathname: string, locale: Locale): string {
  const cleanPath = pathname || "/";
  const withoutLocale = cleanPath.replace(/^\/ar(?=\/|$)/, "") || "/";
  if (locale === "en") return withoutLocale;
  return withoutLocale === "/" ? "/ar" : `/ar${withoutLocale}`;
}
