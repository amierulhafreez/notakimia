import React, { useState } from 'react';
import { X, Search, BookmarkCheck, Calculator, BookOpen } from 'lucide-react';
import { IMPORTANT_FORMULAE, FormulaItem } from '../../data/quickReferences';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// Helper to format chemistry and math subscripts/superscripts (e.g. N_A -> N_A with real sub)
const formatSubscripts = (text: string): React.ReactNode => {
  if (!text) return null;

  // Split on patterns like E°_sel, N_A, V_m, M_a, V_a, M_b, V_b, V_maks, M_1, V_1, etc.
  const parts = text.split(/([A-Za-z0-9°Δθ]+_[A-Za-z0-9]+)/g);
  return parts.map((part, idx) => {
    if (part.includes('_')) {
      const [base, sub] = part.split('_');
      return (
        <span key={idx}>
          {base}
          <sub className="text-[0.75em] bottom-[-0.2em] font-medium">{sub}</sub>
        </span>
      );
    }
    return <span key={idx}>{part}</span>;
  });
};

export const FormulaModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredGroups = IMPORTANT_FORMULAE.map((grp) => ({
    ...grp,
    formulas: grp.formulas.filter((f) => {
      const q = search.toLowerCase();
      return (
        f.name.toLowerCase().includes(q) ||
        f.formulaSearch.toLowerCase().includes(q) ||
        f.syllabus.toLowerCase().includes(q) ||
        f.variables.some((v) => v.toLowerCase().includes(q))
      );
    }),
  })).filter((grp) => grp.formulas.length > 0);

  // Render textbook formula based on type
  const renderFormulaVisual = (item: FormulaItem) => {
    switch (item.renderType) {
      case 'titration':
        return (
          <div className="flex flex-col items-center justify-center gap-2 py-1">
            <div className="flex items-center justify-center gap-3">
              {/* Left Fraction: MaVa / MbVb */}
              <div className="inline-flex flex-col items-center justify-center">
                <span className="text-base sm:text-lg font-bold text-slate-900 px-2 leading-tight">
                  M<sub>a</sub>V<sub>a</sub>
                </span>
                <span className="w-full h-[2px] bg-slate-800 rounded-full my-0.5"></span>
                <span className="text-base sm:text-lg font-bold text-slate-900 px-2 leading-tight">
                  M<sub>b</sub>V<sub>b</sub>
                </span>
              </div>

              <span className="text-xl font-black text-slate-800">=</span>

              {/* Right Fraction: a / b */}
              <div className="inline-flex flex-col items-center justify-center">
                <span className="text-base sm:text-lg font-bold text-slate-900 px-3 leading-tight">a</span>
                <span className="w-full h-[2px] bg-slate-800 rounded-full my-0.5"></span>
                <span className="text-base sm:text-lg font-bold text-slate-900 px-3 leading-tight">b</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-600 text-center mt-1">
              <span className="font-bold text-amber-900">a : b</span> = nisbah pekali stoikiometri daripada persamaan kimia seimbang
            </div>
          </div>
        );

      case 'linear':
        return (
          <div className="flex flex-col items-center justify-center py-2 gap-1.5">
            <div className="text-xl sm:text-2xl font-black tracking-wide text-slate-900">
              {formatSubscripts(item.linearEquation || '')}
            </div>
            {item.subText && (
              <div className="text-xs text-amber-900 font-semibold bg-amber-100/70 px-3 py-0.5 rounded-full">
                {item.subText}
              </div>
            )}
          </div>
        );

      case 'heat':
        return (
          <div className="flex flex-col items-center justify-center py-2 gap-1.5">
            <div className="text-xl sm:text-2xl font-black text-slate-900">
              Q = m × c × θ
            </div>
            <div className="text-xs text-slate-600 font-medium">
              Unit: Joule (J) • (Q dalam J ÷ 1,000 = kJ)
            </div>
          </div>
        );

      case 'voltage':
        return (
          <div className="flex flex-col items-center justify-center py-1.5 gap-1.5">
            <div className="text-lg sm:text-xl font-bold text-slate-900">
              E°<sub>sel</sub> = E°<sub>katod</sub> − E°<sub>anod</sub>
            </div>
            <div className="text-xs text-slate-700 bg-amber-100/70 px-3 py-1 rounded-xl font-medium">
              E°<sub>sel</sub> = E°<sub>(terminal positif)</sub> − E°<sub>(terminal negatif)</sub>
            </div>
          </div>
        );

      case 'fraction':
      default:
        return (
          <div className="flex flex-col items-center justify-center py-1 gap-2">
            {/* Primary Textbook Word / Hybrid Formula */}
            <div className="flex items-center justify-center flex-wrap gap-2 text-slate-900">
              <span className="font-bold text-slate-900 text-sm sm:text-base">
                {formatSubscripts(item.lhs || '')} =
              </span>

              {/* Stacked Fraction with division bar */}
              <div className="inline-flex flex-col items-center justify-center align-middle mx-1">
                <span className="text-xs sm:text-sm font-bold text-slate-900 px-2 py-0.5 text-center leading-tight">
                  {formatSubscripts(item.numerator || '')}
                </span>
                <span className="w-full h-[2px] bg-slate-800 rounded-full my-0.5"></span>
                <span className="text-xs sm:text-sm font-bold text-slate-900 px-2 py-0.5 text-center leading-tight">
                  {formatSubscripts(item.denominator || '')}
                </span>
              </div>

              {item.subText && (
                <span className="text-xs font-bold text-slate-800 ml-1">
                  {item.subText}
                </span>
              )}
            </div>

            {/* Optional Symbolic Formula Callout */}
            {item.symbolicNum && (
              <div className="mt-1 pt-1.5 border-t border-amber-200/70 w-full flex items-center justify-center gap-2 text-xs font-bold text-amber-950 bg-amber-100/50 py-1 px-3 rounded-xl">
                <span className="text-slate-500 font-sans text-[11px] font-normal">Rumus Simbol:</span>
                <span className="text-sm">{formatSubscripts(item.symbolicLhs || 'n')} =</span>
                <div className="inline-flex flex-col items-center justify-center text-sm">
                  <span className="px-1.5 leading-none">{formatSubscripts(item.symbolicNum)}</span>
                  <span className="w-full h-[1.5px] bg-amber-900 my-0.5"></span>
                  <span className="px-1.5 leading-none">{formatSubscripts(item.symbolicDen || '')}</span>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200/80">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-50 via-white to-orange-50/50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-amber-500 text-white text-xs font-mono shadow-xs">
                <Calculator className="w-4 h-4" />
              </span>
              Himpunan Formula Penting Kimia SPM KSSM
            </h2>
            <p className="text-xs text-slate-500">Susunan rumus, pecahan stoikiometri, larutan piawai, kadar tindak balas, termokimia &amp; sel elektrokimia mengikut penulisan rasmi buku teks</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200/60 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 bg-slate-50/80 border-b border-slate-200">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari rumus (contoh: mol, isi padu gas, pencairan, M1V1, haba, voltan, MaVa/MbVb)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {filteredGroups.map((grp, gIdx) => (
            <div key={gIdx} className="space-y-3">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                {grp.category}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {grp.formulas.map((item, fIdx) => (
                  <div
                    key={fIdx}
                    className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/90 space-y-3 hover:shadow-md transition-shadow"
                  >
                    {/* Formula Card Header */}
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-sm">{item.name}</span>
                        <span className="text-[10px] text-amber-700 font-medium flex items-center gap-1 mt-0.5">
                          <BookOpen className="w-3 h-3 text-amber-600" />
                          {item.syllabus}
                        </span>
                      </div>
                      {item.unit && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-100/80 text-amber-900 border border-amber-200 font-bold shrink-0">
                          {item.unit}
                        </span>
                      )}
                    </div>

                    {/* Textbook-Styled Formula Box */}
                    <div className="bg-gradient-to-br from-amber-50/70 via-white to-amber-50/40 rounded-2xl p-3 border border-amber-300/80 shadow-2xs">
                      {renderFormulaVisual(item)}
                    </div>

                    {/* Variables Description */}
                    <div className="space-y-1 text-[11px] text-slate-600">
                      <span className="font-bold text-slate-700 block">Keterangan Pemboleh Ubah:</span>
                      <ul className="list-disc pl-4 space-y-0.5">
                        {item.variables.map((v, vIdx) => (
                          <li key={vIdx} className="leading-relaxed">
                            {formatSubscripts(v)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* SPM Exam Scoring Tips */}
                    {item.tips && (
                      <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5">
                        <BookmarkCheck className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{formatSubscripts(item.tips)}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredGroups.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              Tiada rumus sepadan dengan carian anda.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
