import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  Beaker,
  CheckCircle2,
  ChevronRight,
  Droplets,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Waves,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { analytics } from '../services/analytics';

const SIM_ID = 'pencucian-sabun-detergen-air-liat';
type HardWaterType = 'cacl2' | 'mgso4' | 'seawater';
type StepNum = 1 | 2 | 3;
type BeakerId = 1 | 2 | 3 | 4;

interface BeakerSpec {
  id: BeakerId;
  title: string;
  waterLabel: string;
  agentLabel: string;
  foam: 'high' | 'none';
  scum: boolean;
  clean: boolean;
  explanation: string;
}

// ============================================================
// CANVAS 1: KANVAS 4 BIKAR PERBANDINGAN SERENTAK
// ============================================================
interface FourBeakersCanvasProps {
  step: StepNum;
  hardWater: HardWaterType;
  selectedBeaker: BeakerId;
  onSelectBeaker: (id: BeakerId) => void;
  isWashing: boolean;
  washProgress: number;
}

export const FourBeakersCanvas: React.FC<FourBeakersCanvasProps> = ({
  step,
  hardWater,
  selectedBeaker,
  onSelectBeaker,
  isWashing,
  washProgress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ step, hardWater, selectedBeaker, isWashing, washProgress });
  stateRef.current = { step, hardWater, selectedBeaker, isWashing, washProgress };

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
      const cssW = 560;
      const cssH = 290;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      const {
        step: st,
        hardWater: hw,
        selectedBeaker: sel,
        isWashing: washing,
        washProgress: wProg,
      } = stateRef.current;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, cssW, cssH);

      // Lab Bench
      const benchY = 226;
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(12, benchY, 536, 6);

      const hwName =
        hw === 'cacl2' ? 'Air Liat (CaCl₂)' : hw === 'mgso4' ? 'Air Liat (MgSO₄)' : 'Air Liat (Air Laut)';

      // Specifications for 4 beakers:
      // Bikar 1: Air Suling + Sabun -> Bersih, Buih banyak, tiada kekat
      // Bikar 2: Air Suling + Detergen -> Bersih, Buih banyak, tiada kekat
      // Bikar 3: Air Liat + Sabun -> Kekal kotor, tiada buih, kekat putih terbentuk
      // Bikar 4: Air Liat + Detergen -> Bersih, Buih banyak, tiada kekat
      const beakersData: {
        id: BeakerId;
        cx: number;
        title: string;
        water: string;
        agent: string;
        hasFoam: boolean;
        hasScum: boolean;
        isClean: boolean;
      }[] = [
        {
          id: 1,
          cx: 78,
          title: 'Bikar 1',
          water: 'Air Suling',
          agent: '+ Sabun',
          hasFoam: st === 3,
          hasScum: false,
          isClean: st === 3,
        },
        {
          id: 2,
          cx: 202,
          title: 'Bikar 2',
          water: 'Air Suling',
          agent: '+ Detergen',
          hasFoam: st === 3,
          hasScum: false,
          isClean: st === 3,
        },
        {
          id: 3,
          cx: 326,
          title: 'Bikar 3',
          water: hwName,
          agent: '+ Sabun',
          hasFoam: false,
          hasScum: st >= 2,
          isClean: false, // stains remain dirty!
        },
        {
          id: 4,
          cx: 450,
          title: 'Bikar 4',
          water: hwName,
          agent: '+ Detergen',
          hasFoam: st === 3,
          hasScum: false,
          isClean: st === 3,
        },
      ];

      beakersData.forEach((b) => {
        const cx = b.cx;
        const bTop = 100;
        const bBottom = benchY;
        const bWidth = 68;
        const halfW = bWidth / 2;
        const isSelected = sel === b.id;

        // Selection glow ring
        if (isSelected) {
          ctx.save();
          ctx.fillStyle = 'rgba(14, 165, 233, 0.08)';
          ctx.strokeStyle = '#0284c7';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(cx - halfW - 8, bTop - 24, bWidth + 16, bBottom - bTop + 58, 12);
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }

        // Header Title
        ctx.fillStyle = isSelected ? '#0369a1' : '#0f172a';
        ctx.font = '800 11px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(b.title, cx, bTop - 10);

        // Glass Beaker Body (100 cm³) with 3D reflections
        ctx.save();
        const bGrad = ctx.createLinearGradient(cx - halfW, 0, cx + halfW, 0);
        bGrad.addColorStop(0, 'rgba(203, 213, 225, 0.4)');
        bGrad.addColorStop(0.25, 'rgba(248, 250, 252, 0.65)');
        bGrad.addColorStop(0.75, 'rgba(226, 232, 240, 0.35)');
        bGrad.addColorStop(1, 'rgba(148, 163, 184, 0.5)');

        ctx.fillStyle = bGrad;
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(cx - halfW - 5, bTop - 4);
        ctx.lineTo(cx - halfW, bTop + 3);
        ctx.lineTo(cx - halfW, bBottom - 5);
        ctx.quadraticCurveTo(cx - halfW, bBottom, cx - halfW + 6, bBottom);
        ctx.lineTo(cx + halfW - 6, bBottom);
        ctx.quadraticCurveTo(cx + halfW, bBottom, cx + halfW, bBottom - 5);
        ctx.lineTo(cx + halfW, bTop);
        ctx.stroke();
        ctx.fill();

        // Liquid contents inside
        ctx.save();
        ctx.beginPath();
        ctx.rect(cx - halfW + 2, bTop + 2, bWidth - 4, bBottom - bTop - 4);
        ctx.clip();

        const liqTop = bBottom - (bBottom - bTop) * 0.55;

        // Base solution color:
        // Distilled water = clean soft pale blue; Hard water = pale cyan-teal
        if (b.id <= 2) {
          ctx.fillStyle = 'rgba(224, 242, 254, 0.6)';
        } else {
          ctx.fillStyle = 'rgba(207, 250, 254, 0.65)';
        }
        ctx.fillRect(cx - halfW, liqTop, bWidth, bBottom - liqTop);

        // Cloth cloth strip immersed in liquid (Step 3)
        if (st === 3) {
          const clothTop = liqTop + 14;
          const clothW = 32;
          const clothH = 38;
          ctx.fillStyle = '#ffffff';
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(cx - clothW / 2, clothTop, clothW, clothH, 2);
          ctx.fill();
          ctx.stroke();

          // Oil stain spot on cloth:
          // Bikar 1, 2, 4 -> clean, oil stain disappears!
          // Bikar 3 (Hard water + soap) -> stain remains dirty brownish-black!
          if (!b.isClean) {
            ctx.fillStyle = '#78350f';
            ctx.beginPath();
            ctx.ellipse(cx, clothTop + clothH / 2, 8, 6, 0.2, 0, Math.PI * 2);
            ctx.fill();

            // Scum flakes stuck onto cloth
            ctx.fillStyle = '#f8fafc';
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.arc(cx - 5, clothTop + clothH / 2 - 4, 3, 0, Math.PI * 2);
            ctx.arc(cx + 6, clothTop + clothH / 2 + 3, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          } else {
            // Clean cloth checkmark
            ctx.fillStyle = '#059669';
            ctx.font = '800 8.5px ui-sans-serif, system-ui, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('BERSIH ✨', cx, clothTop + clothH / 2 + 3);
          }
        }

        // Floating Scum (Kekat Putih) in Beaker 3
        if (b.hasScum) {
          // Curdled white scum layer floating at meniscus
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(cx - halfW, liqTop - 2, bWidth, 8);
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 0.8;
          for (let sx = cx - halfW; sx < cx + halfW; sx += 8) {
            ctx.beginPath();
            ctx.arc(sx + 4, liqTop + 5, 3.2, 0, Math.PI);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.stroke();
          }
          // Scum label
          ctx.fillStyle = '#b91c1c';
          ctx.font = '800 7px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Kekat (Scum)', cx, liqTop - 6);
        }

        // Foam / Lather Bubbles (Bikar 1, 2, 4 in Step 3)
        if (b.hasFoam) {
          const foamTop = liqTop - 18;
          for (let fb = 0; fb < 16; fb++) {
            const bx = cx - halfW + 6 + ((fb * 13) % (bWidth - 12));
            const by = foamTop + 4 + ((fb * 7) % 14);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          }
          ctx.fillStyle = '#0284c7';
          ctx.font = '800 7.5px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Buih Banyak 🫧', cx, foamTop - 3);
        }

        // Meniscus
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(cx - halfW, liqTop);
        ctx.lineTo(cx + halfW, liqTop);
        ctx.stroke();

        ctx.restore(); // end liquid clip

        // Glass Stirring Rod
        const stirOffset = washing ? Math.sin(t * 14 + b.id) * 5 : 0;
        const rodX = cx + 8;
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(rodX, bTop - 42 + stirOffset);
        ctx.lineTo(rodX - 4, bBottom - 8 + stirOffset);
        ctx.stroke();

        // Bottom Labels: Water & Agent
        ctx.fillStyle = '#0f172a';
        ctx.font = '800 8.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(b.water, cx, bBottom + 11);

        ctx.fillStyle = b.agent.includes('Sabun') ? '#ec4899' : '#2563eb';
        ctx.font = '800 8.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(b.agent, cx, bBottom + 21);

        // Status pill below
        const statusText =
          st < 3
            ? 'Sedia'
            : b.id === 3
            ? '❌ Kekat & Kotor'
            : '✓ Bersih & Berbuih';
        ctx.fillStyle =
          st < 3
            ? '#64748b'
            : b.id === 3
            ? '#b91c1c'
            : '#047857';
        ctx.font = '800 7.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(statusText, cx, bBottom + 32);

        ctx.restore(); // end beaker save
      });

      // Bottom instruction note
      ctx.fillStyle = '#64748b';
      ctx.font = '600 8px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        '*Klik mana-mana bikar untuk memerhati interaksi ion dan pembentukan kekat pada kanta pembesar kanan.',
        cssW / 2,
        cssH - 5
      );

      ctx.restore();
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = ((e.clientX - rect.left) / rect.width) * 560;
          if (clickX < 140) onSelectBeaker(1);
          else if (clickX < 264) onSelectBeaker(2);
          else if (clickX < 388) onSelectBeaker(3);
          else onSelectBeaker(4);
        }}
        className="w-full max-w-[560px] aspect-[560/290] mx-auto block rounded-xl border border-slate-200 bg-white shadow-inner cursor-pointer"
      />
    </div>
  );
};

