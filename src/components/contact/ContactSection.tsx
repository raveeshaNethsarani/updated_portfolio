import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Mail, Github, Linkedin, FileText, Copy, Check, Send, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from '../animations/ScrollReveal';
import { revealItem } from '../animations/motionPresets';

interface ContactSectionProps {
  onOpenResume: () => void;
}

// ---------- Config ----------
const EMAIL_ADDRESS = 'raveeshanethsarani963@gmail.com';
const GITHUB_URL = 'https://github.com'; // TODO: replace with your profile URL
const LINKEDIN_URL = 'https://linkedin.com'; // TODO: replace with your profile URL

const INITIAL_FORM = { name: '', email: '', message: '' };

const channelList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

// ---------- Shared styles ----------
const labelClass = 'block text-[#8B949E] mb-1.5 uppercase tracking-wider text-[10px] font-bold';
const inputClass =
  'w-full bg-[#0D1117] border border-[#30363D] rounded-lg px-4 py-3 text-white placeholder:text-[#8B949E]/40 focus:outline-none focus:border-[#3FB950] transition-colors';
const channelBtnClass =
  'motion-btn group flex min-w-0 items-center justify-center gap-1.5 py-3 bg-[#0D1117] hover:bg-[#21262D] border border-[#30363D] mono text-[11px] rounded-lg transition-all cursor-pointer';

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const prefersReducedMotion = useReducedMotion();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof typeof INITIAL_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard blocked (e.g. insecure context) → fall back to mail client
      window.location.href = `mailto:${EMAIL_ADDRESS}`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // TODO: replace with real delivery (EmailJS / API route)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData(INITIAL_FORM);
  };

  return (
    <section id="contact" className="relative bg-[#0D1117] section-y">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Eyebrow */}
        <ScrollReveal className="flex items-center justify-between gap-4 border-b border-[#30363D] pb-3 mb-8 sm:mb-10">
          <div className="flex min-w-0 items-center gap-3 text-[#3FB950] mono text-[10px] sm:text-xs tracking-[0.2em] lg:tracking-[0.3em] uppercase">
            <span className="w-2 h-2 shrink-0 rounded-full bg-[#3FB950] inline-block" />
            <span className="text-balance">[ 06 // INITIATE TRANSMISSION &amp; CONTRACTS ]</span>
          </div>
          <span className="hidden shrink-0 whitespace-nowrap sm:inline-block mono text-[10px] text-[#8B949E] uppercase tracking-widest">
            DIRECT ENGAGEMENT &bull; SLA &lt; 24H
          </span>
        </ScrollReveal>

        {/* Headline row — full width so the 6rem headline fits */}
        <ScrollReveal delay={0.06} stagger={0.1} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12 border-b border-[#30363D] pb-8 mb-8 sm:pb-10 sm:mb-10">
          <motion.h2 variants={revealItem} className="font-black text-[length:min(3rem,13vw)] sm:text-7xl lg:text-[length:clamp(4.5rem,calc(10vw_-_1.5rem),11rem)] text-[#C9D1D9] tracking-tighter leading-[0.88] uppercase">
            LET&apos;S BUILD
            <br />
            <span className="text-[#3FB950]">SOMETHING</span>
            <br />
            <span className="text-outline">MEANINGFUL.</span>
          </motion.h2>

          <div className="lg:max-w-md lg:min-w-[20rem] 2xl:max-w-lg flex flex-col gap-5">
            <motion.p variants={revealItem} className="mono text-sm text-[#8B949E] leading-relaxed font-light">
              Available for technical leadership, full-stack system architecture, high-throughput
              backend services, and high-impact software engineering projects.
            </motion.p>

            <motion.button
              onClick={handleCopyEmail}
              id="contact-email-btn"
              variants={revealItem}
              whileHover={prefersReducedMotion ? undefined : { y: -1, scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              className="group self-stretch sm:self-start inline-flex justify-center items-center gap-3 px-6 py-3.5 bg-[#3FB950] hover:bg-[#46c95a] text-[#0D1117] mono text-xs tracking-wider font-black rounded-xl transition-[background-color,box-shadow,color] duration-200 cursor-pointer shadow-xl shadow-[#3FB950]/20"
            >
              <Mail className="motion-icon motion-icon-up w-4 h-4" />
              <span>{copiedEmail ? 'COPIED TO CLIPBOARD' : 'COPY DIRECT EMAIL'}</span>
              {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4 opacity-75" />}
            </motion.button>
          </div>
        </ScrollReveal>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* ---------- LEFT: Channels ---------- */}
          <ScrollReveal className="lg:col-span-5 flex flex-col gap-6" amount={0.1}>
            {/* Direct channels card */}
            <div className="p-4 sm:p-6 bg-[#161B22] border border-[#30363D] rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#30363D] pb-3">
                <h4 className="font-mono text-xs text-[#3FB950] tracking-widest uppercase font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>DIRECT SYSTEM CHANNELS</span>
                </h4>
                <span className="w-2 h-2 rounded-full bg-[#3FB950] animate-pulse" />
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="p-3 bg-[#0D1117] border border-[#30363D]/70 rounded-lg flex flex-col sm:flex-row sm:items-center lg:flex-col lg:items-start xl:flex-row xl:items-center justify-between gap-1">
                  <span className="text-[#8B949E] shrink-0">PRIMARY INBOX:</span>
                  <span className="text-white font-medium select-all [overflow-wrap:anywhere] sm:text-right lg:text-left xl:text-right">{EMAIL_ADDRESS}</span>
                </div>
                <div className="p-3 bg-[#0D1117] border border-[#30363D]/70 rounded-lg flex items-center justify-between gap-2">
                  <span className="text-[#8B949E]">RESPONSE SLA:</span>
                  <span className="text-white font-medium">&lt; 24 Hours</span>
                </div>
              </div>

              <motion.div variants={channelList} className="grid grid-cols-1 min-[360px]:grid-cols-3 gap-2.5">
                <motion.a
                  variants={revealItem}
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  id="contact-github-btn"
                  className={`${channelBtnClass} text-[#C9D1D9] hover:text-white hover:border-[#8B949E]`}
                >
                  <Github className="motion-icon motion-icon-up w-3.5 h-3.5" />
                  <span>GITHUB</span>
                </motion.a>
                <motion.a
                  variants={revealItem}
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  id="contact-linkedin-btn"
                  className={`${channelBtnClass} text-[#58A6FF] hover:text-white hover:border-[#58A6FF]`}
                >
                  <Linkedin className="motion-icon motion-icon-up w-3.5 h-3.5" />
                  <span>LINKEDIN</span>
                </motion.a>
                <motion.button
                  variants={revealItem}
                  type="button"
                  onClick={onOpenResume}
                  id="contact-view-resume-btn"
                  className={`${channelBtnClass} text-[#A371F7] hover:text-white hover:border-[#A371F7]`}
                >
                  <FileText className="motion-icon motion-icon-up w-3.5 h-3.5" />
                  <span>RESUME</span>
                </motion.button>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* ---------- RIGHT: Inquiry form ---------- */}
          <ScrollReveal delay={0.08} className="lg:col-span-7 min-w-0 bg-[#161B22] border border-[#30363D] rounded-2xl p-4 sm:p-8 shadow-2xl" amount={0.1}>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#30363D] pb-4 mb-6">
              <span className="font-mono text-xs text-white font-bold tracking-widest uppercase">
                ENGINEERING INQUIRY FORM
              </span>
              <span className="font-mono text-[10px] text-[#3FB950] bg-[#3FB950]/10 px-3 py-1 rounded-full border border-[#3FB950]/30 font-bold whitespace-nowrap">
                DIRECT CHANNEL
              </span>
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 font-mono text-xs"
                >
                  {/* Name + Email side by side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className={labelClass}>
                        YOUR NAME / ORGANIZATION *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={updateField('name')}
                        placeholder="e.g. Alex Miller / Enterprise Team"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className={labelClass}>
                        EMAIL ADDRESS *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={updateField('email')}
                        placeholder="alex@company.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className={labelClass}>
                      MESSAGE &amp; SYSTEM REQUIREMENTS *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={updateField('message')}
                      placeholder="Describe the system problem, tech stack, or engineering goals..."
                      className={`${inputClass} resize-none leading-relaxed`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="motion-btn group w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-[#3FB950] hover:bg-[#46c95a] text-[#0D1117] font-black text-xs tracking-widest uppercase transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-[#3FB950]/15"
                  >
                    <Send className="motion-icon motion-icon-diag w-4 h-4" />
                    <span>{isSubmitting ? 'TRANSMITTING MESSAGE...' : 'TRANSMIT INQUIRY'}</span>
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-10 text-center space-y-4 font-mono"
                >
                  <div className="w-14 h-14 rounded-full bg-[#3FB950]/10 border border-[#3FB950] flex items-center justify-center mx-auto text-[#3FB950]">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="font-black text-2xl text-white uppercase tracking-tight">TRANSMISSION COMPLETE</h4>
                  <p className="text-xs text-[#8B949E] max-w-sm mx-auto leading-relaxed">
                    Thank you, {formData.name}. Raveesha will review your inquiry and respond to{' '}
                    <span className="text-white">{formData.email}</span> within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="motion-btn mt-2 px-5 py-2.5 rounded-lg bg-[#21262D] border border-[#30363D] text-xs text-white hover:bg-[#30363D] transition-colors font-bold cursor-pointer"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollReveal>
        </div>

        {/* Footer bar */}
        <div className="mt-12 sm:mt-16 pt-6 border-t border-[#30363D] flex flex-col lg:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8B949E] text-center sm:text-left">
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-1 sm:gap-3">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3FB950]" />
              <span className="text-white font-bold">RAVEESHA NETHSARANI SIRIWARDANA</span>
            </span>
            <span>&bull; BOTCALM SYSTEM ENGINEER</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px]">
            <span>&copy; {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
            <span className="hidden sm:inline">&bull;</span>
            <a href="#hero" className="link-underline hover:text-[#3FB950] transition-colors">
              BACK TO TOP [↑]
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};