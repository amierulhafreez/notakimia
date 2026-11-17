import React from 'react';
import { ATOM_MAP, CarbonCompound } from '../data/carbonStructures';

interface CarbonStructureSVGProps {
  compound: CarbonCompound;
  compact?: boolean;
  highlightFunctionalGroup?: boolean;
}

export const CarbonStructureSVG: React.FC<CarbonStructureSVGProps> = ({
  compound,
  compact = false,
  highlightFunctionalGroup = true,
}) => {
  const stepX = compact ? 36 : 48;
  const stepY = compact ? 32 : 44;
  const padX = compact ? 24 : 34;
  const padY = compact ? 20 : 28;

  const xs = compound.nodes.map((n) => n.gx);
  const ys = compound.nodes.map((n) => n.gy);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const width = Math.max(120, (maxX - minX) * stepX + padX * 2);
  const height = Math.max(76, (maxY - minY) * stepY + padY * 2);

  const getPos = (idx: number) => {
    const n = compound.nodes[idx];
    return {
      x: (n.gx - minX) * stepX + padX,
      y: (n.gy - minY) * stepY + padY,
    };
  };

  const renderBondLines = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    order: 1 | 2 | 3,
    isFuncBond: boolean,
    key: number
  ) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;
    // Shorten line ends slightly so lines never cross through atom letters
    const trim = compact ? 10 : 13;
    const sx = x1 + (dx / len) * trim;
    const sy = y1 + (dy / len) * trim;
    const ex = x2 - (dx / len) * trim;
    const ey = y2 - (dy / len) * trim;

    // Perpendicular unit vector
    const px = -dy / len;
    const py = dx / len;

    const stroke = isFuncBond && highlightFunctionalGroup ? '#b45309' : '#1e293b';
    const w1 = compact ? 1.8 : 2.3;
    const wMulti = compact ? 1.5 : 2.0;

    if (order === 1) {
      return <line key={key} x1={sx} y1={sy} x2={ex} y2={ey} stroke={stroke} strokeWidth={w1} strokeLinecap="round" />;
    }

    if (order === 2) {
      const off = compact ? 2.6 : 3.4;
      return (
        <g key={key}>
          <line
            x1={sx + px * off}
            y1={sy + py * off}
            x2={ex + px * off}
            y2={ey + py * off}
            stroke={stroke}
            strokeWidth={wMulti}
            strokeLinecap="round"
          />
          <line
            x1={sx - px * off}
            y1={sy - py * off}
            x2={ex - px * off}
            y2={ey - py * off}
            stroke={stroke}
            strokeWidth={wMulti}
            strokeLinecap="round"
          />
        </g>
      );
    }

    const off = compact ? 3.8 : 4.8;
    return (
      <g key={key}>
        <line x1={sx} y1={sy} x2={ex} y2={ey} stroke={stroke} strokeWidth={wMulti} strokeLinecap="round" />
        <line
          x1={sx + px * off}
          y1={sy + py * off}
          x2={ex + px * off}
          y2={ey + py * off}
          stroke={stroke}
          strokeWidth={wMulti}
          strokeLinecap="round"
        />
        <line
          x1={sx - px * off}
          y1={sy - py * off}
          x2={ex - px * off}
          y2={ey - py * off}
          stroke={stroke}
          strokeWidth={wMulti}
          strokeLinecap="round"
        />
      </g>
    );
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={compact ? 'w-full h-auto max-h-24 select-none' : 'w-full h-auto max-h-44 select-none'}
      role="img"
      aria-label={`Formula struktur buku teks bagi ${compound.name}`}
    >
      {/* Subtle background highlight behind functional group atoms */}
      {highlightFunctionalGroup &&
        compound.nodes.map((node, idx) => {
          if (!node.isFunctional) return null;
          const pos = getPos(idx);
          return (
            <circle
              key={`fg-${idx}`}
              cx={pos.x}
              cy={pos.y}
              r={compact ? 11 : 15}
              fill="#fef3c7"
              stroke="#f59e0b"
              strokeWidth="1"
              strokeDasharray="2 2"
              opacity="0.85"
            />
          );
        })}

      {/* Covalent Bonds */}
      {compound.bonds.map((bond, idx) => {
        const p1 = getPos(bond.from);
        const p2 = getPos(bond.to);
        const isFunc = Boolean(
          compound.nodes[bond.from]?.isFunctional && compound.nodes[bond.to]?.isFunctional
        );
        return renderBondLines(p1.x, p1.y, p2.x, p2.y, bond.order, isFunc, idx);
      })}

      {/* Textbook Atom Letters */}
      {compound.nodes.map((node, idx) => {
        const pos = getPos(idx);
        const def = ATOM_MAP[node.element];
        const letterColor =
          node.element === 'C'
            ? '#0f172a'
            : node.element === 'H'
            ? '#334155'
            : def.fill;
        return (
          <g key={idx}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r={compact ? 8.5 : 11.5}
              fill={node.isFunctional && highlightFunctionalGroup ? '#fef3c7' : '#ffffff'}
              opacity="0.92"
            />
            <text
              x={pos.x}
              y={pos.y + (compact ? 4 : 5)}
              fontSize={compact ? 11.5 : 14.5}
              fontWeight="800"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fill={letterColor}
              textAnchor="middle"
            >
              {node.element}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
