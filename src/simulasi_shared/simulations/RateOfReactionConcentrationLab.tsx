import React, { useEffect, useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Timer,
  CheckCircle2,
  Sparkles,
  Calculator,
  BookOpen,
  FastForward,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { analytics } from '../services/analytics';
import {
  CONCENTRATION_SETS,
  CONCENTRATION_SET_MAP,
  ConcentrationSetId,
  EXPERIMENT_72_CONSTANTS,
  evaluateSulfurTurbidity,
} from '../data/rateOfReactionConcentration';
import { RateConcentrationApparatusSVG } from '../components/RateConcentrationApparatusSVG';
import { RateConcentrationLiveGraph } from '../components/RateConcentrationLiveGraph';

const SIM_ID = 'kadar-tindak-balas-kepekatan';

type ConceptTabId = 'collision' | 'formula' | 'discussion';

export const RateOfReactionConcentrationLab: React.FC = () => {
  const [activeSetId, setActiveSetId] = useState<ConcentrationSetId>('I');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timeSec, setTimeSec] = useState<number>(0);
  const [animFrame, setAnimFrame] = useState<number>(0);

  const [progressBySet, setProgressBySet] = useState<Record<ConcentrationSetId, number>>({
    I: -1,
    II: -1,
    III: -1,
    IV: -1,
    V: -1,
  });

  const [activeTab, setActiveTab] = useState<ConceptTabId>('collision');

  const activeSpec = CONCENTRATION_SET_MAP[activeSetId];
  const turbidity = evaluateSulfurTurbidity(timeSec, activeSetId);
  const isFinished = timeSec >= activeSpec.timeHideCrossSec;

  useEffect(() => {
    if (!isRunning || timeSec >= activeSpec.timeHideCrossSec) return;

    const timer = window.setTimeout(() => {
      const next = +Math.min(activeSpec.timeHideCrossSec, timeSec + 0.5).toFixed(1);
      setTimeSec(next);
      setAnimFrame((f) => f + 1);
      setProgressBySet((prev) => ({
        ...prev,
        [activeSetId]: Math.max(prev[activeSetId], next),
      }));

      if (next >= activeSpec.timeHideCrossSec) {
        setIsRunning(false);
        analytics.recordSimulationCompleted(SIM_ID);
        confetti({ particleCount: 45, spread: 45 });
      }
    }, 75);

    return () => window.clearTimeout(timer);
  }, [isRunning, timeSec, activeSetId, activeSpec.timeHideCrossSec]);

  const handleSelectSet = (id: ConcentrationSetId) => {
    setIsRunning(false);
    setActiveSetId(id);
    setTimeSec(0);
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  const handleToggleRun = () => {
    if (isFinished) return;
    if (timeSec === 0) {
      setProgressBySet((prev) => ({
        ...prev,
        [activeSetId]: Math.max(prev[activeSetId], 0),
      }));
    }
    analytics.recordSimulationClick(SIM_ID, 1);
    setIsRunning((r) => !r);
  };

  const handleAutoCompleteAll = () => {
    setIsRunning(false);
    setTimeSec(activeSpec.timeHideCrossSec);
    setProgressBySet({
      I: CONCENTRATION_SET_MAP.I.timeHideCrossSec,
      II: CONCENTRATION_SET_MAP.II.timeHideCrossSec,
      III: CONCENTRATION_SET_MAP.III.timeHideCrossSec,
      IV: CONCENTRATION_SET_MAP.IV.timeHideCrossSec,
      V: CONCENTRATION_SET_MAP.V.timeHideCrossSec,
    });
    analytics.recordSimulationCompleted(SIM_ID);
  };

  const handleResetAll = () => {
    setIsRunning(false);
    setTimeSec(0);
    setAnimFrame(0);
    setProgressBySet({ I: -1, II: -1, III: -1, IV: -1, V: -1 });
  };

  const completedCount = CONCENTRATION_SETS.filter(
    (s) => progressBySet[s.id] >= s.timeHideCrossSec
  ).length;

  return (
    <div className="space-y-3 text-slate-800">
      {/* Bar Kawalan Atas: 5 Set Kepekatan (Eks I - V), Pemboleh Ubah & Butang Pantas */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {CONCENTRATION_SETS.map((spec) => {
            const active = activeSetId === spec.id;
            const recorded = progressBySet[spec.id] >= spec.timeHideCrossSec;
            return (
              <button
                key={spec.id}
                type="button"
                onClick={() => handleSelectSet(spec.id)}
                data-testid={`select-conc-${spec.id}`}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition border ${
                  active
                    ? 'text-white shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
                style={
                  active
                    ? { backgroundColor: spec.strokeHex, borderColor: spec.strokeHex }
                    : undefined
                }
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: active ? '#ffffff' : spec.strokeHex }}
                />
                <span>{spec.label}</span>
                <span className={active ? 'text-white/90 font-mono text-[10px]' : 'text-slate-400 font-mono text-[10px]'}>
                  ({spec.dilutedMolarityM2.toFixed(2)} M)
                </span>
                {recorded && (
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-emerald-600'}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
            Dimalarkan: <strong>5.0 cm³ H₂SO₄ 1.0 M</strong> • <strong>50.0 cm³</strong>
          </span>
          <button
            type="button"
            onClick={handleAutoCompleteAll}
            data-testid="btn-auto-record-all"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-[11px] font-bold transition"
            title="Rekod keputusan semua set I–V untuk memplot graf lengkap"
          >
            <FastForward className="w-3.5 h-3.5" />
            Rekod Semua ({completedCount}/5)
          </button>
        </div>
      </div>

      {/* Susun Atur 2 Lajur Padat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        {/* LAJUR KIRI: Rajah 7.14 + Pandangan Tegak Mata + Jadual 7.5 & 7.6 */}
        <div className="lg:col-span-7 flex flex-col gap-2.5">
          <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                Rajah 7.14: Eksperimen 7.2 (Natrium Tiosulfat + Asid Sulfurik)
              </span>
              <div className="flex items-center gap-2">
                {isFinished && progressBySet[activeSetId] >= activeSpec.timeHideCrossSec && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg whitespace-nowrap">
                    Tamat: {activeSpec.timeHideCrossSec.toFixed(1)} s
                  </span>
                )}
                <div className="inline-flex items-center gap-1.5 bg-slate-900 text-emerald-400 px-2.5 py-1 rounded-lg font-mono text-xs font-bold">
                  <Timer className="w-3.5 h-3.5 text-amber-400" />
                  <span>{timeSec.toFixed(1)} s</span>
                </div>
              </div>
            </div>

            <RateConcentrationApparatusSVG
              activeSet={activeSpec}
              timeSec={timeSec}
              isRunning={isRunning}
              animFrame={animFrame}
            />

            {/* Bar Telemetri & Kawalan */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 text-center">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Kekeruhan S(p)</span>
                <strong className="font-mono text-xs text-amber-700">{Math.round(turbidity)}%</strong>
              </div>

              <div className="bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 text-center">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Kadar (1/masa)</span>
                <strong className="font-mono text-xs text-indigo-700">
                  {progressBySet[activeSetId] >= activeSpec.timeHideCrossSec
                    ? `${activeSpec.rateInverseTime.toFixed(4)} s⁻¹`
                    : '—'}
                </strong>
              </div>

              <button
                type="button"
                onClick={handleToggleRun}
                disabled={isFinished}
                data-testid="btn-conc-start"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white inline-flex items-center justify-center gap-1.5 transition ${
                  isRunning
                    ? 'bg-amber-600 hover:bg-amber-500'
                    : 'bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50'
                }`}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isRunning
                  ? 'Jeda'
                  : isFinished
                    ? `Selesai (${activeSpec.timeHideCrossSec}s)`
                    : timeSec > 0
                      ? 'Sambung'
                      : 'Tuang H₂SO₄ & Mula'}
              </button>

              <button
                type="button"
                onClick={handleResetAll}
                data-testid="btn-conc-reset"
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold inline-flex items-center justify-center gap-1.5 border border-slate-200 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>
          </div>

          {/* Jadual 7.5 & 7.6 Padat */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
              <span>Jadual 7.5 &amp; 7.6: Keputusan Eksperimen I–V</span>
              <span className="text-[10px] font-normal text-slate-500">
                Jumlah campuran tetap: 50.0 cm³
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-[10px] text-center border-collapse bg-white rounded-lg overflow-hidden border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="py-1 px-2 text-left">Parameter</th>
                    {CONCENTRATION_SETS.map((s) => (
                      <th
                        key={s.id}
                        className={`py-1 px-1.5 font-mono ${
                          activeSetId === s.id ? 'bg-indigo-50 text-indigo-700' : ''
                        }`}
                      >
                        {s.id}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-1 px-2 text-left text-slate-600">Na₂S₂O₃ 0.2 M + Air (cm³)</td>
                    {CONCENTRATION_SETS.map((s) => (
                      <td key={`v-${s.id}`} className="py-1 px-1.5 font-mono text-slate-700">
                        {s.vThiosulphateCm3.toFixed(0)} + {s.vWaterCm3.toFixed(0)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-1 px-2 text-left font-semibold text-slate-700">
                      Kepekatan M₂ (mol dm⁻³)
                    </td>
                    {CONCENTRATION_SETS.map((s) => (
                      <td
                        key={`m-${s.id}`}
                        className="py-1 px-1.5 font-mono font-bold"
                        style={{ color: s.strokeHex }}
                      >
                        {s.dilutedMolarityM2.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-1 px-2 text-left font-semibold text-slate-700">
                      Masa tanda &apos;✕&apos; hilang (s)
                    </td>
                    {CONCENTRATION_SETS.map((s) => {
                      const done = progressBySet[s.id] >= s.timeHideCrossSec;
                      return (
                        <td
                          key={`t-${s.id}`}
                          className={`py-1 px-1.5 font-mono ${
                            done ? 'font-bold text-slate-900' : 'text-slate-300'
                          }`}
                        >
                          {done ? s.timeHideCrossSec.toFixed(1) : '—'}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="py-1 px-2 text-left font-semibold text-indigo-700">
                      Kadar tindak balas, 1/masa (s⁻¹)
                    </td>
                    {CONCENTRATION_SETS.map((s) => {
                      const done = progressBySet[s.id] >= s.timeHideCrossSec;
                      return (
                        <td
                          key={`r-${s.id}`}
                          className={`py-1 px-1.5 font-mono ${
                            done ? 'font-bold text-indigo-700' : 'text-slate-300'
                          }`}
                        >
                          {done ? s.rateInverseTime.toFixed(4) : '—'}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* LAJUR KANAN: Graf Masa Nyata + Persamaan + Teori Perlanggaran / Formula / Perbincangan */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          <RateConcentrationLiveGraph
            activeSetId={activeSetId}
            timeSec={timeSec}
            isRunning={isRunning}
            progressBySet={progressBySet}
          />

          <div className="font-mono text-[10.5px] bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 text-center font-bold text-slate-800">
            Na₂S₂O₃(ak) + H₂SO₄(ak) → Na₂SO₄(ak) + S(p)↓ + SO₂(g) + H₂O(ce)
          </div>

          {/* Kad Konsep KSSM (3 Tab Padat) */}
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 space-y-2">
            <div className="flex items-center gap-1 border-b border-slate-100 pb-2">
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
                Rajah 7.23: Teori
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('formula')}
                className={`flex-1 inline-flex items-center justify-center gap-1 py-1 px-2 rounded-lg text-[10px] font-bold transition ${
                  activeTab === 'formula'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Calculator className="w-3 h-3" />
                Kiraan M₁V₁=M₂V₂
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('discussion')}
                className={`flex-1 inline-flex items-center justify-center gap-1 py-1 px-2 rounded-lg text-[10px] font-bold transition ${
                  activeTab === 'discussion'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-3 h-3" />
                Perbincangan
              </button>
            </div>

            {activeTab === 'collision' && (
              <div className="space-y-1.5 text-[11px] text-slate-700">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-sky-50/70 border border-sky-200 rounded-lg p-2 text-center">
                    <div className="font-bold text-sky-900 text-[10px] mb-1">(a) Kepekatan Rendah</div>
                    <svg viewBox="0 0 110 42" className="w-full h-9">
                      {[
                        [18, 12, '#f97316'],
                        [54, 28, '#475569'],
                        [88, 14, '#f97316'],
                        [34, 32, '#475569'],
                        [74, 30, '#f97316'],
                      ].map(([cx, cy, fill], i) => (
                        <circle key={i} cx={Number(cx)} cy={Number(cy)} r="3.4" fill={String(fill)} />
                      ))}
                    </svg>
                    <div className="text-[9.5px] text-sky-800">Bilangan zarah per unit isi padu sedikit</div>
                  </div>

                  <div className="bg-rose-50/70 border border-rose-200 rounded-lg p-2 text-center">
                    <div className="font-bold text-rose-900 text-[10px] mb-1">(b) Kepekatan Tinggi</div>
                    <svg viewBox="0 0 110 42" className="w-full h-9">
                      {[
                        [14, 10, '#f97316'],
                        [22, 12, '#475569'],
                        [44, 14, '#f97316'],
                        [52, 16, '#475569'],
                        [78, 11, '#f97316'],
                        [94, 18, '#475569'],
                        [26, 29, '#f97316'],
                        [34, 31, '#475569'],
                        [64, 28, '#f97316'],
                        [72, 30, '#475569'],
                        [92, 33, '#f97316'],
                      ].map(([cx, cy, fill], i) => (
                        <circle key={i} cx={Number(cx)} cy={Number(cy)} r="3.4" fill={String(fill)} />
                      ))}
                    </svg>
                    <div className="text-[9.5px] text-rose-800">Zarah lebih padat → perlanggaran kerap</div>
                  </div>
                </div>
                <p className="text-[10.5px] text-slate-600 leading-snug">
                  <strong>Rajah 7.23 (m.s. 245):</strong> Kepekatan bertambah → <strong>bilangan zarah S₂O₃²⁻ per unit isi padu bertambah</strong> → frekuensi perlanggaran &amp; perlanggaran berkesan bertambah → kadar tindak balas meningkat!
                </p>
              </div>
            )}

            {activeTab === 'formula' && (
              <div className="space-y-1.5 text-[11px]">
                <div className="bg-slate-50 rounded-lg p-2 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Formula Pencairan (M₁V₁ = M₂V₂)</span>
                  <span className="font-mono font-bold text-indigo-700">
                    ({EXPERIMENT_72_CONSTANTS.stockMolarityM1} × {activeSpec.vThiosulphateCm3.toFixed(0)}) /{' '}
                    {activeSpec.totalVolumeCm3.toFixed(0)} = {activeSpec.dilutedMolarityM2.toFixed(2)} M
                  </span>
                </div>
                <div className="bg-slate-50 rounded-lg p-2 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Kadar Tindak Balas (1 / masa)</span>
                  <span className="font-mono font-bold text-slate-900">
                    1 / {activeSpec.timeHideCrossSec.toFixed(1)} s ={' '}
                    <strong className="text-indigo-700">{activeSpec.rateInverseTime.toFixed(4)} s⁻¹</strong>
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-500 leading-snug">
                  Semakin tinggi M₂, semakin singkat masa yang diambil untuk jumlah mendakan sulfur S(p) yang sama terbentuk.
                </p>
              </div>
            )}

            {activeTab === 'discussion' && (
              <div className="space-y-1.5 text-[10.5px] text-slate-600 leading-snug">
                <div>
                  <strong className="text-slate-800">1. Mengapa larutan menjadi keruh?</strong> Mendakan kuning sulfur tak terlarut, <strong>S(p)</strong> terbentuk dan menghalang penglihatan tanda &apos;✕&apos;.
                </div>
                <div>
                  <strong className="text-slate-800">2. Mengapa jumlah isi padu ditetapkan 50.0 cm³?</strong> Supaya ketinggian turus cecair dalam kelalang kon sama dan <strong>tahap kekeruhan sama</strong> diperlukan untuk menyembunyikan tanda &apos;✕&apos;.
                </div>
                <div>
                  <strong className="text-slate-800">3. Persamaan ion:</strong>{' '}
                  <span className="font-mono text-slate-800">S₂O₃²⁻(ak) + 2H⁺(ak) → S(p) + SO₂(g) + H₂O(ce)</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
