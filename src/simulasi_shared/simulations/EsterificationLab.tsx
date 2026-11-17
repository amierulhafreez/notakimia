import React, { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  Award,
  Beaker,
  CheckCircle2,
  Droplets,
  Flame,
  FlaskConical,
  HelpCircle,
  RotateCcw,
  Scissors,
  Sparkles,
} from 'lucide-react';
import { analytics } from '../services/analytics';

type AlcoholId = 'metanol' | 'etanol' | 'propanol' | 'butanol';
type AcidId = 'metanoik' | 'etanoik' | 'propanoik';
type EsterStage = 'empty' | 'mixed' | 'heating' | 'heated' | 'pouring' | 'poured';

interface AlcoholSpec {
  id: AlcoholId;
  name: string;
  formula: string;
  alkylGroup: string;
  alkylFormula: string;
  carbonCount: number;
}

interface AcidSpec {
  id: AcidId;
  name: string;
  formula: string;
  alkanoateRoot: string;
  acylFormula: string;
  carbonCount: number;
}

const ALCOHOLS: AlcoholSpec[] = [
  { id: 'metanol', name: 'Metanol', formula: 'CH₃OH', alkylGroup: 'Metil', alkylFormula: 'CH₃', carbonCount: 1 },
  { id: 'etanol', name: 'Etanol', formula: 'C₂H₅OH', alkylGroup: 'Etil', alkylFormula: 'C₂H₅', carbonCount: 2 },
  { id: 'propanol', name: 'Propan-1-ol', formula: 'C₃H₇OH', alkylGroup: 'Propil', alkylFormula: 'C₃H₇', carbonCount: 3 },
  { id: 'butanol', name: 'Butan-1-ol', formula: 'C₄H₉OH', alkylGroup: 'Butil', alkylFormula: 'C₄H₉', carbonCount: 4 },
];

const ACIDS: AcidSpec[] = [
  { id: 'metanoik', name: 'Asid metanoik', formula: 'HCOOH', alkanoateRoot: 'metanoat', acylFormula: 'H', carbonCount: 1 },
  { id: 'etanoik', name: 'Asid etanoik', formula: 'CH₃COOH', alkanoateRoot: 'etanoat', acylFormula: 'CH₃', carbonCount: 2 },
  { id: 'propanoik', name: 'Asid propanoik', formula: 'C₂H₅COOH', alkanoateRoot: 'propanoat', acylFormula: 'C₂H₅', carbonCount: 3 },
];

function getAlcohol(id: AlcoholId): AlcoholSpec {
  return ALCOHOLS.find((a) => a.id === id)!;
}

function getAcid(id: AcidId): AcidSpec {
  return ACIDS.find((a) => a.id === id)!;
}

function getAromaLabel(alcId: AlcoholId, acidId: AcidId): string {
  if (alcId === 'etanol' && acidId === 'etanoik') return 'Bau manis seperti gam / pelarut';
  if (alcId === 'propanol' && acidId === 'etanoik') return 'Bau buah pir';
  if (alcId === 'butanol' && acidId === 'etanoik') return 'Bau buah pisang';
  if (
    (alcId === 'metanol' && acidId === 'etanoik') ||
    (alcId === 'etanol' && acidId === 'metanoik')
  ) {
    return 'Bau buah-buahan manis / rum';
  }
  if (acidId === 'propanoik') return 'Bau buah nanas / epal manis';
  return 'Bau harum buah-buahan manis';
}

function getEsterFormula(alc: AlcoholSpec, acid: AcidSpec): string {
  const acylPrefix = acid.id === 'metanoik' ? 'H' : acid.acylFormula;
  return `${acylPrefix}COO${alc.alkylFormula}`;
}

function buildNamingOptions(alc: AlcoholSpec, acid: AcidSpec): string[] {
  const correct = `${alc.alkylGroup} ${acid.alkanoateRoot}`;
  const candidates = new Set<string>([correct]);

  // Swapped trap (classic KSSM misconception, e.g. Etil propanoat vs Propil etanoat)
  const alcAsRoot =
    alc.id === 'metanol'
      ? 'metanoat'
      : alc.id === 'etanol'
      ? 'etanoat'
      : alc.id === 'propanol'
      ? 'propanoat'
      : 'butanoat';
  const acidAsAlkyl =
    acid.id === 'metanoik' ? 'Metil' : acid.id === 'etanoik' ? 'Etil' : 'Propil';
  const swapped = `${acidAsAlkyl} ${alcAsRoot}`;
  candidates.add(swapped);

  // Additional realistic distractors
  const extraPools = [
    `${alc.alkylGroup} ${acid.id === 'etanoik' ? 'metanoat' : 'etanoat'}`,
    `${alc.id === 'etanol' ? 'Metil' : 'Etil'} ${acid.alkanoateRoot}`,
    `${alc.id === 'butanol' ? 'Propil' : 'Butil'} ${acid.alkanoateRoot}`,
    `${alc.alkylGroup} ${acid.id === 'propanoik' ? 'etanoat' : 'propanoat'}`,
  ];
  for (const item of extraPools) {
    if (candidates.size >= 4) break;
    candidates.add(item);
  }

  return Array.from(candidates).slice(0, 4).sort();
}

