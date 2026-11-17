import React, { useState, useEffect } from 'react';
import { analytics } from '../services/analytics';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Droplets,
  Play,
  Square,
  CheckCircle2,
  AlertTriangle,
  Lock,
  FlaskConical,
  Table2,
  Calculator,
  Palette,
} from 'lucide-react';

type IndicatorType = 'fenolftalein' | 'metil-jingga';
type DripSpeed = 'slow' | 'fast';
type InfoTab = 'jadual65' | 'formula' | 'jadual64';

interface TitrationRecord {
  label: string;
  initial: number;
  final: number;
  volume: number;
  indicator: IndicatorType;
}

const SIM_ID = 'pentitratan-asid-alkali';
const ENDPOINT_VOLUME = 25.0; // 25.0 cm³ KOH 1.0 M + HNO₃ 1.0 M => Va = 25.00 cm³

export const AcidBaseTitration: React.FC = () => {
  const [indicator, setIndicator] = useState<IndicatorType>('fenolftalein');
  const [buretteVolume, setBuretteVolume] = useState<number>(0.0); // 0.00 to 50.00 cm³
  const [isDripping, setIsDripping] = useState<boolean>(false);
  const [dripSpeed, setDripSpeed] = useState<DripSpeed>('slow');
  const [isSwirling, setIsSwirling] = useState<boolean>(false);
  const [activeInfoTab, setActiveInfoTab] = useState<InfoTab>('jadual65');
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [endpointReached, setEndpointReached] = useState<boolean>(false);
  const [stoppedAssessment, setStoppedAssessment] = useState<
    'none' | 'early' | 'exact' | 'overshot'
  >('none');
  const [hasRecordedCompletion, setHasRecordedCompletion] = useState<boolean>(false);
  const [records, setRecords] = useState<TitrationRecord[]>([]);

  // Drip loop: keeps running past 25.00 cm³ unless user clicks Stop
  useEffect(() => {
    if (!isDripping) return;

    const timer = setInterval(() => {
      setBuretteVolume((prev) => {
        if (prev >= 50.0) {
          setIsDripping(false);
          return 50.0;
        }
        const step = dripSpeed === 'slow' ? 0.1 : 0.5;
        return Math.min(50.0, Math.round((prev + step) * 100) / 100);
      });
    }, dripSpeed === 'slow' ? 280 : 110);

    return () => clearInterval(timer);
  }, [isDripping, dripSpeed]);

  // Lock/record endpoint flag when burette crosses/reaches 25.00 cm³, WITHOUT stopping the simulation
  useEffect(() => {
    if (buretteVolume >= ENDPOINT_VOLUME && !endpointReached) {
      setEndpointReached(true);
    }
  }, [buretteVolume, endpointReached]);

  // If burette drains all the way to 50.00 cm³ without manual stop
  useEffect(() => {
    if (buretteVolume >= 50.0 && hasStarted && !isDripping && stoppedAssessment === 'none') {
      setStoppedAssessment('overshot');
    }
  }, [buretteVolume, hasStarted, isDripping, stoppedAssessment]);

  const evaluateAtStop = (vol: number) => {
    if (!hasStarted && vol === 0) return;
    if (vol < 24.9) {
      setStoppedAssessment('early');
    } else if (vol <= 25.1) {
      setStoppedAssessment('exact');
      if (!hasRecordedCompletion) {
        setHasRecordedCompletion(true);
        analytics.recordSimulationCompleted(SIM_ID);
      }
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } else {
      setStoppedAssessment('overshot');
    }
  };

  const handleToggleDrip = () => {
    analytics.recordSimulationClick(SIM_ID, 1);
    if (isDripping) {
      setIsDripping(false);
      evaluateAtStop(buretteVolume);
    } else {
      if (buretteVolume >= 50.0) return;
      setHasStarted(true);
      setStoppedAssessment('none');
      setIsDripping(true);
    }
  };

  const handleAddSingleDrop = (stepAmount: number) => {
    if (isDripping || buretteVolume >= 50.0) return;
    analytics.recordSimulationClick(SIM_ID, 1);
    setHasStarted(true);
    const next = Math.min(50.0, Math.round((buretteVolume + stepAmount) * 100) / 100);
    setBuretteVolume(next);
    if (next >= ENDPOINT_VOLUME && !endpointReached) {
      setEndpointReached(true);
    }
    evaluateAtStop(next);
  };

  const handleSelectIndicator = (nextInd: IndicatorType) => {
    if (nextInd === indicator) return;
    analytics.recordSimulationClick(SIM_ID, 1);
    setIndicator(nextInd);
    setIsDripping(false);
    setBuretteVolume(0.0);
    setHasStarted(false);
    setEndpointReached(false);
    setStoppedAssessment('none');
  };

  const handleSwirl = () => {
    setIsSwirling(true);
    analytics.recordSimulationClick(SIM_ID, 1);
    setTimeout(() => setIsSwirling(false), 600);
  };

  const handleReset = () => {
    setIsDripping(false);
    setBuretteVolume(0.0);
    setHasStarted(false);
    setEndpointReached(false);
    setStoppedAssessment('none');
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  const handleSaveToTable = () => {
    if (buretteVolume <= 0 || records.length >= 4) return;
    const labels = ['Kasar', '1', '2', '3'];
    setRecords((prev) => [
      ...prev,
      {
        label: labels[prev.length] ?? String(prev.length + 1),
        initial: 0.0,
        final: buretteVolume,
        volume: buretteVolume,
        indicator,
      },
    ]);
    setActiveInfoTab('jadual64');
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  // Indicator color logic strictly following Jadual 6.5 (KSSM T4 m.s. 172)
  const getSolutionVisual = () => {
    if (indicator === 'fenolftalein') {
      if (buretteVolume < 24.5) {
        return { fill: '#ec4899', opacity: 0.72, colorName: 'Merah jambu', medium: 'Beralkali (OH⁻)' };
      }
      if (buretteVolume < 25.0) {
        return { fill: '#f9a8d4', opacity: 0.55, colorName: 'Merah jambu pudar', medium: 'Hampir takat akhir' };
      }
      if (buretteVolume <= 25.05) {
        return { fill: '#e0f2fe', opacity: 0.45, colorName: 'Tidak berwarna', medium: 'Neutral — TAKAT AKHIR' };
      }
      return { fill: '#e0f2fe', opacity: 0.45, colorName: 'Tidak berwarna', medium: 'Berasid (lebihan H⁺)' };
    }

    // Metil jingga (Alkali: Kuning, Neutral: Jingga, Asid: Merah)
    if (buretteVolume < 24.5) {
      return { fill: '#facc15', opacity: 0.78, colorName: 'Kuning', medium: 'Beralkali (OH⁻)' };
    }
    if (buretteVolume < 25.0) {
      return { fill: '#fbbf24', opacity: 0.82, colorName: 'Kuning ke jingga', medium: 'Hampir takat akhir' };
    }
    if (buretteVolume <= 25.05) {
      return { fill: '#f97316', opacity: 0.85, colorName: 'Jingga', medium: 'Neutral — TAKAT AKHIR' };
    }
    return { fill: '#ef4444', opacity: 0.82, colorName: 'Merah', medium: 'Berasid — Terlebih HNO₃!' };
  };

  const solutionVisual = getSolutionVisual();

  // Burette geometry in compact SVG (0 cm³ at top y=44, 50 cm³ at bottom y=194)
  const meniscusY = 44 + (buretteVolume / 50.0) * 150;
  const acidHeight = Math.max(0, 194 - meniscusY);

  // Flask liquid level (conical body y=278..361, halfWidth 14..52)
  const fillFraction = 0.34 + (buretteVolume / 50.0) * 0.34;
  const flaskLiquidTopY = 361 - fillFraction * 72;
  const progressDownSlope = (flaskLiquidTopY - 278) / (361 - 278);
  const liquidTopHalfWidth = 14 + progressDownSlope * (52 - 14);
  const flaskCenterX = 278;

  const avgExactRecords = records.filter((r) => r.label !== 'Kasar');
  const averageVol =
    avgExactRecords.length > 0
      ? (avgExactRecords.reduce((s, r) => s + r.volume, 0) / avgExactRecords.length).toFixed(2)
      : null;

  return (
    <div className="space-y-3 text-slate-800">
      {/* Compact Top Experiment Strip */}
      <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 border border-purple-200 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="font-bold text-purple-800 uppercase tracking-wide">
            Aktiviti 6.13 • Rajah 6.32 (m.s. 170)
          </span>
          <span className="text-slate-600">
            Buret: <strong className="text-sky-800">HNO₃ 1.0 mol dm⁻³ (1.0 M)</strong>
          </span>
          <span className="text-slate-400">→</span>
          <span className="text-slate-600">
            Kelalang kon: <strong className="text-purple-900">25.0 cm³ KOH 1.0 mol dm⁻³ (1.0 M)</strong>
          </span>
        </div>
        <button
          onClick={handleReset}
          className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 flex items-center gap-1.5 text-xs font-bold shadow-xs transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Set Semula
        </button>
      </div>

      {/* Single-Screen Lab Cockpit (12 cols: Apparatus SVG Left, All Options/Readings/Controls Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* LEFT 6 COLS: Rajah 6.32 SVG Apparatus */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col justify-between">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-1.5 overflow-hidden flex-1 flex items-center justify-center">
            <svg viewBox="0 0 580 408" className="w-full max-h-[420px] h-auto select-none">
              <defs>
                <linearGradient id="glassShine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
                  <stop offset="30%" stopColor="#e0f2fe" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="standMetal" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#64748b" />
                  <stop offset="50%" stopColor="#94a3b8" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>
              </defs>

              {/* Lab Bench Surface */}
              <rect x="18" y="388" width="544" height="12" rx="4" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />

              {/* RETORT STAND (Kaki retort) */}
              <rect x="85" y="374" width="135" height="14" rx="3" fill="#475569" stroke="#334155" strokeWidth="1.5" />
              <rect x="112" y="30" width="11" height="346" rx="3" fill="url(#standMetal)" stroke="#334155" strokeWidth="1.2" />
              {/* Retort Bosshead & Burette Clamp */}
              <rect x="108" y="110" width="20" height="16" rx="2" fill="#334155" />
              <rect x="128" y="115" width="141" height="6" rx="2" fill="#64748b" stroke="#334155" strokeWidth="1" />
              <rect x="263" y="110" width="30" height="16" rx="4" fill="none" stroke="#334155" strokeWidth="3.5" />

              {/* WHITE TILE (Jubin putih) directly under Conical Flask */}
              <polygon points="206,377 350,377 364,362 220,362" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
              <rect x="206" y="377" width="144" height="11" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />

              {/* CONICAL FLASK (Kelalang kon 250 cm³) */}
              <g
                onClick={handleSwirl}
                className="cursor-pointer"
                transform={isSwirling ? 'translate(4, 0) rotate(2 278 361)' : ''}
              >
                <title>Klik untuk goncang/pusarkan kelalang kon</title>

                <path
                  d={`M ${flaskCenterX - liquidTopHalfWidth} ${flaskLiquidTopY}
                      L 226 361
                      Q 224 367 232 367
                      L 324 367
                      Q 332 367 330 361
                      L ${flaskCenterX + liquidTopHalfWidth} ${flaskLiquidTopY} Z`}
                  fill={solutionVisual.fill}
                  fillOpacity={solutionVisual.opacity}
                  className="transition-all duration-300"
                />
                <ellipse
                  cx={flaskCenterX}
                  cy={flaskLiquidTopY}
                  rx={liquidTopHalfWidth}
                  ry="3"
                  fill={solutionVisual.fill}
                  fillOpacity={Math.min(0.95, solutionVisual.opacity + 0.15)}
                  stroke="#64748b"
                  strokeOpacity="0.35"
                  strokeWidth="0.8"
                />

                <path
                  d="M 264 248 L 264 278 L 223 360 Q 220 368 232 368 L 324 368 Q 336 368 333 360 L 292 278 L 292 248"
                  fill="url(#glassShine)"
                  fillOpacity="0.22"
                  stroke="#334155"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                <ellipse cx="278" cy="248" rx="16" ry="3.2" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
              </g>

              {/* BURETTE (50.00 cm³) */}
              <g>
                <rect x="269" y="36" width="18" height="164" rx="2" fill="#ffffff" fillOpacity="0.7" stroke="#334155" strokeWidth="2" />
                <line x1="266" y1="36" x2="290" y2="36" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />

                {acidHeight > 0 && (
                  <g>
                    <rect x="270.5" y={meniscusY} width="15" height={acidHeight} fill="#7dd3fc" fillOpacity="0.55" />
                    <path d={`M 270.5 ${meniscusY} Q 278 ${meniscusY + 3.5} 285.5 ${meniscusY}`} fill="none" stroke="#0284c7" strokeWidth="1.8" />
                  </g>
                )}

                {[0, 10, 20, 30, 40, 50].map((val) => {
                  const yPos = 44 + (val / 50) * 150;
                  return (
                    <g key={val}>
                      <line x1="269" y1={yPos} x2="275" y2={yPos} stroke="#0f172a" strokeWidth="1.2" />
                      <text x="264" y={yPos + 3} textAnchor="end" fontSize="8.5" fontFamily="monospace" fill="#334155">
                        {val}
                      </text>
                      {val < 50 && (
                        <line x1="269" y1={yPos + 15} x2="273" y2={yPos + 15} stroke="#64748b" strokeWidth="0.9" />
                      )}
                    </g>
                  );
                })}

                <rect x="275" y="200" width="6" height="10" fill="#bae6fd" stroke="#334155" strokeWidth="1.5" />

                {/* Clickable Stopcock */}
                <g onClick={handleToggleDrip} className="cursor-pointer">
                  <title>Klik pili buret untuk buka / tutup aliran HNO₃</title>
                  <rect x="273" y="210" width="10" height="10" rx="1.5" fill="#475569" stroke="#1e293b" strokeWidth="1.2" />
                  <rect
                    x={isDripping ? 276 : 267}
                    y={isDripping ? 206 : 213}
                    width={isDripping ? 4 : 22}
                    height={isDripping ? 18 : 4}
                    rx="1.5"
                    fill="#f59e0b"
                    stroke="#b45309"
                    strokeWidth="1"
                  />
                </g>

                <path d="M 275.5 220 L 277 240 L 279 240 L 280.5 220 Z" fill="#e0f2fe" stroke="#334155" strokeWidth="1.3" />

                {isDripping && (
                  <path d="M 278 243 Q 281 249 278 252 Q 275 249 278 243 Z" fill="#0284c7">
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0,0; 0,72"
                      dur={dripSpeed === 'slow' ? '0.45s' : '0.24s'}
                      repeatCount="indefinite"
                    />
                  </path>
                )}
              </g>

              {/* TEXTBOOK LABELS */}
              <text x="36" y="92" fill="#0f172a" fontSize="11.5" fontWeight="bold">Kaki retort</text>
              <line x1="94" y1="88" x2="112" y2="88" stroke="#334155" strokeWidth="1.2" />

              <text x="28" y="132" fill="#0f172a" fontSize="11" fontWeight="bold">Pengapit</text>
              <text x="28" y="145" fill="#0f172a" fontSize="11" fontWeight="bold">buret</text>
              <line x1="80" y1="135" x2="118" y2="120" stroke="#334155" strokeWidth="1.2" />

              <text x="318" y="50" fill="#0f172a" fontSize="11.5" fontWeight="bold">Buret (50.00 cm³)</text>
              <line x1="288" y1="47" x2="314" y2="47" stroke="#334155" strokeWidth="1.2" />

              <text x="318" y="140" fill="#0369a1" fontSize="11.5" fontWeight="bold">Asid nitrik, HNO₃</text>
              <text x="318" y="154" fill="#0369a1" fontSize="11" fontWeight="bold">1.0 mol dm⁻³ (1.0 M)</text>
              <line x1="288" y1="144" x2="314" y2="144" stroke="#0369a1" strokeWidth="1.2" />

              <text x="342" y="296" fill="#0f172a" fontSize="11.5" fontWeight="bold">Kelalang kon (250 cm³)</text>
              <line x1="305" y1="293" x2="338" y2="293" stroke="#334155" strokeWidth="1.2" />

              <text x="198" y="304" textAnchor="end" fill="#0f172a" fontSize="11" fontWeight="bold">25.0 cm³ larutan</text>
              <text x="198" y="318" textAnchor="end" fill="#0f172a" fontSize="11" fontWeight="bold">KOH 1.0 mol dm⁻³</text>
              <text x="198" y="332" textAnchor="end" fill="#7e22ce" fontSize="10.5" fontWeight="bold">
                + {indicator === 'fenolftalein' ? 'fenolftalein' : 'metil jingga'}
              </text>
              <line x1="203" y1="324" x2="255" y2="342" stroke="#334155" strokeWidth="1.2" />

              <text x="376" y="372" fill="#0f172a" fontSize="11.5" fontWeight="bold">Jubin putih</text>
              <line x1="354" y1="369" x2="372" y2="369" stroke="#334155" strokeWidth="1.2" />

              {/* Zoomed Meniscus Card */}
              <g transform="translate(428, 16)">
                <rect width="138" height="98" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                <text x="69" y="15" textAnchor="middle" fill="#475569" fontSize="8.5" fontWeight="bold">
                  MENISKUS (MATA SEGARIS)
                </text>
                <rect x="44" y="22" width="46" height="52" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
                <rect x="45" y="48" width="44" height="25" fill="#7dd3fc" fillOpacity="0.55" />
                <path d="M 45 45 Q 67 53 89 45" fill="none" stroke="#0284c7" strokeWidth="2.2" />
                <line x1="28" y1="49" x2="110" y2="49" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="3 2" />
                <ellipse cx="19" cy="49" rx="6.5" ry="3.8" fill="none" stroke="#dc2626" strokeWidth="1.3" />
                <circle cx="19" cy="49" r="1.8" fill="#dc2626" />
                <text x="69" y="89" textAnchor="middle" fill="#0f172a" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  {buretteVolume.toFixed(2)} cm³
                </text>
              </g>
            </svg>
          </div>
          <p className="text-[11px] text-slate-500 text-center mt-1.5">
            Klik kelalang kon untuk menggoncang atau klik pili buret pada rajah.
          </p>
        </div>

        {/* RIGHT 6 COLS: Compact All-in-One Control & Reference Cockpit */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-2.5">
          {/* 1. Indicator + Flow Speed Bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase mb-1.5 flex items-center gap-1">
                <FlaskConical className="w-3.5 h-3.5 text-purple-600" />
                Pilih Penunjuk
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => handleSelectIndicator('fenolftalein')}
                  className={`py-1.5 px-2 rounded-lg border text-xs font-bold transition cursor-pointer ${
                    indicator === 'fenolftalein'
                      ? 'bg-pink-50 border-pink-500 text-pink-900 ring-1 ring-pink-300'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Fenolftalein
                </button>
                <button
                  onClick={() => handleSelectIndicator('metil-jingga')}
                  className={`py-1.5 px-2 rounded-lg border text-xs font-bold transition cursor-pointer ${
                    indicator === 'metil-jingga'
                      ? 'bg-orange-50 border-orange-500 text-orange-900 ring-1 ring-orange-300'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Metil Jingga
                </button>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase mb-1.5">
                Kelajuan Aliran Buret
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setDripSpeed('slow')}
                  className={`py-1.5 px-2 rounded-lg border text-xs font-bold transition cursor-pointer ${
                    dripSpeed === 'slow'
                      ? 'bg-purple-600 border-purple-600 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Perlahan (0.10)
                </button>
                <button
                  onClick={() => setDripSpeed('fast')}
                  className={`py-1.5 px-2 rounded-lg border text-xs font-bold transition cursor-pointer ${
                    dripSpeed === 'fast'
                      ? 'bg-purple-600 border-purple-600 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Laju (0.50)
                </button>
              </div>
            </div>
          </div>

          {/* 2. Digital Readouts & Live Status */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2">
            <div className="grid grid-cols-2 gap-2.5">
              <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-[10px] font-bold uppercase text-slate-500">Bacaan Buret Semasa</div>
                <div className="text-2xl font-mono font-extrabold text-slate-900 leading-tight">
                  {buretteVolume.toFixed(2)} <span className="text-xs font-normal text-slate-500">cm³</span>
                </div>
              </div>

              <div
                className={`px-3 py-2 border rounded-lg transition ${
                  endpointReached ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-dashed border-slate-300'
                }`}
              >
                <div className="text-[10px] font-bold uppercase text-slate-600 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Rekod Takat Akhir
                </div>
                <div
                  className={`text-2xl font-mono font-extrabold leading-tight ${
                    endpointReached ? 'text-emerald-700' : 'text-slate-400'
                  }`}
                >
                  {endpointReached ? '25.00' : '--.--'} <span className="text-xs font-normal text-slate-500">cm³</span>
                </div>
              </div>
            </div>

            {/* Compact Live Observation / Warning / Stop Feedback */}
            <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-2">
              <span>
                Warna: <strong className="text-slate-900">{solutionVisual.colorName}</strong>
              </span>
              <span
                className={`font-bold ${
                  buretteVolume >= 24.9 && buretteVolume <= 25.1
                    ? 'text-emerald-700'
                    : buretteVolume > 25.1
                    ? 'text-red-600'
                    : 'text-purple-700'
                }`}
              >
                {solutionVisual.medium}
              </span>
            </div>

            {endpointReached && isDripping && (
              <div className="px-2.5 py-1.5 bg-amber-50 border border-amber-300 rounded-lg text-[11px] font-semibold text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                Takat akhir (25.00 cm³) telah dicapai! Tekan &ldquo;Hentikan Pentitratan&rdquo; segera atau asid terus menitis.
              </div>
            )}

            {stoppedAssessment !== 'none' && !isDripping && (
              <div
                className={`px-3 py-2 rounded-lg border text-xs flex items-center gap-2 ${
                  stoppedAssessment === 'exact'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : stoppedAssessment === 'early'
                    ? 'bg-amber-50 border-amber-300 text-amber-950'
                    : 'bg-red-50 border-red-300 text-red-950'
                }`}
              >
                {stoppedAssessment === 'exact' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle
                    className={`w-4 h-4 shrink-0 ${stoppedAssessment === 'early' ? 'text-amber-600' : 'text-red-600'}`}
                  />
                )}
                <span>
                  {stoppedAssessment === 'exact' && (
                    <>
                      <strong>Tepat!</strong> Pentitratan berhenti pada <strong>{buretteVolume.toFixed(2)} cm³</strong> (takat akhir 25.00 cm³).
                    </>
                  )}
                  {stoppedAssessment === 'early' && (
                    <>
                      <strong>Terlalu awal ({buretteVolume.toFixed(2)} cm³).</strong> Perlu{' '}
                      <strong>{(ENDPOINT_VOLUME - buretteVolume).toFixed(2)} cm³</strong> HNO₃ lagi.
                    </>
                  )}
                  {stoppedAssessment === 'overshot' && (
                    <>
                      <strong>Terlebih titrat ({buretteVolume.toFixed(2)} cm³)!</strong> Melebihi 25.00 cm³ sebanyak{' '}
                      <strong>+{(buretteVolume - ENDPOINT_VOLUME).toFixed(2)} cm³</strong>.
                    </>
                  )}
                </span>
              </div>
            )}
          </div>

          {/* 3. Main Controls */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2">
            <button
              onClick={handleToggleDrip}
              disabled={!isDripping && buretteVolume >= 50.0}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition cursor-pointer disabled:opacity-40 ${
                isDripping
                  ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {isDripping ? (
                <>
                  <Square className="w-4 h-4" />
                  Hentikan Pentitratan (Tutup Pili Buret)
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Buka Pili Buret (Titrat Asid HNO₃)
                </>
              )}
            </button>

            <div className="grid grid-cols-4 gap-1.5">
              <button
                onClick={() => handleAddSingleDrop(0.05)}
                disabled={isDripping || buretteVolume >= 50.0}
                className="py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 border border-slate-200 text-slate-800 text-[11px] font-bold flex items-center justify-center gap-1 transition cursor-pointer"
              >
                <Droplets className="w-3 h-3 text-sky-600" />
                +0.05
              </button>
              <button
                onClick={() => handleAddSingleDrop(0.5)}
                disabled={isDripping || buretteVolume >= 50.0}
                className="py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 border border-slate-200 text-slate-800 text-[11px] font-bold flex items-center justify-center gap-1 transition cursor-pointer"
              >
                <Droplets className="w-3 h-3 text-indigo-600" />
                +0.50
              </button>
              <button
                onClick={handleSwirl}
                className="py-1.5 px-2 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 text-[11px] font-bold transition cursor-pointer"
              >
                Goncang
              </button>
              <button
                onClick={handleSaveToTable}
                disabled={isDripping || buretteVolume <= 0 || records.length >= 4}
                className="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-900 disabled:opacity-40 text-white text-[11px] font-bold transition cursor-pointer"
              >
                Rekod
              </button>
            </div>
          </div>

          {/* 4. Compact Tabbed Reference (All in the exact same cockpit — zero vertical scroll!) */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2">
            <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <button
                onClick={() => setActiveInfoTab('jadual65')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition cursor-pointer ${
                  activeInfoTab === 'jadual65' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Palette className="w-3 h-3" />
                Jadual 6.5
              </button>
              <button
                onClick={() => setActiveInfoTab('formula')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition cursor-pointer ${
                  activeInfoTab === 'formula' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Calculator className="w-3 h-3" />
                Formula MₐVₐ
              </button>
              <button
                onClick={() => setActiveInfoTab('jadual64')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition cursor-pointer ${
                  activeInfoTab === 'jadual64' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Table2 className="w-3 h-3" />
                Rekod ({records.length}/4)
              </button>
            </div>

            {activeInfoTab === 'jadual65' && (
              <div className="space-y-1.5">
                <table className="w-full text-[11px] text-center border-collapse border border-slate-200">
                  <thead>
                    <tr className="bg-teal-700 text-white">
                      <th className="p-1.5 text-left">Penunjuk</th>
                      <th className="p-1.5">Asid</th>
                      <th className="p-1.5">Neutral (25.00)</th>
                      <th className="p-1.5">Alkali</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b border-slate-100">
                      <td className="p-1.5 font-bold text-left">Fenolftalein</td>
                      <td className="p-1.5">Tidak berwarna</td>
                      <td className="p-1.5 font-semibold text-sky-700">Tidak berwarna</td>
                      <td className="p-1.5 font-semibold text-pink-600">Merah jambu</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-1.5 font-bold text-left">Metil jingga</td>
                      <td className="p-1.5 font-semibold text-red-600">Merah</td>
                      <td className="p-1.5 font-semibold text-orange-600">Jingga</td>
                      <td className="p-1.5 font-semibold text-yellow-600">Kuning</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-[10.5px] text-slate-500">
                  <strong>Jubin putih</strong> membolehkan perubahan warna penunjuk dilihat dengan jelas.
                </p>
              </div>
            )}

            {activeInfoTab === 'formula' && (
              <div className="space-y-1.5 text-[11px]">
                <div className="font-mono font-bold text-center py-1.5 bg-purple-50 border border-purple-200 rounded-lg text-purple-950">
                  HNO₃(ak) + KOH(ak) → KNO₃(ak) + H₂O(ce)
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <div>Mₐ (HNO₃) = <strong>1.0 mol dm⁻³</strong></div>
                    <div>Mᵦ (KOH) = <strong>1.0 mol dm⁻³</strong>, Vᵦ = <strong>25.0 cm³</strong></div>
                  </div>
                  <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200 font-mono text-emerald-950">
                    <div>(MₐVₐ)/(MᵦVᵦ) = 1/1</div>
                    <div>
                      <strong>Vₐ = 25.00 cm³</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeInfoTab === 'jadual64' && (
              <div className="space-y-1.5">
                {records.length === 0 ? (
                  <p className="text-[11px] text-slate-500 py-2">
                    Tutup pili buret selepas menitrat dan klik <strong>Rekod</strong> untuk mencatat bacaan (Kasar, 1, 2, 3).
                  </p>
                ) : (
                  <div className="space-y-1">
                    <table className="w-full text-[11px] text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                          <th className="p-1">Ujian</th>
                          <th className="p-1">Penunjuk</th>
                          <th className="p-1">Awal → Akhir</th>
                          <th className="p-1">V (cm³)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records.map((r, i) => (
                          <tr key={i} className="border-b border-slate-100">
                            <td className="p-1 font-bold">{r.label}</td>
                            <td className="p-1">{r.indicator === 'fenolftalein' ? 'Fenolftalein' : 'Metil jingga'}</td>
                            <td className="p-1 font-mono">0.00 → {r.final.toFixed(2)}</td>
                            <td
                              className={`p-1 font-mono font-bold ${
                                r.volume >= 24.9 && r.volume <= 25.1 ? 'text-emerald-700' : 'text-red-600'
                              }`}
                            >
                              {r.volume.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {averageVol && (
                      <div className="text-[11px] font-bold text-emerald-800 text-right">
                        Purata (1–3): {averageVol} cm³
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
