import React, { useState, useMemo } from 'react';
import { analytics } from '../services/analytics';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Shuffle,
  BookOpen,
  Table2,
  FlaskConical,
  GripVertical,
} from 'lucide-react';

type GasId = 'o2' | 'h2' | 'co2' | 'nh3' | 'cl2' | 'hcl' | 'so2' | 'no2';
type ReagentId =
  | 'glowing-splinter'
  | 'lighted-splinter'
  | 'limewater'
  | 'red-litmus'
  | 'blue-litmus'
  | 'nh3-rod'
  | 'kmno4';

type LabMode = 'mystery' | 'learn' | 'table';

interface GasSpec {
  id: GasId;
  code: string;
  name: string;
  formula: string;
  appearance: string;
  tintColor: string;
  tintOpacity: number;
  preparation: string;
  primaryReagent: ReagentId;
  textbookMethod: string;
  positiveObservation: string;
  spmEquation: string;
}

interface ReagentSpec {
  id: ReagentId;
  name: string;
  shortName: string;
  badgeColor: string;
  emoji: string;
}

interface TestedLog {
  reagentId: ReagentId;
  observation: string;
  isPositive: boolean;
}

const SIM_ID = 'ujian-gas';

const GASES: GasSpec[] = [
  {
    id: 'o2',
    code: 'A',
    name: 'Gas oksigen',
    formula: 'O₂',
    appearance: 'Gas tidak berwarna',
    tintColor: '#e0f2fe',
    tintOpacity: 0.12,
    preparation: 'Panaskan dua spatula pepejal kalium klorat(V), KClO₃ dengan kuat.',
    primaryReagent: 'glowing-splinter',
    textbookMethod: 'Masukkan sebatang kayu uji berbara ke dalam tabung uji.',
    positiveObservation: 'Kayu uji berbara menyala semula dengan nyalaan terang.',
    spmEquation: '2KClO₃(p) → 2KCl(p) + 3O₂(g)',
  },
  {
    id: 'h2',
    code: 'B',
    name: 'Gas hidrogen',
    formula: 'H₂',
    appearance: 'Gas tidak berwarna',
    tintColor: '#e0f2fe',
    tintOpacity: 0.12,
    preparation: 'Ketulan zink, Zn + 4.0 cm³ asid sulfurik, H₂SO₄ cair.',
    primaryReagent: 'lighted-splinter',
    textbookMethod: 'Dekatkan sebatang kayu uji bernyala ke mulut tabung uji.',
    positiveObservation: "Bunyi 'pop' terhasil dan nyalaan kayu uji terpadam.",
    spmEquation: 'Zn(p) + H₂SO₄(ak) → ZnSO₄(ak) + H₂(g)',
  },
  {
    id: 'co2',
    code: 'C',
    name: 'Gas karbon dioksida',
    formula: 'CO₂',
    appearance: 'Gas tidak berwarna',
    tintColor: '#e0f2fe',
    tintOpacity: 0.12,
    preparation: 'Panaskan satu spatula pepejal zink karbonat, ZnCO₃ dengan kuat.',
    primaryReagent: 'limewater',
    textbookMethod: 'Salurkan gas yang terhasil ke dalam air kapur.',
    positiveObservation: 'Air kapur menjadi keruh (mendakan putih CaCO₃ terbentuk).',
    spmEquation: 'CO₂(g) + Ca(OH)₂(ak) → CaCO₃(p) + H₂O(ce)',
  },
  {
    id: 'nh3',
    code: 'D',
    name: 'Gas ammonia',
    formula: 'NH₃',
    appearance: 'Gas tidak berwarna (bau sengit)',
    tintColor: '#e0f2fe',
    tintOpacity: 0.12,
    preparation: 'Panaskan pepejal NH₄Cl bersama 4.0 cm³ larutan NaOH cair dengan cermat.',
    primaryReagent: 'red-litmus',
    textbookMethod: 'Dekatkan sehelai kertas litmus merah lembap ke mulut tabung uji.',
    positiveObservation: 'Kertas litmus merah lembap bertukar kepada biru (sifat beralkali).',
    spmEquation: 'NH₄Cl(p) + NaOH(ak) → NaCl(ak) + NH₃(g) + H₂O(ce)',
  },
  {
    id: 'cl2',
    code: 'E',
    name: 'Gas klorin',
    formula: 'Cl₂',
    appearance: 'Gas berwarna kuning kehijauan',
    tintColor: '#bef264',
    tintOpacity: 0.48,
    preparation: 'Serbuk mangan(IV) oksida, MnO₂ + 2.0 cm³ asid hidroklorik, HCl pekat (panas perlahan).',
    primaryReagent: 'blue-litmus',
    textbookMethod: 'Dekatkan sehelai kertas litmus biru lembap ke mulut tabung uji.',
    positiveObservation: 'Kertas litmus biru lembap bertukar merah dan kemudian dilunturkan menjadi putih.',
    spmEquation: 'Cl₂(g) + H₂O(ce) → HCl(ak) + HOCl(ak) [agen peluntur]',
  },
  {
    id: 'hcl',
    code: 'F',
    name: 'Gas hidrogen klorida',
    formula: 'HCl',
    appearance: 'Gas tidak berwarna (bau tajam)',
    tintColor: '#e0f2fe',
    tintOpacity: 0.15,
    preparation: 'Pepejal natrium klorida, NaCl + 2.0 cm³ asid sulfurik, H₂SO₄ pekat (panas perlahan).',
    primaryReagent: 'nh3-rod',
    textbookMethod: 'Dekatkan rod kaca dicelupkan ke dalam larutan ammonia, NH₃ pekat ke mulut tabung uji.',
    positiveObservation: 'Wasap putih yang tebal terbentuk (pepejal halus ammonium klorida, NH₄Cl).',
    spmEquation: 'HCl(g) + NH₃(g) → NH₄Cl(p) [wasap putih]',
  },
  {
    id: 'so2',
    code: 'G',
    name: 'Gas sulfur dioksida',
    formula: 'SO₂',
    appearance: 'Gas tidak berwarna (bau sengit)',
    tintColor: '#e0f2fe',
    tintOpacity: 0.14,
    preparation: 'Natrium sulfit, Na₂SO₃ + 4.0 cm³ asid hidroklorik, HCl cair (panas perlahan).',
    primaryReagent: 'kmno4',
    textbookMethod: 'Salurkan gas ke dalam larutan kalium manganat(VII) berasid, KMnO₄ (atau K₂Cr₂O₇ berasid).',
    positiveObservation: 'Warna ungu larutan kalium manganat(VII) berasid dinyahwarnakan menjadi tidak berwarna.',
    spmEquation: 'SO₂ menurunkan MnO₄⁻ (ungu) → Mn²⁺ (tidak berwarna)',
  },
  {
    id: 'no2',
    code: 'H',
    name: 'Gas nitrogen dioksida',
    formula: 'NO₂',
    appearance: 'Gas berwarna perang (bau sengit)',
    tintColor: '#b45309',
    tintOpacity: 0.45,
    preparation: 'Panaskan satu spatula pepejal plumbum(II) nitrat, Pb(NO₃)₂ dengan kuat.',
    primaryReagent: 'blue-litmus',
    textbookMethod: 'Dekatkan sehelai kertas litmus biru lembap ke mulut tabung uji.',
    positiveObservation: 'Gas berwarna perang terbebas dan kertas litmus biru lembap bertukar kepada merah (tidak luntur).',
    spmEquation: '2Pb(NO₃)₂(p) → 2PbO(p) + 4NO₂(g) + O₂(g)',
  },
];

