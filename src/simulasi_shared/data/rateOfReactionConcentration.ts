export type ConcentrationSetId = 'I' | 'II' | 'III' | 'IV' | 'V';

export interface ConcentrationSetSpec {
  id: ConcentrationSetId;
  label: string;
  vThiosulphateCm3: number; // Isi padu Na₂S₂O₃ 0.2 mol dm⁻³
  vWaterCm3: number; // Isi padu air suling
  vAcidCm3: number; // Isi padu H₂SO₄ 1.0 mol dm⁻³
  totalVolumeCm3: number; // Jumlah isi padu campuran = 50.0 cm³
  dilutedMolarityM2: number; // M₂ = (0.2 × V₁) / 50.0
  timeHideCrossSec: number; // Masa diambil untuk tanda '✕' tidak kelihatan (s)
  rateInverseTime: number; // Kadar = 1 / masa (s⁻¹)
  strokeHex: string;
}

export const EXPERIMENT_72_CONSTANTS = {
  stockMolarityM1: 0.2,
  acidVolumeCm3: 5.0,
  acidMolarityM: 1.0,
  totalMixtureVolumeCm3: 50.0,
  maxGraphTimeSec: 75,
};

/**
 * Mengira kepekatan natrium tiosulfat yang telah dicairkan menggunakan M₁V₁ = M₂V₂.
 */
export function computeDilutedConcentration(
  v1ThiosulphateCm3: number,
  m1StockM = EXPERIMENT_72_CONSTANTS.stockMolarityM1,
  v2TotalCm3 = EXPERIMENT_72_CONSTANTS.totalMixtureVolumeCm3
): number {
  return +((m1StockM * v1ThiosulphateCm3) / v2TotalCm3).toFixed(2);
}

/**
 * Data Jadual 7.5 & Jadual 7.6 Eksperimen 7.2 (Kimia Tingkatan 4 KSSM, m.s. 232–233).
 * Hubungan kadar tindak balas berkadar langsung dengan kepekatan: M₂ × masa = pemalar (2.88).
 */
export const CONCENTRATION_SETS: ConcentrationSetSpec[] = [
  {
    id: 'I',
    label: 'Eksp I',
    vThiosulphateCm3: 45.0,
    vWaterCm3: 0.0,
    vAcidCm3: 5.0,
    totalVolumeCm3: 50.0,
    dilutedMolarityM2: computeDilutedConcentration(45.0),
    timeHideCrossSec: 16.0,
    rateInverseTime: +(1 / 16.0).toFixed(4),
    strokeHex: '#be123c',
  },
  {
    id: 'II',
    label: 'Eksp II',
    vThiosulphateCm3: 40.0,
    vWaterCm3: 5.0,
    vAcidCm3: 5.0,
    totalVolumeCm3: 50.0,
    dilutedMolarityM2: computeDilutedConcentration(40.0),
    timeHideCrossSec: 18.0,
    rateInverseTime: +(1 / 18.0).toFixed(4),
    strokeHex: '#ea580c',
  },
  {
    id: 'III',
    label: 'Eksp III',
    vThiosulphateCm3: 30.0,
    vWaterCm3: 15.0,
    vAcidCm3: 5.0,
    totalVolumeCm3: 50.0,
    dilutedMolarityM2: computeDilutedConcentration(30.0),
    timeHideCrossSec: 24.0,
    rateInverseTime: +(1 / 24.0).toFixed(4),
    strokeHex: '#d97706',
  },
  {
    id: 'IV',
    label: 'Eksp IV',
    vThiosulphateCm3: 20.0,
    vWaterCm3: 25.0,
    vAcidCm3: 5.0,
    totalVolumeCm3: 50.0,
    dilutedMolarityM2: computeDilutedConcentration(20.0),
    timeHideCrossSec: 36.0,
    rateInverseTime: +(1 / 36.0).toFixed(4),
    strokeHex: '#0d9488',
  },
  {
    id: 'V',
    label: 'Eksp V',
    vThiosulphateCm3: 10.0,
    vWaterCm3: 35.0,
    vAcidCm3: 5.0,
    totalVolumeCm3: 50.0,
    dilutedMolarityM2: computeDilutedConcentration(10.0),
    timeHideCrossSec: 72.0,
    rateInverseTime: +(1 / 72.0).toFixed(4),
    strokeHex: '#0284c7',
  },
];

export const CONCENTRATION_SET_MAP: Record<ConcentrationSetId, ConcentrationSetSpec> =
  Object.fromEntries(CONCENTRATION_SETS.map((s) => [s.id, s])) as Record<
    ConcentrationSetId,
    ConcentrationSetSpec
  >;

/**
 * Menghitung peratusan kekeruhan mendakan kuning sulfur S(p) (0% -> 100%) pada masa t.
 * Pada t = timeHideCrossSec, kekeruhan mencapai 100% dan tanda '✕' tidak lagi kelihatan.
 */
export function evaluateSulfurTurbidity(
  timeSec: number,
  setId: ConcentrationSetId
): number {
  const spec = CONCENTRATION_SET_MAP[setId];
  const clamped = Math.max(0, timeSec);
  if (clamped >= spec.timeHideCrossSec) {
    return 100.0;
  }
  const frac = clamped / spec.timeHideCrossSec;
  return +(100 * Math.pow(frac, 0.88)).toFixed(1);
}

/**
 * Menjana titik sampel licin bagi lengkung kekeruhan masa nyata dari t = 0 hingga upToSec.
 */
export function buildTurbidityCurveSamples(
  upToSec: number,
  setId: ConcentrationSetId,
  stepSec = 1.0
): Array<{ time: number; turbidity: number }> {
  const spec = CONCENTRATION_SET_MAP[setId];
  const target = Math.max(0, Math.min(spec.timeHideCrossSec, upToSec));
  const points: Array<{ time: number; turbidity: number }> = [];
  for (let t = 0; t < target; t += stepSec) {
    points.push({ time: +t.toFixed(1), turbidity: evaluateSulfurTurbidity(t, setId) });
  }
  points.push({
    time: +target.toFixed(1),
    turbidity: evaluateSulfurTurbidity(target, setId),
  });
  return points;
}
