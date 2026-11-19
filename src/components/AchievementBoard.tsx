import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Trophy,
  Award,
  Zap,
  Target,
  CheckCircle2,
  Users,
  Flame,
  Star,
  Sparkles,
  Lock,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  BookOpen,
  Search,
  X,
  Maximize2,
  RefreshCw,
} from 'lucide-react';
import { UserStudyProgress } from '../types/nota';
import { GoogleUser } from '../types/auth';
import { isAdminEmail, getAllRegisteredStudents } from '../utils/auth';
import { fetchAllStudentsRemote, syncUserProfile, subscribeAuthState } from '../services/firebase';

interface Props {
  userProgress: UserStudyProgress;
  currentUser?: GoogleUser | null;
  onOpenAdminDashboard?: () => void;
}

interface Badge {
  id: string;
  name: string;
  category: 'belajar' | 'kuiz' | 'amali' | 'peperiksaan';
  description: string;
  icon: string;
  unlocked: boolean;
  progressText: string;
}

interface LeaderboardUser {
  rank: number;
  name: string;
  school: string;
  state: string;
  completedSubtopics: number;
  quizAccuracy: number;
  xp: number;
  isCurrentUser?: boolean;
}

export const AchievementBoard: React.FC<Props> = ({
  userProgress,
  currentUser,
  onOpenAdminDashboard,
}) => {
  const [activeTab, setActiveTab] = useState<'pencapaian' | 'juara'>('pencapaian');
  const isAdmin = !!(currentUser && isAdminEmail(currentUser.email));
  const [isBadgesMinimized, setIsBadgesMinimized] = useState<boolean>(true);
  const [badgePage, setBadgePage] = useState<number>(0);
  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem('nota_kimia_student_name') || 'Calon SPM Cemerlang';
  });
  const [studentSchool, setStudentSchool] = useState(() => {
    return localStorage.getItem('nota_kimia_student_school') || 'Sekolah Calon SPM';
  });
  const [studentState, setStudentState] = useState(() => {
    return localStorage.getItem('nota_kimia_student_state') || 'Malaysia';
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(studentName);
  const [tempSchool, setTempSchool] = useState(studentSchool);
  const [tempState, setTempState] = useState(studentState);

  // Real Leaderboard & Full Ranking Modal State
  const [remoteStudents, setRemoteStudents] = useState<GoogleUser[]>(() => getAllRegisteredStudents());
  const [isRefreshingLeaderboard, setIsRefreshingLeaderboard] = useState(false);
  const [fullRankingModalOpen, setFullRankingModalOpen] = useState(false);
  const [rankingSearchQuery, setRankingSearchQuery] = useState('');

  const loadLeaderboardUsers = async () => {
    setIsRefreshingLeaderboard(true);
    try {
      const students = await fetchAllStudentsRemote();
      if (students) {
        setRemoteStudents(students);
      }
    } catch (err) {
      console.warn('Error loading leaderboard users:', err);
    } finally {
      setIsRefreshingLeaderboard(false);
    }
  };

  useEffect(() => {
    loadLeaderboardUsers();
    const unsub = subscribeAuthState((fbUser) => {
      if (fbUser) {
        loadLeaderboardUsers();
      }
    });
    return () => unsub();
  }, [activeTab, currentUser?.email]);

  // Sync profile reactively whenever auth state changes
  useEffect(() => {
    const syncProfile = () => {
      const hasUser = !!localStorage.getItem('nota_kimia_google_user');
      const name = hasUser ? (localStorage.getItem('nota_kimia_student_name') || 'Calon SPM Cemerlang') : 'Calon SPM Cemerlang';
      const school = hasUser ? (localStorage.getItem('nota_kimia_student_school') || 'Sekolah Calon SPM') : 'Sekolah Calon SPM';
      const state = hasUser ? (localStorage.getItem('nota_kimia_student_state') || 'Malaysia') : 'Malaysia';
      setStudentName(name);
      setStudentSchool(school);
      setStudentState(state);
      setTempName(name);
      setTempSchool(school);
      setTempState(state);
    };

    window.addEventListener('auth_state_changed', syncProfile);
    window.addEventListener('storage', syncProfile);
    return () => {
      window.removeEventListener('auth_state_changed', syncProfile);
      window.removeEventListener('storage', syncProfile);
    };
  }, []);

  // Compute User Statistics
  const completedCount = userProgress.completedSubtopics.length;
  const quizEntries = Object.entries(userProgress.quizScores);
  const totalQuizzesTaken = quizEntries.length;
  const totalQuestions = quizEntries.reduce((acc, [, q]) => acc + q.total, 0);
  const totalCorrect = quizEntries.reduce((acc, [, q]) => acc + q.score, 0);
  const quizAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const perfectQuizzes = quizEntries.filter(([, q]) => q.score === q.total && q.total > 0).length;

  // Exam Mode Statistics
  const examEntries = quizEntries.filter(([k]) => k.startsWith('exam-'));
  const examCount = examEntries.length;
  const examPercentages = examEntries.map(([, q]) => (q.total > 0 ? Math.round((q.score / q.total) * 100) : 0));
  const maxExamScore = examPercentages.length > 0 ? Math.max(...examPercentages) : 0;
  const hasExamA = examPercentages.some((score) => score >= 80);

  // Subtopic completions per chapter
  const t4b3Count = userProgress.completedSubtopics.filter((id) => id.startsWith('t4-b3')).length;
  const t4b4Count = userProgress.completedSubtopics.filter((id) => id.startsWith('t4-b4')).length;
  const t4b5Count = userProgress.completedSubtopics.filter((id) => id.startsWith('t4-b5')).length;
  const t4b6Count = userProgress.completedSubtopics.filter((id) => id.startsWith('t4-b6') || id.startsWith('t4-bab6')).length;
  const t4b7Count = userProgress.completedSubtopics.filter((id) => id.startsWith('t4-b7')).length;
  const t4b8Count = userProgress.completedSubtopics.filter((id) => id.startsWith('t4-b8')).length;
  const t5b1Count = userProgress.completedSubtopics.filter((id) => id.startsWith('t5-b1') || id.startsWith('t5-bab1')).length;
  const t5b2Count = userProgress.completedSubtopics.filter((id) => id.startsWith('t5-b2')).length;
  const t5b3Count = userProgress.completedSubtopics.filter((id) => id.startsWith('t5-b3')).length;
  const t5b4Count = userProgress.completedSubtopics.filter((id) => id.startsWith('t5-b4')).length;
  const t5b5Count = userProgress.completedSubtopics.filter((id) => id.startsWith('t5-b5')).length;

  // XP Points Calculation: 100 XP per subtopic + 20 XP per correct quiz question + 50 XP per perfect quiz + 80 XP per exam taken
  const userXP = completedCount * 100 + totalCorrect * 20 + perfectQuizzes * 50 + examCount * 80;

  // Rank Determination
  const getRankInfo = (xp: number) => {
    if (xp >= 2000) return { title: 'Lagenda Elit Kimia SPM', level: 6, color: 'from-amber-400 via-rose-500 to-purple-600', nextXp: 3000 };
    if (xp >= 1500) return { title: 'Jaguh Kimia SPM Kebangsaan', level: 5, color: 'from-amber-400 to-yellow-500', nextXp: 2000 };
    if (xp >= 1000) return { title: 'Pakar Teori & Amali SPM', level: 4, color: 'from-indigo-500 to-purple-600', nextXp: 1500 };
    if (xp >= 500) return { title: 'Ahli Kimia Muda Pro', level: 3, color: 'from-sky-500 to-blue-600', nextXp: 1000 };
    if (xp >= 200) return { title: 'Penolong Makmal Berbakat', level: 2, color: 'from-teal-400 to-emerald-500', nextXp: 500 };
    return { title: 'Perantis Kimia KSSM', level: 1, color: 'from-slate-400 to-slate-600', nextXp: 200 };
  };

  const rankInfo = getRankInfo(userXP);

  // 24 Badges Definitions (Grouped into 3 sets of 8 badges)
  const badges: Badge[] = [
    // --- SET 1: ASAS & MOMENTUM KECEMERLANGAN (Lencana 1–8) ---
    {
      id: 'first_step',
      name: 'Langkah Pertama',
      category: 'belajar',
      description: 'Selesaikan ulang kaji subtopik pertama anda dengan jayanya',
      icon: '🌱',
      unlocked: completedCount >= 1,
      progressText: `${Math.min(1, completedCount)}/1 Subtopik`,
    },
    {
      id: 'acid_salt_master',
      name: 'Pakar Asid, Bes & Garam',
      category: 'belajar',
      description: 'Lengkapkan sekurang-kurangnya 5 subtopik dalam T4 Bab 6',
      icon: '🧪',
      unlocked: t4b6Count >= 5,
      progressText: `${Math.min(5, t4b6Count)}/5 Subtopik`,
    },
    {
      id: 'redox_pro',
      name: 'Penakluk Redoks & Siri E°',
      category: 'belajar',
      description: 'Lengkapkan sekurang-kurangnya 3 subtopik dalam T5 Bab 1 Redoks',
      icon: '⚡',
      unlocked: t5b1Count >= 3,
      progressText: `${Math.min(3, t5b1Count)}/3 Subtopik`,
    },
    {
      id: 'sharp_shooter',
      name: 'Penembak Tepat Kuiz',
      category: 'kuiz',
      description: 'Raih markah 100% penuh dalam mana-mana Kuiz Kilat SPM',
      icon: '🎯',
      unlocked: perfectQuizzes >= 1,
      progressText: `${perfectQuizzes} Skor Penuh`,
    },
    {
      id: 'quiz_master',
      name: 'Jaguh Kuiz SPM',
      category: 'kuiz',
      description: 'Jawab sekurang-kurangnya 5 kuiz dengan jayanya',
      icon: '🏆',
      unlocked: totalQuizzesTaken >= 5,
      progressText: `${Math.min(5, totalQuizzesTaken)}/5 Kuiz`,
    },
    {
      id: 'high_accuracy',
      name: 'Ketepatan Skema Emas',
      category: 'kuiz',
      description: 'Mencapai purata ketepatan jawapan kuiz melebihi 85% (min. 10 soalan)',
      icon: '🎖️',
      unlocked: totalQuestions >= 10 && quizAccuracy >= 85,
      progressText: `${quizAccuracy}% (Min. 85%)`,
    },
    {
      id: 'consistent_scholar',
      name: 'Ilmuan Berdisiplin',
      category: 'belajar',
      description: 'Lengkapkan sekurang-kurangnya 8 subtopik silibus KSSM',
      icon: '📚',
      unlocked: completedCount >= 8,
      progressText: `${Math.min(8, completedCount)}/8 Subtopik`,
    },
    {
      id: 'champion_alchemist',
      name: 'Alchemist Cikgu Hafreez',
      category: 'amali',
      description: 'Kumpul 1,000 XP dan capai gelaran Pakar Teori & Amali SPM',
      icon: '👑',
      unlocked: userXP >= 1000,
      progressText: `${Math.min(1000, userXP)}/1,000 XP`,
    },

    // --- SET 2: PENGUASAAN SILIBUS & MOD PEPERIKSAAN (Lencana 9–16) ---
    {
      id: 'carbon_architect',
      name: 'Arkitek Sebatian Karbon',
      category: 'belajar',
      description: 'Kuasai sekurang-kurangnya 3 subtopik T5 Bab 2 Sebatian Karbon',
      icon: '💎',
      unlocked: t5b2Count >= 3,
      progressText: `${Math.min(3, t5b2Count)}/3 Subtopik`,
    },
    {
      id: 'thermochem_titan',
      name: 'Jaguh Termokimia SPM',
      category: 'belajar',
      description: 'Kuasai sekurang-kurangnya 2 subtopik T5 Bab 3 Termokimia & Haba',
      icon: '🔥',
      unlocked: t5b3Count >= 2,
      progressText: `${Math.min(2, t5b3Count)}/2 Subtopik`,
    },
    {
      id: 'stoichiometry_king',
      name: 'Raja Stoikiometri & Mol',
      category: 'belajar',
      description: 'Selesaikan sekurang-kurangnya 3 subtopik T4 Bab 3 Konsep Mol & Formula',
      icon: '🧮',
      unlocked: t4b3Count >= 3,
      progressText: `${Math.min(3, t4b3Count)}/3 Subtopik`,
    },
    {
      id: 'periodic_explorer',
      name: 'Peneroka Jadual Berkala',
      category: 'belajar',
      description: 'Selesaikan sekurang-kurangnya 3 subtopik T4 Bab 4 Jadual Berkala Unsur',
      icon: '🗺️',
      unlocked: t4b4Count >= 3,
      progressText: `${Math.min(3, t4b4Count)}/3 Subtopik`,
    },
    {
      id: 'bond_maestro',
      name: 'Maestro Ikatan Kimia',
      category: 'belajar',
      description: 'Kuasai sekurang-kurangnya 3 subtopik T4 Bab 5 Ikatan Kimia & Daya',
      icon: '🔗',
      unlocked: t4b5Count >= 3,
      progressText: `${Math.min(3, t4b5Count)}/3 Subtopik`,
    },
    {
      id: 'reaction_strategist',
      name: 'Pakar Kadar Tindak Balas',
      category: 'belajar',
      description: 'Selesaikan sekurang-kurangnya 3 subtopik T4 Bab 7 Kadar Tindak Balas',
      icon: '⏱️',
      unlocked: t4b7Count >= 3,
      progressText: `${Math.min(3, t4b7Count)}/3 Subtopik`,
    },
    {
      id: 'exam_warrior',
      name: 'Pendekar Mod Peperiksaan',
      category: 'peperiksaan',
      description: 'Selesaikan sekurang-kurangnya 1 sesi simulasi Mod Peperiksaan SPM',
      icon: '⚔️',
      unlocked: examCount >= 1,
      progressText: `${Math.min(1, examCount)}/1 Sesi Peperiksaan`,
    },
    {
      id: 'spm_elite_scorer',
      name: 'Calon Cemerlang A+ Peperiksaan',
      category: 'peperiksaan',
      description: 'Raih gred Cemerlang (skor ≥ 80%) dalam Mod Peperiksaan SPM',
      icon: '🌟',
      unlocked: hasExamA,
      progressText: `${maxExamScore}% (Min. 80%)`,
    },

    // --- SET 3: LEGASI ELIT & PENGUASAAN SEMPURNA KSSM (Lencana 17–24) ---
    {
      id: 'polymer_expert',
      name: 'Pakar Kimia Polimer',
      category: 'belajar',
      description: 'Selesaikan sekurang-kurangnya 2 subtopik T5 Bab 4 Polimer & Getah Asli',
      icon: '🧬',
      unlocked: t5b4Count >= 2,
      progressText: `${Math.min(2, t5b4Count)}/2 Subtopik`,
    },
    {
      id: 'consumer_tech',
      name: 'Pakar Kimia Konsumer & Nano',
      category: 'belajar',
      description: 'Selesaikan sekurang-kurangnya 3 subtopik T5 Bab 5 Kimia Konsumer & Industri',
      icon: '🧴',
      unlocked: t5b5Count >= 3,
      progressText: `${Math.min(3, t5b5Count)}/3 Subtopik`,
    },
    {
      id: 'materials_specialist',
      name: 'Pakar Bahan Buatan & Aloi',
      category: 'belajar',
      description: 'Selesaikan sekurang-kurangnya 2 subtopik T4 Bab 8 Bahan Buatan',
      icon: '⚙️',
      unlocked: t4b8Count >= 2,
      progressText: `${Math.min(2, t4b8Count)}/2 Subtopik`,
    },
    {
      id: 'halfway_legend',
      name: 'Wira Separuh Silibus',
      category: 'belajar',
      description: 'Selesaikan sekurang-kurangnya 15 subtopik KSSM merentasi Tingkatan 4 & 5',
      icon: '🏅',
      unlocked: completedCount >= 15,
      progressText: `${Math.min(15, completedCount)}/15 Subtopik`,
    },
    {
      id: 'marathon_grandmaster',
      name: 'Grandmaster Kuiz SPM',
      category: 'kuiz',
      description: 'Selesaikan sekurang-kurangnya 10 siri kuiz dan peperiksaan SPM',
      icon: '🏛️',
      unlocked: totalQuizzesTaken >= 10,
      progressText: `${Math.min(10, totalQuizzesTaken)}/10 Siri`,
    },
    {
      id: 'perfect_scorer_club',
      name: 'Kelab 100% Markah Mutlak',
      category: 'kuiz',
      description: 'Capai markah 100% penuh dalam sekurang-kurangnya 3 kuiz berbeza',
      icon: '💫',
      unlocked: perfectQuizzes >= 3,
      progressText: `${Math.min(3, perfectQuizzes)}/3 Skor Penuh`,
    },
    {
      id: 'xp_legend_2000',
      name: 'Legasi 2,000 XP Terunggul',
      category: 'amali',
      description: 'Kumpul 2,000 XP dan julang gelaran Lagenda Elit Kimia SPM',
      icon: '🌠',
      unlocked: userXP >= 2000,
      progressText: `${Math.min(2000, userXP)}/2,000 XP`,
    },
    {
      id: 'perfect_kssm_completion',
      name: 'Khatam Kimia SPM 100% KSSM',
      category: 'amali',
      description: 'Selesaikan 25 subtopik ke atas dalam platform Nota Kimia Cikgu Hafreez',
      icon: '🎓',
      unlocked: completedCount >= 25,
      progressText: `${Math.min(25, completedCount)}/25 Subtopik`,
    },
  ];

  const unlockedBadgesCount = badges.filter((b) => b.unlocked).length;

  // Pagination / Carousel constants (Sets of 8)
  const BADGES_PER_PAGE = 8;
  const totalBadgePages = Math.ceil(badges.length / BADGES_PER_PAGE); // 3 Pages

  const PAGE_METADATA = [
    {
      id: 0,
      label: 'Set 1 (Lencana 1–8)',
      shortTitle: 'Asas & Momentum',
      title: 'Set 1: Asas & Momentum Kecemerlangan',
      unlockedCount: badges.slice(0, 8).filter((b) => b.unlocked).length,
    },
    {
      id: 1,
      label: 'Set 2 (Lencana 9–16)',
      shortTitle: 'Silibus & Peperiksaan',
      title: 'Set 2: Penguasaan Silibus & Mod Peperiksaan',
      unlockedCount: badges.slice(8, 16).filter((b) => b.unlocked).length,
    },
    {
      id: 2,
      label: 'Set 3 (Lencana 17–24)',
      shortTitle: 'Legasi Elit',
      title: 'Set 3: Legasi Elit & Penguasaan Sempurna',
      unlockedCount: badges.slice(16, 24).filter((b) => b.unlocked).length,
    },
  ];

  const currentBadgePageItems = badges.slice(
    badgePage * BADGES_PER_PAGE,
    (badgePage + 1) * BADGES_PER_PAGE
  );

  const handlePrevPage = () => {
    setBadgePage((prev) => (prev > 0 ? prev - 1 : totalBadgePages - 1));
  };

  const handleNextPage = () => {
    setBadgePage((prev) => (prev < totalBadgePages - 1 ? prev + 1 : 0));
  };

  // Build Leaderboard from all real logged-in users
  const currentUserLeaderboardItem: LeaderboardUser = {
    rank: 0,
    name: studentName,
    school: studentSchool,
    state: studentState,
    completedSubtopics: completedCount,
    quizAccuracy: quizAccuracy,
    xp: userXP,
    isCurrentUser: true,
  };

  const mergedUsersMap = new Map<string, LeaderboardUser>();
  remoteStudents.forEach((u) => {
    if (!u || !u.email || isAdminEmail(u.email) || u.role === 'admin') return;
    const emailKey = u.email.toLowerCase().trim();
    const isMe = !!(currentUser && !isAdmin && currentUser.email.toLowerCase().trim() === emailKey);
    mergedUsersMap.set(emailKey, {
      rank: 0,
      name: isMe ? studentName : (u.name || 'Calon Kimia SPM'),
      school: isMe ? studentSchool : (u.school || 'Sekolah Calon SPM'),
      state: isMe ? studentState : (u.state || 'Malaysia'),
      completedSubtopics: isMe ? completedCount : (u.completedSubtopicsCount || 0),
      quizAccuracy: isMe ? quizAccuracy : (u.quizAccuracy || 0),
      xp: isMe ? userXP : (u.xp || 0),
      isCurrentUser: isMe,
    });
  });

  // Ensure current logged-in student (or guest preview) is always represented
  if (!isAdmin) {
    if (currentUser?.email) {
      const myKey = currentUser.email.toLowerCase().trim();
      if (!mergedUsersMap.has(myKey)) {
        mergedUsersMap.set(myKey, currentUserLeaderboardItem);
      }
    } else {
      mergedUsersMap.set('__guest__', currentUserLeaderboardItem);
    }
  }

  const combinedLeaderboard: LeaderboardUser[] = Array.from(mergedUsersMap.values())
    .sort((a, b) => {
      if (b.xp !== a.xp) return b.xp - a.xp;
      if (b.completedSubtopics !== a.completedSubtopics) return b.completedSubtopics - a.completedSubtopics;
      if (b.quizAccuracy !== a.quizAccuracy) return b.quizAccuracy - a.quizAccuracy;
      return a.name.localeCompare(b.name);
    })
    .map((item, index) => ({ ...item, rank: index + 1 }));

  const top10Leaderboard = combinedLeaderboard.slice(0, 10);
  const currentUserEntry = combinedLeaderboard.find((u) => u.isCurrentUser);
  const isOutsideTop10 = !isAdmin && !!currentUserEntry && currentUserEntry.rank > 10;

  const filteredFullRanking = combinedLeaderboard.filter((u) => {
    if (!rankingSearchQuery.trim()) return true;
    const q = rankingSearchQuery.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.school.toLowerCase().includes(q) ||
      u.state.toLowerCase().includes(q)
    );
  });

  const handleSaveProfile = () => {
    if (tempName.trim()) {
      setStudentName(tempName.trim());
      localStorage.setItem('nota_kimia_student_name', tempName.trim());
    }
    if (tempSchool.trim()) {
      setStudentSchool(tempSchool.trim());
      localStorage.setItem('nota_kimia_student_school', tempSchool.trim());
    }
    if (tempState.trim()) {
      setStudentState(tempState.trim());
      localStorage.setItem('nota_kimia_student_state', tempState.trim());
    }

    // Sync to GoogleUser & Firestore if present
    try {
      const rawUser = localStorage.getItem('nota_kimia_google_user');
      if (rawUser) {
        const u = JSON.parse(rawUser);
        u.name = tempName.trim() || u.name;
        u.school = tempSchool.trim() || u.school;
        u.state = tempState.trim() || u.state;
        localStorage.setItem('nota_kimia_google_user', JSON.stringify(u));
        syncUserProfile(u).catch(() => {});
        window.dispatchEvent(new Event('auth_state_changed'));
      }
    } catch (e) {
      console.error(e);
    }

    setIsEditingName(false);
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-6">
      {/* Board Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Dewan Kegemilangan SPM
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500 shrink-0" />
            <span>Papan Pencapaian & Juara Murid SPM</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Pantau 24 lencana kecemerlangan, ketepatan jawapan kuiz, dan rekod mata ganjaran calon Kimia SPM.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl shrink-0 self-start sm:self-center">
          <button
            onClick={() => setActiveTab('pencapaian')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'pencapaian'
                ? 'bg-white text-indigo-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4 text-indigo-600" />
            <span>Pencapaian Saya</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-50 text-indigo-700 font-mono font-bold">
              {unlockedBadgesCount}/{badges.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('juara')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'juara'
                ? 'bg-white text-amber-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>Ranking Kimia Cikgu Hafreez</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-50 text-amber-800 font-mono font-bold">
              Top 10
            </span>
          </button>
        </div>
      </div>

      {activeTab === 'pencapaian' ? (
        /* TAB 1: PENCAPAIAN SAYA */
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* User Profile & Rank Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-lg relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Left Profile Info */}
              {isAdmin ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-200" />
                      <span>👑 Pentadbir Sistem Utama</span>
                    </span>
                    <span className="text-xs text-purple-300 font-semibold">Cikgu Hafreez</span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                      <span>Cikgu Hafreez</span>
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-purple-200/90 font-medium">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                        <span>Guru Pembina & Pentadbir Nota Kimia SPM</span>
                      </span>
                      <span>•</span>
                      <span className="text-amber-300 font-semibold">Mod Pemantauan (Dikecualikan daripada Ranking)</span>
                    </div>
                  </div>

                  {onOpenAdminDashboard && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={onOpenAdminDashboard}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:opacity-95 text-white text-xs font-black shadow-md shadow-purple-600/30 flex items-center gap-2 cursor-pointer transition-all hover:scale-102"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Buka Dashboard Pentadbir & Jana Kod</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r ${rankInfo.color} text-slate-950 shadow-sm`}>
                      Level {rankInfo.level}
                    </span>
                    <span className="text-xs text-sky-300 font-semibold">{rankInfo.title}</span>
                  </div>

                  <div>
                    {isEditingName ? (
                      <div className="p-3 rounded-2xl bg-white/10 border border-sky-400/40 space-y-2.5 max-w-md">
                        <div>
                          <label className="text-[10px] text-sky-200 font-bold block mb-0.5">Nama Penuh Calon:</label>
                          <input
                            type="text"
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            className="w-full bg-white/15 border border-sky-400/50 rounded-xl px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                            placeholder="Nama calon..."
                            maxLength={35}
                            autoFocus
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-sky-200 font-bold block mb-0.5">Nama Sekolah:</label>
                          <input
                            type="text"
                            value={tempSchool}
                            onChange={(e) => setTempSchool(e.target.value)}
                            className="w-full bg-white/15 border border-sky-400/50 rounded-xl px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                            placeholder="Nama sekolah..."
                            maxLength={50}
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-sky-200 font-bold block mb-0.5">Negeri:</label>
                          <input
                            type="text"
                            value={tempState}
                            onChange={(e) => setTempState(e.target.value)}
                            className="w-full bg-white/15 border border-sky-400/50 rounded-xl px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                            placeholder="Negeri..."
                            maxLength={25}
                          />
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setIsEditingName(false)}
                            className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer"
                          >
                            Batal
                          </button>
                          <button
                            type="button"
                            onClick={handleSaveProfile}
                            className="px-4 py-1 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                          >
                            Simpan Profil
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                            {studentName}
                          </h3>
                          <button
                            type="button"
                            onClick={() => {
                              setTempName(studentName);
                              setTempSchool(studentSchool);
                              setTempState(studentState);
                              setIsEditingName(true);
                            }}
                            className="text-[11px] text-sky-400 hover:text-sky-300 underline cursor-pointer"
                          >
                            Ubah Nama & Sekolah
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-sky-200/90 font-medium">
                          <GraduationCap className="w-4 h-4 text-sky-300 shrink-0" />
                          <span>{studentSchool}</span>
                          <span className="text-sky-400/60">•</span>
                          <span className="text-sky-300 font-semibold">{studentState}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed max-w-lg">
                    Teruskan mengulang kaji nota, menduduki Mod Peperiksaan SPM, dan menguasai kata kunci skema untuk membuka kesemua 24 lencana elit!
                  </p>
                </div>
              )}

              {/* Right: XP Metrics */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 min-w-[200px] space-y-2 text-center md:text-right shrink-0">
                <div className="text-[11px] text-sky-200 font-semibold uppercase tracking-wider flex items-center justify-center md:justify-end gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>Mata Pengalaman (XP)</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-emerald-300">
                  {userXP.toLocaleString()} XP
                </div>
                <div className="text-[10px] text-slate-300">
                  Sasaran seterusnya: <b>{rankInfo.nextXp} XP</b>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 mt-5 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] text-slate-400 font-semibold">Subtopik Siap</div>
                <div className="text-lg font-black text-sky-300 mt-0.5">{completedCount} Subtopik</div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] text-slate-400 font-semibold">Kuiz & Peperiksaan</div>
                <div className="text-lg font-black text-amber-300 mt-0.5">{totalQuizzesTaken} Sesi</div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] text-slate-400 font-semibold">Ketepatan Jawapan</div>
                <div className="text-lg font-black text-emerald-300 mt-0.5">{quizAccuracy}%</div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] text-slate-400 font-semibold">Lencana Dimenangi</div>
                <div className="text-lg font-black text-purple-300 mt-0.5">{unlockedBadgesCount} / {badges.length}</div>
              </div>
            </div>
          </div>

          {/* Badges Section with Minimize & Carousel Box (Sets of 8) */}
          <div className="space-y-3">
            {/* Carousel Header & Main Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-indigo-50/70 via-white to-purple-50/40 border border-indigo-100 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <span>Koleksi 24 Lencana Kecemerlangan SPM</span>
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {unlockedBadgesCount} daripada {badges.length} Lencana Terbuka (Susunan Berlapan)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                {/* Carousel Navigator Arrows (only active when expanded) */}
                {!isBadgesMinimized && (
                  <div className="flex items-center bg-white rounded-xl border border-indigo-200/90 p-0.5 shadow-2xs">
                    <button
                      onClick={handlePrevPage}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 transition-colors cursor-pointer active:scale-95"
                      title="Set Lencana Sebelumnya"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="px-2 text-[11px] font-mono font-bold text-indigo-900">
                      {badgePage + 1} / {totalBadgePages}
                    </span>
                    <button
                      onClick={handleNextPage}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 transition-colors cursor-pointer active:scale-95"
                      title="Set Lencana Seterusnya"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Minimize / Expand Toggle Button */}
                <button
                  onClick={() => setIsBadgesMinimized(!isBadgesMinimized)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer liquid-glass-pill text-indigo-950 active:scale-95"
                  title={isBadgesMinimized ? "Kembangkan paparan lencana" : "Kecilkan (Minimize) paparan lencana"}
                >
                  {isBadgesMinimized ? (
                    <>
                      <ChevronDown className="w-4 h-4 text-indigo-600" />
                      <span>Papar Lencana ({unlockedBadgesCount}/{badges.length})</span>
                    </>
                  ) : (
                    <>
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                      <span>Kecilkan (Minimize)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Badges Carousel Box (Collapsible) */}
            {!isBadgesMinimized && (
              <div className="space-y-3.5 animate-in fade-in duration-200">
                {/* Set Pills / Direct Jump Tabs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {PAGE_METADATA.map((meta) => {
                    const isActive = badgePage === meta.id;
                    return (
                      <button
                        key={meta.id}
                        onClick={() => setBadgePage(meta.id)}
                        className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          isActive
                            ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white border-indigo-700 shadow-md ring-2 ring-indigo-400/40'
                            : 'bg-white hover:bg-indigo-50/50 text-slate-700 border-slate-200/80 shadow-2xs'
                        }`}
                      >
                        <div className="truncate">
                          <div className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-indigo-200' : 'text-slate-400'}`}>
                            {meta.label}
                          </div>
                          <div className={`text-xs font-extrabold truncate ${isActive ? 'text-white' : 'text-slate-800'}`}>
                            {meta.shortTitle}
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                          }`}
                        >
                          {meta.unlockedCount} / 8 Dibuka
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Sub-header showing active set description */}
                <div className="flex items-center justify-between px-1 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{PAGE_METADATA[badgePage].title}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Lencana {(badgePage * BADGES_PER_PAGE) + 1} – {(badgePage + 1) * BADGES_PER_PAGE} daripada 24
                  </div>
                </div>

                {/* Carousel Container: 8 Badges Grid (4 cols x 2 rows on large screen) */}
                <div className="p-4 sm:p-5 rounded-3xl bg-slate-50/70 border border-slate-200/80 backdrop-blur-sm shadow-inner transition-all">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    {currentBadgePageItems.map((b) => (
                      <div
                        key={b.id}
                        className={`p-4 rounded-3xl border transition-all flex flex-col justify-between space-y-3 relative group ${
                          b.unlocked
                            ? 'bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/50 border-indigo-200/90 shadow-xs hover:border-indigo-400 hover:shadow-md'
                            : 'bg-white/80 border-slate-200/80 opacity-70 hover:opacity-90'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs shrink-0 transition-transform group-hover:scale-105 ${
                              b.unlocked
                                ? 'bg-white border border-indigo-100 shadow-sm'
                                : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            {b.icon}
                          </div>

                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                              b.unlocked
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            {b.unlocked ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Dibuka</span>
                              </>
                            ) : (
                              <>
                                <Lock className="w-3 h-3 text-slate-400" />
                                <span>Terkunci</span>
                              </>
                            )}
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className={`text-xs font-black tracking-tight ${b.unlocked ? 'text-slate-900' : 'text-slate-700'}`}>
                              {b.name}
                            </h4>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                            {b.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-100/90 flex items-center justify-between text-[10px] font-mono">
                          <span className="text-slate-400">Kemajuan:</span>
                          <span className={b.unlocked ? 'font-bold text-indigo-700' : 'text-slate-500'}>
                            {b.progressText}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Carousel Bottom Indicator Dots & Quick Jump */}
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                    <button
                      onClick={handlePrevPage}
                      className="text-xs font-bold text-slate-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Sebelum</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {PAGE_METADATA.map((meta) => (
                        <button
                          key={meta.id}
                          onClick={() => setBadgePage(meta.id)}
                          className={`h-2.5 rounded-full transition-all cursor-pointer ${
                            badgePage === meta.id
                              ? 'w-7 bg-indigo-600 shadow-xs'
                              : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                          }`}
                          title={meta.title}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleNextPage}
                      className="text-xs font-bold text-slate-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Seterusnya</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* TAB 2: RANKING KIMIA CIKGU HAFREEZ (TOP 10 + PINNED USER + FULL POPUP) */
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Header Banner & Your Rank */}
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50/60 to-amber-100/50 border border-amber-200/90 text-xs text-amber-950 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-sm sm:text-base text-amber-950 tracking-tight">
                    Ranking Kimia Cikgu Hafreez
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200/70 text-amber-900">
                    Top 10 Calon
                  </span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed mt-0.5">
                  Setiap calon yang log masuk akan direkodkan secara automatik. Kumpul mata XP daripada bacaan nota, kuiz, dan Mod Peperiksaan!
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
              <div className="text-left lg:text-right">
                <span className="text-[10px] uppercase tracking-wider text-amber-800 font-bold block">
                  {isAdmin ? 'Status Pemantauan' : 'Kedudukan Anda'}
                </span>
                <span className="text-base sm:text-lg font-black text-amber-950">
                  {isAdmin
                    ? '👑 Mod Pentadbir (Dikecualikan)'
                    : `#${currentUserEntry?.rank || 1} daripada ${combinedLeaderboard.length} Calon`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={loadLeaderboardUsers}
                  disabled={isRefreshingLeaderboard}
                  className="px-3 py-2 rounded-full liquid-glass-capsule text-amber-950 hover:text-amber-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-60"
                  title="Muat semula senarai ranking terkini"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingLeaderboard ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Segar</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFullRankingModalOpen(true)}
                  className="px-4 py-2 rounded-full liquid-glass-amber text-amber-950 font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-sm hover:scale-[1.02]"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-amber-700" />
                  <span>Lihat Ranking Penuh ({combinedLeaderboard.length})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Top 10 Leaderboard Table */}
          <div className="overflow-x-auto rounded-3xl border border-slate-200/90 shadow-xs bg-white">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-100/90 text-slate-700 font-extrabold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4 w-16 text-center">Kedudukan</th>
                  <th className="py-3.5 px-4">Calon Murid</th>
                  <th className="py-3.5 px-4">Sekolah & Negeri</th>
                  <th className="py-3.5 px-4 text-center">Subtopik</th>
                  <th className="py-3.5 px-4 text-center">Ketepatan Kuiz</th>
                  <th className="py-3.5 px-4 text-right">Mata XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {top10Leaderboard.map((user) => {
                  const isTop3 = user.rank <= 3;
                  const rankColor =
                    user.rank === 1
                      ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-300'
                      : user.rank === 2
                      ? 'bg-slate-300 text-slate-800 ring-2 ring-slate-200'
                      : user.rank === 3
                      ? 'bg-amber-600 text-white ring-2 ring-amber-500'
                      : 'bg-slate-100 text-slate-700';

                  return (
                    <tr
                      key={`${user.rank}-${user.name}-${user.isCurrentUser ? 'me' : 'other'}`}
                      className={`transition-colors ${
                        user.isCurrentUser
                          ? 'bg-sky-50/90 font-semibold border-l-4 border-l-sky-500'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`w-7 h-7 rounded-xl inline-flex items-center justify-center font-black text-xs shadow-xs ${rankColor}`}
                        >
                          {user.rank}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900">{user.name}</span>
                          {user.isCurrentUser && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500 text-white shadow-2xs">
                              Anda
                            </span>
                          )}
                          {isTop3 && (
                            <span className="text-xs">
                              {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <div className="text-xs font-medium">{user.school}</div>
                        <div className="text-[10px] text-slate-400">{user.state}</div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                        {user.completedSubtopics} / 68
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                          {user.quizAccuracy}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-black text-indigo-700 font-mono text-sm">
                        {user.xp.toLocaleString()} XP
                      </td>
                    </tr>
                  );
                })}

                {/* Pinned Row when Current User is Outside Top 10 */}
                {isOutsideTop10 && currentUserEntry && (
                  <>
                    <tr className="bg-slate-50/70">
                      <td colSpan={6} className="py-1.5 px-4 text-center text-[11px] font-bold text-slate-400 tracking-widest">
                        • • • KEDUDUKAN SEMASA ANDA (LUAR TOP 10) • • •
                      </td>
                    </tr>
                    <tr className="bg-sky-50/95 font-semibold border-l-4 border-l-sky-500">
                      <td className="py-3.5 px-4 text-center">
                        <span className="min-w-7 px-1.5 h-7 rounded-xl inline-flex items-center justify-center font-black text-xs shadow-xs bg-sky-600 text-white">
                          #{currentUserEntry.rank}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900">{currentUserEntry.name}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500 text-white shadow-2xs">
                            Anda
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <div className="text-xs font-medium">{currentUserEntry.school}</div>
                        <div className="text-[10px] text-slate-400">{currentUserEntry.state}</div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                        {currentUserEntry.completedSubtopics} / 68
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                          {currentUserEntry.quizAccuracy}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-black text-indigo-700 font-mono text-sm">
                        {currentUserEntry.xp.toLocaleString()} XP
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* Bottom Bar CTA to view full ranking */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1">
            <p className="text-[11px] text-slate-500">
              Memaparkan <span className="font-bold text-slate-700">Top {top10Leaderboard.length}</span> daripada <span className="font-bold text-slate-700">{combinedLeaderboard.length}</span> calon berdaftar.
            </p>
            <button
              type="button"
              onClick={() => setFullRankingModalOpen(true)}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Buka Paparan Penuh Ranking ({combinedLeaderboard.length} Calon)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Full Ranking Pop-up Modal (Rendered via Portal to cover full viewport) */}
      {fullRankingModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[88vh] border border-slate-200 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 sm:p-6 text-white flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-amber-950 flex items-center justify-center shadow-lg shrink-0">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black tracking-tight text-white">
                    Ranking Kimia Cikgu Hafreez
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Senarai penuh keseluruhan {combinedLeaderboard.length} calon Kimia SPM KSSM
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFullRankingModalOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
                title="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search & Your Rank Bar */}
            <div className="p-4 border-b border-slate-200 bg-slate-50/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={rankingSearchQuery}
                  onChange={(e) => setRankingSearchQuery(e.target.value)}
                  placeholder="Cari nama calon, sekolah, atau negeri..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {!isAdmin && currentUserEntry && (
                <div className="px-3.5 py-2 rounded-xl bg-sky-50 border border-sky-200 text-xs font-bold text-sky-900 flex items-center gap-2 shrink-0">
                  <span>Kedudukan Anda:</span>
                  <span className="px-2 py-0.5 rounded-lg bg-sky-600 text-white font-black">
                    #{currentUserEntry.rank}
                  </span>
                  <span className="text-sky-700 font-mono">({currentUserEntry.xp.toLocaleString()} XP)</span>
                </div>
              )}
            </div>

            {/* Scrollable Full Ranking Table */}
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-extrabold border-b border-slate-200 sticky top-0 z-10">
                  <tr>
                    <th className="py-3 px-4 w-16 text-center">Kedudukan</th>
                    <th className="py-3 px-4">Calon Murid</th>
                    <th className="py-3 px-4">Sekolah & Negeri</th>
                    <th className="py-3 px-4 text-center">Subtopik</th>
                    <th className="py-3 px-4 text-center">Ketepatan Kuiz</th>
                    <th className="py-3 px-4 text-right">Mata XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredFullRanking.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-slate-400">
                        Tiada calon dijumpai untuk carian &ldquo;{rankingSearchQuery}&rdquo;.
                      </td>
                    </tr>
                  ) : (
                    filteredFullRanking.map((user) => {
                      const isTop3 = user.rank <= 3;
                      const rankColor =
                        user.rank === 1
                          ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-300'
                          : user.rank === 2
                          ? 'bg-slate-300 text-slate-800 ring-2 ring-slate-200'
                          : user.rank === 3
                          ? 'bg-amber-600 text-white ring-2 ring-amber-500'
                          : user.isCurrentUser
                          ? 'bg-sky-600 text-white'
                          : 'bg-slate-100 text-slate-700';

                      return (
                        <tr
                          key={`full-${user.rank}-${user.name}-${user.isCurrentUser ? 'me' : 'other'}`}
                          className={`transition-colors ${
                            user.isCurrentUser
                              ? 'bg-sky-50/90 font-semibold border-l-4 border-l-sky-500'
                              : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="py-3 px-4 text-center">
                            <span
                              className={`min-w-7 px-1.5 h-7 rounded-xl inline-flex items-center justify-center font-black text-xs shadow-xs ${rankColor}`}
                            >
                              {user.rank}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-slate-900">{user.name}</span>
                              {user.isCurrentUser && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500 text-white">
                                  Anda
                                </span>
                              )}
                              {isTop3 && (
                                <span className="text-xs">
                                  {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            <div className="text-xs font-medium">{user.school}</div>
                            <div className="text-[10px] text-slate-400">{user.state}</div>
                          </td>
                          <td className="py-3 px-4 text-center font-bold text-slate-800">
                            {user.completedSubtopics} / 68
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                              {user.quizAccuracy}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right font-black text-indigo-700 font-mono text-sm">
                            {user.xp.toLocaleString()} XP
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>,
          document.body
        )}
    </div>
  );
};
