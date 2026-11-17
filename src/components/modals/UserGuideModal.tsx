import React, { useEffect, useState } from 'react';
import {
  X,
  Compass,
  Sparkles,
  Search,
  BookOpen,
  Trophy,
  Zap,
  CheckCircle2,
  Lock,
  Layers,
  GraduationCap,
  HelpCircle,
  Eye,
  SlidersHorizontal,
  LayoutGrid,
  Bookmark,
  Award,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  ExternalLink,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch?: () => void;
  onOpenExamMode?: () => void;
  onOpenQuickRef?: (ref: 'periodic' | 'electrode' | 'ion' | 'formula') => void;
}

type GuideTab = 'mula' | 'interaktif' | 'exam' | 'akses' | 'faq';

export const UserGuideModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onOpenSearch,
  onOpenExamMode,
  onOpenQuickRef,
}) => {
  const [activeTab, setActiveTab] = useState<GuideTab>('mula');

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200/90 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200"
      >
        {/* Glow Header */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-5 sm:p-6 text-white relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer z-20"
            title="Tutup Panduan"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative z-10 flex items-center gap-3.5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/25 shrink-0">
              <Compass className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold text-sky-300">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Panduan Lengkap Navigasi Pelajar</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
                Cara Menggunakan Nota Kimia SPM
              </h2>
            </div>
          </div>

          {/* Liquid Glass Navigation Tab Switcher */}
          <div className="mt-5 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setActiveTab('mula')}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'mula'
                  ? 'liquid-glass-pill text-slate-900 shadow-md font-black'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              <span>🚀 Mula Pantas</span>
            </button>

            <button
              onClick={() => setActiveTab('interaktif')}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'interaktif'
                  ? 'liquid-glass-pill text-slate-900 shadow-md font-black'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              <span>Mod Membaca</span>
            </button>

            <button
              onClick={() => setActiveTab('exam')}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'exam'
                  ? 'liquid-glass-pill text-slate-900 shadow-md font-black'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span>Exam Mode & Lencana</span>
            </button>

            <button
              onClick={() => setActiveTab('akses')}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'akses'
                  ? 'liquid-glass-pill text-slate-900 shadow-md font-black'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-purple-300" />
              <span>Akses Percuma & VIP</span>
            </button>

            <button
              onClick={() => setActiveTab('faq')}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'faq'
                  ? 'liquid-glass-pill text-slate-900 shadow-md font-black'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-300" />
              <span>Soalan Lazim</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6 text-slate-700 text-xs sm:text-sm">
          {/* TAB 1: MULA PANTAS */}
          {activeTab === 'mula' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Selamat Datang ke Nota Kimia SPM Cikgu Hafreez!
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Aplikasi ini dibina khusus untuk membantu calon SPM menguasai 13 Bab Kimia KSSM (Tingkatan 4 & Tingkatan 5) secara interaktif, pantas, dan menyeronokkan dengan visual moden bertaraf dunia.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  3 Langkah Mudah Memulakan Ulang Kaji:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 font-black flex items-center justify-center text-xs">
                      1
                    </div>
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">
                      Pilih Silibus & Bab
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Tukar antara <b>Tingkatan 4</b> (8 Bab) atau <b>Tingkatan 5</b> (5 Bab). Pilih paparan <b>Leret</b> atau <b>Grid Bento</b> mengikut keselesaan anda.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 font-black flex items-center justify-center text-xs">
                      2
                    </div>
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">
                      Pilih Mod Nota
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Klik <b>Nota Express</b> untuk rumusan minda padat 1 halaman (5 minit ulangkaji), atau klik <b>Buka Bab</b> untuk nota komprehensif lengkap.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-black flex items-center justify-center text-xs">
                      3
                    </div>
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">
                      Uji & Kumpul XP
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Jawab soalan <b>Exam Mode SPM</b>, raih mata ganjaran XP, buka <b>24 Lencana</b> kecemerlangan, dan ukir nama anda di Papan Juara Kebangsaan!
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions Shortcuts */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                  <Search className="w-4 h-4 text-sky-600" />
                  <span>Pintasan Navigasi Pantas:</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {onOpenSearch && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenSearch();
                      }}
                      className="liquid-glass-pill px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1.5 cursor-pointer hover:border-sky-300"
                    >
                      <Search className="w-3.5 h-3.5 text-sky-600" />
                      <span>Cari Topik (Tekan ⌘K)</span>
                    </button>
                  )}

                  {onOpenExamMode && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenExamMode();
                      }}
                      className="liquid-glass-pill-amber px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trophy className="w-3.5 h-3.5 text-amber-100" />
                      <span>Buka Exam Mode</span>
                    </button>
                  )}

                  {onOpenQuickRef && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenQuickRef('periodic');
                      }}
                      className="liquid-glass-pill-sky px-3 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-white" />
                      <span>Jadual Berkala Unsur</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MOD MEMBACA & CIRI INTERAKTIF */}
          {activeTab === 'interaktif' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Ciri-Ciri Interaktif Dalam Setiap Bab
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Setiap bab dilengkapi alat bantu belajar moden untuk mempercepat daya ingatan anda.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center">
                      <Zap className="w-4 h-4 fill-white" />
                    </div>
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">
                      Nota Express (Peta Minda 1 Halaman)
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Sesuai untuk ulangkaji pantas 5 minit sebelum peperiksaan. Memaparkan konsep teras, rajah berwarna, persamaan kimia, dan formula penting tanpa gangguan.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-sky-500 text-white flex items-center justify-center">
                      <Eye className="w-4 h-4" />
                    </div>
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">
                      Mod Kabur (Uji Ingatan Aktif)
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Klik butang <b>"Uji Ingatan"</b> di bar atas pembaca untuk mengaburkan istilah dan fakta penting secara automatik. Sentuh pada teks kabur untuk mendedahkan jawapan!
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">
                      Flashcards Interaktif
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Kad imbasan soalan dan jawapan yang boleh diselak (flip). Sesuai untuk menghafal takrifan, warna ion, keadaan jirim, dan hukum gas.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">
                      Simulasi Makmal Kimia Terbenam
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Lakukan amali maya secara langsung dari dalam nota bab (seperti titratan asid-bes, ujian kation/anion, dan sel voltan) tanpa perlu membuka tab luar.
                  </p>
                </div>
              </div>

              {/* Quick References Bar Explanation */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4 text-indigo-600" />
                  <span>Bar Rujukan Pantas Peperiksaan (Quick Ref):</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Terdapat 4 butang kad pantas di laman utama: <b>Jadual Berkala Unsur</b> (lengkap Kala, Kumpulan & nombor proton), <b>Siri E° Elektrokimia</b> (keupayaan elektrod piawai), <b>Ujian Kation & Anion</b> (penapis warna mendakan reagen), dan <b>Formula Penting SPM</b>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: EXAM MODE & LENCANA */}
          {activeTab === 'exam' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-start gap-3">
                <Trophy className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Mod Peperiksaan SPM (Exam Mode)
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Uji kefahaman sebenar anda dalam format peperiksaan KSSM. Dijana secara rawak daripada bank <b>460+ soalan berkualiti tinggi</b> lengkap dengan ulasan skema pemarkahan.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="font-bold text-slate-800 text-xs">Pilihan Set Peperiksaan:</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-200 text-xs">
                    <div className="font-extrabold text-sky-900 flex items-center gap-1">
                      <span>📘 Set Tingkatan 4</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">10 soalan rawak merangkumi Bab 1 hingga Bab 8 T4.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs">
                    <div className="font-extrabold text-indigo-900 flex items-center gap-1">
                      <span>📙 Set Tingkatan 5</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">10 soalan rawak merangkumi Bab 1 hingga Bab 5 T5.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs">
                    <div className="font-extrabold text-amber-950 flex items-center gap-1">
                      <span>🏆 SPM Maya (Semua)</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">Simulasi penuh SPM rawak merentas semua 13 bab.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-600" />
                  <span className="font-extrabold text-slate-900 text-xs">
                    Sistem 24 Koleksi Lencana Eksplorasi:
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Setiap kali anda membaca subtopik, menjawab kuiz formatif, dan menamatkan Exam Mode, anda akan meraih mata ganjaran XP serta membuka <b>24 lencana eksklusif</b> (cth: <i>Jaguh Stoikiometri, Pakar Siri Elektrokimia, Arkitek Molekul Karbon, Tokoh Kimiawan Muda</i>).
                </p>
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>
                    <b>Papan Juara Murid SPM:</b> Nama, sekolah, dan negeri anda akan dipaparkan dalam ranking kebangsaan secara langsung!
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AKSES PERCUMA VS VIP */}
          {activeTab === 'akses' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Akses Percuma vs Kod Akses Khas VIP
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pelajar boleh membuat tinjauan dan ulangkaji secara percuma sebelum mendapatkan akses penuh.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Free Tier */}
                <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                      Akses Percuma (Free Log In)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                      Akaun Google
                    </span>
                  </div>
                  <ul className="text-[11px] text-slate-600 space-y-2">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><b>T4:</b> Bab 1 (Pengenalan), Bab 2 (Jirim), Bab 8 (Bahan Buatan).</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><b>T5:</b> Bab 5 (Kimia Konsumer & Industri).</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><b>2 kali percubaan penuh</b> Mod Peperiksaan (Exam Mode).</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Pengumpulan mata ganjaran XP & paparan ranking kebangsaan.</span>
                    </li>
                  </ul>
                </div>

                {/* VIP Tier */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 via-indigo-50 to-amber-50 border-2 border-purple-300 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-purple-950 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Akses VIP Penuh</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-200 text-purple-900">
                      Kod Akses Khas
                    </span>
                  </div>
                  <ul className="text-[11px] text-slate-700 space-y-2">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                      <span><b>Semua 13 Bab Terbuka</b> tanpa had (T4 Bab 1–8 & T5 Bab 1–5).</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                      <span><b>Exam Mode Tanpa Had:</b> Latih tubi soalan rawak tanpa had percubaan.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                      <span>Akses seumur hidup terikat dengan akaun Google rasmi anda.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                      <span>Peluang memenangi keseluruhan 24 koleksi lencana kejuaraan.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-xs text-indigo-950 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Dapatkan Kod Akses Khas unik anda terus daripada Cikgu Hafreez.</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Soalan Lazim (FAQ)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Jawapan kepada soalan biasa murid dan guru mengenai aplikasi ini.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <div className="font-bold text-slate-900 text-xs">
                    Adakah kandungan nota ini mematuhi sukatan SPM terkini?
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Ya, 100% selaras dengan <b>Dokumen Standard Kurikulum dan Pentaksiran (DSKP) KSSM Kimia SPM</b> serta Buku Teks Rasmi Kementerian Pendidikan Malaysia (KPM).
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <div className="font-bold text-slate-900 text-xs">
                    Bolehkah saya membuka web app ini di telefon pintar atau tablet?
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Boleh! Web app ini telah dioptimumkan sepenuhnya (*fully responsive*) untuk iPhone, Android, iPad/Tablet, mahupun Laptop/Komputer Desktop.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <div className="font-bold text-slate-900 text-xs">
                    Bagaimana jika saya ingin mengulang semula soalan kuiz?
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Anda boleh menjawab kuiz di hujung setiap bab berulang kali. Rekod markah terbaik dan mata XP akan disimpan pada akaun Google anda.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <div className="font-bold text-slate-900 text-xs">
                    Bolehkah Kod Akses Khas VIP dikongsi dengan kawan?
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Setiap Kod Akses Khas dijana unik dan hanya boleh ditebus sekali oleh satu akaun Google murid sahaja.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200/90 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-slate-500 font-medium hidden sm:block">
            Nota Kimia SPM KSSM • Cikgu Hafreez
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-full liquid-glass-pill-sky text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ml-auto"
          >
            <span>Faham & Mula Belajar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
