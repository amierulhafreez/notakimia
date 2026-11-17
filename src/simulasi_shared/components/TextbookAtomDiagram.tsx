import React from 'react';

export type AtomDiagramVariant = 'electron-arrangement' | 'atomic-structure';

interface TextbookAtomDiagramProps {
  symbol: string;
  shells: number[];
  protonNumber: number;
  neutronNumber?: number;
  variant?: AtomDiagramVariant;
  accentColor?: string;
  nucleusFill?: string;
  className?: string;
}

interface DotCoord {
  x: number;
  y: number;
}

/**
 * Menjana koordinat titik elektron mengikut konvensyen Buku Teks Kimia Tingkatan 4 KSSM
 * (Rajah 2.12–2.14 m.s. 35, Rajah 4.9 m.s. 91, Rajah 4.11 m.s. 95):
 * - Petala dengan 2 elektron: Atas (-90°) & Bawah (+90°).
 * - Petala dengan 3–8 elektron: diisi berpasangan pada 4 arah kardinal (Atas, Kanan, Bawah, Kiri).
 * - Petala dengan >8 elektron (cth. 18 atau 32): diagihkan sekata mengelilingi lilitan petala.
 */
export function computeShellElectronCoords(
  cx: number,
  cy: number,
  radius: number,
  count: number
): DotCoord[] {
  if (count <= 0) return [];

  if (count === 1) {
    // 1 elektron tunggal pada arah atas (-90°)
    return [{ x: cx, y: cy - radius }];
  }

  if (count === 2) {
    // 2 elektron bertentangan atas & bawah (12 & 6 o'clock) seperti Rajah 2.12–2.14, 4.9 & 4.11
    return [
      { x: cx, y: cy - radius },
      { x: cx, y: cy + radius },
    ];
  }

  if (count <= 8) {
    // 4 arah kardinal mengikut pusingan jam: Atas, Kanan, Bawah, Kiri
    const cardinalAngles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];
    const perCardinal = [0, 0, 0, 0];

    if (count === 3) {
      // Seperti Rajah 2.13 (Aluminium 2.8.3): 3 titik pada arah kardinal
      perCardinal[0] = 1;
      perCardinal[1] = 1;
      perCardinal[3] = 1;
    } else if (count === 4) {
      perCardinal[0] = 1;
      perCardinal[1] = 1;
      perCardinal[2] = 1;
      perCardinal[3] = 1;
    } else if (count === 5) {
      perCardinal[0] = 2;
      perCardinal[1] = 1;
      perCardinal[2] = 1;
      perCardinal[3] = 1;
    } else if (count === 6) {
      perCardinal[0] = 2;
      perCardinal[1] = 1;
      perCardinal[2] = 2;
      perCardinal[3] = 1;
    } else if (count === 7) {
      // Seperti Rajah 4.11 (Cl, Br, I): 3 pasangan + 1 tunggal
      perCardinal[0] = 2;
      perCardinal[1] = 2;
      perCardinal[2] = 2;
      perCardinal[3] = 1;
    } else {
      // 8 elektron: 4 pasangan penuh (oktet)
      perCardinal[0] = 2;
      perCardinal[1] = 2;
      perCardinal[2] = 2;
      perCardinal[3] = 2;
    }

    const coords: DotCoord[] = [];
    // Jarak tangen malar ~7.2 unit supaya pasangan tidak bertindih di mana-mana petala
    const pairHalfDelta = Math.min(0.24, 3.6 / radius);

    perCardinal.forEach((slotCount, idx) => {
      const baseAngle = cardinalAngles[idx];
      if (slotCount === 1) {
        coords.push({
          x: cx + radius * Math.cos(baseAngle),
          y: cy + radius * Math.sin(baseAngle),
        });
      } else if (slotCount === 2) {
        coords.push({
          x: cx + radius * Math.cos(baseAngle - pairHalfDelta),
          y: cy + radius * Math.sin(baseAngle - pairHalfDelta),
        });
        coords.push({
          x: cx + radius * Math.cos(baseAngle + pairHalfDelta),
          y: cy + radius * Math.sin(baseAngle + pairHalfDelta),
        });
      }
    });

    return coords;
  }

  // Petala 18 atau 32 elektron (Rajah 4.11 Br & I): taburan sekata 360° bermula dari puncak
  const coords: DotCoord[] = [];
  for (let i = 0; i < count; i++) {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / count;
    coords.push({
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    });
  }
  return coords;
}