// ============================================================
// CANVAS 2: KANTA PEMBESAR SUBMIKROSKOPIK (KEKAT vs GARAM LARUT)
// ============================================================
interface HardWaterSubmicroscopicCanvasProps {
  selectedBeaker: BeakerId;
  hardWater: HardWaterType;
  step: StepNum;
}

export const HardWaterSubmicroscopicCanvas: React.FC<
  HardWaterSubmicroscopicCanvasProps
> = ({ selectedBeaker, hardWater, step }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ selectedBeaker, hardWater, step });
  stateRef.current = { selectedBeaker, hardWater, step };

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
      const cssW = 320;
      const cssH = 290;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      const { selectedBeaker: sel, hardWater: hw, step: st } = stateRef.current;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, cssW, cssH);

      const cx = 160;
      const cy = 138;
      const r = 94;

      // Circular magnifier viewport
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.clip();

      const ionLabel = hw === 'mgso4' ? 'Mg²⁺' : 'Ca²⁺';

      // ========================================================
      // CASE 1: BIKAR 3 (AIR LIAT + SABUN) -> PEMBENTUKAN KEKAT
      // ========================================================
      if (sel === 3) {
        // Scum precipitate clump in center: (RCOO)2Ca or (RCOO)2Mg
        const scumCx = cx;
        const scumCy = cy + 4;

        // Solid white precipitate amorphous clump
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(scumCx, scumCy, 46, 26, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // 2 Soap anions bonded to 1 Ca2+/Mg2+
        // Central Ca2+ ion
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.arc(scumCx, scumCy, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '800 7.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ionLabel, scumCx, scumCy);

        // Bonded carboxylate heads (-COO-)
        [-32, 32].forEach((dx) => {
          ctx.fillStyle = '#ec4899';
          ctx.beginPath();
          ctx.arc(scumCx + dx, scumCy, 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '800 6.5px ui-sans-serif, system-ui, sans-serif';
          ctx.fillText('−COO⁻', scumCx + dx, scumCy);

          // Tails extending outwards
          ctx.strokeStyle = '#d97706';
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.moveTo(scumCx + dx + (dx > 0 ? 10 : -10), scumCy);
          ctx.lineTo(scumCx + dx + (dx > 0 ? 28 : -28), scumCy + (dx > 0 ? 12 : -12));
          ctx.stroke();
        });

        // Banner text: Kekat (Pepejal Tidak Larut)
        ctx.fillStyle = '#b91c1c';
        ctx.font = '800 8.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Kekat Putih: (RCOO)₂${ionLabel.replace('²⁺', '')}(p)`, cx, cy + 62);
        ctx.font = '700 7.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Tidak larut & membazirkan sabun', cx, cy + 74);
      }

      // ========================================================
      // CASE 2: BIKAR 4 (AIR LIAT + DETERGEN) -> GARAM LARUT
      // ========================================================
      else if (sel === 4) {
        // Detergent anions (ROSO3-) remain soluble with Ca2+ / Mg2+
        // Oil droplet in center being emulsified into a micelle!
        const oilX = cx;
        const oilY = cy;

        // Oil / Grease drop in center
        ctx.fillStyle = '#d97706';
        ctx.beginPath();
        ctx.arc(oilX, oilY, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '800 7px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('GRIS', oilX, oilY);

        // Detergent molecules surrounding oil droplet (Micelle)
        for (let i = 0; i < 8; i++) {
          const ang = (i * Math.PI) / 4;
          const headX = oilX + Math.cos(ang) * 44;
          const headY = oilY + Math.sin(ang) * 44;
          const tailX = oilX + Math.cos(ang) * 20;
          const tailY = oilY + Math.sin(ang) * 20;

          // Hydrophobic tail dissolving in oil
          ctx.strokeStyle = '#b45309';
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(headX, headY);
          ctx.stroke();

          // Sulfonate / sulfate head -SO3-
          ctx.fillStyle = '#2563eb';
          ctx.beginPath();
          ctx.arc(headX, headY, 6.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Floating Ca2+ / Mg2+ ions remain soluble in water!
        [
          { x: cx - 56, y: cy - 54 },
          { x: cx + 56, y: cy + 54 },
        ].forEach((pos) => {
          ctx.fillStyle = '#7c3aed';
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 9, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '800 6.5px ui-sans-serif, system-ui, sans-serif';
          ctx.fillText(ionLabel, pos.x, pos.y);
        });

        ctx.fillStyle = '#059669';
        ctx.font = '800 8.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Garam Kalsium Detergen Larut!', cx, cy + 62);
        ctx.font = '700 7.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Misel terbentuk & menanggalkan gris', cx, cy + 74);
      }

      // ========================================================
      // CASE 3: BIKAR 1 & 2 (AIR SULING) -> MISIL BERSIH
      // ========================================================
      else {
        // Clean soft water (No Ca2+ or Mg2+ ions)
        const oilX = cx;
        const oilY = cy;

        // Grease droplet lifted by micelle
        ctx.fillStyle = '#d97706';
        ctx.beginPath();
        ctx.arc(oilX, oilY, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '800 7px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('GRIS', oilX, oilY);

        for (let i = 0; i < 8; i++) {
          const ang = (i * Math.PI) / 4;
          const headX = oilX + Math.cos(ang) * 44;
          const headY = oilY + Math.sin(ang) * 44;
          const tailX = oilX + Math.cos(ang) * 20;
          const tailY = oilY + Math.sin(ang) * 20;

          ctx.strokeStyle = '#b45309';
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(headX, headY);
          ctx.stroke();

          ctx.fillStyle = sel === 1 ? '#ec4899' : '#2563eb';
          ctx.beginPath();
          ctx.arc(headX, headY, 6.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = '#0284c7';
        ctx.font = '800 8.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Tiada Ion Ca²⁺ / Mg²⁺ (Air Lembut)', cx, cy + 62);
        ctx.font = '700 7.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Tindakan pembersihan berkesan 100%', cx, cy + 74);
      }

      ctx.restore(); // end circle clip

      // Magnifier Outer Rim
      ctx.strokeStyle = sel === 3 ? '#dc2626' : sel === 4 ? '#059669' : '#0284c7';
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      // Top title
      ctx.fillStyle = '#0f172a';
      ctx.font = '800 11px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        sel === 3
          ? 'Kekat (Garam Tak Larut)'
          : sel === 4
          ? 'Garam Kalsium Larut'
          : 'Pembentukan Misel (Air Lembut)',
        cx,
        22
      );

      ctx.restore();
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full max-w-[320px] aspect-[320/290] mx-auto block rounded-xl border border-slate-200 bg-slate-50 shadow-inner"
    />
  );
};

// ============================================================
// MAIN COMPONENT: SIMULASI TINDAKAN PENCUCIAN AIR LIAT
// ============================================================
export const HardWaterCleaningLab: React.FC = () => {
  const [step, setStep] = useState<StepNum>(1);
  const [hardWater, setHardWater] = useState<HardWaterType>('cacl2');
  const [selectedBeaker, setSelectedBeaker] = useState<BeakerId>(3);
  const [isWashing, setIsWashing] = useState<boolean>(false);
  const [washProgress, setWashProgress] = useState<number>(0);
  const [poeMode, setPoeMode] = useState<boolean>(false);

  // POE Prediction State
  const [predictions, setPredictions] = useState<{
    scumBeaker: BeakerId | null;
    cleansInHardWater: 'soap' | 'detergent' | null;
  }>({
    scumBeaker: null,
    cleansInHardWater: null,
  });

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
      analytics.recordSimulationClick(SIM_ID, 2);
    } else if (step === 2) {
      setStep(3);
      setIsWashing(true);
      analytics.recordSimulationClick(SIM_ID, 3);
      analytics.recordSimulationCompleted(SIM_ID);

      const start = performance.now();
      const duration = 2400;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        setWashProgress(p);
        if (p < 1) {
          requestAnimationFrame(tick);
        } else {
          setIsWashing(false);
          confetti({ particleCount: 60, spread: 60 });
        }
      };
      requestAnimationFrame(tick);
    }
  };

  const handleReset = () => {
    setStep(1);
    setIsWashing(false);
    setWashProgress(0);
    setSelectedBeaker(3);
  };

  return (
    <div className="space-y-3 font-sans text-slate-900">
      {/* 1. BAR KAWALAN PROSEDUR & PILIHAN AIR LIAT */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Step Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setStep(1)}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition cursor-pointer flex items-center gap-1.5 ${
              step === 1
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>Langkah 1: Tuang Air</span>
          </button>
          <button
            onClick={() => setStep(2)}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition cursor-pointer flex items-center gap-1.5 ${
              step === 2
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>Langkah 2: Tambah Sabun & Detergen</span>
          </button>
          <button
            onClick={() => {
              if (step < 3) handleNextStep();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition cursor-pointer flex items-center gap-1.5 ${
              step === 3
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Waves className="w-3.5 h-3.5" />
            <span>Langkah 3: Rendam Kain & Kacau</span>
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold cursor-pointer transition flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Set Semula</span>
          </button>
        </div>

        {/* Hard Water Type Selector & POE Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs">
            <span className="text-[10px] font-bold text-slate-500 px-1">Air Liat:</span>
            <button
              onClick={() => setHardWater('cacl2')}
              className={`px-2 py-1 rounded-lg text-[10.5px] font-extrabold transition cursor-pointer ${
                hardWater === 'cacl2'
                  ? 'bg-slate-900 text-white'
                  : 'bg-transparent text-slate-700 hover:bg-slate-200'
              }`}
            >
              CaCl₂ (Ca²⁺)
            </button>
            <button
              onClick={() => setHardWater('mgso4')}
              className={`px-2 py-1 rounded-lg text-[10.5px] font-extrabold transition cursor-pointer ${
                hardWater === 'mgso4'
                  ? 'bg-slate-900 text-white'
                  : 'bg-transparent text-slate-700 hover:bg-slate-200'
              }`}
            >
              MgSO₄ (Mg²⁺)
            </button>
            <button
              onClick={() => setHardWater('seawater')}
              className={`px-2 py-1 rounded-lg text-[10.5px] font-extrabold transition cursor-pointer ${
                hardWater === 'seawater'
                  ? 'bg-slate-900 text-white'
                  : 'bg-transparent text-slate-700 hover:bg-slate-200'
              }`}
            >
              Air Laut
            </button>
          </div>

          <button
            onClick={() => setPoeMode(!poeMode)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-extrabold border transition cursor-pointer flex items-center gap-1 ${
              poeMode
                ? 'bg-amber-100 border-amber-400 text-amber-900'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Mod POE</span>
          </button>
        </div>
      </div>

      {/* MOD KUIZ POE (JIKA AKTIF) */}
      {poeMode && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 shadow-sm space-y-2">
          <div className="text-xs font-extrabold text-amber-900 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Kuiz Ramalan-Pemerhatian-Penerangan (POE): Buat ramalan anda</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div className="bg-white p-2.5 rounded-xl border border-amber-200 space-y-1.5">
              <div className="font-extrabold text-slate-800">
                1. Bikar manakah yang akan membentuk mendakan putih (kekat / scum)?
              </div>
              <div className="grid grid-cols-4 gap-1">
                {[1, 2, 3, 4].map((id) => {
                  const isChosen = predictions.scumBeaker === id;
                  const isCorrect = id === 3;
                  return (
                    <button
                      key={id}
                      onClick={() =>
                        setPredictions((p) => ({ ...p, scumBeaker: id as BeakerId }))
                      }
                      className={`py-1 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${
                        isChosen
                          ? isCorrect
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-rose-600 text-white border-rose-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Bikar {id}
                      {predictions.scumBeaker !== null && isChosen
                        ? isCorrect
                          ? ' (Betul)'
                          : ' (Salah)'
                        : ''}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-amber-200 space-y-1.5">
              <div className="font-extrabold text-slate-800">
                2. Agen pencuci manakah yang KEKAL BERKESAN menanggalkan minyak dalam air liat?
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() =>
                    setPredictions((p) => ({ ...p, cleansInHardWater: 'detergent' }))
                  }
                  className={`flex-1 py-1 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${
                    predictions.cleansInHardWater === 'detergent'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Detergen
                  {predictions.cleansInHardWater !== null &&
                    (predictions.cleansInHardWater === 'detergent'
                      ? ' (Betul)'
                      : '')}
                </button>
                <button
                  onClick={() =>
                    setPredictions((p) => ({ ...p, cleansInHardWater: 'soap' }))
                  }
                  className={`flex-1 py-1 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${
                    predictions.cleansInHardWater === 'soap'
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Sabun
                  {predictions.cleansInHardWater === 'soap' ? ' (Salah)' : ''}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. GRID UTAMA: KANVAS 4 BIKAR & KANTA PEMBESAR SUBMIKROSKOPIK */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.58fr_1fr] gap-2.5">
        {/* Kanvas 4 Bikar Perbandingan Serentak */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
              <Beaker className="w-4 h-4 text-blue-600" />
              <span>Susunan Radas: 4 Bikar Perbandingan Air Suling vs Air Liat</span>
            </span>

            <span className="text-[10.5px] font-bold text-slate-500">
              Fokus Kanta:{' '}
              <strong className="text-blue-700">
                Bikar {selectedBeaker} (
                {selectedBeaker === 1
                  ? 'Air Suling + Sabun'
                  : selectedBeaker === 2
                  ? 'Air Suling + Detergen'
                  : selectedBeaker === 3
                  ? 'Air Liat + Sabun'
                  : 'Air Liat + Detergen'}
                )
              </strong>
            </span>
          </div>

          <FourBeakersCanvas
            step={step}
            hardWater={hardWater}
            selectedBeaker={selectedBeaker}
            onSelectBeaker={setSelectedBeaker}
            isWashing={isWashing}
            washProgress={washProgress}
          />

          <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-200 leading-relaxed">
            <strong>Pemerhatian Utama:</strong>{' '}
            {step < 3
              ? 'Langkah semasa: Sila teruskan prosedur sehingga Langkah 3 untuk memerhati tindakan pencucian ke atas tompok gris.'
              : selectedBeaker === 3
              ? 'Bikar 3 (Air Liat + Sabun): Terbentuk mendakan putih (kekat) yang melekat pada kain. Tiada buih terbentuk dan tompok minyak gagal ditanggalkan.'
              : selectedBeaker === 4
              ? 'Bikar 4 (Air Liat + Detergen): Buih banyak tetap terbentuk, tiada kekat, dan tompok minyak berjaya ditanggalkan sepenuhnya.'
              : `Bikar ${selectedBeaker} (Air Suling): Buih banyak terbentuk, tiada kekat, dan tompok minyak ditanggalkan sepenuhnya.`}
          </div>
        </div>

        {/* Kanta Pembesar Submikroskopik (Kekat vs Garam Larut) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between space-y-2">
          <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Kanta Submikroskopik: Interaksi Ionik & Kekat</span>
          </div>

          <HardWaterSubmicroscopicCanvas
            selectedBeaker={selectedBeaker}
            hardWater={hardWater}
            step={step}
          />

          <div className="text-[10px] text-slate-700 bg-blue-50 p-2.5 rounded-xl border border-blue-200 leading-relaxed">
            {selectedBeaker === 3 && (
              <span>
                <strong>Bikar 3 (Kekat):</strong> Anion sabun (RCOO⁻) bergabung dengan ion Ca²⁺/Mg²⁺
                membentuk <strong>mendakan garam tidak larut (kekat)</strong>. Ini mengurangkan sabun
                bebas untuk memerangkap gris.
              </span>
            )}
            {selectedBeaker === 4 && (
              <span>
                <strong>Bikar 4 (Garam Larut):</strong> Anion detergen bertindak balas dengan ion
                Ca²⁺/Mg²⁺ membentuk <strong>garam yang larut dalam air</strong>. Oleh itu, detergen
                bebas membentuk misel dan menanggalkan gris.
              </span>
            )}
            {(selectedBeaker === 1 || selectedBeaker === 2) && (
              <span>
                <strong>Air Suling (Air Lembut):</strong> Ketiadaan ion Ca²⁺ dan Mg²⁺ membolehkan
                agen pencuci membentuk buih banyak dan misel sempurna bagi menanggalkan kotoran.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. BARIS BAWAH: JADUAL REKOD PEMERHATIAN & PERSAMAAN IONIK */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1.1fr] gap-2.5">
        {/* Jadual Rekod Pemerhatian 4 Bikar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm space-y-2">
          <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500">
            Jadual Rekod Pemerhatian Makmal (KSSM)
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px] border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 text-left">
                  <th className="p-1.5 font-extrabold">Bikar</th>
                  <th className="p-1.5 font-extrabold">Pembentukan Buih</th>
                  <th className="p-1.5 font-extrabold">Pembentukan Kekat</th>
                  <th className="p-1.5 font-extrabold">Keadaan Kain</th>
                  <th className="p-1.5 font-extrabold">Keberkesanan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className={selectedBeaker === 1 ? 'bg-sky-50 font-bold' : ''}>
                  <td className="p-1.5">1 (Air Suling + Sabun)</td>
                  <td className="p-1.5 text-blue-700 font-bold">Banyak buih</td>
                  <td className="p-1.5 text-slate-500">Tiada kekat</td>
                  <td className="p-1.5 text-emerald-700">Bersih (Tompok tanggal)</td>
                  <td className="p-1.5 text-emerald-700">Berkesan</td>
                </tr>
                <tr className={selectedBeaker === 2 ? 'bg-sky-50 font-bold' : ''}>
                  <td className="p-1.5">2 (Air Suling + Detergen)</td>
                  <td className="p-1.5 text-blue-700 font-bold">Banyak buih</td>
                  <td className="p-1.5 text-slate-500">Tiada kekat</td>
                  <td className="p-1.5 text-emerald-700">Bersih (Tompok tanggal)</td>
                  <td className="p-1.5 text-emerald-700">Berkesan</td>
                </tr>
                <tr className={selectedBeaker === 3 ? 'bg-rose-50 font-bold' : ''}>
                  <td className="p-1.5 text-rose-800">3 (Air Liat + Sabun)</td>
                  <td className="p-1.5 text-slate-500 font-bold">Tiada / Sedikit buih</td>
                  <td className="p-1.5 text-rose-700 font-bold">Ada kekat putih (scum)</td>
                  <td className="p-1.5 text-rose-700">Kotor (Tompok kekal)</td>
                  <td className="p-1.5 text-rose-700">Tidak Berkesan</td>
                </tr>
                <tr className={selectedBeaker === 4 ? 'bg-emerald-50 font-bold' : ''}>
                  <td className="p-1.5 text-emerald-800">4 (Air Liat + Detergen)</td>
                  <td className="p-1.5 text-blue-700 font-bold">Banyak buih</td>
                  <td className="p-1.5 text-slate-500">Tiada kekat</td>
                  <td className="p-1.5 text-emerald-700">Bersih (Tompok tanggal)</td>
                  <td className="p-1.5 text-emerald-700">Sangat Berkesan</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Persamaan Ionik Pembentukan Kekat & Kelebihan Detergen */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm space-y-2">
          <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500">
            Persamaan Ionik Pembentukan Kekat (KSSM SPM)
          </div>
          <div className="p-2 rounded-xl bg-slate-900 text-white font-mono text-[10px] space-y-1">
            <div>
              2RCOO⁻(ak) + <span className="text-red-400">Ca²⁺(ak)</span> →{' '}
              <span className="text-amber-300">(RCOO)₂Ca(p)</span> [Kekat kalsium]
            </div>
            <div>
              2RCOO⁻(ak) + <span className="text-red-400">Mg²⁺(ak)</span> →{' '}
              <span className="text-amber-300">(RCOO)₂Mg(p)</span> [Kekat magnesium]
            </div>
          </div>

          <div className="text-[10px] text-slate-700 bg-amber-50 p-2 rounded-xl border border-amber-200 leading-snug">
            <strong>Kelebihan Utama Detergen:</strong> Berkesan dalam air liat dan air berasid kerana
            membentuk garam kalsium / magnesium yang <em>larut dalam air</em>, tidak membazirkan agen
            pencuci dan tidak meninggalkan kesan kekat pada fabrik.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardWaterCleaningLab;
