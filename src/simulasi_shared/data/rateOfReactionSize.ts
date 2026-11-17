export type MarbleSizeId = 'large' | 'small';

export interface MarbleSetSpec {
  id: MarbleSizeId;
  code: 'I' | 'II';
  shortLabel: string;
  title: string;
  massLabel: string;
  completionTimeSec: number; // Masa tindak balas tamat (saat)
  shapeExponent: number; // Eksponen lengkung ketepuan C¹
  strokeHex: string;
  fillHex: string;
  badgeBg: string;
  initialRate: number; // dV/dt pada t = 0 (cm³ s⁻¹)
  averageRate: number; // 45.0 / completionTimeSec (cm³ s⁻¹)
}

export interface SurfaceCubeStage {
  id: string;
  title: string;
  dimensions: string;
  pieces: number;
  formula: string;
  totalAreaCm2: number;
}

export const EXPERIMENT_71_CONSTANTS = {
  hclVolumeCm3: 80.0,
  hclMolarityM: 0.1,
  marbleMassG: 5.0,
  initialBuretteCm3: 50.0,
  maxGasCm3: 45.0,
  maxDurationSec: 240,
  intervalSec: 30,
};

export const CHECKPOINT_TIMES: number[] = [0, 30, 60, 90, 120, 150, 180, 210, 240];

export const MARBLE_SETS: Record<MarbleSizeId, MarbleSetSpec> = {
  large: {
    id: 'large',
    code: 'I',
    shortLabel: 'Set I: Ketulan Besar',
    title: '5.0 g Ketulan Marmar Besar (CaCO₃)',
    massLabel: '5.0 g ketulan besar CaCO₃',
    completionTimeSec: 210,
    shapeExponent: 2.0,
    strokeHex: '#0284c7',
    fillHex: '#bae6fd',
    badgeBg: 'bg-sky-600',
    initialRate: +((EXPERIMENT_71_CONSTANTS.maxGasCm3 * 2.0) / 210).toFixed(2),
    averageRate: +(EXPERIMENT_71_CONSTANTS.maxGasCm3 / 210).toFixed(2),
  },
  small: {
    id: 'small',
    code: 'II',
    shortLabel: 'Set II: Ketulan Kecil',
    title: '5.0 g Ketulan Marmar Kecil (CaCO₃)',
    massLabel: '5.0 g ketulan kecil CaCO₃',
    completionTimeSec: 120,
    shapeExponent: 2.5,
    strokeHex: '#e11d48',
    fillHex: '#fecdd3',
    badgeBg: 'bg-rose-600',
    initialRate: +((EXPERIMENT_71_CONSTANTS.maxGasCm3 * 2.5) / 120).toFixed(2),
    averageRate: +(EXPERIMENT_71_CONSTANTS.maxGasCm3 / 120).toFixed(2),
  },
};

export const SURFACE_AREA_STAGES: SurfaceCubeStage[] = [
  {
    id: 'cube-1',
    title: '1 Ketulan Besar',
    dimensions: '2 cm × 2 cm × 2 cm',
    pieces: 1,
    formula: '6 × (2 × 2)',
    totalAreaCm2: 24,
  },
  {
    id: 'cube-2',
    title: 'Dipotong 2 Bahagian',
    dimensions: '1 cm × 2 cm × 2 cm',
    pieces: 2,
    formula: '2 × 16 cm²',
    totalAreaCm2: 32,
  },
  {
    id: 'cube-4',
    title: 'Dipotong 4 Bahagian',
    dimensions: '1 cm × 1 cm × 2 cm',
    pieces: 4,
    formula: '4 × 10 cm²',
    totalAreaCm2: 40,
  },
];

/**
 * Menghitung isi padu gas CO₂ (cm³) pada masa t secara selanjar dan licin (C¹):
 * V(t) = V_max * [1 - (1 - t/T)^p] untuk 0 <= t <= T, dan V_max untuk t > T.
 */
export function evaluateGasVolume(timeSec: number, size: MarbleSizeId): number {
  const { maxGasCm3 } = EXPERIMENT_71_CONSTANTS;
  const spec = MARBLE_SETS[size];
  const clamped = Math.max(0, timeSec);
  if (clamped >= spec.completionTimeSec) {
    return maxGasCm3;
  }
  const remainingFrac = 1 - clamped / spec.completionTimeSec;
  const val = maxGasCm3 * (1 - Math.pow(remainingFrac, spec.shapeExponent));
  return +val.toFixed(2);
}

/**
 * Menghitung kadar tindak balas seketika dV/dt (cm³ s⁻¹) pada masa t.
 */
export function evaluateInstantRate(timeSec: number, size: MarbleSizeId): number {
  const { maxGasCm3 } = EXPERIMENT_71_CONSTANTS;
  const spec = MARBLE_SETS[size];
  const clamped = Math.max(0, timeSec);
  if (clamped >= spec.completionTimeSec) {
    return 0;
  }
  const remainingFrac = 1 - clamped / spec.completionTimeSec;
  const rate =
    ((maxGasCm3 * spec.shapeExponent) / spec.completionTimeSec) *
    Math.pow(remainingFrac, spec.shapeExponent - 1);
  return +rate.toFixed(3);
}

/**
 * Menghitung bacaan paras air pada buret terbalik (50.00 cm³ -> 5.00 cm³).
 */
export function evaluateBuretteReading(timeSec: number, size: MarbleSizeId): number {
  const gas = evaluateGasVolume(timeSec, size);
  return +(EXPERIMENT_71_CONSTANTS.initialBuretteCm3 - gas).toFixed(2);
}

/**
 * Menjana titik sampel licin untuk lukisan lengkung masa nyata dari t = 0 hingga upToSec.
 */
export function buildSmoothCurveSamples(
  upToSec: number,
  size: MarbleSizeId,
  stepSec = 3
): Array<{ time: number; gas: number }> {
  const target = Math.max(0, Math.min(EXPERIMENT_71_CONSTANTS.maxDurationSec, upToSec));
  const points: Array<{ time: number; gas: number }> = [];
  for (let t = 0; t < target; t += stepSec) {
    points.push({ time: t, gas: evaluateGasVolume(t, size) });
  }
  points.push({ time: target, gas: evaluateGasVolume(target, size) });
  return points;
}
