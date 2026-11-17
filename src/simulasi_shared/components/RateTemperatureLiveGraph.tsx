import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import {
  TEMPERATURE_SETS,
  TEMPERATURE_SET_MAP,
  TemperatureSetId,
  buildSmoothTemperatureGuideline,
  buildTemperatureCurveSamples,
  evaluateTemperatureTurbidity,
} from '../data/rateOfReactionTemperature';

type GraphMode = 'turbidity' | 'rate' | 'time';

interface RateTemperatureLiveGraphProps {
  activeSetId: TemperatureSetId;
  timeSec: number;
  isRunning: boolean;
  progressBySet: Record<TemperatureSetId, number>; // -1 jika belum mula; >=0 jika pernah jalan
}

const SVG_W = 320;
const SVG_H = 184;
const PAD_LEFT = 46;
const PAD_RIGHT = 14;
const PAD_TOP = 28;
const PAD_BOTTOM = 28;
const PLOT_W = SVG_W - PAD_LEFT - PAD_RIGHT;
const PLOT_H = SVG_H - PAD_TOP - PAD_BOTTOM;

export const RateTemperatureLiveGraph: React.FC<RateTemperatureLiveGraphProps> = ({
  activeSetId,
  timeSec,
  isRunning,
  progressBySet,
}) => {
  const [graphMode, setGraphMode] = useState<GraphMode>('turbidity');
  const activeSpec = TEMPERATURE_SET_MAP[activeSetId];
  const activeTurbidity = evaluateTemperatureTurbidity(timeSec, activeSetId);

  const completedSets = TEMPERATURE_SETS.filter(
    (s) => progressBySet[s.id] >= s.timeHideCrossSec
  );

  // Skala Mode 1: Masa (0..52 s) -> Kekeruhan sulfur S (%) (0..110)
  const xTime = (t: number) => PAD_LEFT + (t / 52) * PLOT_W;
  const yTurb = (p: number) => PAD_TOP + PLOT_H - (p / 110) * PLOT_H;

  // Skala Mode 2 & 3: Suhu (25..60 °C)
  const xTemp = (tempC: number) => PAD_LEFT + ((tempC - 25) / 35) * PLOT_W;
  const yRate = (r: number) => PAD_TOP + PLOT_H - (r / 0.13) * PLOT_H;
  const yMasa = (s: number) => PAD_TOP + PLOT_H - (s / 55) * PLOT_H;

  const guideline = buildSmoothTemperatureGuideline(1);
  const rateGuidelinePath = guideline
    .map((g, i) => `${i === 0 ? 'M' : 'L'} ${xTemp(g.tempC).toFixed(1)} ${yRate(g.rate).toFixed(1)}`)
    .join(' ');
  const timeGuidelinePath = guideline
    .map((g, i) => `${i === 0 ? 'M' : 'L'} ${xTemp(g.tempC).toFixed(1)} ${yMasa(g.timeSec).toFixed(1)}`)
    .join(' ');

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-1.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800">
          <TrendingUp className="w-4 h-4 text-amber-600" />
          Graf Eksperimen 7.3
        </span>

        <div className="inline-flex rounded-lg bg-slate-200/80 p-0.5 text-[10px] font-bold">
          <button
            type="button"
            onClick={() => setGraphMode('turbidity')}
            data-testid="temp-graph-tab-turbidity"
            className={`px-2 py-0.5 rounded-md transition ${
              graphMode === 'turbidity' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            Lengkung Masa Nyata
          </button>
          <button
            type="button"
            onClick={() => setGraphMode('rate')}
            data-testid="temp-graph-tab-rate"
            className={`px-2 py-0.5 rounded-md transition ${
              graphMode === 'rate' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            1/Masa vs Suhu
          </button>
          <button
            type="button"
            onClick={() => setGraphMode('time')}
            data-testid="temp-graph-tab-time"
            className={`px-2 py-0.5 rounded-md transition ${
              graphMode === 'time' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            Masa vs Suhu
          </button>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full h-auto bg-white rounded-lg border border-slate-200"
      >
        {/* Paksi X & Y umum */}
        <line x1={PAD_LEFT} y1={PAD_TOP - 6} x2={PAD_LEFT} y2={PAD_TOP + PLOT_H} stroke="#475569" strokeWidth="1.4" />
        <line
          x1={PAD_LEFT}
          y1={PAD_TOP + PLOT_H}
          x2={PAD_LEFT + PLOT_W + 4}
          y2={PAD_TOP + PLOT_H}
          stroke="#475569"
          strokeWidth="1.4"
        />

        {/* ================= MODE 1: LENGKUNG MASA NYATA KEKERUHAN SULFUR ================= */}
        {graphMode === 'turbidity' && (
          <g>
            {[0, 25, 50, 75, 100].map((pct) => {
              const y = yTurb(pct);
              return (
                <g key={`ty-${pct}`}>
                  <line
                    x1={PAD_LEFT}
                    y1={y}
                    x2={PAD_LEFT + PLOT_W}
                    y2={y}
                    stroke={pct === 100 ? '#ca8a04' : '#f1f5f9'}
                    strokeDasharray={pct === 100 ? '4 3' : undefined}
                    strokeWidth={pct === 100 ? '1.1' : '1'}
                  />
                  <text x={PAD_LEFT - 5} y={y + 3} fontSize="7.2" fill="#64748b" textAnchor="end">
                    {pct}
                  </text>
                </g>
              );
            })}

            <text x={PAD_LEFT + PLOT_W - 2} y={yTurb(100) - 17} fontSize="6.8" fill="#a16207" fontWeight="bold" textAnchor="end">
              Ambang 100% (Tanda &apos;✕&apos; hilang)
            </text>

            {[0, 10, 20, 30, 40, 50].map((t) => (
              <g key={`tx-${t}`}>
                <line x1={xTime(t)} y1={PAD_TOP} x2={xTime(t)} y2={PAD_TOP + PLOT_H} stroke="#f8fafc" strokeWidth="1" />
                <text x={xTime(t)} y={PAD_TOP + PLOT_H + 11} fontSize="7.2" fill="#64748b" textAnchor="middle">
                  {t}
                </text>
              </g>
            ))}

            <text
              x="12"
              y={PAD_TOP + PLOT_H / 2}
              fontSize="7.6"
              fontWeight="bold"
              fill="#334155"
              transform={`rotate(-90 12 ${PAD_TOP + PLOT_H / 2})`}
              textAnchor="middle"
            >
              Kekeruhan sulfur S (%)
            </text>
            <text x={PAD_LEFT + PLOT_W / 2} y={SVG_H - 4} fontSize="7.8" fontWeight="bold" fill="#334155" textAnchor="middle">
              Masa (saat)
            </text>

            {/* Lukis semua lengkung set suhu yang pernah dijalankan */}
            {TEMPERATURE_SETS.map((spec) => {
              const prog = progressBySet[spec.id];
              if (prog < 0) return null;
              const samples = buildTemperatureCurveSamples(prog, spec.id, 0.5);
              const d = samples
                .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xTime(p.time).toFixed(1)} ${yTurb(p.turbidity).toFixed(1)}`)
                .join(' ');
              const done = prog >= spec.timeHideCrossSec;
              return (
                <g key={`tcurve-${spec.id}`}>
                  {samples.length > 1 && (
                    <path
                      d={d}
                      fill="none"
                      stroke={spec.strokeHex}
                      strokeWidth={spec.id === activeSetId ? '2.4' : '1.9'}
                      strokeOpacity={spec.id === activeSetId ? 1 : 0.8}
                      strokeLinecap="round"
                    />
                  )}
                  {done && (
                    <g>
                      <line
                        x1={xTime(spec.timeHideCrossSec)}
                        y1={yTurb(100)}
                        x2={xTime(spec.timeHideCrossSec)}
                        y2={yTurb(0)}
                        stroke={spec.strokeHex}
                        strokeWidth="1"
                        strokeDasharray="2 2"
                        strokeOpacity="0.45"
                      />
                      <circle
                        cx={xTime(spec.timeHideCrossSec)}
                        cy={yTurb(100)}
                        r="3"
                        fill="#ffffff"
                        stroke={spec.strokeHex}
                        strokeWidth="1.8"
                      />
                      <text
                        x={xTime(spec.timeHideCrossSec) - (spec.id === 'V' ? 4 : 0)}
                        y={yTurb(100) + (spec.id === 'I' ? 12 : -7)}
                        fontSize="6.7"
                        fontWeight="bold"
                        fill={spec.strokeHex}
                        textAnchor={spec.id === 'V' ? 'end' : 'middle'}
                      >
                        {spec.tempC}°C
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Kursor hidup semasa tindak balas berlangsung */}
            {progressBySet[activeSetId] >= 0 && (isRunning || (timeSec > 0 && timeSec < activeSpec.timeHideCrossSec)) && (
              <g>
                <line
                  x1={xTime(timeSec)}
                  y1={yTurb(activeTurbidity)}
                  x2={xTime(timeSec)}
                  y2={yTurb(0)}
                  stroke={activeSpec.strokeHex}
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
                <circle cx={xTime(timeSec)} cy={yTurb(activeTurbidity)} r="5.5" fill={activeSpec.strokeHex} fillOpacity="0.22" />
                <circle cx={xTime(timeSec)} cy={yTurb(activeTurbidity)} r="3" fill={activeSpec.strokeHex} />
              </g>
            )}
          </g>
        )}

        {/* ================= MODE 2: GRAF 1/MASA MELAWAN SUHU (MENTAFSIR DATA 1) ================= */}
        {graphMode === 'rate' && (
          <g>
            {[0, 0.03, 0.06, 0.09, 0.12].map((val) => (
              <g key={`ry-${val}`}>
                <line x1={PAD_LEFT} y1={yRate(val)} x2={PAD_LEFT + PLOT_W} y2={yRate(val)} stroke="#f1f5f9" strokeWidth="1" />
                <text x={PAD_LEFT - 5} y={yRate(val) + 3} fontSize="7.2" fill="#64748b" textAnchor="end">
                  {val.toFixed(2)}
                </text>
              </g>
            ))}

            {[30, 35, 40, 45, 50, 55, 60].map((temp) => (
              <g key={`rx-${temp}`}>
                <line x1={xTemp(temp)} y1={PAD_TOP} x2={xTemp(temp)} y2={PAD_TOP + PLOT_H} stroke="#f8fafc" strokeWidth="1" />
                <text x={xTemp(temp)} y={PAD_TOP + PLOT_H + 11} fontSize="7" fill="#64748b" textAnchor="middle">
                  {temp}
                </text>
              </g>
            ))}

            <text
              x="12"
              y={PAD_TOP + PLOT_H / 2}
              fontSize="7.5"
              fontWeight="bold"
              fill="#334155"
              transform={`rotate(-90 12 ${PAD_TOP + PLOT_H / 2})`}
              textAnchor="middle"
            >
              Kadar, 1/masa (s⁻¹)
            </text>
            <text x={PAD_LEFT + PLOT_W / 2} y={SVG_H - 4} fontSize="7.6" fontWeight="bold" fill="#334155" textAnchor="middle">
              Suhu larutan Na₂S₂O₃ (°C)
            </text>

            {/* Lengkung meningkat eksponen apabila >= 2 set selesai */}
            {completedSets.length >= 2 && (
              <path
                d={rateGuidelinePath}
                fill="none"
                stroke="#4f46e5"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
            )}

            {completedSets.map((s) => (
              <g key={`r-pt-${s.id}`}>
                <line
                  x1={xTemp(s.tempC)}
                  y1={yRate(s.rateInverseTime)}
                  x2={xTemp(s.tempC)}
                  y2={yRate(0)}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
                <circle
                  cx={xTemp(s.tempC)}
                  cy={yRate(s.rateInverseTime)}
                  r="3.8"
                  fill={s.strokeHex}
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
                <text
                  x={xTemp(s.tempC) + (s.id === 'V' ? -8 : 7)}
                  y={yRate(s.rateInverseTime) + (s.id === 'V' ? -5 : 10)}
                  fontSize="6.5"
                  fontWeight="bold"
                  fill={s.strokeHex}
                  textAnchor={s.id === 'V' ? 'end' : 'start'}
                >
                  {s.rateInverseTime.toFixed(3)}
                </text>
              </g>
            ))}

            {completedSets.length < 2 && (
              <text x={PAD_LEFT + PLOT_W / 2} y={PAD_TOP + PLOT_H / 2} fontSize="8" fill="#94a3b8" textAnchor="middle">
                Jalankan sekurang-kurangnya 2 suhu berbeza untuk memplot graf 1/masa
              </text>
            )}
          </g>
        )}

        {/* ================= MODE 3: GRAF MASA MELAWAN SUHU ================= */}
        {graphMode === 'time' && (
          <g>
            {[0, 15, 30, 45].map((sec) => (
              <g key={`my-${sec}`}>
                <line x1={PAD_LEFT} y1={yMasa(sec)} x2={PAD_LEFT + PLOT_W} y2={yMasa(sec)} stroke="#f1f5f9" strokeWidth="1" />
                <text x={PAD_LEFT - 5} y={yMasa(sec) + 3} fontSize="7.2" fill="#64748b" textAnchor="end">
                  {sec}
                </text>
              </g>
            ))}

            {[30, 35, 40, 45, 50, 55, 60].map((temp) => (
              <g key={`mx-${temp}`}>
                <line x1={xTemp(temp)} y1={PAD_TOP} x2={xTemp(temp)} y2={PAD_TOP + PLOT_H} stroke="#f8fafc" strokeWidth="1" />
                <text x={xTemp(temp)} y={PAD_TOP + PLOT_H + 11} fontSize="7" fill="#64748b" textAnchor="middle">
                  {temp}
                </text>
              </g>
            ))}

            <text
              x="12"
              y={PAD_TOP + PLOT_H / 2}
              fontSize="7.5"
              fontWeight="bold"
              fill="#334155"
              transform={`rotate(-90 12 ${PAD_TOP + PLOT_H / 2})`}
              textAnchor="middle"
            >
              Masa tanda &apos;✕&apos; hilang (s)
            </text>
            <text x={PAD_LEFT + PLOT_W / 2} y={SVG_H - 4} fontSize="7.6" fontWeight="bold" fill="#334155" textAnchor="middle">
              Suhu larutan Na₂S₂O₃ (°C)
            </text>

            {completedSets.length >= 2 && (
              <path
                d={timeGuidelinePath}
                fill="none"
                stroke="#0284c7"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
            )}

            {completedSets.map((s) => (
              <g key={`m-pt-${s.id}`}>
                <circle
                  cx={xTemp(s.tempC)}
                  cy={yMasa(s.timeHideCrossSec)}
                  r="3.8"
                  fill={s.strokeHex}
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
                <text
                  x={xTemp(s.tempC) + (s.id === 'I' ? 6 : 6)}
                  y={yMasa(s.timeHideCrossSec) - 6}
                  fontSize="6.7"
                  fontWeight="bold"
                  fill={s.strokeHex}
                  textAnchor="start"
                >
                  {s.timeHideCrossSec}s
                </text>
              </g>
            ))}

            {completedSets.length < 2 && (
              <text x={PAD_LEFT + PLOT_W / 2} y={PAD_TOP + PLOT_H / 2} fontSize="8" fill="#94a3b8" textAnchor="middle">
                Jalankan sekurang-kurangnya 2 suhu untuk melihat lengkung penurunan masa
              </text>
            )}
          </g>
        )}
      </svg>

      {/* Rumusan graf di bawah carta */}
      <div className="flex items-center justify-between gap-2 text-[10.5px] text-slate-600 leading-tight px-0.5">
        <span>
          {graphMode === 'turbidity' && 'Suhu lebih tinggi mencapai kekeruhan 100% dalam masa yang jauh lebih singkat.'}
          {graphMode === 'rate' && 'Lengkung 1/masa meningkat dengan suhu (~2× kadar bagi setiap +10 °C).'}
          {graphMode === 'time' && 'Semakin tinggi suhu larutan, semakin singkat masa tanda \'✕\' tidak kelihatan.'}
        </span>
        <span className="font-mono font-bold text-slate-800 shrink-0">
          {activeSpec.label}: t={activeSpec.timeHideCrossSec}s
        </span>
      </div>
    </div>
  );
};
