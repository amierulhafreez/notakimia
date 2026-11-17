import React, { useCallback, useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  AlertCircle,
  Award,
  CheckCircle2,
  Droplets,
  Flame,
  HelpCircle,
  Info,
  Layers,
  Lock,
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  Sparkles,
  TestTube,
  Unlock,
  Wind,
  Zap,
} from 'lucide-react';
import { analytics } from '../services/analytics';

export type AlkeneType = 'etena' | 'propena';
export type LearningMode = 'explore' | 'challenge';
export type ReactionId =
  | 'pembakaran'
  | 'penghidrogenan'
  | 'penghalogenan'
  | 'penambahan_hx'
  | 'penghidratan'
  | 'pengoksidaan'
  | 'pempolimeran';

export type OxygenSupply = 'excess' | 'limited';

interface ReactionDef {
  id: ReactionId;
  name: string;
  shortName: string;
  spokeLabel: string;
  badge: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    activeBg: string;
    pillBg: string;
  };
  reagentDisplay: string;
  catalystKSSM: string;
  temperatureKSSM: string;
  pressureKSSM: string;
  observationKSSM: string;
  kssmConcept: string;
  productName: {
    etena: string;
    propena: string;
  };
  productFormula: {
    etena: string;
    propena: string;
  };
  balancedEquation: {
    etena: string;
    propena: string;
  };
  challengeQuestion: {
    catalystOptions: string[];
    correctCatalyst: string;
    tempOptions: string[];
    correctTemp: string;
    pressureOptions: string[];
    correctPressure: string;
    hint: string;
  };
}

