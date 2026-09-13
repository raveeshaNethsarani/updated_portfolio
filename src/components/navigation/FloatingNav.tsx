import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, FileText, Terminal, Activity } from 'lucide-react';

interface FloatingNavProps {
  onOpenResume: () => void;
  onOpenTerminal?: () => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ onOpenResume, onOpenTerminal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['hero', 'how-i-build', 'work', 'about', 'experience', 'stack', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'WORK', href: '#work', id: 'work' },
    { label: 'PROCESS', href: '#how-i-build', id: 'how-i-build' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { label: 'STACK', href: '#stack', id: 'stack' },
    { label: 'CONTACT', href: '#contact', id: 'contact' }
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 sm:py-6 flex justify-center pointer-events-none"
      >
        <div
          className={`pointer-events-auto w-full max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl transition-all duration-300 ${
            isScrolled
              ? 'bg-[#161B22]/75 backdrop-blur-md border border-[#30363D] shadow-2xl shadow-black/50'
              : 'bg-transparent border border-transparent'
          }`}
        >
          {/* Logo Brand */}
          <a
            href="#hero"
            id="nav-logo"
            className="flex items-center gap-3 sm:gap-6 group focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <span className="mono text-xs tracking-widest text-[#3FB950] font-bold">
                Raveesha  
              </span>
            </div>
            <div className="hidden lg:block h-px w-10 bg-[#30363D]" />
            {/* <span className="hidden lg:inline-block mono text-[10px] uppercase tracking-[0.3em] text-[#8B949E]">
              Engineering Portfolio 2024
            </span> */}
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  id={`nav-link-${item.id}`}
                  className={`mono text-[11px] uppercase tracking-widest transition-colors duration-200 relative py-1 ${
                    isActive
                      ? 'text-[#3FB950] font-bold'
                      : 'text-[#8B949E] hover:text-[#C9D1D9]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3FB950]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action items & status */}
          <div className="hidden sm:flex items-center gap-3">
           

            {/* Resume button */}
            <button
              onClick={onOpenResume}
              id="nav-resume-btn"
              className="px-4 py-2 border border-[#30363D] rounded-full text-[10px] mono tracking-widest uppercase hover:bg-[#30363D] hover:text-[#3FB950] text-[#C9D1D9] transition-all cursor-pointer flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5 text-[#3FB950]" />
              <span>RESUME</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenResume}
              className="p-2 rounded-lg bg-[#21262D] border border-[#30363D] text-[#C9D1D9] text-xs"
              aria-label="View Resume"
            >
              <FileText className="w-4 h-4 text-[#3FB950]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-nav-toggle"
              className="p-2 rounded-lg bg-[#161B22] border border-[#30363D] text-[#C9D1D9]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden bg-[#161B22] border border-[#30363D] rounded-xl p-6 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-mono tracking-wider py-2 border-b border-[#21262D] ${
                    activeSection === item.id ? 'text-[#3FB950] font-bold' : 'text-[#8B949E]'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#21262D] border border-[#30363D] text-xs font-mono text-[#C9D1D9]"
                >
                  <FileText className="w-4 h-4 text-[#3FB950]" />
                  <span>VIEW FULL RESUME</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
