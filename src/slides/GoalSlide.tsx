import { BookOpen, CheckCircle, Network, TrendingUp, type LucideIcon } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import SlideHeader from '../components/SlideHeader';

const ICONS: LucideIcon[] = [BookOpen, CheckCircle, Network, TrendingUp];

export default function GoalSlide() {
  const { t } = useI18n();

  return (
    <div>
      <SlideHeader title={t.goal.heading} lede={t.goal.subtitle} />

      <blockquote
        className="border-l-[3px] border-azure pl-6 lg:pl-8 text-ink max-w-[52rem] leading-[1.4] text-pretty"
        style={{ fontSize: 'clamp(1.2rem, 0.9rem + 1vw, 1.9rem)' }}
      >
        <span aria-hidden="true">“</span>
        {t.goal.quote.map((part, i) =>
          part.strong ? (
            <strong key={i} className="font-semibold">
              {part.text}
            </strong>
          ) : (
            <span key={i}>{part.text}</span>
          ),
        )}
        <span aria-hidden="true">”</span>
      </blockquote>

      <ul className="mt-12 grid md:grid-cols-2 gap-x-12">
        {t.goal.subgoals.map((goal, i) => {
          const Icon = ICONS[i];
          return (
            <li key={goal.title} className="flex gap-4 py-5 border-t border-rule">
              <Icon size={20} className="text-azure shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h2 className="font-semibold">{goal.title}</h2>
                <p className="text-sm text-ink-2 leading-relaxed mt-1 prose-measure">{goal.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
