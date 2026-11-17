import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  FlaskConical,
  HelpCircle,
  RotateCcw,
  Scale,
  Sparkles,
  Weight,
  Layers,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { analytics } from '../services/analytics';

const SIM_ID = 'kekenyalan-getah-asli-tervulkan';

// ============================================================
// TAB 1 CANVAS: PROSES PEMVULKANAN GETAH
// ============================================================
interface VulcanisationProcessCanvasProps {
  isDipping: boolean;
  dipProgress: number;
}

export const VulcanisationProcessCanvas: React.FC<VulcanisationProcessCanvasProps> = ({
  isDipping,
  dipProgress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ isDipping, dipProgress });
  stateRef.current = { isDipping, dipProgress };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const startMs = performance.now();

    // Deterministic sulfur atoms
    const sulfurAtoms = Array.from({ length: 28 }, (_, i) => ({
      rx: ((i * 37) % 100) / 100 - 0.5,
      ry: ((i * 59) % 100) / 100,
      phase: (i * 0.5) % (Math.PI * 2),
    }));

    const render = (now: number) => {
      const t = (now - startMs) / 1000;
      const dpr = window.devicePixelRatio || 1;
      const cssW = 520;
      const cssH = 280;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      const { isDipping: dipping, dipProgress: prog } = stateRef.current;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, cssW, cssH);

      // Bench
      const benchY = 244;
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(16, benchY, 488, 6);

      // Beaker containing S2Cl2 in methylbenzene
      const beakerCx = 260;
      const bTop = 130;
      const bBottom = benchY;
      const bWidth = 140;
      const halfW = bWidth / 2;

      // Beaker glass
      ctx.save();
      ctx.fillStyle = 'rgba(241, 245, 249, 0.45)';
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(beakerCx - halfW - 8, bTop - 4);
      ctx.lineTo(beakerCx - halfW, bTop + 4);
      ctx.lineTo(beakerCx - halfW, bBottom - 6);
      ctx.quadraticCurveTo(beakerCx - halfW, bBottom, beakerCx - halfW + 6, bBottom);
      ctx.lineTo(beakerCx + halfW - 6, bBottom);
      ctx.quadraticCurveTo(beakerCx + halfW, bBottom, beakerCx + halfW, bBottom - 6);
      ctx.lineTo(beakerCx + halfW, bTop);
      ctx.stroke();
      ctx.fill();

      // Liquid: Larutan disulfur diklorida (S₂Cl₂) dalam metilbenzena (amber yellowish transparent)
      ctx.save();
      ctx.beginPath();
      ctx.rect(beakerCx - halfW + 2, bTop + 2, bWidth - 4, bBottom - bTop - 4);
      ctx.clip();

      const liqTop = bBottom - (bBottom - bTop) * 0.65;
      ctx.fillStyle = 'rgba(253, 224, 71, 0.35)';
      ctx.fillRect(beakerCx - halfW, liqTop, bWidth, bBottom - liqTop);

      // Floating sulfur atoms (yellow dots with "S")
      sulfurAtoms.forEach((s) => {
        const sx = beakerCx + s.rx * (bWidth - 28);
        const sy = liqTop + 14 + s.ry * (bBottom - liqTop - 24) + Math.sin(t * 2 + s.phase) * 3;
        ctx.fillStyle = '#eab308';
        ctx.strokeStyle = '#a16207';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(sx, sy, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#0f172a';
        ctx.font = '800 6.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('S', sx, sy);
      });

      // Meniscus
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(beakerCx - halfW, liqTop);
      ctx.lineTo(beakerCx + halfW, liqTop);
      ctx.stroke();
      ctx.restore(); // end liquid clip
      ctx.restore(); // end beaker save

      // Rubber Strip (Being dipped from above)
      // Dip motion: goes down, holds, and turns vulcanised
      const stripH = 92;
      const stripW = 26;
      const dipYOffset = dipping ? Math.sin(Math.min(1, prog * 1.5) * (Math.PI / 2)) * 68 : 0;
      const stripTop = 44 + dipYOffset;
      const stripBottom = stripTop + stripH;

      // Forceps / Penyangkut memegang jalur getah
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(beakerCx - 14, 18);
      ctx.lineTo(beakerCx - 6, stripTop + 8);
      ctx.moveTo(beakerCx + 14, 18);
      ctx.lineTo(beakerCx + 6, stripTop + 8);
      ctx.stroke();

      // Rubber strip body
      // Transitions from raw yellowish rubber to vulcanised deeper amber with yellow cross-link dots
      ctx.save();
      const isVulcanised = prog > 0.45;
      ctx.fillStyle = isVulcanised ? '#fde047' : '#fef08a';
      ctx.strokeStyle = '#854d0e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(beakerCx - stripW / 2, stripTop, stripW, stripH, 3);
      ctx.fill();
      ctx.stroke();

      // If vulcanised, draw sulfur cross-link bridges on strip
      if (isVulcanised) {
        ctx.fillStyle = '#ca8a04';
        ctx.font = '800 6.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (let yOff = 18; yOff < stripH - 12; yOff += 16) {
          ctx.strokeStyle = '#ca8a04';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(beakerCx - stripW / 2 + 3, stripTop + yOff);
          ctx.lineTo(beakerCx + stripW / 2 - 3, stripTop + yOff);
          ctx.stroke();
          ctx.fillText('-S-S-', beakerCx, stripTop + yOff - 4);
        }
      }
      ctx.restore();

      // Textbook leader lines (Clean, non-overlapping)
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

      drawLeader(beakerCx - 14, stripTop + 14, 18, 54, 'Penyepit radas');
      drawLeader(
        beakerCx - stripW / 2,
        stripTop + 48,
        18,
        100,
        isVulcanised ? 'Jalur Getah Tervulkan' : 'Jalur Getah Asli'
      );
      drawLeader(beakerCx - halfW, bTop + 24, 18, 146, 'Bikar kaca');
      drawLeader(
        beakerCx - halfW,
        liqTop + 28,
        18,
        192,
        'Larutan S₂Cl₂ dalam metilbenzena'
      );

      // Label below bench
      ctx.fillStyle = '#0f172a';
      ctx.font = '800 10.5px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        'Kaedah Makmal KSSM: Pencelupan Jalur Getah Asli ke dalam Larutan Disulfur Diklorida',
        beakerCx,
        benchY + 22
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
      className="w-full max-w-[520px] aspect-[520/280] mx-auto block rounded-xl border border-slate-200 bg-white shadow-inner"
    />
  );
};

