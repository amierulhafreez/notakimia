import React, { useEffect, useRef, useState } from 'react';
import {
  Calculator,
  Droplets,
  Flame,
  RotateCcw,
  Sparkles,
  Thermometer,
} from 'lucide-react';
import { analytics } from '../services/analytics';
import { TextbookEnergyLevelSVG } from '../components/TextbookEnergyLevelSVG';

type SaltSetId = 'agcl' | 'pbso4' | 'baso4' | 'cuco3';
type ConcValue = 0.5 | 1.0;

interface SaltSetSpec {
  id: SaltSetId;
  saltAFormula: string;
  saltAName: string;
  saltBFormula: string;
  saltBName: string;
  precipitateFormula: string;
  precipitateName: string;
  precipitateColor: 'white' | 'green';
  cationLabel: string;
  anionLabel: string;
  spectatorA: string;
  spectatorB: string;
  deltaH: number;
  ionicEquation: string;
  thermochemicalEquation: string;
  reactantsFormula: string;
  productsFormula: string;
  solAColor: string;
  solBColor: string;
}

const SALT_SETS: SaltSetSpec[] = [
  {
    id: 'agcl',
    saltAFormula: 'AgNO₃',
    saltAName: 'Argentum nitrat',
    saltBFormula: 'NaCl',
    saltBName: 'Natrium klorida',
    precipitateFormula: 'AgCl',
    precipitateName: 'Argentum klorida (Mendakan putih)',
    precipitateColor: 'white',
    cationLabel: 'Ag⁺',
    anionLabel: 'Cl⁻',
    spectatorA: 'Na⁺',
    spectatorB: 'NO₃⁻',
    deltaH: -65.5,
    ionicEquation: 'Ag⁺(ak) + Cl⁻(ak) → AgCl(p)',
    thermochemicalEquation: 'AgNO₃(ak) + NaCl(ak) → AgCl(p) + NaNO₃(ak)   ΔH = -65.5 kJ mol⁻¹',
    reactantsFormula: 'AgNO₃(ak) + NaCl(ak)',
    productsFormula: 'AgCl(p) + NaNO₃(ak)',
    solAColor: 'rgba(224, 242, 254, 0.45)',
    solBColor: 'rgba(224, 242, 254, 0.45)',
  },
  {
    id: 'pbso4',
    saltAFormula: 'Pb(NO₃)₂',
    saltAName: 'Plumbum(II) nitrat',
    saltBFormula: 'Na₂SO₄',
    saltBName: 'Natrium sulfat',
    precipitateFormula: 'PbSO₄',
    precipitateName: 'Plumbum(II) sulfat (Mendakan putih)',
    precipitateColor: 'white',
    cationLabel: 'Pb²⁺',
    anionLabel: 'SO₄²⁻',
    spectatorA: 'Na⁺',
    spectatorB: 'NO₃⁻',
    deltaH: -50.4,
    ionicEquation: 'Pb²⁺(ak) + SO₄²⁻(ak) → PbSO₄(p)',
    thermochemicalEquation: 'Pb(NO₃)₂(ak) + Na₂SO₄(ak) → PbSO₄(p) + 2NaNO₃(ak)   ΔH = -50.4 kJ mol⁻¹',
    reactantsFormula: 'Pb(NO₃)₂(ak) + Na₂SO₄(ak)',
    productsFormula: 'PbSO₄(p) + 2NaNO₃(ak)',
    solAColor: 'rgba(224, 242, 254, 0.45)',
    solBColor: 'rgba(224, 242, 254, 0.45)',
  },
  {
    id: 'baso4',
    saltAFormula: 'BaCl₂',
    saltAName: 'Barium klorida',
    saltBFormula: 'Na₂SO₄',
    saltBName: 'Natrium sulfat',
    precipitateFormula: 'BaSO₄',
    precipitateName: 'Barium sulfat (Mendakan putih)',
    precipitateColor: 'white',
    cationLabel: 'Ba²⁺',
    anionLabel: 'SO₄²⁻',
    spectatorA: 'Na⁺',
    spectatorB: 'Cl⁻',
    deltaH: -26.0,
    ionicEquation: 'Ba²⁺(ak) + SO₄²⁻(ak) → BaSO₄(p)',
    thermochemicalEquation: 'BaCl₂(ak) + Na₂SO₄(ak) → BaSO₄(p) + 2NaCl(ak)   ΔH = -26.0 kJ mol⁻¹',
    reactantsFormula: 'BaCl₂(ak) + Na₂SO₄(ak)',
    productsFormula: 'BaSO₄(p) + 2NaCl(ak)',
    solAColor: 'rgba(224, 242, 254, 0.45)',
    solBColor: 'rgba(224, 242, 254, 0.45)',
  },
  {
    id: 'cuco3',
    saltAFormula: 'CuSO₄',
    saltAName: 'Kuprum(II) sulfat',
    saltBFormula: 'Na₂CO₃',
    saltBName: 'Natrium karbonat',
    precipitateFormula: 'CuCO₃',
    precipitateName: 'Kuprum(II) karbonat (Mendakan hijau)',
    precipitateColor: 'green',
    cationLabel: 'Cu²⁺',
    anionLabel: 'CO₃²⁻',
    spectatorA: 'Na⁺',
    spectatorB: 'SO₄²⁻',
    deltaH: -42.0,
    ionicEquation: 'Cu²⁺(ak) + CO₃²⁻(ak) → CuCO₃(p)',
    thermochemicalEquation: 'CuSO₄(ak) + Na₂CO₃(ak) → CuCO₃(p) + Na₂SO₄(ak)   ΔH = -42.0 kJ mol⁻¹',
    reactantsFormula: 'CuSO₄(ak) + Na₂CO₃(ak)',
    productsFormula: 'CuCO₃(p) + Na₂SO₄(ak)',
    solAColor: 'rgba(56, 189, 248, 0.35)',
    solBColor: 'rgba(224, 242, 254, 0.45)',
  },
];

