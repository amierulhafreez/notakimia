import React, { useState, useEffect, useMemo } from 'react';
import { analytics } from '../services/analytics';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  RotateCcw,
  Scale,
  ArrowRight,
  AlertTriangle,
  Lock,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface SpeciesSpec {
  name: string;
  formula: string;
  state: '(p)' | '(ce)' | '(g)' | '(ak)';
  entityType: 'atom' | 'molekul' | 'unit formula';
  atoms: Record<string, number>;
}

interface EquationProblem {
  id: string;
  level: number;
  difficulty: 'Asas' | 'Sederhana' | 'Mencabar' | 'Sukar' | 'KBAT SPM';
  reactionType: string;
  textbookRef: string;
  heatArrow?: boolean;
  reactants: SpeciesSpec[];
  products: SpeciesSpec[];
  targetCoeffs: { reactants: number[]; products: number[] };
  qualitativeNote: string;
  halfMolExample: string;
}

const SIM_ID = 'penyeimbangan-persamaan-kimia';

const EQUATIONS: EquationProblem[] = [
  {
    id: 'eq1',
    level: 1,
    difficulty: 'Asas',
    reactionType: 'Sintesis Sebatian Ion (Kumpulan 1 + Kumpulan 17)',
    textbookRef: 'Buku Teks T4 m.s. 72',
    reactants: [
      { name: 'logam natrium', formula: 'Na', state: '(p)', entityType: 'atom', atoms: { Na: 1 } },
      { name: 'gas klorin', formula: 'Cl₂', state: '(g)', entityType: 'molekul', atoms: { Cl: 2 } },
    ],
    products: [
      { name: 'pepejal natrium klorida', formula: 'NaCl', state: '(p)', entityType: 'unit formula', atoms: { Na: 1, Cl: 1 } },
    ],
    targetCoeffs: { reactants: [2, 1], products: [2] },
    qualitativeNote: 'Logam natrium terbakar terang dalam gas klorin kuning kehijauan menghasilkan wasap putih pepejal natrium klorida.',
    halfMolExample: '1 mol Na(p) + 0.5 mol Cl₂(g) → 1 mol NaCl(p)',
  },
  {
    id: 'eq2',
    level: 2,
    difficulty: 'Asas',
    reactionType: 'Tindak Balas Logam Alkali dengan Air',
    textbookRef: 'Aktiviti 3.17(1b) T4 m.s. 70',
    reactants: [
      { name: 'logam natrium', formula: 'Na', state: '(p)', entityType: 'atom', atoms: { Na: 1 } },
      { name: 'air', formula: 'H₂O', state: '(ce)', entityType: 'molekul', atoms: { H: 2, O: 1 } },
    ],
    products: [
      { name: 'larutan natrium hidroksida', formula: 'NaOH', state: '(ak)', entityType: 'unit formula', atoms: { Na: 1, O: 1, H: 1 } },
      { name: 'gas hidrogen', formula: 'H₂', state: '(g)', entityType: 'molekul', atoms: { H: 2 } },
    ],
    targetCoeffs: { reactants: [2, 2], products: [2, 1] },
    qualitativeNote: 'Larutan yang terhasil bersifat alkali (menukarkan penunjuk fenolftalein menjadi merah jambu) dan gas H₂ menghasilkan bunyi "pop".',
    halfMolExample: '1 mol Na(p) + 1 mol H₂O(ce) → 1 mol NaOH(ak) + 0.5 mol H₂(g)',
  },
  {
    id: 'eq3',
    level: 3,
    difficulty: 'Sederhana',
    reactionType: 'Penguraian Ganda Dua (Pemendakan Garam)',
    textbookRef: 'Aktiviti 3.18(C) T4 m.s. 71',
    reactants: [
      { name: 'larutan plumbum(II) nitrat', formula: 'Pb(NO₃)₂', state: '(ak)', entityType: 'unit formula', atoms: { Pb: 1, N: 2, O: 6 } },
      { name: 'larutan kalium iodida', formula: 'KI', state: '(ak)', entityType: 'unit formula', atoms: { K: 1, I: 1 } },
    ],
    products: [
      { name: 'pepejal plumbum(II) iodida', formula: 'PbI₂', state: '(p)', entityType: 'unit formula', atoms: { Pb: 1, I: 2 } },
      { name: 'larutan kalium nitrat', formula: 'KNO₃', state: '(ak)', entityType: 'unit formula', atoms: { K: 1, N: 1, O: 3 } },
    ],
    targetCoeffs: { reactants: [1, 2], products: [1, 2] },
    qualitativeNote: 'Dua larutan tidak berwarna bercampur lalu membentuk mendakan kuning terang plumbum(II) iodida, PbI₂.',
    halfMolExample: '0.5 mol Pb(NO₃)₂ + 1 mol KI → 0.5 mol PbI₂ + 1 mol KNO₃',
  },
  {
    id: 'eq4',
    level: 4,
    difficulty: 'Sederhana',
    reactionType: 'Tindak Balas Logam dengan Asid Dwibes',
    textbookRef: 'Bab 6: Asid, Bes & Garam T4',
    reactants: [
      { name: 'logam aluminium', formula: 'Al', state: '(p)', entityType: 'atom', atoms: { Al: 1 } },
      { name: 'asid sulfurik', formula: 'H₂SO₄', state: '(ak)', entityType: 'molekul', atoms: { H: 2, S: 1, O: 4 } },
    ],
    products: [
      { name: 'larutan aluminium sulfat', formula: 'Al₂(SO₄)₃', state: '(ak)', entityType: 'unit formula', atoms: { Al: 2, S: 3, O: 12 } },
      { name: 'gas hidrogen', formula: 'H₂', state: '(g)', entityType: 'molekul', atoms: { H: 2 } },
    ],
    targetCoeffs: { reactants: [2, 3], products: [1, 3] },
    qualitativeNote: 'Logam aluminium melarut dalam asid sulfurik cair sambil membebaskan gelembung gas hidrogen tidak berwarna.',
    halfMolExample: '1 mol Al + 1.5 mol H₂SO₄ → 0.5 mol Al₂(SO₄)₃ + 1.5 mol H₂',
  },
  {
    id: 'eq5',
    level: 5,
    difficulty: 'Mencabar',
    reactionType: 'Penurunan Redoks (Pengekstrakan Besi di Relau Bagas)',
    textbookRef: 'Bab 1: Keseimbangan Redoks T5 m.s. 50',
    heatArrow: true,
    reactants: [
      { name: 'pepejal ferum(III) oksida', formula: 'Fe₂O₃', state: '(p)', entityType: 'unit formula', atoms: { Fe: 2, O: 3 } },
      { name: 'gas karbon monoksida', formula: 'CO', state: '(g)', entityType: 'molekul', atoms: { C: 1, O: 1 } },
    ],
    products: [
      { name: 'leburan besi', formula: 'Fe', state: '(ce)', entityType: 'atom', atoms: { Fe: 1 } },
      { name: 'gas karbon dioksida', formula: 'CO₂', state: '(g)', entityType: 'molekul', atoms: { C: 1, O: 2 } },
    ],
    targetCoeffs: { reactants: [1, 3], products: [2, 3] },
    qualitativeNote: 'Bijih hematit (Fe₂O₃) diturunkan oleh gas CO pada suhu tinggi menjadi leburan besi manakala CO dioksidakan kepada CO₂.',
    halfMolExample: '0.5 mol Fe₂O₃ + 1.5 mol CO → 1 mol Fe + 1.5 mol CO₂',
  },
  {
    id: 'eq6',
    level: 6,
    difficulty: 'Sukar',
    reactionType: 'Pembakaran Lengkap Hidrokarbon (Alkana)',
    textbookRef: 'Aktiviti 3.17(2c) T4 m.s. 70',
    reactants: [
      { name: 'gas propana', formula: 'C₃H₈', state: '(g)', entityType: 'molekul', atoms: { C: 3, H: 8 } },
      { name: 'gas oksigen', formula: 'O₂', state: '(g)', entityType: 'molekul', atoms: { O: 2 } },
    ],
    products: [
      { name: 'gas karbon dioksida', formula: 'CO₂', state: '(g)', entityType: 'molekul', atoms: { C: 1, O: 2 } },
      { name: 'air', formula: 'H₂O', state: '(ce)', entityType: 'molekul', atoms: { H: 2, O: 1 } },
    ],
    targetCoeffs: { reactants: [1, 5], products: [3, 4] },
    qualitativeNote: 'Pembakaran lengkap propana dalam oksigen berlebihan hanya menghasilkan gas CO₂ dan air tanpa jelaga hitam.',
    halfMolExample: '0.5 mol C₃H₈ + 2.5 mol O₂ → 1.5 mol CO₂ + 2 mol H₂O',
  },
  {
    id: 'eq7',
    level: 7,
    difficulty: 'KBAT SPM',
    reactionType: 'Penguraian Terma Garam Nitrat',
    textbookRef: 'Bab 6: Kesan Haba ke atas Garam T4 m.s. 193',
    heatArrow: true,
    reactants: [
      { name: 'pepejal plumbum(II) nitrat', formula: 'Pb(NO₃)₂', state: '(p)', entityType: 'unit formula', atoms: { Pb: 1, N: 2, O: 6 } },
    ],
    products: [
      { name: 'pepejal plumbum(II) oksida', formula: 'PbO', state: '(p)', entityType: 'unit formula', atoms: { Pb: 1, O: 1 } },
      { name: 'gas nitrogen dioksida', formula: 'NO₂', state: '(g)', entityType: 'molekul', atoms: { N: 1, O: 2 } },
      { name: 'gas oksigen', formula: 'O₂', state: '(g)', entityType: 'molekul', atoms: { O: 2 } },
    ],
    targetCoeffs: { reactants: [2], products: [2, 4, 1] },
    qualitativeNote: 'Gas berwarna perang (NO₂) dan gas oksigen terbebas; baki pepejal PbO berwarna perang semasa panas dan kuning semasa sejuk.',
    halfMolExample: '1 mol Pb(NO₃)₂ → 1 mol PbO + 2 mol NO₂ + 0.5 mol O₂',
  },
];

