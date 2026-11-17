import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, Trophy, RotateCcw, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizQuestion } from '../types/nota';

interface Props {
  subtopicId: string;
  quiz: QuizQuestion[];
  onQuizComplete?: (score: number, total: number) => void;
}

export const QuizWidget: React.FC<Props> = ({ subtopicId: _subtopicId, quiz, onQuizComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!quiz || quiz.length === 0) return null;

  const currentQ = quiz[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return; // Prevent changing after selection
    setSelectedOption(idx);
    setShowExplanation(true);

    if (idx === currentQ.answerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < quiz.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
      const finalScore = score + (selectedOption === currentQ.answerIndex ? 0 : 0);
      if (finalScore === quiz.length) {
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch (e) {
          console.error(e);
        }
      }
      onQuizComplete?.(finalScore, quiz.length);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
  };

  const getLevelBadge = (lvl: string) => {
    switch (lvl) {
      case 'Rendah': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Sederhana': return 'bg-sky-100 text-sky-800 border-sky-300';
      default: return 'bg-amber-200 text-amber-900 border-amber-300';
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-50/90 via-yellow-50/50 to-amber-50/80 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-amber-200/90 shadow-sm space-y-4">
      {/* Soft/Pastel Yellow Header Banner */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-100/95 to-yellow-100/90 border border-amber-200/90 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
            <HelpCircle className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold text-amber-950 uppercase tracking-wider">
              Kuiz Kilat SPM
            </h3>
            <span className="text-[10px] font-medium text-amber-800/80">
              {isFinished ? 'Keputusan Lengkap' : `Soalan ${currentIdx + 1} daripada ${quiz.length}`}
            </span>
          </div>
        </div>

        {!isFinished && (
          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border shadow-2xs ${getLevelBadge(currentQ.level)}`}>
            {currentQ.level}
          </span>
        )}
      </div>

      {isFinished ? (
        /* Results Screen */
        <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-400/30">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h4 className="text-lg font-extrabold text-slate-900">
              {score === quiz.length
                ? 'Cemerlang! Skor Penuh! 🎉'
                : score >= Math.ceil(quiz.length / 2)
                ? 'Bagus! Hampir Sempurna! 👍'
                : 'Ulang Kaji Lagi untuk Mantap! 💪'}
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              Anda berjaya menjawab <b>{score}</b> daripada <b>{quiz.length}</b> soalan dengan betul ({Math.round((score / quiz.length) * 100)}%).
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold transition-all shadow-md shadow-amber-600/20 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Cuba Kuiz Sekali Lagi</span>
          </button>
        </div>
      ) : (
        /* Quiz Question & Options */
        <div className="space-y-3.5">
          {/* Question Text Box */}
          <div className="p-3.5 rounded-2xl bg-white/95 border border-amber-200/80 shadow-xs space-y-1">
            <div className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed whitespace-pre-line">
              {currentQ.question}
            </div>

            {currentQ.spmReference && (
              <div className="text-[10px] text-amber-800/80 font-mono italic pt-1">
                Rujukan format: {currentQ.spmReference}
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-2">
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = selectedOption === oIdx;
              const isCorrect = oIdx === currentQ.answerIndex;
              const showResult = selectedOption !== null;

              let btnStyle = 'bg-white/95 hover:bg-amber-100/60 border-amber-200/80 text-slate-800 shadow-2xs hover:border-amber-300 cursor-pointer';

              if (showResult) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-500 shadow-2xs';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold ring-1 ring-rose-400 shadow-2xs';
                } else {
                  btnStyle = 'bg-white/40 opacity-40 border-slate-200 text-slate-400 cursor-default';
                }
              }

              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-3 rounded-2xl text-xs border transition-all flex items-start gap-2.5 ${btnStyle}`}
                >
                  <span
                    className={`w-5 h-5 rounded-lg flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5 ${
                      showResult && isCorrect
                        ? 'bg-emerald-600 text-white'
                        : showResult && isSelected
                        ? 'bg-rose-600 text-white'
                        : 'bg-amber-100 text-amber-950 border border-amber-300/70'
                    }`}
                  >
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt}</span>
                  {showResult && isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 self-center" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 self-center" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation && (
            <div className="p-3.5 rounded-2xl bg-amber-100/90 border border-amber-300/90 text-xs text-amber-950 space-y-1.5 animate-in fade-in duration-200 shadow-2xs">
              <div className="font-extrabold flex items-center gap-1.5 text-amber-900">
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                Penjelasan Skema SPM:
              </div>
              <p className="text-[11px] leading-relaxed text-amber-950">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action button */}
          {selectedOption !== null && (
            <button
              onClick={handleNext}
              className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-extrabold text-xs shadow-md shadow-amber-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:scale-101"
            >
              <span>{currentIdx + 1 === quiz.length ? 'Lihat Keputusan Kuiz' : 'Soalan Seterusnya'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