interface RecordRow {
  pair: string;
  concLabel: string;
  deltaTheta: string;
  deltaH: string;
}

const PrecipitationCalorimeterCanvas: React.FC<{
  isRunning: boolean;
  progress: number;
  currentTemp: number;
  maxTemp: number;
  saltSet: SaltSetSpec;
}> = ({ isRunning, progress, currentTemp, maxTemp, saltSet }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ isRunning, progress, currentTemp, maxTemp, saltSet });
  stateRef.current = { isRunning, progress, currentTemp, maxTemp, saltSet };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const startMs = performance.now();

    // Pre-generate deterministic precipitate particles
    const particles = Array.from({ length: 42 }, (_, idx) => ({
      rx: ((idx * 37) % 100) / 100 - 0.5,
      ryStart: ((idx * 53) % 100) / 100,
      speed: 0.5 + ((idx * 19) % 50) / 100,
      size: 1.8 + ((idx * 13) % 14) / 10,
    }));

    const drawLeader = (
      targetX: number,
      targetY: number,
      side: 'left' | 'right',
      textX: number,
      textY: number,
      label: string
    ) => {
      ctx.save();
      ctx.font = '700 9px ui-sans-serif, system-ui, sans-serif';
      ctx.textBaseline = 'middle';
      const tw = ctx.measureText(label).width;
      ctx.textAlign = side === 'left' ? 'left' : 'right';
      ctx.fillStyle = '#0f172a';
      ctx.fillText(label, textX, textY);

      const lineStartX = side === 'left' ? textX + tw + 4 : textX - tw - 4;
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(lineStartX, textY);
      ctx.lineTo(targetX, targetY);
      ctx.stroke();

      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(targetX, targetY, 2.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = (now: number) => {
      const t = (now - startMs) / 1000;
      const dpr = window.devicePixelRatio || 1;
      const cssW = 460;
      const cssH = 282;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      const {
        isRunning: running,
        progress: prog,
        currentTemp: curT,
        maxTemp: maxT,
        saltSet: set,
      } = stateRef.current;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, cssW, cssH);

      // Lab bench
      const benchY = 252;
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(14, benchY, 432, 6);

      if (prog === 0 && !running) {
        // ============================================================
        // INITIAL STATE: TWO SEPARATE POLYSTYRENE CUPS (TEXTBOOK VIEW)
        // ============================================================
        const drawInitialCup = (
          cx: number,
          solColor: string,
          label: string,
          tempLabel: string
        ) => {
          const cupTop = 128;
          const cupBottom = benchY - 2;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(cx - 38, cupTop);
          ctx.lineTo(cx - 29, cupBottom);
          ctx.lineTo(cx + 29, cupBottom);
          ctx.lineTo(cx + 38, cupTop);
          ctx.closePath();

          ctx.save();
          ctx.clip();
          const liqTop = cupBottom - (cupBottom - cupTop) * 0.45;
          ctx.fillStyle = solColor;
          ctx.fillRect(cx - 40, liqTop, 80, cupBottom - liqTop);
          ctx.strokeStyle = '#0284c7';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(cx - 40, liqTop);
          ctx.lineTo(cx + 40, liqTop);
          ctx.stroke();
          ctx.restore();

          ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
          ctx.fill();
          ctx.strokeStyle = '#0f172a';
          ctx.lineWidth = 2.4;
          ctx.stroke();

          // Rim
          ctx.fillStyle = '#ffffff';
          ctx.strokeStyle = '#0f172a';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(cx - 41, cupTop - 3, 82, 5.5, 2);
          ctx.fill();
          ctx.stroke();
          ctx.restore();

          // Thermometer inside each cup
          const tx = cx + 4;
          ctx.fillStyle = '#f8fafc';
          ctx.fillRect(tx - 3, 48, 6, 172);
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 1.1;
          ctx.strokeRect(tx - 3, 48, 6, 172);
          ctx.fillStyle = '#dc2626';
          ctx.beginPath();
          ctx.arc(tx, 223, 4.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillRect(tx - 1.3, 146, 2.6, 75);

          // Temperature pill
          ctx.fillStyle = '#f8fafc';
          ctx.strokeStyle = '#cbd5e1';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(cx - 26, 20, 52, 19, 5);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#0f172a';
          ctx.font = '800 9.5px ui-monospace, monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(tempLabel, cx, 29.5);

          // Label below bench
          ctx.fillStyle = '#0369a1';
          ctx.font = '700 9px ui-sans-serif, system-ui, sans-serif';
          ctx.fillText(label, cx, 268);
        };

        drawInitialCup(110, set.solAColor, `25.0 cm³ ${set.saltAFormula}`, 'T₁ = 28.0°C');
        drawInitialCup(230, set.solBColor, `25.0 cm³ ${set.saltBFormula}`, 'T₂ = 28.0°C');

        // Clean labels
        drawLeader(111, 78, 'left', 12, 78, 'Termometer');
        drawLeader(76, 165, 'left', 12, 165, 'Cawan polistirena');

        // Plus sign between cups
        ctx.fillStyle = '#64748b';
        ctx.font = '800 15px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('+', 170, 192);
      } else {
        // ============================================================
        // MIXED & PRECIPITATION STATE (TEXTBOOK CALORIMETER + BEAKER)
        // ============================================================
        const cupCx = 186;
        const beakerTop = 132;
        const beakerBottom = benchY;
        const cupTop = 110;
        const cupBottom = benchY - 6;

        // Outer 250 cm³ Glass Beaker (wider so gap around polystyrene cup is clearly visible)
        ctx.save();
        ctx.fillStyle = 'rgba(226, 232, 240, 0.18)';
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(cupCx - 68, beakerTop - 4);
        ctx.lineTo(cupCx - 60, beakerTop + 4);
        ctx.lineTo(cupCx - 60, beakerBottom - 6);
        ctx.quadraticCurveTo(cupCx - 60, beakerBottom, cupCx - 52, beakerBottom);
        ctx.lineTo(cupCx + 52, beakerBottom);
        ctx.quadraticCurveTo(cupCx + 60, beakerBottom, cupCx + 60, beakerBottom - 6);
        ctx.lineTo(cupCx + 60, beakerTop);
        ctx.stroke();
        ctx.fill();
        ctx.restore();

        // Polystyrene Cup inside beaker (bold dark outline + opaque white wall)
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cupCx - 44, cupTop);
        ctx.lineTo(cupCx - 35, cupBottom);
        ctx.lineTo(cupCx + 35, cupBottom);
        ctx.lineTo(cupCx + 44, cupTop);
        ctx.closePath();

        // Fill cup body white first so it stands out clearly inside glass beaker
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Liquid & Precipitate inside cup
        ctx.save();
        ctx.clip();
        const fillFrac = 0.38 + Math.min(1, prog / 0.25) * 0.34;
        const liqTop = cupBottom - (cupBottom - cupTop) * fillFrac;
        const cloudiness = Math.min(1, Math.max(0, (prog - 0.15) / 0.4));

        // Base solution color turns cloudy or greenish for CuCO₃
        if (set.precipitateColor === 'green') {
          ctx.fillStyle = `rgba(16, 185, 129, ${0.18 + cloudiness * 0.28})`;
        } else {
          ctx.fillStyle = `rgba(226, 232, 240, ${0.35 + cloudiness * 0.45})`;
        }
        ctx.fillRect(cupCx - 48, liqTop, 96, cupBottom - liqTop);

        // Precipitate granules settling down
        const settleProg = Math.min(1, Math.max(0, (prog - 0.18) / 0.72));
        if (settleProg > 0) {
          const pColor = set.precipitateColor === 'green' ? '#059669' : '#ffffff';
          const pStroke = set.precipitateColor === 'green' ? '#047857' : '#94a3b8';

          // Settled precipitate layer at bottom
          const layerH = settleProg * 14;
          ctx.fillStyle = set.precipitateColor === 'green' ? 'rgba(5, 150, 105, 0.78)' : 'rgba(255, 255, 255, 0.94)';
          ctx.fillRect(cupCx - 44, cupBottom - layerH, 88, layerH);
          ctx.strokeStyle = pStroke;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(cupCx - 44, cupBottom - layerH);
          ctx.lineTo(cupCx + 44, cupBottom - layerH);
          ctx.stroke();

          // Suspended particles drifting down
          particles.forEach((p) => {
            const py =
              liqTop +
              8 +
              ((p.ryStart + settleProg * p.speed) % 1) * (cupBottom - liqTop - 12);
            const px = cupCx + p.rx * 64;
            ctx.fillStyle = pColor;
            ctx.strokeStyle = pStroke;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.arc(px, py, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          });
        }

        // Meniscus
        ctx.strokeStyle = set.precipitateColor === 'green' ? '#059669' : '#0284c7';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(cupCx - 48, liqTop);
        ctx.lineTo(cupCx + 48, liqTop);
        ctx.stroke();
        ctx.restore();

        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2.6;
        ctx.stroke();

        // Rim
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(cupCx - 47, cupTop - 3, 94, 5.5, 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Perforated Lid
        ctx.fillStyle = '#94a3b8';
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(cupCx - 49, cupTop - 9, 98, 6, 1.5);
        ctx.fill();
        ctx.stroke();

        // Thermometer (0 - 110 °C, 0.1 °C precision)
        const thermX = cupCx - 11;
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(thermX - 3.5, 24, 7, 180);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(thermX - 3.5, 24, 7, 180);
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 0.8;
        for (let ty = 34; ty <= 158; ty += 8) {
          ctx.beginPath();
          ctx.moveTo(thermX - 3.5, ty);
          ctx.lineTo(thermX - 0.5, ty);
          ctx.stroke();
        }
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.arc(thermX, 207, 5, 0, Math.PI * 2);
        ctx.fill();
        const mercH = 55 + ((curT - 25) / 25) * 95;
        ctx.fillRect(thermX - 1.5, 205 - Math.min(165, mercH), 3, Math.min(165, mercH));

        // Stirring Rod
        const stirOffset = running && prog > 0.22 && prog < 0.95 ? Math.sin(t * 14) * 6 : 0;
        const rodX = cupCx + 16;
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2.6;
        ctx.beginPath();
        ctx.moveTo(rodX, 46 + stirOffset);
        ctx.lineTo(rodX, 224 + stirOffset);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(rodX, 224 + stirOffset, 7, 2.2, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Pouring Cup B at start (0 < prog < 0.28)
        if (running && prog > 0 && prog < 0.28) {
          ctx.save();
          ctx.translate(cupCx - 76, 48);
          ctx.rotate(0.55);
          ctx.fillStyle = '#f1f5f9';
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(-14, -18);
          ctx.lineTo(-10, 14);
          ctx.lineTo(10, 14);
          ctx.lineTo(14, -18);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.restore();

          ctx.save();
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.8)';
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.moveTo(cupCx - 58, 56);
          ctx.quadraticCurveTo(cupCx - 24, 72, cupCx - 4, 99);
          ctx.stroke();
          ctx.restore();
        }

        // Digital Temperature Readout
        ctx.save();
        ctx.fillStyle = '#f8fafc';
        ctx.strokeStyle = prog >= 0.85 ? '#dc2626' : '#cbd5e1';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(thermX + 12, 20, 62, 22, 6);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = prog >= 0.85 ? '#dc2626' : '#0f172a';
        ctx.font = '800 11px ui-monospace, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${curT.toFixed(1)} °C`, thermX + 43, 31);
        ctx.restore();

        // Non-crossing Textbook Leader Labels
        drawLeader(thermX - 3.5, 56, 'left', 12, 56, 'Termometer (0–110 °C)');
        drawLeader(cupCx - 49, cupTop - 6, 'left', 12, 102, 'Penutup berlubang');
        drawLeader(cupCx - 41, 144, 'left', 12, 144, 'Cawan polistirena');
        drawLeader(cupCx - 60, 194, 'left', 12, 194, 'Bikar 250 cm³');
        drawLeader(rodX + 2, 74, 'right', 284, 74, 'Rod pengacau');
        if (prog >= 0.5) {
          drawLeader(
            cupCx + 24,
            cupBottom - 5,
            'right',
            286,
            238,
            `Mendakan ${set.precipitateFormula}`
          );
        }

        // Bottom caption
        ctx.fillStyle = set.precipitateColor === 'green' ? '#047857' : '#0369a1';
        ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(
          `Campuran: ${set.saltAFormula} + ${set.saltBFormula} (50.0 cm³)`,
          cupCx,
          269
        );
      }

      // ============================================================
      // REAL-TIME GRAPH: SUHU (°C) MELAWAN MASA (s)
      // ============================================================
      const gx = 294;
      const gy = 98;
      const gw = 154;
      const gh = 128;

      ctx.save();
      ctx.fillStyle = '#f8fafc';
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(gx, gy, gw, gh, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#0f172a';
      ctx.font = '800 9px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Graf Suhu (°C) vs Masa (s)', gx + gw / 2, gy + 13);

      const ox = gx + 28;
      const oy = gy + gh - 20;
      const axW = gw - 40;
      const axH = gh - 46;
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(ox, gy + 24);
      ctx.lineTo(ox, oy);
      ctx.lineTo(ox + axW, oy);
      ctx.stroke();

      // Plot curve
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const steps = Math.max(1, Math.floor(prog * 30));
      for (let i = 0; i <= steps; i++) {
        const u = i / 30;
        const px = ox + u * axW;
        const rise = u < 0.8 ? Math.sin((u / 0.8) * (Math.PI / 2)) : 1 - (u - 0.8) * 0.08;
        const tempAtU = 28.0 + (maxT - 28.0) * rise;
        const py = oy - Math.min(1, (tempAtU - 26) / 14) * axH;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      if (prog >= 0.85) {
        const peakY = oy - Math.min(1, (maxT - 26) / 14) * axH;
        ctx.save();
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(ox, peakY);
        ctx.lineTo(ox + axW * 0.8, peakY);
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = '#dc2626';
        ctx.font = '700 8px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`${maxT.toFixed(1)}°`, ox - 3, peakY + 2);
      }

      ctx.fillStyle = '#64748b';
      ctx.font = '600 8px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('28°', ox - 3, oy - 2);
      ctx.textAlign = 'center';
      ctx.fillText('Masa (s)', ox + axW / 2, oy + 12);
      ctx.restore();

      ctx.restore();
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full max-w-[460px] aspect-[460/282] mx-auto block rounded-xl border border-slate-200 bg-white"
    />
  );
};

const PrecipitationSubmicroCanvas: React.FC<{
  saltSet: SaltSetSpec;
  progress: number;
}> = ({ saltSet, progress }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ saltSet, progress });
  stateRef.current = { saltSet, progress };

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
      const cssW = 250;
      const cssH = 192;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      const { saltSet: set, progress: prog } = stateRef.current;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, cssW, cssH);

      const cx = 125;
      const cy = 96;
      const r = 82;

      // Magnifier Circle
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.clip();

      // Spectator ions swimming freely in upper solution (well above heat label)
      const spectators = [
        { label: set.spectatorA, x0: cx - 44, y0: cy - 36, color: '#64748b', dx: 6, dy: 4 },
        { label: set.spectatorB, x0: cx + 44, y0: cy - 34, color: '#475569', dx: -6, dy: 4 },
        { label: set.spectatorA, x0: cx - 16, y0: cy - 28, color: '#64748b', dx: 4, dy: 3 },
      ];
      spectators.forEach((sp, idx) => {
        const sx = sp.x0 + Math.sin(t * 1.4 + idx) * sp.dx;
        const sy = sp.y0 + Math.cos(t * 1.2 + idx) * sp.dy;
        ctx.fillStyle = sp.color;
        ctx.beginPath();
        ctx.arc(sx, sy, 10.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '800 7px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(sp.label, sx, sy);
      });

      // Spectator tag pill at top
      ctx.fillStyle = '#f1f5f9';
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(cx - 64, cy - 66, 128, 16, 8);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#475569';
      ctx.font = '800 7.5px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Ion Pemerhati (Bebas)', cx, cy - 58);

      // Lattice formation at bottom of magnifier
      const latticeY = cy + 42;
      const cationColor = set.precipitateColor === 'green' ? '#059669' : '#dc2626';
      const anionColor = set.precipitateColor === 'green' ? '#0d9488' : '#2563eb';
      const bob = prog === 0 ? Math.sin(t * 2) * 3 : 0;

      // Draw 4x2 ionic crystal lattice of precipitate
      const cols = [-30, -10, 10, 30];
      const rows = [latticeY - 10, latticeY + 11];
      rows.forEach((ry, rIdx) => {
        cols.forEach((dx, cIdx) => {
          const isCation = (rIdx + cIdx) % 2 === 0;
          const ix = cx + dx;
          const iy = ry + bob * (rIdx === 0 ? 1 : 0.4);
          ctx.fillStyle = isCation ? cationColor : anionColor;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(ix, iy, 10.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#ffffff';
          ctx.font = '800 6.5px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(isCation ? set.cationLabel : set.anionLabel, ix, iy);
        });
      });

      // Heat arrows radiating upward from lattice
      const pulse = 0.55 + 0.45 * Math.sin(t * 3.5);
      ctx.strokeStyle = `rgba(220, 38, 38, ${pulse})`;
      ctx.lineWidth = 1.6;
      [-22, 0, 22].forEach((ax) => {
        ctx.beginPath();
        ctx.moveTo(cx + ax, latticeY - 24);
        ctx.lineTo(cx + ax, latticeY - 38);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx + ax - 3, latticeY - 34);
        ctx.lineTo(cx + ax, latticeY - 39);
        ctx.lineTo(cx + ax + 3, latticeY - 34);
        ctx.stroke();
      });

      ctx.fillStyle = '#dc2626';
      ctx.font = '800 8px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Haba Dibebaskan (Kekisi ${set.precipitateFormula})`, cx, cy - 3);

      ctx.restore();

      // Outer ring
      ctx.strokeStyle = set.precipitateColor === 'green' ? '#059669' : '#0284c7';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
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
      className="w-full max-w-[250px] aspect-[250/192] mx-auto block rounded-xl border border-slate-200 bg-slate-50"
    />
  );
};

