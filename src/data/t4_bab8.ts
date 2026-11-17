import { Chapter } from '../types/nota';

export const T4_BAB8: Chapter = {
  id: 't4-b8',
  form: 'T4',
  chapterNumber: 8,
  title: 'Bahan Buatan dalam Industri',
  theme: 'Penerokaan Unsur dalam Kimia',
  durationMinutes: 100,
  description:
    'Aloi dan kepentingannya, perbandingan susunan atom logam tulen vs aloi, komposisi 4 jenis kaca, pengelasan seramik tradisional dan termaju, serta 5 bahan komposit moden dalam teknologi masa kini.',
  iconName: 'Layers',
  subtopicCount: 4,
  subtopics: [
    // -------------------------------------------------------------
    // SUBTOPIK 8.1: ALOI DAN KEPENTINGANNYA
    // -------------------------------------------------------------
    {
      id: 't4-b8-s1',
      code: '8.1',
      title: 'Aloi dan Kepentingannya',
      learningStandard: 'SP 8.1.1, 8.1.2, 8.1.3',
      durationMinutes: 30,
      tldr: [
        'Aloi ialah campuran dua atau lebih unsur dengan komposisi tertentu di mana unsur utamanya mestilah logam.',
        'Tujuan pengaloian: Menambah kekerasan dan kekuatan mekanikal, mencegah kakisan atau pengaratan, serta memperbaiki rupa bentuk supaya berkilat dan menarik.',
        'Susunan atom logam tulen: Atom bersaiz sama dan tersusun teratur dalam lapisan. Lapisan atom mudah menggelongsor di atas satu sama lain apabila dikenakan daya (bersifat mulur dan boleh ditempa).',
        'Susunan atom dalam aloi: Kehadiran atom unsur asing yang berlainan saiz mengganggu susunan teratur atom logam utama. Ini menghalang lapisan atom daripada menggelongsor dengan mudah, menjadikan aloi lebih keras dan lebih kuat.',
        '6 Aloi Utama Wajib SPM: Keluli (Fe+C), Keluli Nirkarat (Fe+Cr+Ni+C), Gangsa (Cu+Sn), Loyang (Cu+Zn), Duralumin (Al+Cu+Mg+Mn), Piuter (Sn+Sb+Cu).',
        'Superkonduktor ialah aloi khusus (cth: aloi niobium-titanium) yang boleh mengalirkan elektrik tanpa rintangan elektrik pada suhu rendah genting (digunakan dalam tren Maglev & mesin MRI).'
      ],
      simulationRef: {
        id: 'kekerasan-aloi',
        title: 'Makmal Maya Ujian Kekerasan & Susunan Atom Aloi',
        description: 'Jalankan eksperimen penjatuhan bola keluli ke atas blok kuprum dan loyang, ukur diameter lekukan, dan bandingkan susunan atom secara mikroskopik.',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=aloi-kekerasan',
        previewBadge: 'Simulasi Bab 8.1'
      },
      concepts: [
        {
          id: 't4-b8-s1-c1',
          title: 'Konsep Pengaloian & Perbandingan Susunan Atom (Logam Tulen vs Aloi)',
          badge: 'Konsep Teras SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                  Mengapakah Aloi Lebih Keras Berbanding Logam Tulennya? (Soalan Esei Wajib SPM)
                </span>
                
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Kebanyakan logam tulen seperti kuprum, aluminium, dan besi adalah lembut dan mudah bengkok dalam keadaan tulennya kerana struktur susunan atomnya. Melalui proses pengaloian, sifat fizik logam ini dipertingkatkan secara ketara:
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-3">
                  <!-- LOGAM TULEN -->
                  <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <b class="text-slate-900 block font-bold text-sm border-b border-slate-200 pb-1 flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-slate-400"></span> Logam Tulen (Cth: Kuprum Tulen)
                    </b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 leading-relaxed">
                      <li>Semua atom mempunyai <b>saiz yang sama</b>.</li>
                      <li>Atom-atom tersusun secara <b>sangat rapat dan teratur</b> dalam lapisan berulang.</li>
                      <li>Apabila daya dikenakan, <b>lapisan atom mudah menggelongsor</b> di atas satu sama lain.</li>
                      <li>Akibatnya: Logam tulen <b>bersifat lembut, mudah kemek, mulur</b> (boleh ditarik jadi dawai) dan <b>boleh ditempa</b> (boleh diketuk jadi kepingan nipis).</li>
                    </ul>
                  </div>

                  <!-- ALOI -->
                  <div class="p-3.5 rounded-xl bg-sky-50 border border-sky-200 space-y-2">
                    <b class="text-sky-950 block font-bold text-sm border-b border-sky-200 pb-1 flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-sky-500"></span> Aloi (Cth: Gangsa / Loyang)
                    </b>
                    <ul class="list-disc pl-4 space-y-1 text-sky-900 leading-relaxed">
                      <li>Mengandungi <b>atom unsur asing</b> yang mempunyai <b>saiz berbeza</b> (lebih besar atau lebih kecil) berbanding atom logam utama.</li>
                      <li>Kehadiran atom asing <b>mengganggu susunan teratur</b> atom logam utama.</li>
                      <li>Apabila daya dikenakan, <b>lapisan atom sukar menggelongsor</b> di atas satu sama lain.</li>
                      <li>Akibatnya: Aloi menjadi <b>jauh lebih keras, lebih kuat, dan tahan terhadap lelasan</b>.</li>
                    </ul>
                  </div>
                </div>

                <!-- 3 TUJUAN PENGALOIAN -->
                <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                  <b class="text-amber-900 block font-bold mb-1">Tiga Tujuan Utama Pengaloian:</b>
                  <ol class="list-decimal pl-5 space-y-1">
                    <li><b>Menambah kekerasan dan kekuatan logam:</b> Membolehkan aloi menampung beban berat (cth: keluli dalam pembinaan jambatan).</li>
                    <li><b>Mencegah kakisan dan pengaratan:</b> Pembentukan lapisan oksida pelindung seperti kromium oksida dalam keluli nirkarat menghalang kakisan lanjut.</li>
                    <li><b>Memperbaiki rupa bentuk:</b> Menjadikan permukaan logam lebih berkilau, cantik, dan tidak pudar (cth: piuter dan loyang untuk barangan perhiasan).</li>
                  </ol>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't4-b7-s1-c2',
          title: 'Komposisi, Sifat & Kegunaan 6 Aloi Utama serta Superkonduktor (Jadual Wajib SPM)',
          badge: 'Jadual Wajib SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="overflow-x-auto my-2">
                <table class="w-full text-xs text-left border-collapse border border-slate-200">
                  <thead>
                    <tr class="bg-slate-100 text-slate-800">
                      <th class="p-2.5 border border-slate-200">Nama Aloi</th>
                      <th class="p-2.5 border border-slate-200">Komposisi Unsur</th>
                      <th class="p-2.5 border border-slate-200">Sifat Istimewa</th>
                      <th class="p-2.5 border border-slate-200">Kegunaan Lazim</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200 text-slate-700">
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-slate-900">Keluli (Steel)</td>
                      <td class="p-2.5 font-mono text-sky-900">Besi (Fe) 99%<br/>Karbon (C) 1%</td>
                      <td class="p-2.5">Keras dan kuat, kekuatan regangan tinggi</td>
                      <td class="p-2.5">Rangka bangunan pencakar langit, jambatan, landasan kereta api, badan kereta</td>
                    </tr>
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-slate-900">Keluli Nirkarat (Stainless Steel)</td>
                      <td class="p-2.5 font-mono text-sky-900">Besi (Fe) 73%<br/>Kromium (Cr) 18%<br/>Nikel (Ni) 8%<br/>Karbon (C) 1%</td>
                      <td class="p-2.5">Sangat berkilat, kuat, dan tahan karat sepenuhnya</td>
                      <td class="p-2.5">Peralatan pembedahan (skalpel), kutleri (sudu & garpu), sinki dapur, alatan memasak</td>
                    </tr>
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-slate-900">Gangsa (Bronze)</td>
                      <td class="p-2.5 font-mono text-sky-900">Kuprum (Cu) 88%<br/>Timah (Sn) 12%</td>
                      <td class="p-2.5">Keras, tahan kakisan, permukaan berkilau keperangan</td>
                      <td class="p-2.5">Pingat sukan, tugu peringatan, patung ukiran, syiling, loceng</td>
                    </tr>
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-slate-900">Loyang (Brass)</td>
                      <td class="p-2.5 font-mono text-sky-900">Kuprum (Cu) 70%<br/>Zink (Zn) 30%</td>
                      <td class="p-2.5">Keras, berkilat keemasan, konduktor elektrik & haba baik</td>
                      <td class="p-2.5">Alat muzik tiup (trompet, saksofon), kunci pintu, tombol pintu, soket elektrik</td>
                    </tr>
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-slate-900">Duralumin</td>
                      <td class="p-2.5 font-mono text-sky-900">Aluminium (Al) 95%<br/>Kuprum (Cu) 4%<br/>Magnesium (Mg) 1%<br/>Mangan (Mn) 1%</td>
                      <td class="p-2.5">Sangat ringan (ketumpatan rendah), kuat dan tahan kakisan</td>
                      <td class="p-2.5">Rangka badan kapal terbang, basikal lumba, kabel elektrik voltan tinggi, kereta api laju</td>
                    </tr>
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-slate-900">Piuter (Pewter)</td>
                      <td class="p-2.5 font-mono text-sky-900">Timah (Sn) 95%<br/>Antimoni (Sb) 3.5%<br/>Kuprum (Cu) 1.5%</td>
                      <td class="p-2.5">Berkilat warna perak keputihan, lembut sedikit, mudah ditempa & diukir</td>
                      <td class="p-2.5">Cenderamata hiasan, piala & trofi sukan, rantai kunci, mangkuk hiasan</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- ALOI SUPERKONDUKTOR -->
              <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200">
                <span class="text-xs font-bold text-indigo-900 uppercase tracking-wider block mb-1 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                  Aloi Superkonduktor &amp; Kepentingannya dalam Teknologi Masa Kini
                </span>
                <p class="text-xs text-indigo-950 leading-relaxed">
                  <b>Superkonduktor</b> ialah bahan aloi yang <b>tidak mempunyai sebarang rintangan elektrik</b> (rintangan = 0 Ω) apabila disejukkan kepada suatu suhu genting yang sangat rendah (suhu kritikal, Tc).
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-xs">
                  <div class="p-2.5 rounded-xl bg-white border border-indigo-200">
                    <b class="text-indigo-900">1. Kereta Api Maglev (Magnetic Levitation):</b>
                    <p class="text-slate-600 mt-0.5">Medan magnet kuat superkonduktor mengapungkan kereta api di atas landasan, menghapuskan geseran mekanikal dan membolehkan kelajuan melebihi 500 km/j.</p>
                  </div>
                  <div class="p-2.5 rounded-xl bg-white border border-indigo-200">
                    <b class="text-indigo-900">2. Mesin MRI (Magnetic Resonance Imaging):</b>
                    <p class="text-slate-600 mt-0.5">Gelung wayar superkonduktor (cth aloi Niobium-Titanium) menghasilkan medan magnet berkuasa tinggi untuk pengimejan organ dalaman manusia dalam perubatan.</p>
                  </div>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't4-b8-s1-c3',
          title: 'Eksperimen 8.1: Perbandingan Kekerasan & Ketahanan Kakisan Logam Tulen vs Aloi',
          badge: 'Eksperimen Wajib SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <!-- BAHAGIAN A: KEKERASAN -->
                <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <b class="text-slate-900 block font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                    Eksperimen A: Ujian Kekerasan (Diameter Lekuk)
                  </b>
                  <p class="text-slate-600 leading-relaxed mb-2">
                    Pemberat 1 kg dijatuhkan dari ketinggian 50 cm ke atas bebola keluli yang diletakkan di atas blok kuprum dan blok loyang:
                  </p>
                  <div class="space-y-1.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div><b>Pemerhatian:</b> Diameter lekukan pada blok <b>kuprum lebih besar</b> daripada blok <b>loyang</b>.</div>
                    <div><b>Inferens:</b> Blok loyang lebih keras daripada kuprum tulen.</div>
                    <div class="text-[11px] text-slate-500 mt-1"><b>Pemberat dimalarkan:</b> Jisim pemberat (1 kg) dan ketinggian pelepasan (50 cm) ditetapkan sama supaya tenaga hentaman adalah seragam.</div>
                  </div>
                </div>

                <!-- BAHAGIAN B: KAKISAN -->
                <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <b class="text-slate-900 block font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Eksperimen B: Ujian Ketahanan Kakisan (Pengaratan)
                  </b>
                  <p class="text-slate-600 leading-relaxed mb-2">
                    Paku besi tulen dan paku keluli direndam dalam larutan agar-agar mengandungi kalium heksasianoferat(III) dan fenolftalein:
                  </p>
                  <div class="space-y-1.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div><b>Pemerhatian Paku Besi:</b> Keamatan tompok <b>biru tua yang tinggi</b> terbentuk (menunjukkan kehadiran ion Fe²⁺ yang banyak daripada pengaratan besi).</div>
                    <div><b>Pemerhatian Paku Keluli:</b> <b>Tiada tompok biru</b> atau keamatan biru sangat rendah terbentuk.</div>
                    <div><b>Kesimpulan:</b> Aloi keluli lebih tahan kakisan berbanding besi tulen.</div>
                  </div>
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menganggap aloi ialah sebatian kimia yang mempunyai formula kimia tetap.',
          correction: 'Aloi ialah CAMPURAN FIZIKAL antara unsur logam dan unsur lain, bukan sebatian. Tiada ikatan kimia baharu terbentuk dan peratusan komposisi boleh berubah.',
          why: 'Unsur-unsur dalam aloi hanya bercampur secara fizikal dalam kekisi logam tanpa tindak balas kimia stoikiometri.',
          spmTip: 'Tulis takrifan aloi: "Campuran dua atau lebih unsur di mana unsur utama ialah logam".'
        },
        {
          mistake: 'Menyatakan atom logam tulen tidak boleh menggelongsor langsung.',
          correction: 'Lapisan atom dalam logam tulen MUDAH menggelongsor di atas satu sama lain kerana atom bersaiz sama dan tersusun teratur. Dalam aloi, atom asinglah yang MENGHALANG penggelongsoran.',
          why: 'Ketiadaan bendasing dalam logam tulen membolehkan lapisan menggelongsor dengan geseran minimum.',
          spmTip: 'Gunakan frasa skema: "Atom asing mengganggu susunan atom logam tulen yang teratur dan menghalang lapisan atom daripada menggelongsor".'
        }
      ],
      flashcards: [
        {
          id: 't4-b8-s1-fc1',
          front: 'Apakah takrifan aloi mengikut sukatan Kimia SPM?',
          back: 'Aloi ialah campuran dua atau lebih unsur dengan komposisi tertentu di mana unsur utamanya ialah logam.'
        },
        {
          id: 't4-b8-s1-fc2',
          front: 'Mengapakah aloi lebih keras berbanding logam tulennya berdasarkan susunan atom?',
          back: 'Atom unsur asing yang berlainan saiz mengganggu susunan atom logam utama yang teratur, menghalang lapisan atom daripada mudah menggelongsor apabila dikenakan daya.'
        },
        {
          id: 't4-b8-s1-fc3',
          front: 'Apakah komposisi dan kegunaan utama aloi Duralumin?',
          back: 'Komposisi: 95% Aluminium, 4% Kuprum, 1% Magnesium, 1% Mangan. Kegunaan: Rangka badan kapal terbang dan basikal lumba kerana ringan dan kuat.'
        },
        {
          id: 't4-b8-s1-fc4',
          front: 'Apakah aloi yang digunakan untuk membuat alat muzik tiup seperti trompet dan saksofon?',
          back: 'Loyang (campuran 70% Kuprum dan 30% Zink) kerana keras, berkilat keemasan, dan mudah dibentuk.'
        },
        {
          id: 't4-b8-s1-fc5',
          front: 'Apakah sifat istimewa aloi superkonduktor dan contoh penggunaannya?',
          back: 'Boleh mengalirkan arus elektrik tanpa rintangan pada suhu sangat rendah. Digunakan dalam kereta api Maglev dan mesin pengimejan resonans magnetik (MRI).'
        }
      ],
      quiz: [
        {
          id: 't4-b8-s1-q1',
          question: 'Antara berikut, yang manakah menerangkan dengan tepat susunan atom dalam logam tulen?',
          options: [
            'Atom bersaiz berbeza tersusun secara rawak tanpa susunan tertentu',
            'Atom-atom bersaiz sama tersusun rapat dan teratur dalam lapisan',
            'Atom-atom terikat kuat melalui ikatan kovalen ganda dua',
            'Atom-atom bercas negatif bergerak bebas dalam lautan elektron positif'
          ],
          answerIndex: 1,
          explanation: 'Dalam logam tulen, semua atom adalah daripada unsur yang sama dan bersaiz sama, tersusun rapat dan teratur dalam lapisan yang mudah menggelongsor.',
          level: 'Rendah'
        },
        {
          id: 't4-b8-s1-q2',
          question: 'Duralumin digunakan secara meluas dalam pembuatan rangka kapal terbang. Apakah sifat utama duralumin yang menjadikannya sangat sesuai untuk tujuan ini?',
          options: [
            'Takat lebur sangat rendah dan mudah dibengkokkan',
            'Ketumpatan rendah (ringan) tetapi mempunyai kekuatan mekanikal yang tinggi',
            'Konduktor haba yang paling lemah antara semua logam',
            'Mudah berkarat apabila terdedah kepada udara basah'
          ],
          answerIndex: 1,
          explanation: 'Duralumin berasaskan 95% aluminium menjadikannya berketumpatan rendah (ringan), manakala penambahan kuprum, magnesium dan mangan memberikannya kekuatan tinggi.',
          level: 'Rendah'
        },
        {
          id: 't4-b8-s1-q3',
          question: 'Seorang murid menjalankan eksperimen dengan melepaskan bola keluli dari ketinggian 50 cm ke atas blok kuprum dan blok gangsa. Keputusan menunjukkan diameter lekuk pada blok kuprum ialah 6 mm manakala blok gangsa ialah 3 mm. Apakah kesimpulan daripada eksperimen ini?',
          options: [
            'Kuprum lebih tumpat daripada gangsa',
            'Gangsa lebih keras dan tahan lekukan berbanding kuprum tulen',
            'Kuprum tulen lebih tahan kakisan berbanding gangsa',
            'Gangsa mempunyai atom yang lebih mudah menggelongsor'
          ],
          answerIndex: 1,
          explanation: 'Diameter lekukan yang lebih kecil membuktikan blok gangsa mempunyai rintangan lekukan yang lebih tinggi, menunjukkan aloi gangsa lebih keras daripada logam kuprum tulen.',
          level: 'Sederhana'
        },
        {
          id: 't4-b8-s1-q4',
          question: 'Antara padanan aloi dan komposisinya berikut, yang manakah BENAR?',
          options: [
            'Gangsa: Kuprum + Zink',
            'Loyang: Kuprum + Timah',
            'Piuter: Timah + Antimoni + Kuprum',
            'Keluli: Besi + Kromium + Nikel sahaja'
          ],
          answerIndex: 2,
          explanation: 'Piuter mengandungi kira-kira 95% timah, 3.5% antimoni dan 1.5% kuprum. (Gangsa ialah Cu + Sn, Loyang ialah Cu + Zn).',
          level: 'Sederhana'
        },
        {
          id: 't4-b8-s1-q5',
          question: 'Mengapakah keluli nirkarat (stainless steel) digunakan untuk membuat instrumen pembedahan di hospital berbanding keluli biasa?',
          options: [
            'Keluli nirkarat lebih lembut dan mudah dilenturkan',
            'Kehadiran kromium membentuk lapisan oksida pelindung yang menghalang pengaratan dan kakisan',
            'Keluli nirkarat mempunyai takat lebur yang lebih rendah',
            'Keluli nirkarat mengandungi timbal yang membunuh bakteria serta-merta'
          ],
          answerIndex: 1,
          explanation: 'Kromium dalam keluli nirkarat bertindak balas dengan oksigen membentuk lapisan kromium(III) oksida yang sangat nipis, tidak telap dan menghalang pengaratan.',
          level: 'Sederhana'
        },
        {
          id: 't4-b8-s1-q6',
          question: 'Tren Maglev di Shanghai boleh bergerak melebihi 430 km/j tanpa menyentuh landasan. Apakah fenomena saintifik yang membolehkan teknologi ini berfungsi menggunakan superkonduktor?',
          options: [
            'Pembakaran gas hidrogen cecair pada suhu bilik',
            'Rintangan elektrik sifar menghasilkan medan magnet yang amat kuat untuk mengapungkan tren (Kesan Meissner)',
            'Peleburan landasan besi akibat geseran graviti sifar',
            'Pengaliran arus ulang-alik berfrekuensi tinggi dalam teras kaca optik'
          ],
          answerIndex: 1,
          explanation: 'Bahan superkonduktor pada suhu kritikal mempunyai rintangan elektrik sifar dan menolak medan magnet luaran (Kesan Meissner), menghasilkan daya tolakan magnet yang mengangkat dan menggerakkan tren tanpa geseran.',
          level: 'Tinggi (KBAT)'
        }
      ]
    },

    // -------------------------------------------------------------
    // SUBTOPIK 8.2: KOMPOSISI KACA DAN KEGUNAANNYA
    // -------------------------------------------------------------
    {
      id: 't4-b8-s2',
      code: '8.2',
      title: 'Komposisi Kaca dan Kegunaannya',
      learningStandard: 'SP 8.2.1',
      durationMinutes: 20,
      tldr: [
        'Bahan utama dalam semua jenis kaca ialah silika atau silikon dioksida (SiO₂) yang diperoleh daripada pasir laut.',
        'Sifat umum kaca: Lut sinar, keras tetapi rapuh, penebat elektrik dan haba yang sangat baik, lengai secara kimia, kalis air serta mudah dibersihkan.',
        '1. Kaca Silika Terlakur: SiO₂ tulen (~99%), takat lebur sangat tinggi (~1700°C), tahan kejutan haba melampau, lut sinar kepada sinar UV (digunakan untuk kanta teleskop angkasa).',
        '2. Kaca Soda Kapur: SiO₂ + Na₂CO₃ + CaCO₃, takat lebur rendah (~1000°C), murah dan mudah dibentuk, tetapi mudah retak jika perubahan suhu mendadak (digunakan untuk botol, balang dan cermin tingkap).',
        '3. Kaca Borosilikat (Pyrex): SiO₂ + B₂O₃ + Al₂O₃, pekali pengembangan terma sangat rendah, tahan kejutan haba dan bahan kimia asid/alkali (digunakan untuk radas kaca makmal dan pinggan mangkuk pembakar ketuhar).',
        '4. Kaca Plumbum (Kristal): SiO₂ + PbO + K₂O, ketumpatan tinggi, indeks biasan tinggi (berkilau cantik membiaskan cahaya), lebih lembut untuk diukir (digunakan untuk pasu kristal, candelier dan gelas perhiasan mewah).'
      ],
      concepts: [
        {
          id: 't4-b8-s2-c1',
          title: 'Sifat Am Kaca & 4 Jenis Kaca Utama (Komposisi & Ciri Khas SPM)',
          badge: 'Klasifikasi Kaca SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                  Bahan Mentah Utama Kaca & Sifat Fizik Umum
                </span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Komponen asas bagi semua jenis kaca ialah <b>silika</b> atau <b>silikon dioksida (SiO₂)</b>. Apabila silika dipanaskan bersama bahan kimia tambahan tertentu, pelbagai jenis kaca dengan sifat yang unik dan khusus dapat dihasilkan:
                </p>

                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs mb-3">
                  <div class="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <b class="text-slate-800 block">Lut Sinar</b>
                    <span class="text-[11px] text-slate-500">Membenarkan cahaya menembusi</span>
                  </div>
                  <div class="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <b class="text-slate-800 block">Keras & Rapuh</b>
                    <span class="text-[11px] text-slate-500">Kuat tetapi pecah jika dihentam</span>
                  </div>
                  <div class="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <b class="text-slate-800 block">Lengai Kimia</b>
                    <span class="text-[11px] text-slate-500">Tidak bertindak balas dengan asid/alkali</span>
                  </div>
                  <div class="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <b class="text-slate-800 block">Penebat Terma</b>
                    <span class="text-[11px] text-slate-500">Konduktor haba yang lemah</span>
                  </div>
                  <div class="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <b class="text-slate-800 block">Penebat Elektrik</b>
                    <span class="text-[11px] text-slate-500">Tidak mengalirkan arus elektrik</span>
                  </div>
                  <div class="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <b class="text-slate-800 block">Kalis Air</b>
                    <span class="text-[11px] text-slate-500">Permukaan tidak telap air</span>
                  </div>
                </div>
              </div>

              <!-- JADUAL 4 JENIS KACA -->
              <div class="overflow-x-auto my-2">
                <table class="w-full text-xs text-left border-collapse border border-slate-200">
                  <thead>
                    <tr class="bg-slate-100 text-slate-800">
                      <th class="p-2.5 border border-slate-200">Jenis Kaca</th>
                      <th class="p-2.5 border border-slate-200">Komposisi Bahan Kimia</th>
                      <th class="p-2.5 border border-slate-200">Sifat Khas Utama</th>
                      <th class="p-2.5 border border-slate-200">Kegunaan Lazim</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200 text-slate-700">
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-sky-950">1. Kaca Silika Terlakur</td>
                      <td class="p-2.5 font-mono text-slate-800">Silika tulen, SiO₂ (~99%)</td>
                      <td class="p-2.5">Takat lebur tertinggi (~1700°C), rintangan kejutan haba sangat tinggi, telus kepada sinaran UV</td>
                      <td class="p-2.5">Kanta optik teleskop astronomi, tiub pembakaran makmal suhu melampau, gentian optik</td>
                    </tr>
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-teal-950">2. Kaca Soda Kapur</td>
                      <td class="p-2.5 font-mono text-slate-800">SiO₂ + Natrium karbonat (Na₂CO₃) + Batu kapur (CaCO₃)</td>
                      <td class="p-2.5">Takat lebur rendah (~1000°C), murah, mudah dibentuk/ditiup, tetapi mudah retak jika suhu berubah mendadak</td>
                      <td class="p-2.5">Botol minuman, balang jem, kaca tingkap bangunan/rumah, mentol lampu pijar, pinggan harian</td>
                    </tr>
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-indigo-950">3. Kaca Borosilikat (Pyrex)</td>
                      <td class="p-2.5 font-mono text-slate-800">SiO₂ + Boron oksida (B₂O₃) + Al₂O₃ + Na₂O</td>
                      <td class="p-2.5">Pekali pengembangan terma sangat rendah, tahan kejutan haba (tidak mudah retak semasa dipanaskan), tahan bahan kimia</td>
                      <td class="p-2.5">Radas kaca makmal (bikar, kelalang kon, tabung uji), mangkuk pembakar ketuhar (Pyrex), cermin lampu kereta</td>
                    </tr>
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-purple-950">4. Kaca Plumbum (Kristal)</td>
                      <td class="p-2.5 font-mono text-slate-800">SiO₂ + Plumbum(II) oksida (PbO) + Kalium oksida (K₂O)</td>
                      <td class="p-2.5">Ketumpatan tinggi (berat), indeks biasan tinggi (berkilau bergemerlapan), lebih lembut dan mudah diukir prisma</td>
                      <td class="p-2.5">Pinggan mangkuk kristal mewah, candelier (lampu gantung kristal), gelas berkaki kristal, prisma optik</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          `
        },
        {
          id: 't4-b8-s2-c2',
          title: 'Perbandingan Kejutan Haba & Pemilihan Kaca yang Tepat (Aplikasi SPM)',
          badge: 'Aplikasi SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  Mengapakah Radas Makmal MESTI Diperbuat daripada Kaca Borosilikat?
                </span>
                
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Dalam amali kimia, bikar dan kelalang kon sering dipanaskan terus dengan api penunu Bunsen dan kemudian dibasuh dengan air sejuk. Perubahan suhu yang ekstrem ini dikenali sebagai <b>kejutan haba (thermal shock)</b>:
                </p>

                <div class="space-y-2 text-xs">
                  <div class="p-3 rounded-xl bg-rose-50 border border-rose-200">
                    <b class="text-rose-900 block mb-1">Jika Kaca Soda Kapur Digunakan:</b>
                    <p class="text-rose-800 leading-relaxed">
                      Kaca soda kapur mempunyai <b>pekali pengembangan terma yang tinggi</b>. Bahagian kaca yang terkena api mengembang dengan pantas manakala bahagian dalaman yang sejuk belum sempat mengembang. Pengembangan yang tidak sekata ini menghasilkan tegangan mekanikal yang tinggi, menyebabkan kaca <b>retak dan pecah serta-merta</b>.
                    </p>
                  </div>

                  <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <b class="text-emerald-900 block mb-1">Kelebihan Kaca Borosilikat (Kehadiran Boron Oksida, B₂O₃):</b>
                    <p class="text-emerald-800 leading-relaxed">
                      Kehadiran <b>boron oksida (B₂O₃)</b> merendahkan <b>pekali pengembangan terma</b> secara mendadak. Kaca borosilikat hampir tidak mengembang apabila dipanaskan dan tidak mengecut ketara apabila disejukkan. Maka, tiada tegangan dalaman terbentuk dan kaca <b>tidak mudah retak</b> walaupun dipanaskan sehingga 500°C.
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
          mistake: 'Menganggap semua jenis kaca boleh digunakan untuk memasak dalam ketuhar atau memanaskan cecair di makmal.',
          correction: 'HANYA kaca borosilikat (atau silika terlakur) yang sesuai kerana mempunyai pekali pengembangan terma yang sangat rendah. Kaca soda kapur akan pecah akibat kejutan haba.',
          why: 'Pengembangan terma yang tidak sekata dalam kaca biasa mencipta retakan mikro yang merebak pantas.',
          spmTip: 'Dalam jawapan SPM, sebut kata kunci: "Pekali pengembangan terma yang sangat rendah / tahan kejutan haba".'
        },
        {
          mistake: 'Menyatakan kaca plumbum mengandungi logam plumbum bebas yang boleh meracuni makanan.',
          correction: 'Plumbum wujud dalam bentuk sebatian kimia terikat iaitu plumbum(II) oksida (PbO) di dalam matriks silika, bukan logam plumbum tulen.',
          why: 'Ion plumbum terperangkap kukuh dalam rangkaian kekisi silikat tak berhabur.',
          spmTip: 'Fungsi PbO ialah meningkatkan indeks biasan dan ketumpatan kaca supaya berkilauan.'
        }
      ],
      flashcards: [
        {
          id: 't4-b8-s2-fc1',
          front: 'Apakah komponen bahan mentah utama dalam pembuatan semua jenis kaca?',
          back: 'Silika atau silikon dioksida (SiO₂) yang diperoleh daripada pasir laut.'
        },
        {
          id: 't4-b8-s2-fc2',
          front: 'Apakah bahan tambahan yang memberikan ketahanan kejutan haba kepada kaca borosilikat?',
          back: 'Boron oksida (B₂O₃), yang merendahkan pekali pengembangan terma kaca secara ketara.'
        },
        {
          id: 't4-b8-s2-fc3',
          front: 'Apakah jenis kaca yang paling murah dan lazim digunakan untuk membuat botol kicap dan cermin tingkap?',
          back: 'Kaca soda kapur (campuran SiO₂, Na₂CO₃, dan CaCO₃).'
        },
        {
          id: 't4-b8-s2-fc4',
          front: 'Mengapakah kaca plumbum digunakan untuk membuat barangan kristal mewah dan lampu candelier?',
          back: 'Kerana mengandungi PbO yang memberikan ketumpatan tinggi dan indeks biasan tinggi, menghasilkan kilauan yang membiaskan cahaya dengan cantik.'
        },
        {
          id: 't4-b8-s2-fc5',
          front: 'Apakah jenis kaca yang mempunyai takat lebur tertinggi (~1700°C) dan telus kepada sinaran UV?',
          back: 'Kaca silika terlakur (diperbuat daripada 99% SiO₂ tulen).'
        }
      ],
      quiz: [
        {
          id: 't4-b8-s2-q1',
          question: 'Antara bahan kimia berikut, yang manakah merupakan komponen utama bagi semua jenis kaca?',
          options: ['Kalsium karbonat, CaCO₃', 'Silikon dioksida, SiO₂', 'Aluminium oksida, Al₂O₃', 'Natrium hidroksida, NaOH'],
          answerIndex: 1,
          explanation: 'Silikon dioksida (SiO₂) daripada pasir merupakan bahan asas pembentukan kekisi kaca dalam semua jenis kaca.',
          level: 'Rendah'
        },
        {
          id: 't4-b8-s2-q2',
          question: 'Seorang tukang masak menuang sup mendidih ke dalam mangkuk kaca soda kapur dan mangkuk tersebut retak serta-merta. Mengapakah perkara ini berlaku?',
          options: [
            'Kaca soda kapur bertindak balas secara eksotermik dengan sup',
            'Kaca soda kapur mempunyai takat lebur yang lebih rendah daripada 100°C',
            'Pekali pengembangan terma kaca soda kapur yang tinggi menyebabkan pengembangan tidak sekata',
            'Kaca soda kapur menyerap garam daripada sup menyebabkan hakisan pantas'
          ],
          answerIndex: 2,
          explanation: 'Kaca soda kapur mempunyai pekali pengembangan terma yang tinggi, menyebabkan bahagian dalam mengembang lebih cepat daripada bahagian luar lalu pecah akibat tegangan kejutan haba.',
          level: 'Sederhana'
        },
        {
          id: 't4-b8-s2-q3',
          question: 'Apakah peranan utama boron oksida (B₂O₃) dalam penghasilan kaca borosilikat bagi radas makmal?',
          options: [
            'Menjadikan kaca lebih legap dan berwarna biru cerah',
            'Merendahkan pekali pengembangan terma agar tahan terhadap kejutan haba',
            'Meningkatkan indeks biasan supaya kaca bergemerlapan seperti intan',
            'Membolehkan kaca mengalirkan arus elektrik pada voltan rendah'
          ],
          answerIndex: 1,
          explanation: 'B₂O₃ mengurangkan pekali pengembangan terma, membolehkan radas kaca borosilikat (Pyrex) dipanaskan dan disejukkan tanpa mengalami keretakan.',
          level: 'Sederhana'
        },
        {
          id: 't4-b8-s2-q4',
          question: 'Antara kaca berikut, yang manakah mempunyai ketumpatan paling tinggi dan indeks biasan paling tinggi untuk dijadikan prisma kristal?',
          options: ['Kaca silika terlakur', 'Kaca soda kapur', 'Kaca borosilikat', 'Kaca plumbum'],
          answerIndex: 3,
          explanation: 'Kaca plumbum mengandungi plumbum(II) oksida (PbO) yang berat, memberikannya ketumpatan tinggi serta indeks biasan tinggi yang memantul dan membiaskan cahaya secara berkilauan.',
          level: 'Rendah'
        },
        {
          id: 't4-b8-s2-q5',
          question: 'Kanta teleskop astronomi angkasa lepas lazimnya diperbuat daripada kaca silika terlakur. Mengapakah kaca jenis ini dipilih?',
          options: [
            'Harganya paling murah berbanding jenis kaca yang lain',
            'Lut sinar kepada sinaran ultraungu (UV) dan hampir sifar pengembangan terma',
            'Mudah dileburkan dan dibentuk menggunakan acuan kayu',
            'Boleh larut di dalam air hujan berasid di ruang angkasa'
          ],
          answerIndex: 1,
          explanation: 'Kaca silika terlakur telus kepada spektrum cahaya luas termasuk UV dan mempunyai rintangan kejutan haba tertinggi di persekitaran angkasa yang ekstrem.',
          level: 'Tinggi (KBAT)'
        },
        {
          id: 't4-b8-s2-q6',
          question: 'Jadual menunjukkan komposisi bagi Kaca X: SiO₂ (70%), B₂O₃ (13%), Na₂O (4%), Al₂O₃ (3%). Apakah kegunaan yang paling sesuai bagi Kaca X?',
          options: [
            'Botol kicap dan balang jem makanan',
            'Pinggan pembakar ketuhar dan bikar makmal',
            'Lampu candelier kristal mewah',
            'Cermin tingkap rumah kediaman'
          ],
          answerIndex: 1,
          explanation: 'Kehadiran B₂O₃ (13%) dan Al₂O₃ mengesahkan Kaca X ialah kaca borosilikat yang tahan haba, sesuai untuk perkakas ketuhar dan radas makmal.',
          level: 'Sederhana'
        }
      ]
    },

    // -------------------------------------------------------------
    // SUBTOPIK 8.3: KOMPOSISI SERAMIK DAN KEGUNAANNYA
    // -------------------------------------------------------------
    {
      id: 't4-b8-s3',
      code: '8.3',
      title: 'Komposisi Seramik dan Kegunaannya',
      learningStandard: 'SP 8.3.1, 8.3.2',
      durationMinutes: 20,
      tldr: [
        'Seramik ialah bahan pepejal bukan organik dan bukan logam yang dibentuk dan dikeraskan melalui proses pemanasan pada suhu yang sangat tinggi.',
        'Bahan asas seramik tradisional ialah tanah liat seperti kaolin (aluminium silikat terhidrat, Al₂O₃·2SiO₂·2H₂O).',
        'Sifat umum seramik: Takat lebur sangat tinggi, sangat keras dan kuat, penebat haba dan elektrik yang sangat baik, lengai terhadap bahan kimia, tahan kakisan dan lelasan, tetapi bersifat rapuh (brittle).',
        'Pengelasan Seramik: 1. Seramik Tradisional (daripada tanah liat semula jadi: tembikar, pasu, batu bata, jubin); 2. Seramik Termaju (daripada sebatian bukan organik tulen seperti karbida, nitrida, dan oksida logam).',
        'Aplikasi Seramik Termaju: Cakera brek kereta api laju (silikon karbida, SiC), palam pencucuh enjin kereta (alumina, Al₂O₃), implan tulang tiruan & gigi palsu (zirkonia, ZrO₂), serta jubin penebat haba kapal angkasa lepas.'
      ],
      concepts: [
        {
          id: 't4-b8-s3-c1',
          title: 'Pengelasan Seramik: Seramik Tradisional vs Seramik Termaju (Buku Teks m/s 270)',
          badge: 'Klasifikasi Seramik SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                  Pengelasan Seramik Mengikut Bahan Mentah & Teknologi Pembuatan
                </span>
                
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Dalam industri moden, seramik dikelaskan kepada dua kumpulan utama berasaskan bahan mentah dan kaedah penghasilannya:
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-3">
                  <!-- SERAMIK TRADISIONAL -->
                  <div class="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                    <b class="text-amber-950 block font-bold text-sm border-b border-amber-200 pb-1 flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-amber-500"></span> 1. Seramik Tradisional
                    </b>
                    <ul class="list-disc pl-4 space-y-1.5 text-amber-900 leading-relaxed">
                      <li><b>Bahan Mentah:</b> Diperbuat daripada tanah liat semula jadi seperti <b>kaolin</b> (aluminium silikat terhidrat, Al₂O₃·2SiO₂·2H₂O).</li>
                      <li><b>Kaedah Pembuatan:</b> Tanah liat dicampur dengan air, dibentuk mengikut acuan, dan kemudian dibakar pada suhu tinggi di dalam relau.</li>
                      <li><b>Sifat:</b> Keras, tahan haba sederhana, rapuh, lengai secara kimia.</li>
                      <li><b>Contoh Kegunaan:</b> Pasu bunga, tembikar seramik, batu bata pembinaan, jubin lantai, mangkuk tanah liat.</li>
                    </ul>
                  </div>

                  <!-- SERAMIK TERMAJU -->
                  <div class="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-2">
                    <b class="text-purple-950 block font-bold text-sm border-b border-purple-200 pb-1 flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-purple-600"></span> 2. Seramik Termaju (Advanced Ceramics)
                    </b>
                    <ul class="list-disc pl-4 space-y-1.5 text-purple-900 leading-relaxed">
                      <li><b>Bahan Mentah:</b> Diperbuat daripada sebatian bukan organik tulen seperti <b>oksida logam, karbida, dan nitrida</b> (cth: silikon karbida, SiC; alumina, Al₂O₃; zirkonia, ZrO₂).</li>
                      <li><b>Kaedah Pembuatan:</b> Dihasilkan melalui teknologi pemadatan serbuk dan pensinteran suhu sangat tinggi dalam suasana terkawal.</li>
                      <li><b>Sifat:</b> Rintangan haba dan lelasan yang jauh lebih tinggi, tahan kejutan mekanikal, bersifat biokeserasian (biocompatible).</li>
                      <li><b>Contoh Kegunaan:</b> Cakera brek kereta api, palam pencucuh enjin, gigi palsu zirkonia, penebat reaktor nuklear.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't4-b8-s3-c2',
          title: 'Aplikasi Seramik Termaju dalam Bidang Perubatan, Pengangkutan & Aeroangkasa',
          badge: 'Aplikasi Teknologi Tinggi SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <!-- BIDANG PERUBATAN -->
                <div class="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span class="font-bold text-emerald-900 block mb-1.5 flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Bidang Perubatan
                  </span>
                  <ul class="list-disc pl-4 space-y-1 text-slate-600 leading-relaxed">
                    <li><b>Zirkonia (ZrO₂):</b> Digunakan untuk membuat <b>gigi palsu dan implan sendi pinggul tiruan</b> kerana sangat keras, tahan haus dan lengai secara biologi (tidak ditolak oleh badan manusia).</li>
                    <li><b>Alumina (Al₂O₃):</b> Digunakan dalam implan tulang dan pembedahan gantian sendi.</li>
                  </ul>
                </div>

                <!-- BIDANG PENGANGKUTAN -->
                <div class="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span class="font-bold text-sky-900 block mb-1.5 flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-sky-500"></span> Bidang Pengangkutan
                  </span>
                  <ul class="list-disc pl-4 space-y-1 text-slate-600 leading-relaxed">
                    <li><b>Silikon Karbida (SiC):</b> Digunakan untuk membuat <b>cakera brek kenderaan berprestasi tinggi</b> kerana tahan haba geseran melampau dan tidak luntur brek.</li>
                    <li><b>Palam Pencucuh Enjin:</b> Penebat seramik alumina menahan voltan elektrik ribuan volt dan suhu pembakaran silinder enjin.</li>
                  </ul>
                </div>

                <!-- BIDANG AEROANGKASA -->
                <div class="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span class="font-bold text-indigo-900 block mb-1.5 flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-indigo-500"></span> Bidang Aeroangkasa
                  </span>
                  <ul class="list-disc pl-4 space-y-1 text-slate-600 leading-relaxed">
                    <li><b>Jubin Penebat Haba Pesawat Ulang-Alik:</b> Menahan suhu melebihi 1600°C akibat geseran atmosfera semasa kapal angkasa memasuki semula bumi.</li>
                    <li><b>Bilah Turbin Jet:</b> Seramik termaju menggantikan logam kerana lebih tahan suhu pembakaran bahan api jet.</li>
                  </ul>
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menganggap seramik mudah mengalirkan haba dan elektrik kerana kekerasannya yang tinggi.',
          correction: 'Seramik ialah PENEBAT elektrik dan haba yang sangat baik kerana atom-atomnya terikat secara kovalen atau ionik yang kuat tanpa sebarang elektron bebas.',
          why: 'Tiada pembawa cas elektrik bebas dalam struktur seramik.',
          spmTip: 'Ciri utama seramik: Penebat haba dan elektrik yang sangat baik.'
        },
        {
          mistake: 'Menyangka implan gigi palsu seramik zirkonia boleh berkarat seperti logam.',
          correction: 'Seramik zirkonia ialah oksida logam bukan organik yang sepenuhnya lengai secara kimia dan TIDAK AKAN mengalami kakisan atau pengaratan di dalam mulut manusia.',
          why: 'Zirkonia berada pada fasa teroksida maksimum yang stabil.',
          spmTip: 'Kelebihan seramik dalam perubatan: "Bersifat lengai secara kimia dan biokeserasian (biocompatible)".'
        }
      ],
      flashcards: [
        {
          id: 't4-b8-s3-fc1',
          front: 'Apakah bahan mentah utama dalam penghasilan seramik tradisional?',
          back: 'Tanah liat seperti kaolin (aluminium silikat terhidrat, Al₂O₃·2SiO₂·2H₂O).'
        },
        {
          id: 't4-b8-s3-fc2',
          front: 'Apakah perbezaan bahan mentah antara seramik tradisional dan seramik termaju?',
          back: 'Seramik tradisional menggunakan tanah liat semula jadi; seramik termaju menggunakan sebatian bukan organik tulen seperti oksida, karbida (SiC), dan nitrida logam.'
        },
        {
          id: 't4-b8-s3-fc3',
          front: 'Mengapakah seramik zirkonia (ZrO₂) sangat sesuai digunakan untuk implan tulang dan gigi palsu?',
          back: 'Kerana sangat keras, tahan lelasan, lengai secara kimia, dan mempunyai sifat biokeserasian (tidak ditolak oleh tisu badan manusia).'
        },
        {
          id: 't4-b8-s3-fc4',
          front: 'Apakah seramik termaju yang digunakan untuk membuat cakera brek kereta lumba Formula 1?',
          back: 'Silikon karbida (SiC) kerana mempunyai rintangan kejutan terma yang sangat tinggi dan tahan haba geseran melampau.'
        },
        {
          id: 't4-b8-s3-fc5',
          front: 'Nyatakan tiga sifat umum yang dimiliki oleh bahan seramik.',
          back: 'Takat lebur sangat tinggi, penebat haba dan elektrik yang baik, serta lengai secara kimia (tetapi rapuh).'
        }
      ],
      quiz: [
        {
          id: 't4-b8-s3-q1',
          question: 'Antara bahan berikut, yang manakah merupakan contoh seramik tradisional?',
          options: ['Cakera brek silikon karbida', 'Implan gigi zirkonia', 'Pasu tembikar dan batu bata merah', 'Jubin penebat haba kapal angkasa'],
          answerIndex: 2,
          explanation: 'Pasu tembikar dan batu bata merah diperbuat daripada tanah liat semula jadi (kaolin) yang dibakar pada suhu tinggi, iaitu ciri seramik tradisional.',
          level: 'Rendah'
        },
        {
          id: 't4-b8-s3-q2',
          question: 'Mengapakah seramik digunakan sebagai penebat pada palam pencucuh enjin kereta?',
          options: [
            'Seramik mempunyai ketumpatan yang sangat rendah berbanding udara',
            'Seramik ialah penebat elektrik yang sangat baik dan tahan suhu serta tekanan pembakaran yang tinggi',
            'Seramik mudah mengalirkan haba dari palam ke omboh',
            'Seramik bertindak balas dengan bahan api untuk menghasilkan percikan api'
          ],
          answerIndex: 1,
          explanation: 'Seramik alumina pada palam pencucuh bertindak sebagai penebat elektrik voltan tinggi dan tidak lebur di bawah suhu pembakaran enjin yang tinggi.',
          level: 'Sederhana'
        },
        {
          id: 't4-b8-s3-q3',
          question: 'Antara bahan seramik termaju berikut, yang manakah digunakan dalam bidang perubatan untuk menghasilkan implan sendi pinggul dan mahkota gigi?',
          options: ['Kaolin terhidrat', 'Zirkonia (ZrO₂)', 'Silikon dioksida tulen', 'Natrium klorida'],
          answerIndex: 1,
          explanation: 'Zirkonia (ZrO₂) mempunyai kekerasan tinggi, rintangan haus yang cemerlang, dan bersifat biokeserasian tanpa alahan dalam badan manusia.',
          level: 'Sederhana'
        },
        {
          id: 't4-b8-s3-q4',
          question: 'Apakah kelemahan utama sifat mekanikal bahan seramik berbanding logam?',
          options: [
            'Seramik sangat mudah berkarat di udara terbuka',
            'Seramik bersifat rapuh dan mudah retak apabila dikenakan hentaman daya mekanikal secara mengejut',
            'Seramik mempunyai takat lebur yang terlalu rendah',
            'Seramik mengalirkan arus elektrik terlalu pantas'
          ],
          answerIndex: 1,
          explanation: 'Ikatan atom dalam seramik adalah tegar; apabila daya hentaman tinggi dikenakan, tiada penggelongsoran atom berlaku sebaliknya retakan mikro merebak dan seramik pecah (rapuh).',
          level: 'Rendah'
        },
        {
          id: 't4-b8-s3-q5',
          question: 'Apakah kelebihan cakera brek silikon karbida (SiC) berbanding cakera brek keluli pada kereta api laju?',
          options: [
            'Cakera brek SiC lebih murah dan mudah berkarat',
            'Cakera brek SiC mengekalkan cengkaman brek pada suhu melampau tanpa luntur haba dan tahan lelasan geseran',
            'Cakera brek SiC melebur pada suhu 200°C untuk melekatkan roda',
            'Cakera brek SiC menyerap minyak brek untuk melicinkan pergerakan'
          ],
          answerIndex: 1,
          explanation: 'Silikon karbida tahan haba geseran tinggi melebihi 1000°C tanpa ubah bentuk atau kehilangan daya geseran cengkaman brek.',
          level: 'Tinggi (KBAT)'
        },
        {
          id: 't4-b8-s3-q6',
          question: 'Semasa kapal angkasa memasuki semula atmosfera bumi pada kelajuan supersonik, suhu badannya boleh mencecah 1600°C. Bahagian manakah yang melindungi angkasawan daripada haba melampau ini?',
          options: [
            'Lapisan cat plastik polimer',
            'Jubin seramik penebat haba termaju yang dipasang pada bahagian bawah kapal angkasa',
            'Kepingan aloi duralumin yang nipis',
            'Dawai kuprum yang membumikan arus elektrik'
          ],
          answerIndex: 1,
          explanation: 'Jubin penebat seramik termaju mempunyai takat lebur tinggi dan kekonduksian haba yang sangat rendah, menghalang pemindahan haba geseran atmosfera ke dalam kabin kapal angkasa.',
          level: 'Tinggi (KBAT)'
        }
      ]
    },

    // -------------------------------------------------------------
    // SUBTOPIK 8.4: BAHAN KOMPOSIT DAN KEPENTINGANNYA
    // -------------------------------------------------------------
    {
      id: 't4-b8-s4',
      code: '8.4',
      title: 'Bahan Komposit dan Kepentingannya',
      learningStandard: 'SP 8.4.1, 8.4.2, 8.4.3',
      durationMinutes: 30,
      tldr: [
        'Bahan komposit ialah bahan yang dihasilkan daripada gabungan dua atau lebih bahan bukan homogen yang berlainan sifat: bahan matriks (pengikat) dan bahan pengukuh (penyokong kekuatan).',
        'Sifat bahan komposit jauh lebih unggul dan mengatasi kelemahan setiap komponen asalnya.',
        '1. Konkrit Diperkukuh: Konkrit (matriks) + Rod/jejaring keluli (pengukuh). Tahan kedua-dua daya mampatan tinggi dan daya regangan tinggi (digunakan untuk jambatan, tiang bangunan pencakar langit, empangan).',
        '2. Kaca Gentian (Fiberglass): Plastik polimer (matriks) + Gentian kaca (pengukuh). Sangat kuat, berketumpatan rendah (ringan), tahan kakisan dan tahan regangan (digunakan untuk bot, topi keledar, tangki air).',
        '3. Gentian Optik: Teras kaca silika (indeks biasan tinggi, n₁) + Pembalut kaca/plastik (indeks biasan rendah, n₂). Menghantar data digital dalam bentuk denyutan cahaya berkelajuan tinggi melalui pantulan dalam penuh (digunakan untuk kabel internet jalur lebar dan endoskop perubatan).',
        '4. Kaca Fotokromik: Kaca silika + Hablur argentum klorida (AgCl) dan kuprum(I) klorida (CuCl). Menjadi gelap secara automatik apabila terkena cahaya matahari (sinar UV menukarkan Ag⁺ kepada atom Ag legap) dan cerah semula di dalam bilik (digunakan untuk cermin mata hitam pintar dan tingkap kereta).',
        '5. Superkonduktor: Seramik oksida tembaga-barium-itrium (YBCO). Mengalirkan arus elektrik dengan rintangan sifar pada suhu nitrogen cecair (-196°C) (digunakan untuk tren Maglev dan mesin MRI).'
      ],
      concepts: [
        {
          id: 't4-b8-s4-c1',
          title: 'Definisi Bahan Komposit & Struktur Komponen (Matriks vs Pengukuh)',
          badge: 'Konsep Asas SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                  Maksud & Struktur Anatomi Bahan Komposit
                </span>
                
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  <b>Bahan komposit</b> ialah bahan struktur baharu yang dihasilkan daripada gabungan <b>dua atau lebih bahan berlainan</b> (seperti logam, polimer, kaca, atau seramik) yang tidak larut antara satu sama lain untuk membentuk sifat gabungan yang jauh lebih kuat, ringan, dan tahan lama berbanding komponen asalnya:
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <div class="p-3 rounded-xl bg-blue-50 border border-blue-200">
                    <b class="text-blue-950 block mb-1">1. Bahan Matriks (Fasa Pengikat):</b>
                    <p class="text-blue-900 leading-relaxed">
                      Bahan berterusan yang mengelilingi, memegang, dan mengikat bahan pengukuh pada kedudukannya serta memindahkan beban tegangan kepada bahan pengukuh (cth: simen dalam konkrit, resin plastik dalam kaca gentian).
                    </p>
                  </div>

                  <div class="p-3 rounded-xl bg-indigo-50 border border-indigo-200">
                    <b class="text-indigo-950 block mb-1">2. Bahan Pengukuh (Fasa Penguat):</b>
                    <p class="text-indigo-900 leading-relaxed">
                      Bahan berbentuk gentian, serbuk, atau dawai jejaring yang tertanam di dalam matriks untuk menanggung beban mekanikal dan memberikan kekuatan regangan yang tinggi (cth: rod keluli, gentian kaca, gentian karbon).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't4-b8-s4-c2',
          title: '5 Bahan Komposit Utama SPM: Komposisi, Peningkatan Sifat & Kegunaan',
          badge: 'Jadual Wajib SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="overflow-x-auto my-2">
                <table class="w-full text-xs text-left border-collapse border border-slate-200">
                  <thead>
                    <tr class="bg-slate-100 text-slate-800">
                      <th class="p-2.5 border border-slate-200">Bahan Komposit</th>
                      <th class="p-2.5 border border-slate-200">Bahan Matriks + Pengukuh</th>
                      <th class="p-2.5 border border-slate-200">Peningkatan Sifat (Kelebihan)</th>
                      <th class="p-2.5 border border-slate-200">Kegunaan Sebenar</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200 text-slate-700">
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-slate-900">1. Konkrit Diperkukuh</td>
                      <td class="p-2.5"><b>Matriks:</b> Konkrit (simen + pasir + kelikir)<br/><b>Pengukuh:</b> Rod / jejaring keluli</td>
                      <td class="p-2.5">Konkrit asal kuat mampatan tetapi lemah regangan; rod keluli kuat regangan. Komposit tahan kedua-dua daya mampatan dan regangan yang tinggi.</td>
                      <td class="p-2.5">Tiang bangunan tinggi, jambatan, lebuh raya bertingkat, empangan hidroelektrik</td>
                    </tr>
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-slate-900">2. Kaca Gentian (Fiberglass)</td>
                      <td class="p-2.5"><b>Matriks:</b> Plastik polimer (resin)<br/><b>Pengukuh:</b> Gentian kaca halus</td>
                      <td class="p-2.5">Plastik asal fleksibel tetapi kekuatan regangan rendah; kaca rapuh. Komposit sangat kuat, ringan, tidak berkarat dan mudah dibentuk.</td>
                      <td class="p-2.5">Badan bot kecil, topi keledar keselamatan, tangki simpanan air, papan luncur, bumper kereta</td>
                    </tr>
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-slate-900">3. Gentian Optik</td>
                      <td class="p-2.5"><b>Teras:</b> Kaca silika indeks biasan tinggi (n₁)<br/><b>Pembalut:</b> Kaca/plastik indeks biasan rendah (n₂)<br/><b>Pelindung:</b> Jaket polimer</td>
                      <td class="p-2.5">Memindahkan data digital pada kelajuan cahaya melalui pantulan dalam penuh tanpa kehilangan isyarat atau gangguan elektromagnet.</td>
                      <td class="p-2.5">Kabel internet jalur lebar berkelajuan tinggi, endoskop dalam pembedahan perubatan</td>
                    </tr>
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-slate-900">4. Kaca Fotokromik</td>
                      <td class="p-2.5"><b>Matriks:</b> Kaca silika lut sinar<br/><b>Pengukuh:</b> Hablur argentum klorida (AgCl) + kuprum(I) klorida (CuCl)</td>
                      <td class="p-2.5">Menjadi gelap secara automatik apabila terdedah kepada sinaran UV (cahaya matahari); kembali cerah lut sinar di dalam bangunan.</td>
                      <td class="p-2.5">Kanta cermin mata hitam fotokromik pintar, cermin tingkap bangunan tinggi, cermin kereta</td>
                    </tr>
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-slate-900">5. Superkonduktor</td>
                      <td class="p-2.5"><b>Matriks:</b> Seramik tembaga oksida<br/><b>Komponen:</b> Yttrium-Barium-Copper-Oxide (YBCO)</td>
                      <td class="p-2.5">Rintangan elektrik sifar pada suhu nitrogen cecair (-196°C), menghasilkan medan magnet pengapungan yang amat berkuasa.</td>
                      <td class="p-2.5">Tren Maglev terapung, pengimejan resonans magnetik (MRI), pemecut zarah fizik nuklear</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- MEKANISME KACA FOTOKROMIK -->
              <div class="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                <b class="text-amber-900 block font-bold mb-1 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-amber-500"></span> Mekanisme Kimia Kaca Fotokromik (Soalan Esei SPM):
                </b>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  <div class="p-2.5 rounded-xl bg-white border border-amber-200">
                    <b class="text-slate-800">Di Bawah Cahaya Matahari (Sinar UV):</b>
                    <p class="text-slate-600 mt-1">Sinar UV membebaskan elektron yang menukarkan ion argentum (Ag⁺) kepada atom argentum (Ag) pepejal mikro yang legap:
                      <br/><span class="font-mono text-amber-800 font-bold">Ag⁺ + e⁻ → Ag (Legap/Gelap)</span>
                    </p>
                  </div>
                  <div class="p-2.5 rounded-xl bg-white border border-amber-200">
                    <b class="text-slate-800">Di Dalam Bangunan (Tiada UV):</b>
                    <p class="text-slate-600 mt-1">Ion kuprum(I) memindahkan elektron semula, mengoksidakan atom argentum kembali kepada ion argentum lut sinar:
                      <br/><span class="font-mono text-amber-800 font-bold">Ag + Cu²⁺ → Ag⁺ + Cu⁺ (Lut Sinar)</span>
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
          mistake: 'Menganggap konkrit dan konkrit diperkukuh adalah bahan yang sama.',
          correction: 'Konkrit biasa HANYA campuran simen, pasir dan batu kerikil (rapuh terhadap tarikan); konkrit diperkukuh DITANAM rod keluli di dalamnya untuk menampung daya regangan.',
          why: 'Penambahan rod keluli menukar sifat konkrit biasa menjadi bahan komposit yang kuat terhadap kedua-dua daya mampatan dan regangan.',
          spmTip: 'Sentiasa sebut: "Konkrit menampung daya mampatan, manakala rod keluli menampung daya regangan".'
        },
        {
          mistake: 'Menyatakan kaca fotokromik bertukar gelap kerana kaca itu terbakar oleh haba panas matahari.',
          correction: 'Penukaran warna adalah tindak balas FOTOKIMIA yang dicetuskan oleh sinaran ultraungu (UV), bukan haba.',
          why: 'Sinar UV menukarkan ion Ag⁺ kepada mendakan atom argentum logam Ag yang menyerap cahaya tampak.',
          spmTip: 'Kata kunci SPM: "Sinaran ultraungu (UV) menukarkan ion Ag⁺ kepada atom Ag".'
        }
      ],
      flashcards: [
        {
          id: 't4-b8-s4-fc1',
          front: 'Apakah takrifan bahan komposit menurut sukatan Kimia SPM?',
          back: 'Bahan yang terhasil daripada gabungan dua atau lebih bahan berlainan (bahan matriks dan bahan pengukuh) yang menghasilkan sifat lebih unggul daripada komponen asalnya.'
        },
        {
          id: 't4-b8-s4-fc2',
          front: 'Apakah bahan matriks dan bahan pengukuh dalam konkrit diperkukuh?',
          back: 'Bahan matriks ialah konkrit (simen, pasir, batu kelikir); bahan pengukuh ialah rod atau jejaring keluli.'
        },
        {
          id: 't4-b8-s4-fc3',
          front: 'Bagaimanakah kaca fotokromik bertukar gelap apabila terkena cahaya matahari?',
          back: 'Sinaran ultraungu (UV) menukarkan ion argentum (Ag⁺) kepada atom argentum (Ag) yang legap, menghalang cahaya daripada menembusi kanta.'
        },
        {
          id: 't4-b8-s4-fc4',
          front: 'Apakah prinsip fizik yang membolehkan gentian optik memindahkan isyarat data berkelajuan tinggi?',
          back: 'Pantulan dalam penuh (total internal reflection) denyutan cahaya di dalam teras kaca silika berindeks biasan tinggi.'
        },
        {
          id: 't4-b8-s4-fc5',
          front: 'Apakah komponen bahan matriks dan bahan pengukuh bagi kaca gentian (fiberglass)?',
          back: 'Bahan matriks ialah resin plastik polimer; bahan pengukuh ialah gentian kaca halus.'
        }
      ],
      quiz: [
        {
          id: 't4-b8-s4-q1',
          question: 'Antara pernyataan berikut, yang manakah merupakan takrifan yang paling tepat bagi bahan komposit?',
          options: [
            'Sebatian kimia yang terbentuk apabila dua unsur bukan logam berkongsi elektron',
            'Campuran fizikal dua logam atau lebih yang mempunyai takat lebur yang serupa',
            'Bahan struktur yang dihasilkan daripada gabungan bahan matriks dan bahan pengukuh dengan sifat yang lebih unggul daripada komponen asalnya',
            'Bahan sintetik yang dihasilkan daripada pempolimeran monomer hidrokarbon'
          ],
          answerIndex: 2,
          explanation: 'Bahan komposit menggabungkan dua fasa bahan (matriks dan pengukuh) untuk menghasilkan bahan baharu dengan sifat mekanikal yang lebih cemerlang berbanding bahan asalnya.',
          level: 'Rendah'
        },
        {
          id: 't4-b8-s4-q2',
          question: 'Konkrit biasa sangat kuat menampung daya mampatan tetapi lemah terhadap daya regangan. Bagaimanakah kelemahan ini diatasi dalam pembinaan jambatan?',
          options: [
            'Menambah lebih banyak air ke dalam bancuhan simen',
            'Menanam rod atau jejaring keluli ke dalam konkrit untuk menghasilkan konkrit diperkukuh',
            'Mengecat permukaan konkrit dengan larutan zink klorida',
            'Memanaskan konkrit pada suhu 1500°C di dalam relau'
          ],
          answerIndex: 1,
          explanation: 'Rod keluli menampung daya regangan manakala konkrit menampung daya mampatan, menghasilkan struktur konkrit diperkukuh yang mampu menanggung beban dinamik jambatan.',
          level: 'Rendah'
        },
        {
          id: 't4-b8-s4-q3',
          question: 'Apakah kelebihan utama badan bot yang diperbuat daripada kaca gentian (fiberglass) berbanding bot yang diperbuat daripada logam besi?',
          options: [
            'Kaca gentian boleh larut dalam air laut selepas tamat tempoh penggunaan',
            'Kaca gentian sangat kuat, berketumpatan rendah (ringan) dan tidak mengalami pengaratan atau kakisan oleh air laut',
            'Kaca gentian mengalirkan arus elektrik lebih baik daripada besi',
            'Kaca gentian lebih berat membolehkan bot menyelam seperti kapal selam'
          ],
          answerIndex: 1,
          explanation: 'Kaca gentian (plastik polimer + gentian kaca) tahan kakisan air garam laut, sangat kuat terhadap ombak dan ringan menjimatkan penggunaan bahan api bot.',
          level: 'Sederhana'
        },
        {
          id: 't4-b8-s4-q4',
          question: 'Gentian optik terdiri daripada teras kaca silika dengan indeks biasan n₁ dan lapisan pembalut kaca dengan indeks biasan n₂. Apakah hubungan antara n₁ dan n₂ yang membolehkan pantulan dalam penuh berlaku?',
          options: ['n₁ mestilah lebih besar daripada n₂ (n₁ > n₂)', 'n₁ mestilah sama dengan n₂ (n₁ = n₂)', 'n₁ mestilah lebih kecil daripada n₂ (n₁ < n₂)', 'Nilai n₁ dan n₂ tidak mempengaruhi pantulan'],
          answerIndex: 0,
          explanation: 'Syarat pantulan dalam penuh ialah cahaya mesti merambat dari medium yang lebih tumpat optik (teras kaca n₁ lebih tinggi) ke medium kurang tumpat optik (pembalut n₂ lebih rendah).',
          level: 'Sederhana'
        },
        {
          id: 't4-b8-s4-q5',
          question: 'Kanta cermin mata fotokromik menjadi gelap apabila pemakainya keluar ke kawasan panas terik matahari dan cerah semula apabila masuk ke dalam bilik berhawa dingin. Apakah zarah yang menyebabkan kanta tersebut menjadi gelap?',
          options: ['Gas klorin, Cl₂', 'Atom argentum, Ag', 'Ion kuprum(II), Cu²⁺', 'Ion hidroksida, OH⁻'],
          answerIndex: 1,
          explanation: 'Sinar UV matahari menukarkan ion Ag⁺ kepada atom argentum (Ag) pepejal mikro. Atom argentum ini legap dan menghalang cahaya tampak daripada menembusi kanta.',
          level: 'Sederhana'
        },
        {
          id: 't4-b8-s4-q6',
          question: 'Seorang jurutera ingin membina sayap pesawat supersonik generasi baharu. Beliau memerlukan bahan yang mempunyai kekuatan regangan yang amat tinggi, rintangan haba melampau, tetapi mempunyai jisim yang sangat ringan. Bahan komposit manakah yang paling sesuai dicadangkan?',
          options: [
            'Konkrit diperkukuh',
            'Kaca soda kapur bertetulang plumbum',
            'Polimer diperkukuh gentian karbon (Carbon Fibre Reinforced Polymer)',
            'Kaca fotokromik bersalut argentum klorida'
          ],
          answerIndex: 2,
          explanation: 'Bahan komposit polimer bertetulang gentian karbon (CFRP) menggabungkan kekuatan regangan gentian karbon yang luar biasa dengan ketumpatan yang sangat rendah dan rintangan lesu yang hebat untuk industri aeroangkasa moden.',
          level: 'Tinggi (KBAT)'
        }
      ]
    }
  ]
};
