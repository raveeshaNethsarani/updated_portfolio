import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Sparkles, ArrowRight, Activity, Server, Cpu, Database, Network } from 'lucide-react';
import { CURRENTLY_EXPLORING_DATA } from '../../data/skills';

export const CurrentlyExploring: React.FC = () => {
  const [activeTopicId, setActiveTopicId] = useState<string>('go');

  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
      {/* Subtle Ambient Depth */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#A371F7]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#30363D] pb-8 mb-10">
        <div>
          <div className="flex items-center gap-2 text-[#A371F7] font-mono text-xs tracking-[0.3em] uppercase mb-2 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>[ R&amp;D FRONTIER // ACTIVE INVESTIGATION ]</span>
          </div>
          <h3 className="font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
            CURRENTLY EXPLORING
          </h3>
        </div>

        <div className="font-mono text-xs text-[#3FB950] px-4 py-2 rounded-lg bg-[#0D1117] border border-[#30363D] self-start sm:self-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#3FB950] animate-pulse" />
          <span>STATUS: BENCHMARKING &amp; LAB TESTING</span>
        </div>
      </div>

      {/* Interactive Topology Stream & Topic List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Topic Selector */}
        <div className="lg:col-span-5 space-y-3">
          {CURRENTLY_EXPLORING_DATA.map((topic, idx) => {
            const isSelected = activeTopicId === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setActiveTopicId(topic.id)}
                className={`w-full p-4 sm:p-5 rounded-xl border text-left font-mono text-xs transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                  isSelected
                    ? 'bg-[#21262D] border-[#A371F7] text-white shadow-xl'
                    : 'bg-[#0D1117]/80 border-[#30363D]/80 text-[#8B949E] hover:border-[#8B949E]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
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
                  className={`w-4 h-4 transition-transform ${
                    isSelected
                      ? 'text-[#A371F7] translate-x-1'
                      : 'text-[#30363D] group-hover:text-[#8B949E]'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right: Active Deep Dive & Flow Visualizer */}
        <div className="lg:col-span-7">
          {(() => {
            const current =
              CURRENTLY_EXPLORING_DATA.find((t) => t.id === activeTopicId) ||
              CURRENTLY_EXPLORING_DATA[0];

            return (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-8 bg-[#0D1117] border border-[#30363D] rounded-xl space-y-6 shadow-inner"
              >
                {/* Topic Header */}
                <div className="flex items-center justify-between border-b border-[#30363D] pb-4">
                  <div>
                    <span className="font-mono text-[10px] text-[#A371F7] uppercase tracking-widest block mb-1 font-semibold">
                      {current.status}
                    </span>
                    <h4 className="font-black text-2xl sm:text-3xl text-white tracking-tight">
                      {current.title}
                    </h4>
                  </div>
                  <Network className="w-6 h-6 text-[#A371F7]" />
                </div>

                {/* Description */}
                <p className="text-sm text-[#C9D1D9] leading-relaxed font-light">
                  {current.description}
                </p>

                {/* Applied Use Case */}
                <div className="p-4 sm:p-5 bg-[#161B22] border border-[#30363D] rounded-xl">
                  <span className="font-mono text-[10px] text-[#58A6FF] uppercase tracking-wider block mb-1.5 font-bold">
                    PRACTICAL APPLICATION &amp; LAB BENCHMARK:
                  </span>
                  <p className="font-mono text-xs text-[#C9D1D9] leading-relaxed">
                    {current.useCase}
                  </p>
                </div>

                {/* Tags */}
                <div>
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
                </div>
              </motion.div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};