const REACTIONS: ReactionDef[] = [
  {
    id: 'pembakaran',
    name: 'Tindak Balas Pembakaran (Lengkap & Tak Lengkap)',
    shortName: 'Pembakaran',
    spokeLabel: '1. Pembakaran (+ O₂)',
    badge: 'Pengoksidaan C-H',
    colorScheme: {
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      text: 'text-amber-800',
      activeBg: 'bg-amber-500 text-white',
      pillBg: 'bg-amber-100 text-amber-900',
    },
    reagentDisplay: '+ Gas Oksigen (O₂)',
    catalystKSSM: 'Tiada mangkin (pembakaran haba nyalaan)',
    temperatureKSSM: 'Suhu nyalaan tinggi',
    pressureKSSM: '1 atm (Tekanan atmosfera)',
    observationKSSM:
      'Lengkap: Terbakar dengan nyalaan biru tanpa jelaga. Tak lengkap: Terbakar dengan nyalaan kuning sangat berjelaga tebal kerana peratusan jisim karbon mengikut jisim alkena lebih tinggi berbanding alkana.',
    kssmConcept:
      'Peratus jisim karbon dalam etena (85.7%) lebih tinggi daripada etana (80.0%). Oleh itu, pembakaran alkena menghasilkan lebih banyak jelaga (partikel karbon tidak terbakar).',
    productName: {
      etena: 'Karbon dioksida + Air (Lengkap) / Jelaga + CO (Tak Lengkap)',
      propena: 'Karbon dioksida + Air (Lengkap) / Jelaga + CO (Tak Lengkap)',
    },
    productFormula: {
      etena: 'CO₂ + H₂O (Lengkap) / C + CO + H₂O (Tak Lengkap)',
      propena: 'CO₂ + H₂O (Lengkap) / C + CO + H₂O (Tak Lengkap)',
    },
    balancedEquation: {
      etena: 'C₂H₄(g) + 3O₂(g) → 2CO₂(g) + 2H₂O(ce)  [Lengkap]',
      propena: '2C₃H₆(g) + 9O₂(g) → 6CO₂(g) + 6H₂O(ce)  [Lengkap]',
    },
    challengeQuestion: {
      catalystOptions: ['Tiada mangkin', 'Serbuk Besi (Fe)', 'Nikel (Ni)', 'Asid Fosforik (H₃PO₄)'],
      correctCatalyst: 'Tiada mangkin',
      tempOptions: ['Suhu nyalaan pembakaran', 'Suhu bilik (25 °C)', '180 °C', '300 °C'],
      correctTemp: 'Suhu nyalaan pembakaran',
      pressureOptions: ['1 atm (Tekanan atmosfera)', '60 atm', '1000–2000 atm'],
      correctPressure: '1 atm (Tekanan atmosfera)',
      hint: 'Pembakaran hidrokarbon tidak memerlukan mangkin kimia, ia hanya memerlukan haba nyalaan dan gas oksigen pada tekanan atmosfera biasa.',
    },
  },
  {
    id: 'penghidrogenan',
    name: 'Tindak Balas Penghidrogenan (Penambahan Hidrogen)',
    shortName: 'Penghidrogenan',
    spokeLabel: '2. Penghidrogenan (+ H₂)',
    badge: 'Penambahan H₂',
    colorScheme: {
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      text: 'text-blue-800',
      activeBg: 'bg-blue-600 text-white',
      pillBg: 'bg-blue-100 text-blue-900',
    },
    reagentDisplay: '+ Gas Hidrogen (H₂)',
    catalystKSSM: 'Mangkin Nikel (Ni) atau Platinum (Pt)',
    temperatureKSSM: '180 °C',
    pressureKSSM: '1 atm (Tekanan biasa)',
    observationKSSM:
      'Alkena tak tepu ditukarkan kepada alkana tepu yang sepadan. Diaplikasikan dalam industri penghasilan marjerin daripada minyak sawit/sayuran.',
    kssmConcept:
      'Satu ikatan kovalen ganda dua C=C dipecahkan dan dua atom hidrogen ditambah pada setiap atom karbon tak tepu membentuk alkana tepu (ikatan tunggal C-C).',
    productName: {
      etena: 'Etana (Alkana tepu)',
      propena: 'Propana (Alkana tepu)',
    },
    productFormula: {
      etena: 'C₂H₆ (CH₃-CH₃)',
      propena: 'C₃H₈ (CH₃-CH₂-CH₃)',
    },
    balancedEquation: {
      etena: 'C₂H₄(g) + H₂(g) ──[Ni, 180 °C]──→ C₂H₆(g)',
      propena: 'C₃H₆(g) + H₂(g) ──[Ni, 180 °C]──→ C₃H₈(g)',
    },
    challengeQuestion: {
      catalystOptions: ['Nikel (Ni) / Platinum (Pt)', 'Asid Fosforik (H₃PO₄)', 'Serbuk Zink (Zn)', 'Tiada mangkin'],
      correctCatalyst: 'Nikel (Ni) / Platinum (Pt)',
      tempOptions: ['180 °C', 'Suhu bilik (25 °C)', '300 °C', '500 °C'],
      correctTemp: '180 °C',
      pressureOptions: ['1 atm (Tekanan biasa)', '60 atm', '1000 atm'],
      correctPressure: '1 atm (Tekanan biasa)',
      hint: 'Penghidrogenan memerlukan mangkin logam peralihan Nikel (Ni) atau Platinum (Pt) yang dipanaskan sehingga suhu optimum 180 °C.',
    },
  },
  {
    id: 'penghalogenan',
    name: 'Tindak Balas Penghalogenan (Penambahan Bromin)',
    shortName: 'Penghalogenan',
    spokeLabel: '3. Penghalogenan (+ Br₂)',
    badge: 'Penambahan Halogen',
    colorScheme: {
      bg: 'bg-orange-50',
      border: 'border-orange-300',
      text: 'text-orange-900',
      activeBg: 'bg-orange-600 text-white',
      pillBg: 'bg-orange-100 text-orange-900',
    },
    reagentDisplay: '+ Air Bromin (Br₂)',
    catalystKSSM: 'Tiada mangkin (berlaku serta-merta tanpa cahaya)',
    temperatureKSSM: 'Suhu bilik (~25 °C)',
    pressureKSSM: '1 atm',
    observationKSSM:
      'Warna perang air bromin dinyahwarnakan kepada tidak berwarna dengan cepat pada suhu bilik tanpa memerlukan sinaran cahaya matahari.',
    kssmConcept:
      'Ini ialah ujian kimia utama untuk membezakan alkena tak tepu (nyahwarna serta-merta) daripada alkana tepu (hanya bertindak balas perlahan jika ada cahaya UV/matahari).',
    productName: {
      etena: '1,2-dibromoetana',
      propena: '1,2-dibromopropana',
    },
    productFormula: {
      etena: 'CH₂Br-CH₂Br',
      propena: 'CH₃-CHBr-CH₂Br',
    },
    balancedEquation: {
      etena: 'C₂H₄(g) + Br₂(ce) → CH₂BrCH₂Br(ce)',
      propena: 'C₃H₆(g) + Br₂(ce) → CH₃CHBrCH₂Br(ce)',
    },
    challengeQuestion: {
      catalystOptions: ['Tiada mangkin diperlukan', 'Nikel (Ni)', 'Asid Fosforik', 'Serbuk Besi'],
      correctCatalyst: 'Tiada mangkin diperlukan',
      tempOptions: ['Suhu bilik (~25 °C)', '180 °C', '300 °C'],
      correctTemp: 'Suhu bilik (~25 °C)',
      pressureOptions: ['1 atm (Tekanan biasa)', '60 atm'],
      correctPressure: '1 atm (Tekanan biasa)',
      hint: 'Alkena sangat reaktif terhadap halogen: tindak balas berlaku spontan pada suhu bilik tanpa mangkin mahupun cahaya matahari.',
    },
  },
  {
    id: 'penambahan_hx',
    name: 'Penambahan Hidrogen Halida (+ HCl / HBr)',
    shortName: 'Penambahan HX',
    spokeLabel: '4. Penambahan HX (+ HCl)',
    badge: 'Penambahan HX',
    colorScheme: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-300',
      text: 'text-emerald-900',
      activeBg: 'bg-emerald-600 text-white',
      pillBg: 'bg-emerald-100 text-emerald-900',
    },
    reagentDisplay: '+ Gas Hidrogen Klorida (HCl)',
    catalystKSSM: 'Tiada mangkin',
    temperatureKSSM: 'Suhu bilik (~25 °C)',
    pressureKSSM: '1 atm',
    observationKSSM:
      'Gas hidrogen klorida diserap dan bertindak balas membentuk haloalkana cecair tidak berwarna (kloroalkana).',
    kssmConcept:
      'Atom hidrogen dan atom klorin ditambah merentasi ikatan ganda dua C=C. Untuk alkena asimetri seperti propena, 2-kloropropana terbentuk sebagai hasil utama (Peraturan Markovnikov).',
    productName: {
      etena: 'Kloroetana',
      propena: '2-kloropropana (atau 1-kloropropana)',
    },
    productFormula: {
      etena: 'CH₃-CH₂Cl',
      propena: 'CH₃-CH(Cl)-CH₃',
    },
    balancedEquation: {
      etena: 'C₂H₄(g) + HCl(g) → CH₃CH₂Cl(g)',
      propena: 'C₃H₆(g) + HCl(g) → CH₃CH(Cl)CH₃(ce)',
    },
    challengeQuestion: {
      catalystOptions: ['Tiada mangkin', 'Serbuk Zink', 'Nikel (Ni)', 'Platinum (Pt)'],
      correctCatalyst: 'Tiada mangkin',
      tempOptions: ['Suhu bilik (~25 °C)', '180 °C', '300 °C'],
      correctTemp: 'Suhu bilik (~25 °C)',
      pressureOptions: ['1 atm', '60 atm', '100 atm'],
      correctPressure: '1 atm',
      hint: 'Penambahan hidrogen halida (HCl atau HBr) berlaku spontan pada suhu bilik dan tekanan biasa tanpa mangkin.',
    },
  },
  {
    id: 'penghidratan',
    name: 'Tindak Balas Penghidratan (Penambahan Stim, H₂O(g))',
    shortName: 'Penghidratan',
    spokeLabel: '5. Penghidratan (+ Stim)',
    badge: 'Sintesis Alkohol',
    colorScheme: {
      bg: 'bg-cyan-50',
      border: 'border-cyan-300',
      text: 'text-cyan-900',
      activeBg: 'bg-cyan-600 text-white',
      pillBg: 'bg-cyan-100 text-cyan-900',
    },
    reagentDisplay: '+ Stim Air (H₂O(g))',
    catalystKSSM: 'Mangkin Asid Fosforik (H₃PO₄)',
    temperatureKSSM: '300 °C',
    pressureKSSM: '60 atm',
    observationKSSM:
      'Campuran stim dan alkena menghasilkan cecair alkohol tidak berwarna yang larut campur dengan air dan berbau manis (etanol industri).',
    kssmConcept:
      'Kaedah pembuatan alkohol secara industri: molekul air (H-OH) ditambah merentasi ikatan ganda dua C=C dengan bantuan asid fosforik pada 300 °C dan 60 atm.',
    productName: {
      etena: 'Etanol (Alkohol)',
      propena: 'Propan-2-ol (atau Propan-1-ol)',
    },
    productFormula: {
      etena: 'C₂H₅OH (CH₃-CH₂OH)',
      propena: 'CH₃-CH(OH)-CH₃',
    },
    balancedEquation: {
      etena: 'C₂H₄(g) + H₂O(g) ──[H₃PO₄, 300 °C, 60 atm]──→ C₂H₅OH(ce)',
      propena: 'C₃H₆(g) + H₂O(g) ──[H₃PO₄, 300 °C, 60 atm]──→ CH₃CH(OH)CH₃(ce)',
    },
    challengeQuestion: {
      catalystOptions: ['Asid Fosforik (H₃PO₄)', 'Nikel (Ni)', 'Asid Sulfirik Cair', 'Tiada mangkin'],
      correctCatalyst: 'Asid Fosforik (H₃PO₄)',
      tempOptions: ['300 °C', 'Suhu bilik (25 °C)', '180 °C', '600 °C'],
      correctTemp: '300 °C',
      pressureOptions: ['60 atm', '1 atm', '200 atm', '1000 atm'],
      correctPressure: '60 atm',
      hint: 'Penghidratan industri alkena memerlukan mangkin asid fosforik (H₃PO₄), suhu tinggi 300 °C, dan tekanan tinggi 60 atm.',
    },
  },
  {
    id: 'pengoksidaan',
    name: 'Pengoksidaan dengan Larutan KMnO₄ Berasid',
    shortName: 'Pengoksidaan KMnO₄',
    spokeLabel: '6. Pengoksidaan (+ [O])',
    badge: 'Penambahan 2 Kumpulan -OH',
    colorScheme: {
      bg: 'bg-purple-50',
      border: 'border-purple-300',
      text: 'text-purple-900',
      activeBg: 'bg-purple-600 text-white',
      pillBg: 'bg-purple-100 text-purple-900',
    },
    reagentDisplay: '+ Larutan Kalium Manganat(VII) Berasid (KMnO₄/H⁺)',
    catalystKSSM: 'Tiada mangkin (reagen pengoksidaan berasid)',
    temperatureKSSM: 'Suhu bilik (~25 °C)',
    pressureKSSM: '1 atm',
    observationKSSM:
      'Warna ungu larutan kalium manganat(VII) berasid dinyahwarnakan kepada tidak berwarna. Sebatian diol (alkohol dwi-hidroksil) terbentuk.',
    kssmConcept:
      'Dua kumpulan hidroksil (-OH) ditambah pada setiap atom karbon tak tepu C=C, menghasilkan sebatian glikol / diol tepu.',
    productName: {
      etena: 'Etana-1,2-diol (Diol)',
      propena: 'Propana-1,2-diol (Diol)',
    },
    productFormula: {
      etena: 'CH₂(OH)-CH₂(OH)',
      propena: 'CH₃-CH(OH)-CH₂(OH)',
    },
    balancedEquation: {
      etena: 'C₂H₄(g) + H₂O(ce) + [O] ──[KMnO₄/H⁺]──→ CH₂(OH)CH₂(OH)(ce)',
      propena: 'C₃H₆(g) + H₂O(ce) + [O] ──[KMnO₄/H⁺]──→ CH₃CH(OH)CH₂(OH)(ce)',
    },
    challengeQuestion: {
      catalystOptions: ['Tiada mangkin khas (KMnO₄ berasid adalah reagen)', 'Nikel (Ni)', 'Asid Fosforik', 'Serbuk Karbon'],
      correctCatalyst: 'Tiada mangkin khas (KMnO₄ berasid adalah reagen)',
      tempOptions: ['Suhu bilik (~25 °C)', '180 °C', '300 °C'],
      correctTemp: 'Suhu bilik (~25 °C)',
      pressureOptions: ['1 atm', '60 atm'],
      correctPressure: '1 atm',
      hint: 'Pengoksidaan oleh larutan KMnO₄ berasid berlaku dengan pantas pada suhu bilik tanpa sebarang mangkin lain.',
    },
  },
  {
    id: 'pempolimeran',
    name: 'Tindak Balas Pempolimeran Penambahan',
    shortName: 'Pempolimeran',
    spokeLabel: '7. Pempolimeran (Polimer)',
    badge: 'Monomer → Polimer',
    colorScheme: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-300',
      text: 'text-indigo-900',
      activeBg: 'bg-indigo-600 text-white',
      pillBg: 'bg-indigo-100 text-indigo-900',
    },
    reagentDisplay: 'n Monomer Alkena (Molekul Berulang)',
    catalystKSSM: 'Sedikit oksigen / peroksida sebagai mangkin pemula',
    temperatureKSSM: 'Suhu tinggi (~200 °C)',
    pressureKSSM: 'Tekanan sangat tinggi (1000–2000 atm)',
    observationKSSM:
      'Monomer gas atau cecair alkena bergumpal membentuk rantai polimer pepejal putih fleksibel / keras (plastik polietena atau polipropena).',
    kssmConcept:
      'Ribuan molekul monomer alkena membuka ikatan ganda dua C=C serentak dan bersambung hujung-ke-hujung melalui ikatan kovalen tunggal tanpa kehilangan sebarang atom (pempolimeran penambahan).',
    productName: {
      etena: 'Polietena / Polietilena [ -CH₂-CH₂- ]ₙ',
      propena: 'Polipropena [ -CH(CH₃)-CH₂- ]ₙ',
    },
    productFormula: {
      etena: '[ -CH₂-CH₂- ]ₙ',
      propena: '[ -CH(CH₃)-CH₂- ]ₙ',
    },
    balancedEquation: {
      etena: 'n C₂H₄(g) ──[200 °C, 1000–2000 atm, mangkin]──→ [ —CH₂—CH₂— ]ₙ(p)',
      propena: 'n C₃H₆(g) ──[200 °C, 1000–2000 atm, mangkin]──→ [ —CH(CH₃)—CH₂— ]ₙ(p)',
    },
    challengeQuestion: {
      catalystOptions: ['Mangkin pemula (Peroksida / O₂ suram)', 'Asid Fosforik', 'Nikel', 'Tiada mangkin'],
      correctCatalyst: 'Mangkin pemula (Peroksida / O₂ suram)',
      tempOptions: ['Suhu tinggi (~200 °C)', 'Suhu bilik (25 °C)', '600 °C'],
      correctTemp: 'Suhu tinggi (~200 °C)',
      pressureOptions: ['Tekanan sangat tinggi (1000–2000 atm)', '1 atm', '60 atm'],
      correctPressure: 'Tekanan sangat tinggi (1000–2000 atm)',
      hint: 'Pempolimeran penambahan etena industri memerlukan tekanan ekstrem (1000–2000 atm) dan suhu 200 °C bersama sedikit mangkin pemula.',
    },
  },
];

