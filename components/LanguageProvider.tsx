"use client";

import * as React from 'react';
import {
  Language,
  DEFAULT_LANGUAGE,
  getBrowserLanguage,
  getStoredLanguage,
  getTranslations,
  languages,
  Translations,
} from '@/lib/i18n';

type LanguageContextValue = {
  lang: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  supportedLanguages: Language[];
};

const LanguageContext = React.createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = React.useState<Language>(DEFAULT_LANGUAGE);

  React.useEffect(() => {
    const stored = getStoredLanguage();
    const browserLanguage = getBrowserLanguage();
    setLang(stored ?? browserLanguage);
  }, []);

  const changeLanguage = React.useCallback((language: Language) => {
    setLang(language);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('lang', language);
    }
  }, []);

  const value = React.useMemo(
    () => ({ lang, setLanguage: changeLanguage, t: getTranslations(lang), supportedLanguages: languages }),
    [lang, changeLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
