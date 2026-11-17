import React, { Suspense } from 'react';
import { X, ExternalLink, Sparkles, Loader2, FlaskConical, Maximize2 } from 'lucide-react';

interface Props {
  simulationId: string | null;
  onClose: () => void;
}

type LoaderFn = () => Promise<{ default: React.ComponentType }>;

const SIMULATION_LOADERS: Record<string, LoaderFn> = {
  // Bab 2 Tingkatan 4
  'keadaan-zarah-jirim': () =>
    import('../../simulasi_shared/simulations/StatesOfMatterLab').then((m) => ({ default: m.StatesOfMatterLab })),
  'pemanasan-dan-penyejukkan-naftalena': () =>
    import('../../simulasi_shared/simulations/NaphthaleneCooling').then((m) => ({ default: m.NaphthaleneCooling })),

  // Bab 3 Tingkatan 4
  'formula-empirik-mgo': () =>
    import('../../simulasi_shared/simulations/MagnesiumOxideLab').then((m) => ({ default: m.MagnesiumOxideLab })),
  'formula-empirik-cuo': () =>
    import('../../simulasi_shared/simulations/CopperOxideLab').then((m) => ({ default: m.CopperOxideLab })),
  'penyeimbangan-persamaan-kimia': () =>
    import('../../simulasi_shared/simulations/ChemicalEquationBalancer').then((m) => ({ default: m.ChemicalEquationBalancer })),

  // Bab 4 Tingkatan 4
  'kereaktifan-k1-dan-k17': () =>
    import('../../simulasi_shared/simulations/ReactivityLab').then((m) => ({ default: m.ReactivityLab })),
  'sifat-oksida-kala-3': () =>
    import('../../simulasi_shared/simulations/Period3OxidesLab').then((m) => ({ default: m.Period3OxidesLab })),

  // Bab 5 Tingkatan 4
  'ikatan-ion': () =>
    import('../../simulasi_shared/simulations/IonicFormulaLab').then((m) => ({ default: m.IonicFormulaLab })),
  'ikatan-kovalen': () =>
    import('../../simulasi_shared/simulations/CovalentFormulaLab').then((m) => ({ default: m.CovalentFormulaLab })),
  'daya-tarikan-antara-zarah': () =>
    import('../../simulasi_shared/simulations/IntermolecularForcesLab').then((m) => ({ default: m.IntermolecularForcesLab })),

  // Bab 6 Tingkatan 4
  'pentitratan-asid-alkali': () =>
    import('../../simulasi_shared/simulations/AcidBaseTitration').then((m) => ({ default: m.AcidBaseTitration })),
  'penyediaan-larutan-piawai': () =>
    import('../../simulasi_shared/simulations/StandardSolutionLab').then((m) => ({ default: m.StandardSolutionLab })),
  'keterlarutan-garam': () =>
    import('../../simulasi_shared/simulations/SaltSolubilityLab').then((m) => ({ default: m.SaltSolubilityLab })),
  'ujian-gas': () =>
    import('../../simulasi_shared/simulations/GasTestLab').then((m) => ({ default: m.GasTestLab })),
  'ujian-kation': () =>
    import('../../simulasi_shared/simulations/CationTestLab').then((m) => ({ default: m.CationTestLab })),
  'ujian-anion': () =>
    import('../../simulasi_shared/simulations/AnionTestLab').then((m) => ({ default: m.AnionTestLab })),

  // Bab 7 Tingkatan 4
  'kadar-saiz-bahan': () =>
    import('../../simulasi_shared/simulations/RateOfReactionSizeLab').then((m) => ({ default: m.RateOfReactionSizeLab })),
  'kadar-kepekatan': () =>
    import('../../simulasi_shared/simulations/RateOfReactionConcentrationLab').then((m) => ({ default: m.RateOfReactionConcentrationLab })),
  'kadar-suhu': () =>
    import('../../simulasi_shared/simulations/RateOfReactionTemperatureLab').then((m) => ({ default: m.RateOfReactionTemperatureLab })),
  'kadar-mangkin': () =>
    import('../../simulasi_shared/simulations/RateOfReactionCatalystLab').then((m) => ({ default: m.RateOfReactionCatalystLab })),

  // Bab 8 Tingkatan 4
  'kekerasan-aloi': () =>
    import('../../simulasi_shared/simulations/AlloyHardnessLab').then((m) => ({ default: m.AlloyHardnessLab })),
  'aloi-kekerasan': () =>
    import('../../simulasi_shared/simulations/AlloyHardnessLab').then((m) => ({ default: m.AlloyHardnessLab })),

  // Bab 1 Tingkatan 5
  'pemindahan-elektron-tiub-u': () =>
    import('../../simulasi_shared/simulations/UTubeElectronTransferLab').then((m) => ({ default: m.UTubeElectronTransferLab })),
  'penukaran-ion-ferum': () =>
    import('../../simulasi_shared/simulations/IronIonConversionLab').then((m) => ({ default: m.IronIonConversionLab })),
  'penyesaran-halogen-halida': () =>
    import('../../simulasi_shared/simulations/HalogenDisplacementLab').then((m) => ({ default: m.HalogenDisplacementLab })),
  'penyesaran-halogen': () =>
    import('../../simulasi_shared/simulations/HalogenDisplacementLab').then((m) => ({ default: m.HalogenDisplacementLab })),
  'sel-kimia-voltan': () =>
    import('../../simulasi_shared/simulations/VoltaicCellLab').then((m) => ({ default: m.VoltaicCellLab })),
  'elektrolisis': () =>
    import('../../simulasi_shared/simulations/ElectrolysisLab').then((m) => ({ default: m.ElectrolysisLab })),
  'pengaratan-besi-sentuhan-logam': () =>
    import('../../simulasi_shared/simulations/IronRustingLab').then((m) => ({ default: m.IronRustingLab })),
  'pengekstrakan-aluminium': () =>
    import('../../simulasi_shared/simulations/AluminumExtractionLab').then((m) => ({ default: m.AluminumExtractionLab })),
  'pengekstrakan-besi': () =>
    import('../../simulasi_shared/simulations/IronExtractionLab').then((m) => ({ default: m.IronExtractionLab })),

  // Bab 2 Tingkatan 5 (Sebatian Karbon)
  'pembina-struktur-karbon': () =>
    import('../../simulasi_shared/simulations/CarbonStructureBuilderLab').then((m) => ({ default: m.CarbonStructureBuilderLab })),
  'alkana-lawan-alkena': () =>
    import('../../simulasi_shared/simulations/AlkaneVsAlkeneLab').then((m) => ({ default: m.AlkaneVsAlkeneLab })),
  'tindak-balas-alkena': () =>
    import('../../simulasi_shared/simulations/AlkeneReactionsHubLab').then((m) => ({ default: m.AlkeneReactionsHubLab })),
  'penapaian-penyulingan-etanol': () =>
    import('../../simulasi_shared/simulations/EthanolFermentationDistillationLab').then((m) => ({ default: m.EthanolFermentationDistillationLab })),
  'pengoksidaan-etanol': () =>
    import('../../simulasi_shared/simulations/EthanolOxidationLab').then((m) => ({ default: m.EthanolOxidationLab })),
  'makmal-pengesteran': () =>
    import('../../simulasi_shared/simulations/EsterificationLab').then((m) => ({ default: m.EsterificationLab })),
  'keisomeran-karbon': () =>
    import('../../simulasi_shared/simulations/CarbonIsomersLab').then((m) => ({ default: m.CarbonIsomersLab })),

  // Bab 3 Tingkatan 5 (Termokimia)
  'termokimia-eksotermik-endotermik': () =>
    import('../../simulasi_shared/simulations/ThermochemistryLab').then((m) => ({ default: m.ThermochemistryLab })),
  'termokimia-asas': () =>
    import('../../simulasi_shared/simulations/ThermochemistryLab').then((m) => ({ default: m.ThermochemistryLab })),
  'haba-pemendakan': () =>
    import('../../simulasi_shared/simulations/HeatOfPrecipitationLab').then((m) => ({ default: m.HeatOfPrecipitationLab })),
  'haba-peneutralan': () =>
    import('../../simulasi_shared/simulations/HeatOfNeutralisationLab').then((m) => ({ default: m.HeatOfNeutralisationLab })),
  'haba-pembakaran': () =>
    import('../../simulasi_shared/simulations/HeatOfCombustionLab').then((m) => ({ default: m.HeatOfCombustionLab })),
  'nilai-bahan-api': () =>
    import('../../simulasi_shared/simulations/FuelValueLab').then((m) => ({ default: m.FuelValueLab })),

  // Bab 4 Tingkatan 5 (Kimia Polimer)
  'penggumpalan-lateks': () =>
    import('../../simulasi_shared/simulations/LatexCoagulationLab').then((m) => ({ default: m.LatexCoagulationLab })),
  'lateks-penggumpalan': () =>
    import('../../simulasi_shared/simulations/LatexCoagulationLab').then((m) => ({ default: m.LatexCoagulationLab })),
  'pemvulkanan-getah': () =>
    import('../../simulasi_shared/simulations/RubberElasticityLab').then((m) => ({ default: m.RubberElasticityLab })),
  'keanjalan-getah': () =>
    import('../../simulasi_shared/simulations/RubberElasticityLab').then((m) => ({ default: m.RubberElasticityLab })),

  // Bab 5 Tingkatan 5 (Kimia Konsumer dan Industri)
  'pembuatan-sabun': () =>
    import('../../simulasi_shared/simulations/SoapMakingLab').then((m) => ({ default: m.SoapMakingLab })),
  'saponifikasi-sabun': () =>
    import('../../simulasi_shared/simulations/SoapMakingLab').then((m) => ({ default: m.SoapMakingLab })),
  'tindakan-pencucian-sabun-detergen': () =>
    import('../../simulasi_shared/simulations/HardWaterCleaningLab').then((m) => ({ default: m.HardWaterCleaningLab })),
  'air-liat-sabun-detergen': () =>
    import('../../simulasi_shared/simulations/HardWaterCleaningLab').then((m) => ({ default: m.HardWaterCleaningLab })),
};

