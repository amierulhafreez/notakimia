import React from 'react';
import { AttractionExample, ForceCategoryMeta } from '../data/attractionForces';
import { computeShellElectronCoords, AtomDiagramVariant } from './TextbookAtomDiagram';

interface SingleForceTugStageProps {
  category: ForceCategoryMeta;
  example: AttractionExample;
  /** Nilai semasa pada kawalan (suhu °C atau % tarikan) */
  controlValue: number;
  /** Hentaman tambahan apabila pengguna menekan "Tarik Tali!" */
  tugBoost: number;
  /** Mod varian rajah atom (susunan elektron vs struktur atom p & n) */
  atomVariant?: AtomDiagramVariant;
  /** Untuk sebatian ion / logam: tunjuk keadaan leburan/akueus mengkonduksikan elektrik */
  isCircuitActive?: boolean;
  /** Untuk ikatan hidrogen: tunjuk perbandingan tanpa unsur NOF (cth. HCl) */
  showNoNofCompare?: boolean;
}

export const SingleForceTugStage: React.FC<SingleForceTugStageProps> = ({
  category,
  example,
  controlValue,
  tugBoost,
  atomVariant = 'electron-arrangement',
  isCircuitActive = false,
  showNoNofCompare = false,
}) => {
  const effectiveControl = controlValue + (example.categoryId === 'nukleus-elektron' ? tugBoost : tugBoost * 2.5);

  // Kira nisbah mengatasi daya (0 = sangat selamat/utuh, 1 = tepat putus, >1 = daya diatasi)
  let breakProgress = 0;
  if (example.categoryId === 'nukleus-elektron') {
    // Lebih rendah thresholdValue = lebih mudah diderma (K vs Li); untuk attract, threshold tinggi bermakna nukleus menang
    breakProgress = Math.max(0, Math.min(1.45, effectiveControl / Math.max(10, example.thresholdValue)));
  } else {
    const span = Math.max(25, example.thresholdValue - example.sliderMin);
    breakProgress = Math.max(
      0,
      Math.min(1.45, (effectiveControl - example.sliderMin) / span)
    );
  }

  const isBroken = breakProgress >= 1.0;
  const isStrained = breakProgress >= 0.72 && breakProgress < 1.0;

  // Anjakan molekul/zarah bila ditarik/dipanaskan
  const pullShift = isBroken ? 48 : Math.round(breakProgress * 22);
  // Posisi bendera tali (-72 kiri [tarikan menang] ke +72 kanan [pemisahan menang])
  const flagShift = Math.max(-72, Math.min(72, -72 + breakProgress * 116));

  // Pengiraan skor pihak kanan (berdasarkan kemajuan terhadap daya kiri)
  const rightForceScore = Math.min(115, Math.round(example.tugScore * breakProgress));

  const renderChemicalVisual = () => {
    // =================== 1. DAYA VAN DER WAALS / ANTARA ZARAH ===================
    if (example.categoryId === 'zarah-vdw') {
      const r = example.moleculeRadius ?? 22;
      const fill = example.moleculeColor ?? '#bae6fd';
      const stroke = category.accentHex;
      const textCol = example.moleculeTextColor ?? '#0369a1';
      const leftX = 166 - pullShift * 0.65;
      const rightX = 374 + pullShift * 0.65;
      const cy = 86;

      return (
        <g>
          {/* Garis Tarikan Van der Waals ANTARA dua molekul */}
          {!isBroken ? (
            <g>
              <line
                x1={leftX + r + 8}
                y1={cy - 10}
                x2={rightX - r - 8}
                y2={cy - 10}
                stroke={isStrained ? '#ef4444' : '#0284c7'}
                strokeWidth={isStrained ? '2.4' : '2.1'}
                strokeDasharray="5 4"
              />
              <line
                x1={leftX + r + 8}
                y1={cy + 10}
                x2={rightX - r - 8}
                y2={cy + 10}
                stroke={isStrained ? '#ef4444' : '#0284c7'}
                strokeWidth={isStrained ? '2.4' : '2.1'}
                strokeDasharray="5 4"
              />
              <rect
                x="212"
                y={cy - 34}
                width="116"
                height="18"
                rx="6"
                fill={isStrained ? '#fee2e2' : '#e0f2fe'}
                stroke={isStrained ? '#ef4444' : '#7dd3fc'}
              />
              <text
                x="270"
                y={cy - 22}
                textAnchor="middle"
                fontSize="8.5"
                fontWeight="800"
                fill={isStrained ? '#b91c1c' : '#0369a1'}
              >
                {isStrained ? 'Tarikan Mula Lemah!' : 'Daya Van der Waals'}
              </text>
            </g>
          ) : (
            <g>
              <line
                x1={leftX + r + 6}
                y1={cy}
                x2={leftX + r + 28}
                y2={cy - 6}
                stroke="#ef4444"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <line
                x1={rightX - r - 28}
                y1={cy + 6}
                x2={rightX - r - 6}
                y2={cy}
                stroke="#ef4444"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <rect x="202" y={cy - 28} width="136" height="20" rx="7" fill="#fee2e2" stroke="#ef4444" />
              <text x="270" y={cy - 15} textAnchor="middle" fontSize="9" fontWeight="800" fill="#b91c1c">
                DAYA ANTARA MOLEKUL DIATASI!
              </text>
              <text x="270" y={cy + 16} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0f766e">
                ✓ Ikatan kovalen DALAM molekul kekal utuh!
              </text>
            </g>
          )}

          {/* Molekul Kiri */}
          <g transform={`translate(${leftX}, ${cy})`}>
            {(example.visualKind === 'cl2' || example.visualKind === 'br2' || example.visualKind === 'i2') ? (
              <>
                <line x1={-r * 0.48} y1="0" x2={r * 0.48} y2="0" stroke="#1e293b" strokeWidth="4" />
                <circle cx={-r * 0.48} cy="0" r={r * 0.56} fill={fill} stroke={stroke} strokeWidth="2" />
                <circle cx={r * 0.48} cy="0" r={r * 0.56} fill={fill} stroke={stroke} strokeWidth="2" />
                <text x={-r * 0.48} y="4" textAnchor="middle" fontSize="10" fontWeight="800" fill={textCol}>
                  {example.formula.replace('₂', '')}
                </text>
                <text x={r * 0.48} y="4" textAnchor="middle" fontSize="10" fontWeight="800" fill={textCol}>
                  {example.formula.replace('₂', '')}
                </text>
              </>
            ) : example.visualKind === 'ch4' ? (
              <>
                <line x1="0" y1="0" x2="0" y2="-22" stroke="#334155" strokeWidth="2.4" />
                <line x1="0" y1="0" x2="0" y2="22" stroke="#334155" strokeWidth="2.4" />
                <line x1="0" y1="0" x2="-22" y2="0" stroke="#334155" strokeWidth="2.4" />
                <line x1="0" y1="0" x2="22" y2="0" stroke="#334155" strokeWidth="2.4" />
                <circle cx="0" cy="-22" r="7" fill="#f8fafc" stroke="#475569" strokeWidth="1.3" />
                <circle cx="0" cy="22" r="7" fill="#f8fafc" stroke="#475569" strokeWidth="1.3" />
                <circle cx="-22" cy="0" r="7" fill="#f8fafc" stroke="#475569" strokeWidth="1.3" />
                <circle cx="22" cy="0" r="7" fill="#f8fafc" stroke="#475569" strokeWidth="1.3" />
                <circle cx="0" cy="0" r="12" fill="#94a3b8" stroke="#1e293b" strokeWidth="1.8" />
                <text x="0" y="3.5" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#ffffff">C</text>
              </>
            ) : (
              <>
                <circle cx="0" cy="0" r={r} fill={fill} stroke={stroke} strokeWidth="2.2" />
                <text x="0" y="4" textAnchor="middle" fontSize="11" fontWeight="800" fill={textCol}>
                  {example.formula}
                </text>
              </>
            )}
            <text x="0" y={r + 22} textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">
              Molekul 1 ({example.formula})
            </text>
          </g>

          {/* Molekul Kanan */}
          <g transform={`translate(${rightX}, ${cy})`}>
            {(example.visualKind === 'cl2' || example.visualKind === 'br2' || example.visualKind === 'i2') ? (
              <>
                <line x1={-r * 0.48} y1="0" x2={r * 0.48} y2="0" stroke="#1e293b" strokeWidth="4" />
                <circle cx={-r * 0.48} cy="0" r={r * 0.56} fill={fill} stroke={stroke} strokeWidth="2" />
                <circle cx={r * 0.48} cy="0" r={r * 0.56} fill={fill} stroke={stroke} strokeWidth="2" />
                <text x={-r * 0.48} y="4" textAnchor="middle" fontSize="10" fontWeight="800" fill={textCol}>
                  {example.formula.replace('₂', '')}
                </text>
                <text x={r * 0.48} y="4" textAnchor="middle" fontSize="10" fontWeight="800" fill={textCol}>
                  {example.formula.replace('₂', '')}
                </text>
              </>
            ) : example.visualKind === 'ch4' ? (
              <>
                <line x1="0" y1="0" x2="0" y2="-22" stroke="#334155" strokeWidth="2.4" />
                <line x1="0" y1="0" x2="0" y2="22" stroke="#334155" strokeWidth="2.4" />
                <line x1="0" y1="0" x2="-22" y2="0" stroke="#334155" strokeWidth="2.4" />
                <line x1="0" y1="0" x2="22" y2="0" stroke="#334155" strokeWidth="2.4" />
                <circle cx="0" cy="-22" r="7" fill="#f8fafc" stroke="#475569" strokeWidth="1.3" />
                <circle cx="0" cy="22" r="7" fill="#f8fafc" stroke="#475569" strokeWidth="1.3" />
                <circle cx="-22" cy="0" r="7" fill="#f8fafc" stroke="#475569" strokeWidth="1.3" />
                <circle cx="22" cy="0" r="7" fill="#f8fafc" stroke="#475569" strokeWidth="1.3" />
                <circle cx="0" cy="0" r="12" fill="#94a3b8" stroke="#1e293b" strokeWidth="1.8" />
                <text x="0" y="3.5" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#ffffff">C</text>
              </>
            ) : (
              <>
                <circle cx="0" cy="0" r={r} fill={fill} stroke={stroke} strokeWidth="2.2" />
                <text x="0" y="4" textAnchor="middle" fontSize="11" fontWeight="800" fill={textCol}>
                  {example.formula}
                </text>
              </>
            )}
            <text x="0" y={r + 22} textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">
              Molekul 2 ({example.formula})
            </text>
          </g>
        </g>
      );
    }

    // =================== 2. TARIKAN NUKLEUS ↔ ELEKTRON VALENS (KSSM ATOM) ===================
    if (example.categoryId === 'nukleus-elektron' && example.atomSpec) {
      const atom = example.atomSpec;
      const cx = 148;
      const cy = 88;
      const isShowNucleons = atomVariant === 'atomic-structure';
      const nucleusR = isShowNucleons ? 16 : 13.5;
      const shellCount = atom.shells.length;
      const shellStep = shellCount >= 5 ? 9.8 : shellCount === 4 ? 11.5 : 13.5;
      const firstShellR = nucleusR + 11.5;
      const outerR = firstShellR + (shellCount - 1) * shellStep;

      // Elektron aktif yang ditarik dalam Tug of War (sebelah kanan atom: +x)
      const isDonate = atom.atomicRole === 'donate';
      const activeElectronX = isDonate
        ? isBroken
          ? 382
          : cx + outerR + pullShift * 0.9
        : isBroken
          ? 388
          : 340 - Math.max(0, 1 - breakProgress) * 55;

      return (
        <g>
          {/* Petala sepusat mengikut konvensyen KSSM */}
          {atom.shells.map((elecCount, sIdx) => {
            const r = firstShellR + sIdx * shellStep;
            const isValence = sIdx === shellCount - 1;
            const coords = computeShellElectronCoords(cx, cy, r, elecCount);
            return (
              <g key={sIdx}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke={isValence ? '#7c3aed' : '#94a3b8'}
                  strokeWidth={isValence ? '1.6' : '1.0'}
                  strokeDasharray={isValence && isDonate && isBroken ? '3 3' : undefined}
                />
                {coords.map((pt, dIdx) => (
                  <circle
                    key={dIdx}
                    cx={pt.x}
                    cy={pt.y}
                    r={shellCount >= 5 ? 2.4 : 2.9}
                    fill={isValence ? '#7c3aed' : '#ea580c'}
                    stroke="#1e293b"
                    strokeWidth="0.6"
                  />
                ))}
              </g>
            );
          })}

          {/* Nukleus pusat */}
          <circle cx={cx} cy={cy} r={nucleusR} fill="#bbf7d0" stroke="#1e293b" strokeWidth="1.5" />
          {isShowNucleons ? (
            <>
              <text x={cx} y={cy - 1.5} textAnchor="middle" fontSize="8" fontWeight="800" fill="#0f172a">
                {atom.protonNumber}p
              </text>
              <text x={cx} y={cy + 8} textAnchor="middle" fontSize="8" fontWeight="800" fill="#0f172a">
                {atom.neutronNumber}n
              </text>
            </>
          ) : (
            <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill="#0f172a">
              {atom.symbol}
            </text>
          )}

          {/* Pancaran tarikan nukleus -> elektron valens */}
          <line
            x1={cx + nucleusR + 2}
            y1={cy}
            x2={activeElectronX - 11}
            y2={cy}
            stroke={isBroken ? '#ef4444' : '#7c3aed'}
            strokeWidth={isDonate ? (example.tugScore >= 65 ? '3.0' : '1.6') : '3.2'}
            strokeDasharray={isBroken ? '4 4' : '6 3'}
          />

          {/* Elektron sasaran dalam Tug of War */}
          <g transform={`translate(${activeElectronX}, ${cy})`}>
            <circle
              r="11"
              fill={isDonate ? (isBroken ? '#fee2e2' : '#ede9fe') : '#dcfce7'}
              stroke={isDonate ? (isBroken ? '#dc2626' : '#7c3aed') : '#15803d'}
              strokeWidth="2"
            />
            <text
              x="0"
              y="3.5"
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="900"
              fill={isDonate ? (isBroken ? '#b91c1c' : '#5b21b6') : '#166534'}
            >
              e⁻
            </text>
            <text
              x="0"
              y="22"
              textAnchor="middle"
              fontSize="8.5"
              fontWeight="800"
              fill={isDonate ? '#6d28d9' : '#15803d'}
            >
              {isDonate
                ? isBroken
                  ? 'e⁻ Valens Didermakan!'
                  : 'e⁻ Valens'
                : 'e⁻ Luar (Akan Ditarik)'}
            </text>
          </g>

          {/* Info jarak & petala di sebelah kanan pentas */}
          <g transform="translate(310, 24)">
            <rect width="212" height="122" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
            <text x="12" y="20" fontSize="10" fontWeight="800" fill="#4c1d95">
              {atom.symbol} • {atom.shells.join('.')} ({atom.shells.length} Petala)
            </text>
            <text x="12" y="36" fontSize="9.2" fontWeight="700" fill="#475569">
              Cas Nukleus: +{atom.protonNumber} proton {atom.radiusNm ? `• Jejari: ${atom.radiusNm}` : ''}
            </text>
            <rect
              x="12"
              y="46"
              width="188"
              height="34"
              rx="7"
              fill={isBroken ? '#fef2f2' : '#f5f3ff'}
              stroke={isBroken ? '#fca5a5' : '#ddd6fe'}
            />
            <text x="20" y="61" fontSize="8.8" fontWeight="800" fill={isBroken ? '#b91c1c' : '#5b21b6'}>
              {isDonate
                ? isBroken
                  ? 'Nukleus Tewas → Elektron mudah diderma!'
                  : 'Nukleus Masih Memegang Elektron Valens'
                : isBroken
                  ? 'Tarikan Luar Mengatasi Tarikan Nukleus'
                  : 'Nukleus Menarik Masuk Elektron Luar!'}
            </text>
            <text x="20" y="73" fontSize="8.2" fontWeight="600" fill="#475569">
              {isDonate ? 'Semakin banyak petala → tarikan makin lemah' : 'Petala sedikit → tarikan nukleus sangat kuat'}
            </text>

            {/* Bar petunjuk perisai/jarak */}
            <text x="12" y="96" fontSize="8.5" fontWeight="700" fill="#64748b">
              Jarak Nukleus → Petala Valens:
            </text>
            <rect x="12" y="102" width="188" height="8" rx="4" fill="#e2e8f0" />
            <rect
              x="12"
              y="102"
              width={Math.min(188, atom.shells.length * 36)}
              height="8"
              rx="4"
              fill={atom.shells.length >= 4 ? '#f97316' : '#7c3aed'}
            />
          </g>
        </g>
      );
    }

    // =================== 3. DAYA TARIKAN ELEKTROSTATIK ===================
    if (example.categoryId === 'elektrostatik') {
      const isMoltenOrAqueous = isBroken || isCircuitActive;

      if (example.visualKind === 'metallic-sea') {
        const ionPositions = [
          [110, 56], [160, 56], [210, 56], [260, 56],
          [110, 108], [160, 108], [210, 108], [260, 108],
        ];
        const freeElectrons = [
          [134, 46], [186, 68], [235, 48], [136, 98], [185, 118], [240, 96], [285, 76], [90, 82],
        ];
        return (
          <g>
            {/* Latar lautan elektron */}
            <rect
              x="76"
              y="26"
              width="222"
              height="112"
              rx="14"
              fill="#fffbeb"
              stroke={isBroken ? '#ef4444' : '#f59e0b'}
              strokeWidth="1.6"
              strokeDasharray={isBroken ? '5 3' : undefined}
            />
            {ionPositions.map(([ix, iy], idx) => (
              <g
                key={idx}
                transform={`translate(${isBroken ? ix + (idx % 2 ? 7 : -7) : ix}, ${isBroken ? iy + (idx < 4 ? -6 : 6) : iy})`}
              >
                <circle r="16" fill="#fed7aa" stroke="#b45309" strokeWidth="2" />
                <text x="0" y="4" textAnchor="middle" fontSize="10" fontWeight="800" fill="#7c2d12">
                  Cu²⁺
                </text>
              </g>
            ))}
            {freeElectrons.map(([ex, ey], idx) => (
              <g key={idx} transform={`translate(${ex}, ${ey})`}>
                <circle r="6" fill="#0284c7" />
                <text x="0" y="2.5" textAnchor="middle" fontSize="7" fontWeight="900" fill="#ffffff">
                  e⁻
                </text>
              </g>
            ))}

            {/* Panel litar mentol untuk logam */}
            <g transform="translate(320, 26)">
              <rect width="198" height="112" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
              <text x="99" y="22" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#92400e">
                Ikatan Logam (Rajah 5.19–5.20)
              </text>
              <circle
                cx="99"
                cy="58"
                r="20"
                fill={isCircuitActive ? '#fef08a' : '#f1f5f9'}
                stroke={isCircuitActive ? '#eab308' : '#94a3b8'}
                strokeWidth="2"
              />
              <text x="99" y="62" textAnchor="middle" fontSize="16">
                💡
              </text>
              <text
                x="99"
                y="96"
                textAnchor="middle"
                fontSize="8.8"
                fontWeight="800"
                fill={isCircuitActive ? '#15803d' : '#475569'}
              >
                {isCircuitActive
                  ? 'MENTOL MENYALA (Pepejal konduksi!)'
                  : 'e⁻ bebas mengalir dalam pepejal'}
              </text>
            </g>
          </g>
        );
      }

      // Kekisi Sebatian Ion (NaCl, NaF, MgO)
      const gridIons = [
        { label: example.cationFormula ?? 'Na⁺', isCat: true, x: 112, y: 44 },
        { label: example.anionFormula ?? 'Cl⁻', isCat: false, x: 168, y: 44 },
        { label: example.cationFormula ?? 'Na⁺', isCat: true, x: 224, y: 44 },
        { label: example.anionFormula ?? 'Cl⁻', isCat: false, x: 112, y: 94 },
        { label: example.cationFormula ?? 'Na⁺', isCat: true, x: 168, y: 94 },
        { label: example.anionFormula ?? 'Cl⁻', isCat: false, x: 224, y: 94 },
      ];

      return (
        <g>
          <rect
            x="54"
            y="18"
            width="228"
            height="132"
            rx="14"
            fill={isMoltenOrAqueous ? '#fef2f2' : '#f8fafc'}
            stroke={isMoltenOrAqueous ? '#ef4444' : '#cbd5e1'}
            strokeWidth="1.5"
          />

          {/* Garis tarikan elektrostatik kekisi */}
          {!isMoltenOrAqueous && (
            <g stroke="#d97706" strokeWidth="2.8">
              <line x1="112" y1="44" x2="224" y2="44" />
              <line x1="112" y1="94" x2="224" y2="94" />
              <line x1="112" y1="44" x2="112" y2="94" />
              <line x1="168" y1="44" x2="168" y2="94" />
              <line x1="224" y1="44" x2="224" y2="94" />
            </g>
          )}

          {gridIons.map((ion, idx) => {
            const dx = isMoltenOrAqueous ? (idx % 2 === 0 ? -9 : 11) : 0;
            const dy = isMoltenOrAqueous ? (idx < 3 ? -5 : 5) : 0;
            return (
              <g key={idx} transform={`translate(${ion.x + dx}, ${ion.y + dy})`}>
                <circle
                  r="15.5"
                  fill={ion.isCat ? '#fef3c7' : '#dbeafe'}
                  stroke={ion.isCat ? '#d97706' : '#2563eb'}
                  strokeWidth="2.2"
                />
                <text
                  x="0"
                  y="3.5"
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight="800"
                  fill={ion.isCat ? '#92400e' : '#1e40af'}
                >
                  {ion.label}
                </text>
              </g>
            );
          })}

          <text x="168" y="138" textAnchor="middle" fontSize="8.5" fontWeight="800" fill={isMoltenOrAqueous ? '#b91c1c' : '#92400e'}>
            {isMoltenOrAqueous
              ? 'Kekisi runtuh: ion kini bergerak bebas!'
              : `${example.chargeProductLabel ?? 'Kekisi Ion'} — Tarikan elektrostatik kuat`}
          </text>

          {/* Status Kekonduksian Elektrik KSSM */}
          <g transform="translate(294, 22)">
            <rect width="224" height="120" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
            <text x="112" y="22" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#1e293b">
              Uji Kekonduksian Elektrik
            </text>
            <circle
              cx="112"
              cy="60"
              r="21"
              fill={isMoltenOrAqueous ? '#fef08a' : '#f1f5f9'}
              stroke={isMoltenOrAqueous ? '#eab308' : '#94a3b8'}
              strokeWidth="2"
            />
            <text x="112" y="65" textAnchor="middle" fontSize="17">
              💡
            </text>
            <text
              x="112"
              y="96"
              textAnchor="middle"
              fontSize="8.8"
              fontWeight="800"
              fill={isMoltenOrAqueous ? '#15803d' : '#b91c1c'}
            >
              {isMoltenOrAqueous
                ? 'MENYALA (Leburan / Akueus)'
                : 'TIDAK MENYALA (Pepejal)'}
            </text>
            <text x="112" y="109" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">
              {isMoltenOrAqueous
                ? 'Ion bebas bergerak membawa cas'
                : 'Ion terikat kuat dalam struktur kekisi'}
            </text>
          </g>
        </g>
      );
    }

    // =================== 4. IKATAN HIDROGEN (SYARAT NOF) ===================
    const gapBoost = isBroken ? 52 : pullShift * 0.5;
    const m1X = 148 - gapBoost * 0.55;
    const m2X = 365 + gapBoost * 0.55;
    const cy = 84;

    if (showNoNofCompare) {
      // Paparkan perbandingan tiada NOF (HCl vs H2O)
      return (
        <g>
          <rect x="34" y="18" width="222" height="130" rx="12" fill="#fff1f2" stroke="#fda4af" />
          <text x="145" y="36" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#9f1239">
            ✓ {example.formula} (Ada Ikatan Hidrogen)
          </text>
          <circle cx="96" cy="84" r="16" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
          <text x="96" y="88" textAnchor="middle" fontSize="10" fontWeight="800" fill="#9f1239">O/N/F</text>
          <line x1="112" y1="84" x2="136" y2="84" stroke="#1e293b" strokeWidth="2.4" />
          <circle cx="144" cy="84" r="10" fill="#f8fafc" stroke="#1e293b" strokeWidth="1.8" />
          <text x="144" y="87" textAnchor="middle" fontSize="9" fontWeight="800">H</text>
          <line x1="154" y1="84" x2="190" y2="84" stroke="#e11d48" strokeWidth="2.6" strokeDasharray="4 3" />
          <circle cx="206" cy="84" r="16" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
          <text x="206" y="88" textAnchor="middle" fontSize="10" fontWeight="800" fill="#9f1239">O/N/F</text>
          <text x="145" y="132" textAnchor="middle" fontSize="8.8" fontWeight="700" fill="#be123c">
            Takat didih tinggi ({example.boilingPoint})
          </text>

          <rect x="284" y="18" width="222" height="130" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
          <text x="395" y="36" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#334155">
            ✗ HCl (Tiada N, O atau F!)
          </text>
          <circle cx="342" cy="84" r="11" fill="#f8fafc" stroke="#475569" strokeWidth="1.6" />
          <text x="342" y="87" textAnchor="middle" fontSize="9" fontWeight="800">H</text>
          <line x1="353" y1="84" x2="368" y2="84" stroke="#334155" strokeWidth="2" />
          <circle cx="382" cy="84" r="14" fill="#d9f99d" stroke="#4d7c0f" strokeWidth="1.8" />
          <text x="382" y="88" textAnchor="middle" fontSize="9" fontWeight="800" fill="#3f6212">Cl</text>
          <line x1="397" y1="84" x2="435" y2="84" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 4" />
          <circle cx="448" cy="84" r="14" fill="#d9f99d" stroke="#4d7c0f" strokeWidth="1.8" />
          <text x="448" y="88" textAnchor="middle" fontSize="9" fontWeight="800" fill="#3f6212">Cl</text>
          <text x="395" y="132" textAnchor="middle" fontSize="8.8" fontWeight="700" fill="#475569">
            Hanya Van der Waals (-85 °C)
          </text>
        </g>
      );
    }

    const negAtom =
      example.visualKind === 'hf' ? 'F' : example.visualKind === 'nh3' ? 'N' : 'O';
    const m1HRightX = m1X + 46;

    return (
      <g>
        {/* Garis Ikatan Hidrogen antara H(δ⁺) molekul 1 dengan N/O/F(δ⁻) molekul 2 */}
        {!isBroken ? (
          <g>
            <line
              x1={m1HRightX + 12}
              y1={cy}
              x2={m2X - 24}
              y2={cy}
              stroke="#e11d48"
              strokeWidth="3.2"
              strokeDasharray="6 4"
            />
            <rect x="206" y={cy - 30} width="128" height="20" rx="6" fill="#ffe4e6" stroke="#fb7185" />
            <text x="270" y={cy - 17} textAnchor="middle" fontSize="8.8" fontWeight="800" fill="#be123c">
              Ikatan Hidrogen (δ⁺···δ⁻)
            </text>
          </g>
        ) : (
          <g>
            <line x1={m1HRightX + 14} y1={cy} x2={m1HRightX + 34} y2={cy} stroke="#ef4444" strokeWidth="2.5" strokeDasharray="3 3" />
            <rect x="196" y={cy - 30} width="148" height="20" rx="6" fill="#fee2e2" stroke="#ef4444" />
            <text x="270" y={cy - 17} textAnchor="middle" fontSize="8.8" fontWeight="800" fill="#b91c1c">
              Ikatan Hidrogen Diputuskan!
            </text>
          </g>
        )}

        {/* Molekul 1 */}
        <g transform={`translate(${m1X}, ${cy})`}>
          {example.visualKind === 'etanol' && (
            <>
              <rect x="-78" y="-12" width="52" height="24" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
              <text x="-52" y="3.5" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0369a1">C₂H₅–</text>
              <line x1="-26" y1="0" x2="-16" y2="0" stroke="#1e293b" strokeWidth="2.4" />
            </>
          )}
          {example.visualKind !== 'hf' && example.visualKind !== 'etanol' && (
            <>
              <line x1="-14" y1="8" x2="-36" y2="28" stroke="#1e293b" strokeWidth="2.4" />
              <circle cx="-40" cy="32" r="9.5" fill="#f8fafc" stroke="#1e293b" strokeWidth="1.6" />
              <text x="-40" y="35.5" textAnchor="middle" fontSize="8.5" fontWeight="800">H</text>
            </>
          )}
          {example.visualKind === 'nh3' && (
            <>
              <line x1="-8" y1="-14" x2="-24" y2="-32" stroke="#1e293b" strokeWidth="2.4" />
              <circle cx="-28" cy="-36" r="9.5" fill="#f8fafc" stroke="#1e293b" strokeWidth="1.6" />
              <text x="-28" y="-32.5" textAnchor="middle" fontSize="8.5" fontWeight="800">H</text>
            </>
          )}

          {/* Atom elektronegatif (O/N/F) */}
          <circle cx="0" cy="0" r="18" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2.2" />
          <text x="0" y="4" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#9f1239">
            {negAtom}
          </text>
          <text x="-12" y="-22" fontSize="8.5" fontWeight="800" fill="#be123c">δ⁻</text>

          {/* Ikatan kovalen ke H(δ⁺) */}
          <line x1="18" y1="0" x2="35" y2="0" stroke="#1e293b" strokeWidth="2.6" />
          <circle cx="46" cy="0" r="11" fill="#f8fafc" stroke="#1e293b" strokeWidth="1.8" />
          <text x="46" y="3.5" textAnchor="middle" fontSize="9.5" fontWeight="800">H</text>
          <text x="46" y="-16" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#0284c7">δ⁺</text>

          <text x="8" y="56" textAnchor="middle" fontSize="8.8" fontWeight="700" fill="#475569">
            {example.visualKind === 'etanol' ? 'Molekul Etanol (C₂H₅OH)' : `Molekul 1 (${example.formula})`}
          </text>
        </g>

        {/* Molekul 2 */}
        <g transform={`translate(${m2X}, ${cy})`}>
          <circle cx="0" cy="0" r="18" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2.2" />
          <text x="0" y="4" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#9f1239">
            {example.visualKind === 'etanol' ? 'O' : negAtom}
          </text>
          <text x="-8" y="-22" fontSize="8.5" fontWeight="800" fill="#be123c">δ⁻</text>
          {/* Pasangan elektron bebas */}
          <circle cx="-21" cy="-6" r="1.8" fill="#be123c" />
          <circle cx="-21" cy="6" r="1.8" fill="#be123c" />

          <line x1="15" y1="10" x2="36" y2="26" stroke="#1e293b" strokeWidth="2.4" />
          <circle cx="42" cy="30" r="10" fill="#f8fafc" stroke="#1e293b" strokeWidth="1.6" />
          <text x="42" y="33.5" textAnchor="middle" fontSize="8.5" fontWeight="800">H</text>

          {example.visualKind !== 'hf' && (
            <>
              <line x1="15" y1="-10" x2="36" y2="-26" stroke="#1e293b" strokeWidth="2.4" />
              <circle cx="42" cy="-30" r="10" fill="#f8fafc" stroke="#1e293b" strokeWidth="1.6" />
              <text x="42" y="-26.5" textAnchor="middle" fontSize="8.5" fontWeight="800">H</text>
            </>
          )}

          <text x="16" y="56" textAnchor="middle" fontSize="8.8" fontWeight="700" fill="#475569">
            {example.visualKind === 'etanol' ? 'Molekul Air (H₂O)' : `Molekul 2 (${example.formula})`}
          </text>
        </g>
      </g>
    );
  };

  return (
    <svg viewBox="0 0 540 245" className="w-full h-auto select-none">
      {/* Kawasan visual reaksi bahan */}
      {renderChemicalVisual()}

      {/* Litar / Gelanggang Tali Tarik di bahagian bawah */}
      <g transform="translate(0, 178)">
        <rect x="14" y="0" width="512" height="58" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.2" />

        {/* Sauh Kiri: Daya Tarikan */}
        <rect x="24" y="10" width="122" height="38" rx="10" fill={category.accentHex} />
        <text x="85" y="26" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#ffffff" opacity="0.9">
          TARIKAN KIMIA
        </text>
        <text x="85" y="40" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#ffffff">
          Skor {example.tugScore}/100
        </text>

        {/* Sauh Kanan: Tenaga Haba / Lawan */}
        <rect
          x="394"
          y="10"
          width="122"
          height="38"
          rx="10"
          fill={isBroken ? '#dc2626' : '#f97316'}
        />
        <text x="455" y="26" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#ffffff" opacity="0.9">
          {example.categoryId === 'nukleus-elektron' ? 'TARIKAN LAWAN' : 'TENAGA HABA'}
        </text>
        <text x="455" y="40" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#ffffff">
          {Math.round(controlValue)} {example.thresholdUnit}
        </text>

        {/* Tali Tarik */}
        <line
          x1="148"
          y1="29"
          x2="392"
          y2="29"
          stroke={isBroken ? '#fca5a5' : '#94a3b8'}
          strokeWidth="6"
          strokeDasharray={isBroken ? '8 5' : undefined}
        />
        <line
          x1="148"
          y1="29"
          x2="392"
          y2="29"
          stroke={isBroken ? '#ef4444' : '#cbd5e1'}
          strokeWidth="2.5"
          strokeDasharray="6 6"
        />

        {/* Garisan penanda tengah */}
        <line x1="270" y1="8" x2="270" y2="50" stroke="#94a3b8" strokeWidth="1.4" strokeDasharray="3 3" />

        {/* Bendera ketegangan bergerak */}
        <g transform={`translate(${270 + flagShift}, 29)`}>
          <circle
            r="10"
            fill={isBroken ? '#dc2626' : isStrained ? '#f59e0b' : category.accentHex}
            stroke="#ffffff"
            strokeWidth="2.2"
          />
          <text x="0" y="3.5" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#ffffff">
            {isBroken ? '✗' : '⚡'}
          </text>
        </g>

        <text
          x="270"
          y="53"
          textAnchor="middle"
          fontSize="8.2"
          fontWeight="800"
          fill={isBroken ? '#b91c1c' : '#334155'}
        >
          {isBroken
            ? `TEWAS (${rightForceScore} vs ${example.tugScore})`
            : `TERIKAT UTUH (Tarikan ${example.tugScore} vs Lawan ${rightForceScore})`}
        </text>
      </g>
    </svg>
  );
};

