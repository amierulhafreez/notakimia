import React, { useState } from 'react';
import { analytics } from '../services/analytics';
import confetti from 'canvas-confetti';
import { TestTube, Droplets, RotateCcw, CheckCircle2, Sparkles, Info } from 'lucide-react';

interface CationTest {
  id: string;
  name: string;
  formula: string;
  naohFew: string;
  naohExcess: string;
  nh3Few: string;
  nh3Excess: string;
  precipitateColor: string; // for css representation
  excessSolubleInNaOH: boolean;
  excessSolubleInNH3: boolean;
}

const CATIONS: CationTest[] = [
  {
    id: 'cu2',
    name: 'Kuprum(II)',
    formula: 'Cu²⁺',
    naohFew: 'Mendakan biru terbentuk',
    naohExcess: 'Tidak larut dalam lebihan NaOH',
    nh3Few: 'Mendakan biru terbentuk',
    nh3Excess: 'Larut dalam lebihan NH₃ membentuk larutan biru tua (dark blue solution)',
    precipitateColor: 'bg-sky-500',
    excessSolubleInNaOH: false,
    excessSolubleInNH3: true
  },
  {
    id: 'fe2',
    name: 'Ferum(II)',
    formula: 'Fe²⁺',
    naohFew: 'Mendakan hijau kotor terbentuk',
    naohExcess: 'Tidak larut dalam lebihan NaOH',
    nh3Few: 'Mendakan hijau kotor terbentuk',
    nh3Excess: 'Tidak larut dalam lebihan NH₃',
    precipitateColor: 'bg-emerald-700',
    excessSolubleInNaOH: false,
    excessSolubleInNH3: false
  },
  {
    id: 'fe3',
    name: 'Ferum(III)',
    formula: 'Fe³⁺',
    naohFew: 'Mendakan perang kemerahan terbentuk',
    naohExcess: 'Tidak larut dalam lebihan NaOH',
    nh3Few: 'Mendakan perang kemerahan terbentuk',
    nh3Excess: 'Tidak larut dalam lebihan NH₃',
    precipitateColor: 'bg-amber-800',
    excessSolubleInNaOH: false,
    excessSolubleInNH3: false
  },
  {
    id: 'zn2',
    name: 'Zink',
    formula: 'Zn²⁺',
    naohFew: 'Mendakan putih terbentuk',
    naohExcess: 'Larut dalam lebihan NaOH menghasilkan larutan tidak berwarna',
    nh3Few: 'Mendakan putih terbentuk',
    nh3Excess: 'Larut dalam lebihan NH₃ menghasilkan larutan tidak berwarna',
    precipitateColor: 'bg-white',
    excessSolubleInNaOH: true,
    excessSolubleInNH3: true
  },
  {
    id: 'al3',
    name: 'Aluminium',
    formula: 'Al³⁺',
    naohFew: 'Mendakan putih terbentuk',
    naohExcess: 'Larut dalam lebihan NaOH menghasilkan larutan tidak berwarna',
    nh3Few: 'Mendakan putih terbentuk',
    nh3Excess: 'Tidak larut dalam lebihan NH₃',
    precipitateColor: 'bg-white',
    excessSolubleInNaOH: true,
    excessSolubleInNH3: false
  },
  {
    id: 'pb2',
    name: 'Plumbum(II)',
    formula: 'Pb²⁺',
    naohFew: 'Mendakan putih terbentuk',
    naohExcess: 'Larut dalam lebihan NaOH menghasilkan larutan tidak berwarna',
    nh3Few: 'Mendakan putih terbentuk',
    nh3Excess: 'Tidak larut dalam lebihan NH₃',
    precipitateColor: 'bg-white',
    excessSolubleInNaOH: true,
    excessSolubleInNH3: false
  },
  {
    id: 'mg2',
    name: 'Magnesium',
    formula: 'Mg²⁺',
    naohFew: 'Mendakan putih terbentuk',
    naohExcess: 'Tidak larut dalam lebihan NaOH',
    nh3Few: 'Mendakan putih terbentuk',
    nh3Excess: 'Tidak larut dalam lebihan NH₃',
    precipitateColor: 'bg-white',
    excessSolubleInNaOH: false,
    excessSolubleInNH3: false
  }
];

