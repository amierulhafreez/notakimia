export interface PeriodicElement {
  number: number;
  symbol: string;
  name: string;
  nameMalay: string;
  ram: number;
  group: number;
  period: number;
  block: string;
  electronConfig: string;
  valenceElectrons: number;
  category: 'alkali' | 'alkali-earth' | 'transition' | 'basic-metal' | 'metalloid' | 'nonmetal' | 'halogen' | 'noble-gas';
}

export const PERIODIC_ELEMENTS: PeriodicElement[] = [
  // Kala 1
  { number: 1, symbol: 'H', name: 'Hydrogen', nameMalay: 'Hidrogen', ram: 1, group: 1, period: 1, block: 's', electronConfig: '1', valenceElectrons: 1, category: 'nonmetal' },
  { number: 2, symbol: 'He', name: 'Helium', nameMalay: 'Helium', ram: 4, group: 18, period: 1, block: 's', electronConfig: '2', valenceElectrons: 2, category: 'noble-gas' },

  // Kala 2
  { number: 3, symbol: 'Li', name: 'Lithium', nameMalay: 'Litium', ram: 7, group: 1, period: 2, block: 's', electronConfig: '2.1', valenceElectrons: 1, category: 'alkali' },
  { number: 4, symbol: 'Be', name: 'Beryllium', nameMalay: 'Berilium', ram: 9, group: 2, period: 2, block: 's', electronConfig: '2.2', valenceElectrons: 2, category: 'alkali-earth' },
  { number: 5, symbol: 'B', name: 'Boron', nameMalay: 'Boron', ram: 11, group: 13, period: 2, block: 'p', electronConfig: '2.3', valenceElectrons: 3, category: 'metalloid' },
  { number: 6, symbol: 'C', name: 'Carbon', nameMalay: 'Karbon', ram: 12, group: 14, period: 2, block: 'p', electronConfig: '2.4', valenceElectrons: 4, category: 'nonmetal' },
  { number: 7, symbol: 'N', name: 'Nitrogen', nameMalay: 'Nitrogen', ram: 14, group: 15, period: 2, block: 'p', electronConfig: '2.5', valenceElectrons: 5, category: 'nonmetal' },
  { number: 8, symbol: 'O', name: 'Oxygen', nameMalay: 'Oksigen', ram: 16, group: 16, period: 2, block: 'p', electronConfig: '2.6', valenceElectrons: 6, category: 'nonmetal' },
  { number: 9, symbol: 'F', name: 'Fluorine', nameMalay: 'Fluorin', ram: 19, group: 17, period: 2, block: 'p', electronConfig: '2.7', valenceElectrons: 7, category: 'halogen' },
  { number: 10, symbol: 'Ne', name: 'Neon', nameMalay: 'Neon', ram: 20, group: 18, period: 2, block: 'p', electronConfig: '2.8', valenceElectrons: 8, category: 'noble-gas' },

  // Kala 3
  { number: 11, symbol: 'Na', name: 'Sodium', nameMalay: 'Natrium', ram: 23, group: 1, period: 3, block: 's', electronConfig: '2.8.1', valenceElectrons: 1, category: 'alkali' },
  { number: 12, symbol: 'Mg', name: 'Magnesium', nameMalay: 'Magnesium', ram: 24, group: 2, period: 3, block: 's', electronConfig: '2.8.2', valenceElectrons: 2, category: 'alkali-earth' },
  { number: 13, symbol: 'Al', name: 'Aluminium', nameMalay: 'Aluminium', ram: 27, group: 13, period: 3, block: 'p', electronConfig: '2.8.3', valenceElectrons: 3, category: 'basic-metal' },
  { number: 14, symbol: 'Si', name: 'Silicon', nameMalay: 'Silikon', ram: 28, group: 14, period: 3, block: 'p', electronConfig: '2.8.4', valenceElectrons: 4, category: 'metalloid' },
  { number: 15, symbol: 'P', name: 'Phosphorus', nameMalay: 'Fosforus', ram: 31, group: 15, period: 3, block: 'p', electronConfig: '2.8.5', valenceElectrons: 5, category: 'nonmetal' },
  { number: 16, symbol: 'S', name: 'Sulfur', nameMalay: 'Sulfur', ram: 32, group: 16, period: 3, block: 'p', electronConfig: '2.8.6', valenceElectrons: 6, category: 'nonmetal' },
  { number: 17, symbol: 'Cl', name: 'Chlorine', nameMalay: 'Klorin', ram: 35.5, group: 17, period: 3, block: 'p', electronConfig: '2.8.7', valenceElectrons: 7, category: 'halogen' },
  { number: 18, symbol: 'Ar', name: 'Argon', nameMalay: 'Argon', ram: 40, group: 18, period: 3, block: 'p', electronConfig: '2.8.8', valenceElectrons: 8, category: 'noble-gas' },

  // Kala 4 (Lengkap 18 Kumpulan)
  { number: 19, symbol: 'K', name: 'Potassium', nameMalay: 'Kalium', ram: 39, group: 1, period: 4, block: 's', electronConfig: '2.8.8.1', valenceElectrons: 1, category: 'alkali' },
  { number: 20, symbol: 'Ca', name: 'Calcium', nameMalay: 'Kalsium', ram: 40, group: 2, period: 4, block: 's', electronConfig: '2.8.8.2', valenceElectrons: 2, category: 'alkali-earth' },
  { number: 21, symbol: 'Sc', name: 'Scandium', nameMalay: 'Skandium', ram: 45, group: 3, period: 4, block: 'd', electronConfig: '2.8.9.2', valenceElectrons: 2, category: 'transition' },
  { number: 22, symbol: 'Ti', name: 'Titanium', nameMalay: 'Titanium', ram: 48, group: 4, period: 4, block: 'd', electronConfig: '2.8.10.2', valenceElectrons: 2, category: 'transition' },
  { number: 23, symbol: 'V', name: 'Vanadium', nameMalay: 'Vanadium', ram: 51, group: 5, period: 4, block: 'd', electronConfig: '2.8.11.2', valenceElectrons: 2, category: 'transition' },
  { number: 24, symbol: 'Cr', name: 'Chromium', nameMalay: 'Kromium', ram: 52, group: 6, period: 4, block: 'd', electronConfig: '2.8.13.1', valenceElectrons: 1, category: 'transition' },
  { number: 25, symbol: 'Mn', name: 'Manganese', nameMalay: 'Mangan', ram: 55, group: 7, period: 4, block: 'd', electronConfig: '2.8.13.2', valenceElectrons: 2, category: 'transition' },
  { number: 26, symbol: 'Fe', name: 'Iron', nameMalay: 'Ferum (Besi)', ram: 56, group: 8, period: 4, block: 'd', electronConfig: '2.8.14.2', valenceElectrons: 2, category: 'transition' },
  { number: 27, symbol: 'Co', name: 'Cobalt', nameMalay: 'Kobalt', ram: 59, group: 9, period: 4, block: 'd', electronConfig: '2.8.15.2', valenceElectrons: 2, category: 'transition' },
  { number: 28, symbol: 'Ni', name: 'Nickel', nameMalay: 'Nikel', ram: 59, group: 10, period: 4, block: 'd', electronConfig: '2.8.16.2', valenceElectrons: 2, category: 'transition' },
  { number: 29, symbol: 'Cu', name: 'Copper', nameMalay: 'Kuprum', ram: 64, group: 11, period: 4, block: 'd', electronConfig: '2.8.18.1', valenceElectrons: 1, category: 'transition' },
  { number: 30, symbol: 'Zn', name: 'Zinc', nameMalay: 'Zink', ram: 65, group: 12, period: 4, block: 'd', electronConfig: '2.8.18.2', valenceElectrons: 2, category: 'transition' },
  { number: 31, symbol: 'Ga', name: 'Gallium', nameMalay: 'Galium', ram: 70, group: 13, period: 4, block: 'p', electronConfig: '2.8.18.3', valenceElectrons: 3, category: 'basic-metal' },
  { number: 32, symbol: 'Ge', name: 'Germanium', nameMalay: 'Germanium', ram: 73, group: 14, period: 4, block: 'p', electronConfig: '2.8.18.4', valenceElectrons: 4, category: 'metalloid' },
  { number: 33, symbol: 'As', name: 'Arsenic', nameMalay: 'Arsenik', ram: 75, group: 15, period: 4, block: 'p', electronConfig: '2.8.18.5', valenceElectrons: 5, category: 'metalloid' },
  { number: 34, symbol: 'Se', name: 'Selenium', nameMalay: 'Selenium', ram: 79, group: 16, period: 4, block: 'p', electronConfig: '2.8.18.6', valenceElectrons: 6, category: 'nonmetal' },
  { number: 35, symbol: 'Br', name: 'Bromine', nameMalay: 'Bromin', ram: 80, group: 17, period: 4, block: 'p', electronConfig: '2.8.18.7', valenceElectrons: 7, category: 'halogen' },
  { number: 36, symbol: 'Kr', name: 'Krypton', nameMalay: 'Kripton', ram: 84, group: 18, period: 4, block: 'p', electronConfig: '2.8.18.8', valenceElectrons: 8, category: 'noble-gas' },

  // Kala 5 (Pilihan Silibus KSSM)
  { number: 37, symbol: 'Rb', name: 'Rubidium', nameMalay: 'Rubidium', ram: 85.5, group: 1, period: 5, block: 's', electronConfig: '2.8.18.8.1', valenceElectrons: 1, category: 'alkali' },
  { number: 38, symbol: 'Sr', name: 'Strontium', nameMalay: 'Strontium', ram: 88, group: 2, period: 5, block: 's', electronConfig: '2.8.18.8.2', valenceElectrons: 2, category: 'alkali-earth' },
  { number: 47, symbol: 'Ag', name: 'Silver', nameMalay: 'Argentum (Perak)', ram: 108, group: 11, period: 5, block: 'd', electronConfig: '2.8.18.18.1', valenceElectrons: 1, category: 'transition' },
  { number: 50, symbol: 'Sn', name: 'Tin', nameMalay: 'Stanum (Timah)', ram: 119, group: 14, period: 5, block: 'p', electronConfig: '2.8.18.18.4', valenceElectrons: 4, category: 'basic-metal' },
  { number: 53, symbol: 'I', name: 'Iodine', nameMalay: 'Iodin', ram: 127, group: 17, period: 5, block: 'p', electronConfig: '2.8.18.18.7', valenceElectrons: 7, category: 'halogen' },
  { number: 54, symbol: 'Xe', name: 'Xenon', nameMalay: 'Xenon', ram: 131, group: 18, period: 5, block: 'p', electronConfig: '2.8.18.18.8', valenceElectrons: 8, category: 'noble-gas' },

  // Kala 6 (Pilihan Silibus KSSM)
  { number: 55, symbol: 'Cs', name: 'Caesium', nameMalay: 'Sesium', ram: 133, group: 1, period: 6, block: 's', electronConfig: '2.8.18.18.8.1', valenceElectrons: 1, category: 'alkali' },
  { number: 56, symbol: 'Ba', name: 'Barium', nameMalay: 'Barium', ram: 137, group: 2, period: 6, block: 's', electronConfig: '2.8.18.18.8.2', valenceElectrons: 2, category: 'alkali-earth' },
  { number: 79, symbol: 'Au', name: 'Gold', nameMalay: 'Aurum (Emas)', ram: 197, group: 11, period: 6, block: 'd', electronConfig: '2.8.18.32.18.1', valenceElectrons: 1, category: 'transition' },
  { number: 80, symbol: 'Hg', name: 'Mercury', nameMalay: 'Merkuri (Raksa)', ram: 201, group: 12, period: 6, block: 'd', electronConfig: '2.8.18.32.18.2', valenceElectrons: 2, category: 'transition' },
  { number: 82, symbol: 'Pb', name: 'Lead', nameMalay: 'Plumbum', ram: 207, group: 14, period: 6, block: 'p', electronConfig: '2.8.18.32.18.4', valenceElectrons: 4, category: 'basic-metal' }
];

