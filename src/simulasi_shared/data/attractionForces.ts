export type ForceCategoryId =
  | 'zarah-vdw'
  | 'nukleus-elektron'
  | 'elektrostatik'
  | 'ikatan-hidrogen';

export interface ForceCategoryMeta {
  id: ForceCategoryId;
  order: number;
  title: string;
  shortTitle: string;
  kssmRef: string;
  accentHex: string;
  badgeClass: string;
  activeTabClass: string;
  leftTeamLabel: string;
  rightTeamLabel: string;
  coreConcept: string;
  spmMisconception: string;
}

export interface AtomSpec {
  symbol: string;
  shells: number[];
  protonNumber: number;
  neutronNumber: number;
  groupLabel: string;
  radiusNm?: string;
  electronegativity?: string;
  atomicRole: 'donate' | 'attract';
  reactivityNote: string;
}

export interface AttractionExample {
  id: string;
  categoryId: ForceCategoryId;
  name: string;
  formula: string;
  subtitle: string;
  /** Skala kekuatan daya tarikan relatif (1–100) untuk mekanik Tug of War */
  tugScore: number;
  strengthLabel: 'Sangat Lemah' | 'Lemah' | 'Sederhana Kuat' | 'Kuat' | 'Sangat Kuat';
  /** Skala suhu/tarikan untuk melepasi daya ini dalam mod interaktif */
  thresholdValue: number;
  thresholdUnit: '°C' | '% Tarikan';
  sliderMin: number;
  sliderMax: number;
  sliderDefault: number;
  meltingPoint?: string;
  boilingPoint?: string;
  roomState: string;
  leftSideName: string;
  rightSideName: string;
  explanation: string;
  dailyLifeOrKssmFact: string;
  visualKind:
    | 'ch4'
    | 'cl2'
    | 'br2'
    | 'i2'
    | 'c7h16'
    | 'hcl'
    | 'atom'
    | 'ionic-lattice'
    | 'metallic-sea'
    | 'h2o'
    | 'hf'
    | 'nh3'
    | 'etanol';
  /** Untuk sebatian ion */
  cationFormula?: string;
  anionFormula?: string;
  chargeProductLabel?: string;
  /** Untuk zarah Van der Waals / saiz molekul */
  moleculeRadius?: number;
  moleculeColor?: string;
  moleculeTextColor?: string;
  /** Untuk atom (Nukleus ↔ Elektron Valens) */
  atomSpec?: AtomSpec;
}

export interface DuelPreset {
  id: string;
  label: string;
  leftId: string;
  rightId: string;
  topicTag: string;
}

export const FORCE_CATEGORIES: ForceCategoryMeta[] = [
  {
    id: 'zarah-vdw',
    order: 1,
    title: '1. Daya Tarikan Antara Zarah',
    shortTitle: 'Antara Zarah (Van der Waals)',
    kssmRef: 'Bab 2 (2.1), Bab 4 (K17) & Bab 5 (5.7) + T5 Bab 2',
    accentHex: '#0284c7',
    badgeClass: 'bg-sky-50 text-sky-800 border-sky-200',
    activeTabClass: 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/20',
    leftTeamLabel: 'Daya Tarikan Antara Molekul (Van der Waals)',
    rightTeamLabel: 'Tenaga Haba / Pemisahan Zarah',
    coreConcept:
      'Molekul kovalen ringkas tertarik sesama sendiri melalui daya tarikan antara molekul (daya Van der Waals) yang lemah. Kekuatannya bertambah apabila saiz molekul bertambah.',
    spmMisconception:
      'Pemanasan hanya mengatasi daya tarikan Van der Waals ANTARA molekul yang lemah, BUKAN memutuskan ikatan kovalen yang kuat DI DALAM molekul!'
  },
  {
    id: 'nukleus-elektron',
    order: 2,
    title: '2. Tarikan Nukleus ↔ Elektron Valens',
    shortTitle: 'Nukleus & Elektron Valens',
    kssmRef: 'Bab 4 (4.4–4.6: Rajah 4.9, 4.11 & Jadual 4.7)',
    accentHex: '#7c3aed',
    badgeClass: 'bg-violet-50 text-violet-800 border-violet-200',
    activeTabClass: 'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-600/20',
    leftTeamLabel: 'Tarikan Proton Nukleus (+)',
    rightTeamLabel: 'Jarak Petala & Kesan Perisai (e⁻ Valens)',
    coreConcept:
      'Daya tarikan elektrostatik antara nukleus bercas positif dengan elektron valens bergantung pada jarak petala valens dan bilangan proton. Semakin banyak petala, semakin lemah tarikan nukleus terhadap elektron valens.',
    spmMisconception:
      'Menuruni Kumpulan 1, tarikan nukleus lemah menjadikan atom LEBIH REAKTIF (mudah derma e⁻); tetapi menuruni Kumpulan 17, tarikan nukleus lemah menjadikan atom KURANG REAKTIF (sukar tarik e⁻)!'
  },
  {
    id: 'elektrostatik',
    order: 3,
    title: '3. Daya Tarikan Elektrostatik',
    shortTitle: 'Daya Elektrostatik (Ion/Logam)',
    kssmRef: 'Bab 5 (5.2 Ikatan Ion, 5.6 Ikatan Logam & 5.7)',
    accentHex: '#d97706',
    badgeClass: 'bg-amber-50 text-amber-900 border-amber-200',
    activeTabClass: 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/20',
    leftTeamLabel: 'Daya Tarikan Elektrostatik (+ ↔ −)',
    rightTeamLabel: 'Tenaga Haba Meruntuhkan Kekisi',
    coreConcept:
      'Tarikan yang sangat kuat antara ion positif dengan ion negatif (ikatan ion dalam struktur kekisi) atau antara ion logam positif dengan lautan elektron yang dinyahsetempatkan (ikatan logam).',
    spmMisconception:
      'Pepejal sebatian ion tidak dapat mengkonduksikan elektrik kerana ion diikat kuat oleh daya tarikan elektrostatik dan tidak dapat bergerak bebas (hanya leburan & larutan akueus boleh mengkonduksikan elektrik!).'
  },
  {
    id: 'ikatan-hidrogen',
    order: 4,
    title: '4. Ikatan Hidrogen',
    shortTitle: 'Ikatan Hidrogen (NOF)',
    kssmRef: 'Bab 5 (5.4: Rajah 5.12–5.16 & Aktiviti 5.4–5.5)',
    accentHex: '#e11d48',
    badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
    activeTabClass: 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20',
    leftTeamLabel: 'Ikatan Hidrogen (Hδ⁺ ··· N/O/Fδ⁻)',
    rightTeamLabel: 'Tenaga Haba Memutuskan Ikatan',
    coreConcept:
      'Daya tarikan antara atom hidrogen (H) yang terikat secara kovalen kepada atom sangat elektronegatif iaitu Nitrogen (N), Oksigen (O) atau Fluorin (F) dengan atom N, O atau F pada molekul sebelah.',
    spmMisconception:
      'Ikatan hidrogen BUKAN antara atom H dengan sebarang unsur (contohnya HCl tiada ikatan hidrogen kerana Cl tiada dalam syarat NOF). Kekuatannya lebih kuat daripada Van der Waals tetapi masih lebih lemah daripada ikatan kovalen & ion!'
  }
];

