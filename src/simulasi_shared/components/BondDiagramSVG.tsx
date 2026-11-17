import React from 'react';
import {
  ElementPickDef,
  IonicSynthesisResult,
  CovalentSynthesisResult,
} from '../data/chemicalBonding';
import { computeShellElectronCoords } from './TextbookAtomDiagram';

// Warna marker elektron konsisten mengikut buku teks KSSM (● oren atom 1, × merah atom 2)
const COLOR_DOT_FILL = '#f59e0b';
const COLOR_DOT_STROKE = '#b45309';
const COLOR_CROSS_STROKE = '#e11d48';
const COLOR_SHELL = '#1e293b';

function formatChargeSup(charge: number, sign: '+' | '-'): string {
  return charge === 1 ? sign : `${charge}${sign}`;
}

function getShellRadii(shellCount: number, outerRadius: number): number[] {
  if (shellCount <= 1) return [outerRadius];
  if (shellCount === 2) return [outerRadius * 0.56, outerRadius];
  if (shellCount === 3) return [outerRadius * 0.36, outerRadius * 0.66, outerRadius];
  return [outerRadius * 0.28, outerRadius * 0.5, outerRadius * 0.74, outerRadius];
}

interface ElectronMarkerProps {
  x: number;
  y: number;
  kind: 'dot' | 'cross';
  r?: number;
}

const ElectronMarker: React.FC<ElectronMarkerProps> = ({ x, y, kind, r = 4.2 }) => {
  if (kind === 'dot') {
    return (
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={COLOR_DOT_FILL}
        stroke={COLOR_DOT_STROKE}
        strokeWidth={1.3}
      />
    );
  }
  const s = r * 0.92;
  return (
    <g stroke={COLOR_CROSS_STROKE} strokeWidth={2.1} strokeLinecap="round">
      <line x1={x - s} y1={y - s} x2={x + s} y2={y + s} />
      <line x1={x - s} y1={y + s} x2={x + s} y2={y - s} />
    </g>
  );
};

interface AtomRingProps {
  cx: number;
  cy: number;
  symbol: string;
  shells: number[];
  outerRadius: number;
  markerKind: 'dot' | 'cross';
  skipOuterShellElectrons?: boolean;
  transferredDotIndicesOnOuter?: number; // Bil. ● diderma masuk pada petala valens anion
  accentRingColor?: string;
}

const AtomRingGroup: React.FC<AtomRingProps> = ({
  cx,
  cy,
  symbol,
  shells,
  outerRadius,
  markerKind,
  skipOuterShellElectrons = false,
  transferredDotIndicesOnOuter = 0,
  accentRingColor,
}) => {
  const radii = getShellRadii(shells.length, outerRadius);
  const nucR = Math.max(11, Math.min(18, outerRadius * 0.24));

  return (
    <g>
      {radii.map((r, sIdx) => {
        const isValence = sIdx === radii.length - 1;
        const count = shells[sIdx] ?? 0;
        const coords =
          isValence && skipOuterShellElectrons
            ? []
            : computeShellElectronCoords(cx, cy, r, count);

        // Untuk anion terbentuk: jumlah elektron pada petala valens ialah count + transferred,
        // tetapi `transferredDotIndicesOnOuter` daripadanya berasal drpd atom logam (●).
        // Di sini `shells` untuk anion sudah pun `ionShells` (cth 8 atau 2),
        // maka kita jadikan slot terakhir sebagai 'dot' apabila transferred > 0.
        const dotStartIdx =
          isValence && transferredDotIndicesOnOuter > 0
            ? Math.max(0, count - transferredDotIndicesOnOuter)
            : count;

        return (
          <g key={`shell-${sIdx}`}>
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={isValence && accentRingColor ? accentRingColor : COLOR_SHELL}
              strokeWidth={isValence ? 1.85 : 1.35}
            />
            {coords.map((pt, eIdx) => {
              const effectiveKind: 'dot' | 'cross' =
                isValence && transferredDotIndicesOnOuter > 0
                  ? eIdx >= dotStartIdx
                    ? 'dot'
                    : 'cross'
                  : markerKind;
              return (
                <ElectronMarker
                  key={`e-${sIdx}-${eIdx}`}
                  x={pt.x}
                  y={pt.y}
                  kind={effectiveKind}
                  r={outerRadius < 42 ? 3.4 : 4.2}
                />
              );
            })}
          </g>
        );
      })}

      {/* Nukleus pusat dengan simbol unsur (mengikut gaya Rajah 5.4-5.10) */}
      <circle
        cx={cx}
        cy={cy}
        r={nucR}
        fill={markerKind === 'dot' ? '#fffbeb' : '#fff1f2'}
        stroke={markerKind === 'dot' ? '#d97706' : '#e11d48'}
        strokeWidth={1.5}
      />
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fontSize={outerRadius < 42 ? 10 : 12.5}
        fontWeight="800"
        fill="#0f172a"
      >
        {symbol}
      </text>
    </g>
  );
};

