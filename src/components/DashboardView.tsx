import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Zap,
  TestTube,
  Calculator,
  Compass,
  ArrowRight,
  Award,
  Trophy,
  LayoutGrid,
  SlidersHorizontal
} from 'lucide-react';
import { CHAPTERS_METADATA } from '../data/chaptersIndex';
import { FormLevel, UserStudyProgress, ChapterMeta } from '../types/nota';
import { GoogleUser } from '../types/auth';
import { isChapterAccessible, isAdminEmail } from '../utils/auth';
import { ChapterBentoCard } from './ChapterBentoCard';
import { ChapterCarousel } from './ChapterCarousel';
import { AchievementBoard } from './AchievementBoard';
import { KeyRound, ShieldAlert, User } from 'lucide-react';

interface Props {
  userProgress: UserStudyProgress;
  onOpenChapter: (chapterId: string) => void;
  onOpenExpressNote?: (chapterId: string) => void;
  onOpenExamMode?: (mode?: 'T4' | 'T5' | 'ALL') => void;
  onResumeLastRead: () => void;
  onOpenQuickRef: (modal: 'periodic' | 'electrode' | 'ion' | 'formula') => void;
  currentUser: GoogleUser | null;
  onOpenAccessModal: (meta?: ChapterMeta, reason?: 'chapter' | 'exam' | 'manual') => void;
  onOpenLoginModal?: () => void;
  onOpenAdminDashboard?: () => void;
}

