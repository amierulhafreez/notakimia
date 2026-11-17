import React, { useEffect, useRef } from 'react';
import { ElectrolysisOutcome, IonVisualCount } from '../data/electrolysisData';

interface Props {
  outcome: ElectrolysisOutcome;
  progress: number;
  isRunning: boolean;
  isPaused: boolean;
  showElectrons: boolean;
  showIons: boolean;
}

interface IonOrb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  symbol: string;
  color: string;
  textColor: string;
  isDischarged: boolean;
  cooldown: number;
}

interface NeutralProduct {
  x: number;
  y: number;
  vx: number;
  vy: number;
  kind: 'gas_o2' | 'gas_cl2' | 'gas_br2' | 'gas_h2' | 'cu_atom' | 'pb_atom' | 'cu2_released';
  life: number;
}

interface WireElectron {
  x: number;
  y: number;
  vy: number;
  life: number;
}

function buildIonOrbs(
  specs: IonVisualCount[],
  minX: number,
  maxX: number,
  minY: number,
  maxY: number
): IonOrb[] {
  const list: IonOrb[] = [];
  for (const spec of specs) {
    for (let i = 0; i < spec.count; i++) {
      list.push({
        x: minX + Math.random() * (maxX - minX),
        y: minY + Math.random() * (maxY - minY),
        vx: (Math.random() - 0.5) * 1.1,
        vy: (Math.random() - 0.5) * 1.1,
        symbol: spec.symbol,
        color: spec.color,
        textColor: spec.textColor,
        isDischarged: spec.isDischarged,
        cooldown: Math.floor(Math.random() * 45),
      });
    }
  }
  return list;
}

const LENS_SIZE = 192;