const REAGENTS: ReagentSpec[] = [
  { id: 'glowing-splinter', name: 'Kayu uji berbara', shortName: 'Kayu berbara', badgeColor: 'bg-amber-50 border-amber-300 text-amber-900', emoji: '🥢' },
  { id: 'lighted-splinter', name: 'Kayu uji bernyala', shortName: 'Kayu bernyala', badgeColor: 'bg-orange-50 border-orange-300 text-orange-900', emoji: '🔥' },
  { id: 'limewater', name: 'Air kapur, Ca(OH)₂', shortName: 'Air kapur', badgeColor: 'bg-sky-50 border-sky-300 text-sky-900', emoji: '🧪' },
  { id: 'red-litmus', name: 'Kertas litmus merah lembap', shortName: 'Litmus merah', badgeColor: 'bg-rose-50 border-rose-300 text-rose-900', emoji: '🟥' },
  { id: 'blue-litmus', name: 'Kertas litmus biru lembap', shortName: 'Litmus biru', badgeColor: 'bg-blue-50 border-blue-300 text-blue-900', emoji: '🟦' },
  { id: 'nh3-rod', name: 'Rod kaca + NH₃ pekat', shortName: 'Rod + NH₃ pekat', badgeColor: 'bg-slate-100 border-slate-300 text-slate-900', emoji: '🧴' },
  { id: 'kmno4', name: 'Larutan KMnO₄ berasid', shortName: 'KMnO₄ berasid', badgeColor: 'bg-purple-50 border-purple-300 text-purple-900', emoji: '⚗️' },
];