export interface StandardElectrodeItem {
  halfEquation: string;
  e0: number; // in Volts
  oxidizedSpecies: string;
  reducedSpecies: string;
}

export const STANDARD_ELECTRODE_POTENTIALS: StandardElectrodeItem[] = [
  { halfEquation: 'Li⁺ + e⁻ ⇌ Li', e0: -3.04, oxidizedSpecies: 'Li⁺', reducedSpecies: 'Li' },
  { halfEquation: 'K⁺ + e⁻ ⇌ K', e0: -2.92, oxidizedSpecies: 'K⁺', reducedSpecies: 'K' },
  { halfEquation: 'Ca²⁺ + 2e⁻ ⇌ Ca', e0: -2.87, oxidizedSpecies: 'Ca²⁺', reducedSpecies: 'Ca' },
  { halfEquation: 'Na⁺ + e⁻ ⇌ Na', e0: -2.71, oxidizedSpecies: 'Na⁺', reducedSpecies: 'Na' },
  { halfEquation: 'Mg²⁺ + 2e⁻ ⇌ Mg', e0: -2.38, oxidizedSpecies: 'Mg²⁺', reducedSpecies: 'Mg' },
  { halfEquation: 'Al³⁺ + 3e⁻ ⇌ Al', e0: -1.66, oxidizedSpecies: 'Al³⁺', reducedSpecies: 'Al' },
  { halfEquation: 'Mn²⁺ + 2e⁻ ⇌ Mn', e0: -1.18, oxidizedSpecies: 'Mn²⁺', reducedSpecies: 'Mn' },
  { halfEquation: 'Zn²⁺ + 2e⁻ ⇌ Zn', e0: -0.76, oxidizedSpecies: 'Zn²⁺', reducedSpecies: 'Zn' },
  { halfEquation: 'Cr³⁺ + 3e⁻ ⇌ Cr', e0: -0.74, oxidizedSpecies: 'Cr³⁺', reducedSpecies: 'Cr' },
  { halfEquation: 'Fe²⁺ + 2e⁻ ⇌ Fe', e0: -0.44, oxidizedSpecies: 'Fe²⁺', reducedSpecies: 'Fe' },
  { halfEquation: 'Ni²⁺ + 2e⁻ ⇌ Ni', e0: -0.25, oxidizedSpecies: 'Ni²⁺', reducedSpecies: 'Ni' },
  { halfEquation: 'Sn²⁺ + 2e⁻ ⇌ Sn', e0: -0.14, oxidizedSpecies: 'Sn²⁺', reducedSpecies: 'Sn' },
  { halfEquation: 'Pb²⁺ + 2e⁻ ⇌ Pb', e0: -0.13, oxidizedSpecies: 'Pb²⁺', reducedSpecies: 'Pb' },
  { halfEquation: '2H⁺ + 2e⁻ ⇌ H₂ (Rujukan Piawai / SHE)', e0: 0.00, oxidizedSpecies: 'H⁺', reducedSpecies: 'H₂' },
  { halfEquation: 'Cu²⁺ + 2e⁻ ⇌ Cu', e0: 0.34, oxidizedSpecies: 'Cu²⁺', reducedSpecies: 'Cu' },
  { halfEquation: 'O₂ + 2H₂O + 4e⁻ ⇌ 4OH⁻', e0: 0.40, oxidizedSpecies: 'O₂ / H₂O', reducedSpecies: 'OH⁻' },
  { halfEquation: 'I₂ + 2e⁻ ⇌ 2I⁻', e0: 0.54, oxidizedSpecies: 'I₂', reducedSpecies: 'I⁻' },
  { halfEquation: 'Fe³⁺ + e⁻ ⇌ Fe²⁺', e0: 0.77, oxidizedSpecies: 'Fe³⁺', reducedSpecies: 'Fe²⁺' },
  { halfEquation: 'Ag⁺ + e⁻ ⇌ Ag', e0: 0.80, oxidizedSpecies: 'Ag⁺', reducedSpecies: 'Ag' },
  { halfEquation: 'NO₃⁻ + 4H⁺ + 3e⁻ ⇌ NO + 2H₂O', e0: 0.96, oxidizedSpecies: 'NO₃⁻ / H⁺', reducedSpecies: 'NO' },
  { halfEquation: 'Br₂ + 2e⁻ ⇌ 2Br⁻', e0: 1.07, oxidizedSpecies: 'Br₂', reducedSpecies: 'Br⁻' },
  { halfEquation: 'O₂ + 4H⁺ + 4e⁻ ⇌ 2H₂O', e0: 1.23, oxidizedSpecies: 'O₂ / H⁺', reducedSpecies: 'H₂O' },
  { halfEquation: 'Cr₂O₇²⁻ + 14H⁺ + 6e⁻ ⇌ 2Cr³⁺ + 7H₂O', e0: 1.33, oxidizedSpecies: 'Cr₂O₇²⁻ / H⁺', reducedSpecies: 'Cr³⁺' },
  { halfEquation: 'Cl₂ + 2e⁻ ⇌ 2Cl⁻', e0: 1.36, oxidizedSpecies: 'Cl₂', reducedSpecies: 'Cl⁻' },
  { halfEquation: 'PbO₂ + 4H⁺ + 2e⁻ ⇌ Pb²⁺ + 2H₂O', e0: 1.46, oxidizedSpecies: 'PbO₂ / H⁺', reducedSpecies: 'Pb²⁺' },
  { halfEquation: 'Au³⁺ + 3e⁻ ⇌ Au', e0: 1.50, oxidizedSpecies: 'Au³⁺', reducedSpecies: 'Au' },
  { halfEquation: 'MnO₄⁻ + 8H⁺ + 5e⁻ ⇌ Mn²⁺ + 4H₂O', e0: 1.51, oxidizedSpecies: 'MnO₄⁻ / H⁺', reducedSpecies: 'Mn²⁺' },
  { halfEquation: 'H₂O₂ + 2H⁺ + 2e⁻ ⇌ 2H₂O', e0: 1.77, oxidizedSpecies: 'H₂O₂ / H⁺', reducedSpecies: 'H₂O' },
  { halfEquation: 'S₂O₈²⁻ + 2e⁻ ⇌ 2SO₄²⁻', e0: 2.01, oxidizedSpecies: 'S₂O₈²⁻', reducedSpecies: 'SO₄²⁻' },
  { halfEquation: 'F₂ + 2e⁻ ⇌ 2F⁻', e0: 2.87, oxidizedSpecies: 'F₂', reducedSpecies: 'F⁻' },
];

