import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  Beaker,
  CheckCircle2,
  ChevronRight,
  Droplets,
  Flame,
  HelpCircle,
  RotateCcw,
  Sparkles,
  TestTube,
  Waves,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { analytics } from '../services/analytics';

const SIM_ID = 'penghasilan-sabun';
type AlkaliType = 'naoh' | 'koh';
type SoapPhase = 1 | 2 | 3 | 4;

// ============================================================
// CANVAS 1: KANVAS RADAS MAKMAL MENGIKUT 4 FASA KSSM
// ============================================================
interface SaponificationApparatusCanvasProps {
  phase: SoapPhase;
  alkali: AlkaliType;
  isBoiling: boolean;
  boilProgress: number;
  testActive: 'touch' | 'lather' | 'litmus' | null;
}

export const SaponificationApparatusCanvas: React.FC<SaponificationApparatusCanvasProps> = ({
  phase,
  alkali,
  isBoiling,
  boilProgress,
  testActive,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ phase, alkali, isBoiling, boilProgress, testActive });
  stateRef.current = { phase, alkali, isBoiling, boilProgress, testActive };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const startMs = performance.now();

    // Deterministic soap precipitate flakes & boiling bubbles
    const bubbles = Array.from({ length: 24 }, (_, i) => ({
      rx: ((i * 31) % 100) / 100 - 0.5,
      speed: 0.6 + ((i * 17) % 50) / 100,
      phase: (i * 0.4) % (Math.PI * 2),
      size: 2 + ((i * 13) % 4),
    }));

    const render = (now: number) => {
      const t = (now - startMs) / 1000;
      const dpr = window.devicePixelRatio || 1;
      const cssW = 540;
      const cssH = 320;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      const {
        phase: ph,
        alkali: alk,
        isBoiling: boiling,
        boilProgress: bProg,
        testActive: test,
      } = stateRef.current;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, cssW, cssH);

      // Lab Bench
      const benchY = 286;
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(14, benchY, 512, 6);

      // Leader helper
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

      // ========================================================
      // FASA 1: PENCAMPURAN & PENDIDIHAN (BEAKER + TRIPOD + BUNSEN)
      // ========================================================
      if (ph === 1) {
        const beakerCx = 270;
        const tripodTop = 196;
        const bTop = 100;
        const bBottom = tripodTop;
        const bWidth = 110;
        const halfW = bWidth / 2;

        // Tripod Stand & Wire Gauze
        // Wire gauze
        ctx.fillStyle = '#cbd5e1';
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.fillRect(beakerCx - halfW - 14, tripodTop, bWidth + 28, 4);
        ctx.strokeRect(beakerCx - halfW - 14, tripodTop, bWidth + 28, 4);

        // Tripod legs
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(beakerCx - halfW - 10, tripodTop + 4);
        ctx.lineTo(beakerCx - halfW - 32, benchY);
        ctx.moveTo(beakerCx + halfW + 10, tripodTop + 4);
        ctx.lineTo(beakerCx + halfW + 32, benchY);
        ctx.moveTo(beakerCx, tripodTop + 4);
        ctx.lineTo(beakerCx, benchY);
        ctx.stroke();

        // Bunsen Burner
        const bunsenBaseY = benchY;
        const bunsenTopY = tripodTop + 36;
        ctx.fillStyle = '#475569';
        ctx.fillRect(beakerCx - 22, bunsenBaseY - 6, 44, 6);
        ctx.fillStyle = '#94a3b8';
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.2;
        ctx.fillRect(beakerCx - 5, bunsenTopY, 10, bunsenBaseY - bunsenTopY - 6);
        ctx.strokeRect(beakerCx - 5, bunsenTopY, 10, bunsenBaseY - bunsenTopY - 6);

        // Flame when boiling
        if (boiling) {
          ctx.save();
          const flameH = 26 + Math.sin(t * 18) * 4;
          // Outer yellow-orange flame
          ctx.fillStyle = 'rgba(249, 115, 22, 0.85)';
          ctx.beginPath();
          ctx.moveTo(beakerCx - 10, bunsenTopY);
          ctx.quadraticCurveTo(beakerCx, bunsenTopY - flameH, beakerCx + 10, bunsenTopY);
          ctx.fill();
          // Inner blue flame core
          ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
          ctx.beginPath();
          ctx.moveTo(beakerCx - 5, bunsenTopY);
          ctx.quadraticCurveTo(beakerCx, bunsenTopY - flameH * 0.6, beakerCx + 5, bunsenTopY);
          ctx.fill();
          ctx.restore();
        }

        // Glass Beaker
        ctx.save();
        ctx.fillStyle = 'rgba(241, 245, 249, 0.45)';
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(beakerCx - halfW - 8, bTop - 4);
        ctx.lineTo(beakerCx - halfW, bTop + 4);
        ctx.lineTo(beakerCx - halfW, bBottom - 5);
        ctx.quadraticCurveTo(beakerCx - halfW, bBottom, beakerCx - halfW + 6, bBottom);
        ctx.lineTo(beakerCx + halfW - 6, bBottom);
        ctx.quadraticCurveTo(beakerCx + halfW, bBottom, beakerCx + halfW, bBottom - 5);
        ctx.lineTo(beakerCx + halfW, bTop);
        ctx.stroke();
        ctx.fill();

        // Liquid mixture: 5 cm³ palm oil (yellow) + 50 cm³ concentrated alkali (clear/soapy)
        ctx.save();
        ctx.beginPath();
        ctx.rect(beakerCx - halfW + 2, bTop + 2, bWidth - 4, bBottom - bTop - 4);
        ctx.clip();

        const liqTop = bBottom - (bBottom - bTop) * 0.58;

        if (boiling) {
          // Thickening soapy emulsion (creamy golden-yellow)
          ctx.fillStyle = 'rgba(253, 224, 71, 0.65)';
          ctx.fillRect(beakerCx - halfW, liqTop, bWidth, bBottom - liqTop);

          // Boiling bubbles
          bubbles.forEach((b) => {
            const by = liqTop + 10 + ((b.phase + t * b.speed * 2) % 1) * (bBottom - liqTop - 18);
            const bx = beakerCx + b.rx * (bWidth - 20);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.strokeStyle = '#ca8a04';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.arc(bx, by, b.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          });
        } else {
          // Unboiled: 2 distinct layers (oil floating on alkali)
          // Lower layer: NaOH/KOH pekat (cloudy white-translucent)
          const oilBoundary = liqTop + 14;
          ctx.fillStyle = 'rgba(241, 245, 249, 0.7)';
          ctx.fillRect(beakerCx - halfW, oilBoundary, bWidth, bBottom - oilBoundary);

          // Upper layer: Minyak sawit (golden orange-yellow)
          ctx.fillStyle = 'rgba(245, 158, 11, 0.75)';
          ctx.fillRect(beakerCx - halfW, liqTop, bWidth, oilBoundary - liqTop);

          ctx.strokeStyle = '#d97706';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(beakerCx - halfW, oilBoundary);
          ctx.lineTo(beakerCx + halfW, oilBoundary);
          ctx.stroke();
        }

        // Meniscus
        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(beakerCx - halfW, liqTop);
        ctx.lineTo(beakerCx + halfW, liqTop);
        ctx.stroke();
        ctx.restore(); // end liquid clip
        ctx.restore(); // end beaker save

        // Glass Stirring Rod
        const stirOffset = boiling ? Math.sin(t * 14) * 6 : 0;
        const rodX = beakerCx + 10;
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2.6;
        ctx.beginPath();
        ctx.moveTo(rodX, bTop - 46 + stirOffset);
        ctx.lineTo(rodX - 6, bBottom - 8 + stirOffset);
        ctx.stroke();

        // Leader labels (Left Margin)
        drawLeader(rodX, bTop - 20, 16, 44, 'Rod kaca pengacau');
        drawLeader(beakerCx - halfW, bTop + 18, 16, 94, 'Bikar 250 cm³');
        drawLeader(
          beakerCx - halfW,
          liqTop + 18,
          16,
          144,
          boiling
            ? 'Campuran sabun likat'
            : '5 cm³ Minyak sawit + 50 cm³ ' + (alk === 'naoh' ? 'NaOH pekat' : 'KOH pekat')
        );
        drawLeader(beakerCx - halfW - 8, tripodTop + 2, 16, 194, 'Kasa dawai & Tungku kaki tiga');
        drawLeader(beakerCx - 5, bunsenTopY + 12, 16, 244, 'Penunu Bunsen');
      }

      // ========================================================
      // FASA 2: PEMENDAKAN SABUN (PENAMBAHAN NaCl / SALTING OUT)
      // ========================================================
      else if (ph === 2) {
        const beakerCx = 270;
        const bTop = 110;
        const bBottom = benchY;
        const bWidth = 140;
        const halfW = bWidth / 2;

        // Beaker glass sitting directly on bench to cool
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

        // Solution contents inside
        ctx.save();
        ctx.beginPath();
        ctx.rect(beakerCx - halfW + 2, bTop + 2, bWidth - 4, bBottom - bTop - 4);
        ctx.clip();

        const liqTop = bBottom - (bBottom - bTop) * 0.68;
        // Saline solution (translucent light amber)
        ctx.fillStyle = 'rgba(254, 240, 138, 0.45)';
        ctx.fillRect(beakerCx - halfW, liqTop, bWidth, bBottom - liqTop);

        // Curdled white soap floating at top (Salting-Out Effect)
        const curdTop = liqTop;
        const curdH = 28;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(beakerCx - halfW, curdTop, bWidth, curdH);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        // Bumpy curdled soap surface
        for (let x = beakerCx - halfW; x < beakerCx + halfW; x += 12) {
          ctx.beginPath();
          ctx.arc(x + 6, curdTop + curdH, 5, 0, Math.PI);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
          ctx.stroke();
        }

        // Flakes drifting at top
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 0.8;
        for (let i = 0; i < 18; i++) {
          const fx = beakerCx - halfW + 8 + ((i * 23) % (bWidth - 16));
          const fy = curdTop + 6 + ((i * 13) % 18);
          ctx.beginPath();
          ctx.ellipse(fx, fy, 4.5, 2.5, 0.3, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }

        // Meniscus
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(beakerCx - halfW, liqTop);
        ctx.lineTo(beakerCx + halfW, liqTop);
        ctx.stroke();
        ctx.restore(); // end clip
        ctx.restore(); // end beaker

        // Spatula adding NaCl crystals
        ctx.save();
        ctx.translate(beakerCx + 26, bTop - 34);
        ctx.rotate(-0.35);
        ctx.fillStyle = '#94a3b8';
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.2;
        ctx.fillRect(-35, -2, 70, 4);
        ctx.fillRect(25, -5, 20, 10);
        // Falling white salt crystals
        ctx.fillStyle = '#ffffff';
        for (let c = 0; c < 8; c++) {
          ctx.fillRect(32 + (c % 3) * 4, 10 + c * 5, 2.5, 2.5);
        }
        ctx.restore();

        // Leader lines
        drawLeader(beakerCx + 56, bTop - 20, 16, 52, 'Spatula + Serbuk NaCl');
        drawLeader(beakerCx - 20, curdTop + 14, 16, 120, 'Pepejal sabun putih terapung');
        drawLeader(beakerCx - 20, liqTop + 54, 16, 186, 'Campuran gliserol + larutan NaCl');
        drawLeader(beakerCx - halfW, bBottom - 20, 16, 240, 'Bikar kaca dibiarkan menyejuk');
      }

      // ========================================================
      // FASA 3: PENURASAN & PEMBILASAN PEPEJAL SABUN
      // ========================================================
      else if (ph === 3) {
        // Shift apparatus to right side (filterCx = 354) so left margin (x = 14..220) is completely clear for non-crossing labels
        const filterCx = 354;
        const flaskBottom = benchY;
        const flaskTop = 168;
        const flaskW = 126;
        const funnelTop = 72;
        const funnelH = 96;

        // 3D Glass Conical Flask with soft gradients and highlights
        ctx.save();
        // Flask body fill
        const flaskGrad = ctx.createLinearGradient(filterCx - flaskW / 2, 0, filterCx + flaskW / 2, 0);
        flaskGrad.addColorStop(0, 'rgba(203, 213, 225, 0.45)');
        flaskGrad.addColorStop(0.2, 'rgba(248, 250, 252, 0.7)');
        flaskGrad.addColorStop(0.7, 'rgba(226, 232, 240, 0.35)');
        flaskGrad.addColorStop(1, 'rgba(148, 163, 184, 0.5)');

        ctx.fillStyle = flaskGrad;
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(filterCx - 20, flaskTop);
        ctx.lineTo(filterCx - 20, flaskTop + 26);
        ctx.lineTo(filterCx - flaskW / 2, flaskBottom - 6);
        ctx.quadraticCurveTo(filterCx - flaskW / 2, flaskBottom, filterCx - flaskW / 2 + 10, flaskBottom);
        ctx.lineTo(filterCx + flaskW / 2 - 10, flaskBottom);
        ctx.quadraticCurveTo(filterCx + flaskW / 2, flaskBottom, filterCx + flaskW / 2, flaskBottom - 6);
        ctx.lineTo(filterCx + 20, flaskTop + 26);
        ctx.lineTo(filterCx + 20, flaskTop);
        ctx.stroke();
        ctx.fill();

        // Liquid filtrate in conical flask (gliserol + air suling + NaCl)
        ctx.save();
        ctx.beginPath();
        ctx.rect(filterCx - flaskW / 2, flaskTop + 26, flaskW, flaskBottom - flaskTop - 26);
        ctx.clip();
        const liqGrad = ctx.createLinearGradient(0, flaskBottom - 48, 0, flaskBottom);
        liqGrad.addColorStop(0, 'rgba(254, 240, 138, 0.75)');
        liqGrad.addColorStop(1, 'rgba(250, 204, 21, 0.85)');
        ctx.fillStyle = liqGrad;
        ctx.fillRect(filterCx - flaskW / 2, flaskBottom - 48, flaskW, 48);
        ctx.strokeStyle = '#ca8a04';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.ellipse(filterCx, flaskBottom - 48, flaskW / 2 - 8, 5, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // 3D Glass highlight reflection line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(filterCx - flaskW / 2 + 12, flaskBottom - 10);
        ctx.lineTo(filterCx - 14, flaskTop + 30);
        ctx.stroke();
        ctx.restore(); // end flask

        // 3D Glass Filter Funnel (Corong Turas) with depth
        ctx.save();
        const funnelGrad = ctx.createLinearGradient(filterCx - 58, 0, filterCx + 58, 0);
        funnelGrad.addColorStop(0, 'rgba(203, 213, 225, 0.5)');
        funnelGrad.addColorStop(0.3, 'rgba(248, 250, 252, 0.75)');
        funnelGrad.addColorStop(0.8, 'rgba(226, 232, 240, 0.4)');
        funnelGrad.addColorStop(1, 'rgba(148, 163, 184, 0.6)');

        ctx.fillStyle = funnelGrad;
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        // Top conical rim ellipse for 3D mouth
        ctx.moveTo(filterCx - 58, funnelTop);
        ctx.lineTo(filterCx + 58, funnelTop);
        ctx.lineTo(filterCx + 7, funnelTop + 58);
        ctx.lineTo(filterCx + 7, funnelTop + funnelH);
        ctx.lineTo(filterCx - 7, funnelTop + funnelH);
        ctx.lineTo(filterCx - 7, funnelTop + 58);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Funnel 3D top oval rim
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(filterCx, funnelTop, 58, 8, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Folded 3D Filter Paper Cone inside funnel
        ctx.save();
        const paperGrad = ctx.createLinearGradient(filterCx - 52, 0, filterCx + 52, 0);
        paperGrad.addColorStop(0, '#f1f5f9');
        paperGrad.addColorStop(0.5, '#ffffff');
        paperGrad.addColorStop(1, '#e2e8f0');
        ctx.fillStyle = paperGrad;
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(filterCx - 52, funnelTop + 2);
        ctx.lineTo(filterCx + 52, funnelTop + 2);
        ctx.lineTo(filterCx, funnelTop + 56);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // 3D Solid white soap residue mound on filter paper
        const soapMoundGrad = ctx.createRadialGradient(
          filterCx - 6,
          funnelTop + 20,
          4,
          filterCx,
          funnelTop + 24,
          36
        );
        soapMoundGrad.addColorStop(0, '#ffffff');
        soapMoundGrad.addColorStop(0.7, '#f8fafc');
        soapMoundGrad.addColorStop(1, '#cbd5e1');
        ctx.fillStyle = soapMoundGrad;
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.ellipse(filterCx, funnelTop + 26, 36, 15, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Dripping filtrate drop into conical flask
        ctx.fillStyle = '#f59e0b';
        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(filterCx, funnelTop + funnelH + 18, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore(); // end funnel

        // Clean, horizontal, non-crossing leader lines in wide left margin (x = 18..220)
        drawLeader(filterCx - 18, funnelTop + 26, 18, 56, 'Baki turasan (Pepejal sabun)');
        drawLeader(filterCx - 52, funnelTop + 14, 18, 108, 'Corong turas & Kertas turas');
        drawLeader(filterCx - 20, flaskTop + 12, 18, 160, 'Kelalang kon');
        drawLeader(filterCx - 42, flaskBottom - 24, 18, 222, 'Hasil turasan (Gliserol + NaCl)');
      }

      // ========================================================
      // FASA 4: UJIAN SIFAT SABUN YANG DIHASILKAN
      // ========================================================
      else {
        // 3 mini test stations across canvas:
        // Station 1 (left): Rasa licin (Touch test on watch glass)
        // Station 2 (middle): Tabung uji berbuih (Lather test)
        // Station 3 (right): Kertas litmus merah bertukar biru
        const s1x = 100;
        const s2x = 265;
        const s3x = 425;

        // Station 1: Watch Glass with soap cake
        ctx.save();
        ctx.fillStyle = '#f1f5f9';
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(s1x, benchY - 4, 38, 10, 0, 0, Math.PI);
        ctx.fill();
        ctx.stroke();

        // Soap cake / bar
        ctx.fillStyle = alk === 'naoh' ? '#fde047' : '#fbcfe8';
        ctx.strokeStyle = '#854d0e';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.roundRect(s1x - 22, benchY - 26, 44, 20, 4);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#0f172a';
        ctx.font = '800 8.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('SABUN', s1x, benchY - 14);

        // Finger touching soap
        if (test === 'touch') {
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.moveTo(s1x - 10, benchY - 58);
          ctx.lineTo(s1x - 4, benchY - 28);
          ctx.stroke();
          // Sparkle feeling
          ctx.fillStyle = '#d97706';
          ctx.font = '800 8.5px ui-sans-serif, system-ui, sans-serif';
          ctx.fillText('Terasa Licin! ✨', s1x, benchY - 44);
        }
        ctx.fillStyle = '#0f172a';
        ctx.font = '800 10px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('1. Ujian Rasa Licin', s1x, 78);
        ctx.font = '600 8px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(alk === 'naoh' ? 'Sabun buku keras (NaOH)' : 'Sabun cecair lembut (KOH)', s1x, 92);
        ctx.restore();

        // Station 2: Test Tube Shaken with Water (Lather)
        ctx.save();
        const ttTop = 110;
        const ttBottom = benchY;
        const ttW = 28;
        ctx.fillStyle = 'rgba(241, 245, 249, 0.45)';
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(s2x - ttW / 2, ttTop);
        ctx.lineTo(s2x - ttW / 2, ttBottom - ttW / 2);
        ctx.arc(s2x, ttBottom - ttW / 2, ttW / 2, Math.PI, 0, true);
        ctx.lineTo(s2x + ttW / 2, ttTop);
        ctx.stroke();
        ctx.fill();

        // Water in bottom
        ctx.save();
        ctx.beginPath();
        ctx.rect(s2x - ttW / 2, ttBottom - 54, ttW, 54);
        ctx.clip();
        ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.fillRect(s2x - ttW / 2, ttBottom - 54, ttW, 54);
        ctx.restore();

        // Rich lather foam bubbles
        if (test === 'lather') {
          for (let fb = 0; fb < 22; fb++) {
            const bx = s2x - 10 + ((fb * 7) % 20);
            const by = ttBottom - 44 - (fb * 3.2);
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          }
          ctx.fillStyle = '#0284c7';
          ctx.font = '800 8.5px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Buih Banyak! 🫧', s2x, ttTop - 12);
        }
        ctx.fillStyle = '#0f172a';
        ctx.font = '800 10px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('2. Ujian Buih', s2x, 78);
        ctx.font = '600 8px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Goncang bersama air', s2x, 92);
        ctx.restore();

        // Station 3: Litmus Paper Test (Red turns blue)
        ctx.save();
        // Moist red litmus paper turns blue at touched end
        const litX = s3x;
        const litY = benchY - 32;

        ctx.fillStyle = test === 'litmus' ? '#2563eb' : '#dc2626';
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.roundRect(litX - 12, litY, 24, 32, 2);
        ctx.fill();
        ctx.stroke();

        // Litmus drop / reaction zone
        if (test === 'litmus') {
          ctx.fillStyle = '#1d4ed8';
          ctx.beginPath();
          ctx.arc(litX, litY + 16, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#1d4ed8';
          ctx.font = '800 8.5px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Merah → Biru! (Alkali)', s3x, litY - 14);
        } else {
          ctx.fillStyle = '#991b1b';
          ctx.font = '700 8px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Kertas litmus merah', s3x, litY - 10);
        }

        ctx.fillStyle = '#0f172a';
        ctx.font = '800 10px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('3. Ujian Kertas Litmus', s3x, 78);
        ctx.font = '600 8px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Sifat beralkali lemah', s3x, 92);
        ctx.restore();
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
      className="w-full max-w-[540px] aspect-[540/320] mx-auto block rounded-xl border border-slate-200 bg-white shadow-inner"
    />
  );
};

// ============================================================
// CANVAS 2: KANTA PEMBESAR SUBMIKROSKOPIK (ESTER & ANION SABUN)
// ============================================================
interface SaponificationSubmicroscopicCanvasProps {
  phase: SoapPhase;
  alkali: AlkaliType;
}

export const SaponificationSubmicroscopicCanvas: React.FC<
  SaponificationSubmicroscopicCanvasProps
> = ({ phase, alkali }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ phase, alkali });
  stateRef.current = { phase, alkali };

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
      const cssH = 320;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      const { phase: ph, alkali: alk } = stateRef.current;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, cssW, cssH);

      const cx = 160;
      const cy = 146;
      const r = 98;

      // Circular magnifier viewport
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.clip();

      // ========================================================
      // FASA 1: PEMECAHAN IKATAN ESTER TRIGLISERIDA
      // ========================================================
      if (ph === 1) {
        // Triglyceride backbone: Glycerol stem (vertical) + 3 Fatty acid chains
        const stemX = cx - 44;
        const cutPhase = (Math.sin(t * 3) + 1) / 2; // 0 to 1

        // 3 Ester levels
        [-36, 0, 36].forEach((yOff, i) => {
          const ey = cy + yOff;

          // Glycerol backbone CH2-CH-CH2
          ctx.fillStyle = '#0284c7';
          ctx.beginPath();
          ctx.arc(stemX, ey, 9, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '800 6px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(i === 1 ? 'CH' : 'CH₂', stemX, ey);

          // Ester linkage -COO- (Scissors / cleavage line)
          const esterX = stemX + 28;
          ctx.fillStyle = '#dc2626';
          ctx.font = '800 7px ui-sans-serif, system-ui, sans-serif';
          ctx.fillText('-COO-', esterX, ey);

          // Cleavage dashed cut
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([2, 2]);
          ctx.beginPath();
          ctx.moveTo(esterX + 10, ey - 10);
          ctx.lineTo(esterX + 10, ey + 10);
          ctx.stroke();
          ctx.setLineDash([]);

          // Fatty acid hydrocarbon tail (wiggly chain R-)
          const tailStartX = esterX + 18 + cutPhase * 8;
          ctx.strokeStyle = '#d97706';
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.moveTo(tailStartX, ey);
          ctx.lineTo(tailStartX + 12, ey - 5);
          ctx.lineTo(tailStartX + 24, ey + 5);
          ctx.lineTo(tailStartX + 36, ey - 5);
          ctx.lineTo(tailStartX + 46, ey);
          ctx.stroke();

          // Incoming OH- from alkali
          const ohX = esterX + 12 - (1 - cutPhase) * 6;
          ctx.fillStyle = '#2563eb';
          ctx.beginPath();
          ctx.arc(ohX, ey - 14, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '800 6px ui-sans-serif, system-ui, sans-serif';
          ctx.fillText('OH⁻', ohX, ey - 14);
        });

        // Submicroscopic notes
        ctx.fillStyle = '#0f172a';
        ctx.font = '800 8.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Hidrolisis Beralkali Ester (Minyak)', cx, cy + 74);
      }

      // ========================================================
      // FASA 2: SALTING-OUT DENGAN ION Na+ & Cl-
      // ========================================================
      else if (ph === 2) {
        // Precipitating soap micelle / cluster pushed together by hydrated Na+ & Cl-
        const soapX = cx;
        const soapY = cy + 10;

        // Clustered soap molecules in center
        for (let s = 0; s < 6; s++) {
          const ang = (s * Math.PI) / 3;
          const headX = soapX + Math.cos(ang) * 22;
          const headY = soapY + Math.sin(ang) * 22;
          const tailEndX = soapX + Math.cos(ang) * 44;
          const tailEndY = soapY + Math.sin(ang) * 44;

          // Tail
          ctx.strokeStyle = '#d97706';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(headX, headY);
          ctx.lineTo(tailEndX, tailEndY);
          ctx.stroke();

          // Ionic Head -COO-
          ctx.fillStyle = '#dc2626';
          ctx.beginPath();
          ctx.arc(headX, headY, 6, 0, Math.PI * 2);
          ctx.fill();
        }

        // Surrounding Na+ and Cl- ions attracting water
        const ions = [
          { l: 'Na⁺', x: cx - 56, y: cy - 44, c: '#7c3aed' },
          { l: 'Cl⁻', x: cx + 56, y: cy - 44, c: '#059669' },
          { l: 'Na⁺', x: cx - 62, y: cy + 42, c: '#7c3aed' },
          { l: 'Cl⁻', x: cx + 62, y: cy + 42, c: '#059669' },
          { l: 'H₂O', x: cx, y: cy - 62, c: '#0284c7' },
        ];
        ions.forEach((ion) => {
          ctx.fillStyle = ion.c;
          ctx.beginPath();
          ctx.arc(ion.x, ion.y, 8.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '800 6.5px ui-sans-serif, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(ion.l, ion.x, ion.y);
        });

        ctx.fillStyle = '#0f172a';
        ctx.font = '800 8.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('NaCl Mengurangkan Keterlarutan Sabun', cx, cy + 74);
      }

      // ========================================================
      // FASA 3 & 4: STRUKTUR ANION SABUN (TADPOLE STRUCTURE)
      // ========================================================
      else {
        // Detailed 3D Tadpole Molecule (Anion Sabun, RCOO-)
        const headX = cx + 38;
        const headY = cy - 4;

        // Hydrocarbon Tail (Wiggly hydrophobic chain with 3D cylindrical shading, zig-zag)
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 3.6;
        ctx.beginPath();
        ctx.moveTo(cx - 72, headY);
        ctx.lineTo(cx - 56, headY - 14);
        ctx.lineTo(cx - 40, headY + 14);
        ctx.lineTo(cx - 24, headY - 14);
        ctx.lineTo(cx - 8, headY + 14);
        ctx.lineTo(cx + 8, headY - 14);
        ctx.lineTo(headX - 22, headY);
        ctx.stroke();

        // 3D Spherical Ionic Head -COO- (Hydrophilic head)
        const headGrad = ctx.createRadialGradient(
          headX - 6,
          headY - 6,
          4,
          headX,
          headY,
          24
        );
        headGrad.addColorStop(0, '#f87171');
        headGrad.addColorStop(0.6, '#dc2626');
        headGrad.addColorStop(1, '#7f1d1d');
        ctx.fillStyle = headGrad;
        ctx.strokeStyle = '#450a0a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(headX, headY, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = '800 10.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('−COO⁻', headX, headY);

        // Counter ion (Na+ or K+) floating nearby with 3D sphere gradient
        const counterL = alk === 'naoh' ? 'Na⁺' : 'K⁺';
        const counterX = headX + 32;
        const counterY = headY - 28;
        const counterGrad = ctx.createRadialGradient(
          counterX - 3,
          counterY - 3,
          2,
          counterX,
          counterY,
          11
        );
        counterGrad.addColorStop(0, '#c084fc');
        counterGrad.addColorStop(0.7, '#7c3aed');
        counterGrad.addColorStop(1, '#4c1d95');
        ctx.fillStyle = counterGrad;
        ctx.beginPath();
        ctx.arc(counterX, counterY, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '800 7px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText(counterL, counterX, counterY);

        // Labels positioned clearly inside lens without clipping
        ctx.fillStyle = '#b45309';
        ctx.font = '800 8.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Ekor Hidrokarbon (R−)', cx - 38, cy - 36);
        ctx.font = '700 7.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Hidrofobik (Larut gris)', cx - 38, cy - 26);

        ctx.fillStyle = '#dc2626';
        ctx.font = '800 8.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Kepala Ionik (−COO⁻)', headX, cy + 32);
        ctx.font = '700 7.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Hidrofilik (Larut air)', headX, cy + 42);

        ctx.fillStyle = '#0f172a';
        ctx.font = '800 9px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Struktur Zarah Anion Sabun', cx, cy + 68);
      }

      ctx.restore(); // end circle clip

      // Magnifier Lens Outer Rim
      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      // Top title
      ctx.fillStyle = '#0f172a';
      ctx.font = '800 11px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        ph === 1
          ? 'Pemecahan Ikatan Ester'
          : ph === 2
          ? 'Mekanisme Salting-Out'
          : 'Anatomi Molekul Sabun',
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
      className="w-full max-w-[320px] aspect-[320/320] mx-auto block rounded-xl border border-slate-200 bg-slate-50 shadow-inner"
    />
  );
};

