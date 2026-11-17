import React from 'react';

interface Props {
  simulationId: string;
}

type ArtworkVariant =
  | 'heating-particles'
  | 'titration'
  | 'test-tubes'
  | 'electrolysis'
  | 'crucible-flame'
  | 'calorimeter'
  | 'rate-graph'
  | 'molecules-bond'
  | 'distillation'
  | 'alloy-lattice'
  | 'polymer-soap';

function getVariant(id: string): ArtworkVariant {
  switch (id) {
    case 'keadaan-zarah-jirim':
    case 'pemanasan-dan-penyejukkan-naftalena':
      return 'heating-particles';

    case 'pentitratan-asid-alkali':
    case 'penyediaan-larutan-piawai':
    case 'haba-peneutralan':
    case 'haba-pemendakan':
      return 'titration';

    case 'ujian-gas':
    case 'keterlarutan-garam':
    case 'ujian-kation':
    case 'ujian-anion':
    case 'penukaran-ion-ferum':
    case 'penyesaran-halogen-halida':
    case 'ujian-kimia-alkana-alkena':
    case 'sifat-oksida-kala-3':
      return 'test-tubes';

    case 'elektrolisis':
    case 'pengekstrakan-aluminium':
    case 'pemindahan-elektron-tiub-u':
    case 'sel-kimia-voltan':
    case 'pengaratan-besi-sentuhan-logam':
      return 'electrolysis';

    case 'formula-empirik-mgo':
    case 'formula-empirik-cuo':
    case 'pengekstrakan-besi':
      return 'crucible-flame';

    case 'haba-penyesaran':
    case 'haba-pembakaran':
    case 'nilai-bahan-api':
      return 'calorimeter';

    case 'kadar-tindak-balas-saiz':
    case 'kadar-tindak-balas-kepekatan':
    case 'kadar-tindak-balas-suhu':
    case 'kadar-tindak-balas-mangkin':
      return 'rate-graph';

    case 'penapaian-penyulingan-etanol':
    case 'pengoksidaan-etanol':
    case 'pengesteran-alkohol-asid-karboksilik':
      return 'distillation';

    case 'kekerasan-aloi-logam-tulen':
      return 'alloy-lattice';

    case 'penggumpalan-lateks':
    case 'kekenyalan-getah-asli-tervulkan':
    case 'penghasilan-sabun':
    case 'pencucian-sabun-detergen-air-liat':
      return 'polymer-soap';

    default:
      return 'molecules-bond';
  }
}

