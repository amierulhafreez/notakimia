import React from 'react';

export interface AlloyImpactApparatusSVGProps {
  /** Foreign atom (Sn) percentage: 0 = Kuprum Tulen, > 0 = Gangsa */
  foreignPct: number;
  /** Drop height in cm (20..100) */
  heightCm: number;
  /** 0 = suspended at heightCm; 0..1 = falling / impacting; 1 = impacted resting on ball */
  impactProgress: number;
  /** Measured/calculated dent diameter in cm */
  dentDiameterCm: number;
  /** Whether a drop has completed at current settings */
  hasImpacted: boolean;
}

export const AlloyImpactApparatusSVG: React.FC<AlloyImpactApparatusSVGProps> = ({
  foreignPct,
  heightCm,
  impactProgress,
  dentDiameterCm,
  hasImpacted,
}) => {
  const isPure = foreignPct === 0;
  const blockName = isPure ? 'Blok kuprum tulen' : 'Blok gangsa';

  // Map 20..100 cm to starting weight top-y (142 down to 54)
  const startWeightY = 156 - ((heightCm - 20) / 80) * 92;
  const ballTopY = 200;
  const weightHeight = 26;
  const impactWeightY = ballTopY - weightHeight; // hits top of steel ball cleanly at y = 174..200

  // Smooth gravity-like drop curve during first 65% of impactProgress, then rests on ball
  const dropFraction = Math.min(1, impactProgress / 0.65);
  const easedDrop = dropFraction * dropFraction;
  const currentWeightY = startWeightY + (impactWeightY - startWeightY) * easedDrop;

  // Visible indentation depth after strike (0.25..0.80 cm -> 1.5..6.5 px)
  const impactDepthFactor = Math.max(0, (impactProgress - 0.6) / 0.4);
  const visualDentRadiusPx = hasImpacted || impactProgress > 0.6
    ? Math.min(26, Math.max(7, dentDiameterCm * 31)) * (hasImpacted ? 1 : impactDepthFactor)
    : 0;
  const ballSinkPx = hasImpacted || impactProgress > 0.6
    ? Math.min(5.5, dentDiameterCm * 6.5) * (hasImpacted ? 1 : impactDepthFactor)
    : 0;

  return (
    <svg
      viewBox="0 0 364 268"
      className="w-full h-auto max-h-[214px] select-none mx-auto"
      role="img"
      aria-label={`Rajah 8.3: Ujian Kekerasan ${blockName}`}
    >
      <defs>
        <linearGradient id="copperBlockGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="55%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#9a3412" />
        </linearGradient>
        <linearGradient id="bronzeBlockGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="55%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
        <radialGradient id="steelBallGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="45%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#334155" />
        </radialGradient>
        <linearGradient id="weightGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="50%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>

      {/* Bench line */}
      <line x1="10" y1="254" x2="218" y2="254" stroke="#cbd5e1" strokeWidth="1.6" />

      {/* RETORT STAND (Kaki retort) */}
      <g>
        <rect x="16" y="246" width="128" height="8" rx="2" fill="#334155" />
        <rect x="28" y="18" width="6" height="230" rx="2" fill="#475569" />
        {/* Top clamp arm */}
        <rect x="24" y="22" width="102" height="5.5" rx="2" fill="#64748b" />
        <rect x="22" y="19" width="14" height="11" rx="2" fill="#1e293b" />
      </g>

      {/* METER RULER (Pembaris meter) */}
      <g>
        <rect x="44" y="26" width="14" height="220" rx="1.5" fill="#fef3c7" stroke="#b45309" strokeWidth="1.1" />
        {Array.from({ length: 19 }).map((_, idx) => {
          const y = 34 + idx * 11;
          const isMajor = idx % 2 === 0;
          return (
            <line
              key={idx}
              x1="44"
              y1={y}
              x2={isMajor ? 52 : 49}
              y2={y}
              stroke="#78350f"
              strokeWidth={isMajor ? 1 : 0.7}
            />
          );
        })}
        {/* Height target marker needle beside ruler */}
        <polygon
          points={`60,${startWeightY + weightHeight} 67,${startWeightY + weightHeight - 3.5} 67,${startWeightY + weightHeight + 3.5}`}
          fill="#0284c7"
        />
        <text x="69" y={startWeightY + weightHeight + 3} fontSize="8.5" fontWeight="800" fill="#0369a1">
          {heightCm} cm
        </text>
      </g>

      {/* THREAD (Benang) & 1 kg WEIGHT (Pemberat 1 kg) */}
      <g>
        <line
          x1="116"
          y1="27"
          x2="116"
          y2={currentWeightY}
          stroke="#64748b"
          strokeWidth="1.4"
          strokeDasharray={impactProgress > 0.05 ? '3 2' : 'none'}
          opacity={impactProgress > 0.05 ? 0.45 : 1}
        />
        {/* Weight ring + trapezoid body */}
        <circle cx="116" cy={currentWeightY + 2} r="3" fill="none" stroke="#334155" strokeWidth="1.5" />
        <path
          d={`M 105 ${currentWeightY + 5} L 127 ${currentWeightY + 5} L 131 ${currentWeightY + weightHeight} L 101 ${currentWeightY + weightHeight} Z`}
          fill="url(#weightGrad)"
          stroke="#0f172a"
          strokeWidth="1.2"
        />
        <text
          x="116"
          y={currentWeightY + 19}
          textAnchor="middle"
          fontSize="8"
          fontWeight="800"
          fill="#f8fafc"
        >
          1 kg
        </text>
      </g>

      {/* SAMPLE BLOCK (Blok Kuprum Tulen / Blok Gangsa) + STEEL BALL + CELLOPHANE TAPE */}
      <g>
        <rect
          x="76"
          y="208"
          width="80"
          height="38"
          rx="3"
          fill={isPure ? 'url(#copperBlockGrad)' : 'url(#bronzeBlockGrad)'}
          stroke={isPure ? '#7c2d12' : '#78350f'}
          strokeWidth="1.4"
        />
        {/* Visible surface indentation notch when struck */}
        {ballSinkPx > 0.2 && (
          <path
            d={`M ${116 - Math.min(13, dentDiameterCm * 14)} 208 Q 116 ${208 + ballSinkPx * 1.4} ${116 + Math.min(13, dentDiameterCm * 14)} 208 Z`}
            fill="#451a03"
            fillOpacity="0.65"
          />
        )}

        {/* Cellophane tape (Pita selofan) holding ball */}
        <path
          d={`M 95 208 Q 116 ${192 + ballSinkPx} 137 208`}
          fill="none"
          stroke="#bae6fd"
          strokeWidth="3.5"
          strokeOpacity="0.7"
        />

        {/* Steel Ball (Bebola keluli) */}
        <circle
          cx="116"
          cy={201 + ballSinkPx}
          r="7.5"
          fill="url(#steelBallGrad)"
          stroke="#334155"
          strokeWidth="1"
        />
      </g>

      {/* CLEAN TEXTBOOK LABELS (Left/Top + Lower Right) */}
      <g fontSize="9" fontWeight="700" fill="#334155">
        <text x="132" y="25" textAnchor="start">Kaki retort</text>
        <text x="64" y="34" textAnchor="start">Pembaris</text>
        <text x="64" y="43" textAnchor="start">meter</text>

        <text x="122" y="48" textAnchor="start">Benang</text>
      </g>

      {/* Lower-right textbook labels cleanly below Zoom card */}
      <g fontSize="9" fontWeight="700" fill="#334155">
        <text x="192" y="176">Pemberat 1 kg</text>
        <line x1="133" y1={Math.min(182, Math.max(115, currentWeightY + 15))} x2="189" y2="173" stroke="#64748b" strokeWidth="0.9" strokeDasharray="3 2" />

        <text x="192" y="196">Pita selofan</text>
        <line x1="131" y1="201" x2="189" y2="193" stroke="#64748b" strokeWidth="0.9" strokeDasharray="3 2" />

        <text x="192" y="216">Bebola keluli</text>
        <line x1="124" y1="204" x2="189" y2="213" stroke="#64748b" strokeWidth="0.9" strokeDasharray="3 2" />

        <text x="192" y="238" fill={isPure ? '#9a3412' : '#92400e'}>
          {blockName}
        </text>
        <line x1="156" y1="230" x2="189" y2="235" stroke="#64748b" strokeWidth="0.9" strokeDasharray="3 2" />
      </g>

      {/* TOP-RIGHT: AUTOMATIC ZOOM DENT INSPECTOR (Paparan Zum Lekukan) */}
      <g transform="translate(206, 12)">
        <rect x="0" y="0" width="148" height="142" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.4" />
        <text x="74" y="16" textAnchor="middle" fontSize="9" fontWeight="800" fill="#334155">
          Paparan Zum Lekukan
        </text>
        <text x="74" y="28" textAnchor="middle" fontSize="8" fontWeight="700" fill="#64748b">
          {isPure ? 'Kuprum Tulen (0% Sn)' : `Gangsa (${foreignPct}% Sn)`}
        </text>

        {/* Magnified surface circle */}
        <circle
          cx="74"
          cy="74"
          r="34"
          fill={isPure ? 'url(#copperBlockGrad)' : 'url(#bronzeBlockGrad)'}
          stroke={isPure ? '#7c2d12' : '#78350f'}
          strokeWidth="1.5"
        />

        {/* Circular dent impression */}
        {visualDentRadiusPx > 0.5 ? (
          <g>
            <circle
              cx="74"
              cy="74"
              r={visualDentRadiusPx}
              fill="#451a03"
              fillOpacity="0.58"
              stroke="#fef3c7"
              strokeWidth="1.2"
              strokeOpacity="0.6"
            />
            {/* Caliper dimension line across dent */}
            <line
              x1={74 - visualDentRadiusPx}
              y1="74"
              x2={74 + visualDentRadiusPx}
              y2="74"
              stroke="#fef08a"
              strokeWidth="1.5"
            />
            <line x1={74 - visualDentRadiusPx} y1="69" x2={74 - visualDentRadiusPx} y2="79" stroke="#fef08a" strokeWidth="1.2" />
            <line x1={74 + visualDentRadiusPx} y1="69" x2={74 + visualDentRadiusPx} y2="79" stroke="#fef08a" strokeWidth="1.2" />
          </g>
        ) : (
          <text x="74" y="77" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fffbeb">
            Belum dihentam
          </text>
        )}

        {/* Readout pill */}
        <rect x="14" y="114" width="120" height="21" rx="5" fill="#1e293b" />
        <text
          x="74"
          y="128"
          textAnchor="middle"
          fontSize="10"
          fontWeight="800"
          fontFamily="monospace"
          fill={hasImpacted ? '#fbbf24' : '#94a3b8'}
        >
          {hasImpacted ? `Diameter: ${dentDiameterCm.toFixed(2)} cm` : 'Diameter: — cm'}
        </text>
      </g>
    </svg>
  );
};
