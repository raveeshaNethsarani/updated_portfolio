import { createContext, useContext } from 'react';

/**
 * Flips to true once the cinematic loader hands over, so the navigation and hero
 * entrance sequence plays when it can actually be seen instead of behind the loader.
 */
export const IntroContext = createContext(true);

export const useIntroReady = () => useContext(IntroContext);
