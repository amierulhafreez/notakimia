import React from 'react';
import {
  CATALYST_SET_MAP,
  CatalystSetId,
} from '../data/rateOfReactionCatalyst';

export type CatalystApparatusView = 'testtube' | 'gascollection';

interface RateCatalystApparatusSVGProps {
  activeCatalystId: CatalystSetId;
  viewMode: CatalystApparatusView;
  timeSec: number;
  currentVolume: number;
  instantRate: number;
  isRunning: boolean;
  animFrame: number;
}

const BUBBLE_X_OFFSETS = [-10, -4, 3, 9, -6, 6, 0, -8, 7];

export const RateCatalystApparatusSVG: React.FC<RateCatalystApparatusSVGProps> = ({
  activeCatalystId,
  viewMode,
  timeSec,
  currentVolume,
  instantRate,
  isRunning,
  animFrame,
}) => {
  const activeSpec = CATALYST_SET_MAP[activeCatalystId];
  const isActiveCatalyst = activeCatalystId !== 'none';
  const compareCatalystId: CatalystSetId = isActiveCatalyst ? activeCatalystId : 'mno2';
  const compareCatalyst = CATALYST_SET_MAP[compareCatalystId];

  const isReactionStarted = timeSec > 0 || isRunning;
  const activeSplinterLit = isReactionStarted && activeCatalystId === 'mno2' && timeSec >= 2;
  const activeSplinterBright = isReactionStarted && activeCatalystId === 'fe' && timeSec >= 2;
  const activeSplinterDim = isReactionStarted && (activeCatalystId === 'cuo' || activeCatalystId === 'none');

  // Bilangan gelembung O₂ dalam tabung uji aktif bergantung kepada kadar seketika
  const bubbleCount =
    isRunning && instantRate > 0.02
      ? Math.max(2, Math.min(9, Math.round(instantRate * 1.4)))
      : 0;

  if (viewMode === 'gascollection') {
    // Paparan Kelalang Kon + Tiub Penghantar + Buret/Silinder Penyukat Terbalik (Sesaran Air, Jadual 7.8)
    const gasFrac = Math.min(1, Math.max(0, currentVolume / 100));
    const waterTopY = 34 + gasFrac * 136; // 0 cm³ -> y=34 (penuh air), 100 cm³ -> y=170
    const swirlDeg = isRunning && instantRate > 0.05 ? Math.sin(animFrame * 0.45) * 1.3 : 0;

    return (
      <svg viewBox="0 0 470 232" className="w-full h-auto select-none">
        {/* Garis meja makmal */}
        <line x1="12" y1="214" x2="458" y2="214" stroke="#cbd5e1" strokeWidth="1.5" />

        {/* Kaki retort & pengapit di sebelah kanan */}
        <g>
          <rect x="386" y="208" width="54" height="6" rx="2" fill="#475569" />
          <rect x="415" y="16" width="6" height="193" rx="1.5" fill="#64748b" />
          <rect x="410" y="72" width="14" height="10" rx="2" fill="#334155" />
          <rect x="330" y="75" width="80" height="4.5" rx="1.5" fill="#475569" />
          <path d="M 304 73 L 330 73 Q 333 77 330 81 L 304 81" fill="none" stroke="#334155" strokeWidth="3" />
        </g>

        {/* Besen berisi air */}
        <g>
          <path d="M 244 176 L 251 213 L 363 213 L 370 176 Z" fill="#bae6fd" fillOpacity="0.6" />
          <line x1="244" y1="176" x2="370" y2="176" stroke="#0284c7" strokeWidth="1.4" />
          <path
            d="M 239 162 L 249 214 L 365 214 L 375 162"
            fill="none"
            stroke="#334155"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <text x="307" y="226" fontSize="7.2" fill="#334155" fontWeight="bold" textAnchor="middle">
            Besen berisi air (Sesaran air)
          </text>
        </g>

        {/* Silinder penyukat / Tiub pengumpul gas terbalik (0 -> 100 cm³) */}
        <g>
          {/* Ruang gas O₂ terkumpul */}
          <rect x="292" y="26" width="28" height={Math.max(0, waterTopY - 26)} fill="#fef9c3" fillOpacity="0.55" />
          {/* Turus air baki */}
          <rect x="292" y={waterTopY} width="28" height={Math.max(0, 190 - waterTopY)} fill="#7dd3fc" fillOpacity="0.65" />
          {/* Meniskus paras air */}
          <path d={`M 292 ${waterTopY} Q 306 ${waterTopY + 3} 320 ${waterTopY}`} fill="none" stroke="#0369a1" strokeWidth="1.5" />

          {/* Rangka tiub kaca & senggat 0..100 */}
          <path d="M 292 190 L 292 28 Q 292 22 306 22 Q 320 22 320 28 L 320 190" fill="none" stroke="#334155" strokeWidth="2.1" />
          {[0, 20, 40, 60, 80, 100].map((v) => {
            const sy = 34 + (v / 100) * 136;
            return (
              <g key={v}>
                <line x1="292" y1={sy} x2="298" y2={sy} stroke="#334155" strokeWidth="1" />
                <text x="288" y={sy + 2.5} fontSize="6.4" fill="#475569" textAnchor="end" fontFamily="monospace">
                  {v}
                </text>
              </g>
            );
          })}
          <text x="276" y="18" fontSize="7" fill="#1e293b" fontWeight="bold" textAnchor="middle">
            Gas O₂ ({currentVolume.toFixed(1)} cm³)
          </text>
        </g>

        {/* Kelalang kon 150 cm³ (50 cm³ H₂O₂ + Mangkin) */}
        <g transform={`rotate(${swirlDeg} 102 185)`}>
          {/* Larutan H₂O₂ 10-isipadu */}
          <path
            d="M 70 156 Q 102 160 134 156 L 148 197 Q 150 208 139 208 L 65 208 Q 54 208 56 197 Z"
            fill="#e0f2fe"
            fillOpacity="0.7"
          />
          <path d="M 70 156 Q 102 160 134 156" fill="none" stroke="#0284c7" strokeWidth="1.2" />

          {/* Serbuk mangkin di dasar kelalang (jika bukan tanpa mangkin) */}
          {isActiveCatalyst && (
            <ellipse cx="102" cy="204" rx="26" ry="3.2" fill={activeSpec.powderColorHex} fillOpacity="0.88" />
          )}

          {/* Gelembung O₂ dalam kelalang */}
          {isRunning &&
            Array.from({ length: bubbleCount }).map((_, idx) => {
              const bx = 102 + BUBBLE_X_OFFSETS[idx % BUBBLE_X_OFFSETS.length] * 2;
              const phaseShift = ((animFrame * 6 + idx * 9) % 36);
              const by = 198 - phaseShift;
              return (
                <circle
                  key={`gc-b-${idx}`}
                  cx={bx}
                  cy={by}
                  r="1.9"
                  fill="#ffffff"
                  stroke="#0284c7"
                  strokeWidth="0.9"
                />
              );
            })}

          {/* Kaca kelalang kon */}
          <path
            d="M 88 86 L 88 112 L 54 197 Q 51 208 64 208 L 140 208 Q 153 208 150 197 L 116 112 L 116 86"
            fill="none"
            stroke="#334155"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Penyumbat getah */}
          <polygon points="86,80 118,80 115,93 89,93" fill="#9a3412" stroke="#431407" strokeWidth="1.2" />
        </g>

        {/* Salur penghantar dari kelalang ke bawah tiub pengumpul gas */}
        <path
          d="M 102 82 L 102 52 Q 102 42 114 42 L 222 42 Q 234 42 234 54 L 234 196 Q 234 203 244 203 L 299 203 Q 306 203 306 194 L 306 184"
          fill="none"
          stroke="#475569"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M 102 82 L 102 52 Q 102 42 114 42 L 222 42 Q 234 42 234 54 L 234 196 Q 234 203 244 203 L 299 203 Q 306 203 306 194 L 306 184"
          fill="none"
          stroke="#f8fafc"
          strokeWidth="1.3"
          strokeLinecap="round"
        />

        {/* Label radas */}
        <text x="102" y="226" fontSize="7.2" fill="#334155" fontWeight="bold" textAnchor="middle">
          H₂O₂ + {isActiveCatalyst ? activeSpec.formula : 'Tanpa Mangkin'}
        </text>
        <text x="168" y="34" fontSize="6.9" fill="#475569" fontWeight="bold" textAnchor="middle">
          Salur penghantar gas O₂
        </text>
        <text x="418" y="226" fontSize="7" fill="#334155" fontWeight="bold" textAnchor="middle">
          Kaki retort
        </text>
      </svg>
    );
  }

  // ================= MOD DEFAULT: EKSPERIMEN 7.4 (RAK TABUNG UJI + KAYU UJI BERBARA + PENIMBANG) =================
  const targetTestTubeX = isActiveCatalyst ? 206 : 76;

  return (
    <svg viewBox="0 0 470 232" className="w-full h-auto select-none">
      {/* Garis meja makmal */}
      <line x1="10" y1="212" x2="306" y2="212" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* ================= RAK TABUNG UJI (TABUNG UJI I & II) ================= */}
      <g>
        {/* Tiang tepi rak tabung uji */}
        <rect x="26" y="96" width="7" height="116" rx="2" fill="#b45309" fillOpacity="0.75" stroke="#78350f" strokeWidth="1" />
        <rect x="250" y="96" width="7" height="116" rx="2" fill="#b45309" fillOpacity="0.75" stroke="#78350f" strokeWidth="1" />
        {/* Palang atas dan tapak rak */}
        <rect x="24" y="96" width="235" height="7" rx="2" fill="#d97706" fillOpacity="0.65" stroke="#78350f" strokeWidth="1" />
        <rect x="22" y="205" width="239" height="7" rx="2" fill="#d97706" fillOpacity="0.75" stroke="#78350f" strokeWidth="1" />

        {/* ----- TABUNG UJI I (TANPA MANGKIN) ----- */}
        <g>
          {/* Cecair 5.0 cm³ H₂O₂ tanpa mangkin */}
          <path d="M 60 132 L 92 132 L 92 184 A 16 16 0 0 1 60 184 Z" fill="#e0f2fe" fillOpacity="0.68" />
          <line x1="60" y1="132" x2="92" y2="132" stroke="#0284c7" strokeWidth="1.1" />

          {/* Gelembung sangat jarang jika Tabung Uji I aktif */}
          {isRunning && activeCatalystId === 'none' && (
            <circle cx="76" cy={180 - ((animFrame * 2) % 40)} r="1.4" fill="#ffffff" stroke="#0284c7" strokeWidth="0.8" />
          )}

          {/* Dinding kaca Tabung Uji I */}
          <path
            d="M 60 72 L 60 184 A 16 16 0 0 0 92 184 L 92 72"
            fill="none"
            stroke={!isActiveCatalyst ? '#2563eb' : '#334155'}
            strokeWidth={!isActiveCatalyst ? '2.5' : '2'}
          />
          <ellipse cx="76" cy="72" rx="17" ry="3.2" fill="#f8fafc" stroke={!isActiveCatalyst ? '#2563eb' : '#334155'} strokeWidth="1.6" />

          <text x="76" y="224" fontSize="6.9" fill={!isActiveCatalyst ? '#1d4ed8' : '#334155'} fontWeight="bold" textAnchor="middle">
            Tabung Uji I (Tanpa mangkin)
          </text>
          <text x="76" y="156" fontSize="6" fill="#0369a1" fontWeight="600" textAnchor="middle">
            H₂O₂
          </text>
        </g>

        {/* ----- TABUNG UJI II (DENGAN MANGKIN: MnO₂ / Fe / CuO) ----- */}
        <g>
          {/* Cecair 5.0 cm³ H₂O₂ */}
          <path d="M 190 132 L 222 132 L 222 184 A 16 16 0 0 1 190 184 Z" fill="#e0f2fe" fillOpacity="0.68" />
          <line x1="190" y1="132" x2="222" y2="132" stroke="#0284c7" strokeWidth="1.1" />

          {/* Serbuk mangkin 0.5 g di dasar Tabung Uji II */}
          <path d="M 192 188 Q 206 198 220 188 L 220 192 A 16 16 0 0 1 192 192 Z" fill={compareCatalyst.powderColorHex} fillOpacity="0.92" />

          {/* Gelembung gas O₂ aktif bergantung kadar tindak balas */}
          {isRunning && isActiveCatalyst &&
            Array.from({ length: bubbleCount }).map((_, idx) => {
              const bx = 206 + BUBBLE_X_OFFSETS[idx % BUBBLE_X_OFFSETS.length];
              const phaseShift = ((animFrame * 7 + idx * 8) % 52);
              const by = 186 - phaseShift;
              return (
                <circle
                  key={`tt-b-${idx}`}
                  cx={bx}
                  cy={by}
                  r="1.8"
                  fill="#ffffff"
                  stroke={compareCatalyst.strokeHex}
                  strokeWidth="0.9"
                />
              );
            })}

          {/* Dinding kaca Tabung Uji II */}
          <path
            d="M 190 72 L 190 184 A 16 16 0 0 0 222 184 L 222 72"
            fill="none"
            stroke={isActiveCatalyst ? compareCatalyst.strokeHex : '#334155'}
            strokeWidth={isActiveCatalyst ? '2.5' : '2'}
          />
          <ellipse
            cx="206"
            cy="72"
            rx="17"
            ry="3.2"
            fill="#f8fafc"
            stroke={isActiveCatalyst ? compareCatalyst.strokeHex : '#334155'}
            strokeWidth="1.6"
          />

          <text x="206" y="224" fontSize="6.9" fill={isActiveCatalyst ? compareCatalyst.strokeHex : '#334155'} fontWeight="bold" textAnchor="middle">
            Tabung Uji II (+ 0.5 g {compareCatalyst.formula})
          </text>
          <text x="206" y="152" fontSize="6" fill="#0369a1" fontWeight="600" textAnchor="middle">
            H₂O₂
          </text>
          <text x="206" y="182" fontSize="6.4" fill="#1e293b" fontWeight="bold" textAnchor="middle">
            {compareCatalyst.formula}
          </text>
        </g>

        {/* ================= KAYU UJI BERBARA DI ATAS MULUT TABUNG UJI AKTIF ================= */}
        <g transform={`translate(${targetTestTubeX}, 64)`}>
          {/* Batang kayu uji dicondongkan ke mulut tabung uji */}
          <line x1="26" y1="-44" x2="2" y2="6" stroke="#b45309" strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="2" cy="6" r="2.6" fill="#dc2626" />

          {/* Nyalaan api menyala semula dengan terang bagi MnO₂ */}
          {activeSplinterLit && (
            <g>
              <path d="M -5 6 Q -7 -7 2 -16 Q 11 -7 8 6 Z" fill="#f97316" fillOpacity="0.9" />
              <path d="M -2 6 Q -3 -2 2 -9 Q 7 -2 5 6 Z" fill="#fef08a" />
            </g>
          )}
          {/* Bara lebih terang bagi Fe */}
          {activeSplinterBright && <circle cx="2" cy="6" r="5" fill="#fb923c" fillOpacity="0.7" />}
          {/* Bara malap bagi Tanpa mangkin / CuO */}
          {activeSplinterDim && <circle cx="2" cy="6" r="3" fill="#ef4444" fillOpacity="0.45" />}

          {/* Label kayu uji berbara */}
          <text
            x={isActiveCatalyst ? -10 : 30}
            y="-28"
            fontSize="7"
            fill="#9a3412"
            fontWeight="bold"
            textAnchor={isActiveCatalyst ? 'end' : 'start'}
          >
            Kayu uji berbara
          </text>
          <text
            x={isActiveCatalyst ? -10 : 30}
            y="-18"
            fontSize="6.6"
            fill={activeSplinterLit ? '#15803d' : '#64748b'}
            fontWeight="bold"
            textAnchor={isActiveCatalyst ? 'end' : 'start'}
          >
            ({isReactionStarted ? activeSpec.splinterResult : 'Sedia diuji'})
          </text>
        </g>
      </g>

      {/* ================= PANEL KANAN: LENSA KIMIA — JISIM MANGKIN & STATUS GAS O₂ ================= */}
      <g>
        <rect x="314" y="8" width="148" height="214" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.4" />
        <text x="388" y="25" fontSize="7.8" fill="#1e293b" fontWeight="800" textAnchor="middle">
          Semakan Jisim Mangkin
        </text>
        <text x="388" y="35" fontSize="6.5" fill="#64748b" textAnchor="middle">
          (Lensa Kimia • Eksperimen 7.4 m.s. 235)
        </text>

        {/* Corong turas & kertas turas ringkas (selepas tindak balas) */}
        <g transform="translate(388, 62)">
          <polygon points="-18,-10 18,-10 4,14 -4,14" fill="#ffffff" stroke="#475569" strokeWidth="1.5" />
          <line x1="0" y1="14" x2="0" y2="26" stroke="#475569" strokeWidth="2.4" />
          {/* Serbuk hitam terperangkap atas kertas turas jika bermangkin */}
          {isActiveCatalyst && (
            <path d="M -8 -2 Q 0 5 8 -2 Z" fill={activeSpec.powderColorHex} fillOpacity="0.9" />
          )}
          <text x="0" y="-15" fontSize="6.3" fill="#475569" fontWeight="600" textAnchor="middle">
            Corong &amp; kertas turas
          </text>
        </g>

        {/* Penimbang elektronik mini: Jisim sebelum = selepas */}
        <g transform="translate(328, 96)">
          <rect x="0" y="14" width="120" height="34" rx="6" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.2" />
          <rect x="18" y="10" width="84" height="4" rx="2" fill="#94a3b8" />
          <rect x="14" y="21" width="92" height="19" rx="3" fill="#0f172a" />
          <text x="60" y="34" fontSize="9" fill="#4ade80" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            {isActiveCatalyst ? '0.50 g  →  0.50 g' : '0.00 g (Tiada)'}
          </text>
        </g>

        <text x="388" y="158" fontSize="6.6" fill="#334155" fontWeight="bold" textAnchor="middle">
          {isActiveCatalyst
            ? 'Jisim & sifat kimia mangkin KEKAL sama'
            : 'Tanpa mangkin: penguraian amat perlahan'}
        </text>

        {/* Kotak Status Pengumpulan Gas O₂ Semasa */}
        <rect
          x="324"
          y="168"
          width="128"
          height="42"
          rx="8"
          fill="#ffffff"
          stroke={activeSpec.strokeHex}
          strokeWidth="1.3"
        />
        <text x="388" y="182" fontSize="6.7" fill="#64748b" fontWeight="bold" textAnchor="middle">
          HASIL GAS OKSIGEN (JADUAL 7.8)
        </text>
        <text x="388" y="196" fontSize="9.8" fill={activeSpec.strokeHex} fontFamily="monospace" fontWeight="bold" textAnchor="middle">
          {currentVolume.toFixed(1)} cm³{' '}
          <tspan fontSize="7" fill="#475569" fontWeight="600">
            ({instantRate.toFixed(2)} cm³/s)
          </tspan>
        </text>
        <text x="388" y="206" fontSize="6.2" fill="#64748b" textAnchor="middle">
          Kayu uji: {isReactionStarted ? activeSpec.splinterResult : 'Klik Mula untuk uji'}
        </text>
      </g>
    </svg>
  );
};
