import React, { useEffect, useState } from 'react';
import { analytics } from '../services/analytics';
import confetti from 'canvas-confetti';
import {
  Flame,
  RotateCcw,
  Sparkles,
  Magnet,
  FlaskConical,
  Factory,
  BookOpen,
  CheckCircle2,
  XCircle,
  Info,
  AlertTriangle,
} from 'lucide-react';
import { IronCrucibleSVG, OxideChoice } from '../components/IronCrucibleSVG';
import { BlastFurnaceSVG, FurnaceZoneId } from '../components/BlastFurnaceSVG';

type TabId = 'makmal' | 'industri' | 'kuiz';

interface OxideData {
  id: OxideChoice;
  formula: string;
  name: string;
  tag: string;
  initialColor: string;
  canReact: boolean;
  reactivityNote: string;
  glowObservation: string;
  productObservation: string;
  gasObservation: string;
  inference: string;
  wordEquation: string;
  chemEquation: string;
  redoxSummary: string;
}

const OXIDE_EXPERIMENTS: Record<OxideChoice, OxideData> = {
  fe2o3: {
    id: 'fe2o3',
    formula: 'Fe₂O₃',
    name: 'Ferum(III) oksida',
    tag: 'Utama (Bijih Hematit)',
    initialColor: 'Serbuk perang kemerahan + hitam',
    canReact: true,
    reactivityNote: 'Karbon lebih reaktif daripada ferum (C > Fe)',
    glowObservation: 'Campuran membara dengan terang dan menghasilkan percikan.',
    productObservation: 'Pepejal kelabu berkilat (logam ferum, Fe) terbentuk dan tertarik kepada magnet.',
    gasObservation: 'Gas CO₂ dibebaskan — mengeruhkan air kapur.',
    inference: 'Karbon menyingkirkan oksigen daripada Fe₂O₃. Besi dapat diekstrak melalui penurunan oleh karbon.',
    wordEquation: 'Ferum(III) oksida + Karbon → Ferum + Karbon dioksida',
    chemEquation: '2Fe₂O₃(p) + 3C(p) → 4Fe(p) + 3CO₂(g)',
    redoxSummary: 'Fe₂O₃ diturunkan (Fe³⁺ → Fe); Karbon dioksidakan (C → CO₂)',
  },
  al2o3: {
    id: 'al2o3',
    formula: 'Al₂O₃',
    name: 'Aluminium oksida',
    tag: 'Kawalan (Al > C)',
    initialColor: 'Serbuk putih + hitam',
    canReact: false,
    reactivityNote: 'Karbon kurang reaktif daripada aluminium (Al > C)',
    glowObservation: 'Tiada bara terang atau tindak balas cergas diperhatikan.',
    productObservation: 'Campuran kekal tidak berubah (tiada logam aluminium terbentuk).',
    gasObservation: 'Tiada gas CO₂ terbebas — air kapur kekal jernih.',
    inference: 'Karbon gagal menyingkirkan oksigen daripada Al₂O₃. Aluminium perlu diekstrak secara elektrolisis.',
    wordEquation: 'Aluminium oksida + Karbon → Tiada tindak balas',
    chemEquation: 'Al₂O₃(p) + C(p) → Tiada tindak balas',
    redoxSummary: 'Tiada pemindahan oksigen kerana kedudukan Al di atas karbon dalam Siri Kereaktifan',
  },
  pbo: {
    id: 'pbo',
    formula: 'PbO',
    name: 'Plumbum(II) oksida',
    tag: 'Pembanding (C > Pb)',
    initialColor: 'Serbuk kuning + hitam',
    canReact: true,
    reactivityNote: 'Karbon lebih reaktif daripada plumbum (C > Pb)',
    glowObservation: 'Campuran membara dengan nyalaan terang apabila dipanaskan.',
    productObservation: 'Butiran pepejal kelabu berkilat logam plumbum (Pb) terbentuk (tidak bermagnet).',
    gasObservation: 'Gas CO₂ dibebaskan — mengeruhkan air kapur.',
    inference: 'Karbon menyingkirkan oksigen daripada PbO kerana karbon terletak di atas plumbum.',
    wordEquation: 'Plumbum(II) oksida + Karbon → Plumbum + Karbon dioksida',
    chemEquation: '2PbO(p) + C(p) → 2Pb(p) + CO₂(g)',
    redoxSummary: 'PbO diturunkan (Pb²⁺ → Pb); Karbon dioksidakan (C → CO₂)',
  },
};

