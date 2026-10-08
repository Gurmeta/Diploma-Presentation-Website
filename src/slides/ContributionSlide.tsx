import { useI18n } from '../i18n/I18nProvider';
import SlideHeader from '../components/SlideHeader';

export default function ContributionSlide() {
  const { t } = useI18n();
  const c = t.contribution;

  return (
    <div>
      <SlideHeader title={c.heading} lede={c.subtitle} />

      <p className="text-ink-2 leading-relaxed prose-measure mb-10">{c.intro}</p>

      <div className="border-t border-ink">
        {c.items.map((item) => (
          <article
            key={item.code}
            className="grid grid-cols-1 gap-x-10 gap-y-4 py-7 border-b border-rule lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,1fr)]"
          >
            <header>
              <p className="text-xs text-ink-3 mb-1">{item.area}</p>
              <h2 className="font-semibold leading-snug">{item.title}</h2>
              <p translate="no" className="mono inline-block mt-3 px-2 py-1 text-[0.7rem] bg-err-soft text-err rounded-sm break-all">
                {item.code}
              </p>
            </header>

            <section>
              <h3 className="text-xs font-semibold text-ink-3 mb-1.5">{c.causeLabel}</h3>
              <p className="text-sm text-ink-2 leading-relaxed">{item.cause}</p>
            </section>

            <section>
              <h3 className="text-xs font-semibold text-add mb-1.5">
                <span aria-hidden="true" className="mono mr-1.5">+</span>
                {c.fixLabel}
              </h3>
              <p className="text-sm text-ink leading-relaxed">{item.fix}</p>
            </section>
          </article>
        ))}
      </div>
    </div>
  );
}
