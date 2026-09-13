import React from 'react';
import { TechIcon } from './TechIcons';

const ROW_1_TECHS = [
  { name: 'React.js', category: 'UI' },
  { name: 'Next.js', category: 'Fullstack' },
  { name: 'TypeScript', category: 'Core' },
  { name: 'Node.js', category: 'Runtime' },
  { name: 'Express.js', category: 'Server' },
  { name: 'Go', category: 'Backend' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Socket.IO', category: 'Real-time' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'GraphQL', category: 'API' }
];

const ROW_2_TECHS = [
  { name: 'PostgreSQL', category: 'SQL' },
  { name: 'MongoDB', category: 'NoSQL' },
  { name: 'Docker', category: 'Containers' },
  { name: 'Apache Kafka', category: 'Event Streaming' },
  { name: 'Redis', category: 'Cache' },
  { name: 'Prisma', category: 'ORM' },
  { name: 'Spring Boot', category: 'Java' },
  { name: 'Zustand', category: 'State' },
  { name: 'Zod', category: 'Schema' },
  { name: 'AWS S3', category: 'Cloud Storage' },
  { name: 'GitHub', category: 'CI/CD' }
];

export const TechMarquee: React.FC = () => {
  return (
    <div className="w-full overflow-hidden select-none border-y border-[#30363D]/80 bg-[#161B22]/40 backdrop-blur-sm py-6 my-16 space-y-4 group">
      {/* Row 1: Leftward Movement */}
      <div className="relative flex overflow-hidden">
        <div className="animate-marquee-left flex items-center gap-4 will-change-transform">
          {[...ROW_1_TECHS, ...ROW_1_TECHS].map((tech, idx) => (
            <div
              key={`row1-${idx}`}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#0D1117]/80 border border-[#30363D]/80 hover:border-[#3FB950]/60 hover:bg-[#161B22] text-[#8B949E] hover:text-[#C9D1D9] transition-all duration-200 cursor-default group/item shrink-0 shadow-sm"
            >
              <div className="text-[#8B949E] group-hover/item:text-[#3FB950] transition-colors">
                <TechIcon name={tech.name} className="w-4 h-4" colored={true} />
              </div>
              <span className="font-mono text-xs font-semibold tracking-wider text-[#C9D1D9]">
                {tech.name}
              </span>
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#21262D] text-[#8B949E] uppercase tracking-wider">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Rightward Movement */}
      <div className="relative flex overflow-hidden">
        <div className="animate-marquee-right flex items-center gap-4 will-change-transform">
          {[...ROW_2_TECHS, ...ROW_2_TECHS].map((tech, idx) => (
            <div
              key={`row2-${idx}`}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#0D1117]/80 border border-[#30363D]/80 hover:border-[#58A6FF]/60 hover:bg-[#161B22] text-[#8B949E] hover:text-[#C9D1D9] transition-all duration-200 cursor-default group/item shrink-0 shadow-sm"
            >
              <div className="text-[#8B949E] group-hover/item:text-[#58A6FF] transition-colors">
                <TechIcon name={tech.name} className="w-4 h-4" colored={true} />
              </div>
              <span className="font-mono text-xs font-semibold tracking-wider text-[#C9D1D9]">
                {tech.name}
              </span>
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#21262D] text-[#8B949E] uppercase tracking-wider">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
