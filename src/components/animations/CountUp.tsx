import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { EASE } from './motionPresets';

interface CountUpProps {
  value: number;
  duration?: number;
}

/** Counts from 0 up to `value` once, the first time it scrolls into view. */
export const CountUp = ({ value, duration = 1.2 }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(prefersReducedMotion ? value : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, prefersReducedMotion, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
};
