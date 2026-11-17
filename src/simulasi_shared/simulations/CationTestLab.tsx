import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  TestTube,
  Droplets,
  Flame,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Trophy,
  Flame as StreakIcon,
  Heart,
  BookOpen,
  FlaskConical,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  Shuffle,
  Eye,
} from 'lucide-react';
import {
  CATION_PROFILES,
  REAGENT_DEFS,
  CationId,
  ReagentId,
  DosageStage,
  evaluateCationTest,
} from '../data/cationTests';
import { CationTestTubeSVG } from '../components/CationTestTubeSVG';
import { analytics } from '../services/analytics';

const SIM_ID = 'ujian-kation';

interface ObservationLog {
  id: string;
  reagentLabel: string;
  detail: string;
}

function buildShuffledQueue(): CationId[] {
  const ids: CationId[] = CATION_PROFILES.map((c) => c.id);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids;
}

type GameMode = 'mystery' | 'practice';
type RightTab = 'lab' | 'guide';

export const CationTestLab: React.FC = () => {
  const [mode, setMode] = useState<GameMode>('mystery');
  const [rightTab, setRightTab] = useState<RightTab>('lab');
  const [mysteryQueue, setMysteryQueue] = useState<CationId[]>(() => buildShuffledQueue());
  const [queueIdx, setQueueIdx] = useState<number>(0);
  const [practiceCationId, setPracticeCationId] = useState<CationId>('pb2');

  // State makmal bagi sampel semasa
  const [sampleNum, setSampleNum] = useState<number>(1);
  const [activeReagentId, setActiveReagentId] = useState<ReagentId | null>(null);
  const [dosage, setDosage] = useState<DosageStage | null>(null);
  const [isHeated, setIsHeated] = useState<boolean>(false);
  const [isRinsing, setIsRinsing] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [washWarning, setWashWarning] = useState<string | null>(null);
  const [logs, setLogs] = useState<ObservationLog[]>([]);

  // State gamifikasi
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [solvedIds, setSolvedIds] = useState<CationId[]>([]);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(3);
  const [selectedGuessId, setSelectedGuessId] = useState<CationId | null>(null);
  const [roundStatus, setRoundStatus] = useState<'active' | 'won' | 'failed'>('active');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const currentCationId: CationId =
    mode === 'mystery' ? mysteryQueue[queueIdx % mysteryQueue.length] : practiceCationId;
  const currentCation = useMemo(
    () => CATION_PROFILES.find((c) => c.id === currentCationId) ?? CATION_PROFILES[0],
    [currentCationId]
  );

  const activeReagent = useMemo(
    () => REAGENT_DEFS.find((r) => r.id === activeReagentId) ?? null,
    [activeReagentId]
  );

  const tubeResult = useMemo(() => {
    if (!activeReagentId || !dosage) return null;
    return evaluateCationTest(currentCationId, activeReagentId, dosage);
  }, [currentCationId, activeReagentId, dosage]);

  useEffect(() => {
    analytics.recordSimulationClick(SIM_ID, 1);
  }, []);

  const appendLog = (reagentLabel: string, detail: string) => {
    setLogs((prev) => [
      { id: `${Date.now()}-${Math.random()}`, reagentLabel, detail },
      ...prev,
    ]);
  };

  // Uji reagen ke dalam tabung uji (melalui klik atau seret & lepas)
  const handleAddReagent = (reagentId: ReagentId) => {
    if (mode === 'mystery' && roundStatus !== 'active') return;
    setWashWarning(null);
    setFeedbackMsg(null);

    const chosen = REAGENT_DEFS.find((r) => r.id === reagentId)!;

    // Jika tabung uji sudah ada reagen lain dan belum dicuci:
    if (activeReagentId && activeReagentId !== reagentId) {
      setWashWarning(
        `Tabung uji masih mengandungi campuran ${activeReagent?.shortLabel}. Sila klik "Cuci Tabung Uji" dahulu sebelum menguji ${chosen.shortLabel}!`
      );
      return;
    }

    // Jika tabung uji sudah ada alkali (NaOH/NH3) pada dos sedikit dan pengguna klik lagi botol sama:
    if (activeReagentId === reagentId) {
      if (chosen.supportsExcess && dosage === 'few') {
        handleAddExcess();
      } else {
        setWashWarning(
          `Ujian ${chosen.shortLabel} telah dijalankan dalam tabung ini. Cuci tabung uji untuk mengulang atau menukar reagen lain.`
        );
      }
      return;
    }

    const initialStage: DosageStage = 'few';
    const evalRes = evaluateCationTest(currentCationId, reagentId, initialStage);
    setActiveReagentId(reagentId);
    setDosage(initialStage);
    setIsHeated(false);
    appendLog(
      `${chosen.shortLabel}${chosen.supportsExcess ? ' (sedikit)' : ''}`,
      evalRes.observationText
    );
  };

  const handleAddExcess = () => {
    if (!activeReagentId || !activeReagent?.supportsExcess || dosage === 'excess') return;
    if (mode === 'mystery' && roundStatus !== 'active') return;
    setWashWarning(null);
    const evalRes = evaluateCationTest(currentCationId, activeReagentId, 'excess');
    setDosage('excess');
    setIsHeated(false);
    appendLog(`${activeReagent.shortLabel} (berlebihan)`, evalRes.observationText);
  };

  const handleToggleHeat = () => {
    if (!tubeResult?.canHeat || !activeReagent) return;
    const nextHeat = !isHeated;
    setIsHeated(nextHeat);
    if (nextHeat && tubeResult.heatedObservation) {
      appendLog(`${activeReagent.shortLabel} + Panaskan`, tubeResult.heatedObservation);
    }
  };

  // Cuci tabung uji (hanya aktif selagi keputusan akhir pusingan belum tamat)
  const handleWashTube = () => {
    if (mode === 'mystery' && roundStatus !== 'active') return;
    setWashWarning(null);
    setIsRinsing(true);
    window.setTimeout(() => {
      setActiveReagentId(null);
      setDosage(null);
      setIsHeated(false);
      setIsRinsing(false);
    }, 520);
  };

  // Seret & lepas botol reagen
  const handleReagentDragStart = (e: React.DragEvent, reagentId: ReagentId) => {
    e.dataTransfer.setData('application/x-reagent', reagentId);
    e.dataTransfer.setData('text/plain', reagentId);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleTubeDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const raw =
      (e.dataTransfer.getData('application/x-reagent') as ReagentId) ||
      (e.dataTransfer.getData('text/plain') as ReagentId);
    if (REAGENT_DEFS.some((r) => r.id === raw)) {
      handleAddReagent(raw);
    }
  };

  // Semak jawapan tekaan kation (Gamifikasi)
  const handleSubmitGuess = () => {
    if (!selectedGuessId || roundStatus !== 'active') return;

    if (selectedGuessId === currentCationId) {
      const gained = 100 + streak * 20;
      setScore((s) => s + gained);
      setStreak((st) => st + 1);
      setRoundStatus('won');
      setFeedbackMsg(
        `Tepat! Sampel X${sampleNum} mengandungi ${currentCation.name} (${currentCation.formula}) — ${currentCation.sampleSaltName}. (+${gained} mata)`
      );
      setSolvedIds((prev) => {
        const next = prev.includes(currentCationId) ? prev : [...prev, currentCationId];
        if (next.length >= 3) {
          analytics.recordSimulationCompleted(SIM_ID);
        }
        return next;
      });
      confetti({ particleCount: 55, spread: 60, origin: { y: 0.65 } });
      return;
    }

    const remaining = attemptsLeft - 1;
    setAttemptsLeft(remaining);
    setStreak(0);
    setScore((s) => Math.max(0, s - 20));

    if (remaining <= 0) {
      setRoundStatus('failed');
      setFeedbackMsg(
        `Cubaan tamat! Jawapan sebenar bagi Sampel X${sampleNum} ialah ${currentCation.name} (${currentCation.formula}). ${currentCation.hintClue}`
      );
    } else {
      setFeedbackMsg(
        `Belum tepat (−20 mata). Baki cubaan: ${remaining}. Anda boleh mencuci tabung uji untuk menguji reagen lain!`
      );
    }
  };

  const resetRoundTubeAndLogs = () => {
    setActiveReagentId(null);
    setDosage(null);
    setIsHeated(false);
    setWashWarning(null);
    setLogs([]);
    setSelectedGuessId(null);
    setAttemptsLeft(3);
    setRoundStatus('active');
    setFeedbackMsg(null);
  };

  const handleNextMysterySample = () => {
    resetRoundTubeAndLogs();
    setSampleNum((n) => n + 1);
    if (queueIdx + 1 >= mysteryQueue.length) {
      setMysteryQueue(buildShuffledQueue());
      setQueueIdx(0);
    } else {
      setQueueIdx((idx) => idx + 1);
    }
  };

  const handleSelectPracticeCation = (id: CationId) => {
    setPracticeCationId(id);
    resetRoundTubeAndLogs();
  };

  const switchMode = (nextMode: GameMode) => {
    setMode(nextMode);
    resetRoundTubeAndLogs();
  };

  const sampleLabel =
    mode === 'mystery' ? `Sampel X${sampleNum}` : `Sampel ${currentCation.formula}`;

  const canWashTube =
    activeReagentId !== null && (mode === 'practice' || roundStatus === 'active');

  return (
    <div className="flex flex-col gap-2.5 text-slate-800">
      {/* BAR GAMIFIKASI & KAWALAN MOD */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-violet-50 via-white to-indigo-50 border border-violet-200 rounded-xl px-3 py-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => switchMode('mystery')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition ${
              mode === 'mystery'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Mod Gamifikasi (Sampel Misteri)
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

        {/* Statistik Gamifikasi */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-extrabold">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            Skor: {score}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800">
            <StreakIcon className="w-3.5 h-3.5 text-orange-600" />
            Rentetan: {streak}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Dikesan: {solvedIds.length}/9 ion
          </span>
          {mode === 'mystery' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800">
              <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-500" />
              Cubaan: {attemptsLeft}/3
            </span>
          )}
        </div>
      </div>

      {/* Pemilih Kation pantas apabila dalam Mod Latihan Bebas */}
      {mode === 'practice' && (
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
          <span className="text-[11px] font-bold text-slate-500 mr-1">Pilih Larutan:</span>
          {CATION_PROFILES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleSelectPracticeCation(c.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition ${
                practiceCationId === c.id
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
              }`}
            >
              {c.formula} ({c.name.replace('Ion ', '')})
            </button>
          ))}
        </div>
      )}

      {/* MEJA MAKMAL UTAMA (2 KOLUM) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        {/* KOLUM KIRI: TABUNG UJI & KAWALAN BUKAN-KONTAMINASI */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex flex-col gap-2.5">
          {/* Header Sampel */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
            <div>
              <div className="flex items-center gap-1.5">
                <TestTube className="w-4 h-4 text-violet-600" />
                <h3 className="text-sm font-black text-slate-900">
                  {mode === 'mystery'
                    ? `Larutan Misteri X${sampleNum}`
                    : `${currentCation.name} (${currentCation.formula})`}
                </h3>
              </div>
              <p className="text-[10.5px] text-slate-500 mt-0.5">
                {mode === 'mystery'
                  ? 'Seret botol reagen ke tabung uji atau klik untuk menguji.'
                  : currentCation.sampleSaltName}
              </p>
            </div>

            <div className="text-right shrink-0">
              <div className="text-[9.5px] font-bold uppercase text-slate-400">
                Warna Asal
              </div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-[11px] font-extrabold text-slate-800 mt-0.5">
                <span
                  className="w-2.5 h-2.5 rounded-full border border-slate-400"
                  style={{ backgroundColor: currentCation.initialLiquidHex }}
                />
                {currentCation.initialColorLabel}
              </div>
            </div>
          </div>

          {/* Zon Drop Tabung Uji SVG */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleTubeDrop}
            className={`rounded-xl border-2 p-2 flex flex-col items-center justify-center transition-all ${
              isDragOver
                ? 'border-violet-500 bg-violet-50/50 scale-[1.01]'
                : 'border-slate-200 bg-slate-50/70'
            }`}
          >
            <CationTestTubeSVG
              sampleLabel={sampleLabel}
              cation={currentCation}
              reagent={activeReagent}
              dosage={dosage}
              result={tubeResult}
              isHeated={isHeated}
              isRinsing={isRinsing}
              isDragOver={isDragOver}
            />
          </div>

          {/* Butang Tindakan Tabung Uji (+Berlebihan, Panaskan, Cuci Tabung Uji) */}
          <div className="grid grid-cols-2 gap-1.5">
            {activeReagent?.supportsExcess && dosage === 'few' ? (
              <button
                type="button"
                onClick={handleAddExcess}
                className="py-2 px-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-[11.5px] font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition"
              >
                <Droplets className="w-3.5 h-3.5" />
                + Tambah Berlebihan
              </button>
            ) : tubeResult?.canHeat ? (
              <button
                type="button"
                onClick={handleToggleHeat}
                className={`py-2 px-2.5 rounded-lg text-[11.5px] font-extrabold flex items-center justify-center gap-1.5 border transition ${
                  isHeated
                    ? 'bg-orange-600 text-white border-orange-700 shadow-sm'
                    : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                {isHeated ? 'Sejukkan Campuran' : 'Panaskan & Uji'}
              </button>
            ) : (
              <div className="py-2 px-2.5 rounded-lg bg-slate-100 text-slate-400 border border-slate-200 text-[11px] font-bold flex items-center justify-center">
                {activeReagent ? 'Tindak balas selesai' : 'Pilih reagen di kanan →'}
              </div>
            )}

            <button
              type="button"
              disabled={!canWashTube}
              onClick={handleWashTube}
              className={`py-2 px-2.5 rounded-lg text-[11.5px] font-extrabold flex items-center justify-center gap-1.5 border transition ${
                canWashTube
                  ? 'bg-sky-50 text-sky-900 border-sky-300 hover:bg-sky-100 shadow-sm'
                  : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
              }`}
              title={
                mode === 'mystery' && roundStatus !== 'active'
                  ? 'Keputusan pusingan sudah selesai'
                  : 'Bilas tabung uji untuk mengulang ujian dengan reagen lain'
              }
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Cuci Tabung Uji
            </button>
          </div>

          {/* Butang Panaskan sekunder jika NaOH sedang dalam mod Berlebihan atau belum dipanaskan */}
          {activeReagent?.supportsExcess && dosage === 'few' && tubeResult?.canHeat && (
            <button
              type="button"
              onClick={handleToggleHeat}
              className={`w-full py-1.5 px-2.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 border transition ${
                isHeated
                  ? 'bg-orange-600 text-white border-orange-700'
                  : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              {isHeated
                ? 'Hentikan Pemanasan'
                : 'Panaskan + Kertas Litmus Merah Lembap (Uji Gas NH₃)'}
            </button>
          )}

          {/* Kotak Pemerhatian Semasa */}
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-2.5 space-y-1">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              Pemerhatian Semasa
            </div>
            {tubeResult ? (
              <>
                <div className="text-xs font-extrabold text-slate-900 leading-snug">
                  {isHeated && tubeResult.heatedObservation
                    ? tubeResult.heatedObservation
                    : tubeResult.observationText}
                </div>
                <p className="text-[11px] text-violet-800 font-medium leading-snug">
                  💡 {tubeResult.inferenceHint}
                </p>
              </>
            ) : (
              <p className="text-[11.5px] text-slate-600">
                Tabung uji bersih mengandungi <strong>2.0 cm³ {sampleLabel}</strong> berwarna{' '}
                <strong>{currentCation.initialColorLabel.toLowerCase()}</strong>. Seret atau klik
                reagen di kanan untuk memulakan ujian.
              </p>
            )}
          </div>
        </div>

        {/* KOLUM KANAN: RAK REAGEN + BUKU LOG + PANEL TEKAAN / PANDUAN */}
        <div className="lg:col-span-7 flex flex-col gap-2.5">
          {/* Tab Atas Kolum Kanan */}
          <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-sm">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setRightTab('lab')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition ${
                  rightTab === 'lab'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FlaskConical className="w-3.5 h-3.5" />
                Rak Reagen & Kenal Pasti Kation
              </button>
              <button
                type="button"
                onClick={() => setRightTab('guide')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition ${
                  rightTab === 'guide'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Carta Alir Buku Teks (Rajah 6.56–6.60)
              </button>
            </div>

            {mode === 'mystery' && (
              <button
                type="button"
                onClick={handleNextMysterySample}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold text-slate-600 hover:text-violet-700 hover:bg-violet-50 border border-slate-200 transition"
                title="Langkau ke sampel misteri seterusnya"
              >
                <Shuffle className="w-3.5 h-3.5" />
                Sampel Lain
              </button>
            )}
          </div>

          {rightTab === 'lab' ? (
            <>
              {/* RAK BOTOL REAGEN */}
              <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-slate-800">
                    Rak Botol Reagen (Seret ke Tabung Uji atau Klik)
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    Cuci tabung sebelum tukar reagen
                  </span>
                </div>

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

                {/* Kumpulan 1: Ujian Alkali Utama + Kumpulan 2: Reagen Pengesahan */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {REAGENT_DEFS.map((r) => {
                    const isActive = activeReagentId === r.id;
                    const disabledDone = mode === 'mystery' && roundStatus !== 'active';
                    return (
                      <button
                        key={r.id}
                        type="button"
                        disabled={disabledDone}
                        draggable={!disabledDone}
                        onDragStart={(e) => handleReagentDragStart(e, r.id)}
                        onClick={() => handleAddReagent(r.id)}
                        className={`p-2 rounded-xl border text-left transition flex flex-col justify-between gap-0.5 ${
                          disabledDone
                            ? 'opacity-50 cursor-not-allowed bg-slate-50 border-slate-200'
                            : isActive
                            ? 'bg-violet-50 border-violet-500 ring-1 ring-violet-300 shadow-sm cursor-pointer'
                            : 'bg-slate-50/70 border-slate-200 hover:border-violet-400 hover:bg-white cursor-grab active:cursor-grabbing'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-black text-slate-900">
                            {r.shortLabel}
                          </span>
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: r.bottleColorHex }}
                          />
                        </div>
                        <div className="text-[10px] font-semibold text-slate-600 leading-tight">
                          {r.fullName}
                        </div>
                        <div className="text-[9px] font-medium text-violet-700 truncate">
                          {r.targetHint}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* BUKU NOTA PEMERHATIAN SAMPEL SEMASA */}
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
                    Belum ada ujian dijalankan ke atas {sampleLabel}. Mulakan dengan NaOH atau NH₃.
                  </p>
                ) : (
                  <div className="max-h-[82px] overflow-y-auto space-y-1 pr-1">
                    {logs.map((item, idx) => (
                      <div
                        key={item.id}
                        className="text-[11px] bg-slate-50 border border-slate-100 rounded-lg px-2 py-1 flex items-start gap-1.5"
                      >
                        <span className="font-mono font-bold text-violet-700 shrink-0">
                          #{logs.length - idx} [{item.reagentLabel}]:
                        </span>
                        <span className="text-slate-700 font-medium">{item.detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* PANEL TEKAAN / IDENTIFIKASI KATION (MOD GAMIFIKASI) */}
              {mode === 'mystery' ? (
                <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold text-slate-900">
                      Kenal Pasti Kation dalam {sampleLabel}:
                    </h4>
                    {roundStatus === 'active' && (
                      <span className="text-[10px] font-semibold text-slate-500">
                        Pilih kation & klik Sahkan
                      </span>
                    )}
                  </div>

                  {/* Grid 9 Kation */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                    {CATION_PROFILES.map((c) => {
                      const isChosen = selectedGuessId === c.id;
                      const isCorrectReveal =
                        roundStatus !== 'active' && c.id === currentCationId;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          disabled={roundStatus !== 'active'}
                          onClick={() => setSelectedGuessId(c.id)}
                          className={`px-2 py-1.5 rounded-lg border text-center transition ${
                            isCorrectReveal
                              ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                              : isChosen
                              ? 'bg-violet-600 text-white border-violet-700 shadow-sm'
                              : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-violet-300'
                          }`}
                        >
                          <div className="text-xs font-black leading-none">{c.formula}</div>
                          <div
                            className={`text-[9px] truncate mt-0.5 ${
                              isChosen || isCorrectReveal ? 'text-white/90' : 'text-slate-500'
                            }`}
                          >
                            {c.name.replace('Ion ', '')}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Maklum balas / Butang Sahkan atau Seterusnya */}
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
                          ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Sahkan Identiti Kation {sampleLabel}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNextMysterySample}
                      className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition"
                    >
                      Teruskan ke Sampel Misteri X{sampleNum + 1}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-2.5 text-xs text-indigo-900">
                  <strong>Ringkasan Kation Semasa ({currentCation.formula}):</strong>{' '}
                  {currentCation.hintClue}
                </div>
              )}
            </>
          ) : (
            /* TAB PANDUAN CARTA ALIR KSSM (RAJAH 6.56 - 6.60) */
            <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm space-y-2.5 max-h-[430px] overflow-y-auto text-[11px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {/* Rajah 6.56: NaOH */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-1.5">
                  <div className="font-extrabold text-sky-900">
                    Carta Alir NaOH (Rajah 6.56 KSSM)
                  </div>
                  <ul className="space-y-1 text-slate-700 list-disc pl-4">
                    <li>
                      <strong>Tiada mendakan:</strong> Mungkin <strong>NH₄⁺</strong>. Panaskan +
                      litmus merah → menjadi <strong>biru</strong> (gas NH₃).
                    </li>
                    <li>
                      <strong>Mendakan putih larut berlebihan (ZAP):</strong>{' '}
                      <strong>Zn²⁺, Al³⁺, Pb²⁺</strong>.
                    </li>
                    <li>
                      <strong>Mendakan putih tidak larut berlebihan:</strong>{' '}
                      <strong>Mg²⁺, Ca²⁺</strong>.
                    </li>
                    <li>
                      <strong>Mendakan berwarna (tidak larut):</strong>{' '}
                      <strong>Fe²⁺</strong> (hijau), <strong>Fe³⁺</strong> (perang),{' '}
                      <strong>Cu²⁺</strong> (biru).
                    </li>
                  </ul>
                </div>

                {/* Rajah 6.57: NH3 */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-1.5">
                  <div className="font-extrabold text-teal-900">
                    Carta Alir NH₃ (Rajah 6.57 KSSM)
                  </div>
                  <ul className="space-y-1 text-slate-700 list-disc pl-4">
                    <li>
                      <strong>Tiada mendakan:</strong> <strong>Ca²⁺</strong> atau{' '}
                      <strong>NH₄⁺</strong> mungkin hadir.
                    </li>
                    <li>
                      <strong>Mendakan putih larut berlebihan:</strong>{' '}
                      <strong>Zn²⁺</strong> sahaja!
                    </li>
                    <li>
                      <strong>Mendakan putih tidak larut berlebihan:</strong>{' '}
                      <strong>Mg²⁺, Pb²⁺, Al³⁺</strong>.
                    </li>
                    <li>
                      <strong>Mendakan biru larut → biru tua:</strong>{' '}
                      <strong>Cu²⁺</strong>.
                    </li>
                    <li>
                      <strong>Mendakan berwarna tidak larut:</strong>{' '}
                      <strong>Fe²⁺</strong> (hijau), <strong>Fe³⁺</strong> (perang).
                    </li>
                  </ul>
                </div>
              </div>

              {/* Rajah 6.59 & 6.60: Ujian Pengesahan */}
              <div className="bg-violet-50 border border-violet-200 rounded-xl p-2.5 space-y-1.5">
                <div className="font-extrabold text-violet-900">
                  Ujian Pengesahan Kation (Rajah 6.58 – 6.60 & Lensa Kimia)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-800">
                  <div className="bg-white border border-violet-100 rounded-lg p-2">
                    <strong>NH₄⁺ + Reagen Nessler:</strong> Mendakan perang terbentuk.
                  </div>
                  <div className="bg-white border border-violet-100 rounded-lg p-2">
                    <strong>Fe²⁺ + K₃Fe(CN)₆:</strong> Mendakan biru tua.{' '}
                    <span className="text-slate-500">(Dengan K₄Fe(CN)₆: biru muda)</span>
                  </div>
                  <div className="bg-white border border-violet-100 rounded-lg p-2">
                    <strong>Fe³⁺ + K₄Fe(CN)₆ / KSCN:</strong> Mendakan biru tua / Larutan merah
                    darah.
                  </div>
                  <div className="bg-white border border-violet-100 rounded-lg p-2">
                    <strong>Pb²⁺ vs Al³⁺ + KI (Rajah 6.60):</strong> Pb²⁺ hasilkan{' '}
                    <strong>mendakan kuning</strong> (larut bila dipanaskan); Al³⁺{' '}
                    <strong>tiada mendakan</strong>.
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
