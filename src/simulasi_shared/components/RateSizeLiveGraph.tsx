import React, { useState } from 'react';
import { TrendingUp, Compass } from 'lucide-react';
import {
  CHECKPOINT_TIMES,
  EXPERIMENT_71_CONSTANTS,
  MARBLE_SETS,
  MarbleSizeId,
  buildSmoothCurveSamples,
  evaluateGasVolume,
} from '../data/rateOfReactionSize';

interface RateSizeLiveGraphProps {
  selectedSize: MarbleSizeId;
  timeSec: number;
  isRunning: boolean;
  progressBySize: Record<MarbleSizeId, number>; // Masa maksima yang telah dijalankan (-1 jika belum mula)
  checkpointsBySize: Record<MarbleSizeId, number[]>; // Masa 30s yang telah direkodkan
}

const PAD_LEFT = 42;
const PAD_RIGHT = 14;
const PAD_TOP = 26;
const PAD_BOTTOM = 28;
const SVG_W = 310;
const SVG_H = 182;
const PLOT_W = SVG_W - PAD_LEFT - PAD_RIGHT;
const PLOT_H = SVG_H - PAD_TOP - PAD_BOTTOM;

const xPos = (t: number) => PAD_LEFT + (t / EXPERIMENT_71_CONSTANTS.maxDurationSec) * PLOT_W;
const yPos = (v: number) => PAD_TOP + PLOT_H - (v / 50.0) * PLOT_H;

