import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Droplets,
  Flame,
  HelpCircle,
  Info,
  Layers,
  Recycle,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { analytics } from '../services/analytics';
import { AluminumCellSVG } from '../components/AluminumCellSVG';

const SIM_ID = 'pengekstrakan-aluminium';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question:
      'Apakah tujuan menambah kriolit (Na₃AlF₆) ke dalam leburan aluminium oksida (Al₂O₃) semasa pengekstrakan aluminium?',
    options: [
      'Bertindak sebagai mangkin untuk meningkatkan kelajuan pengaliran arus',
      'Menurunkan takat lebur aluminium oksida daripada 2000 °C kepada sekitar 950 °C',
      'Mengelakkan anod karbon daripada bertindak balas dengan gas oksigen',
      'Menjadikan ketumpatan aluminium lebih rendah supaya terapung di permukaan',
    ],
    correctIndex: 1,
    explanation:
      'Alumina (Al₂O₃) tulen mempunyai takat lebur yang sangat tinggi (~2000 °C). Penambahan kriolit (Na₃AlF₆) menurunkan takat lebur campuran kepada sekitar 950 °C bagi menjimatkan tenaga elektrik dan kos operasi.',
  },
  {
    id: 2,
    question:
      'Mengapakah elektrod anod daripada karbon perlu diganti dari semasa ke semasa? (Cabaran Minda KSSM)',
    options: [
      'Anod karbon larut ke dalam leburan kriolit',
      'Ion Al³⁺ memendap pada anod dan menyalutinya',
      'Gas oksigen yang terhasil di anod bertindak balas dengan karbon panas membentuk gas CO₂',
      'Suhu 950 °C meleburkan blok anod karbon secara langsung',
    ],
    correctIndex: 2,
    explanation:
      'Di anod (+), gas oksigen (O₂) terhasil (2O²⁻ → O₂ + 4e⁻). Pada suhu tinggi, oksigen mengoksidakan anod karbon (C + O₂ → CO₂), menyebabkan anod karbon terhakis dan perlu diganti.',
  },
  {
    id: 3,
    question: 'Manakah persamaan setengah yang betul berlaku di katod (−) semasa proses ini?',
    options: [
      'Al³⁺(ce) + 3e⁻ → Al(ce)',
      '2O²⁻(ce) → O₂(g) + 4e⁻',
      'Al(ce) → Al³⁺(ce) + 3e⁻',
      'O₂(g) + 4e⁻ → 2O²⁻(ce)',
    ],
    correctIndex: 0,
    explanation:
      'Ion aluminium bercas positif (Al³⁺) tertarik ke katod karbon (−) yang melapisi bekas sel dan mengalami penurunan dengan menerima 3 elektron untuk membentuk leburan aluminium tulen.',
  },
];

