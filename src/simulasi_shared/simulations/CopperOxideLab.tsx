import React, { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Eye,
  Flame,
  RefreshCw,
  RotateCcw,
  Scale,
  Sparkles,
  Wind,
} from 'lucide-react';
import { analytics } from '../services/analytics';
import { CopperOxideTubeSVG } from '../components/CopperOxideTubeSVG';

const MASS_TUBE = 22.5;
const MASS_WITH_CUO = 26.5; // +4.00 g CuO
const MASS_REPEAT_1 = 25.86; // partial reduction
const MASS_REPEAT_2 = 25.7; // 3.20 g Cu + 0.80 g O removed
const MASS_REPEAT_3 = 25.7; // constant mass confirmed!

export const CopperOxideLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lab' | 'discussion'>('lab');

  // Procedural state machine (Aktiviti 3.13, m.s. 63-64):
  // 0: initial empty bench
  // 1: weighed empty 12 cm glass tube (22.50 g)
  // 2: added CuO powder using wooden splint & weighed (26.50 g)
  // 3: assembled Rajah 3.13 & purged air with H2 flow for 10s
  // 4: heated CuO with spirit lamp in continuous H2 stream -> brown Cu + water droplets
  // 5: cooled in H2 stream to room temp, wiped water with cotton bud & weighed #1 (25.86 g)
  // 6: repeat #2 weighed (25.70 g) -> not yet verified constant!
  // 7: repeat #3 weighed (25.70 g - Jisim Tetap!) -> scaffolded calculation unlocked!
  const [step, setStep] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const [calcReveal, setCalcReveal] = useState<number>(1);
  const [openAnswers, setOpenAnswers] = useState<Record<number, boolean>>({ 0: true });

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    analytics.recordSimulationView('formula-empirik-cuo');
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleReset = () => {
    clearTimer();
    setIsAnimating(false);
    setStep(0);
    setWarningMsg(null);
    setCalcReveal(1);
  };

  const runTimedStep = (nextStep: number, durationMs = 1050, onDone?: () => void) => {
    setIsAnimating(true);
    clearTimer();
    timerRef.current = window.setTimeout(() => {
      setStep(nextStep);
      setIsAnimating(false);
      onDone?.();
    }, durationMs);
  };

  const handleActionStep = (targetCard: number) => {
    if (isAnimating) return;

    const expectedCard = step <= 5 ? step + 1 : step === 6 ? 6 : 99;
    if (targetCard < expectedCard) return;

    if (targetCard !== expectedCard) {
      const messages: Record<number, string> = {
        0: 'Timbang salur kaca (12 cm) kosong terlebih dahulu (Langkah 1).',
        1: 'Isikan serbuk kuprum(II) oksida ke tengah salur kaca dan timbang semula (Langkah 2).',
        2: 'Pasangkan radas Rajah 3.13 dan alirkan gas hidrogen selama 10 saat untuk menyingkirkan udara (Langkah 3).',
        3: 'Nyalakan lampu spirit untuk memanaskan CuO dalam aliran gas hidrogen berterusan (Langkah 4).',
        4: 'Sejukkan dalam aliran H₂ ke suhu bilik, lap titisan air dengan putik kapas dan rekod Timbangan #1 (Langkah 5).',
        5: 'Jisim belum tetap! Ulang pemanasan, penyejukan & penimbangan hingga jisim tetap (Langkah 6).',
      };
      setWarningMsg(messages[step] || 'Ikut urutan langkah prosedur Aktiviti 3.13.');
      return;
    }

    setWarningMsg(null);

    if (targetCard === 1 || targetCard === 2) {
      setStep(targetCard);
      return;
    }

    if (targetCard === 3) {
      setStep(3);
      runTimedStep(3, 950);
      return;
    }

    if (targetCard === 4) {
      setStep(4);
      runTimedStep(4, 1150);
      return;
    }

    if (targetCard === 5) {
      runTimedStep(5, 950);
      return;
    }

    if (targetCard === 6) {
      if (step === 5) {
        runTimedStep(6, 950);
      } else if (step === 6) {
        runTimedStep(7, 950, () => {
          setCalcReveal(1);
          analytics.recordSimulationCompleted('formula-empirik-cuo');
        });
      }
    }
  };

  const handleDropOnBench = (e: React.DragEvent) => {
    e.preventDefault();
    const num = Number(e.dataTransfer.getData('text/plain'));
    if (!Number.isNaN(num) && num >= 1 && num <= 6) {
      handleActionStep(num);
    }
  };

  const isCompleted = step === 7;

  // Derived SVG visual props
  const hasSetup = step >= 3;
  const hasPowder = step >= 2;
  const powderStage: 'cuo' | 'mixed' | 'cu' =
    step <= 3 ? 'cuo' : step === 4 ? (isAnimating ? 'cuo' : 'mixed') : step === 5 ? 'mixed' : 'cu';
  const hasGasFlow = step === 3 || step === 4 || isAnimating;
  const isHeating = isAnimating && (step === 4 || step === 5 || step === 6);
  const hasCondensation = step === 4 && !isAnimating;

  const balanceMode: 'idle' | 'empty' | 'withCuO' | 'repeat1' | 'repeat2' | 'repeat3' =
    step === 0
      ? 'idle'
      : step === 1
      ? 'empty'
      : step <= 4
      ? 'withCuO'
      : step === 5
      ? 'repeat1'
      : step === 6
      ? 'repeat2'
      : 'repeat3';

  const currentMass =
    balanceMode === 'empty'
      ? MASS_TUBE
      : balanceMode === 'withCuO'
      ? MASS_WITH_CUO
      : balanceMode === 'repeat1'
      ? MASS_REPEAT_1
      : balanceMode === 'repeat2'
      ? MASS_REPEAT_2
      : balanceMode === 'repeat3'
      ? MASS_REPEAT_3
      : 0;

  const proceduralCards = [
    {
      card: 1,
      title: '1. Timbang Salur Kaca (12 cm)',
      subtitle: `Jisim kosong = ${MASS_TUBE.toFixed(2)} g`,
      icon: Scale,
      done: step >= 1,
      active: step === 0,
      cta: 'Klik',
    },
    {
      card: 2,
      title: '2. Isi Serbuk CuO & Timbang',
      subtitle: `Serbuk hitam di tengah • ${MASS_WITH_CUO.toFixed(2)} g`,
      icon: Sparkles,
      done: step >= 2,
      active: step === 1,
      cta: 'Klik',
    },
    {
      card: 3,
      title: '3. Pasang & Alirkan Gas H₂ (10s)',
      subtitle: 'Singkir udara dalam salur sebelum panaskan',
      icon: Wind,
      done: step >= 3 && !isAnimating,
      active: step === 2,
      cta: 'Alir H₂',
    },
    {
      card: 4,
      title: '4. Panaskan CuO (Lampu Spirit)',
      subtitle: 'Panaskan dalam aliran H₂ hingga perang',
      icon: Flame,
      done: step >= 4 && !isAnimating,
      active: step === 3,
      cta: 'Panaskan',
    },
    {
      card: 5,
      title: '5. Sejuk (H₂), Lap & Timbang #1',
      subtitle:
        step >= 5
          ? `Timbangan #1 = ${MASS_REPEAT_1.toFixed(2)} g`
          : 'Sejuk ke suhu bilik, lap air & timbang',
      icon: Scale,
      done: step >= 5,
      active: step === 4,
      cta: 'Timbang',
    },
    {
      card: 6,
      title: step === 6 ? '6. Ulang Pemanasan (Kali Ke-3)' : '6. Ulang Hingga Jisim Tetap',
      subtitle:
        step < 6
          ? 'Ulang panas, sejuk (H₂) & timbang'
          : step === 6
          ? `Ke-2: ${MASS_REPEAT_2.toFixed(2)} g • Ulang lagi untuk sahkan!`
          : `Ke-3: ${MASS_REPEAT_3.toFixed(2)} g (Jisim Tetap!)`,
      icon: RefreshCw,
      done: step === 7,
      active: step === 5 || step === 6,
      cta: step === 6 ? 'Ulang #3' : 'Ulang #2',
    },
  ];

  const guidance = (() => {
    if (warningMsg) return { type: 'warn' as const, text: warningMsg };
    if (isAnimating) {
      return {
        type: 'info' as const,
        text:
          step === 3
            ? 'Mengalirkan gas hidrogen kering selama 10 saat bagi menyingkirkan udara di dalam salur kaca...'
            : 'Memanaskan kuprum(II) oksida dalam aliran gas H₂, menyejukkan ke suhu bilik & menimbang...',
      };
    }
    switch (step) {
      case 0:
        return {
          type: 'info' as const,
          text: 'Klik Langkah 1 untuk menimbang salur kaca berukuran 12 cm yang kosong dan kering.',
        };
      case 1:
        return {
          type: 'info' as const,
          text: 'Isikan serbuk kuprum(II) oksida hitam ke bahagian tengah salur kaca guna kayu uji dan timbang (Langkah 2).',
        };
      case 2:
        return {
          type: 'info' as const,
          text: 'Pasangkan radas Rajah 3.13 & alirkan gas hidrogen selama 10 saat dengan gelembung terbebas dalam air (Langkah 3).',
        };
      case 3:
        return {
          type: 'info' as const,
          text: 'Udara telah disingkirkan dengan selamat! Klik Langkah 4 untuk memanaskan serbuk CuO dengan lampu spirit.',
        };
      case 4:
        return {
          type: 'info' as const,
          text: 'Serbuk hitam bertukar kepada kuprum perang & titisan air terbentuk! Klik Langkah 5 untuk sejukkan (dalam H₂), lap air & timbang #1.',
        };
      case 5:
        return {
          type: 'warn' as const,
          text: 'Timbangan #1 (25.86 g): penurunan jisim masih belum lengkap! Klik Langkah 6 untuk ulang pemanasan ke-2.',
        };
      case 6:
        return {
          type: 'warn' as const,
          text: 'Timbangan #2 (25.70 g) berbeza daripada #1 (25.86 g). Klik Langkah 6 sekali lagi untuk memastikan jisim tetap!',
        };
      default:
        return {
          type: 'done' as const,
          text: 'Jisim tetap (25.70 g) telah dicapai! Teruskan jadual pengiraan nisbah mol teringkas di sebelah kanan.',
        };
    }
  })();

  const statusPillText =
    step === 0
      ? 'Sedia'
      : step <= 2
      ? 'Penimbangan Awal'
      : step === 3
      ? 'Aliran Gas H₂'
      : step === 4
      ? 'Penurunan CuO'
      : step === 5
      ? 'Timbangan #1'
      : step === 6
      ? 'Timbangan #2'
      : 'Jisim Tetap ✓';

  const discussionQuestions = [
    {
      q: '1. Apakah peranan ketulan zink dan asid hidroklorik dalam aktiviti ini?',
      a: 'Bertindak balas untuk menghasilkan gas hidrogen (Zn(p) + 2HCl(ak) → ZnCl₂(ak) + H₂(g)) yang berfungsi menurunkan kuprum(II) oksida kepada logam kuprum.',
    },
    {
      q: '2. Mengapakah gas hidrogen perlu dibiarkan mengalir seketika sebelum memulakan pemanasan?',
      a: 'Untuk menyingkirkan semua udara di dalam salur kaca. Campuran gas hidrogen dan udara akan meletup apabila dipanaskan.',
    },
    {
      q: '3. Gas hidrogen dibiarkan mengalir sehingga hasil pemanasan berada pada suhu bilik dalam langkah 11. Mengapa?',
      a: 'Untuk mengelakkan logam kuprum yang masih panas daripada bertindak balas semula dengan oksigen di udara dan teroksida kembali menjadi kuprum(II) oksida hitam.',
    },
    {
      q: '4. Mengapakah proses pemanasan, penyejukan dan penimbangan perlu diulang sehingga jisim tetap diperoleh?',
      a: 'Untuk memastikan semua serbuk kuprum(II) oksida telah bertindak balas lengkap dan diturunkan sepenuhnya kepada logam kuprum.',
    },
  ];

  return (
    <div className="space-y-3 text-slate-800">
      {/* TOP BAR */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white border border-slate-200 rounded-xl p-2 shadow-xs">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('lab')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'lab'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            1. Makmal Maya &amp; Jadual Pengiraan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('discussion')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'discussion'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            2. Pemanasan Berulang &amp; Perbincangan KSSM
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-bold font-mono whitespace-nowrap shrink-0">
            JAR: Cu = 64, O = 16
          </span>
          <span
            className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold whitespace-nowrap shrink-0 ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-orange-100 text-orange-800 border border-orange-200'
            }`}
          >
            {statusPillText}
          </span>
        </div>
      </div>

      {/* TAB 1: PROCEDURAL LAB & CALCULATION TABLE */}
      {activeTab === 'lab' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
          {/* LEFT PANEL: Guided Procedure Steps */}
          <div className="md:col-span-4 bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-extrabold text-slate-800">
                Radas &amp; Prosedur (Aktiviti 3.13)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 whitespace-nowrap shrink-0">
                {Math.min(step, 6)}/6 · Ulang {Math.max(0, step - 4)}/3
              </span>
            </div>

            <div className="space-y-1.5">
              {proceduralCards.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.card}
                    type="button"
                    draggable={item.active}
                    onDragStart={(e) => e.dataTransfer.setData('text/plain', String(item.card))}
                    onClick={() => handleActionStep(item.card)}
                    disabled={isAnimating || item.done}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg border transition flex items-center justify-between gap-2 ${
                      item.done
                        ? 'bg-emerald-50/75 border-emerald-200 text-emerald-900 cursor-default'
                        : item.active
                        ? 'bg-orange-50 border-orange-400 text-slate-900 shadow-xs hover:bg-orange-100/70 cursor-pointer'
                        : 'bg-slate-50/70 border-slate-200 text-slate-500 hover:border-slate-300 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className={`p-1.5 rounded-md shrink-0 ${
                          item.done
                            ? 'bg-emerald-100 text-emerald-700'
                            : item.active
                            ? 'bg-orange-600 text-white'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold truncate">{item.title}</div>
                        <div className="text-[9.5px] text-slate-500 truncate">{item.subtitle}</div>
                      </div>
                    </div>
                    {item.done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : item.active ? (
                      <span className="text-[10px] font-extrabold text-orange-700 bg-white px-1.5 py-0.5 rounded border border-orange-300 whitespace-nowrap shrink-0">
                        {item.cta}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            {/* Guidance Banner */}
            <div
              className={`rounded-lg border p-2 text-[10.5px] leading-snug ${
                guidance.type === 'warn'
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : guidance.type === 'done'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-sky-50 border-sky-200 text-sky-900'
              }`}
            >
              <div className="font-extrabold flex items-center gap-1 mb-0.5">
                {guidance.type === 'warn' ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                ) : (
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                )}
                <span>Arahan Semasa:</span>
              </div>
              <p>{guidance.text}</p>
            </div>
          </div>

          {/* RIGHT PANEL: Workbench SVG + Jadual 3.5 & Scaffolded Calculation */}
          <div className="md:col-span-8 space-y-3">
            {/* Workbench */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDropOnBench}
              className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-xs"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-extrabold text-slate-800 truncate">
                  Meja Kerja: Susunan Radas Rajah 3.13 (Penurunan Kuprum(II) Oksida dengan Gas H₂)
                </span>
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isAnimating}
                  className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>

              <div className="bg-slate-50/80 border border-dashed border-slate-300 rounded-lg p-1">
                <CopperOxideTubeSVG
                  hasSetup={hasSetup}
                  hasPowder={hasPowder}
                  powderStage={powderStage}
                  hasGasFlow={hasGasFlow}
                  isHeating={isHeating}
                  hasCondensation={hasCondensation}
                  balanceMode={balanceMode}
                  currentMass={currentMass}
                />
              </div>
            </div>

            {/* Jadual 3.5 & Perancang Pengiraan */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <div className="bg-orange-600 text-white px-3 py-1.5 flex items-center justify-between gap-2">
                <span className="text-xs font-extrabold">
                  Keputusan (Jadual 3.5) &amp; Pengiraan Nisbah Mol Teringkas
                </span>
                {isCompleted && (
                  <button
                    type="button"
                    onClick={() => setCalcReveal((prev) => (prev >= 3 ? 1 : 3))}
                    className="px-2.5 py-0.5 rounded bg-white/20 hover:bg-white/30 text-[11px] font-bold flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    {calcReveal >= 3 ? 'Ringkaskan' : 'Papar Semua Jalan Kira'}
                  </button>
                )}
              </div>

              <div className="p-3 grid grid-cols-1 md:grid-cols-12 gap-3">
                {/* Left: Jadual 3.5 */}
                <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-lg p-2.5 space-y-1.5">
                  <div className="text-[11px] font-extrabold text-slate-700 border-b border-slate-200 pb-1">
                    Jadual 3.5: Rekod Penimbangan
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between gap-2">
                      <span className="text-slate-600">Salur kaca (12 cm)</span>
                      <span className="font-mono font-bold text-slate-900 whitespace-nowrap">
                        {step >= 1 ? `${MASS_TUBE.toFixed(2)} g` : '—'}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-slate-600">Salur kaca + kuprum(II) oksida</span>
                      <span className="font-mono font-bold text-slate-900 whitespace-nowrap">
                        {step >= 2 ? `${MASS_WITH_CUO.toFixed(2)} g` : '—'}
                      </span>
                    </div>
                    <div className="pt-1 border-t border-slate-200 space-y-1">
                      <div className="flex justify-between gap-2">
                        <span className="text-slate-600">Timbangan #1 (+ Cu)</span>
                        <span className="font-mono font-bold text-amber-700 whitespace-nowrap">
                          {step >= 5 ? `${MASS_REPEAT_1.toFixed(2)} g` : '—'}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-slate-600">Timbangan #2 (Ulang)</span>
                        <span className="font-mono font-bold text-amber-700 whitespace-nowrap">
                          {step >= 6 ? `${MASS_REPEAT_2.toFixed(2)} g` : '—'}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-slate-800 font-bold">Timbangan #3 (Tetap)</span>
                        <span className="font-mono font-extrabold text-emerald-700 whitespace-nowrap">
                          {isCompleted ? `${MASS_REPEAT_3.toFixed(2)} g ✓` : '—'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Scaffolded Mole Ratio Table */}
                <div className="md:col-span-7">
                  {!isCompleted ? (
                    <div className="h-full min-h-[145px] bg-slate-50 border border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center p-3 text-center">
                      <Scale className="w-6 h-6 text-slate-300 mb-1.5" />
                      <div className="text-xs font-bold text-slate-600">
                        Lengkapkan penimbangan berulang hingga jisim tetap untuk membuka pengiraan
                      </div>
                      <div className="text-[10.5px] text-slate-400 mt-0.5">
                        Ulang pemanasan memastikan semua CuO telah diturunkan lengkap kepada Cu
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {/* Step 1: Mass of Cu and O */}
                      <div className="bg-orange-50/75 border border-orange-200 rounded-lg px-2.5 py-1.5 text-[11px] flex flex-wrap items-center justify-between gap-2">
                        <span className="font-extrabold text-orange-900">1. Jisim Unsur:</span>
                        <span className="font-mono text-slate-800">
                          Cu = 25.70 − 22.50 = <strong className="text-orange-700">3.20 g</strong> &nbsp;|&nbsp; O = 26.50 − 25.70 ={' '}
                          <strong className="text-orange-700">0.80 g</strong>
                        </span>
                      </div>

                      {/* Step 2: Standard KSSM Mole Ratio Table */}
                      {calcReveal >= 2 && (
                        <div className="border border-slate-200 rounded-lg overflow-hidden text-[11px]">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                                <th className="text-left px-2 py-1 font-extrabold">2. Langkah Jadual Mol</th>
                                <th className="text-center px-2 py-1 font-extrabold text-orange-800">Kuprum (Cu)</th>
                                <th className="text-center px-2 py-1 font-extrabold text-sky-700">Oksigen (O)</th>
                              </tr>
                            </thead>
                            <tbody className="font-mono">
                              <tr className="border-b border-slate-100">
                                <td className="px-2 py-1 font-sans text-slate-600">Jisim (g)</td>
                                <td className="px-2 py-1 text-center font-bold">3.20</td>
                                <td className="px-2 py-1 text-center font-bold">0.80</td>
                              </tr>
                              <tr className="border-b border-slate-100">
                                <td className="px-2 py-1 font-sans text-slate-600">Bil. mol (Jisim / JAR)</td>
                                <td className="px-2 py-1 text-center">3.20 / 64 = <strong>0.05</strong></td>
                                <td className="px-2 py-1 text-center">0.80 / 16 = <strong>0.05</strong></td>
                              </tr>
                              <tr className="bg-emerald-50/70">
                                <td className="px-2 py-1 font-sans font-bold text-emerald-900">Nisbah mol teringkas</td>
                                <td className="px-2 py-1 text-center font-extrabold text-emerald-700">0.05 / 0.05 = 1</td>
                                <td className="px-2 py-1 text-center font-extrabold text-emerald-700">0.05 / 0.05 = 1</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Step 3: Empirical Formula Conclusion */}
                      {calcReveal >= 3 && (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1.5 text-[11px] flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <span className="font-extrabold text-emerald-900">3. Formula Empirik: </span>
                            <span className="font-mono font-extrabold text-emerald-700 text-xs">CuO</span>
                          </div>
                          <span className="font-mono font-bold text-slate-700">
                            CuO(p) + H₂(g) → Cu(p) + H₂O(ce)
                          </span>
                        </div>
                      )}

                      {calcReveal < 3 && (
                        <button
                          type="button"
                          onClick={() => setCalcReveal((prev) => prev + 1)}
                          className="w-full py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold flex items-center justify-center gap-1 cursor-pointer transition"
                        >
                          <span>Langkah Pengiraan Seterusnya ({calcReveal + 1}/3)</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REPEATED HEATING & KSSM DISCUSSION */}
      {activeTab === 'discussion' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
          {/* Left: Repeated Heating Mass Decrease Graph */}
          <div className="md:col-span-5 bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2.5">
            <h3 className="text-xs font-extrabold text-slate-800">
              Graf Pemanasan Berulang Hingga Jisim Tetap
            </h3>

            <svg viewBox="0 0 320 175" className="w-full h-auto select-none bg-slate-50/70 rounded-lg border border-slate-200">
              {/* Grid lines for 26.60, 26.10, 25.60 */}
              {[
                { val: '26.60', y: 36 },
                { val: '26.10', y: 84 },
                { val: '25.60', y: 132 },
              ].map((t) => (
                <g key={t.val}>
                  <line x1="56" y1={t.y} x2="296" y2={t.y} stroke="#e2e8f0" strokeWidth="1" />
                  <text x="50" y={t.y + 3.5} textAnchor="end" fontSize="9.5" fontWeight="700" fill="#64748b">
                    {t.val}
                  </text>
                </g>
              ))}

              {/* Axes */}
              <line x1="56" y1="22" x2="56" y2="142" stroke="#1e293b" strokeWidth="1.5" />
              <line x1="56" y1="142" x2="300" y2="142" stroke="#1e293b" strokeWidth="1.5" />
              <text x="14" y="84" fontSize="9" fontWeight="800" fill="#1e293b" transform="rotate(-90, 14, 84)" textAnchor="middle">
                Jisim (g)
              </text>

              {/* Points: Awal CuO 26.50 (78, 46), #1 25.86 (144, 107), #2 25.70 (210, 122), #3 25.70 (276, 122) */}
              <polyline
                fill="none"
                stroke="#ea580c"
                strokeWidth="2.4"
                points="78,46 144,107 210,122 276,122"
              />
              {[
                { x: 78, y: 46, label: 'Awal CuO', val: '26.50', color: '#475569' },
                { x: 144, y: 107, label: 'Ulang #1', val: '25.86', color: '#d97706' },
                { x: 210, y: 122, label: 'Ulang #2', val: '25.70', color: '#ea580c' },
                { x: 276, y: 122, label: 'Ulang #3', val: '25.70 ✓', color: '#059669' },
              ].map((pt) => (
                <g key={pt.label}>
                  <circle cx={pt.x} cy={pt.y} r="4.5" fill={pt.color} stroke="#ffffff" strokeWidth="1.5" />
                  <text x={pt.x} y={pt.y - 8} textAnchor="middle" fontSize="9" fontWeight="800" fill={pt.color}>
                    {pt.val}
                  </text>
                  <text x={pt.x} y="157" textAnchor="middle" fontSize="9" fontWeight="700" fill="#334155">
                    {pt.label}
                  </text>
                </g>
              ))}
            </svg>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-2.5 text-[11px] text-orange-950 leading-relaxed space-y-1">
              <div className="font-extrabold">Mengapa Jisim Menurun Hingga Tetap?</div>
              <p>
                Gas hidrogen menyingkirkan oksigen daripada kuprum(II) oksida sebagai wap air (CuO + H₂ → Cu + H₂O), jadi jisim berkurang (26.50 g → 25.86 g → 25.70 g). Apabila dua timbangan berturut-turut kekal 25.70 g, semua CuO telah terturun lengkap kepada kuprum perang.
              </p>
            </div>
          </div>

          {/* Right: KSSM Discussion Q&A */}
          <div className="md:col-span-7 bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-extrabold text-slate-800">
                Perbincangan Buku Teks (Aktiviti 3.13 · m.s. 64)
              </h3>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                Klik soalan untuk semak jawapan
              </span>
            </div>

            <div className="space-y-2">
              {discussionQuestions.map((item, idx) => {
                const isOpen = !!openAnswers[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      setOpenAnswers((prev) => ({ ...prev, [idx]: !prev[idx] }))
                    }
                    className="w-full text-left rounded-lg border border-slate-200 hover:border-indigo-300 bg-slate-50/70 p-2.5 transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2 text-[11.5px] font-extrabold text-slate-800">
                      <span>{item.q}</span>
                      <span className="text-[10px] text-indigo-600 shrink-0">
                        {isOpen ? 'Tutup' : 'Jawapan'}
                      </span>
                    </div>
                    {isOpen && (
                      <p className="mt-1.5 pt-1.5 border-t border-slate-200 text-[11px] text-slate-700 leading-relaxed">
                        {item.a}
                      </p>
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

export default CopperOxideLab;
