import { useI18n } from '../i18n/I18nProvider';
import SlideHeader from '../components/SlideHeader';
import InteractiveCharts from '../components/InteractiveCharts';

export default function ExtraSlide() {
  const { t } = useI18n();

  return (
    <div>
      <SlideHeader title={t.extra.heading} lede={t.extra.subtitle} />
      <InteractiveCharts />
    </div>
  );
}