interface FurnaceZoneDetail {
  id: FurnaceZoneId;
  badge: string;
  title: string;
  temp: string;
  thermoType: string;
  equations: string[];
  explanation: string;
  keyPoint: string;
}

const FURNACE_ZONES: Record<FurnaceZoneId, FurnaceZoneDetail> = {
  feed: {
    id: 'feed',
    badge: 'Bahan Mentah',
    title: 'Campuran Bijih Besi, Arang Kok & Batu Kapur',
    temp: 'Puncak Relau Bagas',
    thermoType: 'Input Berterusan',
    equations: [
      'Bijih besi utama: Hematit (Fe₂O₃)',
      'Contoh bijih lain: Magnetit (Fe₃O₄), Pirit besi (FeS₂), Siderit (FeCO₃)',
    ],
    explanation:
      'Campuran hematit (Fe₂O₃), arang kok (karbon, C) dan batu kapur (kalsium karbonat, CaCO₃) dimasukkan dari puncak relau bagas secara berterusan.',
    keyPoint: 'Arang kok bertindak sebagai bahan api dan agen penurunan; batu kapur pula menyingkirkan bendasing pasir (SiO₂).',
  },
  zone1: {
    id: 'zone1',
    badge: 'Zon 1 (Bawah)',
    title: 'Pembakaran Arang Kok dengan Udara Panas',
    temp: 'Mencecah 1600 °C',
    thermoType: 'Tindak Balas Eksotermik',
    equations: ['C(p) + O₂(g) → CO₂(g)'],
    explanation:
      'Udara panas ditiup masuk melalui bahagian bawah relau. Arang kok (C) terbakar dalam oksigen (O₂) menghasilkan gas karbon dioksida (CO₂). Tindak balas redoks eksotermik ini membebaskan haba tinggi hingga 1600 °C.',
    keyPoint: 'C dioksidakan kepada CO₂ manakala O₂ diturunkan.',
  },
  zone2: {
    id: 'zone2',
    badge: 'Zon 2 (Tengah)',
    title: 'Pembentukan Agen Penurunan Karbon Monoksida',
    temp: '~1000 °C – 1200 °C',
    thermoType: 'Tindak Balas Endotermik',
    equations: ['C(p) + CO₂(g) → 2CO(g)'],
    explanation:
      'Gas CO₂ yang naik ke atas bertindak balas dengan arang kok panas yang masih berbaki membentuk gas karbon monoksida (CO). Tindak balas endotermik ini menyerap haba lalu menurunkan suhu pada Zon 2.',
    keyPoint: 'Karbon monoksida, CO ialah agen penurunan utama yang menurunkan ferum(III) oksida pada Zon 3.',
  },
  zone3: {
    id: 'zone3',
    badge: 'Zon 3 (Atas)',
    title: 'Penurunan Ferum(III) Oksida kepada Leburan Besi',
    temp: '~500 °C – 900 °C',
    thermoType: 'Penurunan Redoks',
    equations: [
      '2Fe₂O₃(p) + 3C(p) → 4Fe(ce) + 3CO₂(g)',
      'Fe₂O₃(p) + 3CO(g) → 2Fe(ce) + 3CO₂(g)',
    ],
    explanation:
      'Arang kok (C) dan gas karbon monoksida (CO) menurunkan ferum(III) oksida (Fe₂O₃) kepada leburan besi (Fe). Enapan leburan besi yang tumpat mengalir turun dan berkumpul di dasar relau bagas.',
    keyPoint: 'Nombor pengoksidaan Fe berkurang daripada +3 dalam Fe₂O₃ kepada 0 dalam Fe.',
  },
  slag: {
    id: 'slag',
    badge: 'Pengasingan Sanga',
    title: 'Peranan Batu Kapur & Pembentukan Sanga (CaSiO₃)',
    temp: 'Dasar Relau (Ketumpatan Berbeza)',
    thermoType: 'Penguraian Terma + Peneutralan',
    equations: [
      'CaCO₃(p) → CaO(p) + CO₂(g)',
      'CaO(p) + SiO₂(p) → CaSiO₃(ce)  [Sanga]',
    ],
    explanation:
      'Pada suhu tinggi, kalsium karbonat (CaCO₃) terurai kepada kalsium oksida, CaO (kapur tohor). CaO yang bersifat bes meneutralkan bendasing pasir/silikon(IV) oksida (SiO₂) yang bersifat asid membentuk sanga atau kalsium silikat (CaSiO₃).',
    keyPoint: 'Sanga kurang tumpat daripada leburan besi → terapung di lapisan atas dan mudah disalurkan keluar berasingan (diguna buat jalan raya/simen).',
  },
};

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Apakah pemerhatian apabila campuran serbuk ferum(III) oksida dan karbon dipanaskan kuat di dalam mangkuk pijar?',
    options: [
      'Tiada sebarang perubahan kerana ferum lebih reaktif daripada karbon',
      'Campuran membara terang, menghasilkan pepejal kelabu berkilat yang tertarik pada magnet serta membebaskan gas CO₂',
      'Hanya gas oksigen tulen dibebaskan tanpa perubahan warna serbuk',
      'Campuran melebur menjadi cecair biru jernih',
    ],
    correctIdx: 1,
    explanation:
      'Karbon lebih reaktif daripada ferum, maka karbon menyingkirkan oksigen daripada Fe₂O₃ (perang kemerahan) menghasilkan logam Fe (kelabu berkilat, bermagnet) dan gas CO₂.',
  },
  {
    id: 2,
    question: 'Mengapakah campuran aluminium oksida dan karbon TIDAK bertindak balas walaupun dipanaskan dengan kuat?',
    options: [
      'Aluminium oksida tidak mengandungi oksigen',
      'Karbon terlalu reaktif dan meletup sebelum bertindak balas',
      'Aluminium berada di atas karbon dalam Siri Kereaktifan Logam (kurang stabil untuk diturunkan oleh karbon)',
      'Mangkuk pijar menyerap semua haba penunu Bunsen',
    ],
    correctIdx: 2,
    explanation:
      'Aluminium lebih reaktif daripada karbon. Oleh itu karbon tidak dapat menyingkirkan oksigen daripada Al₂O₃ dan aluminium diekstrak melalui elektrolisis leburan.',
  },
  {
    id: 3,
    question: 'Di dalam relau bagas (Rajah 1.38), tindak balas manakah berlaku di Zon 2 yang menghasilkan agen penurunan utama?',
    options: [
      'C(p) + O₂(g) → CO₂(g) (Eksotermik)',
      'C(p) + CO₂(g) → 2CO(g) (Endotermik)',
      'CaCO₃(p) → CaO(p) + CO₂(g)',
      'CaO(p) + SiO₂(p) → CaSiO₃(ce)',
    ],
    correctIdx: 1,
    explanation:
      'Pada Zon 2 (~1000–1200 °C), gas CO₂ dari Zon 1 bertindak balas secara endotermik dengan arang kok berbaki membentuk gas karbon monoksida (CO), agen penurunan utama bagi Fe₂O₃.',
  },
  {
    id: 4,
    question: 'Apakah fungsi kalsium karbonat (batu kapur) dalam pengekstrakan besi menggunakan relau bagas?',
    options: [
      'Menurunkan takat lebur hematit daripada 2000 °C ke 950 °C',
      'Bertindak sebagai mangkin untuk memecahkan molekul CO₂',
      'Terurai menjadi CaO (bes) untuk meneutralkan bendasing pasir SiO₂ (asid) membentuk sanga, CaSiO₃',
      'Menukarkan gas nitrogen kepada baja ammonia',
    ],
    correctIdx: 2,
    explanation:
      'Batu kapur terurai kepada CaO yang meneutralkan bendasing SiO₂ membentuk sanga (CaSiO₃). Sanga kurang tumpat lalu terapung di atas leburan besi untuk diasingkan.',
  },
];

