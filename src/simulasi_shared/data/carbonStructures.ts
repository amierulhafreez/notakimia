export type ElementSymbol = 'C' | 'H' | 'O' | 'N' | 'Cl' | 'Br' | 'I';
export type BondOrder = 1 | 2 | 3;

export interface AtomDefinition {
  symbol: ElementSymbol;
  name: string;
  valency: number;
  fill: string;
  textColor: string;
  border: string;
  badgeBg: string;
  roleHint: string;
}

export const ATOM_PALETTE: AtomDefinition[] = [
  {
    symbol: 'C',
    name: 'Karbon',
    valency: 4,
    fill: '#1e293b',
    textColor: '#ffffff',
    border: '#0f172a',
    badgeBg: 'bg-slate-800 text-white border-slate-900',
    roleHint: '4 ikatan kovalen (tulang belakang rantai)',
  },
  {
    symbol: 'H',
    name: 'Hidrogen',
    valency: 1,
    fill: '#ffffff',
    textColor: '#0f172a',
    border: '#94a3b8',
    badgeBg: 'bg-white text-slate-900 border-slate-300',
    roleHint: '1 ikatan kovalen',
  },
  {
    symbol: 'O',
    name: 'Oksigen',
    valency: 2,
    fill: '#dc2626',
    textColor: '#ffffff',
    border: '#991b1b',
    badgeBg: 'bg-red-600 text-white border-red-700',
    roleHint: '2 ikatan kovalen (—OH, —COOH, —COO—)',
  },
  {
    symbol: 'N',
    name: 'Nitrogen',
    valency: 3,
    fill: '#2563eb',
    textColor: '#ffffff',
    border: '#1d4ed8',
    badgeBg: 'bg-blue-600 text-white border-blue-700',
    roleHint: '3 ikatan kovalen (—NH₂, —C≡N)',
  },
  {
    symbol: 'Cl',
    name: 'Klorin',
    valency: 1,
    fill: '#16a34a',
    textColor: '#ffffff',
    border: '#15803d',
    badgeBg: 'bg-emerald-600 text-white border-emerald-700',
    roleHint: '1 ikatan kovalen (penukargantian alkana)',
  },
  {
    symbol: 'Br',
    name: 'Bromin',
    valency: 1,
    fill: '#b45309',
    textColor: '#ffffff',
    border: '#92400e',
    badgeBg: 'bg-amber-700 text-white border-amber-800',
    roleHint: '1 ikatan kovalen (penambahan alkena + Br₂)',
  },
  {
    symbol: 'I',
    name: 'Iodin',
    valency: 1,
    fill: '#7e22ce',
    textColor: '#ffffff',
    border: '#6b21a8',
    badgeBg: 'bg-purple-700 text-white border-purple-800',
    roleHint: '1 ikatan kovalen (halogenoalkana)',
  },
];

export const ATOM_MAP: Record<ElementSymbol, AtomDefinition> = ATOM_PALETTE.reduce(
  (acc, item) => {
    acc[item.symbol] = item;
    return acc;
  },
  {} as Record<ElementSymbol, AtomDefinition>
);

export type AtomCounts = Record<ElementSymbol, number>;

export const EMPTY_COUNTS: AtomCounts = {
  C: 0,
  H: 0,
  O: 0,
  N: 0,
  Cl: 0,
  Br: 0,
  I: 0,
};

export interface StructureNode {
  element: ElementSymbol;
  /** Grid coordinates in logical bond units (1 unit ~ 48-56px in SVG) */
  gx: number;
  gy: number;
  isFunctional?: boolean;
}

export interface StructureBond {
  from: number;
  to: number;
  order: BondOrder;
}

export interface PhysicalProperties {
  stateAtRoomTemp: string;
  meltingPoint: string;
  boilingPoint: string;
  solubilityWater: string;
  solubilityOrganic: string;
  conductivity: string;
  densityAndOdor: string;
}

export interface CarbonCompound {
  id: string;
  name: string;
  molecularFormula: string;
  counts: Partial<AtomCounts>;
  homologousSeries: string;
  categoryType: 'Hidrokarbon Tepu' | 'Hidrokarbon Tak Tepu' | 'Bukan Hidrokarbon' | 'Terbitan Organik';
  generalFormula: string;
  functionalGroupName: string;
  functionalGroupNotation: string;
  nodes: StructureNode[];
  bonds: StructureBond[];
  physical: PhysicalProperties;
  kssmNote: string;
}

export function normalizeCounts(counts: Partial<AtomCounts>): AtomCounts {
  return {
    C: counts.C ?? 0,
    H: counts.H ?? 0,
    O: counts.O ?? 0,
    N: counts.N ?? 0,
    Cl: counts.Cl ?? 0,
    Br: counts.Br ?? 0,
    I: counts.I ?? 0,
  };
}

export function countsEqual(a: AtomCounts, b: Partial<AtomCounts>): boolean {
  const nb = normalizeCounts(b);
  return (
    a.C === nb.C &&
    a.H === nb.H &&
    a.O === nb.O &&
    a.N === nb.N &&
    a.Cl === nb.Cl &&
    a.Br === nb.Br &&
    a.I === nb.I
  );
}

export function formatFormulaFromCounts(counts: AtomCounts): string {
  const sub = (n: number) =>
    n <= 1
      ? ''
      : String(n)
          .split('')
          .map((d) => '₀₁₂₃₄₅₆₇₈₉'[Number(d)])
          .join('');
  const order: ElementSymbol[] = ['C', 'H', 'O', 'N', 'Cl', 'Br', 'I'];
  const parts = order
    .filter((el) => counts[el] > 0)
    .map((el) => `${el}${sub(counts[el])}`);
  return parts.length > 0 ? parts.join('') : 'Tiada atom';
}

/** Canonical bond signature sorted alphabetically so isomers with distinct bond topologies (e.g. CH3COOH vs HCOOCH3) can be distinguished! */
export function computeBondSignature(
  elements: ElementSymbol[],
  bonds: Array<{ from: number; to: number; order: BondOrder }>
): string {
  const tokens = bonds.map((b) => {
    const e1 = elements[b.from];
    const e2 = elements[b.to];
    const [a, c] = e1 <= e2 ? [e1, e2] : [e2, e1];
    const sym = b.order === 1 ? '-' : b.order === 2 ? '=' : '#';
    return `${a}${sym}${c}`;
  });
  return tokens.sort().join('|');
}

