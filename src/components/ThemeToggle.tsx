import { Moon, Sun } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { useTheme } from '../theme/ThemeProvider';

export default function ThemeToggle() {
  const { t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const toDark = theme === 'light';
  const label = toDark ? t.ui.themeToDark : t.ui.themeToLight;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex items-center justify-center w-9 h-9 rounded-sm border border-rule bg-sheet text-ink-2 hover:bg-rule-soft hover:text-ink transition-colors cursor-pointer"
    >
      {toDark ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
    </button>
  );
}