export interface QualitativeCationTest {
  cation: string;
  name: string;
  naohFew: string;
  naohExcess: string;
  nh3Few: string;
  nh3Excess: string;
  confirmatory: string;
  precipitateColor: 'white' | 'blue' | 'green' | 'brown' | 'none';
}

export const CATION_TESTS: QualitativeCationTest[] = [
  {
    cation: 'Ca²⁺',
    name: 'Kalsium',
    naohFew: 'Mendakan putih terbentuk',
    naohExcess: 'Mendakan putih TIDAK larut dalam NaOH berlebihan',
    nh3Few: 'Tiada mendakan terbentuk',
    nh3Excess: 'Tiada perubahan (kekal tiada mendakan)',
    confirmatory: 'Uji dengan larutan natrium sulfat, Na₂SO₄ / asid sulfurik menghasilkan mendakan putih CaSO₄.',
    precipitateColor: 'white'
  },
  {
    cation: 'Mg²⁺',
    name: 'Magnesium',
    naohFew: 'Mendakan putih terbentuk',
    naohExcess: 'Mendakan putih TIDAK larut dalam NaOH berlebihan',
    nh3Few: 'Mendakan putih terbentuk',
    nh3Excess: 'Mendakan putih TIDAK larut dalam NH₃ berlebihan',
    confirmatory: 'Reagen Titan Yellow menghasilkan mendakan merah jambu dalam medium beralkali.',
    precipitateColor: 'white'
  },
  {
    cation: 'Al³⁺',
    name: 'Aluminium',
    naohFew: 'Mendakan putih terbentuk',
    naohExcess: 'Mendakan putih LARUT dalam NaOH berlebihan menghasilkan larutan tanpa warna',
    nh3Few: 'Mendakan putih terbentuk',
    nh3Excess: 'Mendakan putih TIDAK larut dalam NH₃ berlebihan',
    confirmatory: 'Uji dengan larutan kalium iodida, KI: tiada perubahan (membezakan Al³⁺ daripada Pb²⁺).',
    precipitateColor: 'white'
  },
  {
    cation: 'Pb²⁺',
    name: 'Plumbum(II)',
    naohFew: 'Mendakan putih terbentuk',
    naohExcess: 'Mendakan putih LARUT dalam NaOH berlebihan menghasilkan larutan tanpa warna',
    nh3Few: 'Mendakan putih terbentuk',
    nh3Excess: 'Mendakan putih TIDAK larut dalam NH₃ berlebihan',
    confirmatory: 'Tambah larutan Kalium Iodida, KI: Mendakan KUNING PbI₂ terbentuk. Larut apabila dipanaskan menjadi larutan tanpa warna, dan mendak semula sebagai kristal kuning keemasan apabila disejukkan.',
    precipitateColor: 'white'
  },
  {
    cation: 'Zn²⁺',
    name: 'Zink',
    naohFew: 'Mendakan putih terbentuk',
    naohExcess: 'Mendakan putih LARUT dalam NaOH berlebihan menghasilkan larutan tanpa warna',
    nh3Few: 'Mendakan putih terbentuk',
    nh3Excess: 'Mendakan putih LARUT dalam NH₃ berlebihan menghasilkan larutan tanpa warna',
    confirmatory: 'Satu-satunya kation dengan mendakan putih yang larut dalam KEDUA-DUA NaOH berlebihan dan NH₃ berlebihan!',
    precipitateColor: 'white'
  },
  {
    cation: 'Fe²⁺',
    name: 'Ferum(II)',
    naohFew: 'Mendakan HIJAU terbentuk',
    naohExcess: 'Mendakan hijau TIDAK larut dalam NaOH berlebihan (bertukar perang pada permukaan kerana teroksida oleh udara)',
    nh3Few: 'Mendakan HIJAU terbentuk',
    nh3Excess: 'Mendakan hijau TIDAK larut dalam NH₃ berlebihan',
    confirmatory: 'Tambah larutan Kalium Heksasianoferat(III), K₃[Fe(CN)₆]: Mendakan BIRU TUA terbentuk. / Tambah KSCN: Tiada perubahan ketara (merah darah sangat pudar).',
    precipitateColor: 'green'
  },
  {
    cation: 'Fe³⁺',
    name: 'Ferum(III)',
    naohFew: 'Mendakan PERANG terbentuk',
    naohExcess: 'Mendakan perang TIDAK larut dalam NaOH berlebihan',
    nh3Few: 'Mendakan PERANG terbentuk',
    nh3Excess: 'Mendakan perang TIDAK larut dalam NH₃ berlebihan',
    confirmatory: 'Tambah larutan Kalium Tiosianat, KSCN: Larutan MERAH DARAH pekat serta-merta! / Tambah Kalium Heksasianoferat(II), K₄[Fe(CN)₆]: Mendakan BIRU TUA (Prussian Blue).',
    precipitateColor: 'brown'
  },
  {
    cation: 'Cu²⁺',
    name: 'Kuprum(II)',
    naohFew: 'Mendakan BIRU terbentuk',
    naohExcess: 'Mendakan biru TIDAK larut dalam NaOH berlebihan',
    nh3Few: 'Mendakan BIRU terbentuk',
    nh3Excess: 'Mendakan biru LARUT dalam NH₃ berlebihan membentuk larutan BIRU TUA yang amat pekat [Cu(NH₃)₄]²⁺',
    confirmatory: 'Penambahan NH₃ berlebihan menghasilkan larutan biru tua khas kation kuprum(II).',
    precipitateColor: 'blue'
  },
  {
    cation: 'NH₄⁺',
    name: 'Ammonium',
    naohFew: 'Tiada mendakan terbentuk',
    naohExcess: 'Tiada mendakan. Apabila campuran dipanaskan, gas ammonia terbebas (berbau sengit & menukarkan kertas litmus merah lembap ke biru).',
    nh3Few: 'Tiada mendakan terbentuk',
    nh3Excess: 'Tiada perubahan',
    confirmatory: 'Tambah Reagen Nessler: Mendakan PERANG terbentuk.',
    precipitateColor: 'none'
  },
];

