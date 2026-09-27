import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Search, X } from 'lucide-react';
import { SKILLS_DATA } from '../../data/skills';
import { TechIcon } from './TechIcons';
import { TechMarquee } from './TechMarquee';
import { CurrentlyExploring } from './CurrentlyExploring';

type ActiveSkill = { name: string; notes?: string; level: string; category: string };

const LEVEL_DOT: Record<string, string> = {
  Expert: 'bg-[#3FB950]',
  Advanced: 'bg-[#58A6FF]',
  Intermediate: 'bg-[#D29922]',
  Practical: 'bg-[#A371F7]',
  'Exploring / Practical': 'bg-[#A371F7]'
};

const LEGEND: [string, string][] = [
  ['Expert', 'bg-[#3FB950]'],
  ['Advanced', 'bg-[#58A6FF]'],
  ['Intermediate', 'bg-[#D29922]'],
  ['Practical', 'bg-[#A371F7]']
];

const dotFor = (level: string) => LEVEL_DOT[level] ?? 'bg-[#8B949E]';

export const TechStackSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSkill, setActiveSkill] = useState<ActiveSkill | null>(null);

  const q = searchQuery.trim().toLowerCase();

  const visibleCategories = useMemo(
    () =>
      SKILLS_DATA.map((cat, i) => ({ ...cat, order: i }))
        .filter((cat) => selectedCategory === 'all' || cat.id === selectedCategory)
        .map((cat) =>
          q
            ? {
                ...cat,
                skills: cat.skills.filter(
                  (s) => s.name.toLowerCase().includes(q) || s.notes?.toLowerCase().includes(q)
                )
              }
            : cat
        )
        .filter((cat) => cat.skills.length > 0),
    [selectedCategory, q]
  );

  const totalSkillsCount = SKILLS_DATA.reduce((acc, cat) => acc + cat.skills.length, 0);

  const gridCols =
    visibleCategories.length === 1
      ? 'grid-cols-1'
      : visibleCategories.length === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4';

  return (
    <section id="stack" className="relative bg-[#0D1117]/80 py-16 sm:py-20 border-b border-[#30363D]">
      {/* Background Dots */}
      <div className="absolute inset-0 bg-dot-pattern opacity-15 pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Eyebrow */}
        <div className="flex items-center justify-between border-b border-[#30363D] pb-3 mb-8">
          <div className="flex items-center gap-3 text-[#3FB950] mono text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#3FB950] inline-block" />
            <span>[ 05 // SYSTEM TOOLCHAIN &amp; RUNTIME CONTRACTS ]</span>
          </div>
          <span className="hidden sm:inline-block mono text-[10px] text-[#8B949E] uppercase tracking-widest">
            STRICT TYPE SAFETY &bull; PRODUCTION PROVEN
          </span>
        </div>

        {/* Header — single horizontal row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8">
          <h2 className="font-black text-4xl sm:text-5xl xl:text-[9rem] text-[#C9D1D9] tracking-tighter uppercase leading-[0.9]">
            TECHNICAL <span className="text-outline">TOOLCHAIN.</span>
          </h2>
          <div className="lg:max-w-md space-y-2">
            <p className="mono text-xs text-[#8B949E] leading-relaxed">
              Curated architectural dependencies and runtimes — paired with strict type soundness,
              operational reliability, and observable execution.
            </p>
            <div className="mono text-xs text-[#3FB950] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3FB950] animate-pulse" />
              <span>TOTAL {totalSkillsCount} PRODUCTION CAPABILITIES</span>
            </div>
          </div>
        </div>

      </div>

      {/* Continuous Technology Marquee — FULL SCREEN WIDTH  */}
      {/* <div className="relative z-10">
        <TechMarquee />
      </div> */}

      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

        {/* Toolbar: tabs + search */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-3 bg-[#161B22]/80 border border-[#30363D] p-2.5 rounded-xl backdrop-blur-md">
          <div className="flex-1 min-w-0 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#3FB950] text-[#0D1117] font-bold'
                  : 'text-[#8B949E] hover:text-[#C9D1D9] hover:bg-[#21262D]'
              }`}
            >
              ALL ({totalSkillsCount})
            </button>
            {SKILLS_DATA.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-mono tracking-wider transition-all whitespace-nowrap cursor-pointer border ${
                  selectedCategory === cat.id
                    ? 'bg-[#21262D] text-[#3FB950] border-[#3FB950]/50 font-bold'
                    : 'border-transparent text-[#8B949E] hover:text-[#C9D1D9] hover:bg-[#21262D]'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          <div className="relative lg:w-64 shrink-0">
            <Search className="w-4 h-4 text-[#8B949E] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search runtime or pattern..."
              className="w-full bg-[#0D1117] border border-[#30363D] rounded-lg pl-9 pr-8 py-2 text-xs font-mono text-[#C9D1D9] focus:outline-none focus:border-[#3FB950] placeholder:text-[#8B949E]/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8B949E] hover:text-[#C9D1D9] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Inspector strip — shows notes instead of taking card height */}
        <div className="h-9 mb-5 flex items-center justify-between gap-4 px-3 rounded-lg border border-dashed border-[#30363D] bg-[#0D1117]/60 font-mono text-[11px] overflow-hidden">
          {/* <div className="flex items-center gap-2 min-w-0">
            {activeSkill ? (
              <>
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotFor(activeSkill.level)}`} />
                <span className="text-[#C9D1D9] font-bold shrink-0">{activeSkill.name}</span>
                <span className="text-[#3FB950] uppercase shrink-0">[{activeSkill.level}]</span>
                {activeSkill.notes && (
                  <span className="text-[#8B949E] truncate">— {activeSkill.notes}</span>
                )}
              </>
            ) : (
              <span className="text-[#8B949E]">// hover or tap a technology to inspect details</span>
            )}
          </div> */}
          <div className="hidden md:flex items-center gap-3 shrink-0 text-[10px] text-[#8B949E] uppercase">
            {LEGEND.map(([label, dot]) => (
              <span key={label} className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Category grid — horizontal, compact */}
        {visibleCategories.length > 0 ? (
          <div className={`grid ${gridCols} gap-4 mb-14`} onMouseLeave={() => setActiveSkill(null)}>
            {visibleCategories.map((category) => (
              <motion.div
                layout
                key={category.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col bg-[#161B22]/70 border border-[#30363D]/80 rounded-xl p-4 backdrop-blur-sm hover:border-[#30363D] transition-colors"
              >
                {/* Card header */}
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="mono text-[10px] text-[#3FB950] font-bold">
                      {String(category.order + 1).padStart(2, '0')} //
                    </span>
                    <h3 className="font-mono text-xs font-black text-[#C9D1D9] tracking-wider uppercase truncate">
                      {category.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[9px] text-[#8B949E] px-2 py-0.5 rounded-full bg-[#0D1117] border border-[#30363D] shrink-0">
                    {category.skills.length}
                  </span>
                </div>
                <p className="font-mono text-[10px] text-[#8B949E] mb-3 line-clamp-1">{category.description}</p>

                {/* Skill chips */}
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => {
                    const isActive = activeSkill?.name === skill.name;
                    const info = {
                      name: skill.name,
                      notes: skill.notes,
                      level: skill.level,
                      category: category.title
                    };
                    return (
                      <button
                        key={skill.name}
                        type="button"
                        data-cursor="tech"
                        onMouseEnter={() => setActiveSkill(info)}
                        onFocus={() => setActiveSkill(info)}
                        onClick={() => setActiveSkill(info)}
                        title={skill.notes ? `${skill.level} — ${skill.notes}` : skill.level}
                        className={`group flex items-center gap-1.5 pl-1.5 pr-2 py-1 rounded-md border bg-[#0D1117]/80 transition-all duration-150 cursor-pointer select-none hover:-translate-y-0.5 ${
                          isActive
                            ? 'border-[#3FB950]/70 bg-[#161B22]'
                            : skill.highlight
                            ? 'border-[#3FB950]/25 hover:border-[#3FB950]/60'
                            : 'border-[#30363D]/70 hover:border-[#3FB950]/60'
                        }`}
                      >
                        <span className="w-5 h-5 rounded flex items-center justify-center bg-[#161B22] text-[#8B949E] group-hover:text-white">
                          <TechIcon name={skill.name} className="w-3 h-3" colored={true} />
                        </span>
                        <span className="font-mono text-[11px] font-semibold text-[#C9D1D9] group-hover:text-white whitespace-nowrap">
                          {skill.name}
                        </span>
                        <span className={`w-1.5 h-1.5 rounded-full ${dotFor(skill.level)}`} />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mb-14 py-10 text-center font-mono text-xs text-[#8B949E] border border-dashed border-[#30363D] rounded-xl">
            No technology matches “{searchQuery}”.
          </div>
        )}

        {/* Currently Exploring */}
        <CurrentlyExploring />
      </div>
    </section>
  );
};