export const ATTRACTION_EXAMPLES: AttractionExample[] = [
  // ================= 1. DAYA TARIKAN ANTARA ZARAH (VAN DER WAALS) =================
  {
    id: 'ch4',
    categoryId: 'zarah-vdw',
    name: 'Metana',
    formula: 'CH₄',
    subtitle: 'Molekul kovalen sangat kecil (Gas asli)',
    tugScore: 14,
    strengthLabel: 'Sangat Lemah',
    thresholdValue: -162,
    thresholdUnit: '°C',
    sliderMin: -210,
    sliderMax: 150,
    sliderDefault: -180,
    meltingPoint: '-182 °C',
    boilingPoint: '-162 °C',
    roomState: 'Gas tidak berwarna',
    leftSideName: 'Tarikan Van der Waals (CH₄···CH₄)',
    rightSideName: 'Tenaga Haba Pemisahan',
    explanation:
      'Molekul CH₄ sangat kecil dan neutral. Daya tarikan Van der Waals antara molekulnya amat lemah, maka sedikit sahaja tenaga haba sudah cukup untuk memisahkan molekul menjadi gas (t.d. -162 °C). Ikatan kovalen C–H di dalam molekul kekal utuh!',
    dailyLifeOrKssmFact: 'T5 Jadual 2.10 (m.s. 78) & T4 Rajah 5.26 (m.s. 127): gas asli utama.',
    visualKind: 'ch4',
    moleculeRadius: 18,
    moleculeColor: '#bae6fd',
    moleculeTextColor: '#0369a1'
  },
  {
    id: 'cl2',
    categoryId: 'zarah-vdw',
    name: 'Klorin',
    formula: 'Cl₂',
    subtitle: 'Halogen Kumpulan 17 (Molekul kecil)',
    tugScore: 22,
    strengthLabel: 'Lemah',
    thresholdValue: -34,
    thresholdUnit: '°C',
    sliderMin: -140,
    sliderMax: 220,
    sliderDefault: -60,
    meltingPoint: '-101 °C',
    boilingPoint: '-34 °C',
    roomState: 'Gas kuning kehijauan',
    leftSideName: 'Tarikan Van der Waals (Cl₂···Cl₂)',
    rightSideName: 'Tenaga Haba Pemisahan',
    explanation:
      'Molekul Cl₂ bersaiz kecil, maka daya tarikan antara molekul (Van der Waals) adalah lemah. Tenaga haba yang rendah pada suhu bilik (25 °C) sudah melepasi takat didihnya (-34 °C).',
    dailyLifeOrKssmFact: 'T4 Jadual 4.6 (m.s. 93): Cl₂ ialah gas kuning kehijauan pada suhu bilik.',
    visualKind: 'cl2',
    moleculeRadius: 21,
    moleculeColor: '#d9f99d',
    moleculeTextColor: '#3f6212'
  },
  {
    id: 'hcl',
    categoryId: 'zarah-vdw',
    name: 'Hidrogen Klorida',
    formula: 'HCl',
    subtitle: 'Tiada ikatan hidrogen (hanya Van der Waals)',
    tugScore: 20,
    strengthLabel: 'Lemah',
    thresholdValue: -85,
    thresholdUnit: '°C',
    sliderMin: -140,
    sliderMax: 150,
    sliderDefault: -100,
    meltingPoint: '-114 °C',
    boilingPoint: '-85 °C',
    roomState: 'Gas tidak berwarna',
    leftSideName: 'Tarikan Van der Waals (HCl···HCl)',
    rightSideName: 'Tenaga Haba Pemisahan',
    explanation:
      'Walaupun HCl mengandungi atom hidrogen (H), atom Cl bukan N, O atau F! Oleh itu TIADA ikatan hidrogen terbentuk antara molekul HCl — hanya daya Van der Waals yang lemah (t.d. -85 °C).',
    dailyLifeOrKssmFact: 'T4 Uji Kendiri 5.4 Soalan 3: Bandingan klasik dengan H₂O & HF.',
    visualKind: 'hcl',
    moleculeRadius: 20,
    moleculeColor: '#e2e8f0',
    moleculeTextColor: '#334155'
  },
  {
    id: 'br2',
    categoryId: 'zarah-vdw',
    name: 'Bromin',
    formula: 'Br₂',
    subtitle: 'Halogen Kumpulan 17 (Molekul sederhana)',
    tugScore: 36,
    strengthLabel: 'Lemah',
    thresholdValue: 59,
    thresholdUnit: '°C',
    sliderMin: -40,
    sliderMax: 220,
    sliderDefault: 25,
    meltingPoint: '-7 °C',
    boilingPoint: '59 °C',
    roomState: 'Cecair perang kemerahan',
    leftSideName: 'Tarikan Van der Waals (Br₂···Br₂)',
    rightSideName: 'Tenaga Haba Pemisahan',
    explanation:
      'Saiz molekul Br₂ lebih besar daripada Cl₂. Daya tarikan Van der Waals antara molekul Br₂ bertambah kuat sehingga ia kekal sebagai cecair pada suhu bilik (25 °C) dan mendidih pada 59 °C.',
    dailyLifeOrKssmFact: 'T4 Jadual 4.6 (m.s. 93): Meruap mudah menghasilkan wap perang pada suhu bilik.',
    visualKind: 'br2',
    moleculeRadius: 26,
    moleculeColor: '#fed7aa',
    moleculeTextColor: '#9a3412'
  },
  {
    id: 'c7h16',
    categoryId: 'zarah-vdw',
    name: 'Heptana',
    formula: 'C₇H₁₆',
    subtitle: 'Alkana rantai panjang (Saiz molekul besar)',
    tugScore: 44,
    strengthLabel: 'Lemah',
    thresholdValue: 98,
    thresholdUnit: '°C',
    sliderMin: -40,
    sliderMax: 220,
    sliderDefault: 25,
    meltingPoint: '-91 °C',
    boilingPoint: '98 °C',
    roomState: 'Cecair meruap',
    leftSideName: 'Tarikan Van der Waals (C₇H₁₆···C₇H₁₆)',
    rightSideName: 'Tenaga Haba Pemisahan',
    explanation:
      'Apabila bilangan atom karbon per molekul meningkat daripada CH₄ kepada C₇H₁₆, saiz molekul bertambah besar. Daya Van der Waals menjadi semakin kuat, maka takat didih melonjak daripada -162 °C kepada 98 °C.',
    dailyLifeOrKssmFact: 'T5 Jadual 2.10 (m.s. 78): Trend takat didih alkana bertambah dengan saiz molekul.',
    visualKind: 'c7h16',
    moleculeRadius: 29,
    moleculeColor: '#bae6fd',
    moleculeTextColor: '#0c4a6e'
  },
  {
    id: 'i2',
    categoryId: 'zarah-vdw',
    name: 'Iodin',
    formula: 'I₂',
    subtitle: 'Halogen Kumpulan 17 (Molekul paling besar)',
    tugScore: 52,
    strengthLabel: 'Sederhana Kuat',
    thresholdValue: 184,
    thresholdUnit: '°C',
    sliderMin: 0,
    sliderMax: 240,
    sliderDefault: 25,
    meltingPoint: '114 °C',
    boilingPoint: '184 °C',
    roomState: 'Pepejal hitam keunguan',
    leftSideName: 'Tarikan Van der Waals (I₂···I₂)',
    rightSideName: 'Tenaga Haba Pemisahan',
    explanation:
      'Molekul I₂ bersaiz sangat besar berbanding Cl₂ dan Br₂. Daya tarikan Van der Waals yang jauh lebih kuat membolehkan molekul I₂ tersusun rapat sebagai pepejal pada suhu bilik dan memerlukan haba hingga 184 °C untuk mendidih.',
    dailyLifeOrKssmFact: 'T4 Jadual 4.6 (m.s. 93): Memejalwap menjadi wap ungu apabila dipanaskan perlahan.',
    visualKind: 'i2',
    moleculeRadius: 32,
    moleculeColor: '#e9d5ff',
    moleculeTextColor: '#581c87'
  },

  // ================= 2. DAYA TARIKAN ANTARA NUKLEUS DENGAN ELEKTRON VALENS =================
  {
    id: 'atom-li',
    categoryId: 'nukleus-elektron',
    name: 'Atom Litium',
    formula: 'Li (2.1)',
    subtitle: 'Kumpulan 1 — 2 petala (Jarak terdekat)',
    tugScore: 72,
    strengthLabel: 'Kuat',
    thresholdValue: 72,
    thresholdUnit: '% Tarikan',
    sliderMin: 0,
    sliderMax: 100,
    sliderDefault: 35,
    meltingPoint: '186 °C',
    boilingPoint: '1342 °C',
    roomState: 'Pepejal logam lembut (Jejari 0.133 nm)',
    leftSideName: 'Tarikan Nukleus Li (+3p)',
    rightSideName: 'Tarikan Keluar e⁻ Valens',
    explanation:
      'Atom Litium hanya mempunyai 2 petala (2.1). Elektron valens terletak sangat dekat dengan nukleus, maka daya tarikan nukleus terhadap elektron valens adalah KUAT. Elektron lebih sukar diderma → Litium paling kurang reaktif antara Li, Na dan K.',
    dailyLifeOrKssmFact: 'T4 Rajah 4.9 & Jadual 4.3 (m.s. 88–91): Bertindak balas paling perlahan dengan air.',
    visualKind: 'atom',
    atomSpec: {
      symbol: 'Li',
      shells: [2, 1],
      protonNumber: 3,
      neutronNumber: 4,
      groupLabel: 'Kumpulan 1, Kala 2',
      radiusNm: '0.133 nm',
      atomicRole: 'donate',
      reactivityNote: 'Elektron valens dekat dengan nukleus → paling sukar diderma dalam K1.'
    }
  },
  {
    id: 'atom-na',
    categoryId: 'nukleus-elektron',
    name: 'Atom Natrium',
    formula: 'Na (2.8.1)',
    subtitle: 'Kumpulan 1 / Kala 3 — 3 petala',
    tugScore: 54,
    strengthLabel: 'Sederhana Kuat',
    thresholdValue: 54,
    thresholdUnit: '% Tarikan',
    sliderMin: 0,
    sliderMax: 100,
    sliderDefault: 35,
    meltingPoint: '98 °C',
    boilingPoint: '880 °C',
    roomState: 'Pepejal logam lembut (Jejari 0.186 nm)',
    leftSideName: 'Tarikan Nukleus Na (+11p)',
    rightSideName: 'Tarikan Keluar e⁻ Valens',
    explanation:
      'Natrium mempunyai 3 petala (2.8.1) dengan jejari 0.186 nm. Pertambahan satu petala menjadikan elektron valens lebih jauh dan terlindung daripada nukleus berbanding Li, maka tarikan nukleus melemah dan Na lebih mudah mendermakan 1 elektron valens.',
    dailyLifeOrKssmFact: 'T4 Jadual 4.3 & 4.7: Keelektronegatifan rendah (0.9); cergas dengan air.',
    visualKind: 'atom',
    atomSpec: {
      symbol: 'Na',
      shells: [2, 8, 1],
      protonNumber: 11,
      neutronNumber: 12,
      groupLabel: 'Kumpulan 1, Kala 3',
      radiusNm: '0.186 nm',
      electronegativity: '0.9',
      atomicRole: 'donate',
      reactivityNote: '3 petala menjauhkan elektron valens → lebih reaktif daripada Li.'
    }
  },
  {
    id: 'atom-k',
    categoryId: 'nukleus-elektron',
    name: 'Atom Kalium',
    formula: 'K (2.8.8.1)',
    subtitle: 'Kumpulan 1 — 4 petala (Jarak terjauh)',
    tugScore: 34,
    strengthLabel: 'Lemah',
    thresholdValue: 34,
    thresholdUnit: '% Tarikan',
    sliderMin: 0,
    sliderMax: 100,
    sliderDefault: 45,
    meltingPoint: '64 °C',
    boilingPoint: '760 °C',
    roomState: 'Pepejal logam lembut (Jejari 0.203 nm)',
    leftSideName: 'Tarikan Nukleus K (+19p)',
    rightSideName: 'Tarikan Keluar e⁻ Valens',
    explanation:
      'Atom Kalium mempunyai 4 petala (2.8.8.1) dengan saiz atom paling besar (0.203 nm). Elektron valens terletak paling jauh daripada nukleus → daya tarikan nukleus terhadap elektron valens SANGAT LEMAH → elektron valens mudah terlepas dan sangat reaktif!',
    dailyLifeOrKssmFact: 'T4 Rajah 4.9 (m.s. 91): Terbakar dengan nyalaan ungu kemerahan apabila menyentuh air!',
    visualKind: 'atom',
    atomSpec: {
      symbol: 'K',
      shells: [2, 8, 8, 1],
      protonNumber: 19,
      neutronNumber: 20,
      groupLabel: 'Kumpulan 1, Kala 4',
      radiusNm: '0.203 nm',
      atomicRole: 'donate',
      reactivityNote: '4 petala → tarikan nukleus paling lemah → paling mudah derma e⁻!'
    }
  },
  {
    id: 'atom-cl',
    categoryId: 'nukleus-elektron',
    name: 'Atom Klorin',
    formula: 'Cl (2.8.7)',
    subtitle: 'Kumpulan 17 / Kala 3 — Tarikan masuk amat kuat',
    tugScore: 88,
    strengthLabel: 'Sangat Kuat',
    thresholdValue: 88,
    thresholdUnit: '% Tarikan',
    sliderMin: 0,
    sliderMax: 100,
    sliderDefault: 40,
    roomState: 'Bukan logam (Jejari 0.100 nm)',
    leftSideName: 'Tarikan Nukleus Cl (+17p)',
    rightSideName: 'Elektron Luar Untuk Ditarik',
    explanation:
      'Klorin (2.8.7) cuma ada 3 petala kecil (0.100 nm) tetapi membawa cas nukleus +17 proton! Daya tarikan nukleus terhadap elektron luar amat KUAT (keelektronegatifan 3.0), maka atom Cl sangat mudah menarik 1 elektron untuk mencapai susunan oktet Cl⁻ (2.8.8).',
    dailyLifeOrKssmFact: 'T4 Rajah 4.11 & Jadual 4.7: Merentasi Kala 3 (Na → Cl), proton ↑ maka tarikan nukleus ↑.',
    visualKind: 'atom',
    atomSpec: {
      symbol: 'Cl',
      shells: [2, 8, 7],
      protonNumber: 17,
      neutronNumber: 18,
      groupLabel: 'Kumpulan 17, Kala 3',
      radiusNm: '0.100 nm',
      electronegativity: '3.0',
      atomicRole: 'attract',
      reactivityNote: 'Saiz atom kecil + 17 proton → menarik elektron ke petala valens paling kuat antara Cl, Br, I!'
    }
  },
  {
    id: 'atom-i',
    categoryId: 'nukleus-elektron',
    name: 'Atom Iodin',
    formula: 'I (2.8.18.18.7)',
    subtitle: 'Kumpulan 17 — 5 petala (Tarikan lemah)',
    tugScore: 44,
    strengthLabel: 'Lemah',
    thresholdValue: 44,
    thresholdUnit: '% Tarikan',
    sliderMin: 0,
    sliderMax: 100,
    sliderDefault: 40,
    roomState: 'Halogen Kala 5 (5 Petala)',
    leftSideName: 'Tarikan Nukleus I (+53p)',
    rightSideName: 'Kesukaran Tarik Elektron Luar',
    explanation:
      'Atom Iodin (2.8.18.18.7) mempunyai 5 petala terisi elektron. Petala valens terlalu jauh daripada nukleus dan terlindung oleh 4 petala dalaman. Oleh itu, daya tarikan nukleus terhadap elektron luar menjadi lemah → sukar menerima elektron → Iodin paling kurang reaktif berbanding Cl dan Br.',
    dailyLifeOrKssmFact: 'T4 Rajah 4.11 (m.s. 95): Kereaktifan berkurang menuruni Kumpulan 17.',
    visualKind: 'atom',
    atomSpec: {
      symbol: 'I',
      shells: [2, 8, 18, 18, 7],
      protonNumber: 53,
      neutronNumber: 74,
      groupLabel: 'Kumpulan 17, Kala 5',
      atomicRole: 'attract',
      reactivityNote: '5 petala → tarikan nukleus lemah → sukar menarik 1e⁻ memenuhi petala valens.'
    }
  },

  // ================= 3. DAYA TARIKAN ELEKTROSTATIK =================
  {
    id: 'nacl',
    categoryId: 'elektrostatik',
    name: 'Natrium Klorida',
    formula: 'NaCl',
    subtitle: 'Ikatan Ion (Na⁺ dan Cl⁻ dalam kekisi kristal)',
    tugScore: 86,
    strengthLabel: 'Sangat Kuat',
    thresholdValue: 801,
    thresholdUnit: '°C',
    sliderMin: 25,
    sliderMax: 3000,
    sliderDefault: 200,
    meltingPoint: '801 °C',
    boilingPoint: '1413 °C',
    roomState: 'Pepejal hablur putih',
    leftSideName: 'Tarikan Elektrostatik (Na⁺ ↔ Cl⁻)',
    rightSideName: 'Tenaga Haba Runtuhkan Kekisi',
    explanation:
      'Ion positif Na⁺ dan ion negatif Cl⁻ ditarik bersama oleh daya tarikan elektrostatik yang sangat kuat dalam struktur kekisi 3D. Tenaga haba yang amat tinggi (> 801 °C) diperlukan untuk mengatasi tarikan ini.',
    dailyLifeOrKssmFact: 'T4 Rajah 5.25 (m.s. 127): Takat lebur tinggi, larut dalam air, konduksi hanya apabila lebur/akueus.',
    visualKind: 'ionic-lattice',
    cationFormula: 'Na⁺',
    anionFormula: 'Cl⁻',
    chargeProductLabel: 'Cas +1 & −1'
  },
  {
    id: 'naf',
    categoryId: 'elektrostatik',
    name: 'Natrium Fluorida',
    formula: 'NaF',
    subtitle: 'Ikatan Ion (Rajah 5.6 KSSM — Ubat gigi)',
    tugScore: 89,
    strengthLabel: 'Sangat Kuat',
    thresholdValue: 993,
    thresholdUnit: '°C',
    sliderMin: 25,
    sliderMax: 3000,
    sliderDefault: 200,
    meltingPoint: '993 °C',
    boilingPoint: '1695 °C',
    roomState: 'Pepejal hablur putih',
    leftSideName: 'Tarikan Elektrostatik (Na⁺ ↔ F⁻)',
    rightSideName: 'Tenaga Haba Runtuhkan Kekisi',
    explanation:
      'Atom Na (2.8.1) menderma 1 elektron kepada atom F (2.7) membentuk Na⁺ (2.8) dan F⁻ (2.8). Kerana ion F⁻ lebih kecil daripada Cl⁻, jarak antara pusat cas lebih rapat → daya tarikan elektrostatik lebih kuat (t.l. 993 °C).',
    dailyLifeOrKssmFact: 'T4 Rajah 5.6 (m.s. 113): Ditambah ke dalam ubat gigi untuk menguatkan enamel gigi.',
    visualKind: 'ionic-lattice',
    cationFormula: 'Na⁺',
    anionFormula: 'F⁻',
    chargeProductLabel: 'Cas +1 & −1 (Ion F⁻ kecil)'
  },
  {
    id: 'mgo',
    categoryId: 'elektrostatik',
    name: 'Magnesium Oksida',
    formula: 'MgO',
    subtitle: 'Ikatan Ion Cas Berganda (Mg²⁺ & O²⁻)',
    tugScore: 98,
    strengthLabel: 'Sangat Kuat',
    thresholdValue: 2852,
    thresholdUnit: '°C',
    sliderMin: 25,
    sliderMax: 3000,
    sliderDefault: 400,
    meltingPoint: '2852 °C',
    boilingPoint: '3600 °C',
    roomState: 'Pepejal refraktori putih',
    leftSideName: 'Tarikan Elektrostatik (Mg²⁺ ↔ O²⁻)',
    rightSideName: 'Tenaga Haba Runtuhkan Kekisi',
    explanation:
      'Ion Mg²⁺ (cas +2) dan ion O²⁻ (cas −2) mempunyai magnitud cas dua kali ganda lebih besar daripada Na⁺ dan Cl⁻. Oleh itu, daya tarikan elektrostatiknya jauh lebih kuat dan takat leburnya melambung hingga 2852 °C!',
    dailyLifeOrKssmFact: 'Digunakan sebagai lapisan bata tahan panas relau bagas kerana takat lebur amat tinggi.',
    visualKind: 'ionic-lattice',
    cationFormula: 'Mg²⁺',
    anionFormula: 'O²⁻',
    chargeProductLabel: 'Cas +2 & −2 (4× tarikan cas)'
  },
  {
    id: 'cu-metal',
    categoryId: 'elektrostatik',
    name: 'Logam Kuprum',
    formula: 'Cu',
    subtitle: 'Ikatan Logam (Ion logam + lautan elektron)',
    tugScore: 84,
    strengthLabel: 'Sangat Kuat',
    thresholdValue: 1084,
    thresholdUnit: '°C',
    sliderMin: 25,
    sliderMax: 3000,
    sliderDefault: 200,
    meltingPoint: '1084 °C',
    boilingPoint: '2580 °C',
    roomState: 'Pepejal logam perang kemerahan',
    leftSideName: 'Tarikan Elektrostatik (Cu²⁺ ↔ Lautan e⁻)',
    rightSideName: 'Tenaga Haba Meruntuhkan Ikatan',
    explanation:
      'Elektron valens atom logam dinyahsetempatkan membentuk lautan elektron yang bergerak bebas. Daya tarikan elektrostatik antara lautan elektron negatif dengan kekisi ion logam positif membentuk ikatan logam yang kuat (t.l. 1084 °C).',
    dailyLifeOrKssmFact: 'T4 Rajah 5.19–5.20 (m.s. 121): Wayar kuprum mengkonduksi elektrik walau dalam pepejal!',
    visualKind: 'metallic-sea',
    cationFormula: 'Cu²⁺',
    anionFormula: 'e⁻',
    chargeProductLabel: 'Ion logam positif + Lautan e⁻'
  },

  // ================= 4. IKATAN HIDROGEN =================
  {
    id: 'h2o',
    categoryId: 'ikatan-hidrogen',
    name: 'Air',
    formula: 'H₂O',
    subtitle: 'Ikatan hidrogen O···H–O (Rangkaian 3D)',
    tugScore: 68,
    strengthLabel: 'Kuat',
    thresholdValue: 100,
    thresholdUnit: '°C',
    sliderMin: -40,
    sliderMax: 160,
    sliderDefault: 25,
    meltingPoint: '0 °C',
    boilingPoint: '100 °C',
    roomState: 'Cecair tidak berwarna',
    leftSideName: 'Ikatan Hidrogen (Hδ⁺ ··· Oδ⁻)',
    rightSideName: 'Tenaga Haba Pemisahan',
    explanation:
      'Atom H terikat kovalen pada atom O yang sangat elektronegatif. Tarikan kuat terbentuk antara H(δ⁺) suatu molekul dengan atom O(δ⁻) molekul sebelah. Banyak haba (100 °C) diperlukan untuk mengatasi ikatan hidrogen & daya Van der Waals.',
    dailyLifeOrKssmFact: 'T4 Rajah 5.12 (m.s. 117): Ais kurang tumpat daripada air menyebabkan aisberg terapung.',
    visualKind: 'h2o'
  },
  {
    id: 'hf',
    categoryId: 'ikatan-hidrogen',
    name: 'Hidrogen Fluorida',
    formula: 'HF',
    subtitle: 'Ikatan hidrogen F···H–F (Unsur paling elektronegatif)',
    tugScore: 63,
    strengthLabel: 'Kuat',
    thresholdValue: 20,
    thresholdUnit: '°C',
    sliderMin: -100,
    sliderMax: 140,
    sliderDefault: 10,
    meltingPoint: '-84 °C',
    boilingPoint: '19.5 °C',
    roomState: 'Cecair meruap / gas hampir suhu bilik',
    leftSideName: 'Ikatan Hidrogen (Hδ⁺ ··· Fδ⁻)',
    rightSideName: 'Tenaga Haba Pemisahan',
    explanation:
      'Atom F mempunyai keelektronegatifan paling tinggi. Oleh itu, HF membentuk ikatan hidrogen yang kuat sesama molekulnya dan mempunyai takat didih (19.5 °C) jauh lebih tinggi daripada HCl (-85 °C) walaupun saiz molekul HF lebih kecil!',
    dailyLifeOrKssmFact: 'T4 Aktiviti 5.4 & Uji Kendiri 5.4 Soalan 2: Bandingkan HF dengan HCl.',
    visualKind: 'hf'
  },
  {
    id: 'nh3',
    categoryId: 'ikatan-hidrogen',
    name: 'Ammonia',
    formula: 'NH₃',
    subtitle: 'Ikatan hidrogen N···H–N (Syarat N dalam NOF)',
    tugScore: 56,
    strengthLabel: 'Sederhana Kuat',
    thresholdValue: -33,
    thresholdUnit: '°C',
    sliderMin: -120,
    sliderMax: 120,
    sliderDefault: -50,
    meltingPoint: '-78 °C',
    boilingPoint: '-33 °C',
    roomState: 'Gas berbau sengit & amat larut dalam air',
    leftSideName: 'Ikatan Hidrogen (Hδ⁺ ··· Nδ⁻)',
    rightSideName: 'Tenaga Haba Pemisahan',
    explanation:
      'Atom H terikat kepada atom N (memenuhi syarat NOF). Ikatan hidrogen N···H terbentuk sesama molekul NH₃ dan juga dengan molekul air H₂O apabila dilarutkan, menyebabkan ammonia amat mudah larut dalam air.',
    dailyLifeOrKssmFact: 'T4 Aktiviti 5.4–5.5 (m.s. 118–119): Terlibat membentuk ikatan dengan molekul air.',
    visualKind: 'nh3'
  },
  {
    id: 'etanol',
    categoryId: 'ikatan-hidrogen',
    name: 'Etanol dalam Air',
    formula: 'C₂H₅OH',
    subtitle: 'Ikatan Hidrogen (–OH) + Van der Waals (Rantai etil)',
    tugScore: 65,
    strengthLabel: 'Kuat',
    thresholdValue: 78,
    thresholdUnit: '°C',
    sliderMin: -40,
    sliderMax: 160,
    sliderDefault: 25,
    meltingPoint: '-114 °C',
    boilingPoint: '78 °C',
    roomState: 'Cecair larut sempurna dalam air',
    leftSideName: 'Ikatan Hidrogen (O–H···O) + VdW',
    rightSideName: 'Tenaga Haba Pemisahan',
    explanation:
      'Kumpulan –OH dalam etanol membentuk ikatan hidrogen yang kuat sesama etanol (t.d. 78 °C) dan juga dengan molekul air H₂O (sebab itu etanol larut dalam air, tidak seperti etana C₂H₆ yang hanya ada Van der Waals, t.d. -89 °C).',
    dailyLifeOrKssmFact: 'T4 Rajah 5.16 (m.s. 119): Hujung jari basah atau rambut basah juga melekat akibat ikatan hidrogen!',
    visualKind: 'etanol'
  }
];

