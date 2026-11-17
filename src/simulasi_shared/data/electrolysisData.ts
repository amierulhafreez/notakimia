export type ElectrolyteId = 'cuso4' | 'nacl' | 'h2so4' | 'pbbr2';
export type ElectrodeType = 'karbon' | 'kuprum';

export interface ElectrolyteSpec {
  id: ElectrolyteId;
  name: string;
  formula: string;
  shortLabel: string;
  stateKind: 'aqueous' | 'molten';
  baseColorHex: string;
  defaultConcentration: number;
  note: string;
}

export const ELECTROLYTE_SPECS: ElectrolyteSpec[] = [
  {
    id: 'cuso4',
    name: 'Larutan Kuprum(II) sulfat',
    formula: 'CuSO₄(ak)',
    shortLabel: 'CuSO₄',
    stateKind: 'aqueous',
    baseColorHex: '#0284c7',
    defaultConcentration: 0.5,
    note: 'Mengandungi ion Cu²⁺, H⁺, SO₄²⁻ dan OH⁻.',
  },
  {
    id: 'nacl',
    name: 'Larutan Natrium klorida',
    formula: 'NaCl(ak)',
    shortLabel: 'NaCl',
    stateKind: 'aqueous',
    baseColorHex: '#0ea5e9',
    defaultConcentration: 0.1,
    note: 'Mengandungi ion halida Cl⁻ bersama Na⁺, H⁺ dan OH⁻.',
  },
  {
    id: 'h2so4',
    name: 'Asid Sulfurik cair',
    formula: 'H₂SO₄(ak)',
    shortLabel: 'H₂SO₄',
    stateKind: 'aqueous',
    baseColorHex: '#38bdf8',
    defaultConcentration: 0.1,
    note: 'Mengandungi ion H⁺, SO₄²⁻ dan OH⁻ (ion SO₄²⁻ tidak dinyahcas).',
  },
  {
    id: 'pbbr2',
    name: 'Leburan Plumbum(II) bromida',
    formula: 'PbBr₂(ce)',
    shortLabel: 'PbBr₂',
    stateKind: 'molten',
    baseColorHex: '#94a3b8',
    defaultConcentration: 1.0,
    note: 'Sebatian ion lebur — hanya mengandungi ion Pb²⁺ dan ion Br⁻ (tiada air).',
  },
];

/**
 * Extended concentration steps from ultra-dilute 0.0001 mol dm⁻³ (matching KSSM Eksperimen 1B)
 * through the 0.001 threshold up to 2.0 mol dm⁻³.
 */
export const CONCENTRATION_STEPS = [
  0.0001, 0.0002, 0.0005, 0.001, 0.005, 0.01, 0.05, 0.1, 0.25, 0.5, 1.0, 1.5, 2.0,
] as const;

export const HALIDE_CONCENTRATION_THRESHOLD = 0.001;

export function formatConcentration(conc: number): string {
  if (conc < 0.001) return conc.toFixed(4);
  if (conc < 0.01) return conc.toFixed(3);
  if (Math.abs(conc * 10 - Math.round(conc * 10)) > 1e-6) return conc.toFixed(2);
  return conc.toFixed(1);
}

export interface IonVisualCount {
  symbol: string;
  charge: string;
  kind: 'cation' | 'anion';
  color: string;
  textColor: string;
  count: number;
  isDischarged: boolean;
}

export interface PredictionQuestion {
  target: 'Anod (+)' | 'Katod (−)';
  prompt: string;
  options: Array<{ id: string; label: string }>;
  correctOptionId: string;
  explanationOnWrong: string;
  explanationOnRight: string;
}

export interface ElectrolysisOutcome {
  electrolyte: ElectrolyteSpec;
  concentration: number;
  electrodeType: ElectrodeType;
  isMolten: boolean;
  isMoltenHeated: boolean;
  canConduct: boolean;
  isConcentratedHalide: boolean;
  presentCations: string[];
  presentAnions: string[];
  anode: {
    selectedSpecies: string;
    factorTag:
      | 'Nilai E⁰ (Faktor 1)'
      | 'Kepekatan (Faktor 2)'
      | 'Elektrod Aktif (Faktor 3)'
      | 'Sebatian Lebur'
      | 'Tiada Arus (Pepejal)';
    reason: string;
    halfEquation: string;
    productName: string;
    productVisual: 'gas_o2' | 'gas_cl2' | 'gas_br2' | 'copper_dissolve' | 'none';
    observationIdle: string;
    observationActive: string;
  };
  cathode: {
    selectedSpecies: string;
    factorTag: 'Nilai E⁰' | 'Sebatian Lebur' | 'Tiada Arus (Pepejal)';
    reason: string;
    halfEquation: string;
    productName: string;
    productVisual: 'deposit_cu' | 'deposit_pb' | 'gas_h2' | 'none';
    observationIdle: string;
    observationActive: string;
  };
  overallEquation: string;
  solutionBehaviorText: string;
  solutionMode: 'fades_blue' | 'constant_blue' | 'clear_unchanged' | 'tints_blue' | 'molten_liquid' | 'solid_salt';
  anodeZoomIons: IonVisualCount[];
  cathodeZoomIons: IonVisualCount[];
  ionCompositionLabel: string;
  quizQuestions: PredictionQuestion[];
}