const GAS_BY_ID: Record<GasId, GasSpec> = GASES.reduce((acc, g) => {
  acc[g.id] = g;
  return acc;
}, {} as Record<GasId, GasSpec>);

const getTestOutcome = (gasId: GasId, reagentId: ReagentId): { observation: string; isPositive: boolean } => {
  const gas = GAS_BY_ID[gasId];
  if (gas.primaryReagent === reagentId) {
    return { observation: gas.positiveObservation, isPositive: true };
  }

  switch (reagentId) {
    case 'glowing-splinter':
      return {
        observation:
          gasId === 'h2'
            ? 'Tiada nyalaan semula; kayu uji berbara padam.'
            : 'Tiada perubahan. Kayu uji berbara tidak menyala semula.',
        isPositive: false,
      };
    case 'lighted-splinter':
      return {
        observation:
          gasId === 'o2'
            ? 'Nyalaan kayu uji menjadi lebih terang (tiada bunyi pop).'
            : 'Nyalaan kayu uji terpadam tanpa bunyi "pop".',
        isPositive: false,
      };
    case 'limewater':
      return {
        observation:
          gasId === 'so2'
            ? 'Tiada pengesahan karbonat; untuk membezakan SO₂ dan CO₂, alirkan ke dalam larutan KMnO₄ berasid.'
            : 'Tiada perubahan. Air kapur kekal jernih (bukan gas CO₂).',
        isPositive: false,
      };
    case 'red-litmus':
      if (gasId === 'cl2') {
        return {
          observation: 'Kertas litmus merah lembap dilunturkan menjadi putih.',
          isPositive: true,
        };
      }
      return {
        observation: 'Tiada perubahan. Kertas litmus lembap kekal merah (bukan gas beralkali).',
        isPositive: false,
      };
    case 'blue-litmus':
      if (gasId === 'hcl' || gasId === 'so2' || gasId === 'co2') {
        return {
          observation: 'Kertas litmus biru lembap bertukar kepada merah (gas berasid, tetapi tidak meluntur).',
          isPositive: false,
        };
      }
      return {
        observation: 'Tiada perubahan. Kertas litmus lembap kekal biru.',
        isPositive: false,
      };
    case 'nh3-rod':
      return {
        observation: 'Tiada wasap putih tebal NH₄Cl terbentuk pada mulut tabung uji.',
        isPositive: false,
      };
    case 'kmno4':
      return {
        observation: 'Tiada perubahan. Warna ungu larutan KMnO₄ berasid kekal tidak berubah.',
        isPositive: false,
      };
  }
};