export interface AnionTestItem {
  anion: string;
  name: string;
  procedure: string;
  observation: string;
  chemicalEquation: string;
}

export const ANION_TESTS: AnionTestItem[] = [
  {
    anion: 'CO₃²⁻',
    name: 'Ion Karbonat',
    procedure: 'Tambah 2 cm³ asid hidroklorik cair, HCl (atau mana-mana asid cair). Alirkan gas terbebas ke dalam tabung uji berisi air kapur.',
    observation: 'Pembuakan berlaku. Gas yang mengeruhkan air kapur dibebaskan (gas karbon dioksida, CO₂).',
    chemicalEquation: 'CO₃²⁻(ak) + 2H⁺(ak) → CO₂(g) + H₂O(c) ; Ca(OH)₂(ak) + CO₂(g) → CaCO₃(p) + H₂O(c)'
  },
  {
    anion: 'Cl⁻',
    name: 'Ion Klorida',
    procedure: 'Tambah 2 cm³ asid nitrik cair, HNO₃ diikuti dengan 2 cm³ larutan argentum nitrat, AgNO₃.',
    observation: 'Mendakan PUTIH terbentuk (mendakan argentum klorida, AgCl). Mendakan tidak larut dalam asid nitrik tetapi larut dalam larutan ammonia akueus.',
    chemicalEquation: 'Ag⁺(ak) + Cl⁻(ak) → AgCl(p) [Mendakan Putih]'
  },
  {
    anion: 'SO₄²⁻',
    name: 'Ion Sulfat',
    procedure: 'Tambah 2 cm³ asid hidroklorik cair, HCl (atau HNO₃) diikuti dengan 2 cm³ larutan barium klorida, BaCl₂ (atau Ba(NO₃)₂).',
    observation: 'Mendakan PUTIH terbentuk (mendakan barium sulfat, BaSO₄) yang tidak larut dalam asid hidroklorik.',
    chemicalEquation: 'Ba²⁺(ak) + SO₄²⁻(ak) → BaSO₄(p) [Mendakan Putih]'
  },
  {
    anion: 'NO₃⁻',
    name: 'Ion Nitrat',
    procedure: 'Tambah 2 cm³ asid sulfurik cair, H₂SO₄ diikuti dengan 2 cm³ larutan ferum(II) sulfat, FeSO₄. Goncang rata. Condongkan tabung uji dan titiskan beberapa titis asid sulfurik PEKAT, H₂SO₄ secara perlahan melalui dinding tabung uji tanpa digoncang.',
    observation: 'CINCIN PERANG terbentuk pada sempadan antara dua lapisan cecair (kompleks nitrosilferum(II), [Fe(H₂O)₅(NO)]²⁺).',
    chemicalEquation: 'NO₃⁻ + 3Fe²⁺ + 4H⁺ → 3Fe³⁺ + NO + 2H₂O ; Fe²⁺ + NO → [Fe(NO)]²⁺ (Cincin Perang)'
  },
];

