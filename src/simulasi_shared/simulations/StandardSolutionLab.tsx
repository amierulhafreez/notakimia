import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  AlertTriangle,
  Info,
  GripVertical,
  FlaskConical,
  Droplets,
  Scale,
  BookOpen,
} from 'lucide-react';
import {
  STANDARD_SALTS,
  StandardSaltId,
  StandardPhaseMode,
  computeSolidPrepStoichiometry,
  computeDilutionStoichiometry,
  buildSolidSteps,
  buildDilutionSteps,
  LabProcedureToolStep,
} from '../data/standardSolutions';
import { StandardSolutionApparatusSVG } from '../components/StandardSolutionApparatusSVG';
import { analytics } from '../services/analytics';

const SIM_ID = 'penyediaan-larutan-piawai';

interface KssmTip {
  id: string;
  label: string;
  question: string;
  answer: string;
}

const KSSM_TIPS: KssmTip[] = [
  {
    id: 'bilas-bikar',
    label: 'Bilas Bikar',
    question: 'Mengapakah bikar dan corong turas perlu dibilas dengan air suling?',
    answer:
      'Untuk memastikan semua baki zat terlarut yang melekat pada dinding bikar dan corong turas dipindahkan sepenuhnya ke dalam kelalang volumetrik supaya kemolaran tepat.',
  },
  {
    id: 'meniskus',
    label: 'Paras Meniskus',
    question: 'Bagaimanakah cara membaca senggatan kelalang volumetrik yang betul?',
    answer:
      'Kedudukan mata mesti separas dengan tanda senggatan dan bahagian bawah meniskus larutan jernih/berwarna menyentuh tepat garisan senggatan untuk mengelakkan ralat paralaks.',
  },
  {
    id: 'bilas-alat',
    label: 'Bilas Pipet',
    question: 'Mengapa pipet dibilas dengan larutan stok, manakala kelalang volumetrik hanya dengan air suling?',
    answer:
      'Pipet dibilas dengan sedikit larutan stok supaya kepekatan larutan yang disukat tidak tercair. Kelalang volumetrik dibilas dengan air suling sahaja agar isi padu air tambahan tidak mengubah jumlah mol.',
  },
];

