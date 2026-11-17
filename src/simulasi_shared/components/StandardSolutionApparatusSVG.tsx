import React from 'react';
import {
  StandardPhaseMode,
  StandardSaltSpec,
} from '../data/standardSolutions';

interface StandardSolutionApparatusSVGProps {
  salt: StandardSaltSpec;
  mode: StandardPhaseMode;
  completedStep: number; // 0 = belum mula, 1..6 = langkah (a)..(f) selesai
  mass2dp: number;
  volumeCm3: number;
  v1StockCm3: number;
  vWaterNeededCm3: number;
  m2TargetM: number;
  v2FinalCm3: number;
  isDragOver: boolean;
}

/**
 * Botol pencuci dengan hujung muncung tepat pada (targetX, targetY)
 * supaya pancutan / titisan air suling jatuh tepat ke dalam bikar, corong turas, atau kelalang volumetrik.
 */
const WashBottlePour: React.FC<{
  targetX: number;
  targetY: number;
  dropYs?: number[];
  tiltDeg?: number;
}> = ({ targetX, targetY, dropYs = [8, 22], tiltDeg = 18 }) => (
  <g transform={`translate(${targetX}, ${targetY})`}>
    <g transform={`rotate(${tiltDeg})`}>
      <rect x="-78" y="-17" width="44" height="28" rx="5" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.8" />
      <rect x="-76" y="-4" width="40" height="13" rx="3" fill="#7dd3fc" fillOpacity="0.55" />
      <rect x="-34" y="-10" width="8" height="14" rx="2" fill="#0369a1" />
      <path
        d="M -26 -5 L -11 -5 Q -4 -5 0 0"
        fill="none"
        stroke="#0284c7"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <text x="-56" y="-6" fontSize="7" fill="#0369a1" fontWeight="bold" textAnchor="middle">
        Air suling
      </text>
    </g>
    {dropYs.map((dy) => (
      <path
        key={dy}
        d={`M 0 ${dy - 4} C 2.5 ${dy} 2.5 ${dy + 3.5} 0 ${dy + 3.5} C -2.5 ${dy + 3.5} -2.5 ${dy} 0 ${dy - 4} Z`}
        fill="#0ea5e9"
      />
    ))}
  </g>
);

