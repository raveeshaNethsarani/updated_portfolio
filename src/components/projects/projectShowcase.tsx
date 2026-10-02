import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from 'motion/react';
import { ChevronLeft, ChevronRight, Pause, Play, Terminal } from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import { ProjectCard } from './ProjectCard';

const AUTOPLAY_DELAY = 6500;
const TOTAL = PROJECTS.length;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// The site-wide fluid gutter, so the header and the card track line up with every other section.
const GUTTER = 'gutter-x';
const SCROLL_GUTTER = 'scroll-gutter-x';

const pad = (value: number) => String(value).padStart(2, '0');

/* ---------------------------- animation variants --------------------------- */

const headerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const riseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const lineVariants: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.9, ease: EASE } },
};

const trackVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

/* --------------------------------- controls -------------------------------- */

interface ControlButtonProps {
  label: string;
  onClick: () => void;
  children: ReactNode;
  accent?: boolean;
}

const ControlButton = ({ label, onClick, children, accent = false }: ControlButtonProps) => (
  <motion.button
    type="button"
    onClick={onClick}
    aria-label={label}
    whileHover={{ y: -1, scale: 1.03 }}
    whileTap={{ scale: 0.96 }}
    className={`grid h-10 w-10 place-items-center rounded-full border border-[#30363D] bg-[#161B22]/80 backdrop-blur transition-colors duration-300 ${
      accent
        ? 'text-[#C9D1D9] hover:border-[#3FB950] hover:text-[#3FB950]'
        : 'text-[#8B949E] hover:border-[#8B949E] hover:text-[#C9D1D9]'
    }`}
  >
    {children}
  </motion.button>
);

/* ------------------------------ main component ----------------------------- */