export const CationAnionLab: React.FC = () => {
  const SIM_ID = 'ujian-kation';
  const [selectedCation, setSelectedCation] = useState<CationTest>(CATIONS[0]);
  const [reagent, setReagent] = useState<'NaOH' | 'NH3'>('NaOH');
  const [dosage, setDosage] = useState<'none' | 'few' | 'excess'>('none');

  const handleAddDrops = (type: 'few' | 'excess') => {
    setDosage(type);
    analytics.recordSimulationClick(SIM_ID, 1);
    if (type === 'excess') {
      analytics.recordSimulationCompleted(SIM_ID);
      confetti({ particleCount: 50, spread: 50 });
    }
  };

  const handleReset = () => {
    setDosage('none');
  };

  const getObservationText = () => {
    if (dosage === 'none') return 'Larutan sampel jernih sebelum penambahan reagen.';
    if (reagent === 'NaOH') {
      return dosage === 'few' ? selectedCation.naohFew : selectedCation.naohExcess;
    } else {
      return dosage === 'few' ? selectedCation.nh3Few : selectedCation.nh3Excess;
    }
  };

  const isSolubleInExcess = () => {
    if (dosage !== 'excess') return false;
    return reagent === 'NaOH' ? selectedCation.excessSolubleInNaOH : selectedCation.excessSolubleInNH3;
  };

  return (
    <div className="space-y-6">
      {/* Cation Selection Chips */}
      <div className="flex flex-wrap gap-2">
        {CATIONS.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCation(cat);
              setDosage('none');
              analytics.recordSimulationClick(SIM_ID, 1);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              selectedCation.id === cat.id
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{cat.name}</span>
            <span className="font-mono text-[10px] bg-black/10 px-1 py-0.2 rounded">{cat.formula}</span>
          </button>
        ))}
      </div>

      {/* Lab Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        
        {/* Left: Test Tube Visualizer */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center min-h-[340px] bg-slate-50 border border-slate-200 rounded-2xl p-6 relative">
          
          {/* Reagent Dropper */}
          <div className={`transition-all duration-300 mb-2 ${dosage !== 'none' ? 'translate-y-2' : '-translate-y-4 opacity-70'}`}>
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-200">
                Menitiskan {reagent} ({dosage === 'few' ? 'Sedikit' : dosage === 'excess' ? 'Berlebihan' : 'Sedia'})
              </span>
            </div>
          </div>

          {/* Test Tube */}
          <div className="w-16 h-52 border-2 border-slate-400 rounded-b-full bg-sky-50/20 relative overflow-hidden flex flex-col justify-end p-1 shadow-lg backdrop-blur-sm">
            
            {/* Liquid inside test tube */}
            <div className="w-full h-28 relative flex flex-col justify-end rounded-b-full transition-all duration-500">
              
              {/* Solution background */}
              {isSolubleInExcess() && selectedCation.id === 'cu2' && reagent === 'NH3' ? (
                // Dark blue solution for Cu2+ with excess NH3
                <div className="absolute inset-0 bg-blue-900/90 rounded-b-full"></div>
              ) : isSolubleInExcess() ? (
                // Clear colourless solution
                <div className="absolute inset-0 bg-sky-100/30 rounded-b-full"></div>
              ) : (
                <div className="absolute inset-0 bg-sky-200/20 rounded-b-full"></div>
              )}

              {/* Precipitate at bottom */}
              {dosage !== 'none' && !isSolubleInExcess() && (
                <div 
                  className={`w-full ${dosage === 'few' ? 'h-10' : 'h-16'} ${selectedCation.precipitateColor} border-t-2 border-black/10 rounded-b-full shadow-inner transition-all duration-500 flex items-center justify-center`}
                >
                  <span className={`text-[7px] font-bold px-1 text-center ${selectedCation.precipitateColor === 'bg-white' ? 'text-slate-800' : 'text-white'}`}>
                    Mendakan
                  </span>
                </div>
              )}

            </div>
          </div>

          <span className="text-xs font-semibold text-slate-700 mt-3">
            Tabung Uji: Sampel Ion {selectedCation.name} ({selectedCation.formula})
          </span>
        </div>

        {/* Right: Controls & Observation Card */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          
          <div className="space-y-4">
            {/* Reagent Switch (NaOH vs NH3) */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700">Pilih Larutan Reagen:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setReagent('NaOH');
                    setDosage('none');
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    reagent === 'NaOH'
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/20'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Natrium Hidroksida (NaOH)
                </button>

                <button
                  onClick={() => {
                    setReagent('NH3');
                    setDosage('none');
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    reagent === 'NH3'
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/20'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Larutan Ammonia (NH₃)
                </button>
              </div>
            </div>

            {/* Dosage Action Buttons */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700">Tindakan Menitis:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleAddDrops('few')}
                  className="py-2.5 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Droplets className="w-4 h-4 text-purple-600" />
                  Titis Sedikit
                </button>

                <button
                  onClick={() => handleAddDrops('excess')}
                  className="py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/25 transition"
                >
                  <Droplets className="w-4 h-4 text-purple-200" />
                  Tambah Hingga Berlebihan
                </button>
              </div>
            </div>

            {/* Observation Output Box */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Pemerhatian Ujian Makmal:
              </span>
              <p className="text-xs font-semibold text-slate-900 leading-relaxed">
                {getObservationText()}
              </p>
            </div>

            {/* SPM Mnemonics Tip */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-1 text-slate-700">
              <span className="font-bold text-amber-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Mnemonik Mudah Ingat SPM:
              </span>
              <p className="text-[11px] text-slate-600">
                Kation larut dalam lebihan NaOH: <strong>ZAP</strong> (Zn²⁺, Al³⁺, Pb²⁺).<br/>
                Kation larut dalam lebihan NH₃: <strong>Z-C</strong> (Zn²⁺ larut jernih, Cu²⁺ larut jadi biru tua).
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-200 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Bersihkan Tabung Uji
          </button>

        </div>

      </div>
    </div>
  );
};
