import { Check } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import SlideHeader from '../components/SlideHeader';

export default function ConclusionSlide() {
  const { t } = useI18n();
  const c = t.conclusion;

  return (
    <div>
      <SlideHeader title={c.heading} lede={c.subtitle} />

      <div className="grid grid-cols-1 gap-10 lg:gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-start">
        <section aria-labelledby="benefits-heading">
          <h2 id="benefits-heading" className="font-semibold text-lg mb-2">
            {c.benefitsHeading}
          </h2>
          <ul>
            {c.benefits.map((b) => (
              <li key={b.title} className="flex gap-3.5 py-4 border-t border-rule">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-add-soft text-add" aria-hidden="true">
                  <Check size={14} strokeWidth={3} />
                </span>
                <p className="text-sm leading-relaxed text-ink-2">
                  <strong className="font-semibold text-ink">{b.title}</strong> {b.text}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-term text-term-text rounded-sm p-6 lg:p-8 border border-rule" aria-labelledby="summary-heading">
          <h2 id="summary-heading" className="font-semibold text-white mb-3">
            {c.summaryHeading}
          </h2>
          <p className="text-sm leading-relaxed text-term-text/85">{c.summary}</p>

          <dl className="mt-7 pt-6 border-t border-term-2 grid grid-cols-3 gap-4">
            {c.stats.map((stat) => (
              <div key={stat.label}>
                <dd className="font-semibold text-white leading-none" style={{ fontSize: 'clamp(1.2rem, 0.8rem + 1.2vw, 2rem)' }}>
                  {stat.value}
                </dd>
                <dt className="text-[0.7rem] leading-snug text-term-text/65 mt-2">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
