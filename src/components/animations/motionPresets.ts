import { useEffect, useState } from 'react';
import type { Variants } from 'motion/react';

/** Shared easing curve for every entrance / reveal on the site. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Child variant for anything inside a staggered <ScrollReveal stagger={…}>. */
export const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/** Thin accent lines that draw in from the left once their section is revealed. */
export const accentLine: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.7, ease: EASE, delay: 0.15 } },
};

/** SSR-safe matchMedia hook that stays in sync with the query. */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
};

/** Desktop-class pointer: mouse-driven effects (parallax, custom cursor) are limited to this. */
export const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 1024px)';
