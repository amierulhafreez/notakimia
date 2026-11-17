import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SimulationAnalytics, SimulationItem } from '../types/simulation';
import { SimulationCard } from './SimulationCard';

interface TopicCarouselRowProps {
  groupKey: string;
  babCode: string;
  title: string;
  items: SimulationItem[];
  accentTheme: 'blue' | 'emerald';
  analyticsData: SimulationAnalytics;
  onSelectSimulation: (sim: SimulationItem) => void;
}

export const TopicCarouselRow: React.FC<TopicCarouselRowProps> = ({
  groupKey,
  babCode,
  title,
  items,
  accentTheme,
  analyticsData,
  onSelectSimulation,
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const syncScrollButtons = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    syncScrollButtons();
    const el = trackRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(syncScrollButtons);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items.length]);

  const handleSlide = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const step = 344; // 324px card + 20px gap
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <div data-testid={`topic-group-${groupKey}`} className="space-y-4">
      {/* Topic Header + Slide Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-2.5 min-w-0">
          <span
            className={`text-xs font-bold uppercase tracking-wider shrink-0 ${
              accentTheme === 'blue' ? 'text-[#0071e3]' : 'text-[#059669]'
            }`}
          >
            {babCode}
          </span>
          <h3 className="font-display font-semibold text-lg sm:text-xl text-[#1d1d1f] truncate">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-medium text-[#86868b] whitespace-nowrap mr-1">
            {items.length} simulasi
          </span>

          {(canScrollLeft || canScrollRight) && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label={`Skrol ke kiri ${babCode}`}
                data-testid={`slide-prev-${groupKey}`}
                onClick={() => handleSlide(-1)}
                disabled={!canScrollLeft}
                className="liquid-glass-btn w-8 h-8 rounded-full text-[#1d1d1f] flex items-center justify-center disabled:opacity-30 cursor-pointer disabled:cursor-default"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label={`Skrol ke kanan ${babCode}`}
                data-testid={`slide-next-${groupKey}`}
                onClick={() => handleSlide(1)}
                disabled={!canScrollRight}
                className="liquid-glass-btn w-8 h-8 rounded-full text-[#1d1d1f] flex items-center justify-center disabled:opacity-30 cursor-pointer disabled:cursor-default"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Horizontal Slideable Shelf */}
      <div
        ref={trackRef}
        onScroll={syncScrollButtons}
        data-testid={`carousel-track-${groupKey}`}
        className="flex items-stretch gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1 px-1 -mx-1 no-scrollbar"
      >
        {items.map((sim, idx) => (
          <div
            key={sim.id}
            className="w-[272px] sm:w-[294px] shrink-0 snap-start"
          >
            <SimulationCard
              simulation={sim}
              views={analyticsData.simulations[sim.id]?.views || 0}
              completed={analyticsData.simulations[sim.id]?.completed || 0}
              onSelect={onSelectSimulation}
              cardIndex={idx}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
