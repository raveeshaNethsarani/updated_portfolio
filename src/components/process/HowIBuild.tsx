import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Cpu,
  Layers,
  CheckCircle,
  Bug,
  Sparkles,
  Rocket,
  ArrowRight,
  Terminal
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BuildStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  deliverables: string[];
  systemFocus: string;
  color: string;
}

const BUILD_STEPS: BuildStep[] = [
  {
    number: '01',
    title: 'UNDERSTAND',
    tagline: 'Domain boundaries, data constraints & business objectives',
    description:
      'Before writing a single line of code, dissect the core engineering problem. Identify system throughput requirements, user personas, concurrency limits, and data persistence models.',
    icon: Compass,
    deliverables: [
      'Domain entity mapping & data lifecycle',
      'Non-functional requirements (latency, SLA, security)',
      'API surface requirements & third-party dependency analysis'
    ],
    systemFocus: 'System Requirements & Technical Feasibility',
    color: '#58A6FF'
  },
  {
    number: '02',
    title: 'DESIGN',
    tagline: 'System architecture, API contracts & schema modeling',
    description:
      'Architect the blueprint. Establish relational/document schemas with strict constraints, define idempotent API contracts, and draft component state flow.',
    icon: Layers,
    deliverables: [
      'Normalized PostgreSQL / MongoDB schema diagrams',
      'REST & WebSocket event protocol contracts',
      'Modular frontend state hierarchy & UI wireframe translation'
    ],
    systemFocus: 'Modular Architecture & Data Integrity',
    color: '#A371F7'
  },
  {
    number: '03',
    title: 'BUILD',
    tagline: 'High-performance TypeScript execution across full stack',
    description:
      'Implement clean, type-safe codebases with strict linting. Develop composable UI components in React/Next.js paired with resilient Express/Node.js microservices and database query layers.',
    icon: Cpu,
    deliverables: [
      'Type-safe end-to-end schemas with Zod & TypeScript',
      'Optimized backend routes with HMAC & JWT security',
      'Fluid, accessible frontend views styled with Tailwind CSS'
    ],
    systemFocus: 'Clean Code & Full Stack Implementation',
    color: '#3FB950'
  },
  {
    number: '04',
    title: 'TEST',
    tagline: 'Contract verification, edge-cases & schema constraints',
    description:
      'Validate every critical junction. Run automated unit tests, test edge cases, simulate race conditions, and verify authentication token invalidation scenarios.',
    icon: CheckCircle,
    deliverables: [
      'API endpoint integration tests & payload sanitization',
      'Database constraint & exclusion interval validation',
      'Cross-browser responsive UI testing (320px to 4K)'
    ],
    systemFocus: 'Quality Assurance & Boundary Verification',
    color: '#58A6FF'
  },
  {
    number: '05',
    title: 'DEBUG',
    tagline: 'Root-cause analysis, race condition elimination & profiling',
    description:
      'Isolate bottlenecks. Profile memory allocations, inspect slow database queries with EXPLAIN ANALYZE, trace asynchronous event loops, and eliminate concurrency locks.',
    icon: Bug,
    deliverables: [
      'Database compound index tuning & query optimization',
      'Asynchronous webhook payload retry failure triage',
      'React render cycle profiling & bundle size trimming'
    ],
    systemFocus: 'Production Resilience & Troubleshooting',
    color: '#F85149'
  },
  {
    number: '06',
    title: 'IMPROVE',
    tagline: 'Caching, indexing, telemetry & memory optimization',
    description:
      'Iterate on efficiency. Implement Redis caching layers, add connection pooling, memoize heavy computations, and refine visual micro-interactions for seamless UX.',
    icon: Sparkles,
    deliverables: [
      'Redis distributed caching & query memoization',
      'Web Vitals optimization (LCP, FID, CLS < 0.1)',
      'Refined spring physics motion & UX feedback loops'
    ],
    systemFocus: 'Performance Tuning & User Experience',
    color: '#D29922'
  },
  {
    number: '07',
    title: 'SHIP',
    tagline: 'Dockerized deployment, reverse proxy & health monitoring',
    description:
      'Deploy to production with confidence. Containerize services via Docker, configure TLS termination and CORS/CSP headers, and establish live health probes.',
    icon: Rocket,
    deliverables: [
      'Multi-stage Docker builds & environment variable security',
      'Zero-downtime database migration execution',
      'Real-time error telemetry & uptime monitoring'
    ],
    systemFocus: 'Continuous Delivery & Production Readiness',
    color: '#3FB950'
  }
];

