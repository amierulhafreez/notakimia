export type SaltSolubilityStatus =
  | 'soluble'
  | 'insoluble'
  | 'hot-soluble'
  | 'sparingly'
  | 'special-redox';

export interface SaltCationDef {
  id: string;
  symbolUnicode: string;
  formulaBody: string;
  name: string;
  saltPrefix: string;
  charge: 1 | 2 | 3;
  isPolyatomic?: boolean;
  ionColorHint?: string;
}

export interface SaltAnionDef {
  id: string;
  symbolUnicode: string;
  formulaBody: string;
  name: string;
  saltSuffix: string;
  charge: 1 | 2;
  isPolyatomic: boolean;
  ruleSummary: string;
}

export interface SaltSynthesisResult {
  cation: SaltCationDef;
  anion: SaltAnionDef;
  formula: string;
  saltName: string;
  solidColorName: string;
  solidHex: string;
  solidIsCrystalDark?: boolean;
  aqueousColorName: string;
  aqueousHex: string;
  aqueousOpacity: number; // 0 = air jernih tanpa warna, >0 = warna larutan
  precipitateHex: string;
  status: SaltSolubilityStatus;
  roomTempSoluble: boolean;
  hotWaterSoluble: boolean;
  statusLabel: string;
  ruleTag: string;
  ruleMnemonic: string;
  explanation: string;
}

const SUB_DIGITS: Record<string, string> = {
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
  return String(n)
    .split('')
    .map((c) => SUB_DIGITS[c] ?? c)
    .join('');
}

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

// 14 Kation penting KSSM Bab 6 (termasuk ANaK, PBC, HPA, dan kation berwarna)
export const SALT_CATIONS: SaltCationDef[] = [
  {
    id: 'na',
    symbolUnicode: 'Na⁺',
    formulaBody: 'Na',
    name: 'Ion natrium',
    saltPrefix: 'Natrium',
    charge: 1,
  },
  {
    id: 'k',
    symbolUnicode: 'K⁺',
    formulaBody: 'K',
    name: 'Ion kalium',
    saltPrefix: 'Kalium',
    charge: 1,
  },
  {
    id: 'nh4',
    symbolUnicode: 'NH₄⁺',
    formulaBody: 'NH₄',
    name: 'Ion ammonium',
    saltPrefix: 'Ammonium',
    charge: 1,
    isPolyatomic: true,
  },
  {
    id: 'mg',
    symbolUnicode: 'Mg²⁺',
    formulaBody: 'Mg',
    name: 'Ion magnesium',
    saltPrefix: 'Magnesium',
    charge: 2,
  },
  {
    id: 'ca',
    symbolUnicode: 'Ca²⁺',
    formulaBody: 'Ca',
    name: 'Ion kalsium',
    saltPrefix: 'Kalsium',
    charge: 2,
  },
  {
    id: 'ba',
    symbolUnicode: 'Ba²⁺',
    formulaBody: 'Ba',
    name: 'Ion barium',
    saltPrefix: 'Barium',
    charge: 2,
  },
  {
    id: 'al',
    symbolUnicode: 'Al³⁺',
    formulaBody: 'Al',
    name: 'Ion aluminium',
    saltPrefix: 'Aluminium',
    charge: 3,
  },
  {
    id: 'zn',
    symbolUnicode: 'Zn²⁺',
    formulaBody: 'Zn',
    name: 'Ion zink',
    saltPrefix: 'Zink',
    charge: 2,
  },
  {
    id: 'pb2',
    symbolUnicode: 'Pb²⁺',
    formulaBody: 'Pb',
    name: 'Ion plumbum(II)',
    saltPrefix: 'Plumbum(II)',
    charge: 2,
  },
  {
    id: 'fe2',
    symbolUnicode: 'Fe²⁺',
    formulaBody: 'Fe',
    name: 'Ion ferum(II)',
    saltPrefix: 'Ferum(II)',
    charge: 2,
    ionColorHint: 'Hijau',
  },
  {
    id: 'fe3',
    symbolUnicode: 'Fe³⁺',
    formulaBody: 'Fe',
    name: 'Ion ferum(III)',
    saltPrefix: 'Ferum(III)',
    charge: 3,
    ionColorHint: 'Perang',
  },
  {
    id: 'cu2',
    symbolUnicode: 'Cu²⁺',
    formulaBody: 'Cu',
    name: 'Ion kuprum(II)',
    saltPrefix: 'Kuprum(II)',
    charge: 2,
    ionColorHint: 'Biru / Hijau',
  },
  {
    id: 'ag',
    symbolUnicode: 'Ag⁺',
    formulaBody: 'Ag',
    name: 'Ion argentum',
    saltPrefix: 'Argentum',
    charge: 1,
  },
  {
    id: 'hg1',
    symbolUnicode: 'Hg₂²⁺',
    formulaBody: 'Hg₂',
    name: 'Ion merkuri(I)',
    saltPrefix: 'Merkuri(I)',
    charge: 2,
  },
];

