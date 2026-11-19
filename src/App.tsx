import React, { useState, useEffect, useRef } from 'react';
import { FULL_CHAPTERS, getChapterById } from './data/chaptersIndex';
import { TopBar } from './components/TopBar';
import { DashboardView } from './components/DashboardView';
import { InteractiveReader } from './components/InteractiveReader';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { PeriodicTableModal } from './components/modals/PeriodicTableModal';
import { ElectrochemicalSeriesModal } from './components/modals/ElectrochemicalSeriesModal';
import { IonTestModal } from './components/modals/IonTestModal';
import { FormulaModal } from './components/modals/FormulaModal';
import { IntegratedSimulationModal } from './components/modals/IntegratedSimulationModal';
import { NotaExpressModal } from './components/modals/NotaExpressModal';
import { ExamModeModal } from './components/modals/ExamModeModal';
import { GoogleLoginModal } from './components/modals/GoogleLoginModal';
import { AccessCodeModal } from './components/modals/AccessCodeModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';
import { UserGuideModal } from './components/modals/UserGuideModal';
import { Send, MessageCircle, Sparkles } from 'lucide-react';
import { ExamMode } from './data/examQuestions';
import {
  getInitialProgress,
  recordLastRead,
  toggleSubtopicComplete,
  recordQuizScore,
  createEmptyProgress,
  clearGuestProgress,
} from './utils/storage';
import { SearchResultItem, UserStudyProgress, ChapterMeta, FormLevel } from './types/nota';
import { GoogleUser } from './types/auth';
import {
  getCurrentUser,
  saveCurrentUser,
  isChapterAccessible,
  hasFullAccess,
  incrementExamAttempts,
} from './utils/auth';
import { syncUserProfile, logKeluarFirebase, subscribeAuthState } from './services/firebase';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'reader'>('dashboard');
  const [activeChapterId, setActiveChapterId] = useState<string>('t4-b1');
  const [activeSubtopicId, setActiveSubtopicId] = useState<string>('t4-b1-s1');
  // Authentication State (Google Sign-In)
  const [currentUser, setCurrentUser] = useState<GoogleUser | null>(() => getCurrentUser());
  const progressOwnerRef = useRef<string | null>(currentUser?.email?.toLowerCase().trim() || null);
  const [userProgress, setUserProgress] = useState<UserStudyProgress>(() =>
    getInitialProgress(currentUser?.email)
  );
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginTriggerReason, setLoginTriggerReason] = useState<string | undefined>(undefined);

  // Access Code Modal State (Redemption)
  const [accessModalOpen, setAccessModalOpen] = useState(false);
  const [accessModalReason, setAccessModalReason] = useState<'chapter' | 'exam' | 'manual'>('manual');
  const [accessModalChapterTitle, setAccessModalChapterTitle] = useState<string | undefined>(undefined);

  // Admin Dashboard Modal State
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Quick Reference & Feature Modals state
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [userGuideOpen, setUserGuideOpen] = useState(false);
  const [activeQuickRef, setActiveQuickRef] = useState<'periodic' | 'electrode' | 'ion' | 'formula' | null>(null);
  const [activeSimulationId, setActiveSimulationId] = useState<string | null>(null);
  const [activeExpressChapterId, setActiveExpressChapterId] = useState<string | null>(null);
  const [examModalOpen, setExamModalOpen] = useState(false);
  const [examInitialMode, setExamInitialMode] = useState<ExamMode>('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const computeUserStats = (progress: UserStudyProgress) => {
    const completedCount = progress.completedSubtopics.length;
    const quizEntries = Object.entries(progress.quizScores);
    const totalQuestions = quizEntries.reduce((acc, [, q]) => acc + q.total, 0);
    const totalCorrect = quizEntries.reduce((acc, [, q]) => acc + q.score, 0);
    const quizAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const perfectQuizzes = quizEntries.filter(([, q]) => q.score === q.total && q.total > 0).length;
    const examCount = quizEntries.filter(([k]) => k.startsWith('exam-')).length;
    const userXP = completedCount * 100 + totalCorrect * 20 + perfectQuizzes * 50 + examCount * 80;
    return { completedCount, quizAccuracy, userXP };
  };

  // Sync auth state changes across windows/events & restore Firebase Auth session
  useEffect(() => {
    const handleAuthChange = () => {
      const nextUser = getCurrentUser();
      const nextEmail = nextUser?.email?.toLowerCase().trim() || null;
      if (progressOwnerRef.current !== nextEmail) {
        progressOwnerRef.current = nextEmail;
        setUserProgress(nextEmail ? getInitialProgress(nextEmail) : createEmptyProgress());
      }
      setCurrentUser(nextUser);
    };
    window.addEventListener('auth_state_changed', handleAuthChange);

    const unsubscribe = subscribeAuthState((fbUser) => {
      const localUser = getCurrentUser();
      const localEmail = localUser?.email?.toLowerCase().trim() || null;
      if (fbUser && localUser && localEmail && fbUser.uid === localUser.id) {
        const scopedProgress = getInitialProgress(localEmail);
        const { completedCount, quizAccuracy, userXP } = computeUserStats(scopedProgress);

        syncUserProfile({
          ...localUser,
          xp: userXP,
          completedSubtopicsCount: completedCount,
          quizAccuracy,
          studyProgress: scopedProgress,
        }).catch(() => {});
      }
    });

    return () => {
      window.removeEventListener('auth_state_changed', handleAuthChange);
      unsubscribe();
    };
  }, []);

  // Automatically sync live XP, progress, and login presence to Firestore ONLY when owner matches
  useEffect(() => {
    if (!currentUser || !currentUser.email) return;
    const activeEmail = currentUser.email.toLowerCase().trim();
    if (progressOwnerRef.current !== activeEmail) return;

    const { completedCount, quizAccuracy, userXP } = computeUserStats(userProgress);

    syncUserProfile({
      ...currentUser,
      xp: userXP,
      completedSubtopicsCount: completedCount,
      quizAccuracy,
      studyProgress: userProgress,
    }).catch(() => {});
  }, [currentUser?.id, currentUser?.email, currentUser?.name, currentUser?.school, currentUser?.state, userProgress]);

  // Keyboard shortcut for Search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setUserGuideOpen(false);
        setActiveQuickRef(null);
        setActiveSimulationId(null);
        setActiveExpressChapterId(null);
        setExamModalOpen(false);
        setAccessModalOpen(false);
        setLoginModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenAccessModal = (
    chapterMeta?: { form: FormLevel; chapterNumber: number; title: string },
    reason: 'chapter' | 'exam' | 'manual' = 'manual'
  ) => {
    if (!currentUser) {
      setLoginTriggerReason('Sila log masuk dengan akaun Google anda terlebih dahulu sebelum menyemak atau menebus Kod Akses Khas.');
      setLoginModalOpen(true);
      return;
    }
    if (hasFullAccess(currentUser)) {
      showToast('👑 Anda sedang menggunakan Akses Penuh Pentadbir (Semua Ciri Terbuka).');
      return;
    }
    setAccessModalReason(reason);
    if (chapterMeta) {
      setAccessModalChapterTitle(`${chapterMeta.form} Bab ${chapterMeta.chapterNumber}: ${chapterMeta.title}`);
    } else {
      setAccessModalChapterTitle(undefined);
    }
    setAccessModalOpen(true);
  };

  const handleOpenChapter = (chapterId: string) => {
    if (!currentUser) {
      const isFree = isChapterAccessible(chapterId, false);
      if (isFree) {
        setLoginTriggerReason('Sila log masuk dengan akaun Google anda untuk mula membaca topik percuma ini dan menyimpan kemajuan ulang kaji anda.');
      } else {
        setLoginTriggerReason('Topik ini memerlukan akaun. Sila log masuk dengan akaun Google anda untuk menyemak status akses atau menebus Kod Akses Khas.');
      }
      setLoginModalOpen(true);
      return;
    }

    // Check tier access: Free only allows T4 Bab 1, 2, 8 and T5 Bab 5
    if (!isChapterAccessible(chapterId, currentUser)) {
      const chapter = getChapterById(chapterId);
      handleOpenAccessModal(chapter, 'chapter');
      return;
    }

    const chapter = getChapterById(chapterId);
    if (!chapter) {
      showToast('Bab ini sedang dimuatkan.');
      return;
    }

    // If previously read a subtopic in this chapter, resume it
    const subtopicToOpen =
      userProgress.lastReadChapterId === chapterId && userProgress.lastReadSubtopicId
        ? userProgress.lastReadSubtopicId
        : chapter.subtopics[0].id;

    setActiveChapterId(chapterId);
    setActiveSubtopicId(subtopicToOpen);
    setCurrentView('reader');

    const updated = recordLastRead(chapterId, subtopicToOpen, userProgress, currentUser?.email);
    setUserProgress(updated);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenExpressNote = (chapterId: string) => {
    if (!currentUser) {
      setLoginTriggerReason('Sila log masuk dengan akaun Google anda untuk mengakses Nota Express mind map ringkas.');
      setLoginModalOpen(true);
      return;
    }

    // Check tier access for Nota Express as well
    if (!isChapterAccessible(chapterId, currentUser)) {
      const chapter = getChapterById(chapterId);
      handleOpenAccessModal(chapter, 'chapter');
      return;
    }

    setActiveExpressChapterId(chapterId);
  };

  const handleSelectSubtopic = (subtopicId: string) => {
    setActiveSubtopicId(subtopicId);
    const updated = recordLastRead(activeChapterId, subtopicId, userProgress, currentUser?.email);
    setUserProgress(updated);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResumeLastRead = () => {
    if (!currentUser) {
      setLoginTriggerReason('Sila log masuk dengan akaun Google anda untuk meneruskan bacaan dan merekod kemajuan ulang kaji.');
      setLoginModalOpen(true);
      return;
    }

    if (userProgress.lastReadChapterId && userProgress.lastReadSubtopicId) {
      const chapter = getChapterById(userProgress.lastReadChapterId);
      if (chapter && isChapterAccessible(chapter.id, currentUser)) {
        setActiveChapterId(chapter.id);
        setActiveSubtopicId(userProgress.lastReadSubtopicId);
        setCurrentView('reader');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }
    // Default fallback to T4 Bab 1 (free chapter)
    handleOpenChapter('t4-b1');
  };

  const handleOpenExamMode = (mode: ExamMode = 'ALL') => {
    if (!currentUser) {
      setLoginTriggerReason('Sila log masuk dengan akaun Google anda untuk mencuba Mod Peperiksaan SPM (2 kali percubaan percuma).');
      setLoginModalOpen(true);
      return;
    }

    // If free tier and attempts >= 2, prompt access code modal
    if (!hasFullAccess(currentUser) && (currentUser.examAttemptsCount || 0) >= 2) {
      handleOpenAccessModal(undefined, 'exam');
      return;
    }

    setExamInitialMode(mode);
    setExamModalOpen(true);
  };

  const handleExamStarted = () => {
    if (currentUser) {
      const updated = incrementExamAttempts(currentUser);
      setCurrentUser(updated);
      syncUserProfile(updated).catch(() => {});
    }
  };

  const handleToggleComplete = (subtopicId: string) => {
    const updated = toggleSubtopicComplete(subtopicId, userProgress, currentUser?.email);
    setUserProgress(updated);
  };

  const handleRecordQuiz = (subtopicId: string, score: number, total: number) => {
    const updated = recordQuizScore(subtopicId, score, total, userProgress, currentUser?.email);
    setUserProgress(updated);
  };

  const handleSelectSearchResult = (item: SearchResultItem) => {
    if (!currentUser) {
      setLoginModalOpen(true);
      return;
    }

    if (!isChapterAccessible(item.chapterId, currentUser)) {
      const chapter = getChapterById(item.chapterId);
      handleOpenAccessModal(chapter, 'chapter');
      return;
    }

    const chapter = getChapterById(item.chapterId);
    if (chapter) {
      setActiveChapterId(chapter.id);
      if (item.subtopicId) {
        setActiveSubtopicId(item.subtopicId);
      } else {
        setActiveSubtopicId(chapter.subtopics[0].id);
      }
      setCurrentView('reader');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showToast(`Bab ${item.chapterNumber}: ${item.chapterTitle} akan dilengkapkan dalam Fasa 2.`);
    }
  };

  const handleSignOut = () => {
    logKeluarFirebase().catch(() => {});
    saveCurrentUser(null);
    clearGuestProgress();
    progressOwnerRef.current = null;
    setCurrentUser(null);
    setUserProgress(createEmptyProgress());
    setCurrentView('dashboard');
    showToast('Anda telah berjaya log keluar.');
  };

  const activeChapter = getChapterById(activeChapterId) || FULL_CHAPTERS[0];
  const activeSubtopic = activeChapter.subtopics.find((s) => s.id === activeSubtopicId) || activeChapter.subtopics[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-sky-500/20 selection:text-sky-900">
      {/* Sticky Top Bar with User Authentication & Ecosystem */}
      <TopBar
        currentView={currentView}
        activeChapter={activeChapter}
        activeSubtopicTitle={activeSubtopic?.title}
        onGoHome={() => {
          setCurrentView('dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenExamMode={() => handleOpenExamMode('ALL')}
        onOpenUserGuide={() => setUserGuideOpen(true)}
        currentUser={currentUser}
        onOpenLoginModal={() => {
          setLoginTriggerReason('Log masuk dengan akaun Google anda untuk mula membaca topik percuma, mengumpul XP, dan membuka lencana.');
          setLoginModalOpen(true);
        }}
        onOpenAccessModal={() => handleOpenAccessModal(undefined, 'manual')}
        onOpenAdminDashboard={() => setAdminModalOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* Main View Area */}
      <div className="flex-1">
        {currentView === 'dashboard' ? (
          <DashboardView
            userProgress={userProgress}
            onOpenChapter={handleOpenChapter}
            onOpenExpressNote={handleOpenExpressNote}
            onOpenExamMode={(mode) => handleOpenExamMode(mode || 'ALL')}
            onResumeLastRead={handleResumeLastRead}
            onOpenQuickRef={(modal) => setActiveQuickRef(modal)}
            currentUser={currentUser}
            onOpenAccessModal={handleOpenAccessModal}
            onOpenLoginModal={() => {
              setLoginTriggerReason('Log masuk dengan akaun Google anda untuk mula membaca topik percuma, mengumpul XP, dan membuka lencana.');
              setLoginModalOpen(true);
            }}
            onOpenAdminDashboard={() => setAdminModalOpen(true)}
          />
        ) : (
          <InteractiveReader
            chapter={activeChapter}
            activeSubtopicId={activeSubtopicId}
            userProgress={userProgress}
            onSelectSubtopic={handleSelectSubtopic}
            onToggleComplete={handleToggleComplete}
            onRecordQuizScore={handleRecordQuiz}
            onOpenSimulation={(simId) => setActiveSimulationId(simId)}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white/70 backdrop-blur-md py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-700">
            <a href="https://simulasikimia.cikguhafreez.my/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors">
              Simulasi Kimia Maya
            </a>
            <span>•</span>
            <a href="https://erph-pintar.cikguhafreez.my/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">
              eRPH Pintar STEM
            </a>
            <span>•</span>
            <a href="https://t.me/amierulhafreez" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#0088cc] hover:underline font-bold">
              <Send className="w-3.5 h-3.5" /> Telegram Cikgu Hafreez
            </a>
            <span>•</span>
            <a href="https://wa.me/amierulhafreez" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#25D366] hover:underline font-bold">
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Cikgu Hafreez
            </a>
            <span>•</span>
            <a href="https://cikguhafreez.my/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors">
              Portal Rasmi Cikgu Hafreez
            </a>
          </div>
          <p className="text-[11px] text-slate-400">
            Nota Kimia SPM KSSM (by Cikgu Hafreez) • Disesuaikan 100% Mengikut DSKP & Skema Pemarkahan SPM
          </p>
        </div>
      </footer>

      {/* Google Login Modal (triggered on demand when accessing free/locked chapters, exam mode, or profile) */}
      <GoogleLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={(user) => {
          const nextEmail = user.email.toLowerCase().trim();
          const nextProgress = user.studyProgress || getInitialProgress(nextEmail);
          progressOwnerRef.current = nextEmail;
          setCurrentUser(user);
          setUserProgress(nextProgress);
          setLoginModalOpen(false);
          showToast(`Selamat kembali, ${user.name}!`);
        }}
        triggerReason={loginTriggerReason}
      />

      {/* Kod Akses Khas Redemption Modal */}
      <AccessCodeModal
        isOpen={accessModalOpen}
        currentUser={currentUser}
        onClose={() => setAccessModalOpen(false)}
        onSuccess={(updatedUser) => {
          setCurrentUser(updatedUser);
          showToast('🎉 Akses Penuh VIP diaktifkan! Semua bab & Exam Mode kini terbuka.');
        }}
        lockedChapterTitle={accessModalChapterTitle}
        reason={accessModalReason}
      />

      {/* Admin Dashboard & Monitoring Modal */}
      <AdminDashboardModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        currentUser={currentUser}
      />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />

      {/* User Guide Modal (Panduan Penggunaan Pelajar) */}
      <UserGuideModal
        isOpen={userGuideOpen}
        onClose={() => setUserGuideOpen(false)}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenExamMode={() => handleOpenExamMode('ALL')}
        onOpenQuickRef={(ref) => setActiveQuickRef(ref)}
      />

      {/* Quick Reference Modals */}
      <PeriodicTableModal
        isOpen={activeQuickRef === 'periodic'}
        onClose={() => setActiveQuickRef(null)}
      />
      <ElectrochemicalSeriesModal
        isOpen={activeQuickRef === 'electrode'}
        onClose={() => setActiveQuickRef(null)}
      />
      <IonTestModal
        isOpen={activeQuickRef === 'ion'}
        onClose={() => setActiveQuickRef(null)}
      />
      <FormulaModal
        isOpen={activeQuickRef === 'formula'}
        onClose={() => setActiveQuickRef(null)}
      />

      {/* Integrated In-App Interactive Simulation Pop-Up Modal */}
      <IntegratedSimulationModal
        simulationId={activeSimulationId}
        onClose={() => setActiveSimulationId(null)}
      />

      {/* Nota Express (Peta Minda 1 Halaman) Pop-Up Modal */}
      <NotaExpressModal
        chapterId={activeExpressChapterId}
        isOpen={!!activeExpressChapterId}
        onClose={() => setActiveExpressChapterId(null)}
        onOpenFullChapter={handleOpenChapter}
      />

      {/* Mod Peperiksaan SPM (Exam Mode) Pop-Up Modal */}
      <ExamModeModal
        isOpen={examModalOpen}
        initialMode={examInitialMode}
        onClose={() => setExamModalOpen(false)}
        onRecordScore={handleRecordQuiz}
        isPremium={currentUser?.isPremium ?? false}
        examAttemptsCount={currentUser?.examAttemptsCount ?? 0}
        onOpenAccessModal={() => {
          setExamModalOpen(false);
          handleOpenAccessModal(undefined, 'exam');
        }}
        onExamStarted={handleExamStarted}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in slide-in-from-bottom-5 duration-200">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
