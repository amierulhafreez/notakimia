import { Chapter } from '../types/nota';

export const T4_BAB1: Chapter = {
  id: 't4-b1',
  form: 'T4',
  chapterNumber: 1,
  title: 'Pengenalan kepada Kimia',
  theme: 'Kaedah Saintifik',
  durationMinutes: 60,
  description: 'Meneroka maksud kimia, bahan kimia lazim dalam kehidupan harian, perkembangan teknologi kimia, kaedah penyiasatan saintifik, serta pengurusan radas makmal dan langkah keselamatan tumpahan merkuri.',
  iconName: 'Microscope',
  subtopicCount: 3,
  subtopics: [
    // -------------------------------------------------------------------------
    // SUBTOPIK 1.1
    // -------------------------------------------------------------------------
    {
      id: 't4-b1-s1',
      code: '1.1',
      title: 'Perkembangan Bidang Kimia dan Kepentingan dalam Kehidupan',
      learningStandard: 'SP 1.1.1, 1.1.2, 1.1.3, 1.1.4',
      durationMinutes: 20,
      tldr: [
        'Kimia ialah bidang sains yang mengkaji komposisi, struktur, sifat dan interaksi antara jirim. Perkataan kimia berasal daripada istilah Arab "al-kimiya".',
        'Bahan kimia wujud di sekeliling kita dan digunakan dalam 4 sektor utama: Makanan (pengawet/perisa), Pertanian (baja/pestisid), Perubatan (antibiotik/analgesik), dan Industri (polimer/cat/aloi).',
        'Kemajuan teknologi kimia memacu bidang moden seperti Nanoteknologi (zarah 1–100 nm), Bioteknologi, Farmaseutikal, dan Teknologi Hijau.',
        'Peluang kerjaya luas: Ahli Kimia, Jurutera Kimia, Ahli Farmasi, Pakar Forensik, Ahli Toksikologi, dan Ahli Biokimia.'
      ],
      concepts: [
        {
          id: 't4-b1-s1-c1',
          title: 'Definisi Kimia dan Asal Usul Perkataan',
          badge: 'Fakta Asas SPM',
          content: `
            <p>
              <b>Kimia</b> ditakrifkan sebagai cabang sains yang mengkaji <span class="blur-target"><b>komposisi, struktur, sifat dan interaksi antara jirim</b></span> serta perubahan tenaga yang terlibat semasa tindak balas kimia berlaku.
            </p>
            <p>
              Perkataan <i>kimia</i> berasal daripada perkataan bahasa Arab iaitu <span class="blur-target"><b>al-kimiya</b></span> yang bermaksud <i>"seni mentransformasi atau mengubah bahan"</i>. Ilmu alkimia zaman dahulu telah berkembang menjadi ilmu kimia saintifik moden yang menjadi teras kepada pemahaman jirim di alam semesta.
            </p>
            <div class="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200/80 text-xs text-sky-950 mt-2">
              💡 <b>Fakta SPM:</b> Semua benda di alam ini, sama ada bernyawa atau bukan bernyawa, terdiri daripada <b>jirim</b>. Oleh itu, semua jirim diperbuat daripada <b>bahan kimia</b> (atom, molekul, atau ion).
            </div>
          `
        },
        {
          id: 't4-b1-s1-c2',
          title: 'Bahan Kimia Lazim dalam Kehidupan Harian Mengikut Sektor',
          badge: 'Wajib Hafal SPM',
          content: `
            <p>
              Bahan kimia memainkan peranan amat penting dalam memenuhi keperluan asas manusia setiap hari. Berikut ialah 4 sektor utama yang kerap ditanya dalam soalan struktur Kertas 2:
            </p>
          `,
          comparisonTable: {
            headers: ['Sektor Utama', 'Contoh Bahan Kimia Lazim', 'Fungsi / Kegunaan'],
            rows: [
              [
                '<b>Makanan</b>',
                'Natrium benzoat, asid sitrik, monosodium glutamat (MSG), lesitin',
                'Pengawet makanan melambatkan kerosakan, perisa meningkatkan kelazatan, pengemulsi menstabilkan campuran minyak-air.'
              ],
              [
                '<b>Pertanian</b>',
                'Baja urea, baja NPK, racun serangga (malathion), racun kulat (pestisid)',
                'Membekalkan nutrien nitrogen, fosforus dan kalium kepada tanaman serta mengawal serangan makhluk perosak.'
              ],
              [
                '<b>Perubatan & Kesihatan</b>',
                'Parasetamol, aspirin, penisilin, klorheksidina, vitamin C',
                'Analgesik meredakan kesakitan, antibiotik melawan jangkitan bakteria, antiseptik membasmi kuman pada luka.'
              ],
              [
                '<b>Industri & Pembuatan</b>',
                'Asid sulfurik (H₂SO₄), polietena (plastik), aloi keluli, detergen, pigmen cat',
                'Menghasilkan bateri asid-plumbum, bekas pembungkusan, struktur bangunan tahan karat, dan agen pencuci.'
              ]
            ]
          }
        },
        {
          id: 't4-b1-s1-c3',
          title: 'Perkembangan Teknologi Kimia dan Teknologi Hijau',
          badge: 'Aplikasi KBAT',
          content: `
            <p>
              Kemajuan sains kimia moden telah melahirkan pelbagai cabang teknologi canggih yang mengubah tamadun manusia:
            </p>
            <ul class="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
              <li>
                <b>Nanoteknologi:</b> Pembangunan bahan dan peranti pada skala nanometer, iaitu antara <span class="blur-target"><b>1 hingga 100 nanometer (nm)</b></span>. Zarah nano mempunyai nisbah luas permukaan kepada isi padu yang sangat besar, menjadikannya sangat reaktif dan cekap (cth: fabrik kalis kotoran, mikrocip nano, tiub karbon nano).
              </li>
              <li>
                <b>Bioteknologi:</b> Penggunaan organisma hidup atau proses biokimia untuk menghasilkan produk bermanfaat seperti hormon insulin sintetik melalui kejuruteraan genetik.
              </li>
              <li>
                <b>Teknologi Hijau (Green Technology):</b> Pembangunan teknologi yang meminimumkan degradasi alam sekitar, mengurangkan pelepasan gas rumah hijau, menjimatkan tenaga, serta menggalakkan penggunaan sumber boleh diperbaharui (cth: bioplastik terbiodegradasi daripada kanji jagung, sel bahan api hidrogen).
              </li>
            </ul>
          `
        },
        {
          id: 't4-b1-s1-c4',
          title: 'Kerjaya Berkaitan Bidang Kimia',
          badge: 'Rujukan Kerjaya STEM',
          content: `
            <p>
              Pengetahuan kimia membuka ruang kerjaya profesional yang luas dalam pelbagai industri bernilai tinggi:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
              <div class="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <span class="font-bold text-sky-700 text-xs">🔬 Ahli Kimia (Chemist)</span>
                <p class="text-[11px] text-slate-600 mt-0.5">Menjalankan penyelidikan makmal untuk mereka cipta sebatian kimia baharu dan mengawal kualiti produk industri.</p>
              </div>
              <div class="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <span class="font-bold text-indigo-700 text-xs">⚙️ Jurutera Kimia</span>
                <p class="text-[11px] text-slate-600 mt-0.5">Mereka bentuk loji pemprosesan industri berskala besar bagi menukarkan bahan mentah kepada produk siap (cth: petrokimia, minyak sawit).</p>
              </div>
              <div class="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <span class="font-bold text-teal-700 text-xs">💊 Ahli Farmasi</span>
                <p class="text-[11px] text-slate-600 mt-0.5">Merumus ubat-ubatan, mengawal dos ubat yang selamat, dan menasihati pesakit tentang penggunaan farmaseutikal.</p>
              </div>
              <div class="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <span class="font-bold text-rose-700 text-xs">🕵️ Pakar Sains Forensik</span>
                <p class="text-[11px] text-slate-600 mt-0.5">Menganalisis sampel bukti kimia di tempat kejadian jenayah seperti racun, kesan darah, dadah, dan cecair biologi.</p>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menganggap semua bahan kimia adalah sintetik, toksik dan berbahaya kepada kesihatan.',
          correction: 'Bahan kimia wujud secara semula jadi di sekeliling kita termasuk air (H₂O), garam makan (NaCl), gas oksigen (O₂), dan glukosa (C₆H₁₂O₆).',
          why: 'Istilah "bebas bahan kimia" (chemical-free) yang sering digunakan dalam iklan komersial adalah mengelirukan dari segi fakta sains kimia.',
          spmTip: 'Dalam soalan SPM, jelaskan bahawa bahan kimia semula jadi adalah selamat dan penting, manakala bahaya bergantung kepada jenis bahan, dos, dan cara pengendalian.'
        },
        {
          mistake: 'Menyatakan julat saiz nanoteknologi sebagai 1 hingga 100 mikrometer (µm).',
          correction: 'Saiz zarah nanoteknologi mestilah dalam julat 1 hingga 100 nanometer (nm), di mana 1 nm = 10⁻⁹ meter.',
          why: 'Mikrometer (µm) ialah 10⁻⁶ meter, iaitu 1000 kali ganda lebih besar daripada nanometer.',
          spmTip: 'Pastikan unit ukuran yang ditulis ialah "nanometer (nm)" untuk mendapatkan markah penuh.'
        }
      ],
      flashcards: [
        {
          id: 't4-b1-s1-fc1',
          front: 'Apakah maksud "kimia" mengikut silibus Kimia KSSM?',
          back: 'Cabang sains yang mengkaji komposisi, struktur, sifat dan interaksi antara jirim serta perubahan tenaga yang terlibat.'
        },
        {
          id: 't4-b1-s1-fc2',
          front: 'Apakah asal usul perkataan "kimia"?',
          back: 'Berasal daripada bahasa Arab "al-kimiya" yang bermaksud seni mengubah atau mentransformasikan bahan.'
        },
        {
          id: 't4-b1-s1-fc3',
          front: 'Berikan 2 contoh bahan kimia dalam sektor pertanian serta fungsinya.',
          back: '1. Baja Urea: membekalkan nutrien nitrogen untuk tumbesaran daun.\n2. Racun kulat (pestisid): melindungi tanaman daripada serangan kulat perosak.'
        },
        {
          id: 't4-b1-s1-fc4',
          front: 'Apakah julat saiz bagi zarah dalam bidang nanoteknologi?',
          back: 'Antara 1 hingga 100 nanometer (nm), iaitu bersamaan dengan 10⁻⁹ meter.'
        },
        {
          id: 't4-b1-s1-fc5',
          front: 'Apakah perbezaan utama peranan antara Ahli Kimia dan Jurutera Kimia?',
          back: 'Ahli kimia menjalankan kajian & sintesis pada skala makmal kecil, manakala jurutera kimia mereka bentuk loji untuk pengeluaran berskala besar dalam industri.'
        }
      ],
      quiz: [
        {
          id: 't4-b1-s1-q1',
          question: 'Antara pernyataan berikut, yang manakah mentakrifkan maksud kimia dengan tepat mengikut KSSM?',
          options: [
            'Kajian tentang organisma hidup dan interaksinya dengan alam sekitar',
            'Kajian tentang komposisi, struktur, sifat dan interaksi antara jirim',
            'Kajian tentang daya, gerakan dan tenaga dalam sistem fizikal',
            'Kajian tentang batuan, mineral dan struktur lapisan bumi'
          ],
          answerIndex: 1,
          explanation: 'Kimia ialah sains yang mengkaji komposisi, struktur, sifat dan interaksi antara jirim serta perubahan tenaga semasa tindak balas.',
          level: 'Rendah',
          spmReference: 'SPM 2021 Kertas 1 No. 1'
        },
        {
          id: 't4-b1-s1-q2',
          question: 'Perkataan "kimia" berasal daripada perkataan bahasa Arab "al-kimiya". Apakah maksud istilah tersebut?',
          options: [
            'Seni merawat penyakit kronik',
            'Sains mengukur pergerakan planet',
            'Seni mengubah atau mentransformasikan bahan',
            'Kaedah mencari ketumpatan logam'
          ],
          answerIndex: 2,
          explanation: '"Al-kimiya" daripada tamadun Arab merujuk kepada seni mengubah atau mentransformasikan bahan asas kepada bahan lain.',
          level: 'Rendah'
        },
        {
          id: 't4-b1-s1-q3',
          question: 'Bahan kimia manakah yang lazim digunakan sebagai bahan pengawet dalam pemprosesan makanan untuk menghalang pertumbuhan mikroorganisma?',
          options: [
            'Natrium benzoat',
            'Monosodium glutamat',
            'Asid askorbik',
            'Kalsium karbonat'
          ],
          answerIndex: 0,
          explanation: 'Natrium benzoat digunakan secara meluas sebagai pengawet makanan berasid (sos, jus, jem) untuk merencat pertumbuhan bakteria dan kulat.',
          level: 'Sederhana',
          spmReference: 'Percubaan SPM SBP 2022'
        },
        {
          id: 't4-b1-s1-q4',
          question: 'Bahan nano mempunyai sifat istimewa berbanding bahan pukal kerana mempunyai nisbah luas permukaan kepada isi padu yang sangat tinggi. Berapakah julat ukuran saiz zarah nano?',
          options: [
            '1 mm hingga 100 mm',
            '1 µm hingga 100 µm',
            '1 nm hingga 100 nm',
            '100 nm hingga 1000 nm'
          ],
          answerIndex: 2,
          explanation: 'Skala nanoteknologi ditakrifkan untuk zarah atau struktur yang bersaiz antara 1 hingga 100 nanometer (1 nm = 1 × 10⁻⁹ m).',
          level: 'Sederhana'
        },
        {
          id: 't4-b1-s1-q5',
          question: 'Sebuah syarikat pembuatan ingin mengurangkan pencemaran alam sekitar dengan menggantikan plastik konvensional berasaskan petroleum kepada bioplastik terbiodegradasi daripada kanji jagung. Konsep kimia manakah yang diaplikasikan?',
          options: [
            'Nanoteknologi fizikal',
            'Teknologi Hijau (Green Technology)',
            'Kimia Petrokimia Tulen',
            'Metalurgi Logam Berat'
          ],
          answerIndex: 1,
          explanation: 'Penggunaan bioplastik terbiodegradasi untuk menggantikan plastik sintetik merupakan aplikasi teras Teknologi Hijau dalam melestarikan alam sekitar.',
          level: 'Tinggi (KBAT)',
          spmReference: 'Soalan KBAT SPM Kertas 2'
        },
        {
          id: 't4-b1-s1-q6',
          question: 'Seorang pakar dianalisis untuk mengenal pasti jenis dadah dan racun yang terdapat pada spesimen mangsa jenayah. Apakah gelaran profesional bagi kerjaya tersebut?',
          options: [
            'Jurutera Petrokimia',
            'Pakar Sains Forensik',
            'Agronomis Pertanian',
            'Ahli Metalurgi'
          ],
          answerIndex: 1,
          explanation: 'Pakar Sains Forensik / Toksikologi Forensik mengaplikasikan teknik analisis kimia untuk mengenal pasti bahan bukti jenayah seperti racun, dadah, dan DNA.',
          level: 'Sederhana'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // SUBTOPIK 1.2
    // -------------------------------------------------------------------------
    {
      id: 't4-b1-s2',
      code: '1.2',
      title: 'Penyiasatan Saintifik dalam Kimia',
      learningStandard: 'SP 1.2.1, 1.2.2',
      durationMinutes: 20,
      tldr: [
        'Kaedah saintifik ialah kaedah sistematik yang digunakan oleh ahli sains untuk menyelesaikan masalah melalui 11 langkah berperingkat.',
        'Langkah utama: Membuat pemerhatian → Mengenal pasti masalah → Membuat hipotesis → Mengenal pasti pemboleh ubah (MV, RV, CV) → Merancang & menjalankan eksperimen → Mengumpul & mentafsir data → Membuat kesimpulan.',
        'Eksperimen wajib: Mengkaji kesan suhu terhadap keterlarutan garam dalam air.',
        'Kunci Skema SPM: Pemboleh ubah WAJIB dinyatakan bersama parameter yang boleh diukur (cth: "Suhu air", bukan "Suhu"; "Jisim garam yang larut", bukan "Garam").'
      ],
      simulationRef: {
        id: 'keterlarutan-garam',
        title: 'Makmal Maya Keterlarutan Garam',
        description: 'Uji keterlarutan pelbagai jenis garam dalam air pada suhu berbeza secara interaktif.',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=keterlarutan-garam',
        previewBadge: 'Simulasi Bab 1 & 6'
      },
      concepts: [
        {
          id: 't4-b1-s2-c1',
          title: '11 Langkah Kaedah Saintifik dalam Kimia',
          badge: 'Format SPM Kertas 3',
          content: `
            <p>
              Penyiasatan saintifik ialah pendekatan berkaedah yang teratur untuk menyiasat fenomena semula jadi dan membuktikan hipotesis sains. Berikut ialah turutan 11 langkah wajib:
            </p>
            <ol class="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 mt-2">
              <li><b>Membuat pemerhatian:</b> Menggunakan deria (penglihatan, pendengaran, sentuhan, bau) untuk mengumpul maklumat awal tentang sesuatu fenomena atau perubahan jirim.</li>
              <li><b>Membuat inferens:</b> Menyatakan penerangan awal yang munasabah untuk menerangkan pemerhatian yang dibuat.</li>
              <li><b>Mengenal pasti masalah:</b> Mengajukan soalan berdasarkan inferens yang dibuat (cth: <i>"Bagaimanakah suhu air mempengaruhi keterlarutan garam?"</i>).</li>
              <li><b>Membuat hipotesis:</b> Menyatakan pernyataan umum tentang hubungan antara pemboleh ubah dimanipulasikan (MV) dengan pemboleh ubah bergerak balas (RV) yang boleh diuji kebenarannya.</li>
              <li><b>Mengenal pasti pemboleh ubah:</b> Menentukan MV, RV, dan CV dengan jelas beserta parameter yang tepat.</li>
              <li><b>Mengawal pemboleh ubah:</b> Memastikan pemboleh ubah dimalarkan (CV) tidak berubah sepanjang eksperimen untuk memastikan keadilan ujian (*fair test*).</li>
              <li><b>Merancang eksperimen:</b> Menyenaraikan radas, bahan kimia, prosedur langkah demi langkah, dan langkah keselamatan.</li>
              <li><b>Mengumpul data:</b> Merekod pemerhatian atau bacaan kuantitatif dalam jadual berformat kemas lengkap dengan unit.</li>
              <li><b>Mentafsir data:</b> Menganalisis data menggunakan graf atau pengiraan matematik untuk mencari pola hubungan.</li>
              <li><b>Membuat kesimpulan:</b> Menerima atau menolak hipotesis asal yang dinyatakan pada awal eksperimen.</li>
              <li><b>Menulis laporan:</b> Mendokumentasikan keseluruhan proses penyiasatan secara terperinci untuk dinilai atau diulangi oleh saintis lain.</li>
            </ol>
          `
        },
        {
          id: 't4-b1-s2-c2',
          title: 'Panduan Skema SPM: Penulisan Pemboleh Ubah & Hipotesis',
          badge: 'Teknik Menjawab SPM',
          content: `
            <p>
              Dalam peperiksaan SPM (terutamanya Amali Bertulis Kertas 3 dan Soalan Struktur Merancang Eksperimen Kertas 2), calon kerap kehilangan markah kerana kecuaian menyatakan pemboleh ubah:
            </p>
            <div class="space-y-2 mt-2">
              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-sky-700">1. Pemboleh Ubah Dimanipulasikan (MV)</span>
                <p class="text-slate-600 mt-0.5">Faktor yang diubah atau diselaraskan secara sengaja oleh pengkaji. Wajib ada parameter!</p>
                <div class="text-[11px] text-emerald-700 font-semibold mt-1">✅ Contoh Betul: Suhu air / Kepekatan asid hidroklorik / Saiz ketulan marmar</div>
                <div class="text-[11px] text-rose-600 font-semibold">❌ Contoh Salah: Suhu / Asid / Ketulan marmar (Tiada parameter)</div>
              </div>

              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-indigo-700">2. Pemboleh Ubah Bergerak Balas (RV)</span>
                <p class="text-slate-600 mt-0.5">Perkara yang diperhatikan atau diukur sebagai hasil daripada perubahan MV.</p>
                <div class="text-[11px] text-emerald-700 font-semibold mt-1">✅ Contoh Betul: Jisim garam yang larut / Masa yang diambil untuk tanda 'X' hilang / Isi padu gas hidrogen terkumpul</div>
                <div class="text-[11px] text-rose-600 font-semibold">❌ Contoh Salah: Garam larut / Masa / Gas hidrogen</div>
              </div>

              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-teal-700">3. Pemboleh Ubah Dimalarkan (CV)</span>
                <p class="text-slate-600 mt-0.5">Faktor yang dikekalkan tetap sepanjang eksperimen supaya tidak mempengaruhi keputusan RV.</p>
                <div class="text-[11px] text-emerald-700 font-semibold mt-1">✅ Contoh Betul: Isi padu air suling / Kadar kacauan / Jisim ketulan zink</div>
              </div>
            </div>
          `
        },
        {
          id: 't4-b1-s2-c3',
          title: 'Eksperimen Wajib: Kesan Suhu terhadap Keterlarutan Garam dalam Air',
          badge: 'Eksperimen Standard DSKP',
          content: `
            <p>
              <b>Tujuan:</b> Mengkaji kesan suhu pelarut air terhadap keterlarutan garam kalium klorida (KCl) atau natrium klorida (NaCl) dalam air.
            </p>
            <ul class="list-disc pl-5 space-y-1 text-xs text-slate-700 my-2">
              <li><b>Pemboleh ubah MV:</b> Suhu air suling (°C) [cth: 20°C, 40°C, 60°C, 80°C]</li>
              <li><b>Pemboleh ubah RV:</b> Jisim garam yang larut dalam 100 cm³ air suling (g)</li>
              <li><b>Pemboleh ubah CV:</b> Isi padu air suling (100 cm³), jenis garam, kadar kacauan rod kaca</li>
              <li><b>Hipotesis:</b> <span class="blur-target"><b>Semakin tinggi suhu air suling, semakin tinggi jisim garam yang larut</b></span> dalam air.</li>
            </ul>
            <div class="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
              📊 <b>Pemerhatian & Kesimpulan Graf:</b> Graf jisim garam larut melawan suhu air menghasilkan lengkung berkecerunan positif. Tenaga haba yang lebih tinggi meningkatkan tenaga kinetik zarah pelarut air, membolehkan lebih banyak zarah garam dilarutkan dan dipisahkan.
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menulis hipotesis tanpa menyatakan arah hubungan pemboleh ubah dengan jelas.',
          correction: 'Tulis hipotesis mengikut format standard: "Semakin bertambah [MV], semakin bertambah/berkurang [RV]".',
          why: 'Ayat seperti "Suhu mempengaruhi keterlarutan garam" TIDAK diterima dalam skema SPM kerana tidak menyatakan bagaimana MV mengubah RV.',
          spmTip: 'Sentiasa nyatakan arah hubungan (semakin tinggi/rendah) dalam ayat hipotesis anda.'
        },
        {
          mistake: 'Menyambungkan titik-titik data pada graf menggunakan pembaris menjadi garis zigzag bergerigi.',
          correction: 'Lengkung keterlarutan garam melawan suhu mesti dilukis sebagai garis lengkung licin penyesuaian terbaik (best-fit smooth curve).',
          why: 'Garis zigzag menunjukkan ketidakcekapan dalam tafsiran pola data sains.',
          spmTip: 'Jangan guna pembaris untuk menyambungkan titik lengkung! Gunakan tangan yang stabil untuk melukis keluk licin melalui purata titik.'
        }
      ],
      flashcards: [
        {
          id: 't4-b1-s2-fc1',
          front: 'Apakah perbezaan antara "Pemerhatian" dan "Inferens"?',
          back: 'Pemerhatian dibuat menggunakan deria secara langsung (fakta), manakala inferens ialah tafsiran atau sebab munasabah yang menerangkan pemerhatian tersebut.'
        },
        {
          id: 't4-b1-s2-fc2',
          front: 'Apakah format standard untuk menulis "Hipotesis" dalam Kertas SPM?',
          back: 'Semakin bertambah/meningkat [Pemboleh ubah dimanipulasikan], semakin bertambah/berkurang [Pemboleh ubah bergerak balas].'
        },
        {
          id: 't4-b1-s2-fc3',
          front: 'Mengapakah perkataan "Suhu" sahaja tidak layak mendapat markah penuh bagi Pemboleh Ubah MV?',
          back: 'Kerana tiada parameter spesifik. Wajib ditulis bersama bahan atau persekitaran yang diukur, contohnya "Suhu air" atau "Suhu larutan".'
        },
        {
          id: 't4-b1-s2-fc4',
          front: 'Dalam eksperimen mengkaji kesan suhu terhadap keterlarutan garam, apakah pemboleh ubah dimalarkan (CV)?',
          back: 'Isi padu air suling yang digunakan (cth: 100 cm³), jenis garam, dan kadar kacauan.'
        },
        {
          id: 't4-b1-s2-fc5',
          front: 'Apakah kesimpulan bagi eksperimen kesan suhu terhadap keterlarutan garam?',
          back: 'Semakin tinggi suhu air, semakin tinggi keterlarutan garam (jisim garam yang larut) dalam air. Hipotesis diterima.'
        }
      ],
      quiz: [
        {
          id: 't4-b1-s2-q1',
          question: 'Seorang murid mendapati warna perang air bromin menjadi tidak berwarna apabila digoncang bersama heksena. Murid tersebut membuat andaian bahawa tindak balas penambahan telah berlaku. Apakah langkah kaedah saintifik yang terlibat dalam andaian tersebut?',
          options: [
            'Membuat kesimpulan muktamad',
            'Membuat inferens',
            'Mengawal pemboleh ubah',
            'Menulis laporan amali'
          ],
          answerIndex: 1,
          explanation: 'Penerangan awal yang munasabah untuk menerangkan pemerhatian (warna perang hilang) merupakan satu inferens.',
          level: 'Rendah',
          spmReference: 'SPM 2022 Kertas 1'
        },
        {
          id: 't4-b1-s2-q2',
          question: 'Dalam eksperimen menyiasat kesan kepekatan larutan natrium tiosulfat terhadap masa yang diambil untuk tanda "X" hilang daripada pandangan, apakah pemboleh ubah bergerak balas (RV)?',
          options: [
            'Kepekatan larutan natrium tiosulfat',
            'Masa yang diambil untuk tanda "X" tidak kelihatan',
            'Suhu larutan natrium tiosulfat',
            'Isi padu asid sulfurik yang ditambah'
          ],
          answerIndex: 1,
          explanation: 'Masa yang diambil untuk tanda "X" hilang ialah pemboleh ubah bergerak balas (RV) kerana ia diukur untuk mencerminkan kadar tindak balas.',
          level: 'Sederhana'
        },
        {
          id: 't4-b1-s2-q3',
          question: 'Pernyataan manakah yang memenuhi kriteria skema pemarkahan SPM bagi penulisan hipotesis saintifik?',
          options: [
            'Suhu air mempengaruhi kelarutan gula dalam cawan.',
            'Adakah keterlarutan garam bertambah apabila dipanaskan?',
            'Semakin tinggi suhu air suling, semakin tinggi keterlarutan garam kalium klorida.',
            'Garam kalium klorida larut dengan cepat dalam air panas.'
          ],
          answerIndex: 2,
          explanation: 'Hipotesis mesti menyatakan hubungan yang jelas dan boleh diuji antara MV (suhu air suling) dan RV (keterlarutan garam).',
          level: 'Sederhana',
          spmReference: 'Format Penskoran SPM Kertas 2'
        },
        {
          id: 't4-b1-s2-q4',
          question: 'Rajah menunjukkan graf keterlarutan garam X dalam 100 g air melawan suhu. Pada suhu 60°C, keterlarutan garam X ialah 55 g. Berapakah jisim mendakan yang terbentuk jika larutan tepu pada 60°C disejukkan ke suhu 20°C (keterlarutan pada 20°C ialah 32 g)?',
          options: [
            '55 g',
            '32 g',
            '23 g',
            '87 g'
          ],
          answerIndex: 2,
          explanation: 'Jisim mendakan yang terbentuk = Keterlarutan pada 60°C - Keterlarutan pada 20°C = 55 g - 32 g = 23 g mendakan pepejal.',
          level: 'Tinggi (KBAT)',
          spmReference: 'Soalan Aplikasi Kuantitatif SPM'
        },
        {
          id: 't4-b1-s2-q5',
          question: 'Mengapakah pemboleh ubah dimalarkan (CV) wajib dikekalkan tetap dalam sesuatu eksperimen saintifik?',
          options: [
            'Supaya eksperimen dapat diselesaikan dalam masa yang lebih pantas',
            'Untuk memastikan perubahan pada RV hanya disebabkan semata-mata oleh MV',
            'Bagi membolehkan radas makmal digunakan berulang kali',
            'Untuk mengurangkan kos pembelian bahan kimia'
          ],
          answerIndex: 1,
          explanation: 'Mengekalkan CV memastikan ujian yang adil (fair test) di mana sebarang perubahan pada RV dapat dipastikan berpunca daripada MV sahaja.',
          level: 'Rendah'
        },
        {
          id: 't4-b1-s2-q6',
          question: 'Seorang murid ingin menyiasat kesan saiz zarah kalsium karbonat terhadap kadar tindak balas dengan asid hidroklorik. Antara berikut, susunan pemboleh ubah manakah yang betul?',
          options: [
            'MV: Saiz ketulan kalsium karbonat | RV: Isi padu gas CO₂ per unit masa | CV: Kepekatan & isi padu asid hidroklorik',
            'MV: Jisim kalsium karbonat | RV: Kepekatan asid | CV: Saiz kalsium karbonat',
            'MV: Suhu campuran | RV: Masa tindak balas | CV: Saiz kalsium karbonat',
            'MV: Isi padu gas terbebas | RV: Saiz ketulan marmar | CV: Tekanan atmosfera'
          ],
          answerIndex: 0,
          explanation: 'MV ialah saiz zarah kalsium karbonat (ketulan vs serbuk), RV ialah kadar penghasilan gas CO₂, manakala kepekatan & isi padu asid hidroklorik dimalarkan (CV).',
          level: 'Tinggi (KBAT)',
          spmReference: 'SPM Kertas 3 Format Baharu'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // SUBTOPIK 1.3
    // -------------------------------------------------------------------------
    {
      id: 't4-b1-s3',
      code: '1.3',
      title: 'Penggunaan, Pengurusan dan Pengendalian Radas serta Bahan Kimia',
      learningStandard: 'SP 1.3.1, 1.3.2, 1.3.3',
      durationMinutes: 20,
      tldr: [
        'Alat Pelindung Diri (PPE) wajib dipakai: Gogal (mata), Topeng Muka (pernafasan), Sarung Tangan Nitril (tangan), Baju Makmal (badan), dan Kasut Bertutup (kaki).',
        'Peralatan keselamatan makmal utama: Kebuk Wasap (gas beracun/meruap seperti Cl₂, NO₂), Stesen Pencuci Mata, Pancuran Kecemasan, dan Pemadam Api.',
        'Sisa bahan kimia dengan pH < 5 dan pH > 9 TIDAK BOLEH dibuang ke dalam singki. Kumpul dalam bekas sisa khas berlabel.',
        'Langkah kecemasan tumpahan merkuri (Wajib Hafal): Maklumkan guru → Jadikan kawasan larangan → Tabur serbuk sulfur (menghasilkan HgS tak meruap) → Hubungi bomba/hazmat.'
      ],
      concepts: [
        {
          id: 't4-b1-s3-c1',
          title: 'Alat Pelindung Diri (PPE) dalam Makmal Kimia',
          badge: 'Keselamatan Wajib SPM',
          content: `
            <p>
              Semasa berada di dalam makmal kimia, murid wajib memakai <b>Alat Pelindung Diri (Personal Protective Equipment - PPE)</b> yang lengkap bagi mengelakkan kemalangan dan kecederaan:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
              <div class="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <span class="font-bold text-sky-800 text-xs">🥽 Kaca Mata Keselamatan (Gogal)</span>
                <p class="text-[11px] text-slate-600 mt-0.5">Melindungi mata daripada percikan bahan kimia berbahaya, asid/alkali pekat, wap meruap, dan serpihan kaca.</p>
              </div>

              <div class="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <span class="font-bold text-indigo-800 text-xs">😷 Topeng Muka / Pelitup Muka</span>
                <p class="text-[11px] text-slate-600 mt-0.5">Melindungi saluran pernafasan daripada terhidu habuk serbuk kimia, gas meruap, dan wap beracun.</p>
              </div>

              <div class="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <span class="font-bold text-teal-800 text-xs">🧤 Sarung Tangan Getah / Nitril</span>
                <p class="text-[11px] text-slate-600 mt-0.5">Melindungi kulit tangan daripada terkena bahan kimia yang mengakis, toksik, atau mudah menyerap ke dalam kulit.</p>
              </div>

              <div class="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <span class="font-bold text-amber-800 text-xs">🥼 Baju Makmal (Kot Makmal)</span>
                <p class="text-[11px] text-slate-600 mt-0.5">Melindungi pakaian dan kulit badan daripada tumpahan atau percikan bahan kimia yang merosakkan kain.</p>
              </div>

              <div class="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs sm:col-span-2">
                <span class="font-bold text-rose-800 text-xs">👟 Kasut Bertutup Sepenuhnya</span>
                <p class="text-[11px] text-slate-600 mt-0.5">Wajib dipakai (selipar/sandal DILARANG). Melindungi kaki daripada kecederaan akibat tumpahan asid/alkali dan serpihan kaca tajam yang jatuh ke lantai.</p>
              </div>
            </div>
          `
        },
        {
          id: 't4-b1-s3-c2',
          title: 'Peralatan Keselamatan Makmal dan Fungsinya',
          badge: 'Wajib Tahu SPM',
          content: `
            <p>
              Makmal kimia dilengkapi kemudahan kecemasan khas yang mesti diketahui lokasi dan cara operasinya:
            </p>
            <ul class="list-disc pl-5 space-y-1.5 text-xs text-slate-700 mt-2">
              <li>
                <b>Kebuk Wasap (Fume Chamber):</b> Ruang bertutup berventilasi khas untuk menjalankan eksperimen yang membebaskan <span class="blur-target"><b>gas beracun, merengsa atau meruap</b></span> (contohnya gas klorin Cl₂, nitrogen dioksida NO₂, wap bromin Br₂, dan asid nitrik pekat).
              </li>
              <li>
                <b>Pencuci Mata (Eyewash Station):</b> Digunakan untuk <span class="blur-target"><b>membilas dan mencuci mata yang terkena percikan bahan kimia</b></span> serta-merta dengan aliran air bersih selama sekurang-kurangnya 15 minit.
              </li>
              <li>
                <b>Pancuran Air Kecemasan (Safety Shower):</b> Digunakan untuk membasuh dan membersihkan badan serta pakaian apabila terkena tumpahan bahan kimia dalam kuantiti yang banyak atau memadamkan pakaian yang terbakar.
              </li>
              <li>
                <b>Alat Pemadam Api & Selimut Api:</b> Digunakan untuk memadamkan kebakaran kecil di dalam makmal (jenis pemadam api serbuk kering, CO₂, atau selimut api untuk membalut mangsa yang pakaiannya terbakar).
              </li>
            </ul>
          `
        },
        {
          id: 't4-b1-s3-c3',
          title: 'Pengurusan, Penyimpanan dan Pelupusan Sisa Kimia',
          badge: 'Prosedur Standard DSKP',
          content: `
            <p>
              Pelupusan sisa bahan kimia secara sembarangan boleh merosakkan sistem saliran paip dan mencemarkan alam sekitar. Jadual berikut menghuraikan kaedah pengurusan sisa mengikut kategori:
            </p>
          `,
          comparisonTable: {
            headers: ['Kategori Sisa Kimia', 'Contoh Bahan', 'Kaedah Pengurusan & Pelupusan Betul'],
            rows: [
              [
                '<b>Bahan dengan nilai pH &lt; 5 dan pH &gt; 9</b>',
                'Asid sulfurik pekat, asid hidroklorik pekat, larutan natrium hidroksida pekat',
                '<b>DILARANG</b> dibuang terus ke dalam singki! Kumpul dalam bekas sisa bertutup khas berlabel untuk dineutralkan sebelum pelupusan berjadual.'
              ],
              [
                '<b>Pelarut Organik & Hidrokarbon</b>',
                'Etanol, propanon, kloroform, benzena, etil etanoat',
                'Simpan dalam bekas sisa organik bertutup ketat (kaca/plastik khas). Jauhkan daripada sumber api kerana mudah terbakar.'
              ],
              [
                '<b>Logam Berat & Bahan Toksik</b>',
                'Garam plumbum(II), merkuri, barium, arsenik',
                'Kumpul dalam botol sisa logam berat berasingan. Jangan campur dengan sisa lain. Dilupuskan oleh kontraktor bertauliah (DOE/KAS).'
              ],
              [
                '<b>Bahan Pepejal & Kaca Pecah</b>',
                'Bikar pecah, kertas turas terpakai, pita magnesium hangus',
                'Kaca pecah dibuang ke dalam tong khas sisa kaca (bukan tong sampah biasa). Sisa pepejal kimia dikumpul berasingan.'
              ],
              [
                '<b>Bahan Reaktif & Mudah Teroksida</b>',
                'Logam litium (Li), natrium (Na), kalium (K)',
                'Mesti disimpan terendam sepenuhnya di dalam <b>minyak parafin</b> untuk mengelakkannya bertindak balas dengan wap air dan oksigen dalam udara.'
              ],
              [
                '<b>Bahan Peka Cahaya</b>',
                'Larutan argentum nitrat (AgNO₃), asid nitrik pekat, cecair bromin',
                'Mesti disimpan di dalam <b>botol kaca gelap (amber bottle)</b> untuk menghalang penguraian fotokimia oleh cahaya matahari.'
              ]
            ]
          }
        },
        {
          id: 't4-b1-s3-c4',
          title: 'Prosedur Kemalangan: Pengurusan Tumpahan Merkuri',
          badge: 'Soalan Emas SPM (Wajib Hafal)',
          content: `
            <p>
              Termometer makmal mengandungi merkuri (Hg). Merkuri ialah cecair logam berat yang <span class="blur-target"><b>mudah meruap pada suhu bilik</b></span> membentuk wap toksik yang tidak berwarna dan tidak berbau. Keracunan merkuri menyerang sistem saraf pusat, menyebabkan tremor, loya, dan kerosakan buah pinggang kekal.
            </p>
            <div class="p-4 rounded-3xl bg-rose-50/90 border border-rose-300 text-xs text-rose-950 space-y-2 mt-2">
              <span class="font-extrabold text-rose-900 block text-sm">🚨 4 Langkah Pantas Menangani Tumpahan Merkuri:</span>
              <ol class="list-decimal pl-5 space-y-1.5 leading-relaxed">
                <li><b>Maklumkan kepada guru atau pembantu makmal</b> dengan serta-merta.</li>
                <li><b>Jadikan kawasan tumpahan sebagai kawasan larangan</b> (arahkan semua murid keluar dan buka semua tingkap makmal untuk peredaran udara).</li>
                <li><b>Tabur serbuk sulfur</b> di atas tumpahan merkuri untuk menutup keseluruhan titisan merkuri. <i>(Tindak balas: Hg + S → HgS yang bersifat pepejal stabil dan tidak meruap)</i>.</li>
                <li><b>Hubungi pihak Jabatan Bomba dan Penyelamat (Unit HAZMAT)</b> untuk tindakan pembersihan dan pelupusan selamat.</li>
              </ol>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Mengesyorkan penggunaan air atau mop untuk membersihkan tumpahan merkuri.',
          correction: 'JANGAN sesekali menyiram air atau menyapu tumpahan merkuri dengan mop/penyapu! Tabur serbuk sulfur serta-merta di atasnya.',
          why: 'Air atau sapuan mop akan memecahkan titisan merkuri kepada titisan mikroskopik yang lebih halus, meningkatkan luas permukaan dan mempercepatkan pembebasan wap merkuri beracun ke udara.',
          spmTip: 'Kata kunci skema SPM untuk tumpahan merkuri ialah: "Tabur serbuk sulfur" dan "Hubungi pihak bomba/hazmat".'
        },
        {
          mistake: 'Membuang sisa asid pekat terus ke dalam singki makmal sambil mengalirkan air.',
          correction: 'Sisa bahan kimia dengan pH < 5 dan pH > 9 mesti dimasukkan ke dalam bekas sisa khas berlabel dan dineutralkan sebelum dilupuskan.',
          why: 'Asid pekat menghakis paip saliran logam/PVC makmal dan boleh menghasilkan gas berbahaya serta meracuni sumber air bawah tanah.',
          spmTip: 'Hafal had nilai pH larutan yang tidak boleh dibuang terus ke dalam singki: pH < 5 dan pH > 9.'
        },
        {
          mistake: 'Memanaskan cecair organik yang mudah meruap dan mudah terbakar (contohnya alkohol) secara terus dengan api penunu Bunsen.',
          correction: 'Pemanasan cecair mudah terbakar mesti menggunakan kaedah kukus air (water bath) tanpa api terbuka berdekatan.',
          why: 'Wap alkohol sangat mudah terbakar dan boleh menyambar api penunu Bunsen serta-merta mengakibatkan letupan atau kebakaran makmal.',
          spmTip: 'Dalam soalan SPM tentang penyediaan ester atau pemanasan etanol, perkataan "kukus air" (water bath) membawa markah teknik.'
        }
      ],
      flashcards: [
        {
          id: 't4-b1-s3-fc1',
          front: 'Apakah fungsi utama kebuk wasap (fume chamber) di dalam makmal kimia?',
          back: 'Ruang khas berventilasi untuk menjalankan eksperimen yang menghasilkan gas meruap, beracun atau menghakis (cth: Cl₂, NO₂, Br₂).'
        },
        {
          id: 't4-b1-s3-fc2',
          front: 'Berapakah nilai pH sisa bahan kimia yang TIDAK BOLEH dibuang terus ke dalam singki makmal?',
          back: 'Bahan kimia yang mempunyai nilai pH < 5 (asid kuat) dan nilai pH > 9 (alkali kuat).'
        },
        {
          id: 't4-b1-s3-fc3',
          front: 'Bagaimanakah cara yang betul untuk menyimpan logam alkali reaktif seperti natrium (Na) dan kalium (K)?',
          back: 'Disimpan terendam sepenuhnya di dalam minyak parafin untuk menghalang tindak balas dengan oksigen dan wap air dalam udara.'
        },
        {
          id: 't4-b1-s3-fc4',
          front: 'Apakah bahan kimia yang mesti ditaburkan di atas tumpahan merkuri daripada termometer yang pecah?',
          back: 'Serbuk sulfur (membentuk sebatian merkuri(II) sulfida, HgS yang tidak meruap dan selamat dibersihkan).'
        },
        {
          id: 't4-b1-s3-fc5',
          front: 'Mengapakah larutan argentum nitrat (AgNO₃) dan asid nitrik pekat mesti disimpan dalam botol kaca gelap (amber)?',
          back: 'Untuk menghalang cahaya matahari daripada menguraikan sebatian kimia tersebut (pencegahan penguraian fotokimia).'
        }
      ],
      quiz: [
        {
          id: 't4-b1-s3-q1',
          question: 'Seorang murid ingin menjalankan tindak balas pemanasan serbuk plumbum(II) nitrat yang menghasilkan gas perang nitrogen dioksida, NO₂ yang menyesakkan nafas. Di manakah eksperimen ini mesti dijalankan?',
          options: [
            'Di atas meja makmal terbuka berdekatan tingkap',
            'Di dalam kebuk wasap (fume chamber)',
            'Di hadapan stesen pencuci mata',
            'Di bawah pancuran air kecemasan'
          ],
          answerIndex: 1,
          explanation: 'Eksperimen yang menghasilkan gas beracun, menyesakkan nafas atau menghakis seperti NO₂ mesti dijalankan di dalam kebuk wasap.',
          level: 'Rendah',
          spmReference: 'SPM 2021 Kertas 1'
        },
        {
          id: 't4-b1-s3-q2',
          question: 'Antara sisa bahan kimia berikut, yang manakah BOLEH dibuang terus ke dalam singki makmal dengan aliran air yang banyak?',
          options: [
            'Asid sulfurik pekat (pH 1)',
            'Larutan natrium klorida cair (pH 7)',
            'Pelarut organik kloroform',
            'Sisa larutan plumbum(II) nitrat'
          ],
          answerIndex: 1,
          explanation: 'Larutan natrium klorida cair ialah larutan neutral (pH 7) yang tidak toksik dan tidak menghakis, maka selamat dibuang ke dalam singki.',
          level: 'Sederhana'
        },
        {
          id: 't4-b1-s3-q3',
          question: 'Sebatang termometer merkuri telah jatuh dan pecah di atas lantai makmal. Apakah tindakan paling tepat yang perlu dilakukan oleh murid tersebut?',
          options: [
            'Menyiram tumpahan merkuri dengan air paip dan mengelapnya menggunakan kertas tisu',
            'Menyapu merkuri menggunakan penyapu ke dalam tong sampah biasa',
            'Memberitahu guru dan menabur serbuk sulfur untuk menutup tumpahan merkuri',
            'Menghidupkan kipas meja untuk menghembus wap merkuri keluar'
          ],
          answerIndex: 2,
          explanation: 'Prosedur piawai tumpahan merkuri ialah memaklumkan guru, menjadikan kawasan larangan, dan menabur serbuk sulfur untuk mengelakkan pembebasan wap beracun.',
          level: 'Sederhana',
          spmReference: 'Percubaan SPM Terengganu 2023'
        },
        {
          id: 't4-b1-s3-q4',
          question: 'Mengapakah logam natrium dan kalium mesti disimpan terendam di dalam minyak parafin di dalam botol kaca?',
          options: [
            'Untuk mengelakkan logam tersebut daripada mencair pada suhu bilik',
            'Bagi menghalang tindak balas cergas dengan wap air dan oksigen dalam udara',
            'Untuk mengekalkan kekilauan permukaan logam daripada pudar',
            'Supaya ketumpatan logam kekal lebih tinggi daripada air'
          ],
          answerIndex: 1,
          explanation: 'Logam Kumpulan 1 sangat reaktif dan bertindak balas cergas dengan air dan oksigen dalam udara menghasilkan gas hidrogen dan haba yang boleh mencetuskan letupan.',
          level: 'Sederhana'
        },
        {
          id: 't4-b1-s3-q5',
          question: 'Semasa menjalankan eksperimen pengesteran antara etanol dan asid etanoik pekat, seorang murid mencadangkan pemanasan campuran menggunakan api penunu Bunsen secara terus. Mengapakah cadangan murid ini berbahaya?',
          options: [
            'Etanol ialah cecair meruap yang sangat mudah terbakar sekiranya terdedah kepada api terbuka',
            'Asid etanoik akan membeku serta-merta apabila dipanaskan dengan api kuat',
            'Tindak balas akan menghasilkan gas klorin yang beracun',
            'Hasil ester akan bertukar menjadi mendakan hitam mendap'
          ],
          answerIndex: 0,
          explanation: 'Etanol mempunyai takat didih rendah (78°C) dan wapnya sangat mudah terbakar. Oleh itu, pemanasan mesti dilakukan menggunakan kukus air (water bath).',
          level: 'Tinggi (KBAT)',
          spmReference: 'Soalan KBAT Keselamatan Makmal SPM'
        },
        {
          id: 't4-b1-s3-q6',
          question: 'Apakah alat perlindungan diri (PPE) yang paling penting dipakai oleh murid bagi mengelakkan buta kekal sekiranya asid nitrik pekat terpercik semasa proses penuangan?',
          options: [
            'Pelitup muka N95',
            'Baju makmal berlengan panjang',
            'Kaca mata keselamatan (Gogal)',
            'Sarung tangan kain kapas'
          ],
          answerIndex: 2,
          explanation: 'Gogal keselamatan melindungi kornea mata daripada percikan bahan kimia yang menghakis seperti asid nitrik pekat.',
          level: 'Rendah'
        }
      ]
    }
  ]
};
