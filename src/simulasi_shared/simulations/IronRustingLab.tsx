import React, { useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Eye,
  FlaskConical,
  HelpCircle,
  LayoutGrid,
  Maximize2,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  X,
  XCircle,
} from 'lucide-react';
import { analytics } from '../services/analytics';

type TubeId = 'A' | 'B' | 'C' | 'D' | 'E';
type ViewMode = 'compare' | 'focus';
type SpotColor = 'biru-tua' | 'merah-jambu';

interface TubeSpec {
  id: TubeId;
  shortLabel: string;
  metalWrapped: string | null;
  metalSymbol: string | null;
  metalE0: number | null;
  coilColor: string | null;
  dominantColor: SpotColor;
  colorIntensity: number; // 0.55..1.0 radius/opacity scale at 48h
  spotDescription: string;
  oxidizedSpecies: string;
  anodeHalfEq: string;
  cathodeHalfEq: string;
  rustStatus: 'Berkarat' | 'Dilindungi';
  statusNote: string;
  submicroNote: string;
}

const TUBES: TubeSpec[] = [
  {
    id: 'A',
    shortLabel: 'Fe sahaja (Kawalan)',
    metalWrapped: null,
    metalSymbol: null,
    metalE0: null,
    coilColor: null,
    dominantColor: 'biru-tua',
    colorIntensity: 0.62,
    spotDescription: 'Tompok biru tua sederhana terbentuk (pengaratan perlahan berlaku).',
    oxidizedSpecies: 'Besi (Fe)',
    anodeHalfEq: 'Fe(p) → Fe²⁺(ak) + 2e⁻',
    cathodeHalfEq: 'O₂(g) + 2H₂O(ce) + 4e⁻ → 4OH⁻(ak)',
    rustStatus: 'Berkarat',
    statusNote: 'Berkarat (Kadar perlahan — kawalan)',
    submicroNote: 'Atom Fe membebaskan e⁻ menjadi ion Fe²⁺ (biru tua dengan K₃[Fe(CN)₆]).',
  },
  {
    id: 'B',
    shortLabel: 'Fe + Jalur Magnesium (Mg)',
    metalWrapped: 'Magnesium',
    metalSymbol: 'Mg',
    metalE0: -2.38,
    coilColor: '#e2e8f0',
    dominantColor: 'merah-jambu',
    colorIntensity: 1.0,
    spotDescription: 'Tompok merah jambu sangat terang dan luas; tiada warna biru tua.',
    oxidizedSpecies: 'Magnesium (Mg) — Lebih elektropositif',
    anodeHalfEq: 'Mg(p) → Mg²⁺(ak) + 2e⁻',
    cathodeHalfEq: 'O₂(g) + 2H₂O(ce) + 4e⁻ → 4OH⁻(ak)',
    rustStatus: 'Dilindungi',
    statusNote: 'Dilindungi sepenuhnya (Perlindungan korban)',
    submicroNote: 'Mg (E° = -2.38 V) melepaskan e⁻ kepada Fe; O₂ & H₂O diturunkan menjadi ion OH⁻ (merah jambu).',
  },
  {
    id: 'C',
    shortLabel: 'Fe + Jalur Zink (Zn)',
    metalWrapped: 'Zink',
    metalSymbol: 'Zn',
    metalE0: -0.76,
    coilColor: '#94a3b8',
    dominantColor: 'merah-jambu',
    colorIntensity: 0.82,
    spotDescription: 'Tompok merah jambu terang terbentuk; tiada warna biru tua.',
    oxidizedSpecies: 'Zink (Zn) — Lebih elektropositif',
    anodeHalfEq: 'Zn(p) → Zn²⁺(ak) + 2e⁻',
    cathodeHalfEq: 'O₂(g) + 2H₂O(ce) + 4e⁻ → 4OH⁻(ak)',
    rustStatus: 'Dilindungi',
    statusNote: 'Dilindungi (Perlindungan korban)',
    submicroNote: 'Zn (E° = -0.76 V) melepaskan e⁻ kepada Fe; ion OH⁻ terbentuk di permukaan paku besi.',
  },
  {
    id: 'D',
    shortLabel: 'Fe + Jalur Timah (Sn)',
    metalWrapped: 'Timah',
    metalSymbol: 'Sn',
    metalE0: -0.14,
    coilColor: '#cbd5e1',
    dominantColor: 'biru-tua',
    colorIntensity: 0.82,
    spotDescription: 'Tompok biru tua yang pekat (pengaratan besi dipercepatkan).',
    oxidizedSpecies: 'Besi (Fe) — Lebih elektropositif drp Sn',
    anodeHalfEq: 'Fe(p) → Fe²⁺(ak) + 2e⁻',
    cathodeHalfEq: 'O₂(g) + 2H₂O(ce) + 4e⁻ → 4OH⁻(ak)',
    rustStatus: 'Berkarat',
    statusNote: 'Berkarat (Pengaratan dipercepatkan)',
    submicroNote: 'Fe (E° = -0.44 V) membebaskan e⁻ ke jalur Sn (E° = -0.14 V) membentuk banyak ion Fe²⁺.',
  },
  {
    id: 'E',
    shortLabel: 'Fe + Jalur Kuprum (Cu)',
    metalWrapped: 'Kuprum',
    metalSymbol: 'Cu',
    metalE0: 0.34,
    coilColor: '#ea580c',
    dominantColor: 'biru-tua',
    colorIntensity: 1.0,
    spotDescription: 'Tompok biru tua paling pekat dan luas (pengaratan paling cepat).',
    oxidizedSpecies: 'Besi (Fe) — Jauh lebih elektropositif drp Cu',
    anodeHalfEq: 'Fe(p) → Fe²⁺(ak) + 2e⁻',
    cathodeHalfEq: 'O₂(g) + 2H₂O(ce) + 4e⁻ → 4OH⁻(ak)',
    rustStatus: 'Berkarat',
    statusNote: 'Berkarat (Pengaratan paling cepat)',
    submicroNote: 'Beza E° besar antara Fe (-0.44 V) dan Cu (+0.34 V) memacu pengoksidaan Fe dengan sangat pantas.',
  },
];

