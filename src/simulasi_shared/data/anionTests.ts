export type AnionId = 'co3' | 'cl' | 'so4' | 'no3';

export type AnionTestId =
  | 'heat-limewater'
  | 'heat-splint-litmus'
  | 'test-co3'
  | 'test-cl'
  | 'test-so4'
  | 'test-no3';

export type ReagentStage = 'step1' | 'step2';

export interface AnionDef {
  id: AnionId;
  formula: string;
  name: string;
  summaryRule: string;
}

export interface AnionSaltSample {
  id: string;
  anionId: AnionId;
  formula: string;
  name: string;
  solidColorLabel: string;
  solidHex: string;
  aqueousHex: string;
  aqueousOpacity: number;
  isSolubleInWater: boolean;
  // Kesan pemanasan pepejal garam (Eksperimen 6.7, 6.8 & m.s. 196)
  decomposesOnHeat: boolean;
  hotResidueLabel: string;
  hotResidueHex: string;
  coldResidueLabel: string;
  coldResidueHex: string;
  releasesCO2OnHeat: boolean;
  releasesNO2OnHeat: boolean;
  releasesO2OnHeat: boolean;
  releasesAcidicSO2OnHeat?: boolean;
  heatObservationNote: string;
}

export interface AnionTestDef {
  id: AnionTestId;
  group: 'heating' | 'reagent';
  shortLabel: string;
  fullName: string;
  step1Label: string;
  step2Label?: string;
  accentHex: string;
  hint: string;
}

export interface AnionVisualResult {
  mode: 'heating-limewater' | 'heating-splint' | 'co3-limewater' | 'tube-precipitate' | 'brown-ring';
  observationText: string;
  inferenceHint: string;
  // Visual states
  hasEffervescence?: boolean;
  limewaterCloudy?: boolean;
  brownGas?: boolean;
  litmusTurnsRed?: boolean;
  splintRelights?: boolean;
  hasPrecipitate?: boolean;
  precipitateHex?: string;
  precipitateLabel?: string;
  hasBrownRing?: boolean;
  liquidHex: string;
  liquidOpacity: number;
  residueHex?: string;
  residueHotLabel?: string;
  residueColdLabel?: string;
}

export const ANION_LIST: AnionDef[] = [
  {
    id: 'co3',
    formula: 'CO₃²⁻',
    name: 'Ion karbonat',
    summaryRule: 'Pembuakan gas CO₂ dengan asid cair (mengeruhkan air kapur); kebanyakan garam terurai bila dipanaskan kecuali Na₂CO₃ & K₂CO₃.',
  },
  {
    id: 'cl',
    formula: 'Cl⁻',
    name: 'Ion klorida',
    summaryRule: 'Tiada gas bila dipanaskan; membentuk mendakan putih AgCl dengan HNO₃ cair + AgNO₃.',
  },
  {
    id: 'so4',
    formula: 'SO₄²⁻',
    name: 'Ion sulfat',
    summaryRule: 'Membentuk mendakan putih BaSO₄ dengan HCl cair + BaCl₂; kebanyakan stabil kecuali FeSO₄/ZnSO₄ bila dipanaskan.',
  },
  {
    id: 'no3',
    formula: 'NO₃⁻',
    name: 'Ion nitrat',
    summaryRule: 'Membebaskan O₂ (± gas perang NO₂) bila dipanaskan; membentuk Cincin Perang dalam ujian H₂SO₄ cair + FeSO₄ + H₂SO₄ pekat.',
  },
];

