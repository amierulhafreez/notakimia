import React from 'react';
import { Shared3DDefs } from './Shared3DDefs';

interface GraphicProps {
  uid: string;
}

export const Form5GraphicsB: Record<string, React.FC<GraphicProps>> = {
  /* 37. Termokimia: Haba Penyesaran */
  'haba-penyesaran': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="60" ry="7" fill={`url(#${uid}-floor)`} />
      {/* 3D Polystyrene Cup */}
      <path d="M68 54 L152 54 L142 130 Q110 138 78 130 Z" fill={`url(#${uid}-porcelain)`} stroke="#cbd5e1" strokeWidth="1.2" />
      <ellipse cx="110" cy="54" rx="42" ry="8" fill="#ffffff" stroke="#cbd5e1" />
      <ellipse cx="110" cy="64" rx="36" ry="6" fill="#0ea5e9" fillOpacity="0.6" />
      {/* Displaced Copper Precipitate Glow + Zinc Dust */}
      <circle cx="96" cy="112" r="6" fill={`url(#${uid}-sph-copper)`} className="sim3d-float" />
      <circle cx="114" cy="116" r="5" fill={`url(#${uid}-sph-copper)`} />
      <circle cx="126" cy="110" r="5" fill={`url(#${uid}-sph-silver)`} />
      {/* 3D Thermometer Reading Exothermic Spike */}
      <rect x="106" y="10" width="8" height="72" rx="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
      <rect x="108.5" y="20" width="3" height="58" rx="1.5" fill="#ef4444" className="sim3d-pulse" />
      <circle cx="110" cy="80" r="6" fill={`url(#${uid}-sph-rose)`} />
    </svg>
  ),

  /* 38. Termokimia: Haba Pembakaran Alkohol */
  'haba-pembakaran': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="64" ry="7" fill={`url(#${uid}-floor)`} />
      {/* Copper Calorimeter Can */}
      <rect x="74" y="26" width="72" height="58" rx="10" fill={`url(#${uid}-copper-cyl)`} stroke="#fed7aa" strokeWidth="1.2" />
      <ellipse cx="110" cy="26" rx="36" ry="7" fill="#fdba74" />
      <ellipse cx="110" cy="26" rx="30" ry="5" fill="#38bdf8" fillOpacity="0.7" />
      {/* Spirit Lamp Burning Alcohol */}
      <path d="M90 112 L130 112 L136 134 Q110 140 84 134 Z" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.3" />
      <path d="M88 122 L132 122 L134 132 Q110 138 86 132 Z" fill="#38bdf8" fillOpacity="0.45" />
      <rect x="107" y="104" width="6" height="10" fill="#e2e8f0" />
      {/* Dancing Spirit Flame */}
      <g className="sim3d-flame" style={{ transformOrigin: '110px 106px' }}>
        <path d="M110 82 Q122 95 116 106 L104 106 Q98 95 110 82 Z" fill={`url(#${uid}-flame-warm)`} />
        <path d="M110 92 Q115 99 112 105 L108 105 Q105 99 110 92 Z" fill="#fef08a" />
      </g>
    </svg>
  ),

  /* 39. Termokimia: Haba Peneutralan */
  'haba-peneutralan': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="64" ry="7" fill={`url(#${uid}-floor)`} />
      {/* Left & Right Pouring Acid/Alkali Cups */}
      <g transform="translate(30, 30) rotate(22)" className="sim3d-float-slow">
        <rect x="0" y="0" width="28" height="36" rx="6" fill={`url(#${uid}-glass)`} stroke="#ffffff" />
        <rect x="2" y="16" width="24" height="18" rx="4" fill="#ef4444" fillOpacity="0.55" />
      </g>
      <g transform="translate(162, 42) rotate(-22)" className="sim3d-float">
        <rect x="0" y="0" width="28" height="36" rx="6" fill={`url(#${uid}-glass)`} stroke="#ffffff" />
        <rect x="2" y="16" width="24" height="18" rx="4" fill="#3b82f6" fillOpacity="0.55" />
      </g>
      {/* Central Polystyrene Calorimeter Cup */}
      <path d="M74 72 L146 72 L138 130 Q110 138 82 130 Z" fill={`url(#${uid}-porcelain)`} stroke="#cbd5e1" strokeWidth="1.2" />
      <ellipse cx="110" cy="72" rx="36" ry="7" fill="#ffffff" stroke="#cbd5e1" />
      {/* Heat Badge */}
      <g transform="translate(86, 90)" className="sim3d-pulse">
        <rect x="0" y="0" width="48" height="22" rx="8" fill="#ef4444" />
        <text x="24" y="14" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#ffffff">−57 kJ</text>
      </g>
    </svg>
  ),

  /* 40. Termokimia: Haba Pemendakan */
  'haba-pemendakan': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="60" ry="7" fill={`url(#${uid}-floor)`} />
      {/* 3D Beaker / Calorimeter with White AgCl Precipitate Snowing Down */}
      <rect x="66" y="40" width="88" height="94" rx="14" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.5" />
      <path d="M68 68 Q110 74 152 68 L152 122 Q110 130 68 122 Z" fill="#e0f2fe" fillOpacity="0.38" />
      {/* Settled Precipitate Mound */}
      <path d="M72 122 Q110 106 148 122 Q110 132 72 122 Z" fill={`url(#${uid}-porcelain)`} />
      {/* Falling Precipitate Crystals */}
      <circle cx="90" cy="84" r="4" fill="#ffffff" className="sim3d-drop" />
      <circle cx="110" cy="76" r="4.5" fill="#ffffff" className="sim3d-drop" />
      <circle cx="130" cy="88" r="4" fill="#ffffff" className="sim3d-drop" />
    </svg>
  ),

  /* 41. Nilai Bahan Api: Etanol, Petrol & Hidrogen */
  'nilai-bahan-api': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="74" ry="7" fill={`url(#${uid}-floor)`} />
      {/* 3D Glowing Energy Columns comparing Etanol, Petrol, Hidrogen */}
      {/* Etanol */}
      <g transform="translate(50, 76)">
        <rect x="0" y="0" width="28" height="54" rx="7" fill={`url(#${uid}-sph-blue)`} />
        <ellipse cx="14" cy="0" rx="14" ry="4" fill="#bae6fd" />
        <text x="14" y="66" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff">Etanol</text>
      </g>
      {/* Petrol */}
      <g transform="translate(96, 54)">
        <rect x="0" y="0" width="28" height="76" rx="7" fill={`url(#${uid}-sph-amber)`} />
        <ellipse cx="14" cy="0" rx="14" ry="4" fill="#fef08a" />
        <text x="14" y="88" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff">Petrol</text>
      </g>
      {/* Hidrogen (Highest Fuel Value) */}
      <g transform="translate(142, 24)" className="sim3d-pulse">
        <rect x="0" y="0" width="28" height="106" rx="7" fill={`url(#${uid}-sph-emerald)`} />
        <ellipse cx="14" cy="0" rx="14" ry="4" fill="#a7f3d0" />
        <text x="14" y="118" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff">H₂</text>
      </g>
    </svg>
  ),

  /* 42. Penggumpalan Lateks & Pencegahannya */
  'penggumpalan-lateks': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="64" ry="7" fill={`url(#${uid}-floor)`} />
      {/* 3D Beaker with Milky White Latex */}
      <rect x="64" y="42" width="92" height="90" rx="14" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.5" />
      <path d="M66 68 Q110 74 154 68 L154 120 Q110 128 66 120 Z" fill="#f8fafc" fillOpacity="0.62" />
      {/* Coagulating Rubber Polymer Particles Clumping */}
      <g className="sim3d-vibrate">
        <circle cx="94" cy="96" r="11" fill={`url(#${uid}-porcelain)`} stroke="#94a3b8" />
        <circle cx="114" cy="94" r="12" fill={`url(#${uid}-porcelain)`} stroke="#94a3b8" />
        <circle cx="105" cy="110" r="11" fill={`url(#${uid}-porcelain)`} stroke="#94a3b8" />
      </g>
      {/* Acid H+ Droplet Neutralizing Negative Membrane */}
      <circle cx="110" cy="30" r="5" fill={`url(#${uid}-sph-rose)`} className="sim3d-drop" />
    </svg>
  ),

  /* 43. Kekenyalan Getah Asli vs Getah Tervulkan */
  'kekenyalan-getah-asli-tervulkan': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="74" ry="7" fill={`url(#${uid}-floor)`} />
      {/* Elastic Stretching Polymer Chains + Sulfur Cross-links (-S-S-) */}
      <g className="sim3d-stretch">
        {/* Top Polymer Chain */}
        <path d="M38 56 Q62 42 86 56 T134 56 T182 56" fill="none" stroke={`url(#${uid}-porcelain)`} strokeWidth="9" strokeLinecap="round" />
        {/* Bottom Polymer Chain */}
        <path d="M38 102 Q62 88 86 102 T134 102 T182 102" fill="none" stroke={`url(#${uid}-porcelain)`} strokeWidth="9" strokeLinecap="round" />
        {/* Sulfur Cross-Link Bridges */}
        <line x1="86" y1="58" x2="86" y2="100" stroke="#fbbf24" strokeWidth="4" />
        <circle cx="86" cy="79" r="7" fill={`url(#${uid}-sph-amber)`} />
        <line x1="134" y1="58" x2="134" y2="100" stroke="#fbbf24" strokeWidth="4" />
        <circle cx="134" cy="79" r="7" fill={`url(#${uid}-sph-amber)`} />
      </g>
    </svg>
  ),

  /* 44. Penghasilan Sabun (Saponifikasi) */
  'penghasilan-sabun': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="64" ry="7" fill={`url(#${uid}-floor)`} />
      {/* 3D Pastel Soap Bar + Glass Beaker */}
      <g transform="translate(56, 76)" className="sim3d-float">
        <rect x="0" y="16" width="108" height="44" rx="20" fill={`url(#${uid}-sph-rose)`} />
        <rect x="6" y="10" width="96" height="36" rx="16" fill="#fda4af" />
        <ellipse cx="54" cy="28" rx="34" ry="10" fill="#ffe4e6" fillOpacity="0.55" />
        <text x="54" y="32" textAnchor="middle" fontSize="11" fontWeight="800" fill="#881337">SABUN</text>
      </g>
      {/* Floating Iridescent Soap Bubbles */}
      <circle cx="72" cy="48" r="12" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.3" className="sim3d-bubble" />
      <circle cx="146" cy="42" r="15" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.3" className="sim3d-bubble-delay-1" />
      <circle cx="110" cy="28" r="9" fill={`url(#${uid}-glass)`} stroke="#ffffff" strokeWidth="1.3" className="sim3d-bubble-delay-2" />
    </svg>
  ),

  /* 45. Tindakan Pencucian Sabun & Detergen dalam Air Liat */
  'pencucian-sabun-detergen-air-liat': ({ uid }) => (
    <svg viewBox="0 0 220 155" className="w-full h-full select-none" aria-hidden="true">
      <Shared3DDefs uid={uid} />
      <ellipse cx="110" cy="142" rx="70" ry="7" fill={`url(#${uid}-floor)`} />
      {/* Clean Fabric Surface */}
      <rect x="34" y="122" width="152" height="12" rx="6" fill={`url(#${uid}-porcelain)`} />
      {/* Levitating Grease Droplet Surrounded by 3D Micelle Ring */}
      <g className="sim3d-float">
        <circle cx="110" cy="72" r="20" fill={`url(#${uid}-sph-dark)`} />
        <g className="sim3d-spin-slow" style={{ transformOrigin: '110px 72px' }}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const hx = 110 + Math.cos(rad) * 34;
            const hy = 72 + Math.sin(rad) * 34;
            const tx = 110 + Math.cos(rad) * 21;
            const ty = 72 + Math.sin(rad) * 21;
            return (
              <g key={deg}>
                <line x1={tx} y1={ty} x2={hx} y2={hy} stroke="#fef08a" strokeWidth="2.4" />
                <circle cx={hx} cy={hy} r="6.5" fill={`url(#${uid}-sph-blue)`} />
              </g>
            );
          })}
        </g>
      </g>
    </svg>
  ),
};
