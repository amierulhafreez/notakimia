export type HomologousSeries = 'alkana' | 'alkena' | 'alkohol';
export type CarbonCount = 4 | 5 | 6 | 7;
export type BranchSize = 1 | 2; // 1 = -CH3 (metil), 2 = -C2H5 (etil)

export interface PlacedBranch {
  id: string;
  slotIndex: number; // 0 .. mainChainLen - 1
  size: BranchSize;
}

export interface BuilderState {
  series: HomologousSeries;
  totalCarbons: CarbonCount;
  mainChainLen: number;
  doubleBondIdx: number | null; // index i means C_i = C_{i+1}, valid 0 .. mainChainLen - 2
  ohSlotIdx: number | null; // carbon index carrying -OH, valid 0 .. mainChainLen - 1
  branches: PlacedBranch[];
}

export interface SeriesMeta {
  id: HomologousSeries;
  label: string;
  suffix: string;
  generalFormula: string;
  functionalGroupLabel: string;
  accentHex: string;
}

export const SERIES_META: Record<HomologousSeries, SeriesMeta> = {
  alkana: {
    id: 'alkana',
    label: 'Alkana',
    suffix: '-ana',
    generalFormula: 'CₙH₂ₙ₊₂',
    functionalGroupLabel: 'Ikatan tunggal C—C (Hidrokarbon tepu)',
    accentHex: '#4f46e5',
  },
  alkena: {
    id: 'alkena',
    label: 'Alkena',
    suffix: '-ena',
    generalFormula: 'CₙH₂ₙ',
    functionalGroupLabel: 'Ikatan ganda dua C═C (Hidrokarbon tak tepu)',
    accentHex: '#0284c7',
  },
  alkohol: {
    id: 'alkohol',
    label: 'Alkohol',
    suffix: '-ol',
    generalFormula: 'CₙH₂ₙ₊₁OH',
    functionalGroupLabel: 'Kumpulan hidroksil —OH (Bukan hidrokarbon)',
    accentHex: '#059669',
  },
};

export const CARBON_COUNTS: CarbonCount[] = [4, 5, 6, 7];

const SUBSCRIPTS: Record<string, string> = {
  '0': '₀',
  '1': '₁',
  '2': '₂',
  '3': '₃',
  '4': '₄',
  '5': '₅',
  '6': '₆',
  '7': '₇',
  '8': '₈',
  '9': '₉',
};

function toSub(n: number): string {
  return String(n)
    .split('')
    .map((c) => SUBSCRIPTS[c] ?? c)
    .join('');
}

export function getMolecularFormula(series: HomologousSeries, totalCarbons: CarbonCount): string {
  if (series === 'alkana') {
    return `C${toSub(totalCarbons)}H${toSub(2 * totalCarbons + 2)}`;
  }
  if (series === 'alkena') {
    return `C${toSub(totalCarbons)}H${toSub(2 * totalCarbons)}`;
  }
  return `C${toSub(totalCarbons)}H${toSub(2 * totalCarbons + 1)}OH`;
}

export function getMolecularFormulaParts(
  series: HomologousSeries,
  totalCarbons: CarbonCount
): Array<{ text: string; sub?: string }> {
  if (series === 'alkana') {
    return [
      { text: 'C', sub: String(totalCarbons) },
      { text: 'H', sub: String(2 * totalCarbons + 2) },
    ];
  }
  if (series === 'alkena') {
    return [
      { text: 'C', sub: String(totalCarbons) },
      { text: 'H', sub: String(2 * totalCarbons) },
    ];
  }
  return [
    { text: 'C', sub: String(totalCarbons) },
    { text: 'H', sub: String(2 * totalCarbons + 1) },
    { text: 'OH' },
  ];
}

const CHAIN_ROOTS: Record<number, string> = {
  1: 'met',
  2: 'et',
  3: 'prop',
  4: 'but',
  5: 'pent',
  6: 'heks',
  7: 'hept',
};

const MULTIPLIER_PREFIX: Record<number, string> = {
  1: '',
  2: 'di',
  3: 'tri',
  4: 'tetra',
};

function capitalizeFirst(s: string): string {
  const idx = s.search(/[a-zA-Z]/);
  if (idx === -1) return s;
  return s.slice(0, idx) + s.charAt(idx).toUpperCase() + s.slice(idx + 1);
}

