import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Terminal,
  Cpu,
  Layers,
  GraduationCap,
  Briefcase,
  Shield,
  Zap,
  Database,
  Lock,
  Globe,
  Radio,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { EDUCATION_DATA } from '../../data/experience';

export const AboutSection: React.FC = () => {
  const [activeArea, setActiveArea] = useState<string>('architecture');

  const coreAreas = [
    {
      id: 'architecture',
      code: 'SYS-01',
      title: 'System Architecture & Domains',
      icon: Layers,
      color: '#3FB950',
      description: 'Designing resilient decoupled system boundaries, modular domains, fault-isolated microservices, and end-to-end data integrity pipelines.'
    },
    {
      id: 'backend',
      code: 'API-02',
      title: 'Backend & High-Throughput APIs',
      icon: Cpu,
      color: '#58A6FF',
      description: 'Building high-throughput REST and asynchronous service layers in Node.js and Express with strict runtime schema contracts and rate limiting.'
    },
    {
      id: 'frontend',
      code: 'UI-03',
      title: 'Reactive Frontend Engineering',
      icon: Globe,
      color: '#A371F7',
      description: 'Developing high-performance, accessible, and reactive interfaces using React.js, Next.js App Router, TypeScript, and Tailwind CSS.'
    },
    {
      id: 'databases',
      code: 'DB-04',
      title: 'Transactional Databases & Indexing',
      icon: Database,
      color: '#D29922',
      description: 'Structuring transactional PostgreSQL ACID databases and flexible MongoDB Atlas clusters with compound indexing and optimized query plans.'
    },
    {
      id: 'auth',
      code: 'SEC-05',
      title: 'Cryptographic Auth & RBAC Matrices',
      icon: Lock,
      color: '#F85149',
      description: 'Implementing cryptographic JWT authentication, bitwise role-based access control (RBAC), multi-tenant isolation, and OAuth 2.0.'
    },
    {
      id: 'realtime',
      code: 'RT-06',
      title: 'Real-Time Protocol & Webhooks',
      icon: Radio,
      color: '#3FB950',
      description: 'Engineering bi-directional Socket.IO/WebSocket communication, HMAC SHA-256 webhook processors, and exponential backoff retry queues.'
    }
  ];

  return (
    <section id="about" className="relative bg-[#0D1117] py-24 sm:py-36 border-b border-[#30363D]">
      {/* Background Subtle Grid & Technical Coordinates */}
      <div className="absolute inset-0 bg-dot-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Editorial Section Eyebrow */}
        <div className="flex items-center justify-between border-b border-[#30363D] pb-4 mb-16">
          <div className="flex items-center gap-3 text-[#3FB950] mono text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#3FB950] inline-block" />
            <span>[ 03 // ENGINEERING BIOGRAPHY &amp; METHODOLOGY ]</span>
          </div>
          <span className="hidden sm:inline-block mono text-[10px] text-[#8B949E] uppercase tracking-widest">
            LOC: SRI LANKA (SLIATE GALLE &bull; BOTCALM)
          </span>
        </div>

        {/* Massive Editorial Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          <div className="lg:col-span-8">
            <h2 className="font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#C9D1D9] tracking-tighter leading-[0.85] uppercase mb-8">
              ENGINEER<br />
              <span className="text-outline">WHO THINKS</span><br />
              <span className="text-[#3FB950]">IN SYSTEMS.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 pt-2 lg:pt-6 border-l border-[#30363D] pl-6 lg:pl-8 space-y-6">
            <p className="mono text-xs sm:text-sm text-[#C9D1D9] leading-relaxed">
              &ldquo;Software quality is an architectural property, not a surface polish. Every system layer must exhibit explicit error containment, rigorous type boundaries, and graceful degradation.&rdquo;
            </p>
            <div className="flex items-center gap-2 mono text-[11px] text-[#3FB950]">
              <span>&mdash;</span>
              <span className="tracking-widest uppercase font-semibold">Raveesha Nethsarani Siriwardana</span>
            </div>
          </div>
        </div>

        {/* Editorial Narrative & Specs Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          {/* Left Column: Longform Technical Story */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6 text-[#C9D1D9]/90 text-base sm:text-lg font-light leading-relaxed">
              <p>
                Operating at the intersection of <strong className="text-white font-semibold">client-side reactivity</strong> and <strong className="text-[#3FB950] font-semibold">backend infrastructure</strong>, I serve as a Full Stack System Engineer at <strong className="text-white font-semibold">BotCalm (Pvt) Ltd</strong>.
              </p>
              <p className="text-[#8B949E] text-base leading-relaxed">
                My technical philosophy was forged during rigorous academic studies in the IT Department of the <strong className="text-[#C9D1D9]">Sri Lanka Institute of Advanced Technological Education (SLIATE), Galle</strong>, earning a Higher National Diploma in Information Technology (HNDIT). This classical foundation instilled a deep focus on database normalization, computational complexity, and disciplined network protocols.
              </p>
              <p className="text-[#8B949E] text-base leading-relaxed">
                In my daily work at BotCalm, I architect mission-critical infrastructure: idempotency-guaranteed payment pipelines, zero-downtime database migrations, fine-grained RBAC permission trees, streaming agent interfaces, and microservice telemetry.
              </p>
            </div>

            {/* Asymmetric Spec Callout Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 bg-[#161B22]/80 border border-[#30363D] rounded-xl mono text-xs space-y-2">
                <div className="flex items-center justify-between text-[#3FB950] font-bold">
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>PRODUCTION AFFILIATION</span>
                  </span>
                  <span className="text-[10px] text-[#8B949E]">01</span>
                </div>
                <div className="text-white font-bold text-sm">Full Stack System Engineer</div>
                <div className="text-[#8B949E]">BotCalm (Pvt) Ltd &bull; Sri Lanka</div>
              </div>

              <div className="p-5 bg-[#161B22]/80 border border-[#30363D] rounded-xl mono text-xs space-y-2">
                <div className="flex items-center justify-between text-[#58A6FF] font-bold">
                  <span className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>ACADEMIC CREDENTIAL</span>
                  </span>
                  <span className="text-[10px] text-[#8B949E]">02</span>
                </div>
                <div className="text-white font-bold text-sm">HND in Information Technology</div>
                <div className="text-[#8B949E]">SLIATE Galle &bull; IT Department</div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Domain Inspector */}
          <div className="lg:col-span-5 bg-[#161B22] border border-[#30363D] rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#30363D] pb-4 mb-6">
              <div className="flex items-center gap-2 mono text-xs text-[#C9D1D9] font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4 text-[#3FB950]" />
                <span>SYSTEM DOMAIN MATRIX</span>
              </div>
              <span className="mono text-[10px] text-[#3FB950] bg-[#3FB950]/10 px-2 py-0.5 rounded border border-[#3FB950]/30 uppercase">
                ACTIVE SPEC
              </span>
            </div>

            {/* List of Domains */}
            <div className="space-y-2 mb-6">
              {coreAreas.map((area) => {
                const isSelected = activeArea === area.id;
                const Icon = area.icon;
                return (
                  <button
                    key={area.id}
                    onClick={() => setActiveArea(area.id)}
                    className={`w-full p-3 rounded-lg border text-left mono text-xs transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#21262D] border-[#3FB950] text-[#C9D1D9] shadow-md'
                        : 'bg-[#0D1117]/80 border-[#30363D]/60 text-[#8B949E] hover:border-[#8B949E]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-[#8B949E]">{area.code}</span>
                      <Icon className="w-3.5 h-3.5" style={{ color: area.color }} />
                      <span className="font-semibold">{area.title}</span>
                    </div>
                    <span className="text-[10px] text-[#8B949E] font-mono">&rarr;</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Domain Specification Display */}
            {(() => {
              const selected = coreAreas.find((a) => a.id === activeArea) || coreAreas[0];
              const SelectedIcon = selected.icon;
              return (
                <div className="p-5 bg-[#0D1117] border border-[#30363D] rounded-xl mono text-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold" style={{ color: selected.color }}>
                    <div className="flex items-center gap-2">
                      <SelectedIcon className="w-4 h-4" />
                      <span>{selected.title.toUpperCase()}</span>
                    </div>
                    <span className="text-[10px] opacity-75">{selected.code}</span>
                  </div>
                  <p className="text-[#C9D1D9] text-xs leading-relaxed pt-1">{selected.description}</p>
                </div>
              );
            })()}
          </div>
        </div>

        {/* SLIATE Galle Academic Pedigree Technical Strip */}
        <div className="border border-[#30363D] bg-[#161B22]/60 rounded-2xl p-6 sm:p-10 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#30363D]">
            <div className="space-y-1">
              <span className="mono text-[10px] uppercase tracking-[0.3em] text-[#58A6FF] font-semibold">
                FORMAL ACADEMIC INSTITUTION
              </span>
              <h3 className="font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
                {EDUCATION_DATA.institution} &bull; {EDUCATION_DATA.department}
              </h3>
              <p className="mono text-xs text-[#8B949E]">
                {EDUCATION_DATA.degree} &bull; {EDUCATION_DATA.location}
              </p>
            </div>

            <div className="mono text-xs text-[#3FB950] px-4 py-2 bg-[#3FB950]/10 border border-[#3FB950]/30 rounded-lg shrink-0">
              [ {EDUCATION_DATA.period} &bull; COMPLETED ]
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {EDUCATION_DATA.highlights.map((item, i) => (
              <div
                key={i}
                className="p-4 bg-[#0D1117] border border-[#30363D]/70 rounded-xl text-xs mono text-[#C9D1D9] space-y-1"
              >
                <span className="text-[10px] text-[#58A6FF] font-bold block">// SPEC 0{i + 1}</span>
                <p className="text-xs text-[#C9D1D9] leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