export const ANION_SALT_SAMPLES: AnionSaltSample[] = [
  {
    id: 'znco3',
    anionId: 'co3',
    formula: 'ZnCO₃',
    name: 'Zink karbonat',
    solidColorLabel: 'Putih',
    solidHex: '#f8fafc',
    aqueousHex: '#e0f2fe',
    aqueousOpacity: 0.25,
    isSolubleInWater: false,
    decomposesOnHeat: true,
    hotResidueLabel: 'Kuning (semasa panas)',
    hotResidueHex: '#fde047',
    coldResidueLabel: 'Putih (apabila sejuk)',
    coldResidueHex: '#f8fafc',
    releasesCO2OnHeat: true,
    releasesNO2OnHeat: false,
    releasesO2OnHeat: false,
    heatObservationNote:
      'Terurai membebaskan gas CO₂ (air kapur keruh); baki ZnO kuning semasa panas dan putih apabila sejuk.',
  },
  {
    id: 'cuco3',
    anionId: 'co3',
    formula: 'CuCO₃',
    name: 'Kuprum(II) karbonat',
    solidColorLabel: 'Hijau',
    solidHex: '#16a34a',
    aqueousHex: '#bae6fd',
    aqueousOpacity: 0.35,
    isSolubleInWater: false,
    decomposesOnHeat: true,
    hotResidueLabel: 'Hitam (semasa panas)',
    hotResidueHex: '#1e293b',
    coldResidueLabel: 'Hitam (apabila sejuk)',
    coldResidueHex: '#1e293b',
    releasesCO2OnHeat: true,
    releasesNO2OnHeat: false,
    releasesO2OnHeat: false,
    heatObservationNote:
      'Pepejal hijau terurai kepada baki hitam CuO dan membebaskan gas CO₂ yang mengeruhkan air kapur.',
  },
  {
    id: 'na2co3',
    anionId: 'co3',
    formula: 'Na₂CO₃',
    name: 'Natrium karbonat',
    solidColorLabel: 'Putih',
    solidHex: '#f8fafc',
    aqueousHex: '#e0f2fe',
    aqueousOpacity: 0.25,
    isSolubleInWater: true,
    decomposesOnHeat: false,
    hotResidueLabel: 'Putih (tidak terurai)',
    hotResidueHex: '#f8fafc',
    coldResidueLabel: 'Putih (tidak terurai)',
    coldResidueHex: '#f8fafc',
    releasesCO2OnHeat: false,
    releasesNO2OnHeat: false,
    releasesO2OnHeat: false,
    heatObservationNote:
      'Pengecualian KSSM: Na₂CO₃ tidak terurai oleh haba (tiada gas). Uji dengan asid cair untuk mengesan CO₃²⁻!',
  },
  {
    id: 'pbno3',
    anionId: 'no3',
    formula: 'Pb(NO₃)₂',
    name: 'Plumbum(II) nitrat',
    solidColorLabel: 'Putih',
    solidHex: '#f8fafc',
    aqueousHex: '#e0f2fe',
    aqueousOpacity: 0.26,
    isSolubleInWater: true,
    decomposesOnHeat: true,
    hotResidueLabel: 'Perang (semasa panas)',
    hotResidueHex: '#b45309',
    coldResidueLabel: 'Kuning (apabila sejuk)',
    coldResidueHex: '#facc15',
    releasesCO2OnHeat: false,
    releasesNO2OnHeat: true,
    releasesO2OnHeat: true,
    heatObservationNote:
      'Terurai membebaskan gas perang NO₂ (litmus biru → merah) dan gas O₂ (kayu uji berbara menyala); baki PbO perang panas / kuning sejuk.',
  },
  {
    id: 'cuno3',
    anionId: 'no3',
    formula: 'Cu(NO₃)₂',
    name: 'Kuprum(II) nitrat',
    solidColorLabel: 'Biru',
    solidHex: '#2563eb',
    aqueousHex: '#60a5fa',
    aqueousOpacity: 0.42,
    isSolubleInWater: true,
    decomposesOnHeat: true,
    hotResidueLabel: 'Hitam (semasa panas)',
    hotResidueHex: '#1e293b',
    coldResidueLabel: 'Hitam (apabila sejuk)',
    coldResidueHex: '#1e293b',
    releasesCO2OnHeat: false,
    releasesNO2OnHeat: true,
    releasesO2OnHeat: true,
    heatObservationNote:
      'Hablur biru terurai kepada baki hitam CuO, membebaskan gas perang NO₂ dan gas O₂.',
  },
  {
    id: 'nano3',
    anionId: 'no3',
    formula: 'NaNO₃',
    name: 'Natrium nitrat',
    solidColorLabel: 'Putih',
    solidHex: '#f8fafc',
    aqueousHex: '#e0f2fe',
    aqueousOpacity: 0.26,
    isSolubleInWater: true,
    decomposesOnHeat: true,
    hotResidueLabel: 'Putih/kuning cair (NaNO₂)',
    hotResidueHex: '#fef9c3',
    coldResidueLabel: 'Putih (NaNO₂)',
    coldResidueHex: '#f8fafc',
    releasesCO2OnHeat: false,
    releasesNO2OnHeat: false,
    releasesO2OnHeat: true,
    heatObservationNote:
      'Pengecualian garam nitrat K/Na: NaNO₃ membebaskan gas oksigen (menyalakan kayu uji berbara) TANPA gas perang NO₂! Sahkan dengan ujian cincin perang.',
  },
  {
    id: 'nacl',
    anionId: 'cl',
    formula: 'NaCl',
    name: 'Natrium klorida',
    solidColorLabel: 'Putih',
    solidHex: '#f8fafc',
    aqueousHex: '#e0f2fe',
    aqueousOpacity: 0.26,
    isSolubleInWater: true,
    decomposesOnHeat: false,
    hotResidueLabel: 'Putih (tidak terurai)',
    hotResidueHex: '#f8fafc',
    coldResidueLabel: 'Putih (tidak terurai)',
    coldResidueHex: '#f8fafc',
    releasesCO2OnHeat: false,
    releasesNO2OnHeat: false,
    releasesO2OnHeat: false,
    heatObservationNote:
      'Garam klorida stabil terhadap haba; tiada gas dibebaskan. Jalankan ujian larutan dengan HNO₃ cair + AgNO₃.',
  },
  {
    id: 'mgcl2',
    anionId: 'cl',
    formula: 'MgCl₂',
    name: 'Magnesium klorida',
    solidColorLabel: 'Putih',
    solidHex: '#f8fafc',
    aqueousHex: '#e0f2fe',
    aqueousOpacity: 0.26,
    isSolubleInWater: true,
    decomposesOnHeat: false,
    hotResidueLabel: 'Putih (tiada gas CO₂/NO₂)',
    hotResidueHex: '#f8fafc',
    coldResidueLabel: 'Putih',
    coldResidueHex: '#f8fafc',
    releasesCO2OnHeat: false,
    releasesNO2OnHeat: false,
    releasesO2OnHeat: false,
    heatObservationNote:
      'Tiada gas CO₂, NO₂ atau O₂ dibebaskan apabila dipanaskan. Sahkan ion Cl⁻ dengan HNO₃ cair + AgNO₃.',
  },
  {
    id: 'na2so4',
    anionId: 'so4',
    formula: 'Na₂SO₄',
    name: 'Natrium sulfat',
    solidColorLabel: 'Putih',
    solidHex: '#f8fafc',
    aqueousHex: '#e0f2fe',
    aqueousOpacity: 0.26,
    isSolubleInWater: true,
    decomposesOnHeat: false,
    hotResidueLabel: 'Putih (tidak terurai)',
    hotResidueHex: '#f8fafc',
    coldResidueLabel: 'Putih (tidak terurai)',
    coldResidueHex: '#f8fafc',
    releasesCO2OnHeat: false,
    releasesNO2OnHeat: false,
    releasesO2OnHeat: false,
    heatObservationNote:
      'Natrium sulfat stabil terhadap haba; tiada gas dibebaskan. Sahkan ion SO₄²⁻ dengan HCl cair + BaCl₂.',
  },
  {
    id: 'feso4',
    anionId: 'so4',
    formula: 'FeSO₄',
    name: 'Ferum(II) sulfat',
    solidColorLabel: 'Hijau muda',
    solidHex: '#4ade80',
    aqueousHex: '#86efac',
    aqueousOpacity: 0.38,
    isSolubleInWater: true,
    decomposesOnHeat: true,
    hotResidueLabel: 'Perang kemerahan (Fe₂O₃)',
    hotResidueHex: '#9a3412',
    coldResidueLabel: 'Perang kemerahan (Fe₂O₃)',
    coldResidueHex: '#9a3412',
    releasesCO2OnHeat: false,
    releasesNO2OnHeat: false,
    releasesO2OnHeat: false,
    releasesAcidicSO2OnHeat: true,
    heatObservationNote:
      'Buku Teks m.s. 196: FeSO₄ terurai membebaskan gas SO₂ & SO₃ tidak berwarna bersifat asid (litmus biru → merah, air kapur kekal jernih) dengan baki perang Fe₂O₃. Sahkan SO₄²⁻ dengan HCl + BaCl₂.',
  },
];

