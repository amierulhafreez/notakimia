import React, { useState } from 'react';
import { analytics } from '../services/analytics';
import confetti from 'canvas-confetti';
import {
  TextbookAtomDiagram,
  ElectronShellBreakdown,
  AtomDiagramVariant,
} from '../components/TextbookAtomDiagram';
import {
  Flame,
  Droplets,
  Wind,
  Sparkles,
  ArrowDown,
  ArrowUp,
  Layers,
  FlaskConical,
  Scale,
  Play,
  RotateCcw,
  Atom,
  Info,
  ShieldAlert,
} from 'lucide-react';

type GroupId = 'k1' | 'k17';
type ActiveTab = 'physical' | 'chemical' | 'compare';
type K1Reagent = 'water' | 'oxygen' | 'chlorine';
type K17Reagent = 'water' | 'iron' | 'naoh';

interface ReactionEntry {
  reactivityLabel: string;
  reactivityLevel: number; // 1 to 5
  observation: string;
  equation: string;
  productNote: string;
  visualBadge: string;
  visualColor: string;
}

interface ElementCardData {
  id: string;
  group: GroupId;
  symbol: string;
  formulaDisplay: string; // cth: Li atau F₂
  name: string;
  protonNumber: number;
  relativeMass: string;
  electronConfig: string;
  shells: number[];
  atomicRadiusNm?: string; // Jadual 4.3 untuk Li, Na, K
  meltingPointC: number;
  boilingPointC: number;
  densityGcm3: number;
  physicalState: 'Pepejal' | 'Cecair' | 'Gas';
  appearance: string;
  headerGradient: string;
  swatchClass: string;
  badgeText?: string;
  k1Reactions?: Record<K1Reagent, ReactionEntry>;
  k17Reactions?: Record<K17Reagent, ReactionEntry>;
  reactivitySummary: string;
}

const SIM_ID = 'kereaktifan-k1-dan-k17';

