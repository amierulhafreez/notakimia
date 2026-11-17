import React, { Suspense, useEffect } from 'react';
import { SimulationItem } from '../types/simulation';
import { analytics } from '../services/analytics';
import { X, Sparkles, BookOpen, FlaskConical, HelpCircle } from 'lucide-react';

interface Props {
  simulation: SimulationItem | null;
  onClose: () => void;
  onOpenGuide?: () => void;
}

type LoaderFn = () => Promise<{ default: React.ComponentType }>;

const SIMULATION_LOADERS: Record<string, LoaderFn> = {
  'pentitratan-asid-alkali': () =>
    import('../simulations/AcidBaseTitration').then((m) => ({ default: m.AcidBaseTitration })),
  'ujian-gas': () =>
    import('../simulations/GasTestLab').then((m) => ({ default: m.GasTestLab })),
  'pemanasan-dan-penyejukkan-naftalena': () =>
    import('../simulations/NaphthaleneCooling').then((m) => ({ default: m.NaphthaleneCooling })),
  'penyeimbangan-persamaan-kimia': () =>
    import('../simulations/ChemicalEquationBalancer').then((m) => ({ default: m.ChemicalEquationBalancer })),
  'penggumpalan-lateks': () =>
    import('../simulations/LatexCoagulationLab').then((m) => ({ default: m.LatexCoagulationLab })),
  'kekenyalan-getah-asli-tervulkan': () =>
    import('../simulations/RubberElasticityLab').then((m) => ({ default: m.RubberElasticityLab })),
  'ujian-kation': () =>
    import('../simulations/CationTestLab').then((m) => ({ default: m.CationTestLab })),
  'ujian-anion': () =>
    import('../simulations/AnionTestLab').then((m) => ({ default: m.AnionTestLab })),
  'elektrolisis': () =>
    import('../simulations/ElectrolysisLab').then((m) => ({ default: m.ElectrolysisLab })),
  'keterlarutan-garam': () =>
    import('../simulations/SaltSolubilityLab').then((m) => ({ default: m.SaltSolubilityLab })),
  'penentuan-isomer': () =>
    import('../simulations/CarbonIsomersLab').then((m) => ({ default: m.CarbonIsomersLab })),
  'formula-struktur-karbon': () =>
    import('../simulations/CarbonStructureBuilderLab').then((m) => ({ default: m.CarbonStructureBuilderLab })),
  'kereaktifan-k1-dan-k17': () =>
    import('../simulations/ReactivityLab').then((m) => ({ default: m.ReactivityLab })),
  'penghasilan-sebatian-kovalen': () =>
    import('../simulations/CovalentFormulaLab').then((m) => ({ default: m.CovalentFormulaLab })),
  'penghasilan-formula-kimia': () =>
    import('../simulations/IonicFormulaLab').then((m) => ({ default: m.IonicFormulaLab })),
  'haba-penyesaran': () =>
    import('../simulations/ThermochemistryLab').then((m) => ({ default: m.ThermochemistryLab })),
  'penghasilan-sabun': () =>
    import('../simulations/SoapMakingLab').then((m) => ({ default: m.SoapMakingLab })),
  'pencucian-sabun-detergen-air-liat': () =>
    import('../simulations/HardWaterCleaningLab').then((m) => ({ default: m.HardWaterCleaningLab })),
  'daya-tarikan-zarah': () =>
    import('../simulations/IntermolecularForcesLab').then((m) => ({ default: m.IntermolecularForcesLab })),
  'penyediaan-larutan-piawai': () =>
    import('../simulations/StandardSolutionLab').then((m) => ({ default: m.StandardSolutionLab })),
  'kadar-tindak-balas-saiz': () =>
    import('../simulations/RateOfReactionSizeLab').then((m) => ({ default: m.RateOfReactionSizeLab })),
  'kadar-tindak-balas-kepekatan': () =>
    import('../simulations/RateOfReactionConcentrationLab').then((m) => ({ default: m.RateOfReactionConcentrationLab })),
  'kadar-tindak-balas-suhu': () =>
    import('../simulations/RateOfReactionTemperatureLab').then((m) => ({ default: m.RateOfReactionTemperatureLab })),
  'kadar-tindak-balas-mangkin': () =>
    import('../simulations/RateOfReactionCatalystLab').then((m) => ({ default: m.RateOfReactionCatalystLab })),
  'keadaan-zarah-jirim': () =>
    import('../simulations/StatesOfMatterLab').then((m) => ({ default: m.StatesOfMatterLab })),
  'pengekstrakan-besi': () =>
    import('../simulations/IronExtractionLab').then((m) => ({ default: m.IronExtractionLab })),
  'pengekstrakan-aluminium': () =>
    import('../simulations/AluminumExtractionLab').then((m) => ({ default: m.AluminumExtractionLab })),
  'haba-pembakaran': () =>
    import('../simulations/HeatOfCombustionLab').then((m) => ({ default: m.HeatOfCombustionLab })),
  'nilai-bahan-api': () =>
    import('../simulations/FuelValueLab').then((m) => ({ default: m.FuelValueLab })),
  'formula-empirik-mgo': () =>
    import('../simulations/MagnesiumOxideLab').then((m) => ({ default: m.MagnesiumOxideLab })),
  'formula-empirik-cuo': () =>
    import('../simulations/CopperOxideLab').then((m) => ({ default: m.CopperOxideLab })),
  'sifat-oksida-kala-3': () =>
    import('../simulations/Period3OxidesLab').then((m) => ({ default: m.Period3OxidesLab })),
  'kekerasan-aloi-logam-tulen': () =>
    import('../simulations/AlloyHardnessLab').then((m) => ({ default: m.AlloyHardnessLab })),
  'pemindahan-elektron-tiub-u': () =>
    import('../simulations/UTubeElectronTransferLab').then((m) => ({ default: m.UTubeElectronTransferLab })),
  'penukaran-ion-ferum': () =>
    import('../simulations/IronIonConversionLab').then((m) => ({ default: m.IronIonConversionLab })),
  'penyesaran-halogen-halida': () =>
    import('../simulations/HalogenDisplacementLab').then((m) => ({ default: m.HalogenDisplacementLab })),
  'sel-kimia-voltan': () =>
    import('../simulations/VoltaicCellLab').then((m) => ({ default: m.VoltaicCellLab })),
  'pengaratan-besi-sentuhan-logam': () =>
    import('../simulations/IronRustingLab').then((m) => ({ default: m.IronRustingLab })),
  'pengoksidaan-etanol': () =>
    import('../simulations/EthanolOxidationLab').then((m) => ({ default: m.EthanolOxidationLab })),
  'pengesteran-alkohol-asid-karboksilik': () =>
    import('../simulations/EsterificationLab').then((m) => ({ default: m.EsterificationLab })),
  'tindak-balas-kimia-alkena': () =>
    import('../simulations/AlkeneReactionsHubLab').then((m) => ({ default: m.AlkeneReactionsHubLab })),
  'penapaian-penyulingan-etanol': () =>
    import('../simulations/EthanolFermentationDistillationLab').then((m) => ({ default: m.EthanolFermentationDistillationLab })),
  'ujian-kimia-alkana-alkena': () =>
    import('../simulations/AlkaneVsAlkeneLab').then((m) => ({ default: m.AlkaneVsAlkeneLab })),
  'haba-peneutralan': () =>
    import('../simulations/HeatOfNeutralisationLab').then((m) => ({ default: m.HeatOfNeutralisationLab })),
  'haba-pemendakan': () =>
    import('../simulations/HeatOfPrecipitationLab').then((m) => ({ default: m.HeatOfPrecipitationLab })),
};

