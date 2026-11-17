import React, { useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Sparkles,
  RotateCcw,
  Trash2,
  Link2,
  MousePointer,
  Scissors,
  Wand2,
  AlertTriangle,
  Info,
  BookOpen,
  Atom as AtomIcon,
  ArrowLeft,
  Flame,
  Droplets,
  Zap,
  FlaskConical,
} from 'lucide-react';
import { analytics } from '../services/analytics';
import {
  ATOM_MAP,
  ATOM_PALETTE,
  AtomCounts,
  BondOrder,
  CARBON_COMPOUNDS,
  CarbonCompound,
  ElementSymbol,
  EMPTY_COUNTS,
  computeBondSignature,
  findCloseSuggestions,
  findExactCompounds,
  formatFormulaFromCounts,
  normalizeCounts,
} from '../data/carbonStructures';
import { CarbonStructureSVG } from '../components/CarbonStructureSVG';

type TabId = 'pembina' | 'rujukan';
type ToolMode = 'bond1' | 'bond2' | 'bond3' | 'move' | 'erase';

interface SandboxNode {
  id: number;
  element: ElementSymbol;
  x: number;
  y: number;
}

interface SandboxBond {
  id: string;
  from: number; // node id
  to: number; // node id
  order: BondOrder;
}

interface VerificationFeedback {
  type: 'error' | 'info' | 'success';
  message: string;
}

const SANDBOX_W = 580;
const SANDBOX_H = 310;

const PRESET_IDS = ['etanol', 'asid-etanoik', 'etena', '1-2-dibromoetana', 'metilamina'] as const;