interface BracketIonProps {
  cx: number;
  cy: number;
  radius: number;
  chargeText: string;
  chargeColor: string;
  children: React.ReactNode;
}

const BracketIonGroup: React.FC<BracketIonProps> = ({
  cx,
  cy,
  radius,
  chargeText,
  chargeColor,
  children,
}) => {
  const pad = 10;
  const xL = cx - radius - pad;
  const xR = cx + radius + pad;
  const yT = cy - radius - pad;
  const yB = cy + radius + pad;
  const hook = 9;

  return (
    <g>
      {children}
      {/* Kurungan siku kiri & kanan */}
      <path
        d={`M ${xL + hook} ${yT} L ${xL} ${yT} L ${xL} ${yB} L ${xL + hook} ${yB}`}
        fill="none"
        stroke="#0f172a"
        strokeWidth={2.2}
        strokeLinecap="square"
      />
      <path
        d={`M ${xR - hook} ${yT} L ${xR} ${yT} L ${xR} ${yB} L ${xR - hook} ${yB}`}
        fill="none"
        stroke="#0f172a"
        strokeWidth={2.2}
        strokeLinecap="square"
      />
      {/* Superskrip cas ion */}
      <text
        x={xR + 4}
        y={yT + 4}
        fontSize={13.5}
        fontWeight="800"
        fill={chargeColor}
      >
        {chargeText}
      </text>
    </g>
  );
};