const gcdTwo = (a: number, b: number): number => (b === 0 ? a : gcdTwo(b, a % b));
const arrayGcd = (nums: number[]): number => nums.reduce((acc, n) => gcdTwo(acc, n), nums[0] || 1);

interface CoeffControlProps {
  value: string;
  onChange: (val: string) => void;
  onStep: (delta: number) => void;
  formula: string;
  state: string;
}

const CoeffControl: React.FC<CoeffControlProps> = ({ value, onChange, onStep, formula, state }) => {
  return (
    <div className="flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 shadow-xs">
      <button
        type="button"
        onClick={() => onStep(-1)}
        className="w-6 h-7 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 font-bold text-sm flex items-center justify-center transition cursor-pointer"
        title="Kurangkan pekali"
      >
        −
      </button>
      <input
        type="number"
        min={1}
        max={20}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => {
          const parsed = parseInt(value, 10);
          if (isNaN(parsed) || parsed < 1) onChange('1');
          else if (parsed > 20) onChange('20');
          else onChange(String(parsed));
        }}
        className="w-11 h-7 text-center font-mono font-extrabold text-base text-purple-700 bg-purple-50 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        aria-label={`Pekali untuk ${formula}`}
      />
      <button
        type="button"
        onClick={() => onStep(1)}
        className="w-6 h-7 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 font-bold text-sm flex items-center justify-center transition cursor-pointer"
        title="Tambah pekali"
      >
        +
      </button>
      <span className="font-display font-bold text-base sm:text-lg text-slate-900 pl-1 whitespace-nowrap">
        {formula}
        <span className="text-xs font-mono font-semibold text-slate-500">{state}</span>
      </span>
    </div>
  );
};

