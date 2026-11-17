import React, { useEffect, useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Timer,
  CheckCircle2,
  Sparkles,
  Flame,
  BookOpen,
  FastForward,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { analytics } from '../services/analytics';
import {
  EXPERIMENT_73_CONSTANTS,
  TEMPERATURE_SETS,
  TEMPERATURE_SET_MAP,
  TemperatureSetId,
  evaluateTemperatureTurbidity,
} from '../data/rateOfReactionTemperature';
import {
  RateTemperatureApparatusSVG,
  TempExperimentPhase,
} from '../components/RateTemperatureApparatusSVG';
import { RateTemperatureLiveGraph } from '../components/RateTemperatureLiveGraph';

const SIM_ID = 'kadar-tindak-balas-suhu';

type ConceptTabId = 'collision' | 'rule10c' | 'discussion';

export const RateOfReactionTemperatureLab: React.FC = () => {
  const [activeSetId, setActiveSetId] = useState<TemperatureSetId>('I');
  const [phase, setPhase] = useState<TempExperimentPhase>('idle');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [displayTempC, setDisplayTempC] = useState<number>(EXPERIMENT_73_CONSTANTS.roomTempC);
  const [timeSec, setTimeSec] = useState<number>(0);
  const [animFrame, setAnimFrame] = useState<number>(0);

  const [progressBySet, setProgressBySet] = useState<Record<TemperatureSetId, number>>({
    I: -1,
    II: -1,
    III: -1,
    IV: -1,
    V: -1,
  });

  const [activeTab, setActiveTab] = useState<ConceptTabId>('collision');

  const activeSpec = TEMPERATURE_SET_MAP[activeSetId];
  const turbidity = evaluateTemperatureTurbidity(timeSec, activeSetId);
  const isFinished = phase === 'done';

  // Pemasa Fasa 1: Pemanasan atas tungku kaki tiga & penunu Bunsen (Eksp II-V)
  useEffect(() => {
    if (phase !== 'heating' || isPaused) return;

    const timer = window.setTimeout(() => {
      const nextTemp = Math.min(activeSpec.tempC, displayTempC + 1.5);
      setDisplayTempC(nextTemp);
      setAnimFrame((f) => f + 1);

      if (nextTemp >= activeSpec.tempC) {
        setPhase('running');
      }
    }, 55);

    return () => window.clearTimeout(timer);
  }, [phase, isPaused, displayTempC, activeSpec.tempC]);

  // Pemasa Fasa 2: Tindak balas & pembentukan kekeruhan sulfur pada tanda '✕'
  useEffect(() => {
    if (phase !== 'running' || isPaused || timeSec >= activeSpec.timeHideCrossSec) return;

    const timer = window.setTimeout(() => {
      const next = +Math.min(activeSpec.timeHideCrossSec, timeSec + 0.5).toFixed(1);
      setTimeSec(next);
      setAnimFrame((f) => f + 1);
      setProgressBySet((prev) => ({
        ...prev,
        [activeSetId]: Math.max(prev[activeSetId], next),
      }));

      if (next >= activeSpec.timeHideCrossSec) {
        setPhase('done');
        setIsPaused(false);
        analytics.recordSimulationCompleted(SIM_ID);
        confetti({ particleCount: 45, spread: 45 });
      }
    }, 55);

    return () => window.clearTimeout(timer);
  }, [phase, isPaused, timeSec, activeSetId, activeSpec.timeHideCrossSec]);

  const handleSelectSet = (id: TemperatureSetId) => {
    const targetSpec = TEMPERATURE_SET_MAP[id];
    setActiveSetId(id);
    setPhase('idle');
    setIsPaused(false);
    setTimeSec(0);
    setDisplayTempC(targetSpec.isRoomTemp ? targetSpec.tempC : EXPERIMENT_73_CONSTANTS.roomTempC);
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  const handleToggleRun = () => {
    if (isFinished) return;

    if (phase === 'idle') {
      analytics.recordSimulationClick(SIM_ID, 1);
      setProgressBySet((prev) => ({
        ...prev,
        [activeSetId]: Math.max(prev[activeSetId], 0),
      }));
      setIsPaused(false);
      if (activeSpec.isRoomTemp) {
        setDisplayTempC(activeSpec.tempC);
        setPhase('running');
      } else {
        setDisplayTempC(EXPERIMENT_73_CONSTANTS.roomTempC);
        setPhase('heating');
      }
      return;
    }

    setIsPaused((p) => !p);
  };

  const handleAutoCompleteAll = () => {
    setPhase('done');
    setIsPaused(false);
    setDisplayTempC(activeSpec.tempC);
    setTimeSec(activeSpec.timeHideCrossSec);
    setProgressBySet({
      I: TEMPERATURE_SET_MAP.I.timeHideCrossSec,
      II: TEMPERATURE_SET_MAP.II.timeHideCrossSec,
      III: TEMPERATURE_SET_MAP.III.timeHideCrossSec,
      IV: TEMPERATURE_SET_MAP.IV.timeHideCrossSec,
      V: TEMPERATURE_SET_MAP.V.timeHideCrossSec,
    });
    analytics.recordSimulationCompleted(SIM_ID);
  };

  const handleResetAll = () => {
    setPhase('idle');
    setIsPaused(false);
    setTimeSec(0);
    setAnimFrame(0);
    setDisplayTempC(EXPERIMENT_73_CONSTANTS.roomTempC);
    setProgressBySet({ I: -1, II: -1, III: -1, IV: -1, V: -1 });
  };

  const completedCount = TEMPERATURE_SETS.filter(
    (s) => progressBySet[s.id] >= s.timeHideCrossSec
  ).length;

  const isRunningActive = (phase === 'heating' || phase === 'running') && !isPaused;

  return (
    <div className="space-y-3 text-slate-800">
      {/* Bar Kawalan Atas: 5 Set Suhu (Eks I - V), Pemboleh Ubah Dimalarkan & Butang Rekod Semua */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {TEMPERATURE_SETS.map((spec) => {
            const active = activeSetId === spec.id;
            const recorded = progressBySet[spec.id] >= spec.timeHideCrossSec;
            return (
              <button
                key={spec.id}
                type="button"
                onClick={() => handleSelectSet(spec.id)}
                data-testid={`select-temp-${spec.id}`}
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
                  ({spec.tempC} °C)
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
            Dimalarkan: <strong>50.0 cm³ Na₂S₂O₃ 0.2 M</strong> • <strong>5.0 cm³ H₂SO₄ 1.0 M</strong>
          </span>
          <button
            type="button"
            onClick={handleAutoCompleteAll}
            data-testid="btn-temp-auto-record-all"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-[11px] font-bold transition"
            title="Rekod keputusan semua suhu I–V untuk memplot graf lengkap"
          >
            <FastForward className="w-3.5 h-3.5" />
            Rekod Semua ({completedCount}/5)
          </button>
        </div>
      </div>

      {/* Susun Atur 2 Lajur Padat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        {/* LAJUR KIRI: Radas Eksperimen 7.3 + Kawalan + Jadual Keputusan */}
        <div className="lg:col-span-7 flex flex-col gap-2.5">
          <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                Eksperimen 7.3: Pemanasan &amp; Ujian Tanda &apos;✕&apos; (Faktor Suhu)
              </span>
              <div className="flex items-center gap-2">
                {phase === 'heating' && (
                  <span className="text-[10px] font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-lg whitespace-nowrap">
                    Memanas: {Math.round(displayTempC)}/{activeSpec.tempC} °C
                  </span>
                )}
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

            <RateTemperatureApparatusSVG
              activeSet={activeSpec}
              phase={phase}
              displayTempC={displayTempC}
              timeSec={timeSec}
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
                data-testid="btn-temp-start"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white inline-flex items-center justify-center gap-1.5 transition ${
                  isRunningActive
                    ? 'bg-amber-600 hover:bg-amber-500'
                    : 'bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50'
                }`}
              >
                {isRunningActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isRunningActive
                  ? 'Jeda'
                  : isFinished
                    ? `Selesai (${activeSpec.timeHideCrossSec}s)`
                    : phase !== 'idle'
                      ? 'Sambung'
                      : activeSpec.isRoomTemp
                        ? 'Tuang H₂SO₄ & Mula'
                        : 'Panaskan & Mula'}
              </button>

              <button
                type="button"
                onClick={handleResetAll}
                data-testid="btn-temp-reset"
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold inline-flex items-center justify-center gap-1.5 border border-slate-200 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>
          </div>

          {/* Jadual Keputusan Eksperimen 7.3 */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
              <span>Jadual Keputusan Eksperimen 7.3 (Set I–V)</span>
              <span className="text-[10px] font-normal text-slate-500">
                Isi padu tetap: 50.0 cm³ Na₂S₂O₃ + 5.0 cm³ H₂SO₄
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-[10px] text-center border-collapse bg-white rounded-lg overflow-hidden border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="py-1 px-2 text-left">Parameter</th>
                    {TEMPERATURE_SETS.map((s) => (
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
                    <td className="py-1 px-2 text-left font-semibold text-slate-700">
                      Suhu larutan Na₂S₂O₃ (°C)
                    </td>
                    {TEMPERATURE_SETS.map((s) => (
                      <td
                        key={`temp-${s.id}`}
                        className="py-1 px-1.5 font-mono font-bold"
                        style={{ color: s.strokeHex }}
                      >
                        {s.tempC}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-1 px-2 text-left font-semibold text-slate-700">
                      Masa tanda &apos;✕&apos; hilang (s)
                    </td>
                    {TEMPERATURE_SETS.map((s) => {
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
                    {TEMPERATURE_SETS.map((s) => {
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

        {/* LAJUR KANAN: Graf Masa Nyata + Persamaan + Rajah 7.25 Teori / Hukum 10°C / Perbincangan */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          <RateTemperatureLiveGraph
            activeSetId={activeSetId}
            timeSec={timeSec}
            isRunning={phase === 'running' && !isPaused}
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
                Rajah 7.25: Teori
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('rule10c')}
                className={`flex-1 inline-flex items-center justify-center gap-1 py-1 px-2 rounded-lg text-[10px] font-bold transition ${
                  activeTab === 'rule10c'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Flame className="w-3 h-3" />
                Kiraan &amp; +10 °C
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
                    <div className="font-bold text-sky-900 text-[10px] mb-1">(a) Suhu Rendah</div>
                    <svg viewBox="0 0 110 42" className="w-full h-9">
                      {/* Ekor halaju pendek: zarah bergerak perlahan */}
                      {[
                        [22, 12, '#f97316', -5, 2],
                        [58, 28, '#475569', 5, -2],
                        [86, 15, '#f97316', -4, 3],
                        [36, 31, '#475569', 4, 2],
                        [74, 30, '#f97316', -5, -2],
                      ].map(([cx, cy, fill, dx, dy], i) => (
                        <g key={i}>
                          <line
                            x1={Number(cx) + Number(dx)}
                            y1={Number(cy) + Number(dy)}
                            x2={Number(cx)}
                            y2={Number(cy)}
                            stroke="#94a3b8"
                            strokeWidth="1.2"
                          />
                          <circle cx={Number(cx)} cy={Number(cy)} r="3.4" fill={String(fill)} />
                        </g>
                      ))}
                    </svg>
                    <div className="text-[9.5px] text-sky-800">Zarah bergerak perlahan (tenaga kinetik rendah)</div>
                  </div>

                  <div className="bg-rose-50/70 border border-rose-200 rounded-lg p-2 text-center">
                    <div className="font-bold text-rose-900 text-[10px] mb-1">(b) Suhu Tinggi</div>
                    <svg viewBox="0 0 110 42" className="w-full h-9">
                      {/* Ekor halaju panjang + pancaran perlanggaran berkesan */}
                      {[
                        [26, 13, '#f97316', -14, 4],
                        [34, 15, '#475569', 12, -3],
                        [62, 26, '#f97316', -13, -5],
                        [70, 28, '#475569', 12, 4],
                        [92, 14, '#f97316', -11, 5],
                        [18, 32, '#475569', 14, -4],
                      ].map(([cx, cy, fill, dx, dy], i) => (
                        <g key={i}>
                          <line
                            x1={Number(cx) + Number(dx)}
                            y1={Number(cy) + Number(dy)}
                            x2={Number(cx)}
                            y2={Number(cy)}
                            stroke="#f97316"
                            strokeWidth="1.4"
                            strokeDasharray="3 1.5"
                          />
                          <circle cx={Number(cx)} cy={Number(cy)} r="3.4" fill={String(fill)} />
                        </g>
                      ))}
                    </svg>
                    <div className="text-[9.5px] text-rose-800">Zarah bergerak laju → lebih banyak atasi Eₐ</div>
                  </div>
                </div>
                <p className="text-[10.5px] text-slate-600 leading-snug">
                  <strong>Rajah 7.25 (m.s. 246):</strong> Suhu bertambah → <strong>tenaga kinetik zarah bertambah</strong> → lebih banyak zarah bertenaga mengatasi tenaga pengaktifan Eₐ → frekuensi perlanggaran berkesan bertambah!
                </p>
              </div>
            )}

            {activeTab === 'rule10c' && (
              <div className="space-y-1.5 text-[11px]">
                <div className="bg-slate-50 rounded-lg p-2 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Kadar Tindak Balas ({activeSpec.tempC} °C)</span>
                  <span className="font-mono font-bold text-slate-900">
                    1 / {activeSpec.timeHideCrossSec.toFixed(1)} s ={' '}
                    <strong className="text-indigo-700">{activeSpec.rateInverseTime.toFixed(4)} s⁻¹</strong>
                  </span>
                </div>
                <div className="bg-amber-50/70 rounded-lg p-2 border border-amber-200 flex items-center justify-between">
                  <span className="text-amber-900">Nisbah Berbanding Suhu Bilik (30 °C)</span>
                  <span className="font-mono font-bold text-amber-800">
                    {activeSpec.relativeRateFactor.toFixed(2)}× lebih pantas
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-500 leading-snug">
                  <strong>Fakta KSSM (m.s. 233):</strong> Bagi tindak balas pada suhu bilik, setiap peningkatan suhu <strong>10 °C</strong> meningkatkan kadar tindak balas kira-kira <strong>2 kali ganda</strong> (contoh: 30 °C → 40 °C → 50 °C).
                </p>
              </div>
            )}

            {activeTab === 'discussion' && (
              <div className="space-y-1.5 text-[10.5px] text-slate-600 leading-snug">
                <div>
                  <strong className="text-slate-800">1. Persamaan ion:</strong>{' '}
                  <span className="font-mono text-slate-800">S₂O₃²⁻(ak) + 2H⁺(ak) → S(p) + SO₂(g) + H₂O(ce)</span>
                </div>
                <div>
                  <strong className="text-slate-800">2. Bolehkah H₂SO₄ digantikan dengan HCl?</strong> Boleh hanya jika kepekatan atau isi padu asid monoprotik HCl digandakan dua kali (contohnya <strong>5.0 cm³ HCl 2.0 M</strong>) supaya bilangan mol ion <strong>H⁺</strong> yang dibekalkan kekal sama.
                </div>
                <div>
                  <strong className="text-slate-800">3. Pemalar kawalan:</strong> Suhu sahaja dimanipulasikan; kepekatan &amp; isi padu larutan dikekalkan pada 55.0 cm³.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
