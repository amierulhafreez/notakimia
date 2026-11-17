import React, { useState } from 'react';
import {
  Fuel,
  Flame,
  Calculator,
  Leaf,
  Coins,
  Globe,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { analytics } from '../services/analytics';

const SIM_ID = 'nilai-bahan-api';

interface FuelSpec {
  id: string;
  name: string;
  fuelValue: number; // kJ g⁻¹ (Jadual 3.5 & 3.6 KSSM m.s. 138)
  category: 'Utama' | 'Rujukan';
  renewable: boolean;
  products: string;
  envImpact: 'Rendah (mesra alam)' | 'Sederhana' | 'Tinggi (pencemar)';
  costLevel: 'Rendah' | 'Sederhana' | 'Tinggi';
  notes: string;
  barColor: string;
}

const FUELS: FuelSpec[] = [
  {
    id: 'etanol',
    name: 'Etanol (C₂H₅OH)',
    fuelValue: 30,
    category: 'Utama',
    renewable: true,
    products: 'CO₂ + H₂O (Pembakaran bersih, sangat kurang jelaga)',
    envImpact: 'Rendah (mesra alam)',
    costLevel: 'Sederhana',
    notes: 'Diperoleh melalui penapaian bahan tumbuhan (biofuel boleh diperbaharui).',
    barColor: '#10b981',
  },
  {
    id: 'petrol',
    name: 'Petrol',
    fuelValue: 34,
    category: 'Utama',
    renewable: false,
    products: 'CO₂ + H₂O + sedikit CO & jelaga',
    envImpact: 'Tinggi (pencemar)',
    costLevel: 'Rendah',
    notes: 'Bahan api fosil tidak boleh diperbaharui; meluas digunakan dalam kenderaan berenjin pembakaran dalam.',
    barColor: '#f59e0b',
  },
  {
    id: 'gas-asli',
    name: 'Gas asli',
    fuelValue: 50,
    category: 'Utama',
    renewable: false,
    products: 'CO₂ + H₂O (lebih bersih daripada petrol)',
    envImpact: 'Sederhana',
    costLevel: 'Rendah',
    notes: 'Menghasilkan lebih banyak haba per gram daripada petrol dan kurang jelaga, tetapi sumber fosil tidak boleh diperbaharui.',
    barColor: '#3b82f6',
  },
  {
    id: 'hidrogen',
    name: 'Cecair / Gas Hidrogen (H₂)',
    fuelValue: 143,
    category: 'Utama',
    renewable: true,
    products: 'H₂O (Air) sahaja — Sifar gas CO₂ & sifar jelaga!',
    envImpact: 'Rendah (mesra alam)',
    costLevel: 'Tinggi',
    notes: 'Nilai bahan api tertinggi (143 kJ g⁻¹). Digunakan sebagai bahan api roket & sel bahan api, namun kos pengeluaran tinggi, mudah terbakar/meletup dan sukar disimpan.',
    barColor: '#6366f1',
  },
  {
    id: 'kayu',
    name: 'Kayu',
    fuelValue: 20,
    category: 'Rujukan',
    renewable: true,
    products: 'CO₂ + H₂O + banyak asap/jelaga',
    envImpact: 'Tinggi (pencemar)',
    costLevel: 'Rendah',
    notes: 'Nilai bahan api terendah dalam Jadual 3.5; menyebabkan penebangan hutan jika tidak diurus.',
    barColor: '#92400e',
  },
  {
    id: 'metana',
    name: 'Metana (Jadual 3.5)',
    fuelValue: 27,
    category: 'Rujukan',
    renewable: false,
    products: 'CO₂ + H₂O',
    envImpact: 'Sederhana',
    costLevel: 'Rendah',
    notes: 'Nilai tercatat dalam Jadual 3.5 Buku Teks Kimia Tingkatan 5 KSSM (m.s. 138).',
    barColor: '#0ea5e9',
  },
  {
    id: 'arang',
    name: 'Arang',
    fuelValue: 30,
    category: 'Rujukan',
    renewable: false,
    products: 'CO₂ + SO₂ + abu/jelaga',
    envImpact: 'Tinggi (pencemar)',
    costLevel: 'Rendah',
    notes: 'Menghasilkan gas pencemar dan jelaga jika pembakaran tidak lengkap.',
    barColor: '#475569',
  },
  {
    id: 'kerosin',
    name: 'Kerosin',
    fuelValue: 37,
    category: 'Rujukan',
    renewable: false,
    products: 'CO₂ + H₂O + jelaga',
    envImpact: 'Tinggi (pencemar)',
    costLevel: 'Sederhana',
    notes: 'Digunakan dalam bahan api pesawat jet dan dapur minyak tanah.',
    barColor: '#ea580c',
  },
];

const CALC_PRESETS = [
  { name: 'Oktana, C₈H₁₈ (Contoh Buku Teks m.s. 137)', deltaH: 5500, mr: 114 },
  { name: 'Etanol, C₂H₅OH (Jadual 3.5/3.6)', deltaH: 1376, mr: 46 },
  { name: 'Metanol, CH₃OH', deltaH: 725, mr: 32 },
  { name: 'Propana, C₃H₈', deltaH: 2220, mr: 44 },
];

export const FuelValueLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simulasi' | 'kalkulator' | 'faktor' | 'ujidiri'>('simulasi');
  const [selectedIds, setSelectedIds] = useState<string[]>(['etanol', 'petrol', 'hidrogen']);
  const [targetEnergyKJ, setTargetEnergyKJ] = useState<number>(1000);
  const [showAllReference, setShowAllReference] = useState(false);

  // Calculator state (Default: Oktana example from p. 137)
  const [calcDeltaH, setCalcDeltaH] = useState<string>('5500');
  const [calcMr, setCalcMr] = useState<string>('114');

  // Uji Diri 3.3 Quiz
  const [quizChoice, setQuizChoice] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const visibleFuels = showAllReference
    ? FUELS
    : FUELS.filter((f) => selectedIds.includes(f.id) || f.id === 'gas-asli');

  const toggleFuelSelection = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter((x) => x !== id) : prev;
      }
      return [...prev, id];
    });
    analytics.recordSimulationClick(SIM_ID);
  };

  const parsedDeltaH = Math.max(0, Number(calcDeltaH) || 0);
  const parsedMr = Math.max(0.1, Number(calcMr) || 1);
  const calculatedFuelValue = parsedDeltaH / parsedMr;

  const handleReset = () => {
    setSelectedIds(['etanol', 'petrol', 'hidrogen']);
    setTargetEnergyKJ(1000);
    setShowAllReference(false);
    setCalcDeltaH('5500');
    setCalcMr('114');
    setQuizChoice(null);
    setQuizSubmitted(false);
  };

  return (
    <div className="space-y-6 text-slate-800">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-200 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
              <span>KSSM Tingkatan 5 • Bab 3: Termokimia (3.3 Nilai Bahan Api)</span>
              <span className="px-2 py-0.5 bg-emerald-100 rounded-full">Jadual 3.5, 3.6 &amp; Rajah 3.15 (m.s. 137–138)</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Nilai Bahan Api: Etanol, Petrol &amp; Cecair Hidrogen
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              <strong>Nilai bahan api</strong> ialah kuantiti tenaga haba yang dibebaskan apabila{' '}
              <strong className="text-slate-800">1 g bahan api terbakar dengan lengkap</strong> dalam oksigen berlebihan (unit:{' '}
              <strong className="text-slate-800">kJ g⁻¹</strong>).
            </p>
          </div>
          <button
            onClick={handleReset}
            className="self-start md:self-center inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 shadow-sm transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Set Semula
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'simulasi', label: '1. Perbandingan Etanol, Petrol & Hidrogen' },
          { id: 'kalkulator', label: '2. Formula & Kalkulator Nilai Bahan Api' },
          { id: 'faktor', label: '3. Faktor Pemilihan Bahan Api (Rajah 3.15)' },
          { id: 'ujidiri', label: '4. Uji Diri 3.3 (Pengganti Petrol)' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setActiveTab(t.id as typeof activeTab);
              analytics.recordSimulationClick(SIM_ID);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
              activeTab === t.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: FUEL VALUE COMPARISON SIMULATOR */}
      {activeTab === 'simulasi' && (
        <div className="space-y-5">
          {/* Fuel selector & target energy slider */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <Fuel className="w-4 h-4 text-emerald-600" />
                  Bandingkan Bahan Api Utama (Jadual 3.5 &amp; 3.6)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pilih bahan api atau laraskan tenaga yang diperlukan untuk melihat jisim bahan api yang perlu dibakar.
                </p>
              </div>
              <button
                onClick={() => setShowAllReference((v) => !v)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer self-start"
              >
                {showAllReference ? 'Tunjukkan Bahan Api Utama Sahaja' : 'Papar Semua Jadual 3.5 (8 Bahan Api)'}
              </button>
            </div>

            {/* Selection Pills */}
            <div className="flex flex-wrap gap-2">
              {FUELS.filter((f) => f.category === 'Utama').map((f) => {
                const active = selectedIds.includes(f.id);
                return (
                  <button
                    key={f.id}
                    onClick={() => toggleFuelSelection(f.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      active
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {f.name} ({f.fuelValue} kJ g⁻¹)
                  </button>
                );
              })}
            </div>

            {/* Target Energy Slider */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Sasaran Tenaga Haba Diperlukan (Q):</span>
                <span className="text-sm text-indigo-700 font-mono">{targetEnergyKJ} kJ</span>
              </div>
              <input
                type="range"
                min={300}
                max={3000}
                step={100}
                value={targetEnergyKJ}
                onChange={(e) => {
                  setTargetEnergyKJ(Number(e.target.value));
                  analytics.recordSimulationClick(SIM_ID);
                }}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>300 kJ</span>
                <span>1500 kJ</span>
                <span>3000 kJ</span>
              </div>
            </div>
          </div>

          {/* Visual Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {visibleFuels.map((fuel) => {
              const barWidth = Math.min(100, (fuel.fuelValue / 143) * 100);
              const massNeeded = (targetEnergyKJ / fuel.fuelValue).toFixed(2);
              // Water temp rise if 1 g of fuel heats 500 g of water ideally: ΔT = Q / (500 * 4.2) * 1000
              const tempRise500g = ((fuel.fuelValue * 1000) / (500 * 4.2)).toFixed(1);

              return (
                <div
                  key={fuel.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="font-bold text-slate-900 text-sm">{fuel.name}</h5>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                          fuel.renewable
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {fuel.renewable ? 'Boleh Diperbaharui' : 'Fosil'}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-2xl font-extrabold text-slate-900">{fuel.fuelValue}</span>
                        <span className="text-xs font-semibold text-slate-500">kJ g⁻¹</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mt-1.5">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${barWidth}%`, backgroundColor: fuel.barColor }}
                        />
                      </div>
                    </div>

                    <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-indigo-800">Jisim untuk {targetEnergyKJ} kJ:</span>
                        <span className="font-bold text-indigo-950 font-mono">{massNeeded} g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-indigo-800">1 g panaskan 500 g air:</span>
                        <span className="font-bold text-indigo-950 font-mono">+{tempRise500g} °C</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                    <div>
                      <strong className="text-slate-800">Hasil Pembakaran:</strong> {fuel.products}
                    </div>
                    <div>
                      <strong className="text-slate-800">Nota KSSM:</strong> {fuel.notes}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: FORMULA & CALCULATOR */}
      {activeTab === 'kalkulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600" />
              Kalkulator Rumus Nilai Bahan Api
            </h4>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-1">
              <div className="text-xs font-bold uppercase text-emerald-800">Rumus KSSM (m.s. 137)</div>
              <div className="text-sm sm:text-base font-bold text-slate-900">
                Nilai Bahan Api (kJ g⁻¹) = Haba Pembakaran (kJ mol⁻¹) ÷ Jisim Molar (g mol⁻¹)
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-600">Pilih Contoh Pantas:</span>
              <div className="flex flex-wrap gap-2">
                {CALC_PRESETS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => {
                      setCalcDeltaH(String(p.deltaH));
                      setCalcMr(String(p.mr));
                      analytics.recordSimulationClick(SIM_ID);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition cursor-pointer"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Haba Pembakaran |ΔH| (kJ mol⁻¹)
                </label>
                <input
                  type="number"
                  value={calcDeltaH}
                  onChange={(e) => setCalcDeltaH(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Jisim Molar, Mᵣ (g mol⁻¹)
                </label>
                <input
                  type="number"
                  value={calcMr}
                  onChange={(e) => setCalcMr(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-center space-y-4">
            <h4 className="font-bold text-slate-900">Keputusan Pengiraan</h4>
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-2">
              <div className="font-mono text-sm text-slate-600">
                Nilai Bahan Api = {parsedDeltaH} kJ mol⁻¹ ÷ {parsedMr} g mol⁻¹
              </div>
              <div className="text-4xl font-extrabold text-emerald-700 font-mono">
                {calculatedFuelValue.toFixed(1)} kJ g⁻¹
              </div>
              <p className="text-xs text-slate-600 pt-1">
                Setiap <strong>1 g</strong> bahan api ini yang terbakar lengkap membebaskan{' '}
                <strong>{calculatedFuelValue.toFixed(1)} kJ</strong> tenaga haba.
              </p>
            </div>

            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
              <strong>Contoh Penyelesaian Oktana (Buku Teks m.s. 137):</strong> Pembakaran lengkap oktana, C₈H₁₈
              membebaskan 5500 kJ mol⁻¹ dengan jisim molar = 8(12) + 18(1) = 114 g mol⁻¹. Maka nilai bahan api = 5500 ÷ 114 ={' '}
              <strong>48.2 kJ g⁻¹</strong>.
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RAJAH 3.15 FACTORS */}
      {activeTab === 'faktor' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="font-bold text-slate-900 text-base">
              Faktor Pemilihan Bahan Api yang Sesuai (Rajah 3.15, m.s. 138)
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              Pemilihan bahan api bukan bergantung kepada nilai bahan api tertinggi semata-mata, tetapi memerlukan penilaian menyeluruh terhadap 4 faktor utama:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-orange-900 text-sm">
                <Flame className="w-4 h-4 text-orange-600" />
                1. Nilai Bahan Api (kJ g⁻¹)
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Bahan api dengan nilai bahan api lebih tinggi (seperti hidrogen 143 kJ g⁻¹ atau gas asli 50 kJ g⁻¹)
                membebaskan lebih banyak tenaga haba bagi setiap gram bahan yang dibakar.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                <Coins className="w-4 h-4 text-amber-600" />
                2. Kos Bahan Api &amp; Penyimpanan
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Walaupun gas hidrogen membebaskan tenaga sangat tinggi, kos penghasilan, pemampatan (ke bentuk cecair) dan tangki penyimpanan kalis letupan adalah jauh lebih mahal berbanding petrol atau gas asli.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-blue-900 text-sm">
                <Globe className="w-4 h-4 text-blue-600" />
                3. Kebolehdapatan dan Sumber Bahan
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Petrol dan gas asli mudah diperoleh daripada penyulingan berperingkat petroleum tetapi merupakan sumber tidak boleh diperbaharui. Etanol boleh dihasilkan berterusan daripada biojisim tumbuhan.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                <Leaf className="w-4 h-4 text-emerald-600" />
                4. Kesan Bahan Api terhadap Alam Sekitar
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Hidrogen menghasilkan air tulen (H₂O) tanpa gas rumah hijau atau jelaga. Etanol terbakar lebih bersih daripada petrol dan karbon dioksida yang dibebaskan diserap semula oleh tumbuhan semasa fotosintesis.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: UJI DIRI 3.3 */}
      {activeTab === 'ujidiri' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            Uji Diri 3.3 &amp; Penilaian Kendiri (Buku Teks m.s. 138)
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <p className="text-sm font-semibold text-slate-900">
              Seorang jurutera merancang kenderaan masa depan bebas pencemaran karbon dioksida (CO₂) dan jelaga dengan tenaga per gram yang tertinggi. Berdasarkan Jadual 3.6, bahan api manakah yang paling menepati kriteria tersebut, dan apakah cabaran utamanya?
            </p>

            <div className="space-y-2">
              {[
                {
                  id: 'a',
                  text: 'Etanol (30 kJ g⁻¹) — kerana tidak membebaskan gas CO₂ langsung apabila dibakar',
                },
                {
                  id: 'b',
                  text: 'Gas asli (50 kJ g⁻¹) — kerana mempunyai nilai bahan api paling tinggi antara semua bahan api',
                },
                {
                  id: 'c',
                  text: 'Cecair / Gas Hidrogen (143 kJ g⁻¹) — kerana hanya menghasilkan air (H₂O), namun kos pengeluaran tinggi serta mudah meletup dan sukar disimpan',
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    if (!quizSubmitted) setQuizChoice(opt.id);
                  }}
                  className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition cursor-pointer flex items-center justify-between ${
                    quizSubmitted
                      ? opt.id === 'c'
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold'
                        : quizChoice === opt.id
                        ? 'bg-red-50 border-red-400 text-red-900'
                        : 'bg-white border-slate-200 text-slate-600'
                      : quizChoice === opt.id
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-semibold'
                      : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <span>{opt.text}</span>
                  {quizSubmitted && opt.id === 'c' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                </button>
              ))}
            </div>

            {!quizSubmitted ? (
              <button
                onClick={() => {
                  setQuizSubmitted(true);
                  if (quizChoice === 'c') {
                    analytics.recordSimulationCompleted(SIM_ID);
                  }
                }}
                disabled={!quizChoice}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer"
              >
                Semak Jawapan
              </button>
            ) : (
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-emerald-600" />
                  Jawapan &amp; Perbincangan KSSM:
                </div>
                <p>
                  <strong>Cecair / Gas Hidrogen</strong> mempunyai nilai bahan api tertinggi (<strong>143 kJ g⁻¹</strong>) dan pembakaran lengkapnya (2H₂ + O₂ → 2H₂O) hanya menghasilkan air tanpa CO₂ atau jelaga. Walau bagaimanapun, dalam konteks kenderaan harian masa kini, <strong>etanol</strong> (biofuel boleh diperbaharui) atau <strong>gas asli</strong> sering dipilih kerana lebih selamat, mudah disimpan dalam tangki biasa, dan lebih menjimatkan kos.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
