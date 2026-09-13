import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

type CursorVariant = 'default' | 'link' | 'project' | 'tech' | 'explore';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [customLabel, setCustomLabel] = useState<string>('');

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices with fine control and without reduced motion
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer || prefersReducedMotion) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check hovered element context
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveElement = target.closest('a, button, [data-cursor], [role="button"]');
      if (interactiveElement) {
        const cursorAttr = interactiveElement.getAttribute('data-cursor');
        const href = interactiveElement.getAttribute('href');
        const tagName = interactiveElement.tagName.toLowerCase();

        if (cursorAttr === 'project') {
          setVariant('project');
          setCustomLabel('VIEW');
        } else if (cursorAttr === 'tech') {
          setVariant('tech');
          setCustomLabel('');
        } else if (cursorAttr === 'explore') {
          setVariant('explore');
          setCustomLabel('EXPLORE');
        } else if (tagName === 'a' || tagName === 'button' || href) {
          setVariant('link');
          setCustomLabel('');
        } else {
          setVariant('default');
          setCustomLabel('');
        }
      } else {
        setVariant('default');
        setCustomLabel('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth Lerp Animation Loop
    const updatePosition = () => {
      const lerpFactor = 0.18;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerpFactor;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    rafId.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  // Calculate size and appearance based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'project':
        return 'w-20 h-20 bg-[#3FB950] text-[#0D1117] border-none shadow-lg shadow-[#3FB950]/30 -translate-x-10 -translate-y-10 scale-100';
      case 'explore':
        return 'w-22 h-22 bg-[#58A6FF] text-[#0D1117] border-none shadow-lg shadow-[#58A6FF]/30 -translate-x-11 -translate-y-11 scale-100';
      case 'link':
        return 'w-10 h-10 bg-[#3FB950]/15 border border-[#3FB950] -translate-x-5 -translate-y-5 scale-110';
      case 'tech':
        return 'w-9 h-9 bg-[#A371F7]/15 border border-[#A371F7] -translate-x-4.5 -translate-y-4.5 scale-105';
      default:
        return 'w-7 h-7 bg-transparent border border-[#8B949E]/60 -translate-x-3.5 -translate-y-3.5';
    }
  };

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      style={{
        transform: `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`,
        transition: 'opacity 0.2s ease'
      }}
    >
      <div
        className={`rounded-full flex items-center justify-center transition-all duration-200 ease-out backdrop-blur-[1px] ${getVariantStyles()}`}
      >
        {variant === 'default' && (
          <div className="w-1.5 h-1.5 rounded-full bg-[#3FB950]" />
        )}

        {variant === 'link' && (
          <ArrowUpRight className="w-3.5 h-3.5 text-[#3FB950]" />
        )}

        {variant === 'tech' && (
          <div className="w-2 h-2 rounded-full bg-[#A371F7] animate-pulse" />
        )}

        {(variant === 'project' || variant === 'explore') && (
          <span className="font-mono text-[10px] font-black tracking-widest uppercase flex items-center gap-1">
            {customLabel}
            <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
          </span>
        )}
      </div>
    </div>
  );
};
