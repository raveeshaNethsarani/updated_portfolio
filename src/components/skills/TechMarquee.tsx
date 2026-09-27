import React from 'react';
import { TechIcon } from './TechIcons';

type MarqueeTech = { name: string; category: string };

const ROW_1_TECHS: MarqueeTech[] = [
  { name: 'React.js', category: 'UI' },
  { name: 'Next.js', category: 'Fullstack' },
  { name: 'TypeScript', category: 'Core' },
  { name: 'Node.js', category: 'Runtime' },
  { name: 'Express.js', category: 'Server' },
  { name: 'Go', category: 'Backend' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Socket.IO', category: 'Real-time' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Docker', category: 'DevOps' }
];

const ROW_2_TECHS: MarqueeTech[] = [
  { name: 'PostgreSQL', category: 'SQL' },
  { name: 'MongoDB', category: 'NoSQL' },
  { name: 'Docker', category: 'Containers' },
  { name: 'Apache Kafka', category: 'Event Streaming' },
  { name: 'Redis', category: 'Cache' },
  { name: 'Zustand', category: 'State' },
  { name: 'Zod', category: 'Schema' },
  { name: 'AWS S3', category: 'Cloud Storage' },
  { name: 'GitHub', category: 'CI/CD' }
];

// Full-width ekedi (ultra-wide screens) gap ekak penne nathi wenna list eka 4 parak repeat karanawa.
// Animation eka -50% translate karana nisa, half eka = copies 2 → seamless loop.
const REPEAT = 4;
const loop = (items: MarqueeTech[]) => Array.from({ length: REPEAT }, () => items).flat();

// Screen edges walata soft fade ekak
const EDGE_FADE: React.CSSProperties = {
  maskImage: 'linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)',
  WebkitMaskImage: 'linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)'
};

type MarqueeRowProps = {
  id: string;
  items: MarqueeTech[];
  animation: string;
  hoverBorder: string;
  iconHover: string;
};

const MarqueeRow: React.FC<MarqueeRowProps> = ({ id, items, animation, hoverBorder, iconHover }) => (
  <div className="relative flex overflow-hidden" style={EDGE_FADE}>
    {/* pr-3 = gap-3 → -50% jump eka pixel-perfect */}
    <div className={`${animation} flex w-max items-center gap-3 pr-3 will-change-transform`}>
      {loop(items).map((tech, idx) => (
        <div
          key={`${id}-${idx}`}
          aria-hidden={idx >= items.length}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0D1117]/80 border border-[#30363D]/80 hover:bg-[#161B22] transition-all duration-200 cursor-default group/item shrink-0 ${hoverBorder}`}
        >
          <span className={`text-[#8B949E] transition-colors ${iconHover}`}>
            <TechIcon name={tech.name} className="w-4 h-4" colored={true} />
          </span>
          <span className="font-mono text-xs font-semibold tracking-wider text-[#C9D1D9] whitespace-nowrap">
            {tech.name}
          </span>
          <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#21262D] text-[#8B949E] uppercase tracking-wider whitespace-nowrap">
            {tech.category}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export const TechMarquee: React.FC = () => (
  <div className="w-full overflow-hidden select-none border-y border-[#30363D]/80 bg-[#161B22]/40 backdrop-blur-sm py-4 my-8 space-y-3 group">
    {/* Row 1: Leftward */}
    <MarqueeRow
      id="row1"
      items={ROW_1_TECHS}
      animation="animate-marquee-left"
      hoverBorder="hover:border-[#3FB950]/60"
      iconHover="group-hover/item:text-[#3FB950]"
    />

    {/* Row 2: Rightward */}
    <MarqueeRow
      id="row2"
      items={ROW_2_TECHS}
      animation="animate-marquee-right"
      hoverBorder="hover:border-[#58A6FF]/60"
      iconHover="group-hover/item:text-[#58A6FF]"
    />
  </div>
);