// =====================================================================
// 1. GAMBAR RAJAH IKATAN ION (Rajah 5.4 - 5.6 KSSM Bab 5)
// =====================================================================
export const IonicBondDiagramSVG: React.FC<{ result: IonicSynthesisResult }> = ({
  result,
}) => {
  const {
    metal,
    nonmetal,
    metalCount,
    nonmetalCount,
    metalCharge,
    nonmetalCharge,
    totalElectronsTransferred,
  } = result;

  // Tentukan kedudukan atom sebelah kiri (Sebelum Pemindahan)
  const useCompactCoeffLeft = metalCount > 2 || nonmetalCount > 2;
  const leftMetalPositions: { cx: number; cy: number; r: number }[] = [];
  const leftNonmetalPositions: { cx: number; cy: number; r: number }[] = [];

  if (useCompactCoeffLeft) {
    leftMetalPositions.push({ cx: 105, cy: 145, r: 54 });
    leftNonmetalPositions.push({ cx: 270, cy: 145, r: 54 });
  } else {
    const mCount = metalCount;
    const nCount = nonmetalCount;
    const mRadius = mCount === 1 ? (nCount === 1 ? 62 : 54) : 44;
    const nRadius = nCount === 1 ? (mCount === 1 ? 62 : 54) : 44;

    if (mCount === 1) {
      leftMetalPositions.push({ cx: 98, cy: 145, r: mRadius });
    } else {
      leftMetalPositions.push({ cx: 98, cy: 84, r: mRadius });
      leftMetalPositions.push({ cx: 98, cy: 206, r: mRadius });
    }

    if (nCount === 1) {
      leftNonmetalPositions.push({ cx: 268, cy: 145, r: nRadius });
    } else {
      leftNonmetalPositions.push({ cx: 268, cy: 84, r: nRadius });
      leftNonmetalPositions.push({ cx: 268, cy: 206, r: nRadius });
    }
  }

  // Tentukan kedudukan ion sebelah kanan (Selepas Pemindahan)
  // Untuk nisbah 1:1 (NaCl), 1:2 (MgCl2), 2:1 (Na2O), paparkan semua ion secara berselang-seli seperti buku teks
  const rightIons: {
    kind: 'cation' | 'anion';
    cx: number;
    cy: number;
    r: number;
    coeff?: number;
  }[] = [];

  if (metalCount === 1 && nonmetalCount === 1) {
    rightIons.push({ kind: 'cation', cx: 525, cy: 145, r: 54 });
    rightIons.push({ kind: 'anion', cx: 705, cy: 145, r: 58 });
  } else if (metalCount === 1 && nonmetalCount === 2) {
    // Contoh: [Cl]- [Mg]2+ [Cl]-
    rightIons.push({ kind: 'anion', cx: 486, cy: 145, r: 44 });
    rightIons.push({ kind: 'cation', cx: 625, cy: 145, r: 42 });
    rightIons.push({ kind: 'anion', cx: 762, cy: 145, r: 44 });
  } else if (metalCount === 2 && nonmetalCount === 1) {
    // Contoh: [Na]+ [O]2- [Na]+
    rightIons.push({ kind: 'cation', cx: 486, cy: 145, r: 42 });
    rightIons.push({ kind: 'anion', cx: 625, cy: 145, r: 45 });
    rightIons.push({ kind: 'cation', cx: 762, cy: 145, r: 42 });
  } else {
    // Contoh Al2O3, AlF3, Ca3N2: gunakan pekali bersih 2 [Al]3+   3 [O]2-
    rightIons.push({ kind: 'cation', cx: 530, cy: 145, r: 50, coeff: metalCount });
    rightIons.push({ kind: 'anion', cx: 718, cy: 145, r: 52, coeff: nonmetalCount });
  }

  return (
    <svg
      viewBox="0 0 850 288"
      className="w-full h-auto max-h-[290px] select-none"
      role="img"
      aria-label={`Rajah pemindahan elektron membentuk ${result.compoundName}`}
    >
      <defs>
        <marker
          id="ionic-transfer-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#d97706" />
        </marker>
        <marker
          id="ionic-main-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#334155" />
        </marker>
      </defs>

      {/* Latar zon Kiri vs Kanan */}
      <rect
        x="8"
        y="6"
        width="350"
        height="276"
        rx="14"
        fill="#fffdf7"
        stroke="#fde68a"
        strokeWidth="1.2"
      />
      <rect
        x="426"
        y="6"
        width="416"
        height="276"
        rx="14"
        fill="#f8fafc"
        stroke="#cbd5e1"
        strokeWidth="1.2"
      />

      {/* Tajuk zon */}
      <text x="183" y="25" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#92400e">
        1. Atom Neutral (Sebelum Pemindahan)
      </text>
      <text x="634" y="25" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#1e293b">
        2. Ion Terhasil (Sebatian Ion: {result.formula})
      </text>

      {/* Atom Logam di kiri */}
      {useCompactCoeffLeft && metalCount > 1 && (
        <text x="34" y="152" fontSize="22" fontWeight="800" fill="#b45309">
          {metalCount}
        </text>
      )}
      {leftMetalPositions.map((pos, idx) => (
        <AtomRingGroup
          key={`lm-${idx}`}
          cx={pos.cx}
          cy={pos.cy}
          symbol={metal.symbol}
          shells={metal.shells}
          outerRadius={pos.r}
          markerKind="dot"
        />
      ))}

      {/* Anak panah pemindahan elektron dari logam ke bukan logam */}
      {leftMetalPositions.map((mPos, mIdx) => {
        const targetPos =
          leftNonmetalPositions[Math.min(mIdx, leftNonmetalPositions.length - 1)];
        const startX = mPos.cx + mPos.r * 0.72;
        const startY = mPos.cy - mPos.r * 0.68;
        const endX = targetPos.cx - targetPos.r * 0.75;
        const endY = targetPos.cy - targetPos.r * 0.65;
        const ctrlX = (startX + endX) / 2;
        const ctrlY = Math.min(startY, endY) - 24;
        return (
          <path
            key={`t-arc-${mIdx}`}
            d={`M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`}
            fill="none"
            stroke="#d97706"
            strokeWidth="1.8"
            strokeDasharray="4 3"
            markerEnd="url(#ionic-transfer-arrow)"
          />
        );
      })}
      {/* Jika 1 logam menderma kepada 2 bukan logam (cth MgCl2), tambah anak panah kedua ke atom bawah */}
      {!useCompactCoeffLeft &&
        metalCount === 1 &&
        nonmetalCount === 2 &&
        leftNonmetalPositions[1] && (
          <path
            d={`M ${leftMetalPositions[0].cx + leftMetalPositions[0].r * 0.7} ${
              leftMetalPositions[0].cy + leftMetalPositions[0].r * 0.68
            } Q ${185} ${238} ${
              leftNonmetalPositions[1].cx - leftNonmetalPositions[1].r * 0.85
            } ${leftNonmetalPositions[1].cy + leftNonmetalPositions[1].r * 0.35}`}
            fill="none"
            stroke="#d97706"
            strokeWidth="1.8"
            strokeDasharray="4 3"
            markerEnd="url(#ionic-transfer-arrow)"
          />
        )}

      {/* Label kecil bilangan e- pindah */}
      <rect
        x="148"
        y="34"
        width="74"
        height="18"
        rx="9"
        fill="#fef3c7"
        stroke="#f59e0b"
        strokeWidth="1"
      />
      <text x="185" y="46.5" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">
        {totalElectronsTransferred} e⁻ pindah
      </text>

      {/* Atom Bukan Logam di kiri */}
      {useCompactCoeffLeft && nonmetalCount > 1 && (
        <text x="198" y="152" fontSize="22" fontWeight="800" fill="#be123c">
          {nonmetalCount}
        </text>
      )}
      {leftNonmetalPositions.map((pos, idx) => (
        <AtomRingGroup
          key={`ln-${idx}`}
          cx={pos.cx}
          cy={pos.cy}
          symbol={nonmetal.symbol}
          shells={nonmetal.shells}
          outerRadius={pos.r}
          markerKind="cross"
        />
      ))}

      {/* Label konfigurasi di bawah kiri */}
      <text x="102" y="271" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#78350f">
        {metal.symbol}: {metal.electronConfig} ({metal.shells.length} petala)
      </text>
      <text x="268" y="271" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#9f1239">
        {nonmetal.symbol}: {nonmetal.electronConfig} ({nonmetal.shells.length} petala)
      </text>

      {/* Anak Panah Utama di Tengah */}
      <line
        x1="366"
        y1="145"
        x2="414"
        y2="145"
        stroke="#334155"
        strokeWidth="2.8"
        markerEnd="url(#ionic-main-arrow)"
      />

      {/* Ion Terhasil di Kanan */}
      {rightIons.map((ion, idx) => {
        const isCat = ion.kind === 'cation';
        const el = isCat ? metal : nonmetal;
        const shells = el.ionShells;
        const chargeStr = isCat
          ? formatChargeSup(metalCharge, '+')
          : formatChargeSup(nonmetalCharge, '-');

        return (
          <g key={`ion-${idx}`}>
            {ion.coeff && ion.coeff > 1 && (
              <text
                x={ion.cx - ion.r - 24}
                y={ion.cy + 7}
                textAnchor="middle"
                fontSize="21"
                fontWeight="800"
                fill={isCat ? '#b45309' : '#be123c'}
              >
                {ion.coeff}
              </text>
            )}
            <BracketIonGroup
              cx={ion.cx}
              cy={ion.cy}
              radius={ion.r}
              chargeText={chargeStr}
              chargeColor={isCat ? '#b45309' : '#be123c'}
            >
              <AtomRingGroup
                cx={ion.cx}
                cy={ion.cy}
                symbol={el.symbol}
                shells={shells}
                outerRadius={ion.r}
                markerKind={isCat ? 'dot' : 'cross'}
                transferredDotIndicesOnOuter={isCat ? 0 : nonmetalCharge}
              />
            </BracketIonGroup>
          </g>
        );
      })}

      {/* Label konfigurasi di bawah kanan */}
      <text x="530" y="271" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#92400e">
        Ion {metal.symbol}{formatChargeSup(metalCharge, '+')}: {metal.ionConfig} ({metal.ionShells.length} petala)
      </text>
      <text x="730" y="271" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#9f1239">
        Ion {nonmetal.symbol}{formatChargeSup(nonmetalCharge, '-')}: {nonmetal.ionConfig} ({nonmetal.ionShells.length} petala)
      </text>
    </svg>
  );
};

