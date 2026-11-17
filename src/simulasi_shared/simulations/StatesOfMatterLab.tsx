import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Atom,
  BookOpen,
  Flame,
  Pause,
  Play,
  RotateCcw,
  Snowflake,
  Sparkles,
  TableProperties,
  Thermometer,
} from 'lucide-react';
import { analytics } from '../services/analytics';
import {
  evaluateSubstanceAtSlider,
  formatKelvin,
  formatTempC,
  MATTER_SUBSTANCES,
  PROCESS_DETAILS,
  ProcessId,
  SLIDER_MAX,
  sliderPosToTempC,
  SubstanceId,
  SubstanceSpec,
  tempCToSliderPos,
  ThermalDirection,
} from '../data/statesOfMatterSubstances';

const SIM_ID = 'keadaan-zarah-jirim';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  homeCol: number;
  homeRow: number;
  angle: number;
  spin: number;
  role: 'a' | 'b';
}

const PARTICLE_COUNT = 30;
const CANVAS_W = 460;
const CANVAS_H = 224;
const VESSEL = { left: 48, right: 394, top: 20, bottom: 196 };

function createParticles(): Particle[] {
  const cols = 6;
  const rows = 5;
  const particles: Particle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    particles.push({
      x: VESSEL.left + 54 + col * 48 + (row % 2 === 1 ? 10 : 0),
      y: VESSEL.bottom - 18 - (rows - 1 - row) * 20,
      vx: (Math.random() - 0.5) * 2.2,
      vy: (Math.random() - 0.5) * 2.2,
      homeCol: col,
      homeRow: row,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.05,
      role: (col + row) % 2 === 0 ? 'a' : 'b',
    });
  }
  return particles;
}

