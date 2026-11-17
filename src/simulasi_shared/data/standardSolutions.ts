export type StandardSaltId = 'nacl' | 'cuso4' | 'fecl3';
export type StandardPhaseMode = 'solid' | 'dilution';

export interface StandardSaltSpec {
  id: StandardSaltId;
  formula: string;
  name: string;
  solidColorLabel: string;
  solutionColorLabel: string;
  dilutedColorLabel: string;
  solidHex: string;
  solidStrokeHex: string;
  stockHex: string;
  stockOpacity: number;
  dilutedHex: string;
  dilutedOpacity: number;
  jarFormulaText: string;
  molarMass: number;
  formulaNote: string;
}

export interface LabProcedureToolStep {
  step: number;
  code: string;
  toolId: string;
  toolName: string;
  toolSub: string;
  title: string;
  instruction: string;
}

export const STANDARD_SALTS: StandardSaltSpec[] = [
  {
    id: 'nacl',
    formula: 'NaCl',
    name: 'Natrium klorida',
    solidColorLabel: 'Hablur putih',
    solutionColorLabel: 'Tidak berwarna (jernih)',
    dilutedColorLabel: 'Tidak berwarna (jernih cair)',
    solidHex: '#f8fafc',
    solidStrokeHex: '#94a3b8',
    stockHex: '#bae6fd',
    stockOpacity: 0.42,
    dilutedHex: '#e0f2fe',
    dilutedOpacity: 0.3,
    jarFormulaText: '23 + 35.5',
    molarMass: 58.5,
    formulaNote: 'JAR: Na = 23, Cl = 35.5 (Jadual Data Unsur KSSM m.s. 276)',
  },
  {
    id: 'cuso4',
    formula: 'CuSO₄',
    name: 'Kuprum(II) sulfat',
    solidColorLabel: 'Hablur biru / kontang putih',
    solutionColorLabel: 'Biru terang (ion Cu²⁺)',
    dilutedColorLabel: 'Biru lebih cair',
    solidHex: '#38bdf8',
    solidStrokeHex: '#0284c7',
    stockHex: '#0284c7',
    stockOpacity: 0.72,
    dilutedHex: '#38bdf8',
    dilutedOpacity: 0.42,
    jarFormulaText: '64 + 32 + 4(16)',
    molarMass: 160.0,
    formulaNote: 'JAR: Cu = 64, S = 32, O = 16. Warna biru larutan disebabkan ion Cu²⁺(ak).',
  },
  {
    id: 'fecl3',
    formula: 'FeCl₃',
    name: 'Ferum(III) klorida',
    solidColorLabel: 'Pepejal perang kehitaman',
    solutionColorLabel: 'Perang keemasan pekat (ion Fe³⁺)',
    dilutedColorLabel: 'Kuning keperangan lebih cerah',
    solidHex: '#78350f',
    solidStrokeHex: '#451a03',
    stockHex: '#b45309',
    stockOpacity: 0.74,
    dilutedHex: '#f59e0b',
    dilutedOpacity: 0.44,
    jarFormulaText: '56 + 3(35.5)',
    molarMass: 162.5,
    formulaNote: 'JAR: Fe = 56, Cl = 35.5. Warna perang larutan disebabkan ion Fe³⁺(ak).',
  },
];

export function computeSolidPrepStoichiometry(
  salt: StandardSaltSpec,
  molarityM = 1.0,
  volumeCm3 = 250
) {
  const moles = +((molarityM * volumeCm3) / 1000).toFixed(4);
  const rawMass = moles * salt.molarMass;
  const mass2dp = +rawMass.toFixed(2);
  return {
    molarityM,
    volumeCm3,
    moles,
    rawMass,
    mass2dp,
  };
}

export function computeDilutionStoichiometry(
  m1StockM = 1.0,
  m2TargetM = 0.5,
  v2FinalCm3 = 100
) {
  const v1StockCm3 = m1StockM > 0 ? +((m2TargetM * v2FinalCm3) / m1StockM).toFixed(1) : 0;
  const vWaterNeededCm3 = +Math.max(0, v2FinalCm3 - v1StockCm3).toFixed(1);
  const molesBefore = +((m1StockM * v1StockCm3) / 1000).toFixed(4);
  const molesAfter = +((m2TargetM * v2FinalCm3) / 1000).toFixed(4);
  return {
    m1StockM,
    m2TargetM,
    v2FinalCm3,
    v1StockCm3,
    vWaterNeededCm3,
    molesBefore,
    molesAfter,
  };
}

