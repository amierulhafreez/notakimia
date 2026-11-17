import React from 'react';

export type OxideChoice = 'fe2o3' | 'al2o3' | 'pbo';

interface IronCrucibleSVGProps {
  oxideId: OxideChoice;
  heating: boolean;
  hasReacted: boolean;
  canReact: boolean;
  magnetTestActive: boolean;
  limewaterTestActive: boolean;
  tempCelsius: number;
}

export const IronCrucibleSVG: React.FC<IronCrucibleSVGProps> = ({
  oxideId,
  heating,
  hasReacted,
  canReact,
  magnetTestActive,
  limewaterTestActive,
  tempCelsius,
}) => {
  const isReactingNow = heating && canReact && hasReacted;
  const isFe = oxideId === 'fe2o3';
  const isAl = oxideId === 'al2o3';
  const isPb = oxideId === 'pbo';

  const mixtureLabel = isFe
    ? 'Campuran Fe₂O₃ + Karbon (C)'
    : isAl
    ? 'Campuran Al₂O₃ + Karbon (C)'
    : 'Campuran PbO + Karbon (C)';

  const mixtureStateLabel =
    hasReacted && canReact
      ? isFe
        ? 'Hasil: Pepejal kelabu besi (Fe)'
        : 'Hasil: Pepejal kelabu plumbum (Pb)'
      : hasReacted && !canReact
      ? 'Tiada perubahan (Tiada tindak balas)'
      : heating && canReact
      ? 'Sedang dipanaskan kuat...'
      : isFe
      ? 'Serbuk perang kemerahan + hitam'
      : isAl
      ? 'Serbuk putih + hitam'
      : 'Serbuk kuning + hitam';

  // Powder base fill inside crucible
  const powderFill =
    isReactingNow
      ? '#f97316'
      : hasReacted && canReact
      ? '#64748b'
      : isFe
      ? '#9a3412'
      : isAl
      ? '#e2e8f0'
      : '#ca8a04';

  const powderStroke =
    isReactingNow
      ? '#ea580c'
      : hasReacted && canReact
      ? '#475569'
      : isFe
      ? '#7c2d12'
      : isAl
      ? '#94a3b8'
      : '#a16207';

  return (
    <svg
      viewBox="0 0 700 400"
      className="w-full h-auto max-h-[305px] select-none"
      role="img"
      aria-label="Rajah susunan radas eksperimen pemanasan ferum(III) oksida dengan karbon di dalam mangkuk pijar"
    >
      <defs>
        <linearGradient id="feLabBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>

        <linearGradient id="cruciblePorcelain" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="55%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>

        <radialGradient id="emberGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#f97316" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="bunsenOuterFlame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#38bdf8" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.45" />
        </linearGradient>

        <linearGradient id="bunsenInnerFlame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#eff6ff" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>

        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="125%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0f172a" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="700" height="400" rx="12" fill="url(#feLabBg)" />

      {/* Lab Bench Surface */}
      <rect x="24" y="346" width="652" height="10" rx="3" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
      <rect x="34" y="356" width="632" height="18" rx="3" fill="#e2e8f0" />

      {/* Temperature Badge top-left inside SVG */}
      <g transform="translate(18, 16)">
        <rect
          width="156"
          height="28"
          rx="8"
          fill={heating ? '#fff7ed' : '#ffffff'}
          stroke={heating ? '#fb923c' : '#cbd5e1'}
          strokeWidth="1.2"
        />
        <text
          x="12"
          y="18"
          fontSize="11"
          fontWeight="700"
          fill={heating ? '#9a3412' : '#475569'}
        >
          Suhu Mangkuk: {tempCelsius} °C
        </text>
      </g>

      {/* ================= APPARATUS (Centered at x = 290) ================= */}
      {/* Back tripod leg (behind Bunsen) */}
      <line x1="290" y1="176" x2="290" y2="346" stroke="#475569" strokeWidth="5.5" strokeLinecap="round" />

      {/* Bunsen Burner Gas Hose */}
      <path
        d="M 185 337 Q 222 337 254 333"
        fill="none"
        stroke="#334155"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Bunsen Base */}
      <polygon points="248,346 332,346 318,334 262,334" fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
      {/* Bunsen Collar / Air Hole */}
      <rect x="277" y="314" width="26" height="20" rx="2" fill="#64748b" stroke="#1e293b" strokeWidth="1.5" />
      <ellipse cx="290" cy="324" rx="5" ry="3.5" fill="#0f172a" />
      {/* Bunsen Barrel */}
      <rect x="281" y="232" width="18" height="82" rx="2" fill="#94a3b8" stroke="#334155" strokeWidth="1.5" />
      <rect x="285" y="232" width="5" height="82" fill="#cbd5e1" opacity="0.6" />

      {/* Bunsen Flame when heating */}
      {heating && (
        <g>
          {/* Outer roaring blue-orange flame touching underside of crucible */}
          <path
            d="M 280 232 Q 266 198 290 154 Q 314 198 300 232 Z"
            fill="url(#bunsenOuterFlame)"
          >
            <animate
              attributeName="d"
              values="M 280 232 Q 266 198 290 154 Q 314 198 300 232 Z; M 280 232 Q 262 194 290 148 Q 318 194 300 232 Z; M 280 232 Q 266 198 290 154 Q 314 198 300 232 Z"
              dur="0.45s"
              repeatCount="indefinite"
            />
          </path>
          {/* Inner hot blue cone */}
          <path d="M 284 232 Q 279 206 290 184 Q 301 206 296 232 Z" fill="url(#bunsenInnerFlame)">
            <animate
              attributeName="d"
              values="M 284 232 Q 279 206 290 184 Q 301 206 296 232 Z; M 284 232 Q 277 204 290 179 Q 303 204 296 232 Z; M 284 232 Q 279 206 290 184 Q 301 206 296 232 Z"
              dur="0.35s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      )}

      {/* Tripod Front Left & Right Legs */}
      <line x1="224" y1="174" x2="196" y2="346" stroke="#334155" strokeWidth="6.5" strokeLinecap="round" />
      <line x1="356" y1="174" x2="384" y2="346" stroke="#334155" strokeWidth="6.5" strokeLinecap="round" />
      {/* Tripod Top Ring Bar */}
      <rect x="210" y="167" width="160" height="8" rx="3" fill="#475569" stroke="#1e293b" strokeWidth="1.5" />

      {/* Pipe-clay Triangle (Alas segi tiga tanah liat) resting on tripod */}
      <line x1="216" y1="164" x2="364" y2="164" stroke="#64748b" strokeWidth="2.5" />
      <rect x="218" y="158" width="44" height="9" rx="4" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
      <rect x="318" y="158" width="44" height="9" rx="4" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
      <rect x="266" y="159" width="48" height="8" rx="4" fill="#fde68a" stroke="#b45309" strokeWidth="1.3" opacity="0.85" />

      {/* Crucible (Mangkuk pijar) - Cutaway upper half so mixture is clearly visible */}
      <path
        d="M 232 106 L 348 106 L 330 158 Q 324 166 290 166 Q 256 166 250 158 Z"
        fill="url(#cruciblePorcelain)"
        stroke="#475569"
        strokeWidth="2.2"
        filter="url(#softShadow)"
      />
      {/* Crucible inner rim cavity */}
      <ellipse cx="290" cy="108" rx="56" ry="11" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />

      {/* Powder Mixture Heap inside Crucible */}
      <path
        d="M 244 114 Q 290 95 336 114 Q 326 146 290 148 Q 254 146 244 114 Z"
        fill={powderFill}
        stroke={powderStroke}
        strokeWidth="1.3"
      />

      {/* Carbon & Oxide Speckles inside powder */}
      {!(hasReacted && canReact) ? (
        <g>
          {[
            [264, 118], [276, 110], [292, 116], [306, 109], [318, 118],
            [270, 128], [285, 126], [302, 127], [312, 122], [295, 110],
          ].map(([cx, cy], idx) => (
            <circle key={idx} cx={cx} cy={cy} r={idx % 2 === 0 ? 2.2 : 1.7} fill="#0f172a" opacity="0.78" />
          ))}
        </g>
      ) : (
        /* Metallic reduced particles (Fe or Pb) */
        <g>
          {[
            [266, 118], [278, 111], [290, 118], [304, 112], [316, 119],
            [274, 128], [288, 127], [303, 126],
          ].map(([cx, cy], idx) => (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r="2.8"
              fill="#cbd5e1"
              stroke="#334155"
              strokeWidth="0.8"
            />
          ))}
        </g>
      )}

      {/* Bright Glowing Reaction Effect ("Membara dengan terang") */}
      {isReactingNow && (
        <g>
          <ellipse cx="290" cy="112" rx="44" ry="20" fill="url(#emberGlow)">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="0.8s" repeatCount="indefinite" />
          </ellipse>
          {[268, 282, 294, 308, 318].map((sx, idx) => (
            <circle key={idx} cx={sx} cy={104 - (idx % 2) * 5} r="2.2" fill="#fef08a">
              <animate
                attributeName="cy"
                values={`${104};${76 - idx * 3};${104}`}
                dur={`${0.9 + idx * 0.15}s`}
                repeatCount="indefinite"
              />
              <animate attributeName="opacity" values="1;0;1" dur={`${0.9 + idx * 0.15}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
      )}

      {/* Crucible front rim lip */}
      <path
        d="M 232 106 Q 290 118 348 106 L 330 158 Q 324 166 290 166 Q 256 166 250 158 Z"
        fill="url(#cruciblePorcelain)"
        opacity="0.72"
        stroke="#475569"
        strokeWidth="2"
      />

      {/* Rising CO2 Gas Bubbles / Plume when reacted and reactive */}
      {hasReacted && canReact && (
        <g>
          {[
            { cx: 298, yStart: 96, yEnd: 46, delay: '0s', label: 'CO₂' },
            { cx: 318, yStart: 92, yEnd: 52, delay: '0.6s', label: 'CO₂' },
            { cx: 278, yStart: 94, yEnd: 54, delay: '1.1s', label: '' },
          ].map((g, idx) => (
            <g key={idx}>
              <circle cx={g.cx} cy={g.yStart} r="7.5" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" opacity="0.9">
                <animate attributeName="cy" values={`${g.yStart};${g.yEnd}`} dur="2.1s" begin={g.delay} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.95;0" dur="2.1s" begin={g.delay} repeatCount="indefinite" />
              </circle>
              {g.label && (
                <text x={g.cx} y={g.yStart + 3} fontSize="6.5" fontWeight="800" fill="#0369a1" textAnchor="middle">
                  CO₂
                  <animate attributeName="y" values={`${g.yStart + 3};${g.yEnd + 3}`} dur="2.1s" begin={g.delay} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.95;0" dur="2.1s" begin={g.delay} repeatCount="indefinite" />
                </text>
              )}
            </g>
          ))}
        </g>
      )}

      {/* Optional Magnet Test Visual (descending bar magnet above crucible) */}
      {magnetTestActive && (
        <g filter="url(#softShadow)">
          {/* Bar Magnet */}
          <rect x="242" y="34" width="46" height="24" rx="4" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.5" />
          <rect x="288" y="34" width="46" height="24" rx="4" fill="#2563eb" stroke="#1e3a8a" strokeWidth="1.5" />
          <text x="265" y="50" fontSize="11" fontWeight="800" fill="#ffffff" textAnchor="middle">U</text>
          <text x="311" y="50" fontSize="11" fontWeight="800" fill="#ffffff" textAnchor="middle">S</text>

          {isFe && hasReacted ? (
            <g>
              {/* Magnetic attraction field lines */}
              <path d="M 270 60 Q 272 80 274 96" fill="none" stroke="#475569" strokeWidth="1.2" strokeDasharray="3 2" />
              <path d="M 306 60 Q 304 80 302 96" fill="none" stroke="#475569" strokeWidth="1.2" strokeDasharray="3 2" />
              {/* Grey Iron grains sticking to magnet */}
              {[268, 276, 286, 296, 304].map((mx, i) => (
                <circle key={i} cx={mx} cy={63 + (i % 2) * 3} r="3" fill="#94a3b8" stroke="#1e293b" strokeWidth="1">
                  <animate attributeName="cy" values={`96;${63 + (i % 2) * 3}`} dur="0.7s" fill="freeze" />
                </circle>
              ))}
              <rect x="206" y="6" width="168" height="22" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.2" />
              <text x="290" y="21" fontSize="9.5" fontWeight="800" fill="#166534" textAnchor="middle">
                Fe tertarik pada magnet!
              </text>
            </g>
          ) : (
            <g>
              <rect x="202" y="6" width="176" height="22" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.2" />
              <text x="290" y="21" fontSize="9.5" fontWeight="800" fill="#991b1b" textAnchor="middle">
                {isAl || !hasReacted ? 'Tiada tarikan magnet' : 'Pb tidak bersifat magnetik'}
              </text>
            </g>
          )}
        </g>
      )}

      {/* ================= CLEAN NON-OVERLAPPING CALLOUT LABELS ================= */}
      {/* Left Column Labels (x = 18..178) */}
      {/* 1. Mangkuk pijar */}
      <g>
        <line x1="168" y1="84" x2="242" y2="122" stroke="#334155" strokeWidth="1.4" />
        <circle cx="242" cy="122" r="3.2" fill="#334155" />
        <rect x="18" y="68" width="150" height="32" rx="8" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.2" filter="url(#softShadow)" />
        <text x="93" y="88" fontSize="11.5" fontWeight="700" fill="#0f172a" textAnchor="middle">
          Mangkuk pijar
        </text>
      </g>

      {/* 2. Alas segi tiga tanah liat */}
      <g>
        <line x1="176" y1="154" x2="220" y2="162" stroke="#b45309" strokeWidth="1.4" />
        <circle cx="220" cy="162" r="3.2" fill="#b45309" />
        <rect x="18" y="134" width="158" height="40" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.2" filter="url(#softShadow)" />
        <text x="97" y="151" fontSize="11" fontWeight="700" fill="#78350f" textAnchor="middle">
          Alas segi tiga
        </text>
        <text x="97" y="165" fontSize="11" fontWeight="700" fill="#78350f" textAnchor="middle">
          tanah liat
        </text>
      </g>

      {/* 3. Tungku kaki tiga */}
      <g>
        <line x1="168" y1="226" x2="213" y2="236" stroke="#334155" strokeWidth="1.4" />
        <circle cx="213" cy="236" r="3.2" fill="#334155" />
        <rect x="18" y="210" width="150" height="32" rx="8" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.2" filter="url(#softShadow)" />
        <text x="93" y="230" fontSize="11.5" fontWeight="700" fill="#0f172a" textAnchor="middle">
          Tungku kaki tiga
        </text>
      </g>

      {/* 4. Penunu Bunsen */}
      <g>
        <line x1="168" y1="296" x2="281" y2="286" stroke="#ea580c" strokeWidth="1.4" />
        <circle cx="281" cy="286" r="3.2" fill="#ea580c" />
        <rect x="18" y="278" width="150" height="36" rx="8" fill="#ffffff" stroke="#fb923c" strokeWidth="1.2" filter="url(#softShadow)" />
        <text x="93" y="294" fontSize="11.5" fontWeight="700" fill="#9a3412" textAnchor="middle">
          Penunu Bunsen
        </text>
        <text x="93" y="307" fontSize="9.5" fontWeight="600" fill="#c2410c" textAnchor="middle">
          {heating ? 'Nyalaan panas (Aktif)' : 'Sumber haba (Tutup)'}
        </text>
      </g>

      {/* Right Column Labels (x = 434..682) */}
      {/* 5. Gas CO2 dibebaskan */}
      <g>
        <line x1="434" y1="52" x2="322" y2="74" stroke="#0284c7" strokeWidth="1.4" strokeDasharray="3 2" />
        <circle cx="322" cy="74" r="3.2" fill="#0284c7" />
        <rect
          x="434"
          y="26"
          width="248"
          height="48"
          rx="8"
          fill={hasReacted && canReact ? '#f0f9ff' : '#f8fafc'}
          stroke={hasReacted && canReact ? '#38bdf8' : '#cbd5e1'}
          strokeWidth="1.2"
          filter="url(#softShadow)"
        />
        <text x="558" y="46" fontSize="11.5" fontWeight="700" fill="#0c4a6e" textAnchor="middle">
          {hasReacted && canReact ? 'Gas karbon dioksida (CO₂) dibebaskan' : 'Gas dibebaskan (Jika bertindak balas)'}
        </text>
        <text x="558" y="62" fontSize="9.5" fontWeight="600" fill="#0369a1" textAnchor="middle">
          {hasReacted && canReact
            ? 'Mengeruhkan air kapur (C → CO₂)'
            : hasReacted && !canReact
            ? 'Tiada gas CO₂ terbebas'
            : 'Nyalakan Penunu Bunsen untuk menguji'}
        </text>
      </g>

      {/* 6. Campuran serbuk oksida + karbon */}
      <g>
        <line x1="434" y1="120" x2="318" y2="118" stroke="#c2410c" strokeWidth="1.5" />
        <circle cx="318" cy="118" r="3.5" fill="#c2410c" />
        <rect
          x="434"
          y="92"
          width="248"
          height="54"
          rx="8"
          fill="#fff7ed"
          stroke="#fb923c"
          strokeWidth="1.4"
          filter="url(#softShadow)"
        />
        <text x="558" y="114" fontSize="11.5" fontWeight="800" fill="#7c2d12" textAnchor="middle">
          {mixtureLabel}
        </text>
        <text x="558" y="132" fontSize="10" fontWeight="600" fill="#c2410c" textAnchor="middle">
          {mixtureStateLabel}
        </text>
      </g>

      {/* 7. Bottom-Right Interactive Test Inset: Air Kapur Test OR Prinsip Redoks Card */}
      {limewaterTestActive ? (
        <g transform="translate(434, 168)" filter="url(#softShadow)">
          <rect
            width="248"
            height="162"
            rx="10"
            fill="#ffffff"
            stroke="#0284c7"
            strokeWidth="1.4"
          />
          <text x="124" y="20" fontSize="11" fontWeight="800" fill="#0369a1" textAnchor="middle">
            UJIAN GAS: AIR KAPUR Ca(OH)₂
          </text>
          {/* Mini Test Tube */}
          <rect x="24" y="34" width="34" height="106" rx="17" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
          <path
            d="M 26 82 L 56 82 L 56 121 Q 56 138 41 138 Q 26 138 26 121 Z"
            fill={hasReacted && canReact ? '#e2e8f0' : '#e0f2fe'}
            opacity={hasReacted && canReact ? 0.95 : 0.65}
          />
          {/* Cloudy CaCO3 precipitate flecks if CO2 present */}
          {hasReacted && canReact && (
            <g>
              {[33, 41, 49, 36, 45, 32, 50].map((px, i) => (
                <circle key={i} cx={px} cy={96 + (i % 4) * 9} r="2" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.6" />
              ))}
            </g>
          )}
          <text x="72" y="62" fontSize="10.2" fontWeight="800" fill={hasReacted && canReact ? '#0369a1' : '#475569'}>
            {hasReacted && canReact ? 'Air kapur menjadi KERUH!' : 'Air kapur kekal JERNIH'}
          </text>
          <text x="72" y="81" fontSize="9.5" fontWeight="600" fill="#334155">
            {hasReacted && canReact ? 'Mendakan putih CaCO₃' : 'Tiada gas CO₂ terbentuk'}
          </text>
          <text x="72" y="96" fontSize="9.5" fontWeight="600" fill="#334155">
            {hasReacted && canReact ? 'terbentuk → Gas CO₂ hadir.' : 'setakat ini.'}
          </text>
          <rect x="72" y="114" width="162" height="28" rx="6" fill="#f0f9ff" stroke="#bae6fd" />
          <text x="153" y="132" fontSize="9.2" fontWeight="700" fill="#0c4a6e" textAnchor="middle">
            CO₂ + Ca(OH)₂ → CaCO₃ + H₂O
          </text>
        </g>
      ) : (
        <g transform="translate(434, 168)" filter="url(#softShadow)">
          <rect
            width="248"
            height="162"
            rx="10"
            fill="#ffffff"
            stroke="#cbd5e1"
            strokeWidth="1.2"
          />
          <text x="124" y="22" fontSize="10.5" fontWeight="800" fill="#334155" textAnchor="middle">
            KONSEP PENURUNAN OLEH KARBON
          </text>
          <line x1="16" y1="31" x2="232" y2="31" stroke="#e2e8f0" />

          <text x="16" y="50" fontSize="10" fontWeight="700" fill="#0f172a">
            Kedudukan dalam Siri Kereaktifan:
          </text>
          <rect x="16" y="58" width="216" height="24" rx="6" fill="#fff7ed" stroke="#fed7aa" />
          <text x="124" y="74" fontSize="10.5" fontWeight="800" fill="#9a3412" textAnchor="middle">
            Al &gt; [KARBON] &gt; Zn &gt; Fe &gt; Pb
          </text>

          <text x="16" y="102" fontSize="9.8" fontWeight="600" fill="#334155">
            {isAl
              ? '• Karbon KURANG reaktif daripada Al.'
              : isFe
              ? '• Karbon LEBIH reaktif daripada Fe.'
              : '• Karbon LEBIH reaktif daripada Pb.'}
          </text>
          <text x="16" y="118" fontSize="9.8" fontWeight="600" fill="#334155">
            {isAl
              ? '• Oksigen tidak dapat disingkirkan dari Al₂O₃.'
              : '• Karbon menyingkirkan oksigen sebagai CO₂.'}
          </text>
          <text x="16" y="134" fontSize="9.8" fontWeight="600" fill="#334155">
            {isAl
              ? '• Al perlu diekstrak secara elektrolisis.'
              : isFe
              ? '• Hasil: Logam ferum (Fe) tulen terhasil.'
              : '• Hasil: Logam plumbum (Pb) terhasil.'}
          </text>
          <text x="16" y="150" fontSize="9" fontWeight="700" fill="#0369a1">
            Tip: Klik butang &ldquo;Uji Magnet&rdquo; / &ldquo;Uji Air Kapur&rdquo;
          </text>
        </g>
      )}
    </svg>
  );
};
