import React, { useState } from 'react';
import { TrendingUp, Compass } from 'lucide-react';
import {
  CATALYST_CHECKPOINTS,
  CATALYST_SETS,
  CATALYST_SET_MAP,
  CatalystSetId,
  EXPERIMENT_74_CONSTANTS,
  buildOxygenCurveSamples,
  evaluateOxygenVolume,
} from '../data/rateOfReactionCatalyst';

interface RateCatalystLiveGraphProps {
  activeCatalystId: CatalystSetId;
  timeSec: number;
  isRunning: boolean;
  progressBySet: Record<CatalystSetId, number>; // -1 jika belum dimulakan
}

const SVG_W = 320;
const SVG_H = 172;
const PAD_LEFT = 44;
const PAD_RIGHT = 14;
const PAD_TOP = 24;
const PAD_BOTTOM = 26;
const PLOT_W = SVG_W - PAD_LEFT - PAD_RIGHT;
const PLOT_H = SVG_H - PAD_TOP - PAD_BOTTOM;

export const RateCatalystLiveGraph: React.FC<RateCatalystLiveGraphProps> = ({
  activeCatalystId,
  timeSec,
  isRunning,
  progressBySet,
}) => {
  const [showInitialTangents, setShowInitialTangents] = useState<boolean>(false);

  const activeSpec = CATALYST_SET_MAP[activeCatalystId];
  const activeVol = evaluateOxygenVolume(timeSec, activeCatalystId);

  const xTime = (t: number) => PAD_LEFT + (t / 62) * PLOT_W;
  const yVol = (v: number) => PAD_TOP + PLOT_H - (v / 112) * PLOT_H;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-1.5">
      <div className="flex flex-wrap items-center justify-between gap-1.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          Graf Masa Nyata: Isi Padu Gas O₂ vs Masa
        </span>

        <button
          type="button"
          onClick={() => setShowInitialTangents((v) => !v)}
          data-testid="cat-toggle-tangent-btn"
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border transition ${
            showInitialTangents
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-indigo-50 hover:text-indigo-700'
          }`}
        >
          <Compass className="w-3 h-3" />
          Tangen Awal (t=0)
        </button>
      </div>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full h-auto bg-white rounded-lg border border-slate-200"
      >
        {/* Paksi Y & X */}
        <line x1={PAD_LEFT} y1={PAD_TOP - 6} x2={PAD_LEFT} y2={PAD_TOP + PLOT_H} stroke="#475569" strokeWidth="1.4" />
        <line
          x1={PAD_LEFT}
          y1={PAD_TOP + PLOT_H}
          x2={PAD_LEFT + PLOT_W + 4}
          y2={PAD_TOP + PLOT_H}
          stroke="#475569"
          strokeWidth="1.4"
        />

        {/* Grid Y: 0, 25, 50, 75, 100 */}
        {[0, 25, 50, 75, 100].map((v) => {
          const y = yVol(v);
          return (
            <g key={`vy-${v}`}>
              <line
                x1={PAD_LEFT}
                y1={y}
                x2={PAD_LEFT + PLOT_W}
                y2={y}
                stroke={v === 100 ? '#94a3b8' : '#f1f5f9'}
                strokeDasharray={v === 100 ? '4 3' : undefined}
                strokeWidth="1"
              />
              <text x={PAD_LEFT - 5} y={y + 3} fontSize="7" fill="#64748b" textAnchor="end">
                {v}
              </text>
            </g>
          );
        })}

        <text x={PAD_LEFT + PLOT_W - 2} y={yVol(100) - 6} fontSize="6.6" fill="#475569" fontWeight="bold" textAnchor="end">
          Had maksimum hasil (100 cm³ O₂)
        </text>

        {/* Grid X: 0, 10, 20, 30, 40, 50, 60 */}
        {[0, 10, 20, 30, 40, 50, 60].map((t) => (
          <g key={`vx-${t}`}>
            <line x1={xTime(t)} y1={PAD_TOP} x2={xTime(t)} y2={PAD_TOP + PLOT_H} stroke="#f8fafc" strokeWidth="1" />
            <text x={xTime(t)} y={PAD_TOP + PLOT_H + 10.5} fontSize="7" fill="#64748b" textAnchor="middle">
              {t}
            </text>
          </g>
        ))}

        {/* Tajuk Paksi */}
        <text
          x="12"
          y={PAD_TOP + PLOT_H / 2}
          fontSize="7.4"
          fontWeight="bold"
          fill="#334155"
          transform={`rotate(-90 12 ${PAD_TOP + PLOT_H / 2})`}
          textAnchor="middle"
        >
          Isi padu gas O₂ (cm³)
        </text>
        <text x={PAD_LEFT + PLOT_W / 2} y={SVG_H - 3.5} fontSize="7.5" fontWeight="bold" fill="#334155" textAnchor="middle">
          Masa (saat)
        </text>

        {/* Garis Tangen Awal (t = 0) menunjukkan kecerunan awal lebih curam dengan mangkin */}
        {showInitialTangents && (
          <g>
            {/* Tangen MnO₂ (paling curam: 7.4 cm³/s -> capai 100 cm³ pada t=13.5 s) */}
            <line
              x1={xTime(0)}
              y1={yVol(0)}
              x2={xTime(14)}
              y2={yVol(104)}
              stroke="#059669"
              strokeWidth="1.4"
              strokeDasharray="3 2"
            />
            {/* Tangen Fe (~4.2 cm³/s -> t=23.5 s) */}
            <line
              x1={xTime(0)}
              y1={yVol(0)}
              x2={xTime(24)}
              y2={yVol(100)}
              stroke="#d97706"
              strokeWidth="1.3"
              strokeDasharray="3 2"
            />
            {/* Tangen CuO (~1.5 cm³/s -> t=60 s, 90 cm³) */}
            <line
              x1={xTime(0)}
              y1={yVol(0)}
              x2={xTime(60)}
              y2={yVol(90)}
              stroke="#dc2626"
              strokeWidth="1.2"
              strokeDasharray="3 2"
            />
          </g>
        )}

        {/* Lengkung masa nyata bagi setiap keadaan yang pernah dijalankan */}
        {CATALYST_SETS.map((spec) => {
          const prog = progressBySet[spec.id];
          if (prog < 0) return null;
          const samples = buildOxygenCurveSamples(prog, spec.id, 1);
          const d = samples
            .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xTime(p.time).toFixed(1)} ${yVol(p.volume).toFixed(1)}`)
            .join(' ');
          const isComplete = prog >= EXPERIMENT_74_CONSTANTS.maxDurationSec;

          return (
            <g key={`curve-${spec.id}`}>
              {samples.length > 1 && (
                <path
                  d={d}
                  fill="none"
                  stroke={spec.strokeHex}
                  strokeWidth={spec.id === activeCatalystId ? '2.4' : '1.8'}
                  strokeOpacity={spec.id === activeCatalystId ? 1 : 0.8}
                  strokeLinecap="round"
                />
              )}

              {/* Titik bacaan Jadual 7.8 setiap 10 s */}
              {CATALYST_CHECKPOINTS.map((cp) => {
                if (prog < cp) return null;
                const val = evaluateOxygenVolume(cp, spec.id);
                return (
                  <circle
                    key={`pt-${spec.id}-${cp}`}
                    cx={xTime(cp)}
                    cy={yVol(val)}
                    r="2.3"
                    fill="#ffffff"
                    stroke={spec.strokeHex}
                    strokeWidth="1.4"
                  />
                );
              })}

              {/* Label hujung lengkung tanpa bertindih */}
              {isComplete && (
                <text
                  x={spec.id === 'mno2' ? xTime(49) : xTime(59)}
                  y={
                    spec.id === 'mno2'
                      ? yVol(100) + 10.5
                      : yVol(spec.volumeAtCheckpointsCm3[6]) - 6
                  }
                  fontSize="6.7"
                  fontWeight="bold"
                  fill={spec.strokeHex}
                  textAnchor={spec.id === 'mno2' ? 'middle' : 'end'}
                >
                  {spec.id === 'none' ? 'Tanpa mangkin' : spec.formula}
                </text>
              )}
            </g>
          );
        })}

        {/* Kursor hidup semasa tindak balas berlangsung */}
        {progressBySet[activeCatalystId] >= 0 && isRunning && (
          <g>
            <line
              x1={xTime(timeSec)}
              y1={yVol(activeVol)}
              x2={xTime(timeSec)}
              y2={yVol(0)}
              stroke={activeSpec.strokeHex}
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <circle cx={xTime(timeSec)} cy={yVol(activeVol)} r="5.5" fill={activeSpec.strokeHex} fillOpacity="0.22" />
            <circle cx={xTime(timeSec)} cy={yVol(activeVol)} r="3" fill={activeSpec.strokeHex} />
          </g>
        )}
      </svg>

      <div className="flex items-center justify-between gap-2 text-[10px] text-slate-600 px-0.5">
        <span>Kecerunan awal lengkung paling curam dengan MnO₂ → kadar paling tinggi.</span>
        <span className="font-mono font-bold text-slate-800 shrink-0">
          {activeSpec.id === 'none' ? 'Tanpa' : activeSpec.formula}: {activeVol.toFixed(1)} cm³
        </span>
      </div>
    </div>
  );
};
