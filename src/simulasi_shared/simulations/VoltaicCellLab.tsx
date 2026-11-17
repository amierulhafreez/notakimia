import React, { useEffect, useRef, useState } from 'react';
import {
  Award,
  BatteryCharging,
  CheckCircle2,
  FlaskConical,
  Maximize2,
  RotateCcw,
  Sparkles,
  Trophy,
  X,
} from 'lucide-react';
import { analytics } from '../services/analytics';

type MainTab = 'simple' | 'daniell';
type SimpleElectrolyte = 'h2so4' | 'nacl';
type DaniellBridge = 'salt-bridge' | 'porous-pot';
type MetalId = 'Mg' | 'Al' | 'Zn' | 'Fe' | 'Sn' | 'Pb' | 'Cu' | 'Ag';

interface MetalSpec {
  id: MetalId;
  name: string;
  halfCellIon: string;
  halfCellSalt: string;
  e0: number; // Standard reduction potential (V)
  valency: number;
  stripColor: string;
  solutionRgb: [number, number, number];
  solutionAlpha: number;
  solutionName: string;
}

const METALS: MetalSpec[] = [
  {
    id: 'Mg',
    name: 'Magnesium',
    halfCellIon: 'Mg²⁺',
    halfCellSalt: 'MgSO₄(ak)',
    e0: -2.38,
    valency: 2,
    stripColor: '#cbd5e1',
    solutionRgb: [226, 232, 240],
    solutionAlpha: 0.22,
    solutionName: 'Tidak berwarna',
  },
  {
    id: 'Al',
    name: 'Aluminium',
    halfCellIon: 'Al³⁺',
    halfCellSalt: 'Al(NO₃)₃(ak)',
    e0: -1.66,
    valency: 3,
    stripColor: '#e2e8f0',
    solutionRgb: [226, 232, 240],
    solutionAlpha: 0.22,
    solutionName: 'Tidak berwarna',
  },
  {
    id: 'Zn',
    name: 'Zink',
    halfCellIon: 'Zn²⁺',
    halfCellSalt: 'ZnSO₄(ak)',
    e0: -0.76,
    valency: 2,
    stripColor: '#94a3b8',
    solutionRgb: [226, 232, 240],
    solutionAlpha: 0.22,
    solutionName: 'Tidak berwarna',
  },
  {
    id: 'Fe',
    name: 'Ferum',
    halfCellIon: 'Fe²⁺',
    halfCellSalt: 'FeSO₄(ak)',
    e0: -0.44,
    valency: 2,
    stripColor: '#64748b',
    solutionRgb: [134, 239, 172],
    solutionAlpha: 0.36,
    solutionName: 'Hijau muda',
  },
  {
    id: 'Sn',
    name: 'Stanum',
    halfCellIon: 'Sn²⁺',
    halfCellSalt: 'Sn(NO₃)₂(ak)',
    e0: -0.14,
    valency: 2,
    stripColor: '#cbd5e1',
    solutionRgb: [226, 232, 240],
    solutionAlpha: 0.22,
    solutionName: 'Tidak berwarna',
  },
  {
    id: 'Pb',
    name: 'Plumbum',
    halfCellIon: 'Pb²⁺',
    halfCellSalt: 'Pb(NO₃)₂(ak)',
    e0: -0.13,
    valency: 2,
    stripColor: '#475569',
    solutionRgb: [226, 232, 240],
    solutionAlpha: 0.22,
    solutionName: 'Tidak berwarna',
  },
  {
    id: 'Cu',
    name: 'Kuprum',
    halfCellIon: 'Cu²⁺',
    halfCellSalt: 'CuSO₄(ak)',
    e0: 0.34,
    valency: 2,
    stripColor: '#d97706',
    solutionRgb: [37, 99, 235],
    solutionAlpha: 0.72,
    solutionName: 'Biru',
  },
  {
    id: 'Ag',
    name: 'Argentum',
    halfCellIon: 'Ag⁺',
    halfCellSalt: 'AgNO₃(ak)',
    e0: 0.80,
    valency: 1,
    stripColor: '#f8fafc',
    solutionRgb: [226, 232, 240],
    solutionAlpha: 0.22,
    solutionName: 'Tidak berwarna',
  },
];

interface MissionSpec {
  id: string;
  label: string;
  check: (signedVoltage: number, absVoltage: number, isSameMetal: boolean) => boolean;
}

const MISSIONS: MissionSpec[] = [
  {
    id: 'm-110',
    label: 'Bina sel kimia yang menghasilkan voltan 1.10 V',
    check: (_s, absV) => Math.abs(absV - 1.1) < 0.005,
  },
  {
    id: 'm-gt250',
    label: 'Hasilkan voltan melebihi 2.50 V',
    check: (_s, absV) => absV > 2.5,
  },
  {
    id: 'm-078',
    label: 'Bina sel dengan voltan tepat 0.78 V',
    check: (_s, absV) => Math.abs(absV - 0.78) < 0.005,
  },
  {
    id: 'm-neg',
    label: 'Terbalikkan kutub untuk hasilkan bacaan negatif',
    check: (signedV) => signedV < -0.01,
  },
  {
    id: 'm-zero',
    label: 'Hasilkan bacaan voltan sifar (0.00 V)',
    check: (_s, _a, same) => same,
  },
];

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function getMetal(id: MetalId): MetalSpec {
  return METALS.find((m) => m.id === id)!;
}

function formatCoeff(n: number): string {
  return n === 1 ? '' : String(n);
}

function formatVoltageSigned(v: number): string {
  if (Math.abs(v) < 0.005) return '0.00 V';
  return `${v > 0 ? '+' : ''}${v.toFixed(2)} V`;
}

function formatE0(v: number): string {
  if (Math.abs(v) < 0.005) return '0.00 V';
  return `${v > 0 ? '+' : ''}${v.toFixed(2)} V`;
}