const SIMULATION_TITLES: Record<string, { title: string; subtitle: string; form: string }> = {
  'keadaan-zarah-jirim': {
    title: 'Makmal Maya Keadaan Zarah Jirim',
    subtitle: 'Kaji pergerakan mikroskopik, susunan zarah & daya tarikan pepejal, cecair dan gas',
    form: 'Tingkatan 4 Bab 2.1',
  },
  'pemanasan-dan-penyejukkan-naftalena': {
    title: 'Makmal Maya Pemanasan & Penyejukan Naftalena',
    subtitle: 'Plot graf masa-suhu masa nyata, perhatikan takat lebur & takat beku (80°C) serta atasi penyejukan lampau',
    form: 'Tingkatan 4 Bab 2.1',
  },
  'formula-empirik-mgo': {
    title: 'Makmal Maya Formula Empirik Magnesium Oksida (MgO)',
    subtitle: 'Bakar pita magnesium dalam mangkuk pijar, buka penutup berkala & timbang berulang hingga jisim malar',
    form: 'Tingkatan 4 Bab 3.3',
  },
  'formula-empirik-cuo': {
    title: 'Makmal Maya Formula Empirik Kuprum(II) Oksida (CuO)',
    subtitle: 'Alirkan gas hidrogen kering, panaskan serbuk hitam CuO sehingga menjadi perang tembaga & sejukkan dalam aliran gas H₂',
    form: 'Tingkatan 4 Bab 3.3',
  },
  'penyeimbangan-persamaan-kimia': {
    title: 'Makmal Maya Penyeimbangan Persamaan Kimia',
    subtitle: 'Laras pekali stoikiometri bahan tindak balas dan hasil dengan visual molekul interaktif',
    form: 'Tingkatan 4 Bab 3.4',
  },
  'kereaktifan-k1-dan-k17': {
    title: 'Makmal Maya Kereaktifan Logam Kumpulan 1 & Halogen Kumpulan 17',
    subtitle: 'Kaji tindak balas cergas Li, Na, K dengan air serta penurunan kereaktifan halogen Cl₂, Br₂, I₂',
    form: 'Tingkatan 4 Bab 4.4 & 4.5',
  },
  'sifat-oksida-kala-3': {
    title: 'Makmal Maya Sifat Asid-Bes Oksida Unsur Kala 3',
    subtitle: 'Uji oksida bes (Na₂O, MgO), oksida amfoterik (Al₂O₃) dan oksida asid (SiO₂, P₄O₁₀, SO₂) dengan asid dan alkali',
    form: 'Tingkatan 4 Bab 4.6',
  },
  'ikatan-ion': {
    title: 'Makmal Maya Pembentukan Ikatan Ion',
    subtitle: 'Simulasikan pemindahan elektron antara logam dan bukan logam serta pembentukan formula sebatian ionik',
    form: 'Tingkatan 4 Bab 5.2',
  },
  'ikatan-kovalen': {
    title: 'Makmal Maya Pembentukan Ikatan Kovalen',
    subtitle: 'Kongsi elektron valens untuk membina ikatan tunggal, ganda dua, ganda tiga dan struktur Lewis',
    form: 'Tingkatan 4 Bab 5.3',
  },
  'daya-tarikan-antara-zarah': {
    title: 'Makmal Maya Daya Tarikan Antara Zarah & Ikatan Hidrogen',
    subtitle: 'Bandingkan kekuatan daya tarikan van der Waals dan ikatan hidrogen serta kesannya terhadap takat didih',
    form: 'Tingkatan 4 Bab 5.4 & 5.7',
  },
  'pentitratan-asid-alkali': {
    title: 'Makmal Maya Pentitratan Asid-Alkali',
    subtitle: 'Kawal pili buret, perhatikan perubahan warna takat akhir fenolftalein & hitung kemolaran',
    form: 'Tingkatan 4 Bab 6.7',
  },
  'penyediaan-larutan-piawai': {
    title: 'Makmal Maya Penyediaan & Pencairan Larutan Piawai',
    subtitle: 'Timbang pepejal, bilas corong turas, laraskan meniskus kelalang volumetrik & cairkan larutan M₁V₁ = M₂V₂',
    form: 'Tingkatan 4 Bab 6.6',
  },
  'keterlarutan-garam': {
    title: 'Makmal Maya Keterlarutan Garam Dalam Air',
    subtitle: 'Bina garam daripada kation & anion, uji keterlarutan dalam air sejuk dan air panas (PbCl₂ & PbI₂)',
    form: 'Tingkatan 4 Bab 6.9',
  },
  'ujian-gas': {
    title: 'Makmal Maya Ujian Pengesahan 8 Gas Makmal',
    subtitle: 'Uji gas O₂, H₂, CO₂, NH₃, Cl₂, HCl, SO₂ dan NO₂ menggunakan kayu uji, litmus & air kapur',
    form: 'Tingkatan 4 Bab 6.10',
  },
  'ujian-kation': {
    title: 'Makmal Maya Analisis Kualitatif Kation',
    subtitle: 'Titiskan NaOH & NH₃ sedikit demi sedikit hingga berlebihan serta reagen pengesahan khas (KI, KSCN, K₃)',
    form: 'Tingkatan 4 Bab 6.11',
  },
  'ujian-anion': {
    title: 'Makmal Maya Analisis Kualitatif Anion',
    subtitle: 'Uji mendakan anion CO₃²⁻, Cl⁻, SO₄²⁻ dan cincin perang ion NO₃⁻',
    form: 'Tingkatan 4 Bab 6.11',
  },
  'kadar-saiz-bahan': {
    title: 'Makmal Maya Kesan Saiz Bahan Tindak Balas',
    subtitle: 'Kaji tindak balas kalsium karbonat (ketulan vs serbuk) dengan asid hidroklorik dan bandingkan kecerunan graf isipadu gas',
    form: 'Tingkatan 4 Bab 7.1 & 7.2',
  },
  'kadar-kepekatan': {
    title: 'Makmal Maya Kesan Kepekatan Bahan Tindak Balas',
    subtitle: 'Eksperimen tanda \'X\' tindak balas natrium tiosulfat dengan asid sulfurik untuk mengukur masa pembentukan mendakan sulfur',
    form: 'Tingkatan 4 Bab 7.2',
  },
  'kadar-suhu': {
    title: 'Makmal Maya Kesan Suhu Terhadap Kadar Tindak Balas',
    subtitle: 'Panaskan larutan natrium tiosulfat pada pelbagai suhu (30°C - 60°C) dan tentukan hubungan suhu dengan kadar tindak balas (1/t)',
    form: 'Tingkatan 4 Bab 7.2',
  },
  'kadar-mangkin': {
    title: 'Makmal Maya Kesan Mangkin Terhadap Kadar Tindak Balas',
    subtitle: 'Bandingkan penguraian hidrogen peroksida (H₂O₂) dengan dan tanpa mangkin mangan(IV) oksida (MnO₂) serta profil aras tenaga',
    form: 'Tingkatan 4 Bab 7.2 & 7.4',
  },
  'kekerasan-aloi': {
    title: 'Makmal Maya Ujian Kekerasan & Susunan Atom Aloi',
    subtitle: 'Jalankan eksperimen penjatuhan bola keluli ke atas kuprum dan loyang, ukur diameter lekukan & terokai model kekisi atom',
    form: 'Tingkatan 4 Bab 8.1',
  },
  'aloi-kekerasan': {
    title: 'Makmal Maya Ujian Kekerasan & Susunan Atom Aloi',
    subtitle: 'Jalankan eksperimen penjatuhan bola keluli ke atas kuprum dan loyang, ukur diameter lekukan & terokai model kekisi atom',
    form: 'Tingkatan 4 Bab 8.1',
  },
  'pemindahan-elektron-tiub-u': {
    title: 'Makmal Maya Pemindahan Elektron pada Suatu Jarak (Tiub-U)',
    subtitle: 'Perhatikan arah pengaliran elektron litar luar, pesongan galvanometer & ujian ion redoks',
    form: 'Tingkatan 5 Bab 1.1',
  },
  'penukaran-ion-ferum': {
    title: 'Makmal Maya Penukaran Bersaling Ion Fe²⁺ ⇌ Fe³⁺',
    subtitle: 'Uji agen pengoksidaan & agen penurunan serta stesen ujian NaOH, KSCN dan K₄[Fe(CN)₆]',
    form: 'Tingkatan 5 Bab 1.1',
  },
  'penyesaran-halogen-halida': {
    title: 'Makmal Maya Penyesaran Halogen daripada Larutan Halida',
    subtitle: 'Kaji warna lapisan organik 1,1,1-trikloroetana bagi Cl₂, Br₂ dan I₂',
    form: 'Tingkatan 5 Bab 1.1',
  },
  'penyesaran-halogen': {
    title: 'Makmal Maya Penyesaran Halogen daripada Larutan Halida',
    subtitle: 'Kaji warna lapisan organik 1,1,1-trikloroetana bagi Cl₂, Br₂ dan I₂',
    form: 'Tingkatan 5 Bab 1.1',
  },
  'sel-kimia-voltan': {
    title: 'Makmal Maya Sel Kimia & Sel Daniell',
    subtitle: 'Pilih pasangan elektrod logam, perhatikan nilai E°sel masa nyata, notasi sel & arah aliran elektron',
    form: 'Tingkatan 5 Bab 1.3',
  },
  'elektrolisis': {
    title: 'Makmal Multi-Aras Elektrolisis Johnstone',
    subtitle: 'Kaji elektrolisis leburan & larutan akueus, elektrod lengai vs aktif, dan zum submikroskopik ion',
    form: 'Tingkatan 5 Bab 1.4',
  },
  'pengaratan-besi-sentuhan-logam': {
    title: 'Makmal Maya Pengaratan Besi & Logam Korban',
    subtitle: 'Kaji paku besi dalam agar-agar berpenunjuk K₃[Fe(CN)₆] dan fenolftalein dengan peluncur masa 0–48j',
    form: 'Tingkatan 5 Bab 1.6',
  },
  'pengekstrakan-aluminium': {
    title: 'Makmal Maya Pengekstrakan Aluminium daripada Bauksit',
    subtitle: 'Kaji sel elektrolisis leburan alumina dan kriolit serta peranan anod karbon',
    form: 'Tingkatan 5 Bab 1.5',
  },
  'pengekstrakan-besi': {
    title: 'Makmal Maya Pengekstrakan Besi dalam Relau Bagas',
    subtitle: 'Pemanasan ferum(III) oksida dengan karbon dan tindak balas zon relau bagas',
    form: 'Tingkatan 5 Bab 1.5',
  },
  'pembina-struktur-karbon': {
    title: 'Makmal Maya Pembina Struktur & Penamaan IUPAC',
    subtitle: 'Bina molekul organik, tentukan rantai terpanjang, cabang alkil & kumpulan berfungsi mengikut piawaian IUPAC',
    form: 'Tingkatan 5 Bab 2.2',
  },
  'alkana-lawan-alkena': {
    title: 'Makmal Maya Perbandingan Alkana vs Alkena',
    subtitle: 'Uji kejelagaan pembakaran, tindak balas air bromin & larutan KMnO₄ berasid secara interaktif',
    form: 'Tingkatan 5 Bab 2.3',
  },
  'tindak-balas-alkena': {
    title: 'Makmal Maya Hab Tindak Balas Penambahan Alkena',
    subtitle: 'Terokai tindak balas etena dengan hidrogen, halogen, hidrogen halida, stim (penghidratan) & pempolimeran',
    form: 'Tingkatan 5 Bab 2.3',
  },
  'penapaian-penyulingan-etanol': {
    title: 'Makmal Maya Penapaian Glukosa & Penyulingan Etanol',
    subtitle: 'Jalankan penapaian anaerobik dengan yis dan pisahkan alkohol tulen melalui penyulingan berperingkat',
    form: 'Tingkatan 5 Bab 2.4',
  },
  'pengoksidaan-etanol': {
    title: 'Makmal Maya Pengoksidaan Etanol kepada Asid Etanoik',
    subtitle: 'Panaskan etanol bersama kalium dikromat(VI) berasid, perhatikan perubahan warna jingga ke hijau',
    form: 'Tingkatan 5 Bab 2.4',
  },
  'makmal-pengesteran': {
    title: 'Makmal Maya Tindak Balas Pengesteran',
    subtitle: 'Campurkan pelbagai alkohol dan asid karboksilik dengan mangkin H₂SO₄ pekat untuk menghasilkan ester wangi',
    form: 'Tingkatan 5 Bab 2.5',
  },
  'keisomeran-karbon': {
    title: 'Makmal Maya Penerokaan Keisomeran Struktur',
    subtitle: 'Bina dan bandingkan isomer rantai serta isomer kedudukan bagi alkana, alkena dan alkohol sehingga 5 atom karbon',
    form: 'Tingkatan 5 Bab 2.6',
  },
  'termokimia-eksotermik-endotermik': {
    title: 'Makmal Maya Termokimia: Eksotermik & Endotermik',
    subtitle: 'Kaji profil aras tenaga, pembebasan & penyerapan haba, tenaga pengaktifan serta aplikasi pek sejuk & panas',
    form: 'Tingkatan 5 Bab 3.1',
  },
  'termokimia-asas': {
    title: 'Makmal Maya Termokimia: Eksotermik & Endotermik',
    subtitle: 'Kaji profil aras tenaga, pembebasan & penyerapan haba, tenaga pengaktifan serta aplikasi pek sejuk & panas',
    form: 'Tingkatan 5 Bab 3.1',
  },
  'haba-pemendakan': {
    title: 'Makmal Maya Haba Pemendakan Garam Tak Larut',
    subtitle: 'Ukur perubahan suhu pemendakan BaSO₄ dan AgCl, hitung Q = mcθ dan entalpi pemendakan ΔH',
    form: 'Tingkatan 5 Bab 3.2',
  },
  'haba-peneutralan': {
    title: 'Makmal Maya Kalorimeter Haba Peneutralan',
    subtitle: 'Bandingkan tindak balas asid kuat vs asid lemah, asid monoprotik vs diprotik (H₂SO₄) serta pengiraan entalpi',
    form: 'Tingkatan 5 Bab 3.3',
  },
  'haba-pembakaran': {
    title: 'Makmal Maya Kalorimeter Haba Pembakaran Alkohol',
    subtitle: 'Kaji pembakaran metanol, etanol, propanol & butanol, plot graf ΔH melawan bilangan atom karbon',
    form: 'Tingkatan 5 Bab 3.4',
  },
  'nilai-bahan-api': {
    title: 'Makmal Maya Nilai Bahan Api & Kecekapan Tenaga',
    subtitle: 'Hitung nilai bahan api (kJ g⁻¹) pelbagai jenis bahan api, bandingkan kecekapan dan impak terhadap alam sekitar',
    form: 'Tingkatan 5 Bab 3.4',
  },
  'penggumpalan-lateks': {
    title: 'Makmal Maya Penggumpalan Lateks & Zarah Getah',
    subtitle: 'Kaji tindakan asid, alkali, dan bakteria terhadap membran protein zarah getah pada aras submikroskopik',
    form: 'Tingkatan 5 Bab 4.2',
  },
  'lateks-penggumpalan': {
    title: 'Makmal Maya Penggumpalan Lateks & Zarah Getah',
    subtitle: 'Kaji tindakan asid, alkali, dan bakteria terhadap membran protein zarah getah pada aras submikroskopik',
    form: 'Tingkatan 5 Bab 4.2',
  },
  'pemvulkanan-getah': {
    title: 'Makmal Maya Pemvulkanan & Ujian Keanjalan Getah',
    subtitle: 'Kaji pembentukan rangkai silang sulfur, bandingkan pemanjangan beban dan keanjalan getah asli vs getah tervulkan',
    form: 'Tingkatan 5 Bab 4.3',
  },
  'keanjalan-getah': {
    title: 'Makmal Maya Pemvulkanan & Ujian Keanjalan Getah',
    subtitle: 'Kaji pembentukan rangkai silang sulfur, bandingkan pemanjangan beban dan keanjalan getah asli vs getah tervulkan',
    form: 'Tingkatan 5 Bab 4.3',
  },
  'pembuatan-sabun': {
    title: 'Makmal Maya Pembuatan Sabun (Saponifikasi)',
    subtitle: 'Kaji hidrolisis minyak sawit oleh alkali pekat, peranan pemendakan NaCl tepu dan struktur misel sabun',
    form: 'Tingkatan 5 Bab 5.2',
  },
  'saponifikasi-sabun': {
    title: 'Makmal Maya Pembuatan Sabun (Saponifikasi)',
    subtitle: 'Kaji hidrolisis minyak sawit oleh alkali pekat, peranan pemendakan NaCl tepu dan struktur misel sabun',
    form: 'Tingkatan 5 Bab 5.2',
  },
  'tindakan-pencucian-sabun-detergen': {
    title: 'Makmal Maya Tindakan Pencucian Sabun & Detergen dalam Air Liat',
    subtitle: 'Bandingkan pembentukan buih & kekat sabun vs detergen dalam air lembut, air liat Ca²⁺/Mg²⁺ dan air berasid',
    form: 'Tingkatan 5 Bab 5.2',
  },
  'air-liat-sabun-detergen': {
    title: 'Makmal Maya Tindakan Pencucian Sabun & Detergen dalam Air Liat',
    subtitle: 'Bandingkan pembentukan buih & kekat sabun vs detergen dalam air lembut, air liat Ca²⁺/Mg²⁺ dan air berasid',
    form: 'Tingkatan 5 Bab 5.2',
  },
};

