import { useCallback, useEffect, useRef, useState, type TouchEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize, Menu, Minimize, X } from 'lucide-react';
import VutpLogo from './components/VutpLogo';
import LanguageSwitch from './components/LanguageSwitch';
import ThemeToggle from './components/ThemeToggle';
import { useI18n } from './i18n/I18nProvider';
import { SLIDE_KEYS, SlideContent } from './slides';

const TOTAL_SLIDES = SLIDE_KEYS.length;
const SWIPE_THRESHOLD_PX = 60;

/** Reads the slide number from the URL hash (#3), falling back to the first slide. */
function readSlideFromHash(): number {
  const n = parseInt(window.location.hash.replace('#', ''), 10);
  return Number.isInteger(n) && n >= 1 && n <= TOTAL_SLIDES ? n : 1;
}

/** Keys pressed inside these elements must keep their native behaviour. */
function isInteractiveTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    !!target.closest('button, a, select, input, textarea, [contenteditable="true"]')
  );
}

/** Arrow keys belong to form controls (selects, sliders, text fields). */
function isFormControl(target: EventTarget | null): boolean {
  return target instanceof HTMLSelectElement || target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;
}

const pad = (n: number) => String(n).padStart(2, '0');

interface SlideListProps {
  current: number;
  onSelect: (id: number) => void;
}

