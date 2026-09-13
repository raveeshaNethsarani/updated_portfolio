import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ParallaxTypography: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isMotionOk: '(prefers-reduced-motion: no-preference)',
        isDesktop: '(min-width: 768px)'
      },
      (context) => {
        const { isMotionOk, isDesktop } = context.conditions as {
          isMotionOk: boolean;
          isDesktop: boolean;
        };

        if (!containerRef.current || !isMotionOk) return;

        const factor = isDesktop ? 1 : 0.45;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true
          }
        });

        if (row1Ref.current) {
          tl.fromTo(
            row1Ref.current,
            { xPercent: -15 * factor },
            { xPercent: 15 * factor, ease: 'none' },
            0
          );
        }

        if (row2Ref.current) {
          tl.fromTo(
            row2Ref.current,
            { xPercent: 18 * factor },
            { xPercent: -18 * factor, ease: 'none' },
            0
          );
        }

        if (row3Ref.current) {
          tl.fromTo(
            row3Ref.current,
            { xPercent: -12 * factor },
            { xPercent: 12 * factor, ease: 'none' },
            0
          );
        }
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-32 overflow-hidden border-y border-[#30363D]/60 bg-[#0D1117] relative select-none"
    >
      {/* Background technical watermarks */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />

      <div className="flex flex-col space-y-4 sm:space-y-6 opacity-90">
        {/* Row 1: Left -> Right */}
        <div className="overflow-visible whitespace-nowrap flex">
          <div
            ref={row1Ref}
            className="flex items-center gap-8 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-[#21262D] hover:text-[#C9D1D9] transition-colors duration-500 will-change-transform uppercase select-none"
          >
            <span className="text-outline">BUILD DIGITAL SYSTEMS</span>
            <span className="text-[#3FB950] mono text-3xl sm:text-5xl">///</span>
            <span className="text-[#C9D1D9]">BUILD DIGITAL SYSTEMS</span>
            <span className="text-[#3FB950] mono text-3xl sm:text-5xl">///</span>
            <span className="text-outline">BUILD DIGITAL SYSTEMS</span>
          </div>
        </div>

        {/* Row 2: Right -> Left */}
        <div className="overflow-visible whitespace-nowrap flex">
          <div
            ref={row2Ref}
            className="flex items-center gap-8 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-[#30363D] hover:text-[#58A6FF] transition-colors duration-500 will-change-transform uppercase select-none"
          >
            <span className="text-[#58A6FF]">&mdash;</span>
            <span className="text-[#C9D1D9]">FROM INTERFACE</span>
            <span className="text-[#58A6FF]">&mdash;</span>
            <span className="text-outline text-outline-purple">FROM INTERFACE</span>
            <span className="text-[#58A6FF]">&mdash;</span>
            <span className="text-[#C9D1D9]">FROM INTERFACE</span>
          </div>
        </div>

        {/* Row 3: Left -> Right */}
        <div className="overflow-visible whitespace-nowrap flex">
          <div
            ref={row3Ref}
            className="flex items-center gap-8 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-[#21262D] hover:text-[#A371F7] transition-colors duration-500 will-change-transform uppercase select-none"
          >
            <span className="text-outline text-outline-green">TO INFRASTRUCTURE.</span>
            <span className="w-5 h-5 rounded-full bg-[#3FB950] inline-block" />
            <span className="text-[#C9D1D9]">TO INFRASTRUCTURE.</span>
            <span className="w-5 h-5 rounded-full bg-[#3FB950] inline-block" />
            <span className="text-outline text-outline-green">TO INFRASTRUCTURE.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
