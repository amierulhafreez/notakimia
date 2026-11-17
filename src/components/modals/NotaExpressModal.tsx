import React, { useState } from 'react';
import {
  X,
  Zap,
  Printer,
  Copy,
  Check,
  BookOpen,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Flame,
  Table,
  Calculator,
  Compass,
  Atom,
  Cpu,
  History,
  Link as LinkIcon,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { getExpressNoteByChapterId, ExpressBranch } from '../../data/notaExpressData';

interface Props {
  chapterId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenFullChapter?: (chapterId: string) => void;
}

export const NotaExpressModal: React.FC<Props> = ({
  chapterId,
  isOpen,
  onClose,
  onOpenFullChapter,
}) => {
  const [viewMode, setViewMode] = useState<'mindmap' | 'cheatsheet'>('mindmap');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !chapterId) return null;

  const data = getExpressNoteByChapterId(chapterId);
  if (!data) return null;

  const isT4 = data.form === 'T4';

  const handleCopyText = () => {
    let text = `⚡ NOTA EXPRESS: ${data.form} BAB ${data.chapterNumber} - ${data.title.toUpperCase()}\n`;
    text += `Tema: ${data.theme}\n`;
    text += `Inti Pati Utama: ${data.centralConcept}\n`;
    text += `Hukum / Formula Emas: ${data.goldenFormulaOrRule}\n\n`;
    text += `--- CAWANGAN PETA MINDA ---\n`;

    data.branches.forEach((b, idx) => {
      text += `\n${idx + 1}. [${b.subtopicRef}] ${b.title}\n`;
      text += `   Ringkasan: ${b.summary}\n`;
      b.corePoints.forEach((p) => {
        const clean = p.replace(/<[^>]*>/g, '');
        text += `   • ${clean}\n`;
      });
      if (b.formulasOrEquations && b.formulasOrEquations.length > 0) {
        text += `   Formula/Persamaan: ${b.formulasOrEquations.join(' | ')}\n`;
      }
      if (b.mnemonic) {
        text += `   Tip Hafalan: ${b.mnemonic}\n`;
      }
    });

    text += `\n--- TIP EMAS SPM ---\n`;
    data.quickTips.forEach((t, i) => {
      text += `${i + 1}. ${t}\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Branch Icon Mapper
  const renderBranchIcon = (iconType: string) => {
    switch (iconType) {
      case 'flask':
        return <Sparkles className="w-4 h-4" />;
      case 'atom':
        return <Atom className="w-4 h-4" />;
      case 'table':
        return <Table className="w-4 h-4" />;
      case 'link':
        return <LinkIcon className="w-4 h-4" />;
      case 'flame':
        return <Flame className="w-4 h-4" />;
      case 'calculator':
        return <Calculator className="w-4 h-4" />;
      case 'shield':
        return <Shield className="w-4 h-4" />;
      case 'layers':
        return <Layers className="w-4 h-4" />;
      case 'cpu':
        return <Cpu className="w-4 h-4" />;
      case 'compass':
        return <Compass className="w-4 h-4" />;
      case 'history':
        return <History className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  // Color mapping helpers
  const getColorStyles = (color: string) => {
    switch (color) {
      case 'indigo':
        return {
          bg: 'bg-indigo-50/60 hover:bg-indigo-50/90',
          border: 'border-indigo-200/90 hover:border-indigo-400',
          badge: 'bg-indigo-100 text-indigo-800 border-indigo-200',
          title: 'text-indigo-900',
          dot: 'bg-indigo-500',
          wire: '#6366f1',
          accent: 'from-indigo-500 to-purple-600',
        };
      case 'emerald':
        return {
          bg: 'bg-emerald-50/60 hover:bg-emerald-50/90',
          border: 'border-emerald-200/90 hover:border-emerald-400',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          title: 'text-emerald-900',
          dot: 'bg-emerald-500',
          wire: '#10b981',
          accent: 'from-emerald-500 to-teal-600',
        };
      case 'amber':
        return {
          bg: 'bg-amber-50/60 hover:bg-amber-50/90',
          border: 'border-amber-200/90 hover:border-amber-400',
          badge: 'bg-amber-100 text-amber-800 border-amber-200',
          title: 'text-amber-900',
          dot: 'bg-amber-500',
          wire: '#f59e0b',
          accent: 'from-amber-500 to-orange-600',
        };
      case 'rose':
        return {
          bg: 'bg-rose-50/60 hover:bg-rose-50/90',
          border: 'border-rose-200/90 hover:border-rose-400',
          badge: 'bg-rose-100 text-rose-800 border-rose-200',
          title: 'text-rose-900',
          dot: 'bg-rose-500',
          wire: '#f43f5e',
          accent: 'from-rose-500 to-pink-600',
        };
      case 'purple':
        return {
          bg: 'bg-purple-50/60 hover:bg-purple-50/90',
          border: 'border-purple-200/90 hover:border-purple-400',
          badge: 'bg-purple-100 text-purple-800 border-purple-200',
          title: 'text-purple-900',
          dot: 'bg-purple-500',
          wire: '#a855f7',
          accent: 'from-purple-500 to-indigo-600',
        };
      case 'sky':
      default:
        return {
          bg: 'bg-sky-50/60 hover:bg-sky-50/90',
          border: 'border-sky-200/90 hover:border-sky-400',
          badge: 'bg-sky-100 text-sky-800 border-sky-200',
          title: 'text-sky-900',
          dot: 'bg-sky-500',
          wire: '#0ea5e9',
          accent: 'from-sky-500 to-blue-600',
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-6xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-5 sm:px-7 py-4 border-b border-slate-200/90 bg-white/95 backdrop-blur-md flex items-center justify-between gap-3 shrink-0">
          {/* Left Title & Badges */}
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md shrink-0 ${
              isT4
                ? 'bg-gradient-to-tr from-sky-500 to-blue-600 shadow-sky-500/25'
                : 'bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-indigo-500/25'
            }`}>
              <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
            </div>

            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                  isT4 ? 'bg-sky-100 text-sky-800' : 'bg-indigo-100 text-indigo-800'
                }`}>
                  {data.form} • Bab {data.chapterNumber}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 flex items-center gap-1 border border-amber-200">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>Nota Express 1 Halaman</span>
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight truncate mt-0.5">
                {data.title}
              </h2>
            </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Mode Switcher */}
            <div className="hidden sm:flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setViewMode('mindmap')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  viewMode === 'mindmap'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Peta Minda
              </button>
              <button
                onClick={() => setViewMode('cheatsheet')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  viewMode === 'cheatsheet'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Lembaran 1 Halaman
              </button>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopyText}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Salin Teks Nota Express"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="hidden md:inline text-emerald-700">Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span className="hidden md:inline">Salin</span>
                </>
              )}
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Cetak atau Simpan sebagai PDF"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span className="hidden md:inline">Cetak</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 transition-colors ml-1"
              title="Tutup (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-slate-50/60 space-y-6">
          {/* Top Golden Rule Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-amber-100/50 to-orange-50 border border-amber-300/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 sm:mt-0">
                <Lightbulb className="w-5 h-5 text-amber-100" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-800">
                  HUKUM & FORMULA KERAMAT BAB INI
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 leading-relaxed font-mono">
                  {data.goldenFormulaOrRule}
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right shrink-0 pl-12 sm:pl-0">
              <span className="text-[11px] font-medium text-amber-800/80 block">Inti Pati Pokok</span>
              <span className="text-xs font-bold text-slate-700">{data.theme}</span>
            </div>
          </div>

          {/* VIEW MODE 1: PETA MINDA INTERAKTIF (MIND MAP BENTO TREE) */}
          {viewMode === 'mindmap' && (
            <div className="space-y-6">
              {/* Central Nucleus Node */}
              <div className="max-w-2xl mx-auto text-center p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-900/10 shadow-lg relative">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold text-white mb-2 bg-gradient-to-r ${
                  isT4 ? 'from-sky-500 to-blue-600' : 'from-indigo-600 to-purple-600'
                }`}>
                  <Atom className="w-3.5 h-3.5 animate-spin duration-3000" />
                  <span>NUKLEUS PETA MINDA</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {data.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed max-w-xl mx-auto">
                  {data.centralConcept}
                </p>

                {/* Subtle radiating pulse dot */}
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                  ↓
                </span>
              </div>

              {/* Connecting Branches (Grid of Branch Nodes) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
                {data.branches.map((branch, idx) => {
                  const style = getColorStyles(branch.color);
                  return (
                    <div
                      key={branch.id}
                      className={`rounded-3xl p-5 border transition-all duration-300 hover:shadow-md flex flex-col justify-between ${style.bg} ${style.border} relative overflow-hidden`}
                    >
                      {/* Branch Top Header */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${style.badge}`}>
                            Subtopik {branch.subtopicRef}
                          </span>
                          <div className={`w-7 h-7 rounded-xl bg-white shadow-2xs flex items-center justify-center ${style.title}`}>
                            {renderBranchIcon(branch.iconType)}
                          </div>
                        </div>

                        <div>
                          <h4 className={`text-base font-extrabold leading-snug break-words text-pretty ${style.title}`}>
                            {idx + 1}. {branch.title}
                          </h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed break-words text-pretty">
                            {branch.summary}
                          </p>
                        </div>

                        {/* Core Points Bullets */}
                        <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                          {branch.corePoints.map((pt, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed break-words text-pretty">
                              <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${style.dot}`} />
                              <div
                                dangerouslySetInnerHTML={{ __html: pt }}
                                className="[&>b]:font-bold [&>b]:text-slate-900 break-words text-pretty"
                              />
                            </div>
                          ))}
                        </div>

                        {/* Formula or Reaction equation if available */}
                        {branch.formulasOrEquations && branch.formulasOrEquations.length > 0 && (
                          <div className="p-2.5 rounded-xl bg-white/90 border border-slate-200/90 text-xs font-mono space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider font-sans">
                              Persamaan / Formula
                            </span>
                            {branch.formulasOrEquations.map((eq, eIdx) => (
                              <div key={eIdx} className="font-semibold text-slate-800 text-[11px] truncate">
                                {eq}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Mnemonic Tip */}
                        {branch.mnemonic && (
                          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-300 text-[11px] text-amber-900 flex items-start gap-1.5 font-medium">
                            <span className="text-amber-600 font-bold shrink-0">💡 Mnemonic:</span>
                            <span>{branch.mnemonic}</span>
                          </div>
                        )}
                      </div>

                      {/* Key Terms Chips */}
                      {branch.keyTerms && branch.keyTerms.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-3 mt-3 border-t border-slate-200/50">
                          {branch.keyTerms.map((term, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-white/80 text-slate-600 border border-slate-200/80"
                            >
                              #{term}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW MODE 2: LEMBARAN 1 HALAMAN (ONE-PAGE CHEAT SHEET) */}
          {viewMode === 'cheatsheet' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    {data.form} Bab {data.chapterNumber}: {data.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Ringkasan Pantas Peperiksaan SPM • Disediakan oleh Cikgu Hafreez
                  </p>
                </div>
                <div className="text-xs font-mono font-bold text-sky-700 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200 self-start sm:self-auto">
                  {data.branches.length} Cawangan • Silibus Penuh KSSM
                </div>
              </div>

              {/* Multi-column Cheat Sheet Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.branches.map((branch, idx) => (
                  <div key={branch.id} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/40 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <span className="font-extrabold text-sm text-slate-900">
                        {idx + 1}. {branch.title}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                        {branch.subtopicRef}
                      </span>
                    </div>

                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {branch.corePoints.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5">
                          <span className="text-sky-600 font-bold shrink-0">•</span>
                          <div
                            dangerouslySetInnerHTML={{ __html: pt }}
                            className="[&>b]:font-bold [&>b]:text-slate-900"
                          />
                        </li>
                      ))}
                    </ul>

                    {branch.formulasOrEquations && branch.formulasOrEquations.length > 0 && (
                      <div className="p-2 rounded-lg bg-white border border-slate-200 text-[11px] font-mono text-slate-800 space-y-0.5">
                        {branch.formulasOrEquations.map((f, fIdx) => (
                          <div key={fIdx}>📌 {f}</div>
                        ))}
                      </div>
                    )}

                    {branch.mnemonic && (
                      <div className="text-[11px] text-amber-800 font-medium bg-amber-50 p-2 rounded-lg border border-amber-200">
                        ⭐ <b>Tip:</b> {branch.mnemonic}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Exam Quick Tips Footer in Cheatsheet */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-2">
                <span className="text-xs font-black uppercase text-indigo-900 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-indigo-600" />
                  KATA KUNCI SKEMA PEMARKAHAN SPM (PERINGATAN PEMERIKSA)
                </span>
                <ul className="space-y-1 text-xs text-slate-700">
                  {data.quickTips.map((tip, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Quick Tips Section (Always shown in Mind Map view) */}
          {viewMode === 'mindmap' && (
            <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                  PANDUAN & KATA KUNCI SKEMA SPM
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {data.quickTips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-emerald-50/40 border border-emerald-200/60 text-xs text-slate-700 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Navigation */}
        <div className="px-5 sm:px-7 py-3 bg-white border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Nota Express Padat 1 Halaman • Sesuai untuk Ulang Kaji Kilat Sebelum Masuk Dewan Peperiksaan</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onOpenFullChapter && (
              <button
                onClick={() => {
                  onClose();
                  onOpenFullChapter(data.chapterId);
                }}
                className={`w-full sm:w-auto px-4 py-2 rounded-2xl text-xs font-bold text-white shadow-md flex items-center justify-center gap-2 transition-all hover:scale-102 ${
                  isT4 ? 'bg-sky-600 hover:bg-sky-700' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Buka Nota Penuh & Kuiz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
