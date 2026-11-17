import React from 'react';

export type FurnaceZoneId = 'feed' | 'zone3' | 'zone2' | 'zone1' | 'slag';

interface BlastFurnaceSVGProps {
  activeZone: FurnaceZoneId;
  onSelectZone: (zone: FurnaceZoneId) => void;
  furnaceOn: boolean;
}

export const BlastFurnaceSVG: React.FC<BlastFurnaceSVGProps> = ({
  activeZone,
  onSelectZone,
  furnaceOn,
}) => {
  const isFeed = activeZone === 'feed';
  const isZ3 = activeZone === 'zone3';
  const isZ2 = activeZone === 'zone2';
  const isZ1 = activeZone === 'zone1';
  const isSlag = activeZone === 'slag';

  return (
    <svg
      viewBox="0 0 700 390"
      className="w-full h-auto max-h-[315px] select-none"
      role="img"
      aria-label="Rajah 1.38 Relau Bagas Skala Industri untuk Pengekstrakan Besi"
    >
      <defs>
        <linearGradient id="bfBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff7ed" />
          <stop offset="100%" stopColor="#f8fafc" />
        </linearGradient>
        <filter id="bfShadow" x="-10%" y="-10%" width="120%" height="125%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0f172a" floodOpacity="0.08" />
        </filter>
      </defs>

      <rect x="0" y="0" width="700" height="390" rx="12" fill="url(#bfBg)" />

      {/* Header Pill: Raw Materials Feed at Top */}
      <g
        className="cursor-pointer"
        onClick={() => onSelectZone('feed')}
      >
        <rect
          x="145"
          y="10"
          width="410"
          height="28"
          rx="8"
          fill={isFeed ? '#ea580c' : '#ffffff'}
          stroke={isFeed ? '#9a3412' : '#cbd5e1'}
          strokeWidth={isFeed ? '2' : '1.2'}
          filter="url(#bfShadow)"
        />
        <text
          x="350"
          y="28"
          fontSize="11.5"
          fontWeight="800"
          fill={isFeed ? '#ffffff' : '#0f172a'}
          textAnchor="middle"
        >
          Bijih besi (Fe₂O₃), arang kok (C) &amp; batu kapur (CaCO₃)
        </text>
        {/* Down arrow into hopper */}
        <line x1="350" y1="38" x2="350" y2="57" stroke="#0f172a" strokeWidth="2.8" />
        <polygon points="344,54 356,54 350,64" fill="#0f172a" />
      </g>

      {/* Exhaust Gas Ducts Left & Right (Gas buangan) */}
      <path d="M 304 94 L 222 94 L 222 72" fill="none" stroke="#475569" strokeWidth="12" strokeLinejoin="round" />
      <path d="M 396 94 L 478 94 L 478 72" fill="none" stroke="#475569" strokeWidth="12" strokeLinejoin="round" />

      {furnaceOn && (
        <g>
          {[0, 0.8].map((delay, i) => (
            <React.Fragment key={i}>
              <circle cx="222" cy="65" r="5" fill="#94a3b8" opacity="0.85">
                <animate attributeName="cy" values="66;42" dur="1.7s" begin={`${delay}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.85;0" dur="1.7s" begin={`${delay}s`} repeatCount="indefinite" />
              </circle>
              <circle cx="478" cy="65" r="5" fill="#94a3b8" opacity="0.85">
                <animate attributeName="cy" values="66;42" dur="1.7s" begin={`${delay}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.85;0" dur="1.7s" begin={`${delay}s`} repeatCount="indefinite" />
              </circle>
            </React.Fragment>
          ))}
        </g>
      )}

      {/* Exhaust labels cleanly outside furnace top */}
      <g filter="url(#bfShadow)">
        <rect x="64" y="54" width="136" height="36" rx="8" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.2" />
        <text x="132" y="70" fontSize="11" fontWeight="700" fill="#1e293b" textAnchor="middle">
          Gas buangan
        </text>
        <text x="132" y="83" fontSize="9.5" fontWeight="600" fill="#64748b" textAnchor="middle">
          N₂, CO₂, CO
        </text>
        <line x1="200" y1="68" x2="215" y2="68" stroke="#64748b" strokeWidth="1.3" />
      </g>

      <g filter="url(#bfShadow)">
        <rect x="500" y="54" width="136" height="36" rx="8" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.2" />
        <text x="568" y="70" fontSize="11" fontWeight="700" fill="#1e293b" textAnchor="middle">
          Gas buangan
        </text>
        <text x="568" y="83" fontSize="9.5" fontWeight="600" fill="#64748b" textAnchor="middle">
          N₂, CO₂, CO
        </text>
        <line x1="500" y1="68" x2="485" y2="68" stroke="#64748b" strokeWidth="1.3" />
      </g>

      {/* Refractory Brick Outer Shell of Blast Furnace */}
      <path
        d="M 284 64 L 284 114 L 244 252 L 250 356 L 450 356 L 456 252 L 416 114 L 416 64 Z"
        fill="#cbd5e1"
        stroke="#334155"
        strokeWidth="3.5"
        strokeLinejoin="round"
        filter="url(#bfShadow)"
      />

      {/* Bell & Hopper feed mechanism */}
      <polygon points="325,84 375,84 350,65" fill="#475569" stroke="#1e293b" strokeWidth="1.2" />

      {/* Solid Feed Charge layer at top */}
      <path
        d="M 294 86 L 406 86 L 410 112 L 290 112 Z"
        fill={isFeed ? '#78350f' : '#57534e'}
        stroke={isFeed ? '#fde047' : 'none'}
        strokeWidth="2"
        className="cursor-pointer"
        onClick={() => onSelectZone('feed')}
      />

      {/* ZONE 3 (Top Red: 500 - 900 C) */}
      <path
        d="M 290 112 L 410 112 L 428 176 L 272 176 Z"
        fill={isZ3 ? '#dc2626' : '#b91c1c'}
        stroke={isZ3 ? '#fef08a' : '#7f1d1d'}
        strokeWidth={isZ3 ? '2.5' : '1'}
        className="cursor-pointer transition hover:opacity-95"
        onClick={() => onSelectZone('zone3')}
      />
      <text x="350" y="140" fontSize="11" fontWeight="800" fill="#ffffff" textAnchor="middle" pointerEvents="none">
        Zon 3 (~500–900 °C)
      </text>
      <text x="350" y="157" fontSize="9.2" fontWeight="600" fill="#fee2e2" textAnchor="middle" pointerEvents="none">
        Penurunan Fe₂O₃ oleh C &amp; CO
      </text>

      {/* ZONE 2 (Middle Burnt Orange: 1000 - 1200 C) */}
      <path
        d="M 272 176 L 428 176 L 448 242 L 252 242 Z"
        fill={isZ2 ? '#ea580c' : '#c2410c'}
        stroke={isZ2 ? '#fef08a' : '#7c2d12'}
        strokeWidth={isZ2 ? '2.5' : '1'}
        className="cursor-pointer transition hover:opacity-95"
        onClick={() => onSelectZone('zone2')}
      />
      <text x="350" y="205" fontSize="11.5" fontWeight="800" fill="#ffffff" textAnchor="middle" pointerEvents="none">
        Zon 2 (~1000–1200 °C)
      </text>
      <text x="350" y="222" fontSize="9.5" fontWeight="600" fill="#ffedd5" textAnchor="middle" pointerEvents="none">
        C + CO₂ → 2CO (Endotermik)
      </text>

      {/* ZONE 1 (Bottom Gold-Amber: 1600 C) */}
      <path
        d="M 252 242 L 448 242 L 444 300 L 256 300 Z"
        fill={isZ1 ? '#f59e0b' : '#d97706'}
        stroke={isZ1 ? '#fef08a' : '#92400e'}
        strokeWidth={isZ1 ? '2.5' : '1'}
        className="cursor-pointer transition hover:opacity-95"
        onClick={() => onSelectZone('zone1')}
      />
      <text x="350" y="268" fontSize="12" fontWeight="800" fill="#ffffff" textAnchor="middle" pointerEvents="none">
        Zon 1 (1600 °C)
      </text>
      <text x="350" y="285" fontSize="9.5" fontWeight="600" fill="#fef3c7" textAnchor="middle" pointerEvents="none">
        C + O₂ → CO₂ (Eksotermik)
      </text>

      {/* Hot Air Tuyeres (Udara panas) entering Zone 1 */}
      <g className="cursor-pointer" onClick={() => onSelectZone('zone1')}>
        {/* Left Tuyere */}
        <rect x="206" y="263" width="52" height="14" rx="2" fill="#fde047" stroke="#b45309" strokeWidth="1.6" />
        <polygon points="240,266 250,270 240,274" fill="#9a3412" />
        {/* Right Tuyere */}
        <rect x="442" y="263" width="52" height="14" rx="2" fill="#fde047" stroke="#b45309" strokeWidth="1.6" />
        <polygon points="460,266 450,270 460,274" fill="#9a3412" />

        {furnaceOn && (
          <g>
            <circle cx="222" cy="270" r="3" fill="#dc2626">
              <animate attributeName="cx" values="210;252" dur="0.9s" repeatCount="indefinite" />
            </circle>
            <circle cx="478" cy="270" r="3" fill="#dc2626">
              <animate attributeName="cx" values="490;448" dur="0.9s" repeatCount="indefinite" />
            </circle>
          </g>
        )}
      </g>

      {/* Hot Air Labels Left & Right */}
      <g filter="url(#bfShadow)" className="cursor-pointer" onClick={() => onSelectZone('zone1')}>
        <rect x="44" y="252" width="144" height="36" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.3" />
        <text x="116" y="268" fontSize="11.5" fontWeight="800" fill="#713f12" textAnchor="middle">
          Udara panas (O₂)
        </text>
        <text x="116" y="281" fontSize="9.5" fontWeight="600" fill="#854d0e" textAnchor="middle">
          Masuk ke Zon 1
        </text>
        <line x1="188" y1="270" x2="206" y2="270" stroke="#ca8a04" strokeWidth="1.6" />
      </g>

      <g filter="url(#bfShadow)" className="cursor-pointer" onClick={() => onSelectZone('zone1')}>
        <rect x="512" y="252" width="144" height="36" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.3" />
        <text x="584" y="268" fontSize="11.5" fontWeight="800" fill="#713f12" textAnchor="middle">
          Udara panas (O₂)
        </text>
        <text x="584" y="281" fontSize="9.5" fontWeight="600" fill="#854d0e" textAnchor="middle">
          Masuk ke Zon 1
        </text>
        <line x1="512" y1="270" x2="494" y2="270" stroke="#ca8a04" strokeWidth="1.6" />
      </g>

      {/* SLAG LAYER (Sanga CaSiO3 - less dense, floats on top of molten iron) */}
      <g className="cursor-pointer" onClick={() => onSelectZone('slag')}>
        <rect
          x="256"
          y="300"
          width="188"
          height="22"
          fill={isSlag ? '#64748b' : '#475569'}
          stroke={isSlag ? '#fef08a' : '#334155'}
          strokeWidth={isSlag ? '2' : '1'}
        />
        <text x="350" y="315" fontSize="10.5" fontWeight="700" fill="#f1f5f9" textAnchor="middle">
          Sanga (CaSiO₃) — Terapung
        </text>
        {/* Right Slag Spout */}
        <rect x="444" y="305" width="48" height="11" fill="#64748b" stroke="#334155" strokeWidth="1.2" />
      </g>

      {/* Right Slag Callout Pill */}
      <g filter="url(#bfShadow)" className="cursor-pointer" onClick={() => onSelectZone('slag')}>
        <line x1="492" y1="311" x2="512" y2="322" stroke="#475569" strokeWidth="1.5" />
        <rect
          x="512"
          y="304"
          width="166"
          height="42"
          rx="8"
          fill={isSlag ? '#f1f5f9' : '#ffffff'}
          stroke={isSlag ? '#334155' : '#94a3b8'}
          strokeWidth={isSlag ? '1.8' : '1.2'}
        />
        <text x="595" y="322" fontSize="11.5" fontWeight="800" fill="#1e293b" textAnchor="middle">
          Sanga (CaSiO₃)
        </text>
        <text x="595" y="337" fontSize="9.5" fontWeight="600" fill="#475569" textAnchor="middle">
          Kurang tumpat · Lapisan atas
        </text>
      </g>

      {/* MOLTEN IRON LAYER (Leburan besi - densest, sinks to bottom) */}
      <g className="cursor-pointer" onClick={() => onSelectZone('zone3')}>
        <rect
          x="256"
          y="322"
          width="188"
          height="28"
          fill="#991b1b"
          stroke={isZ3 ? '#fef08a' : '#7f1d1d'}
          strokeWidth={isZ3 ? '2' : '1'}
        />
        <text x="350" y="340" fontSize="11" fontWeight="800" fill="#fef2f2" textAnchor="middle">
          Leburan Besi (Fe) — Dasar
        </text>
        {/* Left Molten Iron Spout */}
        <rect x="208" y="330" width="48" height="12" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="1.2" />
      </g>

      {/* Left Molten Iron Callout Pill */}
      <g filter="url(#bfShadow)" className="cursor-pointer" onClick={() => onSelectZone('zone3')}>
        <line x1="208" y1="336" x2="188" y2="336" stroke="#991b1b" strokeWidth="1.6" />
        <rect
          x="22"
          y="315"
          width="166"
          height="42"
          rx="8"
          fill="#fef2f2"
          stroke="#dc2626"
          strokeWidth="1.4"
        />
        <text x="105" y="333" fontSize="11.5" fontWeight="800" fill="#7f1d1d" textAnchor="middle">
          Leburan besi (Fe)
        </text>
        <text x="105" y="348" fontSize="9.5" fontWeight="600" fill="#991b1b" textAnchor="middle">
          Lebih tumpat · Mengalir di dasar
        </text>
      </g>

      {/* Interactive Zone Callout Cards on Upper Sides */}
      <g className="cursor-pointer" onClick={() => onSelectZone('zone3')} filter="url(#bfShadow)">
        <line x1="200" y1="142" x2="292" y2="142" stroke="#b91c1c" strokeWidth="1.4" strokeDasharray="3 2" />
        <circle cx="292" cy="142" r="3" fill="#b91c1c" />
        <rect
          x="22"
          y="116"
          width="178"
          height="48"
          rx="8"
          fill={isZ3 ? '#fef2f2' : '#ffffff'}
          stroke={isZ3 ? '#dc2626' : '#fca5a5'}
          strokeWidth={isZ3 ? '1.8' : '1.2'}
        />
        <text x="111" y="136" fontSize="11" fontWeight="800" fill="#991b1b" textAnchor="middle">
          Zon 3: Penurunan Fe₂O₃
        </text>
        <text x="111" y="152" fontSize="9.5" fontWeight="600" fill="#475569" textAnchor="middle">
          Klik untuk persamaan lengkap
        </text>
      </g>

      <g className="cursor-pointer" onClick={() => onSelectZone('zone2')} filter="url(#bfShadow)">
        <line x1="426" y1="206" x2="500" y2="206" stroke="#ea580c" strokeWidth="1.4" strokeDasharray="3 2" />
        <circle cx="426" cy="206" r="3" fill="#ea580c" />
        <rect
          x="500"
          y="182"
          width="178"
          height="48"
          rx="8"
          fill={isZ2 ? '#fff7ed' : '#ffffff'}
          stroke={isZ2 ? '#ea580c' : '#fdba74'}
          strokeWidth={isZ2 ? '1.8' : '1.2'}
        />
        <text x="589" y="202" fontSize="11" fontWeight="800" fill="#9a3412" textAnchor="middle">
          Zon 2: Pembentukan CO
        </text>
        <text x="589" y="218" fontSize="9.5" fontWeight="600" fill="#475569" textAnchor="middle">
          Klik untuk peranan agen penurun
        </text>
      </g>

      {/* Bottom instruction */}
      <text x="350" y="378" fontSize="10" fontWeight="600" fill="#64748b" textAnchor="middle">
        Klik mana-mana zon pada Rajah 1.38 untuk meneliti tindak balas kimia &amp; penerangan
      </text>
    </svg>
  );
};
