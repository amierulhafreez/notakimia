import React, { useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  Gauge,
  Layers,
  Play,
  RotateCcw,
  Sparkles,
  Table2,
  Timer,
} from 'lucide-react';
import { analytics } from '../services/analytics';
import { AlloyImpactApparatusSVG } from '../components/AlloyImpactApparatusSVG';
import { AlloyAtomicLatticeSVG } from '../components/AlloyAtomicLatticeSVG';

interface DropRecord {
  id: number;
  label: string;
  foreignPct: number;
  heightCm: number;
  dentDiameterCm: number;
}

const computeDentDiameterCm = (heightCm: number, foreignPct: number): number => {
  const baseAt50 =
    foreignPct === 0
      ? 0.58
      : foreignPct === 5
      ? 0.44
      : foreignPct === 10
      ? 0.36
      : foreignPct === 15
      ? 0.3
      : 0.26;
  const scaled = baseAt50 * Math.pow(heightCm / 50, 0.4);
  return Math.round(scaled * 100) / 100;
};

export const AlloyHardnessLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lab' | 'analysis'>('lab');
  const [heightCm, setHeightCm] = useState<number>(50);
  const [foreignPct, setForeignPct] = useState<number>(0);

  const [impactProgress, setImpactProgress] = useState<number>(0);
  const [hasImpacted, setHasImpacted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSlowMo, setIsSlowMo] = useState<boolean>(false);
  const [records, setRecords] = useState<DropRecord[]>([]);
  const [openAnswers, setOpenAnswers] = useState<Record<number, boolean>>({ 0: true });

  const rafRef = useRef<number | null>(null);
  const completedRef = useRef<boolean>(false);
  const nextIdRef = useRef<number>(1);

  const currentDiameterCm = computeDentDiameterCm(heightCm, foreignPct);

  const hasPureTrial = records.some((r) => r.foreignPct === 0);
  const hasAlloyTrial = records.some((r) => r.foreignPct > 0);

  useEffect(() => {
    analytics.recordSimulationView('kekerasan-aloi-logam-tulen');
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (hasPureTrial && hasAlloyTrial && !completedRef.current) {
      completedRef.current = true;
      analytics.recordSimulationCompleted('kekerasan-aloi-logam-tulen');
    }
  }, [hasPureTrial, hasAlloyTrial]);

  const stopAnimation = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const runImpactAnimation = (slowMotion: boolean, recordTrial: boolean) => {
    stopAnimation();
    setIsSlowMo(slowMotion);
    setIsPlaying(true);
    setHasImpacted(false);
    setImpactProgress(0);

    const durationMs = slowMotion ? 3400 : 880;
    const startTime = performance.now();
    const snapshotHeight = heightCm;
    const snapshotPct = foreignPct;
    const snapshotDiam = computeDentDiameterCm(snapshotHeight, snapshotPct);

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / durationMs);
      setImpactProgress(t);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setIsPlaying(false);
        setHasImpacted(true);
        if (recordTrial) {
          const entry: DropRecord = {
            id: nextIdRef.current++,
            label:
              snapshotPct === 0
                ? 'Kuprum Tulen (0%)'
                : `Gangsa (${snapshotPct}% Sn)`,
            foreignPct: snapshotPct,
            heightCm: snapshotHeight,
            dentDiameterCm: snapshotDiam,
          };
          setRecords((prev) => [entry, ...prev].slice(0, 8));
        }
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const handleHeightChange = (nextH: number) => {
    if (isPlaying) return;
    setHeightCm(nextH);
    setHasImpacted(false);
    setImpactProgress(0);
  };

  const handleCompositionChange = (nextPct: number) => {
    if (isPlaying) return;
    setForeignPct(nextPct);
    setHasImpacted(false);
    setImpactProgress(0);
  };

  const handleReset = () => {
    stopAnimation();
    completedRef.current = false;
    setIsPlaying(false);
    setIsSlowMo(false);
    setImpactProgress(0);
    setHasImpacted(false);
    setHeightCm(50);
    setForeignPct(0);
    setRecords([]);
  };

  const pureTrials = records.filter((r) => r.foreignPct === 0);
  const alloyTrials = records.filter((r) => r.foreignPct > 0);
  const avgPure =
    pureTrials.length > 0
      ? (
          pureTrials.reduce((acc, r) => acc + r.dentDiameterCm, 0) / pureTrials.length
        ).toFixed(2)
      : null;
  const avgAlloy =
    alloyTrials.length > 0
      ? (
          alloyTrials.reduce((acc, r) => acc + r.dentDiameterCm, 0) / alloyTrials.length
        ).toFixed(2)
      : null;

  const discussionQuestions = [
    {
      q: '1. Blok manakah yang menghasilkan diameter lekuk yang lebih besar pada permukaan blok?',
      a: 'Blok kuprum tulen (0% atom asing) menghasilkan diameter lekuk yang lebih besar dan dalam berbanding blok gangsa pada ketinggian jatuhan yang sama.',
    },
    {
      q: '2. Nyatakan hubungan antara saiz diameter lekuk dengan sifat kekerasan bahan.',
      a: 'Semakin kecil diameter lekuk yang terhasil, semakin keras bahan tersebut. Oleh itu, gangsa (aloi) lebih keras daripada kuprum tulen.',
    },
    {
      q: '3. Mengapakah logam tulen (kuprum) lebih lembut dan mudah membentuk lekukan dalam?',
      a: 'Logam tulen terdiri daripada satu jenis atom bersaiz sama yang tersusun secara teratur dan berlapis-lapis. Apabila dikenakan daya hentaman, lapisan atom mudah menggelongsor di atas satu sama lain.',
    },
    {
      q: '4. Terangkan peranan atom asing (timah, Sn) dalam menjadikan gangsa lebih keras.',
      a: 'Atom timah bersaiz lebih besar mengganggu susunan teratur atom kuprum. Apabila daya dikenakan, atom asing bertindak sebagai penghalang (pinning sites) yang menyekat lapisan atom daripada menggelongsor.',
    },
  ];

  return (
    <div className="space-y-2.5 text-slate-800">
      {/* TOP BAR */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white border border-slate-200 rounded-xl p-2 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('lab')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'lab'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            1. Makmal Dwi-Paparan (Makro &amp; Atom)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('analysis')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'analysis'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            2. Graf Perbandingan &amp; Perbincangan KSSM
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold border whitespace-nowrap shrink-0 ${
              hasPureTrial && hasAlloyTrial
                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}
          >
            {hasPureTrial && hasAlloyTrial
              ? 'Perbandingan Lengkap ✓'
              : `Rekod: ${records.length} Ujian`}
          </span>
          <button
            type="button"
            onClick={handleReset}
            disabled={isPlaying}
            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* TAB 1: SPLIT-SCREEN SYNC (MACROSCOPIC + SUBMICROSCOPIC + SANDBOX SLIDERS) */}
      {activeTab === 'lab' && (
        <>
          {/* SANDBOX VARIABLE CONTROLS BAR */}
          <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Height slider */}
            <div className="md:col-span-4 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-extrabold text-slate-700 flex items-center gap-1">
                  <Gauge className="w-3.5 h-3.5 text-sky-600" />
                  Ketinggian Pemberat (1 kg):
                </span>
                <span className="font-mono font-extrabold text-sky-700">{heightCm} cm</span>
              </div>
              <input
                type="range"
                aria-label="Ketinggian pemberat dalam cm"
                min={20}
                max={100}
                step={10}
                value={heightCm}
                disabled={isPlaying}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer h-1.5"
              />
            </div>

            {/* Foreign atom composition slider + quick pills */}
            <div className="md:col-span-4 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-extrabold text-slate-700 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Komposisi Atom Asing (Sn):
                </span>
                <span className="font-mono font-extrabold text-amber-700">
                  {foreignPct}% {foreignPct === 0 ? '(Kuprum)' : '(Gangsa)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  aria-label="Peratus atom asing"
                  min={0}
                  max={20}
                  step={5}
                  value={foreignPct}
                  disabled={isPlaying}
                  onChange={(e) => handleCompositionChange(Number(e.target.value))}
                  className="flex-1 accent-amber-600 cursor-pointer h-1.5"
                />
                <div className="flex items-center gap-1 shrink-0">
                  {[
                    { pct: 0, label: '0%' },
                    { pct: 10, label: '10%' },
                    { pct: 20, label: '20%' },
                  ].map((p) => (
                    <button
                      key={p.pct}
                      type="button"
                      disabled={isPlaying}
                      onClick={() => handleCompositionChange(p.pct)}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold border cursor-pointer transition ${
                        foreignPct === p.pct
                          ? 'bg-amber-600 text-white border-amber-700'
                          : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Drop & Slow-Mo Replay CTAs */}
            <div className="md:col-span-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => runImpactAnimation(false, true)}
                disabled={isPlaying}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  isPlaying && !isSlowMo
                    ? 'bg-amber-100 text-amber-800 border border-amber-300 cursor-wait'
                    : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                Lepaskan Pemberat
              </button>

              <button
                type="button"
                onClick={() => runImpactAnimation(true, !hasImpacted)}
                disabled={isPlaying}
                title="Ulang tayang perlanggaran dengan vektor daya pada kelajuan 0.25×"
                className={`py-2 px-2.5 rounded-lg text-xs font-extrabold border flex items-center gap-1 whitespace-nowrap shrink-0 transition cursor-pointer ${
                  isPlaying && isSlowMo
                    ? 'bg-rose-100 text-rose-800 border-rose-300 cursor-wait'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-300'
                }`}
              >
                <Timer className="w-3.5 h-3.5 text-rose-600" />
                {isPlaying && isSlowMo ? '0.25×...' : 'Ulang 0.25×'}
              </button>
            </div>
          </div>

          {/* SPLIT-SCREEN SYNC: ZON KIRI MAKROSKOPIK | ZON KANAN SUBMIKROSKOPIK */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
            {/* ZON KIRI: Macroscopic Apparatus */}
            <div className="md:col-span-6 bg-white border border-slate-200 rounded-xl p-2.5 shadow-xs flex flex-col">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-extrabold text-slate-800">
                  Zon Kiri · Radas Makroskopik (Rajah 8.3)
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {foreignPct === 0 ? 'Blok Kuprum Tulen' : `Blok Gangsa (${foreignPct}% Sn)`}
                </span>
              </div>
              <div className="bg-slate-50/80 border border-dashed border-slate-300 rounded-lg p-1 flex-1 flex items-center">
                <AlloyImpactApparatusSVG
                  foreignPct={foreignPct}
                  heightCm={heightCm}
                  impactProgress={impactProgress}
                  dentDiameterCm={currentDiameterCm}
                  hasImpacted={hasImpacted}
                />
              </div>
            </div>

            {/* ZON KANAN: Submicroscopic Atomic Lattice */}
            <div className="md:col-span-6 bg-white border border-slate-200 rounded-xl p-2.5 shadow-xs flex flex-col">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-extrabold text-slate-800">
                  Zon Kanan · Kanta Pembesar Susunan Atom
                </span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    isPlaying && isSlowMo
                      ? 'bg-rose-100 text-rose-800'
                      : foreignPct === 0
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {isPlaying && isSlowMo
                    ? 'Gerak Perlahan 0.25×'
                    : foreignPct === 0
                    ? 'Lapisan Atom Teratur'
                    : 'Susunan Terganggu (Atom Asing)'}
                </span>
              </div>
              <div className="bg-slate-50/80 border border-dashed border-slate-300 rounded-lg p-1 flex-1 flex items-center">
                <AlloyAtomicLatticeSVG
                  foreignPct={foreignPct}
                  heightCm={heightCm}
                  impactProgress={impactProgress}
                  hasImpacted={hasImpacted}
                  showForceVectors={isSlowMo || hasImpacted || isPlaying}
                />
              </div>
            </div>
          </div>

          {/* BOTTOM: AUTO DATA TABLE + INFERENCE PANEL */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
            {/* Auto Data Table */}
            <div className="md:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <div className="bg-slate-800 text-white px-3 py-1.5 flex items-center justify-between gap-2 text-xs font-extrabold">
                <span className="flex items-center gap-1.5">
                  <Table2 className="w-3.5 h-3.5" />
                  Jadual 8.2: Rekod Diameter Lekukan Automatik
                </span>
                <div className="flex items-center gap-2 text-[10.5px] font-mono">
                  <span className="text-orange-300">
                    Purata Kuprum: {avgPure ? `${avgPure} cm` : '—'}
                  </span>
                  <span className="text-amber-300">
                    Purata Gangsa: {avgAlloy ? `${avgAlloy} cm` : '—'}
                  </span>
                </div>
              </div>

              <div className="p-2">
                {records.length === 0 ? (
                  <div className="py-3 text-center text-[11px] text-slate-400">
                    Klik <strong>Lepaskan Pemberat</strong> pada Kuprum Tulen (0%) dan Gangsa (10% / 20%) untuk merekod &amp; membandingkan diameter lekukan.
                  </div>
                ) : (
                  <div className="overflow-x-auto max-h-[112px] overflow-y-auto">
                    <table className="w-full text-[11px] border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                          <th className="text-left px-2 py-1 font-extrabold">#</th>
                          <th className="text-left px-2 py-1 font-extrabold">Jenis Blok</th>
                          <th className="text-center px-2 py-1 font-extrabold">Ketinggian</th>
                          <th className="text-center px-2 py-1 font-extrabold">Diameter Lekuk</th>
                          <th className="text-center px-2 py-1 font-extrabold">Kekerasan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records.slice(0, 4).map((r, i) => (
                          <tr key={r.id} className="border-b border-slate-100 last:border-b-0">
                            <td className="px-2 py-1 text-slate-400 font-mono">#{records.length - i}</td>
                            <td className="px-2 py-1 font-bold text-slate-800">{r.label}</td>
                            <td className="px-2 py-1 text-center font-mono">{r.heightCm} cm</td>
                            <td className="px-2 py-1 text-center font-mono font-extrabold text-amber-700">
                              {r.dentDiameterCm.toFixed(2)} cm
                            </td>
                            <td className="px-2 py-1 text-center">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[9.5px] font-extrabold ${
                                  r.foreignPct === 0
                                    ? 'bg-orange-100 text-orange-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {r.foreignPct === 0 ? 'Kurang Keras' : 'Lebih Keras'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Scientific Inference Panel */}
            <div className="md:col-span-5 bg-white border border-slate-200 rounded-xl p-2.5 shadow-xs flex flex-col justify-center space-y-1">
              <div className="text-xs font-extrabold text-slate-800">
                Inferens &amp; Mekanisme Atom
              </div>
              <p className="text-[11px] text-slate-700 leading-snug">
                {foreignPct === 0 ? (
                  <>
                    <strong>Kuprum Tulen (0% Sn):</strong> Atom bersaiz seragam dan tersusun teratur dalam lapisan. Daya hentaman menyebabkan lapisan atom{' '}
                    <strong className="text-orange-700">mudah menggelongsor</strong> di atas satu sama lain → menghasilkan lekukan lebih lebar &amp; dalam (<strong>{currentDiameterCm.toFixed(2)} cm</strong> pada {heightCm} cm).
                  </>
                ) : (
                  <>
                    <strong>Gangsa ({foreignPct}% Atom Asing Sn):</strong> Atom timah yang lebih besar mengganggu susunan teratur kekisi kuprum dan bertindak sebagai{' '}
                    <strong className="text-emerald-700">penghalang gelongsoran (pinning sites)</strong> → lekukan jauh lebih kecil (<strong>{currentDiameterCm.toFixed(2)} cm</strong> pada {heightCm} cm).
                  </>
                )}
              </p>
            </div>
          </div>
        </>
      )}

      {/* TAB 2: COMPARISON GRAPH & KSSM DISCUSSION */}
      {activeTab === 'analysis' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
          {/* Left: SVG Comparison Graph */}
          <div className="md:col-span-5 bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2.5">
            <h3 className="text-xs font-extrabold text-slate-800">
              Graf Diameter Lekukan vs Ketinggian Jatuhan
            </h3>

            <svg viewBox="0 0 320 185" className="w-full h-auto select-none bg-slate-50/70 rounded-lg border border-slate-200">
              {/* Horizontal grid lines: 0.80, 0.60, 0.40, 0.20 */}
              {[
                { val: '0.80', y: 30 },
                { val: '0.60', y: 62 },
                { val: '0.40', y: 94 },
                { val: '0.20', y: 126 },
              ].map((g) => (
                <g key={g.val}>
                  <line x1="50" y1={g.y} x2="296" y2={g.y} stroke="#e2e8f0" strokeWidth="1" />
                  <text x="44" y={g.y + 3.5} textAnchor="end" fontSize="9" fontWeight="700" fill="#64748b">
                    {g.val}
                  </text>
                </g>
              ))}

              {/* Axes */}
              <line x1="50" y1="20" x2="50" y2="148" stroke="#1e293b" strokeWidth="1.5" />
              <line x1="50" y1="148" x2="300" y2="148" stroke="#1e293b" strokeWidth="1.5" />
              <text x="14" y="84" fontSize="8.5" fontWeight="800" fill="#1e293b" transform="rotate(-90, 14, 84)" textAnchor="middle">
                Diameter (cm)
              </text>

              {/* X labels: 20, 50, 80, 100 cm */}
              {[
                { h: 20, x: 75 },
                { h: 50, x: 142 },
                { h: 80, x: 209 },
                { h: 100, x: 276 },
              ].map((t) => (
                <text key={t.h} x={t.x} y="162" textAnchor="middle" fontSize="9" fontWeight="700" fill="#334155">
                  {t.h} cm
                </text>
              ))}

              {/* Curve 0% Cu: 0.40(94), 0.58(65), 0.70(46), 0.77(35) */}
              <polyline fill="none" stroke="#ea580c" strokeWidth="2.4" points="75,94 142,65 209,46 276,35" />
              {/* Curve 10% Gangsa: 0.25(118), 0.36(100), 0.43(89), 0.48(81) */}
              <polyline fill="none" stroke="#0284c7" strokeWidth="2.4" points="75,118 142,100 209,89 276,81" />
              {/* Curve 20% Gangsa+: 0.18(129), 0.26(116), 0.31(108), 0.34(104) */}
              <polyline fill="none" stroke="#059669" strokeWidth="2" strokeDasharray="4 3" points="75,129 142,116 209,108 276,104" />

              {/* Curve end labels */}
              <text x="278" y="31" fontSize="8" fontWeight="800" fill="#ea580c" textAnchor="end">0% Kuprum</text>
              <text x="278" y="77" fontSize="8" fontWeight="800" fill="#0284c7" textAnchor="end">10% Gangsa</text>
              <text x="278" y="101" fontSize="8" fontWeight="800" fill="#059669" textAnchor="end">20% Gangsa+</text>
            </svg>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-[11px] text-amber-950 leading-snug">
              <strong>Prinsip Kekerasan:</strong> Pada sebarang ketinggian jatuhan yang sama, diameter lekukan <strong>Gangsa (aloi)</strong> sentiasa lebih kecil daripada <strong>Kuprum Tulen</strong> kerana atom timah menyekat gelongsoran satah atom.
            </div>
          </div>

          {/* Right: KSSM Discussion Q&A */}
          <div className="md:col-span-7 bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-extrabold text-slate-800">
                Perbincangan Buku Teks (Eksperimen 8.1 · m.s. 256)
              </h3>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                Klik soalan untuk semak jawapan
              </span>
            </div>

            <div className="space-y-2">
              {discussionQuestions.map((item, idx) => {
                const isOpen = !!openAnswers[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      setOpenAnswers((prev) => ({ ...prev, [idx]: !prev[idx] }))
                    }
                    className="w-full text-left rounded-lg border border-slate-200 hover:border-indigo-300 bg-slate-50/70 p-2.5 transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2 text-[11.5px] font-extrabold text-slate-800">
                      <span>{item.q}</span>
                      <span className="text-[10px] text-indigo-600 shrink-0">
                        {isOpen ? 'Tutup' : 'Jawapan'}
                      </span>
                    </div>
                    {isOpen && (
                      <p className="mt-1.5 pt-1.5 border-t border-slate-200 text-[11px] text-slate-700 leading-relaxed">
                        {item.a}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlloyHardnessLab;
