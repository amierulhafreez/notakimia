import React, { useState, useMemo } from 'react';
import { analytics } from '../services/analytics';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Copy,
  Check,
  Shuffle,
  BookOpen,
  Trophy,
  FlaskConical,
  GripVertical,
  Info,
  X,
  AlertCircle,
  Scale,
} from 'lucide-react';

interface FormulaToken {
  el: string;
  sub?: string;
}

interface IonDef {
  id: string;
  kind: 'cation' | 'anion';
  name: string;
  compoundPart: string;
  tokens: FormulaToken[];
  charge: 1 | 2 | 3;
  isPolyatomic: boolean;
  romanNote?: string;
  usageNote?: string;
}

interface ChallengeItem {
  id: string;
  group: 'aktiviti315' | 'lanjutan';
  title: string;
  cationId: string;
  anionId: string;
  hint: string;
}

interface CompoundResult {
  cation: IonDef;
  anion: IonDef;
  rawCatCount: number;
  rawAnCount: number;
  divisor: number;
  catCount: number;
  anCount: number;
  totalCharge: number;
  needsCatParens: boolean;
  needsAnParens: boolean;
  compoundName: string;
  unicodeFormula: string;
  unsimplifiedFormula: string;
  steps: {
    title: string;
    detail: string;
    highlight?: string;
  }[];
}

const SIM_ID = 'penghasilan-formula-kimia';

