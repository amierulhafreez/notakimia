import React, { useState } from 'react';
import { analytics } from '../services/analytics';
import confetti from 'canvas-confetti';
import { RotateCcw, Droplets, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const LatexCoagulation: React.FC = () => {
  const SIM_ID = 'penggumpalan-lateks';
  const [addedReagent, setAddedReagent] = useState<'none' | 'acid' | 'alkali'>('none');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showMicroscopic, setShowMicroscopic] = useState<boolean>(true);

  const handleAddAcid = () => {
    setIsProcessing(true);
    analytics.recordSimulationClick(SIM_ID, 1);
    setTimeout(() => {
      setAddedReagent('acid');
      setIsProcessing(false);
      analytics.recordSimulationCompleted(SIM_ID);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const handleAddAlkali = () => {
    setIsProcessing(true);
    analytics.recordSimulationClick(SIM_ID, 1);
    setTimeout(() => {
      setAddedReagent('alkali');
      setIsProcessing(false);
      analytics.recordSimulationCompleted(SIM_ID);
    }, 1200);
  };

  const handleReset = () => {
    setAddedReagent('none');
    setIsProcessing(false);
    analytics.recordSimulationClick(SIM_ID, 1);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-xl flex items-center justify-between text-xs text-slate-300">
        <div>
          <span className="font-bold text-emerald-300">Konsep KSSM:</span> Mengkaji kesan penambahan <strong>Asid Metanoik (HCOOH)</strong> dan <strong>Larutan Ammonia (NH₃)</strong> ke atas penggumpalan lateks.
        </div>
        <button
          onClick={() => setShowMicroscopic(!showMicroscopic)}
          className="px-2.5 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/30 font-medium transition"
        >
          {showMicroscopic ? 'Mod Makro' : 'Mod Mikroskopik (Zarah)'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950/60 border border-slate-800 p-6 rounded-2xl">
        
        {/* Visual Beaker & Particles */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[380px] bg-gradient-to-b from-slate-900/60 to-slate-950 rounded-xl p-6 relative border border-slate-800">
          
          {/* Microscopic Zoom Window */}
          {showMicroscopic && (
            <div className="absolute top-4 right-4 z-20 w-44 h-44 rounded-2xl bg-black/80 border-2 border-emerald-500/40 backdrop-blur-md p-3 flex flex-col justify-between shadow-2xl overflow-hidden">
              <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold">Pandangan Zarah Zarah:</span>
              
              <div className="relative flex-1 flex items-center justify-center">
                {addedReagent === 'none' && (
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-dashed border-red-400 bg-white/90 flex items-center justify-center text-[8px] font-bold text-slate-900 animate-pulse">
                      - - -
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-dashed border-red-400 bg-white/90 flex items-center justify-center text-[8px] font-bold text-slate-900 animate-pulse">
                      - - -
                    </div>
                  </div>
                )}

                {addedReagent === 'acid' && (
                  <div className="w-24 h-16 bg-white/95 rounded-lg flex flex-col items-center justify-center border-2 border-slate-400 shadow-inner">
                    <span className="text-[8px] font-bold text-slate-800">Polimer Berselirat</span>
                    <span className="text-[7px] text-slate-600">(Membran Pecah)</span>
                  </div>
                )}

                {addedReagent === 'alkali' && (
                  <div className="flex gap-6">
                    <div className="w-9 h-9 rounded-full border-2 border-blue-400 bg-white flex items-center justify-center text-[7px] font-bold text-blue-700">
                      - - -
                    </div>
                    <div className="w-9 h-9 rounded-full border-2 border-blue-400 bg-white flex items-center justify-center text-[7px] font-bold text-blue-700">
                      - - -
                    </div>
                  </div>
                )}
              </div>

              <span className="text-[8px] text-slate-400 text-center">
                {addedReagent === 'none' && 'Cas negatif menolak antara zarah'}
                {addedReagent === 'acid' && 'H⁺ meneutralkan cas, zarah bergumpal'}
                {addedReagent === 'alkali' && 'OH⁻ kekalkan cas negatif membran'}
              </span>
            </div>
          )}

          {/* Dropper Dropping Acid/Alkali */}
          <div className={`mb-2 transition-all duration-500 ${isProcessing ? 'translate-y-4 opacity-100' : '-translate-y-4 opacity-0'}`}>
            <div className="flex flex-col items-center">
              <div className="w-4 h-16 bg-sky-200/50 border border-sky-300 rounded-t-sm flex items-end justify-center">
                <div className="w-2 h-3 bg-white rounded-full animate-bounce"></div>
              </div>
              <span className="text-[10px] text-emerald-300 font-semibold mt-1">Menitiskan Reagen...</span>
            </div>
          </div>

          {/* Beaker with Latex */}
          <div className="w-40 h-48 border-x-4 border-b-4 border-slate-500/80 rounded-b-2xl bg-slate-900/30 relative flex flex-col justify-end p-2 shadow-2xl backdrop-blur-sm">
            
            {/* Liquid inside beaker */}
            <div 
              className={`w-full transition-all duration-700 rounded-b-xl flex flex-col items-center justify-center ${
                addedReagent === 'acid' 
                  ? 'h-32 bg-white shadow-[0_0_25px_rgba(255,255,255,0.7)] border-t-4 border-slate-200' 
                  : addedReagent === 'alkali'
                  ? 'h-32 bg-amber-50/70 border-t border-sky-200'
                  : 'h-32 bg-white/70 border-t border-slate-300'
              }`}
            >
              <span className={`text-xs font-bold px-2 py-0.5 rounded text-center ${addedReagent === 'acid' ? 'text-slate-900 bg-slate-200/60' : 'text-slate-800'}`}>
                {addedReagent === 'acid' && 'Pepejal Getah Bergumpal'}
                {addedReagent === 'alkali' && 'Lateks Kekal Cecair'}
                {addedReagent === 'none' && 'Susu Lateks Asli'}
              </span>
            </div>

            {/* Beaker Volume Graduations */}
            <div className="absolute right-2 top-8 bottom-4 flex flex-col justify-between text-[7px] font-mono text-slate-500 pointer-events-none">
              <span>- 150ml</span>
              <span>- 100ml</span>
              <span>- 50ml</span>
            </div>
          </div>

          <span className="text-xs text-slate-400 mt-3 font-medium">Bikar 250 cm³ + Sampel Susu Lateks</span>
        </div>

        {/* Action & Explanation Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-emerald-400 tracking-wider">Tindakan Reagen:</h4>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleAddAcid}
                disabled={isProcessing}
                className="p-3 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-500/40 text-left transition space-y-1"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-300">
                  <Droplets className="w-3.5 h-3.5 text-rose-400" /> + Asid Metanoik
                </div>
                <p className="text-[10px] text-slate-300">Menyebabkan lateks menggumpal serta-merta.</p>
              </button>

              <button
                onClick={handleAddAlkali}
                disabled={isProcessing}
                className="p-3 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 border border-blue-500/40 text-left transition space-y-1"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> + Larutan Ammonia
                </div>
                <p className="text-[10px] text-slate-300">Menghalang lateks daripada menggumpal.</p>
              </button>
            </div>

            {/* Result Report */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400">Penerangan Proses Kimia SPM</span>
              
              {addedReagent === 'acid' && (
                <div className="space-y-1.5 text-slate-200">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> Penggumpalan Berjaya:
                  </div>
                  <ol className="list-decimal pl-4 space-y-1 text-slate-300">
                    <li>Ion hidrogen (H⁺) daripada asid meneutralkan cas negatif membran protein getah.</li>
                    <li>Zarah-zarah getah berlanggar dan membran protein pecah.</li>
                    <li>Rantai polimer getah (poliisoprena) berselirat membentuk pepejal getah.</li>
                  </ol>
                </div>
              )}

              {addedReagent === 'alkali' && (
                <div className="space-y-1.5 text-slate-200">
                  <div className="flex items-center gap-1.5 font-bold text-blue-400">
                    <ShieldCheck className="w-4 h-4" /> Pencegahan Penggumpalan:
                  </div>
                  <ol className="list-decimal pl-4 space-y-1 text-slate-300">
                    <li>Ion hidroksida (OH⁻) daripada larutan ammonia meneutralkan sebarang asid laktik (tindakan bakteria).</li>
                    <li>Cas negatif pada membran protein kekal terpelihara.</li>
                    <li>Zarah-zarah getah terus menolak antara satu sama lain, kekal sebagai cecair.</li>
                  </ol>
                </div>
              )}

              {addedReagent === 'none' && (
                <p className="text-slate-500 italic">
                  Pilih sama ada hendak menambah asid (menggumpalkan) atau ammonia (mencegah gumpalan) untuk melihat tindak balas.
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-medium flex items-center justify-center gap-2 transition"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            Reset Ujian Lateks
          </button>

        </div>

      </div>
    </div>
  );
};
