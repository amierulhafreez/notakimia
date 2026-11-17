import React from 'react';
import {
  CationProfile,
  ReagentDef,
  TubeVisualResult,
  DosageStage,
} from '../data/cationTests';

interface CationTestTubeSVGProps {
  sampleLabel: string;
  cation: CationProfile;
  reagent: ReagentDef | null;
  dosage: DosageStage | null;
  result: TubeVisualResult | null;
  isHeated: boolean;
  isRinsing: boolean;
  isDragOver: boolean;
}

export const CationTestTubeSVG: React.FC<CationTestTubeSVGProps> = ({
  sampleLabel,
  cation,
  reagent,
  dosage,
  result,
  isHeated,
  isRinsing,
  isDragOver,
}) => {
  // Paras cecair mengikut langkah (Rajah 6.55 & Contoh 17-19):
  // 2.0 cm³ sampel awal (y=168), sedikit reagen (y=152), berlebihan (y=118)
  const liquidTopY = !reagent
    ? 168
    : dosage === 'excess'
    ? 118
    : 150;

  let liquidFill = cation.initialLiquidHex;
  let liquidOpacity = cation.initialLiquidOpacity;
  let showPrecipitate = false;
  let precipitateHex = '#ffffff';
  let precipitateLabel = '';
  let liquidLine1 = `2.0 cm³ ${sampleLabel}`;
  let liquidLine2 = `(${cation.initialColorLabel.toLowerCase()})`;

  if (result && reagent) {
    if (isHeated && result.heatedObservation) {
      liquidFill = result.heatedLiquidHex ?? result.liquidHex;
      liquidOpacity = result.heatedLiquidOpacity ?? result.liquidOpacity;
      showPrecipitate = Boolean(result.heatedHasPrecipitate);
      precipitateHex = result.precipitateHex;
      precipitateLabel = result.precipitateLabel ?? '';
      liquidLine1 = result.releasesAmmoniaGas
        ? 'Gas NH₃ terbebas'
        : showPrecipitate
        ? 'Campuran dipanaskan'
        : 'Larutan tidak';
      liquidLine2 = result.releasesAmmoniaGas
        ? '(berbau sengit)'
        : showPrecipitate
        ? '(hablur kekal)'
        : 'berwarna';
    } else {
      liquidFill = result.liquidHex;
      liquidOpacity = result.liquidOpacity;
      showPrecipitate = result.hasPrecipitate;
      precipitateHex = result.precipitateHex;
      precipitateLabel = result.precipitateLabel ?? '';

      if (liquidFill === '#1d4ed8') {
        liquidLine1 = 'Larutan biru tua';
        liquidLine2 = '(mendakan larut)';
      } else if (liquidFill === '#991b1b') {
        liquidLine1 = 'Larutan merah';
        liquidLine2 = 'darah terbentuk';
      } else if (liquidFill === '#4d7c0f') {
        liquidLine1 = 'Warna perang';
        liquidLine2 = 'kehijauan';
      } else if (liquidFill === '#b45309' || liquidFill === '#92400e') {
        liquidLine1 = 'Larutan perang';
        liquidLine2 = '(iodin terbentuk)';
      } else if (showPrecipitate) {
        liquidLine1 = 'Campuran larutan';
        liquidLine2 = 'dan mendakan';
      } else {
        liquidLine1 = 'Larutan tidak';
        liquidLine2 = 'berwarna';
      }
    }
  }

  const isLightPrecip =
    precipitateHex === '#f8fafc' ||
    precipitateHex === '#ffffff' ||
    precipitateHex === '#facc15';

  return (
    <svg
      viewBox="0 0 360 278"
      className="w-full max-w-[350px] h-auto select-none"
      role="img"
      aria-label={`Tabung uji bagi ${sampleLabel}`}
    >
      {/* Sorotan zon drop apabila reagen diseret */}
      {isDragOver && (
        <rect
          x="52"
          y="16"
          width="140"
          height="236"
          rx="18"
          fill="#f3e8ff"
          fillOpacity="0.6"
          stroke="#9333ea"
          strokeWidth="2.5"
          strokeDasharray="6 4"
        />
      )}

      {/* Animasi Aliran Bilasan Air Suling apabila Cuci Tabung Uji ditekan */}
      {isRinsing && (
        <g>
          <path
            d="M 102 8 L 116 8 L 116 24 L 106 24 L 106 32 L 96 32 L 96 20 Z"
            fill="#64748b"
          />
          <path
            d="M 101 32 Q 112 65 118 115 T 124 205"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.7"
          />
          <text x="170" y="34" fontSize="10.5" fontWeight="800" fill="#0284c7">
            Membilas & mengisi sampel baharu...
          </text>
        </g>
      )}

      {/* Penitis (Dropper gaya Rajah 6.55 & 6.58) di atas mulut tabung uji */}
      {!isRinsing && !(isHeated && result?.releasesAmmoniaGas) && (
        <g>
          {/* Bebuli getah penitis */}
          <path
            d="M 142 12 C 146 6 156 10 153 18 L 144 30 L 135 23 Z"
            fill={reagent ? reagent.bottleColorHex : '#64748b'}
            stroke="#1e293b"
            strokeWidth="1.2"
          />
          {/* Tiub kaca penitis */}
          <path
            d="M 135 23 L 144 30 L 126 56 L 122 54 Z"
            fill="#f8fafc"
            stroke="#334155"
            strokeWidth="1.3"
          />
          {/* Titisan reagen */}
          <path
            d="M 122 61 Q 125 67 122 70 Q 119 67 122 61 Z"
            fill={reagent ? reagent.bottleColorHex : '#38bdf8'}
            opacity={reagent ? 0.9 : 0.45}
          />
          {dosage === 'excess' && (
            <path
              d="M 122 75 Q 125 81 122 84 Q 119 81 122 75 Z"
              fill={reagent?.bottleColorHex ?? '#38bdf8'}
              opacity="0.85"
            />
          )}
        </g>
      )}

      {/* Kertas Litmus Merah Lembap (Rajah 6.55 atas kanan bila dipanaskan dengan NaOH) */}
      {isHeated && reagent?.id === 'naoh' && (
        <g>
          {/* Penjepit / jalur kertas litmus di mulut tabung uji */}
          <rect
            x="114"
            y="40"
            width="12"
            height="36"
            rx="1.5"
            fill="#f87171"
            stroke="#991b1b"
            strokeWidth="1"
          />
          {/* Bahagian bawah litmus berubah BIRU jika gas NH3 terbebas */}
          <rect
            x="114"
            y="58"
            width="12"
            height="18"
            rx="1"
            fill={result?.releasesAmmoniaGas ? '#2563eb' : '#f87171'}
          />
          {/* Gelembung / wap NH3 naik */}
          {result?.releasesAmmoniaGas && (
            <g stroke="#0284c7" strokeWidth="1.4" fill="none" strokeDasharray="2 2">
              <path d="M 116 145 L 116 82" />
              <path d="M 125 145 L 125 82" />
            </g>
          )}
        </g>
      )}

      {/* Pemegang Tabung Uji / Tapak Rak (Rajah 6.55) */}
      <g>
        <rect x="86" y="102" width="16" height="8" rx="2" fill="#92400e" stroke="#451a03" strokeWidth="1" />
        <rect x="38" y="104" width="52" height="5" rx="2" fill="#b45309" stroke="#451a03" strokeWidth="1" />
      </g>

      {/* Isi Cecair dalam Tabung Uji */}
      <path
        d={`M 103 ${liquidTopY} L 137 ${liquidTopY} L 137 210 C 137 221 130 228 120 228 C 110 228 103 221 103 210 Z`}
        fill={liquidFill}
        fillOpacity={liquidOpacity}
        style={{ transition: 'all 320ms ease' }}
      />
      {/* Meniskus cecair */}
      <ellipse
        cx="120"
        cy={liquidTopY}
        rx="17"
        ry="2.5"
        fill={liquidFill}
        fillOpacity={Math.min(0.9, liquidOpacity + 0.2)}
        stroke="#0284c7"
        strokeWidth="0.9"
      />

      {/* Lapisan Mendakan di dasar tabung uji */}
      {showPrecipitate && !isRinsing && (
        <g>
          <path
            d="M 104 202 Q 112 197 120 200 Q 128 203 136 200 L 136 211 C 136 220 129 226 120 226 C 111 226 104 220 104 211 Z"
            fill={precipitateHex}
            stroke={isLightPrecip ? '#64748b' : '#1e293b'}
            strokeWidth="1"
          />
          <circle
            cx="113"
            cy="210"
            r="1.8"
            fill={precipitateHex}
            stroke={isLightPrecip ? '#64748b' : '#1e293b'}
            strokeWidth="0.6"
          />
          <circle
            cx="125"
            cy="213"
            r="2"
            fill={precipitateHex}
            stroke={isLightPrecip ? '#64748b' : '#1e293b'}
            strokeWidth="0.6"
          />
          <circle
            cx="120"
            cy="206"
            r="1.6"
            fill={precipitateHex}
            stroke={isLightPrecip ? '#64748b' : '#1e293b'}
            strokeWidth="0.6"
          />
        </g>
      )}

      {/* Dinding Kaca Tabung Uji (gaya Rajah 6.55) */}
      <path
        d="M 98 76 Q 102 79 102 85 L 102 211 C 102 222 110 230 120 230 C 130 230 138 222 138 211 L 138 85 Q 138 79 142 76"
        fill="none"
        stroke="#1e293b"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
      {/* Kilauan kaca */}
      <line
        x1="107"
        y1="94"
        x2="107"
        y2="200"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* Penunu Bunsen ringkas di bawah tabung uji apabila dipanaskan (Rajah 6.55 & 6.58) */}
      {isHeated && (
        <g>
          <path d="M 120 235 Q 129 247 120 256 Q 111 247 120 235 Z" fill="#38bdf8" />
          <path d="M 120 241 Q 125 248 120 255 Q 115 248 120 241 Z" fill="#f97316" />
          <rect x="114" y="256" width="12" height="14" fill="#64748b" />
          <rect x="102" y="270" width="36" height="5" rx="2" fill="#334155" />
          <text x="155" y="254" fontSize="10" fontWeight="800" fill="#dc2626">
            Panaskan
          </text>
        </g>
      )}

      {/* Label Garis Penunjuk Buku Teks (sebelah kanan tabung uji) */}
      <g fontSize="10" fontWeight="700" fill="#1e293b">
        {/* Penitis / Litmus */}
        {isHeated && reagent?.id === 'naoh' ? (
          <>
            <line x1="128" y1="54" x2="174" y2="54" stroke="#64748b" strokeWidth="1.1" />
            <text x="178" y="51" fill="#0f172a">
              Kertas litmus
            </text>
            <text
              x="178"
              y="63"
              fill={result?.releasesAmmoniaGas ? '#1d4ed8' : '#b91c1c'}
            >
              {result?.releasesAmmoniaGas ? 'merah → BIRU' : 'merah lembap'}
            </text>
          </>
        ) : (
          <>
            <line x1="149" y1="24" x2="174" y2="24" stroke="#64748b" strokeWidth="1.1" />
            <text x="178" y="23" fill="#334155">
              {reagent ? `Reagen ${reagent.shortLabel}` : 'Penitis'}
            </text>
            {reagent && (
              <text x="178" y="35" fontSize="9.5" fill="#6b21a8">
                ({dosage === 'excess' ? 'Berlebihan' : 'Sedikit'})
              </text>
            )}
          </>
        )}

        {/* Larutan / Sampel */}
        <line
          x1="140"
          y1={Math.max(132, liquidTopY + 14)}
          x2="174"
          y2={Math.max(132, liquidTopY + 14)}
          stroke="#64748b"
          strokeWidth="1.1"
        />
        <text x="178" y={Math.max(135, liquidTopY + 14)} fill="#0f172a">
          {liquidLine1}
        </text>
        <text
          x="178"
          y={Math.max(147, liquidTopY + 26)}
          fontSize="9.5"
          fill="#475569"
        >
          {liquidLine2}
        </text>

        {/* Mendakan */}
        {showPrecipitate && precipitateLabel && (
          <>
            <line x1="138" y1="212" x2="174" y2="212" stroke="#7c3aed" strokeWidth="1.3" />
            <text x="178" y="210" fill="#6b21a8">
              {precipitateLabel}
            </text>
            <text x="178" y="222" fontSize="9" fill="#475569">
              {dosage === 'excess' && !isHeated
                ? 'Tidak larut berlebihan'
                : 'Terbentuk di dasar'}
            </text>
          </>
        )}
      </g>
    </svg>
  );
};
