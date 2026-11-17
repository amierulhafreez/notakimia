import React from 'react';
import { MARBLE_SETS, MarbleSizeId } from '../data/rateOfReactionSize';

interface RateSizeApparatusSVGProps {
  selectedSize: MarbleSizeId;
  timeSec: number;
  currentGas: number;
  currentBuretteReading: number;
  instantRate: number;
  isRunning: boolean;
  isReactionFinished: boolean;
  animFrame: number;
}

const SMALL_CHIPS: Array<{ cx: number; cy: number; rx: number; ry: number; rot: number }> = [
  { cx: 82, cy: 218, rx: 3.8, ry: 2.6, rot: -15 },
  { cx: 91, cy: 220, rx: 3.4, ry: 2.4, rot: 20 },
  { cx: 99, cy: 217, rx: 3.6, ry: 2.5, rot: -8 },
  { cx: 108, cy: 221, rx: 3.5, ry: 2.4, rot: 12 },
  { cx: 117, cy: 218, rx: 3.7, ry: 2.5, rot: -22 },
  { cx: 126, cy: 220, rx: 3.4, ry: 2.4, rot: 16 },
  { cx: 135, cy: 219, rx: 3.2, ry: 2.3, rot: -10 },
  { cx: 87, cy: 223, rx: 3.3, ry: 2.2, rot: 8 },
  { cx: 96, cy: 223, rx: 3.4, ry: 2.2, rot: -18 },
  { cx: 104, cy: 223, rx: 3.5, ry: 2.1, rot: 5 },
  { cx: 113, cy: 223, rx: 3.4, ry: 2.2, rot: -12 },
  { cx: 122, cy: 223, rx: 3.6, ry: 2.2, rot: 14 },
  { cx: 131, cy: 223, rx: 3.2, ry: 2.1, rot: -6 },
];

