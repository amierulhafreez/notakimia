export type CationId =
  | 'ca2'
  | 'mg2'
  | 'zn2'
  | 'al3'
  | 'pb2'
  | 'nh4'
  | 'fe2'
  | 'fe3'
  | 'cu2';

export type ReagentId =
  | 'naoh'
  | 'nh3'
  | 'ki'
  | 'nessler'
  | 'k3'
  | 'k4'
  | 'kscn';

export type DosageStage = 'few' | 'excess';

export interface CationProfile {
  id: CationId;
  formula: string;
  name: string;
  sampleSaltName: string; // e.g. "Kalsium nitrat, Ca(NO₃)₂" (Eksperimen 6.10)
  initialColorLabel: string;
  initialLiquidHex: string;
  initialLiquidOpacity: number;
  hintClue: string;
}

export interface ReagentDef {
  id: ReagentId;
  shortLabel: string;
  fullName: string;
  formula: string;
  category: 'alkali' | 'confirmatory';
  bottleColorHex: string;
  supportsExcess: boolean;
  targetHint: string;
}

export interface TubeVisualResult {
  observationText: string;
  inferenceHint: string;
  liquidHex: string;
  liquidOpacity: number;
  hasPrecipitate: boolean;
  precipitateHex: string;
  precipitateLabel?: string;
  canHeat: boolean;
  heatedObservation?: string;
  heatedLiquidHex?: string;
  heatedLiquidOpacity?: number;
  heatedHasPrecipitate?: boolean;
  releasesAmmoniaGas?: boolean;
  isConfirmatoryMatch?: boolean;
}