interface KbatQuestion {
  id: 'ship' | 'can';
  title: string;
  question: string;
  options: { key: 'A' | 'B'; text: string; isCorrect: boolean }[];
  explanation: string;
}

const KBAT_QUESTIONS: KbatQuestion[] = [
  {
    id: 'ship',
    title: 'KBAT 1: Bongkah Zink pada Badan Kapal',
    question: 'Mengapakah bongkah zink dipasang pada badan kapal besi di bawah paras air laut?',
    options: [
      {
        key: 'A',
        text: 'Zink lebih elektropositif daripada besi dan terkakis secara korban untuk melindungi besi.',
        isCorrect: true,
      },
      {
        key: 'B',
        text: 'Zink bertindak sebagai lapisan penebat kedap air di atas keseluruhan badan kapal.',
        isCorrect: false,
      },
    ],
    explanation:
      'Tepat! Zn (E° = -0.76 V) lebih elektropositif daripada Fe (-0.44 V), maka Zn dioksidakan menggantikan besi (perlindungan korban).',
  },
  {
    id: 'can',
    title: 'KBAT 2: Tin Makanan Bersadur Timah yang Kemek',
    question: 'Mengapakah tin makanan besi bersadur timah (Sn) berkarat lebih cepat apabila kemek dan tercalar?',
    options: [
      {
        key: 'A',
        text: 'Timah lebih elektropositif lalu menghantar ion Sn²⁺ ke dalam besi.',
        isCorrect: false,
      },
      {
        key: 'B',
        text: 'Besi lebih elektropositif daripada timah; apabila terdedah, pengaratan besi dipercepatkan.',
        isCorrect: true,
      },
    ],
    explanation:
      'Tepat! Apabila lapisan Sn calar, Fe (-0.44 V) menjadi anod berbanding Sn (-0.14 V), menyebabkan Fe mengion kepada Fe²⁺ dengan lebih cepat.',
  },
];

function getTube(id: TubeId): TubeSpec {
  return TUBES.find((t) => t.id === id)!;
}

interface AgarAgarTubesCanvasProps {
  viewMode: ViewMode;
  selectedTube: TubeId;
  timeHours: number;
  onSelectTube: (id: TubeId) => void;
}

