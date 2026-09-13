import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Search, Layers, Sparkles, Filter, Check, ExternalLink } from 'lucide-react';
import { SKILLS_DATA } from '../../data/skills';
import { TechIcon } from './TechIcons';
import { TechMarquee } from './TechMarquee';
import { CurrentlyExploring } from './CurrentlyExploring';

export const TechStackSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredSkill, setHoveredSkill] = useState<{ name: string; notes?: string; level: string; category?: string } | null>(null);

  const filteredCategories = SKILLS_DATA.filter((cat) => {
    if (selectedCategory !== 'all' && cat.id !== selectedCategory) return false;
    return true;
  }).map((cat) => {
    if (!searchQuery.trim()) return cat;
    const q = searchQuery.toLowerCase();
    const matchingSkills = cat.skills.filter(
      (s) => s.name.toLowerCase().includes(q) || (s.notes && s.notes.toLowerCase().includes(q))
    );
    return { ...cat, skills: matchingSkills };
  }).filter((cat) => cat.skills.length > 0);

  const totalSkillsCount = SKILLS_DATA.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section id="stack" className="relative bg-[#0D1117]/80 py-24 sm:py-36 border-b border-[#30363D]">
      {/* Background Dots */}
      <div className="absolute inset-0 bg-dot-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Editorial Section Eyebrow & Header */}
        <div className="flex items-center justify-between border-b border-[#30363D] pb-4 mb-16">
          <div className="flex items-center gap-3 text-[#3FB950] mono text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#3FB950] inline-block" />
            <span>[ 05 // SYSTEM TOOLCHAIN &amp; RUNTIME CONTRACTS ]</span>
          </div>
          <span className="hidden sm:inline-block mono text-[10px] text-[#8B949E] uppercase tracking-widest">
            STRICT TYPE SAFETY &bull; PRODUCTION PROVEN
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end justify-between border-b border-[#30363D] pb-12 mb-12">
          <div className="lg:col-span-8">
            <h2 className="font-black text-5xl sm:text-7xl md:text-8xl text-[#C9D1D9] tracking-tighter uppercase leading-[0.88]">
              TECHNICAL<br />
              <span className="text-outline">TOOLCHAIN.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 space-y-3">
            <p className="mono text-xs sm:text-sm text-[#8B949E] leading-relaxed">
              Curated architectural dependencies and runtimes. Every technology is paired with strict type soundness, operational reliability, and observable execution.
            </p>
            <div className="mono text-xs text-[#3FB950] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3FB950] animate-pulse" />
              <span>TOTAL {totalSkillsCount} PRODUCTION CAPABILITIES</span>
            </div>
          </div>
        </div>

        {/* 04. Continuous Technology Marquee */}
        <TechMarquee />

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-12 bg-[#161B22]/80 border border-[#30363D] p-3 sm:p-4 rounded-xl backdrop-blur-md shadow-xl">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#3FB950] text-[#0D1117] font-bold shadow-md shadow-[#3FB950]/15'
                  : 'text-[#8B949E] hover:text-[#C9D1D9] hover:bg-[#21262D]'
              }`}
            >
              ALL ({totalSkillsCount})
            </button>
            {SKILLS_DATA.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#21262D] text-[#3FB950] border border-[#3FB950]/50 font-bold'
                    : 'text-[#8B949E] hover:text-[#C9D1D9] hover:bg-[#21262D]'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-[#8B949E] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search runtime or pattern..."
              className="w-full bg-[#0D1117] border border-[#30363D] rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-[#C9D1D9] focus:outline-none focus:border-[#3FB950] placeholder:text-[#8B949E]/50"
            />
          </div>
        </div>

        {/* Categories & Interactive Technology Cards */}
        <div className="space-y-12 mb-20">
          {filteredCategories.map((category, idx) => (
            <div
              key={category.id}
              className="bg-[#161B22]/70 border border-[#30363D]/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl"
            >
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#30363D]/80 pb-4 mb-6 gap-2">
                <div className="flex items-center gap-3">
                  <span className="mono text-xs text-[#3FB950] font-bold">
                    {String(idx + 1).padStart(2, '0')} //
                  </span>
                  <h3 className="font-mono text-sm sm:text-base font-black text-[#C9D1D9] tracking-wider uppercase">
                    {category.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-[#8B949E] hidden md:inline-block">
                    {category.description}
                  </span>
                  <span className="font-mono text-[10px] text-[#8B949E] px-2.5 py-0.5 rounded-full bg-[#0D1117] border border-[#30363D]">
                    {category.skills.length} TECHNOLOGIES
                  </span>
                </div>
              </div>

              {/* Technology Items Grid with Official Logos */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    onMouseEnter={() =>
                      setHoveredSkill({
                        name: skill.name,
                        notes: skill.notes,
                        level: skill.level,
                        category: category.title
                      })
                    }
                    data-cursor="tech"
                    className="group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-xl bg-[#0D1117]/80 border border-[#30363D]/70 hover:border-[#3FB950]/60 hover:bg-[#161B22] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#3FB950]/5 cursor-pointer select-none"
                  >
                    {/* Top row: Logo + Level dot */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#161B22] border border-[#30363D]/80 group-hover:border-[#3FB950]/40 flex items-center justify-center text-[#8B949E] group-hover:text-white transition-colors duration-200">
                        <TechIcon name={skill.name} className="w-4 h-4" colored={true} />
                      </div>
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#21262D]/60 text-[#8B949E] group-hover:text-[#3FB950] transition-colors uppercase">
                        {skill.level}
                      </span>
                    </div>

                    {/* Tech Name */}
                    <div>
                      <h4 className="font-mono text-xs sm:text-[13px] font-bold text-[#C9D1D9] group-hover:text-white transition-colors tracking-tight">
                        {skill.name}
                      </h4>
                      {skill.notes && (
                        <p className="font-mono text-[10px] text-[#8B949E] mt-1 line-clamp-1 group-hover:text-[#8B949E]/90">
                          {skill.notes}
                        </p>
                      )}
                    </div>

                    {/* Accent Corner Line on Hover */}
                    <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#3FB950] opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Hovered Skill Live Inspector Pill */}
        {hoveredSkill && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 p-5 bg-[#161B22] border border-[#3FB950]/50 rounded-xl font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#0D1117] border border-[#30363D] flex items-center justify-center">
                <TechIcon name={hoveredSkill.name} className="w-3.5 h-3.5" colored={true} />
              </div>
              <div>
                <span className="text-white font-bold">{hoveredSkill.name}</span>
                <span className="text-[#8B949E] ml-2">&bull; {hoveredSkill.category} ({hoveredSkill.level})</span>
              </div>
            </div>
            {hoveredSkill.notes && (
              <span className="text-[#58A6FF]">{hoveredSkill.notes}</span>
            )}
          </motion.div>
        )}

        {/* CURRENTLY EXPLORING SECTION */}
        <CurrentlyExploring />
      </div>
    </section>
  );
};