export type IsomerClassification =
  | 'Rantai Lurus'
  | 'Isomer Rantai'
  | 'Isomer Kedudukan'
  | 'Isomer Rantai & Kedudukan';

export interface EvaluatedMolecule {
  status: 'valid' | 'incomplete' | 'chain_violation' | 'invalid_valency';
  iupacName: string | null;
  canonicalHash: string | null;
  actualMainChainLen: number;
  isomerType: IsomerClassification | null;
  message: string;
  explanation: string;
  /** Mapping from internal node index (0..mainChainLen-1 for backbone) to IUPAC carbon number 1..L (or null if on branch) */
  iupacNumberByBackboneSlot: Record<number, number>;
  /** H count remaining on each backbone slot 0..mainChainLen-1 */
  hydrogensBySlot: number[];
  /** Used valence on each backbone slot */
  valenceBySlot: number[];
  remainingBranchCarbons: number;
}

export interface CatalogIsomer {
  canonicalHash: string;
  iupacName: string;
  series: HomologousSeries;
  totalCarbons: CarbonCount;
  mainChainLen: number;
  isomerType: IsomerClassification;
  explanation: string;
  sampleState: BuilderState;
}

/** Internal carbon tree representation for graph canonicalization & IUPAC naming */
interface CarbonGraph {
  adj: number[][];
  doubleEdge: [number, number] | null; // two carbon indices forming C=C
  ohNode: number | null; // carbon index carrying -OH
  /** Map graph node id -> original backbone slot index (0..L-1) if on main backbone */
  nodeToBackboneSlot: Map<number, number>;
}

function buildGraphFromState(state: BuilderState): {
  graph: CarbonGraph;
  hydrogensBySlot: number[];
  valenceBySlot: number[];
  valencyError: string | null;
} {
  const L = state.mainChainLen;
  const adj: number[][] = Array.from({ length: L }, () => []);
  const nodeToBackboneSlot = new Map<number, number>();
  for (let i = 0; i < L; i++) {
    nodeToBackboneSlot.set(i, i);
  }

  for (let i = 0; i < L - 1; i++) {
    adj[i].push(i + 1);
    adj[i + 1].push(i);
  }

  let doubleEdge: [number, number] | null = null;
  if (state.series === 'alkena' && state.doubleBondIdx !== null) {
    const db = state.doubleBondIdx;
    if (db >= 0 && db < L - 1) {
      doubleEdge = [db, db + 1];
    }
  }

  const ohNode = state.series === 'alkohol' ? state.ohSlotIdx : null;

  // Add branch carbon atoms
  for (const br of state.branches) {
    const s = br.slotIndex;
    if (s < 0 || s >= L) continue;
    const c1 = adj.length;
    adj.push([s]);
    adj[s].push(c1);
    if (br.size === 2) {
      const c2 = adj.length;
      adj.push([c1]);
      adj[c1].push(c2);
    }
  }

  // Compute valences on backbone slots
  const valenceBySlot: number[] = [];
  const hydrogensBySlot: number[] = [];
  let valencyError: string | null = null;

  for (let i = 0; i < L; i++) {
    let used = adj[i].length; // all single C-C edges (backbone + branch roots)
    if (doubleEdge && (doubleEdge[0] === i || doubleEdge[1] === i)) {
      used += 1; // double bond extra bond
    }
    if (ohNode === i) {
      used += 1;
    }
    valenceBySlot.push(used);
    hydrogensBySlot.push(Math.max(0, 4 - used));
    if (used > 4 && !valencyError) {
      valencyError = `Karbon ke-${i + 1} melebihi had 4 ikatan kovalen (${used}/4 ikatan)! Sila alihkan cabang atau kumpulan berfungsi.`;
    }
  }

  return {
    graph: { adj, doubleEdge, ohNode, nodeToBackboneSlot },
    hydrogensBySlot,
    valenceBySlot,
    valencyError,
  };
}

function rootedSubtreeHash(adj: number[][], u: number, parent: number): string {
  const children = adj[u]
    .filter((v) => v !== parent)
    .map((v) => rootedSubtreeHash(adj, v, u))
    .sort();
  return `(${children.join('')})`;
}

