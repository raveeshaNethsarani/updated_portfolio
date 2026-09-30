import React, { useState } from 'react';
import { Galaxy } from './Galaxy';

// Phones / touch devices get a lighter field and no pointer repulsion.
const COMPACT_QUERY = '(max-width: 767px), (hover: none), (pointer: coarse)';

export const GalaxyBackground: React.FC = () => {
  // Read once on mount so a resize never tears down and rebuilds the WebGL scene.
  const [isCompact] = useState(() => window.matchMedia(COMPACT_QUERY).matches);

  return (
    <Galaxy
      particleCount={isCompact ? 6000 : 14000}
      arms={4}
      radius={6.2}
      spin={1.4}
      randomness={0.52}
      power={3.6}
      insideColor="#F0F6FC"
      outsideColor="#3FB950"
      accentColor="#58A6FF"
      particleSize={26.0}
      speed={0.28}
      mouseRepulsion={!isCompact}
      repulsionRadius={2.4}
      repulsionStrength={1.3}
      twinkle={true}
      overlayOpacity={0.68}
    />
  );
};
