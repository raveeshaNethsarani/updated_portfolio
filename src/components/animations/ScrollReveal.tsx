import type { MouseEventHandler, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  distance?: number;
  scale?: number;
  duration?: number;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}

export const ScrollReveal = ({
  children,
  className,
  delay = 0,
  amount = 0.15,
  distance = 20,
  scale = 1,
  duration = 0.55,
  onMouseLeave,
}: ScrollRevealProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {
          opacity: 0,
          y: prefersReducedMotion ? 0 : distance,
          scale: prefersReducedMotion ? 1 : scale,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: prefersReducedMotion ? 0.01 : duration,
            delay: prefersReducedMotion ? 0 : delay,
            ease: EASE,
          },
        },
      }}
      className={className}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
};