// =====================================================================
// 2. GAMBAR RAJAH IKATAN KOVALEN (Rajah 5.7 - 5.10 KSSM Bab 5)
// =====================================================================

/**
 * Lukis pasangan elektron bebas pada sudut luar petala valens yang tidak bertindih
 */
function renderUnsharedValenceElectrons(
  cx: number,
  cy: number,
  r: number,
  count: number,
  markerKind: 'dot' | 'cross',
  blockedAnglesDeg: number[], // Sudut ke arah jiran bertindih (0=kanan, 90=bawah, 180=kiri, 270=atas)
  markerR: number,
  keyPrefix: string
) {
  if (count <= 0) return null;

  // Calon arah kardinal [Atas, Kanan, Bawah, Kiri] dalam darjah SVG (0=kanan, 90=bawah, 180=kiri, 270=atas)
  const cardinalDirs = [270, 0, 90, 180];
  const freeDirs = cardinalDirs.filter((deg) => {
    return !blockedAnglesDeg.some((b) => {
      const diff = Math.abs(((deg - b + 540) % 360) - 180);
      return diff < 40;
    });
  });

  // Susun elektron berpasangan (atau tunggal jika baki ganjil) di sepanjang arah bebas
  const nodes: React.ReactNode[] = [];
  let remaining = count;
  const maxSlots = Math.max(1, freeDirs.length);
  const dirsToUse = freeDirs.length > 0 ? freeDirs : [270];

  // Agih pasangan terlebih dahulu, kemudian tunggal jika ganjil
  const slotCounts = new Array<number>(maxSlots).fill(0);
  let idx = 0;
  while (remaining >= 2 && idx < maxSlots) {
    slotCounts[idx] += 2;
    remaining -= 2;
    idx++;
  }
  idx = 0;
  while (remaining > 0) {
    slotCounts[idx % maxSlots] += 1;
    remaining -= 1;
    idx++;
  }

  slotCounts.forEach((nInSlot, sIdx) => {
    if (nInSlot === 0) return;
    const rad = (dirsToUse[sIdx % dirsToUse.length] * Math.PI) / 180;
    const perpRad = rad + Math.PI / 2;

    if (nInSlot === 1) {
      nodes.push(
        <ElectronMarker
          key={`${keyPrefix}-u-${sIdx}-0`}
          x={cx + r * Math.cos(rad)}
          y={cy + r * Math.sin(rad)}
          kind={markerKind}
          r={markerR}
        />
      );
    } else {
      // Letak 2 (atau lebih jika terpaksa) sepasang rapat atas lilitan
      const spreadAngle = 0.14;
      for (let k = 0; k < nInSlot; k++) {
        const offsetAngle = (k - (nInSlot - 1) / 2) * spreadAngle;
        const a = rad + offsetAngle;
        const extraRadial = nInSlot > 2 ? ((k % 2) * 2 - 1) * 1.5 : 0;
        const rr = r + extraRadial + (k === 0 ? 0 : 0) * Math.cos(perpRad) * 0;
        nodes.push(
          <ElectronMarker
            key={`${keyPrefix}-u-${sIdx}-${k}`}
            x={cx + rr * Math.cos(a)}
            y={cy + rr * Math.sin(a)}
            kind={markerKind}
            r={markerR}
          />
        );
      }
    }
  });

  return <g>{nodes}</g>;
}

