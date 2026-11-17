export interface ElementPickDef {
  id: string;
  symbol: string;
  name: string;
  category: 'metal' | 'nonmetal';
  protonNumber: number;
  neutronNumber: number;
  shells: number[];
  electronConfig: string;
  valenceElectrons: number;
  valenceChange: number; // bil. e- diderma (logam) atau diterima/dikongsi (bukan logam)
  ionShells: number[];
  ionConfig: string;
  cationPart?: string; // e.g. 'Natrium'
  anionPart?: string;  // e.g. 'klorida', 'oksida'
  covalentRoot?: string; // e.g. 'klorin', 'oksigen', 'klorida'
  iupacRank: number; // untuk tertib penulisan formula kovalen
}

export interface PhysicalPropsSummary {
  physicalState: string;
  structureType: string;
  meltingBoilingPoint: string;
  meltingReason: string;
  electricalConductivity: string;
  conductivityReason: string;
  solubility: string;
  solubilityNote: string;
}

export interface IonicSynthesisResult {
  kind: 'ionic';
  metal: ElementPickDef;
  nonmetal: ElementPickDef;
  formula: string;
  compoundName: string;
  bondLabel: string;
  metalCount: number;
  nonmetalCount: number;
  metalCharge: number;
  nonmetalCharge: number;
  totalElectronsTransferred: number;
  halfEqMetal: string;
  halfEqNonmetal: string;
  overallEquation: string;
  explanationSteps: string[];
  physicalProps: PhysicalPropsSummary;
}

export interface CovalentSynthesisResult {
  kind: 'covalent';
  isHomodiatomic: boolean;
  isGiantCovalent: boolean;
  centerEl: ElementPickDef;
  outerEl: ElementPickDef;
  centerCount: number;
  outerCount: number; // 1..4 atom mengelilingi atom pusat
  bondOrder: 1 | 2 | 3;
  bondTypeLabel: string; // Ikatan Kovalen Tunggal / Ganda Dua / Ganda Tiga
  lewisLineFormula: string; // e.g. Cl–Cl, O=C=O, H–O–H
  formula: string;
  compoundName: string;
  explanationSteps: string[];
  physicalProps: PhysicalPropsSummary;
}

export interface SpecialCaseResult {
  kind: 'no-compound-metals' | 'special-non-octet';
  elA: ElementPickDef;
  elB: ElementPickDef;
  title: string;
  subtitle: string;
  formula?: string;
  compoundName?: string;
  bondLabel: string;
  explanationSteps: string[];
  physicalProps?: PhysicalPropsSummary;
}

export type SynthesisOutcome =
  | IonicSynthesisResult
  | CovalentSynthesisResult
  | SpecialCaseResult;

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

const SUB_MAP: Record<string, string> = {
  '0': '₀',
  '1': '₁',
  '2': '₂',
  '3': '₃',
  '4': '₄',
  '5': '₅',
  '6': '₆',
  '7': '₇',
  '8': '₈',
  '9': '₉',
};

function toSub(n: number): string {
  if (n <= 1) return '';
  return String(n)
    .split('')
    .map((c) => SUB_MAP[c] ?? c)
    .join('');
}

function formatChargeStr(mag: number, sign: '+' | '−'): string {
  return mag === 1 ? sign : `${mag}${sign}`;
}

