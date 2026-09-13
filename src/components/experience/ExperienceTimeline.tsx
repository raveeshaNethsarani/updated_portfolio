import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Briefcase, Calendar, MapPin, CheckCircle2, Shield, Cpu, Layers, ArrowUpRight } from 'lucide-react';
import { EXPERIENCE_DATA } from '../../data/experience';

export const ExperienceTimeline: React.FC = () => {
  const currentExp = EXPERIENCE_DATA[0];

  return (
    <section id="experience" className="relative bg-[#0D1117] py-24 sm:py-36 border-b border-[#30363D]">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Editorial Section Eyebrow & Header */}
        <div className="flex items-center justify-between border-b border-[#30363D] pb-4 mb-16">
          <div className="flex items-center gap-3 text-[#3FB950] mono text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#3FB950] inline-block" />
            <span>[ 04 // PROFESSIONAL LEDGER &amp; SYSTEM ROLES ]</span>
          </div>
          <span className="hidden sm:inline-block mono text-[10px] text-[#8B949E] uppercase tracking-widest">
            TENURE: 2024 &ndash; PRESENT
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end justify-between border-b border-[#30363D] pb-12 mb-16">
          <div className="lg:col-span-8">
            <h2 className="font-black text-5xl sm:text-7xl md:text-8xl text-[#C9D1D9] tracking-tighter uppercase leading-[0.88]">
              PRODUCTION<br />
              <span className="text-outline">EXPERIENCE.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 space-y-3">
            <p className="mono text-xs sm:text-sm text-[#8B949E] leading-relaxed">
              Leading full-stack system initiatives at BotCalm: architecting payment flows, secure webhook engines, AI agents, and enterprise RBAC matrices.
            </p>
            <div className="flex items-center gap-2 mono text-xs text-[#3FB950]">
              <span className="w-2 h-2 rounded-full bg-[#3FB950] animate-pulse" />
              <span>ACTIVE SYSTEM DEPLOYMENT</span>
            </div>
          </div>
        </div>

        {/* Engineering Ledger Architecture Container */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-[#3FB950]/50 space-y-12">
          {/* Active Ping Node */}
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#0D1117] border-2 border-[#3FB950] flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3FB950] animate-ping" />
          </div>

          {/* Main Experience Ledger Block */}
          <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-6 sm:p-12 shadow-2xl relative">
            {/* Top Specification Header */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-[#30363D] pb-8 mb-10">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded bg-[#3FB950]/10 border border-[#3FB950]/40 text-[#3FB950] font-mono text-xs font-bold uppercase tracking-widest">
                    {currentExp.status}
                  </span>
                  <span className="font-mono text-xs text-[#8B949E] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {currentExp.period}
                  </span>
                </div>
                <h3 className="font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
                  {currentExp.company}
                </h3>
                <h4 className="font-mono font-bold text-base sm:text-lg text-[#3FB950]">
                  // {currentExp.role}
                </h4>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="font-mono text-xs text-[#C9D1D9] px-3.5 py-2 bg-[#0D1117] border border-[#30363D] rounded-lg flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#58A6FF]" />
                  <span>{currentExp.location}</span>
                </div>
                <div className="font-mono text-xs text-[#8B949E] px-3.5 py-2 bg-[#0D1117] border border-[#30363D] rounded-lg">
                  PRIMARY STACK: Next.js / TypeScript / Go / PostgreSQL
                </div>
              </div>
            </div>

            {/* Overview Narrative */}
            <p className="text-base sm:text-lg text-[#C9D1D9]/90 font-light leading-relaxed mb-12 max-w-4xl">
              {currentExp.overview}
            </p>

            {/* Systematic Responsibilities Matrix */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#30363D]/80 pb-3">
                <span className="font-mono text-xs text-[#C9D1D9] tracking-widest uppercase font-bold flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#3FB950]" />
                  <span>CORE PRODUCTION SCOPES &amp; DELIVERABLES</span>
                </span>
                <span className="font-mono text-[10px] text-[#8B949E]">
                  9 SUBSYSTEM DOMAINS
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {currentExp.focusAreas.map((focus, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04, duration: 0.4 }}
                    className="p-5 bg-[#0D1117] border border-[#30363D]/80 hover:border-[#3FB950]/80 rounded-xl flex flex-col justify-between transition-all duration-200 group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[10px] text-[#3FB950] font-bold">
                          DOM-0{index + 1}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#30363D] group-hover:bg-[#3FB950] transition-colors" />
                      </div>
                      <h5 className="font-bold text-base text-[#C9D1D9] group-hover:text-white transition-colors mb-2">
                        {focus.title}
                      </h5>
                      <p className="text-xs text-[#8B949E] leading-relaxed mb-5">
                        {focus.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#30363D]/60">
                      {focus.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161B22] text-[#8B949E] group-hover:text-[#C9D1D9] border border-[#30363D]/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