/**
 * Lukis pasangan elektron kongsi (bondOrder = 1, 2, atau 3) tepat di zon tindihan dua bulatan
 */
function renderSharedLensPairs(
  x1: number,
  y1: number,
  r1: number,
  x2: number,
  y2: number,
  r2: number,
  bondOrder: 1 | 2 | 3,
  markerR: number,
  keyPrefix: string
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const d = Math.hypot(dx, dy) || 1;
  const ux = dx / d;
  const uy = dy / d;
  // Titik paksi radikal antara dua bulatan valens
  const distMid = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  const mx = x1 + ux * distMid;
  const my = y1 + uy * distMid;

  // Vektor serenjang paksi ikatan (tempat pasangan bertingkat jika ganda dua / tiga)
  const px = -uy;
  const py = ux;

  // Jarak selang pasangan sepanjang kanta tindihan
  const pairSpacing = bondOrder === 3 ? 16 : bondOrder === 2 ? 19 : 0;
  // Jarak sedikit antara ● dan × bagi setiap pasangan sepanjang paksi ikatan
  const halfPairGap = 5.5;

  const nodes: React.ReactNode[] = [];
  for (let p = 0; p < bondOrder; p++) {
    const offset = (p - (bondOrder - 1) / 2) * pairSpacing;
    const baseX = mx + px * offset;
    const baseY = my + py * offset;
    nodes.push(
      <ElectronMarker
        key={`${keyPrefix}-sh-d-${p}`}
        x={baseX - ux * halfPairGap}
        y={baseY - uy * halfPairGap}
        kind="dot"
        r={markerR}
      />
    );
    nodes.push(
      <ElectronMarker
        key={`${keyPrefix}-sh-x-${p}`}
        x={baseX + ux * halfPairGap}
        y={baseY + uy * halfPairGap}
        kind="cross"
        r={markerR}
      />
    );
  }

  return <g>{nodes}</g>;
}

interface CovalentAtomPlacement {
  el: ElementPickDef;
  cx: number;
  cy: number;
  r: number;
  markerKind: 'dot' | 'cross';
  blockedAnglesDeg: number[];
  unsharedValenceCount: number;
}