export const RateSizeApparatusSVG: React.FC<RateSizeApparatusSVGProps> = ({
  selectedSize,
  timeSec,
  currentGas,
  currentBuretteReading,
  instantRate,
  isRunning,
  isReactionFinished,
  animFrame,
}) => {
  const activeSet = MARBLE_SETS[selectedSize];
  const bubblingActive = isRunning && !isReactionFinished && instantRate > 0.01;

  // Amplitud goncangan perlahan kelalang kon & ketumpatan gelembung mengikut kadar seketika
  const swirlOffset = bubblingActive ? Math.sin(animFrame * 0.45) * 1.8 : 0;
  const flaskTiltDeg = bubblingActive ? Math.sin(animFrame * 0.35) * 1.1 : 0;

  // Paras air dalam buret terbalik: 50.00 cm³ berada pada y = 44 (atas), 0.00 cm³ pada y = 184 (bawah)
  const gasFraction = Math.min(1, Math.max(0, currentGas / 50.0));
  const waterTopY = 44 + gasFraction * 140;
  const gasHeight = Math.max(0, waterTopY - 28);
  const waterHeight = Math.max(0, 202 - waterTopY);

  // Bilangan dan kelajuan gelembung bergantung pada kadar tindak balas seketika
  const bubbleCount = bubblingActive ? Math.max(2, Math.min(9, Math.round(instantRate * 8.5))) : 0;
  const tubeBubbleCount = bubblingActive ? Math.max(1, Math.min(5, Math.round(instantRate * 4.5))) : 0;

  return (
    <svg viewBox="0 0 460 250" className="w-full h-auto select-none">
      {/* Garis asas meja makmal */}
      <line x1="16" y1="228" x2="448" y2="228" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* ================= KAKI RETORT & PENGAPIT ================= */}
      <g>
        {/* Tapak & rod menegak kaki retort */}
        <rect x="394" y="222" width="52" height="6" rx="2" fill="#475569" />
        <rect x="422" y="16" width="6" height="208" rx="1.5" fill="#64748b" />
        {/* Kepala bosshead & batang pengapit (antara skala 40 dan 30) */}
        <rect x="417" y="79" width="14" height="11" rx="2" fill="#334155" />
        <rect x="326" y="82" width="92" height="5" rx="1.5" fill="#475569" />
        {/* Rahang pengapit memeluk buret pada x = 312, y = 84.5 */}
        <path
          d="M 300 80 L 325 80 Q 328 84.5 325 89 L 300 89"
          fill="none"
          stroke="#334155"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </g>

      {/* ================= BESEN BERISI AIR ================= */}
      <g>
        {/* Air dalam besen */}
        <path
          d="M 241 186 L 248 226 L 362 226 L 369 186 Z"
          fill="#bae6fd"
          fillOpacity="0.62"
        />
        <line x1="241" y1="186" x2="369" y2="186" stroke="#0284c7" strokeWidth="1.4" />
        {/* Dinding kaca besen */}
        <path
          d="M 238 174 L 247 228 L 363 228 L 372 174"
          fill="none"
          stroke="#334155"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <line x1="368" y1="180" x2="380" y2="177" stroke="#475569" strokeWidth="1" />
        <text x="383" y="180" fontSize="8.5" fill="#334155" fontWeight="bold">
          Besen
        </text>
        <line x1="364" y1="204" x2="380" y2="204" stroke="#0369a1" strokeWidth="1" />
        <text x="383" y="207" fontSize="8.5" fill="#0369a1" fontWeight="bold">
          Air
        </text>
      </g>

      {/* ================= BURET DITELANGKUPKAN (50.00 -> 0.00 cm³) ================= */}
      <g>
        {/* Pili & muncung tirus buret di bahagian ATAS (tertutup) */}
        <path d="M 309 12 L 315 12 L 317 28 L 307 28 Z" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.6" />
        <rect x="301" y="18" width="22" height="4" rx="1.5" fill="#0369a1" />

        {/* Badan silinder buret (mulut bawah terbuka terendam pada y = 202) */}
        <path
          d="M 302 202 L 302 28 L 322 28 L 322 202"
          fill="#ffffff"
          fillOpacity="0.65"
          stroke="#0284c7"
          strokeWidth="1.9"
        />

        {/* Ruang gas CO₂ terkumpul di bahagian atas */}
        <rect
          x="303.2"
          y="29"
          width="17.6"
          height={Math.max(0, gasHeight)}
          fill={activeSet.id === 'large' ? '#e2e8f0' : '#ffe4e6'}
          fillOpacity="0.55"
        />

        {/* Turus air di dalam buret */}
        <rect
          x="303.2"
          y={waterTopY}
          width="17.6"
          height={waterHeight}
          fill="#38bdf8"
          fillOpacity="0.58"
        />

        {/* Aras meniskus air + penunjuk merah */}
        <path
          d={`M 303 ${waterTopY + 1.5} Q 312 ${waterTopY - 2.5} 321 ${waterTopY + 1.5}`}
          fill="none"
          stroke="#0369a1"
          strokeWidth="1.4"
        />
        <line x1="299" y1={waterTopY} x2="325" y2={waterTopY} stroke="#dc2626" strokeWidth="1.6" />

        {/* Skala senggatan buret terbalik: 50 di atas -> 10 di bawah */}
        {[
          { label: '50', y: 44 },
          { label: '40', y: 72 },
          { label: '30', y: 100 },
          { label: '20', y: 128 },
          { label: '10', y: 156 },
        ].map((tick) => (
          <g key={tick.label}>
            <line x1="302" y1={tick.y} x2="308" y2={tick.y} stroke="#334155" strokeWidth="1" />
            <text x="299" y={tick.y + 3} fontSize="6.8" fill="#475569" fontFamily="monospace" textAnchor="end">
              {tick.label}
            </text>
          </g>
        ))}

        {/* Gelembung gas CO₂ naik dari hujung salur ke atas buret */}
        {Array.from({ length: tubeBubbleCount }).map((_, idx) => {
          const span = Math.max(12, 198 - waterTopY);
          const prog = ((animFrame * 6 + idx * 31) % span) / span;
          const by = 198 - prog * (span - 4);
          const bx = 312 + Math.sin(animFrame * 0.4 + idx * 2) * 3.2;
          return (
            <circle
              key={`tb-${idx}`}
              cx={bx}
              cy={by}
              r={selectedSize === 'small' ? 2.4 : 2.1}
              fill="#ffffff"
              stroke={activeSet.strokeHex}
              strokeWidth="1.1"
            />
          );
        })}

        {/* Label buku teks: Gas karbon dioksida, CO₂ & Buret */}
        <line x1="322" y1="38" x2="338" y2="38" stroke="#475569" strokeWidth="1" />
        <text x="341" y="35" fontSize="8" fill="#334155" fontWeight="bold">
          Gas karbon
        </text>
        <text x="341" y="45" fontSize="8" fill="#334155" fontWeight="bold">
          dioksida, CO₂
        </text>

        <line x1="322" y1="142" x2="338" y2="142" stroke="#475569" strokeWidth="1" />
        <text x="341" y="145" fontSize="8.5" fill="#334155" fontWeight="bold">
          Buret
        </text>
      </g>

      {/* ================= KELALANG KON + ASID HCl + KETULAN CaCO₃ ================= */}
      <g transform={`rotate(${flaskTiltDeg} 112 224)`}>
        {/* Badan Kelalang Kon */}
        <path
          d="M 100 104 L 100 132 L 58 218 Q 55 228 66 228 L 158 228 Q 169 228 166 218 L 124 132 L 124 104"
          fill="#f8fafc"
          stroke="#334155"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />

        {/* Asid hidroklorik, HCl 0.1 mol dm⁻³ */}
        <path
          d={`M 77 178 Q 112 ${178 + swirlOffset} 147 178 L 165 218 Q 167 226 158 226 L 66 226 Q 57 226 59 218 Z`}
          fill="#bae6fd"
          fillOpacity="0.65"
        />
        <path
          d={`M 77 178 Q 112 ${178 + swirlOffset} 147 178`}
          fill="none"
          stroke="#0284c7"
          strokeWidth="1.2"
        />

        {/* Ketulan marmar, CaCO₃ (Set I: ketulan besar; Set II: ketulan kecil) */}
        {selectedSize === 'large' ? (
          <g>
            <polygon points="84,217 95,210 105,218 98,225 85,224" fill="#e2e8f0" stroke="#475569" strokeWidth="1.2" />
            <polygon points="107,214 121,210 127,221 114,225 106,222" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2" />
            <polygon points="124,218 136,213 142,223 130,225" fill="#e2e8f0" stroke="#475569" strokeWidth="1.2" />
          </g>
        ) : (
          <g>
            {SMALL_CHIPS.map((c, idx) => (
              <ellipse
                key={idx}
                cx={c.cx}
                cy={c.cy}
                rx={c.rx}
                ry={c.ry}
                transform={`rotate(${c.rot} ${c.cx} ${c.cy})`}
                fill="#e2e8f0"
                stroke="#475569"
                strokeWidth="0.9"
              />
            ))}
          </g>
        )}

        {/* Pembuakan gas CO₂ di dalam kelalang kon */}
        {Array.from({ length: bubbleCount }).map((_, idx) => {
          const offset = (animFrame * (selectedSize === 'small' ? 3.5 : 2.1) + idx * 9) % 34;
          const cx = 84 + ((idx * 17) % 54) + Math.sin(animFrame * 0.5 + idx) * 2;
          const cy = 216 - offset;
          return (
            <circle
              key={`fb-${idx}`}
              cx={cx}
              cy={cy}
              r={1.7 + (idx % 2) * 0.7}
              fill="#ffffff"
              stroke={activeSet.strokeHex}
              strokeWidth="0.9"
            />
          );
        })}

        {/* Penyumbat Getah */}
        <path
          d="M 97 95 L 127 95 L 124 111 L 100 111 Z"
          fill="#dc2626"
          fillOpacity="0.88"
          stroke="#991b1b"
          strokeWidth="1.2"
        />
      </g>

      {/* ================= SALUR PENGHANTAR (TEPAT RAJAH 7.12) ================= */}
      <g>
        <path
          d="M 112 95 L 112 68 Q 112 58 122 58 L 204 58 Q 213 58 217 67 L 268 206 Q 271 214 280 214 L 306 214 Q 312 214 312 206 L 312 198"
          fill="none"
          stroke="#475569"
          strokeWidth="4.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 112 95 L 112 68 Q 112 58 122 58 L 204 58 Q 213 58 217 67 L 268 206 Q 271 214 280 214 L 306 214 Q 312 214 312 206 L 312 198"
          fill="none"
          stroke="#e0f2fe"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="164" y="48" fontSize="8.5" fill="#334155" fontWeight="bold" textAnchor="middle">
          Salur penghantar
        </text>
      </g>

      {/* ================= LABEL BUKU TEKS SEBELAH KIRI & BAWAH ================= */}
      <line x1="76" y1="142" x2="96" y2="146" stroke="#475569" strokeWidth="1" />
      <text x="73" y="141" fontSize="8" fill="#334155" fontWeight="bold" textAnchor="end">
        Kelalang
      </text>
      <text x="73" y="150" fontSize="8" fill="#334155" fontWeight="bold" textAnchor="end">
        kon
      </text>

      <line x1="68" y1="186" x2="86" y2="192" stroke="#0369a1" strokeWidth="1" />
      <text x="64" y="172" fontSize="7.8" fill="#334155" fontWeight="bold" textAnchor="end">
        Asid
      </text>
      <text x="64" y="182" fontSize="7.8" fill="#334155" fontWeight="bold" textAnchor="end">
        hidroklorik,
      </text>
      <text x="64" y="192" fontSize="7.8" fill="#0369a1" fontWeight="bold" textAnchor="end">
        HCl 0.1 M
      </text>

      <text x="112" y="242" fontSize="8.5" fill="#334155" fontWeight="bold" textAnchor="middle">
        5.0 g {selectedSize === 'large' ? 'Ketulan marmar besar' : 'Ketulan marmar kecil'}, CaCO₃
      </text>

      {/* Lencana aras buret masa nyata (di sudut atas kiri tanpa bertindih) */}
      <g transform="translate(12, 10)">
        <rect width="118" height="30" rx="7" fill="#ffffff" fillOpacity="0.95" stroke="#e2e8f0" strokeWidth="1.2" />
        <text x="9" y="12" fontSize="6.8" fill="#64748b" fontWeight="bold">
          ARAS BURET (t = {timeSec}s)
        </text>
        <text x="9" y="24" fontSize="9.5" fill={activeSet.strokeHex} fontFamily="monospace" fontWeight="bold">
          {currentBuretteReading.toFixed(2)} cm³
        </text>
      </g>
    </svg>
  );
};
