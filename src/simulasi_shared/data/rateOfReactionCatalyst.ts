export type CatalystSetId = 'none' | 'mno2' | 'fe' | 'cuo';

export interface CatalystSetSpec {
  id: CatalystSetId;
  shortLabel: string;
  label: string;
  formula: string;
  catalystMassG: number;
  textbookRef: string;
  splinterResult: string;
  splinterState: 'none' | 'dim' | 'glow' | 'relight';
  /** Bacaan isi padu O₂ (cm³) tepat pada t = 0, 10, 20, 30, 40, 50, 60 s (Jadual 7.8 m.s. 238) */
  volumeAtCheckpointsCm3: readonly [number, number, number, number, number, number, number];
  /** Nisbah ketinggian puncak tenaga pengaktifan (1.0 = Tanpa mangkin Eₐ, lebih kecil = Eₐ' lebih rendah) */
  eaRatio: number;
  eaLabel: string;
  powderColorHex: string;
  strokeHex: string;
}

export const CATALYST_CHECKPOINTS = [10, 20, 30, 40, 50, 60] as const;

export const EXPERIMENT_74_CONSTANTS = {
  peroxideVolumeText: '5.0 cm³ (Eks 7.4) / 50 cm³ (Jad 7.8)',
  peroxideStrength: '20-isipadu / 10-isipadu H₂O₂',
  catalystMassFixedG: 0.5,
  maxDurationSec: 60,
  theoreticalMaxO2Cm3: 100,
};

export const CATALYST_SETS: CatalystSetSpec[] = [
  {
    id: 'none',
    shortLabel: 'Tanpa Mangkin',
    label: 'Tabung Uji I (Tanpa Mangkin)',
    formula: 'H₂O₂ sahaja',
    catalystMassG: 0.0,
    textbookRef: 'Eksperimen 7.4 (m.s. 235)',
    splinterResult: 'Tidak menyala',
    splinterState: 'none',
    volumeAtCheckpointsCm3: [0, 0.8, 1.6, 2.4, 3.2, 4.1, 5.0],
    eaRatio: 1.0,
    eaLabel: 'Eₐ (tinggi)',
    powderColorHex: 'transparent',
    strokeHex: '#2563eb',
  },
  {
    id: 'mno2',
    shortLabel: 'MnO₂ (0.5 g)',
    label: 'Tabung Uji II: Mangan(IV) oksida, MnO₂',
    formula: 'MnO₂',
    catalystMassG: 0.5,
    textbookRef: 'Eks. 7.4 & Jadual 7.8 (m.s. 235, 238)',
    splinterResult: 'Menyala semula!',
    splinterState: 'relight',
    volumeAtCheckpointsCm3: [0, 57, 82, 93, 100, 100, 100],
    eaRatio: 0.52,
    eaLabel: "Eₐ' (paling rendah)",
    powderColorHex: '#1e293b',
    strokeHex: '#059669',
  },
  {
    id: 'fe',
    shortLabel: 'Fe (0.5 g)',
    label: 'Mangkin Alternatif: Ferum, Fe',
    formula: 'Fe',
    catalystMassG: 0.5,
    textbookRef: 'Jadual 7.8 (m.s. 238)',
    splinterResult: 'Bara bertambah terang',
    splinterState: 'glow',
    volumeAtCheckpointsCm3: [0, 33, 47, 55, 58, 59, 60],
    eaRatio: 0.68,
    eaLabel: "Eₐ' (sederhana rendah)",
    powderColorHex: '#64748b',
    strokeHex: '#d97706',
  },
  {
    id: 'cuo',
    shortLabel: 'CuO (0.5 g)',
    label: 'Mangkin Alternatif: Kuprum(II) oksida, CuO',
    formula: 'CuO',
    catalystMassG: 0.5,
    textbookRef: 'Jadual 7.8 (m.s. 238)',
    splinterResult: 'Bara malap / sedikit cerah',
    splinterState: 'dim',
    volumeAtCheckpointsCm3: [0, 12, 19, 25, 28, 30, 31],
    eaRatio: 0.82,
    eaLabel: "Eₐ' (sedikit rendah)",
    powderColorHex: '#27272a',
    strokeHex: '#dc2626',
  },
];

export const CATALYST_SET_MAP: Record<CatalystSetId, CatalystSetSpec> =
  Object.fromEntries(CATALYST_SETS.map((s) => [s.id, s])) as Record<
    CatalystSetId,
    CatalystSetSpec
  >;

/**
 * Mengira kecerunan tangen Fritsch-Carlson yang terjamin monotonik (tiada overshoot)
 * pada titik nod 0, 10, 20, 30, 40, 50, 60 s.
 */
