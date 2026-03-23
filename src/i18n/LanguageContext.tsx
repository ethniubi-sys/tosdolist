import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { locales, type Lang, type Translations } from './locales';

function isValidLang(v: string | null): v is Lang {
  return v === 'en' || v === 'zh' || v === 'zhHant';
}

interface LanguageContextValue {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang');
    return isValidLang(saved) ? saved : 'en';
  });

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem('lang', next);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t: locales[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
