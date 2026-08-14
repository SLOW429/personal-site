export const locales = ["en", "ar", "tr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  tr: "Türkçe",
};

export const localeDirections: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
  tr: "ltr",
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
  tr: {
    eyebrow: "SLOW.DEV",
    title: "Site geliştirme aşamasında",
    body: "SLOW.DEV şu anda yeni araçlar, projeler, içerikler, oyun ve içerik üretici özellikleriyle yeniden geliştiriliyor. Çok yakında daha iyi bir şekilde geri döneceğiz.",
  },
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "ar" || value === "tr";
}

export function localizedPath(pathname: string, locale: Locale): string {
  const cleanPath = pathname || "/";
  const withoutLocale = cleanPath.replace(/^\/(?:ar|tr)(?=\/|$)/, "") || "/";
  if (locale === "en") return withoutLocale;
  return withoutLocale === "/" ? `/${locale}` : `/${locale}${withoutLocale}`;
}
