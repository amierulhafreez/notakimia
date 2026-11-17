import { Chapter } from '../types/nota';

export const T5_BAB2: Chapter = {
  id: 't5-b2',
  form: 'T5',
  chapterNumber: 2,
  title: 'Sebatian Karbon',
  theme: 'Kimia Organik',
  durationMinutes: 180,
  description:
    'Pengelasan sebatian karbon organik dan tak organik, hidrokarbon tepu dan tak tepu, 6 siri homolog utama (alkana, alkena, alkuna, alkohol, asid karboksilik, ester), sifat kimia dan tindak balas penambahan, penyediaan etanol dan pengesteran, serta keisomeran struktur dan penamaan IUPAC.',
  iconName: 'Boxes',
  subtopicCount: 6,
  subtopics: [
    // -------------------------------------------------------------
    // SUBTOPIK 2.1: JENIS-JENIS SEBATIAN KARBON
    // -------------------------------------------------------------
    {
      id: 't5-b2-s1',
      code: '2.1',
      title: 'Jenis-jenis Sebatian Karbon',
      learningStandard: 'SP 2.1.1, 2.1.2',
      durationMinutes: 25,
      tldr: [
        'Sebatian karbon ialah sebatian yang mengandungi unsur karbon sebagai salah satu unsur juzuknya.',
        'Pengelasan utama: 1. Sebatian Organik (berasal daripada benda hidup, cth: karbohidrat, protein, petroleum); 2. Sebatian Tak Organik (berasal daripada benda bukan hidup, cth: CO₂, CaCO₃, KCN).',
        'Sebatian organik dikelaskan kepada Hidrokarbon (hanya mengandungi karbon dan hidrogen sahaja) dan Bukan Hidrokarbon (mengandungi C, H, dan unsur lain seperti O, N, P, halogen).',
        'Hidrokarbon Tepu: Hanya mengandungi ikatan kovalen tunggal (C-C) antara atom karbon (cth: alkana).',
        'Hidrokarbon Tak Tepu: Mengandungi sekurang-kurangnya satu ikatan kovalen ganda dua (C=C) atau ganda tiga (C≡C) antara atom karbon (cth: alkena dan alkuna).',
        'Sumber utama hidrokarbon ialah petroleum (minyak mentah) yang dipisahkan melalui penyulingan berperingkat berdasarkan perbezaan takat didih, serta proses peretakan (cracking) untuk memecahkan molekul hidrokarbon rantai panjang kepada molekul yang lebih kecil dan berguna.'
      ],
      concepts: [
        {
          id: 't5-b2-s1-c1',
          title: 'Pengelasan Sebatian Karbon: Organik vs Tak Organik & Hidrokarbon',
          badge: 'Peta Konsep Organik SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                  Hierarki Pengelasan Sebatian Karbon
                </span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Sebatian karbon terbahagi kepada dua keluarga besar berdasarkan asal-usul dan sifat kimianya:
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <div class="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                    <b class="text-emerald-950 block font-bold text-sm border-b border-emerald-200 pb-1">
                      1. Sebatian Karbon Organik
                    </b>
                    <p class="text-emerald-900 leading-relaxed">
                      Sebatian yang berasal daripada <b>benda hidup (tumbuhan dan haiwan)</b> atau bahan fosil purba. Mengandungi ikatan kovalen karbon-karbon.
                    </p>
                    <div class="text-[11px] text-emerald-800 bg-white/70 p-2 rounded-lg border border-emerald-300">
                      <b>Contoh:</b> Glukosa (C₆H₁₂O₆), metana (CH₄), etanol (C₂H₅OH), asid etanoik, protein, lemak, dan petroleum.
                    </div>
                  </div>

                  <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <b class="text-slate-900 block font-bold text-sm border-b border-slate-200 pb-1">
                      2. Sebatian Karbon Tak Organik
                    </b>
                    <p class="text-slate-800 leading-relaxed">
                      Sebatian karbon yang berasal daripada <b>benda bukan hidup seperti batuan mineral kerak bumi dan atmosfera</b>.
                    </p>
                    <div class="text-[11px] text-slate-700 bg-white p-2 rounded-lg border border-slate-300">
                      <b>Contoh:</b> Karbon dioksida (CO₂), karbon monoksida (CO), kalsium karbonat (CaCO₃), natrium hidrogen karbonat (NaHCO₃), kalium sianida (KCN).
                    </div>
                  </div>
                </div>

                <!-- HIDROKARBON VS BUKAN HIDROKARBON -->
                <div class="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-xs">
                  <b class="text-sky-950 block font-bold mb-1.5 flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-sky-600"></span> Pembahagian Sebatian Organik:
                  </b>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    <div class="p-2.5 rounded-xl bg-white border border-sky-200">
                      <b class="text-sky-900">Hidrokarbon (HANYA C dan H):</b>
                      <p class="text-slate-600 mt-1">Sebatian organik yang mengandungi unsur <b>karbon dan hidrogen sahaja</b>. Cth: metana (CH₄), etena (C₂H₄), propuna (C₃H₄).</p>
                    </div>
                    <div class="p-2.5 rounded-xl bg-white border border-sky-200">
                      <b class="text-sky-900">Bukan Hidrokarbon:</b>
                      <p class="text-slate-600 mt-1">Sebatian organik yang mengandungi unsur <b>karbon, hidrogen dan unsur lain</b> seperti oksigen, nitrogen, atau halogen. Cth: etanol (C₂H₅OH), asid etanoik (CH₃COOH).</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- TEPU VS TAK TEPU -->
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                  Perbezaan Hidrokarbon Tepu vs Hidrokarbon Tak Tepu (Wajib SPM)
                </span>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div class="p-3 rounded-xl bg-blue-50 border border-blue-200">
                    <b class="text-blue-900 block font-bold mb-1">Hidrokarbon Tepu (Saturated)</b>
                    <ul class="list-disc pl-4 space-y-1 text-blue-800">
                      <li>Hanya mempunyai <b>ikatan kovalen tunggal (C–C)</b> di antara semua atom karbon.</li>
                      <li>Setiap atom karbon memegang bilangan maksimum atom hidrogen.</li>
                      <li>Kurang reaktif secara kimia.</li>
                      <li><b>Contoh siri homolog:</b> Alkana (cth: etana, C₂H₆).</li>
                    </ul>
                  </div>

                  <div class="p-3 rounded-xl bg-rose-50 border border-rose-200">
                    <b class="text-rose-900 block font-bold mb-1">Hidrokarbon Tak Tepu (Unsaturated)</b>
                    <ul class="list-disc pl-4 space-y-1 text-rose-800">
                      <li>Mengandungi sekurang-kurangnya satu <b>ikatan kovalen ganda dua (C=C)</b> atau <b>ganda tiga (C≡C)</b>.</li>
                      <li>Boleh menerima atom tambahan melalui tindak balas penambahan.</li>
                      <li>Lebih reaktif secara kimia.</li>
                      <li><b>Contoh siri homolog:</b> Alkena (C=C, cth: etena, C₂H₄) dan Alkuna (C≡C, cth: etuna, C₂H₂).</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b2-s1-c2',
          title: 'Sumber Hidrokarbon: Petroleum, Penyulingan Berperingkat & Peretakan',
          badge: 'Industri Petroleum SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  Penyulingan Berperingkat Petroleum & Proses Peretakan (Cracking)
                </span>
                
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  <b>Petroleum</b> ialah campuran kompleks pelbagai hidrokarbon rantai lurus dan bercabang yang terbentuk daripada mendapan sisa hidupan laut purba berjuta-juta tahun dahulu di bawah haba dan tekanan bumi yang tinggi:
                </p>

                <div class="space-y-2.5 text-xs text-slate-700">
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-900 block mb-1">1. Penyulingan Berperingkat (Fractional Distillation):</b>
                    <p class="text-slate-600 leading-relaxed">
                      Pecahan-pecahan petroleum diasingkan di dalam menara pemeringkat berasaskan <b>perbezaan takat didih</b>. Hidrokarbon rantai pendek mendidih pada suhu lebih rendah dan terkondensasi di bahagian atas menara (cth: gas petroleum, petrol), manakala hidrokarbon rantai panjang mendidih pada suhu tinggi dan terkumpul di bahagian bawah menara (cth: minyak diesel, minyak pelincir, bitumen).
                    </p>
                  </div>

                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-900 block mb-1">2. Proses Peretakan (Cracking):</b>
                    <p class="text-slate-600 leading-relaxed">
                      Proses penguraian hidrokarbon rantai panjang kepada molekul hidrokarbon yang lebih kecil dan bernilai komersial tinggi (seperti petrol dan alkena untuk industri polimer).
                      <br/><b>Keadaan Optimum:</b> Suhu tinggi (sekitar 500°C) dan kehadiran mangkin <b>campuran aluminium oksida (Al₂O₃) dan silikon dioksida (SiO₂)</b> atau zeolit.
                    </p>
                    <div class="mt-1.5 p-2 rounded-lg bg-white border border-slate-300 font-mono text-[11px] text-sky-900">
                      Contoh persamaan: C₁₀H₂₂ (dekana rantai panjang) → C₅H₁₂ (pentana, petrol) + C₂H₄ (etena) + C₃H₆ (propena)
                    </div>
                  </div>

                  <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                    <b class="text-emerald-900 block mb-1">3. Sumber Tenaga Alternatif Boleh Baharu:</b>
                    <p class="leading-relaxed">
                      Oleh sebab petroleum adalah sumber bahan api fosil yang tidak boleh diperbaharui, sumber hidrokarbon dan bahan api alternatif daripada biojisim diperkenalkan: <b>Biogas</b> (daripada penguraian sisa najis ternakan/kelapa sawit), <b>Biodiesel</b> (daripada minyak sawit), dan <b>Bioetanol</b> (daripada penapaian tebu atau kanji).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menganggap gas karbon dioksida (CO₂) dan kalsium karbonat (CaCO₃) sebagai sebatian organik kerana mengandungi atom karbon.',
          correction: 'CO₂, CO, karbonat logam (CaCO₃) dan sianida (KCN) dikelaskan sebagai SEBATIAN TAK ORGANIK kerana berasal daripada mineral bukan hidup dan tidak mempunyai sifat kimia organik.',
          why: 'Sebatian organik memerlukan ikatan kovalen karbon-karbon atau karbon-hidrogen.',
          spmTip: 'Sentiasa ingat: Walaupun ada unsur C, CO₂ dan CaCO₃ ialah sebatian tak organik.'
        },
        {
          mistake: 'Menyatakan alkohol (etanol, C₂H₅OH) sebagai hidrokarbon.',
          correction: 'Etanol ialah BUKAN HIDROKARBON kerana mengandungi unsur oksigen (O) selain daripada karbon dan hidrogen.',
          why: 'Takrif hidrokarbon sangat ketat: MESTI hanya mengandungi unsur karbon dan hidrogen SAHAJA.',
          spmTip: 'Tulis dalam peperiksaan: "Hidrokarbon ialah sebatian organik yang mengandungi karbon dan hidrogen sahaja".'
        }
      ],
      flashcards: [
        {
          id: 't5-b2-s1-fc1',
          front: 'Apakah maksud sebatian organik dan berikan dua contoh lazim?',
          back: 'Sebatian yang mengandungi karbon dan lazimnya berasal daripada benda hidup (cth: glukosa C₆H₁₂O₆, metana CH₄, etanol C₂H₅OH).'
        },
        {
          id: 't5-b2-s1-fc2',
          front: 'Apakah definisi hidrokarbon mengikut sukatan Kimia SPM?',
          back: 'Sebatian organik yang mengandungi unsur karbon dan hidrogen sahaja.'
        },
        {
          id: 't5-b2-s1-fc3',
          front: 'Apakah perbezaan struktur antara hidrokarbon tepu dan hidrokarbon tak tepu?',
          back: 'Hidrokarbon tepu hanya mempunyai ikatan tunggal (C–C), manakala hidrokarbon tak tepu mempunyai sekurang-kurangnya satu ikatan ganda dua (C=C) atau ganda tiga (C≡C).'
        },
        {
          id: 't5-b2-s1-fc4',
          front: 'Apakah prinsip pemisahan pecahan petroleum dalam menara penyulingan berperingkat?',
          back: 'Berasaskan perbezaan takat didih pecahan hidrokarbon. Takat didih rendah terkondensasi di atas; takat didih tinggi terkumpul di bawah.'
        },
        {
          id: 't5-b2-s1-fc5',
          front: 'Apakah maksud proses peretakan (cracking) dan apakah mangkin yang digunakan?',
          back: 'Proses pemecahan molekul hidrokarbon rantai panjang kepada molekul rantai lebih pendek. Mangkin: Serpihan porselin / Al₂O₃ dan SiO₂ pada suhu ~500°C.'
        }
      ],
      quiz: [
        {
          id: 't5-b2-s1-q1',
          question: 'Antara sebatian karbon berikut, yang manakah merupakan sebatian karbon tak organik?',
          options: ['Etanol, C₂H₅OH', 'Asid etanoik, CH₃COOH', 'Kalsium karbonat, CaCO₃', 'Glukosa, C₆H₁₂O₆'],
          answerIndex: 2,
          explanation: 'Kalsium karbonat (CaCO₃) merupakan garam mineral bukan organik yang diperoleh daripada batu kapur, bukan daripada benda hidup.',
          level: 'Rendah'
        },
        {
          id: 't5-b2-s1-q2',
          question: 'Antara bahan berikut, yang manakah boleh dikelaskan sebagai hidrokarbon?',
          options: ['Propana, C₃H₈', 'Asid propanoik, C₂H₅COOH', 'Metil metanoat, HCOOCH₃', 'Propanol, C₃H₇OH'],
          answerIndex: 0,
          explanation: 'Propana (C₃H₈) mengandungi unsur karbon dan hidrogen sahaja, menjadikannya satu-satunya hidrokarbon dalam senarai.',
          level: 'Rendah'
        },
        {
          id: 't5-b2-s1-q3',
          question: 'Mengapakah etena (C₂H₄) dikelaskan sebagai hidrokarbon tak tepu manakala etana (C₂H₆) dikelaskan sebagai hidrokarbon tepu?',
          options: [
            'Etena larut dalam air manakala etana tidak larut dalam air',
            'Etena mempunyai ikatan ganda dua antara atom karbon (C=C) manakala etana hanya mempunyai ikatan tunggal (C–C)',
            'Etena mengandungi bilangan atom hidrogen yang lebih banyak daripada etana',
            'Etena berasal daripada tumbuhan manakala etana daripada haiwan'
          ],
          answerIndex: 1,
          explanation: 'Kehadiran ikatan ganda dua C=C mentakrifkan etena sebagai hidrokarbon tak tepu kerana ia masih boleh menerima atom lain melalui tindak balas penambahan.',
          level: 'Sederhana'
        },
        {
          id: 't5-b2-s1-q4',
          question: 'Dalam menara penyulingan berperingkat petroleum, pecahan manakah yang akan terkondensasi dan dikumpulkan pada aras paling atas?',
          options: ['Minyak diesel', 'Minyak tanah (kerosin)', 'Gas petroleum', 'Bitumen'],
          answerIndex: 2,
          explanation: 'Gas petroleum (cth: metana, etana, propana, butana) mempunyai saiz molekul paling kecil dan takat didih paling rendah (< 40°C), maka ia naik ke bahagian paling atas menara.',
          level: 'Rendah'
        },
        {
          id: 't5-b2-s1-q5',
          question: 'Persamaan berikut mewakili proses peretakan satu pecahan hidrokarbon: C₁₄H₃₀ → 2 C₂H₄ + C₃H₆ + X. Apakah formula molekul bagi sebatian X?',
          options: ['C₇H₁₆', 'C₇H₁₄', 'C₈H₁₈', 'C₈H₁₆'],
          answerIndex: 0,
          explanation: 'Jumlah atom C asal = 14. Hasil yang diketahui: (2 × 2) + 3 = 7 atom C. Baki C = 14 - 7 = 7. Jumlah atom H asal = 30. Hasil diketahui: (2 × 4) + 6 = 14. Baki H = 30 - 14 = 16. Maka X = C₇H₁₆ (heptana).',
          level: 'Sederhana'
        },
        {
          id: 't5-b2-s1-q6',
          question: 'Mengapakah proses peretakan (cracking) sangat penting dari segi ekonomi kepada industri penapisan petroleum global?',
          options: [
            'Kerana ia menukarkan bitumen gelap kepada minyak pelincir yang mahal',
            'Kerana permintaan terhadap pecahan hidrokarbon rantai pendek (seperti petrol dan bahan mentah plastik) jauh melebihi bekalannya dalam minyak mentah',
            'Kerana ia menghasilkan gas oksigen untuk membantu pembakaran enjin',
            'Kerana ia menghapuskan sisa karbon dioksida dalam minyak mentah'
          ],
          answerIndex: 1,
          explanation: 'Minyak mentah mengandungi pecahan rantai panjang yang berlebihan tetapi bernilai rendah; peretakan menukarkannya kepada petrol (bahan api kenderaan) dan alkena rantai pendek (monomer plastik).',
          level: 'Tinggi (KBAT)'
        }
      ]
    },

    // -------------------------------------------------------------
    // SUBTOPIK 2.2: SIRI HOMOLOG
    // -------------------------------------------------------------
    {
      id: 't5-b2-s2',
      code: '2.2',
      title: 'Siri Homolog',
      learningStandard: 'SP 2.2.1, 2.2.2, 2.2.3',
      durationMinutes: 30,
      tldr: [
        'Siri homolog ialah satu keluarga sebatian organik yang berkongsi formula am yang sama, kumpulan berfungsi yang sama, dan menunjukkan sifat kimia yang serupa.',
        '4 Ciri umum siri homolog: 1. Mempunyai formula am yang sama; 2. Mempunyai kumpulan berfungsi yang sama; 3. Ahli berturutan berbeza sebanyak satu kumpulan –CH₂– (jisim molekul relatif berbeza sebanyak 14 unit); 4. Menunjukkan sifat kimia yang serupa tetapi sifat fizik berubah secara beransur-ansur.',
        '6 Siri Homolog Utama KSSM: Alkana (CₙH₂ₙ₊₂), Alkena (CₙH₂ₙ, C=C), Alkuna (CₙH₂ₙ₋₂, C≡C), Alkohol (CₙH₂ₙ₊₁OH, –OH), Asid Karboksilik (CₙH₂ₙ₊₁COOH, –COOH), Ester (CₙH₂ₙ₊₁COOCₘH₂ₘ₊₁, –COO–).',
        'Penamaan IUPAC mengikut bilangan atom karbon: 1: Met-, 2: Et-, 3: Prop-, 4: But-, 5: Pent-, 6: Heks-, 7: Hept-, 8: Okt-, 9: Non-, 10: Dek-.',
        'Perubahan sifat fizik: Apabila bilangan atom karbon bertambah, saiz molekul bertambah, daya tarikan Van der Waals antara molekul menjadi semakin kuat, maka takat lebur dan takat didih meningkat, kelikatan bertambah dan kemudahbakaran berkurang.'
      ],
      simulationRef: {
        id: 'pembina-struktur-karbon',
        title: 'Makmal Maya Pembina Struktur & Penamaan IUPAC',
        description: 'Bina pelbagai rantai karbon organik, kenal pasti kumpulan berfungsi, dan namakan mengikut sistem IUPAC secara interaktif.',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=pembina-struktur-karbon',
        previewBadge: 'Simulasi Bab 2.2'
      },
      concepts: [
        {
          id: 't5-b2-s2-c1',
          title: '6 Siri Homolog Kimia Organik, Formula Am & Kumpulan Berfungsi (Jadual Wajib SPM)',
          badge: 'Jadual Teras SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="overflow-x-auto my-2">
                <table class="w-full text-xs text-left border-collapse border border-slate-200">
                  <thead>
                    <tr class="bg-slate-100 text-slate-800">
                      <th class="p-2.5 border border-slate-200">Siri Homolog</th>
                      <th class="p-2.5 border border-slate-200">Formula Am</th>
                      <th class="p-2.5 border border-slate-200">Kumpulan Berfungsi</th>
                      <th class="p-2.5 border border-slate-200">Akhiran Nama</th>
                      <th class="p-2.5 border border-slate-200">Ahli Pertama</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200 text-slate-700">
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-sky-950">1. Alkana</td>
                      <td class="p-2.5 font-mono text-sky-800">CₙH₂ₙ₊₂ (n = 1, 2, 3...)</td>
                      <td class="p-2.5">Ikatan kovalen tunggal (C–C)</td>
                      <td class="p-2.5 font-semibold text-sky-700">-ana</td>
                      <td class="p-2.5 font-mono">Metana, CH₄</td>
                    </tr>
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-teal-950">2. Alkena</td>
                      <td class="p-2.5 font-mono text-teal-800">CₙH₂ₙ (n = 2, 3...)</td>
                      <td class="p-2.5">Ikatan ganda dua (C=C)</td>
                      <td class="p-2.5 font-semibold text-teal-700">-ena</td>
                      <td class="p-2.5 font-mono">Etena, C₂H₄</td>
                    </tr>
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-amber-950">3. Alkuna</td>
                      <td class="p-2.5 font-mono text-amber-800">CₙH₂ₙ₋₂ (n = 2, 3...)</td>
                      <td class="p-2.5">Ikatan ganda tiga (C≡C)</td>
                      <td class="p-2.5 font-semibold text-amber-700">-una</td>
                      <td class="p-2.5 font-mono">Etuna, C₂H₂</td>
                    </tr>
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-indigo-950">4. Alkohol</td>
                      <td class="p-2.5 font-mono text-indigo-800">CₙH₂ₙ₊₁OH (n = 1, 2...)</td>
                      <td class="p-2.5">Kumpulan hidroksil (–OH)</td>
                      <td class="p-2.5 font-semibold text-indigo-700">-anol</td>
                      <td class="p-2.5 font-mono">Metanol, CH₃OH</td>
                    </tr>
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-rose-950">5. Asid Karboksilik</td>
                      <td class="p-2.5 font-mono text-rose-800">CₙH₂ₙ₊₁COOH (n = 0, 1...)</td>
                      <td class="p-2.5">Kumpulan karboksil (–COOH)</td>
                      <td class="p-2.5 font-semibold text-rose-700">asid ...-anoik</td>
                      <td class="p-2.5 font-mono">Asid metanoik, HCOOH</td>
                    </tr>
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-purple-950">6. Ester</td>
                      <td class="p-2.5 font-mono text-purple-800">CₙH₂ₙ₊₁COOCₘH₂ₘ₊₁</td>
                      <td class="p-2.5">Kumpulan karboksilat (–COO–)</td>
                      <td class="p-2.5 font-semibold text-purple-700">...il ...anoat</td>
                      <td class="p-2.5 font-mono">Metil metanoat, HCOOCH₃</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- AWALAN BILANGAN ATOM KARBON -->
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <b class="text-slate-900 block font-bold mb-2">Awalan Nama Berdasarkan Bilangan Atom Karbon (Wajib Hafal):</b>
                <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center font-mono">
                  <div class="p-1.5 rounded-lg bg-white border border-slate-200"><b>1 C:</b> Met-</div>
                  <div class="p-1.5 rounded-lg bg-white border border-slate-200"><b>2 C:</b> Et-</div>
                  <div class="p-1.5 rounded-lg bg-white border border-slate-200"><b>3 C:</b> Prop-</div>
                  <div class="p-1.5 rounded-lg bg-white border border-slate-200"><b>4 C:</b> But-</div>
                  <div class="p-1.5 rounded-lg bg-white border border-slate-200"><b>5 C:</b> Pent-</div>
                  <div class="p-1.5 rounded-lg bg-white border border-slate-200"><b>6 C:</b> Heks-</div>
                  <div class="p-1.5 rounded-lg bg-white border border-slate-200"><b>7 C:</b> Hept-</div>
                  <div class="p-1.5 rounded-lg bg-white border border-slate-200"><b>8 C:</b> Okt-</div>
                  <div class="p-1.5 rounded-lg bg-white border border-slate-200"><b>9 C:</b> Non-</div>
                  <div class="p-1.5 rounded-lg bg-white border border-slate-200"><b>10 C:</b> Dek-</div>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b2-s2-c2',
          title: 'Sifat Fizik & Corak Perubahan Merentasi Siri Homolog',
          badge: 'Corak Sifat Fizik SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  Kesan Pertambahan Bilangan Atom Karbon Terhadap Sifat Fizik (Skema Esei SPM)
                </span>
                
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Apabila menuruni sesuatu siri homolog dari ahli pertama ke ahli seterusnya, bilangan atom karbon per molekul bertambah secara seragam. Perubahan ini mempengaruhi sifat fizik seperti berikut:
                </p>

                <div class="space-y-2 text-xs">
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-900 block mb-0.5">1. Takat Lebur & Takat Didih Meningkat:</b>
                    <span class="text-slate-600">Saiz molekul bertambah → <b>Daya tarikan Van der Waals antara molekul menjadi semakin kuat</b> → Lebih banyak tenaga haba diperlukan untuk mengatasi daya tarikan ini semasa peleburan dan pendidihan.</span>
                  </div>

                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-900 block mb-0.5">2. Keadaan Fizik pada Suhu Bilik:</b>
                    <span class="text-slate-600">Bagi alkana: C₁ hingga C₄ ialah <b>gas</b>; C₅ hingga C₁₆ ialah <b>cecair</b>; C₁₇ ke atas ialah <b>pepejal</b> lembut / berlilin.</span>
                  </div>

                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-900 block mb-0.5">3. Ketumpatan & Kelikatan Meningkat:</b>
                    <span class="text-slate-600">Jisim molekul bertambah menyebabkan cecair menjadi semakin pekat, likat, dan sukar mengalir.</span>
                  </div>

                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-900 block mb-0.5">4. Kemudahbakaran Berkurang:</b>
                    <span class="text-slate-600">Molekul yang lebih besar mempunyai peratusan karbon mengikut jisim yang lebih tinggi dan memerlukan lebih banyak oksigen untuk pembakaran lengkap, menjadikannya lebih sukar dinyalakan dan menghasilkan lebih banyak jelaga.</span>
                  </div>
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menulis formula ahli pertama asid karboksilik sebagai CH₃COOH.',
          correction: 'Ahli PERTAMA asid karboksilik mempunyai n = 0 dalam formula CₙH₂ₙ₊₁COOH, iaitu HCOOH (asid metanoik). CH₃COOH (asid etanoik) ialah ahli KEDUA.',
          why: 'Kumpulan karboksil –COOH sudah mempunyai 1 atom karbon.',
          spmTip: 'Sentiasa semak nilai n bagi asid karboksilik bermula dari n = 0, bukan n = 1.'
        },
        {
          mistake: 'Menyatakan alkena atau alkuna mempunyai ahli dengan satu atom karbon (metena / metuna).',
          correction: 'TIADA metena atau metuna! Ikatan ganda dua (C=C) atau ganda tiga (C≡C) memerlukan sekurang-kurangnya DUA atom karbon. Ahli pertama alkena ialah etena (C₂H₄).',
          why: 'Ikatan ganda dua mesti wujud di antara karbon dan karbon, bukan karbon dan hidrogen.',
          spmTip: 'Bagi alkena dan alkuna, nilai n sentiasa bermula dari n = 2.'
        }
      ],
      flashcards: [
        {
          id: 't5-b2-s2-fc1',
          front: 'Apakah empat ciri sepunya bagi sesuatu siri homolog dalam kimia organik?',
          back: '1. Formula am yang sama; 2. Kumpulan berfungsi yang sama; 3. Sifat kimia yang serupa; 4. Ahli berturutan berbeza dengan satu kumpulan –CH₂– (JMR beza 14 unit).'
        },
        {
          id: 't5-b2-s2-fc2',
          front: 'Apakah kumpulan berfungsi bagi alkohol dan asid karboksilik?',
          back: 'Alkohol: Kumpulan hidroksil (–OH). Asid karboksilik: Kumpulan karboksil (–COOH).'
        },
        {
          id: 't5-b2-s2-fc3',
          front: 'Tuliskan formula am bagi siri homolog alkuna dan namakan ahli pertamanya.',
          back: 'Formula am: CₙH₂ₙ₋₂ (di mana n ≥ 2). Ahli pertama: Etuna, C₂H₂.'
        },
        {
          id: 't5-b2-s2-fc4',
          front: 'Mengapakah takat didih alkana meningkat apabila bilangan atom karbon per molekul bertambah?',
          back: 'Saiz molekul bertambah, menyebabkan daya tarikan Van der Waals antara molekul semakin kuat dan memerlukan lebih banyak tenaga haba untuk diatasi.'
        },
        {
          id: 't5-b2-s2-fc5',
          front: 'Apakah nama IUPAC bagi sebatian hidrokarbon tak tepu dengan formula molekul C₄H₈ yang mempunyai ikatan C=C pada karbon pertama?',
          back: 'But-1-ena.'
        }
      ],
      quiz: [
        {
          id: 't5-b2-s2-q1',
          question: 'Antara berikut, yang manakah merupakan formula am bagi siri homolog alkena?',
          options: ['CₙH₂ₙ₊₂', 'CₙH₂ₙ', 'CₙH₂ₙ₋₂', 'CₙH₂ₙ₊₁OH'],
          answerIndex: 1,
          explanation: 'Formula am alkena ialah CₙH₂ₙ (dengan n ≥ 2) kerana mempunyai satu ikatan ganda dua C=C yang mengurangkan 2 atom hidrogen berbanding alkana.',
          level: 'Rendah'
        },
        {
          id: 't5-b2-s2-q2',
          question: 'Apakah kumpulan berfungsi bagi siri homolog ester?',
          options: ['Kumpulan hidroksil, –OH', 'Kumpulan karboksil, –COOH', 'Kumpulan karboksilat, –COO–', 'Ikatan ganda tiga antara karbon, C≡C'],
          answerIndex: 2,
          explanation: 'Kumpulan berfungsi ester ialah kumpulan karboksilat (–COO–) yang terletak di antara dua kumpulan alkil.',
          level: 'Rendah'
        },
        {
          id: 't5-b2-s2-q3',
          question: 'Satu sebatian hidrokarbon mempunyai formula molekul C₅H₁₀. Antara pernyataan berikut, yang manakah BENAR mengenai sebatian ini?',
          options: [
            'Ia tergolong dalam siri homolog alkana dan merupakan hidrokarbon tepu',
            'Ia merupakan ahli siri homolog alkena dengan nama pentena dan menyahwarnakan air bromin',
            'Takat didihnya lebih rendah berbanding propana (C₃H₈)',
            'Ia mempunyai kumpulan berfungsi hidroksil (–OH)'
          ],
          answerIndex: 1,
          explanation: 'C₅H₁₀ mematuhi formula CₙH₂ₙ (n = 5), maka ia ialah alkena (pentena) yang merupakan hidrokarbon tak tepu dan boleh menyahwarnakan air bromin.',
          level: 'Sederhana'
        },
        {
          id: 't5-b2-s2-q4',
          question: 'Berapakah perbezaan jisim molekul relatif (JMR) di antara dua ahli yang berturutan dalam mana-mana siri homolog?',
          options: ['12', '14', '16', '18'],
          answerIndex: 1,
          explanation: 'Ahli berturutan berbeza sebanyak satu kumpulan –CH₂–. JMR = 12 (C) + 2(1) (H) = 14 unit.',
          level: 'Rendah'
        },
        {
          id: 't5-b2-s2-q5',
          question: 'Apakah nama IUPAC bagi sebatian organik dengan formula struktur CH₃–CH₂–CH₂–COOH?',
          options: ['Asid etanoik', 'Asid propanoik', 'Asid butanoik', 'Butanol'],
          answerIndex: 2,
          explanation: 'Molekul mempunyai 4 atom karbon kesemuanya termasuk karbon dalam –COOH, maka namanya ialah asid butanoik.',
          level: 'Sederhana'
        },
        {
          id: 't5-b2-s2-q6',
          question: 'Takat didih heksana (C₆H₁₄) adalah lebih tinggi daripada butana (C₄H₁₀). Apakah faktor utama yang menyebabkan perbezaan takat didih ini?',
          options: [
            'Heksana mengandungi ikatan kovalen ganda dua yang lebih kuat',
            'Molekul heksana lebih besar dan mempunyai daya tarikan Van der Waals antara molekul yang lebih kuat',
            'Heksana membentuk ikatan hidrogen antara molekulnya',
            'Heksana mempunyai ketumpatan yang lebih rendah pada suhu bilik'
          ],
          answerIndex: 1,
          explanation: 'Dengan pertambahan bilangan atom karbon, luas permukaan sentuhan molekul heksana lebih besar, menghasilkan daya tarikan antara molekul (daya Van der Waals) yang lebih kuat yang memerlukan lebih banyak haba untuk diatasi.',
          level: 'Tinggi (KBAT)'
        }
      ]
    },

    // -------------------------------------------------------------
    // SUBTOPIK 2.3: SIFAT KIMIA DAN SALING PERTUKARAN SIRI HOMOLOG
    // -------------------------------------------------------------
    {
      id: 't5-b2-s3',
      code: '2.3',
      title: 'Sifat Kimia & Saling Pertukaran Siri Homolog',
      learningStandard: 'SP 2.3.1, 2.3.2',
      durationMinutes: 35,
      tldr: [
        'Sifat kimia Alkana: Kurang reaktif kerana ikatan tunggal C–C dan C–H yang kuat. Hanya mengalami: 1. Pembakaran; 2. Tindak balas penukargantian (substitution) dengan halogen di bawah kehadiran sinaran ultraungu (cahaya matahari).',
        'Sifat kimia Alkena: Sangat reaktif kerana kehadiran ikatan ganda dua (C=C). Mengalami tindak balas penambahan (addition reaction) di mana ikatan ganda dua terbuka menjadi ikatan tunggal.',
        '5 Tindak Balas Penambahan Alkena (Etena): 1. Penghidrogenan (+H₂, mangkin Ni, 180°C → etana); 2. Penghalogenaan (+Br₂ cecair perang dinyahwarnakan → 1,2-dibromoetana); 3. Penambahan hidrogen halida (+HCl → kloroetana); 4. Penghidratan (+stim H₂O, mangkin H₃PO₄, 300°C, 60 atm → etanol); 5. Pengoksidaan (+larutan KMnO₄ berasid warna ungu dinyahwarnakan → etana-1,2-diol).',
        'Ujian Membezakan Alkana vs Alkena: 1. Kejelagaan nyalaan: Alkena membakar dengan nyalaan LEBIH BERJELAGA berbanding alkana kerana peratusan karbon mengikut jisim lebih tinggi; 2. Ujian Air Bromin: Alkena menyahwarnakan warna perang air bromin kepada tidak berwarna (alkana tidak berubah); 3. Ujian Larutan KMnO₄ berasid: Alkena menyahwarnakan warna ungu KMnO₄ (alkana tidak berubah).'
      ],
      simulationRef: {
        id: 'alkana-lawan-alkena',
        title: 'Makmal Maya Perbandingan Alkana vs Alkena',
        description: 'Uji kejelagaan pembakaran dalam mangkuk pijar serta tindak balas air bromin dan kalium manganat(VII) berasid.',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=alkana-lawan-alkena',
        previewBadge: 'Simulasi Bab 2.3'
      },
      concepts: [
        {
          id: 't5-b2-s3-c1',
          title: 'Tindak Balas Kimia Alkana vs Alkena & 5 Tindak Balas Penambahan Alkena',
          badge: 'Tindak Balas Organik SPM',
          content: `
            <div class="space-y-3 my-2">
              <!-- TINDAK BALAS PENUKARGANTIAN ALKANA -->
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-950 uppercase tracking-wider block mb-1 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                  1. Tindak Balas Penukargantian Alkana (Dengan Gas Halogen)
                </span>
                <p class="text-xs text-slate-700 leading-relaxed mb-2">
                  Alkana tidak bertindak balas dengan halogen dalam keadaan gelap. Namun di bawah <b>sinaran ultraungu (UV)</b> atau cahaya matahari, atom hidrogen dalam alkana ditukarkan secara berperingkat oleh atom halogen:
                </p>
                <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-sky-900 space-y-1">
                  <div>CH₄ + Cl₂ <span class="text-slate-500">──(sinar UV)──></span> CH₃Cl (klorometana) + HCl</div>
                  <div>CH₃Cl + Cl₂ <span class="text-slate-500">──(sinar UV)──></span> CH₂Cl₂ (diklorometana) + HCl</div>
                  <div>CH₂Cl₂ + Cl₂ <span class="text-slate-500">──(sinar UV)──></span> CHCl₃ (triklorometana / kloroform) + HCl</div>
                  <div>CHCl₃ + Cl₂ <span class="text-slate-500">──(sinar UV)──></span> CCl₄ (tetraklorometana) + HCl</div>
                </div>
              </div>

              <!-- 5 PENAMBAHAN ALKENA -->
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-teal-950 uppercase tracking-wider block mb-2 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                  2. Lima Tindak Balas Penambahan Alkena (Ikatan C=C Terbuka)
                </span>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div class="p-2.5 rounded-xl bg-teal-50/60 border border-teal-200">
                    <b class="text-teal-950">A. Penghidrogenan (+H₂):</b>
                    <p class="text-slate-600 mt-0.5">Menukarkan alkena kepada alkana.<br/><b>Keadaan:</b> Mangkin Nikel (Ni) / Platinum (Pt), suhu 180°C.<br/>
                    <span class="font-mono text-teal-900">C₂H₄ + H₂ → C₂H₆ (etana)</span></p>
                  </div>

                  <div class="p-2.5 rounded-xl bg-teal-50/60 border border-teal-200">
                    <b class="text-teal-950">B. Penghalogenaan (+Br₂ / +Cl₂):</b>
                    <p class="text-slate-600 mt-0.5">Warna perang air bromin <b>dinyahwarnakan serta-merta</b> pada suhu bilik tanpa mangkin.<br/>
                    <span class="font-mono text-teal-900">C₂H₄ + Br₂ → CH₂Br–CH₂Br (1,2-dibromoetana)</span></p>
                  </div>

                  <div class="p-2.5 rounded-xl bg-teal-50/60 border border-teal-200">
                    <b class="text-teal-950">C. Penambahan Hidrogen Halida (+HCl / +HBr):</b>
                    <p class="text-slate-600 mt-0.5">Membentuk haloalkana pada suhu bilik.<br/>
                    <span class="font-mono text-teal-900">C₂H₄ + HCl → CH₃–CH₂Cl (kloroetana)</span></p>
                  </div>

                  <div class="p-2.5 rounded-xl bg-teal-50/60 border border-teal-200">
                    <b class="text-teal-950">D. Penghidratan (+Stim H₂O):</b>
                    <p class="text-slate-600 mt-0.5">Pembuatan alkohol dalam industri.<br/><b>Keadaan:</b> Mangkin asid fosforik (H₃PO₄), 300°C, 60 atm.<br/>
                    <span class="font-mono text-teal-900">C₂H₄ + H₂O (stim) → C₂H₅OH (etanol)</span></p>
                  </div>
                </div>

                <div class="mt-2.5 p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-xs">
                  <b class="text-purple-950">E. Pengoksidaan dengan Larutan KMnO₄ Berasid:</b>
                  <p class="text-purple-900 mt-0.5">Warna <b>ungu larutan kalium manganat(VII) berasid dinyahwarnakan</b> menjadi tidak berwarna, menghasilkan sebatian diol.<br/>
                  <span class="font-mono font-bold text-purple-950">C₂H₄ + H₂O + [O] → CH₂OH–CH₂OH (etana-1,2-diol)</span></p>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b2-s3-c2',
          title: 'Eksperimen Membezakan Alkana vs Alkena (Ujian Makmal Wajib SPM)',
          badge: 'Amali Wajib SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  Jadual Perbandingan Ujian Makmal: Heksana (Alkana) vs Heksena (Alkena)
                </span>
                
                <div class="overflow-x-auto my-2">
                  <table class="w-full text-xs text-left border-collapse border border-slate-200">
                    <thead>
                      <tr class="bg-slate-100 text-slate-800">
                        <th class="p-2.5 border border-slate-200">Ujian Makmal</th>
                        <th class="p-2.5 border border-slate-200">Heksana, C₆H₁₄ (Alkana / Tepu)</th>
                        <th class="p-2.5 border border-slate-200">Heksena, C₆H₁₂ (Alkena / Tak Tepu)</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 text-slate-700">
                      <tr>
                        <td class="p-2.5 font-bold text-slate-900">1. Pembakaran di udara (Mangkuk pijar)</td>
                        <td class="p-2.5">Membakar dengan nyalaan kuning berjelaga sedikit. Kertas turas mengumpul sedikit jelaga hitam.</td>
                        <td class="p-2.5 text-rose-800 font-semibold">Membakar dengan nyalaan SANGAT BERJELAGA. Kertas turas mengumpul jelaga hitam yang sangat banyak.</td>
                      </tr>
                      <tr>
                        <td class="p-2.5 font-bold text-slate-900">2. Tindak balas dengan Air Bromin, Br₂</td>
                        <td class="p-2.5">Warna perang air bromin <b>kekal tidak berubah</b>. Tiada tindak balas berlaku dalam gelap.</td>
                        <td class="p-2.5 text-emerald-800 font-semibold">Warna perang air bromin <b>dinyahwarnakan</b> menjadi tidak berwarna dengan cepat.</td>
                      </tr>
                      <tr>
                        <td class="p-2.5 font-bold text-slate-900">3. Tindak balas dengan Larutan KMnO₄ Berasid</td>
                        <td class="p-2.5">Warna ungu larutan KMnO₄ <b>kekal tidak berubah</b>.</td>
                        <td class="p-2.5 text-emerald-800 font-semibold">Warna ungu larutan KMnO₄ <b>dinyahwarnakan</b> menjadi tidak berwarna.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- FORMULA PERATUS KARBON SPM -->
                <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                  <b class="text-amber-900 block font-bold mb-1">Mengapakah Alkena Membakar Lebih Berjelaga Berbanding Alkana?</b>
                  <p class="leading-relaxed mb-1.5">
                    Kuantiti jelaga (karbon tak terbakar) bergantung terus kepada <b>peratusan karbon mengikut jisim</b> dalam molekul:
                  </p>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
                    <div class="p-2 rounded-lg bg-white border border-amber-200">
                      <b>Heksana, C₆H₁₄ (JMR = 86):</b><br/>
                      % C = [ (6 × 12) / 86 ] × 100% = <b>83.72%</b>
                    </div>
                    <div class="p-2 rounded-lg bg-white border border-amber-200">
                      <b>Heksena, C₆H₁₂ (JMR = 84):</b><br/>
                      % C = [ (6 × 12) / 84 ] × 100% = <b>85.71%</b>
                    </div>
                  </div>
                  <p class="mt-1.5 text-[11px] text-amber-900 font-semibold">
                    Kesimpulan SPM: Peratusan karbon mengikut jisim dalam heksena lebih tinggi berbanding heksana, maka pembakaran heksena menghasilkan lebih banyak jelaga.
                  </p>
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menganggap alkana boleh menyahwarnakan warna perang air bromin dalam keadaan gelap.',
          correction: 'Alkana TIDAK bertindak balas dengan air bromin dalam keadaan gelap. Alkana hanya mengalami penukargantian dengan halogen jika ada sinaran ultraungu (UV).',
          why: 'Alkana tepu dan stabil; pemutusan ikatan C–H memerlukan tenaga foton sinaran UV.',
          spmTip: 'Hanya alkena yang menyahwarnakan air bromin secara spontan pada suhu bilik tanpa cahaya UV.'
        },
        {
          mistake: 'Menyatakan alkena mempunyai lebih banyak atom karbon daripada alkana yang setara.',
          correction: 'Kedua-dua heksana dan heksena mempunyai 6 atom karbon yang sama, tetapi heksena mempunyai PERATUSAN karbon mengikut jisim yang lebih tinggi kerana kekurangan 2 atom hidrogen.',
          why: 'Jisim molekul heksena lebih kecil (84 vs 86), membahagikan jisim karbon yang sama menghasilkan peratusan lebih besar.',
          spmTip: 'Tunjukkan jalan kira peratusan karbon dalam jawapan esei untuk mendapat markah penuh!'
        }
      ],
      flashcards: [
        {
          id: 't5-b2-s3-fc1',
          front: 'Apakah syarat yang diperlukan untuk tindak balas penukargantian antara metana dan gas klorin berlaku?',
          back: 'Kehadiran sinaran ultraungu (UV) atau cahaya matahari untuk memulakan tindak balas pemutusan ikatan.'
        },
        {
          id: 't5-b2-s3-fc2',
          front: 'Apakah yang diperhatikan apabila gas etena dialirkan ke dalam air bromin pada suhu bilik?',
          back: 'Warna perang air bromin dinyahwarnakan menjadi larutan tidak berwarna (1,2-dibromoetana terbentuk).'
        },
        {
          id: 't5-b2-s3-fc3',
          front: 'Apakah mangkin dan keadaan optimum bagi tindak balas penghidratan etena menghasilkan etanol dalam industri?',
          back: 'Mangkin asid fosforik (H₃PO₄), suhu 300°C, dan tekanan 60 atmosfera.'
        },
        {
          id: 't5-b2-s3-fc4',
          front: 'Mengapakah alkena membakar dengan nyalaan yang lebih berjelaga berbanding alkana yang mempunyai bilangan atom karbon yang sama?',
          back: 'Kerana alkena mempunyai peratusan karbon mengikut jisim yang lebih tinggi berbanding alkana yang sepadan.'
        },
        {
          id: 't5-b2-s3-fc5',
          front: 'Apakah hasil dan perubahan warna apabila etena bertindak balas dengan larutan kalium manganat(VII) berasid?',
          back: 'Warna ungu larutan KMnO₄ berasid dinyahwarnakan menjadi tidak berwarna, menghasilkan etana-1,2-diol.'
        }
      ],
      quiz: [
        {
          id: 't5-b2-s3-q1',
          question: 'Antara reagen berikut, yang manakah boleh digunakan untuk membezakan cecair heksana daripada heksena di dalam makmal?',
          options: ['Air kapur', 'Air bromin pada suhu bilik', 'Kertas litmus merah lembap', 'Asid hidroklorik cair'],
          answerIndex: 1,
          explanation: 'Heksena (alkena) akan menyahwarnakan warna perang air bromin serta-merta, manakala heksana (alkana) tidak menunjukkan sebarang perubahan warna dalam gelap.',
          level: 'Rendah'
        },
        {
          id: 't5-b2-s3-q2',
          question: 'Persamaan berikut menunjukkan satu tindak balas organik: C₂H₄ + H₂ → C₂H₆. Apakah nama tindak balas ini dan mangkin yang digunakan?',
          options: [
            'Penghidratan menggunakan asid sulfurik',
            'Penghidrogenan menggunakan mangkin nikel pada 180°C',
            'Pendehidratan menggunakan serpihan porselin',
            'Pengoksidaan menggunakan kalium dikromat(VI)'
          ],
          answerIndex: 1,
          explanation: 'Tindak balas penambahan hidrogen kepada ikatan ganda dua alkena dinamakan penghidrogenan, memerlukan mangkin nikel atau platinum pada suhu 180°C.',
          level: 'Rendah'
        },
        {
          id: 't5-b2-s3-q3',
          question: 'Diberi jisim atom relatif: H = 1, C = 12. Hitungkan peratusan karbon mengikut jisim dalam molekul propana (C₃H₈) dan propena (C₃H₆).',
          options: [
            'Propana: 81.8%, Propena: 85.7%',
            'Propana: 85.7%, Propena: 81.8%',
            'Propana: 50.0%, Propena: 50.0%',
            'Propana: 75.0%, Propena: 90.0%'
          ],
          answerIndex: 0,
          explanation: 'Propana: (3×12)/(44) × 100% = 81.82%. Propena: (3×12)/(42) × 100% = 85.71%. Propena mempunyai peratusan karbon lebih tinggi.',
          level: 'Sederhana'
        },
        {
          id: 't5-b2-s3-q4',
          question: 'Etena bertindak balas dengan stim pada suhu 300°C dan tekanan 60 atm dengan kehadiran mangkin asid fosforik. Apakah hasil tindak balas ini?',
          options: ['Etana', 'Etanol', 'Asid etanoik', 'Etil etanoat'],
          answerIndex: 1,
          explanation: 'Penambahan molekul air (stim) merentasi ikatan ganda dua etena menghasilkan etanol: C₂H₄ + H₂O → C₂H₅OH.',
          level: 'Sederhana'
        },
        {
          id: 't5-b2-s3-q5',
          question: 'Campuran gas metana dan gas klorin disimpan di dalam silinder gas yang ditutup rapat di dalam bilik gelap. Tiada perubahan diperhatikan. Namun apabila silinder itu dibawa ke bawah cahaya matahari terik, warna kuning kehijauan gas klorin hilang dengan cepat. Mengapakah perkara ini berlaku?',
          options: [
            'Gas klorin mendidih dan bertukar menjadi cecair lut sinar',
            'Sinaran ultraungu daripada cahaya matahari memecahkan molekul klorin untuk memulakan tindak balas penukargantian dengan metana',
            'Haba matahari menyebabkan metana mengalami pempolimeran',
            'Gas klorin larut di dalam kelembapan udara'
          ],
          answerIndex: 1,
          explanation: 'Tindak balas penukargantian alkana dengan halogen ialah tindak balas fotokimia yang memerlukan foton bertenaga tinggi daripada sinaran UV untuk menghasilkan radikal klorin.',
          level: 'Tinggi (KBAT)'
        },
        {
          id: 't5-b2-s3-q6',
          question: 'Satu hidrokarbon X menyahwarnakan warna ungu larutan kalium manganat(VII) berasid dan 1 mol X bertindak balas lengkap dengan 1 mol gas hidrogen untuk membentuk butana. Apakah identiti sebatian X?',
          options: ['But-1-ena', 'Butuna', 'Butan-1-ol', 'Siklobutana'],
          answerIndex: 0,
          explanation: 'X ialah alkena dengan 4 atom karbon (but-1-ena atau but-2-ena) kerana mengandungi satu ikatan ganda dua C=C yang menyahwarnakan KMnO₄ berasid dan memerlukan tepat 1 mol H₂ untuk menjadi butana.',
          level: 'Sederhana'
        }
      ]
    },

    // -------------------------------------------------------------
    // SUBTOPIK 2.4: ALKOHOL
    // -------------------------------------------------------------
    {
      id: 't5-b2-s4',
      code: '2.4',
      title: 'Alkohol',
      learningStandard: 'SP 2.3.1',
      durationMinutes: 30,
      tldr: [
        'Alkohol ialah sebatian organik bukan hidrokarbon yang mengandungi kumpulan berfungsi hidroksil (–OH) dengan formula am CₙH₂ₙ₊₁OH (n = 1, 2, 3...).',
        'Penyediaan Etanol di Makmal: Penapaian larutan glukosa (C₆H₁₂O₆) menggunakan yis pada suhu bilik (~37°C) dalam keadaan tanpa oksigen (anaerobik) menghasilkan etanol dan gas CO₂. Enzim zimase dalam yis bertindak sebagai mangkin biologi.',
        'Penyulingan Berperingkat: Digunakan untuk memisahkan etanol (takat didih 78°C) daripada campuran hasil penapaian air (takat didih 100°C).',
        'Penyediaan Etanol dalam Industri: Penghidratan etena dengan stim pada 300°C, 60 atm dengan mangkin H₃PO₄.',
        'Sifat Fizik Etanol: Cecair tidak berwarna, berbau khas, mudah meruap, takat didih 78°C, larut campur sepenuhnya dengan air dalam semua perkadaran, dan merupakan pelarut organik yang baik.',
        '3 Sifat Kimia Utama Alkohol: 1. Pembakaran: Membakar dengan nyalaan biru bersih tanpa jelaga menghasilkan CO₂ dan H₂O; 2. Pengoksidaan: Alkohol dioksidakan oleh kalium dikromat(VI) berasid (warna jingga bertukar hijau) atau KMnO₄ berasid membentuk asid karboksilik; 3. Pendehidratan: Penyingkiran molekul air menggunakan serpihan porselin / Al₂O₃ yang dipanaskan menghasilkan alkena.'
      ],
      simulationRef: {
        id: 'penapaian-penyulingan-etanol',
        title: 'Makmal Maya Penapaian Glukosa & Penyulingan Etanol',
        description: 'Sediakan etanol melalui penapaian anaerobik glukosa bersama yis dan tumpatkan melalui radas penyulingan berperingkat.',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=penapaian-penyulingan-etanol',
        previewBadge: 'Simulasi Bab 2.4'
      },
      concepts: [
        {
          id: 't5-b2-s4-c1',
          title: 'Penyediaan Etanol: Penapaian Glukosa & Penyulingan Berperingkat (Amali SPM)',
          badge: 'Amali Wajib SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                  Penyediaan Etanol Melalui Penapaian Glukosa di Makmal
                </span>
                
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Di dalam makmal, etanol disediakan melalui proses <b>penapaian (fermentation)</b> larutan gula glukosa menggunakan kulat yis:
                </p>

                <div class="space-y-2.5 text-xs text-slate-700">
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-indigo-900 block mb-1">Persamaan Kimia Penapaian:</b>
                    <div class="p-2 rounded-lg bg-white border border-slate-300 font-mono text-center font-bold text-indigo-950">
                      C₆H₁₂O₆ (ak) ──(enzim zimase dalam yis / 37°C)──> 2 C₂H₅OH (ak) + 2 CO₂ (g)
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <b class="text-slate-800">1. Keadaan Anaerobik (Tanpa Oksigen):</b>
                      <p class="text-slate-600 mt-0.5">Kelalang kon ditutup rapat dengan penyumbat dan disambung ke salur penghantar ke dalam air kapur. Jika ada oksigen, yis akan mengoksidakan glukosa kepada air dan CO₂ sahaja (tiada etanol terhasil).</p>
                    </div>
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <b class="text-slate-800">2. Suhu Optimum 37°C:</b>
                      <p class="text-slate-600 mt-0.5">Suhu bilik sekitar 30°C–37°C ialah suhu optimum enzim zimase. Suhu melebihi 45°C akan menyahaslikan enzim dan membunuh yis.</p>
                    </div>
                  </div>

                  <div class="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-950">
                    <b class="text-sky-900 block mb-1">Penyulingan Berperingkat Campuran Penapaian:</b>
                    <p class="leading-relaxed">
                      Hasil penapaian mengandungi hanya sekitar 10%–15% etanol bercampur air dan sisa yis (kepekatan alkohol tinggi meracuni yis). Untuk mendapatkan etanol tulen, campuran dituras dan disuling menggunakan <b>radas penyulingan berperingkat</b>: Etanol yang mempunyai <b>takat didih lebih rendah (78°C)</b> akan meruap dahulu, naik melalui turus pemeringkat, dan terkondensasi di dalam kondenser Liebig menjadi cecair etanol tulen tidak berwarna.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b2-s4-c2',
          title: 'Sifat Kimia Alkohol: Pembakaran, Pengoksidaan & Pendehidratan',
          badge: 'Sifat Kimia SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                <!-- 1. PEMBAKARAN -->
                <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <span class="font-bold text-blue-900 block mb-1.5 flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-blue-500"></span> 1. Pembakaran
                    </span>
                    <p class="text-slate-600 leading-relaxed mb-2">
                      Alkohol mudah terbakar di udara dengan <b>nyalaan biru bersih tanpa jelaga</b> kerana molekulnya sudah mengandungi atom oksigen.
                    </p>
                  </div>
                  <div class="p-2 rounded-lg bg-blue-50 border border-blue-200 font-mono text-[11px] text-blue-950">
                    C₂H₅OH + 3 O₂ → 2 CO₂ + 3 H₂O
                  </div>
                </div>

                <!-- 2. PENGOKSIDAAN -->
                <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <span class="font-bold text-amber-900 block mb-1.5 flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-amber-500"></span> 2. Pengoksidaan
                    </span>
                    <p class="text-slate-600 leading-relaxed mb-2">
                      Apabila dipanaskan bersama agen pengoksidaan (K₂Cr₂O₇ berasid), alkohol dioksidakan menjadi <b>asid karboksilik</b>. Warna jingga ion Cr₂O₇²⁻ bertukar <b>hijau (ion Cr³⁺)</b>.
                    </p>
                  </div>
                  <div class="p-2 rounded-lg bg-amber-50 border border-amber-200 font-mono text-[11px] text-amber-950">
                    C₂H₅OH + 2 [O] → CH₃COOH + H₂O
                  </div>
                </div>

                <!-- 3. PENDEHIDRATAN -->
                <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <span class="font-bold text-emerald-900 block mb-1.5 flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-emerald-500"></span> 3. Pendehidratan
                    </span>
                    <p class="text-slate-600 leading-relaxed mb-2">
                      Penyingkiran molekul air daripada alkohol menggunakan mangkin <b>serpihan porselin / Al₂O₃ yang dipanaskan kuat</b> untuk menghasilkan <b>alkena</b>.
                    </p>
                  </div>
                  <div class="p-2 rounded-lg bg-emerald-50 border border-emerald-200 font-mono text-[11px] text-emerald-950">
                    C₂H₅OH ──(porselin, Δ)──> C₂H₄ + H₂O
                  </div>
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menganggap alkohol bersifat alkali kerana mengandungi kumpulan –OH.',
          correction: 'Alkohol BUKAN alkali! Kumpulan –OH dalam alkohol ialah kumpulan hidroksil kovalen, BUKAN ion hidroksida bebas (OH⁻). Larutan alkohol adalah NEUTRAL kepada kertas litmus.',
          why: 'Ikatan C–OH ialah ikatan kovalen kaku yang tidak mengion di dalam air.',
          spmTip: 'Alkohol tidak menukarkan warna kertas litmus merah atau biru (pH = 7).'
        },
        {
          mistake: 'Tertukar perubahan warna agen pengoksidaan dalam tindak balas pengoksidaan etanol.',
          correction: 'Kalium dikromat(VI) berasid bertukar daripada JINGGA ke HIJAU. Kalium manganat(VII) berasid bertukar daripada UNGU ke TIDAK BERWARNA.',
          why: 'Penurunan ion Cr₂O₇²⁻ (jingga) kepada Cr³⁺ (hijau); MnO₄⁻ (ungu) kepada Mn²⁺ (tidak berwarna).',
          spmTip: 'Catat warna asal dan warna akhir dengan tepat dalam soalan pemerhatian Kertas 2.'
        }
      ],
      flashcards: [
        {
          id: 't5-b2-s4-fc1',
          front: 'Apakah persamaan perkataan bagi proses penapaian glukosa menghasilkan etanol?',
          back: 'Glukosa ──(yis / 37°C / tanpa oksigen)──> Etanol + Gas Karbon Dioksida.'
        },
        {
          id: 't5-b2-s4-fc2',
          front: 'Mengapakah proses penapaian glukosa mesti dijalankan dalam keadaan ketiadaan oksigen (anaerobik)?',
          back: 'Supaya yis menjalankan respirasi anaerobik menghasilkan etanol. Kehadiran oksigen akan mengoksidakan glukosa kepada CO₂ dan H₂O tanpa menghasilkan alkohol.'
        },
        {
          id: 't5-b2-s4-fc3',
          front: 'Apakah kaedah fizikal yang digunakan untuk memisahkan etanol tulen daripada hasil penapaian?',
          back: 'Penyulingan berperingkat (etanol mendidih dahulu pada 78°C berbanding air pada 100°C).'
        },
        {
          id: 't5-b2-s4-fc4',
          front: 'Apakah perubahan warna yang berlaku apabila etanol dihangatkan dengan larutan kalium dikromat(VI) berasid?',
          back: 'Warna jingga larutan kalium dikromat(VI) bertukar menjadi hijau, dan bau cuka (asid etanoik) terhasil.'
        },
        {
          id: 't5-b2-s4-fc5',
          front: 'Apakah hasil tindak balas pendehidratan etanol apabila wapnya dialirkan melalui serpihan porselin yang dipanaskan?',
          back: 'Gas etena (C₂H₄) dan air (H₂O).'
        }
      ],
      quiz: [
        {
          id: 't5-b2-s4-q1',
          question: 'Apakah peranan yis dalam proses penapaian larutan glukosa untuk menghasilkan etanol?',
          options: [
            'Membekalkan gas oksigen untuk pembakaran glukosa',
            'Merembeskan enzim zimase yang bertindak sebagai mangkin biologi',
            'Menyerap haba untuk mengurangkan suhu campuran',
            'Meneutralkan asid etanoik yang terbentuk'
          ],
          answerIndex: 1,
          explanation: 'Kulat yis mengandungi enzim zimase yang memangkinkan penguraian molekul glukosa kepada etanol dan karbon dioksida.',
          level: 'Rendah'
        },
        {
          id: 't5-b2-s4-q2',
          question: 'Antara sifat fizik etanol berikut, yang manakah TIDAK BENAR?',
          options: [
            'Larut campur dengan air dalam semua perkadaran',
            'Mempunyai takat didih 78°C pada tekanan atmosfera piawai',
            'Menukarkan kertas litmus merah lembap kepada biru',
            'Mudah meruap dan cecair tidak berwarna pada suhu bilik'
          ],
          answerIndex: 2,
          explanation: 'Etanol ialah sebatian kovalen neutral (pH 7) dan tidak mengion untuk menghasilkan ion OH⁻, maka ia tidak menukarkan warna kertas litmus merah.',
          level: 'Rendah'
        },
        {
          id: 't5-b2-s4-q3',
          question: 'Wap etanol dialirkan merentasi serpihan porselin yang dipanaskan kuat di dalam tabung uji mendatar dan gas yang terbebas dikumpulkan melalui kaedah sesaran air. Apakah gas yang terbebas tersebut?',
          options: ['Gas hidrogen, H₂', 'Gas karbon dioksida, CO₂', 'Gas etena, C₂H₄', 'Gas metana, CH₄'],
          answerIndex: 2,
          explanation: 'Pemanasan etanol bersama serpihan porselin ialah tindak balas pendehidratan (penyingkiran molekul air), menukarkan etanol kepada gas etena: C₂H₅OH → C₂H₄ + H₂O.',
          level: 'Sederhana'
        },
        {
          id: 't5-b2-s4-q4',
          question: 'Campuran etanol dan larutan kalium dikromat(VI) berasid direfluks di dalam kelalang dasar bulat. Apakah bahan organik yang terhasil pada akhir eksperimen?',
          options: ['Etena', 'Etil etanoat', 'Asid etanoik', 'Metana'],
          answerIndex: 2,
          explanation: 'Pengoksidaan etanol oleh agen pengoksidaan kuat menghasilkan asid etanoik (asid karboksilik): C₂H₅OH + 2[O] → CH₃COOH + H₂O.',
          level: 'Sederhana'
        },
        {
          id: 't5-b2-s4-q5',
          question: 'Mengapakah proses penyulingan berperingkat dapat memisahkan campuran etanol dan air secara berkesan?',
          options: [
            'Etanol dan air mempunyai ketumpatan yang sama',
            'Etanol mempunyai takat didih yang lebih rendah (78°C) berbanding air (100°C)',
            'Etanol membeku pada suhu yang lebih tinggi daripada air',
            'Air meruap lebih cepat berbanding etanol'
          ],
          answerIndex: 1,
          explanation: 'Penyulingan berperingkat memisahkan cecair boleh campur berasaskan perbezaan takat didih; etanol mendidih dan meruap terlebih dahulu pada 78°C.',
          level: 'Sederhana'
        },
        {
          id: 't5-b2-s4-q6',
          question: 'Satu sampel wain yang dibiarkan terdedah kepada udara terbuka selama beberapa hari didapati bertukar menjadi masam dan berbau seperti cuka. Apakah tindak balas kimia yang telah berlaku?',
          options: [
            'Penapaian sekunder oleh yis menghasilkan metanol',
            'Bakteria Acetobacter di udara mengoksidakan etanol kepada asid etanoik menggunakan oksigen atmosfera',
            'Etanol mengalami pendehidratan membentuk gas etena berasid',
            'Air di dalam wain menyejat sepenuhnya meninggalkan mendakan asid sulfurik'
          ],
          answerIndex: 1,
          explanation: 'Bakteria Acetobacter menggunakan oksigen di udara untuk mengoksidakan etanol dalam wain kepada asid etanoik (cuka berasid masam): C₂H₅OH + O₂ → CH₃COOH + H₂O.',
          level: 'Tinggi (KBAT)'
        }
      ]
    },

    // -------------------------------------------------------------
    // SUBTOPIK 2.5: ASID KARBOKSILIK DAN ESTER
    // -------------------------------------------------------------
    {
      id: 't5-b2-s5',
      code: '2.5',
      title: 'Asid Karboksilik dan Ester',
      learningStandard: 'SP 2.3.1, 2.3.2',
      durationMinutes: 35,
      tldr: [
        'Asid karboksilik mempunyai kumpulan berfungsi karboksil (–COOH) dengan formula am CₙH₂ₙ₊₁COOH (n = 0, 1, 2...).',
        'Sifat kimia asid karboksilik: Menunjukkan sifat asid lemah (mengion separa dalam air membentuk ion H⁺): 1. Bertindak balas dengan logam reaktif (cth Mg, Zn) membebaskan gas H₂; 2. Bertindak balas dengan karbonat logam (cth CaCO₃) membebaskan gas CO₂; 3. Bertindak balas dengan bes/alkali (peneutralan) menghasilkan garam karboksilat dan air.',
        'Tindak Balas Pengesteran (Esterification): Alkohol bertindak balas dengan asid karboksilik dengan kehadiran asid sulfurik pekat (H₂SO₄ pekat) sebagai mangkin dan dipanaskan secara refluks untuk menghasilkan ester dan air.',
        'Persamaan Pengesteran Umum: Asid Karboksilik + Alkohol ⇌ Ester + Air. Cth: CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ (etil etanoat) + H₂O.',
        'Penamaan Ester: Bahagian daripada alkohol dinamakan dahulu dengan akhiran \'-il\', diikuti bahagian daripada asid karboksilik dengan akhiran \'-anoat\'. Cth: metanol + asid propanoik → metil propanoat.',
        'Sifat Fizik Ester: Cecair tidak berwarna, berbau wangi manis buah-buahan atau bunga, kurang tumpat daripada air, tidak larut dalam air, dan mudah meruap.',
        'Kegunaan Ester: Perisa tiruan makanan dan minuman (pisang, epal, oren), minyak wangi dan losyen kosmetik, serta pelarut organik untuk gam dan varnis kuku.'
      ],
      simulationRef: {
        id: 'makmal-pengesteran',
        title: 'Makmal Maya Tindak Balas Pengesteran',
        description: 'Campurkan pelbagai alkohol dan asid karboksilik dengan mangkin asid sulfurik pekat untuk menghasilkan ester wangi.',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=makmal-pengesteran',
        previewBadge: 'Simulasi Bab 2.5'
      },
      concepts: [
        {
          id: 't5-b2-s5-c1',
          title: 'Sifat Kimia Asid Karboksilik (Tindak Balas Asid Lemah Organik)',
          badge: 'Sifat Asid Organik SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-rose-900 uppercase tracking-wider block mb-2 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  Tiga Tindak Balas Asid Karboksilik (Cth: Asid Etanoik, CH₃COOH)
                </span>
                
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Asid karboksilik ialah <b>asid monoprotik lemah</b> yang mengion separa di dalam air menghasilkan kepekatan ion hidrogen (H⁺) yang rendah. Ia menunjukkan tindak balas kimia asid lazim:
                </p>

                <div class="space-y-2 text-xs">
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-900 block mb-0.5">1. Tindak Balas dengan Logam Reaktif:</b>
                    <span class="text-slate-600">Menghasilkan garam karboksilat dan membebaskan gas hidrogen, H₂ (bunyi 'pop' dengan kayu uji bernyala).</span>
                    <div class="mt-1 font-mono text-[11px] text-sky-900 font-semibold">
                      2 CH₃COOH + Mg → (CH₃COO)₂Mg (magnesium etanoat) + H₂
                    </div>
                  </div>

                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-900 block mb-0.5">2. Tindak Balas dengan Karbonat Logam:</b>
                    <span class="text-slate-600">Pembuakan berlaku membebaskan gas karbon dioksida, CO₂ (mengeruhkan air kapur).</span>
                    <div class="mt-1 font-mono text-[11px] text-sky-900 font-semibold">
                      2 CH₃COOH + CaCO₃ → (CH₃COO)₂Ca (kalsium etanoat) + CO₂ + H₂O
                    </div>
                  </div>

                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-900 block mb-0.5">3. Tindak Balas Peneutralan dengan Bes / Alkali:</b>
                    <span class="text-slate-600">Meneutralkan alkali menghasilkan larutan garam etanoat dan air.</span>
                    <div class="mt-1 font-mono text-[11px] text-sky-900 font-semibold">
                      CH₃COOH + NaOH → CH₃COONa (natrium etanoat) + H₂O
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b2-s5-c2',
          title: 'Tindak Balas Pengesteran & Kaedah Penamaan IUPAC Ester (Amali Wajib SPM)',
          badge: 'Pengesteran SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-purple-900 uppercase tracking-wider block mb-2 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                  Mekanisme & Radas Pengesteran di Makmal
                </span>
                
                <p class="text-xs text-slate-700 leading-relaxed mb-2">
                  <b>Pengesteran</b> ialah tindak balas antara asid karboksilik dengan alkohol dengan kehadiran beberapa titis <b>asid sulfurik pekat (H₂SO₄ pekat)</b> sebagai mangkin dan agen pendehidratan:
                </p>

                <div class="p-3 rounded-xl bg-purple-50 border border-purple-200 font-mono text-center text-xs text-purple-950 font-bold mb-3">
                  Asid Karboksilik + Alkohol ⇌ Ester + Air
                  <br/><span class="text-[11px] text-purple-800 font-normal">CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ (etil etanoat) + H₂O</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs mb-3">
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-800">Peranan H₂SO₄ Pekat:</b>
                    <p class="text-slate-600 mt-0.5">Bertindak sebagai <b>mangkin</b> untuk mempercepatkan tindak balas dan menyerap air bagi menganjakkan keseimbangan ke arah pembentukan ester.</p>
                  </div>
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-800">Teknik Pemanasan Rendaman Air:</b>
                    <p class="text-slate-600 mt-0.5">Campuran dipanaskan di dalam <b>kukus air (water bath)</b>, BUKAN dengan api penunu Bunsen terus kerana alkohol adalah cecair yang sangat mudah terbakar.</p>
                  </div>
                </div>

                <!-- CARA MENAMAKAN ESTER -->
                <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                  <b class="text-amber-900 block font-bold mb-1">Panduan Emas Menamakan Ester (Format IUPAC):</b>
                  <ol class="list-decimal pl-5 space-y-1">
                    <li>Bahagian <b>daripada alkohol</b> dinamakan dahulu dengan akhiran <b>'-il'</b> (cth: etanol → etil).</li>
                    <li>Bahagian <b>daripada asid karboksilik</b> dinamakan kemudian dengan akhiran <b>'-anoat'</b> (cth: asid etanoik → etanoat).</li>
                    <li>Cantumkan kedua-duanya: <span class="font-bold text-amber-900">Etil etanoat</span>.</li>
                  </ol>
                  <div class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-[11px] text-amber-900">
                    <div class="bg-white p-1.5 rounded border border-amber-200">Metanol + Asid butanoik → Metil butanoat (Bau epal)</div>
                    <div class="bg-white p-1.5 rounded border border-amber-200">Pentanol + Asid etanoik → Pentil etanoat (Bau pisang)</div>
                  </div>
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menamakan bahagian asid karboksilik terlebih dahulu semasa menamakan ester.',
          correction: 'Bahagian ALKOHOL mesti dinamakan dahulu (kumpulan alkil, -il), diikuti bahagian ASID KARBOKSILIK (-anoat). Cth: CH₃COOCH₃ ialah metil etanoat, BUKAN etanoat metil.',
          why: 'Peraturan tatanama IUPAC menetapkan nama kation/alkil ditulis di hadapan.',
          spmTip: 'Kenal pasti ikatan: Bahagian yang bersambung dengan atom O tunggal ialah kumpulan alkil daripada alkohol!'
        },
        {
          mistake: 'Memanaskan campuran tindak balas pengesteran secara terus menggunakan api penunu Bunsen.',
          correction: 'Campuran MESTI dipanaskan menggunakan KUKUS AIR (water bath) kerana alkohol dan ester adalah cecair yang sangat mudah meruap dan mudah terbakar.',
          why: 'Wap alkohol boleh menyambar api penunu Bunsen dan menyebabkan letupan atau kebakaran makmal.',
          spmTip: 'Dalam soalan prosedur amali: Sentiasa tulis "panaskan campuran menggunakan kukus air".'
        }
      ],
      flashcards: [
        {
          id: 't5-b2-s5-fc1',
          front: 'Apakah mangkin yang digunakan dalam tindak balas pengesteran antara asid karboksilik dan alkohol?',
          back: 'Asid sulfurik pekat (H₂SO₄ pekat).'
        },
        {
          id: 't5-b2-s5-fc2',
          front: 'Namakan ester yang terbentuk daripada tindak balas antara metanol dan asid propanoik.',
          back: 'Metil propanoat (formula: C₂H₅COOCH₃).'
        },
        {
          id: 't5-b2-s5-fc3',
          front: 'Nyatakan tiga sifat fizik ester.',
          back: '1. Berbau wangi manis buah-buahan; 2. Kurang tumpat daripada air (terapung); 3. Tidak larut dalam air dan cecair mudah meruap.'
        },
        {
          id: 't5-b2-s5-fc4',
          front: 'Apakah gas yang terbebas apabila asid etanoik bertindak balas dengan ketulan kalsium karbonat?',
          back: 'Gas karbon dioksida (CO₂), yang mengeruhkan air kapur.'
        },
        {
          id: 't5-b2-s5-fc5',
          front: 'Mengapakah campuran tindak balas pengesteran dituangkan ke dalam bikar berisi air selepas pemanasan?',
          back: 'Untuk melarutkan asid sulfurik dan sisa alkohol yang berlebihan, membolehkan lapisan ester terapung di atas air dan baunya mudah dikesan.'
        }
      ],
      quiz: [
        {
          id: 't5-b2-s5-q1',
          question: 'Apakah formula struktur bagi kumpulan berfungsi karboksil yang terdapat dalam asid etanoik?',
          options: ['–OH', '–COOH', '–COO–', '–CHO'],
          answerIndex: 1,
          explanation: 'Kumpulan karboksil ditulis sebagai –COOH, mengandungi satu atom karbon yang terikat secara ganda dua dengan oksigen (C=O) dan ikatan tunggal dengan kumpulan hidroksil (–OH).',
          level: 'Rendah'
        },
        {
          id: 't5-b2-s5-q2',
          question: 'Persamaan berikut mewakili tindak balas pengesteran: CH₃COOH + C₃H₇OH ⇌ X + H₂O. Apakah nama sebatian X mengikut sistem IUPAC?',
          options: ['Metil propanoat', 'Propil etanoat', 'Etil propanoat', 'Propil metanoat'],
          answerIndex: 1,
          explanation: 'Alkohol ialah propanol (C₃H₇OH → propil) dan asid ialah asid etanoik (CH₃COOH → etanoat), maka nama ester ialah propil etanoat.',
          level: 'Sederhana'
        },
        {
          id: 't5-b2-s5-q3',
          question: 'Mengapakah asid sulfurik pekat ditambah ke dalam campuran asid etanoik dan etanol semasa penyediaan etil etanoat?',
          options: [
            'Bertindak sebagai agen pengoksidaan untuk menukarkan etanol kepada asid',
            'Bertindak sebagai mangkin untuk mempercepatkan tindak balas pengesteran',
            'Menghalang ester daripada meruap ke udara',
            'Meneutralkan asid etanoik yang berlebihan'
          ],
          answerIndex: 1,
          explanation: 'Asid sulfurik pekat bertindak sebagai mangkin asid untuk mempercepatkan pencapaian keseimbangan tindak balas pengesteran.',
          level: 'Rendah'
        },
        {
          id: 't5-b2-s5-q4',
          question: 'Apakah pemerhatian yang membuktikan pembentukan ester selepas campuran asid butanoik dan etanol dipanaskan dan dituangkan ke dalam air?',
          options: [
            'Mendakan putih terbentuk dan mendap di dasar bikar',
            'Lapisan cecair tidak berwarna terapung di atas permukaan air dan berbau manis buah nanas',
            'Gas perang terbebas dengan bau sengit',
            'Warna larutan bertukar menjadi merah darah'
          ],
          answerIndex: 1,
          explanation: 'Ester (etil butanoat) tidak larut dalam air, berketumpatan lebih rendah daripada air (terapung di lapisan atas), dan menghasilkan bau manis buah-buahan yang khas.',
          level: 'Sederhana'
        },
        {
          id: 't5-b2-s5-q5',
          question: 'Antara berikut, yang manakah merupakan kegunaan utama ester dalam industri barangan pengguna?',
          options: [
            'Bahan api utama untuk roket angkasa lepas',
            'Perisa makanan tiruan dan pati wangian dalam industri kosmetik',
            'Bahan peluntur dalam serbuk pencuci pakaian',
            'Elektrolit dalam bateri kereta asid plumbum'
          ],
          answerIndex: 1,
          explanation: 'Oleh sebab baunya yang manis menyerupai buah-buahan semula jadi, ester digunakan secara meluas sebagai perisa tiruan makanan (pisang, epal, nanas) dan wangian kosmetik.',
          level: 'Rendah'
        },
        {
          id: 't5-b2-s5-q6',
          question: 'Satu ester mempunyai formula molekul C₄H₈O₂. Apabila dihidrolisiskan dengan kehadiran asid, ia menghasilkan sebatian P yang menukarkan kertas litmus biru kepada merah dan sebatian Q yang menyahwarnakan larutan kalium dikromat(VI) berasid daripada jingga kepada hijau. Apakah identiti P dan Q jika bilangan atom karbon dalam P dan Q adalah sama?',
          options: [
            'P = Asid metanoik, Q = Propanol',
            'P = Asid propanoik, Q = Metanol',
            'P = Asid etanoik, Q = Etanol',
            'P = Asid butanoik, Q = Etanol'
          ],
          answerIndex: 2,
          explanation: 'Ester C₄H₈O₂ mempunyai 4 karbon. Jika P (asid karboksilik) dan Q (alkohol) mempunyai bilangan karbon sama, setiap satu mesti mempunyai 2 atom karbon: P = asid etanoik (CH₃COOH) dan Q = etanol (C₂H₅OH). Esternya ialah etil etanoat.',
          level: 'Tinggi (KBAT)'
        }
      ]
    },

    // -------------------------------------------------------------
    // SUBTOPIK 2.6: KEISOMERAN STRUKTUR DAN PENAMAAN IUPAC
    // -------------------------------------------------------------
    {
      id: 't5-b2-s6',
      code: '2.6',
      title: 'Keisomeran Struktur & Penamaan IUPAC',
      learningStandard: 'SP 2.4.1, 2.4.2, 2.4.3',
      durationMinutes: 35,
      tldr: [
        'Keisomeran struktur ialah fenomena di mana dua atau lebih sebatian mempunyai formula molekul yang sama tetapi formula struktur yang berbeza.',
        'Isomer mempunyai formula molekul yang sama tetapi susunan atom berbeza, menyebabkan sifat fizik (takat lebur, takat didih, ketumpatan) sedikit berbeza manakala sifat kimianya adalah serupa (kerana kumpulan berfungsi sama).',
        'Jenis Keisomeran Struktur: 1. Isomer Rantai (susunan rantai karbon lurus vs bercabang); 2. Isomer Kedudukan (kedudukan ikatan ganda dua C=C atau kumpulan berfungsi –OH pada rantai karbon berbeza).',
        'Keisomeran dalam Alkana bermula daripada Butana, C₄H₁₀ (2 isomer: butana & 2-metilpropana). Pentana, C₅H₁₂ mempunyai 3 isomer (pentana, 2-metilbutana, 2,2-dimetilpropana). Metana, etana dan propana TIADA isomer.',
        'Keisomeran dalam Alkena bermula daripada Butena, C₄H₈ (3 isomer: but-1-ena, but-2-ena, 2-metilpropena).',
        'Keisomeran dalam Alkohol bermula daripada Propanol, C₃H₇OH (2 isomer: propan-1-ol, propan-2-ol). Butanol, C₄H₉OH mempunyai 4 isomer.',
        'Langkah Penamaan IUPAC: 1. Cari rantai karbon berterusan yang terpanjang; 2. Nomborkan atom karbon dari hujung paling dekat dengan kumpulan berfungsi atau cabang; 3. Kenal pasti kedudukan dan nama cabang alkil (metil, etil); 4. Cantumkan nama mengikut abjad.'
      ],
      simulationRef: {
        id: 'keisomeran-karbon',
        title: 'Makmal Maya Penerokaan Keisomeran Struktur',
        description: 'Bina dan bandingkan isomer rantai serta isomer kedudukan bagi alkana, alkena dan alkohol sehingga 5 atom karbon secara 3D.',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=keisomeran-karbon',
        previewBadge: 'Simulasi Bab 2.6'
      },
      concepts: [
        {
          id: 't5-b2-s6-c1',
          title: 'Konsep Keisomeran Struktur: Isomer Rantai vs Isomer Kedudukan (Buku Teks m/s 121)',
          badge: 'Konsep Asas SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                  Definisi & Pengelasan Keisomeran Struktur
                </span>
                
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  <b>Isomer</b> ialah molekul yang mempunyai <b>formula molekul yang sama</b> tetapi <b>formula struktur yang berbeza</b>. Dalam sukatan KSSM SPM, dua jenis keisomeran struktur yang ditekankan ialah:
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <div class="p-3 rounded-xl bg-blue-50 border border-blue-200">
                    <b class="text-blue-900 block mb-1">1. Isomer Rantai (Chain Isomerism):</b>
                    <p class="text-blue-800 leading-relaxed">
                      Perbezaan pada <b>susunan kerangka rantai karbon</b>, sama ada rantai lurus tidak bercabang atau rantai bercabang.
                      <br/><b>Contoh:</b> Butana (rantai lurus) dan 2-metilpropana (rantai bercabang) bagi formula molekul C₄H₁₀.
                    </p>
                  </div>

                  <div class="p-3 rounded-xl bg-purple-50 border border-purple-200">
                    <b class="text-purple-900 block mb-1">2. Isomer Kedudukan (Position Isomerism):</b>
                    <p class="text-purple-800 leading-relaxed">
                      Kerangka rantai karbon sama, tetapi <b>kedudukan ikatan ganda dua (C=C)</b> atau <b>kumpulan berfungsi (–OH)</b> terletak pada atom karbon bernombor berbeza.
                      <br/><b>Contoh:</b> But-1-ena dan but-2-ena bagi C₄H₈; propan-1-ol dan propan-2-ol bagi C₃H₇OH.
                    </p>
                  </div>
                </div>

                <!-- PERBANDINGAN SIFAT FIZIK ISOMER -->
                <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                  <b class="text-amber-900 block font-bold mb-1">Perbandingan Sifat Fizik Antara Isomer Lurus vs Bercabang:</b>
                  <p class="leading-relaxed">
                    Isomer rantai lurus (cth: butana) mempunyai <b>takat didih lebih tinggi</b> berbanding isomer bercabang (cth: 2-metilpropana). Hal ini kerana rantai lurus mempunyai <b>luas permukaan sentuhan molekul yang lebih besar</b>, membolehkan molekul tersusun lebih rapat dan menghasilkan daya tarikan Van der Waals antara molekul yang lebih kuat berbanding bentuk bercabang yang lebih sfera/padat.
                  </p>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b2-s6-c2',
          title: 'Contoh Isomer Alkana, Alkena & Alkohol (Jadual Rumusan Lengkap SPM)',
          badge: 'Lukisan Isomer SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Bilangan Isomer Mengikut Formula Molekul (Wajib Ingat SPM)
                </span>
                
                <div class="overflow-x-auto my-2">
                  <table class="w-full text-xs text-left border-collapse border border-slate-200">
                    <thead>
                      <tr class="bg-slate-100 text-slate-800">
                        <th class="p-2 border border-slate-200">Siri Homolog</th>
                        <th class="p-2 border border-slate-200">Formula Molekul</th>
                        <th class="p-2 border border-slate-200">Bilangan Isomer</th>
                        <th class="p-2 border border-slate-200">Nama Semua Isomer (IUPAC)</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 text-slate-700">
                      <tr>
                        <td class="p-2 font-bold text-sky-950" rowspan="2">Alkana</td>
                        <td class="p-2 font-mono">Butana, C₄H₁₀</td>
                        <td class="p-2 font-bold text-center">2</td>
                        <td class="p-2">1. Butana<br/>2. 2-metilpropana</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-mono">Pentana, C₅H₁₂</td>
                        <td class="p-2 font-bold text-center">3</td>
                        <td class="p-2">1. Pentana<br/>2. 2-metilbutana<br/>3. 2,2-dimetilpropana</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-bold text-teal-950">Alkena</td>
                        <td class="p-2 font-mono">Butena, C₄H₈</td>
                        <td class="p-2 font-bold text-center">3</td>
                        <td class="p-2">1. But-1-ena<br/>2. But-2-ena<br/>3. 2-metilpropena</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-bold text-indigo-950" rowspan="2">Alkohol</td>
                        <td class="p-2 font-mono">Propanol, C₃H₇OH</td>
                        <td class="p-2 font-bold text-center">2</td>
                        <td class="p-2">1. Propan-1-ol<br/>2. Propan-2-ol</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-mono">Butanol, C₄H₉OH</td>
                        <td class="p-2 font-bold text-center">4</td>
                        <td class="p-2">1. Butan-1-ol<br/>2. Butan-2-ol<br/>3. 2-metilpropan-1-ol<br/>4. 2-metilpropan-2-ol</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- 4 LANGKAH PENAMAAN IUPAC -->
                <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-1.5 mt-2">
                  <b class="text-slate-900 block font-bold">4 Langkah Menamakan Sebatian Organik Bercabang (Sistem IUPAC):</b>
                  <ol class="list-decimal pl-5 space-y-1 text-slate-700">
                    <li><b>Langkah 1:</b> Cari <b>rantai karbon berterusan yang terpanjang</b> sebagai rantai induk (cth: 4 C = butana).</li>
                    <li><b>Langkah 2:</b> Nomborkan atom karbon pada rantai induk dari hujung yang <b>paling hampir dengan cabang alkil atau kumpulan berfungsi</b> (untuk mendapat nombor terkecil).</li>
                    <li><b>Langkah 3:</b> Kenal pasti nama cabang alkil (–CH₃ = metil, –C₂H₅ = etil) dan nombor kedudukannya. Jika ada lebih dari satu cabang yang sama, gunakan awalan di- (2), tri- (3).</li>
                    <li><b>Langkah 4:</b> Gabungkan nama: <span class="font-mono font-bold text-sky-800">[Nombor kedudukan]-[Nama cabang][Nama rantai induk]</span> (cth: 2-metilbutana).</li>
                  </ol>
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menganggap metana, etana, dan propana mempunyai isomer struktur.',
          correction: 'Metana (C₁), etana (C₂), dan propana (C₃) TIADA ISOMER. Keisomeran dalam alkana hanya bermula daripada BUTANA (C₄H₁₀).',
          why: 'Tiada cara lain untuk menyusun 1, 2, atau 3 atom karbon selain daripada satu susunan berterusan tunggal.',
          spmTip: 'Soalan SPM kerap menanyakan: "Alkana manakah yang merupakan ahli pertama menunjukkan keisomeran?" Jawapan: Butana.'
        },
        {
          mistake: 'Menomborkan rantai karbon dari arah yang salah sehingga menghasilkan nombor kedudukan cabang yang lebih besar.',
          correction: 'Penomboran MESTI dimulakan dari hujung yang memberikan nombor TERKECIL kepada cabang atau kumpulan berfungsi.',
          why: 'Peraturan IUPAC mewajibkan penomboran lokan terkecil (lowest locant rule).',
          spmTip: 'Contoh: CH₃–CH(CH₃)–CH₂–CH₃ ialah 2-metilbutana, BUKAN 3-metilbutana.'
        }
      ],
      flashcards: [
        {
          id: 't5-b2-s6-fc1',
          front: 'Apakah maksud keisomeran struktur?',
          back: 'Fenomena di mana dua atau lebih molekul mempunyai formula molekul yang sama tetapi formula struktur yang berbeza.'
        },
        {
          id: 't5-b2-s6-fc2',
          front: 'Berapakah bilangan isomer struktur bagi butana (C₄H₁₀) dan namakan kesemua isomernya?',
          back: 'Mempunyai 2 isomer: 1. Butana (rantai lurus); 2. 2-metilpropana (rantai bercabang).'
        },
        {
          id: 't5-b2-s6-fc3',
          front: 'Berapakah bilangan isomer struktur bagi pentana (C₅H₁₂)?',
          back: 'Mempunyai 3 isomer: 1. Pentana; 2. 2-metilbutana; 3. 2,2-dimetilpropana.'
        },
        {
          id: 't5-b2-s6-fc4',
          front: 'Namakan dua isomer kedudukan bagi propanol (C₃H₇OH).',
          back: 'Propan-1-ol (kumpulan –OH pada C pertama) dan propan-2-ol (kumpulan –OH pada C kedua).'
        },
        {
          id: 't5-b2-s6-fc5',
          front: 'Mengapakah takat didih isomer rantai lurus adalah lebih tinggi berbanding isomer bercabangnya?',
          back: 'Rantai lurus mempunyai luas permukaan sentuhan molekul yang lebih besar, menghasilkan daya tarikan Van der Waals antara molekul yang lebih kuat.'
        }
      ],
      quiz: [
        {
          id: 't5-b2-s6-q1',
          question: 'Antara alkana berikut, yang manakah TIDAK menunjukkan keisomeran struktur?',
          options: ['Propana, C₃H₈', 'Butana, C₄H₁₀', 'Pentana, C₅H₁₂', 'Heksana, C₆H₁₄'],
          answerIndex: 0,
          explanation: 'Propana (C₃H₈) hanya mempunyai 3 atom karbon yang hanya boleh disambung secara satu cara rantai lurus. Keisomeran alkana hanya bermula dari butana (C₄).',
          level: 'Rendah'
        },
        {
          id: 't5-b2-s6-q2',
          question: 'Berapakah bilangan isomer struktur yang mungkin bagi sebatian hidrokarbon pentana (C₅H₁₂)?',
          options: ['2', '3', '4', '5'],
          answerIndex: 1,
          explanation: 'Pentana (C₅H₁₂) mempunyai tepat 3 isomer struktur: pentana, 2-metilbutana, dan 2,2-dimetilpropana.',
          level: 'Rendah'
        },
        {
          id: 't5-b2-s6-q3',
          question: 'Apakah nama IUPAC yang betul bagi formula struktur: CH₃–CH(CH₃)–CH(CH₃)–CH₃?',
          options: ['Dimetilbutana', '2,3-dimetilbutana', '2,2-dimetilbutana', '1,2-dimetilbutana'],
          answerIndex: 1,
          explanation: 'Rantai karbon terpanjang mempunyai 4 karbon (butana). Terdapat dua cabang metil (–CH₃) masing-masing pada karbon nombor 2 dan 3, maka namanya 2,3-dimetilbutana.',
          level: 'Sederhana'
        },
        {
          id: 't5-b2-s6-q4',
          question: 'Antara pasangan sebatian berikut, yang manakah merupakan pasangan isomer kedudukan?',
          options: [
            'Butana dan 2-metilpropana',
            'But-1-ena dan but-2-ena',
            'Etanol dan dimetil eter',
            'Pentana dan 2,2-dimetilpropana'
          ],
          answerIndex: 1,
          explanation: 'But-1-ena dan but-2-ena mempunyai rantai karbon 4-karbon yang sama tetapi kedudukan ikatan ganda dua C=C berbeza (pada C1 vs C2), menjadikannya isomer kedudukan.',
          level: 'Sederhana'
        },
        {
          id: 't5-b2-s6-q5',
          question: 'Satu alkohol tak bercabang mempunyai formula molekul C₄H₉OH. Berapakah bilangan isomer alkohol yang mungkin terbentuk daripada formula molekul ini?',
          options: ['2', '3', '4', '5'],
          answerIndex: 2,
          explanation: 'Butanol (C₄H₉OH) mempunyai 4 isomer: butan-1-ol, butan-2-ol, 2-metilpropan-1-ol, dan 2-metilpropan-2-ol.',
          level: 'Sederhana'
        },
        {
          id: 't5-b2-s6-q6',
          question: 'Dua sebatian hidrokarbon A dan B mempunyai formula molekul yang sama C₄H₁₀. Takat didih A ialah 0°C manakala takat didih B ialah -12°C. Apakah struktur sebatian B dan sebab takat didihnya lebih rendah?',
          options: [
            'B ialah butana; ia mempunyai ikatan kovalen yang lebih lemah',
            'B ialah 2-metilpropana; bentuk molekulnya yang bercabang mempunyai luas permukaan sentuhan yang lebih kecil menghasilkan daya Van der Waals yang lebih lemah',
            'B ialah siklobutana; ia mudah terbakar pada suhu rendah',
            'B ialah butena; ia mengandungi ikatan ganda dua'
          ],
          answerIndex: 1,
          explanation: 'B ialah 2-metilpropana (isomer bercabang). Molekul bercabang lebih padat dan mempunyai luas permukaan sentuhan molekul yang lebih kecil, menjadikan daya tarikan antara molekul lebih lemah berbanding butana rantai lurus (A).',
          level: 'Tinggi (KBAT)'
        }
      ]
    }
  ]
};