export interface GasTestItem {
  gas: string;
  name: string;
  method: string;
  observation: string;
  identity: string;
}

export const GAS_TESTS: GasTestItem[] = [
  { gas: 'O₂', name: 'Oksigen', method: 'Masukkan kayu uji berbara ke dalam mulut tabung uji', observation: 'Kayu uji berbara menyala semula', identity: 'Gas oksigen hadir' },
  { gas: 'H₂', name: 'Hidrogen', method: 'Dekatkan kayu uji bernyala ke mulut tabung uji', observation: 'Bunyi "pop" kedengaran', identity: 'Gas hidrogen hadir' },
  { gas: 'CO₂', name: 'Karbon Dioksida', method: 'Salurkan gas ke dalam air kapur menggunakan salur penghantar', observation: 'Air kapur menjadi keruh', identity: 'Gas karbon dioksida hadir' },
  { gas: 'NH₃', name: 'Ammonia', method: 'Dekatkan kertas litmus merah lembap ke mulut tabung uji', observation: 'Kertas litmus merah lembap bertukar menjadi biru (gas beralkali & berbau sengit)', identity: 'Gas ammonia hadir' },
  { gas: 'Cl₂', name: 'Klorin', method: 'Dekatkan kertas litmus biru lembap ke mulut tabung uji', observation: 'Kertas litmus biru lembap bertukar merah dan kemudian dilunturkan menjadi putih (gas kuning kehijauan)', identity: 'Gas klorin hadir' },
  { gas: 'HCl', name: 'Hidrogen Klorida', method: 'Celup rod kaca ke dalam larutan ammonia pekat dan dekatkan ke mulut tabung uji', observation: 'Wasap putih tebal ammonium klorida, NH₄Cl terbentuk', identity: 'Gas hidrogen klorida hadir' },
  { gas: 'SO₂', name: 'Sulfur Dioksida', method: 'Alirkan gas ke dalam larutan kalium manganat(VII) berasid, KMnO₄ (atau kalium dikromat(VI) berasid, K₂Cr₂O₇)', observation: 'Warna ungu KMnO₄ dinyahwarnakan menjadi tanpa warna / Warna jingga K₂Cr₂O₇ bertukar hijau (berbau tengik sulfur terbakar)', identity: 'Gas sulfur dioksida hadir' },
  { gas: 'NO₂', name: 'Nitrogen Dioksida', method: 'Perhatikan warna gas dan dekatkan kertas litmus biru lembap', observation: 'Gas berwarna PERANG dengan bau sengit terbebas; kertas litmus biru lembap bertukar menjadi merah', identity: 'Gas nitrogen dioksida hadir' },
];

