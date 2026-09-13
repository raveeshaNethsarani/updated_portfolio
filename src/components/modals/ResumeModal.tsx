import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  Printer,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Briefcase,
  GraduationCap,
  CheckCircle,
  Copy,
  Check,
  Building2,
  FileCheck
} from 'lucide-react';
import { EXPERIENCE_DATA, EDUCATION_DATA } from '../../data/experience';
import { SKILLS_DATA } from '../../data/skills';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('raveesha.nethsarani.dev@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-y-auto print:p-0">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0D1117]/90 backdrop-blur-lg print:hidden"
        />

        {/* Modal Window: Curriculum Vitae Document */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 25 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#161B22] border border-[#30363D] rounded-2xl shadow-2xl overflow-hidden z-10 my-auto text-[#C9D1D9] max-h-[92vh] flex flex-col print:max-h-none print:border-none print:bg-white print:text-black"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-6 sm:p-8 border-b border-[#30363D] bg-[#161B22] print:hidden">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#3FB950]/10 border border-[#3FB950]/40 flex items-center justify-center font-mono font-black text-sm text-[#3FB950]">
                RN
              </div>
              <div>
                <h3 className="font-black text-xl text-white tracking-tight uppercase">
                  CURRICULUM VITAE
                </h3>
                <span className="font-mono text-[10px] text-[#8B949E] tracking-widest uppercase">
                  Raveesha Nethsarani Siriwardana &bull; Official Dossier
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#21262D] hover:bg-[#30363D] text-xs font-mono text-white border border-[#30363D] cursor-pointer transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-[#58A6FF]" />
                <span>PRINT / EXPORT</span>
              </button>

              <button
                onClick={onClose}
                id="close-resume-modal-btn"
                className="p-2.5 rounded-xl bg-[#21262D] hover:bg-[#30363D] text-[#8B949E] hover:text-white transition-colors cursor-pointer border border-[#30363D]"
                aria-label="Close resume"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable / Renderable CV Body */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-10 no-scrollbar print:text-black print:p-0">
            {/* Top Identity Block */}
            <div className="border-b border-[#30363D] pb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div className="space-y-1.5">
                <h1 className="font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
                  RAVEESHA NETHSARANI
                </h1>
                <h2 className="font-mono text-sm sm:text-base text-[#3FB950] font-bold uppercase tracking-wider">
                  // FULL STACK SYSTEM ENGINEER
                </h2>
                <p className="font-mono text-xs text-[#8B949E] flex items-center gap-2 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#58A6FF]" />
                  <span>Sri Lanka &bull; Galle / Colombo</span>
                  <span>&bull; BotCalm (Pvt) Ltd</span>
                </p>
              </div>

              <div className="flex flex-col gap-2 font-mono text-xs text-[#8B949E]">
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-2 text-left hover:text-white cursor-pointer transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#3FB950]" />
                  <span>raveesha.nethsarani.dev@gmail.com</span>
                  {copiedEmail ? (
                    <Check className="w-3 h-3 text-[#3FB950]" />
                  ) : (
                    <Copy className="w-3 h-3 text-[#8B949E]" />
                  )}
                </button>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <Github className="w-3.5 h-3.5 text-[#C9D1D9]" />
                  <span>github.com/raveesha-siriwardana</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-[#58A6FF]"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#58A6FF]" />
                  <span>linkedin.com/in/raveesha-nethsarani</span>
                </a>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <h3 className="font-mono text-xs text-[#3FB950] tracking-[0.25em] uppercase font-bold">
                [ 01 // PROFESSIONAL SUMMARY ]
              </h3>
              <p className="text-xs sm:text-sm text-[#C9D1D9] leading-relaxed font-light">
                Disciplined Full Stack System Engineer with comprehensive experience architecting high-concurrency Node.js/Express APIs, type-safe Next.js/React frontends, ACID-compliant PostgreSQL/MongoDB schemas, and cryptographic webhook verification pipelines at BotCalm (Pvt) Ltd. Solid computer science background from SLIATE Galle. Dedicated to zero-defect system stability and decoupled event-driven architectures.
              </p>
            </div>

            {/* Work Experience */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs text-[#58A6FF] tracking-[0.25em] uppercase font-bold flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>[ 02 // WORK EXPERIENCE ]</span>
              </h3>

              <div className="bg-[#0D1117] border border-[#30363D] rounded-2xl p-6 space-y-4 shadow-inner">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#30363D]/80 pb-3">
                  <div>
                    <h4 className="font-black text-lg text-white uppercase tracking-tight">
                      Full Stack System Engineer
                    </h4>
                    <span className="font-mono text-xs text-[#3FB950] font-bold">
                      BotCalm (Pvt) Ltd
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#3FB950] px-3 py-1 rounded bg-[#3FB950]/10 border border-[#3FB950]/30 font-bold">
                    PRESENT &bull; CURRENT
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs font-mono text-[#8B949E] list-disc list-inside">
                  <li>
                    Architected robust backend RESTful microservices and WebSocket pipelines with strict token authentication and payload validation.
                  </li>
                  <li>
                    Engineered guaranteed idempotent webhook dispatchers with HMAC SHA-256 signatures, Redis distributed mutexes, and dead-letter queues.
                  </li>
                  <li>
                    Constructed granular Role-Based Access Control (RBAC) bitmasks and multi-tenant security layers across enterprise administration portals.
                  </li>
                  <li>
                    Maintained high-throughput PostgreSQL and MongoDB Atlas databases, optimizing compound indexes and eliminating transaction lock contention.
                  </li>
                </ul>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs text-[#A371F7] tracking-[0.25em] uppercase font-bold flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>[ 03 // FORMAL EDUCATION ]</span>
              </h3>

              <div className="bg-[#0D1117] border border-[#30363D] rounded-2xl p-6 space-y-2 font-mono text-xs shadow-inner">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-black text-base text-white uppercase">
                    Higher National Diploma in Information Technology (HNDIT)
                  </h4>
                  <span className="text-[#3FB950] font-bold">SLIATE Galle</span>
                </div>
                <p className="text-[#8B949E]">
                  Sri Lanka Institute of Advanced Technological Education &bull; Information Technology Department
                </p>
                <p className="text-[#8B949E] text-[11px] pt-2 border-t border-[#30363D]/60 mt-3">
                  Comprehensive study in Data Structures, Database Design, Object-Oriented Software Engineering, and Computer Networks.
                </p>
              </div>
            </div>

            {/* Core Skills Snapshot */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs text-[#D29922] tracking-[0.25em] uppercase font-bold">
                [ 04 // TECHNICAL TOOLCHAIN &amp; RUNTIMES ]
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 bg-[#0D1117] border border-[#30363D]/80 rounded-xl space-y-1">
                  <span className="text-[#3FB950] block font-bold text-[11px] uppercase">FRONTEND ARCHITECTURE:</span>
                  <span className="text-[#8B949E] leading-relaxed block">React.js, Next.js, TypeScript, Tailwind CSS, shadcn/ui, Zustand, TanStack Query</span>
                </div>
                <div className="p-4 bg-[#0D1117] border border-[#30363D]/80 rounded-xl space-y-1">
                  <span className="text-[#58A6FF] block font-bold text-[11px] uppercase">BACKEND &amp; DISTRIBUTED APIS:</span>
                  <span className="text-[#8B949E] leading-relaxed block">Node.js, Express.js, REST APIs, Java, Spring Boot, Go, WebSockets, Webhooks</span>
                </div>
                <div className="p-4 bg-[#0D1117] border border-[#30363D]/80 rounded-xl space-y-1">
                  <span className="text-[#A371F7] block font-bold text-[11px] uppercase">DATABASES &amp; SECURITY:</span>
                  <span className="text-[#8B949E] leading-relaxed block">PostgreSQL, MongoDB Atlas, Prisma, JWT, RBAC, OAuth 2.0, HMAC SHA-256</span>
                </div>
                <div className="p-4 bg-[#0D1117] border border-[#30363D]/80 rounded-xl space-y-1">
                  <span className="text-[#D29922] block font-bold text-[11px] uppercase">DEVOPS &amp; RUNTIME:</span>
                  <span className="text-[#8B949E] leading-relaxed block">Docker, Git, GitHub Actions, Jest, Postman, VS Code, ESLint, npm / Yarn</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 sm:p-8 border-t border-[#30363D] bg-[#161B22] flex items-center justify-between font-mono text-xs print:hidden">
            <span className="text-[#8B949E]">
              SYSTEM VERIFIED // BOTCALM FULL STACK ENGINEER
            </span>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-[#21262D] hover:bg-[#30363D] text-white border border-[#30363D] cursor-pointer font-bold transition-colors"
            >
              CLOSE DOSSIER
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
