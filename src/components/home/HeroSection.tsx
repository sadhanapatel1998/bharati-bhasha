'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_BANNERS, HERO_SETTINGS } from '@/data/olympiadData';
import { useSiteContent } from '@/hooks/useSiteContent';

type Banner = {
  id?: string;
  image: string;
  alt?: string;
  link?: string;
  isActive?: boolean;
};

export default function HeroSection() {
  const banners = useSiteContent<typeof HERO_BANNERS>('hero_banners', HERO_BANNERS);
  const settings = useSiteContent<typeof HERO_SETTINGS>('hero_settings', HERO_SETTINGS);

  const slides = useMemo(
    () => (banners as Banner[]).filter((b) => b?.image && b.isActive !== false),
    [banners]
  );

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  /** aspect ratio of the first loaded image — lets the section size itself */
  const [ratio, setRatio] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const count = slides.length;
  const go = useCallback((i: number) => setCurrent(((i % count) + count) % count), [count]);
  const next = useCallback(() => go(current + 1), [current, go]);
  const prev = useCallback(() => go(current - 1), [current, go]);

  // keep the index valid if the super admin removes a banner
  useEffect(() => {
    if (current >= count) setCurrent(0);
  }, [count, current]);

  // autoplay
  useEffect(() => {
    if (!settings?.autoplay || paused || count < 2) return;
    const ms = Number(settings.intervalMs) || 5000;
    const timer = setInterval(() => setCurrent((p) => (p + 1) % count), ms);
    return () => clearInterval(timer);
  }, [settings?.autoplay, settings?.intervalMs, paused, count]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  if (!count) return null;

  const natural = (settings?.heightMode || 'natural') !== 'fixed';
  const frameStyle = natural
    ? { aspectRatio: ratio ? `${ratio}` : '1920 / 700' }
    : { height: `${Number(settings?.fixedHeightPx) || 560}px` };

  return (
    <section className="mb-0">
      <div
        className="relative w-full overflow-hidden bg-stone-100"
        style={frameStyle}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
          touchX.current = null;
        }}
        aria-roledescription="carousel"
      >
        {slides.map((b, i) => {
          const img = (
            /* plain img so any uploaded or remote path works without domain config,
               and so we can read the natural size for auto height */
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={b.image}
              alt={b.alt || `Banner ${i + 1}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              onLoad={(e) => {
                if (i !== 0 || !natural) return;
                const el = e.currentTarget;
                if (el.naturalWidth && el.naturalHeight) setRatio(el.naturalWidth / el.naturalHeight);
              }}
              className={natural ? 'h-full w-full object-contain' : 'h-full w-full object-cover'}
            />
          );

          return (
            <div
              key={b.id || b.image || i}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === current ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
              aria-hidden={i !== current}
            >
              {b.link ? (
                <Link href={b.link} className="block h-full w-full">
                  {img}
                </Link>
              ) : (
                img
              )}
            </div>
          );
        })}

        {settings?.showArrows !== false && count > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous banner"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 shadow-lg transition hover:bg-white sm:left-4 sm:h-12 sm:w-12"
            >
              <ChevronLeft className="h-6 w-6 text-[#790e03]" />
            </button>
            <button
              onClick={next}
              aria-label="Next banner"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 shadow-lg transition hover:bg-white sm:right-4 sm:h-12 sm:w-12"
            >
              <ChevronRight className="h-6 w-6 text-[#790e03]" />
            </button>
          </>
        )}

        {settings?.showDots !== false && count > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-6 sm:gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to banner ${i + 1}`}
                className={`h-2.5 rounded-full transition-all sm:h-3 ${
                  current === i ? 'w-8 bg-[#C79A2D] sm:w-10' : 'w-2.5 bg-white/80 hover:bg-white sm:w-3'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