export function computeCanonicalHash(graph: CarbonGraph): string {
  const { adj, doubleEdge, ohNode } = graph;
  const n = adj.length;

  if (doubleEdge) {
    const [u, v] = doubleEdge;
    const h1 = rootedSubtreeHash(adj, u, v);
    const h2 = rootedSubtreeHash(adj, v, u);
    return `alkena:${[h1, h2].sort().join('=')}`;
  }
  if (ohNode !== null) {
    return `alkohol:${rootedSubtreeHash(adj, ohNode, -1)}`;
  }
  let best = '';
  for (let u = 0; u < n; u++) {
    const h = rootedSubtreeHash(adj, u, -1);
    if (!best || h < best) best = h;
  }
  return `alkana:${best}`;
}

function findAllSimplePaths(adj: number[][]): number[][] {
  const n = adj.length;
  const paths: number[][] = [];
  const visited = new Array<boolean>(n).fill(false);

  function dfs(u: number, current: number[]) {
    paths.push([...current]);
    for (const v of adj[u]) {
      if (!visited[v]) {
        visited[v] = true;
        current.push(v);
        dfs(v, current);
        current.pop();
        visited[v] = false;
      }
    }
  }

  for (let start = 0; start < n; start++) {
    visited[start] = true;
    dfs(start, [start]);
    visited[start] = false;
  }
  return paths;
}

function subtreeSize(adj: number[][], u: number, parent: number): number {
  let count = 1;
  for (const v of adj[u]) {
    if (v !== parent) count += subtreeSize(adj, v, u);
  }
  return count;
}

interface NumberedPathAnalysis {
  path: number[];
  fgLocant: number; // 1-based locant of double bond start or -OH (0 for alkana)
  substituents: Array<{ locant: number; name: string }>;
  allLocantsSorted: number[];
  alphaKey: string;
  iupacName: string;
  explanation: string;
}

function analyzeOrientedPath(
  graph: CarbonGraph,
  series: HomologousSeries,
  path: number[]
): NumberedPathAnalysis | null {
  const L = path.length;
  const pathSet = new Set(path);
  const { adj, doubleEdge, ohNode } = graph;

  let fgLocant = 0;
  if (series === 'alkena' && doubleEdge) {
    const i1 = path.indexOf(doubleEdge[0]);
    const i2 = path.indexOf(doubleEdge[1]);
    if (i1 === -1 || i2 === -1 || Math.abs(i1 - i2) !== 1) return null;
    fgLocant = Math.min(i1, i2) + 1;
  } else if (series === 'alkohol' && ohNode !== null) {
    const idx = path.indexOf(ohNode);
    if (idx === -1) return null;
    fgLocant = idx + 1;
  }

  const substituents: Array<{ locant: number; name: string }> = [];
  for (let idx = 0; idx < L; idx++) {
    const u = path[idx];
    for (const v of adj[u]) {
      if (!pathSet.has(v)) {
        const size = subtreeSize(adj, v, u);
        const name = size === 1 ? 'metil' : size === 2 ? 'etil' : 'propil';
        substituents.push({ locant: idx + 1, name });
      }
    }
  }

  // Group substituents by name (etil, metil, propil sorted alphabetically)
  const grouped = new Map<string, number[]>();
  for (const sub of substituents) {
    const arr = grouped.get(sub.name) ?? [];
    arr.push(sub.locant);
    grouped.set(sub.name, arr);
  }

  const sortedNames = Array.from(grouped.keys()).sort((a, b) => a.localeCompare(b));
  const prefixParts: string[] = [];
  const explanationBranches: string[] = [];

  for (const name of sortedNames) {
    const locs = grouped.get(name)!.slice().sort((a, b) => a - b);
    const mult = MULTIPLIER_PREFIX[locs.length] ?? `${locs.length}-`;
    const locStr = locs.join(',');
    prefixParts.push(`${locStr}-${mult}${name}`);
    explanationBranches.push(`${locs.length}× ${name} di C-${locStr}`);
  }

  const prefix = prefixParts.join('-');
  const root = CHAIN_ROOTS[L] ?? `C${L}`;

  let parentWithSuffix = '';
  if (series === 'alkana') {
    parentWithSuffix = `${root}ana`;
  } else if (series === 'alkena') {
    // KSSM textbook omits -1- for propene (2-metilpropena)
    parentWithSuffix = L <= 3 ? `${root}ena` : `${root}-${fgLocant}-ena`;
  } else {
    parentWithSuffix = `${root}an-${fgLocant}-ol`;
  }

  const rawName = prefix ? `${prefix}${parentWithSuffix}` : parentWithSuffix;
  const iupacName = capitalizeFirst(rawName);

  const allLocantsSorted = substituents.map((s) => s.locant).sort((a, b) => a - b);
  const alphaKey = sortedNames
    .map((name) => `${name}:${grouped.get(name)!.slice().sort((a, b) => a - b).join(',')}`)
    .join(';');

  const expParts = [`Rantai induk: ${L} karbon (${root}${series === 'alkana' ? 'ana' : series === 'alkena' ? 'ena' : 'anol'})`];
  if (series === 'alkena' && L > 3) expParts.push(`C═C di C-${fgLocant}`);
  if (series === 'alkohol') expParts.push(`—OH di C-${fgLocant}`);
  if (explanationBranches.length > 0) expParts.push(`Cabang: ${explanationBranches.join(', ')}`);

  return {
    path,
    fgLocant,
    substituents,
    allLocantsSorted,
    alphaKey,
    iupacName,
    explanation: expParts.join(' • '),
  };
}

