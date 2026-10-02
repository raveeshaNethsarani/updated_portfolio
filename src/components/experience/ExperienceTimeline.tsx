import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Cpu,
  Layers,
  MapPin,
  Terminal,
} from 'lucide-react';

import {
  EXPERIENCE_DATA,
  type ExperienceData,
  type ExperienceProject,
} from '../../data/experience';

/* ============================================================
   ANIMATION VARIANTS
============================================================ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

// Main card waits for the timeline line to start drawing: line → item → content → technologies.
const timelineCard: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: 0.25 } },
};

const listItem: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
};

const slideVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir >= 0 ? 90 : -90,
    scale: 0.98,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir >= 0 ? -90 : 90,
    scale: 0.98,
    transition: { duration: 0.3, ease: 'easeIn' },
  }),
};

/* ============================================================
   SHARED UI
============================================================ */

const NavButton: React.FC<{
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}> = ({ onClick, label, children }) => (
  <motion.button
    type="button"
    onClick={onClick}
    whileHover={{ y: -1, scale: 1.04 }}
    whileTap={{ scale: 0.96 }}
    aria-label={label}
    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#30363D] bg-[#0D1117] text-[#8B949E] transition-colors duration-200 hover:border-[#3FB950]/60 hover:text-[#3FB950]"
  >
    {children}
  </motion.button>
);

/* ============================================================
   SECTION EYEBROW
============================================================ */