interface AlkeneCanvasProps {
  alkene: AlkeneType;
  reaction: ReactionDef;
  oxygenSupply: OxygenSupply;
  animTime: number; // in seconds
  isPlaying: boolean;
  phaseOverride: number | null; // null = auto loop, 1 = phase 1, 2 = phase 2, 3 = phase 3
}

const AlkeneCanvas: React.FC<AlkeneCanvasProps> = ({
  alkene,
  reaction,
  oxygenSupply,
  animTime,
  phaseOverride,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cssW = 540;
    const cssH = 260;
    if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, cssW, cssH);

    // Clean Light Theme Canvas Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, cssW, cssH);

    // Subtle Grid Accent
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let x = 20; x < cssW; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, cssH);
      ctx.stroke();
    }
    for (let y = 20; y < cssH; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(cssW, y);
      ctx.stroke();
    }

    // Determine current animation phase (0 to 1)
    const cycleDuration = 4.0; // 4 seconds per full cycle
    const loopT = (animTime % cycleDuration) / cycleDuration;
    let t = loopT;
    if (phaseOverride === 1) t = 0.25;
    else if (phaseOverride === 2) t = 0.6;
    else if (phaseOverride === 3) t = 0.95;

    // Helper functions for drawing atoms and bonds
    const drawAtom = (
      x: number,
      y: number,
      label: string,
      color: string,
      textColor: string = '#ffffff',
      radius: number = 17,
      subscript?: string
    ) => {
      ctx.save();
      // Drop shadow for atom
      ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 2;

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Border ring
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Text label
      ctx.fillStyle = textColor;
      ctx.font = '800 13px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      if (!subscript) {
        ctx.fillText(label, x, y + 0.5);
      } else {
        ctx.fillText(label, x - 3, y);
        ctx.font = '700 9px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(subscript, x + 8, y + 4);
      }
    };

    const drawLineBond = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      color: string = '#334155',
      lineWidth: number = 3.5,
      dashed: boolean = false
    ) => {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      if (dashed) ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    };

    // =========================================================
    // 1. REACTION SPECIFIC ANIMATION MODES
    // =========================================================

    if (reaction.id === 'pembakaran') {
      // -----------------------------------------------------
      // PEMBAKARAN (Lengkap vs Tak Lengkap)
      // -----------------------------------------------------
      const isExcess = oxygenSupply === 'excess';
      const cx = 270;
      const cy = 135;

      // Draw Bunsen burner / combustion zone base
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(cx - 160, 225, 320, 10);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(cx - 25, 205, 50, 20);

      // Animated Flame
      const flameCount = 14;
      for (let i = 0; i < flameCount; i++) {
        const offset = (i - flameCount / 2) * 11;
        const flameHeight =
          55 + Math.sin(animTime * 9 + i * 1.5) * 18 + Math.cos(animTime * 12 + i) * 12;
        const flameY = 205 - flameHeight;

        ctx.save();
        if (isExcess) {
          // Blue flame for complete combustion
          const grad = ctx.createLinearGradient(cx + offset, 205, cx + offset, flameY);
          grad.addColorStop(0, 'rgba(37, 99, 235, 0.9)'); // blue-600
          grad.addColorStop(0.6, 'rgba(56, 189, 248, 0.7)'); // sky-400
          grad.addColorStop(1, 'rgba(224, 242, 254, 0.2)');
          ctx.fillStyle = grad;
        } else {
          // Smoky orange/yellow flame for incomplete combustion
          const grad = ctx.createLinearGradient(cx + offset, 205, cx + offset, flameY);
          grad.addColorStop(0, 'rgba(234, 88, 12, 0.9)'); // orange-600
          grad.addColorStop(0.5, 'rgba(245, 158, 11, 0.85)'); // amber-500
          grad.addColorStop(1, 'rgba(254, 240, 138, 0.3)');
          ctx.fillStyle = grad;
        }

        ctx.beginPath();
        ctx.moveTo(cx + offset - 12, 205);
        ctx.quadraticCurveTo(cx + offset, flameY, cx + offset + 12, 205);
        ctx.fill();
        ctx.restore();
      }

      // If Incomplete Combustion: Draw Black Soot Particles rising!
      if (!isExcess) {
        for (let p = 0; p < 18; p++) {
          const pSeed = (p * 47) % 100;
          const pTime = (animTime * 0.9 + pSeed * 0.1) % 1;
          const px = cx + (pSeed - 50) * 2.2 + Math.sin(animTime * 4 + p) * 15;
          const py = 180 - pTime * 140;
          const pAlpha = Math.sin(pTime * Math.PI) * 0.85;

          ctx.save();
          ctx.fillStyle = `rgba(15, 23, 42, ${pAlpha})`;
          ctx.beginPath();
          ctx.arc(px, py, 3 + (p % 3) * 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Soot notice banner
        ctx.fillStyle = '#0f172a';
        ctx.font = '800 11px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Zarah Jelaga Karbon (C) Berwarna Hitam', cx, 42);
        ctx.font = '600 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillStyle = '#b45309';
        ctx.fillText(
          'Pembakaran Tak Lengkap: % Karbon dalam alkena tinggi → nyalaan sangat berjelaga',
          cx,
          58
        );
      } else {
        // Complete combustion label
        ctx.fillStyle = '#1d4ed8';
        ctx.font = '800 11.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Pembakaran Lengkap: Nyalaan Biru Jernih Tanpa Jelaga', cx, 42);
        ctx.font = '600 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillStyle = '#0284c7';
        ctx.fillText('Semua molekul terurai sepenuhnya menghasilkan CO₂ + H₂O', cx, 58);

        // Product molecules escaping
        for (let k = 0; k < 6; k++) {
          const kTime = (animTime * 0.8 + k * 0.3) % 1;
          const kx = cx + ((k % 2 === 0 ? -1 : 1) * (60 + k * 28));
          const ky = 160 - kTime * 110;
          const kAlpha = Math.sin(kTime * Math.PI) * 0.9;
          const txt = k % 2 === 0 ? 'CO₂' : 'H₂O';

          ctx.save();
          ctx.fillStyle = `rgba(3, 105, 161, ${kAlpha})`;
          ctx.font = '700 10.5px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(txt, kx, ky);
          ctx.restore();
        }
      }

      // Reactant formula tag on base
      ctx.fillStyle = '#334155';
      ctx.font = '700 11px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        alkene === 'etena' ? 'Gas Etena (C₂H₄)' : 'Gas Propena (C₃H₆)',
        cx,
        245
      );
    } else if (reaction.id === 'pempolimeran') {
      // -----------------------------------------------------
      // PEMPOLIMERAN PENAMBAHAN (4 Monomer Chain Synthesis)
      // -----------------------------------------------------
      const isEtena = alkene === 'etena';
      const monomerCount = 4;
      const startX = 65;
      const stepX = 110;
      const cy = 130;

      // Phase calculation:
      // 0.0 - 0.3: 4 distinct monomers with double bonds C=C
      // 0.3 - 0.7: Double bonds open to left and right arms
      // 0.7 - 1.0: Arms connect forming continuous polymer chain [ -CH2-CH2- ]n
      const unfoldProgress = Math.min(1, Math.max(0, (t - 0.25) / 0.45));

      // Draw polymer chain connections
      for (let i = 0; i < monomerCount; i++) {
        const mx = startX + i * stepX;
        const c1x = mx - 22;
        const c2x = mx + 22;

        // Sigma bond between C1 and C2
        drawLineBond(c1x, cy, c2x, cy, '#0f172a', 3.5);

        if (unfoldProgress < 0.6) {
          // Double bond C=C active
          const piAlpha = 1 - unfoldProgress * 1.5;
          ctx.save();
          ctx.strokeStyle = `rgba(234, 88, 12, ${Math.max(0, piAlpha)})`;
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.moveTo(c1x, cy - 8);
          ctx.lineTo(c2x, cy - 8);
          ctx.stroke();
          ctx.restore();
        }

        // Connecting arms to neighboring monomers
        if (unfoldProgress > 0.1) {
          const armLen = (stepX / 2 - 22) * unfoldProgress;
          ctx.save();
          ctx.strokeStyle = '#4f46e5';
          ctx.lineWidth = 3.5;
          // Left arm
          ctx.beginPath();
          ctx.moveTo(c1x, cy);
          ctx.lineTo(c1x - armLen, cy);
          ctx.stroke();
          // Right arm
          ctx.beginPath();
          ctx.moveTo(c2x, cy);
          ctx.lineTo(c2x + armLen, cy);
          ctx.stroke();
          ctx.restore();
        }

        // Draw Hydrogens / Methyl on C1 and C2
        // C1 Hydrogens
        drawLineBond(c1x, cy, c1x - 14, cy - 32, '#64748b', 2);
        drawLineBond(c1x, cy, c1x - 14, cy + 32, '#64748b', 2);
        drawAtom(c1x - 14, cy - 32, 'H', '#0284c7', '#ffffff', 10);
        drawAtom(c1x - 14, cy + 32, 'H', '#0284c7', '#ffffff', 10);

        // C2 Hydrogens or CH3
        drawLineBond(c2x, cy, c2x + 14, cy - 32, '#64748b', 2);
        drawLineBond(c2x, cy, c2x + 14, cy + 32, '#64748b', 2);
        if (isEtena) {
          drawAtom(c2x + 14, cy - 32, 'H', '#0284c7', '#ffffff', 10);
          drawAtom(c2x + 14, cy + 32, 'H', '#0284c7', '#ffffff', 10);
        } else {
          // Methyl group on top
          drawAtom(c2x + 14, cy - 32, 'CH₃', '#7c3aed', '#ffffff', 13);
          drawAtom(c2x + 14, cy + 32, 'H', '#0284c7', '#ffffff', 10);
        }

        // Draw Carbons
        drawAtom(c1x, cy, 'C', '#0f172a', '#ffffff', 15);
        drawAtom(c2x, cy, 'C', '#0f172a', '#ffffff', 15);

        // Monomer index label below
        ctx.fillStyle = '#64748b';
        ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Monomer #${i + 1}`, mx, cy + 58);
      }

      // If fully connected: Draw polymer brackets [ ... ]n around one repeating unit (textbook style)
      if (unfoldProgress >= 0.85) {
        const unitMx = startX + stepX; // Monomer #2 center
        const bLeft = unitMx - 48;
        const bRight = unitMx + 48;

        ctx.save();
        ctx.strokeStyle = '#4338ca';
        ctx.lineWidth = 2.5;

        // Left bracket [
        ctx.beginPath();
        ctx.moveTo(bLeft + 9, cy - 48);
        ctx.lineTo(bLeft, cy - 48);
        ctx.lineTo(bLeft, cy + 48);
        ctx.lineTo(bLeft + 9, cy + 48);
        ctx.stroke();

        // Right bracket ]
        ctx.beginPath();
        ctx.moveTo(bRight - 9, cy - 48);
        ctx.lineTo(bRight, cy - 48);
        ctx.lineTo(bRight, cy + 48);
        ctx.lineTo(bRight - 9, cy + 48);
        ctx.stroke();

        // Subscript 'n'
        ctx.fillStyle = '#4338ca';
        ctx.font = '800 16px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('n', bRight + 9, cy + 50);

        ctx.restore();

        // Polymer title banner
        ctx.fillStyle = '#4338ca';
        ctx.font = '800 13px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(
          isEtena
            ? 'Polietena / Polietilena [ -CH₂-CH₂- ]ₙ'
            : 'Polipropena [ -CH(CH₃)-CH₂- ]ₙ',
          270,
          32
        );
        ctx.font = '600 10px ui-sans-serif, system-ui, sans-serif';
        ctx.fillStyle = '#6366f1';
        ctx.fillText(
          'Semua ikatan ganda dua membuka serentak membentuk rantai panjang kovalen tepu',
          270,
          48
        );
      } else {
        // Monomer phase banner
        ctx.fillStyle = '#0f172a';
        ctx.font = '800 12px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(
          `Unit Monomer ${isEtena ? 'Etena (C₂H₄)' : 'Propena (C₃H₆)'} Bersedia Berpolimer`,
          270,
          32
        );
        ctx.font = '600 10px ui-sans-serif, system-ui, sans-serif';
        ctx.fillStyle = '#ea580c';
        ctx.fillText(
          'Di bawah suhu tinggi (200 °C) & tekanan (1000–2000 atm), ikatan C=C membuka lengan kovalen',
          270,
          48
        );
      }
    } else {
      // =========================================================
      // 5 ADDITION REACTIONS (Penghidrogenan, Penghalogenan, HX, Penghidratan, Pengoksidaan)
      // Visualizing Double-Bond Unfolding (Pembukaan Ikatan Ganda Dua)
      // =========================================================
      const cx = 270;
      const cy = 150;
      const isEtena = alkene === 'etena';

      const c1x = cx - 44;
      const c2x = cx + 44;

      // Unfolding Phase Logic:
      // Phase 1 (t: 0.0 - 0.40): Double bond C=C opens into 2 upward arms
      // Phase 2 (t: 0.40 - 0.75): Reagent molecule floats from top, splits apart
      // Phase 3 (t: 0.75 - 1.00): Reagent atoms bond onto C1 and C2 arms, saturated product formed
      const phase1Progress = Math.min(1, Math.max(0, t / 0.38));
      const phase2Progress = Math.min(1, Math.max(0, (t - 0.35) / 0.38));
      const phase3Progress = Math.min(1, Math.max(0, (t - 0.70) / 0.30));

      // Fixed C1-C2 Sigma Bond (always present)
      drawLineBond(c1x, cy, c2x, cy, '#0f172a', 4);

      // Unfolding Pi Bond (Orange-Red -> Yellow Upward Arms)
      if (phase1Progress < 0.99) {
        // Parallel pi bond fading/breaking
        const piCurvature = (1 - phase1Progress) * 9;
        ctx.save();
        ctx.strokeStyle = '#ea580c';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(c1x, cy - 8 - piCurvature);
        ctx.lineTo(c2x, cy - 8 - piCurvature);
        ctx.stroke();
        ctx.restore();
      }

      // Upward Empty Bonding Arms on C1 & C2
      if (phase1Progress > 0.1) {
        const armHeight = 44 * phase1Progress;
        const armColor = phase3Progress > 0.8 ? '#0f172a' : '#eab308';
        drawLineBond(c1x, cy, c1x, cy - armHeight, armColor, 3.5, phase3Progress < 0.8);
        drawLineBond(c2x, cy, c2x, cy - armHeight, armColor, 3.5, phase3Progress < 0.8);

        // Yellow target glowing pulse before atom attaches
        if (phase3Progress < 0.85) {
          const pulse = (Math.sin(animTime * 10) + 1) * 0.5;
          ctx.save();
          ctx.fillStyle = `rgba(234, 179, 8, ${0.25 + pulse * 0.35})`;
          ctx.beginPath();
          ctx.arc(c1x, cy - 44, 10 + pulse * 3, 0, Math.PI * 2);
          ctx.arc(c2x, cy - 44, 10 + pulse * 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // Attached side groups on C1 & C2 (Etena / Propena)
      // C1 Groups
      drawLineBond(c1x, cy, c1x - 36, cy - 24, '#64748b', 2.5);
      drawLineBond(c1x, cy, c1x - 36, cy + 24, '#64748b', 2.5);
      if (isEtena) {
        drawAtom(c1x - 36, cy - 24, 'H', '#0284c7', '#ffffff', 12);
        drawAtom(c1x - 36, cy + 24, 'H', '#0284c7', '#ffffff', 12);
      } else {
        // Propena has methyl group CH3 on bottom-left
        drawAtom(c1x - 36, cy - 24, 'H', '#0284c7', '#ffffff', 12);
        drawAtom(c1x - 42, cy + 26, 'CH₃', '#7c3aed', '#ffffff', 16);
      }

      // C2 Groups
      drawLineBond(c2x, cy, c2x + 36, cy - 24, '#64748b', 2.5);
      drawLineBond(c2x, cy, c2x + 36, cy + 24, '#64748b', 2.5);
      drawAtom(c2x + 36, cy - 24, 'H', '#0284c7', '#ffffff', 12);
      drawAtom(c2x + 36, cy + 24, 'H', '#0284c7', '#ffffff', 12);

      // Reagent Identity definitions
      interface ReagentFragment {
        label1: string;
        label2: string;
        color1: string;
        color2: string;
        name: string;
      }
      let frag: ReagentFragment = {
        label1: 'H',
        label2: 'H',
        color1: '#0284c7',
        color2: '#0284c7',
        name: 'Hidrogen (H-H)',
      };

      if (reaction.id === 'penghalogenan') {
        frag = {
          label1: 'Br',
          label2: 'Br',
          color1: '#c2410c', // orange-700
          color2: '#c2410c',
          name: 'Bromin (Br-Br)',
        };
      } else if (reaction.id === 'penambahan_hx') {
        frag = {
          label1: 'H',
          label2: 'Cl',
          color1: '#0284c7',
          color2: '#059669', // emerald-600
          name: 'Hidrogen Klorida (H-Cl)',
        };
      } else if (reaction.id === 'penghidratan') {
        frag = {
          label1: 'H',
          label2: 'OH',
          color1: '#0284c7',
          color2: '#e11d48', // rose-600
          name: 'Stim Air (H-OH)',
        };
      } else if (reaction.id === 'pengoksidaan') {
        frag = {
          label1: 'OH',
          label2: 'OH',
          color1: '#7c3aed', // purple-600
          color2: '#7c3aed',
          name: 'Kumpulan -OH daripada KMnO₄/H⁺',
        };
      }

      // Reagent Molecule Kinematics:
      // Start pos: y = 66 (cleanly below the 2-line phase statement), together at cx
      // Split pos: move to c1x, c2x at y = 66
      // Dock pos: move down to cy - 44
      let r1x = cx - 16;
      let r2x = cx + 16;
      let r1y = 66;
      let r2y = 66;

      if (phase2Progress > 0) {
        // Molecule splitting and moving above C1 and C2
        r1x = (cx - 16) + (c1x - (cx - 16)) * phase2Progress;
        r2x = (cx + 16) + (c2x - (cx + 16)) * phase2Progress;
      }

      if (phase3Progress > 0) {
        // Falling down into empty arm sockets
        r1y = 66 + (cy - 44 - 66) * phase3Progress;
        r2y = 66 + (cy - 44 - 66) * phase3Progress;
      }

      // Reagent Bond Line (before breaking)
      if (phase2Progress < 0.5) {
        const bondAlpha = 1 - phase2Progress * 2;
        drawLineBond(r1x, r1y, r2x, r2y, `rgba(71, 85, 105, ${bondAlpha})`, 2.5);
      }

      // Draw Reagent Atom 1 & 2
      drawAtom(r1x, r1y, frag.label1, frag.color1, '#ffffff', 14);
      drawAtom(r2x, r2y, frag.label2, frag.color2, '#ffffff', 14);

      // Central Carbons C1 and C2 (drawn on top of bonds)
      drawAtom(c1x, cy, 'C', '#0f172a', '#ffffff', 18);
      drawAtom(c2x, cy, 'C', '#0f172a', '#ffffff', 18);

      // Explanatory Phase Subtitle Banner
      ctx.textAlign = 'center';
      if (phase1Progress < 0.7) {
        ctx.fillStyle = '#ea580c';
        ctx.font = '800 12px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Fasa 1: Pembukaan Ikatan Ganda Dua C=C', cx, 22);
        ctx.fillStyle = '#64748b';
        ctx.font = '600 10px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(
          'Satu ikatan kovalen ganda dua terbuka menghasilkan 2 lengan ikatan kosong pada karbon',
          cx,
          36
        );
      } else if (phase3Progress < 0.7) {
        ctx.fillStyle = '#0284c7';
        ctx.font = '800 12px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(`Fasa 2: Pemecahan Molekul Reagen (${frag.name})`, cx, 22);
        ctx.fillStyle = '#64748b';
        ctx.font = '600 10px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(
          'Reagen terpisah kepada dua pecahan yang tertarik kepada elektron lengan terbuka',
          cx,
          36
        );
      } else {
        const prodName = isEtena
          ? reaction.productName.etena
          : reaction.productName.propena;
        ctx.fillStyle = '#059669';
        ctx.font = '800 12.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(`Fasa 3: Percantuman Selesai → ${prodName}`, cx, 22);
        ctx.fillStyle = '#047857';
        ctx.font = '700 10px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(
          'Ikatan ganda dua kini menjadi ikatan tunggal C-C (Sebatian hidrokarbon tepu terhasil)',
          cx,
          36
        );
      }
    }

    ctx.restore();
  }, [alkene, reaction, oxygenSupply, animTime, phaseOverride]);

  return (
    <div className="relative w-full flex flex-col items-center">
      <canvas
        ref={canvasRef}
        className="w-full max-w-[540px] aspect-[540/260] mx-auto block rounded-2xl border border-slate-200/90 shadow-sm bg-white"
      />
    </div>
  );
};

export const AlkeneReactionsHubLab: React.FC = () => {
  const [alkene, setAlkene] = useState<AlkeneType>('etena');
  const [learningMode, setLearningMode] = useState<LearningMode>('explore');
  const [selectedReactionId, setSelectedReactionId] = useState<ReactionId>('penghalogenan');
  const [oxygenSupply, setOxygenSupply] = useState<OxygenSupply>('excess');

  // Condition Challenge State
  const [challengePassed, setChallengePassed] = useState<Record<ReactionId, boolean>>({
    pembakaran: false,
    penghidrogenan: false,
    penghalogenan: false,
    penambahan_hx: false,
    penghidratan: false,
    pengoksidaan: false,
    pempolimeran: false,
  });

  const [selectedCatalyst, setSelectedCatalyst] = useState<string>('');
  const [selectedTemp, setSelectedTemp] = useState<string>('');
  const [selectedPressure, setSelectedPressure] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<{
    status: 'idle' | 'correct' | 'wrong';
    message: string;
  }>({ status: 'idle', message: '' });

  // Mastery Tracker (Set of completed reaction IDs)
  const [masteredReactions, setMasteredReactions] = useState<Set<ReactionId>>(new Set());

  // Animation Playback State
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [animTime, setAnimTime] = useState<number>(0);
  const [phaseOverride, setPhaseOverride] = useState<number | null>(null);

  const activeReaction = REACTIONS.find((r) => r.id === selectedReactionId)!;
  const animTimeRef = useRef(0);
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  // Handle Animation Loop (60 FPS)
  useEffect(() => {
    let lastStamp = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const deltaSec = (now - lastStamp) / 1000;
      lastStamp = now;

      if (isPlayingRef.current) {
        animTimeRef.current += deltaSec;
        setAnimTime(animTimeRef.current);
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Sync Mastery when user watches or passes reaction
  const markAsMastered = useCallback(
    (rxId: ReactionId) => {
      setMasteredReactions((prev) => {
        if (prev.has(rxId)) return prev;
        const next = new Set(prev);
        next.add(rxId);

        // Confetti celebration if 7/7 reactions mastered
        if (next.size === 7) {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
          analytics.recordSimulationCompleted('tindak-balas-kimia-alkena');
        }
        return next;
      });
    },
    []
  );

  // Automatically mark mastered in exploration mode after running
  useEffect(() => {
    if (learningMode === 'explore') {
      const timer = setTimeout(() => {
        markAsMastered(selectedReactionId);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [learningMode, selectedReactionId, markAsMastered]);

  // Reset challenge inputs on reaction change
  useEffect(() => {
    setSelectedCatalyst('');
    setSelectedTemp('');
    setSelectedPressure('');
    setChallengeFeedback({ status: 'idle', message: '' });
  }, [selectedReactionId]);

  // Handle Verify Condition in Challenge Mode
  const handleVerifyConditions = () => {
    const q = activeReaction.challengeQuestion;
    const isCatalystOk = selectedCatalyst === q.correctCatalyst;
    const isTempOk = selectedTemp === q.correctTemp;
    const isPressureOk = selectedPressure === q.correctPressure;

    if (isCatalystOk && isTempOk && isPressureOk) {
      setChallengeFeedback({
        status: 'correct',
        message: 'Syarat Tepat! Tindak balas dimulakan serta-merta.',
      });
      setChallengePassed((prev) => ({ ...prev, [selectedReactionId]: true }));
      markAsMastered(selectedReactionId);
      setIsPlaying(true);
      animTimeRef.current = 0;
      setAnimTime(0);
    } else {
      let errorMsg = 'Syarat belum tepat! ';
      if (!isCatalystOk) errorMsg += 'Semak semula pilihan mangkin. ';
      if (!isTempOk) errorMsg += 'Suhu tidak sepadan dengan silibus. ';
      if (!isPressureOk) errorMsg += 'Tekanan belum betul. ';
      errorMsg += `Petunjuk: ${q.hint}`;

      setChallengeFeedback({
        status: 'wrong',
        message: errorMsg,
      });
    }
  };

  const handleReset = () => {
    setMasteredReactions(new Set());
    setChallengePassed({
      pembakaran: false,
      penghidrogenan: false,
      penghalogenan: false,
      penambahan_hx: false,
      penghidratan: false,
      pengoksidaan: false,
      pempolimeran: false,
    });
    setChallengeFeedback({ status: 'idle', message: '' });
    animTimeRef.current = 0;
    setAnimTime(0);
    setPhaseOverride(null);
    setIsPlaying(true);
  };

  const isChallengeLocked =
    learningMode === 'challenge' && !challengePassed[selectedReactionId];

  return (
    <div className="bg-slate-50 min-h-[600px] text-slate-800 p-2 sm:p-3 rounded-2xl flex flex-col gap-2.5 max-w-full font-sans">
      {/* =========================================================
          1. BAR KAWALAN ATAS & PENJEJAK KEMAJUAN (HEADER TOOLBAR)
          ========================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:px-4 sm:py-2.5 shadow-sm flex flex-wrap items-center justify-between gap-2.5">
        {/* Left: Alkena Molecule Selector */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wide text-slate-500 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Molekul Alkena:
          </span>
          <div className="inline-flex rounded-xl bg-slate-100 p-0.5 border border-slate-200">
            <button
              onClick={() => {
                setAlkene('etena');
                animTimeRef.current = 0;
                setAnimTime(0);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                alkene === 'etena'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Etena (C₂H₄)
            </button>
            <button
              onClick={() => {
                setAlkene('propena');
                animTimeRef.current = 0;
                setAnimTime(0);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                alkene === 'propena'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Propena (C₃H₆)
            </button>
          </div>
        </div>

        {/* Center: Learning Mode Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wide text-slate-500">
            Mod Pembelajaran:
          </span>
          <div className="inline-flex rounded-xl bg-slate-100 p-0.5 border border-slate-200">
            <button
              onClick={() => setLearningMode('explore')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                learningMode === 'explore'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Mod Eksplorasi Bebas</span>
            </button>
            <button
              onClick={() => setLearningMode('challenge')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                learningMode === 'challenge'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Mod Cabaran Syarat</span>
            </button>
          </div>
        </div>

        {/* Right: Mastery Badge & Reset Button */}
        <div className="flex items-center gap-2">
          <div
            className={`px-3 py-1 rounded-xl border text-xs font-extrabold flex items-center gap-1.5 shadow-sm ${
              masteredReactions.size === 7
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-indigo-50 border-indigo-200 text-indigo-900'
            }`}
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span>{masteredReactions.size} / 7 Tindak Balas Dikuasai</span>
          </div>

          <button
            onClick={handleReset}
            className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition"
            title="Set semula semua kemajuan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Set Semula</span>
          </button>
        </div>
      </div>

      {/* =========================================================
          2. ZON UTAMA: PETA HUB 7 LALUAN (KIRI) + KANVAS ANIMASI (KANAN)
          ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-2.5 items-start">
        {/* PANEL KIRI: 7 NOD LALUAN TINDAK BALAS HUB */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 shadow-sm flex flex-col gap-1.5">
          <div className="px-1 py-0.5 flex items-center justify-between border-b border-slate-100 pb-1 mb-0.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              Peta 7 Laluan Hub Alkena
            </span>
            <span className="text-[10px] font-mono font-bold text-indigo-600">
              {alkene === 'etena' ? 'C=C (Etena)' : 'C=C (Propena)'}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            {REACTIONS.map((rx) => {
              const isActive = selectedReactionId === rx.id;
              const isMastered = masteredReactions.has(rx.id);

              return (
                <button
                  key={rx.id}
                  onClick={() => {
                    setSelectedReactionId(rx.id);
                    setPhaseOverride(null);
                    animTimeRef.current = 0;
                    setAnimTime(0);
                    setIsPlaying(true);
                  }}
                  className={`w-full text-left p-2 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/20 shadow-sm'
                      : 'bg-white border-slate-200/80 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {rx.id === 'pembakaran' && <Flame className="w-3.5 h-3.5 text-amber-500" />}
                      {rx.id === 'penghidrogenan' && <Droplets className="w-3.5 h-3.5 text-blue-500" />}
                      {rx.id === 'penghalogenan' && <TestTube className="w-3.5 h-3.5 text-orange-500" />}
                      {rx.id === 'penambahan_hx' && <Zap className="w-3.5 h-3.5 text-emerald-500" />}
                      {rx.id === 'penghidratan' && <Wind className="w-3.5 h-3.5 text-cyan-500" />}
                      {rx.id === 'pengoksidaan' && <Sparkles className="w-3.5 h-3.5 text-purple-500" />}
                      {rx.id === 'pempolimeran' && <Layers className="w-3.5 h-3.5 text-indigo-500" />}
                    </div>

                    <div>
                      <div
                        className={`text-xs font-bold leading-tight ${
                          isActive ? 'text-indigo-950 font-extrabold' : 'text-slate-800'
                        }`}
                      >
                        {rx.spokeLabel}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        {rx.badge}
                      </div>
                    </div>
                  </div>

                  <div>
                    {isMastered ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-300 block" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sub-option for Combustion */}
          {selectedReactionId === 'pembakaran' && (
            <div className="mt-1 pt-1.5 border-t border-slate-100 px-1">
              <div className="text-[10px] font-extrabold text-amber-900 uppercase tracking-wide mb-1">
                Bekalan Gas O₂:
              </div>
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => setOxygenSupply('excess')}
                  className={`px-1.5 py-1 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${
                    oxygenSupply === 'excess'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  O₂ Berlebihan (Lengkap)
                </button>
                <button
                  onClick={() => setOxygenSupply('limited')}
                  className={`px-1.5 py-1 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${
                    oxygenSupply === 'limited'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  O₂ Terhad (Tak Lengkap)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* PANEL KANAN: KANVAS ANIMASI PEMBUKAAN IKATAN C=C + KAWALAN + MOD CABARAN */}
        <div className="flex flex-col gap-2.5">
          {/* Kad Tetingkap Mod Cabaran Syarat (Jika Aktif dan Belum Disahkan) */}
          {isChallengeLocked && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3 shadow-sm flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-900">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <span>
                    Cabaran Syarat Tindak Balas: {activeReaction.name}
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold">
                  Kunci Syarat KSSM
                </span>
              </div>

              <p className="text-xs text-amber-950 font-medium leading-relaxed">
                Pilih kombinasi mangkin, suhu, dan tekanan yang tepat untuk membolehkan tindak balas ini berjalan:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {/* 1. Mangkin */}
                <div>
                  <label className="text-[10px] font-extrabold text-slate-600 block mb-0.5">
                    1. Mangkin:
                  </label>
                  <select
                    value={selectedCatalyst}
                    onChange={(e) => setSelectedCatalyst(e.target.value)}
                    className="w-full text-xs font-bold p-1.5 rounded-lg border border-slate-300 bg-white text-slate-800"
                  >
                    <option value="">-- Pilih Mangkin --</option>
                    {activeReaction.challengeQuestion.catalystOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Suhu */}
                <div>
                  <label className="text-[10px] font-extrabold text-slate-600 block mb-0.5">
                    2. Suhu:
                  </label>
                  <select
                    value={selectedTemp}
                    onChange={(e) => setSelectedTemp(e.target.value)}
                    className="w-full text-xs font-bold p-1.5 rounded-lg border border-slate-300 bg-white text-slate-800"
                  >
                    <option value="">-- Pilih Suhu --</option>
                    {activeReaction.challengeQuestion.tempOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Tekanan */}
                <div>
                  <label className="text-[10px] font-extrabold text-slate-600 block mb-0.5">
                    3. Tekanan:
                  </label>
                  <select
                    value={selectedPressure}
                    onChange={(e) => setSelectedPressure(e.target.value)}
                    className="w-full text-xs font-bold p-1.5 rounded-lg border border-slate-300 bg-white text-slate-800"
                  >
                    <option value="">-- Pilih Tekanan --</option>
                    {activeReaction.challengeQuestion.pressureOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={handleVerifyConditions}
                  className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold cursor-pointer transition shadow-sm"
                >
                  Sahkan Syarat Tindak Balas
                </button>

                {challengeFeedback.status === 'wrong' && (
                  <div className="text-[11px] font-bold text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{challengeFeedback.message}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* KANVAS ANIMASI SUBMIKROSKOPIK */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 shadow-sm flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-100 pb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h4 className="text-xs font-extrabold text-slate-900">
                  {activeReaction.name} ({alkene === 'etena' ? 'Etena' : 'Propena'})
                </h4>
              </div>

              {/* Animation Playback & Step Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold flex items-center gap-1 cursor-pointer transition"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3 h-3 text-amber-600" />
                      <span>Jeda</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-emerald-600" />
                      <span>Mainkan</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    animTimeRef.current = 0;
                    setAnimTime(0);
                    setPhaseOverride(null);
                    setIsPlaying(true);
                  }}
                  className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 cursor-pointer transition"
                  title="Main semula animasi"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>

                {/* Step Overrides for Addition reactions */}
                {activeReaction.id !== 'pembakaran' && activeReaction.id !== 'pempolimeran' && (
                  <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-[10px] font-bold">
                    <button
                      onClick={() => setPhaseOverride(null)}
                      className={`px-1.5 py-0.5 rounded cursor-pointer ${
                        phaseOverride === null ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Autoloop
                    </button>
                    <button
                      onClick={() => {
                        setPhaseOverride(1);
                        setIsPlaying(false);
                      }}
                      className={`px-1.5 py-0.5 rounded cursor-pointer ${
                        phaseOverride === 1 ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Fasa 1
                    </button>
                    <button
                      onClick={() => {
                        setPhaseOverride(2);
                        setIsPlaying(false);
                      }}
                      className={`px-1.5 py-0.5 rounded cursor-pointer ${
                        phaseOverride === 2 ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Fasa 2
                    </button>
                    <button
                      onClick={() => {
                        setPhaseOverride(3);
                        setIsPlaying(false);
                      }}
                      className={`px-1.5 py-0.5 rounded cursor-pointer ${
                        phaseOverride === 3 ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Fasa 3
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Kanvas Pembukaan Ikatan C=C */}
            <AlkeneCanvas
              alkene={alkene}
              reaction={activeReaction}
              oxygenSupply={oxygenSupply}
              animTime={animTime}
              isPlaying={isPlaying}
              phaseOverride={phaseOverride}
            />

            {/* Syarat & Reagen Mini Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-200/80 text-[10.5px]">
              <div>
                <span className="font-extrabold text-slate-500">Reagen: </span>
                <span className="font-bold text-slate-900">{activeReaction.reagentDisplay}</span>
              </div>
              <div>
                <span className="font-extrabold text-slate-500">Mangkin: </span>
                <span className="font-bold text-slate-900">{activeReaction.catalystKSSM}</span>
              </div>
              <div>
                <span className="font-extrabold text-slate-500">Suhu & Tekanan: </span>
                <span className="font-bold text-slate-900">
                  {activeReaction.temperatureKSSM}, {activeReaction.pressureKSSM}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          3. PANEL PEMERHATIAN MAKMAL & PERSAMAAN KIMIA SEIMBANG
          ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {/* Kad Pemerhatian Makmal & Hasil IUPAC */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3 shadow-sm flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between mb-1.5 border-b border-slate-100 pb-1">
              <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500">
                Pemerhatian Makmal & Hasil Tindak Balas
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                {activeReaction.badge}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div>
                <span className="font-extrabold text-slate-600">Nama Hasil IUPAC: </span>
                <span className="font-extrabold text-indigo-700">
                  {alkene === 'etena'
                    ? activeReaction.productName.etena
                    : activeReaction.productName.propena}
                </span>
              </div>

              <div>
                <span className="font-extrabold text-slate-600">Formula Struktur Ringkas: </span>
                <span className="font-mono font-bold text-slate-900">
                  {alkene === 'etena'
                    ? activeReaction.productFormula.etena
                    : activeReaction.productFormula.propena}
                </span>
              </div>

              <div className="pt-1 text-[11px] text-slate-700 bg-amber-50/70 p-2 rounded-xl border border-amber-200/70 leading-relaxed">
                <span className="font-extrabold text-amber-900">Pemerhatian Makmal Sebenar: </span>
                {activeReaction.observationKSSM}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[10.5px] text-slate-500">
            <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>KSSM SP 2.3.1: Menghuraikan sifat kimia alkena dan tindak balas penambahan.</span>
          </div>
        </div>

        {/* Kad Persamaan Kimia Seimbang & Konsep KSSM */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3 shadow-sm flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between mb-1.5 border-b border-slate-100 pb-1">
              <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500">
                Persamaan Kimia Seimbang
              </span>
              <span className="text-[10px] font-bold text-slate-500">
                Alkena: {alkene === 'etena' ? 'Etena (C₂H₄)' : 'Propena (C₃H₆)'}
              </span>
            </div>

            {/* Formula box */}
            <div className="p-2.5 rounded-xl bg-slate-900 text-white font-mono text-xs font-bold overflow-x-auto shadow-inner text-center">
              {alkene === 'etena'
                ? activeReaction.balancedEquation.etena
                : activeReaction.balancedEquation.propena}
            </div>

            {/* Pedagogic Explanation */}
            <div className="mt-2 text-[11px] text-slate-700 bg-indigo-50/70 p-2 rounded-xl border border-indigo-100 leading-relaxed">
              <span className="font-extrabold text-indigo-950">Konsep Kimia KSSM: </span>
              {activeReaction.kssmConcept}
            </div>
          </div>

          <div className="flex items-center justify-between text-[10.5px] text-slate-500 pt-1 border-t border-slate-100">
            <span>Siri Homolog: Alkena (CₙH₂ₙ)</span>
            <span className="font-bold text-indigo-600">
              Kumpulan Berfungsi: Ikatan Ganda Dua C=C
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlkeneReactionsHubLab;
