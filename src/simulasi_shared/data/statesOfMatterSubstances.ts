export type ParticleCategory = 'atom' | 'molecule' | 'ion';

export type SubstanceId =
  | 'air'
  | 'naftalena'
  | 'karbon_dioksida'
  | 'oksigen'
  | 'helium'
  | 'natrium'
  | 'natrium_klorida'
  | 'kuprum_sulfat';

export type PhaseBehavior = 'three' | 'sublimation' | 'decomposes';

export type PhysicalState =
  | 'solid'
  | 'melting_freezing'
  | 'liquid'
  | 'boiling_condensing'
  | 'gas'
  | 'subliming_depositing'
  | 'decomposing';

export type ThermalDirection = 'heating' | 'cooling';

export type ProcessId =
  | 'peleburan'
  | 'pembekuan'
  | 'pendidihan'
  | 'kondensasi'
  | 'pemejalwapan'
  | 'pengendapan';

export interface SubstancePreset {
  label: string;
  tempC: number;
  directionHint?: ThermalDirection;
}

export interface SubstanceSpec {
  id: SubstanceId;
  name: string;
  formula: string;
  particleCategory: ParticleCategory;
  particleDescription: string;
  phaseBehavior: PhaseBehavior;
  /** Numeric melting point in °C (used for threshold markers / slider mapping where applicable). */
  meltingPointC: number | null;
  /** Numeric freezing point in °C. */
  freezingPointC: number | null;
  /** Numeric boiling or 1-atm sublimation/decomposition point in °C. */
  boilingPointC: number | null;
  /** Threshold for 2-stage transitions (sublimation or decomposition) in °C. */
  transitionPointC?: number;
  /** Display strings for the 3 mandatory temperature badges. */
  meltingDisplay: string;
  meltingNote?: string;
  freezingDisplay: string;
  freezingNote?: string;
  boilingDisplay: string;
  boilingNote?: string;
  minTempC: number;
  maxTempC: number;
  defaultTempC: number;
  roomStateLabel: string;
  colorTheme: {
    pillBg: string;
    pillBorder: string;
    pillText: string;
    primary: string;
    secondary: string;
    liquidPool: string;
    accentBadge: string;
  };
  scientificNote: string;
  presets: SubstancePreset[];
}

export const SLIDER_MAX = 1000;
const POS_MELT = 280;
const POS_BOIL = 720;
const POS_TWO_STAGE = 460;
const TRANSITION_WINDOW = 10;

