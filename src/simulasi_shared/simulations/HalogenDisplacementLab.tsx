import React, { useEffect, useRef, useState } from 'react';
import {
  Beaker,
  BookOpen,
  CheckCircle2,
  Droplets,
  FlaskConical,
  Maximize2,
  RotateCcw,
  Sparkles,
  Waves,
  X,
  XCircle,
} from 'lucide-react';
import { analytics } from '../services/analytics';

type HalogenId = 'cl2' | 'br2' | 'i2';
type HalideId = 'kcl' | 'kbr' | 'ki';
type ProcedureStage = 'empty' | 'mixed' | 'layered' | 'shaking' | 'settled';

interface HalogenSpec {
  id: HalogenId;
  name: string;
  formula: string;
  aqueousName: string;
  aqRgb: [number, number, number];
  organicRgb: [number, number, number];
  organicColorLabel: 'Kuning Pucat' | 'Perang' | 'Ungu';
  aqColorLabel: string;
  atomRadius: number;
  shellCount: number;
  atomColor: string;
  atomLabel: string;
  ionLabel: string;
  strengthRank: number; // higher = stronger oxidizing agent (Cl2=3 > Br2=2 > I2=1)
}

interface HalideSpec {
  id: HalideId;
  halogenCounterpart: HalogenId;
  name: string;
  formula: string;
  ionLabel: string;
  atomRadius: number;
  shellCount: number;
  atomColor: string;
}

interface PairOutcome {
  displaced: boolean;
  resultingHalogen: HalogenId;
  organicColorLabel: 'Kuning Pucat' | 'Perang' | 'Ungu';
  organicRgb: [number, number, number];
  aqFinalRgb: [number, number, number];
  aqInitialMixRgb: [number, number, number];
  halfEqOxidation: string;
  halfEqReduction: string;
  overallIonicEq: string;
  explanation: string;
}

interface MatrixRecord {
  displaced: boolean;
  organicColorLabel: 'Kuning Pucat' | 'Perang' | 'Ungu';
  organicRgb: [number, number, number];
}

const HALOGENS: HalogenSpec[] = [
  {
    id: 'cl2',
    name: 'Air klorin',
    formula: 'Cl₂(ak)',
    aqueousName: 'Kuning pucat',
    aqRgb: [254, 240, 138], // pale yellow
    organicRgb: [253, 224, 71], // pale yellow in CH3CCl3
    organicColorLabel: 'Kuning Pucat',
    aqColorLabel: 'Kuning pucat',
    atomRadius: 12,
    shellCount: 2,
    atomColor: '#fde047',
    atomLabel: 'Cl',
    ionLabel: 'Cl⁻',
    strengthRank: 3,
  },
  {
    id: 'br2',
    name: 'Air bromin',
    formula: 'Br₂(ak)',
    aqueousName: 'Perang',
    aqRgb: [194, 89, 12], // amber-brown
    organicRgb: [180, 62, 12], // rich reddish-brown in CH3CCl3
    organicColorLabel: 'Perang',
    aqColorLabel: 'Perang',
    atomRadius: 16,
    shellCount: 3,
    atomColor: '#ea580c',
    atomLabel: 'Br',
    ionLabel: 'Br⁻',
    strengthRank: 2,
  },
  {
    id: 'i2',
    name: 'Larutan iodin',
    formula: 'I₂(ak)',
    aqueousName: 'Perang / kuning',
    aqRgb: [202, 138, 4], // amber-yellow aqueous iodine
    organicRgb: [168, 85, 247], // vivid purple in CH3CCl3
    organicColorLabel: 'Ungu',
    aqColorLabel: 'Perang / kuning',
    atomRadius: 20,
    shellCount: 4,
    atomColor: '#c084fc',
    atomLabel: 'I',
    ionLabel: 'I⁻',
    strengthRank: 1,
  },
];

const HALIDES: HalideSpec[] = [
  {
    id: 'kcl',
    halogenCounterpart: 'cl2',
    name: 'Kalium klorida',
    formula: 'KCl(ak)',
    ionLabel: 'Cl⁻',
    atomRadius: 13,
    shellCount: 2,
    atomColor: '#fde047',
  },
  {
    id: 'kbr',
    halogenCounterpart: 'br2',
    name: 'Kalium bromida',
    formula: 'KBr(ak)',
    ionLabel: 'Br⁻',
    atomRadius: 17,
    shellCount: 3,
    atomColor: '#fb923c',
  },
  {
    id: 'ki',
    halogenCounterpart: 'i2',
    name: 'Kalium iodida',
    formula: 'KI(ak)',
    ionLabel: 'I⁻',
    atomRadius: 21,
    shellCount: 4,
    atomColor: '#c084fc',
  },
];

function getHalogenSpec(id: HalogenId): HalogenSpec {
  return HALOGENS.find((h) => h.id === id)!;
}

function getHalideSpec(id: HalideId): HalideSpec {
  return HALIDES.find((h) => h.id === id)!;
}