interface EsterBenchCanvasProps {
  alcohol: AlcoholSpec;
  acid: AcidSpec;
  stage: EsterStage;
  heatProgress: number;
  pourProgress: number;
}

const EsterBenchCanvas: React.FC<EsterBenchCanvasProps> = ({
  alcohol,
  acid,
  stage,
  heatProgress,
  pourProgress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ alcohol, acid, stage, heatProgress, pourProgress });
  stateRef.current = { alcohol, acid, stage, heatProgress, pourProgress };

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
      const cssW = 440;
      const cssH = 205;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      const {
        alcohol: alc,
        acid: ac,
        stage: st,
        heatProgress: hp,
        pourProgress: pp,
      } = stateRef.current;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);

      ctx.fillStyle = '#070b14';
      ctx.fillRect(0, 0, cssW, cssH);

      // Lab bench base
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(18, 188, 404, 8);

      const isHeatingPhase = st === 'empty' || st === 'mixed' || st === 'heating' || st === 'heated';

      if (isHeatingPhase) {
        // PHASE 1 & 2: BOILING TUBE HELD BY HOLDER OVER BUNSEN BURNER
        const cx = 210;

        // Bunsen burner underneath
        ctx.fillStyle = '#475569';
        ctx.fillRect(cx - 14, 178, 28, 10);
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(cx - 5, 152, 10, 26);

        if (st === 'heating' || st === 'heated') {
          const flicker = Math.sin(t * 18) * 1.4;
          ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
          ctx.beginPath();
          ctx.moveTo(cx - 5, 152);
          ctx.quadraticCurveTo(cx - 10, 142, cx, 132 + flicker);
          ctx.quadraticCurveTo(cx + 10, 142, cx + 5, 152);
          ctx.closePath();
          ctx.fill();

          ctx.fillStyle = 'rgba(250, 204, 21, 0.9)';
          ctx.beginPath();
          ctx.moveTo(cx - 3, 152);
          ctx.quadraticCurveTo(cx, 140 + flicker * 0.5, cx + 3, 152);
          ctx.closePath();
          ctx.fill();
        }

        // Tilted boiling tube + clamp/holder
        ctx.save();
        ctx.translate(cx, 88);
        ctx.rotate(0.28);

        // Wooden/Metal Test Tube Holder gripping neck from left
        ctx.fillStyle = '#d97706';
        ctx.fillRect(-98, -28, 76, 6);
        ctx.strokeStyle = '#92400e';
        ctx.lineWidth = 1;
        ctx.strokeRect(-98, -28, 76, 6);
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(-24, -30, 6, 10);

        const tW = 36;
        const tR = tW / 2;
        const topY = -46;
        const botY = 44;

        // Clip liquid inside boiling tube
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(-tR + 1.5, topY + 6);
        ctx.lineTo(-tR + 1.5, botY - tR);
        ctx.arc(0, botY - tR, tR - 1.5, Math.PI, 0, true);
        ctx.lineTo(tR - 1.5, topY + 6);
        ctx.closePath();
        ctx.clip();

        if (st !== 'empty') {
          ctx.fillStyle =
            st === 'heating' || st === 'heated'
              ? `rgba(254, 240, 138, ${0.28 + hp * 0.14})`
              : 'rgba(226, 232, 240, 0.35)';
          ctx.fillRect(-tR, 0, tW, botY + 4);

          ctx.strokeStyle = 'rgba(255,255,255,0.6)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(-tR + 2, 0);
          ctx.lineTo(tR - 2, 0);
          ctx.stroke();

          // Gentle boiling bubbles during heating
          if (st === 'heating' || st === 'heated') {
            for (let i = 0; i < 6; i++) {
              const bx = -10 + ((i * 5) % 20);
              const by = 36 - ((t * 40 + i * 7) % 34);
              ctx.strokeStyle = 'rgba(255,255,255,0.8)';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.arc(bx, by, 1.8, 0, Math.PI * 2);
              ctx.stroke();
            }
          }
        }
        ctx.restore();

        // Boiling tube glass border
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-tR, topY);
        ctx.lineTo(-tR, botY - tR);
        ctx.arc(0, botY - tR, tR, Math.PI, 0, true);
        ctx.lineTo(tR, topY);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(0, topY, tR + 1.5, 3, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();

        // Textbook callout labels
        ctx.font = '600 10px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fbbf24';
        ctx.fillText('Penyepit tabung uji', 112, 54);
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('Penunu Bunsen', 184, 174);

        ctx.textAlign = 'left';
        ctx.fillStyle = '#e2e8f0';
        ctx.fillText('Tabung didih', 248, 66);
        if (st !== 'empty') {
          ctx.fillStyle = '#93c5fd';
          ctx.fillText(`${alc.name} + ${ac.name}`, 248, 96);
          ctx.fillStyle = '#fde047';
          ctx.fillText('+ H₂SO₄ pekat (mangkin)', 248, 111);
        }
      } else {
        // PHASE 3: POURING / POURED INTO BEAKER WITH DISTILLED WATER -> FLOATING OILY ESTER LAYER!
        const bCx = 230;
        const bW = 128;
        const bH = 104;
        const bX = bCx - bW / 2;
        const bY = 84;

        // Pouring stream from tilted boiling tube on top-left when pouring
        if (st === 'pouring') {
          ctx.save();
          ctx.translate(142, 46);
          ctx.rotate(1.05);
          ctx.strokeStyle = '#cbd5e1';
          ctx.lineWidth = 1.8;
          ctx.strokeRect(-14, -36, 28, 72);
          ctx.restore();

          // Liquid stream
          ctx.strokeStyle = 'rgba(254, 240, 138, 0.78)';
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.moveTo(175, 58);
          ctx.quadraticCurveTo(205, 76, 214, 120);
          ctx.stroke();
        }

        const esterFraction = st === 'pouring' ? pp : 1;

        // Distilled water layer (bottom 68px)
        const waterTop = bY + 34;
        ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.fillRect(bX + 2, waterTop, bW - 4, bY + bH - waterTop - 2);

        // FLOATING OILY ESTER LAYER ON TOP OF WATER (colorless oily sheen with golden crisp border)
        if (esterFraction > 0.05) {
          const oilH = 15 * esterFraction;
          const oilTop = waterTop - oilH;
          const oilGrad = ctx.createLinearGradient(bX, oilTop, bX + bW, waterTop);
          oilGrad.addColorStop(0, 'rgba(254, 249, 195, 0.72)');
          oilGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.85)');
          oilGrad.addColorStop(1, 'rgba(253, 224, 71, 0.65)');
          ctx.fillStyle = oilGrad;
          ctx.fillRect(bX + 2, oilTop, bW - 4, oilH);

          // Crisp immiscible interface line between ester oil layer & water
          ctx.strokeStyle = '#fde047';
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(bX + 2, waterTop);
          ctx.lineTo(bX + bW - 2, waterTop);
          ctx.stroke();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(bX + 2, oilTop);
          ctx.lineTo(bX + bW - 2, oilTop);
          ctx.stroke();
        }

        // Glass beaker walls
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

        // Fruity aroma waves above beaker when poured
        if (st === 'poured') {
          ctx.strokeStyle = '#fde047';
          ctx.lineWidth = 1.5;
          [-26, 0, 26].forEach((dx, idx) => {
            const x = bCx + dx;
            const shift = Math.sin(t * 2.4 + idx) * 3;
            ctx.beginPath();
            ctx.moveTo(x, 78);
            ctx.quadraticCurveTo(x + 5 + shift, 66, x, 54);
            ctx.quadraticCurveTo(x - 5 - shift, 42, x, 30);
            ctx.stroke();
          });

          ctx.fillStyle = '#fde047';
          ctx.font = '700 10.5px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(getAromaLabel(alc.id, ac.id), bCx, 20);
        }

        // Textbook labels on Left & Right of Beaker
        ctx.font = '700 10px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fde047';
        ctx.fillText('Lapisan berminyak (Ester)', bX - 8, 108);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '500 9px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Terapung & tak berwarna', bX - 8, 121);

        ctx.fillStyle = '#38bdf8';
        ctx.font = '700 10px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Air suling', bX - 8, 156);

        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(bX - 6, 111);
        ctx.lineTo(bX + 2, 111);
        ctx.moveTo(bX - 6, 153);
        ctx.lineTo(bX + 2, 153);
        ctx.stroke();

        ctx.textAlign = 'left';
        ctx.fillStyle = '#94a3b8';
        ctx.font = '600 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Bikar', bX + bW + 10, 146);
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
      className="w-full max-w-[440px] aspect-[440/205] mx-auto block rounded-xl border border-slate-800 bg-[#070b14]"
    />
  );
};

