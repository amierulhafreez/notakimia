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
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { analytics } from '../services/analytics';
import { MagnesiumOxideCrucibleSVG } from '../components/MagnesiumOxideCrucibleSVG';

const MASS_CRUCIBLE = 24.0;
const MASS_WITH_MG = 24.48; // 0.48 g Mg (0.02 mol)
const MASS_REPEAT_1 = 24.72; // incomplete oxidation
const MASS_REPEAT_2 = 24.8; // +0.32 g O (0.02 mol)
const MASS_REPEAT_3 = 24.8; // constant mass confirmed!

export const MagnesiumOxideLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lab' | 'discussion'>('lab');

  // Procedural state machine:
  // 0: initial empty bench
  // 1: weighed empty crucible + lid (24.00 g)
  // 2: rubbed Mg ribbon with sandpaper & weighed crucible + lid + Mg (24.48 g)
  // 3: mounted on tripod & heating without lid until Mg starts glowing/burning
  // 4: lid closed & tongs occasionally lifting lid slightly (min white fumes) -> white MgO formed
  // 5: heated strongly, cooled & weighed #1 (24.72 g - NOT constant!)
  // 6: repeat #2 weighed (24.80 g) -> repeatCount=1 (still changing, repeat once more!)
  // 7: repeat #3 weighed (24.80 g - Jisim Tetap!) -> calculation unlocked!
  const [step, setStep] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const [calcReveal, setCalcReveal] = useState<number>(1);
  const [openAnswers, setOpenAnswers] = useState<Record<number, boolean>>({ 0: true });

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    analytics.recordSimulationView('formula-empirik-mgo');
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

  const runTimedStep = (nextStep: number, durationMs = 1100, onDone?: () => void) => {
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

    // Card 6 handles both Repeat #2 (step 5 -> 6) and Repeat #3 (step 6 -> 7)
    const expectedCard = step <= 5 ? step + 1 : step === 6 ? 6 : 99;

    if (targetCard < expectedCard) return;

    if (targetCard !== expectedCard) {
      const messages: Record<number, string> = {
        0: 'Timbang mangkuk pijar bersama penutup kosong terlebih dahulu (Langkah 1).',
        1: 'Gosok pita magnesium dengan kertas pasir, masukkan ke mangkuk pijar dan timbang semula (Langkah 2).',
        2: 'Susun radas pada tungku kaki tiga dan panaskan mangkuk pijar tanpa penutup dahulu (Langkah 3).',
        3: 'Tutup mangkuk pijar dengan penutup dan buka sedikit sekali-sekala menggunakan penyepit (Langkah 4).',
        4: 'Panaskan kuat, sejukkan dan lakukan penimbangan pertama selepas pembakaran lengkap (Langkah 5).',
        5: 'Jisim belum tetap! Jalankan pemanasan & penimbangan berulang hingga jisim tetap (Langkah 6).',
      };
      setWarningMsg(messages[step] || 'Ikut urutan langkah prosedur Aktiviti 3.12.');
      return;
    }

    setWarningMsg(null);

    if (targetCard === 1 || targetCard === 2) {
      setStep(targetCard);
      return;
    }

    if (targetCard === 3) {
      setStep(3);
      runTimedStep(3, 850); // brief ignition animation stays at step 3 ready for step 4
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
          analytics.recordSimulationCompleted('formula-empirik-mgo');
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
  const hasMgRibbon = step >= 2;
  const isPolished = step >= 2;
  const lidState: 'off' | 'closed' | 'ajar' =
    step === 3 ? 'off' : step === 4 ? 'ajar' : 'closed';
  const isHeating = isAnimating && (step === 3 || step === 4 || step === 5 || step === 6);
  const burnStage: 0 | 1 | 2 | 3 =
    step <= 2 ? 0 : step === 3 ? 1 : step === 4 ? (isAnimating ? 1 : 2) : 3;
  const hasTongs = step === 4;

  const balanceMode: 'idle' | 'empty' | 'withMg' | 'repeat1' | 'repeat2' | 'repeat3' =
    step === 0
      ? 'idle'
      : step === 1
      ? 'empty'
      : step <= 4
      ? 'withMg'
      : step === 5
      ? 'repeat1'
      : step === 6
      ? 'repeat2'
      : 'repeat3';

  const currentMass =
    balanceMode === 'empty'
      ? MASS_CRUCIBLE
      : balanceMode === 'withMg'
      ? MASS_WITH_MG
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
      title: '1. Timbang Mangkuk Pijar + Penutup',
      subtitle: `Jisim kosong = ${MASS_CRUCIBLE.toFixed(2)} g`,
      icon: Scale,
      done: step >= 1,
      active: step === 0,
      cta: 'Klik',
    },
    {
      card: 2,
      title: '2. Gosok Pita Mg & Timbang',
      subtitle: `Bersihkan lapisan oksida • ${MASS_WITH_MG.toFixed(2)} g`,
      icon: Sparkles,
      done: step >= 2,
      active: step === 1,
      cta: 'Klik',
    },
    {
      card: 3,
      title: '3. Panaskan (Tanpa Penutup)',
      subtitle: 'Susun atas alas segi tiga hingga Mg mula terbakar',
      icon: Flame,
      done: step >= 3 && !isAnimating,
      active: step === 2,
      cta: 'Panaskan',
    },
    {
      card: 4,
      title: '4. Tutup & Buka Sedikit (Penyepit)',
      subtitle: 'Kawal O₂ masuk & minimumkan wasap putih MgO',
      icon: ShieldAlert,
      done: step >= 4 && !isAnimating,
      active: step === 3,
      cta: 'Tutup',
    },
    {
      card: 5,
      title: '5. Panas Kuat, Sejuk & Timbang #1',
      subtitle: step >= 5 ? `Timbangan #1 = ${MASS_REPEAT_1.toFixed(2)} g` : 'Panaskan 1–2 min, sejuk & timbang',
      icon: Scale,
      done: step >= 5,
      active: step === 4,
      cta: 'Timbang',
    },
    {
      card: 6,
      title:
        step === 6
          ? '6. Ulang Pemanasan (Kali Ke-3)'
          : '6. Ulang Hingga Jisim Tetap',
      subtitle:
        step < 6
          ? 'Ulang panas, sejuk & timbang untuk jisim tetap'
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
        text: 'Sedang memanaskan mangkuk pijar, menyejukkan hingga suhu bilik, dan menimbang...',
      };
    }
    switch (step) {
      case 0:
        return {
          type: 'info' as const,
          text: 'Klik Langkah 1 untuk menimbang mangkuk pijar bersama penutupnya di atas penimbang elektronik.',
        };
      case 1:
        return {
          type: 'info' as const,
          text: 'Gosok 10 cm pita magnesium dengan kertas pasir sehingga berkilat, gulung & timbang semula (Langkah 2).',
        };
      case 2:
        return {
          type: 'info' as const,
          text: 'Klik Langkah 3 untuk menyusun radas Rajah 3.12 dan memanaskan mangkuk pijar tanpa penutup.',
        };
      case 3:
        return {
          type: 'info' as const,
          text: 'Pita magnesium mula terbakar dengan nyalaan putih terang! Klik Langkah 4 untuk menutup & mengawal penutup dengan penyepit.',
        };
      case 4:
        return {
          type: 'info' as const,
          text: 'Klik Langkah 5 untuk memanaskan mangkuk pijar dengan kuat, sejukkan ke suhu bilik, dan rekod Timbangan #1.',
        };
      case 5:
        return {
          type: 'warn' as const,
          text: 'Timbangan #1 (24.72 g): belum mencapai jisim tetap! Klik Langkah 6 untuk mengulang pemanasan & penimbangan kali ke-2.',
        };
      case 6:
        return {
          type: 'warn' as const,
          text: 'Timbangan #2 (24.80 g) berbeza daripada #1 (24.72 g). Klik Langkah 6 sekali lagi untuk memastikan jisim tetap dicapai!',
        };
      default:
        return {
          type: 'done' as const,
          text: 'Jisim tetap (24.80 g) telah dicapai! Teruskan jadual pengiraan nisbah mol teringkas di sebelah kanan.',
        };
    }
  })();

  const statusPillText =
    step === 0
      ? 'Sedia'
      : step <= 2
      ? 'Penimbangan Awal'
      : step <= 4
      ? 'Pembakaran Mg'
      : step === 5
      ? 'Timbangan #1'
      : step === 6
      ? 'Timbangan #2'
      : 'Jisim Tetap ✓';

  const discussionQuestions = [
    {
      q: '1. Apakah tujuan menggosok pita magnesium dengan kertas pasir sebelum digunakan?',
      a: 'Untuk menyingkirkan lapisan oksida (magnesium oksida) pada permukaan pita magnesium supaya hanya logam magnesium tulen yang bertindak balas dengan oksigen.',
    },
    {
      q: '2. Namakan wasap putih yang dihasilkan semasa pembakaran magnesium.',
      a: 'Magnesium oksida (MgO).',
    },
    {
      q: '3. Mengapakah Langkah 6 (tutup penutup), Langkah 7 (buka sedikit sekali-sekala) dan Langkah 11 (ulang hingga jisim tetap) dilaksanakan?',
      a: 'Langkah 6 mengelakkan wasap putih MgO terbebas keluar; Langkah 7 membenarkan gas oksigen daripada udara masuk ke dalam mangkuk pijar untuk tindak balas lengkap; Langkah 11 memastikan semua magnesium telah bertindak balas lengkap dengan oksigen.',
    },
    {
      q: '4. Apakah yang akan berlaku jika wasap putih terbebas ke persekitaran?',
      a: 'Sebahagian produk magnesium oksida hilang, menyebabkan jisim magnesium oksida yang ditimbang berkurang. Jisim oksigen yang dihitung menjadi lebih rendah dan formula empirik yang diperoleh tidak tepat.',
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
                ? 'bg-blue-600 text-white shadow-xs'
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
            JAR: Mg = 24, O = 16
          </span>
          <span
            className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold whitespace-nowrap shrink-0 ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-amber-100 text-amber-800 border border-amber-200'
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
                Radas &amp; Prosedur (Aktiviti 3.12)
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
                        ? 'bg-blue-50 border-blue-400 text-slate-900 shadow-xs hover:bg-blue-100/70 cursor-pointer'
                        : 'bg-slate-50/70 border-slate-200 text-slate-500 hover:border-slate-300 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className={`p-1.5 rounded-md shrink-0 ${
                          item.done
                            ? 'bg-emerald-100 text-emerald-700'
                            : item.active
                            ? 'bg-blue-600 text-white'
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
                      <span className="text-[10px] font-extrabold text-blue-700 bg-white px-1.5 py-0.5 rounded border border-blue-300 whitespace-nowrap shrink-0">
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

          {/* RIGHT PANEL: Workbench SVG + Jadual 3.4 & Scaffolded Calculation */}
          <div className="md:col-span-8 space-y-3">
            {/* Workbench */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDropOnBench}
              className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-xs"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-extrabold text-slate-800 truncate">
                  Meja Kerja: Susunan Radas Rajah 3.12 (Pembakaran Magnesium dalam Mangkuk Pijar)
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
                <MagnesiumOxideCrucibleSVG
                  hasSetup={hasSetup}
                  hasMgRibbon={hasMgRibbon}
                  isPolished={isPolished}
                  lidState={lidState}
                  isHeating={isHeating}
                  burnStage={burnStage}
                  hasTongs={hasTongs}
                  balanceMode={balanceMode}
                  currentMass={currentMass}
                />
              </div>
            </div>

            {/* Jadual 3.4 & Perancang Pengiraan */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <div className="bg-blue-600 text-white px-3 py-1.5 flex items-center justify-between gap-2">
                <span className="text-xs font-extrabold">
                  Keputusan (Jadual 3.4) &amp; Pengiraan Nisbah Mol Teringkas
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
                {/* Left: Jadual 3.4 */}
                <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-lg p-2.5 space-y-1.5">
                  <div className="text-[11px] font-extrabold text-slate-700 border-b border-slate-200 pb-1">
                    Jadual 3.4: Rekod Penimbangan
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between gap-2">
                      <span className="text-slate-600">Mangkuk pijar + penutup</span>
                      <span className="font-mono font-bold text-slate-900 whitespace-nowrap">
                        {step >= 1 ? `${MASS_CRUCIBLE.toFixed(2)} g` : '—'}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-slate-600">Mangkuk + penutup + pita Mg</span>
                      <span className="font-mono font-bold text-slate-900 whitespace-nowrap">
                        {step >= 2 ? `${MASS_WITH_MG.toFixed(2)} g` : '—'}
                      </span>
                    </div>
                    <div className="pt-1 border-t border-slate-200 space-y-1">
                      <div className="flex justify-between gap-2">
                        <span className="text-slate-600">Timbangan #1 (+ MgO)</span>
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
                        Ulang pemanasan memastikan semua Mg bertindak balas lengkap dengan O₂
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {/* Step 1: Mass of Mg and O */}
                      <div className="bg-blue-50/75 border border-blue-200 rounded-lg px-2.5 py-1.5 text-[11px] flex flex-wrap items-center justify-between gap-2">
                        <span className="font-extrabold text-blue-900">1. Jisim Unsur:</span>
                        <span className="font-mono text-slate-800">
                          Mg = <strong className="text-blue-700">0.48 g</strong> &nbsp;|&nbsp; O = 24.80 − 24.48 ={' '}
                          <strong className="text-blue-700">0.32 g</strong>
                        </span>
                      </div>

                      {/* Step 2: Standard KSSM Mole Ratio Table */}
                      {calcReveal >= 2 && (
                        <div className="border border-slate-200 rounded-lg overflow-hidden text-[11px]">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                                <th className="text-left px-2 py-1 font-extrabold">2. Langkah Jadual Mol</th>
                                <th className="text-center px-2 py-1 font-extrabold text-blue-800">Magnesium (Mg)</th>
                                <th className="text-center px-2 py-1 font-extrabold text-rose-700">Oksigen (O)</th>
                              </tr>
                            </thead>
                            <tbody className="font-mono">
                              <tr className="border-b border-slate-100">
                                <td className="px-2 py-1 font-sans text-slate-600">Jisim (g)</td>
                                <td className="px-2 py-1 text-center font-bold">0.48</td>
                                <td className="px-2 py-1 text-center font-bold">0.32</td>
                              </tr>
                              <tr className="border-b border-slate-100">
                                <td className="px-2 py-1 font-sans text-slate-600">Bil. mol (Jisim / JAR)</td>
                                <td className="px-2 py-1 text-center">0.48 / 24 = <strong>0.02</strong></td>
                                <td className="px-2 py-1 text-center">0.32 / 16 = <strong>0.02</strong></td>
                              </tr>
                              <tr className="bg-emerald-50/70">
                                <td className="px-2 py-1 font-sans font-bold text-emerald-900">Nisbah mol teringkas</td>
                                <td className="px-2 py-1 text-center font-extrabold text-emerald-700">0.02 / 0.02 = 1</td>
                                <td className="px-2 py-1 text-center font-extrabold text-emerald-700">0.02 / 0.02 = 1</td>
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
                            <span className="font-mono font-extrabold text-emerald-700 text-xs">MgO</span>
                          </div>
                          <span className="font-mono font-bold text-slate-700">
                            2Mg(p) + O₂(g) → 2MgO(p)
                          </span>
                        </div>
                      )}

                      {calcReveal < 3 && (
                        <button
                          type="button"
                          onClick={() => setCalcReveal((prev) => prev + 1)}
                          className="w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold flex items-center justify-center gap-1 cursor-pointer transition"
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
          {/* Left: Repeated Heating Chart & Explanation */}
          <div className="md:col-span-5 bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2.5">
            <h3 className="text-xs font-extrabold text-slate-800">
              Graf Pemanasan Berulang Hingga Jisim Tetap
            </h3>

            <svg viewBox="0 0 320 175" className="w-full h-auto select-none bg-slate-50/70 rounded-lg border border-slate-200">
              {/* Grid lines for 24.40, 24.60, 24.80 */}
              {[
                { val: '24.80', y: 38 },
                { val: '24.60', y: 86 },
                { val: '24.40', y: 134 },
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

              {/* Points: Awal Mg (78, 115), #1 (144, 57), #2 (210, 38), #3 (276, 38) */}
              <polyline
                fill="none"
                stroke="#0284c7"
                strokeWidth="2.4"
                points="78,115 144,57 210,38 276,38"
              />
              {[
                { x: 78, y: 115, label: 'Awal Mg', val: '24.48', color: '#475569' },
                { x: 144, y: 57, label: 'Ulang #1', val: '24.72', color: '#d97706' },
                { x: 210, y: 38, label: 'Ulang #2', val: '24.80', color: '#0284c7' },
                { x: 276, y: 38, label: 'Ulang #3', val: '24.80 ✓', color: '#059669' },
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

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-[11px] text-amber-950 leading-relaxed space-y-1">
              <div className="font-extrabold">Mengapa Perlu Jisim Tetap?</div>
              <p>
                Selagi jisim masih meningkat (24.72 g → 24.80 g), terdapat baki pita magnesium yang masih bertindak balas dengan oksigen. Apabila dua timbangan berturut-turut memberi bacaan sama (24.80 g), tindak balas telah lengkap sepenuhnya.
              </p>
            </div>
          </div>

          {/* Right: KSSM Discussion Q&A */}
          <div className="md:col-span-7 bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-extrabold text-slate-800">
                Perbincangan Buku Teks (Aktiviti 3.12 · m.s. 62)
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

export default MagnesiumOxideLab;
