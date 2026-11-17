import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Droplets,
  Flame,
  FlaskConical,
  HelpCircle,
  RotateCcw,
  Search,
  Sparkles,
  TestTube,
} from 'lucide-react';
import { analytics } from '../services/analytics';

type Mode = 'compare' | 'mystery';
type Station = 1 | 2 | 3;
type Identity = 'heksana' | 'heksena';

interface ApparatusCanvasProps {
  station: Station;
  mode: Mode;
  mysteryMap: { x: Identity; y: Identity };
  testedStations: Record<Station, boolean>;
  animProgress: number; // 0..1
}

const DualApparatusCanvas: React.FC<ApparatusCanvasProps> = ({
  station,
  mode,
  mysteryMap,
  testedStations,
  animProgress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ station, mode, mysteryMap, testedStations, animProgress });
  stateRef.current = { station, mode, mysteryMap, testedStations, animProgress };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const startMs = performance.now();

    const drawTextbookLabel = (
      targetX: number,
      targetY: number,
      side: 'left' | 'right' | 'top' | 'bottom',
      textX: number,
      textY: number,
      title: string
    ) => {
      ctx.save();
      ctx.font = '700 9px ui-sans-serif, system-ui, sans-serif';
      ctx.textBaseline = 'middle';
      const tw = ctx.measureText(title).width;

      let lineStartX = textX;
      let lineStartY = textY;

      if (side === 'left') {
        ctx.textAlign = 'left';
        ctx.fillStyle = '#0f172a';
        ctx.fillText(title, textX, textY);
        lineStartX = textX + tw + 4;
      } else if (side === 'right') {
        ctx.textAlign = 'right';
        ctx.fillStyle = '#0f172a';
        ctx.fillText(title, textX, textY);
        lineStartX = textX - tw - 4;
      } else if (side === 'top') {
        ctx.textAlign = 'center';
        ctx.fillStyle = '#0f172a';
        ctx.fillText(title, textX, textY);
        lineStartY = textY + 6;
      } else {
        ctx.textAlign = 'center';
        ctx.fillStyle = '#0f172a';
        ctx.fillText(title, textX, textY);
        lineStartY = textY - 6;
      }

      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(lineStartX, lineStartY);
      ctx.lineTo(targetX, targetY);
      ctx.stroke();

      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(targetX, targetY, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = (now: number) => {
      const t = (now - startMs) / 1000;
      const dpr = window.devicePixelRatio || 1;
      const cssW = 500;
      const cssH = 240;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      const {
        station: st,
        mode: md,
        mysteryMap: mmap,
        testedStations: tested,
        animProgress: prog,
      } = stateRef.current;

      const leftId: Identity = md === 'compare' ? 'heksana' : mmap.x;
      const rightId: Identity = md === 'compare' ? 'heksena' : mmap.y;
      const leftTitle = md === 'compare' ? 'Heksana (Alkana)' : 'Sampel Misteri X';
      const rightTitle = md === 'compare' ? 'Heksena (Alkena)' : 'Sampel Misteri Y';

      const isTested = tested[st];

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, cssW, cssH);

      // Divider
      ctx.strokeStyle = '#e2e8f0';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(250, 12);
      ctx.lineTo(250, 228);
      ctx.stroke();
      ctx.setLineDash([]);

      // Bench
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(16, 214, 468, 7);

      // Side titles
      ctx.font = '800 11.5px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#0f172a';
      ctx.fillText(leftTitle, 125, 20);
      ctx.fillText(rightTitle, 375, 20);

      const drawStationSide = (cx: number, id: Identity, isLeft: boolean) => {
        const isAlkene = id === 'heksena';

        if (st === 1) {
          // STESEN 1: UJIAN KEJELAGAAN NYALAAN
          // Evaporating dish (Piring sejat)
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(cx - 32, 184);
          ctx.quadraticCurveTo(cx, 214, cx + 32, 184);
          ctx.closePath();
          ctx.fillStyle = '#f8fafc';
          ctx.fill();
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Liquid inside dish
          ctx.fillStyle = '#e0f2fe';
          ctx.beginPath();
          ctx.moveTo(cx - 24, 188);
          ctx.quadraticCurveTo(cx, 202, cx + 24, 188);
          ctx.closePath();
          ctx.fill();
          ctx.restore();

          // Filter paper held above with tongs
          const fpY = 82;
          ctx.save();
          // Tongs (Penyepit)
          ctx.strokeStyle = '#475569';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(cx + 28, fpY - 10);
          ctx.lineTo(cx + 62, fpY - 22);
          ctx.stroke();

          // White filter paper tilted slightly
          ctx.fillStyle = '#ffffff';
          ctx.strokeStyle = '#64748b';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(cx - 34, fpY - 12, 68, 22, 4);
          ctx.fill();
          ctx.stroke();

          // Soot spot on filter paper when lit
          if (isTested && prog > 0.2) {
            const sootAlpha = Math.min(1, (prog - 0.2) / 0.8);
            const sootRadius = isAlkene ? 16 : 6;
            ctx.fillStyle = `rgba(15, 23, 42, ${sootAlpha * (isAlkene ? 0.92 : 0.45)})`;
            ctx.beginPath();
            ctx.ellipse(cx, fpY + 2, sootRadius, sootRadius * 0.45, 0, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();

          // Flame & Soot Smoke when lit
          if (isTested) {
            const flicker = Math.sin(t * 16 + (isLeft ? 0 : 2)) * 4;
            // Yellow/orange flame
            ctx.save();
            ctx.fillStyle = isAlkene
              ? 'rgba(245, 158, 11, 0.9)'
              : 'rgba(250, 204, 21, 0.85)';
            ctx.beginPath();
            ctx.moveTo(cx - 12, 184);
            ctx.quadraticCurveTo(cx - 16, 140, cx + flicker * 0.5, 118 + flicker);
            ctx.quadraticCurveTo(cx + 16, 140, cx + 12, 184);
            ctx.fill();

            // Soot smoke particles rising
            const smokeCount = isAlkene ? 16 : 4;
            for (let p = 0; p < smokeCount; p++) {
              const pt = (t * 0.9 + p * 0.17) % 1;
              const px = cx + Math.sin(t * 5 + p) * (isAlkene ? 14 : 5);
              const py = 128 - pt * 42;
              const pAlpha = Math.sin(pt * Math.PI) * (isAlkene ? 0.85 : 0.3);
              ctx.fillStyle = `rgba(15, 23, 42, ${pAlpha})`;
              ctx.beginPath();
              ctx.arc(px, py, isAlkene ? 3.5 + (p % 3) : 2, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();
          }

          if (isLeft) {
            drawTextbookLabel(cx - 34, fpY, 'left', 12, 68, 'Kertas turas putih');
            drawTextbookLabel(cx - 28, 194, 'left', 12, 194, 'Piring sejat');
          } else {
            drawTextbookLabel(cx + 55, fpY - 19, 'right', 488, 56, 'Penyepit');
            if (isTested) {
              drawTextbookLabel(
                cx + 12,
                fpY + 2,
                'right',
                488,
                96,
                isAlkene ? 'Jelaga hitam tebal' : 'Jelaga sedikit'
              );
            }
          }

          // Result badge below dish
          ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle = isTested ? (isAlkene ? '#b45309' : '#0284c7') : '#64748b';
          ctx.fillText(
            isTested
              ? isAlkene
                ? 'Nyalaan kuning sangat berjelaga'
                : 'Nyalaan kuning kurang berjelaga'
              : 'Belum dinyalakan',
            cx,
            232
          );
        } else {
          // STESEN 2 (Air Bromin) & STESEN 3 (KMnO4)
          const reagentColor =
            st === 2 ? 'rgba(194, 65, 12, 0.85)' : 'rgba(147, 51, 234, 0.85)'; // Brown Br2 or Purple KMnO4
          const reagentName = st === 2 ? 'Air bromin (Br₂)' : 'KMnO₄ berasid';

          // Dropper above test tube
          const dropOffset = isTested && prog < 0.35 ? Math.sin(prog * 18) * 2 : 0;
          ctx.save();
          // Rubber bulb
          ctx.fillStyle = '#334155';
          ctx.beginPath();
          ctx.roundRect(cx - 6, 36 + dropOffset, 12, 18, 6);
          ctx.fill();
          // Glass pipette
          ctx.fillStyle = '#f8fafc';
          ctx.strokeStyle = '#475569';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(cx - 4, 54 + dropOffset);
          ctx.lineTo(cx - 1.5, 86 + dropOffset);
          ctx.lineTo(cx + 1.5, 86 + dropOffset);
          ctx.lineTo(cx + 4, 54 + dropOffset);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Reagent inside dropper
          ctx.fillStyle = reagentColor;
          ctx.beginPath();
          ctx.moveTo(cx - 2.5, 66 + dropOffset);
          ctx.lineTo(cx - 1, 84 + dropOffset);
          ctx.lineTo(cx + 1, 84 + dropOffset);
          ctx.lineTo(cx + 2.5, 66 + dropOffset);
          ctx.closePath();
          ctx.fill();
          ctx.restore();

          // Falling droplet
          if (isTested && prog > 0.05 && prog < 0.45) {
            const dt = (prog - 0.05) / 0.4;
            ctx.fillStyle = reagentColor;
            ctx.beginPath();
            ctx.arc(cx, 88 + dt * 60, 3.2, 0, Math.PI * 2);
            ctx.fill();
          }

          // Test tube (with shake offset during mixing)
          const shakeX =
            isTested && prog > 0.45 && prog < 0.85
              ? Math.sin(t * 28) * 3.5
              : 0;
          const tubeCx = cx + shakeX;

          // Test tube rack base
          ctx.fillStyle = '#94a3b8';
          ctx.fillRect(cx - 34, 204, 68, 10);
          ctx.strokeStyle = '#475569';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(cx - 34, 204, 68, 10);

          // Test tube body
          ctx.save();
          const drawTube = () => {
            ctx.beginPath();
            ctx.moveTo(tubeCx - 17, 98);
            ctx.lineTo(tubeCx - 17, 188);
            ctx.arc(tubeCx, 188, 17, Math.PI, 0, true);
            ctx.lineTo(tubeCx + 17, 98);
          };

          drawTube();
          ctx.clip();

          // Liquid color calculation
          let liquidFill = 'rgba(224, 242, 254, 0.45)'; // Initially colorless
          if (isTested && prog > 0.35) {
            if (isAlkene) {
              // Decolourises rapidly! Flash tint then clear
              const fade = Math.max(0, 1 - (prog - 0.35) / 0.45);
              liquidFill =
                st === 2
                  ? `rgba(194, 65, 12, ${fade * 0.5})`
                  : `rgba(147, 51, 234, ${fade * 0.5})`;
              if (fade <= 0.05) liquidFill = 'rgba(224, 242, 254, 0.45)';
            } else {
              // Stays brown/purple!
              const mix = Math.min(1, (prog - 0.35) / 0.35);
              liquidFill =
                st === 2
                  ? `rgba(194, 65, 12, ${0.25 + mix * 0.55})`
                  : `rgba(147, 51, 234, ${0.25 + mix * 0.55})`;
            }
          }

          ctx.fillStyle = liquidFill;
          ctx.fillRect(tubeCx - 20, 138, 40, 72);
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(tubeCx - 20, 138);
          ctx.lineTo(tubeCx + 20, 138);
          ctx.stroke();
          ctx.restore();

          drawTube();
          ctx.strokeStyle = '#1e293b';
          ctx.lineWidth = 2;
          ctx.stroke();

          if (isLeft) {
            drawTextbookLabel(cx - 5, 68, 'left', 12, 68, reagentName);
            drawTextbookLabel(tubeCx - 17, 154, 'left', 12, 154, 'Tabung uji');
          } else {
            drawTextbookLabel(tubeCx + 17, 165, 'right', 488, 165, 'Sampel hidrokarbon');
          }

          // Result badge below
          ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'center';
          if (!isTested) {
            ctx.fillStyle = '#64748b';
            ctx.fillText('Cecair tidak berwarna', cx, 232);
          } else if (isAlkene) {
            ctx.fillStyle = '#059669';
            ctx.fillText(
              st === 2
                ? 'Warna perang dinyahwarnakan'
                : 'Warna ungu dinyahwarnakan',
              cx,
              232
            );
          } else {
            ctx.fillStyle = st === 2 ? '#b45309' : '#7e22ce';
            ctx.fillText(
              st === 2 ? 'Warna perang kekal' : 'Warna ungu kekal',
              cx,
              232
            );
          }
        }
      };

      drawStationSide(125, leftId, true);
      drawStationSide(375, rightId, false);

      ctx.restore();
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full max-w-[500px] aspect-[500/240] mx-auto block rounded-xl border border-slate-200 bg-white"
    />
  );
};

const SubmicroBondCanvas: React.FC<{ station: Station; tested: boolean }> = ({
  station,
  tested,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ station, tested });
  stateRef.current = { station, tested };

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
      const cssH = 220;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      const { station: st, tested: isTested } = stateRef.current;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, cssW, cssH);

      if (st === 1) {
        // Carbon % Comparison Visual
        ctx.fillStyle = '#0f172a';
        ctx.font = '800 10.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Perbandingan % Jisim Karbon', 125, 22);

        // Heksana Bar
        ctx.textAlign = 'left';
        ctx.fillStyle = '#334155';
        ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Heksana (C₆H₁₄): (72 / 86) × 100%', 18, 52);
        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.roundRect(18, 60, 214, 18, 6);
        ctx.fill();
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.roundRect(18, 60, 214 * 0.837, 18, 6);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '800 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('83.7% Karbon', 26, 72);

        // Heksena Bar
        ctx.fillStyle = '#334155';
        ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Heksena (C₆H₁₂): (72 / 84) × 100%', 18, 108);
        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.roundRect(18, 116, 214, 18, 6);
        ctx.fill();
        ctx.fillStyle = '#d97706';
        ctx.beginPath();
        ctx.roundRect(18, 116, 214 * 0.857, 18, 6);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '800 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('85.7% Karbon (Lebih Tinggi!)', 26, 128);

        // Explanation card
        ctx.fillStyle = '#fef3c7';
        ctx.strokeStyle = '#fcd34d';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(16, 148, 218, 58, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#92400e';
        ctx.font = '700 9px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Kesimpulan KSSM:', 24, 163);
        ctx.font = '600 8.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Heksena mempunyai % karbon lebih tinggi', 24, 177);
        ctx.fillText('→ lebih banyak karbon tidak terbakar', 24, 190);
        ctx.fillText('→ nyalaan kuning sangat berjelaga.', 24, 201);
      } else {
        // Stesen 2 & 3: Saturated C-C vs Unsaturated C=C Bond Reactivity
        ctx.textAlign = 'center';
        ctx.fillStyle = '#0f172a';
        ctx.font = '800 10.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Ketepuan Ikatan vs Kereaktifan', 125, 18);

        // Top box: Heksana (Saturated C-C)
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.roundRect(14, 30, 222, 78, 10);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#0284c7';
        ctx.font = '800 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Heksana: Ikatan Tunggal C—C (Tepu)', 125, 44);

        // C-C single bond
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(95, 74);
        ctx.lineTo(155, 74);
        ctx.stroke();

        [95, 155].forEach((cx) => {
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.arc(cx, 74, 11, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '800 10px ui-sans-serif, system-ui, sans-serif';
          ctx.fillText('C', cx, 77.5);
        });

        ctx.fillStyle = '#64748b';
        ctx.font = '600 8.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Tiada lengan kosong → Tiada tindak balas', 125, 97);

        // Bottom box: Heksena (Unsaturated C=C)
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = isTested ? '#10b981' : '#ea580c';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(14, 118, 222, 92, 10);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isTested ? '#059669' : '#ea580c';
        ctx.font = '800 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(
          isTested
            ? st === 2
              ? 'Terbentuk: 1,2-dibromoheksana'
              : 'Terbentuk: Heksana-1,2-diol'
            : 'Heksena: Ikatan Ganda Dua C=C (Tak Tepu)',
          125,
          132
        );

        // C=C or opened C-C with Br/OH
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(95, 174);
        ctx.lineTo(155, 174);
        ctx.stroke();

        if (!isTested) {
          ctx.strokeStyle = '#ea580c';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(95, 166);
          ctx.lineTo(155, 166);
          ctx.stroke();
        } else {
          // Added Br or OH atoms
          const addLabel = st === 2 ? 'Br' : 'OH';
          const addColor = st === 2 ? '#c2410c' : '#9333ea';
          const bounce = Math.sin(t * 4) * 1.5;

          [95, 155].forEach((cx) => {
            ctx.strokeStyle = addColor;
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(cx, 174);
            ctx.lineTo(cx, 152 + bounce);
            ctx.stroke();

            ctx.fillStyle = addColor;
            ctx.beginPath();
            ctx.arc(cx, 150 + bounce, 9.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.font = '800 8px ui-sans-serif, system-ui, sans-serif';
            ctx.fillText(addLabel, cx, 153 + bounce);
          });
        }

        [95, 155].forEach((cx) => {
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.arc(cx, 174, 11, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '800 10px ui-sans-serif, system-ui, sans-serif';
          ctx.fillText('C', cx, 177.5);
        });

        ctx.fillStyle = '#059669';
        ctx.font = '700 8.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(
          isTested
            ? 'Ikatan C=C terbuka → tindak balas penambahan!'
            : 'Ikatan C=C sedia bertindak balas',
          125,
          199
        );
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
      className="w-full max-w-[250px] aspect-[250/220] mx-auto block rounded-xl border border-slate-200 bg-slate-50"
    />
  );
};