export const StandardSolutionApparatusSVG: React.FC<StandardSolutionApparatusSVGProps> = ({
  salt,
  mode,
  completedStep,
  mass2dp,
  volumeCm3,
  v1StockCm3,
  vWaterNeededCm3,
  m2TargetM,
  v2FinalCm3,
  isDragOver,
}) => {
  const showEyeZoom = completedStep === 5;
  const activeLiquidHex = mode === 'solid' ? salt.stockHex : salt.dilutedHex;
  const activeLiquidOpacity = mode === 'solid' ? salt.stockOpacity : salt.dilutedOpacity;

  return (
    <div className="relative w-full">
      {/* Kanta Paras Mata (Ralat Paralaks) untuk Langkah (e) */}
      {showEyeZoom && (
        <div className="absolute top-2 right-2 bg-white/95 border-2 border-teal-500 rounded-2xl p-2 shadow-lg w-40 z-20 animate-in fade-in duration-200">
          <div className="text-[10px] font-extrabold text-teal-800 mb-1 text-center">
            Paras Mata (Elak Paralaks)
          </div>
          <svg viewBox="0 0 120 64" className="w-full h-14 bg-slate-50 rounded-lg border border-slate-200">
            <line x1="42" y1="4" x2="42" y2="60" stroke="#334155" strokeWidth="2.4" />
            <line x1="78" y1="4" x2="78" y2="60" stroke="#334155" strokeWidth="2.4" />
            <line x1="34" y1="36" x2="86" y2="36" stroke="#dc2626" strokeWidth="1.6" strokeDasharray="3 2" />
            <text x="88" y="38" fontSize="7" fill="#dc2626" fontWeight="bold">Senggatan</text>
            <path
              d="M 43 30 Q 60 41 77 30 L 77 60 L 43 60 Z"
              fill={activeLiquidHex}
              fillOpacity={Math.min(0.8, activeLiquidOpacity + 0.15)}
            />
            <path d="M 43 30 Q 60 41 77 30" fill="none" stroke="#0369a1" strokeWidth="2" />
            <line x1="8" y1="36" x2="42" y2="36" stroke="#0f766e" strokeWidth="1.2" strokeDasharray="2 2" />
            <circle cx="10" cy="36" r="3" fill="#0f766e" />
          </svg>
          <p className="text-[8.5px] text-slate-600 mt-1 text-center leading-tight font-semibold">
            Bawah meniskus tepat pada tanda senggatan.
          </p>
        </div>
      )}

      <svg viewBox="0 0 420 240" className="w-full h-auto select-none">
        {isDragOver && (
          <rect
            x="10"
            y="8"
            width="400"
            height="224"
            rx="16"
            fill="#ccfbf1"
            fillOpacity="0.45"
            stroke="#0d9488"
            strokeWidth="2.4"
            strokeDasharray="6 4"
          />
        )}

        {/* ================= FASA 1: PENYEDIAAN DARIPADA PEPEJAL (RAJAH 6.27) ================= */}
        {mode === 'solid' && completedStep === 0 && (
          <g>
            {/* Penimbang Elektronik Sedia (0.00 g) */}
            <rect x="44" y="168" width="122" height="36" rx="6" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
            <rect x="64" y="177" width="82" height="18" rx="3" fill="#0f172a" />
            <text x="105" y="190" fontSize="11" fill="#34d399" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              0.00 g
            </text>
            <rect x="75" y="159" width="60" height="9" rx="2" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
            <path d="M 75 159 L 135 159 L 128 149 L 82 149 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.4" />
            <text x="105" y="220" fontSize="9.5" fill="#334155" fontWeight="bold" textAnchor="middle">
              Penimbang Elektronik
            </text>

            {/* Bikar Kosong 250 cm3 + Kelalang Volumetrik Menunggu */}
            <path
              d="M 218 118 L 218 198 Q 218 205 226 205 L 284 205 Q 292 205 292 198 L 292 118"
              fill="#f8fafc"
              stroke="#475569"
              strokeWidth="2.2"
            />
            <text x="255" y="164" fontSize="9" fill="#64748b" fontWeight="bold" textAnchor="middle">
              Bikar 250 cm³
            </text>
            <text x="255" y="220" fontSize="9.5" fill="#0f766e" fontWeight="bold" textAnchor="middle">
              Seret Langkah (a) ke sini!
            </text>

            {/* Siluet Kelalang Volumetrik */}
            <path
              d="M 342 84 L 342 135 C 314 149 310 205 332 205 L 368 205 C 390 205 386 149 358 135 L 358 84"
              fill="#f8fafc"
              stroke="#94a3b8"
              strokeWidth="1.8"
              strokeDasharray="4 3"
            />
            <text x="350" y="220" fontSize="9" fill="#64748b" fontWeight="bold" textAnchor="middle">
              Kelalang {volumeCm3} cm³
            </text>
          </g>
        )}

        {mode === 'solid' && completedStep === 1 && (
          <g>
            {/* Penimbang Elektronik memaparkan jisim tepat */}
            <rect x="42" y="168" width="126" height="36" rx="6" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
            <rect x="62" y="177" width="86" height="18" rx="3" fill="#0f172a" />
            <text x="105" y="190" fontSize="11" fill="#34d399" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              {mass2dp.toFixed(2)} g
            </text>
            <rect x="75" y="159" width="60" height="9" rx="2" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
            <path d="M 75 159 L 135 159 L 128 149 L 82 149 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.4" />
            <path d="M 88 154 Q 105 138 122 154 Z" fill={salt.solidHex} stroke={salt.solidStrokeHex} strokeWidth="1.1" />
            <text x="105" y="220" fontSize="9.5" fill="#334155" fontWeight="bold" textAnchor="middle">
              Pepejal {salt.formula} ({mass2dp.toFixed(2)} g)
            </text>

            {/* Bikar + 100 cm3 Air suling + butiran pepejal di dasar */}
            <path
              d="M 244 108 L 244 198 Q 244 205 252 205 L 328 205 Q 336 205 336 198 L 336 108"
              fill="#f0f9ff"
              fillOpacity="0.4"
              stroke="#0284c7"
              strokeWidth="2.3"
            />
            <rect x="246" y="152" width="88" height="51" rx="2" fill="#bae6fd" fillOpacity="0.45" />
            <circle cx="268" cy="197" r="3.2" fill={salt.solidHex} stroke={salt.solidStrokeHex} strokeWidth="0.9" />
            <circle cx="281" cy="199" r="3.6" fill={salt.solidHex} stroke={salt.solidStrokeHex} strokeWidth="0.9" />
            <circle cx="294" cy="196" r="3.2" fill={salt.solidHex} stroke={salt.solidStrokeHex} strokeWidth="0.9" />
            <circle cx="308" cy="198" r="3.4" fill={salt.solidHex} stroke={salt.solidStrokeHex} strokeWidth="0.9" />

            {/* Botol pencuci menuang air suling tepat ke dalam bikar */}
            <WashBottlePour targetX={282} targetY={92} dropYs={[10, 26, 42]} tiltDeg={18} />
            <text x="290" y="220" fontSize="9.5" fill="#334155" fontWeight="bold" textAnchor="middle">
              Bikar 250 cm³ + 100 cm³ Air Suling
            </text>
          </g>
        )}

        {mode === 'solid' && completedStep === 2 && (
          <g>
            {/* Bikar dengan Rod Kaca kacau pepejal larut sepenuhnya */}
            <path
              d="M 155 104 L 155 198 Q 155 205 163 205 L 257 205 Q 265 205 265 198 L 265 104"
              fill="#f8fafc"
              stroke="#0284c7"
              strokeWidth="2.3"
            />
            <rect
              x="157"
              y="148"
              width="106"
              height="55"
              rx="2"
              fill={salt.stockHex}
              fillOpacity={salt.stockOpacity}
            />
            <line x1="230" y1="48" x2="195" y2="196" stroke="#475569" strokeWidth="4.2" strokeLinecap="round" />
            <path d="M 188 76 A 24 8 0 1 1 232 76" fill="none" stroke="#dc2626" strokeWidth="1.8" />
            <polygon points="188,76 194,72 194,80" fill="#dc2626" />
            <text x="174" y="66" fontSize="9.5" fill="#dc2626" fontWeight="bold">Kacau</text>
            <text x="242" y="56" fontSize="9.5" fill="#334155" fontWeight="bold">Rod kaca</text>
            <text x="210" y="224" fontSize="10" fill="#0f172a" fontWeight="bold" textAnchor="middle">
              Semua {salt.formula} terlarut ({salt.solutionColorLabel})
            </text>
          </g>
        )}

        {mode === 'solid' && (completedStep === 3 || completedStep === 4) && (
          <g>
            {/* Kelalang Volumetrik */}
            <path
              d="M 196 84 L 196 138 C 156 154 150 210 182 210 L 238 210 C 270 210 264 154 224 138 L 224 84"
              fill="#f8fafc"
              stroke="#1e293b"
              strokeWidth="2.3"
            />
            <path
              d={
                completedStep === 3
                  ? 'M 164 176 Q 210 181 256 176 C 260 206 243 208 238 208 L 182 208 C 177 208 160 206 164 176 Z'
                  : 'M 197 125 Q 210 132 223 125 L 223 138 C 262 154 268 208 238 208 L 182 208 C 152 208 158 154 197 138 Z'
              }
              fill={salt.stockHex}
              fillOpacity={salt.stockOpacity}
            />
            {completedStep === 4 && (
              <path d="M 197 125 Q 210 132 223 125" fill="none" stroke="#0369a1" strokeWidth="1.4" />
            )}
            <line x1="191" y1="112" x2="229" y2="112" stroke="#dc2626" strokeWidth="1.8" />
            <text x="234" y="114" fontSize="8.5" fill="#dc2626" fontWeight="bold">
              Tanda senggatan ({volumeCm3} cm³)
            </text>

            {completedStep === 4 && (
              <g>
                <line x1="223" y1="129" x2="233" y2="134" stroke="#475569" strokeWidth="1" />
                <text x="236" y="137" fontSize="8" fill="#334155" fontWeight="bold">
                  Aras meniskus larutan
                </text>
              </g>
            )}

            {/* Label Kelalang Volumetrik seperti Rajah 6.27 (c) */}
            <line x1="138" y1="180" x2="162" y2="180" stroke="#475569" strokeWidth="1.1" />
            <text x="134" y="177" fontSize="8.5" fill="#334155" fontWeight="bold" textAnchor="end">
              Kelalang
            </text>
            <text x="134" y="188" fontSize="8.5" fill="#334155" fontWeight="bold" textAnchor="end">
              volumetrik
            </text>

            {/* Corong Turas (bahagian atas y=54, x=183..237) */}
            <path
              d="M 183 54 L 237 54 L 216 80 L 216 102 L 204 102 L 204 80 Z"
              fill="#e0f2fe"
              fillOpacity="0.65"
              stroke="#475569"
              strokeWidth="2"
            />
            <line x1="227" y1="64" x2="243" y2="60" stroke="#475569" strokeWidth="1.1" />
            <text x="246" y="62" fontSize="9" fill="#334155" fontWeight="bold">
              Corong turas
            </text>

            {completedStep === 3 ? (
              <g>
                {/* Bikar dicondongkan dengan muncung tepat di atas mulut corong turas (198, 44) */}
                <g transform="translate(198, 44) rotate(48)">
                  <path
                    d="M -34 0 L -34 44 Q -34 48 -28 48 L -6 48 Q 0 48 0 44 L 0 0"
                    fill="#f8fafc"
                    stroke="#0284c7"
                    strokeWidth="2"
                  />
                  <path
                    d="M -32 14 L -32 43 Q -32 46 -28 46 L -6 46 Q -2 46 -2 43 L -2 2 Z"
                    fill={salt.stockHex}
                    fillOpacity={salt.stockOpacity}
                  />
                </g>
                {/* Aliran larutan terus masuk ke dalam corong turas */}
                <path
                  d="M 198 44 Q 204 56 208 78"
                  fill="none"
                  stroke={salt.stockHex}
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeOpacity={Math.min(0.95, salt.stockOpacity + 0.2)}
                />
                <circle cx="210" cy="89" r="2.5" fill={salt.stockHex} />
                <circle cx="210" cy="107" r="2.5" fill={salt.stockHex} />
              </g>
            ) : (
              <g>
                {/* Botol pencuci: muncung tepat di atas mulut dalam corong turas (204, 46) */}
                <WashBottlePour targetX={204} targetY={46} dropYs={[8, 20]} tiltDeg={18} />
                {/* Air bilasan menuruni dinding & batang corong turas ke dalam kelalang */}
                <circle cx="210" cy="86" r="2.4" fill="#0ea5e9" />
                <circle cx="210" cy="104" r="2.4" fill="#0ea5e9" />
              </g>
            )}

            <text x="210" y="228" fontSize="9.5" fill="#334155" fontWeight="bold" textAnchor="middle">
              {completedStep === 3
                ? `Pindah Larutan ${salt.formula} Melalui Corong Turas`
                : 'Bilas Bikar & Corong Turas — Semua Air Bilasan Dipindahkan'}
            </text>
          </g>
        )}

        {mode === 'solid' && completedStep === 5 && (
          <g>
            <path
              d="M 196 84 L 196 138 C 156 154 150 210 182 210 L 238 210 C 270 210 264 154 224 138 L 224 84"
              fill="#f8fafc"
              stroke="#1e293b"
              strokeWidth="2.3"
            />
            <path
              d="M 197 109 Q 210 115 223 109 L 223 138 C 262 154 268 208 238 208 L 182 208 C 152 208 158 154 197 138 Z"
              fill={salt.stockHex}
              fillOpacity={salt.stockOpacity}
            />
            <path d="M 197 109 Q 210 115 223 109" fill="none" stroke="#0369a1" strokeWidth="1.5" />
            <line x1="189" y1="112" x2="231" y2="112" stroke="#dc2626" strokeWidth="2" />
            <text x="184" y="115" fontSize="8.5" fill="#dc2626" fontWeight="bold" textAnchor="end">
              Senggatan ({volumeCm3} cm³)
            </text>
            {/* Penitis tepat di atas leher kelalang */}
            <rect x="206" y="24" width="8" height="24" rx="3" fill="#334155" />
            <path d="M 206 48 L 214 48 L 211 68 L 209 68 Z" fill="#e0f2fe" stroke="#475569" strokeWidth="1.5" />
            <path d="M 210 73 C 212.5 77 212.5 80.5 210 80.5 C 207.5 80.5 207.5 77 210 73 Z" fill="#0ea5e9" />
            <text x="196" y="42" fontSize="9.5" fill="#334155" fontWeight="bold" textAnchor="end">
              Penitis
            </text>
            <text x="210" y="228" fontSize="9.5" fill="#334155" fontWeight="bold" textAnchor="middle">
              Laraskan Meniskus Tepat Segaris Tanda Senggatan
            </text>
          </g>
        )}

        {mode === 'solid' && completedStep === 6 && (
          <g>
            <path
              d="M 196 84 L 196 138 C 156 154 150 210 182 210 L 238 210 C 270 210 264 154 224 138 L 224 84"
              fill="#f8fafc"
              stroke="#1e293b"
              strokeWidth="2.3"
            />
            <path
              d="M 197 112 L 223 112 L 223 138 C 262 154 268 208 238 208 L 182 208 C 152 208 158 154 197 138 Z"
              fill={salt.stockHex}
              fillOpacity={salt.stockOpacity}
            />
            <line x1="189" y1="112" x2="231" y2="112" stroke="#dc2626" strokeWidth="1.8" />
            <path d="M 200 66 L 220 66 L 218 84 L 202 84 Z" fill="#0f766e" />
            <circle cx="210" cy="61" r="6" fill="#0f766e" />
            <text x="188" y="68" fontSize="9.5" fill="#334155" fontWeight="bold" textAnchor="end">
              Penutup
            </text>
            <path d="M 142 146 A 32 32 0 0 1 154 104" fill="none" stroke="#7c3aed" strokeWidth="2.2" />
            <path d="M 278 104 A 32 32 0 0 1 266 146" fill="none" stroke="#7c3aed" strokeWidth="2.2" />
            <text x="210" y="228" fontSize="10" fill="#0f766e" fontWeight="bold" textAnchor="middle">
              ✓ Larutan Piawai {salt.formula} 1.0 mol dm⁻³ ({volumeCm3} cm³) Sedia!
            </text>
          </g>
        )}

        {/* ================= FASA 2: PENCAIRAN (1.0 M -> 0.5 M — RAJAH 6.29) ================= */}
        {mode === 'dilution' && completedStep === 0 && (
          <g>
            {/* Kelalang stok 1.0 M + bikar & kelalang volumetrik 100 cm3 */}
            <path
              d="M 110 100 L 110 142 C 78 155 74 205 100 205 L 140 205 C 166 205 162 155 130 142 L 130 100"
              fill="#f8fafc"
              stroke="#1e293b"
              strokeWidth="2"
            />
            <path
              d="M 111 120 L 129 120 L 129 142 C 160 155 164 203 140 203 L 100 203 C 76 203 80 155 111 142 Z"
              fill={salt.stockHex}
              fillOpacity={salt.stockOpacity}
            />
            <text x="120" y="220" fontSize="9.5" fill="#334155" fontWeight="bold" textAnchor="middle">
              Larutan Stok {salt.formula} 1.0 M
            </text>

            <path
              d="M 244 128 L 244 198 Q 244 205 252 205 L 318 205 Q 326 205 326 198 L 326 128"
              fill="#f8fafc"
              stroke="#475569"
              strokeWidth="2.2"
            />
            <text x="285" y="168" fontSize="9" fill="#64748b" fontWeight="bold" textAnchor="middle">
              Bikar 100 cm³
            </text>
            <text x="285" y="220" fontSize="9.5" fill="#4f46e5" fontWeight="bold" textAnchor="middle">
              Seret Langkah (a) ke sini!
            </text>
          </g>
        )}

        {mode === 'dilution' && completedStep === 1 && (
          <g>
            <path
              d="M 155 118 L 155 198 Q 155 205 163 205 L 257 205 Q 265 205 265 198 L 265 118"
              fill="#f8fafc"
              stroke="#0284c7"
              strokeWidth="2.3"
            />
            <rect
              x="157"
              y="152"
              width="106"
              height="51"
              rx="2"
              fill={salt.stockHex}
              fillOpacity={salt.stockOpacity}
            />
            <text x="210" y="182" fontSize="9.5" fill="#0f172a" fontWeight="bold" textAnchor="middle">
              Stok {salt.formula} 1.0 M
            </text>
            <text x="210" y="224" fontSize="9.5" fill="#334155" fontWeight="bold" textAnchor="middle">
              Larutan stok dituang ke dalam bikar 100 cm³
            </text>
          </g>
        )}

        {mode === 'dilution' && completedStep === 2 && (
          <g>
            <path
              d="M 155 136 L 155 198 Q 155 205 163 205 L 257 205 Q 265 205 265 198 L 265 136"
              fill="#f8fafc"
              stroke="#0284c7"
              strokeWidth="2.3"
            />
            <rect
              x="157"
              y="164"
              width="106"
              height="39"
              rx="2"
              fill={salt.stockHex}
              fillOpacity={salt.stockOpacity}
            />
            {/* Pipet Bebuli */}
            <path
              d="M 207 28 L 207 70 C 197 80 197 108 207 118 L 207 190 L 213 190 L 213 118 C 223 108 223 80 213 70 L 213 28 Z"
              fill="#e0e7ff"
              stroke="#4f46e5"
              strokeWidth="2"
            />
            <path
              d="M 208 60 L 208 70 C 198 80 198 108 208 118 L 208 188 L 212 188 L 212 118 C 222 108 222 80 212 70 L 212 60 Z"
              fill={salt.stockHex}
              fillOpacity={Math.min(0.85, salt.stockOpacity + 0.15)}
            />
            <line x1="201" y1="60" x2="219" y2="60" stroke="#dc2626" strokeWidth="1.6" />
            <text x="228" y="64" fontSize="9" fill="#4f46e5" fontWeight="bold">
              Pipet (V₁ = {v1StockCm3.toFixed(1)} cm³)
            </text>
            <text x="210" y="224" fontSize="9.5" fill="#334155" fontWeight="bold" textAnchor="middle">
              Sukat Tepat V₁ = {v1StockCm3.toFixed(1)} cm³ Larutan Stok 1.0 M
            </text>
          </g>
        )}

        {mode === 'dilution' && completedStep === 3 && (
          <g>
            <path
              d="M 196 102 L 196 148 C 160 162 154 210 184 210 L 236 210 C 266 210 260 162 224 148 L 224 102"
              fill="#f8fafc"
              stroke="#1e293b"
              strokeWidth="2.3"
            />
            <path
              d="M 164 182 C 160 206 178 208 184 208 L 236 208 C 242 208 260 206 256 182 Z"
              fill={salt.stockHex}
              fillOpacity={salt.stockOpacity}
            />
            <line x1="191" y1="126" x2="229" y2="126" stroke="#dc2626" strokeWidth="1.6" />
            <path
              d="M 207 12 L 207 46 C 199 54 199 72 207 80 L 207 114 L 213 114 L 213 80 C 221 72 221 54 213 46 L 213 12 Z"
              fill="#e0e7ff"
              stroke="#4f46e5"
              strokeWidth="1.8"
            />
            <circle cx="210" cy="122" r="2.6" fill={salt.stockHex} />
            <text x="210" y="228" fontSize="9.5" fill="#334155" fontWeight="bold" textAnchor="middle">
              Pindah {v1StockCm3.toFixed(1)} cm³ Stok ke Kelalang Volumetrik {v2FinalCm3} cm³
            </text>
          </g>
        )}

        {mode === 'dilution' && completedStep >= 4 && (
          <g>
            <path
              d="M 196 84 L 196 138 C 156 154 150 210 182 210 L 238 210 C 270 210 264 154 224 138 L 224 84"
              fill="#f8fafc"
              stroke="#1e293b"
              strokeWidth="2.3"
            />
            <path
              d={
                completedStep === 4
                  ? 'M 197 125 Q 210 132 223 125 L 223 138 C 262 154 268 208 238 208 L 182 208 C 152 208 158 154 197 138 Z'
                  : 'M 197 109 Q 210 115 223 109 L 223 138 C 262 154 268 208 238 208 L 182 208 C 152 208 158 154 197 138 Z'
              }
              fill={salt.dilutedHex}
              fillOpacity={salt.dilutedOpacity}
            />
            <path
              d={completedStep === 4 ? 'M 197 125 Q 210 132 223 125' : 'M 197 109 Q 210 115 223 109'}
              fill="none"
              stroke="#0369a1"
              strokeWidth="1.4"
            />
            <line x1="189" y1="112" x2="231" y2="112" stroke="#dc2626" strokeWidth="2" />
            <text x="184" y="115" fontSize="8.5" fill="#dc2626" fontWeight="bold" textAnchor="end">
              Senggatan ({v2FinalCm3} cm³)
            </text>

            {completedStep === 4 && (
              <g>
                {/* Botol pencuci menuang air suling tepat ke dalam mulut kelalang volumetrik */}
                <WashBottlePour targetX={208} targetY={72} dropYs={[10, 24, 38]} tiltDeg={18} />
                <rect x="258" y="138" width="146" height="38" rx="8" fill="#ecfeff" stroke="#06b6d4" strokeWidth="1.2" />
                <text x="331" y="154" fontSize="8.5" fontWeight="bold" fill="#0e7490" textAnchor="middle">
                  Air suling ditambah ≈ {vWaterNeededCm3.toFixed(1)} cm³
                </text>
                <text x="331" y="168" fontSize="8" fontWeight="600" fill="#155e75" textAnchor="middle">
                  (V₂ {v2FinalCm3} − V₁ {v1StockCm3.toFixed(1)} cm³)
                </text>
              </g>
            )}

            {completedStep === 5 && (
              <g>
                <rect x="206" y="24" width="8" height="24" rx="3" fill="#334155" />
                <path d="M 206 48 L 214 48 L 211 68 L 209 68 Z" fill="#e0f2fe" stroke="#475569" strokeWidth="1.5" />
                <path d="M 210 73 C 212.5 77 212.5 80.5 210 80.5 C 207.5 80.5 207.5 77 210 73 Z" fill="#0ea5e9" />
              </g>
            )}

            {completedStep === 6 && (
              <g>
                <path d="M 200 66 L 220 66 L 218 84 L 202 84 Z" fill="#4f46e5" />
                <circle cx="210" cy="61" r="6" fill="#4f46e5" />
                {/* Rajah 6.28 Sisipan Zarah: mol sama, kepekatan berkurang */}
                <g transform="translate(274, 96)">
                  <rect width="136" height="92" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
                  <text x="68" y="16" fontSize="8.5" fontWeight="800" fill="#312e81" textAnchor="middle">
                    Rajah 6.28: Mol Kekal Sama
                  </text>
                  <text x="36" y="31" fontSize="7.5" fontWeight="700" fill="#475569" textAnchor="middle">
                    1.0 M (Pekat)
                  </text>
                  <rect x="14" y="35" width="44" height="36" rx="5" fill={salt.stockHex} fillOpacity={salt.stockOpacity} stroke="#94a3b8" />
                  <circle cx="26" cy="46" r="2.5" fill="#0f172a" />
                  <circle cx="38" cy="44" r="2.5" fill="#0f172a" />
                  <circle cx="48" cy="54" r="2.5" fill="#0f172a" />
                  <circle cx="24" cy="60" r="2.5" fill="#0f172a" />
                  <circle cx="36" cy="62" r="2.5" fill="#0f172a" />

                  <text x="100" y="31" fontSize="7.5" fontWeight="700" fill="#4f46e5" textAnchor="middle">
                    {m2TargetM.toFixed(1)} M (Cair)
                  </text>
                  <rect x="74" y="35" width="52" height="44" rx="5" fill={salt.dilutedHex} fillOpacity={salt.dilutedOpacity} stroke="#6366f1" />
                  <circle cx="84" cy="45" r="2.5" fill="#0f172a" />
                  <circle cx="112" cy="48" r="2.5" fill="#0f172a" />
                  <circle cx="96" cy="60" r="2.5" fill="#0f172a" />
                  <circle cx="84" cy="70" r="2.5" fill="#0f172a" />
                  <circle cx="116" cy="71" r="2.5" fill="#0f172a" />
                </g>
              </g>
            )}

            <text x="210" y="228" fontSize="9.5" fill={completedStep === 6 ? '#4338ca' : '#334155'} fontWeight="bold" textAnchor="middle">
              {completedStep === 4
                ? `Tambah Air Suling (${vWaterNeededCm3.toFixed(1)} cm³) Menghampiri Senggatan`
                : completedStep === 5
                  ? 'Laraskan Aras Meniskus Dengan Penitis'
                  : `✓ Larutan ${salt.formula} ${m2TargetM.toFixed(1)} M Sedia (${salt.dilutedColorLabel})!`}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