export const ANION_TEST_DEFS: AnionTestDef[] = [
  {
    id: 'heat-limewater',
    group: 'heating',
    shortLabel: 'Panaskan + Air Kapur',
    fullName: 'Pemanasan Pepejal + Air Kapur (Rajah 6.46)',
    step1Label: 'Panaskan pepejal kuat + alir gas ke air kapur',
    accentHex: '#ea580c',
    hint: 'Mengesan gas CO₂ daripada penguraian garam karbonat',
  },
  {
    id: 'heat-splint-litmus',
    group: 'heating',
    shortLabel: 'Panaskan + Litmus & Kayu Uji',
    fullName: 'Pemanasan Pepejal + Litmus Biru & Kayu Uji Berbara (Rajah 6.47)',
    step1Label: 'Panaskan pepejal + uji litmus biru lembap & kayu uji berbara',
    accentHex: '#dc2626',
    hint: 'Mengesan gas perang NO₂ & gas O₂ daripada garam nitrat',
  },
  {
    id: 'test-co3',
    group: 'reagent',
    shortLabel: 'Ujian CO₃²⁻ (+ Asid Cair)',
    fullName: 'Tambah Asid Cair + Air Kapur (Rajah 6.53)',
    step1Label: '+ Asid HCl cair & salur ke air kapur',
    accentHex: '#0284c7',
    hint: 'Mengesan pembuakan gas CO₂ bagi garam karbonat',
  },
  {
    id: 'test-cl',
    group: 'reagent',
    shortLabel: 'Ujian Cl⁻ (HNO₃ + AgNO₃)',
    fullName: 'Ujian Ion Klorida (Jadual 6.16 II)',
    step1Label: '+ HNO₃ cair berlebihan',
    step2Label: '+ Larutan AgNO₃(ak)',
    accentHex: '#7c3aed',
    hint: 'Mendakan putih AgCl terbentuk jika Cl⁻ hadir',
  },
  {
    id: 'test-so4',
    group: 'reagent',
    shortLabel: 'Ujian SO₄²⁻ (HCl + BaCl₂)',
    fullName: 'Ujian Ion Sulfat (Jadual 6.16 III)',
    step1Label: '+ HCl cair berlebihan',
    step2Label: '+ Larutan BaCl₂(ak)',
    accentHex: '#0d9488',
    hint: 'Mendakan putih BaSO₄ terbentuk jika SO₄²⁻ hadir',
  },
  {
    id: 'test-no3',
    group: 'reagent',
    shortLabel: 'Ujian NO₃⁻ (Cincin Perang)',
    fullName: 'Ujian Cincin Perang (Rajah 6.54)',
    step1Label: '+ H₂SO₄ cair + FeSO₄(ak)',
    step2Label: '+ H₂SO₄ pekat (condong)',
    accentHex: '#92400e',
    hint: 'Cincin perang terbentuk jika ion NO₃⁻ hadir',
  },
];

