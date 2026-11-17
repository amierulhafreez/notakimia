import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  Beaker,
  CheckCircle2,
  Clock,
  HelpCircle,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { analytics } from '../services/analytics';

type BeakerKey = 'A' | 'B' | 'C';

interface BeakerState {
  added: boolean; // whether chemical was added
  isStirring: boolean;
  stirProgress: number; // 0 to 1
}

interface POEPrediction {
  A: 'coagulate' | 'liquid' | null;
  B: 'coagulate' | 'liquid' | null;
  C: 'coagulate' | 'liquid' | null;
}

const SIM_ID = 'penggumpalan-lateks';

// ============================================================
// CANVAS: 3 BIKAR PERBANDINGAN SERENTAK
// ============================================================
interface ThreeBeakersCanvasProps {
  beakers: { A: BeakerState; B: BeakerState; C: BeakerState };
  timeHours: number;
  selectedBeaker: BeakerKey;
  onSelectBeaker: (b: BeakerKey) => void;
}

export const ThreeBeakersCanvas: React.FC<ThreeBeakersCanvasProps> = ({
  beakers,
  timeHours,
  selectedBeaker,
  onSelectBeaker,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ beakers, timeHours, selectedBeaker });
  stateRef.current = { beakers, timeHours, selectedBeaker };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const startMs = performance.now();

    // Pre-generate deterministic clot polygons & bacteria dots
    const bacteriaDots = Array.from({ length: 18 }, (_, idx) => ({
      rx: ((idx * 29) % 100) / 100 - 0.5,
      ry: ((idx * 47) % 100) / 100,
      phase: (idx * 0.4) % (Math.PI * 2),
    }));

    const render = (now: number) => {
      const t = (now - startMs) / 1000;
      const dpr = window.devicePixelRatio || 1;
      const cssW = 540;
      const cssH = 268;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      const { beakers: bk, timeHours: hrs, selectedBeaker: sel } = stateRef.current;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, cssW, cssH);

      // Bench
      const benchY = 222;
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(14, benchY, 512, 6);

      const beakerSpecs: {
        key: BeakerKey;
        cx: number;
        title: string;
        reagent: string;
        isCoagulated: boolean;
        coagProg: number;
      }[] = [
        {
          key: 'A',
          cx: 172,
          title: 'Bikar A',
          reagent: '+ Asid Etanoik (CH₃COOH)',
          isCoagulated: bk.A.added,
          coagProg: bk.A.added ? bk.A.stirProgress : 0,
        },
        {
          key: 'B',
          cx: 304,
          title: 'Bikar B',
          reagent: '+ Larutan Ammonia (NH₃)',
          isCoagulated: false,
          coagProg: 0,
        },
        {
          key: 'C',
          cx: 436,
          title: 'Bikar C (Kawalan)',
          reagent: 'Lateks Sahaja (Udara)',
          isCoagulated: hrs >= 24,
          coagProg: hrs < 24 ? 0 : Math.min(1, (hrs - 24) / 24),
        },
      ];

      // Textbook leader lines on left (Clear dedicated left margin, x = 12..110)
      const drawLeader = (
        targetX: number,
        targetY: number,
        textX: number,
        textY: number,
        label: string
      ) => {
        ctx.save();
        ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, textX, textY);
        const tw = ctx.measureText(label).width;

        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(textX + tw + 4, textY);
        ctx.lineTo(targetX, targetY);
        ctx.stroke();
        ctx.fillStyle = '#475569';
        ctx.beginPath();
        ctx.arc(targetX, targetY, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };

      drawLeader(172 + 8, 70, 14, 52, 'Rod kaca');
      drawLeader(172 - 37, 126, 14, 126, 'Bikar 100 cm³');
      drawLeader(172 - 37, 180, 14, 180, '20 cm³ Lateks');

      beakerSpecs.forEach((b) => {
        const cx = b.cx;
        const bTop = 106;
        const bBottom = benchY;
        const bWidth = 74;
        const halfW = bWidth / 2;
        const isSelected = sel === b.key;

        // Selection highlight glow
        if (isSelected) {
          ctx.save();
          ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(cx - halfW - 10, bTop - 26, bWidth + 20, bBottom - bTop + 54, 12);
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }

        // Clickable badge header
        ctx.fillStyle = isSelected ? '#047857' : '#0f172a';
        ctx.font = '800 11.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(b.title, cx, bTop - 12);

        // Glass Beaker body (100 cm³ beaker, 20 cm³ latex)
        ctx.save();
        ctx.fillStyle = 'rgba(241, 245, 249, 0.4)';
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        // Pouring spout left
        ctx.moveTo(cx - halfW - 6, bTop - 4);
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
        ctx.rect(cx - halfW + 2, bTop + 2, bWidth - 4, bBottom - bTop - 3);
        ctx.clip();

        const liqTop = bBottom - (bBottom - bTop) * 0.48; // 20 cm³ level

        if (b.isCoagulated && b.coagProg > 0.15) {
          // ==========================================
          // COAGULATED STATE: Lumpy rubber clot + clear serum
          // ==========================================
          // Clear yellow/transparent serum
          ctx.fillStyle = 'rgba(254, 240, 138, 0.35)';
          ctx.fillRect(cx - halfW, liqTop, bWidth, bBottom - liqTop);

          // Clotted white solid lumps in middle/bottom
          const clotProg = b.coagProg;
          const clotW = (halfW - 6) * clotProg;
          const clotH = 28 * clotProg;
          const clotCy = bBottom - 18;

          ctx.fillStyle = '#ffffff';
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.ellipse(cx, clotCy, clotW, clotH, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Elastic texture lumps
          ctx.fillStyle = '#f8fafc';
          ctx.beginPath();
          ctx.ellipse(cx - 10, clotCy - 4, clotW * 0.6, clotH * 0.5, -0.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.beginPath();
          ctx.ellipse(cx + 8, clotCy + 3, clotW * 0.5, clotH * 0.5, 0.3, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // In-beaker text
          ctx.fillStyle = '#0f172a';
          ctx.font = '800 8px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Gumpalan Getah', cx, clotCy - 1);
          ctx.fillStyle = '#854d0e';
          ctx.font = '700 7.5px ui-sans-serif, system-ui, sans-serif';
          ctx.fillText('Serum jernih', cx, liqTop + 9);
        } else {
          // ==========================================
          // LIQUID STATE: Smooth creamy milky white liquid
          // ==========================================
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(cx - halfW, liqTop, bWidth, bBottom - liqTop);

          // Subtle milky sheen
          ctx.fillStyle = '#f1f5f9';
          ctx.fillRect(cx - halfW, liqTop, bWidth, 4);

          // In-beaker text
          ctx.fillStyle = '#334155';
          ctx.font = '800 8.5px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Lateks Cecair', cx, liqTop + 24);
        }

        // Liquid meniscus
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(cx - halfW, liqTop);
        ctx.lineTo(cx + halfW, liqTop);
        ctx.stroke();

        ctx.restore(); // end liquid clip

        // Glass stirring rod (animates when stirring)
        const isStirring = bk[b.key].isStirring;
        const stirOffset = isStirring ? Math.sin(t * 14) * 6 : 0;
        const rodX = cx + 8;
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(rodX, bTop - 42 + stirOffset);
        ctx.lineTo(rodX - 4, bBottom - 8 + stirOffset);
        ctx.stroke();

        // Dropper pouring animation if stirring
        if (isStirring && bk[b.key].stirProgress < 0.45) {
          ctx.save();
          ctx.translate(cx - 24, bTop - 36);
          // Dropper glass
          ctx.fillStyle = '#f8fafc';
          ctx.strokeStyle = '#0f172a';
          ctx.lineWidth = 1.2;
          ctx.fillRect(0, 0, 7, 24);
          ctx.strokeRect(0, 0, 7, 24);
          // Dropper rubber teat
          ctx.fillStyle = b.key === 'A' ? '#dc2626' : '#2563eb';
          ctx.beginPath();
          ctx.arc(3.5, -4, 6, 0, Math.PI * 2);
          ctx.fill();
          // Falling drop
          ctx.fillStyle = b.key === 'A' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(59, 130, 246, 0.8)';
          ctx.beginPath();
          ctx.arc(3.5, 30 + (t * 60) % 18, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Bacteria entering Bikar C over time (24h - 48h)
        if (b.key === 'C' && hrs >= 6) {
          const actCount = Math.min(bacteriaDots.length, Math.floor((hrs / 48) * bacteriaDots.length));
          bacteriaDots.slice(0, actCount).forEach((bDot) => {
            const bx = cx + bDot.rx * (bWidth - 16);
            const by = bTop - 18 + bDot.ry * 28 + Math.sin(t * 2 + bDot.phase) * 3;
            ctx.fillStyle = '#7c3aed';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.ellipse(bx, by, 3, 1.8, 0.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          });
          if (hrs >= 12 && hrs < 24) {
            ctx.fillStyle = '#6d28d9';
            ctx.font = '800 7.5px ui-sans-serif, system-ui, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Bakteria udara', cx, bTop - 24);
          }
        }

        // Reagent label below beaker (clearly in bottom space)
        ctx.fillStyle = '#0f172a';
        ctx.font = '700 8.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(b.reagent, cx, bBottom + 16);

        ctx.restore();
      });

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
          const clickX = ((e.clientX - rect.left) / rect.width) * 540;
          if (clickX < 238) onSelectBeaker('A');
          else if (clickX < 370) onSelectBeaker('B');
          else onSelectBeaker('C');
        }}
        className="w-full max-w-[540px] aspect-[540/268] mx-auto block rounded-xl border border-slate-200 bg-white cursor-pointer shadow-inner"
      />
      <div className="text-[10px] text-center text-slate-500 mt-1">
        *Klik pada mana-mana bikar untuk memaparkan mekanisme zarah submikroskopik di panel kanan.
      </div>
    </div>
  );
};