function compareNumberedAnalysis(a: NumberedPathAnalysis, b: NumberedPathAnalysis): number {
  // 1. Lowest functional group locant (for alkene / alcohol; 0 == 0 for alkane)
  if (a.fgLocant !== b.fgLocant) return a.fgLocant - b.fgLocant;
  // 2. Maximum number of substituents (IUPAC tie-breaker for equal length chains)
  if (a.substituents.length !== b.substituents.length) {
    return b.substituents.length - a.substituents.length;
  }
  // 3. Lowest locant set at first point of difference
  for (let i = 0; i < a.allLocantsSorted.length; i++) {
    if (a.allLocantsSorted[i] !== b.allLocantsSorted[i]) {
      return a.allLocantsSorted[i] - b.allLocantsSorted[i];
    }
  }
  // 4. Alphabetical / locant tie-breaker (etil gets lower number before metil)
  if (a.alphaKey !== b.alphaKey) return a.alphaKey.localeCompare(b.alphaKey);
  return a.iupacName.localeCompare(b.iupacName);
}

function classifyIsomerType(
  series: HomologousSeries,
  totalCarbons: number,
  actualMainChainLen: number,
  analysis: NumberedPathAnalysis
): IsomerClassification {
  const hasBranch = analysis.substituents.length > 0;
  if (series === 'alkana') {
    return hasBranch ? 'Isomer Rantai' : 'Rantai Lurus';
  }
  const hasPositionShift =
    actualMainChainLen < totalCarbons
      ? analysis.fgLocant > 1 && !(series === 'alkena' && actualMainChainLen <= 3)
      : analysis.fgLocant > 1;

  if (!hasBranch && !hasPositionShift) return 'Rantai Lurus';
  if (hasBranch && hasPositionShift) return 'Isomer Rantai & Kedudukan';
  if (hasBranch) return 'Isomer Rantai';
  return 'Isomer Kedudukan';
}