export const MATTER_SUBSTANCES: SubstanceSpec[] = [
  {
    id: 'air',
    name: 'Air',
    formula: 'H₂O',
    particleCategory: 'molecule',
    particleDescription: 'Molekul kovalen bengkok (1 atom O + 2 atom H) dengan ikatan hidrogen antara molekul.',
    phaseBehavior: 'three',
    meltingPointC: 0,
    freezingPointC: 0,
    boilingPointC: 100,
    meltingDisplay: '0 °C',
    freezingDisplay: '0 °C',
    boilingDisplay: '100 °C',
    minTempC: -40,
    maxTempC: 150,
    defaultTempC: 25,
    roomStateLabel: 'Cecair',
    colorTheme: {
      pillBg: 'bg-sky-50',
      pillBorder: 'border-sky-300',
      pillText: 'text-sky-800',
      primary: '#0284c7',
      secondary: '#e0f2fe',
      liquidPool: 'rgba(14, 165, 233, 0.22)',
      accentBadge: 'bg-sky-100 text-sky-800 border-sky-200',
    },
    scientificNote:
      'Pada 1 atm, air wujud sebagai ais (pepejal) di bawah 0 °C, cecair dari 0 °C hingga 100 °C, dan stim (gas) melebihi 100 °C.',
    presets: [
      { label: 'Ais (-20 °C)', tempC: -20, directionHint: 'cooling' },
      { label: 'T. Lebur / Beku (0 °C)', tempC: 0 },
      { label: 'Suhu Bilik (25 °C)', tempC: 25 },
      { label: 'T. Didih (100 °C)', tempC: 100, directionHint: 'heating' },
      { label: 'Stim (130 °C)', tempC: 130, directionHint: 'heating' },
    ],
  },
  {
    id: 'naftalena',
    name: 'Naftalena',
    formula: 'C₁₀H₈',
    particleCategory: 'molecule',
    particleDescription: 'Molekul organik ringkas (kovalen) dengan daya tarikan van der Waals yang lemah antara molekul.',
    phaseBehavior: 'three',
    meltingPointC: 80,
    freezingPointC: 80,
    boilingPointC: 218,
    meltingDisplay: '80 °C',
    meltingNote: 'Aktiviti 2.2 (m.s. 27–28)',
    freezingDisplay: '80 °C',
    freezingNote: 'Suhu malar (Rajah 2.7)',
    boilingDisplay: '218 °C',
    minTempC: 20,
    maxTempC: 260,
    defaultTempC: 25,
    roomStateLabel: 'Pepejal',
    colorTheme: {
      pillBg: 'bg-violet-50',
      pillBorder: 'border-violet-300',
      pillText: 'text-violet-800',
      primary: '#7c3aed',
      secondary: '#ede9fe',
      liquidPool: 'rgba(139, 92, 246, 0.2)',
      accentBadge: 'bg-violet-100 text-violet-800 border-violet-200',
    },
    scientificNote:
      'Bahan piawai Aktiviti 2.2 KSSM Tingkatan 4: melebur dan membeku pada suhu malar 80 °C (kukus air digunakan supaya pemanasan sekata).',
    presets: [
      { label: 'Suhu Bilik (25 °C)', tempC: 25, directionHint: 'cooling' },
      { label: 'T. Lebur / Beku (80 °C)', tempC: 80 },
      { label: 'Cecair (130 °C)', tempC: 130, directionHint: 'heating' },
      { label: 'T. Didih (218 °C)', tempC: 218, directionHint: 'heating' },
      { label: 'Wap (245 °C)', tempC: 245, directionHint: 'heating' },
    ],
  },
  {
    id: 'karbon_dioksida',
    name: 'Karbon Dioksida',
    formula: 'CO₂',
    particleCategory: 'molecule',
    particleDescription: 'Molekul kovalen linear (O=C=O) dengan daya tarikan van der Waals yang sangat lemah.',
    phaseBehavior: 'sublimation',
    meltingPointC: -56.6,
    freezingPointC: -56.6,
    boilingPointC: -78.5,
    transitionPointC: -78.5,
    meltingDisplay: '-56.6 °C*',
    meltingNote: '@ 5.1 atm (tiada cecair pd 1 atm)',
    freezingDisplay: '-56.6 °C*',
    freezingNote: '@ 5.1 atm',
    boilingDisplay: '-78.5 °C',
    boilingNote: 'Takat pemejalwapan @ 1 atm',
    minTempC: -115,
    maxTempC: 40,
    defaultTempC: 25,
    roomStateLabel: 'Gas',
    colorTheme: {
      pillBg: 'bg-slate-100',
      pillBorder: 'border-slate-300',
      pillText: 'text-slate-800',
      primary: '#475569',
      secondary: '#f1f5f9',
      liquidPool: 'rgba(100, 116, 139, 0.16)',
      accentBadge: 'bg-slate-100 text-slate-800 border-slate-300',
    },
    scientificNote:
      'Pada tekanan atmosfera 1 atm, pepejal CO₂ (ais kering) tidak melebur kepada cecair sebaliknya memejalwap terus kepada gas pada -78.5 °C.',
    presets: [
      { label: 'Ais Kering (-100 °C)', tempC: -100, directionHint: 'cooling' },
      { label: 'Pemejalwapan (-78.5 °C)', tempC: -78.5 },
      { label: 'Suhu Bilik (25 °C)', tempC: 25, directionHint: 'heating' },
    ],
  },
  {
    id: 'oksigen',
    name: 'Oksigen',
    formula: 'O₂',
    particleCategory: 'molecule',
    particleDescription: 'Molekul unsur dwiatom (O=O) dengan daya tarikan van der Waals yang sangat lemah.',
    phaseBehavior: 'three',
    meltingPointC: -219,
    freezingPointC: -219,
    boilingPointC: -183,
    meltingDisplay: '-219 °C',
    meltingNote: 'Jadual Data Unsur m.s. 276',
    freezingDisplay: '-219 °C',
    boilingDisplay: '-183 °C',
    boilingNote: 'Jadual Data Unsur m.s. 276',
    minTempC: -250,
    maxTempC: 35,
    defaultTempC: 25,
    roomStateLabel: 'Gas',
    colorTheme: {
      pillBg: 'bg-cyan-50',
      pillBorder: 'border-cyan-300',
      pillText: 'text-cyan-900',
      primary: '#0891b2',
      secondary: '#cffafe',
      liquidPool: 'rgba(6, 182, 212, 0.24)',
      accentBadge: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    },
    scientificNote:
      'Unsur bukan logam yang wujud sebagai gas pada suhu bilik kerana takat lebur (-219 °C) dan takat didih (-183 °C) jauh di bawah 25 °C.',
    presets: [
      { label: 'Pepejal (-235 °C)', tempC: -235, directionHint: 'cooling' },
      { label: 'T. Lebur / Beku (-219 °C)', tempC: -219 },
      { label: 'Cecair (-200 °C)', tempC: -200 },
      { label: 'T. Didih (-183 °C)', tempC: -183, directionHint: 'heating' },
      { label: 'Suhu Bilik (25 °C)', tempC: 25, directionHint: 'heating' },
    ],
  },
  {
    id: 'helium',
    name: 'Helium',
    formula: 'He',
    particleCategory: 'atom',
    particleDescription: 'Atom tunggal gas adi (Kumpulan 18) yang stabil dengan daya tarikan antara atom paling lemah.',
    phaseBehavior: 'three',
    meltingPointC: -270,
    freezingPointC: -270,
    boilingPointC: -269,
    meltingDisplay: '-270 °C*',
    meltingNote: 'Buku teks m.s. 276 (~25 atm)',
    freezingDisplay: '-270 °C*',
    freezingNote: '~25 atm',
    boilingDisplay: '-269 °C',
    boilingNote: 'Jadual Data Unsur m.s. 276',
    minTempC: -273,
    maxTempC: 30,
    defaultTempC: 25,
    roomStateLabel: 'Gas',
    colorTheme: {
      pillBg: 'bg-amber-50',
      pillBorder: 'border-amber-300',
      pillText: 'text-amber-900',
      primary: '#d97706',
      secondary: '#fef3c7',
      liquidPool: 'rgba(245, 158, 11, 0.22)',
      accentBadge: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    scientificNote:
      'Mempunyai takat lebur (-270 °C) dan takat didih (-269 °C) paling rendah antara semua unsur (m.s. 276); pepejal helium hanya terbentuk pada tekanan tinggi (~25 atm).',
    presets: [
      { label: 'Pepejal* (-272 °C)', tempC: -272, directionHint: 'cooling' },
      { label: 'T. Lebur (-270 °C)', tempC: -270 },
      { label: 'Cecair (-269.5 °C)', tempC: -269.5 },
      { label: 'T. Didih (-269 °C)', tempC: -269, directionHint: 'heating' },
      { label: 'Suhu Bilik (25 °C)', tempC: 25, directionHint: 'heating' },
    ],
  },
  {
    id: 'natrium',
    name: 'Natrium',
    formula: 'Na',
    particleCategory: 'atom',
    particleDescription: 'Atom logam alkali (Kumpulan 1) tersusun rapat dalam kekisi logam dengan ikatan logam.',
    phaseBehavior: 'three',
    meltingPointC: 97.8,
    freezingPointC: 97.8,
    boilingPointC: 883,
    meltingDisplay: '97.8 °C',
    meltingNote: 'Buku teks m.s. 40 (~98 °C)',
    freezingDisplay: '97.8 °C',
    boilingDisplay: '883 °C',
    boilingNote: 'Buku teks m.s. 40',
    minTempC: 20,
    maxTempC: 1020,
    defaultTempC: 25,
    roomStateLabel: 'Pepejal',
    colorTheme: {
      pillBg: 'bg-indigo-50',
      pillBorder: 'border-indigo-300',
      pillText: 'text-indigo-800',
      primary: '#4f46e5',
      secondary: '#e0e7ff',
      liquidPool: 'rgba(99, 102, 241, 0.24)',
      accentBadge: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    },
    scientificNote:
      'Logam lembut yang merupakan pepejal pada suhu bilik (25 °C) dan mudah melebur pada 97.8 °C (lebih rendah daripada takat didih air) serta mendidih pada 883 °C.',
    presets: [
      { label: 'Suhu Bilik (25 °C)', tempC: 25, directionHint: 'cooling' },
      { label: 'T. Lebur / Beku (97.8 °C)', tempC: 97.8 },
      { label: 'Leburan (400 °C)', tempC: 400, directionHint: 'heating' },
      { label: 'T. Didih (883 °C)', tempC: 883, directionHint: 'heating' },
      { label: 'Wap Na (960 °C)', tempC: 960, directionHint: 'heating' },
    ],
  },
  {
    id: 'natrium_klorida',
    name: 'Natrium Klorida',
    formula: 'NaCl',
    particleCategory: 'ion',
    particleDescription: 'Kekisi ion positif Na⁺ dan ion negatif Cl⁻ diikat oleh daya tarikan elektrostatik yang sangat kuat.',
    phaseBehavior: 'three',
    meltingPointC: 801,
    freezingPointC: 801,
    boilingPointC: 1413,
    meltingDisplay: '801 °C',
    meltingNote: 'Buku teks m.s. 40 & 127',
    freezingDisplay: '801 °C',
    boilingDisplay: '1413 °C',
    boilingNote: 'Buku teks m.s. 40',
    minTempC: 25,
    maxTempC: 1600,
    defaultTempC: 25,
    roomStateLabel: 'Pepejal',
    colorTheme: {
      pillBg: 'bg-emerald-50',
      pillBorder: 'border-emerald-300',
      pillText: 'text-emerald-900',
      primary: '#059669',
      secondary: '#d1fae5',
      liquidPool: 'rgba(16, 185, 129, 0.22)',
      accentBadge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    scientificNote:
      'Sebatian ion dengan takat lebur (801 °C) dan takat didih (1413 °C) yang sangat tinggi kerana banyak haba diperlukan untuk mengatasi daya tarikan elektrostatik yang kuat antara ion Na⁺ dan Cl⁻.',
    presets: [
      { label: 'Suhu Bilik (25 °C)', tempC: 25, directionHint: 'cooling' },
      { label: 'T. Lebur / Beku (801 °C)', tempC: 801 },
      { label: 'Leburan Ion (1050 °C)', tempC: 1050, directionHint: 'heating' },
      { label: 'T. Didih (1413 °C)', tempC: 1413, directionHint: 'heating' },
      { label: 'Wap Ion (1520 °C)', tempC: 1520, directionHint: 'heating' },
    ],
  },
  {
    id: 'kuprum_sulfat',
    name: 'Kuprum(II) Sulfat',
    formula: 'CuSO₄',
    particleCategory: 'ion',
    particleDescription: 'Garam ion kontang terdiri daripada ion Cu²⁺ dan ion SO₄²⁻ dalam kekisi hablur bertertib.',
    phaseBehavior: 'decomposes',
    meltingPointC: null,
    freezingPointC: null,
    boilingPointC: null,
    transitionPointC: 560,
    meltingDisplay: 'Terurai > 560 °C',
    meltingNote: 'Tidak melebur stabil pd 1 atm',
    freezingDisplay: 'Tiada',
    freezingNote: 'Mengurai sebelum melebur',
    boilingDisplay: 'Terurai > 560 °C',
    boilingNote: 'CuSO₄ → CuO(p) + SO₃(g)',
    minTempC: 25,
    maxTempC: 800,
    defaultTempC: 25,
    roomStateLabel: 'Pepejal',
    colorTheme: {
      pillBg: 'bg-blue-50',
      pillBorder: 'border-blue-300',
      pillText: 'text-blue-900',
      primary: '#2563eb',
      secondary: '#dbeafe',
      liquidPool: 'rgba(37, 99, 235, 0.2)',
      accentBadge: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    scientificNote:
      'Sebatian ion ini kekal sebagai pepejal sehingga ~560 °C dan terus mengalami penguraian terma membentuk pepejal kuprum(II) oksida (CuO) dan gas sulfur trioksida (SO₃) sebelum sempat melebur atau mendidih.',
    presets: [
      { label: 'Suhu Bilik (25 °C)', tempC: 25, directionHint: 'cooling' },
      { label: 'Dipanaskan (350 °C)', tempC: 350, directionHint: 'heating' },
      { label: 'Mula Terurai (560 °C)', tempC: 560, directionHint: 'heating' },
      { label: 'Terurai Lengkap (720 °C)', tempC: 720, directionHint: 'heating' },
    ],
  },
];

export const PROCESS_DETAILS: Record<
  ProcessId,
  {
    id: ProcessId;
    name: string;
    from: string;
    to: string;
    heat: 'Diserap' | 'Dibebaskan';
    summary: string;
    demoSubstanceId: SubstanceId;
    demoTempC: number;
    demoDirection: ThermalDirection;
  }
> = {
  peleburan: {
    id: 'peleburan',
    name: 'Peleburan',
    from: 'Pepejal',
    to: 'Cecair',
    heat: 'Diserap',
    summary:
      'Zarah menyerap tenaga haba untuk mengatasi daya tarikan antara zarah; susunan teratur runtuh dan zarah mula menggelongsor.',
    demoSubstanceId: 'naftalena',
    demoTempC: 80,
    demoDirection: 'heating',
  },
  pembekuan: {
    id: 'pembekuan',
    name: 'Pembekuan',
    from: 'Cecair',
    to: 'Pepejal',
    heat: 'Dibebaskan',
    summary:
      'Zarah membebaskan haba dan bergerak perlahan lalu ditarik lebih rapat membentuk kekisi pepejal yang teratur.',
    demoSubstanceId: 'air',
    demoTempC: 0,
    demoDirection: 'cooling',
  },
  pendidihan: {
    id: 'pendidihan',
    name: 'Pendidihan',
    from: 'Cecair',
    to: 'Gas',
    heat: 'Diserap',
    summary:
      'Zarah menyerap haba untuk memutuskan sepenuhnya daya tarikan antara zarah dalam cecair dan terbebas sebagai gas.',
    demoSubstanceId: 'air',
    demoTempC: 100,
    demoDirection: 'heating',
  },
  kondensasi: {
    id: 'kondensasi',
    name: 'Kondensasi',
    from: 'Gas',
    to: 'Cecair',
    heat: 'Dibebaskan',
    summary:
      'Zarah gas kehilangan tenaga kinetik apabila disejukkan, bergerak lebih perlahan dan tertarik membentuk cecair.',
    demoSubstanceId: 'oksigen',
    demoTempC: -183,
    demoDirection: 'cooling',
  },
  pemejalwapan: {
    id: 'pemejalwapan',
    name: 'Pemejalwapan',
    from: 'Pepejal',
    to: 'Gas',
    heat: 'Diserap',
    summary:
      'Zarah pepejal menyerap tenaga haba yang mencukupi dan terus terbebas menjadi gas tanpa melalui keadaan cecair (cth: ais kering CO₂ pada 1 atm).',
    demoSubstanceId: 'karbon_dioksida',
    demoTempC: -78.5,
    demoDirection: 'heating',
  },
  pengendapan: {
    id: 'pengendapan',
    name: 'Pengendapan',
    from: 'Gas',
    to: 'Pepejal',
    heat: 'Dibebaskan',
    summary:
      'Zarah gas membebaskan tenaga haba dengan banyak dan terus tersusun rapat menjadi pepejal tanpa melalui keadaan cecair.',
    demoSubstanceId: 'karbon_dioksida',
    demoTempC: -78.5,
    demoDirection: 'cooling',
  },
};

export function sliderPosToTempC(substance: SubstanceSpec, sliderPos: number): number {
  const pos = Math.max(0, Math.min(SLIDER_MAX, sliderPos));

  if (substance.phaseBehavior === 'three') {
    const tm = substance.meltingPointC!;
    const tb = substance.boilingPointC!;
    let raw: number;
    let decimals = 0;

    if (pos <= POS_MELT) {
      const t = pos / POS_MELT;
      raw = substance.minTempC + t * (tm - substance.minTempC);
      const span = Math.abs(tm - substance.minTempC);
      decimals = span <= 15 || !Number.isInteger(tm) || !Number.isInteger(substance.minTempC) ? 1 : 0;
    } else if (pos <= POS_BOIL) {
      const t = (pos - POS_MELT) / (POS_BOIL - POS_MELT);
      raw = tm + t * (tb - tm);
      const span = Math.abs(tb - tm);
      decimals = span <= 15 || !Number.isInteger(tm) || !Number.isInteger(tb) ? 1 : 0;
    } else {
      const t = (pos - POS_BOIL) / (SLIDER_MAX - POS_BOIL);
      raw = tb + t * (substance.maxTempC - tb);
      const span = Math.abs(substance.maxTempC - tb);
      decimals = span <= 15 || !Number.isInteger(tb) || !Number.isInteger(substance.maxTempC) ? 1 : 0;
    }

    const rounded = Number(raw.toFixed(decimals));
    return Object.is(rounded, -0) ? 0 : rounded;
  }

  const tp = substance.transitionPointC!;
  let raw: number;
  let decimals = 0;
  if (pos <= POS_TWO_STAGE) {
    const t = pos / POS_TWO_STAGE;
    raw = substance.minTempC + t * (tp - substance.minTempC);
    const span = Math.abs(tp - substance.minTempC);
    decimals = span <= 15 || !Number.isInteger(tp) || !Number.isInteger(substance.minTempC) ? 1 : 0;
  } else {
    const t = (pos - POS_TWO_STAGE) / (SLIDER_MAX - POS_TWO_STAGE);
    raw = tp + t * (substance.maxTempC - tp);
    const span = Math.abs(substance.maxTempC - tp);
    decimals = span <= 15 || !Number.isInteger(tp) || !Number.isInteger(substance.maxTempC) ? 1 : 0;
  }
  const rounded = Number(raw.toFixed(decimals));
  return Object.is(rounded, -0) ? 0 : rounded;
}

export function tempCToSliderPos(substance: SubstanceSpec, tempC: number): number {
  const clamped = Math.max(substance.minTempC, Math.min(substance.maxTempC, tempC));

  if (substance.phaseBehavior === 'three') {
    const tm = substance.meltingPointC!;
    const tb = substance.boilingPointC!;

    if (clamped <= tm) {
      const denom = tm - substance.minTempC;
      const frac = denom === 0 ? 1 : (clamped - substance.minTempC) / denom;
      return Math.round(frac * POS_MELT);
    }
    if (clamped <= tb) {
      const denom = tb - tm;
      const frac = denom === 0 ? 0.5 : (clamped - tm) / denom;
      return Math.round(POS_MELT + frac * (POS_BOIL - POS_MELT));
    }
    const denom = substance.maxTempC - tb;
    const frac = denom === 0 ? 1 : (clamped - tb) / denom;
    return Math.round(POS_BOIL + frac * (SLIDER_MAX - POS_BOIL));
  }

  const tp = substance.transitionPointC!;
  if (clamped <= tp) {
    const denom = tp - substance.minTempC;
    const frac = denom === 0 ? 1 : (clamped - substance.minTempC) / denom;
    return Math.round(frac * POS_TWO_STAGE);
  }
  const denom = substance.maxTempC - tp;
  const frac = denom === 0 ? 1 : (clamped - tp) / denom;
  return Math.round(POS_TWO_STAGE + frac * (SLIDER_MAX - POS_TWO_STAGE));
}

export interface EvaluatedMatterState {
  physicalState: PhysicalState;
  stateTitle: string;
  activeProcessId: ProcessId | null;
  activeProcessLabel: string;
  heatFlowLabel: 'Haba Diserap' | 'Haba Dibebaskan';
  arrangement: string;
  movement: string;
  kineticEnergy: string;
  attractionForce: string;
  /** 0..1 normalized particle agitation level inside the current phase + temp. */
  agitationNorm: number;
  summaryText: string;
}

export function evaluateSubstanceAtSlider(
  substance: SubstanceSpec,
  sliderPos: number,
  direction: ThermalDirection
): EvaluatedMatterState {
  const tempC = sliderPosToTempC(substance, sliderPos);
  const overallNorm = Math.max(
    0,
    Math.min(1, (tempC - substance.minTempC) / Math.max(1, substance.maxTempC - substance.minTempC))
  );

  if (substance.phaseBehavior === 'three') {
    const tm = substance.meltingPointC!;
    const tb = substance.boilingPointC!;
    const nearMelt = Math.abs(sliderPos - POS_MELT) <= TRANSITION_WINDOW || tempC === tm;
    const nearBoil = Math.abs(sliderPos - POS_BOIL) <= TRANSITION_WINDOW || tempC === tb;

    if (nearMelt) {
      const isHeating = direction === 'heating';
      return {
        physicalState: 'melting_freezing',
        stateTitle: isHeating
          ? 'Sedang Melebur (Pepejal + Cecair)'
          : 'Sedang Membeku (Cecair + Pepejal)',
        activeProcessId: isHeating ? 'peleburan' : 'pembekuan',
        activeProcessLabel: isHeating ? 'Peleburan (Pepejal → Cecair)' : 'Pembekuan (Cecair → Pepejal)',
        heatFlowLabel: isHeating ? 'Haba Diserap' : 'Haba Dibebaskan',
        arrangement: 'Sebahagian kekisi teratur mula runtuh kepada susunan rapat tidak teratur',
        movement: 'Zarah pepejal bergetar kuat; zarah cecair mula menggelongsor bebas',
        kineticEnergy: 'Malar pada suhu peralihan',
        attractionForce: isHeating
          ? 'Daya tarikan antara zarah sedang diatasi oleh haba yang diserap'
          : 'Daya tarikan antara zarah terbentuk semula semasa haba dibebaskan',
        agitationNorm: 0.42,
        summaryText: isHeating
          ? `Pada takat lebur (${substance.meltingDisplay}), tenaga haba diserap untuk mengatasi daya tarikan antara zarah sehingga semua pepejal bertukar menjadi cecair.`
          : `Pada takat beku (${substance.freezingDisplay}), haba yang dibebaskan ke persekitaran diimbangi oleh haba terbebas semasa zarah menarik antara satu sama lain.`,
      };
    }

    if (nearBoil) {
      const isHeating = direction === 'heating';
      return {
        physicalState: 'boiling_condensing',
        stateTitle: isHeating
          ? 'Sedang Mendidih (Cecair + Gas)'
          : 'Sedang Mengkondensasi (Gas + Cecair)',
        activeProcessId: isHeating ? 'pendidihan' : 'kondensasi',
        activeProcessLabel: isHeating ? 'Pendidihan (Cecair → Gas)' : 'Kondensasi (Gas → Cecair)',
        heatFlowLabel: isHeating ? 'Haba Diserap' : 'Haba Dibebaskan',
        arrangement: 'Zarah terpisah daripada kelompok cecair menjadi sangat berjauhan',
        movement: 'Sebahagian zarah meruap pantas ke seluruh bekas',
        kineticEnergy: 'Tinggi dan malar semasa penukaran fasa',
        attractionForce: isHeating
          ? 'Daya tarikan dalam cecair diputuskan sepenuhnya'
          : 'Zarah gas perlahan lalu tertarik semula menjadi cecair',
        agitationNorm: 0.72,
        summaryText: isHeating
          ? `Pada takat didih (${substance.boilingDisplay}), haba diserap untuk memutuskan daya tarikan antara zarah dalam cecair supaya terbebas menjadi gas.`
          : `Pada suhu kondensasi (${substance.boilingDisplay}), zarah gas membebaskan haba dan bergerak perlahan lalu bercantum semula menjadi cecair.`,
      };
    }

    if (sliderPos < POS_MELT) {
      const isHeating = direction === 'heating';
      return {
        physicalState: 'solid',
        stateTitle: 'Pepejal',
        activeProcessId: null,
        activeProcessLabel: isHeating
          ? 'Pemanasan Pepejal (A → B)'
          : 'Penyejukkan Pepejal (G → H)',
        heatFlowLabel: isHeating ? 'Haba Diserap' : 'Haba Dibebaskan',
        arrangement: 'Zarah tersusun sangat rapat dan teratur dalam kekisi',
        movement: isHeating
          ? 'Bergetar dan berputar semakin laju pada kedudukan tetap'
          : 'Bergetar dan berputar semakin perlahan pada kedudukan tetap',
        kineticEnergy: isHeating ? 'Rendah dan semakin meningkat' : 'Rendah dan semakin menurun',
        attractionForce: 'Sangat kuat antara zarah',
        agitationNorm: 0.1 + 0.22 * (sliderPos / POS_MELT),
        summaryText: isHeating
          ? `Dalam keadaan pepejal (di bawah ${substance.meltingDisplay}), zarah ${substance.name} menyerap tenaga haba lalu bergetar lebih cepat kerana tenaga kinetik bertambah.`
          : `Dalam keadaan pepejal (di bawah ${substance.freezingDisplay}), zarah ${substance.name} membebaskan tenaga haba lalu bergetar dengan lebih perlahan.`,
      };
    }

    if (sliderPos < POS_BOIL) {
      const isHeating = direction === 'heating';
      return {
        physicalState: 'liquid',
        stateTitle: 'Cecair',
        activeProcessId: null,
        activeProcessLabel: isHeating
          ? 'Pemanasan Cecair (C → D)'
          : 'Penyejukkan Cecair (E → F)',
        heatFlowLabel: isHeating ? 'Haba Diserap' : 'Haba Dibebaskan',
        arrangement: 'Zarah tersusun rapat tetapi tidak teratur (masih berkelompok)',
        movement: isHeating
          ? 'Bergerak bebas, menggelongsor dan berlanggar semakin laju'
          : 'Bergerak bebas dan menggelongsor dengan lebih perlahan',
        kineticEnergy: isHeating
          ? 'Sederhana dan semakin meningkat'
          : 'Sederhana dan semakin menurun',
        attractionForce: 'Sederhana kuat (lebih lemah berbanding pepejal)',
        agitationNorm: 0.45 + 0.22 * ((sliderPos - POS_MELT) / (POS_BOIL - POS_MELT)),
        summaryText: isHeating
          ? `Dalam keadaan cecair (${substance.meltingDisplay} hingga ${substance.boilingDisplay}), zarah ${substance.name} menyerap haba dan bergerak lebih cepat mengatasi sebahagian daya tarikan.`
          : `Dalam keadaan cecair, apabila disejukkan, zarah ${substance.name} membebaskan haba dan bergerak semakin perlahan menuju takat beku (${substance.freezingDisplay}).`,
      };
    }

    const isHeating = direction === 'heating';
    return {
      physicalState: 'gas',
      stateTitle: 'Gas',
      activeProcessId: null,
      activeProcessLabel: isHeating ? 'Pemanasan Gas' : 'Penyejukkan Gas',
      heatFlowLabel: isHeating ? 'Haba Diserap' : 'Haba Dibebaskan',
      arrangement: 'Zarah sangat berjauhan antara satu sama lain dan rawak',
      movement: isHeating
        ? 'Bergerak bebas secara rawak ke semua arah dengan sangat laju'
        : 'Bergerak bebas secara rawak tetapi beransur perlahan',
      kineticEnergy: isHeating ? 'Tinggi dan semakin meningkat' : 'Tinggi tetapi semakin menurun',
      attractionForce: 'Sangat lemah (boleh diabaikan)',
      agitationNorm: 0.78 + 0.22 * ((sliderPos - POS_BOIL) / (SLIDER_MAX - POS_BOIL)),
      summaryText: isHeating
        ? `Melebihi ${substance.boilingDisplay}, ${substance.name} wujud sebagai gas; tenaga kinetik tinggi membolehkan zarah memenuhi seluruh isi padu bekas.`
        : `Sebagai gas yang disejukkan menghampiri ${substance.boilingDisplay}, zarah membebaskan haba dan kelajuan perlanggaran berkurang.`,
    };
  }

  if (substance.phaseBehavior === 'sublimation') {
    const nearSub = Math.abs(sliderPos - POS_TWO_STAGE) <= TRANSITION_WINDOW || tempC === substance.transitionPointC;
    const isHeating = direction === 'heating';

    if (nearSub) {
      return {
        physicalState: 'subliming_depositing',
        stateTitle: isHeating ? 'Sedang Memejalwap (Pepejal → Gas)' : 'Sedang Mengendap (Gas → Pepejal)',
        activeProcessId: isHeating ? 'pemejalwapan' : 'pengendapan',
        activeProcessLabel: isHeating ? 'Pemejalwapan (Pepejal → Gas)' : 'Pengendapan (Gas → Pepejal)',
        heatFlowLabel: isHeating ? 'Haba Diserap' : 'Haba Dibebaskan',
        arrangement: 'Bertukar terus antara kekisi pepejal dan gas berjauhan tanpa fasa cecair',
        movement: isHeating
          ? 'Molekul permukaan terbebas terus sebagai gas CO₂'
          : 'Molekul gas terus tersusun membentuk hablur ais kering',
        kineticEnergy: 'Perubahan tenaga haba pendam pemejalwapan pd 1 atm',
        attractionForce: 'Daya van der Waals yang amat lemah diatasi terus pada 1 atm',
        agitationNorm: 0.58,
        summaryText: isHeating
          ? 'Pada -78.5 °C (1 atm), ais kering CO₂ menyerap haba dan terus memejalwap menjadi gas tanpa menjadi cecair.'
          : 'Pada -78.5 °C (1 atm), gas CO₂ membebaskan haba dan mengalami pengendapan terus kepada pepejal ais kering.',
      };
    }

    if (sliderPos < POS_TWO_STAGE) {
      return {
        physicalState: 'solid',
        stateTitle: 'Pepejal (Ais Kering)',
        activeProcessId: null,
        activeProcessLabel: isHeating ? 'Pemanasan Ais Kering' : 'Penyejukkan Ais Kering',
        heatFlowLabel: isHeating ? 'Haba Diserap' : 'Haba Dibebaskan',
        arrangement: 'Molekul CO₂ tersusun rapat dalam kekisi molekul berkala',
        movement: isHeating ? 'Bergetar semakin pantas pada kedudukan tetap' : 'Bergetar perlahan pada kedudukan tetap',
        kineticEnergy: 'Rendah',
        attractionForce: 'Daya van der Waals lemah (kekal pepejal di bawah -78.5 °C)',
        agitationNorm: 0.14 + 0.18 * (sliderPos / POS_TWO_STAGE),
        summaryText:
          'Di bawah -78.5 °C pada tekanan 1 atm, molekul CO₂ bergetar dalam kekisi pepejal ais kering sebelum memejalwap terus.',
      };
    }

    return {
      physicalState: 'gas',
      stateTitle: 'Gas',
      activeProcessId: null,
      activeProcessLabel: isHeating ? 'Pemanasan Gas CO₂' : 'Penyejukkan Gas CO₂',
      heatFlowLabel: isHeating ? 'Haba Diserap' : 'Haba Dibebaskan',
      arrangement: 'Molekul linear CO₂ sangat berjauhan dan bergerak rawak',
      movement: 'Bergerak bebas dan laju memenuhi ruang bekas',
      kineticEnergy: isHeating ? 'Tinggi dan meningkat' : 'Tinggi tetapi menurun',
      attractionForce: 'Sangat lemah (boleh diabaikan)',
      agitationNorm: 0.72 + 0.28 * overallNorm,
      summaryText:
        'Melebihi -78.5 °C pada tekanan 1 atm, CO₂ wujud sebagai gas kerana tiada keadaan cecair wujud pada tekanan atmosfera biasa.',
    };
  }

  // CuSO4 thermal decomposition at >= 560 °C
  const isHeating = direction === 'heating';
  if (tempC >= (substance.transitionPointC ?? 560)) {
    return {
      physicalState: 'decomposing',
      stateTitle: 'Penguraian Terma (CuO(p) + SO₃(g))',
      activeProcessId: null,
      activeProcessLabel: 'Penguraian Terma (> 560 °C)',
      heatFlowLabel: isHeating ? 'Haba Diserap' : 'Haba Dibebaskan',
      arrangement: 'Kekisi ion CuSO₄ terurai kepada pepejal CuO dan gas SO₃ yang berjauhan',
      movement: 'Ion kekisi beralih menjadi sisa pepejal CuO manakala molekul gas SO₃ bergerak laju ke atas',
      kineticEnergy: 'Sangat tinggi (> 560 °C)',
      attractionForce: 'Ikatan dalam ion sulfat SO₄²⁻ terputus sebelum hablur sempat melebur',
      agitationNorm: 0.7 + 0.3 * ((sliderPos - POS_TWO_STAGE) / (SLIDER_MAX - POS_TWO_STAGE)),
      summaryText:
        'Kuprum(II) sulfat kontang tidak melebur menjadi cecair pada 1 atm; sebaliknya haba tinggi (> 560 °C) menguraikannya mengikut persamaan: CuSO₄(p) → CuO(p) + SO₃(g).',
    };
  }

  return {
    physicalState: 'solid',
    stateTitle: 'Pepejal (Hablur Ion)',
    activeProcessId: null,
    activeProcessLabel: isHeating ? 'Pemanasan Pepejal Ion' : 'Penyejukkan Pepejal Ion',
    heatFlowLabel: isHeating ? 'Haba Diserap' : 'Haba Dibebaskan',
    arrangement: 'Ion Cu²⁺ dan SO₄²⁻ tersusun sangat rapat dan teratur dalam kekisi',
    movement: isHeating
      ? 'Bergetar semakin kuat pada kedudukan tetap menghampiri 560 °C'
      : 'Bergetar lebih perlahan pada kedudukan tetap',
    kineticEnergy: isHeating ? 'Rendah ke sederhana' : 'Rendah dan menurun',
    attractionForce: 'Daya tarikan elektrostatik yang sangat kuat antara ion',
    agitationNorm: 0.1 + 0.32 * (sliderPos / POS_TWO_STAGE),
    summaryText:
      'Di bawah 560 °C, garam ion CuSO₄ wujud sebagai pepejal kerana daya tarikan elektrostatik yang kuat mengikat ion Cu²⁺ dan SO₄²⁻ pada kedudukan tetap.',
  };
}

export function formatTempC(tempC: number, substance: SubstanceSpec): string {
  if (substance.id === 'helium' && tempC > -270 && tempC < -269) {
    return `${tempC.toFixed(1)} °C`;
  }
  const decimals = Math.abs(tempC % 1) > 0.01 ? 1 : 0;
  return `${tempC.toFixed(decimals)} °C`;
}

export function formatKelvin(tempC: number): string {
  const k = Math.max(0, Math.round(tempC + 273.15));
  return `${k} K`;
}
