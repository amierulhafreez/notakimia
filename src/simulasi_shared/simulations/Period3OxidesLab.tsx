import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Eye,
  Flame,
  FlaskConical,
  RotateCcw,
  Sparkles,
  TestTube2,
} from 'lucide-react';
import { analytics } from '../services/analytics';
import { OxideNature, Period3OxideTubesSVG } from '../components/Period3OxideTubesSVG';

interface Period3OxideData {
  id: string;
  proton: number;
  elementSymbol: string;
  elementName: string;
  elementType: string;
  formula: string;
  name: string;
  physicalState: 'pepejal' | 'gas' | 'cecair';
  physicalDesc: string;
  isCoreTextbook: boolean;
  nature: OxideNature;
  natureLabel: string;
  // Tube 1: Water + Universal Indicator + pH meter
  solubleInWater: 'larut' | 'separa' | 'tidak';
  pHValueText: string;
  waterIndicatorHex: string;
  waterIndicatorLabel: string;
  waterObs: string;
  waterEq: string;
  // Tube 2: HNO3 2.0 mol dm-3
  reactsWithHNO3: boolean;
  hno3BadgeText: string;
  hno3Obs: string;
  hno3Eq: string;
  // Tube 3: NaOH 2.0 mol dm-3
  reactsWithNaOH: boolean;
  naohBadgeText: string;
  naohObs: string;
  naohEq: string;
  summaryNote: string;
}

