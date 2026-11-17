import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ExternalLink,
  BookMarked,
  Home,
  ChevronRight,
  Sparkles,
  Send,
  MessageCircle,
  Trophy,
  User,
  LogOut,
  KeyRound,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { Chapter } from '../types/nota';
import { GoogleUser } from '../types/auth';
import { isAdminEmail, createAdminUser } from '../utils/auth';

interface Props {
  currentView: 'dashboard' | 'reader';
  activeChapter?: Chapter;
  activeSubtopicTitle?: string;
  onGoHome: () => void;
  onOpenSearch: () => void;
  onOpenExamMode?: () => void;
  currentUser: GoogleUser | null;
  onOpenLoginModal: () => void;
  onOpenAccessModal: () => void;
  onOpenAdminDashboard?: () => void;
  onSignOut: () => void;
}

export const TopBar: React.FC<Props> = ({
  currentView,
  activeChapter,
  activeSubtopicTitle,
  onGoHome,
  onOpenSearch,
  onOpenExamMode,
  currentUser,
  onOpenLoginModal,
  onOpenAccessModal,
  onOpenAdminDashboard,
  onSignOut,
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isAdmin = currentUser?.role === 'admin' || (currentUser && isAdminEmail(currentUser.email));

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 apple-glass border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-3">
        {/* Left: Brand & Navigation */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onGoHome}
            className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 via-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform shrink-0">
              <BookMarked className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="font-black text-slate-900 tracking-tight text-base sm:text-xl md:text-2xl leading-none">
                Nota Kimia
              </span>
              <span className="text-[11px] sm:text-sm font-semibold text-slate-500 tracking-tight whitespace-nowrap">
                by Cikgu Hafreez
              </span>
            </div>
          </button>

          {/* Breadcrumb if in Reader view */}
          {currentView === 'reader' && activeChapter && (
            <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-slate-200 text-xs text-slate-500 truncate">
              <button
                onClick={onGoHome}
                className="hover:text-slate-800 flex items-center gap-1 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <span className="font-semibold text-slate-700 truncate">
                {activeChapter.form} Bab {activeChapter.chapterNumber}
              </span>
              {activeSubtopicTitle && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                  <span className="text-slate-500 truncate max-w-[180px]">
                    {activeSubtopicTitle}
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 min-w-[120px] max-w-md mx-1 sm:mx-2">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-slate-500 hover:text-slate-800 rounded-full liquid-glass-capsule hover:bg-white/90 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors shrink-0" />
              <span className="truncate">Cari topik, warna mendakan, formula, ion...</span>
            </div>
            <kbd className="hidden md:inline-flex items-center px-2 py-0.5 text-[10px] font-semibold text-slate-500 bg-white/80 rounded-full border border-slate-200/80 shadow-2xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Ecosystem, Contact & User Authentication */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {onOpenExamMode && (
            <button
              type="button"
              onClick={onOpenExamMode}
              className="liquid-glass-pill-amber flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-black cursor-pointer select-none"
              title="Uji Kefahaman dalam Mod Peperiksaan (10 Soalan Rawak)"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-100" />
              <span className="hidden sm:inline">Exam Mode</span>
            </button>
          )}

          <a
            href="https://simulasikimia.cikguhafreez.my/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full liquid-glass-pill-sky text-white text-xs font-bold transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span className="hidden md:inline">Simulasi Kimia</span>
            <ExternalLink className="w-3 h-3 text-white/80" />
          </a>

          {/* Admin Dashboard Quick Button */}
          {isAdmin && onOpenAdminDashboard && (
            <button
              type="button"
              onClick={onOpenAdminDashboard}
              className="liquid-glass-pill-purple flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-black cursor-pointer"
              title="Buka Panel Kawalan Pentadbir Cikgu Hafreez"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Dashboard Admin</span>
            </button>
          )}

          {/* User Account / Google Sign In Section */}
          {currentUser ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="liquid-glass-pill flex items-center gap-2 p-1 sm:px-3 sm:py-1 rounded-full cursor-pointer"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover border border-white/80 shadow-2xs"
                />
                <div className="hidden md:flex flex-col text-left leading-tight">
                  <span className="text-xs font-bold text-slate-800 truncate max-w-[100px]">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    {isAdmin ? (
                      <span className="text-purple-600 font-black flex items-center gap-0.5">
                        👑 Admin
                      </span>
                    ) : currentUser.isPremium ? (
                      <span className="text-amber-600 font-extrabold flex items-center gap-0.5">
                        <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                        VIP
                      </span>
                    ) : (
                      <span className="text-slate-500">Percuma</span>
                    )}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 z-50 space-y-2.5 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs font-extrabold text-slate-900 truncate flex items-center justify-between">
                      <span>{currentUser.name}</span>
                      {isAdmin && (
                        <span className="text-[10px] font-black bg-purple-100 text-purple-700 px-1.5 py-0.2 rounded-md border border-purple-200">
                          👑 Pentadbir
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate font-mono">
                      {currentUser.email}
                    </div>
                    {currentUser.school && (
                      <div className="text-[10px] text-indigo-700 font-semibold truncate mt-1 flex items-center gap-1">
                        <span>🏫</span>
                        <span className="truncate">{currentUser.school}</span>
                        {currentUser.state && <span className="text-slate-400">({currentUser.state})</span>}
                      </div>
                    )}
                    <div className="mt-2 pt-2 border-t border-slate-200/70 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Status Akses:</span>
                      {isAdmin ? (
                        <span className="font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-300">
                          👑 Pentadbir Penuh
                        </span>
                      ) : currentUser.isPremium ? (
                        <span className="font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                          ⭐ Akses Penuh (VIP)
                        </span>
                      ) : (
                        <span className="font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded-full">
                          Percuma (4 Bab)
                        </span>
                      )}
                    </div>
                  </div>

                  {isAdmin && onOpenAdminDashboard && (
                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        onOpenAdminDashboard();
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:opacity-95 text-white font-extrabold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Buka Dashboard Pentadbir</span>
                    </button>
                  )}

                  {!currentUser.isPremium && !isAdmin && (
                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        onOpenAccessModal();
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>Tebus Kod Akses Khas</span>
                    </button>
                  )}

                  {!isAdmin && (
                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        createAdminUser(currentUser.email);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs border border-purple-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>👑 Aktifkan Akses Penuh Admin</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      onSignOut();
                    }}
                    className="w-full py-2 px-3 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-slate-400" />
                    <span>Log Keluar</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenLoginModal}
              className="liquid-glass-pill flex items-center gap-2 px-3.5 py-1.5 rounded-full text-slate-800 text-xs font-extrabold cursor-pointer"
            >
              {/* Google G logo */}
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Log Masuk</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
