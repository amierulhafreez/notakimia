import React from 'react';
import { SaltSynthesisResult } from '../data/saltSolubility';

interface WatchGlassScaleProps {
  salt: SaltSynthesisResult;
}

/**
 * Rajah 6.36 (kiri): Pepejal garam di atas piring kaca & penimbang elektronik
 */
export const WatchGlassScaleSVG: React.FC<WatchGlassScaleProps> = ({ salt }) => {
  const isLightCrystal =
    salt.solidHex === '#f1f5f9' ||
    salt.solidHex === '#fef08a' ||
    salt.solidHex === '#fde047' ||
    salt.solidHex === '#facc15';
  const strokeShade = isLightCrystal ? '#64748b' : '#1e293b';

  return (
    <svg
      viewBox="0 0 240 148"
      className="w-full max-w-[230px] h-auto select-none"
      role="img"
      aria-label={`Pepejal ${salt.saltName} di atas penimbang elektronik`}
    >
      {/* Longgokan hablur garam pepejal di atas piring kaca */}
      <g>
        <path
          d="M 76 58 Q 92 32 120 28 Q 148 32 164 58 Z"
          fill={salt.solidHex}
          stroke={strokeShade}
          strokeWidth="1.2"
        />
        {/* Faset kristal supaya tekstur pepejal jelas kelihatan */}
        <polygon
          points="102,52 114,34 124,52"
          fill={salt.solidHex}
          stroke={strokeShade}
          strokeWidth="0.9"
          opacity="0.85"
        />
        <polygon
          points="122,54 134,36 146,54"
          fill={salt.solidHex}
          stroke={strokeShade}
          strokeWidth="0.9"
          opacity="0.8"
        />
        <circle cx="94" cy="54" r="2.2" fill={salt.solidHex} stroke={strokeShade} strokeWidth="0.7" />
        <circle cx="148" cy="55" r="2" fill={salt.solidHex} stroke={strokeShade} strokeWidth="0.7" />
      </g>

      {/* Piring kaca / bikar kecil penimbang */}
      <path
        d="M 62 56 Q 120 68 178 56"
        fill="none"
        stroke="#475569"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <ellipse cx="120" cy="58" rx="58" ry="6" fill="#e2e8f0" fillOpacity="0.45" stroke="#64748b" strokeWidth="1.2" />

      {/* Piring logam penimbang */}
      <rect x="74" y="65" width="92" height="5" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
      <rect x="112" y="70" width="16" height="6" fill="#64748b" />

      {/* Badan Penimbang Elektronik (gaya Rajah 6.36) */}
      <path
        d="M 42 76 L 198 76 L 210 124 C 211 128 208 132 203 132 L 37 132 C 32 132 29 128 30 124 Z"
        fill="#e2e8f0"
        stroke="#475569"
        strokeWidth="1.8"
      />
      <rect x="44" y="84" width="152" height="40" rx="5" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />

      {/* Butang ON/OFF & Unit g */}
      <rect x="52" y="96" width="26" height="16" rx="3" fill="#0f766e" />
      <text x="65" y="107" textAnchor="middle" fontSize="8" fontWeight="800" fill="#ffffff">
        ON
      </text>

      {/* Skrin LCD Digital */}
      <rect x="86" y="93" width="84" height="22" rx="3" fill="#ecfeff" stroke="#0891b2" strokeWidth="1.2" />
      <text
        x="158"
        y="108.5"
        textAnchor="end"
        fontSize="12"
        fontWeight="800"
        fontFamily="monospace"
        fill="#0f172a"
      >
        2.00 g
      </text>

      <text x="180" y="107" fontSize="9.5" fontWeight="700" fill="#334155">
        g
      </text>

      {/* Label radas */}
      <text x="120" y="144" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#475569">
        Penimbang elektronik (Rajah 6.36)
      </text>
    </svg>
  );
};

interface SolubilityBeakerProps {
  salt: SaltSynthesisResult | null;
  hasDropped: boolean;
  isHotWater: boolean;
  isStirring: boolean;
  isDragOver: boolean;
}

/**
 * Rajah 6.36, 6.37 & 6.49: Bikar + Air Suling + Rod Kaca + Penunu Bunsen (pilihan Air Panas)
 */
