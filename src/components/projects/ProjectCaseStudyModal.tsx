import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, Cpu, Database, Server, Layers, CheckCircle2, ShieldAlert, FileCode } from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectCaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0D1117]/90 backdrop-blur-lg"
        />

        {/* Modal Window: Engineering Whitepaper Design */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 25 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#161B22] border border-[#30363D] rounded-2xl shadow-2xl overflow-hidden z-10 my-auto text-[#C9D1D9] max-h-[90vh] flex flex-col"
        >
          {/* Top Architectural Header */}
          <div className="flex items-center justify-between p-6 sm:p-10 border-b border-[#30363D] bg-[#161B22]">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#3FB950] px-3 py-1 rounded bg-[#3FB950]/10 border border-[#3FB950]/40 font-bold uppercase tracking-widest">
                  PROJECT {project.number}
                </span>
                <span className="font-mono text-[11px] text-[#8B949E] tracking-widest uppercase">
                  {project.category}
                </span>
              </div>
              <h3 className="font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
                {project.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              id="close-case-study-btn"
              className="p-2.5 rounded-xl bg-[#21262D] hover:bg-[#30363D] text-[#8B949E] hover:text-white transition-colors cursor-pointer border border-[#30363D]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-10 no-scrollbar">
            {/* System Overview */}
            <div className="space-y-3">
              <span className="font-mono text-xs text-[#3FB950] tracking-[0.25em] uppercase font-bold block">
                [ 01 // SYSTEM OVERVIEW &amp; PHILOSOPHY ]
              </span>
              <p className="text-lg sm:text-xl text-white leading-relaxed font-normal">
                {project.tagline}
              </p>
              <p className="text-sm sm:text-base text-[#8B949E] leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            {/* Architecture Decomposition */}
            <div className="bg-[#0D1117] border border-[#30363D] rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-[#30363D] pb-3">
                <span className="font-mono text-xs text-[#58A6FF] tracking-[0.25em] uppercase font-bold flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>[ 02 // ARCHITECTURAL SPECIFICATION ]</span>
                </span>
                <span className="font-mono text-[10px] text-[#8B949E]">
                  4-TIER TOPOLOGY
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 bg-[#161B22] border border-[#30363D]/80 rounded-xl space-y-1">
                  <div className="text-[#8B949E] text-[10px] uppercase flex items-center gap-1.5 font-bold">
                    <Cpu className="w-3.5 h-3.5 text-[#3FB950]" />
                    <span>FRONTEND TIER</span>
                  </div>
                  <p className="text-[#C9D1D9] leading-snug">{project.architecture.frontend}</p>
                </div>

                <div className="p-4 bg-[#161B22] border border-[#30363D]/80 rounded-xl space-y-1">
                  <div className="text-[#8B949E] text-[10px] uppercase flex items-center gap-1.5 font-bold">
                    <Server className="w-3.5 h-3.5 text-[#58A6FF]" />
                    <span>BACKEND SERVICE TIER</span>
                  </div>
                  <p className="text-[#C9D1D9] leading-snug">{project.architecture.backend}</p>
                </div>

                <div className="p-4 bg-[#161B22] border border-[#30363D]/80 rounded-xl space-y-1">
                  <div className="text-[#8B949E] text-[10px] uppercase flex items-center gap-1.5 font-bold">
                    <Database className="w-3.5 h-3.5 text-[#A371F7]" />
                    <span>DATA PERSISTENCE TIER</span>
                  </div>
                  <p className="text-[#C9D1D9] leading-snug">{project.architecture.database}</p>
                </div>

                <div className="p-4 bg-[#161B22] border border-[#30363D]/80 rounded-xl space-y-1">
                  <div className="text-[#8B949E] text-[10px] uppercase flex items-center gap-1.5 font-bold">
                    <Layers className="w-3.5 h-3.5 text-[#D29922]" />
                    <span>INFRASTRUCTURE &amp; PROTOCOLS</span>
                  </div>
                  <p className="text-[#C9D1D9] leading-snug">{project.architecture.infrastructure}</p>
                </div>
              </div>

              {/* Data Flow */}
              <div className="p-4 bg-[#161B22] border border-[#30363D]/80 rounded-xl font-mono text-xs space-y-1.5">
                <span className="text-[#8B949E] text-[10px] uppercase tracking-wider block font-bold">
                  CRITICAL DATAFLOW PIPELINE:
                </span>
                <p className="text-[#3FB950] font-medium leading-relaxed">{project.architecture.keyFlow}</p>
              </div>
            </div>

            {/* Engineering Challenges & Solutions */}
            <div className="space-y-4">
              <span className="font-mono text-xs text-[#F85149] tracking-[0.25em] uppercase font-bold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                <span>[ 03 // ENGINEERING CHALLENGES &amp; RESOLUTIONS ]</span>
              </span>

              <div className="space-y-4">
                {project.challengesAndSolutions.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-[#0D1117] border border-[#30363D] rounded-xl text-xs space-y-3"
                  >
                    <div className="flex items-start gap-2.5 text-[#F85149] font-mono">
                      <span className="shrink-0 font-bold">[CHALLENGE 0{idx + 1}]:</span>
                      <span className="text-[#C9D1D9] font-light leading-relaxed">{item.challenge}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-[#3FB950] font-mono pl-4 border-l-2 border-[#3FB950]">
                      <span className="shrink-0 font-bold">[RESOLVED]:</span>
                      <span className="text-white leading-relaxed">{item.solution}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights & Metrics */}
            <div className="space-y-4">
              <span className="font-mono text-xs text-[#D29922] tracking-[0.25em] uppercase font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>[ 04 // PRODUCTION METRICS &amp; HIGHLIGHTS ]</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.metricsAndHighlights.map((hl, i) => (
                  <div
                    key={i}
                    className="p-4 bg-[#0D1117] border border-[#30363D]/80 rounded-xl text-xs font-mono text-[#C9D1D9] flex items-start gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3FB950] mt-1.5 shrink-0" />
                    <span className="leading-snug">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="space-y-3">
              <span className="font-mono text-xs text-[#8B949E] tracking-[0.25em] uppercase font-bold block">
                [ 05 // SYSTEM DEPENDENCIES &amp; RUNTIME ]
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 bg-[#21262D] border border-[#30363D] text-xs font-mono text-white rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 sm:p-8 border-t border-[#30363D] bg-[#161B22] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <span className="text-[#8B949E]">
              SYSTEM ROLE: <strong className="text-white">{project.role}</strong>
            </span>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-[#21262D] hover:bg-[#30363D] text-white border border-[#30363D] transition-colors cursor-pointer font-bold tracking-wider"
            >
              CLOSE SPECIFICATION
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
