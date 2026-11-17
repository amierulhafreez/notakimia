import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowRight,
  Award,
  Beaker,
  BookOpen,
  Calculator,
  CheckCircle2,
  Eye,
  FlameKindling,
  FlaskConical,
  HelpCircle,
  Lock,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Thermometer,
} from 'lucide-react';
import { analytics } from '../services/analytics';
import {
  DisplacementCalorimeterSVG,
  DisplacementMetal,
} from '../components/DisplacementCalorimeterSVG';
import { TextbookEnergyLevelSVG } from '../components/TextbookEnergyLevelSVG';

const SIM_ID = 'haba-penyesaran';
type LabTab = 'makmal' | 'perbandingan';

interface ExperimentSetData {
  metal: DisplacementMetal;
  metalName: string;
  productSaltFormula: string;
  initialTemp: number; // T1 (°C)
  maxTemp: number; // T2 (°C)
  deltaT: number; // θ (°C)
  volumeCm3: number;
  molarity: number;
  heatJ: number;
  heatKj: string;
  heatKjNum: number;
  moles: string;
  molesNum: number;
  deltaH: number; // kJ mol-1 (negative)
  chemEq: string;
  ionicEq: string;
  thermoEq: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
}

const EXPERIMENT_SETS: Record<DisplacementMetal, ExperimentSetData> = {
  Mg: {
    metal: 'Mg',
    metalName: 'Magnesium',
    productSaltFormula: 'MgSO₄',
    initialTemp: 29.0,
    maxTemp: 46.0,
    deltaT: 17.0,
    volumeCm3: 50,
    molarity: 0.2,
    heatJ: 3570,
    heatKj: '3.57',
    heatKjNum: 3.57,
    moles: '0.01',
    molesNum: 0.01,
    deltaH: -357,
    chemEq: 'Mg(p) + CuSO₄(ak) → MgSO₄(ak) + Cu(p)',
    ionicEq: 'Mg(p) + Cu²⁺(ak) → Mg²⁺(ak) + Cu(p)',
    thermoEq: 'Mg(p) + CuSO₄(ak) → MgSO₄(ak) + Cu(p)   ΔH = -357 kJ mol⁻¹',
    accentBg: 'bg-indigo-50',
    accentBorder: 'border-indigo-200',
    accentText: 'text-indigo-800',
  },
  Zn: {
    metal: 'Zn',
    metalName: 'Zink',
    productSaltFormula: 'ZnSO₄',
    initialTemp: 29.0,
    maxTemp: 39.0,
    deltaT: 10.0,
    volumeCm3: 50,
    molarity: 0.2,
    heatJ: 2100,
    heatKj: '2.10',
    heatKjNum: 2.1,
    moles: '0.01',
    molesNum: 0.01,
    deltaH: -210,
    chemEq: 'Zn(p) + CuSO₄(ak) → ZnSO₄(ak) + Cu(p)',
    ionicEq: 'Zn(p) + Cu²⁺(ak) → Zn²⁺(ak) + Cu(p)',
    thermoEq: 'Zn(p) + CuSO₄(ak) → ZnSO₄(ak) + Cu(p)   ΔH = -210 kJ mol⁻¹',
    accentBg: 'bg-sky-50',
    accentBorder: 'border-sky-200',
    accentText: 'text-sky-800',
  },
};