export function evaluateBuilderState(state: BuilderState): EvaluatedMolecule {
  const placedBranchCarbons = state.branches.reduce((acc, b) => acc + b.size, 0);
  const currentTotal = state.mainChainLen + placedBranchCarbons;
  const remainingBranchCarbons = state.totalCarbons - currentTotal;

  const { graph, hydrogensBySlot, valenceBySlot, valencyError } = buildGraphFromState(state);

  if (valencyError) {
    return {
      status: 'invalid_valency',
      iupacName: null,
      canonicalHash: null,
      actualMainChainLen: state.mainChainLen,
      isomerType: null,
      message: valencyError,
      explanation: 'Setiap atom karbon hanya boleh membentuk maksimum 4 ikatan kovalen.',
      iupacNumberByBackboneSlot: {},
      hydrogensBySlot,
      valenceBySlot,
      remainingBranchCarbons,
    };
  }

  if (remainingBranchCarbons !== 0) {
    return {
      status: 'incomplete',
      iupacName: null,
      canonicalHash: null,
      actualMainChainLen: state.mainChainLen,
      isomerType: null,
      message:
        remainingBranchCarbons > 0
          ? `Masih ada ${remainingBranchCarbons} atom karbon cabang (baki) yang belum diletakkan ke rantai utama.`
          : `Bilangan atom karbon (${currentTotal}) melebihi had ${state.totalCarbons} karbon.`,
      explanation: `Seret atau klik -CH₃ / -C₂H₅ daripada Kotak Alat untuk melengkapkan formula ${getMolecularFormula(
        state.series,
        state.totalCarbons
      )}.`,
      iupacNumberByBackboneSlot: {},
      hydrogensBySlot,
      valenceBySlot,
      remainingBranchCarbons,
    };
  }

  const paths = findAllSimplePaths(graph.adj);
  const validAnalyses: NumberedPathAnalysis[] = [];
  let maxLen = 0;

  for (const p of paths) {
    const an = analyzeOrientedPath(graph, state.series, p);
    if (!an) continue;
    if (p.length > maxLen) {
      maxLen = p.length;
      validAnalyses.length = 0;
      validAnalyses.push(an);
    } else if (p.length === maxLen) {
      validAnalyses.push(an);
    }
  }

  validAnalyses.sort(compareNumberedAnalysis);
  const best = validAnalyses[0];
  const canonicalHash = computeCanonicalHash(graph);

  const iupacNumberByBackboneSlot: Record<number, number> = {};
  if (best) {
    best.path.forEach((nodeId, idx) => {
      const slot = graph.nodeToBackboneSlot.get(nodeId);
      if (slot !== undefined) {
        iupacNumberByBackboneSlot[slot] = idx + 1;
      }
    });
  }

  if (maxLen !== state.mainChainLen) {
    return {
      status: 'chain_violation',
      iupacName: best?.iupacName ?? null,
      canonicalHash,
      actualMainChainLen: maxLen,
      isomerType: null,
      message: `Kekangan Rantai Terpanjang: Susunan ini menghasilkan rantai terpanjang ${maxLen} karbon (${best?.iupacName ?? ''}), bukan ${state.mainChainLen} karbon!`,
      explanation: `Elakkan meletakkan cabang pada karbon hujung (atau cabang -C₂H₅ terlalu dekat hujung). Pindahkan cabang ke karbon dalaman.`,
      iupacNumberByBackboneSlot,
      hydrogensBySlot,
      valenceBySlot,
      remainingBranchCarbons: 0,
    };
  }

  const isomerType = classifyIsomerType(state.series, state.totalCarbons, maxLen, best);

  return {
    status: 'valid',
    iupacName: best.iupacName,
    canonicalHash,
    actualMainChainLen: maxLen,
    isomerType,
    message: `Struktur sah untuk formula ${getMolecularFormula(state.series, state.totalCarbons)}.`,
    explanation: best.explanation,
    iupacNumberByBackboneSlot,
    hydrogensBySlot,
    valenceBySlot,
    remainingBranchCarbons: 0,
  };
}

