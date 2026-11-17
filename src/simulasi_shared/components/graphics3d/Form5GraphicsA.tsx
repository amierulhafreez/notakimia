import React from 'react';
import { Shared3DDefs } from './Shared3DDefs';

interface GraphicProps {
  uid: string;
}

export const Form5GraphicsA: Record<string, React.FC<GraphicProps>> = {
  /* 22. Elektrolisis Sebatian Leburan & Larutan Akueus */
  'elektrolisis': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="68" ry="7" fill={`url(#${uid}-floor)`} />
      {/* 3D Battery Pack at Top */}
      <rect x="86" y="10" width="48" height="20" rx="5" fill={`url(#${uid}-metal)`} stroke="#ffffff" strokeOpacity="0.4" />
      <rect x="92" y="14" width="14" height="12" rx="2" fill="#ef4444" />
      <text x="99" y="23" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ffffff">+</text>
      <text x="122" y="23" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ffffff">−</text>
      {/* Wires to Carbon Electrodes */}
      <path d="M86 20 L68 20 L68 58" fill="none" stroke="#f87171" strokeWidth="2.5" />
      <path d="M134 20 L152 20 L152 58" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
      {/* 3D Glass Electrolytic Beaker */}
      <rect x="44" y="50" width="132" height="84" rx="14" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.5" />
      <path d="M46 76 Q110 82 174 76 L174 122 Q110 130 46 122 Z" fill="#0284c7" fillOpacity="0.38" />
      {/* Carbon Electrodes */}
      <rect x="62" y="58" width="12" height="62" rx="4" fill={`url(#${uid}-sph-dark)`} />
      <rect x="146" y="58" width="12" height="62" rx="4" fill={`url(#${uid}-sph-dark)`} />
      {/* Migrating Ions & Bubbles */}
      <circle cx="96" cy="96" r="5" fill={`url(#${uid}-sph-rose)`} className="sim3d-flow-x" />
      <circle cx="124" cy="108" r="5" fill={`url(#${uid}-sph-emerald)`} className="sim3d-sway" />
      <circle cx="68" cy="68" r="3" fill="#ffffff" className="sim3d-bubble" />
      <circle cx="152" cy="68" r="3" fill="#ffffff" className="sim3d-bubble-delay-1" />
    </svg>
  ),

  /* 23. Pengekstrakan Aluminium daripada Bauksit */
  'pengekstrakan-aluminium': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="76" ry="7" fill={`url(#${uid}-floor)`} />
      {/* 3D Industrial Steel Cell with Carbon Lining */}
      <path d="M36 52 L184 52 L176 130 L44 130 Z" fill={`url(#${uid}-metal)`} stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.5" />
      <path d="M44 60 L176 60 L170 120 L50 120 Z" fill="#1e293b" />
      {/* Glowing Molten Cryolite Bath */}
      <path d="M48 74 L172 74 L168 112 L52 112 Z" fill="#f59e0b" fillOpacity="0.65" className="sim3d-pulse" />
      {/* Liquid Aluminium Pool at Bottom */}
      <path d="M52 108 L168 108 L166 118 L54 118 Z" fill={`url(#${uid}-porcelain)`} />
      {/* 3 Suspended Carbon Anodes */}
      {[68, 102, 136].map((x, i) => (
        <g key={x} className={i === 1 ? 'sim3d-float-slow' : 'sim3d-float'}>
          <rect x={x} y="16" width="16" height="68" rx="3" fill={`url(#${uid}-sph-dark)`} stroke="#94a3b8" strokeWidth="0.8" />
        </g>
      ))}
      <circle cx="88" cy="70" r="3" fill="#ffffff" className="sim3d-bubble" />
      <circle cx="130" cy="70" r="3" fill="#ffffff" className="sim3d-bubble-delay-1" />
    </svg>
  ),

  /* 24. Pengekstrakan Besi daripada Bijihnya (Relau Bagas) */
  'pengekstrakan-besi': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="64" ry="7" fill={`url(#${uid}-floor)`} />
      {/* 3D Blast Furnace Tower */}
      <path d="M90 16 L130 16 L146 96 L136 134 L84 134 L74 96 Z" fill={`url(#${uid}-metal)`} stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.5" />
      {/* Glowing Molten Iron Core */}
      <path d="M84 102 L136 102 L132 130 L88 130 Z" fill={`url(#${uid}-flame-warm)`} className="sim3d-pulse" />
      {/* Hot Air Blast Tuyeres */}
      <rect x="46" y="106" width="32" height="8" rx="3" fill="#f97316" />
      <rect x="142" y="106" width="32" height="8" rx="3" fill="#f97316" />
      <circle cx="62" cy="110" r="3.5" fill="#fef08a" className="sim3d-flow-x" />
      {/* Charge Hoppers at Top (Fe2O3 + C + CaCO3) */}
      <circle cx="102" cy="24" r="5" fill={`url(#${uid}-sph-rose)`} className="sim3d-drop" />
      <circle cx="118" cy="24" r="5" fill={`url(#${uid}-sph-dark)`} className="sim3d-drop" />
    </svg>
  ),

  /* 25. Pemindahan Elektron pada Suatu Jarak (Tiub-U) */
  'pemindahan-elektron-tiub-u': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="144" rx="64" ry="7" fill={`url(#${uid}-floor)`} />
      {/* 3D Galvanometer Dial Above */}
      <circle cx="110" cy="28" r="18" fill={`url(#${uid}-porcelain)`} stroke="#64748b" strokeWidth="1.5" />
      <line x1="110" y1="34" x2="118" y2="20" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" className="sim3d-balance" />
      {/* Flowing Electron Sphere */}
      <path d="M70 54 L70 28 L92 28 M128 28 L150 28 L150 54" fill="none" stroke="#94a3b8" strokeWidth="2" />
      <circle cx="110" cy="12" r="4.5" fill={`url(#${uid}-sph-amber)`} className="sim3d-flow-x" />
      {/* 3D Glass U-Tube */}
      <path d="M58 50 L58 106 Q58 136 110 136 Q162 136 162 106 L162 50 L140 50 L140 104 Q140 118 110 118 Q80 118 80 104 L80 50 Z" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.5" />
      {/* Left Solution (Fe2+ Green) & Right Solution (KMnO4/Br2) */}
      <path d="M60 72 L78 72 L78 106 Q78 122 108 122 L108 134 Q60 134 60 106 Z" fill="#10b981" fillOpacity="0.5" />
      <path d="M142 72 L160 72 L160 106 Q160 134 112 134 L112 122 Q142 122 142 106 Z" fill="#f97316" fillOpacity="0.55" />
      {/* Carbon Electrodes */}
      <rect x="66" y="42" width="6" height="44" rx="2" fill={`url(#${uid}-sph-dark)`} />
      <rect x="148" y="42" width="6" height="44" rx="2" fill={`url(#${uid}-sph-dark)`} />
    </svg>
  ),

  /* 26. Penukaran Ion Fe2+ <-> Fe3+ */
  'penukaran-ion-ferum': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="140" rx="70" ry="8" fill={`url(#${uid}-floor)`} />
      {/* Orbiting Redox Arrows */}
      <ellipse cx="110" cy="76" rx="68" ry="34" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="8 6" className="sim3d-spin-slow" />
      {/* Fe2+ Emerald Sphere */}
      <g className="sim3d-float">
        <circle cx="68" cy="76" r="28" fill={`url(#${uid}-sph-emerald)`} />
        <text x="68" y="81" textAnchor="middle" fontSize="13" fontWeight="800" fill="#ffffff">Fe²⁺</text>
      </g>
      {/* Fe3+ Amber/Brown Sphere */}
      <g className="sim3d-float-slow">
        <circle cx="152" cy="76" r="28" fill={`url(#${uid}-sph-amber)`} />
        <text x="152" y="81" textAnchor="middle" fontSize="13" fontWeight="800" fill="#ffffff">Fe³⁺</text>
      </g>
      {/* Electron Transfer Dot */}
      <circle cx="110" cy="48" r="6" fill={`url(#${uid}-sph-blue)`} filter={`url(#${uid}-glow)`} className="sim3d-sway" />
      <text x="110" y="34" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ffffff">e⁻</text>
    </svg>
  ),

  /* 27. Penyesaran Halogen daripada Larutan Halida */
  'penyesaran-halogen-halida': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="48" ry="7" fill={`url(#${uid}-floor)`} />
      {/* 3D Test Tube with Two Immiscible Layers */}
      <rect x="86" y="30" width="48" height="104" rx="24" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.6" />
      {/* Bottom Aqueous Layer */}
      <path d="M88 86 L132 86 L132 110 Q110 132 88 110 Z" fill="#fef08a" fillOpacity="0.4" />
      {/* Top Organic Solvent Layer (Purple Iodine in 1,1,1-trichloroethane) */}
      <path d="M88 58 L132 58 L132 86 L88 86 Z" fill="#9333ea" fillOpacity="0.72" className="sim3d-pulse" />
      <ellipse cx="110" cy="58" rx="22" ry="4.5" fill="#c084fc" fillOpacity="0.75" />
      <circle cx="110" cy="72" r="5" fill={`url(#${uid}-sph-purple)`} className="sim3d-float" />
    </svg>
  ),

  /* 28. Sel Kimia: Voltan Pasangan Logam */
  'sel-kimia-voltan': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="76" ry="7" fill={`url(#${uid}-floor)`} />
      {/* Left & Right 3D Half-Cell Beakers */}
      <rect x="34" y="64" width="54" height="68" rx="10" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.4" />
      <path d="M36 90 L86 90 L86 122 Q61 128 36 122 Z" fill="#cbd5e1" fillOpacity="0.4" />
      <rect x="132" y="64" width="54" height="68" rx="10" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.4" />
      <path d="M134 90 L184 90 L184 122 Q159 128 134 122 Z" fill="#0ea5e9" fillOpacity="0.52" />
      {/* Zn & Cu Metal Plates */}
      <rect x="48" y="54" width="10" height="62" rx="2" fill={`url(#${uid}-metal)`} />
      <rect x="162" y="54" width="10" height="62" rx="2" fill={`url(#${uid}-copper-cyl)`} />
      {/* Arched 3D Salt Bridge */}
      <path d="M74 102 L74 52 Q110 38 146 52 L146 102" fill="none" stroke={`url(#${uid}-porcelain)`} strokeWidth="10" strokeLinecap="round" />
      {/* Digital Voltmeter Badge */}
      <g transform="translate(82, 12)" className="sim3d-float">
        <rect x="0" y="0" width="56" height="24" rx="7" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="28" y="16" textAnchor="middle" fontSize="11" fontWeight="800" fill="#34d399">1.10 V</text>
      </g>
    </svg>
  ),

  /* 29. Pengaratan Besi & Sentuhan Logam Lain */
  'pengaratan-besi-sentuhan-logam': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="140" rx="74" ry="8" fill={`url(#${uid}-floor)`} />
      {/* Agar Gel Petri Dish */}
      <ellipse cx="110" cy="96" rx="74" ry="34" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.5" />
      <ellipse cx="110" cy="92" rx="68" ry="28" fill="#fef08a" fillOpacity="0.32" />
      {/* Indicator Halos (Blue Fe2+ vs Pink OH-) */}
      <ellipse cx="78" cy="92" rx="18" ry="10" fill="#0284c7" fillOpacity="0.55" className="sim3d-pulse" />
      <ellipse cx="144" cy="92" rx="18" ry="10" fill="#ec4899" fillOpacity="0.55" className="sim3d-pulse" />
      {/* 3D Iron Nail + Coiled Sacrificial Metal */}
      <g transform="rotate(-8 110 92)">
        <rect x="64" y="88" width="84" height="8" rx="4" fill={`url(#${uid}-metal)`} />
        <rect x="58" y="84" width="8" height="16" rx="2" fill={`url(#${uid}-metal)`} />
        <path d="M148 88 L162 92 L148 96 Z" fill="#64748b" />
        {/* Copper/Mg Coil */}
        <path d="M95 85 Q100 99 105 85 Q110 99 115 85 Q120 99 125 85" fill="none" stroke={`url(#${uid}-copper-cyl)`} strokeWidth="3.5" strokeLinecap="round" />
      </g>
    </svg>
  ),

  /* 30. Melukis Formula Struktur Sebatian Karbon */
  'formula-struktur-karbon': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="140" rx="68" ry="8" fill={`url(#${uid}-floor)`} />
      {/* 3D Propane / Hydrocarbon Ball-and-Stick */}
      <g className="sim3d-float">
        <line x1="68" y1="84" x2="110" y2="62" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
        <line x1="110" y1="62" x2="152" y2="84" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
        <line x1="110" y1="62" x2="110" y2="30" stroke="#cbd5e1" strokeWidth="4" />
        <line x1="68" y1="84" x2="46" y2="106" stroke="#cbd5e1" strokeWidth="4" />
        <line x1="152" y1="84" x2="174" y2="106" stroke="#cbd5e1" strokeWidth="4" />
        {/* Carbon Spheres */}
        <circle cx="68" cy="84" r="15" fill={`url(#${uid}-sph-dark)`} />
        <circle cx="110" cy="62" r="16" fill={`url(#${uid}-sph-dark)`} />
        <circle cx="152" cy="84" r="15" fill={`url(#${uid}-sph-dark)`} />
        {/* Hydrogen Spheres */}
        <circle cx="110" cy="28" r="9" fill={`url(#${uid}-sph-silver)`} />
        <circle cx="44" cy="108" r="9" fill={`url(#${uid}-sph-silver)`} />
        <circle cx="176" cy="108" r="9" fill={`url(#${uid}-sph-silver)`} />
      </g>
    </svg>
  ),

  /* 31. Penentuan & Melukis Isomer Alkana, Alkena dan Alkohol */
  'penentuan-isomer': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="140" rx="74" ry="8" fill={`url(#${uid}-floor)`} />
      {/* Symmetry / Comparison Plane */}
      <line x1="110" y1="24" x2="110" y2="128" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="2" strokeDasharray="5 4" />
      {/* Left: Straight Chain C4 */}
      <g transform="translate(26, 48)" className="sim3d-float">
        <line x1="12" y1="30" x2="66" y2="30" stroke="#e2e8f0" strokeWidth="4" />
        <circle cx="12" cy="30" r="9" fill={`url(#${uid}-sph-dark)`} />
        <circle cx="30" cy="30" r="9" fill={`url(#${uid}-sph-dark)`} />
        <circle cx="48" cy="30" r="9" fill={`url(#${uid}-sph-dark)`} />
        <circle cx="66" cy="30" r="9" fill={`url(#${uid}-sph-dark)`} />
      </g>
      {/* Right: Branched Isomer */}
      <g transform="translate(124, 48)" className="sim3d-float-slow">
        <line x1="14" y1="42" x2="62" y2="42" stroke="#e2e8f0" strokeWidth="4" />
        <line x1="38" y1="42" x2="38" y2="14" stroke="#e2e8f0" strokeWidth="4" />
        <circle cx="14" cy="42" r="9" fill={`url(#${uid}-sph-indigo)`} />
        <circle cx="38" cy="42" r="9" fill={`url(#${uid}-sph-indigo)`} />
        <circle cx="62" cy="42" r="9" fill={`url(#${uid}-sph-indigo)`} />
        <circle cx="38" cy="14" r="9" fill={`url(#${uid}-sph-amber)`} />
      </g>
    </svg>
  ),

  /* 32. Ujian Kimia Alkana vs Alkena */
  'ujian-kimia-alkana-alkena': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="64" ry="7" fill={`url(#${uid}-floor)`} />
      {/* Left Test Tube: Alkana (Tetap Perang Bromin) */}
      <g transform="translate(64, 34)">
        <rect x="0" y="0" width="32" height="96" rx="16" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.5" />
        <path d="M2 50 L30 50 L30 80 Q16 94 2 80 Z" fill="#b45309" fillOpacity="0.82" />
        <text x="16" y="108" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#ffffff">ALKANA</text>
      </g>
      {/* Right Test Tube: Alkena (Luntur Warna -> Jernih) */}
      <g transform="translate(124, 34)">
        <rect x="0" y="0" width="32" height="96" rx="16" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.5" />
        <path d="M2 50 L30 50 L30 80 Q16 94 2 80 Z" fill="#e0f2fe" fillOpacity="0.45" className="sim3d-pulse" />
        <circle cx="16" cy="70" r="3" fill="#ffffff" className="sim3d-bubble" />
        <text x="16" y="108" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#ffffff">ALKENA</text>
      </g>
    </svg>
  ),

  /* 33. Penapaian Glukosa & Penyulingan Etanol */
  'penapaian-penyulingan-etanol': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="74" ry="7" fill={`url(#${uid}-floor)`} />
      {/* Round-Bottom Distillation Flask */}
      <circle cx="60" cy="96" r="28" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.5" />
      <rect x="53" y="42" width="14" height="30" rx="3" fill={`url(#${uid}-glass)`} stroke="#ffffff" />
      <path d="M35 100 Q60 105 85 100 A26 26 0 0 1 35 100 Z" fill="#fbbf24" fillOpacity="0.65" />
      {/* Angled Liebig Condenser */}
      <g transform="rotate(24 114 66)">
        <rect x="74" y="54" width="76" height="22" rx="8" fill="#38bdf8" fillOpacity="0.32" stroke="#ffffff" strokeWidth="1.2" />
        <line x1="68" y1="65" x2="156" y2="65" stroke="#ffffff" strokeWidth="3.5" />
      </g>
      {/* Receiving Conical Flask + Ethanol Drops */}
      <path d="M162 90 L176 90 L188 130 Q169 136 150 130 Z" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.4" />
      <circle cx="169" cy="96" r="3.5" fill={`url(#${uid}-sph-blue)`} className="sim3d-drop" />
      {/* Heating Flame */}
      <g className="sim3d-flame" style={{ transformOrigin: '60px 138px' }}>
        <path d="M60 122 Q68 130 64 138 L56 138 Q52 130 60 122 Z" fill={`url(#${uid}-flame-blue)`} />
      </g>
    </svg>
  ),

  /* 34. Sifat Kimia Alkena (Peta Hub 7 Tindak Balas) */
  'tindak-balas-kimia-alkena': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="68" ry="7" fill={`url(#${uid}-floor)`} />
      {/* Radial Reaction Hub Beams */}
      <line x1="110" y1="76" x2="52" y2="42" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" />
      <line x1="110" y1="76" x2="168" y2="42" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" />
      <line x1="110" y1="76" x2="52" y2="112" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" />
      <line x1="110" y1="76" x2="168" y2="112" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" />
      {/* Central C=C Core */}
      <g className="sim3d-pulse">
        <circle cx="110" cy="76" r="24" fill={`url(#${uid}-sph-indigo)`} />
        <text x="110" y="81" textAnchor="middle" fontSize="13" fontWeight="800" fill="#ffffff">C=C</text>
      </g>
      {/* 4 Orbiting Reaction Nodes */}
      <circle cx="52" cy="42" r="13" fill={`url(#${uid}-sph-blue)`} className="sim3d-float" />
      <circle cx="168" cy="42" r="13" fill={`url(#${uid}-sph-emerald)`} className="sim3d-float-slow" />
      <circle cx="52" cy="112" r="13" fill={`url(#${uid}-sph-amber)`} className="sim3d-float-slow" />
      <circle cx="168" cy="112" r="13" fill={`url(#${uid}-sph-rose)`} className="sim3d-float" />
    </svg>
  ),

  /* 35. Pengoksidaan Etanol kepada Asid Etanoik */
  'pengoksidaan-etanol': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="58" ry="7" fill={`url(#${uid}-floor)`} />
      {/* Reflux Boiling Tube with Color Shift (Orange Cr2O7^2- -> Green Cr3+) */}
      <rect x="92" y="16" width="36" height="44" rx="10" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.2" />
      <circle cx="110" cy="96" r="34" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.6" />
      <path d="M80 96 A30 30 0 0 0 140 96 Z" fill="#10b981" fillOpacity="0.72" className="sim3d-pulse" />
      <circle cx="110" cy="108" r="6" fill={`url(#${uid}-sph-amber)`} className="sim3d-bubble" />
      <g className="sim3d-flame" style={{ transformOrigin: '110px 140px' }}>
        <path d="M110 126 Q117 134 113 140 L107 140 Q103 134 110 126 Z" fill={`url(#${uid}-flame-blue)`} />
      </g>
    </svg>
  ),

  /* 36. Pengesteran (Alkohol & Asid Karboksilik) */
  'pengesteran-alkohol-asid-karboksilik': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="60" ry="7" fill={`url(#${uid}-floor)`} />
      {/* 3D Flask with Fruity Ester Layer */}
      <path d="M98 40 L122 40 L144 114 Q146 132 110 132 Q74 132 76 114 Z" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.5" />
      <path d="M82 100 Q110 106 138 100 L142 118 Q110 130 78 118 Z" fill="#fbbf24" fillOpacity="0.7" />
      {/* Sweet Fruity Ester Aroma Bubbles */}
      <circle cx="96" cy="26" r="7" fill={`url(#${uid}-sph-rose)`} className="sim3d-float" />
      <circle cx="124" cy="22" r="6" fill={`url(#${uid}-sph-amber)`} className="sim3d-float-slow" />
      <circle cx="110" cy="14" r="5" fill={`url(#${uid}-sph-emerald)`} className="sim3d-bubble" />
    </svg>
  ),
};
