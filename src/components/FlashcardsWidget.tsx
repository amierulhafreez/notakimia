import React, { useState } from 'react';
import { RotateCw, ChevronLeft, ChevronRight, Layers, Sparkles } from 'lucide-react';
import { Flashcard } from '../types/nota';

interface Props {
  flashcards: Flashcard[];
}

export const FlashcardsWidget: React.FC<Props> = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!flashcards || flashcards.length === 0) return null;

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 150);
  };

  return (
    <div className="bg-gradient-to-br from-violet-50/70 via-purple-50/30 to-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-violet-200/80 shadow-sm space-y-4 overflow-hidden">
      {/* Soft Violet Header Banner */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-violet-100/90 to-purple-100/80 border border-violet-200/90 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-xs">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold text-violet-950 uppercase tracking-wider">
              Kad Imbas Interaktif
            </h3>
            <span className="text-[10px] font-medium text-violet-700/80">
              Kad {currentIndex + 1} daripada {flashcards.length}
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="px-2.5 py-1.5 rounded-xl bg-white/90 hover:bg-white text-violet-800 text-[11px] font-bold flex items-center gap-1.5 transition-all shadow-2xs border border-violet-200/70 cursor-pointer hover:scale-102"
          title="Pusingkan kad"
        >
          <RotateCw className="w-3 h-3 text-violet-600" />
          <span>Pusing</span>
        </button>
      </div>

      {/* Interactive Card Canvas */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative min-h-[185px] rounded-2xl cursor-pointer perspective-1000 transition-all select-none group"
      >
        <div
          className={`w-full h-full min-h-[185px] p-4 sm:p-5 rounded-2xl transition-all duration-300 flex flex-col justify-between border ${
            isFlipped
              ? 'bg-gradient-to-br from-violet-950 via-indigo-950 to-slate-900 text-white border-violet-600/80 shadow-md shadow-violet-950/20'
              : 'bg-white/95 text-slate-900 border-violet-200/80 group-hover:border-violet-300 shadow-xs'
          }`}
        >
          {/* Card Tag - Fixed Pill Layout (Never Wraps) */}
          <div className="flex items-center justify-between gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shrink-0 shadow-2xs ${
                isFlipped
                  ? 'bg-violet-500/30 text-violet-200 border border-violet-400/40'
                  : 'bg-violet-100 text-violet-800 border border-violet-200/70'
              }`}
            >
              {isFlipped ? 'Jawapan' : 'Soalan'}
            </span>

            <span
              className={`text-[10px] font-medium flex items-center gap-1 shrink-0 ${
                isFlipped ? 'text-violet-300' : 'text-slate-400'
              }`}
            >
              <RotateCw className="w-2.5 h-2.5 opacity-70" />
              <span>{isFlipped ? 'Lihat soalan' : 'Semak jawapan'}</span>
            </span>
          </div>

          {/* Card Body */}
          <div className="py-3 my-auto text-center px-1">
            {isFlipped ? (
              <p className="text-xs sm:text-sm font-semibold text-violet-50 leading-relaxed animate-in fade-in duration-200">
                {currentCard.back}
              </p>
            ) : (
              <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed animate-in fade-in duration-200">
                {currentCard.front}
              </p>
            )}
          </div>

          {/* Hint Footer */}
          <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-violet-400 shrink-0" />
            <span className="truncate">Aktifkan ingatan visual SPM</span>
          </div>
        </div>
      </div>

      {/* Pagination Controls - Fits Compact Sidebar Without Overflow */}
      <div className="flex items-center justify-between pt-1 gap-1.5">
        <button
          onClick={handlePrev}
          disabled={flashcards.length <= 1}
          className="p-1.5 rounded-xl bg-violet-100/80 hover:bg-violet-200 text-violet-800 disabled:opacity-30 transition-all flex items-center gap-1 text-[11px] font-bold cursor-pointer shrink-0"
          title="Kad Sebelumnya"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden xl:inline">Sebelum</span>
        </button>

        {/* Dots Indicator */}
        <div className="flex gap-1.5 items-center justify-center shrink-0">
          {flashcards.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsFlipped(false);
                setCurrentIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentIndex === i ? 'w-5 bg-violet-600' : 'w-1.5 bg-violet-200 hover:bg-violet-300'
              }`}
              title={`Kad ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={flashcards.length <= 1}
          className="p-1.5 rounded-xl bg-violet-100/80 hover:bg-violet-200 text-violet-800 disabled:opacity-30 transition-all flex items-center gap-1 text-[11px] font-bold cursor-pointer shrink-0"
          title="Kad Seterusnya"
        >
          <span className="hidden xl:inline">Seterus</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