export const ThermochemistryLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LabTab>('makmal');
  const [selectedMetal, setSelectedMetal] = useState<DisplacementMetal>('Mg');
  // 0=empty, 1=CuSO4 poured, 2=thermometer inserted, 3=metal added, 4=lid+stir reacting, 5=done
  const [labStep, setLabStep] = useState<number>(0);
  const [currentTemp, setCurrentTemp] = useState<number>(29.0);
  const [reactionProgress, setReactionProgress] = useState<number>(0);
  const [guidanceWarning, setGuidanceWarning] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Scaffolded calculation states
  const [calcUnlockedStep, setCalcUnlockedStep] = useState<number>(1);
  const [showAllCalcSteps, setShowAllCalcSteps] = useState<boolean>(false);
  const [qInput, setQInput] = useState<string>('');
  const [nInput, setNInput] = useState<string>('');
  const [dhInput, setDhInput] = useState<string>('');
  const [calcFeedback, setCalcFeedback] = useState<string | null>(null);

  // Track which sets have been completed in this session
  const [completedSets, setCompletedSets] = useState<Record<DisplacementMetal, boolean>>({
    Mg: false,
    Zn: false,
  });

  const intervalRef = useRef<number | null>(null);
  const exp = EXPERIMENT_SETS[selectedMetal];

  const stopTimer = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopTimer();
  }, []);

  const resetExperiment = (nextMetal?: DisplacementMetal) => {
    stopTimer();
    const target = nextMetal ?? selectedMetal;
    if (nextMetal) setSelectedMetal(nextMetal);
    setLabStep(0);
    setCurrentTemp(EXPERIMENT_SETS[target].initialTemp);
    setReactionProgress(0);
    setGuidanceWarning(null);
    setCalcUnlockedStep(1);
    setShowAllCalcSteps(false);
    setQInput('');
    setNInput('');
    setDhInput('');
    setCalcFeedback(null);
  };

  const handleSelectSet = (metal: DisplacementMetal) => {
    if (metal === selectedMetal) return;
    analytics.recordSimulationClick(SIM_ID);
    resetExperiment(metal);
  };

  const handleStepAction = (action: 'cuso4' | 'thermometer' | 'Mg' | 'Zn' | 'lid') => {
    setGuidanceWarning(null);

    if (action === 'cuso4') {
      if (labStep >= 1) {
        setGuidanceWarning('50 cm³ larutan CuSO₄ 0.2 mol dm⁻³ sudah dimasukkan ke dalam cawan polistirena.');
        return;
      }
      setLabStep(1);
      analytics.recordSimulationClick(SIM_ID);
      return;
    }

    if (action === 'thermometer') {
      if (labStep < 1) {
        setGuidanceWarning('Langkah tertinggal! Sila masukkan 50 cm³ larutan CuSO₄ 0.2 mol dm⁻³ dahulu.');
        return;
      }
      if (labStep >= 2) {
        setGuidanceWarning('Termometer sudah berada di dalam cawan. Suhu awal T₁ = 29.0 °C telah direkodkan.');
        return;
      }
      setLabStep(2);
      setCurrentTemp(exp.initialTemp);
      analytics.recordSimulationClick(SIM_ID);
      return;
    }

    if (action === 'Mg' || action === 'Zn') {
      if (labStep < 1) {
        setGuidanceWarning('Langkah tertinggal! Tuangkan larutan CuSO₄ ke dalam cawan polistirena dahulu.');
        return;
      }
      if (labStep < 2) {
        setGuidanceWarning('Langkah tertinggal! Masukkan termometer untuk mencatat suhu awal (T₁) sebelum menambah serbuk logam.');
        return;
      }
      if (labStep >= 3) {
        setGuidanceWarning(`Serbuk ${exp.metalName} (${exp.metal}) sudah ditambah. Klik "Penutup & Kacau Campuran" untuk memulakan tindak balas.`);
        return;
      }
      // Allow switching between Mg and Zn smoothly right at Step 3!
      setSelectedMetal(action);
      setLabStep(3);
      analytics.recordSimulationClick(SIM_ID);
      return;
    }

    if (action === 'lid') {
      if (labStep < 3) {
        setGuidanceWarning('Langkah tertinggal! Lengkapkan langkah 1 hingga 3 (CuSO₄ → Termometer → Serbuk Logam) sebelum menutup & mengacau.');
        return;
      }
      if (labStep >= 4) return;

      setLabStep(4);
      analytics.recordSimulationClick(SIM_ID);

      let tick = 0;
      const totalTicks = 20;
      const activeExp = EXPERIMENT_SETS[selectedMetal];

      stopTimer();
      intervalRef.current = window.setInterval(() => {
        tick += 1;
        const frac = Math.min(1, tick / totalTicks);
        // Slight ease-out curve for realistic temperature rise
        const eased = 1 - Math.pow(1 - frac, 2);
        setReactionProgress(eased);
        setCurrentTemp(
          Number((activeExp.initialTemp + eased * activeExp.deltaT).toFixed(1))
        );

        if (tick >= totalTicks) {
          stopTimer();
          setLabStep(5);
          setReactionProgress(1);
          setCurrentTemp(activeExp.maxTemp);
          setCompletedSets((prev) => ({ ...prev, [activeExp.metal]: true }));
          analytics.recordSimulationCompleted(SIM_ID);
          confetti({ particleCount: 55, spread: 55 });
        }
      }, 90);
    }
  };

  const handleDropOnWorkbench = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const item = e.dataTransfer.getData('text/thermo-item');
    if (
      item === 'cuso4' ||
      item === 'thermometer' ||
      item === 'Mg' ||
      item === 'Zn' ||
      item === 'lid'
    ) {
      handleStepAction(item);
    }
  };

  const getCurrentGuidanceText = (): string => {
    if (guidanceWarning) return guidanceWarning;
    switch (labStep) {
      case 0:
        return 'Langkah 1/4: Seret atau klik "50 cm³ Larutan Kuprum(II) sulfat" ke dalam Cawan Polistirena.';
      case 1:
        return 'Langkah 2/4: Masukkan "Termometer" ke dalam larutan untuk mengukur suhu awal (T₁ = 29.0 °C).';
      case 2:
        return `Langkah 3/4: Tambah "Serbuk ${exp.metalName} (${exp.metal})" berlebihan ke dalam larutan CuSO₄.`;
      case 3:
        return 'Langkah 4/4: Letakkan "Penutup & Kacau Campuran" untuk mengelakkan kehilangan haba dan merekod suhu tertinggi (T₂).';
      case 4:
        return `Tindak balas eksotermik sedang berlaku... ${exp.metalName} sedang menyesarkan kuprum daripada CuSO₄.`;
      default:
        return `Eksperimen tamat! Logam ${exp.metalName} (${exp.metal}) menyesarkan kuprum. Lengkapkan 4 langkah pengiraan berperingkat di bawah.`;
    }
  };

  const handleCheckStep1 = () => {
    setCalcFeedback(null);
    const val = parseFloat(qInput);
    if (qInput.trim() === '' || Math.abs(val - exp.heatKjNum) <= 0.05) {
      setQInput(exp.heatKj);
      setCalcUnlockedStep((prev) => Math.max(prev, 2));
    } else {
      setCalcFeedback(`Semak semula: Q = 50 × 4.2 × ${exp.deltaT.toFixed(1)} = ${exp.heatJ} J = ${exp.heatKj} kJ.`);
    }
  };

  const handleCheckStep2 = () => {
    setCalcFeedback(null);
    const val = parseFloat(nInput);
    if (nInput.trim() === '' || Math.abs(val - exp.molesNum) <= 0.001) {
      setNInput(exp.moles);
      setCalcUnlockedStep((prev) => Math.max(prev, 3));
    } else {
      setCalcFeedback('Semak semula: n = (0.2 × 50) / 1000 = 0.01 mol.');
    }
  };

  const handleCheckStep3 = () => {
    setCalcFeedback(null);
    const val = parseFloat(dhInput);
    if (dhInput.trim() === '' || Math.abs(val - exp.deltaH) <= 2) {
      setDhInput(String(exp.deltaH));
      setCalcUnlockedStep(4);
    } else {
      setCalcFeedback(
        `Semak semula: Tindak balas eksotermik membebaskan haba, maka ΔH bernilai negatif = -${exp.heatKj} / 0.01 = ${exp.deltaH} kJ mol⁻¹.`
      );
    }
  };

  const isStepRevealed = (stepNum: number) =>
    showAllCalcSteps || calcUnlockedStep > stepNum || (stepNum === 4 && calcUnlockedStep >= 4);

  return (
    <div className="space-y-2">
      {/* Top Bar: Tabs + Set Selector */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-1.5">
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'makmal' as LabTab, label: '1. Makmal Maya & Pengiraan', icon: FlaskConical },
            { id: 'perbandingan' as LabTab, label: '2. Perbandingan & Rajah Aras Tenaga', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                data-testid={`tab-${tab.id}`}
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

        {/* 2 Experiment Sets Quick Switch */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-500 hidden sm:inline">Pilih Set Eksperimen:</span>
          {(['Mg', 'Zn'] as DisplacementMetal[]).map((m) => {
            const info = EXPERIMENT_SETS[m];
            const active = selectedMetal === m;
            const done = completedSets[m];
            return (
              <button
                key={m}
                type="button"
                data-testid={`select-set-${m}`}
                onClick={() => handleSelectSet(m)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold border flex items-center gap-1.5 transition cursor-pointer ${
                  active
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>
                  Set {m === 'Mg' ? '1' : '2'}: {info.metalName} ({m})
                </span>
                {done && (
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${active ? 'text-emerald-300' : 'text-emerald-600'}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= TAB 1: PROCEDURAL VIRTUAL LAB + SCAFFOLDED CALCULATION ================= */}
      {activeTab === 'makmal' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
          {/* LEFT 4 COLS: Radas & Bahan + Arahan Semasa */}
          <div className="md:col-span-4 bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <span className="text-xs font-extrabold text-slate-800">Radas &amp; Bahan</span>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                Langkah {Math.min(4, labStep + 1)}/4
              </span>
            </div>

            <div className="space-y-1.5">
              {/* Apparatus 1: CuSO4 */}
              <button
                type="button"
                draggable={labStep === 0}
                data-testid="step-btn-cuso4"
                onDragStart={(e) => e.dataTransfer.setData('text/thermo-item', 'cuso4')}
                onClick={() => handleStepAction('cuso4')}
                className={`w-full text-left px-3 py-2 rounded-xl border transition flex items-center justify-between gap-2 cursor-pointer ${
                  labStep >= 1
                    ? 'bg-slate-50 border-slate-200 text-slate-400'
                    : 'bg-sky-50/80 border-indigo-400 ring-2 ring-indigo-100 text-slate-900 hover:bg-sky-100/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                    <Beaker className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs font-extrabold leading-tight">
                      50 cm³ Larutan Kuprum(II) sulfat
                    </div>
                    <div className="text-[10px] font-medium opacity-80">0.2 mol dm⁻³ (biru)</div>
                  </div>
                </div>
                {labStep >= 1 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <span className="text-[9.5px] font-extrabold text-indigo-700 bg-white px-1.5 py-0.5 rounded border border-indigo-200">
                    Langkah 1
                  </span>
                )}
              </button>

              {/* Apparatus 2: Termometer */}
              <button
                type="button"
                draggable={labStep === 1}
                data-testid="step-btn-thermometer"
                onDragStart={(e) => e.dataTransfer.setData('text/thermo-item', 'thermometer')}
                onClick={() => handleStepAction('thermometer')}
                className={`w-full text-left px-3 py-2 rounded-xl border transition flex items-center justify-between gap-2 cursor-pointer ${
                  labStep >= 2
                    ? 'bg-slate-50 border-slate-200 text-slate-400'
                    : labStep === 1
                      ? 'bg-rose-50/80 border-indigo-400 ring-2 ring-indigo-100 text-slate-900 hover:bg-rose-100/70'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <Thermometer className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs font-extrabold leading-tight">Termometer</div>
                    <div className="text-[10px] font-medium opacity-80">Ukur suhu awal (T₁) &amp; tertinggi (T₂)</div>
                  </div>
                </div>
                {labStep >= 2 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <span className="text-[9.5px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    Langkah 2
                  </span>
                )}
              </button>

              {/* Apparatus 3A & 3B: Serbuk Magnesium (Mg) & Serbuk Zink (Zn) */}
              {(['Mg', 'Zn'] as DisplacementMetal[]).map((metalKey) => {
                const mInfo = EXPERIMENT_SETS[metalKey];
                const isSelectedMetal = selectedMetal === metalKey;
                const isActiveTarget = labStep === 2 && isSelectedMetal;
                const isPlacedThisMetal = labStep >= 3 && isSelectedMetal;
                const isOtherMetalDuringRun = labStep >= 3 && !isSelectedMetal;

                return (
                  <button
                    key={metalKey}
                    type="button"
                    draggable={labStep === 2}
                    data-testid={`step-btn-${metalKey}`}
                    onDragStart={(e) => e.dataTransfer.setData('text/thermo-item', metalKey)}
                    onClick={() => handleStepAction(metalKey)}
                    className={`w-full text-left px-3 py-2 rounded-xl border transition flex items-center justify-between gap-2 cursor-pointer ${
                      isPlacedThisMetal
                        ? 'bg-indigo-50/70 border-indigo-300 text-indigo-950'
                        : isOtherMetalDuringRun
                          ? 'bg-slate-50 border-slate-200 text-slate-400 opacity-70'
                          : isActiveTarget
                            ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-100 text-slate-900 hover:bg-indigo-100/70'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-7 h-7 rounded-lg font-mono text-xs font-extrabold flex items-center justify-center shrink-0 ${
                          isSelectedMetal
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {metalKey}
                      </span>
                      <div>
                        <div className="text-xs font-extrabold leading-tight">
                          Serbuk {mInfo.metalName} ({metalKey})
                        </div>
                        <div className="text-[10px] font-medium opacity-80">
                          Logam reaktif berlebihan
                        </div>
                      </div>
                    </div>
                    {isPlacedThisMetal ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <span className="text-[9.5px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {isSelectedMetal ? 'Langkah 3' : 'Alternatif'}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Apparatus 4: Penutup & Kacau */}
              <button
                type="button"
                draggable={labStep === 3}
                data-testid="step-btn-lid-stir"
                onDragStart={(e) => e.dataTransfer.setData('text/thermo-item', 'lid')}
                onClick={() => handleStepAction('lid')}
                className={`w-full text-left px-3 py-2 rounded-xl border transition flex items-center justify-between gap-2 cursor-pointer ${
                  labStep >= 4
                    ? 'bg-slate-50 border-slate-200 text-slate-400'
                    : labStep === 3
                      ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-100 text-slate-900 hover:bg-amber-100/70'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <FlameKindling className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs font-extrabold leading-tight">Penutup &amp; Kacau Campuran</div>
                    <div className="text-[10px] font-medium opacity-80">
                      Elak kehilangan haba &amp; mula tindak balas
                    </div>
                  </div>
                </div>
                {labStep >= 5 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <span className="text-[9.5px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    Langkah 4
                  </span>
                )}
              </button>
            </div>

            {/* Arahan Semasa Card */}
            <div
              data-testid="arahan-semasa-box"
              className={`rounded-xl border p-2.5 space-y-1 text-[11px] leading-snug ${
                guidanceWarning
                  ? 'bg-rose-50 border-rose-200 text-rose-900'
                  : 'bg-amber-50/90 border-amber-200 text-amber-950'
              }`}
            >
              <div className="font-extrabold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                {guidanceWarning ? 'Peringatan Prosedur:' : 'Arahan Semasa:'}
              </div>
              <p>{getCurrentGuidanceText()}</p>
            </div>
          </div>

          {/* RIGHT 8 COLS: Meja Kerja (Rajah 3.9) + Pemerhatian & Perancang Pengiraan */}
          <div className="md:col-span-8 flex flex-col space-y-2">
            {/* Meja Kerja Dropzone */}
            <div
              data-testid="calorimeter-workbench"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDropOnWorkbench}
              className={`bg-white border-2 rounded-xl p-2 shadow-xs relative transition ${
                isDragOver ? 'border-indigo-500 bg-indigo-50/30 border-dashed' : 'border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between px-1 mb-0.5">
                <span className="text-[11px] font-bold text-slate-500">
                  Meja Kerja (Zon Letak Radas • Aktiviti Makmal 3C)
                </span>
                <div className="flex items-center gap-2">
                  <span
                    data-testid="live-temp-readout"
                    className="px-2.5 py-0.5 rounded-lg bg-slate-900 text-amber-300 font-mono font-extrabold text-sm tracking-wide shadow-2xs"
                  >
                    {labStep >= 2 ? `${currentTemp.toFixed(1)} °C` : '--.- °C'}
                  </span>
                  <button
                    type="button"
                    data-testid="reset-lab-btn"
                    onClick={() => resetExperiment()}
                    className="px-2.5 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[11px] font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                </div>
              </div>

              <DisplacementCalorimeterSVG
                metal={selectedMetal}
                step={labStep}
                currentTemp={currentTemp}
                maxTemp={exp.maxTemp}
                reactionProgress={reactionProgress}
                isDragOver={isDragOver}
              />
            </div>

            {/* Bottom Panel: Pemerhatian & Perancang Pengiraan Berperingkat */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <div className="bg-indigo-600 text-white px-3 py-1.5 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-extrabold flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5" />
                  Pemerhatian &amp; Pengiraan ({exp.metalName} + CuSO₄)
                </span>
                {labStep === 5 && (
                  <button
                    type="button"
                    data-testid="show-all-steps-btn"
                    onClick={() => setShowAllCalcSteps((v) => !v)}
                    className="px-2 py-0.5 rounded-md bg-white/15 hover:bg-white/25 text-[10.5px] font-bold text-white flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    {showAllCalcSteps ? 'Mod Perancang Interaktif' : 'Papar Semua Jalan Kira'}
                  </button>
                )}
              </div>

              <div className="p-2 grid grid-cols-1 md:grid-cols-12 gap-2">
                {/* Left 5 cols: Data Eksperimen & Pemerhatian */}
                <div className="md:col-span-5 space-y-1.5">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-[11px] space-y-1">
                    <div className="font-extrabold text-slate-700 text-[10px] uppercase tracking-wider mb-0.5">
                      Data Eksperimen (50 cm³ CuSO₄ 0.2 M)
                    </div>
                    <div className="flex items-center justify-between gap-2 py-0.5 border-b border-slate-200">
                      <span className="text-slate-600">Suhu awal, T₁</span>
                      <strong className="font-mono text-slate-900 whitespace-nowrap shrink-0">
                        {labStep >= 2 ? `${exp.initialTemp.toFixed(1)} °C` : '—'}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between gap-2 py-0.5 border-b border-slate-200">
                      <span className="text-slate-600">Suhu tertinggi, T₂</span>
                      <strong className="font-mono text-rose-600 whitespace-nowrap shrink-0">
                        {labStep === 5 ? `${exp.maxTemp.toFixed(1)} °C` : '—'}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between gap-2 pt-0.5">
                      <span className="text-slate-600 font-semibold">Perubahan suhu, θ</span>
                      <strong className="font-mono text-indigo-700 whitespace-nowrap shrink-0">
                        {labStep === 5 ? `${exp.deltaT.toFixed(1)} °C` : '—'}
                      </strong>
                    </div>
                  </div>

                  {/* Observations & Equation */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-[10px] space-y-0.5 leading-snug">
                    <div className="font-extrabold text-slate-700 uppercase text-[9.5px]">
                      Pemerhatian &amp; Persamaan:
                    </div>
                    {labStep < 5 ? (
                      <p className="text-slate-500 italic">
                        Lengkapkan langkah eksperimen (1 → 4) untuk merekod pemerhatian fizikal dan membuka perancang pengiraan.
                      </p>
                    ) : (
                      <ul className="space-y-0.5 text-slate-700 list-disc pl-3.5">
                        <li>
                          Larutan biru <code className="font-mono">CuSO₄</code> pudar menjadi tidak berwarna ({exp.productSaltFormula}).
                        </li>
                        <li>Enapan perang kemerahan (Kuprum, Cu) terbentuk di dasar cawan.</li>
                        <li className="font-mono font-bold text-indigo-900 list-none -ml-3.5 pt-0.5">
                          {exp.chemEq}
                        </li>
                        <li className="font-mono text-slate-700 list-none -ml-3.5">
                          Ion: {exp.ionicEq}
                        </li>
                      </ul>
                    )}
                  </div>
                </div>

                {/* Right 7 cols: Scaffolded Step-by-Step Calculation */}
                <div className="md:col-span-7 space-y-1" data-testid="scaffolded-calculation-panel">
                  {labStep < 5 ? (
                    <div className="h-full min-h-[150px] rounded-lg border border-dashed border-slate-300 bg-slate-50/70 flex flex-col items-center justify-center text-center p-4 space-y-1.5">
                      <Lock className="w-5 h-5 text-slate-400" />
                      <div className="text-xs font-bold text-slate-600">
                        Perancang Pengiraan Terkunci
                      </div>
                      <p className="text-[11px] text-slate-500 max-w-xs">
                        Jalankan prosedur makmal di atas sehingga eksperimen tamat untuk mengira haba dibebaskan (<code className="font-mono">Q</code>), bilangan mol (<code className="font-mono">n</code>), dan Haba Penyesaran (<code className="font-mono">ΔH</code>).
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {/* Step 1: Q = mcθ */}
                      <div
                        data-testid="calc-step-1"
                        className={`rounded-lg border px-2 py-1.5 text-[10.5px] ${
                          isStepRevealed(1)
                            ? 'bg-emerald-50/60 border-emerald-200'
                            : 'bg-indigo-50/50 border-indigo-200'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-1.5">
                          <span className="font-extrabold text-slate-800">
                            1. Haba dibebaskan (<code className="font-mono">Q = mcθ</code>)
                          </span>
                          {!isStepRevealed(1) ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                step="0.01"
                                placeholder="Cth: 3.57"
                                value={qInput}
                                onChange={(e) => setQInput(e.target.value)}
                                className="w-20 px-1.5 py-0.5 rounded border border-indigo-300 bg-white font-mono text-[11px]"
                              />
                              <span className="font-mono font-bold text-slate-600">kJ</span>
                              <button
                                type="button"
                                data-testid="reveal-calc-step-1"
                                onClick={handleCheckStep1}
                                className="px-2 py-0.5 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10.5px] cursor-pointer"
                              >
                                Semak / Kira
                              </button>
                            </div>
                          ) : (
                            <span className="font-mono font-extrabold text-emerald-700">
                              Q = {exp.heatKj} kJ ✓
                            </span>
                          )}
                        </div>
                        <div className="font-mono text-[10.5px] text-slate-600 mt-0.5">
                          Q = 50 g × 4.2 J g⁻¹ °C⁻¹ × {exp.deltaT.toFixed(1)} °C
                          {isStepRevealed(1) && ` = ${exp.heatJ} J = ${exp.heatKj} kJ`}
                        </div>
                      </div>

                      {/* Step 2: n = MV / 1000 */}
                      <div
                        data-testid="calc-step-2"
                        className={`rounded-lg border px-2 py-1.5 text-[10.5px] ${
                          isStepRevealed(2)
                            ? 'bg-emerald-50/60 border-emerald-200'
                            : calcUnlockedStep >= 2
                              ? 'bg-indigo-50/50 border-indigo-200'
                              : 'bg-slate-50 border-slate-200 opacity-65'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-1.5">
                          <span className="font-extrabold text-slate-800">
                            2. Bilangan mol kuprum disesarkan (<code className="font-mono">n = MV/1000</code>)
                          </span>
                          {!isStepRevealed(2) && calcUnlockedStep >= 2 ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                step="0.001"
                                placeholder="0.01"
                                value={nInput}
                                onChange={(e) => setNInput(e.target.value)}
                                className="w-20 px-1.5 py-0.5 rounded border border-indigo-300 bg-white font-mono text-[11px]"
                              />
                              <span className="font-mono font-bold text-slate-600">mol</span>
                              <button
                                type="button"
                                data-testid="reveal-calc-step-2"
                                onClick={handleCheckStep2}
                                className="px-2 py-0.5 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10.5px] cursor-pointer"
                              >
                                Semak / Kira
                              </button>
                            </div>
                          ) : isStepRevealed(2) ? (
                            <span className="font-mono font-extrabold text-emerald-700">
                              n = {exp.moles} mol ✓
                            </span>
                          ) : (
                            <Lock className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </div>
                        <div className="font-mono text-[10.5px] text-slate-600 mt-0.5">
                          n = (0.2 × 50) / 1000 {isStepRevealed(2) && `= ${exp.moles} mol Cu`}
                        </div>
                      </div>

                      {/* Step 3: ΔH = -Q / n */}
                      <div
                        data-testid="calc-step-3"
                        className={`rounded-lg border px-2 py-1.5 text-[10.5px] ${
                          isStepRevealed(3)
                            ? 'bg-emerald-50/80 border-emerald-300'
                            : calcUnlockedStep >= 3
                              ? 'bg-indigo-50/50 border-indigo-200'
                              : 'bg-slate-50 border-slate-200 opacity-65'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-1.5">
                          <span className="font-extrabold text-slate-800">
                            3. Haba penyesaran 1 mol kuprum (<code className="font-mono">ΔH = -Q/n</code>)
                          </span>
                          {!isStepRevealed(3) && calcUnlockedStep >= 3 ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                step="1"
                                placeholder={`${exp.deltaH}`}
                                value={dhInput}
                                onChange={(e) => setDhInput(e.target.value)}
                                className="w-20 px-1.5 py-0.5 rounded border border-indigo-300 bg-white font-mono text-[11px]"
                              />
                              <span className="font-mono font-bold text-slate-600">kJ mol⁻¹</span>
                              <button
                                type="button"
                                data-testid="reveal-calc-step-3"
                                onClick={handleCheckStep3}
                                className="px-2 py-0.5 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10.5px] cursor-pointer"
                              >
                                Semak / Kira
                              </button>
                            </div>
                          ) : isStepRevealed(3) ? (
                            <span
                              data-testid="final-delta-h"
                              className="font-mono font-extrabold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300"
                            >
                              ΔH = {exp.deltaH} kJ mol⁻¹ ✓
                            </span>
                          ) : (
                            <Lock className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </div>
                        <div className="font-mono text-[10.5px] text-slate-600 mt-0.5">
                          ΔH = -{exp.heatKj} kJ / {exp.moles} mol
                          {isStepRevealed(3) && ` = ${exp.deltaH} kJ mol⁻¹ (Tanda "-" = eksotermik)`}
                        </div>
                      </div>

                      {calcFeedback && (
                        <div className="text-[10.5px] font-semibold text-amber-900 bg-amber-50 border border-amber-200 rounded-md px-2 py-1">
                          {calcFeedback}
                        </div>
                      )}

                      {/* Step 4 Summary Prompt to run second metal set */}
                      {isStepRevealed(3) && (
                        <div
                          data-testid="calc-step-4"
                          className="rounded-lg bg-indigo-50 border border-indigo-200 px-2.5 py-1.5 flex flex-wrap items-center justify-between gap-2 text-[10.5px]"
                        >
                          <div className="text-indigo-950 font-medium">
                            <strong>Persamaan Termokimia:</strong>{' '}
                            <span className="font-mono font-bold">{exp.thermoEq}</span>
                          </div>
                          {!completedSets[selectedMetal === 'Mg' ? 'Zn' : 'Mg'] ? (
                            <button
                              type="button"
                              onClick={() => handleSelectSet(selectedMetal === 'Mg' ? 'Zn' : 'Mg')}
                              className="px-2 py-0.5 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-1 cursor-pointer shrink-0"
                            >
                              Uji Set {selectedMetal === 'Mg' ? '2 (Zink)' : '1 (Magnesium)'}
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setActiveTab('perbandingan')}
                              className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1 cursor-pointer shrink-0"
                            >
                              Bandingkan Mg vs Zn
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: COMPARISON + ENERGY LEVEL DIAGRAMS + SPM DISCUSSION ================= */}
      {activeTab === 'perbandingan' && (
        <div className="space-y-3">
          {/* Side-by-side comparison table */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-1.5">
              <h3 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-indigo-600" />
                Perbandingan Dua Set Eksperimen Haba Penyesaran Kuprum (50 cm³ CuSO₄ 0.2 mol dm⁻³)
              </h3>
              <span className="text-[10.5px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Kedua-dua tindak balas adalah Eksotermik (ΔH negatif)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="p-2 border border-slate-200">Set Eksperimen</th>
                    <th className="p-2 border border-slate-200">T₁ / T₂ (°C)</th>
                    <th className="p-2 border border-slate-200">Perubahan Suhu, θ</th>
                    <th className="p-2 border border-slate-200">Haba Dibebaskan, Q</th>
                    <th className="p-2 border border-slate-200">Mol Cu, n</th>
                    <th className="p-2 border border-slate-200">Haba Penyesaran, ΔH</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-indigo-50/40">
                    <td className="p-2 border border-slate-200 font-bold text-indigo-950">
                      Set 1: Magnesium (Mg) + CuSO₄
                    </td>
                    <td className="p-2 border border-slate-200 font-mono">29.0 → 46.0 °C</td>
                    <td className="p-2 border border-slate-200 font-mono font-bold text-indigo-700">17.0 °C</td>
                    <td className="p-2 border border-slate-200 font-mono">3570 J = 3.57 kJ</td>
                    <td className="p-2 border border-slate-200 font-mono">0.01 mol</td>
                    <td className="p-2 border border-slate-200 font-mono font-extrabold text-rose-700">
                      -357 kJ mol⁻¹
                    </td>
                  </tr>
                  <tr className="bg-sky-50/40">
                    <td className="p-2 border border-slate-200 font-bold text-sky-950">
                      Set 2: Zink (Zn) + CuSO₄
                    </td>
                    <td className="p-2 border border-slate-200 font-mono">29.0 → 39.0 °C</td>
                    <td className="p-2 border border-slate-200 font-mono font-bold text-sky-700">10.0 °C</td>
                    <td className="p-2 border border-slate-200 font-mono">2100 J = 2.10 kJ</td>
                    <td className="p-2 border border-slate-200 font-mono">0.01 mol</td>
                    <td className="p-2 border border-slate-200 font-mono font-extrabold text-rose-700">
                      -210 kJ mol⁻¹
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Gambar Rajah Aras Tenaga (Set 1 & Set 2) + KSSM Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Energy Level Diagrams (Textbook Rajah 3.1 KSSM Style) */}
            <div className="md:col-span-7 bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs font-extrabold text-slate-800">
                  Gambar Rajah Aras Tenaga (Eksotermik • Gaya Rajah 3.1 Buku Teks)
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                  Aras Hasil &lt; Bahan
                </span>
              </div>
              <TextbookEnergyLevelSVG
                columns={2}
                items={[
                  {
                    title: 'Set 1: Magnesium + CuSO₄',
                    subtitle: 'Haba lebih tinggi (lebih cergas)',
                    reactants: 'Mg(p) + Cu²⁺(ak)',
                    products: 'Mg²⁺(ak) + Cu(p)',
                    deltaHText: 'ΔH = -357 kJ mol⁻¹',
                    relativeDrop: 1.0,
                    accentColor: '#4f46e5',
                  },
                  {
                    title: 'Set 2: Zink + CuSO₄',
                    subtitle: 'Haba lebih rendah',
                    reactants: 'Zn(p) + Cu²⁺(ak)',
                    products: 'Zn²⁺(ak) + Cu(p)',
                    deltaHText: 'ΔH = -210 kJ mol⁻¹',
                    relativeDrop: 0.59,
                    accentColor: '#0284c7',
                  },
                ]}
              />
            </div>

            {/* Perbincangan Aktiviti Makmal 3C (KSSM m.s. 126) */}
            <div className="md:col-span-5 bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2 text-[11px]">
              <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-500" />
                Perbincangan Penting SPM (Aktiviti 3C)
              </div>
              <div className="space-y-1.5 leading-snug text-slate-700">
                <div className="p-2 rounded-lg bg-indigo-50/70 border border-indigo-200">
                  <strong>1. Mengapakah |ΔH| Magnesium lebih besar daripada Zink?</strong>
                  <p className="mt-0.5">
                    Magnesium (<strong>Mg</strong>) lebih elektropositif (kedudukan lebih tinggi dalam Siri Elektrokimia) berbanding zink (<strong>Zn</strong>). Perbezaan keelektropositifan antara Mg dengan Cu lebih besar, maka lebih banyak tenaga haba dibebaskan.
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <strong>2. Mengapakah serbuk Mg &amp; Zn digunakan secara berlebihan?</strong>
                  <p className="mt-0.5">
                    Untuk memastikan kesemua ion kuprum(II), <code className="font-mono">Cu²⁺</code> disesarkan lengkap menjadi atom kuprum.
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-200">
                  <strong>3. Jika CuSO₄ diganti dengan Cu(NO₃)₂ (kepekatan &amp; isi padu sama)?</strong>
                  <p className="mt-0.5 flex items-start gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      Nilai ΔH adalah <strong>sama</strong> kerana kedua-duanya hanya melibatkan penyesaran <code className="font-mono">Cu²⁺</code> (<code className="font-mono">SO₄²⁻</code> &amp; <code className="font-mono">NO₃⁻</code> ialah ion pemerhati).
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