export const ProjectShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [edges, setEdges] = useState({ start: false, end: false });

  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activeRef = useRef(0);
  const settleTimer = useRef<number | null>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0, pointerId: -1 });

  const isInView = useInView(sectionRef, { amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const progress = useMotionValue(0);

  useEffect(() => {
    activeRef.current = activeIndex;
  }, [activeIndex]);

  /* ------------------------------ scroll helpers ------------------------------ */

  const getGutter = (track: HTMLDivElement) => parseFloat(getComputedStyle(track).paddingLeft) || 0;

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const start = track.scrollLeft > 4;
    const end = track.scrollLeft < max - 4;
    setEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
  }, []);

  /** Works out which card is "current" once a scroll or drag settles. */
  const resolveIndex = useCallback((current: number) => {
    const track = trackRef.current;
    if (!track) return current;

    const max = track.scrollWidth - track.clientWidth;
    const viewStart = track.scrollLeft;
    const viewEnd = viewStart + track.clientWidth;

    // On wide screens the last few cards can never reach the start edge,
    // so at the far end keep the current card if it's fully visible.
    if (viewStart >= max - 4) {
      const card = cardRefs.current[current];
      const visible =
        !!card && card.offsetLeft >= viewStart - 1 && card.offsetLeft + card.offsetWidth <= viewEnd + 1;
      return visible ? current : TOTAL - 1;
    }

    const anchor = viewStart + getGutter(track);
    let nearest = 0;
    let best = Number.POSITIVE_INFINITY;
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const distance = Math.abs(card.offsetLeft - anchor);
      if (distance < best) {
        best = distance;
        nearest = index;
      }
    });
    return nearest;
  }, []);

  const scrollToIndex = useCallback(
    (index: number, behavior?: ScrollBehavior) => {
      const track = trackRef.current;
      const card = cardRefs.current[index];
      if (!track || !card) return;
      track.scrollTo({
        left: card.offsetLeft - getGutter(track),
        behavior: behavior ?? (prefersReducedMotion ? 'auto' : 'smooth'),
      });
    },
    [prefersReducedMotion]
  );

  const move = useCallback(
    (nextIndex: number) => {
      if (!TOTAL) return;
      const normalized = (nextIndex + TOTAL) % TOTAL;
      setActiveIndex(normalized);
      scrollToIndex(normalized);
    },
    [scrollToIndex]
  );

  const handleScroll = () => {
    updateEdges();
    if (settleTimer.current) window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      if (!drag.current.active) setActiveIndex((current) => resolveIndex(current));
    }, 120);
  };

  useEffect(() => {
    updateEdges();
    const handleResize = () => {
      updateEdges();
      scrollToIndex(activeRef.current, 'auto');
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (settleTimer.current) window.clearTimeout(settleTimer.current);
    };
  }, [updateEdges, scrollToIndex]);

  /* --------------------------------- autoplay -------------------------------- */

  const canAutoplay =
    isAutoplayEnabled &&
    !isHovered &&
    !isFocused &&
    !isDragging &&
    !isTouching &&
    isInView &&
    !prefersReducedMotion &&
    TOTAL > 1;

  // Reset the progress bar whenever the slide changes (runs before the effect below).
  useEffect(() => {
    progress.set(0);
  }, [activeIndex, progress]);

  // Progress-driven autoplay: pausing freezes the bar, resuming continues from where it stopped.
  useEffect(() => {
    if (!canAutoplay) return;
    const remaining = Math.max(0, 1 - progress.get()) * AUTOPLAY_DELAY;
    const controls = animate(progress, 1, {
      duration: remaining / 1000,
      ease: 'linear',
      onComplete: () => move(activeIndex + 1),
    });
    return () => controls.stop();
  }, [canAutoplay, activeIndex, move, progress]);

  /* --------------------------------- input ---------------------------------- */

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(activeIndex + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(activeIndex - 1);
    }
  };

  // Mouse-only drag; touch devices use native swipe scrolling.
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || !trackRef.current) return;
    drag.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      startScroll: trackRef.current.scrollLeft,
      pointerId: event.pointerId,
    };
  };

  const endDrag = () => {
    const state = drag.current;
    if (!state.active) return;
    state.active = false;
    if (!state.moved) return;
    const track = trackRef.current;
    if (track?.hasPointerCapture(state.pointerId)) track.releasePointerCapture(state.pointerId);
    setIsDragging(false);
    move(resolveIndex(activeRef.current));
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    const track = trackRef.current;
    if (!state.active || !track) return;
    if (event.buttons === 0) return endDrag();

    const deltaX = event.clientX - state.startX;
    // Only start dragging after a small threshold so normal link clicks still work.
    if (!state.moved && Math.abs(deltaX) > 6) {
      state.moved = true;
      track.setPointerCapture(state.pointerId);
      setIsDragging(true);
    }
    if (state.moved) track.scrollLeft = state.startScroll - deltaX;
  };

  const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).matches(':focus-visible')) setIsFocused(true);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsFocused(false);
  };

  if (!TOTAL) return null;

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        id="work"
        aria-label="Project showcase"
        aria-roledescription="carousel"
        className="relative overflow-hidden border-b border-[#30363D] bg-[#0D1117]/90 section-y"
        onPointerEnter={(event) => event.pointerType === 'mouse' && setIsHovered(true)}
        onPointerLeave={(event) => event.pointerType === 'mouse' && setIsHovered(false)}
        onKeyDown={handleKeyDown}
      >
        {/* Background layers */}
        <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-20" />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -top-48 left-1/2 h-[520px] w-[min(1100px,90vw)] -translate-x-1/2 rounded-full bg-[#3FB950]/10 blur-[120px]"
          animate={{ opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div id="projects" className="relative z-10 mx-auto w-full max-w-[1920px] scroll-mt-20">
          {/* ------------------------------- Header ------------------------------- */}
          <div className={GUTTER}>
            <motion.header
              variants={headerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="grid gap-8 border-b border-[#30363D] pb-8 sm:gap-10 sm:pb-10 lg:grid-cols-12 lg:items-end lg:gap-x-12"
            >
              <div className="lg:col-span-8">
                <motion.div
                  variants={riseVariants}
                  className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#3FB950]"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3FB950] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3FB950]" />
                  </span>
                  <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Selected Systems // Project Showcase</span>
                </motion.div>

                <h2 className="text-5xl font-black uppercase leading-[0.88] tracking-tighter text-[#C9D1D9] sm:text-7xl lg:text-8xl 2xl:text-[8.5rem]">
                  <span className="block overflow-hidden pb-[0.06em]">
                    <motion.span variants={lineVariants} className="block">
                      Project
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden pb-[0.06em]">
                    <motion.span variants={lineVariants} className="text-outline block">
                      Showcase.
                    </motion.span>
                  </span>
                </h2>
              </div>

              <div className="flex flex-col gap-8 lg:col-span-4 lg:items-end">
                <motion.p
                  variants={riseVariants}
                  className="max-w-md font-mono text-xs leading-6 text-[#8B949E] sm:text-sm lg:text-right"
                >
                  Selected systems, experiments, and products built across full-stack, frontend, and backend
                  environments.
                </motion.p>

                <motion.div variants={riseVariants} className="flex flex-wrap items-center gap-3">
                  <div
                    className="mr-2 flex items-baseline gap-1.5 font-mono text-sm tabular-nums"
                    aria-live={canAutoplay ? 'off' : 'polite'}
                    aria-atomic="true"
                  >
                    <span className="relative inline-flex h-5 overflow-hidden text-[#C9D1D9]">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={activeIndex}
                          initial={{ y: '100%', opacity: 0 }}
                          animate={{ y: '0%', opacity: 1 }}
                          exit={{ y: '-100%', opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                        >
                          {pad(activeIndex + 1)}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <span className="text-[#8B949E]">/ {pad(TOTAL)}</span>
                  </div>

                  <ControlButton
                    label={isAutoplayEnabled ? 'Pause automatic project rotation' : 'Resume automatic project rotation'}
                    onClick={() => setIsAutoplayEnabled((enabled) => !enabled)}
                  >
                    {isAutoplayEnabled ? (
                      <Pause className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Play className="h-4 w-4" aria-hidden="true" />
                    )}
                  </ControlButton>
                  <ControlButton label="Previous project" onClick={() => move(activeIndex - 1)} accent>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </ControlButton>
                  <ControlButton label="Next project" onClick={() => move(activeIndex + 1)} accent>
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </ControlButton>
                </motion.div>
              </div>
            </motion.header>
          </div>

          {/* ------------------------------- Track -------------------------------- */}
          <div className="relative mt-10 sm:mt-14">
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-[#0D1117] to-transparent transition-opacity duration-300 sm:w-24 ${
                edges.start ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-[#0D1117] to-transparent transition-opacity duration-300 sm:w-24 ${
                edges.end ? 'opacity-100' : 'opacity-0'
              }`}
            />

            <motion.div
              ref={trackRef}
              variants={trackVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              tabIndex={0}
              aria-label="Horizontal project carousel"
              className={`no-scrollbar relative flex gap-5 overflow-x-auto overscroll-x-contain py-4 outline-none ${GUTTER} ${SCROLL_GUTTER} ${
                isDragging ? 'cursor-grabbing select-none' : 'cursor-grab snap-x snap-mandatory'
              }`}
              onScroll={handleScroll}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onTouchStart={() => setIsTouching(true)}
              onTouchEnd={() => setIsTouching(false)}
              onTouchCancel={() => setIsTouching(false)}
              onClickCapture={(event) => {
                // Swallow the click that ends a drag so links don't open accidentally.
                if (drag.current.moved) {
                  event.preventDefault();
                  event.stopPropagation();
                  drag.current.moved = false;
                }
              }}
            >
              {PROJECTS.map((project, index) => (
                <motion.div
                  key={project.id}
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  variants={cardVariants}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${TOTAL}: ${project.title}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  className="w-[80vw] max-w-[380px] shrink-0 snap-start sm:w-[360px] 2xl:w-[380px]"
                >
                  <ProjectCard project={project} index={index} isActive={activeIndex === index} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ---------------------------- Pagination ----------------------------- */}
          <div className={`mt-6 flex items-center justify-center gap-1 ${GUTTER}`}>
            {PROJECTS.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => move(index)}
                  aria-label={`Show ${project.title}`}
                  aria-current={isActive ? 'true' : undefined}
                  className="group -mx-1 -my-1 px-2 py-4"
                >
                  <span
                    className={`relative block h-1.5 overflow-hidden rounded-full bg-[#30363D] transition-[width,background-color] duration-500 group-hover:bg-[#8B949E] ${
                      isActive ? 'w-12' : 'w-2'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 origin-left rounded-full bg-[#3FB950]"
                        style={{ scaleX: isAutoplayEnabled && !prefersReducedMotion ? progress : 1 }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[#8B949E]">
            Drag, swipe, use arrow keys or the controls to explore
          </p>
        </div>
      </section>
    </MotionConfig>
  );
};