export const SolubilityBeakerSVG: React.FC<SolubilityBeakerProps> = ({
  salt,
  hasDropped,
  isHotWater,
  isStirring,
  isDragOver,
}) => {
  const effectiveSoluble = salt
    ? isHotWater
      ? salt.hotWaterSoluble
      : salt.roomTempSoluble
    : true;

  const isSpecialCuI = salt?.status === 'special-redox' && salt.cation.id === 'cu2';

  // Warna cecair & opasiti
  let liquidFill = '#e0f2fe';
  let liquidOpacity = 0.38;
  if (salt && hasDropped) {
    if (effectiveSoluble || isSpecialCuI) {
      liquidFill = salt.aqueousHex;
      liquidOpacity = Math.max(0.32, salt.aqueousOpacity);
    } else {
      liquidFill = '#e0f2fe';
      liquidOpacity = 0.34;
    }
  }

  // Status mendakan di dasar bikar
  const showPrecipitate =
    Boolean(salt) && hasDropped && (!effectiveSoluble || isSpecialCuI);

  const rodTransform = isStirring ? 'rotate(-4 190 95)' : 'rotate(0 190 95)';

  return (
    <svg
      viewBox="0 0 375 286"
      className="w-full max-w-[360px] h-auto select-none"
      role="img"
      aria-label="Radas bikar makmal untuk ujian keterlarutan garam"
    >
      {/* Sorotan zon drop apabila pengguna mengheret garam */}
      {isDragOver && (
        <rect
          x="52"
          y="20"
          width="176"
          height="168"
          rx="16"
          fill="#ccfbf1"
          fillOpacity="0.45"
          stroke="#0d9488"
          strokeWidth="2.5"
          strokeDasharray="6 4"
        />
      )}

      {/* Penunjuk wap air apabila mod Air Panas 80°C aktif */}
      {isHotWater && (
        <g stroke="#94a3b8" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.75">
          <path d="M 108 32 Q 102 22 108 12" />
          <path d="M 136 28 Q 142 18 136 8" />
          <path d="M 164 32 Q 158 22 164 12" />
        </g>
      )}

      {/* Rod Kaca (dibelakang bibir depan bikar, mengikut Rajah 6.36 & 6.49) */}
      <g transform={rodTransform} style={{ transition: 'transform 250ms ease' }}>
        <line
          x1="205"
          y1="14"
          x2="132"
          y2="168"
          stroke="#64748b"
          strokeWidth="6.5"
          strokeLinecap="round"
        />
        <line
          x1="205"
          y1="14"
          x2="132"
          y2="168"
          stroke="#e2e8f0"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </g>

      {/* Isi padu air / larutan dalam bikar */}
      <path
        d="M 88 86 L 194 86 L 194 167 C 194 173 190 177 184 177 L 98 177 C 92 177 88 173 88 167 Z"
        fill={liquidFill}
        fillOpacity={liquidOpacity}
        style={{ transition: 'fill 350ms ease, fill-opacity 350ms ease' }}
      />
      {/* Meniskus air di permukaan atas */}
      <ellipse
        cx="141"
        cy="86"
        rx="53"
        ry="4.5"
        fill={liquidFill}
        fillOpacity={Math.min(0.85, liquidOpacity + 0.18)}
        stroke="#38bdf8"
        strokeWidth="1.2"
      />

      {/* Lapisan mendakan di dasar bikar jika tidak larut */}
      {showPrecipitate && salt && (
        <g>
          <path
            d="M 90 163 Q 116 155 141 160 Q 166 164 192 162 L 192 169 C 192 174 188 176 183 176 L 99 176 C 94 176 90 174 90 169 Z"
            fill={salt.precipitateHex}
            stroke="#475569"
            strokeWidth="1.1"
          />
          <circle cx="110" cy="168" r="2.2" fill={salt.precipitateHex} stroke="#475569" strokeWidth="0.7" />
          <circle cx="136" cy="166" r="2.4" fill={salt.precipitateHex} stroke="#475569" strokeWidth="0.7" />
          <circle cx="158" cy="169" r="2.2" fill={salt.precipitateHex} stroke="#475569" strokeWidth="0.7" />
          <circle cx="176" cy="167" r="2" fill={salt.precipitateHex} stroke="#475569" strokeWidth="0.7" />
        </g>
      )}

      {/* Zarah terlarut lembut jika larut */}
      {salt && hasDropped && effectiveSoluble && (
        <g opacity="0.55">
          <circle cx="112" cy="112" r="2.2" fill={salt.aqueousHex === '#e0f2fe' ? '#0284c7' : '#ffffff'} />
          <circle cx="154" cy="124" r="2" fill={salt.aqueousHex === '#e0f2fe' ? '#0284c7' : '#ffffff'} />
          <circle cx="128" cy="144" r="2.4" fill={salt.aqueousHex === '#e0f2fe' ? '#0284c7' : '#ffffff'} />
          <circle cx="170" cy="108" r="1.8" fill={salt.aqueousHex === '#e0f2fe' ? '#0284c7' : '#ffffff'} />
          <circle cx="164" cy="152" r="2.1" fill={salt.aqueousHex === '#e0f2fe' ? '#0284c7' : '#ffffff'} />
        </g>
      )}

      {/* Dinding Bikar Kaca (gaya Rajah 6.36 dengan muncung curahan di kiri) */}
      <path
        d="M 78 44 L 86 48 L 86 168 C 86 175 91 179 98 179 L 184 179 C 191 179 196 175 196 168 L 196 44"
        fill="none"
        stroke="#1e293b"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Senggatan isi padu pada bikar */}
      <g stroke="#475569" strokeWidth="1">
        <line x1="87" y1="68" x2="98" y2="68" />
        <line x1="87" y1="95" x2="101" y2="95" />
        <line x1="87" y1="122" x2="98" y2="122" />
        <line x1="87" y1="149" x2="101" y2="149" />
      </g>
      <text x="104" y="98" fontSize="8" fontWeight="600" fill="#475569">
        100
      </text>
      <text x="104" y="152" fontSize="8" fontWeight="600" fill="#475569">
        50
      </text>

      {/* Kasa Dawai & Tungku Kaki Tiga + Penunu Bunsen */}
      <g>
        {/* Kasa dawai */}
        <line x1="72" y1="183" x2="210" y2="183" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
        <line x1="88" y1="181" x2="194" y2="181" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 2" />
        {/* Kaki tungku tiga */}
        <line x1="80" y1="184" x2="62" y2="262" stroke="#475569" strokeWidth="3.2" strokeLinecap="round" />
        <line x1="202" y1="184" x2="220" y2="262" stroke="#475569" strokeWidth="3.2" strokeLinecap="round" />
        <line x1="141" y1="184" x2="141" y2="255" stroke="#64748b" strokeWidth="2.4" strokeDasharray="4 3" opacity="0.5" />

        {/* Penunu Bunsen */}
        <rect x="135" y="218" width="12" height="36" rx="1.5" fill="#64748b" stroke="#334155" strokeWidth="1.2" />
        <rect x="116" y="254" width="50" height="8" rx="3" fill="#334155" />
        {/* Tapak Meja Makmal */}
        <line x1="36" y1="263" x2="254" y2="263" stroke="#94a3b8" strokeWidth="2" />

        {/* Nyalaan api Bunsen apabila Air Panas (80°C) aktif */}
        {isHotWater ? (
          <g>
            <path
              d="M 141 185 Q 155 203 141 217 Q 127 203 141 185 Z"
              fill="#38bdf8"
              opacity="0.85"
            />
            <path
              d="M 141 193 Q 149 205 141 216 Q 133 205 141 193 Z"
              fill="#0284c7"
            />
            <text x="141" y="278" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#dc2626">
              Penunu Bunsen AKTIF (Air Panas 80 °C)
            </text>
          </g>
        ) : (
          <text x="141" y="278" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#475569">
            Suhu Bilik (28 °C • Air Suling 100 cm³)
          </text>
        )}
      </g>

      {/* Garis Penunjuk & Label Buku Teks KSSM (kanan bikar) */}
      <g fontSize="10" fontWeight="700" fill="#1e293b">
        {/* Rod kaca */}
        <line x1="196" y1="30" x2="225" y2="30" stroke="#64748b" strokeWidth="1.2" />
        <text x="230" y="33">Rod kaca</text>

        {/* Air suling / larutan */}
        <line x1="188" y1="114" x2="225" y2="114" stroke="#64748b" strokeWidth="1.2" />
        {!salt || !hasDropped ? (
          <text x="230" y="117" fill="#0369a1">
            Air suling
          </text>
        ) : isSpecialCuI ? (
          <>
            <text x="230" y="113" fill="#92400e">
              Larutan perang
            </text>
            <text x="230" y="125" fill="#92400e">
              iodin (I₂)
            </text>
          </>
        ) : effectiveSoluble ? (
          <>
            <text x="230" y="113" fill="#0f766e">
              Larutan garam
            </text>
            <text x="230" y="125" fontSize="9.5" fill="#0f766e">
              ({salt.aqueousColorName.split('(')[0].split('/')[0].trim()})
            </text>
          </>
        ) : (
          <text x="230" y="117" fill="#0369a1">
            Air kekal jernih
          </text>
        )}

        {/* Mendakan */}
        {showPrecipitate && salt && (
          <>
            <line x1="184" y1="168" x2="225" y2="168" stroke="#be123c" strokeWidth="1.3" />
            <text x="230" y="165" fill="#be123c">
              Mendakan
            </text>
            <text x="230" y="177" fontSize="9.5" fill="#be123c">
              {isSpecialCuI
                ? 'CuI putih'
                : salt.solidColorName.split('(')[0].split('/')[0].trim().toLowerCase()}
            </text>
          </>
        )}
      </g>
    </svg>
  );
};
