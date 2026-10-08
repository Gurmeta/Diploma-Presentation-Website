import { useI18n } from '../i18n/I18nProvider';

export default function ThanksSlide() {
  const { t } = useI18n();
  const p = t.people;

  return (
    <div className="max-w-[52rem] py-6 lg:py-14">
      <h1
        className="font-semibold tracking-[-0.025em] leading-[1.05] text-balance"
        style={{ fontSize: 'clamp(2.25rem, 1.2rem + 4vw, 4.5rem)' }}
      >
        {t.thanks.heading}
      </h1>
      <p className="slide-lede mt-6">{t.thanks.text}</p>

      <dl className="mt-14 grid sm:grid-cols-3 gap-x-10 gap-y-6 border-t border-ink pt-6">
        <div>
          <dt className="text-xs text-ink-3 mb-1">{p.studentLabel}</dt>
          <dd className="font-semibold">{p.studentName}</dd>
          <dd className="mono text-xs text-ink-3 mt-1">{p.facultyNo}</dd>
        </div>
        <div>
          <dt className="text-xs text-ink-3 mb-1">{p.supervisorLabel}</dt>
          <dd className="font-semibold leading-snug">{p.supervisorName}</dd>
        </div>
        <div>
          <dt className="text-xs text-ink-3 mb-1">{t.thanks.departmentLabel}</dt>
          <dd className="font-semibold">{p.shortDepartment}</dd>
          <dd className="text-sm text-ink-3 mt-1">{p.place}</dd>
        </div>
      </dl>
    </div>
  );
}