interface DuelArenaSVGProps {
  left: AttractionExample;
  right: AttractionExample;
  /** Offset -1 (menang kiri) hingga +1 (menang kanan) */
  flagOffset: number;
  hasStarted: boolean;
  winnerSide: 'left' | 'right' | 'tie' | null;
}

export const DuelArenaSVG: React.FC<DuelArenaSVGProps> = ({
  left,
  right,
  flagOffset,
  hasStarted,
  winnerSide,
}) => {
  const flagX = 270 + flagOffset * 90;

  return (
    <svg viewBox="0 0 540 200" className="w-full h-auto select-none">
      {/* Latar arena */}
      <rect x="8" y="8" width="524" height="184" rx="16" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Zon menang kiri & kanan */}
      <line x1="175" y1="26" x2="175" y2="174" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
      <line x1="365" y1="26" x2="365" y2="174" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
      <line x1="270" y1="22" x2="270" y2="178" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Tali tarik utama */}
      <line x1="138" y1="96" x2="402" y2="96" stroke="#78350f" strokeWidth="8" strokeLinecap="round" />
      <line
        x1="138"
        y1="96"
        x2="402"
        y2="96"
        stroke="#d97706"
        strokeWidth="3.5"
        strokeDasharray="7 5"
      />

      {/* Pasukan Kiri */}
      <g transform={`translate(${hasStarted ? (winnerSide === 'left' ? -8 : 6) : 0}, 0)`}>
        <rect
          x="22"
          y="30"
          width="130"
          height="132"
          rx="14"
          fill={winnerSide === 'left' ? '#dbeafe' : '#ffffff'}
          stroke={winnerSide === 'left' ? '#2563eb' : '#93c5fd'}
          strokeWidth={winnerSide === 'left' ? '2.8' : '1.8'}
        />
        <text x="87" y="52" textAnchor="middle" fontSize="9" fontWeight="800" fill="#1d4ed8">
          PASUKAN KIRI
        </text>
        <text x="87" y="82" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0f172a">
          {left.formula}
        </text>
        <text x="87" y="102" textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">
          {left.name}
        </text>
        <rect x="37" y="114" width="100" height="22" rx="8" fill="#1d4ed8" />
        <text x="87" y="129" textAnchor="middle" fontSize="10" fontWeight="800" fill="#ffffff">
          Daya: {left.tugScore}/100
        </text>
        <text x="87" y="151" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#1e40af">
          {left.strengthLabel}
        </text>
      </g>

      {/* Pasukan Kanan */}
      <g transform={`translate(${hasStarted ? (winnerSide === 'right' ? 8 : -6) : 0}, 0)`}>
        <rect
          x="388"
          y="30"
          width="130"
          height="132"
          rx="14"
          fill={winnerSide === 'right' ? '#ffe4e6' : '#ffffff'}
          stroke={winnerSide === 'right' ? '#e11d48' : '#fda4af'}
          strokeWidth={winnerSide === 'right' ? '2.8' : '1.8'}
        />
        <text x="453" y="52" textAnchor="middle" fontSize="9" fontWeight="800" fill="#be123c">
          PASUKAN KANAN
        </text>
        <text x="453" y="82" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0f172a">
          {right.formula}
        </text>
        <text x="453" y="102" textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">
          {right.name}
        </text>
        <rect x="403" y="114" width="100" height="22" rx="8" fill="#be123c" />
        <text x="453" y="129" textAnchor="middle" fontSize="10" fontWeight="800" fill="#ffffff">
          Daya: {right.tugScore}/100
        </text>
        <text x="453" y="151" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#9f1239">
          {right.strengthLabel}
        </text>
      </g>

      {/* Bendera Tengah */}
      <g transform={`translate(${flagX}, 96)`} style={{ transition: 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1)' }}>
        <line x1="0" y1="0" x2="0" y2="-32" stroke="#0f172a" strokeWidth="2.5" />
        <polygon points="0,-32 24,-23 0,-14" fill="#facc15" stroke="#ca8a04" strokeWidth="1.2" />
        <circle r="11" fill="#0f172a" stroke="#ffffff" strokeWidth="2.2" />
        <text x="0" y="3.5" textAnchor="middle" fontSize="9" fontWeight="900" fill="#ffffff">
          VS
        </text>
      </g>

      {/* Label status bawah */}
      <text x="270" y="180" textAnchor="middle" fontSize="10" fontWeight="800" fill="#334155">
        {!hasStarted
          ? 'Klik "Mula Pertarungan" atau "Tarik Manual" untuk menguji daya siapa lebih kuat!'
          : winnerSide === 'tie'
            ? 'SERI! Kekuatan daya tarikan kedua-dua bahan adalah seimbang.'
            : winnerSide === 'left'
              ? `🏆 ${left.formula} (${left.name}) MENANG TARIK TALI!`
              : `🏆 ${right.formula} (${right.name}) MENANG TARIK TALI!`}
      </text>
    </svg>
  );
};
