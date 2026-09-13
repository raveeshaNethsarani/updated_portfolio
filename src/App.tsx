import React, { useState, useEffect } from 'react';
import { CinematicLoader } from './components/loader/CinematicLoader';
import { FloatingNav } from './components/navigation/FloatingNav';
import { HeroSection } from './components/hero/HeroSection';
import { ParallaxTypography } from './components/typography/ParallaxTypography';
import { HowIBuild } from './components/process/HowIBuild';
import { SelectedWork } from './components/projects/SelectedWork';
import { AboutSection } from './components/about/AboutSection';
import { ExperienceTimeline } from './components/experience/ExperienceTimeline';
import { TechStackSection } from './components/skills/TechStackSection';
import { ContactSection } from './components/contact/ContactSection';
import { ProjectCaseStudyModal } from './components/projects/ProjectCaseStudyModal';
import { ResumeModal } from './components/modals/ResumeModal';
import { SystemCommandBar } from './components/terminal/SystemCommandBar';
import { GalaxyBackground } from './components/background/GalaxyBackground';
import { CustomCursor } from './components/cursor/CustomCursor';
import { ProjectItem } from './types';
import { Terminal } from 'lucide-react';

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [commandBarOpen, setCommandBarOpen] = useState(false);

  // Global shortcut to trigger command palette: Cmd+K / Ctrl+K or "/"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandBarOpen((prev) => !prev);
      } else if (e.key === '/' && !commandBarOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setCommandBarOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandBarOpen]);

  return (
    <div className="bg-[#0D1117] text-[#C9D1D9] min-h-screen relative selection:bg-[#3FB950]/20 selection:text-[#3FB950]">
      {/* Global Desktop Custom Cursor */}
      <CustomCursor />

      {/* Global Galaxy Background Layer */}
      <GalaxyBackground />

      {/* Fullscreen Cinematic Loader */}
      {!loadingComplete && (
        <CinematicLoader onComplete={() => setLoadingComplete(true)} />
      )}

      {/* Main Editorial Application */}
      <div className={`relative z-10 transition-opacity duration-700 ${loadingComplete ? 'opacity-100' : 'opacity-0'}`}>
        {/* Floating Minimal Navigation Bar */}
        <FloatingNav
          onOpenResume={() => setResumeModalOpen(true)}
          onOpenTerminal={() => setCommandBarOpen(true)}
        />

        {/* 1. Full-screen Editorial Hero */}
        <HeroSection onOpenResume={() => setResumeModalOpen(true)} />

        {/* 2. Parallax Typography Marquee */}
        <ParallaxTypography />

        {/* 3. "How I Build" Pinned Step Process */}
        <HowIBuild />

        {/* 4. Selected Work & Horizontal Project Gallery */}
        <SelectedWork onSelectProject={(project) => setSelectedProject(project)} />

        {/* 5. About Section: "A Developer Who Thinks In Systems" */}
        <AboutSection />

        {/* 6. Experience Timeline: BotCalm (Pvt) Ltd */}
        <ExperienceTimeline />

        {/* 7. Technology Stack & Currently Exploring */}
        <TechStackSection />

        {/* 8. Contact Section: "Let's Build Something Meaningful" */}
        <ContactSection onOpenResume={() => setResumeModalOpen(true)} />

        {/* Floating Quick Command Bar Trigger */}
        <div className="fixed bottom-6 right-6 z-30 hidden sm:block">
          <button
            onClick={() => setCommandBarOpen(true)}
            id="quick-terminal-trigger"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#161B22]/90 hover:bg-[#21262D] text-xs font-mono text-[#8B949E] hover:text-[#C9D1D9] border border-[#30363D] shadow-2xl backdrop-blur-md transition-all cursor-pointer group"
          >
            <Terminal className="w-3.5 h-3.5 text-[#3FB950]" />
            <span className="text-[11px]">COMMAND PALETTE</span>
            <span className="px-1.5 py-0.5 rounded bg-[#0D1117] border border-[#30363D] text-[10px] text-[#8B949E]">
              ⌘K
            </span>
          </button>
        </div>

        {/* Modals */}
        <ProjectCaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        <ResumeModal
          isOpen={resumeModalOpen}
          onClose={() => setResumeModalOpen(false)}
        />

        <SystemCommandBar
          isOpen={commandBarOpen}
          onClose={() => setCommandBarOpen(false)}
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenResume={() => setResumeModalOpen(true)}
        />
      </div>
    </div>
  );
}