const PERIOD_3_OXIDES: Period3OxideData[] = [
  {
    id: 'Na2O',
    proton: 11,
    elementSymbol: 'Na',
    elementName: 'Natrium',
    elementType: 'Logam (Kumpulan 1)',
    formula: 'Na₂O',
    name: 'Natrium oksida',
    physicalState: 'pepejal',
    physicalDesc: 'Serbuk putih',
    isCoreTextbook: true,
    nature: 'bes',
    natureLabel: 'Oksida Bes',
    solubleInWater: 'larut',
    pHValueText: '13.5',
    waterIndicatorHex: '#7e22ce',
    waterIndicatorLabel: 'Ungu (Alkali Kuat)',
    waterObs: 'Larut dalam air membentuk larutan beralkali kuat (penunjuk ungu).',
    waterEq: 'Na₂O(p) + H₂O(ce) → 2NaOH(ak)',
    reactsWithHNO3: true,
    hno3BadgeText: 'Larut ✓ (T/B Bes)',
    hno3Obs: 'Larut serta-merta membentuk garam natrium nitrat dan air.',
    hno3Eq: 'Na₂O(p) + 2HNO₃(ak) → 2NaNO₃(ak) + H₂O(ce)',
    reactsWithNaOH: false,
    naohBadgeText: 'Tiada T/B Asid-Bes',
    naohObs: 'Tidak bertindak balas sebagai asid dengan ion OH⁻ (bersifat bes).',
    naohEq: 'Tiada tindak balas asid-bes dengan NaOH',
    summaryNote: 'Oksida logam Kumpulan 1 yang larut dalam air menghasilkan alkali kuat & bertindak balas dengan asid.',
  },
  {
    id: 'MgO',
    proton: 12,
    elementSymbol: 'Mg',
    elementName: 'Magnesium',
    elementType: 'Logam (Kumpulan 2)',
    formula: 'MgO',
    name: 'Magnesium oksida',
    physicalState: 'pepejal',
    physicalDesc: 'Serbuk putih',
    isCoreTextbook: true,
    nature: 'bes',
    natureLabel: 'Oksida Bes',
    solubleInWater: 'separa',
    pHValueText: '9.5',
    waterIndicatorHex: '#2563eb',
    waterIndicatorLabel: 'Biru (Alkali Lemah)',
    waterObs: 'Sedikit larut menghasilkan larutan beralkali lemah (penunjuk biru).',
    waterEq: 'MgO(p) + H₂O(ce) ⇌ Mg(OH)₂(ak)',
    reactsWithHNO3: true,
    hno3BadgeText: 'Larut ✓ (T/B Bes)',
    hno3Obs: 'Serbuk putih larut menghasilkan larutan tidak berwarna.',
    hno3Eq: 'MgO(p) + 2HNO₃(ak) → Mg(NO₃)₂(ak) + H₂O(ce)',
    reactsWithNaOH: false,
    naohBadgeText: 'Tidak Larut',
    naohObs: 'Serbuk putih kekal mendak (tidak larut dalam NaOH).',
    naohEq: 'Tiada tindak balas',
    summaryNote: 'Oksida bes: bertindak balas dengan asid nitrik membentuk garam & air, tetapi tidak larut dalam alkali NaOH.',
  },
  {
    id: 'Al2O3',
    proton: 13,
    elementSymbol: 'Al',
    elementName: 'Aluminium',
    elementType: 'Logam (Kumpulan 13)',
    formula: 'Al₂O₃',
    name: 'Aluminium oksida',
    physicalState: 'pepejal',
    physicalDesc: 'Serbuk putih',
    isCoreTextbook: true,
    nature: 'amfoterik',
    natureLabel: 'Oksida Amfoterik',
    solubleInWater: 'tidak',
    pHValueText: '7.0',
    waterIndicatorHex: '#22c55e',
    waterIndicatorLabel: 'Hijau (Neutral)',
    waterObs: 'Tidak larut di dalam air; penunjuk kekal hijau (pH 7).',
    waterEq: 'Tidak larut dalam air',
    reactsWithHNO3: true,
    hno3BadgeText: 'Larut ✓ (Sifat Bes)',
    hno3Obs: 'Serbuk putih larut dalam HNO₃ (bertindak sebagai bes).',
    hno3Eq: 'Al₂O₃(p) + 6HNO₃(ak) → 2Al(NO₃)₃(ak) + 3H₂O(ce)',
    reactsWithNaOH: true,
    naohBadgeText: 'Larut ✓ (Sifat Asid)',
    naohObs: 'Serbuk putih larut dalam NaOH apabila dipanaskan (bertindak sebagai asid).',
    naohEq: 'Al₂O₃(p) + 2NaOH(ak) → 2NaAlO₂(ak) + H₂O(ce)',
    summaryNote: 'Oksida amfoterik: tidak larut dalam air tetapi boleh bertindak sebagai bes (dengan HNO₃) dan asid (dengan NaOH).',
  },
  {
    id: 'SiO2',
    proton: 14,
    elementSymbol: 'Si',
    elementName: 'Silikon',
    elementType: 'Metaloid (Kumpulan 14)',
    formula: 'SiO₂',
    name: 'Silikon(IV) oksida',
    physicalState: 'pepejal',
    physicalDesc: 'Serbuk putih',
    isCoreTextbook: true,
    nature: 'asid',
    natureLabel: 'Oksida Asid',
    solubleInWater: 'tidak',
    pHValueText: '7.0',
    waterIndicatorHex: '#22c55e',
    waterIndicatorLabel: 'Hijau (Tidak Larut)',
    waterObs: 'Tidak larut dalam air kerana ikatan kovalen gergasi (pH kekal 7).',
    waterEq: 'Tidak larut dalam air',
    reactsWithHNO3: false,
    hno3BadgeText: 'Tidak Larut',
    hno3Obs: 'Serbuk putih kekal tidak larut dalam asid nitrik.',
    hno3Eq: 'Tiada tindak balas',
    reactsWithNaOH: true,
    naohBadgeText: 'Larut ✓ (Sifat Asid)',
    naohObs: 'Larut perlahan apabila dipanaskan dalam NaOH pekat/panas.',
    naohEq: 'SiO₂(p) + 2NaOH(ak) → Na₂SiO₃(ak) + H₂O(ce)',
    summaryNote: 'Oksida asid (kovalen gergasi): tidak bertindak balas dengan asid tetapi bertindak balas dengan alkali membentuk garam silikat.',
  },
  {
    id: 'P4O10',
    proton: 15,
    elementSymbol: 'P',
    elementName: 'Fosforus',
    elementType: 'Bukan Logam (Kumpulan 15)',
    formula: 'P₄O₁₀',
    name: 'Fosforus(V) oksida',
    physicalState: 'pepejal',
    physicalDesc: 'Serbuk putih',
    isCoreTextbook: false,
    nature: 'asid',
    natureLabel: 'Oksida Asid',
    solubleInWater: 'larut',
    pHValueText: '1.8',
    waterIndicatorHex: '#ef4444',
    waterIndicatorLabel: 'Merah (Asid)',
    waterObs: 'Larut cergas dalam air menghasilkan asid fosforik(V) (penunjuk merah).',
    waterEq: 'P₄O₁₀(p) + 6H₂O(ce) → 4H₃PO₄(ak)',
    reactsWithHNO3: false,
    hno3BadgeText: 'Tiada T/B',
    hno3Obs: 'Tidak bertindak balas sebagai bes dengan asid nitrik.',
    hno3Eq: 'Tiada tindak balas asid-bes',
    reactsWithNaOH: true,
    naohBadgeText: 'Larut ✓ (Sifat Asid)',
    naohObs: 'Larut bertindak balas dengan NaOH membentuk larutan garam fosfat.',
    naohEq: 'P₄O₁₀(p) + 12NaOH(ak) → 4Na₃PO₄(ak) + 6H₂O(ce)',
    summaryNote: 'Oksida bukan logam bersifat asid (Rajah 4.14): larut dalam air membentuk larutan berasid kuat dan meneutralkan alkali.',
  },
  {
    id: 'SO2',
    proton: 16,
    elementSymbol: 'S',
    elementName: 'Sulfur',
    elementType: 'Bukan Logam (Kumpulan 16)',
    formula: 'SO₂',
    name: 'Sulfur dioksida',
    physicalState: 'gas',
    physicalDesc: 'Gas tidak berwarna',
    isCoreTextbook: true,
    nature: 'asid',
    natureLabel: 'Oksida Asid',
    solubleInWater: 'larut',
    pHValueText: '2.5',
    waterIndicatorHex: '#f97316',
    waterIndicatorLabel: 'Jingga-Merah (Asid)',
    waterObs: 'Gas larut dalam air menghasilkan asid sulfurus (penunjuk jingga/merah).',
    waterEq: 'SO₂(g) + H₂O(ce) → H₂SO₃(ak)',
    reactsWithHNO3: false,
    hno3BadgeText: 'Tiada T/B',
    hno3Obs: 'Gas tidak bertindak balas sebagai bes dengan asid nitrik.',
    hno3Eq: 'Tiada tindak balas asid-bes',
    reactsWithNaOH: true,
    naohBadgeText: 'Larut ✓ (Sifat Asid)',
    naohObs: 'Gas bertindak balas & larut dalam NaOH membentuk natrium sulfit.',
    naohEq: 'SO₂(g) + 2NaOH(ak) → Na₂SO₃(ak) + H₂O(ce)',
    summaryNote: 'Oksida asid: larut dalam air menghasilkan asid sulfurus dan bertindak balas dengan alkali NaOH.',
  },
  {
    id: 'Cl2O7',
    proton: 17,
    elementSymbol: 'Cl',
    elementName: 'Klorin',
    elementType: 'Bukan Logam (Kumpulan 17)',
    formula: 'Cl₂O₇',
    name: 'Diklorin heptoksida',
    physicalState: 'cecair',
    physicalDesc: 'Cecair tidak berwarna',
    isCoreTextbook: false,
    nature: 'asid',
    natureLabel: 'Oksida Asid',
    solubleInWater: 'larut',
    pHValueText: '1.2',
    waterIndicatorHex: '#dc2626',
    waterIndicatorLabel: 'Merah (Asid Kuat)',
    waterObs: 'Larut dalam air membentuk asid perklorik yang sangat berasid.',
    waterEq: 'Cl₂O₇(ce) + H₂O(ce) → 2HClO₄(ak)',
    reactsWithHNO3: false,
    hno3BadgeText: 'Tiada T/B',
    hno3Obs: 'Tidak bertindak balas sebagai bes dengan asid nitrik.',
    hno3Eq: 'Tiada tindak balas asid-bes',
    reactsWithNaOH: true,
    naohBadgeText: 'Larut ✓ (Sifat Asid)',
    naohObs: 'Bertindak balas dengan NaOH membentuk larutan garam natrium perklorat.',
    naohEq: 'Cl₂O₇(ce) + 2NaOH(ak) → 2NaClO₄(ak) + H₂O(ce)',
    summaryNote: 'Oksida asid (Rajah 4.14): melengkapkan trend merentasi Kala 3 menjadi oksida bukan logam bersifat asid kuat.',
  },
];

