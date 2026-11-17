export interface ExpressBranch {
  id: string;
  title: string;
  subtopicRef: string;
  color: 'sky' | 'indigo' | 'emerald' | 'amber' | 'purple' | 'rose' | 'teal' | 'cyan';
  iconType: string;
  summary: string;
  corePoints: string[];
  formulasOrEquations?: string[];
  mnemonic?: string;
  keyTerms?: string[];
}

export interface ExpressNoteChapter {
  chapterId: string;
  form: 'T4' | 'T5';
  chapterNumber: number;
  title: string;
  theme: string;
  centralConcept: string;
  goldenFormulaOrRule: string;
  quickTips: string[];
  branches: ExpressBranch[];
}

export const NOTA_EXPRESS_DATA: Record<string, ExpressNoteChapter> = {
  // ==========================================
  // TINGKATAN 4 BAB 1: PENGENALAN KEPADA KIMIA
  // ==========================================
  't4-b1': {
    chapterId: 't4-b1',
    form: 'T4',
    chapterNumber: 1,
    title: 'Pengenalan kepada Kimia',
    theme: 'Asas Kimia',
    centralConcept: 'Memahami sains kimia sebagai kajian juzuk, struktur, sifat dan interaksi antara jirim melalui kaedah saintifik yang sistematik dan pengurusan makmal yang selamat.',
    goldenFormulaOrRule: 'Kaedah Saintifik: Pemerhatian → Inferens → Masalah → Hipotesis → Kawal Pemboleh Ubah → Eksperimen → Analisis Data → Kesimpulan.',
    quickTips: [
      'Bezakan antara Pemerhatian (apa yang deria lihat/hidu/sentuh) dan Inferens (kesimpulan logik awal berasaskan teori).',
      'Ingat sisa bahan kimia dengan pH < 5 atau pH > 9 TIDAK BOLEH dibuang ke dalam singki makmal!',
      'Merkuri tertumpah: Tabur serbuk sulfur terlebih dahulu untuk membentuk merkuri sulfida sebelum kutip dan laporkan kepada guru.',
    ],
    branches: [
      {
        id: 'b1-1',
        title: 'Perkembangan Kimia & Kepentingannya',
        subtopicRef: '1.1',
        color: 'sky',
        iconType: 'flask',
        summary: 'Kimia wujud dalam polimer, farmaseutikal, makanan, pertanian dan kosmetik seharian.',
        corePoints: [
          'Berasal daripada perkataan Arab <b>"al-kimiya"</b>.',
          'Penting dalam pemprosesan makanan (pengawet), perubatan (antibiotik), dan industri polimer plastik.',
          'Kerjaya utama: Ahli kimia analitik, jurutera petrokemia, ahli forensik, ahli farmasi.',
        ],
        keyTerms: ['Al-kimiya', 'Jirim', 'Interaksi Zarah'],
      },
      {
        id: 'b1-2',
        title: 'Kaedah Saintifik & Pemboleh Ubah',
        subtopicRef: '1.2',
        color: 'indigo',
        iconType: 'compass',
        summary: 'Proses penyiasatan sistematik untuk menyelesaikan masalah secara objektif.',
        corePoints: [
          '<b>Pemboleh ubah dimanipulasi (PM)</b>: Faktor yang sengaja diubah dalam eksperimen.',
          '<b>Pemboleh ubah bergerak balas (PB)</b>: Hasil yang diukur atau diperhatikan kesan perubahan PM.',
          '<b>Pemboleh ubah dimalarkan (PD)</b>: Faktor yang dikekalkan sama sepanjang eksperimen supaya ujian adil.',
          'Hipotesis menyatakan hubungan khusus antara PM dan PB yang boleh diuji.',
        ],
        mnemonic: 'M-B-D: Manipulasi (Ubah) → Bergerak balas (Ukur) → Dimalarkan (Tetap)',
        keyTerms: ['Hipotesis', 'Inferens', 'Pemerhatian'],
      },
      {
        id: 'b1-3',
        title: 'Alat Perlindungan Diri (PPE) Makmal',
        subtopicRef: '1.3',
        color: 'emerald',
        iconType: 'shield',
        summary: 'Peralatan keselamatan wajib bagi melindungi mata, kulit dan saluran pernafasan.',
        corePoints: [
          '<b>Kebuk wasap</b>: Menjalankan eksperimen menghasilkan gas beracun/meruap (cth: Cl₂, Br₂, NO₂).',
          '<b>Penyiram kecemasan & Pembilas mata</b>: Bilas percikan bahan kimia berbahaya dengan segera selama 15 minit.',
          '<b>Gogal keselamatan</b>: Melindungi mata daripada percikan bahan mengakis dan serpihan kaca.',
          '<b>Kot makmal & Sarung tangan nitril</b>: Melindungi pakaian dan kulit.',
        ],
        keyTerms: ['Kebuk Wasap', 'Pembilas Mata', 'Penyiram Kecemasan'],
      },
      {
        id: 'b1-4',
        title: 'Pengurusan Sisa & Kemalangan Makmal',
        subtopicRef: '1.4',
        color: 'rose',
        iconType: 'alert',
        summary: 'Prosedur pelupusan sisa bahan kimia dan tindak balas kecemasan tumpahan.',
        corePoints: [
          'Sisa pepejal, pelarut organik, logam berat dan bahan radioaktif <b>dilarang buang ke singki</b>.',
          'Sisa asid pekat/alkali pekat mesti dineutralkan dan dilarutkan dengan banyak air sebelum dilupuskan.',
          '<b>Tumpahan Merkuri</b>: Jangan sentuh! Tabur serbuk sulfur untuk bertindak balas membentuk sebatian tidak meruap, kemudian hubungi bomba/guru.',
          '<b>Kebakaran Makmal</b>: Gunakan selimut api untuk badan mangsa; pemadam api jenis ABC/CO₂ untuk api peralatan.',
        ],
        mnemonic: 'Tumpah Merkuri? Tabur SULFUR serta-merta!',
        keyTerms: ['Pelupusan Sisa', 'Tumpahan Merkuri', 'Selimut Api'],
      },
    ],
  },

  // ==========================================
  // TINGKATAN 4 BAB 2: JIRIM DAN STRUKTUR ATOM
  // ==========================================
  't4-b2': {
    chapterId: 't4-b2',
    form: 'T4',
    chapterNumber: 2,
    title: 'Jirim dan Struktur Atom',
    theme: 'Asas Kimia',
    centralConcept: 'Jirim terdiri daripada zarah halus dan diskret. Sifat fizik dan kimia jirim ditentukan oleh susunan zarah, takat perubahan keadaan, dan struktur subatom (proton, neutron, elektron).',
    goldenFormulaOrRule: 'Perwakilan Piawai: Z^A X | Nombor Nukleon A = Nombor Proton (p) + Bilangan Neutron (n) | Atom Neutral: Bilangan p = Bilangan e⁻.',
    quickTips: [
      'Semasa takat lebur / takat beku / takat didih: Suhu KEKAL kerana tenaga haba digunakan untuk mengatasi daya tarikan antara zarah (melebur) atau dibebaskan semasa pembentukan ikatan (membeku).',
      'Jangan keliru: Nombor Proton = bilangan proton sahaja. Nombor Nukleon = proton + neutron.',
      'Isotop mempunyai sifat KIMIA yang sama (bilangan elektron valens sama) tetapi sifat FIZIK berbeza (jisim berbeza).',
    ],
    branches: [
      {
        id: 'b2-1',
        title: 'Teori Kinetik Jirim & Perubahan Keadaan',
        subtopicRef: '2.1',
        color: 'sky',
        iconType: 'atom',
        summary: 'Jirim wujud sebagai pepejal, cecair dan gas dengan susunan zarah serta tenaga kinetik tersendiri.',
        corePoints: [
          '<b>Pepejal</b>: Zarah tersusun rapat dan teratur, bergetar dan berputar pada kedudukan tetap.',
          '<b>Cecair</b>: Rapat tetapi tidak teratur, menggelongsor antara satu sama lain.',
          '<b>Gas</b>: Berjauhan, rawak, bergerak pantas secara bebas.',
          'Lengkung pemanasan & penyejukan (cth: Naftalena): Suhu mendatar (takat lebur/takat beku) menunjukkan keseimbangan fasa.',
        ],
        mnemonic: 'Pemanasan: Serap Haba (Menang). Penyejukan: Bebas Haba (Tewas).',
        keyTerms: ['Peleburan', 'Pendidihan', 'Pemejalwapan', 'Kondensasi'],
      },
      {
        id: 'b2-2',
        title: 'Sejarah Perkembangan Model Atom',
        subtopicRef: '2.2',
        color: 'indigo',
        iconType: 'history',
        summary: 'Evolusi penemuan zarah subatom oleh 5 tokoh saintis terkemuka dunia.',
        corePoints: [
          '<b>John Dalton</b>: Sfera pejal bulat yang tidak boleh dibahagi lagi.',
          '<b>J.J. Thomson</b>: Menemui <b>elektron</b> (model puding plum bermuatan positif).',
          '<b>Ernest Rutherford</b>: Menemui <b>proton & nukleus</b> melalui eksperimen kepingan emas nipis.',
          '<b>Niels Bohr</b>: Elektron mengelilingi nukleus dalam <b>petala</b> tertentu.',
          '<b>James Chadwick</b>: Menemui <b>neutron</b> neutral dalam nukleus.',
        ],
        mnemonic: 'D-T-R-B-C: Dalton → Thomson (e⁻) → Rutherford (p⁺) → Bohr (Petala) → Chadwick (n⁰)',
        keyTerms: ['Proton', 'Elektron', 'Neutron', 'Nukleus'],
      },
      {
        id: 'b2-3',
        title: 'Zarah Subatom & Perwakilan Piawai Atom',
        subtopicRef: '2.3',
        color: 'emerald',
        iconType: 'table',
        summary: 'Susunan nombor nukleon, proton dan pengagihan elektron dalam petala atom.',
        corePoints: [
          '<b>Nombor Proton (Z)</b>: Bilangan proton di dalam nukleus atom suatu unsur.',
          '<b>Nombor Nukleon (A)</b>: Jumlah bilangan proton dan neutron di dalam nukleus.',
          'Atom neutral: Bilangan proton = bilangan elektron.',
          'Ion Positif (Kation): Derma elektron (p > e). Ion Negatif (Anion): Terima elektron (e > p).',
          'Susunan elektron: Petala 1 (maks 2), Petala 2 (maks 8), Petala 3 (maks 8) → Duplet / Oktet stabil.',
        ],
        formulasOrEquations: ['A = p + n', 'n = A - Z', 'Susunan Elektron: 2.8.1 (Na), 2.8.7 (Cl)'],
        keyTerms: ['Nombor Proton', 'Nombor Nukleon', 'Elektron Valens'],
      },
      {
        id: 'b2-4',
        title: 'Isotop & Kegunaan dalam Kehidupan',
        subtopicRef: '2.4',
        color: 'amber',
        iconType: 'zap',
        summary: 'Atom-atom unsur sama dengan nombor proton sama tetapi nombor nukleon berbeza.',
        corePoints: [
          'Sifat kimia sama (kerana bilangan elektron valens sama), sifat fizik berbeza (takat lebur/didih berbeza).',
          '<b>Kobalt-60</b>: Radioterapi membunuh sel kanser & pensterilan alat perubatan.',
          '<b>Iodin-131</b>: Rawatan kanser kelenjar tiroid.',
          '<b>Karbon-14</b>: Pentarikhan radiokarbon menganggar usia fosil/artifak.',
          '<b>Natrium-24</b>: Mengesan kebocoran paip bawah tanah.',
        ],
        formulasOrEquations: ['Jisim Atom Relatif (JAR) = Σ(% kelimpahan × jisim isotop) / 100'],
        keyTerms: ['Isotop', 'Kobalt-60', 'Iodin-131', 'Karbon-14'],
      },
    ],
  },

  // ==========================================
  // TINGKATAN 4 BAB 3: KONSEP MOL, FORMULA & PERSAMAAN
  // ==========================================
  't4-b3': {
    chapterId: 't4-b3',
    form: 'T4',
    chapterNumber: 3,
    title: 'Konsep Mol, Formula dan Persamaan Kimia',
    theme: 'Asas Kimia',
    centralConcept: 'Mol ialah jambatan pengiraan kimia yang menghubungkan bilangan zarah, jisim bahan, isi padu gas dan kepekatan larutan dengan persamaan kimia stoikiometri.',
    goldenFormulaOrRule: 'Tiga Formula Emas Mol: n = N / N_A | n = Jisim / Jisim Molar | n = V_gas / V_molar (22.4 STP / 24 Keadaan Bilik) | n = MV / 1000.',
    quickTips: [
      'Gunakan unit yang betul: V gas dalam dm³, V larutan dalam cm³ bahagi 1000, Jisim wajib dalam gram (g).',
      'Bahan lebih reaktif daripada H₂ (cth Mg) guna kaedah pemanasan mangkuk pijar. Logam kurang reaktif daripada H₂ (cth Cu, Pb) guna tiub pembakaran aliran gas hidrogen kering.',
      'Persamaan kimia mesti seimbang dari segi bilangan atom di kiri dan kanan sebelum membuat nisbah mol.',
    ],
    branches: [
      {
        id: 'b3-1',
        title: 'JAR, JMR & Pemalar Avogadro (N_A)',
        subtopicRef: '3.1',
        color: 'sky',
        iconType: 'calculator',
        summary: 'Skala jisim relatif berdasarkan atom rujukan piawai Karbon-12.',
        corePoints: [
          '1 mol sebarang bahan mengandungi <b>6.02 × 10²³ zarah</b> (Pemalar Avogadro, N_A).',
          'Jenis zarah: Atom (cth: Na, He), Molekul (cth: H₂O, O₂), Ion (cth: NaCl, CuSO₄).',
          'Jisim Molar (g mol⁻¹) bernilai nombor sama dengan JAR atau JMR unsur/sebatian.',
        ],
        formulasOrEquations: ['n = N / N_A (N_A = 6.02 × 10²³ mol⁻¹)'],
        keyTerms: ['Karbon-12', 'Pemalar Avogadro', 'Jisim Molar'],
      },
      {
        id: 'b3-2',
        title: 'Hubungan Mol dengan Jisim & Isi Padu Gas',
        subtopicRef: '3.2',
        color: 'indigo',
        iconType: 'layers',
        summary: 'Penukaran antara unit kuantiti mol dengan ukuran makroskopik makmal.',
        corePoints: [
          '<b>Jisim ke Mol</b>: Bahagi dengan Jisim Molar (JAR / JMR).',
          '<b>Mol ke Jisim</b>: Darab dengan Jisim Molar.',
          '<b>Isi Padu Molar Gas</b>: 22.4 dm³ mol⁻¹ pada STP, atau 24.0 dm³ mol⁻¹ pada keadaan bilik (suhu bilik & tekanan 1 atm).',
          '1 dm³ = 1000 cm³ = 1 Liter.',
        ],
        formulasOrEquations: ['Jisim (g) = n × JMR', 'Isi Padu Gas (dm³) = n × V_molar'],
        mnemonic: 'Piramid Mol: Mol di tengah! Ke kiri zarah, ke atas jisim, ke kanan gas.',
        keyTerms: ['STP (22.4 dm³)', 'Keadaan Bilik (24 dm³)', 'Isi Padu Molar'],
      },
      {
        id: 'b3-3',
        title: 'Formula Empirik vs Formula Molekul',
        subtopicRef: '3.3',
        color: 'emerald',
        iconType: 'file-text',
        summary: 'Menentukan nisbah teringkas dan bilangan atom sebenar dalam molekul.',
        corePoints: [
          '<b>Formula Empirik (FE)</b>: Formula kimia yang menunjukkan <b>nisbah nombor bulat teringkas</b> atom setiap unsur.',
          '<b>Formula Molekul (FM)</b>: Formula kimia yang menunjukkan <b>bilangan sebenar</b> atom setiap unsur dalam satu molekul.',
          'Hubungan: <b>FM = (FE)ₙ</b>, dengan n = JMR Sebatian / Jisim FE.',
          '<b>Eksperimen MgO</b>: Mangkuk pijar dibuka sekali-sekala untuk membenarkan O₂ masuk, dan ditutup segera mengelakkan asap putih terbebas.',
          '<b>Eksperimen CuO</b>: Aliran berterusan gas H₂ kering untuk menurunkan oksida kuprum kepada kuprum perang.',
        ],
        formulasOrEquations: ['FM = (FE)ₙ', 'n = JMR / Jisim FE'],
        keyTerms: ['Formula Empirik', 'Formula Molekul', 'Mangkuk Pijar', 'Tiub Pembakaran'],
      },
      {
        id: 'b3-4',
        title: 'Persamaan Kimia & Stoikiometri',
        subtopicRef: '3.4',
        color: 'amber',
        iconType: 'check-circle',
        summary: 'Penterjemahan tindak balas kimia ke dalam bentuk persamaan seimbang & nisbah mol.',
        corePoints: [
          'Keadaan fizik: (p) pepejal, (c) cecair, (g) gas, (ak) akueus / larutan berair.',
          'Langkah pengiraan: 1. Tulis persamaan seimbang → 2. Tukar maklumat soalan kepada mol → 3. Bandingkan nisbah mol → 4. Tukar mol kepada unit jawapan yang diminta.',
          'Hukum Keabadian Jisim: Jisim bahan tindak balas sama dengan jisim hasil tindak balas.',
        ],
        formulasOrEquations: ['2H₂ + O₂ → 2H₂O (Nisbah mol: 2 mol H₂ : 1 mol O₂ : 2 mol H₂O)'],
        keyTerms: ['Persamaan Seimbang', 'Stoikiometri', 'Nisbah Mol'],
      },
    ],
  },

  // ==========================================
  // TINGKATAN 4 BAB 4: JADUAL BERKALA UNSUR
  // ==========================================
  't4-b4': {
    chapterId: 't4-b4',
    form: 'T4',
    chapterNumber: 4,
    title: 'Jadual Berkala Unsur',
    theme: 'Asas Kimia',
    centralConcept: 'Unsur disusun mengikut tertib pertambahan nombor proton. Kumpulan ditentukan oleh bilangan elektron valens, manakala Kala ditentukan oleh bilangan petala yang berisi elektron.',
    goldenFormulaOrRule: 'Kumpulan = Bilangan Elektron Valens (Jika valens 3-8, tambah 10) | Kala = Bilangan Petala Berisi Elektron.',
    quickTips: [
      'Menuruni Kumpulan 1: Kereaktifan BERTAMBAH kerana jejari atom bertambah, daya tarikan nukleus terhadap elektron valens semakin lemah, lebih mudah menderma 1 elektron.',
      'Menuruni Kumpulan 17: Kereaktifan BERKURANG kerana jejari atom bertambah, daya tarikan nukleus semakin lemah, lebih sukar menarik 1 elektron ke dalam petala.',
      'Merentasi Kala 3: Sifat oksida berubah daripada Oksida Bes (Na₂O, MgO) → Oksida Amfoterik (Al₂O₃) → Oksida Asid (SiO₂, P₄O₁₀, SO₂, Cl₂O₇).',
    ],
    branches: [
      {
        id: 'b4-1',
        title: 'Prinsip Susunan Jadual Berkala',
        subtopicRef: '4.1 & 4.2',
        color: 'sky',
        iconType: 'table',
        summary: 'Asas susunan moden berdasarkan nombor proton oleh Henry Moseley.',
        corePoints: [
          'Lajur menegak dipanggil <b>Kumpulan</b> (1 hingga 18).',
          'Baris mengufuk dipanggil <b>Kala</b> (1 hingga 7).',
          'Atom dengan susunan 2.8.3 berada pada Kumpulan 13 (3 + 10) dan Kala 3 (3 petala).',
        ],
        keyTerms: ['Kumpulan', 'Kala', 'Elektron Valens', 'Petala'],
      },
      {
        id: 'b4-2',
        title: 'Kumpulan 18: Gas Adi',
        subtopicRef: '4.3',
        color: 'indigo',
        iconType: 'shield',
        summary: 'Unsur lengai secara kimia kerana mencapai susunan elektron duplet atau oktet stabil.',
        corePoints: [
          'Contoh: Helium (He: 2 duplet), Neon, Argon, Kripton, Ksenon, Radon (oktet 8).',
          'Wujud sebagai gas <b>monoatom</b> (zarah tunggal) dan tidak membentuk sebatian pada keadaan biasa.',
          'Helium: Mengisi belon cuaca (tidak mudah terbakar). Argon: Mengisi mentol filamen.',
        ],
        keyTerms: ['Duplet Stabil', 'Oktet Stabil', 'Monoatom', 'Lengai'],
      },
      {
        id: 'b4-3',
        title: 'Kumpulan 1: Logam Alkali',
        subtopicRef: '4.4',
        color: 'emerald',
        iconType: 'flame',
        summary: 'Logam lembut, ketumpatan rendah, menderma 1 elektron valens membentuk ion +1.',
        corePoints: [
          'Li, Na, K, Rb, Cs, Fr. Disimpan dalam minyak parafin untuk elak bertindak balas dengan O₂ dan wap air.',
          'Tindak balas dengan air menghasilkan <b>larutan hidroksida beralkali (merah jambu dengan fenolftalein) + gas H₂</b>.',
          'Menuruni kumpulan: Takat lebur/didih menurun (ikatan logam lemah), kereaktifan meningkat.',
        ],
        formulasOrEquations: ['2Na + 2H₂O → 2NaOH + H₂', '4Na + O₂ → 2Na₂O'],
        mnemonic: 'Kumpulan 1: Makin Ke Bawah Makin "Ganas" / Reaktif!',
        keyTerms: ['Logam Alkali', 'Minyak Parafin', 'Hidroksida'],
      },
      {
        id: 'b4-4',
        title: 'Kumpulan 17: Halogen',
        subtopicRef: '4.5',
        color: 'amber',
        iconType: 'alert',
        summary: 'Bukan logam wujud sebagai molekul dwiatom (F₂, Cl₂, Br₂, I₂), menerima 1 elektron.',
        corePoints: [
          'Warna & keadaan fizik pada suhu bilik: F₂ (gas kuning pucat), Cl₂ (gas kuning kehijauan), Br₂ (cecair perang kemerahan), I₂ (pepejal ungu kehitaman).',
          'Menuruni kumpulan: Takat lebur/didih meningkat (daya Van der Waals kuat), kereaktifan menurun.',
          '<b>Tindak Balas Penyesaran</b>: Halogen di atas yang lebih reaktif boleh menyesarkan ion halida di bawahnya daripada larutan garamnya.',
        ],
        formulasOrEquations: ['Cl₂ + 2KBr → 2KCl + Br₂ (Klorin sesarkan bromin)'],
        keyTerms: ['Halogen', 'Dwiatom', 'Penyesaran Halogen'],
      },
      {
        id: 'b4-5',
        title: 'Unsur Kala 3 & Unsur Peralihan',
        subtopicRef: '4.6 & 4.7',
        color: 'purple',
        iconType: 'zap',
        summary: 'Perubahan sifat fizik/kimia merentasi kala dan keistimewaan logam peralihan.',
        corePoints: [
          'Merentasi Kala 3: Jejari atom mengecil, keelektronegatifan bertambah, sifat logam berubah ke bukan logam.',
          '<b>Al₂O₃ ialah oksida amfoterik</b>: Bertindak balas dengan kedua-dua asid dan alkali membentuk garam dan air.',
          '<b>Ciri Khas Unsur Peralihan</b>: 1. Membentuk sebatian berwarna (Fe²⁺ hijau, Fe³⁺ perang, Cu²⁺ biru); 2. Menunjukkan lebih daripada satu nombor pengoksidaan; 3. Bertindak sebagai <b>mangkin</b> dalam industri (cth Fe dalam Proses Haber, V₂O₅ dalam Proses Sentuh); 4. Membentuk ion kompleks.',
        ],
        mnemonic: 'Ciri Peralihan: Warna-warni, Pelbagai Nombor Pengoksidaan, Mangkin Hebat!',
        keyTerms: ['Amfoterik (Al₂O₃)', 'Mangkin', 'Sebatian Berwarna'],
      },
    ],
  },

  // ==========================================
  // TINGKATAN 4 BAB 5: IKATAN KIMIA
  // ==========================================
  't4-b5': {
    chapterId: 't4-b5',
    form: 'T4',
    chapterNumber: 5,
    title: 'Ikatan Kimia',
    theme: 'Asas Kimia',
    centralConcept: 'Atom bergabung antara satu sama lain untuk mencapai susunan elektron duplet atau oktet yang stabil melalui pemindahan elektron (ikatan ion) atau perkongsian elektron (ikatan kovalen, datif, hidrogen, logam).',
    goldenFormulaOrRule: 'Ikatan Ion: Logam (derma e⁻) + Bukan Logam (terima e⁻) | Ikatan Kovalen: Bukan Logam + Bukan Logam (kongsi sepasang e⁻).',
    quickTips: [
      'Sebatian Ion: Mengkonduksi elektrik dalam keadaan LEBURAN dan AKUEUS sahaja (ion bergerak bebas), tetapi tidak dalam pepejal (ion terikat kuat pada kekisi).',
      'Sebatian Kovalen: Molekul neutral, TIDAK mengkonduksi elektrik dalam semua keadaan (tiada ion bebas).',
      'Ikatan Hidrogen wujud apabila atom H terikat secara kovalen kepada atom yang SANGAT ELEKTRONEGATIF (iaitu N, O, atau F sahaja).',
    ],
    branches: [
      {
        id: 'b5-1',
        title: 'Asas Pembentukan Ikatan & Kestabilan',
        subtopicRef: '5.1',
        color: 'sky',
        iconType: 'link',
        summary: 'Tujuan pembentukan ikatan adalah untuk mencapai susunan elektron gas adi.',
        corePoints: [
          'Atom membuang, menerima atau berkongsi elektron valens.',
          'Susunan <b>duplet stabil</b> (2 elektron di petala pertama, cth He).',
          'Susunan <b>oktet stabil</b> (8 elektron di petala terluar, cth Ne, Ar).',
        ],
        keyTerms: ['Duplet', 'Oktet', 'Kestabilan Elektron'],
      },
      {
        id: 'b5-2',
        title: 'Ikatan Ion (Pemindahan Elektron)',
        subtopicRef: '5.2',
        color: 'indigo',
        iconType: 'zap',
        summary: 'Daya tarikan elektrostatik yang kuat antara ion positif (kation) dan ion negatif (anion).',
        corePoints: [
          'Berlaku antara atom <b>logam</b> (derma elektron) dan <b>bukan logam</b> (terima elektron).',
          'Contoh: Na (2.8.1) derma 1e⁻ → Na⁺ (2.8); Cl (2.8.7) terima 1e⁻ → Cl⁻ (2.8.8) membentuk NaCl.',
          'Sifat: Takat lebur/didih sangat tinggi kerana daya tarikan elektrostatik kuat, larut dalam air, mengkonduksikan elektrik dalam leburan/akueus.',
        ],
        formulasOrEquations: ['Na → Na⁺ + e⁻', 'Cl + e⁻ → Cl⁻', 'Na⁺ + Cl⁻ → NaCl'],
        mnemonic: 'Logam Derma (+), Bukan Logam Terima (-). Tarik Kuat = Ikatan Ion!',
        keyTerms: ['Elektrostatik', 'Kation', 'Anion', 'Kekisi Kristal'],
      },
      {
        id: 'b5-3',
        title: 'Ikatan Kovalen (Perkongsian Elektron)',
        subtopicRef: '5.3',
        color: 'emerald',
        iconType: 'layers',
        summary: 'Perkongsian sepasang atau lebih elektron antara atom-atom bukan logam.',
        corePoints: [
          '<b>Ikatan Tunggal</b>: Kongsi 1 pasang elektron (cth: H₂, Cl₂, CH₄, H₂O).',
          '<b>Ikatan Ganda Dua</b>: Kongsi 2 pasang elektron (cth: O₂, CO₂).',
          '<b>Ikatan Ganda Tiga</b>: Kongsi 3 pasang elektron (cth: N₂).',
          'Sifat: Takat lebur/didih rendah (daya tarikan Van der Waals antara molekul lemah), larut dalam pelarut organik, tidak konduksi elektrik.',
        ],
        keyTerms: ['Ikatan Tunggal', 'Ganda Dua', 'Ganda Tiga', 'Daya Van der Waals'],
      },
      {
        id: 'b5-4',
        title: 'Ikatan Hidrogen, Datif & Logam',
        subtopicRef: '5.4 - 5.7',
        color: 'amber',
        iconType: 'sparkles',
        summary: 'Jenis ikatan lanjutan yang mempengaruhi takat didih air dan sifat logam.',
        corePoints: [
          '<b>Ikatan Hidrogen</b>: Daya tarikan antara atom H dengan atom N, O, atau F yang bertenaga keelektronegatifan tinggi. Menyebabkan takat didih air tinggi & ais kurang tumpat daripada air cecair.',
          '<b>Ikatan Datif (Koordinat)</b>: Ikatan kovalen di mana kedua-dua elektron yang dikongsi disumbangkan oleh satu atom sahaja (cth: ion hidronium H₃O⁺, ion ammonium NH₄⁺).',
          '<b>Ikatan Logam</b>: Daya tarikan elektrostatik antara <b>lautan elektron</b> yang dinyahsetempatkan dengan ion logam bercas positif.',
        ],
        mnemonic: 'Ingat Ikatan Hidrogen: "NOF" (Nitrogen, Oksigen, Fluorin)',
        keyTerms: ['Ikatan Hidrogen (NOF)', 'Ikatan Datif', 'Lautan Elektron'],
      },
    ],
  },

  // ==========================================
  // TINGKATAN 4 BAB 6: ASID, BES DAN GARAM
  // ==========================================
  't4-b6': {
    chapterId: 't4-b6',
    form: 'T4',
    chapterNumber: 6,
    title: 'Asid, Bes dan Garam',
    theme: 'Interaksi Jirim',
    centralConcept: 'Asid mengion dalam air menghasilkan ion H⁺, manakala alkali menghasilkan ion OH⁻. Garam terbentuk apabila ion H⁺ daripada asid digantikan oleh ion logam atau ion ammonium.',
    goldenFormulaOrRule: 'Semua Garam NO₃⁻ & SPA Larut! | Klorida: PBA tak larut | Sulfat: PBC tak larut | Karbonat: Semua tak larut KECUALI SPA! | Titratan: (M_a × V_a) / a = (M_b × V_b) / b.',
    quickTips: [
      'Garam Larut disediakan melalui Tindak Balas Peneutralan (Asid + Alkali/Oksida Logam/Karbonat Logam). Jika garam SPA → Kaedah Pentitratan Asid-Alkali.',
      'Garam Tak Larut disediakan HANYA melalui Kaedah Pemendakan (Tindak balas Penguraian Ganda Dua: Larut + Larut → Mendakan + Larut).',
      'Ujian Kation: Ion Pb²⁺ dan Al³⁺ kedua-duanya mendakan putih larut dalam NaOH berlebihan. Untuk membezakan: Tambah KI (Pb²⁺ beri mendakan kuning PbI₂; Al³⁺ kekal tiada mendakan).',
    ],
    branches: [
      {
        id: 'b6-1',
        title: 'Sifat Asid, Alkali & Skala pH',
        subtopicRef: '6.1 - 6.3',
        color: 'sky',
        iconType: 'flask',
        summary: 'Takrifan keasidan, kealkalian dan ukuran kepekatan ion H⁺ dan OH⁻.',
        corePoints: [
          '<b>Asid</b>: Bahan kimia yang mengion dalam air menghasilkan <b>ion hidrogen, H⁺</b> (atau ion hidronium H₃O⁺).',
          '<b>Alkali</b>: Bes yang larut dalam air dan mengion menghasilkan <b>ion hidroksida, OH⁻</b>.',
          'Asid & alkali HANYA menunjukkan sifat kimianya dengan kehadiran <b>air</b> (kerana air membolehkan pengionan berlaku).',
          'pH = -log[H⁺] | Nilai pH rendah = kepekatan H⁺ tinggi (asid kuat, cth HCl, HNO₃).',
        ],
        formulasOrEquations: ['pH = -log[H⁺]', 'pOH = -log[OH⁻]', 'pH + pOH = 14'],
        keyTerms: ['Ion Hidrogen (H⁺)', 'Ion Hidroksida (OH⁻)', 'Skala pH'],
      },
      {
        id: 'b6-2',
        title: 'Larutan Piawai, Kemolaran & Titratan',
        subtopicRef: '6.4 - 6.6',
        color: 'indigo',
        iconType: 'calculator',
        summary: 'Penyediaan larutan kepekatan jitu dan analisis kuantitatif peneutralan.',
        corePoints: [
          '<b>Larutan Piawai</b>: Larutan yang kepekatannya diketahui secara tepat menggunakan kelalang volumetrik.',
          '<b>Pencairan</b>: Menambah air mengurangkan kepekatan tetapi kuantiti mol zat terlarut tetap sama: <b>M₁V₁ = M₂V₂</b>.',
          '<b>Peneutralan</b>: Tindak balas asid + alkali menghasilkan garam + air.',
          'Takat akhir ditandai oleh perubahan warna penunjuk (Fenolftalein: merah jambu ke tidak berwarna dalam asid; Metil jingga: kuning ke jingga).',
        ],
        formulasOrEquations: ['M = (m / JMR) × (1000 / V)', 'M₁V₁ = M₂V₂', '(M_a × V_a) / a = (M_b × V_b) / b'],
        mnemonic: 'Rumus Titratan Keramat: MaVa / a = MbVb / b',
        keyTerms: ['Larutan Piawai', 'Pencairan (M₁V₁=M₂V₂)', 'Pentitratan'],
      },
      {
        id: 'b6-3',
        title: 'Keterlarutan Garam (Formula Mnemonic)',
        subtopicRef: '6.7',
        color: 'emerald',
        iconType: 'table',
        summary: 'Hukum keterlarutan garam dalam air yang wajib dihafal untuk SPM.',
        corePoints: [
          '<b>Semua Nitrat (NO₃⁻)</b>: LARUT.',
          '<b>Semua Garam SPA</b> (Natrium, Kalium, Ammonium): LARUT.',
          '<b>Garam Klorida (Cl⁻)</b>: Semua larut KECUALI <b>P-B-A</b> (Plumbum PbCl₂, Merkuri Hg₂Cl₂, Perak AgCl).',
          '<b>Garam Sulfat (SO₄²⁻)</b>: Semua larut KECUALI <b>P-B-C</b> (Plumbum PbSO₄, Barium BaSO₄, Kalsium CaSO₄).',
          '<b>Garam Karbonat (CO₃²⁻)</b>: Semua TAK LARUT kecuali garam SPA.',
          'PbCl₂ dan PbI₂: Larut dalam air panas membentuk larutan tanpa warna, menghablur semula sebagai mendakan apabila sejuk!',
        ],
        mnemonic: 'NO₃ & SPA: Semua Larut! Klorida: Tak larut P-B-A. Sulfat: Tak larut P-B-C.',
        keyTerms: ['Garam Larut', 'Garam Tak Larut', 'P-B-A', 'P-B-C'],
      },
      {
        id: 'b6-4',
        title: 'Penyediaan Garam di Makmal',
        subtopicRef: '6.8 & 6.9',
        color: 'amber',
        iconType: 'layers',
        summary: 'Kaedah memilih reagen dan radas mengikut jenis garam yang ingin dihasilkan.',
        corePoints: [
          '<b>Garam Larut BUKAN SPA</b> (cth: ZnSO₄, CuSO₄): Asid + Logam reaktif / Oksida logam / Karbonat logam berlebihan → Turas → Panaskan hasil turasan sehingga tepu → Sejukkan untuk penghabluran → Keringkan antara kertas turas.',
          '<b>Garam Larut SPA</b> (cth: NaCl, KNO₃, (NH₄)₂SO₄): Asid + Alkali menggunakan kaedah <b>Pentitratan Asid-Alkali</b> dengan penunjuk (kemudian ulang tanpa penunjuk).',
          '<b>Garam Tak Larut</b> (cth: BaSO₄, PbI₂): Kaedah <b>Pemendakan</b> (Campurkan dua larutan garam larut → Turas mendakan → Bilas dengan air suling → Keringkan).',
        ],
        keyTerms: ['Penghabluran Semula', 'Turasan', 'Pemendakan'],
      },
      {
        id: 'b6-5',
        title: 'Analisis Kualitatif (Ujian Kation & Anion)',
        subtopicRef: '6.10 & 6.11',
        color: 'rose',
        iconType: 'sparkles',
        summary: 'Mengenal pasti komposisi ion melalui warna mendakan, kesan haba dan ujian gas.',
        corePoints: [
          '<b>Ujian Anion</b>: CO₃²⁻ (Asid cair → gas CO₂ keruhkan air kapur); Cl⁻ (HNO₃ cair + AgNO₃ → mendakan putih AgCl); SO₄²⁻ (HCl cair + BaCl₂ → mendakan putih BaSO₄); NO₃⁻ (H₂SO₄ cair + FeSO₄ + H₂SO₄ pekat → <b>Cincin Perang</b>).',
          '<b>Warna Kation</b>: Cu²⁺ (Biru), Fe²⁺ (Hijau pucat), Fe³⁺ (Perang), yang lain tidak berwarna.',
          '<b>NaOH & NH₃</b>: ZAP (Zn²⁺, Al³⁺, Pb²⁺ mendakan putih larut dalam lebihan NaOH). Zn²⁺ sahaja larut dalam lebihan kedua-dua NaOH dan NH₃.',
        ],
        mnemonic: 'Ujian Anion: CO₃ (Buih), Cl (Perak Putih), SO₄ (Barium Putih), NO₃ (Cincin Perang).',
        keyTerms: ['Cincin Perang (NO₃⁻)', 'Mendakan Putih', 'Ujian Kation ZAP'],
      },
    ],
  },

  // ==========================================
  // TINGKATAN 4 BAB 7: KADAR TINDAK BALAS
  // ==========================================
  't4-b7': {
    chapterId: 't4-b7',
    form: 'T4',
    chapterNumber: 7,
    title: 'Kadar Tindak Balas',
    theme: 'Interaksi Jirim',
    centralConcept: 'Kadar tindak balas mengukur kelajuan perubahan kuantiti bahan atau hasil tindak balas per unit masa, dijelaskan secara mikroskopik melalui Teori Perlanggaran Berkesan.',
    goldenFormulaOrRule: 'Kadar Purata = Jumlah Isi Padu Gas Terkumpul / Masa Diambil | Kadar Serta-Merta = Kecerunan Tangen Graf pada Masa t (dy/dx).',
    quickTips: [
      'Semua faktor yang meningkatkan kadar tindak balas (saiz kecil, kepekatan tinggi, suhu tinggi, mangkin) BERTINDAK DENGAN MENINGKATKAN FREKUENSI PERLANGGARAN BERKESAN!',
      'Hanya MANGKIN yang menurunkan Tenaga Pengaktifan (E_a) dengan menyediakan laluan alternatif.',
      'Hanya SUHU yang meningkatkan Tenaga Kinetik zarah (lebih banyak zarah mencapai E_a).',
    ],
    branches: [
      {
        id: 'b7-1',
        title: 'Penentuan & Pengiraan Kadar Tindak Balas',
        subtopicRef: '7.1',
        color: 'sky',
        iconType: 'calculator',
        summary: 'Mengukur perubahan kuantiti yang boleh diperhatikan melawan masa.',
        corePoints: [
          'Perubahan yang boleh diukur: Isi padu gas terbebas (cm³ s⁻¹), jisim bahan berkurang, masa tanda "X" hilang dari pandangan.',
          'Kadar tindak balas berkadar songsang dengan masa: <b>Kadar ∝ 1 / Masa</b>.',
          'Kadar tindak balas paling tinggi pada permulaan tindak balas (kecerunan graf paling curam), kemudian berkurang dan menjadi sifar apabila tindak balas lengkap.',
        ],
        formulasOrEquations: ['Kadar Purata = ΔV / Δt', 'Kadar Serta-merta = Kecerunan Tangen (dy / dx)'],
        keyTerms: ['Kadar Purata', 'Kadar Serta-Merta', 'Tangen Graf'],
      },
      {
        id: 'b7-2',
        title: 'Faktor yang Mempengaruhi Kadar Tindak Balas',
        subtopicRef: '7.2',
        color: 'indigo',
        iconType: 'flame',
        summary: '5 faktor utama yang mempercepatkan atau memperlahankan tindak balas.',
        corePoints: [
          '<b>Saiz Bahan Pepejal</b>: Saiz lebih kecil → Jumlah luas permukaan terdedah lebih besar.',
          '<b>Kepekatan Larutan</b>: Kepekatan lebih tinggi → Bilangan zarah per unit isi padu lebih banyak.',
          '<b>Suhu Tindak Balas</b>: Suhu lebih tinggi → Tenaga kinetik zarah bertambah, zarah bergerak lebih laju.',
          '<b>Mangkin</b>: Mempercepatkan tindak balas tanpa berubah secara kimia pada akhir tindak balas.',
          '<b>Tekanan (bagi gas)</b>: Tekanan tinggi memampatkan zarah gas per unit isi padu.',
        ],
        keyTerms: ['Luas Permukaan', 'Kepekatan', 'Suhu', 'Mangkin', 'Tekanan'],
      },
      {
        id: 'b7-3',
        title: 'Teori Perlanggaran & Tenaga Pengaktifan (E_a)',
        subtopicRef: '7.3',
        color: 'emerald',
        iconType: 'zap',
        summary: 'Syarat berlakunya perlanggaran berkesan yang menghasilkan tindak balas kimia.',
        corePoints: [
          'Syarat perlanggaran berkesan: 1. Zarah berlanggar dengan <b>orientasi yang betul</b>; 2. Zarah memiliki tenaga sama atau melebihi <b>Tenaga Pengaktifan (E_a)</b>.',
          '<b>Tenaga Pengaktifan (E_a)</b>: Tenaga minimum yang diperlukan oleh zarah-zarah bahan tindak balas sebelum perlanggaran menghasilkan tindak balas.',
          'Mangkin menyediakan laluan alternatif dengan E_a yang lebih rendah.',
        ],
        mnemonic: 'Kunci Skema Emas: "Frekuensi Perlanggaran Berkesan Antara Zarah Bertambah"',
        keyTerms: ['Tenaga Pengaktifan (E_a)', 'Orientasi Betul', 'Perlanggaran Berkesan'],
      },
      {
        id: 'b7-4',
        title: 'Aplikasi Harian & Industri Kimia',
        subtopicRef: '7.4',
        color: 'amber',
        iconType: 'cpu',
        summary: 'Penggunaan prinsip kadar tindak balas dalam kehidupan seharian dan kilang.',
        corePoints: [
          '<b>Peti sejuk</b>: Suhu rendah memperlahankan aktiviti bakteria dan penguraian makanan.',
          '<b>Periuk tekanan</b>: Tekanan tinggi meningkatkan takat didih air melebihi 100 °C, makanan masak lebih pantas.',
          '<b>Proses Haber (Penghasilan NH₃)</b>: Suhu 450 °C, tekanan 200 atm, mangkin serbuk besi (Fe).',
          '<b>Proses Sentuh (Penghasilan H₂SO₄)</b>: Suhu 450 °C, tekanan 1 atm, mangkin vanadium(V) oksida (V₂O₅).',
        ],
        keyTerms: ['Proses Haber (Fe)', 'Proses Sentuh (V₂O₅)', 'Periuk Tekanan'],
      },
    ],
  },

  // ==========================================
  // TINGKATAN 4 BAB 8: BAHAN BUATAN DALAM INDUSTRI
  // ==========================================
  't4-b8': {
    chapterId: 't4-b8',
    form: 'T4',
    chapterNumber: 8,
    title: 'Bahan Buatan dalam Industri',
    theme: 'Teknologi Kimia',
    centralConcept: 'Pengubahsuaian bahan semula jadi melalui pengaloian, pembuatan kaca, seramik dan bahan komposit untuk menghasilkan bahan dengan sifat mekanikal dan terma yang unggul.',
    goldenFormulaOrRule: 'Pengaloian menghalang atom logam tulen daripada menggelongsor di atas satu sama lain kerana saiz atom bendasing berbeza mengganggu susunan teratur.',
    quickTips: [
      'Logam tulen lembut & mudah ditempa kerana atom bersaiz sama mudah menggelongsor. Aloi lebih keras & tahan kakisan kerana kehadiran atom asing mengganggu susunan teratur.',
      'Kaca Borosilikat: Tahan kejutan haba (pekali pengembangan terma rendah) → digunakan untuk radas makmal Pyrex & alat memasak kaca.',
      'Superkonduktor: Mengalirkan arus elektrik tanpa rintangan pada suhu sangat rendah.',
    ],
    branches: [
      {
        id: 'b8-1',
        title: 'Aloi & Pengaloian',
        subtopicRef: '8.1',
        color: 'sky',
        iconType: 'layers',
        summary: 'Campuran dua atau lebih unsur dengan unsur utama ialah logam.',
        corePoints: [
          'Tujuan: Meningkatkan kekerasan, mencegah kakisan/pengaratan, membaiki rupa berkilat.',
          '<b>Keluli</b>: Fe + C (Keras, membina jambatan & bangunan).',
          '<b>Keluli Tahan Karat</b>: Fe + Cr + Ni + C (Tahan karat, alatan pembedahan & kutleri).',
          '<b>Gangsa</b>: Cu + Sn (Pingat & tugu). <b>Loyang</b>: Cu + Zn (Alat muzik & kunci).',
          '<b>Duralumin</b>: Al + Cu + Mg + Mn (Ringan & kuat, badan kapal terbang).',
          '<b>Piuter</b>: Sn + Sb + Cu (Cenderamata berkilat).',
        ],
        mnemonic: 'Gangsa = Cu + Sn (Timah). Loyang = Cu + Zn (Zink). Duralumin = Aluminiun Ringan!',
        keyTerms: ['Susunan Atom Menggelongsor', 'Keluli', 'Gangsa', 'Duralumin'],
      },
      {
        id: 'b8-2',
        title: 'Komposisi Kaca & Kegunaannya',
        subtopicRef: '8.2',
        color: 'indigo',
        iconType: 'shield',
        summary: 'Silika (SiO₂) yang dileburkan dengan pelbagai oksida logam.',
        corePoints: [
          '<b>Kaca Silika Terlakur</b>: SiO₂ tulen. Takat lebur tinggi, telus kepada UV, kanta teleskop.',
          '<b>Kaca Soda Kapur</b>: SiO₂ + Na₂CO₃ + CaCO₃. Murah, takat lebur rendah, mudah dibentuk (botol & cermin tingkap).',
          '<b>Kaca Borosilikat</b>: SiO₂ + B₂O₃ + Na₂O. Tahan perubahan haba drastik, radas makmal (bikar, tabung uji).',
          '<b>Kaca Plumbum (Kristal)</b>: SiO₂ + PbO + Na₂O. Indeks biasan tinggi, berkilau, prisma & barangan hiasan kristal.',
        ],
        keyTerms: ['Kaca Borosilikat (B₂O₃)', 'Kaca Soda Kapur', 'Kaca Plumbum'],
      },
      {
        id: 'b8-3',
        title: 'Seramik Tradisional & Termaju',
        subtopicRef: '8.3',
        color: 'emerald',
        iconType: 'flame',
        summary: 'Bahan bukan organik bukan logam yang dikeraskan melalui pemanasan suhu tinggi.',
        corePoints: [
          'Sifat umum: Sangat keras, tahan haba, penebat elektrik dan haba yang sangat baik, lengai kimia.',
          '<b>Seramik Tradisional</b>: Dibuat daripada tanah liat (kaolin, Al₂O₃·2SiO₂·2H₂O). Cth: Bata, tembikar, jubin tandas.',
          '<b>Seramik Termaju</b>: Dibuat daripada oksida, karbida atau nitrida tulen (cth SiC, ZrO₂). Cth: Cakera brek kereta lumba, implan tulang tiruan, palam pencucuh.',
        ],
        keyTerms: ['Kaolin', 'Penebat Terma', 'Seramik Termaju (SiC)'],
      },
      {
        id: 'b8-4',
        title: 'Bahan Komposit & Aplikasinya',
        subtopicRef: '8.4',
        color: 'amber',
        iconType: 'sparkles',
        summary: 'Gabungan dua atau lebih bahan dengan sifat berbeza menghasilkan sifat baharu yang unggul.',
        corePoints: [
          'Terdiri daripada bahan matriks (pengikat) dan bahan pengukuh.',
          '<b>Konkrit Diperkukuh</b>: Konkrit + rod keluli (Kuat menahan tegangan & mampatan, struktur bangunan tinggi).',
          '<b>Kaca Gentian</b>: Kaca + plastik polimer (Kuat, elastik, ringan, topi keledar & bot).',
          '<b>Kaca Fotokromik</b>: Kaca + hablur AgCl/CuCl (Menjadi gelap apabila terdedah kepada sinaran UV, cermin mata pintar).',
          '<b>Gentian Optik</b>: Gentian kaca silika + plastik (Menghantar data internet sepantas cahaya melalui pantulan dalam penuh).',
          '<b>Superkonduktor</b>: Aloi kuprum oksida (Sifar rintangan elektrik, kereta api Maglev).',
        ],
        keyTerms: ['Konkrit Diperkukuh', 'Kaca Fotokromik', 'Gentian Optik', 'Superkonduktor'],
      },
    ],
  },

  // ==========================================
  // TINGKATAN 5 BAB 1: KESEIMBANGAN REDOKS
  // ==========================================
  't5-b1': {
    chapterId: 't5-b1',
    form: 'T5',
    chapterNumber: 1,
    title: 'Keseimbangan Redoks',
    theme: 'Proses Kimia',
    centralConcept: 'Tindak balas redoks melibatkan pengoksidaan (kehilangan elektron / kenaikan nombor pengoksidaan) dan penurunan (penerimaan elektron / penurunan nombor pengoksidaan) yang berlaku serentak.',
    goldenFormulaOrRule: 'OIL RIG: Oxidation Is Loss of e⁻, Reduction Is Gain of e⁻ | ANOD = Pengoksidaan (Lepas e⁻) | KATOD = Penurunan (Terima e⁻) | E°sel = E°(katod) - E°(anod).',
    quickTips: [
      'Nilai E° lebih negatif = Agen penurunan lebih kuat (lebih mudah lepaskan elektron di anod).',
      'Nilai E° lebih positif = Agen pengoksidaan lebih kuat (lebih mudah terima elektron di katod).',
      'Tindak balas berlaku secara spontan jika nilai E°sel adalah bernilai POSITIF (> 0 V).',
      'Penyaduran logam: Logam tulen penyadur di ANOD, bahan hendak disadur di KATOD, elektrolit mengandungi ion logam penyadur.',
    ],
    branches: [
      {
        id: 't5b1-1',
        title: '4 Takrifan Redoks & Tiub-U',
        subtopicRef: '1.1 & 1.2',
        color: 'sky',
        iconType: 'link',
        summary: 'Oksigen, Hidrogen, Pemindahan Elektron, dan Nombor Pengoksidaan.',
        corePoints: [
          '<b>Pengoksidaan</b>: Terima O₂, Kehilangan H₂, Lepas e⁻, Kenaikan nombor pengoksidaan.',
          '<b>Penurunan</b>: Hilang O₂, Terima H₂, Terima e⁻, Penurunan nombor pengoksidaan.',
          '<b>Agen Pengoksidaan</b>: Bahan yang mengoksidakan bahan lain dan dirinya mengalami penurunan.',
          '<b>Eksperimen Tiub-U</b>: Elektron mengalir melalui wayar penyambung dari agen penurunan (anod) ke agen pengoksidaan (katod). Pasu berliang membenarkan pemindahan ion melengkapkan litar.',
        ],
        mnemonic: 'OIL RIG (Oxidation Is Loss, Reduction Is Gain of electrons)',
        keyTerms: ['Agen Pengoksidaan', 'Agen Penurunan', 'Tiub-U', 'Pasu Berliang'],
      },
      {
        id: 't5b1-2',
        title: 'Siri Keupayaan Elektrod Piawai (E°)',
        subtopicRef: '1.3',
        color: 'indigo',
        iconType: 'table',
        summary: 'Ukuran kecenderungan sesuatu spesies menerima elektron berbanding SHE (0.00 V).',
        corePoints: [
          'Diukur pada keadaan piawai: Kepekatan ion 1.0 mol dm⁻³, suhu 25 °C (298 K), tekanan 1 atm (101 kPa).',
          'Atas (E° negatif, cth Li⁺/Li -3.04 V): Sukar terima e⁻, atom Li mudah membebaskan e⁻ (agen penurunan kuat).',
          'Bawah (E° positif, cth F₂/F⁻ +2.87 V): Sangat mudah terima e⁻ (agen pengoksidaan kuat).',
          'Meramal kereaktifan: Logam dengan E° lebih negatif boleh menyesarkan ion logam dengan E° lebih positif daripada larutannya.',
        ],
        formulasOrEquations: ['E°sel = E°(katod / lebih positif) - E°(anod / lebih negatif)'],
        keyTerms: ['Keupayaan Elektrod Piawai (E°)', 'SHE (0.00 V)', 'Spontan (E°sel > 0)'],
      },
      {
        id: 't5b1-3',
        title: 'Sel Kimia (Volta) vs Sel Elektrolisis',
        subtopicRef: '1.4 & 1.5',
        color: 'emerald',
        iconType: 'zap',
        summary: 'Penukaran antara tenaga kimia dan tenaga elektrik.',
        corePoints: [
          '<b>Sel Kimia</b>: Tenaga Kimia → Tenaga Elektrik (Spontan, tiada bateri). Terminal negatif (E° lebih negatif, anod), Terminal positif (E° lebih positif, katod).',
          '<b>Sel Elektrolisis</b>: Tenaga Elektrik → Tenaga Kimia (Bukan spontan, perlu bateri). Anod disambung ke terminal positif bateri; Katod ke terminal negatif bateri.',
          '<b>3 Faktor Pemilihan Nyahcas di Elektrod</b>: 1. Nilai E° (ion dengan E° lebih positif di katod, lebih negatif di anod); 2. Kepekatan ion (ion halida berkepekatan tinggi dinyahcas di anod); 3. Jenis elektrod (elektrod kuprum/perak larut di anod).',
        ],
        keyTerms: ['Anod (Pengoksidaan)', 'Katod (Penurunan)', 'Nyahcas Ion'],
      },
      {
        id: 't5b1-4',
        title: 'Aplikasi: Penulenan, Penyaduran & Ekstraksi',
        subtopicRef: '1.5 & 1.6',
        color: 'amber',
        iconType: 'layers',
        summary: 'Kegunaan industri elektrokimia dan pengekstrakan logam berharga.',
        corePoints: [
          '<b>Penulenan Logam</b>: Logam tak tulen di Anod (melarut), Logam tulen di Katod (terenap).',
          '<b>Penyaduran Logam</b>: Logam penyadur di Anod, Objek disadur di Katod (mesti diputarkan perlahan, arus elektrik rendah).',
          '<b>Pengekstrakan Besi (Relau Bagas)</b>: Bijih hematit (Fe₂O₃) + Kok (C) + Batu kapur (CaCO₃). Gas CO mereduksikan Fe₂O₃ kepada leburan ferum; CaCO₃ membentuk sangga CaSiO₃.',
          '<b>Pengekstrakan Aluminium (Proses Hall-Héroult)</b>: Elektrolisis leburan bauksit Al₂O₃ dalam kriolit (Na₃AlF₆) untuk merendahkan takat lebur.',
        ],
        keyTerms: ['Penyaduran', 'Relau Bagas (Fe)', 'Kriolit (Al₂O₃)', 'Sangga'],
      },
      {
        id: 't5b1-5',
        title: 'Pengaratan Besi & Kawalan Kakisan',
        subtopicRef: '1.7',
        color: 'rose',
        iconType: 'shield',
        summary: 'Kakisan elektrokimia ferum menghasilkan karat terhidrat Fe₂O₃·xH₂O.',
        corePoints: [
          'Syarat pengaratan: Mesti ada kedua-dua <b>oksigen (O₂)</b> dan <b>air (H₂O)</b>.',
          'Mekanisme: Pusat titisan air bertindak sebagai Anod (Fe → Fe²⁺ + 2e⁻); Tepi titisan air bertindak sebagai Katod (O₂ + 2H₂O + 4e⁻ → 4OH⁻).',
          'Logam lebih elektropositif (E° lebih negatif, cth Mg, Zn) <b>mencegah pengaratan</b> (Perlindungan Korban / Galvanisasi).',
          'Logam kurang elektropositif (cth Sn, Cu) <b>mempercepatkan pengaratan</b> jika lapisan pelindung tercalar.',
        ],
        formulasOrEquations: ['Fe → Fe²⁺ + 2e⁻', 'O₂ + 2H₂O + 4e⁻ → 4OH⁻', 'Fe²⁺ + 2OH⁻ → Fe(OH)₂ → Fe₂O₃·xH₂O'],
        keyTerms: ['Perlindungan Korban (Mg/Zn)', 'Penggalvanian', 'Karat Terhidrat'],
      },
    ],
  },

  // ==========================================
  // TINGKATAN 5 BAB 2: SEBATIAN KARBON
  // ==========================================
  't5-b2': {
    chapterId: 't5-b2',
    form: 'T5',
    chapterNumber: 2,
    title: 'Sebatian Karbon',
    theme: 'Kimia Organik',
    centralConcept: 'Sebatian organik yang mengandungi atom karbon dibahagikan mengikut siri homolog dengan formula am dan kumpulan berfungsi khusus yang menentukan tindak balas kimianya.',
    goldenFormulaOrRule: 'Siri Homolog: Alkana (C_n H_2n+2, ikatan tunggal C-C) | Alkena (C_n H_2n, ikatan ganda dua C=C) | Alkohol (C_n H_2n+1 OH) | Asid Karboksilik (C_n H_2n+1 COOH) | Ester (C_n H_2n+1 COO C_m H_2m+1).',
    quickTips: [
      'Alkana terbakar dengan nyalaan kuning berjelaga; Alkena LEBIH BERJELAGA daripada alkana yang sepadan kerana peratusan karbon mengikut jisim lebih tinggi.',
      'Alkena menyahwarnakan warna perang air bromin (menjadi tanpa warna) dan menyahwarnakan warna ungu larutan KMnO₄ berasid.',
      'Pengesteran: Alkohol + Asid Karboksilik dengan mangkin H₂SO₄ pekat → Ester (lapisan berminyak wangi buah-buahan) + Air.',
    ],
    branches: [
      {
        id: 't5b2-1',
        title: 'Jenis Sebatian Karbon & Pecahan Petroleum',
        subtopicRef: '2.1',
        color: 'sky',
        iconType: 'flame',
        summary: 'Sebatian karbon organik vs bukan organik, hidrokarbon tepu vs tak tepu.',
        corePoints: [
          '<b>Hidrokarbon Tepu</b>: Hanya mempunyai ikatan kovalen tunggal antara atom karbon (cth Alkana).',
          '<b>Hidrokarbon Tak Tepu</b>: Mempunyai sekurang-kurangnya satu ikatan ganda dua (Alkena) atau ganda tiga (Alkuna) antara atom karbon.',
          'Penyulingan berperingkat petroleum memisahkan hidrokarbon mengikut takat didih yang semakin meningkat dengan saiz molekul.',
        ],
        keyTerms: ['Hidrokarbon Tepu', 'Hidrokarbon Tak Tepu', 'Penyulingan Berperingkat'],
      },
      {
        id: 't5b2-2',
        title: 'Siri Homolog & Penamaan IUPAC',
        subtopicRef: '2.2',
        color: 'indigo',
        iconType: 'table',
        summary: 'Ciri sepunya siri homolog dan formula struktur mengikut piawaian antarabangsa.',
        corePoints: [
          'Ciri siri homolog: 1. Diwakili oleh satu formula am; 2. Ahli berturutan berbeza sebanyak unit -CH₂- (jisim 14); 3. Mempunyai kumpulan berfungsi yang sama; 4. Sifat kimia serupa; 5. Sifat fizik berubah beransur-ansur.',
          'Kumpulan Berfungsi: Alkena (C=C), Alkohol (-OH hidroksil), Asid Karboksilik (-COOH karboksil), Ester (-COO- karboksilat).',
          'Awalan rantai karbon: Met- (1), Et- (2), Prop- (3), But- (4), Pent- (5), Heks- (6).',
        ],
        mnemonic: 'M-E-P-B-P-H: Monyet Makan Pisang Busuk Paling Hangit (Met, Et, Prop, But, Pent, Heks)',
        keyTerms: ['Kumpulan Berfungsi', 'Formula Am', 'Penamaan IUPAC'],
      },
      {
        id: 't5b2-3',
        title: 'Sifat Kimia Alkana vs Alkena',
        subtopicRef: '2.3',
        color: 'emerald',
        iconType: 'zap',
        summary: 'Tindak balas penukargantian alkana vs tindak balas penambahan alkena.',
        corePoints: [
          '<b>Alkana</b>: Kurang reaktif. Tindak balas penukargantian dengan halogen (Cl₂, Br₂) memerlukan <b>sinaran cahaya matahari / sinaran UV</b>.',
          '<b>Alkena</b>: Sangat reaktif kerana ikatan ganda dua C=C. Mengalami <b>tindak balas penambahan</b>: Penambahan H₂ (penghidrogenan, mangkin Ni 180 °C), Penambahan Halogen (air bromin tanpa warna), Penambahan H₂O (penghidratan menghasilkan alkohol, mangkin H₃PO₄ 300 °C 60 atm), Pempolimeran penambahan.',
        ],
        formulasOrEquations: ['C₂H₄ + H₂O → C₂H₅OH (Penghidratan Etena)', 'C₂H₄ + Br₂ → C₂H₄Br₂ (1,2-dibromoetana)'],
        keyTerms: ['Tindak Balas Penambahan', 'Penukargantian (UV)', 'Air Bromin'],
      },
      {
        id: 't5b2-4',
        title: 'Alkohol, Asid Karboksilik & Ester',
        subtopicRef: '2.4 & 2.5',
        color: 'amber',
        iconType: 'flask',
        summary: 'Penyediaan dan penukaran siri homolog organik berfungsi.',
        corePoints: [
          '<b>Penapaian Glukosa</b>: Yis menghasilkan enzim zimase menukarkan glukosa kepada etanol + gas CO₂ pada keadaan anaerobik (tanpa oksigen).',
          '<b>Pengoksidaan Etanol</b>: Pemanasan refluks etanol bersama larutan K₂Cr₂O₇ berasid (jingga ke hijau) atau KMnO₄ berasid (ungu ke tidak berwarna) menghasilkan <b>asid etanoik (CH₃COOH)</b>.',
          '<b>Pengesteran</b>: Asid etanoik + Etanol (mangkin H₂SO₄ pekat) → <b>Etil etanoat (bau buah manis)</b> + Air.',
        ],
        formulasOrEquations: ['C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂', 'C₂H₅OH + 2[O] → CH₃COOH + H₂O', 'CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O'],
        keyTerms: ['Penapaian (Zimase)', 'Pengoksidaan Etanol', 'Ester (Aroma Buah)'],
      },
      {
        id: 't5b2-5',
        title: 'Keisomeran Struktur (Isomers)',
        subtopicRef: '2.6',
        color: 'purple',
        iconType: 'layers',
        summary: 'Molekul dengan formula molekul sama tetapi formula struktur berbeza.',
        corePoints: [
          'Alkana bermula ada isomer daripada <b>Butana, C₄H₁₀</b> (2 isomer: butana dan 2-metilpropana).',
          'Alkena bermula daripada <b>Butena, C₄H₈</b> (3 isomer: but-1-ena, but-2-ena, 2-metilpropena).',
          'Alkohol bermula daripada <b>Propanol, C₃H₇OH</b> (propan-1-ol dan propan-2-ol).',
          'Isomer mempunyai sifat kimia sama tetapi sifat fizik (takat lebur/didih/ketumpatan) berbeza kerana luas permukaan sentuhan molekul berbeza.',
        ],
        keyTerms: ['Isomer Rantai', 'Isomer Kedudukan', 'Formula Struktur'],
      },
    ],
  },

  // ==========================================
  // TINGKATAN 5 BAB 3: TERMOKIMIA
  // ==========================================
  't5-b3': {
    chapterId: 't5-b3',
    form: 'T5',
    chapterNumber: 3,
    title: 'Termokimia',
    theme: 'Haba & Tenaga',
    centralConcept: 'Kajian perubahan tenaga haba dalam tindak balas kimia. Tindak balas eksotermik membebaskan haba ke persekitaran (suhu naik, ΔH negatif), manakala endotermik menyerap haba (suhu turun, ΔH positif).',
    goldenFormulaOrRule: 'Perubahan Haba: Q = m × c × θ | Haba Tindak Balas: ΔH = - (Q / n) kJ mol⁻¹ (Tanda negatif untuk eksotermik, positif untuk endotermik).',
    quickTips: [
      'Jisim larutan m: Anggap ketumpatan larutan = 1 g cm⁻³ (1 cm³ larutan = 1 g).',
      'Haba Peneutralan: Asid kuat + Alkali kuat sentiasa bernilai malar kira-kira -57 kJ mol⁻¹ kerana melibatkan pembentukan 1 mol air: H⁺ + OH⁻ → H₂O.',
      'Jika asid lemah digunakan (cth asid etanoik), nilai haba peneutralan LEBIH RENDAH daripada -57 kJ mol⁻¹ kerana sebahagian haba diserap untuk mengionkan asid lemah sepenuhnya.',
      'Asid diprotik kuat (H₂SO₄) membebaskan kuantiti haba DUA KALI GANDA kerana mengandungi 2 mol ion H⁺.',
    ],
    branches: [
      {
        id: 't5b3-1',
        title: 'Tindak Balas Eksotermik vs Endotermik',
        subtopicRef: '3.1',
        color: 'sky',
        iconType: 'flame',
        summary: 'Konsep asas pemindahan haba dan rajah aras tenaga.',
        corePoints: [
          '<b>Eksotermik (ΔH < 0)</b>: Haba dibebaskan ke persekitaran, bacaan termometer meningkat. Pemutusan ikatan serap kurang tenaga berbanding pembentukan ikatan baharu.',
          '<b>Endotermik (ΔH > 0)</b>: Haba diserap daripada persekitaran, bacaan termometer menurun.',
          '<b>Gambar Rajah Aras Tenaga</b>: Eksotermik (Bahan di atas, Hasil di bawah, anak panah ke bawah). Endotermik (Bahan di bawah, Hasil di atas, anak panah ke atas).',
          'Aplikasi: Pek panas segera (CaCl₂ kontang/MgSO₄ larut dalam air); Pek sejuk segera (NH₄NO₃ larut dalam air).',
        ],
        mnemonic: 'EKSO = Keluar haba (Suhu naik, ΔH negatif). ENDO = Masuk haba (Suhu turun, ΔH positif).',
        keyTerms: ['Eksotermik (ΔH -)', 'Endotermik (ΔH +)', 'Pek Panas / Pek Sejuk'],
      },
      {
        id: 't5b3-2',
        title: 'Haba Pemendakan & Haba Penyesaran',
        subtopicRef: '3.2',
        color: 'indigo',
        iconType: 'layers',
        summary: 'Entalpi pembentukan mendakan dan penyesaran ion logam/halogen.',
        corePoints: [
          '<b>Haba Pemendakan</b>: Perubahan haba apabila 1 mol mendakan terbentuk daripada ion-ionnya dalam larutan akueus (cth pembentukan BaSO₄ atau AgCl).',
          '<b>Haba Penyesaran</b>: Perubahan haba apabila 1 mol logam disesarkan daripada larutan garamnya oleh logam yang lebih elektropositif (cth Zn sesarkan Cu daripada CuSO₄).',
          'Gunakan cawan polistirena sebagai penebat haba untuk mengurangkan kehilangan haba ke persekitaran.',
        ],
        formulasOrEquations: ['Ba²⁺(ak) + SO₄²⁻(ak) → BaSO₄(p)', 'Zn(p) + Cu²⁺(ak) → Zn²⁺(ak) + Cu(p)'],
        keyTerms: ['Haba Pemendakan', 'Haba Penyesaran', 'Cawan Polistirena'],
      },
      {
        id: 't5b3-3',
        title: 'Haba Peneutralan & Kesan Kekuatan Asid',
        subtopicRef: '3.3',
        color: 'emerald',
        iconType: 'flask',
        summary: 'Perubahan haba bagi pembentukan 1 mol air daripada peneutralan asid dan alkali.',
        corePoints: [
          'Asid kuat + Alkali kuat: <b>ΔH ≈ -57 kJ mol⁻¹</b> (Persamaan ion sentiasa H⁺ + OH⁻ → H₂O).',
          'Asid lemah + Alkali kuat: <b>ΔH < -57 kJ mol⁻¹</b> (kurang eksotermik, cth -54 kJ mol⁻¹) kerana asid lemah mengion separa, tenaga haba diserap untuk memutuskan ikatan molekul asid lemah.',
          'Asid sulfurik (H₂SO₄) diprotik: Menghasilkan 2 mol air, membebaskan haba dua kali ganda berbanding asid hidroklorik (HCl).',
        ],
        formulasOrEquations: ['H⁺(ak) + OH⁻(ak) → H₂O(c)  ΔH = -57.3 kJ mol⁻¹'],
        keyTerms: ['Haba Peneutralan', 'Asid Kuat (-57 kJ)', 'Asid Lemak (< -57 kJ)'],
      },
      {
        id: 't5b3-4',
        title: 'Haba Pembakaran & Nilai Bahan Api',
        subtopicRef: '3.4',
        color: 'amber',
        iconType: 'calculator',
        summary: 'Pembakaran lengkap 1 mol bahan api dalam oksigen berlebihan dan kecekapan tenaga.',
        corePoints: [
          '<b>Haba Pembakaran</b>: Haba dibebaskan apabila 1 mol bahan terbakar lengkap dalam O₂ berlebihan.',
          'Semakin bertambah bilangan atom karbon per molekul alkohol, semakin tinggi haba pembakaran (kerana lebih banyak ikatan C-C dan C-H terputus dan terbentuk membentuk CO₂ dan H₂O).',
          'Langkah berjaga-jaga eksperimen: Gunakan pengadang angin, kacau air berterusan, letak tin kuprum rapat di atas nyalaan pelita.',
          '<b>Nilai Bahan Api (kJ g⁻¹)</b>: Jumlah tenaga haba yang dibebaskan apabila 1 gram bahan api terbakar lengkap: Nilai = ΔH pembakaran (kJ mol⁻¹) / Jisim Molar (g mol⁻¹).',
        ],
        formulasOrEquations: ['C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O', 'Nilai Bahan Api = ΔH / JMR (kJ g⁻¹)'],
        keyTerms: ['Haba Pembakaran', 'Nilai Bahan Api (kJ g⁻¹)', 'Pengadang Angin'],
      },
    ],
  },

  // ==========================================
  // TINGKATAN 5 BAB 4: KIMIA POLIMER
  // ==========================================
  't5-b4': {
    chapterId: 't5-b4',
    form: 'T5',
    chapterNumber: 4,
    title: 'Kimia Polimer',
    theme: 'Bahan & Teknologi',
    centralConcept: 'Polimer ialah molekul berantai panjang yang dibina daripada gabungan berulang molekul kecil dipanggil monomer melalui pempolimeran penambahan atau kondensasi.',
    goldenFormulaOrRule: 'Pempolimeran Penambahan: Monomer ada ikatan ganda dua C=C (tanpa hasil sampingan) | Pempolimeran Kondensasi: Monomer ada dua kumpulan berfungsi berbeza (menyingkirkan molekul kecil H₂O / HCl).',
    quickTips: [
      'Getah asli lembut & mudah melekit bila panas. Pemvulkanan getah membentuk RANGKAI SILANG SULFUR antara rantai polimer, menghalang rantai menggelongsor dan menjadikannya sangat anjal dan tahan haba.',
      'Asid (H⁺) menggumpalkan lateks (meneutralkan cas negatif zarah getah). Alkali (NH₃ / OH⁻) mencegah penggumpalan lateks (mengekalkan cas negatif saling menolak).',
    ],
    branches: [
      {
        id: 't5b4-1',
        title: 'Pengelasan & Jenis Polimer',
        subtopicRef: '4.1',
        color: 'sky',
        iconType: 'layers',
        summary: 'Sumber polimer semula jadi vs polimer sintetik dan struktur rantai.',
        corePoints: [
          '<b>Polimer Semula Jadi</b>: Kanji (monomer glukosa), Protein (monomer asid amino), Getah Asli (monomer isoprena / 2-metilbut-1,3-diena).',
          '<b>Polimer Sintetik</b>: Polietena (monomer etena), Polivinil klorida / PVC (monomer kloroetena), Polistirena (monomer stirena), Nilon, Terilena.',
          'Berdasarkan sifat terma: <b>Termoplastik</b> (boleh diacu berulang kali bila dipanaskan, cth polietena); <b>Termoset</b> (hangus dan tidak melebur bila dipanaskan semula, cth bakelit, melamina); <b>Elastomer</b> (sangat anjal, cth getah).',
        ],
        keyTerms: ['Polimer Semula Jadi', 'Polimer Sintetik', 'Termoplastik', 'Termoset'],
      },
      {
        id: 't5b4-2',
        title: 'Pempolimeran Penambahan vs Kondensasi',
        subtopicRef: '4.1 & 4.2',
        color: 'indigo',
        iconType: 'link',
        summary: 'Dua mekanisme utama pembentukan rantai polimer sintetik.',
        corePoints: [
          '<b>Pempolimeran Penambahan</b>: Ikatan ganda dua C=C monomer terbuka dan bersambung sesama sendiri tanpa kehilangan sebarang atom (cth: etena → polietena).',
          '<b>Pempolimeran Kondensasi</b>: Tindak balas antara monomer yang mempunyai dua kumpulan berfungsi berbeza dengan menyingkirkan molekul kecil seperti air (H₂O) atau hidrogen klorida (HCl).',
          'Contoh kondensasi: Asid heksanadioik + 1,6-heksanadiamina → <b>Nilon-6,6 + H₂O</b>; Dimetil tereftalat + etana-1,2-diol → <b>Terilena (Dacron) + CH₃OH</b>.',
        ],
        keyTerms: ['Penambahan (C=C)', 'Kondensasi (Singkir H₂O)', 'Nilon-6,6', 'Terilena'],
      },
      {
        id: 't5b4-3',
        title: 'Getah Asli & Tindakan Penggumpalan Lateks',
        subtopicRef: '4.2',
        color: 'emerald',
        iconType: 'shield',
        summary: 'Sifat molekul lateks dan kawalan penggumpalan berasaskan cas membran protein.',
        corePoints: [
          'Monomer getah asli ialah <b>isoprena (2-metilbut-1,3-diena)</b>.',
          'Membran protein zarah getah bercas <b>negatif</b> di permukaan luar, menyebabkan zarah saling menolak dan tidak menggumpal.',
          '<b>Penggumpalan oleh Asid</b>: Ion H⁺ daripada asid (cth asid etanoik) meneutralkan cas negatif membran. Zarah getah berlanggar, membran pecah dan rantai polimer bergabung.',
          '<b>Pencegahan Penggumpalan oleh Alkali</b>: Larutan ammonia (NH₃) menghasilkan ion OH⁻ yang meneutralkan sebarang asid dihasilkan bakteria, mengekalkan cas negatif.',
        ],
        keyTerms: ['Isoprena', 'Membran Bercas Negatif', 'Asid Menggumpal', 'Ammonia Menghalang'],
      },
      {
        id: 't5b4-4',
        title: 'Pemvulkanan Getah & Sifat Anjal',
        subtopicRef: '4.3',
        color: 'amber',
        iconType: 'zap',
        summary: 'Pembentukan rangkai silang sulfur untuk mengubah sifat getah asli menjadi bahan industri tahan lasak.',
        corePoints: [
          'Proses pemvulkanan: Memanaskan getah asli bersama sulfur (atau merendam dalam larutan disulfur diklorida).',
          'Atom sulfur membentuk <b>rangkai silang sulfur (-S-S-)</b> antara rantai polimer getah pada tapak ikatan ganda dua.',
          'Perbandingan Sifat: Getah tervulkan LEBIH KUAT, LEBIH ANJAL, TAHAN HABA LEBIH TINGGI, dan TAHAN PENGOKSIDAAN berbanding getah tak tervulkan.',
          'Rangkai silang sulfur menghalang rantai polimer daripada menggelongsor dan membolehkannya kembali ke bentuk asal selepas ditarik.',
        ],
        mnemonic: 'Sulfur Ikat Rantai = Anjal, Keras & Tahan Panas!',
        keyTerms: ['Rangkai Silang Sulfur', 'Getah Tervulkan', 'Keanjalan Tinggi'],
      },
      {
        id: 't5b4-5',
        title: 'Getah Sintetik & Isu Alam Sekitar',
        subtopicRef: '4.4',
        color: 'rose',
        iconType: 'alert',
        summary: 'Alternatif getah buatan manusia dan pengurusan sisa polimer lestari.',
        corePoints: [
          'Contoh Getah Sintetik: <b>Neoprena</b> (tahan minyak dan haba, tali sawat), <b>Getah Stirena-Butadiena (SBR)</b> (tayar kenderaan), <b>Silikon</b> (peralatan perubatan & alatan memasak).',
          'Isu polimer sintetik: <b>Tidak terbiodegradasi</b>, menyebabkan pencemaran tanah dan saluran air tersumbat.',
          'Pembakaran terbuka membebaskan gas beracun (cth HCl daripada PVC, gas rumah hijau CO₂).',
          'Penyelesaian: Kitar semula (3R: Reduce, Reuse, Recycle), penggunaan <b>polimer biodegradasi</b> (cth asid polilaktik PLA daripada jagung).',
        ],
        keyTerms: ['Neoprena', 'SBR (Tayar)', 'Tidak Terbiodegradasi', 'Polimer Terbiodegradasi PLA'],
      },
    ],
  },

  // ==========================================
  // TINGKATAN 5 BAB 5: KIMIA KONSUMER & INDUSTRI
  // ==========================================
  't5-b5': {
    chapterId: 't5-b5',
    form: 'T5',
    chapterNumber: 5,
    title: 'Kimia Konsumer dan Industri',
    theme: 'Kimia Konsumer',
    centralConcept: 'Aplikasi sebatian kimia dalam kehidupan harian merangkumi sabun dan detergen, bahan tambah makanan, ubat-ubatan, kosmetik serta teknologi termaju nanoteknologi dan teknologi hijau.',
    goldenFormulaOrRule: 'Tindakan Pencucian: Ekor Hidrofobik larut dalam gris | Kepala Hidrofilik larut dalam air | Sabun membentuk kekat (scum) dalam air liat (ion Ca²⁺ & Mg²⁺); Detergen TIDAK membentuk kekat.',
    quickTips: [
      'Sabun disediakan melalui proses Saponifikasi (Lemak / Minyak + Alkali pekat NaOH / KOH).',
      'Air Liat mengandungi ion Ca²⁺ dan Mg²⁺: Sabun bertindak balas membentuk mendakan tak larut (kekat), manakala detergen kekal berkesan kerana garam kalsium/magnesium sulfonatnya larut.',
      'Bahan Tambah Makanan: Natrium nitrit/benzoat (Pengawet), Asid askorbik/Vitamin C (Pengantioksida), MSG (Penambah perisa), Lesitin (Pengemulsi/Penstabil).',
      'Merkuri dan Hidrokuinon adalah bahan terlarang dalam kosmetik pemutih kulit yang merosakkan buah pinggang dan saraf.',
    ],
    branches: [
      {
        id: 't5b5-1',
        title: 'Minyak, Lemak & Saponifikasi Sabun',
        subtopicRef: '5.1',
        color: 'sky',
        iconType: 'flask',
        summary: 'Ester semula jadi trigliserida dan hidrolisis beralkali menghasilkan garam asid lemak.',
        corePoints: [
          'Minyak (cecair suhu bilik, tak tepu, asid lemak ada ikatan ganda dua, takat lebur rendah). Lemak (pepejal suhu bilik, tepu, takat lebur tinggi).',
          '<b>Saponifikasi</b>: Hidrolisis trigliserida (minyak kelapa sawit) oleh alkali pekat (NaOH menghasilkan sabun keras, KOH menghasilkan sabun cecair lembut) menghasilkan <b>Sabun + Gliserol</b>.',
          'Penambahan <b>Natrium klorida (NaCl)</b> merendahkan keterlarutan sabun dalam air bagi memendakkan sabun pepejal.',
        ],
        formulasOrEquations: ['Trigliserida + 3NaOH → 3 Garam Natrium Asid Lemak (Sabun) + Gliserol'],
        keyTerms: ['Saponifikasi', 'Trigliserida', 'Gliserol', 'Pemendakan NaCl'],
      },
      {
        id: 't5b5-2',
        title: 'Tindakan Pencucian Sabun vs Detergen',
        subtopicRef: '5.2',
        color: 'indigo',
        iconType: 'shield',
        summary: 'Mekanisme pembersihan gris melalui struktur amfifilik dan perbezaan prestasi dalam air liat.',
        corePoints: [
          'Struktur molekul: <b>Ekor hidrofobik</b> (rantai hidrokarbon tak berkutub, larut dalam gris); <b>Kepala hidrofilik</b> (kumpulan ionik berkutub -COO⁻ atau -SO₃⁻, larut dalam air).',
          'Mekanisme: Ekor melekat pada gris pada kain, kepala berada dalam air. Tindakan menggosok/kacauan mengikis gris membentuk titisan emulsi gris yang terapung dan dibilas bersih.',
          '<b>Air Liat (Ion Ca²⁺ & Mg²⁺)</b>: Sabun bertindak balas menghasilkan <b>kekat (scum)</b> membazirkan sabun; Detergen <b>TIDAK membentuk kekat</b> kerana garam sulfonat larut.',
        ],
        mnemonic: 'Ekor Tak Suka Air (Suka Gris). Kepala Suka Air. Detergen Menang Air Liat!',
        keyTerms: ['Ekor Hidrofobik', 'Kepala Hidrofilik', 'Kekat (Scum)', 'Air Liat (Ca²⁺/Mg²⁺)'],
      },
      {
        id: 't5b5-3',
        title: 'Bahan Tambah Makanan',
        subtopicRef: '5.3',
        color: 'emerald',
        iconType: 'layers',
        summary: 'Bahan semula jadi atau sintetik yang ditambah untuk memelihara kualiti, rasa dan rupa makanan.',
        corePoints: [
          '<b>Pengawet</b>: Menghalang pertumbuhan mikroorganisma (cth: Garam, gula, cuka, natrium benzoat dalam sos cili, natrium nitrit dalam sosej).',
          '<b>Pengantioksida</b>: Memperlahankan pengoksidaan lemak/minyak daripada menjadi tengik (cth: Asid askorbik/Vitamin C, BHA, BHT, tokoferol/Vitamin E).',
          '<b>Perisa</b>: Meningkatkan rasa sedap (cth: Mononatrium glutamat / MSG, aspartam, ester sintetik perisa nanas/pisang).',
          '<b>Penstabil & Pengemulsi</b>: Mencegah pemisahan fasa minyak dan air (cth: Lesitin dalam coklat, pektin dalam jem, gelatin).',
          '<b>Pewarna</b>: Sebatian azo (tartrazina kuning, sunset yellow) dan pewarna semula jadi (klorofil, karotenoid).',
        ],
        keyTerms: ['Pengawet (Natrium Benzoat)', 'Pengantioksida (Vitamin C)', 'Pengemulsi (Lesitin)', 'MSG'],
      },
      {
        id: 't5b5-4',
        title: 'Ubat-Ubatan & Bahan Kosmetik',
        subtopicRef: '5.4',
        color: 'amber',
        iconType: 'sparkles',
        summary: 'Klasifikasi farmaseutikal moden, ubat tradisional dan bahaya kosmetik terlarang.',
        corePoints: [
          '<b>Analgesik</b>: Melegakan kesakitan tanpa hilangkan kesedaran (cth: Parasetamol; Aspirin - berasid, elak pesakit ulser perut; Kodeina - narkotik).',
          '<b>Antimikrob</b>: Membunuh/menghalang kuman (cth: Antibiotik penisilin - mesti habiskan dos elak bakteria kebal; Antiseptik iodin; Disinfektan alkohol 70%).',
          '<b>Ubat Psikotik</b>: Merawat penyakit psikiatri (cth: Stimulan, antidepresan, trankuilizer).',
          '<b>Bahan Kosmetik Terlarang</b>: Merkuri (merosakkan buah pinggang dan sistem saraf); Hidrokuinon & Tretinoin (menghalang melanin, kulit merah mengelupas dan meningkatkan risiko kanser kulit).',
        ],
        keyTerms: ['Analgesik (Parasetamol)', 'Antibiotik (Penisilin)', 'Bahan Terlarang (Merkuri/Hidrokuinon)'],
      },
      {
        id: 't5b5-5',
        title: 'Aplikasi Nanoteknologi & Teknologi Hijau',
        subtopicRef: '5.5',
        color: 'purple',
        iconType: 'cpu',
        summary: 'Penerokaan jirim pada skala 1-100 nanometer dan kelestarian alam sekitar.',
        corePoints: [
          '1 nanometer (nm) = <b>10⁻⁹ meter</b>.',
          'Bahan pada skala nano mempunyai nisbah luas permukaan kepada isi padu yang teramat besar, mengubah kereaktifan dan sifat optik fiziknya.',
          '<b>Grafen</b>: Alotrop karbon 2D setebal satu atom karbon berbentuk kekisi heksagon. Sifat: Sangat kuat (lebih kuat daripada keluli), konduktor haba dan elektrik terbaik di dunia, lut sinar, telap haba rendah.',
          '<b>Teknologi Hijau</b>: Pembangunan produk mesra alam, mengurangkan jejak karbon, pengurusan sisa sifar (Zero Waste), dan penggunaan sumber tenaga boleh baharu.',
        ],
        keyTerms: ['Skala Nano (10⁻⁹ m)', 'Grafen 2D', 'Teknologi Hijau', 'Lestari'],
      },
    ],
  },
};

export const getExpressNoteByChapterId = (chapterId: string): ExpressNoteChapter | undefined => {
  return NOTA_EXPRESS_DATA[chapterId];
};