export interface FormulaItem {
  id: string;
  name: string;
  syllabus: string;
  unit?: string;
  formulaSearch: string;
  renderType: 'fraction' | 'titration' | 'linear' | 'voltage' | 'heat';
  lhs?: string;
  numerator?: string;
  denominator?: string;
  symbolicLhs?: string;
  symbolicNum?: string;
  symbolicDen?: string;
  linearEquation?: string;
  subText?: string;
  variables: string[];
  tips?: string;
}

export interface FormulaGroup {
  category: string;
  formulas: FormulaItem[];
}

export const IMPORTANT_FORMULAE: FormulaGroup[] = [
  {
    category: '1. Konsep Mol & Stoikiometri (Tingkatan 4 Bab 3)',
    formulas: [
      {
        id: 'mol-zarah',
        name: 'Bilangan Mol daripada Bilangan Zarah',
        syllabus: 'T4 Bab 3 (m/s 50)',
        formulaSearch: 'n = N / N_A bilangan mol zarah avogadro',
        renderType: 'fraction',
        lhs: 'Bilangan mol, n',
        numerator: 'Bilangan zarah (N)',
        denominator: 'Pemalar Avogadro (N_A)',
        symbolicLhs: 'n',
        symbolicNum: 'N',
        symbolicDen: 'N_A',
        variables: [
          'n = bilangan mol (mol)',
          'N = bilangan zarah (atom, molekul, atau unit formula / ion)',
          'N_A = Pemalar Avogadro (6.02 × 10²³ mol⁻¹)'
        ],
        tips: 'Kenal pasti zarah: unsur logam/gas nadir = atom; sebatian kovalen = molekul; sebatian ion = ion.'
      },
      {
        id: 'mol-jisim',
        name: 'Bilangan Mol daripada Jisim',
        syllabus: 'T4 Bab 3 (m/s 52)',
        formulaSearch: 'n = m / M jisim molar JAR JMR',
        renderType: 'fraction',
        lhs: 'Bilangan mol, n',
        numerator: 'Jisim bahan (g)',
        denominator: 'Jisim molar (g mol⁻¹)',
        symbolicLhs: 'n',
        symbolicNum: 'm',
        symbolicDen: 'JMR (atau JAR)',
        variables: [
          'n = bilangan mol (mol)',
          'm = jisim bahan dalam gram (g)',
          'Jisim Molar = jisim satu mol bahan (nilai berangka sama dengan JAR / JMR, unit: g mol⁻¹)'
        ],
        tips: 'Wajib tukar unit jisim kepada gram (g). 1 kg = 1,000 g.'
      },
      {
        id: 'mol-gas',
        name: 'Bilangan Mol daripada Isi Padu Gas',
        syllabus: 'T4 Bab 3 (m/s 55)',
        unit: 'dm³ atau cm³',
        formulaSearch: 'n = V / V_m isi padu molar gas STP keadaan bilik',
        renderType: 'fraction',
        lhs: 'Bilangan mol, n',
        numerator: 'Isi padu gas (dm³)',
        denominator: 'Isi padu molar, V_m (dm³ mol⁻¹)',
        symbolicLhs: 'n',
        symbolicNum: 'V',
        symbolicDen: 'V_m',
        variables: [
          'n = bilangan mol gas (mol)',
          'V = isi padu gas dalam dm³ (jika dalam cm³, bahagi 1000)',
          'V_m = 22.4 dm³ mol⁻¹ pada Keadaan Piawai (STP)',
          'V_m = 24.0 dm³ mol⁻¹ pada Keadaan Bilik (RTP)'
        ],
        tips: 'Perhatikan sama ada soalan menyatakan STP (22.4 dm³ mol⁻¹) atau Keadaan Bilik (24.0 dm³ mol⁻¹).'
      },
      {
        id: 'peratusan-unsur',
        name: 'Peratusan Jisim Unsur dalam Sebatian',
        syllabus: 'T4 Bab 3 (m/s 68)',
        unit: '%',
        formulaSearch: 'peratus unsur jisim molekul relatif',
        renderType: 'fraction',
        lhs: 'Peratus jisim unsur (%)',
        numerator: 'Jisim unsur dalam 1 mol sebatian (g)',
        denominator: 'Jisim molar sebatian (g mol⁻¹)',
        subText: '× 100%',
        variables: [
          'Jisim unsur = (bilangan atom unsur) × (Jisim Atom Relatif unsur)',
          'Jisim molar sebatian = Jisim Molekul Relatif (JMR) atau Jisim Formula Relatif (JFR)'
        ],
        tips: 'Pastikan jumlah peratusan semua unsur dalam sebatian bersamaan 100%.'
      },
      {
        id: 'hasil-peratusan',
        name: 'Hasil Peratusan Tindak Balas',
        syllabus: 'T4 Bab 3 (m/s 74)',
        unit: '%',
        formulaSearch: 'hasil peratusan sebenar teori',
        renderType: 'fraction',
        lhs: 'Hasil peratusan (%)',
        numerator: 'Hasil sebenar (eksperimen)',
        denominator: 'Hasil teori (stoikiometri)',
        subText: '× 100%',
        variables: [
          'Hasil sebenar = kuantiti hasil yang ditimbang daripada amali di makmal',
          'Hasil teori = kuantiti maksimum hasil yang dihitung daripada persamaan kimia seimbang'
        ],
        tips: 'Hasil sebenar sentiasa kurang daripada atau sama dengan hasil teori disebabkan tindak balas tidak lengkap.'
      }
    ]
  },
  {
    category: '2. Larutan Akueus, Kemolaran & Peneutralan (Tingkatan 4 Bab 6)',
    formulas: [
      {
        id: 'kepekatan-g-dm3',
        name: 'Kepekatan Larutan (g dm⁻³)',
        syllabus: 'T4 Bab 6 (m/s 158)',
        unit: 'g dm⁻³',
        formulaSearch: 'kepekatan jisim larutan dm3',
        renderType: 'fraction',
        lhs: 'Kepekatan (g dm⁻³)',
        numerator: 'Jisim zat terlarut (g)',
        denominator: 'Isi padu larutan (dm³)',
        variables: [
          'Jisim zat terlarut dalam gram (g)',
          'Isi padu larutan dalam dm³ (1 dm³ = 1,000 cm³)'
        ],
        tips: 'Jika isi padu diberikan dalam cm³, bahagikan dengan 1000 terlebih dahulu.'
      },
      {
        id: 'kemolaran-mol-dm3',
        name: 'Kemolaran Larutan (mol dm⁻³)',
        syllabus: 'T4 Bab 6 (m/s 159)',
        unit: 'mol dm⁻³ (M)',
        formulaSearch: 'kemolaran mol dm3 M = n / V',
        renderType: 'fraction',
        lhs: 'Kemolaran, M (mol dm⁻³)',
        numerator: 'Bilangan mol zat terlarut, n (mol)',
        denominator: 'Isi padu larutan, V (dm³)',
        symbolicLhs: 'M',
        symbolicNum: 'n',
        symbolicDen: 'V',
        variables: [
          'M = Kemolaran (mol dm⁻³ atau M)',
          'n = Bilangan mol zat terlarut (mol)',
          'V = Isi padu larutan dalam dm³'
        ],
        tips: 'Kemolaran juga boleh dihitung melalui: Kemolaran (M) = Kepekatan (g dm⁻³) ÷ Jisim Molar (g mol⁻¹).'
      },
      {
        id: 'mol-larutan-mv',
        name: 'Bilangan Mol dalam Larutan Akueus',
        syllabus: 'T4 Bab 6 (m/s 162)',
        unit: 'mol',
        formulaSearch: 'n = MV / 1000 mol larutan',
        renderType: 'fraction',
        lhs: 'Bilangan mol, n',
        numerator: 'M × V',
        denominator: '1000',
        subText: '(apabila V dalam cm³)',
        symbolicLhs: 'n',
        symbolicNum: 'MV',
        symbolicDen: '1000',
        variables: [
          'n = bilangan mol zat terlarut (mol)',
          'M = kemolaran larutan (mol dm⁻³)',
          'V = isi padu larutan dalam cm³ (jika V dalam dm³, gunakan rumus: n = MV)'
        ],
        tips: 'Rumus paling kerap diguna dalam pengiraan asid, alkali, titratan dan stoikiometri larutan SPM!'
      },
      {
        id: 'pencairan-m1v1',
        name: 'Rumus Pencairan Larutan Piawai',
        syllabus: 'T4 Bab 6 (m/s 164)',
        formulaSearch: 'M1V1 = M2V2 pencairan larutan piawai air suling',
        renderType: 'linear',
        linearEquation: 'M₁V₁ = M₂V₂',
        subText: 'Isi padu air suling ditambah = V₂ − V₁',
        variables: [
          'M₁ = Kemolaran asal sebelum pencairan (larutan stok)',
          'V₁ = Isi padu larutan asal yang dipipet',
          'M₂ = Kemolaran baharu selepas pencairan (lebih cair)',
          'V₂ = Isi padu akhir larutan cair terhasil (V₂ = V₁ + isi padu air suling)'
        ],
        tips: 'Bilangan mol zat terlarut sebelum dan selepas pencairan adalah TIDAK BERUBAH (sama kekal).'
      },
      {
        id: 'pentitratan-asid-bes',
        name: 'Rumus Pentitratan Asid-Alkali (Peneutralan)',
        syllabus: 'T4 Bab 6 (m/s 171)',
        formulaSearch: 'MaVa / MbVb = a / b pentitratan asid alkali peneutralan',
        renderType: 'titration',
        variables: [
          'M_a = kemolaran asid (mol dm⁻³)',
          'V_a = isi padu asid (cm³)',
          'M_b = kemolaran alkali (mol dm⁻³)',
          'V_b = isi padu alkali (cm³)',
          'a, b = pekali stoikiometri asid dan alkali daripada persamaan kimia seimbang (a Asid + b Alkali → Garam + Air)'
        ],
        tips: 'Tulis dan seimbangkan persamaan kimia dahulu untuk mendapatkan nisbah a : b yang tepat!'
      }
    ]
  },
  {
    category: '3. Kadar Tindak Balas (Tingkatan 4 Bab 7)',
    formulas: [
      {
        id: 'kadar-purata',
        name: 'Kadar Tindak Balas Purata',
        syllabus: 'T4 Bab 7 (m/s 212)',
        unit: 'cm³ s⁻¹ atau g s⁻¹',
        formulaSearch: 'kadar purata isi padu gas masa',
        renderType: 'fraction',
        lhs: 'Kadar purata',
        numerator: 'Perubahan kuantiti bahan / hasil',
        denominator: 'Masa yang diambil',
        subText: 'Kadar purata = (Isi padu gas maksimum, V_maks) ÷ (Masa tindak balas lengkap, t)',
        variables: [
          'Perubahan kuantiti = isi padu gas terbebas (cm³) atau jisim pepejal berkurang (g)',
          'Masa yang diambil dalam saat (s) atau minit (min)'
        ],
        tips: 'Kadar tindak balas berkadar songsang dengan masa: Kadar ∝ 1 / masa.'
      },
      {
        id: 'kadar-seketika',
        name: 'Kadar Tindak Balas pada Masa Tertentu (Kecerunan Tangen)',
        syllabus: 'T4 Bab 7 (m/s 226)',
        unit: 'cm³ s⁻¹',
        formulaSearch: 'kadar seketika kecerunan tangen graf lengkung dy dx',
        renderType: 'fraction',
        lhs: 'Kadar pada masa t',
        numerator: 'Kecerunan tangen pada lengkung graf, dy',
        denominator: 'dx',
        symbolicLhs: 'Kadar (t)',
        symbolicNum: 'y₂ − y₁',
        symbolicDen: 'x₂ − x₁',
        variables: [
          'Lukis garisan tangen yang menyentuh lengkung tepat pada masa t',
          'Bina segi tiga tegak yang bersaiz besar (sekurang-kurangnya separuh graf) untuk ketepatan nilai kecerunan',
          'Hitung kecerunan = (y₂ − y₁) / (x₂ − x₁)'
        ],
        tips: 'Kecerunan tangen graf sentiasa menurun dari semasa ke semasa kerana kepekatan bahan tindak balas berkurang.'
      }
    ]
  },
  {
    category: '4. Termokimia (Tingkatan 5 Bab 3)',
    formulas: [
      {
        id: 'kuantiti-haba-q',
        name: 'Perubahan Kuantiti Haba (Q)',
        syllabus: 'T5 Bab 3 (m/s 120)',
        unit: 'Joule (J)',
        formulaSearch: 'Q = mcθ kuantiti haba jisim muatan tentu larutan suhu',
        renderType: 'heat',
        linearEquation: 'Q = m × c × θ',
        variables: [
          'Q = kuantiti haba yang dibebaskan atau diserap (J)',
          'm = jisim larutan dalam gram (g) [andaian: ketumpatan larutan = 1 g cm⁻³, maka 1 cm³ = 1 g]',
          'c = muatan haba tentu larutan [biasanya 4.2 J g⁻¹ °C⁻¹]',
          'θ = perubahan suhu campuran tindak balas (°C) = |Suhu tertinggi/terendah − Suhu awal|'
        ],
        tips: 'Untuk menukar nilai Q daripada Joule (J) kepada kilojoule (kJ), bahagikan dengan 1000.'
      },
      {
        id: 'haba-tindakbalas-delta-h',
        name: 'Haba Tindak Balas (ΔH: Pemendakan / Peneutralan / Penyesaran / Pembakaran)',
        syllabus: 'T5 Bab 3 (m/s 122)',
        unit: 'kJ mol⁻¹',
        formulaSearch: 'delta H = Q / n haba pemendakan peneutralan penyesaran pembakaran',
        renderType: 'fraction',
        lhs: 'Haba tindak balas, ΔH',
        numerator: 'Q (kJ)',
        denominator: 'n (mol)',
        subText: 'Wajib tanda: − untuk eksotermik (suhu naik), + untuk endotermik (suhu turun)',
        symbolicLhs: 'ΔH',
        symbolicNum: '± Q (kJ)',
        symbolicDen: 'n (mol)',
        variables: [
          'ΔH = entalpi tindak balas piawai (kJ mol⁻¹)',
          'Q = kuantiti haba yang telah ditukar kepada kJ (J ÷ 1000)',
          'n = bilangan mol bahan tindak balas pembatas yang bertindak balas (mol)'
        ],
        tips: 'Wajib sertakan tanda cas (+ atau −) dan unit (kJ mol⁻¹) dalam jawapan akhir entalpi SPM!'
      },
      {
        id: 'nilai-bahan-api',
        name: 'Nilai Bahan Api',
        syllabus: 'T5 Bab 3 (m/s 140)',
        unit: 'kJ g⁻¹',
        formulaSearch: 'nilai bahan api haba pembakaran jisim molar',
        renderType: 'fraction',
        lhs: 'Nilai bahan api (kJ g⁻¹)',
        numerator: 'Haba pembakaran, ΔH (kJ mol⁻¹)',
        denominator: 'Jisim molar bahan api (g mol⁻¹)',
        variables: [
          'ΔH = haba pembakaran lengkap 1 mol bahan api (kJ mol⁻¹) [guna nilai mutlak positif]',
          'Jisim molar bahan api dalam g mol⁻¹'
        ],
        tips: 'Nilai bahan api mengukur kuantiti tenaga yang dibebaskan apabila 1 gram bahan api dibakar lengkap dalam oksigen berlebihan.'
      }
    ]
  },
  {
    category: '5. Sel Elektrokimia & Keupayaan Elektrod Piawai (Tingkatan 5 Bab 1)',
    formulas: [
      {
        id: 'voltan-sel-piawai',
        name: 'Voltan Sel Piawai (E°sel)',
        syllabus: 'T5 Bab 1 (m/s 28)',
        unit: 'Volt (V)',
        formulaSearch: 'E°sel = E°katod - E°anod keupayaan elektrod piawai voltan',
        renderType: 'voltage',
        linearEquation: 'E°_sel = E°_katod − E°_anod',
        subText: 'E°_sel = E°(terminal positif) − E°(terminal negatif)',
        variables: [
          'E°_katod = nilai keupayaan elektrod piawai yang lebih positif (terminal +, berlaku penurunan)',
          'E°_anod = nilai keupayaan elektrod piawai yang lebih negatif (terminal −, berlaku pengoksidaan)'
        ],
        tips: 'Jika nilai E°sel adalah POSITIF (> 0 V), tindak balas redoks tersebut adalah spontan dan sel kimia dapat menghasilkan arus elektrik.'
      }
    ]
  }
];