// Data disahkan mengikut Buku Teks Kimia Tingkatan 4 KSSM:
// Jadual 4.3 (m.s. 88), Eksperimen 4.1 (m.s. 88-90), Rajah 4.9 (m.s. 91),
// Jadual 4.6 (m.s. 93), Aktiviti 4.6 (m.s. 94), Rajah 4.11 (m.s. 95) & Jadual Data Unsur (m.s. 276).
const K1_ELEMENTS: ElementCardData[] = [
  {
    id: 'li',
    group: 'k1',
    symbol: 'Li',
    formulaDisplay: 'Li',
    name: 'Litium',
    protonNumber: 3,
    relativeMass: '7',
    electronConfig: '2.1',
    shells: [2, 1],
    atomicRadiusNm: '0.133',
    meltingPointC: 186,
    boilingPointC: 1342,
    densityGcm3: 0.534,
    physicalState: 'Pepejal',
    appearance: 'Logam lembut kelabu berkilat',
    headerGradient: 'from-slate-100 to-zinc-200 text-slate-900 border-slate-300',
    swatchClass: 'bg-slate-300',
    badgeText: 'Eksperimen 4.1',
    reactivitySummary:
      'Saiz atom paling kecil (2 petala). Daya tarikan nukleus terhadap 1 elektron valens paling kuat; paling sukar menderma elektron.',
    k1Reactions: {
      water: {
        reactivityLabel: 'Perlahan & Tenang',
        reactivityLevel: 2,
        observation:
          'Terapung dan bergerak perlahan di permukaan air dengan desiran lembut membebaskan gas H₂. Larutan menukarkan litmus merah ke biru.',
        equation: '2Li(p) + 2H₂O(ce) → 2LiOH(ak) + H₂(g)',
        productNote: 'Larutan litium hidroksida (beralkali) + gas hidrogen',
        visualBadge: 'Desiran Lembut',
        visualColor: 'bg-sky-500',
      },
      oxygen: {
        reactivityLabel: 'Perlahan (Nyalaan Merah)',
        reactivityLevel: 2,
        observation:
          'Terbakar perlahan dengan nyalaan merah menghasilkan pepejal putih. Pepejal larut dalam air membentuk larutan beralkali.',
        equation: '4Li(p) + O₂(g) → 2Li₂O(p)',
        productNote: 'Litium oksida (Li₂O + H₂O → 2LiOH)',
        visualBadge: 'Nyalaan Merah',
        visualColor: 'bg-red-500',
      },
      chlorine: {
        reactivityLabel: 'Perlahan (Nyalaan Merah)',
        reactivityLevel: 2,
        observation:
          'Terbakar perlahan dengan nyalaan merah menghasilkan pepejal putih litium klorida.',
        equation: '2Li(p) + Cl₂(g) → 2LiCl(p)',
        productNote: 'Pepejal putih litium klorida',
        visualBadge: 'Pepejal Putih',
        visualColor: 'bg-red-400',
      },
    },
  },
  {
    id: 'na',
    group: 'k1',
    symbol: 'Na',
    formulaDisplay: 'Na',
    name: 'Natrium',
    protonNumber: 11,
    relativeMass: '23',
    electronConfig: '2.8.1',
    shells: [2, 8, 1],
    atomicRadiusNm: '0.186',
    meltingPointC: 98,
    boilingPointC: 880,
    densityGcm3: 0.971,
    physicalState: 'Pepejal',
    appearance: 'Logam sangat lembut kelabu berkilat',
    headerGradient: 'from-amber-50 to-slate-200 text-slate-900 border-amber-300',
    swatchClass: 'bg-slate-200',
    badgeText: 'Eksperimen 4.1',
    reactivitySummary:
      'Saiz atom lebih besar daripada Li (3 petala). Elektron valens lebih jauh dari nukleus; lebih mudah didermakan.',
    k1Reactions: {
      water: {
        reactivityLabel: 'Cergas & Pantas',
        reactivityLevel: 3,
        observation:
          'Melebur menjadi bebola perak berkilat, bergerak laju secara rawak di permukaan air dengan desiran kuat dan nyalaan kuning.',
        equation: '2Na(p) + 2H₂O(ce) → 2NaOH(ak) + H₂(g)',
        productNote: 'Larutan natrium hidroksida (beralkali) + gas hidrogen',
        visualBadge: 'Nyalaan Kuning',
        visualColor: 'bg-amber-400',
      },
      oxygen: {
        reactivityLabel: 'Cergas (Nyalaan Kuning)',
        reactivityLevel: 3,
        observation:
          'Terbakar cergas dengan nyalaan kuning terang menghasilkan pepejal putih natrium oksida yang melarut membentuk alkali.',
        equation: '4Na(p) + O₂(g) → 2Na₂O(p)',
        productNote: 'Natrium oksida (Na₂O + H₂O → 2NaOH)',
        visualBadge: 'Nyalaan Kuning Terang',
        visualColor: 'bg-yellow-400',
      },
      chlorine: {
        reactivityLabel: 'Cergas (Nyalaan Kuning)',
        reactivityLevel: 3,
        observation:
          'Terbakar cergas dengan nyalaan kuning terang menghasilkan pepejal putih natrium klorida.',
        equation: '2Na(p) + Cl₂(g) → 2NaCl(p)',
        productNote: 'Pepejal putih natrium klorida',
        visualBadge: 'Nyalaan Kuning',
        visualColor: 'bg-amber-400',
      },
    },
  },
  {
    id: 'k',
    group: 'k1',
    symbol: 'K',
    formulaDisplay: 'K',
    name: 'Kalium',
    protonNumber: 19,
    relativeMass: '39',
    electronConfig: '2.8.8.1',
    shells: [2, 8, 8, 1],
    atomicRadiusNm: '0.203',
    meltingPointC: 64,
    boilingPointC: 760,
    densityGcm3: 0.862,
    physicalState: 'Pepejal',
    appearance: 'Logam amat lembut kelabu berkilat',
    headerGradient: 'from-purple-50 to-slate-200 text-slate-900 border-purple-300',
    swatchClass: 'bg-zinc-200',
    badgeText: 'Eksperimen 4.1',
    reactivitySummary:
      'Saiz atom lebih besar (4 petala). Daya tarikan nukleus lebih lemah berbanding Na; elektron valens sangat mudah dilepaskan.',
    k1Reactions: {
      water: {
        reactivityLabel: 'Sangat Cergas (Letupan Kecil)',
        reactivityLevel: 4,
        observation:
          'Terbakar serta-merta dengan nyalaan ungu, mendesir sangat kuat dan menghasilkan letupan kecil ("pop").',
        equation: '2K(p) + 2H₂O(ce) → 2KOH(ak) + H₂(g)',
        productNote: 'Larutan kalium hidroksida (beralkali) + gas hidrogen',
        visualBadge: 'Nyalaan Ungu',
        visualColor: 'bg-purple-500',
      },
      oxygen: {
        reactivityLabel: 'Sangat Cergas (Nyalaan Ungu)',
        reactivityLevel: 4,
        observation:
          'Terbakar sangat cergas dengan nyalaan ungu terang menghasilkan pepejal putih kalium oksida.',
        equation: '4K(p) + O₂(g) → 2K₂O(p)',
        productNote: 'Kalium oksida (K₂O + H₂O → 2KOH)',
        visualBadge: 'Nyalaan Ungu Terang',
        visualColor: 'bg-violet-500',
      },
      chlorine: {
        reactivityLabel: 'Sangat Cergas (Nyalaan Ungu)',
        reactivityLevel: 4,
        observation:
          'Terbakar amat cergas dengan nyalaan ungu terang menghasilkan pepejal putih kalium klorida.',
        equation: '2K(p) + Cl₂(g) → 2KCl(p)',
        productNote: 'Pepejal putih kalium klorida',
        visualBadge: 'Nyalaan Ungu',
        visualColor: 'bg-purple-500',
      },
    },
  },
  {
    id: 'rb',
    group: 'k1',
    symbol: 'Rb',
    formulaDisplay: 'Rb',
    name: 'Rubidium',
    protonNumber: 37,
    relativeMass: '85.5',
    electronConfig: '2.8.18.8.1',
    shells: [2, 8, 18, 8, 1],
    meltingPointC: 39,
    boilingPointC: 705,
    densityGcm3: 1.53,
    physicalState: 'Pepejal',
    appearance: 'Logam amat lembut kelabu berkilat',
    headerGradient: 'from-orange-50 to-amber-100 text-slate-900 border-orange-300',
    swatchClass: 'bg-stone-300',
    badgeText: 'SP 4.4.4',
    reactivitySummary:
      '5 petala berisi elektron. Saiz atom jauh lebih besar daripada K; elektron valens amat mudah didermakan dan menyala spontan di udara.',
    k1Reactions: {
      water: {
        reactivityLabel: 'Amat Cergas & Meletup',
        reactivityLevel: 5,
        observation:
          'Bertindak balas secara meletup serta-merta dengan air (lebih cergas daripada K) membebaskan gas H₂.',
        equation: '2Rb(p) + 2H₂O(ce) → 2RbOH(ak) + H₂(g)',
        productNote: 'Larutan rubidium hidroksida + gas hidrogen',
        visualBadge: 'Letupan Kuat',
        visualColor: 'bg-orange-600',
      },
      oxygen: {
        reactivityLabel: 'Amat Cergas (Mudah Terbakar)',
        reactivityLevel: 5,
        observation:
          'Sangat aktif dan mudah terbakar secara spontan apabila terdedah kepada oksigen/udara.',
        equation: '4Rb(p) + O₂(g) → 2Rb₂O(p)',
        productNote: 'Rubidium oksida (sifat alkali kuat)',
        visualBadge: 'Terbakar Spontan',
        visualColor: 'bg-orange-500',
      },
      chlorine: {
        reactivityLabel: 'Amat Cergas',
        reactivityLevel: 5,
        observation:
          'Bertindak balas dengan amat pantas dan ganas dengan gas klorin menghasilkan pepejal putih RbCl.',
        equation: '2Rb(p) + Cl₂(g) → 2RbCl(p)',
        productNote: 'Pepejal putih rubidium klorida',
        visualBadge: 'Tindak Balas Ganas',
        visualColor: 'bg-orange-600',
      },
    },
  },
  {
    id: 'cs',
    group: 'k1',
    symbol: 'Cs',
    formulaDisplay: 'Cs',
    name: 'Sesium',
    protonNumber: 55,
    relativeMass: '133',
    electronConfig: '2.8.18.18.8.1',
    shells: [2, 8, 18, 18, 8, 1],
    meltingPointC: 29,
    boilingPointC: 670,
    densityGcm3: 1.873,
    physicalState: 'Pepejal',
    appearance: 'Logam amat lembut berkilat (lebur ~29 °C)',
    headerGradient: 'from-rose-50 to-orange-100 text-slate-900 border-rose-300',
    swatchClass: 'bg-amber-200',
    badgeText: 'SP 4.4.4',
    reactivitySummary:
      '6 petala berisi elektron (saiz terbesar antara logam stabil K1). Daya tarikan nukleus terlemah; paling reaktif antara Li–Cs.',
    k1Reactions: {
      water: {
        reactivityLabel: 'Letupan Paling Ganas',
        reactivityLevel: 5,
        observation:
          'Bertindak balas secara serta-merta dengan letupan amat kuat apabila menyentuh air.',
        equation: '2Cs(p) + 2H₂O(ce) → 2CsOH(ak) + H₂(g)',
        productNote: 'Larutan sesium hidroksida + gas hidrogen',
        visualBadge: 'Paling Reaktif',
        visualColor: 'bg-rose-600',
      },
      oxygen: {
        reactivityLabel: 'Terbakar Serta-merta',
        reactivityLevel: 5,
        observation:
          'Sangat aktif dan terus menyala secara spontan dalam gas oksigen dengan pembebasan haba yang tinggi.',
        equation: '4Cs(p) + O₂(g) → 2Cs₂O(p)',
        productNote: 'Sesium oksida',
        visualBadge: 'Nyalaan Spontan',
        visualColor: 'bg-rose-500',
      },
      chlorine: {
        reactivityLabel: 'Paling Cergas',
        reactivityLevel: 5,
        observation:
          'Bertindak balas paling cergas dengan gas klorin membentuk pepejal putih sesium klorida.',
        equation: '2Cs(p) + Cl₂(g) → 2CsCl(p)',
        productNote: 'Pepejal putih sesium klorida',
        visualBadge: 'Amat Cergas',
        visualColor: 'bg-rose-600',
      },
    },
  },
];

