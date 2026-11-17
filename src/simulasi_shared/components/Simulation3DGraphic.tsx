import React from 'react';
import { Form4Graphics } from './graphics3d/Form4Graphics';
import { Form5GraphicsA } from './graphics3d/Form5GraphicsA';
import { Form5GraphicsB } from './graphics3d/Form5GraphicsB';
import { Shared3DDefs } from './graphics3d/Shared3DDefs';

interface Simulation3DGraphicProps {
  simulationId: string;
}

const GRAPHICS_REGISTRY: Record<string, React.FC<{ uid: string }>> = {
  ...Form4Graphics,
  ...Form5GraphicsA,
  ...Form5GraphicsB,
};

/**
 * Renders a unique, lightweight 3D-styled motion graphic mapped 1-to-1
 * to each of the 45 simulation entries. Uses GPU-accelerated CSS keyframes
 * and scoped SVG 3D radial/linear shading for 60fps performance.
 */
export const Simulation3DGraphic: React.FC<Simulation3DGraphicProps> = ({ simulationId }) => {
  const GraphicComponent = GRAPHICS_REGISTRY[simulationId];
  const uid = `sim3d-${simulationId}`;

  if (!GraphicComponent) {
    return (
      <div className="sim3d-stage w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
          <Shared3DDefs uid={uid} />
          <ellipse cx="110" cy="140" rx="56" ry="7" fill={`url(#${uid}-floor)`} />
          <g className="sim3d-float">
            <circle cx="110" cy="78" r="30" fill={`url(#${uid}-sph-blue)`} />
            <circle cx="80" cy="60" r="12" fill={`url(#${uid}-sph-amber)`} />
            <circle cx="140" cy="96" r="12" fill={`url(#${uid}-sph-emerald)`} />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div className="sim3d-stage w-full h-full flex items-center justify-center drop-shadow-[0_14px_22px_rgba(15,23,42,0.22)]">
      <GraphicComponent uid={uid} />
    </div>
  );
};