export const SimulationCardArtwork: React.FC<Props> = ({ simulationId }) => {
  const variant = getVariant(simulationId);

  return (
    <svg
      viewBox="0 0 220 155"
      className="w-full h-full drop-shadow-[0_12px_20px_rgba(0,0,0,0.18)] select-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`glass-${simulationId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.88" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.72" />
        </linearGradient>
        <linearGradient id={`copper-${simulationId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="35%" stopColor="#f59e0b" />
          <stop offset="75%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>

      {variant === 'heating-particles' && (
        <g>
          {/* Tripod + Bunsen hint */}
          <line x1="68" y1="112" x2="56" y2="144" stroke="#334155" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="152" y1="112" x2="164" y2="144" stroke="#334155" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="64" y1="112" x2="156" y2="112" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" />
          {/* Water bath beaker */}
          <path
            d="M 70 46 L 70 102 Q 70 110 78 110 L 142 110 Q 150 110 150 102 L 150 46"
            fill={`url(#glass-${simulationId})`}
            stroke="#334155"
            strokeWidth="2"
          />
          <ellipse cx="110" cy="46" rx="40" ry="5.5" fill="#e0f2fe" fillOpacity="0.6" stroke="#334155" strokeWidth="1.6" />
          <rect x="72" y="68" width="76" height="40" rx="6" fill="#38bdf8" fillOpacity="0.45" />
          {/* Boiling tube + thermometer */}
          <rect x="100" y="32" width="20" height="68" rx="10" fill="#ffffff" fillOpacity="0.82" stroke="#475569" strokeWidth="1.8" />
          <rect x="108" y="14" width="4" height="68" rx="2" fill="#f8fafc" stroke="#475569" strokeWidth="1" />
          <rect x="109.2" y="28" width="1.6" height="52" fill="#ef4444" />
          {/* Kinetic spheres */}
          <circle cx="85" cy="84" r="4.5" fill="#0284c7" />
          <circle cx="132" cy="90" r="4.5" fill="#6366f1" />
          <circle cx="110" cy="88" r="3.5" fill="#ec4899" />
          {/* Flame under */}
          <path d="M 110 118 C 117 126, 116 140, 110 142 C 104 140, 103 126, 110 118 Z" fill="#f97316" />
          <path d="M 110 125 C 113 130, 113 139, 110 140 C 107 139, 107 130, 110 125 Z" fill="#fef08a" />
        </g>
      )}

      {variant === 'titration' && (
        <g>
          {/* Retort stand */}
          <rect x="52" y="138" width="116" height="7" rx="3.5" fill="#334155" />
          <rect x="64" y="12" width="5" height="128" rx="2.5" fill="#475569" />
          <rect x="68" y="34" width="38" height="4.5" rx="2" fill="#64748b" />
          {/* Burette */}
          <rect x="104" y="10" width="12" height="66" rx="4" fill="#ffffff" fillOpacity="0.88" stroke="#334155" strokeWidth="1.8" />
          <rect x="106" y="26" width="8" height="48" fill="#bae6fd" />
          <circle cx="110" cy="84" r="2.8" fill="#0284c7" />
          {/* Conical Flask */}
          <path
            d="M 101 92 L 101 102 L 79 132 Q 77 137 83 137 L 137 137 Q 143 137 141 132 L 119 102 L 119 92 Z"
            fill="#ffffff"
            fillOpacity="0.9"
            stroke="#334155"
            strokeWidth="2"
          />
          <path
            d="M 88 120 L 80 132 Q 79 136 84 136 L 136 136 Q 141 136 140 132 L 132 120 Z"
            fill="#f472b6"
            fillOpacity="0.82"
          />
          <ellipse cx="110" cy="120" rx="22" ry="3.5" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
        </g>
      )}

      {variant === 'test-tubes' && (
        <g>
          {/* Wooden/Slate Rack */}
          <rect x="44" y="124" width="132" height="14" rx="5" fill="#1e293b" />
          <rect x="50" y="64" width="120" height="7" rx="3" fill="#475569" />
          {/* 4 colorful test tubes */}
          {[
            { x: 64, liq: '#38bdf8', top: '#bae6fd' },
            { x: 91, liq: '#34d399', top: '#a7f3d0' },
            { x: 118, liq: '#fb923c', top: '#fed7aa' },
            { x: 145, liq: '#a78bfa', top: '#ddd6fe' },
          ].map((tube, i) => (
            <g key={i}>
              <rect
                x={tube.x - 8}
                y="26"
                width="16"
                height="96"
                rx="8"
                fill="#ffffff"
                fillOpacity="0.88"
                stroke="#334155"
                strokeWidth="1.8"
              />
              <path
                d={`M ${tube.x - 6} 76 L ${tube.x - 6} 114 Q ${tube.x - 6} 120 ${tube.x} 120 Q ${tube.x + 6} 120 ${tube.x + 6} 114 L ${tube.x + 6} 76 Z`}
                fill={tube.liq}
              />
              <ellipse cx={tube.x} cy="76" rx="6" ry="2" fill={tube.top} />
            </g>
          ))}
        </g>
      )}

      {variant === 'electrolysis' && (
        <g>
          {/* Battery top */}
          <rect x="86" y="14" width="48" height="18" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
          <text x="110" y="26.5" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#fde047">
            +   6V   −
          </text>
          {/* Wires */}
          <path d="M 86 23 L 78 23 L 78 52" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 134 23 L 142 23 L 142 52" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />

          {/* Open Beaker */}
          <path
            d="M 56 56 L 56 128 Q 56 138 66 138 L 154 138 Q 164 138 164 128 L 164 56"
            fill="#ffffff"
            fillOpacity="0.84"
            stroke="#334155"
            strokeWidth="2.2"
          />
          <ellipse cx="110" cy="56" rx="54" ry="7" fill="#e0f2fe" fillOpacity="0.6" stroke="#334155" strokeWidth="1.6" />
          {/* Electrolyte blue liquid */}
          <path
            d="M 58 84 L 58 127 Q 58 136 67 136 L 153 136 Q 162 136 162 127 L 162 84 Z"
            fill="#38bdf8"
            fillOpacity="0.72"
          />
          <ellipse cx="110" cy="84" rx="52" ry="5.5" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.2" />

          {/* Electrodes */}
          <rect x="72" y="46" width="12" height="76" rx="3" fill="#1e293b" />
          <rect x="136" y="46" width="12" height="76" rx="3" fill="#1e293b" />
          {/* Glowing electron / ion spheres */}
          <circle cx="96" cy="108" r="6" fill="#facc15" stroke="#ca8a04" strokeWidth="1.2" />
          <circle cx="124" cy="120" r="6" fill="#f472b6" stroke="#be185d" strokeWidth="1.2" />
        </g>
      )}

      {variant === 'crucible-flame' && (
        <g>
          {/* Tripod */}
          <line x1="72" y1="84" x2="58" y2="142" stroke="#334155" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="148" y1="84" x2="162" y2="142" stroke="#334155" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="68" y1="84" x2="152" y2="84" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" />
          {/* Pipe clay triangle */}
          <rect x="74" y="79" width="72" height="5" rx="2.5" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.2" />
          {/* Porcelain Crucible with slight lid */}
          <path
            d="M 80 46 L 88 79 L 132 79 L 140 46 Z"
            fill="#ffffff"
            stroke="#334155"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <ellipse cx="110" cy="46" rx="30" ry="5" fill="#f1f5f9" stroke="#334155" strokeWidth="1.6" />
          {/* Magnesium bright glow / reaction spark */}
          <circle cx="110" cy="46" r="10" fill="#fef08a" fillOpacity="0.85" />
          <circle cx="110" cy="46" r="5" fill="#ffffff" />
          {/* Bunsen Flame */}
          <path d="M 110 88 C 122 102, 120 132, 110 136 C 100 132, 98 102, 110 88 Z" fill="#38bdf8" />
          <path d="M 110 102 C 116 112, 115 130, 110 133 C 105 130, 104 112, 110 102 Z" fill="#fef08a" />
        </g>
      )}

      {variant === 'calorimeter' && (
        <g>
          {/* Tripod */}
          <line x1="72" y1="82" x2="58" y2="142" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
          <line x1="148" y1="82" x2="162" y2="142" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
          <line x1="68" y1="82" x2="152" y2="82" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" />
          {/* Open-top Cylindrical Copper Can */}
          <path
            d="M 76 32 L 76 70 Q 76 80 86 80 L 134 80 Q 144 80 144 70 L 144 32"
            fill={`url(#copper-${simulationId})`}
            stroke="#78350f"
            strokeWidth="1.8"
          />
          <ellipse cx="110" cy="32" rx="34" ry="5.5" fill="#bae6fd" stroke="#92400e" strokeWidth="1.6" />
          {/* Thermometer */}
          <rect x="107.5" y="10" width="5" height="52" rx="2.5" fill="#ffffff" stroke="#475569" strokeWidth="1.2" />
          <rect x="109" y="20" width="2" height="40" fill="#ef4444" />
          {/* Spirit lamp on wooden block */}
          <rect x="82" y="128" width="56" height="13" rx="3" fill="#a16207" stroke="#78350f" strokeWidth="1.2" />
          <rect x="92" y="106" width="36" height="22" rx="5" fill="#ffffff" fillOpacity="0.9" stroke="#334155" strokeWidth="1.6" />
          <rect x="94" y="113" width="32" height="13" rx="2" fill="#7dd3fc" fillOpacity="0.7" />
          <path d="M 110 82 C 117 90, 116 102, 110 104 C 104 102, 103 90, 110 82 Z" fill="#f97316" />
          <path d="M 110 89 C 113 94, 113 101, 110 102 C 107 101, 107 94, 110 89 Z" fill="#fef08a" />
        </g>
      )}

      {variant === 'rate-graph' && (
        <g>
          {/* Floating sleek graph tablet card */}
          <rect x="34" y="20" width="152" height="114" rx="16" fill="#ffffff" fillOpacity="0.94" stroke="#334155" strokeWidth="1.8" />
          <line x1="56" y1="36" x2="56" y2="114" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
          <line x1="56" y1="114" x2="168" y2="114" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
          {/* Fast curve */}
          <path d="M 56 114 Q 76 46 164 46" fill="none" stroke="#0071e3" strokeWidth="3.5" strokeLinecap="round" />
          {/* Slow curve */}
          <path d="M 56 114 Q 98 84 164 68" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5 4" strokeLinecap="round" />
          <circle cx="88" cy="56" r="4.5" fill="#0071e3" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="116" cy="79" r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
        </g>
      )}

      {variant === 'distillation' && (
        <g>
          {/* Round-bottom flask + Liebig condenser */}
          <circle cx="76" cy="108" r="24" fill="#ffffff" fillOpacity="0.9" stroke="#334155" strokeWidth="2" />
          <path d="M 54 112 A 22 22 0 0 0 98 112 Z" fill="#fb923c" fillOpacity="0.82" />
          <rect x="70" y="54" width="12" height="32" fill="#ffffff" fillOpacity="0.9" stroke="#334155" strokeWidth="2" />
          {/* Condenser tube diagonal */}
          <line x1="82" y1="62" x2="152" y2="96" stroke="#38bdf8" strokeWidth="14" strokeOpacity="0.45" strokeLinecap="round" />
          <line x1="82" y1="62" x2="152" y2="96" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
          {/* Receiving conical flask */}
          <path
            d="M 152 96 L 152 104 L 138 132 L 174 132 L 160 104 L 160 96 Z"
            fill="#ffffff"
            fillOpacity="0.9"
            stroke="#334155"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <polygon points="143,122 169,122 173,131 139,131" fill="#34d399" fillOpacity="0.85" />
        </g>
      )}

      {variant === 'alloy-lattice' && (
        <g>
          {/* Metallic block */}
          <rect x="44" y="64" width="132" height="66" rx="14" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
          {/* Tight pure/alloy spheres */}
          {[62, 86, 110, 134, 158].map((x) => (
            <g key={x}>
              <circle cx={x} cy="84" r="10" fill="#f59e0b" stroke="#92400e" strokeWidth="1.2" />
              <circle cx={x} cy="110" r="10" fill="#d97706" stroke="#78350f" strokeWidth="1.2" />
            </g>
          ))}
          {/* Foreign larger/smaller atom */}
          <circle cx="110" cy="97" r="13" fill="#64748b" stroke="#1e293b" strokeWidth="1.6" />
          {/* Steel ball bearing + weight drop arrow */}
          <circle cx="110" cy="40" r="12" fill="#94a3b8" stroke="#1e293b" strokeWidth="1.8" />
          <circle cx="106" cy="36" r="3.5" fill="#ffffff" fillOpacity="0.8" />
        </g>
      )}

      {variant === 'polymer-soap' && (
        <g>
          {/* Glossy polymer / emulsion beaker + micelles / sulfur crosslinks */}
          <path
            d="M 64 46 L 64 126 Q 64 136 74 136 L 146 136 Q 156 136 156 126 L 156 46"
            fill="#ffffff"
            fillOpacity="0.88"
            stroke="#334155"
            strokeWidth="2"
          />
          <ellipse cx="110" cy="46" rx="46" ry="6.5" fill="#f1f5f9" stroke="#334155" strokeWidth="1.6" />
          <path
            d="M 66 76 L 66 125 Q 66 134 75 134 L 145 134 Q 154 134 154 125 L 154 76 Z"
            fill="#f472b6"
            fillOpacity="0.32"
          />
          {/* Floating foam/latex bubbles & polymer chains */}
          <circle cx="88" cy="102" r="11" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.8" />
          <circle cx="128" cy="108" r="13" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.8" />
          <circle cx="106" cy="64" r="9" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.4" />
          <circle cx="124" cy="58" r="7" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.4" />
        </g>
      )}

      {variant === 'molecules-bond' && (
        <g>
          {/* Sleek 3D Ball-and-Stick Chemistry Molecule */}
          <line x1="72" y1="88" x2="110" y2="54" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
          <line x1="110" y1="54" x2="148" y2="88" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
          <line x1="110" y1="54" x2="110" y2="118" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
          <line x1="110" y1="118" x2="152" y2="128" stroke="#334155" strokeWidth="4" strokeLinecap="round" />

          {/* Carbon / Central atoms */}
          <circle cx="110" cy="54" r="20" fill="#1d1d1f" />
          <circle cx="103" cy="47" r="6" fill="#ffffff" fillOpacity="0.3" />
          <circle cx="110" cy="118" r="16" fill="#0071e3" />
          <circle cx="105" cy="113" r="4.5" fill="#ffffff" fillOpacity="0.35" />

          {/* Peripheral atoms */}
          <circle cx="72" cy="88" r="15" fill="#ef4444" />
          <circle cx="67" cy="83" r="4.5" fill="#ffffff" fillOpacity="0.4" />
          <circle cx="148" cy="88" r="15" fill="#10b981" />
          <circle cx="143" cy="83" r="4.5" fill="#ffffff" fillOpacity="0.4" />
          <circle cx="152" cy="128" r="11" fill="#ffffff" stroke="#475569" strokeWidth="2" />
        </g>
      )}
    </svg>
  );
};
