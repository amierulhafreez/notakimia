import React, { useEffect, useRef, useState } from 'react';
import {
  Beaker,
  CheckCircle2,
  Droplets,
  Flame,
  FlaskConical,
  Maximize2,
  RotateCcw,
  Sparkles,
  TestTube2,
  X,
} from 'lucide-react';
import { analytics } from '../services/analytics';

type OxidizingAgentId = 'kmno4' | 'k2cr2o7';
type OxidationStage = 'empty' | 'filled' | 'heating' | 'heated' | 'collecting' | 'collected';
type ConfirmatoryTestId = 'litmus' | 'mg' | 'na2co3';

interface AgentSpec {
  id: OxidizingAgentId;
  name: string;
  shortName: string;
  formula: string;
  startRgb: [number, number, number];
  endRgb: [number, number, number];
  startColorLabel: string;
  endColorLabel: string;
  ionReductionNote: string;
}

const AGENTS: AgentSpec[] = [
  {
    id: 'kmno4',
    name: 'Kalium manganat(VII) berasid',
    shortName: 'KMnO₄ berasid',
    formula: 'KMnO₄(ak) + H₂SO₄',
    startRgb: [147, 51, 234], // vivid purple
    endRgb: [226, 232, 240], // colorless Mn2+
    startColorLabel: 'Ungu',
    endColorLabel: 'Tidak berwarna',
    ionReductionNote: 'Ion manganat(VII), MnO₄⁻ (ungu) diturunkan menjadi ion Mn²⁺ (tidak berwarna).',
  },
  {
    id: 'k2cr2o7',
    name: 'Kalium dikromat(VI) berasid',
    shortName: 'K₂Cr₂O₇ berasid',
    formula: 'K₂Cr₂O₇(ak) + H₂SO₄',
    startRgb: [234, 88, 12], // vivid orange
    endRgb: [22, 163, 74], // emerald green Cr3+
    startColorLabel: 'Jingga',
    endColorLabel: 'Hijau',
    ionReductionNote: 'Ion dikromat(VI), Cr₂O₇²⁻ (jingga) diturunkan menjadi ion Cr³⁺ (hijau).',
  },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface DistillationCanvasProps {
  agent: AgentSpec;
  stage: OxidationStage;
  heatProgress: number; // 0..1
  collectProgress: number; // 0..1
}

const DistillationCanvas: React.FC<DistillationCanvasProps> = ({
  agent,
  stage,
  heatProgress,
  collectProgress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ agent, stage, heatProgress, collectProgress });
  stateRef.current = { agent, stage, heatProgress, collectProgress };

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
      const cssW = 500;
      const cssH = 205;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      const { agent: ag, stage: st, heatProgress: hp, collectProgress: cp } = stateRef.current;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);

      ctx.fillStyle = '#070b14';
      ctx.fillRect(0, 0, cssW, cssH);

      // Lab bench
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(16, 188, 468, 8);

      // Retort stand (left of flask)
      ctx.fillStyle = '#475569';
      ctx.fillRect(58, 178, 42, 10);
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.moveTo(74, 178);
      ctx.lineTo(74, 24);
      ctx.stroke();

      // Tripod & Wire Gauze beneath Round-Bottom Flask (flask cx = 148, cy = 112)
      const fCx = 148;
      const fCy = 112;
      const fR = 32;

      // Tripod legs + gauze
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(116, 146);
      ctx.lineTo(180, 146);
      ctx.moveTo(122, 146);
      ctx.lineTo(114, 188);
      ctx.moveTo(174, 146);
      ctx.lineTo(182, 188);
      ctx.stroke();

      // Bunsen Burner underneath flask
      ctx.fillStyle = '#475569';
      ctx.fillRect(138, 178, 20, 10);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(144, 158, 8, 20);

      // Animated Bunsen flame when heating or heated/collecting
      const burnerLit = st === 'heating' || st === 'heated' || st === 'collecting';
      if (burnerLit) {
        const flicker = Math.sin(t * 18) * 1.5;
        // Outer blue flame
        ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
        ctx.beginPath();
        ctx.moveTo(144, 158);
        ctx.quadraticCurveTo(140, 149, 148, 138 + flicker);
        ctx.quadraticCurveTo(156, 149, 152, 158);
        ctx.closePath();
        ctx.fill();
        // Inner bright cone
        ctx.fillStyle = 'rgba(250, 204, 21, 0.9)';
        ctx.beginPath();
        ctx.moveTo(146, 158);
        ctx.quadraticCurveTo(148, 146 + flicker * 0.6, 150, 158);
        ctx.closePath();
        ctx.fill();
      }

      // Clamp gripping flask neck
      ctx.fillStyle = '#64748b';
      ctx.fillRect(74, 62, 62, 4);

      // Solution color inside flask
      let colorBlend = 0;
      if (st === 'heating') colorBlend = hp;
      else if (st === 'heated' || st === 'collecting' || st === 'collected') colorBlend = 1;

      const r = Math.round(lerp(ag.startRgb[0], ag.endRgb[0], colorBlend));
      const g = Math.round(lerp(ag.startRgb[1], ag.endRgb[1], colorBlend));
      const b = Math.round(lerp(ag.startRgb[2], ag.endRgb[2], colorBlend));

      // Clip inside round-bottom flask
      ctx.save();
      ctx.beginPath();
      ctx.arc(fCx, fCy, fR - 2, 0, Math.PI * 2);
      ctx.clip();

      if (st !== 'empty') {
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${colorBlend > 0.7 && ag.id === 'kmno4' ? 0.35 : 0.82})`;
        ctx.fillRect(fCx - fR, fCy - 2, fR * 2, fR + 4);

        // Boiling bubbles when heated
        if (burnerLit) {
          for (let i = 0; i < 6; i++) {
            const bx = fCx - 14 + ((i * 7) % 28);
            const by = fCy + 24 - ((t * 44 + i * 9) % 24);
            ctx.strokeStyle = 'rgba(255,255,255,0.75)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(bx, by, 1.8, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      // Serpihan porselin (porcelain chips) at flask bottom
      ctx.fillStyle = '#e2e8f0';
      [
        [fCx - 7, fCy + 25],
        [fCx, fCy + 27],
        [fCx + 6, fCy + 25],
      ].forEach(([px, py]) => {
        ctx.beginPath();
        ctx.roundRect(px - 2.5, py - 2, 5, 3.5, 1);
        ctx.fill();
      });

      ctx.restore();

      // Round-bottom flask glass wall & neck
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(fCx, fCy, fR, -Math.PI * 0.38, Math.PI * 1.38, false);
      ctx.stroke();
      // Neck
      ctx.beginPath();
      ctx.moveTo(fCx - 12, fCy - 29);
      ctx.lineTo(fCx - 12, 48);
      ctx.moveTo(fCx + 12, fCy - 29);
      ctx.lineTo(fCx + 12, 48);
      ctx.stroke();

      // Rubber stopper in flask neck
      ctx.fillStyle = '#334155';
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(fCx - 14, 42);
      ctx.lineTo(fCx + 14, 42);
      ctx.lineTo(fCx + 11, 55);
      ctx.lineTo(fCx - 11, 55);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Receiving Test Tube immersed in Cold-Water Bath Beaker (right side: cx = 344)
      const recCx = 344;
      const bathX = 296;
      const bathW = 96;
      const bathY = 104;
      const bathH = 84;

      // Cold water in bath beaker
      ctx.fillStyle = 'rgba(56, 189, 248, 0.22)';
      ctx.fillRect(bathX + 2, bathY + 14, bathW - 4, bathH - 16);
      // Small ice cubes floating at water surface
      ctx.fillStyle = 'rgba(224, 242, 254, 0.55)';
      ctx.fillRect(bathX + 10, bathY + 11, 12, 8);
      ctx.fillRect(bathX + 72, bathY + 12, 11, 7);

      // Cold-water bath beaker glass outline
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(bathX - 3, bathY);
      ctx.lineTo(bathX, bathY + 3);
      ctx.lineTo(bathX, bathY + bathH);
      ctx.lineTo(bathX + bathW, bathY + bathH);
      ctx.lineTo(bathX + bathW, bathY + 3);
      ctx.lineTo(bathX + bathW + 3, bathY);
      ctx.stroke();

      // Receiving test tube (inside water bath)
      const recW = 30;
      const recR = recW / 2;
      const recTop = 76;
      const recBottom = 176;

      // Distillate liquid inside receiving test tube
      let distFrac = 0;
      if (st === 'collecting') distFrac = cp;
      else if (st === 'collected') distFrac = 1;

      if (distFrac > 0.02) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(recCx - recR + 1.5, recTop);
        ctx.lineTo(recCx - recR + 1.5, recBottom - recR);
        ctx.arc(recCx, recBottom - recR, recR - 1.5, Math.PI, 0, true);
        ctx.lineTo(recCx + recR - 1.5, recTop);
        ctx.closePath();
        ctx.clip();

        const fillH = distFrac * 44;
        ctx.fillStyle = 'rgba(241, 245, 249, 0.72)';
        ctx.fillRect(recCx - recR, recBottom - fillH, recW, fillH + 2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(recCx - recR + 2, recBottom - fillH);
        ctx.lineTo(recCx + recR - 2, recBottom - fillH);
        ctx.stroke();
        ctx.restore();
      }

      // Receiving test tube glass outline
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(recCx - recR, recTop);
      ctx.lineTo(recCx - recR, recBottom - recR);
      ctx.arc(recCx, recBottom - recR, recR, Math.PI, 0, true);
      ctx.lineTo(recCx + recR, recTop);
      ctx.stroke();

      // Delivery tube connecting rubber stopper -> inside receiving test tube
      ctx.strokeStyle = '#93c5fd';
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(fCx, 46);
      ctx.lineTo(fCx, 24);
      ctx.lineTo(recCx, 24);
      ctx.lineTo(recCx, 108);
      ctx.stroke();

      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(fCx, 46);
      ctx.lineTo(fCx, 24);
      ctx.lineTo(recCx, 24);
      ctx.lineTo(recCx, 108);
      ctx.stroke();

      // Animated vapor moving along delivery tube & condensing droplets!
      if (st === 'heated' || st === 'collecting') {
        for (let i = 0; i < 6; i++) {
          const vp = (t * 0.65 + i / 6) % 1;
          let vx = fCx;
          let vy = 46;
          if (vp < 0.15) {
            vy = 46 - (vp / 0.15) * 22;
          } else if (vp < 0.7) {
            vx = fCx + ((vp - 0.15) / 0.55) * (recCx - fCx);
            vy = 24;
          } else {
            vx = recCx;
            vy = 24 + ((vp - 0.7) / 0.3) * 84;
          }
          ctx.fillStyle = 'rgba(224, 242, 254, 0.85)';
          ctx.beginPath();
          ctx.arc(vx, vy, 2.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (st === 'collecting') {
        const dropY = 112 + ((t * 58) % 36);
        ctx.fillStyle = '#e0f2fe';
        ctx.beginPath();
        ctx.arc(recCx, dropY, 2.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Wavy vinegar aroma lines & textbook callout when collected!
      if (st === 'collected') {
        ctx.strokeStyle = '#fde047';
        ctx.lineWidth = 1.4;
        for (let k = -1; k <= 1; k += 2) {
          const sx = recCx + k * 7;
          ctx.beginPath();
          ctx.moveTo(sx, 72);
          ctx.quadraticCurveTo(sx + 4, 64, sx, 56);
          ctx.quadraticCurveTo(sx - 4, 48, sx, 40);
          ctx.stroke();
        }
        ctx.fillStyle = '#fde047';
        ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Bau masam cuka', recCx + 20, 56);
      }

      // Clean Textbook Labels
      ctx.font = '600 9.5px ui-sans-serif, system-ui, sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.textAlign = 'center';
      ctx.fillText('Tiub penghantar', (fCx + recCx) / 2, 16);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Penyumbat getah', fCx - 18, 48);
      ctx.fillText('Kelalang dasar bulat', fCx - 38, 108);
      ctx.fillText('Serpihan porselin', fCx - 38, 134);
      ctx.fillText('Penunu Bunsen', 132, 174);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText('Tabung uji penerima', recCx + 20, 86);
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('Air sejuk (ais)', bathX + bathW + 6, 136);
      if (st === 'collected') {
        ctx.fillStyle = '#4ade80';
        ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Hasil: Asid etanoik', bathX + bathW + 6, 158);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '500 9px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('(Cecair tak berwarna)', bathX + bathW + 6, 170);
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
      style={{ width: 500, height: 205 }}
      className="w-full max-w-[500px] h-[205px] mx-auto block rounded-xl border border-slate-800 bg-[#070b14]"
    />
  );
};

interface FunctionalGroupCanvasProps {
  stage: OxidationStage;
  size?: number;
}

const FunctionalGroupCanvas: React.FC<FunctionalGroupCanvasProps> = ({
  stage,
  size = 186,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ stage, size });
  stateRef.current = { stage, size };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const startMs = performance.now();

    const drawNode = (
      x: number,
      y: number,
      r: number,
      fill: string,
      label: string,
      textColor = '#090d16'
    ) => {
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.45)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = textColor;
      ctx.font = `800 ${r >= 11 ? 8.5 : 7.5}px ui-sans-serif, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x, y + 0.5);
    };

    const render = (now: number) => {
      const t = (now - startMs) / 1000;
      const { stage: st, size: boxSize } = stateRef.current;

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
      const sc = cssW / 186;

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, lensR, 0, Math.PI * 2);
      ctx.clip();

      const bg = ctx.createRadialGradient(cx, cy, 8, cx, cy, lensR);
      bg.addColorStop(0, '#111827');
      bg.addColorStop(1, '#04070e');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, cssW, cssH);

      const isConverted = st === 'heated' || st === 'collecting' || st === 'collected';
      const isConverting = st === 'heating';
      const phase = isConverting ? (t * 0.85) % 1 : isConverted ? 1 : 0;

      // Title inside lens (comfortably inside circular chord)
      ctx.fillStyle = isConverted ? '#4ade80' : '#fde047';
      ctx.font = `800 ${8.5 * sc}px ui-sans-serif, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(
        isConverted ? 'Asid Etanoik (CH₃COOH)' : 'Etanol (CH₃CH₂OH)',
        cx,
        38 * sc
      );

      // Carbon chain backbone: CH3 — C
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(46 * sc, cy);
      ctx.lineTo(88 * sc, cy);
      ctx.stroke();

      drawNode(44 * sc, cy, 13 * sc, '#cbd5e1', 'CH₃');
      drawNode(88 * sc, cy, 12 * sc, '#94a3b8', 'C');

      if (!isConverted && phase < 0.65) {
        // Etanol functional group: two H on C and -OH hydroxyl group
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(88 * sc, cy);
        ctx.lineTo(88 * sc, cy - 26 * sc);
        ctx.moveTo(88 * sc, cy);
        ctx.lineTo(88 * sc, cy + 26 * sc);
        ctx.moveTo(88 * sc, cy);
        ctx.lineTo(124 * sc, cy);
        ctx.stroke();

        drawNode(88 * sc, cy - 26 * sc, 8 * sc, '#e2e8f0', 'H');
        drawNode(88 * sc, cy + 26 * sc, 8 * sc, '#e2e8f0', 'H');
        drawNode(128 * sc, cy, 13 * sc, '#38bdf8', '-OH');

        // Incoming 2[O] atoms
        const oxX = isConverting ? (158 - phase * 38) * sc : 148 * sc;
        drawNode(oxX, cy - 26 * sc, 9.5 * sc, '#fde047', '[O]');
        drawNode(oxX, cy + 26 * sc, 9.5 * sc, '#fde047', '[O]');

        ctx.fillStyle = '#38bdf8';
        ctx.font = `700 ${7.8 * sc}px ui-sans-serif, system-ui, sans-serif`;
        ctx.fillText('Kumpulan Hidroksil (-OH)', cx, cy + 49 * sc);
      } else {
        // Asid Etanoik functional group: C=O double bond + C-OH + released H2O!
        ctx.strokeStyle = '#f87171';
        ctx.lineWidth = 2;
        // Double bond =O upward
        ctx.beginPath();
        ctx.moveTo(85 * sc, cy);
        ctx.lineTo(85 * sc, cy - 28 * sc);
        ctx.moveTo(91 * sc, cy);
        ctx.lineTo(91 * sc, cy - 28 * sc);
        // Single bond -OH rightward
        ctx.moveTo(88 * sc, cy);
        ctx.lineTo(124 * sc, cy);
        ctx.stroke();

        drawNode(88 * sc, cy - 29 * sc, 10.5 * sc, '#ef4444', 'O', '#ffffff');
        drawNode(126 * sc, cy, 12.5 * sc, '#f97316', 'OH', '#ffffff');

        // Highlight box/label around -COOH
        ctx.fillStyle = '#fca5a5';
        ctx.font = `700 ${7.8 * sc}px ui-sans-serif, system-ui, sans-serif`;
        ctx.fillText('Kumpulan Karboksil (-COOH)', cx, cy + 49 * sc);

        // Released H2O byproduct floating gently at bottom-right
        const wy = cy + 27 * sc + Math.sin(t * 2) * 2 * sc;
        drawNode(132 * sc, wy, 11 * sc, '#38bdf8', 'H₂O');
      }

      ctx.restore();

      // Magnifier rim
      ctx.strokeStyle = isConverted ? '#4ade80' : '#facc15';
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

export const EthanolOxidationLab: React.FC = () => {
  const [selectedAgentId, setSelectedAgentId] = useState<OxidizingAgentId>('kmno4');
  const [stage, setStage] = useState<OxidationStage>('empty');
  const [heatProgress, setHeatProgress] = useState(0);
  const [collectProgress, setCollectProgress] = useState(0);
  const [testsDone, setTestsDone] = useState<Partial<Record<ConfirmatoryTestId, boolean>>>({});
  const [isMagnifierExpanded, setIsMagnifierExpanded] = useState(false);

  const hasRecordedCompletionRef = useRef(false);
  const agent = AGENTS.find((a) => a.id === selectedAgentId)!;

  // Step 2 Heating 1.5s animation -> heated
  useEffect(() => {
    if (stage !== 'heating') return;
    let rafId = 0;
    const startMs = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - startMs) / 1500);
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

  // Step 3 Collecting 1.3s animation -> collected
  useEffect(() => {
    if (stage !== 'collecting') return;
    let rafId = 0;
    const startMs = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - startMs) / 1300);
      setCollectProgress(p);
      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setStage('collected');
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [stage]);

  // Analytics completion after collecting distillate and performing confirmatory tests
  useEffect(() => {
    if (stage === 'collected' && Object.keys(testsDone).length >= 1 && !hasRecordedCompletionRef.current) {
      hasRecordedCompletionRef.current = true;
      analytics.recordSimulationCompleted('pengoksidaan-etanol');
    }
  }, [stage, testsDone]);

  const handleReset = () => {
    setStage('empty');
    setHeatProgress(0);
    setCollectProgress(0);
    setTestsDone({});
  };

  const handleSelectAgent = (id: OxidizingAgentId) => {
    if (stage === 'heating' || stage === 'collecting') return;
    setSelectedAgentId(id);
    handleReset();
  };

  return (
    <div className="bg-[#0b0f19] text-white rounded-2xl p-3 border border-slate-800 shadow-2xl space-y-2">
      {/* HEADER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-yellow-300">
          <FlaskConical className="w-3.5 h-3.5 text-yellow-400" />
          <span>Simulasi Sebatian Karbon: Pengoksidaan Etanol kepada Asid Etanoik</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] font-bold text-slate-200">
            Agen: <span className="text-yellow-300">{agent.shortName}</span> ({agent.startColorLabel} → {agent.endColorLabel})
          </span>
          <button
            onClick={handleReset}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Set Semula Eksperimen
          </button>
        </div>
      </div>

      {/* BAHAGIAN ATAS: KAWALAN KIRI — RADAS PENYULINGAN TENGAH — KANTA KANAN */}
      <div className="grid grid-cols-1 lg:grid-cols-[245px_1fr_235px] gap-2.5 items-stretch">
        {/* 1. PANEL KAWALAN EKSPERIMEN (KIRI) */}
        <div className="bg-[#111827] border border-slate-800 rounded-xl p-2.5 flex flex-col justify-between space-y-2">
          <div className="space-y-1.5">
            <div className="text-[10.5px] font-extrabold uppercase tracking-wide text-blue-300">
              Pilihan Agen Pengoksidaan
            </div>
            <div className="space-y-1.5">
              {AGENTS.map((ag) => {
                const active = selectedAgentId === ag.id;
                return (
                  <button
                    key={ag.id}
                    onClick={() => handleSelectAgent(ag.id)}
                    disabled={stage === 'heating' || stage === 'collecting'}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg border transition flex items-center gap-2 cursor-pointer ${
                      active
                        ? 'bg-blue-600/25 border-blue-400 text-white font-bold'
                        : 'bg-[#090d16] border-slate-800 text-slate-300 hover:border-blue-500/40'
                    }`}
                  >
                    <span
                      className="w-3 h-5 rounded-sm border border-white/30 shrink-0"
                      style={{ backgroundColor: `rgb(${ag.startRgb.join(',')})` }}
                    />
                    <div className="min-w-0">
                      <div className="text-[10.5px] leading-tight">{ag.name}</div>
                      <div className="text-[9.5px] font-mono text-yellow-300">
                        {ag.formula} ({ag.startColorLabel})
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kawalan Prosedur Berurutan */}
          <div className="space-y-1.5 pt-1.5 border-t border-slate-800">
            <div className="text-[10px] font-extrabold uppercase tracking-wide text-yellow-300">
              Kawalan Prosedur Berurutan
            </div>

            <button
              onClick={() => setStage('filled')}
              disabled={stage !== 'empty'}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold transition flex items-center gap-1.5 cursor-pointer ${
                stage === 'empty'
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow'
                  : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-default'
              }`}
            >
              <Droplets className="w-3.5 h-3.5 shrink-0" />
              <span>1. Masukkan Etanol & Agen ke Kelalang</span>
            </button>

            <button
              onClick={() => {
                setHeatProgress(0);
                setStage('heating');
              }}
              disabled={stage !== 'filled'}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold transition flex items-center gap-1.5 cursor-pointer ${
                stage === 'filled'
                  ? 'bg-red-600 hover:bg-red-500 text-white shadow'
                  : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-default'
              }`}
            >
              <Flame className="w-3.5 h-3.5 shrink-0" />
              <span>2. Nyalakan Penunu Bunsen</span>
            </button>

            <button
              onClick={() => {
                setCollectProgress(0);
                setStage('collecting');
              }}
              disabled={stage !== 'heated'}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold transition flex items-center gap-1.5 cursor-pointer ${
                stage === 'heated'
                  ? 'bg-yellow-500 hover:bg-yellow-400 text-slate-950 shadow'
                  : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-default'
              }`}
            >
              <Beaker className="w-3.5 h-3.5 shrink-0" />
              <span>3. Kumpul Hasil Sulingan</span>
            </button>
          </div>
        </div>

        {/* 2. KANVAS RADAS PENYULINGAN MAKROSKOPIK (TENGAH) */}
        <div className="bg-[#111827] border border-slate-800 rounded-xl p-2 flex flex-col justify-between space-y-1.5">
          <DistillationCanvas
            agent={agent}
            stage={stage}
            heatProgress={heatProgress}
            collectProgress={collectProgress}
          />

          <div className="px-2.5 py-1 rounded-lg bg-[#090d16] border border-slate-800 text-[10.5px] flex items-center gap-2">
            {stage === 'collected' ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
            )}
            <span className="text-slate-200">
              {stage === 'empty' && 'Langkah 1: Masukkan etanol + agen pengoksidaan ke dalam kelalang dasar bulat.'}
              {stage === 'filled' && `Campuran etanol & ${agent.shortName} (${agent.startColorLabel.toLowerCase()}) sedia dipanaskan.`}
              {stage === 'heating' && `Memanaskan campuran: warna ${agent.startColorLabel.toLowerCase()} sedang bertukar kepada ${agent.endColorLabel.toLowerCase()}...`}
              {stage === 'heated' && `Warna bertukar (${agent.startColorLabel} → ${agent.endColorLabel})! Klik Langkah 3 untuk mengumpul hasil sulingan.`}
              {stage === 'collecting' && 'Wap asid etanoik terkondensasi di dalam bikar air sejuk dan menitis ke tabung uji penerima...'}
              {stage === 'collected' && 'Hasil sulingan tidak berwarna (asid etanoik berbau masam cuka) berjaya dikumpul! Jalankan 3 ujian pengesahan di bawah.'}
            </span>
          </div>
        </div>

        {/* 3. KANTA PEMBESAR SUBMIKROSKOPIK (KANAN ATAS) */}
        <div className="bg-[#111827] border border-yellow-500/35 rounded-xl p-2 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <div>
              <h4 className="text-[11px] font-extrabold uppercase tracking-wide text-yellow-300">
                Kanta Kumpulan Berfungsi
              </h4>
              <p className="text-[9px] text-slate-400">-OH (Etanol) → -COOH (Asid Etanoik)</p>
            </div>
            <button
              onClick={() => setIsMagnifierExpanded(true)}
              title="Perbesar Kanta Pembesar"
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-yellow-300 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <FunctionalGroupCanvas stage={stage} size={184} />

          <div className="text-[9.5px] text-center font-mono text-yellow-200 bg-[#090d16] border border-slate-800 rounded-lg py-1">
            CH₃CH₂OH + 2[O] → CH₃COOH + H₂O
          </div>
        </div>
      </div>

      {/* BAHAGIAN BAWAH: STESEN UJIAN PENGESAHAN HASIL & PERSAMAAN KIMIA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5">
        {/* 4A. STESEN UJIAN PENGESAHAN HASIL SULINGAN (BAWAH KIRI) */}
        <div className="lg:col-span-7 bg-[#111827] border border-slate-800 rounded-xl p-2.5 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-xs font-extrabold text-white flex items-center gap-1.5">
              <TestTube2 className="w-3.5 h-3.5 text-sky-400" />
              Stesen Ujian Pengesahan Hasil Sulingan (Sifat Asid Karboksilik)
            </h4>
            <button
              disabled={stage !== 'collected'}
              onClick={() => setTestsDone({ litmus: true, mg: true, na2co3: true })}
              className="px-2.5 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 border border-slate-600 text-[10px] font-bold text-yellow-300 cursor-pointer"
            >
              Uji Semua (3 Stesen)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* UJIAN 1: Kertas Litmus Biru Lembap */}
            <div className="bg-[#090d16] border border-slate-800 rounded-lg p-2 flex flex-col justify-between gap-1.5">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-bold text-sky-300">Ujian 1: Litmus Biru</span>
                <button
                  disabled={stage !== 'collected'}
                  onClick={() => setTestsDone((p) => ({ ...p, litmus: true }))}
                  className="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-[9.5px] font-bold cursor-pointer"
                >
                  Titis
                </button>
              </div>
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 36 48" className="w-8 h-11 shrink-0">
                  <rect x="11" y="4" width="14" height="22" rx="2" fill="#3b82f6" />
                  <rect
                    x="11"
                    y="24"
                    width="14"
                    height="20"
                    rx="2"
                    fill={testsDone.litmus ? '#ef4444' : '#3b82f6'}
                  />
                </svg>
                <p className="text-[9.5px] leading-snug text-slate-300">
                  {testsDone.litmus ? (
                    <span className="text-red-300 font-semibold">
                      Kertas litmus biru bertukar menjadi merah (berasid).
                    </span>
                  ) : (
                    'Titiskan hasil sulingan ke atas kertas litmus biru lembap.'
                  )}
                </p>
              </div>
            </div>

            {/* UJIAN 2: Serbuk Magnesium (Mg) -> Gas H2 'pop' */}
            <div className="bg-[#090d16] border border-slate-800 rounded-lg p-2 flex flex-col justify-between gap-1.5">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-bold text-yellow-300">Ujian 2: Serbuk Mg</span>
                <button
                  disabled={stage !== 'collected'}
                  onClick={() => setTestsDone((p) => ({ ...p, mg: true }))}
                  className="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-[9.5px] font-bold cursor-pointer"
                >
                  Uji Mg
                </button>
              </div>
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 36 48" className="w-8 h-11 shrink-0">
                  <path d="M 10 10 L 10 38 A 8 8 0 0 0 26 38 L 26 10" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                  <rect x="11" y="22" width="14" height="20" fill="rgba(226,232,240,0.3)" />
                  <rect x="13" y="39" width="10" height="3" fill="#cbd5e1" />
                  {testsDone.mg && (
                    <>
                      <circle cx="15" cy="30" r="1.5" fill="#fff" />
                      <circle cx="20" cy="26" r="1.8" fill="#fff" />
                      <circle cx="18" cy="14" r="4" fill="#facc15" opacity="0.85" />
                    </>
                  )}
                </svg>
                <p className="text-[9.5px] leading-snug text-slate-300">
                  {testsDone.mg ? (
                    <span className="text-yellow-200 font-semibold">
                      Pembuakan! Gas H₂ terbebas & menghasilkan bunyi &apos;pop&apos; dengan kayu uji bernyala.
                    </span>
                  ) : (
                    'Masukkan pita/serbuk Mg & uji gas dengan kayu uji bernyala.'
                  )}
                </p>
              </div>
            </div>

            {/* UJIAN 3: Serbuk Na2CO3 -> Gas CO2 mengeruhkan air kapur */}
            <div className="bg-[#090d16] border border-slate-800 rounded-lg p-2 flex flex-col justify-between gap-1.5">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-bold text-emerald-300">Ujian 3: Na₂CO₃</span>
                <button
                  disabled={stage !== 'collected'}
                  onClick={() => setTestsDone((p) => ({ ...p, na2co3: true }))}
                  className="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-[9.5px] font-bold cursor-pointer"
                >
                  Uji CO₂
                </button>
              </div>
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 36 48" className="w-8 h-11 shrink-0">
                  <path d="M 10 10 L 10 38 A 8 8 0 0 0 26 38 L 26 10" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                  <rect
                    x="11"
                    y="22"
                    width="14"
                    height="20"
                    fill={testsDone.na2co3 ? 'rgba(248, 250, 252, 0.88)' : 'rgba(186, 230, 253, 0.25)'}
                  />
                </svg>
                <p className="text-[9.5px] leading-snug text-slate-300">
                  {testsDone.na2co3 ? (
                    <span className="text-emerald-300 font-semibold">
                      Pembuakan! Gas CO₂ dialirkan ke air kapur & mengeruhkan air kapur.
                    </span>
                  ) : (
                    'Masukkan serbuk Na₂CO₃ & salurkan gas ke dalam air kapur.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4B. PERSAMAAN KIMIA SEIMBANG & PERANAN AGEN PENGOKSIDAAN (BAWAH KANAN) */}
        <div className="lg:col-span-5 bg-[#111827] border border-slate-800 rounded-xl p-2.5 flex flex-col justify-between space-y-1.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold text-yellow-300">
              Persamaan Kimia Seimbang & Analisis Pengoksidaan
            </h4>
          </div>

          <div className="bg-[#090d16] border border-yellow-400/40 rounded-lg px-2.5 py-1.5">
            <div className="text-[9.5px] font-bold uppercase text-yellow-300">
              Persamaan Pengoksidaan Etanol
            </div>
            <div className="font-mono text-xs font-bold text-white mt-0.5">
              CH₃CH₂OH(ce) + 2[O] → CH₃COOH(ak) + H₂O(ce)
            </div>
          </div>

          <div className="bg-[#090d16] border border-blue-500/30 rounded-lg px-2.5 py-1.5 text-[10px] space-y-0.5">
            <div className="font-bold text-blue-300">
              Peranan {agent.shortName} ({agent.startColorLabel} → {agent.endColorLabel})
            </div>
            <p className="text-slate-300 leading-snug">
              Membekalkan dua atom oksigen, <span className="font-mono text-yellow-200">2[O]</span> untuk mengoksidakan etanol kepada asid etanoik. {agent.ionReductionNote}
            </p>
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
                  Kanta Pembesar Penukaran Kumpulan Berfungsi
                </h4>
                <p className="text-xs text-slate-400">Hidroksil (-OH) → Karboksil (-COOH) + H₂O</p>
              </div>
              <button
                onClick={() => setIsMagnifierExpanded(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <FunctionalGroupCanvas stage={stage} size={300} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EthanolOxidationLab;