function evaluatePair(halogenId: HalogenId, halideId: HalideId): PairOutcome {
  const ox = getHalogenSpec(halogenId);
  const red = getHalideSpec(halideId);
  const redCounterpart = getHalogenSpec(red.halogenCounterpart);

  const displaced = ox.strengthRank > redCounterpart.strengthRank;

  if (displaced) {
    const productHalogen = redCounterpart;
    return {
      displaced: true,
      resultingHalogen: productHalogen.id,
      organicColorLabel: productHalogen.organicColorLabel,
      organicRgb: productHalogen.organicRgb,
      // Upper aqueous layer turns clear/very pale after organic extraction
      aqFinalRgb: [226, 232, 240],
      aqInitialMixRgb: productHalogen.aqRgb,
      halfEqOxidation: `2${red.ionLabel}(ak) → ${productHalogen.formula.replace('(ak)', '')}(ak) + 2e⁻`,
      halfEqReduction: `${ox.formula} + 2e⁻ → 2${ox.ionLabel}(ak)`,
      overallIonicEq: `${ox.formula} + 2${red.ionLabel}(ak) → 2${ox.ionLabel}(ak) + ${productHalogen.formula}`,
      explanation: `${ox.name} (${ox.atomLabel}) mempunyai saiz atom lebih kecil dan keelektronegatifan lebih tinggi daripada ${redCounterpart.atomLabel}. ${ox.atomLabel} menarik elektron daripada ion ${red.ionLabel} lalu menyesarkan ${productHalogen.formula.replace('(ak)', '')} (${productHalogen.organicColorLabel.toLowerCase()} dalam CH₃CCl₃).`,
    };
  }

  // No displacement
  const isSameHalogen = ox.id === red.halogenCounterpart;
  return {
    displaced: false,
    resultingHalogen: ox.id,
    organicColorLabel: ox.organicColorLabel,
    organicRgb: ox.organicRgb,
    aqFinalRgb: [226, 232, 240],
    aqInitialMixRgb: ox.aqRgb,
    halfEqOxidation: 'Tiada pengoksidaan berlaku',
    halfEqReduction: 'Tiada penurunan berlaku',
    overallIonicEq: `${ox.formula} + ${red.formula} → Tiada tindak balas penyesaran`,
    explanation: isSameHalogen
      ? `Kedua-dua bahan mengandungi unsur halogen yang sama (${ox.atomLabel}), maka tiada pemindahan elektron bersih berlaku. Warna asal ${ox.name.toLowerCase()} larut dalam lapisan CH₃CCl₃ (${ox.organicColorLabel.toLowerCase()}).`
      : `Menuruni Kumpulan 17, saiz atom bertambah (${redCounterpart.atomLabel} < ${ox.atomLabel}) dan daya tarikan nukleus terhadap elektron menjadi lebih lemah. ${ox.formula.replace('(ak)', '')} tidak cukup kuat untuk menarik elektron daripada ion ${red.ionLabel}.`,
  };
}

interface TwoLayerTubeCanvasProps {
  halogenId: HalogenId;
  halideId: HalideId;
  stage: ProcedureStage;
  shakeProgress: number; // 0..1 during shake
}

