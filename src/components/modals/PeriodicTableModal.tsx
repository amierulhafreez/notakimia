import React, { useState } from 'react';
import { X, Search, Info, HelpCircle } from 'lucide-react';
import { PERIODIC_ELEMENTS, PeriodicElement } from '../../data/quickReferences';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PeriodicTableModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedElement, setSelectedElement] = useState<PeriodicElement | null>(PERIODIC_ELEMENTS[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'Semua Unsur' },
    { id: 'alkali', label: 'Logam Alkali (K1)', color: 'bg-rose-100 text-rose-800 border-rose-300' },
    { id: 'alkali-earth', label: 'Logam Alkali Bumi (K2)', color: 'bg-amber-100 text-amber-800 border-amber-300' },
    { id: 'transition', label: 'Unsur Peralihan', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
    { id: 'basic-metal', label: 'Logam Asas', color: 'bg-sky-100 text-sky-800 border-sky-300' },
    { id: 'metalloid', label: 'Metaloid', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    { id: 'nonmetal', label: 'Bukan Logam', color: 'bg-teal-100 text-teal-800 border-teal-300' },
    { id: 'halogen', label: 'Halogen (K17)', color: 'bg-orange-100 text-orange-800 border-orange-300' },
    { id: 'noble-gas', label: 'Gas Nadir (K18)', color: 'bg-purple-100 text-purple-800 border-purple-300' },
  ];

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'alkali': return 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100';
      case 'alkali-earth': return 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100';
      case 'transition': return 'bg-indigo-50 text-indigo-800 border-indigo-200 hover:bg-indigo-100';
      case 'basic-metal': return 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100';
      case 'metalloid': return 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100';
      case 'nonmetal': return 'bg-teal-50 text-teal-800 border-teal-200 hover:bg-teal-100';
      case 'halogen': return 'bg-orange-50 text-orange-800 border-orange-200 hover:bg-orange-100';
      case 'noble-gas': return 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const matchesSearch = (el: PeriodicElement) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      el.name.toLowerCase().includes(q) ||
      el.nameMalay.toLowerCase().includes(q) ||
      el.symbol.toLowerCase().includes(q) ||
      el.number.toString().includes(q)
    );
  };

  const matchesCategory = (el: PeriodicElement) => {
    return categoryFilter === 'all' || el.category === categoryFilter;
  };

  // Find element by group and period
  const getElementAt = (group: number, period: number): PeriodicElement | undefined => {
    return PERIODIC_ELEMENTS.find((el) => el.group === group && el.period === period);
  };

  const groups = Array.from({ length: 18 }, (_, i) => i + 1);
  const periods = [1, 2, 3, 4, 5, 6];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-7xl max-h-[96vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200/90">
        {/* Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-sky-50 via-white to-indigo-50/50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-sky-500 text-white text-xs font-mono shadow-xs">JBU</span>
              Jadual Berkala Unsur Piawai KSSM
            </h2>
            <p className="text-xs text-slate-500">Susunan grid 18 Kumpulan &amp; 7 Kala mengikut standard rasmi Buku Teks Kimia KSSM</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200/60 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-3 bg-slate-50/90 border-b border-slate-200 flex flex-col sm:flex-row gap-2.5 items-center justify-between shrink-0">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari unsur, simbol, no proton..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-2xs"
            />
          </div>

          {/* Category badges */}
          <div className="flex flex-wrap gap-1 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  categoryFilter === cat.id
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col lg:flex-row gap-5 items-start">
          {/* Authentic 18-Group x Period Periodic Table Grid */}
          <div className="flex-1 w-full overflow-x-auto pb-2">
            <div className="min-w-[760px] space-y-1.5">
              {/* Group Numbers Header (1 to 18) */}
              <div className="grid grid-cols-19 gap-1 text-center font-mono text-[10px] text-slate-400 pb-1 font-bold">
                <div className="text-[9px] text-slate-300">Kala</div>
                {groups.map((g) => (
                  <div key={g} className="py-0.5">{g}</div>
                ))}
              </div>

              {/* Periods Rows */}
              {periods.map((period) => (
                <div key={period} className="grid grid-cols-19 gap-1 items-stretch">
                  {/* Period Label */}
                  <div className="flex items-center justify-center font-mono font-bold text-xs text-slate-400 bg-slate-100 rounded-lg">
                    {period}
                  </div>

                  {/* 18 Group Columns */}
                  {groups.map((group) => {
                    const el = getElementAt(group, period);
                    if (!el) {
                      return <div key={group} className="min-h-[46px]" />;
                    }

                    const isMatch = matchesSearch(el) && matchesCategory(el);
                    const isSelected = selectedElement?.number === el.number;
                    const catClass = getCategoryColor(el.category);

                    return (
                      <button
                        key={group}
                        onClick={() => setSelectedElement(el)}
                        className={`min-h-[48px] p-1 rounded-xl flex flex-col items-center justify-between text-center transition-all duration-150 border cursor-pointer ${
                          isSelected
                            ? 'ring-2 ring-sky-600 shadow-md scale-105 z-10 bg-white border-sky-400'
                            : isMatch
                              ? `${catClass} hover:scale-105 hover:shadow-xs`
                              : 'opacity-20 bg-slate-100 border-slate-200 hover:opacity-100'
                        }`}
                        title={`${el.nameMalay} (${el.symbol})\nNo Proton: ${el.number}\nJAR: ${el.ram}`}
                      >
                        <span className="text-[8px] font-mono text-slate-400 leading-none self-start">{el.number}</span>
                        <span className="text-xs sm:text-sm font-black text-slate-900 leading-tight">{el.symbol}</span>
                        <span className="text-[7.5px] font-mono text-slate-500 leading-none truncate w-full">{el.ram}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Quick Guide Indicator */}
            <div className="mt-4 p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                <span>Klik mana-mana petak unsur untuk memaparkan sifat kimia dan analisis struktur atom SPM</span>
              </span>
              <span className="font-mono text-[10px] text-slate-400">DSKP KSSM Tingkatan 4 Bab 4</span>
            </div>
          </div>

          {/* Element Inspector Card Sidebar */}
          <div className="w-full lg:w-80 shrink-0">
            {selectedElement ? (
              <div className="bg-slate-50/90 rounded-3xl p-5 border border-slate-200 space-y-4 shadow-sm sticky top-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                    Kumpulan {selectedElement.group} • Kala {selectedElement.period}
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                    Blok-{selectedElement.block}
                  </span>
                </div>

                <div className="text-center py-2 border-b border-slate-200">
                  <div className="text-xs font-mono text-slate-400">Nombor Proton: {selectedElement.number}</div>
                  <div className="text-5xl font-black text-slate-900 my-1 tracking-tight">{selectedElement.symbol}</div>
                  <div className="text-lg font-bold text-slate-800">{selectedElement.nameMalay}</div>
                  <div className="text-xs text-slate-500 italic">{selectedElement.name}</div>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between py-1 border-b border-slate-200/80">
                    <span className="text-slate-500">Jisim Atom Relatif (JAR):</span>
                    <span className="font-bold text-slate-900">{selectedElement.ram}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/80">
                    <span className="text-slate-500">Susunan Elektron:</span>
                    <span className="font-mono font-bold text-sky-700">{selectedElement.electronConfig}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/80">
                    <span className="text-slate-500">Elektron Valens:</span>
                    <span className="font-bold text-slate-900">{selectedElement.valenceElectrons}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/80">
                    <span className="text-slate-500">Kategori Silibus:</span>
                    <span className="font-semibold capitalize text-slate-800">{selectedElement.category.replace('-', ' ')}</span>
                  </div>
                </div>

                <div className="bg-sky-50/90 rounded-2xl p-3 border border-sky-200 text-xs text-sky-950 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-sky-900">
                    <Info className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    Poin Penting SPM:
                  </div>
                  <p className="text-[11px] leading-relaxed text-sky-800">
                    <b>Kala</b> ditentukan oleh bilangan petala yang berisi elektron (Kala {selectedElement.period}). <b>Kumpulan</b> ditentukan oleh bilangan elektron valens ({selectedElement.valenceElectrons} elektron valens).
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm p-6 text-center">
                Pilih mana-mana unsur daripada jadual di sebelah untuk melihat perincian.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
