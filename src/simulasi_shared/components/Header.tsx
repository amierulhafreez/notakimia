import React from 'react';
import { BarChart3, Search, FlaskConical, Send, ArrowUpRight, HelpCircle } from 'lucide-react';

interface Props {
  totalVisitors: number;
  onOpenAnalytics: () => void;
  onOpenGuide: () => void;
  onNavigateSection: (section: 'hero' | 'bento' | 't4' | 't5') => void;
  onFocusSearch: () => void;
}

export const Header: React.FC<Props> = ({
  totalVisitors,
  onOpenAnalytics,
  onOpenGuide,
  onNavigateSection,
  onFocusSearch,
}) => {
  return (
    <nav
      aria-label="Navigasi utama"
      className="sticky top-0 z-40 apple-glass border-b border-white/60 shadow-[0_4px_24px_rgba(15,23,42,0.04)] transition-shadow"
    >
      <div className="max-w-6xl mx-auto px-2.5 sm:px-6 h-12 sm:h-13 flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Left: Minimal Brand */}
        <button
          type="button"
          onClick={() => onNavigateSection('hero')}
          className="flex items-center gap-1.5 sm:gap-2 text-[#1d1d1f] hover:opacity-80 transition cursor-pointer shrink-0"
        >
          <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg bg-[#1d1d1f] text-white flex items-center justify-center shadow-2xs">
            <FlaskConical className="w-3.5 h-3.5" />
          </div>
          <span className="font-display font-semibold text-[11px] sm:text-[13px] tracking-tight whitespace-nowrap">
            Simulasi Kimia
          </span>
          <span className="hidden xl:inline-block text-[11px] text-[#6e6e73] font-medium">
            · Cikgu Hafreez
          </span>
        </button>

        {/* Center: Clear Navigation Links (lg+ for zero iPad portrait overflow) */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-6 text-[12px] font-medium text-[#1d1d1f]/80">
          <button
            type="button"
            onClick={() => onNavigateSection('hero')}
            className="hover:text-[#0071e3] transition cursor-pointer whitespace-nowrap"
          >
            Utama
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('bento')}
            className="hover:text-[#0071e3] transition cursor-pointer whitespace-nowrap"
          >
            Sorotan Pembelajaran
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('t4')}
            className="hover:text-[#0071e3] transition cursor-pointer whitespace-nowrap"
          >
            Tingkatan 4
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('t5')}
            className="hover:text-[#0071e3] transition cursor-pointer whitespace-nowrap"
          >
            Tingkatan 5
          </button>
          <button
            type="button"
            onClick={onOpenGuide}
            className="hover:text-[#0071e3] transition cursor-pointer whitespace-nowrap flex items-center gap-1 text-[#0071e3] font-semibold"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Panduan</span>
          </button>
          <a
            href="https://www.erphkimia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition cursor-pointer whitespace-nowrap flex items-center gap-1 text-indigo-600/90 font-semibold"
            title="e-RPH Kimia KSSM Pintar untuk Guru"
          >
            <span>e-RPH Guru</span>
            <ArrowUpRight className="w-3 h-3 opacity-70" />
          </a>
        </div>

        {/* Right: Panduan Button, Telegram Contact, Quick Search, Visitor Live Pill & Statistics */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Main User Guide Reference Button */}
          <button
            type="button"
            onClick={onOpenGuide}
            className="liquid-glass-btn px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[#1d1d1f] hover:text-[#0071e3] text-[10.5px] sm:text-[11px] font-semibold flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap border-[#0071e3]/30"
            title="Panduan Navigasi & Penggunaan Makmal Maya"
          >
            <HelpCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0071e3]" />
            <span>Panduan</span>
          </button>

          <a
            href="https://t.me/amierulhafreez"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass-btn px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-[#0071e3] hover:text-[#005bb5] text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 cursor-pointer whitespace-nowrap"
            title="Hubungi Cikgu Hafreez di Telegram (@AmierulHafreez)"
          >
            <Send className="w-3 h-3" />
            <span className="hidden sm:inline">Hubungi</span>
          </a>

          <button
            type="button"
            onClick={onFocusSearch}
            aria-label="Cari simulasi"
            className="liquid-glass-btn p-1.5 rounded-full text-[#1d1d1f]/80 hover:text-[#1d1d1f] cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <div
            title="Jumlah pelawat aktif"
            className="liquid-glass-btn hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium text-[#1d1d1f]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono font-semibold tabular-nums">
              {totalVisitors.toLocaleString()}
            </span>
            <span className="text-[#6e6e73]">pelawat</span>
          </div>

          <button
            type="button"
            onClick={onOpenAnalytics}
            className="liquid-glass-dark px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-white text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 cursor-pointer whitespace-nowrap"
          >
            <BarChart3 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Statistik</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
