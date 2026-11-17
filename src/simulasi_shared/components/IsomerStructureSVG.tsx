import React from 'react';
import {
  BuilderState,
  BranchSize,
  EvaluatedMolecule,
  PlacedBranch,
} from '../data/isomerEngine';

export type StructureDisplayMode = 'ringkas' | 'teks';
export type ActivePlacementTool = 'move' | 'ch3' | 'c2h5' | 'oh' | 'cc';
export type DraggingItem =
  | { kind: 'branch'; branchId: string }
  | { kind: 'oh' }
  | { kind: 'cc' }
  | null;

interface IsomerStructureSVGProps {
  state: BuilderState;
  evaluated: EvaluatedMolecule;
  displayMode: StructureDisplayMode;
  activeTool: ActivePlacementTool;
  selectedBranchId: string | null;
  draggingItem?: DraggingItem;
  interactive?: boolean;
  onSelectBranch?: (branchId: string | null) => void;
  onSetDraggingItem?: (item: DraggingItem) => void;
  onAddOrMoveBranchToSlot?: (slotIndex: number, size?: BranchSize) => void;
  onRemoveBranch?: (branchId: string) => void;
  onMoveDoubleBond?: (bondIdx: number) => void;
  onMoveOh?: (slotIndex: number) => void;
  onDropPayloadOnCarbon?: (slotIndex: number, payload: string) => void;
  onDropPayloadOnBond?: (bondIdx: number, payload: string) => void;
}

const SUB_DIGITS = ['₀', '₁', '₂', '₃', '₄'];

function formatCH(hCount: number): string {
  if (hCount <= 0) return 'C';
  if (hCount === 1) return 'CH';
  return `CH${SUB_DIGITS[hCount] ?? hCount}`;
}