const K17_ELEMENTS: ElementCardData[] = [
  {
    id: 'f2',
    group: 'k17',
    symbol: 'F',
    formulaDisplay: 'F₂',
    name: 'Fluorin',
    protonNumber: 9,
    relativeMass: '19',
    electronConfig: '2.7',
    shells: [2, 7],
    meltingPointC: -220,
    boilingPointC: -188,
    densityGcm3: 0.0016,
    physicalState: 'Gas',
    appearance: 'Gas beracun kuning muda',
    headerGradient: 'from-yellow-50 to-yellow-100 text-yellow-950 border-yellow-300',
    swatchClass: 'bg-yellow-200',
    badgeText: 'SP 4.5.4 (Ramalan)',
    reactivitySummary:
      'Saiz atom paling kecil (2 petala). Petala valens paling hampir dengan nukleus; daya tarikan paling kuat untuk menarik 1 elektron → PALING REAKTIF.',
    k17Reactions: {
      water: {
        reactivityLabel: 'Amat Cergas & Mengakis',
        reactivityLevel: 5,
        observation:
          'Gas kuning muda sangat reaktif yang bertindak balas dengan air secara cergas (menghasilkan HF dan oksigen/ozon); sangat berbahaya.',
        equation: '2F₂(g) + 2H₂O(ce) → 4HF(ak) + O₂(g)',
        productNote: 'Asid hidrofluorik & gas oksigen (ramalan SP 4.5.4)',
        visualBadge: 'Sangat Ganas',
        visualColor: 'bg-yellow-500',
      },
      iron: {
        reactivityLabel: 'Paling Cergas (Terbakar Terang)',
        reactivityLevel: 5,
        observation:
          'Bertindak balas paling cergas walaupun tanpa pemanasan kuat, membakar wul besi membentuk ferum(III) fluorida.',
        equation: '2Fe(p) + 3F₂(g) → 2FeF₃(p)',
        productNote: 'Pepejal ferum(III) fluorida',
        visualBadge: 'Menyala Spontan',
        visualColor: 'bg-yellow-500',
      },
      naoh: {
        reactivityLabel: 'Paling Cergas',
        reactivityLevel: 5,
        observation:
          'Bertindak balas paling pantas dengan larutan alkali natrium hidroksida kerana kereaktifan tertinggi Kumpulan 17.',
        equation: '2F₂(g) + 2NaOH(ak) → 2NaF(ak) + OF₂(g) + H₂O(ce)',
        productNote: 'Garam natrium fluorida (tindak balas amat cergas)',
        visualBadge: 'Paling Pantas',
        visualColor: 'bg-yellow-500',
      },
    },
  },
  {
    id: 'cl2',
    group: 'k17',
    symbol: 'Cl',
    formulaDisplay: 'Cl₂',
    name: 'Klorin',
    protonNumber: 17,
    relativeMass: '35.5',
    electronConfig: '2.8.7',
    shells: [2, 8, 7],
    meltingPointC: -101,
    boilingPointC: -34,
    densityGcm3: 0.003,
    physicalState: 'Gas',
    appearance: 'Gas kuning kehijauan',
    headerGradient: 'from-lime-50 to-emerald-100 text-emerald-950 border-lime-400',
    swatchClass: 'bg-lime-300',
    badgeText: 'Jadual 4.6',
    reactivitySummary:
      '3 petala berisi elektron. Tarikan nukleus terhadap elektron luar masih kuat; mudah menerima 1 elektron membentuk Cl⁻.',
    k17Reactions: {
      water: {
        reactivityLabel: 'Cergas (Peluntur Kuat)',
        reactivityLevel: 4,
        observation:
          'Larut cepat dalam air menghasilkan larutan kuning pucat berasid. Menukarkan litmus biru lembap ke merah lalu melunturkannya.',
        equation: 'Cl₂(g) + H₂O(ce) ⇌ HCl(ak) + HOCl(ak)',
        productNote: 'Asid hidroklorik + asid hipoklorus (agen peluntur)',
        visualBadge: 'Meluntur Cepat',
        visualColor: 'bg-lime-500',
      },
      iron: {
        reactivityLabel: 'Cergas (Menyala Terang)',
        reactivityLevel: 4,
        observation:
          'Wul besi panas menyala dengan terang dan cergas menghasilkan pepejal berwarna perang ferum(III) klorida.',
        equation: '2Fe(p) + 3Cl₂(g) → 2FeCl₃(p)',
        productNote: 'Pepejal perang ferum(III) klorida',
        visualBadge: 'Menyala Terang',
        visualColor: 'bg-lime-600',
      },
      naoh: {
        reactivityLabel: 'Cergas (Nyahwarna Pantas)',
        reactivityLevel: 4,
        observation:
          'Gas kuning kehijauan bertindak balas cepat dan dinyahwarnakan serta-merta membentuk larutan tidak berwarna.',
        equation: 'Cl₂(g) + 2NaOH(ak) → NaCl(ak) + NaOCl(ak) + H₂O(ce)',
        productNote: 'Natrium klorida + natrium klorat(I) + air',
        visualBadge: 'Nyahwarna Cepat',
        visualColor: 'bg-emerald-500',
      },
    },
  },
  {
    id: 'br2',
    group: 'k17',
    symbol: 'Br',
    formulaDisplay: 'Br₂',
    name: 'Bromin',
    protonNumber: 35,
    relativeMass: '80',
    electronConfig: '2.8.18.7',
    shells: [2, 8, 18, 7],
    meltingPointC: -7,
    boilingPointC: 59,
    densityGcm3: 3.119,
    physicalState: 'Cecair',
    appearance: 'Cecair perang kemerahan (mudah meruap)',
    headerGradient: 'from-orange-100 to-rose-100 text-rose-950 border-orange-400',
    swatchClass: 'bg-amber-700',
    badgeText: 'Jadual 4.6',
    reactivitySummary:
      '4 petala berisi elektron. Saiz atom lebih besar daripada Cl; daya tarikan nukleus lebih lemah menyebabkan penerimaan elektron lebih perlahan.',
    k17Reactions: {
      water: {
        reactivityLabel: 'Sederhana (Peluntur Lemah)',
        reactivityLevel: 3,
        observation:
          'Larut perlahan membentuk larutan perang kekuningan berasid. Kertas litmus biru bertukar merah lalu dilunturkan secara perlahan.',
        equation: 'Br₂(ce) + H₂O(ce) ⇌ HBr(ak) + HOBr(ak)',
        productNote: 'Asid hidrobromik + asid hipobromus',
        visualBadge: 'Meluntur Perlahan',
        visualColor: 'bg-amber-600',
      },
      iron: {
        reactivityLabel: 'Sederhana (Membara Sederhana)',
        reactivityLevel: 3,
        observation:
          'Wul besi panas membara sederhana terang dalam wap bromin menghasilkan pepejal berwarna perang ferum(III) bromida.',
        equation: '2Fe(p) + 3Br₂(ce) → 2FeBr₃(p)',
        productNote: 'Pepejal perang ferum(III) bromida (m.s. 94)',
        visualBadge: 'Membara Sederhana',
        visualColor: 'bg-amber-700',
      },
      naoh: {
        reactivityLabel: 'Sederhana',
        reactivityLevel: 3,
        observation:
          'Cecair bromin perang kemerahan bertindak balas agak cepat dan dinyahwarnakan membentuk larutan tidak berwarna.',
        equation: 'Br₂(ce) + 2NaOH(ak) → NaBr(ak) + NaOBr(ak) + H₂O(ce)',
        productNote: 'Natrium bromida + natrium bromat(I) + air',
        visualBadge: 'Nyahwarna Sederhana',
        visualColor: 'bg-orange-600',
      },
    },
  },
  {
    id: 'i2',
    group: 'k17',
    symbol: 'I',
    formulaDisplay: 'I₂',
    name: 'Iodin',
    protonNumber: 53,
    relativeMass: '127',
    electronConfig: '2.8.18.18.7',
    shells: [2, 8, 18, 18, 7],
    meltingPointC: 114,
    boilingPointC: 184,
    densityGcm3: 4.95,
    physicalState: 'Pepejal',
    appearance: 'Pepejal hitam keunguan',
    headerGradient: 'from-purple-100 to-slate-200 text-purple-950 border-purple-400',
    swatchClass: 'bg-purple-900',
    badgeText: 'Jadual 4.6',
    reactivitySummary:
      '5 petala berisi elektron. Petala valens sangat jauh dari nukleus; tarikan nukleus lemah menyebabkan kesukaran menarik 1 elektron → PALING KURANG REAKTIF (F₂ > Cl₂ > Br₂ > I₂).',
    k17Reactions: {
      water: {
        reactivityLabel: 'Sangat Perlahan (Tiada Pelunturan)',
        reactivityLevel: 1,
        observation:
          'Sangat sedikit larut dalam air menghasilkan larutan perang pucat berasid lemah. Litmus biru menjadi merah pucat dan tidak dilunturkan.',
        equation: 'I₂(p) + H₂O(ce) ⇌ HI(ak) + HOI(ak)',
        productNote: 'Asid hidroiodik + asid hipoiodus (pelunturan sangat lemah)',
        visualBadge: 'Sangat Perlahan',
        visualColor: 'bg-purple-700',
      },
      iron: {
        reactivityLabel: 'Perlahan (Membara Malap)',
        reactivityLevel: 1,
        observation:
          'Wul besi panas hanya membara secara malap dan perlahan dengan wap iodin membentuk pepejal perang ferum(III) iodida.',
        equation: '2Fe(p) + 3I₂(p) → 2FeI₃(p)',
        productNote: 'Pepejal perang ferum(III) iodida',
        visualBadge: 'Membara Malap',
        visualColor: 'bg-purple-800',
      },
      naoh: {
        reactivityLabel: 'Perlahan (Perlu Pemanasan/Goncangan)',
        reactivityLevel: 1,
        observation:
          'Pepejal hitam keunguan bertindak balas perlahan dengan NaOH dan mengambil masa lebih lama untuk dinyahwarnakan.',
        equation: 'I₂(p) + 2NaOH(ak) → NaI(ak) + NaOI(ak) + H₂O(ce)',
        productNote: 'Natrium iodida + natrium iodat(I) + air (m.s. 94)',
        visualBadge: 'Nyahwarna Perlahan',
        visualColor: 'bg-purple-700',
      },
    },
  },
];