export const CovalentBondDiagramSVG: React.FC<{ result: CovalentSynthesisResult }> = ({
  result,
}) => {
  const { centerEl, outerEl, outerCount, bondOrder, isHomodiatomic } = result;

  const placements: CovalentAtomPlacement[] = [];
  const bonds: { fromIdx: number; toIdx: number }[] = [];

  if (outerCount === 1) {
    // 2 atom sebelah-menyebelah (cth Cl2, O2, N2, HCl, H2)
    const rC = 72;
    const rO = 72;
    const overlap = 26;
    const d = rC + rO - overlap; // 118
    const cx1 = 390 - d / 2;
    const cx2 = 390 + d / 2;
    const cy = 152;

    placements.push({
      el: centerEl,
      cx: cx1,
      cy,
      r: rC,
      markerKind: 'dot',
      blockedAnglesDeg: [0],
      unsharedValenceCount: Math.max(0, centerEl.valenceElectrons - bondOrder),
    });
    placements.push({
      el: outerEl,
      cx: cx2,
      cy,
      r: rO,
      markerKind: 'cross',
      blockedAnglesDeg: [180],
      unsharedValenceCount: Math.max(0, outerEl.valenceElectrons - bondOrder),
    });
    bonds.push({ fromIdx: 0, toIdx: 1 });
  } else if (outerCount === 2) {
    // 1 atom pusat + 2 atom luar (cth H2O, CO2, SiO2, SCl2)
    const rC = 68;
    const rO = outerEl.symbol === 'H' ? 46 : 64;
    const overlap = 24;
    const d = rC + rO - overlap;
    const cy = 152;

    placements.push({
      el: centerEl,
      cx: 390,
      cy,
      r: rC,
      markerKind: 'dot',
      blockedAnglesDeg: [0, 180],
      unsharedValenceCount: Math.max(0, centerEl.valenceElectrons - 2 * bondOrder),
    });
    placements.push({
      el: outerEl,
      cx: 390 - d,
      cy,
      r: rO,
      markerKind: 'cross',
      blockedAnglesDeg: [0],
      unsharedValenceCount: Math.max(0, outerEl.valenceElectrons - bondOrder),
    });
    placements.push({
      el: outerEl,
      cx: 390 + d,
      cy,
      r: rO,
      markerKind: 'cross',
      blockedAnglesDeg: [180],
      unsharedValenceCount: Math.max(0, outerEl.valenceElectrons - bondOrder),
    });
    bonds.push({ fromIdx: 0, toIdx: 1 }, { fromIdx: 0, toIdx: 2 });
  } else if (outerCount === 3) {
    // 1 atom pusat + 3 atom luar (cth NH3, PCl3, NF3): Kiri, Kanan, Bawah (biarkan Atas untuk pasangan bebas)
    const rC = 64;
    const rO = outerEl.symbol === 'H' ? 44 : 56;
    const overlap = 22;
    const d = rC + rO - overlap;
    const cx = 390;
    const cy = 122;

    placements.push({
      el: centerEl,
      cx,
      cy,
      r: rC,
      markerKind: 'dot',
      blockedAnglesDeg: [0, 90, 180],
      unsharedValenceCount: Math.max(0, centerEl.valenceElectrons - 3 * bondOrder),
    });
    placements.push({
      el: outerEl,
      cx: cx - d,
      cy,
      r: rO,
      markerKind: 'cross',
      blockedAnglesDeg: [0],
      unsharedValenceCount: Math.max(0, outerEl.valenceElectrons - bondOrder),
    });
    placements.push({
      el: outerEl,
      cx: cx + d,
      cy,
      r: rO,
      markerKind: 'cross',
      blockedAnglesDeg: [180],
      unsharedValenceCount: Math.max(0, outerEl.valenceElectrons - bondOrder),
    });
    placements.push({
      el: outerEl,
      cx,
      cy: cy + d,
      r: rO,
      markerKind: 'cross',
      blockedAnglesDeg: [270],
      unsharedValenceCount: Math.max(0, outerEl.valenceElectrons - bondOrder),
    });
    bonds.push({ fromIdx: 0, toIdx: 1 }, { fromIdx: 0, toIdx: 2 }, { fromIdx: 0, toIdx: 3 });
  } else {
    // outerCount === 4 (cth CH4, CCl4, SiH4, SiCl4): Atas, Kanan, Bawah, Kiri
    const rC = 56;
    const rO = outerEl.symbol === 'H' ? 42 : 48;
    const overlap = 20;
    const d = rC + rO - overlap;
    const cx = 390;
    const cy = 160;

    placements.push({
      el: centerEl,
      cx,
      cy,
      r: rC,
      markerKind: 'dot',
      blockedAnglesDeg: [0, 90, 180, 270],
      unsharedValenceCount: Math.max(0, centerEl.valenceElectrons - 4 * bondOrder),
    });
    placements.push({
      el: outerEl,
      cx,
      cy: cy - d,
      r: rO,
      markerKind: 'cross',
      blockedAnglesDeg: [90],
      unsharedValenceCount: Math.max(0, outerEl.valenceElectrons - bondOrder),
    });
    placements.push({
      el: outerEl,
      cx: cx + d,
      cy,
      r: rO,
      markerKind: 'cross',
      blockedAnglesDeg: [180],
      unsharedValenceCount: Math.max(0, outerEl.valenceElectrons - bondOrder),
    });
    placements.push({
      el: outerEl,
      cx,
      cy: cy + d,
      r: rO,
      markerKind: 'cross',
      blockedAnglesDeg: [270],
      unsharedValenceCount: Math.max(0, outerEl.valenceElectrons - bondOrder),
    });
    placements.push({
      el: outerEl,
      cx: cx - d,
      cy,
      r: rO,
      markerKind: 'cross',
      blockedAnglesDeg: [0],
      unsharedValenceCount: Math.max(0, outerEl.valenceElectrons - bondOrder),
    });
    bonds.push(
      { fromIdx: 0, toIdx: 1 },
      { fromIdx: 0, toIdx: 2 },
      { fromIdx: 0, toIdx: 3 },
      { fromIdx: 0, toIdx: 4 }
    );
  }

  const markerSize = outerCount >= 4 ? 3.5 : 4.2;

  return (
    <svg
      viewBox="0 0 780 315"
      className="w-full h-auto max-h-[300px] select-none"
      role="img"
      aria-label={`Gambar rajah perkongsian elektron bagi ${result.compoundName}`}
    >
      {/* Petala dalaman + lilitan petala valens bertindih */}
      {placements.map((pl, idx) => (
        <AtomRingGroup
          key={`cov-atom-${idx}`}
          cx={pl.cx}
          cy={pl.cy}
          symbol={pl.el.symbol}
          shells={pl.el.shells}
          outerRadius={pl.r}
          markerKind={pl.markerKind}
          skipOuterShellElectrons={true}
        />
      ))}

      {/* Elektron tidak berkongsi pada petala valens setiap atom */}
      {placements.map((pl, idx) =>
        renderUnsharedValenceElectrons(
          pl.cx,
          pl.cy,
          pl.r,
          pl.unsharedValenceCount,
          pl.markerKind,
          pl.blockedAnglesDeg,
          markerSize,
          `cov-${idx}`
        )
      )}

      {/* Pasangan elektron dikongsi pada kanta pertindihan */}
      {bonds.map((b, idx) => {
        const a1 = placements[b.fromIdx];
        const a2 = placements[b.toIdx];
        return renderSharedLensPairs(
          a1.cx,
          a1.cy,
          a1.r,
          a2.cx,
          a2.cy,
          a2.r,
          bondOrder,
          markerSize,
          `bond-${idx}`
        );
      })}

      {/* Maklumat petala & susunan elektron atom yang bertindak balas */}
      <g>
        <rect
          x="12"
          y="10"
          width="210"
          height="48"
          rx="10"
          fill="#fffbeb"
          stroke="#fde68a"
        />
        <text x="22" y="29" fontSize="11" fontWeight="800" fill="#92400e">
          {isHomodiatomic ? `Atom 1 (${centerEl.symbol}) [●]` : `Atom Pusat ${centerEl.symbol} [●]`}
        </text>
        <text x="22" y="46" fontSize="10.5" fontWeight="600" fill="#78350f">
          {centerEl.shells.length} petala | {centerEl.electronConfig} → {centerEl.ionConfig}
        </text>

        <rect
          x="558"
          y="10"
          width="210"
          height="48"
          rx="10"
          fill="#fff1f2"
          stroke="#fecdd3"
        />
        <text x="568" y="29" fontSize="11" fontWeight="800" fill="#9f1239">
          {isHomodiatomic
            ? `Atom 2 (${outerEl.symbol}) [×]`
            : `${outerCount}× Atom Luar ${outerEl.symbol} [×]`}
        </text>
        <text x="568" y="46" fontSize="10.5" fontWeight="600" fill="#881337">
          {outerEl.shells.length} petala | {outerEl.electronConfig} → {outerEl.ionConfig}
        </text>
      </g>

      {/* Lencana jenis ikatan di bawah */}
      <g>
        <rect
          x="235"
          y="278"
          width="310"
          height="26"
          rx="13"
          fill="#eef2ff"
          stroke="#c7d2fe"
        />
        <text x="390" y="295" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#3730a3">
          {result.bondTypeLabel} • {outerCount * bondOrder} pasang e⁻ dikongsi
        </text>
      </g>
    </svg>
  );
};

