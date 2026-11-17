import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Compass } from 'lucide-react';
import { ChapterMeta } from '../types/nota';
import { ChapterBentoCard } from './ChapterBentoCard';

interface Props {
  chapters: ChapterMeta[];
  completedSubtopics: string[];
  onOpenChapter: (chapterId: string) => void;
  onOpenExpressNote?: (chapterId: string) => void;
  form: 'T4' | 'T5';
  isChapterLocked?: (chapterId: string) => boolean;
  onOpenAccessModal?: (meta: ChapterMeta) => void;
}

export const ChapterCarousel: React.FC<Props> = ({
  chapters,
  completedSubtopics,
  onOpenChapter,
  onOpenExpressNote,
  form,
  isChapterLocked,
  onOpenAccessModal,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const isT4 = form === 'T4';

  const checkScroll = () => {
    if (rafId.current !== null) return;
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

        // Estimate active item index
        const itemWidth = 380;
        const index = Math.min(
          chapters.length - 1,
          Math.max(0, Math.round(scrollLeft / itemWidth))
        );
        setActiveIndex(index);
      }
    });
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', checkScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [chapters]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const itemWidth = 380;
      scrollRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth',
      });
      setActiveIndex(index);
    }
  };

  return (
    <div className="space-y-4">
      {/* Carousel Sub-header with Navigation Controls */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Compass className={`w-4 h-4 ${isT4 ? 'text-sky-600' : 'text-indigo-600'}`} />
            <span>Koleksi Bab • {chapters.length} Bab</span>
          </span>
          <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
            Leret atau gunakan butang kawalan untuk navigasi pantas
          </span>
        </div>

        {/* Carousel Arrow Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              canScrollLeft
                ? 'liquid-glass-pill text-slate-700'
                : 'bg-slate-100 text-slate-300 cursor-not-allowed opacity-40'
            }`}
            title="Bab Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              canScrollRight
                ? isT4
                  ? 'liquid-glass-pill-sky text-white'
                  : 'liquid-glass-pill-indigo text-white'
                : 'bg-slate-100 text-slate-300 cursor-not-allowed opacity-40'
            }`}
            title="Bab Seterusnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track with Native Momentum Scrolling */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-5 sm:gap-6 overflow-x-auto py-3 px-1 no-scrollbar scroll-smooth snap-x snap-mandatory overscroll-x-contain"
        style={{
          WebkitOverflowScrolling: 'touch',
          willChange: 'scroll-position',
          transform: 'translateZ(0)',
        }}
      >
        {chapters.map((meta) => {
          const completedCount = completedSubtopics.filter((id) =>
            id.startsWith(`${meta.id}-`)
          ).length;
          const isLocked = isChapterLocked ? isChapterLocked(meta.id) : false;

          return (
            <div key={meta.id} className="snap-start shrink-0">
              <ChapterBentoCard
                meta={meta}
                completedSubtopicsCount={completedCount}
                onOpenChapter={onOpenChapter}
                onOpenExpressNote={onOpenExpressNote}
                isCarouselItem={true}
                isLocked={isLocked}
                onOpenAccessModal={onOpenAccessModal}
              />
            </div>
          );
        })}
      </div>

      {/* Interactive Carousel Pagination Indicators */}
      <div className="flex items-center justify-center gap-2 pt-1">
        {chapters.map((ch, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <button
              key={ch.id}
              onClick={() => scrollToCard(idx)}
              className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                isCurrent
                  ? isT4
                    ? 'w-8 bg-sky-500 shadow-sm shadow-sky-500/50'
                    : 'w-8 bg-indigo-600 shadow-sm shadow-indigo-600/50'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              title={`Pergi ke Bab ${ch.chapterNumber}: ${ch.title}`}
            />
          );
        })}
      </div>
    </div>
  );
};
