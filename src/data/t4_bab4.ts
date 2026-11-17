import { Chapter } from '../types/nota';

export const T4_BAB4: Chapter = {
  id: 't4-b4',
  form: 'T4',
  chapterNumber: 4,
  title: 'Jadual Berkala Unsur',
  theme: 'Interaksi Antara Jirim',
  durationMinutes: 120,
  description: 'Sejarah perkembangan Jadual Berkala Unsur, prinsip susunan moden berasaskan nombor proton, Kumpulan 18 (gas nadir), Kumpulan 1 (logam alkali), Kumpulan 17 (halogen), perubahan sifat fizik dan kimia oksida merentasi Kala 3, serta 4 ciri istimewa unsur peralihan.',
  iconName: 'Columns',
  subtopicCount: 7,
  subtopics: [
    // -------------------------------------------------------------------------
    // SUBTOPIK 4.1
    // -------------------------------------------------------------------------
    {
      id: 't4-b4-s1',
      code: '4.1',
      title: 'Perkembangan Jadual Berkala Unsur',
      learningStandard: 'SP 4.1.1, 4.1.2',
      durationMinutes: 15,
      tldr: [
        'Sejarah pengelasan unsur bermula daripada Antoine Lavoisier (1789) hingga Henry Moseley (1914).',
        'Johann Dobereiner memperkenalkan Kumpulan Tiga Unsur (Triad Dobereiner) dengan sifat kimia serupa.',
        'John Newlands mengemukakan Hukum Oktaf (sifat berulang pada setiap unsur kelapan).',
        'Dmitri Mendeleev menyusun unsur mengikut jisim atom dan meninggalkan ruang kosong bagi unsur yang belum ditemui (meramal sifatnya dengan tepat).',
        'Henry Moseley mengasaskan Jadual Berkala Unsur moden dengan menyusun unsur mengikut peningkatan nombor proton.'
      ],
      concepts: [
        {
          id: 't4-b4-s1-c1',
          title: 'Kronologi Sejarah Sumbangan 6 Tokoh Sains Jadual Berkala',
          badge: 'Sejarah Sains SPM',
          content: `
            <p>
              Pengelasan unsur berlaku secara berperingkat seiring dengan penemuan unsur baharu:
            </p>
            <div class="space-y-2.5 mt-2">
              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-sky-800">1. Antoine Lavoisier (1789)</span>
                <p class="text-slate-600 mt-0.5">
                  Mengelaskan 33 unsur kepada 4 kumpulan: gas, bukan logam, logam, dan tanah. Kelemahan: memasukkan haba dan cahaya yang bukan jirim ke dalam jadual.
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-indigo-800">2. Johann W. Dobereiner (1829)</span>
                <p class="text-slate-600 mt-0.5">
                  Membahagikan unsur kepada kumpulan 3 unsur dinamakan <span class="blur-target"><b>Triad Dobereiner</b></span>. Jisim atom unsur tengah lebih kurang purata jisim atom dua unsur lain (cth: Li=7, Na=23, K=39 di mana (7+39)/2 = 23).
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-teal-800">3. John Newlands (1864)</span>
                <p class="text-slate-600 mt-0.5">
                  Menyusun unsur mengikut peningkatan jisim atom dan mendapati sifat kimia berulang pada setiap unsur kelapan (<span class="blur-target"><b>Hukum Oktaf</b></span>). Hanya sah untuk 17 unsur pertama.
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-amber-800">4. Lothar Meyer (1870)</span>
                <p class="text-slate-600 mt-0.5">
                  Memplot graf isi padu atom melawan jisim atom. Menunjukkan unsur dengan sifat kimia serupa menempati kedudukan yang setara pada lengkung graf (cth: Li, Na, K pada puncak).
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-rose-800">5. Dmitri Mendeleev (1869)</span>
                <p class="text-slate-600 mt-0.5">
                  Menyusun unsur mengikut jisim atom menaik dan sifat kimia serupa dalam lajur menegak. <span class="blur-target"><b>Meninggalkan ruang kosong bagi unsur yang belum ditemui</b></span> (seperti eka-silikon / Germanium) dan berjaya meramalkan sifatnya dengan tepat.
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-slate-900 text-white text-xs">
                <span class="font-bold text-sky-300">6. Henry Moseley (1914) - Asas Jadual Moden</span>
                <p class="text-slate-300 mt-0.5">
                  Mengkaji frekuensi sinar-X yang dipancarkan oleh logam dan menyusun unsur mengikut <span class="blur-target"><b>peningkatan nombor proton</b></span>, membetulkan anomali susunan Mendeleev.
                </p>
              </div>
            </div>

            <div class="p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 mt-2 font-medium">
              💡 <b>Mnemonik Kronologi Ahli Sains:</b>
              <br />
              <span class="font-bold text-indigo-800">"Lepas Datuk Naik Motosikal, Mak Marah"</span>
              <br />
              <b>L</b>avoisier → <b>D</b>obereiner → <b>N</b>ewlands → <b>M</b>eyer → <b>M</b>endeleev → <b>M</b>oseley.
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menyatakan bahawa Jadual Berkala Unsur moden disusun mengikut peningkatan jisim atom relatif.',
          correction: 'Jadual Berkala Unsur moden disusun mengikut peningkatan nombor proton (bukan jisim atom!).',
          why: 'Moseley mendapati nombor proton adalah sifat asas atom yang meningkat secara tertib nombor bulat.',
          spmTip: 'Mendeleev menyusun ikut jisim atom; Moseley menyusun ikut nombor proton.'
        }
      ],
      flashcards: [
        {
          id: 't4-b4-s1-fc1',
          front: 'Apakah asas penyusunan unsur dalam Jadual Berkala Unsur moden?',
          back: 'Disusun mengikut tertib peningkatan nombor proton.'
        },
        {
          id: 't4-b4-s1-fc2',
          front: 'Apakah keistimewaan Jadual Berkala Mendeleev yang menjadikannya diterima meluas?',
          back: 'Beliau meninggalkan ruang kosong bagi unsur yang belum ditemui dan meramal sifat fizikal serta kimianya dengan sangat tepat.'
        },
        {
          id: 't4-b4-s1-fc3',
          front: 'Siapakah ahli sains yang memperkenalkan konsep Triad dalam pengelasan unsur?',
          back: 'Johann W. Dobereiner (1829).'
        },
        {
          id: 't4-b4-s1-fc4',
          front: 'Apakah Hukum Oktaf yang dikemukakan oleh John Newlands?',
          back: 'Sifat kimia dan fizikal yang serupa berulang pada setiap unsur kelapan apabila disusun mengikut peningkatan jisim atom.'
        },
        {
          id: 't4-b4-s1-fc5',
          front: 'Siapakah ahli sains yang memplot graf isi padu atom melawan jisim atom?',
          back: 'Lothar Meyer (1870).'
        }
      ],
      quiz: [
        {
          id: 't4-b4-s1-q1',
          question: 'Siapakah ahli sains yang menyusun unsur dalam Jadual Berkala Unsur mengikut tertib peningkatan nombor proton?',
          options: [
            'Dmitri Mendeleev',
            'John Newlands',
            'Henry Moseley',
            'Antoine Lavoisier'
          ],
          answerIndex: 2,
          explanation: 'Henry Moseley (1914) menyusun unsur mengikut peningkatan nombor proton berdasarkan kajian spektrum sinar-X.',
          level: 'Rendah',
          spmReference: 'SPM 2021 Kertas 1'
        },
        {
          id: 't4-b4-s1-q2',
          question: 'Satu triad Dobereiner terdiri daripada klorin (Ar = 35.5), bromin (Ar = X), dan iodin (Ar = 127). Berdasarkan prinsip Triad Dobereiner, berapakah anggaran jisim atom relatif bagi bromin, X?',
          options: [
            '45.5',
            '80.0',
            '81.25',
            '91.5'
          ],
          answerIndex: 2,
          explanation: 'Purata jisim dua unsur = (35.5 + 127) ÷ 2 = 162.5 ÷ 2 = 81.25 (hampir dengan Ar bromin sebenar iaitu 80).',
          level: 'Sederhana'
        },
        {
          id: 't4-b4-s1-q3',
          question: 'Apakah sumbangan terbesar Dmitri Mendeleev dalam pembinaan Jadual Berkala Unsur?',
          options: [
            'Menemui zarah neutron di dalam nukleus',
            'Meninggalkan ruang kosong untuk unsur yang belum ditemui dan meramal sifatnya',
            'Menemui konsep elektron valens dan petala',
            'Mengelaskan unsur kepada logam dan bukan logam sahaja'
          ],
          answerIndex: 1,
          explanation: 'Mendeleev meninggalkan ruang kosong untuk unsur yang belum ditemui seperti Germanium (eka-silikon) dan meramal sifatnya dengan tepat.',
          level: 'Rendah'
        },
        {
          id: 't4-b4-s1-q4',
          question: 'Antara berikut, yang manakah merupakan kelemahan pengelasan unsur oleh Antoine Lavoisier?',
          options: [
            'Menyusun unsur mengikut tertib abjad nama saintifik',
            'Memasukkan haba dan cahaya sebagai unsur kimia',
            'Menyusun unsur mengikut bilangan elektron valens',
            'Hanya mengelaskan 8 unsur pertama sahaja'
          ],
          answerIndex: 1,
          explanation: 'Lavoisier memasukkan cahaya dan kalori (haba) ke dalam jadual unsurnya, sedangkan kedua-duanya adalah bentuk tenaga, bukan jirim.',
          level: 'Rendah'
        },
        {
          id: 't4-b4-s1-q5',
          question: 'Hukum Oktaf Newlands menyatakan bahawa sifat unsur berulang pada setiap unsur kelapan. Mengapakah hukum ini gagal diterima sepenuhnya oleh ahli sains pada zamannya?',
          options: [
            'Hukum ini hanya benar untuk 17 unsur pertama sahaja',
            'Newlands tidak mengetahui tentang nombor proton',
            'Semua unsur yang disusun adalah bahan buatan makmal',
            'Newlands tidak menggunakan unit SI'
          ],
          answerIndex: 0,
          explanation: 'Hukum Oktaf hanya dapat diaplikasikan dengan tepat untuk 17 unsur pertama sehingga kalsium, dan gagal untuk unsur yang lebih berat.',
          level: 'Sederhana'
        },
        {
          id: 't4-b4-s1-q6',
          question: 'Mengapakah penyusunan unsur mengikut nombor proton oleh Moseley lebih tepat berbanding penyusunan mengikut jisim atom oleh Mendeleev?',
          options: [
            'Jisim atom sesuatu unsur dipengaruhi oleh kelimpahan isotop dan boleh songsang (cth: Ar Telurium 127.6 lebih berat daripada Iodin 126.9)',
            'Nombor proton sentiasa bernilai ganjil',
            'Jisim atom mudah berubah mengikut suhu dan tekanan',
            'Nombor proton hanya wujud pada logam sahaja'
          ],
          answerIndex: 0,
          explanation: 'Kewujudan isotop menyebabkan jisim atom relatif tidak sentiasa bertambah secara teratur (cth: Ar Te lebih besar daripada I, tetapi nombor proton Te=52 dan I=53). Susunan ikut nombor proton menyelesaikan percanggahan ini.',
          level: 'Tinggi (KBAT)',
          spmReference: 'SPM Kertas 2 Bahagian B'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // SUBTOPIK 4.2
    // -------------------------------------------------------------------------
    {
      id: 't4-b4-s2',
      code: '4.2',
      title: 'Susunan Unsur dalam Jadual Berkala Unsur Moden',
      learningStandard: 'SP 4.2.1, 4.2.2',
      durationMinutes: 20,
      tldr: [
        'Jadual Berkala Unsur moden mengandungi 18 lajur menegak yang dipanggil KUMPULAN dan 7 baris mendatar yang dipanggil KALA.',
        'Nombor Kumpulan ditentukan oleh bilangan ELEKTRON VALENS: 1 valens → Kumpulan 1; 2 valens → Kumpulan 2; 3–8 valens → Kumpulan (valens + 10).',
        'Nombor Kala ditentukan oleh bilangan PETALA YANG BERISI ELEKTRON.',
        'Unsur dalam kumpulan yang sama mempunyai sifat kimia yang serupa kerana bilangan elektron valensnya adalah sama.'
      ],
      concepts: [
        {
          id: 't4-b4-s2-c1',
          title: 'Kumpulan dan Kala dalam Jadual Berkala Unsur',
          badge: 'Prinsip Teras SPM',
          content: `
            <div class="space-y-3 mt-2">
              <div class="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-xs">
                <span class="font-bold text-sky-900 block text-sm">1. Kumpulan (Lajur Menegak, Kumpulan 1 hingga 18)</span>
                <p class="text-sky-950 mt-1">
                  Ditentukan oleh <span class="blur-target"><b>bilangan elektron valens</b></span> pada petala terluar atom:
                </p>
                <ul class="list-disc pl-5 space-y-1 text-slate-700 text-[11px] mt-1">
                  <li>1 elektron valens → <b>Kumpulan 1</b></li>
                  <li>2 elektron valens → <b>Kumpulan 2</b> (kecuali Helium: 2 elektron tetapi Kumpulan 18 kerana duplet stabil)</li>
                  <li>3 hingga 8 elektron valens → <b>Kumpulan (bilangan elektron valens + 10)</b>
                    <br />
                    <i>Contoh: Aluminium (2.8.3) mempunyai 3 elektron valens → Kumpulan 3 + 10 = <b>Kumpulan 13</b>.</i>
                  </li>
                </ul>
              </div>

              <div class="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs">
                <span class="font-bold text-indigo-900 block text-sm">2. Kala (Baris Mendatar, Kala 1 hingga 7)</span>
                <p class="text-indigo-950 mt-1">
                  Ditentukan oleh <span class="blur-target"><b>bilangan petala yang berisi elektron</b></span> dalam atom tersebut:
                </p>
                <div class="text-[11px] text-slate-700 font-mono mt-1">
                  Contoh: Klorin (nombor proton = 17) → susunan elektron = 2.8.7.
                  <br />
                  Bilangan petala berisi elektron = 3 petala → <b>Kala 3</b>.
                  <br />
                  Elektron valens = 7 → Kumpulan 7 + 10 = <b>Kumpulan 17</b>.
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menyatakan bahawa unsur dengan 4 elektron valens berada dalam Kumpulan 4.',
          correction: 'Bagi unsur dengan 3 hingga 8 elektron valens, nombor kumpulan ialah (elektron valens + 10). Contoh: 4 elektron valens = Kumpulan 14.',
          why: 'Kumpulan 3 hingga 12 diisi oleh blok unsur peralihan.',
          spmTip: 'Ingat rumus: Kumpulan = Elektron Valens + 10 (untuk valens 3 hingga 8).'
        }
      ],
      flashcards: [
        {
          id: 't4-b4-s2-fc1',
          front: 'Bagaimanakah nombor Kumpulan sesuatu unsur ditentukan daripada susunan elektronnya?',
          back: 'Daripada bilangan elektron valens. Jika 1 atau 2 → Kumpulan 1 atau 2. Jika 3 hingga 8 → Kumpulan (valens + 10).'
        },
        {
          id: 't4-b4-s2-fc2',
          front: 'Bagaimanakah nombor Kala sesuatu unsur ditentukan?',
          back: 'Daripada bilangan petala yang berisi elektron di dalam atom tersebut.'
        },
        {
          id: 't4-b4-s2-fc3',
          front: 'Tentukan Kumpulan dan Kala bagi atom kalsium (nombor proton = 20).',
          back: 'Susunan elektron = 2.8.8.2. Elektron valens = 2 → Kumpulan 2. Bilangan petala = 4 → Kala 4.'
        },
        {
          id: 't4-b4-s2-fc4',
          front: 'Mengapakah Helium yang mempunyai 2 elektron valens ditempatkan dalam Kumpulan 18 dan bukannya Kumpulan 2?',
          back: 'Kerana Helium mempunyai susunan elektron duplet yang penuh dan sangat stabil, mempunyai sifat lengai seperti gas nadir yang lain.'
        },
        {
          id: 't4-b4-s2-fc5',
          front: 'Mengapakah unsur dalam kumpulan yang sama menunjukkan sifat kimia yang serupa?',
          back: 'Kerana mempunyai bilangan elektron valens yang sama.'
        }
      ],
      quiz: [
        {
          id: 't4-b4-s2-q1',
          question: 'Suatu atom unsur X mempunyai nombor proton 15. Di manakah kedudukan unsur X dalam Jadual Berkala Unsur?',
          options: [
            'Kumpulan 5, Kala 3',
            'Kumpulan 15, Kala 3',
            'Kumpulan 3, Kala 5',
            'Kumpulan 15, Kala 2'
          ],
          answerIndex: 1,
          explanation: 'Nombor proton 15 → susunan elektron = 2.8.5. Bilangan elektron valens = 5 → Kumpulan 5 + 10 = Kumpulan 15. Bilangan petala berisi elektron = 3 → Kala 3.',
          level: 'Rendah',
          spmReference: 'SPM 2021 Kertas 1'
        },
        {
          id: 't4-b4-s2-q2',
          question: 'Ion Y²⁻ mempunyai susunan elektron 2.8.8. Di manakah kedudukan atom Y dalam Jadual Berkala Unsur?',
          options: [
            'Kumpulan 16, Kala 3',
            'Kumpulan 18, Kala 3',
            'Kumpulan 2, Kala 4',
            'Kumpulan 16, Kala 4'
          ],
          answerIndex: 0,
          explanation: 'Ion Y²⁻ telah menerima 2 elektron untuk menjadi 2.8.8 (18 elektron). Maka atom neutral Y mempunyai 18 - 2 = 16 elektron (susunan 2.8.6). Elektron valens = 6 → Kumpulan 16. Bilangan petala = 3 → Kala 3 (iaitu Sulfur).',
          level: 'Sederhana',
          spmReference: 'Percubaan SPM SBP 2022'
        },
        {
          id: 't4-b4-s2-q3',
          question: 'Antara pasangan unsur berikut, yang manakah berada dalam KUMPULAN yang sama?',
          options: [
            '²³₁₁Na dan ²⁴₁₂Mg',
            '¹²₆C dan ²⁸₁₄Si',
            '¹⁴₇N dan ³²₁₆S',
            '¹⁹₉F dan ⁴⁰₂₀Ca'
          ],
          answerIndex: 1,
          explanation: 'C (2.4) dan Si (2.8.4) kedua-duanya mempunyai 4 elektron valens, maka berada dalam kumpulan yang sama iaitu Kumpulan 14.',
          level: 'Sederhana'
        },
        {
          id: 't4-b4-s2-q4',
          question: 'Berapakah bilangan Kumpulan dan bilangan Kala yang terdapat dalam Jadual Berkala Unsur moden?',
          options: [
            '8 Kumpulan dan 7 Kala',
            '18 Kumpulan dan 7 Kala',
            '18 Kumpulan dan 8 Kala',
            '7 Kumpulan dan 18 Kala'
          ],
          answerIndex: 1,
          explanation: 'Jadual Berkala Unsur moden terdiri daripada 18 Kumpulan (lajur menegak) dan 7 Kala (baris mendatar).',
          level: 'Rendah'
        },
        {
          id: 't4-b4-s2-q5',
          question: 'Unsur Z membentuk sebatian dengan formula Z₂O₃. Jika Z terletak dalam Kala 3, apakah susunan elektron bagi atom Z?',
          options: [
            '2.3',
            '2.8.3',
            '2.8.5',
            '2.8.8.3'
          ],
          answerIndex: 1,
          explanation: 'Formula Z₂O₃ menunjukkan ion Z mempunyai cas +3 (Z³⁺). Maka atom Z mempunyai 3 elektron valens. Dalam Kala 3 (3 petala), susunan elektronnya ialah 2.8.3 (Aluminium).',
          level: 'Tinggi (KBAT)',
          spmReference: 'SPM 2023 Kertas 1'
        },
        {
          id: 't4-b4-s2-q6',
          question: 'Pernyataan manakah yang menerangkan mengapa unsur dalam Kumpulan 1 menunjukkan sifat kimia yang serupa?',
          options: [
            'Mempunyai nombor nukleon yang hampir sama',
            'Semua unsur Kumpulan 1 mempunyai satu elektron valens yang mudah didermakan',
            'Semua unsur Kumpulan 1 wujud dalam fasa cecair pada suhu bilik',
            'Mempunyai takat lebur yang melebihi 1000°C'
          ],
          answerIndex: 1,
          explanation: 'Sifat kimia ditentukan oleh elektron valens. Semua unsur Kumpulan 1 mempunyai 1 elektron valens dan bertindak balas dengan melepaskan 1 elektron tersebut.',
          level: 'Rendah'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // SUBTOPIK 4.3
    // -------------------------------------------------------------------------
    {
      id: 't4-b4-s3',
      code: '4.3',
      title: 'Unsur dalam Kumpulan 18 (Gas Nadir)',
      learningStandard: 'SP 4.3.1, 4.3.2, 4.3.3',
      durationMinutes: 15,
      tldr: [
        'Kumpulan 18 (Gas Nadir): Helium (He), Neon (Ne), Argon (Ar), Kripton (Kr), Xenon (Xe), Radon (Rn).',
        'Wujud sebagai gas monoatom (atom tunggal) yang bersifat lengai secara kimia kerana mempunyai susunan elektron duplet stabil (He: 2) atau oktet stabil (Ne, Ar, Kr, Xe: 8).',
        'Menuruni Kumpulan 18: Saiz atom bertambah, daya tarikan Van der Waals semakin kuat → takat lebur dan takat didih meningkat, ketumpatan meningkat.',
        'Kegunaan SPM: He (belon kaji cuaca), Ne (lampu iklan beraneka warna), Ar (mentol elektrik), Kr (lampu kilat kamera), Xe (anestetik & lampu rumah api), Rn (radioterapi kanser).'
      ],
      concepts: [
        {
          id: 't4-b4-s3-c1',
          title: 'Kestabilan dan Kelengaian Gas Nadir',
          badge: 'Fakta Wajib SPM',
          content: `
            <p>
              Gas nadir wujud sebagai <b>gas monoatom</b> dan bersifat sangat <b>lengai secara kimia</b> (tidak reaktif) kerana:
            </p>
            <ul class="list-disc pl-5 space-y-1 text-xs text-slate-700 mt-1">
              <li>
                Helium mempunyai susunan elektron <span class="blur-target"><b>duplet yang stabil</b></span> (petala pertama berisi 2 elektron).
              </li>
              <li>
                Neon, Argon, Kripton, Xenon dan Radon mempunyai susunan elektron <span class="blur-target"><b>oktet yang stabil</b></span> (petala terluar berisi 8 elektron).
              </li>
            </ul>
            <p class="text-xs text-slate-700 mt-2">
              Kerana petala terluar telah penuh, atom gas nadir <b>tidak perlu menderma, menerima atau berkongsi elektron</b> dengan atom lain.
            </p>
          `
        },
        {
          id: 't4-b4-s3-c2',
          title: 'Perubahan Sifat Fizik Menuruni Kumpulan 18 & Kegunaan Harian',
          badge: 'Aplikasi SPM',
          content: `
            <p>
              Apabila <b>menuruni Kumpulan 18</b> dari Helium ke Radon:
            </p>
            <ol class="list-decimal pl-5 space-y-1 text-xs text-slate-700 mt-1">
              <li>Saiz jejari atom bertambah kerana bilangan petala berisi elektron bertambah.</li>
              <li>
                <b>Takat lebur dan takat didih meningkat:</b> Saiz atom semakin besar menyebabkan <span class="blur-target"><b>daya tarikan Van der Waals antara atom semakin kuat</b></span>, maka lebih banyak tenaga haba diperlukan untuk mengatasinya.
              </li>
              <li>Ketumpatan gas bertambah kerana pertambahan jisim atom adalah lebih besar daripada pertambahan isi padu.</li>
            </ol>
          `,
          comparisonTable: {
            headers: ['Gas Nadir', 'Kegunaan Penting SPM'],
            rows: [
              ['<b>Helium (He)</b>', 'Mengisi belon udara panas dan belon kaji cuaca (ringan dan tidak mudah terbakar berbanding hidrogen). Campuran gas pernafasan penyelam laut dalam.'],
              ['<b>Neon (Ne)</b>', 'Mengisi lampu papan iklan komersial (menghasilkan nyalaan jingga kemerahan terang).'],
              ['<b>Argon (Ar)</b>', 'Mengisi mentol filamen elektrik tungsten untuk menyediakan atmosfera lengai dan mengelakkan filamen terbakar pada suhu tinggi.'],
              ['<b>Kripton (Kr)</b>', 'Lampu kilat fotografi berkelajuan tinggi dan lampu pandu pendaratan landasan kapal terbang.'],
              ['<b>Xenon (Xe)</b>', 'Lampu hadapan kereta berkuasa tinggi (lampu xenon), lampu rumah api, dan agen anestetik pembedahan.'],
              ['<b>Radon (Rn)</b>', 'Gas radioaktif yang digunakan dalam radioterapi untuk merawat penyakit kanser.']
            ]
          }
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menyatakan formula gas nadir sebagai molekul dwiatom seperti Ar₂ atau He₂.',
          correction: 'Semua gas nadir wujud sebagai atom tunggal (monoatom): He, Ne, Ar, Kr, Xe, Rn.',
          why: 'Susunan duplet dan oktet yang sudah stabil menghalang atom gas nadir daripada berkongsi elektron membentuk ikatan kovalen sesama sendiri.',
          spmTip: 'Jangan tulis subskrip 2 untuk gas nadir!'
        }
      ],
      flashcards: [
        {
          id: 't4-b4-s3-fc1',
          front: 'Mengapakah unsur-unsur Kumpulan 18 bersifat lengai secara kimia?',
          back: 'Kerana mempunyai susunan elektron duplet (Helium) atau oktet (unsur lain) yang sangat stabil pada petala terluar.'
        },
        {
          id: 't4-b4-s3-fc2',
          front: 'Terangkan mengapa takat didih meningkat apabila menuruni Kumpulan 18.',
          back: 'Saiz atom bertambah → daya tarikan Van der Waals antara atom semakin kuat → lebih banyak tenaga haba diperlukan untuk mengatasinya.'
        },
        {
          id: 't4-b4-s3-fc3',
          front: 'Apakah kelebihan gas helium berbanding gas hidrogen dalam mengisi belon kaji cuaca?',
          back: 'Helium tidak mudah terbakar (tidak reaktif) berbanding gas hidrogen yang sangat mudah meletup.'
        },
        {
          id: 't4-b4-s3-fc4',
          front: 'Apakah gas nadir yang digunakan untuk mengisi mentol filamen elektrik dan mengapakah ia digunakan?',
          back: 'Gas Argon (Ar), kerana ia lengai dan menghalang filamen tungsten daripada terbakar pada suhu tinggi.'
        },
        {
          id: 't4-b4-s3-fc5',
          front: 'Namakan gas nadir yang digunakan dalam bidang perubatan untuk rawatan kanser.',
          back: 'Gas Radon (Rn) yang bersifat radioaktif.'
        }
      ],
      quiz: [
        {
          id: 't4-b4-s3-q1',
          question: 'Antara gas berikut, yang manakah wujud sebagai gas monoatom pada suhu bilik?',
          options: [
            'Oksigen',
            'Klorin',
            'Argon',
            'Nitrogen'
          ],
          answerIndex: 2,
          explanation: 'Argon ialah gas nadir Kumpulan 18 yang mempunyai susunan oktet stabil (2.8.8) dan wujud sebagai atom tunggal (monoatom).',
          level: 'Rendah'
        },
        {
          id: 't4-b4-s3-q2',
          question: 'Mengapakah takat lebur dan takat didih unsur Kumpulan 18 meningkat apabila menuruni kumpulan daripada Helium ke Radon?',
          options: [
            'Bilangan elektron valens semakin bertambah',
            'Daya tarikan Van der Waals antara atom semakin kuat apabila saiz atom bertambah',
            'Ketumpatan gas semakin berkurang',
            'Cas nukleus atom menjadi neutral'
          ],
          answerIndex: 1,
          explanation: 'Menuruni kumpulan, saiz atom bertambah menyebabkan daya tarikan antara atom (daya Van der Waals) semakin kuat. Lebih banyak haba diperlukan untuk mengatasinya.',
          level: 'Sederhana',
          spmReference: 'SPM 2021 Kertas 1'
        },
        {
          id: 't4-b4-s3-q3',
          question: 'Gas nadir manakah yang digunakan di dalam lampu papan iklan untuk menghasilkan cahaya jingga-kemerahan yang terang?',
          options: [
            'Helium',
            'Neon',
            'Kripton',
            'Xenon'
          ],
          answerIndex: 1,
          explanation: 'Gas Neon (Ne) menghasilkan cahaya jingga-kemerahan yang terang apabila arus elektrik dialirkan melaluinya pada voltan tinggi.',
          level: 'Rendah'
        },
        {
          id: 't4-b4-s3-q4',
          question: 'Campuran gas helium dan oksigen digunakan oleh penyelam laut dalam. Mengapakah gas helium dipilih berbanding gas nitrogen biasa?',
          options: [
            'Helium tidak larut dalam darah pada tekanan tinggi dan mengelakkan penyakit dekompresi (the bends)',
            'Helium membekalkan lebih banyak tenaga haba kepada penyelam',
            'Helium bertindak balas dengan asid laktik dalam otot',
            'Helium menukarkan air laut kepada air tawar'
          ],
          answerIndex: 0,
          explanation: 'Helium mempunyai keterlarutan yang sangat rendah di dalam darah pada tekanan tinggi, mencegah pembentukan gelembung gas nitrogen yang berbahaya (penyakit bends).',
          level: 'Tinggi (KBAT)',
          spmReference: 'Soalan KBAT Aplikasi Kumpulan 18'
        },
        {
          id: 't4-b4-s3-q5',
          question: 'Apakah susunan elektron bagi atom gas kripton jika nombor protonnya ialah 36?',
          options: [
            '2.8.18.8',
            '2.8.8.18',
            '2.18.8.8',
            '2.8.8.8'
          ],
          answerIndex: 0,
          explanation: 'Kripton mempunyai 36 elektron. Susunan elektronnya ialah 2.8.18.8, dengan 8 elektron valens pada petala terluar (oktet stabil).',
          level: 'Sederhana'
        },
        {
          id: 't4-b4-s3-q6',
          question: 'Mengapakah sebatian Xenon seperti XeF₄ boleh disintesis dalam makmal sedangkan gas nadir dikatakan lengai?',
          options: [
            'Xenon mempunyai saiz atom yang sangat besar sehingga tarikan nukleus terhadap elektron terluar menjadi lemah dan boleh bertindak balas dengan unsur sangat elektronegatif',
            'Xenon ialah unsur logam alkali',
            'Xenon tidak mempunyai sebarang neutron di dalam nukleus',
            'Xenon hanya stabil pada suhu di bawah sifar mutlak'
          ],
          answerIndex: 0,
          explanation: 'Xenon mempunyai jejari atom yang besar, menyebabkan elektron terluarnya kurang ditarik oleh nukleus dan boleh bertindak balas dengan unsur yang sangat elektronegatif seperti fluorin.',
          level: 'Tinggi (KBAT)'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // SUBTOPIK 4.4
    // -------------------------------------------------------------------------
    {
      id: 't4-b4-s4',
      code: '4.4',
      title: 'Unsur dalam Kumpulan 1 (Logam Alkali)',
      learningStandard: 'SP 4.4.1, 4.4.2, 4.4.3, 4.4.4',
      durationMinutes: 20,
      tldr: [
        'Kumpulan 1 (Logam Alkali): Litium (Li), Natrium (Na), Kalium (K), Rubidium (Rb), Sesium (Cs), Fransium (Fr). Mempunyai 1 elektron valens.',
        'Sifat fizik: Logam kelabu berkilat, lembut (boleh dipotong dengan pisau), ketumpatan rendah (Li, Na, K terapung atas air), dan takat lebur rendah untuk logam.',
        'Sifat kimia: Bertindak balas cergas dengan air menghasilkan larutan hidroksida logam beralkali (pH > 7) dan gas hidrogen (H₂). Membakar dalam gas oksigen membentuk oksida logam pepejal putih.',
        'Kereaktifan BERTAMBAH apabila menuruni Kumpulan 1 (Li < Na < K < Rb < Cs): Saiz atom bertambah → elektron valens semakin jauh dari nukleus → daya tarikan nukleus semakin lemah → atom lebih mudah melepaskan satu elektron valens.'
      ],
      simulationRef: {
        id: 'kereaktifan-k1-dan-k17',
        title: 'Makmal Maya Kereaktifan Logam Alkali (Kumpulan 1)',
        description: 'Bandingkan kecergasan tindak balas Litium, Natrium, dan Kalium dengan air dan gas oksigen secara interaktif.',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=kereaktifan-k1-dan-k17',
        previewBadge: 'Simulasi Bab 4.4'
      },
      concepts: [
        {
          id: 't4-b4-s4-c1',
          title: 'Sifat Fizik dan Pengendalian Selamat Logam Alkali',
          badge: 'Keselamatan Makmal',
          content: `
            <p>
              Logam Kumpulan 1 dikenali sebagai <b>logam alkali</b> kerana hasil tindak balasnya dengan air membentuk larutan beralkali kuat:
            </p>
            <ul class="list-disc pl-5 space-y-1 text-xs text-slate-700 mt-1">
              <li>Logam kelabu berkilat apabila baru dipotong tetapi cepat pudar di udara kerana teroksida.</li>
              <li>Sangat lembut dan boleh dipotong dengan mudah menggunakan pisau lipat.</li>
              <li>Ketumpatan sangat rendah (Li, Na, dan K mempunyai ketumpatan lebih rendah daripada air, maka ia terapung).</li>
              <li>Mempunyai takat lebur dan takat didih yang relatif rendah berbanding logam lain.</li>
            </ul>
            <div class="p-3 rounded-2xl bg-rose-50 border border-rose-300 text-xs text-rose-950 mt-2">
              🚨 <b>Langkah Keselamatan Wajib SPM:</b> Logam Kumpulan 1 mesti disimpan terendam di dalam <b>minyak parafin</b>. Semasa memotong, guna forsep (jangan pegang dengan tangan!) dan keringkan minyak menggunakan kertas turas sebelum eksperimen. Gunakan ketulan kecil sahaja (saiz biji kacang hijau).
            </div>
          `
        },
        {
          id: 't4-b4-s4-c2',
          title: '3 Tindak Balas Kimia Kumpulan 1 & Persamaan Berimbang',
          badge: 'Persamaan Kimia Wajib SPM',
          content: `
            <div class="space-y-3 mt-2">
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-sky-800 text-sm">1. Tindak Balas dengan Air (H₂O)</span>
                <p class="text-slate-600 mt-0.5">
                  Menghasilkan larutan hidroksida logam yang bersifat alkali kuat (menukarkan kertas litmus merah kepada biru / fenolftalein menjadi merah jambu) dan membebaskan gas hidrogen ($H_2$):
                </p>
                <div class="p-2 rounded-xl bg-slate-900 text-sky-300 font-mono text-center my-1">
                  2Na (s) + 2H₂O (l) → 2NaOH (aq) + H₂ (g)
                </div>
                <div class="text-[11px] text-slate-600 space-y-0.5 mt-1">
                  • <b>Litium (Li):</b> Bergerak perlahan di atas permukaan air dengan desiran lembut.<br />
                  • <b>Natrium (Na):</b> Bergerak pantas di atas permukaan air, melebur menjadi bebola berkilat dengan desiran kuat.<br />
                  • <b>Kalium (K):</b> Bergerak teramat pantas, bernyala dengan nyalaan ungu (lilac) dan meletup kecil.
                </div>
              </div>

              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-indigo-800 text-sm">2. Tindak Balas dengan Gas Oksigen (O₂)</span>
                <p class="text-slate-600 mt-0.5">
                  Logam dipanaskan sehingga membakar dan dimasukkan ke dalam balang gas berisi oksigen. Membakar menghasilkan <span class="blur-target"><b>pepejal putih oksida logam</b></span>:
                </p>
                <div class="p-2 rounded-xl bg-slate-900 text-indigo-300 font-mono text-center my-1">
                  4Na (s) + O₂ (g) → 2Na₂O (s)
                </div>
              </div>

              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-teal-800 text-sm">3. Tindak Balas dengan Gas Klorin (Cl₂)</span>
                <p class="text-slate-600 mt-0.5">
                  Membakar dalam gas klorin menghasilkan pepejal putih garam klorida logam:
                </p>
                <div class="p-2 rounded-xl bg-slate-900 text-teal-300 font-mono text-center my-1">
                  2Na (s) + Cl₂ (g) → 2NaCl (s)
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't4-b4-s4-c3',
          title: 'Penerangan Skema SPM: Mengapa Kereaktifan Bertambah Menuruni Kumpulan 1',
          badge: 'Soalan Esei Emas SPM',
          content: `
            <p>
              Kereaktifan bertambah dalam susunan: <span class="blur-target"><b>Li &lt; Na &lt; K &lt; Rb &lt; Cs</b></span>. Hujah skema pemarkahan SPM 4 markah:
            </p>
            <ol class="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 mt-2">
              <li>Apabila menuruni Kumpulan 1, bilangan petala berisi elektron bertambah, maka <span class="blur-target"><b>saiz jejari atom bertambah besar</b></span>.</li>
              <li>Satu elektron valens pada petala terluar terletak <span class="blur-target"><b>semakin jauh daripada nukleus</b></span> atom.</li>
              <li>Kesan perisaian oleh petala dalam bertambah, menyebabkan <span class="blur-target"><b>daya tarikan elektrostatik antara nukleus positif dengan elektron valens semakin lemah</b></span>.</li>
              <li>Oleh itu, atom <span class="blur-target"><b>semakin mudah melepaskan / mendermakan satu elektron valens</b></span> tersebut untuk mencapai susunan elektron oktet yang stabil.</li>
            </ol>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menyatakan kereaktifan Kumpulan 1 bertambah kerana "tarikan nukleus semakin kuat".',
          correction: 'Daya tarikan nukleus terhadap elektron valens semakin LEMAH apabila menuruni kumpulan kerana jarak dan kesan perisaian bertambah.',
          why: 'Logam bertindak balas dengan melepaskan elektron. Tarikan yang lebih lemah memudahkan pendermaan elektron.',
          spmTip: 'Untuk logam Kumpulan 1: Kereaktifan ↑ = Lebih mudah DERMA elektron = Tarikan nukleus lebih LEMAH.'
        }
      ],
      flashcards: [
        {
          id: 't4-b4-s4-fc1',
          front: 'Bagaimanakah corak kereaktifan logam alkali apabila menuruni Kumpulan 1?',
          back: 'Kereaktifan bertambah daripada Litium ke Sesium (Li < Na < K < Rb < Cs).'
        },
        {
          id: 't4-b4-s4-fc2',
          front: 'Apakah hasil tindak balas apabila ketulan natrium bertindak balas dengan air?',
          back: 'Larutan natrium hidroksida (NaOH) yang beralkali dan gas hidrogen (H₂).'
        },
        {
          id: 't4-b4-s4-fc3',
          front: 'Apakah warna nyalaan yang diperhatikan apabila kalium bertindak balas cergas dengan air?',
          back: 'Nyalaan ungu (lilac flame).'
        },
        {
          id: 't4-b4-s4-fc4',
          front: 'Mengapakah logam alkali seperti natrium mesti disimpan di dalam minyak parafin?',
          back: 'Untuk menghalang tindak balas dengan oksigen dan wap air dalam udara.'
        },
        {
          id: 't4-b4-s4-fc5',
          front: 'Terangkan mengapa kalium lebih reaktif berbanding natrium.',
          back: 'Saiz atom kalium lebih besar → elektron valens lebih jauh dari nukleus → tarikan nukleus lebih lemah → kalium lebih mudah menderma 1 elektron valens.'
        }
      ],
      quiz: [
        {
          id: 't4-b4-s4-q1',
          question: 'Persamaan berikut mewakili tindak balas antara kalium dengan air: 2K + 2H₂O → 2X + Y. Apakah X dan Y?',
          options: [
            'X: K₂O, Y: H₂',
            'X: KOH, Y: H₂',
            'X: KOH, Y: O₂',
            'X: KH, Y: O₂'
          ],
          answerIndex: 1,
          explanation: 'Tindak balas logam alkali dengan air menghasilkan larutan hidroksida logam (KOH) dan membebaskan gas hidrogen (H₂).',
          level: 'Rendah',
          spmReference: 'SPM 2021 Kertas 1'
        },
        {
          id: 't4-b4-s4-q2',
          question: 'Antara unsur Kumpulan 1 berikut, yang manakah bertindak balas PALING CERGAS dengan air sejuk?',
          options: [
            'Litium',
            'Natrium',
            'Kalium',
            'Rubidium'
          ],
          answerIndex: 3,
          explanation: 'Kereaktifan meningkat apabila menuruni Kumpulan 1. Rubidium (Rb) terletak paling bawah dalam pilihan yang diberi, maka paling reaktif.',
          level: 'Sederhana'
        },
        {
          id: 't4-b4-s4-q3',
          question: 'Mengapakah kereaktifan unsur Kumpulan 1 semakin bertambah apabila menuruni kumpulan?',
          options: [
            'Bilangan elektron valens bertambah',
            'Daya tarikan nukleus terhadap elektron valens semakin lemah kerana saiz atom bertambah besar',
            'Takat lebur logam semakin meningkat',
            'Keelektronegatifan atom semakin meningkat'
          ],
          answerIndex: 1,
          explanation: 'Apabila menuruni kumpulan, saiz atom bertambah menyebabkan elektron valens semakin jauh daripada nukleus dan daya tarikan elektrostatik semakin lemah. Oleh itu, elektron lebih mudah dilepaskan.',
          level: 'Sederhana',
          spmReference: 'Percubaan SPM Terengganu 2023'
        },
        {
          id: 't4-b4-s4-q4',
          question: 'Beberapa titis larutan fenolftalein ditambah ke dalam besen air selepas tindak balas ketulan natrium selesai. Apakah warna larutan yang terhasil?',
          options: [
            'Kekal tidak berwarna',
            'Bertukar menjadi merah jambu',
            'Bertukar menjadi biru',
            'Bertukar menjadi kuning'
          ],
          answerIndex: 1,
          explanation: 'Tindak balas menghasilkan larutan natrium hidroksida (NaOH) yang beralkali kuat (pH > 7). Penunjuk fenolftalein bertukar menjadi merah jambu dalam medium beralkali.',
          level: 'Rendah'
        },
        {
          id: 't4-b4-s4-q5',
          question: 'Sepotong kecil litium dipanaskan dalam balang gas berisi oksigen. Apakah pemerhatian yang betul bagi tindak balas ini?',
          options: [
            'Litium membakar dengan nyalaan merah menghasilkan pepejal putih',
            'Litium melebur menghasilkan cecair hitam pekat',
            'Litium meletup menghasilkan gas kuning kehijauan',
            'Tiada sebarang tindak balas berlaku'
          ],
          answerIndex: 0,
          explanation: 'Litium membakar dengan nyalaan merah terang menghasilkan serbuk pepejal putih litium oksida, Li₂O.',
          level: 'Sederhana'
        },
        {
          id: 't4-b4-s4-q6',
          question: 'Logam Fransium (Fr) terletak di bahagian paling bawah Kumpulan 1. Antara ramalan sifat berikut, yang manakah BENAR mengenai Fransium?',
          options: [
            'Mempunyai takat lebur yang lebih tinggi daripada Litium',
            'Mempunyai saiz jejari atom paling besar dan bertindak balas paling dahsyat/letupan kuat dengan air',
            'Mempunyai 7 elektron valens',
            'Wujud sebagai molekul dwiatom Fr₂'
          ],
          answerIndex: 1,
          explanation: 'Fransium berada di dasar Kumpulan 1: jejari atom paling besar, paling mudah menderma elektron valens, dan merupakan logam alkali paling reaktif.',
          level: 'Tinggi (KBAT)',
          spmReference: 'Soalan KBAT Meramal Sifat SPM'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // SUBTOPIK 4.5
    // -------------------------------------------------------------------------
    {
      id: 't4-b4-s5',
      code: '4.5',
      title: 'Unsur dalam Kumpulan 17 (Halogen)',
      learningStandard: 'SP 4.5.1, 4.5.2, 4.5.3, 4.5.4',
      durationMinutes: 20,
      tldr: [
        'Kumpulan 17 (Halogen): Fluorin (F₂), Klorin (Cl₂), Bromin (Br₂), Iodin (I₂), Astatin (At₂). Wujud sebagai molekul dwiatom neutral.',
        'Warna halogen menuruni kumpulan semakin gelap: F₂ (kuning pucat) → Cl₂ (kuning kehijauan) → Br₂ (cecair perang kemerahan) → I₂ (pepejal ungu kehitaman).',
        'Keadaan fizik pada suhu bilik berubah daripada gas (F₂, Cl₂) kepada cecair (Br₂) dan pepejal (I₂).',
        'Kereaktifan BERKURANG apabila menuruni Kumpulan 17 (F₂ > Cl₂ > Br₂ > I₂): Saiz atom bertambah → tarikan nukleus terhadap elektron luar semakin lemah → semakin sukar menarik satu elektron masuk.'
      ],
      concepts: [
        {
          id: 't4-b4-s5-c1',
          title: 'Sifat Fizik dan Keadaan Unsur Halogen',
          badge: 'Fakta Menuruni Kumpulan',
          content: `
            <p>
              Unsur Kumpulan 17 dikenali sebagai <b>halogen</b> (bermaksud "pembentuk garam"):
            </p>
          `,
          comparisonTable: {
            headers: ['Halogen', 'Formula', 'Warna', 'Keadaan Fizik pada 25°C'],
            rows: [
              ['Fluorin', 'F₂', 'Gas kuning pucat', 'Gas (sangat toksik & reaktif)'],
              ['Klorin', 'Cl₂', 'Gas kuning kehijauan', 'Gas (menyesakkan nafas)'],
              ['Bromin', 'Br₂', 'Cecair perang kemerahan', 'Cecair (mudah meruap jadi wap perang)'],
              ['Iodin', 'I₂', 'Pepejal ungu kehitaman', 'Pepejal (memejalwap jadi wap ungu)']
            ]
          }
        },
        {
          id: 't4-b4-s5-c2',
          title: 'Sifat Kimia Halogen & Tindak Balas dengan Besi (Fe)',
          badge: 'Eksperimen SPM',
          content: `
            <p>
              Semua halogen mempunyai <b>7 elektron valens</b>. Halogen bertindak balas dengan menerima 1 elektron membentuk ion halida ($X^-$) bercas -1.
            </p>
            <div class="space-y-2 mt-2">
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-sky-800">1. Tindak Balas dengan Wol Besi (Ferum, Fe):</span>
                <p class="text-slate-600 mt-0.5">
                  Membakar dalam gas halogen panas menghasilkan pepejal perang ferum(III) halida ($FeX_3$):
                </p>
                <div class="p-2 rounded-xl bg-slate-900 text-sky-300 font-mono text-center my-1">
                  2Fe (s) + 3Cl₂ (g) → 2FeCl₃ (s)
                </div>
                <div class="text-[11px] text-slate-600 mt-1">
                  • <b>Gas Klorin:</b> Wol besi terbakar dengan nyalaan terang dan cepat menghasilkan pepejal perang.<br />
                  • <b>Wap Bromin:</b> Wol besi membara dengan cergas.<br />
                  • <b>Wap Iodin:</b> Wol besi hanya membara malap dengan perlahan.
                </div>
              </div>

              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-indigo-800">2. Tindak Balas dengan Air:</span>
                <p class="text-slate-600 mt-0.5">
                  Membentuk asid hidroklorik dan asid hipoklorit yang mempunyai sifat peluntur (menukarkan kertas litmus biru menjadi merah dan kemudian melunturkannya menjadi putih):
                </p>
                <div class="p-2 rounded-xl bg-slate-900 text-indigo-300 font-mono text-center my-1">
                  Cl₂ (g) + H₂O (l) ⇌ HCl (aq) + HOCl (aq)
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't4-b4-s5-c3',
          title: 'Penerangan Skema SPM: Mengapa Kereaktifan Berkurang Menuruni Kumpulan 17',
          badge: 'Soalan Esei Emas SPM',
          content: `
            <p>
              Kereaktifan halogen berkurang dalam susunan: <span class="blur-target"><b>F₂ &gt; Cl₂ &gt; Br₂ &gt; I₂</b></span>. Hujah skema SPM 4 markah:
            </p>
            <ol class="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 mt-2">
              <li>Apabila menuruni Kumpulan 17, bilangan petala berisi elektron bertambah, maka <span class="blur-target"><b>saiz jejari atom bertambah besar</b></span>.</li>
              <li>Petala terluar berada <span class="blur-target"><b>semakin jauh daripada nukleus</b></span> atom.</li>
              <li>Daya tarikan elektrostatik antara nukleus positif untuk <span class="blur-target"><b>menarik satu elektron ke dalam petala terluar menjadi semakin lemah</b></span>.</li>
              <li>Oleh itu, keelektronegatifan berkurang dan atom <span class="blur-target"><b>semakin sukar untuk menerima satu elektron</b></span> bagi mencapai susunan oktet stabil.</li>
            </ol>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menganggap kereaktifan halogen bertambah menuruni kumpulan sama seperti Kumpulan 1.',
          correction: 'Kereaktifan halogen BERKURANG apabila menuruni Kumpulan 17 (terbalik dengan Kumpulan 1!).',
          why: 'Logam bertindak balas dengan melepaskan elektron, manakala halogen bertindak balas dengan menarik/menerima elektron.',
          spmTip: 'Kumpulan 1: Kereaktifan bertambah ke bawah. Kumpulan 17: Kereaktifan bertambah ke ATAS (Fluorin paling reaktif).'
        }
      ],
      flashcards: [
        {
          id: 't4-b4-s5-fc1',
          front: 'Nyatakan warna dan keadaan fizik bagi Bromin dan Iodin pada suhu bilik.',
          back: 'Bromin: Cecair perang kemerahan.\nIodin: Pepejal ungu kehitaman.'
        },
        {
          id: 't4-b4-s5-fc2',
          front: 'Bagaimanakah corak perubahan kereaktifan apabila menuruni Kumpulan 17?',
          back: 'Kereaktifan semakin berkurang (F₂ > Cl₂ > Br₂ > I₂).'
        },
        {
          id: 't4-b4-s5-fc3',
          front: 'Terangkan mengapa klorin lebih reaktif berbanding bromin.',
          back: 'Saiz atom klorin lebih kecil → petala terluar lebih dekat dengan nukleus → tarikan nukleus lebih kuat → lebih mudah menarik 1 elektron.'
        },
        {
          id: 't4-b4-s5-fc4',
          front: 'Tuliskan persamaan kimia bagi tindak balas antara gas klorin panas dengan wol besi.',
          back: '2Fe (s) + 3Cl₂ (g) → 2FeCl₃ (s) (menghasilkan ferum(III) klorida pepejal perang).'
        },
        {
          id: 't4-b4-s5-fc5',
          front: 'Apakah pemerhatian apabila kertas litmus biru lembap dimasukkan ke dalam air klorin?',
          back: 'Kertas litmus biru bertukar merah (berasid) dan kemudian terluntur menjadi putih (pelunturan oleh HOCl).'
        }
      ],
      quiz: [
        {
          id: 't4-b4-s5-q1',
          question: 'Antara halogen berikut, yang manakah wujud sebagai cecair pada suhu bilik?',
          options: [
            'Fluorin',
            'Klorin',
            'Bromin',
            'Iodin'
          ],
          answerIndex: 2,
          explanation: 'Bromin (Br₂) ialah satu-satunya halogen yang wujud sebagai cecair perang kemerahan pada suhu bilik.',
          level: 'Rendah',
          spmReference: 'SPM 2021 Kertas 1'
        },
        {
          id: 't4-b4-s5-q2',
          question: 'Antara berikut, halogen manakah yang mempunyai keelektronegatifan dan kereaktifan yang PALING TINGGI?',
          options: [
            'Fluorin',
            'Klorin',
            'Bromin',
            'Iodin'
          ],
          answerIndex: 0,
          explanation: 'Fluorin mempunyai saiz jejari atom paling kecil dalam Kumpulan 17, menghasilkan tarikan nukleus paling kuat untuk menarik elektron, menjadikannya paling elektronegatif dan paling reaktif.',
          level: 'Rendah'
        },
        {
          id: 't4-b4-s5-q3',
          question: 'Gas klorin dialirkan ke dalam air suling yang mengandungi kertas litmus biru lembap. Apakah pemerhatian yang berlaku ke atas kertas litmus tersebut?',
          options: [
            'Kekal biru tanpa sebarang perubahan',
            'Bertukar merah dan kemudian dilunturkan menjadi putih',
            'Bertukar menjadi warna hijau terang',
            'Bertukar menjadi ungu'
          ],
          answerIndex: 1,
          explanation: 'Tindak balas Cl₂ + H₂O menghasilkan HCl (asid menghidratkan litmus menjadi merah) dan HOCl (asid hipoklorit yang melunturkan warna litmus menjadi putih).',
          level: 'Sederhana',
          spmReference: 'Percubaan SPM SBP 2023'
        },
        {
          id: 't4-b4-s5-q4',
          question: 'Mengapakah kereaktifan halogen berkurang apabila menuruni Kumpulan 17 daripada klorin kepada iodin?',
          options: [
            'Daya tarikan nukleus untuk menarik satu elektron ke dalam petala terluar semakin lemah kerana saiz atom bertambah besar',
            'Jisim atom bertambah menyebabkan ketumpatan berkurang',
            'Halogen bertindak balas dengan melepaskan 7 elektron valens',
            'Takat lebur halogen semakin rendah'
          ],
          answerIndex: 0,
          explanation: 'Menuruni kumpulan, jejari atom bertambah besar dan kesan perisaian bertambah, menyebabkan tarikan nukleus terhadap elektron dari luar semakin lemah. Maka semakin sukar menarik 1 elektron.',
          level: 'Sederhana'
        },
        {
          id: 't4-b4-s5-q5',
          question: 'Apakah hasil pepejal perang yang terbentuk apabila wol besi panas dibakar dalam gas klorin kering?',
          options: [
            'FeCl',
            'FeCl₂',
            'FeCl₃',
            'Fe₂O₃'
          ],
          answerIndex: 2,
          explanation: 'Klorin ialah agen pengoksidaan yang kuat, mengoksidakan besi secara terus kepada keadaan pengoksidaan +3 membentuk pepejal perang ferum(III) klorida, FeCl₃.',
          level: 'Sederhana'
        },
        {
          id: 't4-b4-s5-q6',
          question: 'Astatin (At) ialah unsur halogen radioaktif yang terletak di bawah Iodin. Antara berikut, yang manakah ramalan sifat bagi Astatin yang paling tepat?',
          options: [
            'Wujud sebagai gas berwarna kuning cerah pada suhu bilik',
            'Mempunyai takat lebur yang lebih tinggi daripada iodin dan kurang reaktif daripada iodin',
            'Bertindak balas dengan air lebih cergas daripada klorin',
            'Mempunyai jejari atom lebih kecil daripada klorin'
          ],
          answerIndex: 1,
          explanation: 'Menuruni Kumpulan 17, saiz atom bertambah dan daya tarikan Van der Waals semakin kuat, menjadikan takat lebur Astatin paling tinggi (pepejal hitam) dan kereaktifannya paling rendah.',
          level: 'Tinggi (KBAT)',
          spmReference: 'Soalan KBAT Meramal Sifat Unsur SPM'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // SUBTOPIK 4.6
    // -------------------------------------------------------------------------
    {
      id: 't4-b4-s6',
      code: '4.6',
      title: 'Unsur dalam Kala 3',
      learningStandard: 'SP 4.6.1, 4.6.2, 4.6.3',
      durationMinutes: 20,
      tldr: [
        'Kala 3 mengandungi 8 unsur: Na, Mg, Al (logam) → Si (separa logam / metaloid) → P, S, Cl, Ar (bukan logam). Semua mempunyai 3 petala berisi elektron.',
        'Merentasi Kala 3 dari kiri ke kanan: Jejari atom semakin mengecil (cas nukleus bertambah menarik elektron lebih dekat) dan Keelektronegatifan bertambah.',
        'Perubahan Sifat Asid-Bes Oksida Kala 3 (Wajib SPM): Oksida Bes (Na₂O, MgO) → Oksida Amfoterik (Al₂O₃) → Oksida Asid (SiO₂, P₄O₁₀, SO₂, Cl₂O₇).',
        'Aluminium oksida (Al₂O₃) ialah oksida amfoterik kerana boleh bertindak balas dengan asid DAN alkali membentuk garam dan air.'
      ],
      simulationRef: {
        id: 'sifat-oksida-kala-3',
        title: 'Makmal Maya Sifat Asid-Bes Oksida Unsur Kala 3',
        description: 'Uji keterlarutan dan tindak balas oksida Kala 3 dengan asid nitrik dan natrium hidroksida untuk mengenal pasti sifat bes, amfoterik, dan asid.',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=sifat-oksida-kala-3',
        previewBadge: 'Simulasi Bab 4.6'
      },
      concepts: [
        {
          id: 't4-b4-s6-c1',
          title: 'Tren Perubahan Sifat Fizik Merentasi Kala 3 (Kiri ke Kanan)',
          badge: 'Tren Berkala SPM',
          content: `
            <p>
              Semua unsur dalam Kala 3 mempunyai 3 petala yang berisi elektron. Apabila <b>merentasi Kala 3 dari kiri ke kanan</b> (Na → Ar):
            </p>
            <ol class="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 mt-2">
              <li>
                <b>Jejari Saiz Atom Semakin Mengecil:</b>
                <br />
                Nombor proton bertambah dari 11 ke 18 → <span class="blur-target"><b>cas positif nukleus bertambah</b></span> → daya tarikan elektrostatik nukleus terhadap elektron pada petala terluar semakin kuat → elektron ditarik lebih rapat ke arah nukleus.
              </li>
              <li>
                <b>Keelektronegatifan Bertambah:</b>
                <br />
                Keupayaan atom menarik elektron ke arahnya dalam ikatan kimia bertambah kerana saiz atom semakin mengecil dan cas nukleus semakin kuat.
              </li>
              <li>
                <b>Perubahan Sifat Kelogaman:</b>
                <br />
                <span class="blur-target"><b>Logam (Na, Mg, Al) → Separa Logam / Metaloid (Si) → Bukan Logam (P, S, Cl, Ar)</b></span>.
              </li>
            </ol>
          `
        },
        {
          id: 't4-b4-s6-c2',
          title: 'Perubahan Sifat Kimia Oksida Unsur Kala 3 (Bes → Amfoterik → Asid)',
          badge: 'Soalan Paling Popular SPM',
          content: `
            <p>
              Sifat asid-bes oksida unsur berubah secara berkala merentasi Kala 3:
            </p>
          `,
          comparisonTable: {
            headers: ['Oksida Unsur', 'Formula Oksida', 'Sifat Asid-Bes', 'Tindak Balas dengan Asid / Alkali'],
            rows: [
              ['Natrium oksida & Magnesium oksida', 'Na₂O, MgO', '<b>Oksida Bes</b>', 'Bertindak balas dengan asid menghasilkan garam + air. Tidak bertindak balas dengan alkali.'],
              ['Aluminium oksida', 'Al₂O₃', '<b>Oksida Amfoterik</b>', 'Bertindak balas dengan <b>asid DAN alkali</b> menghasilkan garam + air.'],
              ['Silikon dioksida, Fosforus pentoksida, Sulfur dioksida, Diklorin heptaoksida', 'SiO₂, P₄O₁₀, SO₂, Cl₂O₇', '<b>Oksida Asid</b>', 'Bertindak balas dengan alkali menghasilkan garam + air. Larut dalam air membentuk larutan berasid.']
            ]
          }
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menyatakan bahawa jejari atom bertambah merentasi Kala 3 kerana nombor proton bertambah.',
          correction: 'Jejari atom MENGECEIL merentasi kala kerana cas nukleus positif yang bertambah menarik elektron lebih dekat ke pusat.',
          why: 'Bilangan petala adalah sama (3 petala), tetapi tarikan nukleus semakin kuat.',
          spmTip: 'Menuruni kumpulan: saiz bertambah (tambah petala). Merentasi kala: saiz mengecil (cas nukleus bertambah).'
        }
      ],
      flashcards: [
        {
          id: 't4-b4-s6-fc1',
          front: 'Mengapakah saiz jejari atom semakin mengecil apabila merentasi Kala 3 dari kiri ke kanan?',
          back: 'Nombor proton bertambah → cas nukleus positif bertambah → daya tarikan nukleus terhadap elektron petala semakin kuat → elektron ditarik lebih rapat ke nukleus.'
        },
        {
          id: 't4-b4-s6-fc2',
          front: 'Apakah maksud oksida amfoterik dan berikan satu contoh oksida amfoterik dalam Kala 3.',
          back: 'Oksida yang boleh bertindak balas dengan kedua-dua asid dan alkali untuk menghasilkan garam dan air. Contoh: Aluminium oksida (Al₂O₃).'
        },
        {
          id: 't4-b4-s6-fc3',
          front: 'Bagaimanakah sifat asid-bes oksida unsur berubah apabila merentasi Kala 3?',
          back: 'Berubah daripada Oksida Bes (Na₂O, MgO) → Oksida Amfoterik (Al₂O₃) → Oksida Asid (SiO₂, P₄O₁₀, SO₂, Cl₂O₇).'
        },
        {
          id: 't4-b4-s6-fc4',
          front: 'Apakah unsur separa logam (metaloid) dalam Kala 3 dan apakah kegunaan utamanya?',
          back: 'Silikon (Si), digunakan sebagai semikonduktor dalam industri cip mikroelektronik dan komputer.'
        },
        {
          id: 't4-b4-s6-fc5',
          front: 'Tuliskan persamaan kimia apabila aluminium oksida bertindak balas dengan asid hidroklorik.',
          back: 'Al₂O₃ (s) + 6HCl (aq) → 2AlCl₃ (aq) + 3H₂O (l)'
        }
      ],
      quiz: [
        {
          id: 't4-b4-s6-q1',
          question: 'Oksida manakah yang mempunyai sifat amfoterik?',
          options: [
            'Magnesium oksida, MgO',
            'Aluminium oksida, Al₂O₃',
            'Silikon dioksida, SiO₂',
            'Sulfur dioksida, SO₂'
          ],
          answerIndex: 1,
          explanation: 'Al₂O₃ ialah oksida amfoterik kerana berupaya bertindak balas dengan kedua-dua asid dan alkali kuat untuk menghasilkan garam dan air.',
          level: 'Rendah',
          spmReference: 'SPM 2021 Kertas 1'
        },
        {
          id: 't4-b4-s6-q2',
          question: 'Antara berikut, yang manakah menerangkan dengan betul mengapa saiz jejari atom mengecil apabila merentasi Kala 3 dari natrium ke klorin?',
          options: [
            'Bilangan petala berisi elektron semakin berkurang',
            'Cas nukleus positif bertambah dan menarik elektron petala lebih dekat ke nukleus',
            'Jisim atom relatif semakin mengecil',
            'Bilangan elektron valens semakin berkurang'
          ],
          answerIndex: 1,
          explanation: 'Pertambahan nombor proton meningkatkan cas positif nukleus. Oleh kerana bilangan petala tetap sama (3 petala), tarikan nukleus yang lebih kuat menarik elektron lebih dekat, mengecilkan saiz atom.',
          level: 'Sederhana'
        },
        {
          id: 't4-b4-s6-q3',
          question: 'Serbuk putih X tidak larut dalam air, tetapi larut dalam kedua-dua asid sulfurik cair dan larutan natrium hidroksida panas menghasilkan larutan tanpa warna. Apakah serbuk X?',
          options: [
            'Na₂O',
            'MgO',
            'Al₂O₃',
            'SiO₂'
          ],
          answerIndex: 2,
          explanation: 'Ciri bahan yang bertindak balas dengan kedua-dua asid dan alkali menunjukkan sifat amfoterik, iaitu Aluminium oksida (Al₂O₃).',
          level: 'Sederhana',
          spmReference: 'Percubaan SPM Terengganu 2022'
        },
        {
          id: 't4-b4-s6-q4',
          question: 'Unsur separa logam (metaloid) seperti silikon digunakan secara meluas dalam pembuatan peranti elektronik moden. Apakah sifat fizik silikon yang membolehkannya berfungsi sedemikian?',
          options: [
            'Mempunyai kekonduksian elektrik yang lebih baik pada suhu tinggi berbanding suhu bilik (semikonduktor)',
            'Mempunyai ketumpatan yang paling rendah di bumi',
            'Boleh bertindak sebagai cecair konduktor pada 0°C',
            'Sangat mudah terbakar dalam udara sejuk'
          ],
          answerIndex: 0,
          explanation: 'Silikon ialah semikonduktor yang bertindak sebagai penebat pada suhu rendah tetapi kekonduksian elektriknya meningkat dengan peningkatan suhu, sesuai untuk transistor dan mikrocip.',
          level: 'Sederhana'
        },
        {
          id: 't4-b4-s6-q5',
          question: 'Gas manakah yang terhasil apabila sulfur dibakar dalam udara dan dilarutkan ke dalam air suling membentuk asid berasid?',
          options: [
            'Gas hidrogen sulfida, H₂S',
            'Gas sulfur dioksida, SO₂',
            'Gas ammonia, NH₃',
            'Gas klorin, Cl₂'
          ],
          answerIndex: 1,
          explanation: 'Sulfur membakar menghasilkan gas sulfur dioksida, SO₂ (oksida asid). Apabila larut dalam air, ia membentuk asid sulfurus berasid (SO₂ + H₂O → H₂SO₃).',
          level: 'Rendah'
        },
        {
          id: 't4-b4-s6-q6',
          question: 'Susun unsur-unsur Kala 3 berikut mengikut urutan KEELEKTRONEGATIFAN MENAIK yang betul: Klorin (Cl), Magnesium (Mg), Silikon (Si), Natrium (Na).',
          options: [
            'Cl < Si < Mg < Na',
            'Na < Mg < Si < Cl',
            'Mg < Na < Si < Cl',
            'Na < Si < Mg < Cl'
          ],
          answerIndex: 1,
          explanation: 'Keelektronegatifan bertambah merentasi kala dari kiri ke kanan. Maka urutan menaik ialah Na (Kumpulan 1) < Mg (Kumpulan 2) < Si (Kumpulan 14) < Cl (Kumpulan 17).',
          level: 'Sederhana',
          spmReference: 'SPM 2023 Kertas 1'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // SUBTOPIK 4.7
    // -------------------------------------------------------------------------
    {
      id: 't4-b4-s7',
      code: '4.7',
      title: 'Unsur Peralihan',
      learningStandard: 'SP 4.7.1, 4.7.2, 4.7.3',
      durationMinutes: 15,
      tldr: [
        'Unsur peralihan terletak dalam blok tengah antara Kumpulan 3 hingga Kumpulan 12 dalam Jadual Berkala Unsur (semuanya adalah logam).',
        'Mempunyai sifat fizikal logam lazim: berkilat, mulur, konduktor elektrik/haba baik, serta takat lebur dan ketumpatan yang tinggi.',
        '4 Ciri Istimewa Unsur Peralihan (Wajib Hafal SPM): 1. Mempunyai lebih daripada satu nombor pengoksidaan; 2. Membentuk ion/sebatian berwarna; 3. Berfungsi sebagai mangkin industri; 4. Berkeupayaan membentuk ion kompleks.'
      ],
      concepts: [
        {
          id: 't4-b4-s7-c1',
          title: 'Kedudukan dan Sifat Fizik Unsur Peralihan',
          badge: 'Sifat Logam Berat',
          content: `
            <p>
              Unsur peralihan ialah unsur logam yang terletak di antara <b>Kumpulan 3 hingga Kumpulan 12</b> (cth: Skandium Sc, Titanium Ti, Vanadium V, Kromium Cr, Mangan Mn, Besi Fe, Kobalt Co, Nikel Ni, Kuprum Cu).
            </p>
            <p class="text-xs text-slate-700 leading-relaxed mt-1">
              Semua unsur peralihan ialah <b>logam</b> yang mempunyai:
              <br />
              • Permukaan berkilat dan boleh ditempa / mulur.
              <br />
              • Takat lebur dan takat didih yang sangat tinggi (cth: Besi melebur pada 1538°C).
              <br />
              • Ketumpatan tinggi dan kekerasan yang tinggi berbanding logam Kumpulan 1 dan 2.
            </p>
          `
        },
        {
          id: 't4-b4-s7-c2',
          title: '4 Ciri-Ciri Istimewa Unsur Peralihan Wajib SPM',
          badge: 'Soalan Struktur SPM (Wajib)',
          content: `
            <p>
              Unsur peralihan dibezakan daripada logam biasa melalui 4 ciri istimewa berikut:
            </p>
            <div class="space-y-3 mt-2">
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-sky-800 text-sm">1. Mempunyai Lebih Daripada Satu Nombor Pengoksidaan</span>
                <p class="text-slate-600 mt-0.5">
                  Boleh membentuk ion dengan cas berbeza dalam sebatian berlainan:
                  <br />
                  • <b>Besi (Fe):</b> Ferum(II) $Fe^{2+}$ (+2) dan Ferum(III) $Fe^{3+}$ (+3).
                  <br />
                  • <b>Kuprum (Cu):</b> Kuprum(I) $Cu^+$ (+1) dan Kuprum(II) $Cu^{2+}$ (+2).
                  <br />
                  • <b>Mangan (Mn):</b> wujud dari +2 dalam $MnSO_4$, +4 dalam $MnO_2$, hingga +7 dalam $KMnO_4$.
                </p>
              </div>

              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-indigo-800 text-sm">2. Membentuk Sebatian dan Ion Berwarna</span>
                <p class="text-slate-600 mt-0.5">
                  Ion akueus unsur peralihan mempamerkan warna yang khas dan menarik:
                </p>
                <div class="grid grid-cols-2 gap-2 text-[11px] font-semibold mt-1">
                  <span class="text-emerald-700">• Ion Fe²⁺: Hijau</span>
                  <span class="text-amber-800">• Ion Fe³⁺: Perang</span>
                  <span class="text-sky-700">• Ion Cu²⁺: Biru</span>
                  <span class="text-purple-700">• Ion MnO₄⁻: Ungu</span>
                  <span class="text-orange-600">• Ion Cr₂O₇²⁻: Jingga</span>
                  <span class="text-teal-700">• Ion Cr³⁺: Hijau</span>
                </div>
              </div>

              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-teal-800 text-sm">3. Berfungsi Sebagai Mangkin dalam Industri Kimia</span>
                <p class="text-slate-600 mt-0.5">
                  Mempercepatkan tindak balas industri dengan menyediakan laluan alternatif bertenaga pengaktifan lebih rendah:
                </p>
                <ul class="list-disc pl-5 space-y-0.5 text-[11px] text-slate-700 mt-1">
                  <li><b>Serbuk Besi (Fe):</b> Mangkin dalam <i>Proses Haber</i> (penghasilan ammonia, NH₃).</li>
                  <li><b>Vanadium(V) oksida (V₂O₅):</b> Mangkin dalam <i>Proses Sentuh</i> (penghasilan asid sulfurik, H₂SO₄).</li>
                  <li><b>Serbuk Nikel (Ni) / Platinum (Pt):</b> Mangkin penghidrogenan minyak sayuran kepada marjerin.</li>
                  <li><b>Platinum (Pt):</b> Mangkin dalam <i>Proses Ostwald</i> (penghasilan asid nitrik, HNO₃).</li>
                </ul>
              </div>

              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-rose-800 text-sm">4. Berkeupayaan Membentuk Ion Kompleks</span>
                <p class="text-slate-600 mt-0.5">
                  Ion logam peralihan boleh mengikat molekul atau ion ligan membentuk zarah ion kompleks:
                  <br />
                  • Ion tetraaminakuprum(II), $[Cu(NH_3)_4]^{2+}$ (larutan biru tua).
                  <br />
                  • Ion heksasianoferat(II), $[Fe(CN)_6]^{4-}$.
                </p>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menganggap semua logam membentuk larutan berwarna.',
          correction: 'Hanya unsur peralihan yang membentuk larutan dan sebatian berwarna. Logam Kumpulan 1, 2, dan 13 (cth: Na⁺, Mg²⁺, Al³⁺) membentuk larutan TIDAK BERWARNA (larutan jernih).',
          why: 'Warna berpunca daripada peralihan elektron dalam orbital d yang separa terisi pada ion unsur peralihan.',
          spmTip: 'Soalan analisis kualitatif: Jika larutan berwarna biru → sah ada ion Cu²⁺. Jika larutan jernih tidak berwarna → tiada kation unsur peralihan.'
        }
      ],
      flashcards: [
        {
          id: 't4-b4-s7-fc1',
          front: 'Di manakah kedudukan unsur peralihan dalam Jadual Berkala Unsur?',
          back: 'Terletak dalam blok tengah antara Kumpulan 3 hingga Kumpulan 12.'
        },
        {
          id: 't4-b4-s7-fc2',
          front: 'Senaraikan 4 ciri istimewa bagi unsur peralihan.',
          back: '1. Mempunyai lebih daripada satu nombor pengoksidaan.\n2. Membentuk sebatian dan ion berwarna.\n3. Berfungsi sebagai mangkin industri.\n4. Membentuk ion kompleks.'
        },
        {
          id: 't4-b4-s7-fc3',
          front: 'Apakah warna larutan akueus yang mengandungi ion Fe²⁺ dan ion Fe³⁺?',
          back: 'Ion Fe²⁺ berwarna hijau; Ion Fe³⁺ berwarna perang.'
        },
        {
          id: 't4-b4-s7-fc4',
          front: 'Namakan mangkin unsur peralihan yang digunakan dalam Proses Haber dan Proses Sentuh.',
          back: 'Proses Haber: Serbuk Besi (Fe).\nProses Sentuh: Vanadium(V) oksida (V₂O₅).'
        },
        {
          id: 't4-b4-s7-fc5',
          front: 'Berikan satu contoh ion kompleks yang dibentuk oleh unsur kuprum.',
          back: 'Ion tetraaminakuprum(II), [Cu(NH₃)₄]²⁺ (larutan berwarna biru tua).'
        }
      ],
      quiz: [
        {
          id: 't4-b4-s7-q1',
          question: 'Antara berikut, yang manakah BUKAN ciri istimewa bagi unsur peralihan?',
          options: [
            'Mempunyai takat lebur yang sangat rendah di bawah 0°C',
            'Mempunyai lebih daripada satu nombor pengoksidaan',
            'Berupaya membentuk ion atau sebatian berwarna',
            'Boleh bertindak sebagai mangkin dalam proses industri'
          ],
          answerIndex: 0,
          explanation: 'Semua unsur peralihan mempunyai ikatan logam yang kuat dan takat lebur yang sangat tinggi, bukannya di bawah 0°C.',
          level: 'Rendah',
          spmReference: 'SPM 2021 Kertas 1'
        },
        {
          id: 't4-b4-s7-q2',
          question: 'Mangkin manakah yang digunakan dalam Proses Sentuh untuk menghasilkan asid sulfurik secara industri?',
          options: [
            'Serbuk besi, Fe',
            'Vanadium(V) oksida, V₂O₅',
            'Nikel, Ni',
            'Mangan(IV) oksida, MnO₂'
          ],
          answerIndex: 1,
          explanation: 'Vanadium(V) oksida (V₂O₅) digunakan sebagai mangkin pada suhu 450°C dalam penukaran SO₂ kepada SO₃ dalam Proses Sentuh.',
          level: 'Rendah',
          spmReference: 'SPM 2022 Kertas 1'
        },
        {
          id: 't4-b4-s7-q3',
          question: 'Unsur X membentuk dua sebatian klorida dengan formula XCl₂ (pepejal hijau) dan XCl₃ (pepejal perang). Unsur X berkemungkinan besar ialah:',
          options: [
            'Kalsium, Ca',
            'Besi (Ferum), Fe',
            'Aluminium, Al',
            'Natrium, Na'
          ],
          answerIndex: 1,
          explanation: 'Ferum (Fe) ialah unsur peralihan yang mempunyai nombor pengoksidaan +2 (FeCl₂ berwarna hijau) dan +3 (FeCl₃ berwarna perang).',
          level: 'Sederhana'
        },
        {
          id: 't4-b4-s7-q4',
          question: 'Apakah warna larutan akueus kuprum(II) sulfat dan larutan kalium manganat(VII)?',
          options: [
            'CuSO₄: Biru | KMnO₄: Ungu',
            'CuSO₄: Hijau | KMnO₄: Jingga',
            'CuSO₄: Perang | KMnO₄: Merah jambu',
            'CuSO₄: Tidak berwarna | KMnO₄: Kuning'
          ],
          answerIndex: 0,
          explanation: 'Ion Cu²⁺ menghasilkan larutan berwarna biru, manakala ion manganat(VII), MnO₄⁻ menghasilkan larutan berwarna ungu gelap.',
          level: 'Rendah'
        },
        {
          id: 't4-b4-s7-q5',
          question: 'Apabila larutan ammonia berlebihan ditambah kepada mendakan biru kuprum(II) hidroksida, mendakan tersebut larut menghasilkan larutan biru tua. Apakah zarah yang bertanggungjawab bagi pembentukan warna biru tua tersebut?',
          options: [
            'Atom kuprum tulen',
            'Ion kompleks tetraaminakuprum(II), [Cu(NH₃)₄]²⁺',
            'Gas ammonia terbebas',
            'Garam kuprum klorida'
          ],
          answerIndex: 1,
          explanation: 'Penambahan ammonia berlebihan melarutkan mendakan Cu(OH)₂ untuk membentuk ion kompleks [Cu(NH₃)₄]²⁺ yang berwarna biru tua larut.',
          level: 'Tinggi (KBAT)',
          spmReference: 'Soalan Analisis Kualitatif Kertas 2 SPM'
        },
        {
          id: 't4-b4-s7-q6',
          question: 'Logam zink (Zn) dan skandium (Sc) terletak dalam blok d tetapi kadangkala tidak dianggap sebagai unsur peralihan sejati. Mengapakah zink (Zn) tidak menunjukkan ciri istimewa unsur peralihan sepenuhnya?',
          options: [
            'Zink tidak boleh mengalirkan arus elektrik',
            'Zink hanya mempunyai satu nombor pengoksidaan (+2) dan membentuk sebatian yang tidak berwarna (putih)',
            'Zink wujud dalam bentuk gas pada suhu bilik',
            'Zink tidak bertindak balas dengan asid'
          ],
          answerIndex: 1,
          explanation: 'Zink hanya membentuk satu keadaan pengoksidaan iaitu Zn²⁺ (orbital d penuh 3d¹⁰) dan ionnya tidak berwarna dalam larutan akueus.',
          level: 'Tinggi (KBAT)',
          spmReference: 'Soalan KBAT SPM Kertas 2'
        }
      ]
    }
  ]
};
