import React from 'react';
import { Galaxy } from './Galaxy';

export const GalaxyBackground: React.FC = () => {
  return (
    <Galaxy
      particleCount={14000}
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
      mouseRepulsion={true}
      repulsionRadius={2.4}
      repulsionStrength={1.3}
      twinkle={true}
      overlayOpacity={0.68}
    />
  );
};
