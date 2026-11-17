import React from 'react';

export interface EnergyDiagramItem {
  title: string;
  subtitle?: string;
  reactants: string;
  products: string;
  deltaHText: string;
  /** Relative vertical drop height (0.35 .. 1.0) so comparisons visually show larger |ΔH| as a deeper step */
  relativeDrop?: number;
  accentColor?: string;
}

interface TextbookEnergyLevelSVGProps {
  items: EnergyDiagramItem[];
  columns?: 1 | 2 | 4;
}

export const TextbookEnergyLevelSVG: React.FC<TextbookEnergyLevelSVGProps> = ({
  items,
  columns = 2,
}) => {
  const cols = columns;
  const cellW = cols === 4 ? 255 : cols === 2 ? 340 : 360;
  const rows = Math.ceil(items.length / cols);
  const cellH = 176;
  const viewW = cols * cellW;
  const viewH = rows * cellH;

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      className={`w-full h-auto select-none ${rows === 1 && cols === 2 ? 'max-h-[215px]' : ''}`}
    >
      {items.map((item, idx) => {
        const colIdx = idx % cols;
        const rowIdx = Math.floor(idx / cols);
        const ox = colIdx * cellW;
        const oy = rowIdx * cellH;

        const accent = item.accentColor ?? '#0284c7';
        const axisX = ox + 38;
        const axisTop = oy + 36;
        const axisBottom = oy + 162;

        // Upper shelf (Bahan tindak balas): left x1..x2
        const topY = oy + 62;
        const leftShelfX1 = axisX + 12;
        const leftShelfX2 = ox + cellW * 0.48;

        // Lower shelf (Hasil tindak balas): starts at arrowX, wide enough that label sits cleanly right of arrowhead
        const minDrop = 38;
        const maxDrop = 84;
        const frac = Math.max(0.35, Math.min(1, item.relativeDrop ?? 0.72));
        const bottomY = topY + minDrop + frac * (maxDrop - minDrop);
        const rightShelfX1 = leftShelfX2;
        const rightShelfX2 = ox + cellW - 14;

        const arrowX = leftShelfX2;
        const midArrowY = (topY + bottomY) / 2;

        return (
          <g key={`${item.title}-${idx}`}>
            {/* Subtle vertical divider between columns */}
            {colIdx > 0 && (
              <line
                x1={ox}
                y1={oy + 12}
                x2={ox}
                y2={oy + cellH - 10}
                stroke="#e2e8f0"
                strokeDasharray="4 4"
              />
            )}

            {/* Title at top of cell */}
            <text
              x={ox + cellW / 2}
              y={oy + 15}
              fontSize={cols === 4 ? '10.5' : '11.5'}
              fontWeight="800"
              fill="#1e293b"
              textAnchor="middle"
            >
              {item.title}
            </text>
            {item.subtitle && (
              <text
                x={ox + cellW / 2}
                y={oy + 27}
                fontSize="9"
                fontWeight="600"
                fill="#64748b"
                textAnchor="middle"
              >
                {item.subtitle}
              </text>
            )}

            {/* Vertical "Tenaga" Axis (Textbook Rajah 3.1: single upward arrow, NO horizontal axis) */}
            <line
              x1={axisX}
              y1={axisBottom}
              x2={axisX}
              y2={axisTop + 4}
              stroke="#0f172a"
              strokeWidth="1.8"
            />
            <polygon
              points={`${axisX},${axisTop - 2} ${axisX - 4},${axisTop + 7} ${axisX + 4},${axisTop + 7}`}
              fill="#0f172a"
            />
            <text
              x={axisX}
              y={axisTop - 7}
              fontSize="10.5"
              fontWeight="800"
              fill="#0f172a"
              textAnchor="middle"
            >
              Tenaga
            </text>

            {/* Reactants Horizontal Line + Label ABOVE line */}
            <line
              x1={leftShelfX1}
              y1={topY}
              x2={leftShelfX2}
              y2={topY}
              stroke={accent}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <text
              x={(leftShelfX1 + leftShelfX2) / 2}
              y={topY - 7}
              fontSize={cols === 4 ? '9.2' : '10.5'}
              fontWeight="800"
              fill="#b91c1c"
              textAnchor="middle"
            >
              {item.reactants}
            </text>

            {/* Vertical Downward Arrow connecting Reactant Shelf right tip to Product Shelf left tip */}
            <line
              x1={arrowX}
              y1={topY + 2}
              x2={arrowX}
              y2={bottomY - 7}
              stroke="#15803d"
              strokeWidth="2.1"
            />
            <polygon
              points={`${arrowX},${bottomY - 1} ${arrowX - 4},${bottomY - 9} ${arrowX + 4},${bottomY - 9}`}
              fill="#15803d"
            />

            {/* ΔH Label directly to the right of vertical arrow */}
            <text
              x={arrowX + 7}
              y={midArrowY - 4}
              fontSize={cols === 4 ? '9.8' : '10.8'}
              fontWeight="800"
              fill="#15803d"
            >
              {item.deltaHText}
            </text>

            {/* Products Horizontal Line + Label ABOVE line (exact Rajah 3.1 convention) */}
            <line
              x1={rightShelfX1}
              y1={bottomY}
              x2={rightShelfX2}
              y2={bottomY}
              stroke={accent}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <text
              x={(rightShelfX1 + 10 + rightShelfX2) / 2}
              y={bottomY - 7}
              fontSize={cols === 4 ? '9.2' : '10.2'}
              fontWeight="800"
              fill="#b91c1c"
              textAnchor="middle"
            >
              {item.products}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