// =====================================================================
// 3. STRUKTUR LEWIS TITIK-SILANG & GARIS IKATAN (Rajah 5.8 KSSM)
// =====================================================================
export const LewisStructureSVG: React.FC<{ result: CovalentSynthesisResult }> = ({
  result,
}) => {
  const { centerEl, outerEl, outerCount, bondOrder, lewisLineFormula } = result;

  // Bina kedudukan untuk Struktur Lewis padat di bahagian kiri dan garis ikatan di kanan
  const cx = 195;
  const cy = 112;
  const gap = 88;

  type LewisNode = {
    x: number;
    y: number;
    symbol: string;
    kind: 'dot' | 'cross';
    loneCount: number;
    blocked: number[];
  };
  type LewisBond = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };

  const nodes: LewisNode[] = [];
  const bonds: LewisBond[] = [];

  if (outerCount === 1) {
    nodes.push(
      {
        x: cx - 44,
        y: cy,
        symbol: centerEl.symbol,
        kind: 'dot',
        loneCount: Math.max(0, centerEl.valenceElectrons - bondOrder),
        blocked: [0],
      },
      {
        x: cx + 44,
        y: cy,
        symbol: outerEl.symbol,
        kind: 'cross',
        loneCount: Math.max(0, outerEl.valenceElectrons - bondOrder),
        blocked: [180],
      }
    );
    bonds.push({ x1: cx - 44, y1: cy, x2: cx + 44, y2: cy });
  } else if (outerCount === 2) {
    nodes.push(
      {
        x: cx,
        y: cy,
        symbol: centerEl.symbol,
        kind: 'dot',
        loneCount: Math.max(0, centerEl.valenceElectrons - 2 * bondOrder),
        blocked: [0, 180],
      },
      {
        x: cx - gap,
        y: cy,
        symbol: outerEl.symbol,
        kind: 'cross',
        loneCount: Math.max(0, outerEl.valenceElectrons - bondOrder),
        blocked: [0],
      },
      {
        x: cx + gap,
        y: cy,
        symbol: outerEl.symbol,
        kind: 'cross',
        loneCount: Math.max(0, outerEl.valenceElectrons - bondOrder),
        blocked: [180],
      }
    );
    bonds.push(
      { x1: cx, y1: cy, x2: cx - gap, y2: cy },
      { x1: cx, y1: cy, x2: cx + gap, y2: cy }
    );
  } else if (outerCount === 3) {
    nodes.push(
      {
        x: cx,
        y: cy - 22,
        symbol: centerEl.symbol,
        kind: 'dot',
        loneCount: Math.max(0, centerEl.valenceElectrons - 3 * bondOrder),
        blocked: [0, 90, 180],
      },
      {
        x: cx - 80,
        y: cy - 22,
        symbol: outerEl.symbol,
        kind: 'cross',
        loneCount: Math.max(0, outerEl.valenceElectrons - bondOrder),
        blocked: [0],
      },
      {
        x: cx + 80,
        y: cy - 22,
        symbol: outerEl.symbol,
        kind: 'cross',
        loneCount: Math.max(0, outerEl.valenceElectrons - bondOrder),
        blocked: [180],
      },
      {
        x: cx,
        y: cy + 56,
        symbol: outerEl.symbol,
        kind: 'cross',
        loneCount: Math.max(0, outerEl.valenceElectrons - bondOrder),
        blocked: [270],
      }
    );
    bonds.push(
      { x1: cx, y1: cy - 22, x2: cx - 80, y2: cy - 22 },
      { x1: cx, y1: cy - 22, x2: cx + 80, y2: cy - 22 },
      { x1: cx, y1: cy - 22, x2: cx, y2: cy + 56 }
    );
  } else {
    const dy = 60;
    const dx = 76;
    const centerY = cy + 10;
    nodes.push(
      {
        x: cx,
        y: centerY,
        symbol: centerEl.symbol,
        kind: 'dot',
        loneCount: 0,
        blocked: [0, 90, 180, 270],
      },
      {
        x: cx,
        y: centerY - dy,
        symbol: outerEl.symbol,
        kind: 'cross',
        loneCount: Math.max(0, outerEl.valenceElectrons - bondOrder),
        blocked: [90],
      },
      {
        x: cx + dx,
        y: centerY,
        symbol: outerEl.symbol,
        kind: 'cross',
        loneCount: Math.max(0, outerEl.valenceElectrons - bondOrder),
        blocked: [180],
      },
      {
        x: cx,
        y: centerY + dy,
        symbol: outerEl.symbol,
        kind: 'cross',
        loneCount: Math.max(0, outerEl.valenceElectrons - bondOrder),
        blocked: [270],
      },
      {
        x: cx - dx,
        y: centerY,
        symbol: outerEl.symbol,
        kind: 'cross',
        loneCount: Math.max(0, outerEl.valenceElectrons - bondOrder),
        blocked: [0],
      }
    );
    bonds.push(
      { x1: cx, y1: centerY, x2: cx, y2: centerY - dy },
      { x1: cx, y1: centerY, x2: cx + dx, y2: centerY },
      { x1: cx, y1: centerY, x2: cx, y2: centerY + dy },
      { x1: cx, y1: centerY, x2: cx - dx, y2: centerY }
    );
  }

  return (
    <svg viewBox="0 0 680 225" className="w-full h-auto max-h-[225px] select-none">
      {/* Kad kiri: Struktur Lewis Titik & Silang */}
      <rect x="8" y="8" width="380" height="208" rx="12" fill="#fcfdff" stroke="#e2e8f0" />
      <text x="198" y="28" textAnchor="middle" fontSize="11" fontWeight="700" fill="#475569">
        Struktur Lewis (Elektron Valens Sahaja)
      </text>

      {bonds.map((b, i) =>
        renderSharedLensPairs(b.x1, b.y1, 44, b.x2, b.y2, 44, bondOrder, 3.6, `lw-b-${i}`)
      )}

      {nodes.map((n, i) => (
        <g key={`lw-n-${i}`}>
          <text
            x={n.x}
            y={n.y + 6}
            textAnchor="middle"
            fontSize="18"
            fontWeight="800"
            fill="#0f172a"
          >
            {n.symbol}
          </text>
          {renderUnsharedValenceElectrons(
            n.x,
            n.y,
            23,
            n.loneCount,
            n.kind,
            n.blocked,
            3.5,
            `lw-u-${i}`
          )}
        </g>
      ))}

      {/* Anak panah pemisah */}
      <text x="415" y="118" textAnchor="middle" fontSize="22" fontWeight="800" fill="#6366f1">
        ≡
      </text>

      {/* Kad kanan: Formula Struktur Garis Ikatan */}
      <rect x="442" y="8" width="230" height="208" rx="12" fill="#eef2ff" stroke="#c7d2fe" />
      <text x="557" y="28" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3730a3">
        Formula Struktur Garis Ikatan
      </text>
      <text
        x="557"
        y="108"
        textAnchor="middle"
        fontSize={lewisLineFormula.length > 9 ? 20 : 28}
        fontWeight="800"
        fill="#1e1b4b"
      >
        {lewisLineFormula}
      </text>
      <text x="557" y="142" textAnchor="middle" fontSize="11" fontWeight="600" fill="#4338ca">
        1 garis = 1 pasang e⁻ berkongsi
      </text>
      <text x="557" y="162" textAnchor="middle" fontSize="11" fontWeight="700" fill="#312e81">
        Formula Molekul: {result.formula}
      </text>
    </svg>
  );
};