function drawSphere(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  fill: string,
  stroke?: string
) {
  const grad = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.15, x, y, r);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.28, fill);
  grad.addColorStop(1, fill);
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function drawSubstanceParticle(
  ctx: CanvasRenderingContext2D,
  p: Particle,
  substanceId: SubstanceId,
  physicalState: string,
  index: number
) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(physicalState === 'solid' ? 0 : p.angle);

  if (substanceId === 'air') {
    // H2O bent triatomic molecule
    drawSphere(ctx, -6.5, 4.5, 3.8, '#f8fafc', '#64748b');
    drawSphere(ctx, 6.5, 4.5, 3.8, '#f8fafc', '#64748b');
    drawSphere(ctx, 0, -1, 6.2, '#ef4444', '#b91c1c');
  } else if (substanceId === 'naftalena') {
    // Double hexagonal aromatic rings (simplified C10H8)
    ctx.fillStyle = '#7c3aed';
    ctx.strokeStyle = '#5b21b6';
    ctx.lineWidth = 1.4;
    for (const cx of [-4.6, 4.6]) {
      ctx.beginPath();
      for (let k = 0; k < 6; k++) {
        const a = (Math.PI / 3) * k + Math.PI / 6;
        const px = cx + Math.cos(a) * 5.6;
        const py = Math.sin(a) * 5.6;
        if (k === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  } else if (substanceId === 'karbon_dioksida') {
    // Linear O=C=O
    drawSphere(ctx, -7.2, 0, 4.7, '#ef4444', '#b91c1c');
    drawSphere(ctx, 7.2, 0, 4.7, '#ef4444', '#b91c1c');
    drawSphere(ctx, 0, 0, 5.2, '#334155', '#0f172a');
  } else if (substanceId === 'oksigen') {
    // Diatomic O2
    drawSphere(ctx, -4.4, 0, 5.5, '#0284c7', '#0369a1');
    drawSphere(ctx, 4.4, 0, 5.5, '#38bdf8', '#0284c7');
  } else if (substanceId === 'helium') {
    // Single noble gas atom He
    drawSphere(ctx, 0, 0, 6.2, '#f59e0b', '#b45309');
  } else if (substanceId === 'natrium') {
    // Metallic Na atom
    drawSphere(ctx, 0, 0, 7.6, '#6366f1', '#4338ca');
  } else if (substanceId === 'natrium_klorida') {
    // Ionic lattice Na+ & Cl-
    if (p.role === 'a') {
      drawSphere(ctx, 0, 0, 6.0, '#7c3aed', '#5b21b6');
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 8px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('+', 0, 0.5);
    } else {
      drawSphere(ctx, 0, 0, 8.2, '#10b981', '#047857');
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('−', 0, 0.5);
    }
  } else if (substanceId === 'kuprum_sulfat') {
    if (physicalState === 'decomposing' && index % 2 === 1) {
      // Escaping SO3 gas molecule (trigonal planar look)
      drawSphere(ctx, 0, -5, 3.6, '#ef4444', '#b91c1c');
      drawSphere(ctx, -4.5, 3.2, 3.6, '#ef4444', '#b91c1c');
      drawSphere(ctx, 4.5, 3.2, 3.6, '#ef4444', '#b91c1c');
      drawSphere(ctx, 0, 0, 4.6, '#eab308', '#a16207');
    } else if (physicalState === 'decomposing') {
      // Dark CuO solid residue at bottom
      drawSphere(ctx, 0, 0, 7.4, '#1e293b', '#0f172a');
    } else if (p.role === 'a') {
      // Cu2+
      drawSphere(ctx, 0, 0, 6.4, '#2563eb', '#1d4ed8');
    } else {
      // SO4 2- cluster
      drawSphere(ctx, 0, 0, 7.8, '#94a3b8', '#475569');
      drawSphere(ctx, -3, -2, 2.6, '#f8fafc');
      drawSphere(ctx, 3, 2, 2.6, '#f8fafc');
    }
  }

  ctx.restore();
}

export const StatesOfMatterLab: React.FC = () => {
  const [substanceId, setSubstanceId] = useState<SubstanceId>('air');
  const substance = useMemo(
    () => MATTER_SUBSTANCES.find((s) => s.id === substanceId) ?? MATTER_SUBSTANCES[0],
    [substanceId]
  );

  const [sliderPos, setSliderPos] = useState<number>(() =>
    tempCToSliderPos(MATTER_SUBSTANCES[0], MATTER_SUBSTANCES[0].defaultTempC)
  );
  const [thermalDirection, setThermalDirection] = useState<ThermalDirection>('heating');
  const [autoMode, setAutoMode] = useState<'idle' | 'heating' | 'cooling'>('idle');
  const [activeRefTab, setActiveRefTab] = useState<'processes' | 'table'>('processes');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>(createParticles());
  const hasLoggedRef = useRef(false);

  const currentTempC = useMemo(
    () => sliderPosToTempC(substance, sliderPos),
    [substance, sliderPos]
  );

  const evaluated = useMemo(
    () => evaluateSubstanceAtSlider(substance, sliderPos, thermalDirection),
    [substance, sliderPos, thermalDirection]
  );

  // Keep live state in a ref for smooth 60fps canvas animation without resetting particles
  const simRef = useRef({
    substance,
    sliderPos,
    tempC: currentTempC,
    evaluated,
    thermalDirection,
    autoMode,
  });
  simRef.current = {
    substance,
    sliderPos,
    tempC: currentTempC,
    evaluated,
    thermalDirection,
    autoMode,
  };

  useEffect(() => {
    if (!hasLoggedRef.current) {
      hasLoggedRef.current = true;
      analytics.recordSimulationClick(SIM_ID, 1);
      analytics.recordSimulationCompleted(SIM_ID);
    }
  }, []);

  // Auto Heating / Auto Cooling playback with KSSM threshold pause (Rajah 2.6 & 2.7)
  useEffect(() => {
    if (autoMode === 'idle') return;
    let dwellTicks = 0;

    const timer = window.setInterval(() => {
      if (dwellTicks > 0) {
        dwellTicks -= 1;
        return;
      }

      setSliderPos((prev) => {
        const step = autoMode === 'heating' ? 5 : -5;
        const next = Math.max(0, Math.min(SLIDER_MAX, prev + step));

        // Brief realistic plateau dwell when crossing threshold points
        const thresholds =
          substance.phaseBehavior === 'three' ? [280, 720] : [460];
        for (const tp of thresholds) {
          if ((prev < tp && next >= tp) || (prev > tp && next <= tp)) {
            dwellTicks = 24; // ~0.95s plateau pause
            return tp;
          }
        }

        if (next === 0 || next === SLIDER_MAX) {
          setAutoMode('idle');
        }
        return next;
      });
    }, 40);

    return () => window.clearInterval(timer);
  }, [autoMode, substance.phaseBehavior]);

  // Continuous 2D particle physics + lab vessel + thermometer canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = CANVAS_W * dpr;
    canvas.height = CANVAS_H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let rafId = 0;
    let phaseTick = 0;

    const renderFrame = () => {
      phaseTick += 1;
      const {
        substance: sub,
        sliderPos: sPos,
        evaluated: ev,
        thermalDirection: dir,
      } = simRef.current;

      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Soft lab stage backdrop
      const bg = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
      bg.addColorStop(0, '#f8fafc');
      bg.addColorStop(1, '#f1f5f9');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Thermal effect below vessel (burner flame vs cooling ice glow)
      const vesselCenterX = (VESSEL.left + VESSEL.right) / 2;
      if (dir === 'heating') {
        const pulse = 0.88 + Math.sin(phaseTick * 0.18) * 0.12;
        const glow = ctx.createRadialGradient(
          vesselCenterX,
          VESSEL.bottom + 10,
          6,
          vesselCenterX,
          VESSEL.bottom + 12,
          110 * pulse
        );
        glow.addColorStop(0, 'rgba(249, 115, 22, 0.35)');
        glow.addColorStop(1, 'rgba(249, 115, 22, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(VESSEL.left, VESSEL.bottom - 6, VESSEL.right - VESSEL.left, 34);

        // Mini Bunsen flames under base
        for (let f = -1; f <= 1; f++) {
          const fx = vesselCenterX + f * 48;
          const fh = (11 + Math.sin(phaseTick * 0.25 + f) * 2.5);
          ctx.beginPath();
          ctx.moveTo(fx - 7, VESSEL.bottom + 20);
          ctx.quadraticCurveTo(fx, VESSEL.bottom + 20 - fh * 1.4, fx + 7, VESSEL.bottom + 20);
          ctx.closePath();
          ctx.fillStyle = '#f97316';
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(fx - 3.5, VESSEL.bottom + 20);
          ctx.quadraticCurveTo(fx, VESSEL.bottom + 20 - fh * 0.85, fx + 3.5, VESSEL.bottom + 20);
          ctx.closePath();
          ctx.fillStyle = '#fde047';
          ctx.fill();
        }
      } else {
        const chill = ctx.createRadialGradient(
          vesselCenterX,
          VESSEL.bottom + 10,
          10,
          vesselCenterX,
          VESSEL.bottom + 10,
          120
        );
        chill.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
        chill.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.fillStyle = chill;
        ctx.fillRect(VESSEL.left, VESSEL.bottom - 6, VESSEL.right - VESSEL.left, 34);

        // Ice bath tray visual under vessel
        ctx.fillStyle = '#bae6fd';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.roundRect(vesselCenterX - 95, VESSEL.bottom + 6, 190, 12, 4);
        ctx.fill();
        ctx.stroke();
      }

      // Sealed Glass Vessel Container
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(
        VESSEL.left,
        VESSEL.top,
        VESSEL.right - VESSEL.left,
        VESSEL.bottom - VESSEL.top,
        14
      );
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.clip();

      // Liquid pool fill when in liquid / transition
      if (
        ev.physicalState === 'liquid' ||
        ev.physicalState === 'melting_freezing' ||
        ev.physicalState === 'boiling_condensing'
      ) {
        const poolTop =
          ev.physicalState === 'boiling_condensing' ? VESSEL.bottom - 72 : VESSEL.bottom - 88;
        ctx.fillStyle = sub.colorTheme.liquidPool;
        ctx.beginPath();
        ctx.moveTo(VESSEL.left, VESSEL.bottom);
        ctx.lineTo(VESSEL.left, poolTop);
        for (let wx = VESSEL.left; wx <= VESSEL.right; wx += 14) {
          const wave =
            Math.sin(wx * 0.05 + phaseTick * 0.09) *
            (ev.physicalState === 'boiling_condensing' ? 3.5 : 1.5);
          ctx.lineTo(wx, poolTop + wave);
        }
        ctx.lineTo(VESSEL.right, VESSEL.bottom);
        ctx.closePath();
        ctx.fill();
      }

      // Physics update & particle drawing
      const particles = particlesRef.current;
      const ag = ev.agitationNorm;
      const solidGridXStart = vesselCenterX - 110;
      const solidGridYBottom = VESSEL.bottom - 20;

      particles.forEach((p, idx) => {
        const gx = solidGridXStart + p.homeCol * 42 + (p.homeRow % 2 === 1 ? 8 : 0);
        const gy = solidGridYBottom - (4 - p.homeRow) * 20;

        let modeForParticle: 'solid' | 'liquid' | 'gas' = 'solid';
        if (ev.physicalState === 'solid') {
          modeForParticle = 'solid';
        } else if (ev.physicalState === 'melting_freezing') {
          modeForParticle = p.homeRow <= 1 || idx % 3 === 0 ? 'liquid' : 'solid';
        } else if (ev.physicalState === 'liquid') {
          modeForParticle = 'liquid';
        } else if (ev.physicalState === 'boiling_condensing') {
          modeForParticle = p.homeRow <= 1 || idx % 2 === 0 ? 'gas' : 'liquid';
        } else if (ev.physicalState === 'subliming_depositing') {
          modeForParticle = p.homeRow <= 2 ? 'gas' : 'solid';
        } else if (ev.physicalState === 'decomposing') {
          modeForParticle = idx % 2 === 1 ? 'gas' : 'solid';
        } else {
          modeForParticle = 'gas';
        }

        if (modeForParticle === 'solid') {
          // Spring gently toward crystal lattice position + thermal vibration
          const vib = 0.8 + ag * 6.5;
          const targetX = gx + Math.sin(phaseTick * 0.42 + idx * 1.7) * vib;
          const targetY =
            (ev.physicalState === 'decomposing' ? VESSEL.bottom - 16 - (idx % 2) * 12 : gy) +
            Math.cos(phaseTick * 0.47 + idx * 2.1) * vib;
          p.x += (targetX - p.x) * 0.16;
          p.y += (targetY - p.y) * 0.16;
          p.vx *= 0.7;
          p.vy *= 0.7;
        } else if (modeForParticle === 'liquid') {
          const speed = 0.8 + ag * 2.1;
          p.vx += (Math.random() - 0.5) * 0.35;
          p.vy += (Math.random() - 0.5) * 0.35 + 0.08; // gentle gravity toward pool
          const mag = Math.hypot(p.vx, p.vy) || 1;
          if (mag > speed * 1.6) {
            p.vx = (p.vx / mag) * speed * 1.6;
            p.vy = (p.vy / mag) * speed * 1.6;
          }
          p.x += p.vx;
          p.y += p.vy;
          p.angle += p.spin;

          const minY = VESSEL.bottom - 82;
          if (p.x < VESSEL.left + 16) {
            p.x = VESSEL.left + 16;
            p.vx = Math.abs(p.vx);
          } else if (p.x > VESSEL.right - 16) {
            p.x = VESSEL.right - 16;
            p.vx = -Math.abs(p.vx);
          }
          if (p.y < minY) {
            p.y = minY;
            p.vy = Math.abs(p.vy);
          } else if (p.y > VESSEL.bottom - 14) {
            p.y = VESSEL.bottom - 14;
            p.vy = -Math.abs(p.vy) * 0.85;
          }
        } else {
          // Gas: energetic elastic movement filling whole chamber
          const gasSpeed = 1.9 + ag * 4.0;
          if (Math.hypot(p.vx, p.vy) < 0.7) {
            const ang = (idx * 2.39996) % (Math.PI * 2);
            p.vx = Math.cos(ang) * gasSpeed;
            p.vy = Math.sin(ang) * gasSpeed;
          }
          const cur = Math.hypot(p.vx, p.vy) || 1;
          const targetSpeed = gasSpeed;
          p.vx = (p.vx / cur) * (cur + (targetSpeed - cur) * 0.08);
          p.vy = (p.vy / cur) * (cur + (targetSpeed - cur) * 0.08);

          p.x += p.vx;
          p.y += p.vy;
          p.angle += p.spin * 2.2;

          if (p.x < VESSEL.left + 14) {
            p.x = VESSEL.left + 14;
            p.vx = Math.abs(p.vx);
          } else if (p.x > VESSEL.right - 14) {
            p.x = VESSEL.right - 14;
            p.vx = -Math.abs(p.vx);
          }
          if (p.y < VESSEL.top + 14) {
            p.y = VESSEL.top + 14;
            p.vy = Math.abs(p.vy);
          } else if (p.y > VESSEL.bottom - 14) {
            p.y = VESSEL.bottom - 14;
            p.vy = -Math.abs(p.vy);
          }
        }

        drawSubstanceParticle(ctx, p, sub.id, ev.physicalState, idx);
      });

      // CuSO4 equation watermark inside vessel when decomposing
      if (sub.id === 'kuprum_sulfat' && ev.physicalState === 'decomposing') {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.84)';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('CuSO₄(p)  →  CuO(p) + SO₃(g)', vesselCenterX, VESSEL.top + 18);
      }

      ctx.restore();

      // Vessel crisp glass border + stopper
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.roundRect(
        VESSEL.left,
        VESSEL.top,
        VESSEL.right - VESSEL.left,
        VESSEL.bottom - VESSEL.top,
        14
      );
      ctx.stroke();

      // Specular glass highlight stripe
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(VESSEL.left + 9, VESSEL.top + 18);
      ctx.lineTo(VESSEL.left + 9, VESSEL.bottom - 18);
      ctx.stroke();

      // Integrated Live Thermometer on right side of vessel
      const thermX = 424;
      const thermTop = 26;
      const thermHeight = 148;
      ctx.fillStyle = '#e2e8f0';
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.roundRect(thermX - 5, thermTop, 10, thermHeight, 5);
      ctx.fill();
      ctx.stroke();

      const fillFrac = Math.max(0.06, Math.min(1, sPos / SLIDER_MAX));
      const barH = fillFrac * (thermHeight - 8);
      const thermColor =
        sPos < 280 ? '#0284c7' : sPos < 720 ? '#d97706' : '#dc2626';
      ctx.fillStyle = thermColor;
      ctx.beginPath();
      ctx.roundRect(
        thermX - 3,
        thermTop + thermHeight - 4 - barH,
        6,
        barH,
        3
      );
      ctx.fill();

      // Thermometer bulb
      ctx.beginPath();
      ctx.arc(thermX, thermTop + thermHeight + 7, 10, 0, Math.PI * 2);
      ctx.fillStyle = thermColor;
      ctx.fill();
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Thermometer scale ticks
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1;
      for (let t = 0; t <= 4; t++) {
        const ty = thermTop + 10 + t * ((thermHeight - 20) / 4);
        ctx.beginPath();
        ctx.moveTo(thermX - 10, ty);
        ctx.lineTo(thermX - 6, ty);
        ctx.stroke();
      }

      // Label at left margin inside lab canvas
      ctx.fillStyle = '#475569';
      ctx.font = '600 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.save();
      ctx.translate(23, VESSEL.top + (VESSEL.bottom - VESSEL.top) / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('KEADAAN ZARAH (1 atm)', 0, 0);
      ctx.restore();

      rafId = window.requestAnimationFrame(renderFrame);
    };

    rafId = window.requestAnimationFrame(renderFrame);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const handleSelectSubstance = (nextSub: SubstanceSpec) => {
    setAutoMode('idle');
    setSubstanceId(nextSub.id);
    const nextPos = tempCToSliderPos(nextSub, nextSub.defaultTempC);
    setSliderPos(nextPos);
    setThermalDirection(nextSub.defaultTempC >= 0 ? 'heating' : 'cooling');
  };

  const handleSliderChange = (nextPos: number) => {
    setAutoMode('idle');
    if (nextPos > sliderPos) setThermalDirection('heating');
    else if (nextPos < sliderPos) setThermalDirection('cooling');
    setSliderPos(nextPos);
  };

  const handlePresetClick = (tempC: number, hint?: ThermalDirection) => {
    setAutoMode('idle');
    const nextPos = tempCToSliderPos(substance, tempC);
    if (hint) {
      setThermalDirection(hint);
    } else if (nextPos > sliderPos) {
      setThermalDirection('heating');
    } else if (nextPos < sliderPos) {
      setThermalDirection('cooling');
    }
    setSliderPos(nextPos);
  };

  const handleDemoProcess = (procId: ProcessId) => {
    const proc = PROCESS_DETAILS[procId];
    const targetSub =
      MATTER_SUBSTANCES.find((s) => s.id === proc.demoSubstanceId) ?? MATTER_SUBSTANCES[0];
    setAutoMode('idle');
    setSubstanceId(targetSub.id);
    setThermalDirection(proc.demoDirection);
    setSliderPos(tempCToSliderPos(targetSub, proc.demoTempC));
  };

  const stateBadgeStyle = useMemo(() => {
    switch (evaluated.physicalState) {
      case 'solid':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      case 'melting_freezing':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'liquid':
        return 'bg-sky-100 text-sky-900 border-sky-300';
      case 'boiling_condensing':
        return 'bg-orange-100 text-orange-900 border-orange-300';
      case 'subliming_depositing':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'decomposing':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      case 'gas':
        return 'bg-red-100 text-red-900 border-red-300';
    }
  }, [evaluated.physicalState]);

  const particleLabel =
    substance.particleCategory === 'atom'
      ? 'Atom'
      : substance.particleCategory === 'ion'
      ? 'Ion'
      : 'Molekul';

  return (
    <div className="space-y-2.5" data-testid="states-of-matter-lab">
      {/* 1. Top Navigation Strip: All 8 Substances */}
      <div
        className="grid grid-cols-4 lg:grid-cols-8 gap-1.5"
        role="tablist"
        aria-label="Pilih bahan kimia"
      >
        {MATTER_SUBSTANCES.map((s) => {
          const isSelected = s.id === substance.id;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              data-testid={`select-substance-${s.id}`}
              onClick={() => handleSelectSubstance(s)}
              className={`px-2 py-1.5 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? `${s.colorTheme.pillBg} ${s.colorTheme.pillBorder} ${s.colorTheme.pillText} ring-2 ring-cyan-500/30 shadow-xs`
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-extrabold tracking-tight">{s.formula}</span>
                <span className="text-[9px] font-semibold px-1 py-0.5 rounded bg-white/80 border border-slate-200/80 text-slate-500">
                  {s.roomStateLabel}
                </span>
              </div>
              <div className="text-[11px] font-semibold leading-tight truncate mt-0.5">
                {s.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. Main Interactive Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        {/* LEFT COLUMN: Particle Stage + Interactive Temperature Slider + Play Controls */}
        <div className="lg:col-span-6 space-y-2.5">
          {/* Particle Simulation Stage */}
          <div className="bg-white rounded-2xl border border-slate-200 p-2.5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-slate-900">
                  {substance.name} ({substance.formula})
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${substance.colorTheme.accentBadge}`}
                >
                  <Atom className="w-3 h-3" />
                  Zarah: {particleLabel}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    thermalDirection === 'heating'
                      ? 'bg-orange-50 text-orange-700 border-orange-200'
                      : 'bg-sky-50 text-sky-700 border-sky-200'
                  }`}
                >
                  {thermalDirection === 'heating' ? (
                    <>
                      <Flame className="w-3 h-3 text-orange-500" />
                      Pemanasan
                    </>
                  ) : (
                    <>
                      <Snowflake className="w-3 h-3 text-sky-500" />
                      Penyejukkan
                    </>
                  )}
                </span>
                <span
                  data-testid="current-state-badge"
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${stateBadgeStyle}`}
                >
                  {evaluated.stateTitle}
                </span>
              </div>
            </div>

            <canvas
              ref={canvasRef}
              aria-label={`Simulasi zarah ${substance.name} pada suhu ${formatTempC(currentTempC, substance)}`}
              className="w-full h-[214px] rounded-xl border border-slate-200 block bg-slate-50"
            />
          </div>

          {/* Temperature Slider & Controls Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    thermalDirection === 'heating'
                      ? 'bg-orange-100 text-orange-600'
                      : 'bg-sky-100 text-sky-600'
                  }`}
                >
                  <Thermometer className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                    Kawalan Suhu
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span
                      data-testid="current-temp-display"
                      className="text-lg font-extrabold text-slate-900 tabular-nums"
                    >
                      {formatTempC(currentTempC, substance)}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 tabular-nums">
                      ({formatKelvin(currentTempC)})
                    </span>
                  </div>
                </div>
              </div>

              {/* Direction Toggle Pill (useful at static transition temperature) */}
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button
                  type="button"
                  data-testid="dir-heating-btn"
                  onClick={() => {
                    setAutoMode('idle');
                    setThermalDirection('heating');
                  }}
                  className={`px-2 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                    thermalDirection === 'heating'
                      ? 'bg-white text-orange-600 shadow-xs'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Flame className="w-3 h-3" /> Panaskan
                </button>
                <button
                  type="button"
                  data-testid="dir-cooling-btn"
                  onClick={() => {
                    setAutoMode('idle');
                    setThermalDirection('cooling');
                  }}
                  className={`px-2 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                    thermalDirection === 'cooling'
                      ? 'bg-white text-sky-600 shadow-xs'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Snowflake className="w-3 h-3" /> Sejukkan
                </button>
              </div>
            </div>

            {/* Interactive Range Slider with Aligned Threshold Markers */}
            <div className="pt-0.5">
              <div className="relative flex items-center">
                <input
                  type="range"
                  data-testid="temp-slider"
                  min={0}
                  max={SLIDER_MAX}
                  step={1}
                  value={sliderPos}
                  aria-label="Slider suhu bahan"
                  aria-valuetext={formatTempC(currentTempC, substance)}
                  onChange={(e) => handleSliderChange(Number(e.target.value))}
                  className="w-full h-2.5 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-sky-500 via-amber-400 to-rose-600 accent-slate-900"
                />
              </div>

              {/* Threshold Tick Pins Under Track */}
              {substance.phaseBehavior === 'three' ? (
                <div className="relative h-7 mt-1 text-[10px] font-semibold text-slate-600">
                  <span className="absolute left-0 top-0 text-slate-400">
                    {substance.minTempC} °C
                  </span>
                  <button
                    type="button"
                    onClick={() => handlePresetClick(substance.meltingPointC!)}
                    style={{ left: '28%' }}
                    className="absolute -translate-x-1/2 top-0 flex flex-col items-center hover:text-amber-700 cursor-pointer"
                  >
                    <span className="w-0.5 h-1.5 bg-amber-500 rounded-full" />
                    <span className="whitespace-nowrap px-1 rounded bg-amber-50 border border-amber-200 text-amber-800">
                      TL/TB: {substance.meltingPointC} °C
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePresetClick(substance.boilingPointC!)}
                    style={{ left: '72%' }}
                    className="absolute -translate-x-1/2 top-0 flex flex-col items-center hover:text-rose-700 cursor-pointer"
                  >
                    <span className="w-0.5 h-1.5 bg-rose-500 rounded-full" />
                    <span className="whitespace-nowrap px-1 rounded bg-rose-50 border border-rose-200 text-rose-800">
                      TD: {substance.boilingPointC} °C
                    </span>
                  </button>
                  <span className="absolute right-0 top-0 text-slate-400">
                    {substance.maxTempC} °C
                  </span>
                </div>
              ) : (
                <div className="relative h-7 mt-1 text-[10px] font-semibold text-slate-600">
                  <span className="absolute left-0 top-0 text-slate-400">
                    {substance.minTempC} °C
                  </span>
                  <button
                    type="button"
                    onClick={() => handlePresetClick(substance.transitionPointC!)}
                    style={{ left: '46%' }}
                    className="absolute -translate-x-1/2 top-0 flex flex-col items-center hover:text-purple-700 cursor-pointer"
                  >
                    <span className="w-0.5 h-1.5 bg-purple-500 rounded-full" />
                    <span className="whitespace-nowrap px-1.5 rounded bg-purple-50 border border-purple-200 text-purple-800">
                      {substance.phaseBehavior === 'sublimation'
                        ? `Takat Pemejalwapan: ${substance.transitionPointC} °C`
                        : `Penguraian: ${substance.transitionPointC} °C`}
                    </span>
                  </button>
                  <span className="absolute right-0 top-0 text-slate-400">
                    {substance.maxTempC} °C
                  </span>
                </div>
              )}
            </div>

            {/* Quick Presets + Auto Play Row */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1 border-t border-slate-100">
              <div className="flex flex-wrap gap-1">
                {substance.presets.map((preset) => {
                  const isNear = Math.abs(currentTempC - preset.tempC) < 0.25;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handlePresetClick(preset.tempC, preset.directionHint)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border transition-all cursor-pointer ${
                        isNear
                          ? 'bg-slate-800 text-white border-slate-800'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-1.5 ml-auto">
                <button
                  type="button"
                  data-testid="auto-heat-btn"
                  onClick={() => {
                    if (autoMode === 'heating') {
                      setAutoMode('idle');
                    } else {
                      if (sliderPos >= SLIDER_MAX - 10) setSliderPos(0);
                      setThermalDirection('heating');
                      setAutoMode('heating');
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 border transition-all cursor-pointer ${
                    autoMode === 'heating'
                      ? 'bg-orange-600 text-white border-orange-600'
                      : 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100'
                  }`}
                >
                  {autoMode === 'heating' ? (
                    <Pause className="w-3 h-3" />
                  ) : (
                    <Play className="w-3 h-3" />
                  )}
                  Auto Panaskan
                </button>
                <button
                  type="button"
                  data-testid="auto-cool-btn"
                  onClick={() => {
                    if (autoMode === 'cooling') {
                      setAutoMode('idle');
                    } else {
                      if (sliderPos <= 10) setSliderPos(SLIDER_MAX);
                      setThermalDirection('cooling');
                      setAutoMode('cooling');
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 border transition-all cursor-pointer ${
                    autoMode === 'cooling'
                      ? 'bg-sky-600 text-white border-sky-600'
                      : 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100'
                  }`}
                >
                  {autoMode === 'cooling' ? (
                    <Pause className="w-3 h-3" />
                  ) : (
                    <Play className="w-3 h-3" />
                  )}
                  Auto Sejukkan
                </button>
                <button
                  type="button"
                  data-testid="reset-temp-btn"
                  onClick={() => handleSelectSubstance(substance)}
                  title="Reset ke suhu asal"
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Takat Lebur/Beku/Didih + Dynamic Kinetic Theory + 6 Processes / Table */}
        <div className="lg:col-span-6 space-y-2.5">
          {/* Mandatory 3 Thermal Threshold Cards: Takat Lebur, Takat Beku, Takat Didih */}
          <div className="grid grid-cols-3 gap-2" data-testid="phase-points-cards">
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl px-2.5 py-2">
              <div className="text-[10px] font-bold uppercase tracking-wide text-amber-700">
                Takat Lebur
              </div>
              <div className="text-sm font-extrabold text-amber-950 mt-0.5 leading-tight">
                {substance.meltingDisplay}
              </div>
              <div className="text-[10px] text-amber-800/80 mt-0.5 truncate">
                {substance.meltingNote ?? 'Pepejal → Cecair'}
              </div>
            </div>

            <div className="bg-cyan-50/80 border border-cyan-200 rounded-xl px-2.5 py-2">
              <div className="text-[10px] font-bold uppercase tracking-wide text-cyan-700">
                Takat Beku
              </div>
              <div className="text-sm font-extrabold text-cyan-950 mt-0.5 leading-tight">
                {substance.freezingDisplay}
              </div>
              <div className="text-[10px] text-cyan-800/80 mt-0.5 truncate">
                {substance.freezingNote ?? 'Cecair → Pepejal'}
              </div>
            </div>

            <div className="bg-rose-50/80 border border-rose-200 rounded-xl px-2.5 py-2">
              <div className="text-[10px] font-bold uppercase tracking-wide text-rose-700">
                Takat Didih
              </div>
              <div className="text-sm font-extrabold text-rose-950 mt-0.5 leading-tight">
                {substance.boilingDisplay}
              </div>
              <div className="text-[10px] text-rose-800/80 mt-0.5 truncate">
                {substance.boilingNote ?? 'Cecair → Gas'}
              </div>
            </div>
          </div>

          {/* Live Kinetic Theory & Thermal Process Analysis */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                <span className="text-xs font-bold text-slate-900">
                  {evaluated.activeProcessLabel}
                </span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  evaluated.heatFlowLabel === 'Haba Diserap'
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-sky-100 text-sky-800'
                }`}
              >
                {evaluated.heatFlowLabel}
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-snug">{evaluated.summaryText}</p>

            {/* 2x2 Kinetic Properties Grid */}
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                <span className="block text-[9px] uppercase font-bold text-slate-400">
                  Susunan Zarah
                </span>
                <span className="font-medium text-slate-800 leading-tight block mt-0.5">
                  {evaluated.arrangement}
                </span>
              </div>
              <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                <span className="block text-[9px] uppercase font-bold text-slate-400">
                  Pergerakan Zarah
                </span>
                <span className="font-medium text-slate-800 leading-tight block mt-0.5">
                  {evaluated.movement}
                </span>
              </div>
              <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                <span className="block text-[9px] uppercase font-bold text-slate-400">
                  Tenaga Kinetik
                </span>
                <span className="font-medium text-slate-800 leading-tight block mt-0.5">
                  {evaluated.kineticEnergy}
                </span>
                <div className="w-full h-1.5 rounded-full bg-slate-200 mt-1 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-amber-500 to-rose-500 transition-all duration-150"
                    style={{ width: `${Math.round(evaluated.agitationNorm * 100)}%` }}
                  />
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                <span className="block text-[9px] uppercase font-bold text-slate-400">
                  Daya Tarikan Antara Zarah
                </span>
                <span className="font-medium text-slate-800 leading-tight block mt-0.5">
                  {evaluated.attractionForce}
                </span>
              </div>
            </div>

            <div className="text-[10.5px] text-slate-500 bg-slate-50/80 px-2.5 py-1.5 rounded-lg border border-slate-100">
              <strong className="text-slate-700">Nota {substance.name}:</strong>{' '}
              {substance.scientificNote}
            </div>
          </div>

          {/* Compact Tabbed Reference: Rajah 2.2 (6 Processes) OR 8-Substance Comparison Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-2.5 shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button
                  type="button"
                  data-testid="tab-processes"
                  onClick={() => setActiveRefTab('processes')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                    activeRefTab === 'processes'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <BookOpen className="w-3 h-3" /> Rajah 2.2: 6 Proses
                </button>
                <button
                  type="button"
                  data-testid="tab-comparison"
                  onClick={() => setActiveRefTab('table')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                    activeRefTab === 'table'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <TableProperties className="w-3 h-3" /> Jadual 8 Bahan
                </button>
              </div>
              <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                {activeRefTab === 'processes'
                  ? 'Klik proses untuk uji bahan contoh'
                  : 'Klik baris untuk tukar bahan'}
              </span>
            </div>

            {activeRefTab === 'processes' ? (
              <div className="grid grid-cols-3 gap-1.5">
                {(['peleburan', 'pendidihan', 'pemejalwapan', 'pembekuan', 'kondensasi', 'pengendapan'] as ProcessId[]).map(
                  (procId) => {
                    const p = PROCESS_DETAILS[procId];
                    const isAbsorb = p.heat === 'Diserap';
                    const isActive = evaluated.activeProcessId === procId;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleDemoProcess(p.id)}
                        className={`px-2 py-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                          isActive
                            ? isAbsorb
                              ? 'bg-orange-100 border-orange-400 ring-1 ring-orange-400'
                              : 'bg-sky-100 border-sky-400 ring-1 ring-sky-400'
                            : isAbsorb
                            ? 'bg-orange-50/50 border-orange-200 hover:bg-orange-50'
                            : 'bg-sky-50/50 border-sky-200 hover:bg-sky-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-900">{p.name}</span>
                          <span
                            className={`text-[9px] font-bold px-1 rounded ${
                              isAbsorb ? 'text-orange-700 bg-orange-100' : 'text-sky-700 bg-sky-100'
                            }`}
                          >
                            {isAbsorb ? '+Haba' : '-Haba'}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-600 mt-0.5">
                          {p.from} → {p.to}
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
            ) : (
              <div className="overflow-x-auto max-h-[145px] overflow-y-auto rounded-lg border border-slate-100">
                <table className="w-full text-[10.5px] text-left border-collapse">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[9.5px] sticky top-0">
                    <tr>
                      <th className="py-1.5 px-2">Bahan</th>
                      <th className="py-1.5 px-1.5">Zarah</th>
                      <th className="py-1.5 px-1.5">T. Lebur</th>
                      <th className="py-1.5 px-1.5">T. Beku</th>
                      <th className="py-1.5 px-1.5">T. Didih</th>
                      <th className="py-1.5 px-1.5">@ 25 °C</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MATTER_SUBSTANCES.map((row) => {
                      const active = row.id === substance.id;
                      const zarahText =
                        row.particleCategory === 'atom'
                          ? 'Atom'
                          : row.particleCategory === 'ion'
                          ? 'Ion'
                          : 'Molekul';
                      return (
                        <tr
                          key={row.id}
                          onClick={() => handleSelectSubstance(row)}
                          className={`cursor-pointer transition-colors ${
                            active ? 'bg-cyan-50 font-semibold text-cyan-950' : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <td className="py-1 px-2 whitespace-nowrap">
                            {row.name} ({row.formula})
                          </td>
                          <td className="py-1 px-1.5">{zarahText}</td>
                          <td className="py-1 px-1.5 whitespace-nowrap">{row.meltingDisplay}</td>
                          <td className="py-1 px-1.5 whitespace-nowrap">{row.freezingDisplay}</td>
                          <td className="py-1 px-1.5 whitespace-nowrap">{row.boilingDisplay}</td>
                          <td className="py-1 px-1.5">{row.roomStateLabel}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