// 6 Anion garam KSSM Bab 6 (Nitrat, Sulfat, Klorida, Karbonat + Iodida & Bromida)
export const SALT_ANIONS: SaltAnionDef[] = [
  {
    id: 'no3',
    symbolUnicode: 'NO₃⁻',
    formulaBody: 'NO₃',
    name: 'Ion nitrat',
    saltSuffix: 'nitrat',
    charge: 1,
    isPolyatomic: true,
    ruleSummary: 'Semua garam nitrat larut.',
  },
  {
    id: 'so4',
    symbolUnicode: 'SO₄²⁻',
    formulaBody: 'SO₄',
    name: 'Ion sulfat',
    saltSuffix: 'sulfat',
    charge: 2,
    isPolyatomic: true,
    ruleSummary: 'Larut kecuali P-B-C (PbSO₄, BaSO₄, CaSO₄).',
  },
  {
    id: 'cl',
    symbolUnicode: 'Cl⁻',
    formulaBody: 'Cl',
    name: 'Ion klorida',
    saltSuffix: 'klorida',
    charge: 1,
    isPolyatomic: false,
    ruleSummary: 'Larut kecuali H-P-A (Hg₂Cl₂, PbCl₂, AgCl).',
  },
  {
    id: 'co3',
    symbolUnicode: 'CO₃²⁻',
    formulaBody: 'CO₃',
    name: 'Ion karbonat',
    saltSuffix: 'karbonat',
    charge: 2,
    isPolyatomic: true,
    ruleSummary: 'Hanya garam SPAn (Na⁺, K⁺, NH₄⁺) yang larut.',
  },
  {
    id: 'i',
    symbolUnicode: 'I⁻',
    formulaBody: 'I',
    name: 'Ion iodida',
    saltSuffix: 'iodida',
    charge: 1,
    isPolyatomic: false,
    ruleSummary: 'Larut kecuali PbI₂ (kuning), AgI (kuning), Hg₂I₂.',
  },
  {
    id: 'br',
    symbolUnicode: 'Br⁻',
    formulaBody: 'Br',
    name: 'Ion bromida',
    saltSuffix: 'bromida',
    charge: 1,
    isPolyatomic: false,
    ruleSummary: 'Larut kecuali PbBr₂, AgBr, Hg₂Br₂.',
  },
];

export function buildSaltFormula(cation: SaltCationDef, anion: SaltAnionDef): string {
  const div = gcd(cation.charge, anion.charge);
  const catCount = anion.charge / div;
  const anCount = cation.charge / div;

  const catPart =
    catCount === 1
      ? cation.formulaBody
      : cation.isPolyatomic
      ? `(${cation.formulaBody})${toSub(catCount)}`
      : `${cation.formulaBody}${toSub(catCount)}`;

  const anPart =
    anCount === 1
      ? anion.formulaBody
      : anion.isPolyatomic
      ? `(${anion.formulaBody})${toSub(anCount)}`
      : `${anion.formulaBody}${toSub(anCount)}`;

  return `${catPart}${anPart}`;
}

export function synthesizeSalt(
  cationId: string,
  anionId: string
): SaltSynthesisResult | null {
  const cation = SALT_CATIONS.find((c) => c.id === cationId);
  const anion = SALT_ANIONS.find((a) => a.id === anionId);
  if (!cation || !anion) return null;

  const formula = buildSaltFormula(cation, anion);
  const saltName = `${cation.saltPrefix} ${anion.saltSuffix}`;
  const isANaK = cation.id === 'na' || cation.id === 'k' || cation.id === 'nh4';

  // 1. Tentukan warna pepejal & warna larutan akueus mengikut Jadual 6.12 & data amali KSSM
  let solidColorName = 'Putih';
  let solidHex = '#f1f5f9';
  let aqueousColorName = 'Tidak berwarna';
  let aqueousHex = '#e0f2fe';
  let aqueousOpacity = 0.25;
  let precipitateHex = '#e2e8f0';

  if (cation.id === 'fe2') {
    solidColorName = 'Hijau / Hijau muda';
    solidHex = '#4ade80';
    aqueousColorName = 'Hijau / Hijau muda';
    aqueousHex = '#4ade80';
    aqueousOpacity = 0.42;
    precipitateHex = '#4ade80';
  } else if (cation.id === 'fe3') {
    solidColorName = 'Perang / Perang kekuningan';
    solidHex = '#b45309';
    aqueousColorName = 'Perang / Perang kekuningan';
    aqueousHex = '#d97706';
    aqueousOpacity = 0.5;
    precipitateHex = '#92400e';
  } else if (cation.id === 'cu2') {
    if (anion.id === 'cl') {
      // Jadual 6.12 (m.s. 199): CuCl2 pepejal HIJAU -> larutan akueus BIRU
      solidColorName = 'Hijau (hablur hijau)';
      solidHex = '#16a34a';
      aqueousColorName = 'Biru';
      aqueousHex = '#2563eb';
      aqueousOpacity = 0.45;
      precipitateHex = '#16a34a';
    } else if (anion.id === 'co3') {
      // Jadual 6.12 & Rajah 6.49: CuCO3 pepejal HIJAU -> Tidak larut (mendakan hijau)
      solidColorName = 'Hijau';
      solidHex = '#15803d';
      aqueousColorName = 'Tidak larut (Mendakan hijau di dalam air jernih)';
      aqueousHex = '#e0f2fe';
      aqueousOpacity = 0.25;
      precipitateHex = '#15803d';
    } else if (anion.id === 'br') {
      solidColorName = 'Perang gelap / kehitaman';
      solidHex = '#78350f';
      aqueousColorName = 'Biru / Biru kehijauan';
      aqueousHex = '#0284c7';
      aqueousOpacity = 0.44;
      precipitateHex = '#78350f';
    } else {
      // CuSO4, Cu(NO3)2 -> Biru dalam pepejal & larutan
      solidColorName = 'Biru';
      solidHex = '#2563eb';
      aqueousColorName = 'Biru';
      aqueousHex = '#2563eb';
      aqueousOpacity = 0.45;
      precipitateHex = '#2563eb';
    }
  } else if (cation.id === 'pb2' && anion.id === 'i') {
    solidColorName = 'Kuning';
    solidHex = '#facc15';
    precipitateHex = '#eab308';
  } else if (cation.id === 'ag' && anion.id === 'br') {
    solidColorName = 'Kuning pucat / Krim';
    solidHex = '#fef08a';
    precipitateHex = '#fde047';
  } else if (cation.id === 'ag' && anion.id === 'i') {
    solidColorName = 'Kuning';
    solidHex = '#fde047';
    precipitateHex = '#eab308';
  } else if (cation.id === 'ag' && anion.id === 'co3') {
    solidColorName = 'Kuning pucat';
    solidHex = '#fef08a';
    precipitateHex = '#fde047';
  } else if (cation.id === 'hg1' && anion.id === 'i') {
    solidColorName = 'Kuning kehijauan';
    solidHex = '#bef264';
    precipitateHex = '#a3e635';
  } else if (cation.id === 'hg1' && anion.id === 'co3') {
    solidColorName = 'Kuning keperangan';
    solidHex = '#eab308';
    precipitateHex = '#ca8a04';
  }

  // 2. Kes khas redoks: Cu2+ + I- dan Fe3+ + I-
  if (cation.id === 'cu2' && anion.id === 'i') {
    return {
      cation,
      anion,
      formula: 'CuI + I₂',
      saltName: 'Tindak Balas Redoks Kuprum(II) & Iodida',
      solidColorName: 'Tidak stabil sebagai CuI₂ (terurai kepada CuI putih & I₂)',
      solidHex: '#92400e',
      aqueousColorName: 'Mendakan putih CuI dalam larutan perang iodin (I₂)',
      aqueousHex: '#b45309',
      aqueousOpacity: 0.48,
      precipitateHex: '#f1f5f9',
      status: 'special-redox',
      roomTempSoluble: false,
      hotWaterSoluble: false,
      statusLabel: 'Tindak Balas Khas (Redoks)',
      ruleTag: 'Kes Khas Kuprum(II) + Iodida',
      ruleMnemonic: '2Cu²⁺ + 4I⁻ → 2CuI (mendakan putih) + I₂ (larutan perang)',
      explanation:
        'Sebatian pepejal kuprum(II) iodida (CuI₂) tidak stabil. Apabila ion Cu²⁺ bertemu ion I⁻ dalam air, tindak balas redoks berlaku menghasilkan mendakan putih kuprum(I) iodida (CuI) dan larutan iodin berwarna perang.',
    };
  }

  if (cation.id === 'fe3' && anion.id === 'i') {
    return {
      cation,
      anion,
      formula: 'Fe²⁺ + I₂',
      saltName: 'Tindak Balas Redoks Ferum(III) & Iodida',
      solidColorName: 'Tidak stabil sebagai FeI₃',
      solidHex: '#92400e',
      aqueousColorName: 'Larutan perang kekuningan (iodin terbentuk)',
      aqueousHex: '#b45309',
      aqueousOpacity: 0.45,
      precipitateHex: '#92400e',
      status: 'special-redox',
      roomTempSoluble: true,
      hotWaterSoluble: true,
      statusLabel: 'Larut + Tindak Balas Redoks',
      ruleTag: 'Kes Khas Ferum(III) + Iodida',
      ruleMnemonic: '2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂',
      explanation:
        'Garam FeI₃ tidak stabil dalam keadaan biasa; ion Fe³⁺ mengoksidakan ion I⁻ kepada iodin (I₂) yang memberikan larutan berwarna perang.',
    };
  }

  // 3. Tentukan hukum keterlarutan mengikut Jadual 6.6 & Rajah 6.37 KSSM
  let status: SaltSolubilityStatus = 'soluble';
  let roomTempSoluble = true;
  let hotWaterSoluble = true;
  let statusLabel = 'Larut dalam Air (Garam Terlarutkan)';
  let ruleTag = '';
  let ruleMnemonic = '';
  let explanation = '';

  if (isANaK) {
    status = 'soluble';
    roomTempSoluble = true;
    hotWaterSoluble = true;
    ruleTag = 'Garam NO ANaK (Sentiasa Larut)';
    ruleMnemonic = 'Semua garam Ammonium (A), Natrium (Na) & Kalium (K) LARUT!';
    explanation = `${saltName} (${formula}) mengandungi ${cation.name.toLowerCase()} yang tergolong dalam kumpulan garam ANaK. Semua garam natrium, kalium, dan ammonium larut sepenuhnya dalam air.`;
  } else if (anion.id === 'no3') {
    status = 'soluble';
    roomTempSoluble = true;
    hotWaterSoluble = true;
    ruleTag = 'Garam Nitrat (Tiada Pengecualian)';
    ruleMnemonic = 'Garam NO ANaK: SEMUA garam nitrat (NO₃⁻) larut dalam air.';
    explanation = `Semua garam nitrat larut sepenuhnya dalam air pada suhu bilik tanpa sebarang pengecualian. Oleh itu, ${saltName} larut membentuk larutan ${aqueousColorName.toLowerCase()}.`;
  } else if (anion.id === 'so4') {
    if (cation.id === 'pb2' || cation.id === 'ba' || cation.id === 'ca') {
      status = 'insoluble';
      roomTempSoluble = false;
      hotWaterSoluble = false;
      statusLabel = 'Tidak Larut dalam Air (Garam Tak Terlarutkan)';
      ruleTag = 'Pengecualian Sulfat: P-B-C';
      ruleMnemonic = 'PBC Sulfat tidak larut: PbSO₄, BaSO₄, CaSO₄.';
      explanation = `${saltName} (${formula}) ialah satu daripada tiga pengecualian utama garam sulfat (P-B-C). Ia kekal sebagai mendakan ${solidColorName.toLowerCase()} walaupun dipanaskan.`;
    } else if (cation.id === 'ag' || cation.id === 'hg1') {
      status = 'sparingly';
      roomTempSoluble = false;
      hotWaterSoluble = false;
      statusLabel = 'Sangat Sedikit Larut / Tak Larut';
      ruleTag = 'Garam Sulfat Logam Berat';
      ruleMnemonic = 'Jadual 6.6 menumpukan pengecualian PBC; Ag₂SO₄ dan Hg₂SO₄ sangat sedikit larut.';
      explanation = `${saltName} (${formula}) hampir tidak larut / sangat sedikit larut dalam air pada suhu bilik, meninggalkan mendakan putih di dasar bikar.`;
    } else {
      ruleTag = 'Garam Sulfat Terlarutkan';
      ruleMnemonic = 'Semua garam sulfat larut KECUALI PBC (PbSO₄, BaSO₄, CaSO₄).';
      explanation = `Oleh sebab kationnya bukan Pb²⁺, Ba²⁺, atau Ca²⁺, ${saltName} (${formula}) larut sepenuhnya dalam air menghasilkan larutan ${aqueousColorName.toLowerCase()}.`;
    }
  } else if (anion.id === 'cl') {
    if (cation.id === 'pb2') {
      status = 'hot-soluble';
      roomTempSoluble = false;
      hotWaterSoluble = true;
      statusLabel = 'Tidak Larut (Suhu Bilik) • Larut dalam Air Panas';
      ruleTag = 'Pengecualian Klorida: H-P-A (Sifat Istimewa PbCl₂)';
      ruleMnemonic = 'HPA Klorida: Hg₂Cl₂, PbCl₂, AgCl. PbCl₂ larut bila dipanaskan (Rajah 6.37)!';
      explanation = `Pada suhu bilik, ${saltName} (${formula}) tidak larut (mendakan putih). Mengikut Rajah 6.37 buku teks, PbCl₂ adalah istimewa kerana ia larut dalam air panas membentuk larutan tidak berwarna, dan mendakan putih terbentuk semula apabila disejukkan.`;
    } else if (cation.id === 'ag' || cation.id === 'hg1') {
      status = 'insoluble';
      roomTempSoluble = false;
      hotWaterSoluble = false;
      statusLabel = 'Tidak Larut dalam Air (Garam Tak Terlarutkan)';
      ruleTag = 'Pengecualian Klorida: H-P-A';
      ruleMnemonic = 'HPA Klorida tidak larut: Hg₂Cl₂, PbCl₂, AgCl.';
      explanation = `${saltName} (${formula}) tergolong dalam kumpulan HPA klorida yang tidak larut dalam air. Ia membentuk mendakan putih di dasar bikar walaupun air dipanaskan.`;
    } else {
      ruleTag = 'Garam Klorida Terlarutkan';
      ruleMnemonic = 'Semua garam klorida larut KECUALI HPA (Hg₂Cl₂, PbCl₂, AgCl).';
      if (cation.id === 'cu2') {
        explanation = `CuCl₂ larut dalam air. Perhatikan keistimewaan Jadual 6.12: pepejal CuCl₂ berwarna hijau, tetapi larutan akueusnya berwarna biru akibat pembentukan ion kompleks kuprum(II) terhidrat!`;
      } else {
        explanation = `${saltName} (${formula}) bukan daripada kumpulan HPA, maka ia larut dalam air menghasilkan larutan ${aqueousColorName.toLowerCase()}.`;
      }
    }
  } else if (anion.id === 'co3') {
    status = 'insoluble';
    roomTempSoluble = false;
    hotWaterSoluble = false;
    statusLabel = 'Tidak Larut dalam Air (Garam Tak Terlarutkan)';
    ruleTag = 'Garam Karbonat Tak Terlarutkan';
    ruleMnemonic = 'Hanya garam karbonat SPAn (Na⁺, K⁺, NH₄⁺) larut; yang lain TIDAK larut.';
    if (cation.id === 'al' || cation.id === 'fe3') {
      explanation = `Semua garam karbonat selain Na⁺, K⁺ dan NH₄⁺ tidak larut dalam air. Ion Al³⁺ / Fe³⁺ dengan karbonat cenderung terhidrolisis menghasilkan mendakan hidroksida yang juga tidak larut.`;
    } else {
      explanation = `${saltName} (${formula}) tidak mengandungi ion natrium, kalium atau ammonium (SPAn), maka ia tidak larut dalam air dan membentuk mendakan ${solidColorName.toLowerCase()}.`;
    }
  } else if (anion.id === 'i') {
    if (cation.id === 'pb2') {
      status = 'hot-soluble';
      roomTempSoluble = false;
      hotWaterSoluble = true;
      statusLabel = 'Tidak Larut (Suhu Bilik) • Larut dalam Air Panas';
      ruleTag = 'Sifat Istimewa PbI₂ (Rajah 6.37 KSSM)';
      ruleMnemonic = 'Pepejal kuning PbI₂ larut dalam air panas membentuk larutan tidak berwarna!';
      explanation = `Pada suhu bilik, plumbum(II) iodida (PbI₂) membentuk mendakan kuning yang tidak larut. Apabila air dipanaskan (80 °C), PbI₂ larut membentuk larutan jernih tidak berwarna dan menghablur semula (hujan emas) apabila disejukkan.`;
    } else if (cation.id === 'ag' || cation.id === 'hg1') {
      status = 'insoluble';
      roomTempSoluble = false;
      hotWaterSoluble = false;
      statusLabel = 'Tidak Larut dalam Air (Garam Tak Terlarutkan)';
      ruleTag = 'Garam Iodida Tak Terlarutkan';
      ruleMnemonic = 'Semua iodida larut kecuali AgI (kuning), PbI₂ (kuning), dan Hg₂I₂.';
      explanation = `${saltName} (${formula}) tidak larut dalam air pada suhu bilik mahupun dalam air panas, membentuk mendakan berwarna ${solidColorName.toLowerCase()}.`;
    } else {
      ruleTag = 'Garam Iodida Terlarutkan';
      ruleMnemonic = 'Kebanyakan garam iodida larut kecuali iodida bagi Pb²⁺, Ag⁺ dan Hg₂²⁺.';
      explanation = `${saltName} (${formula}) larut dalam air menghasilkan larutan ${aqueousColorName.toLowerCase()}.`;
    }
  } else if (anion.id === 'br') {
    if (cation.id === 'pb2') {
      status = 'hot-soluble';
      roomTempSoluble = false;
      hotWaterSoluble = true;
      statusLabel = 'Tidak Larut (Suhu Bilik) • Larut dalam Air Panas';
      ruleTag = 'Halida Plumbum(II)';
      ruleMnemonic = 'Seperti PbCl₂, PbBr₂ sangat sedikit/tidak larut pada suhu bilik tetapi larut dalam air panas.';
      explanation = `Plumbum(II) bromida (${formula}) membentuk mendakan putih pada suhu bilik dan melarut menjadi larutan tidak berwarna apabila air dipanaskan.`;
    } else if (cation.id === 'ag' || cation.id === 'hg1') {
      status = 'insoluble';
      roomTempSoluble = false;
      hotWaterSoluble = false;
      statusLabel = 'Tidak Larut dalam Air (Garam Tak Terlarutkan)';
      ruleTag = 'Garam Bromida Tak Terlarutkan';
      ruleMnemonic = 'Garam bromida bagi Ag⁺ dan Hg₂²⁺ tidak larut dalam air.';
      explanation = `${saltName} (${formula}) tidak larut dalam air dan membentuk mendakan berwarna ${solidColorName.toLowerCase()}.`;
    } else {
      ruleTag = 'Garam Bromida Terlarutkan';
      ruleMnemonic = 'Kebanyakan garam bromida larut kecuali bromida bagi Pb²⁺, Ag⁺ dan Hg₂²⁺.';
      explanation = `${saltName} (${formula}) larut dalam air menghasilkan larutan ${aqueousColorName.toLowerCase()}.`;
    }
  }

  // Untuk garam yang tidak larut di suhu bilik (selain kes khas panas), pastikan paparan larutan akueus tepat
  if (!roomTempSoluble && status === 'insoluble') {
    aqueousColorName = `Tidak larut dalam air (Air kekal jernih + Mendakan ${solidColorName.toLowerCase()})`;
    aqueousHex = '#e0f2fe';
    aqueousOpacity = 0.22;
  } else if (!roomTempSoluble && status === 'sparingly') {
    aqueousColorName = `Sangat sedikit larut (Mendakan ${solidColorName.toLowerCase()} di dasar)`;
    aqueousHex = '#e0f2fe';
    aqueousOpacity = 0.22;
  } else if (status === 'hot-soluble') {
    aqueousColorName = 'Tidak berwarna (hanya apabila larut dalam air panas)';
    aqueousHex = '#e0f2fe';
    aqueousOpacity = 0.25;
  }

  return {
    cation,
    anion,
    formula,
    saltName,
    solidColorName,
    solidHex,
    aqueousColorName,
    aqueousHex,
    aqueousOpacity,
    precipitateHex,
    status,
    roomTempSoluble,
    hotWaterSoluble,
    statusLabel,
    ruleTag,
    ruleMnemonic,
    explanation,
  };
}