export const ElectrolysisMicroZoomCanvas: React.FC<Props> = ({
  outcome,
  progress,
  isRunning,
  isPaused,
  showElectrons,
  showIons,
}) => {
  const anodeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cathodeCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const stateRef = useRef({
    outcome,
    progress,
    isRunning,
    isPaused,
    showElectrons,
    showIons,
  });
  stateRef.current = { outcome, progress, isRunning, isPaused, showElectrons, showIons };

  const anodeOrbsRef = useRef<IonOrb[]>([]);
  const cathodeOrbsRef = useRef<IonOrb[]>([]);
  const anodeProductsRef = useRef<NeutralProduct[]>([]);
  const cathodeProductsRef = useRef<NeutralProduct[]>([]);
  const anodeElectronsRef = useRef<WireElectron[]>([]);
  const cathodeElectronsRef = useRef<WireElectron[]>([]);

  // Rebuild ion population cleanly whenever electrolyte, concentration, electrode, or molten heat changes
  useEffect(() => {
    if (outcome.isMolten && !outcome.isMoltenHeated) {
      // Arrange ions in a fixed rigid crystal lattice inside each lens
      const makeLattice = (specs: IonVisualCount[], x0: number): IonOrb[] => {
        const res: IonOrb[] = [];
        const baseSpec = specs[0];
        if (!baseSpec) return res;
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            res.push({
              x: x0 + c * 28,
              y: 54 + r * 36,
              vx: 0,
              vy: 0,
              symbol: baseSpec.symbol,
              color: baseSpec.color,
              textColor: baseSpec.textColor,
              isDischarged: false,
              cooldown: 0,
            });
          }
        }
        return res;
      };
      anodeOrbsRef.current = makeLattice(outcome.anodeZoomIons, 76);
      cathodeOrbsRef.current = makeLattice(outcome.cathodeZoomIons, 42);
    } else {
      anodeOrbsRef.current = buildIonOrbs(outcome.anodeZoomIons, 62, LENS_SIZE - 26, 26, LENS_SIZE - 26);
      cathodeOrbsRef.current = buildIonOrbs(outcome.cathodeZoomIons, 26, LENS_SIZE - 62, 26, LENS_SIZE - 26);
    }
    anodeProductsRef.current = [];
    cathodeProductsRef.current = [];
    anodeElectronsRef.current = [];
    cathodeElectronsRef.current = [];
  }, [outcome.electrolyte.id, outcome.concentration, outcome.electrodeType, outcome.isMolten, outcome.isMoltenHeated]);

  // Clear products cleanly on Reset (progress === 0 && !isRunning)
  useEffect(() => {
    if (progress === 0 && !isRunning) {
      anodeProductsRef.current = [];
      cathodeProductsRef.current = [];
      anodeElectronsRef.current = [];
      cathodeElectronsRef.current = [];
    }
  }, [progress, isRunning]);

  useEffect(() => {
    const ac = anodeCanvasRef.current;
    const cc = cathodeCanvasRef.current;
    if (!ac || !cc) return;
    const actx = ac.getContext('2d');
    const cctx = cc.getContext('2d');
    if (!actx || !cctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    for (const canvas of [ac, cc]) {
      canvas.width = LENS_SIZE * dpr;
      canvas.height = LENS_SIZE * dpr;
    }
    actx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let rafId = 0;
    let tick = 0;

    const drawIonSphere = (ctx: CanvasRenderingContext2D, orb: IonOrb, dimmed: boolean) => {
      ctx.save();
      ctx.globalAlpha = dimmed ? 0.35 : 0.96;
      const r = orb.symbol.includes('SO₄') ? 14 : 11.5;

      // Halo glow for chosen ion
      if (orb.isDischarged && stateRef.current.isRunning && !dimmed) {
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, r + 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `${orb.color}40`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(orb.x, orb.y, r, 0, Math.PI * 2);
      ctx.fillStyle = orb.color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.fillStyle = orb.textColor;
      ctx.font = orb.symbol.length > 3 ? 'bold 7.8px sans-serif' : 'bold 8.8px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(orb.symbol, orb.x, orb.y + 0.5);
      ctx.restore();
    };

    const drawElectronDot = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      ctx.save();
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 7;
      ctx.beginPath();
      ctx.arc(x, y, 4.2, 0, Math.PI * 2);
      ctx.fillStyle = '#facc15';
      ctx.fill();
      ctx.fillStyle = '#422006';
      ctx.font = 'bold 6.5px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('e⁻', x, y + 0.5);
      ctx.restore();
    };

    const drawNeutralProduct = (ctx: CanvasRenderingContext2D, prod: NeutralProduct) => {
      ctx.save();
      ctx.globalAlpha = Math.max(0.15, Math.min(1, prod.life / 35));
      if (
        prod.kind === 'gas_o2' ||
        prod.kind === 'gas_cl2' ||
        prod.kind === 'gas_br2' ||
        prod.kind === 'gas_h2'
      ) {
        const fill =
          prod.kind === 'gas_cl2'
            ? '#a3e635'
            : prod.kind === 'gas_br2'
            ? '#d97706'
            : prod.kind === 'gas_o2'
            ? '#f8fafc'
            : '#e0f2fe';
        const stroke =
          prod.kind === 'gas_cl2'
            ? '#4d7c0f'
            : prod.kind === 'gas_br2'
            ? '#78350f'
            : '#64748b';
        const label =
          prod.kind === 'gas_cl2'
            ? 'Cl₂'
            : prod.kind === 'gas_br2'
            ? 'Br₂'
            : prod.kind === 'gas_o2'
            ? 'O₂'
            : 'H₂';

        // Diatomic molecule spheres
        for (const dx of [-4.5, 4.5]) {
          ctx.beginPath();
          ctx.arc(prod.x + dx, prod.y, 5.2, 0, Math.PI * 2);
          ctx.fillStyle = fill;
          ctx.fill();
          ctx.strokeStyle = stroke;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.fillStyle = prod.kind === 'gas_br2' ? '#fde68a' : '#ffffff';
        ctx.font = 'bold 7.5px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(label, prod.x, prod.y - 9);
      } else if (prod.kind === 'cu_atom' || prod.kind === 'pb_atom') {
        ctx.beginPath();
        ctx.arc(prod.x, prod.y, 6.2, 0, Math.PI * 2);
        ctx.fillStyle = prod.kind === 'pb_atom' ? '#cbd5e1' : '#ea580c';
        ctx.fill();
        ctx.strokeStyle = prod.kind === 'pb_atom' ? '#f8fafc' : '#fed7aa';
        ctx.lineWidth = 1;
        ctx.stroke();
      } else if (prod.kind === 'cu2_released') {
        ctx.beginPath();
        ctx.arc(prod.x, prod.y, 10.5, 0, Math.PI * 2);
        ctx.fillStyle = '#06b6d4';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.1;
        ctx.stroke();
        ctx.fillStyle = '#042f2e';
        ctx.font = 'bold 8px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Cu²⁺', prod.x, prod.y + 0.5);
      }
      ctx.restore();
    };

    const stepAndRender = () => {
      tick += 1;
      const {
        outcome: out,
        progress: prog,
        isRunning: running,
        isPaused: paused,
        showElectrons: shE,
        showIons: shI,
      } = stateRef.current;
      const active = running && !paused && out.canConduct;
      const latticeFrozen = !out.canConduct;

      // ================= RENDER ANODE (+) ZOOM LENS =================
      actx.clearRect(0, 0, LENS_SIZE, LENS_SIZE);
      actx.save();
      actx.beginPath();
      actx.arc(LENS_SIZE / 2, LENS_SIZE / 2, LENS_SIZE / 2 - 2, 0, Math.PI * 2);
      actx.clip();

      // Solution background
      actx.fillStyle = '#0a1324';
      actx.fillRect(0, 0, LENS_SIZE, LENS_SIZE);

      // Left electrode strip (thins if active copper)
      const anodeW = out.electrodeType === 'kuprum' ? Math.max(30, 48 - prog * 14) : 46;
      actx.fillStyle = out.electrodeType === 'kuprum' ? '#c2410c' : '#334155';
      actx.fillRect(0, 0, anodeW, LENS_SIZE);
      actx.strokeStyle = out.electrodeType === 'kuprum' ? '#fb923c' : '#64748b';
      actx.lineWidth = 2;
      actx.beginPath();
      actx.moveTo(anodeW, 0);
      actx.lineTo(anodeW, LENS_SIZE);
      actx.stroke();

      // Copper atoms inside active Cu anode lattice
      if (out.electrodeType === 'kuprum') {
        for (let row = 0; row < 8; row++) {
          for (let col = 0; col < 3; col++) {
            const cx = 10 + col * 11;
            const cy = 20 + row * 22;
            if (cx + 4 <= anodeW) {
              actx.beginPath();
              actx.arc(cx, cy, 4.6, 0, Math.PI * 2);
              actx.fillStyle = '#fb923c';
              actx.fill();
              actx.strokeStyle = '#9a3412';
              actx.lineWidth = 0.8;
              actx.stroke();
            }
          }
        }
      }

      // Active Cu anode dissolution spawn
      if (active && out.anode.productVisual === 'copper_dissolve' && tick % 26 === 0) {
        const sy = 40 + Math.random() * (LENS_SIZE - 80);
        anodeProductsRef.current.push({
          x: anodeW + 8,
          y: sy,
          vx: 1.0 + Math.random() * 0.5,
          vy: (Math.random() - 0.5) * 0.6,
          kind: 'cu2_released',
          life: 110,
        });
        if (shE) {
          anodeElectronsRef.current.push({ x: anodeW - 14, y: sy, vy: -2.0, life: 60 });
          anodeElectronsRef.current.push({ x: anodeW - 8, y: sy + 8, vy: -2.1, life: 60 });
        }
      }

      // Step & draw Anode ions (apply gentle separation to prevent pileups)
      const aOrbs = anodeOrbsRef.current;
      for (let i = 0; i < aOrbs.length; i++) {
        for (let j = i + 1; j < aOrbs.length; j++) {
          const dx = aOrbs[j].x - aOrbs[i].x;
          const dy = aOrbs[j].y - aOrbs[i].y;
          const dist = Math.hypot(dx, dy) || 0.1;
          if (dist < 24) {
            const push = (24 - dist) * 0.06;
            const nx = dx / dist;
            const ny = dy / dist;
            aOrbs[i].x -= nx * push;
            aOrbs[i].y -= ny * push;
            aOrbs[j].x += nx * push;
            aOrbs[j].y += ny * push;
          }
        }
      }
      for (const orb of aOrbs) {
        if (orb.cooldown > 0) {
          orb.cooldown -= 1;
        }
        if (active && shI) {
          if (orb.isDischarged) {
            orb.vx += -0.055; // pulled toward anode (+)
            orb.vy += (Math.random() - 0.5) * 0.14;
          } else {
            orb.vx += (Math.random() - 0.5) * 0.12;
            orb.vy += (Math.random() - 0.5) * 0.12;
          }
          const spd = Math.hypot(orb.vx, orb.vy) || 1;
          if (spd > 1.35) {
            orb.vx = (orb.vx / spd) * 1.35;
            orb.vy = (orb.vy / spd) * 1.35;
          }
          orb.x += orb.vx;
          orb.y += orb.vy;

          // Circular interior boundary clamp
          const dx = orb.x - LENS_SIZE / 2;
          const dy = orb.y - LENS_SIZE / 2;
          if (Math.hypot(dx, dy) > LENS_SIZE / 2 - 18) {
            orb.vx = -dx * 0.03;
            orb.vy = -dy * 0.03;
          }
          if (orb.x <= anodeW + 13) {
            if (orb.isDischarged && orb.cooldown === 0) {
              // Trigger electron transfer & gas formation!
              orb.cooldown = 55;
              if (shE) {
                anodeElectronsRef.current.push({
                  x: anodeW - 10,
                  y: orb.y,
                  vy: -2.1,
                  life: 65,
                });
              }
                anodeProductsRef.current.push({
                  x: anodeW + 14,
                  y: orb.y,
                  vx: 0.35 + Math.random() * 0.3,
                  vy: -1.1 - Math.random() * 0.5,
                  kind:
                    out.anode.productVisual === 'gas_cl2'
                      ? 'gas_cl2'
                      : out.anode.productVisual === 'gas_br2'
                      ? 'gas_br2'
                      : 'gas_o2',
                  life: 95,
                });
              // Respawn another ion on right side of lens
              orb.x = LENS_SIZE - 30 - Math.random() * 24;
              orb.y = 42 + Math.random() * (LENS_SIZE - 84);
              orb.vx = -0.35;
            } else {
              orb.x = anodeW + 14;
              orb.vx = Math.abs(orb.vx);
            }
          }
        } else if (!paused && shI) {
          // Gentle thermal jiggle even before switch is turned on
          orb.x += Math.sin(tick * 0.04 + orb.y) * 0.14;
          orb.y += Math.cos(tick * 0.04 + orb.x) * 0.14;
        }
        drawIonSphere(actx, orb, !shI);
      }

      // Update & draw neutral Anode products
      anodeProductsRef.current = anodeProductsRef.current.filter((p) => {
        if (active) {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 1;
        }
        drawNeutralProduct(actx, p);
        return p.life > 0;
      });

      // Update & draw electrons traveling UP inside Anode toward external wire
      if (shE) {
        anodeElectronsRef.current = anodeElectronsRef.current.filter((e) => {
          if (active) {
            e.y += e.vy;
            e.life -= 1;
          }
          drawElectronDot(actx, e.x, e.y);
          return e.life > 0 && e.y > 0;
        });
      }

      // Directional label inside Anod wire
      actx.fillStyle = '#fecaca';
      actx.font = 'bold 9px sans-serif';
      actx.textAlign = 'center';
      actx.fillText('ANOD (+)', 24, 15);
      if (shE && running && out.canConduct) {
        actx.fillStyle = '#facc15';
        actx.font = 'bold 8.5px sans-serif';
        actx.fillText('e⁻ ↑', 22, 28);
      }
      if (latticeFrozen) {
        actx.fillStyle = '#94a3b8';
        actx.font = 'bold 8px sans-serif';
        actx.fillText('Kekisi Pepejal', LENS_SIZE / 2 + 20, LENS_SIZE - 12);
      }
      actx.restore();

      // ================= RENDER CATHODE (−) ZOOM LENS =================
      cctx.clearRect(0, 0, LENS_SIZE, LENS_SIZE);
      cctx.save();
      cctx.beginPath();
      cctx.arc(LENS_SIZE / 2, LENS_SIZE / 2, LENS_SIZE / 2 - 2, 0, Math.PI * 2);
      cctx.clip();

      cctx.fillStyle = '#0a1324';
      cctx.fillRect(0, 0, LENS_SIZE, LENS_SIZE);

      // Right electrode strip + growing copper deposit rim
      const cathodeW = 46;
      const cathX = LENS_SIZE - cathodeW;
      cctx.fillStyle = out.electrodeType === 'kuprum' ? '#c2410c' : '#334155';
      cctx.fillRect(cathX, 0, cathodeW, LENS_SIZE);
      if ((out.cathode.productVisual === 'deposit_cu' || out.cathode.productVisual === 'deposit_pb') && prog > 0.05) {
        const coatW = Math.min(12, prog * 12);
        cctx.fillStyle = out.cathode.productVisual === 'deposit_pb' ? '#cbd5e1' : '#ea580c';
        cctx.fillRect(cathX - coatW, 0, coatW, LENS_SIZE);
      }
      cctx.strokeStyle = '#38bdf8';
      cctx.lineWidth = 2;
      cctx.beginPath();
      cctx.moveTo(cathX, 0);
      cctx.lineTo(cathX, LENS_SIZE);
      cctx.stroke();

      // Periodic incoming electrons coming DOWN from battery (-) into Cathode edge
      if (active && shE && tick % 20 === 0) {
        cathodeElectronsRef.current.push({
          x: cathX + 14,
          y: 26,
          vy: 2.0,
          life: 65,
        });
      }

      const cOrbs = cathodeOrbsRef.current;
      for (let i = 0; i < cOrbs.length; i++) {
        for (let j = i + 1; j < cOrbs.length; j++) {
          const dx = cOrbs[j].x - cOrbs[i].x;
          const dy = cOrbs[j].y - cOrbs[i].y;
          const dist = Math.hypot(dx, dy) || 0.1;
          if (dist < 24) {
            const push = (24 - dist) * 0.06;
            const nx = dx / dist;
            const ny = dy / dist;
            cOrbs[i].x -= nx * push;
            cOrbs[i].y -= ny * push;
            cOrbs[j].x += nx * push;
            cOrbs[j].y += ny * push;
          }
        }
      }
      for (const orb of cOrbs) {
        if (orb.cooldown > 0) orb.cooldown -= 1;

        if (active && shI) {
          if (orb.isDischarged) {
            orb.vx += 0.055; // pulled right toward cathode (-)
            orb.vy += (Math.random() - 0.5) * 0.14;
          } else {
            orb.vx += (Math.random() - 0.5) * 0.12;
            orb.vy += (Math.random() - 0.5) * 0.12;
          }
          const spd = Math.hypot(orb.vx, orb.vy) || 1;
          if (spd > 1.35) {
            orb.vx = (orb.vx / spd) * 1.35;
            orb.vy = (orb.vy / spd) * 1.35;
          }
          orb.x += orb.vx;
          orb.y += orb.vy;

          const dx = orb.x - LENS_SIZE / 2;
          const dy = orb.y - LENS_SIZE / 2;
          if (Math.hypot(dx, dy) > LENS_SIZE / 2 - 18) {
            orb.vx = -dx * 0.03;
            orb.vy = -dy * 0.03;
          }

          if (orb.x >= cathX - 13) {
            if (orb.isDischarged && orb.cooldown === 0) {
              orb.cooldown = 50;
              if (shE) {
                cathodeElectronsRef.current.push({
                  x: cathX - 4,
                  y: orb.y,
                  vy: 0.15,
                  life: 16,
                });
              }
              if (out.cathode.productVisual === 'deposit_cu' || out.cathode.productVisual === 'deposit_pb') {
                cathodeProductsRef.current.push({
                  x: cathX - 5,
                  y: orb.y,
                  vx: 0,
                  vy: 0,
                  kind: out.cathode.productVisual === 'deposit_pb' ? 'pb_atom' : 'cu_atom',
                  life: 140,
                });
              } else {
                cathodeProductsRef.current.push({
                  x: cathX - 14,
                  y: orb.y,
                  vx: -0.35 - Math.random() * 0.25,
                  vy: -1.15 - Math.random() * 0.5,
                  kind: 'gas_h2',
                  life: 95,
                });
              }
              orb.x = 30 + Math.random() * 24;
              orb.y = 42 + Math.random() * (LENS_SIZE - 84);
              orb.vx = 0.35;
            } else {
              orb.x = cathX - 14;
              orb.vx = -Math.abs(orb.vx);
            }
          }
        } else if (!paused && shI) {
          orb.x += Math.sin(tick * 0.04 + orb.y) * 0.14;
          orb.y += Math.cos(tick * 0.04 + orb.x) * 0.14;
        }
        drawIonSphere(cctx, orb, !shI);
      }

      cathodeProductsRef.current = cathodeProductsRef.current.filter((p) => {
        if (active) {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 1;
        }
        drawNeutralProduct(cctx, p);
        return p.life > 0;
      });

      if (shE) {
        cathodeElectronsRef.current = cathodeElectronsRef.current.filter((e) => {
          if (active) {
            e.y += e.vy;
            e.life -= 1;
          }
          drawElectronDot(cctx, e.x, e.y);
          return e.life > 0 && e.y < LENS_SIZE - 14;
        });
      }

      cctx.fillStyle = '#bae6fd';
      cctx.font = 'bold 9px sans-serif';
      cctx.textAlign = 'center';
      cctx.fillText('KATOD (−)', cathX + cathodeW / 2, 15);
      if (shE && running && out.canConduct) {
        cctx.fillStyle = '#facc15';
        cctx.font = 'bold 8.5px sans-serif';
        cctx.fillText('↓ e⁻', cathX + 20, 28);
      }
      if (latticeFrozen) {
        cctx.fillStyle = '#94a3b8';
        cctx.font = 'bold 8px sans-serif';
        cctx.fillText('Kekisi Pepejal', LENS_SIZE / 2 - 20, LENS_SIZE - 12);
      }
      cctx.restore();

      rafId = window.requestAnimationFrame(stepAndRender);
    };

    rafId = window.requestAnimationFrame(stepAndRender);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      className="bg-[#070b14] rounded-xl border border-slate-800 p-2 space-y-1.5"
      data-testid="micro-zoom-panel"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          ARAS SUBMIKROSKOPIK • KANTA PEMBESAR ANOD & KATOD
        </span>
        <span className="text-[10px] font-semibold text-amber-300 bg-amber-950/50 border border-amber-500/30 px-2 py-0.5 rounded-full">
          {outcome.ionCompositionLabel}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 place-items-center">
        {/* Left Magnifier: Anode (+) */}
        <div className="flex flex-col items-center space-y-1">
          <div className="relative p-1 rounded-full border-2 border-rose-500/70 bg-slate-950 shadow-lg shadow-rose-950/50">
            <canvas
              ref={anodeCanvasRef}
              style={{ width: 142, height: 142 }}
              className="rounded-full block"
              aria-label="Kanta pembesar submikroskopik Anod"
            />
          </div>
          <div className="text-center leading-tight">
            <div className="text-[10.5px] font-bold text-rose-300">
              Anod (+): {outcome.anode.selectedSpecies} → {outcome.anode.productName}
            </div>
            <div className="text-[9.5px] text-slate-400 font-mono">
              {outcome.anode.halfEquation}
            </div>
          </div>
        </div>

        {/* Right Magnifier: Cathode (-) */}
        <div className="flex flex-col items-center space-y-1">
          <div className="relative p-1 rounded-full border-2 border-sky-500/70 bg-slate-950 shadow-lg shadow-sky-950/50">
            <canvas
              ref={cathodeCanvasRef}
              style={{ width: 142, height: 142 }}
              className="rounded-full block"
              aria-label="Kanta pembesar submikroskopik Katod"
            />
          </div>
          <div className="text-center leading-tight">
            <div className="text-[10.5px] font-bold text-sky-300">
              Katod (−): {outcome.cathode.selectedSpecies} → {outcome.cathode.productName}
            </div>
            <div className="text-[9.5px] text-slate-400 font-mono">
              {outcome.cathode.halfEquation}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