export const IntegratedSimulationModal: React.FC<Props> = ({ simulationId, onClose }) => {
  if (!simulationId) return null;

  const loader = SIMULATION_LOADERS[simulationId];
  const info = SIMULATION_TITLES[simulationId] || {
    title: 'Makmal Maya Simulasi Kimia',
    subtitle: 'Eksperimen Interaktif KSSM Cikgu Hafreez',
    form: 'Simulasi SPM',
  };

  const Component = loader ? React.lazy(loader) : null;
  const externalUrl = `https://simulasikimia.cikguhafreez.my/?sim=${simulationId}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[94vh] max-h-[94vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200/90">
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-sky-50 via-indigo-50/40 to-white border-b border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 via-sky-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-sky-500/20 shrink-0">
              <FlaskConical className="w-5 h-5 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-sky-600 text-white uppercase tracking-wider shrink-0">
                  {info.form}
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                  {info.title}
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 truncate hidden sm:block">
                {info.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              title="Buka dalam tab baharu di simulasikimia.cikguhafreez.my"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Buka Skrin Penuh</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 transition-colors"
              title="Tutup Simulasi (Kembali ke Nota)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Simulation Canvas */}
        <div className="flex-1 overflow-y-auto bg-slate-50/40 relative">
          {Component ? (
            <Suspense
              fallback={
                <div className="h-full min-h-[450px] flex flex-col items-center justify-center text-slate-400 gap-3">
                  <Loader2 className="w-9 h-9 animate-spin text-sky-600" />
                  <span className="text-xs font-medium text-slate-600">
                    Memuatkan Makmal Maya Interaktif...
                  </span>
                </div>
              }
            >
              <div className="p-3 sm:p-5">
                <Component />
              </div>
            </Suspense>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-slate-500 p-6 text-center space-y-3">
              <FlaskConical className="w-12 h-12 text-slate-300" />
              <p className="text-sm font-semibold">Simulasi bagi topik ini boleh dilayari terus di portal Simulasi Kimia.</p>
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <span>Buka di simulasikimia.cikguhafreez.my</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Bottom Bar Indicator */}
        <div className="px-5 py-2.5 bg-white border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span className="font-medium text-slate-600">Simulasi Makmal Maya Terbenam (In-App)</span>
            <span className="hidden sm:inline">• Uji eksperimen secara langsung tanpa meninggalkan nota</span>
          </div>
          <span className="text-slate-400">Tekan <b>ESC</b> atau butang pangkah untuk tutup</span>
        </div>
      </div>
    </div>
  );
};
