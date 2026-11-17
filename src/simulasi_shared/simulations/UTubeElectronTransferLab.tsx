import React, { useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Droplets,
  FlaskConical,
  Power,
  RotateCcw,
  Sparkles,
  Zap,
} from 'lucide-react';
import { analytics } from '../services/analytics';
import { UTubeJohnstoneSVG } from '../components/UTubeJohnstoneSVG';

interface RedoxPair {
  id: 'feso4-br2' | 'feso4-kmno4' | 'ki-k2cr2o7';
  pillLabel: string;
  leftName: string;
  rightName: string;
  leftShort: string;
  rightShort: string;
  leftStartRgb: [number, number, number];
  leftEndRgb: [number, number, number];
  rightStartRgb: [number, number, number];
  rightEndRgb: [number, number, number];
  leftColorText: string;
  rightColorText: string;
  leftReactantIon: string;
  leftProductIon: string;
  leftHalfEq: string;
  rightReactantIon: string;
  rightProductIon: string;
  rightHalfEq: string;
  overallEq: string;
  leftConfirmTip: string;
}

const REDOX_PAIRS: RedoxPair[] = [
  {
    id: 'feso4-br2',
    pillLabel: 'FeSO₄ + Air Br₂',
    leftName: 'Larutan ferum(II) sulfat, FeSO₄',
    rightName: 'Air bromin, Br₂',
    leftShort: 'FeSO₄(ak)',
    rightShort: 'Air Br₂(ak)',
    leftStartRgb: [134, 239, 172], // pale green
    leftEndRgb: [217, 119, 6], // amber-brown Fe3+
    rightStartRgb: [180, 83, 9], // brown Br2
    rightEndRgb: [241, 245, 249], // colorless Br-
    leftColorText: 'Hijau muda → Kuning / Perang',
    rightColorText: 'Perang → Tidak berwarna',
    leftReactantIon: 'Fe²⁺',
    leftProductIon: 'Fe³⁺',
    leftHalfEq: 'Fe²⁺ → Fe³⁺ + e⁻',
    rightReactantIon: 'Br₂',
    rightProductIon: '2Br⁻',
    rightHalfEq: 'Br₂ + 2e⁻ → 2Br⁻',
    overallEq: '2Fe²⁺(ak) + Br₂(ak) → 2Fe³⁺(ak) + 2Br⁻(ak)',
    leftConfirmTip: 'Titis NaOH ke sampel Lengan Kiri untuk mengesahkan ion Fe³⁺!',
  },
  {
    id: 'feso4-kmno4',
    pillLabel: 'FeSO₄ + KMnO₄ (H⁺)',
    leftName: 'Larutan ferum(II) sulfat, FeSO₄',
    rightName: 'Larutan KMnO₄ berasid',
    leftShort: 'FeSO₄(ak)',
    rightShort: 'KMnO₄(ak) + H⁺',
    leftStartRgb: [134, 239, 172], // pale green
    leftEndRgb: [217, 119, 6], // amber-brown Fe3+
    rightStartRgb: [147, 51, 234], // deep purple MnO4-
    rightEndRgb: [241, 245, 249], // colorless Mn2+
    leftColorText: 'Hijau muda → Kuning / Perang',
    rightColorText: 'Ungu → Tidak berwarna',
    leftReactantIon: 'Fe²⁺',
    leftProductIon: 'Fe³⁺',
    leftHalfEq: 'Fe²⁺ → Fe³⁺ + e⁻',
    rightReactantIon: 'MnO₄⁻',
    rightProductIon: 'Mn²⁺',
    rightHalfEq: 'MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O',
    overallEq: 'MnO₄⁻(ak) + 5Fe²⁺(ak) + 8H⁺(ak) → Mn²⁺(ak) + 5Fe³⁺(ak) + 4H₂O(ce)',
    leftConfirmTip: 'Titis NaOH ke sampel Lengan Kiri untuk mengesahkan ion Fe³⁺!',
  },
  {
    id: 'ki-k2cr2o7',
    pillLabel: 'KI + K₂Cr₂O₇ (H⁺)',
    leftName: 'Larutan kalium iodida, KI',
    rightName: 'Larutan K₂Cr₂O₇ berasid',
    leftShort: 'KI(ak)',
    rightShort: 'K₂Cr₂O₇(ak) + H⁺',
    leftStartRgb: [241, 245, 249], // colorless I-
    leftEndRgb: [180, 83, 9], // brown I2
    rightStartRgb: [249, 115, 22], // orange Cr2O7(2-)
    rightEndRgb: [34, 197, 94], // green Cr3+
    leftColorText: 'Tidak berwarna → Perang',
    rightColorText: 'Jingga → Hijau',
    leftReactantIon: '2I⁻',
    leftProductIon: 'I₂',
    leftHalfEq: '2I⁻ → I₂ + 2e⁻',
    rightReactantIon: 'Cr₂O₇²⁻',
    rightProductIon: '2Cr³⁺',
    rightHalfEq: 'Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O',
    overallEq: 'Cr₂O₇²⁻(ak) + 6I⁻(ak) + 14H⁺(ak) → 2Cr³⁺(ak) + 3I₂(ak) + 7H₂O(ce)',
    leftConfirmTip: 'Titis Kanji / KI ke sampel Lengan Kiri untuk mengesahkan kehadiran I₂!',
  },
];

