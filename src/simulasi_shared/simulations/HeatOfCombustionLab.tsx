import React, { useState, useEffect, useRef } from 'react';
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Thermometer,
  Scale,
  Beaker,
  Eye,
  ArrowRight,
  BarChart3,
  BookOpen,
} from 'lucide-react';
import { analytics } from '../services/analytics';
import {
  CombustionCalorimeterSVG,
  AlcoholId,
} from '../components/CombustionCalorimeterSVG';
import { TextbookEnergyLevelSVG } from '../components/TextbookEnergyLevelSVG';

interface AlcoholExperimentSpec {
  id: AlcoholId;
  name: string;
  formula: string;
  carbonCount: number;
  molarMass: number;
  m1: number; // initial lamp + alcohol mass (g)
  m2: number; // final lamp + alcohol mass (g)
  massBurned: number; // m1 - m2 (g)
  moles: number; // massBurned / molarMass
  deltaH: number; // experimental kJ mol^-1 (negative)
  theoreticalDeltaH: number; // textbook theoretical kJ mol^-1 (negative)
  sootLevel: 0 | 1 | 2 | 3;
  sootLabel: string;
  sootObservation: string;
  reactantsText: string;
  productsText: string;
  balancedEquation: string;
  relativeDrop: number;
  accentColor: string;
  pillColor: string;
}

const WATER_MASS_G = 200;
const SPECIFIC_HEAT = 4.2;
const T_INITIAL = 29.0;
const T_FINAL = 59.0;
const DELTA_T = 30.0;
const HEAT_KJ = 25.2; // 200 * 4.2 * 30 / 1000

const ALCOHOL_SPECS: Record<AlcoholId, AlcoholExperimentSpec> = {
  metanol: {
    id: 'metanol',
    name: 'Metanol',
    formula: 'CH₃OH',
    carbonCount: 1,
    molarMass: 32,
    m1: 148.0,
    m2: 146.72,
    massBurned: 1.28,
    moles: 0.04,
    deltaH: -630,
    theoreticalDeltaH: -726,
    sootLevel: 0,
    sootLabel: 'Tiada / sangat sedikit',
    sootObservation: 'Nyalaan biru pucat, tiada jelaga pada bekas kuprum.',
    reactantsText: 'CH₃OH(ce) + ³/₂O₂(g)',
    productsText: 'CO₂(g) + 2H₂O(ce)',
    balancedEquation: 'CH₃OH(ce) + ³/₂O₂(g) → CO₂(g) + 2H₂O(ce)',
    relativeDrop: 0.36,
    accentColor: '#0284c7',
    pillColor: 'sky',
  },
  etanol: {
    id: 'etanol',
    name: 'Etanol',
    formula: 'C₂H₅OH',
    carbonCount: 2,
    molarMass: 46,
    m1: 150.0,
    m2: 149.08,
    massBurned: 0.92,
    moles: 0.02,
    deltaH: -1260,
    theoreticalDeltaH: -1367,
    sootLevel: 1,
    sootLabel: 'Sedikit jelaga',
    sootObservation: 'Nyalaan kuning kebiruan, sedikit jelaga terbentuk.',
    reactantsText: 'C₂H₅OH(ce) + 3O₂(g)',
    productsText: '2CO₂(g) + 3H₂O(ce)',
    balancedEquation: 'C₂H₅OH(ce) + 3O₂(g) → 2CO₂(g) + 3H₂O(ce)',
    relativeDrop: 0.56,
    accentColor: '#4f46e5',
    pillColor: 'indigo',
  },
  propanol: {
    id: 'propanol',
    name: 'Propanol',
    formula: 'C₃H₇OH',
    carbonCount: 3,
    molarMass: 60,
    m1: 152.0,
    m2: 151.16,
    massBurned: 0.84,
    moles: 0.014,
    deltaH: -1800,
    theoreticalDeltaH: -2021,
    sootLevel: 2,
    sootLabel: 'Banyak jelaga hitam',
    sootObservation: 'Nyalaan kuning terang dengan banyak jelaga hitam.',
    reactantsText: 'C₃H₇OH(ce) + ⁹/₂O₂(g)',
    productsText: '3CO₂(g) + 4H₂O(ce)',
    balancedEquation: 'C₃H₇OH(ce) + ⁹/₂O₂(g) → 3CO₂(g) + 4H₂O(ce)',
    relativeDrop: 0.78,
    accentColor: '#d97706',
    pillColor: 'amber',
  },
  butanol: {
    id: 'butanol',
    name: 'Butanol',
    formula: 'C₄H₉OH',
    carbonCount: 4,
    molarMass: 74,
    m1: 154.0,
    m2: 153.26,
    massBurned: 0.74,
    moles: 0.01,
    deltaH: -2520,
    theoreticalDeltaH: -2676,
    sootLevel: 3,
    sootLabel: 'Jelaga sangat tebal',
    sootObservation: 'Nyalaan sangat kuning & berjelaga hitam tebal.',
    reactantsText: 'C₄H₉OH(ce) + 6O₂(g)',
    productsText: '4CO₂(g) + 5H₂O(ce)',
    balancedEquation: 'C₄H₉OH(ce) + 6O₂(g) → 4CO₂(g) + 5H₂O(ce)',
    relativeDrop: 1.0,
    accentColor: '#dc2626',
    pillColor: 'rose',
  },
};

