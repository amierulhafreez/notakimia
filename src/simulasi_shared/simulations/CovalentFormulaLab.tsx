import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Atom,
  RotateCcw,
  Shuffle,
  Sparkles,
  Flame,
  Zap,
  Droplets,
  Layers,
  BookOpen,
  Eye,
  X,
  ArrowRight,
  Info,
} from 'lucide-react';
import {
  ELEMENTS_PALETTE,
  ElementPickDef,
  synthesizeCompound,
  SynthesisOutcome,
} from '../data/chemicalBonding';
import {
  IonicBondDiagramSVG,
  CovalentBondDiagramSVG,
  LewisStructureSVG,
} from '../components/BondDiagramSVG';
import {
  TextbookAtomDiagram,
  ElectronShellBreakdown,
} from '../components/TextbookAtomDiagram';
import { analytics } from '../services/analytics';

const SIM_ID = 'penghasilan-sebatian-kovalen';

interface PresetPair {
  idA: string;
  idB: string;
  label: string;
  tag: 'ion' | 'kovalen' | 'gergasi';
}

const PRESET_PAIRS: PresetPair[] = [
  { idA: 'na', idB: 'f', label: 'Na + F', tag: 'ion' },
  { idA: 'mg', idB: 'cl', label: 'Mg + Cl', tag: 'ion' },
  { idA: 'al', idB: 'o', label: 'Al + O', tag: 'ion' },
  { idA: 'ca', idB: 'n', label: 'Ca + N', tag: 'ion' },
  { idA: 'h', idB: 'o', label: 'H + O', tag: 'kovalen' },
  { idA: 'c', idB: 'o', label: 'C + O', tag: 'kovalen' },
  { idA: 'n', idB: 'n', label: 'N + N', tag: 'kovalen' },
  { idA: 'si', idB: 'o', label: 'Si + O', tag: 'gergasi' },
];

type DiagramTab = 'bond' | 'atoms' | 'details';

const METAL_ELEMENTS = ELEMENTS_PALETTE.filter((el) => el.category === 'metal');
const NONMETAL_ELEMENTS = ELEMENTS_PALETTE.filter((el) => el.category === 'nonmetal');

function findElement(id: string | null): ElementPickDef | null {
  if (!id) return null;
  const low = id.toLowerCase();
  return ELEMENTS_PALETTE.find((el) => el.id === low || el.symbol.toLowerCase() === low) ?? null;
}