const SectionEyebrow: React.FC<{ period: string }> = ({ period }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
    className="mb-10 flex items-center justify-between gap-4 border-b border-[#30363D] pb-4 sm:mb-16 lg:mb-24"
  >
    <div className="flex min-w-0 items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#3FB950] sm:text-xs lg:tracking-[0.3em]">
      <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#3FB950]" />
      <span className="text-balance">[ 04 // PROFESSIONAL LEDGER &amp; SYSTEM ROLES ]</span>
    </div>

    <span className="hidden shrink-0 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-[#8B949E] sm:inline-block">
      TENURE: {period}
    </span>
  </motion.div>
);

/* ============================================================
   EDITORIAL HEADER
============================================================ */

const EditorialHeader: React.FC<{ overview: string }> = ({ overview }) => (
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
    className="mb-16 grid grid-cols-1 gap-12 border-b border-[#30363D] pb-12 lg:mb-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 xl:gap-20"
  >
    {/* Left */}
    <motion.div variants={fadeUp}>
      <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#8B949E]">
        <Terminal className="h-3.5 w-3.5 text-[#3FB950]" />
        <span>CAREER / ENGINEERING PROGRESSION</span>
      </div>

      <h2 className="font-black uppercase leading-[0.84] tracking-[-0.07em] text-[#C9D1D9] text-5xl sm:text-7xl md:text-8xl lg:text-[clamp(5rem,7.5vw,9rem)]">
        PRODUCTION
        <br />
        <span className="text-outline">EXPERIENCE.</span>
      </h2>
    </motion.div>

    {/* Right */}
    <motion.div
      variants={fadeUp}
      className="flex flex-col justify-end"
    >
      <p className="max-w-xl font-mono text-xs leading-7 text-[#8B949E] sm:text-sm">
        {overview}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#3FB950]">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#3FB950]" />
        <span>ENGINEERING PROGRESSION</span>
        <span className="text-[#30363D]">//</span>
        <span className="text-[#C9D1D9]">
          MERN → NEXT.JS → GO / MICROSERVICES
        </span>
      </div>
    </motion.div>
  </motion.div>
);

/* ============================================================
   COMPANY HEADER
============================================================ */

const CompanyHeader: React.FC<{ exp: ExperienceData }> = ({ exp }) => (
  <div className="mb-8 flex flex-col justify-between gap-6 border-b border-[#30363D] pb-6 sm:mb-10 sm:gap-8 sm:pb-8 lg:flex-row lg:items-start">
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="rounded border border-[#3FB950]/40 bg-[#3FB950]/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#3FB950]">
          {exp.status}
        </span>

        <span className="flex items-center gap-1.5 font-mono text-xs text-[#8B949E]">
          <Calendar className="h-3.5 w-3.5" />
          {exp.period}
        </span>

        <span className="flex items-center gap-1.5 font-mono text-xs text-[#8B949E]">
          <MapPin className="h-3.5 w-3.5" />
          {exp.location}
        </span>
      </div>

      <h3 className="font-black text-[length:clamp(1.75rem,8vw,3rem)] uppercase leading-none tracking-tight text-white">
        {exp.company}
      </h3>

      <p className="mt-2 font-mono text-sm font-bold text-[#3FB950] sm:text-base">
        {exp.role}
      </p>
    </div>

    <div className="max-w-md shrink-0 rounded-lg border border-[#30363D] bg-[#0D1117] px-4 py-3 font-mono text-[10px] leading-relaxed text-[#8B949E]">
      PRIMARY STACK
      <div className="mt-1 text-[#C9D1D9]">
        MERN · Next.js · TypeScript · Go · PostgreSQL
      </div>
    </div>
  </div>
);

/* ============================================================
   ENGINEERING PROGRESSION
============================================================ */

const ProgressionGrid: React.FC<{
  phases: ExperienceData['progression'];
}> = ({ phases }) => (
  <div className="mb-10 sm:mb-12">
    <div className="mb-6 flex items-center justify-between gap-4 border-b border-[#30363D]/80 pb-3">
      <span className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#C9D1D9]">
        <Layers className="h-4 w-4 text-[#3FB950]" />
        ENGINEERING PROGRESSION
      </span>

      <span className="hidden font-mono text-[10px] text-[#8B949E] sm:block">
        03 DEVELOPMENT PHASES
      </span>
    </div>

    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3"
    >
      {phases.map((phase) => (
        <motion.div
          key={phase.number}
          variants={cardIn}
          whileHover={{ y: -3 }}
          className="rounded-xl border border-[#30363D] bg-[#0D1117] p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#3FB950]/40 hover:shadow-[0_18px_40px_-24px_rgba(63,185,80,0.28)]"
        >
          <div className="mb-5 flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold text-[#3FB950]">
              PHASE-{phase.number}
            </span>
            <span className="font-mono text-[10px] text-[#8B949E]">
              {phase.label}
            </span>
          </div>

          <h4 className="mb-2 text-sm font-bold text-white">{phase.title}</h4>
          <p className="text-xs leading-6 text-[#8B949E]">{phase.description}</p>
        </motion.div>
      ))}
    </motion.div>
  </div>
);

/* ============================================================
   PROJECT CAROUSEL
============================================================ */

const ProjectCarousel: React.FC<{ projects: ExperienceProject[] }> = ({
  projects,
}) => {
  // [activeIndex, direction] — direction drives enter/exit slide side.
  const [[activeProject, direction], setActive] = useState<[number, number]>([
    0, 0,
  ]);

  const paginate = (index: number, dir: number) => setActive([index, dir]);

  const goToNext = () =>
    paginate(activeProject === projects.length - 1 ? 0 : activeProject + 1, 1);

  const goToPrevious = () =>
    paginate(activeProject === 0 ? projects.length - 1 : activeProject - 1, -1);

  const goToProject = (index: number) => {
    if (index === activeProject) return;
    paginate(index, index > activeProject ? 1 : -1);
  };

  const project = projects[activeProject];
  const Icon = project.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between gap-4 border-b border-[#30363D]/80 pb-3">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-[#3FB950]" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9D1D9]">
              PROJECTS &amp; PRODUCTION SYSTEMS
            </span>
          </div>
          <p className="font-mono text-[10px] text-[#8B949E]">
            SELECT SYSTEM // DRAG OR NAVIGATE
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <NavButton onClick={goToPrevious} label="Previous project">
            <ArrowLeft className="h-4 w-4" />
          </NavButton>
          <NavButton onClick={goToNext} label="Next project">
            <ArrowRight className="h-4 w-4" />
          </NavButton>
        </div>
      </div>

      {/* Viewport */}
      <div className="relative overflow-hidden rounded-xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.article
            key={project.code}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) goToNext();
              else if (info.offset.x > 80) goToPrevious();
            }}
            className="group cursor-grab rounded-2xl border border-[#3FB950]/40 bg-[#0D1117] p-4 active:cursor-grabbing sm:p-8 lg:p-10"
          >
            {/* Project header */}
            <div className="mb-6 flex flex-col gap-4 border-b border-[#30363D]/70 pb-6 sm:mb-8 sm:gap-6 sm:pb-7 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 flex-col gap-3 min-[400px]:flex-row sm:gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
                  style={{
                    borderColor: `${project.color}55`,
                    backgroundColor: `${project.color}10`,
                    color: project.color,
                  }}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-[10px] font-bold text-[#3FB950]">
                      {project.code}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-[#30363D]" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#8B949E]">
                      {project.category}
                    </span>
                  </div>

                  <h4 className="break-words text-xl font-black uppercase tracking-tight text-white sm:text-3xl">
                    {project.title}
                  </h4>
                </div>
              </div>

              <div className="font-mono text-[10px] text-[#8B949E]">
                SYSTEM {String(activeProject + 1).padStart(2, '0')} /{' '}
                {String(projects.length).padStart(2, '0')}
              </div>
            </div>

            {/* Description */}
            <p className="mb-8 max-w-5xl text-sm leading-7 sm:mb-10 text-[#8B949E] sm:text-base">
              {project.description}
            </p>

            {/* Content */}
            <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12">
              {/* Contributions */}
              <div className="lg:col-span-8">
                <div className="mb-4 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#8B949E]">
                  <span className="h-px w-5 bg-[#3FB950]" />
                  CONTRIBUTIONS
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2"
                >
                  {project.responsibilities.map((item) => (
                    <motion.div
                      key={item}
                      variants={listItem}
                      className="flex gap-3 text-xs leading-6 text-[#C9D1D9]"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#3FB950]" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Technology */}
              <div className="lg:col-span-4">
                <div className="mb-4 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#8B949E]">
                  <span className="h-px w-5 bg-[#58A6FF]" />
                  TECHNOLOGY
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="flex flex-wrap gap-2"
                >
                  {project.stack.map((tag) => (
                    <motion.span
                      key={tag}
                      variants={listItem}
                      whileHover={{ y: -2 }}
                      className="rounded-md border border-[#30363D] bg-[#161B22] px-2.5 py-1.5 font-mono text-[10px] text-[#8B949E] transition-colors hover:border-[#3FB950]/50 hover:text-[#C9D1D9]"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-4 pt-2">
        {/* Indicators */}
        <div className="flex items-center gap-2">
          {projects.map((p, index) => (
            <button
              key={p.code}
              type="button"
              onClick={() => goToProject(index)}
              className="group -mx-1.5 -my-4 flex items-center gap-2 px-1.5 py-4"
              aria-label={`Go to ${p.title}`}
            >
              <span
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeProject === index
                    ? 'w-10 bg-[#3FB950]'
                    : 'w-3 bg-[#30363D] group-hover:bg-[#8B949E]'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Counter */}
        <div className="font-mono text-[9px] uppercase tracking-widest text-[#8B949E]">
          SYSTEM{' '}
          <span className="text-[#C9D1D9]">
            {String(activeProject + 1).padStart(2, '0')}
          </span>
          {' / '}
          {String(projects.length).padStart(2, '0')}
        </div>

        {/* Drag hint */}
        <div className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-[#8B949E] sm:flex">
          <ArrowLeft className="h-3 w-3" />
          <span>DRAG TO EXPLORE</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   MAIN SECTION
============================================================ */

export const ExperienceTimeline: React.FC = () => {
  const currentExp = EXPERIENCE_DATA[0];
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="experience"
      className="relative overflow-hidden border-b border-[#30363D] bg-[#0D1117] section-y"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-15" />

      {/* Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1920px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <SectionEyebrow period={currentExp.period} />
        <EditorialHeader overview={currentExp.overview} />

        {/* Timeline */}
        <div className="relative pl-5 sm:pl-10">
          {/* Timeline line */}
          <motion.div
            initial={prefersReducedMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.75, ease: EASE }}
            className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gradient-to-b from-[#3FB950] via-[#3FB950]/50 to-transparent"
          />

          {/* Timeline node */}
          <motion.div
            initial={prefersReducedMotion ? false : { scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, delay: 0.15, ease: EASE }}
            className="absolute -left-[7px] top-0 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#3FB950] bg-[#0D1117]"
          >
            {/* Soft halo marks this as the current role */}
            <span className="absolute inset-0 rounded-full border border-[#3FB950]/40 motion-safe:animate-ping" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3FB950]" />
          </motion.div>

          {/* Main experience card */}
          <motion.div
            variants={timelineCard}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="rounded-2xl border border-[#30363D] bg-[#161B22] p-4 shadow-2xl sm:p-8 md:p-10 lg:p-12"
          >
            <CompanyHeader exp={currentExp} />
            <ProgressionGrid phases={currentExp.progression} />
            <ProjectCarousel projects={currentExp.projects} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};