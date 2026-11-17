import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Droplets,
  Flame,
  RotateCcw,
  Shuffle,
  GripVertical,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  XCircle,
  Thermometer,
  FlaskConical,
  BookOpen,
  ClipboardList,
  Hand,
} from 'lucide-react';
import {
  SALT_CATIONS,
  SALT_ANIONS,
  SOLUBILITY_RULES_TABLE,
  COLOR_REFERENCE_TABLE,
  synthesizeSalt,
  SaltSynthesisResult,
} from '../data/saltSolubility';
import { WatchGlassScaleSVG, SolubilityBeakerSVG } from '../components/SaltBeakerSVG';
import { analytics } from '../services/analytics';

const SIM_ID = 'keterlarutan-garam';

interface SaltPreset {
  cationId: string;
  anionId: string;
  label: string;
}

const SALT_PRESETS: SaltPreset[] = [
  { cationId: 'na', anionId: 'cl', label: 'NaCl' },
  { cationId: 'cu2', anionId: 'so4', label: 'CuSO₄' },
  { cationId: 'cu2', anionId: 'cl', label: 'CuCl₂' },
  { cationId: 'cu2', anionId: 'co3', label: 'CuCO₃' },
  { cationId: 'fe2', anionId: 'so4', label: 'FeSO₄' },
  { cationId: 'fe3', anionId: 'cl', label: 'FeCl₃' },
  { cationId: 'pb2', anionId: 'cl', label: 'PbCl₂*' },
  { cationId: 'pb2', anionId: 'i', label: 'PbI₂*' },
  { cationId: 'ba', anionId: 'so4', label: 'BaSO₄' },
  { cationId: 'ag', anionId: 'cl', label: 'AgCl' },
];

interface TestedLogEntry {
  formula: string;
  saltName: string;
  solidColor: string;
  solidHex: string;
  aqueousColor: string;
  aqueousHex: string;
  isSolubleRoom: boolean;
  isHotSoluble: boolean;
}

type BottomTab = 'rules' | 'colors' | 'log';

