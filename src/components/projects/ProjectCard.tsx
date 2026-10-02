import { useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Github, ImageOff } from 'lucide-react';
import type { ShowcaseProject } from '../../data/projects';

const MAX_TECH = 4;
const ACCENTS = ['#3FB950', '#58A6FF', '#A371F7', '#D29922'];

interface ProjectCardProps {
  project: ShowcaseProject;
  index: number;
  isActive: boolean;
}

const getInitials = (title: string) =>
  title
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export const ProjectCard = ({ project, index, isActive }: ProjectCardProps) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const accent = ACCENTS[index % ACCENTS.length];
  const showImage = Boolean(project.image) && !imageFailed;
  const visibleTech = project.technologies.slice(0, MAX_TECH);
  const hiddenTech = project.technologies.slice(MAX_TECH);

  // Cursor-following spotlight
  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  };

  return (
    <motion.article
      data-cursor="project"
      onMouseMove={handleMouseMove}
      initial={false}
      animate={{ opacity: isActive ? 1 : 0.78 }}
      whileHover={{ y: -4, scale: 1.01, opacity: 1 }}
      transition={{
        y: { type: 'spring', stiffness: 300, damping: 26 },
        scale: { type: 'spring', stiffness: 300, damping: 26 },
        opacity: { duration: 0.4 },
      }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-[#161B22]/90 backdrop-blur-xl transition-[border-color,box-shadow] duration-500 ${
        isActive
          ? 'border-[#3FB950]/50 shadow-[0_24px_60px_-24px_rgba(63,185,80,0.35)]'
          : 'border-[#30363D] shadow-xl hover:border-[#8B949E]/60'
      }`}
    >
      {/* Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 0%), rgba(63,185,80,0.10), transparent 60%)',
        }}
      />

      {/* Active accent line */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-20 h-px origin-left bg-gradient-to-r from-transparent via-[#3FB950] to-transparent"
        initial={false}
        animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Preview */}
      <div className="relative aspect-[16/9] overflow-hidden border-b border-[#30363D] bg-[#0D1117]">
        {showImage ? (
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            loading="lazy"
            draggable={false}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageFailed(true)}
            className={`h-full w-full object-cover transition-[transform,opacity,filter] duration-700 ease-out group-hover:scale-[1.04] ${
              imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
            }`}
          />
        ) : (
          <div
            className="relative flex h-full items-center justify-center overflow-hidden"
            style={{
              background: `radial-gradient(circle at 20% 20%, ${accent}33, transparent 45%), radial-gradient(circle at 85% 85%, rgba(163,113,247,0.16), transparent 45%), #0D1117`,
            }}
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-40" />
            <span
              aria-hidden="true"
              className="relative select-none text-7xl font-black tracking-tighter text-[#C9D1D9]/10 transition-transform duration-700 ease-out group-hover:scale-110"
            >
              {getInitials(project.title)}
            </span>
            <span className="absolute bottom-3 right-4 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[#8B949E]">
              <ImageOff className="h-3 w-3" aria-hidden="true" />
              No preview
            </span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D1117]/70 via-transparent to-transparent" />

        <span className="absolute left-4 top-4 rounded-full border border-[#3FB950]/30 bg-[#0D1117]/80 px-2.5 py-1 font-mono text-[9px] tracking-[0.18em] text-[#3FB950] backdrop-blur">
          {project.category}
        </span>
        <span className="absolute right-4 top-4 font-mono text-[10px] tracking-[0.18em] text-[#C9D1D9]/70">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Body */}
      <div className="relative z-10 flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-black tracking-tight text-[#C9D1D9] transition-colors duration-300 group-hover:text-white sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-[3rem] text-sm leading-6 text-[#8B949E]">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {visibleTech.map((technology) => (
            <li
              key={technology}
              className="rounded-md border border-[#30363D] bg-[#21262D]/80 px-2 py-1 font-mono text-[10px] text-[#C9D1D9] transition-colors duration-300 hover:border-[#3FB950]/50 hover:text-[#3FB950]"
            >
              {technology}
            </li>
          ))}
          {hiddenTech.length > 0 && (
            <li
              title={hiddenTech.join(', ')}
              className="rounded-md border border-dashed border-[#30363D] px-2 py-1 font-mono text-[10px] text-[#8B949E]"
            >
              +{hiddenTech.length}
            </li>
          )}
        </ul>

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              draggable={false}
              data-cursor="link"
              aria-label={`View ${project.title} source code on GitHub`}
              className="group/code inline-flex items-center gap-1.5 rounded-lg border border-[#30363D] bg-[#21262D] px-3.5 py-2 font-mono text-[11px] text-[#C9D1D9] transition-colors duration-300 hover:border-[#8B949E] hover:text-white"
            >
              <Github
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/code:-translate-y-0.5"
                aria-hidden="true"
              />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              draggable={false}
              data-cursor="link"
              aria-label={`Open ${project.title} live demo`}
              className="group/link inline-flex items-center gap-1.5 rounded-lg border border-[#3FB950]/40 bg-[#3FB950]/10 px-3.5 py-2 font-mono text-[11px] text-[#3FB950] transition-colors duration-300 hover:border-[#3FB950] hover:bg-[#3FB950]/20"
            >
              Live Demo
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};