// ============================================================
// TAB 2 CANVAS: KANVAS RADAS PERBANDINGAN REGANGAN BERKEMBAR
// ============================================================
interface TensileComparisonCanvasProps {
  loadWeightGrams: number;
  isUnloaded: boolean;
}

export const TensileComparisonCanvas: React.FC<TensileComparisonCanvasProps> = ({
  loadWeightGrams,
  isUnloaded,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ loadWeightGrams, isUnloaded });
  stateRef.current = { loadWeightGrams, isUnloaded };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const startMs = performance.now();

    const render = (now: number) => {
      const dpr = window.devicePixelRatio || 1;
      const cssW = 540;
      const cssH = 340;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      const { loadWeightGrams: weight, isUnloaded: unloaded } = stateRef.current;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, cssW, cssH);

      // Lab Bench
      const benchY = 308;
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(14, benchY, 512, 6);

      // Calculations:
      // L0 = 10.0 cm
      // Natural rubber (Getah Asli): stretches a lot with weight (up to 19.0 cm at 200g). When unloaded, permanent elongation (up to 13.5 cm at 200g).
      // Vulcanised rubber (Getah Tervulkan): stretches moderately (up to 13.2 cm at 200g). When unloaded, returns to exact 10.0 cm!
      const pxPerCm = 7.4; // 10 cm = 74 px
      const l0_px = 74;

      let lenNaturalCm = 10.0;
      let lenVulcanisedCm = 10.0;

      if (!unloaded && weight > 0) {
        lenNaturalCm = 10.0 + (weight / 50) * 2.25; // 50g -> 12.25, 100g -> 14.5, 150g -> 16.75, 200g -> 19.0 cm
        lenVulcanisedCm = 10.0 + (weight / 50) * 0.8; // 50g -> 10.8, 100g -> 11.6, 150g -> 12.4, 200g -> 13.2 cm
      } else if (unloaded) {
        lenNaturalCm = 10.0 + (weight / 50) * 0.95; // permanent deformation: 50g -> 10.95, 100g -> 11.9, 150g -> 12.85, 200g -> 13.8 cm
        lenVulcanisedCm = 10.0; // perfect elasticity returns to 10.0 cm!
      }

      const hNaturalPx = lenNaturalCm * pxPerCm;
      const hVulcanisedPx = lenVulcanisedCm * pxPerCm;

      // Apparatus stations: Left = Getah Asli, Right = Getah Tervulkan
      const stations = [
        {
          key: 'natural',
          title: 'Jalur Getah Asli',
          standX: 130,
          stripX: 184,
          rulerX: 218,
          hPx: hNaturalPx,
          lengthCm: lenNaturalCm,
          color: '#fef08a',
          strokeColor: '#ca8a04',
          subLabel: unloaded ? '(Pemanjangan Kekal)' : '',
        },
        {
          key: 'vulcanised',
          title: 'Jalur Getah Tervulkan',
          standX: 340,
          stripX: 394,
          rulerX: 428,
          hPx: hVulcanisedPx,
          lengthCm: lenVulcanisedCm,
          color: '#fde047',
          strokeColor: '#a16207',
          subLabel: unloaded ? '(Kembali ke L₀ Asal)' : '',
        },
      ];

      // Draw Retort Stand & Clamps
      stations.forEach((st) => {
        const topClampY = 62;

        // Retort stand base
        ctx.fillStyle = '#334155';
        ctx.fillRect(st.standX - 22, benchY - 8, 44, 8);

        // Vertical rod
        ctx.fillStyle = '#64748b';
        ctx.fillRect(st.standX - 2.5, topClampY - 14, 5, benchY - topClampY + 6);

        // Clamp bosshead & arm
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(st.standX - 6, topClampY - 6, 12, 12);
        ctx.fillRect(st.standX + 6, topClampY - 2.5, st.stripX - st.standX - 4, 5);

        // Strip grip jaws
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(st.stripX - 10, topClampY - 6, 20, 8);

        // Meter Ruler (Pembaris meter bersenggat 0.1 cm)
        const rulerTop = topClampY;
        const rulerH = 20 * pxPerCm; // 20 cm ruler
        ctx.fillStyle = '#fffbeb';
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 1.2;
        ctx.fillRect(st.rulerX - 5, rulerTop, 16, rulerH);
        ctx.strokeRect(st.rulerX - 5, rulerTop, 16, rulerH);

        // Ruler ticks & numbers (every 1 cm and 5 cm)
        ctx.fillStyle = '#78350f';
        ctx.font = '600 6.5px ui-monospace, monospace';
        ctx.textAlign = 'right';
        ctx.strokeStyle = '#92400e';
        ctx.lineWidth = 0.7;
        for (let cm = 0; cm <= 20; cm++) {
          const tickY = rulerTop + cm * pxPerCm;
          const isMajor = cm % 5 === 0;
          ctx.beginPath();
          ctx.moveTo(st.rulerX - 5, tickY);
          ctx.lineTo(st.rulerX - 5 + (isMajor ? 8 : 4), tickY);
          ctx.stroke();
          if (isMajor) {
            ctx.fillText(`${cm}`, st.rulerX + 8, tickY + 2.5);
          }
        }

        // Rubber Strip
        const stripW = 14;
        ctx.fillStyle = st.color;
        ctx.strokeStyle = st.strokeColor;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.roundRect(st.stripX - stripW / 2, topClampY, stripW, st.hPx, 2);
        ctx.fill();
        ctx.stroke();

        // Cross links if vulcanised
        if (st.key === 'vulcanised') {
          ctx.fillStyle = '#a16207';
          for (let y = topClampY + 12; y < topClampY + st.hPx - 8; y += 14) {
            ctx.beginPath();
            ctx.arc(st.stripX - 3, y, 1.8, 0, Math.PI * 2);
            ctx.arc(st.stripX + 3, y, 1.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#a16207';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(st.stripX - 3, y);
            ctx.lineTo(st.stripX + 3, y);
            ctx.stroke();
          }
        }

        // Bottom clip / weight hanger
        const bottomY = topClampY + st.hPx;
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(st.stripX - 8, bottomY - 3, 16, 6);

        // Slotted weight hanging from bottom clip
        if (weight > 0 && !unloaded) {
          // Weight hook
          ctx.strokeStyle = '#475569';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(st.stripX, bottomY + 3);
          ctx.lineTo(st.stripX, bottomY + 12);
          ctx.stroke();

          // Stack of slotted weight discs
          const numDiscs = weight / 50;
          for (let d = 0; d < numDiscs; d++) {
            const dy = bottomY + 12 + d * 8;
            ctx.fillStyle = '#94a3b8';
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.roundRect(st.stripX - 16, dy, 32, 7, 2);
            ctx.fill();
            ctx.stroke();
          }
          // Weight label
          ctx.fillStyle = '#0f172a';
          ctx.font = '800 8.5px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(`${weight} g`, st.stripX, bottomY + 12 + numDiscs * 8 + 10);
        }

        // Pointer line to ruler
        ctx.setLineDash([2, 2]);
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(st.stripX + stripW / 2, bottomY);
        ctx.lineTo(st.rulerX - 5, bottomY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Measurement badge
        ctx.fillStyle = '#f8fafc';
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(st.stripX - 26, topClampY - 32, 52, 20, 6);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#0f172a';
        ctx.font = '800 10.5px ui-monospace, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${st.lengthCm.toFixed(1)} cm`, st.stripX, topClampY - 18);

        // Title and sublabel
        ctx.font = '800 11px ui-sans-serif, system-ui, sans-serif';
        ctx.fillStyle = st.key === 'natural' ? '#b45309' : '#047857';
        ctx.fillText(st.title, st.stripX, topClampY - 40);
        if (st.subLabel) {
          ctx.font = '700 8px ui-sans-serif, system-ui, sans-serif';
          ctx.fillStyle = st.key === 'natural' ? '#dc2626' : '#059669';
          ctx.fillText(st.subLabel, st.stripX, topClampY - 4);
        }
      });

      // Left leader lines
      const drawLeader = (
        targetX: number,
        targetY: number,
        textX: number,
        textY: number,
        label: string
      ) => {
        ctx.save();
        ctx.font = '700 9px ui-sans-serif, system-ui, sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, textX, textY);
        const tw = ctx.measureText(label).width;

        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
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

      const topClampY = 62;
      drawLeader(130 - 3, 58, 14, 48, 'Kaki retort');
      drawLeader(184 - 10, 62, 14, 94, 'Klip pengapit');
      drawLeader(218 - 5, 110, 14, 146, 'Pembaris meter (0.1 cm)');
      if (weight > 0 && !unloaded) {
        drawLeader(184 - 16, topClampY + hNaturalPx + 14, 14, 230, 'Pemberat berslot');
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
      className="w-full max-w-[540px] aspect-[540/340] mx-auto block rounded-xl border border-slate-200 bg-white shadow-inner"
    />
  );
};

// ============================================================
// CANVAS: KANTA PEMBESAR SUBMIKROSKOPIK RANGKAI SILANG SULFUR
// ============================================================
interface SulfurCrosslinkMagnifierCanvasProps {
  loadWeightGrams: number;
  isUnloaded: boolean;
}

export const SulfurCrosslinkMagnifierCanvas: React.FC<SulfurCrosslinkMagnifierCanvasProps> = ({
  loadWeightGrams,
  isUnloaded,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ loadWeightGrams, isUnloaded });
  stateRef.current = { loadWeightGrams, isUnloaded };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const startMs = performance.now();

    const render = (now: number) => {
      const dpr = window.devicePixelRatio || 1;
      const cssW = 320;
      const cssH = 340;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      const { loadWeightGrams: weight, isUnloaded: unloaded } = stateRef.current;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, cssW, cssH);

      // Two circular magnifiers: Top = Getah Asli, Bottom = Getah Tervulkan
      const lensR = 64;
      const lensCx = 160;

      // --------------------------------------------------------
      // 1. TOP LENS: GETAH ASLI (TIADA RANGKAI SILANG)
      // --------------------------------------------------------
      const cy1 = 82;
      ctx.save();
      ctx.beginPath();
      ctx.arc(lensCx, cy1, lensR, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.clip();

      // Polymers stretch / slide horizontally when loaded
      // Natural rubber chains slide permanently if loaded or unloaded!
      const stretch1 = weight > 0 ? (weight / 200) * 28 : 0;
      const slide1 = weight > 0 && unloaded ? (weight / 200) * 18 : 0;

      // Chain 1 (Top)
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(lensCx - 54 + (stretch1 ? 8 : 0), cy1 - 24);
      ctx.bezierCurveTo(
        lensCx - 20,
        cy1 - 38 + (stretch1 ? 12 : 0),
        lensCx + 10,
        cy1 - 10,
        lensCx + 54 + slide1,
        cy1 - 24
      );
      ctx.stroke();

      // Chain 2 (Middle)
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(lensCx - 52 - slide1, cy1);
      ctx.bezierCurveTo(
        lensCx - 16,
        cy1 + 18 - (stretch1 ? 10 : 0),
        lensCx + 18,
        cy1 - 18,
        lensCx + 52,
        cy1
      );
      ctx.stroke();

      // Chain 3 (Bottom)
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(lensCx - 50, cy1 + 24);
      ctx.bezierCurveTo(
        lensCx - 14,
        cy1 + 8,
        lensCx + 22,
        cy1 + 38 - (stretch1 ? 12 : 0),
        lensCx + 50 + slide1 * 0.8,
        cy1 + 24
      );
      ctx.stroke();

      ctx.restore(); // end clip 1

      // Lens 1 Rim
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.arc(lensCx, cy1, lensR, 0, Math.PI * 2);
      ctx.stroke();

      // Lens 1 Header & Notes
      ctx.fillStyle = '#b45309';
      ctx.font = '800 10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Getah Asli (Tiada Rangkai Silang)', lensCx, cy1 - lensR + 14);
      ctx.font = '700 8px ui-sans-serif, system-ui, sans-serif';
      ctx.fillStyle = '#78350f';
      ctx.fillText(
        weight > 0 && !unloaded
          ? 'Rantai menggelongsor apabila ditarik'
          : unloaded && weight > 0
          ? 'Rantai tergelincir gagal kembali ke asal'
          : 'Rantai poliisoprena berlingkar bebas',
        lensCx,
        cy1 + lensR - 12
      );

      // --------------------------------------------------------
      // 2. BOTTOM LENS: GETAH TERVULKAN (DENGAN RANGKAI SILANG SULFUR)
      // --------------------------------------------------------
      const cy2 = 246;
      ctx.save();
      ctx.beginPath();
      ctx.arc(lensCx, cy2, lensR, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.clip();

      const stretch2 = !unloaded && weight > 0 ? (weight / 200) * 12 : 0;

      // Chain 1 (Top)
      ctx.strokeStyle = '#047857';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(lensCx - 52, cy2 - 22);
      ctx.bezierCurveTo(
        lensCx - 18,
        cy2 - 34 + (stretch2 ? 6 : 0),
        lensCx + 18,
        cy2 - 10,
        lensCx + 52,
        cy2 - 22
      );
      ctx.stroke();

      // Chain 2 (Bottom)
      ctx.strokeStyle = '#047857';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(lensCx - 52, cy2 + 20);
      ctx.bezierCurveTo(
        lensCx - 18,
        cy2 + 10,
        lensCx + 18,
        cy2 + 34 - (stretch2 ? 6 : 0),
        lensCx + 52,
        cy2 + 20
      );
      ctx.stroke();

      // Sulfur Cross-Links (-S-S-) connecting chains
      const bridges = [-28, 0, 28];
      bridges.forEach((bx) => {
        const topAnchorY = cy2 - 22 + (bx === 0 ? 8 : -4);
        const botAnchorY = cy2 + 20 + (bx === 0 ? -6 : 4);

        // Bridge connection line
        ctx.strokeStyle = '#ca8a04';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(lensCx + bx, topAnchorY);
        ctx.lineTo(lensCx + bx, botAnchorY);
        ctx.stroke();

        // 2 Sulfur atoms on each bridge
        const sMidY1 = topAnchorY + (botAnchorY - topAnchorY) * 0.35;
        const sMidY2 = topAnchorY + (botAnchorY - topAnchorY) * 0.65;
        [sMidY1, sMidY2].forEach((sy) => {
          ctx.fillStyle = '#eab308';
          ctx.strokeStyle = '#854d0e';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(lensCx + bx, sy, 4.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#0f172a';
          ctx.font = '800 6px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('S', lensCx + bx, sy);
        });
      });

      ctx.restore(); // end clip 2

      // Lens 2 Rim
      ctx.strokeStyle = '#047857';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.arc(lensCx, cy2, lensR, 0, Math.PI * 2);
      ctx.stroke();

      // Lens 2 Header & Notes
      ctx.fillStyle = '#047857';
      ctx.font = '800 10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Getah Tervulkan (-S-S-)', lensCx, cy2 - lensR + 14);
      ctx.font = '700 8px ui-sans-serif, system-ui, sans-serif';
      ctx.fillStyle = '#065f46';
      ctx.fillText(
        weight > 0 && !unloaded
          ? 'Rangkai silang sulfur halang penggelongsoran'
          : unloaded && weight > 0
          ? 'Rangkai silang menarik rantai kembali ke asal'
          : 'Dihubungkan oleh ikatan kovalen -S-S-',
        lensCx,
        cy2 + lensR - 12
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
      className="w-full max-w-[320px] aspect-[320/340] mx-auto block rounded-xl border border-slate-200 bg-slate-50 shadow-inner"
    />
  );
};

// ============================================================
// MAIN COMPONENT: KAWALAN & TAB NAVIGATION
// ============================================================
export const RubberElasticityLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'process' | 'tensile'>('tensile');

  // Tab 1 state: dipping
  const [isDipping, setIsDipping] = useState(false);
  const [dipProgress, setDipProgress] = useState(0);

  // Tab 2 state: tensile experiment
  const [loadWeight, setLoadWeight] = useState<number>(100); // 50, 100, 150, 200
  const [isUnloaded, setIsUnloaded] = useState<boolean>(false);
  const [poeMode, setPoeMode] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<{
    stretchMore: 'natural' | 'vulcanised' | null;
    returnOriginal: 'natural' | 'vulcanised' | null;
  }>({
    stretchMore: null,
    returnOriginal: null,
  });

  // Action: Dip strip into S2Cl2
  const handleDipRubber = () => {
    setIsDipping(true);
    setDipProgress(0);
    analytics.recordSimulationClick(SIM_ID, 1);

    const start = performance.now();
    const duration = 2400;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setDipProgress(p);
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        analytics.recordSimulationCompleted(SIM_ID);
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }
    };
    requestAnimationFrame(tick);
  };

  const handleApplyWeight = (g: number) => {
    setLoadWeight(g);
    setIsUnloaded(false);
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  const handleUnloadWeight = () => {
    setIsUnloaded(true);
    analytics.recordSimulationCompleted(SIM_ID);
  };

  const handleResetTensile = () => {
    setLoadWeight(100);
    setIsUnloaded(false);
  };

  // Calculations for data table
  const lenNatL1 = 10.0 + (loadWeight / 50) * 2.25;
  const extNat = lenNatL1 - 10.0;
  const lenNatL2 = 10.0 + (loadWeight / 50) * 0.95;

  const lenVulcL1 = 10.0 + (loadWeight / 50) * 0.8;
  const extVulc = lenVulcL1 - 10.0;
  const lenVulcL2 = 10.0;

  return (
    <div className="space-y-3 font-sans text-slate-900">
      {/* 2 TAB UTAMA NAVIGASI */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2.5 shadow-sm flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('process')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'process'
                ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Tab 1: Proses Pemvulkanan (S₂Cl₂ Metilbenzena)</span>
          </button>
          <button
            onClick={() => setActiveTab('tensile')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'tensile'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Tab 2: Eksperimen Perbandingan Kekenyalan</span>
          </button>
        </div>

        {activeTab === 'tensile' && (
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
        )}
      </div>

      {/* ======================================================== */}
      {/* KANDUNGAN TAB 1: PROSES PEMVULKANAN GETAH                */}
      {/* ======================================================== */}
      {activeTab === 'process' && (
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-2.5">
          <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                <FlaskConical className="w-4 h-4 text-amber-600" />
                <span>Susunan Radas: Pencelupan Jalur Getah Asli dalam Larutan S₂Cl₂</span>
              </span>
              <button
                onClick={handleDipRubber}
                disabled={isDipping && dipProgress < 1}
                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs font-extrabold shadow-sm cursor-pointer transition flex items-center gap-1.5"
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Celup Jalur Getah ke dalam S₂Cl₂</span>
              </button>
            </div>

            <VulcanisationProcessCanvas isDipping={isDipping} dipProgress={dipProgress} />

            <div className="text-[11px] text-slate-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 leading-relaxed">
              <strong>Kaedah Makmal KSSM:</strong> Jalur getah asli dicelup ke dalam larutan disulfur
              diklorida (S₂Cl₂) dalam metilbenzena selama beberapa minit, kemudian dikeringkan.
              Atom-atom sulfur bertindak balas pada ikatan ganda dua C=C antara rantai polimer
              poliisoprena untuk membentuk <strong>rangkai silang sulfur (-S-S-)</strong>.
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between space-y-2">
            <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Persamaan & Struktur Kimia Pemvulkanan</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-extrabold text-slate-700 text-[11px]">
                  1. Rantai Poliisoprena Asal:
                </div>
                <div className="font-mono text-[10.5px] text-slate-800 mt-1">
                  ...-CH₂-C(CH₃)=CH-CH₂-...
                </div>
                <div className="text-[9.5px] text-slate-500 mt-0.5">
                  Mengandungi ikatan ganda dua C=C yang reaktif terhadap sulfur dan mudah dioksidakan.
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                <div className="font-extrabold text-amber-900 text-[11px]">
                  2. Pembentukan Rangkai Silang Sulfur:
                </div>
                <div className="font-mono text-[10px] text-amber-950 mt-1 leading-snug">
                  -CH₂-C(CH₃)-CH-CH₂-
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-S-S-&nbsp;(Rangkai Silang)
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
                  <br />
                  -CH₂-C(CH₃)-CH-CH₂-
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 text-white">
                <div className="font-extrabold text-amber-400 text-[10.5px]">
                  Kesan terhadap Sifat Getah:
                </div>
                <ul className="text-[10px] list-disc list-inside mt-1 space-y-0.5 text-slate-200">
                  <li>Lebih kenyal (kembali ke bentuk asal selepas ditarik)</li>
                  <li>Lebih keras dan tahan haba</li>
                  <li>Lebih tahan pengoksidaan (bilangan C=C berkurang)</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('tensile')}
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow-sm cursor-pointer transition flex items-center justify-center gap-1.5"
            >
              <span>Uji Kekenyalan di Tab 2 →</span>
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* KANDUNGAN TAB 2: EKSPERIMEN PERBANDINGAN KEKENYALAN      */}
      {/* ======================================================== */}
      {activeTab === 'tensile' && (
        <>
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
                    1. Jalur manakah meregang LEBIH PANJANG apabila pemberat digantung?
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() =>
                        setPrediction((p) => ({ ...p, stretchMore: 'natural' }))
                      }
                      className={`flex-1 py-1 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${
                        prediction.stretchMore === 'natural'
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      Getah Asli (Betul)
                    </button>
                    <button
                      onClick={() =>
                        setPrediction((p) => ({ ...p, stretchMore: 'vulcanised' }))
                      }
                      className={`flex-1 py-1 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${
                        prediction.stretchMore === 'vulcanised'
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      Getah Tervulkan
                    </button>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-amber-200 space-y-1.5">
                  <div className="font-extrabold text-slate-800">
                    2. Jalur manakah KEMBALI TEPAT KE PANJANG ASAL (L₀) selepas pemberat ditanggalkan?
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() =>
                        setPrediction((p) => ({ ...p, returnOriginal: 'vulcanised' }))
                      }
                      className={`flex-1 py-1 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${
                        prediction.returnOriginal === 'vulcanised'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      Getah Tervulkan (Betul)
                    </button>
                    <button
                      onClick={() =>
                        setPrediction((p) => ({ ...p, returnOriginal: 'natural' }))
                      }
                      className={`flex-1 py-1 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${
                        prediction.returnOriginal === 'natural'
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      Getah Asli
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* GRID UTAMA: KAWALAN PEMBERAT + KANVAS BERKEMBAR + KANTA PEMBESAR */}
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_270px] gap-2.5">
            {/* PANEL KAWALAN PEMBERAT (KIRI) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between space-y-2.5">
              <div className="space-y-2">
                <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Weight className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Jisim Pemberat Berslot</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  {[50, 100, 150, 200].map((g) => (
                    <button
                      key={g}
                      onClick={() => handleApplyWeight(g)}
                      className={`py-1.5 rounded-xl border text-[11px] font-extrabold transition cursor-pointer ${
                        loadWeight === g && !isUnloaded
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {g} g
                    </button>
                  ))}
                </div>

                <div className="space-y-1.5 pt-1">
                  <button
                    onClick={() => setIsUnloaded(false)}
                    className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow-sm cursor-pointer transition flex items-center justify-center gap-1.5"
                  >
                    <Weight className="w-3.5 h-3.5" />
                    <span>Gantung Pemberat ({loadWeight} g)</span>
                  </button>

                  <button
                    onClick={handleUnloadWeight}
                    className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold shadow-sm cursor-pointer transition flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Tanggalkan Pemberat</span>
                  </button>

                  <button
                    onClick={handleResetTensile}
                    className="w-full py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold cursor-pointer transition flex items-center justify-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Set Semula</span>
                  </button>
                </div>
              </div>

              {/* Status Ringkas */}
              <div className="border-t border-slate-200 pt-2 text-[10px] text-slate-600 space-y-1">
                <div>
                  Status Semasa:{' '}
                  <strong className={isUnloaded ? 'text-amber-700' : 'text-indigo-700'}>
                    {isUnloaded ? 'Pemberat Ditanggalkan' : `Pemberat ${loadWeight} g Tergantung`}
                  </strong>
                </div>
                <div className="text-[9.5px] leading-snug text-slate-500">
                  {isUnloaded
                    ? 'Perhatikan jalur getah asli mengalami pemanjangan kekal manakala getah tervulkan kembali ke panjang asal.'
                    : 'Perhatikan regangan pembaris meter bagi kedua-dua jalur.'}
                </div>
              </div>
            </div>

            {/* KANVAS RADAS PERBANDINGAN BERKEMBAR (TENGAH) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-indigo-600" />
                  <span>Ujian Regangan Berkembar (Getah Asli vs Tervulkan)</span>
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  Panjang Asal L₀ = <strong className="text-slate-900">10.0 cm</strong>
                </span>
              </div>

              <TensileComparisonCanvas
                loadWeightGrams={loadWeight}
                isUnloaded={isUnloaded}
              />

              <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-200 leading-relaxed">
                <strong>Pemerhatian:</strong>{' '}
                {isUnloaded
                  ? `Pemberat dialihkan: Getah Tervulkan kembali tepat ke 10.0 cm (Kekenyalan tinggi). Getah Asli gagal kembali ke 10.0 cm dan kekal pada ${lenNatL2.toFixed(1)} cm (mengalami pemanjangan kekal).`
                  : `Pemberat ${loadWeight} g digantung: Getah Asli meregang sehingga ${lenNatL1.toFixed(1)} cm (pemanjangan +${extNat.toFixed(1)} cm), manakala Getah Tervulkan meregang hanya sehingga ${lenVulcL1.toFixed(1)} cm (pemanjangan +${extVulc.toFixed(1)} cm).`}
              </div>
            </div>

            {/* KANTA PEMBESAR SUBMIKROSKOPIK RANGKAI SILANG (KANAN) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between space-y-2">
              <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Kanta Zarah: Rangkai Silang Sulfur (-S-S-)</span>
              </div>

              <SulfurCrosslinkMagnifierCanvas
                loadWeightGrams={loadWeight}
                isUnloaded={isUnloaded}
              />

              <div className="text-[10px] text-slate-700 bg-indigo-50 p-2 rounded-xl border border-indigo-200 leading-relaxed">
                Rangkai silang sulfur bertindak seperti spring kovalen kuat yang mengunci rantai polimer
                poliisoprena daripada tergelincir bebas dan menariknya kembali serta-merta.
              </div>
            </div>
          </div>

          {/* BARIS BAWAH: JADUAL REKOD PENGUKURAN & PERBANDINGAN SIFAT FIZIKAL */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] gap-2.5">
            {/* Jadual Pengukuran Automatik */}
            <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm space-y-2">
              <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500">
                Jadual Data Pengukuran Regangan (Jisim Pemberat = {loadWeight} g)
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px] border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 text-left">
                      <th className="p-1.5 font-extrabold">Jenis Jalur Getah</th>
                      <th className="p-1.5 font-extrabold">Panjang Asal, L₀ (cm)</th>
                      <th className="p-1.5 font-extrabold">Panjang Tergantung, L₁ (cm)</th>
                      <th className="p-1.5 font-extrabold">Pemanjangan (L₁ - L₀) (cm)</th>
                      <th className="p-1.5 font-extrabold">Panjang Akhir, L₂ (cm)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="bg-amber-50/60 font-medium">
                      <td className="p-1.5 font-bold text-amber-900">Getah Asli</td>
                      <td className="p-1.5">10.0</td>
                      <td className="p-1.5 font-bold text-amber-700">{lenNatL1.toFixed(1)}</td>
                      <td className="p-1.5 font-bold text-amber-700">+{extNat.toFixed(1)}</td>
                      <td className="p-1.5 font-bold text-rose-700">
                        {isUnloaded ? lenNatL2.toFixed(1) : '-'}
                      </td>
                    </tr>
                    <tr className="bg-emerald-50/60 font-medium">
                      <td className="p-1.5 font-bold text-emerald-900">Getah Tervulkan</td>
                      <td className="p-1.5">10.0</td>
                      <td className="p-1.5 font-bold text-emerald-700">{lenVulcL1.toFixed(1)}</td>
                      <td className="p-1.5 font-bold text-emerald-700">+{extVulc.toFixed(1)}</td>
                      <td className="p-1.5 font-bold text-emerald-700">
                        {isUnloaded ? lenVulcL2.toFixed(1) : '-'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Jadual Perbandingan Sifat Fizik & Kimia KSSM */}
            <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm space-y-2">
              <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500">
                Perbandingan Sifat Fizik & Kimia (Buku Teks Kimia KSSM)
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px] border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 text-left">
                      <th className="p-1.5 font-extrabold">Ciri / Sifat</th>
                      <th className="p-1.5 font-extrabold text-amber-900">Getah Asli</th>
                      <th className="p-1.5 font-extrabold text-emerald-900">Getah Tervulkan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-1.5 font-bold">Kekenyalan</td>
                      <td className="p-1.5 text-slate-600">Kurang kenyal (ubah bentuk kekal)</td>
                      <td className="p-1.5 font-bold text-emerald-700">
                        Sangat kenyal (kembali ke bentuk asal)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-1.5 font-bold">Kekerasan</td>
                      <td className="p-1.5 text-slate-600">Lembut</td>
                      <td className="p-1.5 font-bold text-slate-800">Keras dan kuat</td>
                    </tr>
                    <tr>
                      <td className="p-1.5 font-bold">Ketahanan Haba</td>
                      <td className="p-1.5 text-slate-600">Melekit pada suhu tinggi</td>
                      <td className="p-1.5 font-bold text-slate-800">Tahan haba tinggi</td>
                    </tr>
                    <tr>
                      <td className="p-1.5 font-bold">Ketahanan Pengoksidaan</td>
                      <td className="p-1.5 text-rose-700">Mudah dioksidakan (banyak C=C)</td>
                      <td className="p-1.5 font-bold text-emerald-700">
                        Lebih tahan (ikatan C=C berkurang)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RubberElasticityLab;