// Jadual 6.6 (Buku Teks m.s. 179)
export const SOLUBILITY_RULES_TABLE = [
  {
    type: 'Garam nitrat (NO₃⁻)',
    soluble: 'Semua garam nitrat',
    insoluble: 'Tiada',
  },
  {
    type: 'Garam sulfat (SO₄²⁻)',
    soluble: 'Semua garam sulfat kecuali →',
    insoluble: 'PbSO₄, BaSO₄, CaSO₄ (P-B-C)',
  },
  {
    type: 'Garam klorida (Cl⁻)',
    soluble: 'Semua garam klorida kecuali →',
    insoluble: 'Hg₂Cl₂, PbCl₂*, AgCl (H-P-A)',
  },
  {
    type: 'Garam karbonat (CO₃²⁻)',
    soluble: 'Na₂CO₃, K₂CO₃, (NH₄)₂CO₃ (SPAn)',
    insoluble: 'Semua garam karbonat yang lain',
  },
  {
    type: 'Garam ammonium, natrium & kalium',
    soluble: 'Semua garam NH₄⁺, Na⁺ dan K⁺',
    insoluble: 'Tiada',
  },
];

// Jadual 6.12 (Buku Teks m.s. 199)
export const COLOR_REFERENCE_TABLE = [
  {
    salt: 'Garam ion ferum(II), Fe²⁺ (cth. FeSO₄, FeCl₂)',
    solid: 'Hijau',
    aqueous: 'Hijau / hijau muda',
    solidHex: '#4ade80',
    aqHex: '#86efac',
  },
  {
    salt: 'Garam ion ferum(III), Fe³⁺ (cth. FeCl₃, Fe(NO₃)₃)',
    solid: 'Perang',
    aqueous: 'Perang / perang kekuningan',
    solidHex: '#b45309',
    aqHex: '#f59e0b',
  },
  {
    salt: 'Kuprum(II) sulfat, CuSO₄ & Kuprum(II) nitrat, Cu(NO₃)₂',
    solid: 'Biru',
    aqueous: 'Biru',
    solidHex: '#2563eb',
    aqHex: '#3b82f6',
  },
  {
    salt: 'Kuprum(II) klorida, CuCl₂',
    solid: 'Hijau',
    aqueous: 'Biru',
    solidHex: '#16a34a',
    aqHex: '#3b82f6',
  },
  {
    salt: 'Kuprum(II) karbonat, CuCO₃',
    solid: 'Hijau',
    aqueous: 'Tidak larut di dalam air',
    solidHex: '#15803d',
    aqHex: '#e2e8f0',
  },
  {
    salt: 'Garam putih biasa (NaCl, Ca(NO₃)₂, BaSO₄, PbCl₂*)',
    solid: 'Putih',
    aqueous: 'Larutan tidak berwarna (jika larut) / Mendakan putih',
    solidHex: '#f1f5f9',
    aqHex: '#e0f2fe',
  },
  {
    salt: 'Plumbum(II) iodida, PbI₂ (Rajah 6.37)',
    solid: 'Kuning',
    aqueous: 'Tak larut (suhu bilik) / Tidak berwarna (air panas)',
    solidHex: '#facc15',
    aqHex: '#fef9c3',
  },
];