// 7 Unsur Logam + 11 Unsur Bukan Logam (mencakup semua unsur asas KSSM & lanjutan)
export const ELEMENTS_PALETTE: ElementPickDef[] = [
  // LOGAM (Penderma Elektron)
  {
    id: 'li',
    symbol: 'Li',
    name: 'Litium',
    category: 'metal',
    protonNumber: 3,
    neutronNumber: 4,
    shells: [2, 1],
    electronConfig: '2.1',
    valenceElectrons: 1,
    valenceChange: 1,
    ionShells: [2],
    ionConfig: '2',
    cationPart: 'Litium',
    iupacRank: 1,
  },
  {
    id: 'na',
    symbol: 'Na',
    name: 'Natrium',
    category: 'metal',
    protonNumber: 11,
    neutronNumber: 12,
    shells: [2, 8, 1],
    electronConfig: '2.8.1',
    valenceElectrons: 1,
    valenceChange: 1,
    ionShells: [2, 8],
    ionConfig: '2.8',
    cationPart: 'Natrium',
    iupacRank: 1,
  },
  {
    id: 'k',
    symbol: 'K',
    name: 'Kalium',
    category: 'metal',
    protonNumber: 19,
    neutronNumber: 20,
    shells: [2, 8, 8, 1],
    electronConfig: '2.8.8.1',
    valenceElectrons: 1,
    valenceChange: 1,
    ionShells: [2, 8, 8],
    ionConfig: '2.8.8',
    cationPart: 'Kalium',
    iupacRank: 1,
  },
  {
    id: 'be',
    symbol: 'Be',
    name: 'Berilium',
    category: 'metal',
    protonNumber: 4,
    neutronNumber: 5,
    shells: [2, 2],
    electronConfig: '2.2',
    valenceElectrons: 2,
    valenceChange: 2,
    ionShells: [2],
    ionConfig: '2',
    cationPart: 'Berilium',
    iupacRank: 2,
  },
  {
    id: 'mg',
    symbol: 'Mg',
    name: 'Magnesium',
    category: 'metal',
    protonNumber: 12,
    neutronNumber: 12,
    shells: [2, 8, 2],
    electronConfig: '2.8.2',
    valenceElectrons: 2,
    valenceChange: 2,
    ionShells: [2, 8],
    ionConfig: '2.8',
    cationPart: 'Magnesium',
    iupacRank: 2,
  },
  {
    id: 'ca',
    symbol: 'Ca',
    name: 'Kalsium',
    category: 'metal',
    protonNumber: 20,
    neutronNumber: 20,
    shells: [2, 8, 8, 2],
    electronConfig: '2.8.8.2',
    valenceElectrons: 2,
    valenceChange: 2,
    ionShells: [2, 8, 8],
    ionConfig: '2.8.8',
    cationPart: 'Kalsium',
    iupacRank: 2,
  },
  {
    id: 'al',
    symbol: 'Al',
    name: 'Aluminium',
    category: 'metal',
    protonNumber: 13,
    neutronNumber: 14,
    shells: [2, 8, 3],
    electronConfig: '2.8.3',
    valenceElectrons: 3,
    valenceChange: 3,
    ionShells: [2, 8],
    ionConfig: '2.8',
    cationPart: 'Aluminium',
    iupacRank: 3,
  },

  // BUKAN LOGAM (Penerima / Perkongsian Elektron)
  {
    id: 'h',
    symbol: 'H',
    name: 'Hidrogen',
    category: 'nonmetal',
    protonNumber: 1,
    neutronNumber: 0,
    shells: [1],
    electronConfig: '1',
    valenceElectrons: 1,
    valenceChange: 1,
    ionShells: [2],
    ionConfig: '2',
    anionPart: 'hidrida',
    covalentRoot: 'Hidrogen',
    iupacRank: 15,
  },
  {
    id: 'c',
    symbol: 'C',
    name: 'Karbon',
    category: 'nonmetal',
    protonNumber: 6,
    neutronNumber: 6,
    shells: [2, 4],
    electronConfig: '2.4',
    valenceElectrons: 4,
    valenceChange: 4,
    ionShells: [2, 8],
    ionConfig: '2.8',
    anionPart: 'karbida',
    covalentRoot: 'Karbon',
    iupacRank: 12,
  },
  {
    id: 'si',
    symbol: 'Si',
    name: 'Silikon',
    category: 'nonmetal',
    protonNumber: 14,
    neutronNumber: 14,
    shells: [2, 8, 4],
    electronConfig: '2.8.4',
    valenceElectrons: 4,
    valenceChange: 4,
    ionShells: [2, 8, 8],
    ionConfig: '2.8.8',
    anionPart: 'silisida',
    covalentRoot: 'Silikon',
    iupacRank: 11,
  },
  {
    id: 'n',
    symbol: 'N',
    name: 'Nitrogen',
    category: 'nonmetal',
    protonNumber: 7,
    neutronNumber: 7,
    shells: [2, 5],
    electronConfig: '2.5',
    valenceElectrons: 5,
    valenceChange: 3,
    ionShells: [2, 8],
    ionConfig: '2.8',
    anionPart: 'nitrida',
    covalentRoot: 'Nitrogen',
    iupacRank: 14,
  },
  {
    id: 'p',
    symbol: 'P',
    name: 'Fosforus',
    category: 'nonmetal',
    protonNumber: 15,
    neutronNumber: 16,
    shells: [2, 8, 5],
    electronConfig: '2.8.5',
    valenceElectrons: 5,
    valenceChange: 3,
    ionShells: [2, 8, 8],
    ionConfig: '2.8.8',
    anionPart: 'fosfida',
    covalentRoot: 'Fosforus',
    iupacRank: 13,
  },
  {
    id: 'o',
    symbol: 'O',
    name: 'Oksigen',
    category: 'nonmetal',
    protonNumber: 8,
    neutronNumber: 8,
    shells: [2, 6],
    electronConfig: '2.6',
    valenceElectrons: 6,
    valenceChange: 2,
    ionShells: [2, 8],
    ionConfig: '2.8',
    anionPart: 'oksida',
    covalentRoot: 'Oksigen',
    iupacRank: 20,
  },
  {
    id: 's',
    symbol: 'S',
    name: 'Sulfur',
    category: 'nonmetal',
    protonNumber: 16,
    neutronNumber: 16,
    shells: [2, 8, 6],
    electronConfig: '2.8.6',
    valenceElectrons: 6,
    valenceChange: 2,
    ionShells: [2, 8, 8],
    ionConfig: '2.8.8',
    anionPart: 'sulfida',
    covalentRoot: 'Sulfur',
    iupacRank: 16,
  },
  {
    id: 'f',
    symbol: 'F',
    name: 'Fluorin',
    category: 'nonmetal',
    protonNumber: 9,
    neutronNumber: 10,
    shells: [2, 7],
    electronConfig: '2.7',
    valenceElectrons: 7,
    valenceChange: 1,
    ionShells: [2, 8],
    ionConfig: '2.8',
    anionPart: 'fluorida',
    covalentRoot: 'Fluorin',
    iupacRank: 21,
  },
  {
    id: 'cl',
    symbol: 'Cl',
    name: 'Klorin',
    category: 'nonmetal',
    protonNumber: 17,
    neutronNumber: 18,
    shells: [2, 8, 7],
    electronConfig: '2.8.7',
    valenceElectrons: 7,
    valenceChange: 1,
    ionShells: [2, 8, 8],
    ionConfig: '2.8.8',
    anionPart: 'klorida',
    covalentRoot: 'Klorin',
    iupacRank: 19,
  },
  {
    id: 'br',
    symbol: 'Br',
    name: 'Bromin',
    category: 'nonmetal',
    protonNumber: 35,
    neutronNumber: 45,
    shells: [2, 8, 18, 7],
    electronConfig: '2.8.18.7',
    valenceElectrons: 7,
    valenceChange: 1,
    ionShells: [2, 8, 18, 8],
    ionConfig: '2.8.18.8',
    anionPart: 'bromida',
    covalentRoot: 'Bromin',
    iupacRank: 18,
  },
  {
    id: 'i',
    symbol: 'I',
    name: 'Iodin',
    category: 'nonmetal',
    protonNumber: 53,
    neutronNumber: 74,
    shells: [2, 8, 18, 18, 7],
    electronConfig: '2.8.18.18.7',
    valenceElectrons: 7,
    valenceChange: 1,
    ionShells: [2, 8, 18, 18, 8],
    ionConfig: '2.8.18.18.8',
    anionPart: 'iodida',
    covalentRoot: 'Iodin',
    iupacRank: 17,
  },
];