export const IsomerStructureSVG: React.FC<IsomerStructureSVGProps> = ({
  state,
  evaluated,
  displayMode,
  activeTool,
  selectedBranchId,
  draggingItem = null,
  interactive = true,
  onSelectBranch,
  onSetDraggingItem,
  onAddOrMoveBranchToSlot,
  onRemoveBranch,
  onMoveDoubleBond,
  onMoveOh,
  onDropPayloadOnCarbon,
  onDropPayloadOnBond,
}) => {
  const L = state.mainChainLen;
  const isCompact = displayMode === 'ringkas';

  // Determine vertical reach needed for branches / -OH / H
  let hasTopEthyl = false;
  let hasBottomEthyl = false;
  let hasTopItem = false;
  let hasBottomItem = false;

  const branchesBySlot: PlacedBranch[][] = Array.from({ length: L }, () => []);
  for (const br of state.branches) {
    if (br.slotIndex >= 0 && br.slotIndex < L) {
      branchesBySlot[br.slotIndex].push(br);
    }
  }

  for (let i = 0; i < L; i++) {
    const brs = branchesBySlot[i];
    if (brs.length >= 1) {
      hasTopItem = true;
      if (brs[0].size === 2) hasTopEthyl = true;
    }
    if (brs.length >= 2) {
      hasBottomItem = true;
      if (brs[1].size === 2) hasBottomEthyl = true;
    }
    if (state.series === 'alkohol' && state.ohSlotIdx === i) {
      if (brs.length === 0) hasTopItem = true;
      else hasBottomItem = true;
    }
  }

  const stepX = isCompact ? (L >= 6 ? 78 : 88) : L >= 6 ? 74 : 82;
  const sideHPad = isCompact ? 58 : 74;
  const viewW = Math.max(460, (L - 1) * stepX + sideHPad * 2);

  const topReach = isCompact
    ? hasTopEthyl
      ? 112
      : 78
    : hasTopEthyl
      ? 148
      : hasTopItem
        ? 104
        : 66;
  const bottomReach = isCompact
    ? hasBottomEthyl
      ? 112
      : 78
    : hasBottomEthyl
      ? 148
      : hasBottomItem
        ? 104
        : 66;

  const viewH = topReach + bottomReach;
  const midY = topReach;
  const startX = (viewW - (L - 1) * stepX) / 2;
  const getX = (i: number) => startX + i * stepX;

  const canAcceptBranchOnSlot = (slotIdx: number) => {
    const used = evaluated.valenceBySlot[slotIdx] ?? 0;
    return used < 4;
  };

  const canPutDoubleBondAt = (bondIdx: number) => {
    if (state.series !== 'alkena') return false;
    if (state.doubleBondIdx === bondIdx) return true;
    // Check if adding +1 valence to bondIdx and bondIdx+1 (after removing current double bond) stays <= 4
    const curDb = state.doubleBondIdx;
    const freeLeft =
      4 -
      ((evaluated.valenceBySlot[bondIdx] ?? 0) -
        (curDb !== null && (curDb === bondIdx || curDb === bondIdx - 1) ? 1 : 0));
    const freeRight =
      4 -
      ((evaluated.valenceBySlot[bondIdx + 1] ?? 0) -
        (curDb !== null && (curDb === bondIdx + 1 || curDb === bondIdx) ? 1 : 0));
    return freeLeft >= 1 && freeRight >= 1;
  };

  const canMoveOhToSlot = (slotIdx: number) => {
    if (state.series !== 'alkohol') return false;
    if (state.ohSlotIdx === slotIdx) return true;
    return (evaluated.valenceBySlot[slotIdx] ?? 0) < 4;
  };

  const renderBondSegment = (i: number) => {
    const x1 = getX(i);
    const x2 = getX(i + 1);
    const isDouble = state.series === 'alkena' && state.doubleBondIdx === i;
    const isAlkena = state.series === 'alkena';
    const validTarget = canPutDoubleBondAt(i);
    const trim = isCompact ? 23 : 16;
    const sx = x1 + trim;
    const ex = x2 - trim;
    const mx = (x1 + x2) / 2;

    return (
      <g
        key={`bond-${i}`}
        data-testid={`backbone-bond-${i}`}
        className={interactive && isAlkena && validTarget ? 'cursor-pointer group' : undefined}
        onClick={(e) => {
          if (!interactive || !isAlkena || !validTarget) return;
          e.stopPropagation();
          onMoveDoubleBond?.(i);
        }}
        onPointerDown={(e) => {
          if (!interactive || !isAlkena || !isDouble) return;
          e.stopPropagation();
          onSetDraggingItem?.({ kind: 'cc' });
        }}
        onPointerUp={(e) => {
          if (!interactive || !isAlkena || !validTarget || draggingItem?.kind !== 'cc') return;
          e.stopPropagation();
          onMoveDoubleBond?.(i);
          onSetDraggingItem?.(null);
        }}
        onDragOver={(e) => {
          if (!interactive || !isAlkena || !validTarget) return;
          e.preventDefault();
        }}
        onDrop={(e) => {
          if (!interactive || !isAlkena || !validTarget) return;
          e.preventDefault();
          e.stopPropagation();
          const payload = e.dataTransfer.getData('text/isomer-item');
          if (payload) onDropPayloadOnBond?.(i, payload);
        }}
      >
        {/* Invisible wider hit zone for easy clicking/dropping */}
        {interactive && isAlkena && (
          <rect
            x={sx - 6}
            y={midY - 22}
            width={Math.max(12, ex - sx + 12)}
            height={44}
            rx={8}
            fill="transparent"
            className={validTarget ? 'group-hover:fill-sky-100/60' : undefined}
          />
        )}

        {isDouble ? (
          <>
            <line x1={sx} y1={midY - 4} x2={ex} y2={midY - 4} stroke="#0284c7" strokeWidth={3.2} strokeLinecap="round" />
            <line x1={sx} y1={midY + 4} x2={ex} y2={midY + 4} stroke="#0284c7" strokeWidth={3.2} strokeLinecap="round" />
            {interactive && (
              <g transform={`translate(${mx}, ${midY - 16})`}>
                <rect x="-12" y="-7" width="24" height="13" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
                <text y="2.5" fontSize="8.5" fontWeight="800" fill="#0369a1" textAnchor="middle">
                  C═C
                </text>
              </g>
            )}
          </>
        ) : (
          <>
            <line x1={sx} y1={midY} x2={ex} y2={midY} stroke="#475569" strokeWidth={2.5} strokeLinecap="round" />
            {interactive && isAlkena && validTarget && (
              <text
                x={mx}
                y={midY - 8}
                fontSize="8"
                fontWeight="700"
                fill="#0284c7"
                textAnchor="middle"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                klik ═
              </text>
            )}
          </>
        )}
      </g>
    );
  };

  const renderBranchVisual = (br: PlacedBranch, x: number, dir: -1 | 1) => {
    const isSelected = selectedBranchId === br.id;
    const strokeCol = isSelected ? '#7c3aed' : '#4f46e5';

    if (isCompact) {
      const y1 = midY + dir * 23;
      const nodeY = midY + dir * 56;
      return (
        <g
          key={br.id}
          data-testid={`placed-branch-${br.id}`}
          className={interactive ? 'cursor-grab active:cursor-grabbing' : undefined}
          onPointerDown={(e) => {
            if (!interactive) return;
            e.stopPropagation();
            onSetDraggingItem?.({ kind: 'branch', branchId: br.id });
          }}
          onClick={(e) => {
            if (!interactive) return;
            e.stopPropagation();
            if (isSelected) {
              onSelectBranch?.(null);
            } else {
              onSelectBranch?.(br.id);
            }
          }}
        >
          <line x1={x} y1={y1} x2={x} y2={nodeY - dir * 16} stroke={strokeCol} strokeWidth={2.4} strokeLinecap="round" />
          {br.size === 1 ? (
            <g transform={`translate(${x}, ${nodeY})`}>
              <rect
                x="-20"
                y="-15"
                width="40"
                height="30"
                rx="10"
                fill={isSelected ? '#ede9fe' : '#eef2ff'}
                stroke={strokeCol}
                strokeWidth={isSelected ? 2.4 : 1.8}
              />
              <text y="4" fontSize="11.5" fontWeight="800" fill="#312e81" textAnchor="middle">
                CH₃
              </text>
            </g>
          ) : (
            <>
              <g transform={`translate(${x}, ${nodeY})`}>
                <rect
                  x="-21"
                  y="-14"
                  width="42"
                  height="28"
                  rx="9"
                  fill={isSelected ? '#ede9fe' : '#eef2ff'}
                  stroke={strokeCol}
                  strokeWidth={isSelected ? 2.4 : 1.8}
                />
                <text y="4" fontSize="11" fontWeight="800" fill="#312e81" textAnchor="middle">
                  CH₂
                </text>
              </g>
              <line
                x1={x}
                y1={nodeY + dir * 14}
                x2={x}
                y2={nodeY + dir * 26}
                stroke={strokeCol}
                strokeWidth={2.2}
              />
              <g transform={`translate(${x}, ${nodeY + dir * 39})`}>
                <rect
                  x="-20"
                  y="-13"
                  width="40"
                  height="26"
                  rx="9"
                  fill={isSelected ? '#ede9fe' : '#eef2ff'}
                  stroke={strokeCol}
                  strokeWidth={isSelected ? 2.4 : 1.8}
                />
                <text y="4" fontSize="11" fontWeight="800" fill="#312e81" textAnchor="middle">
                  CH₃
                </text>
              </g>
            </>
          )}

          {interactive && (
            <g
              transform={`translate(${x + 19}, ${nodeY - 13})`}
              data-testid={`remove-branch-${br.id}`}
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveBranch?.(br.id);
              }}
            >
              <circle r="7.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.2" />
              <text y="3" fontSize="9.5" fontWeight="800" fill="#ffffff" textAnchor="middle">
                ×
              </text>
            </g>
          )}
        </g>
      );
    }

    // Expanded Textbook Mode (all C and H atoms drawn neatly)
    const c1Y = midY + dir * 48;
    const hVertY = c1Y + dir * 36;
    return (
      <g
        key={br.id}
        data-testid={`placed-branch-${br.id}`}
        className={interactive ? 'cursor-grab active:cursor-grabbing' : undefined}
        onPointerDown={(e) => {
          if (!interactive) return;
          e.stopPropagation();
          onSetDraggingItem?.({ kind: 'branch', branchId: br.id });
        }}
        onClick={(e) => {
          if (!interactive) return;
          e.stopPropagation();
          onSelectBranch?.(isSelected ? null : br.id);
        }}
      >
        {isSelected && (
          <rect
            x={x - 32}
            y={Math.min(midY + dir * 22, (br.size === 2 ? hVertY + dir * 40 : hVertY) - 12)}
            width="64"
            height={br.size === 2 ? 108 : 74}
            rx="10"
            fill="rgba(124, 58, 237, 0.08)"
            stroke="#7c3aed"
            strokeDasharray="4 2"
          />
        )}
        {/* Bond backbone C -> branch C1 */}
        <line x1={x} y1={midY + dir * 13} x2={x} y2={c1Y - dir * 12} stroke="#312e81" strokeWidth={2} />
        <text x={x} y={c1Y + 4.5} fontSize="13.5" fontWeight="800" fill="#312e81" textAnchor="middle">
          C
        </text>
        {/* Left & Right H on C1 */}
        <line x1={x - 10} y1={c1Y} x2={x - 19} y2={c1Y} stroke="#64748b" strokeWidth={1.6} />
        <text x={x - 25} y={c1Y + 4} fontSize="11.5" fontWeight="700" fill="#475569" textAnchor="middle">
          H
        </text>
        <line x1={x + 10} y1={c1Y} x2={x + 19} y2={c1Y} stroke="#64748b" strokeWidth={1.6} />
        <text x={x + 25} y={c1Y + 4} fontSize="11.5" fontWeight="700" fill="#475569" textAnchor="middle">
          H
        </text>

        {br.size === 1 ? (
          <>
            <line x1={x} y1={c1Y + dir * 12} x2={x} y2={hVertY - dir * 10} stroke="#64748b" strokeWidth={1.6} />
            <text x={x} y={hVertY + 4} fontSize="11.5" fontWeight="700" fill="#475569" textAnchor="middle">
              H
            </text>
          </>
        ) : (
          (() => {
            const c2Y = c1Y + dir * 44;
            const hTop2Y = c2Y + dir * 34;
            return (
              <>
                <line x1={x} y1={c1Y + dir * 12} x2={x} y2={c2Y - dir * 12} stroke="#312e81" strokeWidth={2} />
                <text x={x} y={c2Y + 4.5} fontSize="13.5" fontWeight="800" fill="#312e81" textAnchor="middle">
                  C
                </text>
                <line x1={x - 10} y1={c2Y} x2={x - 19} y2={c2Y} stroke="#64748b" strokeWidth={1.6} />
                <text x={x - 25} y={c2Y + 4} fontSize="11.5" fontWeight="700" fill="#475569" textAnchor="middle">
                  H
                </text>
                <line x1={x + 10} y1={c2Y} x2={x + 19} y2={c2Y} stroke="#64748b" strokeWidth={1.6} />
                <text x={x + 25} y={c2Y + 4} fontSize="11.5" fontWeight="700" fill="#475569" textAnchor="middle">
                  H
                </text>
                <line x1={x} y1={c2Y + dir * 12} x2={x} y2={hTop2Y - dir * 10} stroke="#64748b" strokeWidth={1.6} />
                <text x={x} y={hTop2Y + 4} fontSize="11.5" fontWeight="700" fill="#475569" textAnchor="middle">
                  H
                </text>
              </>
            );
          })()
        )}

        {interactive && (
          <g
            transform={`translate(${x + 28}, ${c1Y - 14})`}
            data-testid={`remove-branch-${br.id}`}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveBranch?.(br.id);
            }}
          >
            <circle r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="1.2" />
            <text y="3" fontSize="9" fontWeight="800" fill="#ffffff" textAnchor="middle">
              ×
            </text>
          </g>
        )}
      </g>
    );
  };

  const renderOhGroup = (x: number, dir: -1 | 1) => {
    const startY = midY + dir * (isCompact ? 23 : 13);
    const nodeY = midY + dir * (isCompact ? 54 : 44);
    const isDraggingOh = draggingItem?.kind === 'oh';
    return (
      <g
        key="oh-group"
        data-testid="placed-oh-group"
        className={interactive ? 'cursor-grab active:cursor-grabbing' : undefined}
        onPointerDown={(e) => {
          if (!interactive) return;
          e.stopPropagation();
          onSetDraggingItem?.({ kind: 'oh' });
        }}
        onClick={(e) => {
          if (!interactive) return;
          e.stopPropagation();
        }}
      >
        <line x1={x} y1={startY} x2={x} y2={nodeY - dir * 13} stroke="#059669" strokeWidth={2.4} strokeLinecap="round" />
        <g transform={`translate(${x}, ${nodeY})`}>
          <rect
            x="-19"
            y="-13"
            width="38"
            height="26"
            rx="8"
            fill={isDraggingOh ? '#a7f3d0' : '#d1fae5'}
            stroke="#059669"
            strokeWidth={isDraggingOh ? 2.6 : 2}
          />
          <text y="4" fontSize="11.5" fontWeight="800" fill="#065f46" textAnchor="middle">
            OH
          </text>
        </g>
      </g>
    );
  };

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      className="w-full h-auto max-h-[255px] select-none"
      onPointerUp={() => onSetDraggingItem?.(null)}
      onClick={() => onSelectBranch?.(null)}
    >
      <defs>
        <pattern id="isomerGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" fill="#e2e8f0" />
        </pattern>
      </defs>
      <rect x="0" y="0" width={viewW} height={viewH} rx="12" fill="url(#isomerGrid)" />

      {/* 1. Render Backbone Bonds */}
      {Array.from({ length: L - 1 }, (_, i) => renderBondSegment(i))}

      {/* 2. Render Per-Carbon Attachments & Main Carbon Nodes */}
      {Array.from({ length: L }, (_, i) => {
        const x = getX(i);
        const brs = branchesBySlot[i];
        const hasOh = state.series === 'alkohol' && state.ohSlotIdx === i;
        const hCount = evaluated.hydrogensBySlot[i] ?? 0;
        const usedVal = evaluated.valenceBySlot[i] ?? 0;
        const isOver = usedVal > 4;
        const iupacNum = evaluated.iupacNumberByBackboneSlot[i];

        // Assign directions (-1 top, +1 bottom)
        const branchDirs: Array<{ br: PlacedBranch; dir: -1 | 1 }> = [];
        if (brs[0]) branchDirs.push({ br: brs[0], dir: -1 });
        if (brs[1]) branchDirs.push({ br: brs[1], dir: 1 });
        const ohDir: -1 | 1 = brs.length === 0 ? -1 : 1;

        // Determine unused vertical positions for Textbook H atoms
        const topOccupied = brs.length >= 1 || (hasOh && ohDir === -1);
        const bottomOccupied = brs.length >= 2 || (hasOh && ohDir === 1);

        // Calculate H distribution in Textbook Penuh H mode:
        // Endpoint C (i=0 or i=L-1) gets an outer horizontal H first, then unoccupied top/bottom
        const isLeftEnd = i === 0;
        const isRightEnd = i === L - 1;
        let remH = hCount;
        let drawLeftH = false;
        let drawRightH = false;
        let drawTopH = false;
        let drawBottomH = false;

        if (!isCompact) {
          if (isLeftEnd && remH > 0) {
            drawLeftH = true;
            remH--;
          }
          if (isRightEnd && remH > 0) {
            drawRightH = true;
            remH--;
          }
          if (!topOccupied && remH > 0) {
            drawTopH = true;
            remH--;
          }
          if (!bottomOccupied && remH > 0) {
            drawBottomH = true;
            remH--;
          }
        }

        const slotAcceptsClick =
          interactive &&
          ((draggingItem?.kind === 'branch' && canAcceptBranchOnSlot(i)) ||
            (draggingItem?.kind === 'oh' && state.series === 'alkohol' && canMoveOhToSlot(i) && !hasOh) ||
            (selectedBranchId !== null && canAcceptBranchOnSlot(i)) ||
            ((activeTool === 'ch3' || activeTool === 'c2h5') &&
              canAcceptBranchOnSlot(i) &&
              evaluated.remainingBranchCarbons >= (activeTool === 'c2h5' ? 2 : 1)) ||
            (activeTool === 'oh' && state.series === 'alkohol' && canMoveOhToSlot(i) && !hasOh));

        return (
          <g
            key={`slot-${i}`}
            data-testid={`carbon-slot-${i}`}
            onPointerUp={(e) => {
              if (!interactive || !draggingItem) return;
              e.stopPropagation();
              if (draggingItem.kind === 'branch' && canAcceptBranchOnSlot(i)) {
                onDropPayloadOnCarbon?.(i, `move-branch:${draggingItem.branchId}`);
              } else if (draggingItem.kind === 'oh' && state.series === 'alkohol' && canMoveOhToSlot(i)) {
                onMoveOh?.(i);
              }
              onSetDraggingItem?.(null);
            }}
            onDragOver={(e) => {
              if (!interactive) return;
              e.preventDefault();
            }}
            onDrop={(e) => {
              if (!interactive) return;
              e.preventDefault();
              e.stopPropagation();
              const payload = e.dataTransfer.getData('text/isomer-item');
              if (payload) onDropPayloadOnCarbon?.(i, payload);
            }}
          >
            {/* Outer horizontal H atoms in Buku Teks mode */}
            {!isCompact && drawLeftH && (
              <>
                <line x1={x - 13} y1={midY} x2={x - 27} y2={midY} stroke="#64748b" strokeWidth={1.8} />
                <text x={x - 36} y={midY + 4.5} fontSize="13" fontWeight="700" fill="#475569" textAnchor="middle">
                  H
                </text>
              </>
            )}
            {!isCompact && drawRightH && (
              <>
                <line x1={x + 13} y1={midY} x2={x + 27} y2={midY} stroke="#64748b" strokeWidth={1.8} />
                <text x={x + 36} y={midY + 4.5} fontSize="13" fontWeight="700" fill="#475569" textAnchor="middle">
                  H
                </text>
              </>
            )}

            {/* Vertical H atoms in Buku Teks mode */}
            {!isCompact && drawTopH && (
              <>
                <line x1={x} y1={midY - 13} x2={x} y2={midY - 30} stroke="#64748b" strokeWidth={1.8} />
                <text x={x} y={midY - 37} fontSize="13" fontWeight="700" fill="#475569" textAnchor="middle">
                  H
                </text>
              </>
            )}
            {!isCompact && drawBottomH && (
              <>
                <line x1={x} y1={midY + 13} x2={x} y2={midY + 30} stroke="#64748b" strokeWidth={1.8} />
                <text x={x} y={midY + 46} fontSize="13" fontWeight="700" fill="#475569" textAnchor="middle">
                  H
                </text>
              </>
            )}

            {/* Attached Branches */}
            {branchDirs.map(({ br, dir }) => renderBranchVisual(br, x, dir))}

            {/* Attached -OH Group */}
            {hasOh && renderOhGroup(x, ohDir)}

            {/* Target + badge when placing or moving branch / -OH */}
            {slotAcceptsClick && (
              <g
                transform={`translate(${x + (!isCompact ? 22 : 0)}, ${midY + (!isCompact ? -24 : !topOccupied ? -38 : 38)})`}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (activeTool === 'oh' && state.series === 'alkohol') {
                    onMoveOh?.(i);
                  } else {
                    onAddOrMoveBranchToSlot?.(i);
                  }
                }}
              >
                <circle r="10" fill="#eef2ff" stroke="#4f46e5" strokeWidth="1.6" strokeDasharray="3 2" />
                <text y="3.5" fontSize="12" fontWeight="800" fill="#4338ca" textAnchor="middle">
                  +
                </text>
              </g>
            )}

            {/* Main Backbone Carbon Node */}
            <g
              className={interactive ? 'cursor-pointer' : undefined}
              onClick={(e) => {
                if (!interactive) return;
                e.stopPropagation();
                if (
                  (activeTool === 'oh' ||
                    (activeTool === 'move' &&
                      selectedBranchId === null &&
                      evaluated.remainingBranchCarbons === 0)) &&
                  state.series === 'alkohol' &&
                  canMoveOhToSlot(i)
                ) {
                  onMoveOh?.(i);
                  return;
                }
                if (
                  selectedBranchId !== null ||
                  ((activeTool === 'ch3' || activeTool === 'c2h5') && canAcceptBranchOnSlot(i))
                ) {
                  onAddOrMoveBranchToSlot?.(i);
                }
              }}
            >
              {isCompact ? (
                <>
                  <circle
                    cx={x}
                    cy={midY}
                    r={22}
                    fill={isOver ? '#991b1b' : '#0f172a'}
                    stroke={slotAcceptsClick ? '#6366f1' : isOver ? '#ef4444' : '#334155'}
                    strokeWidth={slotAcceptsClick ? 2.6 : 2}
                  />
                  <text
                    x={x}
                    y={midY + 4.5}
                    fontSize="12.5"
                    fontWeight="800"
                    fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                    fill="#ffffff"
                    textAnchor="middle"
                  >
                    {formatCH(hCount)}
                  </text>
                </>
              ) : (
                <>
                  <circle
                    cx={x}
                    cy={midY}
                    r={13}
                    fill={isOver ? '#fee2e2' : '#ffffff'}
                    stroke={slotAcceptsClick ? '#6366f1' : isOver ? '#ef4444' : '#cbd5e1'}
                    strokeWidth={1.6}
                  />
                  <text
                    x={x}
                    y={midY + 5}
                    fontSize="14.5"
                    fontWeight="800"
                    fill={isOver ? '#b91c1c' : '#0f172a'}
                    textAnchor="middle"
                  >
                    C
                  </text>
                </>
              )}

              {/* IUPAC numbering pill on valid molecules */}
              {iupacNum !== undefined && evaluated.status === 'valid' && (
                <g transform={`translate(${x + (isCompact ? 16 : 12)}, ${midY + (isCompact ? -16 : -12)})`}>
                  <circle r="7.5" fill="#4f46e5" stroke="#ffffff" strokeWidth="1" />
                  <text y="2.6" fontSize="8.5" fontWeight="800" fill="#ffffff" textAnchor="middle">
                    {iupacNum}
                  </text>
                </g>
              )}
            </g>
          </g>
        );
      })}
    </svg>
  );
};
