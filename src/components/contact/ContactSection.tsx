import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  Mail,
  Github,
  Linkedin,
  FileText,
  Copy,
  Check,
  Send,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Globe2
} from 'lucide-react';

interface ContactSectionProps {
  onOpenResume: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectScope: 'Full Stack System Architecture',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailAddress = 'raveesha.nethsarani.dev@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="relative bg-[#0D1117] py-24 sm:py-36">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Editorial Section Eyebrow */}
        <div className="flex items-center justify-between border-b border-[#30363D] pb-4 mb-16">
          <div className="flex items-center gap-3 text-[#3FB950] mono text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#3FB950] inline-block" />
            <span>[ 06 // INITIATE TRANSMISSION &amp; CONTRACTS ]</span>
          </div>
          <span className="hidden sm:inline-block mono text-[10px] text-[#8B949E] uppercase tracking-widest">
            DIRECT ENGAGEMENT &bull; SLA &lt; 24H
          </span>
        </div>

        {/* Massive Bold Headline */}
        <div className="border-b border-[#30363D] pb-16 mb-20">
          <h2 className="font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#C9D1D9] tracking-tighter leading-[0.88] mb-8 uppercase">
            LET&apos;S BUILD<br />
            <span className="text-[#3FB950]">SOMETHING</span><br />
            <span className="text-outline">MEANINGFUL.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
            <p className="lg:col-span-8 mono text-sm sm:text-base text-[#8B949E] leading-relaxed max-w-2xl font-light">
              Available for technical leadership, full-stack system architecture, high-throughput backend services, and high-impact software engineering projects.
            </p>

            {/* Direct Copy Email Button */}
            <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-4">
              <button
                onClick={handleCopyEmail}
                id="contact-email-btn"
                className="inline-flex items-center gap-3 px-7 py-4 bg-[#3FB950] hover:bg-[#46c95a] text-[#0D1117] mono text-xs tracking-wider font-black rounded-xl transition-all duration-200 cursor-pointer shadow-xl shadow-[#3FB950]/20 active:scale-95"
              >
                <Mail className="w-4 h-4" />
                <span>{copiedEmail ? 'COPIED TO CLIPBOARD' : 'COPY DIRECT EMAIL'}</span>
                {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4 opacity-75" />}
              </button>
            </div>
          </div>
        </div>

        {/* Engineering Inquiry Form & Direct Communication Channel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Direct Channels Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 bg-[#161B22] border border-[#30363D] rounded-2xl space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#30363D] pb-4">
                <h4 className="font-mono text-xs text-[#3FB950] tracking-widest uppercase font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>DIRECT SYSTEM CHANNELS</span>
                </h4>
                <span className="w-2 h-2 rounded-full bg-[#3FB950] animate-pulse" />
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 bg-[#0D1117] border border-[#30363D]/70 rounded-xl flex items-center justify-between">
                  <span className="text-[#8B949E]">PRIMARY INBOX:</span>
                  <span className="text-white font-medium select-all">{emailAddress}</span>
                </div>

                <div className="p-3.5 bg-[#0D1117] border border-[#30363D]/70 rounded-xl flex items-center justify-between">
                  <span className="text-[#8B949E]">ORGANIZATION:</span>
                  <span className="text-[#3FB950] font-medium">BotCalm (Pvt) Ltd</span>
                </div>

                <div className="p-3.5 bg-[#0D1117] border border-[#30363D]/70 rounded-xl flex items-center justify-between">
                  <span className="text-[#8B949E]">TIMEZONE:</span>
                  <span className="text-[#58A6FF] font-medium">Sri Lanka (UTC +05:30)</span>
                </div>

                <div className="p-3.5 bg-[#0D1117] border border-[#30363D]/70 rounded-xl flex items-center justify-between">
                  <span className="text-[#8B949E]">RESPONSE SLA:</span>
                  <span className="text-white font-medium">&lt; 24 Hours</span>
                </div>
              </div>

              {/* Social Link Badges */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  id="contact-github-btn"
                  className="flex items-center justify-center gap-1.5 py-3 bg-[#0D1117] hover:bg-[#21262D] text-[#C9D1D9] hover:text-white border border-[#30363D] hover:border-[#8B949E] mono text-[11px] rounded-xl transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GITHUB</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  id="contact-linkedin-btn"
                  className="flex items-center justify-center gap-1.5 py-3 bg-[#0D1117] hover:bg-[#21262D] text-[#58A6FF] hover:text-white border border-[#30363D] hover:border-[#58A6FF] mono text-[11px] rounded-xl transition-all"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LINKEDIN</span>
                </a>

                <button
                  onClick={onOpenResume}
                  id="contact-view-resume-btn"
                  className="flex items-center justify-center gap-1.5 py-3 bg-[#0D1117] hover:bg-[#21262D] text-[#A371F7] hover:text-white border border-[#30363D] hover:border-[#A371F7] mono text-[11px] rounded-xl transition-all cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>RESUME</span>
                </button>
              </div>
            </div>

            <div className="p-6 bg-[#161B22] border border-[#30363D] rounded-2xl font-mono text-xs text-[#8B949E] space-y-2">
              <span className="text-white font-bold block uppercase tracking-wider text-[11px]">PRODUCTION DOMAINS OPEN TO:</span>
              <p className="flex items-center gap-2 text-[#C9D1D9]">
                <span className="text-[#3FB950]">&bull;</span> Full Stack System Architecture &amp; Scalability
              </p>
              <p className="flex items-center gap-2 text-[#C9D1D9]">
                <span className="text-[#3FB950]">&bull;</span> High-Throughput APIs, Webhooks, &amp; Stripe Integrations
              </p>
              <p className="flex items-center gap-2 text-[#C9D1D9]">
                <span className="text-[#3FB950]">&bull;</span> Real-Time Workloads, AI Agents, &amp; Database RBAC
              </p>
            </div>
          </div>

          {/* Inquiry Form Right Column */}
          <div className="lg:col-span-7 bg-[#161B22] border border-[#30363D] rounded-2xl p-6 sm:p-10 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#30363D] pb-5 mb-8">
              <span className="font-mono text-xs text-white font-bold tracking-widest uppercase">
                ENGINEERING INQUIRY FORM
              </span>
              <span className="font-mono text-[10px] text-[#3FB950] bg-[#3FB950]/10 px-3 py-1 rounded-full border border-[#3FB950]/30 font-bold">
                ENCRYPTED DIRECT CHANNEL
              </span>
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
                  <div>
                    <label className="block text-[#8B949E] mb-2 uppercase tracking-wider text-[11px] font-bold">
                      YOUR NAME / ORGANIZATION *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Miller / Enterprise Team"
                      className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3.5 text-white placeholder:text-[#8B949E]/40 focus:outline-none focus:border-[#3FB950] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8B949E] mb-2 uppercase tracking-wider text-[11px] font-bold">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3.5 text-white placeholder:text-[#8B949E]/40 focus:outline-none focus:border-[#3FB950] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8B949E] mb-2 uppercase tracking-wider text-[11px] font-bold">
                      PROJECT DOMAIN / SCOPE
                    </label>
                    <select
                      value={formData.projectScope}
                      onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                      className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#3FB950] transition-colors cursor-pointer"
                    >
                      <option value="Full Stack System Architecture">Full Stack System Architecture</option>
                      <option value="Backend APIs & Webhook Pipeline">Backend APIs &amp; Webhook Pipeline</option>
                      <option value="Next.js / React Web Application">Next.js / React Web Application</option>
                      <option value="Database Optimization & RBAC">Database Optimization &amp; RBAC</option>
                      <option value="General Technical Consultation">General Technical Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#8B949E] mb-2 uppercase tracking-wider text-[11px] font-bold">
                      MESSAGE &amp; SYSTEM REQUIREMENTS *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe the system problem, tech stack, or engineering goals..."
                      className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3.5 text-white placeholder:text-[#8B949E]/40 focus:outline-none focus:border-[#3FB950] transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-[#3FB950] hover:bg-[#46c95a] text-[#0D1117] font-black text-xs tracking-widest uppercase transition-all cursor-pointer disabled:opacity-50 shadow-xl shadow-[#3FB950]/15 active:scale-98"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'TRANSMITTING MESSAGE...' : 'TRANSMIT INQUIRY'}</span>
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4 font-mono"
                >
                  <div className="w-16 h-16 rounded-full bg-[#3FB950]/10 border border-[#3FB950] flex items-center justify-center mx-auto text-[#3FB950]">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="font-black text-2xl text-white uppercase tracking-tight">
                    TRANSMISSION COMPLETE
                  </h4>
                  <p className="text-xs text-[#8B949E] max-w-sm mx-auto leading-relaxed">
                    Thank you, {formData.name}. Your inquiry has been securely queued in the system. Raveesha will review and respond to {formData.email} within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        projectScope: 'Full Stack System Architecture',
                        message: ''
                      });
                    }}
                    className="mt-4 px-5 py-2.5 rounded-lg bg-[#21262D] border border-[#30363D] text-xs text-white hover:bg-[#30363D] transition-colors font-bold"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Cinematic Footer Bar */}
        <div className="mt-28 pt-8 border-t border-[#30363D] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8B949E]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#3FB950]" />
            <span className="text-white font-bold">RAVEESHA NETHSARANI SIRIWARDANA</span>
            <span>&bull; BOTCALM SYSTEM ENGINEER</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>&copy; {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
            <span className="hidden sm:inline">&bull;</span>
            <a href="#hero" className="hover:text-[#3FB950] transition-colors">
              BACK TO TOP [↑]
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
