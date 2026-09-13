import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, Terminal, ChevronLeft, ChevronRight, Layers, Eye } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectItem } from '../../types';
import { PROJECTS_DATA } from '../../data/projects';
import { ProjectVisuals } from './ProjectVisuals';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const HorizontalProjects: React.FC<HorizontalProjectsProps> = ({ onSelectProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeProjectIndex;
  }, [activeProjectIndex]);

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

        if (!containerRef.current || !trackRef.current) return;

        const track = trackRef.current;

        if (isDesktop && isMotionOk) {
          const getScrollDistance = () => {
            return Math.max(0, track.scrollWidth - window.innerWidth + 160);
          };

          gsap.to(track, {
            x: () => -getScrollDistance(),
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              start: 'top top',
              end: () => `+=${getScrollDistance() + 400}`,
              onUpdate: (self) => {
                // Direct DOM update for 60fps progress bar without React re-render
                if (progressBarRef.current) {
                  progressBarRef.current.style.width = `${Math.max(14, self.progress * 100)}%`;
                }

                const idx = Math.min(
                  Math.floor(self.progress * PROJECTS_DATA.length * 0.999),
                  PROJECTS_DATA.length - 1
                );
                // Only trigger React state update when index changes
                if (idx !== activeIndexRef.current) {
                  activeIndexRef.current = idx;
                  setActiveProjectIndex(idx);
                }
              }
            }
          });
        }
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const scrollAmount = 420;
    trackRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Mobile native scroll handler to keep indicator in sync
  const handleTrackScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const progress = scrollLeft / maxScroll;

    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${Math.max(14, progress * 100)}%`;
    }

    const idx = Math.min(
      Math.floor(progress * PROJECTS_DATA.length * 0.999),
      PROJECTS_DATA.length - 1
    );
    if (idx !== activeIndexRef.current) {
      activeIndexRef.current = idx;
      setActiveProjectIndex(idx);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-[#0D1117] py-16 sm:py-24 border-b border-[#30363D]/80 overflow-hidden select-none"
    >
      {/* Header bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#58A6FF] font-mono text-xs tracking-widest uppercase mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>HORIZONTAL GALLERY // HORIZONTAL_SCROLL</span>
          </div>
          <h3 className="font-display font-black text-2xl sm:text-4xl text-[#C9D1D9] tracking-tight">
            SYSTEM SHOWCASE
          </h3>
        </div>

        {/* Live Progress Bar & Nav Controls */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-[#8B949E]">
            <span>
              PROJECT {String(activeProjectIndex + 1).padStart(2, '0')} / {String(PROJECTS_DATA.length).padStart(2, '0')}
            </span>
            <div className="w-28 h-1.5 bg-[#21262D] rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-[#58A6FF] transition-all duration-150"
                style={{ width: '15%' }}
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleManualScroll('left')}
              className="p-2 rounded-lg bg-[#161B22] border border-[#30363D] hover:border-[#8B949E] text-[#C9D1D9] transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleManualScroll('right')}
              className="p-2 rounded-lg bg-[#161B22] border border-[#30363D] hover:border-[#8B949E] text-[#C9D1D9] transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Project Track */}
      <div
        ref={trackRef}
        onScroll={handleTrackScroll}
        className="flex gap-6 sm:gap-8 px-4 sm:px-8 lg:px-12 overflow-x-auto lg:overflow-visible no-scrollbar pb-6 will-change-transform"
      >
        {PROJECTS_DATA.map((project, index) => (
          <div
            key={project.id}
            id={`horizontal-card-${project.id}`}
            data-cursor="project"
            className="w-[85vw] sm:w-[480px] md:w-[540px] shrink-0 bg-[#161B22] border border-[#30363D] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#8B949E]/70 transition-all duration-300 group shadow-xl relative overflow-hidden"
          >
            {/* Accent Top Bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ backgroundColor: project.accentColor }}
            />

            <div>
              {/* Card Meta */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="font-mono text-xs font-bold text-[#8B949E] px-2.5 py-1 rounded bg-[#0D1117] border border-[#30363D]">
                  {project.number}
                </span>
                <span className="font-mono text-[11px] text-[#3FB950] tracking-wider uppercase">
                  {project.category}
                </span>
              </div>

              {/* Title & Tagline */}
              <h4 className="font-display font-black text-2xl sm:text-3xl text-[#C9D1D9] tracking-tight group-hover:text-white transition-colors mb-2">
                {project.title}
              </h4>
              <p className="font-mono text-xs text-[#8B949E] mb-6 line-clamp-2">
                {project.tagline}
              </p>

              {/* Interactive Visualizer Canvas Box */}
              <div className="h-56 w-full mb-6 rounded-xl overflow-hidden border border-[#30363D]/60 bg-[#0D1117]">
                <ProjectVisuals project={project} />
              </div>
            </div>

            {/* Bottom Actions & Tech Tags */}
            <div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#21262D] text-[#8B949E] border border-[#30363D]/60"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#21262D] text-[#8B949E]">
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>

              <button
                onClick={() => onSelectProject(project)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#21262D] hover:bg-[#30363D] text-[#C9D1D9] hover:text-white border border-[#30363D] hover:border-[#8B949E] font-mono text-xs tracking-wider transition-all duration-200 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#3FB950]" />
                <span>INSPECT ARCHITECTURE &amp; CASE STUDY</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
