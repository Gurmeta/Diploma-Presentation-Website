import { useI18n } from '../i18n/I18nProvider';
import SlideHeader from '../components/SlideHeader';
import InteractiveShowcase from '../components/InteractiveShowcase';

export default function DemoSlide() {
  const { t } = useI18n();

  return (
    <div>
      <SlideHeader title={t.demo.heading} lede={t.demo.subtitle} />
      <InteractiveShowcase />
    </div>
  );
}
