import React, { useEffect, useRef } from 'react';
import {
  motion,
  useAnimationControls,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'motion/react';
import { ArrowDownRight, FileText } from 'lucide-react';
import raveeshaPortrait from '../../assets/images/Gemini_Generated_Image_31tv6r31tv6r31tv.jpeg';
import { useIntroReady } from '../animations/IntroContext';
import { EASE, FINE_POINTER_QUERY, useMediaQuery } from '../animations/motionPresets';

// Name scales with the viewport: fits a 320px phone, then on desktop shrinks in step
// with the portrait column so the editorial overlap stays the same as at 1440px.
const NAME_SIZE =
  'text-[length:clamp(2.75rem,13.6vw,6.5rem)] lg:text-[length:min(8.5rem,max(calc(10.6vw_-_24px),calc(15.2vw_-_83px)))]';

interface HeroSectionProps {
  onOpenResume: () => void;
  homeNavigationCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenResume,
  homeNavigationCount,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const heroEntranceControls = useAnimationControls();
  const isHeroInView = useInView(containerRef, { amount: 0.5 });
  const handledHomeNavigation = useRef(homeNavigationCount);
  const introReady = useIntroReady();
  const isFinePointer = useMediaQuery(FINE_POINTER_QUERY);
  const isCompact = useMediaQuery('(max-width: 767px)');

  // Page-load entrance: fade + rise + blur-to-sharp, held until the loader hands over.
  // Mobile skips the blur; reduced motion keeps only the fade.
  const blurFrom = shouldReduceMotion || isCompact ? 'blur(0px)' : 'blur(8px)';
  const intro = (delay: number, distance = 24) => {
    const hidden = { opacity: 0, y: shouldReduceMotion ? 0 : distance, filter: blurFrom };
    return {
      initial: hidden,
      animate: introReady ? { opacity: 1, y: 0, filter: 'blur(0px)' } : hidden,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.8,
        delay: shouldReduceMotion ? 0 : delay,
        ease: EASE,
      },
    };
  };

  useEffect(() => {
    if (homeNavigationCount === handledHomeNavigation.current || !isHeroInView) return;

    handledHomeNavigation.current = homeNavigationCount;
    if (shouldReduceMotion) return;

    void heroEntranceControls.start({
      opacity: [0.96, 1],
      y: [8, 0],
      scale: [0.995, 1],
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    });
  }, [
    homeNavigationCount,
    isHeroInView,
    shouldReduceMotion,
    heroEntranceControls,
  ]);

  // Mouse Parallax (Desktop)
  const mouseSpringX = useSpring(0, {
    stiffness: 100,
    damping: 25,
  });

  const mouseSpringY = useSpring(0, {
    stiffness: 100,
    damping: 25,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || !isFinePointer) return;

    const rect = containerRef.current?.getBoundingClientRect();

    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    mouseSpringX.set(x * 12);
    mouseSpringY.set(y * 10);
  };

  const handleMouseLeave = () => {
    mouseSpringX.set(0);
    mouseSpringY.set(0);
  };

  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const portraitScrollY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : -35]
  );

  const portraitScrollScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, shouldReduceMotion ? 1 : 1.05]
  );

  // Background glows drift a few pixels against the pointer for depth.
  const glowX = useTransform(mouseSpringX, (v) => v * -1.5);
  const glowY = useTransform(mouseSpringY, (v) => v * -1.5);

  const typoScrollY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : -18]
  );

  return (
    <motion.section
      id="hero"
      ref={containerRef}
      initial={false}
      animate={heroEntranceControls}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-12 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden border-b border-[#30363D]"
    >
      {/* Background Architectural Grid & Subtle Ambient Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute top-1/4 right-0 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-[#3FB950]/5 rounded-full blur-3xl pointer-events-none animate-ambient-drift"
      />

      <motion.div
        style={{ x: mouseSpringX, y: mouseSpringY }}
        className="absolute bottom-10 left-0 sm:left-10 w-64 h-64 sm:w-96 sm:h-96 bg-[#58A6FF]/5 rounded-full blur-3xl pointer-events-none animate-ambient-drift-slow"
      />

      {/* Main Structural Container with Side System Rail */}
      {/* 1792px = 1920px minus the xl gutters, matching the other sections */}
      <div className="flex flex-col lg:flex-row flex-grow relative z-10 w-full max-w-[1792px] mx-auto my-auto py-6 sm:py-10 gap-6 lg:gap-10">
        {/* Left Side System Architectural Rail (Desktop) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: introReady ? 1 : 0 }}
          transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : 0.75, ease: EASE }}
          className="hidden lg:flex w-14 border-r border-[#30363D] flex-col items-center justify-between py-6 shrink-0 select-none"
        >
          <span className="vertical-text mono text-[10px] uppercase tracking-[0.5em] text-[#8B949E] opacity-70">
            System Architecture &amp; Design
          </span>

          <div className="flex flex-col gap-4 items-center">
            <div className="w-2 h-2 rounded-full bg-[#3FB950] animate-ping" />

            <div className="w-[1px] h-24 bg-gradient-to-b from-[#3FB950] via-[#3FB950]/50 to-transparent" />
          </div>
        </motion.div>

        {/* Central Typographic Stage with Editorial Portrait Intersection */}
        <div className="flex-grow flex flex-col justify-center relative">
          {/* Top Status Callout */}
          <motion.div
            {...intro(0.1, 12)}
            className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mb-6 pb-4 border-b border-[#30363D]/60"
          >
            <div className="flex items-center gap-3">
              <span className="mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.4em] text-[#8B949E]">
                FULL STACK SYSTEM ENGINEER
              </span>
            </div>

            <div className="flex items-center gap-2 mono text-[10px] sm:text-[11px]">
              <span className="text-[#8B949E] whitespace-nowrap">[ STATUS ]</span>

              <span className="text-[#3FB950] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#3FB950] inline-block animate-pulse" />
                AVAILABLE FOR COLLABORATION
              </span>
            </div>
          </motion.div>

          {/* Typography Layer: RAVEESHA / NETHSARANI */}
          <motion.div
            style={{ y: typoScrollY }}
            className="relative z-10 select-none"
          >
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[56px] sm:text-[84px] md:text-[104px] lg:text-[124px] xl:text-[clamp(136px,9vw,176px)] leading-[0.82] font-black uppercase tracking-tighter text-[#C9D1D9]"
            >
              RAVEESHA
            </motion.h1>

            <motion.div
              style={{ y: typoScrollY }}
              className="relative z-20 select-none mt-1.5 sm:mt-2 lg:mt-[clamp(1.5rem,2.8vw,2.5rem)]"
            >
              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-[56px] sm:text-[84px] md:text-[104px] lg:text-[124px] xl:text-[clamp(136px,9vw,176px)] leading-[0.82] font-black uppercase tracking-tighter text-outline hover:text-outline-strong transition-all duration-300"
              >
                NETHSARANI
              </motion.h1>
            </motion.div>
          </motion.div>

          {/* Middle Intersecting Composition: Manifesto & Oversized Editorial Portrait */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center mt-5 mb-2 sm:my-4 relative">
            {/* Left Column: Manifesto & Action Ribbon */}
            <div className="lg:col-span-7 xl:col-span-7 z-20 space-y-6">
              {/* Manifesto Statement with Left Accent Line */}
              <div className="border-l-2 border-[#3FB950] pl-6 sm:pl-8">
                <motion.p
                  {...intro(0.46, 20)}
                  className="text-xl sm:text-2xl md:text-3xl font-light leading-relaxed text-[#C9D1D9] tracking-tight"
                >
                 I turn complex   {' '}
                  <span className="italic font-medium text-[#C9D1D9]">
                    ideas
                  </span>{' '}
                  into scalable digital{' '}
                  <span className="italic font-semibold text-[#A371F7] underline underline-offset-8 decoration-1">systems</span>
                  .
                </motion.p>

                {/* Current Core Stack */}
                <motion.div
                  {...intro(0.56, 16)}
                  className="flex flex-wrap gap-8 mt-6 pt-4 border-t border-[#30363D]/40"
                >
                  <div className="flex flex-col gap-1">
                    <span className="mono text-[10px] uppercase text-[#8B949E] tracking-widest font-semibold">
                      CURRENT CORE STACK
                    </span>

                    <span className="mono text-xs sm:text-sm text-[#C9D1D9]">
                      Next.js / TypeScript / MERN / Go / PostgreSQL 
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <motion.div {...intro(0.66, 16)} className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                <a
                  href="#work"
                  id="hero-explore-work-btn"
                  className="motion-btn group inline-flex flex-1 basis-[10rem] sm:flex-none sm:basis-auto justify-center items-center gap-3 px-6 py-3.5 bg-[#3FB950] hover:bg-[#46c95a] text-[#0D1117] mono text-xs tracking-wider font-bold rounded-lg transition-all duration-200 shadow-lg shadow-[#3FB950]/15"
                >
                  <span>EXPLORE WORK</span>

                  <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-200" />
                </a>

                <button
                  onClick={onOpenResume}
                  id="hero-view-resume-btn"
                  className="motion-btn group inline-flex flex-1 basis-[10rem] sm:flex-none sm:basis-auto justify-center items-center gap-2.5 px-6 py-3.5 bg-[#161B22] hover:bg-[#21262D] text-[#C9D1D9] border border-[#30363D] hover:border-[#8B949E] mono text-xs tracking-wider font-semibold rounded-lg transition-all duration-200 cursor-pointer"
                >
                  <FileText className="motion-icon motion-icon-up w-4 h-4 text-[#58A6FF]" />

                  <span>VIEW RESUME</span>
                </button>
              </motion.div>
            </div>

            {/* Right/Intersecting Column: Editorial Portrait Element */}
           <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end relative lg:-mt-[min(15rem,calc(19.2vw_-_36px))]">
              <motion.div
                style={{
                  x: mouseSpringX,
                  y: portraitScrollY,
                  scale: portraitScrollScale,
                }}
                initial={{
                  opacity: 0,
                  scale: 1.08,
                  clipPath:
                    'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
                }}
                animate={
                  introReady
                    ? {
                        opacity: 1,
                        scale: 1,
                        clipPath:
                          'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
                      }
                    : undefined
                }
                transition={{
                  duration: 1.2,
                  delay: shouldReduceMotion ? 0 : 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative group w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] aspect-[3/4] rounded-2xl overflow-hidden bg-[#161B22] border border-[#30363D] shadow-2xl z-10"
              >
                {/* Architectural Corner Crosshair Accents */}
                <div className="absolute top-2 left-2.5 mono text-[10px] text-[#8B949E]/70 z-20 pointer-events-none select-none">
                  +
                </div>

                <div className="absolute top-2 right-2.5 mono text-[10px] text-[#8B949E]/70 z-20 pointer-events-none select-none">
                  +
                </div>

                <div className="absolute bottom-2 left-2.5 mono text-[10px] text-[#8B949E]/70 z-20 pointer-events-none select-none">
                  +
                </div>

                <div className="absolute bottom-2 right-2.5 mono text-[10px] text-[#8B949E]/70 z-20 pointer-events-none select-none">
                  +
                </div>

                {/* Top Badge: System Metadata */}
                <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                  <div className="px-2.5 py-1 rounded bg-[#0D1117]/80 backdrop-blur-md border border-[#30363D]/80 mono text-[9px] text-[#C9D1D9] tracking-wider uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3FB950]" />

                    <span>RAVEESHA N.</span>
                  </div>

                  <div className="px-2.5 py-1 rounded bg-[#0D1117]/80 backdrop-blur-md border border-[#30363D]/80 mono text-[9px] text-[#3FB950] tracking-wider uppercase">
                    SYS_ENG
                  </div>
                </div>

                {/* The Editorial Portrait Image */}
                <img
                  src={raveeshaPortrait}
                  alt="Raveesha Nethsarani - Full Stack System Engineer at BotCalm"
                  loading="eager"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center grayscale contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Cinematic Film Vignette & Gradient Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-black/20 pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Architectural Specs Bar */}
      {/*
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.75 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#30363D] relative z-10 mono text-xs"
      >
        <div className="p-3.5 bg-[#161B22]/60 border border-[#30363D] rounded-lg">
          <div className="flex items-center gap-2 text-[#8B949E] mb-1">
            <span className="text-[10px] tracking-widest uppercase text-[#8B949E]">
              EDUCATION
            </span>
          </div>

          <p className="text-[#C9D1D9] font-bold text-xs uppercase tracking-wider">
            SLIATE, Galle
          </p>

          <span className="text-[10px] text-[#8B949E]">
            HND in IT (IT Dept)
          </span>
        </div>

        <div className="p-3.5 bg-[#161B22]/60 border border-[#30363D] rounded-lg">
          <div className="flex items-center gap-2 text-[#8B949E] mb-1">
            <span className="text-[10px] tracking-widest uppercase text-[#8B949E]">
              LOCATION
            </span>
          </div>

          <p className="text-[#C9D1D9] font-bold text-xs uppercase tracking-wider">
            Sri Lanka
          </p>

          <span className="text-[10px] text-[#3FB950]">
            06.0125° N / 80.2073° E
          </span>
        </div>

        <div className="p-3.5 bg-[#161B22]/60 border border-[#30363D] rounded-lg">
          <div className="flex items-center gap-2 text-[#8B949E] mb-1">
            <span className="text-[10px] tracking-widest uppercase text-[#8B949E]">
              SYSTEM FOCUS
            </span>
          </div>

          <p className="text-[#C9D1D9] font-bold text-xs uppercase tracking-wider">
            Full Stack Systems
          </p>

          <span className="text-[10px] text-[#58A6FF]">
            RBAC, APIs &amp; Webhooks
          </span>
        </div>

        <div className="p-3.5 bg-[#161B22]/60 border border-[#30363D] rounded-lg">
          <div className="flex items-center gap-2 text-[#8B949E] mb-1">
            <span className="text-[10px] tracking-widest uppercase text-[#8B949E]">
              BUILD STATUS
            </span>
          </div>

          <p className="text-[#C9D1D9] font-bold text-xs uppercase tracking-wider">
            Production v.4.0.2
          </p>

          <span className="text-[10px] text-[#3FB950]">
            100% Ready &bull; Verified
          </span>
        </div>
      </motion.div>
      */}
    </motion.section>
  );
};