interface CellComputation {
  left: MetalSpec;
  right: MetalSpec;
  isSameMetal: boolean;
  anodeSide: 'left' | 'right' | 'none';
  cathodeSide: 'left' | 'right' | 'none';
  anode: MetalSpec;
  cathode: MetalSpec;
  voltmeterReading: number; // E_right - E_left (negative if reversed!)
  eCellMagnitude: number; // E_cathode - E_anode (>= 0)
  halfEqOxidation: string;
  halfEqReduction: string;
  overallIonicEq: string;
  cellNotation: string;
  anodeObs: string;
  cathodeObs: string;
}

function computeCell(tab: MainTab, leftId: MetalId, rightId: MetalId): CellComputation {
  const left = getMetal(leftId);
  const right = getMetal(rightId);
  const isSameMetal = left.id === right.id;
  const voltmeterReading = Number((right.e0 - left.e0).toFixed(2));
  const eCellMagnitude = Math.abs(voltmeterReading);

  const anodeSide: 'left' | 'right' | 'none' = isSameMetal
    ? 'none'
    : left.e0 < right.e0
    ? 'left'
    : 'right';
  const cathodeSide: 'left' | 'right' | 'none' = isSameMetal
    ? 'none'
    : left.e0 < right.e0
    ? 'right'
    : 'left';

  const anode = anodeSide === 'right' ? right : left;
  const cathode = cathodeSide === 'left' ? left : right;

  if (isSameMetal) {
    return {
      left,
      right,
      isSameMetal: true,
      anodeSide: 'none',
      cathodeSide: 'none',
      anode: left,
      cathode: right,
      voltmeterReading: 0,
      eCellMagnitude: 0,
      halfEqOxidation: 'Tiada perbezaan keupayaan elektrod (0.00 V)',
      halfEqReduction: 'Tiada aliran elektron bersih',
      overallIonicEq: 'Tiada tindak balas redoks berlaku',
      cellNotation: `${left.id}(p) | ${left.halfCellIon}(ak) || ${right.halfCellIon}(ak) | ${right.id}(p) (0.00 V)`,
      anodeObs: 'Elektrod kiri dan kanan adalah logam yang sama; tiada pemindahan elektron.',
      cathodeObs: 'Jarum / paparan voltmeter digital kekal pada 0.00 V.',
    };
  }

  const oxHalf = `${anode.id}(p) → ${anode.halfCellIon}(ak) + ${formatCoeff(anode.valency)}e⁻`;

  if (tab === 'simple') {
    const g = gcd(anode.valency, 2);
    const cM = 2 / g;
    const cH2 = anode.valency / g;
    const cH = cH2 * 2;
    const overall = `${formatCoeff(cM)}${anode.id}(p) + ${formatCoeff(cH)}H⁺(ak) → ${formatCoeff(cM)}${anode.halfCellIon}(ak) + ${formatCoeff(cH2)}H₂(g)`;

    return {
      left,
      right,
      isSameMetal: false,
      anodeSide,
      cathodeSide,
      anode,
      cathode,
      voltmeterReading,
      eCellMagnitude,
      halfEqOxidation: oxHalf,
      halfEqReduction: '2H⁺(ak) + 2e⁻ → H₂(g)',
      overallIonicEq: overall,
      cellNotation: 'Tidak berkenaan (1 elektrolit bersama)',
      anodeObs: `Elektrod ${anode.id} (${anodeSide === 'left' ? 'Kiri' : 'Kanan'}) menipis kerana atom mengion kepada ${anode.halfCellIon}.`,
      cathodeObs: `Gelembung gas hidrogen (H₂) terbebas pada permukaan elektrod ${cathode.id} (${cathodeSide === 'left' ? 'Kiri' : 'Kanan'}).`,
    };
  }

  // Sel Daniell
  const redHalf = `${cathode.halfCellIon}(ak) + ${formatCoeff(cathode.valency)}e⁻ → ${cathode.id}(p)`;
  const g = gcd(anode.valency, cathode.valency);
  const cAn = cathode.valency / g;
  const cCat = anode.valency / g;
  const overall = `${formatCoeff(cAn)}${anode.id}(p) + ${formatCoeff(cCat)}${cathode.halfCellIon}(ak) → ${formatCoeff(cAn)}${anode.halfCellIon}(ak) + ${formatCoeff(cCat)}${cathode.id}(p)`;
  const cellNotation = `${anode.id}(p) | ${anode.halfCellIon}(ak) || ${cathode.halfCellIon}(ak) | ${cathode.id}(p)`;

  const cuNote =
    cathode.id === 'Cu'
      ? ' Keamatan warna biru larutan CuSO₄ menjadi semakin pudar.'
      : '';

  return {
    left,
    right,
    isSameMetal: false,
    anodeSide,
    cathodeSide,
    anode,
    cathode,
    voltmeterReading,
    eCellMagnitude,
    halfEqOxidation: oxHalf,
    halfEqReduction: redHalf,
    overallIonicEq: overall,
    cellNotation,
    anodeObs: `Kepingan ${anode.id} menipis apabila melarut menjadi ion ${anode.halfCellIon}; ion NO₃⁻ bergerak ke bikar anod.`,
    cathodeObs: `Pepejal ${cathode.id} mendak dan menebal pada katod; ion K⁺ bergerak ke bikar katod.${cuNote}`,
  };
}

interface ApparatusCanvasProps {
  tab: MainTab;
  cell: CellComputation;
  simpleElectrolyte: SimpleElectrolyte;
  daniellBridge: DaniellBridge;
  reactionAgeSec: number; // 0..1 normalized wear/fade progress
}

