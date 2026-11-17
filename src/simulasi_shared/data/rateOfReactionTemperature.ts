export type TemperatureSetId = 'I' | 'II' | 'III' | 'IV' | 'V';

export interface TemperatureSetSpec {
  id: TemperatureSetId;
  label: string;
  tempC: number;
  isRoomTemp: boolean;
  vThiosulphateCm3: number;
  vAcidCm3: number;
  timeHideCrossSec: number;
  rateInverseTime: number;
  relativeRateFactor: number;
  strokeHex: string;
}

export const EXPERIMENT_73_CONSTANTS = {
  thiosulphateMolarityM: 0.2,
  thiosulphateVolumeCm3: 50.0,
  acidMolarityM: 1.0,
  acidVolumeCm3: 5.0,
  totalVolumeCm3: 55.0,
  roomTempC: 30,
  baseTimeAt30CSec: 48.0,
};

/**
 * Mengira masa teori t(T) berasaskan hukum buku teks Kimia T4 KSSM m.s. 233:
 * "Setiap peningkatan suhu sebanyak 10 °C meningkatkan kadar tindak balas ~2 kali ganda."
 */
export function computeTheoreticalTimeSec(tempC: number): number {
  const rateMultiplier = Math.pow(2, (tempC - EXPERIMENT_73_CONSTANTS.roomTempC) / 10);
  const raw = EXPERIMENT_73_CONSTANTS.baseTimeAt30CSec / rateMultiplier;
  return +(Math.round(raw * 2) / 2).toFixed(1);
}

/**
 * 5 set Eksperimen 7.3 mengikut prosedur buku teks Kimia T4 KSSM m.s. 234:
 * Suhu bilik (~30 °C), 40 °C, 45 °C, 50 °C dan 55 °C.
 */
export const TEMPERATURE_SETS: TemperatureSetSpec[] = [
  {
    id: 'I',
    label: 'Eksp I',
    tempC: 30,
    isRoomTemp: true,
    vThiosulphateCm3: 50.0,
    vAcidCm3: 5.0,
    timeHideCrossSec: 48.0,
    rateInverseTime: +(1 / 48.0).toFixed(4),
    relativeRateFactor: 1.0,
    strokeHex: '#0284c7',
  },
  {
    id: 'II',
    label: 'Eksp II',
    tempC: 40,
    isRoomTemp: false,
    vThiosulphateCm3: 50.0,
    vAcidCm3: 5.0,
    timeHideCrossSec: 24.0,
    rateInverseTime: +(1 / 24.0).toFixed(4),
    relativeRateFactor: 2.0,
    strokeHex: '#0d9488',
  },
  {
    id: 'III',
    label: 'Eksp III',
    tempC: 45,
    isRoomTemp: false,
    vThiosulphateCm3: 50.0,
    vAcidCm3: 5.0,
    timeHideCrossSec: 17.0,
    rateInverseTime: +(1 / 17.0).toFixed(4),
    relativeRateFactor: 2.82,
    strokeHex: '#d97706',
  },
  {
    id: 'IV',
    label: 'Eksp IV',
    tempC: 50,
    isRoomTemp: false,
    vThiosulphateCm3: 50.0,
    vAcidCm3: 5.0,
    timeHideCrossSec: 12.0,
    rateInverseTime: +(1 / 12.0).toFixed(4),
    relativeRateFactor: 4.0,
    strokeHex: '#ea580c',
  },
  {
    id: 'V',
    label: 'Eksp V',
    tempC: 55,
    isRoomTemp: false,
    vThiosulphateCm3: 50.0,
    vAcidCm3: 5.0,
    timeHideCrossSec: 8.5,
    rateInverseTime: +(1 / 8.5).toFixed(4),
    relativeRateFactor: 5.65,
    strokeHex: '#dc2626',
  },
];

export const TEMPERATURE_SET_MAP: Record<TemperatureSetId, TemperatureSetSpec> =
  Object.fromEntries(TEMPERATURE_SETS.map((s) => [s.id, s])) as Record<
    TemperatureSetId,
    TemperatureSetSpec
  >;

/**
 * Menghitung peratusan kekeruhan mendakan kuning sulfur S(p) (0% -> 100%) pada masa t.
 * Pada t = timeHideCrossSec, kekeruhan mencapai 100% dan tanda '✕' tidak lagi kelihatan.
 */
export function evaluateTemperatureTurbidity(
  timeSec: number,
  setId: TemperatureSetId
): number {
  const spec = TEMPERATURE_SET_MAP[setId];
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
export function buildTemperatureCurveSamples(
  upToSec: number,
  setId: TemperatureSetId,
  stepSec = 0.5
): Array<{ time: number; turbidity: number }> {
  const spec = TEMPERATURE_SET_MAP[setId];
  const target = Math.max(0, Math.min(spec.timeHideCrossSec, upToSec));
  const points: Array<{ time: number; turbidity: number }> = [];
  for (let t = 0; t < target; t += stepSec) {
    points.push({
      time: +t.toFixed(1),
      turbidity: evaluateTemperatureTurbidity(t, setId),
    });
  }
  points.push({
    time: +target.toFixed(1),
    turbidity: evaluateTemperatureTurbidity(target, setId),
  });
  return points;
}

/**
 * Menjana lengkung panduan teoretikal berterusan (30 °C - 55 °C) bagi graf suhu.
 */
export function buildSmoothTemperatureGuideline(
  stepC = 1
): Array<{ tempC: number; timeSec: number; rate: number }> {
  const pts: Array<{ tempC: number; timeSec: number; rate: number }> = [];
  for (let temp = 30; temp <= 55; temp += stepC) {
    const rateMultiplier = Math.pow(2, (temp - EXPERIMENT_73_CONSTANTS.roomTempC) / 10);
    const timeSec = EXPERIMENT_73_CONSTANTS.baseTimeAt30CSec / rateMultiplier;
    pts.push({
      tempC: temp,
      timeSec: +timeSec.toFixed(2),
      rate: +(1 / timeSec).toFixed(5),
    });
  }
  return pts;
}
