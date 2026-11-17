import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Clock,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Trophy,
  ArrowRight,
  ArrowLeft,
  Flag,
  BookOpen,
  Sparkles,
  Zap,
  Check,
  ChevronRight,
  Flame,
  ShieldAlert,
  Lock,
  KeyRound,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  ExamQuestion,
  ExamMode,
  getRandomExamQuestions,
  getExamModeLabel,
  EXAM_BANK_T4,
  EXAM_BANK_T5,
  EXAM_BANK_ALL,
} from '../../data/examQuestions';

interface Props {
  isOpen: boolean;
  initialMode?: ExamMode;
  onClose: () => void;
  onRecordScore?: (examKey: string, score: number, total: number) => void;
  isPremium?: boolean;
  examAttemptsCount?: number;
  onOpenAccessModal?: () => void;
  onExamStarted?: () => void;
}

export const ExamModeModal: React.FC<Props> = ({
  isOpen,
  initialMode = 'ALL',
  onClose,
  onRecordScore,
  isPremium = false,
  examAttemptsCount = 0,
  onOpenAccessModal,
  onExamStarted,
}) => {
  const [phase, setPhase] = useState<'lobby' | 'exam' | 'result'>('lobby');
  const [selectedMode, setSelectedMode] = useState<ExamMode>(initialMode);
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(15 * 60); // 15 mins
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [resultFilter, setResultFilter] = useState<'all' | 'correct' | 'incorrect'>('all');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync initial mode
  useEffect(() => {
    if (initialMode) setSelectedMode(initialMode);
  }, [initialMode]);

  // Handle countdown timer during 'exam' phase
  useEffect(() => {
    if (phase === 'exam' && timerEnabled) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
        setTimeSpentSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, timerEnabled]);

  if (!isOpen) return null;

  // Format seconds into MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  // Start Exam
  const handleStartExam = (modeToStart?: ExamMode) => {
    if (!isPremium && examAttemptsCount >= 2) {
      if (onOpenAccessModal) onOpenAccessModal();
      return;
    }
    if (onExamStarted) {
      onExamStarted();
    }
    const mode = modeToStart || selectedMode;
    const randomizedQuestions = getRandomExamQuestions(mode, 10);
    setQuestions(randomizedQuestions);
    setCurrentIndex(0);
    setUserAnswers({});
    setFlagged({});
    setSecondsRemaining(15 * 60);
    setTimeSpentSeconds(0);
    setShowConfirmSubmit(false);
    setPhase('exam');
  };

  // Select Option
  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  // Toggle Flag
  const handleToggleFlag = () => {
    setFlagged((prev) => ({
      ...prev,
      [currentIndex]: !prev[currentIndex],
    }));
  };

  // Auto-submit when time expires
  const handleAutoSubmit = () => {
    finishExam();
  };

  // Manual submit
  const handleSubmitExam = () => {
    finishExam();
  };

  // Calculate results & trigger confetti
  const finishExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    // Calculate score
    let score = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answerIndex) {
        score += 1;
      }
    });

    // Record score
    if (onRecordScore) {
      const examKey = `exam-${selectedMode}-${Date.now()}`;
      onRecordScore(examKey, score, questions.length);
    }

    setPhase('result');

    // Confetti if score >= 7
    if (score >= 7) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  // Score stats
  const totalCorrect = questions.filter((q, idx) => userAnswers[idx] === q.answerIndex).length;
  const percentage = Math.round((totalCorrect / (questions.length || 10)) * 100);
  const totalAnswered = Object.keys(userAnswers).length;

  // Determine SPM Grade
  const getSpmGrade = (pct: number) => {
    if (pct >= 90) return { grade: 'A+', label: 'Cemerlang Tertinggi', color: 'from-amber-400 to-yellow-500', text: 'text-amber-500' };
    if (pct >= 80) return { grade: 'A', label: 'Cemerlang', color: 'from-emerald-400 to-teal-500', text: 'text-emerald-500' };
    if (pct >= 70) return { grade: 'A-', label: 'Cemerlang', color: 'from-sky-400 to-blue-500', text: 'text-sky-500' };
    if (pct >= 65) return { grade: 'B+', label: 'Kepujian Tertinggi', color: 'from-indigo-400 to-purple-500', text: 'text-indigo-500' };
    if (pct >= 60) return { grade: 'B', label: 'Kepujian', color: 'from-purple-400 to-pink-500', text: 'text-purple-500' };
    if (pct >= 50) return { grade: 'C+', label: 'Lulus Atas', color: 'from-slate-400 to-slate-500', text: 'text-slate-600' };
    return { grade: 'D', label: 'Perlu Ulang Kaji', color: 'from-rose-400 to-red-500', text: 'text-rose-500' };
  };

  const currentQ = questions[currentIndex];
  const modeInfo = getExamModeLabel(selectedMode);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-900/65 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ======================================================== */}
        {/* PHASE 1: LOBBY / SELECTION SCREEN                        */}
        {/* ======================================================== */}
        {phase === 'lobby' && (
          <div className="flex flex-col h-full overflow-y-auto">
            {/* Top Modal Header */}
            <div className="px-6 py-5 border-b border-slate-200/90 flex items-center justify-between bg-white/95">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/25">
                  <Trophy className="w-5 h-5 text-amber-100" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                      Uji Kefahaman SPM
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      Bank 460+ Soalan
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                    Mod Peperiksaan SPM (Exam Mode)
                  </h2>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-2xl bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 transition-colors"
                title="Tutup (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lobby Body */}
            <div className="p-6 sm:p-8 space-y-6 flex-1 bg-slate-50/60">
              {/* Quota Indicator Banner for Free Tier */}
              {!isPremium && (
                <div className={`p-4 rounded-2xl border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  examAttemptsCount >= 2
                    ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-2xs'
                    : 'bg-sky-50 border-sky-200 text-sky-900 shadow-2xs'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      examAttemptsCount >= 2 ? 'bg-amber-500 text-white shadow-xs' : 'bg-sky-500 text-white shadow-xs'
                    }`}>
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-extrabold text-xs">
                        {examAttemptsCount >= 2
                          ? 'Had 2 Kali Percubaan Percuma Tamat (2/2 Digunakan)'
                          : `Percubaan Percuma: ${examAttemptsCount} daripada 2 Digunakan`}
                      </div>
                      <div className="text-[11px] opacity-80 mt-0.5">
                        {examAttemptsCount >= 2
                          ? 'Akaun percuma terhad kepada 2 kali percubaan. Sila tebus Kod Akses Khas untuk peperiksaan tanpa had.'
                          : 'Anda mempunyai akses percubaan percuma. Selepas 2 kali, Kod Akses Khas diperlukan.'}
                      </div>
                    </div>
                  </div>

                  {examAttemptsCount >= 2 && onOpenAccessModal && (
                    <button
                      type="button"
                      onClick={onOpenAccessModal}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-xs hover:scale-102 transition-all cursor-pointer whitespace-nowrap self-end sm:self-auto"
                    >
                      Tebus Kod Akses
                    </button>
                  )}
                </div>
              )}

              <div className="text-center max-w-xl mx-auto space-y-2">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Pilih Set Peperiksaan Anda
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Setiap cubaan akan <b>menjana 10 soalan secara rawak</b> daripada bank soalan mengikut silibus dan format Kertas 1 SPM KSSM.
                </p>
              </div>

              {/* 3 Mode Selection Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {/* Tingkatan 4 */}
                <button
                  type="button"
                  onClick={() => setSelectedMode('T4')}
                  className={`p-5 rounded-3xl border-2 text-left transition-all cursor-pointer relative overflow-hidden group ${
                    selectedMode === 'T4'
                      ? 'border-sky-500 bg-sky-50/80 shadow-md ring-2 ring-sky-300'
                      : 'border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-bold shadow-sm shadow-sky-500/30">
                      T4
                    </div>
                    {selectedMode === 'T4' && (
                      <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-black text-slate-900 group-hover:text-sky-700">
                    Tingkatan 4
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Bab 1 hingga Bab 8 KSSM (264 soalan dalam bank).
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-semibold text-sky-800">
                    <span>10 Soalan Rawak</span>
                    <span className="font-mono">15 Minit</span>
                  </div>
                </button>

                {/* Tingkatan 5 */}
                <button
                  type="button"
                  onClick={() => setSelectedMode('T5')}
                  className={`p-5 rounded-3xl border-2 text-left transition-all cursor-pointer relative overflow-hidden group ${
                    selectedMode === 'T5'
                      ? 'border-indigo-500 bg-indigo-50/80 shadow-md ring-2 ring-indigo-300'
                      : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-sm shadow-indigo-600/30">
                      T5
                    </div>
                    {selectedMode === 'T5' && (
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-black text-slate-900 group-hover:text-indigo-700">
                    Tingkatan 5
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Bab 1 hingga Bab 5 KSSM (204 soalan dalam bank).
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-semibold text-indigo-800">
                    <span>10 Soalan Rawak</span>
                    <span className="font-mono">15 Minit</span>
                  </div>
                </button>

                {/* SPM Maya (All) */}
                <button
                  type="button"
                  onClick={() => setSelectedMode('ALL')}
                  className={`p-5 rounded-3xl border-2 text-left transition-all cursor-pointer relative overflow-hidden group ${
                    selectedMode === 'ALL'
                      ? 'border-amber-500 bg-amber-50/80 shadow-md ring-2 ring-amber-300'
                      : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-black shadow-sm shadow-amber-500/30">
                      SPM
                    </div>
                    {selectedMode === 'ALL' && (
                      <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-black text-slate-900 group-hover:text-amber-800">
                    SPM Maya
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Keseluruhan silibus T4 & T5 (468 soalan dalam bank).
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-semibold text-amber-800">
                    <span>10 Soalan Komprehensif</span>
                    <span className="font-mono">15 Minit</span>
                  </div>
                </button>
              </div>

              {/* Timer Setting & Exam Rules */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-slate-500 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-800">
                      Had Masa Peperiksaan (15 Minit)
                    </div>
                    <div className="text-[11px] text-slate-500">
                      1.5 minit bagi setiap soalan mengikut purata sebenar Kertas 1 SPM
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setTimerEnabled(!timerEnabled)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      timerEnabled
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {timerEnabled ? 'Pemasa Aktif (15m)' : 'Mod Santai (Tiada Had)'}
                  </button>
                </div>
              </div>

              {/* Rules & Rewards Info */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200/80 text-xs text-slate-700 space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span>Ganjaran Markah & Mata Pengalaman (XP):</span>
                </div>
                <div className="text-[11px] text-slate-600 leading-relaxed">
                  • Setiap jawapan tepat menyumbang <b>+20 XP</b> terus ke Papan Pencapaian anda.<br />
                  • Capai markah penuh 10/10 untuk menerima bonus <b>+50 XP</b> tambahan serta gelaran Calon SPM Cemerlang!
                </div>
              </div>
            </div>

            {/* Lobby Footer Action */}
            <div className="p-5 bg-white border-t border-slate-200/80 flex items-center justify-between">
              <span className="text-xs text-slate-500 hidden sm:inline">
                Pastikan sambungan stabil dan bersedia sebelum menekan mula.
              </span>

              <button
                type="button"
                onClick={() => {
                  if (!isPremium && examAttemptsCount >= 2) {
                    if (onOpenAccessModal) onOpenAccessModal();
                  } else {
                    handleStartExam();
                  }
                }}
                className={`w-full sm:w-auto px-6 py-3 rounded-2xl text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  !isPremium && examAttemptsCount >= 2
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-95 shadow-amber-500/25'
                    : 'bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:opacity-95 active:scale-98 shadow-amber-500/25'
                }`}
              >
                {!isPremium && examAttemptsCount >= 2 ? (
                  <>
                    <Lock className="w-4 h-4 text-amber-100" />
                    <span>Tebus Kod untuk Mula Peperiksaan</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-200 fill-amber-200" />
                    <span>Mula Peperiksaan Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* PHASE 2: DEWAN PEPERIKSAAN (ACTIVE EXAM)                 */}
        {/* ======================================================== */}
        {phase === 'exam' && currentQ && (
          <div className="flex flex-col h-full overflow-hidden">
            {/* Exam Header */}
            <div className="px-5 sm:px-7 py-3.5 border-b border-slate-200 bg-white/95 backdrop-blur-md flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                  currentQ.form === 'T4' ? 'bg-sky-100 text-sky-800' : 'bg-indigo-100 text-indigo-800'
                }`}>
                  {modeInfo.badge}
                </span>
                <span className="text-xs font-bold text-slate-700">
                  Soalan {currentIndex + 1} / {questions.length}
                </span>
              </div>

              {/* Timer Bar */}
              {timerEnabled && (
                <div className={`px-3 py-1 rounded-xl font-mono text-xs font-black flex items-center gap-1.5 transition-colors ${
                  secondsRemaining < 120
                    ? 'bg-rose-100 text-rose-700 animate-pulse border border-rose-300'
                    : 'bg-slate-100 text-slate-800 border border-slate-200'
                }`}>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTime(secondsRemaining)}</span>
                </div>
              )}

              {/* Submit CTA in header */}
              <button
                type="button"
                onClick={() => setShowConfirmSubmit(true)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <span>Hantar</span>
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Question Number Jump Track */}
            <div className="px-5 sm:px-7 py-2.5 bg-slate-100/70 border-b border-slate-200/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {questions.map((_, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = userAnswers[idx] !== undefined;
                const isFlag = flagged[idx];

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-7 h-7 rounded-xl text-xs font-bold flex items-center justify-center transition-all cursor-pointer relative shrink-0 ${
                      isCurrent
                        ? 'bg-slate-900 text-white shadow-sm ring-2 ring-slate-400'
                        : isAnswered
                          ? 'bg-emerald-500 text-white shadow-2xs'
                          : 'bg-white text-slate-600 border border-slate-300/80 hover:bg-slate-200'
                    }`}
                  >
                    <span>{idx + 1}</span>
                    {isFlag && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Exam Question Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 md:p-8 space-y-6 bg-slate-50/50">
              {/* Question Metadata Pill */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">
                    {currentQ.form} Bab {currentQ.chapterNumber}: {currentQ.chapterTitle}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                    Sub {currentQ.subtopicCode}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    Aras: {currentQ.level}
                  </span>
                  {currentQ.spmReference && (
                    <span className="text-[10px] font-mono text-slate-400">
                      {currentQ.spmReference}
                    </span>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
                <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                  {currentQ.question}
                </p>
              </div>

              {/* 4 Options (A, B, C, D) */}
              <div className="space-y-3">
                {currentQ.options.map((opt, optIdx) => {
                  const optionLetters = ['A', 'B', 'C', 'D'];
                  const isSelected = userAnswers[currentIndex] === optIdx;

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full p-4 rounded-2xl text-left transition-all duration-150 flex items-start gap-3.5 border cursor-pointer ${
                        isSelected
                          ? 'border-sky-500 bg-sky-50/90 shadow-md ring-2 ring-sky-300'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80 shadow-2xs'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-all ${
                        isSelected
                          ? 'bg-sky-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {optionLetters[optIdx]}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed pt-1 flex-1">
                        {opt}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Exam Navigation Footer */}
            <div className="px-5 sm:px-7 py-3.5 bg-white border-t border-slate-200/90 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    currentIndex === 0
                      ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sebelum</span>
                </button>

                <button
                  type="button"
                  onClick={handleToggleFlag}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    flagged[currentIndex]
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  title="Tanda soalan untuk disemak kemudian"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {flagged[currentIndex] ? 'Ditanda Semak' : 'Tanda Semak'}
                  </span>
                </button>
              </div>

              <div className="text-xs font-semibold text-slate-500 hidden md:block">
                {totalAnswered} daripada {questions.length} dijawab
              </div>

              <div className="flex items-center gap-2">
                {currentIndex < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Seterusnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowConfirmSubmit(true)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    <span>Hantar Ujian</span>
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Confirmation Dialog before submitting */}
            {showConfirmSubmit && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-20">
                <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-slate-200 animate-in zoom-in-95 duration-150">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div className="text-center space-y-1">
                    <h4 className="text-lg font-black text-slate-900">
                      Hantar Peperiksaan?
                    </h4>
                    <p className="text-xs text-slate-600">
                      Anda telah menjawab <b>{totalAnswered}</b> daripada <b>{questions.length}</b> soalan.
                      {totalAnswered < questions.length && (
                        <span className="text-rose-600 block font-semibold mt-1">
                          Perhatian: Ada {questions.length - totalAnswered} soalan belum dijawab!
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowConfirmSubmit(false)}
                      className="w-1/2 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                    >
                      Kembali Semak
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmitExam}
                      className="w-1/2 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                    >
                      Ya, Hantar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* PHASE 3: KEPUTUSAN & ANALISIS JAWAPAN                    */}
        {/* ======================================================== */}
        {phase === 'result' && (
          <div className="flex flex-col h-full overflow-hidden">
            {/* Result Header */}
            <div className="px-6 py-4 border-b border-slate-200/90 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/25">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                    Keputusan Rasmi
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-0.5">
                    Keputusan & Analisis Skema SPM
                  </h2>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-2xl bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 transition-colors"
                title="Tutup (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Result Body Canvas */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 md:p-8 space-y-6 bg-slate-50/60">
              {/* Score & Grade Hero Card */}
              {(() => {
                const gradeInfo = getSpmGrade(percentage);
                return (
                  <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {modeInfo.title}
                      </span>
                      <div className="flex items-baseline gap-3 justify-center sm:justify-start">
                        <span className="text-5xl font-black text-slate-900 tracking-tight">
                          {totalCorrect}
                        </span>
                        <span className="text-xl font-bold text-slate-400">/ 10</span>
                        <span className="text-2xl font-bold text-slate-700 font-mono">
                          ({percentage}%)
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Masa diambil: <b>{formatTime(timeSpentSeconds)}</b> • Dijawab:{' '}
                        <b>{totalAnswered}/10</b>
                      </p>
                    </div>

                    {/* Grade Badge */}
                    <div className="flex flex-col items-center sm:items-end gap-1 shrink-0">
                      <div className={`px-5 py-2.5 rounded-2xl bg-gradient-to-r ${gradeInfo.color} text-white font-black text-2xl shadow-md`}>
                        Gred {gradeInfo.grade}
                      </div>
                      <span className="text-xs font-bold text-slate-700">
                        {gradeInfo.label}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>+{totalCorrect * 20} XP Diperoleh!</span>
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Review Filter Tabs */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-sky-600" />
                  <span>Semakan Jawapan & Skema Pemarkahan</span>
                </h4>

                <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-xl text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setResultFilter('all')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      resultFilter === 'all'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Semua ({questions.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setResultFilter('correct')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      resultFilter === 'correct'
                        ? 'bg-emerald-500 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Betul ({totalCorrect})
                  </button>
                  <button
                    type="button"
                    onClick={() => setResultFilter('incorrect')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      resultFilter === 'incorrect'
                        ? 'bg-rose-500 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Salah ({questions.length - totalCorrect})
                  </button>
                </div>
              </div>

              {/* Detailed Questions Review List */}
              <div className="space-y-4">
                {questions
                  .filter((q, idx) => {
                    const isCorrect = userAnswers[idx] === q.answerIndex;
                    if (resultFilter === 'correct') return isCorrect;
                    if (resultFilter === 'incorrect') return !isCorrect;
                    return true;
                  })
                  .map((q, idx) => {
                    const realIndex = questions.indexOf(q);
                    const userSelected = userAnswers[realIndex];
                    const isCorrect = userSelected === q.answerIndex;
                    const optionLetters = ['A', 'B', 'C', 'D'];

                    return (
                      <div
                        key={q.id || idx}
                        className={`rounded-3xl p-5 sm:p-6 border transition-all ${
                          isCorrect
                            ? 'bg-white border-emerald-200/90 shadow-2xs'
                            : 'bg-white border-rose-200/90 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-xl font-mono text-xs font-bold flex items-center justify-center bg-slate-100 text-slate-700">
                              {realIndex + 1}
                            </span>
                            <span className="text-xs font-bold text-slate-600">
                              {q.form} Bab {q.chapterNumber} (Sub {q.subtopicCode})
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {isCorrect ? (
                              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Betul
                              </span>
                            ) : (
                              <span className="text-xs font-bold text-rose-700 bg-rose-100/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" /> Salah
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Question */}
                        <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed whitespace-pre-line mb-3">
                          {q.question}
                        </p>

                        {/* Options breakdown */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3">
                          {q.options.map((opt, oIdx) => {
                            const isAnswerKey = oIdx === q.answerIndex;
                            const isUserChoice = userSelected === oIdx;

                            return (
                              <div
                                key={oIdx}
                                className={`p-2.5 rounded-xl text-xs flex items-start gap-2 border ${
                                  isAnswerKey
                                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                                    : isUserChoice
                                      ? 'bg-rose-50 border-rose-300 text-rose-900 line-through'
                                      : 'bg-slate-50 border-slate-200 text-slate-600'
                                }`}
                              >
                                <span className={`w-5 h-5 rounded-md text-[10px] font-bold flex items-center justify-center shrink-0 ${
                                  isAnswerKey
                                    ? 'bg-emerald-600 text-white'
                                    : isUserChoice
                                      ? 'bg-rose-600 text-white'
                                      : 'bg-slate-200 text-slate-700'
                                }`}>
                                  {optionLetters[oIdx]}
                                </span>
                                <span className="leading-tight pt-0.5">{opt}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation Box */}
                        <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200/80 text-xs text-sky-950 mt-3 space-y-1">
                          <span className="font-extrabold flex items-center gap-1 text-sky-900">
                            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                            Skema Jawapan & Penjelasan Kimia:
                          </span>
                          <p className="leading-relaxed text-slate-700">
                            {q.explanation}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Result Bottom Action Bar */}
            <div className="px-5 sm:px-7 py-4 bg-white border-t border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setPhase('lobby')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                Pilih Mod Peperiksaan Lain
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleStartExam(selectedMode)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-95 active:scale-98 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Ulang Set Baharu (10 Soalan Rawak)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