interface MolecularCleavageCanvasProps {
  alcohol: AlcoholSpec;
  acid: AcidSpec;
  stage: EsterStage;
}

const MolecularCleavageCanvas: React.FC<MolecularCleavageCanvasProps> = ({
  alcohol,
  acid,
  stage,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ alcohol, acid, stage });
  stateRef.current = { alcohol, acid, stage };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const startMs = performance.now();

    const drawPill = (
      x: number,
      y: number,
      w: number,
      h: number,
      fill: string,
      border: string,
      label: string,
      textColor = '#ffffff'
    ) => {
      ctx.fillStyle = fill;
      ctx.strokeStyle = border;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(x - w / 2, y - h / 2, w, h, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = textColor;
      ctx.font = '800 10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x, y + 0.5);
    };

    const render = (now: number) => {
      const t = (now - startMs) / 1000;
      const dpr = window.devicePixelRatio || 1;
      const cssW = 280;
      const cssH = 190;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      const { alcohol: alc, acid: ac, stage: st } = stateRef.current;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = '#070b14';
      ctx.fillRect(0, 0, cssW, cssH);

      const isCutAndJoined = st === 'heated' || st === 'pouring' || st === 'poured';
      const isCutting = st === 'heating';
      const phase = isCutting ? Math.min(1, (t * 0.7) % 1) : isCutAndJoined ? 1 : 0;

      // Subtitles
      ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#60a5fa';
      ctx.fillText(`Alkohol (${alc.name})`, 70, 18);
      ctx.fillStyle = '#f87171';
      ctx.fillText(`Asid (${ac.name.replace('Asid ', '')})`, 212, 18);

      const cy = 84;

      if (phase < 0.55) {
        // REACTANT ORIENTATION WITH DASHED SCISSOR CUT LINES!
        // Left: Blue Alcohol (R — O — H)
        drawPill(44, cy, 46, 24, '#1e3a8a', '#60a5fa', alc.alkylFormula);
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(67, cy);
        ctx.lineTo(80, cy);
        ctx.moveTo(100, cy);
        ctx.lineTo(111, cy);
        ctx.stroke();
        drawPill(90, cy, 22, 22, '#2563eb', '#93c5fd', 'O');
        drawPill(120, cy, 20, 22, '#1e40af', '#fde047', 'H', '#fde047');

        // Right: Red Carboxylic Acid (HO — C(=O) — R')
        drawPill(162, cy, 28, 22, '#991b1b', '#fde047', 'HO', '#fde047');
        ctx.strokeStyle = '#f87171';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(176, cy);
        ctx.lineTo(188, cy);
        ctx.moveTo(212, cy);
        ctx.lineTo(222, cy);
        // C=O upward
        ctx.moveTo(198, cy - 11);
        ctx.lineTo(198, cy - 26);
        ctx.moveTo(202, cy - 11);
        ctx.lineTo(202, cy - 26);
        ctx.stroke();

        drawPill(200, cy - 34, 22, 18, '#dc2626', '#fca5a5', 'O');
        drawPill(200, cy, 24, 22, '#b91c1c', '#fca5a5', 'C');
        drawPill(244, cy, 44, 24, '#7f1d1d', '#f87171', ac.acylFormula);

        // Dashed yellow cleavage cuts slicing H and OH!
        ctx.strokeStyle = '#fde047';
        ctx.lineWidth = 1.6;
        ctx.setLineDash([4, 3]);
        ctx.strokeRect(108, cy - 18, 70, 36);
        ctx.setLineDash([]);

        ctx.fillStyle = '#fde047';
        ctx.font = '700 9px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Pemotongan -H & -OH → H₂O', 140, cy + 32);
      } else {
        // JOINED ESTER MOLECULE (-COO-) + RELEASED H2O MOLECULE!
        const rCenter = 56;
        const oCenter = 104;
        const cCenter = 152;
        const acylCenter = 208;

        // Covalent bond joining Blue (RO) to Red (C=O-R')!
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(rCenter + 22, cy);
        ctx.lineTo(oCenter - 11, cy);
        ctx.stroke();

        // Highlighted new Ester covalent bond in yellow!
        ctx.strokeStyle = '#fde047';
        ctx.lineWidth = 2.8;
        ctx.beginPath();
        ctx.moveTo(oCenter + 11, cy);
        ctx.lineTo(cCenter - 12, cy);
        ctx.stroke();

        ctx.strokeStyle = '#f87171';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(cCenter + 12, cy);
        ctx.lineTo(acylCenter - 22, cy);
        ctx.moveTo(cCenter - 2, cy - 11);
        ctx.lineTo(cCenter - 2, cy - 26);
        ctx.moveTo(cCenter + 2, cy - 11);
        ctx.lineTo(cCenter + 2, cy - 26);
        ctx.stroke();

        drawPill(rCenter, cy, 48, 24, '#1e3a8a', '#60a5fa', alc.alkylFormula);
        drawPill(oCenter, cy, 24, 22, '#2563eb', '#93c5fd', 'O');
        drawPill(cCenter, cy - 34, 22, 18, '#dc2626', '#fca5a5', 'O');
        drawPill(cCenter, cy, 24, 22, '#b91c1c', '#fca5a5', 'C');
        drawPill(acylCenter, cy, 48, 24, '#7f1d1d', '#f87171', ac.acylFormula);

        // Ester functional group highlight bracket (-COO-)
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.7)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 2]);
        ctx.strokeRect(oCenter - 16, cy - 48, 84, 64);
        ctx.setLineDash([]);

        ctx.fillStyle = '#fde047';
        ctx.font = '800 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Kumpulan Ester (-COO-)', 130, cy + 28);

        // Water molecule released below!
        const wy = 152 + Math.sin(t * 2.5) * 2.5;
        drawPill(140, wy, 48, 22, '#0284c7', '#7dd3fc', '+ H₂O');
        ctx.fillStyle = '#7dd3fc';
        ctx.font = '600 8.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Molekul air disingkirkan', 140, 178);
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
      className="w-full max-w-[280px] aspect-[280/190] mx-auto block rounded-xl border border-slate-800 bg-[#070b14]"
    />
  );
};