// Bilangan neutron berdasarkan nombor nukleon lazim mengikut Jadual Data Unsur m.s. 276
const NEUTRONS_BY_ID: Record<string, number> = {
  li: 4,
  na: 12,
  k: 20,
  rb: 48,
  cs: 78,
  f2: 10,
  cl2: 18,
  br2: 45,
  i2: 74,
};

// Format persamaan kimia agar nombor subskrip kelihatan kemas
const ChemText: React.FC<{ text: string }> = ({ text }) => {
  const tokens = text.split(/(₂|₃|₄|₇|⁺|⁻)/g);
  const subLookup: Record<string, string> = {
    '₂': '2',
    '₃': '3',
    '₄': '4',
    '₇': '7',
  };
  return (
    <>
      {tokens.map((part, i) => {
        if (subLookup[part]) return <sub key={i}>{subLookup[part]}</sub>;
        if (part === '⁺') return <sup key={i}>+</sup>;
        if (part === '⁻') return <sup key={i}>−</sup>;
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
};

export const ReactivityLab: React.FC = () => {
  const [group, setGroup] = useState<GroupId>('k1');
  const [activeTab, setActiveTab] = useState<ActiveTab>('physical');
  const [atomVariant, setAtomVariant] = useState<AtomDiagramVariant>('electron-arrangement');
  const [selectedIds, setSelectedIds] = useState<[string, string]>(['li', 'k']);
  const [k1Reagent, setK1Reagent] = useState<K1Reagent>('water');
  const [k17Reagent, setK17Reagent] = useState<K17Reagent>('water');
  const [simRunning, setSimRunning] = useState<boolean>(false);
  const [simTested, setSimTested] = useState<boolean>(false);

  // Pasangan untuk Tab Perbandingan K1 vs K17
  const [pairK1, setPairK1] = useState<string>('na');
  const [pairK17, setPairK17] = useState<string>('cl2');

  const elements = group === 'k1' ? K1_ELEMENTS : K17_ELEMENTS;

  const handleGroupSwitch = (nextGroup: GroupId) => {
    setGroup(nextGroup);
    setSelectedIds(nextGroup === 'k1' ? ['li', 'k'] : ['cl2', 'i2']);
    setSimRunning(false);
    setSimTested(false);
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  const handleCardSelectForCompare = (id: string) => {
    analytics.recordSimulationClick(SIM_ID, 1);
    setSelectedIds(([, second]) => (second === id ? selectedIds : [second, id]));
  };

  const handleTriggerReactions = () => {
    setSimRunning(true);
    setSimTested(false);
    analytics.recordSimulationClick(SIM_ID, 1);
    setTimeout(() => {
      setSimRunning(false);
      setSimTested(true);
      analytics.recordSimulationCompleted(SIM_ID);
      confetti({ particleCount: 55, spread: 55, origin: { y: 0.65 } });
    }, 900);
  };

  const cardA = elements.find((e) => e.id === selectedIds[0]) ?? elements[0];
  const cardB = elements.find((e) => e.id === selectedIds[1]) ?? elements[elements.length - 1];

  // Julat takat didih untuk bar perbandingan visual
  const bpMin = group === 'k1' ? 600 : -200;
  const bpMax = group === 'k1' ? 1400 : 200;
  const getBpBarPct = (bp: number) =>
    Math.max(8, Math.min(100, Math.round(((bp - bpMin) / (bpMax - bpMin)) * 100)));

  return (
    <div className="space-y-3">
      {/* Bar Kawalan Atas Padat */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5">
        {/* Pemilih Kumpulan 1 vs Kumpulan 17 */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleGroupSwitch('k1')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer ${
              group === 'k1' && activeTab !== 'compare'
                ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/25'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-orange-50'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Kumpulan 1 (Logam Alkali)
          </button>
          <button
            onClick={() => handleGroupSwitch('k17')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer ${
              group === 'k17' && activeTab !== 'compare'
                ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/25'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-sky-50'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            Kumpulan 17 (Halogen)
          </button>
        </div>

        {/* Penukar Tab Paparan */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => {
              setActiveTab('physical');
              analytics.recordSimulationClick(SIM_ID, 1);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'physical'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Kad Sifat Fizik
          </button>
          <button
            onClick={() => {
              setActiveTab('chemical');
              analytics.recordSimulationClick(SIM_ID, 1);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'chemical'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            Sifat Kimia &amp; Persamaan
          </button>
          <button
            onClick={() => {
              setActiveTab('compare');
              analytics.recordSimulationClick(SIM_ID, 1);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'compare'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/25'
                : 'bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            Kereaktifan K1 vs K17
          </button>
        </div>
      </div>

      {/* TAB 1: KAD PERBANDINGAN SIFAT FIZIK MENURUNI KUMPULAN */}
      {activeTab === 'physical' && (
        <div className="space-y-2.5">
          {/* Penukar Gaya Rajah Buku Teks (Susunan Elektron vs Struktur Atom p & n) */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[11px]">
            <span className="font-semibold text-slate-600 flex items-center gap-1.5">
              <Atom className="w-3.5 h-3.5 text-orange-600" />
              <span>
                Rajah berpandukan Buku Teks Kimia T4 KSSM (Rajah 2.13–2.14, 4.9 &amp; 4.11) — setiap titik jingga = 1 elektron.
              </span>
            </span>
            <div className="inline-flex bg-slate-100 border border-slate-200 rounded-lg p-0.5 shrink-0">
              <button
                type="button"
                onClick={() => setAtomVariant('electron-arrangement')}
                className={`px-2 py-0.5 rounded-md font-bold transition cursor-pointer ${
                  atomVariant === 'electron-arrangement'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Susunan Elektron (Simbol)
              </button>
              <button
                type="button"
                onClick={() => setAtomVariant('atomic-structure')}
                className={`px-2 py-0.5 rounded-md font-bold transition cursor-pointer ${
                  atomVariant === 'atomic-structure'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Struktur Atom (p &amp; n)
              </button>
            </div>
          </div>

          {/* Siri Kad Unsur Sebelah-Menyebelah */}
          <div
            className={`grid gap-2.5 ${
              group === 'k1'
                ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
                : 'grid-cols-2 sm:grid-cols-4'
            }`}
          >
            {elements.map((el, idx) => {
              const isCompared = selectedIds[0] === el.id || selectedIds[1] === el.id;
              const slotTag =
                selectedIds[0] === el.id ? 'KAD A' : selectedIds[1] === el.id ? 'KAD B' : null;
              return (
                <button
                  key={el.id}
                  type="button"
                  onClick={() => handleCardSelectForCompare(el.id)}
                  className={`group text-left bg-white rounded-2xl border overflow-hidden transition flex flex-col justify-between cursor-pointer ${
                    isCompared
                      ? group === 'k1'
                        ? 'border-orange-500 ring-2 ring-orange-300/60 shadow-md'
                        : 'border-sky-500 ring-2 ring-sky-300/60 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  {/* Kepala Kad dengan Warna Sebenar Unsur */}
                  <div
                    className={`bg-gradient-to-br ${el.headerGradient} px-2.5 py-1.5 border-b flex items-start justify-between gap-1`}
                  >
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-white/80 text-slate-800 border border-black/10">
                          {el.protonNumber}p • {NEUTRONS_BY_ID[el.id]}n
                        </span>
                        <span className="text-[10px] font-semibold opacity-75">
                          Kala {idx + 2}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-lg font-black tracking-tight">
                          <ChemText text={el.formulaDisplay} />
                        </span>
                        <span className="text-xs font-extrabold">{el.name}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {slotTag ? (
                        <span
                          className={`text-[9px] font-black px-1.5 py-0.5 rounded text-white ${
                            group === 'k1' ? 'bg-orange-600' : 'bg-sky-600'
                          }`}
                        >
                          {slotTag}
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/75 text-slate-700 border border-black/10">
                          {el.physicalState}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rajah Piawai Buku Teks + Bilangan Petala & Elektron Setiap Petala */}
                  <div className="px-2.5 py-2 bg-slate-50/70 border-b border-slate-100 space-y-1.5">
                    <div className="flex justify-center">
                      <TextbookAtomDiagram
                        symbol={el.symbol}
                        shells={el.shells}
                        protonNumber={el.protonNumber}
                        neutronNumber={NEUTRONS_BY_ID[el.id]}
                        variant={atomVariant}
                        nucleusFill={group === 'k1' ? '#bbf7d0' : '#bae6fd'}
                        className="w-24 h-24"
                      />
                    </div>
                    <ElectronShellBreakdown
                      shells={el.shells}
                      protonNumber={el.protonNumber}
                    />
                  </div>

                  {/* Statistik Sifat Fizik Pada Kad */}
                  <div className="p-2.5 space-y-1 text-[11px] flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Takat Lebur / Didih</span>
                        <span className="font-mono font-extrabold text-slate-900">
                          {el.meltingPointC}° / {el.boilingPointC}°C
                        </span>
                      </div>
                      {/* Bar Visual Takat Didih */}
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          style={{ width: `${getBpBarPct(el.boilingPointC)}%` }}
                          className={`h-full rounded-full ${
                            group === 'k1' ? 'bg-orange-500' : 'bg-sky-500'
                          }`}
                        />
                      </div>
                      <div className="flex justify-between items-center pt-0.5">
                        <span className="text-slate-500">Ketumpatan</span>
                        <span className="font-mono font-bold text-slate-800">
                          {el.densityGcm3.toFixed(el.group === 'k1' ? 3 : 4)} g cm⁻³
                        </span>
                      </div>
                      {el.atomicRadiusNm && (
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500">Jejari Atom (JAR {el.relativeMass})</span>
                          <span className="font-mono font-bold text-orange-700">
                            {el.atomicRadiusNm} nm
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-1 border-t border-slate-100 flex items-center justify-between gap-1.5">
                      <span className="flex items-center gap-1.5 text-[10px] text-slate-600 truncate">
                        <span
                          className={`w-2.5 h-2.5 rounded-full shrink-0 border border-black/20 ${el.swatchClass}`}
                        />
                        <span className="truncate">{el.appearance}</span>
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Panel Bawah: Perbandingan Kad A vs Kad B + Rumusan Trend KSSM */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5">
            {/* Perbandingan Pantas 2 Kad Pilihan */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between gap-2 pb-1 border-b border-slate-100">
                <span className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wide">
                  Bandingkan 2 Kad ({cardA.symbol} vs {cardB.symbol})
                </span>
                <span className="text-[10px] text-slate-500">Klik mana-mana kad di atas</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-50 rounded-xl p-1.5 border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Petala &amp; Elektron</span>
                  <span className="font-extrabold text-slate-900">
                    {cardA.shells.length} ({cardA.protonNumber}e⁻) → {cardB.shells.length} ({cardB.protonNumber}e⁻)
                  </span>
                </div>
                <div className="bg-slate-50 rounded-xl p-1.5 border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Takat Lebur</span>
                  <span className="font-extrabold text-slate-900">
                    {cardA.meltingPointC}° → {cardB.meltingPointC}°
                  </span>
                </div>
                <div className="bg-slate-50 rounded-xl p-1.5 border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Takat Didih</span>
                  <span className="font-extrabold text-slate-900">
                    {cardA.boilingPointC}° → {cardB.boilingPointC}°
                  </span>
                </div>
              </div>
              <div className="text-[10px] text-slate-600 bg-slate-50 rounded-lg px-2 py-1 border border-slate-100 flex justify-between gap-2">
                <span>
                  <strong>{cardA.symbol}:</strong> {cardA.electronConfig}
                </span>
                <span className="text-slate-400">|</span>
                <span>
                  <strong>{cardB.symbol}:</strong> {cardB.electronConfig}
                </span>
              </div>
            </div>

            {/* Rumusan Perubahan Sifat Fizik Menuruni Kumpulan */}
            <div
              className={`lg:col-span-7 rounded-2xl p-3 border text-xs space-y-1.5 ${
                group === 'k1'
                  ? 'bg-orange-50/80 border-orange-200 text-orange-950'
                  : 'bg-sky-50/80 border-sky-200 text-sky-950'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-extrabold flex items-center gap-1.5">
                  <Info className="w-4 h-4 shrink-0" />
                  {group === 'k1'
                    ? 'Rumusan Sifat Fizik Menuruni Kumpulan 1 (Jadual 4.3, m.s. 88)'
                    : 'Rumusan Sifat Fizik Menuruni Kumpulan 17 (Jadual 4.6, m.s. 93)'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 border border-black/10">
                  {group === 'k1' ? 'Fr (87): Radioaktif' : 'At (85): Radioaktif'}
                </span>
              </div>

              {group === 'k1' ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  <div className="bg-white/90 rounded-xl p-2 border border-orange-200/70">
                    <span className="font-extrabold text-orange-800 flex items-center gap-1">
                      <ArrowUp className="w-3 h-3" /> Saiz &amp; Ketumpatan
                    </span>
                    <p className="text-slate-600 mt-0.5">
                      Bilangan petala &amp; jejari atom bertambah. Li, Na, K berketumpatan &lt; 1.0 g cm⁻³ (terapung atas air).
                    </p>
                  </div>
                  <div className="bg-white/90 rounded-xl p-2 border border-orange-200/70">
                    <span className="font-extrabold text-rose-700 flex items-center gap-1">
                      <ArrowDown className="w-3 h-3" /> Takat Lebur &amp; Didih
                    </span>
                    <p className="text-slate-600 mt-0.5">
                      Saiz atom bertambah → <strong>ikatan logam menjadi lemah</strong> → kurang haba diperlukan untuk memutuskannya.
                    </p>
                  </div>
                  <div className="bg-white/90 rounded-xl p-2 border border-orange-200/70">
                    <span className="font-extrabold text-slate-800">Keadaan &amp; Kekerasan</span>
                    <p className="text-slate-600 mt-0.5">
                      Semua pepejal lembut kelabu berkilat, mudah dipotong dengan pisau dan semakin lembut menuruni kumpulan.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  <div className="bg-white/90 rounded-xl p-2 border border-sky-200/70">
                    <span className="font-extrabold text-sky-800 flex items-center gap-1">
                      <ArrowUp className="w-3 h-3" /> Takat Lebur &amp; Didih
                    </span>
                    <p className="text-slate-600 mt-0.5">
                      Saiz molekul dwiatom bertambah → <strong>daya tarikan antara molekul lebih kuat</strong> → lebih banyak haba diperlukan.
                    </p>
                  </div>
                  <div className="bg-white/90 rounded-xl p-2 border border-sky-200/70">
                    <span className="font-extrabold text-sky-900">Keadaan Fizik (Suhu Bilik)</span>
                    <p className="text-slate-600 mt-0.5">
                      Berubah daripada <strong>Gas</strong> (F₂, Cl₂) → <strong>Cecair</strong> (Br₂) → <strong>Pepejal</strong> (I₂); ketumpatan turut meningkat.
                    </p>
                  </div>
                  <div className="bg-white/90 rounded-xl p-2 border border-sky-200/70">
                    <span className="font-extrabold text-purple-900">Warna Semakin Gelap</span>
                    <p className="text-slate-600 mt-0.5">
                      Kuning muda (F₂) → Kuning kehijauan (Cl₂) → Perang kemerahan (Br₂) → Hitam keunguan (I₂).
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SIFAT KIMIA & PERSAMAAN KIMIA TINDAK BALAS */}
      {activeTab === 'chemical' && (
        <div className="space-y-2.5">
          {/* Bar Pemilihan Reagen Tindak Balas + Butang Uji Serentak */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-white border border-slate-200 rounded-2xl px-3.5 py-2 shadow-sm">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-extrabold text-slate-600 mr-1">
                Pilih Bahan Tindak Balas:
              </span>
              {group === 'k1' ? (
                <>
                  {(
                    [
                      { id: 'water', label: '1. Dengan Air (H₂O)', icon: Droplets },
                      { id: 'oxygen', label: '2. Dengan Gas Oksigen (O₂)', icon: Flame },
                      { id: 'chlorine', label: '3. Dengan Gas Klorin (Cl₂)', icon: Wind },
                    ] as const
                  ).map((btn) => {
                    const Icon = btn.icon;
                    return (
                      <button
                        key={btn.id}
                        onClick={() => {
                          setK1Reagent(btn.id);
                          setSimTested(false);
                          analytics.recordSimulationClick(SIM_ID, 1);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          k1Reagent === btn.id
                            ? 'bg-orange-600 text-white shadow-sm'
                            : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-orange-50'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {btn.label}
                      </button>
                    );
                  })}
                </>
              ) : (
                <>
                  {(
                    [
                      { id: 'water', label: '1. Dengan Air (H₂O)', icon: Droplets },
                      { id: 'iron', label: '2. Dengan Besi Panas (Fe)', icon: Flame },
                      { id: 'naoh', label: '3. Dengan Natrium Hidroksida (NaOH)', icon: FlaskConical },
                    ] as const
                  ).map((btn) => {
                    const Icon = btn.icon;
                    return (
                      <button
                        key={btn.id}
                        onClick={() => {
                          setK17Reagent(btn.id);
                          setSimTested(false);
                          analytics.recordSimulationClick(SIM_ID, 1);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          k17Reagent === btn.id
                            ? 'bg-sky-600 text-white shadow-sm'
                            : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-sky-50'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {btn.label}
                      </button>
                    );
                  })}
                </>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleTriggerReactions}
                disabled={simRunning}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow-sm transition cursor-pointer disabled:opacity-60 ${
                  group === 'k1'
                    ? 'bg-emerald-600 hover:bg-emerald-500'
                    : 'bg-indigo-600 hover:bg-indigo-500'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                {simRunning ? 'Sedang Menguji...' : 'Jalankan Tindak Balas Siri'}
              </button>
              {simTested && (
                <button
                  onClick={() => setSimTested(false)}
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 cursor-pointer"
                  title="Set semula animasi"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Kad Pemerhatian & Persamaan Kimia Siri Unsur */}
          <div
            className={`grid gap-2.5 ${
              group === 'k1'
                ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            }`}
          >
            {elements.map((el) => {
              const rx =
                group === 'k1'
                  ? el.k1Reactions?.[k1Reagent]
                  : el.k17Reactions?.[k17Reagent];
              if (!rx) return null;

              return (
                <div
                  key={el.id}
                  className={`bg-white rounded-2xl border p-3 shadow-sm flex flex-col justify-between space-y-2 transition ${
                    simRunning
                      ? 'ring-2 ring-amber-400 border-amber-400 animate-pulse'
                      : simTested
                      ? group === 'k1'
                        ? 'border-orange-300 ring-1 ring-orange-200'
                        : 'border-sky-300 ring-1 ring-sky-200'
                      : 'border-slate-200'
                  }`}
                >
                  {/* Atas Kad: Unsur + Tahap Kereaktifan */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black border ${
                            group === 'k1'
                              ? 'bg-orange-100 text-orange-900 border-orange-300'
                              : 'bg-sky-100 text-sky-900 border-sky-300'
                          }`}
                        >
                          <ChemText text={el.formulaDisplay} />
                        </span>
                        <div>
                          <div className="text-xs font-extrabold text-slate-900 leading-tight">
                            {el.name}
                          </div>
                          {el.badgeText && (
                            <span className="text-[9px] font-semibold text-slate-500">
                              {el.badgeText}
                            </span>
                          )}
                        </div>
                      </div>
                      <span
                        className={`text-[9px] font-extrabold text-white px-2 py-0.5 rounded-full ${rx.visualColor}`}
                      >
                        {rx.visualBadge}
                      </span>
                    </div>

                    {/* Bar Kereaktifan (1-5) */}
                    <div className="space-y-0.5">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-slate-500 font-semibold">Kereaktifan</span>
                        <span className="font-extrabold text-slate-800">{rx.reactivityLabel}</span>
                      </div>
                      <div className="grid grid-cols-5 gap-1">
                        {[1, 2, 3, 4, 5].map((lv) => (
                          <div
                            key={lv}
                            className={`h-1.5 rounded-full ${
                              lv <= rx.reactivityLevel
                                ? group === 'k1'
                                  ? 'bg-orange-500'
                                  : 'bg-sky-500'
                                : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Pemerhatian */}
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-2 text-[11px] text-slate-700 leading-snug min-h-[76px]">
                      <span className="font-bold text-slate-900 block mb-0.5">Pemerhatian:</span>
                      {rx.observation}
                    </div>
                  </div>

                  {/* Bawah Kad: Persamaan Kimia Seimbang */}
                  <div className="space-y-1 pt-1">
                    <div
                      className={`font-mono text-[11px] font-extrabold p-2 rounded-xl border text-center leading-snug ${
                        group === 'k1'
                          ? 'bg-orange-50/70 border-orange-200 text-orange-950'
                          : 'bg-sky-50/70 border-sky-200 text-sky-950'
                      }`}
                    >
                      <ChemText text={rx.equation} />
                    </div>
                    <p className="text-[10px] text-slate-500 text-center leading-tight">
                      Hasil: {rx.productNote}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Nota Sifat Kimia KSSM Ringkas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-[11px]">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-slate-900">
                  {group === 'k1'
                    ? 'Sifat Kimia Sepunya Kumpulan 1 (m.s. 88): '
                    : 'Sifat Kimia Sepunya Kumpulan 17 (m.s. 93): '}
                </span>
                <span className="text-slate-700">
                  {group === 'k1'
                    ? 'Semua atom Kumpulan 1 mempunyai 1 elektron valens. Semasa tindak balas kimia, atom menderma 1 elektron untuk membentuk ion +1 (M → M⁺ + e⁻).'
                    : 'Semua atom Kumpulan 17 mempunyai 7 elektron valens. Semasa tindak balas kimia, molekul dwiatom X₂ menerima 2 elektron untuk mencapai susunan oktet stabil membentuk ion halida −1 (X₂ + 2e⁻ → 2X⁻).'}
                </span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-amber-950">
                <span className="font-extrabold">Langkah Keselamatan Makmal (Buku Teks): </span>
                <span>
                  {group === 'k1'
                    ? 'Logam alkali sangat reaktif dan disimpan di dalam minyak parafin. Gunakan hanya potongan kecil bersama forsep (Eksperimen 4.1 dijalankan secara demonstrasi guru).'
                    : 'Unsur Kumpulan 17 beracun dan mengakis. Kendalikan gas klorin dan wap bromin di dalam kebuk wasap; astatin (At) bersifat radioaktif dan tidak digunakan di makmal.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PERBANDINGAN TREND KEREAKTIFAN K1 VS K17 */}
      {activeTab === 'compare' && (
        <div className="space-y-2.5">
          {/* Penukar Gaya Rajah Buku Teks */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[11px]">
            <span className="font-semibold text-slate-600 flex items-center gap-1.5">
              <Atom className="w-3.5 h-3.5 text-indigo-600" />
              <span>
                Perbandingan rajah susunan elektron mengikut Rajah 4.9 (m.s. 91) dan Rajah 4.11 (m.s. 95) Buku Teks KSSM.
              </span>
            </span>
            <div className="inline-flex bg-slate-100 border border-slate-200 rounded-lg p-0.5 shrink-0">
              <button
                type="button"
                onClick={() => setAtomVariant('electron-arrangement')}
                className={`px-2 py-0.5 rounded-md font-bold transition cursor-pointer ${
                  atomVariant === 'electron-arrangement'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Susunan Elektron (Simbol)
              </button>
              <button
                type="button"
                onClick={() => setAtomVariant('atomic-structure')}
                className={`px-2 py-0.5 rounded-md font-bold transition cursor-pointer ${
                  atomVariant === 'atomic-structure'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Struktur Atom (p &amp; n)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {/* Kad Kiri: Mengapa Kumpulan 1 BERTAMBAH Reaktif */}
            <div className="bg-white border border-orange-200 rounded-2xl p-3.5 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between gap-2 border-b border-orange-100 pb-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-700">
                    Rajah 4.9 (m.s. 91)
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900">
                    Kumpulan 1: Kereaktifan BERTAMBAH Menuruni Kumpulan
                  </h4>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-orange-100 text-orange-800 text-xs font-black shrink-0">
                  M → M⁺ + e⁻
                </span>
              </div>

              {/* Mini 3 Kad Siri Li -> Na -> K */}
              <div className="grid grid-cols-3 gap-2">
                {K1_ELEMENTS.slice(0, 3).map((el) => (
                  <button
                    key={el.id}
                    onClick={() => setPairK1(el.id)}
                    className={`rounded-xl border p-2 flex flex-col items-center text-center transition cursor-pointer space-y-1 ${
                      pairK1 === el.id
                        ? 'bg-orange-50 border-orange-500 ring-2 ring-orange-200'
                        : 'bg-slate-50 border-slate-200 hover:bg-orange-50/50'
                    }`}
                  >
                    <span className="text-xs font-extrabold text-slate-900">
                      {el.name} ({el.symbol})
                    </span>
                    <TextbookAtomDiagram
                      symbol={el.symbol}
                      shells={el.shells}
                      protonNumber={el.protonNumber}
                      neutronNumber={NEUTRONS_BY_ID[el.id]}
                      variant={atomVariant}
                      nucleusFill="#bbf7d0"
                      className="w-24 h-24"
                    />
                    <div className="w-full">
                      <ElectronShellBreakdown
                        shells={el.shells}
                        protonNumber={el.protonNumber}
                      />
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-orange-50/80 border border-orange-200 rounded-xl p-2.5 text-[11px] text-slate-800 space-y-1">
                <div className="font-extrabold text-orange-900 flex items-center justify-between">
                  <span>Tertib Menaik: Li &lt; Na &lt; K &lt; Rb &lt; Cs</span>
                  <span className="inline-flex items-center gap-0.5 text-orange-700">
                    <ArrowUp className="w-3 h-3" /> Menderma e⁻ lebih mudah
                  </span>
                </div>
                <ol className="list-decimal list-inside space-y-0.5 text-slate-700">
                  <li>Bilangan petala berisi elektron bertambah menuruni Kumpulan 1.</li>
                  <li>Saiz atom bertambah → jarak nukleus dengan elektron valens semakin jauh.</li>
                  <li>Daya tarikan nukleus terhadap elektron valens menjadi semakin lemah.</li>
                  <li>
                    Atom <strong>semakin mudah menderma 1 elektron valens</strong> bagi mencapai susunan stabil.
                  </li>
                </ol>
              </div>
            </div>

            {/* Kad Kanan: Mengapa Kumpulan 17 BERKURANG Reaktif */}
            <div className="bg-white border border-sky-200 rounded-2xl p-3.5 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between gap-2 border-b border-sky-100 pb-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-700">
                    Rajah 4.11 (m.s. 95)
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900">
                    Kumpulan 17: Kereaktifan BERKURANG Menuruni Kumpulan
                  </h4>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-sky-100 text-sky-800 text-xs font-black shrink-0">
                  X₂ + 2e⁻ → 2X⁻
                </span>
              </div>

              {/* Mini 3 Kad Siri Cl -> Br -> I */}
              <div className="grid grid-cols-3 gap-2">
                {K17_ELEMENTS.slice(1, 4).map((el) => (
                  <button
                    key={el.id}
                    onClick={() => setPairK17(el.id)}
                    className={`rounded-xl border p-2 flex flex-col items-center text-center transition cursor-pointer space-y-1 ${
                      pairK17 === el.id
                        ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-200'
                        : 'bg-slate-50 border-slate-200 hover:bg-sky-50/50'
                    }`}
                  >
                    <span className="text-xs font-extrabold text-slate-900">
                      {el.name} ({el.symbol})
                    </span>
                    <TextbookAtomDiagram
                      symbol={el.symbol}
                      shells={el.shells}
                      protonNumber={el.protonNumber}
                      neutronNumber={NEUTRONS_BY_ID[el.id]}
                      variant={atomVariant}
                      nucleusFill="#bae6fd"
                      className="w-24 h-24"
                    />
                    <div className="w-full">
                      <ElectronShellBreakdown
                        shells={el.shells}
                        protonNumber={el.protonNumber}
                      />
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-sky-50/80 border border-sky-200 rounded-xl p-2.5 text-[11px] text-slate-800 space-y-1">
                <div className="font-extrabold text-sky-900 flex items-center justify-between">
                  <span>Tertib Menurun: F₂ &gt; Cl₂ &gt; Br₂ &gt; I₂</span>
                  <span className="inline-flex items-center gap-0.5 text-sky-700">
                    <ArrowDown className="w-3 h-3" /> Menerima e⁻ lebih sukar
                  </span>
                </div>
                <ol className="list-decimal list-inside space-y-0.5 text-slate-700">
                  <li>Bilangan petala berisi elektron bertambah menuruni Kumpulan 17.</li>
                  <li>Saiz atom bertambah → petala valens semakin jauh daripada nukleus.</li>
                  <li>Daya tarikan nukleus terhadap elektron luar menjadi semakin lemah.</li>
                  <li>
                    Atom menghadapi <strong>kesukaran untuk menarik 1 elektron</strong> ke dalam petala valens.
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Gabungan Kad Pilihan K1 + K17: Pembentukan Garam Halida Logam */}
          {(() => {
            const m = K1_ELEMENTS.find((e) => e.id === pairK1) ?? K1_ELEMENTS[1];
            const x = K17_ELEMENTS.find((e) => e.id === pairK17) ?? K17_ELEMENTS[1];
            const halideSuffix =
              x.symbol === 'F'
                ? 'fluorida'
                : x.symbol === 'Cl'
                ? 'klorida'
                : x.symbol === 'Br'
                ? 'bromida'
                : 'iodida';
            const stateM = '(p)';
            const stateX = x.physicalState === 'Gas' ? '(g)' : x.physicalState === 'Cecair' ? '(ce)' : '(p)';
            const eq = `2${m.symbol}${stateM} + ${x.symbol}₂${stateX} → 2${m.symbol}${x.symbol}(p)`;
            return (
              <div className="bg-gradient-to-r from-orange-50 via-white to-sky-50 border border-indigo-200 rounded-2xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs">
                  <Atom className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div>
                    <span className="font-extrabold text-slate-900">
                      Tindak Balas Gabungan ({m.name} + {x.name}):{' '}
                    </span>
                    <span className="text-slate-600">
                      1 elektron dipindahkan daripada atom {m.symbol} kepada atom {x.symbol} membentuk pepejal putih{' '}
                      <strong>
                        {m.name.toLowerCase()} {halideSuffix}
                      </strong>
                      .
                    </span>
                  </div>
                </div>
                <div className="font-mono text-xs font-extrabold text-indigo-900 bg-white border border-indigo-200 px-3 py-1 rounded-xl shadow-xs">
                  <ChemText text={eq} />
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
