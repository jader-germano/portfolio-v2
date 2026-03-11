"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LOCALE, LANGUAGE_STORAGE_KEY, getDictionary, resolveLocale, type AppDictionary, type AppLocale } from "@/lib/i18n";

type LanguageContextValue = {
  locale: AppLocale;
  dictionary: AppDictionary;
  setLocale: (locale: AppLocale) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<AppLocale>(DEFAULT_LOCALE);

  useEffect(() => {
    const storedLocale = resolveLocale(window.localStorage.getItem(LANGUAGE_STORAGE_KEY));
    setLocaleState(storedLocale);
    document.documentElement.lang = storedLocale === "pt" ? "pt-BR" : "en";
  }, []);

  const setLocale = (nextLocale: AppLocale) => {
    const normalizedLocale = resolveLocale(nextLocale);
    setLocaleState(normalizedLocale);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizedLocale);
    document.documentElement.lang = normalizedLocale === "pt" ? "pt-BR" : "en";
  };

  const value = useMemo(
    () => ({
      locale,
      dictionary: getDictionary(locale),
      setLocale,
    }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
};