export const HeatOfPrecipitationLab: React.FC = () => {
  const [setId, setSetId] = useState<SaltSetId>('agcl');
  const [concA, setConcA] = useState<ConcValue>(1.0);
  const [concB, setConcB] = useState<ConcValue>(1.0);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [records, setRecords] = useState<RecordRow[]>([]);

  const saltSet = SALT_SETS.find((s) => s.id === setId)!;

  // Stoichiometry & Limiting Reactant (25.0 cm³ each, 1:1 ion ratio)
  const molA = (concA * 25.0) / 1000;
  const molB = (concB * 25.0) / 1000;
  const molPrecipitate = Math.min(molA, molB);
  const limitingReactant =
    molA < molB
      ? `${saltSet.saltAFormula} (habis dahulu)`
      : molB < molA
      ? `${saltSet.saltBFormula} (habis dahulu)`
      : 'Tiada (nisbah stoikiometri tepat 1:1)';

  // Thermochemical calculation: m = 50.0 g, c = 4.2 J g⁻¹ °C⁻¹
  const heatQ = Math.abs(saltSet.deltaH) * 1000 * molPrecipitate;
  const deltaTheta = heatQ / (50.0 * 4.2);
  const maxTemp = 28.0 + deltaTheta;
  const currentTemp =
    progress === 0
      ? 28.0
      : 28.0 + deltaTheta * Math.min(1, progress < 0.8 ? Math.sin((progress / 0.8) * (Math.PI / 2)) : 1);

  useEffect(() => {
    if (!isRunning) return;
    let rafId = 0;
    const start = performance.now();
    const duration = 2600;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setProgress(p);
      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setIsRunning(false);
        analytics.recordSimulationCompleted('haba-pemendakan');
        setRecords((prev) => {
          const entry: RecordRow = {
            pair: `${saltSet.saltAFormula} + ${saltSet.saltBFormula}`,
            concLabel: `${concA.toFixed(1)}M/${concB.toFixed(1)}M`,
            deltaTheta: `+${deltaTheta.toFixed(1)} °C`,
            deltaH: `${saltSet.deltaH.toFixed(1)} kJ mol⁻¹`,
          };
          const filtered = prev.filter(
            (r) => !(r.pair === entry.pair && r.concLabel === entry.concLabel)
          );
          return [entry, ...filtered].slice(0, 6);
        });
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isRunning, saltSet, concA, concB, deltaTheta]);

  const handleReset = () => {
    setIsRunning(false);
    setProgress(0);
  };

  const energyGapPx = Math.round((Math.abs(saltSet.deltaH) / 66) * 58);

  return (
    <div className="space-y-3 font-sans text-slate-900">
      {/* GRID UTAMA 3 LAJUR */}
      <div className="grid grid-cols-1 lg:grid-cols-[278px_1fr_272px] gap-2.5">
        {/* 1. PANEL KAWALAN PEMBOLEH UBAH (KIRI) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between space-y-2.5">
          <div className="space-y-2">
            <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-sky-600" />
              <span>Pemboleh Ubah (25.0 cm³ Setiap Satu)</span>
            </div>

            {/* Pilihan Pasangan Larutan Garam */}
            <div>
              <div className="text-[10.5px] font-bold text-slate-700 mb-1">
                Pasangan Larutan Garam:
              </div>
              <div className="space-y-1">
                {SALT_SETS.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSetId(s.id);
                      handleReset();
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl border text-[10.5px] transition cursor-pointer ${
                      setId === s.id
                        ? 'bg-sky-50 border-sky-500 text-sky-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between font-extrabold">
                      <span>
                        Set {idx + 1}: {s.saltAFormula} + {s.saltBFormula}
                      </span>
                      <span
                        className={`text-[9.5px] px-1.5 py-0.5 rounded-full ${
                          s.precipitateColor === 'green'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-800'
                        }`}
                      >
                        {s.precipitateFormula}(p)
                      </span>
                    </div>
                    <div className="text-[9px] text-slate-500">{s.precipitateName}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pilihan Kepekatan Larutan Garam A & B */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-[10px] font-bold text-slate-700 mb-1">
                  Kepekatan {saltSet.saltAFormula}:
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {([0.5, 1.0] as ConcValue[]).map((val) => (
                    <button
                      key={val}
                      onClick={() => {
                        setConcA(val);
                        handleReset();
                      }}
                      className={`py-1 rounded-lg border text-[10.5px] font-extrabold transition cursor-pointer ${
                        concA === val
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {val.toFixed(1)} M
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-700 mb-1">
                  Kepekatan {saltSet.saltBFormula}:
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {([0.5, 1.0] as ConcValue[]).map((val) => (
                    <button
                      key={val}
                      onClick={() => {
                        setConcB(val);
                        handleReset();
                      }}
                      className={`py-1 rounded-lg border text-[10.5px] font-extrabold transition cursor-pointer ${
                        concB === val
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {val.toFixed(1)} M
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Butang Aksi */}
            <div className="space-y-1.5 pt-1">
              <button
                onClick={() => {
                  setProgress(0);
                  setIsRunning(true);
                }}
                className="w-full py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-extrabold shadow-sm cursor-pointer transition flex items-center justify-center gap-1.5"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Campurkan Larutan & Kacau</span>
              </button>
              <button
                onClick={handleReset}
                className="w-full py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold cursor-pointer transition flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Set Semula Eksperimen</span>
              </button>
            </div>
          </div>

          {/* Jadual Rekod Perbandingan */}
          <div className="border-t border-slate-200 pt-2">
            <div className="text-[10px] font-extrabold uppercase text-slate-500 mb-1">
              Rekod Perbandingan Percubaan
            </div>
            {records.length === 0 ? (
              <div className="text-[10px] text-slate-400 italic">
                Jalankan eksperimen untuk merekod Δθ dan ΔH.
              </div>
            ) : (
              <div className="space-y-1 max-h-24 overflow-y-auto">
                {records.map((r, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-[1fr_auto_auto] gap-1.5 items-center text-[9.5px] bg-slate-50 px-2 py-1 rounded border border-slate-200 font-bold"
                  >
                    <span className="truncate">
                      {r.pair} ({r.concLabel})
                    </span>
                    <span className="text-rose-700 whitespace-nowrap">{r.deltaTheta}</span>
                    <span className="text-sky-700 whitespace-nowrap">{r.deltaH}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 2. KANVAS KALORIMETER & VISUALISASI MENDAKAN (TENGAH) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-rose-600" />
              <span>Kalorimeter Pemendakan Dwi-Larutan</span>
            </span>
            <div className="text-[11px] font-bold text-slate-600 whitespace-nowrap">
              T_awal = 28.0 °C →{' '}
              <span className="text-rose-600 font-extrabold">
                T_maks = {progress >= 0.85 ? `${maxTemp.toFixed(1)} °C` : `${currentTemp.toFixed(1)} °C`}
              </span>
            </div>
          </div>

          <PrecipitationCalorimeterCanvas
            isRunning={isRunning}
            progress={progress}
            currentTemp={currentTemp}
            maxTemp={maxTemp}
            saltSet={saltSet}
          />

          <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-200">
            <strong>Pemerhatian & Kenaikan Suhu (Δθ):</strong>{' '}
            {progress >= 0.85
              ? `${saltSet.precipitateName} terbentuk dan mendap di dasar cawan. Suhu meningkat daripada 28.0 °C ke ${maxTemp.toFixed(1)} °C (Δθ = +${deltaTheta.toFixed(1)} °C).`
              : 'Klik "Campurkan Larutan & Kacau" untuk mencampurkan kedua-dua larutan garam dan memerhati pemendakan.'}
          </div>
        </div>

        {/* 3. KANTA PEMBESAR SUBMIKROSKOPIK (KANAN ATAS) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between space-y-2">
          <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>Kanta Kekisi Mendakan & Ion</span>
          </div>

          <PrecipitationSubmicroCanvas saltSet={saltSet} progress={progress} />

          <div className="space-y-1.5">
            <div className="text-[10px] font-mono font-bold text-center bg-slate-900 text-white py-1.5 px-2 rounded-lg">
              {saltSet.ionicEquation}
            </div>
            <div className="text-[10.5px] text-slate-700 bg-sky-50 p-2 rounded-xl border border-sky-200 leading-relaxed">
              Ion <strong>{saltSet.cationLabel}</strong> & <strong>{saltSet.anionLabel}</strong>{' '}
              membentuk kekisi pepejal <strong>{saltSet.precipitateFormula}</strong> dan membebaskan haba.{' '}
              <strong>{saltSet.spectatorA}</strong> & <strong>{saltSet.spectatorB}</strong> kekal sebagai{' '}
              <em>Ion Pemerhati</em>.
            </div>
          </div>
        </div>
      </div>

      {/* BARIS BAWAH: KALKULATOR 4 LANGKAH & GAMBAR RAJAH ARAS TENAGA */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-2.5">
        {/* Kalkulator 4 Langkah */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm space-y-2">
          <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5 text-indigo-600" />
            <span>Kalkulator 4 Langkah Termokimia (m = 50.0 g, c = 4.2 J g⁻¹ °C⁻¹)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-extrabold text-slate-700">Langkah 1: Perubahan Haba (Q = mcθ)</div>
              <div className="font-mono text-[11px] text-slate-900 mt-0.5">
                Q = 50.0 × 4.2 × {deltaTheta.toFixed(1)} = <strong>{heatQ.toFixed(1)} J</strong>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-extrabold text-slate-700">
                Langkah 2: Bilangan Mol Mendakan (n = MV/1000)
              </div>
              <div className="font-mono text-[10.5px] text-slate-900 mt-0.5 leading-snug">
                n({saltSet.saltAFormula}) = {molA.toFixed(4)} | n({saltSet.saltBFormula}) = {molB.toFixed(4)}
                <span className="block font-sans text-[10px] font-bold text-amber-700 mt-0.5">
                  n({saltSet.precipitateFormula}) = {molPrecipitate.toFixed(4)} mol • Reaktan Pengehad: {limitingReactant}
                </span>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-extrabold text-slate-700">Langkah 3: Haba Pemendakan (ΔH = -Q / n)</div>
              <div className="font-mono text-[11px] text-rose-700 mt-0.5">
                ΔH = -{(heatQ / 1000).toFixed(3)} kJ / {molPrecipitate.toFixed(4)} ={' '}
                <strong>{saltSet.deltaH.toFixed(1)} kJ mol⁻¹</strong>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 text-white">
              <div className="font-extrabold text-slate-300 text-[10px]">
                Langkah 4: Persamaan Termokimia Lengkap
              </div>
              <div className="font-mono text-[10px] mt-0.5 leading-snug">
                {saltSet.thermochemicalEquation}
              </div>
            </div>
          </div>
        </div>

        {/* Gambar Rajah Aras Tenaga (Format Buku Teks Kimia KSSM Rajah 3.1) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between">
          <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500">
            Gambar Rajah Aras Tenaga (Eksotermik · Gaya Buku Teks)
          </div>
          <TextbookEnergyLevelSVG
            columns={1}
            items={[
              {
                title: `Mendakan ${saltSet.precipitateFormula}`,
                subtitle: 'Tindak balas eksotermik (ΔH < 0)',
                reactants: `${saltSet.cationLabel}(ak) + ${saltSet.anionLabel}(ak)`,
                products: `${saltSet.precipitateFormula}(p)`,
                deltaHText: `ΔH = ${saltSet.deltaH.toFixed(1)} kJ mol⁻¹`,
                relativeDrop: Math.max(0.45, Math.min(1, Math.abs(saltSet.deltaH) / 66)),
                accentColor: '#0284c7',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default HeatOfPrecipitationLab;
