export interface ExtraQuestion {
  id: string;
  chapterNumber: number;
  chapterTitle: string;
  subtopicCode: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  level: 'Rendah' | 'Sederhana' | 'Tinggi (KBAT)';
  spmReference?: string;
}

export const EXTRA_T5_EXAM_QUESTIONS: ExtraQuestion[] = [
  // ==========================================
  // BAB 1: KESEIMBANGAN REDOKS (12 SOALAN)
  // ==========================================
  {
    id: 'exam-t5-b1-01',
    chapterNumber: 1,
    chapterTitle: 'Keseimbangan Redoks',
    subtopicCode: '1.1',
    question: 'Tindak balas manakah antara berikut BUKAN merupakan satu tindak balas redoks?',
    options: [
      'Mg(p) + 2HCl(ak) → MgCl₂(ak) + H₂(g)',
      'NaOH(ak) + HCl(ak) → NaCl(ak) + H₂O(c)',
      '2Fe²⁺(ak) + Cl₂(g) → 2Fe³⁺(ak) + 2Cl⁻(ak)',
      'CuO(p) + H₂(g) → Cu(p) + H₂O(c)'
    ],
    answerIndex: 1,
    explanation: 'Tindak balas peneutralan NaOH + HCl ialah tindak balas penguraian ganda dua di mana nombor pengoksidaan semua unsur kekal (Na=+1, O=-2, H=+1, Cl=-1), maka ia bukan redoks.',
    level: 'Sederhana',
    spmReference: 'SPM 2022 Kertas 1'
  },
  {
    id: 'exam-t5-b1-02',
    chapterNumber: 1,
    chapterTitle: 'Keseimbangan Redoks',
    subtopicCode: '1.2',
    question: 'Dalam susunan radas Tiub-U pemindahan elektron pada satu jarak, larutan kalium iodida bertindak sebagai agen penurunan manakala air klorin bertindak sebagai agen pengoksidaan. Apakah arah pengaliran elektron dalam wayar luar?',
    options: [
      'Dari elektrod larutan KI ke elektrod air klorin',
      'Dari elektrod air klorin ke elektrod larutan KI',
      'Dari pasu berliang ke elektrod larutan KI',
      'Dari elektrod ke dalam larutan asid sulfurik'
    ],
    answerIndex: 0,
    explanation: 'Elektron sentiasa mengalir melalui wayar penyambung luar daripada agen penurunan (mengalami pengoksidaan / anod, iaitu elektrod KI) kepada agen pengoksidaan (mengalami penurunan / katod, iaitu elektrod air klorin).',
    level: 'Sederhana',
    spmReference: 'Trial SBP 2023'
  },
  {
    id: 'exam-t5-b1-03',
    chapterNumber: 1,
    chapterTitle: 'Keseimbangan Redoks',
    subtopicCode: '1.3',
    question: 'Diberi nilai keupayaan elektrod piawai:\nMg²⁺ + 2e⁻ ⇌ Mg (E° = -2.38 V)\nAg⁺ + e⁻ ⇌ Ag (E° = +0.80 V)\nBerapakah nilai voltan sel piawai, E°sel bagi sel kimia yang menggabungkan elektrod magnesium dan perak?',
    options: [
      '+1.58 V',
      '+3.18 V',
      '-3.18 V',
      '-1.58 V'
    ],
    answerIndex: 1,
    explanation: 'E°sel = E°(katod) - E°(anod) = +0.80 - (-2.38) = +0.80 + 2.38 = +3.18 V. Nilai positif menunjukkan tindak balas berlaku secara spontan.',
    level: 'Rendah',
    spmReference: 'SPM 2021 Kertas 1'
  },
  {
    id: 'exam-t5-b1-04',
    chapterNumber: 1,
    chapterTitle: 'Keseimbangan Redoks',
    subtopicCode: '1.3',
    question: 'Berdasarkan nilai E° berikut:\nZn²⁺/Zn = -0.76 V\nFe²⁺/Fe = -0.44 V\nCu²⁺/Cu = +0.34 V\nAg⁺/Ag = +0.80 V\nCampuran manakah yang akan menghasilkan tindak balas penyesaran spontan?',
    options: [
      'Kepingan Cu dimasukkan ke dalam larutan ZnSO₄',
      'Kepingan Fe dimasukkan ke dalam larutan ZnSO₄',
      'Kepingan Zn dimasukkan ke dalam larutan CuSO₄',
      'Kepingan Ag dimasukkan ke dalam larutan FeSO₄'
    ],
    answerIndex: 2,
    explanation: 'Logam dengan nilai E° lebih negatif (agen penurunan lebih kuat, iaitu Zn) boleh menyesarkan ion logam dengan nilai E° lebih positif (iaitu Cu²⁺) daripada larutannya.',
    level: 'Sederhana',
    spmReference: 'SPM 2023 Kertas 1'
  },
  {
    id: 'exam-t5-b1-05',
    chapterNumber: 1,
    chapterTitle: 'Keseimbangan Redoks',
    subtopicCode: '1.4',
    question: 'Semasa elektrolisis larutan kuprum(II) sulfat 0.001 mol dm⁻³ menggunakan elektrod karbon, apakah hasil yang terbentuk pada anod dan katod?',
    options: [
      'Anod: Gas Oksigen | Katod: Logam Kuprum',
      'Anod: Gas Sulfur Dioksida | Katod: Gas Hidrogen',
      'Anod: Gas Hidrogen | Katod: Logam Kuprum',
      'Anod: Logam Kuprum | Katod: Gas Oksigen'
    ],
    answerIndex: 0,
    explanation: 'Pada anod: ion OH⁻ dinyahcas kerana E° OH⁻ (+0.40 V) lebih negatif daripada E° SO₄²⁻ (+2.01 V), membebaskan gas oksigen O₂. Pada katod: ion Cu²⁺ (+0.34 V) dinyahcas berbanding H⁺ (0.00 V) menghasilkan enapan perang kuprum.',
    level: 'Tinggi (KBAT)',
    spmReference: 'SPM 2024 Kertas 1'
  },
  {
    id: 'exam-t5-b1-06',
    chapterNumber: 1,
    chapterTitle: 'Keseimbangan Redoks',
    subtopicCode: '1.4',
    question: 'Apakah perbezaan utama antara elektrolisis larutan NaCl cair dan elektrolisis larutan NaCl pekat (1.0 mol dm⁻³) pada anod karbon?',
    options: [
      'Larutan cair bebaskan gas Cl₂, larutan pekat bebaskan gas O₂',
      'Larutan cair bebaskan gas O₂, larutan pekat bebaskan gas Cl₂',
      'Kedua-dua larutan menghasilkan gas hidrogen di anod',
      'Kedua-dua larutan menghasilkan enapan natrium di anod'
    ],
    answerIndex: 1,
    explanation: 'Dalam larutan NaCl cair, ion OH⁻ dinyahcas (nilai E° lebih negatif) membebaskan gas O₂. Dalam larutan NaCl pekat, kepekatan ion Cl⁻ yang tinggi mengatasi nilai E° menyebabkan ion Cl⁻ terpilih dinyahcas membebaskan gas Cl₂.',
    level: 'Sederhana',
    spmReference: 'Trial MRSM 2023'
  },
  {
    id: 'exam-t5-b1-07',
    chapterNumber: 1,
    chapterTitle: 'Keseimbangan Redoks',
    subtopicCode: '1.5',
    question: 'Seorang murid ingin menyadur sudu besi dengan logam perak. Susunan radas yang betul ialah:',
    options: [
      'Anod: Sudu besi | Katod: Kepingan perak | Elektrolit: Larutan FeSO₄',
      'Anod: Kepingan perak | Katod: Sudu besi | Elektrolit: Larutan AgNO₃',
      'Anod: Kepingan perak | Katod: Sudu besi | Elektrolit: Larutan Fe(NO₃)₂',
      'Anod: Sudu besi | Katod: Kepingan perak | Elektrolit: Larutan AgNO₃'
    ],
    answerIndex: 1,
    explanation: 'Untuk penyaduran elektrik: Bahan penyadur (perak) mesti di ANOD, bahan yang hendak disadur (sudu besi) mesti di KATOD, dan elektrolit mesti larutan garam logam penyadur (AgNO₃).',
    level: 'Rendah',
    spmReference: 'SPM 2020 Kertas 1'
  },
  {
    id: 'exam-t5-b1-08',
    chapterNumber: 1,
    chapterTitle: 'Keseimbangan Redoks',
    subtopicCode: '1.5',
    question: 'Dalam penulenan kuprum tak tulen melalui elektrolisis, apakah yang berlaku kepada kepekatan ion Cu²⁺ dalam elektrolit CuSO₄ sepanjang eksperimen?',
    options: [
      'Kepekatan ion Cu²⁺ berkurang secara beransur-ansur',
      'Kepekatan ion Cu²⁺ meningkat dengan mendadak',
      'Kepekatan ion Cu²⁺ kekal tidak berubah',
      'Kepekatan ion Cu²⁺ menjadi sifar'
    ],
    answerIndex: 2,
    explanation: 'Kadar atom kuprum pada anod tak tulen melarut membentuk ion Cu²⁺ adalah sama dengan kadar ion Cu²⁺ dinyahcas dan dienapkan pada katod kuprum tulen, maka kepekatan ion Cu²⁺ kekal malar dan warna biru tidak berubah.',
    level: 'Sederhana',
    spmReference: 'SPM 2022 Kertas 1'
  },
  {
    id: 'exam-t5-b1-09',
    chapterNumber: 1,
    chapterTitle: 'Keseimbangan Redoks',
    subtopicCode: '1.6',
    question: 'Dalam pengekstrakan besi dalam relau bagas, apakah fungsi batu kapur (CaCO₃)?',
    options: [
      'Bertindak sebagai agen penurunan utama',
      'Menyingkirkan bendasing berasid (silikon dioksida, SiO₂) sebagai sangga',
      'Membekalkan gas oksigen untuk pembakaran kok',
      'Merendahkan takat lebur bijih besi'
    ],
    answerIndex: 1,
    explanation: 'Batu kapur terurai menghasilkan CaO (bes) yang bertindak balas dengan bendasing berasid SiO₂ membentuk sangga CaSiO₃ (kalsium silikat) yang terapung di atas leburan besi.',
    level: 'Sederhana',
    spmReference: 'SPM 2023 Kertas 1'
  },
  {
    id: 'exam-t5-b1-10',
    chapterNumber: 1,
    chapterTitle: 'Keseimbangan Redoks',
    subtopicCode: '1.6',
    question: 'Mengapakah kriolit (Na₃AlF₆) ditambah kepada leburan aluminium oksida (bauksit) dalam proses pengekstrakan aluminium Hall-Héroult?',
    options: [
      'Untuk merendahkan takat lebur aluminium oksida daripada ~2000 °C ke ~950 °C',
      'Untuk bertindak sebagai agen pengoksidaan bagi aluminium',
      'Untuk mengelakkan pembentukan sangga',
      'Untuk mengelakkan elektrod grafit daripada terhakis'
    ],
    answerIndex: 0,
    explanation: 'Kriolit ditambah untuk merendahkan takat lebur bauksit (Al₂O₃) daripada kira-kira 2072 °C kepada sekitar 950 °C, menjimatkan tenaga haba dan kos elektrik industri secara ketara.',
    level: 'Rendah',
    spmReference: 'SPM 2021 Kertas 1'
  },
  {
    id: 'exam-t5-b1-11',
    chapterNumber: 1,
    chapterTitle: 'Keseimbangan Redoks',
    subtopicCode: '1.7',
    question: 'Antara berikut, logam manakah yang apabila dililitkan pada paku besi akan MELINDUNGI paku daripada berkarat melalui mekanisme perlindungan korban?',
    options: [
      'Kuprum, Cu',
      'Timah, Sn',
      'Magnesium, Mg',
      'Plumbum, Pb'
    ],
    answerIndex: 2,
    explanation: 'Magnesium mempunyai nilai E° (-2.38 V) lebih negatif daripada ferum (-0.44 V). Mg lebih elektropositif dan akan terkorban menderma elektron terlebih dahulu menggantikan besi.',
    level: 'Sederhana',
    spmReference: 'SPM 2022 Kertas 1'
  },
  {
    id: 'exam-t5-b1-12',
    chapterNumber: 1,
    chapterTitle: 'Keseimbangan Redoks',
    subtopicCode: '1.7',
    question: 'Apakah formula kimia bagi karat yang terbentuk apabila besi terdedah kepada air dan oksigen?',
    options: [
      'Fe(OH)₂',
      'Fe₂O₃·xH₂O',
      'FeSO₄·7H₂O',
      'FeO'
    ],
    answerIndex: 1,
    explanation: 'Karat ialah ferum(III) oksida terhidrat dengan formula kimia Fe₂O₃·xH₂O di mana x ialah nombor molekul air penghabluran yang berubah-ubah.',
    level: 'Rendah',
    spmReference: 'SPM 2024 Kertas 1'
  },

  // ==========================================
  // BAB 2: SEBATIAN KARBON (12 SOALAN)
  // ==========================================
  {
    id: 'exam-t5-b2-01',
    chapterNumber: 2,
    chapterTitle: 'Sebatian Karbon',
    subtopicCode: '2.1',
    question: 'Apakah yang dimaksudkan dengan istilah hidrokarbon tak tepu?',
    options: [
      'Sebatian hidrokarbon yang hanya mengandungi ikatan kovalen tunggal C-C',
      'Sebatian karbon yang mengandungi atom karbon, hidrogen dan oksigen',
      'Sebatian hidrokarbon yang mempunyai sekurang-kurangnya satu ikatan ganda dua atau ganda tiga antara atom karbon',
      'Sebatian hidrokarbon yang tidak boleh melarut dalam air'
    ],
    answerIndex: 2,
    explanation: 'Hidrokarbon tak tepu mengandungi sekurang-kurangnya satu ikatan kovalen ganda dua (C=C, cth alkena) atau ganda tiga (C≡C, cth alkuna) antara atom-atom karbon.',
    level: 'Rendah',
    spmReference: 'SPM 2021 Kertas 1'
  },
  {
    id: 'exam-t5-b2-02',
    chapterNumber: 2,
    chapterTitle: 'Sebatian Karbon',
    subtopicCode: '2.2',
    question: 'Apakah formula molekul bagi sebatian alkana yang mempunyai 7 atom karbon?',
    options: [
      'C₇H₁₄',
      'C₇H₁₆',
      'C₇H₁₂',
      'C₇H₁₅OH'
    ],
    answerIndex: 1,
    explanation: 'Formula am alkana ialah C_n H_(2n+2). Untuk n = 7: C₇H_(2×7 + 2) = C₇H₁₆ (Heptana).',
    level: 'Rendah',
    spmReference: 'SPM 2023 Kertas 1'
  },
  {
    id: 'exam-t5-b2-03',
    chapterNumber: 2,
    chapterTitle: 'Sebatian Karbon',
    subtopicCode: '2.2',
    question: 'Apakah nama IUPAC bagi sebatian organik dengan formula CH₃-CH(CH₃)-CH₂-CH₃?',
    options: [
      'Butana',
      '2-metilbutana',
      '3-metilbutana',
      'Dimetilpropana'
    ],
    answerIndex: 1,
    explanation: 'Rantai karbon terpanjang mempunyai 4 karbon (butana). Kumpulan alkil cabang -CH₃ berada pada karbon ke-2, maka namanya ialah 2-metilbutana.',
    level: 'Sederhana',
    spmReference: 'SPM 2022 Kertas 1'
  },
  {
    id: 'exam-t5-b2-04',
    chapterNumber: 2,
    chapterTitle: 'Sebatian Karbon',
    subtopicCode: '2.3',
    question: 'Mengapakah pembakaran heksena, C₆H₁₂ menghasilkan nyalaan yang LEBIH BERJELAGA berbanding heksana, C₆H₁₄?',
    options: [
      'Heksena mempunyai takat didih lebih tinggi daripada heksana',
      'Peratusan jisim karbon per molekul dalam heksena lebih tinggi daripada heksana',
      'Heksena mengandungi oksigen dalam molekulnya',
      'Heksana terbakar secara tidak lengkap berbanding heksena'
    ],
    answerIndex: 1,
    explanation: '% Karbon dalam heksena = (72 / 84) × 100% = 85.7%. % Karbon dalam heksana = (72 / 86) × 100% = 83.7%. Peratusan karbon yang lebih tinggi menghasilkan jelaga karbon tak terbakar yang lebih tebal.',
    level: 'Sederhana',
    spmReference: 'Trial SBP 2024'
  },
  {
    id: 'exam-t5-b2-05',
    chapterNumber: 2,
    chapterTitle: 'Sebatian Karbon',
    subtopicCode: '2.3',
    question: 'Ujian kimia manakah yang paling sesuai untuk membezakan antara cecair heksana dan heksena di dalam makmal?',
    options: [
      'Menitiskan penunjuk fenolftalein',
      'Menitiskan air bromin ke dalam kedua-dua cecair',
      'Menambah ketulan natrium',
      'Menguji kekonduksian elektrik cecair'
    ],
    answerIndex: 1,
    explanation: 'Heksena (alkena) mengalami tindak balas penambahan dan menyahwarnakan warna perang air bromin kepada tanpa warna. Heksana (alkana) tidak bertindak balas dalam keadaan gelap.',
    level: 'Rendah',
    spmReference: 'SPM 2024 Kertas 1'
  },
  {
    id: 'exam-t5-b2-06',
    chapterNumber: 2,
    chapterTitle: 'Sebatian Karbon',
    subtopicCode: '2.3',
    question: 'Etena bertindak balas dengan stim (H₂O) pada suhu 300 °C, tekanan 60 atm dan mangkin asid fosforik menghasilkan:',
    options: [
      'Etana',
      'Etanol',
      'Asid etanoik',
      'Etil etanoat'
    ],
    answerIndex: 1,
    explanation: 'Tindak balas penghidratan etena (penambahan molekul air) menghasilkan etanol: C₂H₄ + H₂O → C₂H₅OH.',
    level: 'Sederhana',
    spmReference: 'SPM 2021 Kertas 1'
  },
  {
    id: 'exam-t5-b2-07',
    chapterNumber: 2,
    chapterTitle: 'Sebatian Karbon',
    subtopicCode: '2.4',
    question: 'Dalam penyediaan etanol melalui penapaian glukosa, mengapakah kelalang kon mesti disambung kepada tiub penghantar yang dicelup ke dalam air kapur?',
    options: [
      'Untuk membekalkan gas oksigen kepada sel yis',
      'Untuk memerangkap gas CO₂ dan menghalang oksigen udara daripada masuk (keadaan anaerobik)',
      'Untuk menguji kehadiran etanol yang meruap',
      'Untuk mengekalkan suhu bilik'
    ],
    answerIndex: 1,
    explanation: 'Air kapur mengesahkan pembebasan gas CO₂ (menjadi keruh) dan bertindak sebagai injap satu hala yang menghalang kemasukan oksigen supaya yis respirasi secara anaerobik (jika ada O₂, etanol teroksida kepada asid etanoik).',
    level: 'Tinggi (KBAT)',
    spmReference: 'Trial Kedah 2024'
  },
  {
    id: 'exam-t5-b2-08',
    chapterNumber: 2,
    chapterTitle: 'Sebatian Karbon',
    subtopicCode: '2.4',
    question: 'Apabila etanol dipanaskan bersama kalium dikromat(VI) berasid di bawah refluks, apakah perubahan warna pemerhatian dan hasil organik yang terbentuk?',
    options: [
      'Jingga bertukar ke hijau | Asid etanoik',
      'Ungu bertukar ke tidak berwarna | Etena',
      'Hijau bertukar ke jingga | Asid metanoik',
      'Kuning bertukar ke perang | Etil etanoat'
    ],
    answerIndex: 0,
    explanation: 'Ion Cr₂O₇²⁻ (jingga) diturunkan kepada ion Cr³⁺ (hijau) semasa etanol teroksida kepada asid etanoik (CH₃COOH).',
    level: 'Sederhana',
    spmReference: 'SPM 2023 Kertas 1'
  },
  {
    id: 'exam-t5-b2-09',
    chapterNumber: 2,
    chapterTitle: 'Sebatian Karbon',
    subtopicCode: '2.5',
    question: 'Tindak balas pengesteran antara asid butanoik dan etanol dengan kehadiran mangkin asid sulfurik pekat menghasilkan ester bernama:',
    options: [
      'Butil etanoat',
      'Etil butanoat',
      'Etil propanoat',
      'Butil propanoat'
    ],
    answerIndex: 1,
    explanation: 'Penamaan ester: Bahagian alkohol menjadi awalan alkil (-il) iaitu etanol → etil. Bahagian asid karboksilik menjadi akhiran alkanoat iaitu asid butanoik → butanoat. Hasilnya ialah etil butanoat.',
    level: 'Sederhana',
    spmReference: 'SPM 2022 Kertas 1'
  },
  {
    id: 'exam-t5-b2-10',
    chapterNumber: 2,
    chapterTitle: 'Sebatian Karbon',
    subtopicCode: '2.5',
    question: 'Apakah peranan asid sulfurik pekat (H₂SO₄) dalam tindak balas pengesteran?',
    options: [
      'Sebagai agen pengoksidaan',
      'Sebagai mangkin dan agen penyahhidratan',
      'Sebagai pelarut organik semata-mata',
      'Sebagai penunjuk perubahan warna'
    ],
    answerIndex: 1,
    explanation: 'H₂SO₄ pekat bertindak sebagai mangkin untuk mempercepatkan kadar tindak balas dan sebagai agen penyahhidratan yang menyerap molekul air H₂O, menggeser keseimbangan ke arah pembentukan ester.',
    level: 'Sederhana',
    spmReference: 'SPM 2020 Kertas 1'
  },
  {
    id: 'exam-t5-b2-11',
    chapterNumber: 2,
    chapterTitle: 'Sebatian Karbon',
    subtopicCode: '2.6',
    question: 'Berapakah bilangan isomer struktur yang mungkin bagi molekul butena, C₄H₈?',
    options: [
      '2 isomer',
      '3 isomer',
      '4 isomer',
      '5 isomer'
    ],
    answerIndex: 1,
    explanation: 'Butena mempunyai 3 isomer struktur: but-1-ena, but-2-ena, dan 2-metilpropena.',
    level: 'Sederhana',
    spmReference: 'SPM 2023 Kertas 1'
  },
  {
    id: 'exam-t5-b2-12',
    chapterNumber: 2,
    chapterTitle: 'Sebatian Karbon',
    subtopicCode: '2.6',
    question: 'Sebatian P dan Q mempunyai formula molekul yang sama C₄H₁₀O tetapi formula struktur yang berbeza. Apakah hubungan antara kedua-dua sebatian ini?',
    options: [
      'Siri homolog',
      'Isomer struktur',
      'Polimer dan monomer',
      'Alotrop'
    ],
    answerIndex: 1,
    explanation: 'Isomer struktur ialah sebatian-sebatian yang mempunyai formula molekul yang sama tetapi formula struktur yang berbeza.',
    level: 'Rendah',
    spmReference: 'SPM 2024 Kertas 1'
  },

  // ==========================================
  // BAB 3: TERMOKIMIA (12 SOALAN)
  // ==========================================
  {
    id: 'exam-t5-b3-01',
    chapterNumber: 3,
    chapterTitle: 'Termokimia',
    subtopicCode: '3.1',
    question: 'Tindak balas manakah antara berikut merupakan tindak balas endotermik?',
    options: [
      'Pembakaran arang kayu dalam udara',
      'Peneutralan asid hidroklorik dengan natrium hidroksida',
      'Penguraian terma kalsium karbonat, CaCO₃ melalui pemanasan kuat',
      'Penambahan serbuk zink ke dalam larutan kuprum(II) sulfat'
    ],
    answerIndex: 2,
    explanation: 'Penguraian terma kalsium karbonat (CaCO₃ → CaO + CO₂) menyerap tenaga haba berterusan daripada persekitaran (ΔH positif), maka ia adalah endotermik.',
    level: 'Rendah',
    spmReference: 'SPM 2021 Kertas 1'
  },
  {
    id: 'exam-t5-b3-02',
    chapterNumber: 3,
    chapterTitle: 'Termokimia',
    subtopicCode: '3.1',
    question: 'Dalam tindak balas eksotermik, apakah perbandingan antara tenaga pemutusan ikatan dan tenaga pembentukan ikatan?',
    options: [
      'Tenaga diserap untuk putuskan ikatan LEBIH KECIL daripada tenaga dibebaskan semasa bina ikatan baharu',
      'Tenaga diserap untuk putuskan ikatan LEBIH BESAR daripada tenaga dibebaskan semasa bina ikatan baharu',
      'Tenaga diserap untuk putuskan ikatan SAMA DENGAN tenaga dibebaskan',
      'Tiada ikatan kimia diputuskan atau terbentuk'
    ],
    answerIndex: 0,
    explanation: 'Eksotermik berlaku apabila jumlah tenaga yang diserap untuk memutuskan ikatan dalam bahan tindak balas adalah KURANG daripada jumlah tenaga yang dibebaskan semasa ikatan baharu terbentuk dalam hasil tindak balas.',
    level: 'Sederhana',
    spmReference: 'SPM 2022 Kertas 1'
  },
  {
    id: 'exam-t5-b3-03',
    chapterNumber: 3,
    chapterTitle: 'Termokimia',
    subtopicCode: '3.1',
    question: 'Pek sejuk segera mengandungi air dan satu pepejal kimia yang berasingan. Pepejal manakah yang paling sesuai digunakan dalam pek sejuk tersebut?',
    options: [
      'Kalsium klorida kontang, CaCl₂',
      'Ammonium nitrat, NH₄NO₃',
      'Magnesium sulfat kontang, MgSO₄',
      'Natrium hidroksida, NaOH'
    ],
    answerIndex: 1,
    explanation: 'Pelarutan garam ammonium nitrat (NH₄NO₃) dalam air ialah proses endotermik yang menyerap haba dari persekitaran, menyebabkan penurunan suhu yang ketara.',
    level: 'Rendah',
    spmReference: 'SPM 2024 Kertas 1'
  },
  {
    id: 'exam-t5-b3-04',
    chapterNumber: 3,
    chapterTitle: 'Termokimia',
    subtopicCode: '3.2',
    question: 'Apabila 50 cm³ larutan natrium sulfat 0.5 mol dm⁻³ dicampurkan kepada 50 cm³ larutan plumbum(II) nitrat 0.5 mol dm⁻³, suhu larutan meningkat sebanyak 3.0 °C. Berapakah jumlah haba yang dibebaskan? [Muatan haba tentu air, c = 4.2 J g⁻¹ °C⁻¹; Ketumpatan = 1.0 g cm⁻³]',
    options: [
      '630 J',
      '1,260 J',
      '3,150 J',
      '12,600 J'
    ],
    answerIndex: 1,
    explanation: 'Jumlah isi padu larutan = 50 + 50 = 100 cm³ → Jisim m = 100 g. Q = m × c × θ = 100 g × 4.2 J g⁻¹ °C⁻¹ × 3.0 °C = 1,260 J.',
    level: 'Sederhana',
    spmReference: 'SPM 2023 Kertas 1'
  },
  {
    id: 'exam-t5-b3-05',
    chapterNumber: 3,
    chapterTitle: 'Termokimia',
    subtopicCode: '3.2',
    question: 'Dalam eksperimen menentukan haba pemendakan argentum klorida, AgCl, mengapakah cawan polistirena digunakan dan bukannya bikar kaca?',
    options: [
      'Cawan polistirena bertindak balas dengan garam mendakan',
      'Polistirena ialah penebat haba yang baik untuk mengurangkan kehilangan haba ke persekitaran',
      'Polistirena menyerap haba daripada larutan',
      'Polistirena telus cahaya membolehkan mendakan diperhatikan'
    ],
    answerIndex: 1,
    explanation: 'Cawan polistirena merupakan penebat haba yang berkesan bagi mengurangkan kehilangan haba ke persekitaran semasa eksperimen termokimia.',
    level: 'Rendah',
    spmReference: 'SPM 2020 Kertas 1'
  },
  {
    id: 'exam-t5-b3-06',
    chapterNumber: 3,
    chapterTitle: 'Termokimia',
    subtopicCode: '3.2',
    question: 'Serbuk zink berlebihan ditambah kepada 50 cm³ larutan kuprum(II) sulfat 0.2 mol dm⁻³. Haba penyesaran ialah -210 kJ mol⁻¹. Berapakah kenaikan suhu larutan, θ? [c = 4.2 J g⁻¹ °C⁻¹; Jisim larutan = 50 g]',
    options: [
      '5.0 °C',
      '10.0 °C',
      '15.0 °C',
      '20.0 °C'
    ],
    answerIndex: 1,
    explanation: 'Mol Cu²⁺ = MV / 1000 = (0.2 × 50) / 1000 = 0.01 mol. Haba terbebas Q = 0.01 mol × 210,000 J mol⁻¹ = 2,100 J. Q = mcθ → 2,100 = 50 × 4.2 × θ → θ = 2100 / 210 = 10.0 °C.',
    level: 'Tinggi (KBAT)',
    spmReference: 'SPM 2022 Kertas 1'
  },
  {
    id: 'exam-t5-b3-07',
    chapterNumber: 3,
    chapterTitle: 'Termokimia',
    subtopicCode: '3.3',
    question: 'Haba peneutralan antara asid hidroklorik (asid kuat) dan natrium hidroksida (alkali kuat) ialah -57 kJ mol⁻¹. Mengapakah haba peneutralan antara asid etanoik (asid lemah) dan natrium hidroksida mempunyai nilai yang LEBIH RENDAH (cth: -54 kJ mol⁻¹)?',
    options: [
      'Asid etanoik menghasilkan garam yang tidak larut',
      'Sebahagian haba diserap untuk mengionkan molekul asid etanoik yang mengion separa dalam air',
      'Asid etanoik ialah asid diprotik',
      'Tindak balas asid etanoik berlaku terlalu pantas'
    ],
    answerIndex: 1,
    explanation: 'Asid etanoik ialah asid lemah yang mengion separa dalam air. Sebahagian tenaga haba yang terhasil diserap untuk memutuskan ikatan kovalen molekul asid etanoik supaya mengion lengkap menjadi ion H⁺.',
    level: 'Sederhana',
    spmReference: 'SPM 2023 Kertas 1'
  },
  {
    id: 'exam-t5-b3-08',
    chapterNumber: 3,
    chapterTitle: 'Termokimia',
    subtopicCode: '3.3',
    question: 'Eksperimen I: 50 cm³ HCl 1.0 mol dm⁻³ + 50 cm³ NaOH 1.0 mol dm⁻³ menghasilkan kenaikan suhu T₁.\nEksperimen II: 50 cm³ H₂SO₄ 1.0 mol dm⁻³ + 50 cm³ NaOH 1.0 mol dm⁻³ menghasilkan kenaikan suhu T₂.\nApakah perbandingan antara T₁ dan T₂?',
    options: [
      'T₂ sama dengan T₁',
      'T₂ adalah dua kali ganda T₁',
      'T₂ lebih tinggi daripada T₁ (kira-kira dua kali ganda)',
      'T₁ lebih tinggi daripada T₂'
    ],
    answerIndex: 2,
    explanation: 'H₂SO₄ ialah asid diprotik yang membekalkan dua kali ganda bilangan mol ion H⁺ bagi isi padu dan kepekatan yang sama, membebaskan kuantiti haba yang lebih tinggi dan menaikkan suhu larutan kira-kira dua kali ganda.',
    level: 'Tinggi (KBAT)',
    spmReference: 'Trial SBP 2023'
  },
  {
    id: 'exam-t5-b3-09',
    chapterNumber: 3,
    chapterTitle: 'Termokimia',
    subtopicCode: '3.4',
    question: 'Semasa pembakaran lengkap alkohol dalam siri homolog yang sama, semakin bertambah bilangan atom karbon per molekul alkohol, nilai haba pembakaran akan:',
    options: [
      'Semakin berkurang',
      'Semakin bertambah',
      'Kekal malar',
      'Menjadi sifar'
    ],
    answerIndex: 1,
    explanation: 'Semakin bertambah bilangan atom karbon, semakin banyak molekul CO₂ dan H₂O terbentuk. Lebih banyak ikatan kovalen baharu dibina membebaskan lebih banyak tenaga haba.',
    level: 'Rendah',
    spmReference: 'SPM 2021 Kertas 1'
  },
  {
    id: 'exam-t5-b3-10',
    chapterNumber: 3,
    chapterTitle: 'Termokimia',
    subtopicCode: '3.4',
    question: 'Langkah berjaga-jaga manakah yang TIDAK BOLEH meningkatkan kejituan nilai eksperimen haba pembakaran alkohol di makmal?',
    options: [
      'Menggunakan pengadang angin di sekeliling radas pembakaran',
      'Mengacau air dalam bekas kuprum secara berterusan dengan termometer',
      'Meletakkan pelita alkohol sejauh mungkin dari dasar tin kuprum',
      'Menimbang pelita alkohol serta-merta selepas api dipadamkan'
    ],
    answerIndex: 2,
    explanation: 'Meletakkan pelita jauh dari dasar tin akan menyebabkan lebih banyak haba hilang ke persekitaran. Pelita sepatutnya diletakkan sehampir mungkin dengan dasar bekas kuprum.',
    level: 'Sederhana',
    spmReference: 'SPM 2024 Kertas 1'
  },
  {
    id: 'exam-t5-b3-11',
    chapterNumber: 3,
    chapterTitle: 'Termokimia',
    subtopicCode: '3.4',
    question: 'Haba pembakaran etanol, C₂H₅OH ialah -1,376 kJ mol⁻¹. Berapakah nilai bahan api bagi etanol dalam unit kJ g⁻¹? [Jisim Molar Etanol = 46 g mol⁻¹]',
    options: [
      '14.9 kJ g⁻¹',
      '29.9 kJ g⁻¹',
      '46.0 kJ g⁻¹',
      '59.8 kJ g⁻¹'
    ],
    answerIndex: 1,
    explanation: 'Nilai bahan api = Haba pembakaran / Jisim Molar = 1,376 kJ mol⁻¹ / 46 g mol⁻¹ = 29.9 kJ g⁻¹.',
    level: 'Sederhana',
    spmReference: 'SPM 2022 Kertas 1'
  },
  {
    id: 'exam-t5-b3-12',
    chapterNumber: 3,
    chapterTitle: 'Termokimia',
    subtopicCode: '3.4',
    question: 'Bahan api manakah yang mempunyai nilai bahan api tertinggi dan merupakan bahan api paling mesra alam kerana hasil pembakarannya hanyalah air?',
    options: [
      'Gas Metana, CH₄',
      'Gas Hidrogen, H₂',
      'Petrol / Oktana, C₈H₁₈',
      'Arang batu / Karbon, C'
    ],
    answerIndex: 1,
    explanation: 'Gas hidrogen (H₂) mempunyai nilai bahan api tertinggi (~142 kJ g⁻¹) dan tidak membebaskan sebarang gas rumah hijau karbon dioksida kerana hasil tindak balas pembakarannya hanyalah air (2H₂ + O₂ → 2H₂O).',
    level: 'Rendah',
    spmReference: 'SPM 2023 Kertas 1'
  },

  // ==========================================
  // BAB 4: KIMIA POLIMER (12 SOALAN)
  // ==========================================
  {
    id: 'exam-t5-b4-01',
    chapterNumber: 4,
    chapterTitle: 'Kimia Polimer',
    subtopicCode: '4.1',
    question: 'Pasangan manakah yang memadankan polimer semula jadi dengan monomernya dengan betul?',
    options: [
      'Protein — Glukosa',
      'Kanji — Asid amino',
      'Getah Asli — Isoprena',
      'Selulosa — Asid lemak'
    ],
    answerIndex: 2,
    explanation: 'Getah asli dibina daripada monomer isoprena (2-metilbut-1,3-diena). Protein monomernya asid amino; Kanji monomernya glukosa.',
    level: 'Rendah',
    spmReference: 'SPM 2021 Kertas 1'
  },
  {
    id: 'exam-t5-b4-02',
    chapterNumber: 4,
    chapterTitle: 'Kimia Polimer',
    subtopicCode: '4.1',
    question: 'Apakah perbezaan utama antara polimer termoplastik dan polimer termoset?',
    options: [
      'Termoplastik boleh diacu semula berulang kali apabila dipanaskan, manakala termoset hangus dan tidak melebur bila dipanaskan semula',
      'Termoset larut dalam air, manakala termoplastik tidak larut',
      'Termoplastik mempunyai rangkai silang yang sangat banyak berbanding termoset',
      'Termoset sentiasa diperbuat daripada bahan semula jadi'
    ],
    answerIndex: 0,
    explanation: 'Polimer termoplastik tidak mempunyai rangkai silang, maka rantai polimernya mudah menggelongsor apabila dipanaskan dan boleh dikitar semula. Polimer termoset mempunyai rangkai silang tegar yang menghalang peleburan semula.',
    level: 'Sederhana',
    spmReference: 'SPM 2023 Kertas 1'
  },
  {
    id: 'exam-t5-b4-03',
    chapterNumber: 4,
    chapterTitle: 'Kimia Polimer',
    subtopicCode: '4.1',
    question: 'Monomer kloroetena (vinil klorida) mengalami pempolimeran penambahan membentuk:',
    options: [
      'Polietena (PE)',
      'Polivinil klorida (PVC)',
      'Polistirena (PS)',
      'Teflon (PTFE)'
    ],
    answerIndex: 1,
    explanation: 'Monomer kloroetena berpolimer membentuk polivinil klorida (PVC) yang digunakan secara meluas untuk membuat paip air dan penebat wayar elektrik.',
    level: 'Rendah',
    spmReference: 'SPM 2020 Kertas 1'
  },
  {
    id: 'exam-t5-b4-04',
    chapterNumber: 4,
    chapterTitle: 'Kimia Polimer',
    subtopicCode: '4.1',
    question: 'Pempolimeran kondensasi menghasilkan polimer sintetik berserta penyingkiran molekul kecil. Molekul kecil apakah yang biasanya disingkirkan semasa pembentukan Nilon-6,6?',
    options: [
      'Gas Ammonia, NH₃',
      'Gas Karbon Dioksida, CO₂',
      'Air, H₂O',
      'Gas Metana, CH₄'
    ],
    answerIndex: 2,
    explanation: 'Tindak balas kondensasi antara asid heksanadioik (-COOH) dan 1,6-heksanadiamina (-NH₂) menyingkirkan molekul air (H₂O) untuk membentuk ikatan amida dalam Nilon-6,6.',
    level: 'Sederhana',
    spmReference: 'SPM 2022 Kertas 1'
  },
  {
    id: 'exam-t5-b4-05',
    chapterNumber: 4,
    chapterTitle: 'Kimia Polimer',
    subtopicCode: '4.2',
    question: 'Mengapakah zarah getah dalam lateks tidak menggumpal secara spontan pada keadaan neutral?',
    options: [
      'Zarah getah bersaiz terlalu besar untuk berlanggar',
      'Membran protein zarah getah bercas negatif, menyebabkan zarah saling menolak',
      'Lateks mengandungi asid semulajadi yang menghalang penggumpalan',
      'Molekul getah terikat kuat dengan ion hidrogen'
    ],
    answerIndex: 1,
    explanation: 'Di permukaan luar membran protein setiap zarah lateks terdapat cas-cas negatif. Cas yang sama menyebabkan zarah-zarah getah saling menolak antara satu sama lain dan kekal terampai.',
    level: 'Sederhana',
    spmReference: 'SPM 2021 Kertas 1'
  },
  {
    id: 'exam-t5-b4-06',
    chapterNumber: 4,
    chapterTitle: 'Kimia Polimer',
    subtopicCode: '4.2',
    question: 'Apakah bahan kimia yang ditambah oleh penoreh getah ke dalam susu getah untuk MENGELAKKAN penggumpalan lateks semasa dihantar ke kilang?',
    options: [
      'Asid metanoik (asid formik)',
      'Larutan ammonia, NH₃',
      'Asid etanoik (cuka)',
      'Larutan natrium klorida, NaCl'
    ],
    answerIndex: 1,
    explanation: 'Larutan alkali ammonia (NH₃) membekalkan ion hidroksida OH⁻ yang meneutralkan sebarang asid laktik yang dihasilkan oleh bakteria, mengekalkan cas negatif pada zarah getah.',
    level: 'Rendah',
    spmReference: 'SPM 2024 Kertas 1'
  },
  {
    id: 'exam-t5-b4-07',
    chapterNumber: 4,
    chapterTitle: 'Kimia Polimer',
    subtopicCode: '4.3',
    question: 'Apakah perubahan struktur yang berlaku kepada rantai polimer getah asli semasa proses pemvulkanan bersama sulfur?',
    options: [
      'Ikatan ganda dua C=C digantikan dengan atom hidrogen',
      'Atom-atom sulfur membentuk rangkai silang sulfur antara rantai-rantai polimer getah',
      'Rantai polimer dipotong menjadi monomer pendek',
      'Kumpulan hidroksil terbentuk pada hujung rantai'
    ],
    answerIndex: 1,
    explanation: 'Atom sulfur bertindak balas pada tapak ikatan ganda dua C=C rantai poliisoprena membentuk rangkai silang sulfur (-S-S-) yang mengikat rantai polimer bersebelahan.',
    level: 'Sederhana',
    spmReference: 'SPM 2023 Kertas 1'
  },
  {
    id: 'exam-t5-b4-08',
    chapterNumber: 4,
    chapterTitle: 'Kimia Polimer',
    subtopicCode: '4.3',
    question: 'Perbandingan sifat manakah yang BENAR antara getah tervulkan dan getah tak tervulkan?',
    options: [
      'Getah tervulkan kurang anjal berbanding getah tak tervulkan',
      'Getah tervulkan lebih mudah melekit dan cair apabila dipanaskan',
      'Getah tervulkan lebih tahan haba, lebih keras dan lebih tahan terhadap pengoksidaan udara',
      'Getah tervulkan mudah mengembang dalam pelarut organik'
    ],
    answerIndex: 2,
    explanation: 'Rangkai silang sulfur menghalang rantai polimer menggelongsor bila ditarik dan menghalang penguraian haba, menjadikan getah tervulkan lebih anjal, lebih keras, tahan haba tinggi dan sukar dioksidakan.',
    level: 'Sederhana',
    spmReference: 'SPM 2022 Kertas 1'
  },
  {
    id: 'exam-t5-b4-09',
    chapterNumber: 4,
    chapterTitle: 'Kimia Polimer',
    subtopicCode: '4.3',
    question: 'Selain pemanasan bersama serbuk sulfur, kaedah alternatif manakah yang boleh digunakan di makmal untuk memvulkan getah?',
    options: [
      'Merendam kepingan getah dalam larutan disulfur diklorida (S₂Cl₂) dalam metilbenzena',
      'Merendam kepingan getah dalam asid hidroklorik pekat',
      'Memanaskan getah bersama serbuk karbon',
      'Menyinari getah dengan sinaran inframerah'
    ],
    answerIndex: 0,
    explanation: 'Disulfur diklorida (S₂Cl₂) yang dilarutkan dalam pelarut organik boleh memvulkan kepingan getah asli pada suhu bilik tanpa pemanasan tinggi.',
    level: 'Tinggi (KBAT)',
    spmReference: 'Trial Terengganu 2023'
  },
  {
    id: 'exam-t5-b4-10',
    chapterNumber: 4,
    chapterTitle: 'Kimia Polimer',
    subtopicCode: '4.4',
    question: 'Getah sintetik stirena-butadiena (SBR) sangat meluas digunakan untuk membuat:',
    options: [
      'Sarung tangan pembedahan nipis',
      'Tayar kenderaan bermotor',
      'Pelekat getah kertas',
      'Gelang getah pembungkus makanan'
    ],
    answerIndex: 1,
    explanation: 'Getah SBR mempunyai ketahanan lelasan (geseran) yang sangat tinggi dan tahan haba, menjadikannya pilihan utama untuk pembuatan tayar kereta dan tali sawat conveyor.',
    level: 'Rendah',
    spmReference: 'SPM 2020 Kertas 1'
  },
  {
    id: 'exam-t5-b4-11',
    chapterNumber: 4,
    chapterTitle: 'Kimia Polimer',
    subtopicCode: '4.4',
    question: 'Mengapakah pelupusan sisa plastik polimer secara pembakaran terbuka amat berbahaya kepada alam sekitar dan kesihatan manusia?',
    options: [
      'Ia membebaskan gas beracun seperti dioksin dan hidrogen klorida daripada PVC',
      'Ia mengurangkan paras gas karbon dioksida atmosfera',
      'Ia menyebabkan tanah menjadi beralkali',
      'Ia menghalang fotosintesis bakteria tanah'
    ],
    answerIndex: 0,
    explanation: 'Pembakaran plastik (terutama polimer berhalogen seperti PVC) menghasilkan gas berasid HCl dan toksin karsinogenik dioksin serta gas rumah hijau yang mencemarkan udara secara serius.',
    level: 'Sederhana',
    spmReference: 'SPM 2023 Kertas 1'
  },
  {
    id: 'exam-t5-b4-12',
    chapterNumber: 4,
    chapterTitle: 'Kimia Polimer',
    subtopicCode: '4.4',
    question: 'Inovasi teknologi polimer biodegradasi seperti asid polilaktik (PLA) dihasilkan daripada:',
    options: [
      'Pecahan petroleum mentah',
      'Hasil kanji jagung atau tebu yang boleh diurai oleh mikroorganisma',
      'Arang batu bitumen',
      'Getah sintetik tervulkan'
    ],
    answerIndex: 1,
    explanation: 'PLA dihasilkan daripada penapaian kanji tumbuhan (seperti jagung atau ubi kayu) dan boleh terurai secara biologi oleh tindakan bakteria tanah dalam tempoh beberapa bulan.',
    level: 'Rendah',
    spmReference: 'SPM 2024 Kertas 1'
  },

  // ==========================================
  // BAB 5: KIMIA KONSUMER & INDUSTRI (12 SOALAN)
  // ==========================================
  {
    id: 'exam-t5-b5-01',
    chapterNumber: 5,
    chapterTitle: 'Kimia Konsumer dan Industri',
    subtopicCode: '5.1',
    question: 'Proses penyediaan sabun melalui hidrolisis minyak tumbuhan oleh larutan alkali pekat dikenali sebagai:',
    options: [
      'Pengesteran',
      'Saponifikasi',
      'Pempolimeran',
      'Penapaian'
    ],
    answerIndex: 1,
    explanation: 'Saponifikasi ialah hidrolisis beralkali ke atas ester minyak/lemak (trigliserida) menggunakan larutan NaOH atau KOH pekat menghasilkan garam asid lemak (sabun) dan gliserol.',
    level: 'Rendah',
    spmReference: 'SPM 2021 Kertas 1'
  },
  {
    id: 'exam-t5-b5-02',
    chapterNumber: 5,
    chapterTitle: 'Kimia Konsumer dan Industri',
    subtopicCode: '5.1',
    question: 'Dalam eksperimen penyediaan sabun di makmal, mengapakah larutan tepu natrium klorida (NaCl) ditambah kepada campuran selepas pemanasan?',
    options: [
      'Untuk meneutralkan lebihan alkali NaOH',
      'Untuk merendahkan keterlarutan sabun dan memendakkannya sebagai pepejal',
      'Untuk memberi wangian kepada sabun',
      'Sebagai mangkin tindak balas saponifikasi'
    ],
    answerIndex: 1,
    explanation: 'Penambahan NaCl membekalkan kepekatan ion Na⁺ yang tinggi, menyebabkan keterlarutan sabun berkurang (kesan ion sepunya) lalu memendakkan sabun pepejal ke permukaan.',
    level: 'Sederhana',
    spmReference: 'SPM 2023 Kertas 1'
  },
  {
    id: 'exam-t5-b5-03',
    chapterNumber: 5,
    chapterTitle: 'Kimia Konsumer dan Industri',
    subtopicCode: '5.2',
    question: 'Semasa tindakan pencucian sabun ke atas kotoran gris pakaian, bahagian molekul sabun yang manakah akan larut ke dalam tompokan gris?',
    options: [
      'Kepala hidrofilik bercas ionik',
      'Ekor hidrofobik rantai hidrokarbon tak berkutub',
      'Kation natrium Na⁺',
      'Molekul air hidrasi'
    ],
    answerIndex: 1,
    explanation: 'Ekor hidrofobik molekul sabun terdiri daripada rantai hidrokarbon panjang yang tidak berkutub, maka ia larut dalam gris (kotoran organik tak berkutub). Kepala hidrofilik berkutub larut dalam air.',
    level: 'Rendah',
    spmReference: 'SPM 2022 Kertas 1'
  },
  {
    id: 'exam-t5-b5-04',
    chapterNumber: 5,
    chapterTitle: 'Kimia Konsumer dan Industri',
    subtopicCode: '5.2',
    question: 'Mengapakah detergen LEBIH BERKESAN mencuci pakaian di kawasan yang menggunakan air liat berbanding sabun?',
    options: [
      'Detergen menghasilkan mendakan kekat tak larut bersama ion kalsium dan magnesium',
      'Garam kalsium dan magnesium bagi detergen adalah larut dalam air dan tidak membentuk kekat',
      'Detergen mempunyai pH yang lebih berasid daripada sabun',
      'Sabun mempunyai ekor hidrofobik yang lebih pendek daripada detergen'
    ],
    answerIndex: 1,
    explanation: 'Air liat mengandungi ion Ca²⁺ dan Mg²⁺. Sabun bertindak balas membentuk kekat (scum) tak larut yang membazirkan sabun. Sebaliknya, garam sulfonat detergen dengan ion Ca²⁺/Mg²⁺ adalah larut dalam air, maka tiada kekat terbentuk.',
    level: 'Sederhana',
    spmReference: 'SPM 2024 Kertas 1'
  },
  {
    id: 'exam-t5-b5-05',
    chapterNumber: 5,
    chapterTitle: 'Kimia Konsumer dan Industri',
    subtopicCode: '5.3',
    question: 'Bahan tambah makanan manakah yang berfungsi sebagai pengantioksida untuk menghalang minyak masak daripada menjadi tengik?',
    options: [
      'Natrium benzoat',
      'Asid askorbik (Vitamin C)',
      'Mononatrium glutamat (MSG)',
      'Pektin'
    ],
    answerIndex: 1,
    explanation: 'Asid askorbik (Vitamin C) dan tokoferol (Vitamin E) ialah agen pengantioksida yang memperlahankan pengoksidaan lemak dan minyak dalam makanan berlemak.',
    level: 'Rendah',
    spmReference: 'SPM 2021 Kertas 1'
  },
  {
    id: 'exam-t5-b5-06',
    chapterNumber: 5,
    chapterTitle: 'Kimia Konsumer dan Industri',
    subtopicCode: '5.3',
    question: 'Natrium nitrit sering ditambah ke dalam sosej dan daging burger. Apakah fungsi utamanya?',
    options: [
      'Menghalang pertumbuhan bakteria Clostridium botulinum dan mengekalkan warna merah daging',
      'Memberi rasa manis tanpa kalori',
      'Menstabilkan emulsi minyak dan air',
      'Mempercepatkan pembekuan daging'
    ],
    answerIndex: 0,
    explanation: 'Natrium nitrit bertindak sebagai pengawet khusus yang membunuh bakteria maut Clostridium botulinum dan bertindak balas dengan mioglobin daging untuk mengekalkan warna merah segar.',
    level: 'Sederhana',
    spmReference: 'SPM 2023 Kertas 1'
  },
  {
    id: 'exam-t5-b5-07',
    chapterNumber: 5,
    chapterTitle: 'Kimia Konsumer dan Industri',
    subtopicCode: '5.4',
    question: 'Aspirin (asid asetilsalisilik) tidak sesuai diberikan kepada kanak-kanak dan pesakit gastrik/ulser perut kerana:',
    options: [
      'Aspirin boleh menyebabkan ketagihan narkotik seperti morfin',
      'Aspirin bersifat asid dan boleh menghakis dinding perut menyebabkan pendarahan dalaman',
      'Aspirin membunuh bakteria berfaedah dalam usus',
      'Aspirin menyebabkan kerosakan kelenjar tiroid'
    ],
    answerIndex: 1,
    explanation: 'Aspirin mengandungi kumpulan berfungsi asid karboksilik yang boleh merengsakan dan menghakis mukosa dinding perut, mengakibatkan luka dan pendarahan gastrik.',
    level: 'Sederhana',
    spmReference: 'SPM 2022 Kertas 1'
  },
  {
    id: 'exam-t5-b5-08',
    chapterNumber: 5,
    chapterTitle: 'Kimia Konsumer dan Industri',
    subtopicCode: '5.4',
    question: 'Seorang pesakit didiagnosis mengalami jangkitan bakteria tekak dan diberi antibiotik penisilin. Mengapakah doktor menegaskan ubat tersebut mesti dihabiskan mengikut tempoh ditetapkan?',
    options: [
      'Untuk mengelakkan ubat menjadi basi dalam simpanan',
      'Untuk memastikan semua bakteria dibunuh sepenuhnya bagi mengelakkan bakteria menjadi kebal (rintangan antibiotik)',
      'Kerana antibiotik tidak boleh diserap oleh badan jika diambil berasingan',
      'Untuk meningkatkan selera makan pesakit'
    ],
    answerIndex: 1,
    explanation: 'Kegagalan menghabiskan kitaran dos antibiotik membolehkan bakteria yang belum mati bermutasi dan menghasilkan keturunan bakteria yang kebal (rintangan antibiotik).',
    level: 'Rendah',
    spmReference: 'SPM 2024 Kertas 1'
  },
  {
    id: 'exam-t5-b5-09',
    chapterNumber: 5,
    chapterTitle: 'Kimia Konsumer dan Industri',
    subtopicCode: '5.4',
    question: 'Bahan kimia terlarang manakah yang sering dicampur secara haram ke dalam krim pemutih kulit dan boleh menyebabkan kerosakan buah pinggang serta sistem saraf?',
    options: [
      'Gliserol',
      'Merkuri',
      'Titanium dioksida',
      'Asid stearik'
    ],
    answerIndex: 1,
    explanation: 'Merkuri diharamkan dalam kosmetik kerana ia diserap melalui liang kulit ke dalam salur darah dan merosakkan buah pinggang, otak serta sistem saraf periferi.',
    level: 'Rendah',
    spmReference: 'SPM 2023 Kertas 1'
  },
  {
    id: 'exam-t5-b5-10',
    chapterNumber: 5,
    chapterTitle: 'Kimia Konsumer dan Industri',
    subtopicCode: '5.5',
    question: 'Satu nanometer bersamaan dengan:',
    options: [
      '10⁻³ meter',
      '10⁻⁶ meter',
      '10⁻⁹ meter',
      '10⁻¹² meter'
    ],
    answerIndex: 2,
    explanation: 'Awalan nano mewakili faktor 10⁻⁹. Jadi 1 nm = 1 × 10⁻⁹ meter.',
    level: 'Rendah',
    spmReference: 'SPM 2021 Kertas 1'
  },
  {
    id: 'exam-t5-b5-11',
    chapterNumber: 5,
    chapterTitle: 'Kimia Konsumer dan Industri',
    subtopicCode: '5.5',
    question: 'Apakah sifat istimewa grafen yang menjadikannya bahan revolusi abad ke-21?',
    options: [
      'Lapisan 2D setebal satu atom karbon, sangat kuat, pengalir haba dan elektrik terunggul',
      'Sebatian cecair yang mengalir tanpa geseran pada suhu bilik',
      'Polimer terbiodegradasi yang larut dalam air',
      'Logam berat yang menyerap semua radiasi nuklear'
    ],
    answerIndex: 0,
    explanation: 'Grafen ialah alotrop karbon 2D setebal satu atom karbon tersusun dalam kekisi heksagon sarang lebah. Ia 200 kali lebih kuat daripada keluli, sangat fleksibel, dan konduktor elektrik serta haba yang amat hebat.',
    level: 'Sederhana',
    spmReference: 'SPM 2023 Kertas 1'
  },
  {
    id: 'exam-t5-b5-12',
    chapterNumber: 5,
    chapterTitle: 'Kimia Konsumer dan Industri',
    subtopicCode: '5.5',
    question: 'Aplikasi Teknologi Hijau dalam pengurusan sisa kimia industri berteraskan prinsip utama iaitu:',
    options: [
      'Membuang sisa kimia ke laut dalam secara terancang',
      'Pencegahan penghasilan sisa, penjimatan tenaga, dan penggunaan bahan mentah boleh diperbaharui',
      'Menggantikan semua tindak balas kimia dengan proses mekanikal',
      'Meningkatkan suhu operasi kilang untuk mempercepatkan penguraian sisa'
    ],
    answerIndex: 1,
    explanation: 'Teknologi Hijau menekankan 12 prinsip kimia hijau merangkumi pencegahan sisa, kecekapan atom, reka bentuk sintesis kimia yang kurang berbahaya, dan kelestarian sumber.',
    level: 'Rendah',
    spmReference: 'SPM 2024 Kertas 1'
  }
];