export const DUEL_PRESETS: DuelPreset[] = [
  {
    id: 'nacl-vs-h2o',
    label: 'NaCl vs H₂O',
    leftId: 'nacl',
    rightId: 'h2o',
    topicTag: 'Elektrostatik vs Ikatan Hidrogen'
  },
  {
    id: 'h2o-vs-hcl',
    label: 'H₂O vs HCl',
    leftId: 'h2o',
    rightId: 'hcl',
    topicTag: 'Syarat NOF (Ikatan Hidrogen vs Van der Waals)'
  },
  {
    id: 'mgo-vs-nacl',
    label: 'MgO vs NaCl',
    leftId: 'mgo',
    rightId: 'nacl',
    topicTag: 'Kesan Magnitud Cas Ion (+2/−2 vs +1/−1)'
  },
  {
    id: 'i2-vs-cl2',
    label: 'I₂ vs Cl₂',
    leftId: 'i2',
    rightId: 'cl2',
    topicTag: 'Kesan Saiz Molekul Kumpulan 17 (Van der Waals)'
  },
  {
    id: 'etanol-vs-ch4',
    label: 'C₂H₅OH vs CH₄',
    leftId: 'etanol',
    rightId: 'ch4',
    topicTag: 'Ikatan Hidrogen vs Molekul Tidak Kutub'
  },
  {
    id: 'li-vs-k',
    label: 'Atom Li vs Atom K',
    leftId: 'atom-li',
    rightId: 'atom-k',
    topicTag: 'Tarikan Nukleus ↔ Elektron Valens (Kump. 1)'
  }
];

