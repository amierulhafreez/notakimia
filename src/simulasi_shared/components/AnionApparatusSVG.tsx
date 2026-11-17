import React from 'react';
import {
  AnionSaltSample,
  AnionTestDef,
  AnionVisualResult,
  ReagentStage,
} from '../data/anionTests';

interface AnionApparatusSVGProps {
  sampleLabel: string;
  sample: AnionSaltSample;
  activeTest: AnionTestDef | null;
  stage: ReagentStage | null;
  result: AnionVisualResult | null;
  isHeatedColdView: boolean;
  isRinsing: boolean;
  isDragOver: boolean;
}

export const AnionApparatusSVG: React.FC<AnionApparatusSVGProps> = ({
  sampleLabel,
  sample,
  activeTest,
  stage,
  result,
  isHeatedColdView,
  isRinsing,
  isDragOver,
}) => {
  const solidFill =
    result && result.residueHex
      ? isHeatedColdView
        ? sample.coldResidueHex
        : sample.hotResidueHex
      : sample.solidHex;

  const isLightSolid =
    solidFill === '#f8fafc' ||
    solidFill === '#ffffff' ||
    solidFill === '#fef9c3' ||
    solidFill === '#fde047' ||
    solidFill === '#facc15';

  // 0. Animasi Cuci Tabung
  if (isRinsing) {
    return (
      <svg viewBox="0 0 380 270" className="w-full max-w-[360px] h-auto select-none">
        <path
          d="M 122 14 L 138 14 L 138 30 L 128 30 L 128 38 L 116 38 L 116 26 Z"
          fill="#64748b"
        />
        <path
          d="M 122 38 Q 134 74 140 120 T 145 206"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="7.5"
          strokeLinecap="round"
          opacity="0.72"
        />
        <path
          d="M 120 76 Q 124 79 124 85 L 124 211 C 124 222 132 230 142 230 C 152 230 160 222 160 211 L 160 85 Q 160 79 164 76"
          fill="none"
          stroke="#1e293b"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
        <text x="195" y="42" fontSize="11" fontWeight="800" fill="#0284c7">
          Membilas & menyediakan sampel baharu...
        </text>
      </svg>
    );
  }

  // 1. KEADAAN AWAL (Pepejal Garam X di dalam tabung didih kering)
  if (!activeTest || !result) {
    return (
      <svg viewBox="0 0 380 270" className="w-full max-w-[360px] h-auto select-none">
        {isDragOver && (
          <rect
            x="38"
            y="16"
            width="304"
            height="236"
            rx="18"
            fill="#f5d0fe"
            fillOpacity="0.45"
            stroke="#c026d3"
            strokeWidth="2.5"
            strokeDasharray="6 4"
          />
        )}

        {/* Tapak rak kayu & tabung didih */}
        <rect x="92" y="98" width="24" height="8" rx="2" fill="#b45309" stroke="#78350f" />
        <rect x="44" y="100" width="50" height="5" rx="2" fill="#d97706" stroke="#78350f" />

        {/* Hablur pepejal garam X di dasar tabung */}
        <path
          d="M 118 202 Q 130 194 142 200 Q 152 195 162 203 L 162 212 C 162 223 153 231 140 231 C 127 231 118 223 118 212 Z"
          fill={solidFill}
          stroke={isLightSolid ? '#64748b' : '#1e293b'}
          strokeWidth="1.2"
        />
        <circle cx="131" cy="212" r="2.2" fill={solidFill} stroke={isLightSolid ? '#64748b' : '#1e293b'} strokeWidth="0.7" />
        <circle cx="147" cy="215" r="2.4" fill={solidFill} stroke={isLightSolid ? '#64748b' : '#1e293b'} strokeWidth="0.7" />

        {/* Tabung didih */}
        <path
          d="M 110 64 Q 116 68 116 76 L 116 212 C 116 225 126 234 140 234 C 154 234 164 225 164 212 L 164 76 Q 164 68 170 64"
          fill="none"
          stroke="#1e293b"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <line x1="122" y1="86" x2="122" y2="195" stroke="#ffffff" strokeWidth="2" opacity="0.7" />

        {/* Label buku teks */}
        <g fontSize="10.5" fontWeight="700" fill="#1e293b">
          <line x1="166" y1="120" x2="205" y2="120" stroke="#64748b" strokeWidth="1.1" />
          <text x="210" y="123">Tabung didih</text>

          <line x1="164" y1="212" x2="205" y2="212" stroke="#9333ea" strokeWidth="1.2" />
          <text x="210" y="209" fill="#6b21a8">
            Pepejal {sampleLabel}
          </text>
          <text x="210" y="223" fontSize="10" fill="#475569">
            (Warna: {sample.solidColorLabel.toLowerCase()})
          </text>
        </g>
      </svg>
    );
  }

  // 2. PEMANASAN + AIR KAPUR (Rajah 6.46)
  if (result.mode === 'heating-limewater') {
    const showFlame = !isHeatedColdView;
    return (
      <svg viewBox="0 0 380 270" className="w-full max-w-[360px] h-auto select-none">
        {isDragOver && (
          <rect x="14" y="12" width="352" height="244" rx="16" fill="#f5d0fe" fillOpacity="0.4" stroke="#c026d3" strokeWidth="2.2" strokeDasharray="6 4" />
        )}

        {/* Tabung didih melintang di kiri (Rajah 6.46) */}
        <g>
          {/* Pepejal / Baki di hujung kiri tabung */}
          <path
            d="M 42 78 C 36 86 36 102 42 110 L 82 110 Q 75 94 58 92 Z"
            fill={solidFill}
            stroke={isLightSolid ? '#64748b' : '#1e293b'}
            strokeWidth="1.2"
          />
          {/* Dinding tabung didih mendatar */}
          <path
            d="M 164 76 L 52 76 C 32 76 32 112 52 112 L 164 112"
            fill="none"
            stroke="#1e293b"
            strokeWidth="2.3"
            strokeLinecap="round"
          />
          {/* Penyumbat getah */}
          <polygon points="154,78 172,80 172,108 154,110" fill="#9a3412" stroke="#451a03" strokeWidth="1.2" />
        </g>

        {/* Penunu Bunsen / Nyalaan bawah pepejal (jika bukan mod Sejuk) */}
        {showFlame ? (
          <g>
            <path d="M 56 122 Q 66 138 56 149 Q 46 138 56 122 Z" fill="#38bdf8" />
            <path d="M 56 130 Q 61 140 56 148 Q 51 140 56 130 Z" fill="#f97316" />
            <rect x="50" y="149" width="12" height="22" fill="#64748b" />
            <rect x="40" y="171" width="32" height="5" rx="2" fill="#334155" />
            <text x="56" y="191" textAnchor="middle" fontSize="10" fontWeight="800" fill="#dc2626">
              Panaskan
            </text>
          </g>
        ) : (
          <text x="56" y="142" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0369a1">
            Setelah Sejuk
          </text>
        )}

        {/* Salur penghantar masuk ke air kapur */}
        <path
          d="M 172 94 L 254 94 C 264 94 268 98 268 108 L 268 224"
          fill="none"
          stroke="#475569"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M 172 94 L 254 94 C 264 94 268 98 268 108 L 268 224"
          fill="none"
          stroke="#f8fafc"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Tabung uji berisi Air Kapur di kanan */}
        <path
          d="M 250 176 L 288 176 L 288 228 C 288 238 280 245 269 245 C 258 245 250 238 250 228 Z"
          fill={result.limewaterCloudy ? '#cbd5e1' : '#e0f2fe'}
          fillOpacity={result.limewaterCloudy ? 0.85 : 0.4}
          style={{ transition: 'all 350ms ease' }}
        />
        <ellipse
          cx="269"
          cy="176"
          rx="19"
          ry="2.5"
          fill={result.limewaterCloudy ? '#cbd5e1' : '#bae6fd'}
          stroke="#64748b"
          strokeWidth="0.9"
        />
        <path
          d="M 246 124 L 249 128 L 249 229 C 249 239 258 247 269 247 C 280 247 289 239 289 229 L 289 128 L 292 124"
          fill="none"
          stroke="#1e293b"
          strokeWidth="2.2"
        />

        {/* Gelembung gas CO2 jika terurai */}
        {result.hasEffervescence && (
          <g fill="#ffffff" stroke="#475569" strokeWidth="0.9">
            <circle cx="264" cy="215" r="2.6" />
            <circle cx="274" cy="202" r="2.2" />
            <circle cx="266" cy="189" r="2.8" />
          </g>
        )}

        {/* Label Rajah 6.46 */}
        <g fontSize="10" fontWeight="700" fill="#1e293b">
          <text x="58" y="54" textAnchor="middle" fill="#6b21a8">
            Baki ({isHeatedColdView ? 'Sejuk' : 'Panas'}):
          </text>
          <text x="58" y="66" textAnchor="middle" fill="#334155">
            {isHeatedColdView ? sample.coldResidueLabel.split('(')[0] : sample.hotResidueLabel.split('(')[0]}
          </text>
          <text x="218" y="84" textAnchor="middle">Salur penghantar</text>
          <line x1="291" y1="210" x2="310" y2="210" stroke="#64748b" strokeWidth="1" />
          <text x="313" y="207" fill={result.limewaterCloudy ? '#0f172a' : '#0369a1'}>
            Air kapur
          </text>
          <text x="313" y="220" fontSize="9.5" fill={result.limewaterCloudy ? '#b91c1c' : '#0369a1'}>
            {result.limewaterCloudy ? '(Keruh!)' : '(Kekal jernih)'}
          </text>
        </g>
      </svg>
    );
  }

  // 3. PEMANASAN + LITMUS BIRU LEMBAP & KAYU UJI BERBARA (Rajah 6.47)
  if (result.mode === 'heating-splint') {
    return (
      <svg viewBox="0 0 380 270" className="w-full max-w-[360px] h-auto select-none">
        {isDragOver && (
          <rect x="28" y="12" width="324" height="244" rx="16" fill="#f5d0fe" fillOpacity="0.4" stroke="#c026d3" strokeWidth="2.2" strokeDasharray="6 4" />
        )}

        {/* Kepulan gas perang NO2 jika terbebas */}
        {result.brownGas && (
          <path
            d="M 122 195 L 122 72 Q 140 50 158 72 L 158 195 Z"
            fill="#b45309"
            opacity="0.45"
          />
        )}

        {/* Kertas litmus biru lembap di sebelah kiri mulut tabung */}
        <g>
          <rect x="122" y="42" width="11" height="44" rx="1.5" fill="#3b82f6" stroke="#1e40af" strokeWidth="1" />
          {/* Bahagian bawah menjadi MERAH jika gas berasid (NO2 / SO2 / CO2) */}
          <rect
            x="122"
            y="64"
            width="11"
            height="22"
            rx="1"
            fill={result.litmusTurnsRed ? '#ef4444' : '#3b82f6'}
          />
        </g>

        {/* Kayu uji berbara di sebelah kanan mulut tabung */}
        <g>
          <line x1="152" y1="78" x2="184" y2="28" stroke="#d97706" strokeWidth="4.2" strokeLinecap="round" />
          {result.splintRelights ? (
            <>
              <path d="M 152 78 Q 160 66 150 56 Q 142 66 152 78 Z" fill="#facc15" stroke="#ea580c" strokeWidth="1" />
              <circle cx="152" cy="76" r="3" fill="#dc2626" />
            </>
          ) : (
            <circle cx="152" cy="78" r="3" fill="#f97316" />
          )}
        </g>

        {/* Pepejal / baki di dasar tabung didih */}
        <path
          d="M 119 196 Q 130 190 140 194 Q 150 198 161 195 L 161 206 C 161 217 152 224 140 224 C 128 224 119 217 119 206 Z"
          fill={solidFill}
          stroke={isLightSolid ? '#64748b' : '#1e293b'}
          strokeWidth="1.2"
        />

        {/* Tabung didih menegak */}
        <path
          d="M 112 72 Q 117 75 117 82 L 117 207 C 117 219 127 227 140 227 C 153 227 163 219 163 207 L 163 82 Q 163 75 168 72"
          fill="none"
          stroke="#1e293b"
          strokeWidth="2.3"
        />

        {/* Nyalaan Bunsen */}
        {!isHeatedColdView && (
          <g>
            <path d="M 140 232 Q 149 245 140 255 Q 131 245 140 232 Z" fill="#38bdf8" />
            <path d="M 140 239 Q 145 247 140 254 Q 135 247 140 239 Z" fill="#f97316" />
            <rect x="134" y="255" width="12" height="11" fill="#64748b" />
          </g>
        )}

        {/* Label Rajah 6.47 */}
        <g fontSize="10" fontWeight="700" fill="#1e293b">
          <line x1="122" y1="54" x2="96" y2="54" stroke="#64748b" strokeWidth="1" />
          <text x="92" y="50" textAnchor="end">Litmus biru</text>
          <text x="92" y="62" textAnchor="end" fill={result.litmusTurnsRed ? '#dc2626' : '#2563eb'}>
            {result.litmusTurnsRed ? '→ MERAH' : 'kekal biru'}
          </text>

          <line x1="172" y1="45" x2="208" y2="45" stroke="#64748b" strokeWidth="1" />
          <text x="212" y="42">Kayu uji berbara</text>
          <text x="212" y="54" fill={result.splintRelights ? '#d97706' : '#64748b'}>
            {result.splintRelights ? 'MENYALA (O₂)' : 'Tidak menyala'}
          </text>

          {result.brownGas && (
            <>
              <line x1="163" y1="120" x2="208" y2="120" stroke="#92400e" strokeWidth="1.1" />
              <text x="212" y="118" fill="#92400e">Gas perang (NO₂)</text>
            </>
          )}

          <line x1="162" y1="205" x2="208" y2="205" stroke="#64748b" strokeWidth="1" />
          <text x="212" y="203" fill="#6b21a8">
            Baki ({isHeatedColdView ? 'sejuk' : 'panas'}):
          </text>
          <text x="212" y="215" fontSize="9.5" fill="#334155">
            {isHeatedColdView ? sample.coldResidueLabel : sample.hotResidueLabel}
          </text>
        </g>
      </svg>
    );
  }

  // 4. UJIAN ION KARBONAT (Rajah 6.53: Dua tabung condong membentuk V-terbalik)
  if (result.mode === 'co3-limewater') {
    return (
      <svg viewBox="0 0 380 270" className="w-full max-w-[360px] h-auto select-none">
        <defs>
          <clipPath id="co3-left-tube-clip">
            <path
              transform="translate(214, 58) rotate(42)"
              d="M -15.5 48 L -15.5 172 A 15.5 15.5 0 0 0 15.5 172 L 15.5 48 Z"
            />
          </clipPath>
          <clipPath id="co3-right-tube-clip">
            <path
              transform="translate(214, 58) rotate(-42)"
              d="M -15.5 48 L -15.5 172 A 15.5 15.5 0 0 0 15.5 172 L 15.5 48 Z"
            />
          </clipPath>
        </defs>

        {isDragOver && (
          <rect x="14" y="12" width="352" height="244" rx="16" fill="#f5d0fe" fillOpacity="0.4" stroke="#c026d3" strokeWidth="2.2" strokeDasharray="6 4" />
        )}

        {/* Larutan garam + asid cair (tabung kiri — permukaan mendatar) */}
        <g clipPath="url(#co3-left-tube-clip)">
          <rect
            x="55"
            y="162"
            width="95"
            height="50"
            fill={result.liquidHex}
            fillOpacity={result.liquidOpacity}
          />
          <line x1="55" y1="162" x2="150" y2="162" stroke="#0284c7" strokeWidth="1.2" opacity="0.7" />
          <line x1="74" y1="172" x2="124" y2="172" stroke="#38bdf8" strokeWidth="1" strokeDasharray="5 3" opacity="0.55" />
          <line x1="74" y1="181" x2="120" y2="181" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 3" opacity="0.55" />
          <line x1="74" y1="190" x2="114" y2="190" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" opacity="0.45" />
          {result.hasEffervescence && (
            <g fill="#ffffff" stroke="#0284c7" strokeWidth="0.9">
              <circle cx="94" cy="190" r="2.2" />
              <circle cx="104" cy="181" r="2.5" />
              <circle cx="96" cy="171" r="2.0" />
              <circle cx="109" cy="174" r="2.3" />
              <circle cx="89" cy="177" r="1.9" />
            </g>
          )}
        </g>

        {/* Air kapur (tabung kanan — permukaan mendatar) */}
        <g clipPath="url(#co3-right-tube-clip)">
          <rect
            x="275"
            y="162"
            width="95"
            height="50"
            fill={result.limewaterCloudy ? '#e2e8f0' : '#e0f2fe'}
            fillOpacity={result.limewaterCloudy ? 0.88 : 0.4}
            style={{ transition: 'all 350ms ease' }}
          />
          <line
            x1="275"
            y1="162"
            x2="370"
            y2="162"
            stroke={result.limewaterCloudy ? '#94a3b8' : '#0284c7'}
            strokeWidth="1.2"
            opacity="0.75"
          />
        </g>

        {/* Salur penghantar kaca menembusi penyumbat kiri hingga tercelup ke dalam air kapur kanan */}
        <path
          d="M 165.8 111.5 L 204.6 68.4 Q 214 58 223.4 68.4 L 331.1 188.0"
          fill="none"
          stroke="#1e293b"
          strokeWidth="5.4"
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
        <path
          d="M 165.8 111.5 L 204.6 68.4 Q 214 58 223.4 68.4 L 331.1 188.0"
          fill="none"
          stroke="#f8fafc"
          strokeWidth="3.0"
          strokeLinecap="butt"
          strokeLinejoin="round"
        />

        {/* Tindihan cecair separa lutsinar & gelembung gas CO2 di hujung salur penghantar dalam air kapur */}
        <g clipPath="url(#co3-right-tube-clip)">
          <rect
            x="275"
            y="162"
            width="95"
            height="50"
            fill={result.limewaterCloudy ? '#cbd5e1' : '#bae6fd'}
            fillOpacity={result.limewaterCloudy ? 0.58 : 0.22}
          />
          {result.limewaterCloudy && (
            <g fill="#f8fafc" opacity="0.72">
              <circle cx="318" cy="184" r="6" />
              <circle cx="332" cy="176" r="7" />
              <circle cx="342" cy="186" r="5" />
            </g>
          )}
          {result.hasEffervescence && (
            <g fill="#ffffff" stroke="#475569" strokeWidth="0.9">
              <circle cx="329" cy="180" r="2.3" />
              <circle cx="334" cy="172" r="2.0" />
              <circle cx="326" cy="166" r="2.4" />
            </g>
          )}
        </g>

        {/* Tabung uji kiri condong (+42°, mulut menghadap puncak) & penyumbat getah */}
        <g transform="translate(214, 58) rotate(42)">
          {/* Penyumbat getah kedap pada mulut tabung kiri */}
          <polygon points="-16.6,35 16.6,35 14.8,58 -14.8,58" fill="#9a3412" stroke="#451a03" strokeWidth="1.2" />
          <line x1="-12" y1="39" x2="11" y2="55" stroke="#7c2d12" strokeWidth="1" opacity="0.65" />
          <line x1="-13" y1="46" x2="3" y2="57" stroke="#7c2d12" strokeWidth="1" opacity="0.65" />
          <line x1="-2" y1="37" x2="13" y2="48" stroke="#7c2d12" strokeWidth="1" opacity="0.65" />

          {/* Penyepit sokongan gaya rajah buku teks */}
          <rect x="-21.5" y="54" width="4" height="17" rx="1" fill="#e2c799" stroke="#78350f" strokeWidth="0.8" />
          <rect x="17.5" y="54" width="4" height="17" rx="1" fill="#e2c799" stroke="#78350f" strokeWidth="0.8" />

          {/* Dinding kaca tabung uji kiri */}
          <path
            d="M -20 46 Q -17 49 -17 55 L -17 172 A 17 17 0 0 0 17 172 L 17 55 Q 17 49 20 46"
            fill="none"
            stroke="#1e293b"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>

        {/* Tabung uji kanan condong (-42°, mulut terbuka menghadap puncak) */}
        <g transform="translate(214, 58) rotate(-42)">
          {/* Penyepit sokongan gaya rajah buku teks */}
          <rect x="-21.5" y="54" width="4" height="17" rx="1" fill="#e2c799" stroke="#78350f" strokeWidth="0.8" />
          <rect x="17.5" y="54" width="4" height="17" rx="1" fill="#e2c799" stroke="#78350f" strokeWidth="0.8" />

          {/* Dinding kaca tabung uji kanan */}
          <path
            d="M -20 46 Q -17 49 -17 55 L -17 172 A 17 17 0 0 0 17 172 L 17 55 Q 17 49 20 46"
            fill="none"
            stroke="#1e293b"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>

        {/* Label Rajah 6.53 */}
        <g fontSize="10" fontWeight="700" fill="#1e293b">
          <text x="214" y="28" textAnchor="middle" fill="#475569">
            Salur penghantar (Rajah 6.53)
          </text>
          <line x1="214" y1="33" x2="214" y2="54" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />

          <line x1="136" y1="62" x2="162" y2="70" stroke="#7c2d12" strokeWidth="1" />
          <text x="132" y="64" textAnchor="end" fontSize="9.5" fill="#7c2d12">
            Penyumbat getah
          </text>

          <line x1="75" y1="180" x2="104" y2="180" stroke="#475569" strokeWidth="1" />
          <text x="68" y="172" textAnchor="end" fill="#0369a1">
            {sample.isSolubleInWater ? 'Larutan' : 'Pepejal'}
          </text>
          <text x="68" y="184" textAnchor="end" fill="#0369a1">
            {sampleLabel}
          </text>
          <text x="68" y="196" textAnchor="end" fontSize="9" fill="#334155">
            + HCl cair
          </text>

          <line x1="266" y1="180" x2="316" y2="180" stroke="#475569" strokeWidth="1" />
          <text x="262" y="177" textAnchor="end" fill={result.limewaterCloudy ? '#0f172a' : '#0369a1'}>
            Air kapur
          </text>
          <text x="262" y="190" textAnchor="end" fontSize="9.5" fill={result.limewaterCloudy ? '#b91c1c' : '#0369a1'}>
            {result.limewaterCloudy ? '(menjadi keruh)' : '(kekal jernih)'}
          </text>
        </g>
      </svg>
    );
  }

  // 5. UJIAN CINCIN PERANG — TABUNG CONDONG + H2SO4 PEKAT (Rajah 6.54)
  if (result.mode === 'brown-ring') {
    return (
      <svg viewBox="0 0 380 270" className="w-full max-w-[360px] h-auto select-none">
        {isDragOver && (
          <rect x="28" y="14" width="324" height="240" rx="16" fill="#f5d0fe" fillOpacity="0.4" stroke="#c026d3" strokeWidth="2.2" strokeDasharray="6 4" />
        )}

        {/* Penitis H2SO4 pekat mengalirkan titis menyusuri dinding tabung condong (Rajah 6.54) */}
        <g>
          <path d="M 225 46 C 231 41 240 46 236 55 L 226 65 L 218 57 Z" fill="#92400e" stroke="#451a03" />
          <path d="M 218 57 L 226 65 L 200 88 L 196 85 Z" fill="#f8fafc" stroke="#334155" />
          <circle cx="192" cy="94" r="2.5" fill="#f59e0b" />
        </g>

        {/* Tabung uji dicondongkan */}
        <g transform="rotate(34 150 155)">
          {/* Lapisan bawah: H2SO4 pekat (padat & jernih) */}
          <path
            d="M 129 178 L 169 178 L 169 216 C 169 227 160 235 149 235 C 138 235 129 227 129 216 Z"
            fill="#fef3c7"
            fillOpacity="0.45"
          />
          {/* Lapisan atas: campuran akueus + FeSO4 */}
          <rect x="129" y="130" width="40" height="48" fill={result.liquidHex} fillOpacity={0.42} />

          {/* CINCIN PERANG tepat pada sempadan dua lapisan! */}
          {result.hasBrownRing && (
            <rect
              x="129"
              y="173"
              width="40"
              height="8"
              rx="2"
              fill="#78350f"
              stroke="#451a03"
              strokeWidth="0.8"
            />
          )}

          {/* Dinding kaca tabung uji */}
          <path
            d="M 124 62 Q 128 66 128 73 L 128 216 C 128 228 137 237 149 237 C 161 237 170 228 170 216 L 170 73 Q 170 66 174 62"
            fill="none"
            stroke="#1e293b"
            strokeWidth="2.3"
          />
        </g>

        {/* Label Rajah 6.54 */}
        <g fontSize="10" fontWeight="700" fill="#1e293b">
          <text x="242" y="60" fill="#92400e">Asid sulfurik,</text>
          <text x="242" y="72" fill="#92400e">H₂SO₄ pekat</text>

          <line x1="158" y1="168" x2="232" y2="168" stroke="#78350f" strokeWidth="1.2" />
          <text x="236" y="165" fill={result.hasBrownRing ? '#78350f' : '#64748b'}>
            {result.hasBrownRing ? 'Cincin perang' : 'Sempadan lapisan'}
          </text>
          <text x="236" y="177" fontSize="9.5" fill={result.hasBrownRing ? '#78350f' : '#64748b'}>
            {result.hasBrownRing ? '(FeSO₄·NO)' : '(Tiada cincin perang)'}
          </text>

          <text x="150" y="256" textAnchor="middle" fill="#475569">
            Tabung uji dicondongkan (Rajah 6.54)
          </text>
        </g>
      </svg>
    );
  }

  // 6. UJIAN TABUNG UJI MENEGAK (Ujian Cl-, SO4 2-, atau Langkah 1 Nitrat — Jadual 6.16)
  const liquidTopY = stage === 'step2' ? 124 : 152;
  return (
    <svg viewBox="0 0 380 270" className="w-full max-w-[360px] h-auto select-none">
      {isDragOver && (
        <rect x="44" y="14" width="292" height="240" rx="16" fill="#f5d0fe" fillOpacity="0.4" stroke="#c026d3" strokeWidth="2.2" strokeDasharray="6 4" />
      )}

      {/* Penitis reagen */}
      <g>
        <path d="M 152 14 C 156 8 166 12 163 20 L 154 32 L 145 25 Z" fill={activeTest.accentHex} stroke="#1e293b" />
        <path d="M 145 25 L 154 32 L 136 58 L 132 56 Z" fill="#f8fafc" stroke="#334155" />
        <path d="M 132 63 Q 135 69 132 72 Q 129 69 132 63 Z" fill={activeTest.accentHex} />
      </g>

      {/* Isi cecair */}
      <path
        d={`M 111 ${liquidTopY} L 149 ${liquidTopY} L 149 212 C 149 223 140 230 130 230 C 120 230 111 223 111 212 Z`}
        fill={result.liquidHex}
        fillOpacity={result.liquidOpacity}
        style={{ transition: 'all 320ms ease' }}
      />
      <ellipse
        cx="130"
        cy={liquidTopY}
        rx="19"
        ry="2.5"
        fill={result.liquidHex}
        fillOpacity={Math.min(0.85, result.liquidOpacity + 0.2)}
        stroke="#0284c7"
        strokeWidth="0.9"
      />

      {/* Pembuakan gas jika karbonat bertindak balas dengan asid */}
      {result.hasEffervescence && (
        <g fill="#ffffff" stroke="#0284c7" strokeWidth="0.9">
          <circle cx="122" cy="182" r="2.4" />
          <circle cx="136" cy="166" r="2.6" />
          <circle cx="128" cy="144" r="2.2" />
        </g>
      )}

      {/* Mendakan putih jika AgCl / BaSO4 terbentuk */}
      {result.hasPrecipitate && (
        <g>
          <path
            d="M 112 204 Q 122 198 130 202 Q 139 205 148 202 L 148 212 C 148 221 140 228 130 228 C 120 228 112 221 112 212 Z"
            fill={result.precipitateHex ?? '#f8fafc'}
            stroke="#64748b"
            strokeWidth="1.1"
          />
        </g>
      )}

      {/* Dinding tabung uji */}
      <path
        d="M 106 76 Q 110 79 110 85 L 110 212 C 110 224 119 232 130 232 C 141 232 150 224 150 212 L 150 85 Q 150 79 154 76"
        fill="none"
        stroke="#1e293b"
        strokeWidth="2.3"
      />

      {/* Label Jadual 6.16 */}
      <g fontSize="10" fontWeight="700" fill="#1e293b">
        <line x1="158" y1="24" x2="188" y2="24" stroke="#64748b" strokeWidth="1" />
        <text x="192" y="23" fill={activeTest.accentHex}>
          {stage === 'step2' && activeTest.step2Label
            ? activeTest.step2Label
            : activeTest.step1Label}
        </text>

        <line x1="152" y1={liquidTopY + 18} x2="188" y2={liquidTopY + 18} stroke="#64748b" strokeWidth="1" />
        <text x="192" y={liquidTopY + 17}>
          {result.hasEffervescence ? 'Pembuakan gas CO₂' : `Larutan ${sampleLabel}`}
        </text>

        {result.hasPrecipitate && result.precipitateLabel && (
          <>
            <line x1="150" y1="214" x2="188" y2="214" stroke="#7c3aed" strokeWidth="1.2" />
            <text x="192" y="212" fill="#6b21a8">
              {result.precipitateLabel}
            </text>
            <text x="192" y="224" fontSize="9.5" fill="#475569">
              Terbentuk di dasar
            </text>
          </>
        )}
      </g>
    </svg>
  );
};
