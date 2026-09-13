import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, X, Search, ArrowRight, CornerDownLeft, Sparkles, FileText, Mail, Code, Layers } from 'lucide-react';
import { PROJECTS_DATA } from '../../data/projects';
import { ProjectItem } from '../../types';

interface SystemCommandBarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onOpenResume: () => void;
}

export const SystemCommandBar: React.FC<SystemCommandBarProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onOpenResume
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Global key listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or custom event
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    {
      id: 'resume',
      title: 'View Resume / CV',
      category: 'DOCUMENTATION',
      icon: FileText,
      action: () => {
        onClose();
        onOpenResume();
      }
    },
    {
      id: 'contact',
      title: 'Contact Raveesha / Copy Email',
      category: 'COMMUNICATION',
      icon: Mail,
      action: () => {
        onClose();
        navigator.clipboard.writeText('raveesha.nethsarani.dev@gmail.com');
        const el = document.getElementById('contact');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'process',
      title: 'Inspect Methodology: "How I Build"',
      category: 'PIPELINE',
      icon: Layers,
      action: () => {
        onClose();
        const el = document.getElementById('how-i-build');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'stack',
      title: 'Inspect Full Technology Stack',
      category: 'TOOLCHAIN',
      icon: Code,
      action: () => {
        onClose();
        const el = document.getElementById('stack');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  ];

  const filteredCommands = commands.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = PROJECTS_DATA.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.technologies.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0D1117]/85 backdrop-blur-md"
        />

        {/* Command Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-[#161B22] border border-[#30363D] rounded-2xl shadow-2xl overflow-hidden z-10 font-mono text-xs text-[#C9D1D9]"
        >
          {/* Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-[#30363D] bg-[#0D1117]">
            <Terminal className="w-4 h-4 text-[#3FB950] mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command, project name, or technology..."
              className="w-full bg-transparent text-[#C9D1D9] focus:outline-none placeholder:text-[#8B949E]"
            />
            <button
              onClick={onClose}
              className="p-1 rounded text-[#8B949E] hover:text-[#C9D1D9] ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="p-3 max-h-96 overflow-y-auto space-y-3 no-scrollbar">
            {/* Quick Actions */}
            {filteredCommands.length > 0 && (
              <div>
                <span className="text-[10px] text-[#8B949E] uppercase tracking-widest px-3 block mb-1">
                  SYSTEM COMMANDS
                </span>
                <div className="space-y-1">
                  {filteredCommands.map((cmd) => {
                    const Icon = cmd.icon;
                    return (
                      <button
                        key={cmd.id}
                        onClick={cmd.action}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#21262D] text-left transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-[#3FB950]" />
                          <span>{cmd.title}</span>
                        </div>
                        <span className="text-[10px] text-[#8B949E] group-hover:text-[#C9D1D9]">
                          EXECUTE ↵
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Projects */}
            {filteredProjects.length > 0 && (
              <div>
                <span className="text-[10px] text-[#8B949E] uppercase tracking-widest px-3 block mb-1">
                  PRODUCTION SYSTEMS
                </span>
                <div className="space-y-1">
                  {filteredProjects.map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => {
                        onClose();
                        onSelectProject(proj);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#21262D] text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[#3FB950] font-bold text-[10px]">
                          {proj.number}
                        </span>
                        <div>
                          <span className="font-bold block">{proj.title}</span>
                          <span className="text-[10px] text-[#8B949E]">
                            {proj.category}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#58A6FF] group-hover:underline">
                        CASE STUDY →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredCommands.length === 0 && filteredProjects.length === 0 && (
              <div className="py-8 text-center text-[#8B949E]">
                No matching system command or project found for &quot;{query}&quot;.
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-[#30363D] bg-[#0D1117] flex items-center justify-between text-[10px] text-[#8B949E]">
            <div className="flex items-center gap-3">
              <span>[ESC] TO CLOSE</span>
              <span>[↵] TO SELECT</span>
            </div>
            <span>RAVEESHA SYSTEM OS // CLI</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