export function evaluateAnionTest(
  sampleId: string,
  testId: AnionTestId,
  stage: ReagentStage
): AnionVisualResult {
  const sample =
    ANION_SALT_SAMPLES.find((s) => s.id === sampleId) ?? ANION_SALT_SAMPLES[0];

  // KAEDAH A1: Pemanasan pepejal garam + salur penghantar ke air kapur (Rajah 6.46)
  if (testId === 'heat-limewater') {
    if (sample.releasesCO2OnHeat) {
      return {
        mode: 'heating-limewater',
        observationText: `Gas tidak berwarna terbebas dan mengeruhkan air kapur. Baki pemanasan: ${sample.hotResidueLabel.toLowerCase()} → ${sample.coldResidueLabel.toLowerCase()}.`,
        inferenceHint:
          'Gas karbon dioksida (CO₂) terbebas! Garam ini berkemungkinan besar mengandungi ion karbonat, CO₃²⁻.',
        hasEffervescence: true,
        limewaterCloudy: true,
        liquidHex: '#e2e8f0',
        liquidOpacity: 0.85,
        residueHex: sample.hotResidueHex,
        residueHotLabel: sample.hotResidueLabel,
        residueColdLabel: sample.coldResidueLabel,
      };
    }

    return {
      mode: 'heating-limewater',
      observationText: sample.decomposesOnHeat
        ? `Air kapur kekal JERNIH (tiada CO₂). Baki pemanasan: ${sample.hotResidueLabel.toLowerCase()} → ${sample.coldResidueLabel.toLowerCase()}.`
        : 'Tiada perubahan pada air kapur (kekal jernih); pepejal tidak terurai oleh haba.',
      inferenceHint: sample.heatObservationNote,
      hasEffervescence: false,
      limewaterCloudy: false,
      liquidHex: '#e0f2fe',
      liquidOpacity: 0.35,
      residueHex: sample.hotResidueHex,
      residueHotLabel: sample.hotResidueLabel,
      residueColdLabel: sample.coldResidueLabel,
    };
  }

  // KAEDAH A2: Pemanasan pepejal garam + litmus biru lembap & kayu uji berbara (Rajah 6.47)
  if (testId === 'heat-splint-litmus') {
    const litmusRed = sample.releasesNO2OnHeat || Boolean(sample.releasesAcidicSO2OnHeat);
    if (sample.releasesNO2OnHeat && sample.releasesO2OnHeat) {
      return {
        mode: 'heating-splint',
        observationText: `Gas perang (NO₂) terbebas dan menukarkan litmus biru lembap kepada merah. Kayu uji berbara menyala semula (gas O₂). Baki: ${sample.hotResidueLabel.toLowerCase()} → ${sample.coldResidueLabel.toLowerCase()}.`,
        inferenceHint:
          'Gas nitrogen dioksida (NO₂) dan oksigen (O₂) terhasil — bukti kukuh kehadiran ion nitrat, NO₃⁻!',
        brownGas: true,
        litmusTurnsRed: true,
        splintRelights: true,
        liquidHex: sample.aqueousHex,
        liquidOpacity: 0.3,
        residueHex: sample.hotResidueHex,
        residueHotLabel: sample.hotResidueLabel,
        residueColdLabel: sample.coldResidueLabel,
      };
    }

    if (sample.releasesO2OnHeat) {
      return {
        mode: 'heating-splint',
        observationText:
          'Tiada gas perang terbebas; kertas litmus biru lembap kekal biru. Namun kayu uji berbara MENYALA semula (gas O₂ hadir)!',
        inferenceHint:
          'Gas oksigen sahaja dibebaskan (khas bagi NaNO₃/KNO₃). Cuci tabung & jalankan Ujian Cincin Perang untuk mengesahkan ion NO₃⁻.',
        brownGas: false,
        litmusTurnsRed: false,
        splintRelights: true,
        liquidHex: sample.aqueousHex,
        liquidOpacity: 0.3,
        residueHex: sample.hotResidueHex,
        residueHotLabel: sample.hotResidueLabel,
        residueColdLabel: sample.coldResidueLabel,
      };
    }

    if (sample.releasesAcidicSO2OnHeat) {
      return {
        mode: 'heating-splint',
        observationText:
          'Tiada gas perang; gas tidak berwarna bersifat asid menukarkan litmus biru lembap kepada merah. Kayu uji berbara tidak menyala. Baki perang Fe₂O₃ terbentuk.',
        inferenceHint: sample.heatObservationNote,
        brownGas: false,
        litmusTurnsRed: true,
        splintRelights: false,
        liquidHex: sample.aqueousHex,
        liquidOpacity: 0.3,
        residueHex: sample.hotResidueHex,
        residueHotLabel: sample.hotResidueLabel,
        residueColdLabel: sample.coldResidueLabel,
      };
    }

    return {
      mode: 'heating-splint',
      observationText: sample.releasesCO2OnHeat
        ? 'Gas tidak berwarna terbebas menukarkan litmus biru lembap kepada merah pudar (asid lemah CO₂); kayu uji berbara terpadam.'
        : 'Tiada gas perang NO₂ dan kayu uji berbara tidak menyala.',
      inferenceHint: sample.releasesCO2OnHeat
        ? 'Uji gas tersebut dengan Air Kapur (Rajah 6.46) atau Asid Cair (Rajah 6.53) untuk mengesahkan CO₂!'
        : sample.heatObservationNote,
      brownGas: false,
      litmusTurnsRed: litmusRed || sample.releasesCO2OnHeat,
      splintRelights: false,
      liquidHex: sample.aqueousHex,
      liquidOpacity: 0.3,
      residueHex: sample.hotResidueHex,
      residueHotLabel: sample.hotResidueLabel,
      residueColdLabel: sample.coldResidueLabel,
    };
  }

  // KAEDAH B1: Ujian ion karbonat (+ Asid cair & Air kapur — Rajah 6.53)
  if (testId === 'test-co3') {
    if (sample.anionId === 'co3') {
      return {
        mode: 'co3-limewater',
        observationText:
          'Pembuakan (gelembung gas) berlaku serta-merta! Gas yang terbebas mengeruhkan air kapur.',
        inferenceHint:
          'Persamaan ion: 2H⁺(ak) + CO₃²⁻(ak) → CO₂(g) + H₂O(ce). Ion karbonat, CO₃²⁻ disahkan hadir!',
        hasEffervescence: true,
        limewaterCloudy: true,
        liquidHex: sample.id === 'cuco3' ? '#3b82f6' : '#e0f2fe',
        liquidOpacity: sample.id === 'cuco3' ? 0.42 : 0.3,
      };
    }
    return {
      mode: 'co3-limewater',
      observationText:
        'Tiada pembuakan berlaku; air kapur kekal jernih.',
      inferenceHint: 'Tiada gas karbon dioksida terbebas. Bukan ion CO₃²⁻.',
      hasEffervescence: false,
      limewaterCloudy: false,
      liquidHex: sample.aqueousHex,
      liquidOpacity: sample.aqueousOpacity,
    };
  }

  // KAEDAH B2: Ujian ion klorida (+ HNO3 cair berlebihan + AgNO3 — Jadual 6.16 II)
  if (testId === 'test-cl') {
    if (stage === 'step1') {
      if (sample.anionId === 'co3') {
        return {
          mode: 'tube-precipitate',
          observationText:
            'Pembuakan gas (CO₂) berlaku apabila asid nitrik cair ditambahkan! (Ion CO₃²⁻ bertindak balas dengan asid).',
          inferenceHint:
            'Pembuakan ini sudah menandakan kehadiran ion CO₃²⁻. Teruskan tambah AgNO₃ untuk memastikan tiada Cl⁻.',
          hasEffervescence: true,
          hasPrecipitate: false,
          liquidHex: sample.id === 'cuco3' ? '#3b82f6' : '#e0f2fe',
          liquidOpacity: sample.id === 'cuco3' ? 0.42 : 0.3,
        };
      }
      return {
        mode: 'tube-precipitate',
        observationText:
          'HNO₃ cair berlebihan ditambah: larutan kekal jernih, tiada pembuakan (menyingkirkan gangguan ion CO₃²⁻).',
        inferenceHint: 'Sekarang klik "+ Larutan AgNO₃(ak)" untuk menguji kehadiran ion Cl⁻.',
        hasEffervescence: false,
        hasPrecipitate: false,
        liquidHex: sample.aqueousHex,
        liquidOpacity: sample.aqueousOpacity,
      };
    }

    // step2: AgNO3 added after excess HNO3
    if (sample.anionId === 'cl') {
      return {
        mode: 'tube-precipitate',
        observationText: 'Mendakan PUTIH (argentum klorida, AgCl) terbentuk serta-merta!',
        inferenceHint:
          'Persamaan ion: Ag⁺(ak) + Cl⁻(ak) → AgCl(p). Ion klorida, Cl⁻ disahkan hadir!',
        hasPrecipitate: true,
        precipitateHex: '#f8fafc',
        precipitateLabel: 'Mendakan putih (AgCl)',
        liquidHex: '#e0f2fe',
        liquidOpacity: 0.28,
      };
    }

    return {
      mode: 'tube-precipitate',
      observationText: 'Tiada mendakan putih terbentuk apabila AgNO₃ ditambahkan.',
      inferenceHint: 'Bukan ion klorida, Cl⁻.',
      hasPrecipitate: false,
      liquidHex: sample.id === 'cuco3' ? '#3b82f6' : sample.aqueousHex,
      liquidOpacity: sample.id === 'cuco3' ? 0.42 : sample.aqueousOpacity,
    };
  }

  // KAEDAH B3: Ujian ion sulfat (+ HCl cair berlebihan + BaCl2 — Jadual 6.16 III)
  if (testId === 'test-so4') {
    if (stage === 'step1') {
      if (sample.anionId === 'co3') {
        return {
          mode: 'tube-precipitate',
          observationText:
            'Pembuakan gas (CO₂) berlaku apabila asid HCl cair ditambahkan!',
          inferenceHint:
            'Ion CO₃²⁻ bertindak balas dengan asid. Teruskan tambah BaCl₂ untuk menguji SO₄²⁻.',
          hasEffervescence: true,
          hasPrecipitate: false,
          liquidHex: sample.id === 'cuco3' ? '#16a34a' : '#e0f2fe',
          liquidOpacity: sample.id === 'cuco3' ? 0.42 : 0.3,
        };
      }
      return {
        mode: 'tube-precipitate',
        observationText:
          'HCl cair berlebihan ditambah: tiada pembuakan berlaku.',
        inferenceHint: 'Sekarang klik "+ Larutan BaCl₂(ak)" untuk menguji kehadiran ion SO₄²⁻.',
        hasEffervescence: false,
        hasPrecipitate: false,
        liquidHex: sample.aqueousHex,
        liquidOpacity: sample.aqueousOpacity,
      };
    }

    // step2: BaCl2 added
    if (sample.anionId === 'so4') {
      return {
        mode: 'tube-precipitate',
        observationText: 'Mendakan PUTIH (barium sulfat, BaSO₄) terbentuk serta-merta!',
        inferenceHint:
          'Persamaan ion: Ba²⁺(ak) + SO₄²⁻(ak) → BaSO₄(p). Ion sulfat, SO₄²⁻ disahkan hadir!',
        hasPrecipitate: true,
        precipitateHex: '#f8fafc',
        precipitateLabel: 'Mendakan putih (BaSO₄)',
        liquidHex: sample.aqueousHex,
        liquidOpacity: sample.aqueousOpacity,
      };
    }

    return {
      mode: 'tube-precipitate',
      observationText: 'Tiada mendakan putih terbentuk apabila BaCl₂ ditambahkan.',
      inferenceHint: 'Bukan ion sulfat, SO₄²⁻.',
      hasPrecipitate: false,
      liquidHex: sample.aqueousHex,
      liquidOpacity: sample.aqueousOpacity,
    };
  }

  // KAEDAH B4: Ujian ion nitrat — Ujian Cincin Perang (Rajah 6.54 & Jadual 6.16 IV)
  if (stage === 'step1') {
    if (sample.anionId === 'co3') {
      return {
        mode: 'tube-precipitate',
        observationText:
          'Pembuakan gas (CO₂) berlaku apabila H₂SO₄ cair ditambahkan, kemudian bercampur dengan FeSO₄ hijau muda.',
        inferenceHint: 'Pembuakan dengan asid menandakan CO₃²⁻; teruskan tambah H₂SO₄ pekat secara condong untuk menyemak NO₃⁻.',
        hasEffervescence: true,
        hasPrecipitate: false,
        liquidHex: '#86efac',
        liquidOpacity: 0.42,
      };
    }
    return {
      mode: 'tube-precipitate',
      observationText:
        'H₂SO₄ cair dan larutan FeSO₄(ak) digoncang sekata membentuk campuran hijau pucat.',
      inferenceHint:
        'Condongkan tabung uji dan klik "+ H₂SO₄ pekat (condong)" (Rajah 6.54) untuk memerhati sama ada cincin perang terbentuk.',
      hasPrecipitate: false,
      liquidHex: '#86efac',
      liquidOpacity: 0.42,
    };
  }

  // step2: concentrated H2SO4 down tilted tube wall (Rajah 6.54)
  if (sample.anionId === 'no3') {
    return {
      mode: 'brown-ring',
      observationText:
        'CINCIN PERANG terbentuk pada sempadan antara dua lapisan cecair!',
      inferenceHint:
        'Lensa Kimia KSSM: Kompleks nitrosilferum(II) sulfat, FeSO₄·NO menghasilkan cincin perang. Ion nitrat, NO₃⁻ disahkan hadir!',
      hasBrownRing: true,
      liquidHex: '#86efac',
      liquidOpacity: 0.42,
    };
  }

  return {
    mode: 'brown-ring',
    observationText:
      'Tiada cincin perang terbentuk antara dua lapisan asid sulfurik pekat dan campuran akueus.',
    inferenceHint: 'Bukan ion nitrat, NO₃⁻.',
    hasBrownRing: false,
    liquidHex: '#86efac',
    liquidOpacity: 0.4,
  };
}