const LAZY_SIMULATIONS: Record<string, React.LazyExoticComponent<React.ComponentType>> = {};
for (const [id, loader] of Object.entries(SIMULATION_LOADERS)) {
  LAZY_SIMULATIONS[id] = React.lazy(loader);
}

const preloadedIds = new Set<string>();
export function preloadSimulation(simId: string): void {
  if (preloadedIds.has(simId)) return;
  const loader = SIMULATION_LOADERS[simId];
  if (loader) {
    preloadedIds.add(simId);
    loader().catch(() => {
      preloadedIds.delete(simId);
    });
  }
}

const SimulationLoadingFallback: React.FC = () => (
  <div className="py-16 flex flex-col items-center justify-center space-y-3 text-center">
    <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0071e3] animate-pulse">
      <FlaskConical className="w-5 h-5" />
    </div>
    <div className="space-y-1">
      <p className="text-xs font-bold text-slate-800">Menyediakan Radas Makmal Maya...</p>
      <p className="text-[11px] text-slate-500">Memuatkan komponen interaktif</p>
    </div>
  </div>
);

export const SimulationModal: React.FC<Props> = ({ simulation, onClose, onOpenGuide }) => {
  useEffect(() => {
    if (simulation) {
      analytics.recordSimulationView(simulation.id);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [simulation]);

  if (!simulation) return null;

  const ActiveSimulation = LAZY_SIMULATIONS[simulation.id];

  const renderSimulationContent = () => {
    if (ActiveSimulation) {
      return (
        <Suspense fallback={<SimulationLoadingFallback />}>
          <ActiveSimulation />
        </Suspense>
      );
    }

    return (
      <div className="space-y-6">
        <div className="bg-slate-50 border border-slate-200 p-5 sm:p-6 rounded-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Simulasi Interaktif Bakal Tiba (Dalam Pembangunan)</span>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed">
            {simulation.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
              <h4 className="text-xs uppercase font-bold text-slate-500">Standard Pembelajaran DSKP:</h4>
              <p className="text-xs text-slate-800 font-medium">{simulation.learningStandard}</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
              <h4 className="text-xs uppercase font-bold text-slate-500">Kata Kunci Penting SPM:</h4>
              <div className="flex flex-wrap gap-1.5">
                {simulation.tags.map((t, i) => (
                  <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex items-start gap-2.5 text-xs text-blue-950">
            <BookOpen className="w-4 h-4 text-[#0071e3] shrink-0 mt-0.5" />
            <span>
              Tajuk eksperimen ini telah didaftarkan mengikut susunan topik buku teks KSSM. Simulasi maya interaktif penuh bersama rajah radas dan pengiraan akan ditambah tidak lama lagi.
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl w-full max-w-6xl max-h-[92dvh] sm:max-h-[94dvh] flex flex-col shadow-2xl overflow-hidden pb-[env(safe-area-inset-bottom)]"
      >
        {/* Header Modal */}
        <div className="px-4 sm:px-5 py-3 border-b border-slate-100 flex items-center justify-between gap-3 bg-slate-50/90 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                simulation.form === 'Tingkatan 4'
                  ? 'bg-purple-100 text-purple-800 border border-purple-200'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}
            >
              {simulation.form}
            </span>
            <div className="min-w-0">
              <h3 className="font-display font-bold text-sm sm:text-lg text-slate-900 leading-tight truncate">
                {simulation.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">{simulation.chapter}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {onOpenGuide && (
              <button
                type="button"
                onClick={onOpenGuide}
                title="Panduan penggunaan & kawalan makmal"
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 text-[11px] font-semibold border border-slate-200 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#0071e3]" />
                <span className="hidden sm:inline">Panduan</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup simulasi"
              className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition border border-slate-300 cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Body (Smooth iOS/Android scrolling & no horizontal overflow) */}
        <div className="p-3 sm:p-5 overflow-y-auto overflow-x-hidden overscroll-contain space-y-4 bg-[#fcfdff] [-webkit-overflow-scrolling:touch]">
          {renderSimulationContent()}
        </div>
      </div>
    </div>
  );
};