export const CATION_PROFILES: CationProfile[] = [
  {
    id: 'cu2',
    formula: 'Cu²⁺',
    name: 'Ion kuprum(II)',
    sampleSaltName: 'Larutan kuprum(II) sulfat, CuSO₄ 1.0 mol dm⁻³',
    initialColorLabel: 'Biru',
    initialLiquidHex: '#3b82f6',
    initialLiquidOpacity: 0.42,
    hintClue: 'Larutan akueus berwarna biru; mendakan biru larut dalam NH₃ berlebihan menjadi biru tua.',
  },
  {
    id: 'fe2',
    formula: 'Fe²⁺',
    name: 'Ion ferum(II)',
    sampleSaltName: 'Larutan ferum(II) sulfat, FeSO₄ 1.0 mol dm⁻³',
    initialColorLabel: 'Hijau muda',
    initialLiquidHex: '#4ade80',
    initialLiquidOpacity: 0.36,
    hintClue: 'Mendakan hijau dalam NaOH & NH₃; disahkan dengan K₃Fe(CN)₆ (mendakan biru tua).',
  },
  {
    id: 'fe3',
    formula: 'Fe³⁺',
    name: 'Ion ferum(III)',
    sampleSaltName: 'Larutan ferum(III) klorida, FeCl₃ 1.0 mol dm⁻³',
    initialColorLabel: 'Perang kekuningan',
    initialLiquidHex: '#d97706',
    initialLiquidOpacity: 0.44,
    hintClue: 'Mendakan perang dalam NaOH & NH₃; larutan merah darah dengan KSCN atau biru tua dengan K₄Fe(CN)₆.',
  },
  {
    id: 'nh4',
    formula: 'NH₄⁺',
    name: 'Ion ammonium',
    sampleSaltName: 'Larutan ammonium nitrat, NH₄NO₃ 1.0 mol dm⁻³',
    initialColorLabel: 'Tidak berwarna',
    initialLiquidHex: '#e0f2fe',
    initialLiquidOpacity: 0.28,
    hintClue: 'Tiada mendakan dengan NaOH/NH₃; membebaskan gas NH₃ bila dipanaskan dengan NaOH & mendakan perang dengan Reagen Nessler.',
  },
  {
    id: 'ca2',
    formula: 'Ca²⁺',
    name: 'Ion kalsium',
    sampleSaltName: 'Larutan kalsium nitrat, Ca(NO₃)₂ 1.0 mol dm⁻³',
    initialColorLabel: 'Tidak berwarna',
    initialLiquidHex: '#e0f2fe',
    initialLiquidOpacity: 0.28,
    hintClue: 'Mendakan putih tidak larut dalam NaOH berlebihan, tetapi TIADA mendakan dengan larutan NH₃.',
  },
  {
    id: 'mg2',
    formula: 'Mg²⁺',
    name: 'Ion magnesium',
    sampleSaltName: 'Larutan magnesium nitrat, Mg(NO₃)₂ 1.0 mol dm⁻³',
    initialColorLabel: 'Tidak berwarna',
    initialLiquidHex: '#e0f2fe',
    initialLiquidOpacity: 0.28,
    hintClue: 'Mendakan putih TIDAK larut dalam kedua-dua larutan NaOH berlebihan dan NH₃ berlebihan.',
  },
  {
    id: 'zn2',
    formula: 'Zn²⁺',
    name: 'Ion zink',
    sampleSaltName: 'Larutan zink nitrat, Zn(NO₃)₂ 1.0 mol dm⁻³',
    initialColorLabel: 'Tidak berwarna',
    initialLiquidHex: '#e0f2fe',
    initialLiquidOpacity: 0.28,
    hintClue: 'Mendakan putih LARUT dalam kedua-dua larutan NaOH berlebihan dan NH₃ berlebihan.',
  },
  {
    id: 'al3',
    formula: 'Al³⁺',
    name: 'Ion aluminium',
    sampleSaltName: 'Larutan aluminium nitrat, Al(NO₃)₃ 1.0 mol dm⁻³',
    initialColorLabel: 'Tidak berwarna',
    initialLiquidHex: '#e0f2fe',
    initialLiquidOpacity: 0.28,
    hintClue: 'Mendakan putih larut dalam NaOH berlebihan, tidak larut dalam NH₃ berlebihan, dan TIADA mendakan kuning dengan KI.',
  },
  {
    id: 'pb2',
    formula: 'Pb²⁺',
    name: 'Ion plumbum(II)',
    sampleSaltName: 'Larutan plumbum(II) nitrat, Pb(NO₃)₂ 1.0 mol dm⁻³',
    initialColorLabel: 'Tidak berwarna',
    initialLiquidHex: '#e0f2fe',
    initialLiquidOpacity: 0.28,
    hintClue: 'Mendakan putih larut dalam NaOH berlebihan, tidak larut dalam NH₃ berlebihan, dan membentuk MENDakan KUNING dengan KI.',
  },
];

export const REAGENT_DEFS: ReagentDef[] = [
  {
    id: 'naoh',
    shortLabel: 'NaOH',
    fullName: 'Natrium hidroksida',
    formula: 'NaOH (aq)',
    category: 'alkali',
    bottleColorHex: '#0284c7',
    supportsExcess: true,
    targetHint: 'Ujian alkali utama (Rajah 6.56)',
  },
  {
    id: 'nh3',
    shortLabel: 'NH₃',
    fullName: 'Larutan ammonia',
    formula: 'NH₃ (aq)',
    category: 'alkali',
    bottleColorHex: '#0d9488',
    supportsExcess: true,
    targetHint: 'Ujian alkali utama (Rajah 6.57)',
  },
  {
    id: 'ki',
    shortLabel: 'KI',
    fullName: 'Kalium iodida',
    formula: 'KI (aq)',
    category: 'confirmatory',
    bottleColorHex: '#ca8a04',
    supportsExcess: false,
    targetHint: 'Beza Pb²⁺ & Al³⁺ (Rajah 6.60)',
  },
  {
    id: 'nessler',
    shortLabel: 'Nessler',
    fullName: 'Reagen Nessler',
    formula: 'K₂HgI₄',
    category: 'confirmatory',
    bottleColorHex: '#b45309',
    supportsExcess: false,
    targetHint: 'Sahkan ion NH₄⁺ (Rajah 6.59)',
  },
  {
    id: 'k3',
    shortLabel: 'K₃Fe(CN)₆',
    fullName: 'Kalium heksasianoferat(III)',
    formula: 'K₃Fe(CN)₆',
    category: 'confirmatory',
    bottleColorHex: '#d97706',
    supportsExcess: false,
    targetHint: 'Sahkan ion Fe²⁺ (Rajah 6.59)',
  },
  {
    id: 'k4',
    shortLabel: 'K₄Fe(CN)₆',
    fullName: 'Kalium heksasianoferat(II)',
    formula: 'K₄Fe(CN)₆',
    category: 'confirmatory',
    bottleColorHex: '#65a30d',
    supportsExcess: false,
    targetHint: 'Sahkan ion Fe³⁺ (Rajah 6.59)',
  },
  {
    id: 'kscn',
    shortLabel: 'KSCN',
    fullName: 'Kalium tiosianat',
    formula: 'KSCN (aq)',
    category: 'confirmatory',
    bottleColorHex: '#dc2626',
    supportsExcess: false,
    targetHint: 'Sahkan ion Fe³⁺ (merah darah)',
  },
];

