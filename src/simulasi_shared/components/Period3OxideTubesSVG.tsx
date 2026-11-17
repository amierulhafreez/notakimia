import React from 'react';

export type OxideNature = 'bes' | 'amfoterik' | 'asid';

export interface Period3OxideTubesSVGProps {
  oxideFormula: string;
  oxideName: string;
  physicalState: 'pepejal' | 'gas' | 'cecair';
  /** 'idle' = reagents only; 'added' = sample added, ready to heat/stir; 'heating' = warming & stirring animation; 'done' = final observation */
  stage: 'idle' | 'added' | 'heating' | 'done';
  /** Indicator colour in Tube 1 (Water + Universal Indicator) */
  waterIndicatorHex: string;
  waterIndicatorLabel: string;
  pHValueText: string;
  solubleInWater: 'larut' | 'separa' | 'tidak';
  reactsWithHNO3: boolean;
  reactsWithNaOH: boolean;
  hno3BadgeText: string;
  naohBadgeText: string;
}

export const Period3OxideTubesSVG: React.FC<Period3OxideTubesSVGProps> = ({
  oxideFormula,
  oxideName,
  physicalState,
  stage,
  waterIndicatorHex,
  waterIndicatorLabel,
  pHValueText,
  solubleInWater,
  reactsWithHNO3,
  reactsWithNaOH,
  hno3BadgeText,
  naohBadgeText,
}) => {
  const showSample = stage !== 'idle';
  const isAnimating = stage === 'heating';
  const showResult = stage === 'done';

  // Tube 1 liquid colour starts neutral green (#4ade80), transitions to oxide's pH indicator colour once added/done
  const tube1LiquidColor = showSample ? waterIndicatorHex : '#4ade80';

  // Solid residue at bottom of each tube
  const hasTube1Residue =
    showSample &&
    physicalState === 'pepejal' &&
    (solubleInWater === 'tidak' || solubleInWater === 'separa' || stage === 'added');

  const hasTube2Residue =
    showSample &&
    physicalState === 'pepejal' &&
    (!showResult || !reactsWithHNO3);

  const hasTube3Residue =
    showSample &&
    physicalState === 'pepejal' &&
    (!showResult || !reactsWithNaOH);

  return (
    <svg
      viewBox="0 0 640 222"
      className="w-full h-auto max-h-[190px] select-none mx-auto"
      role="img"
      aria-label={`Susunan radas ujian sifat kimia ${oxideName} (${oxideFormula})`}
    >
      <defs>
        <linearGradient id="p3GlassTube" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.45" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.45" />
        </linearGradient>
      </defs>

      {/* Lab bench baseline */}
      <line x1="12" y1="194" x2="628" y2="194" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* Section divider between Part A (Water + pH) and Part B (HNO3 & NaOH, Rajah 4.13) */}
      <line x1="238" y1="10" x2="238" y2="216" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="4 4" />
      <text x="122" y="13" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#64748b">
        BAHAGIAN A · AIR &amp; METER pH
      </text>
      <text x="438" y="13" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#64748b">
        BAHAGIAN B · RAJAH 4.13 (HNO₃ &amp; NaOH)
      </text>

      {/* ============================================================ */}
      {/* LEFT: METER pH + TUBE 1 (Air + Penunjuk Universal, cx = 166) */}
      {/* ============================================================ */}
      <g>
        {/* Compact Digital Meter pH on far left (x=10..78) */}
        <rect x="10" y="72" width="68" height="66" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1.2" />
        <text x="44" y="86" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#cbd5e1">
          Meter pH
        </text>
        <rect x="16" y="92" width="56" height="24" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
        <text
          x="44"
          y="108"
          textAnchor="middle"
          fontSize="10.5"
          fontWeight="800"
          fontFamily="monospace"
          fill={showSample ? '#38bdf8' : '#64748b'}
        >
          {showSample ? `pH ${pHValueText}` : 'pH 7.0'}
        </text>
        <text x="44" y="130" textAnchor="middle" fontSize="8" fontWeight="700" fill="#94a3b8">
          {showSample ? waterIndicatorLabel : 'Neutral'}
        </text>

        {/* pH electrode cable dipping into Tube 1 */}
        <path
          d="M 44 72 L 44 40 Q 44 33 54 33 L 154 33 Q 160 33 160 40 L 160 124"
          fill="none"
          stroke="#475569"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect x="157.5" y="114" width="5" height="16" rx="1.5" fill="#334155" />

        {/* Tube 1 title */}
        <text x="168" y="29" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#1e293b">
          1. Air + Penunjuk
        </text>

        {/* Tube 1 Liquid */}
        <path
          d="M 152 84 L 152 145 Q 152 159 168 159 Q 184 159 184 145 L 184 84 Z"
          fill={tube1LiquidColor}
          fillOpacity={showSample ? 0.8 : 0.65}
        />
        <ellipse cx="168" cy="84" rx="16" ry="2.2" fill={tube1LiquidColor} fillOpacity="0.9" />

        {/* Undissolved white powder or gas bubbles in Tube 1 */}
        {hasTube1Residue && (
          <path
            d={
              solubleInWater === 'separa' && showResult
                ? 'M 159 156 Q 168 151 177 156 Z'
                : 'M 156 156 Q 168 148 180 156 Z'
            }
            fill="#ffffff"
            stroke="#94a3b8"
            strokeWidth="0.9"
          />
        )}
        {showSample && physicalState === 'gas' && (
          <g fill="#ffffff" stroke="#64748b" strokeWidth="0.8">
            <circle cx="165" cy="138" r="2">
              <animate attributeName="cy" values="150;88" dur="1.1s" repeatCount="indefinite" />
            </circle>
            <circle cx="173" cy="122" r="2.2">
              <animate attributeName="cy" values="146;86" dur="0.95s" begin="0.4s" repeatCount="indefinite" />
            </circle>
          </g>
        )}

        {/* Tube 1 glass rim & outline */}
        <path
          d="M 151 42 L 151 145 Q 151 160 168 160 Q 185 160 185 145 L 185 42"
          fill="url(#p3GlassTube)"
          fillOpacity="0.25"
          stroke="#475569"
          strokeWidth="1.7"
        />
        <ellipse cx="168" cy="42" rx="18" ry="2.6" fill="none" stroke="#475569" strokeWidth="1.5" />

        {/* Pointer to Air suling cleanly between Meter pH (78) and Tube 1 (151) */}
        <text x="140" y="114" textAnchor="end" fontSize="8.2" fontWeight="700" fill="#475569">
          Air suling
        </text>
        <line x1="142" y1="111" x2="151" y2="111" stroke="#64748b" strokeWidth="0.9" strokeDasharray="3 2" />

        {/* Status badge under Tube 1 */}
        <rect
          x="104"
          y="198"
          width="124"
          height="19"
          rx="5"
          fill={showResult ? '#f1f5f9' : '#f8fafc'}
          stroke={showResult ? '#94a3b8' : '#cbd5e1'}
          strokeWidth="1"
        />
        <text x="166" y="210.5" textAnchor="middle" fontSize="8.8" fontWeight="800" fill="#1e293b">
          {showResult
            ? `${solubleInWater === 'larut' ? 'Larut' : solubleInWater === 'separa' ? 'Separa larut' : 'Tidak larut'} · pH ${pHValueText}`
            : showSample
            ? `Menguji (${oxideFormula})...`
            : 'Sedia (10.0 cm³ Air)'}
        </text>
      </g>

      {/* ============================================================ */}
      {/* CENTER: TUBE 2 (Asid Nitrik, HNO3 2.0 mol dm-3, cx = 344)    */}
      {/* ============================================================ */}
      <g>
        <text x="344" y="29" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#991b1b">
          2. Asid Nitrik (HNO₃)
        </text>

        {/* Glass Stirring Rod (Rod kaca) */}
        <g>
          <line
            x1="335"
            y1="33"
            x2="348"
            y2="148"
            stroke="#94a3b8"
            strokeWidth="3.2"
            strokeLinecap="round"
          >
            {isAnimating && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="-3 342 75;3 342 75;-3 342 75"
                dur="0.45s"
                repeatCount="indefinite"
              />
            )}
          </line>
          <text x="316" y="47" textAnchor="end" fontSize="8.5" fontWeight="700" fill="#475569">
            Rod kaca
          </text>
          <line x1="319" y1="44" x2="335" y2="44" stroke="#64748b" strokeWidth="0.9" strokeDasharray="3 2" />
        </g>

        {/* Liquid (HNO3 5.0 cm3) */}
        <path
          d="M 328 96 L 328 145 Q 328 159 344 159 Q 360 159 360 145 L 360 96 Z"
          fill="#fee2e2"
          fillOpacity="0.65"
        />
        <ellipse cx="344" cy="96" rx="16" ry="2.2" fill="#fecaca" fillOpacity="0.8" />

        {/* Oxide sample at bottom of HNO3 */}
        {hasTube2Residue && (
          <path
            d="M 332 156 Q 344 148 356 156 Z"
            fill="#ffffff"
            stroke="#94a3b8"
            strokeWidth="0.9"
          />
        )}
        {showSample && physicalState === 'gas' && (
          <g fill="#ffffff" stroke="#ef4444" strokeWidth="0.8">
            <circle cx="342" cy="136" r="1.9">
              <animate attributeName="cy" values="150;98" dur="1.0s" repeatCount="indefinite" />
            </circle>
          </g>
        )}

        {/* Tube 2 glass wall */}
        <path
          d="M 327 42 L 327 145 Q 327 160 344 160 Q 361 160 361 145 L 361 42"
          fill="url(#p3GlassTube)"
          fillOpacity="0.25"
          stroke="#475569"
          strokeWidth="1.7"
        />
        <ellipse cx="344" cy="42" rx="18" ry="2.6" fill="none" stroke="#475569" strokeWidth="1.5" />

        {/* Test tube holder collar + handle (Pemegang tabung uji) */}
        <rect x="325" y="60" width="38" height="6" rx="2" fill="#d97706" stroke="#78350f" strokeWidth="1" />
        <line x1="363" y1="63" x2="394" y2="63" stroke="#92400e" strokeWidth="3.2" strokeLinecap="round" />

        {/* Reagent & Oxide callouts cleanly to left of Tube 2 */}
        <text x="316" y="124" textAnchor="end" fontSize="8.5" fontWeight="700" fill="#475569">
          Asid nitrik,
        </text>
        <text x="316" y="134" textAnchor="end" fontSize="8.5" fontWeight="700" fill="#475569">
          HNO₃
        </text>
        <line x1="319" y1="126" x2="328" y2="126" stroke="#64748b" strokeWidth="0.9" strokeDasharray="3 2" />

        {/* Red heat arrow / animated flame under Tube 2 (Rajah 4.13) */}
        {isAnimating ? (
          <g>
            <path d="M 344 162 C 351 171, 350 184, 344 185 C 338 184, 337 171, 344 162 Z" fill="#fb923c" />
            <path d="M 344 169 C 347 174, 347 183, 344 184 C 341 183, 341 174, 344 169 Z" fill="#fef08a" />
            <text x="357" y="180" fontSize="8.5" fontWeight="800" fill="#dc2626">
              Panaskan
            </text>
          </g>
        ) : (
          <g opacity="0.72">
            <line x1="344" y1="184" x2="344" y2="169" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" />
            <polygon points="344,163 340,171 348,171" fill="#dc2626" />
            <text x="354" y="180" fontSize="8.5" fontWeight="700" fill="#dc2626">
              Panaskan
            </text>
          </g>
        )}

        {/* Status badge under Tube 2 */}
        <rect
          x="278"
          y="198"
          width="132"
          height="19"
          rx="5"
          fill={showResult ? (reactsWithHNO3 ? '#ecfdf5' : '#f1f5f9') : '#f8fafc'}
          stroke={showResult ? (reactsWithHNO3 ? '#10b981' : '#94a3b8') : '#cbd5e1'}
          strokeWidth="1"
        />
        <text
          x="344"
          y="210.5"
          textAnchor="middle"
          fontSize="8.8"
          fontWeight="800"
          fill={showResult ? (reactsWithHNO3 ? '#065f46' : '#475569') : '#334155'}
        >
          {showResult
            ? hno3BadgeText
            : showSample
            ? 'Sedia dipanas & kacau'
            : '5.0 cm³ HNO₃'}
        </text>
      </g>

      {/* ============================================================ */}
      {/* RIGHT: TUBE 3 (Natrium Hidroksida, NaOH 2.0 mol dm-3, cx=534)*/}
      {/* ============================================================ */}
      <g>
        <text x="534" y="29" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#1e40af">
          3. Natrium Hidroksida (NaOH)
        </text>

        {/* Glass Stirring Rod */}
        <line
          x1="525"
          y1="33"
          x2="538"
          y2="148"
          stroke="#94a3b8"
          strokeWidth="3.2"
          strokeLinecap="round"
        >
          {isAnimating && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="3 532 75;-3 532 75;3 532 75"
              dur="0.45s"
              repeatCount="indefinite"
            />
          )}
        </line>

        {/* Liquid (NaOH 5.0 cm3) */}
        <path
          d="M 518 96 L 518 145 Q 518 159 534 159 Q 550 159 550 145 L 550 96 Z"
          fill="#dbeafe"
          fillOpacity="0.65"
        />
        <ellipse cx="534" cy="96" rx="16" ry="2.2" fill="#bfdbfe" fillOpacity="0.8" />

        {/* Oxide sample at bottom of NaOH */}
        {hasTube3Residue && (
          <path
            d="M 522 156 Q 534 148 546 156 Z"
            fill="#ffffff"
            stroke="#94a3b8"
            strokeWidth="0.9"
          />
        )}
        {showSample && physicalState === 'gas' && (
          <g fill="#ffffff" stroke="#2563eb" strokeWidth="0.8">
            <circle cx="532" cy="136" r="1.9">
              <animate attributeName="cy" values="150;98" dur="1.0s" repeatCount="indefinite" />
            </circle>
          </g>
        )}

        {/* Tube 3 glass wall */}
        <path
          d="M 517 42 L 517 145 Q 517 160 534 160 Q 551 160 551 145 L 551 42"
          fill="url(#p3GlassTube)"
          fillOpacity="0.25"
          stroke="#475569"
          strokeWidth="1.7"
        />
        <ellipse cx="534" cy="42" rx="18" ry="2.6" fill="none" stroke="#475569" strokeWidth="1.5" />

        {/* Test tube holder collar + handle */}
        <rect x="515" y="60" width="38" height="6" rx="2" fill="#d97706" stroke="#78350f" strokeWidth="1" />
        <line x1="553" y1="63" x2="584" y2="63" stroke="#92400e" strokeWidth="3.2" strokeLinecap="round" />

        <text x="588" y="66" textAnchor="start" fontSize="8.5" fontWeight="700" fill="#475569">
          Pemegang
        </text>

        {/* Reagent label cleanly to left of Tube 3 */}
        <text x="506" y="124" textAnchor="end" fontSize="8.5" fontWeight="700" fill="#475569">
          Natrium hidroksida,
        </text>
        <text x="506" y="134" textAnchor="end" fontSize="8.5" fontWeight="700" fill="#475569">
          NaOH
        </text>
        <line x1="509" y1="126" x2="518" y2="126" stroke="#64748b" strokeWidth="0.9" strokeDasharray="3 2" />

        {/* Red heat arrow / animated flame under Tube 3 (Rajah 4.13) */}
        {isAnimating ? (
          <g>
            <path d="M 534 162 C 541 171, 540 184, 534 185 C 528 184, 527 171, 534 162 Z" fill="#fb923c" />
            <path d="M 534 169 C 537 174, 537 183, 534 184 C 531 183, 531 174, 534 169 Z" fill="#fef08a" />
            <text x="547" y="180" fontSize="8.5" fontWeight="800" fill="#dc2626">
              Panaskan
            </text>
          </g>
        ) : (
          <g opacity="0.72">
            <line x1="534" y1="184" x2="534" y2="169" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" />
            <polygon points="534,163 530,171 538,171" fill="#dc2626" />
            <text x="544" y="180" fontSize="8.5" fontWeight="700" fill="#dc2626">
              Panaskan
            </text>
          </g>
        )}

        {/* Status badge under Tube 3 */}
        <rect
          x="468"
          y="198"
          width="132"
          height="19"
          rx="5"
          fill={showResult ? (reactsWithNaOH ? '#ecfdf5' : '#f1f5f9') : '#f8fafc'}
          stroke={showResult ? (reactsWithNaOH ? '#10b981' : '#94a3b8') : '#cbd5e1'}
          strokeWidth="1"
        />
        <text
          x="534"
          y="210.5"
          textAnchor="middle"
          fontSize="8.8"
          fontWeight="800"
          fill={showResult ? (reactsWithNaOH ? '#065f46' : '#475569') : '#334155'}
        >
          {showResult
            ? naohBadgeText
            : showSample
            ? 'Sedia dipanas & kacau'
            : '5.0 cm³ NaOH'}
        </text>
      </g>
    </svg>
  );
};