function buildSmoothPath(upToSec: number, size: MarbleSizeId): string {
  const samples = buildSmoothCurveSamples(upToSec, size, 3);
  if (samples.length === 0) return '';
  return samples
    .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${xPos(pt.time).toFixed(1)} ${yPos(pt.gas).toFixed(1)}`)
    .join(' ');
}

export const RateSizeLiveGraph: React.FC<RateSizeLiveGraphProps> = ({
  selectedSize,
  timeSec,
  isRunning,
  progressBySize,
  checkpointsBySize,
}) => {
  const [showTangents, setShowTangents] = useState<boolean>(false);

  const largeProgress = progressBySize.large;
  const smallProgress = progressBySize.small;
  const activeProgress = progressBySize[selectedSize];
  const activeGas = evaluateGasVolume(timeSec, selectedSize);

  // Kira segmen tangen tepat pada t = 0 hingga V = 45.0 cm³ untuk perbandingan kecerunan awal
  const tangentEndTime = (size: MarbleSizeId) => {
    const spec = MARBLE_SETS[size];
    return spec.completionTimeSec / spec.shapeExponent;
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-1.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800">
          <TrendingUp className="w-4 h-4 text-indigo-600" />
          Graf Masa Nyata: Isi Padu CO₂ vs Masa
        </span>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-[10px] font-semibold">
            <span className="inline-flex items-center gap-1 text-sky-700">
              <span className="w-3 h-0.5 bg-sky-600 inline-block rounded" /> Set I (Besar)
            </span>
            <span className="inline-flex items-center gap-1 text-rose-700">
              <span className="w-3 h-0.5 bg-rose-600 inline-block rounded" /> Set II (Kecil)
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowTangents((v) => !v)}
            data-testid="toggle-tangent-btn"
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border transition-colors ${
              showTangents
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-indigo-50 hover:text-indigo-700'
            }`}
            title="Tunjukkan kecerunan tangen awal pada t = 0 s & masa tamat"
          >
            <Compass className="w-3 h-3" />
            Tangen t=0
          </button>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full h-auto bg-white rounded-lg border border-slate-200"
      >
        {/* Garis grid mendatar & paksi Y */}
        {[0, 15, 30, 45].map((v) => {
          const y = yPos(v);
          return (
            <g key={`gy-${v}`}>
              <line
                x1={PAD_LEFT}
                y1={y}
                x2={PAD_LEFT + PLOT_W}
                y2={y}
                stroke={v === 45 ? '#cbd5e1' : '#f1f5f9'}
                strokeDasharray={v === 45 ? '4 3' : undefined}
                strokeWidth="1"
              />
              <text x={PAD_LEFT - 5} y={y + 3} fontSize="7.5" fill="#64748b" textAnchor="end">
                {v}
              </text>
            </g>
          );
        })}

        {/* Garis grid menegak & paksi X (setiap 60s berlabel, tick 30s) */}
        {CHECKPOINT_TIMES.map((t) => {
          const x = xPos(t);
          return (
            <g key={`gx-${t}`}>
              <line
                x1={x}
                y1={PAD_TOP}
                x2={x}
                y2={PAD_TOP + PLOT_H}
                stroke="#f8fafc"
                strokeWidth="1"
              />
              <line x1={x} y1={PAD_TOP + PLOT_H} x2={x} y2={PAD_TOP + PLOT_H + 3} stroke="#64748b" strokeWidth="1" />
              {t % 60 === 0 && (
                <text x={x} y={PAD_TOP + PLOT_H + 12} fontSize="7.5" fill="#64748b" textAnchor="middle">
                  {t}
                </text>
              )}
            </g>
          );
        })}

        {/* Label aras maksimum 45.0 cm³ */}
        <text x={PAD_LEFT + PLOT_W - 2} y={yPos(45) - 15} fontSize="7" fill="#64748b" textAnchor="end">
          V_maks = 45.0 cm³
        </text>

        {/* Paksi X & Y utama */}
        <line x1={PAD_LEFT} y1={PAD_TOP - 8} x2={PAD_LEFT} y2={PAD_TOP + PLOT_H} stroke="#475569" strokeWidth="1.4" />
        <line
          x1={PAD_LEFT}
          y1={PAD_TOP + PLOT_H}
          x2={PAD_LEFT + PLOT_W + 4}
          y2={PAD_TOP + PLOT_H}
          stroke="#475569"
          strokeWidth="1.4"
        />
        <text
          x="13"
          y={PAD_TOP + PLOT_H / 2}
          fontSize="8"
          fontWeight="bold"
          fill="#334155"
          transform={`rotate(-90 13 ${PAD_TOP + PLOT_H / 2})`}
          textAnchor="middle"
        >
          Isi padu gas CO₂ (cm³)
        </text>
        <text x={PAD_LEFT + PLOT_W / 2} y={SVG_H - 4} fontSize="8" fontWeight="bold" fill="#334155" textAnchor="middle">
          Masa (saat)
        </text>

        {/* Tangen pada t = 0 & garis tamat tindak balas jika diaktifkan */}
        {showTangents && (
          <g>
            {(['large', 'small'] as MarbleSizeId[]).map((sz) => {
              if (progressBySize[sz] < 0) return null;
              const spec = MARBLE_SETS[sz];
              const tTan = tangentEndTime(sz);
              const tDone = spec.completionTimeSec;
              return (
                <g key={`tan-${sz}`}>
                  <line
                    x1={xPos(0)}
                    y1={yPos(0)}
                    x2={xPos(tTan)}
                    y2={yPos(45)}
                    stroke={spec.strokeHex}
                    strokeWidth="1.3"
                    strokeDasharray="4 3"
                  />
                  <text
                    x={sz === 'small' ? xPos(tTan) - 2 : xPos(tTan) + 4}
                    y={yPos(45) - 6}
                    fontSize="6.8"
                    fontWeight="bold"
                    fill={spec.strokeHex}
                    textAnchor={sz === 'small' ? 'middle' : 'start'}
                  >
                    Tangen {spec.code}: {spec.initialRate} cm³/s
                  </text>
                  {progressBySize[sz] >= tDone && (
                    <line
                      x1={xPos(tDone)}
                      y1={yPos(45)}
                      x2={xPos(tDone)}
                      y2={yPos(0)}
                      stroke={spec.strokeHex}
                      strokeWidth="1"
                      strokeDasharray="2 2"
                      strokeOpacity="0.6"
                    />
                  )}
                </g>
              );
            })}
          </g>
        )}

        {/* Lengkung selanjar Set I (Ketulan Besar) & titik 30s */}
        {largeProgress >= 0 && (
          <g>
            {largeProgress > 0 && (
              <path
                d={buildSmoothPath(largeProgress, 'large')}
                fill="none"
                stroke={MARBLE_SETS.large.strokeHex}
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            )}
            {checkpointsBySize.large.map((t) => (
              <circle
                key={`dot-L-${t}`}
                cx={xPos(t)}
                cy={yPos(evaluateGasVolume(t, 'large'))}
                r="2.8"
                fill="#ffffff"
                stroke={MARBLE_SETS.large.strokeHex}
                strokeWidth="1.8"
              />
            ))}
          </g>
        )}

        {/* Lengkung selanjar Set II (Ketulan Kecil) & titik 30s */}
        {smallProgress >= 0 && (
          <g>
            {smallProgress > 0 && (
              <path
                d={buildSmoothPath(smallProgress, 'small')}
                fill="none"
                stroke={MARBLE_SETS.small.strokeHex}
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            )}
            {checkpointsBySize.small.map((t) => (
              <circle
                key={`dot-S-${t}`}
                cx={xPos(t)}
                cy={yPos(evaluateGasVolume(t, 'small'))}
                r="2.8"
                fill="#ffffff"
                stroke={MARBLE_SETS.small.strokeHex}
                strokeWidth="1.8"
              />
            ))}
          </g>
        )}

        {/* Kursor langsung semasa tindak balas sedang berlaku */}
        {activeProgress >= 0 && (isRunning || (timeSec > 0 && timeSec < 240)) && (
          <g>
            <line
              x1={xPos(timeSec)}
              y1={yPos(activeGas)}
              x2={xPos(timeSec)}
              y2={yPos(0)}
              stroke={MARBLE_SETS[selectedSize].strokeHex}
              strokeWidth="1"
              strokeDasharray="2 2"
              strokeOpacity="0.55"
            />
            <line
              x1={PAD_LEFT}
              y1={yPos(activeGas)}
              x2={xPos(timeSec)}
              y2={yPos(activeGas)}
              stroke={MARBLE_SETS[selectedSize].strokeHex}
              strokeWidth="1"
              strokeDasharray="2 2"
              strokeOpacity="0.55"
            />
            <circle
              cx={xPos(timeSec)}
              cy={yPos(activeGas)}
              r="5.5"
              fill={MARBLE_SETS[selectedSize].strokeHex}
              fillOpacity="0.22"
            />
            <circle
              cx={xPos(timeSec)}
              cy={yPos(activeGas)}
              r="3.2"
              fill={MARBLE_SETS[selectedSize].strokeHex}
            />
          </g>
        )}
      </svg>

      <div className="flex items-center justify-between text-[10px] text-slate-500">
        <span>
          Jalankan kedua-dua <strong>Set I</strong> & <strong>Set II</strong> untuk membandingkan lengkung pada paksi sama.
        </span>
        {activeProgress >= 0 && (
          <span className="font-mono font-semibold text-slate-700 shrink-0">
            t={timeSec}s | V={activeGas.toFixed(1)} cm³
          </span>
        )}
      </div>
    </div>
  );
};