export const CarbonStructureBuilderLab: React.FC = () => {
  const SIM_ID = 'formula-struktur-karbon';

  const [activeTab, setActiveTab] = useState<TabId>('pembina');
  const [nodes, setNodes] = useState<SandboxNode[]>([]);
  const [bonds, setBonds] = useState<SandboxBond[]>([]);
  const [nextId, setNextId] = useState<number>(1);
  const [toolMode, setToolMode] = useState<ToolMode>('bond1');
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const [verifiedCompound, setVerifiedCompound] = useState<CarbonCompound | null>(null);
  const [feedback, setFeedback] = useState<VerificationFeedback | null>(null);

  // Dragging placed nodes inside SVG sandbox
  const svgRef = useRef<SVGSVGElement | null>(null);
  const draggingRef = useRef<{ nodeId: number; startX: number; startY: number; moved: boolean } | null>(null);

  // Compute live atom counts
  const atomCounts: AtomCounts = useMemo(() => {
    const c = { ...EMPTY_COUNTS };
    nodes.forEach((n) => {
      c[n.element] += 1;
    });
    return c;
  }, [nodes]);

  const formulaText = useMemo(() => formatFormulaFromCounts(atomCounts), [atomCounts]);

  // Exact matching compounds & partial close suggestions (Method Step 2)
  const exactMatches = useMemo(() => findExactCompounds(atomCounts), [atomCounts]);
  const closeSuggestions = useMemo(
    () => (exactMatches.length === 0 ? findCloseSuggestions(atomCounts, 3) : []),
    [atomCounts, exactMatches.length]
  );

  // Bond count per node id
  const bondUsageByNode = useMemo(() => {
    const map: Record<number, number> = {};
    nodes.forEach((n) => {
      map[n.id] = 0;
    });
    bonds.forEach((b) => {
      map[b.from] = (map[b.from] ?? 0) + b.order;
      map[b.to] = (map[b.to] ?? 0) + b.order;
    });
    return map;
  }, [nodes, bonds]);

  const clearVerification = () => {
    setVerifiedCompound(null);
    setFeedback(null);
  };

  // Add atom at given sandbox coords or smart auto position
  const addAtomAt = (element: ElementSymbol, x?: number, y?: number) => {
    clearVerification();
    const idx = nodes.length;
    const cols = 6;
    const defaultX = 95 + (idx % cols) * 78;
    const defaultY = 76 + Math.floor(idx / cols) * 76;
    const clampedX = Math.max(32, Math.min(SANDBOX_W - 32, x ?? defaultX));
    const clampedY = Math.max(36, Math.min(SANDBOX_H - 36, y ?? (defaultY > SANDBOX_H - 40 ? 155 : defaultY)));

    setNodes((prev) => [...prev, { id: nextId, element, x: clampedX, y: clampedY }]);
    setNextId((n) => n + 1);
    analytics.recordSimulationClick(SIM_ID);
  };

  const removeNode = (nodeId: number) => {
    clearVerification();
    setNodes((prev) => prev.filter((n) => n.id !== nodeId));
    setBonds((prev) => prev.filter((b) => b.from !== nodeId && b.to !== nodeId));
    if (selectedNodeId === nodeId) setSelectedNodeId(null);
  };

  const handleDropOnSandbox = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const el = e.dataTransfer.getData('text/atom') as ElementSymbol;
    if (!el || !ATOM_MAP[el] || !svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * SANDBOX_W;
    const y = ((e.clientY - rect.top) / rect.height) * SANDBOX_H;
    addAtomAt(el, x, y);
  };

  // Arrange sandbox nodes and bonds neatly to match a textbook compound
  const applyCompoundToSandbox = (compound: CarbonCompound) => {
    clearVerification();
    const xs = compound.nodes.map((n) => n.gx);
    const ys = compound.nodes.map((n) => n.gy);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const spanX = Math.max(1, maxX - minX);
    const spanY = Math.max(1, maxY - minY);
    const stepX = Math.min(72, (SANDBOX_W - 140) / spanX);
    const stepY = Math.min(68, (SANDBOX_H - 110) / spanY);

    const totalW = (maxX - minX) * stepX;
    const totalH = (maxY - minY) * stepY;
    const offsetX = (SANDBOX_W - totalW) / 2;
    const offsetY = (SANDBOX_H - totalH) / 2;

    const baseId = nextId;
    const newNodes: SandboxNode[] = compound.nodes.map((n, i) => ({
      id: baseId + i,
      element: n.element,
      x: offsetX + (n.gx - minX) * stepX,
      y: offsetY + (n.gy - minY) * stepY,
    }));

    const newBonds: SandboxBond[] = compound.bonds.map((b) => {
      const a = baseId + b.from;
      const c = baseId + b.to;
      const key = a < c ? `${a}-${c}` : `${c}-${a}`;
      return { id: key, from: a, to: c, order: b.order };
    });

    setNodes(newNodes);
    setBonds(newBonds);
    setNextId(baseId + newNodes.length + 1);
    setSelectedNodeId(null);
    analytics.recordSimulationClick(SIM_ID);
  };

  // Add missing atoms from a close suggestion
  const handleCompleteSuggestionAtoms = (compound: CarbonCompound) => {
    clearVerification();
    const target = normalizeCounts(compound.counts);
    const elements: ElementSymbol[] = ['C', 'H', 'O', 'N', 'Cl', 'Br', 'I'];
    let runningId = nextId;
    let runningIdx = nodes.length;
    const extras: SandboxNode[] = [];

    elements.forEach((el) => {
      const missing = Math.max(0, target[el] - atomCounts[el]);
      for (let i = 0; i < missing; i += 1) {
        const cols = 6;
        const x = Math.min(SANDBOX_W - 40, 88 + (runningIdx % cols) * 78);
        const y = Math.min(SANDBOX_H - 42, 74 + Math.floor(runningIdx / cols) * 74);
        extras.push({ id: runningId, element: el, x, y });
        runningId += 1;
        runningIdx += 1;
      }
    });

    if (extras.length > 0) {
      setNodes((prev) => [...prev, ...extras]);
      setNextId(runningId);
    }
  };

  // Bond or select nodes on click
  const handleAtomClick = (nodeId: number) => {
    clearVerification();

    if (toolMode === 'erase') {
      removeNode(nodeId);
      return;
    }

    if (toolMode === 'move') {
      setSelectedNodeId((prev) => (prev === nodeId ? null : nodeId));
      return;
    }

    // Bonding modes: bond1, bond2, bond3
    const order: BondOrder = toolMode === 'bond1' ? 1 : toolMode === 'bond2' ? 2 : 3;

    if (selectedNodeId === null) {
      setSelectedNodeId(nodeId);
      return;
    }

    if (selectedNodeId === nodeId) {
      setSelectedNodeId(null);
      return;
    }

    const a = selectedNodeId;
    const b = nodeId;
    const bondKey = a < b ? `${a}-${b}` : `${b}-${a}`;

    setBonds((prev) => {
      const existing = prev.find((item) => item.id === bondKey);
      if (existing) {
        if (existing.order === order) {
          // Toggle off if same bond order clicked again
          return prev.filter((item) => item.id !== bondKey);
        }
        return prev.map((item) => (item.id === bondKey ? { ...item, order } : item));
      }
      return [...prev, { id: bondKey, from: a, to: b, order }];
    });

    setSelectedNodeId(null);
    analytics.recordSimulationClick(SIM_ID);
  };

  const handleBondClick = (bondId: string) => {
    clearVerification();
    if (toolMode === 'erase') {
      setBonds((prev) => prev.filter((b) => b.id !== bondId));
      return;
    }
    if (toolMode === 'bond1' || toolMode === 'bond2' || toolMode === 'bond3') {
      const order: BondOrder = toolMode === 'bond1' ? 1 : toolMode === 'bond2' ? 2 : 3;
      setBonds((prev) => prev.map((b) => (b.id === bondId ? { ...b, order } : b)));
    }
  };

  // Pointer dragging for atoms inside SVG
  const getSvgCoords = (clientX: number, clientY: number) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    return {
      x: Math.max(26, Math.min(SANDBOX_W - 26, ((clientX - rect.left) / rect.width) * SANDBOX_W)),
      y: Math.max(28, Math.min(SANDBOX_H - 28, ((clientY - rect.top) / rect.height) * SANDBOX_H)),
    };
  };

  const handleNodePointerDown = (e: React.PointerEvent, nodeId: number) => {
    e.stopPropagation();
    const coords = getSvgCoords(e.clientX, e.clientY);
    draggingRef.current = { nodeId, startX: coords.x, startY: coords.y, moved: false };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const handleSvgPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const coords = getSvgCoords(e.clientX, e.clientY);
    const dist = Math.hypot(coords.x - draggingRef.current.startX, coords.y - draggingRef.current.startY);
    if (dist > 4) {
      draggingRef.current.moved = true;
    }
    if (draggingRef.current.moved) {
      const targetId = draggingRef.current.nodeId;
      setNodes((prev) => prev.map((n) => (n.id === targetId ? { ...n, x: coords.x, y: coords.y } : n)));
    }
  };

  const handleNodePointerUp = (e: React.PointerEvent, nodeId: number) => {
    e.stopPropagation();
    const wasMoved = draggingRef.current?.moved ?? false;
    draggingRef.current = null;
    if (!wasMoved) {
      handleAtomClick(nodeId);
    }
  };

  // Method Step 4: Verify Structure!
  const handleVerifyStructure = () => {
    if (nodes.length === 0) {
      setFeedback({
        type: 'error',
        message: 'Sandbox masih kosong. Seret atom (cth: C, H, O) ke dalam sandbox terlebih dahulu.',
      });
      return;
    }

    if (exactMatches.length === 0) {
      setFeedback({
        type: 'error',
        message: `Bilangan atom semasa (${formulaText}) belum membentuk sebatian karbon KSSM yang lengkap. Rujuk cadangan atom di panel kanan.`,
      });
      return;
    }

    // If atoms are placed but user hasn't bonded any yet
    if (bonds.length === 0) {
      setFeedback({
        type: 'info',
        message: `Atom sepadan dengan ${exactMatches.map((m) => m.name).join(' / ')}. Sila sambung ikatan kovalen antara atom menggunakan pilihan ikatan di atas sandbox, atau klik "Auto-Ikatan".`,
      });
      return;
    }

    // Check valency of every atom
    const valencyIssues: string[] = [];
    nodes.forEach((n) => {
      const expected = ATOM_MAP[n.element].valency;
      const used = bondUsageByNode[n.id] ?? 0;
      if (used !== expected) {
        valencyIssues.push(`${n.element} (${used}/${expected} ikatan)`);
      }
    });

    if (valencyIssues.length > 0) {
      setFeedback({
        type: 'error',
        message: `Valensi ikatan kovalen belum lengkap/betul pada: ${valencyIssues.slice(0, 3).join(', ')}. Pastikan C=4, O=2, N=3, H/Cl/Br/I=1.`,
      });
      return;
    }

    // Check single connected component (all atoms belong to one molecule)
    const adj: Record<number, number[]> = {};
    nodes.forEach((n) => {
      adj[n.id] = [];
    });
    bonds.forEach((b) => {
      adj[b.from]?.push(b.to);
      adj[b.to]?.push(b.from);
    });
    const visited = new Set<number>();
    const queue = [nodes[0].id];
    visited.add(nodes[0].id);
    while (queue.length > 0) {
      const curr = queue.shift()!;
      for (const nxt of adj[curr] || []) {
        if (!visited.has(nxt)) {
          visited.add(nxt);
          queue.push(nxt);
        }
      }
    }
    if (visited.size !== nodes.length) {
      setFeedback({
        type: 'error',
        message: 'Terdapat atom yang masih terpisah! Pastikan semua atom bercantum menjadi satu molekul.',
      });
      return;
    }

    // Compare manual bond topology signature against candidate compounds!
    const indexById: Record<number, number> = {};
    nodes.forEach((n, idx) => {
      indexById[n.id] = idx;
    });
    const manualSig = computeBondSignature(
      nodes.map((n) => n.element),
      bonds.map((b) => ({ from: indexById[b.from], to: indexById[b.to], order: b.order }))
    );

    const matched = exactMatches.find(
      (cand) =>
        computeBondSignature(
          cand.nodes.map((cn) => cn.element),
          cand.bonds
        ) === manualSig
    );

    const chosen = matched ?? exactMatches[0];
    setVerifiedCompound(chosen);
    setFeedback({
      type: 'success',
      message: `Tahniah! Struktur kovalen ${chosen.name} (${chosen.molecularFormula}) disahkan tepat.`,
    });
    analytics.recordSimulationCompleted(SIM_ID);
    confetti({ particleCount: 60, spread: 55 });
  };

  const handleReset = () => {
    setNodes([]);
    setBonds([]);
    setNextId(1);
    setSelectedNodeId(null);
    clearVerification();
    analytics.recordSimulationClick(SIM_ID);
  };

  const satisfiedCount = nodes.filter((n) => (bondUsageByNode[n.id] ?? 0) === ATOM_MAP[n.element].valency).length;

  return (
    <div className="space-y-2">
      {/* Compact Header Strip + Quick Presets */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-slate-50 border border-indigo-200 rounded-xl px-3 py-1.5 flex flex-wrap md:flex-nowrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1 text-[11px] text-slate-700">
          <span className="font-bold text-indigo-800 mr-0.5">SP 2.2.2 • Contoh pantas:</span>
          {PRESET_IDS.map((pid) => {
            const p = CARBON_COMPOUNDS.find((c) => c.id === pid);
            if (!p) return null;
            return (
              <button
                key={pid}
                type="button"
                onClick={() => applyCompoundToSandbox(p)}
                className="px-2 py-0.5 rounded-md bg-white hover:bg-indigo-100 border border-indigo-200 text-[10.5px] font-bold text-indigo-800 transition cursor-pointer"
              >
                {p.molecularFormula} ({p.name})
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1 transition cursor-pointer shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Kosongkan
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'pembina' as TabId, label: '1. Pembina Formula Struktur (Drag & Drop)', icon: AtomIcon },
            { id: 'rujukan' as TabId, label: '2. Jadual Siri Homolog, Kumpulan Berfungsi & Sifat Fizik', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  analytics.recordSimulationClick(SIM_ID);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'pembina' && (
          <div className="text-[11px] font-semibold text-slate-500">
            Formula Sandbox: <span className="font-mono font-bold text-indigo-700">{formulaText}</span>
          </div>
        )}
      </div>

      {/* ================= TAB 1: DRAG & DROP SANDBOX + VERIFICATION ================= */}
      {activeTab === 'pembina' && (
        <div className="space-y-2.5">
          {/* Method Step 1: Draggable Atom Palette */}
          <div className="bg-white border border-slate-200 rounded-xl p-2 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-600 px-1">
                1. Seret Atom ke Sandbox (atau Klik +):
              </span>
              <div className="flex flex-wrap items-center gap-1.5 flex-1 justify-end sm:justify-start">
                {ATOM_PALETTE.map((atom) => {
                  const count = atomCounts[atom.symbol];
                  return (
                    <button
                      key={atom.symbol}
                      type="button"
                      draggable
                      data-testid={`palette-atom-${atom.symbol}`}
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/atom', atom.symbol);
                      }}
                      onClick={() => addAtomAt(atom.symbol)}
                      title={`${atom.name} (${atom.roleHint}) — Seret ke sandbox atau klik untuk tambah`}
                      className="group flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 transition cursor-grab active:cursor-grabbing"
                    >
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center font-mono font-extrabold text-xs border shadow-2xs shrink-0"
                        style={{
                          backgroundColor: atom.fill,
                          color: atom.textColor,
                          borderColor: atom.border,
                        }}
                      >
                        {atom.symbol}
                      </span>
                      <div className="text-left leading-tight">
                        <div className="text-[11px] font-bold text-slate-800">
                          {atom.name}
                          {count > 0 && (
                            <span className="ml-1 text-[10px] font-mono text-indigo-700">×{count}</span>
                          )}
                        </div>
                        <div className="text-[9.5px] text-slate-500">{atom.valency} ikatan</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main 2-Column Workspace */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-start">
            {/* LEFT 7 COLS: External Covalent Bond Controls + Dropzone Sandbox */}
            <div className="md:col-span-7 bg-white border border-slate-200 rounded-xl p-2 shadow-xs flex flex-col space-y-2">
              {/* Method Step 3: External Covalent Bond Selector OUTSIDE Sandbox */}
              <div className="flex flex-wrap items-center justify-between gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-[9.5px] font-extrabold uppercase text-slate-500 mr-0.5">
                    Ikatan Kovalen:
                  </span>
                  {[
                    { id: 'bond1' as ToolMode, label: 'Tunggal (—)', testId: 'bond-tool-1' },
                    { id: 'bond2' as ToolMode, label: 'Ganda Dua (═)', testId: 'bond-tool-2' },
                    { id: 'bond3' as ToolMode, label: 'Ganda Tiga (≡)', testId: 'bond-tool-3' },
                    { id: 'move' as ToolMode, label: 'Susun', icon: MousePointer, testId: 'bond-tool-move' },
                    { id: 'erase' as ToolMode, label: 'Padam', icon: Scissors, testId: 'bond-tool-erase' },
                  ].map((t) => {
                    const Icon = t.icon ?? Link2;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        data-testid={t.testId}
                        onClick={() => {
                          setToolMode(t.id);
                          setSelectedNodeId(null);
                        }}
                        className={`px-1.5 py-0.5 rounded-md text-[10.5px] font-bold flex items-center gap-1 border transition cursor-pointer ${
                          toolMode === t.id
                            ? 'bg-indigo-600 text-white border-indigo-700 shadow-2xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        {t.label}
                      </button>
                    );
                  })}
                </div>

                {exactMatches.length > 0 && (
                  <button
                    type="button"
                    data-testid="auto-bond-btn"
                    onClick={() => applyCompoundToSandbox(exactMatches[0])}
                    className="px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 flex items-center gap-1 transition cursor-pointer"
                    title="Susun atom dan sambungkan ikatan kovalen secara automatik mengikut buku teks"
                  >
                    <Wand2 className="w-3 h-3" />
                    Auto-Ikatan
                  </button>
                )}
              </div>

              {/* Sandbox Dropzone SVG */}
              <div
                data-testid="carbon-sandbox"
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDropOnSandbox}
                className={`relative rounded-xl border-2 transition overflow-hidden ${
                  isDragOver
                    ? 'border-indigo-500 bg-indigo-50/50 border-dashed'
                    : 'border-slate-200 bg-[#f8fafc]'
                }`}
              >
                <svg
                  ref={svgRef}
                  viewBox={`0 0 ${SANDBOX_W} ${SANDBOX_H}`}
                  className="w-full h-auto max-h-[268px] select-none touch-none"
                  onPointerMove={handleSvgPointerMove}
                  onPointerUp={() => {
                    draggingRef.current = null;
                  }}
                  onClick={() => setSelectedNodeId(null)}
                >
                  <defs>
                    <pattern id="sandboxDots" width="22" height="22" patternUnits="userSpaceOnUse">
                      <circle cx="11" cy="11" r="1.1" fill="#cbd5e1" />
                    </pattern>
                  </defs>
                  <rect x="0" y="0" width={SANDBOX_W} height={SANDBOX_H} fill="url(#sandboxDots)" />

                  {/* Empty state instruction inside sandbox */}
                  {nodes.length === 0 && (
                    <g pointerEvents="none">
                      <rect
                        x="105"
                        y="108"
                        width="370"
                        height="92"
                        rx="12"
                        fill="#ffffff"
                        stroke="#cbd5e1"
                        strokeDasharray="5 4"
                      />
                      <text x="290" y="142" fontSize="13" fontWeight="800" fill="#334155" textAnchor="middle">
                        Kawasan Sandbox Pembinaan Molekul
                      </text>
                      <text x="290" y="164" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
                        Seret atom (C, H, O, N, Cl, Br, I) ke dalam petak ini
                      </text>
                      <text x="290" y="182" fontSize="10.5" fontWeight="600" fill="#4f46e5" textAnchor="middle">
                        atau klik butang atom di atas untuk bermula!
                      </text>
                    </g>
                  )}

                  {/* Drawn Covalent Bonds */}
                  {bonds.map((bond) => {
                    const n1 = nodes.find((n) => n.id === bond.from);
                    const n2 = nodes.find((n) => n.id === bond.to);
                    if (!n1 || !n2) return null;

                    const dx = n2.x - n1.x;
                    const dy = n2.y - n1.y;
                    const len = Math.hypot(dx, dy) || 1;
                    const px = -dy / len;
                    const py = dx / len;
                    const strokeColor = toolMode === 'erase' ? '#ef4444' : '#334155';

                    return (
                      <g
                        key={bond.id}
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBondClick(bond.id);
                        }}
                      >
                        {/* Invisible wide hit target for easy click */}
                        <line x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} stroke="transparent" strokeWidth="14" />
                        {bond.order === 1 && (
                          <line x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} stroke={strokeColor} strokeWidth="3.2" />
                        )}
                        {bond.order === 2 && (
                          <>
                            <line
                              x1={n1.x + px * 4}
                              y1={n1.y + py * 4}
                              x2={n2.x + px * 4}
                              y2={n2.y + py * 4}
                              stroke={strokeColor}
                              strokeWidth="2.8"
                            />
                            <line
                              x1={n1.x - px * 4}
                              y1={n1.y - py * 4}
                              x2={n2.x - px * 4}
                              y2={n2.y - py * 4}
                              stroke={strokeColor}
                              strokeWidth="2.8"
                            />
                          </>
                        )}
                        {bond.order === 3 && (
                          <>
                            <line x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} stroke={strokeColor} strokeWidth="2.5" />
                            <line
                              x1={n1.x + px * 5.5}
                              y1={n1.y + py * 5.5}
                              x2={n2.x + px * 5.5}
                              y2={n2.y + py * 5.5}
                              stroke={strokeColor}
                              strokeWidth="2.5"
                            />
                            <line
                              x1={n1.x - px * 5.5}
                              y1={n1.y - py * 5.5}
                              x2={n2.x - px * 5.5}
                              y2={n2.y - py * 5.5}
                              stroke={strokeColor}
                              strokeWidth="2.5"
                            />
                          </>
                        )}
                      </g>
                    );
                  })}

                  {/* Placed Atoms inside Sandbox */}
                  {nodes.map((node) => {
                    const def = ATOM_MAP[node.element];
                    const used = bondUsageByNode[node.id] ?? 0;
                    const isExact = used === def.valency;
                    const isOver = used > def.valency;
                    const isSelected = selectedNodeId === node.id;

                    const statusRing = isOver
                      ? '#dc2626'
                      : isExact
                      ? '#10b981'
                      : '#f59e0b';

                    return (
                      <g
                        key={node.id}
                        transform={`translate(${node.x}, ${node.y})`}
                        className="cursor-pointer"
                        onPointerDown={(e) => handleNodePointerDown(e, node.id)}
                        onPointerUp={(e) => handleNodePointerUp(e, node.id)}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {isSelected && (
                          <circle r="24" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeDasharray="4 2" />
                        )}
                        <circle
                          r="19"
                          fill={def.fill}
                          stroke={statusRing}
                          strokeWidth="2.8"
                        />
                        <text
                          y="4.5"
                          fontSize="13"
                          fontWeight="800"
                          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                          fill={def.textColor}
                          textAnchor="middle"
                          pointerEvents="none"
                        >
                          {node.element}
                        </text>

                        {/* Tiny valency pill below atom */}
                        <rect
                          x="-13"
                          y="14"
                          width="26"
                          height="12"
                          rx="5"
                          fill="#ffffff"
                          stroke={statusRing}
                          strokeWidth="1"
                        />
                        <text
                          y="23"
                          fontSize="8.5"
                          fontWeight="800"
                          fill={isOver ? '#b91c1c' : isExact ? '#047857' : '#b45309'}
                          textAnchor="middle"
                          pointerEvents="none"
                        >
                          {used}/{def.valency}
                        </text>

                        {/* Delete corner button when selected */}
                        {isSelected && (
                          <g
                            transform="translate(15, -15)"
                            onPointerDown={(e) => e.stopPropagation()}
                            onPointerUp={(e) => {
                              e.stopPropagation();
                              removeNode(node.id);
                            }}
                          >
                            <circle r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="1.2" />
                            <text y="3" fontSize="9.5" fontWeight="800" fill="#ffffff" textAnchor="middle">
                              ×
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Footer under sandbox: Bond instructions + Verify CTA */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-[11px] text-slate-600">
                  {nodes.length === 0 ? (
                    <span>Tip: Klik 2 atom berturut-turut untuk sambung ikatan kovalen, atau seret atom untuk susun semula.</span>
                  ) : selectedNodeId !== null ? (
                    <span className="font-bold text-indigo-700">
                      Atom dipilih — klik atom kedua untuk bentuk ikatan ({toolMode === 'bond1' ? 'Tunggal —' : toolMode === 'bond2' ? 'Ganda Dua ═' : toolMode === 'bond3' ? 'Ganda Tiga ≡' : 'Pilih mod ikatan'}).
                    </span>
                  ) : (
                    <span>
                      Status valensi:{' '}
                      <strong className={satisfiedCount === nodes.length ? 'text-emerald-700' : 'text-amber-700'}>
                        {satisfiedCount}/{nodes.length} atom lengkap
                      </strong>
                    </span>
                  )}
                </div>

                {/* Method Step 4: Verify CTA */}
                <button
                  type="button"
                  data-testid="verify-structure-btn"
                  onClick={handleVerifyStructure}
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Sahkan Struktur
                </button>
              </div>

              {feedback && feedback.type !== 'success' && (
                <div
                  className={`p-2 rounded-lg border text-[11px] flex items-start gap-1.5 ${
                    feedback.type === 'error'
                      ? 'bg-rose-50 border-rose-200 text-rose-900'
                      : 'bg-sky-50 border-sky-200 text-sky-900'
                  }`}
                >
                  {feedback.type === 'error' ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  ) : (
                    <Info className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                  )}
                  <span>{feedback.message}</span>
                </div>
              )}
            </div>

            {/* RIGHT 5 COLS: Method Step 2 (Live Possible Previews) OR Method Step 4 (Verified Compound Info) */}
            <div className="md:col-span-5 flex flex-col bg-white border border-slate-200 rounded-xl p-2 shadow-xs">
              {verifiedCompound ? (
                /* ================= METHOD STEP 4: VERIFIED COMPOUND DETAILS ================= */
                <div className="space-y-1.5" data-testid="verified-compound-panel">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                        Struktur Disahkan
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-sm leading-tight">
                        {verifiedCompound.name}{' '}
                        <span className="font-mono text-indigo-700">({verifiedCompound.molecularFormula})</span>
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setVerifiedCompound(null)}
                      className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[10.5px] font-bold text-slate-700 flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      Ubah
                    </button>
                  </div>

                  {/* Textbook-Style Structural Formula */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 flex flex-col items-center">
                    <div className="w-full flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5 text-[9.5px] font-bold text-slate-500 uppercase px-1">
                      <span>Formula Struktur Buku Teks</span>
                      <span className="text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded text-[9px]">
                        Kumpulan Berfungsi Diserlahkan
                      </span>
                    </div>
                    <div className="[&>svg]:max-h-[126px] [&>svg]:w-auto flex justify-center w-full">
                      <CarbonStructureSVG compound={verifiedCompound} highlightFunctionalGroup />
                    </div>
                  </div>

                  {/* Siri Homolog & Kumpulan Berfungsi */}
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="p-1.5 rounded-lg bg-indigo-50/80 border border-indigo-200">
                      <div className="text-[9.5px] font-extrabold uppercase text-indigo-800">Siri Homolog</div>
                      <div className="font-bold text-[11.5px] text-slate-900 leading-tight mt-0.5">
                        {verifiedCompound.homologousSeries}
                      </div>
                      <div className="text-[9.5px] font-mono text-indigo-700 mt-0.5">{verifiedCompound.generalFormula}</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-amber-50/80 border border-amber-200">
                      <div className="text-[9.5px] font-extrabold uppercase text-amber-800">Kumpulan Berfungsi</div>
                      <div className="font-bold text-[11.5px] text-slate-900 leading-tight mt-0.5">
                        {verifiedCompound.functionalGroupName}
                      </div>
                      <div className="text-[9.5px] font-mono text-amber-900 mt-0.5">
                        {verifiedCompound.functionalGroupNotation}
                      </div>
                    </div>
                  </div>

                  {/* Sifat Fizik Sebatian Karbon */}
                  <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700">
                      Sifat Fizik Sebatian ({verifiedCompound.categoryType})
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-[10px]">
                      <div className="bg-white p-1.5 rounded border border-slate-200">
                        <span className="text-slate-500 font-semibold flex items-center gap-1">
                          <FlaskConical className="w-3 h-3 text-indigo-500 shrink-0" /> Keadaan Fizik
                        </span>
                        <div className="font-bold text-slate-800 leading-tight mt-0.5">
                          {verifiedCompound.physical.stateAtRoomTemp}
                        </div>
                      </div>
                      <div className="bg-white p-1.5 rounded border border-slate-200">
                        <span className="text-slate-500 font-semibold flex items-center gap-1">
                          <Flame className="w-3 h-3 text-orange-500 shrink-0" /> Takat Lebur / Didih
                        </span>
                        <div className="font-bold text-slate-800 leading-tight mt-0.5">
                          {verifiedCompound.physical.meltingPoint} / {verifiedCompound.physical.boilingPoint}
                        </div>
                      </div>
                      <div className="bg-white p-1.5 rounded border border-slate-200">
                        <span className="text-slate-500 font-semibold flex items-center gap-1">
                          <Droplets className="w-3 h-3 text-sky-500 shrink-0" /> Keterlarutan
                        </span>
                        <div className="font-bold text-slate-800 leading-tight mt-0.5">
                          {verifiedCompound.physical.solubilityWater}
                        </div>
                      </div>
                      <div className="bg-white p-1.5 rounded border border-slate-200">
                        <span className="text-slate-500 font-semibold flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-500 shrink-0" /> Kekonduksian
                        </span>
                        <div className="font-bold text-slate-800 leading-tight mt-0.5">
                          {verifiedCompound.physical.conductivity}
                        </div>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-600 leading-tight">
                      <strong>Ciri Tambahan:</strong> {verifiedCompound.physical.densityAndOdor}
                    </div>
                  </div>

                  <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-950 leading-snug">
                    <strong>Nota KSSM:</strong> {verifiedCompound.kssmNote}
                  </div>
                </div>
              ) : (
                /* ================= METHOD STEP 2: LIVE POSSIBLE STRUCTURAL FORMULAS ================= */
                <div className="space-y-2 flex-1 flex flex-col justify-between" data-testid="possible-structures-panel">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                        2. Gambaran Formula Struktur Mungkin
                      </span>
                      <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {formulaText}
                      </span>
                    </div>

                    {nodes.length === 0 ? (
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-700">
                        <p className="font-bold text-slate-900">Cara Menggunakan Pembina Sebatian Karbon:</p>
                        <ol className="list-decimal pl-4 space-y-1 text-[11px] leading-snug text-slate-600">
                          <li>
                            <strong>Seret atom</strong> (C, H, O, N, Cl, Br, I) daripada palet di atas ke dalam petak sandbox.
                          </li>
                          <li>
                            Berdasarkan bilangan atom, <strong>gambaran formula struktur</strong> sebatian yang mungkin akan terpapar di sini.
                          </li>
                          <li>
                            Pilih jenis <strong>ikatan kovalen (—, ═, ≡)</strong> di luar sandbox dan sambungkan antara atom (atau klik <em>Auto-Ikatan</em>).
                          </li>
                          <li>
                            Klik <strong>Sahkan Struktur</strong> untuk melihat siri homolog, kumpulan fungsi dan sifat fizik lengkap!
                          </li>
                        </ol>
                      </div>
                    ) : exactMatches.length > 0 ? (
                      <div className="space-y-2 max-h-[330px] overflow-y-auto pr-0.5">
                        <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                          Ditemui {exactMatches.length} formula struktur sepadan dengan atom {formulaText}:
                        </div>
                        {exactMatches.map((comp) => (
                          <div
                            key={comp.id}
                            className="p-2 rounded-xl border border-slate-200 bg-slate-50/70 hover:border-indigo-300 transition space-y-1.5"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div>
                                <div className="font-bold text-xs text-slate-900">
                                  {comp.name}{' '}
                                  <span className="font-mono text-indigo-700">({comp.molecularFormula})</span>
                                </div>
                                <div className="text-[10px] text-slate-500">
                                  {comp.homologousSeries} • {comp.functionalGroupNotation}
                                </div>
                              </div>
                              <button
                                type="button"
                                data-testid={`apply-candidate-${comp.id}`}
                                onClick={() => applyCompoundToSandbox(comp)}
                                className="px-2 py-1 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-[10.5px] font-bold transition cursor-pointer shrink-0"
                              >
                                Susun &amp; Ikat
                              </button>
                            </div>
                            <div className="bg-white rounded-lg border border-slate-200 p-1 flex justify-center">
                              <CarbonStructureSVG compound={comp} compact />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-950">
                          Bilangan atom <strong>{formulaText}</strong> belum lengkap membentuk molekul stabil KSSM.
                          {closeSuggestions.length > 0 && ' Cadangan terdekat:'}
                        </div>

                        {closeSuggestions.length > 0 ? (
                          <div className="space-y-1.5 max-h-[265px] overflow-y-auto pr-0.5">
                            {closeSuggestions.map(({ compound, missingText }) => (
                              <div
                                key={compound.id}
                                className="p-2 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between gap-2"
                              >
                                <div>
                                  <div className="text-xs font-bold text-slate-900">
                                    {compound.name}{' '}
                                    <span className="font-mono text-indigo-700">({compound.molecularFormula})</span>
                                  </div>
                                  <div className="text-[10.5px] text-slate-600">
                                    Perlukan: <strong className="text-orange-700">{missingText}</strong>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleCompleteSuggestionAtoms(compound)}
                                  className="px-2 py-1 rounded-md bg-white hover:bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10.5px] font-bold cursor-pointer shrink-0"
                                >
                                  + Lengkapkan
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600 flex items-center justify-between gap-2">
                            <span>Nisbah atom melebihi formula sebatian asas. Klik Kosongkan atau pilih contoh di atas.</span>
                            <button
                              type="button"
                              onClick={handleReset}
                              className="px-2 py-1 rounded bg-white border border-slate-300 font-bold text-slate-700 flex items-center gap-1 cursor-pointer shrink-0"
                            >
                              <Trash2 className="w-3 h-3" /> Reset
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Quick Summary Pill of Valency Rules */}
                  <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-[10.5px] text-slate-700 flex flex-wrap items-center justify-between gap-1">
                    <span className="font-bold">Bilangan Ikatan Kovalen (Valensi):</span>
                    <span className="font-mono font-bold text-slate-900">C=4 · N=3 · O=2 · H/Cl/Br/I=1</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: KSSM REFERENCE TABLE ================= */}
      {activeTab === 'rujukan' && (
        <div className="space-y-3">
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs overflow-x-auto">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
              Ringkasan Siri Homolog, Kumpulan Berfungsi &amp; Sifat Fizik (Kimia Tingkatan 5 Bab 2)
            </h4>
            <table className="w-full text-left border-collapse text-[11.5px]">
              <thead>
                <tr className="bg-indigo-50 text-indigo-950 border-b border-indigo-200">
                  <th className="p-2 font-extrabold">Siri Homolog</th>
                  <th className="p-2 font-extrabold">Formula Am</th>
                  <th className="p-2 font-extrabold">Kumpulan Berfungsi</th>
                  <th className="p-2 font-extrabold">Keterlarutan &amp; Kekonduksian</th>
                  <th className="p-2 font-extrabold">Contoh (Klik untuk Bina)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  {
                    series: 'Alkana (Tepu)',
                    formula: 'CₙH₂ₙ₊₂',
                    group: 'Ikatan tunggal —C—C—',
                    props: 'Tidak larut dalam air, larut pelarut organik; bukan konduktor elektrik.',
                    sampleId: 'etana',
                  },
                  {
                    series: 'Alkena (Tak Tepu)',
                    formula: 'CₙH₂ₙ',
                    group: 'Ikatan ganda dua >C═C<',
                    props: 'Tidak larut dalam air; takat didih rendah & meningkat mengikut saiz molekul.',
                    sampleId: 'etena',
                  },
                  {
                    series: 'Alkuna (Tak Tepu)',
                    formula: 'CₙH₂ₙ₋₂',
                    group: 'Ikatan ganda tiga —C≡C—',
                    props: 'Tidak larut dalam air; hidrokarbon tak tepu yang menyahwarnakan air bromin.',
                    sampleId: 'etuna',
                  },
                  {
                    series: 'Alkohol (Bukan Hidrokarbon)',
                    formula: 'CₙH₂ₙ₊₁OH',
                    group: 'Kumpulan hidroksil, —OH',
                    props: 'Metanol/etanol/propanol terlarut campur dalam air; tidak konduksi elektrik.',
                    sampleId: 'etanol',
                  },
                  {
                    series: 'Asid Karboksilik',
                    formula: 'CₙH₂ₙ₊₁COOH',
                    group: 'Kumpulan karboksil, —COOH',
                    props: 'Asid metanoik–propanoik larut dalam air; mengion separa (konduktor lemah).',
                    sampleId: 'asid-etanoik',
                  },
                  {
                    series: 'Ester',
                    formula: 'CₘH₂ₘ₊₁COOCₙH₂ₙ₊₁',
                    group: 'Kumpulan karboksilat, —COO—',
                    props: 'Tidak larut dalam air (terapung), mudah meruap & berbau wangi buah-buahan.',
                    sampleId: 'etil-etanoat',
                  },
                  {
                    series: 'Halogenoalkana (Cl / Br / I)',
                    formula: 'CₙH₂ₙ₊₁X',
                    group: 'Kumpulan halo (—Cl, —Br, —I)',
                    props: 'Terhasil melalui penukargantian alkana (UV) atau penambahan alkena + Br₂.',
                    sampleId: '1-2-dibromoetana',
                  },
                  {
                    series: 'Amina (Bernitrogen)',
                    formula: 'CₙH₂ₙ₊₁NH₂',
                    group: 'Kumpulan amino, —NH₂',
                    props: 'Larut dalam air membentuk alkali lemah; atom N membentuk 3 ikatan kovalen.',
                    sampleId: 'metilamina',
                  },
                ].map((row) => {
                  const sample = CARBON_COMPOUNDS.find((c) => c.id === row.sampleId);
                  return (
                    <tr key={row.series} className="hover:bg-slate-50">
                      <td className="p-2 font-bold text-slate-900">{row.series}</td>
                      <td className="p-2 font-mono font-bold text-indigo-800">{row.formula}</td>
                      <td className="p-2 font-semibold text-amber-900">{row.group}</td>
                      <td className="p-2 text-slate-700">{row.props}</td>
                      <td className="p-2">
                        {sample && (
                          <button
                            type="button"
                            onClick={() => {
                              applyCompoundToSandbox(sample);
                              setActiveTab('pembina');
                            }}
                            className="px-2 py-1 rounded bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 font-bold text-[11px] cursor-pointer"
                          >
                            {sample.name} ({sample.molecularFormula})
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-950 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Cabaran Minda KSSM (m.s. 76):</strong> Apabila melukis formula struktur alkohol (contohnya etanol), ikatan daripada atom karbon mesti bersambung terus ke atom <strong>O</strong> (—C—O—H), bukan ke atom H (—C—HO salah kerana H hanya boleh membentuk 1 ikatan kovalen!).
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
