import React from 'react';

export interface UTubeJohnstoneSVGProps {
  leftShortLabel: string;
  rightShortLabel: string;
  leftColorHex: string;
  rightColorHex: string;
  leftReactantIon: string;
  leftProductIon: string;
  leftHalfEq: string;
  rightReactantIon: string;
  rightProductIon: string;
  rightHalfEq: string;
  /** Reaction progress 0..1 */
  progress: number;
  isReacting: boolean;
  /** Which arm did dropper last sample, if any */
  sampledArm: 'left' | 'right' | null;
}

export const UTubeJohnstoneSVG: React.FC<UTubeJohnstoneSVGProps> = ({
  leftShortLabel,
  rightShortLabel,
  leftColorHex,
  rightColorHex,
  leftReactantIon,
  leftProductIon,
  leftHalfEq,
  rightReactantIon,
  rightProductIon,
  rightHalfEq,
  progress,
  isReacting,
  sampledArm,
}) => {
  // Galvanometer needle deflects cleanly to the right (+34 deg) along electron flow L -> R
  const needleAngleDeg = progress > 0 || isReacting ? Math.min(34, 6 + progress * 28) : 0;
  const activeFlow = isReacting || progress > 0.05;
  const switchClosed = isReacting || progress > 0;

  return (
    <svg
      viewBox="0 0 680 300"
      className="w-full h-auto max-h-[268px] select-none mx-auto"
      role="img"
      aria-label="Radas Tiub-U & Galvanometer bersama Kanta Pembesar Permukaan Elektrod"
    >
      <defs>
        <linearGradient id="graphiteGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="50%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <radialGradient id="electronGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="55%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
        </radialGradient>
        <marker
          id="eFlowArrow"
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#0284c7" />
        </marker>
        {/* Exact semicircular U-tube interior bore clipPath (arms cx=288 & 392, width=32, curve cy=124) */}
        <clipPath id="utubeInterior">
          <path d="M 272 64 L 272 124 A 68 68 0 0 0 408 124 L 408 64 L 376 64 L 376 124 A 36 36 0 0 1 304 124 L 304 64 Z" />
        </clipPath>
      </defs>

      {/* SECTION HEADER */}
      <text x="12" y="15" fontSize="9" fontWeight="800" fill="#64748b">
        ZON ATAS · RADAS TIUB-U &amp; GALVANOMETER (MAKROSKOPIK)
      </text>

      {/* EXTERNAL WIRE CIRCUIT (Left electrode cx=288 -> Galvanometer cx=340 -> Suis -> Right electrode cx=392) */}
      <g>
        <path
          d="M 288 54 L 288 30 L 316 30"
          fill="none"
          stroke={activeFlow ? '#0284c7' : '#64748b'}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M 364 30 L 392 30 L 392 54"
          fill="none"
          stroke={activeFlow ? '#0284c7' : '#64748b'}
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Animated electrons gliding along wire Left -> Right */}
        {activeFlow && (
          <g>
            <circle r="4" fill="url(#electronGlow)">
              <animateMotion
                dur="1.3s"
                repeatCount="indefinite"
                path="M 288 54 L 288 30 L 392 30 L 392 54"
              />
            </circle>
            <circle r="3" fill="#fef08a">
              <animateMotion
                dur="1.3s"
                begin="0.65s"
                repeatCount="indefinite"
                path="M 288 54 L 288 30 L 392 30 L 392 54"
              />
            </circle>
          </g>
        )}

        {/* Electron direction labels cleanly beside top corners */}
        <text x="278" y="26" textAnchor="end" fontSize="8.8" fontWeight="800" fill={activeFlow ? '#0369a1' : '#94a3b8'}>
          e⁻ →
        </text>
        <text x="402" y="26" textAnchor="start" fontSize="8.8" fontWeight="800" fill={activeFlow ? '#0369a1' : '#94a3b8'}>
          → e⁻
        </text>
      </g>

      {/* GALVANOMETER (cx = 340, cy = 30) */}
      <g transform="translate(340, 30)">
        <circle cx="0" cy="0" r="22" fill="#ffffff" stroke="#334155" strokeWidth="2.1" />
        <circle cx="0" cy="0" r="18.5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M -13 -3 A 14 14 0 0 1 13 -3" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
        <line x1="0" y1="-17" x2="0" y2="-13" stroke="#334155" strokeWidth="1.2" />
        <line x1="-12" y1="-9" x2="-9" y2="-6.5" stroke="#64748b" strokeWidth="1" />
        <line x1="12" y1="-9" x2="9" y2="-6.5" stroke="#0284c7" strokeWidth="1.2" />
        <text x="-10" y="2" fontSize="6.8" fontWeight="800" fill="#64748b" textAnchor="middle">-</text>
        <text x="10" y="2" fontSize="6.8" fontWeight="800" fill="#0284c7" textAnchor="middle">+</text>
        <text x="0" y="14.5" fontSize="9" fontWeight="900" fill="#1e293b" textAnchor="middle">G</text>

        <g transform={`rotate(${needleAngleDeg}, 0, 5)`}>
          <line x1="0" y1="5" x2="0" y2="-15" stroke="#dc2626" strokeWidth="1.9" strokeLinecap="round" />
        </g>
        <circle cx="0" cy="5" r="2.4" fill="#1e293b" />
      </g>

      {/* Subtle Circuit Status Pill between arms */}
      <g transform="translate(340, 74)">
        <rect x="-26" y="-8" width="52" height="16" rx="8" fill={switchClosed ? '#ecfdf5' : '#f1f5f9'} stroke={switchClosed ? '#10b981' : '#cbd5e1'} strokeWidth="1" />
        <text x="0" y="2.8" textAnchor="middle" fontSize="7.5" fontWeight="800" fill={switchClosed ? '#065f46' : '#64748b'}>
          {switchClosed ? 'Suis Tutup' : 'Suis Buka'}
        </text>
      </g>

      {/* CLEAN LAB STAND CLAMP SUPPORTING U-TUBE BASE */}
      <path d="M 294 196 L 386 196" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />

      {/* TIUB-U LIQUID LAYERS CLIPPED TO TRUE SEMICIRCULAR BORE */}
      <g clipPath="url(#utubeInterior)">
        {/* Lower semicircle filled with dilute H2SO4 */}
        <rect x="270" y="122" width="140" height="72" fill="#e0f2fe" />

        {/* Left arm solution (y=78..126) */}
        <rect x="270" y="78" width="60" height="48" fill={leftColorHex} fillOpacity="0.88" />
        {/* Right arm solution (y=78..126) */}
        <rect x="350" y="78" width="60" height="48" fill={rightColorHex} fillOpacity="0.88" />

        {/* Subtle meniscus line at top of left & right solutions */}
        <line x1="272" y1="78" x2="304" y2="78" stroke="#475569" strokeOpacity="0.35" strokeWidth="1.2" />
        <line x1="376" y1="78" x2="408" y2="78" stroke="#475569" strokeOpacity="0.35" strokeWidth="1.2" />
      </g>

      {/* Sampled highlight ring on left or right arm */}
      {sampledArm === 'left' && (
        <rect x="269" y="76" width="38" height="52" rx="4" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4 2" />
      )}
      {sampledArm === 'right' && (
        <rect x="373" y="76" width="38" height="52" rx="4" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4 2" />
      )}

      {/* Migrating H+ and SO4(2-) ions smoothly along bottom U-bend without overlapping */}
      <g fontSize="7.2" fontWeight="800">
        <g key={`h-${activeFlow ? 'flow' : 'rest'}`}>
          <circle cx="316" cy="170" r="7" fill="#ffffff" stroke="#0284c7" strokeWidth="1" />
          <text x="316" y="172.5" textAnchor="middle" fill="#0369a1">H⁺</text>
          {activeFlow && (
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0;6,-2;0,0"
              dur="1.8s"
              repeatCount="indefinite"
            />
          )}
        </g>
        <g key={`so4-${activeFlow ? 'flow' : 'rest'}`}>
          <circle cx="364" cy="170" r="9" fill="#ffffff" stroke="#7c3aed" strokeWidth="1" />
          <text x="364" y="172.5" textAnchor="middle" fill="#6d28d9">SO₄²⁻</text>
          {activeFlow && (
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0;-6,-2;0,0"
              dur="1.8s"
              repeatCount="indefinite"
            />
          )}
        </g>
      </g>

      {/* CARBON (GRAPHITE) ELECTRODES DIPPED IN ARMS */}
      <rect x="284" y="52" width="8" height="58" rx="1.5" fill="url(#graphiteGrad)" stroke="#0f172a" strokeWidth="0.9" />
      <rect x="388" y="52" width="8" height="58" rx="1.5" fill="url(#graphiteGrad)" stroke="#0f172a" strokeWidth="0.9" />

      {/* TIUB-U OUTER & INNER GLASS WALLS (TRUE CIRCULAR ARCS!) */}
      <path
        d="M 272 64 L 272 124 A 68 68 0 0 0 408 124 L 408 64"
        fill="none"
        stroke="#475569"
        strokeWidth="2.1"
      />
      <path
        d="M 304 64 L 304 124 A 36 36 0 0 0 376 124 L 376 64"
        fill="none"
        stroke="#475569"
        strokeWidth="2.1"
      />
      {/* Glass rims at top of left & right openings */}
      <ellipse cx="288" cy="64" rx="16.5" ry="2.6" fill="none" stroke="#475569" strokeWidth="1.5" />
      <ellipse cx="392" cy="64" rx="16.5" ry="2.6" fill="none" stroke="#475569" strokeWidth="1.5" />

      {/* CLEAN TEXTBOOK LABELS */}
      <g fontSize="9.2" fontWeight="700" fill="#334155">
        <text x="256" y="61" textAnchor="end">Elektrod karbon (-)</text>
        <line x1="259" y1="58" x2="284" y2="58" stroke="#64748b" strokeWidth="0.9" strokeDasharray="3 2" />

        <text x="256" y="96" textAnchor="end" fill="#0f172a" fontWeight="800">
          {leftShortLabel}
        </text>
        <text x="256" y="107" textAnchor="end" fontSize="8" fill="#64748b">
          Lengan Kiri (Agen Penurunan)
        </text>
        <line x1="259" y1="95" x2="272" y2="95" stroke="#64748b" strokeWidth="0.9" strokeDasharray="3 2" />

        <text x="424" y="61" textAnchor="start">Elektrod karbon (+)</text>
        <line x1="396" y1="58" x2="421" y2="58" stroke="#64748b" strokeWidth="0.9" strokeDasharray="3 2" />

        <text x="424" y="96" textAnchor="start" fill="#0f172a" fontWeight="800">
          {rightShortLabel}
        </text>
        <text x="424" y="107" textAnchor="start" fontSize="8" fill="#64748b">
          Lengan Kanan (Agen Pengoksidaan)
        </text>
        <line x1="408" y1="95" x2="421" y2="95" stroke="#64748b" strokeWidth="0.9" strokeDasharray="3 2" />

        <text x="340" y="207" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0369a1">
          Asid sulfurik cair, H₂SO₄(ak) · Lengkapkan litar &amp; imbangi cas
        </text>
      </g>

      {/* ZOOM DASHED CONES FROM ELECTRODES TO SUBMICROSCOPIC LOUPES */}
      <line x1="284" y1="112" x2="154" y2="212" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="396" y1="112" x2="526" y2="212" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />

      {/* ===================================================================== */}
      {/* ZON BAWAH: LEFT SUBMICROSCOPIC LOUPE (Pengoksidaan, x=12..308)        */}
      {/* ===================================================================== */}
      <g transform="translate(12, 212)">
        <rect x="0" y="0" width="296" height="84" rx="11" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.4" />
        <rect x="8" y="8" width="24" height="68" rx="4" fill="url(#graphiteGrad)" />
        <text x="20" y="46" textAnchor="middle" fontSize="8" fontWeight="800" fill="#e2e8f0" transform="rotate(-90, 20, 46)">
          Karbon (-)
        </text>

        <circle cx="64" cy="48" r="14" fill="#ffffff" stroke="#0f766e" strokeWidth="1.6" />
        <text x="64" y="51.5" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#0f766e">
          {progress > 0.35 ? leftProductIon : leftReactantIon}
        </text>

        <path d="M 52 44 L 32 34 L 24 10" fill="none" stroke="#0284c7" strokeWidth="1.6" strokeDasharray="3 2" markerEnd="url(#eFlowArrow)" />
        {activeFlow && (
          <circle cx="38" cy="36" r="4" fill="#0ea5e9" stroke="#fef08a" strokeWidth="1.2">
            <animate attributeName="cy" values="42;12" dur="1.1s" repeatCount="indefinite" />
          </circle>
        )}

        <text x="90" y="21" fontSize="9.5" fontWeight="800" fill="#0f766e">
          Kanta Kiri · Pengoksidaan (-)
        </text>
        <text x="90" y="40" fontSize="8.8" fontWeight="800" fontFamily="monospace" fill="#1e293b">
          {leftHalfEq}
        </text>
        <text x="90" y="57" fontSize="8.5" fontWeight="600" fill="#475569">
          {leftReactantIon} membebaskan e⁻ ke elektrod
        </text>
        <text x="90" y="70" fontSize="8.5" fontWeight="700" fill="#0369a1">
          → e⁻ bergerak ke wayar luar
        </text>
      </g>

      {/* ===================================================================== */}
      {/* ZON BAWAH: RIGHT SUBMICROSCOPIC LOUPE (Penurunan, x=372..668)         */}
      {/* ===================================================================== */}
      <g transform="translate(372, 212)">
        <rect x="0" y="0" width="296" height="84" rx="11" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.4" />
        <rect x="8" y="8" width="24" height="68" rx="4" fill="url(#graphiteGrad)" />
        <text x="20" y="46" textAnchor="middle" fontSize="8" fontWeight="800" fill="#e2e8f0" transform="rotate(-90, 20, 46)">
          Karbon (+)
        </text>

        <path d="M 24 10 L 32 34 L 50 44" fill="none" stroke="#0284c7" strokeWidth="1.6" strokeDasharray="3 2" markerEnd="url(#eFlowArrow)" />
        {activeFlow && (
          <circle cx="24" cy="22" r="4" fill="#0ea5e9" stroke="#fef08a" strokeWidth="1.2">
            <animate attributeName="cy" values="12;42" dur="1.1s" repeatCount="indefinite" />
          </circle>
        )}

        <circle cx="64" cy="48" r="14" fill="#ffffff" stroke="#b45309" strokeWidth="1.6" />
        <text x="64" y="51.5" textAnchor="middle" fontSize="9" fontWeight="800" fill="#b45309">
          {progress > 0.35 ? rightProductIon : rightReactantIon}
        </text>

        <text x="90" y="21" fontSize="9.5" fontWeight="800" fill="#b45309">
          Kanta Kanan · Penurunan (+)
        </text>
        <text x="90" y="40" fontSize="8.8" fontWeight="800" fontFamily="monospace" fill="#1e293b">
          {rightHalfEq}
        </text>
        <text x="90" y="57" fontSize="8.5" fontWeight="600" fill="#475569">
          {rightReactantIon} menerima e⁻ dari elektrod
        </text>
        <text x="90" y="70" fontSize="8.5" fontWeight="700" fill="#0369a1">
          → Hasil: {rightProductIon}
        </text>
      </g>
    </svg>
  );
};