/** Generate complete structural isomer catalog for (series, totalCarbons) */
function enumerateCatalogFor(series: HomologousSeries, totalCarbons: CarbonCount): CatalogIsomer[] {
  const results = new Map<string, CatalogIsomer>();

  for (let L = totalCarbons; L >= 3; L--) {
    const branchBudget = totalCarbons - L;

    // Generate all multisets of branches placed on internal positions 1 .. L-2
    // Wait: for alkenes/alcohols, C0 or C_{L-1} CANNOT take a branch without lengthening chain unless FG is absent—actually any branch on C0/C_{L-1} extends main chain (since L already contains FG!). So branches only ever attach at 1 .. L-2!
    const validStates: BuilderState[] = [];

    const fgVariants: Array<{ doubleBondIdx: number | null; ohSlotIdx: number | null }> = [];
    if (series === 'alkana') {
      fgVariants.push({ doubleBondIdx: null, ohSlotIdx: null });
    } else if (series === 'alkena') {
      for (let d = 0; d <= Math.floor((L - 2) / 2) + 1; d++) {
        if (d <= L - 2) fgVariants.push({ doubleBondIdx: d, ohSlotIdx: null });
      }
      // Include all positions 0 .. L-2 so branched asymmetry is covered
      fgVariants.length = 0;
      for (let d = 0; d <= L - 2; d++) {
        fgVariants.push({ doubleBondIdx: d, ohSlotIdx: null });
      }
    } else {
      for (let oh = 0; oh <= L - 1; oh++) {
        fgVariants.push({ doubleBondIdx: null, ohSlotIdx: oh });
      }
    }

    function genBranches(slot: number, rem: number, current: PlacedBranch[]) {
      if (rem === 0) {
        for (const fg of fgVariants) {
          validStates.push({
            series,
            totalCarbons,
            mainChainLen: L,
            doubleBondIdx: fg.doubleBondIdx,
            ohSlotIdx: fg.ohSlotIdx,
            branches: current.map((b) => ({ ...b })),
          });
        }
        return;
      }
      if (slot > L - 2) return;

      // Try 0 branches, 1 methyl, 2 methyls, 1 ethyl, or 1 ethyl + 1 methyl on this slot
      genBranches(slot + 1, rem, current);

      if (rem >= 1) {
        current.push({ id: `cat-${slot}-a`, slotIndex: slot, size: 1 });
        genBranches(slot + 1, rem - 1, current);
        current.pop();
      }
      if (rem >= 2) {
        current.push(
          { id: `cat-${slot}-a`, slotIndex: slot, size: 1 },
          { id: `cat-${slot}-b`, slotIndex: slot, size: 1 }
        );
        genBranches(slot + 1, rem - 2, current);
        current.pop();
        current.pop();

        // Single ethyl branch
        current.push({ id: `cat-${slot}-e`, slotIndex: slot, size: 2 });
        genBranches(slot + 1, rem - 2, current);
        current.pop();
      }
      if (rem >= 3) {
        // Ethyl + methyl on same carbon
        current.push(
          { id: `cat-${slot}-e`, slotIndex: slot, size: 2 },
          { id: `cat-${slot}-m`, slotIndex: slot, size: 1 }
        );
        genBranches(slot + 1, rem - 3, current);
        current.pop();
        current.pop();
      }
    }

    genBranches(1, branchBudget, []);

    for (const st of validStates) {
      const ev = evaluateBuilderState(st);
      if (
        ev.status === 'valid' &&
        ev.canonicalHash &&
        ev.iupacName &&
        ev.isomerType &&
        !results.has(ev.canonicalHash)
      ) {
        results.set(ev.canonicalHash, {
          canonicalHash: ev.canonicalHash,
          iupacName: ev.iupacName,
          series,
          totalCarbons,
          mainChainLen: L,
          isomerType: ev.isomerType,
          explanation: ev.explanation,
          sampleState: st,
        });
      }
    }
  }

  return Array.from(results.values()).sort((a, b) => {
    if (b.mainChainLen !== a.mainChainLen) return b.mainChainLen - a.mainChainLen;
    return a.iupacName.localeCompare(b.iupacName);
  });
}

const CATALOG_CACHE = new Map<string, CatalogIsomer[]>();

export function getCatalogFor(series: HomologousSeries, totalCarbons: CarbonCount): CatalogIsomer[] {
  const key = `${series}:${totalCarbons}`;
  let list = CATALOG_CACHE.get(key);
  if (!list) {
    list = enumerateCatalogFor(series, totalCarbons);
    CATALOG_CACHE.set(key, list);
  }
  return list;
}

export function getValidChainLengths(series: HomologousSeries, totalCarbons: CarbonCount): number[] {
  const catalog = getCatalogFor(series, totalCarbons);
  const lengths = Array.from(new Set(catalog.map((c) => c.mainChainLen)));
  return lengths.sort((a, b) => b - a);
}

export function createInitialBuilderState(
  series: HomologousSeries,
  totalCarbons: CarbonCount,
  mainChainLen: number
): BuilderState {
  const catalog = getCatalogFor(series, totalCarbons);
  const match = catalog.find((c) => c.mainChainLen === mainChainLen);
  if (match) {
    // Deep clone sampleState with fresh branch ids
    return {
      ...match.sampleState,
      branches: match.sampleState.branches.map((b, idx) => ({
        ...b,
        id: `br-${Date.now()}-${idx}`,
      })),
    };
  }
  return {
    series,
    totalCarbons,
    mainChainLen,
    doubleBondIdx: series === 'alkena' ? 0 : null,
    ohSlotIdx: series === 'alkohol' ? 0 : null,
    branches: [],
  };
}