const TwoLayerTubeCanvas: React.FC<TwoLayerTubeCanvasProps> = ({
  halogenId,
  halideId,
  stage,
  shakeProgress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ halogenId, halideId, stage, shakeProgress });
  stateRef.current = { halogenId, halideId, stage, shakeProgress };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const startMs = performance.now();

    const render = (now: number) => {
      const t = (now - startMs) / 1000;
      const dpr = window.devicePixelRatio || 1;
      const cssW = 360;
      const cssH = 228;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      const {
        halogenId: hId,
        halideId: haId,
        stage: st,
        shakeProgress: sp,
      } = stateRef.current;

      const ox = getHalogenSpec(hId);
      const red = getHalideSpec(haId);
      const outcome = evaluatePair(hId, haId);

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);

      // Dark studio backdrop
      ctx.fillStyle = '#070b14';
      ctx.fillRect(0, 0, cssW, cssH);

      // Lab stand & base (static reference)
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.roundRect(78, 206, 174, 10, 4);
      ctx.fill();
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(90, 206);
      ctx.lineTo(90, 26);
      ctx.stroke();

      // Test tube center & shake transform
      const baseCx = 165;
      const baseCy = 120;
      let tiltAngle = 0;
      let offsetX = 0;
      let offsetY = 0;
      if (st === 'shaking') {
        tiltAngle = Math.sin(t * 24) * 0.14;
        offsetX = Math.sin(t * 24) * 7;
        offsetY = Math.cos(t * 16) * 3;
      }

      ctx.save();
      ctx.translate(baseCx + offsetX, baseCy + offsetY);
      ctx.rotate(tiltAngle);
      ctx.translate(-baseCx, -baseCy);

      const cx = baseCx;
      const tubeW = 54;
      const tubeR = tubeW / 2;
      const tubeTop = 44;
      const tubeBottom = 194;

      // Clamp behind tube when not shaking
      if (st !== 'shaking') {
        ctx.fillStyle = '#64748b';
        ctx.fillRect(90, 88, cx - tubeR - 90, 5);
      }

      // Interior clip path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx - tubeR + 2, tubeTop + 8);
      ctx.lineTo(cx - tubeR + 2, tubeBottom - tubeR);
      ctx.arc(cx, tubeBottom - tubeR, tubeR - 2, Math.PI, 0, true);
      ctx.lineTo(cx + tubeR - 2, tubeTop + 8);
      ctx.closePath();
      ctx.clip();

      if (st === 'mixed') {
        // Single aqueous mixture layer (y=114..194)
        const [r, g, b] = outcome.aqInitialMixRgb;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.72)`;
        ctx.fillRect(cx - tubeR, 114, tubeW, 82);
        // Meniscus
        ctx.strokeStyle = 'rgba(255,255,255,0.55)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx - tubeR + 2, 114);
        ctx.quadraticCurveTo(cx, 119, cx + tubeR - 2, 114);
        ctx.stroke();
      } else if (st === 'layered') {
        // 2 immiscible layers BEFORE shaking:
        // Upper: Aqueous mixture (y=94..148)
        const [ar, ag, ab] = outcome.aqInitialMixRgb;
        ctx.fillStyle = `rgba(${ar}, ${ag}, ${ab}, 0.74)`;
        ctx.fillRect(cx - tubeR, 94, tubeW, 54);

        // Lower: Clear colorless CH3CCl3 organic solvent (y=148..194)
        ctx.fillStyle = 'rgba(226, 232, 240, 0.25)';
        ctx.fillRect(cx - tubeR, 148, tubeW, 48);

        // Interface meniscus
        ctx.strokeStyle = 'rgba(255,255,255,0.65)';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(cx - tubeR + 2, 148);
        ctx.quadraticCurveTo(cx, 151, cx + tubeR - 2, 148);
        ctx.stroke();

        // Top meniscus
        ctx.beginPath();
        ctx.moveTo(cx - tubeR + 2, 94);
        ctx.quadraticCurveTo(cx, 99, cx + tubeR - 2, 94);
        ctx.stroke();
      } else if (st === 'shaking') {
        // Emulsion swirl during 1.5s shake
        const [orR, orG, orB] = outcome.organicRgb;
        const [ar, ag, ab] = outcome.aqInitialMixRgb;
        const mixGrad = ctx.createLinearGradient(cx, 92, cx, tubeBottom);
        mixGrad.addColorStop(0, `rgba(${ar}, ${ag}, ${ab}, 0.55)`);
        mixGrad.addColorStop(1, `rgba(${orR}, ${orG}, ${orB}, 0.85)`);
        ctx.fillStyle = mixGrad;
        ctx.fillRect(cx - tubeR, 92, tubeW, 104);

        // Swirling emulsion droplets
        for (let i = 0; i < 12; i++) {
          const ex = cx - 16 + ((i * 11 + Math.sin(t * 14 + i) * 14) % 32);
          const ey = 104 + ((i * 13 + t * 80) % 76);
          ctx.fillStyle = `rgba(${orR}, ${orG}, ${orB}, 0.75)`;
          ctx.beginPath();
          ctx.arc(ex, ey, 3.2 + (i % 2) * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (st === 'settled') {
        // Upper layer: Clear / very pale aqueous layer (y=94..148)
        const [far, fag, fab] = outcome.aqFinalRgb;
        ctx.fillStyle = `rgba(${far}, ${fag}, ${fab}, 0.24)`;
        ctx.fillRect(cx - tubeR, 94, tubeW, 54);

        // Lower layer: Vivid halogen dissolved in 1,1,1-trikloroetana (y=148..194)
        const [orR, orG, orB] = outcome.organicRgb;
        const orgGrad = ctx.createLinearGradient(cx - tubeR, 148, cx + tubeR, tubeBottom);
        orgGrad.addColorStop(0, `rgba(${orR}, ${orG}, ${orB}, 0.92)`);
        orgGrad.addColorStop(1, `rgba(${Math.max(0, orR - 25)}, ${Math.max(0, orG - 25)}, ${Math.max(0, orB - 20)}, 0.98)`);
        ctx.fillStyle = orgGrad;
        ctx.fillRect(cx - tubeR, 148, tubeW, 48);

        // Crisp phase boundary line
        ctx.strokeStyle = '#f8fafc';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(cx - tubeR + 2, 148);
        ctx.quadraticCurveTo(cx, 151, cx + tubeR - 2, 148);
        ctx.stroke();

        // Top meniscus
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.beginPath();
        ctx.moveTo(cx - tubeR + 2, 94);
        ctx.quadraticCurveTo(cx, 99, cx + tubeR - 2, 94);
        ctx.stroke();
      }

      ctx.restore();

      // Rubber stopper on mouth during shaking
      if (st === 'shaking') {
        ctx.fillStyle = '#334155';
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(cx - 22, tubeTop - 10);
        ctx.lineTo(cx + 22, tubeTop - 10);
        ctx.lineTo(cx + 18, tubeTop + 4);
        ctx.lineTo(cx - 18, tubeTop + 4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      // Outer glass wall
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - tubeR, tubeTop);
      ctx.lineTo(cx - tubeR, tubeBottom - tubeR);
      ctx.arc(cx, tubeBottom - tubeR, tubeR, Math.PI, 0, true);
      ctx.lineTo(cx + tubeR, tubeTop);
      ctx.stroke();

      // Rim ellipse
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.ellipse(cx, tubeTop, tubeR + 2, 4, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Glass highlight
      ctx.strokeStyle = 'rgba(255,255,255,0.22)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - tubeR + 7, tubeTop + 10);
      ctx.lineTo(cx - tubeR + 7, tubeBottom - tubeR - 2);
      ctx.stroke();

      ctx.restore(); // end shake transform

      // Clean textbook callout labels around test tube
      ctx.font = '600 10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Kaki retort', 83, 62);
      ctx.fillText('Tabung uji', cx - 34, 152);
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(cx - 32, 149);
      ctx.lineTo(cx - 28, 149);
      ctx.stroke();

      // Right-side phase labels
      ctx.textAlign = 'left';
      if (st === 'empty') {
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('Sedia diisi reagen:', cx + 38, 108);
        ctx.fillStyle = '#f8fafc';
        ctx.font = '700 10.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(`${ox.name} + ${red.name}`, cx + 38, 124);
      } else if (st === 'mixed') {
        ctx.fillStyle = '#fde047';
        ctx.font = '700 10.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Lapisan akueus campuran', cx + 38, 136);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '500 10px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(`${ox.formula} + ${red.formula}`, cx + 38, 151);
      } else if (st === 'layered') {
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '700 10.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Lapisan akueus (Atas)', cx + 38, 118);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '500 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Kurang tumpat', cx + 38, 131);

        ctx.fillStyle = '#38bdf8';
        ctx.font = '700 10.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('1,1,1-Trikloroetana (Bawah)', cx + 38, 166);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '500 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Lebih tumpat (jernih)', cx + 38, 179);

        ctx.strokeStyle = '#64748b';
        ctx.beginPath();
        ctx.moveTo(cx + 28, 115);
        ctx.lineTo(cx + 35, 115);
        ctx.moveTo(cx + 28, 163);
        ctx.lineTo(cx + 35, 163);
        ctx.stroke();
      } else if (st === 'shaking') {
        ctx.fillStyle = '#fde047';
        ctx.font = '700 11px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Menggoncang campuran...', cx + 44, 122);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '500 10px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(`${Math.round(sp * 100)}% selesai`, cx + 44, 137);
      } else if (st === 'settled') {
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '700 10.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Lapisan akueus (Atas)', cx + 38, 118);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '500 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Larutan halida / tidak berwarna', cx + 38, 131);

        ctx.fillStyle = '#fde047';
        ctx.font = '700 10.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Lapisan CH₃CCl₃ (Bawah)', cx + 38, 165);
        ctx.fillStyle = '#ffffff';
        ctx.font = '700 10px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(`Warna: ${outcome.organicColorLabel}`, cx + 38, 179);

        ctx.strokeStyle = '#64748b';
        ctx.beginPath();
        ctx.moveTo(cx + 28, 115);
        ctx.lineTo(cx + 35, 115);
        ctx.moveTo(cx + 28, 162);
        ctx.lineTo(cx + 35, 162);
        ctx.stroke();
      }

      ctx.restore();
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 360, height: 228 }}
      className="w-full max-w-[360px] h-[228px] mx-auto block rounded-xl border border-slate-800 bg-[#070b14]"
    />
  );
};

interface ElectronegativityLoupeCanvasProps {
  halogenId: HalogenId;
  halideId: HalideId;
  stage: ProcedureStage;
  size?: number;
}

const ElectronegativityLoupeCanvas: React.FC<ElectronegativityLoupeCanvasProps> = ({
  halogenId,
  halideId,
  stage,
  size = 198,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ halogenId, halideId, stage, size });
  stateRef.current = { halogenId, halideId, stage, size };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const startMs = performance.now();

    const drawAtomWithShells = (
      x: number,
      y: number,
      coreR: number,
      shells: number,
      colorHex: string,
      label: string,
      sc: number
    ) => {
      // Electron shells around nucleus to visually show Group 17 atomic size trend!
      for (let s = 1; s <= shells; s++) {
        const ringR = coreR + s * 4.5 * sc;
        ctx.strokeStyle = s === shells ? `${colorHex}aa` : 'rgba(148, 163, 184, 0.35)';
        ctx.lineWidth = s === shells ? 1.4 : 0.9;
        ctx.beginPath();
        ctx.arc(x, y, ringR, 0, Math.PI * 2);
        ctx.stroke();
      }

      const grad = ctx.createRadialGradient(x - coreR * 0.3, y - coreR * 0.3, 2, x, y, coreR);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.35, colorHex);
      grad.addColorStop(1, colorHex);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, coreR, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#090d16';
      ctx.font = `800 ${9.5 * sc}px ui-sans-serif, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x, y + 0.5);
    };

    const render = (now: number) => {
      const t = (now - startMs) / 1000;
      const { halogenId: hId, halideId: haId, stage: st, size: boxSize } = stateRef.current;
      const ox = getHalogenSpec(hId);
      const red = getHalideSpec(haId);
      const outcome = evaluatePair(hId, haId);

      const dpr = window.devicePixelRatio || 1;
      const cssW = boxSize;
      const cssH = boxSize;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);

      const cx = cssW / 2;
      const cy = cssH / 2;
      const lensR = cssW * 0.455;
      const sc = cssW / 198;

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, lensR, 0, Math.PI * 2);
      ctx.clip();

      const bg = ctx.createRadialGradient(cx, cy, 8, cx, cy, lensR);
      bg.addColorStop(0, '#111827');
      bg.addColorStop(1, '#04070e');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, cssW, cssH);

      const leftX = cx - 42 * sc;
      const rightX = cx + 42 * sc;
      const driftY = Math.sin(t * 2) * 4 * sc;

      const isActivePull = st === 'shaking' || st === 'settled';
      const phase = (t * 0.78) % 1;

      if (!isActivePull) {
        // Preview state: compare atomic sizes of Oxidizing Halogen vs Halide Ion
        drawAtomWithShells(
          leftX,
          cy + driftY,
          ox.atomRadius * 0.88 * sc,
          ox.shellCount,
          ox.atomColor,
          ox.atomLabel,
          sc
        );
        drawAtomWithShells(
          rightX,
          cy - driftY,
          red.atomRadius * 0.88 * sc,
          red.shellCount,
          red.atomColor,
          red.ionLabel,
          sc
        );
        ctx.fillStyle = '#94a3b8';
        ctx.font = `700 ${8.5 * sc}px ui-sans-serif, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('Banding saiz atom & petala', cx, cy + 56 * sc);
      } else if (outcome.displaced) {
        // Successful electron pull! Smaller halogen pulls e- (yellow glowing sphere) from larger halide ion
        const pulled = phase > 0.35;
        const eT = pulled ? Math.min(1, (phase - 0.35) / 0.45) : 0;

        // Left: Oxidizing Halogen -> gains e- -> becomes ion
        const leftConverted = eT > 0.8;
        drawAtomWithShells(
          leftX,
          cy + driftY * 0.6,
          ox.atomRadius * 0.88 * sc,
          ox.shellCount,
          ox.atomColor,
          leftConverted ? ox.ionLabel : ox.atomLabel,
          sc
        );

        // Right: Halide Ion -> loses e- -> becomes neutral displaced halogen
        drawAtomWithShells(
          rightX,
          cy - driftY * 0.6,
          red.atomRadius * 0.88 * sc,
          red.shellCount,
          red.atomColor,
          leftConverted ? getHalogenSpec(red.halogenCounterpart).atomLabel : red.ionLabel,
          sc
        );

        // Electron flying from right (halide ion) to left (smaller electronegative halogen)
        const ex = rightX + (leftX - rightX) * eT;
        const ey = cy - Math.sin(eT * Math.PI) * 18 * sc;
        ctx.save();
        ctx.shadowColor = '#fde047';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(ex, ey, 4.2 * sc, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.fillStyle = '#fde047';
        ctx.font = `800 ${9.5 * sc}px ui-sans-serif, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('← Tarikan e⁻ berjaya!', cx, cy + 56 * sc);
      } else {
        // Failed electron tug! Halogen tries to pull e-, electron nudges slightly then snaps back with red X
        const attempt = phase < 0.5 ? phase * 2 : (1 - phase) * 2; // 0 -> 1 -> 0 bounce back
        drawAtomWithShells(
          leftX,
          cy + driftY * 0.6,
          ox.atomRadius * 0.88 * sc,
          ox.shellCount,
          ox.atomColor,
          ox.atomLabel,
          sc
        );
        drawAtomWithShells(
          rightX,
          cy - driftY * 0.6,
          red.atomRadius * 0.88 * sc,
          red.shellCount,
          red.atomColor,
          red.ionLabel,
          sc
        );

        // Electron nudges partway then snaps back
        const ex = rightX - 18 * sc - attempt * 18 * sc;
        const ey = cy;
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(ex, ey, 3.8 * sc, 0, Math.PI * 2);
        ctx.fill();

        // Red X symbol in center
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(cx - 6 * sc, cy - 22 * sc);
        ctx.lineTo(cx + 6 * sc, cy - 10 * sc);
        ctx.moveTo(cx + 6 * sc, cy - 22 * sc);
        ctx.lineTo(cx - 6 * sc, cy - 10 * sc);
        ctx.stroke();

        ctx.fillStyle = '#f87171';
        ctx.font = `800 ${9 * sc}px ui-sans-serif, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('Tarikan e⁻ gagal (lemah)', cx, cy + 56 * sc);
      }

      // Labels underneath atoms
      ctx.fillStyle = '#cbd5e1';
      ctx.font = `700 ${8.5 * sc}px ui-sans-serif, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(`${ox.shellCount} petala`, leftX, cy - 46 * sc);
      ctx.fillText(`${red.shellCount} petala`, rightX, cy - 46 * sc);

      ctx.restore();

      // Lens border
      ctx.strokeStyle =
        st === 'settled'
          ? outcome.displaced
            ? '#34d399'
            : '#f87171'
          : '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, lensR, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className="block mx-auto"
    />
  );
};

export const HalogenDisplacementLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lab' | 'notes'>('lab');
  const [selectedHalogen, setSelectedHalogen] = useState<HalogenId>('cl2');
  const [selectedHalide, setSelectedHalide] = useState<HalideId>('kbr');
  const [stage, setStage] = useState<ProcedureStage>('empty');
  const [shakeProgress, setShakeProgress] = useState(0);
  const [matrixRecords, setMatrixRecords] = useState<Record<string, MatrixRecord>>({});
  const [isLoupeExpanded, setIsLoupeExpanded] = useState(false);

  const hasRecordedCompletionRef = useRef(false);

  const currentPairKey = `${selectedHalogen}-${selectedHalide}`;
  const currentOutcome = evaluatePair(selectedHalogen, selectedHalide);
  const oxSpec = getHalogenSpec(selectedHalogen);
  const redSpec = getHalideSpec(selectedHalide);
  const recordedCount = Object.keys(matrixRecords).length;

  // Shaking 1.5s timer -> settles cleanly & records into 3x3 exploration matrix
  useEffect(() => {
    if (stage !== 'shaking') return;
    let rafId = 0;
    const durationMs = 1500;
    const startMs = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - startMs) / durationMs);
      setShakeProgress(p);
      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        const outcome = evaluatePair(selectedHalogen, selectedHalide);
        setStage('settled');
        setMatrixRecords((prev) => ({
          ...prev,
          [`${selectedHalogen}-${selectedHalide}`]: {
            displaced: outcome.displaced,
            organicColorLabel: outcome.organicColorLabel,
            organicRgb: outcome.organicRgb,
          },
        }));
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [stage, selectedHalogen, selectedHalide]);

  // Analytics completion after at least 1 displacement & 1 non-displacement tested (or 2+ matrix records)
  useEffect(() => {
    if (recordedCount >= 2 && !hasRecordedCompletionRef.current) {
      hasRecordedCompletionRef.current = true;
      analytics.recordSimulationCompleted('penyesaran-halogen-halida');
    }
  }, [recordedCount]);

  const handleSelectHalogen = (id: HalogenId) => {
    if (stage === 'shaking') return;
    setSelectedHalogen(id);
    setStage('empty');
    setShakeProgress(0);
  };

  const handleSelectHalide = (id: HalideId) => {
    if (stage === 'shaking') return;
    setSelectedHalide(id);
    setStage('empty');
    setShakeProgress(0);
  };

  const handleResetTube = () => {
    if (stage === 'shaking') return;
    setStage('empty');
    setShakeProgress(0);
  };

  const handlePourReagents = () => {
    if (stage !== 'empty') return;
    setStage('mixed');
  };

  const handleAddOrganicSolvent = () => {
    if (stage !== 'mixed') return;
    setStage('layered');
  };

  const handleShakeTube = () => {
    if (stage !== 'layered') return;
    setShakeProgress(0);
    setStage('shaking');
  };

  return (
    <div className="bg-[#0b0f19] text-white rounded-2xl p-3.5 sm:p-4 border border-slate-800 shadow-2xl space-y-2.5">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-yellow-300">
            <Beaker className="w-3.5 h-3.5 text-yellow-400" />
            <span>Simulasi Redoks: Penyesaran Halogen daripada Larutan Halida</span>
          </div>

          <div className="inline-flex bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('lab')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'lab' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              Makmal Dwi-Lapisan
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'notes' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Nota KSSM & Trend K17
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] font-bold text-slate-200">
            Pasangan: <span className="text-yellow-300">{oxSpec.formula.replace('(ak)', '')}</span> +{' '}
            <span className="text-sky-300">{redSpec.formula.replace('(ak)', '')}</span>
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] font-bold text-slate-200">
            Matriks: <span className="text-emerald-300">{recordedCount} / 9</span>
          </span>
        </div>
      </div>

      {activeTab === 'lab' ? (
        <>
          {/* BAHAGIAN ATAS: PANEL KIRI — KANVAS TENGAH — KANTA KANAN */}
          <div className="grid grid-cols-1 lg:grid-cols-[270px_1fr_270px] gap-2.5 items-stretch">
            {/* 1. PANEL KAWALAN BAHAN & TINDAKAN (KIRI) */}
            <div className="bg-[#111827] border border-slate-800 rounded-xl p-2.5 flex flex-col justify-between space-y-2">
              <div className="space-y-2">
                {/* Pilihan Air Halogen */}
                <div>
                  <div className="text-[10.5px] font-extrabold uppercase tracking-wide text-blue-300 mb-1">
                    Air Halogen (Agen Pengoksidaan)
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {HALOGENS.map((h) => {
                      const active = selectedHalogen === h.id;
                      return (
                        <button
                          key={h.id}
                          onClick={() => handleSelectHalogen(h.id)}
                          disabled={stage === 'shaking'}
                          className={`w-full text-left px-2 py-1 rounded-lg border text-[10.5px] transition flex items-center justify-between gap-1.5 cursor-pointer ${
                            active
                              ? 'bg-blue-600/25 border-blue-400 text-white font-bold'
                              : 'bg-[#090d16] border-slate-800 text-slate-300 hover:border-blue-500/50'
                          }`}
                        >
                          <span className="flex items-center gap-1.5 min-w-0">
                            <span
                              className="w-2.5 h-4 rounded-sm border border-white/30 shrink-0"
                              style={{ backgroundColor: `rgb(${h.aqRgb.join(',')})` }}
                            />
                            <span className="truncate">{h.name} ({h.formula.replace('(ak)', '')})</span>
                          </span>
                          <span className="text-[9.5px] text-slate-400 shrink-0">{h.aqColorLabel}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pilihan Larutan Halida */}
                <div>
                  <div className="text-[10.5px] font-extrabold uppercase tracking-wide text-red-300 mb-1">
                    Larutan Halida (Agen Penurunan)
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {HALIDES.map((ha) => {
                      const active = selectedHalide === ha.id;
                      return (
                        <button
                          key={ha.id}
                          onClick={() => handleSelectHalide(ha.id)}
                          disabled={stage === 'shaking'}
                          className={`px-1.5 py-1.5 rounded-lg border text-center transition cursor-pointer ${
                            active
                              ? 'bg-red-600/25 border-red-400 text-white font-bold'
                              : 'bg-[#090d16] border-slate-800 text-slate-300 hover:border-red-500/50'
                          }`}
                        >
                          <div className="text-[11px] font-bold">{ha.formula.replace('(ak)', '')}</div>
                          <div className="text-[9px] text-slate-400 leading-tight">{ha.name.replace('Kalium ', 'K ')}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Butang Tindakan Prosedur */}
              <div className="space-y-1 pt-1 border-t border-slate-800">
                <button
                  onClick={handlePourReagents}
                  disabled={stage !== 'empty'}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    stage === 'empty'
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow'
                      : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-default'
                  }`}
                >
                  <Droplets className="w-3.5 h-3.5 shrink-0" />
                  <span>1. Tuang Larutan Halida & Air Halogen</span>
                </button>

                <button
                  onClick={handleAddOrganicSolvent}
                  disabled={stage !== 'mixed'}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    stage === 'mixed'
                      ? 'bg-sky-600 hover:bg-sky-500 text-white shadow'
                      : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-default'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>2. Tambah 1,1,1-Trikloroetana (CH₃CCl₃)</span>
                </button>

                <div className="grid grid-cols-[1fr_auto] gap-1">
                  <button
                    onClick={handleShakeTube}
                    disabled={stage !== 'layered'}
                    className={`px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      stage === 'layered'
                        ? 'bg-yellow-500 hover:bg-yellow-400 text-slate-950 shadow'
                        : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-default'
                    }`}
                  >
                    <Waves className="w-3.5 h-3.5 shrink-0" />
                    <span>3. Goncang Tabung Uji</span>
                  </button>

                  <button
                    onClick={handleResetTube}
                    disabled={stage === 'shaking'}
                    title="Set Semula Tabung Uji"
                    className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-[10.5px] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Set Semula</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 2. KANVAS TABUNG UJI DWI-LAPISAN INTERAKTIF (TENGAH) */}
            <div className="bg-[#111827] border border-slate-800 rounded-xl p-2.5 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wide text-slate-200">
                  Tabung Uji Dwi-Lapisan Pelarut Organik
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-yellow-300">
                  {stage === 'empty'
                    ? 'Langkah 1: Tuang Reagen'
                    : stage === 'mixed'
                    ? 'Langkah 2: Tambah CH₃CCl₃'
                    : stage === 'layered'
                    ? 'Langkah 3: Goncang'
                    : stage === 'shaking'
                    ? 'Menggoncang (1.5s)...'
                    : currentOutcome.displaced
                    ? 'Penyesaran Berlaku'
                    : 'Tiada Penyesaran'}
                </span>
              </div>

              <TwoLayerTubeCanvas
                halogenId={selectedHalogen}
                halideId={selectedHalide}
                stage={stage}
                shakeProgress={shakeProgress}
              />

              <div className="mt-1.5 px-2.5 py-1.5 rounded-lg bg-[#090d16] border border-slate-800 text-[10.5px] leading-snug">
                {stage === 'settled' ? (
                  <div className="flex items-center gap-2">
                    {currentOutcome.displaced ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                    <span>
                      <strong className="text-yellow-300">
                        Lapisan 1,1,1-trikloroetana berwarna {currentOutcome.organicColorLabel.toLowerCase()}.
                      </strong>{' '}
                      {currentOutcome.displaced
                        ? `Halogen baharu (${getHalogenSpec(currentOutcome.resultingHalogen).formula.replace('(ak)', '')}) telah disesarkan dan melarut dalam pelarut organik.`
                        : `Tiada penyesaran berlaku; ${oxSpec.name.toLowerCase()} asal melarut ke lapisan bawah.`}
                    </span>
                  </div>
                ) : (
                  <span className="text-slate-300">
                    Ikuti Langkah 1 → 2 → 3 di panel kiri untuk menguji pasangan{' '}
                    <strong className="text-white">{oxSpec.name}</strong> +{' '}
                    <strong className="text-white">{redSpec.name}</strong>.
                  </span>
                )}
              </div>
            </div>

            {/* 3. KANTA PEMBESAR SUBMIKROSKOPIK (KANAN) */}
            <div className="bg-[#111827] border border-yellow-500/35 rounded-xl p-2.5 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-1">
                <div>
                  <h4 className="text-[11px] font-extrabold uppercase tracking-wide text-yellow-300">
                    Kanta Tarikan Elektron
                  </h4>
                  <p className="text-[9.5px] text-slate-400">
                    Perbandingan saiz atom & petala Kumpulan 17
                  </p>
                </div>
                <button
                  onClick={() => setIsLoupeExpanded(true)}
                  title="Perbesar Kanta Pembesar"
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-yellow-300 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <ElectronegativityLoupeCanvas
                halogenId={selectedHalogen}
                halideId={selectedHalide}
                stage={stage}
                size={186}
              />

              <div className="px-2 py-1.5 rounded-lg bg-[#090d16] border border-slate-800 text-[10px] leading-snug text-slate-300">
                {stage === 'settled' || stage === 'shaking' ? (
                  currentOutcome.explanation
                ) : (
                  <span>
                    Bandingkan bilangan petala elektron: <strong className="text-white">{oxSpec.atomLabel}</strong> ({oxSpec.shellCount} petala) vs <strong className="text-white">{redSpec.ionLabel}</strong> ({redSpec.shellCount} petala).
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* BAHAGIAN BAWAH: MATRIKS EKSPLORASI 3x3 & PANEL PERSAMAAN */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5">
            {/* MATRIKS EKSPLORASI 3x3 (BAWAH KIRI) */}
            <div className="lg:col-span-6 bg-[#111827] border border-slate-800 rounded-xl p-2.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-white">
                  Matriks Eksplorasi 3×3 (Klik petak untuk pilih pasangan)
                </h4>
                <span className="text-[10px] text-slate-400">Baris: Halogen | Lajur: Halida</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-[10.5px] border-collapse">
                  <thead>
                    <tr className="text-slate-300">
                      <th className="p-1.5 text-left border border-slate-800 bg-[#090d16]">Halogen \ Halida</th>
                      {HALIDES.map((ha) => (
                        <th key={ha.id} className="p-1.5 text-center border border-slate-800 bg-[#090d16] text-red-300">
                          {ha.formula.replace('(ak)', '')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {HALOGENS.map((hx) => (
                      <tr key={hx.id}>
                        <td className="p-1.5 font-bold border border-slate-800 bg-[#090d16] text-blue-300">
                          {hx.formula.replace('(ak)', '')}
                        </td>
                        {HALIDES.map((ha) => {
                          const key = `${hx.id}-${ha.id}`;
                          const rec = matrixRecords[key];
                          const isCurrent = key === currentPairKey;
                          return (
                            <td
                              key={key}
                              onClick={() => {
                                if (stage === 'shaking') return;
                                setSelectedHalogen(hx.id);
                                setSelectedHalide(ha.id);
                                setStage('empty');
                              }}
                              className={`p-1.5 border text-center cursor-pointer transition ${
                                isCurrent
                                  ? 'border-yellow-400 bg-slate-900/90'
                                  : 'border-slate-800 bg-[#090d16] hover:bg-slate-900/60'
                              }`}
                            >
                              {rec ? (
                                <div className="flex flex-col items-center gap-0.5">
                                  <span
                                    className={`text-[9.5px] font-bold ${
                                      rec.displaced ? 'text-emerald-300' : 'text-red-300'
                                    }`}
                                  >
                                    {rec.displaced ? 'Penyesaran Berlaku' : 'Tiada Tindak Balas'}
                                  </span>
                                  <span className="inline-flex items-center gap-1 text-[9px] text-slate-200">
                                    <span
                                      className="w-2.5 h-2.5 rounded-full border border-white/40 inline-block"
                                      style={{ backgroundColor: `rgb(${rec.organicRgb.join(',')})` }}
                                    />
                                    {rec.organicColorLabel}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-[9.5px] text-slate-500">Belum diuji</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PANEL PERSAMAAN & ANALISIS REDOKS (BAWAH KANAN) */}
            <div className="lg:col-span-6 bg-[#111827] border border-slate-800 rounded-xl p-2.5 flex flex-col justify-between space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-xs font-extrabold text-white">
                  Panel Persamaan Redoks ({oxSpec.formula.replace('(ak)', '')} + {redSpec.formula.replace('(ak)', '')})
                </h4>
                {stage === 'settled' && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      currentOutcome.displaced
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                        : 'bg-red-950 text-red-300 border-red-500/40'
                    }`}
                  >
                    {currentOutcome.displaced ? 'Penyesaran Berlaku' : 'Tiada Tindak Balas'}
                  </span>
                )}
              </div>

              {stage === 'settled' ? (
                <div className="space-y-1.5 text-[11px]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    <div className="bg-[#090d16] border border-red-500/30 rounded-lg px-2.5 py-1.5">
                      <div className="text-[9.5px] font-bold uppercase text-red-300">
                        Setengah Pengoksidaan
                      </div>
                      <div className="font-mono text-white font-semibold mt-0.5">
                        {currentOutcome.halfEqOxidation}
                      </div>
                    </div>
                    <div className="bg-[#090d16] border border-blue-500/30 rounded-lg px-2.5 py-1.5">
                      <div className="text-[9.5px] font-bold uppercase text-blue-300">
                        Setengah Penurunan
                      </div>
                      <div className="font-mono text-white font-semibold mt-0.5">
                        {currentOutcome.halfEqReduction}
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#090d16] border border-yellow-400/40 rounded-lg px-2.5 py-1.5">
                    <div className="text-[9.5px] font-bold uppercase text-yellow-300">
                      Persamaan Ionik Keseluruhan
                    </div>
                    <div className="font-mono text-yellow-100 font-bold text-xs mt-0.5">
                      {currentOutcome.overallIonicEq}
                    </div>
                  </div>

                  <div className="bg-slate-900/80 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10.5px] text-slate-300 flex items-center justify-between gap-2">
                    <span>
                      Warna lapisan <strong className="text-white">CH₃CCl₃</strong>:{' '}
                      <strong className="text-yellow-300">{currentOutcome.organicColorLabel}</strong>
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Kekuatan pengoksidaan: Cl₂ &gt; Br₂ &gt; I₂
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-[#090d16] border border-slate-800 rounded-xl p-3 text-xs text-slate-300 space-y-1 flex-1 flex flex-col justify-center">
                  <p className="font-semibold text-white">
                    Lengkapkan Langkah 1, 2 dan 3 untuk merekod keputusan ujian ini.
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Selepas tabung uji digoncang, keputusan penyesaran, warna lapisan 1,1,1-trikloroetana serta persamaan setengah & ionik akan dipaparkan di sini dan direkodkan ke dalam Matriks 3×3.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        /* TAB 2: NOTA KSSM & TREND KUMPULAN 17 */
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-[#111827] border border-blue-500/30 rounded-xl p-3.5 space-y-2">
              <h4 className="text-sm font-extrabold text-blue-300">
                1. Mengapa 1,1,1-Trikloroetana (CH₃CCl₃) Digunakan?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dalam larutan akueus, warna air bromin dan larutan iodin kelihatan hampir serupa (perang/kuning). Pelarut organik <strong>1,1,1-trikloroetana</strong> yang lebih tumpat membentuk lapisan berasingan di bahagian bawah tabung uji dan membezakan halogen bebas dengan jelas:
              </p>
              <ul className="text-xs text-slate-200 space-y-1 pl-4 list-disc">
                <li><strong>Klorin (Cl₂):</strong> Kuning pucat / hampir tidak berwarna</li>
                <li><strong>Bromin (Br₂):</strong> Perang / perang kemerahan</li>
                <li><strong>Iodin (I₂):</strong> Ungu terang</li>
              </ul>
            </div>

            <div className="bg-[#111827] border border-yellow-500/30 rounded-xl p-3.5 space-y-2">
              <h4 className="text-sm font-extrabold text-yellow-300">
                2. Trend Kekuatan Pengoksidaan Kumpulan 17
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Menuruni Kumpulan 17 (<strong>Cl₂ → Br₂ → I₂</strong>), bilangan petala berisi elektron bertambah dan saiz atom semakin besar. Daya tarikan nukleus terhadap elektron luar menjadi semakin lemah.
              </p>
              <div className="bg-[#090d16] p-2.5 rounded-lg border border-slate-800 text-xs text-slate-200 space-y-1">
                <div><strong className="text-emerald-300">Kekuatan Agen Pengoksidaan:</strong> Cl₂ &gt; Br₂ &gt; I₂</div>
                <div><strong className="text-red-300">Kekuatan Agen Penurunan:</strong> I⁻ &gt; Br⁻ &gt; Cl⁻</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PEMBESAR KANTA SUBMIKROSKOPIK */}
      {isLoupeExpanded && (
        <div className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b0f19] border border-yellow-400/50 rounded-2xl p-5 max-w-md w-full space-y-3 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-yellow-300">
                  Kanta Pembesar Tarikan Elektron (Kumpulan 17)
                </h4>
                <p className="text-xs text-slate-400">
                  {oxSpec.name} + {redSpec.name}
                </p>
              </div>
              <button
                onClick={() => setIsLoupeExpanded(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <ElectronegativityLoupeCanvas
              halogenId={selectedHalogen}
              halideId={selectedHalide}
              stage={stage}
              size={300}
            />

            <p className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 leading-relaxed">
              {currentOutcome.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HalogenDisplacementLab;