const lerpRgb = (a: [number, number, number], b: [number, number, number], t: number): string => {
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgb(${r}, ${g}, ${bl})`;
};

export const UTubeElectronTransferLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lab' | 'reference'>('lab');
  const [pairId, setPairId] = useState<RedoxPair['id']>('feso4-br2');

  // Reaction progress
  const [progress, setProgress] = useState<number>(0);
  const [isReacting, setIsReacting] = useState<boolean>(false);
  const [completedPairs, setCompletedPairs] = useState<Record<string, boolean>>({});

  // Post-reaction confirmatory dropper test
  const [sampledArm, setSampledArm] = useState<'left' | 'right' | null>(null);
  const [appliedReagent, setAppliedReagent] = useState<'naoh' | 'kanji' | null>(null);
  const [confirmedTests, setConfirmedTests] = useState<Record<string, boolean>>({});
  const [openAnswers, setOpenAnswers] = useState<Record<number, boolean>>({ 0: true });

  const rafRef = useRef<number | null>(null);
  const completedRef = useRef<boolean>(false);

  const pair = REDOX_PAIRS.find((p) => p.id === pairId) || REDOX_PAIRS[0];
  const isComplete = progress >= 1;

  useEffect(() => {
    analytics.recordSimulationView('pemindahan-elektron-tiub-u');
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (
      Object.keys(completedPairs).length >= 1 &&
      Object.keys(confirmedTests).length >= 1 &&
      !completedRef.current
    ) {
      completedRef.current = true;
      analytics.recordSimulationCompleted('pemindahan-elektron-tiub-u');
    }
  }, [completedPairs, confirmedTests]);

  const stopAnim = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const handleSelectPair = (nextId: RedoxPair['id']) => {
    if (isReacting) return;
    stopAnim();
    setPairId(nextId);
    setProgress(0);
    setSampledArm(null);
    setAppliedReagent(null);
  };

  const handleConnectCircuit = () => {
    if (isReacting || isComplete) return;

    setIsReacting(true);
    setProgress(0);
    const durationMs = 1750;
    const start = performance.now();

    const stepFrame = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      setProgress(t);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(stepFrame);
      } else {
        setIsReacting(false);
        setCompletedPairs((prev) => ({ ...prev, [pairId]: true }));
      }
    };
    rafRef.current = requestAnimationFrame(stepFrame);
  };

  const handleReset = () => {
    stopAnim();
    setIsReacting(false);
    setProgress(0);
    setSampledArm(null);
    setAppliedReagent(null);
  };

  const handleSampleArm = (arm: 'left' | 'right') => {
    if (!isComplete) return;
    setSampledArm(arm);
    setAppliedReagent(null);
  };

  const handleApplyReagent = (reagent: 'naoh' | 'kanji') => {
    if (!sampledArm) return;
    setAppliedReagent(reagent);
    if (
      (reagent === 'naoh' && sampledArm === 'left' && pairId !== 'ki-k2cr2o7') ||
      (reagent === 'kanji' && sampledArm === 'left' && pairId === 'ki-k2cr2o7')
    ) {
      setConfirmedTests((prev) => ({ ...prev, [`${pairId}-${reagent}`]: true }));
    }
  };

  // Confirmatory test visual & chemical readout
  const testResult = (() => {
    if (!sampledArm) return null;
    if (!appliedReagent) {
      return {
        liquidHex:
          sampledArm === 'left'
            ? lerpRgb(pair.leftStartRgb, pair.leftEndRgb, 1)
            : lerpRgb(pair.rightStartRgb, pair.rightEndRgb, 1),
        precipitateHex: null as string | null,
        text: `Sampel ${sampledArm === 'left' ? 'Lengan Kiri' : 'Lengan Kanan'} diambil. Klik reagen di bawah untuk menguji.`,
        positive: false,
      };
    }

    if (appliedReagent === 'naoh') {
      if (sampledArm === 'left' && (pairId === 'feso4-br2' || pairId === 'feso4-kmno4')) {
        return {
          liquidHex: '#fef3c7',
          precipitateHex: '#9a3412',
          text: 'Mendakan perang Fe(OH)₃ terbentuk! Mengesahkan pengoksidaan Fe²⁺ → Fe³⁺ telah berlaku.',
          positive: true,
        };
      }
      if (sampledArm === 'right' && pairId === 'ki-k2cr2o7') {
        return {
          liquidHex: '#dcfce7',
          precipitateHex: '#15803d',
          text: 'Mendakan hijau Cr(OH)₃ terbentuk (mengesahkan ion Cr³⁺ terhasil di lengan kanan).',
          positive: true,
        };
      }
      return {
        liquidHex:
          sampledArm === 'left'
            ? lerpRgb(pair.leftStartRgb, pair.leftEndRgb, 1)
            : lerpRgb(pair.rightStartRgb, pair.rightEndRgb, 1),
        precipitateHex: null,
        text: 'Tiada mendakan perang terbentuk (tiada ion Fe³⁺ dalam sampel ini).',
        positive: false,
      };
    }

    // Kanji / KI test
    if (sampledArm === 'left' && pairId === 'ki-k2cr2o7') {
      return {
        liquidHex: '#1e1b4b',
        precipitateHex: null,
        text: 'Larutan bertukar biru tua! Mengesahkan kehadiran iodin (I₂) daripada pengoksidaan 2I⁻ → I₂ + 2e⁻.',
        positive: true,
      };
    }
    return {
      liquidHex:
        sampledArm === 'left'
          ? lerpRgb(pair.leftStartRgb, pair.leftEndRgb, 1)
          : lerpRgb(pair.rightStartRgb, pair.rightEndRgb, 1),
      precipitateHex: null,
      text: 'Tiada perubahan warna biru tua (tiada molekul iodin I₂ bebas dalam sampel ini).',
      positive: false,
    };
  })();

  const leftColorHex = lerpRgb(pair.leftStartRgb, pair.leftEndRgb, progress);
  const rightColorHex = lerpRgb(pair.rightStartRgb, pair.rightEndRgb, progress);

  const discussionQuestions = [
    {
      q: '1. Apakah fungsi asid sulfurik cair, H₂SO₄ di bahagian bawah Tiub-U?',
      a: 'Membenarkan pemindahan ion (H⁺ dan SO₄²⁻) merentasi larutan untuk melengkapkan litar dan mengekalkan keseimbangan cas, serta mengasingkan agen pengoksidaan daripada agen penurunan supaya tiada sentuhan langsung.',
    },
    {
      q: '2. Bagaimanakah arah aliran elektron dan pesongan jarum galvanometer ditentukan?',
      a: 'Elektron mengalir melalui wayar luar daripada elektrod karbon yang dicelup ke dalam agen penurunan (terminal negatif, tempat pengoksidaan) ke elektrod karbon di dalam agen pengoksidaan (terminal positif, tempat penurunan).',
    },
    {
      q: '3. Bagaimanakah cara mengesahkan hasil tindak balas di lengan FeSO₄ dan lengan KI?',
      a: 'Tambahkan larutan NaOH kepada sampel lengan FeSO₄ → mendakan perang (Fe(OH)₃) mengesahkan ion Fe³⁺. Tambahkan larutan kanji kepada sampel lengan KI → warna biru tua mengesahkan kehadiran iodin (I₂).',
    },
    {
      q: '4. Mengapakah tindak balas ini masih merupakan tindak balas redoks walaupun bahan tidak bercampur langsung?',
      a: 'Kerana pengoksidaan (pelepasan elektron) dan penurunan (penerimaan elektron) berlaku serentak pada elektrod berasingan melalui pemindahan elektron merentasi wayar penyambung luar.',
    },
  ];

  return (
    <div className="space-y-2.5 text-slate-800">
      {/* TOP BAR */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white border border-slate-200 rounded-xl p-2 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('lab')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'lab'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            1. Tiub-U &amp; Kanta Submikroskopik
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reference')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'reference'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            2. Jadual Pasangan &amp; Perbincangan KSSM
          </button>
        </div>

        {/* Pair Selector Pills + Reset */}
        <div className="flex flex-wrap items-center gap-1.5">
          {REDOX_PAIRS.map((p) => (
            <button
              key={p.id}
              type="button"
              disabled={isReacting}
              onClick={() => handleSelectPair(p.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold border transition whitespace-nowrap shrink-0 cursor-pointer ${
                pairId === p.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {p.pillLabel}
              {completedPairs[p.id] ? ' ✓' : ''}
            </button>
          ))}
          <button
            type="button"
            onClick={handleReset}
            disabled={isReacting}
            className="px-2 py-1 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* TAB 1: JOHNSTONE SYNC + POE + DROPPER LAB TEST + LIVE REDOX TABLE */}
      {activeTab === 'lab' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
          {/* LEFT PANEL: Circuit Switch + Dropper Confirmatory Lab */}
          <div className="md:col-span-4 space-y-2.5">
            {/* Circuit Switch & Reaction Control */}
            <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-xs space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-extrabold text-slate-800">
                  1. Kawalan Suis Litar
                </span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    isComplete
                      ? 'bg-emerald-100 text-emerald-800'
                      : isReacting
                      ? 'bg-sky-100 text-sky-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isComplete ? 'Litar Lengkap ✓' : isReacting ? 'Mengalir e⁻...' : 'Suis Terbuka'}
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-[10.5px] text-slate-700 space-y-1">
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500 font-semibold">Lengan Kiri (-):</span>
                  <span className="font-bold text-teal-800 text-right">{pair.leftShort}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500 font-semibold">Lengan Kanan (+):</span>
                  <span className="font-bold text-amber-800 text-right">{pair.rightShort}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleConnectCircuit}
                disabled={isReacting || isComplete}
                className={`w-full py-2 px-3 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition ${
                  isComplete
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-default'
                    : isReacting
                    ? 'bg-sky-100 text-sky-800 border border-sky-300 cursor-wait'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer'
                }`}
              >
                {isComplete ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Tindak Balas Selesai (100%)</span>
                  </>
                ) : (
                  <>
                    <Power className="w-3.5 h-3.5" />
                    <span>{isReacting ? 'Menjalankan Pemindahan e⁻...' : 'Sambung Suis Litar'}</span>
                  </>
                )}
              </button>

              {isComplete && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-2 text-[10px] text-emerald-900 leading-snug">
                  Elektron mengalir melalui wayar luar dari <strong>Lengan Kiri (-)</strong> ke <strong>Lengan Kanan (+)</strong>; jarum galvanometer G terpesong ke kanan.
                </div>
              )}
            </div>

            {/* Post-Reaction Confirmatory Lab Test (Penitis) */}
            <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-xs space-y-2">
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-cyan-600" />
                  2. Uji Larutan Hasil (Penitis)
                </span>
              </div>

              {!isComplete ? (
                <div className="bg-slate-50 border border-dashed border-slate-300 rounded-lg p-3 text-center text-[10.5px] text-slate-500">
                  Sambungkan litar dahulu sehingga tindak balas selesai (100%) untuk mengambil sampel penitis.
                </div>
              ) : (
                <div className="space-y-2">
                  {/* Sample arm buttons */}
                  <div className="grid grid-cols-2 gap-1.5 text-[10.5px]">
                    <button
                      type="button"
                      onClick={() => handleSampleArm('left')}
                      className={`py-1.5 px-2 rounded-lg border font-extrabold flex items-center justify-center gap-1 cursor-pointer transition ${
                        sampledArm === 'left'
                          ? 'bg-cyan-600 text-white border-cyan-700'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <FlaskConical className="w-3 h-3" />
                      Ambil Lengan Kiri
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSampleArm('right')}
                      className={`py-1.5 px-2 rounded-lg border font-extrabold flex items-center justify-center gap-1 cursor-pointer transition ${
                        sampledArm === 'right'
                          ? 'bg-cyan-600 text-white border-cyan-700'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <FlaskConical className="w-3 h-3" />
                      Ambil Lengan Kanan
                    </button>
                  </div>

                  {/* Reagent drop buttons */}
                  <div className="grid grid-cols-2 gap-1.5 text-[10.5px]">
                    <button
                      type="button"
                      disabled={!sampledArm}
                      onClick={() => handleApplyReagent('naoh')}
                      className={`py-1.5 px-2 rounded-lg border font-extrabold transition ${
                        !sampledArm
                          ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                          : appliedReagent === 'naoh'
                          ? 'bg-amber-600 text-white border-amber-700 cursor-pointer'
                          : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200 cursor-pointer'
                      }`}
                    >
                      Titis NaOH(ak)
                    </button>
                    <button
                      type="button"
                      disabled={!sampledArm}
                      onClick={() => handleApplyReagent('kanji')}
                      className={`py-1.5 px-2 rounded-lg border font-extrabold transition ${
                        !sampledArm
                          ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                          : appliedReagent === 'kanji'
                          ? 'bg-indigo-600 text-white border-indigo-700 cursor-pointer'
                          : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border-indigo-200 cursor-pointer'
                      }`}
                    >
                      Titis Kanji / KI
                    </button>
                  </div>

                  {/* Test Tube Swatch + Observation */}
                  {testResult ? (
                    <div
                      className={`rounded-lg border p-2 flex items-center gap-2.5 text-[10px] leading-snug ${
                        testResult.positive
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {/* Mini SVG test tube showing sampled liquid + precipitate */}
                      <svg viewBox="0 0 26 42" className="w-6 h-10 shrink-0">
                        <path
                          d="M 6 16 L 6 33 Q 6 39 13 39 Q 20 39 20 33 L 20 16 Z"
                          fill={testResult.liquidHex}
                        />
                        {testResult.precipitateHex && (
                          <path
                            d="M 8 36 Q 13 31 18 36 Z"
                            fill={testResult.precipitateHex}
                          />
                        )}
                        <path
                          d="M 5 4 L 5 33 Q 5 40 13 40 Q 21 40 21 33 L 21 4"
                          fill="none"
                          stroke="#475569"
                          strokeWidth="1.4"
                        />
                      </svg>
                      <p>{testResult.text}</p>
                    </div>
                  ) : (
                    <div className="bg-sky-50 border border-sky-200 rounded-lg p-2 text-[10px] text-sky-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 shrink-0 text-sky-600" />
                      <span>{pair.leftConfirmTip}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: Johnstone Sync SVG + Dynamic Redox Comparison Table */}
          <div className="md:col-span-8 space-y-2.5">
            {/* Johnstone Dual-Level SVG */}
            <div className="bg-white border border-slate-200 rounded-xl p-2 shadow-xs">
              <div className="bg-slate-50/80 border border-dashed border-slate-300 rounded-lg p-1">
                <UTubeJohnstoneSVG
                  leftShortLabel={pair.leftShort}
                  rightShortLabel={pair.rightShort}
                  leftColorHex={leftColorHex}
                  rightColorHex={rightColorHex}
                  leftReactantIon={pair.leftReactantIon}
                  leftProductIon={pair.leftProductIon}
                  leftHalfEq={pair.leftHalfEq}
                  rightReactantIon={pair.rightReactantIon}
                  rightProductIon={pair.rightProductIon}
                  rightHalfEq={pair.rightHalfEq}
                  progress={progress}
                  isReacting={isReacting}
                  sampledArm={sampledArm}
                />
              </div>
            </div>

            {/* Dynamic Redox Analysis Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <div className="bg-slate-800 text-white px-3 py-1.5 flex items-center justify-between gap-2 text-xs font-extrabold">
                <span>Jadual Analisis Redoks Automatik ({pair.pillLabel})</span>
                <span className="font-mono text-[10.5px] text-sky-300">
                  {progress > 0 ? pair.overallEq : 'Sambungkan litar untuk mengisi analisis'}
                </span>
              </div>

              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="text-left px-2.5 py-1 font-extrabold w-1/4">Aspek</th>
                    <th className="text-left px-2.5 py-1 font-extrabold text-teal-800">
                      Lengan Kiri · Terminal (-)
                    </th>
                    <th className="text-left px-2.5 py-1 font-extrabold text-amber-800">
                      Lengan Kanan · Terminal (+)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="px-2.5 py-1 font-bold text-slate-600">Peranan &amp; Proses</td>
                    <td className="px-2.5 py-1 font-semibold">
                      {progress > 0.15
                        ? 'Agen Penurunan (Mengalami Pengoksidaan)'
                        : '—'}
                    </td>
                    <td className="px-2.5 py-1 font-semibold">
                      {progress > 0.15
                        ? 'Agen Pengoksidaan (Mengalami Penurunan)'
                        : '—'}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-2.5 py-1 font-bold text-slate-600">Perubahan Warna</td>
                    <td className="px-2.5 py-1">
                      {progress > 0.45 ? pair.leftColorText : '—'}
                    </td>
                    <td className="px-2.5 py-1">
                      {progress > 0.45 ? pair.rightColorText : '—'}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2.5 py-1 font-bold text-slate-600">Setengah Persamaan</td>
                    <td className="px-2.5 py-1 font-mono font-bold text-teal-800">
                      {progress >= 0.85 ? pair.leftHalfEq : '—'}
                    </td>
                    <td className="px-2.5 py-1 font-mono font-bold text-amber-800">
                      {progress >= 0.85 ? pair.rightHalfEq : '—'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REFERENCE TABLE & KSSM DISCUSSION */}
      {activeTab === 'reference' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
          {/* Left: Comparison Summary of All 3 Pairs */}
          <div className="md:col-span-7 bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2">
            <h3 className="text-xs font-extrabold text-slate-800">
              Ringkasan Pasangan Agen Penurunan &amp; Agen Pengoksidaan (Tiub-U)
            </h3>

            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="text-left px-2 py-1.5 font-extrabold">Pasangan Reagen</th>
                    <th className="text-left px-2 py-1.5 font-extrabold">Lengan Kiri (Pengoksidaan)</th>
                    <th className="text-left px-2 py-1.5 font-extrabold">Lengan Kanan (Penurunan)</th>
                  </tr>
                </thead>
                <tbody>
                  {REDOX_PAIRS.map((p) => (
                    <tr key={p.id} className="border-b border-slate-100 last:border-b-0">
                      <td className="px-2 py-1.5 font-extrabold text-slate-900 whitespace-nowrap">
                        {p.pillLabel}
                      </td>
                      <td className="px-2 py-1.5">
                        <div className="font-mono font-bold text-teal-800">{p.leftHalfEq}</div>
                        <div className="text-[10px] text-slate-500">{p.leftColorText}</div>
                      </td>
                      <td className="px-2 py-1.5">
                        <div className="font-mono font-bold text-amber-800">{p.rightHalfEq}</div>
                        <div className="text-[10px] text-slate-500">{p.rightColorText}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 text-[11px] text-blue-950 leading-snug">
              <strong>Prinsip Tiub-U:</strong> Elektron sentiasa mengalir di litar luar dari elektrod yang dicelup dalam <strong>agen penurunan (-)</strong> menuju ke elektrod di dalam <strong>agen pengoksidaan (+)</strong>, manakala ion <span className="font-mono">H⁺</span> dan <span className="font-mono">SO₄²⁻</span> melengkapkan litar dalaman.
            </div>
          </div>

          {/* Right: KSSM Discussion Q&A */}
          <div className="md:col-span-5 bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-extrabold text-slate-800">
                Perbincangan Amali Redoks KSSM (SP 1.1.1)
              </h3>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                Klik soalan
              </span>
            </div>

            <div className="space-y-1.5">
              {discussionQuestions.map((item, idx) => {
                const isOpen = !!openAnswers[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      setOpenAnswers((prev) => ({ ...prev, [idx]: !prev[idx] }))
                    }
                    className="w-full text-left rounded-lg border border-slate-200 hover:border-indigo-300 bg-slate-50/70 p-2.5 transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2 text-[11px] font-extrabold text-slate-800">
                      <span>{item.q}</span>
                      <span className="text-[10px] text-indigo-600 shrink-0">
                        {isOpen ? 'Tutup' : 'Jawapan'}
                      </span>
                    </div>
                    {isOpen && (
                      <p className="mt-1.5 pt-1.5 border-t border-slate-200 text-[10.5px] text-slate-700 leading-relaxed">
                        {item.a}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UTubeElectronTransferLab;