export const IronExtractionLab: React.FC = () => {
  const SIM_ID = 'pengekstrakan-besi';

  const [activeTab, setActiveTab] = useState<TabId>('makmal');

  // Tab 1: Laboratory Crucible Simulation State
  const [oxideId, setOxideId] = useState<OxideChoice>('fe2o3');
  const [heating, setHeating] = useState(false);
  const [tempCelsius, setTempCelsius] = useState(28);
  const [hasReacted, setHasReacted] = useState(false);
  const [magnetTestActive, setMagnetTestActive] = useState(false);
  const [limewaterTestActive, setLimewaterTestActive] = useState(false);

  // Tab 2: Industrial Blast Furnace State
  const [activeZone, setActiveZone] = useState<FurnaceZoneId>('zone3');
  const [furnaceOn, setFurnaceOn] = useState(true);

  // Tab 3: Interactive Knowledge & Quiz State
  const [showExhaustAnswer, setShowExhaustAnswer] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  const oxide = OXIDE_EXPERIMENTS[oxideId];
  const zoneDetail = FURNACE_ZONES[activeZone];

  // Temperature ramp & reaction completion timer when heating in lab
  useEffect(() => {
    if (!heating) return;

    const timer = window.setInterval(() => {
      setTempCelsius((prev) => {
        if (prev >= 850) return 850;
        return Math.min(850, prev + 75);
      });
    }, 180);

    return () => window.clearInterval(timer);
  }, [heating]);

  useEffect(() => {
    if (heating && tempCelsius >= 750 && !hasReacted) {
      setHasReacted(true);
      if (oxide.canReact) {
        analytics.recordSimulationCompleted(SIM_ID);
        confetti({ particleCount: 55, spread: 50 });
      }
    }
  }, [heating, tempCelsius, hasReacted, oxide.canReact]);

  const handleSelectOxide = (choice: OxideChoice) => {
    setOxideId(choice);
    setHeating(false);
    setTempCelsius(28);
    setHasReacted(false);
    setMagnetTestActive(false);
    analytics.recordSimulationClick(SIM_ID);
  };

  const handleToggleHeating = () => {
    if (!heating) {
      setHeating(true);
      analytics.recordSimulationClick(SIM_ID);
    } else {
      setHeating(false);
    }
  };

  const handleResetAll = () => {
    setOxideId('fe2o3');
    setHeating(false);
    setTempCelsius(28);
    setHasReacted(false);
    setMagnetTestActive(false);
    setLimewaterTestActive(false);
    setActiveZone('zone3');
    setFurnaceOn(true);
    setQuizAnswers({});
    setShowExhaustAnswer(false);
    analytics.recordSimulationClick(SIM_ID);
  };

  return (
    <div className="space-y-2.5">
      {/* Compact Single-Row Header Strip */}
      <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-slate-50 border border-orange-200 rounded-xl px-3.5 py-2 flex flex-wrap md:flex-nowrap items-center justify-between gap-2">
        <div className="text-xs text-slate-700 leading-snug">
          <span className="font-bold text-orange-800">SP 1.5.2 • Penurunan oleh Karbon (m.s. 50):</span>{' '}
          Besi kurang reaktif daripada karbon (Al &gt; <strong>C</strong> &gt; Fe) ➜{' '}
          <strong>penurunan ferum(III) oksida (Fe₂O₃) oleh karbon</strong>.
        </div>
        <button
          type="button"
          onClick={handleResetAll}
          className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition cursor-pointer shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Set Semula
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-2">
        {[
          { id: 'makmal' as TabId, label: '1. Eksperimen Makmal: Fe₂O₃ + Karbon', icon: FlaskConical },
          { id: 'industri' as TabId, label: '2. Skala Industri: Relau Bagas (Rajah 1.38)', icon: Factory },
          { id: 'kuiz' as TabId, label: '3. Maklumat Tambahan, Cabaran Minda & Kuiz', icon: BookOpen },
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
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ================= TAB 1: LABORATORY EXPERIMENT (Fe2O3 + Carbon) ================= */}
      {activeTab === 'makmal' && (
        <div className="space-y-2.5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
            {/* Left 7 cols: Crucible Lab Diagram */}
            <div className="md:col-span-7 bg-white border border-slate-200 rounded-xl p-2.5 shadow-xs flex flex-col justify-between">
              <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
                  Susunan Radas Makmal (Buku Teks)
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      heating ? 'bg-orange-100 text-orange-800' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Flame className="w-3 h-3" />
                    {heating ? `Dipanaskan (${tempCelsius} °C)` : `Suhu Bilik (${tempCelsius} °C)`}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      hasReacted && oxide.canReact
                        ? 'bg-emerald-100 text-emerald-800'
                        : hasReacted && !oxide.canReact
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {hasReacted && oxide.canReact
                      ? 'Tindak Balas Berlaku'
                      : hasReacted && !oxide.canReact
                      ? 'Tiada Tindak Balas'
                      : 'Sedia Dipanaskan'}
                  </span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden bg-[#f8fafc]">
                <IronCrucibleSVG
                  oxideId={oxideId}
                  heating={heating}
                  hasReacted={hasReacted}
                  canReact={oxide.canReact}
                  magnetTestActive={magnetTestActive}
                  limewaterTestActive={limewaterTestActive}
                  tempCelsius={tempCelsius}
                />
              </div>

              <div className="mt-1.5 flex flex-wrap items-center justify-between gap-1.5 text-[10.5px] text-slate-600 px-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-orange-800">{oxide.initialColor}</span>
                  <span>➜</span>
                  <span className="font-bold text-slate-800">
                    {hasReacted
                      ? oxide.canReact
                        ? oxideId === 'fe2o3'
                          ? 'Kelabu berkilat (Fe) + Gas CO₂'
                          : 'Kelabu plumbum (Pb) + Gas CO₂'
                        : 'Tiada perubahan warna'
                      : 'Nyalakan Penunu Bunsen'}
                  </span>
                </div>
                <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  Siri: Al &gt; [C] &gt; Zn &gt; Fe &gt; Pb
                </span>
              </div>
            </div>

            {/* Right 5 cols: Controls & Live Lab Observations */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-2">
              {/* Step-by-Step Experiment Controls */}
              <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-xs space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-1">
                  <FlaskConical className="w-3.5 h-3.5 text-orange-600" />
                  Kawalan Eksperimen Makmal
                </h4>

                {/* Step 1: Select Oxide */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-slate-700">
                    1. Pilih Oksida Logam (+ Serbuk Karbon, C):
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['fe2o3', 'al2o3', 'pbo'] as OxideChoice[]).map((id) => {
                      const item = OXIDE_EXPERIMENTS[id];
                      const selected = oxideId === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          data-testid={`select-oxide-${id}`}
                          onClick={() => handleSelectOxide(id)}
                          className={`p-1.5 rounded-lg border text-left transition cursor-pointer ${
                            selected
                              ? 'bg-orange-600 border-orange-700 text-white shadow-xs'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-orange-50'
                          }`}
                        >
                          <div className="font-mono font-extrabold text-xs">{item.formula}</div>
                          <div className={`text-[9.5px] leading-tight mt-0.5 ${selected ? 'text-orange-100' : 'text-slate-500'}`}>
                            {item.tag}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Heat with Bunsen Burner */}
                <button
                  type="button"
                  data-testid="toggle-bunsen-btn"
                  onClick={handleToggleHeating}
                  className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer ${
                    heating
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-orange-600 hover:bg-orange-700 text-white'
                  }`}
                >
                  <Flame className={`w-4 h-4 ${heating ? 'animate-pulse text-amber-200' : ''}`} />
                  {heating ? 'Padamkan Penunu Bunsen' : '2. Panaskan Kuat dengan Penunu Bunsen'}
                </button>

                {/* Step 3: Product Confirmation Tests */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    data-testid="magnet-test-btn"
                    onClick={() => {
                      setMagnetTestActive((v) => !v);
                      analytics.recordSimulationClick(SIM_ID);
                    }}
                    className={`py-2 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 border transition cursor-pointer ${
                      magnetTestActive
                        ? 'bg-indigo-600 border-indigo-700 text-white shadow-xs'
                        : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    <Magnet className="w-3.5 h-3.5 shrink-0" />
                    <span>{magnetTestActive ? 'Tutup Magnet' : '3a. Uji Magnet'}</span>
                  </button>

                  <button
                    type="button"
                    data-testid="limewater-test-btn"
                    onClick={() => {
                      setLimewaterTestActive((v) => !v);
                      analytics.recordSimulationClick(SIM_ID);
                    }}
                    className={`py-2 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 border transition cursor-pointer ${
                      limewaterTestActive
                        ? 'bg-sky-600 border-sky-700 text-white shadow-xs'
                        : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    <FlaskConical className="w-3.5 h-3.5 shrink-0" />
                    <span>{limewaterTestActive ? 'Tutup Air Kapur' : '3b. Uji Air Kapur'}</span>
                  </button>
                </div>
              </div>

              {/* Observations & Inference Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-xs space-y-1.5 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1">
                    <span className="text-xs font-bold text-slate-900">
                      Pemerhatian: {oxide.name}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-200 shrink-0">
                      {oxide.id === 'fe2o3' ? 'C > Fe' : oxide.id === 'al2o3' ? 'Al > C' : 'C > Pb'}
                    </span>
                  </div>

                  {!hasReacted ? (
                    <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600 flex items-start gap-2">
                      <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>
                        {heating
                          ? `Sedang memanaskan ${oxide.name} + serbuk karbon (${tempCelsius} °C)... Tunggu sehingga suhu tindak balas dicapai!`
                          : `Tekan "Panaskan Kuat dengan Penunu Bunsen" untuk memerhati sama ada karbon dapat menyingkirkan oksigen daripada ${oxide.formula}.`}
                      </span>
                    </div>
                  ) : (
                    <div
                      className={`p-2 rounded-lg border text-[11px] ${
                        oxide.canReact
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                          : 'bg-rose-50 border-rose-200 text-rose-950'
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1">
                        {oxide.canReact ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        )}
                        <span>Pemerhatian Makmal:</span>
                      </div>
                      <ul className="mt-0.5 space-y-0.5 list-disc list-inside leading-snug">
                        <li>{oxide.glowObservation}</li>
                        <li>{oxide.productObservation}</li>
                      </ul>
                    </div>
                  )}
                </div>

                <div className="p-2 bg-amber-50/80 border border-amber-200 rounded-lg text-[11px] text-amber-950 leading-snug">
                  <strong>Inferens:</strong> {oxide.inference}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Strip: Balanced Chemical & Word Equations visible on Tab 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="bg-orange-50/80 border border-orange-200 rounded-xl px-3 py-1.5">
              <div className="text-[10px] font-extrabold uppercase text-orange-800">Persamaan Perkataan</div>
              <div className="font-semibold text-[11.5px] text-orange-950 mt-0.5 leading-snug">{oxide.wordEquation}</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-white">
              <div className="text-[10px] font-extrabold uppercase text-amber-300">Persamaan Kimia Seimbang</div>
              <div className="font-mono font-bold text-xs sm:text-[13px] text-white mt-0.5">{oxide.chemEquation}</div>
            </div>

            <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl px-3 py-1.5">
              <div className="text-[10px] font-extrabold uppercase text-emerald-800">Proses Redoks Terlibat</div>
              <div className="text-[11.5px] font-semibold text-emerald-950 mt-0.5 leading-snug">{oxide.redoxSummary}</div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: INDUSTRIAL BLAST FURNACE (RELAU BAGAS - RAJAH 1.38) ================= */}
      {activeTab === 'industri' && (
        <div className="space-y-2.5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
            {/* Left 7 cols: Textbook Rajah 1.38 Blast Furnace Diagram */}
            <div className="md:col-span-7 bg-white border border-slate-200 rounded-xl p-2.5 shadow-xs flex flex-col justify-between">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
                  Skala Industri: Relau Bagas (Rajah 1.38 · m.s. 50)
                </span>
                <button
                  type="button"
                  data-testid="toggle-blast-furnace"
                  onClick={() => {
                    setFurnaceOn((v) => !v);
                    analytics.recordSimulationClick(SIM_ID);
                  }}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 transition cursor-pointer ${
                    furnaceOn
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  <Flame className={`w-3 h-3 ${furnaceOn ? 'text-orange-600 animate-pulse' : ''}`} />
                  {furnaceOn ? 'Relau Beroperasi (1600 °C)' : 'Relau Dimatikan'}
                </button>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden bg-[#fff7ed]">
                <BlastFurnaceSVG
                  activeZone={activeZone}
                  onSelectZone={(z) => {
                    setActiveZone(z);
                    analytics.recordSimulationClick(SIM_ID);
                  }}
                  furnaceOn={furnaceOn}
                />
              </div>

              {/* Zone quick-switch bar */}
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {(['feed', 'zone3', 'zone2', 'zone1', 'slag'] as FurnaceZoneId[]).map((z) => (
                  <button
                    key={z}
                    type="button"
                    onClick={() => {
                      setActiveZone(z);
                      analytics.recordSimulationClick(SIM_ID);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      activeZone === z
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-orange-100'
                    }`}
                  >
                    {FURNACE_ZONES[z].badge}
                  </button>
                ))}
              </div>
            </div>

            {/* Right 5 cols: Complete Industrial Explanation & Equations */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-2">
              {/* Active Zone Explanation */}
              <div className="bg-orange-50/70 border border-orange-200 rounded-xl p-2.5 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white text-orange-800 px-2 py-0.5 rounded-full border border-orange-200">
                    {zoneDetail.badge} • {zoneDetail.thermoType}
                  </span>
                  <span className="text-[10.5px] font-mono font-bold text-orange-950">{zoneDetail.temp}</span>
                </div>

                <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">{zoneDetail.title}</h4>
                <p className="text-[11.5px] text-slate-700 leading-snug">{zoneDetail.explanation}</p>

                <div className="space-y-1">
                  <div className="text-[10px] font-extrabold uppercase text-slate-500">Persamaan Kimia Zon Ini:</div>
                  {zoneDetail.equations.map((eq, i) => (
                    <div
                      key={i}
                      className="font-mono font-bold text-[11.5px] bg-white px-2.5 py-1 rounded-lg border border-orange-200 text-slate-900 text-center"
                    >
                      {eq}
                    </div>
                  ))}
                </div>

                <div className="p-1.5 bg-white/90 border border-orange-200 rounded-lg text-[10.5px] text-orange-950 leading-snug">
                  <strong>Fakta Penting:</strong> {zoneDetail.keyPoint}
                </div>
              </div>

              {/* Compact All-Zones Overview Table */}
              <div className="bg-white border border-slate-200 rounded-xl p-2.5 space-y-1">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
                  Aliran Lengkap Relau Bagas (Bawah → Atas → Dasar)
                </div>
                <div className="space-y-1 text-[10.5px]">
                  <div className="px-2 py-1 rounded bg-amber-50 border border-amber-200 flex justify-between gap-2">
                    <span className="font-bold text-amber-900">Zon 1 (1600 °C)</span>
                    <span className="font-mono text-amber-950">C + O₂ → CO₂ (Eksotermik)</span>
                  </div>
                  <div className="px-2 py-1 rounded bg-orange-50 border border-orange-200 flex justify-between gap-2">
                    <span className="font-bold text-orange-900">Zon 2 (~1100 °C)</span>
                    <span className="font-mono text-orange-950">C + CO₂ → 2CO (Endotermik)</span>
                  </div>
                  <div className="px-2 py-1 rounded bg-red-50 border border-red-200 flex justify-between gap-2">
                    <span className="font-bold text-red-900">Zon 3 (~700 °C)</span>
                    <span className="font-mono text-red-950">Fe₂O₃ + 3CO → 2Fe + 3CO₂</span>
                  </div>
                  <div className="px-2 py-1 rounded bg-slate-100 border border-slate-200 flex justify-between gap-2">
                    <span className="font-bold text-slate-800">Bendasing (Sanga)</span>
                    <span className="font-mono text-slate-900">CaO + SiO₂ → CaSiO₃ (Terapung)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: COMPARISON, CABARAN MINDA & KUIZ ================= */}
      {activeTab === 'kuiz' && (
        <div className="space-y-3">
          {/* Top Grid: Lab vs Industry Comparison + Cabaran Minda & Termit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Comparison + Additional Notes */}
            <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2.5">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-1.5">
                Perbandingan Makmal vs Skala Industri &amp; Nota KSSM (m.s. 50–51)
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-orange-50/70 border border-orange-200 rounded-lg space-y-1">
                  <div className="font-bold text-orange-900">Skala Makmal (Mangkuk Pijar)</div>
                  <p className="text-[11px] text-slate-700 leading-snug">
                    Menggunakan serbuk Fe₂O₃ + serbuk karbon (C) dipanaskan penunu Bunsen. Hanya C sebagai agen penurunan secara langsung.
                  </p>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <div className="font-bold text-slate-900">Skala Industri (Relau Bagas)</div>
                  <p className="text-[11px] text-slate-700 leading-snug">
                    Menggunakan bijih besi, arang kok (C), udara panas &amp; batu kapur (CaCO₃). Melibatkan C &amp; gas CO serta pengasingan sanga (CaSiO₃).
                  </p>
                </div>
              </div>

              <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-lg space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-xs text-purple-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    Cabaran Minda (m.s. 50): Gas Buangan Relau Bagas
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowExhaustAnswer((v) => !v)}
                    className="px-2 py-0.5 rounded bg-purple-600 hover:bg-purple-700 text-white text-[10.5px] font-bold cursor-pointer"
                  >
                    {showExhaustAnswer ? 'Tutup Jawapan' : 'Semak Jawapan'}
                  </button>
                </div>
                <p className="text-[11px] text-purple-950">
                  <strong>Soalan:</strong> Apakah gas-gas yang terdapat dalam gas buangan relau bagas?
                </p>
                {showExhaustAnswer && (
                  <p className="text-[11px] bg-white p-2 rounded border border-purple-200 text-slate-800">
                    Gas buangan terdiri daripada gas <strong>nitrogen (N₂)</strong> daripada udara panas,{' '}
                    <strong>karbon dioksida (CO₂)</strong> hasil tindak balas, dan <strong>karbon monoksida (CO)</strong> yang tidak bertindak balas.
                  </p>
                )}
              </div>

              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-950 leading-snug">
                <strong>Link Tindak Balas Termit (m.s. 51):</strong> Serbuk Al yang lebih reaktif juga dapat menurunkan Fe₂O₃ membebaskan leburan besi untuk mengimpal landasan kereta api:{' '}
                <span className="font-mono font-bold">Fe₂O₃(p) + 2Al(p) → Al₂O₃(p) + 2Fe(ce)</span>.
              </div>
            </div>

            {/* Interactive KSSM Quiz */}
            <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2.5">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-1.5">
                Kuiz Pantas KSSM: Pengekstrakan Besi (SP 1.5.2)
              </h4>

              <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                {QUIZ_QUESTIONS.map((q) => {
                  const chosen = quizAnswers[q.id];
                  const answered = chosen !== undefined;
                  return (
                    <div key={q.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                      <p className="text-xs font-bold text-slate-900">
                        {q.id}. {q.question}
                      </p>
                      <div className="grid grid-cols-1 gap-1">
                        {q.options.map((opt, idx) => {
                          const isSelected = chosen === idx;
                          const isCorrect = idx === q.correctIdx;
                          let style = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';
                          if (answered) {
                            if (isCorrect) style = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                            else if (isSelected) style = 'bg-red-50 border-red-400 text-red-950 font-semibold';
                          }
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setQuizAnswers((prev) => ({ ...prev, [q.id]: idx }));
                                analytics.recordSimulationClick(SIM_ID);
                              }}
                              className={`text-left text-[11px] px-2.5 py-1.5 rounded-md border flex items-center justify-between gap-2 transition cursor-pointer ${style}`}
                            >
                              <span>{opt}</span>
                              {answered && isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                              {answered && isSelected && !isCorrect && (
                                <XCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                      {answered && (
                        <div className="p-2 bg-white border border-slate-200 rounded text-[11px] text-slate-700 leading-snug">
                          <strong>Penerangan:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
