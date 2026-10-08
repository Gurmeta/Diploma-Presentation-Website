import { useI18n } from '../i18n/I18nProvider';
import SlideHeader from '../components/SlideHeader';

export default function TasksSlide() {
  const { t } = useI18n();

  return (
    <div>
      <SlideHeader title={t.tasks.heading} lede={t.tasks.subtitle} />

      <ol className="grid md:grid-cols-2 gap-x-12">
        {t.tasks.items.map((task, i) => (
          <li key={task.title} className="flex gap-5 py-5 border-t border-rule">
            <span className="mono text-2xl font-medium text-azure tabular-nums leading-none pt-0.5 w-9 shrink-0">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h2 className="font-semibold leading-snug">{task.title}</h2>
              <p className="text-sm text-ink-2 leading-relaxed mt-1.5 prose-measure">{task.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
