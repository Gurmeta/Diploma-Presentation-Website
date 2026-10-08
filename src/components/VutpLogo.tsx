import { useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';

const LOGO_URL = 'https://www.utp.bg/wp-content/uploads/2025/12/UTP-logo-145-years.jpg';

export default function VutpLogo() {
  const { t } = useI18n();
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex items-center gap-3 select-none">
      {!failed && (
        <img
          src={LOGO_URL}
          alt={t.ui.logoAlt}
          className="logo-img h-11 w-auto object-contain shrink-0"
          width={72}
          height={44}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      )}
      <div className="flex flex-col leading-tight border-l border-rule pl-3 min-w-0">
        <span className="font-semibold text-ink tracking-wide">{t.ui.universityShort}</span>
        <span className="hidden sm:block text-[0.7rem] text-ink-3 leading-snug max-w-[11rem]">{t.ui.universityName}</span>
      </div>
    </div>
  );
}
