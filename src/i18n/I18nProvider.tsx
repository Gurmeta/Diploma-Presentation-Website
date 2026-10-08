import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { bg, type Dict } from './bg';
import { en } from './en';

export type Lang = 'bg' | 'en';

export const LANGS: readonly Lang[] = ['bg', 'en'];

const DICTIONARIES: Record<Lang, Dict> = { bg, en };
const STORAGE_KEY = 'presentation-lang';

interface I18nValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
}

const I18nContext = createContext<I18nValue | null>(null);

function isLang(value: unknown): value is Lang {
  return value === 'bg' || value === 'en';
}

/** Priority: ?lang= in the URL, then the saved choice, then the browser language. */
function detectLang(): Lang {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (isLang(fromUrl)) return fromUrl;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    // storage can be unavailable (private mode); fall through to the browser language
  }
  return navigator.language?.toLowerCase().startsWith('bg') ? 'bg' : 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore: the choice just won't persist
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', DICTIONARIES[lang].meta.description);
  }, [lang]);

  const value = useMemo<I18nValue>(() => ({ lang, setLang, t: DICTIONARIES[lang] }), [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
