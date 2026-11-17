import React from 'react';
import { Shared3DDefs } from './Shared3DDefs';

interface GraphicProps {
  uid: string;
}

export const Form4Graphics: Record<string, React.FC<GraphicProps>> = {
  /* 1. Keadaan Zarah: Perubahan Keadaan Jirim */
  'keadaan-zarah-jirim': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="74" ry="8" fill={`url(#${uid}-floor)`} />
      {/* Three 3D isometric glass chambers: Solid -> Liquid -> Gas */}
      {/* Solid Box */}
      <g transform="translate(22, 52)">
        <rect x="0" y="16" width="46" height="66" rx="10" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeOpacity="0.65" strokeWidth="1.4" />
        <ellipse cx="23" cy="16" rx="23" ry="6" fill={`url(#${uid}-rim)`} />
        <g className="sim3d-vibrate">
          {[14, 24, 34].map((x) =>
            [52, 62, 72].map((y) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="4.8" fill={`url(#${uid}-sph-blue)`} />
            ))
          )}
        </g>
        <text x="23" y="92" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff" opacity="0.9">PEPEJAL</text>
      </g>
      {/* Liquid Box */}
      <g transform="translate(87, 46)">
        <rect x="0" y="16" width="46" height="72" rx="10" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeOpacity="0.65" strokeWidth="1.4" />
        <path d="M2 52 Q23 48 44 52 L44 82 Q23 86 2 82 Z" fill="#38bdf8" fillOpacity="0.32" />
        <ellipse cx="23" cy="16" rx="23" ry="6" fill={`url(#${uid}-rim)`} />
        <g className="sim3d-sway">
          <circle cx="13" cy="60" r="4.8" fill={`url(#${uid}-sph-emerald)`} />
          <circle cx="25" cy="64" r="4.8" fill={`url(#${uid}-sph-emerald)`} />
          <circle cx="35" cy="58" r="4.8" fill={`url(#${uid}-sph-emerald)`} />
          <circle cx="18" cy="74" r="4.8" fill={`url(#${uid}-sph-emerald)`} />
          <circle cx="31" cy="75" r="4.8" fill={`url(#${uid}-sph-emerald)`} />
        </g>
        <text x="23" y="98" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff" opacity="0.9">CECAIR</text>
      </g>
      {/* Gas Box */}
      <g transform="translate(152, 40)">
        <rect x="0" y="16" width="46" height="78" rx="10" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeOpacity="0.65" strokeWidth="1.4" />
        <ellipse cx="23" cy="16" rx="23" ry="6" fill={`url(#${uid}-rim)`} />
        <circle cx="14" cy="40" r="4.5" fill={`url(#${uid}-sph-amber)`} className="sim3d-float" />
        <circle cx="32" cy="56" r="4.5" fill={`url(#${uid}-sph-amber)`} className="sim3d-float-slow" />
        <circle cx="20" cy="74" r="4.5" fill={`url(#${uid}-sph-amber)`} className="sim3d-bubble" />
        <circle cx="34" cy="30" r="4.5" fill={`url(#${uid}-sph-amber)`} className="sim3d-bubble-delay-1" />
        <text x="23" y="104" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff" opacity="0.9">GAS</text>
      </g>
    </svg>
  ),

  /* 2. Pemanasan & Penyejukan Naftalena */
  'pemanasan-dan-penyejukkan-naftalena': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="105" cy="142" rx="64" ry="8" fill={`url(#${uid}-floor)`} />
      {/* 3D Water Bath Beaker */}
      <path d="M58 58 L58 128 Q58 136 105 136 Q152 136 152 128 L152 58 Z" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeOpacity="0.7" strokeWidth="1.5" />
      <path d="M60 80 Q105 86 150 80 L150 127 Q105 134 60 127 Z" fill="#38bdf8" fillOpacity="0.35" />
      <ellipse cx="105" cy="58" rx="47" ry="8" fill={`url(#${uid}-rim)`} stroke="#ffffff" strokeOpacity="0.7" />
      {/* Inner Boiling Tube with Naphthalene Crystals */}
      <rect x="91" y="24" width="28" height="92" rx="14" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.4" />
      <path d="M93 84 L117 84 L117 104 Q105 114 93 104 Z" fill="#fef08a" fillOpacity="0.88" />
      {/* 3D Thermometer */}
      <rect x="102" y="10" width="6" height="86" rx="3" fill={`url(#${uid}-porcelain)`} stroke="#94a3b8" strokeWidth="0.8" />
      <rect x="103.8" y="34" width="2.4" height="60" rx="1.2" fill="#ef4444" className="sim3d-pulse" />
      <circle cx="105" cy="96" r="5" fill={`url(#${uid}-sph-rose)`} />
      {/* Bubbles */}
      <circle cx="76" cy="112" r="3" fill="#ffffff" fillOpacity="0.8" className="sim3d-bubble" />
      <circle cx="134" cy="116" r="2.5" fill="#ffffff" fillOpacity="0.8" className="sim3d-bubble-delay-1" />
      {/* Floating 3D Cooling Curve Badge */}
      <g transform="translate(148, 22)" className="sim3d-float">
        <rect x="0" y="0" width="54" height="36" rx="10" fill="#1e293b" fillOpacity="0.85" stroke="#ffffff" strokeOpacity="0.35" />
        <path d="M8 10 L20 20 L34 20 L46 28" fill="none" stroke="#38bdf8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="27" cy="20" r="2.5" fill="#fbbf24" />
        <text x="27" y="12" textAnchor="middle" fontSize="7" fontWeight="700" fill="#fef08a">80°C</text>
      </g>
    </svg>
  ),

  /* 3. Penghasilan Formula Kimia Sebatian Ion */
  'penghasilan-formula-kimia': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="140" rx="68" ry="8" fill={`url(#${uid}-floor)`} />
      {/* Electrostatic Attraction Halo */}
      <ellipse cx="110" cy="78" rx="74" ry="30" fill="none" stroke="#38bdf8" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="6 5" className="sim3d-pulse" />
      {/* Left 3D Cation Sphere (Na+ / Mg2+) */}
      <g className="sim3d-sway">
        <circle cx="74" cy="78" r="30" fill={`url(#${uid}-sph-blue)`} />
        <ellipse cx="64" cy="64" rx="10" ry="6" transform="rotate(-25 64 64)" fill="#ffffff" fillOpacity="0.42" />
        <text x="74" y="83" textAnchor="middle" fontSize="15" fontWeight="800" fill="#ffffff">M⁺</text>
      </g>
      {/* Right 3D Anion Sphere (Cl- / O2-) */}
      <g className="sim3d-float">
        <circle cx="146" cy="78" r="34" fill={`url(#${uid}-sph-emerald)`} />
        <ellipse cx="135" cy="63" rx="11" ry="6.5" transform="rotate(-25 135 63)" fill="#ffffff" fillOpacity="0.42" />
        <text x="146" y="83" textAnchor="middle" fontSize="15" fontWeight="800" fill="#ffffff">X⁻</text>
      </g>
      {/* Electrostatic Spark Bridge */}
      <g transform="translate(108, 78)" className="sim3d-spark">
        <circle cx="0" cy="0" r="8" fill="#fef08a" fillOpacity="0.9" filter={`url(#${uid}-glow)`} />
        <path d="M-4 -6 L2 -1 L-2 1 L4 6" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  ),

  /* 4. Seimbang Persamaan Kimia */
  'penyeimbangan-persamaan-kimia': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="64" ry="8" fill={`url(#${uid}-floor)`} />
      {/* 3D Metallic Pedestal & Pillar */}
      <ellipse cx="110" cy="134" rx="34" ry="7" fill={`url(#${uid}-metal)`} />
      <rect x="105" y="46" width="10" height="88" rx="4" fill={`url(#${uid}-metal)`} />
      <circle cx="110" cy="46" r="7" fill={`url(#${uid}-sph-amber)`} />
      {/* Oscillating Balance Beam */}
      <g className="sim3d-balance" style={{ transformOrigin: '110px 46px' }}>
        <rect x="34" y="43" width="152" height="6" rx="3" fill={`url(#${uid}-porcelain)`} stroke="#64748b" strokeWidth="0.8" />
        {/* Left Pan (Reactants) */}
        <line x1="46" y1="49" x2="32" y2="90" stroke="#e2e8f0" strokeWidth="1.6" />
        <line x1="46" y1="49" x2="60" y2="90" stroke="#e2e8f0" strokeWidth="1.6" />
        <ellipse cx="46" cy="92" rx="24" ry="6" fill={`url(#${uid}-metal)`} />
        <circle cx="38" cy="84" r="8" fill={`url(#${uid}-sph-rose)`} />
        <circle cx="52" cy="84" r="8" fill={`url(#${uid}-sph-rose)`} />
        <circle cx="45" cy="72" r="6" fill={`url(#${uid}-sph-silver)`} />
        {/* Right Pan (Products) */}
        <line x1="174" y1="49" x2="160" y2="90" stroke="#e2e8f0" strokeWidth="1.6" />
        <line x1="174" y1="49" x2="188" y2="90" stroke="#e2e8f0" strokeWidth="1.6" />
        <ellipse cx="174" cy="92" rx="24" ry="6" fill={`url(#${uid}-metal)`} />
        <circle cx="166" cy="84" r="7.5" fill={`url(#${uid}-sph-blue)`} />
        <circle cx="182" cy="84" r="7.5" fill={`url(#${uid}-sph-blue)`} />
        <circle cx="174" cy="73" r="7" fill={`url(#${uid}-sph-emerald)`} />
      </g>
    </svg>
  ),

  /* 5. Formula Empirik Magnesium Oksida (MgO) */
  'formula-empirik-mgo': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="144" rx="64" ry="7" fill={`url(#${uid}-floor)`} />
      {/* 3D Tripod Stand */}
      <line x1="74" y1="84" x2="58" y2="140" stroke="#334155" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="146" y1="84" x2="162" y2="140" stroke="#334155" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="110" y1="86" x2="110" y2="138" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="110" cy="84" rx="40" ry="7" fill="none" stroke={`url(#${uid}-metal)`} strokeWidth="5" />
      {/* 3D Bunsen Burner + Flickering Flame */}
      <rect x="98" y="132" width="24" height="8" rx="3" fill={`url(#${uid}-metal)`} />
      <rect x="106" y="106" width="8" height="27" rx="2" fill={`url(#${uid}-metal)`} />
      <g className="sim3d-flame" style={{ transformOrigin: '110px 108px' }}>
        <path d="M110 82 Q122 96 116 108 Q110 112 104 108 Q98 96 110 82 Z" fill={`url(#${uid}-flame-blue)`} />
        <path d="M110 92 Q115 100 112 107 L108 107 Q105 100 110 92 Z" fill="#fef08a" />
      </g>
      {/* 3D Porcelain Crucible + Tilted Lid */}
      <path d="M84 52 L92 84 Q110 90 128 84 L136 52 Z" fill={`url(#${uid}-porcelain)`} stroke="#cbd5e1" strokeWidth="1" />
      <ellipse cx="110" cy="52" rx="26" ry="6" fill="#ffffff" stroke="#cbd5e1" />
      {/* Bright Magnesium White Combustion Glow */}
      <circle cx="110" cy="48" r="14" fill="#ffffff" fillOpacity="0.9" filter={`url(#${uid}-glow)`} className="sim3d-spark" />
      {/* Slightly Tilted Crucible Lid */}
      <g transform="rotate(-14 110 44)" className="sim3d-float-slow">
        <ellipse cx="112" cy="44" rx="27" ry="5.5" fill={`url(#${uid}-porcelain)`} stroke="#94a3b8" strokeWidth="0.8" />
        <ellipse cx="112" cy="39" rx="5" ry="3" fill={`url(#${uid}-sph-silver)`} />
      </g>
    </svg>
  ),

  /* 6. Formula Empirik Kuprum(II) Oksida (CuO) */
  'formula-empirik-cuo': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="140" rx="76" ry="7" fill={`url(#${uid}-floor)`} />
      {/* Bunsen Flame heating the tube */}
      <rect x="104" y="114" width="10" height="24" rx="2" fill={`url(#${uid}-metal)`} />
      <g className="sim3d-flame" style={{ transformOrigin: '109px 114px' }}>
        <path d="M109 88 Q120 102 114 114 L104 114 Q98 102 109 88 Z" fill={`url(#${uid}-flame-blue)`} />
      </g>
      {/* 3D Glass Combustion Tube */}
      <rect x="26" y="64" width="166" height="24" rx="12" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeOpacity="0.8" strokeWidth="1.5" />
      {/* Flowing H2 Gas Particles */}
      <g className="sim3d-flow-x">
        <circle cx="48" cy="76" r="4" fill={`url(#${uid}-sph-blue)`} />
        <circle cx="66" cy="72" r="3.5" fill={`url(#${uid}-sph-blue)`} />
      </g>
      <g className="sim3d-flow-x-delay">
        <circle cx="52" cy="80" r="3.5" fill={`url(#${uid}-sph-silver)`} />
      </g>
      {/* Porcelain Boat with CuO -> shiny Cu pellets */}
      <path d="M84 79 L136 79 L130 86 L90 86 Z" fill={`url(#${uid}-porcelain)`} />
      <circle cx="102" cy="77" r="4.5" fill={`url(#${uid}-sph-dark)`} />
      <circle cx="112" cy="77" r="5" fill={`url(#${uid}-sph-copper)`} className="sim3d-pulse" />
      <circle cx="122" cy="77" r="4.5" fill={`url(#${uid}-sph-copper)`} />
      {/* Exit Excess H2 Flame */}
      <g className="sim3d-flame" style={{ transformOrigin: '193px 68px' }}>
        <path d="M193 48 Q201 58 197 68 L189 68 Q185 58 193 48 Z" fill={`url(#${uid}-flame-warm)`} />
      </g>
    </svg>
  ),

  /* 7. Kereaktifan Kumpulan 1 & Kumpulan 17 */
  'kereaktifan-k1-dan-k17': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="74" ry="8" fill={`url(#${uid}-floor)`} />
      {/* 3D Water Trough */}
      <rect x="38" y="60" width="144" height="76" rx="14" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeOpacity="0.8" strokeWidth="1.5" />
      <path d="M40 86 Q110 92 180 86 L180 124 Q110 132 40 124 Z" fill="#38bdf8" fillOpacity="0.4" />
      <ellipse cx="110" cy="60" rx="72" ry="9" fill={`url(#${uid}-rim)`} />
      {/* Darting Alkali Metal Sphere with Lilac/Golden Sparks */}
      <g className="sim3d-sway">
        <circle cx="108" cy="84" r="10" fill={`url(#${uid}-sph-silver)`} />
        <g className="sim3d-spark" style={{ transformOrigin: '108px 72px' }}>
          <path d="M108 58 L113 72 L124 68 L113 78 L118 86 L108 80 L98 86 L103 78 L92 68 L103 72 Z" fill="#c084fc" fillOpacity="0.85" />
          <circle cx="108" cy="74" r="5" fill="#fef08a" />
        </g>
      </g>
      {/* Rising H2 Bubbles */}
      <circle cx="94" cy="74" r="3" fill="#ffffff" className="sim3d-bubble" />
      <circle cx="122" cy="70" r="3.5" fill="#ffffff" className="sim3d-bubble-delay-1" />
      <circle cx="110" cy="66" r="2.5" fill="#ffffff" className="sim3d-bubble-delay-2" />
    </svg>
  ),

  /* 8. Sifat Oksida Unsur Kala 3 */
  'sifat-oksida-kala-3': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="76" ry="8" fill={`url(#${uid}-floor)`} />
      {/* 3D Cylinders transitioning across Period 3: Metallic -> Amphoteric -> Acidic Gas */}
      {/* Na2O (Metallic Base - Blue) */}
      <g transform="translate(36, 56)" className="sim3d-float">
        <rect x="0" y="10" width="32" height="58" rx="6" fill={`url(#${uid}-metal)`} />
        <ellipse cx="16" cy="10" rx="16" ry="5" fill="#e2e8f0" />
        <circle cx="16" cy="39" r="9" fill={`url(#${uid}-sph-blue)`} />
        <text x="16" y="78" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff">BES</text>
      </g>
      {/* Al2O3 (Amphoteric - Purple) */}
      <g transform="translate(94, 48)" className="sim3d-float-slow">
        <rect x="0" y="10" width="32" height="66" rx="6" fill={`url(#${uid}-porcelain)`} />
        <ellipse cx="16" cy="10" rx="16" ry="5" fill="#ffffff" />
        <circle cx="16" cy="43" r="9" fill={`url(#${uid}-sph-purple)`} />
        <text x="16" y="86" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff">AMFO</text>
      </g>
      {/* SO2 (Acidic Oxide - Rose/Red) */}
      <g transform="translate(152, 56)" className="sim3d-float">
        <rect x="0" y="10" width="32" height="58" rx="14" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.2" />
        <circle cx="16" cy="39" r="9" fill={`url(#${uid}-sph-rose)`} className="sim3d-pulse" />
        <text x="16" y="78" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff">ASID</text>
      </g>
    </svg>
  ),

  /* 9. Penghasilan Sebatian Ion & Sebatian Kovalen */
  'penghasilan-sebatian-kovalen': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="70" ry="8" fill={`url(#${uid}-floor)`} />
      {/* Overlapping 3D Electron Shells */}
      <g className="sim3d-float">
        <circle cx="84" cy="76" r="40" fill="#38bdf8" fillOpacity="0.16" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2" />
        <circle cx="136" cy="76" r="40" fill="#a855f7" fillOpacity="0.16" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2" />
        {/* 3D Atomic Cores */}
        <circle cx="72" cy="76" r="14" fill={`url(#${uid}-sph-blue)`} />
        <circle cx="148" cy="76" r="14" fill={`url(#${uid}-sph-indigo)`} />
        {/* Shared Covalent Electron Pair */}
        <g className="sim3d-spin-slow" style={{ transformOrigin: '110px 76px' }}>
          <circle cx="110" cy="62" r="5.5" fill={`url(#${uid}-sph-amber)`} />
          <circle cx="110" cy="90" r="5.5" fill={`url(#${uid}-sph-amber)`} />
        </g>
      </g>
    </svg>
  ),

  /* 10. Penerangan Daya Tarikan Antara Zarah (Tug of War) */
  'daya-tarikan-zarah': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="140" rx="74" ry="8" fill={`url(#${uid}-floor)`} />
      {/* 3D Tug of War Rope & Glow */}
      <g className="sim3d-sway">
        <line x1="56" y1="80" x2="164" y2="80" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" />
        {/* Left Atom Core */}
        <circle cx="52" cy="80" r="22" fill={`url(#${uid}-sph-rose)`} />
        <text x="52" y="85" textAnchor="middle" fontSize="12" fontWeight="800" fill="#ffffff">δ+</text>
        {/* Right High Electronegativity Core */}
        <circle cx="168" cy="80" r="28" fill={`url(#${uid}-sph-indigo)`} />
        <text x="168" y="85" textAnchor="middle" fontSize="13" fontWeight="800" fill="#ffffff">δ−</text>
        {/* Contested Electron Cloud */}
        <circle cx="122" cy="80" r="10" fill={`url(#${uid}-sph-amber)`} filter={`url(#${uid}-glow)`} />
      </g>
    </svg>
  ),

  /* 11. Penyediaan & Pencairan Larutan Piawai */
  'penyediaan-larutan-piawai': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="56" ry="7" fill={`url(#${uid}-floor)`} />
      {/* 3D Volumetric Flask */}
      <path d="M98 34 L122 34 L118 68 L146 112 Q150 134 110 134 Q70 134 74 112 L102 68 Z" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.5" />
      <path d="M77 108 Q110 114 143 108 L146 116 Q146 132 110 132 Q74 132 74 116 Z" fill="#0284c7" fillOpacity="0.65" />
      {/* Calibration Meniscus Ring */}
      <line x1="99" y1="56" x2="121" y2="56" stroke="#ef4444" strokeWidth="1.8" />
      {/* Pipette Drop */}
      <path d="M107 6 L113 6 L111 26 L109 26 Z" fill={`url(#${uid}-glass)`} stroke="#ffffff" />
      <circle cx="110" cy="36" r="4" fill={`url(#${uid}-sph-blue)`} className="sim3d-drop" />
    </svg>
  ),

  /* 12. Pentitratan Asid Alkali */
  'pentitratan-asid-alkali': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="54" ry="7" fill={`url(#${uid}-floor)`} />
      {/* 3D Conical Flask with Pink Phenolphthalein */}
      <path d="M97 82 L123 82 L144 128 Q146 136 110 136 Q74 136 76 128 Z" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.4" />
      <path d="M84 110 Q110 115 136 110 L142 127 Q142 134 110 134 Q78 134 78 127 Z" fill="#ec4899" fillOpacity="0.68" className="sim3d-pulse" />
      {/* 3D Burette */}
      <rect x="104" y="10" width="12" height="58" rx="4" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.3" />
      <rect x="106" y="22" width="8" height="38" fill="#38bdf8" fillOpacity="0.55" />
      <rect x="98" y="58" width="24" height="5" rx="2.5" fill={`url(#${uid}-sph-blue)`} />
      {/* Falling Acid Droplet */}
      <circle cx="110" cy="76" r="3.5" fill={`url(#${uid}-sph-blue)`} className="sim3d-drop" />
    </svg>
  ),

  /* 13. Keterlarutan Garam Dalam Air */
  'keterlarutan-garam': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="60" ry="7" fill={`url(#${uid}-floor)`} />
      {/* 3D Beaker */}
      <rect x="66" y="42" width="88" height="92" rx="14" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.5" />
      <path d="M68 68 Q110 74 152 68 L152 122 Q110 130 68 122 Z" fill="#38bdf8" fillOpacity="0.32" />
      {/* Salt Crystal Lattice at Bottom */}
      <rect x="94" y="108" width="12" height="12" rx="3" fill={`url(#${uid}-porcelain)`} />
      <rect x="108" y="110" width="12" height="12" rx="3" fill={`url(#${uid}-porcelain)`} />
      {/* Dissolving Hydrated Ions Rising */}
      <circle cx="88" cy="90" r="6.5" fill={`url(#${uid}-sph-amber)`} className="sim3d-float" />
      <circle cx="128" cy="84" r="6.5" fill={`url(#${uid}-sph-emerald)`} className="sim3d-float-slow" />
      <circle cx="108" cy="76" r="5" fill={`url(#${uid}-sph-blue)`} className="sim3d-bubble" />
    </svg>
  ),

  /* 14. Ujian Pengesahan Gas Makmal */
  'ujian-gas': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="52" ry="7" fill={`url(#${uid}-floor)`} />
      {/* 3D Test Tube */}
      <rect x="92" y="46" width="36" height="88" rx="18" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.5" />
      <path d="M94 94 L126 94 L126 116 Q110 132 94 116 Z" fill="#38bdf8" fillOpacity="0.45" />
      {/* Rising Gas Bubbles */}
      <circle cx="104" cy="90" r="3" fill="#ffffff" className="sim3d-bubble" />
      <circle cx="115" cy="84" r="3.5" fill="#ffffff" className="sim3d-bubble-delay-1" />
      {/* Glowing Wooden Splint & "POP!" Spark */}
      <line x1="110" y1="38" x2="152" y2="14" stroke="#b45309" strokeWidth="4.5" strokeLinecap="round" />
      <g className="sim3d-spark" style={{ transformOrigin: '108px 40px' }}>
        <circle cx="108" cy="40" r="10" fill="#fbbf24" fillOpacity="0.85" filter={`url(#${uid}-glow)`} />
        <circle cx="108" cy="40" r="5" fill="#ffffff" />
      </g>
    </svg>
  ),

  /* 15. Analisis Kualitatif: Ujian Kation */
  'ujian-kation': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="74" ry="7" fill={`url(#${uid}-floor)`} />
      {/* 3 Colored 3D Precipitate Test Tubes (Fe2+, Fe3+, Cu2+) */}
      {[
        { x: 56, color: '#10b981', sphere: 'sph-emerald' },
        { x: 100, color: '#d97706', sphere: 'sph-amber' },
        { x: 144, color: '#0ea5e9', sphere: 'sph-blue' },
      ].map((t, i) => (
        <g key={i} transform={`translate(${t.x}, 42)`} className={i === 1 ? 'sim3d-float' : 'sim3d-float-slow'}>
          <rect x="0" y="0" width="22" height="86" rx="11" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.3" />
          <path d="M2 50 L20 50 L20 75 Q11 84 2 75 Z" fill={t.color} fillOpacity="0.72" />
          <circle cx="11" cy="70" r="6" fill={`url(#${uid}-${t.sphere})`} />
        </g>
      ))}
    </svg>
  ),

  /* 16. Analisis Kualitatif: Ujian Anion (Brown Ring Test) */
  'ujian-anion': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="48" ry="7" fill={`url(#${uid}-floor)`} />
      {/* 3D Test Tube with Classic Brown Ring */}
      <rect x="88" y="34" width="44" height="100" rx="22" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.6" />
      <path d="M90 88 L130 88 L130 112 Q110 132 90 112 Z" fill="#fef08a" fillOpacity="0.35" />
      <path d="M90 62 L130 62 L130 84 L90 84 Z" fill="#38bdf8" fillOpacity="0.25" />
      {/* Glowing 3D Brown Ring Interface */}
      <ellipse cx="110" cy="86" rx="20" ry="5.5" fill="#78350f" stroke="#d97706" strokeWidth="1.5" className="sim3d-pulse" />
      <circle cx="110" cy="48" r="4" fill={`url(#${uid}-sph-amber)`} className="sim3d-drop" />
    </svg>
  ),

  /* 17. Kadar Tindak Balas: Faktor Saiz Bahan */
  'kadar-tindak-balas-saiz': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="70" ry="7" fill={`url(#${uid}-floor)`} />
      {/* Left: Large Marble Cube (Slow bubbles) */}
      <g transform="translate(46, 56)">
        <rect x="0" y="0" width="42" height="74" rx="10" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.3" />
        <rect x="11" y="42" width="20" height="20" rx="4" fill={`url(#${uid}-porcelain)`} />
        <circle cx="21" cy="34" r="3" fill="#ffffff" className="sim3d-bubble" />
      </g>
      {/* Right: Crushed Powder Granules (Rapid dense bubbles) */}
      <g transform="translate(128, 56)">
        <rect x="0" y="0" width="42" height="74" rx="10" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.3" />
        <circle cx="13" cy="60" r="4.5" fill={`url(#${uid}-porcelain)`} />
        <circle cx="23" cy="62" r="4.5" fill={`url(#${uid}-porcelain)`} />
        <circle cx="30" cy="59" r="4.5" fill={`url(#${uid}-porcelain)`} />
        <circle cx="14" cy="40" r="3.2" fill="#ffffff" className="sim3d-bubble" />
        <circle cx="22" cy="32" r="3.5" fill="#ffffff" className="sim3d-bubble-delay-1" />
        <circle cx="29" cy="44" r="2.8" fill="#ffffff" className="sim3d-bubble-delay-2" />
      </g>
    </svg>
  ),

  /* 18. Kadar Tindak Balas: Faktor Kepekatan */
  'kadar-tindak-balas-kepekatan': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="60" ry="7" fill={`url(#${uid}-floor)`} />
      {/* Base White Paper with "X" Mark */}
      <ellipse cx="110" cy="130" rx="46" ry="10" fill="#ffffff" stroke="#cbd5e1" />
      <path d="M100 126 L120 134 M120 126 L100 134" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      {/* 3D Flask with Dense Colliding Solute Spheres */}
      <path d="M96 42 L124 42 L144 120 Q110 130 76 120 Z" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.4" />
      <g className="sim3d-vibrate">
        <circle cx="96" cy="96" r="5" fill={`url(#${uid}-sph-amber)`} />
        <circle cx="112" cy="90" r="5" fill={`url(#${uid}-sph-amber)`} />
        <circle cx="122" cy="102" r="5" fill={`url(#${uid}-sph-amber)`} />
        <circle cx="104" cy="108" r="5" fill={`url(#${uid}-sph-amber)`} />
        <circle cx="116" cy="112" r="4.5" fill={`url(#${uid}-sph-amber)`} />
      </g>
    </svg>
  ),

  /* 19. Kadar Tindak Balas: Faktor Suhu */
  'kadar-tindak-balas-suhu': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="60" ry="7" fill={`url(#${uid}-floor)`} />
      {/* Warm Flame */}
      <g className="sim3d-flame" style={{ transformOrigin: '110px 136px' }}>
        <path d="M110 112 Q122 125 116 136 L104 136 Q98 125 110 112 Z" fill={`url(#${uid}-flame-warm)`} />
      </g>
      {/* 3D Flask with Energetic Particles */}
      <path d="M98 30 L122 30 L144 108 Q110 118 76 108 Z" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.4" />
      <g className="sim3d-vibrate">
        <circle cx="96" cy="84" r="5.5" fill={`url(#${uid}-sph-rose)`} />
        <circle cx="118" cy="76" r="5.5" fill={`url(#${uid}-sph-rose)`} />
        <circle cx="108" cy="96" r="5.5" fill={`url(#${uid}-sph-amber)`} />
      </g>
      {/* 3D Thermometer */}
      <rect x="150" y="34" width="12" height="72" rx="6" fill={`url(#${uid}-porcelain)`} />
      <rect x="153.5" y="48" width="5" height="46" rx="2.5" fill="#ef4444" className="sim3d-pulse" />
      <circle cx="156" cy="98" r="8" fill={`url(#${uid}-sph-rose)`} />
    </svg>
  ),

  /* 20. Kadar Tindak Balas: Faktor Mangkin */
  'kadar-tindak-balas-mangkin': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="140" rx="76" ry="7" fill={`url(#${uid}-floor)`} />
      {/* High Uncatalyzed Energy Barrier */}
      <path d="M30 118 Q110 14 190 118" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="4" strokeDasharray="6 5" />
      {/* Lower Catalyzed Shortcut Pathway */}
      <path d="M30 118 Q110 66 190 118" fill="none" stroke="#34d399" strokeWidth="5.5" strokeLinecap="round" filter={`url(#${uid}-glow)`} />
      {/* 3D Reactant Sphere Gliding Over Lower Barrier */}
      <g className="sim3d-float">
        <circle cx="110" cy="88" r="12" fill={`url(#${uid}-sph-emerald)`} />
        <circle cx="145" cy="100" r="8" fill={`url(#${uid}-sph-amber)`} />
      </g>
      <text x="110" y="34" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffffff" opacity="0.8">Ea Tanpa Mangkin</text>
      <text x="110" y="72" textAnchor="middle" fontSize="9" fontWeight="700" fill="#a7f3d0">Ea + Mangkin</text>
    </svg>
  ),

  /* 21. Kekerasan Aloi vs Logam Tulen */
  'kekerasan-aloi-logam-tulen': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="70" ry="7" fill={`url(#${uid}-floor)`} />
      {/* 3D Atomic Lattice with Foreign Alloy Atom */}
      <g transform="translate(46, 68)">
        {[0, 32, 64, 96].map((x) => (
          <circle key={`r1-${x}`} cx={x + 16} cy="16" r="13" fill={`url(#${uid}-sph-silver)`} />
        ))}
        <circle cx="16" cy="40" r="13" fill={`url(#${uid}-sph-silver)`} />
        <circle cx="48" cy="40" r="13" fill={`url(#${uid}-sph-silver)`} />
        {/* Larger Foreign Alloy Atom Locking Layers */}
        <circle cx="82" cy="40" r="16.5" fill={`url(#${uid}-sph-copper)`} className="sim3d-pulse" />
        <circle cx="114" cy="40" r="13" fill={`url(#${uid}-sph-silver)`} />
      </g>
      {/* Hovering Impact Steel Ball */}
      <g className="sim3d-float">
        <circle cx="110" cy="36" r="16" fill={`url(#${uid}-sph-dark)`} />
        <ellipse cx="104" cy="29" rx="5" ry="3" transform="rotate(-25 104 29)" fill="#ffffff" fillOpacity="0.5" />
      </g>
    </svg>
  ),
};
