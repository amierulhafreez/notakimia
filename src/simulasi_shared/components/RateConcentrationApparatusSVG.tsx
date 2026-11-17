import React from 'react';
import {
  ConcentrationSetSpec,
  evaluateSulfurTurbidity,
} from '../data/rateOfReactionConcentration';

interface RateConcentrationApparatusSVGProps {
  activeSet: ConcentrationSetSpec;
  timeSec: number;
  isRunning: boolean;
  animFrame: number;
}

const SULFUR_SPECKS = [
  { cx: 356, cy: 92, r: 1.6 },
  { cx: 392, cy: 88, r: 1.4 },
  { cx: 368, cy: 118, r: 1.8 },
  { cx: 396, cy: 122, r: 1.5 },
  { cx: 348, cy: 114, r: 1.4 },
  { cx: 380, cy: 96, r: 1.7 },
  { cx: 364, cy: 104, r: 1.5 },
  { cx: 386, cy: 112, r: 1.6 },
  { cx: 374, cy: 128, r: 1.3 },
  { cx: 358, cy: 82, r: 1.3 },
];

export const RateConcentrationApparatusSVG: React.FC<RateConcentrationApparatusSVGProps> = ({
  activeSet,
  timeSec,
  isRunning,
  animFrame,
}) => {
  const turbidity = evaluateSulfurTurbidity(timeSec, activeSet.id); // 0..100
  const isCrossHidden = turbidity >= 99.9;
  const sulfurOpacity = Math.min(0.985, 0.03 + (turbidity / 100) * 0.955);
  const swirlDeg = isRunning && !isCrossHidden ? Math.sin(animFrame * 0.45) * 1.4 : 0;

  return (
    <svg viewBox="0 0 460 230" className="w-full h-auto select-none">
      {/* Garis meja makmal */}
      <line x1="12" y1="212" x2="294" y2="212" stroke="#cbd5e1" strokeWidth="1.4" />

      {/* Lencana Kepekatan M₂ aktif (sudut atas kiri) */}
      <g transform="translate(10, 10)">
        <rect width="100" height="28" rx="7" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.2" />
        <text x="8" y="12" fontSize="6.8" fill="#64748b" fontWeight="bold">
          KEPEKATAN M₂ ({activeSet.label})
        </text>
        <text
          x="8"
          y="23"
          fontSize="9.2"
          fill={activeSet.strokeHex}
          fontFamily="monospace"
          fontWeight="bold"
        >
          {activeSet.dilutedMolarityM2.toFixed(2)} mol dm⁻³
        </text>
      </g>

      {/* ================= RAJAH 7.14: SUSUNAN RADAS EKSPERIMEN 7.2 ================= */}
      <g>
        {/* Mata memerhati secara menegak dari atas mulut kelalang kon */}
        <g transform="translate(140, 26)">
          <path d="M -14 0 Q 0 -10 14 0 Q 0 10 -14 0 Z" fill="#ffffff" stroke="#334155" strokeWidth="1.6" />
          <circle cx="0" cy="0" r="3.8" fill="#1e293b" />
          <circle cx="1.2" cy="-1.2" r="1.1" fill="#ffffff" />
          <text x="19" y="3" fontSize="7.5" fill="#475569" fontWeight="bold">
            Pandangan mata
          </text>
        </g>
        <line
          x1="140"
          y1="36"
          x2="140"
          y2="64"
          stroke="#64748b"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />

        {/* Kertas putih dengan tanda '✕' di tengah */}
        <polygon
          points="46,208 82,166 232,166 196,208"
          fill="#ffffff"
          stroke="#64748b"
          strokeWidth="1.6"
        />

        {/* Tanda '✕' di atas kertas putih tepat di bawah dasar kelalang kon */}
        <g stroke="#0f172a" strokeWidth="2.4" strokeLinecap="round" opacity={isCrossHidden ? 0.04 : 1}>
          <line x1="133" y1="183" x2="147" y2="195" />
          <line x1="147" y1="183" x2="133" y2="195" />
        </g>

        {/* Kelalang kon 150 cm³ + Campuran 50.0 cm³ */}
        <g transform={`rotate(${swirlDeg} 140 190)`}>
          {/* Cecair asas lutsinar 50.0 cm³ */}
          <path
            d="M 111 142 Q 140 146 169 142 L 187 184 Q 189 195 178 195 L 102 195 Q 91 195 93 184 Z"
            fill="#e0f2fe"
            fillOpacity="0.28"
          />

          {/* Lapisan mendakan kuning pucat sulfur S(p) yang semakin keruh mengaburkan tanda '✕' */}
          <path
            d="M 111 142 Q 140 146 169 142 L 187 184 Q 189 195 178 195 L 102 195 Q 91 195 93 184 Z"
            fill="#fef08a"
            fillOpacity={sulfurOpacity}
          />
          <path
            d="M 111 142 Q 140 146 169 142"
            fill="none"
            stroke={turbidity > 15 ? '#ca8a04' : '#0284c7'}
            strokeWidth="1.2"
          />

          {/* Rangka kaca kelalang kon 150 cm³ */}
          <path
            d="M 128 66 L 128 96 L 92 184 Q 89 195 102 195 L 178 195 Q 191 195 188 184 L 152 96 L 152 66"
            fill="none"
            stroke="#334155"
            strokeWidth="2.3"
            strokeLinejoin="round"
          />
          <ellipse cx="140" cy="66" rx="13" ry="3.2" fill="#f8fafc" stroke="#334155" strokeWidth="1.8" />
        </g>

        {/* Anak panah pusaran perlahan (Prosedur 4) */}
        {isRunning && !isCrossHidden && (
          <g>
            <path d="M 86 156 A 14 14 0 0 1 92 136" fill="none" stroke="#d97706" strokeWidth="1.6" />
            <path d="M 194 136 A 14 14 0 0 1 200 156" fill="none" stroke="#d97706" strokeWidth="1.6" />
          </g>
        )}

        {/* Label buku teks Rajah 7.14 */}
        <line x1="60" y1="186" x2="128" y2="189" stroke="#334155" strokeWidth="1" />
        <text x="56" y="189" fontSize="8.5" fill="#1e293b" fontWeight="bold" textAnchor="end">
          Tanda ✕
        </text>

        <line x1="176" y1="199" x2="188" y2="215" stroke="#475569" strokeWidth="1" />
        <text x="191" y="220" fontSize="8.5" fill="#334155" fontWeight="bold">
          Kertas putih
        </text>

        <line x1="170" y1="158" x2="196" y2="128" stroke="#475569" strokeWidth="1" />
        <text x="200" y="116" fontSize="8" fill="#334155" fontWeight="bold">
          Natrium tiosulfat,
        </text>
        <text x="200" y="126" fontSize="8" fill="#334155" fontWeight="bold">
          Na₂S₂O₃ + Asid
        </text>
        <text x="200" y="136" fontSize="8" fill="#0369a1" fontWeight="bold">
          sulfurik, H₂SO₄
        </text>
      </g>

      {/* ================= PANDANGAN TEGAK DARI ATAS MULUT KELALANG ================= */}
      <g>
        <rect
          x="300"
          y="10"
          width="150"
          height="210"
          rx="12"
          fill="#f8fafc"
          stroke="#cbd5e1"
          strokeWidth="1.4"
        />
        <text x="375" y="27" fontSize="8.2" fill="#1e293b" fontWeight="800" textAnchor="middle">
          Pandangan Tegak Mata
        </text>
        <text x="375" y="38" fontSize="7.2" fill="#64748b" textAnchor="middle">
          (Dari atas mulut kelalang kon)
        </text>

        {/* Bulatan mulut kelalang kon & kertas putih */}
        <circle cx="375" cy="103" r="50" fill="#ffffff" stroke="#64748b" strokeWidth="2.4" />
        <circle cx="375" cy="103" r="45" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />

        {/* Tanda '✕' hitam pada dasar kelalang kon */}
        <g stroke="#0f172a" strokeWidth="4.2" strokeLinecap="round" opacity={isCrossHidden ? 0.03 : 1}>
          <line x1="358" y1="86" x2="392" y2="120" />
          <line x1="392" y1="86" x2="358" y2="120" />
        </g>

        {/* Kekeruhan mendakan kuning sulfur S(p) menutupi tanda '✕' */}
        <circle
          cx="375"
          cy="103"
          r="46"
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
          x="312"
          y="164"
          width="126"
          height="22"
          rx="6"
          fill={isCrossHidden ? '#dcfce7' : turbidity > 40 ? '#fef3c7' : '#ffffff'}
          stroke={isCrossHidden ? '#16a34a' : turbidity > 40 ? '#d97706' : '#cbd5e1'}
          strokeWidth="1.1"
        />
        <text
          x="375"
          y="178"
          fontSize="7.8"
          fontWeight="bold"
          fill={isCrossHidden ? '#166534' : turbidity > 40 ? '#92400e' : '#334155'}
          textAnchor="middle"
        >
          {isCrossHidden
            ? `✓ Tanda '✕' Hilang (${activeSet.timeHideCrossSec.toFixed(0)} s)`
            : turbidity > 35
              ? `Semakin Keruh (${Math.round(turbidity)}%)`
              : "Tanda '✕' Jelas Kelihatan"}
        </text>

        <text x="375" y="201" fontSize="7" fill="#475569" fontWeight="600" textAnchor="middle">
          {activeSet.vThiosulphateCm3.toFixed(0)} cm³ Na₂S₂O₃ + {activeSet.vWaterCm3.toFixed(0)} cm³ Air + 5 cm³ H₂SO₄
        </text>
        <text x="375" y="212" fontSize="6.8" fill="#64748b" textAnchor="middle">
          Jumlah isi padu campuran = 50.0 cm³
        </text>
      </g>
    </svg>
  );
};
