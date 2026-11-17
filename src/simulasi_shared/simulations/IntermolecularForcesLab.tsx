import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Magnet,
  Swords,
  RotateCcw,
  Flame,
  Zap,
  Sparkles,
  AlertTriangle,
  Atom,
  BookOpen,
  Trophy,
  ArrowLeftRight,
} from 'lucide-react';
import {
  FORCE_CATEGORIES,
  ATTRACTION_EXAMPLES,
  DUEL_PRESETS,
  ForceCategoryId,
  getExamplesByCategory,
  getExampleById,
  evaluateDuel,
} from '../data/attractionForces';
import { SingleForceTugStage, DuelArenaSVG } from '../components/TugOfWarStageSVG';
import { AtomDiagramVariant, ElectronShellBreakdown } from '../components/TextbookAtomDiagram';
import { analytics } from '../services/analytics';

const SIM_ID = 'daya-tarikan-zarah';

type LabTab = 'explore' | 'duel';

export const IntermolecularForcesLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LabTab>('explore');
  const [categoryId, setCategoryId] = useState<ForceCategoryId>('zarah-vdw');
  const [selectedExampleId, setSelectedExampleId] = useState<string>('ch4');

  // Kawalan interaktif Tug of War tunggal
  const [controlValue, setControlValue] = useState<number>(-180);
  const [tugBoost, setTugBoost] = useState<number>(0);
  const [atomVariant, setAtomVariant] = useState<AtomDiagramVariant>('electron-arrangement');
  const [isCircuitActive, setIsCircuitActive] = useState<boolean>(false);
  const [showNoNofCompare, setShowNoNofCompare] = useState<boolean>(false);

  // Arena Pertarungan 1v1
  const [leftDuelId, setLeftDuelId] = useState<string>('nacl');
  const [rightDuelId, setRightDuelId] = useState<string>('h2o');
  const [hasDuelStarted, setHasDuelStarted] = useState<boolean>(false);
  const [manualOffset, setManualOffset] = useState<number>(0);

  const activeCategory = useMemo(
    () => FORCE_CATEGORIES.find((c) => c.id === categoryId) ?? FORCE_CATEGORIES[0],
    [categoryId]
  );

  const categoryExamples = useMemo(
    () => getExamplesByCategory(categoryId),
    [categoryId]
  );

  const activeExample = useMemo(() => {
    const found = categoryExamples.find((e) => e.id === selectedExampleId);
    return found ?? categoryExamples[0];
  }, [categoryExamples, selectedExampleId]);

  const leftFighter = useMemo(() => getExampleById(leftDuelId), [leftDuelId]);
  const rightFighter = useMemo(() => getExampleById(rightDuelId), [rightDuelId]);
  const duelEval = useMemo(
    () => evaluateDuel(leftFighter, rightFighter),
    [leftFighter, rightFighter]
  );

  // Kurangkan hentaman tugBoost secara automatik selepas klik supaya rasa seperti tarik tali elastik
  useEffect(() => {
    if (tugBoost <= 0) return;
    const timer = window.setInterval(() => {
      setTugBoost((prev) => Math.max(0, prev - 3));
    }, 180);
    return () => window.clearInterval(timer);
  }, [tugBoost]);

  const handleSelectCategory = (nextCatId: ForceCategoryId) => {
    const nextList = getExamplesByCategory(nextCatId);
    const first = nextList[0];
    setCategoryId(nextCatId);
    setSelectedExampleId(first.id);
    setControlValue(first.sliderDefault);
    setTugBoost(0);
    setIsCircuitActive(false);
    setShowNoNofCompare(false);
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  const handleSelectExample = (exId: string) => {
    const ex = getExampleById(exId);
    setSelectedExampleId(ex.id);
    setControlValue(ex.sliderDefault);
    setTugBoost(0);
    setIsCircuitActive(false);
    setShowNoNofCompare(false);
    analytics.recordSimulationClick(SIM_ID, 1);
    analytics.recordSimulationCompleted(SIM_ID);
  };

  const handleTugPulse = () => {
    const step = activeExample.categoryId === 'nukleus-elektron' ? 18 : 16;
    setTugBoost((prev) => Math.min(45, prev + step));
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  const handleResetExplore = () => {
    setControlValue(activeExample.sliderDefault);
    setTugBoost(0);
    setIsCircuitActive(false);
    setShowNoNofCompare(false);
  };

  const handleStartDuel = () => {
    setManualOffset(0);
    setHasDuelStarted(true);
    analytics.recordSimulationClick(SIM_ID, 1);
    analytics.recordSimulationCompleted(SIM_ID);
    if (duelEval.winnerSide !== 'tie') {
      confetti({ particleCount: 45, spread: 60, origin: { y: 0.65 } });
    }
  };

  const handlePresetDuel = (leftId: string, rightId: string) => {
    setLeftDuelId(leftId);
    setRightDuelId(rightId);
    setHasDuelStarted(false);
    setManualOffset(0);
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  const handleManualNudge = (direction: -1 | 1) => {
    setHasDuelStarted(true);
    setManualOffset((prev) => Math.max(-0.22, Math.min(0.22, prev + direction * 0.14)));
    window.setTimeout(() => {
      setManualOffset(0);
    }, 450);
  };

  const displayedFlagOffset = hasDuelStarted
    ? Math.max(-1, Math.min(1, duelEval.netRatio + manualOffset))
    : 0;

  return (
    <div className="space-y-3">
      {/* Bar Atas: Penukar Mod + Ringkasan Hierarki Daya KSSM */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-2xl">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'explore'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Magnet className="w-3.5 h-3.5" />
            Mekanik Tug of War (4 Daya KSSM)
          </button>
          <button
            onClick={() => setActiveTab('duel')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'duel'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            Arena Pertarungan 1v1
          </button>
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-[11px] font-bold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-xl">
          <span className="text-slate-400">Hierarki Daya:</span>
          <span className="text-sky-700">Van der Waals</span>
          <span>&lt;</span>
          <span className="text-rose-700">Ikatan Hidrogen</span>
          <span>&lt;</span>
          <span className="text-amber-700">Elektrostatik (Ion/Logam)</span>
        </div>
      </div>

      {/* ================= TAB 1: MEKANIK TUG OF WAR (4 DAYA TARIKAN) ================= */}
      {activeTab === 'explore' && (
        <div className="space-y-3">
          {/* 4 Pilihan Utama Daya Tarikan KSSM */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {FORCE_CATEGORIES.map((cat) => {
              const isSelected = cat.id === categoryId;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`text-left px-3 py-2 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? cat.activeTabClass
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-extrabold leading-tight">{cat.title}</div>
                  <div
                    className={`text-[10px] mt-0.5 font-medium truncate ${
                      isSelected ? 'text-white/90' : 'text-slate-500'
                    }`}
                  >
                    {cat.shortTitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Grid Utama: Pentas Tug of War (Kiri) + Penerangan & Data KSSM (Kanan) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
            {/* Kiri: Contoh Bahan + Pentas SVG + Kawalan Interaktif */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm space-y-2.5">
              {/* Pilihan Bahan Contoh Spesifik */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mr-1">
                    Contoh:
                  </span>
                  {categoryExamples.map((ex) => {
                    const active = ex.id === activeExample.id;
                    return (
                      <button
                        key={ex.id}
                        onClick={() => handleSelectExample(ex.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition cursor-pointer flex items-center gap-1 ${
                          active
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span>{ex.name}</span>
                        <span className="font-mono text-[10px] opacity-80">({ex.formula})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pentas Interaktif Tug of War */}
              <div className="bg-gradient-to-b from-slate-50 to-white border border-slate-200 rounded-2xl p-2">
                <SingleForceTugStage
                  category={activeCategory}
                  example={activeExample}
                  controlValue={controlValue}
                  tugBoost={tugBoost}
                  atomVariant={atomVariant}
                  isCircuitActive={isCircuitActive}
                  showNoNofCompare={showNoNofCompare}
                />
              </div>

              {/* Bar Kawalan Interaktif Bawah Pentas */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    {activeExample.categoryId === 'nukleus-elektron' ? (
                      <>
                        <Zap className="w-3.5 h-3.5 text-violet-600" />
                        <span>Laras Kekuatan Tarikan Lawan:</span>
                      </>
                    ) : (
                      <>
                        <Flame className="w-3.5 h-3.5 text-orange-600" />
                        <span>Laras Suhu / Tenaga Haba:</span>
                      </>
                    )}
                    <span className="font-mono font-extrabold text-slate-900 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                      {controlValue} {activeExample.thresholdUnit}
                    </span>
                  </label>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      onClick={handleTugPulse}
                      className="px-2.5 py-1 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-[11px] font-bold shadow-sm transition cursor-pointer flex items-center gap-1"
                    >
                      <ArrowLeftRight className="w-3 h-3" />
                      Tarik Tali! (+Hentaman)
                    </button>

                    {activeExample.categoryId === 'nukleus-elektron' && (
                      <button
                        onClick={() =>
                          setAtomVariant((v) =>
                            v === 'electron-arrangement' ? 'atomic-structure' : 'electron-arrangement'
                          )
                        }
                        className="px-2.5 py-1 rounded-lg bg-violet-100 hover:bg-violet-200 text-violet-900 border border-violet-300 text-[11px] font-bold transition cursor-pointer flex items-center gap-1"
                      >
                        <Atom className="w-3 h-3" />
                        {atomVariant === 'electron-arrangement' ? 'Tunjuk p & n' : 'Susunan e⁻'}
                      </button>
                    )}

                    {activeExample.categoryId === 'elektrostatik' && (
                      <button
                        onClick={() => setIsCircuitActive((prev) => !prev)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition cursor-pointer ${
                          isCircuitActive
                            ? 'bg-amber-500 text-white border-amber-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {activeExample.visualKind === 'metallic-sea'
                          ? isCircuitActive
                            ? 'Mentol: Hidup ✓'
                            : 'Uji Mentol (Pepejal)'
                          : isCircuitActive
                            ? 'Leburan / Akueus ✓'
                            : 'Leburkan / Larutkan'}
                      </button>
                    )}

                    {activeExample.categoryId === 'ikatan-hidrogen' && (
                      <button
                        onClick={() => setShowNoNofCompare((prev) => !prev)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition cursor-pointer ${
                          showNoNofCompare
                            ? 'bg-rose-600 text-white border-rose-600'
                            : 'bg-white text-rose-800 border-rose-200 hover:bg-rose-50'
                        }`}
                      >
                        {showNoNofCompare ? 'Kembali Ke Molekul' : 'Banding vs HCl (Tanpa NOF)'}
                      </button>
                    )}

                    {activeExample.categoryId === 'zarah-vdw' && (
                      <button
                        onClick={() => setControlValue(25)}
                        className="px-2 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-[11px] font-bold transition cursor-pointer"
                      >
                        Suhu Bilik (25 °C)
                      </button>
                    )}

                    <button
                      onClick={handleResetExplore}
                      className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 transition cursor-pointer"
                      title="Set semula"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <input
                  type="range"
                  min={activeExample.sliderMin}
                  max={activeExample.sliderMax}
                  value={controlValue}
                  onChange={(e) => setControlValue(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer h-2"
                />
                <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                  <span>
                    Min: {activeExample.sliderMin} {activeExample.thresholdUnit}
                  </span>
                  <span className="font-bold text-slate-700">
                    Ambang Atasi Daya: {activeExample.thresholdValue} {activeExample.thresholdUnit}
                  </span>
                  <span>
                    Maks: {activeExample.sliderMax} {activeExample.thresholdUnit}
                  </span>
                </div>
              </div>
            </div>

            {/* Kanan: Papan Skor Daya + Struktur Petala / Sifat Fizik + Penerangan KSSM */}
            <div className="lg:col-span-5 space-y-2.5">
              {/* Kad Kekuatan Daya & Sifat Bahan */}
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-slate-900">
                        {activeExample.name} ({activeExample.formula})
                      </h4>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${activeCategory.badgeClass}`}
                      >
                        {activeExample.strengthLabel} ({activeExample.tugScore}/100)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{activeExample.subtitle}</p>
                  </div>
                </div>

                {/* Pasukan Tarik Tali */}
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-2">
                    <span className="text-[9.5px] uppercase font-bold text-slate-400 block">
                      Pihak Menarik (Kiri)
                    </span>
                    <span className="font-bold text-slate-800">{activeExample.leftSideName}</span>
                  </div>
                  <div className="bg-orange-50/70 border border-orange-200 rounded-xl p-2">
                    <span className="text-[9.5px] uppercase font-bold text-orange-600 block">
                      Faktor Lawan (Kanan)
                    </span>
                    <span className="font-bold text-orange-950">{activeExample.rightSideName}</span>
                  </div>
                </div>

                {/* Paparan Petala & Susunan Elektron Piawai jika mod Nukleus ↔ Elektron */}
                {activeExample.atomSpec ? (
                  <div className="bg-violet-50/70 border border-violet-200 rounded-xl p-2.5 space-y-1.5">
                    <div className="flex items-center justify-between text-[10.5px] font-bold text-violet-900">
                      <span>{activeExample.atomSpec.groupLabel}</span>
                      <span>
                        {activeExample.atomSpec.radiusNm
                          ? `Jejari: ${activeExample.atomSpec.radiusNm}`
                          : ''}
                        {activeExample.atomSpec.electronegativity
                          ? ` • Keelektronegatifan: ${activeExample.atomSpec.electronegativity}`
                          : ''}
                      </span>
                    </div>
                    <ElectronShellBreakdown
                      shells={activeExample.atomSpec.shells}
                      protonNumber={activeExample.atomSpec.protonNumber}
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-1.5 text-center">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-1.5">
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">
                        Takat Lebur
                      </span>
                      <span className="font-mono text-xs font-extrabold text-slate-800">
                        {activeExample.meltingPoint ?? '—'}
                      </span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-1.5">
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">
                        Takat Didih
                      </span>
                      <span className="font-mono text-xs font-extrabold text-slate-900">
                        {activeExample.boilingPoint ?? '—'}
                      </span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-1.5">
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">
                        Suhu Bilik
                      </span>
                      <span className="text-[10.5px] font-bold text-slate-700 leading-tight block">
                        {activeExample.roomState}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Penerangan Konsep KSSM */}
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                    Penerangan Saintifik KSSM
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">{activeCategory.kssmRef}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{activeExample.explanation}</p>
                <div className="text-[11px] bg-sky-50 border border-sky-200 text-sky-900 px-2.5 py-1.5 rounded-xl flex items-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                  <span>{activeExample.dailyLifeOrKssmFact}</span>
                </div>
              </div>

              {/* Elak Salah Faham SPM */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl px-3 py-2.5 text-[11px] text-amber-950 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold">Elak Salah Faham SPM: </span>
                  <span>{activeCategory.spmMisconception}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: ARENA PERTARUNGAN 1v1 (HEAD-TO-HEAD TUG OF WAR) ================= */}
      {activeTab === 'duel' && (
        <div className="space-y-3">
          {/* Pertarungan Pilihan Pantas KSSM */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-extrabold text-slate-700">
                Pilihan Pertarungan Popular SPM KSSM:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {DUEL_PRESETS.map((preset) => {
                  const isCurrent =
                    leftDuelId === preset.leftId && rightDuelId === preset.rightId;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handlePresetDuel(preset.leftId, preset.rightId)}
                      title={preset.topicTag}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition cursor-pointer ${
                        isCurrent
                          ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pemilih Tersuai Pasukan Kiri vs Pasukan Kanan */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center pt-1">
              <div className="md:col-span-5 flex items-center gap-2 bg-blue-50/70 border border-blue-200 rounded-xl px-2.5 py-1.5">
                <span className="text-[10px] font-extrabold text-blue-800 uppercase shrink-0">
                  Kiri:
                </span>
                <select
                  value={leftDuelId}
                  onChange={(e) => {
                    setLeftDuelId(e.target.value);
                    setHasDuelStarted(false);
                  }}
                  className="w-full bg-white border border-blue-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-800"
                >
                  {ATTRACTION_EXAMPLES.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {ex.name} ({ex.formula}) — Skor {ex.tugScore}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2 flex justify-center">
                <button
                  onClick={handleStartDuel}
                  className="w-full md:w-auto px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Swords className="w-3.5 h-3.5" />
                  Lawan!
                </button>
              </div>

              <div className="md:col-span-5 flex items-center gap-2 bg-rose-50/70 border border-rose-200 rounded-xl px-2.5 py-1.5">
                <span className="text-[10px] font-extrabold text-rose-800 uppercase shrink-0">
                  Kanan:
                </span>
                <select
                  value={rightDuelId}
                  onChange={(e) => {
                    setRightDuelId(e.target.value);
                    setHasDuelStarted(false);
                  }}
                  className="w-full bg-white border border-rose-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-800"
                >
                  {ATTRACTION_EXAMPLES.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {ex.name} ({ex.formula}) — Skor {ex.tugScore}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Pentas Arena 1v1 & Analisis Pemenang */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-3 shadow-sm space-y-2">
              <DuelArenaSVG
                left={leftFighter}
                right={rightFighter}
                flagOffset={displayedFlagOffset}
                hasStarted={hasDuelStarted}
                winnerSide={hasDuelStarted ? duelEval.winnerSide : null}
              />

              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => handleManualNudge(-1)}
                  className="px-3 py-1.5 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-900 border border-blue-300 text-xs font-bold transition cursor-pointer"
                >
                  ⬅ Tarik Untuk Kiri ({leftFighter.formula})
                </button>
                <button
                  onClick={() => {
                    setHasDuelStarted(false);
                    setManualOffset(0);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold transition cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Tali
                </button>
                <button
                  onClick={() => handleManualNudge(1)}
                  className="px-3 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-900 border border-rose-300 text-xs font-bold transition cursor-pointer"
                >
                  Tarik Untuk Kanan ({rightFighter.formula}) ➡
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm flex flex-col justify-between space-y-2.5">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Analisis Pemenang KSSM</span>
                </div>

                {hasDuelStarted ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                    <div className="text-xs font-extrabold text-emerald-900">
                      {duelEval.winnerSide === 'tie'
                        ? 'Keputusan: Seri (Kekuatan Sama)'
                        : `Pemenang: ${duelEval.winner.name} (${duelEval.winner.formula})`}
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {duelEval.summaryReason}
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                    Pilih dua bahan kimia atau atom dari senarai di atas, kemudian klik{' '}
                    <strong>Lawan!</strong> untuk menyaksikan daya manakah yang mendominasi Tug of
                    War mengikut prinsip Kimia KSSM.
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-2">
                    <div className="font-extrabold text-blue-900">{leftFighter.formula}</div>
                    <div className="text-slate-600 text-[10px]">{leftFighter.leftSideName}</div>
                    <div className="font-mono font-bold text-blue-800 mt-1">
                      {leftFighter.boilingPoint ?? leftFighter.meltingPoint ?? `${leftFighter.atomSpec?.shells.length} petala`}
                    </div>
                  </div>
                  <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-2">
                    <div className="font-extrabold text-rose-900">{rightFighter.formula}</div>
                    <div className="text-slate-600 text-[10px]">{rightFighter.leftSideName}</div>
                    <div className="font-mono font-bold text-rose-800 mt-1">
                      {rightFighter.boilingPoint ?? rightFighter.meltingPoint ?? `${rightFighter.atomSpec?.shells.length} petala`}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-sky-50 border border-sky-200 rounded-xl text-[10.5px] text-sky-900 leading-snug">
                <strong>Formula Ingat SPM:</strong> Van der Waals &lt; Ikatan Hidrogen &lt; Daya
                Tarikan Elektrostatik (Ion/Logam). Bagi atom pula, lebih banyak petala = tarikan
                nukleus pada e⁻ valens makin lemah!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
