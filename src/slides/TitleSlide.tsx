import { useI18n } from '../i18n/I18nProvider';
import PlanPanel from '../components/PlanPanel';

const ICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons';

const STACK = [
  { name: 'Terraform', icons: ['terraform/terraform-original.svg'] },
  { name: 'Azure', icons: ['azure/azure-original.svg'] },
  { name: 'NGINX', icons: ['nginx/nginx-original.svg'] },
  { name: 'HTML · CSS · JS', icons: ['html5/html5-original.svg', 'css3/css3-original.svg', 'javascript/javascript-original.svg'] },
];

export default function TitleSlide() {
  const { t } = useI18n();
  const p = t.people;

  return (
    <div className="grid grid-cols-1 gap-10 lg:gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-start">
      <div>
        <p className="text-sm text-azure font-medium mb-5">{t.title.kicker}</p>

        <h1
          className="font-semibold text-ink tracking-[-0.025em] leading-[1.05] text-balance wrap-anywhere"
          style={{ fontSize: 'clamp(2rem, 1.2rem + 3vw, 3.6rem)' }}
        >
          {t.title.heading}
        </h1>

        <p className="slide-lede mt-5">{t.title.subtitle}</p>

        <ul aria-label={t.title.stack} className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink-2">
          {STACK.map((item) => (
            <li key={item.name} className="flex items-center gap-2">
              {item.icons.map((icon) => (
                <img key={icon} src={`${ICON_BASE}/${icon}`} alt="" className="h-5 w-5 object-contain" width={20} height={20} />
              ))}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>

        <dl className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-6 border-t border-rule pt-6">
          <div>
            <dt className="text-xs text-ink-3 mb-1">{p.studentLabel}</dt>
            <dd className="font-semibold text-lg leading-snug">{p.studentName}</dd>
            <dd className="text-sm text-ink-2 mt-0.5">{p.program}</dd>
            <dd className="mono text-xs text-ink-3 mt-0.5">{p.facultyNo}</dd>
          </div>
          <div>
            <dt className="text-xs text-ink-3 mb-1">{p.supervisorLabel}</dt>
            <dd className="font-semibold leading-snug">{p.supervisorName}</dd>
            <dd className="text-sm text-ink-2 mt-2">{p.department}</dd>
            <dd className="text-sm text-ink-3">{p.place}</dd>
          </div>
        </dl>
      </div>

      <div className="lg:pt-10">
        <PlanPanel />
      </div>
    </div>
  );
}
