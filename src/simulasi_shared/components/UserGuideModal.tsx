import React, { useEffect, useState } from 'react';
import {
  X,
  Compass,
  Sparkles,
  Search,
  Sliders,
  Layers,
  GraduationCap,
  HelpCircle,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Atom,
  FlaskConical,
  Eye,
  RefreshCw,
  Send,
  BookOpen,
  Monitor,
  Smartphone,
  ExternalLink,
} from 'lucide-react';

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSimulationById?: (simId: string) => void;
}

type GuideTab = 'quickstart' | 'navigation' | 'controls' | 'tips' | 'faq';

export const UserGuideModal: React.FC<UserGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectSimulationById,
}) => {
  const [activeTab, setActiveTab] = useState<GuideTab>('quickstart');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLaunchSample = (simId: string) => {
    onClose();
    if (onSelectSimulationById) {
      onSelectSimulationById(simId);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-guide-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200 rounded-t-[32px] sm:rounded-[32px] w-full max-w-3xl max-h-[92dvh] sm:max-h-[88vh] flex flex-col shadow-2xl overflow-hidden pb-[env(safe-area-inset-bottom)]"
      >
        {/* Apple Style Frosted Header */}
        <div className="p-4 sm:p-5 border-b border-black/[0.06] flex items-center justify-between bg-[#fbfbfd]/90 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-[#0071e3] to-[#4f46e5] text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2
                  id="user-guide-title"
                  className="font-display font-bold text-base sm:text-lg text-[#1d1d1f] tracking-tight truncate"
                >
                  Panduan Penggunaan Makmal Maya
                </h2>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-[#0071e3] text-[10px] font-bold border border-blue-200/60">
                  <Sparkles className="w-3 h-3 text-[#0071e3]" />
                  KSSM Kimia SPM
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#6e6e73] font-medium truncate">
                Langkah mudah meneroka, mencari & mengawal 45 simulasi interaktif
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup panduan"
            className="w-8 h-8 rounded-full bg-black/[0.05] hover:bg-black/[0.1] text-[#1d1d1f] flex items-center justify-center transition border border-black/[0.06] cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Liquid Glass Navigation Tab Bar */}
        <div className="px-3 sm:px-6 pt-3 pb-2 border-b border-black/[0.05] bg-white shrink-0 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
            <button
              type="button"
              onClick={() => setActiveTab('quickstart')}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'quickstart'
                  ? 'bg-[#0071e3] text-white shadow-xs'
                  : 'text-[#424245] hover:text-[#1d1d1f] hover:bg-black/[0.04]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mula Cepat</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('navigation')}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'navigation'
                  ? 'bg-[#0071e3] text-white shadow-xs'
                  : 'text-[#424245] hover:text-[#1d1d1f] hover:bg-black/[0.04]'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Navigasi & Carian</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('controls')}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'controls'
                  ? 'bg-[#0071e3] text-white shadow-xs'
                  : 'text-[#424245] hover:text-[#1d1d1f] hover:bg-black/[0.04]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Kawalan Makmal</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('tips')}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'tips'
                  ? 'bg-[#0071e3] text-white shadow-xs'
                  : 'text-[#424245] hover:text-[#1d1d1f] hover:bg-black/[0.04]'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Tips Pelajar & Guru</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('faq')}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'faq'
                  ? 'bg-[#0071e3] text-white shadow-xs'
                  : 'text-[#424245] hover:text-[#1d1d1f] hover:bg-black/[0.04]'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Soalan Lazim</span>
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-[#1d1d1f] overscroll-contain [-webkit-overflow-scrolling:touch]">
          {/* TAB 1: MULA CEPAT (QUICK START) */}
          {activeTab === 'quickstart' && (
            <div className="space-y-6">
              {/* Introduction Banner */}
              <div className="rounded-2xl bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-white p-4 sm:p-5 border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0071e3]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Selamat Datang ke Makmal Maya</span>
                  </div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#1d1d1f]">
                    3 Langkah Mudah Menggunakan Aplikasi
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#424245] leading-relaxed">
                    Aplikasi ini membolehkan anda menguji amali Kimia SPM secara terus pada skrin telefon, tablet mahupun komputer riba tanpa bahan kimia fizikal.
                  </p>
                </div>
              </div>

              {/* 3 Steps Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {/* Step 1 */}
                <div className="rounded-2xl p-4 bg-[#fbfbfd] border border-black/[0.06] space-y-2.5 relative">
                  <div className="w-7 h-7 rounded-full bg-[#0071e3] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    1
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#1d1d1f]">
                    Pilih Tingkatan & Bab
                  </h4>
                  <p className="text-xs text-[#6e6e73] leading-relaxed">
                    Gunakan tab <strong>Tingkatan 4</strong> atau <strong>Tingkatan 5</strong>, atau klik pil bab seperti <em>Bab 6 Asid, Bes & Garam</em> untuk menyaring topik yang diingini.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="rounded-2xl p-4 bg-[#fbfbfd] border border-black/[0.06] space-y-2.5 relative">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    2
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#1d1d1f]">
                    Klik Kad Simulasi
                  </h4>
                  <p className="text-xs text-[#6e6e73] leading-relaxed">
                    Pilih mana-mana eksperimen dengan menekan butang <strong>"Buka Simulasi"</strong> atau gambar rajah eksperimen untuk membuka makmal interaktif.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="rounded-2xl p-4 bg-[#fbfbfd] border border-black/[0.06] space-y-2.5 relative">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    3
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#1d1d1f]">
                    Kawal Radas & Kaji Zarah
                  </h4>
                  <p className="text-xs text-[#6e6e73] leading-relaxed">
                    Tolak slider kepekatan/suhu, tekan butang tuang/suis, dan perhatikan perubahan warna serta pergerakan atom/ion secara langsung.
                  </p>
                </div>
              </div>

              {/* Try Sample Simulation Banner */}
              <div className="rounded-2xl bg-[#f5f5f7] border border-black/[0.06] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                    Ingin Mencuba Terus?
                  </div>
                  <div className="text-sm font-semibold text-[#1d1d1f]">
                    Cuba dua eksperimen paling popular ini:
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleLaunchSample('pentitratan-asid-alkali')}
                    className="liquid-glass-blue px-3.5 py-2 rounded-full text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer flex-1 sm:flex-initial justify-center"
                  >
                    <FlaskConical className="w-3.5 h-3.5" />
                    <span>Pentitratan Asid-Bes</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleLaunchSample('elektrolisis')}
                    className="liquid-glass-btn px-3.5 py-2 rounded-full text-[#1d1d1f] hover:text-[#0071e3] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer flex-1 sm:flex-initial justify-center"
                  >
                    <Atom className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Elektrolisis Akues</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: NAVIGASI & CARIAN */}
          {activeTab === 'navigation' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#1d1d1f]">
                  Cara Mencari & Menavigasi Modul Eksperimen
                </h3>
                <p className="text-xs sm:text-[13px] text-[#6e6e73]">
                  Aplikasi ini mengandungi 45 modul simulasi yang disusun mengikut sukatan rasmi KSSM Kimia Tingkatan 4 dan 5.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search Feature */}
                <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-black/[0.06] space-y-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#0071e3] flex items-center justify-center">
                    <Search className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-sm text-[#1d1d1f]">
                    1. Kotak Carian Pintar
                  </h4>
                  <p className="text-xs text-[#424245] leading-relaxed">
                    Ketik apa-apa kata kunci di bar carian atas. Contoh carian yang disokong:
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white border border-black/[0.08] text-slate-700">
                      "titratan"
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white border border-black/[0.08] text-slate-700">
                      "redoks"
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white border border-black/[0.08] text-slate-700">
                      "garam"
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white border border-black/[0.08] text-slate-700">
                      "alkena"
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white border border-black/[0.08] text-slate-700">
                      "haba tindak balas"
                    </span>
                  </div>
                </div>

                {/* Form Level Filter */}
                <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-black/[0.06] space-y-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-sm text-[#1d1d1f]">
                    2. Bar Penapis Tingkatan
                  </h4>
                  <p className="text-xs text-[#424245] leading-relaxed">
                    Di atas katalog eksperimen, gunakan tab <strong>"Semua"</strong>, <strong>"Tingkatan 4 (23 simulasi)"</strong>, atau <strong>"Tingkatan 5 (22 simulasi)"</strong> untuk mengehadkan paparan kepada sukatan kelas anda.
                  </p>
                </div>

                {/* Topic Carousel Rows */}
                <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-black/[0.06] space-y-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-sm text-[#1d1d1f]">
                    3. Barisan Karousel Mengikut Bab
                  </h4>
                  <p className="text-xs text-[#424245] leading-relaxed">
                    Setiap bab mempunyai barisan karousel mendatar yang boleh di-scroll ke kiri atau kanan. Anda juga boleh menekan pil bab untuk melihat bab tersebut secara eksklusif.
                  </p>
                </div>

                {/* Header Shortcut */}
                <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-black/[0.06] space-y-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-sm text-[#1d1d1f]">
                    4. Menu Pintas Header
                  </h4>
                  <p className="text-xs text-[#424245] leading-relaxed">
                    Bar navigasi di bahagian atas sentiasa melekat (sticky). Klik <strong>"Tingkatan 4"</strong> atau <strong>"Tingkatan 5"</strong> untuk lompat terus ke bahagian tersebut dengan satu klik.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KAWALAN MAKMAL */}
          {activeTab === 'controls' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#1d1d1f]">
                  Memahami Kawalan Interaktif & Aras Johnstone
                </h3>
                <p className="text-xs sm:text-[13px] text-[#6e6e73]">
                  Simulasi kami dibina berasaskan 3 Aras Representasi Kimia Johnstone untuk membantu anda menghubungkan amali dengan teori atom.
                </p>
              </div>

              {/* 3 Aras Johnstone */}
              <div className="space-y-3">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#0071e3] font-bold text-xs uppercase tracking-wider">
                    <Eye className="w-4 h-4" />
                    <span>Aras 1: Makroskopik (Apa Yang Dilihat)</span>
                  </div>
                  <p className="text-xs text-sky-950 leading-relaxed">
                    Mewakili radas makmal sebenar — tabung uji, bikar, buret, dan termometer. Anda boleh memerhatikan perubahan warna larutan, gelembung gas terbebas, dan mendakan terbentuk.
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                    <Atom className="w-4 h-4" />
                    <span>Aras 2: Submikroskopik (Zarah, Ion & Elektron)</span>
                  </div>
                  <p className="text-xs text-indigo-950 leading-relaxed">
                    Visualisasi dinamik yang memaparkan pergerakan ion ke elektrod, pemindahan elektron, orientasi zarah, dan perlanggaran berkesan mengikut Teori Perlanggaran.
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                    <FlaskConical className="w-4 h-4" />
                    <span>Aras 3: Simbolik (Persamaan, Graf & Formula)</span>
                  </div>
                  <p className="text-xs text-emerald-950 leading-relaxed">
                    Persamaan kimia seimbang, setengah persamaan ion, formula termokimia (cth: <span className="font-mono font-semibold">mcθ</span>), graf isipadu gas melawan masa, dan pengiraan langkah demi langkah.
                  </p>
                </div>
              </div>

              {/* Interactive Controllers Breakdown */}
              <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-black/[0.06] space-y-3">
                <h4 className="font-semibold text-sm text-[#1d1d1f]">
                  Jenis Butang & Kawalan Yang Disediakan:
                </h4>
                <ul className="text-xs text-[#424245] space-y-2">
                  <li className="flex items-start gap-2">
                    <Sliders className="w-3.5 h-3.5 text-[#0071e3] mt-0.5 shrink-0" />
                    <span><strong>Slider Pemboleh Ubah:</strong> Gerakkan slider untuk menukar kepekatan larutan (mol dm⁻³), suhu (°C), atau isipadu cecair.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                    <span><strong>Butang Tindakan:</strong> Tekan "Tuang Asid", "Panaskan", "Hidupkan Suis Arus", atau "Titiskan Penunjuk Warna".</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <RefreshCw className="w-3.5 h-3.5 text-slate-600 mt-0.5 shrink-0" />
                    <span><strong>Butang Set Semula:</strong> Terletak di bahagian dalam simulasi untuk memulakan semula eksperimen dari keadaan awal.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: TIPS PELAJAR & GURU */}
          {activeTab === 'tips' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#1d1d1f]">
                  Panduan Khusus Mengikut Peranan
                </h3>
                <p className="text-xs sm:text-[13px] text-[#6e6e73]">
                  Bagaimana memanfaatkan makmal maya untuk meningkatkan gred amali & mengajar di bilik darjah.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pelajar */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-black/[0.07] space-y-3 shadow-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#0071e3] flex items-center justify-center font-bold">
                      🎓
                    </div>
                    <h4 className="font-bold text-sm text-[#1d1d1f]">
                      Untuk Calon SPM & Pelajar
                    </h4>
                  </div>
                  <ul className="text-xs text-[#424245] space-y-2 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Ujian Amali Sains (UAS):</strong> Fahami prosedur susunan radas tanpa risau tumpahan bahan kimia merbahaya.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Kertas 2 & 3:</strong> Latih diri mengenal pasti pemboleh ubah (dimanipulasi, bergerak balas, dimalarkan) dan inferens.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Ulangkaji Pantas:</strong> Buka simulasi di telefon sebelum kelas bermula untuk bayangan awal topik yang akan diajar.</span>
                    </li>
                  </ul>
                </div>

                {/* Guru */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-black/[0.07] space-y-3 shadow-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                      👨‍🏫
                    </div>
                    <h4 className="font-bold text-sm text-[#1d1d1f]">
                      Untuk Guru Kimia & Pendidik
                    </h4>
                  </div>
                  <ul className="text-xs text-[#424245] space-y-2 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span><strong>Smartboard & Projektor:</strong> Simulasi direka dengan kontras tinggi dan vektor SVG tajam untuk tayangan bilik darjah.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span><strong>PdPc Berpusatkan Murid:</strong> Minta murid membuat hipotesis dahulu sebelum memutar slider atau menekan suis.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span><strong>Penyediaan e-RPH:</strong> Sambungkan aktiviti PdPc dengan sistem e-RPH Pintar kami di{' '}
                        <a
                          href="https://www.erphkimia.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 font-semibold underline inline-flex items-center gap-0.5"
                        >
                          erphkimia.com <ExternalLink className="w-2.5 h-2.5" />
                        </a>.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SOALAN LAZIM (FAQ) */}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#1d1d1f]">
                  Soalan Yang Kerap Ditanya (FAQ)
                </h3>
                <p className="text-xs sm:text-[13px] text-[#6e6e73]">
                  Jawapan ringkas kepada persoalan biasa mengenai aplikasi ini.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#fbfbfd] border border-black/[0.06] space-y-1.5">
                  <h4 className="font-semibold text-xs sm:text-sm text-[#1d1d1f]">
                    Adakah aplikasi ini berbayar atau memerlukan log masuk?
                  </h4>
                  <p className="text-xs text-[#6e6e73] leading-relaxed">
                    Tidak! Aplikasi ini <strong>100% percuma</strong> untuk semua pelajar dan guru di seluruh Malaysia. Tiada sebarang pendaftaran akaun atau langganan diperlukan.
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#fbfbfd] border border-black/[0.06] space-y-1.5">
                  <h4 className="font-semibold text-xs sm:text-sm text-[#1d1d1f]">
                    Bolehkah saya buka di iPhone, Android atau iPad?
                  </h4>
                  <p className="text-xs text-[#6e6e73] leading-relaxed">
                    Ya, aplikasi telah dioptimumkan sepenuhnya untuk semua jenis peranti termasuk skrin sentuh (iPhone, telefon Android, iPad/Tablet, Windows PC, dan Mac).
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#fbfbfd] border border-black/[0.06] space-y-1.5">
                  <h4 className="font-semibold text-xs sm:text-sm text-[#1d1d1f]">
                    Apa yang perlu saya buat sekiranya simulasi tersekat?
                  </h4>
                  <p className="text-xs text-[#6e6e73] leading-relaxed">
                    Tekan butang <strong>"Set Semula"</strong> di dalam paparan simulasi tersebut, atau muat semula (refresh) halaman pelayar web anda.
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#fbfbfd] border border-black/[0.06] space-y-1.5">
                  <h4 className="font-semibold text-xs sm:text-sm text-[#1d1d1f]">
                    Bagaimanakah jika saya ingin mencadangkan eksperimen baharu?
                  </h4>
                  <p className="text-xs text-[#6e6e73] leading-relaxed">
                    Anda boleh menekan butang <strong>"Isi Borang Maklum Balas"</strong> di bahagian bawah laman web atau hubungi Cikgu Hafreez secara terus di Telegram{' '}
                    <a
                      href="https://t.me/amierulhafreez"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0071e3] font-semibold underline"
                    >
                      @AmierulHafreez
                    </a>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-black/[0.06] bg-[#fbfbfd] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#6e6e73]">
            <Sparkles className="w-3.5 h-3.5 text-[#0071e3]" />
            <span>Dibangunkan khas untuk kecemerlangan Kimia KSSM SPM</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <a
              href="https://t.me/amierulhafreez"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass-btn px-3 py-1.5 rounded-full text-xs font-semibold text-[#0071e3] flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3 h-3" />
              <span>Tanya Cikgu</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="liquid-glass-dark px-4 py-1.5 rounded-full text-white text-xs font-semibold cursor-pointer"
            >
              Faham & Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
