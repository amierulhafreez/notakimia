import React from 'react';
import {
  TemperatureSetSpec,
  evaluateTemperatureTurbidity,
} from '../data/rateOfReactionTemperature';

export type TempExperimentPhase = 'idle' | 'heating' | 'running' | 'done';

interface RateTemperatureApparatusSVGProps {
  activeSet: TemperatureSetSpec;
  phase: TempExperimentPhase;
  displayTempC: number;
  timeSec: number;
  animFrame: number;
}

const SULFUR_SPECKS = [
  { cx: 374, cy: 90, r: 1.6 },
  { cx: 410, cy: 86, r: 1.4 },
  { cx: 386, cy: 116, r: 1.8 },
  { cx: 414, cy: 120, r: 1.5 },
  { cx: 366, cy: 112, r: 1.4 },
  { cx: 398, cy: 94, r: 1.7 },
  { cx: 382, cy: 102, r: 1.5 },
  { cx: 404, cy: 110, r: 1.6 },
  { cx: 392, cy: 126, r: 1.3 },
  { cx: 376, cy: 80, r: 1.3 },
];

export const RateTemperatureApparatusSVG: React.FC<RateTemperatureApparatusSVGProps> = ({
  activeSet,
  phase,
  displayTempC,
  timeSec,
  animFrame,
}) => {
  const isHeating = phase === 'heating';
  const turbidity = evaluateTemperatureTurbidity(timeSec, activeSet.id); // 0..100
  const isCrossHidden = turbidity >= 99.9;
  const sulfurOpacity = Math.min(0.985, 0.03 + (turbidity / 100) * 0.955);
  const swirlDeg = phase === 'running' && !isCrossHidden ? Math.sin(animFrame * 0.45) * 1.4 : 0;
  const flamePulse = isHeating ? 1 + Math.sin(animFrame * 0.8) * 0.1 : 1;

  // Tinggi merkuri termometer dinormalisasi antara 20 °C .. 65 °C
  const mercuryRatio = Math.max(0.14, Math.min(1, (displayTempC - 20) / 45));
  const thermSideHeight = mercuryRatio * 74;

  // Gelombang haba halus jika larutan dipanaskan (>= 40 °C)
  const isWarm = activeSet.tempC >= 40;
  const waveShift = (animFrame % 12) * 0.4;

  return (
    <svg viewBox="0 0 470 234" className="w-full h-auto select-none">
      {/* Garis meja makmal */}
      <line x1="8" y1="210" x2="314" y2="210" stroke="#cbd5e1" strokeWidth="1.4" />

      {/* Lencana Suhu aktif (sudut atas kiri) */}
      <g transform="translate(8, 8)">
        <rect width="108" height="28" rx="7" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.2" />
        <text x="8" y="11.5" fontSize="6.4" fill="#64748b" fontWeight="bold">
          SUHU LARUTAN ({activeSet.label})
        </text>
        <text
          x="8"
          y="23"
          fontSize="9.2"
          fill={activeSet.strokeHex}
          fontFamily="monospace"
          fontWeight="bold"
        >
          {Math.round(displayTempC)} °C{' '}
          <tspan fontSize="6.4" fill="#64748b" fontWeight="600">
            {activeSet.isRoomTemp ? '(bilik)' : isHeating ? `→ ${activeSet.tempC}°C` : '(dipanaskan)'}
          </tspan>
        </text>
      </g>

      {/* ================= KIRI: RADAS PEMANASAN (TUNGKU KAKI TIGA, KASA DAWAI, PENUNU BUNSEN) ================= */}
      <g>
        {/* Tiub gas ke penunu Bunsen */}
        <path d="M 8 206 Q 24 206 35 205" fill="none" stroke="#475569" strokeWidth="2.3" strokeLinecap="round" />

        {/* Penunu Bunsen */}
        <rect x="34" y="203" width="24" height="6" rx="1.5" fill="#475569" />
        <rect x="40" y="198" width="12" height="5" rx="1" fill="#64748b" />
        <rect x="43" y="168" width="6" height="30" fill="#94a3b8" stroke="#475569" strokeWidth="1" />

        {/* Nyalaan biru Penunu Bunsen apabila memanaskan larutan */}
        {isHeating && (
          <g transform={`translate(46, 168) scale(1, ${flamePulse})`}>
            <path d="M -6 0 Q -7 -11 0 -22 Q 7 -11 6 0 Z" fill="#3b82f6" fillOpacity="0.82" />
            <path d="M -3 0 Q -3 -7 0 -13 Q 3 -7 3 0 Z" fill="#bfdbfe" />
          </g>
        )}

        {/* Tungku kaki tiga */}
        <line x1="21" y1="146" x2="71" y2="146" stroke="#334155" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="24" y1="147" x2="14" y2="210" stroke="#334155" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="68" y1="147" x2="78" y2="210" stroke="#334155" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="46" y1="147" x2="46" y2="203" stroke="#64748b" strokeWidth="1.4" strokeOpacity="0.45" />

        {/* Kasa dawai di atas tungku kaki tiga */}
        <rect x="17" y="142" width="58" height="4" rx="1" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2" />
        {[22, 28, 34, 40, 46, 52, 58, 64, 70].map((gx) => (
          <line key={gx} x1={gx} y1="142" x2={gx} y2="146" stroke="#475569" strokeWidth="0.7" />
        ))}

        {/* Label radas pemanasan */}
        <text x="48" y="219" fontSize="6.6" fill="#475569" fontWeight="bold" textAnchor="middle">
          Tungku kaki tiga
        </text>
        <text x="48" y="228" fontSize="6.6" fill="#64748b" fontWeight="600" textAnchor="middle">
          &amp; Penunu Bunsen
        </text>

        {/* Apabila tidak memanaskan, label kasa dawai */}
        {!isHeating && (
          <g>
            <line x1="46" y1="141" x2="46" y2="127" stroke="#64748b" strokeWidth="0.9" />
            <text x="46" y="114" fontSize="6.8" fill="#334155" fontWeight="bold" textAnchor="middle">
              Kasa dawai
            </text>
            <text x="46" y="123" fontSize="6" fill="#64748b" textAnchor="middle">
              {activeSet.isRoomTemp ? '(suhu bilik)' : '(sedia memanas)'}
            </text>
          </g>
        )}

        {/* Kelalang kon + Termometer di atas kasa dawai SEMASA fasa pemanasan */}
        {isHeating && (
          <g>
            {/* Cecair Na₂S₂O₃ sedang dipanaskan */}
            <path
              d="M 30 118 Q 46 120 62 118 L 68 138 Q 69 141 64 141 L 28 141 Q 23 141 24 138 Z"
              fill="#bae6fd"
              fillOpacity="0.65"
            />
            <path d="M 24 138 L 68 138 L 64 141 L 28 141 Z" fill="#fb923c" fillOpacity="0.25" />

            {/* Kelalang kon 150 cm³ versi pemanasan */}
            <path
              d="M 40 76 L 40 92 L 23 137 Q 22 141 27 141 L 65 141 Q 70 141 69 137 L 52 92 L 52 76"
              fill="none"
              stroke="#334155"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <ellipse cx="46" cy="76" rx="6.5" ry="2" fill="#f8fafc" stroke="#334155" strokeWidth="1.5" />

            {/* Termometer dicelup terus ke dalam kelalang kon */}
            <rect x="44" y="45" width="4" height="84" rx="2" fill="#ffffff" stroke="#475569" strokeWidth="1" />
            <circle cx="46" cy="131" r="3.2" fill="#ef4444" stroke="#991b1b" strokeWidth="0.7" />
            <rect x="45.1" y={130 - mercuryRatio * 68} width="1.8" height={mercuryRatio * 68} fill="#ef4444" />
            <text x="55" y="55" fontSize="6.8" fill="#b91c1c" fontWeight="bold">
              Termometer ({Math.round(displayTempC)}°C)
            </text>
          </g>
        )}
      </g>

      {/* ================= TERMOMETER SISI (PAPAR SUHU SEBENAR) ================= */}
      {!isHeating && (
        <g>
          <rect x="105" y="72" width="6" height="106" rx="3" fill="#ffffff" stroke="#475569" strokeWidth="1.2" />
          {[0, 1, 2, 3, 4].map((tick) => {
            const ty = 86 + tick * 18;
            return <line key={tick} x1="111" y1={ty} x2="114" y2={ty} stroke="#64748b" strokeWidth="0.9" />;
          })}
          <circle cx="108" cy="182" r="5" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
          <rect x="106.5" y={179 - thermSideHeight} width="3" height={thermSideHeight} rx="1" fill="#ef4444" />
          <text x="108" y="64" fontSize="6.7" fill="#334155" fontWeight="bold" textAnchor="middle">
            Termometer
          </text>
          <text
            x="108"
            y="198"
            fontSize="7.3"
            fill={activeSet.strokeHex}
            fontFamily="monospace"
            fontWeight="bold"
            textAnchor="middle"
          >
            {activeSet.tempC}°C
          </text>
        </g>
      )}

      {/* ================= TENGAH: KELALANG KON ATAS KERTAS PUTIH BERTANDA '✕' ================= */}
      <g>
        {/* Mata memerhati secara menegak dari atas mulut kelalang kon */}
        <g transform="translate(222, 25)" opacity={isHeating ? 0.35 : 1}>
          <path d="M -13 0 Q 0 -9 13 0 Q 0 9 -13 0 Z" fill="#ffffff" stroke="#334155" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="3.6" fill="#1e293b" />
          <circle cx="1.1" cy="-1.1" r="1" fill="#ffffff" />
          <text x="17" y="3" fontSize="7.2" fill="#475569" fontWeight="bold">
            Pandangan mata
          </text>
        </g>
        <line
          x1="222"
          y1="34"
          x2="222"
          y2="62"
          stroke="#64748b"
          strokeWidth="1.1"
          strokeDasharray="3 3"
          opacity={isHeating ? 0.3 : 1}
        />

        {/* Kertas putih dengan tanda '✕' di tengah */}
        <polygon
          points="146,206 176,166 304,166 274,206"
          fill="#ffffff"
          stroke="#64748b"
          strokeWidth="1.6"
        />

        {/* Tanda '✕' di atas kertas putih */}
        <g stroke="#0f172a" strokeWidth="2.4" strokeLinecap="round" opacity={isCrossHidden ? 0.04 : 1}>
          <line x1="215" y1="181" x2="229" y2="193" />
          <line x1="229" y1="181" x2="215" y2="193" />
        </g>

        {/* Pemindahan selepas pemanasan atau kelalang kon aktif di atas '✕' */}
        {isHeating ? (
          <g>
            <path
              d="M 84 112 Q 140 98 192 122"
              fill="none"
              stroke="#d97706"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <polygon points="190,118 197,124 188,125" fill="#d97706" />
            <rect x="112" y="88" width="92" height="16" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="0.9" />
            <text x="158" y="99" fontSize="6.6" fill="#92400e" fontWeight="bold" textAnchor="middle">
              Pindah selepas {activeSet.tempC} °C
            </text>
          </g>
        ) : (
          <g transform={`rotate(${swirlDeg} 222 188)`}>
            {/* Cecair asas 55.0 cm³ */}
            <path
              d="M 195 140 Q 222 144 249 140 L 265 182 Q 267 193 256 193 L 188 193 Q 177 193 179 182 Z"
              fill="#e0f2fe"
              fillOpacity="0.28"
            />

            {/* Mendakan kuning pucat sulfur S(p) */}
            <path
              d="M 195 140 Q 222 144 249 140 L 265 182 Q 267 193 256 193 L 188 193 Q 177 193 179 182 Z"
              fill="#fef08a"
              fillOpacity={sulfurOpacity}
            />
            <path
              d="M 195 140 Q 222 144 249 140"
              fill="none"
              stroke={turbidity > 15 ? '#ca8a04' : '#0284c7'}
              strokeWidth="1.2"
            />

            {/* Gelombang haba halus jika suhu >= 40 °C */}
            {isWarm && (
              <g stroke="#f97316" strokeWidth="0.9" strokeOpacity="0.45" fill="none">
                <path d={`M 206 ${136 - waveShift} Q 203 ${131 - waveShift} 207 ${126 - waveShift}`} />
                <path d={`M 238 ${136 - waveShift} Q 241 ${131 - waveShift} 237 ${126 - waveShift}`} />
              </g>
            )}

            {/* Rangka kaca kelalang kon 150 cm³ */}
            <path
              d="M 211 64 L 211 94 L 177 182 Q 174 193 187 193 L 257 193 Q 270 193 267 182 L 233 94 L 233 64"
              fill="none"
              stroke="#334155"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <ellipse cx="222" cy="64" rx="12" ry="3" fill="#f8fafc" stroke="#334155" strokeWidth="1.7" />
          </g>
        )}

        {/* Anak panah pusaran perlahan */}
        {phase === 'running' && !isCrossHidden && (
          <g>
            <path d="M 170 154 A 13 13 0 0 1 176 135" fill="none" stroke="#d97706" strokeWidth="1.5" />
            <path d="M 268 135 A 13 13 0 0 1 274 154" fill="none" stroke="#d97706" strokeWidth="1.5" />
          </g>
        )}

        {/* Label buku teks bersih tanpa bertindih */}
        <line x1="215" y1="191" x2="188" y2="215" stroke="#334155" strokeWidth="1" />
        <text x="184" y="222" fontSize="7.2" fill="#1e293b" fontWeight="bold" textAnchor="middle">
          Tanda ✕
        </text>

        <line x1="262" y1="199" x2="270" y2="215" stroke="#475569" strokeWidth="1" />
        <text x="273" y="222" fontSize="7.2" fill="#334155" fontWeight="bold">
          Kertas putih
        </text>

        {!isHeating && (
          <g>
            <line x1="248" y1="142" x2="262" y2="112" stroke="#475569" strokeWidth="0.9" />
            <text x="264" y="102" fontSize="6.8" fill="#334155" fontWeight="bold">
              Na₂S₂O₃ 0.2 M
            </text>
            <text x="264" y="112" fontSize="6.8" fill="#0369a1" fontWeight="bold">
              + H₂SO₄ 1.0 M
            </text>
          </g>
        )}
      </g>

      {/* ================= KANAN: PANDANGAN TEGAK DARI ATAS MULUT KELALANG ================= */}
      <g>
        <rect
          x="320"
          y="8"
          width="142"
          height="214"
          rx="12"
          fill="#f8fafc"
          stroke="#cbd5e1"
          strokeWidth="1.4"
        />
        <text x="391" y="25" fontSize="8" fill="#1e293b" fontWeight="800" textAnchor="middle">
          Pandangan Tegak Mata
        </text>
        <text x="391" y="36" fontSize="6.9" fill="#64748b" textAnchor="middle">
          (Dari atas mulut kelalang kon)
        </text>

        {/* Bulatan mulut kelalang kon & kertas putih */}
        <circle cx="391" cy="100" r="48" fill="#ffffff" stroke="#64748b" strokeWidth="2.3" />
        <circle cx="391" cy="100" r="43" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />

        {/* Tanda '✕' hitam pada dasar kelalang kon */}
        <g stroke="#0f172a" strokeWidth="4" strokeLinecap="round" opacity={isCrossHidden ? 0.03 : 1}>
          <line x1="374" y1="83" x2="408" y2="117" />
          <line x1="408" y1="83" x2="374" y2="117" />
        </g>

        {/* Kekeruhan mendakan kuning sulfur S(p) menutupi tanda '✕' */}
        <circle
          cx="391"
          cy="100"
          r="44"
          fill="#fef08a"
          fillOpacity={Math.min(0.99, sulfurOpacity)}
        />
        {turbidity > 15 &&
          SULFUR_SPECKS.map((sp, idx) => (
            <circle
              key={idx}
              cx={sp.cx}
              cy={sp.cy}
              r={sp.r}
              fill="#eab308"
              fillOpacity={Math.min(0.7, (turbidity / 100) * 0.65)}
            />
          ))}

        {/* Status keterlihatan tanda '✕' */}
        <rect
          x="330"
          y="160"
          width="122"
          height="22"
          rx="6"
          fill={isHeating ? '#fef3c7' : isCrossHidden ? '#dcfce7' : turbidity > 40 ? '#fef3c7' : '#ffffff'}
          stroke={isHeating ? '#f59e0b' : isCrossHidden ? '#16a34a' : turbidity > 40 ? '#d97706' : '#cbd5e1'}
          strokeWidth="1.1"
        />
        <text
          x="391"
          y="174"
          fontSize="7.4"
          fontWeight="bold"
          fill={isHeating ? '#92400e' : isCrossHidden ? '#166534' : turbidity > 40 ? '#92400e' : '#334155'}
          textAnchor="middle"
        >
          {isHeating
            ? `Memanas ke ${activeSet.tempC} °C...`
            : isCrossHidden
              ? `✓ Tanda '✕' Hilang (${activeSet.timeHideCrossSec} s)`
              : turbidity > 35
                ? `Semakin Keruh (${Math.round(turbidity)}%)`
                : "Tanda '✕' Jelas Kelihatan"}
        </text>

        <text x="391" y="198" fontSize="6.1" fill="#475569" fontWeight="600" textAnchor="middle">
          50 cm³ Na₂S₂O₃ 0.2 M + 5 cm³ H₂SO₄ 1.0 M
        </text>
        <text x="391" y="210" fontSize="6.5" fill="#64748b" textAnchor="middle">
          Suhu dilaraskan = {activeSet.tempC} °C
        </text>
      </g>
    </svg>
  );
};
