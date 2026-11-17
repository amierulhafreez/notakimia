import React, { useState, useEffect, useRef } from 'react';
import { analytics } from '../services/analytics';
import confetti from 'canvas-confetti';
import {
  Play,
  Pause,
  RotateCcw,
  Flame,
  Snowflake,
  BookOpen,
  Thermometer,
  Atom,
  LineChart,
} from 'lucide-react';

type ExperimentMode = 'heating' | 'cooling';
type InfoView = 'phase' | 'discussion';

interface PhaseDetail {
  code: string;
  label: string;
  stateName: string;
  tempBehavior: string;
  bullets: string[];
  badgeClass: string;
}

const SIM_ID = 'pemanasan-dan-penyejukkan-naftalena';
const MAX_TIME = 8.0; // minit (0 -> 2.5 -> 5.5 -> 8.0)

const calcTemp = (t: number, mode: ExperimentMode): number => {
  if (mode === 'heating') {
    if (t <= 2.5) return 60 + (t / 2.5) * 20; // 60.0 -> 80.0
    if (t <= 5.5) return 80.0; // Plateau B -> C
    return 80 + ((t - 5.5) / 2.5) * 10; // 80.0 -> 90.0
  }
  if (t <= 2.5) return 90 - (t / 2.5) * 10; // 90.0 -> 80.0
  if (t <= 5.5) return 80.0; // Plateau F -> G
  return 80 - ((t - 5.5) / 2.5) * 20; // 80.0 -> 60.0
};

const getMeltFraction = (t: number, mode: ExperimentMode): number => {
  if (mode === 'heating') {
    if (t <= 2.5) return 0;
    if (t >= 5.5) return 1;
    return (t - 2.5) / 3.0;
  }
  if (t <= 2.5) return 1;
  if (t >= 5.5) return 0;
  return 1 - (t - 2.5) / 3.0;
};

const getPhaseDetail = (t: number, mode: ExperimentMode): PhaseDetail => {
  if (mode === 'heating') {
    if (t < 2.5) {
      return {
        code: 'A → B',
        label: 'Pemanasan Pepejal (A ke B)',
        stateName: 'Pepejal',
        tempBehavior: 'Suhu meningkat (60.0 °C → 80.0 °C)',
        bullets: [
          'Wujud dalam keadaan pepejal sepenuhnya; zarah tersusun rapat dan teratur.',
          'Apabila dipanaskan, zarah menyerap tenaga haba lalu bergetar lebih cepat kerana tenaga kinetik semakin bertambah.',
        ],
        badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      };
    }
    if (t <= 5.5) {
      return {
        code: 'B → C',
        label: 'Takat Lebur / Peleburan (B ke C)',
        stateName: 'Pepejal & Cecair',
        tempBehavior: 'Suhu malar pada 80.0 °C',
        bullets: [
          'Peleburan berlaku (wujud campuran pepejal dan cecair).',
          'Tiada peningkatan suhu dari B ke C kerana tenaga haba yang diserap digunakan untuk mengatasi daya tarikan antara zarah sehingga pepejal bertukar menjadi cecair.',
        ],
        badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
      };
    }
    return {
      code: 'C → D',
      label: 'Pemanasan Cecair (C ke D)',
      stateName: 'Cecair',
      tempBehavior: 'Suhu meningkat (80.0 °C → 90.0 °C)',
      bullets: [
        'Wujud dalam keadaan cecair sepenuhnya; zarah tersusun padat tetapi tidak teratur.',
        'Apabila dipanaskan, zarah menyerap haba dan bergerak menggelongsor dengan lebih cepat.',
      ],
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-200',
    };
  }

  // Cooling Mode (E -> F -> G -> H)
  if (t < 2.5) {
    return {
      code: 'E → F',
      label: 'Penyejukan Cecair (E ke F)',
      stateName: 'Cecair',
      tempBehavior: 'Suhu menurun (90.0 °C → 80.0 °C)',
      bullets: [
        'Wujud dalam keadaan cecair sepenuhnya.',
        'Apabila disejukkan, zarah membebaskan haba lalu bergerak dengan lebih perlahan kerana kehilangan tenaga kinetik.',
      ],
      badgeClass: 'bg-sky-100 text-sky-900 border-sky-200',
    };
  }
  if (t <= 5.5) {
    return {
      code: 'F → G',
      label: 'Takat Beku / Pembekuan (F ke G)',
      stateName: 'Cecair & Pepejal',
      tempBehavior: 'Suhu malar pada 80.0 °C',
      bullets: [
        'Pembekuan berlaku (wujud campuran cecair dan pepejal).',
        'Tiada penurunan suhu dari F ke G kerana tenaga haba yang dibebaskan ke persekitaran diimbangi oleh tenaga haba yang terbebas apabila zarah menarik antara satu sama lain untuk membentuk pepejal.',
      ],
      badgeClass: 'bg-cyan-100 text-cyan-900 border-cyan-300',
    };
  }
  return {
    code: 'G → H',
    label: 'Penyejukan Pepejal (G ke H)',
    stateName: 'Pepejal',
    tempBehavior: 'Suhu menurun (80.0 °C → 60.0 °C)',
    bullets: [
      'Wujud dalam keadaan pepejal sepenuhnya.',
      'Apabila disejukkan, zarah membebaskan haba lalu bergetar dengan lebih perlahan pada kedudukan tetap.',
    ],
    badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  };
};