export function evaluateCationTest(
  cationId: CationId,
  reagentId: ReagentId,
  dosage: DosageStage
): TubeVisualResult {
  const cat = CATION_PROFILES.find((c) => c.id === cationId)!;
  const baseLiquidHex = cat.initialLiquidHex;
  const baseOpacity = cat.initialLiquidOpacity;

  // 1. LARUTAN NATRIUM HIDROKSIDA (NaOH) — Rajah 6.56
  if (reagentId === 'naoh') {
    if (cationId === 'nh4') {
      return {
        observationText:
          dosage === 'few'
            ? 'Tiada mendakan terbentuk; larutan kekal tidak berwarna.'
            : 'Masih tiada mendakan terbentuk dalam NaOH berlebihan.',
        inferenceHint:
          'Ion NH₄⁺ mungkin hadir. Cuba panaskan campuran dan uji dengan kertas litmus merah lembap!',
        liquidHex: baseLiquidHex,
        liquidOpacity: baseOpacity,
        hasPrecipitate: false,
        precipitateHex: '#ffffff',
        canHeat: true,
        heatedObservation:
          'Gas ammonia (NH₃) berbau sengit terbebas dan menukarkan kertas litmus merah lembap menjadi BIRU.',
        heatedLiquidHex: baseLiquidHex,
        heatedLiquidOpacity: baseOpacity,
        heatedHasPrecipitate: false,
        releasesAmmoniaGas: true,
      };
    }

    if (cationId === 'ca2' || cationId === 'mg2') {
      return {
        observationText:
          dosage === 'few'
            ? 'Mendakan putih terbentuk.'
            : 'Mendakan putih TIDAK larut di dalam larutan NaOH berlebihan.',
        inferenceHint:
          'Ca²⁺ atau Mg²⁺ mungkin hadir. Uji sampel baharu dengan larutan ammonia (NH₃) untuk membezakannya.',
        liquidHex: baseLiquidHex,
        liquidOpacity: 0.25,
        hasPrecipitate: true,
        precipitateHex: '#f8fafc',
        precipitateLabel: 'Mendakan putih',
        canHeat: true,
        heatedObservation:
          'Tiada gas ammonia dibebaskan; kertas litmus merah lembap kekal merah.',
        heatedLiquidHex: baseLiquidHex,
        heatedLiquidOpacity: 0.25,
        heatedHasPrecipitate: true,
      };
    }

    if (cationId === 'zn2' || cationId === 'al3' || cationId === 'pb2') {
      return {
        observationText:
          dosage === 'few'
            ? 'Mendakan putih terbentuk.'
            : 'Mendakan putih LARUT di dalam larutan NaOH berlebihan menghasilkan larutan tidak berwarna.',
        inferenceHint:
          dosage === 'few'
            ? 'Kation Ca²⁺, Mg²⁺, Zn²⁺, Al³⁺ atau Pb²⁺ mungkin hadir. Tambahkan NaOH berlebihan!'
            : 'Zn²⁺, Al³⁺ atau Pb²⁺ (ZAP) mungkin hadir. Cuci tabung uji dan uji pula dengan larutan NH₃!',
        liquidHex: baseLiquidHex,
        liquidOpacity: 0.25,
        hasPrecipitate: dosage === 'few',
        precipitateHex: '#f8fafc',
        precipitateLabel: dosage === 'few' ? 'Mendakan putih' : undefined,
        canHeat: false,
      };
    }

    if (cationId === 'fe2') {
      return {
        observationText:
          dosage === 'few'
            ? 'Mendakan hijau (hijau kotor) terbentuk.'
            : 'Mendakan hijau TIDAK larut di dalam larutan NaOH berlebihan.',
        inferenceHint: 'Ion Fe²⁺ mungkin hadir. Sahkan dengan larutan K₃Fe(CN)₆.',
        liquidHex: '#bbf7d0',
        liquidOpacity: 0.24,
        hasPrecipitate: true,
        precipitateHex: '#15803d',
        precipitateLabel: 'Mendakan hijau',
        canHeat: false,
      };
    }

    if (cationId === 'fe3') {
      return {
        observationText:
          dosage === 'few'
            ? 'Mendakan perang (perang kemerahan) terbentuk.'
            : 'Mendakan perang TIDAK larut di dalam larutan NaOH berlebihan.',
        inferenceHint:
          'Ion Fe³⁺ mungkin hadir. Sahkan dengan larutan K₄Fe(CN)₆ atau KSCN.',
        liquidHex: '#fef3c7',
        liquidOpacity: 0.24,
        hasPrecipitate: true,
        precipitateHex: '#9a3412',
        precipitateLabel: 'Mendakan perang',
        canHeat: false,
      };
    }

    // cu2
    return {
      observationText:
        dosage === 'few'
          ? 'Mendakan biru terbentuk.'
          : 'Mendakan biru TIDAK larut di dalam larutan NaOH berlebihan.',
      inferenceHint:
        'Ion Cu²⁺ mungkin hadir. Uji dengan larutan ammonia (NH₃) berlebihan untuk melihat pembentukan larutan biru tua.',
      liquidHex: '#bae6fd',
      liquidOpacity: 0.28,
      hasPrecipitate: true,
      precipitateHex: '#0284c7',
      precipitateLabel: 'Mendakan biru',
      canHeat: false,
    };
  }

  // 2. LARUTAN AMMONIA (NH3) — Rajah 6.57
  if (reagentId === 'nh3') {
    if (cationId === 'ca2' || cationId === 'nh4') {
      return {
        observationText:
          dosage === 'few'
            ? 'Tiada mendakan terbentuk (tiada perubahan).'
            : 'Tiada perubahan; larutan kekal jernih tidak berwarna dalam NH₃ berlebihan.',
        inferenceHint:
          'Ion Ca²⁺ atau NH₄⁺ mungkin hadir. Uji dengan NaOH (mendakan putih untuk Ca²⁺; tiada mendakan untuk NH₄⁺) atau Reagen Nessler.',
        liquidHex: baseLiquidHex,
        liquidOpacity: baseOpacity,
        hasPrecipitate: false,
        precipitateHex: '#ffffff',
        canHeat: false,
      };
    }

    if (cationId === 'mg2' || cationId === 'al3' || cationId === 'pb2') {
      return {
        observationText:
          dosage === 'few'
            ? 'Mendakan putih terbentuk.'
            : 'Mendakan putih TIDAK larut di dalam larutan NH₃ berlebihan.',
        inferenceHint:
          dosage === 'few'
            ? 'Tambahkan larutan NH₃ berlebihan untuk menguji keterlarutan mendakan.'
            : 'Mg²⁺, Al³⁺ atau Pb²⁺ mungkin hadir. Gabungkan dengan ujian NaOH & ujian pengesahan KI!',
        liquidHex: baseLiquidHex,
        liquidOpacity: 0.25,
        hasPrecipitate: true,
        precipitateHex: '#f8fafc',
        precipitateLabel: 'Mendakan putih',
        canHeat: false,
      };
    }

    if (cationId === 'zn2') {
      return {
        observationText:
          dosage === 'few'
            ? 'Mendakan putih terbentuk.'
            : 'Mendakan putih LARUT di dalam larutan NH₃ berlebihan menghasilkan larutan tidak berwarna.',
        inferenceHint:
          dosage === 'few'
            ? 'Tambahkan larutan NH₃ berlebihan!'
            : 'Mendakan putih yang larut dalam NH₃ berlebihan menandakan kehadiran ion Zn²⁺.',
        liquidHex: baseLiquidHex,
        liquidOpacity: 0.25,
        hasPrecipitate: dosage === 'few',
        precipitateHex: '#f8fafc',
        precipitateLabel: dosage === 'few' ? 'Mendakan putih' : undefined,
        canHeat: false,
      };
    }

    if (cationId === 'fe2') {
      return {
        observationText:
          dosage === 'few'
            ? 'Mendakan hijau (hijau kotor) terbentuk.'
            : 'Mendakan hijau TIDAK larut di dalam larutan NH₃ berlebihan.',
        inferenceHint: 'Ion Fe²⁺ mungkin hadir. Sahkan dengan K₃Fe(CN)₆.',
        liquidHex: '#bbf7d0',
        liquidOpacity: 0.24,
        hasPrecipitate: true,
        precipitateHex: '#15803d',
        precipitateLabel: 'Mendakan hijau',
        canHeat: false,
      };
    }

    if (cationId === 'fe3') {
      return {
        observationText:
          dosage === 'few'
            ? 'Mendakan perang (perang kemerahan) terbentuk.'
            : 'Mendakan perang TIDAK larut di dalam larutan NH₃ berlebihan.',
        inferenceHint: 'Ion Fe³⁺ mungkin hadir. Sahkan dengan K₄Fe(CN)₆ atau KSCN.',
        liquidHex: '#fef3c7',
        liquidOpacity: 0.24,
        hasPrecipitate: true,
        precipitateHex: '#9a3412',
        precipitateLabel: 'Mendakan perang',
        canHeat: false,
      };
    }

    // cu2 (Contoh 17 m.s. 208)
    return {
      observationText:
        dosage === 'few'
          ? 'Mendakan biru terbentuk.'
          : 'Mendakan biru LARUT di dalam larutan NH₃ berlebihan membentuk larutan biru tua.',
      inferenceHint:
        dosage === 'few'
          ? 'Tambahkan larutan NH₃ berlebihan untuk memerhati perubahan mendakan biru.'
          : 'Pembentukan larutan biru tua dalam NH₃ berlebihan mengesahkan kehadiran ion Cu²⁺!',
      liquidHex: dosage === 'few' ? '#bae6fd' : '#1d4ed8',
      liquidOpacity: dosage === 'few' ? 0.3 : 0.78,
      hasPrecipitate: dosage === 'few',
      precipitateHex: '#0284c7',
      precipitateLabel: dosage === 'few' ? 'Mendakan biru' : undefined,
      canHeat: false,
    };
  }

  // 3. KALIUM IODIDA (KI) — Rajah 6.58 Kaedah IV & Rajah 6.60
  if (reagentId === 'ki') {
    if (cationId === 'pb2') {
      return {
        observationText: 'Mendakan KUNING (PbI₂) terbentuk serta-merta.',
        inferenceHint:
          'Ion Pb²⁺ disahkan hadir! Panaskan tabung uji: mendakan kuning larut menjadi larutan tidak berwarna dan terbentuk semula bila disejukkan.',
        liquidHex: '#fef9c3',
        liquidOpacity: 0.3,
        hasPrecipitate: true,
        precipitateHex: '#facc15',
        precipitateLabel: 'Mendakan kuning (PbI₂)',
        canHeat: true,
        heatedObservation:
          'Mendakan kuning larut di dalam air panas menjadi larutan tidak berwarna (terbentuk semula bila disejukkan).',
        heatedLiquidHex: '#e0f2fe',
        heatedLiquidOpacity: 0.28,
        heatedHasPrecipitate: false,
        isConfirmatoryMatch: true,
      };
    }

    if (cationId === 'cu2') {
      return {
        observationText: 'Mendakan putih (CuI) terbentuk dalam larutan perang iodin (I₂).',
        inferenceHint: 'Tindak balas redoks antara ion Cu²⁺ dengan I⁻.',
        liquidHex: '#b45309',
        liquidOpacity: 0.55,
        hasPrecipitate: true,
        precipitateHex: '#f8fafc',
        precipitateLabel: 'Mendakan putih CuI',
        canHeat: false,
      };
    }

    if (cationId === 'fe3') {
      return {
        observationText: 'Larutan berubah menjadi warna perang gelap (iodin terbentuk); tiada mendakan kuning PbI₂.',
        inferenceHint: 'Ion Fe³⁺ mengoksidakan I⁻ kepada I₂. Bukan Pb²⁺.',
        liquidHex: '#92400e',
        liquidOpacity: 0.55,
        hasPrecipitate: false,
        precipitateHex: '#ffffff',
        canHeat: false,
      };
    }

    return {
      observationText: 'Tiada mendakan kuning terbentuk; larutan kekal jernih.',
      inferenceHint:
        cationId === 'al3'
          ? 'Tiada mendakan dengan KI mengesahkan tiada ion Pb²⁺ (sepadan dengan Al³⁺ jika larut dalam NaOH berlebihan).'
          : 'Bukan ion Pb²⁺.',
      liquidHex: baseLiquidHex,
      liquidOpacity: baseOpacity,
      hasPrecipitate: false,
      precipitateHex: '#ffffff',
      canHeat: false,
      isConfirmatoryMatch: cationId === 'al3',
    };
  }

  // 4. REAGEN NESSLER — Rajah 6.58 Kaedah I & Rajah 6.59
  if (reagentId === 'nessler') {
    if (cationId === 'nh4') {
      return {
        observationText: 'Mendakan PERANG terbentuk dengan Reagen Nessler.',
        inferenceHint: 'Kehadiran ion ammonium, NH₄⁺ disahkan!',
        liquidHex: '#fef3c7',
        liquidOpacity: 0.35,
        hasPrecipitate: true,
        precipitateHex: '#92400e',
        precipitateLabel: 'Mendakan perang',
        canHeat: false,
        isConfirmatoryMatch: true,
      };
    }
    return {
      observationText: 'Tiada mendakan perang terbentuk.',
      inferenceHint: 'Tiada tindak balas positif NH₄⁺ dengan Reagen Nessler.',
      liquidHex: baseLiquidHex,
      liquidOpacity: Math.max(0.28, baseOpacity),
      hasPrecipitate: false,
      precipitateHex: '#ffffff',
      canHeat: false,
    };
  }

  // 5. KALIUM HEKSASIANOFERRAT(III), K3Fe(CN)6 — Rajah 6.58 Kaedah II & Lensa Kimia
  if (reagentId === 'k3') {
    if (cationId === 'fe2') {
      return {
        observationText: 'Mendakan BIRU TUA terbentuk serta-merta.',
        inferenceHint: 'Kehadiran ion ferum(II), Fe²⁺ disahkan!',
        liquidHex: '#1e3a8a',
        liquidOpacity: 0.45,
        hasPrecipitate: true,
        precipitateHex: '#1e40af',
        precipitateLabel: 'Mendakan biru tua',
        canHeat: false,
        isConfirmatoryMatch: true,
      };
    }
    if (cationId === 'fe3') {
      return {
        observationText: 'Warna PERANG KEHIJAUAN terhasil (tiada mendakan biru tua).',
        inferenceHint:
          'Lensa Kimia KSSM: K₃Fe(CN)₆ dengan Fe³⁺ menghasilkan warna perang kehijauan, bukan biru tua.',
        liquidHex: '#4d7c0f',
        liquidOpacity: 0.52,
        hasPrecipitate: false,
        precipitateHex: '#ffffff',
        canHeat: false,
      };
    }
    return {
      observationText: 'Tiada mendakan biru tua terbentuk (kekal kuning pucat reagen).',
      inferenceHint: 'Bukan ion Fe²⁺.',
      liquidHex: '#fef08a',
      liquidOpacity: 0.3,
      hasPrecipitate: false,
      precipitateHex: '#ffffff',
      canHeat: false,
    };
  }

  // 6. KALIUM HEKSASIANOFERRAT(II), K4Fe(CN)6 — Rajah 6.58 Kaedah III & Lensa Kimia
  if (reagentId === 'k4') {
    if (cationId === 'fe3') {
      return {
        observationText: 'Mendakan BIRU TUA terbentuk serta-merta.',
        inferenceHint: 'Kehadiran ion ferum(III), Fe³⁺ disahkan!',
        liquidHex: '#1e3a8a',
        liquidOpacity: 0.45,
        hasPrecipitate: true,
        precipitateHex: '#1e40af',
        precipitateLabel: 'Mendakan biru tua',
        canHeat: false,
        isConfirmatoryMatch: true,
      };
    }
    if (cationId === 'fe2') {
      return {
        observationText: 'Mendakan BIRU MUDA terbentuk.',
        inferenceHint:
          'Lensa Kimia KSSM: K₄Fe(CN)₆ dengan Fe²⁺ menghasilkan mendakan biru muda (bukan biru tua seperti Fe³⁺).',
        liquidHex: '#bae6fd',
        liquidOpacity: 0.35,
        hasPrecipitate: true,
        precipitateHex: '#60a5fa',
        precipitateLabel: 'Mendakan biru muda',
        canHeat: false,
      };
    }
    if (cationId === 'cu2') {
      return {
        observationText: 'Mendakan perang kemerahan kuprum(II) heksasianoferat(II) terbentuk.',
        inferenceHint: 'Bukan mendakan biru tua Fe³⁺.',
        liquidHex: '#bae6fd',
        liquidOpacity: 0.25,
        hasPrecipitate: true,
        precipitateHex: '#9a3412',
        precipitateLabel: 'Mendakan perang kemerahan',
        canHeat: false,
      };
    }
    return {
      observationText: 'Tiada mendakan biru tua terbentuk.',
      inferenceHint: 'Bukan ion Fe³⁺.',
      liquidHex: baseLiquidHex,
      liquidOpacity: baseOpacity,
      hasPrecipitate: false,
      precipitateHex: '#ffffff',
      canHeat: false,
    };
  }

  // 7. KALIUM TIOSIANAT, KSCN — Rajah 6.59 & Eksperimen 6.11
  if (cationId === 'fe3') {
    return {
      observationText: 'Larutan berwarna MERAH DARAH terbentuk serta-merta.',
      inferenceHint: 'Kehadiran ion ferum(III), Fe³⁺ disahkan!',
      liquidHex: '#991b1b',
      liquidOpacity: 0.78,
      hasPrecipitate: false,
      precipitateHex: '#ffffff',
      canHeat: false,
      isConfirmatoryMatch: true,
    };
  }

  return {
    observationText: 'Tiada perubahan kepada warna merah darah.',
    inferenceHint: 'Bukan ion Fe³⁺.',
    liquidHex: baseLiquidHex,
    liquidOpacity: baseOpacity,
    hasPrecipitate: false,
    precipitateHex: '#ffffff',
    canHeat: false,
  };
}
