import React from 'react';

export interface AlloyAtomicLatticeSVGProps {
  foreignPct: number;
  heightCm: number;
  /** 0 = before strike, 0.55..1 = strike & slip */
  impactProgress: number;
  hasImpacted: boolean;
  /** Show highlighted force vector arrows (especially vivid in slow-motion mode or post-impact) */
  showForceVectors: boolean;
}

interface AtomPos {
  row: number;
  col: number;
  isForeign: boolean;
}

const FOREIGN_COORDS_BY_ORDER: Array<[number, number]> = [
  [1, 3],
  [2, 5],
  [1, 5],
  [2, 2],
  [3, 4],
  [0, 4],
  [3, 1],
  [3, 6],
];

export const AlloyAtomicLatticeSVG: React.FC<AlloyAtomicLatticeSVGProps> = ({
  foreignPct,
  heightCm,
  impactProgress,
  hasImpacted,
  showForceVectors,
}) => {
  const rows = 5;
  const cols = 8;
  const foreignCount = Math.round((foreignPct / 5) * 2); // 0->0, 5->2, 10->4, 15->6, 20->8
  const activeForeignSet = new Set(
    FOREIGN_COORDS_BY_ORDER.slice(0, foreignCount).map(([r, c]) => `${r}-${c}`)
  );

  // Impact starts around impactProgress = 0.55 and completes by 1.0
  const postStrike = hasImpacted
    ? 1
    : Math.max(0, Math.min(1, (impactProgress - 0.52) / 0.48));
  const easedStrike = 1 - Math.pow(1 - postStrike, 2);

  // Resistance based on foreign atom percentage (0% allows huge slip; 10–20% pins layers)
  const slipFactor =
    foreignPct === 0
      ? 1.0
      : foreignPct === 5
      ? 0.44
      : foreignPct === 10
      ? 0.22
      : foreignPct === 15
      ? 0.14
      : 0.09;
  const heightBoost = 0.65 + 0.45 * (heightCm / 100);
  const effectiveSlip = easedStrike * slipFactor * heightBoost;

  const spacingX = 30;
  const spacingY = 25;
  const originX = 90;
  const originY = 70;

  // Build atom list with deterministic slight lattice disruption around Sn pinning sites
  const atoms: Array<AtomPos & { x: number; y: number; r: number }> = [];
  for (let r = 0; r < rows; r++) {
    const rowStagger = r % 2 === 1 ? spacingX * 0.45 : 0;
    for (let c = 0; c < cols; c++) {
      const isForeign = activeForeignSet.has(`${r}-${c}`);
      let x = originX + c * spacingX + rowStagger;
      let y = originY + r * spacingY;

      // Static disruption: if any active foreign atom is adjacent, slightly push/distort Cu positions
      if (!isForeign && foreignCount > 0) {
        FOREIGN_COORDS_BY_ORDER.slice(0, foreignCount).forEach(([fr, fc]) => {
          const dr = r - fr;
          const dc = c - fc;
          const dist2 = dr * dr + dc * dc;
          if (dist2 > 0 && dist2 <= 2) {
            x += (dc >= 0 ? 1 : -1) * 2.6;
            y += (dr >= 0 ? 1 : -1) * 2.2;
          }
        });
      }

      // Dynamic impact slip:
      // Center columns (2..5) near top rows depress down; outer left/right top rows slide sideways
      if (effectiveStrikeNonZero(effectiveSlip)) {
        const distFromCenter = Math.abs(c - 3.5);
        const depthWeight = Math.max(0, 1 - r * 0.24);
        const centerDepression = Math.max(0, 1 - distFromCenter / 2.6);
        y += centerDepression * depthWeight * 16 * effectiveSlip;

        // Lateral layer glide along upper slip planes (most dramatic in Pure Cu 0%)
        if (r <= 2) {
          const sideDir = c < 3.5 ? -1 : 1;
          const planeSlide = (3 - r) * 6.2 * effectiveSlip;
          x += sideDir * planeSlide * (0.4 + 0.6 * (1 - centerDepression));
        }
      }

      atoms.push({
        row: r,
        col: c,
        isForeign,
        x,
        y,
        r: isForeign ? 15.2 : 11.8,
      });
    }
  }

  function effectiveStrikeNonZero(v: number) {
    return v > 0.005;
  }

  // Descending steel ball tip contact at top center
  const strikerTopY =
    hasImpacted || impactProgress >= 0.55
      ? 24 + easedStrike * (foreignPct === 0 ? 14 : 4)
      : 6 + (impactProgress / 0.55) * 18;

  const isPinned = foreignPct > 0;
  const activeVectors = showForceVectors && (impactProgress > 0.45 || hasImpacted);

  return (
    <svg
      viewBox="0 0 390 258"
      className="w-full h-auto max-h-[214px] select-none mx-auto"
      role="img"
      aria-label="Kanta Pembesar Submikroskopik Susunan Atom Logam Tulen vs Aloi"
    >
      <defs>
        <radialGradient id="cuAtomGrad" cx="35%" cy="30%" r="68%">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="45%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#9a3412" />
        </radialGradient>
        <radialGradient id="snAtomGrad" cx="35%" cy="30%" r="68%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="45%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </radialGradient>
        <radialGradient id="microBallGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="55%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#1e293b" />
        </radialGradient>
        <marker
          id="forceArrow"
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="5.5"
          markerHeight="5.5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#dc2626" />
        </marker>
        <marker
          id="slipArrow"
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="5.5"
          markerHeight="5.5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#f59e0b" />
        </marker>
      </defs>

      {/* Magnifier frame */}
      <rect x="6" y="4" width="378" height="214" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* Slip plane horizontal reference guides (show straight lines in 0% vs disrupted in alloy) */}
      {[0, 1, 2].map((r) => (
        <line
          key={r}
          x1="44"
          y1={originY + r * spacingY}
          x2="346"
          y2={originY + r * spacingY}
          stroke={isPinned ? '#fca5a5' : '#cbd5e1'}
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.6"
        />
      ))}

      {/* Striker ball tip at top center */}
      <g>
        <circle
          cx="198"
          cy={strikerTopY}
          r="20"
          fill="url(#microBallGrad)"
          stroke="#334155"
          strokeWidth="1.4"
        />
        <text x="226" y={Math.max(18, strikerTopY)} fontSize="9" fontWeight="800" fill="#334155">
          Hentaman Bebola Keluli
        </text>
      </g>

      {/* Crystal Lattice Atoms (render Cu first, then slightly larger Sn on top cleanly) */}
      <g>
        {atoms
          .filter((a) => !a.isForeign)
          .map((atom) => (
            <circle
              key={`cu-${atom.row}-${atom.col}`}
              cx={atom.x}
              cy={atom.y}
              r={atom.r}
              fill="url(#cuAtomGrad)"
              stroke="#7c2d12"
              strokeWidth="1.1"
            />
          ))}
        {atoms
          .filter((a) => a.isForeign)
          .map((atom) => (
            <g key={`sn-${atom.row}-${atom.col}`}>
              {activeVectors && (
                <circle
                  cx={atom.x}
                  cy={atom.y}
                  r={atom.r + 4.5}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray="3 2"
                />
              )}
              <circle
                cx={atom.x}
                cy={atom.y}
                r={atom.r}
                fill="url(#snAtomGrad)"
                stroke="#1e3a8a"
                strokeWidth="1.3"
              />
            </g>
          ))}
      </g>

      {/* Force Vectors Overlay */}
      {activeVectors && (
        <g>
          {/* Main downward impact force vector */}
          <line
            x1="198"
            y1={strikerTopY + 18}
            x2="198"
            y2={strikerTopY + 42}
            stroke="#dc2626"
            strokeWidth="2.8"
            markerEnd="url(#forceArrow)"
          />

          {!isPinned ? (
            /* Pure Metal: long continuous lateral slip vectors showing easy layer glide */
            <g>
              <line
                x1="168"
                y1="82"
                x2="72"
                y2="82"
                stroke="#f59e0b"
                strokeWidth="2.6"
                markerEnd="url(#slipArrow)"
              />
              <line
                x1="228"
                y1="82"
                x2="324"
                y2="82"
                stroke="#f59e0b"
                strokeWidth="2.6"
                markerEnd="url(#slipArrow)"
              />
              <rect x="92" y="191" width="206" height="19" rx="5" fill="#fff7ed" stroke="#fb923c" strokeWidth="1" />
              <text x="195" y="203.5" textAnchor="middle" fontSize="9" fontWeight="800" fill="#9a3412">
                Lapisan atom mudah menggelongsor → Lekukan dalam
              </text>
            </g>
          ) : (
            /* Alloy: deflected short vectors blocked at Sn pinning sites */
            <g>
              <line
                x1="184"
                y1="92"
                x2="152"
                y2="99"
                stroke="#dc2626"
                strokeWidth="2.2"
                markerEnd="url(#forceArrow)"
              />
              <line
                x1="212"
                y1="92"
                x2="244"
                y2="99"
                stroke="#dc2626"
                strokeWidth="2.2"
                markerEnd="url(#forceArrow)"
              />
              <rect x="80" y="191" width="230" height="19" rx="5" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
              <text x="195" y="203.5" textAnchor="middle" fontSize="9" fontWeight="800" fill="#065f46">
                Atom asing (Sn) menyekat gelongsoran → Lekukan kecil
              </text>
            </g>
          )}
        </g>
      )}

      {/* Clean Legend Footer outside magnifier box */}
      <g fontSize="9.5" fontWeight="700" fill="#334155" transform="translate(0, 232)">
        <circle cx="38" cy="4" r="6" fill="url(#cuAtomGrad)" stroke="#7c2d12" strokeWidth="1" />
        <text x="48" y="7.5">Atom Kuprum (Cu)</text>

        <circle cx="164" cy="4" r="7.5" fill="url(#snAtomGrad)" stroke="#1e3a8a" strokeWidth="1" />
        <text x="176" y="7.5">Atom Asing Timah (Sn)</text>

        <line x1="292" y1="4" x2="314" y2="4" stroke="#dc2626" strokeWidth="2.4" markerEnd="url(#forceArrow)" />
        <text x="320" y="7.5">Vektor Daya</text>
      </g>
    </svg>
  );
};
