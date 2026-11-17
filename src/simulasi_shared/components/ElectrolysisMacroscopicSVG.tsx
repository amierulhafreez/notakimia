import React from 'react';
import { ElectrolysisOutcome, formatConcentration } from '../data/electrolysisData';

interface Props {
  outcome: ElectrolysisOutcome;
  progress: number; // 0..1
  isRunning: boolean;
  isPaused: boolean;
  showElectrons: boolean;
  showIons: boolean;
}

export const ElectrolysisMacroscopicSVG: React.FC<Props> = ({
  outcome,
  progress,
  isRunning,
  isPaused,
  showElectrons,
  showIons,
}) => {
  const isSwitchClosed = isRunning;
  const circuitActive = isSwitchClosed && outcome.canConduct;
  const activelyAnimating = circuitActive && !isPaused;

  // Dynamic liquid / molten fill
  let liquidFill = 'rgba(186, 230, 253, 0.14)';
  let liquidTopStroke = 'rgba(125, 211, 252, 0.45)';
  if (outcome.solutionMode === 'constant_blue') {
    liquidFill = 'rgba(2, 132, 199, 0.65)';
    liquidTopStroke = 'rgba(56, 189, 248, 0.85)';
  } else if (outcome.solutionMode === 'fades_blue') {
    const alpha = Math.max(0.18, 0.68 - progress * 0.48);
    liquidFill = `rgba(14, 165, 233, ${alpha.toFixed(2)})`;
    liquidTopStroke = `rgba(56, 189, 248, ${(0.85 - progress * 0.45).toFixed(2)})`;
  } else if (outcome.solutionMode === 'tints_blue') {
    const alpha = 0.14 + progress * 0.34;
    liquidFill = `rgba(14, 165, 233, ${alpha.toFixed(2)})`;
    liquidTopStroke = `rgba(56, 189, 248, ${(0.45 + progress * 0.35).toFixed(2)})`;
  } else if (outcome.solutionMode === 'molten_liquid') {
    liquidFill = 'rgba(251, 191, 36, 0.24)';
    liquidTopStroke = 'rgba(251, 146, 60, 0.78)';
  } else if (outcome.solutionMode === 'solid_salt') {
    liquidFill = 'rgba(226, 232, 240, 0.32)';
    liquidTopStroke = 'rgba(148, 163, 184, 0.65)';
  }

  // Realistic ammeter reading across 0.0001..2.0 M or molten state
  let concBoost = 1.0;
  if (outcome.isMolten) {
    concBoost = outcome.isMoltenHeated ? 1.55 : 0;
  } else if (outcome.concentration <= 0.0005) {
    concBoost = 0.24;
  } else if (outcome.concentration <= 0.001) {
    concBoost = 0.38;
  } else if (outcome.concentration < 0.05) {
    concBoost = 0.68;
  } else if (outcome.concentration < 0.5) {
    concBoost = 1.02;
  } else {
    concBoost = 1.48;
  }
  const ammeterCurrent = circuitActive ? (1.12 * concBoost).toFixed(2) : '0.00';
  const needleAngle = circuitActive ? Math.min(44, Math.max(-32, -16 + 38 * concBoost)) : -42;

  const anodeSubmergedW = outcome.electrodeType === 'kuprum' ? Math.max(8, 18 - progress * 9.5) : 18;
  const depositCuExtra = outcome.cathode.productVisual === 'deposit_cu' ? progress * 7 : 0;
  const depositPbExtra = outcome.cathode.productVisual === 'deposit_pb' ? progress * 6.5 : 0;

  return (
    <svg
      viewBox="0 0 560 232"
      className="w-full h-[192px] select-none"
      role="img"
      aria-label={`Radas makroskopik elektrolisis ${outcome.electrolyte.name}`}
    >
      <defs>
        <linearGradient id="carbonGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="45%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="copperGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9a3412" />
          <stop offset="45%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
        <linearGradient id="cuDepositGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c2d12" />
          <stop offset="50%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#9a3412" />
        </linearGradient>
        <linearGradient id="pbDepositGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="50%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <filter id="yellowGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Dark Stage Plate */}
      <rect x="0" y="0" width="560" height="232" rx="14" fill="#070b14" />

      {/* Header Tags */}
      <text x="14" y="19" fill="#94a3b8" fontSize="9.5" fontWeight="700" letterSpacing="0.06em">
        ARAS MAKROSKOPIK • {outcome.isMolten ? 'SEL MANGKUK PIJAR (SEBATIAN LEBUR)' : 'SEL ELEKTROLISIS AKUEUS'}
      </text>
      <text x="546" y="19" textAnchor="end" fill="#e2e8f0" fontSize="9.5" fontWeight="600">
        {outcome.isMolten
          ? `${outcome.electrolyte.formula} • ${outcome.isMoltenHeated ? 'Lebur (>373 °C)' : 'Pepejal (Suhu Bilik)'}`
          : `${outcome.electrolyte.formula} (${formatConcentration(outcome.concentration)} mol dm⁻³)`}
      </text>

      {/* ================= TOP CIRCUIT: WIRES, BATTERY, SWITCH, AMMETER ================= */}
      <path
        d="M 184 95 L 184 42 L 248 42"
        fill="none"
        stroke="#64748b"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M 310 42 L 335 42"
        fill="none"
        stroke="#64748b"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M 372 42 L 395 42" fill="none" stroke="#64748b" strokeWidth="3" />
      <path
        d="M 432 42 L 456 42 L 456 76 L 376 76 L 376 95"
        fill="none"
        stroke="#64748b"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Battery Box */}
      <rect x="248" y="27" width="62" height="30" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
      <line x1="268" y1="33" x2="268" y2="51" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="276" y1="37" x2="276" y2="47" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="284" y1="33" x2="284" y2="51" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="292" y1="37" x2="292" y2="47" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
      <text x="255" y="45" fill="#f87171" fontSize="11" fontWeight="900">+</text>
      <text x="299" y="45" fill="#38bdf8" fontSize="12" fontWeight="900">−</text>
      <text x="279" y="68" textAnchor="middle" fill="#cbd5e1" fontSize="8.5" fontWeight="700">
        Bateri 6V DC
      </text>

      {/* Switch */}
      <circle cx="335" cy="42" r="3" fill="#e2e8f0" />
      <circle cx="372" cy="42" r="3" fill="#e2e8f0" />
      {isSwitchClosed ? (
        <line x1="335" y1="42" x2="372" y2="42" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
      ) : (
        <line x1="335" y1="42" x2="366" y2="29" stroke="#f87171" strokeWidth="2.8" strokeLinecap="round" />
      )}
      <text x="353" y="57" textAnchor="middle" fill={isSwitchClosed ? '#facc15' : '#94a3b8'} fontSize="8" fontWeight="700">
        {isSwitchClosed ? 'Suis Tutup' : 'Suis Buka'}
      </text>

      {/* Ammeter */}
      <circle
        cx="414"
        cy="42"
        r="17"
        fill="#0f172a"
        stroke={circuitActive ? '#38bdf8' : '#475569'}
        strokeWidth="2"
      />
      <text x="414" y="38" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="800">
        A
      </text>
      <line
        x1="414"
        y1="49"
        x2={414 + Math.sin((needleAngle * Math.PI) / 180) * 11}
        y2={49 - Math.cos((needleAngle * Math.PI) / 180) * 11}
        stroke={circuitActive ? '#facc15' : '#94a3b8'}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <text x="414" y="68" textAnchor="middle" fill={circuitActive ? '#38bdf8' : '#64748b'} fontSize="8.5" fontWeight="700">
        {ammeterCurrent} A
      </text>

      {/* Flowing Yellow Electrons in Wire */}
      {showElectrons && circuitActive && (
        <g filter="url(#yellowGlow)">
          {[0, 0.7, 1.4].map((delay, i) => (
            <circle key={`ew-l-${i}`} r="3.3" fill="#facc15" stroke="#fef08a" strokeWidth="0.7">
              {activelyAnimating && (
                <animateMotion
                  dur="2.1s"
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                  path="M 184 95 L 184 42 L 248 42"
                />
              )}
              {!activelyAnimating && <set attributeName="cx" to={184 + i * 22} />}
            </circle>
          ))}
          {[0, 0.7, 1.4].map((delay, i) => (
            <circle key={`ew-r-${i}`} r="3.3" fill="#facc15" stroke="#fef08a" strokeWidth="0.7">
              {activelyAnimating && (
                <animateMotion
                  dur="2.3s"
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                  path="M 310 42 L 456 42 L 456 76 L 376 76 L 376 95"
                />
              )}
              {!activelyAnimating && <set attributeName="cx" to={330 + i * 36} />}
            </circle>
          ))}
          <text x="206" y="34" fill="#facc15" fontSize="8.5" fontWeight="800">
            e⁻ →
          </text>
          <text x="456" y="33" textAnchor="middle" fill="#facc15" fontSize="8.5" fontWeight="800">
            e⁻ → Katod
          </text>
        </g>
      )}

      {/* ================= CONTAINER: BEAKER (AQUEOUS) vs CRUCIBLE + BUNSEN (MOLTEN) ================= */}
      {outcome.isMolten ? (
        <g>
          {/* Tripod Stand (Tungku Kaki Tiga) & Clay Pipe Triangle (Alas Segi Tiga Tanah Liat) */}
          <line x1="158" y1="181" x2="402" y2="181" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          <line x1="176" y1="181" x2="152" y2="215" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
          <line x1="384" y1="181" x2="408" y2="215" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
          <circle cx="222" cy="177" r="4.2" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
          <circle cx="338" cy="177" r="4.2" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />

          {/* Bunsen Burner below Crucible */}
          <rect x="273" y="198" width="14" height="14" rx="2" fill="#475569" />
          <rect x="263" y="211" width="34" height="4.5" rx="2" fill="#334155" />
          {outcome.isMoltenHeated ? (
            <g>
              <path
                d="M 280 181 Q 268 192 273 198 L 287 198 Q 292 192 280 181 Z"
                fill="#f97316"
                opacity="0.92"
              >
                <animate
                  attributeName="d"
                  values="M 280 180 Q 268 192 273 198 L 287 198 Q 292 192 280 180 Z;M 280 183 Q 270 193 273 198 L 287 198 Q 290 193 280 183 Z;M 280 180 Q 268 192 273 198 L 287 198 Q 292 192 280 180 Z"
                  dur="0.7s"
                  repeatCount="indefinite"
                />
              </path>
              <path d="M 280 187 Q 273 194 276 198 L 284 198 Q 287 194 280 187 Z" fill="#38bdf8" />
              <text x="303" y="203" fill="#fb923c" fontSize="8" fontWeight="800">
                Panaskan (&gt;373 °C)
              </text>
            </g>
          ) : (
            <text x="303" y="203" fill="#94a3b8" fontSize="8" fontWeight="700">
              Tiada Haba (Pepejal)
            </text>
          )}

          {/* Crucible Inner Cavities & Contents */}
          <path
            d="M 140 105 L 160 166 Q 166 175 182 175 L 378 175 Q 394 175 400 166 L 420 105 Z"
            fill="#0b1222"
          />
          <path
            d="M 147 128 L 161 166 Q 166 173 182 173 L 378 173 Q 394 173 399 166 L 413 128 Z"
            fill={liquidFill}
          />
          <line x1="147" y1="128" x2="413" y2="128" stroke={liquidTopStroke} strokeWidth="2" />

          {/* Solid Granule Texture if unheated */}
          {!outcome.isMoltenHeated && (
            <g fill="#e2e8f0" opacity="0.45">
              {[190, 215, 240, 265, 290, 315, 340, 360].map((gx, i) => (
                <circle key={`gr-${i}`} cx={gx} cy={158 + (i % 3) * 4.5} r="2.2" />
              ))}
            </g>
          )}

          {/* Crisp Ceramic Crucible Outline */}
          <path
            d="M 134 100 L 140 105 L 160 166 Q 166 175 182 175 L 378 175 Q 394 175 400 166 L 420 105 L 426 100"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="104" y="150" textAnchor="end" fill="#cbd5e1" fontSize="8" fontWeight="700">
            Mangkuk pijar
          </text>
          <line x1="108" y1="148" x2="149" y2="145" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
        </g>
      ) : (
        <g>
          {/* Standard Glass Beaker for Aqueous Solutions */}
          <rect x="115" y="102" width="330" height="110" rx="10" fill="#0b1222" />
          <rect x="117" y="130" width="326" height="80" rx="8" fill={liquidFill} />
          <line x1="117" y1="130" x2="443" y2="130" stroke={liquidTopStroke} strokeWidth="2" />
          <path
            d="M 110 96 L 115 103 L 115 204 Q 115 212 124 212 L 436 212 Q 445 212 445 204 L 445 103 L 450 96"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* Ion Flow Direction Overlay inside Electrolyte */}
      {showIons && outcome.canConduct && (
        <g opacity={circuitActive ? 0.95 : 0.55}>
          <g>
            <line
              x1="270"
              y1={outcome.isMolten ? 148 : 168}
              x2="212"
              y2={outcome.isMolten ? 148 : 168}
              stroke="#f43f5e"
              strokeWidth="1.8"
              strokeDasharray="3 2"
            />
            <polygon
              points={outcome.isMolten ? '212,144 204,148 212,152' : '212,164 204,168 212,172'}
              fill="#f43f5e"
            />
            <text
              x="240"
              y={outcome.isMolten ? 142 : 162}
              textAnchor="middle"
              fill="#fda4af"
              fontSize="8.5"
              fontWeight="700"
            >
              Anion (−) → Anod
            </text>
          </g>
          <g>
            <line
              x1="290"
              y1={outcome.isMolten ? 161 : 188}
              x2="348"
              y2={outcome.isMolten ? 161 : 188}
              stroke="#38bdf8"
              strokeWidth="1.8"
              strokeDasharray="3 2"
            />
            <polygon
              points={outcome.isMolten ? '348,157 356,161 348,165' : '348,184 356,188 348,192'}
              fill="#38bdf8"
            />
            <text
              x="320"
              y={outcome.isMolten ? 170 : 200}
              textAnchor="middle"
              fill="#7dd3fc"
              fontSize="8.5"
              fontWeight="700"
            >
              Kation (+) → Katod
            </text>
          </g>
        </g>
      )}

      {/* ================= ANODE (+) LEFT (Center x=184) ================= */}
      <g>
        <rect x="179" y="92" width="10" height="6" rx="2" fill="#ef4444" />
        <rect
          x={184 - 9}
          y="98"
          width="18"
          height="32"
          rx="2"
          fill={outcome.electrodeType === 'kuprum' ? 'url(#copperGrad)' : 'url(#carbonGrad)'}
          stroke="#94a3b8"
          strokeWidth="0.6"
        />
        <rect
          x={184 - anodeSubmergedW / 2}
          y="130"
          width={anodeSubmergedW}
          height={outcome.isMolten ? 42 : 66}
          rx="2"
          fill={outcome.electrodeType === 'kuprum' ? 'url(#copperGrad)' : 'url(#carbonGrad)'}
          stroke={outcome.electrodeType === 'kuprum' ? '#fdba74' : '#64748b'}
          strokeWidth="0.6"
        />

        <rect x="122" y="99" width="52" height="18" rx="5" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
        <text x="148" y="111" textAnchor="middle" fill="#fecaca" fontSize="9.5" fontWeight="800">
          Anod (+)
        </text>

        {/* Anode Gas Bubbles (O2, Cl2, or Brown Br2) */}
        {activelyAnimating &&
          outcome.anode.productVisual !== 'copper_dissolve' &&
          outcome.anode.productVisual !== 'none' && (
            <g>
              {[0, 0.45, 0.9, 1.35].map((d, i) => (
                <circle
                  key={`ab-${i}`}
                  cx={176 + (i % 2) * 16}
                  cy={outcome.isMolten ? 168 : 185}
                  r={2.5 + (i % 2)}
                  fill={
                    outcome.anode.productVisual === 'gas_cl2'
                      ? '#bef264'
                      : outcome.anode.productVisual === 'gas_br2'
                      ? '#f59e0b'
                      : '#ffffff'
                  }
                  opacity="0.92"
                >
                  <animate
                    attributeName="cy"
                    values={outcome.isMolten ? '170;118' : '190;132'}
                    dur="1.3s"
                    begin={`${d}s`}
                    repeatCount="indefinite"
                  />
                  <animate attributeName="opacity" values="0.95;0" dur="1.3s" begin={`${d}s`} repeatCount="indefinite" />
                </circle>
              ))}
              {outcome.anode.productVisual === 'gas_cl2' && (
                <ellipse cx="184" cy="124" rx="22" ry="7" fill="rgba(190, 242, 100, 0.25)" />
              )}
              {outcome.anode.productVisual === 'gas_br2' && (
                <g>
                  <ellipse cx="184" cy="120" rx="22" ry="8" fill="rgba(217, 119, 6, 0.42)" />
                  <text x="212" y="121" textAnchor="start" fill="#fbbf24" fontSize="8" fontWeight="800">
                    Gas Br₂ perang
                  </text>
                </g>
              )}
            </g>
          )}

        {circuitActive && outcome.anode.productVisual === 'copper_dissolve' && progress > 0.15 && (
          <text x="148" y="146" textAnchor="middle" fill="#fdba74" fontSize="8" fontWeight="700">
            Menipis
          </text>
        )}
      </g>

      {/* ================= CATHODE (−) RIGHT (Center x=376) ================= */}
      <g>
        <rect x="371" y="92" width="10" height="6" rx="2" fill="#3b82f6" />
        <rect
          x={376 - 9}
          y="98"
          width="18"
          height={outcome.isMolten ? 74 : 98}
          rx="2"
          fill={outcome.electrodeType === 'kuprum' ? 'url(#copperGrad)' : 'url(#carbonGrad)'}
          stroke="#94a3b8"
          strokeWidth="0.6"
        />
        {/* Reddish-Brown Copper Deposit */}
        {depositCuExtra > 0.3 && (
          <rect
            x={376 - 9 - depositCuExtra}
            y="131"
            width={18 + depositCuExtra * 2}
            height="66"
            rx="3.5"
            fill="url(#cuDepositGrad)"
            stroke="#fb923c"
            strokeWidth="0.9"
          />
        )}
        {/* Silvery-Grey Lead Deposit */}
        {depositPbExtra > 0.3 && (
          <rect
            x={376 - 9 - depositPbExtra}
            y="131"
            width={18 + depositPbExtra * 2}
            height="42"
            rx="3.5"
            fill="url(#pbDepositGrad)"
            stroke="#f8fafc"
            strokeWidth="0.9"
          />
        )}

        <rect x="389" y="99" width="54" height="18" rx="5" fill="#082f49" stroke="#38bdf8" strokeWidth="1" />
        <text x="416" y="111" textAnchor="middle" fill="#bae6fd" fontSize="9.5" fontWeight="800">
          Katod (−)
        </text>

        {/* Cathode Gas Bubbles (H2) */}
        {activelyAnimating && outcome.cathode.productVisual === 'gas_h2' && (
          <g>
            {[0, 0.28, 0.56, 0.84, 1.12].map((d, i) => (
              <circle
                key={`cb-${i}`}
                cx={366 + (i % 3) * 10}
                cy="185"
                r={2.3 + (i % 2)}
                fill="#f8fafc"
                opacity="0.92"
              >
                <animate attributeName="cy" values="192;131" dur="0.95s" begin={`${d}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0" dur="0.95s" begin={`${d}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>
        )}

        {circuitActive && outcome.cathode.productVisual === 'deposit_cu' && progress > 0.15 && (
          <text x="415" y="146" textAnchor="middle" fill="#fdba74" fontSize="8" fontWeight="700">
            Enapan Cu
          </text>
        )}
        {circuitActive && outcome.cathode.productVisual === 'deposit_pb' && progress > 0.15 && (
          <text x="415" y="142" textAnchor="start" fill="#e2e8f0" fontSize="8" fontWeight="700">
            Enapan Pb
          </text>
        )}
      </g>

      {/* Callout Magnifier Connectors */}
      <line
        x1="184"
        y1={outcome.isMolten ? 172 : 196}
        x2="145"
        y2="232"
        stroke="#ef4444"
        strokeWidth="1.2"
        strokeDasharray="3 3"
        opacity="0.65"
      />
      <line
        x1="376"
        y1={outcome.isMolten ? 172 : 196}
        x2="415"
        y2="232"
        stroke="#38bdf8"
        strokeWidth="1.2"
        strokeDasharray="3 3"
        opacity="0.65"
      />

      {/* Bottom Progress Tag */}
      <text x="280" y="229" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="700">
        {outcome.isMolten && !outcome.isMoltenHeated
          ? 'Pepejal Ion • Kekisi Tetap • Arus: 0.00 A'
          : `Elektrod: ${
              outcome.electrodeType === 'karbon' ? 'Karbon (Lengai)' : 'Kuprum (Aktif)'
            } • Kemajuan: ${Math.round(progress * 100)}%`}
      </text>
    </svg>
  );
};