// Kamus data sifat fizik sebenar untuk sebatian lazim & luar buku teks
const KNOWN_COMPOUND_OVERRIDES: Record<
  string,
  {
    commonName?: string;
    state?: string;
    mpBp?: string;
    solubility?: string;
    solubilityNote?: string;
  }
> = {
  NaCl: {
    state: 'Pepejal kristal putih',
    mpBp: 'Sangat tinggi (Takat lebur 801 °C, Takat didih 1413 °C)',
  },
  NaF: {
    state: 'Pepejal kristal putih',
    mpBp: 'Sangat tinggi (Takat lebur 993 °C, Takat didih 1695 °C)',
  },
  Na2O: {
    state: 'Pepejal putih',
    mpBp: 'Tinggi (Pemejalwapan ~1275 °C)',
    solubility: 'Bertindak balas dengan air membentuk NaOH(ak); tidak larut dalam pelarut organik',
  },
  MgO: {
    state: 'Pepejal putih refraktori',
    mpBp: 'Amat tinggi (Takat lebur 2852 °C, Takat didih 3600 °C)',
    solubility: 'Hampir tidak larut dalam air (cas ion ±2 menghasilkan tarikan kekisi amat kuat); tidak larut dalam pelarut organik',
  },
  MgCl2: {
    state: 'Pepejal kristal putih',
    mpBp: 'Tinggi (Takat lebur 714 °C, Takat didih 1412 °C)',
  },
  Al2O3: {
    state: 'Pepejal putih keras',
    mpBp: 'Amat tinggi (Takat lebur 2072 °C, Takat didih 2977 °C)',
    solubility: 'Tidak larut dalam air atau pelarut organik (ikatan ion Al³⁺ dengan O²⁻ amat kuat)',
  },
  AlF3: {
    state: 'Pepejal putih',
    mpBp: 'Tinggi (Pemejalwapan 1276 °C)',
    solubility: 'Sedikit larut dalam air; tidak larut dalam pelarut organik',
  },
  CaF2: {
    state: 'Pepejal kristal putih (Fluorit)',
    mpBp: 'Tinggi (Takat lebur 1418 °C, Takat didih 2533 °C)',
    solubility: 'Sukar larut dalam air; tidak larut dalam pelarut organik',
  },
  KCl: {
    state: 'Pepejal kristal putih',
    mpBp: 'Tinggi (Takat lebur 770 °C, Takat didih 1420 °C)',
  },
  LiH: {
    state: 'Pepejal hablur putih',
    mpBp: 'Tinggi (Takat lebur 689 °C)',
    solubility: 'Bertindak balas cergas dengan air membebaskan gas H₂; tidak larut dalam pelarut organik',
  },
  H2: {
    commonName: 'Gas Hidrogen',
    state: 'Gas tidak berwarna',
    mpBp: 'Amat rendah (Takat lebur −259 °C, Takat didih −253 °C)',
  },
  F2: {
    commonName: 'Gas Fluorin',
    state: 'Gas kuning muda',
    mpBp: 'Amat rendah (Takat lebur −220 °C, Takat didih −188 °C)',
  },
  Cl2: {
    commonName: 'Gas Klorin',
    state: 'Gas kuning kehijauan',
    mpBp: 'Rendah (Takat lebur −101 °C, Takat didih −34 °C)',
  },
  Br2: {
    commonName: 'Cecair Bromin',
    state: 'Cecair perang kemerahan (mudah meruap)',
    mpBp: 'Rendah (Takat lebur −7 °C, Takat didih 59 °C)',
  },
  I2: {
    commonName: 'Pepejal Iodin',
    state: 'Pepejal hitam keunguan',
    mpBp: 'Rendah (Takat lebur 114 °C, Takat didih 184 °C)',
  },
  O2: {
    commonName: 'Gas Oksigen',
    state: 'Gas tidak berwarna',
    mpBp: 'Amat rendah (Takat lebur −219 °C, Takat didih −183 °C)',
  },
  N2: {
    commonName: 'Gas Nitrogen',
    state: 'Gas tidak berwarna',
    mpBp: 'Amat rendah (Takat lebur −210 °C, Takat didih −196 °C)',
  },
  H2O: {
    commonName: 'Air (Hidrogen oksida)',
    state: 'Cecair tidak berwarna',
    mpBp: 'Rendah (Takat lebur 0 °C, Takat didih 100 °C — terdapat ikatan hidrogen)',
    solubility: 'Pelarut berkutub sejagat; terlarut campur sesama bahan berkutub',
    solubilityNote: 'Molekul H₂O bersifat berkutub dengan cas separa δ− pada O dan δ+ pada H.',
  },
  NH3: {
    commonName: 'Ammonia (Nitrogen trihidrida)',
    state: 'Gas tidak berwarna berbau sengit',
    mpBp: 'Rendah (Takat lebur −78 °C, Takat didih −33 °C)',
    solubility: 'Sangat larut dalam air membentuk larutan beralkali lemah (mengandungi ikatan hidrogen)',
    solubilityNote: 'Membentuk ikatan hidrogen dengan molekul air dan sebahagian kecil mengion kepada NH₄⁺ dan OH⁻.',
  },
  CH4: {
    commonName: 'Metana (Karbon tetrahidrida)',
    state: 'Gas tidak berwarna (mudah terbakar)',
    mpBp: 'Amat rendah (Takat lebur −182 °C, Takat didih −162 °C)',
  },
  CO2: {
    commonName: 'Karbon dioksida',
    state: 'Gas tidak berwarna',
    mpBp: 'Rendah (Mememejalwap pada −78.5 °C)',
    solubility: 'Sedikit larut dalam air (berasid lemah); larut dalam pelarut organik',
  },
  CCl4: {
    commonName: 'Karbon tetraklorida (Tetraklorometana)',
    state: 'Cecair tidak berwarna mudah meruap',
    mpBp: 'Rendah (Takat lebur −23 °C, Takat didih 77 °C)',
  },
  CS2: {
    commonName: 'Karbon disulfida',
    state: 'Cecair tidak berwarna mudah meruap',
    mpBp: 'Rendah (Takat lebur −112 °C, Takat didih 46 °C)',
  },
  HCl: {
    commonName: 'Hidrogen klorida',
    state: 'Gas tidak berwarna berasid',
    mpBp: 'Rendah (Takat lebur −114 °C, Takat didih −85 °C)',
    solubility: 'Sangat larut dalam air membentuk asid hidroklorik (mengion kepada H⁺ dan Cl⁻); larut dalam pelarut organik',
    solubilityNote: 'HCl kering/dalam pelarut organik tidak mengkonduksi elektrik, tetapi larutan akueusnya mengkonduksi elektrik.',
  },
  HF: {
    commonName: 'Hidrogen fluorida',
    state: 'Gas / cecair tidak berwarna (takat didih 19.5 °C)',
    mpBp: 'Rendah (Takat lebur −84 °C, Takat didih 19.5 °C)',
    solubility: 'Sangat larut dalam air membentuk asid hidrofluorik lemah.',
  },
  HBr: {
    commonName: 'Hidrogen bromida',
    state: 'Gas tidak berwarna',
    mpBp: 'Rendah (Takat lebur −87 °C, Takat didih −66 °C)',
    solubility: 'Sangat larut dalam air membentuk asid hidrobromik.',
  },
  HI: {
    commonName: 'Hidrogen iodida',
    state: 'Gas tidak berwarna',
    mpBp: 'Rendah (Takat lebur −51 °C, Takat didih −35 °C)',
    solubility: 'Sangat larut dalam air membentuk asid hidroiodik.',
  },
  H2S: {
    commonName: 'Hidrogen sulfida',
    state: 'Gas berbau telur tembeluk',
    mpBp: 'Rendah (Takat lebur −82 °C, Takat didih −60 °C)',
  },
  PH3: {
    commonName: 'Fosfina (Fosforus trihidrida)',
    state: 'Gas tidak berwarna',
    mpBp: 'Rendah (Takat lebur −133 °C, Takat didih −88 °C)',
  },
  SiH4: {
    commonName: 'Silana (Silikon tetrahidrida)',
    state: 'Gas tidak berwarna',
    mpBp: 'Rendah (Takat lebur −185 °C, Takat didih −112 °C)',
  },
  SiCl4: {
    commonName: 'Silikon tetraklorida',
    state: 'Cecair tidak berwarna meruap',
    mpBp: 'Rendah (Takat lebur −69 °C, Takat didih 58 °C)',
  },
  PCl3: {
    commonName: 'Fosforus triklorida',
    state: 'Cecair tidak berwarna',
    mpBp: 'Rendah (Takat lebur −94 °C, Takat didih 76 °C)',
  },
  SiO2: {
    commonName: 'Silikon dioksida (Kuarsa / Pasir)',
    state: 'Pepejal keras (struktur molekul gergasi)',
    mpBp: 'Amat tinggi (Takat lebur ~1710 °C, Takat didih ~2230 °C)',
    solubility: 'Tidak larut di dalam air mahupun pelarut organik (ikatan kovalen raksasa yang amat sukar dipecahkan).',
  },
};

