import React, { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Droplets,
  Flame,
  FlaskConical,
  Info,
  RotateCcw,
  Sparkles,
  Thermometer,
} from 'lucide-react';
import { analytics } from '../services/analytics';

type Phase = 1 | 2 | 3;
type CondenserFlow = 'correct' | 'wrong';

interface FermentationCanvasProps {
  temp: number;
  isRunning: boolean;
  ethanolPct: number;
}

const FermentationMacroCanvas: React.FC<FermentationCanvasProps> = ({
  temp,
  isRunning,
  ethanolPct,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ temp, isRunning, ethanolPct });
  stateRef.current = { temp, isRunning, ethanolPct };

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
      title: string,
      subtitle?: string
    ) => {
      ctx.save();
      ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
      ctx.textBaseline = 'middle';
      const mainTw = ctx.measureText(title).width;
      ctx.font = '600 8.5px ui-sans-serif, system-ui, sans-serif';
      const subTw = subtitle ? ctx.measureText(subtitle).width : 0;
      const maxTw = Math.max(mainTw, subTw);

      let lineStartX = textX;
      let lineStartY = textY;

      if (side === 'left') {
        ctx.textAlign = 'left';
        ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.fillText(title, textX, textY - (subtitle ? 5 : 0));
        if (subtitle) {
          ctx.font = '600 8.5px ui-sans-serif, system-ui, sans-serif';
          ctx.fillStyle = '#64748b';
          ctx.fillText(subtitle, textX, textY + 7);
        }
        lineStartX = textX + maxTw + 4;
        lineStartY = textY;
      } else if (side === 'right') {
        ctx.textAlign = 'right';
        ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.fillText(title, textX, textY - (subtitle ? 5 : 0));
        if (subtitle) {
          ctx.font = '600 8.5px ui-sans-serif, system-ui, sans-serif';
          ctx.fillStyle = '#64748b';
          ctx.fillText(subtitle, textX, textY + 7);
        }
        lineStartX = textX - maxTw - 4;
        lineStartY = textY;
      } else if (side === 'top') {
        ctx.textAlign = 'center';
        ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.fillText(title, textX, textY);
        lineStartX = textX;
        lineStartY = textY + 6;
      } else {
        ctx.textAlign = 'center';
        ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.fillText(title, textX, textY);
        lineStartX = textX;
        lineStartY = textY - 6;
      }

      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(lineStartX, lineStartY);

      if (Math.abs(lineStartX - targetX) > 16 && Math.abs(lineStartY - targetY) > 6) {
        const shelfLen = side === 'left' ? 10 : side === 'right' ? -10 : 0;
        if (shelfLen !== 0) {
          ctx.lineTo(lineStartX + shelfLen, lineStartY);
          ctx.lineTo(targetX, targetY);
        } else {
          ctx.lineTo(targetX, targetY);
        }
      } else {
        ctx.lineTo(targetX, targetY);
      }
      ctx.stroke();

      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(targetX, targetY, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const render = (now: number) => {
      const t = (now - startMs) / 1000;
      const dpr = window.devicePixelRatio || 1;
      const cssW = 480;
      const cssH = 240;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      const { temp: curTemp, isRunning: running, ethanolPct: eth } = stateRef.current;
      const isOptimum = curTemp >= 30 && curTemp <= 37;
      const isCold = curTemp < 30;
      const isHot = curTemp > 45;
      const activeBubbling = running && !isHot && eth < 14.8;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);

      // Clean white lab background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, cssW, cssH);

      // Bench
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(16, 214, 448, 8);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(16, 222, 448, 2);

      // 1. Conical Flask (Left: cx = 135)
      const fCx = 135;
      const drawFlaskPath = () => {
        ctx.beginPath();
        ctx.moveTo(fCx - 15, 78);
        ctx.lineTo(fCx - 15, 108);
        ctx.lineTo(fCx - 58, 198);
        ctx.quadraticCurveTo(fCx - 60, 214, fCx - 44, 214);
        ctx.lineTo(fCx + 44, 214);
        ctx.quadraticCurveTo(fCx + 60, 214, fCx + 58, 198);
        ctx.lineTo(fCx + 15, 108);
        ctx.lineTo(fCx + 15, 78);
        ctx.closePath();
      };

      // Liquid inside flask (glucose + yeast)
      ctx.save();
      drawFlaskPath();
      ctx.clip();
      ctx.fillStyle = isHot ? '#fef2f2' : '#fef9c3';
      ctx.fillRect(fCx - 65, 142, 130, 75);
      ctx.strokeStyle = '#eab308';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(fCx - 65, 142);
      ctx.lineTo(fCx + 65, 142);
      ctx.stroke();

      // Yeast sediment particles at bottom
      ctx.fillStyle = '#ca8a04';
      for (let p = 0; p < 12; p++) {
        const px = fCx - 42 + ((p * 15) % 84);
        const py = 210 - (p % 3) * 3;
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bubbles inside flask
      if (activeBubbling) {
        const count = isOptimum ? 14 : isCold ? 3 : 6;
        for (let i = 0; i < count; i++) {
          const speed = isOptimum ? 1.4 : 0.4;
          const bt = (t * speed + i * 0.23) % 1;
          const bx = fCx - 36 + ((i * 19) % 72) + Math.sin(t * 4 + i) * 3;
          const by = 208 - bt * 64;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(bx, by, 2.5 + (i % 2), 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }
      ctx.restore();

      // Flask outline
      drawFlaskPath();
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Rubber stopper
      ctx.fillStyle = '#475569';
      ctx.fillRect(fCx - 14, 68, 28, 14);
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(fCx - 14, 68, 28, 14);

      // Delivery tube (Salur penghantar)
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 4.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(fCx, 72);
      ctx.lineTo(fCx, 36);
      ctx.lineTo(345, 36);
      ctx.lineTo(345, 186);
      ctx.stroke();

      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(fCx, 72);
      ctx.lineTo(fCx, 36);
      ctx.lineTo(345, 36);
      ctx.lineTo(345, 186);
      ctx.stroke();

      // 2. Test Tube with Limewater (Right: cx = 345)
      const tCx = 345;
      // Test tube stand base
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(tCx - 32, 206, 64, 8);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(tCx - 32, 206, 64, 8);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(tCx - 16, 92);
      ctx.lineTo(tCx - 16, 188);
      ctx.arc(tCx, 188, 16, Math.PI, 0, true);
      ctx.lineTo(tCx + 16, 92);

      // Limewater turbidity
      const turbidity = Math.min(1, eth / 8);
      ctx.save();
      ctx.clip();
      ctx.fillStyle = `rgba(226, 232, 240, ${0.35 + turbidity * 0.6})`;
      ctx.fillRect(tCx - 18, 132, 36, 75);
      if (turbidity > 0.25) {
        // White precipitate particles
        ctx.fillStyle = `rgba(255, 255, 255, ${turbidity * 0.95})`;
        for (let k = 0; k < 16; k++) {
          const px = tCx - 11 + ((k * 11) % 22);
          const py = 142 + ((k * 17) % 52);
          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2.2;
      ctx.stroke();
      ctx.restore();

      // Bubbles exiting delivery tube into limewater
      if (activeBubbling) {
        const count = isOptimum ? 5 : 2;
        for (let b = 0; b < count; b++) {
          const bt = (t * (isOptimum ? 1.5 : 0.5) + b * 0.3) % 1;
          const bx = tCx + Math.sin(t * 6 + b) * 3;
          const by = 186 - bt * 46;
          ctx.fillStyle = '#ffffff';
          ctx.strokeStyle = '#475569';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(bx, by, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }

      // Crisp Textbook Leader Lines & Labels
      drawTextbookLabel(fCx, 74, 'left', 16, 74, 'Penyumbat getah');
      drawTextbookLabel(240, 36, 'top', 240, 18, 'Salur penghantar');
      drawTextbookLabel(fCx - 42, 168, 'left', 16, 168, 'Campuran glukosa + yis');
      drawTextbookLabel(
        tCx + 16,
        155,
        'right',
        464,
        155,
        turbidity > 0.35 ? 'Air kapur keruh' : 'Air kapur jernih',
        '(Mengesan CO₂)'
      );

      // Temperature badge inside canvas
      ctx.fillStyle = isHot ? '#dc2626' : isOptimum ? '#059669' : '#0284c7';
      ctx.font = '800 11px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Suhu Penapaian: ${curTemp} °C`, fCx, 126);

      ctx.restore();
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full max-w-[480px] aspect-[480/240] mx-auto block rounded-xl border border-slate-200 bg-white"
    />
  );
};

const FermentationMicroCanvas: React.FC<{ temp: number; isRunning: boolean }> = ({
  temp,
  isRunning,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ temp, isRunning });
  stateRef.current = { temp, isRunning };

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
      const cssH = 225;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      const { temp: curTemp, isRunning: running } = stateRef.current;
      const isOptimum = curTemp >= 30 && curTemp <= 37;
      const isHot = curTemp > 45;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, cssW, cssH);

      // Magnifier circle
      ctx.strokeStyle = isHot ? '#ef4444' : isOptimum ? '#10b981' : '#3b82f6';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(125, 112, 92, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // Zimase enzyme blob
      ctx.fillStyle = isHot ? '#fecaca' : '#fef08a';
      ctx.strokeStyle = isHot ? '#dc2626' : '#ca8a04';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(68, 52, 114, 34, 14);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isHot ? '#991b1b' : '#854d0e';
      ctx.font = '800 10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        isHot ? 'Enzim Zimase Ternyahasli!' : 'Enzim Zimase (Yis)',
        125,
        72
      );

      // Glucose molecule splitting
      const splitProgress = running && !isHot ? (t * (isOptimum ? 0.65 : 0.25)) % 1 : 0;

      if (splitProgress < 0.45) {
        // Glucose pill
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.roundRect(80, 110, 90, 26, 13);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '800 10.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('Glukosa (C₆H₁₂O₆)', 125, 126);
      } else {
        // 2 Ethanol + 2 CO2
        const sep = (splitProgress - 0.45) * 36;
        // Ethanol (Blue)
        ctx.fillStyle = '#2563eb';
        ctx.beginPath();
        ctx.roundRect(45, 108 + sep * 0.3, 74, 24, 12);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '800 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillText('2 C₂H₅OH', 82, 123 + sep * 0.3);

        // CO2 (Red/Slate)
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.roundRect(132, 108 - sep * 0.3, 70, 24, 12);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillText('2 CO₂ ↑', 167, 123 - sep * 0.3);
      }

      ctx.fillStyle = '#475569';
      ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText(
        isHot
          ? 'Struktur enzim rosak pada suhu tinggi'
          : isOptimum
          ? 'Penguraian aktif pada suhu optimum'
          : running
          ? 'Tindak balas perlahan (suhu rendah)'
          : 'Tekan "Mulakan Penapaian"',
        125,
        180
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
      className="w-full max-w-[250px] aspect-[250/225] mx-auto block rounded-xl border border-slate-200 bg-slate-50"
    />
  );
};

interface DistillationCanvasProps {
  isHeating: boolean;
  thermometerTemp: number;
  condenserFlow: CondenserFlow;
  collectedPct: number;
}

const DistillationMacroCanvas: React.FC<DistillationCanvasProps> = ({
  isHeating,
  thermometerTemp,
  condenserFlow,
  collectedPct,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ isHeating, thermometerTemp, condenserFlow, collectedPct });
  stateRef.current = { isHeating, thermometerTemp, condenserFlow, collectedPct };

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
      title: string,
      subtitle?: string
    ) => {
      ctx.save();
      ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
      ctx.textBaseline = 'middle';
      const mainTw = ctx.measureText(title).width;
      ctx.font = '600 8.5px ui-sans-serif, system-ui, sans-serif';
      const subTw = subtitle ? ctx.measureText(subtitle).width : 0;
      const maxTw = Math.max(mainTw, subTw);

      let lineStartX = textX;
      let lineStartY = textY;

      if (side === 'left') {
        ctx.textAlign = 'left';
        ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.fillText(title, textX, textY - (subtitle ? 5 : 0));
        if (subtitle) {
          ctx.font = '600 8.5px ui-sans-serif, system-ui, sans-serif';
          ctx.fillStyle = '#64748b';
          ctx.fillText(subtitle, textX, textY + 7);
        }
        lineStartX = textX + maxTw + 4;
        lineStartY = textY;
      } else if (side === 'right') {
        ctx.textAlign = 'right';
        ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.fillText(title, textX, textY - (subtitle ? 5 : 0));
        if (subtitle) {
          ctx.font = '600 8.5px ui-sans-serif, system-ui, sans-serif';
          ctx.fillStyle = '#64748b';
          ctx.fillText(subtitle, textX, textY + 7);
        }
        lineStartX = textX - maxTw - 4;
        lineStartY = textY;
      } else if (side === 'top') {
        ctx.textAlign = 'center';
        ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.fillText(title, textX, textY);
        lineStartX = textX;
        lineStartY = textY + 6;
      } else {
        ctx.textAlign = 'center';
        ctx.font = '700 9.5px ui-sans-serif, system-ui, sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.fillText(title, textX, textY);
        lineStartX = textX;
        lineStartY = textY - 6;
      }

      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(lineStartX, lineStartY);

      if (Math.abs(lineStartX - targetX) > 16 && Math.abs(lineStartY - targetY) > 6) {
        const shelfLen = side === 'left' ? 10 : side === 'right' ? -10 : 0;
        if (shelfLen !== 0) {
          ctx.lineTo(lineStartX + shelfLen, lineStartY);
          ctx.lineTo(targetX, targetY);
        } else {
          ctx.lineTo(targetX, targetY);
        }
      } else {
        ctx.lineTo(targetX, targetY);
      }
      ctx.stroke();

      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(targetX, targetY, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const render = (now: number) => {
      const t = (now - startMs) / 1000;
      const dpr = window.devicePixelRatio || 1;
      const cssW = 500;
      const cssH = 250;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      const {
        isHeating: heating,
        thermometerTemp: temp,
        condenserFlow: flow,
        collectedPct: collected,
      } = stateRef.current;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, cssW, cssH);

      // Lab bench
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(12, 222, 476, 8);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(12, 230, 476, 2);

      // ==========================================
      // 1. RETORT STAND 1 (Left, holding flask)
      // ==========================================
      const rs1X = 42;
      ctx.fillStyle = '#64748b';
      ctx.fillRect(rs1X - 22, 214, 44, 8);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(rs1X - 22, 214, 44, 8);
      // Rod
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(rs1X - 2.5, 26, 5, 188);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      ctx.strokeRect(rs1X - 2.5, 26, 5, 188);
      // Clamp gripping flask neck
      ctx.fillStyle = '#475569';
      ctx.fillRect(rs1X - 1, 74, 58, 4);

      // ==========================================
      // 2. RETORT STAND 2 (Middle, holding Liebig)
      // ==========================================
      const rs2X = 236;
      ctx.fillStyle = '#64748b';
      ctx.fillRect(rs2X - 20, 214, 40, 8);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(rs2X - 20, 214, 40, 8);
      // Rod
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(rs2X - 2.5, 42, 5, 172);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      ctx.strokeRect(rs2X - 2.5, 42, 5, 172);
      // Clamp holding Liebig condenser
      ctx.fillStyle = '#475569';
      ctx.fillRect(rs2X - 1, 102, 24, 4);

      // ==========================================
      // 3. BUNSEN BURNER & TRIPOD STAND (Left)
      // ==========================================
      const bX = 112;
      // Bunsen Burner
      ctx.fillStyle = '#64748b';
      ctx.fillRect(bX - 16, 214, 32, 8);
      ctx.fillRect(bX - 5, 190, 10, 24);
      if (heating) {
        const flicker = Math.sin(t * 16) * 2;
        // Outer blue flame
        ctx.fillStyle = 'rgba(37, 99, 235, 0.85)';
        ctx.beginPath();
        ctx.moveTo(bX - 7, 190);
        ctx.quadraticCurveTo(bX, 168 + flicker, bX + 7, 190);
        ctx.fill();
        // Inner cone
        ctx.fillStyle = 'rgba(250, 204, 21, 0.9)';
        ctx.beginPath();
        ctx.moveTo(bX - 4, 190);
        ctx.quadraticCurveTo(bX, 178 + flicker * 0.5, bX + 4, 190);
        ctx.fill();
      }

      // Tripod Stand & Wire Gauze
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(bX - 36, 222);
      ctx.lineTo(bX - 28, 170);
      ctx.lineTo(bX + 28, 170);
      ctx.lineTo(bX + 36, 222);
      ctx.stroke();
      // Wire gauze
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(bX - 32, 168);
      ctx.lineTo(bX + 32, 168);
      ctx.stroke();

      // ==========================================
      // 4. DISTILLATION FLASK & THERMOMETER
      // ==========================================
      const fCy = 138;
      const fR = 30;

      // Solution inside flask
      ctx.save();
      ctx.beginPath();
      ctx.arc(bX, fCy, fR - 1.5, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = '#fef08a'; // Fermented mixture
      ctx.fillRect(bX - fR, fCy - 6, fR * 2, fR + 10);
      ctx.strokeStyle = '#eab308';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(bX - fR, fCy - 6);
      ctx.lineTo(bX + fR, fCy - 6);
      ctx.stroke();

      // Boiling bubbles if heating
      if (heating && temp >= 65) {
        for (let i = 0; i < 7; i++) {
          const bx = bX - 14 + ((i * 7) % 28);
          const by = fCy + 22 - ((t * 40 + i * 8) % 22);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(bx, by, 1.8, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Porcelain chips (Serpihan porselin)
      ctx.fillStyle = '#cbd5e1';
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      [
        [bX - 8, fCy + 22],
        [bX, fCy + 24],
        [bX + 7, fCy + 21],
      ].forEach(([px, py]) => {
        ctx.beginPath();
        ctx.roundRect(px - 3, py - 2, 6, 4, 1);
        ctx.fill();
        ctx.stroke();
      });
      ctx.restore();

      // Distillation flask glass outline
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      // Round bulb with neck opening at top
      ctx.arc(bX, fCy, fR, -Math.PI * 0.38, Math.PI * 1.38, false);
      ctx.stroke();

      // Flask neck & side arm
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(bX - 9, fCy - 28);
      ctx.lineTo(bX - 9, 52);
      ctx.lineTo(bX + 9, 52);
      ctx.lineTo(bX + 9, 68);
      // Side arm branching out to Liebig
      ctx.lineTo(138, 76);
      ctx.lineTo(136, 82);
      ctx.lineTo(bX + 9, 74);
      ctx.lineTo(bX + 9, fCy - 28);
      ctx.stroke();

      // Rubber stopper
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.moveTo(bX - 11, 46);
      ctx.lineTo(bX + 11, 46);
      ctx.lineTo(bX + 9, 56);
      ctx.lineTo(bX - 9, 56);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Thermometer
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(bX - 2.5, 20, 5, 56);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      ctx.strokeRect(bX - 2.5, 20, 5, 56);
      // Red mercury thread & bulb (Bulb exactly level with side arm: y = 70)
      const mercH = Math.min(46, Math.max(8, ((temp - 20) / 80) * 46));
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(bX - 1.2, 70 - mercH, 2.4, mercH);
      ctx.beginPath();
      ctx.arc(bX, 70, 3, 0, Math.PI * 2);
      ctx.fill();

      // ==========================================
      // 5. LIEBIG CONDENSER (Kondenser Liebig)
      // ==========================================
      ctx.save();
      const lx1 = 138;
      const ly1 = 76;
      const lx2 = 338;
      const ly2 = 144;

      // Outer water jacket (glass cylinder around inner tube)
      const jx1 = 158;
      const jy1 = 83;
      const jx2 = 318;
      const jy2 = 137;

      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 20;
      ctx.lineCap = 'butt';
      ctx.beginPath();
      ctx.moveTo(jx1, jy1);
      ctx.lineTo(jx2, jy2);
      ctx.stroke();

      // Water inside jacket
      ctx.strokeStyle = flow === 'correct' ? 'rgba(56, 189, 248, 0.75)' : 'rgba(56, 189, 248, 0.25)';
      ctx.lineWidth = flow === 'correct' ? 16 : 6;
      ctx.beginPath();
      ctx.moveTo(jx1, jy1);
      ctx.lineTo(jx2, jy2);
      ctx.stroke();

      // Outer jacket glass contour
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(jx1, jy1 - 10);
      ctx.lineTo(jx2, jy2 - 10);
      ctx.lineTo(jx2, jy2 + 10);
      ctx.lineTo(jx1, jy1 + 10);
      ctx.closePath();
      ctx.stroke();

      // Water inlet tube (Lower end, pointing down)
      ctx.fillStyle = '#64748b';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.rect(304, 142, 6, 14);
      ctx.fill();
      ctx.stroke();

      // Water outlet tube (Upper end, pointing up)
      ctx.beginPath();
      ctx.rect(168, 64, 6, 14);
      ctx.fill();
      ctx.stroke();

      // Inner vapor tube through condenser
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(lx1, ly1);
      ctx.lineTo(lx2, ly2);
      ctx.stroke();
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(lx1, ly1);
      ctx.lineTo(lx2, ly2);
      ctx.stroke();

      // Delivery adapter bent into receiving flask
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(lx2, ly2);
      ctx.lineTo(354, 154);
      ctx.lineTo(354, 172);
      ctx.stroke();
      ctx.restore();

      // ==========================================
      // 6. COLD WATER / ICE BATH & RECEIVING FLASK
      // ==========================================
      const recCx = 354;
      const bathX = 318;
      const bathY = 168;
      const bathW = 72;
      const bathH = 54;

      // Beaker glass
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1.8;
      ctx.strokeRect(bathX, bathY, bathW, bathH);

      // Cold water in beaker
      ctx.fillStyle = 'rgba(56, 189, 248, 0.22)';
      ctx.fillRect(bathX + 1.5, bathY + 12, bathW - 3, bathH - 13.5);

      // Ice cubes floating in bath
      ctx.fillStyle = 'rgba(224, 242, 254, 0.85)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1;
      ctx.fillRect(bathX + 6, bathY + 8, 9, 7);
      ctx.strokeRect(bathX + 6, bathY + 8, 9, 7);
      ctx.fillRect(bathX + 54, bathY + 9, 10, 7);
      ctx.strokeRect(bathX + 54, bathY + 9, 10, 7);

      // Receiving Conical Flask (inside cold water bath)
      ctx.save();
      const drawRecFlask = () => {
        ctx.beginPath();
        ctx.moveTo(recCx - 9, 160);
        ctx.lineTo(recCx - 9, 174);
        ctx.lineTo(recCx - 24, 214);
        ctx.lineTo(recCx + 24, 214);
        ctx.lineTo(recCx + 9, 174);
        ctx.lineTo(recCx + 9, 160);
        ctx.closePath();
      };

      drawRecFlask();
      ctx.save();
      ctx.clip();
      const fillH = (collected / 100) * 36;
      ctx.fillStyle = 'rgba(59, 130, 246, 0.4)';
      ctx.fillRect(recCx - 26, 214 - fillH, 52, fillH);
      ctx.restore();

      drawRecFlask();
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.restore();

      // Condensing liquid droplets dripping into receiver
      if (temp >= 78 && collected < 100) {
        const dt = (t * 1.6) % 1;
        ctx.fillStyle = '#2563eb';
        ctx.beginPath();
        ctx.arc(recCx, 172 + dt * 26, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // ==========================================
      // 7. CRISP TEXTBOOK LEADER LINES & LABELS
      // ==========================================
      // Left side labels (distillation flask train)
      drawTextbookLabel(bX, 70, 'left', 14, 38, 'Termometer (78 °C)');
      drawTextbookLabel(
        bX - fR,
        fCy,
        'left',
        14,
        106,
        'Kelalang penyulingan',
        'Campuran penapaian'
      );
      drawTextbookLabel(
        bX - 6,
        fCy + 22,
        'left',
        14,
        150,
        'Serpihan porselin',
        '(Elak pembuakan)'
      );
      drawTextbookLabel(
        bX,
        202,
        'left',
        14,
        192,
        'Penunu Bunsen',
        '(Panaskan)'
      );

      // Top & middle labels
      drawTextbookLabel(rs1X, 74, 'top', 64, 18, 'Kaki retort & pengapit');
      drawTextbookLabel(171, 64, 'top', 186, 18, 'Air keluar (ke sinki) ↑');
      drawTextbookLabel(245, 106, 'top', 256, 48, 'Kondenser Liebig');

      // Bottom inlet
      drawTextbookLabel(307, 156, 'bottom', 302, 196, '↑ Air masuk (dari pili)');

      // Right side labels (Receiver & ice bath)
      drawTextbookLabel(
        recCx,
        192,
        'right',
        486,
        138,
        'Hasil sulingan',
        '(Etanol tulen 78 °C)'
      );
      drawTextbookLabel(
        bathX + bathW,
        bathY + 28,
        'right',
        486,
        178,
        'Bikar air sejuk / ais',
        '(Elak penyejatan etanol)'
      );

      // Digital thermometer badge pill
      ctx.save();
      ctx.fillStyle = '#f8fafc';
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(bX + 16, 22, 46, 18, 5);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = temp >= 78 ? '#dc2626' : '#0f172a';
      ctx.font = '800 11px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${temp.toFixed(0)} °C`, bX + 39, 31);
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
      className="w-full max-w-[500px] aspect-[500/250] mx-auto block rounded-xl border border-slate-200 bg-white"
    />
  );
};

const BoilingPointRaceCanvas: React.FC<{ thermometerTemp: number }> = ({
  thermometerTemp,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const tempRef = useRef(thermometerTemp);
  tempRef.current = thermometerTemp;

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
      const cssH = 225;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      const temp = tempRef.current;
      const isBoilingEthanol = temp >= 78;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, cssW, cssH);

      // Liquid zone
      ctx.fillStyle = '#e0f2fe';
      ctx.fillRect(15, 130, 220, 80);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(15, 130);
      ctx.lineTo(235, 130);
      ctx.stroke();

      // Water molecules (Red spheres, BP 100 °C) — stay in liquid
      for (let i = 0; i < 6; i++) {
        const wx = 40 + i * 34 + Math.sin(t * 2 + i) * 4;
        const wy = 165 + Math.cos(t * 2.5 + i) * 6;
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.arc(wx, wy, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '700 8px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('H₂O', wx, wy + 3);
      }

      // Ethanol molecules (Blue spheres, BP 78 °C) — rise as vapor at >= 78 °C
      for (let j = 0; j < 5; j++) {
        let ex = 48 + j * 38;
        let ey = 148 + Math.sin(t * 3 + j) * 5;
        if (isBoilingEthanol) {
          const vt = (t * 0.7 + j * 0.22) % 1;
          ey = 148 - vt * 118;
          ex += Math.sin(t * 5 + j) * 8;
        }
        ctx.fillStyle = '#2563eb';
        ctx.beginPath();
        ctx.arc(ex, ey, 9.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '700 7.5px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('EtOH', ex, ey + 2.5);
      }

      ctx.fillStyle = '#0f172a';
      ctx.font = '800 10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        isBoilingEthanol
          ? '78 °C: Wap Etanol (Biru) Terlepas ↑'
          : 'Memanas ke 78 °C...',
        125,
        22
      );
      ctx.fillStyle = '#dc2626';
      ctx.font = '700 9px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText('Air (Merah, 100 °C) Kekal Cecair', 125, 200);

      ctx.restore();
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full max-w-[250px] aspect-[250/225] mx-auto block rounded-xl border border-slate-200 bg-slate-50"
    />
  );
};

export const EthanolFermentationDistillationLab: React.FC = () => {
  const [phase, setPhase] = useState<Phase>(1);

  // Phase 1: Fermentation
  const [temp, setTemp] = useState<number>(35);
  const [isFermenting, setIsFermenting] = useState<boolean>(false);
  const [ethanolPct, setEthanolPct] = useState<number>(0);

  // Phase 2: Distillation
  const [condenserFlow, setCondenserFlow] = useState<CondenserFlow>('correct');
  const [isHeating, setIsHeating] = useState<boolean>(false);
  const [thermometerTemp, setThermometerTemp] = useState<number>(27);
  const [collectedPct, setCollectedPct] = useState<number>(0);

  // Phase 3: Verification Tests
  const [flameTested, setFlameTested] = useState<boolean>(false);
  const [solubilityTested, setSolubilityTested] = useState<boolean>(false);

  const recordedRef = useRef(false);

  // Phase 1 simulation loop
  useEffect(() => {
    if (!isFermenting || phase !== 1) return;
    if (temp > 45) return; // denatured

    const timer = setInterval(() => {
      setEthanolPct((prev) => {
        if (prev >= 15) return 15;
        const rate = temp >= 30 && temp <= 37 ? 1.8 : temp < 30 ? 0.15 : 0.7;
        return Math.min(15, +(prev + rate).toFixed(1));
      });
    }, 250);

    return () => clearInterval(timer);
  }, [isFermenting, temp, phase]);

  // Phase 2 simulation loop
  useEffect(() => {
    if (!isHeating || phase !== 2) return;

    const timer = setInterval(() => {
      setThermometerTemp((prev) => {
        if (prev < 78) return Math.min(78, prev + 4);
        return 78;
      });
      setCollectedPct((prev) => {
        if (thermometerTemp < 78) return prev;
        const rate = condenserFlow === 'correct' ? 8 : 4;
        return Math.min(100, prev + rate);
      });
    }, 250);

    return () => clearInterval(timer);
  }, [isHeating, phase, thermometerTemp, condenserFlow]);

  // Record completion when both Phase 3 tests are done
  useEffect(() => {
    if (flameTested && solubilityTested && !recordedRef.current) {
      recordedRef.current = true;
      analytics.recordSimulationCompleted('penapaian-penyulingan-etanol');
    }
  }, [flameTested, solubilityTested]);

  const handleResetAll = () => {
    setPhase(1);
    setTemp(35);
    setIsFermenting(false);
    setEthanolPct(0);
    setCondenserFlow('correct');
    setIsHeating(false);
    setThermometerTemp(27);
    setCollectedPct(0);
    setFlameTested(false);
    setSolubilityTested(false);
    recordedRef.current = false;
  };

  const isOptimumTemp = temp >= 30 && temp <= 37;
  const isColdTemp = temp < 30;
  const isHotTemp = temp > 45;

  return (
    <div className="bg-slate-50 text-slate-900 p-2 sm:p-3 rounded-2xl flex flex-col gap-2.5 font-sans">
      {/* 1. BAR KEMAJUAN FASA DI BAHAGIAN ATAS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2.5 shadow-sm flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { num: 1 as Phase, label: 'Fasa 1: Penapaian Glukosa (Anaerob)' },
            { num: 2 as Phase, label: 'Fasa 2: Penyulingan Berperingkat Etanol' },
            { num: 3 as Phase, label: 'Fasa 3: Ujian Pengesahan Hasil Sulingan' },
          ].map((item) => {
            const active = phase === item.num;
            const done = phase > item.num;
            return (
              <button
                key={item.num}
                onClick={() => setPhase(item.num)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition flex items-center gap-1.5 cursor-pointer ${
                  active
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : done
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                }`}
              >
                {done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleResetAll}
          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Set Semula Keseluruhan</span>
        </button>
      </div>

      {/* =========================================================
          FASA 1: PENAPAIAN GLUKOSA
          ========================================================= */}
      {phase === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr_240px] gap-2.5 items-stretch">
          {/* Kiri: Kawalan Pemboleh Ubah */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between space-y-3">
            <div className="space-y-2.5">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Thermometer className="w-3.5 h-3.5 text-emerald-600" />
                <span>Kawalan Suhu Enzim Zimase</span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-extrabold mb-1">
                  <span>Suhu Tindak Balas:</span>
                  <span
                    className={
                      isHotTemp
                        ? 'text-red-600'
                        : isOptimumTemp
                        ? 'text-emerald-600'
                        : 'text-blue-600'
                    }
                  >
                    {temp} °C
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={70}
                  value={temp}
                  onChange={(e) => setTemp(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                  <span>10 °C (Sejuk)</span>
                  <span>35 °C (Optimum)</span>
                  <span>70 °C (Panas)</span>
                </div>
              </div>

              <button
                onClick={() => setIsFermenting(true)}
                className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-sm cursor-pointer transition"
              >
                Mulakan Penapaian
              </button>

              {/* Pedagogic Status Box */}
              <div
                className={`p-2.5 rounded-xl border text-[11px] leading-relaxed font-medium ${
                  isHotTemp
                    ? 'bg-red-50 border-red-200 text-red-900'
                    : isOptimumTemp
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-blue-50 border-blue-200 text-blue-900'
                }`}
              >
                {isHotTemp ? (
                  <div className="flex items-start gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Terlalu Panas ({temp} °C):</strong> Enzim zimase ternyahasli (denatured). Tindak balas berhenti serta-merta!
                    </span>
                  </div>
                ) : isColdTemp ? (
                  <span>
                    <strong>Terlalu Sejuk ({temp} °C):</strong> Enzim zimase tidak aktif; gelembung gas CO₂ sangat perlahan dan hampir tiada etanol terbentuk.
                  </span>
                ) : (
                  <span>
                    <strong>Suhu Optimum ({temp} °C):</strong> Enzim zimase aktif menukarkan glukosa kepada etanol & CO₂ (maksimum 14–15% sebelum yis mati).
                  </span>
                )}
              </div>

              {/* Progress */}
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                <div className="flex justify-between text-[11px] font-bold mb-1">
                  <span>Kepekatan Etanol:</span>
                  <span className="text-blue-700 font-extrabold">{ethanolPct.toFixed(1)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all"
                    style={{ width: `${(ethanolPct / 15) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setPhase(2)}
              disabled={ethanolPct < 14}
              className={`w-full py-2 px-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition ${
                ethanolPct >= 14
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow cursor-pointer'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              }`}
            >
              <span>Turas & Pindahkan ke Penyulingan (Fasa 2)</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>

          {/* Tengah: Radas Makroskopik */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between">
            <div className="text-xs font-extrabold text-slate-800 mb-1.5">
              Radas Penapaian Anaerob (Kelalang Kon + Air Kapur)
            </div>
            <FermentationMacroCanvas
              temp={temp}
              isRunning={isFermenting}
              ethanolPct={ethanolPct}
            />
            <div className="mt-2 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-200">
              <strong>Fungsi Air Kapur:</strong> Menghalang oksigen daripada masuk ke dalam kelalang (mengekalkan keadaan anaerob) dan mengesan pembebasan gas karbon dioksida (air kapur menjadi keruh).
            </div>
          </div>

          {/* Kanan: Kanta Submikroskopik */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between">
            <div className="text-xs font-extrabold text-slate-800 mb-1.5">
              Kanta Pembesar Submikroskopik
            </div>
            <FermentationMicroCanvas temp={temp} isRunning={isFermenting} />
            <div className="mt-2 text-[11px] text-slate-700 bg-amber-50 p-2 rounded-xl border border-amber-200">
              <strong>Persamaan Penapaian:</strong>
              <div className="font-mono font-bold text-slate-900 mt-0.5">
                C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          FASA 2: PENYULINGAN BERPERINGKAT ETANOL
          ========================================================= */}
      {phase === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr_240px] gap-2.5 items-stretch">
          {/* Kiri: Kawalan Eksperimen */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between space-y-3">
            <div className="space-y-2.5">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                Kawalan Penyulingan
              </div>

              <div>
                <div className="text-xs font-extrabold text-slate-800 mb-1">
                  Arah Aliran Air Kondenser Liebig:
                </div>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setCondenserFlow('correct')}
                    className={`p-2 rounded-xl border text-left text-[11px] font-bold cursor-pointer transition ${
                      condenserFlow === 'correct'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    ✓ Masuk dari Bawah, Keluar Atas (Betul)
                  </button>
                  <button
                    onClick={() => setCondenserFlow('wrong')}
                    className={`p-2 rounded-xl border text-left text-[11px] font-bold cursor-pointer transition ${
                      condenserFlow === 'wrong'
                        ? 'bg-red-50 border-red-400 text-red-900'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    ✗ Masuk dari Atas, Keluar Bawah (Salah)
                  </button>
                </div>
              </div>

              <button
                onClick={() => setIsHeating(true)}
                className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition"
              >
                <Flame className="w-4 h-4" />
                <span>Nyalakan Penunu Bunsen</span>
              </button>

              <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                <div className="flex justify-between text-[11px] font-bold mb-1">
                  <span>Etanol Tulen Terkumpul:</span>
                  <span className="text-blue-700 font-extrabold">{collectedPct}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all"
                    style={{ width: `${collectedPct}%` }}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setPhase(3)}
              disabled={collectedPct < 100}
              className={`w-full py-2 px-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition ${
                collectedPct >= 100
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow cursor-pointer'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              }`}
            >
              <span>Uji Hasil Sulingan (Ke Fasa 3)</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>

          {/* Tengah: Radas Penyulingan */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between">
            <div className="text-xs font-extrabold text-slate-800 mb-1.5">
              Radas Penyulingan Berperingkat & Kondenser Liebig
            </div>
            <DistillationMacroCanvas
              isHeating={isHeating}
              thermometerTemp={thermometerTemp}
              condenserFlow={condenserFlow}
              collectedPct={collectedPct}
            />
            <div className="mt-2 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-200">
              {condenserFlow === 'correct'
                ? 'Air masuk dari bawah memenuhi keseluruhan jaket kondenser untuk penyejukan dan kondensasi wap etanol yang maksimum.'
                : 'Air masuk dari atas tidak memenuhi ruang jaket kondenser; wap etanol tidak terkondensasi dengan cekap!'}
            </div>
          </div>

          {/* Kanan: Perlumbaan Takat Didih */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between">
            <div className="text-xs font-extrabold text-slate-800 mb-1.5">
              Perlumbaan Takat Didih (78 °C vs 100 °C)
            </div>
            <BoilingPointRaceCanvas thermometerTemp={thermometerTemp} />
            <div className="mt-2 text-[11px] text-slate-700 bg-blue-50 p-2 rounded-xl border border-blue-200">
              Etanol mendidih terlebih dahulu pada <strong>78 °C</strong> dan meruap keluar, manakala air (<strong>100 °C</strong>) kekal di dalam kelalang.
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          FASA 3: UJIAN PENGESAHAN HASIL SULINGAN & PERSAMAAN KIMIA
          ========================================================= */}
      {phase === 3 && (
        <div className="space-y-2.5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {/* Ujian 1: Kebolehbakaran */}
            <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm flex flex-col justify-between space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-blue-600" />
                  <span>Ujian 1: Ujian Kebolehbakaran Etanol</span>
                </h4>
                {flameTested && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                    Selesai ✓
                  </span>
                )}
              </div>

              <div className="h-28 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center relative overflow-hidden">
                {flameTested ? (
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-12 rounded-full bg-gradient-to-t from-blue-600 via-sky-400 to-transparent animate-pulse" />
                    <div className="w-20 h-3 bg-slate-300 rounded-b-full border border-slate-400" />
                    <span className="text-[11px] font-extrabold text-blue-700 mt-1">
                      Nyalaan Biru Tanpa Jelaga!
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-500 font-medium">
                    Etanol tulen di dalam piring sejat
                  </span>
                )}
              </div>

              <button
                onClick={() => setFlameTested(true)}
                className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold cursor-pointer transition"
              >
                Dekatkan Kayu Uji Bernyala
              </button>
            </div>

            {/* Ujian 2: Keterlarutan dalam Air */}
            <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm flex flex-col justify-between space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-cyan-600" />
                  <span>Ujian 2: Keterlarutan dalam Air</span>
                </h4>
                {solubilityTested && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                    Selesai ✓
                  </span>
                )}
              </div>

              <div className="h-28 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center">
                {solubilityTested ? (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-b-xl border-2 border-slate-400 bg-sky-100/70 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-sky-600" />
                    </div>
                    <span className="text-[11px] font-extrabold text-emerald-700 mt-1">
                      Larut Sepenuhnya (Larutan Tidak Berwarna)
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-500 font-medium">
                    Tabung uji berisi air suling
                  </span>
                )}
              </div>

              <button
                onClick={() => setSolubilityTested(true)}
                className="w-full py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-extrabold cursor-pointer transition"
              >
                Titiskan Etanol ke dalam Air
              </button>
            </div>
          </div>

          {/* Ringkasan Persamaan & Konsep */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500">
                Persamaan Kimia Lengkap (KSSM)
              </div>
              <div className="p-2 rounded-xl bg-slate-900 text-white font-mono text-xs font-bold">
                1. Penapaian: C₆H₁₂O₆(ak) → 2C₂H₅OH(ak) + 2CO₂(g)
              </div>
              <div className="p-2 rounded-xl bg-slate-900 text-white font-mono text-xs font-bold">
                2. Pembakaran: C₂H₅OH(ce) + 3O₂(g) → 2CO₂(g) + 3H₂O(ce)
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-xs text-indigo-950 leading-relaxed flex items-start gap-2">
              <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong>Mengapa Penyulingan Berperingkat Diperlukan?</strong>
                <p className="mt-1">
                  Hasil penapaian hanya mengandungi ~14–15% etanol bercampur dengan air. Penyulingan berperingkat memisahkan etanol tulen daripada air berdasarkan perbezaan takat didih (etanol mendidih pada 78 °C berbanding air pada 100 °C).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EthanolFermentationDistillationLab;