export const ChemicalEquationBalancer: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const eq = EQUATIONS[currentIdx];

  const [reactantInputs, setReactantInputs] = useState<string[]>(() => eq.reactants.map(() => '1'));
  const [productInputs, setProductInputs] = useState<string[]>(() => eq.products.map(() => '1'));
  const [solvedIds, setSolvedIds] = useState<Record<string, boolean>>({});

  const reactantNums = reactantInputs.map((v) => {
    const n = parseInt(v, 10);
    return isNaN(n) || n < 1 ? 0 : Math.min(20, n);
  });
  const productNums = productInputs.map((v) => {
    const n = parseInt(v, 10);
    return isNaN(n) || n < 1 ? 0 : Math.min(20, n);
  });

  const { left, right, allAtoms, isAtomsBalanced, gcdVal, isSimplest } = useMemo(() => {
    const l: Record<string, number> = {};
    const r: Record<string, number> = {};

    eq.reactants.forEach((sp, idx) => {
      const c = reactantNums[idx];
      Object.entries(sp.atoms).forEach(([atom, count]) => {
        l[atom] = (l[atom] || 0) + count * c;
      });
    });

    eq.products.forEach((sp, idx) => {
      const c = productNums[idx];
      Object.entries(sp.atoms).forEach(([atom, count]) => {
        r[atom] = (r[atom] || 0) + count * c;
      });
    });

    const atoms = Array.from(new Set([...Object.keys(l), ...Object.keys(r)]));
    const allPositive = [...reactantNums, ...productNums].every((n) => n >= 1);
    const atomsEqual = allPositive && atoms.every((a) => (l[a] || 0) === (r[a] || 0));
    const g = allPositive ? arrayGcd([...reactantNums, ...productNums]) : 1;

    return {
      left: l,
      right: r,
      allAtoms: atoms,
      isAtomsBalanced: atomsEqual,
      gcdVal: g,
      isSimplest: atomsEqual && g === 1,
    };
  }, [eq, reactantNums, productNums]);

  useEffect(() => {
    if (isSimplest && !solvedIds[eq.id]) {
      setSolvedIds((prev) => ({ ...prev, [eq.id]: true }));
      analytics.recordSimulationCompleted(SIM_ID);
      confetti({ particleCount: 65, spread: 55, origin: { y: 0.65 } });
    }
  }, [isSimplest, eq.id, solvedIds]);

  const handleSelectProblem = (idx: number) => {
    setCurrentIdx(idx);
    const nextEq = EQUATIONS[idx];
    setReactantInputs(nextEq.reactants.map(() => '1'));
    setProductInputs(nextEq.products.map(() => '1'));
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  const handleStep = (side: 'reactants' | 'products', index: number, delta: number) => {
    analytics.recordSimulationClick(SIM_ID, 1);
    const setter = side === 'reactants' ? setReactantInputs : setProductInputs;
    setter((prev) => {
      const next = [...prev];
      const cur = parseInt(next[index], 10) || 1;
      next[index] = String(Math.max(1, Math.min(20, cur + delta)));
      return next;
    });
  };

  const handleDirectInput = (side: 'reactants' | 'products', index: number, raw: string) => {
    analytics.recordSimulationClick(SIM_ID, 1);
    const setter = side === 'reactants' ? setReactantInputs : setProductInputs;
    // Allow empty temporary state while typing, or positive digits
    if (raw === '' || /^[0-9]{1,2}$/.test(raw)) {
      setter((prev) => {
        const next = [...prev];
        next[index] = raw;
        return next;
      });
    }
  };

  const handleResetCurrent = () => {
    setReactantInputs(eq.reactants.map(() => '1'));
    setProductInputs(eq.products.map(() => '1'));
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  const solvedCount = Object.values(solvedIds).filter(Boolean).length;

  const formatCoeffPrefix = (n: number) => (n === 1 ? '' : `${n}`);

  const buildEntityRatioSentence = () => {
    const rText = eq.reactants
      .map((r, i) => `${eq.targetCoeffs.reactants[i]} ${r.entityType} ${r.formula}`)
      .join(' + ');
    const pText = eq.products
      .map((p, i) => `${eq.targetCoeffs.products[i]} ${p.entityType} ${p.formula}`)
      .join(' + ');
    return `${rText} → ${pText}`;
  };

  const buildMoleRatioSentence = () => {
    const rText = eq.reactants
      .map((r, i) => `${eq.targetCoeffs.reactants[i]} mol ${r.formula}`)
      .join(' + ');
    const pText = eq.products
      .map((p, i) => `${eq.targetCoeffs.products[i]} mol ${p.formula}`)
      .join(' + ');
    return `${rText} → ${pText}`;
  };

  return (
    <div className="space-y-3 text-slate-800">
      {/* Top Level Selector Strip (7 Progressive Equations) */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-purple-50 border border-amber-200 rounded-xl px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {EQUATIONS.map((item, idx) => {
            const active = currentIdx === idx;
            const done = solvedIds[item.id];
            return (
              <button
                key={item.id}
                onClick={() => handleSelectProblem(idx)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${
                  active
                    ? 'bg-amber-600 border-amber-700 text-white shadow-xs'
                    : done
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-900 hover:bg-emerald-200'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>Soalan {item.level}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded ${
                    active
                      ? 'bg-amber-800 text-amber-100'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {item.difficulty}
                </span>
                {done && !active && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
              </button>
            );
          })}
        </div>

        <span className="text-xs font-bold text-amber-900 bg-white px-2.5 py-1 rounded-lg border border-amber-200">
          Selesai: {solvedCount} / {EQUATIONS.length}
        </span>
      </div>

      {/* Main Balancing Stage */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
        {/* Question Header */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-amber-700">
              <span>Soalan {eq.level}/7 • Aras: {eq.difficulty}</span>
              <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 rounded-full text-amber-800">
                {eq.textbookRef}
              </span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm sm:text-base mt-0.5">
              {eq.reactionType}
            </h4>
          </div>

          <button
            onClick={handleResetCurrent}
            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Pekali
          </button>
        </div>

        {/* Interactive Equation Ribbon (Click -/+ OR Type Number Directly) */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-center gap-2.5">
          {eq.reactants.map((r, i) => (
            <React.Fragment key={`r-${i}`}>
              {i > 0 && <span className="text-lg font-extrabold text-slate-400">+</span>}
              <CoeffControl
                value={reactantInputs[i]}
                onChange={(val) => handleDirectInput('reactants', i, val)}
                onStep={(d) => handleStep('reactants', i, d)}
                formula={r.formula}
                state={r.state}
              />
            </React.Fragment>
          ))}

          <div className="flex flex-col items-center px-1">
            <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800">
              <ArrowRight className="w-4 h-4" />
            </div>
            {eq.heatArrow && (
              <span className="text-[10px] font-bold text-rose-600 mt-0.5" title="Dipanaskan">
                Δ (Haba)
              </span>
            )}
          </div>

          {eq.products.map((p, i) => (
            <React.Fragment key={`p-${i}`}>
              {i > 0 && <span className="text-lg font-extrabold text-slate-400">+</span>}
              <CoeffControl
                value={productInputs[i]}
                onChange={(val) => handleDirectInput('products', i, val)}
                onStep={(d) => handleStep('products', i, d)}
                formula={p.formula}
                state={p.state}
              />
            </React.Fragment>
          ))}
        </div>
        <p className="text-[11px] text-slate-500 text-center">
          Klik butang <strong>− / +</strong> atau <strong>taip terus nombor pekali</strong> dalam kotak ungu untuk mengimbangkan persamaan.
        </p>
      </div>

      {/* Bottom Split: Left Atom Balance Comparator | Right Qualitative & Quantitative Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* LEFT 5 COLS: Atom Balance Check */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-3">
          <div className="space-y-2.5">
            <h4 className="text-xs uppercase font-bold text-slate-600 tracking-wider flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-purple-600" />
              Semakan Bilangan Atom (Kiri vs Kanan)
            </h4>

            <div className="grid grid-cols-2 gap-2">
              {allAtoms.map((atom) => {
                const lCount = left[atom] || 0;
                const rCount = right[atom] || 0;
                const match = lCount > 0 && lCount === rCount;
                return (
                  <div
                    key={atom}
                    className={`px-3 py-2 rounded-xl border flex items-center justify-between text-xs ${
                      match
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                        : 'bg-rose-50 border-rose-200 text-rose-950'
                    }`}
                  >
                    <span className="font-bold">Atom {atom}</span>
                    <span className="font-mono font-extrabold">
                      {lCount} {match ? '=' : '≠'} {rCount}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Balance Status Footer */}
          {isSimplest ? (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold flex items-center justify-between gap-2">
                  <span>Persamaan Kimia Seimbang!</span>
                  {currentIdx < EQUATIONS.length - 1 && (
                    <button
                      onClick={() => handleSelectProblem(currentIdx + 1)}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold cursor-pointer"
                    >
                      Soalan {currentIdx + 2} →
                    </button>
                  )}
                </div>
                <p className="font-mono font-bold text-[11px] text-emerald-900">
                  {eq.reactants.map((r, i) => `${formatCoeffPrefix(reactantNums[i])}${r.formula}${r.state}`).join(' + ')} →{' '}
                  {eq.products.map((p, i) => `${formatCoeffPrefix(productNums[i])}${p.formula}${p.state}`).join(' + ')}
                </p>
              </div>
            </div>
          ) : isAtomsBalanced && gcdVal > 1 ? (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Hampir tepat!</strong> Bilangan atom sudah sama, tetapi pekali belum dalam nisbah paling ringkas. Bahagikan semua pekali dengan <strong>{gcdVal}</strong>.
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              Laraskan pekali sehingga bilangan setiap jenis atom di sebelah kiri (bahan) sama dengan sebelah kanan (hasil).
            </div>
          )}
        </div>

        {/* RIGHT 7 COLS: Qualitative & Quantitative Analysis (SP 3.4.2 KSSM m.s. 72) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
            <h4 className="text-xs uppercase font-bold text-indigo-800 tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Analisis Kualitatif &amp; Kuantitatif Persamaan (SP 3.4.2)
            </h4>
            {isSimplest && (
              <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Terbuka
              </span>
            )}
          </div>

          {!isSimplest ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-5 bg-slate-50 border border-dashed border-slate-300 rounded-xl space-y-2">
              <Lock className="w-7 h-7 text-slate-400" />
              <div className="text-xs font-bold text-slate-700">
                Analisis Kualitatif &amp; Kuantitatif Terkunci
              </div>
              <p className="text-xs text-slate-500 max-w-md">
                Seimbangkan persamaan kimia di atas dengan pekali nisbah paling ringkas terlebih dahulu untuk menjana tafsiran kualitatif dan kuantitatif lengkap mengikut Buku Teks KSSM m.s. 72.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs flex-1">
              {/* Aspek Kualitatif */}
              <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1.5">
                <div className="font-bold text-indigo-900 uppercase text-[11px]">
                  1. Analisis Kualitatif
                </div>
                <p className="text-slate-700">
                  <strong>Bahan tindak balas:</strong>{' '}
                  {eq.reactants.map((r) => `${r.name}, ${r.formula}${r.state}`).join(' dan ')}
                </p>
                <p className="text-slate-700">
                  <strong>Hasil tindak balas:</strong>{' '}
                  {eq.products.map((p) => `${p.name}, ${p.formula}${p.state}`).join(' dan ')}
                </p>
                <p className="text-[11px] text-indigo-900 bg-white/80 p-2 rounded-lg border border-indigo-100">
                  <strong>Pemerhatian:</strong> {eq.qualitativeNote}
                </p>
              </div>

              {/* Aspek Kuantitatif */}
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                <div className="font-bold text-emerald-900 uppercase text-[11px]">
                  2. Analisis Kuantitatif (Stoikiometri)
                </div>
                <div className="bg-white/90 p-2 rounded-lg border border-emerald-100">
                  <div className="text-[10.5px] font-bold text-emerald-800">Nisbah Entiti Asas (Zarah):</div>
                  <div className="text-slate-800 font-medium">{buildEntityRatioSentence()}</div>
                </div>
                <div className="bg-white/90 p-2 rounded-lg border border-emerald-100">
                  <div className="text-[10.5px] font-bold text-emerald-800">Nisbah Bilangan Mol:</div>
                  <div className="text-slate-800 font-bold">{buildMoleRatioSentence()}</div>
                </div>
                <div className="text-[10.5px] font-mono text-emerald-900 bg-emerald-100/70 px-2 py-1 rounded">
                  Perkadaran (÷2): {eq.halfMolExample}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