export const StandardSolutionLab: React.FC = () => {
  const [selectedSaltId, setSelectedSaltId] = useState<StandardSaltId>('cuso4');
  const [mode, setMode] = useState<StandardPhaseMode>('solid');

  // Fasa 1 (Penyediaan 1.0 M daripada pepejal)
  const [solidVolumeCm3, setSolidVolumeCm3] = useState<number>(250);
  const [solidCompletedStep, setSolidCompletedStep] = useState<number>(0);

  // Fasa 2 (Pencairan 1.0 M -> 0.5 M / 0.2 M)
  const [m2TargetM, setM2TargetM] = useState<number>(0.5);
  const [v2FinalCm3, setV2FinalCm3] = useState<number>(100);
  const [dilutionCompletedStep, setDilutionCompletedStep] = useState<number>(0);

  // Status stok siap bagi setiap garam
  const [preparedSalts, setPreparedSalts] = useState<Record<StandardSaltId, boolean>>({
    nacl: false,
    cuso4: false,
    fecl3: false,
  });

  // Drag-and-drop & UI state
  const [draggingToolStep, setDraggingToolStep] = useState<number | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  const [showNaohNote, setShowNaohNote] = useState<boolean>(false);
  const [activeTipId, setActiveTipId] = useState<string>('bilas-bikar');

  const salt = useMemo(
    () => STANDARD_SALTS.find((s) => s.id === selectedSaltId) ?? STANDARD_SALTS[1],
    [selectedSaltId]
  );

  const solidStoich = useMemo(
    () => computeSolidPrepStoichiometry(salt, 1.0, solidVolumeCm3),
    [salt, solidVolumeCm3]
  );

  const dilutionStoich = useMemo(
    () => computeDilutionStoichiometry(1.0, m2TargetM, v2FinalCm3),
    [m2TargetM, v2FinalCm3]
  );

  const steps: LabProcedureToolStep[] = useMemo(() => {
    if (mode === 'solid') {
      return buildSolidSteps(salt, solidStoich.mass2dp, solidStoich.volumeCm3);
    }
    return buildDilutionSteps(
      salt,
      dilutionStoich.v1StockCm3,
      dilutionStoich.vWaterNeededCm3,
      dilutionStoich.m2TargetM,
      dilutionStoich.v2FinalCm3
    );
  }, [mode, salt, solidStoich, dilutionStoich]);

  const completedStep = mode === 'solid' ? solidCompletedStep : dilutionCompletedStep;
  const activeNextStepObj = steps.find((s) => s.step === completedStep + 1) ?? null;
  const activeTip = KSSM_TIPS.find((t) => t.id === activeTipId) ?? KSSM_TIPS[0];

  const handleSelectSalt = (id: StandardSaltId) => {
    setSelectedSaltId(id);
    setSolidCompletedStep(0);
    setDilutionCompletedStep(0);
    setFeedbackError(null);
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  const handleSwitchMode = (nextMode: StandardPhaseMode) => {
    setMode(nextMode);
    setFeedbackError(null);
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  const handleResetPhase = () => {
    if (mode === 'solid') {
      setSolidCompletedStep(0);
    } else {
      setDilutionCompletedStep(0);
    }
    setFeedbackError(null);
  };

  const executeStep = (stepNumber: number) => {
    const expected = completedStep + 1;
    if (completedStep >= 6) {
      return;
    }

    if (stepNumber < expected) {
      const doneObj = steps.find((s) => s.step === stepNumber);
      setFeedbackError(
        `Langkah ${doneObj?.code ?? stepNumber} sudah selesai dijalankan. Seterusnya: ${activeNextStepObj?.code} ${activeNextStepObj?.toolName}.`
      );
      return;
    }

    if (stepNumber > expected) {
      const expectedObj = steps.find((s) => s.step === expected);
      setFeedbackError(
        `Ikut turutan makmal KSSM! Sila jalankan Langkah ${expectedObj?.code} (${expectedObj?.toolName}) dahulu.`
      );
      return;
    }

    setFeedbackError(null);
    analytics.recordSimulationClick(SIM_ID, 1);

    if (mode === 'solid') {
      setSolidCompletedStep(expected);
      if (expected === 6) {
        setPreparedSalts((prev) => ({ ...prev, [selectedSaltId]: true }));
        analytics.recordSimulationCompleted(SIM_ID);
      }
    } else {
      setDilutionCompletedStep(expected);
      if (expected === 6) {
        analytics.recordSimulationCompleted(SIM_ID);
      }
    }
  };

  const handleDragStart = (e: React.DragEvent, stepNum: number) => {
    setDraggingToolStep(stepNum);
    e.dataTransfer.setData('text/plain', String(stepNum));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOverStage = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeaveStage = (e: React.DragEvent) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragOver(false);
  };

  const handleDropOnStage = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const raw = e.dataTransfer.getData('text/plain');
    const stepNum = raw ? Number(raw) : draggingToolStep;
    setDraggingToolStep(null);
    if (stepNum && !Number.isNaN(stepNum)) {
      executeStep(stepNum);
    }
  };

  const handleStartDilutionFromPrepared = () => {
    setMode('dilution');
    setM2TargetM(0.5);
    setDilutionCompletedStep(0);
    setFeedbackError(null);
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  return (
    <div className="space-y-3 text-slate-800">
      {/* Bar Kawalan Atas: Pilihan 3 Garam, Fasa 1 / Fasa 2, Nota NaOH & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mr-1">
            Bahan Pepejal:
          </span>
          {STANDARD_SALTS.map((item) => {
            const active = item.id === selectedSaltId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectSalt(item.id)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  active
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border shrink-0"
                  style={{
                    backgroundColor: item.id === 'nacl' ? '#e2e8f0' : item.stockHex,
                    borderColor: active ? '#ffffff' : item.solidStrokeHex,
                  }}
                />
                <span>{item.name}</span>
                <span className={active ? 'text-indigo-100 font-mono' : 'text-slate-400 font-mono'}>
                  ({item.formula})
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <div className="inline-flex rounded-lg bg-slate-200/75 p-0.5">
            <button
              type="button"
              onClick={() => handleSwitchMode('solid')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                mode === 'solid'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              Fasa 1: Sedia 1.0 M
            </button>
            <button
              type="button"
              onClick={() => handleSwitchMode('dilution')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                mode === 'dilution'
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              Fasa 2: Cairkan ke {m2TargetM.toFixed(1)} M
              {preparedSalts[selectedSaltId] && (
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Larutan stok 1.0 M siap" />
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowNaohNote((v) => !v)}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
              showNaohNote
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-amber-50 hover:text-amber-800'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            Mengapa bukan NaOH?
          </button>

          <button
            type="button"
            onClick={handleResetPhase}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 transition-colors"
            title="Ulang semula langkah fasa semasa"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Nota KSSM NaOH (jika dibuka) */}
      {showNaohNote && (
        <div className="flex items-start justify-between gap-3 bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-2 text-xs text-amber-950">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Nota KSSM (m.s. 163):</strong> Pepejal natrium hidroksida (NaOH) tidak sesuai digunakan secara
              terus untuk menyediakan larutan piawai kerana sifatnya yang{' '}
              <span className="font-semibold">higroskopik</span> (menyerap wap air dan gas CO₂ daripada udara),
              menyebabkan penimbangan jisim tepat sukar diperoleh. Oleh itu, garam stabil seperti{' '}
              <span className="font-semibold">NaCl, CuSO₄ dan FeCl₃</span> digunakan.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowNaohNote(false)}
            className="text-amber-700 hover:text-amber-900 font-semibold shrink-0"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Susun Atur Utama 2 Lajur (Muat Kemas Tanpa Scroll Berlebihan) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        {/* LAJUR KIRI: Pentas Radas Drag-and-Drop + Dulangan Radas (a)-(f) */}
        <div className="lg:col-span-7 flex flex-col gap-2.5">
          {/* Bar Status Langkah (a) - (f) + Warna Garam */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-1">
              {steps.map((s) => {
                const isDone = s.step <= completedStep;
                const isCurrent = s.step === completedStep + 1;
                return (
                  <div
                    key={s.step}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                      isDone
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : isCurrent
                        ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-200'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}
                  >
                    {isDone ? '✓' : s.code}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              <span
                className="w-2.5 h-2.5 rounded-full border"
                style={{
                  backgroundColor: mode === 'solid' ? salt.stockHex : salt.dilutedHex,
                  opacity: mode === 'solid' ? Math.max(0.55, salt.stockOpacity) : Math.max(0.45, salt.dilutedOpacity),
                  borderColor: salt.solidStrokeHex,
                }}
              />
              <span className="font-medium">
                {mode === 'solid'
                  ? `Pepejal: ${salt.solidColorLabel} → ${salt.solutionColorLabel}`
                  : `Pencairan: ${salt.solutionColorLabel} → ${salt.dilutedColorLabel}`}
              </span>
            </div>
          </div>

          {/* Zon Drop Radas Makmal (StandardSolutionApparatusSVG) */}
          <div
            onDragOver={handleDragOverStage}
            onDragLeave={handleDragLeaveStage}
            onDrop={handleDropOnStage}
            data-testid="lab-dropzone"
            className={`relative rounded-xl border-2 transition-all bg-white overflow-hidden ${
              isDragOver
                ? 'border-indigo-500 ring-4 ring-indigo-100 bg-indigo-50/20'
                : 'border-slate-200'
            }`}
          >
            <StandardSolutionApparatusSVG
              salt={salt}
              mode={mode}
              completedStep={completedStep}
              mass2dp={solidStoich.mass2dp}
              volumeCm3={solidStoich.volumeCm3}
              v1StockCm3={dilutionStoich.v1StockCm3}
              vWaterNeededCm3={dilutionStoich.vWaterNeededCm3}
              m2TargetM={dilutionStoich.m2TargetM}
              v2FinalCm3={dilutionStoich.v2FinalCm3}
              isDragOver={isDragOver}
            />

            {feedbackError && (
              <div className="mx-3 mb-2.5 flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg px-3 py-1.5 text-xs font-medium">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{feedbackError}</span>
              </div>
            )}
          </div>

          {/* Dulangan Radas & Reagen Boleh Seret (Drag & Drop + Klik) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
            <div className="flex items-center justify-between mb-2 px-0.5">
              <span className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                Dulangan Radas & Bahan (Seret ke Meja Makmal atau Klik Langkah)
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Kemajuan: {completedStep}/6 langkah
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {steps.map((s) => {
                const isDone = s.step <= completedStep;
                const isNext = s.step === completedStep + 1;
                return (
                  <button
                    key={s.toolId}
                    type="button"
                    draggable={!isDone}
                    onDragStart={(e) => handleDragStart(e, s.step)}
                    onDragEnd={() => {
                      setDraggingToolStep(null);
                      setIsDragOver(false);
                    }}
                    onClick={() => executeStep(s.step)}
                    data-testid={`tool-step-${s.step}`}
                    className={`group flex items-center gap-2 text-left p-2 rounded-lg border transition-all ${
                      isDone
                        ? 'bg-emerald-50/90 border-emerald-300 text-emerald-900 cursor-default'
                        : isNext
                        ? 'bg-white border-indigo-500 ring-2 ring-indigo-100 shadow-sm hover:bg-indigo-50/40 cursor-grab active:cursor-grabbing'
                        : 'bg-white/80 border-slate-200 text-slate-500 hover:border-slate-300 cursor-grab active:cursor-grabbing'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold shrink-0 ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : isNext
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : s.code}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold leading-tight truncate">{s.toolName}</div>
                      <div className="text-[10px] text-slate-500 leading-tight truncate mt-0.5">
                        {isDone ? 'Selesai' : s.toolSub}
                      </div>
                    </div>
                    {!isDone && (
                      <GripVertical
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isNext ? 'text-indigo-500' : 'text-slate-300'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* LAJUR KANAN: Arahan Langkah / CTA Pencairan + Pengiraan Stoikiometri + Nota KSSM */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          {/* Kad Arahan Langkah Semasa / Siap Fasa */}
          {completedStep === 6 ? (
            <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3.5 space-y-2.5 shadow-sm">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-emerald-950">
                    {mode === 'solid'
                      ? `Larutan Piawai ${salt.formula} 1.0 M (${solidStoich.volumeCm3} cm³) Siap!`
                      : `Pencairan ${salt.formula} kepada ${dilutionStoich.m2TargetM.toFixed(1)} M Selesai!`}
                  </h3>
                  {mode === 'solid' ? (
                    <p className="text-xs text-emerald-900 mt-1 leading-relaxed">
                      Sebanyak <strong>{solidStoich.mass2dp.toFixed(2)} g</strong> pepejal{' '}
                      {salt.name} ({salt.formula}) telah dilarutkan tepat ke dalam{' '}
                      <strong>{solidStoich.volumeCm3} cm³</strong> larutan berwarna{' '}
                      <strong>{salt.solutionColorLabel.toLowerCase()}</strong>.
                    </p>
                  ) : (
                    <p className="text-xs text-emerald-900 mt-1 leading-relaxed">
                      <strong>{dilutionStoich.v1StockCm3.toFixed(1)} cm³</strong> larutan stok{' '}
                      {salt.formula} 1.0 M ditambah dengan{' '}
                      <strong>{dilutionStoich.vWaterNeededCm3.toFixed(1)} cm³ air suling</strong> sehingga{' '}
                      {dilutionStoich.v2FinalCm3} cm³ menghasilkan warna{' '}
                      <strong>{salt.dilutedColorLabel.toLowerCase()}</strong>.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                {mode === 'solid' ? (
                  <button
                    type="button"
                    onClick={handleStartDilutionFromPrepared}
                    data-testid="cta-dilute-to-05m"
                    className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-sm transition-colors"
                  >
                    <Droplets className="w-4 h-4" />
                    Cairkan Larutan Ini ke 0.5 M (Aktiviti 6.8)
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSwitchMode('solid')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold transition-colors"
                  >
                    <FlaskConical className="w-3.5 h-3.5" />
                    Kembali ke Penyediaan 1.0 M
                  </button>
                )}
              </div>
            </div>
          ) : (
            activeNextStepObj && (
              <div className="bg-indigo-50/80 border border-indigo-200 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-indigo-700">
                    <span className="px-1.5 py-0.5 rounded bg-indigo-600 text-white">
                      Langkah {activeNextStepObj.code}
                    </span>
                    {mode === 'solid' ? 'Aktiviti 6.7 (Rajah 6.27)' : 'Aktiviti 6.8 (Rajah 6.29)'}
                  </span>
                  <button
                    type="button"
                    onClick={() => executeStep(activeNextStepObj.step)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold transition-colors"
                  >
                    Jalankan
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <h3 className="text-xs font-bold text-slate-900">{activeNextStepObj.title}</h3>
                <p className="text-xs text-slate-700 leading-relaxed">{activeNextStepObj.instruction}</p>
              </div>
            )
          )}

          {/* Panel Pengiraan Stoikiometri (Jisim Molar, Bilangan Mol & Isipadu Air Pencairan) */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-indigo-600" />
                <h4 className="text-xs font-bold text-slate-900">
                  {mode === 'solid'
                    ? `Pengiraan Jisim Pepejal ${salt.formula} (1.0 M)`
                    : `Pengiraan Pencairan ${salt.formula} (M₁V₁ = M₂V₂)`}
                </h4>
              </div>

              {mode === 'solid' ? (
                <div className="inline-flex rounded-md bg-slate-100 p-0.5 text-[11px]">
                  {[250, 100].map((vol) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => {
                        setSolidVolumeCm3(vol);
                        setSolidCompletedStep(0);
                        setFeedbackError(null);
                      }}
                      className={`px-2 py-0.5 rounded font-semibold transition-colors ${
                        solidVolumeCm3 === vol
                          ? 'bg-white text-indigo-700 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {vol} cm³
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <div className="inline-flex rounded-md bg-slate-100 p-0.5 text-[11px]">
                    {[0.5, 0.2].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => {
                          setM2TargetM(m);
                          setDilutionCompletedStep(0);
                          setFeedbackError(null);
                        }}
                        className={`px-2 py-0.5 rounded font-semibold transition-colors ${
                          m2TargetM === m
                            ? 'bg-white text-sky-700 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {m.toFixed(1)} M
                      </button>
                    ))}
                  </div>
                  <div className="inline-flex rounded-md bg-slate-100 p-0.5 text-[11px]">
                    {[100, 250].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => {
                          setV2FinalCm3(v);
                          setDilutionCompletedStep(0);
                          setFeedbackError(null);
                        }}
                        className={`px-2 py-0.5 rounded font-semibold transition-colors ${
                          v2FinalCm3 === v
                            ? 'bg-white text-sky-700 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {v} cm³
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {mode === 'solid' ? (
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between bg-slate-50 rounded-lg px-2.5 py-1.5 border border-slate-100">
                  <span className="text-slate-600">1. Jisim Molar ({salt.formula})</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {salt.jarFormulaText} = <strong className="text-indigo-700">{salt.molarMass.toFixed(1)} g mol⁻¹</strong>
                  </span>
                </div>

                <div className="flex items-center justify-between bg-slate-50 rounded-lg px-2.5 py-1.5 border border-slate-100">
                  <span className="text-slate-600">2. Bilangan Mol (n = MV / 1000)</span>
                  <span className="font-mono font-semibold text-slate-900">
                    (1.0 × {solidStoich.volumeCm3}) / 1000 ={' '}
                    <strong className="text-indigo-700">{solidStoich.moles.toFixed(2)} mol</strong>
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 bg-indigo-50 rounded-lg px-2.5 py-2 border border-indigo-200">
                  <span className="font-semibold text-indigo-950">3. Jisim (m = n × Jisim Molar)</span>
                  <span className="font-mono font-bold text-indigo-700 text-[13px] whitespace-nowrap shrink-0">
                    {solidStoich.moles.toFixed(2)} × {salt.molarMass.toFixed(1)} = {solidStoich.mass2dp.toFixed(2)} g
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 pt-0.5 leading-snug">{salt.formulaNote}</p>
              </div>
            ) : (
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between bg-slate-50 rounded-lg px-2.5 py-1.5 border border-slate-100">
                  <span className="text-slate-600">1. Persamaan Pencairan (M₁V₁ = M₂V₂)</span>
                  <span className="font-mono font-semibold text-slate-900">
                    1.0 × V₁ = {dilutionStoich.m2TargetM.toFixed(1)} × {dilutionStoich.v2FinalCm3}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-slate-50 rounded-lg px-2.5 py-1.5 border border-slate-100">
                  <span className="text-slate-600">2. Isi Padu Larutan Stok 1.0 M (V₁)</span>
                  <span className="font-mono font-bold text-indigo-700">
                    V₁ = {dilutionStoich.v1StockCm3.toFixed(1)} cm³
                  </span>
                </div>

                <div
                  data-testid="water-needed-callout"
                  className="flex items-center justify-between gap-2 bg-sky-50 rounded-lg px-2.5 py-2 border border-sky-300"
                >
                  <span className="font-semibold text-sky-950">3. Air Suling Diperlukan (V₂ − V₁)</span>
                  <span className="font-mono font-bold text-sky-700 text-[13px] whitespace-nowrap shrink-0">
                    {dilutionStoich.v2FinalCm3} − {dilutionStoich.v1StockCm3.toFixed(1)} ={' '}
                    {dilutionStoich.vWaterNeededCm3.toFixed(1)} cm³
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 pt-0.5 leading-snug">
                  Rajah 6.28: Bilangan mol zat terlarut kekal malar ({dilutionStoich.molesBefore.toFixed(3)} mol →{' '}
                  {dilutionStoich.molesAfter.toFixed(3)} mol) sebelum dan selepas penambahan air suling.
                </p>
              </div>
            )}
          </div>

          {/* Perbincangan Ringkas KSSM (Tab Ringkas Tanpa Scroll Panjang) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                Perbincangan KSSM (m.s. 163–165)
              </span>
              <div className="flex items-center gap-1">
                {KSSM_TIPS.map((tip) => (
                  <button
                    key={tip.id}
                    type="button"
                    onClick={() => setActiveTipId(tip.id)}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                      activeTip.id === tip.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {tip.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200/80 px-2.5 py-2 text-[11px] space-y-1">
              <div className="font-semibold text-slate-800">{activeTip.question}</div>
              <p className="text-slate-600 leading-relaxed">{activeTip.answer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