const ApparatusCanvas: React.FC<ApparatusCanvasProps> = ({
  tab,
  cell,
  simpleElectrolyte,
  daniellBridge,
  reactionAgeSec,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ tab, cell, simpleElectrolyte, daniellBridge, reactionAgeSec });
  stateRef.current = { tab, cell, simpleElectrolyte, daniellBridge, reactionAgeSec };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const startMs = performance.now();

    const drawVoltmeter = (cx: number, cy: number, reading: number, same: boolean) => {
      // Digital voltmeter housing
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = same ? '#64748b' : reading >= 0 ? '#38bdf8' : '#f87171';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(cx - 52, cy - 22, 104, 42, 8);
      ctx.fill();
      ctx.stroke();

      // Digital LCD screen
      ctx.fillStyle = '#020617';
      ctx.beginPath();
      ctx.roundRect(cx - 45, cy - 12, 90, 22, 4);
      ctx.fill();

      ctx.fillStyle = same ? '#94a3b8' : reading >= 0 ? '#fde047' : '#fb7185';
      ctx.font = '800 13px ui-monospace, SFMono-Regular, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(formatVoltageSigned(reading), cx, cy - 0.5);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '700 8.5px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText('VOLTMETER (V)', cx, cy - 17);

      // Terminal dots (- left COM, + right V)
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.arc(cx - 52, cy, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(cx + 52, cy, 4, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawElectronStream = (
      xAnode: number,
      xCathode: number,
      yElectrodeTop: number,
      yMeter: number,
      cxMeter: number,
      elapsed: number,
      active: boolean
    ) => {
      // Wires left & right to voltmeter
      const xLeft = Math.min(xAnode, xCathode);
      const xRight = Math.max(xAnode, xCathode);

      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2.4;
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(xLeft, yElectrodeTop);
      ctx.lineTo(xLeft, yMeter);
      ctx.lineTo(cxMeter - 52, yMeter);
      ctx.moveTo(xRight, yElectrodeTop);
      ctx.lineTo(xRight, yMeter);
      ctx.lineTo(cxMeter + 52, yMeter);
      ctx.stroke();

      if (!active) return;

      // Animate glowing yellow electrons along path from Anode -> Cathode
      const dirLeftToRight = xAnode < xCathode;
      const totalSpan = xRight - xLeft;
      for (let i = 0; i < 6; i++) {
        const p = (elapsed * 0.45 + i / 6) % 1;
        const frac = dirLeftToRight ? p : 1 - p;
        const x = xLeft + frac * totalSpan;
        let y = yMeter;
        if (Math.abs(x - cxMeter) < 52) {
          y = yMeter - 24;
        }
        ctx.save();
        ctx.shadowColor = '#fde047';
        ctx.shadowBlur = 8;
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(x, y, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Direction label above wire
      ctx.fillStyle = '#fde047';
      ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        dirLeftToRight ? 'Aliran e⁻ →' : '← Aliran e⁻',
        cxMeter,
        yMeter + 29
      );
    };

    const render = (now: number) => {
      const elapsed = (now - startMs) / 1000;
      const dpr = window.devicePixelRatio || 1;
      const cssW = 450;
      const cssH = 228;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      const {
        tab: curTab,
        cell: c,
        simpleElectrolyte: el,
        daniellBridge: br,
        reactionAgeSec: wear,
      } = stateRef.current;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);

      ctx.fillStyle = '#070b14';
      ctx.fillRect(0, 0, cssW, cssH);

      const cx = cssW / 2;
      const wearFrac = Math.min(1, wear);

      if (curTab === 'simple') {
        // SINGLE BEAKER SEL KIMIA RINGKAS
        const bW = 186;
        const bH = 114;
        const bX = cx - bW / 2;
        const bY = 92;

        // Electrolyte liquid
        const liqY = bY + 24;
        ctx.fillStyle = el === 'h2so4' ? 'rgba(186, 230, 253, 0.25)' : 'rgba(226, 232, 240, 0.22)';
        ctx.fillRect(bX + 2, liqY, bW - 4, bH - 26);

        // Meniscus
        ctx.strokeStyle = 'rgba(255,255,255,0.45)';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(bX + 2, liqY);
        ctx.lineTo(bX + bW - 2, liqY);
        ctx.stroke();

        // Electrodes
        const leftX = cx - 48;
        const rightX = cx + 48;
        const leftWidth = c.anodeSide === 'left' ? 16 - wearFrac * 5 : 16;
        const rightWidth = c.anodeSide === 'right' ? 16 - wearFrac * 5 : 16;

        // Left strip
        ctx.fillStyle = c.left.stripColor;
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1.2;
        ctx.fillRect(leftX - leftWidth / 2, 74, leftWidth, 110);
        ctx.strokeRect(leftX - leftWidth / 2, 74, leftWidth, 110);

        // Right strip
        ctx.fillStyle = c.right.stripColor;
        ctx.fillRect(rightX - rightWidth / 2, 74, rightWidth, 110);
        ctx.strokeRect(rightX - rightWidth / 2, 74, rightWidth, 110);

        // Cathode H2 bubbles rising!
        if (!c.isSameMetal) {
          const catX = c.cathodeSide === 'left' ? leftX : rightX;
          for (let i = 0; i < 7; i++) {
            const by = 178 - ((elapsed * 55 + i * 11) % 62);
            const bx = catX + (i % 2 === 0 ? -11 : 11) + Math.sin(elapsed * 4 + i) * 3;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.arc(bx, by, 2.3, 0, Math.PI * 2);
            ctx.stroke();
          }

          // Dissolving metal cation dots from Anode
          const anX = c.anodeSide === 'left' ? leftX : rightX;
          for (let i = 0; i < 4; i++) {
            const dy = 134 + ((elapsed * 22 + i * 14) % 44);
            const dx = anX + (c.anodeSide === 'left' ? 14 : -14) + Math.sin(elapsed * 2 + i) * 4;
            ctx.fillStyle = '#4ade80';
            ctx.beginPath();
            ctx.arc(dx, dy, 2.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Beaker glass walls
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(bX - 4, bY);
        ctx.lineTo(bX, bY + 4);
        ctx.lineTo(bX, bY + bH);
        ctx.lineTo(bX + bW, bY + bH);
        ctx.lineTo(bX + bW, bY + 4);
        ctx.lineTo(bX + bW + 4, bY);
        ctx.stroke();

        // Electron wires + Voltmeter
        const anX = c.anodeSide === 'right' ? rightX : leftX;
        const catX = c.cathodeSide === 'left' ? leftX : rightX;
        drawElectronStream(anX, catX, 74, 34, cx, elapsed, !c.isSameMetal);
        drawVoltmeter(cx, 34, c.voltmeterReading, c.isSameMetal);

        // Clean Textbook Labels
        ctx.font = '700 10px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillStyle = c.anodeSide === 'left' ? '#93c5fd' : c.cathodeSide === 'left' ? '#fca5a5' : '#cbd5e1';
        ctx.fillText(
          `${c.left.id} (${c.anodeSide === 'left' ? 'Anod -' : c.cathodeSide === 'left' ? 'Katod +' : 'Sama'})`,
          bX - 10,
          126
        );
        ctx.fillStyle = '#94a3b8';
        ctx.font = '500 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(`E° = ${formatE0(c.left.e0)}`, bX - 10, 140);

        ctx.textAlign = 'left';
        ctx.fillStyle = c.anodeSide === 'right' ? '#93c5fd' : c.cathodeSide === 'right' ? '#fca5a5' : '#cbd5e1';
        ctx.font = '700 10px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(
          `${c.right.id} (${c.anodeSide === 'right' ? 'Anod -' : c.cathodeSide === 'right' ? 'Katod +' : 'Sama'})`,
          bX + bW + 10,
          126
        );
        ctx.fillStyle = '#94a3b8';
        ctx.font = '500 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(`E° = ${formatE0(c.right.e0)}`, bX + bW + 10, 140);

        ctx.textAlign = 'center';
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '600 10px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(
          el === 'h2so4' ? 'Elektrolit: Asid sulfurik cair, H₂SO₄(ak)' : 'Elektrolit: Larutan NaCl(ak)',
          cx,
          220
        );
      } else {
        // TAB 2: SEL DANIELL (2 HALF-CELLS + SALT BRIDGE OR POROUS POT)
        const leftBeakerX = 64;
        const rightBeakerX = 274;
        const bW = 112;
        const bH = 98;
        const bY = 104;
        const liqY = bY + 20;

        const leftElectrodeX = leftBeakerX + 34;
        const rightElectrodeX = rightBeakerX + 78;

        // Compute CuSO4 fading if Cu is Cathode!
        const leftAlpha =
          c.left.id === 'Cu' && c.cathodeSide === 'left'
            ? c.left.solutionAlpha * (1 - wearFrac * 0.6)
            : c.left.solutionAlpha;
        const rightAlpha =
          c.right.id === 'Cu' && c.cathodeSide === 'right'
            ? c.right.solutionAlpha * (1 - wearFrac * 0.6)
            : c.right.solutionAlpha;

        if (br === 'salt-bridge') {
          // Two separated beakers
          // Left solution
          ctx.fillStyle = `rgba(${c.left.solutionRgb.join(',')}, ${leftAlpha})`;
          ctx.fillRect(leftBeakerX + 2, liqY, bW - 4, bH - 22);
          // Right solution
          ctx.fillStyle = `rgba(${c.right.solutionRgb.join(',')}, ${rightAlpha})`;
          ctx.fillRect(rightBeakerX + 2, liqY, bW - 4, bH - 22);

          // Meniscus lines
          ctx.strokeStyle = 'rgba(255,255,255,0.45)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(leftBeakerX + 2, liqY);
          ctx.lineTo(leftBeakerX + bW - 2, liqY);
          ctx.moveTo(rightBeakerX + 2, liqY);
          ctx.lineTo(rightBeakerX + bW - 2, liqY);
          ctx.stroke();

          // Inverted U-tube Salt Bridge (KNO3) cleanly below the Voltmeter (apex y ~ 86)
          const leftBridgeX = leftBeakerX + bW - 22;
          const rightBridgeX = rightBeakerX + 22;

          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 17;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.beginPath();
          ctx.moveTo(leftBridgeX, 166);
          ctx.lineTo(leftBridgeX, 108);
          ctx.quadraticCurveTo(cx, 66, rightBridgeX, 108);
          ctx.lineTo(rightBridgeX, 166);
          ctx.stroke();

          ctx.strokeStyle = 'rgba(226, 232, 240, 0.90)';
          ctx.lineWidth = 12.5;
          ctx.beginPath();
          ctx.moveTo(leftBridgeX, 166);
          ctx.lineTo(leftBridgeX, 108);
          ctx.quadraticCurveTo(cx, 66, rightBridgeX, 108);
          ctx.lineTo(rightBridgeX, 166);
          ctx.stroke();

          // NO3- and K+ ion indicators cleanly inside the salt bridge arch (y ~ 87)
          if (!c.isSameMetal) {
            const no3Dir = c.anodeSide === 'left' ? -1 : 1;
            const kDir = c.cathodeSide === 'left' ? -1 : 1;
            const shift = ((elapsed * 20) % 26) - 13;

            // NO3- pill moving toward Anode
            ctx.fillStyle = '#2563eb';
            ctx.beginPath();
            ctx.arc(cx - 18 + shift * no3Dir, 89, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.font = '800 6.5px ui-sans-serif, system-ui, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('NO₃⁻', cx - 18 + shift * no3Dir, 89.5);

            // K+ pill moving toward Cathode
            ctx.fillStyle = '#dc2626';
            ctx.beginPath();
            ctx.arc(cx + 18 + shift * kDir, 89, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.fillText('K⁺', cx + 18 + shift * kDir, 89.5);
          }

          // Glass beaker borders
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 2;
          [leftBeakerX, rightBeakerX].forEach((bx) => {
            ctx.beginPath();
            ctx.moveTo(bx - 3, bY);
            ctx.lineTo(bx, bY + 3);
            ctx.lineTo(bx, bY + bH);
            ctx.lineTo(bx + bW, bY + bH);
            ctx.lineTo(bx + bW, bY + 3);
            ctx.lineTo(bx + bW + 3, bY);
            ctx.stroke();
          });

          ctx.fillStyle = '#fde047';
          ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Jambatan Garam (KNO₃)', cx, 219);
        } else {
          // POROUS POT CELL (Beaker with left compartment inside terracotta porous pot & right outer solution)
          const outerX = 88;
          const outerW = 274;
          const potX = 104;
          const potW = 114;

          // Right (outer) solution fill
          ctx.fillStyle = `rgba(${c.right.solutionRgb.join(',')}, ${rightAlpha})`;
          ctx.fillRect(outerX + 2, liqY, outerW - 4, bH - 22);

          // Left (porous pot interior) solution fill
          ctx.fillStyle = `rgba(${c.left.solutionRgb.join(',')}, ${leftAlpha})`;
          ctx.fillRect(potX + 4, liqY + 2, potW - 8, bH - 30);

          // Terracotta porous pot wall around left half-cell
          ctx.strokeStyle = '#d97706';
          ctx.lineWidth = 4;
          ctx.setLineDash([5, 3]);
          ctx.strokeRect(potX + 2, bY + 8, potW - 4, bH - 14);
          ctx.setLineDash([]);

          // Outer glass beaker
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(outerX - 3, bY);
          ctx.lineTo(outerX, bY + 3);
          ctx.lineTo(outerX, bY + bH);
          ctx.lineTo(outerX + outerW, bY + bH);
          ctx.lineTo(outerX + outerW, bY + 3);
          ctx.lineTo(outerX + outerW + 3, bY);
          ctx.stroke();

          // Ions crossing porous wall
          if (!c.isSameMetal) {
            const wallX = potX + potW;
            const shift = ((elapsed * 18) % 24) - 12;
            const anDir = c.anodeSide === 'left' ? -1 : 1;
            ctx.fillStyle = '#38bdf8';
            ctx.beginPath();
            ctx.arc(wallX + shift * anDir, 154, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#fb7185';
            ctx.beginPath();
            ctx.arc(wallX - shift * anDir, 168, 4, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.fillStyle = '#fbbf24';
          ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Pasu Berliang (Membenarkan pertukaran ion)', cx, 219);
        }

        // Electrodes (with anode thinning & cathode metal plating thickening!)
        const lX = br === 'salt-bridge' ? leftElectrodeX : 148;
        const rX = br === 'salt-bridge' ? rightElectrodeX : 318;
        const lW = c.anodeSide === 'left' ? 14 - wearFrac * 4.5 : c.cathodeSide === 'left' ? 14 + wearFrac * 5 : 14;
        const rW = c.anodeSide === 'right' ? 14 - wearFrac * 4.5 : c.cathodeSide === 'right' ? 14 + wearFrac * 5 : 14;

        ctx.fillStyle = c.left.stripColor;
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1.2;
        ctx.fillRect(lX - lW / 2, 82, lW, 106);
        ctx.strokeRect(lX - lW / 2, 82, lW, 106);

        ctx.fillStyle = c.right.stripColor;
        ctx.fillRect(rX - rW / 2, 82, rW, 106);
        ctx.strokeRect(rX - rW / 2, 82, rW, 106);

        // Electron wires + Voltmeter
        const anX = c.anodeSide === 'right' ? rX : lX;
        const catX = c.cathodeSide === 'left' ? lX : rX;
        drawElectronStream(anX, catX, 82, 32, cx, elapsed, !c.isSameMetal);
        drawVoltmeter(cx, 32, c.voltmeterReading, c.isSameMetal);

        // Beaker labels (left & right outer margins)
        ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillStyle = c.anodeSide === 'left' ? '#93c5fd' : c.cathodeSide === 'left' ? '#fca5a5' : '#cbd5e1';
        ctx.fillText(c.left.id, 58, 128);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '500 8.8px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(c.left.halfCellSalt.replace('(ak)', ''), 58, 142);

        ctx.textAlign = 'left';
        ctx.fillStyle = c.anodeSide === 'right' ? '#93c5fd' : c.cathodeSide === 'right' ? '#fca5a5' : '#cbd5e1';
        ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(c.right.id, 392, 128);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '500 8.8px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(c.right.halfCellSalt.replace('(ak)', ''), 392, 142);
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
      style={{ width: 450, height: 228 }}
      className="w-full max-w-[450px] h-[228px] mx-auto block rounded-xl border border-slate-800 bg-[#070b14]"
    />
  );
};

interface SubmicroRedoxCanvasProps {
  tab: MainTab;
  cell: CellComputation;
  size?: number;
}

const SubmicroRedoxCanvas: React.FC<SubmicroRedoxCanvasProps> = ({
  tab,
  cell,
  size = 200,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ tab, cell, size });
  stateRef.current = { tab, cell, size };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const startMs = performance.now();

    const drawParticle = (
      x: number,
      y: number,
      r: number,
      color: string,
      label: string,
      textColor = '#090d16'
    ) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.45)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = textColor;
      ctx.font = `800 ${r >= 12 ? 8.5 : 7.5}px ui-sans-serif, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x, y + 0.5);
    };

    const render = (now: number) => {
      const t = (now - startMs) / 1000;
      const { tab: curTab, cell: c, size: boxSize } = stateRef.current;

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

      if (c.isSameMetal) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = `700 ${10.5 * sc}px ui-sans-serif, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('E° kiri = E° kanan', cx, cy - 10 * sc);
        ctx.font = `500 ${9 * sc}px ui-sans-serif, system-ui, sans-serif`;
        ctx.fillText('Tiada pemindahan elektron', cx, cy + 8 * sc);
      } else {
        const phase = (t * 0.85) % 1;

        // Top section: Anode (-): Metal atom releases yellow e- upward & enters solution as M^n+
        ctx.fillStyle = 'rgba(59, 130, 246, 0.14)';
        ctx.fillRect(0, 0, cssW, cy - 10 * sc);
        ctx.fillStyle = '#93c5fd';
        ctx.font = `800 ${8.2 * sc}px ui-sans-serif, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(`ANOD (-): ${c.anode.id} → ${c.anode.halfCellIon} + e⁻`, cx, 42 * sc);

        // Anode metal lattice block on left of top zone
        ctx.fillStyle = c.anode.stripColor;
        ctx.fillRect(36 * sc, 53 * sc, 30 * sc, 30 * sc);
        drawParticle(
          (74 + phase * 44) * sc,
          68 * sc,
          10.5 * sc,
          '#4ade80',
          c.anode.halfCellIon
        );
        // Electron flying upward
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(51 * sc, (64 - phase * 18) * sc, 3.5 * sc, 0, Math.PI * 2);
        ctx.fill();

        // Middle divider or Salt Bridge ion corridor (Tab 2)
        if (curTab === 'daniell') {
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(0, cy - 9 * sc, cssW, 18 * sc);
          ctx.fillStyle = '#fde047';
          ctx.font = `700 ${7.8 * sc}px ui-sans-serif, system-ui, sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText('NO₃⁻ → Anod   |   K⁺ → Katod', cx, cy + 1 * sc);
        } else {
          ctx.strokeStyle = '#334155';
          ctx.beginPath();
          ctx.moveTo(14 * sc, cy);
          ctx.lineTo(cssW - 14 * sc, cy);
          ctx.stroke();
        }

        // Bottom section: Cathode (+)
        ctx.fillStyle = 'rgba(239, 68, 68, 0.14)';
        ctx.fillRect(0, cy + 10 * sc, cssW, cy);
        ctx.fillStyle = '#fca5a5';
        ctx.font = `800 ${8.5 * sc}px ui-sans-serif, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        const catTitle =
          curTab === 'simple'
            ? 'KATOD (+): 2H⁺ + 2e⁻ → H₂'
            : `KATOD (+): ${c.cathode.halfCellIon} + e⁻ → ${c.cathode.id}`;
        ctx.fillText(catTitle, cx, cy + 24 * sc);

        // Cathode block on left of bottom zone
        ctx.fillStyle = c.cathode.stripColor;
        ctx.fillRect(28 * sc, cy + 36 * sc, 34 * sc, 36 * sc);

        // Yellow electron arriving at cathode
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(46 * sc, cy + (34 + phase * 18) * sc, 3.6 * sc, 0, Math.PI * 2);
        ctx.fill();

        if (curTab === 'simple') {
          // H+ ions moving toward cathode & H2 bubble rising
          drawParticle(
            (116 - phase * 46) * sc,
            cy + 56 * sc,
            9.5 * sc,
            '#38bdf8',
            'H⁺'
          );
          drawParticle(
            142 * sc,
            cy + (66 - phase * 26) * sc,
            10.5 * sc,
            '#f8fafc',
            'H₂'
          );
        } else {
          // Cation moving toward cathode to plate
          drawParticle(
            (122 - phase * 52) * sc,
            cy + 55 * sc,
            11 * sc,
            c.cathode.id === 'Cu' ? '#60a5fa' : '#cbd5e1',
            c.cathode.halfCellIon
          );
        }
      }

      ctx.restore();

      // Magnifier rim
      ctx.strokeStyle = c.isSameMetal ? '#64748b' : '#facc15';
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

export const VoltaicCellLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MainTab>('simple');
  const [leftMetal, setLeftMetal] = useState<MetalId>('Zn');
  const [rightMetal, setRightMetal] = useState<MetalId>('Cu');
  const [simpleElectrolyte, setSimpleElectrolyte] = useState<SimpleElectrolyte>('h2so4');
  const [daniellBridge, setDaniellBridge] = useState<DaniellBridge>('salt-bridge');
  const [missionIdx, setMissionIdx] = useState(0);
  const [reactionAge, setReactionAge] = useState(0);
  const [isMagnifierExpanded, setIsMagnifierExpanded] = useState(false);

  const hasRecordedCompletionRef = useRef(false);
  const cell = computeCell(activeTab, leftMetal, rightMetal);
  const activeMission = MISSIONS[missionIdx];
  const isMissionPassed = activeMission.check(
    cell.voltmeterReading,
    cell.eCellMagnitude,
    cell.isSameMetal
  );

  // Subtle continuous wear / CuSO4 fading progression over ~6s per pair selection
  useEffect(() => {
    setReactionAge(0);
    if (cell.isSameMetal) return;
    let rafId = 0;
    const startMs = performance.now();
    const tick = (now: number) => {
      const frac = Math.min(1, (now - startMs) / 6000);
      setReactionAge(frac);
      if (frac < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [activeTab, leftMetal, rightMetal, simpleElectrolyte, daniellBridge, cell.isSameMetal]);

  // Analytics completion when user runs both tabs or passes a mission
  useEffect(() => {
    if (isMissionPassed && !hasRecordedCompletionRef.current) {
      hasRecordedCompletionRef.current = true;
      analytics.recordSimulationCompleted('sel-kimia-voltan');
    }
  }, [isMissionPassed]);

  const handleReset = () => {
    setLeftMetal('Zn');
    setRightMetal('Cu');
    setReactionAge(0);
  };

  return (
    <div className="bg-[#0b0f19] text-white rounded-2xl p-3.5 sm:p-4 border border-slate-800 shadow-2xl space-y-2.5">
      {/* TOP HEADER BAR: TITLE, 2 MAIN TABS, MISSION BOX */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-yellow-300">
            <BatteryCharging className="w-3.5 h-3.5 text-yellow-400" />
            <span>Simulasi Redoks: Sel Kimia & Voltan Pasangan Logam</span>
          </div>

          <div className="inline-flex bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('simple')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'simple'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              Sel Kimia Ringkas
            </button>
            <button
              onClick={() => setActiveTab('daniell')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'daniell'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Sel Daniell
            </button>
          </div>
        </div>

        {/* Cabaran Misi Pantas (Sudut Atas Kanan) */}
        <div
          className={`flex items-center gap-2 px-2.5 py-1 rounded-xl border text-[11px] transition ${
            isMissionPassed
              ? 'bg-emerald-950/75 border-emerald-400/60 text-emerald-200'
              : 'bg-slate-900 border-yellow-500/40 text-slate-200'
          }`}
        >
          {isMissionPassed ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          ) : (
            <Trophy className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
          )}
          <span className="font-semibold">
            <strong className="text-yellow-300">Misi:</strong> {activeMission.label}
          </span>
          {isMissionPassed && (
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
              Berjaya!
            </span>
          )}
          <button
            onClick={() => setMissionIdx((i) => (i + 1) % MISSIONS.length)}
            className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[10px] font-bold text-sky-300 cursor-pointer"
          >
            Misi Lain
          </button>
          <button
            onClick={handleReset}
            title="Set Semula (Zn | Cu)"
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* BAHAGIAN ATAS: PANEL KAWALAN (KIRI) — KANVAS RADAS (TENGAH) — KANTA SUBMIKROSKOPIK (KANAN) */}
      <div className="grid grid-cols-1 lg:grid-cols-[245px_1fr_240px] gap-2.5 items-stretch">
        {/* PANEL KAWALAN (KIRI) */}
        <div className="bg-[#111827] border border-slate-800 rounded-xl p-2.5 flex flex-col justify-between space-y-2">
          <div className="space-y-2">
            {/* Elektrod Kiri */}
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wide text-blue-300 mb-1">
                {activeTab === 'simple' ? 'Elektrod Kiri' : 'Setengah Sel Kiri'}
              </label>
              <select
                aria-label="Pilih Elektrod Kiri"
                value={leftMetal}
                onChange={(e) => setLeftMetal(e.target.value as MetalId)}
                className="w-full bg-[#090d16] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-blue-400 cursor-pointer"
              >
                {METALS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {activeTab === 'simple'
                      ? `${m.name} (${m.id}) · E° = ${formatE0(m.e0)}`
                      : `${m.id} dlm ${m.halfCellSalt.replace('(ak)', '')} (${formatE0(m.e0)})`}
                  </option>
                ))}
              </select>
            </div>

            {/* Elektrod Kanan */}
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wide text-red-300 mb-1">
                {activeTab === 'simple' ? 'Elektrod Kanan' : 'Setengah Sel Kanan'}
              </label>
              <select
                aria-label="Pilih Elektrod Kanan"
                value={rightMetal}
                onChange={(e) => setRightMetal(e.target.value as MetalId)}
                className="w-full bg-[#090d16] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-red-400 cursor-pointer"
              >
                {METALS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {activeTab === 'simple'
                      ? `${m.name} (${m.id}) · E° = ${formatE0(m.e0)}`
                      : `${m.id} dlm ${m.halfCellSalt.replace('(ak)', '')} (${formatE0(m.e0)})`}
                  </option>
                ))}
              </select>
            </div>

            {/* Togol Elektrolit (Tab 1) ATAU Jambatan Garam vs Pasu Berliang (Tab 2) */}
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wide text-yellow-300 mb-1">
                {activeTab === 'simple' ? 'Pilihan Elektrolit' : 'Penyambung Litar Dalaman'}
              </div>
              {activeTab === 'simple' ? (
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => setSimpleElectrolyte('h2so4')}
                    className={`px-2 py-1.5 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${
                      simpleElectrolyte === 'h2so4'
                        ? 'bg-blue-600/25 border-blue-400 text-white'
                        : 'bg-[#090d16] border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    H₂SO₄ cair
                  </button>
                  <button
                    onClick={() => setSimpleElectrolyte('nacl')}
                    className={`px-2 py-1.5 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${
                      simpleElectrolyte === 'nacl'
                        ? 'bg-blue-600/25 border-blue-400 text-white'
                        : 'bg-[#090d16] border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Larutan NaCl
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => setDaniellBridge('salt-bridge')}
                    className={`px-2 py-1.5 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                      daniellBridge === 'salt-bridge'
                        ? 'bg-blue-600/25 border-blue-400 text-white'
                        : 'bg-[#090d16] border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Jambatan Garam
                  </button>
                  <button
                    onClick={() => setDaniellBridge('porous-pot')}
                    className={`px-2 py-1.5 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                      daniellBridge === 'porous-pot'
                        ? 'bg-amber-600/25 border-amber-400 text-white'
                        : 'bg-[#090d16] border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Pasu Berliang
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Jadual Ringkas Nilai E° Rujukan KSSM */}
          <div className="bg-[#090d16] border border-slate-800 rounded-lg p-2">
            <div className="text-[9.5px] font-bold text-slate-400 mb-1">
              Rujukan Keupayaan Elektrod Piawai (E°)
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[9.5px] font-mono">
              {METALS.map((m) => (
                <div key={m.id} className="flex justify-between text-slate-300">
                  <span>{m.halfCellIon}/{m.id}</span>
                  <span className={m.e0 < 0 ? 'text-blue-300' : 'text-red-300'}>
                    {formatE0(m.e0)}
                  </span>
                </div>
              ))}
              <div className="col-span-2 flex justify-between text-yellow-300 border-t border-slate-800 mt-0.5 pt-0.5">
                <span>Rujukan H⁺/H₂</span>
                <span>0.00 V</span>
              </div>
            </div>
          </div>
        </div>

        {/* KANVAS RADAS (TENGAH) */}
        <div className="bg-[#111827] border border-slate-800 rounded-xl p-2.5 flex flex-col justify-between">
          <ApparatusCanvas
            tab={activeTab}
            cell={cell}
            simpleElectrolyte={simpleElectrolyte}
            daniellBridge={daniellBridge}
            reactionAgeSec={reactionAge}
          />

          <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[10px] leading-snug">
            <div className="px-2.5 py-1.5 rounded-lg bg-[#090d16] border border-blue-500/30 text-blue-100">
              <strong className="text-blue-300">Anod (-):</strong> {cell.anodeObs}
            </div>
            <div className="px-2.5 py-1.5 rounded-lg bg-[#090d16] border border-red-500/30 text-red-100">
              <strong className="text-red-300">Katod (+):</strong> {cell.cathodeObs}
            </div>
          </div>
        </div>

        {/* KANTA PEMBESAR SUBMIKROSKOPIK (KANAN) */}
        <div className="bg-[#111827] border border-yellow-500/35 rounded-xl p-2.5 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <div>
              <h4 className="text-[11px] font-extrabold uppercase tracking-wide text-yellow-300">
                Kanta Pembesar Redoks
              </h4>
              <p className="text-[9.5px] text-slate-400">
                Permukaan Anod, Katod & Ion
              </p>
            </div>
            <button
              onClick={() => setIsMagnifierExpanded(true)}
              title="Perbesar Kanta Pembesar"
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-yellow-300 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <SubmicroRedoxCanvas tab={activeTab} cell={cell} size={198} />

          <div className="text-[9.5px] text-center text-slate-300 border-t border-slate-800 pt-1">
            Formula: <span className="font-mono text-yellow-300 font-bold">E°sel = E°katod − E°anod</span>
          </div>
        </div>
      </div>

      {/* BAHAGIAN BAWAH: PENGIRAAN VOLTAN & PAPAN ANALISIS AUTOMATIK */}
      <div className="bg-[#111827] border border-slate-800 rounded-xl p-2.5 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-xs font-extrabold text-white flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-yellow-400" />
            <span>Papan Pengiraan Voltan & Analisis Redoks Automatik</span>
          </h4>
          <div className="flex flex-wrap items-center gap-2 text-[10.5px]">
            <span className="px-2 py-0.5 rounded-lg bg-[#090d16] border border-slate-700 font-mono text-yellow-300 font-bold">
              {cell.isSameMetal
                ? 'E°sel = 0.00 V'
                : `E°sel = (${formatE0(cell.cathode.e0)}) − (${formatE0(cell.anode.e0)}) = +${cell.eCellMagnitude.toFixed(2)} V`}
            </span>
            {cell.voltmeterReading < 0 && (
              <span className="px-2 py-0.5 rounded-lg bg-red-950 border border-red-500/50 text-red-200 font-bold">
                Bacaan Voltmeter Terbalik: {formatVoltageSigned(cell.voltmeterReading)}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-[10.5px]">
          <div className="bg-[#090d16] border border-blue-500/30 rounded-lg px-2.5 py-1.5">
            <div className="text-[9.5px] font-bold uppercase text-blue-300">
              Terminal Negatif (Anod) & Setengah Pengoksidaan
            </div>
            <div className="font-bold text-white mt-0.5">
              {cell.isSameMetal ? 'Tiada' : `${cell.anode.name} (${cell.anodeSide === 'left' ? 'Kiri' : 'Kanan'})`}
            </div>
            <div className="font-mono text-blue-200 text-[10px] mt-0.5">
              {cell.halfEqOxidation}
            </div>
          </div>

          <div className="bg-[#090d16] border border-red-500/30 rounded-lg px-2.5 py-1.5">
            <div className="text-[9.5px] font-bold uppercase text-red-300">
              Terminal Positif (Katod) & Setengah Penurunan
            </div>
            <div className="font-bold text-white mt-0.5">
              {cell.isSameMetal ? 'Tiada' : `${cell.cathode.name} (${cell.cathodeSide === 'left' ? 'Kiri' : 'Kanan'})`}
            </div>
            <div className="font-mono text-red-200 text-[10px] mt-0.5">
              {cell.halfEqReduction}
            </div>
          </div>

          <div className="bg-[#090d16] border border-yellow-400/35 rounded-lg px-2.5 py-1.5">
            <div className="text-[9.5px] font-bold uppercase text-yellow-300">
              Persamaan Ionik Keseluruhan
            </div>
            <div className="font-mono text-yellow-100 font-bold text-[10.5px] mt-1 leading-snug">
              {cell.overallIonicEq}
            </div>
          </div>

          <div className="bg-[#090d16] border border-emerald-500/30 rounded-lg px-2.5 py-1.5">
            <div className="text-[9.5px] font-bold uppercase text-emerald-300">
              {activeTab === 'daniell' ? 'Notasi Sel Piawai' : 'Arah Aliran Elektron'}
            </div>
            <div className="font-mono text-emerald-200 font-bold text-[10.5px] mt-1 leading-snug">
              {activeTab === 'daniell'
                ? cell.cellNotation
                : cell.isSameMetal
                ? 'Tiada aliran elektron'
                : `${cell.anode.id} (Anod -) → Wayar luar → ${cell.cathode.id} (Katod +)`}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL PEMBESAR KANTA SUBMIKROSKOPIK */}
      {isMagnifierExpanded && (
        <div className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b0f19] border border-yellow-400/50 rounded-2xl p-5 max-w-md w-full space-y-3 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-yellow-300">
                  Kanta Pembesar Submikroskopik Sel Kimia
                </h4>
                <p className="text-xs text-slate-400">
                  {cell.anode.id} vs {cell.cathode.id} ({formatVoltageSigned(cell.voltmeterReading)})
                </p>
              </div>
              <button
                onClick={() => setIsMagnifierExpanded(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <SubmicroRedoxCanvas tab={activeTab} cell={cell} size={300} />
          </div>
        </div>
      )}
    </div>
  );
};

export default VoltaicCellLab;
