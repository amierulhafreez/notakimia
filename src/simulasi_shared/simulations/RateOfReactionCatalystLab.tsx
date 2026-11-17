import React, { useEffect, useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Timer,
  CheckCircle2,
  Sparkles,
  Activity,
  BookOpen,
  FastForward,
  FlaskConical,
  Wind,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { analytics } from '../services/analytics';
import {
  CATALYST_CHECKPOINTS,
  CATALYST_SETS,
  CATALYST_SET_MAP,
  CatalystSetId,
  EXPERIMENT_74_CONSTANTS,
  evaluateInstantOxygenRate,
  evaluateOxygenVolume,
} from '../data/rateOfReactionCatalyst';
import {
  CatalystApparatusView,
  RateCatalystApparatusSVG,
} from '../components/RateCatalystApparatusSVG';
import { RateCatalystLiveGraph } from '../components/RateCatalystLiveGraph';
import { CatalystEnergyProfileSVG } from '../components/CatalystEnergyProfileSVG';

const SIM_ID = 'kadar-tindak-balas-mangkin';

type ConceptTabId = 'energy' | 'theory' | 'discussion';

export const RateOfReactionCatalystLab: React.FC = () => {
  const [activeCatalystId, setActiveCatalystId] = useState<CatalystSetId>('mno2');
  const [viewMode, setViewMode] = useState<CatalystApparatusView>('testtube');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timeSec, setTimeSec] = useState<number>(0);
  const [animFrame, setAnimFrame] = useState<number>(0);

  const [progressBySet, setProgressBySet] = useState<Record<CatalystSetId, number>>({
    none: -1,
    mno2: -1,
    fe: -1,
    cuo: -1,
  });

  const [activeTab, setActiveTab] = useState<ConceptTabId>('energy');

  const activeSpec = CATALYST_SET_MAP[activeCatalystId];
  const currentVolume = evaluateOxygenVolume(timeSec, activeCatalystId);
  const rawRate = evaluateInstantOxygenRate(timeSec, activeCatalystId);
  const instantRate = timeSec === 0 && !isRunning ? 0 : rawRate;
  const isFinished = timeSec >= EXPERIMENT_74_CONSTANTS.maxDurationSec;

  useEffect(() => {
    if (!isRunning || timeSec >= EXPERIMENT_74_CONSTANTS.maxDurationSec) return;

    const timer = window.setTimeout(() => {
      const next = Math.min(EXPERIMENT_74_CONSTANTS.maxDurationSec, timeSec + 1);
      setTimeSec(next);
      setAnimFrame((f) => f + 1);
      setProgressBySet((prev) => ({
        ...prev,
        [activeCatalystId]: Math.max(prev[activeCatalystId], next),
      }));

      if (next >= EXPERIMENT_74_CONSTANTS.maxDurationSec) {
        setIsRunning(false);
        analytics.recordSimulationCompleted(SIM_ID);
        confetti({ particleCount: 45, spread: 45 });
      }
    }, 65);

    return () => window.clearTimeout(timer);
  }, [isRunning, timeSec, activeCatalystId]);

  const handleSelectCatalyst = (id: CatalystSetId) => {
    setIsRunning(false);
    setActiveCatalystId(id);
    setTimeSec(0);
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  const handleToggleRun = () => {
    if (isFinished) return;
    if (timeSec === 0) {
      setProgressBySet((prev) => ({
        ...prev,
        [activeCatalystId]: Math.max(prev[activeCatalystId], 0),
      }));
    }
    analytics.recordSimulationClick(SIM_ID, 1);
    setIsRunning((r) => !r);
  };

  const handleAutoCompleteAll = () => {
    setIsRunning(false);
    setTimeSec(EXPERIMENT_74_CONSTANTS.maxDurationSec);
    setProgressBySet({
      none: EXPERIMENT_74_CONSTANTS.maxDurationSec,
      mno2: EXPERIMENT_74_CONSTANTS.maxDurationSec,
      fe: EXPERIMENT_74_CONSTANTS.maxDurationSec,
      cuo: EXPERIMENT_74_CONSTANTS.maxDurationSec,
    });
    analytics.recordSimulationCompleted(SIM_ID);
  };

  const handleResetAll = () => {
    setIsRunning(false);
    setTimeSec(0);
    setAnimFrame(0);
    setProgressBySet({ none: -1, mno2: -1, fe: -1, cuo: -1 });
  };

  const completedCount = CATALYST_SETS.filter(
    (s) => progressBySet[s.id] >= EXPERIMENT_74_CONSTANTS.maxDurationSec
  ).length;

  return (
    <div className="space-y-2.5 text-slate-800">
      {/* Bar Kawalan Atas: Pilihan Mangkin + Rekod Semua */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {CATALYST_SETS.map((spec) => {
            const active = activeCatalystId === spec.id;
            const recorded = progressBySet[spec.id] >= EXPERIMENT_74_CONSTANTS.maxDurationSec;
            return (
              <button
                key={spec.id}
                type="button"
                onClick={() => handleSelectCatalyst(spec.id)}
                data-testid={`select-cat-${spec.id}`}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition border ${
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
                <span>{spec.shortLabel}</span>
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
            Dimalarkan: <strong>H₂O₂</strong> • <strong>Jisim mangkin 0.5 g</strong>
          </span>
          <button
            type="button"
            onClick={handleAutoCompleteAll}
            data-testid="btn-cat-auto-record-all"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-[11px] font-bold transition"
            title="Rekod semua keputusan tanpa mangkin & bermangkin pada graf & jadual"
          >
            <FastForward className="w-3.5 h-3.5" />
            Rekod Semua ({completedCount}/4)
          </button>
        </div>
      </div>

      {/* Susun Atur 2 Lajur Padat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        {/* LAJUR KIRI: Radas Eksperimen 7.4 + Jadual 7.8 */}
        <div className="lg:col-span-7 flex flex-col gap-2.5">
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-[10.5px] font-bold">
                <button
                  type="button"
                  onClick={() => setViewMode('testtube')}
                  data-testid="cat-view-testtube"
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md transition ${
                    viewMode === 'testtube' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  <FlaskConical className="w-3 h-3" />
                  Eks. 7.4: Tabung Uji &amp; Kayu Uji
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('gascollection')}
                  data-testid="cat-view-gas"
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md transition ${
                    viewMode === 'gascollection' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  <Wind className="w-3 h-3" />
                  Pengumpul Gas O₂
                </button>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-slate-900 text-emerald-400 px-2.5 py-1 rounded-lg font-mono text-xs font-bold">
                <Timer className="w-3.5 h-3.5 text-amber-400" />
                <span>{timeSec.toFixed(0)} s</span>
              </div>
            </div>

            <RateCatalystApparatusSVG
              activeCatalystId={activeCatalystId}
              viewMode={viewMode}
              timeSec={timeSec}
              currentVolume={currentVolume}
              instantRate={instantRate}
              isRunning={isRunning}
              animFrame={animFrame}
            />

            {/* Bar Telemetri & Kawalan */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 text-center">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Isi Padu Gas O₂</span>
                <strong className="font-mono text-xs text-emerald-700">{currentVolume.toFixed(1)} cm³</strong>
              </div>

              <div className="bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 text-center">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Kadar Seketika</span>
                <strong className="font-mono text-xs text-indigo-700">{instantRate.toFixed(2)} cm³/s</strong>
              </div>

              <button
                type="button"
                onClick={handleToggleRun}
                disabled={isFinished}
                data-testid="btn-cat-start"
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
                    ? 'Selesai (60s)'
                    : timeSec > 0
                      ? 'Sambung'
                      : activeCatalystId === 'none'
                        ? 'Uji Tanpa Mangkin'
                        : `Uji + ${activeSpec.formula}`}
              </button>

              <button
                type="button"
                onClick={handleResetAll}
                data-testid="btn-cat-reset"
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold inline-flex items-center justify-center gap-1.5 border border-slate-200 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>
          </div>

          {/* Jadual 7.8 & Pemerhatian Kayu Uji Berbara (Eksperimen 7.4) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
              <span>Jadual 7.8 &amp; Pemerhatian Eksperimen 7.4 (Isi Padu Gas O₂, cm³)</span>
              <span className="text-[10px] font-normal text-slate-500">m.s. 235 &amp; 238</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-[10px] text-center border-collapse bg-white rounded-lg overflow-hidden border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="py-1 px-2 text-left">Keadaan / Mangkin</th>
                    {CATALYST_CHECKPOINTS.map((cp) => (
                      <th key={cp} className="py-1 px-1.5 font-mono">
                        {cp}s
                      </th>
                    ))}
                    <th className="py-1 px-2 text-left">Kayu Uji Berbara</th>
                  </tr>
                </thead>
                <tbody>
                  {CATALYST_SETS.map((s) => {
                    const prog = progressBySet[s.id];
                    const rowStarted = prog >= 2;
                    return (
                      <tr
                        key={s.id}
                        className={`border-b last:border-b-0 border-slate-100 ${
                          activeCatalystId === s.id ? 'bg-indigo-50/50' : ''
                        }`}
                      >
                        <td className="py-1 px-2 text-left font-bold whitespace-nowrap" style={{ color: s.strokeHex }}>
                          {s.shortLabel}
                        </td>
                        {CATALYST_CHECKPOINTS.map((cp, idx) => {
                          const unlocked = prog >= cp;
                          const val = s.volumeAtCheckpointsCm3[idx + 1];
                          return (
                            <td
                              key={`${s.id}-${cp}`}
                              className={`py-1 px-1.5 font-mono ${
                                unlocked ? 'font-semibold text-slate-900' : 'text-slate-300'
                              }`}
                            >
                              {unlocked ? val : '—'}
                            </td>
                          );
                        })}
                        <td
                          className={`py-1 px-2 text-left whitespace-nowrap ${
                            !rowStarted
                              ? 'text-slate-300'
                              : s.splinterState === 'relight'
                                ? 'font-bold text-emerald-700'
                                : 'text-slate-700 font-medium'
                          }`}
                        >
                          {rowStarted ? s.splinterResult : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* LAJUR KANAN: Graf Masa Nyata + Persamaan + Gambar Rajah Profil Tenaga (Satu Paksi) */}
        <div className="lg:col-span-5 flex flex-col gap-2">
          <RateCatalystLiveGraph
            activeCatalystId={activeCatalystId}
            timeSec={timeSec}
            isRunning={isRunning}
            progressBySet={progressBySet}
          />

          <div className="font-mono text-[10.5px] bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 text-center font-bold text-slate-800">
            2H₂O₂(ak) → 2H₂O(ce) + O₂(g) &nbsp;[Tindak balas eksotermik]
          </div>

          {/* Kad Konsep KSSM: Rajah 7.26 Profil Tenaga (Lalai Terpapar Terus!) */}
          <div className="bg-white border border-slate-200 rounded-xl p-2.5 space-y-2">
            <div className="flex items-center gap-1 border-b border-slate-100 pb-1.5">
              <button
                type="button"
                onClick={() => setActiveTab('energy')}
                data-testid="cat-tab-energy"
                className={`flex-1 inline-flex items-center justify-center gap-1 py-1 px-1.5 rounded-lg text-[10px] font-bold transition ${
                  activeTab === 'energy'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Activity className="w-3 h-3" />
                Profil Tenaga (7.26)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('theory')}
                data-testid="cat-tab-theory"
                className={`flex-1 inline-flex items-center justify-center gap-1 py-1 px-1.5 rounded-lg text-[10px] font-bold transition ${
                  activeTab === 'theory'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                Teori Perlanggaran
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('discussion')}
                data-testid="cat-tab-discussion"
                className={`flex-1 inline-flex items-center justify-center gap-1 py-1 px-1.5 rounded-lg text-[10px] font-bold transition ${
                  activeTab === 'discussion'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-3 h-3" />
                Perbincangan
              </button>
            </div>

            {activeTab === 'energy' && (
              <CatalystEnergyProfileSVG activeCatalystId={activeCatalystId} />
            )}

            {activeTab === 'theory' && (
              <div className="space-y-1.5 text-[10.5px] text-slate-600 leading-snug">
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-2 text-emerald-950 font-semibold">
                  Apabila mangkin (contohnya MnO₂) hadir:
                </div>
                <ul className="space-y-1 pl-3 list-disc">
                  <li>
                    Mangkin menyediakan <strong>lintasan tindak balas alternatif</strong> dengan merendahkan tenaga pengaktifan (<strong>Eₐ&apos; &lt; Eₐ</strong>).
                  </li>
                  <li>
                    <strong>Lebih banyak zarah</strong> bahan tindak balas (H₂O₂) dapat mencapai atau mengatasi tenaga pengaktifan itu.
                  </li>
                  <li>
                    <strong>Frekuensi perlanggaran berkesan</strong> antara zarah-zarah bertambah → kadar tindak balas bertambah.
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'discussion' && (
              <div className="space-y-1.5 text-[10.5px] text-slate-600 leading-snug">
                <div>
                  <strong className="text-slate-800">1. Mengapa mangkin tidak mengubah hasil maksimum (100 cm³ O₂)?</strong> Kuantiti bahan tindak balas (H₂O₂) adalah sama; mangkin hanya mempercepat pencapaian jumlah hasil yang sama.
                </div>
                <div>
                  <strong className="text-slate-800">2. Mengapa jisim MnO₂ kekal 0.50 g selepas dituras?</strong> Mangkin terlibat dalam tindak balas tetapi tidak berubah secara kimia pada akhir tindak balas.
                </div>
                <div>
                  <strong className="text-slate-800">3. Susunan keberkesanan mangkin (Jadual 7.8):</strong>{' '}
                  <span className="font-mono font-bold text-slate-800">MnO₂ &gt; Fe &gt; CuO &gt; Tanpa mangkin</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