interface Particle {
  col: number;
  row: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phaseOffset: number;
}

export const NaphthaleneCooling: React.FC = () => {
  const [mode, setMode] = useState<ExperimentMode>('heating');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [infoView, setInfoView] = useState<InfoView>('phase');
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const simStateRef = useRef({ time: 0, mode: 'heating' as ExperimentMode, temp: 60, meltFraction: 0 });

  const temperature = calcTemp(time, mode);
  const meltFraction = getMeltFraction(time, mode);
  const phaseDetail = getPhaseDetail(time, mode);

  useEffect(() => {
    simStateRef.current = { time, mode, temp: temperature, meltFraction };
  }, [time, mode, temperature, meltFraction]);

  // Main progression timer (respects Pause cleanly!)
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev >= MAX_TIME) {
          setIsPlaying(false);
          return MAX_TIME;
        }
        const next = Math.min(MAX_TIME, Math.round((prev + 0.04) * 100) / 100);
        if (next >= MAX_TIME && !hasCompleted) {
          setHasCompleted(true);
          setIsPlaying(false);
          analytics.recordSimulationCompleted(SIM_ID);
          confetti({ particleCount: 60, spread: 55, origin: { y: 0.6 } });
        }
        return next;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [isPlaying, hasCompleted]);

  // Particle kinetic animation Canvas (smooth real-time kinetic theory visual!)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cols = 6;
    const rows = 4;
    const total = cols * rows;

    // Initialize particle lattice targets + velocities
    const particles: Particle[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const homeX = 52 + c * 29;
        const homeY = 34 + r * 29;
        particles.push({
          col: c,
          row: r,
          x: homeX + (Math.random() - 0.5) * 4,
          y: homeY + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4,
          phaseOffset: Math.random() * Math.PI * 2,
        });
      }
    }

    let animId: number;
    let tick = 0;

    const render = () => {
      tick += 0.08;
      const { temp, meltFraction: mf } = simStateRef.current;

      ctx.clearRect(0, 0, W, H);

      // How many particles are in liquid state right now (top rows melt first!)
      const liquidCount = Math.round(mf * total);
      const vibAmp = 0.8 + Math.max(0, temp - 60) * 0.085;
      const liquidSpeed = 0.65 + Math.max(0, temp - 78) * 0.09;

      for (let i = 0; i < total; i++) {
        const p = particles[i];
        const homeX = 52 + p.col * 29;
        const homeY = 34 + p.row * 29;
        const isLiquid = i < liquidCount;

        if (!isLiquid) {
          // Solid particle: vibrates tightly around its fixed crystal lattice point
          p.x = homeX + Math.sin(tick * 2.2 + p.phaseOffset) * vibAmp;
          p.y = homeY + Math.cos(tick * 2.5 + p.phaseOffset * 1.3) * vibAmp;
        } else {
          // Liquid particle: glides past neighbors within container bounds
          p.x += p.vx * liquidSpeed;
          p.y += p.vy * liquidSpeed;

          // Keep inside container
          if (p.x < 22) {
            p.x = 22;
            p.vx = Math.abs(p.vx);
          } else if (p.x > W - 22) {
            p.x = W - 22;
            p.vx = -Math.abs(p.vx);
          }
          if (p.y < 18) {
            p.y = 18;
            p.vy = Math.abs(p.vy);
          } else if (p.y > H - 18) {
            p.y = H - 18;
            p.vy = -Math.abs(p.vy);
          }

          // Gentle velocity perturbation so particles keep sliding organically
          if (Math.random() < 0.04) {
            p.vx += (Math.random() - 0.5) * 0.35;
            p.vy += (Math.random() - 0.5) * 0.35;
            const mag = Math.hypot(p.vx, p.vy) || 1;
            p.vx = (p.vx / mag) * 1.1;
            p.vy = (p.vy / mag) * 1.1;
          }
        }

        // Draw sphere with subtle radial highlight
        const radius = 10.5;
        const grad = ctx.createRadialGradient(p.x - 3, p.y - 3, 1.5, p.x, p.y, radius);
        if (isLiquid) {
          grad.addColorStop(0, '#fde68a');
          grad.addColorStop(0.55, '#f59e0b');
          grad.addColorStop(1, '#b45309');
        } else {
          grad.addColorStop(0, '#c7d2fe');
          grad.addColorStop(0.55, '#6366f1');
          grad.addColorStop(1, '#3730a3');
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = isLiquid ? '#92400e' : '#312e81';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleModeChange = (newMode: ExperimentMode) => {
    setMode(newMode);
    setIsPlaying(false);
    setTime(0);
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  const handleTogglePlayPause = () => {
    if (time >= MAX_TIME && !isPlaying) {
      setTime(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((p) => !p);
    }
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  const handleJumpToTime = (targetTime: number) => {
    setIsPlaying(false);
    setTime(targetTime);
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTime(0);
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  // Graph coordinate helper: X = 38..318 (t = 0..8), Y = 148..22 (temp = 55..95)
  const mapX = (t: number) => 38 + (t / MAX_TIME) * 280;
  const mapY = (tempVal: number) => 148 - ((tempVal - 55) / 40) * 126;

  const fullPath =
    mode === 'heating'
      ? `M ${mapX(0)} ${mapY(60)} L ${mapX(2.5)} ${mapY(80)} L ${mapX(5.5)} ${mapY(80)} L ${mapX(8)} ${mapY(90)}`
      : `M ${mapX(0)} ${mapY(90)} L ${mapX(2.5)} ${mapY(80)} L ${mapX(5.5)} ${mapY(80)} L ${mapX(8)} ${mapY(60)}`;

  // Partial traced polyline up to current `time`
  const buildActivePath = () => {
    const pts: string[] = [`M ${mapX(0)} ${mapY(calcTemp(0, mode))}`];
    if (time > 0) {
      if (time >= 2.5) pts.push(`L ${mapX(2.5)} ${mapY(80)}`);
      if (time >= 5.5) pts.push(`L ${mapX(5.5)} ${mapY(80)}`);
      pts.push(`L ${mapX(time)} ${mapY(temperature)}`);
    }
    return pts.join(' ');
  };

  const dotX = mapX(time);
  const dotY = mapY(temperature);

  return (
    <div className="space-y-3 text-slate-800">
      {/* Compact Top Control Bar */}
      <div className="bg-gradient-to-r from-rose-50 via-purple-50 to-sky-50 border border-slate-200 rounded-xl px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2">
        {/* Mode Switch (Rajah 2.4 Pemanasan vs Rajah 2.5 Penyejukan) */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => handleModeChange('heating')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              mode === 'heating'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Rajah 2.4: Pemanasan
          </button>
          <button
            onClick={() => handleModeChange('cooling')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              mode === 'cooling'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Snowflake className="w-3.5 h-3.5" />
            Rajah 2.5: Penyejukan
          </button>
        </div>

        {/* Center: Play / Pause + Quick Phase Jumps + Reset */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={handleTogglePlayPause}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 text-white shadow-xs transition cursor-pointer ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-700'
                : mode === 'heating'
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-sky-600 hover:bg-sky-700'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? 'Jeda (Pause)' : time > 0 && time < MAX_TIME ? 'Teruskan' : 'Mula Eksperimen'}
          </button>

          {/* Instant Segment Jumps for Teaching */}
          <div className="hidden sm:flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 text-[11px] font-bold">
            {(mode === 'heating'
              ? [
                  { label: 'A→B', t: 1.2 },
                  { label: 'B→C (80°)', t: 4.0 },
                  { label: 'C→D', t: 6.8 },
                ]
              : [
                  { label: 'E→F', t: 1.2 },
                  { label: 'F→G (80°)', t: 4.0 },
                  { label: 'G→H', t: 6.8 },
                ]
            ).map((seg) => (
              <button
                key={seg.label}
                onClick={() => handleJumpToTime(seg.t)}
                className="px-2 py-1 rounded-md hover:bg-slate-100 text-slate-700 transition cursor-pointer"
                title={`Lompat dan jeda pada segmen ${seg.label}`}
              >
                {seg.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Main Single-Screen Cockpit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        {/* LEFT 5 COLS: Textbook Exact SVG Diagram (Rajah 2.4 / Rajah 2.5) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-600 uppercase tracking-wide text-[11px]">
              {mode === 'heating' ? 'Susunan Radas Rajah 2.4 (Kukus Air)' : 'Susunan Radas Rajah 2.5 (Kelalang Kon)'}
            </span>
            <span className="font-mono font-extrabold text-purple-800 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Thermometer className="w-3.5 h-3.5 text-rose-600" />
              {temperature.toFixed(1)} °C
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-1.5 overflow-hidden flex-1 flex items-center justify-center">
            <svg viewBox="0 0 430 340" className="w-full max-h-[340px] h-auto select-none">
              {/* Lab Bench */}
              <rect x="20" y="320" width="390" height="10" rx="3" fill="#cbd5e1" />

              {/* Retort Stand (Kaki retort & pengapit) on left */}
              <rect x="52" y="308" width="95" height="12" rx="2" fill="#475569" stroke="#334155" strokeWidth="1.2" />
              <rect x="74" y="38" width="9" height="272" rx="2" fill="#64748b" stroke="#334155" strokeWidth="1" />
              {/* Bosshead & Clamp arm holding Boiling Tube */}
              <rect x="70" y="96" width="17" height="14" rx="2" fill="#334155" />
              <rect x="87" y="100" width="107" height="5" fill="#64748b" stroke="#334155" strokeWidth="0.8" />
              <rect x="193" y="96" width="38" height="13" rx="3" fill="none" stroke="#334155" strokeWidth="3" />

              {mode === 'heating' ? (
                /* RAJAH 2.4: WATER BATH + TRIPOD + WIRE GAUZE + BUNSEN BURNER */
                <g>
                  {/* Tripod Stand (Tungku kaki tiga) */}
                  <rect x="150" y="232" width="124" height="6" rx="2" fill="#334155" />
                  <line x1="160" y1="238" x2="146" y2="320" stroke="#334155" strokeWidth="5.5" strokeLinecap="round" />
                  <line x1="264" y1="238" x2="278" y2="320" stroke="#334155" strokeWidth="5.5" strokeLinecap="round" />

                  {/* Wire Gauze (Kasa dawai) */}
                  <rect x="156" y="227" width="112" height="5" fill="#94a3b8" stroke="#475569" strokeWidth="1" />

                  {/* Bunsen Burner */}
                  <rect x="192" y="309" width="40" height="11" rx="2" fill="#475569" />
                  <rect x="206" y="274" width="12" height="35" fill="#64748b" stroke="#334155" strokeWidth="1" />
                  {/* Animated Bunsen Flame (visible when active & heating) */}
                  {isPlaying && (
                    <g>
                      <path d="M 212 238 Q 223 256 212 273 Q 201 256 212 238 Z" fill="#f97316" opacity="0.9">
                        <animate
                          attributeName="d"
                          values="M 212 238 Q 223 256 212 273 Q 201 256 212 238 Z;M 212 234 Q 226 256 212 273 Q 198 256 212 234 Z;M 212 238 Q 223 256 212 273 Q 201 256 212 238 Z"
                          dur="0.45s"
                          repeatCount="indefinite"
                        />
                      </path>
                      <path d="M 212 250 Q 217 262 212 272 Q 207 262 212 250 Z" fill="#60a5fa" />
                    </g>
                  )}

                  {/* 250 cm³ Beaker (Kukus Air) */}
                  <rect x="166" y="152" width="92" height="74" fill="#bae6fd" fillOpacity="0.45" />
                  {/* Water bubbles when heating */}
                  {isPlaying && (
                    <g>
                      <circle cx="180" cy="212" r="2.2" fill="#ffffff" opacity="0.8">
                        <animate attributeName="cy" values="218;160" dur="1.1s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="244" cy="204" r="2" fill="#ffffff" opacity="0.8">
                        <animate attributeName="cy" values="216;158" dur="0.9s" repeatCount="indefinite" />
                      </circle>
                    </g>
                  )}
                  <path d="M 164 134 L 166 226 L 258 226 L 260 134" fill="none" stroke="#334155" strokeWidth="2.2" />

                  {/* Labels */}
                  <text x="275" y="172" fill="#0369a1" fontSize="11" fontWeight="bold">Air (kukus air)</text>
                  <line x1="252" y1="168" x2="271" y2="168" stroke="#0369a1" strokeWidth="1" />

                  <text x="275" y="252" fill="#0f172a" fontSize="10.5" fontWeight="bold">Kasa dawai &amp;</text>
                  <text x="275" y="264" fill="#0f172a" fontSize="10.5" fontWeight="bold">tungku kaki tiga</text>
                  <line x1="255" y1="232" x2="272" y2="250" stroke="#334155" strokeWidth="1" />

                  <text x="275" y="294" fill="#c2410c" fontSize="10.5" fontWeight="bold">
                    {isPlaying ? 'Penunu Bunsen (Aktif)' : 'Penunu Bunsen (Dijeda)'}
                  </text>
                  <line x1="222" y1="286" x2="271" y2="290" stroke="#c2410c" strokeWidth="1" />
                </g>
              ) : (
                /* RAJAH 2.5: CONICAL FLASK COOLING IN AIR */
                <g>
                  {/* Conical Flask (Kelalang kon) below Boiling Tube */}
                  <path
                    d="M 188 156 L 188 188 L 146 312 Q 143 319 152 319 L 272 319 Q 281 319 278 312 L 236 188 L 236 156"
                    fill="#f8fafc"
                    fillOpacity="0.6"
                    stroke="#334155"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                  <ellipse cx="212" cy="156" rx="26" ry="3.5" fill="#f8fafc" stroke="#334155" strokeWidth="2" />

                  <text x="276" y="246" fill="#0f172a" fontSize="11" fontWeight="bold">Kelalang kon</text>
                  <text x="276" y="259" fill="#475569" fontSize="10">(penyejukan perlahan &amp; sekata)</text>
                  <line x1="250" y1="242" x2="272" y2="242" stroke="#334155" strokeWidth="1" />
                </g>
              )}

              {/* BOILING TUBE (Tabung didih) + NAPHTHALENE + THERMOMETER (Shared & Centered) */}
              <g>
                {/* Naphthalene inside Boiling Tube (Color & crystal texture reflect meltFraction!) */}
                <path
                  d="M 197 166 L 197 204 Q 197 219 212 219 Q 227 219 227 204 L 227 166 Z"
                  fill={meltFraction > 0.85 ? '#fde68a' : meltFraction < 0.15 ? '#e2e8f0' : '#fef3c7'}
                  className="transition-colors duration-300"
                />
                {/* Crystalline solid flecks visible when solid/melting */}
                {meltFraction < 0.9 && (
                  <g fill="#ffffff" stroke="#94a3b8" strokeWidth="0.6" opacity={1 - meltFraction * 0.85}>
                    <circle cx="206" cy="204" r="3" />
                    <circle cx="218" cy="208" r="2.8" />
                    <circle cx="211" cy="196" r="3.2" />
                    <circle cx="204" cy="186" r="2.5" />
                    <circle cx="220" cy="192" r="2.8" />
                  </g>
                )}

                {/* Boiling Tube Glass Outline */}
                <path
                  d="M 195 72 L 195 204 Q 195 222 212 222 Q 229 222 229 204 L 229 72"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="2.2"
                />
                <ellipse cx="212" cy="72" rx="18" ry="3.2" fill="#f8fafc" stroke="#334155" strokeWidth="1.8" />

                {/* Thermometer dipping inside Naphthalene */}
                <rect x="209.5" y="18" width="5" height="178" rx="2.5" fill="#ffffff" stroke="#475569" strokeWidth="1.2" />
                <circle cx="212" cy="198" r="5" fill="#dc2626" />
                {/* Red mercury column proportional to 55..95 °C */}
                {(() => {
                  const colH = 30 + ((temperature - 55) / 40) * 115;
                  return <rect x="211" y={195 - colH} width="2" height={colH} fill="#dc2626" />;
                })()}
              </g>

              {/* Shared Top Textbook Labels */}
              <text x="275" y="40" fill="#0f172a" fontSize="11" fontWeight="bold">Termometer (−10–110 °C)</text>
              <line x1="216" y1="37" x2="271" y2="37" stroke="#334155" strokeWidth="1" />

              <text x="275" y="84" fill="#0f172a" fontSize="11" fontWeight="bold">Tabung didih</text>
              <line x1="230" y1="81" x2="271" y2="81" stroke="#334155" strokeWidth="1" />

              <text x="275" y="196" fill="#0f172a" fontSize="11" fontWeight="bold">Naftalena, C₁₀H₈</text>
              <line x1="227" y1="193" x2="271" y2="193" stroke="#334155" strokeWidth="1" />
            </svg>
          </div>

          {/* Scrub / Pause Time Slider right beneath diagram */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 space-y-1">
            <div className="flex justify-between text-[11px] font-bold text-slate-700">
              <span>Kawalan Garis Masa (Seret bila dijeda)</span>
              <span className="font-mono text-purple-700">
                {time.toFixed(1)} / {MAX_TIME.toFixed(1)} min
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={MAX_TIME}
              step={0.1}
              value={time}
              onChange={(e) => handleJumpToTime(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>
        </div>

        {/* RIGHT 7 COLS: Particle Box + Live Graph Side-by-Side, Explanation Card Underneath */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
          {/* TOP SUB-ROW: Particles + Live Graph Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Sub-panel A: Perubahan Keadaan Fizikal Zarah */}
            <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Atom className="w-4 h-4 text-indigo-600" />
                  Keadaan Fizikal Zarah
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${phaseDetail.badgeClass}`}>
                  {phaseDetail.stateName}
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-1 flex items-center justify-center relative">
                <canvas ref={canvasRef} width={250} height={150} className="w-full max-w-[250px] h-auto" />
                {!isPlaying && time > 0 && time < MAX_TIME && (
                  <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-900 text-[9.5px] font-bold">
                    DIJEDA
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-[10.5px] text-slate-600 mt-1.5 px-1">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" /> Zarah Pepejal (bergetar)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Zarah Cecair (menggelongsor)
                </span>
              </div>
            </div>

            {/* Sub-panel B: Graf Lengkung Pemanasan / Penyejukan (Rajah 2.6 / 2.7) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <LineChart className="w-4 h-4 text-rose-600" />
                  {mode === 'heating' ? 'Rajah 2.6: Graf Pemanasan' : 'Rajah 2.7: Graf Penyejukan'}
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-600">
                  {phaseDetail.code}
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-1">
                <svg viewBox="0 0 340 175" className="w-full h-auto select-none">
                  {/* Axes */}
                  <line x1="38" y1="14" x2="38" y2="148" stroke="#334155" strokeWidth="1.8" />
                  <line x1="38" y1="148" x2="326" y2="148" stroke="#334155" strokeWidth="1.8" />

                  {/* 80°C Melting / Freezing Point Dotted Line */}
                  <line x1="38" y1={mapY(80)} x2="320" y2={mapY(80)} stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="4 3" />
                  <text x="33" y={mapY(80) + 3} textAnchor="end" fontSize="9.5" fontWeight="bold" fill="#7c3aed">
                    80°C
                  </text>
                  <text x="33" y={mapY(90) + 3} textAnchor="end" fontSize="8.5" fill="#64748b">
                    90
                  </text>
                  <text x="33" y={mapY(60) + 3} textAnchor="end" fontSize="8.5" fill="#64748b">
                    60
                  </text>

                  <text x="8" y="14" fontSize="8.5" fontWeight="bold" fill="#334155">Suhu (°C)</text>
                  <text x="288" y="164" fontSize="8.5" fontWeight="bold" fill="#334155">Masa (min)</text>

                  {/* Ghost full reference path */}
                  <path
                    d={fullPath}
                    fill="none"
                    stroke={mode === 'heating' ? '#fecdd3' : '#bae6fd'}
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                  />

                  {/* Progressive active traced curve */}
                  <path
                    d={buildActivePath()}
                    fill="none"
                    stroke={mode === 'heating' ? '#e11d48' : '#0284c7'}
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Key Points A,B,C,D or E,F,G,H */}
                  {mode === 'heating'
                    ? [
                        { label: 'A', t: 0, temp: 60, dx: -8, dy: 4 },
                        { label: 'B', t: 2.5, temp: 80, dx: -4, dy: -8 },
                        { label: 'C', t: 5.5, temp: 80, dx: 4, dy: 12 },
                        { label: 'D', t: 8.0, temp: 90, dx: 6, dy: -4 },
                      ].map((pt) => (
                        <g key={pt.label}>
                          <circle cx={mapX(pt.t)} cy={mapY(pt.temp)} r="3" fill="#475569" />
                          <text x={mapX(pt.t) + pt.dx} y={mapY(pt.temp) + pt.dy} fontSize="10" fontWeight="bold" fill="#0f172a">
                            {pt.label}
                          </text>
                        </g>
                      ))
                    : [
                        { label: 'E', t: 0, temp: 90, dx: -8, dy: -4 },
                        { label: 'F', t: 2.5, temp: 80, dx: -6, dy: 12 },
                        { label: 'G', t: 5.5, temp: 80, dx: 4, dy: -8 },
                        { label: 'H', t: 8.0, temp: 60, dx: 6, dy: 4 },
                      ].map((pt) => (
                        <g key={pt.label}>
                          <circle cx={mapX(pt.t)} cy={mapY(pt.temp)} r="3" fill="#475569" />
                          <text x={mapX(pt.t) + pt.dx} y={mapY(pt.temp) + pt.dy} fontSize="10" fontWeight="bold" fill="#0f172a">
                            {pt.label}
                          </text>
                        </g>
                      ))}

                  {/* Current Live Marker Dot */}
                  <circle cx={dotX} cy={dotY} r="7" fill="#7c3aed" fillOpacity="0.22" />
                  <circle cx={dotX} cy={dotY} r="4.5" fill="#7c3aed" stroke="#ffffff" strokeWidth="1.5" />
                </svg>
              </div>

              <div className="text-[10.5px] font-semibold text-purple-800 mt-1 px-1">
                {mode === 'heating' ? 'Takat lebur = 80.0 °C (B→C)' : 'Takat beku = 80.0 °C (F→G)'}
              </div>
            </div>
          </div>

          {/* BOTTOM SUB-ROW: Live Phase Explanation / Discussion Tabs */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm flex-1 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setInfoView('phase')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    infoView === 'phase' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Penerangan Fasa Semasa ({phaseDetail.code})
                </button>
                <button
                  onClick={() => setInfoView('discussion')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                    infoView === 'discussion' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Perbincangan Aktiviti 2.2
                </button>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">{phaseDetail.tempBehavior}</span>
            </div>

            {infoView === 'phase' ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">{phaseDetail.label}</h4>
                  {!isPlaying && time > 0 && time < MAX_TIME && (
                    <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      Dijeda untuk bacaan — klik &ldquo;Teruskan&rdquo; untuk sambung
                    </span>
                  )}
                </div>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700 leading-relaxed">
                  {phaseDetail.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700">
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>1. Mengapa guna kukus air (bukan api terus)?</strong> Naftalena mudah terbakar dan takat lebur (80°C) lebih rendah daripada takat didih air (100°C); pemanasan sekata terjamin.
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>2. Mengapa kelalang kon digunakan?</strong> Mengelakkan kehilangan haba terlalu cepat ke udara supaya penyejukan berlaku secara sekata dan perlahan (mengelak penyejukan lampau).
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 sm:col-span-2">
                  <strong>3. Mengapa naftalena dikacau berterusan semasa penyejukan?</strong> Untuk memastikan suhu seragam di seluruh cecair naftalena dan mengelakkan berlakunya penyejukan lampau (<em>supercooling</em>).
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