export const CovalentFormulaLab: React.FC = () => {
  const [slotAId, setSlotAId] = useState<string | null>('mg');
  const [slotBId, setSlotBId] = useState<string | null>('cl');
  const [activeTargetSlot, setActiveTargetSlot] = useState<'A' | 'B'>('A');
  const [dragOverSlot, setDragOverSlot] = useState<'A' | 'B' | null>(null);
  const [diagramTab, setDiagramTab] = useState<DiagramTab>('bond');
  const [exploredKeys, setExploredKeys] = useState<string[]>(['cl-mg']);
  const [completionRecorded, setCompletionRecorded] = useState(false);

  const atomA = useMemo(() => findElement(slotAId), [slotAId]);
  const atomB = useMemo(() => findElement(slotBId), [slotBId]);

  const outcome: SynthesisOutcome | null = useMemo(() => {
    if (!atomA || !atomB) return null;
    return synthesizeCompound(atomA, atomB);
  }, [atomA, atomB]);

  useEffect(() => {
    analytics.recordSimulationClick(SIM_ID, 1);
  }, []);

  useEffect(() => {
    if (!atomA || !atomB || !outcome) return;
    const key = [atomA.id, atomB.id].sort().join('-');
    setExploredKeys((prev) => {
      if (prev.includes(key)) return prev;
      const next = [...prev, key];
      if (next.length >= 4 && !completionRecorded) {
        setCompletionRecorded(true);
        analytics.recordSimulationCompleted(SIM_ID);
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.65 },
        });
      }
      return next;
    });
  }, [atomA, atomB, outcome, completionRecorded]);

  // Pengendalian Pick & Click
  const handlePickElement = (elId: string) => {
    if (!slotAId) {
      setSlotAId(elId);
      setActiveTargetSlot('B');
      return;
    }
    if (!slotBId) {
      setSlotBId(elId);
      setActiveTargetSlot('A');
      return;
    }
    if (activeTargetSlot === 'A') {
      setSlotAId(elId);
      setActiveTargetSlot('B');
    } else {
      setSlotBId(elId);
      setActiveTargetSlot('A');
    }
  };

  // Pengendalian Drag & Drop
  const handleDragStart = (e: React.DragEvent, elId: string) => {
    e.dataTransfer.setData('text/plain', elId);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDropToSlot = (e: React.DragEvent, slot: 'A' | 'B') => {
    e.preventDefault();
    setDragOverSlot(null);
    const elId = e.dataTransfer.getData('text/plain');
    if (!findElement(elId)) return;
    if (slot === 'A') {
      setSlotAId(elId);
      setActiveTargetSlot('B');
    } else {
      setSlotBId(elId);
      setActiveTargetSlot('A');
    }
  };

  const handleSelectPreset = (idA: string, idB: string) => {
    setSlotAId(idA);
    setSlotBId(idB);
    setDiagramTab('bond');
  };

  const handleRandomPair = () => {
    const idxA = Math.floor(Math.random() * ELEMENTS_PALETTE.length);
    const idxB = Math.floor(Math.random() * ELEMENTS_PALETTE.length);
    setSlotAId(ELEMENTS_PALETTE[idxA].id);
    setSlotBId(ELEMENTS_PALETTE[idxB].id);
    setDiagramTab('bond');
  };

  const handleClear = () => {
    setSlotAId(null);
    setSlotBId(null);
    setActiveTargetSlot('A');
  };

  // Warna lencana jenis sebatian
  const getOutcomeBadge = (res: SynthesisOutcome) => {
    if (res.kind === 'ionic') {
      return {
        label: 'Sebatian Ion',
        sub: res.bondLabel,
        bg: 'bg-amber-100 text-amber-900 border-amber-300',
        cardBg: 'from-amber-50 to-orange-50 border-amber-200',
        formulaColor: 'text-amber-900',
      };
    }
    if (res.kind === 'covalent') {
      if (res.isGiantCovalent) {
        return {
          label: 'Sebatian Kovalen (Molekul Gergasi)',
          sub: 'Rangkaian Kovalen Gergasi 3D',
          bg: 'bg-purple-100 text-purple-900 border-purple-300',
          cardBg: 'from-purple-50 to-indigo-50 border-purple-200',
          formulaColor: 'text-purple-900',
        };
      }
      return {
        label: 'Sebatian Kovalen',
        sub: res.bondTypeLabel,
        bg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
        cardBg: 'from-indigo-50 to-sky-50 border-indigo-200',
        formulaColor: 'text-indigo-900',
      };
    }
    return {
      label:
        res.kind === 'no-compound-metals'
          ? 'Ikatan Logam / Aloi (Tiada Sebatian Ion/Kovalen)'
          : 'Sebatian Khas / Molekul Bukan Oktet Biasa',
      sub: res.bondLabel,
      bg: 'bg-slate-100 text-slate-800 border-slate-300',
      cardBg: 'from-slate-50 to-blue-50 border-slate-200',
      formulaColor: 'text-slate-900',
    };
  };

  const activePhysicalProps =
    outcome && 'physicalProps' in outcome ? outcome.physicalProps : undefined;

  return (
    <div className="flex flex-col gap-2.5 text-slate-800">
      {/* BARIS ATAS: Contoh Pantas + Rawak + Statistik Terokai */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mr-1">
            Contoh Pantas:
          </span>
          {PRESET_PAIRS.map((p) => {
            const isActive =
              (slotAId === p.idA && slotBId === p.idB) ||
              (slotAId === p.idB && slotBId === p.idA);
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => handleSelectPreset(p.idA, p.idB)}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                  isActive
                    ? p.tag === 'ion'
                      ? 'bg-amber-600 text-white border-amber-700 shadow-sm'
                      : p.tag === 'gergasi'
                      ? 'bg-purple-600 text-white border-purple-700 shadow-sm'
                      : 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Diterokai: {exploredKeys.length} sebatian
          </span>
          <button
            type="button"
            onClick={handleRandomPair}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-[11px] font-bold transition"
            title="Pilih dua unsur secara rawak"
          >
            <Shuffle className="w-3.5 h-3.5" />
            Rawak
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 text-[11px] font-bold transition"
            title="Kosongkan slot"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Kosongkan
          </button>
        </div>
      </div>

      {/* GRID UTAMA: Kiri (Bank Unsur Pick & Drop) | Kanan (Zon Drop + Rajah + Sifat Fizik) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        {/* KOLUM KIRI: BANK UNSUR */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm flex flex-col gap-2.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <div>
              <h3 className="text-xs font-extrabold text-slate-900">
                Bank Unsur (Pick & Drop)
              </h3>
              <p className="text-[10.5px] text-slate-500">
                Seret ke kotak Atom 1 / Atom 2, atau klik untuk pilih ke slot{' '}
                <span className="font-bold text-indigo-700">Atom {activeTargetSlot === 'A' ? '1' : '2'}</span>.
              </p>
            </div>
          </div>

          {/* LOGAM */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                Logam (Penderma Elektron)
              </span>
              <span className="text-[10px] font-semibold text-slate-400">
                {METAL_ELEMENTS.length} unsur
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {METAL_ELEMENTS.map((el) => {
                const selectedInA = slotAId === el.id;
                const selectedInB = slotBId === el.id;
                return (
                  <button
                    key={el.id}
                    type="button"
                    draggable
                    onDragStart={(e) => handleDragStart(e, el.id)}
                    onClick={() => handlePickElement(el.id)}
                    className={`group flex items-center gap-2 p-1.5 rounded-lg border text-left transition-all cursor-grab active:cursor-grabbing ${
                      selectedInA || selectedInB
                        ? 'bg-amber-50 border-amber-400 ring-1 ring-amber-300 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-amber-50/40'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300 flex flex-col items-center justify-center shrink-0">
                      <span className="text-xs font-black text-amber-950 leading-none">
                        {el.symbol}
                      </span>
                      <span className="text-[8.5px] font-bold text-amber-700 leading-none mt-0.5">
                        Z={el.protonNumber}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11px] font-bold text-slate-800 truncate">
                          {el.name}
                        </span>
                        {(selectedInA || selectedInB) && (
                          <span className="text-[8.5px] font-black px-1 rounded bg-amber-600 text-white">
                            {selectedInA && selectedInB ? '1&2' : selectedInA ? '1' : '2'}
                          </span>
                        )}
                      </div>
                      <div className="text-[9.5px] font-mono font-semibold text-slate-500">
                        {el.electronConfig} • {el.shells.length}P
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* BUKAN LOGAM */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                Bukan Logam (Penerima / Kongsi e⁻)
              </span>
              <span className="text-[10px] font-semibold text-slate-400">
                {NONMETAL_ELEMENTS.length} unsur
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {NONMETAL_ELEMENTS.map((el) => {
                const selectedInA = slotAId === el.id;
                const selectedInB = slotBId === el.id;
                return (
                  <button
                    key={el.id}
                    type="button"
                    draggable
                    onDragStart={(e) => handleDragStart(e, el.id)}
                    onClick={() => handlePickElement(el.id)}
                    className={`group flex items-center gap-2 p-1.5 rounded-lg border text-left transition-all cursor-grab active:cursor-grabbing ${
                      selectedInA || selectedInB
                        ? 'bg-rose-50 border-rose-400 ring-1 ring-rose-300 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-rose-100 border border-rose-300 flex flex-col items-center justify-center shrink-0">
                      <span className="text-xs font-black text-rose-950 leading-none">
                        {el.symbol}
                      </span>
                      <span className="text-[8.5px] font-bold text-rose-700 leading-none mt-0.5">
                        Z={el.protonNumber}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11px] font-bold text-slate-800 truncate">
                          {el.name}
                        </span>
                        {(selectedInA || selectedInB) && (
                          <span className="text-[8.5px] font-black px-1 rounded bg-rose-600 text-white">
                            {selectedInA && selectedInB ? '1&2' : selectedInA ? '1' : '2'}
                          </span>
                        )}
                      </div>
                      <div className="text-[9.5px] font-mono font-semibold text-slate-500">
                        {el.electronConfig} • {el.shells.length}P
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legenda Ringkas */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 flex items-center justify-between text-[10px] font-semibold text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-amber-700 inline-block" />
              Elektron Atom 1 / Logam
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="text-rose-600 font-black text-xs leading-none">×</span>
              Elektron Atom 2 / Bukan Logam
            </span>
          </div>
        </div>

        {/* KOLUM KANAN: ZON PICK & DROP + BANNER + RAJAH + SIFAT FIZIK */}
        <div className="lg:col-span-8 flex flex-col gap-2.5">
          {/* BARIS 1: SLOT ATOM 1 & 2 + HASIL SEBATIAN */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
            {/* Kotak Drop Atom 1 + Atom 2 */}
            <div className="md:col-span-6 bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm flex items-center gap-2">
              {/* Slot A */}
              <div
                onClick={() => setActiveTargetSlot('A')}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverSlot('A');
                }}
                onDragLeave={() => setDragOverSlot(null)}
                onDrop={(e) => handleDropToSlot(e, 'A')}
                className={`flex-1 min-w-0 rounded-xl border-2 border-dashed p-2 cursor-pointer transition-all relative ${
                  dragOverSlot === 'A'
                    ? 'border-indigo-500 bg-indigo-50/70 scale-[1.01]'
                    : activeTargetSlot === 'A'
                    ? 'border-amber-400 bg-amber-50/40'
                    : 'border-slate-300 bg-slate-50/60 hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-500">
                    Atom 1 {activeTargetSlot === 'A' ? '• Aktif' : ''}
                  </span>
                  {atomA && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSlotAId(null);
                        setActiveTargetSlot('A');
                      }}
                      className="text-slate-400 hover:text-rose-600"
                      title="Keluarkan Atom 1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                {atomA ? (
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm border shrink-0 ${
                        atomA.category === 'metal'
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : 'bg-rose-100 text-rose-900 border-rose-300'
                      }`}
                    >
                      {atomA.symbol}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-extrabold text-slate-900 truncate">
                        {atomA.name}
                      </div>
                      <div className="text-[10px] font-mono text-slate-600">
                        {atomA.electronConfig} ({atomA.shells.length} petala)
                      </div>
                      <div className="text-[9.5px] font-semibold text-slate-500">
                        {atomA.category === 'metal' ? 'Logam' : 'Bukan Logam'}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-[46px] flex items-center justify-center text-center text-[11px] font-semibold text-slate-400">
                    Seret atau klik unsur di kiri
                  </div>
                )}
              </div>

              <span className="text-slate-400 font-black text-sm shrink-0">+</span>

              {/* Slot B */}
              <div
                onClick={() => setActiveTargetSlot('B')}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverSlot('B');
                }}
                onDragLeave={() => setDragOverSlot(null)}
                onDrop={(e) => handleDropToSlot(e, 'B')}
                className={`flex-1 min-w-0 rounded-xl border-2 border-dashed p-2 cursor-pointer transition-all relative ${
                  dragOverSlot === 'B'
                    ? 'border-indigo-500 bg-indigo-50/70 scale-[1.01]'
                    : activeTargetSlot === 'B'
                    ? 'border-rose-400 bg-rose-50/40'
                    : 'border-slate-300 bg-slate-50/60 hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-500">
                    Atom 2 {activeTargetSlot === 'B' ? '• Aktif' : ''}
                  </span>
                  {atomB && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSlotBId(null);
                        setActiveTargetSlot('B');
                      }}
                      className="text-slate-400 hover:text-rose-600"
                      title="Keluarkan Atom 2"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                {atomB ? (
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm border shrink-0 ${
                        atomB.category === 'metal'
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : 'bg-rose-100 text-rose-900 border-rose-300'
                      }`}
                    >
                      {atomB.symbol}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-extrabold text-slate-900 truncate">
                        {atomB.name}
                      </div>
                      <div className="text-[10px] font-mono text-slate-600">
                        {atomB.electronConfig} ({atomB.shells.length} petala)
                      </div>
                      <div className="text-[9.5px] font-semibold text-slate-500">
                        {atomB.category === 'metal' ? 'Logam' : 'Bukan Logam'}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-[46px] flex items-center justify-center text-center text-[11px] font-semibold text-slate-400">
                    Seret atau klik unsur di kiri
                  </div>
                )}
              </div>
            </div>

            {/* Banner Sebatian Terhasil */}
            <div className="md:col-span-6">
              {outcome ? (
                (() => {
                  const style = getOutcomeBadge(outcome);
                  const formulaDisplay =
                    outcome.kind === 'ionic' || outcome.kind === 'covalent'
                      ? outcome.formula
                      : outcome.formula ?? `${outcome.elA.symbol} + ${outcome.elB.symbol}`;
                  const nameDisplay =
                    outcome.kind === 'ionic' || outcome.kind === 'covalent'
                      ? outcome.compoundName
                      : outcome.compoundName ?? outcome.title;
                  return (
                    <div
                      className={`h-full rounded-xl border bg-gradient-to-br p-2.5 shadow-sm flex items-center justify-between gap-3 ${style.cardBg}`}
                    >
                      <div className="min-w-0">
                        <span
                          className={`inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-full border mb-1 ${style.bg}`}
                        >
                          {style.label}
                        </span>
                        <h3 className="text-sm font-extrabold text-slate-900 truncate">
                          {nameDisplay}
                        </h3>
                        <p className="text-[11px] font-semibold text-slate-600 truncate">
                          {style.sub}
                        </p>
                      </div>
                      <div className="bg-white/90 border border-white rounded-xl px-3 py-1.5 shadow-inner shrink-0 text-center">
                        <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          Formula
                        </div>
                        <div
                          className={`text-xl font-black tracking-tight ${style.formulaColor}`}
                        >
                          {formulaDisplay}
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="h-full rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 flex items-center justify-center text-center text-xs text-slate-500 font-semibold">
                  Pilih dua unsur untuk mensintesis sebatian ion atau kovalen secara automatik.
                </div>
              )}
            </div>
          </div>

          {/* BARIS 2: PANEL DIAGRAM IKATAN & MEKANISME */}
          {outcome && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              {/* Bar Tab */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setDiagramTab('bond')}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11.5px] font-bold transition ${
                      diagramTab === 'bond'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-200/70'
                    }`}
                  >
                    <Atom className="w-3.5 h-3.5" />
                    Rajah Ikatan & Petala
                  </button>
                  <button
                    type="button"
                    onClick={() => setDiagramTab('atoms')}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11.5px] font-bold transition ${
                      diagramTab === 'atoms'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-200/70'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Struktur Atom Asal
                  </button>
                  <button
                    type="button"
                    onClick={() => setDiagramTab('details')}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11.5px] font-bold transition ${
                      diagramTab === 'details'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-200/70'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    {outcome.kind === 'covalent'
                      ? 'Struktur Lewis & Penerangan'
                      : 'Persamaan Setengah & Penerangan'}
                  </button>
                </div>

                {outcome.kind === 'ionic' && (
                  <span className="text-[10.5px] font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                    {outcome.overallEquation}
                  </span>
                )}
                {outcome.kind === 'covalent' && (
                  <span className="text-[10.5px] font-mono font-bold text-indigo-800 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                    Struktur: {outcome.lewisLineFormula}
                  </span>
                )}
              </div>

              {/* Kandungan Tab */}
              <div className="p-2.5">
                {diagramTab === 'bond' && (
                  <div>
                    {outcome.kind === 'ionic' && <IonicBondDiagramSVG result={outcome} />}
                    {outcome.kind === 'covalent' && (
                      <div>
                        <CovalentBondDiagramSVG result={outcome} />
                        {outcome.isGiantCovalent && (
                          <div className="mt-1.5 px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200 text-[11px] font-semibold text-purple-900 flex items-center gap-2">
                            <Info className="w-4 h-4 text-purple-600 shrink-0" />
                            <span>
                              Silikon dioksida (SiO₂) wujud sebagai{' '}
                              <strong>molekul kovalen gergasi</strong> 3D (setiap atom Si
                              terikat secara kovalen kepada 4 atom O dalam kekisi berterusan),
                              bukan molekul ringkas yang terasing.
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    {(outcome.kind === 'no-compound-metals' ||
                      outcome.kind === 'special-non-octet') && (
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="flex items-start gap-2.5">
                          <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-extrabold text-slate-900">
                              {outcome.title}
                            </h4>
                            <p className="text-xs text-slate-600">{outcome.subtitle}</p>
                          </div>
                        </div>
                        <ul className="space-y-1 text-xs text-slate-700 pl-7 list-disc">
                          {outcome.explanationSteps.map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Ringkasan Pantas Mekanisme 1-baris di bawah Rajah */}
                    {(outcome.kind === 'ionic' || outcome.kind === 'covalent') && (
                      <div className="mt-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 flex items-center justify-between gap-2 text-[11px] text-slate-700">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <ArrowRight className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                          <span className="truncate font-medium">
                            {outcome.explanationSteps[outcome.explanationSteps.length - 1]}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setDiagramTab('details')}
                          className="text-indigo-600 font-bold hover:underline shrink-0"
                        >
                          Lihat Penuh →
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {diagramTab === 'atoms' && atomA && atomB && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { el: atomA, label: 'Atom 1', accent: '#d97706', fill: '#fffbeb' },
                      { el: atomB, label: 'Atom 2', accent: '#e11d48', fill: '#fff1f2' },
                    ].map(({ el, label, accent, fill }) => (
                      <div
                        key={label}
                        className="border border-slate-200 rounded-xl p-2.5 bg-slate-50/50 flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-slate-900">
                            {label}: {el.name} ({el.symbol})
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                            {el.category === 'metal' ? 'Logam' : 'Bukan Logam'}
                          </span>
                        </div>
                        <div className="flex items-center justify-center bg-white rounded-lg border border-slate-100 py-1.5">
                          <TextbookAtomDiagram
                            symbol={el.symbol}
                            shells={el.shells}
                            protonNumber={el.protonNumber}
                            neutronNumber={el.neutronNumber}
                            variant="electron-arrangement"
                            accentColor={accent}
                            nucleusFill={fill}
                            className="w-36 h-36"
                          />
                        </div>
                        <ElectronShellBreakdown
                          shells={el.shells}
                          protonNumber={el.protonNumber}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {diagramTab === 'details' && (
                  <div className="space-y-2.5">
                    {outcome.kind === 'covalent' && (
                      <LewisStructureSVG result={outcome} />
                    )}

                    {outcome.kind === 'ionic' && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
                          <div className="text-[10px] font-extrabold uppercase text-amber-800">
                            Setengah Persamaan Kation
                          </div>
                          <div className="text-xs font-mono font-bold text-slate-900 mt-0.5">
                            {outcome.halfEqMetal}
                          </div>
                        </div>
                        <div className="bg-rose-50 border border-rose-200 rounded-lg p-2">
                          <div className="text-[10px] font-extrabold uppercase text-rose-800">
                            Setengah Persamaan Anion
                          </div>
                          <div className="text-xs font-mono font-bold text-slate-900 mt-0.5">
                            {outcome.halfEqNonmetal}
                          </div>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2">
                          <div className="text-[10px] font-extrabold uppercase text-emerald-800">
                            Persamaan Keseluruhan
                          </div>
                          <div className="text-xs font-mono font-bold text-slate-900 mt-0.5">
                            {outcome.overallEquation}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                      <div className="text-[11px] font-extrabold text-slate-800 mb-1">
                        Penerangan Pembentukan Ikatan (Skema KSSM):
                      </div>
                      <ol className="list-decimal list-inside space-y-1 text-xs text-slate-700 leading-relaxed">
                        {outcome.explanationSteps.map((s, idx) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* BARIS 3: 4 KAD SIFAT FIZIK SEBATIAN */}
          {activePhysicalProps && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
              <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm">
                <div className="flex items-center gap-1.5 text-slate-800 font-extrabold text-[11px] mb-1">
                  <Layers className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  Keadaan & Struktur
                </div>
                <div className="text-xs font-bold text-slate-900">
                  {activePhysicalProps.physicalState}
                </div>
                <p className="text-[10.5px] text-slate-600 mt-0.5 leading-snug">
                  {activePhysicalProps.structureType}
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm">
                <div className="flex items-center gap-1.5 text-slate-800 font-extrabold text-[11px] mb-1">
                  <Flame className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  Takat Lebur & Didih
                </div>
                <div className="text-xs font-bold text-slate-900">
                  {activePhysicalProps.meltingBoilingPoint}
                </div>
                <p className="text-[10.5px] text-slate-600 mt-0.5 leading-snug">
                  {activePhysicalProps.meltingReason}
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm">
                <div className="flex items-center gap-1.5 text-slate-800 font-extrabold text-[11px] mb-1">
                  <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  Kekonduksian Elektrik
                </div>
                <div className="text-xs font-bold text-slate-900">
                  {activePhysicalProps.electricalConductivity}
                </div>
                <p className="text-[10.5px] text-slate-600 mt-0.5 leading-snug">
                  {activePhysicalProps.conductivityReason}
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm">
                <div className="flex items-center gap-1.5 text-slate-800 font-extrabold text-[11px] mb-1">
                  <Droplets className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  Keterlarutan
                </div>
                <div className="text-xs font-bold text-slate-900">
                  {activePhysicalProps.solubility}
                </div>
                <p className="text-[10.5px] text-slate-600 mt-0.5 leading-snug">
                  {activePhysicalProps.solubilityNote}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
