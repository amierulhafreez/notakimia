import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FlaskConical
} from 'lucide-react';
import { Chapter, UserStudyProgress } from '../types/nota';
import { FlashcardsWidget } from './FlashcardsWidget';
import { QuizWidget } from './QuizWidget';

interface Props {
  chapter: Chapter;
  activeSubtopicId: string;
  userProgress: UserStudyProgress;
  onSelectSubtopic: (subtopicId: string) => void;
  onToggleComplete: (subtopicId: string) => void;
  onRecordQuizScore: (subtopicId: string, score: number, total: number) => void;
  onOpenSimulation: (simulationId: string) => void;
}

export const InteractiveReader: React.FC<Props> = ({
  chapter,
  activeSubtopicId,
  userProgress,
  onSelectSubtopic,
  onToggleComplete,
  onRecordQuizScore,
  onOpenSimulation,
}) => {
  const [blurMode, setBlurMode] = useState(false);

  const activeSubtopic =
    chapter.subtopics.find((s) => s.id === activeSubtopicId) || chapter.subtopics[0];

  const currentIdx = chapter.subtopics.findIndex((s) => s.id === activeSubtopic.id);
  const prevSubtopic = currentIdx > 0 ? chapter.subtopics[currentIdx - 1] : null;
  const nextSubtopic = currentIdx < chapter.subtopics.length - 1 ? chapter.subtopics[currentIdx + 1] : null;

  const isCompleted = userProgress.completedSubtopics.includes(activeSubtopic.id);

  // Toggle reveal on click when in blur mode
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const blurElement = target.closest('.blur-target');
    if (blurElement) {
      blurElement.classList.toggle('revealed');
    }
  };

  const isT4 = chapter.form === 'T4';
  const themeAccentBg = isT4 ? 'bg-sky-50 text-sky-700 border-sky-200' : 'bg-indigo-50 text-indigo-700 border-indigo-200';
  const themeBtnBg = isT4
    ? 'bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400'
    : 'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400';

  return (
    <div className={`min-h-[calc(100vh-4rem)] max-w-7xl mx-auto px-3 sm:px-6 py-6 ${blurMode ? 'blur-active' : ''}`}>
      {/* 3-Column Grid on Desktop / iPad */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Subtopic Navigator (3 Cols) */}
        <aside className="lg:col-span-3 space-y-3 sticky top-20">
          <div className={`rounded-3xl p-4 shadow-sm transition-all ${
            isT4 ? 'liquid-glass-card-t4' : 'liquid-glass-card-t5'
          }`}>
            {/* Theme-Colored Liquid Glass Header Banner */}
            <div className={`p-3 rounded-2xl flex items-center justify-between shadow-xs mb-3 border ${
              isT4
                ? 'liquid-glass-pill-t4 text-sky-950'
                : 'liquid-glass-pill-t5 text-indigo-950'
            }`}>
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-lg text-white flex items-center justify-center shadow-xs ${
                  isT4 ? 'liquid-glass-btn-t4' : 'liquid-glass-btn-t5'
                }`}>
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-extrabold uppercase tracking-wider">
                  Subtopik {chapter.form} Bab {chapter.chapterNumber}
                </span>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-white/80 shadow-2xs">
                {chapter.subtopics.length} Topik
              </span>
            </div>

            <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
              {chapter.subtopics.map((sub) => {
                const isSelected = sub.id === activeSubtopic.id;
                const isDone = userProgress.completedSubtopics.includes(sub.id);

                return (
                  <button
                    key={sub.id}
                    onClick={() => onSelectSubtopic(sub.id)}
                    className={`w-full text-left p-2.5 rounded-2xl text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                      isSelected
                        ? isT4
                          ? 'liquid-glass-btn-t4 text-white font-bold shadow-md scale-101'
                          : 'liquid-glass-btn-t5 text-white font-bold shadow-md scale-101'
                        : 'text-slate-700 hover:bg-white/80 hover:shadow-2xs'
                    }`}
                  >
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded-lg shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200/80 text-slate-600'
                      }`}
                    >
                      {sub.code}
                    </span>

                    <span className="flex-1 truncate leading-relaxed">
                      {sub.title}
                    </span>

                    {isDone && (
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isSelected ? 'text-white' : 'text-emerald-500'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Center Column: Note Canvas (6 Cols) */}
        <main className="lg:col-span-6 space-y-6">
          {/* Quick Subtopic Horizontal Carousel Pills (Mobile & Tablet friendly) */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
            {chapter.subtopics.map((sub) => {
              const isSelected = sub.id === activeSubtopic.id;
              const isDone = userProgress.completedSubtopics.includes(sub.id);
              return (
                <button
                  key={sub.id}
                  onClick={() => onSelectSubtopic(sub.id)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold shrink-0 transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? isT4
                        ? 'liquid-glass-btn-t4 text-white shadow-md'
                        : 'liquid-glass-btn-t5 text-white shadow-md'
                      : isT4
                        ? 'liquid-glass-pill-t4 text-sky-900 hover:bg-sky-100/80'
                        : 'liquid-glass-pill-t5 text-indigo-950 hover:bg-indigo-100/80'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-80">{sub.code}</span>
                  <span className="max-w-[140px] truncate">{sub.title}</span>
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                </button>
              );
            })}
          </div>
          {/* Subtopic Header & Mod Hafalan (Blur Mode) Toggle - Soft Grey Aesthetic */}
          <div className="bg-gradient-to-br from-slate-100/95 via-slate-50/90 to-slate-100/80 backdrop-blur-md rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-xl bg-slate-200/90 border border-slate-300 text-slate-700 shadow-2xs">
                  {activeSubtopic.learningStandard}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {activeSubtopic.durationMinutes} minit
                </span>
              </div>

              {/* Blur Mode Active Recall Toggle */}
              <button
                onClick={() => setBlurMode(!blurMode)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-2xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                  blurMode
                    ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-300 shadow-md'
                    : 'bg-white hover:bg-slate-200/80 text-slate-700 border border-slate-300/80'
                }`}
                title="Aktifkan Mod Hafalan: perkataan penting akan dikaburkan untuk menguji ingatan aktif anda"
              >
                {blurMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span>{blurMode ? 'Mod Hafalan: AKTIF' : 'Mod Hafalan (Blur)'}</span>
              </button>
            </div>

            <div>
              <div className="text-xs font-mono font-semibold text-slate-500 mb-1">
                {chapter.form} Bab {chapter.chapterNumber} • Subtopik {activeSubtopic.code}
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {activeSubtopic.title}
              </h1>
            </div>

            {blurMode && (
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 text-[11px] text-amber-900 flex items-center gap-2 animate-in fade-in">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <b>Mod Hafalan Aktif:</b> Kata kunci penting telah dikaburkan. Klik mana-mana teks yang kabur untuk menyemak ingatan anda!
                </span>
              </div>
            )}
          </div>

          {/* TL;DR Executive Summary */}
          {activeSubtopic.tldr && activeSubtopic.tldr.length > 0 && (
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-300 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Ringkasan Eksekutif (TL;DR)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-200">
                {activeSubtopic.tldr.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-1.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Concept Cards */}
          <div className="space-y-5" onClick={handleContentClick}>
            {activeSubtopic.concepts.map((concept) => (
              <div
                key={concept.id}
                className="apple-glass-card rounded-3xl p-6 space-y-4 transition-all"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    {concept.title}
                  </h3>
                  {concept.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {concept.badge}
                    </span>
                  )}
                </div>

                {/* Concept HTML Content (Supports Bold Keywords & Blur Targets) */}
                <div
                  className="text-xs text-slate-700 leading-relaxed space-y-2 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: concept.content }}
                />

                {/* Comparison Table if Present */}
                {concept.comparisonTable && (
                  <div className="overflow-x-auto rounded-2xl border border-slate-200/80 shadow-xs my-3">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
                        <tr>
                          {concept.comparisonTable.headers.map((h, hIdx) => (
                            <th key={hIdx} className="py-2.5 px-3">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {concept.comparisonTable.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50">
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className="py-2.5 px-3 text-slate-700 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: cell }}
                              />
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Equations if Present */}
                {concept.equations && concept.equations.length > 0 && (
                  <div className="space-y-2 my-2">
                    {concept.equations.map((eq, eIdx) => (
                      <div
                        key={eIdx}
                        className="p-3.5 bg-slate-900 text-sky-300 rounded-2xl font-mono text-xs space-y-1 shadow-inner"
                      >
                        <div className="font-bold text-sm text-sky-200">{eq.equation}</div>
                        {eq.qualitative && (
                          <div className="text-[11px] text-slate-300 font-sans">
                            <b>Tafsiran Kualitatif:</b> {eq.qualitative}
                          </div>
                        )}
                        {eq.quantitative && (
                          <div className="text-[11px] text-slate-400 font-sans">
                            <b>Tafsiran Kuantitatif:</b> {eq.quantitative}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Kotak "Awas Kesilapan Lazim SPM" (Soft Coral Red) */}
          {activeSubtopic.commonMistakes && activeSubtopic.commonMistakes.length > 0 && (
            <div className="rounded-3xl p-6 bg-red-50/90 border border-red-200/90 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                <div className="p-1.5 rounded-xl bg-rose-200/80 text-rose-800">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <span>Awas: Kesilapan Lazim Calon SPM</span>
              </div>

              <div className="space-y-3">
                {activeSubtopic.commonMistakes.map((m, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-3.5 rounded-2xl bg-white/90 border border-red-100 text-xs space-y-1.5 shadow-xs"
                  >
                    <div className="flex items-start gap-2 text-rose-700 font-semibold">
                      <span className="text-rose-500 font-bold">❌ Salah:</span>
                      <span>"{m.mistake}"</span>
                    </div>
                    <div className="flex items-start gap-2 text-emerald-800 font-semibold">
                      <span className="text-emerald-600 font-bold">✅ Betul:</span>
                      <span>"{m.correction}"</span>
                    </div>
                    <div className="text-[11px] text-slate-500 pl-6 leading-relaxed">
                      <b>Mengapa:</b> {m.why}
                    </div>
                    {m.spmTip && (
                      <div className="text-[10px] text-amber-800 bg-amber-50 p-2 rounded-xl mt-1 font-medium">
                        💡 <b>Tip Pemeriksa SPM:</b> {m.spmTip}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completion Button & Navigation */}
          <div className="apple-glass-card rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => onToggleComplete(activeSubtopic.id)}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                isCompleted
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Subtopik Selesai Ulang Kaji' : 'Tandakan Subtopik Selesai'}</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {prevSubtopic && (
                <button
                  onClick={() => onSelectSubtopic(prevSubtopic.id)}
                  className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelum</span>
                </button>
              )}
              {nextSubtopic && (
                <button
                  onClick={() => onSelectSubtopic(nextSubtopic.id)}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1 transition-all shadow-sm ${themeBtnBg}`}
                >
                  <span>Seterusnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </main>

        {/* Right Column: Ecosystem & Self-Assessment (3 Cols) */}
        <aside className="lg:col-span-3 space-y-5 sticky top-20">
          {/* Ecosystem Integration Card: "Uji dalam Simulasi" (Direct Simulation Deep-Link) */}
          {activeSubtopic.simulationRef && (
            <div className="apple-glass-card rounded-3xl p-5 border border-sky-300/80 bg-gradient-to-br from-sky-50 via-white to-indigo-50/40 space-y-3.5 shadow-md shadow-sky-500/10 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
                  {activeSubtopic.simulationRef.previewBadge}
                </span>
                <span className="text-[10px] text-sky-700 font-mono font-bold">
                  simulasikimia
                </span>
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-slate-900 leading-snug group-hover:text-sky-700 transition-colors">
                  {activeSubtopic.simulationRef.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {activeSubtopic.simulationRef.description}
                </p>
              </div>

              <button
                onClick={() => onOpenSimulation(activeSubtopic.simulationRef!.id)}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FlaskConical className="w-4 h-4" />
                <span>Buka Pop-Up Makmal Maya</span>
              </button>
            </div>
          )}

          {/* Interactive Flashcards Widget */}
          <FlashcardsWidget flashcards={activeSubtopic.flashcards} />

          {/* SPM Flash Quiz Widget */}
          <QuizWidget
            subtopicId={activeSubtopic.id}
            quiz={activeSubtopic.quiz}
            onQuizComplete={(score, total) => onRecordQuizScore(activeSubtopic.id, score, total)}
          />
        </aside>
      </div>
    </div>
  );
};
