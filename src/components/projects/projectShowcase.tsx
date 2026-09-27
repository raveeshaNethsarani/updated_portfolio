import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Terminal } from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import { ProjectCard } from './ProjectCard';

const AUTOPLAY_DELAY = 6500;

export const ProjectShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const dragState = useRef({ active: false, startX: 0, startScrollLeft: 0 });

  const move = useCallback((nextIndex: number) => {
    const normalizedIndex = (nextIndex + PROJECTS.length) % PROJECTS.length;
    setActiveIndex(normalizedIndex);
    const card = cardRefs.current[normalizedIndex];
    const track = trackRef.current;
    if (card && track) {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      track.scrollTo({ left: cardCenter - track.offsetWidth / 2, behavior: 'smooth' });
    }
  }, []);

  const next = useCallback(() => move(activeIndex + 1), [activeIndex, move]);
  const previous = useCallback(() => move(activeIndex - 1), [activeIndex, move]);

  useEffect(() => {
    if (!isAutoplayEnabled || isPaused || PROJECTS.length < 2) return;
    const timer = window.setInterval(next, AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [isAutoplayEnabled, isPaused, next]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') previous();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, previous]);

  if (!PROJECTS.length) return null;

  return (
    <section
      id="projects"
      aria-label="Project showcase"
      className="relative overflow-hidden border-b border-[#30363D] bg-[#0D1117]/90 py-24 sm:py-36"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-20" />
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        <div className="mb-12 flex flex-col gap-8 border-b border-[#30363D] pb-8 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#3FB950]">
              <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
              <span>SELECTED SYSTEMS // PROJECT SHOWCASE</span>
            </div>
            <div className="lg:col-span-8">
            <h2 className="font-black text-5xl sm:text-7xl md:text-8xl xl:text-[9rem] text-[#C9D1D9] tracking-tighter uppercase leading-[0.88]">
              PROJECT<br />
              <span className="text-outline">SHOWCASE.</span>
            </h2>
          </div>
            <p className="mt-5 max-w-xl font-mono text-xs leading-6 text-[#8B949E] sm:text-sm">
              Selected systems, experiments, and products built across full-stack, frontend, and backend environments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-[#C9D1D9]" aria-live="polite">
              {String(activeIndex + 1).padStart(2, '0')} <span className="text-[#8B949E]">/</span> {String(PROJECTS.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => setIsAutoplayEnabled((enabled) => !enabled)}
              aria-label={isAutoplayEnabled ? 'Pause automatic project rotation' : 'Resume automatic project rotation'}
              className="rounded-lg border border-[#30363D] bg-[#161B22] p-2.5 text-[#8B949E] transition-colors hover:border-[#8B949E] hover:text-[#C9D1D9]"
            >
              {isAutoplayEnabled ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
            </button>
            <button type="button" onClick={previous} aria-label="Previous project" className="rounded-lg border border-[#30363D] bg-[#161B22] p-2.5 text-[#C9D1D9] transition-colors hover:border-[#3FB950] hover:text-[#3FB950]">
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={next} aria-label="Next project" className="rounded-lg border border-[#30363D] bg-[#161B22] p-2.5 text-[#C9D1D9] transition-colors hover:border-[#3FB950] hover:text-[#3FB950]">
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-5"
          tabIndex={0}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          aria-label="Horizontal project carousel"
          onScroll={() => {
            if (!trackRef.current) return;
            const nearestIndex = cardRefs.current.reduce((closest, card, index) => {
              if (!card || !trackRef.current) return closest;
              const currentDistance = Math.abs(card.offsetLeft - trackRef.current.scrollLeft);
              const closestCard = cardRefs.current[closest];
              const closestDistance = closestCard
                ? Math.abs(closestCard.offsetLeft - trackRef.current.scrollLeft)
                : Number.POSITIVE_INFINITY;
              return currentDistance < closestDistance ? index : closest;
            }, 0);
            setActiveIndex(nearestIndex);
          }}
          onPointerDown={(event) => {
            if (!trackRef.current) return;
            dragState.current = {
              active: true,
              startX: event.clientX,
              startScrollLeft: trackRef.current.scrollLeft
            };
            trackRef.current.setPointerCapture(event.pointerId);
            setIsPaused(true);
          }}
          onPointerMove={(event) => {
            if (!dragState.current.active || !trackRef.current) return;
            trackRef.current.scrollLeft =
              dragState.current.startScrollLeft - (event.clientX - dragState.current.startX);
          }}
          onPointerUp={(event) => {
            dragState.current.active = false;
            trackRef.current?.releasePointerCapture(event.pointerId);
            setIsPaused(false);
          }}
          onPointerCancel={() => {
            dragState.current.active = false;
            setIsPaused(false);
          }}
        >
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              onMouseEnter={() => setActiveIndex(index)}
              className={`w-[min(86vw,540px)] shrink-0 snap-center transition-all duration-300 ${
                activeIndex === index ? 'scale-[1.01]' : 'opacity-85 hover:opacity-100'
              }`}
            >
              <ProjectCard project={project} isActive={activeIndex === index} />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2" role="tablist" aria-label="Project slides">
          {PROJECTS.map((project, index) => (
            <button
              key={project.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Show ${project.title}`}
              onClick={() => move(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-10 bg-[#3FB950]' : 'w-2 bg-[#30363D] hover:bg-[#8B949E]'}`}
            />
          ))}
        </div>
        <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[#8B949E]">
          Drag, swipe, or use the controls to explore
        </p>
      </div>
    </section>
  );
};
