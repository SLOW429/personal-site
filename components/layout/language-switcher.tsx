"use client";

import { useLocale } from "./locale-provider";
import { isLocale, locales, type Locale, type TranslationKey } from "@/lib/localization";

const languageLabels: Record<Locale, TranslationKey> = {
  en: "language.english",
  ar: "language.arabic",
  tr: "language.turkish",
};

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();

  return (
    <label className="relative inline-flex h-10 items-center">
      <span className="sr-only">{t("language.label")}</span>
      <select
        aria-label={t("language.label")}
        value={locale}
        onChange={(event) => {
          const nextLocale = event.currentTarget.value;
          if (isLocale(nextLocale)) setLocale(nextLocale);
        }}
        className="h-10 max-w-[6.5rem] cursor-pointer appearance-none rounded-xl border border-white/10 bg-white/[0.04] px-2.5 pe-7 text-xs font-semibold text-white/75 transition hover:border-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8fd3ff]"
        dir="ltr"
      >
        {locales.map((language) => (
          <option key={language} value={language} className="bg-[#0a0f1a] text-white">
            {t(languageLabels[language])}
          </option>
        ))}
      </select>
      <span aria-hidden="true" className="pointer-events-none absolute end-2.5 text-[10px] text-white/50">⌄</span>
    </label>
  );
}
