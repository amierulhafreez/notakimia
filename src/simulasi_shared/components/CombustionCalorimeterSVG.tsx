import React from 'react';

export type AlcoholId = 'metanol' | 'etanol' | 'propanol' | 'butanol';

export interface CombustionCalorimeterSVGProps {
  hasCanAndWater: boolean;
  hasThermometer: boolean;
  hasLamp: boolean;
  isBurning: boolean;
  isFinished: boolean;
  temperature: number;
  alcoholFormula: string;
  alcoholName: string;
  sootLevel: 0 | 1 | 2 | 3; // 0: none/minimal, 1: slight, 2: moderate, 3: heavy
  burnProgress: number; // 0..1
  massInitial: number;
  massFinal: number;
  massDisplayMode: 'idle' | 'initial' | 'burning' | 'final';
}

export const CombustionCalorimeterSVG: React.FC<CombustionCalorimeterSVGProps> = ({
  hasCanAndWater,
  hasThermometer,
  hasLamp,
  isBurning,
  isFinished,
  temperature,
  alcoholFormula,
  alcoholName,
  sootLevel,
  burnProgress,
  massInitial,
  massFinal,
  massDisplayMode,
}) => {
  // Thermometer mercury height: 25°C -> y=124, 65°C -> y=44
  const tempFraction = Math.max(0, Math.min(1, (temperature - 25) / 40));
  const mercuryTopY = 124 - tempFraction * 80;

  // Alcohol liquid level inside spirit lamp drops slightly as fuel burns
  const fuelFraction = Math.max(0.28, 0.72 - burnProgress * 0.28);
  const fuelHeight = 20 * fuelFraction;
  const fuelTopY = 206 - fuelHeight;

  // Soot opacity / darkness under copper can grows with burnProgress & sootLevel
  const sootProgress = isFinished ? 1 : isBurning ? burnProgress : 0;
  const maxSootOpacity =
    sootLevel === 0 ? 0.12 : sootLevel === 1 ? 0.45 : sootLevel === 2 ? 0.72 : 0.92;
  const sootOpacity = sootProgress * maxSootOpacity;

  // Displayed scale mass
  const scaleText =
    massDisplayMode === 'initial'
      ? `${massInitial.toFixed(2)} g`
      : massDisplayMode === 'final'
      ? `${massFinal.toFixed(2)} g`
      : massDisplayMode === 'burning'
      ? `${(massInitial - (massInitial - massFinal) * burnProgress).toFixed(2)} g`
      : '0.00 g';

  const scaleBadgeLabel =
    massDisplayMode === 'initial'
      ? 'Jisim Awal (m₁)'
      : massDisplayMode === 'final'
      ? 'Jisim Akhir (m₂)'
      : massDisplayMode === 'burning'
      ? 'Membakar...'
      : 'Penimbang';

  // Center X = 238
  return (
    <svg
      viewBox="0 0 620 242"
      className="w-full max-h-[188px] h-auto select-none"
      aria-label="Rajah 3.13 Susunan Radas Haba Pembakaran Alkohol"
    >
      <defs>
        <linearGradient id="copperGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="35%" stopColor="#f59e0b" />
          <stop offset="70%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
        <linearGradient id="waterGradComb" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.88" />
        </linearGradient>
        <linearGradient id="woodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d6a77a" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="50%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
      </defs>

      {/* Bench surface */}
      <line x1="112" y1="233" x2="366" y2="233" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />

      {/* LEFT SIDE: APPARATUS LABELS (x <= 116) */}
      <g fontSize="10" fontWeight="700" fill="#334155">
        <g opacity={hasThermometer ? 1 : 0.35}>
          <text x="114" y="42" textAnchor="end">Termometer</text>
          <line x1="119" y1="39" x2="230" y2="39" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="230" cy="39" r="2" fill="#475569" />
        </g>

        <g opacity={hasCanAndWater ? 1 : 0.35}>
          <text x="114" y="86" textAnchor="end">Bekas kuprum</text>
          <line x1="119" y1="83" x2="194" y2="83" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="194" cy="83" r="2" fill="#b45309" />

          <text x="114" y="114" textAnchor="end" fill="#0369a1">200 cm³ Air</text>
          <line x1="119" y1="111" x2="216" y2="111" stroke="#0284c7" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="216" cy="111" r="2" fill="#0284c7" />
        </g>

        <g opacity={hasCanAndWater ? 1 : 0.35}>
          <text x="114" y="158" textAnchor="end">Pengadang angin</text>
          <line x1="119" y1="155" x2="134" y2="155" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="134" cy="155" r="2" fill="#475569" />
        </g>

        <g opacity={hasLamp ? 1 : 0.35}>
          <text x="114" y="196" textAnchor="end">Pelita ({alcoholName})</text>
          <line x1="119" y1="193" x2="212" y2="193" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="212" cy="193" r="2" fill="#475569" />
        </g>

        <g opacity={hasLamp ? 1 : 0.35}>
          <text x="114" y="222" textAnchor="end">Bongkah kayu</text>
          <line x1="119" y1="219" x2="193" y2="219" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="193" cy="219" r="2" fill="#a16207" />
        </g>
      </g>

      {/* CENTER APPARATUS (cx = 238, x = 130..346) */}
      {!hasCanAndWater && (
        <g>
          <rect
            x="150"
            y="56"
            width="176"
            height="168"
            rx="12"
            fill="#f8fafc"
            stroke="#cbd5e1"
            strokeWidth="1.6"
            strokeDasharray="6 4"
          />
          <text x="238" y="134" textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b">
            Klik Langkah 1 untuk pasang
          </text>
          <text x="238" y="150" textAnchor="middle" fontSize="10" fontWeight="600" fill="#94a3b8">
            Bekas Kuprum, Air &amp; Pengadang Angin
          </text>
        </g>
      )}

      {hasCanAndWater && (
        <g>
          {/* Windshields */}
          <path
            d="M 130 92 L 148 86 L 148 232 L 130 232 Z"
            fill="url(#shieldGrad)"
            stroke="#64748b"
            strokeWidth="1.4"
          />
          <path
            d="M 328 86 L 346 92 L 346 232 L 328 232 Z"
            fill="url(#shieldGrad)"
            stroke="#64748b"
            strokeWidth="1.4"
          />

          {/* Tripod stand legs & ring */}
          <line x1="190" y1="141" x2="170" y2="232" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
          <line x1="286" y1="141" x2="306" y2="232" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
          <line x1="182" y1="141" x2="294" y2="141" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" />

          {/* Pipe-clay triangle */}
          <rect x="190" y="136" width="96" height="5" rx="2" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.2" />

          {/* Open-top Cylindrical Copper Calorimeter Can (with flared open rim & rounded base) */}
          {/* Back rim arch */}
          <path
            d="M 192 66 Q 238 58 284 66"
            fill="#92400e"
            fillOpacity="0.18"
            stroke="#92400e"
            strokeWidth="1.6"
          />

          {/* Outer cylindrical copper shell (open at top, rounded bottom corners) */}
          <path
            d="M 191 65 Q 195 67 195 72 L 195 124 Q 195 136 207 136 L 269 136 Q 281 136 281 124 L 281 72 Q 281 67 285 65 L 279 65 Q 275 68 275 72 L 275 123 Q 275 130 267 130 L 209 130 Q 201 130 201 123 L 201 72 Q 201 68 197 65 Z"
            fill="url(#copperGrad)"
            stroke="#78350f"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />

          {/* Inner open cavity backdrop */}
          <path
            d="M 201 66 L 201 123 Q 201 130 209 130 L 267 130 Q 275 130 275 123 L 275 66 Q 238 71 201 66 Z"
            fill="#fffbeb"
            fillOpacity="0.55"
          />

          {/* 200 cm³ Water inside open copper calorimeter */}
          <path
            d="M 201 86 L 201 123 Q 201 130 209 130 L 267 130 Q 275 130 275 123 L 275 86 Z"
            fill="url(#waterGradComb)"
          />
          {/* Elliptical water top surface (meniscus) */}
          <ellipse
            cx="238"
            cy="86"
            rx="37"
            ry="4.8"
            fill="#bae6fd"
            stroke="#0284c7"
            strokeWidth="1.3"
          />

          {/* Subtle front rim lip curve showing open cylindrical mouth */}
          <path
            d="M 192 66 Q 238 73 284 66"
            fill="none"
            stroke="#b45309"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <ellipse cx="192" cy="65.5" rx="2.2" ry="1.5" fill="#d97706" stroke="#78350f" strokeWidth="1" />
          <ellipse cx="284" cy="65.5" rx="2.2" ry="1.5" fill="#d97706" stroke="#78350f" strokeWidth="1" />

          {/* Heat convection bubbles */}
          {isBurning && (
            <g fill="#ffffff" fillOpacity="0.78">
              <circle cx="222" cy="118" r="2">
                <animate attributeName="cy" values="125;88" dur="1.1s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="1.1s" repeatCount="indefinite" />
              </circle>
              <circle cx="253" cy="114" r="1.8">
                <animate attributeName="cy" values="124;87" dur="0.95s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="0.95s" repeatCount="indefinite" />
              </circle>
              <circle cx="236" cy="120" r="2.2">
                <animate attributeName="cy" values="126;89" dur="1.3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="1.3s" repeatCount="indefinite" />
              </circle>
            </g>
          )}

          {/* Soot at bottom of copper can */}
          {sootOpacity > 0.02 && (
            <ellipse
              cx="238"
              cy="137"
              rx="36"
              ry={sootLevel >= 2 ? 4.2 : 2.6}
              fill="#0f172a"
              fillOpacity={sootOpacity}
            />
          )}
        </g>
      )}

      {/* Thermometer */}
      {hasThermometer && (
        <g>
          <path
            d="M 222 26 Q 238 20 254 26"
            fill="none"
            stroke="#0284c7"
            strokeWidth="1.4"
            strokeDasharray="3 2"
          />
          <polygon points="220,27 226,23 225,29" fill="#0284c7" />
          <polygon points="256,27 251,23 250,29" fill="#0284c7" />

          <rect x="233" y="18" width="10" height="108" rx="5" fill="#f8fafc" stroke="#475569" strokeWidth="1.3" />
          {[32, 44, 56, 68, 80, 92, 104].map((gy) => (
            <line key={gy} x1="234" y1={gy} x2="238" y2={gy} stroke="#64748b" strokeWidth="0.9" />
          ))}
          <rect x="236.3" y={mercuryTopY} width="3.4" height={125 - mercuryTopY} rx="1.5" fill="#ef4444" />
          <circle cx="238" cy="123" r="4.5" fill="#ef4444" />
        </g>
      )}

      {/* Wooden block + Spirit Lamp + Flame */}
      {hasLamp && (
        <g>
          <rect x="194" y="211" width="88" height="21" rx="3" fill="url(#woodGrad)" stroke="#78350f" strokeWidth="1.4" />
          <line x1="200" y1="218" x2="276" y2="218" stroke="#78350f" strokeOpacity="0.28" strokeWidth="1" />
          <line x1="206" y1="226" x2="270" y2="226" stroke="#78350f" strokeOpacity="0.28" strokeWidth="1" />

          <path
            d="M 214 184 Q 214 177 222 176 L 254 176 Q 262 177 262 184 L 265 206 Q 265 210 260 210 L 216 210 Q 211 210 211 206 Z"
            fill="#f8fafc"
            fillOpacity="0.92"
            stroke="#475569"
            strokeWidth="1.5"
          />
          <rect x="213" y={fuelTopY} width="50" height={208 - fuelTopY} rx="2" fill="#bae6fd" fillOpacity="0.72" />
          <text x="238" y="198" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#0369a1">
            {alcoholFormula}
          </text>

          <rect x="230" y="169" width="16" height="7" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="1.1" />
          <line x1="238" y1="169" x2="238" y2="161" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />

          {isBurning && (
            <g>
              <path
                d={
                  sootLevel >= 2
                    ? 'M 238 138 C 249 147, 248 162, 238 163 C 228 162, 227 147, 238 138 Z'
                    : 'M 238 139 C 246 148, 246 162, 238 163 C 230 162, 230 148, 238 139 Z'
                }
                fill={sootLevel === 0 ? '#60a5fa' : sootLevel === 1 ? '#fbbf24' : '#f97316'}
              >
                <animate attributeName="opacity" values="0.88;1;0.84;1" dur="0.45s" repeatCount="indefinite" />
              </path>
              <path
                d="M 238 146 C 242 152, 242 161, 238 162 C 234 161, 234 152, 238 146 Z"
                fill={sootLevel === 0 ? '#dbeafe' : '#fef08a'}
              />
              {sootLevel >= 2 && (
                <g stroke="#334155" strokeWidth="1.2" fill="none" strokeOpacity="0.45">
                  <path d="M 232 140 Q 228 135 232 130">
                    <animate attributeName="opacity" values="0.6;0.1;0.6" dur="0.9s" repeatCount="indefinite" />
                  </path>
                  <path d="M 244 140 Q 248 135 244 130">
                    <animate attributeName="opacity" values="0.2;0.65;0.2" dur="0.9s" repeatCount="indefinite" />
                  </path>
                </g>
              )}
            </g>
          )}
        </g>
      )}

      {/* RIGHT SIDE: APPARATUS LABELS (x = 356..476, completely clear of balance at x=492) */}
      <g fontSize="10" fontWeight="700" fill="#334155">
        <g opacity={hasThermometer ? 1 : 0.35}>
          <text x="356" y="30" fill="#0369a1">Kacau perlahan</text>
          <line x1="257" y1="27" x2="352" y2="27" stroke="#0284c7" strokeWidth="1" strokeDasharray="3 2" />
        </g>

        <g opacity={hasCanAndWater ? 1 : 0.35}>
          <text x="356" y="102">Pengadang angin</text>
          <line x1="344" y1="99" x2="352" y2="99" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />

          <text x="356" y="140">Segi tiga tanah liat</text>
          <line x1="286" y1="138" x2="352" y2="138" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="286" cy="138" r="2" fill="#475569" />

          <text x="356" y="182">Tungku kaki tiga</text>
          <line x1="296" y1="179" x2="352" y2="179" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="296" cy="179" r="2" fill="#475569" />
        </g>

        {(isBurning || isFinished) && sootLevel >= 1 && (
          <g>
            <text x="356" y="160" fill="#0f172a" fontWeight="800">
              {sootLevel === 1 ? 'Sedikit jelaga' : 'Jelaga hitam'}
            </text>
            <line x1="274" y1="138" x2="352" y2="157" stroke="#0f172a" strokeWidth="1" strokeDasharray="2 2" />
          </g>
        )}
      </g>

      {/* FAR RIGHT: DIGITAL ELECTRONIC BALANCE CARD (x=492..612) */}
      <g transform="translate(492, 54)">
        <rect x="0" y="0" width="120" height="114" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.4" />
        <text x="60" y="17" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#475569">
          {scaleBadgeLabel}
        </text>

        {/* Mini weighing pan */}
        <rect x="28" y="54" width="64" height="5" rx="2" fill="#94a3b8" />
        <rect x="48" y="59" width="24" height="5" fill="#64748b" />

        {/* Mini spirit lamp on balance during weighing */}
        {hasLamp && (massDisplayMode === 'initial' || massDisplayMode === 'final') && (
          <g transform="translate(45, 29)">
            <rect x="4" y="8" width="22" height="17" rx="3" fill="#e0f2fe" stroke="#0369a1" strokeWidth="1.2" />
            <rect x="11" y="4" width="8" height="4" rx="1" fill="#64748b" />
            <line x1="15" y1="4" x2="15" y2="1" stroke="#1e293b" strokeWidth="1.5" />
          </g>
        )}

        {/* Scale base + LCD */}
        <rect x="12" y="64" width="96" height="38" rx="6" fill="#1e293b" />
        <rect x="20" y="71" width="80" height="24" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
        <text
          x="60"
          y="87"
          textAnchor="middle"
          fontSize="12.5"
          fontWeight="800"
          fontFamily="monospace"
          fill={massDisplayMode === 'final' ? '#34d399' : '#38bdf8'}
        >
          {scaleText}
        </text>
      </g>
    </svg>
  );
};