export const DashboardView: React.FC<Props> = ({
  userProgress,
  onOpenChapter,
  onOpenExpressNote,
  onOpenExamMode,
  onResumeLastRead,
  onOpenQuickRef,
  currentUser,
  onOpenAccessModal,
  onOpenLoginModal,
  onOpenAdminDashboard,
}) => {
  const [activeFormTab, setActiveFormTab] = useState<FormLevel>('T4');
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const isAdmin = currentUser?.role === 'admin' || (currentUser && isAdminEmail(currentUser.email));

  const filteredChapters = CHAPTERS_METADATA.filter((c) => c.form === activeFormTab);

  // Compute overall progress stats
  const totalSubtopicsPossible = 68; // T4 Bab 1-8 (44 subtopik) + T5 Bab 1-5 (24 subtopik) = 68 subtopik lengkap!
  const totalCompleted = userProgress.completedSubtopics.length;
  const overallPercentage = Math.min(100, Math.round((totalCompleted / totalSubtopicsPossible) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Hero & Progress Tracker Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Ecosystem Hero Welcome (7 Cols) */}
        <div className="lg:col-span-7 apple-glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-white via-sky-50/30 to-indigo-50/20 border border-slate-200/90 relative overflow-hidden">
          <div className="space-y-4 relative z-10">
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none pt-1">
                Nota Padat Kimia
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed max-w-xl font-normal">
                Bahan rujukan padat, berketepatan skema pemarkahan Lembaga Peperiksaan Malaysia, lengkap dengan <b>Mod Hafalan (Blur Mode)</b>, Kad Imbas interaktif, Kuiz Kilat dan integrasi simulasi makmal maya.
              </p>
            </div>
          </div>

          {/* Quick Stats & Action Button */}
          <div className="pt-6 mt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-sky-600" />
                <span><b>13 Bab</b> Silibus KSSM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>Skema Pemarkahan SPM</span>
              </div>
            </div>

            {userProgress.lastReadSubtopicId && (
              <button
                onClick={onResumeLastRead}
                className="px-4 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                <span>Sambung Bacaan Terakhir</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Progress Tracker Widget (5 Cols) - Deep Navy Blue Liquid Glass */}
        <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-[#071322] via-[#0B1E3B] to-[#0A182F] text-white border border-sky-500/30 shadow-xl shadow-blue-950/40 relative overflow-hidden group">
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-sky-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-sky-500/30 transition-all duration-500" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-sky-200 uppercase tracking-widest flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-400/30 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-300" />
                </div>
                <span>Kemajuan Ulang Kaji Anda</span>
              </h3>
              <span className="text-xs font-mono font-bold text-sky-200 bg-sky-950/80 border border-sky-500/30 px-2.5 py-1 rounded-xl shadow-inner">
                {totalCompleted} Subtopik Selesai
              </span>
            </div>

            <div className="flex items-baseline gap-3 my-2">
              <span className="text-5xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-teal-200 to-emerald-300 drop-shadow-[0_2px_12px_rgba(56,189,248,0.4)]">
                {overallPercentage}%
              </span>
              <span className="text-xs text-slate-300 font-semibold tracking-wide">
                Ulang kaji siap keseluruhan
              </span>
            </div>

            {/* Glowing Navy Glass Progress Bar */}
            <div className="w-full h-3.5 rounded-full bg-slate-900/90 border border-white/10 overflow-hidden p-0.5 shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 via-teal-400 to-emerald-400 transition-all duration-700 shadow-[0_0_14px_rgba(56,189,248,0.6)]"
                style={{ width: `${Math.max(5, overallPercentage)}%` }}
              />
            </div>
          </div>

          <div className="pt-5 mt-5 border-t border-white/10 space-y-3 relative z-10">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors backdrop-blur-md">
                <div className="text-[11px] text-sky-300 font-bold flex items-center justify-between">
                  <span>Tingkatan 4</span>
                  <span className="text-[10px] text-sky-400/80 font-mono">8 Bab</span>
                </div>
                <div className="text-sm font-black text-white mt-1">Bab 1 - 8 (Lengkap 100%)</div>
                <div className="text-[10px] text-slate-300 mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>44 Subtopik Lengkap</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors backdrop-blur-md">
                <div className="text-[11px] text-indigo-300 font-bold flex items-center justify-between">
                  <span>Tingkatan 5</span>
                  <span className="text-[10px] text-indigo-400/80 font-mono">5 Bab</span>
                </div>
                <div className="text-sm font-black text-white mt-1">Bab 1 - 5 (Lengkap 100%)</div>
                <div className="text-[10px] text-slate-300 mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>24 Subtopik Lengkap</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('achievement-board-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-sky-500/20 hover:from-sky-500/30 hover:to-indigo-500/30 border border-sky-400/30 text-sky-200 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer hover:border-sky-400/50"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span>Buka Papan Pencapaian & Juara SPM</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Achievement Board & SPM Hall of Fame Section */}
      <div id="achievement-board-section">
        <AchievementBoard
          userProgress={userProgress}
          currentUser={currentUser}
          onOpenAdminDashboard={onOpenAdminDashboard}
        />
      </div>

      {/* Bar Rujukan Pantas Peperiksaan (Quick Reference Buttons) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-4 h-4 text-sky-600" />
            Bar Rujukan Pantas Peperiksaan SPM
          </h2>
          <span className="text-xs text-slate-400">Jadual, siri & formula penting</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <button
            onClick={() => onOpenQuickRef('periodic')}
            className="p-3.5 sm:p-4 rounded-3xl liquid-glass-pill hover:border-sky-300 text-left group flex items-center sm:items-start gap-2.5 sm:gap-3 cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors truncate">
                Jadual Berkala Unsur
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">
                Struktur atom & Kala/Kumpulan
              </p>
            </div>
          </button>

          <button
            onClick={() => onOpenQuickRef('electrode')}
            className="p-3.5 sm:p-4 rounded-3xl liquid-glass-pill hover:border-indigo-300 text-left group flex items-center sm:items-start gap-2.5 sm:gap-3 cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                Siri E° & Elektrokimia
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">
                Nilai E° & agen redoks
              </p>
            </div>
          </button>

          <button
            onClick={() => onOpenQuickRef('ion')}
            className="p-3.5 sm:p-4 rounded-3xl liquid-glass-pill hover:border-teal-300 text-left group flex items-center sm:items-start gap-2.5 sm:gap-3 cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <TestTube className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-teal-600 transition-colors truncate">
                Ujian Kation & Anion
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">
                Penapis warna & reagen khas
              </p>
            </div>
          </button>

          <button
            onClick={() => onOpenQuickRef('formula')}
            className="p-3.5 sm:p-4 rounded-3xl liquid-glass-pill hover:border-amber-300 text-left group flex items-center sm:items-start gap-2.5 sm:gap-3 cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors truncate">
                Formula Penting SPM
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">
                Mol, titratan, haba & voltan
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Mod Peperiksaan SPM (Exam Mode Banner) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white shadow-xl shadow-amber-600/20 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-md">
            <Trophy className="w-3.5 h-3.5 text-amber-200" />
            <span>Ciri Baharu • Uji Kefahaman SPM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            Mod Peperiksaan SPM (Exam Mode)
          </h2>
          <p className="text-xs sm:text-sm text-amber-50 leading-relaxed font-medium">
            Jawab 10 soalan aneka pilihan yang dijana secara rawak daripada bank 460+ soalan silibus KSSM lengkap dengan analisis skema pemarkahan & ganjaran XP!
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 relative z-10 w-full md:w-auto">
          <button
            type="button"
            onClick={() => onOpenExamMode?.('T4')}
            className="w-full sm:w-auto liquid-glass-pill-sky px-4 py-2.5 rounded-full text-xs font-black cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <span>📘 Set Tingkatan 4</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenExamMode?.('T5')}
            className="w-full sm:w-auto liquid-glass-pill-indigo px-4 py-2.5 rounded-full text-xs font-black cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <span>📙 Set Tingkatan 5</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenExamMode?.('ALL')}
            className="w-full sm:w-auto liquid-glass-pill-amber px-4 py-2.5 rounded-full text-xs font-black cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-100" />
            <span>🏆 SPM Maya (Semua)</span>
          </button>
        </div>
      </div>

      {/* Account Tier & Access Privilege Notice */}
      {isAdmin ? (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-purple-500/15 via-indigo-500/15 to-purple-500/15 border border-purple-300/80 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-indigo-700 text-white flex items-center justify-center font-bold shrink-0 shadow-sm shadow-purple-500/30">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-purple-950 uppercase tracking-wider">
                  👑 Panel Pentadbir Utama (Cikgu Hafreez)
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-300">
                  Akses Penuh Pentadbir
                </span>
              </div>
              <p className="text-xs text-purple-950/90 mt-0.5 leading-relaxed">
                Selamat kembali, Cikgu Hafreez! Anda boleh memantau data pendaftaran murid, menjana kod akses khas VIP, dan menyemak semua kandungan secara menyeluruh.
              </p>
            </div>
          </div>

          {onOpenAdminDashboard && (
            <button
              type="button"
              onClick={onOpenAdminDashboard}
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:opacity-95 text-white font-extrabold text-xs shadow-md shadow-purple-500/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Buka Dashboard Pentadbir</span>
            </button>
          )}
        </div>
      ) : !currentUser?.isPremium ? (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-300/80 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold shrink-0 shadow-sm shadow-amber-500/30">
              <KeyRound className="w-5 h-5 text-amber-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-amber-950 uppercase tracking-wider">
                  {currentUser ? 'Akaun Google Percuma' : 'Mod Teroka (Pelawat)'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  {currentUser ? '4 Bab Terbuka' : 'Teroka Percuma'}
                </span>
              </div>
              <p className="text-xs text-amber-900/90 mt-0.5 leading-relaxed">
                {currentUser
                  ? 'Anda sedang mengakses T4 Bab 1, 2, 8 & T5 Bab 5 serta 2 kali percubaan Exam Mode. Kalau berpuas hati, tebus Kod Akses Khas untuk membuka semua 13 bab tanpa had.'
                  : 'Anda boleh scroll dan meneroka web app ini secara bebas. Sila log masuk dengan akaun Google anda untuk mula membaca 4 topik percuma, mengumpul XP dan mencuba Exam Mode.'}
              </p>
            </div>
          </div>

          {!currentUser ? (
            <button
              type="button"
              onClick={onOpenLoginModal}
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 active:scale-98 text-white font-extrabold text-xs shadow-md shadow-sky-500/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              <User className="w-3.5 h-3.5" />
              <span>Log Masuk Google Percuma</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onOpenAccessModal(undefined, 'manual')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 active:scale-98 text-white font-extrabold text-xs shadow-md shadow-amber-500/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Tebus Kod Akses VIP</span>
            </button>
          )}
        </div>
      ) : (
        <div className="p-3.5 sm:p-4 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-sky-500/10 border border-emerald-300/80 backdrop-blur-md flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
              <Sparkles className="w-4 h-4 text-emerald-200" />
            </div>
            <div>
              <span className="text-xs font-black text-emerald-950">
                Akses Penuh VIP Aktif
              </span>
              <span className="text-[11px] text-emerald-800 ml-2 hidden sm:inline">
                Semua 13 Bab & Exam Mode Tanpa Had diaktifkan sepenuhnya untuk akaun anda.
              </span>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
            ⭐ 13/13 Bab Dibuka
          </span>
        </div>
      )}

      {/* Chapter Selection Tab Switcher, Layout Toggle & Carousel View */}
      <div className="space-y-6 pt-2">
        {/* Navigation & Controls Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
          {/* Tingkatan Switcher - Liquid Glass Design */}
          <div className="flex items-center gap-3">
            <div className="flex liquid-glass-capsule p-1.5 rounded-full">
              <button
                onClick={() => setActiveFormTab('T4')}
                className={`px-5 py-2 rounded-full text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                  activeFormTab === 'T4'
                    ? 'liquid-glass-pill-sky text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <span>Tingkatan 4</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                  activeFormTab === 'T4' ? 'bg-white/25 text-white' : 'bg-slate-200/80 text-slate-700'
                }`}>
                  8 Bab
                </span>
              </button>

              <button
                onClick={() => setActiveFormTab('T5')}
                className={`px-5 py-2 rounded-full text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                  activeFormTab === 'T5'
                    ? 'liquid-glass-pill-indigo text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <span>Tingkatan 5</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                  activeFormTab === 'T5' ? 'bg-white/25 text-white' : 'bg-slate-200/80 text-slate-700'
                }`}>
                  5 Bab
                </span>
              </button>
            </div>

            <div className="text-xs text-slate-500 hidden md:block">
              {activeFormTab === 'T4' ? (
                <span className="flex items-center gap-1.5 liquid-glass-pill px-3 py-1 rounded-full text-sky-900 font-semibold text-xs">
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                  Silibus DSKP Tingkatan 4
                </span>
              ) : (
                <span className="flex items-center gap-1.5 liquid-glass-pill px-3 py-1 rounded-full text-indigo-950 font-semibold text-xs">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                  Silibus DSKP Tingkatan 5
                </span>
              )}
            </div>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 liquid-glass-capsule p-1 rounded-full">
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'carousel'
                  ? 'liquid-glass-pill text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
              title="Paparan Leret Melintang"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Leret</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'grid'
                  ? 'liquid-glass-pill text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
              title="Paparan Grid Komprehensif"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid Bento</span>
            </button>
          </div>
        </div>

        {/* Display Content: Carousel vs Grid */}
        {viewMode === 'carousel' ? (
          <div className="animate-in fade-in duration-300">
            <ChapterCarousel
              chapters={filteredChapters}
              completedSubtopics={userProgress.completedSubtopics}
              onOpenChapter={onOpenChapter}
              onOpenExpressNote={onOpenExpressNote}
              form={activeFormTab}
              isChapterLocked={(id) => !isChapterAccessible(id, currentUser)}
              onOpenAccessModal={(meta) => onOpenAccessModal(meta, 'chapter')}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {filteredChapters.map((meta) => {
              const completedCount = userProgress.completedSubtopics.filter((id) =>
                id.startsWith(`${meta.id}-`)
              ).length;
              const isLocked = !isChapterAccessible(meta.id, currentUser);

              return (
                <ChapterBentoCard
                  key={meta.id}
                  meta={meta}
                  completedSubtopicsCount={completedCount}
                  onOpenChapter={onOpenChapter}
                  onOpenExpressNote={onOpenExpressNote}
                  isLocked={isLocked}
                  onOpenAccessModal={(m) => onOpenAccessModal(m, 'chapter')}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