export const HowIBuild: React.FC = () => {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const activeStepIdxRef = useRef(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [isDesktopPinned, setIsDesktopPinned] = useState(false);

  // Sync ref with state
  useEffect(() => {
    activeStepIdxRef.current = activeStepIdx;
  }, [activeStepIdx]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        isMotionOk: '(prefers-reduced-motion: no-preference)'
      },
      (context) => {
        const { isDesktop, isMotionOk } = context.conditions as {
          isDesktop: boolean;
          isMotionOk: boolean;
        };

        if (isDesktop && isMotionOk && sectionRef.current && pinRef.current) {
          setIsDesktopPinned(true);

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            pin: pinRef.current,
            pinSpacing: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const stepCount = BUILD_STEPS.length;
              const progress = self.progress;
              const idx = Math.min(
                Math.floor(progress * stepCount * 0.999),
                stepCount - 1
              );
              // Avoid triggering React re-renders unless the step index actually changed
              if (idx !== activeStepIdxRef.current) {
                activeStepIdxRef.current = idx;
                setActiveStepIdx(idx);
              }
            }
          });
        } else {
          setIsDesktopPinned(false);
        }
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  const activeStep = BUILD_STEPS[activeStepIdx];
  const StepIcon = activeStep.icon;

  const handleNext = () => {
    setActiveStepIdx((prev) => (prev + 1) % BUILD_STEPS.length);
  };

  const handlePrev = () => {
    setActiveStepIdx((prev) => (prev - 1 + BUILD_STEPS.length) % BUILD_STEPS.length);
  };

  return (
    <section
      id="how-i-build"
      ref={sectionRef}
      className="relative bg-[#0D1117] border-b border-[#30363D]/80"
      style={{ minHeight: isDesktopPinned ? '350vh' : 'auto' }}
    >
      <div
        ref={pinRef}
        className={`w-full flex flex-col justify-between py-16 sm:py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden select-none ${
          isDesktopPinned ? 'h-screen sticky top-0' : 'min-h-[85vh]'
        }`}
      >
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#30363D] pb-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-[#3FB950] mono text-xs tracking-widest uppercase mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>ENGINEERING METHODOLOGY // PIPELINE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#C9D1D9] tracking-tight uppercase">
              HOW I BUILD
            </h2>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs text-[#8B949E]">
            <span>STEP {activeStep.number} OF 07</span>
            <div className="w-24 h-1.5 bg-[#21262D] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3FB950] transition-all duration-300"
                style={{ width: `${((activeStepIdx + 1) / BUILD_STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Interactive Stage Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto relative z-10 py-6">
          {/* Left Column: Vertical Step Ribbon / Stepper */}
          <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar">
            {BUILD_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIdx;
              const isPast = idx < activeStepIdx;

              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStepIdx(idx)}
                  id={`step-nav-btn-${step.number}`}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-mono text-xs text-left transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#161B22] border border-[#30363D] text-[#C9D1D9] shadow-lg'
                      : isPast
                      ? 'text-[#8B949E] hover:text-[#C9D1D9] hover:bg-[#161B22]/40'
                      : 'text-[#8B949E]/50 hover:text-[#8B949E]'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold ${
                      isActive
                        ? 'bg-[#3FB950] text-[#0D1117]'
                        : isPast
                        ? 'bg-[#21262D] text-[#3FB950]'
                        : 'bg-[#21262D]/50 text-[#8B949E]'
                    }`}
                  >
                    {step.number}
                  </span>
                  <span className={`tracking-wider font-semibold ${isActive ? 'text-[#C9D1D9]' : ''}`}>
                    {step.title}
                  </span>
                  {isActive && (
                    <ArrowRight className="w-3.5 h-3.5 text-[#3FB950] ml-auto hidden lg:block" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Stage Cinematic Detail Card */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.number}
                initial={{ opacity: 0, y: 15, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.99 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#161B22] border border-[#30363D] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
              >
                {/* Accent corner line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{ backgroundColor: activeStep.color }}
                />

                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${activeStep.color}15`, color: activeStep.color }}
                    >
                      <StepIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-mono text-xs tracking-widest text-[#8B949E] uppercase">
                        STAGE {activeStep.number}
                      </span>
                      <h3 className="font-display font-black text-2xl sm:text-4xl text-[#C9D1D9] tracking-tight">
                        {activeStep.title}
                      </h3>
                    </div>
                  </div>

                  <span
                    className="hidden sm:inline-block px-3 py-1 rounded-full font-mono text-[11px] uppercase border"
                    style={{
                      borderColor: `${activeStep.color}40`,
                      color: activeStep.color,
                      backgroundColor: `${activeStep.color}10`
                    }}
                  >
                    {activeStep.systemFocus}
                  </span>
                </div>

                <p className="font-mono text-sm text-[#3FB950] font-medium mb-4">
                  {activeStep.tagline}
                </p>

                <p className="text-base text-[#8B949E] leading-relaxed mb-8 max-w-2xl">
                  {activeStep.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="border-t border-[#30363D]/80 pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-[#C9D1D9] tracking-wider uppercase font-semibold">
                      KEY ENGINEERING DELIVERABLES:
                    </span>
                    <div className="flex items-center gap-2 lg:hidden">
                      <button
                        onClick={handlePrev}
                        className="px-2 py-1 rounded bg-[#21262D] text-[#8B949E] hover:text-white text-[10px] font-mono border border-[#30363D]"
                      >
                        PREV
                      </button>
                      <button
                        onClick={handleNext}
                        className="px-2 py-1 rounded bg-[#21262D] text-[#3FB950] hover:text-white text-[10px] font-mono border border-[#30363D]"
                      >
                        NEXT
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeStep.deliverables.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-2.5 bg-[#21262D]/60 border border-[#30363D]/50 rounded-lg text-xs font-mono text-[#C9D1D9]"
                      >
                        <CheckCircle
                          className="w-3.5 h-3.5 mt-0.5 shrink-0"
                          style={{ color: activeStep.color }}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Timeline Progress Ribbon */}
        <div className="border-t border-[#30363D] pt-4 flex flex-wrap items-center justify-between text-xs font-mono text-[#8B949E]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3FB950]" />
            <span>{isDesktopPinned ? 'CONTINUOUS CYCLE: SCROLL DOWN TO PROGRESS' : 'ENGINEERING ITERATION CYCLE'}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px]">
            <span>SLIATE GALLE &amp; BOTCALM RIGOR</span>
            <span>ZERO DEFECT TOLERANCE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
