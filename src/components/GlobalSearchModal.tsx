import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { searchNotes } from '../data/chaptersIndex';
import { SearchResultItem } from '../types/nota';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (item: SearchResultItem) => void;
}

export const GlobalSearchModal: React.FC<Props> = ({ isOpen, onClose, onSelectResult }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      setResults(searchNotes(query));
    } else {
      setResults([]);
    }
  }, [query]);

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'chapter': return <BookOpen className="w-4 h-4 text-sky-600" />;
      case 'subtopic': return <FileText className="w-4 h-4 text-indigo-600" />;
      case 'mistake': return <AlertCircle className="w-4 h-4 text-rose-600" />;
      default: return <FileText className="w-4 h-4 text-emerald-600" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'chapter': return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'subtopic': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'mistake': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'chapter': return 'Bab';
      case 'subtopic': return 'Subtopik';
      case 'mistake': return 'Awas SPM';
      default: return 'Konsep';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/90 flex flex-col max-h-[80vh]">
        {/* Search Input Box */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50/70">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari mendakan biru, agen pengoksidaan, formula empirik, pH..."
            className="w-full text-base bg-transparent border-none focus:outline-none placeholder:text-slate-400 text-slate-900"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full hover:bg-slate-200 text-slate-400 text-xs"
            >
              Kosongkan
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 divide-y divide-slate-100">
          {query.trim().length <= 1 ? (
            <div className="py-12 text-center text-xs text-slate-400 space-y-2">
              <p className="font-medium text-slate-600">Taip kata kunci untuk memulakan carian pintar</p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                {['Mendakan Putih', 'Larutan Piawai', 'Elektrolisis', 'Peneutralan', 'Pengaratan Besi', 'Nilai E°'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              Tiada nota atau topik sepadan dengan carian <b>"{query}"</b>.
            </div>
          ) : (
            results.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelectResult(item);
                  onClose();
                }}
                className="w-full text-left p-3.5 rounded-2xl hover:bg-slate-50 transition-colors flex items-start gap-3 group"
              >
                <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-white border border-slate-200/60 shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getTypeBadge(item.type)}`}>
                      {getTypeName(item.type)}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {item.form} • Bab {item.chapterNumber}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                    {item.matchSnippet}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all self-center shrink-0" />
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Pintas Papan Kekunci: <b>ESC</b> untuk tutup</span>
          <span>Nota Kimia SPM KSSM</span>
        </div>
      </div>
    </div>
  );
};