export function buildSolidSteps(
  salt: StandardSaltSpec,
  mass2dp: number,
  volumeCm3: number
): LabProcedureToolStep[] {
  return [
    {
      step: 1,
      code: '(a)',
      toolId: 'weigh-solid',
      toolName: `Timbang ${salt.formula} + Air`,
      toolSub: `${mass2dp.toFixed(2)} g + 100 cm³ air`,
      title: 'Timbang Pepejal & Tambah Air Suling',
      instruction: `Seret pepejal ${salt.name} (${salt.formula}) ke penimbang elektronik untuk menimbang tepat ${mass2dp.toFixed(
        2
      )} g, masukkan ke bikar dan tambahkan ~100 cm³ air suling.`,
    },
    {
      step: 2,
      code: '(b)',
      toolId: 'glass-rod',
      toolName: 'Rod Kaca',
      toolSub: 'Kacau hingga larut',
      title: 'Kacau Campuran Hingga Larut Sepenuhnya',
      instruction: `Gunakan rod kaca untuk mengacau campuran sehingga semua pepejal ${salt.formula} terlarut sepenuhnya menghasilkan larutan berwarna ${salt.solutionColorLabel.toLowerCase()}.`,
    },
    {
      step: 3,
      code: '(c)',
      toolId: 'funnel-pour',
      toolName: 'Corong Turas',
      toolSub: `Pindah ke kelalang ${volumeCm3} cm³`,
      title: `Pindahkan ke Kelalang Volumetrik ${volumeCm3} cm³`,
      instruction: `Pindahkan kesemua larutan ${salt.formula} daripada bikar ke dalam kelalang volumetrik ${volumeCm3} cm³ melalui corong turas.`,
    },
    {
      step: 4,
      code: '(d)',
      toolId: 'wash-bottle',
      toolName: 'Botol Pencuci',
      toolSub: 'Bilas bikar & corong',
      title: 'Bilas Bikar & Corong Turas Dengan Air Suling',
      instruction: `Bilaskan bikar dan corong turas dengan sedikit air suling dan pindahkan SEMUA air bilasan ke dalam kelalang volumetrik supaya tiada mol zat terlarut tertinggal.`,
    },
    {
      step: 5,
      code: '(e)',
      toolId: 'dropper',
      toolName: 'Penitis',
      toolSub: 'Laraskan aras meniskus',
      title: 'Laraskan Meniskus Tepat Pada Tanda Senggatan',
      instruction: `Alihkan corong turas dan tambah air suling menghampiri tanda senggatan. Titiskan air suling dengan penitis hingga bahagian bawah meniskus tepat segaris tanda senggatan pada paras mata.`,
    },
    {
      step: 6,
      code: '(f)',
      toolId: 'stopper',
      toolName: 'Penutup Kelalang',
      toolSub: 'Tutup & telangkup sebati',
      title: 'Tutup & Telangkupkan Kelalang Volumetrik',
      instruction: `Tutupkan kelalang volumetrik dengan penutup dan telangkupkan beberapa kali supaya larutan piawai ${salt.formula} 1.0 mol dm⁻³ sebati.`,
    },
  ];
}

export function buildDilutionSteps(
  salt: StandardSaltSpec,
  v1StockCm3: number,
  vWaterCm3: number,
  m2TargetM: number,
  v2FinalCm3: number
): LabProcedureToolStep[] {
  return [
    {
      step: 1,
      code: '(a)',
      toolId: 'stock-pour',
      toolName: `Larutan Stok ${salt.formula}`,
      toolSub: 'Tuang 1.0 M ke bikar',
      title: 'Tuang Larutan Stok 1.0 mol dm⁻³ ke Bikar',
      instruction: `Tuangkan larutan stok ${salt.name} (${salt.formula}) 1.0 mol dm⁻³ yang telah disediakan ke dalam sebuah bikar 100 cm³.`,
    },
    {
      step: 2,
      code: '(b)',
      toolId: 'pipette-draw',
      toolName: 'Pipet & Pengisi Pipet',
      toolSub: `Sukat V₁ = ${v1StockCm3.toFixed(1)} cm³`,
      title: `Sukat V₁ = ${v1StockCm3.toFixed(1)} cm³ Larutan Stok Dengan Pipet`,
      instruction: `Bilaskan pipet dahulu dengan larutan stok 1.0 M (bukan air suling), kemudian sedut tepat V₁ = ${v1StockCm3.toFixed(
        1
      )} cm³ larutan stok.`,
    },
    {
      step: 3,
      code: '(c)',
      toolId: 'pipette-transfer',
      toolName: `Pindah ke Kelalang ${v2FinalCm3} cm³`,
      toolSub: `Masukkan ${v1StockCm3.toFixed(1)} cm³ stok`,
      title: `Pindahkan V₁ ke Kelalang Volumetrik ${v2FinalCm3} cm³`,
      instruction: `Pindahkan ${v1StockCm3.toFixed(
        1
      )} cm³ larutan stok ${salt.formula} ke dalam kelalang volumetrik ${v2FinalCm3} cm³ yang bersih.`,
    },
    {
      step: 4,
      code: '(d)',
      toolId: 'water-dilute',
      toolName: 'Air Suling (Botol Pencuci)',
      toolSub: `Tambah ~${vWaterCm3.toFixed(1)} cm³ air`,
      title: `Tambah Air Suling (${vWaterCm3.toFixed(1)} cm³ Diperlukan)`,
      instruction: `Tambahkan air suling daripada botol pencuci (isi padu air diperlukan ≈ ${vWaterCm3.toFixed(
        1
      )} cm³) sehingga paras menghampiri tanda senggatan ${v2FinalCm3} cm³.`,
    },
    {
      step: 5,
      code: '(e)',
      toolId: 'dropper-dilute',
      toolName: 'Penitis',
      toolSub: 'Tepatkan meniskus',
      title: 'Laraskan Aras Meniskus Dengan Penitis',
      instruction: `Tambahkan titisan akhir air suling dengan penitis hingga bahagian bawah meniskus tepat pada tanda senggatan ${v2FinalCm3} cm³ (elak ralat paralaks).`,
    },
    {
      step: 6,
      code: '(f)',
      toolId: 'stopper-dilute',
      toolName: 'Penutup Kelalang',
      toolSub: 'Goncang & telangkupkan',
      title: `Tutup & Telangkupkan Hingga ${m2TargetM.toFixed(1)} M Sebati`,
      instruction: `Tutup dan telangkupkan kelalang beberapa kali. Kepekatan berkurang kepada ${m2TargetM.toFixed(
        1
      )} mol dm⁻³ dan warna larutan menjadi ${salt.dilutedColorLabel.toLowerCase()} (bilangan mol zat terlarut kekal sama!).`,
    },
  ];
}
