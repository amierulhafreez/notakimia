import React, { useState } from 'react';
import { X, Search, ArrowUp, ArrowDown, Zap } from 'lucide-react';
import { STANDARD_ELECTRODE_POTENTIALS } from '../../data/quickReferences';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ElectrochemicalSeriesModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = STANDARD_ELECTRODE_POTENTIALS.filter((item) =>
    item.halfEquation.toLowerCase().includes(search.toLowerCase()) ||
    item.oxidizedSpecies.toLowerCase().includes(search.toLowerCase()) ||
    item.reducedSpecies.toLowerCase().includes(search.toLowerCase()) ||
    item.e0.toString().includes(search)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200/80">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50/50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-indigo-600 text-white text-xs font-mono">E°</span>
              Siri Keupayaan Elektrod Piawai & Siri Elektrokimia
            </h2>
            <p className="text-xs text-slate-500">Nilai E° pada 25 °C (298 K), 1 atm, 1.0 mol dm⁻³ berbanding Elektrod Hidrogen Piawai (SHE)</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200/60 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Guide Indicator */}
        <div className="p-4 bg-indigo-950 text-white grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2.5 bg-indigo-900/80 p-3 rounded-2xl border border-indigo-700/60">
            <div className="p-1.5 bg-emerald-500/20 text-emerald-300 rounded-lg shrink-0 mt-0.5">
              <ArrowUp className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-emerald-300">Nilai E° Semakin Negatif (Sebelah Atas):</div>
              <p className="text-indigo-200 text-[11px] leading-relaxed mt-0.5">
                Kekuatan sebagai <b>agen penurunan bertambah</b>. Spesies di sebelah kanan (seperti Li, K, Ca, Na) lebih cenderung <b>menderma / melepaskan elektron (mengalami pengoksidaan / Anod)</b>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 bg-indigo-900/80 p-3 rounded-2xl border border-indigo-700/60">
            <div className="p-1.5 bg-rose-500/20 text-rose-300 rounded-lg shrink-0 mt-0.5">
              <ArrowDown className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-rose-300">Nilai E° Semakin Positif (Sebelah Bawah):</div>
              <p className="text-indigo-200 text-[11px] leading-relaxed mt-0.5">
                Kekuatan sebagai <b>agen pengoksidaan bertambah</b>. Spesies di sebelah kiri (seperti F₂, Cl₂, MnO₄⁻) lebih cenderung <b>menerima elektron (mengalami penurunan / Katod)</b>.
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 bg-slate-50/80 border-b border-slate-200">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari persamaan setengah, spesies atau nilai voltan (contoh: Zn, Cu, Cl, 0.34)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto p-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                <th className="py-2.5 px-3">Persamaan Setengah Penurunan</th>
                <th className="py-2.5 px-3 text-center">Nilai E° (V)</th>
                <th className="py-2.5 px-3 hidden sm:table-cell">Agen Pengoksidaan (Kiri)</th>
                <th className="py-2.5 px-3 hidden sm:table-cell">Agen Penurunan (Kanan)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item, idx) => {
                const isZero = item.e0 === 0;
                const isPositive = item.e0 > 0;
                return (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isZero ? 'bg-amber-50/60 font-semibold' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 font-mono font-medium text-slate-800">
                      {item.halfEquation}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full font-mono font-bold text-[11px] ${
                          isZero
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : isPositive
                            ? 'bg-purple-100 text-purple-900 border border-purple-200'
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                        }`}
                      >
                        {item.e0 > 0 ? `+${item.e0.toFixed(2)}` : item.e0.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 hidden sm:table-cell font-mono">
                      {item.oxidizedSpecies}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 hidden sm:table-cell font-mono">
                      {item.reducedSpecies}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer tip */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between px-6">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            Formula Voltan Sel: E°sel = E°(katod / lebih positif) - E°(anod / lebih negatif)
          </span>
          <span className="text-slate-400">Rujukan: Buku Teks Kimia Tingkatan 5 KSSM</span>
        </div>
      </div>
    </div>
  );
};