type TubeStage = 'idle' | 'added' | 'heating' | 'done';

export const Period3OxidesLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lab' | 'matrix'>('lab');
  const [selectedId, setSelectedId] = useState<string>('Na2O');
  const [tubeStage, setTubeStage] = useState<TubeStage>('idle');
  const [testedIds, setTestedIds] = useState<Record<string, boolean>>({});
  const [showAllMatrix, setShowAllMatrix] = useState<boolean>(false);
  const [openAnswers, setOpenAnswers] = useState<Record<number, boolean>>({ 0: true });

  const timerRef = useRef<number | null>(null);
  const completedRef = useRef<boolean>(false);

  const coreCount = PERIOD_3_OXIDES.filter(
    (o) => o.isCoreTextbook && testedIds[o.id]
  ).length;
  const totalTestedCount = Object.values(testedIds).filter(Boolean).length;

  useEffect(() => {
    analytics.recordSimulationView('sifat-oksida-kala-3');
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (coreCount === 5 && !completedRef.current) {
      completedRef.current = true;
      analytics.recordSimulationCompleted('sifat-oksida-kala-3');
    }
  }, [coreCount]);

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const selectedOxide =
    PERIOD_3_OXIDES.find((o) => o.id === selectedId) || PERIOD_3_OXIDES[0];

  const handleSelectOxide = (id: string) => {
    if (tubeStage === 'heating') return;
    clearTimer();
    setSelectedId(id);
    setTubeStage(testedIds[id] ? 'done' : 'idle');
  };

  const handleAddSample = () => {
    if (tubeStage !== 'idle') return;
    setTubeStage('added');
  };

  const handleHeatAndStir = () => {
    if (tubeStage !== 'added') return;
    setTubeStage('heating');
    clearTimer();
    timerRef.current = window.setTimeout(() => {
      setTubeStage('done');
      setTestedIds((prev) => ({ ...prev, [selectedId]: true }));
    }, 850);
  };

  const handleReset = () => {
    clearTimer();
    completedRef.current = false;
    setTestedIds({});
    setSelectedId('Na2O');
    setTubeStage('idle');
    setShowAllMatrix(false);
  };

  const nextUntestedOxide =
    PERIOD_3_OXIDES.find((o) => o.isCoreTextbook && !testedIds[o.id] && o.id !== selectedId) ||
    PERIOD_3_OXIDES.find((o) => !testedIds[o.id] && o.id !== selectedId);

  const getTileStyle = (oxide: Period3OxideData) => {
    const isTested = !!testedIds[oxide.id];
    const isSelected = oxide.id === selectedId;

    if (!isTested) {
      return isSelected
        ? 'bg-slate-200 border-slate-700 text-slate-900 ring-2 ring-slate-400 shadow-xs'
        : 'bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200/70';
    }

    if (oxide.nature === 'bes') {
      return `bg-gradient-to-br from-blue-600 to-violet-600 text-white border-blue-700 ${
        isSelected ? 'ring-2 ring-blue-300 shadow-sm' : ''
      }`;
    }
    if (oxide.nature === 'amfoterik') {
      return `bg-gradient-to-br from-emerald-500 to-amber-400 text-slate-950 border-emerald-600 ${
        isSelected ? 'ring-2 ring-emerald-300 shadow-sm' : ''
      }`;
    }
    return `bg-gradient-to-br from-orange-500 to-rose-600 text-white border-rose-700 ${
      isSelected ? 'ring-2 ring-orange-300 shadow-sm' : ''
    }`;
  };

  const getNatureBadgeClass = (nature: OxideNature) => {
    if (nature === 'bes') return 'bg-blue-100 text-blue-800 border-blue-200';
    if (nature === 'amfoterik') return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    return 'bg-orange-100 text-orange-800 border-orange-200';
  };

  const discussionQuestions = [
    {
      q: '1. Senaraikan oksida bes, oksida amfoterik dan oksida berasid merentasi Kala 3.',
      a: 'Oksida bes: Na₂O dan MgO. Oksida amfoterik: Al₂O₃. Oksida asid: SiO₂, P₄O₁₀, SO₂ dan Cl₂O₇.',
    },
    {
      q: '2. Tulis persamaan kimia bagi tindak balas oksida bes (MgO / Na₂O) dengan asid nitrik, HNO₃.',
      a: 'MgO(p) + 2HNO₃(ak) → Mg(NO₃)₂(ak) + H₂O(ce) dan Na₂O(p) + 2HNO₃(ak) → 2NaNO₃(ak) + H₂O(ce).',
    },
    {
      q: '3. Tulis persamaan kimia bagi tindak balas oksida amfoterik (Al₂O₃) dengan natrium hidroksida, NaOH.',
      a: 'Al₂O₃(p) + 2NaOH(ak) → 2NaAlO₂(ak) + H₂O(ce) (atau menghasilkan ion tetrahidroksoaluminat: Al₂O₃ + 2NaOH + 3H₂O → 2NaAl(OH)₄).',
    },
    {
      q: '4. Huraikan perubahan sifat oksida unsur apabila merentasi Kala 3 dari kiri ke kanan.',
      a: 'Sifat oksida berubah daripada oksida bes (unsur logam Na, Mg) kepada oksida amfoterik (Al), dan seterusnya kepada oksida asid (metaloid Si & bukan logam P, S, Cl).',
    },
  ];

  return (
    <div className="space-y-2.5 text-slate-800">
      {/* TOP NAVIGATION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white border border-slate-200 rounded-xl p-2 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('lab')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'lab'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <TestTube2 className="w-3.5 h-3.5" />
            1. Peta Kala 3 &amp; 3 Tabung Uji Serentak
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            2. Jadual 4.8 &amp; 4.9 serta Perbincangan KSSM
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold whitespace-nowrap shrink-0 border ${
              coreCount === 5
                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                : 'bg-cyan-50 text-cyan-800 border-cyan-200'
            }`}
          >
            Eksperimen 4.2: {coreCount}/5 Teras · {totalTestedCount}/7 Kala 3
          </span>
          <button
            type="button"
            onClick={handleReset}
            disabled={tubeStage === 'heating'}
            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* INTERACTIVE PERIOD 3 SPECTRUM TREND BAR (ALWAYS VISIBLE IN TAB 1) */}
      {activeTab === 'lab' && (
        <>
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-xs space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-slate-800">
                  Peta Spektrum Trend Kala 3 (Klik Unsur/Oksida untuk Menguji)
                </span>
              </div>
              {/* Spectrum legend */}
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold">
                <span className="inline-flex items-center gap-1 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400" />
                  Belum diuji
                </span>
                <span className="inline-flex items-center gap-1 text-blue-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-violet-600" />
                  Biru/Ungu: Bes
                </span>
                <span className="inline-flex items-center gap-1 text-emerald-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-amber-400" />
                  Hijau/Kuning: Amfoterik
                </span>
                <span className="inline-flex items-center gap-1 text-rose-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-orange-500 to-rose-600" />
                  Jingga/Merah: Asid
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5">
              {PERIOD_3_OXIDES.map((ox) => {
                const isTested = !!testedIds[ox.id];
                const isSelected = ox.id === selectedId;
                return (
                  <button
                    key={ox.id}
                    type="button"
                    data-testid={`kala3-tile-${ox.id}`}
                    onClick={() => handleSelectOxide(ox.id)}
                    title={ox.isCoreTextbook ? 'Bahan Teras Eksperimen 4.2' : 'Oksida Tambahan Kala 3 (Rajah 4.14)'}
                    className={`rounded-lg border px-2 py-1.5 text-left transition cursor-pointer relative ${getTileStyle(ox)}`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-bold opacity-85 whitespace-nowrap">
                        {ox.proton} {ox.elementSymbol}
                      </span>
                      {ox.isCoreTextbook && (
                        <span
                          className={`text-[8.5px] font-extrabold px-1 rounded whitespace-nowrap ${
                            isTested
                              ? 'bg-white/25 text-current'
                              : 'bg-cyan-100 text-cyan-800'
                          }`}
                        >
                          Teras
                        </span>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold font-mono leading-tight mt-0.5">
                      {ox.formula}
                    </div>
                    <div className="text-[9.5px] font-bold truncate opacity-90">
                      {isTested ? ox.natureLabel : isSelected ? 'Dipilih' : 'Belum diuji'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MAIN WORKBENCH: LEFT SAMPLE CONTROLS + RIGHT 3 PARALLEL TEST TUBES & MATRIX */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
            {/* LEFT: Selected Oxide Sample + Procedural Actions */}
            <div className="md:col-span-4 bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-700">
                    Sampel Oksida Dipilih
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    {selectedOxide.name} ({selectedOxide.formula})
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {selectedOxide.elementType} · {selectedOxide.physicalDesc}
                  </p>
                </div>
                {testedIds[selectedOxide.id] ? (
                  <span
                    className={`px-2 py-0.5 rounded-full border text-[10px] font-extrabold whitespace-nowrap shrink-0 ${getNatureBadgeClass(
                      selectedOxide.nature
                    )}`}
                  >
                    {selectedOxide.natureLabel}
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold whitespace-nowrap shrink-0">
                    Belum diuji
                  </span>
                )}
              </div>

              {/* Action buttons: 1) Masukkan ke Dalam -> 2) Panaskan & Kacau */}
              <div className="space-y-1.5 pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleAddSample}
                  disabled={tubeStage !== 'idle'}
                  className={`w-full px-3 py-2 rounded-lg text-xs font-extrabold transition flex items-center justify-between gap-2 ${
                    tubeStage === 'idle'
                      ? 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-xs cursor-pointer'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-default'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    1. Masukkan ke Dalam 3 Tabung Uji
                  </span>
                  {tubeStage !== 'idle' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>

                <button
                  type="button"
                  onClick={handleHeatAndStir}
                  disabled={tubeStage !== 'added'}
                  className={`w-full px-3 py-2 rounded-lg text-xs font-extrabold transition flex items-center justify-between gap-2 ${
                    tubeStage === 'added'
                      ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-xs cursor-pointer'
                      : tubeStage === 'heating'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300 cursor-wait'
                      : tubeStage === 'done'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-default'
                      : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 shrink-0" />
                    {tubeStage === 'heating'
                      ? 'Sedang memanas & kacau...'
                      : '2. Panaskan & Kacau (Rod Kaca)'}
                  </span>
                  {tubeStage === 'done' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>
              </div>

              {/* Result / Classification card */}
              {tubeStage === 'done' ? (
                <div
                  className={`rounded-lg border p-2.5 space-y-1.5 ${
                    selectedOxide.nature === 'bes'
                      ? 'bg-blue-50/80 border-blue-200'
                      : selectedOxide.nature === 'amfoterik'
                      ? 'bg-emerald-50/80 border-emerald-200'
                      : 'bg-orange-50/80 border-orange-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-extrabold text-slate-900">
                      Kesimpulan: {selectedOxide.natureLabel}
                    </span>
                    <span className="font-mono text-[10.5px] font-bold text-slate-700">
                      pH {selectedOxide.pHValueText}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-slate-700 leading-snug">
                    {selectedOxide.summaryNote}
                  </p>
                  {nextUntestedOxide && (
                    <button
                      type="button"
                      onClick={() => handleSelectOxide(nextUntestedOxide.id)}
                      className="w-full py-1.5 px-2.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-extrabold flex items-center justify-center gap-1 cursor-pointer transition"
                    >
                      <span>Uji Seterusnya: {nextUntestedOxide.formula}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-sky-50 border border-sky-200 rounded-lg p-2.5 text-[10.5px] text-sky-900 leading-snug">
                  <div className="font-extrabold flex items-center gap-1 mb-0.5">
                    <FlaskConical className="w-3.5 h-3.5 shrink-0" />
                    <span>Arahan Semasa:</span>
                  </div>
                  <p>
                    {tubeStage === 'idle'
                      ? `Klik "Masukkan ke Dalam 3 Tabung Uji" untuk memasukkan sampel ${selectedOxide.formula} ke dalam Air + Penunjuk Universal, HNO₃ dan NaOH.`
                      : tubeStage === 'added'
                      ? `Sampel ${selectedOxide.formula} telah dimasukkan! Klik "Panaskan & Kacau (Rod Kaca)" seperti Rajah 4.13 untuk melihat keterlarutan & tindak balas.`
                      : `Sedang memanaskan perlahan-lahan & mengacau campuran ${selectedOxide.formula}...`}
                  </p>
                </div>
              )}
            </div>

            {/* RIGHT: 3 Parallel Tubes Apparatus Diagram + Reagent Matrix Readout */}
            <div className="md:col-span-8 space-y-2.5">
              {/* SVG Apparatus */}
              <div className="bg-white border border-slate-200 rounded-xl p-2 shadow-xs">
                <div className="bg-slate-50/80 border border-dashed border-slate-300 rounded-lg p-1">
                  <Period3OxideTubesSVG
                    oxideFormula={selectedOxide.formula}
                    oxideName={selectedOxide.name}
                    physicalState={selectedOxide.physicalState}
                    stage={tubeStage}
                    waterIndicatorHex={selectedOxide.waterIndicatorHex}
                    waterIndicatorLabel={selectedOxide.waterIndicatorLabel}
                    pHValueText={selectedOxide.pHValueText}
                    solubleInWater={selectedOxide.solubleInWater}
                    reactsWithHNO3={selectedOxide.reactsWithHNO3}
                    reactsWithNaOH={selectedOxide.reactsWithNaOH}
                    hno3BadgeText={selectedOxide.hno3BadgeText}
                    naohBadgeText={selectedOxide.naohBadgeText}
                  />
                </div>
              </div>

              {/* 3-Reagent Testing Matrix Result Cards */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <div className="bg-slate-800 text-white px-3 py-1.5 flex items-center justify-between gap-2 text-xs font-extrabold">
                  <span>
                    Matriks Pemerhatian &amp; Persamaan Kimia ({selectedOxide.formula})
                  </span>
                  <span className="text-[10.5px] font-normal text-slate-300">
                    Air (10.0 cm³) · HNO₃ (5.0 cm³) · NaOH (5.0 cm³)
                  </span>
                </div>

                <div className="p-2.5 grid grid-cols-1 md:grid-cols-3 gap-2">
                  {/* Tube 1 Card */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10.5px] font-extrabold text-slate-800">
                        1. Air + Penunjuk Universal
                      </span>
                      {tubeStage === 'done' && (
                        <span
                          className="w-3 h-3 rounded-full border border-slate-400 shrink-0"
                          style={{ backgroundColor: selectedOxide.waterIndicatorHex }}
                        />
                      )}
                    </div>
                    {tubeStage === 'done' ? (
                      <>
                        <p className="text-[10px] text-slate-700 leading-snug">
                          {selectedOxide.waterObs}
                        </p>
                        <div className="font-mono text-[9.5px] font-bold text-slate-900 bg-white border border-slate-200 rounded px-1.5 py-1">
                          {selectedOxide.waterEq}
                        </div>
                      </>
                    ) : (
                      <p className="text-[10px] text-slate-400 italic">
                        Lengkapkan Langkah 1 &amp; 2 untuk merekod pH dan keterlarutan air.
                      </p>
                    )}
                  </div>

                  {/* Tube 2 Card */}
                  <div className="bg-rose-50/50 border border-rose-200 rounded-lg p-2 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10.5px] font-extrabold text-rose-900">
                        2. Asid Nitrik (HNO₃)
                      </span>
                      {tubeStage === 'done' && (
                        <span className="text-[9.5px] font-extrabold text-rose-800">
                          {selectedOxide.reactsWithHNO3 ? 'Larut' : 'Tidak Larut'}
                        </span>
                      )}
                    </div>
                    {tubeStage === 'done' ? (
                      <>
                        <p className="text-[10px] text-slate-700 leading-snug">
                          {selectedOxide.hno3Obs}
                        </p>
                        <div className="font-mono text-[9.5px] font-bold text-slate-900 bg-white border border-rose-200 rounded px-1.5 py-1">
                          {selectedOxide.hno3Eq}
                        </div>
                      </>
                    ) : (
                      <p className="text-[10px] text-slate-400 italic">
                        Menguji sama ada oksida bertindak sebagai bes.
                      </p>
                    )}
                  </div>

                  {/* Tube 3 Card */}
                  <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-2 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10.5px] font-extrabold text-blue-900">
                        3. Natrium Hidroksida (NaOH)
                      </span>
                      {tubeStage === 'done' && (
                        <span className="text-[9.5px] font-extrabold text-blue-800">
                          {selectedOxide.reactsWithNaOH ? 'Larut' : 'Tidak Larut'}
                        </span>
                      )}
                    </div>
                    {tubeStage === 'done' ? (
                      <>
                        <p className="text-[10px] text-slate-700 leading-snug">
                          {selectedOxide.naohObs}
                        </p>
                        <div className="font-mono text-[9.5px] font-bold text-slate-900 bg-white border border-blue-200 rounded px-1.5 py-1">
                          {selectedOxide.naohEq}
                        </div>
                      </>
                    ) : (
                      <p className="text-[10px] text-slate-400 italic">
                        Menguji sama ada oksida bertindak sebagai asid.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* TAB 2: JADUAL 4.8 & 4.9 FULL MATRIX + KSSM DISCUSSION */}
      {activeTab === 'matrix' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
          {/* Left: Consolidated Matrix Jadual 4.8 & 4.9 */}
          <div className="md:col-span-7 bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-extrabold text-slate-800">
                Jadual 4.8 &amp; 4.9: Keputusan Ujian Oksida Unsur Kala 3
              </h3>
              <button
                type="button"
                onClick={() => setShowAllMatrix((prev) => !prev)}
                className="px-2.5 py-1 rounded-md text-[10.5px] font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Eye className="w-3 h-3" />
                {showAllMatrix ? 'Papar Yang Diuji Sahaja' : 'Papar Semua Data Rujukan'}
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="text-left px-2 py-1.5 font-extrabold">Oksida</th>
                    <th className="text-center px-2 py-1.5 font-extrabold">Air &amp; pH</th>
                    <th className="text-center px-2 py-1.5 font-extrabold">Dengan HNO₃</th>
                    <th className="text-center px-2 py-1.5 font-extrabold">Dengan NaOH</th>
                    <th className="text-center px-2 py-1.5 font-extrabold">Sifat Oksida</th>
                  </tr>
                </thead>
                <tbody>
                  {PERIOD_3_OXIDES.map((ox) => {
                    const revealed = showAllMatrix || !!testedIds[ox.id];
                    return (
                      <tr key={ox.id} className="border-b border-slate-100 last:border-b-0">
                        <td className="px-2 py-1.5 font-bold text-slate-900 whitespace-nowrap">
                          <span className="font-mono">{ox.formula}</span>{' '}
                          <span className="text-[9.5px] font-normal text-slate-500">
                            ({ox.elementSymbol})
                          </span>
                        </td>
                        <td className="px-2 py-1.5 text-center font-mono">
                          {revealed ? `pH ${ox.pHValueText}` : '—'}
                        </td>
                        <td className="px-2 py-1.5 text-center">
                          {revealed ? ox.hno3BadgeText : '—'}
                        </td>
                        <td className="px-2 py-1.5 text-center">
                          {revealed ? ox.naohBadgeText : '—'}
                        </td>
                        <td className="px-2 py-1.5 text-center">
                          {revealed ? (
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full border text-[9.5px] font-extrabold ${getNatureBadgeClass(
                                ox.nature
                              )}`}
                            >
                              {ox.natureLabel}
                            </span>
                          ) : (
                            <span className="text-slate-400">Belum diuji</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-2.5 text-[11px] text-cyan-950 leading-snug">
              <strong>Kesimpulan Trend (Rajah 4.14):</strong> Merentasi Kala 3 dari kiri ke kanan, sifat oksida berubah daripada <strong>oksida bes</strong> (<span className="font-mono">Na₂O, MgO</span>) → <strong>oksida amfoterik</strong> (<span className="font-mono">Al₂O₃</span>) → <strong>oksida asid</strong> (<span className="font-mono">SiO₂, P₄O₁₀, SO₂, Cl₂O₇</span>).
            </div>
          </div>

          {/* Right: KSSM Discussion Q&A */}
          <div className="md:col-span-5 bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-extrabold text-slate-800">
                Perbincangan (Eksperimen 4.2 · m.s. 98)
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

export default Period3OxidesLab;
