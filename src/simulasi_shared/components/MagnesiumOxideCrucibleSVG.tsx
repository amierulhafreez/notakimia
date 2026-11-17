import React from 'react';

export interface MagnesiumOxideCrucibleSVGProps {
  hasSetup: boolean; // Apparatus placed on tripod / bench ready
  hasMgRibbon: boolean;
  isPolished: boolean;
  lidState: 'off' | 'closed' | 'ajar'; // ajar = penyepit lifting lid slightly
  isHeating: boolean;
  burnStage: 0 | 1 | 2 | 3; // 0: unreacted metal, 1: igniting bright glow, 2: partial white ash, 3: complete white MgO
  hasTongs: boolean;
  balanceMode: 'idle' | 'empty' | 'withMg' | 'repeat1' | 'repeat2' | 'repeat3';
  currentMass: number;
}

export const MagnesiumOxideCrucibleSVG: React.FC<MagnesiumOxideCrucibleSVGProps> = ({
  hasSetup,
  hasMgRibbon,
  isPolished,
  lidState,
  isHeating,
  burnStage,
  hasTongs,
  balanceMode,
  currentMass,
}) => {
  const balanceTitle =
    balanceMode === 'empty'
      ? 'Mangkuk + Penutup'
      : balanceMode === 'withMg'
      ? '+ Pita Mg (Awal)'
      : balanceMode === 'repeat1'
      ? 'Timbangan #1'
      : balanceMode === 'repeat2'
      ? 'Timbangan #2'
      : balanceMode === 'repeat3'
      ? 'Timbangan #3 (Tetap)'
      : 'Penimbang Elektronik';

  const displayMassText =
    balanceMode === 'idle' ? '0.00 g' : `${currentMass.toFixed(2)} g`;

  // Lid offset/angle
  const lidTransform =
    lidState === 'closed'
      ? 'translate(0, 0)'
      : lidState === 'ajar'
      ? 'translate(10, -13) rotate(-14 238 80)'
      : 'translate(92, 134)'; // resting neatly beside stand when completely off

  return (
    <svg
      viewBox="0 0 620 242"
      className="w-full max-h-[192px] h-auto select-none"
      aria-label="Rajah 3.12 Susunan Radas Formula Empirik Magnesium Oksida"
    >
      <defs>
        <linearGradient id="porcelainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="lidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <radialGradient id="mgFlashGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="40%" stopColor="#fef08a" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Lab Bench */}
      <line x1="110" y1="231" x2="455" y2="231" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />

      {/* LEFT POINTER LABELS (align end at x = 148) */}
      <g fontSize="10" fontWeight="700" fill="#334155">
        {/* Penutup */}
        <g opacity={hasSetup || balanceMode !== 'idle' ? 1 : 0.35}>
          <text x="148" y="64" textAnchor="end">Penutup</text>
          <line
            x1="153"
            y1="61"
            x2={lidState === 'off' ? 305 : 226}
            y2={lidState === 'off' ? 205 : lidState === 'ajar' ? 66 : 74}
            stroke="#64748b"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
        </g>

        {/* Mangkuk pijar */}
        <g opacity={hasSetup || balanceMode !== 'idle' ? 1 : 0.35}>
          <text x="148" y="102" textAnchor="end">Mangkuk pijar</text>
          <line x1="153" y1="99" x2="205" y2="99" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="205" cy="99" r="2" fill="#475569" />
        </g>

        {/* Alas segi tiga tanah liat */}
        <g opacity={hasSetup ? 1 : 0.35}>
          <text x="148" y="138" textAnchor="end">Alas segi tiga tanah liat</text>
          <line x1="153" y1="135" x2="191" y2="135" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="191" cy="135" r="2" fill="#475569" />
        </g>

        {/* Tungku kaki tiga */}
        <g opacity={hasSetup ? 1 : 0.35}>
          <text x="148" y="182" textAnchor="end">Tungku kaki tiga</text>
          <line x1="153" y1="179" x2="182" y2="179" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="182" cy="179" r="2" fill="#475569" />
        </g>
      </g>

      {/* CENTER APPARATUS ZONE (cx = 238) */}
      {/* Show crucible on tripod if hasSetup, or resting ready */}
      {!hasSetup && balanceMode === 'idle' && (
        <g>
          <rect
            x="160"
            y="50"
            width="168"
            height="170"
            rx="12"
            fill="#f8fafc"
            stroke="#cbd5e1"
            strokeWidth="1.6"
            strokeDasharray="6 4"
          />
          <text x="244" y="128" textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b">
            Klik Langkah 1 di sebelah kiri
          </text>
          <text x="244" y="145" textAnchor="middle" fontSize="10" fontWeight="600" fill="#94a3b8">
            Timbang Mangkuk Pijar &amp; Penutup
          </text>
        </g>
      )}

      {/* Tripod & Pipe-Clay Triangle when setup mounted */}
      {hasSetup && (
        <g>
          {/* Tripod Stand */}
          <line x1="192" y1="138" x2="168" y2="230" stroke="#334155" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="284" y1="138" x2="308" y2="230" stroke="#334155" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="238" y1="138" x2="238" y2="226" stroke="#64748b" strokeWidth="2.8" strokeOpacity="0.4" strokeLinecap="round" />
          <line x1="184" y1="138" x2="292" y2="138" stroke="#1e293b" strokeWidth="4.6" strokeLinecap="round" />

          {/* Pipe-clay triangle */}
          <rect x="192" y="133" width="92" height="5" rx="2.5" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.2" />

          {/* Bunsen Burner under crucible */}
          <rect x="218" y="220" width="40" height="10" rx="2" fill="#334155" />
          <rect x="233" y="176" width="10" height="44" rx="2" fill="#64748b" />
          <rect x="231" y="210" width="14" height="6" rx="1.5" fill="#475569" />

          {/* Bunsen Flame + Red Heat Arrow ("Panaskan") per Rajah 3.12 */}
          {isHeating ? (
            <g>
              <path d="M 238 139 C 251 153, 248 175, 238 176 C 228 175, 225 153, 238 139 Z" fill="#38bdf8" fillOpacity="0.9">
                <animate attributeName="opacity" values="0.85;1;0.82" dur="0.4s" repeatCount="indefinite" />
              </path>
              <path d="M 238 150 C 244 159, 243 174, 238 175 C 233 174, 232 159, 238 150 Z" fill="#fef08a" />
              {/* Upward heat label cleanly aligned outside tripod leg */}
              <line
                x1="248"
                y1="162"
                x2="318"
                y2="162"
                stroke="#dc2626"
                strokeWidth="1"
                strokeDasharray="3 2"
              />
              <text x="322" y="165" fontSize="10.5" fontWeight="800" fill="#dc2626">
                Panaskan
              </text>
            </g>
          ) : (
            <g opacity="0.78">
              <line x1="238" y1="170" x2="238" y2="149" stroke="#dc2626" strokeWidth="2.4" strokeLinecap="round" />
              <polygon points="238,143 233.5,152 242.5,152" fill="#dc2626" />
              <line
                x1="244"
                y1="162"
                x2="318"
                y2="162"
                stroke="#dc2626"
                strokeWidth="1"
                strokeDasharray="3 2"
              />
              <circle cx="244" cy="162" r="2" fill="#dc2626" />
              <text x="322" y="165" fontSize="10" fontWeight="700" fill="#dc2626">
                Panaskan
              </text>
            </g>
          )}
        </g>
      )}

      {/* Crucible + Ribbon/Ash (drawn on tripod if hasSetup, or on prep pad in Steps 1–2) */}
      {(hasSetup || balanceMode === 'empty' || balanceMode === 'withMg') && (
        <g transform={hasSetup ? 'translate(0, 0)' : 'translate(0, 88)'}>
          {/* Crucible interior cutout shadow */}
          <ellipse cx="238" cy="82" rx="35" ry="6" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />

          {/* Coiled Magnesium Ribbon OR White Magnesium Oxide Powder inside crucible */}
          {hasMgRibbon && (
            <g>
              {burnStage < 3 ? (
                /* Coiled ribbon: dull grey before polish, bright silver after sandpaper */
                <g
                  fill="none"
                  stroke={isPolished ? '#475569' : '#78716c'}
                  strokeWidth="2.8"
                  strokeLinecap="round"
                >
                  <path d="M 218 82 C 218 73, 229 73, 229 82 C 229 88, 223 88, 224 81 C 226 73, 238 73, 238 82 C 238 88, 232 88, 233 81 C 235 73, 248 73, 248 82 C 248 88, 242 88, 243 81 C 245 73, 258 73, 258 82" />
                  {isPolished && (
                    <path
                      d="M 220 79 C 224 75, 235 75, 246 79"
                      stroke="#f8fafc"
                      strokeWidth="1.2"
                    />
                  )}
                </g>
              ) : (
                /* Completely oxidized white MgO ash mound */
                <g>
                  <path
                    d="M 214 83 Q 228 73 238 76 Q 248 72 262 83 Z"
                    fill="#ffffff"
                    stroke="#cbd5e1"
                    strokeWidth="1.2"
                  />
                  <circle cx="230" cy="80" r="2.5" fill="#f1f5f9" />
                  <circle cx="245" cy="79" r="3" fill="#f8fafc" />
                </g>
              )}

              {/* Dazzling bright combustion glow & minimal white fumes */}
              {burnStage === 1 && isHeating && (
                <g>
                  <circle cx="238" cy="78" r="22" fill="url(#mgFlashGlow)">
                    <animate attributeName="r" values="18;24;19" dur="0.35s" repeatCount="indefinite" />
                  </circle>
                  {/* Tiny white smoke wisps (MgO fumes) */}
                  <path d="M 232 66 Q 226 54 234 44" fill="none" stroke="#cbd5e1" strokeWidth="2.2" strokeLinecap="round" opacity="0.75">
                    <animate attributeName="opacity" values="0.8;0.2;0.8" dur="0.9s" repeatCount="indefinite" />
                  </path>
                  <path d="M 244 64 Q 250 52 243 41" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" opacity="0.75">
                    <animate attributeName="opacity" values="0.3;0.85;0.3" dur="0.9s" repeatCount="indefinite" />
                  </path>
                </g>
              )}
            </g>
          )}

          {/* Crucible Porcelain Wall (trapezoid with curved bottom) */}
          <path
            d="M 203 82 L 213 123 Q 215 133 226 133 L 250 133 Q 261 133 263 123 L 273 82 Q 238 89 203 82 Z"
            fill="url(#porcelainGrad)"
            stroke="#475569"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />

          {/* Porcelain Lid (Penutup) */}
          <g transform={lidTransform}>
            <path
              d="M 199 82 Q 238 71 277 82 Q 238 87 199 82 Z"
              fill="url(#lidGrad)"
              stroke="#475569"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <circle cx="238" cy="73.5" r="3.5" fill="#f8fafc" stroke="#475569" strokeWidth="1.4" />
          </g>

          {/* Tongs (Penyepit) when lifting/adjusting lid in Step 4 */}
          {hasTongs && (
            <g stroke="#475569" strokeWidth="2.4" fill="none" strokeLinecap="round">
              <path d="M 248 63 L 312 36" />
              <path d="M 252 68 L 315 44" />
              <circle cx="286" cy="51" r="2.8" fill="#94a3b8" stroke="#334155" strokeWidth="1.2" />
            </g>
          )}
        </g>
      )}

      {/* RIGHT POINTER LABELS */}
      <g fontSize="10" fontWeight="700" fill="#334155">
        <g opacity={hasMgRibbon ? 1 : 0.35}>
          <text x="322" y={hasSetup ? 82 : 170}>
            {burnStage >= 3 ? 'Magnesium oksida (putih)' : 'Pita magnesium'}
          </text>
          <line
            x1="256"
            y1={hasSetup ? 80 : 168}
            x2="318"
            y2={hasSetup ? 80 : 168}
            stroke="#64748b"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
          <circle cx="256" cy={hasSetup ? 80 : 168} r="2" fill="#475569" />
        </g>

        {hasTongs && (
          <g>
            <text x="322" y="42" fill="#0369a1">Penyepit (buka sedikit)</text>
          </g>
        )}

        {burnStage === 1 && isHeating && (
          <g>
            <text x="322" y="59" fill="#b45309">Wasap putih MgO (minimumkan)</text>
          </g>
        )}
      </g>

      {/* FAR RIGHT: DIGITAL ELECTRONIC BALANCE CARD (x=482..612) */}
      <g transform="translate(480, 48)">
        <rect x="0" y="0" width="132" height="124" rx="11" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.4" />
        <text x="66" y="18" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#475569">
          Penimbang Elektronik
        </text>
        <text x="66" y="31" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0369a1">
          {balanceTitle}
        </text>

        {/* Weighing pan */}
        <rect x="30" y="64" width="72" height="5" rx="2" fill="#94a3b8" />
        <rect x="54" y="69" width="24" height="5" fill="#64748b" />

        {/* Miniature crucible on scale pan whenever weighed */}
        {balanceMode !== 'idle' && (
          <g transform="translate(50, 39)">
            <path d="M 4 7 L 8 24 L 24 24 L 28 7 Z" fill="#ffffff" stroke="#475569" strokeWidth="1.3" />
            <path d="M 2 7 Q 16 2 30 7 Z" fill="#e2e8f0" stroke="#475569" strokeWidth="1.2" />
            <circle cx="16" cy="3.5" r="1.8" fill="#f8fafc" stroke="#475569" strokeWidth="1" />
          </g>
        )}

        {/* Digital Base & Readout */}
        <rect x="12" y="74" width="108" height="39" rx="6" fill="#1e293b" />
        <rect x="20" y="81" width="92" height="25" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
        <text
          x="66"
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
