import React, { useState } from 'react';
import { X, Search, Filter } from 'lucide-react';
import { CATION_TESTS, ANION_TESTS, GAS_TESTS, QualitativeCationTest } from '../../data/quickReferences';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const IonTestModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'cation' | 'anion' | 'gas'>('cation');
  const [colorFilter, setColorFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredCations = CATION_TESTS.filter((item: QualitativeCationTest) => {
    const matchesSearch =
      item.cation.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.confirmatory.toLowerCase().includes(search.toLowerCase());
    const matchesColor = colorFilter === 'all' || item.precipitateColor === colorFilter;
    return matchesSearch && matchesColor;
  });

  const filteredAnions = ANION_TESTS.filter((item) =>
    item.anion.toLowerCase().includes(search.toLowerCase()) ||
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.observation.toLowerCase().includes(search.toLowerCase())
  );

  const filteredGases = GAS_TESTS.filter((item) =>
    item.gas.toLowerCase().includes(search.toLowerCase()) ||
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.observation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200/80">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-teal-50 to-sky-50/50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-teal-600 text-white text-xs font-mono">ION</span>
              Jadual Ujian Pengesahan Kation, Anion & Gas SPM
            </h2>
            <p className="text-xs text-slate-500">Panduan lengkap analisis kualitatif garam KSSM (Kertas 2 & Kertas 3)</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200/60 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher & Search Bar */}
        <div className="p-4 bg-slate-50/90 border-b border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex bg-slate-200/80 p-1 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('cation')}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'cation' ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ujian Kation (9 Ion)
            </button>
            <button
              onClick={() => setActiveTab('anion')}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'anion' ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ujian Anion (4 Ion)
            </button>
            <button
              onClick={() => setActiveTab('gas')}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'gas' ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ujian 8 Gas Makmal
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari ion, gas, pemerhatian..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Color filters for Cations */}
        {activeTab === 'cation' && (
          <div className="px-6 py-2.5 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1 text-[11px] shrink-0">
              <Filter className="w-3 h-3" /> Penapis Warna:
            </span>
            {[
              { id: 'all', label: 'Semua Kation' },
              { id: 'white', label: '⚪ Mendakan Putih (5)' },
              { id: 'blue', label: '🔵 Biru (Cu²⁺)' },
              { id: 'green', label: '🟢 Hijau (Fe²⁺)' },
              { id: 'brown', label: '🟤 Perang (Fe³⁺)' },
              { id: 'none', label: '⚪ Tiada Mendakan (NH₄⁺)' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setColorFilter(btn.id)}
                className={`px-2.5 py-1 rounded-lg text-xs shrink-0 transition-all ${
                  colorFilter === btn.id
                    ? 'bg-teal-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}

        {/* Body content based on activeTab */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeTab === 'cation' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCations.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200 space-y-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-1 rounded-xl bg-teal-100 text-teal-900 font-mono font-bold text-sm">
                        {item.cation}
                      </span>
                      <span className="font-bold text-slate-800 text-sm">{item.name}</span>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-full capitalize bg-white text-slate-600 border border-slate-200">
                      {item.precipitateColor === 'white' ? 'Mendakan Putih' : item.precipitateColor}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                      <div className="font-semibold text-slate-700 flex items-center justify-between mb-1">
                        <span>+ NaOH (Sedikit Demi Sedikit):</span>
                        <span className="text-[10px] text-slate-400">Natrium Hidroksida</span>
                      </div>
                      <p className="text-slate-800 font-medium">{item.naohFew}</p>
                      <div className="mt-1 pt-1 border-t border-slate-100 text-slate-600">
                        <b>Dalam Berlebihan:</b> {item.naohExcess}
                      </div>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                      <div className="font-semibold text-slate-700 flex items-center justify-between mb-1">
                        <span>+ NH₃ (Sedikit Demi Sedikit):</span>
                        <span className="text-[10px] text-slate-400">Larutan Ammonia</span>
                      </div>
                      <p className="text-slate-800 font-medium">{item.nh3Few}</p>
                      <div className="mt-1 pt-1 border-t border-slate-100 text-slate-600">
                        <b>Dalam Berlebihan:</b> {item.nh3Excess}
                      </div>
                    </div>

                    <div className="bg-teal-50/70 p-2.5 rounded-xl border border-teal-200/60 text-teal-950">
                      <span className="font-bold block mb-0.5">Ujian Pengesahan Khas SPM:</span>
                      <p className="text-[11px] leading-relaxed">{item.confirmatory}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'anion' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAnions.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 space-y-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
                    <span className="px-3 py-1 rounded-xl bg-sky-100 text-sky-900 font-mono font-bold text-sm">
                      {item.anion}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">{item.name}</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-semibold text-slate-600 block mb-1">Prosedur Ujian:</span>
                      <p className="bg-white p-3 rounded-xl border border-slate-200/80 text-slate-800 leading-relaxed">
                        {item.procedure}
                      </p>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-600 block mb-1">Pemerhatian Wajib Tulis SPM:</span>
                      <p className="bg-amber-50/80 p-3 rounded-xl border border-amber-200/80 text-amber-950 font-medium leading-relaxed">
                        {item.observation}
                      </p>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-600 block mb-1">Persamaan Ion Terlibat:</span>
                      <div className="chem-equation text-[11px] bg-slate-900 text-sky-300 p-2.5 rounded-xl">
                        {item.chemicalEquation}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'gas' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredGases.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200 space-y-2.5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-1 rounded-xl bg-purple-100 text-purple-900 font-mono font-bold text-sm">
                        {item.gas}
                      </span>
                      <span className="font-bold text-slate-900 text-sm">{item.name}</span>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-medium border border-purple-200">
                      {item.identity}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                      <span className="text-slate-500 font-medium block mb-0.5">Kaedah Menguji Gas:</span>
                      <p className="text-slate-800 font-medium">{item.method}</p>
                    </div>

                    <div className="bg-purple-50/60 p-2.5 rounded-xl border border-purple-100 text-purple-950">
                      <span className="text-purple-700 font-bold block mb-0.5">Pemerhatian Skema SPM:</span>
                      <p className="leading-relaxed">{item.observation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
