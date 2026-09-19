
 export const ProjectShowcase = () => {
  return (
    
      <section id="stack" className="relative bg-[#0D1117]/80 py-24 sm:py-36 border-b border-[#30363D]">
      {/* Background Dots */}
      <div className="absolute inset-0 bg-dot-pattern opacity-15 pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Editorial Section Eyebrow & Header */}
        <div className="flex items-center justify-between border-b border-[#30363D] pb-4 mb-16">
          <div className="flex items-center gap-3 text-[#3FB950] mono text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#3FB950] inline-block" />
            <span>[ 05 // SYSTEM TOOLCHAIN &amp; RUNTIME CONTRACTS ]</span>
          </div>
          <span className="hidden sm:inline-block mono text-[10px] text-[#8B949E] uppercase tracking-widest">
            STRICT TYPE SAFETY &bull; PRODUCTION PROVEN
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end justify-between border-b border-[#30363D] pb-12 mb-12">
          <div className="lg:col-span-8">
            <h2 className="font-black text-5xl sm:text-7xl md:text-8xl xl:text-[9rem] text-[#C9D1D9] tracking-tighter uppercase leading-[0.88]">
              TECHNICAL<br />
              <span className="text-outline">TOOLCHAIN.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 space-y-3">
            <p className="mono text-xs sm:text-sm text-[#8B949E] leading-relaxed">
              Curated architectural dependencies and runtimes. Every technology is paired with strict type soundness, operational reliability, and observable execution.
            </p>
            <div className="mono text-xs text-[#3FB950] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3FB950] animate-pulse" />
              <span>TOTAL PRODUCTION CAPABILITIES</span>
            </div>
      </div>

      </div>
      </div>
    
    </section>
  )
}

