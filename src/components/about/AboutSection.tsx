import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ScrollReveal } from '../animations/ScrollReveal';
import { accentLine, revealItem } from '../animations/motionPresets';
import {
  Terminal,
  Cpu,
  Layers,
  GraduationCap,
  Briefcase,
  Shield,
  Zap,
  Database,
  Lock,
  Globe,
  Radio,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export const AboutSection: React.FC = () => {

  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-[#30363D] bg-[#0D1117] section-y"
    >
      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-15" />

      {/* Main Container */}
      <div className="relative z-10 section-container">
        
        {/* Section Header */}
        <ScrollReveal className="mb-10 flex items-center justify-between border-b border-[#30363D] pb-4 sm:mb-16 lg:mb-24">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#3FB950] sm:text-xs lg:tracking-[0.3em]">
            <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-[#3FB950]" />
            <span className="text-balance">[ 03 // ENGINEERING BIOGRAPHY &amp; METHODOLOGY ]</span>
          </div>
        </ScrollReveal>

        {/* Main Editorial Layout */}
        <div className="grid grid-cols-1 gap-12 sm:gap-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 xl:gap-20">
          
          {/* =========================================================
              LEFT — MASSIVE HEADLINE
          ========================================================== */}
          <div>
            <div className="lg:sticky lg:top-24">
              <ScrollReveal className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#8B949E]">
                <Terminal className="h-3.5 w-3.5 text-[#3FB950]" />
                <span>IDENTITY / ENGINEERING MINDSET</span>
              </ScrollReveal>

              <ScrollReveal delay={0.06}>
                <h2 className="font-black uppercase leading-[0.82] tracking-[-0.07em] text-[#C9D1D9] text-5xl sm:text-7xl md:text-8xl lg:text-[clamp(6rem,9.5vw,11rem)]">
                ENGINEER
                <br />

                <span className="text-outline">
                  WHO THINKS
                </span>

                <br />

                <span className="text-[#3FB950]">
                  IN  SYSTEMS.
                </span>
                </h2>
              </ScrollReveal>

              {/* Small technical line */}
              <ScrollReveal delay={0.12} className="mt-8 sm:mt-10 flex max-w-xl items-start gap-4 border-l border-[#3FB950] pl-5">
                <Zap className="mt-0.5 h-4 w-4 shrink-0 text-[#3FB950]" />

                <p className="font-mono text-xs leading-relaxed text-[#8B949E] sm:text-sm sm:text-justify">
                  From interface behavior to backend infrastructure,
                  I approach software as a connected system rather than
                  a collection of isolated features.
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* =========================================================
              RIGHT — BIOGRAPHY + CREDENTIALS + QUOTE
          ========================================================== */}
          <div>
            <ScrollReveal delay={0.08} stagger={0.1} className="space-y-10">

              {/* Biography */}
              <div className="space-y-6 text-[#C9D1D9]/90 ">
                <motion.div variants={revealItem} className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#3FB950] ">
                  <motion.span variants={accentLine} className="h-px w-8 origin-left bg-[#3FB950]" />
                  <span>PROFILE</span>
                </motion.div>

                <motion.p variants={revealItem} className="text-base font-light leading-relaxed sm:text-lg sm:text-justify">
                  Operating at the intersection of{' '}
                  <strong className="font-semibold text-white">
                    client-side reactivity
                  </strong>{' '}
                  and{' '}
                  <strong className="font-semibold text-[#3FB950]">
                    backend infrastructure
                  </strong>
                  , I work as a Full Stack System Engineer at{' '}
                  <strong className="font-semibold text-white">
                    BotCalm (Pvt) Ltd
                  </strong>
                  .
                </motion.p>

                <motion.p variants={revealItem} className="text-sm leading-7 text-[#8B949E] sm:text-base sm:text-justify">
                  My technical philosophy was shaped through rigorous
                  academic study in the IT Department of the{' '}
                  <strong className="text-[#C9D1D9]">
                    Sri Lanka Institute of Advanced Technological Education
                    (SLIATE), Galle
                  </strong>
                  , where I earned a Higher National Diploma in Information
                  Technology.
                </motion.p>

                <motion.p variants={revealItem} className="text-sm leading-7 text-[#8B949E] sm:text-base sm:text-justify">
                  That foundation developed my focus on database design,
                  computational thinking, networking, and disciplined
                  software engineering practices.
                  In production environments, I work across system
                  boundaries — building APIs, authentication flows,
                  role-based access control, database-backed services,
                  reactive interfaces, and distributed application
                  components.
                </motion.p>
              </div>

           

              {/* Philosophy Quote */}
              {/* <div className="relative border-l border-[#30363D] pl-6">
                <Sparkles className="absolute -left-[7px] top-0 h-3.5 w-3.5 bg-[#0D1117] text-[#3FB950]" />

                <p className="font-mono text-xs leading-7 text-[#C9D1D9] sm:text-sm text-justify">
                  “Software quality is an architectural property, not a
                  surface polish. Every system layer must exhibit explicit
                  error containment, rigorous type boundaries, and graceful
                  degradation.”
                </p>

                <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#3FB950]">
                  <span>—</span>
                  <span>Raveesha Nethsarani Siriwardana</span>
                </div>
              </div> */}
            </ScrollReveal>

            
          </div>
        </div>
      </div>


         {/* Credential Cards */}
              <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 section-container pt-10 sm:pt-12">

                {/* Work */}
                <ScrollReveal delay={0.05} className="motion-lift group rounded-xl border border-[#30363D] bg-[#161B22]/70 p-5 transition-colors duration-300 hover:border-[#3FB950]/50">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-wider text-[#3FB950]">
                      <Briefcase className="motion-icon motion-icon-up h-3.5 w-3.5" />
                      <span>PRODUCTION AFFILIATION</span>
                    </div>

                    <span className="font-mono text-[10px] text-[#8B949E]">
                      01
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white">
                    Full Stack System Engineer
                  </h3>

                  <p className="mt-1 font-mono text-[11px] text-[#8B949E]">
                    BotCalm (Pvt) Ltd · Sri Lanka
                  </p>
                </ScrollReveal>

                {/* Education */}
                <ScrollReveal delay={0.12} className="motion-lift group rounded-xl border border-[#30363D] bg-[#161B22]/70 p-5 transition-colors duration-300 hover:border-[#58A6FF]/50">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-wider text-[#58A6FF]">
                      <GraduationCap className="motion-icon motion-icon-up h-3.5 w-3.5" />
                      <span>ACADEMIC CREDENTIAL</span>
                    </div>

                    <span className="font-mono text-[10px] text-[#8B949E]">
                      02
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white">
                    HND in Information Technology
                  </h3>

                  <p className="mt-1 font-mono text-[11px] text-[#8B949E]">
                    SLIATE Galle · IT Department
                  </p>
                </ScrollReveal>

              </div>
    </section>
  );
};