// ============================================================
// MAIN COMPONENT: SIMULASI PENGHASILAN SABUN (SAPONIFIKASI)
// ============================================================
export const SoapMakingLab: React.FC = () => {
  const [phase, setPhase] = useState<SoapPhase>(1);
  const [alkali, setAlkali] = useState<AlkaliType>('naoh');
  const [isBoiling, setIsBoiling] = useState<boolean>(false);
  const [boilProgress, setBoilProgress] = useState<number>(0);
  const [testActive, setTestActive] = useState<'touch' | 'lather' | 'litmus' | null>(null);

  // KBAT Challenge Questions state
  const [kbatAnswers, setKbatAnswers] = useState<{
    q1: 'solubility' | 'emulsify' | null;
    q2: 'hydrolysis' | 'neutralise' | null;
  }>({
    q1: null,
    q2: null,
  });

  // Action: Boil mixture in Phase 1
  const handleBoil = () => {
    setIsBoiling(true);
    setBoilProgress(0);
    analytics.recordSimulationClick(SIM_ID, 1);

    const start = performance.now();
    const duration = 2400;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setBoilProgress(p);
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        setIsBoiling(false);
      }
    };
    requestAnimationFrame(tick);
  };

  const handleNextPhase = () => {
    if (phase < 4) {
      const next = (phase + 1) as SoapPhase;
      setPhase(next);
      analytics.recordSimulationClick(SIM_ID, next);
      if (next === 4) {
        analytics.recordSimulationCompleted(SIM_ID);
        confetti({ particleCount: 60, spread: 60 });
      }
    }
  };

  const handleReset = () => {
    setPhase(1);
    setIsBoiling(false);
    setBoilProgress(0);
    setTestActive(null);
  };

  return (
    <div className="space-y-3 font-sans text-slate-900">
      {/* 1. BAR KEMAJUAN 4 FASA & KAWALAN ALKALI */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Step Indicators */}
        <div className="grid grid-cols-4 gap-1.5 flex-1">
          {[
            { num: 1, label: '1. Pendidihan (NaOH/KOH)' },
            { num: 2, label: '2. Pemendakan (NaCl)' },
            { num: 3, label: '3. Penurasan & Bilas' },
            { num: 4, label: '4. Ujian Sifat Sabun' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setPhase(s.num as SoapPhase)}
              className={`p-2 rounded-xl text-center text-[10.5px] font-extrabold border transition cursor-pointer ${
                phase === s.num
                  ? 'bg-pink-600 text-white border-pink-600 shadow-sm'
                  : phase > s.num
                  ? 'bg-pink-50 text-pink-700 border-pink-200'
                  : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Alkali Selector & Reset */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs">
            <span className="text-[10px] font-bold text-slate-500 px-1">Alkali:</span>
            <button
              onClick={() => {
                setAlkali('naoh');
                handleReset();
              }}
              className={`px-2 py-1 rounded-lg text-[10.5px] font-extrabold transition cursor-pointer ${
                alkali === 'naoh'
                  ? 'bg-slate-900 text-white'
                  : 'bg-transparent text-slate-700 hover:bg-slate-200'
              }`}
            >
              NaOH (Sabun Keras)
            </button>
            <button
              onClick={() => {
                setAlkali('koh');
                handleReset();
              }}
              className={`px-2 py-1 rounded-lg text-[10.5px] font-extrabold transition cursor-pointer ${
                alkali === 'koh'
                  ? 'bg-slate-900 text-white'
                  : 'bg-transparent text-slate-700 hover:bg-slate-200'
              }`}
            >
              KOH (Sabun Lembut)
            </button>
          </div>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold cursor-pointer transition flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Set Semula</span>
          </button>
        </div>
      </div>

      {/* 2. GRID UTAMA: KANVAS RADAS MAKMAL & KANTA PEMBESAR SUBMIKROSKOPIK */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-2.5">
        {/* Kanvas Radas Makmal 4 Fasa */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
              <Beaker className="w-4 h-4 text-pink-600" />
              <span>
                {phase === 1 && 'Fasa 1: Pendidihan Minyak Sawit bersama Alkali Pekat'}
                {phase === 2 && 'Fasa 2: Pemendakan Sabun (Penambahan Serbuk NaCl Tepu)'}
                {phase === 3 && 'Fasa 3: Penurasan & Pembilasan Mendakan Sabun'}
                {phase === 4 && 'Fasa 4: Stesen Ujian Sifat Sabun yang Terhasil'}
              </span>
            </span>

            {/* Next phase action button */}
            {phase < 4 && (
              <button
                onClick={handleNextPhase}
                className="px-2.5 py-1 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-[11px] font-extrabold shadow-sm cursor-pointer transition flex items-center gap-1"
              >
                <span>Fasa Seterusnya</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>

          <SaponificationApparatusCanvas
            phase={phase}
            alkali={alkali}
            isBoiling={isBoiling}
            boilProgress={boilProgress}
            testActive={testActive}
          />

          {/* Action buttons & Observations based on active phase */}
          <div className="space-y-2">
            {phase === 1 && (
              <div className="flex flex-wrap items-center justify-between gap-2 bg-pink-50/60 p-2 rounded-xl border border-pink-200">
                <span className="text-[11px] text-pink-900 font-medium">
                  {isBoiling
                    ? 'Campuran sedang mendidih dan dikacau. Ester minyak sawit mengalami hidrolisis beralkali.'
                    : 'Klik butang untuk memulakan pendidihan campuran minyak sawit dan larutan alkali.'}
                </span>
                <button
                  onClick={handleBoil}
                  disabled={isBoiling}
                  className="px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white text-xs font-extrabold shadow-sm cursor-pointer transition flex items-center gap-1"
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Didihkan & Kacau Campuran</span>
                </button>
              </div>
            )}

            {phase === 2 && (
              <div className="text-[11px] text-slate-700 bg-amber-50 p-2 rounded-xl border border-amber-200 leading-relaxed">
                <strong>Pemerhatian Pemendakan (*Salting-Out*):</strong> Penambahan serbuk natrium
                klorida (NaCl) mengurangkan keterlarutan sabun dalam air. Pepejal sabun putih termendak
                keluar dan terapung di permukaan cecair.
              </div>
            )}

            {phase === 3 && (
              <div className="text-[11px] text-slate-700 bg-sky-50 p-2 rounded-xl border border-sky-200 leading-relaxed">
                <strong>Penurasan & Pengeringan:</strong> Pepejal sabun terasing sebagai baki turasan di
                atas kertas turas, manakala gliserol dan larutan NaCl mengalir ke dalam kelalang kon
                sebagai hasil turasan. Pepejal sabun dibilas dengan sedikit air suling sejuk dan
                dikeringkan.
              </div>
            )}

            {phase === 4 && (
              <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-700">Pilih Ujian Sifat:</span>
                <button
                  onClick={() => setTestActive('touch')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                    testActive === 'touch'
                      ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  1. Sentuhan Jari
                </button>
                <button
                  onClick={() => setTestActive('lather')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                    testActive === 'lather'
                      ? 'bg-sky-500 text-white border-sky-500 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  2. Goncang bersama Air
                </button>
                <button
                  onClick={() => setTestActive('litmus')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                    testActive === 'litmus'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  3. Kertas Litmus Merah
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Kanta Pembesar Submikroskopik (Pemecahan Ester & Struktur Sabun) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between space-y-2">
          <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-pink-600" />
            <span>Kanta Submikroskopik: Anatomi Molekul Sabun</span>
          </div>

          <SaponificationSubmicroscopicCanvas phase={phase} alkali={alkali} />

          <div className="text-[10px] text-slate-700 bg-pink-50 p-2.5 rounded-xl border border-pink-200 leading-relaxed">
            {phase === 1 && (
              <span>
                <strong>Tindak Balas Hidrolisis Beralkali:</strong> 1 molekul trigliserida (ester)
                dipecahkan oleh 3 molekul alkali pekat menghasilkan 3 molekul garam asid lemak (sabun)
                dan 1 molekul gliserol.
              </span>
            )}
            {phase === 2 && (
              <span>
                <strong>Kesan *Salting Out*:</strong> Ion Na⁺ dan Cl⁻ daripada garam biasa menarik
                molekul air di sekeliling molekul sabun, menyebabkan sabun berkumpul dan termendak.
              </span>
            )}
            {(phase === 3 || phase === 4) && (
              <span>
                <strong>Struktur Berudu Sabun:</strong> Kepala ionik (−COO⁻) bersifat{' '}
                <strong>hidrofilik</strong> (larut air), manakala ekor hidrokarbon (R−) bersifat{' '}
                <strong>hidrofobik</strong> (larut gris).
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. BARIS BAWAH: PERSAMAAN PERKATAAN & KUIZ KBAT KSSM */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1.25fr] gap-2.5">
        {/* Persamaan Perkataan Saponifikasi */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm space-y-2">
          <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500">
            Persamaan Perkataan Tindak Balas Saponifikasi (KSSM)
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 text-white font-mono text-[10.5px] leading-snug">
            Minyak / Lemak (Ester) +{' '}
            <span className="text-pink-300">
              {alkali === 'naoh' ? 'Natrium hidroksida' : 'Kalium hidroksida'}
            </span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;↓ (dipanaskan / dididihkan)
            <br />
            <span className="text-amber-300">
              {alkali === 'naoh'
                ? 'Garam natrium asid lemak (Sabun Keras)'
                : 'Garam kalium asid lemak (Sabun Lembut)'}
            </span>{' '}
            + <span className="text-sky-300">Gliserol (Propan-1,2,3-triol)</span>
          </div>

          <div className="text-[10px] text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-200">
            *Gliserol ialah alkohol trihidrik semulajadi yang bertindak sebagai pelembap kulit dalam
            penyediaan sabun.
          </div>
        </div>

        {/* Uji Kefahaman Fungsi Bahan (KBAT Pantas) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm space-y-2">
          <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center justify-between">
            <span>Uji Kefahaman Fungsi Bahan (KBAT SPM)</span>
            <span className="text-[9.5px] text-pink-600 font-bold">2 Soalan</span>
          </div>

          <div className="space-y-2 text-xs">
            {/* Soalan 1 */}
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="font-bold text-slate-800 text-[10.5px]">
                1. Apakah fungsi penambahan serbuk natrium klorida (NaCl)?
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setKbatAnswers((k) => ({ ...k, q1: 'solubility' }))}
                  className={`flex-1 py-1 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                    kbatAnswers.q1 === 'solubility'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  Kurangkan keterlarutan sabun (Betul)
                </button>
                <button
                  onClick={() => setKbatAnswers((k) => ({ ...k, q1: 'emulsify' }))}
                  className={`flex-1 py-1 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                    kbatAnswers.q1 === 'emulsify'
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  Sebagai mangkin tindak balas
                </button>
              </div>
            </div>

            {/* Soalan 2 */}
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="font-bold text-slate-800 text-[10.5px]">
                2. Mengapakah larutan alkali PEKAT digunakan dan bukannya cair?
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setKbatAnswers((k) => ({ ...k, q2: 'hydrolysis' }))}
                  className={`flex-1 py-1 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                    kbatAnswers.q2 === 'hydrolysis'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  Memastikan hidrolisis lengkap ester (Betul)
                </button>
                <button
                  onClick={() => setKbatAnswers((k) => ({ ...k, q2: 'neutralise' }))}
                  className={`flex-1 py-1 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                    kbatAnswers.q2 === 'neutralise'
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  Menghilangkan bau minyak
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoapMakingLab;