const AgarAgarTubesCanvas: React.FC<AgarAgarTubesCanvasProps> = ({
  viewMode,
  selectedTube,
  timeHours,
  onSelectTube,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ viewMode, selectedTube, timeHours });
  stateRef.current = { viewMode, selectedTube, timeHours };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;

    const drawSingleAgarTube = (
      cx: number,
      topY: number,
      tubeW: number,
      tubeH: number,
      tube: TubeSpec,
      timeFrac: number,
      isSelected: boolean,
      isZoomed: boolean
    ) => {
      const r = tubeW / 2;
      const bottomY = topY + tubeH;
      const agarTop = topY + Math.round(tubeH * 0.2);

      // Highlight halo behind selected tube
      if (isSelected && !isZoomed) {
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.75)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(cx - r - 6, topY - 6, tubeW + 12, tubeH + 14, 10);
        ctx.stroke();
      }

      // Clip inside glass wall
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx - r + 2, topY + 6);
      ctx.lineTo(cx - r + 2, bottomY - r);
      ctx.arc(cx, bottomY - r, r - 2, Math.PI, 0, true);
      ctx.lineTo(cx + r - 2, topY + 6);
      ctx.closePath();
      ctx.clip();

      // Translucent Agar-Agar Gel medium
      ctx.fillStyle = 'rgba(148, 163, 184, 0.16)';
      ctx.fillRect(cx - r, agarTop, tubeW, bottomY - agarTop);

      // Agar-agar color blooms growing from 0 -> 48h!
      if (timeFrac > 0.02) {
        const growth = Math.pow(timeFrac, 0.85) * tube.colorIntensity;
        const maxBloomR = (isZoomed ? 44 : 23) * (0.35 + growth * 0.85);
        const bloomCx = cx;
        const bloomCy = agarTop + (bottomY - agarTop) * 0.56;

        const grad = ctx.createRadialGradient(
          bloomCx,
          bloomCy,
          2,
          bloomCx,
          bloomCy,
          maxBloomR
        );
        if (tube.dominantColor === 'biru-tua') {
          grad.addColorStop(0, `rgba(29, 78, 216, ${0.95 * growth})`);
          grad.addColorStop(0.5, `rgba(30, 64, 175, ${0.72 * growth})`);
          grad.addColorStop(1, 'rgba(30, 58, 138, 0)');
        } else {
          grad.addColorStop(0, `rgba(236, 72, 153, ${0.95 * growth})`);
          grad.addColorStop(0.5, `rgba(219, 39, 119, ${0.68 * growth})`);
          grad.addColorStop(1, 'rgba(190, 24, 93, 0)');
        }
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(bloomCx, bloomCy, maxBloomR * 0.9, maxBloomR * 1.45, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Iron nail inside agar-agar (tilted slightly or upright in center)
      const nailTop = agarTop + (isZoomed ? 12 : 8);
      const nailBottom = bottomY - (isZoomed ? 18 : 12);
      const nailW = isZoomed ? 9 : 5;
      const headW = isZoomed ? 18 : 10;

      // Nail shaft & point
      ctx.fillStyle = '#94a3b8';
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - headW / 2, nailTop);
      ctx.lineTo(cx + headW / 2, nailTop);
      ctx.lineTo(cx + headW / 2, nailTop + (isZoomed ? 5 : 3));
      ctx.lineTo(cx + nailW / 2, nailTop + (isZoomed ? 5 : 3));
      ctx.lineTo(cx + nailW / 2, nailBottom - 7);
      ctx.lineTo(cx, nailBottom);
      ctx.lineTo(cx - nailW / 2, nailBottom - 7);
      ctx.lineTo(cx - nailW / 2, nailTop + (isZoomed ? 5 : 3));
      ctx.lineTo(cx - headW / 2, nailTop + (isZoomed ? 5 : 3));
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Coiled metal strip around middle of nail (for B, C, D, E)
      if (tube.coilColor) {
        const coilStart = nailTop + (nailBottom - nailTop) * 0.34;
        const coilGap = isZoomed ? 9 : 6;
        ctx.strokeStyle = tube.coilColor;
        ctx.lineWidth = isZoomed ? 4.2 : 2.6;
        ctx.lineCap = 'round';
        for (let k = 0; k < 4; k++) {
          const cy = coilStart + k * coilGap;
          ctx.beginPath();
          ctx.moveTo(cx - nailW - (isZoomed ? 3 : 2), cy);
          ctx.lineTo(cx + nailW + (isZoomed ? 3 : 2), cy + 2.5);
          ctx.stroke();
        }
      }

      // Gel meniscus
      ctx.strokeStyle = 'rgba(203, 213, 225, 0.55)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(cx - r + 2, agarTop);
      ctx.quadraticCurveTo(cx, agarTop + 4, cx + r - 2, agarTop);
      ctx.stroke();

      ctx.restore();

      // Outer glass wall
      ctx.strokeStyle = isSelected ? '#facc15' : '#94a3b8';
      ctx.lineWidth = isSelected ? 2 : 1.7;
      ctx.beginPath();
      ctx.moveTo(cx - r, topY);
      ctx.lineTo(cx - r, bottomY - r);
      ctx.arc(cx, bottomY - r, r, Math.PI, 0, true);
      ctx.lineTo(cx + r, topY);
      ctx.stroke();

      // Rim ellipse
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.ellipse(cx, topY, r + 1.5, 3, 0, 0, Math.PI * 2);
      ctx.stroke();
    };

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const cssW = 540;
      const cssH = 194;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      const { viewMode: vm, selectedTube: sel, timeHours: hrs } = stateRef.current;
      const timeFrac = hrs / 48;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);

      ctx.fillStyle = '#070b14';
      ctx.fillRect(0, 0, cssW, cssH);

      if (vm === 'compare') {
        // Wooden / dark metal 5-tube rack base
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.roundRect(26, 154, 488, 10, 4);
        ctx.fill();
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Top rack crossbar
        ctx.fillStyle = 'rgba(30, 41, 59, 0.72)';
        ctx.fillRect(36, 40, 468, 5);

        const centers = [78, 174, 270, 366, 462];
        TUBES.forEach((tube, idx) => {
          const cx = centers[idx];
          const isSel = tube.id === sel;
          drawSingleAgarTube(cx, 20, 40, 134, tube, timeFrac, isSel, false);

          // Bottom labels A..E
          ctx.textAlign = 'center';
          ctx.fillStyle = isSel ? '#fde047' : '#ffffff';
          ctx.font = '800 10.5px ui-sans-serif, system-ui, sans-serif';
          ctx.fillText(`Tabung ${tube.id}`, cx, 177);

          ctx.fillStyle = isSel ? '#fde047' : '#94a3b8';
          ctx.font = '600 9px ui-sans-serif, system-ui, sans-serif';
          ctx.fillText(tube.metalSymbol ? `Fe + ${tube.metalSymbol}` : 'Fe sahaja', cx, 188);
        });
      } else {
        // FOCUS 1 TUBE WITH FULL TEXTBOOK CALLOUT LABELS
        const tube = getTube(sel);
        const cx = 190;
        drawSingleAgarTube(cx, 18, 64, 152, tube, timeFrac, true, true);

        // Clean rack base
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.roundRect(128, 170, 124, 9, 4);
        ctx.fill();

        // Textbook labels
        ctx.textAlign = 'left';
        ctx.font = '700 10.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillStyle = '#fde047';
        ctx.fillText(`Tabung Uji ${tube.id}: ${tube.shortLabel}`, 250, 36);

        ctx.font = '600 10px ui-sans-serif, system-ui, sans-serif';
        ctx.fillStyle = '#e2e8f0';
        ctx.fillText('Medium agar-agar panas', 250, 68);
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('+ K₃[Fe(CN)₆] + fenolftalein', 250, 82);

        ctx.fillStyle = '#cbd5e1';
        ctx.fillText('Paku besi (Fe)', 250, 112);
        if (tube.metalWrapped) {
          ctx.fillStyle = '#38bdf8';
          ctx.fillText(`Lilitan jalur ${tube.metalWrapped} (${tube.metalSymbol})`, 250, 134);
        }

        // Dashed leader lines
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 2]);
        ctx.beginPath();
        ctx.moveTo(cx + 34, 70);
        ctx.lineTo(244, 70);
        ctx.moveTo(cx + 12, 110);
        ctx.lineTo(244, 110);
        if (tube.metalWrapped) {
          ctx.moveTo(cx + 14, 132);
          ctx.lineTo(244, 132);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Spot color result badge
        ctx.fillStyle = tube.dominantColor === 'biru-tua' ? '#60a5fa' : '#f472b6';
        ctx.font = '700 10.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(
          timeFrac < 0.05
            ? `Masa: 0 jam (Belum bertindak balas)`
            : tube.dominantColor === 'biru-tua'
            ? `Kesan (${hrs}j): Tompok Biru Tua`
            : `Kesan (${hrs}j): Tompok Merah Jambu`,
          250,
          162
        );
      }

      ctx.restore();
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (viewMode !== 'compare') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xRel = ((e.clientX - rect.left) / rect.width) * 540;
    const centers = [78, 174, 270, 366, 462];
    let bestIdx = 0;
    let bestDist = Infinity;
    centers.forEach((c, idx) => {
      const d = Math.abs(xRel - c);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = idx;
      }
    });
    if (bestDist <= 48) {
      onSelectTube(TUBES[bestIdx].id);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      style={{ width: 540, height: 194 }}
      className="w-full max-w-[540px] h-[194px] mx-auto block rounded-xl border border-slate-800 bg-[#070b14] cursor-pointer"
    />
  );
};

interface RustSubmicroCanvasProps {
  tube: TubeSpec;
  timeHours: number;
  size?: number;
}

const RustSubmicroCanvas: React.FC<RustSubmicroCanvasProps> = ({
  tube,
  timeHours,
  size = 200,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ tube, timeHours, size });
  stateRef.current = { tube, timeHours, size };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const startMs = performance.now();

    const drawSphere = (
      x: number,
      y: number,
      r: number,
      fill: string,
      label: string,
      textColor = '#ffffff'
    ) => {
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.45)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = textColor;
      ctx.font = `800 ${r >= 11 ? 8 : 7}px ui-sans-serif, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x, y + 0.5);
    };

    const render = (now: number) => {
      const t = (now - startMs) / 1000;
      const { tube: tb, size: boxSize } = stateRef.current;

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
      const sc = cssW / 200;

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, lensR, 0, Math.PI * 2);
      ctx.clip();

      const bg = ctx.createRadialGradient(cx, cy, 8, cx, cy, lensR);
      bg.addColorStop(0, '#111827');
      bg.addColorStop(1, '#04070e');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, cssW, cssH);

      const phase = (t * 0.85) % 1;
      const isProtected = tb.rustStatus === 'Dilindungi';

      // Left solid metal bar (Fe surface) & Right wrapped metal strip (or cathodic side)
      ctx.fillStyle = '#64748b';
      ctx.fillRect(22 * sc, 54 * sc, 36 * sc, 94 * sc);
      ctx.fillStyle = '#ffffff';
      ctx.font = `800 ${9 * sc}px ui-sans-serif, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('Besi (Fe)', 40 * sc, 102 * sc);

      if (tb.metalSymbol) {
        ctx.fillStyle = tb.coilColor!;
        ctx.fillRect(142 * sc, 54 * sc, 36 * sc, 94 * sc);
        ctx.fillStyle = '#090d16';
        ctx.fillText(tb.metalSymbol, 160 * sc, 102 * sc);
      }

      if (isProtected) {
        // Mg or Zn sends yellow electrons INTO Iron (right -> left)!
        ctx.fillStyle = '#f472b6';
        ctx.font = `800 ${8.2 * sc}px ui-sans-serif, system-ui, sans-serif`;
        ctx.fillText(`${tb.metalSymbol} → ${tb.metalSymbol}²⁺ + 2e⁻`, cx, 42 * sc);

        // Yellow electron flowing from Mg/Zn (right) -> Fe (left)
        const ex = (142 - phase * 84) * sc;
        ctx.save();
        ctx.shadowColor = '#fde047';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(ex, 84 * sc, 4 * sc, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Mg2+ / Zn2+ ion detaching from right strip
        drawSphere(
          (134 - phase * 18) * sc,
          64 * sc,
          10.5 * sc,
          '#94a3b8',
          `${tb.metalSymbol}²⁺`,
          '#090d16'
        );

        // O2 + H2O near Iron surface accepting electrons -> Pink OH- ions!
        drawSphere(
          (72 + phase * 30) * sc,
          128 * sc,
          11 * sc,
          '#ec4899',
          'OH⁻',
          '#ffffff'
        );

        ctx.fillStyle = '#f472b6';
        ctx.font = `700 ${8 * sc}px ui-sans-serif, system-ui, sans-serif`;
        ctx.fillText('Ion OH⁻ → Merah Jambu', cx, 162 * sc);
      } else {
        // Fe loses electrons -> becomes Deep Blue Fe2+ spheres!
        ctx.fillStyle = '#60a5fa';
        ctx.font = `800 ${8.2 * sc}px ui-sans-serif, system-ui, sans-serif`;
        ctx.fillText('Fe → Fe²⁺ + 2e⁻', cx, 42 * sc);

        // Yellow electron flowing from Fe (left) -> Sn/Cu (or cathode on right)
        const ex = (58 + phase * 84) * sc;
        ctx.save();
        ctx.shadowColor = '#fde047';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(ex, 84 * sc, 4 * sc, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Deep blue Fe2+ spheres entering agar-agar
        drawSphere(
          (68 + phase * 36) * sc,
          124 * sc,
          11.5 * sc,
          '#1d4ed8',
          'Fe²⁺',
          '#ffffff'
        );

        ctx.fillStyle = '#60a5fa';
        ctx.font = `700 ${8 * sc}px ui-sans-serif, system-ui, sans-serif`;
        ctx.fillText('Ion Fe²⁺ → Biru Tua', cx, 162 * sc);
      }

      ctx.restore();

      // Magnifier rim
      ctx.strokeStyle = isProtected ? '#f472b6' : '#3b82f6';
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

export const IronRustingLab: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('compare');
  const [selectedTube, setSelectedTube] = useState<TubeId>('B');
  const [timeHours, setTimeHours] = useState<number>(36);
  const [poeMode, setPoeMode] = useState<boolean>(false);
  const [poeGuesses, setPoeGuesses] = useState<Partial<Record<TubeId, SpotColor>>>({});
  const [poeRevealed, setPoeRevealed] = useState<boolean>(false);
  const [showReagentInfo, setShowReagentInfo] = useState<boolean>(false);
  const [isMagnifierExpanded, setIsMagnifierExpanded] = useState<boolean>(false);
  const [kbatAnswers, setKbatAnswers] = useState<Partial<Record<'ship' | 'can', 'A' | 'B'>>>({});

  const hasRecordedCompletionRef = useRef(false);
  const currentTube = getTube(selectedTube);

  const allPoePredicted = TUBES.every((t) => poeGuesses[t.id] !== undefined);
  const poeScore = TUBES.filter((t) => poeGuesses[t.id] === t.dominantColor).length;
  const sliderLocked = poeMode && !poeRevealed;

  // Analytics completion after exploring tubes / passing KBAT or POE
  useEffect(() => {
    const kbatDone = Object.keys(kbatAnswers).length >= 1;
    if ((timeHours >= 24 && kbatDone) || poeRevealed) {
      if (!hasRecordedCompletionRef.current) {
        hasRecordedCompletionRef.current = true;
        analytics.recordSimulationCompleted('pengaratan-besi-sentuhan-logam');
      }
    }
  }, [timeHours, kbatAnswers, poeRevealed]);

  const handleTogglePoeMode = () => {
    if (!poeMode) {
      setPoeMode(true);
      setPoeGuesses({});
      setPoeRevealed(false);
      setTimeHours(0);
    } else {
      setPoeMode(false);
      setPoeRevealed(false);
    }
  };

  const handleReset = () => {
    setTimeHours(0);
    setPoeGuesses({});
    setPoeRevealed(false);
    setKbatAnswers({});
  };

  return (
    <div className="bg-[#0b0f19] text-white rounded-2xl p-3 border border-slate-800 shadow-2xl space-y-2">
      {/* HEADER BAR & EXPERIMENT CONTROLS */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 pb-1.5 border-b border-slate-800">
        <div className="flex flex-wrap items-center gap-1.5">
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-[11px] font-bold text-yellow-300">
            <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
            <span>Simulasi Redoks: Pengaratan Besi & Sentuhan Logam</span>
          </div>

          <div className="inline-flex bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode('compare')}
              className={`px-2 py-0.5 rounded-md text-[10.5px] font-bold flex items-center gap-1 transition cursor-pointer ${
                viewMode === 'compare' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3 h-3" />
              5 Tabung Serentak
            </button>
            <button
              onClick={() => setViewMode('focus')}
              className={`px-2 py-0.5 rounded-md text-[10.5px] font-bold flex items-center gap-1 transition cursor-pointer ${
                viewMode === 'focus' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3 h-3" />
              Fokus 1 Tabung
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={handleTogglePoeMode}
            className={`px-2 py-1 rounded-lg text-[10.5px] font-bold border transition flex items-center gap-1 cursor-pointer ${
              poeMode
                ? 'bg-yellow-500 text-slate-950 border-yellow-400'
                : 'bg-slate-900 text-yellow-300 border-yellow-500/40 hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            {poeMode ? 'Mod Ramalan POE: Aktif' : 'Mod Kuiz Ramalan (POE)'}
          </button>

          <button
            onClick={() => setShowReagentInfo(true)}
            className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-sky-500/40 text-sky-300 text-[10.5px] font-bold flex items-center gap-1 cursor-pointer"
          >
            <HelpCircle className="w-3 h-3" />
            Info Fungsi Reagen
          </button>

          <button
            onClick={handleReset}
            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-[10.5px] font-bold flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Set Semula
          </button>
        </div>
      </div>

      {/* TIME-LAPSE SLIDER & POE BAR */}
      <div className="bg-[#111827] border border-slate-800 rounded-xl px-3 py-2 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <Clock className="w-3.5 h-3.5 text-yellow-400" />
            <span>Peluncur Masa (Time-Lapse):</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 font-mono text-yellow-300">
              {timeHours} jam
            </span>
          </div>

          <div className="flex-1 min-w-[200px] flex items-center gap-2">
            <span className="text-[10px] text-slate-400">0j</span>
            <input
              type="range"
              aria-label="Peluncur Masa Jam"
              min={0}
              max={48}
              step={2}
              value={timeHours}
              disabled={sliderLocked}
              onChange={(e) => setTimeHours(Number(e.target.value))}
              className="w-full accent-yellow-400 cursor-pointer disabled:opacity-40"
            />
            <span className="text-[10px] text-slate-400">48j</span>
          </div>

          <div className="flex items-center gap-1">
            {[0, 24, 48].map((h) => (
              <button
                key={h}
                disabled={sliderLocked}
                onClick={() => setTimeHours(h)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold border cursor-pointer disabled:opacity-40 ${
                  timeHours === h
                    ? 'bg-yellow-500 text-slate-950 border-yellow-400'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                }`}
              >
                {h}j
              </button>
            ))}
          </div>
        </div>

        {/* POE Prediction Strip (when Mod Kuiz Ramalan is active) */}
        {poeMode && (
          <div className="pt-1.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <div className="grid grid-cols-5 gap-1.5 flex-1 min-w-[460px]">
              {TUBES.map((tb) => {
                const guess = poeGuesses[tb.id];
                const isCorrect = guess === tb.dominantColor;
                return (
                  <div
                    key={tb.id}
                    className="bg-[#090d16] border border-slate-800 rounded-lg px-2 py-1 flex items-center justify-between gap-1"
                  >
                    <span className="text-[10px] font-bold text-slate-200">
                      {tb.id} ({tb.metalSymbol ?? 'Fe'})
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        disabled={poeRevealed}
                        onClick={() => setPoeGuesses((p) => ({ ...p, [tb.id]: 'biru-tua' }))}
                        className={`px-1.5 py-0.5 rounded text-[9px] font-bold border cursor-pointer ${
                          guess === 'biru-tua'
                            ? 'bg-blue-600 text-white border-blue-400'
                            : 'bg-slate-900 text-blue-300 border-slate-700'
                        }`}
                      >
                        Biru
                      </button>
                      <button
                        disabled={poeRevealed}
                        onClick={() => setPoeGuesses((p) => ({ ...p, [tb.id]: 'merah-jambu' }))}
                        className={`px-1.5 py-0.5 rounded text-[9px] font-bold border cursor-pointer ${
                          guess === 'merah-jambu'
                            ? 'bg-pink-600 text-white border-pink-400'
                            : 'bg-slate-900 text-pink-300 border-slate-700'
                        }`}
                      >
                        Jambu
                      </button>
                      {poeRevealed &&
                        (isCorrect ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {!poeRevealed ? (
              <button
                disabled={!allPoePredicted}
                onClick={() => {
                  setPoeRevealed(true);
                  setTimeHours(48);
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-[10.5px] font-bold cursor-pointer shrink-0"
              >
                Sahkan Ramalan & Uji (48j)
              </button>
            ) : (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold">
                Skor POE: {poeScore} / 5 Betul
              </span>
            )}
          </div>
        )}
      </div>

      {/* BAHAGIAN TENGAH: KANVAS 5 TABUNG UJI (KIRI-TENGAH) + KANTA SUBMIKROSKOPIK (KANAN) */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-2.5 items-stretch">
        {/* KANVAS AGAR-AGAR */}
        <div className="bg-[#111827] border border-slate-800 rounded-xl p-2.5 flex flex-col justify-between space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold text-slate-200 flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5 text-sky-400" />
              Medium Agar-Agar + Kalium Heksasianoferat(III) + Fenolftalein (Klik tabung untuk analisis)
            </span>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="inline-flex items-center gap-1 text-blue-300 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                Biru Tua = Ion Fe²⁺
              </span>
              <span className="inline-flex items-center gap-1 text-pink-300 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block" />
                Merah Jambu = Ion OH⁻
              </span>
            </div>
          </div>

          <AgarAgarTubesCanvas
            viewMode={viewMode}
            selectedTube={selectedTube}
            timeHours={timeHours}
            onSelectTube={setSelectedTube}
          />

          {/* Quick clickable A-E buttons */}
          <div className="grid grid-cols-5 gap-1.5">
            {TUBES.map((tb) => {
              const active = tb.id === selectedTube;
              return (
                <button
                  key={tb.id}
                  onClick={() => setSelectedTube(tb.id)}
                  className={`px-2 py-1 rounded-lg border text-[10px] font-bold transition cursor-pointer ${
                    active
                      ? 'bg-yellow-500/20 border-yellow-400 text-yellow-200'
                      : 'bg-[#090d16] border-slate-800 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {tb.id}: {tb.metalSymbol ? `Fe + ${tb.metalSymbol}` : 'Fe sahaja'}
                </button>
              );
            })}
          </div>
        </div>

        {/* KANTA PEMBESAR SUBMIKROSKOPIK */}
        <div className="bg-[#111827] border border-yellow-500/35 rounded-xl p-2.5 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <div>
              <h4 className="text-[11px] font-extrabold uppercase tracking-wide text-yellow-300">
                Kanta Pembesar ({currentTube.id})
              </h4>
              <p className="text-[9.5px] text-slate-400">{currentTube.shortLabel}</p>
            </div>
            <button
              onClick={() => setIsMagnifierExpanded(true)}
              title="Perbesar Kanta Pembesar"
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-yellow-300 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <RustSubmicroCanvas tube={currentTube} timeHours={timeHours} size={174} />

          <p className="text-[10px] text-slate-300 leading-snug bg-[#090d16] border border-slate-800 rounded-lg px-2 py-1">
            {currentTube.submicroNote}
          </p>
        </div>
      </div>

      {/* BAHAGIAN BAWAH: PANEL PERSAMAAN & APLIKASI INDUSTRI (KBAT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
        {/* Jadual Langsung Tabung Uji Dipilih */}
        <div className="lg:col-span-6 bg-[#111827] border border-slate-800 rounded-xl p-2 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-[11.5px] font-extrabold text-white truncate">
              Analisis Redoks: Tabung {currentTube.id} ({currentTube.shortLabel})
            </h4>
            <span
              className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold border whitespace-nowrap ${
                currentTube.rustStatus === 'Dilindungi'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                  : 'bg-blue-950 text-blue-200 border-blue-500/40'
              }`}
            >
              {currentTube.statusNote}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[10.5px]">
            <div className="bg-[#090d16] border border-blue-500/30 rounded-lg px-2.5 py-1.5">
              <div className="text-[9.5px] font-bold uppercase text-blue-300">
                Pengoksidaan (Anod)
              </div>
              <div className="text-white font-semibold mt-0.5">{currentTube.oxidizedSpecies}</div>
              <div className="font-mono text-blue-200 text-[10px] mt-0.5">
                {currentTube.anodeHalfEq}
              </div>
            </div>

            <div className="bg-[#090d16] border border-pink-500/30 rounded-lg px-2.5 py-1.5">
              <div className="text-[9.5px] font-bold uppercase text-pink-300">
                Penurunan (Katod)
              </div>
              <div className="text-white font-semibold mt-0.5">Oksigen & Air (O₂ + H₂O)</div>
              <div className="font-mono text-pink-200 text-[10px] mt-0.5">
                {currentTube.cathodeHalfEq}
              </div>
            </div>
          </div>

          <div className="bg-[#090d16] border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10.5px] text-slate-200">
            <strong className="text-yellow-300">Pemerhatian ({timeHours}j): </strong>
            {timeHours === 0
              ? 'Gerakkan peluncur masa ke 24–48 jam untuk melihat pembentukan tompok warna.'
              : currentTube.spotDescription}
          </div>
        </div>

        {/* Uji Kefahaman Aplikasi KBAT */}
        <div className="lg:col-span-6 bg-[#111827] border border-slate-800 rounded-xl p-2 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="text-[11.5px] font-extrabold text-yellow-300 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Uji Kefahaman Aplikasi KBAT (Industri)
            </h4>
            <span className="text-[9.5px] text-slate-400">Klik jawapan yang tepat</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {KBAT_QUESTIONS.map((q) => {
              const chosen = kbatAnswers[q.id];
              const chosenOpt = q.options.find((o) => o.key === chosen);
              return (
                <div
                  key={q.id}
                  className="bg-[#090d16] border border-slate-800 rounded-lg p-1.5 space-y-1"
                >
                  <div className="text-[9.5px] font-bold text-sky-300">{q.title}</div>
                  <p className="text-[9.5px] text-slate-200 leading-tight">{q.question}</p>
                  <div className="space-y-1">
                    {q.options.map((opt) => {
                      const picked = chosen === opt.key;
                      return (
                        <button
                          key={opt.key}
                          onClick={() => setKbatAnswers((p) => ({ ...p, [q.id]: opt.key }))}
                          className={`w-full text-left px-1.5 py-1 rounded border text-[9px] leading-tight transition cursor-pointer ${
                            picked
                              ? opt.isCorrect
                                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 font-semibold'
                                : 'bg-red-950/80 border-red-400 text-red-200 font-semibold'
                              : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                          }`}
                        >
                          <strong>{opt.key}.</strong> {opt.text}
                        </button>
                      );
                    })}
                  </div>
                  {chosenOpt && (
                    <p
                      className={`text-[9px] leading-tight ${
                        chosenOpt.isCorrect ? 'text-emerald-300' : 'text-amber-300'
                      }`}
                    >
                      {chosenOpt.isCorrect ? q.explanation : 'Cuba lagi! Bandingkan nilai E° besi dan logam saduran.'}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* POPUP INFO FUNGSI REAGEN */}
      {showReagentInfo && (
        <div className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b0f19] border border-sky-400/50 rounded-2xl p-5 max-w-lg w-full space-y-3 shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-extrabold text-sky-300">
                Fungsi Reagen Eksperimen Pengaratan Besi
              </h4>
              <button
                onClick={() => setShowReagentInfo(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs text-slate-200">
              <div className="bg-[#111827] border border-slate-800 rounded-xl p-3">
                <strong className="text-yellow-300">1. Agar-agar Panas (Medium Pepejal Separa):</strong>
                <p className="mt-0.5 text-slate-300">
                  Memerangkap warna tompok supaya tidak bercampur dan mudah dilihat dengan jelas di sekeliling paku besi (menghalang perolakan larutan).
                </p>
              </div>
              <div className="bg-[#111827] border border-blue-500/30 rounded-xl p-3">
                <strong className="text-blue-300">2. Larutan Kalium Heksasianoferat(III), K₃[Fe(CN)₆]:</strong>
                <p className="mt-0.5 text-slate-300">
                  Mengesan kehadiran <strong>ion ferum(II), Fe²⁺</strong>. Jika pengaratan besi berlaku, tompok <strong>biru tua</strong> terbentuk.
                </p>
              </div>
              <div className="bg-[#111827] border border-pink-500/30 rounded-xl p-3">
                <strong className="text-pink-300">3. Penunjuk Fenolftalein:</strong>
                <p className="mt-0.5 text-slate-300">
                  Mengesan kehadiran <strong>ion hidroksida, OH⁻</strong> di kawasan katod. Jika beralkali tanpa ion Fe²⁺, agar-agar bertukar menjadi <strong>merah jambu terang</strong> (menunjukkan besi dilindungi).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PEMBESAR KANTA SUBMIKROSKOPIK */}
      {isMagnifierExpanded && (
        <div className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b0f19] border border-yellow-400/50 rounded-2xl p-5 max-w-md w-full space-y-3 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-yellow-300">
                  Kanta Pembesar Tabung Uji {currentTube.id}
                </h4>
                <p className="text-xs text-slate-400">{currentTube.shortLabel}</p>
              </div>
              <button
                onClick={() => setIsMagnifierExpanded(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <RustSubmicroCanvas tube={currentTube} timeHours={timeHours} size={300} />
            <p className="text-xs text-slate-200 bg-slate-900 border border-slate-800 rounded-xl p-3">
              {currentTube.submicroNote}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IronRustingLab;
