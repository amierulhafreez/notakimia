import { Chapter } from '../types/nota';

export const T4_BAB2: Chapter = {
  id: 't4-b2',
  form: 'T4',
  chapterNumber: 2,
  title: 'Jirim dan Struktur Atom',
  theme: 'Asas Kimia',
  durationMinutes: 90,
  description: 'Teori kinetik jirim, lengkung pemanasan & penyejukan naftalena, perkembangan model atom dari Dalton hingga Chadwick, struktur atom, perwakilan piawai, susunan elektron, dan kegunaan isotop dalam pelbagai bidang.',
  iconName: 'Atom',
  subtopicCount: 4,
  subtopics: [
    // -------------------------------------------------------------------------
    // SUBTOPIK 2.1
    // -------------------------------------------------------------------------
    {
      id: 't4-b2-s1',
      code: '2.1',
      title: 'Konsep Asas Jirim',
      learningStandard: 'SP 2.1.1, 2.1.2, 2.1.3',
      durationMinutes: 25,
      tldr: [
        'Jirim ialah sebarang bahan yang mempunyai jisim dan memenuhi ruang, wujud dalam 3 keadaan: pepejal, cecair, dan gas.',
        'Zarah jirim boleh wujud sebagai atom (cth: Ne, Fe), molekul (cth: H₂O, O₂), atau ion (cth: Na⁺, Cl⁻).',
        'Takat lebur dan takat beku bagi naftalena tulen ialah 80°C. Semasa perubahan fasa fizikal, suhu kekal malar.',
        'Pemanasan naftalena menggunakan kukus air untuk pemanasan sekata dan mengelakkan kebakaran. Penyejukan menggunakan kelalang kon dengan kacauan berterusan untuk mengelakkan penyejukan lampau (supercooling).'
      ],
      simulationRef: {
        id: 'pemanasan-dan-penyejukkan-naftalena',
        title: 'Makmal Maya Pemanasan & Penyejukan Naftalena',
        description: 'Plot lengkung pemanasan dan penyejukan masa nyata, kaji suhu malar 80°C, dan perhatikan pencegahan penyejukan lampau.',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=pemanasan-dan-penyejukkan-naftalena',
        previewBadge: 'Simulasi Bab 2'
      },
      concepts: [
        {
          id: 't4-b2-s1-c1',
          title: 'Definisi Jirim dan Teori Kinetik Jirim',
          badge: 'Fakta Teras',
          content: `
            <p>
              <b>Jirim</b> ditakrifkan sebagai sebarang bahan yang <span class="blur-target"><b>mempunyai jisim dan memenuhi ruang</b></span>.
            </p>
            <p>
              Mengikut <b>Teori Zarah Jirim</b>, jirim terdiri daripada zarah-zarah halus dan diskret. Zarah-zarah ini boleh terdiri daripada:
            </p>
            <ul class="list-disc pl-5 space-y-1 text-xs text-slate-700 mt-1">
              <li><b>Atom:</b> Zarah terkecil bagi sesuatu unsur yang boleh mengambil bahagian dalam tindak balas kimia (cth: gas helium He, kuprum Cu, karbon C).</li>
              <li><b>Molekul:</b> Zarah neutral yang terdiri daripada dua atau lebih atom yang terikat secara kovalen (cth: gas oksigen O₂, air H₂O, karbon dioksida CO₂).</li>
              <li><b>Ion:</b> Zarah yang membawa cas positif (kation) atau cas negatif (anion) yang terbentuk akibat pendermaan atau penerimaan elektron (cth: natrium klorida NaCl terdiri daripada ion Na⁺ dan ion Cl⁻).</li>
            </ul>
          `
        },
        {
          id: 't4-b2-s1-c2',
          title: 'Perbandingan 3 Keadaan Jirim: Pepejal, Cecair dan Gas',
          badge: 'Wajib Hafal SPM',
          content: `
            <p>
              Perbezaan sifat fizikal antara pepejal, cecair dan gas diterangkan berdasarkan susunan zarah, pergerakan zarah, daya tarikan antara zarah, dan kandungan tenaga kinetik:
            </p>
          `,
          comparisonTable: {
            headers: ['Ciri / Keadaan', 'Pepejal', 'Cecair', 'Gas'],
            rows: [
              [
                '<b>Susunan Zarah</b>',
                'Tersusun sangat rapat dalam corak yang teratur dan padat.',
                'Tersusun rapat tetapi tidak teratur, mempunyai ruang kecil antara zarah.',
                'Berjauhan antara satu sama lain dalam susunan yang rawak.'
              ],
              [
                '<b>Pergerakan Zarah</b>',
                'Hanya bergetar dan berputar pada kedudukan yang tetap.',
                'Menggelongsor dan bergerak bebas antara satu sama lain.',
                'Bergerak secara rawak, pantas dan bebas ke semua arah.'
              ],
              [
                '<b>Daya Tarikan Antara Zarah</b>',
                'Sangat kuat.',
                'Kuat (tetapi lebih lemah daripada pepejal).',
                'Sangat lemah dan boleh diabaikan.'
              ],
              [
                '<b>Tenaga Kinetik</b>',
                'Sangat rendah.',
                'Sederhana (lebih tinggi daripada pepejal).',
                'Sangat tinggi.'
              ],
              [
                '<b>Bentuk & Isi Padu</b>',
                'Bentuk tetap, isi padu tetap (tidak boleh dimampatkan).',
                'Bentuk mengikut bekas, isi padu tetap.',
                'Bentuk dan isi padu mengikut bekas (mudah dimampatkan).'
              ]
            ]
          }
        },
        {
          id: 't4-b2-s1-c3',
          title: 'Lengkung Pemanasan dan Penyejukan Naftalena (C₁₀H₈)',
          badge: 'Eksperimen Emas SPM',
          content: `
            <p>
              Penentuan takat lebur dan takat beku <b>naftalena, C₁₀H₈</b> ialah eksperimen penting dalam Kertas 2 dan Kertas 3. Takat lebur dan takat beku naftalena tulen ialah <span class="blur-target"><b>80°C</b></span>.
            </p>
            <div class="space-y-2 mt-2">
              <div class="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-xs text-amber-950 space-y-1">
                <span class="font-bold text-amber-900 block">🔥 Lengkung Pemanasan (Peleburan pada 80°C):</span>
                <p>
                  Mengapakah suhu kekal malar pada 80°C semasa fasa peleburan?
                  <br />
                  <span class="blur-target"><b>Haba yang diserap dari persekitaran digunakan untuk mengatasi daya tarikan antara zarah</b></span> pepejal sehingga pepejal bertukar sepenuhnya menjadi cecair, bukannya untuk meningkatkan suhu.
                </p>
              </div>

              <div class="p-3.5 rounded-2xl bg-sky-50/90 border border-sky-200/90 text-xs text-sky-950 space-y-1">
                <span class="font-bold text-sky-900 block">❄️ Lengkung Penyejukan (Pembekuan pada 80°C):</span>
                <p>
                  Mengapakah suhu kekal malar pada 80°C semasa fasa pembekuan?
                  <br />
                  <span class="blur-target"><b>Haba yang hilang ke persekitaran diimbangi tepat oleh haba yang dibebaskan</b></span> apabila zarah-zarah cecair tertarik antara satu sama lain untuk membentuk susunan pepejal yang teratur.
                </p>
              </div>
            </div>

            <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-1.5 mt-2">
              <span class="font-bold text-slate-900">🔬 3 Langkah Berjaga-jaga Semasa Eksperimen:</span>
              <ul class="list-disc pl-5 space-y-1 text-[11px] text-slate-600">
                <li><b>Kukus air (water bath) digunakan semasa pemanasan:</b> Memastikan pemanasan naftalena berlaku secara sekata dan mengelakkan naftalena terbakar secara terus kerana ia mudah meruap dan mudah terbakar.</li>
                <li><b>Kelalang kon digunakan semasa penyejukan:</b> Mengelakkan kehilangan haba yang terlalu cepat ke udara persekitaran agar penyejukan berlaku secara perlahan dan sekata.</li>
                <li><b>Naftalena dikacau secara berterusan dengan termometer:</b> Memastikan suhu larutan seragam di seluruh tabung uji dan mengelakkan berlakunya <span class="blur-target"><b>penyejukan lampau (supercooling)</b></span>.</li>
              </ul>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menyatakan bahawa "suhu kekal malar semasa peleburan kerana haba digunakan untuk memecahkan ikatan kovalen antara atom".',
          correction: 'Haba yang diserap digunakan untuk mengatasi daya tarikan antara molekul (daya Van der Waals), BUKAN memecahkan ikatan kovalen di dalam molekul naftalena!',
          why: 'Peleburan ialah perubahan fizikal, bukan tindak balas kimia. Molekul C₁₀H₈ kekal utuh.',
          spmTip: 'Sentiasa gunakan frasa "mengatasi daya tarikan antara zarah/molekul" dalam jawapan skema SPM.'
        },
        {
          mistake: 'Memanaskan tabung uji berisi naftalena secara terus dengan api penunu Bunsen tanpa kukus air.',
          correction: 'Wajib gunakan kukus air (water bath) kerana naftalena mudah meruap dan wapnya sangat mudah terbakar.',
          why: 'Pemanasan terus juga menyebabkan naftalena melebur tidak sekata dan termometer boleh pecah akibat pemanasan setempat.',
          spmTip: 'Takat lebur naftalena (80°C) adalah di bawah 100°C, maka kukus air adalah kaedah paling sesuai.'
        }
      ],
      flashcards: [
        {
          id: 't4-b2-s1-fc1',
          front: 'Berapakah takat lebur dan takat beku bagi naftalena tulen?',
          back: '80°C (kedua-dua takat lebur dan takat beku adalah bernilai sama untuk bahan tulen).'
        },
        {
          id: 't4-b2-s1-fc2',
          front: 'Mengapakah suhu tidak berubah (kekal malar) semasa cecair naftalena sedang membeku?',
          back: 'Haba yang hilang ke persekitaran diimbangi oleh haba yang dibebaskan semasa zarah tertarik membentuk susunan pepejal.'
        },
        {
          id: 't4-b2-s1-fc3',
          front: 'Apakah maksud fenomena "penyejukan lampau" (supercooling)?',
          back: 'Keadaan di mana suhu cecair turun di bawah takat beku sebenar tanpa pembentukan pepejal serta-merta.'
        },
        {
          id: 't4-b2-s1-fc4',
          front: 'Bagaimanakah penyejukan lampau dapat dielakkan semasa penyejukan naftalena?',
          back: 'Dengan mengacau cecair naftalena secara berterusan menggunakan termometer dan meletakkan tabung uji di dalam kelalang kon.'
        },
        {
          id: 't4-b2-s1-fc5',
          front: 'Bandingkan pergerakan zarah dalam keadaan pepejal berbanding cecair.',
          back: 'Pepejal: zarah hanya bergetar dan berputar pada kedudukan tetap. Cecair: zarah menggelongsor dan bergerak bebas antara satu sama lain.'
        }
      ],
      quiz: [
        {
          id: 't4-b2-s1-q1',
          question: 'Antara berikut, yang manakah merupakan bahan yang terdiri daripada zarah jenis molekul?',
          options: [
            'Gas neon, Ne',
            'Logam zink, Zn',
            'Gas karbon dioksida, CO₂',
            'Serbuk natrium klorida, NaCl'
          ],
          answerIndex: 2,
          explanation: 'Karbon dioksida (CO₂) ialah sebatian kovalen yang terdiri daripada molekul. Ne ialah atom tunggal, Zn ialah kekisi atom logam, dan NaCl ialah zarah ion.',
          level: 'Rendah',
          spmReference: 'SPM 2021 Kertas 1'
        },
        {
          id: 't4-b2-s1-q2',
          question: 'Semasa pemanasan pepejal naftalena pada takat leburnya (80°C), bacaan suhu termometer didapati tidak meningkat selama 3 minit. Apakah sebab bagi fenomena ini?',
          options: [
            'Tenaga kinetik zarah berkurang secara mendadak',
            'Haba yang diserap digunakan untuk mengatasi daya tarikan antara zarah',
            'Semua haba telah hilang ke udara persekitaran',
            'Ikatan kovalen C-H di dalam molekul naftalena sedang diputuskan'
          ],
          answerIndex: 1,
          explanation: 'Pada takat lebur, haba yang diserap (haba pendam pelakuran) digunakan sepenuhnya untuk mengatasi daya tarikan antara zarah sehingga pepejal bertukar menjadi cecair.',
          level: 'Sederhana',
          spmReference: 'Percubaan SPM SBP 2023'
        },
        {
          id: 't4-b2-s1-q3',
          question: 'Mengapakah naftalena perlu dikacau secara berterusan semasa proses penyejukan cecair naftalena dijalankan?',
          options: [
            'Untuk mempercepatkan proses peleburan pepejal',
            'Bagi memastikan suhu seragam dan mengelakkan penyejukan lampau',
            'Untuk mengurangkan tekanan udara di dalam tabung uji',
            'Bagi membolehkan termometer menyerap lebih banyak haba'
          ],
          answerIndex: 1,
          explanation: 'Kacauan berterusan memastikan pengagihan suhu yang seragam dan mencegah supercooling (penurunan suhu di bawah takat beku sebelum memejal).',
          level: 'Sederhana'
        },
        {
          id: 't4-b2-s1-q4',
          question: 'Rajah menunjukkan lengkung penyejukan bahan X. Bahan X mula membeku pada minit ke-3 (suhu 65°C) dan pembekuan lengkap pada minit ke-8. Antara minit ke-4 hingga ke-7, apakah keadaan fizik bagi bahan X?',
          options: [
            'Pepejal sahaja',
            'Cecair sahaja',
            'Campuran cecair dan pepejal',
            'Gas dan cecair'
          ],
          answerIndex: 2,
          explanation: 'Pada bahagian garis mendatar (takat beku), kedua-dua fasa cecair dan pepejal wujud bersama dalam keseimbangan terma.',
          level: 'Rendah'
        },
        {
          id: 't4-b2-s1-q5',
          question: 'Suatu sampel bahan Y mempunyai takat lebur -114°C dan takat didih 78°C. Apakah keadaan fizikal bahan Y pada suhu bilik (27°C)?',
          options: [
            'Pepejal',
            'Cecair',
            'Gas',
            'Campuran pepejal dan gas'
          ],
          answerIndex: 1,
          explanation: 'Suhu bilik (27°C) berada di antara takat lebur (-114°C) dan takat didih (78°C). Oleh itu, bahan Y wujud dalam keadaan cecair.',
          level: 'Sederhana',
          spmReference: 'SPM 2022 Kertas 1'
        },
        {
          id: 't4-b2-s1-q6',
          question: 'Seorang murid mendapati takat lebur sampel naftalena yang diuji dalam makmal ialah antara 76°C hingga 79°C, dan bukannya 80°C yang tepat. Apakah inferens yang paling munasabah bagi pemerhatian ini?',
          options: [
            'Kukus air telah kehabisan air semasa pemanasan',
            'Sampel naftalena tersebut mengandungi bendasing',
            'Tekanan atmosfera di dalam makmal terlalu tinggi',
            'Naftalena telah mengalami proses pemejalwapan'
          ],
          answerIndex: 1,
          explanation: 'Kehadiran bendasing merendahkan takat lebur sesuatu bahan tulen dan menyebabkan peleburan berlaku dalam julat suhu, bukan pada suhu tetap yang tajam.',
          level: 'Tinggi (KBAT)',
          spmReference: 'Soalan Aplikasi KBAT Kertas 2'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // SUBTOPIK 2.2
    // -------------------------------------------------------------------------
    {
      id: 't4-b2-s2',
      code: '2.2',
      title: 'Perkembangan Model Atom',
      learningStandard: 'SP 2.2.1, 2.2.2, 2.2.3',
      durationMinutes: 20,
      tldr: [
        'Atom terdiri daripada 3 zarah subatom: Proton (p), Neutron (n) di dalam nukleus, dan Elektron (e) yang mengelilingi nukleus.',
        'Cas relatif: Proton (+1), Neutron (0, neutral), Elektron (-1). Jisim relatif: Proton (1), Neutron (1), Elektron (1/1840).',
        'Kronologi 5 Model Atom: John Dalton → J.J. Thomson → Ernest Rutherford → Niels Bohr → James Chadwick.',
        'Mnemonik Sejarah Atom: "Di Taman Ramai Budak Cergas" (Dalton: sfera pejal; Thomson: elektron & sfera positif; Rutherford: nukleus & proton; Bohr: petala elektron; Chadwick: neutron).'
      ],
      concepts: [
        {
          id: 't4-b2-s2-c1',
          title: 'Zarah-Zarah Subatom: Proton, Neutron dan Elektron',
          badge: 'Fakta Asas SPM',
          content: `
            <p>
              Atom bukan lagi zarah terkecil yang tidak boleh dibahagi. Sebaliknya, atom terbina daripada 3 zarah subatom utama:
            </p>
          `,
          comparisonTable: {
            headers: ['Zarah Subatom', 'Simbol', 'Cas Relatif', 'Jisim Relatif', 'Kedudukan dalam Atom'],
            rows: [
              ['<b>Proton</b>', 'p', '+1 (Positif)', '1', 'Di dalam nukleus'],
              ['<b>Neutron</b>', 'n', '0 (Neutral)', '1', 'Di dalam nukleus'],
              ['<b>Elektron</b>', 'e', '-1 (Negatif)', '1/1840 (Hampir sifar)', 'Bergerak mengelilingi nukleus dalam petala']
            ]
          }
        },
        {
          id: 't4-b2-s2-c2',
          title: 'Kronologi Sejarah Perkembangan Model Atom (Dalton hingga Chadwick)',
          badge: 'Wajib Hafal Urutan',
          content: `
            <p>
              Model atom telah mengalami penyempurnaan berperingkat melalui penemuan eksperimen oleh 5 ahli sains tersohor:
            </p>
            <div class="space-y-3 mt-2">
              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-sky-800">1. John Dalton (1805)</span>
                <p class="text-slate-600 mt-0.5">
                  Menyatakan jirim terdiri daripada zarah berbentuk <span class="blur-target"><b>sfera pejal yang tidak boleh dibahagi, dicipta atau dimusnahkan</b></span>.
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-indigo-800">2. J.J. Thomson (1897)</span>
                <p class="text-slate-600 mt-0.5">
                  Menemui zarah bercas negatif iaitu <span class="blur-target"><b>elektron</b></span> melalui eksperimen tiub sinar katod. Mengemukakan model atom sfera bercas positif yang ditaburi elektron (Model Puding Plum).
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-teal-800">3. Ernest Rutherford (1911)</span>
                <p class="text-slate-600 mt-0.5">
                  Menemui <span class="blur-target"><b>nukleus yang sangat kecil, tumpat dan bercas positif</b></span> di tengah atom melalui eksperimen pembelauan zarah alfa ke atas kerajang emas nipis. Beliau turut menemui zarah <b>proton</b> di dalam nukleus.
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-amber-800">4. Niels Bohr (1913)</span>
                <p class="text-slate-600 mt-0.5">
                  Mencadangkan elektron bergerak mengelilingi nukleus dalam <span class="blur-target"><b>petala-petala tertentu</b></span> pada jarak dan aras tenaga yang tetap.
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-rose-800">5. James Chadwick (1932)</span>
                <p class="text-slate-600 mt-0.5">
                  Menemui zarah subatom neutral iaitu <span class="blur-target"><b>neutron</b></span> di dalam nukleus yang mempunyai jisim hampir sama dengan proton. Penemuan ini melengkapkan struktur atom moden.
                </p>
              </div>
            </div>

            <div class="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 mt-3 font-medium">
              💡 <b>Mnemonik Urutan Ahli Sains:</b>
              <br />
              <span class="font-bold text-indigo-800 text-sm">"Di Taman Ramai Budak Cergas"</span>
              <br />
              <b>D</b>alton (Sfera) → <b>T</b>homson (Elektron) → <b>R</b>utherford (Nukleus/Proton) → <b>B</b>ohr (Petala) → <b>C</b>hadwick (Neutron).
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menganggap Rutherford yang mencadangkan elektron bergerak dalam petala-petala tertentu.',
          correction: 'Rutherford hanya menyatakan elektron mengelilingi nukleus secara rawak. Niels Bohr yang mencadangkan konsep elektron bergerak dalam petala beraras tenaga tetap.',
          why: 'Konsep petala elektron diperkenalkan oleh Bohr untuk menerangkan kestabilan atom daripada runtuh ke dalam nukleus.',
          spmTip: 'Ingat kata kunci: Bohr = Petala Elektron; Rutherford = Nukleus & Proton.'
        },
        {
          mistake: 'Mengelirukan penemu elektron (J.J. Thomson) dengan penemu neutron (James Chadwick).',
          correction: 'Elektron ditemui oleh J.J. Thomson (1897), manakala neutron ditemui oleh James Chadwick (1932).',
          why: 'Neutron ditemui jauh lebih lewat (1932) kerana sifatnya yang tidak bercas (neutral) menyukarkan pengesanannya secara elektrostatik.',
          spmTip: 'Hafal pasangan saintis-zarah: Thomson-Elektron, Rutherford-Proton, Chadwick-Neutron.'
        }
      ],
      flashcards: [
        {
          id: 't4-b2-s2-fc1',
          front: 'Namakan 3 zarah subatom serta cas relatif masing-masing.',
          back: 'Proton (+1), Neutron (0 / neutral), Elektron (-1).'
        },
        {
          id: 't4-b2-s2-fc2',
          front: 'Siapakah ahli sains yang menemui zarah elektron?',
          back: 'J.J. Thomson pada tahun 1897 melalui eksperimen tiub sinar katod.'
        },
        {
          id: 't4-b2-s2-fc3',
          front: 'Apakah kesimpulan eksperimen pembelauan zarah alfa oleh Ernest Rutherford?',
          back: 'Sebahagian besar atom adalah ruang kosong dengan nukleus kecil yang sangat tumpat dan bercas positif di tengah-tengah atom.'
        },
        {
          id: 't4-b2-s2-fc4',
          front: 'Apakah sumbangan terpenting Niels Bohr dalam perkembangan model atom?',
          back: 'Memperkenalkan konsep elektron bergerak mengelilingi nukleus dalam petala-petala tertentu pada aras tenaga tetap.'
        },
        {
          id: 't4-b2-s2-fc5',
          front: 'Apakah zarah subatom yang ditemui oleh James Chadwick pada tahun 1932?',
          back: 'Neutron, iaitu zarah neutral di dalam nukleus yang mempunyai jisim hampir sama dengan proton.'
        }
      ],
      quiz: [
        {
          id: 't4-b2-s2-q1',
          question: 'Antara zarah subatom berikut, yang manakah terletak di dalam nukleus sesuatu atom?',
          options: [
            'Proton dan elektron sahaja',
            'Proton dan neutron sahaja',
            'Neutron dan elektron sahaja',
            'Proton, elektron dan neutron'
          ],
          answerIndex: 1,
          explanation: 'Nukleus atom mengandungi proton (bercas positif) dan neutron (neutral). Elektron bergerak di luar nukleus di dalam petala.',
          level: 'Rendah'
        },
        {
          id: 't4-b2-s2-q2',
          question: 'Pernyataan manakah yang betul mengenai cas dan jisim relatif bagi zarah elektron?',
          options: [
            'Cas relatif: +1, Jisim relatif: 1',
            'Cas relatif: 0, Jisim relatif: 1',
            'Cas relatif: -1, Jisim relatif: 1/1840',
            'Cas relatif: -1, Jisim relatif: 1'
          ],
          answerIndex: 2,
          explanation: 'Elektron mempunyai cas relatif -1 dan jisim relatif yang sangat kecil iaitu 1/1840 kali jisim satu proton.',
          level: 'Rendah',
          spmReference: 'SPM 2021 Kertas 1'
        },
        {
          id: 't4-b2-s2-q3',
          question: 'Eksperimen pembedilan zarah alfa ke atas kerajang emas nipis oleh Ernest Rutherford mendapati sebilangan kecil zarah alfa dipesongkan pada sudut yang besar. Apakah kesimpulan daripada pemerhatian ini?',
          options: [
            'Elektron tersebar secara seragam di seluruh atom',
            'Atom mengandungi nukleus kecil, tumpat dan bercas positif di pusatnya',
            'Neutron mempunyai jisim yang sama dengan proton',
            'Elektron beredar dalam petala yang tetap'
          ],
          answerIndex: 1,
          explanation: 'Pesongan zarah alfa (yang bercas positif) membuktikan kewujudan nukleus yang sangat kecil, tumpat dan bercas positif di tengah atom.',
          level: 'Sederhana',
          spmReference: 'Percubaan SPM Terengganu 2022'
        },
        {
          id: 't4-b2-s2-q4',
          question: 'Rajah menunjukkan satu model atom di mana elektron mengelilingi nukleus dalam petala-petala tertentu. Siapakah ahli sains yang mengemukakan model atom ini?',
          options: [
            'John Dalton',
            'J.J. Thomson',
            'Niels Bohr',
            'James Chadwick'
          ],
          answerIndex: 2,
          explanation: 'Niels Bohr ialah saintis yang memperkenalkan konsep elektron bergerak mengelilingi nukleus di dalam petala beraras tenaga tertentu.',
          level: 'Rendah'
        },
        {
          id: 't4-b2-s2-q5',
          question: 'Susun ahli sains berikut mengikut urutan kronologi perkembangan model atom yang betul bermula dari yang terawal:',
          options: [
            'Thomson → Dalton → Rutherford → Chadwick → Bohr',
            'Dalton → Thomson → Rutherford → Bohr → Chadwick',
            'Dalton → Rutherford → Thomson → Bohr → Chadwick',
            'Rutherford → Thomson → Dalton → Bohr → Chadwick'
          ],
          answerIndex: 1,
          explanation: 'Urutan sejarah yang betul: Dalton (1805) → Thomson (1897) → Rutherford (1911) → Bohr (1913) → Chadwick (1932).',
          level: 'Sederhana',
          spmReference: 'SPM 2023 Kertas 1'
        },
        {
          id: 't4-b2-s2-q6',
          question: 'Mengapakah penemuan neutron oleh James Chadwick berlaku jauh lebih lewat (1932) berbanding penemuan elektron (1897) dan proton (1911)?',
          options: [
            'Neutron hanya wujud dalam atom buatan manusia',
            'Neutron tidak mempunyai sebarang cas elektrik (neutral) menyebabkan ia tidak dapat dipesongkan oleh medan elektrik atau medan magnet',
            'Jisim neutron terlalu kecil untuk dikesan oleh radas makmal awal',
            'Neutron sentiasa bergerak pada kelajuan cahaya'
          ],
          answerIndex: 1,
          explanation: 'Kerana sifat neutron yang neutral (tiada cas elektrik), ia tidak berinteraksi secara elektrostatik dengan plat medan elektrik/magnet, menyukarkan pengesanannya.',
          level: 'Tinggi (KBAT)',
          spmReference: 'Soalan KBAT SPM Kertas 2'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // SUBTOPIK 2.3
    // -------------------------------------------------------------------------
    {
      id: 't4-b2-s3',
      code: '2.3',
      title: 'Struktur Atom',
      learningStandard: 'SP 2.3.1, 2.3.2, 2.3.3, 2.3.4',
      durationMinutes: 25,
      tldr: [
        'Nombor Proton (Z) ialah bilangan proton di dalam nukleus sesuatu atom.',
        'Nombor Nukleon (A) ialah jumlah bilangan proton dan neutron di dalam nukleus atom (A = p + n).',
        'Perwakilan piawai atom ditulis sebagai [A atas, Z bawah] X. Bilangan neutron = A - Z.',
        'Bagi atom neutral: Bilangan proton = Bilangan elektron. Bagi kation Xⁿ⁺: elektron berkurang sebanyak n. Bagi anion Yⁿ⁻: elektron bertambah sebanyak n.',
        'Susunan elektron 20 unsur pertama: Petala 1 (maksimum 2e), Petala 2 (maksimum 8e), Petala 3 (maksimum 8e). Elektron pada petala terluar dipanggil elektron valens.'
      ],
      concepts: [
        {
          id: 't4-b2-s3-c1',
          title: 'Nombor Proton dan Nombor Nukleon',
          badge: 'Definisi Skema SPM',
          content: `
            <p>
              Dua nombor teras yang mencirikan sesuatu atom ialah:
            </p>
            <div class="space-y-2 mt-2">
              <div class="p-3 rounded-2xl bg-sky-50/90 border border-sky-200 text-xs">
                <span class="font-bold text-sky-900 block text-sm">Nombor Proton (Z):</span>
                <p class="text-sky-950 mt-0.5">
                  <span class="blur-target"><b>Bilangan proton yang terdapat di dalam nukleus</b></span> sesuatu atom. Setiap unsur mempunyai nombor proton yang unik dan tidak akan berubah.
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-indigo-50/90 border border-indigo-200 text-xs">
                <span class="font-bold text-indigo-900 block text-sm">Nombor Nukleon (A):</span>
                <p class="text-indigo-950 mt-0.5">
                  <span class="blur-target"><b>Jumlah bilangan proton dan neutron</b></span> di dalam nukleus sesuatu atom.
                </p>
                <div class="mt-1 font-mono text-[11px] text-indigo-800 font-bold">
                  Nombor Nukleon (A) = Bilangan Proton (p) + Bilangan Neutron (n)
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't4-b2-s3-c2',
          title: 'Perwakilan Piawai bagi Atom dan Pengiraan Zarah Subatom',
          badge: 'Formula Asas SPM',
          content: `
            <p>
              Berdasarkan <b>Buku Teks Kimia KSSM (m/s 36)</b>, perwakilan piawai bagi sesuatu atom unsur ditulis dalam bentuk:
            </p>

            <div class="my-4 p-5 rounded-2xl bg-gradient-to-br from-sky-50/80 via-white to-indigo-50/60 border-2 border-sky-300 shadow-sm">
              <div class="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
                <!-- Large Textbook Atom Symbol with Stacked Left Subscript/Superscript -->
                <div class="inline-flex items-center bg-white px-7 py-4 rounded-2xl border-2 border-sky-500 shadow-md">
                  <div class="flex flex-col text-right mr-1.5 font-bold leading-none select-none font-mono">
                    <span class="text-2xl sm:text-3xl font-black text-indigo-700 tracking-tight" title="Nombor Nukleon, A">A</span>
                    <span class="h-1.5"></span>
                    <span class="text-2xl sm:text-3xl font-black text-sky-700 tracking-tight" title="Nombor Proton, Z">Z</span>
                  </div>
                  <span class="text-6xl sm:text-7xl font-serif font-black text-slate-900 tracking-tight ml-1">X</span>
                </div>

                <!-- Textbook Descriptions & Labels -->
                <div class="space-y-2.5 text-xs sm:text-sm">
                  <div class="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/90 border border-indigo-200">
                    <span class="w-6 h-6 rounded-lg bg-indigo-600 text-white font-mono font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">A</span>
                    <div>
                      <span class="font-bold text-indigo-950 block">Nombor Nukleon (A):</span>
                      <span class="text-slate-600 text-xs">Jumlah bilangan proton dan neutron di dalam nukleus (nombor lebih besar, di atas sebelah kiri).</span>
                    </div>
                  </div>

                  <div class="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/90 border border-sky-200">
                    <span class="w-6 h-6 rounded-lg bg-sky-600 text-white font-mono font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">Z</span>
                    <div>
                      <span class="font-bold text-sky-950 block">Nombor Proton (Z):</span>
                      <span class="text-slate-600 text-xs">Bilangan proton di dalam nukleus atom (nombor lebih kecil, di bawah sebelah kiri).</span>
                    </div>
                  </div>

                  <div class="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/90 border border-slate-200">
                    <span class="w-6 h-6 rounded-lg bg-slate-800 text-white font-serif font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">X</span>
                    <div>
                      <span class="font-bold text-slate-900 block">Simbol Unsur (X):</span>
                      <span class="text-slate-600 text-xs">Simbol kimia bagi unsur mengikut Jadual Berkala Unsur KSSM.</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Textbook Examples Box -->
              <div class="mt-4 pt-3 border-t border-sky-200/80">
                <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2 text-center">Contoh Perwakilan Piawai Buku Teks:</span>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                  <div class="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span class="text-slate-500 block text-[10px] font-medium">Natrium (Na)</span>
                    <span class="font-black text-slate-900 text-lg inline-flex items-center justify-center font-mono mt-0.5">
                      <span class="flex flex-col text-[11px] leading-tight mr-1 text-right font-bold text-sky-800"><span>23</span><span>11</span></span>Na
                    </span>
                  </div>
                  <div class="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span class="text-slate-500 block text-[10px] font-medium">Karbon (C)</span>
                    <span class="font-black text-slate-900 text-lg inline-flex items-center justify-center font-mono mt-0.5">
                      <span class="flex flex-col text-[11px] leading-tight mr-1 text-right font-bold text-sky-800"><span>12</span><span>6</span></span>C
                    </span>
                  </div>
                  <div class="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span class="text-slate-500 block text-[10px] font-medium">Klorin (Cl)</span>
                    <span class="font-black text-slate-900 text-lg inline-flex items-center justify-center font-mono mt-0.5">
                      <span class="flex flex-col text-[11px] leading-tight mr-1 text-right font-bold text-sky-800"><span>35</span><span>17</span></span>Cl
                    </span>
                  </div>
                  <div class="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span class="text-slate-500 block text-[10px] font-medium">Oksigen (O)</span>
                    <span class="font-black text-slate-900 text-lg inline-flex items-center justify-center font-mono mt-0.5">
                      <span class="flex flex-col text-[11px] leading-tight mr-1 text-right font-bold text-sky-800"><span>16</span><span>8</span></span>O
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p class="text-xs text-slate-700 leading-relaxed">
              <b>Hubungan Pengiraan Zarah Subatom:</b>
              <br />
              • Bilangan proton = <b>Z</b>
              <br />
              • Bilangan neutron = <b>A − Z</b> (Nombor Nukleon tolak Nombor Proton)
              <br />
              • Bilangan elektron (atom neutral) = <b>Z</b> (kerana cas positif seimbang dengan cas negatif).
            </p>
          `,
          comparisonTable: {
            headers: ['Spesies', 'Perwakilan Piawai', 'Proton (p)', 'Neutron (n)', 'Elektron (e)', 'Penerangan'],
            rows: [
              ['Atom Natrium neutral', '<span class="inline-flex items-center font-bold text-sm font-mono"><span class="flex flex-col text-[10px] leading-none text-right mr-0.5 font-bold text-sky-700"><span>23</span><span>11</span></span>Na</span>', '11', '23 − 11 = 12', '11', 'Atom neutral: p = e'],
              ['Ion Natrium (Kation)', '<span class="inline-flex items-center font-bold text-sm font-mono"><span class="flex flex-col text-[10px] leading-none text-right mr-0.5 font-bold text-sky-700"><span>23</span><span>11</span></span>Na⁺</span>', '11', '12', '11 − 1 = 10', 'Derma 1e: e berkurang 1'],
              ['Atom Klorin neutral', '<span class="inline-flex items-center font-bold text-sm font-mono"><span class="flex flex-col text-[10px] leading-none text-right mr-0.5 font-bold text-sky-700"><span>35</span><span>17</span></span>Cl</span>', '17', '35 − 17 = 18', '17', 'Atom neutral: p = e'],
              ['Ion Klorida (Anion)', '<span class="inline-flex items-center font-bold text-sm font-mono"><span class="flex flex-col text-[10px] leading-none text-right mr-0.5 font-bold text-sky-700"><span>35</span><span>17</span></span>Cl⁻</span>', '17', '18', '17 + 1 = 18', 'Terima 1e: e bertambah 1']
            ]
          }
        },
        {
          id: 't4-b2-s3-c3',
          title: 'Susunan Elektron dan Elektron Valens 20 Unsur Pertama',
          badge: 'Kemahiran Melukis SPM',
          content: `
            <p>
              Elektron diisi ke dalam petala mengikut had kapasiti maksimum:
            </p>
            <ul class="list-disc pl-5 space-y-1 text-xs text-slate-700 mt-1">
              <li>Petala Pertama (paling dekat dengan nukleus): maksimum <span class="blur-target"><b>2 elektron</b></span> (duplet).</li>
              <li>Petala Kedua: maksimum <span class="blur-target"><b>8 elektron</b></span> (oktet).</li>
              <li>Petala Ketiga: diisi sehingga <span class="blur-target"><b>8 elektron</b></span> bagi 20 unsur pertama.</li>
            </ul>
            <p class="text-xs text-slate-700 mt-2">
              <b>Elektron Valens:</b> Bilangan elektron yang berada pada <span class="blur-target"><b>petala terluar</b></span> sesuatu atom. Elektron valens menentukan sifat kimia dan kedudukan kumpulan unsur dalam Jadual Berkala Unsur (cth: susunan elektron Na ialah 2.8.1 → elektron valens = 1 → Kumpulan 1).
            </p>
            <div class="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 mt-2">
              🎨 <b>Perbezaan Melukis SPM:</b>
              <br />
              • <b>Rajah Susunan Elektron:</b> Tunjukkan simbol unsur di tengah dan lukis bulatan petala dengan titik/pangkah elektron (cth: Cl menunjukkan 2.8.7).
              <br />
              • <b>Rajah Struktur Atom:</b> Wajib tulis bilangan proton dan neutron di dalam nukleus di tengah (cth: 17p, 18n) dan lukis petala elektron di sekelilingnya!
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Mengubah bilangan proton apabila atom membentuk ion positif atau ion negatif.',
          correction: 'Bilangan proton di dalam nukleus TIDAK PERNAH berubah semasa pembentukan ion! Hanya bilangan elektron yang berubah.',
          why: 'Pembentukan ion hanya melibatkan pendermaan atau penerimaan elektron pada petala terluar.',
          spmTip: 'Ingat: Ion Na⁺ mempunyai 11 proton dan 10 elektron. Jangan kurangkan nombor proton!'
        },
        {
          mistake: 'Melukis rajah susunan elektron apabila soalan meminta melukis "rajah struktur atom".',
          correction: 'Rajah struktur atom WAJIB menunjukkan bilangan proton dan neutron di dalam nukleus (cth: "11p, 12n"). Rajah susunan elektron hanya menunjukkan simbol unsur di tengah.',
          why: 'Struktur atom merangkumi zarah di dalam nukleus (nukleon) serta zarah di luar nukleus.',
          spmTip: 'Baca soalan dengan teliti: jika tertulis "rajah struktur atom", lukis nukleus dengan bilangan p dan n!'
        }
      ],
      flashcards: [
        {
          id: 't4-b2-s3-fc1',
          front: 'Apakah takrifan bagi "Nombor Proton"?',
          back: 'Bilangan proton yang terdapat di dalam nukleus sesuatu atom.'
        },
        {
          id: 't4-b2-s3-fc2',
          front: 'Apakah takrifan bagi "Nombor Nukleon"?',
          back: 'Jumlah bilangan proton dan neutron di dalam nukleus sesuatu atom.'
        },
        {
          id: 't4-b2-s3-fc3',
          front: 'Diberi perwakilan piawai bagi atom kalium ialah ³⁹₁₉K. Tentukan bilangan proton, neutron dan elektronnya.',
          back: 'Proton = 19, Neutron = 39 - 19 = 20, Elektron = 19.'
        },
        {
          id: 't4-b2-s3-fc4',
          front: 'Tuliskan susunan elektron bagi atom kalsium (nombor proton = 20) dan nyatakan bilangan elektron valensnya.',
          back: 'Susunan elektron: 2.8.8.2. Bilangan elektron valens = 2.'
        },
        {
          id: 't4-b2-s3-fc5',
          front: 'Apakah bilangan proton, neutron dan elektron bagi ion oksida, ¹⁶₈O²⁻?',
          back: 'Proton = 8, Neutron = 16 - 8 = 8, Elektron = 8 + 2 = 10 (menerima 2 elektron).'
        }
      ],
      quiz: [
        {
          id: 't4-b2-s3-q1',
          question: 'Perwakilan piawai bagi atom aluminium ialah ²⁷₁₃Al. Berapakah bilangan neutron di dalam nukleus atom aluminium tersebut?',
          options: [
            '13',
            '14',
            '27',
            '40'
          ],
          answerIndex: 1,
          explanation: 'Bilangan neutron = Nombor Nukleon (A) - Nombor Proton (Z) = 27 - 13 = 14 neutron.',
          level: 'Rendah',
          spmReference: 'SPM 2021 Kertas 1'
        },
        {
          id: 't4-b2-s3-q2',
          question: 'Satu ion M³⁺ mengandungi 10 elektron dan 14 neutron. Apakah nombor nukleon bagi unsur M?',
          options: [
            '24',
            '27',
            '13',
            '17'
          ],
          answerIndex: 1,
          explanation: 'Ion M³⁺ terbentuk apabila atom M mendermakan 3 elektron. Maka, bilangan proton dalam atom M = 10 + 3 = 13 proton. Nombor nukleon = Proton + Neutron = 13 + 14 = 27.',
          level: 'Sederhana',
          spmReference: 'Percubaan SPM MRSM 2022'
        },
        {
          id: 't4-b2-s3-q3',
          question: 'Unsur X mempunyai nombor proton 16. Antara berikut, yang manakah susunan elektron dan bilangan elektron valens bagi atom X?',
          options: [
            'Susunan elektron: 2.8.6 | Elektron valens: 6',
            'Susunan elektron: 2.6.8 | Elektron valens: 8',
            'Susunan elektron: 2.8.8 | Elektron valens: 8',
            'Susunan elektron: 2.8.4 | Elektron valens: 4'
          ],
          answerIndex: 0,
          explanation: 'Dengan 16 elektron, susunan elektron diisi mengikut petala: 2 dalam petala pertama, 8 dalam petala kedua, dan baki 6 dalam petala ketiga (2.8.6). Elektron valens = 6.',
          level: 'Rendah'
        },
        {
          id: 't4-b2-s3-q4',
          question: 'Antara zarah berikut, pasangan manakah yang mempunyai bilangan elektron yang sama (isoelektronik)?',
          options: [
            '²³₁₁Na⁺ dan ¹⁹₉F⁻',
            '³⁵₁₇Cl dan ³⁹₁₉K⁺',
            '²⁴₁₂Mg²⁺ dan ⁴⁰₂₀Ca²⁺',
            '⁴₀₁₈Ar dan ²³₁₁Na'
          ],
          answerIndex: 0,
          explanation: 'Na⁺ mempunyai 11 - 1 = 10 elektron. F⁻ mempunyai 9 + 1 = 10 elektron. Kedua-duanya mempunyai 10 elektron.',
          level: 'Sederhana',
          spmReference: 'SPM 2022 Kertas 1'
        },
        {
          id: 't4-b2-s3-q5',
          question: 'Apakah perbezaan utama antara "Rajah Struktur Atom" dengan "Rajah Susunan Elektron"?',
          options: [
            'Rajah struktur atom tidak mempunyai petala elektron',
            'Rajah struktur atom wajib menunjukkan bilangan proton dan neutron di dalam nukleus',
            'Rajah susunan elektron mengandungi simbol cas ionik',
            'Rajah susunan elektron menunjukkan jisim atom relatif'
          ],
          answerIndex: 1,
          explanation: 'Rajah struktur atom menunjukkan komposisi nukleus (bilangan proton dan neutron) bersama petala elektron, manakala rajah susunan elektron hanya menunjukkan simbol unsur di tengah.',
          level: 'Sederhana',
          spmReference: 'Format Pemarkahan SPM Kertas 2'
        },
        {
          id: 't4-b2-s3-q6',
          question: 'Suatu atom unsur Y mempunyai 7 elektron valens dan 3 petala yang berisi elektron. Apakah nombor proton bagi atom Y?',
          options: [
            '7',
            '9',
            '17',
            '35'
          ],
          answerIndex: 2,
          explanation: '3 petala berisi elektron dengan 7 elektron valens bermaksud susunan elektronnya ialah 2.8.7. Jumlah elektron = 2 + 8 + 7 = 17. Oleh itu nombor proton = 17 (klorin).',
          level: 'Tinggi (KBAT)'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // SUBTOPIK 2.4
    // -------------------------------------------------------------------------
    {
      id: 't4-b2-s4',
      code: '2.4',
      title: 'Isotop dan Penggunaannya',
      learningStandard: 'SP 2.4.1, 2.4.2, 2.4.3',
      durationMinutes: 20,
      tldr: [
        'Isotop ialah atom-atom bagi unsur yang sama yang mempunyai bilangan proton yang sama, tetapi bilangan neutron yang berbeza.',
        'Sifat kimia isotop adalah SAMA kerana bilangan elektron valensnya adalah sama. Sifat fizikal (takat lebur/didih/ketumpatan) sedikit berbeza kerana jisim yang berbeza.',
        'Formula Jisim Atom Relatif daripada kelimpahan semula jadi: Ar = ∑ (% isotop × jisim isotop) / 100.',
        'Kegunaan isotop SPM: Kobalt-60 (radioterapi kanser), Iodin-131 (kanser tiroid), Karbon-14 (pentarikhan usia artifak fosil), Natrium-24 (kesan kebocoran paip bawah tanah), Fosforus-32 (kadar serapan baja), Uranium-235 (reaktor nuklear).'
      ],
      concepts: [
        {
          id: 't4-b2-s4-c1',
          title: 'Definisi Isotop dan Perbandingan Sifat',
          badge: 'Definisi Wajib Hafal',
          content: `
            <p>
              <b>Isotop</b> ditakrifkan sebagai <span class="blur-target"><b>atom-atom bagi unsur yang sama yang mempunyai bilangan proton yang sama tetapi bilangan neutron yang berbeza</b></span>.
            </p>
            <p class="text-xs text-slate-700 leading-relaxed mt-2">
              Contoh isotop hidrogen:
              <br />
              • Hidrogen-1 (¹₁H): 1 proton, 0 neutron
              <br />
              • Hidrogen-2 / Deuterium (²₁H): 1 proton, 1 neutron
              <br />
              • Hidrogen-3 / Tritium (³₁H): 1 proton, 2 neutron
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
              <div class="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                <span class="font-bold text-emerald-900 block">✅ Sifat Kimia: SAMA</span>
                <p class="text-[11px] mt-0.5">Kerana semua isotop bagi unsur yang sama mempunyai <span class="blur-target"><b>susunan elektron dan bilangan elektron valens yang sama</b></span>.</p>
              </div>

              <div class="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                <span class="font-bold text-amber-900 block">⚠️ Sifat Fizikal: BERBEZA SEDIKIT</span>
                <p class="text-[11px] mt-0.5">Kerana isotop mempunyai <span class="blur-target"><b>jisim atom yang berbeza</b></span> menyebabkan perbezaan kecil dalam takat lebur, takat didih dan ketumpatan.</p>
              </div>
            </div>
          `
        },
        {
          id: 't4-b2-s4-c2',
          title: 'Penghitungan Jisim Atom Relatif (Ar) daripada Kelimpahan Semula Jadi',
          badge: 'Pengiraan Kuantitatif SPM',
          content: `
            <p>
              <b>Kelimpahan semula jadi</b> ialah peratusan kewujudan sesuatu isotop dalam sampel semula jadi unsur di bumi. Jisim atom relatif (Ar) dihitung menggunakan formula:
            </p>
            <div class="p-4 rounded-2xl bg-slate-900 text-center font-mono text-white text-xs sm:text-sm my-2 shadow-inner">
              <span class="text-sky-300 font-bold">
                Jisim Atom Relatif (Ar) = [ ∑ (% isotop × jisim isotop) ] ÷ 100
              </span>
            </div>
            <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-1 mt-2">
              <span class="font-bold text-slate-900">Contoh Pengiraan SPM:</span>
              <p class="text-slate-600 leading-relaxed text-[11px]">
                Klorin wujud secara semula jadi sebagai dua isotop: ³⁵Cl dengan kelimpahan 75%, dan ³⁷Cl dengan kelimpahan 25%.
                <br />
                <b>Ar Klorin</b> = [ (75 × 35) + (25 × 37) ] ÷ 100
                <br />
                = [ 2625 + 925 ] ÷ 100 = <b>35.5</b>
              </p>
            </div>
          `
        },
        {
          id: 't4-b2-s4-c3',
          title: 'Kegunaan Isotop dan Radioisotop dalam Pelbagai Bidang',
          badge: 'Soalan Padanan SPM (Wajib)',
          content: `
            <p>
              Radioisotop ialah isotop yang tidak stabil dan memancarkan sinaran radioaktif (alfa, beta, atau gama). Berikut ialah jadual padanan fungsi radioisotop yang kerap keluar dalam Kertas 1 dan Kertas 2:
            </p>
          `,
          comparisonTable: {
            headers: ['Radioisotop', 'Bidang', 'Kegunaan Khusus SPM'],
            rows: [
              [
                '<b>Kobalt-60 (Co-60)</b>',
                'Perubatan',
                'Memancarkan sinar gama untuk membunuh sel kanser dalam radioterapi dan mensterilkan alat pembedahan.'
              ],
              [
                '<b>Iodin-131 (I-131)</b>',
                'Perubatan',
                'Merawat kanser tiroid dan mengesan kerosakan fungsi kelenjar tiroid.'
              ],
              [
                '<b>Karbon-14 (C-14)</b>',
                'Arkeologi',
                'Pentarikhan radiokarbon untuk menganggarkan usia artifak purba dan fosil sejarah.'
              ],
              [
                '<b>Natrium-24 (Na-24)</b>',
                'Industri',
                'Disuntik ke dalam paip bawah tanah untuk mengesan lokasi kebocoran paip air atau gas.'
              ],
              [
                '<b>Fosforus-32 (P-32)</b>',
                'Pertanian',
                'Menjejak kadar penyerapan baja fosfat oleh akar tanaman.'
              ],
              [
                '<b>Uranium-235 (U-235)</b>',
                'Tenaga Nuklear',
                'Bahan api bagi reaktor nuklear untuk menjana tenaga elektrik.'
              ],
              [
                '<b>Plumbum-210 (Pb-210)</b>',
                'Geologi / Alam Sekitar',
                'Menentukan usia lapisan pasir dan kadar enapan lumpur.'
              ]
            ]
          }
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menyatakan bahawa isotop mempunyai sifat kimia yang berbeza.',
          correction: 'Isotop mempunyai sifat kimia yang sama kerana bilangan elektron valensnya adalah sama.',
          why: 'Tindak balas kimia hanya dipengaruhi oleh elektron valens pada petala terluar, bukan oleh neutron di dalam nukleus.',
          spmTip: 'Dalam soalan esei, terangkan: "Sifat kimia sama kerana susunan elektron dan bilangan elektron valens adalah serupa".'
        },
        {
          mistake: 'Mengelirukan kegunaan Kobalt-60 dengan Iodin-131.',
          correction: 'Kobalt-60 digunakan untuk rawatan kanser am / pensterilan alat perubatan; Iodin-131 dikhaskan untuk rawatan kelenjar tiroid.',
          why: 'Kelenjar tiroid menyerap iodin secara semulajadi di dalam badan manusia.',
          spmTip: 'Ingat kata kunci: Iodin = Tiroid; Kobalt = Sinar Gama Kanser.'
        }
      ],
      flashcards: [
        {
          id: 't4-b2-s4-fc1',
          front: 'Apakah maksud "Isotop" mengikut skema pemarkahan SPM?',
          back: 'Atom-atom bagi unsur yang sama yang mempunyai bilangan proton yang sama tetapi bilangan neutron yang berbeza.'
        },
        {
          id: 't4-b2-s4-fc2',
          front: 'Mengapakah isotop-isotop bagi sesuatu unsur menunjukkan sifat kimia yang sama?',
          back: 'Kerana mempunyai bilangan proton yang sama, menghasilkan bilangan elektron valens yang sama dalam atomnya.'
        },
        {
          id: 't4-b2-s4-fc3',
          front: 'Nyatakan kegunaan Kobalt-60 dalam bidang perubatan.',
          back: 'Digunakan dalam radioterapi untuk membunuh sel kanser dan mensterilkan peralatan perubatan menggunakan sinar gama.'
        },
        {
          id: 't4-b2-s4-fc4',
          front: 'Apakah isotop yang digunakan dalam bidang arkeologi untuk menentukan usia artifak purba?',
          back: 'Karbon-14 (C-14) melalui teknik pentarikhan radiokarbon.'
        },
        {
          id: 't4-b2-s4-fc5',
          front: 'Bagaimanakah Natrium-24 digunakan dalam sektor industri kejuruteraan?',
          back: 'Sebagai penyurih radioaktif untuk mengesan lokasi kebocoran paip di bawah tanah.'
        }
      ],
      quiz: [
        {
          id: 't4-b2-s4-q1',
          question: 'Antara pernyataan berikut, yang manakah mentakrifkan maksud isotop dengan betul?',
          options: [
            'Atom-atom unsur berbeza yang mempunyai nombor nukleon yang sama',
            'Atom-atom bagi unsur yang sama dengan bilangan proton sama tetapi bilangan neutron berbeza',
            'Molekul-molekul yang mempunyai formula molekul sama tetapi formula struktur berbeza',
            'Ion-ion yang mempunyai bilangan elektron yang sama dalam petala terluar'
          ],
          answerIndex: 1,
          explanation: 'Isotop ialah atom-atom bagi unsur yang sama yang mempunyai bilangan proton sama tetapi bilangan neutron (atau nombor nukleon) yang berbeza.',
          level: 'Rendah',
          spmReference: 'SPM 2021 Kertas 1'
        },
        {
          id: 't4-b2-s4-q2',
          question: 'Mengapakah isotop Karbon-12 dan Karbon-14 mempunyai sifat kimia yang sama tetapi sifat fizikal yang berbeza?',
          options: [
            'Mempunyai bilangan neutron sama tetapi bilangan elektron berbeza',
            'Mempunyai susunan elektron valens yang sama tetapi jisim atom yang berbeza',
            'Mempunyai nombor nukleon sama tetapi ketumpatan berbeza',
            'Mempunyai takat lebur sama tetapi jejari atom berbeza'
          ],
          answerIndex: 1,
          explanation: 'Sifat kimia ditentukan oleh elektron valens (yang sama bagi kedua-dua isotop), manakala sifat fizikal dipengaruhi oleh perbezaan jisim atom (bilangan neutron berbeza).',
          level: 'Sederhana'
        },
        {
          id: 't4-b2-s4-q3',
          question: 'Unsur Galium terdiri daripada dua isotop semula jadi iaitu ⁶⁹Ga (kelimpahan 60%) dan ⁷¹Ga (kelimpahan 40%). Berapakah jisim atom relatif (Ar) bagi Galium?',
          options: [
            '69.8',
            '70.0',
            '70.2',
            '70.8'
          ],
          answerIndex: 0,
          explanation: 'Ar = [ (60 × 69) + (40 × 71) ] ÷ 100 = [ 4140 + 2840 ] ÷ 100 = 6980 ÷ 100 = 69.8.',
          level: 'Sederhana',
          spmReference: 'SPM 2022 Kertas 1'
        },
        {
          id: 't4-b2-s4-q4',
          question: 'Seorang pesakit disyaki menghidap masalah kelenjar tiroid yang tidak berfungsi dengan baik. Radioisotop manakah yang digunakan untuk mengesan dan merawat penyakit tersebut?',
          options: [
            'Kobalt-60',
            'Iodin-131',
            'Natrium-24',
            'Fosforus-32'
          ],
          answerIndex: 1,
          explanation: 'Iodin-131 digunakan secara khusus dalam bidang perubatan nuklear untuk rawatan dan pengesanan masalah kelenjar tiroid.',
          level: 'Rendah'
        },
        {
          id: 't4-b2-s4-q5',
          question: 'Kumpulan penyelidik arkeologi menemui rangka kayu purba di tapak penggalian gua. Kaedah apakah yang digunakan oleh penyelidik untuk menentukan usia artifak kayu tersebut?',
          options: [
            'Mengira kepekatan Kobalt-60 dalam selulosa kayu',
            'Pentarikhan radiokarbon menggunakan nisbah isotop Karbon-14',
            'Pemeriksaan sinar-X menggunakan Plumbum-210',
            'Pengukuran kadar pereputan Uranium-235'
          ],
          answerIndex: 1,
          explanation: 'Pentarikhan karbon (carbon dating) menggunakan isotop radioaktif Karbon-14 (C-14) ialah kaedah piawai menentukan usia bahan organik purba.',
          level: 'Sederhana',
          spmReference: 'Percubaan SPM SBP 2023'
        },
        {
          id: 't4-b2-s4-q6',
          question: 'Seorang jurutera mendapati paip kumbahan bawah tanah yang tertanam sedalam 3 meter mengalami kebocoran yang sukar dikesan secara visual. Apakah langkah yang paling selamat dan cekap untuk mengesan lokasi kebocoran tersebut?',
          options: [
            'Menggali keseluruhan laluan paip menggunakan jentolak berat',
            'Menyuntik sejumlah kecil Natrium-24 ke dalam aliran cecair paip dan mengesan keamatan sinaran di atas tanah menggunakan pembilang Geiger-Muller',
            'Memasukkan gas klorin berkepekatan tinggi ke dalam paip untuk melihat bau gas keluar',
            'Mengalirkan asid sulfurik pekat untuk melarutkan tanah di sekitar paip'
          ],
          answerIndex: 1,
          explanation: 'Natrium-24 (Na-24) memancarkan sinaran gama yang berpenembusan tinggi dengan separuh hayat yang pendek (15 jam), selamat digunakan sebagai penyurih untuk mengesan kebocoran paip bawah tanah.',
          level: 'Tinggi (KBAT)',
          spmReference: 'Soalan KBAT Aplikasi Radioisotop Kertas 2'
        }
      ]
    }
  ]
};
