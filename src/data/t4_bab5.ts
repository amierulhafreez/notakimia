import { Chapter } from '../types/nota';

export const T4_BAB5: Chapter = {
  id: 't4-b5',
  form: 'T4',
  chapterNumber: 5,
  title: 'Ikatan Kimia',
  theme: 'Interaksi Antara Jirim',
  durationMinutes: 120,
  description:
    'Meneroka asas kestabilan duplet dan oktet, pembentukan ikatan ion melalui pemindahan elektron, ikatan kovalen melalui perkongsian elektron, ikatan hidrogen, ikatan datif, ikatan logam, serta perbandingan sifat fizik sebatian ion dan kovalen.',
  iconName: 'Share2',
  subtopicCount: 7,
  subtopics: [
    // -------------------------------------------------------------
    // SUBTOPIK 5.1 ASAS PEMBENTUKAN SEBATIAN
    // -------------------------------------------------------------
    {
      id: 't4-b5-s1',
      code: '5.1',
      title: 'Asas Pembentukan Sebatian',
      learningStandard: 'SP 5.1.1',
      durationMinutes: 15,
      tldr: [
        'Unsur Kumpulan 18 (gas nadir) wujud secara monoatom dan sangat stabil kerana mempunyai susunan elektron duplet (helium: 2) atau oktet (neon, argon: 8) yang penuh pada petala terluar.',
        'Atom unsur lain TIDAK stabil secara bersendirian kerana petala valensnya belum mencapai susunan duplet atau oktet.',
        'Untuk mencapai susunan elektron duplet atau oktet yang stabil, atom unsur bertindak balas membentuk ikatan kimia melalui dua kaedah utama:',
        '1. Pemindahan elektron: Atom logam menderma elektron dan atom bukan logam menerima elektron (membentuk Ikatan Ion).',
        '2. Perkongsian elektron: Atom-atom bukan logam berkongsi elektron valens sesama sendiri (membentuk Ikatan Kovalen).'
      ],
      concepts: [
        {
          id: 't4-b5-s1-c1',
          title: 'Kestabilan Gas Nadir sebagai Rujukan Kimia',
          badge: 'Prinsip Kestabilan',
          content: `
            <p>
              Mengapakah gas nadir seperti Helium (He), Neon (Ne), dan Argon (Ar) tidak bergabung dengan unsur lain dalam keadaan normal?
            </p>
            <ul class="list-disc pl-5 space-y-1.5 text-xs text-slate-700 mt-2">
              <li><b>Susunan Elektron Duplet:</b> Atom Helium mempunyai 2 elektron pada petala pertamanya, yang merupakan kapasiti maksimum petala tersebut. Keadaan ini dinamakan <i>susunan duplet yang stabil</i>.</li>
              <li><b>Susunan Elektron Oktet:</b> Atom Neon (2.8), Argon (2.8.8), dan gas nadir lain mempunyai 8 elektron valens pada petala terluarnya. Keadaan ini dinamakan <i>susunan oktet yang stabil</i>.</li>
              <li>Oleh kerana petala valens telah penuh terisi, atom-atom gas nadir <b>tidak perlu menderma, menerima, atau berkongsi elektron</b> dengan atom lain. Ini menyebabkan gas nadir bersifat <b>lengai</b> secara kimia dan wujud sebagai gas <b>monoatom</b>.</li>
            </ul>
          `
        },
        {
          id: 't4-b5-s1-c2',
          title: 'Dua Kaedah Mencapai Susunan Elektron Stabil',
          badge: 'Fokus Peperiksaan',
          content: `
            <p>
              Semua atom selain Kumpulan 18 akan bergabung sesama sendiri melalui pembentukan <b>ikatan kimia</b> untuk mencapai kestabilan susunan elektron duplet atau oktet seperti gas nadir:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
              <div class="p-3 rounded-2xl bg-sky-50 border border-sky-200">
                <span class="text-xs font-black text-sky-800 uppercase tracking-wider block mb-1">1. Pemindahan Elektron (Ikatan Ion)</span>
                <p class="text-xs text-slate-700 leading-relaxed">
                  Berlaku antara <b>atom logam</b> dengan <b>atom bukan logam</b>. Atom logam menderma elektron valens membentuk <b>kation</b> (+), manakala atom bukan logam menerima elektron membentuk <b>anion</b> (-).
                </p>
              </div>
              <div class="p-3 rounded-2xl bg-teal-50 border border-teal-200">
                <span class="text-xs font-black text-teal-800 uppercase tracking-wider block mb-1">2. Perkongsian Elektron (Ikatan Kovalen)</span>
                <p class="text-xs text-slate-700 leading-relaxed">
                  Berlaku antara <b>atom bukan logam</b> sesama sendiri. Kedua-dua atom menyumbang elektron valens untuk dikongsi bersama bagi mencapai susunan elektron oktet atau duplet.
                </p>
              </div>
            </div>
            <p class="text-xs text-slate-600 italic">
              *Hanya elektron pada petala terluar (elektron valens) sahaja yang terlibat dalam pembentukan ikatan kimia; elektron pada petala dalam tidak mengalami perubahan.
            </p>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menyatakan semua gas nadir mempunyai susunan elektron oktet.',
          correction: 'Helium mempunyai susunan elektron DUPLET (2 elektron), manakala gas nadir lain mempunyai susunan OKTET (8 elektron).',
          why: 'Petala pertama hanya memuatkan maksimum 2 elektron, maka 2 elektron pada helium sudah mencapai kestabilan maksimum.',
          spmTip: 'Tulis secara spesifik: "Helium mempunyai susunan elektron duplet yang stabil".'
        },
        {
          mistake: 'Menganggap elektron pada petala dalam juga terlibat dalam pembentukan ikatan kimia.',
          correction: 'HANYA elektron valens pada petala terluar yang dipindahkan atau dikongsi dalam ikatan kimia.',
          why: 'Elektron petala dalam terikat kuat pada nukleus dan tidak terlibat dalam tindak balas kimia lazim.',
          spmTip: 'Sentiasa fokus kepada bilangan elektron valens apabila menerangkan ikatan.'
        }
      ],
      flashcards: [
        {
      id: 't4-b5-fc-1',
      front: 'Apakah maksud susunan elektron duplet dan oktet yang stabil?',
      back: 'Duplet: 2 elektron valens pada petala pertama (cth Helium). Oktet: 8 elektron valens pada petala terluar (cth Neon, Argon). Petala terluar telah penuh terisi elektron.'
    },
        {
      id: 't4-b5-fc-2',
      front: 'Mengapakah unsur Kumpulan 18 tidak membentuk ikatan kimia dalam keadaan normal?',
      back: 'Kerana telah mencapai susunan elektron duplet atau oktet yang stabil, maka atom tidak perlu menderma, menerima, atau berkongsi elektron.'
    },
        {
      id: 't4-b5-fc-3',
      front: 'Bagaimanakah atom bukan logam mencapai kestabilan susunan elektron apabila bertindak balas sesama bukan logam?',
      back: 'Melalui perkongsian elektron valens untuk membentuk ikatan kovalen.'
    },
        {
      id: 't4-b5-fc-4',
      front: 'Bagaimanakah atom logam mencapai susunan elektron oktet stabil apabila bertindak balas dengan bukan logam?',
      back: 'Atom logam melepaskan / menderma elektron valensnya kepada atom bukan logam untuk membentuk ion positif (kation).'
    },
        {
      id: 't4-b5-fc-5',
      front: 'Elektron pada petala manakah yang terlibat dalam pembentukan sebarang ikatan kimia?',
      back: 'Hanya elektron valens pada petala terluar atom sahaja.'
    }
      ],
      quiz: [
        {
      id: 't4-b5-q1',
      question: 'Antara gas nadir berikut, yang manakah mencapai kestabilan melalui susunan elektron duplet?',
      options: ['Helium', 'Neon', 'Argon', 'Kripton'],
      answerIndex: 0,
      explanation: 'Helium mempunyai nombor proton 2 dan petala pertamanya penuh terisi dengan 2 elektron, dikenali sebagai susunan elektron duplet yang stabil.',
      level: 'Rendah'
    },
        {
      id: 't4-b5-q2',
      question: 'Atom unsur X mempunyai susunan elektron 2.8.6. Bagaimanakah atom X mencapai susunan elektron oktet yang stabil?',
      options: [
        'Menderma 6 elektron valens',
        'Menerima 2 elektron atau berkongsi 2 pasang elektron',
        'Menderma 2 elektron kepada atom lain',
        'Menerima 6 elektron ke dalam petala valens'
      ],
      answerIndex: 1,
      explanation: 'Atom X (2.8.6) memerlukan 2 elektron lagi untuk mencapai susunan oktet 2.8.8, sama ada dengan menerima 2 elektron (membentuk ion X²⁻) atau berkongsi elektron.',
      level: 'Rendah'
    },
        {
      id: 't4-b5-q3',
      question: 'Apakah asas utama yang mendorong atom-atom unsur membentuk ikatan kimia?',
      options: [
        'Untuk memaksimumkan bilangan proton dalam nukleus',
        'Untuk mencapai susunan elektron duplet atau oktet yang stabil seperti gas nadir',
        'Untuk menghasilkan tenaga kinetik yang tinggi',
        'Untuk mengurangkan jisim atom relatif'
      ],
      answerIndex: 1,
      explanation: 'Dorongan utama pembentukan sebatian adalah untuk mencapai konfigurasi elektron yang stabil (duplet atau oktet) dengan tenaga keupayaan yang lebih rendah.',
      level: 'Sederhana'
    },
        {
      id: 't4-b5-q4',
      question: 'Kombinasi atom manakah yang akan membentuk ikatan kimia melalui perkongsian elektron?',
      options: [
        'Natrium dan klorin',
        'Magnesium dan oksigen',
        'Karbon dan oksigen',
        'Kalium dan bromin'
      ],
      answerIndex: 2,
      explanation: 'Karbon dan oksigen kedua-duanya adalah unsur bukan logam, maka kedua-duanya berkongsi elektron membentuk ikatan kovalen (CO₂).',
      level: 'Sederhana'
    },
        {
      id: 't4-b5-q5',
      question: 'Unsur M berada dalam Kumpulan 2 manakala unsur N berada dalam Kumpulan 17. Apakah kaedah pembentukan sebatian antara M dan N?',
      options: [
        'Atom M menderma 2 elektron kepada dua atom N',
        'Atom M menerima 1 elektron daripada atom N',
        'Atom M berkongsi 2 pasang elektron dengan atom N',
        'Atom N menderma elektron kepada atom M'
      ],
      answerIndex: 0,
      explanation: 'M (logam Kumpulan 2) menderma 2 elektron valens (M → M²⁺ + 2e⁻). Setiap atom N (bukan logam K17) menerima 1 elektron (N + e⁻ → N⁻), membentuk sebatian MN₂.',
      level: 'Sederhana'
    },
        {
      id: 't4-b5-q6',
      question: 'Seorang murid mendakwa bahawa gas argon boleh membentuk sebatian ArCl₂ di bawah tekanan tinggi. Adakah dakwaan ini benar dan apakah sebab saintifiknya?',
      options: [
        'Benar, kerana argon mempunyai 8 elektron valens yang boleh berkongsi',
        'Palsu, kerana argon mempunyai susunan elektron oktet stabil dan tidak mempunyai kecenderungan menderma atau berkongsi elektron',
        'Benar, kerana klorin ialah halogen yang sangat reaktif',
        'Palsu, kerana gas klorin hanya bertindak balas dengan logam alkali'
      ],
      answerIndex: 1,
      explanation: 'Argon telah mencapai susunan oktet (2.8.8) yang stabil dengan petala valens penuh, menjadikannya lengai secara kimia.',
      level: 'Tinggi (KBAT)'
    }
      ]
    },

    // -------------------------------------------------------------
    // SUBTOPIK 5.2 IKATAN ION
    // -------------------------------------------------------------
    {
      id: 't4-b5-s2',
      code: '5.2',
      title: 'Ikatan Ion',
      learningStandard: 'SP 5.2.1',
      durationMinutes: 25,
      tldr: [
        'Ikatan ion terbentuk melalui pemindahan elektron antara atom logam dan atom bukan logam.',
        'Atom logam melepaskan elektron valens membentuk ion positif (kation) untuk mencapai susunan elektron oktet/duplet yang stabil.',
        'Atom bukan logam menerima elektron ke dalam petala valens membentuk ion negatif (anion) untuk mencapai susunan elektron oktet yang stabil.',
        'Kation dan anion yang bertentangan cas ini tertarik antara satu sama lain oleh daya tarikan elektrostatik yang kuat, membentuk sebatian ionik.'
      ],
      simulationRef: {
        id: 'ikatan-ion',
        title: 'Makmal Maya Pembentukan Ikatan Ion',
        description: 'Simulasikan pemindahan elektron antara kation logam dan anion bukan logam serta penulisan formula sebatian ionik.',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=ikatan-ion',
        previewBadge: 'Simulasi Bab 5.2'
      },
      concepts: [
        {
          id: 't4-b5-s2-c1',
          title: 'Mekanisme Pemindahan Elektron & Pembentukan Kation/Anion',
          badge: 'Konsep Teras SPM',
          content: `
            <p>
              Ikatan ion terhasil daripada <b>daya tarikan elektrostatik yang kuat</b> antara ion bercas positif (kation) dengan ion bercas negatif (anion).
            </p>
            <div class="space-y-3 mt-3">
              <div class="p-3 rounded-2xl bg-white border border-slate-200">
                <span class="text-xs font-bold text-slate-800">1. Pembentukan Ion Positif (Kation):</span>
                <p class="text-xs text-slate-600 mt-1">
                  Atom logam daripada Kumpulan 1, 2, dan 13 mempunyai bilangan elektron valens yang sedikit (1, 2, atau 3). Adalah lebih mudah dari segi tenaga untuk atom logam <b>menderma / melepaskan</b> elektron valens tersebut:
                </p>
                <div class="p-2 rounded-xl bg-slate-50 font-mono text-xs text-slate-800 border border-slate-200 mt-1.5">
                  Na (2.8.1) → Na⁺ (2.8) + e⁻<br/>
                  Mg (2.8.2) → Mg²⁺ (2.8) + 2e⁻<br/>
                  Al (2.8.3) → Al³⁺ (2.8) + 3e⁻
                </div>
              </div>

              <div class="p-3 rounded-2xl bg-white border border-slate-200">
                <span class="text-xs font-bold text-slate-800">2. Pembentukan Ion Negatif (Anion):</span>
                <p class="text-xs text-slate-600 mt-1">
                  Atom bukan logam daripada Kumpulan 15, 16, dan 17 mempunyai bilangan elektron valens yang banyak (5, 6, atau 7). Atom bukan logam <b>menerima</b> elektron ke dalam petala valensnya:
                </p>
                <div class="p-2 rounded-xl bg-slate-50 font-mono text-xs text-slate-800 border border-slate-200 mt-1.5">
                  Cl (2.8.7) + e⁻ → Cl⁻ (2.8.8)<br/>
                  O (2.6) + 2e⁻ → O²⁻ (2.8)<br/>
                  N (2.5) + 3e⁻ → N³⁻ (2.8)
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't4-b5-s2-c2',
          title: 'Contoh Lengkap Pembentukan Sebatian Ionik (NaCl, MgO, Na₂O)',
          badge: 'Soalan Lazim Esei',
          content: `
            <div class="space-y-3">
              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 class="text-xs font-bold text-slate-900">A. Pembentukan Natrium Klorida (NaCl)</h4>
                <p class="text-xs text-slate-700 mt-1 leading-relaxed">
                  1. Susunan elektron atom natrium, Na ialah 2.8.1 manakala atom klorin, Cl ialah 2.8.7.<br/>
                  2. Satu atom Na melepaskan 1 elektron valens untuk membentuk ion natrium, Na⁺ dengan susunan elektron 2.8 (oktet stabil).<br/>
                  3. Satu atom Cl menerima 1 elektron tersebut untuk membentuk ion klorida, Cl⁻ dengan susunan elektron 2.8.8 (oktet stabil).<br/>
                  4. Ion Na⁺ dan ion Cl⁻ ditarik bersama oleh daya tarikan elektrostatik yang kuat membentuk ikatan ion dengan formula <b>NaCl</b>.
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 class="text-xs font-bold text-slate-900">B. Pembentukan Magnesium Oksida (MgO)</h4>
                <p class="text-xs text-slate-700 mt-1 leading-relaxed">
                  1. Susunan elektron atom magnesium, Mg ialah 2.8.2 manakala atom oksigen, O ialah 2.6.<br/>
                  2. Satu atom Mg menderma 2 elektron valens membentuk ion magnesium, Mg²⁺ (2.8).<br/>
                  3. Satu atom O menerima 2 elektron tersebut membentuk ion oksida, O²⁻ (2.8).<br/>
                  4. Daya tarikan elektrostatik kuat menarik ion Mg²⁺ dan O²⁻ membentuk sebatian <b>MgO</b>.
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 class="text-xs font-bold text-slate-900">C. Pembentukan Natrium Oksida (Na₂O) - Nisbah 2:1</h4>
                <p class="text-xs text-slate-700 mt-1 leading-relaxed">
                  1. Setiap atom Na (2.8.1) hanya boleh menderma 1 elektron, manakala atom O (2.6) memerlukan 2 elektron untuk mencapai susunan oktet.<br/>
                  2. Oleh itu, <b>dua atom natrium</b> diperlukan untuk menderma sejumlah 2 elektron valens kepada <b>satu atom oksigen</b>.<br/>
                  3. Dua ion Na⁺ dan satu ion O²⁻ tertarik oleh daya tarikan elektrostatik membentuk sebatian <b>Na₂O</b>.
                </p>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Melukis elektron berkongsi (bertindih) antara kation dan anion dalam gambar rajah ikatan ion.',
          correction: 'Ikatan ion TIDAK melibatkan perkongsian elektron; petala tidak bertindih, sebaliknya ion digambarkan berasingan dalam kurungan siku dengan casnya masing-masing.',
          why: 'Elektron telah dipindahkan sepenuhnya daripada atom logam kepada bukan logam, menghasilkan zarah bercas bebas.',
          spmTip: 'Jangan sekali-kali melukis bulatan bertindih bagi ikatan ion!'
        },
        {
          mistake: 'Lupa menulis cas atau tersilap meletakkan tanda cas (cth menulis Na1+ bukannya Na⁺, atau Mg+2 bukannya Mg²⁺).',
          correction: 'Format penulisan cas piawai SPM ialah nombor diikuti tanda cas di bahagian atas (superscript), cth: Mg²⁺, O²⁻, Al³⁺.',
          why: 'Tatatanda kimia antarabangsa IUPAC menetapkan magnitud dahulu diikuti cas positif atau negatif.',
          spmTip: 'Untuk cas 1, tulis Na⁺ atau Cl⁻ sahaja (jangan tulis angka 1).'
        }
      ],
      flashcards: [
        {
      id: 't4-b5-fc-6',
      front: 'Apakah jenis daya yang memegang ion-ion bersama dalam sebatian ionik?',
      back: 'Daya tarikan elektrostatik yang kuat antara ion positif (kation) dan ion negatif (anion).'
    },
        {
      id: 't4-b5-fc-7',
      front: 'Tuliskan persamaan setengah bagi pembentukan ion magnesium daripada atom magnesium (susunan elektron 2.8.2).',
      back: 'Mg → Mg²⁺ + 2e⁻ (menderma 2 elektron valens mencapai susunan oktet 2.8).'
    },
        {
      id: 't4-b5-fc-8',
      front: 'Berapakah nisbah atom natrium kepada atom oksigen dalam pembentukan sebatian natrium oksida, Na₂O?',
      back: 'Nisbah 2:1 (Dua atom Na menderma 1 elektron masing-masing kepada 1 atom oksigen yang memerlukan 2 elektron).'
    },
        {
      id: 't4-b5-fc-9',
      front: 'Apakah perubahan susunan elektron apabila atom klorin, Cl (2.8.7) membentuk ion klorida, Cl⁻?',
      back: 'Menerima 1 elektron menjadi 2.8.8 (mencapai susunan elektron oktet yang stabil).'
    },
        {
      id: 't4-b5-fc-10',
      front: 'Bagaimanakah rajah susunan elektron bagi ion dilukis mengikut piawaian SPM?',
      back: 'Dilukis di dalam kurungan siku [ ] dengan cas ion ditulis di bahagian luar sudut kanan atas, contohnya [Na]⁺ dan [Cl]⁻.'
    }
      ],
      quiz: [
        {
      id: 't4-b5-q7',
      question: 'Ikatan ion terbentuk daripada daya tarikan antara:',
      options: [
        'Molekul neutral dengan molekul air',
        'Proton dalam nukleus dengan elektron bebas',
        'Ion positif (kation) dan ion negatif (anion)',
        'Dua atom bukan logam yang berkongsi elektron'
      ],
      answerIndex: 2,
      explanation: 'Ikatan ion terhasil daripada daya tarikan elektrostatik yang kuat antara ion bertentangan cas (kation dan anion).',
      level: 'Rendah'
    },
        {
      id: 't4-b5-q8',
      question: 'Atom aluminium mempunyai nombor proton 13. Apakah formula dan susunan elektron bagi ion aluminium yang terbentuk?',
      options: ['Al⁺ (2.8.2)', 'Al³⁺ (2.8)', 'Al³⁻ (2.8.8)', 'Al²⁺ (2.8.1)'],
      answerIndex: 1,
      explanation: 'Atom Al (2.8.3) melepaskan 3 elektron valens untuk membentuk kation Al³⁺ dengan susunan elektron oktet stabil 2.8.',
      level: 'Rendah'
    },
        {
      id: 't4-b5-q9',
      question: 'Antara pasangan unsur berikut, yang manakah akan membentuk sebatian ionik dengan formula X₂Y?',
      options: [
        'Kalsium (K2) dan Klorin (K17)',
        'Natrium (K1) dan Oksigen (K16)',
        'Aluminium (K13) dan Oksigen (K16)',
        'Magnesium (K2) dan Nitrogen (K15)'
      ],
      answerIndex: 1,
      explanation: 'Natrium menderma 1 elektron (Na⁺) manakala oksigen menerima 2 elektron (O²⁻). Formula sebatian ionik yang terbentuk ialah Na₂O (nisbah 2:1).',
      level: 'Sederhana'
    },
        {
      id: 't4-b5-q10',
      question: 'Persamaan setengah berikut mewakili pembentukan satu sebatian: Mg → Mg²⁺ + 2e⁻ dan O + 2e⁻ → O²⁻. Apakah nama daya yang mengikat kedua-dua ion ini?',
      options: [
        'Daya tarikan van der Waals',
        'Daya elektrostatik kuat',
        'Ikatan kovalen ganda dua',
        'Ikatan hidrogen intermolekul'
      ],
      answerIndex: 1,
      explanation: 'Daya yang mengikat ion Mg²⁺ dan O²⁻ bersama ialah daya tarikan elektrostatik yang sangat kuat.',
      level: 'Sederhana'
    },
        {
      id: 't4-b5-q11',
      question: 'Apakah persamaan setengah bagi pembentukan ion nitrida daripada atom nitrogen (nombor proton 7)?',
      options: [
        'N → N³⁺ + 3e⁻',
        'N + 3e⁻ → N³⁻',
        'N + 5e⁻ → N⁵⁻',
        'N → N⁵⁺ + 5e⁻'
      ],
      answerIndex: 1,
      explanation: 'Atom nitrogen mempunyai susunan elektron 2.5. Ia menerima 3 elektron untuk mencapai susunan oktet 2.8: N + 3e⁻ → N³⁻.',
      level: 'Sederhana'
    },
        {
      id: 't4-b5-q12',
      question: 'Unsur P mempunyai nombor proton 12 dan unsur Q mempunyai nombor proton 9. Ramalkan formula sebatian dan terangkan pemindahan elektron yang berlaku.',
      options: [
        'PQ, satu elektron dipindahkan daripada P kepada Q',
        'PQ₂, satu atom P menderma 2 elektron valens kepada dua atom Q',
        'P₂Q, dua atom P menderma elektron kepada satu atom Q',
        'P₂Q₃, perkongsian 4 elektron antara P dan Q'
      ],
      answerIndex: 1,
      explanation: 'P (Mg, 2.8.2) menderma 2 elektron membentuk P²⁺. Q (F, 2.7) memerlukan 1 elektron membentuk Q⁻. Oleh itu 1 atom P bertindak balas dengan 2 atom Q membentuk PQ₂.',
      level: 'Tinggi (KBAT)'
    }
      ]
    },

    // -------------------------------------------------------------
    // SUBTOPIK 5.3 IKATAN KOVALEN
    // -------------------------------------------------------------
    {
      id: 't4-b5-s3',
      code: '5.3',
      title: 'Ikatan Kovalen',
      learningStandard: 'SP 5.3.1, SP 5.3.2',
      durationMinutes: 30,
      tldr: [
        'Ikatan kovalen terbentuk melalui perkongsian elektron antara atom-atom bukan logam untuk mencapai susunan elektron oktet atau duplet yang stabil.',
        'Tiga jenis ikatan kovalen utama: Ikatan tunggal (1 pasang elektron dikongsi), Ikatan ganda dua (2 pasang elektron dikongsi), dan Ikatan ganda tiga (3 pasang elektron dikongsi).',
        'Struktur Lewis (rajah titik-pangkah) menunjukkan elektron valens sahaja, dengan elektron yang terikat dan pasangan elektron bebas (lone pair).',
        'Molekul kovalen dipegang bersama oleh ikatan kovalen yang kuat di dalam molekul (daya intramolekul), tetapi antara molekul yang berasingan ditarik oleh daya van der Waals yang lemah (daya intermolekul).'
      ],
      simulationRef: {
        id: 'ikatan-kovalen',
        title: 'Makmal Maya Pembentukan Ikatan Kovalen',
        description: 'Kongsi elektron valens antara bukan logam untuk membina ikatan tunggal, ganda dua, ganda tiga dan lukis Struktur Lewis secara interaktif.',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=ikatan-kovalen',
        previewBadge: 'Simulasi Bab 5.3'
      },
      concepts: [
        {
          id: 't4-b5-s3-c1',
          title: 'Jenis-Jenis Ikatan Kovalen (Tunggal, Ganda Dua, Ganda Tiga)',
          badge: 'Klasifikasi Ikatan',
          content: `
            <p>
              Ikatan kovalen dikelaskan berdasarkan <b>bilangan pasangan elektron</b> yang dikongsi antara dua atom bukan logam:
            </p>
            <div class="space-y-2.5 mt-3">
              <div class="p-3 rounded-2xl bg-white border border-slate-200">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-900">1. Ikatan Kovalen Tunggal (Kongsi 1 Pasang / 2 Elektron)</span>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-100 text-sky-800">A — B</span>
                </div>
                <p class="text-xs text-slate-600 mt-1">
                  Setiap atom menyumbang <b>1 elektron</b> valens untuk dikongsi bersama.
                </p>
                <ul class="list-disc pl-5 text-xs text-slate-700 mt-1 space-y-0.5">
                  <li>Gas hidrogen, H₂ (H—H): setiap atom H berkongsi 1 elektron untuk mencapai susunan duplet stabil (2).</li>
                  <li>Hidrogen klorida, HCl (H—Cl): atom H capai duplet, atom Cl capai oktet.</li>
                  <li>Molekul air, H₂O (H—O—H): atom oksigen membentuk dua ikatan tunggal dengan dua atom H.</li>
                  <li>Metana, CH₄: atom karbon membentuk 4 ikatan tunggal dengan 4 atom hidrogen.</li>
                </ul>
              </div>

              <div class="p-3 rounded-2xl bg-white border border-slate-200">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-900">2. Ikatan Kovalen Ganda Dua (Kongsi 2 Pasang / 4 Elektron)</span>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-100 text-teal-800">A = B</span>
                </div>
                <p class="text-xs text-slate-600 mt-1">
                  Setiap atom menyumbang <b>2 elektron</b> valens untuk dikongsi bersama (jumlah 4 elektron di kawasan pertindihan petala).
                </p>
                <ul class="list-disc pl-5 text-xs text-slate-700 mt-1 space-y-0.5">
                  <li>Gas oksigen, O₂ (O=O): atom oksigen (2.6) menyumbang 2 elektron masing-masing untuk mencapai susunan oktet (2.8).</li>
                  <li>Karbon dioksida, CO₂ (O=C=O): atom karbon berkongsi 2 pasang elektron dengan setiap atom oksigen.</li>
                </ul>
              </div>

              <div class="p-3 rounded-2xl bg-white border border-slate-200">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-900">3. Ikatan Kovalen Ganda Tiga (Kongsi 3 Pasang / 6 Elektron)</span>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">A ≡ B</span>
                </div>
                <p class="text-xs text-slate-600 mt-1">
                  Setiap atom menyumbang <b>3 elektron</b> valens untuk dikongsi bersama (jumlah 6 elektron di rantau pertindihan).
                </p>
                <ul class="list-disc pl-5 text-xs text-slate-700 mt-1 space-y-0.5">
                  <li>Gas nitrogen, N₂ (N≡N): atom nitrogen (2.5) menyumbang 3 elektron valens masing-masing untuk mencapai susunan elektron oktet (2.8).</li>
                </ul>
              </div>
            </div>
          `
        },
        {
          id: 't4-b5-s3-c2',
          title: 'Struktur Lewis dan Pasangan Elektron Bebas (Lone Pair)',
          badge: 'Kemahiran Melukis SPM',
          content: `
            <p>
              <b>Struktur Lewis</b> ialah gambar rajah yang menunjukkan ikatan kovalen menggunakan simbol unsur, garisan untuk mewakili pasangan elektron terikat, dan titik/pangkah untuk mewakili elektron valens bebas:
            </p>
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 mt-2 space-y-2">
              <div class="text-xs text-slate-700">
                <b>Pasangan Elektron Terikat:</b> Pasangan elektron valens yang dikongsi antara atom untuk membentuk ikatan kimia.
              </div>
              <div class="text-xs text-slate-700">
                <b>Pasangan Elektron Bebas (Lone Pair):</b> Pasangan elektron valens yang TIDAK terlibat dalam pembentukan ikatan kovalen.
              </div>
              <div class="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-800">
                Molekul Air, H₂O:<br/>
                • 2 pasangan elektron terikat (2 ikatan tunggal O—H)<br/>
                • 2 pasangan elektron bebas pada atom Oksigen<br/><br/>
                Molekul Ammonia, NH₃:<br/>
                • 3 pasangan elektron terikat (3 ikatan tunggal N—H)<br/>
                • 1 pasangan elektron bebas pada atom Nitrogen
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Hanya melukis elektron yang berkongsi pada rantau pertindihan dan terlupa melukis pasangan elektron bebas pada atom pusat.',
          correction: 'Semua elektron valens atom (termasuk pasangan elektron bebas) mesti dilukis supaya atom menunjukkan susunan elektron oktet/duplet yang lengkap.',
          why: 'Pasangan elektron bebas adalah sebahagian daripada elektron valens yang belum berikat.',
          spmTip: 'Kira jumlah elektron pada petala luar setiap atom; pastikan mencukupi 8 (atau 2 bagi H).'
        },
        {
          mistake: 'Menganggap ikatan ganda dua bermaksud berkongsi 2 elektron kesemuanya.',
          correction: 'Ikatan ganda dua berkongsi DUA PASANG elektron (iaitu berjumlah 4 elektron, 2 daripada setiap atom).',
          why: 'Setiap satu ikatan kovalen menyumbang sepasang elektron (2 elektron).',
          spmTip: 'Ganda dua = 4 elektron dikongsi; Ganda tiga = 6 elektron dikongsi.'
        }
      ],
      flashcards: [
        {
      id: 't4-b5-fc-11',
      front: 'Berapakah bilangan pasangan elektron yang dikongsi dalam ikatan kovalen ganda dua?',
      back: 'Dua pasang elektron (iaitu berjumlah 4 elektron, 2 daripada setiap atom).'
    },
        {
      id: 't4-b5-fc-12',
      front: 'Berikan satu contoh molekul kovalen yang mengandungi ikatan ganda tiga.',
      back: 'Molekul gas nitrogen, N₂ (setiap atom N menyumbang 3 elektron valens, berkongsi 3 pasang elektron, N≡N).'
    },
        {
      id: 't4-b5-fc-13',
      front: 'Apakah maksud pasangan elektron bebas (lone pair) dalam molekul kovalen?',
      back: 'Pasangan elektron valens yang tidak terlibat dalam pembentukan sebarang ikatan kimia.'
    },
        {
      id: 't4-b5-fc-14',
      front: 'Berapakah bilangan pasangan elektron bebas yang wujud pada atom oksigen dalam molekul air, H₂O?',
      back: 'Dua pasangan elektron bebas (4 elektron bebas).'
    },
        {
      id: 't4-b5-fc-15',
      front: 'Apakah jenis daya yang wujud antara molekul kovalen yang berasingan?',
      back: 'Daya tarikan van der Waals (daya intermolekul yang lemah).'
    }
      ],
      quiz: [
        {
      id: 't4-b5-q13',
      question: 'Berapakah bilangan elektron yang dikongsi dalam satu ikatan kovalen tunggal?',
      options: ['1 elektron', '2 elektron (1 pasang)', '4 elektron (2 pasang)', '6 elektron (3 pasang)'],
      answerIndex: 1,
      explanation: 'Satu ikatan kovalen tunggal melibatkan perkongsian satu pasang elektron (iaitu 2 elektron).',
      level: 'Rendah'
    },
        {
      id: 't4-b5-q14',
      question: 'Antara molekul berikut, yang manakah mempunyai ikatan kovalen ganda tiga?',
      options: ['Gas oksigen, O₂', 'Gas hidrogen, H₂', 'Gas nitrogen, N₂', 'Gas klorin, Cl₂'],
      answerIndex: 2,
      explanation: 'Molekul nitrogen (N₂) berkongsi 3 pasang elektron (6 elektron) untuk mencapai susunan oktet, membentuk ikatan ganda tiga (N≡N).',
      level: 'Rendah'
    },
        {
      id: 't4-b5-q15',
      question: 'Berapakah bilangan pasangan elektron bebas (lone pair) yang terdapat pada molekul ammonia, NH₃?',
      options: ['0', '1', '2', '3'],
      answerIndex: 1,
      explanation: 'Atom nitrogen mempunyai 5 elektron valens. 3 elektron digunakan untuk berikat dengan 3 atom H, meninggalkan 1 pasangan elektron bebas (lone pair).',
      level: 'Sederhana'
    },
        {
      id: 't4-b5-q16',
      question: 'Molekul karbon dioksida, CO₂ mengandungi:',
      options: [
        'Dua ikatan kovalen tunggal',
        'Dua ikatan kovalen ganda dua',
        'Satu ikatan tunggal dan satu ikatan ganda tiga',
        'Dua ikatan ionik'
      ],
      answerIndex: 1,
      explanation: 'Dalam CO₂, atom karbon membentuk dua ikatan ganda dua dengan dua atom oksigen: O = C = O.',
      level: 'Sederhana'
    },
        {
      id: 't4-b5-q17',
      question: 'Antara yang berikut, molekul manakah yang mematuhi susunan elektron duplet bagi SEMUA atom di dalamnya?',
      options: ['H₂O', 'HCl', 'H₂', 'CH₄'],
      answerIndex: 2,
      explanation: 'Dalam molekul gas hidrogen (H₂), kedua-dua atom hidrogen berkongsi elektron mencapai susunan duplet (2 elektron).',
      level: 'Sederhana'
    },
        {
      id: 't4-b5-q18',
      question: 'Karbon tetraklorida, CCl₄ terbentuk daripada atom C (nombor proton 6) dan Cl (nombor proton 17). Berapakah jumlah keseluruhan pasangan elektron bebas dalam satu molekul CCl₄?',
      options: ['4 pasang', '8 pasang', '12 pasang', '16 pasang'],
      answerIndex: 2,
      explanation: 'Setiap atom Cl mempunyai 3 pasangan elektron bebas pada petala valensnya. Dengan 4 atom Cl, terdapat 3 × 4 = 12 pasangan elektron bebas (atom C tiada pasangan bebas).',
      level: 'Tinggi (KBAT)'
    }
      ]
    },

    // -------------------------------------------------------------
    // SUBTOPIK 5.4 IKATAN HIDROGEN
    // -------------------------------------------------------------
    {
      id: 't4-b5-s4',
      code: '5.4',
      title: 'Ikatan Hidrogen',
      learningStandard: 'SP 5.4.1, SP 5.4.2',
      durationMinutes: 20,
      tldr: [
        'Ikatan hidrogen ialah daya tarikan antara atom hidrogen, H yang terikat secara kovalen kepada atom yang SANGAT elektronegatif (Fluorin, Oksigen, Nitrogen - "FON") dengan pasangan elektron bebas pada atom F, O, atau N dalam molekul lain.',
        'Ikatan hidrogen adalah lebih kuat daripada daya tarikan van der Waals biasa, tetapi lebih lemah daripada ikatan kovalen atau ikatan ion.',
        'Kewujudan ikatan hidrogen menyebabkan takat didih sebatian seperti air (H₂O), hidrogen fluorida (HF), dan ammonia (NH₃) adalah jauh lebih tinggi daripada jangkaan.',
        'Membolehkan bahan kovalen tertentu (cth etanol, ammonia) larut dengan baik di dalam air kerana berupaya membentuk ikatan hidrogen bersama molekul air.',
        'Fenomena harian: Rambut basah melekat bersama dan helaian kertas melekat pada jari yang dibasahkan.'
      ],
      simulationRef: {
        id: 'daya-tarikan-antara-zarah',
        title: 'Makmal Maya Daya Tarikan Antara Zarah & Ikatan Hidrogen',
        description: 'Bandingkan kekuatan daya tarikan van der Waals dan ikatan hidrogen serta terokai kesannya terhadap anomali takat didih cecair.',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=daya-tarikan-antara-zarah',
        previewBadge: 'Simulasi Bab 5.4'
      },
      concepts: [
        {
          id: 't4-b5-s4-c1',
          title: 'Syarat Pembentukan Ikatan Hidrogen (Mnemonic: F-O-N)',
          badge: 'Definisi SPM',
          content: `
            <p>
              Ikatan hidrogen <b>BUKAN</b> ikatan kimia di dalam molekul (intramolekul), sebaliknya ia merupakan <b>daya tarikan intermolekul yang kuat</b> antara molekul-molekul berasingan.
            </p>
            <div class="p-3 rounded-2xl bg-amber-50 border border-amber-200 mt-2 space-y-2">
              <span class="text-xs font-black text-amber-900 block">Dua Syarat Wajib:</span>
              <ul class="list-disc pl-5 text-xs text-amber-800 space-y-1">
                <li>Atom hidrogen mesti terikat terus secara kovalen kepada atom yang mempunyai <b>keelektronegatifan sangat tinggi dan saiz kecil</b> iaitu <b>Fluorin (F), Oksigen (O), atau Nitrogen (N)</b>.</li>
                <li>Atom F, O, atau N pada molekul bersebelahan mesti mempunyai sekurang-kurangnya satu <b>pasangan elektron bebas (lone pair)</b>.</li>
              </ul>
            </div>
            <p class="text-xs text-slate-700 mt-2 leading-relaxed">
              Oleh kerana atom F, O, dan N sangat elektronegatif, ia menarik elektron ikatan ke arahnya dengan kuat, menyebabkan atom H memperoleh cas separa positif yang ketara (δ⁺) dan atom F/O/N memperoleh cas separa negatif (δ⁻). Daya tarikan elektrostatik antara δ⁺ pada H dan δ⁻ pada atom elektronegatif molekul lain inilah <b>ikatan hidrogen</b>.
            </p>
          `
        },
        {
          id: 't4-b5-s4-c2',
          title: 'Kesan Ikatan Hidrogen ke atas Sifat Fizik & Fenomena Harian',
          badge: 'Aplikasi & Analisis SPM',
          content: `
            <div class="space-y-3">
              <div class="p-3 rounded-2xl bg-white border border-slate-200">
                <span class="text-xs font-bold text-slate-900 block mb-1">1. Anomali Takat Didih Air (H₂O vs H₂S)</span>
                <p class="text-xs text-slate-700 leading-relaxed">
                  Jisim molekul relatif H₂O ialah 18, manakala H₂S ialah 34. Berdasarkan jisim molekul, takat didih H₂S sepatutnya lebih tinggi. Namun, takat didih H₂O adalah <b>100°C</b> manakala H₂S hanyalah <b>-60°C</b>.<br/>
                  <b>Penerangan SPM:</b> Antara molekul H₂O terdapat <b>ikatan hidrogen yang kuat</b> di samping daya tarikan van der Waals, manakala antara molekul H₂S hanya terdapat daya tarikan van der Waals yang lemah. Lebih banyak tenaga haba diperlukan untuk memutuskan ikatan hidrogen dalam air.
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-white border border-slate-200">
                <span class="text-xs font-bold text-slate-900 block mb-1">2. Keterlarutan Sebatian Kovalen dalam Air</span>
                <p class="text-xs text-slate-700 leading-relaxed">
                  Sebatian kovalen seperti etanol (C₂H₅OH) dan ammonia (NH₃) larut dalam air kerana kumpulan –OH pada alkohol atau –NH₂ berupaya <b>membentuk ikatan hidrogen dengan molekul air</b>.
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-white border border-slate-200">
                <span class="text-xs font-bold text-slate-900 block mb-1">3. Fenomena Harian Wajib Ingat</span>
                <ul class="list-disc pl-5 text-xs text-slate-700 space-y-1">
                  <li><b>Rambut Basah:</b> Rambut terdiri daripada protein keratin. Apabila basah, molekul air membentuk ikatan hidrogen antara helaian rambut, menyebabkannya melekat bersama.</li>
                  <li><b>Menyelak Kertas:</b> Hujung jari dibasahkan supaya molekul air membentuk ikatan hidrogen dengan serat selulosa kertas, memudahkan helaian kertas diselak.</li>
                </ul>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menganggap ikatan hidrogen ialah ikatan kovalen antara atom H dan O di dalam satu molekul air.',
          correction: 'Ikatan di dalam molekul air ialah ikatan kovalen. Ikatan hidrogen ialah daya tarikan antara molekul air yang BERLAINAN (intermolekul).',
          why: 'Ikatan kovalen ialah ikatan intramolekul, manakala ikatan hidrogen ialah daya tarikan antara molekul.',
          spmTip: 'Lukis garisan putus-putus untuk ikatan hidrogen di antara molekul berbeza.'
        },
        {
          mistake: 'Menyatakan HCl membentuk ikatan hidrogen kerana mempunyai atom hidrogen.',
          correction: 'Atom klorin (Cl) mempunyai saiz atom yang lebih besar dan ketumpatan cas yang lebih rendah, maka ikatan hidrogen tidak terbentuk antara molekul HCl (hanya daya van der Waals).',
          why: 'Hanya atom F, O, dan N yang mempunyai keelektronegatifan cukup tinggi untuk membentuk ikatan hidrogen.',
          spmTip: 'Hafal formula ringkas "F-O-N" (Fluorin, Oksigen, Nitrogen).'
        }
      ],
      flashcards: [
        {
      id: 't4-b5-fc-16',
      front: 'Nyatakan tiga unsur yang berupaya membentuk ikatan hidrogen apabila terikat dengan atom hidrogen.',
      back: 'Fluorin (F), Oksigen (O), dan Nitrogen (N) kerana mempunyai keelektronegatifan yang sangat tinggi dan saiz atom yang kecil.'
    },
        {
      id: 't4-b5-fc-17',
      front: 'Mengapakah takat didih air (H₂O) jauh lebih tinggi daripada hidrogen sulfida (H₂S)?',
      back: 'Antara molekul air terdapat ikatan hidrogen yang kuat selain daya van der Waals, memerlukan lebih banyak haba untuk diputuskan berbanding hanya daya van der Waals dalam H₂S.'
    },
        {
      id: 't4-b5-fc-18',
      front: 'Mengapakah etanol (sebatian kovalen) boleh larut dalam air?',
      back: 'Kerana molekul etanol berupaya membentuk ikatan hidrogen dengan molekul air melalui kumpulan hidroksil (-OH).'
    },
        {
      id: 't4-b5-fc-19',
      front: 'Terangkan fenomena helaian rambut basah melekat bersama berasaskan ikatan hidrogen.',
      back: 'Molekul air membentuk ikatan hidrogen dengan molekul protein keratin pada rambut yang bersebelahan, menarik helaian rambut bersama.'
    },
        {
      id: 't4-b5-fc-20',
      front: 'Bagaimanakah ikatan hidrogen diwakili dalam rajah molekul kimia?',
      back: 'Diwakili dengan garisan putus-putus (-------), membezakannya daripada garisan ikatan kovalen padu (—).'
    }
      ],
      quiz: [
        {
      id: 't4-b5-q19',
      question: 'Ikatan hidrogen wujud apabila atom hidrogen terikat dengan atom yang mempunyai:',
      options: [
        'Jisim atom relatif yang sangat tinggi',
        'Keelektronegatifan tinggi dan saiz atom yang kecil (F, O, N)',
        'Bilangan proton yang genap',
        'Sifat kelogaman yang kuat'
      ],
      answerIndex: 1,
      explanation: 'Ikatan hidrogen memerlukan atom yang sangat elektronegatif dan bersaiz kecil iaitu Fluorin, Oksigen, atau Nitrogen (FON).',
      level: 'Rendah'
    },
        {
      id: 't4-b5-q20',
      question: 'Antara sebatian berikut, yang manakah MEMBENTUK ikatan hidrogen antara molekulnya?',
      options: ['Metana, CH₄', 'Hidrogen fluorida, HF', 'Hidrogen klorida, HCl', 'Hidrogen sulfida, H₂S'],
      answerIndex: 1,
      explanation: 'HF membentuk ikatan hidrogen yang kuat kerana atom fluorin adalah atom paling elektronegatif.',
      level: 'Rendah'
    },
        {
      id: 't4-b5-q21',
      question: 'Mengapakah air (H₂O) mempunyai takat didih yang luar biasa tinggi (100°C) berbanding H₂S (-60°C)?',
      options: [
        'Ikatan kovalen O–H lebih lemah daripada S–H',
        'Molekul air membentuk ikatan hidrogen intermolekul yang kuat yang memerlukan banyak haba untuk diputuskan',
        'Molekul air mempunyai jisim molekul relatif yang lebih besar daripada H₂S',
        'Air mengandungi ion H⁺ dan OH⁻ bebas dalam fasa cecair'
      ],
      answerIndex: 1,
      explanation: 'Kewujudan ikatan hidrogen antara molekul air memerlukan tenaga haba yang tinggi untuk diatasi, menyebabkan takat didihnya tinggi luar biasa.',
      level: 'Sederhana'
    },
        {
      id: 't4-b5-q22',
      question: 'Apakah peranan ikatan hidrogen dalam memudahkan seseorang menyelak helaian buku menggunakan jari yang dibasahkan?',
      options: [
        'Molekul air melarutkan dakwat pada kertas',
        'Molekul air membentuk ikatan hidrogen dengan molekul selulosa pada kertas',
        'Air mengurangkan daya geseran antara jari dan kertas sepenuhnya',
        'Air bertindak balas secara kimia dengan kertas membentuk sebatian baharu'
      ],
      answerIndex: 1,
      explanation: 'Air bertindak sebagai jambatan dengan membentuk ikatan hidrogen antara kulit jari dan serat selulosa pada kertas.',
      level: 'Sederhana'
    },
        {
      id: 't4-b5-q23',
      question: 'Antara bahan berikut, yang manakah boleh larut sepenuhnya dalam air kerana keupayaannya membentuk ikatan hidrogen dengan air?',
      options: ['Heksana, C₆H₁₄', 'Etanol, C₂H₅OH', 'Tetraklorometana, CCl₄', 'Benzena, C₆H₆'],
      answerIndex: 1,
      explanation: 'Kumpulan hidroksil (-OH) dalam molekul etanol berupaya membentuk ikatan hidrogen dengan molekul air, membolehkannya larut campur sepenuhnya.',
      level: 'Sederhana'
    },
        {
      id: 't4-b5-q24',
      question: 'Rambut manusia melekat bersama semasa basah dan kembali mengembang apabila kering. Apakah huraian saintifik yang tepat?',
      options: [
        'Semasa basah, ikatan peptida dalam rambut putus',
        'Semasa basah, molekul air membentuk ikatan hidrogen antara molekul protein rambut, manakala apabila kering molekul air tersejat',
        'Rambut menyerap air dan menghasilkan cas elektrostatik negatif',
        'Air bertindak balas dengan keratin membentuk sebatian ionik'
      ],
      answerIndex: 1,
      explanation: 'Molekul air membentuk ikatan hidrogen dengan rantai protein keratin dalam rambut. Apabila rambut kering, air meruap dan ikatan hidrogen antara helaian rambut hilang.',
      level: 'Tinggi (KBAT)'
    }
      ]
    },

    // -------------------------------------------------------------
    // SUBTOPIK 5.5 IKATAN DATIF
    // -------------------------------------------------------------
    {
      id: 't4-b5-s5',
      code: '5.5',
      title: 'Ikatan Datif',
      learningStandard: 'SP 5.5.1',
      durationMinutes: 20,
      tldr: [
        'Ikatan datif (atau ikatan koordinat) ialah sejenis ikatan kovalen di mana KEDUA-DUA elektron yang dikongsi disumbangkan oleh SATU ATOM SAHAJA.',
        'Syarat pembentukan ikatan datif:',
        '1. Satu spesies mempunyai sekurang-kurangnya satu pasangan elektron bebas (lone pair) yang belum berikat.',
        '2. Satu spesies lagi mempunyai orbital kosong yang memerlukan sepasang elektron untuk mencapai kestabilan duplet atau oktet.',
        'Contoh utama SPM: Pembentukan ion hidroksonium (H₃O⁺) daripada H₂O dan ion H⁺, serta pembentukan ion ammonium (NH₄⁺) daripada NH₃ dan ion H⁺.',
        'Dalam rajah struktur, ikatan datif diwakili oleh anak panah (→) yang menghala dari atom penderma elektron ke atom penerima elektron.'
      ],
      concepts: [
        {
          id: 't4-b5-s5-c1',
          title: 'Definisi dan Mekanisme Ikatan Datif',
          badge: 'Konsep Kimia Baharu KSSM',
          content: `
            <p>
              Dalam ikatan kovalen biasa, kedua-dua atom yang berikat menyumbang elektron secara seimbang (1 elektron daripada setiap atom).<br/>
              Sebaliknya, dalam <b>ikatan datif (ikatan koordinat)</b>:
            </p>
            <div class="p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 mt-2 leading-relaxed">
              <b>Definisi KSSM:</b> Sejenis ikatan kovalen antara dua atom di mana kedua-dua elektron yang dikongsi berasal daripada <b>satu atom sahaja</b>.
            </div>
            <p class="text-xs text-slate-700 mt-2">
              Selepas ikatan datif terbentuk, sifat fizikal dan kekuatannya adalah <b>serupa dengan ikatan kovalen biasa</b> dan tidak dapat dibezakan melainkan melalui asal usul pasangan elektron tersebut.
            </p>
          `
        },
        {
          id: 't4-b5-s5-c2',
          title: 'Dua Contoh Utama Wajib SPM (H₃O⁺ dan NH₄⁺)',
          badge: 'Contoh Piawai Peperiksaan',
          content: `
            <div class="space-y-3">
              <div class="p-3 rounded-2xl bg-white border border-slate-200">
                <span class="text-xs font-bold text-slate-900 block mb-1">1. Pembentukan Ion Hidroksonium (H₃O⁺)</span>
                <p class="text-xs text-slate-700 leading-relaxed">
                  • Molekul air, H₂O mempunyai dua pasangan elektron terikat dan <b>dua pasangan elektron bebas</b> pada atom oksigen.<br/>
                  • Ion hidrogen, H⁺ terhasil apabila asid mengion dalam air. Ion H⁺ ialah proton tanpa sebarang elektron dalam petala.<br/>
                  • Atom oksigen dalam H₂O menderma <b>satu pasangan elektron bebasnya</b> untuk dikongsi bersama ion H⁺ yang mempunyai orbital kosong.<br/>
                  • Terbentuk ikatan datif: <b>H₂O + H⁺ → H₃O⁺</b> (O → H⁺).
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-white border border-slate-200">
                <span class="text-xs font-bold text-slate-900 block mb-1">2. Pembentukan Ion Ammonium (NH₄⁺)</span>
                <p class="text-xs text-slate-700 leading-relaxed">
                  • Molekul ammonia, NH₃ mempunyai tiga pasangan elektron terikat dan <b>satu pasangan elektron bebas</b> pada atom nitrogen.<br/>
                  • Apabila bertindak balas dengan asid, atom nitrogen menderma sepasang elektron bebas tersebut kepada ion H⁺.<br/>
                  • Ion H⁺ berkongsi pasangan elektron tersebut untuk mencapai susunan duplet yang stabil.<br/>
                  • Terbentuk ikatan datif: <b>NH₃ + H⁺ → NH₄⁺</b> (N → H⁺).
                </p>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Melukis anak panah ikatan datif menghala dari ion H⁺ ke arah atom nitrogen dalam NH₄⁺.',
          correction: 'Anak panah mesti bermula dari atom yang menderma pasangan elektron (N) menuju ke penerima pasangan elektron (H⁺).',
          why: 'Arah anak panah mewakili pergerakan perkongsian pasangan elektron bebas.',
          spmTip: 'Ingat: Dari penderma (N atau O) → kepada penerima (H⁺).'
        },
        {
          mistake: 'Menganggap ikatan datif menghasilkan pemindahan elektron sepenuhnya dan membentuk ikatan ion.',
          correction: 'Ikatan datif ialah sejenis IKATAN KOVALEN (elektron masih dikongsi bersama), bukan dipindahkan sepenuhnya.',
          why: 'Pasangan elektron dikongsi bersama antara dua nukleus.',
          spmTip: 'Ikatan datif = ikatan koordinat kovalen.'
        }
      ],
      flashcards: [
        {
      id: 't4-b5-fc-21',
      front: 'Apakah definisi ikatan datif (ikatan koordinat)?',
      back: 'Sejenis ikatan kovalen di mana kedua-dua elektron yang dikongsi disumbangkan oleh satu atom sahaja.'
    },
        {
      id: 't4-b5-fc-22',
      front: 'Apakah dua syarat utama bagi pembentukan ikatan datif?',
      back: '1. Satu atom mempunyai pasangan elektron bebas (lone pair). 2. Satu spesies lagi mempunyai orbital kosong yang memerlukan sepasang elektron.'
    },
        {
      id: 't4-b5-fc-23',
      front: 'Bagaimanakah ion hidroksonium, H₃O⁺ terbentuk melalui ikatan datif?',
      back: 'Atom oksigen dalam molekul air (H₂O) menyumbangkan satu pasangan elektron bebasnya untuk dikongsi dengan ion hidrogen (H⁺).'
    },
        {
      id: 't4-b5-fc-24',
      front: 'Tuliskan persamaan tindak balas pembentukan ion ammonium, NH₄⁺.',
      back: 'NH₃ + H⁺ → NH₄⁺ (Pasangan elektron bebas pada atom nitrogen dikongsi bersama ion H⁺).'
    },
        {
      id: 't4-b5-fc-25',
      front: 'Apakah perbezaan ikatan datif dengan ikatan kovalen biasa selepas terbentuk?',
      back: 'Tiada perbezaan dari segi sifat fizik mahupun kekuatan ikatan; perbezaannya hanyalah sumber asal pasangan elektron tersebut.'
    }
      ],
      quiz: [
        {
      id: 't4-b5-q25',
      question: 'Apakah ciri utama yang membezakan ikatan datif daripada ikatan kovalen biasa?',
      options: [
        'Kedua-dua elektron yang dikongsi disumbangkan oleh satu atom sahaja',
        'Elektron dipindahkan sepenuhnya membentuk kation dan anion',
        'Ikatan ini hanya berlaku pada suhu melebihi 100°C',
        'Hanya elektron petala dalam yang dikongsi'
      ],
      answerIndex: 0,
      explanation: 'Dalam ikatan datif, sepasang elektron yang dikongsi disumbangkan oleh satu atom penderma sahaja.',
      level: 'Rendah'
    },
        {
      id: 't4-b5-q26',
      question: 'Antara spesies berikut, yang manakah terbentuk melalui ikatan datif?',
      options: ['Ion natrium, Na⁺', 'Ion hidroksonium, H₃O⁺', 'Molekul metana, CH₄', 'Molekul klorin, Cl₂'],
      answerIndex: 1,
      explanation: 'Ion hidroksonium (H₃O⁺) terhasil apabila molekul air menderma satu pasangan elektron bebas kepada ion H⁺.',
      level: 'Rendah'
    },
        {
      id: 't4-b5-q27',
      question: 'Dalam pembentukan ion ammonium, NH₄⁺, atom manakah yang bertindak sebagai penderma pasangan elektron bebas?',
      options: ['Atom hidrogen', 'Atom nitrogen', 'Ion hidrogen', 'Ion hidroksida'],
      answerIndex: 1,
      explanation: 'Atom nitrogen dalam molekul NH₃ mempunyai 1 pasangan elektron bebas dan mendermakannya kepada ion H⁺.',
      level: 'Sederhana'
    },
        {
      id: 't4-b5-q28',
      question: 'Apakah simbol yang digunakan untuk mewakili ikatan datif dalam formula struktur?',
      options: ['Garisan putus-putus (-------)', 'Anak panah (→)', 'Dua garisan selari (=)', 'Tanda tambah (+)'],
      answerIndex: 1,
      explanation: 'Ikatan datif dilukis sebagai anak panah (→) yang menghala daripada atom penderma elektron kepada atom penerima.',
      level: 'Sederhana'
    },
        {
      id: 't4-b5-q29',
      question: 'Mengapakah ion H⁺ berupaya menerima pasangan elektron bebas daripada molekul ammonia (NH₃)?',
      options: [
        'Ion H⁺ mempunyai 2 elektron valens',
        'Ion H⁺ tidak mempunyai sebarang elektron dan mempunyai orbital kosong',
        'Ion H⁺ mempunyai keelektronegatifan yang sangat rendah',
        'Ion H⁺ ialah kation dwicas'
      ],
      answerIndex: 1,
      explanation: 'Ion H⁺ ialah proton tulen tanpa elektron. Ia mempunyai orbital kosong yang sedia menerima sepasang elektron untuk mencapai duplet stabil.',
      level: 'Sederhana'
    },
        {
      id: 't4-b5-q30',
      question: 'Dalam larutan akueus asid hidroklorik (HCl), zarah yang bertanggungjawab menunjukkan sifat asid ialah ion hidronium (H₃O⁺). Bagaimanakah ikatan dalam H₃O⁺ dapat dihuraikan dengan tepat?',
      options: [
        'Tiga ikatan ionik antara oksigen dan hidrogen',
        'Dua ikatan kovalen tunggal dan satu ikatan datif',
        'Tiga ikatan kovalen ganda dua',
        'Satu ikatan kovalen dan dua ikatan hidrogen'
      ],
      answerIndex: 1,
      explanation: 'H₃O⁺ mengandungi 2 ikatan kovalen tunggal O–H asal dalam molekul air, ditambah dengan 1 ikatan datif antara atom oksigen dan ion H⁺.',
      level: 'Tinggi (KBAT)'
    }
      ]
    },

    // -------------------------------------------------------------
    // SUBTOPIK 5.6 IKATAN LOGAM
    // -------------------------------------------------------------
    {
      id: 't4-b5-s6',
      code: '5.6',
      title: 'Ikatan Logam',
      learningStandard: 'SP 5.6.1, SP 5.6.2',
      durationMinutes: 20,
      tldr: [
        'Ikatan logam ialah daya tarikan elektrostatik antara lautan elektron yang dinyahsetempatkan dengan ion logam bercas positif.',
        'Atom logam mempunyai keelektronegatifan rendah dan mudah melepaskan elektron valens ke ruang antara atom membentuk ion logam positif.',
        'Elektron-elektron valens ini bebas bergerak ke seluruh kekisi logam dan dipanggil lautan elektron yang dinyahsetempatkan (delocalised electrons).',
        'Menerangkan mengapa logam merupakan konduktor elektrik dan haba yang sangat baik, serta mempunyai takat lebur yang tinggi, boleh ditempa (malleable) dan mulur (ductile).'
      ],
      concepts: [
        {
          id: 't4-b5-s6-c1',
          title: 'Model Lautan Elektron & Struktur Kekisi Logam',
          badge: 'Model Struktur Logam',
          content: `
            <p>
              Di dalam pepejal logam, atom-atom logam tersusun rapat dalam kekisi teratur:
            </p>
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 mt-2 space-y-2">
              <div class="text-xs text-slate-700 leading-relaxed">
                <b>Elektron Dinyahsetempatkan:</b> Elektron valens tidak lagi terikat pada mana-mana atom tertentu, sebaliknya bebas bergerak ke seluruh struktur kekisi logam.
              </div>
              <div class="text-xs text-slate-700 leading-relaxed">
                <b>Daya Ikatan Logam:</b> Terhasil daripada daya tarikan elektrostatik yang kuat antara <b>kation logam bercas positif</b> dan <b>lautan elektron yang dinyahsetempatkan</b> yang bercas negatif.
              </div>
            </div>
          `
        },
        {
          id: 't4-b5-s6-c2',
          title: 'Menaakul Sifat Fizik Logam Berdasarkan Ikatan Logam',
          badge: 'Penjelasan Fenomena Fizikal SPM',
          content: `
            <div class="space-y-3">
              <div class="p-3 rounded-2xl bg-white border border-slate-200">
                <span class="text-xs font-bold text-slate-900 block mb-1">1. Kekonduksian Elektrik yang Tinggi</span>
                <p class="text-xs text-slate-700 leading-relaxed">
                  Apabila beza keupayaan (voltan) dibekalkan merentasi logam, <b>elektron yang dinyahsetempatkan</b> bebas bergerak membawa cas elektrik menuju ke terminal positif bateri. Ini membolehkan logam mengkonduksikan elektrik dalam kedua-dua keadaan <b>pepejal dan leburan</b>.
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-white border border-slate-200">
                <span class="text-xs font-bold text-slate-900 block mb-1">2. Kekonduksian Haba yang Baik</span>
                <p class="text-xs text-slate-700 leading-relaxed">
                  Apabila satu hujung logam dipanaskan, elektron yang dinyahsetempatkan memperoleh tenaga kinetik dan bergerak pantas ke hujung yang lebih sejuk sambil memindahkan tenaga haba melalui perlanggaran dengan kation logam lain.
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-white border border-slate-200">
                <span class="text-xs font-bold text-slate-900 block mb-1">3. Kebolehtempaan dan Kemuluran</span>
                <p class="text-xs text-slate-700 leading-relaxed">
                  Apabila daya dikenakan ke atas logam, <b>lapisan ion logam boleh menggelongsor</b> di atas satu sama lain dengan mudah. Oleh kerana lautan elektron bergerak bersama-sama kation, ikatan logam tidak terputus. Ini membolehkan logam ditempa menjadi kepingan nipis atau ditarik menjadi dawai panjang tanpa patah.
                </p>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menyatakan logam mengalirkan elektrik kerana mempunyai ion bebas bergerak.',
          correction: 'Ion logam tidak bebas bergerak; hanya ELEKTRON YANG DINYAHSETEMPATKAN sahaja yang bebas bergerak membawa cas elektrik dalam logam.',
          why: 'Ion positif tersusun tetap dalam kekisi logam dan tidak boleh mengalir.',
          spmTip: 'Jangan sebut "ion bebas bergerak" untuk logam!'
        },
        {
          mistake: 'Menganggap ikatan logam mudah pecah apabila diketuk.',
          correction: 'Lapisan ion logam menggelongsor di atas lautan elektron, maka logam adalah BOLEH DITEMPA dan MULUR, bukan rapuh.',
          why: 'Lautan elektron kekal menyelubungi ion logam semasa lapisan menggelongsor.',
          spmTip: 'Bahan kovalen/ion mudah pecah/rapuh, tetapi logam boleh ditempa.'
        }
      ],
      flashcards: [
        {
      id: 't4-b5-fc-26',
      front: 'Apakah takrifan ikatan logam?',
      back: 'Daya tarikan elektrostatik antara lautan elektron yang dinyahsetempatkan dan ion-ion logam yang bercas positif.'
    },
        {
      id: 't4-b5-fc-27',
      front: 'Apakah maksud elektron dinyahsetempatkan (delocalised electrons)?',
      back: 'Elektron valens yang bebas bergerak ke seluruh kekisi logam dan tidak lagi terikat pada atom asal tertentu.'
    },
        {
      id: 't4-b5-fc-28',
      front: 'Mengapakah logam boleh mengalirkan arus elektrik dalam keadaan pepejal?',
      back: 'Kerana mengandungi lautan elektron yang dinyahsetempatkan dan bebas bergerak membawa cas apabila voltan dikenakan.'
    },
        {
      id: 't4-b5-fc-29',
      front: 'Mengapakah logam bersifat mulur dan boleh ditempa tanpa patah?',
      back: 'Kerana lapisan ion logam bercas positif boleh menggelongsor di atas satu sama lain dalam lautan elektron tanpa memecahkan ikatan logam.'
    },
        {
      id: 't4-b5-fc-30',
      front: 'Bagaimanakah haba dipindahkan dengan pantas di sepanjang rod logam?',
      back: 'Elektron dinyahsetempatkan memperoleh tenaga kinetik dan bergerak pantas memindahkan haba melalui perlanggaran dengan kation lain.'
    }
      ],
      quiz: [
        {
      id: 't4-b5-q31',
      question: 'Ikatan logam terbentuk daripada daya tarikan elektrostatik antara:',
      options: [
        'Proton dan neutron dalam nukleus',
        'Lautan elektron dinyahsetempatkan dan ion logam positif',
        'Ion logam positif dan ion bukan logam negatif',
        'Molekul logam yang neutral'
      ],
      answerIndex: 1,
      explanation: 'Ikatan logam ialah daya elektrostatik antara lautan elektron dinyahsetempatkan dengan kation logam bercas positif.',
      level: 'Rendah'
    },
        {
      id: 't4-b5-q32',
      question: 'Apakah maksud istilah elektron "dinyahsetempatkan"?',
      options: [
        'Elektron yang hilang dari atom secara kekal',
        'Elektron yang bebas bergerak ke seluruh struktur kekisi logam',
        'Elektron yang terperangkap dalam nukleus',
        'Elektron yang hanya berada pada satu petala tertentu'
      ],
      answerIndex: 1,
      explanation: 'Elektron dinyahsetempatkan ialah elektron valens yang tidak lagi terikat pada atom tertentu dan bebas bergerak mengelilingi kekisi logam.',
      level: 'Rendah'
    },
        {
      id: 't4-b5-q33',
      question: 'Mengapakah kuprum boleh mengalirkan arus elektrik dalam keadaan pepejal?',
      options: [
        'Mempunyai ion Cu²⁺ yang bebas bergerak',
        'Mempunyai elektron dinyahsetempatkan yang bebas bergerak membawa cas',
        'Kuprum ialah logam yang lembut',
        'Kekisi kuprum mengandungi molekul air terperangkap'
      ],
      answerIndex: 1,
      explanation: 'Kekonduksian elektrik logam disebabkan oleh pergerakan elektron dinyahsetempatkan yang bebas membawa cas elektrik.',
      level: 'Sederhana'
    },
        {
      id: 't4-b5-q34',
      question: 'Apakah sifat mekanikal logam yang membolehkannya ditarik menjadi dawai panjang nipis tanpa putus?',
      options: ['Kerapuhan', 'Kemuluran (Ductility)', 'Kekerasan melampau', 'Ketumpatan tinggi'],
      answerIndex: 1,
      explanation: 'Kemuluran (ductility) ialah keupayaan logam ditarik menjadi wayar halus kerana lapisan atomnya boleh menggelongsor tanpa memutuskan ikatan logam.',
      level: 'Sederhana'
    },
        {
      id: 't4-b5-q35',
      question: 'Antara unsur berikut, yang manakah mempunyai ikatan logam yang PALING KUAT?',
      options: ['Natrium (1 elektron valens)', 'Magnesium (2 elektron valens)', 'Aluminium (3 elektron valens)', 'Kalium (1 elektron valens)'],
      answerIndex: 2,
      explanation: 'Aluminium menyumbang 3 elektron valens per atom ke dalam lautan elektron dan cas kationnya adalah +3, menghasilkan daya tarikan elektrostatik paling kuat.',
      level: 'Sederhana'
    },
        {
      id: 't4-b5-q36',
      question: 'Mengapakah rod kuprum mengkonduksikan haba dengan jauh lebih pantas berbanding rod kaca?',
      options: [
        'Kaca mengandungi ikatan kovalen yang membebaskan haba',
        'Elektron dinyahsetempatkan dalam kuprum bergerak pantas dan memindahkan tenaga kinetik melalui perlanggaran dengan kation logam',
        'Kuprum mempunyai ketumpatan yang lebih rendah berbanding kaca',
        'Atom kuprum bergetar pada frekuensi yang lebih rendah'
      ],
      answerIndex: 1,
      explanation: 'Dalam logam, haba dipindahkan bukan sahaja melalui getaran kekisi tetapi sebahagian besarnya melalui pergerakan pantas elektron dinyahsetempatkan.',
      level: 'Tinggi (KBAT)'
    }
      ]
    },

    // -------------------------------------------------------------
    // SUBTOPIK 5.7 SEBATIAN ION DAN SEBATIAN KOVALEN
    // -------------------------------------------------------------
    {
      id: 't4-b5-s7',
      code: '5.7',
      title: 'Sifat Sebatian Ion dan Sebatian Kovalen',
      learningStandard: 'SP 5.7.1, SP 5.7.2',
      durationMinutes: 30,
      tldr: [
        'Sebatian ion mempunyai takat lebur dan takat didih yang sangat tinggi kerana ion-ion ditarik oleh daya tarikan elektrostatik yang kuat dalam struktur kekisi gergasi.',
        'Sebatian kovalen molekul ringkas mempunyai takat lebur dan takat didih yang rendah kerana daya tarikan van der Waals antara molekul adalah lemah.',
        'Kekonduksian elektrik: Sebatian ion mengkonduksikan elektrik dalam keadaan leburan dan larutan akueus (ion bebas bergerak), tetapi TIDAK dalam pepejal. Sebatian kovalen tidak mengalirkan elektrik dalam semua keadaan (tiada ion bebas).',
        'Keterlarutan: Sebatian ion umumnya larut dalam air (pelarut berkutub) tetapi tidak larut dalam pelarut organik. Sebatian kovalen umumnya tidak larut dalam air tetapi larut dalam pelarut organik.',
        'Molekul gergasi (cth SiO₂, intan) mempunyai takat lebur amat tinggi kerana semua atom dihubungkan oleh jaringan ikatan kovalen yang banyak dan kuat.'
      ],
      simulationRef: {
        id: 'daya-tarikan-antara-zarah',
        title: 'Makmal Maya Perbandingan Sifat Sebatian',
        description: 'Bandingkan kekonduksian elektrik, takat lebur, dan keterlarutan sebatian ion lawan sebatian kovalen secara interaktif.',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=daya-tarikan-antara-zarah',
        previewBadge: 'Simulasi Bab 5.7'
      },
      concepts: [
        {
          id: 't4-b5-s7-c1',
          title: 'Jadual Perbandingan Komprehensif Sifat Fizik (Wajib SPM)',
          badge: 'Jadual Skema SPM',
          content: `
            <div class="overflow-x-auto my-2">
              <table class="w-full text-xs text-left border-collapse border border-slate-200">
                <thead>
                  <tr class="bg-slate-100 text-slate-800">
                    <th class="p-2 border border-slate-200">Ciri Fizik</th>
                    <th class="p-2 border border-slate-200">Sebatian Ion (cth: NaCl, MgO)</th>
                    <th class="p-2 border border-slate-200">Sebatian Kovalen Molekul Ringkas (cth: CH₄, H₂O)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td class="p-2 font-semibold">Takat Lebur & Didih</td>
                    <td class="p-2"><b>Tinggi</b> (daya elektrostatik antara ion kuat, banyak haba diperlukan)</td>
                    <td class="p-2"><b>Rendah</b> (daya tarikan van der Waals antara molekul lemah, sedikit haba diperlukan)</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-semibold">Kemeruapan (Volatility)</td>
                    <td class="p-2">Tidak meruap</td>
                    <td class="p-2">Mudah meruap (volatile)</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-semibold">Kekonduksian Elektrik (Pepejal)</td>
                    <td class="p-2"><b>Tidak mengkonduksikan</b> (ion berada dalam kekisi tetap, tidak bebas bergerak)</td>
                    <td class="p-2"><b>Tidak mengkonduksikan</b> (zarah wujud sebagai molekul neutral)</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-semibold">Kekonduksian Elektrik (Leburan/Akueus)</td>
                    <td class="p-2"><b>Mengkonduksikan elektrik</b> (kekisi musnah, ion-ion bebas bergerak membawa cas)</td>
                    <td class="p-2"><b>Tidak mengkonduksikan</b> (kekal sebagai molekul neutral, tiada ion bebas)</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-semibold">Keterlarutan dalam Air</td>
                    <td class="p-2">Kebanyakannya <b>larut</b> (air adalah pelarut berkutub)</td>
                    <td class="p-2">Kebanyakannya <b>tidak larut</b></td>
                  </tr>
                  <tr>
                    <td class="p-2 font-semibold">Keterlarutan dalam Pelarut Organik</td>
                    <td class="p-2"><b>Tidak larut</b> (eter, benzena, propanon)</td>
                    <td class="p-2">Kebanyakannya <b>larut</b> dalam pelarut organik</td>
                  </tr>
                </tbody>
              </table>
            </div>
          `
        },
        {
          id: 't4-b5-s7-c2',
          title: 'Molekul Ringkas Lawan Struktur Kovalen Gergasi',
          badge: 'Perbandingan Struktur',
          content: `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <div class="p-3 rounded-2xl bg-white border border-slate-200">
                <span class="text-xs font-black text-slate-800 block mb-1">Molekul Ringkas (Cth: CO₂, H₂O, I₂)</span>
                <p class="text-xs text-slate-600 leading-relaxed">
                  • Atom diikat oleh ikatan kovalen yang kuat di dalam molekul.<br/>
                  • Antara molekul berasingan hanya ditarik oleh <b>daya van der Waals yang lemah</b>.<br/>
                  • Takat lebur dan didih rendah kerana hanya sedikit tenaga diperlukan untuk mengatasi daya van der Waals.
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-white border border-slate-200">
                <span class="text-xs font-black text-slate-800 block mb-1">Molekul Gergasi (Cth: Silikon Dioksida, SiO₂, Intan)</span>
                <p class="text-xs text-slate-600 leading-relaxed">
                  • Mengandungi berjuta-juta atom yang terikat bersama oleh <b>rangkaian ikatan kovalen yang banyak dan kuat</b> dalam struktur 3 dimensi.<br/>
                  • Takat lebur dan didih adalah <b>sangat tinggi</b> (melebihi 1600°C) kerana sejumlah besar tenaga haba diperlukan untuk memutuskan ikatan kovalen yang kuat tersebut.<br/>
                  • Sangat keras dan tidak larut dalam air atau pelarut organik.
                </p>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menyatakan ikatan kovalen diputuskan semasa sebatian kovalen seperti ais melebur atau air mendidih.',
          correction: 'Ikatan kovalen dalam molekul H₂O TIDAK putus semasa mendidih. Hanya daya tarikan van der Waals / ikatan hidrogen antara molekul sahaja yang diatasi.',
          why: 'Ikatan kovalen adalah intramolekul yang sangat kuat; perubahan fizikal hanya mengatasi daya intermolekul yang lemah.',
          spmTip: 'Sentiasa nyatakan: "daya tarikan antara molekul diatasi", bukannya "ikatan kovalen diputuskan".'
        },
        {
          mistake: 'Menyatakan sebatian ion pepejal mengalirkan arus elektrik kerana mempunyai banyak ion.',
          correction: 'Walaupun mempunyai banyak ion, dalam keadaan pepejal ion-ion tersebut terikat ketat dalam kekisi dan TIDAK BEBAS BERGERAK, maka elektrik tidak dapat dialirkan.',
          why: 'Syarat pengaliran elektrik bagi sebatian ionik ialah zarah bercas (ion) mesti bebas bergerak membawa arus.',
          spmTip: 'Sebatian ion hanya mengalirkan elektrik dalam keadaan LEBURAN atau LARUTAN AKUEUS.'
        }
      ],
      flashcards: [
        {
      id: 't4-b5-fc-31',
      front: 'Mengapakah sebatian ion mempunyai takat lebur yang sangat tinggi?',
      back: 'Kerana ion-ion diikat bersama oleh daya tarikan elektrostatik yang sangat kuat dalam struktur kekisi gergasi, memerlukan tenaga haba yang tinggi untuk memutuskannya.'
    },
        {
      id: 't4-b5-fc-32',
      front: 'Mengapakah natrium klorida tidak mengalirkan elektrik dalam keadaan pepejal tetapi mengalirkan elektrik apabila dileburkan?',
      back: 'Dalam pepejal, ion berada pada kedudukan tetap dalam kekisi dan tidak bebas bergerak. Dalam leburan, kekisi musnah dan ion-ion bebas bergerak membawa cas.'
    },
        {
      id: 't4-b5-fc-33',
      front: 'Mengapakah sebatian kovalen molekul ringkas tidak mengalirkan arus elektrik dalam semua keadaan?',
      back: 'Kerana molekul kovalen adalah neutral dan tiada ion atau elektron yang bebas bergerak untuk membawa cas.'
    },
        {
      id: 't4-b5-fc-34',
      front: 'Apakah jenis keterlarutan tipikal bagi sebatian kovalen ringkas?',
      back: 'Kebanyakannya tidak larut dalam air (pelarut berkutub), tetapi larut dalam pelarut organik (seperti heksana, alkohol, dan propanon).'
    },
        {
      id: 't4-b5-fc-35',
      front: 'Mengapakah silikon dioksida (SiO₂) mempunyai takat lebur amat tinggi berbanding karbon dioksida (CO₂)?',
      back: 'SiO₂ mempunyai struktur kovalen gergasi dengan rangkaian ikatan kovalen kuat 3D, manakala CO₂ ialah molekul ringkas yang hanya dipegang oleh daya van der Waals lemah.'
    }
      ],
      quiz: [
        {
      id: 't4-b5-q37',
      question: 'Antara bahan berikut, yang manakah boleh mengalirkan arus elektrik dalam keadaan leburan?',
      options: ['Glukosa, C₆H₁₂O₆', 'Plumbum(II) bromida, PbBr₂', 'Naftalena, C₁₀H₈', 'Etanol, C₂H₅OH'],
      answerIndex: 1,
      explanation: 'Plumbum(II) bromida ialah sebatian ionik. Dalam keadaan leburan, kekisinya musnah dan ion Pb²⁺ serta Br⁻ bebas bergerak membawa cas.',
      level: 'Rendah'
    },
        {
      id: 't4-b5-q38',
      question: 'Mengapakah sebatian kovalen molekul ringkas seperti metana mempunyai takat didih yang sangat rendah?',
      options: [
        'Ikatan kovalen C–H di dalam molekul sangat lemah',
        'Daya tarikan van der Waals antara molekul adalah sangat lemah',
        'Metana wujud sebagai ion bebas',
        'Molekul metana tidak mempunyai jisim'
      ],
      answerIndex: 1,
      explanation: 'Daya intermolekul van der Waals antara molekul kovalen ringkas adalah lemah dan hanya memerlukan sedikit tenaga haba untuk diatasi.',
      level: 'Rendah'
    },
        {
      id: 't4-b5-q39',
      question: 'Bahan X ialah pepejal putih pada suhu bilik. Ia larut dalam air tetapi tidak larut dalam heksana. Larutan akueusnya menyalakan mentol. Apakah kemungkinan bahan X?',
      options: ['Naftalena', 'Magnesium klorida', 'Lilin parafin', 'Etanol'],
      answerIndex: 1,
      explanation: 'Magnesium klorida (MgCl₂) ialah sebatian ionik: larut dalam pelarut berkutub (air), tidak larut dalam pelarut organik (heksana), dan larutannya mengalirkan elektrik.',
      level: 'Sederhana'
    },
        {
      id: 't4-b5-q40',
      question: 'Mengapakah pepejal natrium klorida (NaCl) TIDAK mengkonduksikan arus elektrik?',
      options: [
        'Natrium klorida tidak mengandungi sebarang cas',
        'Ion-ion terikat ketat dalam struktur kekisi dan tidak bebas bergerak',
        'Elektron dinyahsetempatkan bergerak terlalu perlahan',
        'NaCl ialah penebat kovalen'
      ],
      answerIndex: 1,
      explanation: 'Dalam keadaan pepejal, ion Na⁺ dan Cl⁻ diikat kemas dalam struktur kekisi dan tidak bebas bergerak untuk mengalirkan arus elektrik.',
      level: 'Sederhana'
    },
        {
      id: 't4-b5-q41',
      question: 'Silikon dioksida (SiO₂) ialah sebatian kovalen gergasi dengan takat lebur melebihi 1600°C. Mengapakah takat leburnya amat tinggi berbanding karbon dioksida (CO₂)?',
      options: [
        'SiO₂ dipegang oleh daya elektrostatik ionik',
        'Semua atom silikon dan oksigen dihubungkan oleh jaringan ikatan kovalen 3D yang banyak dan sangat kuat',
        'Molekul SiO₂ mempunyai ikatan hidrogen yang meluas',
        'Silikon ialah logam yang mulur'
      ],
      answerIndex: 1,
      explanation: 'SiO₂ mempunyai struktur kovalen gergasi di mana meleburkannya memerlukan pemutusan ikatan kovalen yang banyak dan kuat di seluruh struktur kekisi 3D.',
      level: 'Sederhana'
    },
        {
      id: 't4-b5-q42',
      question: 'Seorang juruteknik ingin memilih pelarut untuk membersihkan sisa gris minyak enjin (hidrokarbon tak berkutub). Mengapakah air gagal menanggalkan gris tersebut manakala pelarut organik seperti heksana berjaya?',
      options: [
        'Air bertindak balas dengan gris membentuk mendakan pepejal',
        'Gris ialah sebatian kovalen tak berkutub yang hanya larut dalam pelarut tak berkutub (organik), selaras dengan prinsip "like dissolves like"',
        'Heksana memecahkan ikatan kovalen C–C dalam molekul gris menjadi gas',
        'Air mempunyai ketumpatan yang lebih tinggi daripada gris'
      ],
      answerIndex: 1,
      explanation: 'Air ialah pelarut berkutub yang tidak dapat melarutkan sebatian kovalen tak berkutub seperti minyak gris. Sebatian kovalen tak berkutub larut dalam pelarut organik bukan kutub seperti heksana.',
      level: 'Tinggi (KBAT)'
    }
      ]
    }
  ]
};