export const EsterificationLab: React.FC = () => {
  const [selectedAlcohol, setSelectedAlcohol] = useState<AlcoholId>('etanol');
  const [selectedAcid, setSelectedAcid] = useState<AcidId>('etanoik');
  const [hasCatalyst, setHasCatalyst] = useState<boolean>(false);
  const [stage, setStage] = useState<EsterStage>('empty');
  const [heatProgress, setHeatProgress] = useState(0);
  const [pourProgress, setPourProgress] = useState(0);
  const [catalystWarning, setCatalystWarning] = useState<string | null>(null);
  const [namingTrainingMode, setNamingTrainingMode] = useState<boolean>(false);
  const [chosenNameGuess, setChosenNameGuess] = useState<string | null>(null);

  const hasRecordedCompletionRef = useRef(false);

  const alc = getAlcohol(selectedAlcohol);
  const ac = getAcid(selectedAcid);
  const esterFormula = getEsterFormula(alc, ac);
  const correctIupacName = `${alc.alkylGroup} ${ac.alkanoateRoot}`;
  const aromaText = getAromaLabel(alc.id, ac.id);
  const namingOptions = buildNamingOptions(alc, ac);
  const isGuessCorrect = chosenNameGuess === correctIupacName;

  // Heat 1.4s -> heated
  useEffect(() => {
    if (stage !== 'heating') return;
    let rafId = 0;
    const startMs = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - startMs) / 1400);
      setHeatProgress(p);
      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setStage('heated');
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [stage]);

  // Pour 1.2s -> poured
  useEffect(() => {
    if (stage !== 'pouring') return;
    let rafId = 0;
    const startMs = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - startMs) / 1200);
      setPourProgress(p);
      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setStage('poured');
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [stage]);

  // Record analytics completion once ester layer poured into water
  useEffect(() => {
    if (stage === 'poured' && !hasRecordedCompletionRef.current) {
      hasRecordedCompletionRef.current = true;
      analytics.recordSimulationCompleted('pengesteran-alkohol-asid-karboksilik');
    }
  }, [stage]);

  const handleReset = () => {
    setStage('empty');
    setHeatProgress(0);
    setPourProgress(0);
    setCatalystWarning(null);
    setChosenNameGuess(null);
  };

  const handleSelectAlcohol = (id: AlcoholId) => {
    if (stage === 'heating' || stage === 'pouring') return;
    setSelectedAlcohol(id);
    handleReset();
  };

  const handleSelectAcid = (id: AcidId) => {
    if (stage === 'heating' || stage === 'pouring') return;
    setSelectedAcid(id);
    handleReset();
  };

  const handleHeat = () => {
    if (stage !== 'mixed') return;
    if (!hasCatalyst) {
      setCatalystWarning(
        'Tindak balas terlalu perlahan! Sila tambah asid sulfurik pekat sebagai mangkin terlebih dahulu.'
      );
      return;
    }
    setCatalystWarning(null);
    setHeatProgress(0);
    setStage('heating');
  };

  return (
    <div className="bg-[#0b0f19] text-white rounded-2xl p-3 border border-slate-800 shadow-2xl space-y-2">
      {/* HEADER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-yellow-300">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>Simulasi Sebatian Karbon: Tindak Balas Pengesteran & Pembangun Struktur Ester</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setNamingTrainingMode((m) => !m);
              setChosenNameGuess(null);
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition flex items-center gap-1 cursor-pointer ${
              namingTrainingMode
                ? 'bg-yellow-500 text-slate-950 border-yellow-400'
                : 'bg-slate-900 text-yellow-300 border-yellow-500/40 hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            {namingTrainingMode ? 'Mod Latihan Penamaan: Aktif' : 'Mod Latihan Penamaan'}
          </button>

          <button
            onClick={handleReset}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Set Semula
          </button>
        </div>
      </div>

      {/* BAHAGIAN ATAS: KIRI (BAHAN & KAWALAN) — TENGAH (MAKMAL) — KANAN (PEMOTONGAN MOLEKUL) */}
      <div className="grid grid-cols-1 lg:grid-cols-[265px_1fr_290px] gap-2.5 items-stretch">
        {/* 1. PANEL PEMILIHAN BAHAN & KAWALAN (KIRI) */}
        <div className="bg-[#111827] border border-slate-800 rounded-xl p-2.5 flex flex-col justify-between space-y-2">
          <div className="space-y-1.5">
            {/* Pilihan Alkohol (BIRU) */}
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wide text-blue-300 mb-1">
                Pilihan Alkohol (Bahagian Alkil - Biru)
              </div>
              <div className="grid grid-cols-2 gap-1">
                {ALCOHOLS.map((a) => {
                  const active = selectedAlcohol === a.id;
                  return (
                    <button
                      key={a.id}
                      onClick={() => handleSelectAlcohol(a.id)}
                      className={`px-2 py-1 rounded-lg border text-left transition cursor-pointer ${
                        active
                          ? 'bg-blue-600/30 border-blue-400 text-white font-bold'
                          : 'bg-[#090d16] border-slate-800 text-slate-300 hover:border-blue-500/50'
                      }`}
                    >
                      <div className="text-[10.5px] leading-tight">{a.name}</div>
                      <div className="text-[9px] font-mono text-blue-300">{a.formula}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pilihan Asid Karboksilik (MERAH) */}
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wide text-red-300 mb-1">
                Pilihan Asid Karboksilik (Merah)
              </div>
              <div className="grid grid-cols-3 gap-1">
                {ACIDS.map((acidItem) => {
                  const active = selectedAcid === acidItem.id;
                  return (
                    <button
                      key={acidItem.id}
                      onClick={() => handleSelectAcid(acidItem.id)}
                      className={`px-1.5 py-1 rounded-lg border text-center transition cursor-pointer ${
                        active
                          ? 'bg-red-600/30 border-red-400 text-white font-bold'
                          : 'bg-[#090d16] border-slate-800 text-slate-300 hover:border-red-500/50'
                      }`}
                    >
                      <div className="text-[9.5px] leading-tight font-bold">
                        {acidItem.name.replace('Asid ', '')}
                      </div>
                      <div className="text-[9px] font-mono text-red-300">{acidItem.formula}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mangkin Wajib H2SO4 Pekat */}
            <label
              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg border text-[10px] font-bold cursor-pointer transition ${
                hasCatalyst
                  ? 'bg-yellow-500/15 border-yellow-400 text-yellow-200'
                  : 'bg-[#090d16] border-slate-700 text-slate-300 hover:border-yellow-500/50'
              }`}
            >
              <input
                type="checkbox"
                checked={hasCatalyst}
                onChange={(e) => {
                  setHasCatalyst(e.target.checked);
                  if (e.target.checked) setCatalystWarning(null);
                }}
                className="accent-yellow-400 w-3.5 h-3.5 cursor-pointer"
              />
              <span>Tambah beberapa titik Asid Sulfurik Pekat (H₂SO₄)</span>
            </label>
          </div>

          {/* Butang Tindakan Prosedur */}
          <div className="space-y-1 pt-1 border-t border-slate-800">
            <button
              onClick={() => {
                setCatalystWarning(null);
                setStage('mixed');
              }}
              disabled={stage !== 'empty'}
              className={`w-full text-left px-2 py-1.5 rounded-lg text-[10px] font-bold transition flex items-center gap-1.5 cursor-pointer ${
                stage === 'empty'
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow'
                  : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-default'
              }`}
            >
              <Droplets className="w-3.5 h-3.5 shrink-0" />
              <span>1. Campurkan Bahan ke Tabung Didih</span>
            </button>

            <button
              onClick={handleHeat}
              disabled={stage !== 'mixed'}
              className={`w-full text-left px-2 py-1.5 rounded-lg text-[10px] font-bold transition flex items-center gap-1.5 cursor-pointer ${
                stage === 'mixed'
                  ? 'bg-red-600 hover:bg-red-500 text-white shadow'
                  : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-default'
              }`}
            >
              <Flame className="w-3.5 h-3.5 shrink-0" />
              <span>2. Panaskan Campuran dengan Bunsen</span>
            </button>

            <button
              onClick={() => {
                setPourProgress(0);
                setStage('pouring');
              }}
              disabled={stage !== 'heated'}
              className={`w-full text-left px-2 py-1.5 rounded-lg text-[10px] font-bold transition flex items-center gap-1.5 cursor-pointer ${
                stage === 'heated'
                  ? 'bg-yellow-500 hover:bg-yellow-400 text-slate-950 shadow'
                  : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-default'
              }`}
            >
              <Beaker className="w-3.5 h-3.5 shrink-0" />
              <span>3. Tuang Campuran ke Air Suling</span>
            </button>
          </div>
        </div>

        {/* 2. KANVAS MAKMAL MAYA PENGESTERAN (TENGAH) */}
        <div className="bg-[#111827] border border-slate-800 rounded-xl p-2 flex flex-col justify-between space-y-1.5">
          <EsterBenchCanvas
            alcohol={alc}
            acid={ac}
            stage={stage}
            heatProgress={heatProgress}
            pourProgress={pourProgress}
          />

          <div className="min-h-[38px] flex items-center">
            {catalystWarning ? (
              <div
                role="alert"
                className="w-full px-2.5 py-1.5 rounded-lg bg-red-950/90 border border-red-500 text-red-100 text-[10.5px] flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4 text-yellow-300 shrink-0" />
                <span>{catalystWarning}</span>
              </div>
            ) : stage === 'poured' ? (
              <div className="w-full px-2.5 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-100 text-[10.5px] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Terbentuk lapisan minyak tak berwarna terapung di atas air dengan{' '}
                  <strong className="text-yellow-300">{aromaText.toLowerCase()}</strong>.
                </span>
              </div>
            ) : (
              <div className="w-full px-2.5 py-1.5 rounded-lg bg-[#090d16] border border-slate-800 text-slate-300 text-[10.5px]">
                {stage === 'empty' && `Pilih alkohol + asid karboksilik, tandakan mangkin H₂SO₄ pekat, dan klik Langkah 1.`}
                {stage === 'mixed' && `Bahan dicampurkan ke dalam tabung didih. Pastikan H₂SO₄ pekat ditambah sebelum Langkah 2.`}
                {stage === 'heating' && `Memanaskan campuran dengan nyalaan perlahan penunu Bunsen...`}
                {stage === 'heated' && `Tindak balas pengesteran lengkap! Klik Langkah 3 untuk menuang hasil ke dalam air suling.`}
                {stage === 'pouring' && `Menuang hasil campuran panas ke dalam bikar berisi air suling...`}
              </div>
            )}
          </div>
        </div>

        {/* 3. ANIMASI SUBMIKROSKOPIK PEMOTONGAN MOLEKUL & PENAMAAN (KANAN) */}
        <div className="bg-[#111827] border border-yellow-500/35 rounded-xl p-2 flex flex-col justify-between space-y-1.5">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-[11px] font-extrabold uppercase tracking-wide text-yellow-300 flex items-center gap-1">
                <Scissors className="w-3.5 h-3.5" />
                Pemotongan Molekul & Penamaan
              </h4>
              <p className="text-[9px] text-slate-400">H (alkohol) + OH (asid) → H₂O</p>
            </div>
          </div>

          <MolecularCleavageCanvas alcohol={alc} acid={ac} stage={stage} />

          {/* Pengekodan Warna Nama IUPAC Ester */}
          <div className="bg-[#090d16] border border-slate-800 rounded-lg px-2.5 py-1.5 text-center">
            <div className="text-[9px] uppercase font-bold text-slate-400">Nama IUPAC Ester</div>
            {namingTrainingMode && !isGuessCorrect ? (
              <div className="text-xs font-extrabold text-yellow-300 mt-0.5">
                ??? (Selesaikan Mod Latihan Penamaan di bawah)
              </div>
            ) : (
              <div className="text-sm font-extrabold mt-0.5">
                <span className="text-blue-400">{alc.alkylGroup}</span>{' '}
                <span className="text-red-400">{ac.alkanoateRoot}</span>
                <span className="text-xs font-mono text-slate-300 ml-1.5">({esterFormula})</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BAHAGIAN BAWAH: CABARAN PENAMAAN / SIFAT FIZIK & PERSAMAAN SEIMBANG */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5">
        {/* BAWAH KIRI: MOD LATIHAN PENAMAAN ATAU SIFAT FIZIK ESTER */}
        <div className="lg:col-span-6 bg-[#111827] border border-slate-800 rounded-xl p-2.5 flex flex-col justify-between space-y-1.5">
          {namingTrainingMode ? (
            <>
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-extrabold text-yellow-300 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  Latihan Penamaan: Pilih Nama IUPAC ({alc.name} + {ac.name})
                </h4>
                {chosenNameGuess && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isGuessCorrect
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-400/50'
                        : 'bg-red-950 text-red-300 border-red-400/50'
                    }`}
                  >
                    {isGuessCorrect ? 'Betul! ✓' : 'Cuba Lagi!'}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {namingOptions.map((opt) => {
                  const picked = chosenNameGuess === opt;
                  const right = opt === correctIupacName;
                  return (
                    <button
                      key={opt}
                      onClick={() => setChosenNameGuess(opt)}
                      className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold text-left transition cursor-pointer ${
                        picked
                          ? right
                            ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200'
                            : 'bg-red-950/80 border-red-400 text-red-200'
                          : 'bg-[#090d16] border-slate-700 text-slate-200 hover:border-yellow-400/60'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              <p className="text-[10px] text-slate-400">
                Petua KSSM: Bahagian hadapan (<strong className="text-blue-300">-il</strong>) datang daripada alkohol; bahagian belakang (<strong className="text-red-300">-oat</strong>) datang daripada asid karboksilik.
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-white flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5 text-sky-400" />
                  Terbitan Nama IUPAC & Sifat Fizik Ester
                </h4>
                <span className="text-[10px] text-yellow-300 font-bold">{aromaText}</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-[10.5px]">
                <div className="bg-[#090d16] border border-blue-500/30 rounded-lg px-2.5 py-1.5">
                  <div className="text-[9.5px] font-bold uppercase text-blue-300">Dari Alkohol (Biru)</div>
                  <div className="font-bold text-white mt-0.5">
                    {alc.name} → <span className="text-blue-400">{alc.alkylGroup}</span>
                  </div>
                </div>
                <div className="bg-[#090d16] border border-red-500/30 rounded-lg px-2.5 py-1.5">
                  <div className="text-[9.5px] font-bold uppercase text-red-300">Dari Asid (Merah)</div>
                  <div className="font-bold text-white mt-0.5">
                    {ac.name} → <span className="text-red-400">{ac.alkanoateRoot}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#090d16] border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10px] text-slate-300">
                <strong className="text-white">Sifat Fizik Ester: </strong>
                Cecair neutral tak berwarna, meruap berbau wangi buah-buahan, tidak larut dan kurang tumpat daripada air (terapung sebagai lapisan minyak di atas air).
              </div>
            </>
          )}
        </div>

        {/* BAWAH KANAN: PERSAMAAN KIMIA SEIMBANG */}
        <div className="lg:col-span-6 bg-[#111827] border border-slate-800 rounded-xl p-2.5 flex flex-col justify-between space-y-1.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold text-yellow-300">
              Persamaan Kimia Pengesteran Seimbang
            </h4>
            <span className="text-[10px] font-mono text-slate-400">Mangkin: H₂SO₄ pekat, Δ</span>
          </div>

          <div className="bg-[#090d16] border border-yellow-400/40 rounded-lg px-3 py-2 text-center">
            <div className="font-mono text-xs sm:text-sm font-bold leading-relaxed">
              <span className="text-blue-400">{alc.formula}(ce)</span>
              <span className="text-slate-300"> + </span>
              <span className="text-red-400">{ac.formula}(ce)</span>
              <span className="text-yellow-300"> ⇌ </span>
              <span className="text-white">
                {namingTrainingMode && !isGuessCorrect ? 'Ester(ce)' : `${esterFormula}(ce)`}
              </span>
              <span className="text-sky-300"> + H₂O(ce)</span>
            </div>
          </div>

          <div className="bg-[#090d16] border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10px] text-slate-300 leading-snug">
            <strong className="text-white">Peranan H₂SO₄ Pekat: </strong>
            Bertindak sebagai <strong>mangkin</strong> untuk mempercepatkan tindak balas pengesteran serta menyerap air yang terhasil supaya hasil ester bertambah.
          </div>
        </div>
      </div>
    </div>
  );
};

export default EsterificationLab;
