import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Layers, ArrowUpRight, CheckCircle2, ShieldCheck, Eye, Cpu } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectItem } from '../../types';
import { PROJECTS_DATA } from '../../data/projects';
import { ProjectVisuals } from './ProjectVisuals';
import { HorizontalProjects } from './HorizontalProjects';

gsap.registerPlugin(ScrollTrigger);

interface SelectedWorkProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectProject }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

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

        if (isDesktop && isMotionOk && sectionRef.current) {
          PROJECTS_DATA.forEach((project) => {
            const visualCard = document.getElementById(`project-visual-${project.id}`);
            const parentCard = document.getElementById(`project-card-${project.id}`);

            if (visualCard && parentCard) {
              gsap.fromTo(
                visualCard,
                { y: 25 },
                {
                  y: -25,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: parentCard,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.2,
                    invalidateOnRefresh: true
                  }
                }
              );
            }
          });
        }
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative bg-[#0D1117] py-20 sm:py-32 border-b border-[#30363D]">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      {/* Main Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mb-16 sm:mb-24 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#30363D] pb-8">
          <div>
            <div className="flex items-center gap-2 text-[#3FB950] mono text-xs tracking-widest uppercase mb-3">
              <Terminal className="w-3.5 h-3.5" />
              <span>ENGINEERING CASE STUDIES // PRODUCTION WORK</span>
            </div>
            <h2 className="font-black text-4xl sm:text-6xl md:text-7xl text-[#C9D1D9] tracking-tighter uppercase">
              SELECTED WORK
            </h2>
          </div>

          <p className="mono text-xs text-[#8B949E] max-w-md leading-relaxed">
            Real production systems engineered with end-to-end type safety, ACID transaction guarantees, cryptographic webhook security, and high-throughput real-time protocols.
          </p>
        </div>
      </div>

      {/* Large Editorial Project Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-24 sm:space-y-36 relative z-10">
        {PROJECTS_DATA.map((project, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={project.id}
              id={`project-card-${project.id}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Text & Meta Column */}
              <div
                className={`lg:col-span-6 space-y-6 ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                {/* Number & Category Pill */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#3FB950] px-3 py-1 rounded bg-[#161B22] border border-[#30363D]">
                    PROJECT {project.number}
                  </span>
                  <span className="font-mono text-xs text-[#8B949E] tracking-wider uppercase">
                    {project.category}
                  </span>
                </div>

                {/* Main Title */}
                <div>
                  <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#C9D1D9] tracking-tight hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-mono text-sm text-[#3FB950] mt-2 font-medium">
                    {project.tagline}
                  </p>
                </div>

                {/* Summary */}
                <p className="text-sm sm:text-base text-[#8B949E] leading-relaxed">
                  {project.summary}
                </p>

                {/* Key Architecture Bullet Points */}
                <div className="p-4 bg-[#161B22] border border-[#30363D] rounded-xl space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#58A6FF] font-semibold uppercase">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>CRITICAL DATAFLOW:</span>
                  </div>
                  <p className="font-mono text-xs text-[#C9D1D9] leading-relaxed">
                    {project.architecture.keyFlow}
                  </p>
                </div>

                {/* Technologies Grid */}
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-[#8B949E] tracking-widest uppercase block">
                    STACK &amp; RUNTIME:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded bg-[#21262D] border border-[#30363D] text-xs font-mono text-[#C9D1D9]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2">
                  <button
                    onClick={() => onSelectProject(project)}
                    data-cursor="project"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-[#21262D] hover:bg-[#30363D] text-[#C9D1D9] hover:text-white border border-[#30363D] hover:border-[#3FB950] rounded-lg font-mono text-xs tracking-wider transition-all duration-200 cursor-pointer shadow-lg"
                  >
                    <Eye className="w-4 h-4 text-[#3FB950]" />
                    <span>DEEP DIVE CASE STUDY</span>
                    <ArrowUpRight className="w-4 h-4 text-[#8B949E]" />
                  </button>
                </div>
              </div>

              {/* Interactive Visual / Diagram Column with Parallax Entrance */}
              <div
                className={`lg:col-span-6 ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div
                  id={`project-visual-${project.id}`}
                  data-cursor="explore"
                  onClick={() => onSelectProject(project)}
                  className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#30363D] shadow-2xl bg-[#161B22] relative group cursor-pointer"
                >
                  <ProjectVisuals project={project} />

                  {/* Corner Watermark */}
                  <div className="absolute bottom-3 right-4 font-mono text-[9px] text-[#8B949E]/50 uppercase pointer-events-none">
                    SYS_ID: {project.id} // SECURE
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Horizontal Project Gallery */}
      <div className="mt-28 sm:mt-36">
        <HorizontalProjects onSelectProject={onSelectProject} />
      </div>
    </section>
  );
};
