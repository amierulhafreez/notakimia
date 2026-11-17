import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  BatteryCharging,
  CheckCircle2,
  Eye,
  Flame,
  HelpCircle,
  Pause,
  Play,
  RotateCcw,
  Sliders,
  Sparkles,
  X,
  XCircle,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { analytics } from '../services/analytics';
import {
  CONCENTRATION_STEPS,
  ElectrodeType,
  ELECTROLYTE_SPECS,
  ElectrolyteId,
  formatConcentration,
  HALIDE_CONCENTRATION_THRESHOLD,
  resolveElectrolysisOutcome,
} from '../data/electrolysisData';
import { ElectrolysisMacroscopicSVG } from '../components/ElectrolysisMacroscopicSVG';
import { ElectrolysisMicroZoomCanvas } from '../components/ElectrolysisMicroZoomCanvas';

const SIM_ID = 'elektrolisis';

export const ElectrolysisLab: React.FC = () => {
  const [electrolyteId, setElectrolyteId] = useState<ElectrolyteId>('cuso4');
  const [concIndex, setConcIndex] = useState<number>(9); // 0.5 mol/dm3 initial for CuSO4
  const [electrodeType, setElectrodeType] = useState<ElectrodeType>('karbon');
  const [isMoltenHeated, setIsMoltenHeated] = useState<boolean>(true);
  const [showElectrons, setShowElectrons] = useState<boolean>(true);
  const [showIons, setShowIons] = useState<boolean>(true);
  const [quizMode, setQuizMode] = useState<boolean>(false);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0); // 0..1

  // POE Quiz modal state
  const [showQuizModal, setShowQuizModal] = useState<boolean>(false);
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizChecked, setQuizChecked] = useState<boolean>(false);
  const [quizPassedThisSetup, setQuizPassedThisSetup] = useState<boolean>(false);

  const hasLoggedRef = useRef(false);
  const completedRef = useRef(false);

  const concentration = CONCENTRATION_STEPS[concIndex] ?? 0.5;

  const outcome = useMemo(
    () => resolveElectrolysisOutcome(electrolyteId, concentration, electrodeType, isMoltenHeated),
    [electrolyteId, concentration, electrodeType, isMoltenHeated]
  );

  // Sync appropriate default concentration / electrode when picking an electrolyte
  const handleSelectElectrolyte = (nextId: ElectrolyteId) => {
    const spec = ELECTROLYTE_SPECS.find((e) => e.id === nextId);
    const defaultIdx = spec
      ? CONCENTRATION_STEPS.findIndex((c) => c === spec.defaultConcentration)
      : 7;
    setElectrolyteId(nextId);
    if (nextId === 'pbbr2') {
      setElectrodeType('karbon');
      setIsMoltenHeated(true);
    } else if (defaultIdx >= 0) {
      setConcIndex(defaultIdx);
    }
    setIsRunning(false);
    setIsPaused(false);
    setProgress(0);
    setQuizPassedThisSetup(false);
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  const handleConcentrationChange = (nextIdx: number) => {
    setConcIndex(nextIdx);
    setQuizPassedThisSetup(false);
    // Keep live state tidy; reset progress softly when regime shifts
    if (!isRunning) setProgress(0);
  };

  const handleElectrodeChange = (nextType: ElectrodeType) => {
    setElectrodeType(nextType);
    setIsRunning(false);
    setIsPaused(false);
    setProgress(0);
    setQuizPassedThisSetup(false);
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  const startExperimentNow = () => {
    setIsRunning(true);
    setIsPaused(false);
    if (!hasLoggedRef.current) {
      hasLoggedRef.current = true;
      analytics.recordSimulationClick(SIM_ID, 1);
    }
    if (!completedRef.current) {
      completedRef.current = true;
      analytics.recordSimulationCompleted(SIM_ID);
    }
  };

  const handleStartClick = () => {
    if (isRunning && isPaused) {
      setIsPaused(false);
      return;
    }
    if (quizMode && !isRunning && !quizPassedThisSetup) {
      setQuizIdx(0);
      setSelectedOption(null);
      setQuizChecked(false);
      setShowQuizModal(true);
      return;
    }
    startExperimentNow();
  };

  const handlePauseClick = () => {
    if (isRunning) {
      setIsPaused(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setProgress(0);
    setQuizPassedThisSetup(false);
    setShowQuizModal(false);
  };

  // Reaction progress ticker (~22 seconds for full 0 -> 100% macroscopic transformation)
  useEffect(() => {
    if (!isRunning || isPaused || !outcome.canConduct) return;
    const id = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) return 1;
        return Math.min(1, Number((prev + 0.012).toFixed(3)));
      });
    }, 250);
    return () => window.clearInterval(id);
  }, [isRunning, isPaused, outcome.canConduct]);

  const currentQuestion = outcome.quizQuestions[quizIdx] ?? outcome.quizQuestions[0];
  const isSelectedCorrect = selectedOption === currentQuestion?.correctOptionId;

  const handleCheckQuizAnswer = () => {
    if (!selectedOption) return;
    setQuizChecked(true);
    if (selectedOption === currentQuestion.correctOptionId) {
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.55 } });
    }
  };

  const handleAdvanceOrFinishQuiz = () => {
    if (quizIdx + 1 < outcome.quizQuestions.length) {
      setQuizIdx((i) => i + 1);
      setSelectedOption(null);
      setQuizChecked(false);
    } else {
      setQuizPassedThisSetup(true);
      setShowQuizModal(false);
      startExperimentNow();
    }
  };

  const isAboveHalideThreshold = concentration > HALIDE_CONCENTRATION_THRESHOLD;

  return (
    <div
      className="relative bg-[#060913] text-slate-100 rounded-2xl p-2.5 sm:p-3 border border-slate-800 shadow-2xl space-y-2"
      data-testid="electrolysis-lab"
    >
      {/* MAIN TOP SECTION: LEFT CONTROL PANEL + CENTER MULTI-LEVEL JOHNSTONE CANVAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 items-stretch">
        {/* 1. LEFT PANEL: KAWALAN EKSPERIMEN */}
        <div className="lg:col-span-4 bg-[#0b101e] border border-slate-800 rounded-xl p-2.5 flex flex-col justify-between space-y-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <div className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-yellow-400" />
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-white">
                  Panel Kawalan Eksperimen
                </h4>
              </div>
              <span
                className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border ${
                  isRunning && !isPaused
                    ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
                    : isPaused
                    ? 'bg-amber-950/70 text-amber-300 border-amber-500/40'
                    : 'bg-slate-900 text-slate-400 border-slate-700'
                }`}
              >
                {isRunning && !isPaused ? 'Litar Aktif' : isPaused ? 'Dijeda' : 'Sedia'}
              </span>
            </div>

            {/* Pilihan Elektrolit: Larutan Akueus + Sebatian Lebur */}
            <div className="space-y-1">
              <label className="block text-[9.5px] font-bold uppercase tracking-wider text-slate-400">
                1. Pilihan Elektrolit (Akueus &amp; Leburan)
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {ELECTROLYTE_SPECS.map((el) => {
                  const active = el.id === electrolyteId;
                  const isMoltenEl = el.stateKind === 'molten';
                  return (
                    <button
                      key={el.id}
                      type="button"
                      data-testid={`select-electrolyte-${el.id}`}
                      onClick={() => handleSelectElectrolyte(el.id)}
                      className={`px-2 py-1 rounded-lg border text-left transition-all cursor-pointer ${
                        active
                          ? isMoltenEl
                            ? 'bg-amber-950/75 border-amber-400 text-white shadow-sm shadow-amber-500/20'
                            : 'bg-sky-950/80 border-sky-400 text-white shadow-sm shadow-sky-500/20'
                          : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`text-[11px] font-extrabold font-mono ${
                            active
                              ? isMoltenEl
                                ? 'text-amber-300'
                                : 'text-sky-300'
                              : 'text-white'
                          }`}
                        >
                          {el.shortLabel}
                        </span>
                        <span
                          className={`text-[8px] font-bold px-1 py-0.2 rounded ${
                            isMoltenEl
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {isMoltenEl ? 'Lebur' : 'Akueus'}
                        </span>
                      </div>
                      <div className="text-[8.5px] text-slate-300 leading-tight truncate mt-0.5">
                        {el.id === 'cuso4'
                          ? 'Kuprum(II) sulfat'
                          : el.id === 'nacl'
                          ? 'Natrium klorida'
                          : el.id === 'h2so4'
                          ? 'Asid Sulfurik cair'
                          : 'Plumbum(II) bromida'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Kepekatan Larutan (Akueus) OR Pemanasan Sebatian Lebur */}
            {outcome.isMolten ? (
              <div className="bg-slate-900/75 border border-amber-500/30 rounded-lg p-2 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9.5px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-400" /> 2. Keadaan &amp; Pemanasan
                  </span>
                  <span
                    className={`text-[8.5px] font-bold px-1.5 py-0.5 rounded border ${
                      isMoltenHeated
                        ? 'bg-orange-950/80 text-orange-300 border-orange-500/40'
                        : 'bg-slate-800 text-slate-300 border-slate-600'
                    }`}
                  >
                    {isMoltenHeated ? 'Lebur (>373 °C)' : 'Pepejal'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    data-testid="molten-heated-btn"
                    onClick={() => {
                      setIsMoltenHeated(true);
                      setQuizPassedThisSetup(false);
                      setProgress(0);
                    }}
                    className={`px-2 py-1 rounded-md border text-[10px] font-bold transition cursor-pointer ${
                      isMoltenHeated
                        ? 'bg-orange-950/80 border-orange-400 text-orange-100'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    Panaskan (Lebur)
                  </button>
                  <button
                    type="button"
                    data-testid="molten-solid-btn"
                    onClick={() => {
                      setIsMoltenHeated(false);
                      setQuizPassedThisSetup(false);
                      setProgress(0);
                    }}
                    className={`px-2 py-1 rounded-md border text-[10px] font-bold transition cursor-pointer ${
                      !isMoltenHeated
                        ? 'bg-slate-800 border-slate-300 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    Tanpa Haba (Pepejal)
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/75 border border-slate-800 rounded-lg p-2 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400">
                    2. Kepekatan Larutan
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      data-testid="concentration-display"
                      className="text-[11px] font-extrabold text-yellow-300 font-mono"
                    >
                      {formatConcentration(concentration)} mol dm⁻³
                    </span>
                    <span
                      className={`text-[8.5px] font-bold px-1.5 py-0.5 rounded border ${
                        isAboveHalideThreshold
                          ? 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                          : 'bg-sky-950/80 text-sky-300 border-sky-500/40'
                      }`}
                    >
                      {concentration <= HALIDE_CONCENTRATION_THRESHOLD
                        ? 'Cair (≤0.001)'
                        : concentration < 0.25
                        ? 'Halida >0.001'
                        : 'Pekat'}
                    </span>
                  </div>
                </div>
                <div className="relative flex items-center">
                  <input
                    type="range"
                    data-testid="concentration-slider"
                    min={0}
                    max={CONCENTRATION_STEPS.length - 1}
                    step={1}
                    value={concIndex}
                    onChange={(e) => handleConcentrationChange(Number(e.target.value))}
                    aria-label="Peluncur kepekatan elektrolit"
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-sky-500 via-yellow-400 to-rose-500 accent-white"
                  />
                </div>
                <div className="flex items-center justify-between text-[8.5px] text-slate-400 font-mono">
                  <span>0.0001 (Sangat Cair)</span>
                  <span className="text-yellow-300/95 font-semibold">0.001 Batas Halida</span>
                  <span>2.0 (Pekat)</span>
                </div>
              </div>
            )}

            {/* Pilihan Jenis Elektrod */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-[9.5px] font-bold uppercase tracking-wider text-slate-400">
                  3. Jenis Elektrod
                </label>
                {outcome.isMolten && (
                  <span className="text-[8.5px] text-amber-300/90 font-semibold">
                    Leburan guna Karbon (Lengai)
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  data-testid="electrode-karbon"
                  onClick={() => handleElectrodeChange('karbon')}
                  className={`px-2 py-1 rounded-lg border text-center transition cursor-pointer ${
                    electrodeType === 'karbon'
                      ? 'bg-slate-800 border-white text-white shadow-xs'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[11px] font-bold">Karbon (C)</div>
                  <div className="text-[8.5px] text-slate-400">Elektrod Lengai</div>
                </button>
                <button
                  type="button"
                  data-testid="electrode-kuprum"
                  disabled={outcome.isMolten}
                  onClick={() => handleElectrodeChange('kuprum')}
                  className={`px-2 py-1 rounded-lg border text-center transition ${
                    outcome.isMolten
                      ? 'bg-slate-950/60 border-slate-800/60 text-slate-600 opacity-50 cursor-not-allowed'
                      : electrodeType === 'kuprum'
                      ? 'bg-orange-950/80 border-orange-400 text-orange-100 shadow-xs cursor-pointer'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 cursor-pointer'
                  }`}
                >
                  <div className="text-[11px] font-bold">Kuprum (Cu)</div>
                  <div className="text-[8.5px] text-orange-300/80">Elektrod Aktif</div>
                </button>
              </div>
            </div>

            {/* Togol Lapisan & Mod Ramalan POE */}
            <div className="bg-slate-900/75 border border-slate-800 rounded-lg p-2 space-y-1.5">
              <div className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400">
                4. Lapisan Visual & Kuiz POE
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  data-testid="toggle-electrons"
                  onClick={() => setShowElectrons((v) => !v)}
                  className={`px-2 py-1 rounded-md border text-[10.5px] font-bold flex items-center justify-center gap-1 transition cursor-pointer ${
                    showElectrons
                      ? 'bg-yellow-500/20 border-yellow-400 text-yellow-200'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                >
                  <Zap className="w-3 h-3" /> Aliran Elektron
                </button>
                <button
                  type="button"
                  data-testid="toggle-ions"
                  onClick={() => setShowIons((v) => !v)}
                  className={`px-2 py-1 rounded-md border text-[10.5px] font-bold flex items-center justify-center gap-1 transition cursor-pointer ${
                    showIons
                      ? 'bg-sky-500/20 border-sky-400 text-sky-200'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                >
                  <Eye className="w-3 h-3" /> Gerakan Ion
                </button>
              </div>
              <button
                type="button"
                data-testid="toggle-quiz-mode"
                onClick={() => setQuizMode((v) => !v)}
                className={`w-full px-2.5 py-1 rounded-md border text-[10.5px] font-bold flex items-center justify-between transition cursor-pointer ${
                  quizMode
                    ? 'bg-rose-950/70 border-rose-400 text-rose-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-yellow-300" /> Mod Kuiz Ramalan (POE)
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold ${
                    quizMode ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {quizMode ? 'AKTIF' : 'MATI'}
                </span>
              </button>
            </div>
          </div>

          {/* Butang Kawalan Utama: Mula / Jeda / Set Semula */}
          <div className="grid grid-cols-12 gap-1.5 pt-0.5">
            <button
              type="button"
              data-testid="start-btn"
              onClick={handleStartClick}
              disabled={isRunning && !isPaused}
              className={`col-span-6 py-2 px-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                isRunning && !isPaused
                  ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-700/50 cursor-default'
                  : 'bg-yellow-400 hover:bg-yellow-300 text-slate-950 shadow-md shadow-yellow-500/20'
              }`}
            >
              {isRunning && !isPaused ? (
                <>
                  <BatteryCharging className="w-4 h-4 animate-pulse" />
                  <span>Berjalan</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isPaused ? 'Sambung' : 'Hidupkan Suis'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              data-testid="pause-btn"
              onClick={handlePauseClick}
              disabled={!isRunning || isPaused}
              className="col-span-3 py-2 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white text-xs font-bold flex items-center justify-center gap-1 border border-slate-700 transition cursor-pointer"
            >
              <Pause className="w-3.5 h-3.5" /> Jeda
            </button>

            <button
              type="button"
              data-testid="reset-btn"
              onClick={handleReset}
              className="col-span-3 py-2 px-2 rounded-xl bg-rose-950/70 hover:bg-rose-900 text-rose-200 text-xs font-bold flex items-center justify-center gap-1 border border-rose-500/40 transition cursor-pointer"
              title="Set Semula"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* 2. CENTER/RIGHT: KANVAS MULTI-ARAS JOHNSTONE (Makroskopik + Submikroskopik) */}
        <div className="lg:col-span-8 space-y-2">
          {/* Zon Atas: Paparan Makroskopik */}
          <div className="bg-[#0b101e] border border-slate-800 rounded-xl p-1">
            <ElectrolysisMacroscopicSVG
              outcome={outcome}
              progress={progress}
              isRunning={isRunning}
              isPaused={isPaused}
              showElectrons={showElectrons}
              showIons={showIons}
            />
          </div>

          {/* Zon Bawah: Kanta Pembesar Submikroskopik */}
          <ElectrolysisMicroZoomCanvas
            outcome={outcome}
            progress={progress}
            isRunning={isRunning}
            isPaused={isPaused}
            showElectrons={showElectrons}
            showIons={showIons}
          />
        </div>
      </div>

      {/* 3. BOTTOM PANEL: PERSAMAAN SIMBOLIK & PEMERHATIAN MAKROSKOPIK MASA NYATA */}
      <div
        className="bg-[#0b101e] border border-slate-800 rounded-xl overflow-hidden"
        data-testid="equations-observations-panel"
      >
        <div className="px-3 py-1 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-white">
              Aras Simbolik & Jadual Pemerhatian Langsung
            </span>
          </div>
          <div className="text-[10.5px] text-sky-300 font-semibold">
            {outcome.isMolten ? 'Elektrolit:' : 'Larutan:'}{' '}
            <span className="text-white">{outcome.solutionBehaviorText}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950/70 text-[9.5px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <th className="py-1 px-2.5">Elektrod</th>
                <th className="py-1 px-2">Ion Hadir</th>
                <th className="py-1 px-2">Ion Dipilih & Faktor</th>
                <th className="py-1 px-2">Persamaan Setengah</th>
                <th className="py-1 px-2.5">Pemerhatian Makroskopik</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {/* Row 1: Anode (+) */}
              <tr className="bg-rose-950/15">
                <td className="py-1.5 px-2.5 whitespace-nowrap">
                  <span className="font-extrabold text-rose-400">Anod (+)</span>
                  <span className="block text-[9.5px] text-slate-400">Pengoksidaan</span>
                </td>
                <td className="py-1.5 px-2 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    {outcome.presentAnions.map((ion) => (
                      <span
                        key={ion}
                        className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] font-bold text-rose-200 whitespace-nowrap"
                      >
                        {ion}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-1.5 px-2 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white text-[11px]">{outcome.anode.selectedSpecies}</span>
                    <span className="px-1.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[9px] font-bold whitespace-nowrap">
                      {outcome.anode.factorTag}
                    </span>
                  </div>
                </td>
                <td className="py-1.5 px-2 whitespace-nowrap">
                  <code className="font-mono font-bold text-[11px] text-yellow-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {outcome.anode.halfEquation}
                  </code>
                </td>
                <td className="py-1.5 px-2.5 text-slate-200 text-[10.5px] leading-snug">
                  {isRunning ? outcome.anode.observationActive : outcome.anode.observationIdle}
                </td>
              </tr>

              {/* Row 2: Cathode (-) */}
              <tr className="bg-sky-950/15">
                <td className="py-1.5 px-2.5 whitespace-nowrap">
                  <span className="font-extrabold text-sky-400">Katod (−)</span>
                  <span className="block text-[9.5px] text-slate-400">Penurunan</span>
                </td>
                <td className="py-1.5 px-2 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    {outcome.presentCations.map((ion) => (
                      <span
                        key={ion}
                        className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] font-bold text-sky-200 whitespace-nowrap"
                      >
                        {ion}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-1.5 px-2 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white text-[11px]">{outcome.cathode.selectedSpecies}</span>
                    <span className="px-1.5 py-0.5 rounded bg-sky-500/20 border border-sky-500/40 text-sky-300 text-[9px] font-bold whitespace-nowrap">
                      {outcome.cathode.factorTag}
                    </span>
                  </div>
                </td>
                <td className="py-1.5 px-2 whitespace-nowrap">
                  <code className="font-mono font-bold text-[11px] text-yellow-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {outcome.cathode.halfEquation}
                  </code>
                </td>
                <td className="py-1.5 px-2.5 text-slate-200 text-[10.5px] leading-snug">
                  {isRunning ? outcome.cathode.observationActive : outcome.cathode.observationIdle}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Strip: Overall Equation */}
        <div className="px-3 py-1 bg-slate-950/80 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[10.5px]">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold uppercase text-[9.5px]">
              Persamaan Ion Keseluruhan:
            </span>
            <code className="font-mono font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {outcome.overallEquation}
            </code>
          </div>
          <span className="text-[10px] text-slate-400">
            *Kuning = Aliran e⁻ | Merah = Anod (+) | Biru = Katod (−)
          </span>
        </div>
      </div>

      {/* 4. POP-UP INTERAKTIF: MOD CABARAN RAMALAN / POE */}
      {showQuizModal && currentQuestion && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
          data-testid="poe-quiz-modal"
        >
          <div className="w-full max-w-lg bg-[#0b1120] border-2 border-yellow-400/60 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-yellow-400 text-slate-950 flex items-center justify-center font-extrabold">
                  POE
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">
                    Cabaran Ramalan Sebelum Eksperimen ({quizIdx + 1}/{outcome.quizQuestions.length})
                  </h4>
                  <p className="text-[11px] text-sky-300">
                    {outcome.electrolyte.name}{' '}
                    {outcome.isMolten
                      ? outcome.isMoltenHeated
                        ? '(Lebur >373 °C)'
                        : '(Pepejal — Tanpa Haba)'
                      : `(${formatConcentration(concentration)} mol dm⁻³)`}{' '}
                    • Elektrod {electrodeType === 'karbon' ? 'Karbon' : 'Kuprum'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowQuizModal(false)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-2.5">
              <div className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Fokus: {currentQuestion.target}
              </div>
              <p className="text-sm font-bold text-white leading-snug">{currentQuestion.prompt}</p>

              <div className="space-y-1.5">
                {currentQuestion.options.map((opt) => {
                  const isPicked = selectedOption === opt.id;
                  const isAnswer = opt.id === currentQuestion.correctOptionId;
                  let btnStyle =
                    'bg-slate-950 border-slate-700 text-slate-200 hover:border-sky-400';
                  if (quizChecked) {
                    if (isAnswer) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-100';
                    } else if (isPicked && !isAnswer) {
                      btnStyle = 'bg-rose-950/80 border-rose-400 text-rose-100';
                    } else {
                      btnStyle = 'bg-slate-950/50 border-slate-800 text-slate-500';
                    }
                  } else if (isPicked) {
                    btnStyle = 'bg-sky-950 border-yellow-400 text-white ring-1 ring-yellow-400';
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={quizChecked}
                      data-testid={`quiz-option-${opt.id}`}
                      onClick={() => setSelectedOption(opt.id)}
                      className={`w-full px-3 py-2 rounded-xl border text-left text-xs font-semibold transition flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt.label}</span>
                      {quizChecked && isAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      {quizChecked && isPicked && !isAnswer && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {quizChecked && (
              <div
                data-testid="quiz-feedback"
                className={`p-3 rounded-xl border text-xs leading-relaxed ${
                  isSelectedCorrect
                    ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-100'
                    : 'bg-rose-950/60 border-rose-500/50 text-rose-100'
                }`}
              >
                {isSelectedCorrect
                  ? currentQuestion.explanationOnRight
                  : currentQuestion.explanationOnWrong}
              </div>
            )}

            <div className="flex items-center justify-end gap-2">
              {!quizChecked ? (
                <button
                  type="button"
                  data-testid="quiz-submit-btn"
                  disabled={!selectedOption}
                  onClick={handleCheckQuizAnswer}
                  className="px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 disabled:opacity-40 text-slate-950 text-xs font-extrabold cursor-pointer"
                >
                  Semak Ramalan
                </button>
              ) : (
                <button
                  type="button"
                  data-testid="quiz-continue-btn"
                  onClick={handleAdvanceOrFinishQuiz}
                  className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-extrabold cursor-pointer"
                >
                  {quizIdx + 1 < outcome.quizQuestions.length
                    ? 'Soalan Seterusnya →'
                    : 'Jalankan Simulasi & Buktikan →'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
