import { motion } from 'motion/react';
import { ExternalLink, Github, ImageOff } from 'lucide-react';
import { ShowcaseProject } from '../../data/projects';
import { useState } from 'react';

interface ProjectCardProps {
  project: ShowcaseProject;
  isActive: boolean;
}

export const ProjectCard = ({ project, isActive }: ProjectCardProps) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-[#161B22]/90 shadow-2xl backdrop-blur-xl transition-colors duration-300 ${
        isActive ? 'border-[#3FB950]/50' : 'border-[#30363D]'
      }`}
      data-cursor="project"
    >
      <div className="relative aspect-[16/8] overflow-hidden border-b border-[#30363D] bg-[#0D1117]">
        {project.image && !imageFailed ? (
          <motion.img
            src={project.image}
            alt={`${project.title} project preview`}
            onError={() => setImageFailed(true)}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="relative flex h-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(63,185,80,0.2),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(163,113,247,0.18),transparent_35%),#0D1117]">
            <div className="absolute inset-0 bg-grid-pattern opacity-40" />
            <div className="relative flex flex-col items-center gap-2 text-[#8B949E]">
              <ImageOff className="h-6 w-6 text-[#3FB950]/70" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                Preview unavailable
              </span>
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D1117]/70 via-transparent to-transparent" />
        <span className="absolute left-5 top-5 rounded-full border border-[#3FB950]/30 bg-[#0D1117]/80 px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-[#3FB950]">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="font-display text-2xl font-black tracking-tight text-[#C9D1D9] transition-colors group-hover:text-white sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-3 min-h-[5.25rem] max-w-2xl text-sm leading-7 text-[#8B949E]">
              {project.description}
            </p>
          </div>
          <span className="font-mono text-xs text-[#58A6FF]">BUILD / 0{project.id.length % 9 + 1}</span>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <motion.span
              key={technology}
              whileHover={{ y: -2 }}
              className="rounded-md border border-[#30363D] bg-[#21262D]/80 px-2.5 py-1.5 font-mono text-[11px] text-[#C9D1D9]"
            >
              {technology}
            </motion.span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-8">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              className="inline-flex items-center gap-2 rounded-lg border border-[#30363D] bg-[#21262D] px-4 py-2.5 font-mono text-xs text-[#C9D1D9] transition-all hover:-translate-y-0.5 hover:border-[#8B949E] hover:text-white"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              View Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              className="inline-flex items-center gap-2 rounded-lg border border-[#3FB950]/40 bg-[#3FB950]/10 px-4 py-2.5 font-mono text-xs text-[#3FB950] transition-all hover:-translate-y-0.5 hover:border-[#3FB950] hover:bg-[#3FB950]/15"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