// ============================================================
// CANVAS: KANTA PEMBESAR MEMBRAN ZARAH GETAH (SUBMIKROSKOPIK)
// ============================================================
interface RubberParticleCanvasProps {
  selectedBeaker: BeakerKey;
  beakers: { A: BeakerState; B: BeakerState; C: BeakerState };
  timeHours: number;
}

export const RubberParticleCanvas: React.FC<RubberParticleCanvasProps> = ({
  selectedBeaker,
  beakers,
  timeHours,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ selectedBeaker, beakers, timeHours });
  stateRef.current = { selectedBeaker, beakers, timeHours };

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
      const cssH = 260;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      const { selectedBeaker: sel, beakers: bk, timeHours: hrs } = stateRef.current;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, cssW, cssH);

      const cx = 160;
      const cy = 114;
      const r = 90;

      // Circular magnifier viewport
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.clip();

      const isCoagulated =
        (sel === 'A' && bk.A.added) || (sel === 'C' && hrs >= 24);

      if (isCoagulated) {
        // ========================================================
        // MECHANISM 2: Coagulated (Membrane ruptured, polymers entangle)
        // ========================================================
        // Broken membrane fragments
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(cx - 36, cy - 8, 26, 0.4, 2.8);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx + 36, cy - 8, 26, 3.4, 5.8);
        ctx.stroke();
        ctx.setLineDash([]);

        // Entangled polyisoprene polymer chains (black squiggly lines)
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(cx - 48, cy - 24);
        ctx.bezierCurveTo(cx - 20, cy + 18, cx + 10, cy - 36, cx + 46, cy + 12);
        ctx.bezierCurveTo(cx + 20, cy + 34, cx - 18, cy + 28, cx - 36, cy + 10);
        ctx.stroke();

        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx - 38, cy + 26);
        ctx.bezierCurveTo(cx - 8, cy - 14, cx + 18, cy + 32, cx + 42, cy - 18);
        ctx.stroke();

        // Neutralised H+ ions attached
        [-28, 0, 28].forEach((xOff, idx) => {
          const px = cx + xOff;
          const py = cy + (idx % 2 === 0 ? -18 : 22);
          ctx.fillStyle = '#dc2626';
          ctx.beginPath();
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '800 6.5px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('H⁺', px, py);
        });

        // Banner text inside circle
        ctx.fillStyle = '#dc2626';
        ctx.font = '800 8.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Membran pecah, polimer getah berbelit', cx, cy + 68);
      } else if (sel === 'B') {
        // ========================================================
        // MECHANISM 3: Bikar B with Ammonia (OH- neutralises H+, keeps negative charge)
        // ========================================================
        const separation = 40 + Math.sin(t * 3) * 5;
        const leftX = cx - separation;
        const rightX = cx + separation;

        const drawRubberParticle = (px: number, py: number) => {
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.arc(px, py, 24, 0, Math.PI * 2);
          ctx.stroke();

          // Polyisoprene chain inside
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(px - 12, py - 6);
          ctx.quadraticCurveTo(px, py - 16, px + 10, py - 4);
          ctx.quadraticCurveTo(px + 3, py + 12, px - 8, py + 9);
          ctx.stroke();

          // Negative charge marks "-"
          ctx.fillStyle = '#059669';
          ctx.font = '800 11px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          [-18, 0, 18].forEach((angDeg) => {
            const rad = (angDeg * Math.PI) / 180;
            ctx.fillText('−', px + Math.cos(rad) * 29, py + Math.sin(rad) * 29);
            ctx.fillText('−', px - Math.cos(rad) * 29, py - Math.sin(rad) * 29);
          });
        };

        drawRubberParticle(leftX, cy - 4);
        drawRubberParticle(rightX, cy - 4);

        // Repulsion force arrows
        ctx.strokeStyle = '#059669';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(cx - 8, cy - 4);
        ctx.lineTo(cx - 20, cy - 4);
        ctx.moveTo(cx + 8, cy - 4);
        ctx.lineTo(cx + 20, cy - 4);
        ctx.stroke();

        // Floating OH- ions
        [
          { x: cx, y: cy - 48 },
          { x: cx - 48, y: cy + 42 },
          { x: cx + 48, y: cy + 42 },
        ].forEach((pos) => {
          ctx.fillStyle = '#2563eb';
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '800 7px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('OH⁻', pos.x, pos.y);
        });

        ctx.fillStyle = '#059669';
        ctx.font = '800 8.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Cas negatif kekal (Saling menolak)', cx, cy + 68);
      } else {
        // ========================================================
        // MECHANISM 1: Fresh liquid latex (Uncoagulated)
        // ========================================================
        const leftX = cx - 36 + Math.sin(t * 1.8) * 3;
        const rightX = cx + 36 - Math.sin(t * 1.8) * 3;

        const drawRubberParticle = (px: number, py: number) => {
          ctx.strokeStyle = '#0284c7';
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.arc(px, py, 24, 0, Math.PI * 2);
          ctx.stroke();

          // Polyisoprene chain inside
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(px - 12, py - 6);
          ctx.quadraticCurveTo(px, py - 16, px + 10, py - 4);
          ctx.quadraticCurveTo(px + 3, py + 12, px - 8, py + 9);
          ctx.stroke();

          // Negative charge marks "-"
          ctx.fillStyle = '#0284c7';
          ctx.font = '800 11px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          [-18, 0, 18].forEach((angDeg) => {
            const rad = (angDeg * Math.PI) / 180;
            ctx.fillText('−', px + Math.cos(rad) * 29, py + Math.sin(rad) * 29);
            ctx.fillText('−', px - Math.cos(rad) * 29, py - Math.sin(rad) * 29);
          });
        };

        drawRubberParticle(leftX, cy - 4);
        drawRubberParticle(rightX, cy - 4);

        // Repulsion arrows
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx - 8, cy - 4);
        ctx.lineTo(cx - 20, cy - 4);
        ctx.moveTo(cx + 8, cy - 4);
        ctx.lineTo(cx + 20, cy - 4);
        ctx.stroke();

        ctx.fillStyle = '#0369a1';
        ctx.font = '800 8.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Membran protein bercas negatif', cx, cy + 62);
        ctx.font = '700 8px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('(Zarah getah saling menolak)', cx, cy + 74);
      }

      ctx.restore(); // end circle clip

      // Outer Magnifier Rim
      ctx.strokeStyle = isCoagulated ? '#dc2626' : sel === 'B' ? '#10b981' : '#0284c7';
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      // Outer leader labels (drawn outside circle clip so text is completely crisp)
      if (!isCoagulated && sel !== 'B') {
        const drawOuterLeader = (
          targetX: number,
          targetY: number,
          textX: number,
          textY: number,
          label: string
        ) => {
          ctx.save();
          ctx.font = '800 8.5px ui-sans-serif, system-ui, sans-serif';
          ctx.fillStyle = '#0f172a';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillText(label, textX, textY);
          const tw = ctx.measureText(label).width;

          ctx.strokeStyle = '#64748b';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(textX + tw + 3, textY);
          ctx.lineTo(targetX, targetY);
          ctx.stroke();
          ctx.fillStyle = '#334155';
          ctx.beginPath();
          ctx.arc(targetX, targetY, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        };

        drawOuterLeader(cx - 56, cy - 14, 10, cy - 54, 'Membran protein (−)');
        drawOuterLeader(cx - 38, cy - 4, 10, cy + 50, 'Polimer getah');
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
      className="w-full max-w-[320px] aspect-[320/260] mx-auto block rounded-xl border border-slate-200 bg-slate-50"
    />
  );
};