function greekPrefix(n: number, useMono: boolean): string {
  if (n === 1) return useMono ? 'mono' : '';
  if (n === 2) return 'di';
  if (n === 3) return 'tri';
  if (n === 4) return 'tetra';
  return '';
}

function buildCovalentName(
  firstEl: ElementPickDef,
  firstCount: number,
  secondEl: ElementPickDef,
  secondCount: number,
  asciiFormula: string
): string {
  const override = KNOWN_COMPOUND_OVERRIDES[asciiFormula];
  if (override?.commonName) return override.commonName;
  if (firstEl.id === secondEl.id) {
    const statePrefix =
      firstEl.id === 'br' ? 'Cecair ' : firstEl.id === 'i' ? 'Pepejal ' : 'Gas ';
    return `${statePrefix}${firstEl.name}`;
  }
  const p1 = greekPrefix(firstCount, false);
  const root1Raw = (firstEl.covalentRoot ?? firstEl.name).toLowerCase();
  const part1 = p1 ? `${p1}${root1Raw}` : firstEl.name;
  const p1Cap = part1.charAt(0).toUpperCase() + part1.slice(1);

  const useMono = secondEl.id === 'o' && secondCount === 1;
  const p2 = greekPrefix(secondCount, useMono);
  const anionWord = secondEl.anionPart ?? secondEl.name.toLowerCase();
  // Elakkan vokal berganda "monooksida" -> "monoksida"
  const part2 = p2 === 'mono' && anionWord.startsWith('o') ? `mon${anionWord}` : `${p2}${anionWord}`;
  return `${p1Cap} ${part2}`;
}