export function getExampleById(id: string): AttractionExample {
  return ATTRACTION_EXAMPLES.find((ex) => ex.id === id) ?? ATTRACTION_EXAMPLES[0];
}

export function getExamplesByCategory(categoryId: ForceCategoryId): AttractionExample[] {
  return ATTRACTION_EXAMPLES.filter((ex) => ex.categoryId === categoryId);
}

export function evaluateDuel(left: AttractionExample, right: AttractionExample): {
  winnerSide: 'left' | 'right' | 'tie';
  winner: AttractionExample;
  loser: AttractionExample;
  netRatio: number; // -1 to +1 (negative = left wins, positive = right wins)
  summaryReason: string;
} {
  const diff = left.tugScore - right.tugScore;
  const winnerSide = diff > 0 ? 'left' : diff < 0 ? 'right' : 'tie';
  const winner = diff >= 0 ? left : right;
  const loser = diff >= 0 ? right : left;
  const clamped = Math.max(-1, Math.min(1, -diff / 55));

  const bothAtom =
    left.categoryId === 'nukleus-elektron' && right.categoryId === 'nukleus-elektron';

  let summaryReason = '';
  if (winner.id === loser.id) {
    summaryReason = `Kedua-dua pihak memilih ${winner.name} (${winner.formula}) — kekuatan daya tarikan adalah sama dan tali berada di titik seimbang!`;
  } else if (bothAtom) {
    summaryReason = `Nukleus ${winner.formula} mempunyai daya tarikan terhadap elektron valens lebih kuat (skor ${winner.tugScore}) berbanding ${loser.formula} (skor ${loser.tugScore}). ${
      winner.atomSpec?.atomicRole === 'donate' && loser.atomSpec?.atomicRole === 'donate'
        ? `Oleh itu, ${loser.atomSpec?.symbol} lebih mudah menderma elektron valens dan lebih reaktif dalam Kumpulan 1!`
        : winner.atomSpec?.atomicRole === 'attract' && loser.atomSpec?.atomicRole === 'attract'
          ? `Oleh itu, ${winner.atomSpec?.symbol} lebih mudah menarik elektron luar untuk mencapai oktet dan lebih reaktif!`
          : 'Saiz jejari atom lebih kecil serta tarikan proton nukleus lebih berkesan memegang elektron valens.'
    }`;
  } else if (
    left.categoryId === 'nukleus-elektron' ||
    right.categoryId === 'nukleus-elektron'
  ) {
    summaryReason = `${winner.name} (${winner.formula}, skor ${winner.tugScore}) mendominasi tarikan berbanding ${loser.name} (${loser.formula}, skor ${loser.tugScore}). Nota KSSM: Tarikan nukleus atom menentukan kereaktifan kimia, manakala daya antara zarah menentukan takat lebur dan takat didih.`;
  } else {
    summaryReason = `${winner.name} (${winner.formula}, skor ${winner.tugScore}, t.d. ${
      winner.boilingPoint ?? winner.meltingPoint
    }) menewaskan ${loser.name} (${loser.formula}, skor ${loser.tugScore}, t.d. ${
      loser.boilingPoint ?? loser.meltingPoint
    }) kerana ${winner.leftSideName} memerlukan tenaga haba yang jauh lebih tinggi untuk diatasi berbanding ${loser.leftSideName}.`;
  }

  return {
    winnerSide,
    winner,
    loser,
    netRatio: clamped,
    summaryReason,
  };
}