// ============================================================
// MAIN EXPERIMENT COMPONENT
// ============================================================
export const LatexCoagulationLab: React.FC = () => {
  const [beakers, setBeakers] = useState<{
    A: BeakerState;
    B: BeakerState;
    C: BeakerState;
  }>({
    A: { added: false, isStirring: false, stirProgress: 0 },
    B: { added: false, isStirring: false, stirProgress: 0 },
    C: { added: false, isStirring: false, stirProgress: 0 },
  });

  const [timeHours, setTimeHours] = useState<number>(0);
  const [selectedBeaker, setSelectedBeaker] = useState<BeakerKey>('A');
  const [poeMode, setPoeMode] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<POEPrediction>({
    A: null,
    B: null,
    C: null,
  });

  // Action: Add Acid to Beaker A
  const handleAddAcid = () => {
    setBeakers((prev) => ({
      ...prev,
      A: { added: true, isStirring: true, stirProgress: 0 },
    }));
    analytics.recordSimulationClick(SIM_ID, 1);

    const start = performance.now();
    const duration = 1800;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setBeakers((prev) => ({
        ...prev,
        A: { ...prev.A, stirProgress: p },
      }));
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        setBeakers((prev) => ({
          ...prev,
          A: { ...prev.A, isStirring: false, stirProgress: 1 },
        }));
        analytics.recordSimulationCompleted(SIM_ID);
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }
    };
    requestAnimationFrame(tick);
  };

  // Action: Add Ammonia to Beaker B
  const handleAddAmmonia = () => {
    setBeakers((prev) => ({
      ...prev,
      B: { added: true, isStirring: true, stirProgress: 0 },
    }));
    analytics.recordSimulationClick(SIM_ID, 1);

    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setBeakers((prev) => ({
        ...prev,
        B: { ...prev.B, stirProgress: p },
      }));
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        setBeakers((prev) => ({
          ...prev,
          B: { ...prev.B, isStirring: false, stirProgress: 1 },
        }));
        analytics.recordSimulationCompleted(SIM_ID);
      }
    };
    requestAnimationFrame(tick);
  };

  // Action: Run All Beakers Simultaneously
  const handleRunAll = () => {
    handleAddAcid();
    handleAddAmmonia();
    setTimeHours(36); // advance time to show bacteria coagulating C
  };

  // Reset
  const handleReset = () => {
    setBeakers({
      A: { added: false, isStirring: false, stirProgress: 0 },
      B: { added: false, isStirring: false, stirProgress: 0 },
      C: { added: false, isStirring: false, stirProgress: 0 },
    });
    setTimeHours(0);
  };

  // Highlight step in 4-step explanation depending on current state
  const activeStep = (() => {
    if (selectedBeaker === 'A' && beakers.A.added) return 4;
    if (selectedBeaker === 'C' && timeHours >= 24) return 4;
    if (selectedBeaker === 'B') return 2;
    return 1;
  })();

  return (
    <div className="space-y-3 font-sans text-slate-900">
      {/* BAR ATAS: KAWALAN UTAMA & PELUNCUR MASA */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Butang Tindakan Bahan */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleAddAcid}
            className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold shadow-sm cursor-pointer transition flex items-center gap-1.5"
          >
            <Beaker className="w-3.5 h-3.5" />
            <span>Bikar A: + Asid Etanoik</span>
          </button>
          <button
            onClick={handleAddAmmonia}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold shadow-sm cursor-pointer transition flex items-center gap-1.5"
          >
            <Beaker className="w-3.5 h-3.5" />
            <span>Bikar B: + Larutan NH₃</span>
          </button>
          <button
            onClick={handleRunAll}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-sm cursor-pointer transition flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Jalankan Semua Serentak</span>
          </button>
          <button
            onClick={handleReset}
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold cursor-pointer transition flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Set Semula</span>
          </button>
        </div>

        {/* Peluncur Masa & Togol POE */}
        <div className="flex items-center gap-3">
          {/* Peluncur Masa (0 - 48 jam) */}
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[11px] font-bold text-slate-700 whitespace-nowrap">
              Masa Pendedahan:
            </span>
            <input
              type="range"
              min={0}
              max={48}
              step={1}
              value={timeHours}
              onChange={(e) => setTimeHours(Number(e.target.value))}
              className="w-24 accent-emerald-600 cursor-pointer"
            />
            <span className="text-[11px] font-extrabold text-emerald-700 min-w-[36px]">
              {timeHours} jam
            </span>
          </div>

          {/* Togol Kuiz POE */}
          <button
            onClick={() => setPoeMode(!poeMode)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-extrabold border transition cursor-pointer flex items-center gap-1 ${
              poeMode
                ? 'bg-amber-100 border-amber-400 text-amber-900'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Mod POE (Ramalan)</span>
          </button>
        </div>
      </div>

      {/* MOD KUIZ RAMALAN POE (JIKA DIAKTIFKAN) */}
      {poeMode && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 shadow-sm space-y-2">
          <div className="text-xs font-extrabold text-amber-900 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Kuiz Ramalan-Pemerhatian-Penerangan (POE): Ramalkan keadaan akhir setiap bikar</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
            {(['A', 'B', 'C'] as BeakerKey[]).map((key) => {
              const title =
                key === 'A'
                  ? 'Bikar A (+ CH₃COOH)'
                  : key === 'B'
                  ? 'Bikar B (+ NH₃)'
                  : 'Bikar C (Lateks terdedah 48j)';
              const pred = predictions[key];
              const actual =
                key === 'A'
                  ? beakers.A.added
                    ? 'coagulate'
                    : null
                  : key === 'B'
                  ? beakers.B.added
                    ? 'liquid'
                    : null
                  : timeHours >= 24
                  ? 'coagulate'
                  : 'liquid';
              const isCorrect = pred !== null && actual !== null && pred === actual;

              return (
                <div key={key} className="bg-white p-2.5 rounded-xl border border-amber-200 space-y-1.5">
                  <div className="font-extrabold text-slate-800">{title}</div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setPredictions((p) => ({ ...p, [key]: 'coagulate' }))}
                      className={`flex-1 py-1 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${
                        pred === 'coagulate'
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      Menggumpal
                    </button>
                    <button
                      onClick={() => setPredictions((p) => ({ ...p, [key]: 'liquid' }))}
                      className={`flex-1 py-1 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${
                        pred === 'liquid'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      Kekal Cecair
                    </button>
                  </div>
                  {pred && actual && (
                    <div
                      className={`text-[10px] font-extrabold flex items-center gap-1 ${
                        isCorrect ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Tahniah! Ramalan tepat.</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3 h-3" />
                          <span>Ramalan kurang tepat. Perhatikan penerangan di bawah.</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* GRID UTAMA: KANVAS 3 BIKAR & KANTA PEMBESAR SUBMIKROSKOPIK */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-2.5">
        {/* Kanvas 3 Bikar Perbandingan Serentak */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
              <Beaker className="w-4 h-4 text-emerald-600" />
              <span>Susunan Radas Makmal Maya: 3 Bikar Penggumpalan Lateks</span>
            </span>
            <span className="text-[10.5px] font-bold text-slate-500">
              Fokus Semasa:{' '}
              <strong className="text-emerald-700">
                {selectedBeaker === 'A'
                  ? 'Bikar A (+ Asid)'
                  : selectedBeaker === 'B'
                  ? 'Bikar B (+ Ammonia)'
                  : 'Bikar C (Kawalan)'}
              </strong>
            </span>
          </div>

          <ThreeBeakersCanvas
            beakers={beakers}
            timeHours={timeHours}
            selectedBeaker={selectedBeaker}
            onSelectBeaker={setSelectedBeaker}
          />

          <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-200 leading-relaxed">
            <strong>Pemerhatian Ringkas:</strong>{' '}
            {selectedBeaker === 'A'
              ? beakers.A.added
                ? 'Lateks menggumpal serta-merta membentuk ketulan pepejal getah kenyal dan terpisah daripada cecair serum jernih.'
                : 'Klik "Bikar A: + Asid Etanoik" untuk melihat penggumpalan serta-merta.'
              : selectedBeaker === 'B'
              ? beakers.B.added
                ? 'Lateks kekal dalam keadaan cecair putih susu sekata. Tiada gumpalan terbentuk walaupun dibiarkan 48 jam.'
                : 'Klik "Bikar B: + Larutan NH₃" untuk menguji pencegah penggumpalan.'
              : timeHours >= 24
              ? `Pada ${timeHours} jam, tindakan bakteria udara menghasilkan asid laktik yang menyebabkan lateks menggumpal secara perlahan.`
              : `Pada ${timeHours} jam, lateks masih dalam fasa cecair. Geser peluncur masa ke 24–48 jam untuk melihat tindakan bakteria udara.`}
          </div>
        </div>

        {/* Kanta Pembesar Submikroskopik Membran Zarah Getah */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between space-y-2">
          <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Kanta Pembesar Submikroskopik: Membran Protein Zarah Getah</span>
          </div>

          <RubberParticleCanvas
            selectedBeaker={selectedBeaker}
            beakers={beakers}
            timeHours={timeHours}
          />

          <div className="text-[10.5px] text-slate-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 leading-relaxed">
            {selectedBeaker === 'A' && beakers.A.added && (
              <span>
                <strong>Bikar A (Asid):</strong> Ion <strong>H⁺</strong> daripada asid meneutralkan cas
                negatif pada membran protein. Zarah berlanggar, membran pecah, dan rantai polimer
                getah berbelit lalu menggumpal.
              </span>
            )}
            {selectedBeaker === 'B' && (
              <span>
                <strong>Bikar B (Ammonia):</strong> Ion <strong>OH⁻</strong> daripada ammonia meneutralkan
                sebarang asid yang terhasil. Membran kekal <strong>bercas negatif (−)</strong>, zarah terus
                saling menolak, dan lateks kekal cair.
              </span>
            )}
            {selectedBeaker === 'C' && timeHours >= 24 && (
              <span>
                <strong>Bikar C (Bakteria Udara):</strong> Bakteria bertindak ke atas protein menghasilkan{' '}
                <strong>asid laktik (ion H⁺)</strong> secara perlahan, meneutralkan cas membran dan mencetuskan
                penggumpalan perlahan.
              </span>
            )}
            {((selectedBeaker === 'A' && !beakers.A.added) ||
              (selectedBeaker === 'C' && timeHours < 24)) && (
              <span>
                <strong>Lateks Segar Asal:</strong> Zarah-zarah getah diselaputi membran protein{' '}
                <strong>bercas negatif (−)</strong>. Cas yang sama menyebabkan zarah-zarah saling menolak
                dan lateks kekal cair.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* BARIS BAWAH: JADUAL PERBANDINGAN & 4 LANGKAH PENERANGAN STANDARD SPM */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.3fr] gap-2.5">
        {/* Jadual Perbandingan 3 Bikar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm space-y-2">
          <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500">
            Jadual Rekod Pemerhatian & Inferens (KSSM)
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px] border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 text-left">
                  <th className="p-1.5 font-extrabold">Bikar</th>
                  <th className="p-1.5 font-extrabold">Bahan Ditambah</th>
                  <th className="p-1.5 font-extrabold">Pemerhatian Makroskopik</th>
                  <th className="p-1.5 font-extrabold">Inferens</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className={selectedBeaker === 'A' ? 'bg-rose-50/60 font-medium' : ''}>
                  <td className="p-1.5 font-bold">A</td>
                  <td className="p-1.5 text-rose-700 font-bold">Asid etanoik, CH₃COOH</td>
                  <td className="p-1.5 font-bold">Menggumpal serta-merta</td>
                  <td className="p-1.5">Ion H⁺ meneutralkan cas negatif membran protein</td>
                </tr>
                <tr className={selectedBeaker === 'B' ? 'bg-blue-50/60 font-medium' : ''}>
                  <td className="p-1.5 font-bold">B</td>
                  <td className="p-1.5 text-blue-700 font-bold">Larutan ammonia, NH₃</td>
                  <td className="p-1.5 font-bold text-emerald-700">Kekal cecair putih susu</td>
                  <td className="p-1.5">Ion OH⁻ mengekalkan cas negatif pada membran</td>
                </tr>
                <tr className={selectedBeaker === 'C' ? 'bg-amber-50/60 font-medium' : ''}>
                  <td className="p-1.5 font-bold">C</td>
                  <td className="p-1.5 text-slate-600 font-bold">Tiada (terdedah udara)</td>
                  <td className="p-1.5 font-bold">
                    {timeHours >= 24 ? 'Menggumpal perlahan (>24j)' : 'Kekal cecair (awal)'}
                  </td>
                  <td className="p-1.5">Bakteria menghasilkan asid laktik secara perlahan</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Kad 4 Langkah Penerangan Standard SPM (4 Markah) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm space-y-2">
          <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center justify-between">
            <span>4 Langkah Penerangan Standard SPM (Skema Penuh 4 Markah)</span>
            <span className="text-[9.5px] text-emerald-700 font-bold">
              Langkah Aktif: {activeStep} / 4
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div
              className={`p-2 rounded-xl border transition ${
                activeStep >= 1
                  ? 'bg-rose-50 border-rose-300 text-rose-950 font-bold shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <div className="text-[9.5px] font-extrabold uppercase text-rose-700">Langkah 1 (1M)</div>
              <div className="text-[10px] mt-0.5 leading-tight">
                Kehadiran ion <strong>H⁺</strong> (daripada asid atau asid laktik bakteria).
              </div>
            </div>

            <div
              className={`p-2 rounded-xl border transition ${
                activeStep >= 2
                  ? 'bg-amber-50 border-amber-300 text-amber-950 font-bold shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <div className="text-[9.5px] font-extrabold uppercase text-amber-700">Langkah 2 (1M)</div>
              <div className="text-[10px] mt-0.5 leading-tight">
                Ion <strong>H⁺ meneutralkan cas negatif</strong> pada membran protein zarah getah.
              </div>
            </div>

            <div
              className={`p-2 rounded-xl border transition ${
                activeStep >= 3
                  ? 'bg-sky-50 border-sky-300 text-sky-950 font-bold shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <div className="text-[9.5px] font-extrabold uppercase text-sky-700">Langkah 3 (1M)</div>
              <div className="text-[10px] mt-0.5 leading-tight">
                Zarah getah <strong>berlanggar</strong> sesama sendiri menyebabkan <strong>membran protein pecah</strong>.
              </div>
            </div>

            <div
              className={`p-2 rounded-xl border transition ${
                activeStep >= 4
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <div className="text-[9.5px] font-extrabold uppercase text-emerald-700">Langkah 4 (1M)</div>
              <div className="text-[10px] mt-0.5 leading-tight">
                Rantai polimer getah <strong>terbebas lalu berbelit</strong> dan <strong>bergumpal bersama</strong>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatexCoagulationLab;
