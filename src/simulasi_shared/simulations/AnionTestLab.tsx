import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Flame,
  FlaskConical,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Trophy,
  Heart,
  Sparkles,
  BookOpen,
  ArrowRight,
  AlertTriangle,
  Shuffle,
  Eye,
  Thermometer,
  Droplets,
} from 'lucide-react';
import {
  ANION_LIST,
  ANION_SALT_SAMPLES,
  ANION_TEST_DEFS,
  AnionId,
  AnionTestId,
  ReagentStage,
  evaluateAnionTest,
} from '../data/anionTests';
import { AnionApparatusSVG } from '../components/AnionApparatusSVG';
import { analytics } from '../services/analytics';

const SIM_ID = 'ujian-anion';

interface AnionLogEntry {
  id: string;
  label: string;
  detail: string;
}

function shuffleSampleIds(): string[] {
  const ids = ANION_SALT_SAMPLES.map((s) => s.id);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids;
}

type GameMode = 'mystery' | 'practice';
type RightTab = 'lab' | 'guide';

export const AnionTestLab: React.FC = () => {
  const [mode, setMode] = useState<GameMode>('mystery');
  const [rightTab, setRightTab] = useState<RightTab>('lab');
  const [queue, setQueue] = useState<string[]>(() => shuffleSampleIds());
  const [queueIdx, setQueueIdx] = useState<number>(0);
  const [practiceSampleId, setPracticeSampleId] = useState<string>('pbno3');

  // State makmal semasa
  const [sampleNum, setSampleNum] = useState<number>(1);
  const [activeTestId, setActiveTestId] = useState<AnionTestId | null>(null);
  const [stage, setStage] = useState<ReagentStage | null>(null);
  const [isColdView, setIsColdView] = useState<boolean>(false);
  const [isRinsing, setIsRinsing] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [washWarning, setWashWarning] = useState<string | null>(null);
  const [logs, setLogs] = useState<AnionLogEntry[]>([]);

  // State gamifikasi
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [solvedSamples, setSolvedSamples] = useState<string[]>([]);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(3);
  const [selectedGuessId, setSelectedGuessId] = useState<AnionId | null>(null);
  const [roundStatus, setRoundStatus] = useState<'active' | 'won' | 'failed'>('active');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const currentSampleId =
    mode === 'mystery' ? queue[queueIdx % queue.length] : practiceSampleId;
  const currentSample = useMemo(
    () =>
      ANION_SALT_SAMPLES.find((s) => s.id === currentSampleId) ?? ANION_SALT_SAMPLES[0],
    [currentSampleId]
  );

  const activeTestDef = useMemo(
    () => ANION_TEST_DEFS.find((t) => t.id === activeTestId) ?? null,
    [activeTestId]
  );

  const visualResult = useMemo(() => {
    if (!activeTestId || !stage) return null;
    return evaluateAnionTest(currentSampleId, activeTestId, stage);
  }, [currentSampleId, activeTestId, stage]);

  useEffect(() => {
    analytics.recordSimulationClick(SIM_ID, 1);
  }, []);

  const appendLog = (label: string, detail: string) => {
    setLogs((prev) => [
      { id: `${Date.now()}-${Math.random()}`, label, detail },
      ...prev,
    ]);
  };

  const handleStartTest = (testId: AnionTestId) => {
    if (mode === 'mystery' && roundStatus !== 'active') return;
    setWashWarning(null);
    setFeedbackMsg(null);

    const chosen = ANION_TEST_DEFS.find((t) => t.id === testId)!;

    // Jika sedang menjalankan ujian lain dalam tabung yang belum dicuci:
    if (activeTestId && activeTestId !== testId) {
      setWashWarning(
        `Tabung mengandungi sisa ujian "${activeTestDef?.shortLabel}". Sila klik "Cuci Tabung Uji" dahulu sebelum menjalankan ujian lain!`
      );
      return;
    }

    // Jika ujian 2-langkah yang sama berada pada langkah 1: lanjutkan ke langkah 2
    if (activeTestId === testId) {
      if (chosen.step2Label && stage === 'step1') {
        handleAdvanceStep2();
      } else {
        setWashWarning(
          `Ujian "${chosen.shortLabel}" telah selesai dalam tabung ini. Cuci tabung uji untuk menukar ujian lain.`
        );
      }
      return;
    }

    const res = evaluateAnionTest(currentSampleId, testId, 'step1');
    setActiveTestId(testId);
    setStage('step1');
    setIsColdView(false);
    appendLog(chosen.step1Label, res.observationText);
  };

  const handleAdvanceStep2 = () => {
    if (!activeTestId || !activeTestDef?.step2Label || stage === 'step2') return;
    if (mode === 'mystery' && roundStatus !== 'active') return;
    setWashWarning(null);
    const res = evaluateAnionTest(currentSampleId, activeTestId, 'step2');
    setStage('step2');
    appendLog(activeTestDef.step2Label, res.observationText);
  };

  const handleWashTube = () => {
    if (mode === 'mystery' && roundStatus !== 'active') return;
    setWashWarning(null);
    setIsRinsing(true);
    window.setTimeout(() => {
      setActiveTestId(null);
      setStage(null);
      setIsColdView(false);
      setIsRinsing(false);
    }, 520);
  };

  const handleDragStart = (e: React.DragEvent, testId: AnionTestId) => {
    e.dataTransfer.setData('application/x-anion-test', testId);
    e.dataTransfer.setData('text/plain', testId);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDropOnApparatus = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const raw =
      (e.dataTransfer.getData('application/x-anion-test') as AnionTestId) ||
      (e.dataTransfer.getData('text/plain') as AnionTestId);
    if (ANION_TEST_DEFS.some((t) => t.id === raw)) {
      handleStartTest(raw);
    }
  };

  const handleSubmitGuess = () => {
    if (!selectedGuessId || roundStatus !== 'active') return;
    const correctAnion = ANION_LIST.find((a) => a.id === currentSample.anionId)!;

    if (selectedGuessId === currentSample.anionId) {
      const gained = 100 + streak * 25;
      setScore((s) => s + gained);
      setStreak((st) => st + 1);
      setRoundStatus('won');
      setFeedbackMsg(
        `Betul! Garam Y${sampleNum} ialah ${currentSample.name} (${currentSample.formula}) yang mengandungi ${correctAnion.name} (${correctAnion.formula}). (+${gained} mata)`
      );
      setSolvedSamples((prev) => {
        const next = prev.includes(currentSampleId) ? prev : [...prev, currentSampleId];
        if (next.length >= 3) {
          analytics.recordSimulationCompleted(SIM_ID);
        }
        return next;
      });
      confetti({ particleCount: 55, spread: 60, origin: { y: 0.65 } });
      return;
    }

    const rem = attemptsLeft - 1;
    setAttemptsLeft(rem);
    setStreak(0);
    setScore((s) => Math.max(0, s - 20));
    if (rem <= 0) {
      setRoundStatus('failed');
      setFeedbackMsg(
        `Cubaan tamat! Garam Y${sampleNum} ialah ${currentSample.name} (${currentSample.formula}) — ${correctAnion.name} (${correctAnion.formula}). ${currentSample.heatObservationNote}`
      );
    } else {
      setFeedbackMsg(
        `Kurang tepat (−20 mata). Baki cubaan: ${rem}. Anda boleh mencuci tabung uji untuk menjalankan ujian pemanasan atau reagen anion yang lain!`
      );
    }
  };

  const resetRound = () => {
    setActiveTestId(null);
    setStage(null);
    setIsColdView(false);
    setWashWarning(null);
    setLogs([]);
    setSelectedGuessId(null);
    setAttemptsLeft(3);
    setRoundStatus('active');
    setFeedbackMsg(null);
  };

  const handleNextMystery = () => {
    resetRound();
    setSampleNum((n) => n + 1);
    if (queueIdx + 1 >= queue.length) {
      setQueue(shuffleSampleIds());
      setQueueIdx(0);
    } else {
      setQueueIdx((idx) => idx + 1);
    }
  };

  const switchMode = (nextMode: GameMode) => {
    setMode(nextMode);
    resetRound();
  };

  const sampleLabel =
    mode === 'mystery' ? `Garam Y${sampleNum}` : currentSample.formula;

  const canWash =
    activeTestId !== null && (mode === 'practice' || roundStatus === 'active');

  const heatingTests = ANION_TEST_DEFS.filter((t) => t.group === 'heating');
  const reagentTests = ANION_TEST_DEFS.filter((t) => t.group === 'reagent');

  return (
    <div className="flex flex-col gap-2.5 text-slate-800">
      {/* BAR GAMIFIKASI ATAS */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-fuchsia-50 via-white to-rose-50 border border-fuchsia-200 rounded-xl px-3 py-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => switchMode('mystery')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition ${
              mode === 'mystery'
                ? 'bg-fuchsia-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Mod Gamifikasi (Pepejal Garam Misteri)
          </button>
          <button
            type="button"
            onClick={() => switchMode('practice')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition ${
              mode === 'practice'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Mod Latihan Bebas
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[11px] font-extrabold">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            Skor: {score}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800">
            <Flame className="w-3.5 h-3.5 text-orange-600" />
            Rentetan: {streak}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Selesai: {solvedSamples.length}/10 garam
          </span>
          {mode === 'mystery' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800">
              <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-500" />
              Cubaan: {attemptsLeft}/3
            </span>
          )}
        </div>
      </div>

      {/* Pemilih Sampel dalam Mod Latihan Bebas */}
      {mode === 'practice' && (
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
          <span className="text-[11px] font-bold text-slate-500 mr-1">Pilih Garam:</span>
          {ANION_SALT_SAMPLES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setPracticeSampleId(s.id);
                resetRound();
              }}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition ${
                practiceSampleId === s.id
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
              }`}
            >
              {s.formula}
            </button>
          ))}
        </div>
      )}

      {/* MEJA MAKMAL UTAMA (2 KOLUM) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        {/* KOLUM KIRI: RADAS TABUNG DIDIH / TABUNG UJI */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
            <div>
              <div className="flex items-center gap-1.5">
                <FlaskConical className="w-4 h-4 text-fuchsia-600" />
                <h3 className="text-sm font-black text-slate-900">
                  {mode === 'mystery'
                    ? `Pepejal Garam Y${sampleNum}`
                    : `${currentSample.name} (${currentSample.formula})`}
                </h3>
              </div>
              <p className="text-[10.5px] text-slate-500 mt-0.5">
                {currentSample.isSolubleInWater
                  ? 'Larut dalam air membentuk larutan akueus untuk ujian reagen.'
                  : 'Pepejal tak larut: uji dengan pemanasan atau tindak balas asid cair.'}
              </p>
            </div>

            <div className="text-right shrink-0">
              <div className="text-[9.5px] font-bold uppercase text-slate-400">
                Warna Pepejal
              </div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-[11px] font-extrabold text-slate-800 mt-0.5">
                <span
                  className="w-2.5 h-2.5 rounded-full border border-slate-400"
                  style={{ backgroundColor: currentSample.solidHex }}
                />
                {currentSample.solidColorLabel}
              </div>
            </div>
          </div>

          {/* Zon Drop Radas SVG */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDropOnApparatus}
            className={`rounded-xl border-2 p-2 flex flex-col items-center justify-center transition-all ${
              isDragOver
                ? 'border-fuchsia-500 bg-fuchsia-50/40 scale-[1.01]'
                : 'border-slate-200 bg-slate-50/70'
            }`}
          >
            <AnionApparatusSVG
              sampleLabel={sampleLabel}
              sample={currentSample}
              activeTest={activeTestDef}
              stage={stage}
              result={visualResult}
              isHeatedColdView={isColdView}
              isRinsing={isRinsing}
              isDragOver={isDragOver}
            />
          </div>

          {/* Kawalan Tindakan Radas (Langkah 2 / Suhu Sejuk vs Panas / Cuci Tabung Uji) */}
          <div className="grid grid-cols-2 gap-1.5">
            {activeTestDef?.step2Label && stage === 'step1' ? (
              <button
                type="button"
                onClick={handleAdvanceStep2}
                className="py-2 px-2.5 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-[11px] font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition"
              >
                <Droplets className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{activeTestDef.step2Label}</span>
              </button>
            ) : activeTestDef?.group === 'heating' ? (
              <button
                type="button"
                onClick={() => setIsColdView((v) => !v)}
                className={`py-2 px-2.5 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1.5 border transition ${
                  isColdView
                    ? 'bg-sky-600 text-white border-sky-700'
                    : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                }`}
              >
                <Thermometer className="w-3.5 h-3.5" />
                {isColdView ? 'Baki Selepas Sejuk' : 'Sejukkan (Lihat Baki)'}
              </button>
            ) : (
              <div className="py-2 px-2.5 rounded-lg bg-slate-100 text-slate-400 border border-slate-200 text-[11px] font-bold flex items-center justify-center">
                {activeTestDef ? 'Ujian selesai' : 'Seret atau pilih ujian →'}
              </div>
            )}

            <button
              type="button"
              disabled={!canWash}
              onClick={handleWashTube}
              className={`py-2 px-2.5 rounded-lg text-[11.5px] font-extrabold flex items-center justify-center gap-1.5 border transition ${
                canWash
                  ? 'bg-sky-50 text-sky-900 border-sky-300 hover:bg-sky-100 shadow-sm'
                  : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
              }`}
              title={
                mode === 'mystery' && roundStatus !== 'active'
                  ? 'Keputusan pusingan telah terhasil'
                  : 'Cuci tabung uji untuk mengulang ujian dengan kaedah atau reagen lain'
              }
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Cuci Tabung Uji
            </button>
          </div>

          {/* Pemerhatian Semasa */}
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-2.5 space-y-1">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              Pemerhatian Semasa
            </div>
            {visualResult ? (
              <>
                <div className="text-xs font-extrabold text-slate-900 leading-snug">
                  {visualResult.observationText}
                </div>
                <p className="text-[11px] text-fuchsia-800 font-medium leading-snug">
                  💡 {visualResult.inferenceHint}
                </p>
              </>
            ) : (
              <p className="text-[11.5px] text-slate-600">
                Sampel pepejal <strong>{sampleLabel}</strong> berwarna{' '}
                <strong>{currentSample.solidColorLabel.toLowerCase()}</strong> sedia diuji. Cuba
                panaskan pepejal garam (Rajah 6.46/6.47) atau jalankan ujian anion (Eksperimen
                6.9).
              </p>
            )}
          </div>
        </div>

        {/* KOLUM KANAN: PANEL UJIAN + BUKU LOG + IDENTIFIKASI ANION */}
        <div className="lg:col-span-7 flex flex-col gap-2.5">
          <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-sm">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setRightTab('lab')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition ${
                  rightTab === 'lab'
                    ? 'bg-fuchsia-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FlaskConical className="w-3.5 h-3.5" />
                Ujian Pemanasan & Anion
              </button>
              <button
                type="button"
                onClick={() => setRightTab('guide')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition ${
                  rightTab === 'guide'
                    ? 'bg-fuchsia-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Jadual 6.13–6.16 & Carta Alir
              </button>
            </div>

            {mode === 'mystery' && (
              <button
                type="button"
                onClick={handleNextMystery}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold text-slate-600 hover:text-fuchsia-700 hover:bg-fuchsia-50 border border-slate-200 transition"
              >
                <Shuffle className="w-3.5 h-3.5" />
                Sampel Lain
              </button>
            )}
          </div>

          {rightTab === 'lab' ? (
            <>
              {/* RAK UJIAN PEMANASAN & REAGEN ANION */}
              <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm space-y-2">
                {washWarning && (
                  <div className="flex items-center justify-between gap-2 bg-amber-50 border border-amber-300 rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-amber-900">
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      {washWarning}
                    </span>
                    <button
                      type="button"
                      onClick={handleWashTube}
                      className="px-2 py-0.5 rounded bg-sky-600 text-white hover:bg-sky-500 shrink-0"
                    >
                      Cuci Sekarang
                    </button>
                  </div>
                )}

                {/* Bahagian 1: Pemanasan Pepejal Garam */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-orange-800">
                      Kaedah A: Pemanasan Pepejal Garam (Rajah 6.46 & 6.47)
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      Seret ke tabung atau klik
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {heatingTests.map((t) => {
                      const active = activeTestId === t.id;
                      const locked = mode === 'mystery' && roundStatus !== 'active';
                      return (
                        <button
                          key={t.id}
                          type="button"
                          disabled={locked}
                          draggable={!locked}
                          onDragStart={(e) => handleDragStart(e, t.id)}
                          onClick={() => handleStartTest(t.id)}
                          className={`p-2 rounded-xl border text-left transition ${
                            locked
                              ? 'opacity-50 cursor-not-allowed bg-slate-50 border-slate-200'
                              : active
                              ? 'bg-orange-50 border-orange-500 ring-1 ring-orange-300 shadow-sm cursor-pointer'
                              : 'bg-orange-50/40 border-orange-200 hover:border-orange-400 cursor-grab active:cursor-grabbing'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-slate-900">
                              {t.shortLabel}
                            </span>
                            <Flame className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                          </div>
                          <div className="text-[10px] text-slate-600 font-medium mt-0.5">
                            {t.hint}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bahagian 2: Ujian Reagen Anion dalam Larutan */}
                <div>
                  <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-fuchsia-800 mb-1">
                    Kaedah B: Ujian Anion dalam Larutan Garam (Eksperimen 6.9 / Jadual 6.16)
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {reagentTests.map((t) => {
                      const active = activeTestId === t.id;
                      const locked = mode === 'mystery' && roundStatus !== 'active';
                      return (
                        <button
                          key={t.id}
                          type="button"
                          disabled={locked}
                          draggable={!locked}
                          onDragStart={(e) => handleDragStart(e, t.id)}
                          onClick={() => handleStartTest(t.id)}
                          className={`p-2 rounded-xl border text-left transition ${
                            locked
                              ? 'opacity-50 cursor-not-allowed bg-slate-50 border-slate-200'
                              : active
                              ? 'bg-fuchsia-50 border-fuchsia-500 ring-1 ring-fuchsia-300 shadow-sm cursor-pointer'
                              : 'bg-slate-50/70 border-slate-200 hover:border-fuchsia-400 hover:bg-white cursor-grab active:cursor-grabbing'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-black text-slate-900">
                              {t.shortLabel}
                            </span>
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: t.accentHex }}
                            />
                          </div>
                          <div className="text-[10px] text-slate-600 font-medium leading-tight mt-0.5">
                            {t.step2Label ? `${t.step1Label} → ${t.step2Label}` : t.step1Label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* BUKU NOTA PEMERHATIAN */}
              <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-extrabold text-slate-800">
                    Buku Nota Pemerhatian ({sampleLabel})
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    {logs.length} ujian direkod
                  </span>
                </div>
                {logs.length === 0 ? (
                  <p className="text-[11px] text-slate-400 italic py-1">
                    Belum ada ujian dijalankan ke atas {sampleLabel}. Mulakan dengan memanaskan
                    pepejal atau menguji reagen anion.
                  </p>
                ) : (
                  <div className="max-h-[78px] overflow-y-auto space-y-1 pr-1">
                    {logs.map((item, idx) => (
                      <div
                        key={item.id}
                        className="text-[11px] bg-slate-50 border border-slate-100 rounded-lg px-2 py-1 flex items-start gap-1.5"
                      >
                        <span className="font-mono font-bold text-fuchsia-700 shrink-0">
                          #{logs.length - idx} [{item.label}]:
                        </span>
                        <span className="text-slate-700 font-medium">{item.detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* PANEL TEKAAN / IDENTIFIKASI ANION */}
              {mode === 'mystery' ? (
                <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold text-slate-900">
                      Kenal Pasti Anion dalam {sampleLabel}:
                    </h4>
                    {roundStatus === 'active' && (
                      <span className="text-[10px] font-semibold text-slate-500">
                        Pilih 1 daripada 4 anion & klik Sahkan
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {ANION_LIST.map((a) => {
                      const isChosen = selectedGuessId === a.id;
                      const isReveal =
                        roundStatus !== 'active' && a.id === currentSample.anionId;
                      return (
                        <button
                          key={a.id}
                          type="button"
                          disabled={roundStatus !== 'active'}
                          onClick={() => setSelectedGuessId(a.id)}
                          className={`p-2 rounded-xl border text-center transition ${
                            isReveal
                              ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                              : isChosen
                              ? 'bg-fuchsia-600 text-white border-fuchsia-700 shadow-sm'
                              : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-fuchsia-300'
                          }`}
                        >
                          <div className="text-sm font-black leading-none">{a.formula}</div>
                          <div
                            className={`text-[10px] mt-1 font-semibold ${
                              isChosen || isReveal ? 'text-white/90' : 'text-slate-500'
                            }`}
                          >
                            {a.name}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {feedbackMsg && (
                    <div
                      className={`rounded-lg px-2.5 py-2 text-[11.5px] font-bold flex items-start gap-2 border ${
                        roundStatus === 'won'
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                          : roundStatus === 'failed'
                          ? 'bg-rose-50 border-rose-300 text-rose-900'
                          : 'bg-amber-50 border-amber-300 text-amber-900'
                      }`}
                    >
                      {roundStatus === 'won' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : roundStatus === 'failed' ? (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      )}
                      <span>{feedbackMsg}</span>
                    </div>
                  )}

                  {roundStatus === 'active' ? (
                    <button
                      type="button"
                      disabled={!selectedGuessId}
                      onClick={handleSubmitGuess}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition ${
                        selectedGuessId
                          ? 'bg-fuchsia-600 hover:bg-fuchsia-500 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Sahkan Identiti Anion {sampleLabel}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNextMystery}
                      className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition"
                    >
                      Teruskan ke Garam Misteri Y{sampleNum + 1}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-2.5 text-xs text-indigo-900">
                  <strong>Nota Pemanasan ({currentSample.formula}):</strong>{' '}
                  {currentSample.heatObservationNote}
                </div>
              )}
            </>
          ) : (
            /* TAB RUJUKAN JADUAL 6.13 - 6.16 & RAJAH 6.52 */
            <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm space-y-2.5 max-h-[430px] overflow-y-auto text-[11px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="bg-orange-50/70 border border-orange-200 rounded-xl p-2.5 space-y-1">
                  <div className="font-extrabold text-orange-900">
                    Jadual 6.14: Gas daripada Pemanasan Garam
                  </div>
                  <ul className="space-y-1 text-slate-700 list-disc pl-4">
                    <li>
                      <strong>Mengeruhkan air kapur (CO₂):</strong> Garam{' '}
                      <strong>karbonat</strong> (kecuali Na₂CO₃, K₂CO₃).
                    </li>
                    <li>
                      <strong>Gas perang NO₂ + nyala kayu uji berbara (O₂):</strong> Garam{' '}
                      <strong>nitrat</strong> (NaNO₃/KNO₃ hasilkan O₂ sahaja).
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-2.5 space-y-1">
                  <div className="font-extrabold text-amber-900">
                    Jadual 6.13 & Lensa Kimia: Warna Baki Oksida Logam
                  </div>
                  <ul className="space-y-1 text-slate-700 list-disc pl-4">
                    <li>
                      <strong>ZnO:</strong> Kuning (panas) → Putih (sejuk)
                    </li>
                    <li>
                      <strong>PbO:</strong> Perang (panas) → Kuning (sejuk)
                    </li>
                    <li>
                      <strong>CuO:</strong> Hitam | <strong>Fe₂O₃:</strong> Perang
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-fuchsia-50/60 border border-fuchsia-200 rounded-xl p-2.5 space-y-1.5">
                <div className="font-extrabold text-fuchsia-900">
                  Rajah 6.52 & Jadual 6.16: Ujian Pengesahan 4 Anion KSSM
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-800">
                  <div className="bg-white border border-fuchsia-100 rounded-lg p-2">
                    <strong>Ion karbonat, CO₃²⁻:</strong> + Asid cair → pembuakan gas CO₂
                    mengeruhkan air kapur.
                  </div>
                  <div className="bg-white border border-fuchsia-100 rounded-lg p-2">
                    <strong>Ion klorida, Cl⁻:</strong> + HNO₃ cair berlebihan + AgNO₃(ak) →{' '}
                    <strong>Mendakan putih (AgCl)</strong>.
                  </div>
                  <div className="bg-white border border-fuchsia-100 rounded-lg p-2">
                    <strong>Ion sulfat, SO₄²⁻:</strong> + HCl cair berlebihan + BaCl₂(ak) →{' '}
                    <strong>Mendakan putih (BaSO₄)</strong>.
                  </div>
                  <div className="bg-white border border-fuchsia-100 rounded-lg p-2">
                    <strong>Ion nitrat, NO₃⁻:</strong> + H₂SO₄ cair + FeSO₄ + H₂SO₄ pekat
                    (condong) → <strong>Cincin perang</strong>.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
