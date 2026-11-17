import React from 'react';
import { Clock, CheckCircle2, ChevronRight, Sparkles, Layers, ArrowUpRight, Zap, Lock } from 'lucide-react';
import { ChapterMeta } from '../types/nota';

interface Props {
  meta: ChapterMeta;
  completedSubtopicsCount: number;
  onOpenChapter: (chapterId: string) => void;
  onOpenExpressNote?: (chapterId: string) => void;
  isCarouselItem?: boolean;
  isLocked?: boolean;
  onOpenAccessModal?: (meta: ChapterMeta) => void;
}

export const ChapterBentoCard: React.FC<Props> = ({
  meta,
  completedSubtopicsCount,
  onOpenChapter,
  onOpenExpressNote,
  isCarouselItem = false,
  isLocked = false,
  onOpenAccessModal,
}) => {
  const isT4 = meta.form === 'T4';
  const totalSubtopics = meta.subtopicCount;
  const progressPercent = totalSubtopics > 0 ? Math.round((completedSubtopicsCount / totalSubtopics) * 100) : 0;
  const isCompleted = progressPercent === 100;
  const isInProgress = progressPercent > 0 && progressPercent < 100;

  // Liquid Glass theme styling
  const cardThemeClass = isLocked
    ? 'bg-slate-50/80 border-slate-300/80 hover:border-amber-400/80 hover:shadow-amber-500/10'
    : isT4
    ? 'liquid-glass-card-t4 hover:border-sky-400 hover:shadow-sky-500/20'
    : 'liquid-glass-card-t5 hover:border-indigo-400 hover:shadow-indigo-500/20';

  const badgeThemeClass = isLocked
    ? 'liquid-glass-pill text-amber-950 font-extrabold border-amber-300'
    : isT4
    ? 'liquid-glass-pill-sky text-white font-black'
    : 'liquid-glass-pill-indigo text-white font-black';

  const progressBg = isT4 
    ? 'bg-gradient-to-r from-sky-400 to-sky-600 shadow-[0_0_10px_rgba(2,132,199,0.5)]' 
    : 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]';

  const btnThemeClass = isLocked
    ? 'liquid-glass-pill-amber text-white'
    : isT4
    ? 'liquid-glass-pill-sky text-white'
    : 'liquid-glass-pill-indigo text-white';

  const handleCardClick = () => {
    if (isLocked) {
      if (onOpenAccessModal) onOpenAccessModal(meta);
    } else {
      onOpenChapter(meta.id);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer group hover:-translate-y-1.5 relative overflow-hidden select-none ${cardThemeClass} ${
        isCarouselItem ? 'w-[320px] sm:w-[360px] shrink-0 min-h-[445px] h-[445px]' : 'h-full min-h-[430px]'
      }`}
    >
      {/* Decorative ambient glass refraction bubbles */}
      <div 
        className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl pointer-events-none transition-all duration-500 group-hover:scale-125 ${
          isLocked
            ? 'bg-amber-400/15 group-hover:bg-amber-400/25'
            : isT4
            ? 'bg-sky-400/20 group-hover:bg-sky-400/30'
            : 'bg-indigo-500/20 group-hover:bg-indigo-500/30'
        }`} 
      />

      <div className="space-y-4 relative z-10">
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className={`text-[11px] px-3 py-1 rounded-full flex items-center gap-1.5 transition-transform group-hover:scale-105 ${badgeThemeClass}`}>
              <span className={`w-2 h-2 rounded-full ${isLocked ? 'bg-amber-500' : isT4 ? 'bg-sky-200 animate-pulse' : 'bg-indigo-200 animate-pulse'}`} />
              <span>{meta.form} • Bab {meta.chapterNumber}</span>
            </span>

            {isLocked ? (
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full liquid-glass-pill-amber flex items-center gap-1 shadow-2xs">
                <Lock className="w-3 h-3 text-amber-100" />
                <span>Kod Khas</span>
              </span>
            ) : meta.hasFullContent ? (
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full liquid-glass-pill-emerald text-white flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-3 h-3 text-emerald-100" />
                <span>Nota Lengkap</span>
              </span>
            ) : (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                Silibus DSKP
              </span>
            )}
          </div>

          {/* Status Icon */}
          {isLocked ? (
            <span className="flex items-center gap-1 text-[11px] font-extrabold text-amber-900 liquid-glass-pill px-2.5 py-1 rounded-full shadow-2xs">
              <Lock className="w-3 h-3 text-amber-700" />
              <span>Terkunci</span>
            </span>
          ) : isCompleted ? (
            <span className="flex items-center gap-1 text-[11px] font-bold text-white liquid-glass-pill-emerald px-3 py-1 rounded-full shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              Selesai
            </span>
          ) : isInProgress ? (
            <span className="text-[11px] font-bold text-amber-800 liquid-glass-pill px-3 py-1 rounded-full shadow-2xs">
              Sedang Baca
            </span>
          ) : (
            <span className="text-[11px] font-medium text-slate-500 liquid-glass-pill px-2.5 py-1 rounded-full shadow-2xs">
              Belum Mula
            </span>
          )}
        </div>

        {/* Chapter Title */}
        <div className="pt-1">
          <h3 className={`text-xl font-extrabold leading-snug transition-colors ${
            isLocked
              ? 'text-slate-800 group-hover:text-amber-800'
              : isT4
              ? 'text-slate-900 group-hover:text-sky-700'
              : 'text-slate-900 group-hover:text-indigo-700'
          }`}>
            {meta.title}
          </h3>
          <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
            {meta.description}
          </p>
        </div>
      </div>

      {/* Footer & Progress Bar */}
      <div className="space-y-4 pt-4 border-t border-slate-200/60 mt-4 relative z-10">
        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>Kemajuan Ulang Kaji</span>
            <span className="font-bold text-slate-800">{isLocked ? 'Akses VIP' : `${progressPercent}%`}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200/80 overflow-hidden p-0.5 shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-700 ${progressBg}`}
              style={{ width: `${isLocked ? 0 : Math.max(4, progressPercent)}%` }}
            />
          </div>
        </div>

        {/* Meta Details Row */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium whitespace-nowrap pt-1">
          <div className="flex items-center gap-2 text-slate-700 font-semibold whitespace-nowrap">
            <span className="flex items-center gap-1">
              <Layers className={`w-3.5 h-3.5 ${isLocked ? 'text-amber-600' : isT4 ? 'text-sky-600' : 'text-indigo-600'}`} />
              <span>{meta.subtopicCount} Subtopik</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1 text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{meta.durationMinutes} m</span>
            </span>
          </div>

          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
            DSKP SPM
          </span>
        </div>

        {/* Dual Ergonomic Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          {onOpenExpressNote && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (isLocked) {
                  if (onOpenAccessModal) onOpenAccessModal(meta);
                } else {
                  onOpenExpressNote(meta.id);
                }
              }}
              className="w-full py-2 px-2.5 rounded-full liquid-glass-pill hover:border-amber-300 text-amber-950 text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap select-none"
              title="Buka Nota Express (Peta Minda 1 Halaman)"
            >
              <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500 shrink-0" />
              <span className="truncate">Nota Express</span>
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className={`w-full py-2 px-2.5 rounded-full text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap select-none ${btnThemeClass} ${
              !onOpenExpressNote ? 'col-span-2' : ''
            }`}
            title={isLocked ? "Tebus Kod Akses Khas untuk Buka Bab" : "Buka Nota Lengkap Bab Ini"}
          >
            {isLocked ? (
              <>
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>Buka Kunci</span>
              </>
            ) : (
              <>
                <span>Buka Bab</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
