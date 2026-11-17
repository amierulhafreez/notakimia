import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Timer,
  AlertTriangle,
  Sparkles,
  Layers,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { analytics } from '../services/analytics';
import {
  CHECKPOINT_TIMES,
  EXPERIMENT_71_CONSTANTS,
  MARBLE_SETS,
  MarbleSizeId,
  SURFACE_AREA_STAGES,
  evaluateBuretteReading,
  evaluateGasVolume,
  evaluateInstantRate,
} from '../data/rateOfReactionSize';
import { RateSizeApparatusSVG } from '../components/RateSizeApparatusSVG';
import { RateSizeLiveGraph } from '../components/RateSizeLiveGraph';

const SIM_ID = 'kadar-tindak-balas-saiz';

type AnalysisTabId = 'surface' | 'collision' | 'analysis';
type TableDisplayMode = 'gas' | 'burette';

export const RateOfReactionSizeLab: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<MarbleSizeId>('large');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timeSec, setTimeSec] = useState<number>(0);
  const [animFrame, setAnimFrame] = useState<number>(0);

  // Kemajuan lengkung & titik 30 saat bagi kedua-dua set pada graf yang sama
  const [progressBySize, setProgressBySize] = useState<Record<MarbleSizeId, number>>({
    large: -1,
    small: -1,
  });
  const [checkpointsBySize, setCheckpointsBySize] = useState<Record<MarbleSizeId, number[]>>({
    large: [],
    small: [],
  });

  const [tableMode, setTableMode] = useState<TableDisplayMode>('gas');
  const [activeTab, setActiveTab] = useState<AnalysisTabId>('surface');

  const activeSet = MARBLE_SETS[selectedSize];
  const currentGas = evaluateGasVolume(timeSec, selectedSize);
  const currentBuretteReading = evaluateBuretteReading(timeSec, selectedSize);
  const instantRate = evaluateInstantRate(timeSec, selectedSize);
  const isReactionFinished = timeSec >= activeSet.completionTimeSec;

  useEffect(() => {
    if (!isRunning || timeSec >= EXPERIMENT_71_CONSTANTS.maxDurationSec) return;

    const timer = window.setTimeout(() => {
      const next = Math.min(EXPERIMENT_71_CONSTANTS.maxDurationSec, timeSec + 2);
      setTimeSec(next);
      setAnimFrame((f) => f + 1);
      setProgressBySize((prev) => ({
        ...prev,
        [selectedSize]: Math.max(prev[selectedSize], next),
      }));

      if (next % EXPERIMENT_71_CONSTANTS.intervalSec === 0) {
        setCheckpointsBySize((prev) => {
          const existing = prev[selectedSize];
          if (existing.includes(next)) return prev;
          return { ...prev, [selectedSize]: [...existing, next] };
        });
      }

      if (next >= EXPERIMENT_71_CONSTANTS.maxDurationSec) {
        setIsRunning(false);
        analytics.recordSimulationCompleted(SIM_ID);
        confetti({ particleCount: 55, spread: 48 });
      }
    }, 70);

    return () => window.clearTimeout(timer);
  }, [isRunning, timeSec, selectedSize]);

  const handleToggleRun = () => {
    if (timeSec >= EXPERIMENT_71_CONSTANTS.maxDurationSec) return;
    if (timeSec === 0) {
      setProgressBySize((prev) => ({
        ...prev,
        [selectedSize]: Math.max(prev[selectedSize], 0),
      }));
      setCheckpointsBySize((prev) => {
        if (prev[selectedSize].includes(0)) return prev;
        return { ...prev, [selectedSize]: [0] };
      });
    }
    analytics.recordSimulationClick(SIM_ID, 1);
    setIsRunning((r) => !r);
  };

  const handleSelectSize = (size: MarbleSizeId) => {
    setIsRunning(false);
    setSelectedSize(size);
    setTimeSec(0);
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  const handleResetAll = () => {
    setIsRunning(false);
    setTimeSec(0);
    setAnimFrame(0);
    setProgressBySize({ large: -1, small: -1 });
    setCheckpointsBySize({ large: [], small: [] });
  };

  return (
    <div className="space-y-3 text-slate-800">
      {/* Bar Kawalan Atas: Pilihan Set I / Set II, Pemboleh Ubah Dimalarkan & Awas */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
        <div className="flex flex-wrap items-center gap-2">
          {(['large', 'small'] as MarbleSizeId[]).map((sizeId) => {
            const spec = MARBLE_SETS[sizeId];
            const active = selectedSize === sizeId;
            const recorded = progressBySize[sizeId] >= spec.completionTimeSec;
            return (
              <button
                key={sizeId}
                type="button"
                onClick={() => handleSelectSize(sizeId)}
                data-testid={`select-set-${sizeId}`}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  active
                    ? sizeId === 'large'
                      ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                      : 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{spec.shortLabel} (5.0 g)</span>
                {recorded && (
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-emerald-600'}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
            Dimalarkan: <strong>80.0 cm³ HCl 0.1 M</strong> • <strong>5.0 g CaCO₃</strong>
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-800 bg-rose-100 px-2.5 py-1 rounded-lg border border-rose-200">
            <AlertTriangle className="w-3.5 h-3.5" />
            Asid Mengakis
          </span>
        </div>
      </div>

      {/* Susun Atur Utama 2 Lajur (Muat Kemas Tanpa Skrol Panjang) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        {/* LAJUR KIRI: Rajah Radas Buku Teks (Rajah 7.12) + Kawalan + Jadual 30s */}
        <div className="lg:col-span-7 flex flex-col gap-2.5">
          <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                Rajah 7.12: Eksperimen 7.1 (Pengumpulan Gas CO₂)
              </span>
              <div className="flex items-center gap-2">
                {isReactionFinished && progressBySize[selectedSize] >= 0 && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg whitespace-nowrap">
                    Tamat: t = {activeSet.completionTimeSec} s
                  </span>
                )}
                <div className="inline-flex items-center gap-1.5 bg-slate-900 text-emerald-400 px-2.5 py-1 rounded-lg font-mono text-xs font-bold">
                  <Timer className="w-3.5 h-3.5 text-amber-400" />
                  <span>{timeSec} s</span>
                </div>
              </div>
            </div>

            <RateSizeApparatusSVG
              selectedSize={selectedSize}
              timeSec={timeSec}
              currentGas={currentGas}
              currentBuretteReading={currentBuretteReading}
              instantRate={instantRate}
              isRunning={isRunning}
              isReactionFinished={isReactionFinished}
              animFrame={animFrame}
            />

            {/* Bar Bacaan & Kawalan Simulasi */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 text-center">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Bacaan Buret</span>
                <strong className="font-mono text-xs text-sky-700" data-testid="readout-burette">
                  {currentBuretteReading.toFixed(2)} cm³
                </strong>
              </div>

              <div className="bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 text-center">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Isi Padu Gas CO₂</span>
                <strong
                  className={`font-mono text-xs ${
                    selectedSize === 'large' ? 'text-sky-700' : 'text-rose-700'
                  }`}
                  data-testid="readout-gas"
                >
                  {currentGas.toFixed(2)} cm³
                </strong>
              </div>

              <button
                type="button"
                onClick={handleToggleRun}
                disabled={timeSec >= EXPERIMENT_71_CONSTANTS.maxDurationSec}
                data-testid="btn-start-pause"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white inline-flex items-center justify-center gap-1.5 transition ${
                  isRunning
                    ? 'bg-amber-600 hover:bg-amber-500'
                    : 'bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50'
                }`}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isRunning
                  ? 'Jeda'
                  : timeSec >= EXPERIMENT_71_CONSTANTS.maxDurationSec
                    ? 'Selesai (240 s)'
                    : timeSec > 0
                      ? 'Sambung'
                      : 'Mula'}
              </button>

              <button
                type="button"
                onClick={handleResetAll}
                data-testid="btn-reset"
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold inline-flex items-center justify-center gap-1.5 border border-slate-200 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>
          </div>

          {/* Jadual Keputusan Selang 30 Saat (Padat) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-slate-700">
                Jadual Keputusan (Selang 30 saat)
              </span>
              <div className="inline-flex rounded-md bg-slate-200/80 p-0.5 text-[10px]">
                <button
                  type="button"
                  onClick={() => setTableMode('gas')}
                  className={`px-2 py-0.5 rounded font-semibold transition ${
                    tableMode === 'gas' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Isi Padu Gas (cm³)
                </button>
                <button
                  type="button"
                  onClick={() => setTableMode('burette')}
                  className={`px-2 py-0.5 rounded font-semibold transition ${
                    tableMode === 'burette' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Bacaan Buret (cm³)
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-[10px] text-center border-collapse bg-white rounded-lg overflow-hidden border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                    <th className="py-1 px-1.5 text-left">Masa (s)</th>
                    {CHECKPOINT_TIMES.map((t) => (
                      <th key={t} className="py-1 px-1 font-mono">
                        {t}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(['large', 'small'] as MarbleSizeId[]).map((sizeId) => {
                    const spec = MARBLE_SETS[sizeId];
                    const recordedPts = checkpointsBySize[sizeId];
                    return (
                      <tr
                        key={sizeId}
                        className={`border-b last:border-b-0 border-slate-100 ${
                          selectedSize === sizeId ? 'bg-indigo-50/40' : ''
                        }`}
                      >
                        <td
                          className={`py-1 px-1.5 text-left font-bold whitespace-nowrap ${
                            sizeId === 'large' ? 'text-sky-700' : 'text-rose-700'
                          }`}
                        >
                          Set {spec.code}
                        </td>
                        {CHECKPOINT_TIMES.map((t) => {
                          const has = recordedPts.includes(t);
                          const val =
                            tableMode === 'gas'
                              ? evaluateGasVolume(t, sizeId).toFixed(1)
                              : evaluateBuretteReading(t, sizeId).toFixed(2);
                          return (
                            <td
                              key={`${sizeId}-${t}`}
                              className={`py-1 px-1 font-mono ${
                                has ? 'font-semibold text-slate-800' : 'text-slate-300'
                              }`}
                            >
                              {has ? val : '—'}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* LAJUR KANAN: Graf Masa Nyata + Persamaan Kimia + Kad Konsep (3 Tab) */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          <RateSizeLiveGraph
            selectedSize={selectedSize}
            timeSec={timeSec}
            isRunning={isRunning}
            progressBySize={progressBySize}
            checkpointsBySize={checkpointsBySize}
          />

          <div className="font-mono text-[11px] bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-center font-bold text-slate-800">
            CaCO₃(p) + 2HCl(ak) → CaCl₂(ak) + H₂O(ce) + CO₂(g)
          </div>

          {/* Kad Konsep KSSM Bertab (Luas Permukaan / Teori Perlanggaran / Tafsiran Graf) */}
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 space-y-2">
            <div className="flex items-center gap-1 border-b border-slate-100 pb-2">
              <button
                type="button"
                onClick={() => setActiveTab('surface')}
                className={`flex-1 inline-flex items-center justify-center gap-1 py-1 px-2 rounded-lg text-[10px] font-bold transition ${
                  activeTab === 'surface'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Layers className="w-3 h-3" />
                Rajah 7.11: Luas
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('collision')}
                className={`flex-1 inline-flex items-center justify-center gap-1 py-1 px-2 rounded-lg text-[10px] font-bold transition ${
                  activeTab === 'collision'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                Teori Perlanggaran
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('analysis')}
                className={`flex-1 inline-flex items-center justify-center gap-1 py-1 px-2 rounded-lg text-[10px] font-bold transition ${
                  activeTab === 'analysis'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <BarChart3 className="w-3 h-3" />
                Tafsiran Graf
              </button>
            </div>

            {activeTab === 'surface' && (
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-1.5">
                  {SURFACE_AREA_STAGES.map((stage, idx) => (
                    <div
                      key={stage.id}
                      className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-2 text-center space-y-1"
                    >
                      <svg viewBox="0 0 64 38" className="w-full h-9 mx-auto">
                        {idx === 0 && (
                          <rect x="19" y="5" width="26" height="26" rx="2" fill="#fde68a" stroke="#b45309" strokeWidth="1.4" />
                        )}
                        {idx === 1 && (
                          <g>
                            <rect x="13" y="5" width="14" height="26" rx="2" fill="#fde68a" stroke="#b45309" strokeWidth="1.4" />
                            <rect x="35" y="5" width="14" height="26" rx="2" fill="#fde68a" stroke="#b45309" strokeWidth="1.4" />
                          </g>
                        )}
                        {idx === 2 && (
                          <g>
                            <rect x="13" y="5" width="15" height="12" rx="1.5" fill="#fde68a" stroke="#b45309" strokeWidth="1.2" />
                            <rect x="34" y="5" width="15" height="12" rx="1.5" fill="#fde68a" stroke="#b45309" strokeWidth="1.2" />
                            <rect x="13" y="21" width="15" height="12" rx="1.5" fill="#fde68a" stroke="#b45309" strokeWidth="1.2" />
                            <rect x="34" y="21" width="15" height="12" rx="1.5" fill="#fde68a" stroke="#b45309" strokeWidth="1.2" />
                          </g>
                        )}
                      </svg>
                      <div className="text-[10px] font-bold text-amber-950 leading-tight">{stage.title}</div>
                      <div className="text-[9px] text-amber-800">{stage.formula}</div>
                      <div className="text-xs font-extrabold text-amber-700 font-mono">{stage.totalAreaCm2} cm²</div>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  <strong>Rajah 7.11 (m.s. 230):</strong> Memecahkan ketulan marmar besar kepada ketulan kecil mendedahkan
                  permukaan dalaman, meningkatkan <strong>jumlah luas permukaan terdedah</strong> bagi jisim yang sama.
                </p>
              </div>
            )}

            {activeTab === 'collision' && (
              <div className="space-y-1.5 text-[11px] text-slate-700">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-sky-50/70 border border-sky-200 rounded-lg p-2 text-center">
                    <div className="font-bold text-sky-900 text-[10px] mb-1">Ketulan Besar (Luas Kecil)</div>
                    <svg viewBox="0 0 110 44" className="w-full h-10">
                      <rect x="37" y="10" width="36" height="24" rx="2" fill="#f9a8d4" stroke="#be185d" strokeWidth="1.2" />
                      {[14, 24, 86, 96].map((cx, i) => (
                        <circle key={i} cx={cx} cy={i % 2 === 0 ? 14 : 30} r="3" fill="#22c55e" stroke="#15803d" strokeWidth="0.8" />
                      ))}
                    </svg>
                    <div className="text-[9.5px] text-sky-800">Hanya zarah luar CaCO₃ bertembung ion H⁺</div>
                  </div>

                  <div className="bg-rose-50/70 border border-rose-200 rounded-lg p-2 text-center">
                    <div className="font-bold text-rose-900 text-[10px] mb-1">Ketulan Kecil (Luas Besar)</div>
                    <svg viewBox="0 0 110 44" className="w-full h-10">
                      {[26, 48, 70].map((x) => (
                        <rect key={x} x={x} y="14" width="12" height="14" rx="1.5" fill="#f9a8d4" stroke="#be185d" strokeWidth="1" />
                      ))}
                      {[16, 42, 64, 92].map((cx, i) => (
                        <circle key={i} cx={cx} cy={i % 2 === 0 ? 11 : 34} r="3" fill="#22c55e" stroke="#15803d" strokeWidth="0.8" />
                      ))}
                    </svg>
                    <div className="text-[9.5px] text-rose-800">Lebih banyak permukaan terdedah kepada H⁺</div>
                  </div>
                </div>
                <ul className="list-disc pl-4 space-y-0.5 text-[10.5px] text-slate-600 leading-snug">
                  <li>
                    Saiz lebih kecil → <strong>jumlah luas permukaan terdedah bertambah</strong>.
                  </li>
                  <li>
                    <strong>Frekuensi perlanggaran</strong> & <strong>perlanggaran berkesan</strong> antara CaCO₃ dan ion H⁺ meningkat → kadar tindak balas lebih tinggi.
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'analysis' && (
              <div className="space-y-1.5 text-[10.5px]">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-sky-50 border border-sky-200 rounded-lg p-2">
                    <div className="font-bold text-sky-900">Set I (Ketulan Besar)</div>
                    <div className="text-sky-800 mt-0.5">Kadar awal (t=0): <strong>0.43 cm³/s</strong></div>
                    <div className="text-sky-800">Masa tamat: <strong>210 saat</strong></div>
                    <div className="text-sky-800">Kadar purata: <strong>0.21 cm³/s</strong></div>
                  </div>
                  <div className="bg-rose-50 border border-rose-200 rounded-lg p-2">
                    <div className="font-bold text-rose-900">Set II (Ketulan Kecil)</div>
                    <div className="text-rose-800 mt-0.5">Kadar awal (t=0): <strong>0.94 cm³/s</strong></div>
                    <div className="text-rose-800">Masa tamat: <strong>120 saat</strong></div>
                    <div className="text-rose-800">Kadar purata: <strong>0.38 cm³/s</strong></div>
                  </div>
                </div>
                <p className="text-slate-600 leading-snug">
                  <strong>Kesimpulan:</strong> Semakin kecil saiz ketulan marmar, semakin tinggi kadar tindak balas. Isi padu
                  maksimum CO₂ (<strong>45.0 cm³</strong>) adalah sama kerana kuantiti mol bahan tindak balas dimalarkan.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