const shuffleGasOrder = (): GasId[] => {
  const arr: GasId[] = ['o2', 'h2', 'co2', 'nh3', 'cl2', 'hcl', 'so2', 'no2'];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const GasTestLab: React.FC = () => {
  const [mode, setMode] = useState<LabMode>('mystery');
  const [mysteryOrder, setMysteryOrder] = useState<GasId[]>(() => shuffleGasOrder());
  const [mysteryIdx, setMysteryIdx] = useState<number>(0);
  const [solvedSamples, setSolvedSamples] = useState<Record<number, boolean>>({});

  const [learnGasId, setLearnGasId] = useState<GasId>('o2');
  const [activeReagent, setActiveReagent] = useState<ReagentId | null>(null);
  const [testLogs, setTestLogs] = useState<Record<string, TestedLog[]>>({});
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Mystery guess UI
  const [selectedGuess, setSelectedGuess] = useState<GasId | null>(null);
  const [guessStatus, setGuessStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const currentGasId: GasId = mode === 'learn' ? learnGasId : mysteryOrder[mysteryIdx];
  const currentGas = GAS_BY_ID[currentGasId];
  const sampleKey = mode === 'learn' ? `learn-${learnGasId}` : `mystery-${mysteryIdx}`;
  const currentLogs = testLogs[sampleKey] || [];
  const latestOutcome = activeReagent ? getTestOutcome(currentGasId, activeReagent) : null;

  const solvedCount = useMemo(
    () => Object.values(solvedSamples).filter(Boolean).length,
    [solvedSamples]
  );

  const runReagentTest = (reagentId: ReagentId) => {
    analytics.recordSimulationClick(SIM_ID, 1);
    setActiveReagent(reagentId);
    const outcome = getTestOutcome(currentGasId, reagentId);
    setTestLogs((prev) => {
      const existing = prev[sampleKey] || [];
      if (existing.some((l) => l.reagentId === reagentId)) return prev;
      return {
        ...prev,
        [sampleKey]: [{ reagentId, ...outcome }, ...existing],
      };
    });
    if (mode === 'learn' && outcome.isPositive) {
      analytics.recordSimulationCompleted(SIM_ID);
    }
  };

  const handleSelectMystery = (idx: number) => {
    setMysteryIdx(idx);
    setActiveReagent(null);
    setSelectedGuess(null);
    setGuessStatus(solvedSamples[idx] ? 'correct' : 'idle');
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  const handleShuffleMysteries = () => {
    setMysteryOrder(shuffleGasOrder());
    setMysteryIdx(0);
    setSolvedSamples({});
    setTestLogs({});
    setActiveReagent(null);
    setSelectedGuess(null);
    setGuessStatus('idle');
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  const handleVerifyGuess = () => {
    if (!selectedGuess) return;
    analytics.recordSimulationClick(SIM_ID, 1);
    if (selectedGuess === currentGasId) {
      setGuessStatus('correct');
      setSolvedSamples((prev) => ({ ...prev, [mysteryIdx]: true }));
      analytics.recordSimulationCompleted(SIM_ID);
      confetti({ particleCount: 65, spread: 55, origin: { y: 0.65 } });
    } else {
      setGuessStatus('wrong');
    }
  };

  const handleDropOnTube = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const reagentId = e.dataTransfer.getData('text/plain') as ReagentId;
    if (reagentId && REAGENTS.some((r) => r.id === reagentId)) {
      runReagentTest(reagentId);
    }
  };

  return (
    <div className="space-y-3 text-slate-800">
      {/* Compact Top Control Bar */}
      <div className="bg-gradient-to-r from-cyan-50 via-sky-50 to-indigo-50 border border-cyan-200 rounded-xl px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2">
        {/* Mode Switch */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => {
              setMode('mystery');
              setActiveReagent(null);
              setGuessStatus(solvedSamples[mysteryIdx] ? 'correct' : 'idle');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              mode === 'mystery' ? 'bg-cyan-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            Uji Gas Misteri (Drag &amp; Drop)
          </button>
          <button
            onClick={() => {
              setMode('learn');
              setActiveReagent(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              mode === 'learn' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Mod Belajar (8 Gas)
          </button>
          <button
            onClick={() => setMode('table')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              mode === 'table' ? 'bg-slate-800 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Table2 className="w-3.5 h-3.5" />
            Jadual 6.9 Lengkap
          </button>
        </div>

        {/* Right Sample Selector Strip */}
        {mode === 'mystery' && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-cyan-900 mr-1">
              Selesai: {solvedCount}/8
            </span>
            {mysteryOrder.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectMystery(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-bold border transition cursor-pointer relative ${
                  mysteryIdx === idx
                    ? 'bg-cyan-600 border-cyan-700 text-white shadow-xs'
                    : solvedSamples[idx]
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
                title={`Sampel Gas Misteri #${idx + 1}`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={handleShuffleMysteries}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
              title="Acak semula semua 8 sampel misteri"
            >
              <Shuffle className="w-3 h-3" />
              Acak
            </button>
          </div>
        )}

        {mode === 'learn' && (
          <div className="flex flex-wrap items-center gap-1">
            {GASES.map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  setLearnGasId(g.id);
                  setActiveReagent(null);
                }}
                className={`px-2 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                  learnGasId === g.id
                    ? 'bg-indigo-600 border-indigo-700 text-white'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {g.formula}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* MODE TABLE: Jadual 6.9 Complete 8 Gases (compact view, fits without deep scroll) */}
      {mode === 'table' ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm overflow-x-auto">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-slate-900 text-sm">
              Jadual 6.8 &amp; 6.9: Ringkasan Ujian Pengesahan 8 Gas (Buku Teks T4 m.s. 191–193)
            </h4>
            <span className="text-[11px] text-slate-500 font-semibold">SP 6.10.1</span>
          </div>
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="p-2 rounded-tl-lg">Gas</th>
                <th className="p-2">Sifat Fizikal</th>
                <th className="p-2">Kaedah Ujian Kimia</th>
                <th className="p-2 rounded-tr-lg">Pemerhatian Positif</th>
              </tr>
            </thead>
            <tbody>
              {GASES.map((g, i) => (
                <tr key={g.id} className={i % 2 === 0 ? 'bg-white border-b border-slate-100' : 'bg-slate-50 border-b border-slate-100'}>
                  <td className="p-2 font-bold text-slate-900 whitespace-nowrap">
                    {g.name} ({g.formula})
                  </td>
                  <td className="p-2 text-slate-600">{g.appearance}</td>
                  <td className="p-2 text-slate-700">{g.textbookMethod}</td>
                  <td className="p-2 font-semibold text-emerald-800">{g.positiveObservation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* MAIN SINGLE-SCREEN WORKBENCH */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* LEFT 6 COLS: Drag & Drop Virtual Bench + Reagent Tray */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between space-y-2.5">
            {/* Drop Zone SVG Apparatus */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDropOnTube}
              className={`relative rounded-xl border-2 transition-all overflow-hidden flex flex-col items-center justify-center p-2 ${
                isDragOver
                  ? 'border-cyan-500 bg-cyan-50/70 ring-2 ring-cyan-200 border-dashed'
                  : 'border-slate-200 bg-slate-50 border-dashed'
              }`}
            >
              <div className="w-full flex items-center justify-between px-2 pt-0.5 text-[11px] font-bold">
                <span className="text-slate-600">
                  {mode === 'mystery'
                    ? `Tabung Uji Misteri #${mysteryIdx + 1} (${solvedSamples[mysteryIdx] ? `${currentGas.name}, ${currentGas.formula}` : currentGas.appearance})`
                    : `${currentGas.code}: ${currentGas.name} (${currentGas.formula})`}
                </span>
                <span className="text-cyan-700">
                  {isDragOver ? 'Lepaskan alat ujian di sini!' : 'Zon Uji (Heret & Lepas)'}
                </span>
              </div>

              <svg viewBox="0 0 460 225" className="w-full max-h-[225px] h-auto select-none">
                {/* Lab Bench */}
                <rect x="20" y="206" width="420" height="10" rx="3" fill="#cbd5e1" />

                {/* Test Tube Stand Clamp / Rack Base */}
                <rect x="130" y="196" width="84" height="10" rx="2" fill="#64748b" />
                <rect x="145" y="138" width="54" height="8" rx="2" fill="#94a3b8" />

                {/* MAIN SAMPLE TEST TUBE (Tabung Uji Gas) */}
                <g>
                  {/* Gas cloud inside tube (colorless or Cl2 yellow-green or NO2 brown) */}
                  <path
                    d="M 157 74 L 157 176 Q 157 195 172 195 Q 187 195 187 176 L 187 74 Z"
                    fill={currentGas.tintColor}
                    fillOpacity={currentGas.tintOpacity}
                  />
                  {/* Subtle animated gas drift dots */}
                  <circle cx="167" cy="115" r="2.2" fill={currentGas.id === 'no2' ? '#92400e' : currentGas.id === 'cl2' ? '#65a30d' : '#94a3b8'} opacity="0.55">
                    <animate attributeName="cy" values="145;92;145" dur="2.6s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="177" cy="135" r="2" fill={currentGas.id === 'no2' ? '#92400e' : currentGas.id === 'cl2' ? '#65a30d' : '#94a3b8'} opacity="0.55">
                    <animate attributeName="cy" values="165;105;165" dur="2.1s" repeatCount="indefinite" />
                  </circle>

                  {/* Tube Glass Outline */}
                  <path
                    d="M 154 72 L 154 176 Q 154 198 172 198 Q 190 198 190 176 L 190 72"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="2.4"
                  />
                  {/* Rim */}
                  <ellipse cx="172" cy="72" rx="20" ry="3.5" fill="#f8fafc" stroke="#334155" strokeWidth="2" />

                  {/* Unknown Label Tag on Tube */}
                  <rect x="159" y="152" width="26" height="18" rx="4" fill="#ffffff" fillOpacity="0.88" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="172" y="164" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#0f172a">
                    {mode === 'mystery' && !solvedSamples[mysteryIdx] ? `?${mysteryIdx + 1}` : currentGas.formula}
                  </text>
                </g>

                {/* ACTIVE REAGENT ANIMATIONS IN TUBE */}
                {activeReagent === 'glowing-splinter' && (
                  <g>
                    {/* Wooden Splinter lowered into tube */}
                    <line x1="205" y1="22" x2="172" y2="122" stroke="#92400e" strokeWidth="4.5" strokeLinecap="round" />
                    {/* Tip: bright orange-yellow flame for O2, tiny red ember otherwise */}
                    {currentGasId === 'o2' ? (
                      <g>
                        <path d="M 172 122 Q 160 100 172 86 Q 184 100 172 122 Z" fill="#f97316" />
                        <path d="M 172 120 Q 166 107 172 96 Q 178 107 172 120 Z" fill="#fde047" />
                        <text x="224" y="42" fill="#c2410c" fontSize="11" fontWeight="bold">Menyala semula!</text>
                      </g>
                    ) : (
                      <circle cx="172" cy="122" r="3" fill={currentGasId === 'h2' || currentGasId === 'co2' ? '#475569' : '#ea580c'} />
                    )}
                  </g>
                )}

                {activeReagent === 'lighted-splinter' && (
                  <g>
                    {/* Lighted splinter held at mouth of tube */}
                    <line x1="222" y1="26" x2="176" y2="66" stroke="#92400e" strokeWidth="4.5" strokeLinecap="round" />
                    {currentGasId === 'h2' ? (
                      <g>
                        <circle cx="172" cy="66" r="18" fill="#fde047" fillOpacity="0.65" stroke="#ef4444" strokeWidth="2" />
                        <text x="172" y="61" textAnchor="middle" fill="#b91c1c" fontSize="12" fontWeight="bold">POP!</text>
                      </g>
                    ) : (
                      <path
                        d={currentGasId === 'o2' ? 'M 176 66 Q 165 40 176 26 Q 187 40 176 66 Z' : 'M 176 66 Q 171 54 176 48 Q 181 54 176 66 Z'}
                        fill="#f59e0b"
                        opacity={currentGasId === 'co2' || currentGasId === 'so2' || currentGasId === 'cl2' ? 0.25 : 0.95}
                      />
                    )}
                  </g>
                )}

                {(activeReagent === 'red-litmus' || activeReagent === 'blue-litmus') && (
                  <g>
                    {/* Litmus paper strip held at mouth of tube */}
                    {(() => {
                      const isRed = activeReagent === 'red-litmus';
                      let paperColor = isRed ? '#ef4444' : '#3b82f6';
                      let tipLabel = isRed ? 'Kekal merah' : 'Kekal biru';

                      if (isRed) {
                        if (currentGasId === 'nh3') {
                          paperColor = '#2563eb';
                          tipLabel = 'Merah → Biru';
                        } else if (currentGasId === 'cl2') {
                          paperColor = '#f8fafc';
                          tipLabel = 'Dilunturkan (Putih)';
                        }
                      } else {
                        if (currentGasId === 'cl2') {
                          paperColor = '#f8fafc';
                          tipLabel = 'Biru → Merah → Putih';
                        } else if (['no2', 'hcl', 'so2', 'co2'].includes(currentGasId)) {
                          paperColor = '#ef4444';
                          tipLabel = 'Biru → Merah';
                        }
                      }
                      return (
                        <g>
                          <rect x="166" y="42" width="12" height="54" rx="2" fill={paperColor} stroke="#475569" strokeWidth="1.5" className="transition-colors duration-500" />
                          <text x="195" y="54" fill="#0f172a" fontSize="10.5" fontWeight="bold">
                            {tipLabel}
                          </text>
                        </g>
                      );
                    })()}
                  </g>
                )}

                {activeReagent === 'nh3-rod' && (
                  <g>
                    {/* Glass rod dipped in concentrated NH3 near mouth */}
                    <line x1="230" y1="36" x2="170" y2="66" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="170" cy="66" r="3" fill="#e0f2fe" />
                    {currentGasId === 'hcl' && (
                      <g>
                        <ellipse cx="172" cy="68" rx="28" ry="15" fill="#ffffff" fillOpacity="0.88" stroke="#cbd5e1" strokeWidth="1" />
                        <ellipse cx="185" cy="52" rx="20" ry="11" fill="#ffffff" fillOpacity="0.85" />
                        <text x="218" y="68" fill="#0f172a" fontSize="10.5" fontWeight="bold">Wasap putih NH₄Cl!</text>
                      </g>
                    )}
                  </g>
                )}

                {(activeReagent === 'limewater' || activeReagent === 'kmno4') && (
                  <g>
                    {/* Rubber stopper & delivery tube passing gas into second test tube */}
                    <rect x="155" y="62" width="34" height="12" rx="2" fill="#475569" />
                    <path
                      d="M 172 62 L 172 34 L 296 34 L 296 174"
                      fill="none"
                      stroke="#64748b"
                      strokeWidth="4.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 172 62 L 172 34 L 296 34 L 296 174"
                      fill="none"
                      stroke="#e0f2fe"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />

                    {/* Second test tube with Limewater OR Acidified KMnO4 */}
                    {(() => {
                      const isLime = activeReagent === 'limewater';
                      const limeCloudy = isLime && currentGasId === 'co2';
                      const kmno4Decolorized = !isLime && currentGasId === 'so2';
                      const liquidColor = isLime
                        ? limeCloudy
                          ? '#f1f5f9'
                          : '#e0f2fe'
                        : kmno4Decolorized
                        ? '#f8fafc'
                        : '#9333ea';

                      return (
                        <g>
                          <path
                            d="M 281 132 L 281 178 Q 281 195 296 195 Q 311 195 311 178 L 311 132 Z"
                            fill={liquidColor}
                            fillOpacity={limeCloudy ? 0.95 : kmno4Decolorized ? 0.55 : 0.78}
                            className="transition-colors duration-500"
                          />
                          <path
                            d="M 278 96 L 278 178 Q 278 198 296 198 Q 314 198 314 178 L 314 96"
                            fill="none"
                            stroke="#334155"
                            strokeWidth="2.2"
                          />
                          {/* Bubbles emerging from delivery tube */}
                          <circle cx="296" cy="166" r="2.8" fill="#ffffff" opacity="0.8">
                            <animate attributeName="cy" values="172;138" dur="0.7s" repeatCount="indefinite" />
                          </circle>
                          <text x="326" y="148" fill="#0f172a" fontSize="10.5" fontWeight="bold">
                            {isLime ? (limeCloudy ? 'Air kapur keruh!' : 'Kekal jernih') : kmno4Decolorized ? 'Ungu → Tidak berwarna!' : 'Kekal ungu'}
                          </text>
                        </g>
                      );
                    })()}
                  </g>
                )}

                {/* Hint when no reagent tested yet */}
                {!activeReagent && (
                  <text x="315" y="135" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="600">
                    ← Heret radas ujian di bawah ke sini
                  </text>
                )}
              </svg>
            </div>

            {/* Draggable / Clickable 7 Reagents Rack */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase">
                <span>Rak Radas &amp; Reagen (Heret ke Tabung Uji / Klik untuk Uji)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-1.5">
                {REAGENTS.map((reagent) => {
                  const isActive = activeReagent === reagent.id;
                  return (
                    <div
                      key={reagent.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', reagent.id);
                      }}
                      onClick={() => runReagentTest(reagent.id)}
                      className={`px-2.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-grab active:cursor-grabbing transition select-none ${
                        isActive
                          ? 'ring-2 ring-cyan-500 border-cyan-600 bg-cyan-50 text-cyan-950 shadow-xs'
                          : `${reagent.badgeColor} hover:brightness-95`
                      }`}
                    >
                      <GripVertical className="w-3 h-3 opacity-45 shrink-0" />
                      <span>{reagent.emoji}</span>
                      <span className="truncate">{reagent.shortName}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT 6 COLS: Observations, Log History & Mystery Identification / Study Facts */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
            {/* 1. Live Observation Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Pemerhatian Makmal
                </span>
                <button
                  onClick={() => {
                    setActiveReagent(null);
                  }}
                  className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Bersihkan Radas
                </button>
              </div>

              {latestOutcome ? (
                <div
                  className={`p-3 rounded-xl border text-xs space-y-1 ${
                    latestOutcome.isPositive
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5">
                    {latestOutcome.isPositive ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    Ujian: {REAGENTS.find((r) => r.id === activeReagent)?.name}
                  </div>
                  <p className="pl-5 font-medium leading-relaxed">{latestOutcome.observation}</p>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-xs text-slate-500">
                  Heret mana-mana alat ujian dari rak (cth. kayu uji, air kapur, litmus, rod NH₃ atau KMnO₄) ke atas tabung uji untuk melihat pemerhatian.
                </div>
              )}

              {/* Compact Log Chips of Past Tests on This Sample */}
              {currentLogs.length > 0 && (
                <div className="space-y-1 pt-1">
                  <div className="text-[10px] font-bold uppercase text-slate-400">
                    Rekod Ujian Sampel Ini ({currentLogs.length}/7):
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-[68px] overflow-y-auto">
                    {currentLogs.map((log) => {
                      const r = REAGENTS.find((x) => x.id === log.reagentId);
                      return (
                        <button
                          key={log.reagentId}
                          onClick={() => setActiveReagent(log.reagentId)}
                          className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border cursor-pointer ${
                            log.isPositive
                              ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                              : 'bg-slate-100 border-slate-200 text-slate-600'
                          }`}
                        >
                          {r?.shortName}: {log.isPositive ? 'Positif ✓' : 'Negatif'}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 2. Identification Panel (Mystery Mode) OR KSSM Reference (Learn Mode) */}
            {mode === 'mystery' ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm space-y-2.5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-800">
                      Kenal Pasti Identiti Sampel #{mysteryIdx + 1}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Sifat: {currentGas.appearance}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {GASES.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => {
                          if (guessStatus !== 'correct') {
                            setSelectedGuess(g.id);
                            setGuessStatus('idle');
                          }
                        }}
                        className={`px-2 py-1.5 rounded-lg border text-xs font-bold transition cursor-pointer ${
                          selectedGuess === g.id || (guessStatus === 'correct' && currentGasId === g.id)
                            ? 'bg-cyan-600 border-cyan-700 text-white'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div>{g.formula}</div>
                        <div className="text-[10px] font-normal truncate opacity-85">{g.name.replace('Gas ', '')}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  {guessStatus === 'correct' ? (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 space-y-1">
                      <div className="font-bold flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Betul! Sampel ini ialah {currentGas.name} ({currentGas.formula})
                        </span>
                        {mysteryIdx < 7 && (
                          <button
                            onClick={() => handleSelectMystery(mysteryIdx + 1)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold cursor-pointer"
                          >
                            Sampel #{mysteryIdx + 2} →
                          </button>
                        )}
                      </div>
                      <p className="text-[11px] text-emerald-900 font-mono">{currentGas.spmEquation}</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleVerifyGuess}
                        disabled={!selectedGuess}
                        className="flex-1 py-2.5 px-4 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 text-white text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer disabled:cursor-not-allowed"
                      >
                        Sahkan Identiti Gas
                      </button>
                      {guessStatus === 'wrong' && (
                        <span className="text-xs font-bold text-red-600">
                          Kurang tepat — jalankan ujian lagi!
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm space-y-2.5 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                    Fakta Buku Teks (Jadual 6.8 • Set {currentGas.code})
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-800 rounded-full">
                    {currentGas.appearance}
                  </span>
                </div>
                <div className="text-xs space-y-1.5 text-slate-700">
                  <p>
                    <strong>Penyediaan Gas:</strong> {currentGas.preparation}
                  </p>
                  <p>
                    <strong>Kaedah Ujian:</strong> {currentGas.textbookMethod}
                  </p>
                  <p className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950 font-semibold">
                    <strong>Pemerhatian Positif:</strong> {currentGas.positiveObservation}
                  </p>
                  <p className="p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px] text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    {currentGas.spmEquation}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
