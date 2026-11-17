import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import {
  CONCENTRATION_SETS,
  CONCENTRATION_SET_MAP,
  ConcentrationSetId,
  EXPERIMENT_72_CONSTANTS,
  buildTurbidityCurveSamples,
  evaluateSulfurTurbidity,
} from '../data/rateOfReactionConcentration';

export type ConcentrationGraphMode = 'turbidity' | 'rate' | 'time';

interface RateConcentrationLiveGraphProps {
  activeSetId: ConcentrationSetId;
  timeSec: number;
  isRunning: boolean;
  progressBySet: Record<ConcentrationSetId, number>; // -1 jika belum mula; >0 jika pernah jalan
}

const SVG_W = 320;
const SVG_H = 184;
const PAD_LEFT = 46;
const PAD_RIGHT = 14;
const PAD_TOP = 28;
const PAD_BOTTOM = 28;
const PLOT_W = SVG_W - PAD_LEFT - PAD_RIGHT;
const PLOT_H = SVG_H - PAD_TOP - PAD_BOTTOM;

export const RateConcentrationLiveGraph: React.FC<RateConcentrationLiveGraphProps> = ({
  activeSetId,
  timeSec,
  isRunning,
  progressBySet,
}) => {
  const [graphMode, setGraphMode] = useState<ConcentrationGraphMode>('turbidity');
  const activeSpec = CONCENTRATION_SET_MAP[activeSetId];
  const activeTurbidity = evaluateSulfurTurbidity(timeSec, activeSetId);

  const completedSets = CONCENTRATION_SETS.filter(
    (s) => progressBySet[s.id] >= s.timeHideCrossSec
  );

  // Skala Mode 1: Kekeruhan Sulfur (0..110%) vs Masa (0..75 s)
  const xTime = (t: number) => PAD_LEFT + (t / EXPERIMENT_72_CONSTANTS.maxGraphTimeSec) * PLOT_W;
  const yTurb = (p: number) => PAD_TOP + PLOT_H - (p / 110) * PLOT_H;

  // Skala Mode 2 & 3: X = Kepekatan M₂ (0.00..0.20 mol dm⁻³)
  const xConc = (m2: number) => PAD_LEFT + (m2 / 0.2) * PLOT_W;
  const yRate = (r: number) => PAD_TOP + PLOT_H - (r / 0.07) * PLOT_H;
  const yMasa = (s: number) => PAD_TOP + PLOT_H - (s / 80) * PLOT_H;

  // Lengkung licin hiperbola teoretikal untuk Mode 3 (t = 2.88 / M₂) apabila >= 2 set selesai
  const buildInverseCurvePath = () => {
    const pts: string[] = [];
    for (let m = 0.04; m <= 0.181; m += 0.005) {
      const t = 2.88 / m;
      pts.push(`${pts.length === 0 ? 'M' : 'L'} ${xConc(m).toFixed(1)} ${yMasa(t).toFixed(1)}`);
    }
    return pts.join(' ');
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-1.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800">
          <TrendingUp className="w-4 h-4 text-amber-600" />
          Graf Eksperimen 7.2
        </span>

        <div className="inline-flex rounded-lg bg-slate-200/80 p-0.5 text-[10px] font-bold">
          <button
            type="button"
            onClick={() => setGraphMode('turbidity')}
            data-testid="graph-tab-turbidity"
            className={`px-2 py-0.5 rounded-md transition ${
              graphMode === 'turbidity' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            Lengkung Masa Nyata
          </button>
          <button
            type="button"
            onClick={() => setGraphMode('rate')}
            data-testid="graph-tab-rate"
            className={`px-2 py-0.5 rounded-md transition ${
              graphMode === 'rate' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            1/Masa vs M₂
          </button>
          <button
            type="button"
            onClick={() => setGraphMode('time')}
            data-testid="graph-tab-time"
            className={`px-2 py-0.5 rounded-md transition ${
              graphMode === 'time' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            Masa vs M₂
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

            {[0, 15, 30, 45, 60, 75].map((t) => (
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

            {/* Lukis semua lengkung set yang pernah dijalankan */}
            {CONCENTRATION_SETS.map((spec) => {
              const prog = progressBySet[spec.id];
              if (prog < 0) return null;
              const samples = buildTurbidityCurveSamples(prog, spec.id, 1);
              const d = samples
                .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xTime(p.time).toFixed(1)} ${yTurb(p.turbidity).toFixed(1)}`)
                .join(' ');
              const done = prog >= spec.timeHideCrossSec;
              return (
                <g key={`curve-${spec.id}`}>
                  {samples.length > 1 && (
                    <path
                      d={d}
                      fill="none"
                      stroke={spec.strokeHex}
                      strokeWidth={spec.id === activeSetId ? '2.4' : '1.9'}
                      strokeOpacity={spec.id === activeSetId ? 1 : 0.78}
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
                        x={xTime(spec.timeHideCrossSec)}
                        y={yTurb(100) + (spec.id === 'II' || spec.id === 'V' ? 12 : -7)}
                        fontSize="6.8"
                        fontWeight="bold"
                        fill={spec.strokeHex}
                        textAnchor="middle"
                      >
                        {spec.id}
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

        {/* ================= MODE 2: GRAF 1/MASA MELAWAN KEPEKATAN (JADUAL 7.6) ================= */}
        {graphMode === 'rate' && (
          <g>
            {[0, 0.02, 0.04, 0.06].map((val) => (
              <g key={`ry-${val}`}>
                <line x1={PAD_LEFT} y1={yRate(val)} x2={PAD_LEFT + PLOT_W} y2={yRate(val)} stroke="#f1f5f9" strokeWidth="1" />
                <text x={PAD_LEFT - 5} y={yRate(val) + 3} fontSize="7.2" fill="#64748b" textAnchor="end">
                  {val.toFixed(2)}
                </text>
              </g>
            ))}

            {[0, 0.04, 0.08, 0.12, 0.16, 0.20].map((m2) => (
              <g key={`rx-${m2}`}>
                <line x1={xConc(m2)} y1={PAD_TOP} x2={xConc(m2)} y2={PAD_TOP + PLOT_H} stroke="#f8fafc" strokeWidth="1" />
                <text x={xConc(m2)} y={PAD_TOP + PLOT_H + 11} fontSize="7" fill="#64748b" textAnchor="middle">
                  {m2.toFixed(2)}
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
              Kepekatan Na₂S₂O₃, M₂ (mol dm⁻³)
            </text>

            {/* Garis lurus berkadar langsung melalui asalan apabila >= 2 set selesai */}
            {completedSets.length >= 2 && (
              <line
                x1={xConc(0)}
                y1={yRate(0)}
                x2={xConc(0.19)}
                y2={yRate((1 / 16.0 / 0.18) * 0.19)}
                stroke="#4f46e5"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
            )}

            {completedSets.map((spec) => (
              <g key={`r-pt-${spec.id}`}>
                <circle
                  cx={xConc(spec.dilutedMolarityM2)}
                  cy={yRate(spec.rateInverseTime)}
                  r="3.8"
                  fill={spec.strokeHex}
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
                <text
                  x={xConc(spec.dilutedMolarityM2)}
                  y={yRate(spec.rateInverseTime) - 6}
                  fontSize="7"
                  fontWeight="bold"
                  fill={spec.strokeHex}
                  textAnchor="middle"
                >
                  {spec.id}
                </text>
              </g>
            ))}

            {completedSets.length === 0 && (
              <text x={PAD_LEFT + PLOT_W / 2} y={PAD_TOP + PLOT_H / 2} fontSize="8" fill="#94a3b8" textAnchor="middle">
                Jalankan eksperimen untuk memplot 1/masa vs M₂
              </text>
            )}
          </g>
        )}

        {/* ================= MODE 3: GRAF MASA MELAWAN KEPEKATAN ================= */}
        {graphMode === 'time' && (
          <g>
            {[0, 20, 40, 60, 80].map((s) => (
              <g key={`my-${s}`}>
                <line x1={PAD_LEFT} y1={yMasa(s)} x2={PAD_LEFT + PLOT_W} y2={yMasa(s)} stroke="#f1f5f9" strokeWidth="1" />
                <text x={PAD_LEFT - 5} y={yMasa(s) + 3} fontSize="7.2" fill="#64748b" textAnchor="end">
                  {s}
                </text>
              </g>
            ))}

            {[0, 0.04, 0.08, 0.12, 0.16, 0.20].map((m2) => (
              <g key={`mx-${m2}`}>
                <line x1={xConc(m2)} y1={PAD_TOP} x2={xConc(m2)} y2={PAD_TOP + PLOT_H} stroke="#f8fafc" strokeWidth="1" />
                <text x={xConc(m2)} y={PAD_TOP + PLOT_H + 11} fontSize="7" fill="#64748b" textAnchor="middle">
                  {m2.toFixed(2)}
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
              Masa diambil (s)
            </text>
            <text x={PAD_LEFT + PLOT_W / 2} y={SVG_H - 4} fontSize="7.6" fontWeight="bold" fill="#334155" textAnchor="middle">
              Kepekatan Na₂S₂O₃, M₂ (mol dm⁻³)
            </text>

            {completedSets.length >= 2 && (
              <path d={buildInverseCurvePath()} fill="none" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 2" />
            )}

            {completedSets.map((spec) => (
              <g key={`m-pt-${spec.id}`}>
                <circle
                  cx={xConc(spec.dilutedMolarityM2)}
                  cy={yMasa(spec.timeHideCrossSec)}
                  r="3.8"
                  fill={spec.strokeHex}
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
                <text
                  x={xConc(spec.dilutedMolarityM2)}
                  y={spec.id === 'I' ? yMasa(spec.timeHideCrossSec) + 12 : yMasa(spec.timeHideCrossSec) - 6}
                  fontSize="7"
                  fontWeight="bold"
                  fill={spec.strokeHex}
                  textAnchor="middle"
                >
                  {spec.id} ({spec.timeHideCrossSec}s)
                </text>
              </g>
            ))}

            {isRunning && (
              <g>
                <circle
                  cx={xConc(activeSpec.dilutedMolarityM2)}
                  cy={yMasa(timeSec)}
                  r="4.2"
                  fill={activeSpec.strokeHex}
                  fillOpacity="0.3"
                />
                <circle cx={xConc(activeSpec.dilutedMolarityM2)} cy={yMasa(timeSec)} r="2.5" fill={activeSpec.strokeHex} />
              </g>
            )}
          </g>
        )}
      </svg>

      <div className="flex items-center justify-between text-[10px] text-slate-500">
        <span>
          {graphMode === 'turbidity'
            ? 'Kepekatan lebih tinggi mencapai kekeruhan 100% dalam masa lebih singkat.'
            : graphMode === 'rate'
              ? 'Garis lurus melalui asalan: Kadar tindak balas (1/masa) ∝ Kepekatan M₂.'
              : 'Lengkung menurun: Semakin tinggi kepekatan, semakin singkat masa tindak balas.'}
        </span>
        {progressBySet[activeSetId] >= 0 && (
          <span className="font-mono font-semibold text-slate-700 shrink-0">
            {activeSpec.label}: t={timeSec.toFixed(1)}s
          </span>
        )}
      </div>
    </div>
  );
};
