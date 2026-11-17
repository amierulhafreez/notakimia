import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface AppleHeroShowcaseProps {
  onLaunchById: (simId: string) => void;
}

export const AppleHeroShowcase: React.FC<AppleHeroShowcaseProps> = ({ onLaunchById }) => {
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let rafId = 0;
    const updateParallax = () => {
      rafId = 0;
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      // Normalized progress (-1 .. 1) around center of viewport
      const progress = Math.max(-1, Math.min(1, (vh * 0.55 - (rect.top + rect.height * 0.5)) / vh));
      el.style.setProperty('--parallax', progress.toFixed(4));
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      style={{ '--parallax': '0' } as React.CSSProperties}
      className="relative max-w-5xl mx-auto mt-6 sm:mt-7"
    >
      {/* Ambient studio halo behind display */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-10 -top-6 -bottom-6 rounded-[48px] bg-gradient-to-b from-sky-200/35 via-indigo-200/20 to-transparent blur-3xl opacity-80"
      />

      {/* Apple Studio Hardware Frame */}
      <div className="relative rounded-[28px] sm:rounded-[34px] bg-[#0d0d10] border border-white/15 shadow-[0_36px_90px_-24px_rgba(0,0,0,0.45)] overflow-hidden p-4 sm:p-6">
        {/* Subtle studio radial overhead lighting */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(96,165,250,0.22),transparent_58%),radial-gradient(ellipse_at_85%_80%,rgba(52,211,153,0.14),transparent_55%)]"
        />

        {/* Minimal Apple Display Top Chrome */}
        <div className="relative z-10 flex items-center justify-between px-2 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </div>
          <div className="text-[11px] font-medium text-white/55 tracking-wide">
            Studio Makmal Maya · KSSM Tingkatan 4 &amp; 5
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interaktif</span>
          </div>
        </div>

        {/* Centerpiece Visual Grid (3 Studio Chemistry Chambers with Scrollytelling Parallax) */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 items-center">
          {/* LEFT STUDIO MODULE: Pentitratan (Moves up slightly on scroll) */}
          <button
            type="button"
            onClick={() => onLaunchById('pentitratan-asid-alkali')}
            style={{
              transform: 'translate3d(0, calc(var(--parallax) * -14px), 0)',
            }}
            className="md:col-span-4 group text-left rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-sky-400/40 p-4 transition-colors duration-300 cursor-pointer will-change-transform"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-300/90">
                Tingkatan 4 · Bab 6
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition" />
            </div>

            <div className="h-28 flex items-center justify-center">
              <svg viewBox="0 0 180 140" className="w-full h-full drop-shadow-[0_12px_20px_rgba(56,189,248,0.18)]">
                <defs>
                  <linearGradient id="appleGlass" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.32" />
                    <stop offset="35%" stopColor="#ffffff" stopOpacity="0.06" />
                    <stop offset="85%" stopColor="#ffffff" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
                  </linearGradient>
                  <linearGradient id="appleTitrationLiq" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f472b6" stopOpacity="0.78" />
                    <stop offset="100%" stopColor="#be185d" stopOpacity="0.92" />
                  </linearGradient>
                </defs>
                {/* Retort stand pole */}
                <rect x="40" y="10" width="4" height="122" rx="2" fill="#475569" />
                <rect x="26" y="128" width="128" height="5" rx="2.5" fill="#334155" />
                {/* Clamp */}
                <rect x="44" y="30" width="40" height="4" rx="2" fill="#64748b" />
                {/* Burette tube */}
                <rect x="82" y="12" width="12" height="56" rx="3" fill="url(#appleGlass)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
                <rect x="84" y="24" width="8" height="42" fill="#38bdf8" fillOpacity="0.55" />
                {/* Falling drop */}
                <circle cx="88" cy="75" r="2.2" fill="#7dd3fc">
                  <animate attributeName="cy" values="72;96" dur="1.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0" dur="1.4s" repeatCount="indefinite" />
                </circle>
                {/* Conical flask */}
                <path
                  d="M 80 86 L 80 96 L 60 124 Q 58 128 63 128 L 113 128 Q 118 128 116 124 L 96 96 L 96 86 Z"
                  fill="url(#appleGlass)"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="1.4"
                />
                <path
                  d="M 67 112 L 60 124 Q 59 127 63 127 L 113 127 Q 117 127 116 124 L 109 112 Z"
                  fill="url(#appleTitrationLiq)"
                />
                <ellipse cx="88" cy="112" rx="21" ry="3.2" fill="#fbcfe8" fillOpacity="0.7" />
              </svg>
            </div>

            <div className="mt-1 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-white">Pentitratan Asid-Bes</div>
                <div className="text-[11px] text-white/50">Keluk pH Masa Nyata</div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-pink-500/20 border border-pink-400/30 text-[10px] font-mono text-pink-200">
                pH 7.00
              </span>
            </div>
          </button>

          {/* CENTER HERO MODULE: Elektrolisis & Zarah Submikroskopik (Scales gently on scroll) */}
          <button
            type="button"
            onClick={() => onLaunchById('elektrolisis')}
            style={{
              transform: 'scale(calc(1 + var(--parallax) * 0.035))',
            }}
            className="md:col-span-4 group text-left rounded-2xl bg-gradient-to-b from-white/[0.09] to-white/[0.03] hover:from-white/[0.13] hover:to-white/[0.05] border border-white/20 hover:border-blue-400/50 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-colors duration-300 cursor-pointer will-change-transform"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-300">
                Utama · Aras Johnstone
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition" />
            </div>

            <div className="h-32 flex items-center justify-center">
              <svg viewBox="0 0 210 170" className="w-full h-full drop-shadow-[0_18px_32px_rgba(37,99,235,0.3)]">
                <defs>
                  <linearGradient id="cuSolution" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.92" />
                  </linearGradient>
                  <radialGradient id="studioOrb" cx="35%" cy="30%" r="65%">
                    <stop offset="0%" stopColor="#fde047" />
                    <stop offset="100%" stopColor="#eab308" />
                  </radialGradient>
                </defs>
                {/* Circuit Wires */}
                <path d="M 74 44 L 74 18 L 136 18 L 136 44" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
                {/* Minimal battery indicator */}
                <rect x="86" y="9" width="38" height="17" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="1.2" />
                <text x="105" y="20.5" textAnchor="middle" fontSize="7.8" fontWeight="700" fill="#f8fafc">6V DC</text>

                {/* Open Cylindrical Beaker */}
                <path
                  d="M 48 52 L 48 140 Q 48 152 60 152 L 150 152 Q 162 152 162 140 L 162 52"
                  fill="rgba(255,255,255,0.06)"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* Top elliptical opening */}
                <ellipse cx="105" cy="52" rx="57" ry="7.5" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.38)" strokeWidth="1.4" />

                {/* CuSO4 Solution */}
                <path
                  d="M 50 82 L 50 139 Q 50 150 61 150 L 149 150 Q 160 150 160 139 L 160 82 Z"
                  fill="url(#cuSolution)"
                />
                <ellipse cx="105" cy="82" rx="55" ry="6.5" fill="#7dd3fc" fillOpacity="0.6" stroke="#bae6fd" strokeWidth="1.1" />

                {/* Carbon Electrodes */}
                <rect x="68" y="42" width="12" height="90" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                <rect x="130" y="42" width="12" height="90" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1" />

                {/* Glowing Ions & Electrons */}
                <circle cx="96" cy="112" r="6" fill="url(#studioOrb)">
                  <animate attributeName="cx" values="92;118;92" dur="3.2s" repeatCount="indefinite" />
                </circle>
                <circle cx="116" cy="130" r="5" fill="#f472b6">
                  <animate attributeName="cx" values="118;88;118" dur="2.8s" repeatCount="indefinite" />
                </circle>
                {/* Bubbles at anode */}
                <circle cx="74" cy="96" r="2.2" fill="#e0f2fe">
                  <animate attributeName="cy" values="118;84" dur="1.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0" dur="1.2s" repeatCount="indefinite" />
                </circle>
                <circle cx="77" cy="108" r="1.8" fill="#e0f2fe">
                  <animate attributeName="cy" values="124;84" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0" dur="1.5s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>

            <div className="mt-1 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-white">Sel Elektrolisis</div>
                <div className="text-[11px] text-white/55">Makro · Zarah · Persamaan</div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#0071e3] text-[10px] font-semibold text-white">
                Buka
              </span>
            </div>
          </button>

          {/* RIGHT STUDIO MODULE: Termokimia / Isomer (Moves down subtly on scroll) */}
          <button
            type="button"
            onClick={() => onLaunchById('haba-pembakaran')}
            style={{
              transform: 'translate3d(0, calc(var(--parallax) * 14px), 0)',
            }}
            className="md:col-span-4 group text-left rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-amber-400/40 p-4 transition-colors duration-300 cursor-pointer will-change-transform"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-300/90">
                Tingkatan 5 · Bab 3
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition" />
            </div>

            <div className="h-28 flex items-center justify-center">
              <svg viewBox="0 0 180 140" className="w-full h-full drop-shadow-[0_12px_20px_rgba(245,158,11,0.18)]">
                <defs>
                  <linearGradient id="copperStudio" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#92400e" />
                    <stop offset="35%" stopColor="#f59e0b" />
                    <stop offset="75%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#78350f" />
                  </linearGradient>
                </defs>
                {/* Tripod */}
                <line x1="60" y1="68" x2="48" y2="128" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
                <line x1="120" y1="68" x2="132" y2="128" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
                <line x1="56" y1="68" x2="124" y2="68" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
                {/* Open-top copper calorimeter */}
                <path
                  d="M 65 26 L 65 59 Q 65 66 72 66 L 108 66 Q 115 66 115 59 L 115 26"
                  fill="url(#copperStudio)"
                  stroke="#fbbf24"
                  strokeOpacity="0.6"
                  strokeWidth="1.2"
                />
                <ellipse cx="90" cy="26" rx="25" ry="4.5" fill="#38bdf8" fillOpacity="0.7" stroke="#fbbf24" strokeWidth="1.2" />
                {/* Thermometer */}
                <rect x="88" y="8" width="4" height="46" rx="2" fill="#f8fafc" stroke="#94a3b8" strokeWidth="0.8" />
                <rect x="89.2" y="16" width="1.6" height="36" fill="#ef4444" />
                {/* Spirit lamp */}
                <rect x="70" y="116" width="40" height="12" rx="2" fill="#a16207" />
                <rect x="78" y="96" width="24" height="20" rx="4" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.4)" />
                <rect x="80" y="103" width="20" height="11" rx="2" fill="#38bdf8" fillOpacity="0.45" />
                {/* Flame */}
                <path d="M 90 70 C 96 78, 95 92, 90 94 C 85 92, 84 78, 90 70 Z" fill="#f97316">
                  <animate attributeName="opacity" values="0.85;1;0.8" dur="0.6s" repeatCount="indefinite" />
                </path>
                <path d="M 90 78 C 93 83, 93 91, 90 92 C 87 91, 87 83, 90 78 Z" fill="#fef08a" />
              </svg>
            </div>

            <div className="mt-1 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-white">Haba Pembakaran</div>
                <div className="text-[11px] text-white/50">Eksperimen 3B · ΔH</div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-[10px] font-mono text-amber-200">
                -1260 kJ
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
