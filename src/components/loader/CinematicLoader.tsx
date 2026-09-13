import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Terminal, Shield, CheckCircle2 } from 'lucide-react';

interface CinematicLoaderProps {
  onComplete: () => void;
}

const STAGES = [
  { percent: 0, label: 'INITIALIZING SYSTEM KERNEL', icon: Terminal },
  { percent: 25, label: 'LOADING EXPERIENCE & ARCHITECTURE', icon: Cpu },
  { percent: 50, label: 'LOADING PRODUCTION PROJECTS', icon: Shield },
  { percent: 75, label: 'CONNECTING DISTRIBUTED SYSTEMS', icon: Cpu },
  { percent: 100, label: 'SYSTEM READY', icon: CheckCircle2 }
];

export const CinematicLoader: React.FC<CinematicLoaderProps> = ({ onComplete }) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [revealingName, setRevealingName] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setProgress(100);
      setCurrentStageIdx(4);
      setTimeout(() => {
        onComplete();
      }, 300);
      return;
    }

    const duration = 2000; // 2 seconds total loader
    const intervalMs = 25;
    const step = 100 / (duration / intervalMs);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    if (progress < 25) setCurrentStageIdx(0);
    else if (progress < 50) setCurrentStageIdx(1);
    else if (progress < 75) setCurrentStageIdx(2);
    else if (progress < 100) setCurrentStageIdx(3);
    else {
      setCurrentStageIdx(4);
      // Trigger reveal sequence after reaching 100%
      const revealTimeout = setTimeout(() => {
        setRevealingName(true);
      }, 250);

      const exitTimeout = setTimeout(() => {
        setIsExiting(true);
      }, 1400);

      const completeTimeout = setTimeout(() => {
        onComplete();
      }, 2100);

      return () => {
        clearTimeout(revealTimeout);
        clearTimeout(exitTimeout);
        clearTimeout(completeTimeout);
      };
    }
  }, [progress, onComplete]);

  const currentStage = STAGES[currentStageIdx];
  const IconComponent = currentStage.icon;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          id="cinematic-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(10px)',
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D1117] text-[#C9D1D9] select-none overflow-hidden"
        >
          {/* Subtle grid backdrop */}
          <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

          {/* Technical Corner Crosshairs */}
          <div className="absolute top-8 left-8 text-[#30363D] font-mono text-xs tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3FB950] animate-ping inline-block" />
            <span>SYS_INIT // RAVEESHA_SYS_V2.6</span>
          </div>
          <div className="absolute top-8 right-8 text-[#8B949E] font-mono text-xs tracking-widest hidden sm:block">
            BOTCALM / SLIATE
          </div>
          <div className="absolute bottom-8 left-8 text-[#8B949E] font-mono text-xs tracking-widest">
            PORT: 3000 // PROTOCOL: ENCRYPTED
          </div>
          <div className="absolute bottom-8 right-8">
            <button
              onClick={() => onComplete()}
              className="text-[#8B949E] hover:text-[#C9D1D9] font-mono text-xs tracking-wider border border-[#30363D] px-3 py-1 rounded hover:border-[#3FB950] transition-colors"
            >
              SKIP [ESC]
            </button>
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-xl w-full px-6">
            {!revealingName ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col items-center"
              >
                {/* Center RN Monogram */}
                <div className="relative mb-8">
                  <div className="w-24 h-24 border border-[#30363D] bg-[#161B22] rounded-lg flex items-center justify-center relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-radial from-[#3FB950]/10 to-transparent pointer-events-none" />
                    <span className="font-display font-black text-3xl tracking-wider text-[#C9D1D9]">
                      RN
                    </span>
                    {/* Animated scanning line */}
                    <motion.div
                      className="absolute left-0 right-0 h-[2px] bg-[#3FB950]/60"
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                </div>

                {/* Numeric Progress Counter */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-mono text-5xl sm:text-6xl font-bold tracking-tight text-[#C9D1D9]">
                    {Math.floor(progress).toString().padStart(2, '0')}
                  </span>
                  <span className="font-mono text-2xl text-[#3FB950] font-semibold">%</span>
                </div>

                {/* Status indicator */}
                <div className="flex items-center gap-2 mb-6 text-[#8B949E] font-mono text-xs tracking-widest uppercase">
                  <IconComponent className="w-3.5 h-3.5 text-[#3FB950]" />
                  <span>{currentStage.label}</span>
                </div>

                {/* High precision progress bar */}
                <div className="w-full max-w-md h-[3px] bg-[#21262D] rounded-full overflow-hidden relative border border-[#30363D]/60">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#3FB950] via-[#58A6FF] to-[#3FB950]"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: 'easeOut', duration: 0.1 }}
                  />
                </div>

                {/* Sub-stages milestone pills */}
                <div className="w-full max-w-md grid grid-cols-4 gap-2 mt-4">
                  {STAGES.slice(0, 4).map((st, i) => (
                    <div
                      key={i}
                      className={`text-[10px] font-mono py-1 px-2 text-center rounded border transition-colors ${
                        progress >= st.percent
                          ? 'border-[#3FB950]/40 text-[#3FB950] bg-[#3FB950]/5'
                          : 'border-[#30363D]/50 text-[#8B949E]/50'
                      }`}
                    >
                      {st.percent}%
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* Name Reveal Phase */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-center flex flex-col items-center"
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161B22] border border-[#30363D] text-[#3FB950] font-mono text-xs tracking-widest uppercase mb-6"
                >
                  <span className="w-2 h-2 rounded-full bg-[#3FB950]" />
                  FULL STACK SYSTEM ENGINEER
                </motion.div>

                <div className="overflow-hidden mb-2">
                  <motion.h1
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tighter text-[#C9D1D9]"
                  >
                    RAVEESHA
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-6">
                  <motion.h1
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tighter text-[#8B949E]"
                  >
                    NETHSARANI
                  </motion.h1>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="font-mono text-xs tracking-widest text-[#58A6FF] uppercase"
                >
                  INITIALIZING WORKSPACE & SYSTEMS...
                </motion.p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