const SUB_MAP: Record<string, string> = {
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

const SUP_MAP: Record<string, string> = {
  '2': '²',
  '3': '³',
  '+': '⁺',
  '-': '⁻',
  '−': '⁻',
};

function toUnicodeSub(val: string | number): string {
  return String(val)
    .split('')
    .map((ch) => SUB_MAP[ch] ?? ch)
    .join('');
}

function formatChargeSup(charge: 1 | 2 | 3, kind: 'cation' | 'anion'): string {
  const sign = kind === 'cation' ? '+' : '−';
  return charge === 1 ? sign : `${charge}${sign}`;
}

function formatUnicodeIon(ion: IonDef): string {
  const body = ion.tokens
    .map((t) => `${t.el}${t.sub ? toUnicodeSub(t.sub) : ''}`)
    .join('');
  const sup = formatChargeSup(ion.charge, ion.kind)
    .split('')
    .map((c) => SUP_MAP[c] ?? c)
    .join('');
  return `${body}${sup}`;
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

// Senarai penuh Kation dalam Jadual 3.7, Kimia Tingkatan 4 KSSM (m.s. 67)
const CATIONS: IonDef[] = [
  {
    id: 'na',
    kind: 'cation',
    name: 'Ion natrium',
    compoundPart: 'Natrium',
    tokens: [{ el: 'Na' }],
    charge: 1,
    isPolyatomic: false,
  },
  {
    id: 'k',
    kind: 'cation',
    name: 'Ion kalium',
    compoundPart: 'Kalium',
    tokens: [{ el: 'K' }],
    charge: 1,
    isPolyatomic: false,
  },
  {
    id: 'al',
    kind: 'cation',
    name: 'Ion aluminium',
    compoundPart: 'Aluminium',
    tokens: [{ el: 'Al' }],
    charge: 3,
    isPolyatomic: false,
  },
  {
    id: 'zn',
    kind: 'cation',
    name: 'Ion zink',
    compoundPart: 'Zink',
    tokens: [{ el: 'Zn' }],
    charge: 2,
    isPolyatomic: false,
  },
  {
    id: 'mg',
    kind: 'cation',
    name: 'Ion magnesium',
    compoundPart: 'Magnesium',
    tokens: [{ el: 'Mg' }],
    charge: 2,
    isPolyatomic: false,
  },
  {
    id: 'fe2',
    kind: 'cation',
    name: 'Ion ferum(II)',
    compoundPart: 'Ferum(II)',
    tokens: [{ el: 'Fe' }],
    charge: 2,
    isPolyatomic: false,
    romanNote: 'Angka Roman (II) menunjukkan ion ferum membawa cas +2.',
  },
  {
    id: 'fe3',
    kind: 'cation',
    name: 'Ion ferum(III)',
    compoundPart: 'Ferum(III)',
    tokens: [{ el: 'Fe' }],
    charge: 3,
    isPolyatomic: false,
    romanNote: 'Angka Roman (III) menunjukkan ion ferum membawa cas +3.',
  },
  {
    id: 'cu2',
    kind: 'cation',
    name: 'Ion kuprum(II)',
    compoundPart: 'Kuprum(II)',
    tokens: [{ el: 'Cu' }],
    charge: 2,
    isPolyatomic: false,
    romanNote: 'Angka Roman (II) menunjukkan ion kuprum membawa cas +2.',
  },
  {
    id: 'ca',
    kind: 'cation',
    name: 'Ion kalsium',
    compoundPart: 'Kalsium',
    tokens: [{ el: 'Ca' }],
    charge: 2,
    isPolyatomic: false,
  },
  {
    id: 'ag',
    kind: 'cation',
    name: 'Ion argentum',
    compoundPart: 'Argentum',
    tokens: [{ el: 'Ag' }],
    charge: 1,
    isPolyatomic: false,
  },
  {
    id: 'pb2',
    kind: 'cation',
    name: 'Ion plumbum(II)',
    compoundPart: 'Plumbum(II)',
    tokens: [{ el: 'Pb' }],
    charge: 2,
    isPolyatomic: false,
    romanNote: 'Angka Roman (II) menunjukkan ion plumbum membawa cas +2.',
  },
  {
    id: 'nh4',
    kind: 'cation',
    name: 'Ion ammonium',
    compoundPart: 'Ammonium',
    tokens: [{ el: 'N' }, { el: 'H', sub: '4' }],
    charge: 1,
    isPolyatomic: true,
    usageNote: 'Satu-satunya kation poliatom dalam Jadual 3.7 (1 atom N & 4 atom H terikat secara kovalen).',
  },
];

// Senarai penuh Anion dalam Jadual 3.7, Kimia Tingkatan 4 KSSM (m.s. 67)
const ANIONS: IonDef[] = [
  {
    id: 'o',
    kind: 'anion',
    name: 'Ion oksida',
    compoundPart: 'oksida',
    tokens: [{ el: 'O' }],
    charge: 2,
    isPolyatomic: false,
  },
  {
    id: 'cl',
    kind: 'anion',
    name: 'Ion klorida',
    compoundPart: 'klorida',
    tokens: [{ el: 'Cl' }],
    charge: 1,
    isPolyatomic: false,
  },
  {
    id: 'br',
    kind: 'anion',
    name: 'Ion bromida',
    compoundPart: 'bromida',
    tokens: [{ el: 'Br' }],
    charge: 1,
    isPolyatomic: false,
  },
  {
    id: 'i',
    kind: 'anion',
    name: 'Ion iodida',
    compoundPart: 'iodida',
    tokens: [{ el: 'I' }],
    charge: 1,
    isPolyatomic: false,
  },
  {
    id: 'oh',
    kind: 'anion',
    name: 'Ion hidroksida',
    compoundPart: 'hidroksida',
    tokens: [{ el: 'O' }, { el: 'H' }],
    charge: 1,
    isPolyatomic: true,
  },
  {
    id: 'co3',
    kind: 'anion',
    name: 'Ion karbonat',
    compoundPart: 'karbonat',
    tokens: [{ el: 'C' }, { el: 'O', sub: '3' }],
    charge: 2,
    isPolyatomic: true,
  },
  {
    id: 'no3',
    kind: 'anion',
    name: 'Ion nitrat',
    compoundPart: 'nitrat',
    tokens: [{ el: 'N' }, { el: 'O', sub: '3' }],
    charge: 1,
    isPolyatomic: true,
  },
  {
    id: 'so4',
    kind: 'anion',
    name: 'Ion sulfat',
    compoundPart: 'sulfat',
    tokens: [{ el: 'S' }, { el: 'O', sub: '4' }],
    charge: 2,
    isPolyatomic: true,
  },
  {
    id: 'po4',
    kind: 'anion',
    name: 'Ion fosfat',
    compoundPart: 'fosfat',
    tokens: [{ el: 'P' }, { el: 'O', sub: '4' }],
    charge: 3,
    isPolyatomic: true,
  },
  {
    id: 'mno4',
    kind: 'anion',
    name: 'Ion manganat(VII)',
    compoundPart: 'manganat(VII)',
    tokens: [{ el: 'Mn' }, { el: 'O', sub: '4' }],
    charge: 1,
    isPolyatomic: true,
    romanNote: 'Angka Roman (VII) merujuk nombor pengoksidaan mangan +7 dalam anion poliatom.',
  },
  {
    id: 's2o3',
    kind: 'anion',
    name: 'Ion tiosulfat',
    compoundPart: 'tiosulfat',
    tokens: [
      { el: 'S', sub: '2' },
      { el: 'O', sub: '3' },
    ],
    charge: 2,
    isPolyatomic: true,
  },
  {
    id: 'cr2o7',
    kind: 'anion',
    name: 'Ion dikromat(VI)',
    compoundPart: 'dikromat(VI)',
    tokens: [
      { el: 'Cr', sub: '2' },
      { el: 'O', sub: '7' },
    ],
    charge: 2,
    isPolyatomic: true,
    romanNote: 'Angka Roman (VI) merujuk nombor pengoksidaan kromium +6 dalam anion poliatom.',
  },
];

// 12 sebatian rasmi Aktiviti 3.15 (m.s. 68) + 6 cabaran lanjutan Jadual 3.7
const CHALLENGES: ChallengeItem[] = [
  // Aktiviti 3.15 (12 sebatian tepat daripada Buku Teks KSSM T4 m.s. 68)
  {
    id: 'a1',
    group: 'aktiviti315',
    title: 'Kalium oksida',
    cationId: 'k',
    anionId: 'o',
    hint: 'Gabungkan ion kalium (+1) dan ion oksida (−2).',
  },
  {
    id: 'a2',
    group: 'aktiviti315',
    title: 'Natrium klorida',
    cationId: 'na',
    anionId: 'cl',
    hint: 'Garam biasa: cas +1 dan −1 mengimbang tepat 1 : 1.',
  },
  {
    id: 'a3',
    group: 'aktiviti315',
    title: 'Kalsium bromida',
    cationId: 'ca',
    anionId: 'br',
    hint: 'Ion kalsium bercas +2, ion bromida bercas −1.',
  },
  {
    id: 'a4',
    group: 'aktiviti315',
    title: 'Natrium hidroksida',
    cationId: 'na',
    anionId: 'oh',
    hint: 'Alkali kuat daripada ion natrium (+1) dan ion hidroksida (−1).',
  },
  {
    id: 'a5',
    group: 'aktiviti315',
    title: 'Aluminium oksida',
    cationId: 'al',
    anionId: 'o',
    hint: 'Ion Al³⁺ (+3) dan ion O²⁻ (−2): kaedah silang menghasilkan nisbah 2 : 3.',
  },
  {
    id: 'a6',
    group: 'aktiviti315',
    title: 'Zink sulfat',
    cationId: 'zn',
    anionId: 'so4',
    hint: 'Kedua-dua ion bercas ±2! Jangan lupa permudahkan nisbah 2 : 2 → 1 : 1.',
  },
  {
    id: 'a7',
    group: 'aktiviti315',
    title: 'Magnesium nitrat',
    cationId: 'mg',
    anionId: 'no3',
    hint: 'Ion poliatom nitrat diperlukan sebanyak 2 unit → guna tanda kurung (...).',
  },
  {
    id: 'a8',
    group: 'aktiviti315',
    title: 'Kalium karbonat',
    cationId: 'k',
    anionId: 'co3',
    hint: 'Ion kalium (+1) dan ion karbonat (−2).',
  },
  {
    id: 'a9',
    group: 'aktiviti315',
    title: 'Kuprum(II) sulfat',
    cationId: 'cu2',
    anionId: 'so4',
    hint: 'Pilih ion kuprum(II) bercas +2 dengan ion sulfat bercas −2.',
  },
  {
    id: 'a10',
    group: 'aktiviti315',
    title: 'Kalsium nitrat',
    cationId: 'ca',
    anionId: 'no3',
    hint: 'Ion kalsium (+2) memerlukan 2 unit ion poliatom nitrat (−1).',
  },
  {
    id: 'a11',
    group: 'aktiviti315',
    title: 'Aluminium klorida',
    cationId: 'al',
    anionId: 'cl',
    hint: 'Ion Al³⁺ (+3) bergabung dengan 3 unit ion klorida Cl⁻ (−1).',
  },
  {
    id: 'a12',
    group: 'aktiviti315',
    title: 'Natrium karbonat',
    cationId: 'na',
    anionId: 'co3',
    hint: '2 unit ion Na⁺ diperlukan untuk meneutralkan 1 unit ion CO₃²⁻.',
  },
  // Lanjutan Jadual 3.7 (ion poliatom khas & nombor Roman)
  {
    id: 'x1',
    group: 'lanjutan',
    title: 'Ammonium sulfat',
    cationId: 'nh4',
    anionId: 'so4',
    hint: 'Ion ammonium (+1) ialah kation poliatom yang perlu dikurung jika >1 unit.',
  },
  {
    id: 'x2',
    group: 'lanjutan',
    title: 'Ferum(III) oksida',
    cationId: 'fe3',
    anionId: 'o',
    hint: 'Pilih Ferum(III) (+3), bukan Ferum(II), bersama ion oksida (−2).',
  },
  {
    id: 'x3',
    group: 'lanjutan',
    title: 'Kalsium fosfat',
    cationId: 'ca',
    anionId: 'po4',
    hint: 'Ion Ca²⁺ (+2) dengan ion fosfat PO₄³⁻ (−3).',
  },
  {
    id: 'x4',
    group: 'lanjutan',
    title: 'Kalium dikromat(VI)',
    cationId: 'k',
    anionId: 'cr2o7',
    hint: 'Gabungkan ion kalium (+1) dan ion dikromat(VI) (−2).',
  },
  {
    id: 'x5',
    group: 'lanjutan',
    title: 'Plumbum(II) iodida',
    cationId: 'pb2',
    anionId: 'i',
    hint: 'Mendakan kuning ikonik daripada Pb²⁺ (+2) dan I⁻ (−1).',
  },
  {
    id: 'x6',
    group: 'lanjutan',
    title: 'Natrium tiosulfat',
    cationId: 'na',
    anionId: 's2o3',
    hint: 'Reagen eksperimen kadar tindak balas: Na⁺ (+1) dan S₂O₃²⁻ (−2).',
  },
];

function buildUnicodePart(tokens: FormulaToken[], count: number, isPolyatomic: boolean): string {
  const base = tokens.map((t) => `${t.el}${t.sub ? toUnicodeSub(t.sub) : ''}`).join('');
  if (count === 1) return base;
  return isPolyatomic ? `(${base})${toUnicodeSub(count)}` : `${base}${toUnicodeSub(count)}`;
}

function buildCompoundResult(cation: IonDef, anion: IonDef): CompoundResult {
  const rawCatCount = anion.charge;
  const rawAnCount = cation.charge;
  const divisor = gcd(rawCatCount, rawAnCount);
  const catCount = rawCatCount / divisor;
  const anCount = rawAnCount / divisor;
  const totalCharge = catCount * cation.charge; // equals anCount * anion.charge

  const needsCatParens = cation.isPolyatomic && catCount > 1;
  const needsAnParens = anion.isPolyatomic && anCount > 1;

  const unicodeFormula =
    buildUnicodePart(cation.tokens, catCount, cation.isPolyatomic) +
    buildUnicodePart(anion.tokens, anCount, anion.isPolyatomic);

  const unsimplifiedFormula =
    buildUnicodePart(cation.tokens, rawCatCount, cation.isPolyatomic) +
    buildUnicodePart(anion.tokens, rawAnCount, anion.isPolyatomic);

  const compoundName = `${cation.compoundPart} ${anion.compoundPart}`;

  const uCat = formatUnicodeIon(cation);
  const uAn = formatUnicodeIon(anion);

  const step1Detail = `${cation.name} (${uCat}) membawa cas +${cation.charge}, manakala ${anion.name.toLowerCase()} (${uAn}) membawa cas −${anion.charge}.`;

  let step2Detail = '';
  let step2Highlight: string | undefined;
  if (divisor > 1) {
    step2Detail = `Melalui kaedah silang, nisbah awal ${rawCatCount} : ${rawAnCount} dibahagi dengan ${divisor} kepada nisbah teringkas ${catCount} : ${anCount}. Oleh itu, ${catCount} unit ${uCat} (+${totalCharge}) meneutralkan tepat ${anCount} unit ${uAn} (−${totalCharge}) supaya jumlah cas = 0.`;
    step2Highlight = `Permudahkan nisbah: ${unsimplifiedFormula} → ${unicodeFormula} (bukan ${unsimplifiedFormula})`;
  } else {
    step2Detail = `Dengan menyilangkan magnitud cas, ${catCount} unit ${uCat} (jumlah cas +${totalCharge}) bergabung dengan ${anCount} unit ${uAn} (jumlah cas −${totalCharge}) supaya jumlah cas keseluruhan = 0 (neutral).`;
  }

  const parenNotes: string[] = [];
  if (needsCatParens && needsAnParens) {
    parenNotes.push(
      `Kedua-dua ion poliatom melebihi 1 unit, jadi (${cation.tokens.map((t) => `${t.el}${t.sub ? toUnicodeSub(t.sub) : ''}`).join('')})${toUnicodeSub(catCount)} dan (${anion.tokens.map((t) => `${t.el}${t.sub ? toUnicodeSub(t.sub) : ''}`).join('')})${toUnicodeSub(anCount)} perlu diletakkan dalam tanda kurung.`
    );
  } else if (needsCatParens) {
    const baseCat = cation.tokens.map((t) => `${t.el}${t.sub ? toUnicodeSub(t.sub) : ''}`).join('');
    parenNotes.push(
      `Ion poliatom ${baseCat}⁺ diperlukan sebanyak ${catCount} unit (>1), maka tanda kurung ditulis sebagai (${baseCat})${toUnicodeSub(catCount)}.`
    );
  } else if (needsAnParens) {
    const baseAn = anion.tokens.map((t) => `${t.el}${t.sub ? toUnicodeSub(t.sub) : ''}`).join('');
    parenNotes.push(
      `Ion poliatom ${baseAn}${formatUnicodeIon(anion).slice(baseAn.length)} diperlukan sebanyak ${anCount} unit (>1), maka tanda kurung ditulis sebagai (${baseAn})${toUnicodeSub(anCount)}.`
    );
  } else if (cation.isPolyatomic || anion.isPolyatomic) {
    parenNotes.push(
      `Walaupun terdapat ion poliatom, bilangannya hanya 1 unit, maka tiada tanda kurung diperlukan.`
    );
  } else {
    parenNotes.push(
      `Kedua-dua ion ialah ion ringkas (monoatom), jadi subskrip bilangan ditulis terus tanpa tanda kurung.`
    );
  }

  const sub1Note =
    catCount === 1 || anCount === 1
      ? 'Subskrip 1 tidak perlu ditulis (Tip Celik m.s. 59).'
      : `Subskrip ${catCount} dan ${anCount} menunjukkan bilangan ion setiap jenis.`;

  const step3Detail = `Kation ditulis dahulu diikuti anion tanpa tanda cas. ${sub1Note} ${parenNotes.join(' ')}`;

  const extraRoman = [cation.romanNote, anion.romanNote].filter(Boolean).join(' ');
  const step4Detail = `Nama kation "${cation.compoundPart}" ditulis dahulu diikuti nama anion "${anion.compoundPart}" menghasilkan "${compoundName}".${extraRoman ? ' ' + extraRoman : ''}`;

  return {
    cation,
    anion,
    rawCatCount,
    rawAnCount,
    divisor,
    catCount,
    anCount,
    totalCharge,
    needsCatParens,
    needsAnParens,
    compoundName,
    unicodeFormula,
    unsimplifiedFormula,
    steps: [
      { title: '1. Kenal Pasti Cas Ion', detail: step1Detail },
      { title: '2. Imbangan Cas (Kaedah Silang)', detail: step2Detail, highlight: step2Highlight },
      { title: '3. Peraturan Penulisan Formula', detail: step3Detail },
      { title: '4. Penamaan Sebatian (Jadual 3.8)', detail: step4Detail },
    ],
  };
}

const TokenSequence: React.FC<{ tokens: FormulaToken[] }> = ({ tokens }) => (
  <>
    {tokens.map((tok, i) => (
      <React.Fragment key={`${tok.el}-${i}`}>
        {tok.el}
        {tok.sub ? <sub>{tok.sub}</sub> : null}
      </React.Fragment>
    ))}
  </>
);

const IonFormulaRich: React.FC<{ ion: IonDef; className?: string }> = ({ ion, className = '' }) => (
  <span className={`font-bold tracking-tight ${className}`}>
    <TokenSequence tokens={ion.tokens} />
    <sup>{formatChargeSup(ion.charge, ion.kind)}</sup>
  </span>
);

const CompoundFormulaRich: React.FC<{ result: CompoundResult; className?: string }> = ({
  result,
  className = '',
}) => {
  const renderPart = (ion: IonDef, count: number, needsParens: boolean) => {
    if (count === 1) {
      return <TokenSequence tokens={ion.tokens} />;
    }
    if (needsParens) {
      return (
        <>
          (<TokenSequence tokens={ion.tokens} />)<sub>{count}</sub>
        </>
      );
    }
    return (
      <>
        <TokenSequence tokens={ion.tokens} />
        <sub>{count}</sub>
      </>
    );
  };

  return (
    <span className={`font-extrabold tracking-tight ${className}`}>
      {renderPart(result.cation, result.catCount, result.needsCatParens)}
      {renderPart(result.anion, result.anCount, result.needsAnParens)}
    </span>
  );
};

export const IonicFormulaLab: React.FC = () => {
  const [selectedCationId, setSelectedCationId] = useState<string | null>('zn');
  const [selectedAnionId, setSelectedAnionId] = useState<string | null>('cl');
  const [mode, setMode] = useState<'explore' | 'challenge' | 'table'>('explore');
  const [visualView, setVisualView] = useState<'cross' | 'cards'>('cross');

  // Drag & Drop state
  const [draggingKind, setDraggingKind] = useState<'cation' | 'anion' | null>(null);
  const [hoverZone, setHoverZone] = useState<'cation' | 'anion' | 'stage' | null>(null);

  // Challenge state
  const [challengeIdx, setChallengeIdx] = useState<number>(0);
  const [solvedChallengeIds, setSolvedChallengeIds] = useState<string[]>([]);
  const [challengeFeedback, setChallengeFeedback] = useState<{
    status: 'idle' | 'correct' | 'wrong';
    message: string;
  }>({ status: 'idle', message: '' });

  // Clipboard copy feedback
  const [copied, setCopied] = useState<boolean>(false);

  const cation = useMemo(
    () => CATIONS.find((c) => c.id === selectedCationId) ?? null,
    [selectedCationId]
  );
  const anion = useMemo(
    () => ANIONS.find((a) => a.id === selectedAnionId) ?? null,
    [selectedAnionId]
  );

  const result = useMemo(
    () => (cation && anion ? buildCompoundResult(cation, anion) : null),
    [cation, anion]
  );

  const currentChallenge = CHALLENGES[challengeIdx];

  const evaluateChallenge = (nextCatId: string | null, nextAnId: string | null) => {
    if (mode !== 'challenge') return;
    if (!nextCatId || !nextAnId) {
      setChallengeFeedback({ status: 'idle', message: '' });
      return;
    }
    const target = CHALLENGES[challengeIdx];
    if (nextCatId === target.cationId && nextAnId === target.anionId) {
      const targetCat = CATIONS.find((c) => c.id === target.cationId)!;
      const targetAn = ANIONS.find((a) => a.id === target.anionId)!;
      const built = buildCompoundResult(targetCat, targetAn);
      setChallengeFeedback({
        status: 'correct',
        message: `Tepat! ${target.title} ialah ${built.unicodeFormula}.`,
      });
      if (!solvedChallengeIds.includes(target.id)) {
        setSolvedChallengeIds((prev) => [...prev, target.id]);
        analytics.recordSimulationCompleted(SIM_ID);
        confetti({ particleCount: 45, spread: 50, origin: { y: 0.65 } });
      }
    } else {
      const pickedCat = CATIONS.find((c) => c.id === nextCatId)!;
      const pickedAn = ANIONS.find((a) => a.id === nextAnId)!;
      const picked = buildCompoundResult(pickedCat, pickedAn);
      setChallengeFeedback({
        status: 'wrong',
        message: `Anda membina ${picked.compoundName} (${picked.unicodeFormula}). Sasaran ialah ${target.title}.`,
      });
    }
  };

  const applySelection = (kind: 'cation' | 'anion', id: string) => {
    analytics.recordSimulationClick(SIM_ID, 1);
    const nextCat = kind === 'cation' ? id : selectedCationId;
    const nextAn = kind === 'anion' ? id : selectedAnionId;
    if (kind === 'cation') setSelectedCationId(id);
    else setSelectedAnionId(id);

    if (mode === 'explore' && nextCat && nextAn) {
      analytics.recordSimulationCompleted(SIM_ID);
    }
    evaluateChallenge(nextCat, nextAn);
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLButtonElement>,
    kind: 'cation' | 'anion',
    id: string
  ) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ kind, id }));
    e.dataTransfer.effectAllowed = 'copy';
    setDraggingKind(kind);
  };

  const handleDragEnd = () => {
    setDraggingKind(null);
    setHoverZone(null);
  };

  const handleDropOnZone = (
    e: React.DragEvent<HTMLDivElement>,
    expectedZone: 'cation' | 'anion' | 'stage'
  ) => {
    e.preventDefault();
    if (expectedZone !== 'stage') {
      e.stopPropagation();
    }
    setHoverZone(null);
    setDraggingKind(null);
    try {
      const raw = e.dataTransfer.getData('application/json');
      if (!raw) return;
      const parsed = JSON.parse(raw) as { kind?: 'cation' | 'anion'; id?: string };
      if (parsed.kind && parsed.id) {
        applySelection(parsed.kind, parsed.id);
      }
    } catch {
      // Abaikan payload seretan tidak sah
    }
  };

  const handleModeChange = (nextMode: 'explore' | 'challenge' | 'table') => {
    setMode(nextMode);
    analytics.recordSimulationClick(SIM_ID, 1);
    if (nextMode === 'challenge') {
      setSelectedCationId(null);
      setSelectedAnionId(null);
      setChallengeFeedback({ status: 'idle', message: '' });
    } else if (nextMode === 'explore' && !selectedCationId && !selectedAnionId) {
      setSelectedCationId('zn');
      setSelectedAnionId('cl');
    }
  };

  const handleSelectChallenge = (idx: number) => {
    setChallengeIdx(idx);
    setSelectedCationId(null);
    setSelectedAnionId(null);
    setChallengeFeedback({ status: 'idle', message: '' });
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  const handleRandomPair = () => {
    const interestingPairs: [string, string][] = [
      ['mg', 'no3'],
      ['fe3', 'so4'],
      ['nh4', 'co3'],
      ['al', 'o'],
      ['ca', 'po4'],
      ['cu2', 'so4'],
      ['nh4', 'cr2o7'],
      ['pb2', 'i'],
      ['k', 'mno4'],
      ['al', 'po4'],
      ['na', 's2o3'],
      ['fe3', 'oh'],
    ];
    const filtered = interestingPairs.filter(
      ([c, a]) => c !== selectedCationId || a !== selectedAnionId
    );
    const [randCat, randAn] = filtered[Math.floor(Math.random() * filtered.length)];
    setSelectedCationId(randCat);
    setSelectedAnionId(randAn);
    analytics.recordSimulationClick(SIM_ID, 1);
    analytics.recordSimulationCompleted(SIM_ID);
  };

  const handleReset = () => {
    setSelectedCationId(null);
    setSelectedAnionId(null);
    setChallengeFeedback({ status: 'idle', message: '' });
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  const handleCopyFormula = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(`${result.compoundName} (${result.unicodeFormula})`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Abaikan ralat papan keratan
    }
  };

  const chargeBadgeColor = (kind: 'cation' | 'anion', charge: 1 | 2 | 3) => {
    if (kind === 'cation') {
      if (charge === 1) return 'bg-sky-100 text-sky-800 border-sky-200';
      if (charge === 2) return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      return 'bg-violet-100 text-violet-800 border-violet-200';
    }
    if (charge === 1) return 'bg-rose-100 text-rose-800 border-rose-200';
    if (charge === 2) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-orange-100 text-orange-800 border-orange-200';
  };

  return (
    <div className="space-y-3">
      {/* Bar Kawalan Atas (1 Bar Padat) */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => handleModeChange('explore')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              mode === 'explore'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/25'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            Teroka Bebas (12 × 12 Ion)
          </button>
          <button
            onClick={() => handleModeChange('challenge')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              mode === 'challenge'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/25'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            Cabaran Aktiviti 3.15
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                mode === 'challenge' ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700'
              }`}
            >
              {solvedChallengeIds.length}/{CHALLENGES.length}
            </span>
          </button>
          <button
            onClick={() => handleModeChange('table')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              mode === 'table'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Jadual 3.7 (m.s. 67)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden xl:inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
            <Info className="w-3.5 h-3.5 text-emerald-600" />
            Seret &amp; lepas kad kation dan anion ke zon tengah (atau klik)
          </span>
          {mode === 'explore' && (
            <button
              onClick={handleRandomPair}
              className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              title="Cuba contoh pasangan ion menarik"
            >
              <Shuffle className="w-3.5 h-3.5" /> Contoh Rawak
            </button>
          )}
          {mode !== 'table' && (
            <button
              onClick={handleReset}
              className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Kosongkan
            </button>
          )}
        </div>
      </div>

      {/* Paparan Jadual Rujukan 3.7 Penuh (m.s. 67-68 KSSM) */}
      {mode === 'table' ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-extrabold text-slate-900">
                Jadual 3.7: Formula bagi Kation dan Anion yang Lazim (Buku Teks Kimia T4 KSSM, m.s. 67)
              </h4>
              <p className="text-xs text-slate-500">
                Klik mana-mana ion di bawah untuk membawanya terus ke meja pembinaan formula kimia.
              </p>
            </div>
            <button
              onClick={() => handleModeChange('explore')}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              Kembali ke Makmal <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Jadual Kation */}
            <div className="border border-sky-200 rounded-xl overflow-hidden">
              <div className="bg-sky-600 text-white px-3 py-1.5 text-xs font-extrabold flex justify-between">
                <span>Kation (12 Ion Positif)</span>
                <span>Formula &amp; Cas</span>
              </div>
              <div className="divide-y divide-slate-100 grid grid-cols-1">
                {CATIONS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCationId(c.id);
                      setMode('explore');
                    }}
                    className="flex items-center justify-between px-3 py-1.5 text-xs hover:bg-sky-50 transition text-left cursor-pointer"
                  >
                    <span className="font-semibold text-slate-800">{c.name}</span>
                    <span className="flex items-center gap-2">
                      {c.isPolyatomic && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-violet-100 text-violet-700">
                          Poliatom
                        </span>
                      )}
                      <span className="font-mono font-extrabold text-sky-800 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">
                        <IonFormulaRich ion={c} />
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Jadual Anion */}
            <div className="border border-rose-200 rounded-xl overflow-hidden">
              <div className="bg-rose-600 text-white px-3 py-1.5 text-xs font-extrabold flex justify-between">
                <span>Anion (12 Ion Negatif)</span>
                <span>Formula &amp; Cas</span>
              </div>
              <div className="divide-y divide-slate-100 grid grid-cols-1">
                {ANIONS.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      setSelectedAnionId(a.id);
                      setMode('explore');
                    }}
                    className="flex items-center justify-between px-3 py-1.5 text-xs hover:bg-rose-50 transition text-left cursor-pointer"
                  >
                    <span className="font-semibold text-slate-800">{a.name}</span>
                    <span className="flex items-center gap-2">
                      {a.isPolyatomic && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                          Poliatom
                        </span>
                      )}
                      <span className="font-mono font-extrabold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                        <IonFormulaRich ion={a} />
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex flex-wrap gap-x-6 gap-y-1">
            <span>
              <strong>Tip Celik (m.s. 59):</strong> Nombor subskrip <strong>1</strong> tidak ditulis dalam formula kimia.
            </span>
            <span>
              <strong>Tanda Kurung (m.s. 67):</strong> Ion poliatom dikurung hanya jika bilangannya <strong>melebihi 1</strong> (contoh: Mg(NO₃)₂, (NH₄)₂SO₄).
            </span>
          </div>
        </div>
      ) : (
        /* Kokpit Utama 3 Lajur (Kation Kiri | Zon Cantuman & Penerangan Tengah | Anion Kanan) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
          {/* LAJUR KIRI: 12 KATION (Jadual 3.7) */}
          <div className="lg:col-span-3 bg-white border border-sky-200 rounded-2xl p-2.5 shadow-sm">
            <div className="flex items-center justify-between px-1 pb-2 mb-2 border-b border-sky-100">
              <div>
                <h4 className="text-xs font-extrabold text-sky-900 uppercase tracking-wide">
                  Kation (+)
                </h4>
                <p className="text-[10px] text-slate-500">12 ion positif Jadual 3.7</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                Seret / Klik
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 gap-1.5">
              {CATIONS.map((c) => {
                const isSelected = selectedCationId === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'cation', c.id)}
                    onDragEnd={handleDragEnd}
                    onClick={() => applySelection('cation', c.id)}
                    className={`group relative flex flex-col justify-between p-1.5 rounded-xl border text-left transition cursor-grab active:cursor-grabbing select-none ${
                      isSelected
                        ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-400/50 shadow-sm'
                        : 'bg-slate-50/70 hover:bg-sky-50/70 border-slate-200 hover:border-sky-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 w-full">
                      <span className="text-sm font-extrabold text-slate-900 leading-none">
                        <IonFormulaRich ion={c} />
                      </span>
                      <span
                        className={`text-[9px] font-extrabold px-1 py-0.5 rounded border leading-none ${chargeBadgeColor(
                          'cation',
                          c.charge
                        )}`}
                      >
                        +{c.charge}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-1 mt-1">
                      <span className="text-[10px] font-medium text-slate-600 truncate">
                        {c.compoundPart}
                      </span>
                      <GripVertical className="w-2.5 h-2.5 text-slate-300 group-hover:text-sky-500 shrink-0" />
                    </div>
                    {c.isPolyatomic && (
                      <span className="mt-0.5 inline-block self-start text-[8px] font-bold uppercase tracking-wider bg-violet-100 text-violet-700 px-1 rounded">
                        Poliatom
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* LAJUR TENGAH: ZON DROP + HASIL FORMULA + KAEDAH SILANG + PENERANGAN */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'copy';
              if (hoverZone !== 'stage') setHoverZone('stage');
            }}
            onDragLeave={() => setHoverZone(null)}
            onDrop={(e) => handleDropOnZone(e, 'stage')}
            className={`lg:col-span-6 bg-white border rounded-2xl p-3 shadow-sm space-y-2.5 transition ${
              hoverZone === 'stage' && draggingKind
                ? 'border-emerald-400 ring-2 ring-emerald-200'
                : 'border-slate-200'
            }`}
          >
            {/* Bar Sasaran Mod Cabaran Aktiviti 3.15 */}
            {mode === 'challenge' && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-3 py-2 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="px-2 py-0.5 rounded-lg bg-indigo-600 text-white text-[10px] font-extrabold shrink-0">
                      {currentChallenge.group === 'aktiviti315' ? 'Aktiviti 3.15' : 'Lanjutan'} •{' '}
                      {challengeIdx + 1}/{CHALLENGES.length}
                    </span>
                    <p className="text-xs font-extrabold text-indigo-950 truncate">
                      Bina: <span className="text-indigo-700 underline decoration-indigo-300">{currentChallenge.title}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() =>
                        handleSelectChallenge(
                          (challengeIdx - 1 + CHALLENGES.length) % CHALLENGES.length
                        )
                      }
                      className="px-2 py-0.5 rounded-lg bg-white border border-indigo-200 text-[11px] font-bold text-indigo-800 hover:bg-indigo-100 cursor-pointer"
                    >
                      ‹ Sblm
                    </button>
                    <button
                      onClick={() => handleSelectChallenge((challengeIdx + 1) % CHALLENGES.length)}
                      className="px-2 py-0.5 rounded-lg bg-indigo-600 text-[11px] font-bold text-white hover:bg-indigo-500 cursor-pointer"
                    >
                      Seterusnya ›
                    </button>
                  </div>
                </div>

                {/* Petunjuk soalan / maklum balas jawapan */}
                {challengeFeedback.status === 'correct' ? (
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{challengeFeedback.message}</span>
                  </div>
                ) : challengeFeedback.status === 'wrong' ? (
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {challengeFeedback.message} <em className="text-slate-600">({currentChallenge.hint})</em>
                    </span>
                  </div>
                ) : (
                  <p className="text-[11px] text-indigo-700 font-medium">
                    Petunjuk: {currentChallenge.hint}
                  </p>
                )}

                {/* Pemilih nombor soalan padat */}
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {CHALLENGES.map((ch, i) => {
                    const isSolved = solvedChallengeIds.includes(ch.id);
                    const isActive = i === challengeIdx;
                    return (
                      <button
                        key={ch.id}
                        onClick={() => handleSelectChallenge(i)}
                        title={ch.title}
                        className={`w-5 h-5 rounded text-[10px] font-bold transition cursor-pointer ${
                          isActive
                            ? 'bg-indigo-600 text-white ring-2 ring-indigo-300'
                            : isSolved
                            ? 'bg-emerald-500 text-white'
                            : 'bg-white text-slate-600 border border-indigo-200 hover:bg-indigo-100'
                        }`}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Dua Zon Drop Kation (+) & Anion (−) */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              {/* Drop Zone Kation */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'copy';
                  setHoverZone('cation');
                }}
                onDragLeave={() => setHoverZone(null)}
                onDrop={(e) => handleDropOnZone(e, 'cation')}
                className={`relative rounded-xl border-2 px-3 py-2 min-h-[72px] flex flex-col justify-center transition ${
                  hoverZone === 'cation' || draggingKind === 'cation'
                    ? 'border-dashed border-sky-500 bg-sky-50 ring-2 ring-sky-200'
                    : cation
                    ? 'border-sky-300 bg-sky-50/70'
                    : 'border-dashed border-slate-300 bg-slate-50'
                }`}
              >
                {cation ? (
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-sky-700 block">
                        Kation Dipilih
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-extrabold text-slate-900">
                          <IonFormulaRich ion={cation} />
                        </span>
                        <span className="text-xs font-semibold text-slate-600">
                          ({cation.name})
                        </span>
                      </div>
                      <span className="inline-block mt-0.5 text-[10px] font-bold text-sky-800 bg-white border border-sky-200 px-1.5 rounded">
                        Cas: +{cation.charge}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedCationId(null)}
                      className="p-1 rounded-lg hover:bg-sky-200/70 text-slate-500 hover:text-slate-800 transition cursor-pointer"
                      title="Buang kation"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center space-y-0.5 pointer-events-none">
                    <span className="text-xs font-extrabold text-sky-700 block">
                      + Zon Kation
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      Seret ion (+) dari panel kiri ke sini
                    </span>
                  </div>
                )}
              </div>

              <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-extrabold text-sm shrink-0">
                +
              </div>

              {/* Drop Zone Anion */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'copy';
                  setHoverZone('anion');
                }}
                onDragLeave={() => setHoverZone(null)}
                onDrop={(e) => handleDropOnZone(e, 'anion')}
                className={`relative rounded-xl border-2 px-3 py-2 min-h-[72px] flex flex-col justify-center transition ${
                  hoverZone === 'anion' || draggingKind === 'anion'
                    ? 'border-dashed border-rose-500 bg-rose-50 ring-2 ring-rose-200'
                    : anion
                    ? 'border-rose-300 bg-rose-50/70'
                    : 'border-dashed border-slate-300 bg-slate-50'
                }`}
              >
                {anion ? (
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-rose-700 block">
                        Anion Dipilih
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-extrabold text-slate-900">
                          <IonFormulaRich ion={anion} />
                        </span>
                        <span className="text-xs font-semibold text-slate-600">
                          ({anion.name})
                        </span>
                      </div>
                      <span className="inline-block mt-0.5 text-[10px] font-bold text-rose-800 bg-white border border-rose-200 px-1.5 rounded">
                        Cas: −{anion.charge}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedAnionId(null)}
                      className="p-1 rounded-lg hover:bg-rose-200/70 text-slate-500 hover:text-slate-800 transition cursor-pointer"
                      title="Buang anion"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center space-y-0.5 pointer-events-none">
                    <span className="text-xs font-extrabold text-rose-700 block">
                      − Zon Anion
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      Seret ion (−) dari panel kanan ke sini
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Bahagian Hasil Formula & Penerangan */}
            {result ? (
              <>
                {/* Banner Formula Kimia & Nama Sebatian */}
                <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="bg-white border border-emerald-200 rounded-xl px-3.5 py-1.5 shadow-sm">
                      <CompoundFormulaRich
                        result={result}
                        className="text-2xl sm:text-3xl text-emerald-800"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                        Formula Kimia Sebatian Ion
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight truncate">
                        {result.compoundName}
                      </h3>
                      <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] font-semibold bg-white text-slate-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                          Nisbah {result.catCount} {formatUnicodeIon(result.cation)} :{' '}
                          {result.anCount} {formatUnicodeIon(result.anion)}
                        </span>
                        {result.divisor > 1 && (
                          <span className="text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-full">
                            Dipermudahkan ({result.rawCatCount}:{result.rawAnCount} → 1:1)
                          </span>
                        )}
                        {(result.needsCatParens || result.needsAnParens) && (
                          <span className="text-[10px] font-bold bg-violet-100 text-violet-800 border border-violet-200 px-2 py-0.5 rounded-full">
                            Kurungan Ion Poliatom ( )
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyFormula}
                    className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold flex items-center gap-1 transition cursor-pointer shrink-0"
                    title="Salin nama dan formula"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Disalin
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Salin
                      </>
                    )}
                  </button>
                </div>

                {/* Grid Visual Kaedah Silang / Kad Ion + 4 Langkah Penerangan */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
                  {/* Panel Visual (Rajah 3.16 Kaedah Silang ATAU Kad Formula Ion Aktiviti 3.15) */}
                  <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex flex-col justify-between space-y-2">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
                        Visual Binaan
                      </span>
                      <div className="inline-flex bg-white border border-slate-200 rounded-lg p-0.5">
                        <button
                          onClick={() => setVisualView('cross')}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition cursor-pointer ${
                            visualView === 'cross'
                              ? 'bg-indigo-600 text-white'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Kaedah Silang
                        </button>
                        <button
                          onClick={() => setVisualView('cards')}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition cursor-pointer ${
                            visualView === 'cards'
                              ? 'bg-indigo-600 text-white'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Kad Ion
                        </button>
                      </div>
                    </div>

                    {visualView === 'cross' ? (
                      /* Rajah 3.16: Kaedah Silang + Kotak Semak Cas */
                      <div className="space-y-1.5">
                        <div className="bg-white border border-slate-200 rounded-xl p-2.5 text-center">
                          <div className="grid grid-cols-2 gap-3 items-center">
                            <div className="bg-sky-50 border border-sky-200 rounded-lg py-1.5 px-2">
                              <span className="text-[9px] font-bold text-sky-700 block">
                                Kation
                              </span>
                              <div className="text-base font-extrabold text-slate-900 inline-flex items-baseline">
                                <TokenSequence tokens={result.cation.tokens} />
                                <sup className="ml-0.5 px-1 rounded-full bg-rose-100 text-rose-700 border border-rose-300 text-[10px] font-extrabold">
                                  {formatChargeSup(result.cation.charge, 'cation')}
                                </sup>
                              </div>
                            </div>
                            <div className="bg-rose-50 border border-rose-200 rounded-lg py-1.5 px-2">
                              <span className="text-[9px] font-bold text-rose-700 block">
                                Anion
                              </span>
                              <div className="text-base font-extrabold text-slate-900 inline-flex items-baseline">
                                <TokenSequence tokens={result.anion.tokens} />
                                <sup className="ml-0.5 px-1 rounded-full bg-rose-100 text-rose-700 border border-rose-300 text-[10px] font-extrabold">
                                  {formatChargeSup(result.anion.charge, 'anion')}
                                </sup>
                              </div>
                            </div>
                          </div>

                          {/* Anak panah silang SVG */}
                          <svg
                            viewBox="0 0 220 42"
                            className="w-full h-10 mx-auto overflow-visible"
                            aria-label="Anak panah kaedah silang"
                          >
                            <defs>
                              <marker
                                id="arrow-cat"
                                markerWidth="6"
                                markerHeight="6"
                                refX="5"
                                refY="3"
                                orient="auto"
                              >
                                <path d="M0,0 L6,3 L0,6 Z" fill="#0284c7" />
                              </marker>
                              <marker
                                id="arrow-an"
                                markerWidth="6"
                                markerHeight="6"
                                refX="5"
                                refY="3"
                                orient="auto"
                              >
                                <path d="M0,0 L6,3 L0,6 Z" fill="#e11d48" />
                              </marker>
                            </defs>
                            {/* Kation cas -> bilangan anion */}
                            <line
                              x1="62"
                              y1="4"
                              x2="156"
                              y2="37"
                              stroke="#0284c7"
                              strokeWidth="1.8"
                              markerEnd="url(#arrow-cat)"
                            />
                            {/* Anion cas -> bilangan kation */}
                            <line
                              x1="158"
                              y1="4"
                              x2="64"
                              y2="37"
                              stroke="#e11d48"
                              strokeWidth="1.8"
                              markerEnd="url(#arrow-an)"
                            />
                          </svg>

                          <div className="grid grid-cols-2 gap-3 text-xs font-extrabold">
                            <div className="text-rose-700 bg-rose-50/70 border border-rose-200 rounded-md py-0.5">
                              Bil. kation = {result.rawCatCount}
                            </div>
                            <div className="text-sky-700 bg-sky-50/70 border border-sky-200 rounded-md py-0.5">
                              Bil. anion = {result.rawAnCount}
                            </div>
                          </div>

                          {result.divisor > 1 && (
                            <div className="mt-1.5 text-[10px] font-extrabold text-amber-900 bg-amber-50 border border-amber-200 rounded-md py-0.5 px-2">
                              ÷ {result.divisor} (Nisbah Teringkas) → {result.catCount} :{' '}
                              {result.anCount}
                            </div>
                          )}
                        </div>

                        {/* Kotak Semak Jumlah Cas = 0 (Rajah 3.16) */}
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2 text-[11px] font-mono text-emerald-950 space-y-0.5">
                          <div className="font-sans font-extrabold text-emerald-800 text-[10px] uppercase flex items-center gap-1">
                            <Scale className="w-3 h-3" /> Semakan Cas (Rajah 3.16)
                          </div>
                          <div className="flex justify-between">
                            <span>Cas positif:</span>
                            <span className="font-bold">
                              {result.catCount} × (+{result.cation.charge}) = +
                              {result.totalCharge}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Cas negatif:</span>
                            <span className="font-bold">
                              {result.anCount} × (−{result.anion.charge}) = −
                              {result.totalCharge}
                            </span>
                          </div>
                          <div className="flex justify-between border-t border-emerald-200 pt-0.5 font-extrabold text-emerald-800">
                            <span>Jumlah cas:</span>
                            <span>0 (Neutral ✓)</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Visual Kad Formula Ion (Aktiviti 3.15): tinggi blok berkadaran dengan magnitud cas */
                      <div className="bg-white border border-slate-200 rounded-xl p-2.5 flex-1 flex flex-col justify-between space-y-2">
                        <p className="text-[10px] text-slate-600 leading-snug">
                          Tinggi setiap <strong>Kad Ion</strong> mewakili casnya. Kedua-dua turus mesti{' '}
                          <strong>sama tinggi</strong> agar cas neutral (= 0).
                        </p>

                        <div className="grid grid-cols-2 gap-2.5 items-stretch bg-slate-50 border border-slate-200 rounded-lg p-2">
                          <div className="flex flex-col justify-end gap-1">
                            {Array.from({ length: result.catCount }).map((_, idx) => (
                              <div
                                key={idx}
                                style={{ height: `${result.cation.charge * 22}px` }}
                                className="w-full rounded-md bg-sky-100 border border-sky-400 flex items-center justify-center text-xs font-extrabold text-sky-900 shadow-xs"
                              >
                                <IonFormulaRich ion={result.cation} />
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-col justify-end gap-1">
                            {Array.from({ length: result.anCount }).map((_, idx) => (
                              <div
                                key={idx}
                                style={{ height: `${result.anion.charge * 22}px` }}
                                className="w-full rounded-md bg-rose-100 border border-rose-400 flex items-center justify-center text-xs font-extrabold text-rose-900 shadow-xs"
                              >
                                <IonFormulaRich ion={result.anion} />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between text-[10px] font-bold px-1">
                          <span className="text-sky-800">
                            {result.catCount} kad (+{result.totalCharge})
                          </span>
                          <span className="text-emerald-700">Seimbang ✓</span>
                          <span className="text-rose-800">
                            {result.anCount} kad (−{result.totalCharge})
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Panel Kanan: Penerangan 4 Langkah Penghasilan Formula Kimia */}
                  <div className="md:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        Penerangan Penghasilan Formula Kimia
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500">SP 3.3.5 KSSM</span>
                    </div>

                    <div className="space-y-1.5">
                      {result.steps.map((st, idx) => (
                        <div
                          key={idx}
                          className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] leading-snug"
                        >
                          <div className="font-extrabold text-slate-900">{st.title}</div>
                          <p className="text-slate-600 mt-0.5">{st.detail}</p>
                          {st.highlight && (
                            <div className="mt-1 inline-block text-[10px] font-extrabold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                              {st.highlight}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Keadaan Menunggu Pengguna Seret Kation & Anion */
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-extrabold text-slate-900">
                  Pilih atau Seret 1 Kation (+) dan 1 Anion (−)
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  {!cation && !anion
                    ? 'Seret mana-mana kad kation dari panel kiri dan kad anion dari panel kanan ke dalam zon di atas untuk menghasilkan formula kimia serta penerangan terperinci.'
                    : !cation
                    ? `Bagus! Anda telah memilih ${anion!.name} (${formatUnicodeIon(anion!)}). Sekarang seret atau klik satu Kation (+) di panel kiri.`
                    : `Bagus! Anda telah memilih ${cation!.name} (${formatUnicodeIon(cation!)}). Sekarang seret atau klik satu Anion (−) di panel kanan.`}
                </p>
              </div>
            )}
          </div>

          {/* LAJUR KANAN: 12 ANION (Jadual 3.7) */}
          <div className="lg:col-span-3 bg-white border border-rose-200 rounded-2xl p-2.5 shadow-sm">
            <div className="flex items-center justify-between px-1 pb-2 mb-2 border-b border-rose-100">
              <div>
                <h4 className="text-xs font-extrabold text-rose-900 uppercase tracking-wide">
                  Anion (−)
                </h4>
                <p className="text-[10px] text-slate-500">12 ion negatif Jadual 3.7</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                Seret / Klik
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 gap-1.5">
              {ANIONS.map((a) => {
                const isSelected = selectedAnionId === a.id;
                return (
                  <button
                    key={a.id}
                    type="button"
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'anion', a.id)}
                    onDragEnd={handleDragEnd}
                    onClick={() => applySelection('anion', a.id)}
                    className={`group relative flex flex-col justify-between p-1.5 rounded-xl border text-left transition cursor-grab active:cursor-grabbing select-none ${
                      isSelected
                        ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-400/50 shadow-sm'
                        : 'bg-slate-50/70 hover:bg-rose-50/70 border-slate-200 hover:border-rose-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 w-full">
                      <span className="text-sm font-extrabold text-slate-900 leading-none">
                        <IonFormulaRich ion={a} />
                      </span>
                      <span
                        className={`text-[9px] font-extrabold px-1 py-0.5 rounded border leading-none ${chargeBadgeColor(
                          'anion',
                          a.charge
                        )}`}
                      >
                        −{a.charge}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-1 mt-1">
                      <span className="text-[10px] font-medium text-slate-600 truncate">
                        {a.compoundPart}
                      </span>
                      <GripVertical className="w-2.5 h-2.5 text-slate-300 group-hover:text-rose-500 shrink-0" />
                    </div>
                    {a.isPolyatomic && (
                      <span className="mt-0.5 inline-block self-start text-[8px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-1 rounded">
                        Poliatom
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