export const AluminumExtractionLab: React.FC = () => {
  const [hasCryolite, setHasCryolite] = useState(true);
  const [forceHighHeat, setForceHighHeat] = useState(false);
  const [powerOn, setPowerOn] = useState(false);
  const [elapsedCycles, setElapsedCycles] = useState(0); // 0..100
  const [tapOpen, setTapOpen] = useState(false);
  const [collectedAluminum, setCollectedAluminum] = useState(0);
  const [activeTab, setActiveTab] = useState<'simulasi' | 'alam' | 'kuiz'>('simulasi');

  // Quiz state
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const isMolten = hasCryolite || forceHighHeat;
  const operatingTemp = hasCryolite ? 950 : forceHighHeat ? 2000 : 950;
  const canRunElectrolysis = isMolten;
  const anodeWearPercent = Math.min(75, Math.round(elapsedCycles * 0.75));
  const moltenAlLevel = Math.max(0, Math.min(100, elapsedCycles * 0.9 - collectedAluminum * 0.8));

  useEffect(() => {
    if (!powerOn || !canRunElectrolysis) return;
    const interval = window.setInterval(() => {
      setElapsedCycles((prev) => (prev >= 100 ? 100 : prev + 2));
    }, 350);
    return () => window.clearInterval(interval);
  }, [powerOn, canRunElectrolysis]);

  useEffect(() => {
    if (!tapOpen || moltenAlLevel <= 5 || !isMolten) return;
    const drain = window.setInterval(() => {
      setCollectedAluminum((prev) => Math.min(100, prev + 4));
    }, 250);
    return () => window.clearInterval(drain);
  }, [tapOpen, moltenAlLevel, isMolten]);

  const handleToggleCryolite = () => {
    setHasCryolite((prev) => {
      const next = !prev;
      if (next) setForceHighHeat(false);
      return next;
    });
    analytics.recordSimulationClick(SIM_ID);
  };

  const handleTogglePower = () => {
    const next = !powerOn;
    setPowerOn(next);
    if (next) analytics.recordSimulationClick(SIM_ID);
  };

  const handleReplaceAnode = () => {
    setElapsedCycles(0);
    setTapOpen(false);
    setCollectedAluminum(0);
    analytics.recordSimulationClick(SIM_ID);
  };

  const handleReset = () => {
    setPowerOn(false);
    setHasCryolite(true);
    setForceHighHeat(false);
    setElapsedCycles(0);
    setTapOpen(false);
    setCollectedAluminum(0);
    setAnswers({});
    setQuizSubmitted(false);
  };

  const handleAnswerSelect = (qId: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
    analytics.recordSimulationClick(SIM_ID);
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    const score = QUIZ_QUESTIONS.reduce(
      (acc, q) => acc + (answers[q.id] === q.correctIndex ? 1 : 0),
      0
    );
    if (score >= 2) {
      analytics.recordSimulationCompleted(SIM_ID);
    }
  };

  const quizScore = QUIZ_QUESTIONS.reduce(
    (acc, q) => acc + (answers[q.id] === q.correctIndex ? 1 : 0),
    0
  );

  return (
    <div className="space-y-3 text-slate-800" data-testid="aluminum-extraction-lab">
      {/* Compact Header Strip */}
      <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 border border-indigo-200 rounded-xl px-3.5 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-bold">
            SP 1.5.1 • Rajah 1.37 (m.s. 48–49)
          </span>
          <span className="text-slate-700 font-medium">
            Aluminium lebih reaktif daripada karbon → diekstrak melalui{' '}
            <strong className="text-slate-900">elektrolisis leburan alumina (Al₂O₃) + kriolit (Na₃AlF₆)</strong>.
          </span>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 shadow-xs transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Set Semula
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-2">
        {[
          { id: 'simulasi', label: '1. Sel Elektrolisis & Persamaan (Rajah 1.37)' },
          { id: 'alam', label: '2. Bauksit, Enap Cemar & Kitar Semula' },
          { id: 'kuiz', label: '3. Cabaran Minda & Kuiz KSSM' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            data-testid={`tab-${tab.id}`}
            onClick={() => {
              setActiveTab(tab.id as typeof activeTab);
              analytics.recordSimulationClick(SIM_ID);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: SIMULATION + EQUATIONS SIDE-BY-SIDE */}
      {activeTab === 'simulasi' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
            {/* Left 7 cols: Clean Rajah 1.37 Cell Diagram */}
            <div className="md:col-span-7 bg-white border border-slate-200 rounded-xl p-2.5 shadow-xs flex flex-col justify-between">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
                  Susunan Sel Elektrolisis Industri (Rajah 1.37)
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      hasCryolite
                        ? 'bg-emerald-100 text-emerald-800'
                        : forceHighHeat
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    <Flame className="w-3 h-3" />
                    Suhu: {operatingTemp} °C
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      powerOn && canRunElectrolysis
                        ? 'bg-amber-100 text-amber-800'
                        : powerOn
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Zap className="w-3 h-3" />
                    {powerOn && canRunElectrolysis
                      ? 'Arus Mengalir (DC)'
                      : powerOn
                      ? 'Tiada Arus (Pepejal)'
                      : 'Suis Dimatikan'}
                  </span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden bg-[#f8fafc]">
                <AluminumCellSVG
                  hasCryolite={hasCryolite}
                  forceHighHeat={forceHighHeat}
                  isMolten={isMolten}
                  powerOn={powerOn}
                  canRunElectrolysis={canRunElectrolysis}
                  tapOpen={tapOpen}
                  anodeWearPercent={anodeWearPercent}
                  moltenAlLevel={moltenAlLevel}
                  collectedAluminum={collectedAluminum}
                  operatingTemp={operatingTemp}
                />
              </div>

              {/* Quick color key under diagram */}
              <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2 text-[10.5px] text-slate-600 px-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" /> Al³⁺ → Katod (−)
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" /> O²⁻ → Anod (+)
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-amber-700 inline-block" /> Aliran e⁻
                  </span>
                </div>
                <span className="text-slate-500 font-medium">
                  Anod karbon perlu diganti secara berkala
                </span>
              </div>
            </div>

            {/* Right 5 cols: Guided Controls & Live Readings */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-2.5">
              {/* Control Panel */}
              <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2.5">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                  <Zap className="w-3.5 h-3.5 text-indigo-600" />
                  Kawalan Sel Elektrolisis
                </h4>

                {/* Step 1: Cryolite Toggle */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-800">
                      1. Campuran Kriolit (Na₃AlF₆)
                    </span>
                    <button
                      type="button"
                      data-testid="toggle-cryolite-btn"
                      onClick={handleToggleCryolite}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition cursor-pointer ${
                        hasCryolite
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-rose-600 text-white hover:bg-rose-700'
                      }`}
                    >
                      {hasCryolite ? 'Ditambah (950 °C)' : 'Tanpa Kriolit'}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {hasCryolite
                      ? 'Kriolit menurunkan takat lebur Al₂O₃ daripada 2000 °C → ~950 °C (campuran melebur & jimat tenaga elektrik!).'
                      : forceHighHeat
                      ? 'Amaran kos melampau! Relau dipaksa pada 2000 °C untuk meleburkan Al₂O₃ tulen tanpa kriolit.'
                      : 'Al₂O₃ tulen bertakat lebur 2000 °C — masih pepejal pada 950 °C. Tambah kriolit atau panaskan ke 2000 °C.'}
                  </p>
                  {!hasCryolite && (
                    <button
                      type="button"
                      data-testid="toggle-high-heat-btn"
                      onClick={() => setForceHighHeat((v) => !v)}
                      className={`w-full py-1 px-2 rounded-md text-[11px] font-bold border transition cursor-pointer ${
                        forceHighHeat
                          ? 'bg-rose-50 border-rose-300 text-rose-800'
                          : 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
                      }`}
                    >
                      {forceHighHeat
                        ? 'Kos Tenaga Amat Tinggi (2000 °C) — Klik untuk Turun ke 950 °C'
                        : 'Panaskan Relau ke 2000 °C (Tanpa Kriolit)'}
                    </button>
                  )}
                </div>

                {/* Step 2: DC Power Toggle */}
                <button
                  type="button"
                  data-testid="toggle-dc-power"
                  onClick={handleTogglePower}
                  className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition cursor-pointer ${
                    powerOn
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  {powerOn ? 'Matikan Bekalan Kuasa DC' : '2. Hidupkan Bekalan Kuasa DC'}
                </button>

                {/* Step 3: Tap Valve & Replace Anode */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    data-testid="tap-al-btn"
                    onClick={() => {
                      setTapOpen((prev) => !prev);
                      analytics.recordSimulationClick(SIM_ID);
                    }}
                    disabled={moltenAlLevel <= 5 || !isMolten}
                    className={`py-2 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 border transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                      tapOpen
                        ? 'bg-amber-100 border-amber-300 text-amber-900'
                        : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    <Droplets className="w-3.5 h-3.5 shrink-0" />
                    <span>{tapOpen ? 'Tutup Salur' : '3. Keluarkan Al'}</span>
                  </button>

                  <button
                    type="button"
                    data-testid="replace-anode-btn"
                    onClick={handleReplaceAnode}
                    className={`py-2 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition cursor-pointer ${
                      anodeWearPercent >= 50
                        ? 'bg-amber-600 hover:bg-amber-700 text-white ring-2 ring-amber-300'
                        : 'bg-slate-800 hover:bg-slate-900 text-white'
                    }`}
                  >
                    <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                    <span>Ganti Anod</span>
                  </button>
                </div>
              </div>

              {/* Live Observations Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700">Hakisan Anod Karbon (C + O₂ → CO₂)</span>
                  <span className={anodeWearPercent >= 50 ? 'text-red-600' : 'text-slate-800'}>
                    {anodeWearPercent}% terhakis
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      anodeWearPercent >= 50 ? 'bg-red-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${anodeWearPercent}%` }}
                  />
                </div>
                {anodeWearPercent >= 50 && (
                  <p className="text-[11px] text-red-600 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    Anod semakin menipis — klik &ldquo;Ganti Anod&rdquo; apabila perlu!
                  </p>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Leburan Al di Dasar</div>
                    <div className="text-base font-extrabold text-slate-900 leading-tight">
                      {Math.round(moltenAlLevel)}%
                    </div>
                    <div className="text-[10px] text-slate-500">Lebih tumpat &amp; tenggelam</div>
                  </div>
                  <div className="p-2 bg-indigo-50/70 border border-indigo-200 rounded-lg">
                    <div className="text-[10px] font-bold text-indigo-700 uppercase">Hasil Al Dikumpul</div>
                    <div className="text-base font-extrabold text-indigo-800 leading-tight">
                      {Math.round(collectedAluminum)}%
                    </div>
                    <div className="text-[10px] text-indigo-600">Logam aluminium tulen</div>
                  </div>
                </div>

                {powerOn && !canRunElectrolysis ? (
                  <div className="p-2 bg-rose-50 border border-rose-200 rounded-lg text-[11px] text-rose-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>
                      Al₂O₃ belum melebur pada 950 °C tanpa kriolit — ion Al³⁺ &amp; O²⁻ tidak bebas bergerak!
                    </span>
                  </div>
                ) : powerOn && canRunElectrolysis ? (
                  <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg text-[11px] text-indigo-900 leading-snug">
                    <strong>Aktif:</strong> Ion O²⁻ membentuk gas O₂ di anod (menghakis karbon jadi CO₂); ion Al³⁺ diturunkan di katod membentuk leburan aluminium di dasar.
                  </div>
                ) : (
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Klik <strong>Hidupkan Bekalan Kuasa DC</strong> untuk melihat migrasi ion &amp; pembentukan Al.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Strip: Live Symbolic Half-Equations visible right on Tab 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            <div className="bg-red-50/80 border border-red-200 rounded-xl px-3 py-2">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-extrabold uppercase text-red-800">Anod (+) • Pengoksidaan</span>
                <span className="text-[10px] font-semibold text-red-700">C + O₂ → CO₂</span>
              </div>
              <div className="font-mono font-bold text-xs sm:text-sm text-red-950 mt-0.5">
                2O²⁻(ce) → O₂(g) + 4e⁻
              </div>
            </div>

            <div className="bg-blue-50/80 border border-blue-200 rounded-xl px-3 py-2">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-extrabold uppercase text-blue-800">Katod (−) • Penurunan</span>
                <span className="text-[10px] font-semibold text-blue-700">Mendak di dasar</span>
              </div>
              <div className="font-mono font-bold text-xs sm:text-sm text-blue-950 mt-0.5">
                Al³⁺(ce) + 3e⁻ → Al(ce)
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-extrabold uppercase text-indigo-300">
                  Persamaan Kimia Keseluruhan
                </span>
                <span className="text-[10px] font-semibold text-emerald-300">Tindak Balas Redoks</span>
              </div>
              <div className="font-mono font-bold text-xs sm:text-sm text-yellow-300 mt-0.5">
                2Al₂O₃(ce) → 4Al(ce) + 3O₂(g)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BAUXITE TO ALUMINIUM FLOW, RED SLUDGE & RECYCLING */}
      {activeTab === 'alam' && (
        <div className="space-y-4">
          {/* Clean 4-Step Flow Diagram from Ore to Recycled Metal */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600" />
              Aliran Proses Pengekstrakan Aluminium daripada Bauksit (KSSM m.s. 48–49)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 items-stretch">
              {[
                {
                  step: '1. Bijih Bauksit',
                  desc: 'Bijih semula jadi mengandungi aluminium oksida (Al₂O₃) bercampur bendasing.',
                  badge: 'Perlombongan',
                  style: 'bg-amber-50 border-amber-200 text-amber-900',
                },
                {
                  step: '2. Penulenan → Alumina',
                  desc: 'Menghasilkan alumina tulen (Al₂O₃) dan sisa enap cemar merah yang beralkali toksik.',
                  badge: 'Sisa Toksik',
                  style: 'bg-red-50 border-red-200 text-red-900',
                },
                {
                  step: '3. Elektrolisis Leburan',
                  desc: 'Al₂O₃ dilebur bersama kriolit (~950 °C) dalam sel karbon keluli → Al(ce) & gas O₂/CO₂.',
                  badge: 'Tenaga Tinggi',
                  style: 'bg-indigo-50 border-indigo-200 text-indigo-900',
                },
                {
                  step: '4. Kitar Semula Al',
                  desc: 'Mengitar semula tin/aluminium menjimatkan 95% tenaga dan mengurangkan pencemaran.',
                  badge: '95% Jimat',
                  style: 'bg-emerald-50 border-emerald-200 text-emerald-900',
                },
              ].map((item, idx) => (
                <div key={item.step} className={`relative p-3 rounded-xl border ${item.style} flex flex-col justify-between`}>
                  <div>
                    <span className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/80 border border-current/20 mb-1.5">
                      {item.badge}
                    </span>
                    <h5 className="font-bold text-xs sm:text-sm">{item.step}</h5>
                    <p className="text-[11px] opacity-90 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                  {idx < 3 && (
                    <ArrowRight className="hidden sm:block w-4 h-4 text-slate-400 absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-amber-200 rounded-xl p-4 shadow-xs space-y-2.5">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Kesan Pengekstrakan terhadap Alam Sekitar
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc pl-5">
                <li>
                  <strong>Enap cemar merah (red sludge):</strong> Sisa penulenan bauksit yang sangat beralkali &amp; bertoksik; kebocoran kolam takungan mencemari air dan tanah (contohnya insiden Hungary 2010, Gambar foto 1.10).
                </li>
                <li>
                  <strong>Gas karbon dioksida (CO₂):</strong> Hakisan anod karbon panas membebaskan gas rumah hijau CO₂ yang menyumbang kepada pemanasan global.
                </li>
                <li>
                  <strong>Penggunaan elektrik sangat tinggi:</strong> Membebankan penjanaan kuasa daripada bahan api fosil.
                </li>
              </ul>
            </div>

            <div className="bg-white border border-emerald-200 rounded-xl p-4 shadow-xs space-y-2.5">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Recycle className="w-4 h-4 text-emerald-600" />
                Kepentingan Mengitar Semula Aluminium
              </h4>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                <div className="text-2xl font-extrabold text-emerald-700">95% Penjimatan Tenaga</div>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Mengitar semula aluminium hanya memerlukan sekitar 5% tenaga berbanding mengekstrak daripada bijih bauksit!
                </p>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc pl-5">
                <li>Mengurangkan perlombongan bauksit dan lambakan enap cemar merah beralkali.</li>
                <li>Memelihara sumber semula jadi untuk generasi masa hadapan.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CABARAN MINDA & QUIZ */}
      {activeTab === 'kuiz' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
          {/* Left 5 cols: Key KSSM Notes & Cabaran Minda */}
          <div className="md:col-span-5 space-y-3">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-1.5 font-extrabold text-amber-900 text-xs uppercase">
                <HelpCircle className="w-4 h-4" /> Cabaran Minda (Buku Teks m.s. 49)
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                Gas karbon dioksida turut terbebas semasa proses pengekstrakan. Bagaimanakah gas CO₂ terhasil?
              </p>
              <p className="text-xs text-amber-950 leading-relaxed">
                Pada suhu ~950 °C, gas oksigen (O₂) yang terbebas di anod (+) bertindak balas secara langsung dengan anod karbon panas:
              </p>
              <div className="p-2 bg-white rounded-lg border border-amber-200 font-mono font-bold text-xs text-center text-amber-900">
                C(p) + O₂(g) → CO₂(g)
              </div>
              <p className="text-xs text-amber-900">
                Oleh sebab itu, blok anod karbon semakin menipis/terhakis dan perlu diganti dari semasa ke semasa.
              </p>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 space-y-1.5">
              <div className="font-extrabold text-indigo-900 text-xs uppercase">
                Mengapa Tidak Menggunakan Penurunan oleh Karbon?
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Dalam <strong>Siri Kereaktifan Logam</strong>, aluminium terletak di <strong>atas karbon</strong> (lebih reaktif daripada karbon). Oleh itu, karbon tidak dapat menurunkan aluminium oksida — hanya <strong>elektrolisis leburan</strong> berkesan!
              </p>
            </div>
          </div>

          {/* Right 7 cols: Quiz */}
          <div className="md:col-span-7 bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">Uji Kefahaman Pengekstrakan Aluminium</h4>
              {quizSubmitted && (
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
                  Skor: {quizScore} / {QUIZ_QUESTIONS.length}
                </span>
              )}
            </div>

            <div className="space-y-3">
              {QUIZ_QUESTIONS.map((q, qIdx) => (
                <div key={q.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <p className="text-xs sm:text-sm font-bold text-slate-900">
                    {qIdx + 1}. {q.question}
                  </p>
                  <div className="space-y-1.5">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = answers[q.id] === oIdx;
                      const isCorrect = oIdx === q.correctIndex;
                      let optionClass = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';
                      if (quizSubmitted) {
                        if (isCorrect) optionClass = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold';
                        else if (isSelected) optionClass = 'bg-red-50 border-red-400 text-red-900';
                      } else if (isSelected) {
                        optionClass = 'bg-indigo-50 border-indigo-400 text-indigo-900 font-semibold';
                      }

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleAnswerSelect(q.id, oIdx)}
                          className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition cursor-pointer flex items-center justify-between ${optionClass}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && (
                    <p className="text-[11px] text-slate-700 bg-white p-2 rounded-lg border border-slate-200">
                      <strong>Penerangan:</strong> {q.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {!quizSubmitted ? (
              <button
                type="button"
                onClick={handleSubmitQuiz}
                disabled={Object.keys(answers).length < QUIZ_QUESTIONS.length}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer disabled:cursor-not-allowed"
              >
                Semak Jawapan
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  setQuizSubmitted(false);
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer"
              >
                Cuba Semula
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