function SlideList({ current, onSelect }: SlideListProps) {
  const { t } = useI18n();

  return (
    <nav aria-label={t.ui.slidesNav}>
      <ol className="flex flex-col">
        {t.slides.map((slide, i) => {
          const id = i + 1;
          const active = id === current;
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => onSelect(id)}
                aria-current={active ? 'page' : undefined}
                className={`group w-full flex items-baseline gap-3 py-2.5 pl-4 pr-3 text-left border-l-2 transition-colors cursor-pointer ${
                  active
                    ? 'border-azure text-ink bg-sheet'
                    : 'border-transparent text-ink-2 hover:text-ink hover:border-rule'
                }`}
              >
                <span className={`mono text-[0.7rem] tabular-nums ${active ? 'text-azure' : 'text-ink-3'}`}>{pad(id)}</span>
                <span className={`text-[0.85rem] leading-snug ${active ? 'font-semibold' : ''}`}>{slide.title}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default function App() {
  const { t } = useI18n();
  const [currentSlide, setCurrentSlide] = useState<number>(readSlideFromHash);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback((id: number) => {
    setCurrentSlide(Math.min(Math.max(id, 1), TOTAL_SLIDES));
    setMenuOpen(false);
  }, []);
  const handleNext = useCallback(() => setCurrentSlide((s) => Math.min(s + 1, TOTAL_SLIDES)), []);
  const handlePrev = useCallback(() => setCurrentSlide((s) => Math.max(s - 1, 1)), []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void document.documentElement.requestFullscreen?.().catch(() => undefined);
    }
  }, []);

  // Keep the URL hash and page title in sync so a refresh or shared link keeps the slide
  useEffect(() => {
    if (readSlideFromHash() !== currentSlide) {
      window.history.replaceState(null, '', `#${currentSlide}`);
    }
    document.title = `${currentSlide}. ${t.slides[currentSlide - 1].title} • ${t.meta.title}`;
    window.scrollTo({ top: 0 });
  }, [currentSlide, t]);

  useEffect(() => {
    const onHashChange = () => setCurrentSlide(readSlideFromHash());
    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    window.addEventListener('hashchange', onHashChange);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  // Keyboard controls for presenting
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const interactive = isInteractiveTarget(e.target);

      if (e.key === 'Escape') {
        setMenuOpen(false);
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
          if (isFormControl(e.target)) return;
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          if (isFormControl(e.target)) return;
          e.preventDefault();
          handlePrev();
          break;
        case ' ':
        case 'Enter':
          if (interactive) return; // let buttons and form controls work normally
          e.preventDefault();
          handleNext();
          break;
        case 'Backspace':
          if (interactive) return;
          e.preventDefault();
          handlePrev();
          break;
        case 'Home':
          if (interactive) return;
          e.preventDefault();
          goTo(1);
          break;
        case 'End':
          if (interactive) return;
          e.preventDefault();
          goTo(TOTAL_SLIDES);
          break;
        case 'f':
        case 'F':
          if (interactive) return;
          toggleFullscreen();
          break;
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNext, handlePrev, goTo, toggleFullscreen]);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Horizontal swipe on touch devices (ignored on interactive elements)
  const onTouchStart = (e: TouchEvent) => {
    if (isInteractiveTarget(e.target) || e.touches.length !== 1) {
      touchStartRef.current = null;
      return;
    }
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchEnd = (e: TouchEvent) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (dx < 0) handleNext();
    else handlePrev();
  };

  const slide = t.slides[currentSlide - 1];

  return (
    <div
      className="min-h-dvh lg:grid lg:grid-cols-[17.5rem_minmax(0,1fr)]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <a href="#main-content" className="skip-link" onClick={(e) => { e.preventDefault(); document.getElementById('main-content')?.focus(); }}>
        {t.ui.skipToContent}
      </a>

      {/* Desktop rail: identity, language and the slide index */}
      <aside className="hidden lg:flex lg:flex-col lg:sticky lg:top-0 lg:h-dvh border-r border-rule bg-paper" inert={menuOpen}>
        <div className="px-5 pt-6 pb-5 border-b border-rule">
          <VutpLogo />
        </div>
        <div className="flex-1 overflow-y-auto py-5 panel-scroll">
          <SlideList current={currentSlide} onSelect={goTo} />
        </div>
        <div className="px-5 py-4 border-t border-rule flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <LanguageSwitch />
            <ThemeToggle />
            <button
              type="button"
              onClick={toggleFullscreen}
              className="inline-flex items-center justify-center w-9 h-9 rounded-sm border border-rule bg-sheet text-ink-2 hover:bg-rule-soft transition-colors cursor-pointer"
              aria-label={isFullscreen ? t.ui.exitFullscreen : t.ui.fullscreen}
              title={`${isFullscreen ? t.ui.exitFullscreen : t.ui.fullscreen} (F)`}
            >
              {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>
          </div>
          <p className="text-[0.7rem] text-ink-3 leading-snug">{t.ui.keysHint}</p>
        </div>
      </aside>

      <div className="flex flex-col min-h-dvh min-w-0" inert={menuOpen}>
        {/* Mobile and tablet top bar */}
        <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between gap-3 px-4 py-2.5 bg-paper border-b border-rule">
          <VutpLogo />
          <div className="flex items-center gap-2">
            <LanguageSwitch />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-sm border border-rule bg-sheet text-ink cursor-pointer"
              aria-label={t.ui.menuOpen}
              aria-expanded={menuOpen}
            >
              <Menu size={18} />
            </button>
          </div>
        </header>

        <div
          className="h-0.5 bg-rule-soft"
          role="progressbar"
          aria-label={t.ui.progress}
          aria-valuemin={1}
          aria-valuemax={TOTAL_SLIDES}
          aria-valuenow={currentSlide}
        >
          <div
            className="h-full bg-azure transition-[width] duration-300 ease-out"
            style={{ width: `${(currentSlide / TOTAL_SLIDES) * 100}%` }}
          />
        </div>

        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 px-5 sm:px-8 lg:px-14 py-8 lg:py-12 focus:outline-none"
          aria-label={t.ui.slideAria(currentSlide, TOTAL_SLIDES, slide.title)}
        >
          <div className="mx-auto w-full max-w-[72rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
              >
                <SlideContent slideId={currentSlide} />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        <footer className="sticky bottom-0 z-30 bg-paper border-t border-rule px-4 sm:px-8 lg:px-14 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
          <div className="mx-auto w-full max-w-[72rem] flex items-center justify-between gap-4">
            <p className="hidden md:block text-xs text-ink-3 truncate">{t.ui.footer}</p>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentSlide === 1}
                className="inline-flex items-center gap-1.5 pl-2.5 pr-4 py-2.5 text-sm font-medium rounded-sm border border-rule bg-sheet text-ink hover:bg-rule-soft transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft size={16} />
                {t.ui.prev}
              </button>

              <span className="mono text-xs text-ink-2 tabular-nums min-w-[4.5rem] text-center">
                {t.ui.counter(currentSlide, TOTAL_SLIDES)}
              </span>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentSlide === TOTAL_SLIDES}
                className="inline-flex items-center gap-1.5 pl-4 pr-2.5 py-2.5 text-sm font-medium rounded-sm border border-ink bg-ink text-sheet hover:bg-ink-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {t.ui.next}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile slide list */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-50 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.15 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-ink/50 cursor-default"
              aria-label={t.ui.menuClose}
              onClick={() => setMenuOpen(false)}
              tabIndex={-1}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label={t.ui.slidesNav}
              className="relative ml-auto w-[min(20rem,86vw)] h-full bg-paper border-l border-rule flex flex-col"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-rule">
                <span className="text-sm font-semibold">{t.ui.slidesNav}</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-sm border border-rule bg-sheet cursor-pointer"
                  aria-label={t.ui.menuClose}
                  autoFocus
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-3">
                <SlideList current={currentSlide} onSelect={goTo} />
              </div>
              <p className="px-4 py-3 border-t border-rule text-xs text-ink-3">{t.ui.footer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
