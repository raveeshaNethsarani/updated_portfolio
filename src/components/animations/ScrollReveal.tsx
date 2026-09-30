import { useRef, type MouseEventHandler, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'motion/react';
import { EASE } from './motionPresets';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  distance?: number;
  scale?: number;
  duration?: number;
  /**
   * Turns the wrapper into a stagger group: it no longer fades itself, and its
   * `revealItem` (or any `hidden`/`visible`) motion children reveal one after another.
   */
  stagger?: number;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}

export const ScrollReveal = ({
  children,
  className,
  delay = 0,
  amount = 0.15,
  distance = 32,
  scale = 1,
  duration = 0.6,
  stagger,
  onMouseLeave,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  // Plays once; the -8% bottom margin starts the reveal just before content is fully on screen.
  const isInView = useInView(ref, { once: true, amount, margin: '0px 0px -8% 0px' });
  const prefersReducedMotion = useReducedMotion();

  const variants: Variants =
    stagger !== undefined
      ? {
          hidden: {},
          visible: {
            transition: {
              staggerChildren: prefersReducedMotion ? 0 : stagger,
              delayChildren: prefersReducedMotion ? 0 : delay,
            },
          },
        }
      : {
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
              duration: prefersReducedMotion ? 0.2 : duration,
              delay: prefersReducedMotion ? 0 : delay,
              ease: EASE,
            },
          },
        };

  // A controlled `animate` (rather than `whileInView`) lets children that mount later,
  // e.g. after filtering, inherit the variant state and animate in on their own.
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
};