export function synthesizeCompound(elA: ElementPickDef, elB: ElementPickDef): SynthesisOutcome {
  // Kes 1: Kedua-duanya logam
  if (elA.category === 'metal' && elB.category === 'metal') {
    const isSame = elA.id === elB.id;
    return {
      kind: 'no-compound-metals',
      elA,
      elB,
      title: isSame
        ? `Unsur Logam Tulen (${elA.name}, ${elA.symbol})`
        : `Tiada Sebatian Ion / Kovalen (Campuran Logam / Aloi ${elA.symbol}–${elB.symbol})`,
      subtitle: 'Ikatan Logam (Lautan Elektron)',
      bondLabel: 'Ikatan Logam',
      explanationSteps: [
        `${elA.name} (${elA.electronConfig}) dan ${elB.name} (${elB.electronConfig}) kedua-duanya ialah unsur logam yang cenderung menderma elektron valens.`,
        'Oleh kerana tiada atom bukan logam untuk menerima elektron atau berkongsi pasangan elektron bagi mencapai oktet, sebatian ion mahupun sebatian kovalen ringkas tidak terbentuk.',
        'Sebaliknya, atom-atom logam menyahsetempatkan elektron valens membentuk "lautan elektron" yang menarik ion-ion logam positif melalui ikatan logam.',
      ],
      physicalProps: {
        physicalState: 'Pepejal logam berkilat (pada suhu bilik)',
        structureType: 'Kekisi ion logam positif di dalam lautan elektron bebas',
        meltingBoilingPoint: 'Berubah-ubah (Logam alkali rendah; Al/Mg lebih tinggi)',
        meltingReason: 'Daya tarikan elektrostatik antara ion logam dan lautan elektron.',
        electricalConductivity: 'Konduktor elektrik yang baik dalam pepejal dan leburan',
        conductivityReason: 'Elektron dinyahsetempatkan bergerak bebas membawa cas elektrik.',
        solubility: 'Tidak larut dalam pelarut organik (logam alkali bertindak balas dengan air)',
        solubilityNote: 'Logam Kumpulan 1 dan Ca bertindak balas secara kimia dengan air.',
      },
    };
  }

  // Kes 2: Logam + Karbon/Silikon (karbida/silisida luar model ion mudah)
  const metalOpt = elA.category === 'metal' ? elA : elB.category === 'metal' ? elB : null;
  const nonmetalOpt = elA.category === 'nonmetal' ? elA : elB.category === 'nonmetal' ? elB : null;

  if (metalOpt && nonmetalOpt && (nonmetalOpt.id === 'c' || nonmetalOpt.id === 'si')) {
    return {
      kind: 'special-non-octet',
      elA,
      elB,
      title: `Gabungan Logam (${metalOpt.symbol}) + ${nonmetalOpt.name} (${nonmetalOpt.symbol})`,
      subtitle: 'Membentuk Karbida / Silisida Kovalen-Ionik Khas',
      bondLabel: 'Ikatan Khas (Bukan Ion Ringkas)',
      explanationSteps: [
        `${nonmetalOpt.name} (${nonmetalOpt.electronConfig}) mempunyai 4 elektron valens dan terlalu sukar secara tenaga untuk menerima 4 elektron membentuk anion ringkas C⁴⁻ atau Si⁴⁻.`,
        `Untuk membentuk sebatian ion tulen bersama logam ${metalOpt.name}, pilih bukan logam Kumpulan 15–17 (N, P, O, S, F, Cl, Br, I) atau H.`,
        `Untuk menghasilkan sebatian kovalen dengan ${nonmetalOpt.name}, pasangkan dengan atom bukan logam lain seperti H, O, S, F, Cl, atau Br.`,
      ],
    };
  }

  // Kes 3: Logam + Bukan Logam (H, N, P, O, S, F, Cl, Br, I) -> SEBATIAN ION!
  if (metalOpt && nonmetalOpt) {
    const cCharge = metalOpt.valenceChange;
    const aCharge = nonmetalOpt.valenceChange;
    const g = gcd(cCharge, aCharge);
    const metalCount = aCharge / g;
    const nonmetalCount = cCharge / g;
    const totalTransferred = metalCount * cCharge;

    const asciiFormula = `${metalOpt.symbol}${metalCount > 1 ? metalCount : ''}${nonmetalOpt.symbol}${
      nonmetalCount > 1 ? nonmetalCount : ''
    }`;
    const formula = `${metalOpt.symbol}${toSub(metalCount)}${nonmetalOpt.symbol}${toSub(
      nonmetalCount
    )}`;
    const compoundName = `${metalOpt.cationPart} ${nonmetalOpt.anionPart}`;
    const override = KNOWN_COMPOUND_OVERRIDES[asciiFormula];

    const mIon = `${metalOpt.symbol}${formatChargeStr(cCharge, '+')}`;
    const xIon = `${nonmetalOpt.symbol}${formatChargeStr(aCharge, '−')}`;
    const isDiatomicNonmetal = ['h', 'n', 'o', 'f', 'cl', 'br', 'i'].includes(nonmetalOpt.id);

    const halfEqMetal = `${metalOpt.symbol} → ${mIon} + ${cCharge > 1 ? cCharge : ''}e⁻`;
    const halfEqNonmetal = isDiatomicNonmetal
      ? `${nonmetalOpt.symbol}₂ + ${2 * aCharge}e⁻ → 2${xIon}`
      : `${nonmetalOpt.symbol} + ${aCharge > 1 ? aCharge : ''}e⁻ → ${xIon}`;

    let overallEquation: string;
    if (isDiatomicNonmetal) {
      const needDouble = nonmetalCount % 2 !== 0;
      const eqMetal = needDouble ? metalCount * 2 : metalCount;
      const eqNonmetal = needDouble ? nonmetalCount : nonmetalCount / 2;
      const eqProduct = needDouble ? 2 : 1;
      overallEquation = `${eqMetal > 1 ? eqMetal : ''}${metalOpt.symbol} + ${
        eqNonmetal > 1 ? eqNonmetal : ''
      }${nonmetalOpt.symbol}₂ → ${eqProduct > 1 ? eqProduct : ''}${formula}`;
    } else {
      overallEquation = `${metalCount > 1 ? metalCount : ''}${metalOpt.symbol} + ${
        nonmetalCount > 1 ? nonmetalCount : ''
      }${nonmetalOpt.symbol} → ${formula}`;
    }

    const isHighLattice = cCharge * aCharge >= 4; // e.g. MgO (+2,-2), Al2O3 (+3,-2)

    return {
      kind: 'ionic',
      metal: metalOpt,
      nonmetal: nonmetalOpt,
      formula,
      compoundName,
      bondLabel: 'Sebatian Ion (Ikatan Ion)',
      metalCount,
      nonmetalCount,
      metalCharge: cCharge,
      nonmetalCharge: aCharge,
      totalElectronsTransferred: totalTransferred,
      halfEqMetal,
      halfEqNonmetal,
      overallEquation,
      explanationSteps: [
        `Atom logam ${metalOpt.name} (${metalOpt.electronConfig}, ${metalOpt.shells.length} petala) menderma ${cCharge} elektron valens untuk mencapai susunan elektron ${metalOpt.ionShells.length === 1 ? 'duplet' : 'oktet'} stabil (${metalOpt.ionConfig}), membentuk kation ${mIon}.`,
        `Atom bukan logam ${nonmetalOpt.name} (${nonmetalOpt.electronConfig}, ${nonmetalOpt.shells.length} petala) menerima ${aCharge} elektron ke petala valensnya untuk mencapai susunan elektron ${nonmetalOpt.ionShells.length === 1 ? 'duplet' : 'oktet'} stabil (${nonmetalOpt.ionConfig}), membentuk anion ${xIon}.`,
        `Sebanyak ${metalCount} atom ${metalOpt.symbol} memindahkan jumlah ${totalTransferred} elektron kepada ${nonmetalCount} atom ${nonmetalOpt.symbol}. Ion ${mIon} dan ${xIon} tertarik antara satu sama lain oleh daya tarikan elektrostatik yang kuat (ikatan ion) membentuk ${compoundName} (${formula}).`,
      ],
      physicalProps: {
        physicalState: override?.state ?? 'Pepejal hablur pada suhu bilik',
        structureType: 'Struktur kekisi ion raksasa (susunan ion positif & negatif berselang-seli)',
        meltingBoilingPoint: override?.mpBp ?? 'Tinggi (tidak mudah meruap)',
        meltingReason:
          'Banyak tenaga haba diperlukan untuk mengatasi daya tarikan elektrostatik yang kuat di antara ion berlainan cas dalam kekisi.',
        electricalConductivity:
          'Pepejal: Tidak mengkonduksi • Leburan & Akueus: Mengkonduksi elektrik',
        conductivityReason:
          'Dalam keadaan pepejal ion terikat kuat dan tidak bergerak bebas; apabila melebur atau larut dalam air, ion bergerak bebas membawa cas.',
        solubility:
          override?.solubility ??
          (isHighLattice
            ? 'Sukar/sebahagian larut dalam air; tidak larut dalam pelarut organik'
            : 'Lazimnya larut dalam air; tidak larut dalam pelarut organik'),
        solubilityNote:
          override?.solubilityNote ??
          'Molekul air berkutub menarik ion keluar daripada kekisi pepejal; pelarut organik tidak dapat mengatasi daya tarikan elektrostatik.',
      },
    };
  }

  // Kes 4: Kedua-duanya Bukan Logam -> SEBATIAN KOVALEN!
  // Kes khas bukan-oktet ringkas (N+O, S+O, P+O, C+N, C+P, Si+N, Si+P)
  const pairSet = new Set([elA.id, elB.id]);
  if (
    (pairSet.has('si') && pairSet.has('c')) ||
    (pairSet.has('s') && pairSet.has('o')) ||
    (pairSet.has('n') && pairSet.has('o')) ||
    (pairSet.has('p') && pairSet.has('o')) ||
    ((pairSet.has('c') || pairSet.has('si')) && (pairSet.has('n') || pairSet.has('p')))
  ) {
    if (pairSet.has('si') && pairSet.has('c')) {
      return {
        kind: 'special-non-octet',
        elA,
        elB,
        title: 'Silikon karbida (SiC)',
        subtitle: 'Sebatian Kovalen Molekul Gergasi',
        formula: 'SiC',
        compoundName: 'Silikon karbida',
        bondLabel: 'Sebatian Kovalen (Molekul Gergasi)',
        explanationSteps: [
          'Atom silikon (2.8.4) dan atom karbon (2.4) masing-masing berkongsi 4 elektron valens membentuk rangkaian 3D ikatan kovalen tunggal yang sangat kuat.',
          'Tiada daya van der Waals antara molekul kerana keseluruhan kristal merupakan satu molekul gergasi.',
        ],
        physicalProps: {
          physicalState: 'Pepejal kristal amat keras',
          structureType: 'Struktur molekul kovalen gergasi (rangkaian tetrahedron 3D)',
          meltingBoilingPoint: 'Amat tinggi (Menyublim / mereput ~2730 °C)',
          meltingReason: 'Memerlukan haba amat tinggi untuk memutuskan ikatan kovalen kuat antara atom Si dan C.',
          electricalConductivity: 'Penebat / semikonduktor (tiada ion bebas)',
          conductivityReason: 'Semua elektron valens terlibat dalam perkongsian ikatan kovalen.',
          solubility: 'Tidak larut dalam air dan pelarut organik',
          solubilityNote: 'Rangkaian kovalen raksasa tidak dapat diatasi oleh pelarut.',
        },
      };
    }

    const specialLabel =
      pairSet.has('s') && pairSet.has('o')
        ? {
            f: 'SO₂',
            n: 'Sulfur dioksida',
            st: 'Gas tidak berwarna berbau sengit',
            mp: 'Rendah (Takat lebur −72 °C, Takat didih −10 °C)',
            desc: 'Sulfur (2.8.6) dan oksigen (2.6) membentuk molekul kovalen SO₂ melibatkan pengikatan oktet diperluas / ikatan datif di luar model asas 8 elektron.',
          }
        : pairSet.has('n') && pairSet.has('o')
        ? {
            f: 'NO₂',
            n: 'Nitrogen dioksida',
            st: 'Gas berwarna perang kemerahan',
            mp: 'Rendah (Takat lebur −11 °C, Takat didih 21 °C)',
            desc: 'Nitrogen (2.5) dan oksigen (2.6) membentuk molekul kovalen (seperti NO / NO₂) yang melibatkan elektron ganjil dan ikatan datif.',
          }
        : pairSet.has('p') && pairSet.has('o')
        ? {
            f: 'P₄O₁₀',
            n: 'Fosforus(V) oksida',
            st: 'Pepejal putih (mudah menyerap lembapan)',
            mp: 'Sederhana-rendah (Menyublim ~360 °C)',
            desc: 'Fosforus (2.8.5) mengembangkan oktet bersama oksigen (2.6) membentuk molekul P₄O₁₀ dengan ikatan kovalen.',
          }
        : {
            f: `${elA.symbol}${elB.symbol}`,
            n: `Sebatian Kovalen ${elA.name}–${elB.name}`,
            st: 'Sebatian kovalen khas (polimer / rangkaian)',
            mp: 'Bergantung kepada struktur molekul (ringkas vs rangkaian)',
            desc: `Atom ${elA.name} (${elA.electronConfig}) dan ${elB.name} (${elB.electronConfig}) cenderung membentuk rangkaian ikatan kovalen berganda/polimer yang kompleks. Untuk melihat rajah pertindihan petala oktet tulen yang jelas, gabungkan dengan H, O, S atau Halogen.`,
          };

    return {
      kind: 'special-non-octet',
      elA,
      elB,
      title: `${specialLabel.n} (${specialLabel.f})`,
      subtitle: 'Sebatian Kovalen (Luar Model Oktet Asas)',
      formula: specialLabel.f,
      compoundName: specialLabel.n,
      bondLabel: 'Sebatian Kovalen',
      explanationSteps: [
        specialLabel.desc,
        'Ikatan antara atom bukan logam masih terbentuk melalui perkongsian pasangan elektron (ikatan kovalen) bagi membentuk molekul neutral.',
      ],
      physicalProps: {
        physicalState: specialLabel.st,
        structureType: 'Molekul kovalen neutral',
        meltingBoilingPoint: specialLabel.mp,
        meltingReason: 'Daya tarikan van der Waals yang lemah di antara molekul kovalen mudah diatasi oleh tenaga haba yang rendah.',
        electricalConductivity: 'Tidak mengkonduksi elektrik dalam keadaan tulen',
        conductivityReason: 'Molekul neutral tidak mengandungi ion yang bergerak bebas.',
        solubility: 'Lazimnya larut dalam pelarut organik (oksida bukan logam berasid bertindak balas dengan air)',
        solubilityNote: 'Gas oksida bukan logam seperti SO₂ dan NO₂ larut serta bertindak balas dengan air membentuk larutan berasid.',
      },
    };
  }

  // Kes 4B: Sebatian Kovalen Oktet/Duplet Piawai (Homonuklear atau Heteronuklear)
  const isHomodiatomic = elA.id === elB.id;
  if (isHomodiatomic) {
    const bondOrder = Math.min(3, elA.valenceChange) as 1 | 2 | 3;
    const asciiFormula = `${elA.symbol}2`;
    const formula = `${elA.symbol}₂`;
    const compoundName = buildCovalentName(elA, 2, elA, 0, asciiFormula);
    const override = KNOWN_COMPOUND_OVERRIDES[asciiFormula];
    const lineChar = bondOrder === 1 ? '–' : bondOrder === 2 ? '=' : '≡';
    const bondTypeLabel =
      bondOrder === 1
        ? 'Ikatan Kovalen Tunggal'
        : bondOrder === 2
        ? 'Ikatan Kovalen Ganda Dua'
        : 'Ikatan Kovalen Ganda Tiga';
    const stabilityTarget = elA.id === 'h' ? 'duplet (2)' : `oktet (${elA.ionConfig})`;

    return {
      kind: 'covalent',
      isHomodiatomic: true,
      isGiantCovalent: false,
      centerEl: elA,
      outerEl: elA,
      centerCount: 1,
      outerCount: 1,
      bondOrder,
      bondTypeLabel,
      lewisLineFormula: `${elA.symbol}${lineChar}${elA.symbol}`,
      formula,
      compoundName,
      explanationSteps: [
        `Setiap atom ${elA.name} (${elA.electronConfig}, ${elA.shells.length} petala) memerlukan ${elA.valenceChange} elektron lagi untuk mencapai susunan elektron ${stabilityTarget} yang stabil.`,
        `Dua atom ${elA.symbol} masing-masing menyumbangkan ${elA.valenceChange} elektron untuk berkongsi ${bondOrder} pasang elektron (${
          bondOrder * 2
        } elektron) membentuk ${bondTypeLabel.toLowerCase()}.`,
        `Molekul dwiatom neutral ${formula} terbentuk dan setiap atom kini mencapai susunan stabil ${elA.ionConfig}.`,
      ],
      physicalProps: {
        physicalState: override?.state ?? 'Gas atau pepejal molekul mudah meruap',
        structureType: 'Molekul dwiatom ringkas neutral',
        meltingBoilingPoint: override?.mpBp ?? 'Rendah (mudah meruap)',
        meltingReason:
          'Walaupun ikatan kovalen di dalam molekul kuat, daya tarikan van der Waals di antara molekul amat lemah dan memerlukan sedikit haba sahaja.',
        electricalConductivity: 'Tidak mengkonduksi elektrik dalam semua keadaan',
        conductivityReason: 'Molekul neutral tidak mengandungi sebarang ion atau elektron bebas.',
        solubility: override?.solubility ?? 'Tidak larut / sangat sedikit larut dalam air; larut dalam pelarut organik',
        solubilityNote:
          override?.solubilityNote ??
          'Molekul dwiatom tidak berkutub lebih mudah larut dalam pelarut organik seperti sikloheksana.',
      },
    };
  }

  // Heteronuklear (atom berbeza): pilih atom dengan valenceChange lebih besar sebagai atom pusat
  const [centerEl, outerEl] =
    elA.valenceChange >= elB.valenceChange ? [elA, elB] : [elB, elA];

  const g = gcd(centerEl.valenceChange, outerEl.valenceChange);
  const centerCount = outerEl.valenceChange / g;
  const outerCount = centerEl.valenceChange / g; // 1..4
  const bondOrder = Math.min(3, g) as 1 | 2 | 3;

  // Tertib penulisan formula IUPAC (formulaLeft sebelum formulaRight)
  const [fFirst, fFirstCount, fSecond, fSecondCount] =
    centerEl.iupacRank <= outerEl.iupacRank
      ? [centerEl, centerCount, outerEl, outerCount]
      : [outerEl, outerCount, centerEl, centerCount];

  const asciiFormula = `${fFirst.symbol}${fFirstCount > 1 ? fFirstCount : ''}${fSecond.symbol}${
    fSecondCount > 1 ? fSecondCount : ''
  }`;
  const formula = `${fFirst.symbol}${toSub(fFirstCount)}${fSecond.symbol}${toSub(fSecondCount)}`;
  const compoundName = buildCovalentName(fFirst, fFirstCount, fSecond, fSecondCount, asciiFormula);
  const override = KNOWN_COMPOUND_OVERRIDES[asciiFormula];

  const isGiantCovalent = asciiFormula === 'SiO2';
  const lineChar = bondOrder === 1 ? '–' : bondOrder === 2 ? '=' : '≡';
  const bondTypeLabel =
    bondOrder === 1
      ? 'Ikatan Kovalen Tunggal'
      : bondOrder === 2
      ? 'Ikatan Kovalen Ganda Dua'
      : 'Ikatan Kovalen Ganda Tiga';

  const lewisLineFormula =
    outerCount === 1
      ? `${fFirst.symbol}${lineChar}${fSecond.symbol}`
      : outerCount === 2
      ? `${outerEl.symbol}${lineChar}${centerEl.symbol}${lineChar}${outerEl.symbol}`
      : outerCount === 3
      ? `${centerEl.symbol}(${lineChar}${outerEl.symbol})₃`
      : `${centerEl.symbol}(${lineChar}${outerEl.symbol})₄`;

  const centerTargetLabel = centerEl.id === 'h' ? 'duplet (2)' : `oktet (${centerEl.ionConfig})`;
  const outerTargetLabel = outerEl.id === 'h' ? 'duplet (2)' : `oktet (${outerEl.ionConfig})`;

  return {
    kind: 'covalent',
    isHomodiatomic: false,
    isGiantCovalent,
    centerEl,
    outerEl,
    centerCount,
    outerCount,
    bondOrder,
    bondTypeLabel,
    lewisLineFormula,
    formula,
    compoundName,
    explanationSteps: [
      `Atom ${centerEl.name} (${centerEl.electronConfig}, ${centerEl.shells.length} petala) memerlukan ${centerEl.valenceChange} elektron untuk mencapai susunan ${centerTargetLabel}, manakala atom ${outerEl.name} (${outerEl.electronConfig}, ${outerEl.shells.length} petala) memerlukan ${outerEl.valenceChange} elektron untuk mencapai ${outerTargetLabel}.`,
      `1 atom ${centerEl.symbol} berkongsi ${bondOrder} pasang elektron dengan setiap ${outerCount} atom ${outerEl.symbol} (${outerCount} × ${bondTypeLabel.toLowerCase()}) supaya semua atom mencapai petala valens penuh yang stabil.`,
      isGiantCovalent
        ? `Silikon dioksida (SiO₂) membentuk rangkaian kovalen 3 dimensi gergasi di mana setiap atom Si terikat kepada 4 atom O secara kovalen (Rajah 5.27 m.s. 128).`
        : `Terbentuk molekul kovalen neutral ${compoundName} (${formula}) tanpa sebarang pemindahan elektron lengkap atau pembentukan ion.`,
    ],
    physicalProps: isGiantCovalent
      ? {
          physicalState: override?.state ?? 'Pepejal keras (struktur molekul gergasi)',
          structureType: 'Struktur molekul kovalen gergasi (rangkaian 3D atom terikat kovalen)',
          meltingBoilingPoint: override?.mpBp ?? 'Amat tinggi',
          meltingReason:
            'Banyak tenaga haba diperlukan untuk memutuskan ikatan kovalen yang sangat kuat di antara semua atom (tiada daya van der Waals).',
          electricalConductivity: 'Tidak mengkonduksi elektrik dalam semua keadaan',
          conductivityReason: 'Tiada ion atau elektron bebas di dalam struktur rangkaian kovalen.',
          solubility: override?.solubility ?? 'Tidak larut dalam air mahupun pelarut organik',
          solubilityNote:
            override?.solubilityNote ?? 'Ikatan kovalen gergasi terlalu kuat untuk dipecahkan oleh pelarut.',
        }
      : {
          physicalState: override?.state ?? 'Gas atau cecair/pepejal molekul mudah meruap',
          structureType: 'Molekul kovalen ringkas neutral',
          meltingBoilingPoint: override?.mpBp ?? 'Rendah (mudah meruap)',
          meltingReason:
            'Hanya sedikit tenaga haba diperlukan untuk mengatasi daya tarikan van der Waals yang lemah di antara molekul ringkas.',
          electricalConductivity:
            asciiFormula === 'HCl' || asciiFormula === 'HF' || asciiFormula === 'HBr' || asciiFormula === 'HI'
              ? 'Tulen/organik: Tidak mengkonduksi • Dalam air: Mengkonduksi'
              : 'Tidak mengkonduksi elektrik dalam semua keadaan',
          conductivityReason:
            asciiFormula === 'HCl' || asciiFormula === 'HF' || asciiFormula === 'HBr' || asciiFormula === 'HI'
              ? 'Molekul tulen bersifat neutral, namun apabila larut dalam air ia mengion membentuk ion H⁺ dan ion halida bebas.'
              : 'Molekul kovalen bersifat neutral dan tidak mengandungi ion yang bergerak bebas.',
          solubility: override?.solubility ?? 'Lazimnya tidak larut dalam air; larut dalam pelarut organik',
          solubilityNote:
            override?.solubilityNote ??
            'Molekul sebatian kovalen neutral umumnya berinteraksi baik dengan pelarut organik seperti sikloheksana.',
        },
  };
}
