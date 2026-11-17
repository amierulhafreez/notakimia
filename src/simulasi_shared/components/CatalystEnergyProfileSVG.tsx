import React from 'react';
import { CATALYST_SET_MAP, CatalystSetId } from '../data/rateOfReactionCatalyst';

interface CatalystEnergyProfileSVGProps {
  activeCatalystId: CatalystSetId;
}

const REACTANT_Y = 86;
const PRODUCT_Y = 122;
const HIGH_PEAK_Y = 22; // Eₐ tanpa mangkin (ketinggian = 64 px)

export const CatalystEnergyProfileSVG: React.FC<CatalystEnergyProfileSVGProps> = ({
  activeCatalystId,
}) => {
  const isCatalyzed = activeCatalystId !== 'none';
  const displayedCatalyst = CATALYST_SET_MAP[isCatalyzed ? activeCatalystId : 'mno2'];
  const lowPeakY = +(REACTANT_Y - (REACTANT_Y - HIGH_PEAK_Y) * displayedCatalyst.eaRatio).toFixed(1);

  // Lintasan lengkung eksotermik: mula (74, 86) -> puncak (140, peakY) -> aras hasil (212, 122)
  const buildPath = (peakY: number) =>
    `M 44 ${REACTANT_Y} L 74 ${REACTANT_Y} C 96 ${REACTANT_Y}, 110 ${peakY}, 140 ${peakY} C 168 ${peakY}, 182 ${PRODUCT_Y}, 212 ${PRODUCT_Y} L 284 ${PRODUCT_Y}`;

  const eaMidY = (HIGH_PEAK_Y + REACTANT_Y) / 2;
  const eaPrimeMidY = (lowPeakY + REACTANT_Y) / 2;

  return (
    <div className="space-y-1">
      <svg
        viewBox="0 0 320 156"
        className="w-full h-auto bg-slate-50/60 rounded-lg border border-slate-200 select-none"
      >
        <defs>
          <marker id="arrow-dark" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#334155" />
          </marker>
          <marker id="arrow-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563eb" />
          </marker>
          <marker id="arrow-cat" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={displayedCatalyst.strokeHex} />
          </marker>
        </defs>

        {/* Paksi Tenaga (Y) & Lintasan tindak balas (X) — Satu Paksi */}
        <line
          x1="34"
          y1="138"
          x2="34"
          y2="14"
          stroke="#334155"
          strokeWidth="1.5"
          markerEnd="url(#arrow-dark)"
        />
        <line
          x1="34"
          y1="138"
          x2="306"
          y2="138"
          stroke="#334155"
          strokeWidth="1.5"
          markerEnd="url(#arrow-dark)"
        />
        <text x="10" y="12" fontSize="7.4" fontWeight="bold" fill="#1e293b">
          Tenaga
        </text>
        <text x="170" y="150.5" fontSize="7.4" fontWeight="bold" fill="#1e293b" textAnchor="middle">
          Lintasan tindak balas
        </text>

        {/* Garis rujukan mendatar aras bahan & puncak Eₐ */}
        <line
          x1="74"
          y1={REACTANT_Y}
          x2="178"
          y2={REACTANT_Y}
          stroke="#94a3b8"
          strokeWidth="1"
          strokeDasharray="3 2.5"
        />
        <line
          x1="120"
          y1={HIGH_PEAK_Y}
          x2="144"
          y2={HIGH_PEAK_Y}
          stroke="#93c5fd"
          strokeWidth="1"
          strokeDasharray="2.5 2.5"
        />

        {/* Lengkung 1: Tanpa Mangkin (Eₐ tinggi) */}
        <path
          d={buildPath(HIGH_PEAK_Y)}
          fill="none"
          stroke="#2563eb"
          strokeWidth={isCatalyzed ? '1.8' : '2.6'}
          strokeOpacity={isCatalyzed ? 0.72 : 1}
          strokeLinecap="round"
        />

        {/* Lengkung 2: Dengan Mangkin (Eₐ' lebih rendah — lintasan alternatif) */}
        <path
          d={buildPath(lowPeakY)}
          fill="none"
          stroke={displayedCatalyst.strokeHex}
          strokeWidth={isCatalyzed ? '2.6' : '1.7'}
          strokeDasharray={isCatalyzed ? undefined : '4 3'}
          strokeOpacity={isCatalyzed ? 1 : 0.75}
          strokeLinecap="round"
        />

        {/* Anak panah Eₐ (Tanpa mangkin) di x = 118 (dalam kawasan lengkung) */}
        <line
          x1="118"
          y1={REACTANT_Y - 2}
          x2="118"
          y2={HIGH_PEAK_Y + 3}
          stroke="#2563eb"
          strokeWidth="1.2"
          markerStart="url(#arrow-blue)"
          markerEnd="url(#arrow-blue)"
        />
        <text x="113" y={eaMidY + 2} fontSize="8" fontWeight="bold" fill="#1d4ed8" textAnchor="end">
          Eₐ
        </text>

        {/* Anak panah Eₐ' (Dengan mangkin) di puncak x = 140 */}
        <line
          x1="140"
          y1={REACTANT_Y - 2}
          x2="140"
          y2={lowPeakY + 3}
          stroke={displayedCatalyst.strokeHex}
          strokeWidth="1.2"
          markerStart="url(#arrow-cat)"
          markerEnd="url(#arrow-cat)"
        />
        <text
          x="145"
          y={eaPrimeMidY + 3}
          fontSize="8"
          fontWeight="bold"
          fill={displayedCatalyst.strokeHex}
          textAnchor="start"
        >
          Eₐ&apos;
        </text>

        {/* Label Bahan Tindak Balas & Hasil Tindak Balas */}
        <text x="59" y={REACTANT_Y - 14} fontSize="6.7" fontWeight="bold" fill="#334155" textAnchor="middle">
          Bahan
        </text>
        <text x="59" y={REACTANT_Y - 5} fontSize="6.7" fontWeight="bold" fill="#0369a1" textAnchor="middle">
          2H₂O₂(ak)
        </text>

        <text x="249" y={PRODUCT_Y - 13} fontSize="6.7" fontWeight="bold" fill="#334155" textAnchor="middle">
          Hasil tindak balas
        </text>
        <text x="249" y={PRODUCT_Y - 4} fontSize="6.6" fontWeight="bold" fill="#0369a1" textAnchor="middle">
          2H₂O(ce) + O₂(g)
        </text>

        {/* Callout label Tanpa mangkin vs Dengan mangkin */}
        <line x1="158" y1="36" x2="194" y2="28" stroke="#2563eb" strokeWidth="1" />
        <text x="197" y="30" fontSize="6.9" fontWeight="bold" fill="#1d4ed8">
          Tanpa mangkin (Eₐ tinggi)
        </text>

        <line
          x1="168"
          y1={lowPeakY + 19}
          x2="199"
          y2={lowPeakY + 12}
          stroke={displayedCatalyst.strokeHex}
          strokeWidth="1"
        />
        <text x="202" y={lowPeakY + 14} fontSize="6.9" fontWeight="bold" fill={displayedCatalyst.strokeHex}>
          Dengan {displayedCatalyst.formula} (Eₐ&apos; rendah)
        </text>
      </svg>

      {/* Penunjuk Rajah 7.26 (m.s. 247) */}
      <div className="flex flex-wrap items-center justify-between gap-1 text-[9.8px] text-slate-600 px-0.5 leading-snug">
        <span>
          <strong className="text-blue-700">Eₐ</strong> = Tenaga pengaktifan asal
        </span>
        <span>
          <strong style={{ color: displayedCatalyst.strokeHex }}>Eₐ&apos;</strong> = Tenaga pengaktifan dengan{' '}
          {displayedCatalyst.formula} (&lt; Eₐ)
        </span>
      </div>
    </div>
  );
};
