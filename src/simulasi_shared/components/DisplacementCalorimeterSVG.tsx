import React from 'react';

export type DisplacementMetal = 'Mg' | 'Zn';

interface DisplacementCalorimeterSVGProps {
  metal: DisplacementMetal;
  /** 0=empty, 1=CuSO4 added, 2=thermometer inserted, 3=metal added, 4=lid+stirring (reacting), 5=done */
  step: number;
  currentTemp: number;
  maxTemp: number;
  reactionProgress: number; // 0..1
  isDragOver?: boolean;
}

export const DisplacementCalorimeterSVG: React.FC<DisplacementCalorimeterSVGProps> = ({
  metal,
  step,
  currentTemp,
  maxTemp,
  reactionProgress,
  isDragOver = false,
}) => {
  const hasSolution = step >= 1;
  const hasThermometer = step >= 2;
  const hasMetal = step >= 3;
  const hasLid = step >= 4;
  const isReacting = step === 4;
  const isDone = step >= 5;

  // Map temperature (20°C .. 55°C) to mercury column height inside thermometer stem
  const clampedTemp = Math.max(20, Math.min(55, currentTemp));
  const tempFraction = (clampedTemp - 20) / 35; // 0 .. 1
  const bulbCenterY = 186;
  const stemTopY = 26;
  const maxMercuryTopY = 40;
  const mercuryTopY = bulbCenterY - 12 - tempFraction * (bulbCenterY - 12 - maxMercuryTopY);

  // Solution color transitions smoothly from vibrant Cu2+ blue -> pale sky -> almost colorless
  const blueAlpha = hasSolution ? Math.max(0.08, 0.72 * (1 - reactionProgress * 0.88)) : 0;
  const solutionFill =
    reactionProgress > 0.85
      ? 'rgba(226, 232, 240, 0.35)'
      : `rgba(37, 99, 235, ${blueAlpha.toFixed(2)})`;

  const depositHeight = hasMetal ? Math.max(2, reactionProgress * 12) : 0;

  return (
    <svg viewBox="0 0 540 248" className="w-full h-auto max-h-[186px] select-none">
      <defs>
        <linearGradient id="cupWallGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="cuDepositGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c2d12" />
          <stop offset="50%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>

      {/* Lab Bench Surface */}
      <rect
        x="16"
        y="214"
        width="508"
        height="16"
        rx="6"
        fill={isDragOver ? '#e0e7ff' : '#f1f5f9'}
        stroke={isDragOver ? '#6366f1' : '#cbd5e1'}
        strokeWidth="1.2"
      />

      {/* Empty drop hint when step === 0 */}
      {step === 0 && (
        <g pointerEvents="none">
          <rect
            x="28"
            y="26"
            width="148"
            height="58"
            rx="10"
            fill="#f8fafc"
            stroke="#cbd5e1"
            strokeDasharray="4 3"
          />
          <text x="102" y="48" fontSize="10.5" fontWeight="800" fill="#334155" textAnchor="middle">
            Langkah 1:
          </text>
          <text x="102" y="63" fontSize="9.5" fontWeight="600" fill="#64748b" textAnchor="middle">
            Seret atau klik larutan CuSO₄
          </text>
          <text x="102" y="75" fontSize="9.5" fontWeight="600" fill="#64748b" textAnchor="middle">
            ke cawan polistirena
          </text>
        </g>
      )}

      {/* Pouring Flask/Cylinder accent at step === 1 */}
      {step === 1 && (
        <g transform="translate(115, 28)">
          <g transform="rotate(-32, 35, 35)">
            <rect x="18" y="8" width="26" height="58" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.6" />
            <rect x="20" y="34" width="22" height="30" rx="2" fill="#3b82f6" opacity="0.65" />
          </g>
          {/* Liquid stream into cup */}
          <path d="M 60 54 Q 95 72 118 116" fill="none" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
        </g>
      )}

      {/* Spatula & Metal Powder pouring at step === 3 */}
      {step === 3 && (
        <g transform="translate(298, 22)">
          <path
            d="M 88 12 L 26 30 Q 12 34 22 40 L 34 36 L 90 18 Z"
            fill="#cbd5e1"
            stroke="#475569"
            strokeWidth="1.4"
          />
          {/* Grey/silvery metal powder grains */}
          <g fill={metal === 'Mg' ? '#94a3b8' : '#64748b'}>
            <circle cx="14" cy="48" r="2.2" />
            <circle cx="20" cy="54" r="2" />
            <circle cx="10" cy="58" r="2.4" />
            <circle cx="17" cy="65" r="2.1" />
            <circle cx="23" cy="72" r="2.2" />
            <circle cx="13" cy="77" r="1.9" />
            <circle cx="19" cy="86" r="2.3" />
          </g>
          <line x1="88" y1="22" x2="120" y2="22" stroke="#475569" strokeWidth="1" />
          <text x="124" y="25" fontSize="10.5" fontWeight="800" fill="#1e293b">
            Serbuk logam ({metal})
          </text>
        </g>
      )}

      {/* Polystyrene Cup (Cawan Polistirena) */}
      <g>
        {/* Outer Cup Body (tapered slightly like textbook Rajah 3.9) */}
        <polygon
          points="196,92 344,92 332,214 208,214"
          fill="url(#cupWallGrad)"
          stroke="#64748b"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Cup Rim */}
        <rect x="190" y="86" width="160" height="8" rx="3" fill="#ffffff" stroke="#64748b" strokeWidth="1.8" />

        {/* Solution Inside Cup */}
        {hasSolution && (
          <g>
            <polygon
              points="204,132 336,132 329,211 211,211"
              fill={solutionFill}
              stroke="#3b82f6"
              strokeWidth="0.9"
              strokeOpacity="0.45"
            />
            {/* Liquid Surface Meniscus */}
            <ellipse cx="270" cy="132" rx="66" ry="4" fill={solutionFill} stroke="#60a5fa" strokeWidth="1" opacity="0.85" />
            {/* Dashed water lines like textbook */}
            <g stroke="#2563eb" strokeWidth="0.9" strokeDasharray="6 5" opacity="0.45">
              <line x1="216" y1="150" x2="324" y2="150" />
              <line x1="218" y1="168" x2="322" y2="168" />
              <line x1="220" y1="186" x2="320" y2="186" />
            </g>
          </g>
        )}

        {/* Metal powder settling / Brown Copper Deposit at Bottom */}
        {hasMetal && (
          <g>
            {depositHeight > 0 && (
              <path
                d={`M 212 211 L 328 211 L ${328 - 1} ${211 - depositHeight} Q 270 ${211 - depositHeight - 3} 213 ${211 - depositHeight} Z`}
                fill="url(#cuDepositGrad)"
              />
            )}
            {/* Unreacted excess metal specks (grey) */}
            <g fill="#64748b" opacity="0.85">
              <circle cx="242" cy="206" r="1.6" />
              <circle cx="256" cy="208" r="1.5" />
              <circle cx="288" cy="207" r="1.7" />
              <circle cx="301" cy="206" r="1.5" />
            </g>
          </g>
        )}

        {/* Lid (Penutup) placed on Step 4+ */}
        {hasLid && (
          <g>
            <rect x="186" y="79" width="168" height="9" rx="3" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />
            {/* Center hole rim */}
            <rect x="261" y="77" width="18" height="12" rx="2" fill="#475569" />
          </g>
        )}
      </g>

      {/* Thermometer (Step 2+) */}
      {hasThermometer && (
        <g>
          {/* Glass Tube */}
          <rect
            x="265"
            y={stemTopY}
            width="10"
            height={bulbCenterY - stemTopY}
            rx="5"
            fill="#f8fafc"
            stroke="#475569"
            strokeWidth="1.5"
          />
          {/* Graduation Ticks */}
          {Array.from({ length: 12 }, (_, idx) => {
            const ty = 42 + idx * 11;
            return (
              <line
                key={idx}
                x1="266"
                y1={ty}
                x2={idx % 2 === 0 ? '271' : '269'}
                y2={ty}
                stroke="#64748b"
                strokeWidth="0.9"
              />
            );
          })}
          {/* Red Mercury Column */}
          <rect
            x="268"
            y={mercuryTopY}
            width="4"
            height={bulbCenterY - mercuryTopY}
            fill="#dc2626"
            rx="1.5"
          />
          {/* Mercury Bulb */}
          <circle cx="270" cy={bulbCenterY} r="7" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
          {/* Thermometer Top Cap */}
          <circle cx="270" cy={stemTopY + 3} r="4.5" fill="#e2e8f0" stroke="#475569" strokeWidth="1.2" />

          {/* Textbook "Kacau" Stirring Arrows (Step 4) */}
          {isReacting && (
            <g>
              <path
                d="M 244 48 C 244 40 296 40 296 48 C 296 54 282 56 277 56"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <polygon points="274,56 281,52 281,60" fill="#ef4444" />
              <text x="270" y="21" fontSize="10.5" fontWeight="800" fill="#dc2626" textAnchor="middle">
                Kacau perlahan
              </text>
            </g>
          )}
        </g>
      )}

      {/* Exothermic Heat Wave Indicators when reacting / done */}
      {(isReacting || isDone) && (
        <g stroke="#f97316" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity={isReacting ? 0.9 : 0.45}>
          <path d="M 184 166 Q 178 156 184 146 Q 190 136 184 126" />
          <path d="M 356 166 Q 362 156 356 146 Q 350 136 356 126" />
        </g>
      )}

      {/* ================= CLEAN TEXTBOOK CALLOUT LABELS (Rajah 3.9) ================= */}
      {/* Label: Termometer */}
      {hasThermometer && (
        <g>
          <line x1="264" y1="62" x2="178" y2="62" stroke="#334155" strokeWidth="1.2" />
          <text x="174" y="66" fontSize="11" fontWeight="800" fill="#0f172a" textAnchor="end">
            Termometer
          </text>
        </g>
      )}

      {/* Label: Penutup */}
      {hasLid && (
        <g>
          <line x1="186" y1="84" x2="148" y2="84" stroke="#334155" strokeWidth="1.2" />
          <text x="144" y="88" fontSize="11" fontWeight="800" fill="#0f172a" textAnchor="end">
            Penutup
          </text>
        </g>
      )}

      {/* Label: Larutan CuSO4 / Hasil */}
      {hasSolution && (
        <g>
          <line x1="210" y1="162" x2="156" y2="162" stroke="#334155" strokeWidth="1.2" />
          <text x="152" y="158" fontSize="10.5" fontWeight="800" fill="#0f172a" textAnchor="end">
            {reactionProgress > 0.85 ? `Larutan ${metal}SO₄` : 'Larutan kuprum(II)'}
          </text>
          <text x="152" y="171" fontSize="10.5" fontWeight="800" fill="#0f172a" textAnchor="end">
            {reactionProgress > 0.85 ? '(tidak berwarna)' : 'sulfat, CuSO₄'}
          </text>
        </g>
      )}

      {/* Label: Cawan polistirena */}
      <g>
        <line x1="340" y1="138" x2="388" y2="138" stroke="#334155" strokeWidth="1.2" />
        <text x="392" y="142" fontSize="11" fontWeight="800" fill="#0f172a">
          Cawan polistirena
        </text>
      </g>

      {/* Label: Enapan kuprum, Cu */}
      {hasMetal && reactionProgress > 0.25 && (
        <g>
          <line x1="326" y1="205" x2="388" y2="205" stroke="#7c2d12" strokeWidth="1.2" />
          <text x="392" y="203" fontSize="11" fontWeight="800" fill="#7c2d12">
            Enapan kuprum, Cu
          </text>
          <text x="392" y="214" fontSize="9.5" fontWeight="600" fill="#9a3412">
            (pepejal perang)
          </text>
        </g>
      )}

      {/* Temperature Target Hint Badge on right side when done */}
      {isDone && (
        <g transform="translate(388, 68)">
          <rect x="0" y="0" width="142" height="44" rx="8" fill="#fef2f2" stroke="#fecaca" strokeWidth="1.2" />
          <text x="10" y="16" fontSize="9.5" fontWeight="800" fill="#991b1b">
            Suhu tertinggi (T₂):
          </text>
          <text x="10" y="33" fontSize="11.5" fontWeight="800" fill="#dc2626" fontFamily="ui-monospace, monospace">
            {maxTemp.toFixed(1)} °C (Eksotermik)
          </text>
        </g>
      )}

      {/* Bottom Figure Caption */}
      <text x="270" y="242" fontSize="10.5" fontWeight="700" fill="#475569" textAnchor="middle">
        Rajah 3.9 Susunan radas menentukan haba penyesaran kuprum, Cu ({metal === 'Mg' ? 'Set 1: Mg + CuSO₄' : 'Set 2: Zn + CuSO₄'})
      </text>
    </svg>
  );
};
