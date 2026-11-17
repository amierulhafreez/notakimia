import React from 'react';
import { SimulationItem } from '../types/simulation';
import { ChevronRight } from 'lucide-react';
import { Simulation3DGraphic } from './Simulation3DGraphic';
import { preloadSimulation } from './SimulationModal';

interface Props {
  simulation: SimulationItem;
  views: number;
  completed: number;
  onSelect: (sim: SimulationItem) => void;
  cardIndex?: number;
}

interface PastelTheme {
  gradientTop: string;
  gradientBottom: string;
  pedestalColor: string;
}

const APPLE_PASTEL_THEMES: PastelTheme[] = [
  // Sky Blue (Apple Watch Series 12 style)
  {
    gradientTop: '#d7ecff',
    gradientBottom: '#bedcf7',
    pedestalColor: '#2472a4',
  },
  // Soft Lavender (MacBook Pro style)
  {
    gradientTop: '#e3dbfb',
    gradientBottom: '#cbbcf3',
    pedestalColor: '#816ac6',
  },
  // Butter Yellow (iPad mini style)
  {
    gradientTop: '#fef2b9',
    gradientBottom: '#fbe390',
    pedestalColor: '#f1be2c',
  },
  // Soft Rose Pink
  {
    gradientTop: '#fddce7',
    gradientBottom: '#f7bfd3',
    pedestalColor: '#cf6485',
  },
  // Soft Mint
  {
    gradientTop: '#d8f6e7',
    gradientBottom: '#b6ebd1',
    pedestalColor: '#379871',
  },
];

function getThemeFromColorName(colorTheme: string): PastelTheme {
  switch (colorTheme) {
    case 'purple':
    case 'indigo':
      return APPLE_PASTEL_THEMES[1];
    case 'amber':
    case 'orange':
      return APPLE_PASTEL_THEMES[2];
    case 'rose':
    case 'pink':
    case 'red':
      return APPLE_PASTEL_THEMES[3];
    case 'emerald':
      return APPLE_PASTEL_THEMES[4];
    case 'cyan':
    case 'blue':
    case 'sky':
    default:
      return APPLE_PASTEL_THEMES[0];
  }
}

export const SimulationCard: React.FC<Props> = ({
  simulation,
  views,
  completed,
  onSelect,
  cardIndex,
}) => {
  const isReady = simulation.isImplemented;
  const theme =
    typeof cardIndex === 'number'
      ? APPLE_PASTEL_THEMES[cardIndex % APPLE_PASTEL_THEMES.length]
      : getThemeFromColorName(simulation.colorTheme);

  const babShort = simulation.chapter.split(':')[0] || simulation.chapter;

  return (
    <div
      data-testid={`sim-card-${simulation.id}`}
      data-form={simulation.form}
      onClick={() => onSelect(simulation)}
      onMouseEnter={() => preloadSimulation(simulation.id)}
      onTouchStart={() => preloadSimulation(simulation.id)}
      style={{
        background: `linear-gradient(180deg, ${theme.gradientTop} 0%, ${theme.gradientBottom} 100%)`,
      }}
      className="group relative h-[340px] sm:h-[350px] rounded-[22px] overflow-hidden flex flex-col justify-between cursor-pointer shadow-[0_6px_22px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-1.5 active:scale-[0.985] border border-black/[0.04]"
    >
      {/* Top-Left High-Contrast Dark Typography */}
      <div className="relative z-10 p-6 pb-2 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#1d1d1f]/70">
            {isReady ? `INTERAKTIF · ${babShort}` : `AKAN DATANG · ${babShort}`}
          </span>
        </div>

        <h3 className="font-display font-bold text-[19px] sm:text-[20px] leading-[1.18] tracking-tight text-[#1d1d1f] line-clamp-3">
          {simulation.title}
        </h3>

        <p className="text-[12.5px] font-medium text-[#1d1d1f]/75 pt-0.5">
          {isReady
            ? `${views} dilihat · ${completed} selesai`
            : `Bakal tiba · ${simulation.form}`}
        </p>
      </div>

      {/* Bottom Pedestal Horizon + Studio Chemistry Illustration */}
      <div className="relative flex-1 flex items-end justify-center pt-1">
        {/* Darker two-tone horizon band per Apple Store design */}
        <div
          aria-hidden="true"
          style={{ backgroundColor: theme.pedestalColor }}
          className="absolute inset-x-0 bottom-0 h-[56%] opacity-90 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Chemistry 3D Motion Graphic Centerpiece */}
        <div className="relative z-10 w-[210px] h-[152px] mb-2 transform transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-1">
          <Simulation3DGraphic simulationId={simulation.id} />
        </div>
      </div>

      {/* Floating Liquid Glass Circular CTA Button (Bottom-Right) */}
      <button
        type="button"
        aria-label={isReady ? `Buka ${simulation.title}` : `Info ${simulation.title}`}
        className="liquid-glass-btn absolute bottom-4 right-4 z-20 w-9 h-9 rounded-full text-[#1d1d1f] flex items-center justify-center group-hover:scale-110"
      >
        <ChevronRight className="w-4.5 h-4.5 stroke-[2.5] translate-x-[0.5px]" />
      </button>
    </div>
  );
};
