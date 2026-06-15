"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { translations } from "@/lib/translations";
import type { Lang } from "@/lib/translations";

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextValue>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
  isRTL: false,
});

function getNestedValue(obj: Record<string, unknown>, key: string): string {
  const parts = key.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current && typeof current === "object") {
      current = (current as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }
  if (typeof current === "string") return current;
  if (Array.isArray(current)) return current.join(", ");
  return key;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("gmg-lang") as Lang | null;
    const initial = saved === "ar" || saved === "en" ? saved : "en";
    setLangState(initial);
    document.documentElement.dir = initial === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = initial;
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("gmg-lang", newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
  }, []);

  const t = useCallback(
    (key: string): string => {
      const dict = translations[lang] as Record<string, unknown>;
      return getNestedValue(dict, key);
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t, isRTL: lang === "ar" }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