export const SaltSolubilityLab: React.FC = () => {
  const [selectedCationId, setSelectedCationId] = useState<string>('cu2');
  const [selectedAnionId, setSelectedAnionId] = useState<string>('cl');
  const [hasDropped, setHasDropped] = useState<boolean>(false);
  const [isHotWater, setIsHotWater] = useState<boolean>(false);
  const [isStirring, setIsStirring] = useState<boolean>(false);
  const [isBeakerDragOver, setIsBeakerDragOver] = useState<boolean>(false);
  const [isSynthDragOver, setIsSynthDragOver] = useState<boolean>(false);
  const [bottomTab, setBottomTab] = useState<BottomTab>('rules');
  const [testedLogs, setTestedLogs] = useState<TestedLogEntry[]>([]);
  const [completionRecorded, setCompletionRecorded] = useState<boolean>(false);

  const salt: SaltSynthesisResult | null = useMemo(
    () => synthesizeSalt(selectedCationId, selectedAnionId),
    [selectedCationId, selectedAnionId]
  );

  useEffect(() => {
    analytics.recordSimulationClick(SIM_ID, 1);
  }, []);

  const triggerStirAnimation = () => {
    setIsStirring(true);
    window.setTimeout(() => setIsStirring(false), 700);
  };

  const selectCation = (id: string) => {
    setSelectedCationId(id);
    setHasDropped(false);
  };

  const selectAnion = (id: string) => {
    setSelectedAnionId(id);
    setHasDropped(false);
  };

  const handleDropSaltIntoBeaker = () => {
    if (!salt) return;
    setHasDropped(true);
    triggerStirAnimation();

    setTestedLogs((prev) => {
      if (prev.some((entry) => entry.formula === salt.formula)) return prev;
      const next: TestedLogEntry[] = [
        {
          formula: salt.formula,
          saltName: salt.saltName,
          solidColor: salt.solidColorName,
          solidHex: salt.solidHex,
          aqueousColor: salt.aqueousColorName,
          aqueousHex: salt.aqueousHex,
          isSolubleRoom: salt.roomTempSoluble,
          isHotSoluble: salt.hotWaterSoluble,
        },
        ...prev,
      ];
      if (next.length >= 3 && !completionRecorded) {
        setCompletionRecorded(true);
        analytics.recordSimulationCompleted(SIM_ID);
        confetti({ particleCount: 45, spread: 55, origin: { y: 0.65 } });
      }
      return next;
    });
  };

  // Drag handlers untuk ion ke zon sintesis
  const handleIonDragStart = (
    e: React.DragEvent,
    kind: 'cation' | 'anion',
    id: string
  ) => {
    e.dataTransfer.setData('application/x-ion-pick', JSON.stringify({ kind, id }));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleSynthDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsSynthDragOver(false);
    const raw = e.dataTransfer.getData('application/x-ion-pick');
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as { kind: 'cation' | 'anion'; id: string };
      if (parsed.kind === 'cation') selectCation(parsed.id);
      if (parsed.kind === 'anion') selectAnion(parsed.id);
    } catch {
      // ignore invalid drag payload
    }
  };

  // Drag handlers untuk garam pepejal ke bikar
  const handleSaltDragStart = (e: React.DragEvent) => {
    if (!salt) return;
    e.dataTransfer.setData('application/x-salt-sample', salt.formula);
    e.dataTransfer.setData('text/plain', salt.formula);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleBeakerDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsBeakerDragOver(false);
    const sample = e.dataTransfer.getData('application/x-salt-sample');
    const plain = e.dataTransfer.getData('text/plain');
    if (sample || plain) {
      handleDropSaltIntoBeaker();
    }
  };

  const handlePreset = (cationId: string, anionId: string) => {
    setSelectedCationId(cationId);
    setSelectedAnionId(anionId);
    setHasDropped(false);
  };

  const handleRandomSalt = () => {
    const c = SALT_CATIONS[Math.floor(Math.random() * SALT_CATIONS.length)];
    const a = SALT_ANIONS[Math.floor(Math.random() * SALT_ANIONS.length)];
    setSelectedCationId(c.id);
    setSelectedAnionId(a.id);
    setHasDropped(false);
  };

  const handleReset = () => {
    setHasDropped(false);
    setIsHotWater(false);
    setIsStirring(false);
  };

  const effectiveSolubleNow = salt
    ? isHotWater
      ? salt.hotWaterSoluble
      : salt.roomTempSoluble
    : false;

  return (
    <div className="flex flex-col gap-2.5 text-slate-800">
      {/* BARIS ATAS: Contoh Pantas + Rawak + Rekod Uji Kaji */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mr-1">
            Sampel KSSM:
          </span>
          {SALT_PRESETS.map((p) => {
            const active =
              selectedCationId === p.cationId && selectedAnionId === p.anionId;
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => handlePreset(p.cationId, p.anionId)}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition ${
                  active
                    ? 'bg-teal-600 text-white border-teal-700 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300 hover:bg-teal-50/50'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            Diuji: {testedLogs.length} garam
          </span>
          <button
            type="button"
            onClick={handleRandomSalt}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-[11px] font-bold transition"
          >
            <Shuffle className="w-3.5 h-3.5" />
            Rawak
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 text-[11px] font-bold transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Kosongkan Bikar
          </button>
        </div>
      </div>

      {/* MEJA MAKMAL UTAMA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        {/* KOLUM KIRI: PEMILIHAN ION + PENIMBANGAN GARAM (DRAG KE BIKAR) */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          {/* Pemilihan Kation & Anion */}
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <h3 className="text-xs font-extrabold text-slate-900">
                Langkah 1: Pilih atau Seret Kation & Anion
              </h3>
              <span className="text-[10px] font-semibold text-slate-400">
                14 Kation × 6 Anion
              </span>
            </div>

            {/* Grid Kation */}
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 mb-1">
                Kation (+)
              </div>
              <div className="grid grid-cols-4 gap-1">
                {SALT_CATIONS.map((c) => {
                  const active = selectedCationId === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      draggable
                      onDragStart={(e) => handleIonDragStart(e, 'cation', c.id)}
                      onClick={() => selectCation(c.id)}
                      title={`${c.name}${c.ionColorHint ? ` (${c.ionColorHint})` : ''}`}
                      className={`px-1.5 py-1.5 rounded-lg border text-center transition cursor-grab active:cursor-grabbing ${
                        active
                          ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                          : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-amber-300 hover:bg-amber-50/50'
                      }`}
                    >
                      <div className="text-xs font-extrabold leading-tight">
                        {c.symbolUnicode}
                      </div>
                      <div
                        className={`text-[9px] truncate ${
                          active ? 'text-amber-50' : 'text-slate-500'
                        }`}
                      >
                        {c.saltPrefix}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Grid Anion */}
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-800 mb-1">
                Anion (−)
              </div>
              <div className="grid grid-cols-3 gap-1">
                {SALT_ANIONS.map((a) => {
                  const active = selectedAnionId === a.id;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      draggable
                      onDragStart={(e) => handleIonDragStart(e, 'anion', a.id)}
                      onClick={() => selectAnion(a.id)}
                      title={a.ruleSummary}
                      className={`px-2 py-1.5 rounded-lg border text-center transition cursor-grab active:cursor-grabbing ${
                        active
                          ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                          : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                      }`}
                    >
                      <div className="text-xs font-extrabold leading-tight">
                        {a.symbolUnicode}
                      </div>
                      <div
                        className={`text-[9px] capitalize ${
                          active ? 'text-indigo-100' : 'text-slate-500'
                        }`}
                      >
                        {a.saltSuffix}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Kad Garam Terhasil (Penimbang Elektronik Rajah 6.36 — Draggable ke Bikar) */}
          {salt && (
            <div
              draggable
              onDragStart={handleSaltDragStart}
              onDragOver={(e) => {
                e.preventDefault();
                setIsSynthDragOver(true);
              }}
              onDragLeave={() => setIsSynthDragOver(false)}
              onDrop={handleSynthDrop}
              className={`bg-white rounded-xl border-2 p-2.5 shadow-sm transition-all cursor-grab active:cursor-grabbing ${
                isSynthDragOver
                  ? 'border-indigo-500 bg-indigo-50/40'
                  : hasDropped
                  ? 'border-teal-300'
                  : 'border-dashed border-teal-500 bg-teal-50/20 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="inline-flex items-center gap-1 text-[10.5px] font-extrabold uppercase tracking-wider text-teal-800">
                  <GripVertical className="w-3.5 h-3.5 text-teal-600" />
                  Langkah 2: Seret Garam ke Bikar Air
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600">
                  {salt.cation.symbolUnicode} + {salt.anion.symbolUnicode}
                </span>
              </div>

              <div className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-5 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-lg p-1.5">
                  <WatchGlassScaleSVG salt={salt} />
                </div>

                <div className="col-span-7 space-y-1.5">
                  <div>
                    <div className="text-xl font-black text-slate-900 leading-none">
                      {salt.formula}
                    </div>
                    <div className="text-xs font-bold text-slate-700 mt-0.5">
                      {salt.saltName}
                    </div>
                  </div>

                  {/* Swatch warna pepejal garam */}
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5">
                    <span
                      className="w-4 h-4 rounded-full border border-slate-400 shrink-0 shadow-inner"
                      style={{ backgroundColor: salt.solidHex }}
                    />
                    <div className="min-w-0">
                      <div className="text-[9px] font-bold uppercase text-slate-400 leading-none">
                        Warna Pepejal
                      </div>
                      <div className="text-[11px] font-bold text-slate-800 truncate mt-0.5">
                        {salt.solidColorName}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleDropSaltIntoBeaker}
                    className={`w-full py-1.5 px-2.5 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition ${
                      hasDropped
                        ? 'bg-teal-50 text-teal-800 border border-teal-300 hover:bg-teal-100'
                        : 'bg-teal-600 text-white hover:bg-teal-500 shadow-sm'
                    }`}
                  >
                    <Droplets className="w-3.5 h-3.5" />
                    {hasDropped ? 'Uji Semula dalam Bikar' : 'Masukkan ke Bikar Air →'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* KOLUM KANAN: BIKAR MAKMAL (DROP ZONE) + WARNA & KETERLARUTAN + JADUAL RUJUKAN */}
        <div className="lg:col-span-7 flex flex-col gap-2.5">
          {/* Bikar + Keputusan Sisi-ke-Sisi */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
              {/* Zon Drop Bikar Makmal (Rajah 6.36, 6.37 & 6.49) */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsBeakerDragOver(true);
                }}
                onDragLeave={() => setIsBeakerDragOver(false)}
                onDrop={handleBeakerDrop}
                className={`md:col-span-6 rounded-xl border-2 p-2.5 flex flex-col items-center justify-between transition-all ${
                  isBeakerDragOver
                    ? 'border-teal-500 bg-teal-50/60 scale-[1.01]'
                    : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <div className="w-full flex items-center justify-between text-[10.5px] font-bold text-slate-600 mb-1">
                  <span className="inline-flex items-center gap-1">
                    <FlaskConical className="w-3.5 h-3.5 text-teal-600" />
                    Bikar Ujian (Rajah 6.36 & 6.49)
                  </span>
                  {!hasDropped && (
                    <span className="text-[10px] font-extrabold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full animate-pulse">
                      Zon Lepas Garam
                    </span>
                  )}
                </div>

                <SolubilityBeakerSVG
                  salt={salt}
                  hasDropped={hasDropped}
                  isHotWater={isHotWater}
                  isStirring={isStirring}
                  isDragOver={isBeakerDragOver}
                />

                {/* Kawalan Rod Kaca & Suhu Air (Air Bilik vs Air Panas Bunsen) */}
                <div className="w-full grid grid-cols-2 gap-1.5 mt-1">
                  <button
                    type="button"
                    disabled={!hasDropped}
                    onClick={triggerStirAnimation}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border flex items-center justify-center gap-1 transition ${
                      hasDropped
                        ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                        : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    }`}
                  >
                    <Hand className="w-3.5 h-3.5" />
                    Kacau (Rod Kaca)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsHotWater((v) => !v);
                      if (hasDropped) triggerStirAnimation();
                    }}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border flex items-center justify-center gap-1 transition ${
                      isHotWater
                        ? 'bg-rose-600 text-white border-rose-700 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-orange-300 hover:bg-orange-50'
                    }`}
                  >
                    {isHotWater ? (
                      <>
                        <Flame className="w-3.5 h-3.5" />
                        Air Panas (80 °C)
                      </>
                    ) : (
                      <>
                        <Thermometer className="w-3.5 h-3.5 text-sky-600" />
                        Panaskan Air
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Panel Pemerhatian: Keterlarutan + Warna Pepejal & Akueus */}
              <div className="md:col-span-6 flex flex-col justify-between gap-2">
                {salt && hasDropped ? (
                  <>
                    {/* Lencana Status Keterlarutan */}
                    <div
                      className={`rounded-xl border p-2.5 ${
                        salt.status === 'special-redox'
                          ? 'bg-amber-50 border-amber-300'
                          : effectiveSolubleNow
                          ? 'bg-emerald-50 border-emerald-300'
                          : 'bg-rose-50 border-rose-300'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {effectiveSolubleNow ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                            Keputusan Eksperimen ({isHotWater ? 'Air Panas 80 °C' : 'Suhu Bilik 28 °C'})
                          </div>
                          <div
                            className={`text-sm font-extrabold leading-snug ${
                              salt.status === 'special-redox'
                                ? 'text-amber-900'
                                : effectiveSolubleNow
                                ? 'text-emerald-900'
                                : 'text-rose-900'
                            }`}
                          >
                            {salt.status === 'hot-soluble'
                              ? isHotWater
                                ? 'LARUT dalam Air Panas (Larutan Tidak Berwarna)'
                                : 'TIDAK LARUT pada Suhu Bilik (Cuba Panaskan Air!)'
                              : effectiveSolubleNow
                              ? 'LARUT dalam Air (Garam Terlarutkan)'
                              : 'TIDAK LARUT dalam Air (Garam Tak Terlarutkan)'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Perbandingan Warna Pepejal vs Larutan Akueus (Jadual 6.12) */}
                    <div className="grid grid-cols-1 gap-1.5">
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 flex items-center gap-2.5">
                        <span
                          className="w-7 h-7 rounded-lg border border-slate-400 shrink-0 shadow-inner"
                          style={{ backgroundColor: salt.solidHex }}
                        />
                        <div className="min-w-0">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Warna dalam Keadaan Pepejal
                          </div>
                          <div className="text-xs font-extrabold text-slate-900">
                            {salt.solidColorName}
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 flex items-center gap-2.5">
                        <span
                          className="w-7 h-7 rounded-lg border border-slate-400 shrink-0 shadow-inner"
                          style={{
                            backgroundColor:
                              effectiveSolubleNow || salt.status === 'special-redox'
                                ? salt.aqueousHex
                                : '#e0f2fe',
                            opacity: effectiveSolubleNow ? 0.9 : 0.75,
                          }}
                        />
                        <div className="min-w-0">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Warna dalam Larutan Akueus
                          </div>
                          <div className="text-xs font-extrabold text-slate-900">
                            {salt.status === 'hot-soluble'
                              ? isHotWater
                                ? 'Larutan tidak berwarna (garam terlarut)'
                                : `Tidak larut pada 28 °C (Mendakan ${salt.solidColorName.toLowerCase()})`
                              : salt.aqueousColorName}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Penerangan Hukum & Mnemonik */}
                    <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-2.5 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10.5px] font-extrabold text-teal-900">
                          {salt.ruleTag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-700 leading-relaxed">
                        {salt.explanation}
                      </p>
                      <div className="text-[10.5px] font-mono font-bold text-teal-800 bg-white border border-teal-100 rounded px-2 py-1">
                        Tip: {salt.ruleMnemonic}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="h-full rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-4 flex flex-col items-center justify-center text-center gap-2">
                    <Droplets className="w-8 h-8 text-teal-500" />
                    <div className="text-xs font-extrabold text-slate-800">
                      Sedia Menguji {salt ? `${salt.saltName} (${salt.formula})` : 'Garam'}
                    </div>
                    <p className="text-[11px] text-slate-500 max-w-[260px]">
                      Seret sampel pepejal dari piring kaca ke dalam bikar air (atau klik{' '}
                      <strong>Masukkan ke Bikar Air</strong>) untuk memerhati keterlarutan dan
                      warna larutan akueusnya.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* PANEL BAWAH BERTAB: JADUAL 6.6 | JADUAL WARNA 6.12 | REKOD UJI KAJI SAYA */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setBottomTab('rules')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                    bottomTab === 'rules'
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Jadual 6.6 & Mnemonik
                </button>
                <button
                  type="button"
                  onClick={() => setBottomTab('colors')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                    bottomTab === 'colors'
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  Jadual 6.12 (Warna Garam)
                </button>
                <button
                  type="button"
                  onClick={() => setBottomTab('log')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                    bottomTab === 'log'
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  <ClipboardList className="w-3.5 h-3.5" />
                  Rekod Uji Kaji ({testedLogs.length})
                </button>
              </div>
              <span className="text-[10px] font-semibold text-slate-500">
                Rujukan Kimia Tingkatan 4 KSSM Bab 6
              </span>
            </div>

            <div className="p-2.5 max-h-[168px] overflow-y-auto">
              {bottomTab === 'rules' && (
                <div className="space-y-1.5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 text-[10.5px]">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-2 py-1 font-bold text-emerald-900">
                      NO ANaK: Nitrat, NH₄⁺, Na⁺, K⁺ → Semua LARUT
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg px-2 py-1 font-bold text-amber-900">
                      PBC Sulfat: PbSO₄, BaSO₄, CaSO₄ → TAK LARUT
                    </div>
                    <div className="bg-rose-50 border border-rose-200 rounded-lg px-2 py-1 font-bold text-rose-900">
                      HPA Klorida: Hg₂Cl₂, PbCl₂*, AgCl → TAK LARUT
                    </div>
                  </div>
                  <table className="w-full text-[11px] border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 text-left">
                        <th className="py-1 px-2 rounded-tl-md font-bold">Jenis Garam</th>
                        <th className="py-1 px-2 font-bold">Larut dalam Air</th>
                        <th className="py-1 px-2 rounded-tr-md font-bold">Tidak Larut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {SOLUBILITY_RULES_TABLE.map((row) => (
                        <tr key={row.type}>
                          <td className="py-1 px-2 font-bold text-slate-800">{row.type}</td>
                          <td className="py-1 px-2 text-emerald-800 font-medium">
                            {row.soluble}
                          </td>
                          <td className="py-1 px-2 text-rose-700 font-medium">
                            {row.insoluble}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {bottomTab === 'colors' && (
                <table className="w-full text-[11px] border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 text-left">
                      <th className="py-1 px-2 font-bold">Garam / Ion</th>
                      <th className="py-1 px-2 font-bold">Keadaan Pepejal</th>
                      <th className="py-1 px-2 font-bold">Larutan Akueus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {COLOR_REFERENCE_TABLE.map((row) => (
                      <tr key={row.salt}>
                        <td className="py-1 px-2 font-bold text-slate-800">{row.salt}</td>
                        <td className="py-1 px-2">
                          <span className="inline-flex items-center gap-1.5">
                            <span
                              className="w-3 h-3 rounded-full border border-slate-400 inline-block"
                              style={{ backgroundColor: row.solidHex }}
                            />
                            {row.solid}
                          </span>
                        </td>
                        <td className="py-1 px-2">
                          <span className="inline-flex items-center gap-1.5">
                            <span
                              className="w-3 h-3 rounded-full border border-slate-400 inline-block"
                              style={{ backgroundColor: row.aqHex }}
                            />
                            {row.aqueous}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {bottomTab === 'log' &&
                (testedLogs.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-4">
                    Belum ada garam diuji. Seret garam ke dalam bikar untuk merekodkan pemerhatian
                    seperti Jadual 6.11.
                  </p>
                ) : (
                  <table className="w-full text-[11px] border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 text-left">
                        <th className="py-1 px-2 font-bold">Garam</th>
                        <th className="py-1 px-2 font-bold">Warna Pepejal</th>
                        <th className="py-1 px-2 font-bold">Keterlarutan (28 °C)</th>
                        <th className="py-1 px-2 font-bold">Larutan Akueus</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {testedLogs.map((item) => (
                        <tr key={item.formula}>
                          <td className="py-1 px-2 font-bold text-slate-900">
                            {item.saltName} ({item.formula})
                          </td>
                          <td className="py-1 px-2">{item.solidColor}</td>
                          <td className="py-1 px-2 font-bold">
                            {item.isSolubleRoom ? (
                              <span className="text-emerald-700">Larut</span>
                            ) : item.isHotSoluble ? (
                              <span className="text-amber-700">Tak larut (Larut bila panas)</span>
                            ) : (
                              <span className="text-rose-700">Tidak larut</span>
                            )}
                          </td>
                          <td className="py-1 px-2">{item.aqueousColor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
