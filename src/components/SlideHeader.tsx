interface SlideHeaderProps {
  title: string;
  lede?: string;
}

export default function SlideHeader({ title, lede }: SlideHeaderProps) {
  return (
    <header className="mb-8 lg:mb-10">
      <h1 className="slide-title text-ink">{title}</h1>
      {lede && <p className="slide-lede mt-3">{lede}</p>}
    </header>
  );
}
