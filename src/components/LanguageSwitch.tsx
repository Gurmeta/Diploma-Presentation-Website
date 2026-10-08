import { LANGS, useI18n, type Lang } from '../i18n/I18nProvider';

const LABELS: Record<Lang, { short: string; full: string }> = {
  bg: { short: 'BG', full: 'Български' },
  en: { short: 'EN', full: 'English' },
};

export default function LanguageSwitch() {
  const { lang, setLang, t } = useI18n();

  return (
    <div role="group" aria-label={t.ui.languageLabel} className="inline-flex border border-rule rounded-sm overflow-hidden bg-sheet">
      {LANGS.map((code) => {
        const active = code === lang;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            onClick={() => setLang(code)}
            aria-pressed={active}
            aria-label={LABELS[code].full}
            title={LABELS[code].full}
            className={`px-2.5 py-1.5 text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
              active ? 'bg-ink text-sheet' : 'text-ink-2 hover:bg-rule-soft'
            }`}
          >
            {LABELS[code].short}
          </button>
        );
      })}
    </div>
  );
}
