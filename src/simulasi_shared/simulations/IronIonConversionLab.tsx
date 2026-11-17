import React, { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeftRight,
  BookOpen,
  CheckCircle2,
  Droplets,
  FlaskConical,
  Maximize2,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react';
import { analytics } from '../services/analytics';

type IonState = 'Fe2+' | 'Fe3+';
type ReagentKind = 'oxidizing' | 'reducing';
type DeliveryType = 'dropper' | 'powder' | 'gas';
type ConfirmatoryId = 'naoh' | 'k4fe' | 'kscn';

interface RedoxReagent {
  id: string;
  kind: ReagentKind;
  name: string;
  shortName: string;
  formula: string;
  reagentNote: string;
  delivery: DeliveryType;
  dropletHex: string;
  partnerParticleLabel: string;
  partnerColorHex: string;
  halfEqOxidation: string;
  halfEqReduction: string;
  overallIonicEq: string;
  observation: string;
  electronExplanation: string;
}

const OXIDIZING_AGENTS: RedoxReagent[] = [
  {
    id: 'br2',
    kind: 'oxidizing',
    name: 'Air bromin',
    shortName: 'Air bromin (Br₂)',
    formula: 'Br₂(ak)',
    reagentNote: 'Larutan perang kemerahan',
    delivery: 'dropper',
    dropletHex: '#c2410c',
    partnerParticleLabel: 'Br₂',
    partnerColorHex: '#ea580c',
    halfEqOxidation: 'Fe²⁺(ak) → Fe³⁺(ak) + e⁻',
    halfEqReduction: 'Br₂(ak) + 2e⁻ → 2Br⁻(ak)',
    overallIonicEq: '2Fe²⁺(ak) + Br₂(ak) → 2Fe³⁺(ak) + 2Br⁻(ak)',
    observation: 'Warna perang air bromin menyahwarna; larutan hijau muda bertukar menjadi perang.',
    electronExplanation:
      'Ion Fe²⁺ membebaskan 1 elektron (mengalami pengoksidaan) menjadi ion Fe³⁺. Molekul bromin menerima elektron (mengalami penurunan) menjadi ion bromida, Br⁻.',
  },
  {
    id: 'cl2',
    kind: 'oxidizing',
    name: 'Air klorin',
    shortName: 'Air klorin (Cl₂)',
    formula: 'Cl₂(ak)',
    reagentNote: 'Larutan kuning kehijauan pucat',
    delivery: 'dropper',
    dropletHex: '#eab308',
    partnerParticleLabel: 'Cl₂',
    partnerColorHex: '#facc15',
    halfEqOxidation: 'Fe²⁺(ak) → Fe³⁺(ak) + e⁻',
    halfEqReduction: 'Cl₂(ak) + 2e⁻ → 2Cl⁻(ak)',
    overallIonicEq: '2Fe²⁺(ak) + Cl₂(ak) → 2Fe³⁺(ak) + 2Cl⁻(ak)',
    observation: 'Warna kuning kehijauan pucat air klorin menyahwarna; larutan hijau muda bertukar menjadi perang.',
    electronExplanation:
      'Ion Fe²⁺ membebaskan 1 elektron untuk dioksidakan kepada ion Fe³⁺, manakala molekul klorin menerima elektron untuk diturunkan kepada ion klorida, Cl⁻.',
  },
  {
    id: 'kmno4',
    kind: 'oxidizing',
    name: 'Kalium manganat(VII) berasid',
    shortName: 'KMnO₄ berasid',
    formula: 'MnO₄⁻ / H⁺',
    reagentNote: 'Larutan ungu pekat',
    delivery: 'dropper',
    dropletHex: '#9333ea',
    partnerParticleLabel: 'MnO₄⁻',
    partnerColorHex: '#a855f7',
    halfEqOxidation: 'Fe²⁺(ak) → Fe³⁺(ak) + e⁻',
    halfEqReduction: 'MnO₄⁻(ak) + 8H⁺(ak) + 5e⁻ → Mn²⁺(ak) + 4H₂O(ce)',
    overallIonicEq: 'MnO₄⁻(ak) + 5Fe²⁺(ak) + 8H⁺(ak) → Mn²⁺(ak) + 5Fe³⁺(ak) + 4H₂O(ce)',
    observation: 'Warna ungu larutan KMnO₄ berasid menyahwarna; larutan hijau muda bertukar menjadi perang.',
    electronExplanation:
      'Lima ion Fe²⁺ masing-masing membebaskan 1 elektron kepada satu ion manganat(VII), MnO₄⁻ dalam medium berasid untuk membentuk ion Mn²⁺ tidak berwarna dan ion Fe³⁺.',
  },
  {
    id: 'k2cr2o7',
    kind: 'oxidizing',
    name: 'Kalium dikromat(VI) berasid',
    shortName: 'K₂Cr₂O₇ berasid',
    formula: 'Cr₂O₇²⁻ / H⁺',
    reagentNote: 'Larutan jingga',
    delivery: 'dropper',
    dropletHex: '#ea580c',
    partnerParticleLabel: 'Cr₂O₇²⁻',
    partnerColorHex: '#fb923c',
    halfEqOxidation: 'Fe²⁺(ak) → Fe³⁺(ak) + e⁻',
    halfEqReduction: 'Cr₂O₇²⁻(ak) + 14H⁺(ak) + 6e⁻ → 2Cr³⁺(ak) + 7H₂O(ce)',
    overallIonicEq: 'Cr₂O₇²⁻(ak) + 6Fe²⁺(ak) + 14H⁺(ak) → 2Cr³⁺(ak) + 6Fe³⁺(ak) + 7H₂O(ce)',
    observation: 'Larutan jingga K₂Cr₂O₇ berasid bertukar menjadi campuran ion Cr³⁺ (hijau) & ion Fe³⁺ (perang).',
    electronExplanation:
      'Enam ion Fe²⁺ membebaskan elektron kepada ion dikromat(VI), Cr₂O₇²⁻ dalam keadaan berasid untuk menurunkannya menjadi ion kromium(III), Cr³⁺ sambil menghasilkan ion Fe³⁺.',
  },
];

const REDUCING_AGENTS: RedoxReagent[] = [
  {
    id: 'zn',
    kind: 'reducing',
    name: 'Serbuk Zink',
    shortName: 'Zink (Zn)',
    formula: 'Zn(p)',
    reagentNote: 'Pepejal logam kelabu',
    delivery: 'powder',
    dropletHex: '#94a3b8',
    partnerParticleLabel: 'Zn',
    partnerColorHex: '#cbd5e1',
    halfEqOxidation: 'Zn(p) → Zn²⁺(ak) + 2e⁻',
    halfEqReduction: 'Fe³⁺(ak) + e⁻ → Fe²⁺(ak)',
    overallIonicEq: 'Zn(p) + 2Fe³⁺(ak) → Zn²⁺(ak) + 2Fe²⁺(ak)',
    observation: 'Sebahagian serbuk zink kelabu melarut; larutan perang bertukar menjadi hijau muda.',
    electronExplanation:
      'Atom zink lebih elektropositif dan membebaskan 2 elektron membentuk ion Zn²⁺. Dua ion Fe³⁺ menerima elektron tersebut (mengalami penurunan) menjadi ion Fe²⁺.',
  },
  {
    id: 'mg',
    kind: 'reducing',
    name: 'Serbuk Magnesium',
    shortName: 'Magnesium (Mg)',
    formula: 'Mg(p)',
    reagentNote: 'Serbuk logam kelabu berkilat',
    delivery: 'powder',
    dropletHex: '#cbd5e1',
    partnerParticleLabel: 'Mg',
    partnerColorHex: '#e2e8f0',
    halfEqOxidation: 'Mg(p) → Mg²⁺(ak) + 2e⁻',
    halfEqReduction: 'Fe³⁺(ak) + e⁻ → Fe²⁺(ak)',
    overallIonicEq: 'Mg(p) + 2Fe³⁺(ak) → Mg²⁺(ak) + 2Fe²⁺(ak)',
    observation: 'Serbuk magnesium melarut dengan cergas; larutan perang bertukar menjadi hijau muda.',
    electronExplanation:
      'Atom magnesium membebaskan 2 elektron (pengoksidaan) membentuk ion Mg²⁺, lalu memindahkan elektron kepada ion Fe³⁺ supaya diturunkan kepada ion Fe²⁺.',
  },
  {
    id: 'so2',
    kind: 'reducing',
    name: 'Gas Sulfur dioksida',
    shortName: 'Gas SO₂',
    formula: 'SO₂(g)',
    reagentNote: 'Gas tidak berwarna berbau sengit',
    delivery: 'gas',
    dropletHex: '#e0f2fe',
    partnerParticleLabel: 'SO₂',
    partnerColorHex: '#7dd3fc',
    halfEqOxidation: 'SO₂(g) + 2H₂O(ce) → SO₄²⁻(ak) + 4H⁺(ak) + 2e⁻',
    halfEqReduction: 'Fe³⁺(ak) + e⁻ → Fe²⁺(ak)',
    overallIonicEq: 'SO₂(g) + 2H₂O(ce) + 2Fe³⁺(ak) → SO₄²⁻(ak) + 4H⁺(ak) + 2Fe²⁺(ak)',
    observation: 'Gelembung gas SO₂ dialirkan ke dalam larutan; warna perang larutan bertukar kepada hijau muda.',
    electronExplanation:
      'Molekul SO₂ bertindak balas dengan air dan membebaskan 2 elektron membentuk ion sulfat, SO₄²⁻. Ion Fe³⁺ menerima elektron ini untuk diturunkan menjadi ion Fe²⁺.',
  },
  {
    id: 'ki',
    kind: 'reducing',
    name: 'Larutan Kalium iodida',
    shortName: 'Larutan KI',
    formula: 'I⁻(ak)',
    reagentNote: 'Larutan jernih tidak berwarna',
    delivery: 'dropper',
    dropletHex: '#e2e8f0',
    partnerParticleLabel: 'I⁻',
    partnerColorHex: '#a5b4fc',
    halfEqOxidation: '2I⁻(ak) → I₂(ak) + 2e⁻',
    halfEqReduction: 'Fe³⁺(ak) + e⁻ → Fe²⁺(ak)',
    overallIonicEq: '2I⁻(ak) + 2Fe³⁺(ak) → I₂(ak) + 2Fe²⁺(ak)',
    observation: 'Ion Fe³⁺ diturunkan kepada Fe²⁺ (hijau muda) manakala ion iodida dioksidakan kepada iodin, I₂.',
    electronExplanation:
      'Dua ion iodida, I⁻ membebaskan 2 elektron membentuk molekul iodin, I₂. Setiap ion Fe³⁺ menerima 1 elektron untuk menjadi ion Fe²⁺.',
  },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getIonSolutionRgb(progressToFe3: number): [number, number, number] {
  // Pale green (Fe2+: rgb(74, 222, 128)) -> Amber brown (Fe3+: rgb(217, 119, 6))
  const r = Math.round(lerp(74, 217, progressToFe3));
  const g = Math.round(lerp(222, 119, progressToFe3));
  const b = Math.round(lerp(128, 6, progressToFe3));
  return [r, g, b];
}

interface MainTestTubeCanvasProps {
  currentIon: IonState;
  activeReagent: RedoxReagent | null;
  reactionProgress: number; // 0..1 during active animation, 1 when idle
  isReacting: boolean;
  starterLabel: string;
}

const MainTestTubeCanvas: React.FC<MainTestTubeCanvasProps> = ({
  currentIon,
  activeReagent,
  reactionProgress,
  isReacting,
  starterLabel,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({
    currentIon,
    activeReagent,
    reactionProgress,
    isReacting,
    starterLabel,
  });
  stateRef.current = { currentIon, activeReagent, reactionProgress, isReacting, starterLabel };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const startMs = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startMs) / 1000;
      const dpr = window.devicePixelRatio || 1;
      const cssW = 300;
      const cssH = 216;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);

      const {
        currentIon: ion,
        activeReagent: reagent,
        reactionProgress: prog,
        isReacting: reacting,
      } = stateRef.current;

      // Subtle lab backdrop grid
      ctx.fillStyle = '#070b14';
      ctx.fillRect(0, 0, cssW, cssH);

      // Compute continuous blend value (0 = Fe2+ pale green, 1 = Fe3+ brown)
      let blendToFe3 = ion === 'Fe3+' ? 1 : 0;
      if (reacting && reagent) {
        blendToFe3 = reagent.kind === 'oxidizing' ? prog : 1 - prog;
      }
      const [sr, sg, sb] = getIonSolutionRgb(blendToFe3);

      // Test tube geometry (centered cleanly at x=138 so textbook labels fit on left & right)
      const cx = 136;
      const tubeW = 46;
      const tubeTop = 58;
      const tubeBottom = 186;
      const tubeR = tubeW / 2;

      // Lab bench & wooden/metal base stand
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.roundRect(72, 194, 128, 10, 4);
      ctx.fill();
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Stand vertical rod & clamp behind tube (subtle textbook clarity)
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(82, 194);
      ctx.lineTo(82, 34);
      ctx.stroke();
      ctx.fillStyle = '#64748b';
      ctx.fillRect(82, 92, 31, 4);

      // Liquid interior clip path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx - tubeR + 2, tubeTop + 10);
      ctx.lineTo(cx - tubeR + 2, tubeBottom - tubeR);
      ctx.arc(cx, tubeBottom - tubeR, tubeR - 2, Math.PI, 0, true);
      ctx.lineTo(cx + tubeR - 2, tubeTop + 10);
      ctx.closePath();
      ctx.clip();

      // Solution body (meniscus at y=114)
      const liqTop = 112;
      const grad = ctx.createLinearGradient(cx - tubeR, liqTop, cx + tubeR, tubeBottom);
      grad.addColorStop(0, `rgba(${sr}, ${sg}, ${sb}, 0.85)`);
      grad.addColorStop(0.6, `rgba(${Math.max(0, sr - 18)}, ${Math.max(0, sg - 18)}, ${Math.max(0, sb - 10)}, 0.92)`);
      grad.addColorStop(1, `rgba(${Math.max(0, sr - 36)}, ${Math.max(0, sg - 36)}, ${Math.max(0, sb - 20)}, 0.96)`);
      ctx.fillStyle = grad;
      ctx.fillRect(cx - tubeR, liqTop, tubeW, tubeBottom - liqTop);

      // Animated reagent plume inside liquid during reaction
      if (reacting && reagent) {
        const plumeAlpha = Math.sin(Math.min(1, prog) * Math.PI) * 0.55;
        ctx.fillStyle = reagent.dropletHex;
        ctx.globalAlpha = plumeAlpha;
        for (let i = 0; i < 4; i++) {
          const py = liqTop + 14 + ((elapsed * 42 + i * 18) % 52);
          const px = cx + Math.sin(elapsed * 4 + i * 1.9) * 10;
          ctx.beginPath();
          ctx.arc(px, py, 5 + (i % 2) * 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      // Powder granules settling at bottom for Zn / Mg
      if (reagent && reagent.delivery === 'powder' && (reacting || ion === 'Fe2+')) {
        const settleCount = 9;
        for (let i = 0; i < settleCount; i++) {
          const gx = cx - 12 + ((i * 5) % 24);
          const fallY = reacting && prog < 0.65
            ? liqTop + 4 + ((elapsed * 65 + i * 11) % 62)
            : tubeBottom - 6 - (i % 3) * 2.5;
          ctx.fillStyle = i % 2 === 0 ? '#cbd5e1' : '#94a3b8';
          ctx.beginPath();
          ctx.arc(gx, fallY, 1.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Rising gas bubbles for SO2 (or slight effervescence on active metal powder)
      if (reacting && reagent && (reagent.delivery === 'gas' || reagent.delivery === 'powder')) {
        const bubbleCount = reagent.delivery === 'gas' ? 8 : 4;
        for (let i = 0; i < bubbleCount; i++) {
          const by = tubeBottom - 12 - ((elapsed * 58 + i * 13) % 60);
          const bx = cx + Math.sin(elapsed * 5 + i) * (reagent.delivery === 'gas' ? 6 : 11);
          ctx.strokeStyle = 'rgba(255,255,255,0.75)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(bx, by, reagent.delivery === 'gas' ? 2.4 : 1.7, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Meniscus surface curve
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(cx - tubeR + 2, liqTop);
      ctx.quadraticCurveTo(cx, liqTop + 5, cx + tubeR - 2, liqTop);
      ctx.stroke();

      ctx.restore();

      // Glass outer wall + glossy highlight
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - tubeR, tubeTop);
      ctx.lineTo(cx - tubeR, tubeBottom - tubeR);
      ctx.arc(cx, tubeBottom - tubeR, tubeR, Math.PI, 0, true);
      ctx.lineTo(cx + tubeR, tubeTop);
      ctx.stroke();

      // Lip rim at top of test tube
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.ellipse(cx, tubeTop, tubeR + 2, 4, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Glass specular streak
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - tubeR + 7, tubeTop + 12);
      ctx.lineTo(cx - tubeR + 7, tubeBottom - tubeR - 2);
      ctx.stroke();

      // Active Delivery Apparatus (Dropper / Spatula / Gas Delivery Tube)
      if (reacting && reagent) {
        if (reagent.delivery === 'dropper') {
          // Dropper tip centered above test tube mouth
          ctx.fillStyle = '#334155';
          ctx.strokeStyle = '#cbd5e1';
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.moveTo(cx - 5, 16);
          ctx.lineTo(cx + 5, 16);
          ctx.lineTo(cx + 2, 42);
          ctx.lineTo(cx - 2, 42);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          // Rubber bulb
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.roundRect(cx - 6, 6, 12, 11, 4);
          ctx.fill();

          // Falling colored droplet
          const dropPhase = (elapsed * 2.2) % 1;
          const dropY = 44 + dropPhase * 66;
          ctx.fillStyle = reagent.dropletHex;
          ctx.beginPath();
          ctx.arc(cx, dropY, 3.6, 0, Math.PI * 2);
          ctx.fill();
        } else if (reagent.delivery === 'powder') {
          // Angled metal spatula above mouth
          ctx.save();
          ctx.translate(cx + 8, 28);
          ctx.rotate(-0.35);
          ctx.fillStyle = '#cbd5e1';
          ctx.fillRect(-16, -2, 48, 4);
          // Powder heap on spatula tip
          ctx.fillStyle = '#94a3b8';
          ctx.beginPath();
          ctx.arc(-10, -3, 5, Math.PI, 0);
          ctx.fill();
          ctx.restore();

          // Falling powder grains into neck
          for (let i = 0; i < 5; i++) {
            const gy = 34 + ((elapsed * 75 + i * 16) % 78);
            const gx = cx - 4 + (i % 3) * 4;
            ctx.fillStyle = '#e2e8f0';
            ctx.beginPath();
            ctx.arc(gx, gy, 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (reagent.delivery === 'gas') {
          // Bent glass delivery tube dipping into bottom of solution
          ctx.strokeStyle = '#93c5fd';
          ctx.lineWidth = 3.2;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.beginPath();
          ctx.moveTo(cx + 70, 22);
          ctx.lineTo(cx + 12, 22);
          ctx.lineTo(cx + 4, 174);
          ctx.stroke();

          ctx.strokeStyle = '#0f172a';
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.moveTo(cx + 70, 22);
          ctx.lineTo(cx + 12, 22);
          ctx.lineTo(cx + 4, 174);
          ctx.stroke();
        }
      }

      // Clean textbook callout labels
      ctx.font = '600 10px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'left';

      // Right label: Apparatus input
      if (reagent && reacting) {
        const inputLabel =
          reagent.delivery === 'dropper'
            ? `Penitis (${reagent.formula})`
            : reagent.delivery === 'powder'
            ? `Spatula (${reagent.formula})`
            : `Tiub gas (${reagent.formula})`;
        ctx.fillStyle = '#facc15';
        ctx.fillText(inputLabel, cx + 32, 34);
      } else {
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('Mulut tabung uji', cx + 32, 54);
      }
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 0.9;
      ctx.setLineDash([3, 2]);
      ctx.beginPath();
      ctx.moveTo(cx + 26, 60);
      ctx.lineTo(cx + 38, 60);
      ctx.stroke();
      ctx.setLineDash([]);

      // Right label: Solution ion & color
      const ionTitle = blendToFe3 >= 0.5 ? 'Ion Ferum(III), Fe³⁺' : 'Ion Ferum(II), Fe²⁺';
      const colorLabel = blendToFe3 >= 0.5 ? 'Warna: Perang' : 'Warna: Hijau muda';
      ctx.fillStyle = blendToFe3 >= 0.5 ? '#fbbf24' : '#4ade80';
      ctx.font = '700 11px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText(ionTitle, cx + 34, 134);
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '500 10px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText(colorLabel, cx + 34, 149);

      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(cx + 22, 138);
      ctx.lineTo(cx + 31, 138);
      ctx.stroke();

      // Left label: Kaki retort & Tabung uji
      ctx.textAlign = 'right';
      ctx.fillStyle = '#94a3b8';
      ctx.font = '500 10px ui-sans-serif, system-ui, sans-serif';
      ctx.fillText('Pemegang', 75, 95);
      ctx.fillText('Tabung uji', cx - 28, 165);
      ctx.strokeStyle = '#64748b';
      ctx.beginPath();
      ctx.moveTo(cx - 26, 162);
      ctx.lineTo(cx - 22, 162);
      ctx.stroke();

      ctx.restore();
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 300, height: 216 }}
      className="w-full max-w-[300px] h-[216px] mx-auto block rounded-xl border border-slate-800 bg-[#070b14]"
    />
  );
};

interface SubmicroMagnifierCanvasProps {
  currentIon: IonState;
  activeReagent: RedoxReagent | null;
  reactionProgress: number;
  isReacting: boolean;
  size?: number;
}

const SubmicroMagnifierCanvas: React.FC<SubmicroMagnifierCanvasProps> = ({
  currentIon,
  activeReagent,
  reactionProgress,
  isReacting,
  size = 212,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ currentIon, activeReagent, reactionProgress, isReacting, size });
  stateRef.current = { currentIon, activeReagent, reactionProgress, isReacting, size };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const startMs = performance.now();

    const drawSphere = (
      x: number,
      y: number,
      r: number,
      fillHex: string,
      label: string,
      textColor = '#090d16'
    ) => {
      const grad = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.15, x, y, r);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.28, fillHex);
      grad.addColorStop(1, fillHex);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.45)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = textColor;
      ctx.font = `800 ${r >= 13 ? 9.5 : 8.5}px ui-sans-serif, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x, y + 0.5);
    };

    const render = (now: number) => {
      const t = (now - startMs) / 1000;
      const {
        currentIon: ion,
        activeReagent: reagent,
        reactionProgress: prog,
        isReacting: reacting,
        size: boxSize,
      } = stateRef.current;

      const dpr = window.devicePixelRatio || 1;
      const cssW = boxSize;
      const cssH = boxSize;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);

      const cx = cssW / 2;
      const cy = cssH / 2;
      const lensR = cssW * 0.455;
      const sc = cssW / 212;

      // Circular dark submicroscopic lens background
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, lensR, 0, Math.PI * 2);
      ctx.clip();

      const bg = ctx.createRadialGradient(cx, cy, 8, cx, cy, lensR);
      bg.addColorStop(0, '#0f172a');
      bg.addColorStop(1, '#04070e');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, cssW, cssH);

      // Subtle concentric radar/orbital ring inside loupe
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, lensR * 0.62, 0, Math.PI * 2);
      ctx.stroke();

      // Determine particle choreography
      if (reacting && reagent) {
        const isOx = reagent.kind === 'oxidizing';
        // Smooth loop of collision & electron transfer across progress 0..1 (or repeating pulse during reaction)
        const phase = (t * 0.85) % 1;
        const collide = Math.min(1, phase / 0.45);
        const transferred = phase >= 0.45;
        const eProgress = transferred ? Math.min(1, (phase - 0.45) / 0.35) : 0;

        // Left particle: Iron ion (or right when reducing)
        const ironStartX = cx - 44 * sc;
        const ironMeetX = cx - 18 * sc;
        const ironX = transferred
          ? lerp(ironMeetX, cx - 36 * sc, eProgress)
          : lerp(ironStartX, ironMeetX, collide);
        const ironY = cy + Math.sin(t * 2.5) * 6 * sc;

        // Right particle: Partner agent (oxidizing molecule OR reducing metal/molecule)
        const partnerStartX = cx + 44 * sc;
        const partnerMeetX = cx + 18 * sc;
        const partnerX = transferred
          ? lerp(partnerMeetX, cx + 36 * sc, eProgress)
          : lerp(partnerStartX, partnerMeetX, collide);
        const partnerY = cy - Math.sin(t * 2.2) * 5 * sc;

        // Iron ion radius & color transition:
        // Oxidation: Fe2+ (r=15.5, green) -> loses 1 e- -> shrinks to Fe3+ (r=12, brown)
        // Reduction: Fe3+ (r=12, brown) -> gains 1 e- -> expands to Fe2+ (r=15.5, green)
        const rBig = 15.5 * sc;
        const rSmall = 12 * sc;
        const ironTurnsAfterTransfer = eProgress > 0.35;
        const ironIsNowFe3 = isOx ? ironTurnsAfterTransfer : !ironTurnsAfterTransfer;
        const ironR = ironIsNowFe3 ? rSmall : rBig;
        const ironColor = ironIsNowFe3 ? '#f59e0b' : '#4ade80';
        const ironLabel = ironIsNowFe3 ? 'Fe³⁺' : 'Fe²⁺';

        drawSphere(ironX, ironY, ironR, ironColor, ironLabel);

        // Partner particle (if metal powder Zn/Mg, draw metallic lattice cluster at right)
        drawSphere(
          partnerX,
          partnerY,
          14.5 * sc,
          reagent.partnerColorHex,
          reagent.partnerParticleLabel,
          '#0f172a'
        );

        // Collision glow ring right at moment of electron transfer
        if (phase >= 0.4 && phase <= 0.72) {
          ctx.strokeStyle = 'rgba(250, 204, 21, 0.7)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(cx, cy, (10 + (phase - 0.4) * 55) * sc, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Flying yellow glowing electron dot (e-)
        if (transferred && eProgress < 0.98) {
          const ex = isOx
            ? lerp(ironX, partnerX, eProgress)
            : lerp(partnerX, ironX, eProgress);
          const arcLift = Math.sin(eProgress * Math.PI) * 20 * sc;
          const ey = lerp(ironY, partnerY, 0.5) - arcLift;

          ctx.save();
          ctx.shadowColor = '#fde047';
          ctx.shadowBlur = 12;
          ctx.fillStyle = '#fde047';
          ctx.beginPath();
          ctx.arc(ex, ey, 4.5 * sc, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          ctx.fillStyle = '#fde047';
          ctx.font = `800 ${10 * sc}px ui-sans-serif, system-ui, sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText('e⁻', ex, ey - 10 * sc);
        }

        // Background spectator/converted ions for richness
        const bgIsFe3 = (isOx ? prog : 1 - prog) >= 0.5;
        drawSphere(
          cx - 32 * sc,
          cy - 54 * sc + Math.sin(t * 1.8) * 4 * sc,
          bgIsFe3 ? 10 * sc : 12.5 * sc,
          bgIsFe3 ? '#d97706' : '#22c55e',
          bgIsFe3 ? 'Fe³⁺' : 'Fe²⁺'
        );
        drawSphere(
          cx + 30 * sc,
          cy + 52 * sc + Math.cos(t * 1.9) * 4 * sc,
          bgIsFe3 ? 10 * sc : 12.5 * sc,
          bgIsFe3 ? '#d97706' : '#22c55e',
          bgIsFe3 ? 'Fe³⁺' : 'Fe²⁺'
        );
      } else {
        // Idle drifting ions matching current state (Fe2+ green r=15 vs Fe3+ brown r=11.5)
        const isFe3 = ion === 'Fe3+';
        const r = (isFe3 ? 12 : 15) * sc;
        const fill = isFe3 ? '#f59e0b' : '#4ade80';
        const label = isFe3 ? 'Fe³⁺' : 'Fe²⁺';

        const positions = [
          [cx - 34 * sc, cy - 28 * sc, 0.2],
          [cx + 32 * sc, cy - 24 * sc, 1.4],
          [cx - 4 * sc, cy + 4 * sc, 2.5],
          [cx - 36 * sc, cy + 36 * sc, 3.8],
          [cx + 34 * sc, cy + 34 * sc, 5.1],
        ];
        positions.forEach(([bx, by, off]) => {
          const dx = Math.sin(t * 1.4 + off) * 5 * sc;
          const dy = Math.cos(t * 1.6 + off) * 5 * sc;
          drawSphere(bx + dx, by + dy, r, fill, label);
        });
      }

      ctx.restore();

      // Magnifier glass rim
      ctx.strokeStyle = reacting ? '#facc15' : '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, lensR, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255,255,255,0.22)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, lensR - 3, Math.PI * 1.1, Math.PI * 1.45);
      ctx.stroke();

      ctx.restore();
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className="block mx-auto"
    />
  );
};

interface ConfirmatoryTubeProps {
  id: ConfirmatoryId;
  title: string;
  reagentFormula: string;
  testedIon: IonState | null;
  justDripped: boolean;
  onTest: () => void;
}

const ConfirmatoryTubeCard: React.FC<ConfirmatoryTubeProps> = ({
  id,
  title,
  reagentFormula,
  testedIon,
  justDripped,
  onTest,
}) => {
  // Exact KSSM scientific visual appearances on high-contrast dark background
  let liquidFill = 'rgba(134, 239, 172, 0.25)';
  let precipitateFill: string | null = null;
  let observationText = 'Klik "Titis" untuk uji sampel.';
  let resultBadgeColor = 'text-slate-400';

  if (testedIon === 'Fe2+') {
    if (id === 'naoh') {
      liquidFill = 'rgba(134, 239, 172, 0.30)';
      precipitateFill = '#4d6b3c'; // Dirty olive-green precipitate
      observationText = 'Mendakan hijau kotor (tidak larut dalam berlebihan).';
      resultBadgeColor = 'text-emerald-300';
    } else if (id === 'k4fe') {
      liquidFill = 'rgba(147, 197, 253, 0.35)';
      precipitateFill = '#60a5fa'; // Light blue precipitate
      observationText = 'Mendakan biru muda terbentuk.';
      resultBadgeColor = 'text-sky-300';
    } else {
      liquidFill = 'rgba(134, 239, 172, 0.28)';
      precipitateFill = null;
      observationText = 'Tiada perubahan (kekal hijau muda pucat).';
      resultBadgeColor = 'text-slate-300';
    }
  } else if (testedIon === 'Fe3+') {
    if (id === 'naoh') {
      liquidFill = 'rgba(245, 158, 11, 0.32)';
      precipitateFill = '#9a3412'; // Rust-brown precipitate
      observationText = 'Mendakan perang (tidak larut dalam berlebihan).';
      resultBadgeColor = 'text-amber-300';
    } else if (id === 'k4fe') {
      liquidFill = 'rgba(37, 99, 235, 0.50)';
      precipitateFill = '#1d4ed8'; // Deep Prussian blue precipitate
      observationText = 'Mendakan biru tua terbentuk.';
      resultBadgeColor = 'text-blue-300';
    } else {
      liquidFill = 'rgba(220, 38, 38, 0.90)'; // Vivid blood-red [Fe(SCN)]2+ solution
      precipitateFill = null;
      observationText = 'Larutan merah darah terbentuk.';
      resultBadgeColor = 'text-red-300 font-semibold';
    }
  }

  return (
    <div className="bg-[#090d16] border border-slate-800 rounded-xl p-2 flex flex-col justify-between gap-1.5">
      <div className="flex items-center justify-between gap-1">
        <div>
          <p className="text-[10px] font-bold text-white leading-tight">{title}</p>
          <p className="text-[9.5px] font-mono text-sky-400">{reagentFormula}</p>
        </div>
        <button
          onClick={onTest}
          className="px-2 py-1 rounded-lg text-[10px] font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1 transition cursor-pointer shrink-0 shadow-sm"
        >
          <Droplets className="w-3 h-3" />
          Titis
        </button>
      </div>

      {/* Mini Glass Test Tube Visual */}
      <div className="flex items-center gap-2 py-0.5">
        <svg viewBox="0 0 46 64" className="w-10 h-14 shrink-0">
          {/* Falling droplet when clicked */}
          {justDripped && (
            <circle cx="23" cy="10" r="2.6" fill="#facc15">
              <animate attributeName="cy" from="4" to="28" dur="0.45s" repeatCount="1" />
              <animate attributeName="opacity" from="1" to="0" dur="0.45s" repeatCount="1" />
            </circle>
          )}
          <defs>
            <clipPath id={`mini-tube-${id}`}>
              <path d="M 14 14 L 14 48 A 9 9 0 0 0 32 48 L 32 14 Z" />
            </clipPath>
          </defs>

          <g clipPath={`url(#mini-tube-${id})`}>
            {/* Solution fill */}
            <rect x="13" y="25" width="20" height="35" fill={liquidFill} />
            {/* Precipitate layer if applicable */}
            {precipitateFill && (
              <>
                <rect x="13" y="42" width="20" height="18" fill={precipitateFill} />
                <circle cx="19" cy="41" r="2" fill={precipitateFill} />
                <circle cx="26" cy="42" r="2.4" fill={precipitateFill} />
              </>
            )}
            {/* Meniscus */}
            <line x1="14" y1="25" x2="32" y2="25" stroke="rgba(255,255,255,0.45)" strokeWidth="1" />
          </g>

          {/* Glass wall & rim */}
          <path
            d="M 14 12 L 14 48 A 9 9 0 0 0 32 48 L 32 12"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.6"
          />
          <ellipse cx="23" cy="12" rx="10" ry="2" fill="none" stroke="#cbd5e1" strokeWidth="1.2" />
        </svg>

        <p className={`text-[10px] leading-snug ${resultBadgeColor}`}>
          {observationText}
        </p>
      </div>
    </div>
  );
};

export const IronIonConversionLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lab' | 'notes'>('lab');
  const [starterIon, setStarterIon] = useState<IonState>('Fe2+');
  const [currentIon, setCurrentIon] = useState<IonState>('Fe2+');
  const [activeReagent, setActiveReagent] = useState<RedoxReagent | null>(null);
  const [lastCompletedReagent, setLastCompletedReagent] = useState<RedoxReagent | null>(null);
  const [isReacting, setIsReacting] = useState(false);
  const [reactionProgress, setReactionProgress] = useState(1);
  const [cycleCount, setCycleCount] = useState(0);
  const [misconceptionMsg, setMisconceptionMsg] = useState<string | null>(null);
  const [isMagnifierExpanded, setIsMagnifierExpanded] = useState(false);

  // Confirmatory tube states (reset whenever main solution ion changes)
  const [testedTubes, setTestedTubes] = useState<Record<ConfirmatoryId, IonState | null>>({
    naoh: null,
    k4fe: null,
    kscn: null,
  });
  const [drippingTube, setDrippingTube] = useState<ConfirmatoryId | null>(null);

  const hasRecordedCompletionRef = useRef(false);

  // Smooth animation loop when reacting
  useEffect(() => {
    if (!isReacting || !activeReagent) return;
    let rafId = 0;
    const durationMs = 1500;
    const startMs = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - startMs) / durationMs);
      setReactionProgress(t);

      if (t < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        const nextIon: IonState = activeReagent.kind === 'oxidizing' ? 'Fe3+' : 'Fe2+';
        setCurrentIon(nextIon);
        setLastCompletedReagent(activeReagent);
        setIsReacting(false);
        setCycleCount((c) => c + 1);
        setTestedTubes({ naoh: null, k4fe: null, kscn: null });
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isReacting, activeReagent]);

  // Record analytics cleanly after at least 1 conversion AND at least 1 confirmatory test
  useEffect(() => {
    const anyTested = Object.values(testedTubes).some((v) => v !== null);
    if (cycleCount >= 1 && anyTested && !hasRecordedCompletionRef.current) {
      hasRecordedCompletionRef.current = true;
      analytics.recordSimulationCompleted('penukaran-ion-ferum');
    }
  }, [cycleCount, testedTubes]);

  const handleSelectStarter = (ion: IonState) => {
    setStarterIon(ion);
    setCurrentIon(ion);
    setActiveReagent(null);
    setLastCompletedReagent(null);
    setIsReacting(false);
    setReactionProgress(1);
    setMisconceptionMsg(null);
    setTestedTubes({ naoh: null, k4fe: null, kscn: null });
  };

  const handleReset = () => {
    handleSelectStarter(starterIon);
    setCycleCount(0);
  };

  const handleChooseReagent = (reagent: RedoxReagent) => {
    if (isReacting) return;

    // Pedagogical misconception detection
    if (currentIon === 'Fe2+' && reagent.kind === 'reducing') {
      setMisconceptionMsg(
        `Tiada pengoksidaan berlaku! ${reagent.shortName} ialah agen penurunan, bukan agen pengoksidaan. Sila pilih reagen dari rak Agen Pengoksidaan di sebelah kiri.`
      );
      return;
    }

    if (currentIon === 'Fe3+' && reagent.kind === 'oxidizing') {
      setMisconceptionMsg(
        `Tiada penurunan berlaku! ${reagent.shortName} ialah agen pengoksidaan, bukan agen penurunan. Sila pilih reagen dari rak Agen Penurunan di sebelah kanan.`
      );
      return;
    }

    // Valid reaction!
    setMisconceptionMsg(null);
    setActiveReagent(reagent);
    setReactionProgress(0);
    setIsReacting(true);
  };

  const handleTestTube = (id: ConfirmatoryId) => {
    if (isReacting) return;
    setDrippingTube(id);
    setTestedTubes((prev) => ({ ...prev, [id]: currentIon }));
    window.setTimeout(() => {
      setDrippingTube((curr) => (curr === id ? null : curr));
    }, 500);
  };

  const handleTestAllTubes = () => {
    if (isReacting) return;
    setTestedTubes({
      naoh: currentIon,
      k4fe: currentIon,
      kscn: currentIon,
    });
  };

  return (
    <div className="bg-[#0b0f19] text-white rounded-2xl p-3.5 sm:p-4 border border-slate-800 shadow-2xl space-y-3">
      {/* Top Studio Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-yellow-300">
            <ArrowLeftRight className="w-3.5 h-3.5 text-yellow-400" />
            <span>Simulasi Redoks: Kitaran Penukaran Ion Fe²⁺ ↔ Fe³⁺</span>
          </div>

          {/* Tabs */}
          <div className="inline-flex bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('lab')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'lab'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              Makmal Kitaran
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'notes'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Nota KSSM & Jadual Ujian
            </button>
          </div>
        </div>

        {/* Status Pill & Reset */}
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border flex items-center gap-1.5 ${
              currentIon === 'Fe2+'
                ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
                : 'bg-amber-950/70 text-amber-300 border-amber-500/40'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                currentIon === 'Fe2+' ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
            {currentIon === 'Fe2+' ? 'Ion Semasa: Fe²⁺ (Hijau Muda)' : 'Ion Semasa: Fe³⁺ (Perang)'}
          </span>

          <span className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-300">
            Kitaran: <span className="text-yellow-300">{cycleCount}</span>
          </span>

          <button
            onClick={handleReset}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Set Semula
          </button>
        </div>
      </div>

      {activeTab === 'lab' ? (
        <>
          {/* BAHAGIAN ATAS: 3 LAJUR + KANTA PEMBESAR SUBMIKROSKOPIK */}
          <div className="grid grid-cols-1 lg:grid-cols-[210px_1fr_210px_250px] gap-2.5 items-stretch">
            {/* LAJUR KIRI: RAK AGEN PENGOKSIDAAN */}
            <div className="bg-[#111827] border border-blue-500/30 rounded-xl p-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wide text-blue-300">
                    Rak Agen Pengoksidaan
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-950 text-blue-200 border border-blue-500/30">
                    Fe²⁺ → Fe³⁺
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mb-2 leading-tight">
                  Mengoksidakan ion Fe²⁺ dengan menerima elektron.
                </p>

                <div className="space-y-1.5">
                  {OXIDIZING_AGENTS.map((ag) => {
                    const isActive = isReacting && activeReagent?.id === ag.id;
                    return (
                      <button
                        key={ag.id}
                        onClick={() => handleChooseReagent(ag)}
                        disabled={isReacting}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg border transition flex items-center gap-2 cursor-pointer ${
                          isActive
                            ? 'bg-blue-600/30 border-yellow-400 ring-1 ring-yellow-400/60'
                            : 'bg-[#090d16] hover:bg-slate-900 border-slate-800 hover:border-blue-400/60'
                        } disabled:opacity-60`}
                      >
                        <span
                          className="w-3.5 h-6 rounded-sm border border-white/25 shrink-0"
                          style={{ backgroundColor: ag.dropletHex }}
                        />
                        <div className="min-w-0">
                          <div className="text-[10.5px] font-bold text-white leading-tight">
                            {ag.name}
                          </div>
                          <div className="text-[9.5px] font-mono text-blue-300 leading-tight mt-0.5">
                            {ag.formula}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* LAJUR TENGAH: TABUNG UJI UTAMA & KAWALAN PERMULAAN */}
            <div className="bg-[#111827] border border-slate-800 rounded-xl p-2.5 flex flex-col justify-between">
              {/* Starter toggle buttons */}
              <div className="grid grid-cols-2 gap-1.5 mb-1.5">
                <button
                  onClick={() => handleSelectStarter('Fe2+')}
                  disabled={isReacting}
                  className={`px-2 py-1.5 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${
                    starterIon === 'Fe2+' && !lastCompletedReagent
                      ? 'bg-emerald-600/25 border-emerald-400 text-emerald-200'
                      : 'bg-[#090d16] border-slate-800 text-slate-300 hover:border-emerald-500/50'
                  }`}
                >
                  Mula: Larutan FeSO₄ (Fe²⁺)
                </button>
                <button
                  onClick={() => handleSelectStarter('Fe3+')}
                  disabled={isReacting}
                  className={`px-2 py-1.5 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${
                    starterIon === 'Fe3+' && !lastCompletedReagent
                      ? 'bg-amber-600/25 border-amber-400 text-amber-200'
                      : 'bg-[#090d16] border-slate-800 text-slate-300 hover:border-amber-500/50'
                  }`}
                >
                  Mula: Larutan FeCl₃ (Fe³⁺)
                </button>
              </div>

              {/* Animated HTML5 Canvas Main Test Tube */}
              <MainTestTubeCanvas
                currentIon={currentIon}
                activeReagent={activeReagent}
                reactionProgress={reactionProgress}
                isReacting={isReacting}
                starterLabel={starterIon === 'Fe2+' ? 'FeSO₄(ak)' : 'FeCl₃(ak)'}
              />

              {/* Misconception Alert OR Reaction Status Bar */}
              <div className="mt-1.5 min-h-[40px] flex items-center">
                {misconceptionMsg ? (
                  <div
                    role="alert"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-red-950/90 border border-red-500 text-red-100 text-[10.5px] leading-snug flex items-start gap-2"
                  >
                    <AlertTriangle className="w-4 h-4 text-yellow-300 shrink-0 mt-0.5" />
                    <span>{misconceptionMsg}</span>
                  </div>
                ) : isReacting && activeReagent ? (
                  <div className="w-full px-2.5 py-1.5 rounded-lg bg-blue-950/80 border border-blue-500/50 text-blue-100 text-[10.5px] flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300 shrink-0 animate-pulse" />
                    <span>
                      Tindak balas sedang berlaku dengan <strong>{activeReagent.shortName}</strong>...
                    </span>
                  </div>
                ) : lastCompletedReagent ? (
                  <div className="w-full px-2.5 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-100 text-[10.5px] leading-snug flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{lastCompletedReagent.observation}</span>
                  </div>
                ) : (
                  <div className="w-full px-2.5 py-1.5 rounded-lg bg-[#090d16] border border-slate-800 text-slate-300 text-[10.5px]">
                    {currentIon === 'Fe2+'
                      ? 'Pilih reagen dari Rak Agen Pengoksidaan (kiri) untuk menukar Fe²⁺ kepada Fe³⁺.'
                      : 'Pilih reagen dari Rak Agen Penurunan (kanan) untuk menukar Fe³⁺ kepada Fe²⁺.'}
                  </div>
                )}
              </div>
            </div>

            {/* LAJUR KANAN: RAK AGEN PENURUNAN */}
            <div className="bg-[#111827] border border-red-500/30 rounded-xl p-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wide text-red-300">
                    Rak Agen Penurunan
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-950 text-red-200 border border-red-500/30">
                    Fe³⁺ → Fe²⁺
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mb-2 leading-tight">
                  Menurunkan ion Fe³⁺ dengan menderma elektron.
                </p>

                <div className="space-y-1.5">
                  {REDUCING_AGENTS.map((ag) => {
                    const isActive = isReacting && activeReagent?.id === ag.id;
                    return (
                      <button
                        key={ag.id}
                        onClick={() => handleChooseReagent(ag)}
                        disabled={isReacting}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg border transition flex items-center gap-2 cursor-pointer ${
                          isActive
                            ? 'bg-red-600/30 border-yellow-400 ring-1 ring-yellow-400/60'
                            : 'bg-[#090d16] hover:bg-slate-900 border-slate-800 hover:border-red-400/60'
                        } disabled:opacity-60`}
                      >
                        <span
                          className="w-3.5 h-6 rounded-sm border border-white/25 shrink-0"
                          style={{ backgroundColor: ag.dropletHex }}
                        />
                        <div className="min-w-0">
                          <div className="text-[10.5px] font-bold text-white leading-tight">
                            {ag.name}
                          </div>
                          <div className="text-[9.5px] font-mono text-red-300 leading-tight mt-0.5">
                            {ag.formula}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SUDUT ATAS KANAN: KANTA PEMBESAR SUBMIKROSKOPIK */}
            <div className="bg-[#111827] border border-yellow-500/35 rounded-xl p-2.5 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-1 mb-1">
                <div>
                  <h4 className="text-[11px] font-extrabold uppercase tracking-wide text-yellow-300">
                    Kanta Submikroskopik
                  </h4>
                  <p className="text-[9.5px] text-slate-400 leading-tight">
                    Pemindahan elektron (e⁻)
                  </p>
                </div>
                <button
                  onClick={() => setIsMagnifierExpanded(true)}
                  title="Perbesar Kanta Pembesar"
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-yellow-300 transition cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <SubmicroMagnifierCanvas
                currentIon={currentIon}
                activeReagent={activeReagent}
                reactionProgress={reactionProgress}
                isReacting={isReacting}
                size={206}
              />

              <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 pt-1 text-[9.5px] text-slate-300 border-t border-slate-800/80">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                  Fe²⁺ (besar)
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-yellow-300 inline-block" />
                  e⁻
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                  Fe³⁺ (kecil)
                </span>
              </div>
            </div>
          </div>

          {/* BAHAGIAN BAWAH: STESEN UJIAN PENGESAHAN & PAPAN ANALISIS REDOKS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5">
            {/* BAWAH KIRI: STESEN UJIAN PENGESAHAN ION */}
            <div className="lg:col-span-6 bg-[#111827] border border-slate-800 rounded-xl p-2.5 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h4 className="text-xs font-extrabold text-white">
                    Stesen Ujian Pengesahan Ion (Sampel Hasil)
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Ambil sampel larutan semasa (<span className="text-yellow-300 font-bold">{currentIon === 'Fe2+' ? 'Fe²⁺' : 'Fe³⁺'}</span>) dan titiskan reagen pengesahan.
                  </p>
                </div>
                <button
                  onClick={handleTestAllTubes}
                  disabled={isReacting}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-[10.5px] font-bold text-yellow-300 transition cursor-pointer shrink-0 disabled:opacity-50"
                >
                  Uji Semua (3 Tabung)
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <ConfirmatoryTubeCard
                  id="naoh"
                  title="Tabung Uji 1"
                  reagentFormula="+ NaOH(ak)"
                  testedIon={testedTubes.naoh}
                  justDripped={drippingTube === 'naoh'}
                  onTest={() => handleTestTube('naoh')}
                />
                <ConfirmatoryTubeCard
                  id="k4fe"
                  title="Tabung Uji 2"
                  reagentFormula="+ K₄[Fe(CN)₆]"
                  testedIon={testedTubes.k4fe}
                  justDripped={drippingTube === 'k4fe'}
                  onTest={() => handleTestTube('k4fe')}
                />
                <ConfirmatoryTubeCard
                  id="kscn"
                  title="Tabung Uji 3"
                  reagentFormula="+ KSCN(ak)"
                  testedIon={testedTubes.kscn}
                  justDripped={drippingTube === 'kscn'}
                  onTest={() => handleTestTube('kscn')}
                />
              </div>
            </div>

            {/* BAWAH KANAN: PAPAN PERSAMAAN & ANALISIS REDOKS AUTOMATIK */}
            <div className="lg:col-span-6 bg-[#111827] border border-slate-800 rounded-xl p-2.5 flex flex-col justify-between space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-xs font-extrabold text-white">
                  Papan Persamaan & Analisis Redoks Automatik
                </h4>
                {lastCompletedReagent ? (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      lastCompletedReagent.kind === 'oxidizing'
                        ? 'bg-blue-950 text-blue-200 border-blue-500/40'
                        : 'bg-red-950 text-red-200 border-red-500/40'
                    }`}
                  >
                    No. Pengoksidaan Ferum:{' '}
                    {lastCompletedReagent.kind === 'oxidizing' ? '+2 → +3' : '+3 → +2'}
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-slate-300 border border-slate-700">
                    No. Pengoksidaan Ferum: {currentIon === 'Fe2+' ? '+2 (Sedia)' : '+3 (Sedia)'}
                  </span>
                )}
              </div>

              {lastCompletedReagent ? (
                <div className="space-y-1.5 text-[11px]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    <div className="bg-[#090d16] border border-blue-500/30 rounded-lg px-2.5 py-1.5">
                      <div className="text-[9.5px] font-bold uppercase text-blue-300">
                        Setengah Pengoksidaan
                      </div>
                      <div className="font-mono text-white font-semibold mt-0.5">
                        {lastCompletedReagent.halfEqOxidation}
                      </div>
                    </div>
                    <div className="bg-[#090d16] border border-red-500/30 rounded-lg px-2.5 py-1.5">
                      <div className="text-[9.5px] font-bold uppercase text-red-300">
                        Setengah Penurunan
                      </div>
                      <div className="font-mono text-white font-semibold mt-0.5">
                        {lastCompletedReagent.halfEqReduction}
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#090d16] border border-yellow-400/40 rounded-lg px-2.5 py-1.5">
                    <div className="text-[9.5px] font-bold uppercase text-yellow-300">
                      Persamaan Ionik Keseluruhan ({lastCompletedReagent.shortName})
                    </div>
                    <div className="font-mono text-yellow-100 font-bold text-xs mt-0.5">
                      {lastCompletedReagent.overallIonicEq}
                    </div>
                  </div>

                  <p className="text-[10.5px] text-slate-300 leading-snug bg-slate-900/80 border border-slate-800 rounded-lg px-2.5 py-1.5">
                    <strong className="text-white">Pemindahan Elektron: </strong>
                    {lastCompletedReagent.electronExplanation}
                  </p>
                </div>
              ) : (
                <div className="bg-[#090d16] border border-slate-800 rounded-xl p-3 text-xs text-slate-300 space-y-1.5 flex-1 flex flex-col justify-center">
                  <p className="font-semibold text-white">
                    Belum ada tindak balas dijalankan dalam kitaran ini.
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Klik mana-mana reagen yang sesuai untuk melihat persamaan setengah pengoksidaan, setengah penurunan, persamaan ionik seimbang, dan perubahan nombor pengoksidaan ferum secara automatik.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        /* TAB 2: NOTA KSSM & JADUAL UJIAN PENGESAHAN */
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-[#111827] border border-blue-500/30 rounded-xl p-3.5 space-y-2">
              <h4 className="text-sm font-extrabold text-blue-300">
                1. Pengoksidaan Ion Fe²⁺ → Ion Fe³⁺
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ion ferum(II), <span className="font-mono text-emerald-300">Fe²⁺</span> (hijau muda) membebaskan 1 elektron untuk membentuk ion ferum(III), <span className="font-mono text-amber-300">Fe³⁺</span> (perang). Nombor pengoksidaan ferum meningkat daripada <strong>+2 kepada +3</strong>.
              </p>
              <div className="bg-[#090d16] p-2 rounded-lg border border-slate-800 font-mono text-xs text-blue-200">
                Fe²⁺(ak) → Fe³⁺(ak) + e⁻
              </div>
              <p className="text-[11px] text-slate-400">
                <strong>Agen pengoksidaan:</strong> Air bromin (Br₂), Air klorin (Cl₂), Larutan KMnO₄ berasid, Larutan K₂Cr₂O₇ berasid.
              </p>
            </div>

            <div className="bg-[#111827] border border-red-500/30 rounded-xl p-3.5 space-y-2">
              <h4 className="text-sm font-extrabold text-red-300">
                2. Penurunan Ion Fe³⁺ → Ion Fe²⁺
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ion ferum(III), <span className="font-mono text-amber-300">Fe³⁺</span> (perang) menerima 1 elektron untuk membentuk ion ferum(II), <span className="font-mono text-emerald-300">Fe²⁺</span> (hijau muda). Nombor pengoksidaan ferum menurun daripada <strong>+3 kepada +2</strong>.
              </p>
              <div className="bg-[#090d16] p-2 rounded-lg border border-slate-800 font-mono text-xs text-red-200">
                Fe³⁺(ak) + e⁻ → Fe²⁺(ak)
              </div>
              <p className="text-[11px] text-slate-400">
                <strong>Agen penurunan:</strong> Serbuk zink (Zn), Serbuk magnesium (Mg), Gas sulfur dioksida (SO₂), Larutan kalium iodida (KI).
              </p>
            </div>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-3.5 py-2 bg-slate-900 border-b border-slate-800 text-xs font-extrabold text-yellow-300">
              Jadual Ujian Pengesahan Ion Fe²⁺ dan Ion Fe³⁺ (Silibus KSSM)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#090d16] text-slate-400">
                  <tr>
                    <th className="px-3.5 py-2 font-bold">Reagen Penguji</th>
                    <th className="px-3.5 py-2 font-bold text-emerald-300">Kehadiran Ion Fe²⁺</th>
                    <th className="px-3.5 py-2 font-bold text-amber-300">Kehadiran Ion Fe³⁺</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  <tr>
                    <td className="px-3.5 py-2 font-semibold">Larutan natrium hidroksida, NaOH(ak)</td>
                    <td className="px-3.5 py-2">Mendakan hijau kotor (tidak larut dalam berlebihan)</td>
                    <td className="px-3.5 py-2">Mendakan perang (tidak larut dalam berlebihan)</td>
                  </tr>
                  <tr>
                    <td className="px-3.5 py-2 font-semibold">Larutan kalium heksasianoferat(II), K₄[Fe(CN)₆]</td>
                    <td className="px-3.5 py-2">Mendakan biru muda</td>
                    <td className="px-3.5 py-2 text-blue-300 font-semibold">Mendakan biru tua</td>
                  </tr>
                  <tr>
                    <td className="px-3.5 py-2 font-semibold">Larutan kalium tiosianat, KSCN(ak)</td>
                    <td className="px-3.5 py-2 text-slate-400">Tiada perubahan</td>
                    <td className="px-3.5 py-2 text-red-400 font-semibold">Larutan merah darah</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL INTERAKTIF KANTA PEMBESAR (Apabila butang Perbesar ditekan) */}
      {isMagnifierExpanded && (
        <div className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b0f19] border border-yellow-400/50 rounded-2xl p-5 max-w-md w-full space-y-3 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-yellow-300">
                  Kanta Pembesar Pemindahan Elektron (Aras Submikroskopik)
                </h4>
                <p className="text-xs text-slate-400">
                  Perhatikan perubahan jejari ion & pemindahan elektron cahaya kuning (e⁻)
                </p>
              </div>
              <button
                onClick={() => setIsMagnifierExpanded(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <SubmicroMagnifierCanvas
              currentIon={currentIon}
              activeReagent={activeReagent}
              reactionProgress={reactionProgress}
              isReacting={isReacting}
              size={310}
            />

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 space-y-1">
              <div>
                <strong className="text-emerald-300">Pengoksidaan (Fe²⁺ → Fe³⁺):</strong>{' '}
                Sfera hijau (Fe²⁺) membebaskan 1 elektron kuning (e⁻), mengecil sedikit saiz jejarinya dan bertukar menjadi sfera perang (Fe³⁺).
              </div>
              <div>
                <strong className="text-amber-300">Penurunan (Fe³⁺ → Fe²⁺):</strong>{' '}
                Sfera perang (Fe³⁺) menerima 1 elektron kuning (e⁻) daripada agen penurunan lalu membesar sedikit kembali kepada sfera hijau (Fe²⁺).
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IronIonConversionLab;