const ALCOHOL_ORDER: AlcoholId[] = ['metanol', 'etanol', 'propanol', 'butanol'];

export const HeatOfCombustionLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lab' | 'compare'>('lab');
  const [selectedAlcohol, setSelectedAlcohol] = useState<AlcoholId>('etanol');

  // Step per alcohol:
  // 0: empty bench
  // 1: copper can + 200 cm³ water + windshields + tripod
  // 2: thermometer placed (T1 = 29.0 °C)
  // 3: spirit lamp weighed (m1) & placed on wooden block
  // 4: burning / heating 29.0 -> 59.0 °C (burnDone true once temp reaches 59.0)
  // 5: extinguished & weighed final mass m2 (calculation unlocked)
  const [stepByAlcohol, setStepByAlcohol] = useState<Record<AlcoholId, number>>({
    metanol: 0,
    etanol: 0,
    propanol: 0,
    butanol: 0,
  });
  const [tempByAlcohol, setTempByAlcohol] = useState<Record<AlcoholId, number>>({
    metanol: T_INITIAL,
    etanol: T_INITIAL,
    propanol: T_INITIAL,
    butanol: T_INITIAL,
  });
  const [burnProgressByAlcohol, setBurnProgressByAlcohol] = useState<Record<AlcoholId, number>>({
    metanol: 0,
    etanol: 0,
    propanol: 0,
    butanol: 0,
  });
  const [isHeating, setIsHeating] = useState(false);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const [calcRevealByAlcohol, setCalcRevealByAlcohol] = useState<Record<AlcoholId, number>>({
    metanol: 1,
    etanol: 1,
    propanol: 1,
    butanol: 1,
  });

  // Tab 2 Energy Diagram mode & pair selection
  const [diagramViewMode, setDiagramViewMode] = useState<'pair' | 'all'>('pair');
  const [setA, setSetA] = useState<AlcoholId>('metanol');
  const [setB, setSetB] = useState<AlcoholId>('butanol');

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    analytics.recordSimulationView('haba-pembakaran');
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    };
  }, []);

  const spec = ALCOHOL_SPECS[selectedAlcohol];
  const currentStep = stepByAlcohol[selectedAlcohol];
  const currentTemp = tempByAlcohol[selectedAlcohol];
  const currentBurnProgress = burnProgressByAlcohol[selectedAlcohol];
  const calcStep = calcRevealByAlcohol[selectedAlcohol];

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleSelectAlcohol = (id: AlcoholId) => {
    if (isHeating) return;
    setSelectedAlcohol(id);
    setWarningMsg(null);
  };

  const handleReset = () => {
    clearTimer();
    setIsHeating(false);
    setWarningMsg(null);
    setStepByAlcohol((prev) => ({ ...prev, [selectedAlcohol]: 0 }));
    setTempByAlcohol((prev) => ({ ...prev, [selectedAlcohol]: T_INITIAL }));
    setBurnProgressByAlcohol((prev) => ({ ...prev, [selectedAlcohol]: 0 }));
    setCalcRevealByAlcohol((prev) => ({ ...prev, [selectedAlcohol]: 1 }));
  };

  const handleActionStep = (targetStep: number) => {
    if (isHeating) return;

    if (targetStep <= currentStep) {
      return;
    }

    if (targetStep !== currentStep + 1) {
      const neededMessages: Record<number, string> = {
        0: 'Sediakan bekas kuprum dengan 200 cm³ air dan pengadang angin dahulu (Langkah 1).',
        1: 'Masukkan termometer ke dalam air untuk menyukat suhu awal T₁ dahulu (Langkah 2).',
        2: `Timbang pelita ${spec.name} (m₁) dan letakkan di atas bongkah kayu dahulu (Langkah 3).`,
        3: 'Nyalakan pelita dan kacau air perlahan-lahan sehingga suhu naik 30.0 °C (Langkah 4).',
      };
      setWarningMsg(neededMessages[currentStep] || 'Ikut urutan langkah eksperimen 1 hingga 5.');
      return;
    }

    setWarningMsg(null);

    if (targetStep === 1 || targetStep === 2 || targetStep === 3) {
      setStepByAlcohol((prev) => ({ ...prev, [selectedAlcohol]: targetStep }));
      return;
    }

    if (targetStep === 4) {
      setStepByAlcohol((prev) => ({ ...prev, [selectedAlcohol]: 4 }));
      setIsHeating(true);
      const startTime = performance.now();
      const durationMs = 1550;
      const alc = selectedAlcohol;

      clearTimer();
      timerRef.current = window.setInterval(() => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(1, elapsed / durationMs);
        const eased = 1 - Math.pow(1 - progress, 2);

        setBurnProgressByAlcohol((prev) => ({ ...prev, [alc]: eased }));
        setTempByAlcohol((prev) => ({
          ...prev,
          [alc]: Number((T_INITIAL + DELTA_T * eased).toFixed(1)),
        }));

        if (progress >= 1) {
          clearTimer();
          setIsHeating(false);
        }
      }, 45);
      return;
    }

    if (targetStep === 5) {
      if (currentBurnProgress < 1) {
        setWarningMsg('Tunggu sehingga suhu air meningkat 30.0 °C (59.0 °C) sebelum memadamkan pelita.');
        return;
      }
      setStepByAlcohol((prev) => ({ ...prev, [selectedAlcohol]: 5 }));
      setCalcRevealByAlcohol((prev) => ({ ...prev, [selectedAlcohol]: 1 }));
      analytics.recordSimulationCompleted('haba-pembakaran');
    }
  };

  const handleDragStart = (e: React.DragEvent, targetStep: number) => {
    e.dataTransfer.setData('text/plain', String(targetStep));
  };

  const handleDropOnBench = (e: React.DragEvent) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData('text/plain');
    const stepNum = Number(raw);
    if (!Number.isNaN(stepNum) && stepNum >= 1 && stepNum <= 5) {
      handleActionStep(stepNum);
    }
  };

  const isCompleted = currentStep === 5;
  const isBurnFinished = currentStep === 4 && currentBurnProgress >= 1;

  const proceduralItems = [
    {
      step: 1,
      title: '1. Bekas Kuprum + 200 cm³ Air',
      subtitle: 'Letak di atas tungku, segi tiga & pengadang angin',
      icon: Beaker,
      done: currentStep >= 1,
      active: currentStep === 0,
    },
    {
      step: 2,
      title: '2. Termometer (Suhu Awal T₁)',
      subtitle: 'Rekod suhu awal air = 29.0 °C',
      icon: Thermometer,
      done: currentStep >= 2,
      active: currentStep === 1,
    },
    {
      step: 3,
      title: `3. Pelita ${spec.name} (Timbang m₁)`,
      subtitle: `m₁ = ${spec.m1.toFixed(2)} g • Letak atas bongkah kayu`,
      icon: Scale,
      done: currentStep >= 3,
      active: currentStep === 2,
    },
    {
      step: 4,
      title: '4. Nyalakan Pelita & Kacau',
      subtitle: 'Panaskan air hingga naik 30.0 °C (59.0 °C)',
      icon: Flame,
      done: currentStep > 4 || isBurnFinished,
      active: currentStep === 3 || (currentStep === 4 && !isBurnFinished),
    },
    {
      step: 5,
      title: '5. Padam & Timbang Akhir (m₂)',
      subtitle: `Rekod jisim akhir pelita = ${spec.m2.toFixed(2)} g`,
      icon: Scale,
      done: currentStep === 5,
      active: isBurnFinished,
    },
  ];

  const currentGuidance = (() => {
    if (warningMsg) return { type: 'warn' as const, text: warningMsg };
    if (currentStep === 0)
      return {
        type: 'info' as const,
        text: `Pilih alkohol di atas, kemudian klik/seret Langkah 1 untuk memasang radas Rajah 3.13 bagi ${spec.name}.`,
      };
    if (currentStep === 1)
      return {
        type: 'info' as const,
        text: 'Klik Langkah 2 untuk memasukkan termometer dan merekod suhu awal air (T₁ = 29.0 °C).',
      };
    if (currentStep === 2)
      return {
        type: 'info' as const,
        text: `Klik Langkah 3 untuk menimbang pelita ${spec.name} (m₁ = ${spec.m1.toFixed(2)} g) dan meletakkannya di bawah bekas kuprum.`,
      };
    if (currentStep === 3)
      return {
        type: 'info' as const,
        text: 'Klik Langkah 4 untuk menyalakan sumbu pelita sambil mengacau air sehingga suhu naik 30.0 °C.',
      };
    if (currentStep === 4 && !isBurnFinished)
      return {
        type: 'info' as const,
        text: `Air sedang dipanaskan dan dikacau perlahan... Perhatikan suhu meningkat hingga 59.0 °C.`,
      };
    if (isBurnFinished)
      return {
        type: 'info' as const,
        text: `Suhu air meningkat 30.0 °C! Klik Langkah 5 untuk memadamkan pelita dan menimbang jisim akhir (m₂).`,
      };
    return {
      type: 'done' as const,
      text: `Eksperimen ${spec.name} selesai! Jelaga: ${spec.sootLabel}. Teruskan langkah pengiraan ΔH di sebelah kanan.`,
    };
  })();

  const completedCount = ALCOHOL_ORDER.filter((id) => stepByAlcohol[id] === 5).length;

  const massDisplayMode: 'idle' | 'initial' | 'burning' | 'final' =
    currentStep >= 5
      ? 'final'
      : currentStep === 4
      ? 'burning'
      : currentStep === 3
      ? 'initial'
      : 'idle';

  return (
    <div className="space-y-3 text-slate-800">
      {/* TOP BAR: Navigation Tabs & 4 Alcohol Selector Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white border border-slate-200 rounded-xl p-2 shadow-xs">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('lab')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'lab'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            1. Makmal Maya &amp; Pengiraan
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'compare'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            2. Perbandingan, Rajah Aras Tenaga &amp; Graf ({completedCount}/4)
          </button>
        </div>

        {activeTab === 'lab' && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {ALCOHOL_ORDER.map((id, idx) => {
              const item = ALCOHOL_SPECS[id];
              const isSelected = selectedAlcohol === id;
              const isDone = stepByAlcohol[id] === 5;
              return (
                <button
                  key={id}
                  onClick={() => handleSelectAlcohol(id)}
                  disabled={isHeating}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-orange-50 border-orange-500 text-orange-800 ring-1 ring-orange-200'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>
                    {idx + 1}. {item.name} ({item.formula})
                  </span>
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* TAB 1: PROCEDURAL VIRTUAL LAB & SCAFFOLDED CALCULATION */}
      {activeTab === 'lab' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
          {/* LEFT PANEL: Radas & Bahan + Arahan Semasa */}
          <div className="md:col-span-4 bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-extrabold text-slate-800">
                Radas &amp; Prosedur ({spec.name})
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 whitespace-nowrap shrink-0">
                Langkah {currentStep}/5
              </span>
            </div>

            <div className="space-y-1.5">
              {proceduralItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.step}
                    type="button"
                    draggable={item.active}
                    onDragStart={(e) => handleDragStart(e, item.step)}
                    onClick={() => handleActionStep(item.step)}
                    disabled={isHeating || item.done}
                    className={`w-full text-left px-2.5 py-2 rounded-lg border transition flex items-center justify-between gap-2 ${
                      item.done
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800 cursor-default'
                        : item.active
                        ? 'bg-orange-50 border-orange-400 text-slate-900 shadow-xs hover:bg-orange-100/70 cursor-pointer'
                        : 'bg-slate-50/70 border-slate-200 text-slate-500 hover:border-slate-300 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className={`p-1.5 rounded-md shrink-0 ${
                          item.done
                            ? 'bg-emerald-100 text-emerald-700'
                            : item.active
                            ? 'bg-orange-500 text-white'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11.5px] font-bold truncate">{item.title}</div>
                        <div className="text-[10px] text-slate-500 truncate">{item.subtitle}</div>
                      </div>
                    </div>
                    {item.done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : item.active ? (
                      <span className="text-[10px] font-extrabold text-orange-700 bg-white px-1.5 py-0.5 rounded border border-orange-300 whitespace-nowrap shrink-0">
                        Klik
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            {/* Arahan Semasa Box */}
            <div
              className={`rounded-lg border p-2.5 text-[11px] leading-snug ${
                currentGuidance.type === 'warn'
                  ? 'bg-rose-50 border-rose-300 text-rose-800'
                  : currentGuidance.type === 'done'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              <div className="font-extrabold flex items-center gap-1 mb-0.5">
                {currentGuidance.type === 'warn' ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                ) : (
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                )}
                <span>Arahan Semasa:</span>
              </div>
              <p>{currentGuidance.text}</p>
            </div>
          </div>

          {/* RIGHT PANEL: Workbench (SVG) + Data & Calculation */}
          <div className="md:col-span-8 space-y-3">
            {/* Meja Kerja (Apparatus Zone) */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDropOnBench}
              className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-xs"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs font-extrabold text-slate-800 truncate">
                    Meja Kerja: Susunan Radas Rajah 3.13 ({spec.name}, {spec.formula})
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="bg-slate-900 text-white px-2.5 py-1 rounded-md font-mono text-xs font-extrabold whitespace-nowrap">
                    {currentStep >= 2 ? `${currentTemp.toFixed(1)} °C` : '--.- °C'}
                  </div>
                  <button
                    onClick={handleReset}
                    disabled={isHeating}
                    className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset
                  </button>
                </div>
              </div>

              <div className="bg-slate-50/80 border border-dashed border-slate-300 rounded-lg p-1.5">
                <CombustionCalorimeterSVG
                  hasCanAndWater={currentStep >= 1}
                  hasThermometer={currentStep >= 2}
                  hasLamp={currentStep >= 3}
                  isBurning={currentStep === 4 && currentBurnProgress < 1}
                  isFinished={currentStep === 5 || isBurnFinished}
                  temperature={currentTemp}
                  alcoholFormula={spec.formula}
                  alcoholName={spec.name}
                  sootLevel={spec.sootLevel}
                  burnProgress={currentBurnProgress}
                  massInitial={spec.m1}
                  massFinal={spec.m2}
                  massDisplayMode={massDisplayMode}
                />
              </div>
            </div>

            {/* Pemerhatian & Pengiraan Panel */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <div className="bg-orange-600 text-white px-3 py-1.5 flex items-center justify-between gap-2">
                <span className="text-xs font-extrabold">
                  Pemerhatian &amp; Perancang Pengiraan ({spec.name})
                </span>
                {isCompleted && (
                  <button
                    onClick={() =>
                      setCalcRevealByAlcohol((prev) => ({
                        ...prev,
                        [selectedAlcohol]: calcStep >= 4 ? 1 : 4,
                      }))
                    }
                    className="px-2.5 py-0.5 rounded bg-white/20 hover:bg-white/30 text-[11px] font-bold flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    {calcStep >= 4 ? 'Ringkaskan' : 'Papar Semua Jalan Kira'}
                  </button>
                )}
              </div>

              <div className="p-3 grid grid-cols-1 md:grid-cols-12 gap-3">
                {/* Left subpanel: Data Eksperimen */}
                <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-lg p-2.5 space-y-1.5">
                  <div className="text-[11px] font-extrabold text-slate-700 border-b border-slate-200 pb-1">
                    Data Eksperimen (200 cm³ Air)
                  </div>
                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between gap-2">
                      <span className="text-slate-600">Jisim pelita awal, m₁</span>
                      <span className="font-mono font-bold text-slate-900 whitespace-nowrap">
                        {currentStep >= 3 ? `${spec.m1.toFixed(2)} g` : '—'}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-slate-600">Jisim pelita akhir, m₂</span>
                      <span className="font-mono font-bold text-slate-900 whitespace-nowrap">
                        {isCompleted ? `${spec.m2.toFixed(2)} g` : '—'}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-slate-600">Jisim alkohol terbakar, m</span>
                      <span className="font-mono font-extrabold text-orange-700 whitespace-nowrap">
                        {isCompleted ? `${spec.massBurned.toFixed(2)} g` : '—'}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2 pt-1 border-t border-slate-200">
                      <span className="text-slate-600">Suhu awal air, T₁</span>
                      <span className="font-mono font-bold text-slate-900 whitespace-nowrap">
                        {currentStep >= 2 ? `${T_INITIAL.toFixed(1)} °C` : '—'}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-slate-600">Suhu tertinggi air, T₂</span>
                      <span className="font-mono font-bold text-slate-900 whitespace-nowrap">
                        {currentStep >= 4 && currentBurnProgress >= 1 ? `${T_FINAL.toFixed(1)} °C` : '—'}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-slate-600">Kenaikan suhu, θ</span>
                      <span className="font-mono font-extrabold text-blue-700 whitespace-nowrap">
                        {currentStep >= 4 && currentBurnProgress >= 1 ? `${DELTA_T.toFixed(1)} °C` : '—'}
                      </span>
                    </div>
                  </div>
                  {isCompleted && (
                    <div className="mt-1.5 pt-1.5 border-t border-slate-200 text-[10.5px] text-slate-700">
                      <span className="font-bold">Jelaga: </span>
                      {spec.sootObservation}
                    </div>
                  )}
                </div>

                {/* Right subpanel: Scaffolded Calculation */}
                <div className="md:col-span-7 space-y-2">
                  {!isCompleted ? (
                    <div className="h-full min-h-[145px] bg-slate-50 border border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center p-3 text-center">
                      <Scale className="w-6 h-6 text-slate-300 mb-1.5" />
                      <div className="text-xs font-bold text-slate-600">
                        Lengkapkan Langkah 1 hingga 5 untuk membuka perancang pengiraan
                      </div>
                      <div className="text-[10.5px] text-slate-400 mt-0.5">
                        JMR {spec.name} ({spec.formula}) = {spec.molarMass} g mol⁻¹
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {/* Step 1: Q = mcθ */}
                      <div className="bg-orange-50/70 border border-orange-200 rounded-lg px-2.5 py-1.5 text-[11px]">
                        <div className="font-extrabold text-orange-900">
                          1. Haba dibebaskan oleh pembakaran (Q = mcθ)
                        </div>
                        <div className="font-mono text-slate-800 mt-0.5">
                          Q = {WATER_MASS_G} g × {SPECIFIC_HEAT} J g⁻¹ °C⁻¹ × {DELTA_T.toFixed(1)} °C = 25,200 J ={' '}
                          <span className="font-extrabold text-orange-700">{HEAT_KJ.toFixed(2)} kJ</span>
                        </div>
                      </div>

                      {/* Step 2: n = m / JMR */}
                      {calcStep >= 2 && (
                        <div className="bg-sky-50/70 border border-sky-200 rounded-lg px-2.5 py-1.5 text-[11px]">
                          <div className="font-extrabold text-sky-900">
                            2. Bilangan mol {spec.name.toLowerCase()} terbakar (n = m / JMR)
                          </div>
                          <div className="font-mono text-slate-800 mt-0.5">
                            n = ({spec.m1.toFixed(2)} - {spec.m2.toFixed(2)}) g / {spec.molarMass} g mol⁻¹ ={' '}
                            <span className="font-extrabold text-sky-700">{spec.moles} mol</span>
                          </div>
                        </div>
                      )}

                      {/* Step 3: ΔH */}
                      {calcStep >= 3 && (
                        <div className="bg-emerald-50/80 border border-emerald-200 rounded-lg px-2.5 py-1.5 text-[11px]">
                          <div className="font-extrabold text-emerald-900">
                            3. Haba pembakaran (ΔH = -Q / n)
                          </div>
                          <div className="font-mono text-slate-800 mt-0.5">
                            ΔH = -{HEAT_KJ.toFixed(2)} kJ / {spec.moles} mol ={' '}
                            <span className="font-extrabold text-emerald-700">
                              {spec.deltaH} kJ mol⁻¹
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Step 4: Thermochemical equation */}
                      {calcStep >= 4 && (
                        <div className="bg-indigo-50/80 border border-indigo-200 rounded-lg px-2.5 py-1.5 text-[11px]">
                          <div className="font-extrabold text-indigo-900">4. Persamaan Termokimia</div>
                          <div className="font-mono font-bold text-indigo-950 mt-0.5">
                            {spec.balancedEquation} &nbsp; ΔH = {spec.deltaH} kJ mol⁻¹
                          </div>
                        </div>
                      )}

                      {calcStep < 4 && (
                        <button
                          onClick={() =>
                            setCalcRevealByAlcohol((prev) => ({
                              ...prev,
                              [selectedAlcohol]: calcStep + 1,
                            }))
                          }
                          className="w-full py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold flex items-center justify-center gap-1 cursor-pointer transition"
                        >
                          <span>Langkah Pengiraan Seterusnya ({calcStep + 1}/4)</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COMPARISON, TEXTBOOK ENERGY LEVEL DIAGRAMS & GRAPH RAJAH 3.14 */}
      {activeTab === 'compare' && (
        <div className="space-y-3">
          {/* Energy Level Diagrams Section */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-xs font-extrabold text-slate-800">
                  Perbandingan Gambar Rajah Aras Tenaga (Gaya Rajah 3.1 Buku Teks KSSM)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Semua tindak balas pembakaran adalah eksotermik (aras tenaga hasil tindak balas lebih rendah daripada bahan).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {diagramViewMode === 'pair' && (
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="font-bold text-slate-600">Set A:</span>
                    <select
                      value={setA}
                      onChange={(e) => setSetA(e.target.value as AlcoholId)}
                      className="px-2 py-1 rounded-md border border-slate-300 bg-slate-50 text-xs font-bold text-slate-800"
                    >
                      {ALCOHOL_ORDER.map((id) => (
                        <option key={id} value={id}>
                          {ALCOHOL_SPECS[id].name}
                        </option>
                      ))}
                    </select>
                    <span className="font-bold text-slate-500">vs</span>
                    <span className="font-bold text-slate-600">Set B:</span>
                    <select
                      value={setB}
                      onChange={(e) => setSetB(e.target.value as AlcoholId)}
                      className="px-2 py-1 rounded-md border border-slate-300 bg-slate-50 text-xs font-bold text-slate-800"
                    >
                      {ALCOHOL_ORDER.map((id) => (
                        <option key={id} value={id}>
                          {ALCOHOL_SPECS[id].name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex rounded-lg bg-slate-100 p-0.5">
                  <button
                    onClick={() => setDiagramViewMode('pair')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition whitespace-nowrap shrink-0 cursor-pointer ${
                      diagramViewMode === 'pair'
                        ? 'bg-white text-indigo-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Banding 2 Set
                  </button>
                  <button
                    onClick={() => setDiagramViewMode('all')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition whitespace-nowrap shrink-0 cursor-pointer ${
                      diagramViewMode === 'all'
                        ? 'bg-white text-indigo-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Semua 4 Alkohol
                  </button>
                </div>
              </div>
            </div>

            {diagramViewMode === 'pair' ? (
              <TextbookEnergyLevelSVG
                columns={2}
                items={[setA, setB].map((id, idx) => {
                  const a = ALCOHOL_SPECS[id];
                  return {
                    title: `Set ${idx === 0 ? 'A' : 'B'}: ${a.name} (${a.formula})`,
                    subtitle: `${a.carbonCount} atom karbon per molekul`,
                    reactants: a.reactantsText,
                    products: a.productsText,
                    deltaHText: `ΔH = ${a.deltaH} kJ mol⁻¹`,
                    relativeDrop: a.relativeDrop,
                    accentColor: a.accentColor,
                  };
                })}
              />
            ) : (
              <TextbookEnergyLevelSVG
                columns={4}
                items={ALCOHOL_ORDER.map((id) => {
                  const a = ALCOHOL_SPECS[id];
                  return {
                    title: `${a.name} (${a.formula})`,
                    subtitle: `n(C) = ${a.carbonCount}`,
                    reactants: a.reactantsText,
                    products: a.productsText,
                    deltaHText: `ΔH = ${a.deltaH} kJ mol⁻¹`,
                    relativeDrop: a.relativeDrop,
                    accentColor: a.accentColor,
                  };
                })}
              />
            )}
          </div>

          {/* Comparison Table + Rajah 3.14 Graph */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Comparison Table */}
            <div className="md:col-span-7 bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-extrabold text-slate-800">
                  Jadual Perbandingan Eksperimen 3B (200 cm³ Air, Δθ = 30.0 °C)
                </h4>
                <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap shrink-0">
                  Q = 25.20 kJ
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-[11px] border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                      <th className="text-left p-1.5 font-extrabold">Alkohol</th>
                      <th className="text-center p-1.5 font-extrabold">C</th>
                      <th className="text-right p-1.5 font-extrabold">m (g)</th>
                      <th className="text-right p-1.5 font-extrabold">n (mol)</th>
                      <th className="text-right p-1.5 font-extrabold">ΔH Eksp.</th>
                      <th className="text-left p-1.5 font-extrabold">Jelaga</th>
                      <th className="text-center p-1.5 font-extrabold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ALCOHOL_ORDER.map((id) => {
                      const a = ALCOHOL_SPECS[id];
                      const done = stepByAlcohol[id] === 5;
                      return (
                        <tr key={id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="p-1.5 font-bold text-slate-900">
                            {a.name}{' '}
                            <span className="text-slate-500 font-normal">({a.formula})</span>
                          </td>
                          <td className="p-1.5 text-center font-mono">{a.carbonCount}</td>
                          <td className="p-1.5 text-right font-mono">{a.massBurned.toFixed(2)}</td>
                          <td className="p-1.5 text-right font-mono">{a.moles}</td>
                          <td className="p-1.5 text-right font-mono font-extrabold text-orange-700 whitespace-nowrap">
                            {a.deltaH} kJ mol⁻¹
                          </td>
                          <td className="p-1.5 text-slate-600">{a.sootLabel}</td>
                          <td className="p-1.5 text-center">
                            {done ? (
                              <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                Selesai
                              </span>
                            ) : (
                              <button
                                onClick={() => {
                                  setSelectedAlcohol(id);
                                  setActiveTab('lab');
                                }}
                                className="px-1.5 py-0.5 rounded bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 text-[10px] font-bold cursor-pointer"
                              >
                                Uji
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-2 text-[10.5px] text-amber-900 leading-relaxed">
                <span className="font-extrabold">Perbincangan Buku Teks (m.s. 134): </span>
                Apabila bilangan atom karbon per molekul alkohol bertambah, nilai haba pembakaran bertambah secara linear kerana lebih banyak ikatan C–C dan C–H dipecahkan dan lebih banyak molekul CO₂ serta H₂O terbentuk. Nilai eksperimen lebih rendah daripada nilai teori (Metanol -726, Etanol -1367, Propanol -2021, Butanol -2676 kJ mol⁻¹) disebabkan kehilangan haba ke persekitaran &amp; pembakaran tidak lengkap (pembentukan jelaga).
              </div>
            </div>

            {/* Rajah 3.14 Graph: Haba Pembakaran melawan Bilangan Atom Karbon */}
            <div className="md:col-span-5 bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-extrabold text-slate-800">
                  Graf Rajah 3.14: |ΔH| vs Bilangan Atom Karbon
                </h4>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                  Berkadar Terus
                </span>
              </div>

              <svg viewBox="0 0 360 215" className="w-full h-auto select-none">
                {/* Grid lines (y = 0, 1000, 2000, 3000) */}
                {[
                  { val: 0, y: 175 },
                  { val: 1000, y: 127 },
                  { val: 2000, y: 79 },
                  { val: 3000, y: 31 },
                ].map((tick) => (
                  <g key={tick.val}>
                    <line x1="56" y1={tick.y} x2="332" y2={tick.y} stroke="#e2e8f0" strokeWidth="1" />
                    <text x="50" y={tick.y + 3.5} textAnchor="end" fontSize="9.5" fontWeight="700" fill="#64748b">
                      {tick.val}
                    </text>
                  </g>
                ))}

                {/* Y Axis */}
                <line x1="56" y1="22" x2="56" y2="175" stroke="#1e293b" strokeWidth="1.6" />
                <polygon points="56,17 52.5,25 59.5,25" fill="#1e293b" />
                <text
                  x="15"
                  y="102"
                  fontSize="9.5"
                  fontWeight="800"
                  fill="#1e293b"
                  transform="rotate(-90, 15, 102)"
                  textAnchor="middle"
                >
                  Haba Pembakaran (kJ mol⁻¹)
                </text>

                {/* X Axis */}
                <line x1="56" y1="175" x2="340" y2="175" stroke="#1e293b" strokeWidth="1.6" />
                <polygon points="345,175 337,171.5 337,178.5" fill="#1e293b" />
                <text x="198" y="206" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#1e293b">
                  Bilangan atom karbon per molekul
                </text>

                {/* X Ticks: C = 1, 2, 3, 4 */}
                {ALCOHOL_ORDER.map((id) => {
                  const a = ALCOHOL_SPECS[id];
                  const cx = 56 + a.carbonCount * 66;
                  return (
                    <g key={id}>
                      <line x1={cx} y1="175" x2={cx} y2="180" stroke="#1e293b" strokeWidth="1.4" />
                      <text x={cx} y="191" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#334155">
                        {a.carbonCount} ({a.name.slice(0, 3)})
                      </text>
                    </g>
                  );
                })}

                {/* Polyline connecting experimental points */}
                <polyline
                  fill="none"
                  stroke="#ea580c"
                  strokeWidth="2.4"
                  points={ALCOHOL_ORDER.map((id) => {
                    const a = ALCOHOL_SPECS[id];
                    const cx = 56 + a.carbonCount * 66;
                    const cy = 175 - (Math.abs(a.deltaH) / 3000) * 144;
                    return `${cx},${cy}`;
                  }).join(' ')}
                />

                {/* Dashed theoretical line for comparison */}
                <polyline
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  points={ALCOHOL_ORDER.map((id) => {
                    const a = ALCOHOL_SPECS[id];
                    const cx = 56 + a.carbonCount * 66;
                    const cy = 175 - (Math.abs(a.theoreticalDeltaH) / 3000) * 144;
                    return `${cx},${cy}`;
                  }).join(' ')}
                />

                {/* Data points */}
                {ALCOHOL_ORDER.map((id) => {
                  const a = ALCOHOL_SPECS[id];
                  const cx = 56 + a.carbonCount * 66;
                  const cyExp = 175 - (Math.abs(a.deltaH) / 3000) * 144;
                  const cyTheo = 175 - (Math.abs(a.theoreticalDeltaH) / 3000) * 144;
                  return (
                    <g key={id}>
                      <circle cx={cx} cy={cyTheo} r="3" fill="#6366f1" />
                      <circle cx={cx} cy={cyExp} r="4.5" fill="#ea580c" stroke="#ffffff" strokeWidth="1.3" />
                      <text x={cx + 5} y={cyExp + 11} fontSize="8.5" fontWeight="800" fill="#9a3412">
                        {Math.abs(a.deltaH)}
                      </text>
                    </g>
                  );
                })}

                {/* Mini legend inside graph top-left */}
                <g transform="translate(72, 22)">
                  <line x1="0" y1="6" x2="16" y2="6" stroke="#6366f1" strokeWidth="1.6" strokeDasharray="4 3" />
                  <text x="20" y="9" fontSize="8.5" fontWeight="700" fill="#4338ca">Nilai Teori</text>
                  <line x1="0" y1="18" x2="16" y2="18" stroke="#ea580c" strokeWidth="2.2" />
                  <text x="20" y="21" fontSize="8.5" fontWeight="700" fill="#c2410c">Nilai Eksperimen</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeatOfCombustionLab;
