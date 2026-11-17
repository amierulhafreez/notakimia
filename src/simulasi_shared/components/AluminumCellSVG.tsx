import React from 'react';

interface Props {
  hasCryolite: boolean;
  forceHighHeat: boolean;
  isMolten: boolean;
  powerOn: boolean;
  canRunElectrolysis: boolean;
  tapOpen: boolean;
  anodeWearPercent: number;
  moltenAlLevel: number;
  collectedAluminum: number;
  operatingTemp: number;
}

export const AluminumCellSVG: React.FC<Props> = ({
  hasCryolite,
  forceHighHeat,
  isMolten,
  powerOn,
  canRunElectrolysis,
  tapOpen,
  anodeWearPercent,
  moltenAlLevel,
  collectedAluminum,
  operatingTemp,
}) => {
  const activelyConducting = powerOn && canRunElectrolysis && isMolten;
  const anodeCorrosionPx = (anodeWearPercent / 100) * 32;
  const alLayerHeight = moltenAlLevel > 0 ? Math.max(12, (moltenAlLevel / 100) * 30) : 0;

  return (
    <svg
      viewBox="0 0 700 400"
      className="w-full h-auto select-none"
      role="img"
      aria-label="Rajah 1.37 Sel Elektrolisis Pengekstrakan Aluminium"
    >
      <defs>
        <linearGradient id="alMoltenMix" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={hasCryolite ? '#fb923c' : '#ef4444'} stopOpacity="0.9" />
          <stop offset="100%" stopColor={hasCryolite ? '#ea580c' : '#b91c1c'} stopOpacity="0.96" />
        </linearGradient>
        <linearGradient id="alSolidBed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id="alPurePool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="alSteelShell" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="50%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="alCarbonLining" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <filter id="alGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Clean light diagram backdrop */}
      <rect x="0" y="0" width="700" height="400" rx="12" fill="#f8fafc" />

      {/* ================= POWER SUPPLY & BUSBAR WIRES ================= */}
      {/* DC Power Supply */}
      <rect x="18" y="14" width="118" height="44" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.8" />
      <text x="77" y="32" textAnchor="middle" fill="#f8fafc" fontSize="10.5" fontWeight="800">
        BEKALAN KUASA DC
      </text>
      <text
        x="77"
        y="48"
        textAnchor="middle"
        fill={activelyConducting ? '#4ade80' : powerOn ? '#fbbf24' : '#94a3b8'}
        fontSize="9.5"
        fontWeight="700"
      >
        {activelyConducting ? 'HIDUP (MENGALIR)' : powerOn ? 'HIDUP (TERSEKATA)' : 'MATI (OFF)'}
      </text>

      {/* Positive Busbar (+) -> right to 3rd anode hanger x=415 */}
      <path
        d="M 136 28 L 415 28"
        fill="none"
        stroke={activelyConducting ? '#ef4444' : '#94a3b8'}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="154" cy="28" r="8.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.2" />
      <text x="154" y="31.5" textAnchor="middle" fill="#ffffff" fontSize="11.5" fontWeight="900">
        +
      </text>

      {/* Negative Busbar (-) -> left wall then into carbon cathode shell */}
      <path
        d="M 18 44 L 10 44 L 10 318 L 104 318"
        fill="none"
        stroke={activelyConducting ? '#2563eb' : '#94a3b8'}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="182" r="8.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.2" />
      <text x="10" y="185.5" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="900">
        −
      </text>

      {/* Animated Electron Flow Dots (e⁻) when actively conducting */}
      {activelyConducting && (
        <g filter="url(#alGlow)">
          {/* Electrons leaving Anodes (+) -> DC (+) */}
          {[0, 0.75, 1.5].map((delay, i) => (
            <circle key={`e-pos-${i}`} r="3.2" fill="#facc15" stroke="#854d0e" strokeWidth="0.7">
              <animateMotion dur="2.2s" begin={`${delay}s`} repeatCount="indefinite" path="M 415 28 L 136 28" />
            </circle>
          ))}
          {/* Electrons flowing from DC (-) -> Katod (-) */}
          {[0, 0.85, 1.7].map((delay, i) => (
            <circle key={`e-neg-${i}`} r="3.2" fill="#facc15" stroke="#854d0e" strokeWidth="0.7">
              <animateMotion
                dur="2.5s"
                begin={`${delay}s`}
                repeatCount="indefinite"
                path="M 18 44 L 10 44 L 10 318 L 104 318"
              />
            </circle>
          ))}
          <text x="250" y="18" textAnchor="middle" fill="#b45309" fontSize="9.5" fontWeight="800">
            ← Aliran elektron (e⁻) ke terminal positif
          </text>
        </g>
      )}

      {/* ================= INDUSTRIAL HALL-HEROULT CELL TANK (x=96..500, y=122..346) ================= */}
      {/* Outer Steel Shell (Lapisan keluli) with right tapping hole cutaway */}
      <path
        d="M 96 122 L 96 346 L 500 346 L 500 312 L 552 312 L 552 292 L 500 292 L 500 122 L 484 122 L 484 330 L 112 330 L 112 122 Z"
        fill="url(#alSteelShell)"
        stroke="#1e293b"
        strokeWidth="1.8"
      />

      {/* Inner Carbon Cathode Lining (Katod daripada karbon) */}
      <path
        d="M 112 126 L 112 330 L 484 330 L 484 126 L 468 126 L 468 314 L 128 314 L 128 126 Z"
        fill="url(#alCarbonLining)"
        stroke="#0f172a"
        strokeWidth="1.5"
      />

      {/* Drainage / Tapping Spout Cutaway through right wall */}
      <rect x="468" y="294" width="84" height="16" fill="#e2e8f0" stroke="#334155" strokeWidth="1.4" />
      {tapOpen && moltenAlLevel > 5 ? (
        <rect x="468" y="296" width="84" height="12" fill="#cbd5e1" />
      ) : (
        <rect x="546" y="293" width="9" height="18" rx="2" fill="#334155" stroke="#0f172a" strokeWidth="1" />
      )}

      {/* Electrolyte Content: Molten Orange Bath OR Unmelted White Solid Al2O3 */}
      {isMolten ? (
        <g>
          <rect x="128" y="148" width="340" height="166" fill="url(#alMoltenMix)" />
          {/* Surface crust / boundary */}
          <line x1="128" y1="148" x2="468" y2="148" stroke="#fed7aa" strokeWidth="3" strokeDasharray="7 4" />
        </g>
      ) : (
        <g>
          <rect x="128" y="160" width="340" height="154" fill="url(#alSolidBed)" />
          <line x1="128" y1="160" x2="468" y2="160" stroke="#94a3b8" strokeWidth="2" />
          {/* Crystal blocks indicating unmelted Al2O3 */}
          <g fill="#ffffff" stroke="#94a3b8" strokeWidth="0.8" opacity="0.8">
            {[146, 184, 224, 266, 308, 350, 392, 434].map((bx, idx) => (
              <rect key={`s-${idx}`} x={bx} y={248 + (idx % 2) * 18} width="16" height="12" rx="2" />
            ))}
          </g>
          <text x="298" y="295" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="800">
            Al₂O₃ masih PEPEJAL pada 950 °C (Tiada ion bebas bergerak!)
          </text>
        </g>
      )}

      {/* Molten Aluminium Layer Sinking at Bottom */}
      {alLayerHeight > 0 && isMolten && (
        <g>
          <rect
            x="128"
            y={314 - alLayerHeight}
            width="340"
            height={alLayerHeight}
            fill="url(#alPurePool)"
          />
          <line
            x1="128"
            y1={314 - alLayerHeight}
            x2="468"
            y2={314 - alLayerHeight}
            stroke="#f8fafc"
            strokeWidth="1.2"
          />
        </g>
      )}

      {/* ================= 3 CARBON ANODE RODS & BLOCKS (x=195, 305, 415) ================= */}
      {[195, 305, 415].map((cx, idx) => {
        const blockTop = 104;
        const blockHeight = 112 - anodeCorrosionPx;
        const blockBottom = blockTop + blockHeight;
        return (
          <g key={`anode-${idx}`}>
            {/* Copper hanger clamp */}
            <rect x={cx - 5.5} y="28" width="11" height="78" fill="#b45309" stroke="#78350f" strokeWidth="1.3" />
            {/* Carbon Anode Block */}
            <rect
              x={cx - 30 + anodeCorrosionPx * 0.22}
              y={blockTop}
              width={60 - anodeCorrosionPx * 0.44}
              height={blockHeight}
              rx="4"
              fill="#0f172a"
              stroke="#475569"
              strokeWidth="1.6"
            />
            <text x={cx} y="138" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="900">
              +
            </text>
            {/* Eroded bottom pitted look when corroded */}
            {anodeWearPercent > 15 && (
              <path
                d={`M ${cx - 26 + anodeCorrosionPx * 0.22} ${blockBottom} q 10 -4 20 0 q 12 -5 24 0`}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.6"
                opacity="0.7"
              />
            )}

            {/* O2 / CO2 Rising Bubbles around anodes when actively conducting */}
            {activelyConducting && (
              <g>
                <circle cx={cx - 33} cy={blockBottom - 10} r="4.2" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.6">
                  <animate
                    attributeName="cy"
                    values={`${blockBottom - 6};126`}
                    dur={`${1.2 + idx * 0.15}s`}
                    repeatCount="indefinite"
                  />
                  <animate attributeName="opacity" values="0.95;0" dur={`${1.2 + idx * 0.15}s`} repeatCount="indefinite" />
                </circle>
                <circle cx={cx + 33} cy={blockBottom - 14} r="3.8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="0.6">
                  <animate
                    attributeName="cy"
                    values={`${blockBottom - 10};122`}
                    dur={`${1.05 + idx * 0.12}s`}
                    repeatCount="indefinite"
                  />
                  <animate attributeName="opacity" values="0.95;0" dur={`${1.05 + idx * 0.12}s`} repeatCount="indefinite" />
                </circle>
              </g>
            )}
          </g>
        );
      })}

      {/* ================= MOVING IONS (Al3+ & O2-) IN CLEAR LANES ================= */}
      {activelyConducting && (
        <g>
          {/* Al3+ ions moving downward to bottom Carbon Cathode (-) */}
          {[148, 250, 360, 448].map((ix, i) => (
            <g key={`ion-al-${i}`}>
              <circle cx={ix} cy="246" r="10.5" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="1.5">
                <animate attributeName="cy" values="232;278;232" dur={`${2.1 + i * 0.25}s`} repeatCount="indefinite" />
              </circle>
              <text x={ix} y="250" textAnchor="middle" fill="#1e3a8a" fontSize="8.5" fontWeight="800">
                Al³⁺
                <animate attributeName="y" values="236;282;236" dur={`${2.1 + i * 0.25}s`} repeatCount="indefinite" />
              </text>
            </g>
          ))}

          {/* O2- ions moving upward to bottom of Carbon Anodes (+) */}
          {[195, 305, 415].map((ox, i) => (
            <g key={`ion-o-${i}`}>
              <circle cx={ox} cy="245" r="10.5" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5">
                <animate attributeName="cy" values="262;226;262" dur={`${1.9 + i * 0.2}s`} repeatCount="indefinite" />
              </circle>
              <text x={ox} y="249" textAnchor="middle" fill="#991b1b" fontSize="8.5" fontWeight="800">
                O²⁻
                <animate attributeName="y" values="266;230;266" dur={`${1.9 + i * 0.2}s`} repeatCount="indefinite" />
              </text>
            </g>
          ))}
        </g>
      )}

      {/* ================= MOLTEN ALUMINIUM STREAM & COLLECTION LADLE ================= */}
      {tapOpen && moltenAlLevel > 5 && isMolten && (
        <path
          d="M 552 302 Q 574 304 576 348"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="8.5"
          strokeLinecap="round"
        />
      )}

      {/* Ladle / Collection Crucible (x=548..610, y=338..384) */}
      <path d="M 548 338 L 555 384 L 603 384 L 610 338 Z" fill="#475569" stroke="#1e293b" strokeWidth="1.8" />
      {collectedAluminum > 0 && (
        <rect
          x="556"
          y={382 - (collectedAluminum / 100) * 34}
          width="46"
          height={(collectedAluminum / 100) * 34}
          fill="#e2e8f0"
        />
      )}
      <text x="579" y="396" textAnchor="middle" fill="#334155" fontSize="9.5" fontWeight="700">
        Bekas Al ({Math.round(collectedAluminum)}%)
      </text>

      {/* ================= CLEAN NON-OVERLAPPING CALLOUT LABELS ================= */}
      {/* 1. Anod daripada karbon (+) — Top Right Pill */}
      <g>
        <rect x="472" y="16" width="194" height="25" rx="6" fill="#ffffff" stroke="#fca5a5" strokeWidth="1.2" />
        <text x="569" y="32.5" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="800">
          Anod daripada karbon (+)
        </text>
        <line x1="472" y1="30" x2="438" y2="112" stroke="#dc2626" strokeWidth="1.3" strokeDasharray="3 2" />
        <circle cx="438" cy="112" r="3" fill="#dc2626" />
      </g>

      {/* 2. Gas O2 + CO2 notification pill (Top Right below Anode label, never crosses copper clamps!) */}
      {activelyConducting && (
        <g>
          <rect x="472" y="48" width="214" height="32" rx="6" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.2" />
          <text x="579" y="61" textAnchor="middle" fill="#92400e" fontSize="9.5" fontWeight="800">
            ↑ Gas O₂ terhasil &amp; mengoksidakan
          </text>
          <text x="579" y="74" textAnchor="middle" fill="#92400e" fontSize="9.5" fontWeight="800">
            anod karbon (C + O₂ → CO₂)
          </text>
          <line x1="472" y1="68" x2="450" y2="128" stroke="#d97706" strokeWidth="1.2" strokeDasharray="3 2" />
          <circle cx="450" cy="128" r="2.8" fill="#d97706" />
        </g>
      )}

      {/* 3. Lapisan keluli — Left label cleanly placed in x=22..86 gap */}
      <g>
        <rect x="20" y="216" width="62" height="30" rx="5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.1" />
        <text x="51" y="229" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="800">
          Lapisan
        </text>
        <text x="51" y="241" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="800">
          keluli
        </text>
        <line x1="82" y1="231" x2="103" y2="231" stroke="#334155" strokeWidth="1.4" />
        <circle cx="103" cy="231" r="2.8" fill="#334155" />
      </g>

      {/* 4. Campuran leburan Al2O3 + kriolit — Mid Right Pill cleanly OUTSIDE tank wall */}
      <g>
        <rect x="516" y="152" width="172" height="52" rx="7" fill="#fff7ed" stroke="#fdba74" strokeWidth="1.2" />
        <text x="602" y="168" textAnchor="middle" fill="#9a3412" fontSize="10.5" fontWeight="800">
          Campuran Al₂O₃ {hasCryolite ? '+ kriolit' : '(tanpa kriolit)'}
        </text>
        <text x="602" y="182" textAnchor="middle" fill="#c2410c" fontSize="9.5" fontWeight="700">
          {isMolten ? 'Keadaan: Leburan' : 'Keadaan: Pepejal (belum lebur)'}
        </text>
        <text x="602" y="196" textAnchor="middle" fill="#7c2d12" fontSize="9.5" fontWeight="700">
          Suhu: {operatingTemp} °C {!hasCryolite && !forceHighHeat ? '(Perlu 2000 °C)' : ''}
        </text>
        {/* Leader line with white halo over wall */}
        <line x1="516" y1="178" x2="454" y2="178" stroke="#ffffff" strokeWidth="3.2" opacity="0.85" />
        <line x1="516" y1="178" x2="454" y2="178" stroke="#ea580c" strokeWidth="1.5" />
        <circle cx="454" cy="178" r="3" fill="#ea580c" />
      </g>

      {/* 5. Leburan aluminium mengalir keluar — Lower Right Pill cleanly ABOVE tap spout */}
      <g>
        <rect x="516" y="232" width="172" height="36" rx="7" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
        <text x="602" y="247" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="800">
          Leburan aluminium
        </text>
        <text x="602" y="260" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="800">
          mengalir keluar
        </text>
        <line x1="544" y1="268" x2="544" y2="292" stroke="#334155" strokeWidth="1.4" />
        <circle cx="544" cy="292" r="2.8" fill="#334155" />
      </g>

      {/* 6. Katod daripada karbon (-) — Bottom Left Pill */}
      <g>
        <rect x="108" y="362" width="178" height="25" rx="6" fill="#ffffff" stroke="#93c5fd" strokeWidth="1.2" />
        <text x="197" y="378.5" textAnchor="middle" fill="#1e3a8a" fontSize="10.5" fontWeight="800">
          Katod daripada karbon (−)
        </text>
        <line x1="197" y1="362" x2="197" y2="322" stroke="#ffffff" strokeWidth="3" opacity="0.8" />
        <line x1="197" y1="362" x2="197" y2="322" stroke="#1d4ed8" strokeWidth="1.4" />
        <circle cx="197" cy="322" r="3" fill="#1d4ed8" />
      </g>

      {/* 7. Leburan aluminium (Al) — Bottom Right Pill */}
      <g>
        <rect x="304" y="362" width="166" height="25" rx="6" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.2" />
        <text x="387" y="378.5" textAnchor="middle" fill="#1e293b" fontSize="10.5" fontWeight="800">
          Leburan aluminium (Al)
        </text>
        <line x1="387" y1="362" x2="387" y2="306" stroke="#ffffff" strokeWidth="3" opacity="0.8" />
        <line x1="387" y1="362" x2="387" y2="306" stroke="#334155" strokeWidth="1.4" />
        <circle cx="387" cy="306" r="3" fill="#334155" />
      </g>
    </svg>
  );
};