/**
 * Rajah piawai KSSM untuk Susunan Elektron (Rajah 2.13, 4.9, 4.11)
 * atau Struktur Atom dengan p & n di dalam nukleus (Rajah 2.14).
 */
export const TextbookAtomDiagram: React.FC<TextbookAtomDiagramProps> = ({
  symbol,
  shells,
  protonNumber,
  neutronNumber,
  variant = 'electron-arrangement',
  accentColor = '#ea580c',
  nucleusFill = '#bbf7d0',
  className = 'w-28 h-28',
}) => {
  const cx = 100;
  const cy = 100;
  const showNucleonCounts = variant === 'atomic-structure' && neutronNumber !== undefined;
  const nucleusR = showNucleonCounts ? 17.5 : 14.5;
  // Langkah jejari tetap agar perbandingan saiz atom (2 petala vs 6 petala) berkadaran tepat seperti Rajah 4.9 & 4.11
  const firstShellR = nucleusR + 12.5;
  const shellStep = 11.4;
  const dotRadius = shells.length >= 5 ? 2.55 : 2.9;

  return (
    <svg
      viewBox="0 0 200 200"
      className={`shrink-0 select-none ${className}`}
      role="img"
      aria-label={`${
        showNucleonCounts ? 'Rajah struktur atom' : 'Rajah susunan elektron'
      } ${symbol} (${shells.join('.')})`}
    >
      {/* Petala sepusat (garisan penuh mengikut gaya buku teks KSSM) */}
      {shells.map((elecCount, sIdx) => {
        const radius = firstShellR + sIdx * shellStep;
        const isValence = sIdx === shells.length - 1;
        const coords = computeShellElectronCoords(cx, cy, radius, elecCount);

        return (
          <g key={sIdx}>
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke={isValence ? '#334155' : '#64748b'}
              strokeWidth={isValence ? '1.35' : '1.05'}
            />
            {coords.map((pt, dIdx) => (
              <circle
                key={dIdx}
                cx={pt.x}
                cy={pt.y}
                r={dotRadius}
                fill={accentColor}
                stroke="#7c2d12"
                strokeWidth="0.7"
              >
                <title>{`Petala ${sIdx + 1}: ${elecCount} elektron`}</title>
              </circle>
            ))}
          </g>
        );
      })}

      {/* Nukleus pusat */}
      <circle
        cx={cx}
        cy={cy}
        r={nucleusR}
        fill={nucleusFill}
        stroke="#1e293b"
        strokeWidth="1.4"
      />
      {showNucleonCounts ? (
        <>
          <text
            x={cx}
            y={cy - 2}
            textAnchor="middle"
            fontSize="8.8"
            fontWeight="800"
            fill="#0f172a"
          >
            {protonNumber} p
          </text>
          <text
            x={cx}
            y={cy + 8.5}
            textAnchor="middle"
            fontSize="8.8"
            fontWeight="800"
            fill="#0f172a"
          >
            {neutronNumber} n
          </text>
        </>
      ) : (
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fontSize="12"
          fontWeight="800"
          fill="#0f172a"
        >
          {symbol}
        </text>
      )}
    </svg>
  );
};

interface ElectronShellBreakdownProps {
  shells: number[];
  protonNumber: number;
  compact?: boolean;
}

/**
 * Paparan ringkas dan jelas untuk bilangan petala, jumlah elektron, dan elektron setiap petala.
 */
export const ElectronShellBreakdown: React.FC<ElectronShellBreakdownProps> = ({
  shells,
  protonNumber,
  compact = false,
}) => {
  return (
    <div className="space-y-1">
      <div className="flex flex-wrap items-center justify-between gap-1 text-[10px]">
        <span className="font-extrabold text-slate-800 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
          {shells.length} Petala
        </span>
        <span className="font-mono font-extrabold text-indigo-800 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded">
          {protonNumber} e⁻ ({shells.join('.')})
        </span>
      </div>
      {!compact && (
        <div className="flex flex-wrap gap-1">
          {shells.map((count, i) => {
            const isValence = i === shells.length - 1;
            return (
              <span
                key={i}
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                  isValence
                    ? 'bg-orange-50 text-orange-800 border-orange-300'
                    : 'bg-white text-slate-600 border-slate-200'
                }`}
                title={isValence ? `Petala valens (${count} elektron)` : `Petala ${i + 1}`}
              >
                P{i + 1}: {count}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};