export function resolveElectrolysisOutcome(
  electrolyteId: ElectrolyteId,
  concentration: number,
  electrodeType: ElectrodeType,
  isMoltenHeated = true
): ElectrolysisOutcome {
  const electrolyte =
    ELECTROLYTE_SPECS.find((e) => e.id === electrolyteId) ?? ELECTROLYTE_SPECS[0];

  // Molten compound: PbBr2 (Aktiviti Makmal 1E, KSSM Tingkatan 5 m.s. 34-36)
  if (electrolyteId === 'pbbr2') {
    const presentCations = ['Pb²⁺'];
    const presentAnions = ['Br⁻'];

    const anodeZoomIons: IonVisualCount[] = [
      {
        symbol: 'Br⁻',
        charge: '−',
        kind: 'anion',
        color: '#b45309',
        textColor: '#fef3c7',
        count: 7,
        isDischarged: isMoltenHeated,
      },
    ];

    const cathodeZoomIons: IonVisualCount[] = [
      {
        symbol: 'Pb²⁺',
        charge: '2+',
        kind: 'cation',
        color: '#94a3b8',
        textColor: '#0f172a',
        count: 5,
        isDischarged: isMoltenHeated,
      },
    ];

    if (!isMoltenHeated) {
      return {
        electrolyte,
        concentration: 1.0,
        electrodeType: 'karbon',
        isMolten: true,
        isMoltenHeated: false,
        canConduct: false,
        isConcentratedHalide: false,
        presentCations,
        presentAnions,
        anode: {
          selectedSpecies: 'Tiada nyahcas',
          factorTag: 'Tiada Arus (Pepejal)',
          reason:
            'Dalam keadaan pepejal, ion Pb²⁺ dan ion Br⁻ terikat dalam kekisi ion tetap dan tidak bebas bergerak untuk mengalirkan arus.',
          halfEquation: 'Tiada tindak balas',
          productName: 'Tiada hasil',
          productVisual: 'none',
          observationIdle: 'Serbuk putih PbBr₂ dalam mangkuk pijar — penunu Bunsen belum dinyalakan.',
          observationActive: 'Tiada perubahan — jarum ammeter tidak terpesong (litar tidak lengkap dalam pepejal).',
        },
        cathode: {
          selectedSpecies: 'Tiada nyahcas',
          factorTag: 'Tiada Arus (Pepejal)',
          reason: 'Ion Pb²⁺ tidak bebas bergerak ke katod selagi pepejal PbBr₂ belum dileburkan.',
          halfEquation: 'Tiada tindak balas',
          productName: 'Tiada hasil',
          productVisual: 'none',
          observationIdle: 'Elektrod karbon bersih; pepejal PbBr₂ belum melebur.',
          observationActive: 'Tiada enapan terbentuk kerana ion terperangkap dalam kekisi pepejal.',
        },
        overallEquation: 'Tiada tindak balas (panaskan PbBr₂ > 373 °C untuk melebur)',
        solutionBehaviorText:
          'Pepejal PbBr₂ TIDAK mengkonduksikan elektrik kerana ion Pb²⁺ dan Br⁻ berada dalam kekisi tetap.',
        solutionMode: 'solid_salt',
        anodeZoomIons,
        cathodeZoomIons,
        ionCompositionLabel: 'Kekisi Pepejal PbBr₂: Ion Pb²⁺ & Br⁻ Tidak Bebas Bergerak',
        quizQuestions: [
          {
            target: 'Anod (+)',
            prompt: 'Jika serbuk PbBr₂ TIDAK dipanaskan (kekal pepejal), adakah arus elektrik mengalir apabila suis dihidupkan?',
            options: [
              { id: 'yes_gas', label: 'Ya, gas perang bromin terus terbebas pada anod' },
              { id: 'no_lattice', label: 'Tidak, kerana ion Pb²⁺ dan Br⁻ tidak bebas bergerak dalam kekisi pepejal' },
            ],
            correctOptionId: 'no_lattice',
            explanationOnWrong:
              'Salah! Sebatian ion dalam keadaan pepejal tidak mengkonduksikan elektrik kerana ion-ionnya terikat dalam struktur kekisi tetap.',
            explanationOnRight:
              'Tepat! Pepejal PbBr₂ perlu dipanaskan sehingga lebur supaya ion Pb²⁺ dan Br⁻ bebas bergerak.',
          },
        ],
      };
    }

    return {
      electrolyte,
      concentration: 1.0,
      electrodeType: 'karbon',
      isMolten: true,
      isMoltenHeated: true,
      canConduct: true,
      isConcentratedHalide: false,
      presentCations,
      presentAnions,
      anode: {
        selectedSpecies: 'Ion Br⁻',
        factorTag: 'Sebatian Lebur',
        reason:
          'Tiada air hadir dalam leburan PbBr₂. Hanya ion bromida (Br⁻) hadir sebagai anion dan dioksidakan membebaskan elektron.',
        halfEquation: '2Br⁻(ce) → Br₂(g) + 2e⁻',
        productName: 'Gas bromin, Br₂',
        productVisual: 'gas_br2',
        observationIdle: 'PbBr₂ telah dileburkan — sedia untuk elektrolisis dengan elektrod karbon.',
        observationActive: 'Gas perang berbau sengit (wap bromin, Br₂) terbebas pada anod.',
      },
      cathode: {
        selectedSpecies: 'Ion Pb²⁺',
        factorTag: 'Sebatian Lebur',
        reason:
          'Hanya ion plumbum(II), Pb²⁺ hadir sebagai kation dalam leburan; ia menerima 2e⁻ untuk membentuk logam plumbum.',
        halfEquation: 'Pb²⁺(ce) + 2e⁻ → Pb(ce)',
        productName: 'Logam plumbum, Pb',
        productVisual: 'deposit_pb',
        observationIdle: 'Suis dimatikan — tiada logam terbentuk pada katod.',
        observationActive: 'Enapan/butiran pepejal kelabu berkilat (logam plumbum, Pb) terbentuk pada katod.',
      },
      overallEquation: 'Pb²⁺(ce) + 2Br⁻(ce) → Pb(ce) + Br₂(g)',
      solutionBehaviorText:
        'Leburan PbBr₂(ce) mengandungi ion Pb²⁺ & Br⁻ yang bebas bergerak (tiada ion H⁺ atau OH⁻).',
      solutionMode: 'molten_liquid',
      anodeZoomIons,
      cathodeZoomIons,
      ionCompositionLabel: 'Komposisi Leburan: Ion Pb²⁺ (2+) & Br⁻ (−) Sahaja (Tiada Air)',
      quizQuestions: [
        {
          target: 'Anod (+)',
          prompt: 'Leburan plumbum(II) bromida, PbBr₂ dielektrolisis menggunakan elektrod karbon. Apakah yang terbentuk di Anod (+)?',
          options: [
            { id: 'br2', label: 'Ion Br⁻ dioksidakan menghasilkan gas perang bromin, Br₂' },
            { id: 'o2', label: 'Ion OH⁻ dinyahcas menghasilkan gas oksigen, O₂' },
          ],
          correctOptionId: 'br2',
          explanationOnWrong:
            'Kurang tepat! Dalam sebatian leburan PbBr₂ tiada air (tiada OH⁻). Hanya ion Br⁻ wujud sebagai anion, lalu membentuk gas perang Br₂.',
          explanationOnRight:
            'Tepat! Dua ion bromida melepaskan dua elektron membentuk molekul bromin (2Br⁻ → Br₂ + 2e⁻).',
        },
        {
          target: 'Katod (−)',
          prompt: 'Apakah hasil yang terbentuk di Katod (−) bagi leburan PbBr₂(ce)?',
          options: [
            { id: 'pb', label: 'Logam plumbum, Pb (enapan kelabu berkilat)' },
            { id: 'h2', label: 'Gas hidrogen, H₂ (gelembung tidak berwarna)' },
          ],
          correctOptionId: 'pb',
          explanationOnWrong:
            'Salah! Tiada ion H⁺ dalam leburan. Hanya ion Pb²⁺ bergerak ke katod dan diturunkan menjadi logam plumbum.',
          explanationOnRight:
            'Tepat! Ion Pb²⁺ menerima 2 elektron membentuk logam plumbum kelabu berkilat (Pb²⁺ + 2e⁻ → Pb).',
        },
      ],
    };
  }

  const isActiveCu = electrodeType === 'kuprum';
  // Rule per user + KSSM: concentration factor (2nd factor) selects halide ONLY above 0.001 M
  const isConcentratedHalide =
    electrolyteId === 'nacl' && concentration > HALIDE_CONCENTRATION_THRESHOLD;

  // Visual ion counts: ensure OH⁻ outnumbers solute at <= 0.001 M, and solute clearly leads above 0.001 M
  let soluteIonCount: number;
  let waterIonCount: number;
  if (concentration <= HALIDE_CONCENTRATION_THRESHOLD) {
    const tDilute = Math.max(
      0,
      Math.min(1, (Math.log10(concentration) - Math.log10(0.0001)) / (Math.log10(0.001) - Math.log10(0.0001)))
    );
    soluteIonCount = Math.round(1 + tDilute * 2); // 1 (0.0001M) -> 3 (0.001M)
    waterIonCount = Math.round(9 - tDilute * 2);  // 9 (0.0001M) -> 7 (0.001M)
  } else {
    const tConc = Math.max(
      0,
      Math.min(1, (Math.log10(concentration) - Math.log10(0.005)) / (Math.log10(2.0) - Math.log10(0.005)))
    );
    soluteIonCount = Math.round(6 + tConc * 6); // 6 (0.005M) -> 12 (2.0M)
    waterIonCount = Math.round(4 - tConc * 2);  // 4 (0.005M) -> 2 (2.0M)
  }

  if (electrolyteId === 'cuso4') {
    const presentCations = ['Cu²⁺', 'H⁺'];
    const presentAnions = ['SO₄²⁻', 'OH⁻'];

    const cathode = {
      selectedSpecies: 'Ion Cu²⁺',
      factorTag: 'Nilai E⁰' as const,
      reason:
        'Nilai E⁰ bagi Cu²⁺ (+0.34 V) lebih positif berbanding ion H⁺ (0.00 V), maka Cu²⁺ lebih mudah diturunkan.',
      halfEquation: 'Cu²⁺(ak) + 2e⁻ → Cu(p)',
      productName: 'Logam kuprum, Cu',
      productVisual: 'deposit_cu' as const,
      observationIdle: 'Suis dimatikan — tiada tindak balas pada katod.',
      observationActive: 'Enapan pepejal perang kemerahan (logam Cu) terbentuk pada katod.',
    };

    const anode = isActiveCu
      ? {
          selectedSpecies: 'Atom Cu (Elektrod aktif)',
          factorTag: 'Elektrod Aktif (Faktor 3)' as const,
          reason:
            'Elektrod kuprum ialah elektrod aktif. Tiada anion dinyahcas; atom Cu pada anod mengion melepaskan elektron membentuk Cu²⁺.',
          halfEquation: 'Cu(p) → Cu²⁺(ak) + 2e⁻',
          productName: 'Ion kuprum(II), Cu²⁺',
          productVisual: 'copper_dissolve' as const,
          observationIdle: 'Suis dimatikan — kepingan kuprum anod masih utuh.',
          observationActive:
            'Elektrod kuprum anod menipis/terkakis; warna biru larutan CuSO₄ kekal sama.',
        }
      : {
          selectedSpecies: 'Ion OH⁻',
          factorTag: 'Nilai E⁰ (Faktor 1)' as const,
          reason:
            'Nilai E⁰ bagi OH⁻ (+0.40 V) kurang positif berbanding ion SO₄²⁻ (+2.01 V), maka ion OH⁻ lebih mudah dioksidakan.',
          halfEquation: '4OH⁻(ak) → O₂(g) + 2H₂O(ce) + 4e⁻',
          productName: 'Gas oksigen, O₂',
          productVisual: 'gas_o2' as const,
          observationIdle: 'Suis dimatikan — tiada gelembung gas pada anod.',
          observationActive:
            'Gelembung gas tidak berwarna (O₂) terbebas; warna biru larutan CuSO₄ beransur pudar.',
        };

    const anodeZoomIons: IonVisualCount[] = [
      {
        symbol: 'OH⁻',
        charge: '−',
        kind: 'anion',
        color: '#f43f5e',
        textColor: '#ffffff',
        count: waterIonCount,
        isDischarged: !isActiveCu,
      },
      {
        symbol: 'SO₄²⁻',
        charge: '2−',
        kind: 'anion',
        color: '#a855f7',
        textColor: '#ffffff',
        count: soluteIonCount,
        isDischarged: false,
      },
    ];

    const cathodeZoomIons: IonVisualCount[] = [
      {
        symbol: 'Cu²⁺',
        charge: '2+',
        kind: 'cation',
        color: '#06b6d4',
        textColor: '#042f2e',
        count: soluteIonCount,
        isDischarged: true,
      },
      {
        symbol: 'H⁺',
        charge: '+',
        kind: 'cation',
        color: '#facc15',
        textColor: '#422006',
        count: waterIonCount,
        isDischarged: false,
      },
    ];

    return {
      electrolyte,
      concentration,
      electrodeType,
      isMolten: false,
      isMoltenHeated: false,
      canConduct: true,
      isConcentratedHalide: false,
      presentCations,
      presentAnions,
      anode,
      cathode,
      overallEquation: isActiveCu
        ? 'Cu(p, anod) + Cu²⁺(ak) → Cu²⁺(ak) + Cu(p, katod)'
        : '2Cu²⁺(ak) + 4OH⁻(ak) → 2Cu(p) + O₂(g) + 2H₂O(ce)',
      solutionBehaviorText: isActiveCu
        ? 'Kepekatan ion Cu²⁺ kekal — warna biru larutan tidak berubah.'
        : 'Ion Cu²⁺ berkurangan kerana terenap sebagai Cu — warna biru larutan beransur pudar.',
      solutionMode: isActiveCu ? 'constant_blue' : 'fades_blue',
      anodeZoomIons,
      cathodeZoomIons,
      ionCompositionLabel: `Nisbah Anion: SO₄²⁻ (${soluteIonCount}) : OH⁻ (${waterIonCount})`,
      quizQuestions: [
        {
          target: 'Anod (+)',
          prompt: isActiveCu
            ? 'Menggunakan elektrod KUPRUM aktif dalam larutan CuSO₄, apakah yang berlaku di Anod (+)?'
            : 'Menggunakan elektrod KARBON dalam larutan CuSO₄, spesies manakah dipilih untuk dioksidakan di Anod (+)?',
          options: [
            { id: 'oh', label: 'Ion OH⁻ dinyahcas menghasilkan gas O₂' },
            { id: 'so4', label: 'Ion SO₄²⁻ dinyahcas menghasilkan gas SO₂' },
            { id: 'cu_anode', label: 'Atom kuprum (Cu) pada anod mengion menjadi Cu²⁺' },
          ],
          correctOptionId: isActiveCu ? 'cu_anode' : 'oh',
          explanationOnWrong: isActiveCu
            ? 'Salah! Apabila elektrod aktif (kuprum) digunakan, tiada anion dinyahcas; atom Cu di anod membebaskan elektron membentuk Cu²⁺.'
            : 'Kurang tepat! Nilai E⁰ bagi ion OH⁻ (+0.40 V) jauh kurang positif berbanding ion SO₄²⁻ (+2.01 V), maka ion OH⁻ dipilih untuk dinyahcas.',
          explanationOnRight: isActiveCu
            ? 'Tepat! Elektrod kuprum ialah elektrod aktif — atom Cu mengion membebaskan 2e⁻ (Cu → Cu²⁺ + 2e⁻).'
            : 'Tepat! Ion OH⁻ dipilih kerana nilai E⁰ (+0.40 V) kurang positif berbanding SO₄²⁻ (+2.01 V).',
        },
        {
          target: 'Katod (−)',
          prompt: 'Di Katod (−) larutan CuSO₄, kation manakah dipilih untuk diturunkan?',
          options: [
            { id: 'cu2', label: 'Ion Cu²⁺ (enapan perang Cu)' },
            { id: 'h', label: 'Ion H⁺ (gelembung gas H₂)' },
          ],
          correctOptionId: 'cu2',
          explanationOnWrong:
            'Kurang tepat! Nilai E⁰ bagi Cu²⁺ (+0.34 V) lebih positif berbanding ion H⁺ (0.00 V), jadi Cu²⁺ dipilih untuk diturunkan.',
          explanationOnRight:
            'Tepat! Ion Cu²⁺ menerima 2e⁻ membentuk enapan pepejal perang kemerahan kuprum (Cu²⁺ + 2e⁻ → Cu).',
        },
      ],
    };
  }

  if (electrolyteId === 'nacl') {
    const presentCations = ['Na⁺', 'H⁺'];
    const presentAnions = ['Cl⁻', 'OH⁻'];

    const cathode = {
      selectedSpecies: 'Ion H⁺',
      factorTag: 'Nilai E⁰' as const,
      reason:
        'Nilai E⁰ bagi H⁺ (0.00 V) jauh lebih positif berbanding ion Na⁺ (−2.71 V), maka H⁺ lebih mudah diturunkan.',
      halfEquation: '2H⁺(ak) + 2e⁻ → H₂(g)',
      productName: 'Gas hidrogen, H₂',
      productVisual: 'gas_h2' as const,
      observationIdle: 'Suis dimatikan — tiada gelembung gas pada katod.',
      observationActive: 'Gelembung gas tidak berwarna (H₂) terbebas pada katod.',
    };

    const anode = isActiveCu
      ? {
          selectedSpecies: 'Atom Cu (Elektrod aktif)',
          factorTag: 'Elektrod Aktif (Faktor 3)' as const,
          reason:
            'Elektrod kuprum aktif lebih mudah dioksidakan berbanding nyahcas ion OH⁻ mahupun Cl⁻.',
          halfEquation: 'Cu(p) → Cu²⁺(ak) + 2e⁻',
          productName: 'Ion kuprum(II), Cu²⁺',
          productVisual: 'copper_dissolve' as const,
          observationIdle: 'Suis dimatikan — elektrod kuprum anod masih utuh.',
          observationActive:
            'Anod kuprum menipis dan larutan di sekitar anod bertukar biru pucat (ion Cu²⁺ terhasil).',
        }
      : isConcentratedHalide
      ? {
          selectedSpecies: `Ion Cl⁻ (> 0.001 M)`,
          factorTag: 'Kepekatan (Faktor 2)' as const,
          reason: `Kepekatan ${formatConcentration(concentration)} mol dm⁻³ melebihi 0.001 mol dm⁻³. Mengikut faktor kepekatan (faktor ke-2), ion halida Cl⁻ melebihi OH⁻ maka Cl⁻ dipilih walaupun E⁰ (+1.36 V) lebih positif.`,
          halfEquation: '2Cl⁻(ak) → Cl₂(g) + 2e⁻',
          productName: 'Gas klorin, Cl₂',
          productVisual: 'gas_cl2' as const,
          observationIdle: 'Suis dimatikan — tiada gas kuning kehijauan terbebas.',
          observationActive:
            'Gelembung gas kuning kehijauan berbau sengit (Cl₂) terbebas pada anod.',
        }
      : {
          selectedSpecies: 'Ion OH⁻ (≤ 0.001 M)',
          factorTag: 'Nilai E⁰ (Faktor 1)' as const,
          reason: `Pada larutan cair (${formatConcentration(concentration)} mol dm⁻³ ≤ 0.001), bilangan ion Cl⁻ amat rendah; faktor nilai E⁰ menentukan pemilihan di mana ion OH⁻ (+0.40 V) lebih rendah berbanding Cl⁻ (+1.36 V).`,
          halfEquation: '4OH⁻(ak) → O₂(g) + 2H₂O(ce) + 4e⁻',
          productName: 'Gas oksigen, O₂',
          productVisual: 'gas_o2' as const,
          observationIdle: 'Suis dimatikan — tiada gelembung gas pada anod.',
          observationActive: 'Gelembung gas tidak berwarna (O₂) terbebas pada anod.',
        };

    const anodeZoomIons: IonVisualCount[] = [
      {
        symbol: 'Cl⁻',
        charge: '−',
        kind: 'anion',
        color: '#84cc16',
        textColor: '#1a2e05',
        count: soluteIonCount,
        isDischarged: !isActiveCu && isConcentratedHalide,
      },
      {
        symbol: 'OH⁻',
        charge: '−',
        kind: 'anion',
        color: '#f43f5e',
        textColor: '#ffffff',
        count: waterIonCount,
        isDischarged: !isActiveCu && !isConcentratedHalide,
      },
    ];

    const cathodeZoomIons: IonVisualCount[] = [
      {
        symbol: 'Na⁺',
        charge: '+',
        kind: 'cation',
        color: '#3b82f6',
        textColor: '#ffffff',
        count: soluteIonCount,
        isDischarged: false,
      },
      {
        symbol: 'H⁺',
        charge: '+',
        kind: 'cation',
        color: '#facc15',
        textColor: '#422006',
        count: waterIonCount,
        isDischarged: true,
      },
    ];

    return {
      electrolyte,
      concentration,
      electrodeType,
      isMolten: false,
      isMoltenHeated: false,
      canConduct: true,
      isConcentratedHalide,
      presentCations,
      presentAnions,
      anode,
      cathode,
      overallEquation: isActiveCu
        ? 'Cu(p) + 2H⁺(ak) → Cu²⁺(ak) + H₂(g)'
        : isConcentratedHalide
        ? '2H⁺(ak) + 2Cl⁻(ak) → H₂(g) + Cl₂(g)'
        : '4H⁺(ak) + 4OH⁻(ak) → 2H₂(g) + O₂(g) + 2H₂O(ce)',
      solutionBehaviorText: isActiveCu
        ? 'Larutan tidak berwarna mula menjadi biru pucat akibat pembentukan ion Cu²⁺ dari anod aktif.'
        : 'Larutan kekal jernih tidak berwarna.',
      solutionMode: isActiveCu ? 'tints_blue' : 'clear_unchanged',
      anodeZoomIons,
      cathodeZoomIons,
      ionCompositionLabel: `Nisbah Anion: Cl⁻ (${soluteIonCount}) : OH⁻ (${waterIonCount})`,
      quizQuestions: [
        {
          target: 'Anod (+)',
          prompt: isActiveCu
            ? 'Elektrod KUPRUM aktif digunakan dalam NaCl(ak). Apakah yang berlaku pada Anod (+)?'
            : `Larutan NaCl berkepekatan ${formatConcentration(concentration)} mol dm⁻³ dielektrolisis dengan elektrod KARBON. Ion manakah dipilih di Anod (+)?`,
          options: [
            { id: 'cl', label: 'Ion Cl⁻ dinyahcas menghasilkan gas Cl₂' },
            { id: 'oh', label: 'Ion OH⁻ dinyahcas menghasilkan gas O₂' },
            { id: 'cu_anode', label: 'Atom kuprum pada anod mengion menjadi Cu²⁺' },
          ],
          correctOptionId: isActiveCu ? 'cu_anode' : isConcentratedHalide ? 'cl' : 'oh',
          explanationOnWrong: isActiveCu
            ? 'Kurang tepat! Elektrod aktif kuprum mengion terlebih dahulu (Cu → Cu²⁺ + 2e⁻) mengatasi nyahcas ion Cl⁻ mahupun OH⁻.'
            : isConcentratedHalide
            ? `Kurang tepat! Kepekatan ${formatConcentration(concentration)} mol dm⁻³ (> 0.001 M) mengaktifkan faktor kepekatan (faktor ke-2), lalu ion halida Cl⁻ dinyahcas menjadi Cl₂.`
            : `Kurang tepat! Pada larutan cair (${formatConcentration(concentration)} mol dm⁻³ ≤ 0.001 M), ion halida Cl⁻ terlalu sedikit maka nilai E⁰ ion OH⁻ (+0.40 V) dipilih berbanding Cl⁻ (+1.36 V).`,
          explanationOnRight: isActiveCu
            ? 'Tepat! Jenis elektrod aktif (kuprum) menyebabkan atom Cu mengion membebaskan 2e⁻.'
            : isConcentratedHalide
            ? 'Tepat! Pada kepekatan > 0.001 mol dm⁻³, faktor kepekatan memilih ion halida Cl⁻ menghasilkan gas Cl₂.'
            : 'Tepat! Pada kepekatan ≤ 0.001 mol dm⁻³, nilai E⁰ ion OH⁻ yang kurang positif (+0.40 V) menang menghasilkan O₂.',
        },
        {
          target: 'Katod (−)',
          prompt: 'Kation manakah yang dipilih untuk dinyahcas di Katod (−) bagi larutan NaCl(ak)?',
          options: [
            { id: 'na', label: 'Ion Na⁺ membentuk logam natrium' },
            { id: 'h', label: 'Ion H⁺ membebaskan gas hidrogen, H₂' },
          ],
          correctOptionId: 'h',
          explanationOnWrong:
            'Salah! Nilai E⁰ bagi ion H⁺ (0.00 V) jauh lebih positif berbanding ion Na⁺ (−2.71 V). Ion H⁺ jauh lebih mudah diturunkan.',
          explanationOnRight:
            'Tepat! Ion H⁺ dipilih untuk dinyahcas (2H⁺ + 2e⁻ → H₂) menghasilkan gelembung gas hidrogen.',
        },
      ],
    };
  }

  // H2SO4
  const presentCations = ['H⁺'];
  const presentAnions = ['SO₄²⁻', 'OH⁻'];

  const cathode = {
    selectedSpecies: 'Ion H⁺',
    factorTag: 'Nilai E⁰' as const,
    reason:
      'Hanya ion H⁺ wujud sebagai kation; ia diturunkan menerima elektron membentuk gas hidrogen, H₂.',
    halfEquation: '2H⁺(ak) + 2e⁻ → H₂(g)',
    productName: 'Gas hidrogen, H₂',
    productVisual: 'gas_h2' as const,
    observationIdle: 'Suis dimatikan — tiada gelembung gas pada katod.',
    observationActive: 'Gelembung gas tidak berwarna (H₂) terbebas pantas pada katod.',
  };

  const anode = isActiveCu
    ? {
        selectedSpecies: 'Atom Cu (Elektrod aktif)',
        factorTag: 'Elektrod Aktif (Faktor 3)' as const,
        reason:
          'Elektrod kuprum ialah elektrod aktif; atom kuprum mengion menjadi Cu²⁺ berbanding menyahcaskan ion OH⁻.',
        halfEquation: 'Cu(p) → Cu²⁺(ak) + 2e⁻',
        productName: 'Ion kuprum(II), Cu²⁺',
        productVisual: 'copper_dissolve' as const,
        observationIdle: 'Suis dimatikan — elektrod kuprum anod masih utuh.',
        observationActive:
          'Anod kuprum menipis dan larutan asid beransur kebiruan kerana ion Cu²⁺ terlarut.',
      }
    : {
        selectedSpecies: 'Ion OH⁻',
        factorTag: 'Nilai E⁰ (Faktor 1)' as const,
        reason:
          'Nilai E⁰ ion OH⁻ (+0.40 V) jauh lebih rendah daripada ion SO₄²⁻ (+2.01 V). Ion sulfat bukan halida dan tidak dinyahcas pada sebarang kepekatan.',
        halfEquation: '4OH⁻(ak) → O₂(g) + 2H₂O(ce) + 4e⁻',
        productName: 'Gas oksigen, O₂',
        productVisual: 'gas_o2' as const,
        observationIdle: 'Suis dimatikan — tiada gelembung gas pada anod.',
        observationActive:
          'Gelembung gas tidak berwarna (O₂) terbebas pada anod (isi padu separuh daripada H₂).',
      };

  const anodeZoomIons: IonVisualCount[] = [
    {
      symbol: 'OH⁻',
      charge: '−',
      kind: 'anion',
      color: '#f43f5e',
      textColor: '#ffffff',
      count: waterIonCount,
      isDischarged: !isActiveCu,
    },
    {
      symbol: 'SO₄²⁻',
      charge: '2−',
      kind: 'anion',
      color: '#a855f7',
      textColor: '#ffffff',
      count: soluteIonCount,
      isDischarged: false,
    },
  ];

  const cathodeZoomIons: IonVisualCount[] = [
    {
      symbol: 'H⁺',
      charge: '+',
      kind: 'cation',
      color: '#facc15',
      textColor: '#422006',
      count: Math.max(4, soluteIonCount + 2),
      isDischarged: true,
    },
  ];

  return {
    electrolyte,
    concentration,
    electrodeType,
    isMolten: false,
    isMoltenHeated: false,
    canConduct: true,
    isConcentratedHalide: false,
    presentCations,
    presentAnions,
    anode,
    cathode,
    overallEquation: isActiveCu
      ? 'Cu(p) + 2H⁺(ak) → Cu²⁺(ak) + H₂(g)'
      : '2H₂O(ce) → 2H₂(g) + O₂(g)',
    solutionBehaviorText: isActiveCu
      ? 'Larutan menjadi sedikit kebiruan akibat ion Cu²⁺ daripada pengionan anod kuprum.'
      : 'Hanya air mengalami elektrolisis secara keseluruhan; larutan kekal tidak berwarna.',
    solutionMode: isActiveCu ? 'tints_blue' : 'clear_unchanged',
    anodeZoomIons,
    cathodeZoomIons,
    ionCompositionLabel: `Nisbah Anion: SO₄²⁻ (${soluteIonCount}) : OH⁻ (${waterIonCount})`,
    quizQuestions: [
      {
        target: 'Anod (+)',
        prompt: isActiveCu
          ? 'Menggunakan elektrod KUPRUM aktif dalam H₂SO₄, apakah yang berlaku di Anod (+)?'
          : 'Dalam elektrolisis H₂SO₄ menggunakan elektrod KARBON, mengapakah gas oksigen terbebas di Anod (+)?',
        options: [
          { id: 'oh', label: 'Ion OH⁻ dipilih kerana E⁰ (+0.40 V) kurang positif daripada SO₄²⁻' },
          { id: 'so4', label: 'Ion SO₄²⁻ dinyahcas menghasilkan gas SO₂' },
          { id: 'cu_anode', label: 'Atom kuprum pada anod mengion menjadi ion Cu²⁺' },
        ],
        correctOptionId: isActiveCu ? 'cu_anode' : 'oh',
        explanationOnWrong: isActiveCu
          ? 'Salah! Apabila elektrod aktif kuprum digunakan, atom Cu pada anod mengion (Cu → Cu²⁺ + 2e⁻) mengatasi nyahcas anion.'
          : 'Salah! Ion SO₄²⁻ mempunyai nilai E⁰ (+2.01 V) yang sangat tinggi dan bukan ion halida, maka ia TIDAK dinyahcas walaupun kepekatan berubah.',
        explanationOnRight: isActiveCu
          ? 'Tepat! Elektrod kuprum mengion menjadi Cu²⁺ manakala katod masih membebaskan gas H₂.'
          : 'Tepat! Nilai E⁰ bagi OH⁻ (+0.40 V) lebih rendah berbanding SO₄²⁻ (+2.01 V).',
      },
    ],
  };
}