function computeMonotoneSlopes(ys: readonly number[]): number[] {
  const n = ys.length;
  const h = 10;
  const d: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    d.push((ys[i + 1] - ys[i]) / h);
  }

  const m = new Array<number>(n).fill(0);
  for (let i = 1; i < n - 1; i++) {
    if (d[i - 1] <= 0 || d[i] <= 0) {
      m[i] = 0;
    } else {
      m[i] = (2 * d[i - 1] * d[i]) / (d[i - 1] + d[i]);
    }
  }
  m[0] = d[0] <= 0 ? 0 : Math.min(2.2 * d[0], Math.max(d[0], 1.45 * d[0] - 0.35 * m[1]));
  m[n - 1] = d[n - 2] <= 0 ? 0 : d[n - 2] * 0.5;

  for (let i = 0; i < n - 1; i++) {
    if (d[i] <= 0) {
      m[i] = 0;
      m[i + 1] = 0;
      continue;
    }
    const alpha = m[i] / d[i];
    const beta = m[i + 1] / d[i];
    const sq = alpha * alpha + beta * beta;
    if (sq > 9) {
      const tau = 3 / Math.sqrt(sq);
      m[i] = tau * alpha * d[i];
      m[i + 1] = tau * beta * d[i];
    }
  }
  return m;
}

const SLOPES_BY_ID: Record<CatalystSetId, number[]> = {
  none: computeMonotoneSlopes(CATALYST_SET_MAP.none.volumeAtCheckpointsCm3),
  mno2: computeMonotoneSlopes(CATALYST_SET_MAP.mno2.volumeAtCheckpointsCm3),
  fe: computeMonotoneSlopes(CATALYST_SET_MAP.fe.volumeAtCheckpointsCm3),
  cuo: computeMonotoneSlopes(CATALYST_SET_MAP.cuo.volumeAtCheckpointsCm3),
};

/**
 * Mengembalikan isi padu gas oksigen O₂ terkumpul (cm³) pada masa t (0..60 s).
 */
export function evaluateOxygenVolume(timeSec: number, id: CatalystSetId): number {
  const ys = CATALYST_SET_MAP[id].volumeAtCheckpointsCm3;
  const ms = SLOPES_BY_ID[id];
  const tClamped = Math.max(0, Math.min(EXPERIMENT_74_CONSTANTS.maxDurationSec, timeSec));
  if (tClamped === 0) return ys[0];
  if (tClamped >= EXPERIMENT_74_CONSTANTS.maxDurationSec) return ys[ys.length - 1];

  const idx = Math.min(ys.length - 2, Math.floor(tClamped / 10));
  const u = (tClamped - idx * 10) / 10;
  const h = 10;
  const h00 = 2 * u * u * u - 3 * u * u + 1;
  const h10 = u * u * u - 2 * u * u + u;
  const h01 = -2 * u * u * u + 3 * u * u;
  const h11 = u * u * u - u * u;

  const val = h00 * ys[idx] + h10 * h * ms[idx] + h01 * ys[idx + 1] + h11 * h * ms[idx + 1];
  return +Math.max(0, Math.min(EXPERIMENT_74_CONSTANTS.theoreticalMaxO2Cm3, val)).toFixed(1);
}

/**
 * Mengembalikan kadar seketika pembebasan gas O₂ (cm³ s⁻¹) pada masa t.
 */
export function evaluateInstantOxygenRate(timeSec: number, id: CatalystSetId): number {
  const dt = 0.5;
  const t1 = Math.max(0, timeSec - dt);
  const t2 = Math.min(EXPERIMENT_74_CONSTANTS.maxDurationSec, timeSec + dt);
  if (t2 <= t1) return 0;
  const v1 = evaluateOxygenVolume(t1, id);
  const v2 = evaluateOxygenVolume(t2, id);
  return +Math.max(0, (v2 - v1) / (t2 - t1)).toFixed(2);
}

/**
 * Menjana titik lengkung licin untuk graf masa nyata dari t = 0 hingga upToSec.
 */
export function buildOxygenCurveSamples(
  upToSec: number,
  id: CatalystSetId,
  stepSec = 1
): Array<{ time: number; volume: number }> {
  const target = Math.max(0, Math.min(EXPERIMENT_74_CONSTANTS.maxDurationSec, upToSec));
  const points: Array<{ time: number; volume: number }> = [];
  for (let t = 0; t < target; t += stepSec) {
    points.push({ time: +t.toFixed(1), volume: evaluateOxygenVolume(t, id) });
  }
  points.push({
    time: +target.toFixed(1),
    volume: evaluateOxygenVolume(target, id),
  });
  return points;
}