export const AlkaneVsAlkeneLab: React.FC = () => {
  const [mode, setMode] = useState<Mode>('compare');
  const [station, setStation] = useState<Station>(2);
  const [mysteryMap, setMysteryMap] = useState<{ x: Identity; y: Identity }>({
    x: 'heksana',
    y: 'heksena',
  });

  const [testedStations, setTestedStations] = useState<Record<Station, boolean>>({
    1: false,
    2: false,
    3: false,
  });
  const [animProgress, setAnimProgress] = useState<number>(0);

  // Mystery Challenge state
  const [guessX, setGuessX] = useState<Identity | ''>('');
  const [guessY, setGuessY] = useState<Identity | ''>('');
  const [mysteryResult, setMysteryResult] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const recordedRef = useRef(false);

  // Animate progress when current station is tested
  useEffect(() => {
    if (!testedStations[station]) {
      setAnimProgress(0);
      return;
    }

    let start = performance.now();
    let frameId = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / 1500);
      setAnimProgress(p);
      if (p < 1) frameId = requestAnimationFrame(step);
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [testedStations, station]);

  // Record completion when all 3 stations tested
  useEffect(() => {
    if (testedStations[1] && testedStations[2] && testedStations[3] && !recordedRef.current) {
      recordedRef.current = true;
      analytics.recordSimulationCompleted('ujian-kimia-alkana-alkena');
    }
  }, [testedStations]);

  const handleRunStation = () => {
    setTestedStations((prev) => ({ ...prev, [station]: true }));
  };

  const handleSwitchMode = (newMode: Mode) => {
    setMode(newMode);
    setTestedStations({ 1: false, 2: false, 3: false });
    setAnimProgress(0);
    setGuessX('');
    setGuessY('');
    setMysteryResult('idle');
    if (newMode === 'mystery') {
      const flip = Math.random() > 0.5;
      setMysteryMap({
        x: flip ? 'heksena' : 'heksana',
        y: flip ? 'heksana' : 'heksena',
      });
    }
  };

  const handleReset = () => {
    setTestedStations({ 1: false, 2: false, 3: false });
    setAnimProgress(0);
    setGuessX('');
    setGuessY('');
    setMysteryResult('idle');
    if (mode === 'mystery') {
      const flip = Math.random() > 0.5;
      setMysteryMap({
        x: flip ? 'heksena' : 'heksana',
        y: flip ? 'heksana' : 'heksena',
      });
    }
  };

  const handleCheckMystery = () => {
    if (!guessX || !guessY) return;
    if (guessX === mysteryMap.x && guessY === mysteryMap.y) {
      setMysteryResult('correct');
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.65 } });
      analytics.recordSimulationCompleted('ujian-kimia-alkana-alkena');
    } else {
      setMysteryResult('wrong');
    }
  };

  const actionButtonLabel =
    station === 1
      ? 'Nyalakan Sampel'
      : station === 2
      ? 'Titiskan Air Bromin & Goncang'
      : 'Titiskan Larutan KMnO₄ & Goncang';

  return (
    <div className="bg-slate-50 text-slate-900 p-2 sm:p-3 rounded-2xl flex flex-col gap-2.5 font-sans">
      {/* 1. BAR KAWALAN ATAS & MOD PEMBELAJARAN */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2.5 shadow-sm flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex rounded-xl bg-slate-100 p-0.5 border border-slate-200">
          <button
            onClick={() => handleSwitchMode('compare')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition cursor-pointer ${
              mode === 'compare'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mod 1: Perbandingan Berkembar (Heksana vs Heksena)
          </button>
          <button
            onClick={() => handleSwitchMode('mystery')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer ${
              mode === 'mystery'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Mod 2: Cabaran Detektif (Sampel Misteri X & Y)</span>
          </button>
        </div>

        <button
          onClick={handleReset}
          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Set Semula Ujian</span>
        </button>
      </div>

      {/* 3 STESEN UJIAN WAJIB KSSM */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {[
          { num: 1 as Station, label: 'Stesen 1: Ujian Kejelagaan Nyalaan', icon: Flame },
          { num: 2 as Station, label: 'Stesen 2: Tindak Balas Air Bromin (Br₂)', icon: TestTube },
          { num: 3 as Station, label: 'Stesen 3: Tindak Balas KMnO₄ Berasid', icon: Droplets },
        ].map((st) => {
          const Icon = st.icon;
          const active = station === st.num;
          const done = testedStations[st.num];
          return (
            <button
              key={st.num}
              onClick={() => setStation(st.num)}
              className={`p-2 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                active
                  ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 text-amber-950 font-extrabold'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 font-bold'
              }`}
            >
              <div className="flex items-center gap-2 text-xs">
                <Icon className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{st.label}</span>
              </div>
              {done && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* 2. KANVAS TENGAH & KANTA PEMBESAR KANAN */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_270px] gap-2.5 items-stretch">
        {/* Kanvas Radas Perbandingan Berkembar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-800">
              Susunan Radas Makmal KSSM (Sebelah-Menyebelah)
            </span>
            <button
              onClick={handleRunStation}
              className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold shadow-sm cursor-pointer transition"
            >
              {actionButtonLabel}
            </button>
          </div>

          <DualApparatusCanvas
            station={station}
            mode={mode}
            mysteryMap={mysteryMap}
            testedStations={testedStations}
            animProgress={animProgress}
          />

          {/* Cabaran Detektif UI (Jika Mod 2 aktif) */}
          {mode === 'mystery' && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-950">
                <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Kenal pasti Sampel Misteri:</span>
                <select
                  value={guessX}
                  onChange={(e) => setGuessX(e.target.value as Identity)}
                  className="px-2 py-1 rounded-lg border border-indigo-300 bg-white text-xs font-bold"
                >
                  <option value="">Sampel X = ?</option>
                  <option value="heksana">Sampel X = Heksana</option>
                  <option value="heksena">Sampel X = Heksena</option>
                </select>
                <select
                  value={guessY}
                  onChange={(e) => setGuessY(e.target.value as Identity)}
                  className="px-2 py-1 rounded-lg border border-indigo-300 bg-white text-xs font-bold"
                >
                  <option value="">Sampel Y = ?</option>
                  <option value="heksana">Sampel Y = Heksana</option>
                  <option value="heksena">Sampel Y = Heksena</option>
                </select>
                <button
                  onClick={handleCheckMystery}
                  className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold cursor-pointer"
                >
                  Semak Jawapan
                </button>
              </div>

              {mysteryResult === 'correct' && (
                <span className="text-xs font-extrabold text-emerald-700">
                  Tahniah! Jawapan tepat! ✓
                </span>
              )}
              {mysteryResult === 'wrong' && (
                <span className="text-xs font-extrabold text-red-600">
                  Belum tepat — uji dengan Br₂ atau KMnO₄ dahulu!
                </span>
              )}
            </div>
          )}
        </div>

        {/* Kanta Pembesar Submikroskopik & Kalkulator % Karbon */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between space-y-2">
          <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Kanta Pembesar Submikroskopik</span>
          </div>
          <SubmicroBondCanvas station={station} tested={testedStations[station]} />
          <div className="text-[11px] text-slate-700 bg-slate-50 p-2 rounded-xl border border-slate-200 leading-relaxed">
            {station === 1
              ? 'Heksena mempunyai peratusan jisim karbon lebih tinggi (85.7% vs 83.7%), menyebabkan pembakaran menghasilkan lebih banyak jelaga.'
              : 'Ikatan ganda dua C=C pada heksena terbuka untuk tindak balas penambahan, manakala ikatan tunggal C—C pada heksana sudah tepu.'}
          </div>
        </div>
      </div>

      {/* 3. JADUAL REKOD PEMERHATIAN & PERSAMAAN KIMIA */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-2.5">
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm overflow-x-auto">
          <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
            Jadual Rekod Pemerhatian Automatik
          </div>
          <table className="w-full text-left text-[11px] border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="py-1 pr-2">Ujian</th>
                <th className="py-1 pr-2">{mode === 'compare' ? 'Heksana' : 'Sampel X'}</th>
                <th className="py-1 pr-2">{mode === 'compare' ? 'Heksena' : 'Sampel Y'}</th>
                <th className="py-1">Inferens</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-1.5 pr-2 font-bold">1. Kejelagaan</td>
                <td className="py-1.5 pr-2">
                  {testedStations[1]
                    ? (mode === 'compare' || mysteryMap.x === 'heksana')
                      ? 'Nyalaan kuning, jelaga sedikit'
                      : 'Nyalaan kuning, jelaga tebal'
                    : '—'}
                </td>
                <td className="py-1.5 pr-2">
                  {testedStations[1]
                    ? (mode === 'compare' || mysteryMap.y === 'heksena')
                      ? 'Nyalaan kuning, jelaga tebal'
                      : 'Nyalaan kuning, jelaga sedikit'
                    : '—'}
                </td>
                <td className="py-1.5 text-slate-600">
                  {testedStations[1] ? '% Karbon alkena lebih tinggi' : '—'}
                </td>
              </tr>
              <tr>
                <td className="py-1.5 pr-2 font-bold">2. Air Bromin (Br₂)</td>
                <td className="py-1.5 pr-2">
                  {testedStations[2]
                    ? (mode === 'compare' || mysteryMap.x === 'heksana')
                      ? 'Warna perang kekal'
                      : 'Warna perang dinyahwarnakan'
                    : '—'}
                </td>
                <td className="py-1.5 pr-2">
                  {testedStations[2]
                    ? (mode === 'compare' || mysteryMap.y === 'heksena')
                      ? 'Warna perang dinyahwarnakan'
                      : 'Warna perang kekal'
                    : '—'}
                </td>
                <td className="py-1.5 text-slate-600">
                  {testedStations[2] ? 'Alkena tak tepu bertindak balas' : '—'}
                </td>
              </tr>
              <tr>
                <td className="py-1.5 pr-2 font-bold">3. KMnO₄ Berasid</td>
                <td className="py-1.5 pr-2">
                  {testedStations[3]
                    ? (mode === 'compare' || mysteryMap.x === 'heksana')
                      ? 'Warna ungu kekal'
                      : 'Warna ungu dinyahwarnakan'
                    : '—'}
                </td>
                <td className="py-1.5 pr-2">
                  {testedStations[3]
                    ? (mode === 'compare' || mysteryMap.y === 'heksena')
                      ? 'Warna ungu dinyahwarnakan'
                      : 'Warna ungu kekal'
                    : '—'}
                </td>
                <td className="py-1.5 text-slate-600">
                  {testedStations[3] ? 'Pengoksidaan ikatan C=C' : '—'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between space-y-2">
          <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <FlaskConical className="w-3.5 h-3.5 text-amber-600" />
            <span>Persamaan Kimia Seimbang (Heksena)</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900 text-white font-mono text-[11px] font-bold">
            1. Penghalogenan: C₆H₁₂(ce) + Br₂(ak) → C₆H₁₂Br₂(ce)
          </div>
          <div className="p-2 rounded-xl bg-slate-900 text-white font-mono text-[11px] font-bold">
            2. Pengoksidaan: C₆H₁₂(ce) + H₂O(ce) + [O] → C₆H₁₂(OH)₂(ce)
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlkaneVsAlkeneLab;
