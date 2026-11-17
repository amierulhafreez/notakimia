import React, { useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Eye,
  FlaskConical,
  HelpCircle,
  Layers,
  Lock,
  MousePointerClick,
  RotateCcw,
  Sliders,
  Sparkles,
  Trophy,
  AlertTriangle,
} from 'lucide-react';
import { analytics } from '../services/analytics';
import {
  BranchSize,
  BuilderState,
  CARBON_COUNTS,
  CarbonCount,
  CatalogIsomer,
  createInitialBuilderState,
  evaluateBuilderState,
  getCatalogFor,
  getMolecularFormula,
  getMolecularFormulaParts,
  getValidChainLengths,
  HomologousSeries,
  SERIES_META,
} from '../data/isomerEngine';
import {
  ActivePlacementTool,
  DraggingItem,
  IsomerStructureSVG,
  StructureDisplayMode,
} from '../components/IsomerStructureSVG';

const SIM_ID = 'penentuan-isomer';
type LabTab = 'pembina' | 'panduan';

export const CarbonIsomersLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LabTab>('pembina');
  const [series, setSeries] = useState<HomologousSeries>('alkana');
  const [totalCarbons, setTotalCarbons] = useState<CarbonCount>(4);
  const [mainChainLen, setMainChainLen] = useState<number>(4);

  const [builderState, setBuilderState] = useState<BuilderState>(() =>
    createInitialBuilderState('alkana', 4, 4)
  );
  const [displayMode, setDisplayMode] = useState<StructureDisplayMode>('ringkas');
  const [activeTool, setActiveTool] = useState<ActivePlacementTool>('move');
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
  const [draggingItem, setDraggingItem] = useState<DraggingItem>(null);
  const [hintText, setHintText] = useState<string | null>(null);
  const [justDiscoveredHash, setJustDiscoveredHash] = useState<string | null>(null);

  // Gamification store: keyed by `${series}:${totalCarbons}` -> array of discovered CatalogIsomer hashes
  const [discoveredByGroup, setDiscoveredByGroup] = useState<Record<string, CatalogIsomer[]>>({});
  const celebratedGroupRef = useRef<Set<string>>(new Set());

  const validChainLengths = useMemo(
    () => getValidChainLengths(series, totalCarbons),
    [series, totalCarbons]
  );

  const catalog = useMemo(
    () => getCatalogFor(series, totalCarbons),
    [series, totalCarbons]
  );

  const evaluated = useMemo(
    () => evaluateBuilderState(builderState),
    [builderState]
  );

  const groupKey = `${series}:${totalCarbons}`;
  const discoveredList = discoveredByGroup[groupKey] ?? [];

  const totalPossibleOverall = useMemo(() => {
    let sum = 0;
    for (const s of ['alkana', 'alkena', 'alkohol'] as HomologousSeries[]) {
      for (const n of CARBON_COUNTS) {
        sum += getCatalogFor(s, n).length;
      }
    }
    return sum;
  }, []);

  const totalDiscoveredOverall = useMemo(
    () => Object.values(discoveredByGroup).reduce((acc, arr) => acc + arr.length, 0),
    [discoveredByGroup]
  );

  // Auto-record valid unique isomers into gamified collection whenever structure changes
  useEffect(() => {
    if (
      evaluated.status !== 'valid' ||
      !evaluated.canonicalHash ||
      !evaluated.iupacName ||
      !evaluated.isomerType
    ) {
      return;
    }

    const hash = evaluated.canonicalHash;
    if (discoveredList.some((item) => item.canonicalHash === hash)) {
      return;
    }

    const matchedCatalog = catalog.find((c) => c.canonicalHash === hash);
    const entry: CatalogIsomer = matchedCatalog ?? {
      canonicalHash: hash,
      iupacName: evaluated.iupacName,
      series,
      totalCarbons,
      mainChainLen: evaluated.actualMainChainLen,
      isomerType: evaluated.isomerType,
      explanation: evaluated.explanation,
      sampleState: {
        ...builderState,
        branches: builderState.branches.map((b) => ({ ...b })),
      },
    };

    const nextCount = discoveredList.length + 1;
    setDiscoveredByGroup((prev) => {
      const existing = prev[groupKey] ?? [];
      if (existing.some((item) => item.canonicalHash === hash)) {
        return prev;
      }
      return { ...prev, [groupKey]: [...existing, entry] };
    });

    setJustDiscoveredHash(hash);
    analytics.recordSimulationCompleted(SIM_ID);

    if (nextCount === catalog.length && !celebratedGroupRef.current.has(groupKey)) {
      celebratedGroupRef.current.add(groupKey);
      confetti({ particleCount: 70, spread: 60 });
    }
  }, [evaluated, catalog, discoveredList, groupKey, series, totalCarbons, builderState]);

  const applyMolecularSettings = (
    nextSeries: HomologousSeries,
    nextC: CarbonCount,
    preferredChainLen?: number
  ) => {
    const validLengths = getValidChainLengths(nextSeries, nextC);
    const chosenLen =
      preferredChainLen && validLengths.includes(preferredChainLen)
        ? preferredChainLen
        : validLengths[0];

    setSeries(nextSeries);
    setTotalCarbons(nextC);
    setMainChainLen(chosenLen);
    setBuilderState(createInitialBuilderState(nextSeries, nextC, chosenLen));
    setSelectedBranchId(null);
    setDraggingItem(null);
    setActiveTool('move');
    setHintText(null);
    setJustDiscoveredHash(null);
    analytics.recordSimulationClick(SIM_ID);
  };

  const handleClearBranches = () => {
    setBuilderState((prev) => ({
      ...prev,
      branches: [],
    }));
    setSelectedBranchId(null);
    setActiveTool(totalCarbons - mainChainLen >= 1 ? 'ch3' : 'move');
    setHintText(null);
    analytics.recordSimulationClick(SIM_ID);
  };

  const handleResetToInitial = () => {
    setBuilderState(createInitialBuilderState(series, totalCarbons, mainChainLen));
    setSelectedBranchId(null);
    setActiveTool('move');
    setHintText(null);
    analytics.recordSimulationClick(SIM_ID);
  };

  const handleAddOrMoveBranchToSlot = (slotIndex: number, explicitSize?: BranchSize) => {
    setHintText(null);

    // Case 1: Moving a currently selected branch
    if (selectedBranchId) {
      setBuilderState((prev) => ({
        ...prev,
        branches: prev.branches.map((b) =>
          b.id === selectedBranchId ? { ...b, slotIndex } : b
        ),
      }));
      setSelectedBranchId(null);
      analytics.recordSimulationClick(SIM_ID);
      return;
    }

    // Case 2: Attaching new branch from active tool
    const size: BranchSize = explicitSize ?? (activeTool === 'c2h5' ? 2 : 1);
    if (evaluated.remainingBranchCarbons < size) return;

    const newBranch = {
      id: `br-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      slotIndex,
      size,
    };

    setBuilderState((prev) => {
      const nextRemaining = evaluated.remainingBranchCarbons - size;
      if (nextRemaining <= 0) {
        setActiveTool('move');
      } else if (nextRemaining < 2 && activeTool === 'c2h5') {
        setActiveTool('ch3');
      }
      return {
        ...prev,
        branches: [...prev.branches, newBranch],
      };
    });
    analytics.recordSimulationClick(SIM_ID);
  };

  const handleRemoveBranch = (branchId: string) => {
    setBuilderState((prev) => ({
      ...prev,
      branches: prev.branches.filter((b) => b.id !== branchId),
    }));
    if (selectedBranchId === branchId) setSelectedBranchId(null);
    setActiveTool('ch3');
    setHintText(null);
    analytics.recordSimulationClick(SIM_ID);
  };

  const handleMoveDoubleBond = (bondIdx: number) => {
    setBuilderState((prev) => ({
      ...prev,
      doubleBondIdx: bondIdx,
    }));
    setHintText(null);
    analytics.recordSimulationClick(SIM_ID);
  };

  const handleMoveOh = (slotIndex: number) => {
    setBuilderState((prev) => ({
      ...prev,
      ohSlotIdx: slotIndex,
    }));
    setActiveTool('move');
    setHintText(null);
    analytics.recordSimulationClick(SIM_ID);
  };

  const handleDropPayloadOnCarbon = (slotIndex: number, payload: string) => {
    if (payload === 'ch3') {
      handleAddOrMoveBranchToSlot(slotIndex, 1);
    } else if (payload === 'c2h5') {
      handleAddOrMoveBranchToSlot(slotIndex, 2);
    } else if (payload === 'oh' && series === 'alkohol') {
      handleMoveOh(slotIndex);
    } else if (payload.startsWith('move-branch:')) {
      const branchId = payload.slice('move-branch:'.length);
      setBuilderState((prev) => ({
        ...prev,
        branches: prev.branches.map((b) => (b.id === branchId ? { ...b, slotIndex } : b)),
      }));
      setSelectedBranchId(null);
      analytics.recordSimulationClick(SIM_ID);
    }
  };

  const handleDropPayloadOnBond = (bondIdx: number, payload: string) => {
    if (payload === 'cc' && series === 'alkena') {
      handleMoveDoubleBond(bondIdx);
    }
  };

  const handleLoadDiscoveredIsomer = (item: CatalogIsomer) => {
    setSeries(item.series);
    setTotalCarbons(item.totalCarbons);
    setMainChainLen(item.mainChainLen);
    setBuilderState({
      ...item.sampleState,
      branches: item.sampleState.branches.map((b, idx) => ({
        ...b,
        id: `loaded-${Date.now()}-${idx}`,
      })),
    });
    setSelectedBranchId(null);
    setActiveTool('move');
    setJustDiscoveredHash(null);
    analytics.recordSimulationClick(SIM_ID);
  };

  const handleShowHint = () => {
    const foundHashes = new Set(discoveredList.map((d) => d.canonicalHash));
    const missing = catalog.filter((c) => !foundHashes.has(c.canonicalHash));
    if (missing.length === 0) {
      setHintText('Semua isomer bagi molekul ini telah ditemui! Cuba siri homolog atau bilangan karbon lain.');
      return;
    }
    const target = missing[0];
    if (target.mainChainLen !== mainChainLen) {
      setHintText(
        `Petunjuk: Terdapat isomer tersembunyi pada Panjang Rantaian Utama "${target.mainChainLen} Karbon". Cuba tukar pilihan Panjang Rantaian Utama!`
      );
    } else if (series === 'alkena') {
      setHintText(
        `Petunjuk: Pada rantai ${mainChainLen} karbon, cuba alihkan kedudukan ikatan ganda dua (C═C) atau pindah cabang metil/etil.`
      );
    } else if (series === 'alkohol') {
      setHintText(
        `Petunjuk: Pada rantai ${mainChainLen} karbon, cuba klik karbon lain untuk alihkan kumpulan —OH atau susun semula cabang.`
      );
    } else {
      setHintText(
        `Petunjuk: Pada rantai ${mainChainLen} karbon, cuba ubah kedudukan cabang -CH₃/-C₂H₅ pada karbon dalaman yang berbeza.`
      );
    }
  };

  const seriesMeta = SERIES_META[series];
  const formulaParts = getMolecularFormulaParts(series, totalCarbons);
  const formulaStr = getMolecularFormula(series, totalCarbons);
  const remBranchC = evaluated.remainingBranchCarbons;
  const maxBranchBudget = totalCarbons - mainChainLen;
  const completedAllInGroup = discoveredList.length === catalog.length && catalog.length > 0;
  const missingCount = Math.max(0, catalog.length - discoveredList.length);

  return (
    <div className="space-y-2.5">
      {/* Compact Header Strip + Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'pembina' as LabTab, label: '1. Pembina & Pengumpul Isomer (Interaktif)', icon: Layers },
            { id: 'panduan' as LabTab, label: '2. Panduan Penamaan IUPAC (Buku Teks)', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  analytics.recordSimulationClick(SIM_ID);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Gamification Global Progress Counter */}
        <div className="flex items-center gap-2 text-xs">
          <span
            data-testid="overall-discovery-counter"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-bold text-[11px]"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            Koleksi Keseluruhan: {totalDiscoveredOverall} / {totalPossibleOverall}
          </span>
        </div>
      </div>

      {/* ================= TAB 1: CONSTRAINT-BASED BUILDER + GAMIFIED COLLECTION ================= */}
      {activeTab === 'pembina' && (
        <div className="space-y-2.5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-start">
            {/* LEFT 4 COLS: Tetapan Molekul & Formula Kimia */}
            <div className="md:col-span-4 bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800 border-b border-slate-100 pb-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                Tetapan Molekul
              </div>

              {/* Step 1A: Siri Homolog */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 block">Siri Homolog</label>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg">
                  {(['alkana', 'alkena', 'alkohol'] as HomologousSeries[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      data-testid={`series-btn-${s}`}
                      onClick={() => applyMolecularSettings(s, totalCarbons)}
                      className={`py-1.5 px-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
                        series === s
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'text-slate-700 hover:bg-white/80'
                      }`}
                    >
                      {SERIES_META[s].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 1B: Jumlah Karbon (4 hingga 7) */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 block">
                  Jumlah Karbon (C)
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {CARBON_COUNTS.map((n) => (
                    <button
                      key={n}
                      type="button"
                      data-testid={`carbon-count-${n}`}
                      onClick={() => applyMolecularSettings(series, n)}
                      className={`py-1.5 rounded-lg text-xs font-extrabold border transition cursor-pointer ${
                        totalCarbons === n
                          ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-indigo-50'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 1C: Panjang Rantaian Utama */}
              <div className="space-y-1">
                <label
                  htmlFor="main-chain-select"
                  className="text-[11px] font-bold text-slate-600 block"
                >
                  Panjang Rantaian Utama
                </label>
                <select
                  id="main-chain-select"
                  data-testid="main-chain-select"
                  value={mainChainLen}
                  onChange={(e) =>
                    applyMolecularSettings(series, totalCarbons, Number(e.target.value))
                  }
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  {validChainLengths.map((len) => (
                    <option key={len} value={len}>
                      {len} Karbon {len === totalCarbons ? '(Rantai Lurus)' : `(Baki ${totalCarbons - len}C Cabang)`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 2: Formula Kimia Box */}
              <div
                data-testid="formula-kimia-card"
                className="rounded-xl bg-indigo-50/90 border border-indigo-200 p-2.5 space-y-1"
              >
                <div className="text-[9.5px] font-extrabold uppercase tracking-wider text-indigo-700">
                  FORMULA KIMIA
                </div>
                <div className="text-2xl font-extrabold text-indigo-950 font-mono tracking-tight">
                  {formulaParts.map((part, idx) => (
                    <React.Fragment key={idx}>
                      {part.text}
                      {part.sub && <sub className="text-base font-bold">{part.sub}</sub>}
                    </React.Fragment>
                  ))}
                </div>
                <div className="text-[10px] text-indigo-800 font-medium leading-snug">
                  Formula am: <span className="font-mono font-bold">{seriesMeta.generalFormula}</span> •{' '}
                  {seriesMeta.functionalGroupLabel}
                </div>
              </div>

              {/* Mini Gamification Mission Card */}
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-2 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-extrabold text-slate-700 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Misi {formulaStr}
                  </span>
                  <span className="font-extrabold text-indigo-700">
                    {discoveredList.length} / {catalog.length} Isomer
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      completedAllInGroup ? 'bg-emerald-500' : 'bg-indigo-600'
                    }`}
                    style={{
                      width: `${catalog.length > 0 ? Math.round((discoveredList.length / catalog.length) * 100) : 0}%`,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <span className="text-[10px] text-slate-500">
                    {completedAllInGroup
                      ? 'Semua isomer berjaya ditemui!'
                      : `Cari lagi ${missingCount} isomer berbeza.`}
                  </span>
                  <button
                    type="button"
                    data-testid="hint-btn"
                    onClick={handleShowHint}
                    className="px-2 py-0.5 rounded-md bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-[10px] font-bold text-slate-700 flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <HelpCircle className="w-3 h-3 text-amber-600" />
                    Petunjuk
                  </button>
                </div>
                {hintText && (
                  <div className="text-[10px] text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1 leading-snug">
                    {hintText}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT 8 COLS: Kotak Alat + Interactive Sandbox + Auto-Verification Banner */}
            <div className="md:col-span-8 flex flex-col space-y-2.5">
              {/* KOTAK ALAT (SERET / KLIK) */}
              <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                      KOTAK ALAT (SERET / KLIK):
                    </span>

                    {/* -CH3 Branch Tool */}
                    <button
                      type="button"
                      draggable={remBranchC >= 1}
                      data-testid="tool-ch3"
                      onDragStart={(e) => e.dataTransfer.setData('text/isomer-item', 'ch3')}
                      onClick={() => {
                        if (remBranchC >= 1) {
                          setSelectedBranchId(null);
                          setActiveTool((prev) => (prev === 'ch3' ? 'move' : 'ch3'));
                        }
                      }}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition ${
                        remBranchC === 0
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-default'
                          : activeTool === 'ch3'
                            ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs cursor-pointer'
                            : 'bg-indigo-50 text-indigo-900 border-indigo-200 hover:bg-indigo-100 cursor-grab active:cursor-grabbing'
                      }`}
                    >
                      <span className="font-mono font-extrabold">CH₃</span>
                      <span
                        className={`text-[10px] font-semibold ${
                          remBranchC === 0
                            ? 'text-slate-400'
                            : activeTool === 'ch3'
                              ? 'text-indigo-100'
                              : 'text-indigo-700'
                        }`}
                      >
                        Baki: {remBranchC}
                      </span>
                    </button>

                    {/* -C2H5 Ethyl Branch Tool when branch budget >= 2 */}
                    {maxBranchBudget >= 2 && (
                      <button
                        type="button"
                        draggable={remBranchC >= 2}
                        data-testid="tool-c2h5"
                        onDragStart={(e) => e.dataTransfer.setData('text/isomer-item', 'c2h5')}
                        onClick={() => {
                          if (remBranchC >= 2) {
                            setSelectedBranchId(null);
                            setActiveTool((prev) => (prev === 'c2h5' ? 'move' : 'c2h5'));
                          }
                        }}
                        className={`px-2.5 py-1 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition ${
                          remBranchC < 2
                            ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-default'
                            : activeTool === 'c2h5'
                              ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs cursor-pointer'
                              : 'bg-indigo-50 text-indigo-900 border-indigo-200 hover:bg-indigo-100 cursor-grab active:cursor-grabbing'
                        }`}
                      >
                        <span className="font-mono font-extrabold">C₂H₅</span>
                        <span className="text-[10px] opacity-80">Etil (2C)</span>
                      </button>
                    )}

                    {/* Movable C=C indicator for Alkena */}
                    {series === 'alkena' && (
                      <div
                        draggable
                        data-testid="tool-cc"
                        onDragStart={(e) => e.dataTransfer.setData('text/isomer-item', 'cc')}
                        className="px-2.5 py-1 rounded-lg border border-sky-200 bg-sky-50 text-sky-900 text-[11px] font-bold flex items-center gap-1.5 cursor-grab active:cursor-grabbing"
                        title="Klik ikatan C—C di dalam sandbox atau seret untuk alih kedudukan ikatan ganda dua"
                      >
                        <span className="font-mono font-extrabold text-sky-700">C═C</span>
                        <span className="text-[10px] font-medium text-sky-700">Klik ikatan untuk alih</span>
                      </div>
                    )}

                    {/* Movable -OH chip for Alkohol */}
                    {series === 'alkohol' && (
                      <button
                        type="button"
                        draggable
                        data-testid="tool-oh"
                        onDragStart={(e) => e.dataTransfer.setData('text/isomer-item', 'oh')}
                        onClick={() => {
                          setSelectedBranchId(null);
                          setActiveTool((prev) => (prev === 'oh' ? 'move' : 'oh'));
                        }}
                        className={`px-2.5 py-1 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                          activeTool === 'oh'
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                            : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                        }`}
                        title="Klik atau seret ke mana-mana atom karbon untuk ubah lokasi kumpulan —OH"
                      >
                        <span className="font-mono font-extrabold">—OH</span>
                        <span className="text-[10px] opacity-85">Pindah lokasi</span>
                      </button>
                    )}
                  </div>

                  {/* Display Mode Switch: Ringkas vs Buku Teks */}
                  <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
                    <button
                      type="button"
                      data-testid="display-mode-ringkas"
                      onClick={() => setDisplayMode('ringkas')}
                      className={`px-2 py-0.5 rounded-md text-[10.5px] font-bold flex items-center gap-1 cursor-pointer transition ${
                        displayMode === 'ringkas'
                          ? 'bg-white text-indigo-700 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Eye className="w-3 h-3" />
                      Ringkas (CHₙ)
                    </button>
                    <button
                      type="button"
                      data-testid="display-mode-teks"
                      onClick={() => setDisplayMode('teks')}
                      className={`px-2 py-0.5 rounded-md text-[10.5px] font-bold flex items-center gap-1 cursor-pointer transition ${
                        displayMode === 'teks'
                          ? 'bg-white text-indigo-700 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <FlaskConical className="w-3 h-3" />
                      Buku Teks (Penuh H)
                    </button>
                  </div>
                </div>
              </div>

              {/* Interactive Sandbox SVG Area */}
              <div
                data-testid="isomer-sandbox"
                className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-xs space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                  <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
                    <MousePointerClick className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    {selectedBranchId
                      ? 'Cabang dipilih — klik karbon (atau tanda +) untuk pindah kedudukan cabang.'
                      : activeTool === 'ch3' || activeTool === 'c2h5'
                        ? `Klik mana-mana karbon (atau tanda +) untuk pasang cabang ${activeTool === 'c2h5' ? '-C₂H₅' : '-CH₃'}.`
                        : activeTool === 'oh'
                          ? 'Klik karbon sasaran untuk memindahkan kumpulan —OH.'
                          : series === 'alkena'
                            ? 'Klik ikatan C—C untuk ubah kedudukan C═C, atau seret/klik cabang untuk ubahsuai isomer.'
                            : series === 'alkohol'
                              ? 'Klik karbon untuk ubah lokasi —OH, atau seret/klik cabang untuk ubahsuai isomer.'
                              : maxBranchBudget > 0
                                ? 'Seret atau klik cabang (-CH₃/-C₂H₅) untuk ubahsuai lokasi pada rantai karbon.'
                                : 'Rantai lurus terbentuk. Tukar Panjang Rantaian Utama di kiri untuk terokai isomer bercabang!'}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {builderState.branches.length > 0 && (
                      <button
                        type="button"
                        data-testid="clear-branches-btn"
                        onClick={handleClearBranches}
                        className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[11px] font-bold text-slate-700 transition cursor-pointer"
                      >
                        Tanggal Cabang
                      </button>
                    )}
                    <button
                      type="button"
                      data-testid="reset-sandbox-btn"
                      onClick={handleResetToInitial}
                      className="px-2.5 py-0.5 rounded-md bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700 flex items-center gap-1 transition cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Set Semula
                    </button>
                  </div>
                </div>

                <IsomerStructureSVG
                  state={builderState}
                  evaluated={evaluated}
                  displayMode={displayMode}
                  activeTool={activeTool}
                  selectedBranchId={selectedBranchId}
                  draggingItem={draggingItem}
                  onSelectBranch={setSelectedBranchId}
                  onSetDraggingItem={setDraggingItem}
                  onAddOrMoveBranchToSlot={handleAddOrMoveBranchToSlot}
                  onRemoveBranch={handleRemoveBranch}
                  onMoveDoubleBond={handleMoveDoubleBond}
                  onMoveOh={handleMoveOh}
                  onDropPayloadOnCarbon={handleDropPayloadOnCarbon}
                  onDropPayloadOnBond={handleDropPayloadOnBond}
                />
              </div>

              {/* Method 4: Auto IUPAC Result Banner */}
              <div
                data-testid="isomer-status-banner"
                className={`rounded-xl border px-3.5 py-2.5 shadow-xs transition-all ${
                  evaluated.status === 'valid'
                    ? 'bg-emerald-50/80 border-emerald-300'
                    : evaluated.status === 'incomplete'
                      ? 'bg-amber-50/80 border-amber-300'
                      : 'bg-rose-50/80 border-rose-300'
                }`}
              >
                {evaluated.status === 'valid' ? (
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          ISOMER DISAHKAN
                        </span>
                        {evaluated.isomerType && (
                          <span className="px-2 py-0.5 rounded-full bg-white border border-emerald-200 text-[10px] font-bold text-emerald-800">
                            {evaluated.isomerType}
                          </span>
                        )}
                        {justDiscoveredHash === evaluated.canonicalHash && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-[10px] font-extrabold text-amber-900 animate-pulse">
                            Baharu Ditemui! ✨
                          </span>
                        )}
                      </div>
                      <div
                        data-testid="verified-iupac-name"
                        className="text-xl font-extrabold text-emerald-950 tracking-tight mt-0.5"
                      >
                        {evaluated.iupacName}
                      </div>
                    </div>
                    <div className="text-[11px] font-medium text-emerald-900 bg-white/80 border border-emerald-200 rounded-lg px-2.5 py-1.5 max-w-sm">
                      {evaluated.explanation}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <AlertTriangle
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        evaluated.status === 'incomplete' ? 'text-amber-600' : 'text-rose-600'
                      }`}
                    />
                    <div className="space-y-0.5">
                      <div
                        className={`text-xs font-extrabold uppercase tracking-wider ${
                          evaluated.status === 'incomplete' ? 'text-amber-800' : 'text-rose-800'
                        }`}
                      >
                        {evaluated.status === 'incomplete'
                          ? 'Cabang Karbon Belum Lengkap'
                          : evaluated.status === 'chain_violation'
                            ? 'Kekangan Rantai Terpanjang Dilanggar'
                            : 'Ralat Valensi Karbon'}
                      </div>
                      <div className="text-xs font-bold text-slate-900">{evaluated.message}</div>
                      <div className="text-[11px] text-slate-600">{evaluated.explanation}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* BOTTOM DISCOVERY & COLLECTION GAMIFICATION PANEL */}
          <div
            data-testid="discovered-isomers-panel"
            className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-xs space-y-2"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800">
                <Award className="w-4 h-4 text-indigo-600" />
                Senarai Isomer Yang Ditemui bagi {formulaStr} ({discoveredList.length} / {catalog.length})
              </div>
              {completedAllInGroup && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10.5px] font-extrabold flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  Koleksi {formulaStr} Lengkap!
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {discoveredList.map((item) => {
                const isCurrent = evaluated.canonicalHash === item.canonicalHash;
                return (
                  <button
                    key={item.canonicalHash}
                    type="button"
                    data-testid={`discovered-chip-${item.iupacName}`}
                    onClick={() => handleLoadDiscoveredIsomer(item)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center gap-1.5 transition cursor-pointer ${
                      isCurrent
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                        : 'bg-indigo-50 text-indigo-800 border-indigo-200 hover:bg-indigo-100'
                    }`}
                    title="Klik untuk muatkan semula struktur isomer ini ke dalam sandbox"
                  >
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                    {item.iupacName}
                  </button>
                );
              })}

              {/* Show locked mystery slots for undiscovered isomers */}
              {Array.from({ length: Math.min(missingCount, 8) }, (_, idx) => (
                <span
                  key={`locked-${idx}`}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-50 text-slate-400 border border-dashed border-slate-300 inline-flex items-center gap-1"
                >
                  <Lock className="w-3 h-3" />
                  Isomer Belum Ditemui
                </span>
              ))}
              {missingCount > 8 && (
                <span className="text-[11px] font-bold text-slate-500 px-1.5">
                  +{missingCount - 8} lagi menanti penemuan...
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: TEXTBOOK IUPAC NAMING GUIDE ================= */}
      {activeTab === 'panduan' && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-4 text-xs text-slate-700">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Panduan Melukis &amp; Menamakan Isomer Mengikut IUPAC (KSSM m.s. 101–104)
              </h3>
              <p className="text-[11px] text-slate-500">
                Keisomeran struktur ialah fenomena sebatian yang mempunyai formula molekul sama tetapi formula struktur berbeza.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1.5">
              <div className="font-extrabold text-indigo-900 text-xs">
                Langkah 1–4 Penamaan IUPAC (KSSM m.s. 102–104)
              </div>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] leading-relaxed">
                <li>
                  <strong>Rantai Karbon Terpanjang:</strong> Kenal pasti rantai karbon berterusan terpanjang (mesti mengandungi <strong>C═C</strong> bagi alkena atau karbon bertaut <strong>—OH</strong> bagi alkohol). Ini menentukan <em>nama induk</em> (prop, but, pent, heks, hept).
                </li>
                <li>
                  <strong>Kenal Pasti Cabang &amp; Kumpulan Berfungsi:</strong> Kumpulan alkil seperti metil (<code className="font-mono">-CH₃</code>) atau etil (<code className="font-mono">-C₂H₅</code>).
                </li>
                <li>
                  <strong>Nomborkan Rantai:</strong> Mulakan penomboran dari hujung yang memberi <strong>nombor terendah kepada kumpulan berfungsi</strong> (<code className="font-mono">C═C</code> / <code className="font-mono">—OH</code>), atau kepada cabang bagi alkana.
                </li>
                <li>
                  <strong>Susun Nama:</strong> <code className="font-mono font-bold text-indigo-800">Imbuhan (Cabang) + Nama Induk + Akhiran (-ana / -ena / -ol)</code>. Guna tanda sempang (-) antara nombor dan huruf, dan koma (,) antara nombor.
                </li>
              </ol>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
              <div className="font-extrabold text-emerald-900 text-xs">
                Jenis Keisomeran &amp; Contoh Penting SPM
              </div>
              <div className="space-y-1.5 text-[11px] leading-relaxed">
                <div className="bg-white p-2 rounded-lg border border-emerald-200">
                  <strong>1. Keisomeran Rantai:</strong> Susunan rantai karbon berbeza (rantai lurus vs bercabang). Contoh Alkana <code className="font-mono">C₄H₁₀</code>: <em>Butana</em> &amp; <em>2-Metilpropana</em>.
                </div>
                <div className="bg-white p-2 rounded-lg border border-emerald-200">
                  <strong>2. Keisomeran Kedudukan:</strong> Kedudukan kumpulan berfungsi berbeza pada rantai sama. Contoh Alkena <code className="font-mono">C₄H₈</code>: <em>But-1-ena</em> &amp; <em>But-2-ena</em>; Alkohol <code className="font-mono">C₄H₉OH</code>: <em>Butan-1-ol</em> &amp; <em>Butan-2-ol</em>.
                </div>
                <div className="bg-white p-2 rounded-lg border border-emerald-200">
                  <strong>Ingatan Molekul Berputar (m.s. 104):</strong> Molekul yang hanya terbalik kiri-ke-kanan atau diputar masih molekul yang <strong>sama</strong> dan mempunyai nama IUPAC yang sama!
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="p-2 border border-slate-200">Siri Homolog</th>
                  <th className="p-2 border border-slate-200">Akhiran</th>
                  <th className="p-2 border border-slate-200">C4</th>
                  <th className="p-2 border border-slate-200">C5</th>
                  <th className="p-2 border border-slate-200">C6</th>
                  <th className="p-2 border border-slate-200">C7</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-slate-200 font-bold text-indigo-800">Alkana (CₙH₂ₙ₊₂)</td>
                  <td className="p-2 border border-slate-200 font-mono">-ana</td>
                  <td className="p-2 border border-slate-200">2 isomer</td>
                  <td className="p-2 border border-slate-200">3 isomer</td>
                  <td className="p-2 border border-slate-200">5 isomer</td>
                  <td className="p-2 border border-slate-200">9 isomer</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 font-bold text-sky-800">Alkena (CₙH₂ₙ)</td>
                  <td className="p-2 border border-slate-200 font-mono">-ena</td>
                  <td className="p-2 border border-slate-200">3 isomer</td>
                  <td className="p-2 border border-slate-200">5 isomer</td>
                  <td className="p-2 border border-slate-200">13 isomer</td>
                  <td className="p-2 border border-slate-200">27 isomer</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 font-bold text-emerald-800">Alkohol (CₙH₂ₙ₊₁OH)</td>
                  <td className="p-2 border border-slate-200 font-mono">-ol</td>
                  <td className="p-2 border border-slate-200">4 isomer</td>
                  <td className="p-2 border border-slate-200">8 isomer</td>
                  <td className="p-2 border border-slate-200">17 isomer</td>
                  <td className="p-2 border border-slate-200">39 isomer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