export const CARBON_COMPOUNDS: CarbonCompound[] = [
  // ==================== ALKANA ====================
  {
    id: 'metana',
    name: 'Metana',
    molecularFormula: 'CH₄',
    counts: { C: 1, H: 4 },
    homologousSeries: 'Alkana',
    categoryType: 'Hidrokarbon Tepu',
    generalFormula: 'CₙH₂ₙ₊₂ (n = 1, 2, 3...)',
    functionalGroupName: 'Ikatan kovalen tunggal antara atom',
    functionalGroupNotation: '—C—C— (semua ikatan tunggal C—H)',
    nodes: [
      { element: 'C', gx: 1, gy: 1 },
      { element: 'H', gx: 1, gy: 0 },
      { element: 'H', gx: 1, gy: 2 },
      { element: 'H', gx: 0, gy: 1 },
      { element: 'H', gx: 2, gy: 1 },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Gas tidak berwarna',
      meltingPoint: '-182 °C',
      boilingPoint: '-162 °C',
      solubilityWater: 'Tidak larut di dalam air',
      solubilityOrganic: 'Larut di dalam pelarut organik',
      conductivity: 'Tidak mengkonduksikan elektrik dalam semua keadaan',
      densityAndOdor: 'Kurang tumpat daripada air; tidak berbau (gas asli)',
    },
    kssmNote: 'Ahli pertama alkana (n = 1). Komponen utama gas asli (NGV) dan bahan api.',
  },
  {
    id: 'etana',
    name: 'Etana',
    molecularFormula: 'C₂H₆',
    counts: { C: 2, H: 6 },
    homologousSeries: 'Alkana',
    categoryType: 'Hidrokarbon Tepu',
    generalFormula: 'CₙH₂ₙ₊₂ (n = 1, 2, 3...)',
    functionalGroupName: 'Ikatan kovalen tunggal antara atom karbon',
    functionalGroupNotation: '—C—C—',
    nodes: [
      { element: 'C', gx: 1, gy: 1, isFunctional: true },
      { element: 'C', gx: 2, gy: 1, isFunctional: true },
      { element: 'H', gx: 0, gy: 1 },
      { element: 'H', gx: 1, gy: 0 },
      { element: 'H', gx: 1, gy: 2 },
      { element: 'H', gx: 2, gy: 0 },
      { element: 'H', gx: 2, gy: 2 },
      { element: 'H', gx: 3, gy: 1 },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 1, to: 5, order: 1 },
      { from: 1, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Gas tidak berwarna',
      meltingPoint: '-183 °C',
      boilingPoint: '-89 °C',
      solubilityWater: 'Tidak larut di dalam air',
      solubilityOrganic: 'Larut di dalam pelarut organik',
      conductivity: 'Tidak mengkonduksikan elektrik dalam semua keadaan',
      densityAndOdor: 'Kurang tumpat daripada air; tidak berbau',
    },
    kssmNote: 'Hidrokarbon tepu. Nyalaan pembakaran kurang berjelaga berbanding etena.',
  },
  {
    id: 'propana',
    name: 'Propana',
    molecularFormula: 'C₃H₈',
    counts: { C: 3, H: 8 },
    homologousSeries: 'Alkana',
    categoryType: 'Hidrokarbon Tepu',
    generalFormula: 'CₙH₂ₙ₊₂ (n = 1, 2, 3...)',
    functionalGroupName: 'Ikatan kovalen tunggal antara atom karbon',
    functionalGroupNotation: '—C—C—',
    nodes: [
      { element: 'C', gx: 1, gy: 1, isFunctional: true },
      { element: 'C', gx: 2, gy: 1, isFunctional: true },
      { element: 'C', gx: 3, gy: 1, isFunctional: true },
      { element: 'H', gx: 0, gy: 1 },
      { element: 'H', gx: 1, gy: 0 },
      { element: 'H', gx: 1, gy: 2 },
      { element: 'H', gx: 2, gy: 0 },
      { element: 'H', gx: 2, gy: 2 },
      { element: 'H', gx: 3, gy: 0 },
      { element: 'H', gx: 3, gy: 2 },
      { element: 'H', gx: 4, gy: 1 },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 0, to: 5, order: 1 },
      { from: 1, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
      { from: 2, to: 8, order: 1 },
      { from: 2, to: 9, order: 1 },
      { from: 2, to: 10, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Gas tidak berwarna',
      meltingPoint: '-188 °C',
      boilingPoint: '-42 °C',
      solubilityWater: 'Tidak larut di dalam air',
      solubilityOrganic: 'Larut di dalam pelarut organik',
      conductivity: 'Tidak mengkonduksikan elektrik',
      densityAndOdor: 'Digunakan sebagai bahan api LPG (gas memasak)',
    },
    kssmNote: 'Nama induk "Prop" (3 karbon) + akhiran "-ana" = Propana.',
  },
  {
    id: 'butana',
    name: 'Butana',
    molecularFormula: 'C₄H₁₀',
    counts: { C: 4, H: 10 },
    homologousSeries: 'Alkana',
    categoryType: 'Hidrokarbon Tepu',
    generalFormula: 'CₙH₂ₙ₊₂ (n = 1, 2, 3...)',
    functionalGroupName: 'Ikatan kovalen tunggal antara atom karbon',
    functionalGroupNotation: '—C—C— (Rantai lurus 4 C)',
    nodes: [
      { element: 'C', gx: 1, gy: 1, isFunctional: true },
      { element: 'C', gx: 2, gy: 1, isFunctional: true },
      { element: 'C', gx: 3, gy: 1, isFunctional: true },
      { element: 'C', gx: 4, gy: 1, isFunctional: true },
      { element: 'H', gx: 0, gy: 1 },
      { element: 'H', gx: 1, gy: 0 },
      { element: 'H', gx: 1, gy: 2 },
      { element: 'H', gx: 2, gy: 0 },
      { element: 'H', gx: 2, gy: 2 },
      { element: 'H', gx: 3, gy: 0 },
      { element: 'H', gx: 3, gy: 2 },
      { element: 'H', gx: 4, gy: 0 },
      { element: 'H', gx: 4, gy: 2 },
      { element: 'H', gx: 5, gy: 1 },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 2, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 0, to: 5, order: 1 },
      { from: 0, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
      { from: 1, to: 8, order: 1 },
      { from: 2, to: 9, order: 1 },
      { from: 2, to: 10, order: 1 },
      { from: 3, to: 11, order: 1 },
      { from: 3, to: 12, order: 1 },
      { from: 3, to: 13, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Gas tidak berwarna',
      meltingPoint: '-138 °C',
      boilingPoint: '-0.5 °C',
      solubilityWater: 'Tidak larut di dalam air',
      solubilityOrganic: 'Larut di dalam pelarut organik',
      conductivity: 'Tidak mengkonduksikan elektrik',
      densityAndOdor: 'Digunakan dalam silinder gas memasak & pemetik api',
    },
    kssmNote: 'Mempunyai isomer rantai bercabang iaitu 2-metilpropana (formula molekul sama C₄H₁₀).',
  },
  {
    id: '2-metilpropana',
    name: '2-Metilpropana',
    molecularFormula: 'C₄H₁₀',
    counts: { C: 4, H: 10 },
    homologousSeries: 'Alkana (Isomer Bercabang)',
    categoryType: 'Hidrokarbon Tepu',
    generalFormula: 'CₙH₂ₙ₊₂ (n = 4)',
    functionalGroupName: 'Ikatan kovalen tunggal antara atom karbon',
    functionalGroupNotation: '—C—C— (Cabang metil —CH₃ pada C-2)',
    nodes: [
      { element: 'C', gx: 1, gy: 2.3 },
      { element: 'C', gx: 2.2, gy: 2.3, isFunctional: true },
      { element: 'C', gx: 3.4, gy: 2.3 },
      { element: 'C', gx: 2.2, gy: 1.1, isFunctional: true },
      { element: 'H', gx: 0.1, gy: 2.3 },
      { element: 'H', gx: 1, gy: 1.45 },
      { element: 'H', gx: 1, gy: 3.2 },
      { element: 'H', gx: 2.2, gy: 3.2 },
      { element: 'H', gx: 3.4, gy: 1.45 },
      { element: 'H', gx: 3.4, gy: 3.2 },
      { element: 'H', gx: 4.3, gy: 2.3 },
      { element: 'H', gx: 2.2, gy: 0.2 },
      { element: 'H', gx: 1.45, gy: 1.1 },
      { element: 'H', gx: 2.95, gy: 1.1 },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 1, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 0, to: 5, order: 1 },
      { from: 0, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
      { from: 2, to: 8, order: 1 },
      { from: 2, to: 9, order: 1 },
      { from: 2, to: 10, order: 1 },
      { from: 3, to: 11, order: 1 },
      { from: 3, to: 12, order: 1 },
      { from: 3, to: 13, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Gas tidak berwarna',
      meltingPoint: '-159.6 °C',
      boilingPoint: '-11.7 °C',
      solubilityWater: 'Tidak larut di dalam air',
      solubilityOrganic: 'Larut di dalam pelarut organik',
      conductivity: 'Tidak mengkonduksikan elektrik',
      densityAndOdor: 'Takat didih sedikit lebih rendah daripada butana lurus (luas permukaan sentuhan lebih kecil)',
    },
    kssmNote: 'Isomer bagi butana (C₄H₁₀) dengan rantai utama 3 karbon dan satu cabang metil pada C-2.',
  },

  // ==================== ALKENA ====================
  {
    id: 'etena',
    name: 'Etena',
    molecularFormula: 'C₂H₄',
    counts: { C: 2, H: 4 },
    homologousSeries: 'Alkena',
    categoryType: 'Hidrokarbon Tak Tepu',
    generalFormula: 'CₙH₂ₙ (n = 2, 3, 4...)',
    functionalGroupName: 'Ikatan kovalen ganda dua antara atom karbon',
    functionalGroupNotation: '>C═C<',
    nodes: [
      { element: 'C', gx: 1, gy: 1, isFunctional: true },
      { element: 'C', gx: 2, gy: 1, isFunctional: true },
      { element: 'H', gx: 1, gy: 0 },
      { element: 'H', gx: 1, gy: 2 },
      { element: 'H', gx: 2, gy: 0 },
      { element: 'H', gx: 2, gy: 2 },
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 1, to: 4, order: 1 },
      { from: 1, to: 5, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Gas tidak berwarna',
      meltingPoint: '-169 °C',
      boilingPoint: '-104 °C',
      solubilityWater: 'Tidak larut di dalam air',
      solubilityOrganic: 'Larut di dalam pelarut organik',
      conductivity: 'Tidak mengkonduksikan elektrik',
      densityAndOdor: 'Bau manis lembut; monomer untuk membuat politena & pematangan buah',
    },
    kssmNote: 'Hidrokarbon tak tepu. Menyahwarnakan air bromin (perang → tidak berwarna) dan KMnO₄ berasid (ungu → tidak berwarna).',
  },
  {
    id: 'propena',
    name: 'Propena',
    molecularFormula: 'C₃H₆',
    counts: { C: 3, H: 6 },
    homologousSeries: 'Alkena',
    categoryType: 'Hidrokarbon Tak Tepu',
    generalFormula: 'CₙH₂ₙ (n = 2, 3, 4...)',
    functionalGroupName: 'Ikatan kovalen ganda dua antara atom karbon',
    functionalGroupNotation: '>C═C<',
    nodes: [
      { element: 'C', gx: 1, gy: 1, isFunctional: true },
      { element: 'C', gx: 2, gy: 1, isFunctional: true },
      { element: 'C', gx: 3, gy: 1 },
      { element: 'H', gx: 0, gy: 1 },
      { element: 'H', gx: 1, gy: 0 },
      { element: 'H', gx: 2, gy: 0 },
      { element: 'H', gx: 3, gy: 0 },
      { element: 'H', gx: 3, gy: 2 },
      { element: 'H', gx: 4, gy: 1 },
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 1, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 1, to: 5, order: 1 },
      { from: 2, to: 6, order: 1 },
      { from: 2, to: 7, order: 1 },
      { from: 2, to: 8, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Gas tidak berwarna',
      meltingPoint: '-185 °C',
      boilingPoint: '-47 °C',
      solubilityWater: 'Tidak larut di dalam air',
      solubilityOrganic: 'Larut di dalam pelarut organik',
      conductivity: 'Tidak mengkonduksikan elektrik',
      densityAndOdor: 'Monomer untuk menghasilkan plastik polipropena',
    },
    kssmNote: 'Ahli kedua alkena (3 atom karbon). Membakar dengan nyalaan lebih berjelaga berbanding propana.',
  },
  {
    id: 'but-1-ena',
    name: 'But-1-ena',
    molecularFormula: 'C₄H₈',
    counts: { C: 4, H: 8 },
    homologousSeries: 'Alkena',
    categoryType: 'Hidrokarbon Tak Tepu',
    generalFormula: 'CₙH₂ₙ (n = 4)',
    functionalGroupName: 'Ikatan kovalen ganda dua antara atom karbon',
    functionalGroupNotation: '>C═C< (pada C-1)',
    nodes: [
      { element: 'C', gx: 1, gy: 1, isFunctional: true },
      { element: 'C', gx: 2, gy: 1, isFunctional: true },
      { element: 'C', gx: 3, gy: 1 },
      { element: 'C', gx: 4, gy: 1 },
      { element: 'H', gx: 0, gy: 1 },
      { element: 'H', gx: 1, gy: 0 },
      { element: 'H', gx: 2, gy: 0 },
      { element: 'H', gx: 3, gy: 0 },
      { element: 'H', gx: 3, gy: 2 },
      { element: 'H', gx: 4, gy: 0 },
      { element: 'H', gx: 4, gy: 2 },
      { element: 'H', gx: 5, gy: 1 },
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 1, to: 2, order: 1 },
      { from: 2, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 0, to: 5, order: 1 },
      { from: 1, to: 6, order: 1 },
      { from: 2, to: 7, order: 1 },
      { from: 2, to: 8, order: 1 },
      { from: 3, to: 9, order: 1 },
      { from: 3, to: 10, order: 1 },
      { from: 3, to: 11, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Gas tidak berwarna',
      meltingPoint: '-185 °C',
      boilingPoint: '-6 °C',
      solubilityWater: 'Tidak larut di dalam air',
      solubilityOrganic: 'Larut di dalam pelarut organik',
      conductivity: 'Tidak mengkonduksikan elektrik',
      densityAndOdor: 'Mempunyai isomer kedudukan iaitu But-2-ena (C═C pada C-2)',
    },
    kssmNote: 'Isomer kedudukan alkena C₄H₈ dengan ikatan ganda dua pada karbon pertama.',
  },

  // ==================== ALKUNA ====================
  {
    id: 'etuna',
    name: 'Etuna',
    molecularFormula: 'C₂H₂',
    counts: { C: 2, H: 2 },
    homologousSeries: 'Alkuna',
    categoryType: 'Hidrokarbon Tak Tepu',
    generalFormula: 'CₙH₂ₙ₋₂ (n = 2, 3, 4...)',
    functionalGroupName: 'Ikatan kovalen ganda tiga antara atom karbon',
    functionalGroupNotation: '—C≡C—',
    nodes: [
      { element: 'H', gx: 0, gy: 1 },
      { element: 'C', gx: 1, gy: 1, isFunctional: true },
      { element: 'C', gx: 2, gy: 1, isFunctional: true },
      { element: 'H', gx: 3, gy: 1 },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 3 },
      { from: 2, to: 3, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Gas tidak berwarna',
      meltingPoint: '-80.8 °C',
      boilingPoint: '-84 °C (memejalwap)',
      solubilityWater: 'Tidak larut di dalam air',
      solubilityOrganic: 'Larut di dalam pelarut organik (aseton)',
      conductivity: 'Tidak mengkonduksikan elektrik',
      densityAndOdor: 'Menghasilkan nyalaan oksi-asetilena sangat panas untuk pemotongan logam',
    },
    kssmNote: 'Ahli pertama siri homolog alkuna (n = 2). Mempunyai ikatan kovalen ganda tiga —C≡C—.',
  },
  {
    id: 'propuna',
    name: 'Propuna',
    molecularFormula: 'C₃H₄',
    counts: { C: 3, H: 4 },
    homologousSeries: 'Alkuna',
    categoryType: 'Hidrokarbon Tak Tepu',
    generalFormula: 'CₙH₂ₙ₋₂ (n = 2, 3, 4...)',
    functionalGroupName: 'Ikatan kovalen ganda tiga antara atom karbon',
    functionalGroupNotation: '—C≡C—',
    nodes: [
      { element: 'H', gx: 0, gy: 1 },
      { element: 'C', gx: 1, gy: 1, isFunctional: true },
      { element: 'C', gx: 2, gy: 1, isFunctional: true },
      { element: 'C', gx: 3, gy: 1 },
      { element: 'H', gx: 3, gy: 0 },
      { element: 'H', gx: 3, gy: 2 },
      { element: 'H', gx: 4, gy: 1 },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 3 },
      { from: 2, to: 3, order: 1 },
      { from: 3, to: 4, order: 1 },
      { from: 3, to: 5, order: 1 },
      { from: 3, to: 6, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Gas tidak berwarna',
      meltingPoint: '-102.7 °C',
      boilingPoint: '-23.2 °C',
      solubilityWater: 'Tidak larut di dalam air',
      solubilityOrganic: 'Larut di dalam pelarut organik',
      conductivity: 'Tidak mengkonduksikan elektrik',
      densityAndOdor: 'Kurang tumpat daripada air; hidrokarbon tak tepu sangat reaktif',
    },
    kssmNote: 'Nama induk "Prop" (3 karbon) + akhiran "-una" = Propuna.',
  },

  // ==================== ALKOHOL ====================
  {
    id: 'metanol',
    name: 'Metanol',
    molecularFormula: 'CH₃OH',
    counts: { C: 1, H: 4, O: 1 },
    homologousSeries: 'Alkohol',
    categoryType: 'Bukan Hidrokarbon',
    generalFormula: 'CₙH₂ₙ₊₁OH (n = 1, 2, 3...)',
    functionalGroupName: 'Kumpulan hidroksil',
    functionalGroupNotation: '—OH',
    nodes: [
      { element: 'H', gx: 0, gy: 1 },
      { element: 'C', gx: 1, gy: 1 },
      { element: 'H', gx: 1, gy: 0 },
      { element: 'H', gx: 1, gy: 2 },
      { element: 'O', gx: 2, gy: 1, isFunctional: true },
      { element: 'H', gx: 3, gy: 1, isFunctional: true },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 1, to: 3, order: 1 },
      { from: 1, to: 4, order: 1 },
      { from: 4, to: 5, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Cecair tidak berwarna & mudah meruap',
      meltingPoint: '-97.6 °C',
      boilingPoint: '64.7 °C',
      solubilityWater: 'Terlarut campur dalam air pada semua kadar',
      solubilityOrganic: 'Larut dalam pelarut organik',
      conductivity: 'Tidak mengkonduksikan elektrik (sebatian kovalen neutral)',
      densityAndOdor: 'Berbau alkohol; toksik; diguna sebagai pelarut & bahan api',
    },
    kssmNote: 'Kumpulan berfungsi —OH terikat secara kovalen pada karbon (bukan ion hidroksida OH⁻!).',
  },
  {
    id: 'etanol',
    name: 'Etanol',
    molecularFormula: 'C₂H₅OH',
    counts: { C: 2, H: 6, O: 1 },
    homologousSeries: 'Alkohol',
    categoryType: 'Bukan Hidrokarbon',
    generalFormula: 'CₙH₂ₙ₊₁OH (n = 1, 2, 3...)',
    functionalGroupName: 'Kumpulan hidroksil',
    functionalGroupNotation: '—OH',
    nodes: [
      { element: 'H', gx: 0, gy: 1 },
      { element: 'C', gx: 1, gy: 1 },
      { element: 'C', gx: 2, gy: 1 },
      { element: 'O', gx: 3, gy: 1, isFunctional: true },
      { element: 'H', gx: 4, gy: 1, isFunctional: true },
      { element: 'H', gx: 1, gy: 0 },
      { element: 'H', gx: 1, gy: 2 },
      { element: 'H', gx: 2, gy: 0 },
      { element: 'H', gx: 2, gy: 2 },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 2, to: 3, order: 1 },
      { from: 3, to: 4, order: 1 },
      { from: 1, to: 5, order: 1 },
      { from: 1, to: 6, order: 1 },
      { from: 2, to: 7, order: 1 },
      { from: 2, to: 8, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Cecair tidak berwarna & mudah meruap',
      meltingPoint: '-114 °C',
      boilingPoint: '78 °C',
      solubilityWater: 'Terlarut campur dalam air pada semua kadar',
      solubilityOrganic: 'Pelarut organik sangat baik (minyak wangi, antiseptik)',
      conductivity: 'Tidak mengkonduksikan elektrik',
      densityAndOdor: 'Berbau khas; takat didih lebih tinggi daripada etena sepadan (-104 °C)',
    },
    kssmNote: 'Dihasilkan melalui penapaian glukosa atau penghidratan etena. Diguna dalam antiseptik, pelarut & bahan api.',
  },
  {
    id: 'propan-1-ol',
    name: 'Propan-1-ol',
    molecularFormula: 'C₃H₇OH',
    counts: { C: 3, H: 8, O: 1 },
    homologousSeries: 'Alkohol',
    categoryType: 'Bukan Hidrokarbon',
    generalFormula: 'CₙH₂ₙ₊₁OH (n = 3)',
    functionalGroupName: 'Kumpulan hidroksil',
    functionalGroupNotation: '—OH (pada karbon C-1)',
    nodes: [
      { element: 'H', gx: 0, gy: 1 },
      { element: 'C', gx: 1, gy: 1 },
      { element: 'C', gx: 2, gy: 1 },
      { element: 'C', gx: 3, gy: 1 },
      { element: 'O', gx: 4, gy: 1, isFunctional: true },
      { element: 'H', gx: 5, gy: 1, isFunctional: true },
      { element: 'H', gx: 1, gy: 0 },
      { element: 'H', gx: 1, gy: 2 },
      { element: 'H', gx: 2, gy: 0 },
      { element: 'H', gx: 2, gy: 2 },
      { element: 'H', gx: 3, gy: 0 },
      { element: 'H', gx: 3, gy: 2 },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 2, to: 3, order: 1 },
      { from: 3, to: 4, order: 1 },
      { from: 4, to: 5, order: 1 },
      { from: 1, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
      { from: 2, to: 8, order: 1 },
      { from: 2, to: 9, order: 1 },
      { from: 3, to: 10, order: 1 },
      { from: 3, to: 11, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Cecair tidak berwarna',
      meltingPoint: '-126 °C',
      boilingPoint: '97 °C',
      solubilityWater: 'Terlarut campur dalam air pada semua kadar',
      solubilityOrganic: 'Larut dalam pelarut organik',
      conductivity: 'Tidak mengkonduksikan elektrik',
      densityAndOdor: 'Mempunyai isomer kedudukan iaitu Propan-2-ol',
    },
    kssmNote: 'Contoh ahli ketiga alkohol (m.s. 76). Mempunyai isomer kedudukan Propan-2-ol.',
  },

  // ==================== ASID KARBOKSILIK ====================
  {
    id: 'asid-metanoik',
    name: 'Asid metanoik',
    molecularFormula: 'HCOOH',
    counts: { C: 1, H: 2, O: 2 },
    homologousSeries: 'Asid karboksilik',
    categoryType: 'Bukan Hidrokarbon',
    generalFormula: 'CₙH₂ₙ₊₁COOH (n = 0, 1, 2...)',
    functionalGroupName: 'Kumpulan karboksil',
    functionalGroupNotation: '—COOH (—C(═O)—OH)',
    nodes: [
      { element: 'H', gx: 0, gy: 1.2 },
      { element: 'C', gx: 1.2, gy: 1.2, isFunctional: true },
      { element: 'O', gx: 1.2, gy: 0.1, isFunctional: true },
      { element: 'O', gx: 2.3, gy: 1.2, isFunctional: true },
      { element: 'H', gx: 3.3, gy: 1.2, isFunctional: true },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 2 },
      { from: 1, to: 3, order: 1 },
      { from: 3, to: 4, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Cecair tidak berwarna',
      meltingPoint: '8.4 °C',
      boilingPoint: '100.8 °C',
      solubilityWater: 'Sangat larut di dalam air',
      solubilityOrganic: 'Larut dalam kebanyakan pelarut organik',
      conductivity: 'Larutan akueus mengkonduksikan elektrik secara lemah (mengion separa jadi asid lemah)',
      densityAndOdor: 'Berbau sengit; terdapat pada gigitan semut (asid formik)',
    },
    kssmNote: 'Ahli pertama asid karboksilik (n = 0 dalam formula am CₙH₂ₙ₊₁COOH).',
  },
  {
    id: 'asid-etanoik',
    name: 'Asid etanoik',
    molecularFormula: 'CH₃COOH',
    counts: { C: 2, H: 4, O: 2 },
    homologousSeries: 'Asid karboksilik',
    categoryType: 'Bukan Hidrokarbon',
    generalFormula: 'CₙH₂ₙ₊₁COOH (n = 0, 1, 2...)',
    functionalGroupName: 'Kumpulan karboksil',
    functionalGroupNotation: '—COOH (—C(═O)—OH)',
    nodes: [
      { element: 'H', gx: 0, gy: 1.2 },
      { element: 'C', gx: 1, gy: 1.2 },
      { element: 'C', gx: 2.2, gy: 1.2, isFunctional: true },
      { element: 'O', gx: 2.2, gy: 0.1, isFunctional: true },
      { element: 'O', gx: 3.3, gy: 1.2, isFunctional: true },
      { element: 'H', gx: 4.3, gy: 1.2, isFunctional: true },
      { element: 'H', gx: 1, gy: 0.2 },
      { element: 'H', gx: 1, gy: 2.2 },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 2, to: 3, order: 2 },
      { from: 2, to: 4, order: 1 },
      { from: 4, to: 5, order: 1 },
      { from: 1, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Cecair tidak berwarna (pepejal glasial < 16.6 °C)',
      meltingPoint: '16.6 °C',
      boilingPoint: '118 °C',
      solubilityWater: 'Sangat larut di dalam air',
      solubilityOrganic: 'Larut dalam pelarut organik & alkohol',
      conductivity: 'Mengion separa di dalam air menghasilkan ion H⁺ (asid lemah)',
      densityAndOdor: 'Berbau sengit cuka; berkongsi formula C₂H₄O₂ dengan metil metanoat',
    },
    kssmNote: 'Asid etanoik (cuka) bertindak balas dengan alkohol membentuk ester yang berbau wangi.',
  },
  {
    id: 'metil-metanoat',
    name: 'Metil metanoat',
    molecularFormula: 'HCOOCH₃',
    counts: { C: 2, H: 4, O: 2 },
    homologousSeries: 'Ester',
    categoryType: 'Bukan Hidrokarbon',
    generalFormula: 'CₘH₂ₘ₊₁COOCₙH₂ₙ₊₁ (m = 0, n = 1)',
    functionalGroupName: 'Kumpulan karboksilat',
    functionalGroupNotation: '—COO— (—C(═O)—O—)',
    nodes: [
      { element: 'H', gx: 0, gy: 1.2 },
      { element: 'C', gx: 1.1, gy: 1.2, isFunctional: true },
      { element: 'O', gx: 1.1, gy: 0.1, isFunctional: true },
      { element: 'O', gx: 2.2, gy: 1.2, isFunctional: true },
      { element: 'C', gx: 3.3, gy: 1.2 },
      { element: 'H', gx: 3.3, gy: 0.2 },
      { element: 'H', gx: 3.3, gy: 2.2 },
      { element: 'H', gx: 4.3, gy: 1.2 },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 2 },
      { from: 1, to: 3, order: 1 },
      { from: 3, to: 4, order: 1 },
      { from: 4, to: 5, order: 1 },
      { from: 4, to: 6, order: 1 },
      { from: 4, to: 7, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Cecair tidak berwarna & mudah meruap',
      meltingPoint: '-99 °C',
      boilingPoint: '31.8 °C',
      solubilityWater: 'Tidak larut di dalam air',
      solubilityOrganic: 'Larut dalam pelarut organik',
      conductivity: 'Tidak mengkonduksikan elektrik (sebatian kovalen neutral)',
      densityAndOdor: 'Berbau wangi seperti buah-buahan; kurang tumpat (terapung di atas air)',
    },
    kssmNote: 'Terhasil daripada asid metanoik (HCOOH) + metanol (CH₃OH). Formula molekul sama (C₂H₄O₂) dengan asid etanoik!',
  },
  {
    id: 'metil-etanoat',
    name: 'Metil etanoat',
    molecularFormula: 'CH₃COOCH₃',
    counts: { C: 3, H: 6, O: 2 },
    homologousSeries: 'Ester',
    categoryType: 'Bukan Hidrokarbon',
    generalFormula: 'CₘH₂ₘ₊₁COOCₙH₂ₙ₊₁ (m = 1, n = 1)',
    functionalGroupName: 'Kumpulan karboksilat',
    functionalGroupNotation: '—COO—',
    nodes: [
      { element: 'H', gx: 0, gy: 1.2 },
      { element: 'C', gx: 1, gy: 1.2 },
      { element: 'C', gx: 2.1, gy: 1.2, isFunctional: true },
      { element: 'O', gx: 2.1, gy: 0.1, isFunctional: true },
      { element: 'O', gx: 3.2, gy: 1.2, isFunctional: true },
      { element: 'C', gx: 4.3, gy: 1.2 },
      { element: 'H', gx: 1, gy: 0.2 },
      { element: 'H', gx: 1, gy: 2.2 },
      { element: 'H', gx: 4.3, gy: 0.2 },
      { element: 'H', gx: 4.3, gy: 2.2 },
      { element: 'H', gx: 5.3, gy: 1.2 },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 2, to: 3, order: 2 },
      { from: 2, to: 4, order: 1 },
      { from: 4, to: 5, order: 1 },
      { from: 1, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
      { from: 5, to: 8, order: 1 },
      { from: 5, to: 9, order: 1 },
      { from: 5, to: 10, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Cecair tidak berwarna & mudah meruap',
      meltingPoint: '-98 °C',
      boilingPoint: '56.9 °C',
      solubilityWater: 'Tidak larut di dalam air',
      solubilityOrganic: 'Larut dalam pelarut organik',
      conductivity: 'Tidak mengkonduksikan elektrik',
      densityAndOdor: 'Berbau wangi manis buah-buahan; kurang tumpat daripada air',
    },
    kssmNote: 'Ester daripada asid etanoik + metanol. Berkongsi formula C₃H₆O₂ dengan asid propanoik.',
  },
  {
    id: 'asid-propanoik',
    name: 'Asid propanoik',
    molecularFormula: 'C₂H₅COOH',
    counts: { C: 3, H: 6, O: 2 },
    homologousSeries: 'Asid karboksilik',
    categoryType: 'Bukan Hidrokarbon',
    generalFormula: 'CₙH₂ₙ₊₁COOH (n = 2)',
    functionalGroupName: 'Kumpulan karboksil',
    functionalGroupNotation: '—COOH',
    nodes: [
      { element: 'H', gx: 0, gy: 1.2 },
      { element: 'C', gx: 1, gy: 1.2 },
      { element: 'C', gx: 2, gy: 1.2 },
      { element: 'C', gx: 3.1, gy: 1.2, isFunctional: true },
      { element: 'O', gx: 3.1, gy: 0.1, isFunctional: true },
      { element: 'O', gx: 4.2, gy: 1.2, isFunctional: true },
      { element: 'H', gx: 5.2, gy: 1.2, isFunctional: true },
      { element: 'H', gx: 1, gy: 0.2 },
      { element: 'H', gx: 1, gy: 2.2 },
      { element: 'H', gx: 2, gy: 0.2 },
      { element: 'H', gx: 2, gy: 2.2 },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 2, to: 3, order: 1 },
      { from: 3, to: 4, order: 2 },
      { from: 3, to: 5, order: 1 },
      { from: 5, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
      { from: 1, to: 8, order: 1 },
      { from: 2, to: 9, order: 1 },
      { from: 2, to: 10, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Cecair tidak berwarna',
      meltingPoint: '-21 °C',
      boilingPoint: '141 °C',
      solubilityWater: 'Sangat larut di dalam air',
      solubilityOrganic: 'Larut dalam pelarut organik',
      conductivity: 'Mengkonduksikan elektrik secara lemah dalam larutan akueus',
      densityAndOdor: 'Berbau tajam tengik; asid lemah (pH < 7)',
    },
    kssmNote: 'Ahli ketiga asid karboksilik (3 karbon). Isomer fungsi bagi metil etanoat (C₃H₆O₂).',
  },
  {
    id: 'etil-etanoat',
    name: 'Etil etanoat',
    molecularFormula: 'CH₃COOC₂H₅',
    counts: { C: 4, H: 8, O: 2 },
    homologousSeries: 'Ester',
    categoryType: 'Bukan Hidrokarbon',
    generalFormula: 'CₘH₂ₘ₊₁COOCₙH₂ₙ₊₁ (m = 1, n = 2)',
    functionalGroupName: 'Kumpulan karboksilat',
    functionalGroupNotation: '—COO—',
    nodes: [
      { element: 'H', gx: 0, gy: 1.2 },
      { element: 'C', gx: 1, gy: 1.2 },
      { element: 'C', gx: 2, gy: 1.2, isFunctional: true },
      { element: 'O', gx: 2, gy: 0.1, isFunctional: true },
      { element: 'O', gx: 3, gy: 1.2, isFunctional: true },
      { element: 'C', gx: 4, gy: 1.2 },
      { element: 'C', gx: 5, gy: 1.2 },
      { element: 'H', gx: 1, gy: 0.2 },
      { element: 'H', gx: 1, gy: 2.2 },
      { element: 'H', gx: 4, gy: 0.2 },
      { element: 'H', gx: 4, gy: 2.2 },
      { element: 'H', gx: 5, gy: 0.2 },
      { element: 'H', gx: 5, gy: 2.2 },
      { element: 'H', gx: 6, gy: 1.2 },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 2, to: 3, order: 2 },
      { from: 2, to: 4, order: 1 },
      { from: 4, to: 5, order: 1 },
      { from: 5, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
      { from: 1, to: 8, order: 1 },
      { from: 5, to: 9, order: 1 },
      { from: 5, to: 10, order: 1 },
      { from: 6, to: 11, order: 1 },
      { from: 6, to: 12, order: 1 },
      { from: 6, to: 13, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Cecair tidak berwarna & mudah meruap',
      meltingPoint: '-83.6 °C',
      boilingPoint: '77 °C',
      solubilityWater: 'Tidak larut di dalam air (terapung membentuk lapisan)',
      solubilityOrganic: 'Larut dalam pelarut organik',
      conductivity: 'Tidak mengkonduksikan elektrik',
      densityAndOdor: 'Berbau manis buah-buahan (perisa & minyak wangi)',
    },
    kssmNote: 'Ester utama dalam buku teks (m.s. 98): CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O (mangkin H₂SO₄ pekat).',
  },

  // ==================== HALOGENOALKANA (KLORIN, BROMIN, IODIN - M.S. 81 & 84) ====================
  {
    id: 'klorometana',
    name: 'Klorometana',
    molecularFormula: 'CH₃Cl',
    counts: { C: 1, H: 3, Cl: 1 },
    homologousSeries: 'Halogenoalkana (Terbitan Alkana)',
    categoryType: 'Terbitan Organik',
    generalFormula: 'CₙH₂ₙ₊₁X (X = Cl, Br, I)',
    functionalGroupName: 'Kumpulan halo (kloro)',
    functionalGroupNotation: '—Cl',
    nodes: [
      { element: 'C', gx: 1, gy: 1 },
      { element: 'H', gx: 1, gy: 0 },
      { element: 'H', gx: 1, gy: 2 },
      { element: 'H', gx: 0, gy: 1 },
      { element: 'Cl', gx: 2, gy: 1, isFunctional: true },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Gas tidak berwarna',
      meltingPoint: '-97.7 °C',
      boilingPoint: '-24.2 °C',
      solubilityWater: 'Sedikit/hampir tidak larut di dalam air',
      solubilityOrganic: 'Larut di dalam pelarut organik',
      conductivity: 'Tidak mengkonduksikan elektrik',
      densityAndOdor: 'Bau manis lembut; mudah meruap',
    },
    kssmNote: 'Hasil Peringkat 1 tindak balas penukargantian metana dengan Cl₂ di bawah cahaya UV (m.s. 81).',
  },
  {
    id: 'diklorometana',
    name: 'Diklorometana',
    molecularFormula: 'CH₂Cl₂',
    counts: { C: 1, H: 2, Cl: 2 },
    homologousSeries: 'Halogenoalkana (Terbitan Alkana)',
    categoryType: 'Terbitan Organik',
    generalFormula: 'CₙH₂ₙX₂',
    functionalGroupName: 'Kumpulan halo (dikloro)',
    functionalGroupNotation: '—Cl (2 atom Cl)',
    nodes: [
      { element: 'C', gx: 1, gy: 1 },
      { element: 'H', gx: 1, gy: 0 },
      { element: 'H', gx: 1, gy: 2 },
      { element: 'Cl', gx: 0, gy: 1, isFunctional: true },
      { element: 'Cl', gx: 2, gy: 1, isFunctional: true },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Cecair tidak berwarna & mudah meruap',
      meltingPoint: '-96.7 °C',
      boilingPoint: '39.6 °C',
      solubilityWater: 'Tidak larut di dalam air',
      solubilityOrganic: 'Pelarut organik industri penting',
      conductivity: 'Tidak mengkonduksikan elektrik',
      densityAndOdor: 'Lebih tumpat daripada air (1.33 g/cm³); bau manis',
    },
    kssmNote: 'Hasil Peringkat 2 tindak balas penukargantian CH₃Cl + Cl₂ → CH₂Cl₂ + HCl (m.s. 81).',
  },
  {
    id: 'triklorometana',
    name: 'Triklorometana (Kloroform)',
    molecularFormula: 'CHCl₃',
    counts: { C: 1, H: 1, Cl: 3 },
    homologousSeries: 'Halogenoalkana (Terbitan Alkana)',
    categoryType: 'Terbitan Organik',
    generalFormula: 'CHX₃',
    functionalGroupName: 'Kumpulan halo (trikloro)',
    functionalGroupNotation: '—Cl (3 atom Cl)',
    nodes: [
      { element: 'C', gx: 1, gy: 1 },
      { element: 'H', gx: 1, gy: 0 },
      { element: 'Cl', gx: 1, gy: 2, isFunctional: true },
      { element: 'Cl', gx: 0, gy: 1, isFunctional: true },
      { element: 'Cl', gx: 2, gy: 1, isFunctional: true },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Cecair tidak berwarna & tumpat',
      meltingPoint: '-63.5 °C',
      boilingPoint: '61.2 °C',
      solubilityWater: 'Tidak larut di dalam air',
      solubilityOrganic: 'Larut dalam pelarut organik (pelarut makmal)',
      conductivity: 'Tidak mengkonduksikan elektrik',
      densityAndOdor: 'Lebih tumpat daripada air; berbau manis',
    },
    kssmNote: 'Hasil Peringkat 3 tindak balas penukargantian metana dengan klorin berlebihan (m.s. 81).',
  },
  {
    id: 'tetraklorometana',
    name: 'Tetraklorometana',
    molecularFormula: 'CCl₄',
    counts: { C: 1, Cl: 4 },
    homologousSeries: 'Halogenoalkana (Terbitan Alkana)',
    categoryType: 'Terbitan Organik',
    generalFormula: 'CX₄',
    functionalGroupName: 'Kumpulan halo (tetrakloro)',
    functionalGroupNotation: '—Cl (4 atom Cl)',
    nodes: [
      { element: 'C', gx: 1, gy: 1 },
      { element: 'Cl', gx: 1, gy: 0, isFunctional: true },
      { element: 'Cl', gx: 1, gy: 2, isFunctional: true },
      { element: 'Cl', gx: 0, gy: 1, isFunctional: true },
      { element: 'Cl', gx: 2, gy: 1, isFunctional: true },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Cecair tidak berwarna',
      meltingPoint: '-22.9 °C',
      boilingPoint: '76.7 °C',
      solubilityWater: 'Tidak larut di dalam air',
      solubilityOrganic: 'Pelarut organik bukan berkutub sangat baik (mengekstrak I₂/Br₂)',
      conductivity: 'Tidak mengkonduksikan elektrik',
      densityAndOdor: 'Lebih tumpat daripada air; tenggelam di dasar air',
    },
    kssmNote: 'Hasil akhir (Peringkat 4) penukargantian lengkap metana oleh Cl₂ di bawah sinaran UV (m.s. 81).',
  },
  {
    id: 'bromometana',
    name: 'Bromometana',
    molecularFormula: 'CH₃Br',
    counts: { C: 1, H: 3, Br: 1 },
    homologousSeries: 'Halogenoalkana (Terbitan Alkana)',
    categoryType: 'Terbitan Organik',
    generalFormula: 'CₙH₂ₙ₊₁Br',
    functionalGroupName: 'Kumpulan halo (bromo)',
    functionalGroupNotation: '—Br',
    nodes: [
      { element: 'C', gx: 1, gy: 1 },
      { element: 'H', gx: 1, gy: 0 },
      { element: 'H', gx: 1, gy: 2 },
      { element: 'H', gx: 0, gy: 1 },
      { element: 'Br', gx: 2, gy: 1, isFunctional: true },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Gas tidak berwarna',
      meltingPoint: '-93.6 °C',
      boilingPoint: '3.6 °C',
      solubilityWater: 'Hampir tidak larut di dalam air',
      solubilityOrganic: 'Larut dalam pelarut organik',
      conductivity: 'Tidak mengkonduksikan elektrik',
      densityAndOdor: 'Hasil penukargantian metana dengan wap bromin (UV)',
    },
    kssmNote: 'Terbentuk apabila satu atom H pada metana digantikan oleh atom bromin di bawah cahaya matahari.',
  },
  {
    id: '1-2-dibromoetana',
    name: '1,2-Dibromoetana',
    molecularFormula: 'C₂H₄Br₂',
    counts: { C: 2, H: 4, Br: 2 },
    homologousSeries: 'Halogenoalkana (Hasil Penambahan Alkena)',
    categoryType: 'Terbitan Organik',
    generalFormula: 'CₙH₂ₙBr₂',
    functionalGroupName: 'Kumpulan halo (dibromo)',
    functionalGroupNotation: '—Br pada kedua-dua karbon bersebelahan',
    nodes: [
      { element: 'H', gx: 0, gy: 1 },
      { element: 'C', gx: 1, gy: 1 },
      { element: 'C', gx: 2, gy: 1 },
      { element: 'H', gx: 3, gy: 1 },
      { element: 'H', gx: 1, gy: 0 },
      { element: 'Br', gx: 1, gy: 2, isFunctional: true },
      { element: 'H', gx: 2, gy: 0 },
      { element: 'Br', gx: 2, gy: 2, isFunctional: true },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 2, to: 3, order: 1 },
      { from: 1, to: 4, order: 1 },
      { from: 1, to: 5, order: 1 },
      { from: 2, to: 6, order: 1 },
      { from: 2, to: 7, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Cecair tidak berwarna',
      meltingPoint: '9.8 °C',
      boilingPoint: '131.4 °C',
      solubilityWater: 'Tidak larut di dalam air',
      solubilityOrganic: 'Larut dalam pelarut organik',
      conductivity: 'Tidak mengkonduksikan elektrik',
      densityAndOdor: 'Lebih tumpat daripada air; terhasil apabila etena menyahwarnakan air bromin',
    },
    kssmNote: 'Hasil tindak balas penambahan etena dengan bromin (C₂H₄ + Br₂ → C₂H₄Br₂) untuk ujian hidrokarbon tak tepu!',
  },
  {
    id: 'kloroetana',
    name: 'Kloroetana',
    molecularFormula: 'C₂H₅Cl',
    counts: { C: 2, H: 5, Cl: 1 },
    homologousSeries: 'Halogenoalkana',
    categoryType: 'Terbitan Organik',
    generalFormula: 'CₙH₂ₙ₊₁Cl',
    functionalGroupName: 'Kumpulan halo (kloro)',
    functionalGroupNotation: '—Cl',
    nodes: [
      { element: 'H', gx: 0, gy: 1 },
      { element: 'C', gx: 1, gy: 1 },
      { element: 'C', gx: 2, gy: 1 },
      { element: 'Cl', gx: 3, gy: 1, isFunctional: true },
      { element: 'H', gx: 1, gy: 0 },
      { element: 'H', gx: 1, gy: 2 },
      { element: 'H', gx: 2, gy: 0 },
      { element: 'H', gx: 2, gy: 2 },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 2, to: 3, order: 1 },
      { from: 1, to: 4, order: 1 },
      { from: 1, to: 5, order: 1 },
      { from: 2, to: 6, order: 1 },
      { from: 2, to: 7, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Gas tidak berwarna',
      meltingPoint: '-136.4 °C',
      boilingPoint: '12.3 °C',
      solubilityWater: 'Sukar larut dalam air',
      solubilityOrganic: 'Larut dalam pelarut organik',
      conductivity: 'Tidak mengkonduksikan elektrik',
      densityAndOdor: 'Meruap pantas (diguna sebagai penyembur penyejuk anestetik topikal)',
    },
    kssmNote: 'Hasil penukargantian etana dengan klorin atau penambahan HCl kepada etena.',
  },
  {
    id: 'iodometana',
    name: 'Iodometana',
    molecularFormula: 'CH₃I',
    counts: { C: 1, H: 3, I: 1 },
    homologousSeries: 'Halogenoalkana',
    categoryType: 'Terbitan Organik',
    generalFormula: 'CₙH₂ₙ₊₁I',
    functionalGroupName: 'Kumpulan halo (iodo)',
    functionalGroupNotation: '—I',
    nodes: [
      { element: 'C', gx: 1, gy: 1 },
      { element: 'H', gx: 1, gy: 0 },
      { element: 'H', gx: 1, gy: 2 },
      { element: 'H', gx: 0, gy: 1 },
      { element: 'I', gx: 2, gy: 1, isFunctional: true },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Cecair tidak berwarna & tumpat',
      meltingPoint: '-66.5 °C',
      boilingPoint: '42.4 °C',
      solubilityWater: 'Sukar larut dalam air',
      solubilityOrganic: 'Larut dalam etanol dan pelarut organik',
      conductivity: 'Tidak mengkonduksikan elektrik',
      densityAndOdor: 'Lebih tumpat daripada air (2.28 g/cm³); takat didih tertinggi antara halo-metana',
    },
    kssmNote: 'Saiz molekul yang lebih besar meningkatkan daya van der Waals berbanding klorometana & bromometana.',
  },

  // ==================== SEBATIAN BERNITROGEN (AMINA, NITRIL, UREA) ====================
  {
    id: 'metilamina',
    name: 'Metilamina',
    molecularFormula: 'CH₃NH₂',
    counts: { C: 1, H: 5, N: 1 },
    homologousSeries: 'Amina (Sebatian Organik Bernitrogen)',
    categoryType: 'Terbitan Organik',
    generalFormula: 'CₙH₂ₙ₊₁NH₂ (n = 1, 2, 3...)',
    functionalGroupName: 'Kumpulan amino',
    functionalGroupNotation: '—NH₂',
    nodes: [
      { element: 'H', gx: 0, gy: 1 },
      { element: 'C', gx: 1, gy: 1 },
      { element: 'N', gx: 2, gy: 1, isFunctional: true },
      { element: 'H', gx: 3, gy: 1, isFunctional: true },
      { element: 'H', gx: 1, gy: 0 },
      { element: 'H', gx: 1, gy: 2 },
      { element: 'H', gx: 2, gy: 0, isFunctional: true },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 2, to: 3, order: 1 },
      { from: 1, to: 4, order: 1 },
      { from: 1, to: 5, order: 1 },
      { from: 2, to: 6, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Gas tidak berwarna',
      meltingPoint: '-93.5 °C',
      boilingPoint: '-6.3 °C',
      solubilityWater: 'Sangat larut dalam air (membentuk larutan beralkali lemah)',
      solubilityOrganic: 'Larut dalam pelarut organik',
      conductivity: 'Larutan akueus mengkonduksikan elektrik secara lemah',
      densityAndOdor: 'Berbau hanyir seperti ammonia/ikan',
    },
    kssmNote: 'Atom nitrogen membentuk 3 ikatan kovalen (satu dengan karbon, dua dengan hidrogen dalam kumpulan —NH₂).',
  },
  {
    id: 'etananitril',
    name: 'Etananitril',
    molecularFormula: 'CH₃CN',
    counts: { C: 2, H: 3, N: 1 },
    homologousSeries: 'Nitril (Sebatian Bernitrogen)',
    categoryType: 'Terbitan Organik',
    generalFormula: 'R—C≡N',
    functionalGroupName: 'Kumpulan siano / nitril',
    functionalGroupNotation: '—C≡N (ikatan ganda tiga C≡N)',
    nodes: [
      { element: 'H', gx: 0, gy: 1 },
      { element: 'C', gx: 1, gy: 1 },
      { element: 'C', gx: 2, gy: 1, isFunctional: true },
      { element: 'N', gx: 3, gy: 1, isFunctional: true },
      { element: 'H', gx: 1, gy: 0 },
      { element: 'H', gx: 1, gy: 2 },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 2, to: 3, order: 3 },
      { from: 1, to: 4, order: 1 },
      { from: 1, to: 5, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Cecair tidak berwarna',
      meltingPoint: '-45 °C',
      boilingPoint: '81.6 °C',
      solubilityWater: 'Terlarut campur dalam air',
      solubilityOrganic: 'Pelarut polar dalam makmal kimia organik',
      conductivity: 'Tidak mengkonduksikan elektrik (sebatian kovalen neutral)',
      densityAndOdor: 'Kurang tumpat daripada air; berbau seperti eter',
    },
    kssmNote: 'Contoh jelas ikatan kovalen ganda tiga antara karbon dengan nitrogen (—C≡N).',
  },
  {
    id: 'urea',
    name: 'Urea (Karbamida)',
    molecularFormula: 'CO(NH₂)₂',
    counts: { C: 1, H: 4, O: 1, N: 2 },
    homologousSeries: 'Amida / Sebatian Organik Bernitrogen',
    categoryType: 'Terbitan Organik',
    generalFormula: 'O═C(NH₂)₂',
    functionalGroupName: 'Kumpulan karbamida / amida',
    functionalGroupNotation: '—C(═O)—NH₂',
    nodes: [
      { element: 'H', gx: 0, gy: 1.3 },
      { element: 'N', gx: 1, gy: 1.3, isFunctional: true },
      { element: 'C', gx: 2, gy: 1.3, isFunctional: true },
      { element: 'N', gx: 3, gy: 1.3, isFunctional: true },
      { element: 'H', gx: 4, gy: 1.3 },
      { element: 'O', gx: 2, gy: 0.2, isFunctional: true },
      { element: 'H', gx: 1, gy: 2.3 },
      { element: 'H', gx: 3, gy: 2.3 },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 2, to: 3, order: 1 },
      { from: 3, to: 4, order: 1 },
      { from: 2, to: 5, order: 2 },
      { from: 1, to: 6, order: 1 },
      { from: 3, to: 7, order: 1 },
    ],
    physical: {
      stateAtRoomTemp: 'Pepejal hablur putih',
      meltingPoint: '133 °C',
      boilingPoint: 'Terurai sebelum mendidih',
      solubilityWater: 'Sangat larut dalam air',
      solubilityOrganic: 'Larut dalam etanol',
      conductivity: 'Tidak mengkonduksikan elektrik',
      densityAndOdor: 'Tidak berbau; baja bernitrogen tinggi (kaitan Bab Baja / Nitrogen KSSM)',
    },
    kssmNote: 'Sebatian organik pertama disintesis daripada bahan tak organik; mengandungi C, H, O, dan N!',
  },
];

export function findExactCompounds(counts: AtomCounts): CarbonCompound[] {
  return CARBON_COMPOUNDS.filter((comp) => countsEqual(counts, comp.counts));
}

export interface PartialSuggestion {
  compound: CarbonCompound;
  missingText: string;
}

export function findCloseSuggestions(counts: AtomCounts, limit = 4): PartialSuggestion[] {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  if (total === 0) return [];

  const elements: ElementSymbol[] = ['C', 'H', 'O', 'N', 'Cl', 'Br', 'I'];
  const sub = (n: number) =>
    n <= 1
      ? ''
      : String(n)
          .split('')
          .map((d) => '₀₁₂₃₄₅₆₇₈₉'[Number(d)])
          .join('');

  const matches: Array<{ comp: CarbonCompound; missing: number; missingText: string }> = [];

  for (const comp of CARBON_COMPOUNDS) {
    const target = normalizeCounts(comp.counts);
    let canReach = true;
    let missingSum = 0;
    const missingParts: string[] = [];

    for (const el of elements) {
      if (counts[el] > target[el]) {
        canReach = false;
        break;
      }
      const diff = target[el] - counts[el];
      if (diff > 0) {
        missingSum += diff;
        missingParts.push(`+${diff} ${el}${sub(1)}`);
      }
    }

    if (canReach && missingSum > 0) {
      matches.push({ comp, missing: missingSum, missingText: missingParts.join(', ') });
    }
  }

  matches.sort((a, b) => a.missing - b.missing || a.comp.nodes.length - b.comp.nodes.length);
  return matches.slice(0, limit).map((m) => ({ compound: m.comp, missingText: m.missingText }));
}
