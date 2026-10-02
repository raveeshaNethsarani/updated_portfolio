import React, { useState } from 'react';
import { motion, type Variants } from 'motion/react';
import { Terminal, Sparkles, ArrowRight, Activity, Server, Cpu, Database, Network } from 'lucide-react';
import { CURRENTLY_EXPLORING_DATA } from '../../data/skills';
import { EASE } from '../animations/motionPresets';

// Container fades in first, then its lines reveal one after another.
const terminalContainer: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

const terminalLine: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

const topicLine: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
};

// Re-plays on every topic switch because the panel is keyed by topic id.
const detailPanel: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE, staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

export const CurrentlyExploring: React.FC = () => {
  const [activeTopicId, setActiveTopicId] = useState<string>('go');

  return (
    <motion.div
      variants={terminalContainer}
      className="bg-[#161B22] border border-[#30363D] rounded-2xl p-4 sm:p-8 lg:p-12 shadow-2xl relative overflow-hidden"
    >
      {/* Subtle Ambient Depth */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#A371F7]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <motion.div
        variants={terminalLine}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 border-b border-[#30363D] pb-6 mb-6 sm:pb-8 sm:mb-10"
      >
        <div>
          <div className="flex items-center gap-2 text-[#A371F7] font-mono text-[10px] sm:text-xs tracking-[0.2em] lg:tracking-[0.3em] uppercase mb-2 font-bold">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="text-balance">[ R&amp;D FRONTIER // ACTIVE INVESTIGATION ]</span>
          </div>
          <h3 className="font-black text-[length:clamp(1.75rem,8vw,3rem)] leading-none text-white tracking-tight uppercase">
            CURRENTLY EXPLORING
          </h3>
        </div>

        <div className="font-mono text-xs text-[#3FB950] px-4 py-2 rounded-lg bg-[#0D1117] border border-[#30363D] self-start sm:self-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#3FB950] animate-pulse" />
          <span>STATUS: BENCHMARKING &amp; LAB TESTING</span>
        </div>
      </motion.div>

      {/* Interactive Topology Stream & Topic List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left: Interactive Topic Selector */}
        <div className="lg:col-span-5 space-y-2 sm:space-y-3">
          {CURRENTLY_EXPLORING_DATA.map((topic, idx) => {
            const isSelected = activeTopicId === topic.id;
            return (
              <motion.button
                key={topic.id}
                variants={topicLine}
                onClick={() => setActiveTopicId(topic.id)}
                className={`w-full p-3.5 sm:p-5 rounded-xl border text-left font-mono text-xs transition-[background-color,border-color,color,box-shadow] duration-200 cursor-pointer flex items-center justify-between group ${
                  isSelected
                    ? 'bg-[#21262D] border-[#A371F7] text-white shadow-xl'
                    : 'bg-[#0D1117]/80 border-[#30363D]/80 text-[#8B949E] hover:border-[#8B949E]'
                }`}
              >
                <div className="flex min-w-0 items-center gap-3.5">
                  <span
                    className={`w-2 h-2 shrink-0 rounded-full ${
                      isSelected ? 'bg-[#A371F7] animate-ping' : 'bg-[#30363D]'
                    }`}
                  />
                  <div>
                    <span className="font-bold text-sm block tracking-wider group-hover:text-white">
                      {topic.title}
                    </span>
                    <span className="text-[10px] text-[#8B949E] mt-0.5 block">
                      {topic.subtitle}
                    </span>
                  </div>
                </div>

                <ArrowRight
                  className={`w-4 h-4 shrink-0 ml-3 transition-transform duration-200 ${
                    isSelected
                      ? 'text-[#A371F7] translate-x-1'
                      : 'text-[#30363D] group-hover:text-[#8B949E] group-hover:translate-x-0.5'
                  }`}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Right: Active Deep Dive & Flow Visualizer */}
        <div className="min-w-0 lg:col-span-7">
          {(() => {
            const current =
              CURRENTLY_EXPLORING_DATA.find((t) => t.id === activeTopicId) ||
              CURRENTLY_EXPLORING_DATA[0];

            return (
              <motion.div
                key={current.id}
                variants={detailPanel}
                className="p-4 sm:p-8 bg-[#0D1117] border border-[#30363D] rounded-xl space-y-5 sm:space-y-6 shadow-inner"
              >
                {/* Topic Header */}
                <motion.div variants={terminalLine} className="flex items-center justify-between gap-4 border-b border-[#30363D] pb-4">
                  <div>
                    <span className="font-mono text-[10px] text-[#A371F7] uppercase tracking-widest block mb-1 font-semibold">
                      {current.status}
                    </span>
                    <h4 className="font-black text-2xl sm:text-3xl text-white tracking-tight">
                      {current.title}
                    </h4>
                  </div>
                  <Network className="w-6 h-6 shrink-0 text-[#A371F7]" />
                </motion.div>

                {/* Description */}
                <motion.p variants={terminalLine} className="text-sm text-[#C9D1D9] leading-relaxed font-light">
                  {current.description}
                </motion.p>

                {/* Applied Use Case */}
                <motion.div variants={terminalLine} className="p-4 sm:p-5 bg-[#161B22] border border-[#30363D] rounded-xl">
                  <span className="font-mono text-[10px] text-[#58A6FF] uppercase tracking-wider block mb-1.5 font-bold">
                    PRACTICAL APPLICATION &amp; LAB BENCHMARK:
                  </span>
                  <p className="font-mono text-xs text-[#C9D1D9] leading-relaxed break-words">
                    {current.useCase}
                  </p>
                </motion.div>

                {/* Tags */}
                <motion.div variants={terminalLine}>
                  <span className="font-mono text-[10px] text-[#8B949E] uppercase tracking-widest block mb-2.5">
                    CORE CONCEPTS &amp; ARCHITECTURAL PATTERNS:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {current.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded bg-[#21262D] border border-[#30363D] text-xs font-mono text-[#A371F7] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
        </div>
      </div>
    </motion.div>
  );
};
