import React from 'react';

export interface CopperOxideTubeSVGProps {
  /** Whether full Rajah 3.13 apparatus is assembled on retort stands (Steps 3+) */
  hasSetup: boolean;
  /** Whether CuO / Cu powder is inside the 12 cm glass tube (Steps 2+) */
  hasPowder: boolean;
  /** Oxidation/reduction state of powder: black CuO -> mixed -> reddish-brown Cu */
  powderStage: 'cuo' | 'mixed' | 'cu';
  /** Whether hydrogen gas is actively bubbling from Zn + HCl through the tube */
  hasGasFlow: boolean;
  /** Whether spirit lamp is lit and heating the CuO powder */
  isHeating: boolean;
  /** Whether condensed water droplets appear inside the cool left end of the tube */
  hasCondensation: boolean;
  /** Electronic balance state */
  balanceMode: 'idle' | 'empty' | 'withCuO' | 'repeat1' | 'repeat2' | 'repeat3';
  currentMass: number;
}

export const CopperOxideTubeSVG: React.FC<CopperOxideTubeSVGProps> = ({
  hasSetup,
  hasPowder,
  powderStage,
  hasGasFlow,
  isHeating,
  hasCondensation,
  balanceMode,
  currentMass,
}) => {
  const displayMassText =
    balanceMode === 'idle' ? '0.00 g' : `${currentMass.toFixed(2)} g`;

  const balanceTitle =
    balanceMode === 'idle'
      ? 'Sedia Menimbang'
      : balanceMode === 'empty'
      ? 'Salur kaca (12 cm)'
      : balanceMode === 'withCuO'
      ? 'Salur kaca + CuO'
      : balanceMode === 'repeat1'
      ? 'Timbangan #1'
      : balanceMode === 'repeat2'
      ? 'Timbangan #2'
      : 'Timbangan #3 (Tetap)';

  const powderLabel =
    powderStage === 'cu'
      ? 'Kuprum (perang)'
      : powderStage === 'mixed'
      ? 'CuO + Cu (sebahagian)'
      : 'Serbuk kuprum(II) oksida';

  return (
    <svg
      viewBox="0 0 640 245"
      className="w-full h-auto max-h-[196px] select-none mx-auto"
      role="img"
      aria-label="Susunan Radas Rajah 3.13: Menentukan Formula Empirik Kuprum(II) Oksida"
    >
      <defs>
        <linearGradient id="cuoGlassGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.65" />
          <stop offset="38%" stopColor="#ffffff" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="rubberStopperGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9a3412" />
          <stop offset="50%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#9a3412" />
        </linearGradient>
        <linearGradient id="woodBlockGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <radialGradient id="cuoHeatGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fb923c" stopOpacity="0.65" />
          <stop offset="60%" stopColor="#f97316" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Bench horizon line */}
      <line x1="12" y1="226" x2="478" y2="226" stroke="#cbd5e1" strokeWidth="1.6" />

      {/* LEFT SIDE LABELS FOR RAJAH 3.13 */}
      <g fontSize="9.5" fontWeight="700" fill="#334155" opacity={hasSetup ? 1 : 0.32}>
        {/* Lubang udara */}
        <text x="62" y="84" textAnchor="end">Lubang udara</text>
        <line x1="65" y1="81" x2="77" y2="85" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="77" cy="85" r="1.8" fill="#475569" />

        {/* Salur kaca (12 cm) vertical inside water */}
        <text x="62" y="132" textAnchor="end">Salur kaca</text>
        <text x="62" y="142" textAnchor="end">(12 cm)</text>
        <line x1="65" y1="133" x2="90" y2="133" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="90" cy="133" r="1.8" fill="#475569" />

        {/* Air */}
        <text x="62" y="188" textAnchor="end">Air</text>
        <line x1="65" y1="185" x2="78" y2="185" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="78" cy="185" r="1.8" fill="#475569" />
      </g>

      {/* IDLE PLACEHOLDER BEFORE STEP 1 */}
      {!hasSetup && balanceMode === 'idle' && (
        <g>
          <rect
            x="118"
            y="46"
            width="284"
            height="164"
            rx="12"
            fill="#f8fafc"
            stroke="#cbd5e1"
            strokeWidth="1.6"
            strokeDasharray="6 4"
          />
          <text x="260" y="122" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#64748b">
            Klik Langkah 1 di sebelah kiri
          </text>
          <text x="260" y="140" textAnchor="middle" fontSize="10" fontWeight="600" fill="#94a3b8">
            Timbang Salur Kaca (12 cm) Kosong
          </text>
        </g>
      )}

      {/* PRE-ASSEMBLY GLASS TUBE ON PREP MAT (STEPS 1–2) */}
      {!hasSetup && (balanceMode === 'empty' || balanceMode === 'withCuO') && (
        <g transform="translate(32, 74)">
          <rect
            x="84"
            y="62"
            width="256"
            height="34"
            rx="8"
            fill="#f8fafc"
            stroke="#cbd5e1"
            strokeWidth="1.2"
          />
          {/* Horizontal glass combustion tube */}
          <rect
            x="108"
            y="34"
            width="206"
            height="16"
            rx="3"
            fill="url(#cuoGlassGrad)"
            stroke="#475569"
            strokeWidth="1.6"
          />
          <line x1="112" y1="38" x2="310" y2="38" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.8" />
          <text x="211" y="23" textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">
            Salur kaca (12 cm)
          </text>

          {hasPowder && (
            <g>
              <path
                d="M 190 49 Q 202 39 212 42 Q 222 38 234 49 Z"
                fill="#1e293b"
                stroke="#0f172a"
                strokeWidth="1"
              />
              <text x="212" y="83" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b">
                Serbuk kuprum(II) oksida (hitam)
              </text>
            </g>
          )}
          {!hasPowder && (
            <text x="211" y="83" textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748b">
              Salur kaca bersih &amp; kering ditimbang
            </text>
          )}
        </g>
      )}

      {/* FULL RAJAH 3.13 ASSEMBLED APPARATUS (STEPS 3+) */}
      {hasSetup && (
        <g>
          {/* LEFT BOILING TUBE: Water Trap (2/3 full) */}
          <g>
            {/* Water fill */}
            <path
              d="M 79 144 L 79 208 Q 79 221 94 221 Q 109 221 109 208 L 109 144 Z"
              fill="#bae6fd"
              fillOpacity="0.65"
            />
            <ellipse cx="94" cy="144" rx="15" ry="2.2" fill="#7dd3fc" fillOpacity="0.7" />
            {/* Boiling tube glass wall */}
            <path
              d="M 78 92 L 78 208 Q 78 222 94 222 Q 110 222 110 208 L 110 92"
              fill="none"
              stroke="#475569"
              strokeWidth="1.8"
            />
            {/* Rubber stopper with left air vent hole */}
            <path
              d="M 76 81 L 112 81 L 109 96 L 79 96 Z"
              fill="url(#rubberStopperGrad)"
              stroke="#7c2d12"
              strokeWidth="1.2"
            />
            {/* Air vent notch in stopper */}
            <rect x="76" y="84" width="6" height="4" rx="1" fill="#f8fafc" stroke="#7c2d12" strokeWidth="0.9" />

            {/* Delivery glass tube dipping into water & curving right */}
            <path
              d="M 94 198 L 94 56 Q 94 45 105 45 L 122 45"
              fill="none"
              stroke="#64748b"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M 94 198 L 94 56 Q 94 45 105 45 L 122 45"
              fill="none"
              stroke="#e0f2fe"
              strokeWidth="2.8"
              strokeLinecap="round"
            />

            {/* Salur getah left connector sleeve */}
            <rect x="112" y="40.5" width="14" height="9" rx="2" fill="#fb923c" stroke="#9a3412" strokeWidth="1.1" />
            <text x="108" y="31" textAnchor="end" fontSize="9.5" fontWeight="700" fill="#334155">
              Salur getah
            </text>
            <line x1="109" y1="33" x2="117" y2="41" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />

            {/* Escaping H2 bubbles in water when flowing */}
            {hasGasFlow && (
              <g fill="#ffffff" stroke="#0284c7" strokeWidth="0.9">
                <circle cx="94" cy="186" r="2.6">
                  <animate attributeName="cy" values="194;148" dur="1.1s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.95;0.2" dur="1.1s" repeatCount="indefinite" />
                </circle>
                <circle cx="98" cy="172" r="2.2">
                  <animate attributeName="cy" values="190;146" dur="0.9s" begin="0.35s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0.15" dur="0.9s" begin="0.35s" repeatCount="indefinite" />
                </circle>
                <circle cx="90" cy="164" r="2">
                  <animate attributeName="cy" values="184;147" dur="1.0s" begin="0.65s" repeatCount="indefinite" />
                </circle>
              </g>
            )}
          </g>

          {/* HORIZONTAL COMBUSTION TUBE (Salur kaca 12 cm, x=126..328, y=38..52) */}
          <g>
            {isHeating && (
              <ellipse cx="226" cy="45" rx="34" ry="18" fill="url(#cuoHeatGlow)">
                <animate attributeName="opacity" values="0.65;1;0.65" dur="0.6s" repeatCount="indefinite" />
              </ellipse>
            )}

            <rect
              x="126"
              y="38"
              width="202"
              height="14"
              rx="2"
              fill="url(#cuoGlassGrad)"
              stroke="#475569"
              strokeWidth="1.6"
            />
            <line x1="130" y1="41" x2="324" y2="41" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.8" />

            {/* Powder inside tube */}
            {hasPowder && (
              <g>
                {powderStage === 'cuo' && (
                  <path
                    d="M 206 51 Q 218 42 227 44 Q 236 41 247 51 Z"
                    fill="#1e293b"
                    stroke="#0f172a"
                    strokeWidth="0.9"
                  />
                )}
                {powderStage === 'mixed' && (
                  <g>
                    <path d="M 206 51 Q 218 42 227 44 Q 236 41 247 51 Z" fill="#7c2d12" stroke="#451a03" strokeWidth="0.9" />
                    <circle cx="220" cy="47" r="2.2" fill="#1e293b" />
                    <circle cx="233" cy="48" r="2" fill="#1e293b" />
                    <circle cx="226" cy="46" r="1.7" fill="#d97706" />
                  </g>
                )}
                {powderStage === 'cu' && (
                  <g>
                    <path
                      d="M 206 51 Q 218 42 227 44 Q 236 41 247 51 Z"
                      fill="#c2410c"
                      stroke="#7c2d12"
                      strokeWidth="0.9"
                    />
                    <path d="M 212 49 Q 225 44 240 49" stroke="#fb923c" strokeWidth="1.1" fill="none" />
                  </g>
                )}
              </g>
            )}

            {/* Condensed water droplets at cooler left end */}
            {hasCondensation && (
              <g>
                <g fill="#38bdf8" fillOpacity="0.85" stroke="#0284c7" strokeWidth="0.7">
                  <circle cx="144" cy="41.5" r="1.7" />
                  <circle cx="151" cy="49.5" r="1.9" />
                  <circle cx="159" cy="41.5" r="1.5" />
                  <circle cx="166" cy="49.5" r="1.6" />
                </g>
                <text x="155" y="70" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0369a1">
                  Titisan air
                </text>
                <line x1="155" y1="61" x2="155" y2="52" stroke="#0284c7" strokeWidth="0.9" strokeDasharray="2 1.5" />
              </g>
            )}

            {/* H2 flow indicator inside tube */}
            {hasGasFlow && (
              <g>
                <text x="284" y="48" fontSize="8" fontWeight="800" fill="#0284c7">
                  ← H₂
                </text>
                <text x="174" y="48" fontSize="8" fontWeight="800" fill="#0284c7">
                  ← H₂
                </text>
              </g>
            )}

            {/* Top labels */}
            <text x="172" y="18" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#334155">
              Salur kaca (12 cm)
            </text>
            <line x1="172" y1="21" x2="172" y2="38" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="172" cy="38" r="1.8" fill="#475569" />

            <text x="266" y="18" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={powderStage === 'cu' ? '#b45309' : '#334155'}>
              {powderLabel}
            </text>
            <line x1="252" y1="21" x2="232" y2="43" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="232" cy="43" r="1.8" fill="#475569" />
          </g>

          {/* WOODEN BLOCK & SPIRIT LAMP (centered under x=226) */}
          <g>
            {/* Wooden block (Bongkah kayu) */}
            <rect
              x="176"
              y="148"
              width="100"
              height="74"
              rx="3"
              fill="url(#woodBlockGrad)"
              stroke="#78350f"
              strokeWidth="1.5"
            />
            <path d="M 184 162 Q 226 156 268 162" fill="none" stroke="#92400e" strokeWidth="1" opacity="0.6" />
            <path d="M 184 185 Q 226 192 268 185" fill="none" stroke="#92400e" strokeWidth="1" opacity="0.6" />
            <path d="M 184 208 Q 226 202 268 208" fill="none" stroke="#92400e" strokeWidth="1" opacity="0.6" />
            <text x="226" y="238" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#334155">
              Bongkah kayu
            </text>

            {/* Spirit lamp glass body */}
            <path
              d="M 206 112 L 246 112 L 253 139 Q 254 148 244 148 L 208 148 Q 198 148 199 139 Z"
              fill="#f8fafc"
              stroke="#475569"
              strokeWidth="1.5"
            />
            {/* Ethanol inside spirit lamp */}
            <path
              d="M 202 126 L 250 126 L 252 139 Q 253 147 244 147 L 208 147 Q 199 147 200 139 Z"
              fill="#bae6fd"
              fillOpacity="0.75"
            />
            {/* Wick & metal neck */}
            <rect x="218" y="104" width="16" height="8" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="1.2" />
            <line x1="226" y1="95" x2="226" y2="142" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />

            {/* Etanol label cleanly placed right of spirit lamp */}
            <text x="292" y="138" textAnchor="start" fontSize="9.5" fontWeight="700" fill="#334155">
              Etanol
            </text>
            <line x1="244" y1="135" x2="288" y2="135" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="244" cy="135" r="1.8" fill="#475569" />

            {/* Spirit lamp flame */}
            {isHeating && (
              <g>
                <path
                  d="M 226 56 C 237 72, 234 94, 226 95 C 218 94, 215 72, 226 56 Z"
                  fill="#fb923c"
                  fillOpacity="0.92"
                >
                  <animate attributeName="opacity" values="0.85;1;0.82" dur="0.35s" repeatCount="indefinite" />
                </path>
                <path d="M 226 68 C 231 78, 230 93, 226 94 C 222 93, 221 78, 226 68 Z" fill="#fef08a" />
                <text x="242" y="84" fontSize="9.5" fontWeight="800" fill="#dc2626">
                  Panaskan
                </text>
              </g>
            )}
          </g>

          {/* RIGHT BOILING TUBE: Hydrogen Generator (Ketulan zink + HCl 1.0 mol dm-3, 1/3 full) */}
          <g>
            {/* HCl acid 1/3 full */}
            <path
              d="M 349 175 L 349 208 Q 349 221 364 221 Q 379 221 379 208 L 379 175 Z"
              fill="#e0f2fe"
              fillOpacity="0.75"
            />
            <ellipse cx="364" cy="175" rx="15" ry="2.2" fill="#bae6fd" fillOpacity="0.8" />

            {/* Zinc granules at bottom */}
            <g fill="#64748b" stroke="#334155" strokeWidth="0.9">
              <circle cx="356" cy="213" r="3.4" />
              <circle cx="364" cy="215" r="3.8" />
              <circle cx="372" cy="212" r="3.3" />
              <circle cx="360" cy="208" r="3" />
              <circle cx="368" cy="208" r="2.8" />
            </g>

            {/* Boiling tube glass wall */}
            <path
              d="M 348 92 L 348 208 Q 348 222 364 222 Q 380 222 380 208 L 380 92"
              fill="none"
              stroke="#475569"
              strokeWidth="1.8"
            />
            {/* Rubber stopper */}
            <path
              d="M 346 81 L 382 81 L 379 96 L 349 96 Z"
              fill="url(#rubberStopperGrad)"
              stroke="#7c2d12"
              strokeWidth="1.2"
            />

            {/* Salur kaca (10 cm) bending left into Salur getah */}
            <path
              d="M 364 102 L 364 56 Q 364 45 352 45 L 332 45"
              fill="none"
              stroke="#64748b"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M 364 102 L 364 56 Q 364 45 352 45 L 332 45"
              fill="none"
              stroke="#e0f2fe"
              strokeWidth="2.8"
              strokeLinecap="round"
            />

            {/* Salur getah right connector sleeve */}
            <rect x="326" y="40.5" width="14" height="9" rx="2" fill="#fb923c" stroke="#9a3412" strokeWidth="1.1" />

            {/* H2 effervescence bubbles from Zn granules */}
            {hasGasFlow && (
              <g fill="#ffffff" stroke="#0284c7" strokeWidth="0.9">
                <circle cx="358" cy="198" r="2.1">
                  <animate attributeName="cy" values="208;176" dur="0.85s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.95;0.1" dur="0.85s" repeatCount="indefinite" />
                </circle>
                <circle cx="366" cy="190" r="2.3">
                  <animate attributeName="cy" values="209;176" dur="0.75s" begin="0.3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.95;0.1" dur="0.75s" begin="0.3s" repeatCount="indefinite" />
                </circle>
                <circle cx="371" cy="196" r="1.8">
                  <animate attributeName="cy" values="206;177" dur="0.95s" begin="0.55s" repeatCount="indefinite" />
                </circle>
              </g>
            )}

            {/* Right labels cleanly clear of Electronic Balance (x >= 498) */}
            <g fontSize="9.5" fontWeight="700" fill="#334155">
              <text x="394" y="64">Salur kaca</text>
              <text x="394" y="74">(10 cm)</text>
              <line x1="366" y1="67" x2="391" y2="67" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
              <circle cx="366" cy="67" r="1.8" fill="#475569" />

              <text x="394" y="185">Asid hidroklorik</text>
              <text x="394" y="195">1.0 mol dm⁻³</text>
              <line x1="378" y1="188" x2="391" y2="188" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
              <circle cx="378" cy="188" r="1.8" fill="#475569" />

              <text x="394" y="216">Ketulan zink</text>
              <line x1="374" y1="213" x2="391" y2="213" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
              <circle cx="374" cy="213" r="1.8" fill="#475569" />
            </g>
          </g>
        </g>
      )}

      {/* FAR RIGHT: DIGITAL ELECTRONIC BALANCE CARD (x=496..630) */}
      <g transform="translate(496, 48)">
        <rect x="0" y="0" width="134" height="124" rx="11" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.4" />
        <text x="67" y="18" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#475569">
          Penimbang Elektronik
        </text>
        <text x="67" y="31" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0369a1">
          {balanceTitle}
        </text>

        {/* Weighing pan */}
        <rect x="30" y="64" width="74" height="5" rx="2" fill="#94a3b8" />
        <rect x="55" y="69" width="24" height="5" fill="#64748b" />

        {/* Miniature 12 cm glass combustion tube resting on weighing pan */}
        {balanceMode !== 'idle' && (
          <g transform="translate(34, 52)">
            <rect x="0" y="2" width="66" height="8" rx="1.5" fill="#e0f2fe" stroke="#475569" strokeWidth="1.2" />
            {balanceMode !== 'empty' && (
              <path
                d="M 24 9 Q 33 4 42 9 Z"
                fill={
                  balanceMode === 'withCuO'
                    ? '#1e293b'
                    : balanceMode === 'repeat1'
                    ? '#7c2d12'
                    : '#c2410c'
                }
              />
            )}
          </g>
        )}

        {/* Digital Base & Readout */}
        <rect x="12" y="74" width="110" height="39" rx="6" fill="#1e293b" />
        <rect x="20" y="81" width="94" height="25" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
        <text
          x="67"
          y="98"
          textAnchor="middle"
          fontSize="13.5"
          fontWeight="800"
          fontFamily="monospace"
          fill={balanceMode === 'repeat3' ? '#34d399' : '#38bdf8'}
        >
          {displayMassText}
        </text>
      </g>
    </svg>
  );
};
