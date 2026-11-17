import { useEffect, useRef, useState } from 'react';
import { CarFront, MapPin } from 'lucide-react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { journeyMilestones, journeyStats } from '../../../data/roadmap';
import { SectionHeading } from '../../common/SectionHeading';

export function Journey() {
  const [hasEntered, setHasEntered] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const milestoneListRef = useRef<HTMLOListElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [counts, setCounts] = useState(() => journeyStats.map(() => 0));
  const [revealedMilestones, setRevealedMilestones] = useState<number[]>([]);

  useEffect(() => {
    const element = statsRef.current;
    if (!element || hasEntered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasEntered]);

  useEffect(() => {
    if (!hasEntered) return;

    if (prefersReducedMotion) {
      setCounts(journeyStats.map(({ value }) => value));
      return;
    }

    const duration = 1400;
    let frameId = 0;
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (startTime === null) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      setCounts(journeyStats.map(({ value }) => Math.round(value * easedProgress)));

      if (progress < 1) frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, [hasEntered, prefersReducedMotion]);

  useEffect(() => {
    const list = milestoneListRef.current;
    if (!list) return;

    const cards = Array.from(list.querySelectorAll<HTMLElement>('[data-milestone-index]'));
    if (prefersReducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealedMilestones(cards.map((_, index) => index));
      return;
    }

    let frameId: number | null = null;
    const revealVisibleCards = () => {
      frameId = null;
      const visibleIndexes = cards.flatMap((card, index) => {
        const bounds = card.getBoundingClientRect();
        return bounds.top < window.innerHeight * 0.86 && bounds.bottom > 0 ? [index] : [];
      });

      if (visibleIndexes.length > 0) {
        setRevealedMilestones((current) => {
          const next = [...current, ...visibleIndexes.filter((index) => !current.includes(index))];
          return next.length === current.length ? current : next;
        });
      }
    };
    const scheduleReveal = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(revealVisibleCards);
    };

    revealVisibleCards();
    window.addEventListener('scroll', scheduleReveal, { passive: true });
    window.addEventListener('resize', scheduleReveal);

    return () => {
      window.removeEventListener('scroll', scheduleReveal);
      window.removeEventListener('resize', scheduleReveal);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [prefersReducedMotion]);

  return (
    <section id="journey" className="overflow-hidden bg-[#F8FAFC] py-20 text-[#475569] sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div data-reveal>
          <SectionHeading
            eyebrow="Our Journey"
            title="Every mile tells a story."
            subtitle="From our first journeys in 2015 to the travel network we serve today, our road has always led forward."
            align="center"
          />
        </div>

        <div
          ref={statsRef}
          className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4"
          aria-label="Ruthrasri Travels company milestones"
        >
          {journeyStats.map(({ prefix, suffix, label }, index) => (
            <div
              key={label}
              className="rounded-2xl border border-[#E2E8F0] bg-white px-3 py-5 text-center shadow-[0_8px_26px_rgba(23,55,70,0.06)] sm:px-6 sm:py-8"
            >
              <p className="font-['Playfair_Display'] text-2xl leading-tight text-[#B86B08] sm:text-4xl md:text-5xl">
                {prefix}{counts[index]}{suffix}
              </p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.14em] text-[#64748B] sm:text-xs sm:tracking-[0.24em]">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-5xl sm:mt-24 md:mt-32">
          <div className="mb-10 text-center sm:mb-12" data-reveal>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#D4AF66]">Our Road So Far</p>
            <h3 className="font-['Playfair_Display'] text-3xl leading-tight text-[#173746] sm:text-4xl">
              A journey built mile by mile
            </h3>
          </div>

          <ol
            ref={milestoneListRef}
            aria-label="Ruthrasri Travels milestones"
            className="relative space-y-6 before:absolute before:bottom-4 before:left-[15px] before:top-4 before:border-l-2 before:border-dashed before:border-[#D4AF66]/60 sm:space-y-8 md:space-y-10 md:before:left-1/2"
          >
            {journeyMilestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;
              return (
                <li
                  key={milestone.period}
                  className="relative grid grid-cols-[32px_minmax(0,1fr)] items-start gap-x-3 md:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] md:gap-x-5"
                >
                  <div
                    className="z-10 col-start-1 row-start-1 flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF66]/60 bg-white text-[#B86B08] shadow-sm md:col-start-2 md:col-end-3 md:row-start-1 md:mx-auto md:h-12 md:w-12"
                    aria-hidden="true"
                  >
                    {index === 0 ? <MapPin className="h-4 w-4 md:h-5 md:w-5" /> : <CarFront className="h-4 w-4 md:h-5 md:w-5" />}
                  </div>

                  <article
                    data-milestone-index={index}
                    className={`col-start-2 row-start-1 transform-gpu rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-[0_8px_26px_rgba(23,55,70,0.06)] transition-[opacity,transform] duration-700 ease-out sm:p-6 md:col-span-1 md:row-start-1 ${
                      isLeft ? 'md:col-start-1 md:text-right' : 'md:col-start-3'
                    } ${
                      prefersReducedMotion || revealedMilestones.includes(index)
                        ? 'translate-x-0 opacity-100'
                        : isLeft
                          ? '-translate-x-8 opacity-0'
                          : 'translate-x-8 opacity-0'
                    }`}
                  >
                    <p className="text-xs font-semibold tracking-[0.18em] text-[#B86B08] sm:text-sm sm:tracking-[0.2em]">
                      {milestone.period}
                    </p>
                    <h4 className="mt-2 font-['Playfair_Display'] text-lg leading-snug text-[#173746] sm:text-2xl">
                      {milestone.title}
                    </h4>
                    <p className="mt-3 text-[13px] leading-6 text-[#475569] sm:text-sm">{milestone.description}</p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
