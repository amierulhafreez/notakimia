import { Chapter } from '../types/nota';

export const T4_BAB3: Chapter = {
  id: 't4-b3',
  form: 'T4',
  chapterNumber: 3,
  title: 'Konsep Mol, Formula dan Persamaan Kimia',
  theme: 'Asas Kimia',
  durationMinutes: 120,
  description: 'Jisim atom relatif berasaskan skala karbon-12, konsep mol & pemalar Avogadro, jambatan mol bagi jisim dan isi padu gas, formula empirik (eksperimen MgO & CuO), pembinaan formula sebatian ionik mengikut IUPAC, dan stoikiometri persamaan kimia berimbang.',
  iconName: 'Binary',
  subtopicCount: 4,
  subtopics: [
    // -------------------------------------------------------------------------
    // SUBTOPIK 3.1
    // -------------------------------------------------------------------------
    {
      id: 't4-b3-s1',
      code: '3.1',
      title: 'Jisim Atom Relatif dan Jisim Molekul Relatif',
      learningStandard: 'SP 3.1.1, 3.1.2',
      durationMinutes: 25,
      tldr: [
        'Jisim satu atom adalah teramat kecil untuk ditimbang secara langsung. Oleh itu, jisim atom ditentukan secara perbandingan menggunakan atom piawai karbon-12.',
        'Jisim Atom Relatif (Ar) ialah jisim purata satu atom unsur berbanding dengan 1/12 kali jisim satu atom karbon-12. Ar tidak mempunyai sebarang unit.',
        'Karbon-12 dipilih sebagai piawai kerana: wujud sebagai pepejal pada suhu bilik (mudah dikendalikan), banyak terdapat di bumi, dan mempunyai jisim tepat 12.00000.',
        'Jisim Molekul Relatif (Mr) bagi sebatian kovalen dan Jisim Formula Relatif (Fr) bagi sebatian ion dihitung dengan menjumlahkan Ar semua atom dalam formulanya.'
      ],
      concepts: [
        {
          id: 't4-b3-s1-c1',
          title: 'Konsep Jisim Atom Relatif (Ar) Berdasarkan Skala Karbon-12',
          badge: 'Definisi Skema SPM',
          content: `
            <p>
              Jisim sebenar satu atom hidrogen adalah kira-kira $1.66 \\times 10^{-24}\\text{ g}$, iaitu terlalu kecil untuk diukur secara terus. Oleh itu, ahli kimia membandingkan jisim atom sesuatu unsur dengan jisim satu atom piawai.
            </p>
            <p>
              <b>Jisim Atom Relatif ($A_r$)</b> ditakrifkan sebagai:
            </p>
            <div class="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-950 font-medium my-2">
              <span class="blur-target"><b>Jisim purata satu atom unsur berbanding dengan $\\frac{1}{12}$ kali jisim satu atom karbon-12</b></span>.
            </div>
            <div class="p-3 rounded-2xl bg-slate-900 text-center font-mono text-sky-300 text-xs my-2">
              Jisim Atom Relatif (Ar) = [ Jisim purata satu atom unsur ] ÷ [ 1/12 × Jisim satu atom Karbon-12 ]
            </div>
            <p class="text-xs text-slate-600 mt-1">
              ⚠️ <b>Peringatan SPM:</b> $A_r$, $M_r$, dan $F_r$ ialah nilai nisbah perbandingan, maka nilainya <b>TIDAK mempunyai unit</b>!
            </p>
          `
        },
        {
          id: 't4-b3-s1-c2',
          title: 'Sebab Karbon-12 Dipilih sebagai Piawai Antarabangsa',
          badge: 'Fakta Wajib SPM',
          content: `
            <p>
              Sebelum tahun 1961, hidrogen dan oksigen pernah digunakan sebagai piawai jisim atom, tetapi digantikan dengan isotop <b>Karbon-12 ($^{12}\\text{C}$)</b> atas 3 sebab utama:
            </p>
            <ol class="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 mt-2">
              <li>
                <b>Wujud dalam keadaan pepejal pada suhu bilik:</b> Karbon-12 ialah pepejal yang stabil dan mudah dikendalikan secara eksperimen berbanding gas hidrogen ($H_2$) dan gas oksigen ($O_2$) yang sukar ditimbang.
              </li>
              <li>
                <b>Piawai Spektrometri Jisim:</b> Karbon-12 telah ditetapkan mempunyai nilai jisim tepat <span class="blur-target"><b>12.00000 unit</b></span> dan digunakan sebagai rujukan utama dalam spektrometer jisim moden.
              </li>
              <li>
                <b>Kelimpahan semula jadi tinggi & sebatian meluas:</b> Karbon-12 merupakan isotop karbon yang paling banyak di bumi (98.9%) dan berpadu dengan pelbagai unsur membentuk jutaan sebatian organik.
              </li>
            </ol>
          `
        },
        {
          id: 't4-b3-s1-c3',
          title: 'Penghitungan Jisim Molekul Relatif (Mr) dan Jisim Formula Relatif (Fr)',
          badge: 'Kemahiran Pengiraan SPM',
          content: `
            <p>
              Nilai $M_r$ dan $F_r$ dihitung dengan menjumlahkan Jisim Atom Relatif ($A_r$) bagi semua atom yang membentuk formula kimia bahan tersebut:
            </p>
            <ul class="list-disc pl-5 space-y-1.5 text-xs text-slate-700 mt-2">
              <li>
                <b>Jisim Molekul Relatif ($M_r$):</b> Digunakan untuk bahan yang wujud sebagai <span class="blur-target"><b>molekul kovalen</b></span>.
                <br />
                <span class="text-slate-500 font-mono text-[11px]">
                  Contoh: Gas Karbon Dioksida, CO₂ [Ar: C=12, O=16]
                  <br />
                  Mr CO₂ = 12 + 2(16) = <b>44</b>
                </span>
              </li>
              <li>
                <b>Jisim Formula Relatif ($F_r$):</b> Digunakan untuk bahan yang wujud sebagai <span class="blur-target"><b>sebatian ionik</b></span>.
                <br />
                <span class="text-slate-500 font-mono text-[11px]">
                  Contoh: Hidrat Kuprum(II) Sulfat, CuSO₄·5H₂O [Ar: Cu=64, S=32, O=16, H=1]
                  <br />
                  Fr = [64 + 32 + 4(16)] + 5[2(1) + 16] = 160 + 5(18) = <b>250</b>
                </span>
              </li>
            </ul>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menulis unit "gram" atau "g" pada jawapan akhir Jisim Atom Relatif (Ar) atau Jisim Molekul Relatif (Mr).',
          correction: 'Ar dan Mr adalah nilai nisbah tanpa unit! Contoh: Ar oksigen ialah 16 (bukan 16 g).',
          why: 'Jisim atom relatif membandingkan jisim atom dengan pecahan jisim atom piawai karbon-12, maka unit jisim saling membatal.',
          spmTip: 'Jangan letak unit "g" untuk Ar atau Mr. Unit "g mol⁻¹" hanya untuk Jisim Molar.'
        },
        {
          mistake: 'Mendarab nombor subskrip dalam kurungan secara silap semasa mengira Mr bagi sebatian yang mengandungi kurungan poliatom seperti Al₂(SO₄)₃.',
          correction: 'Untuk Al₂(SO₄)₃, darabkan subskrip 3 ke atas atom S dan O: 2 atom Al, 3 atom S, dan 3 × 4 = 12 atom O. Mr = 2(27) + 3(32) + 12(16) = 342.',
          why: 'Kecuaian mengira bilangan atom oksigen sering menyebabkan kehilangan 1 markah dalam soalan stoikiometri.',
          spmTip: 'Kembangkan kurungan dengan teliti sebelum menekan kalkulator.'
        }
      ],
      flashcards: [
        {
          id: 't4-b3-s1-fc1',
          front: 'Apakah definisi "Jisim Atom Relatif (Ar)" berdasarkan skala karbon-12?',
          back: 'Jisim purata satu atom unsur berbanding dengan 1/12 kali jisim satu atom karbon-12.'
        },
        {
          id: 't4-b3-s1-fc2',
          front: 'Mengapakah karbon-12 dipilih sebagai piawai antarabangsa untuk menentukan jisim relatif?',
          back: '1. Pepejal pada suhu bilik (mudah dikendalikan).\n2. Mempunyai jisim tepat 12.00000 unit dalam spektrometri jisim.\n3. Kelimpahan semula jadi tinggi.'
        },
        {
          id: 't4-b3-s1-fc3',
          front: 'Apakah perbezaan penggunaan istilah antara Jisim Molekul Relatif (Mr) dan Jisim Formula Relatif (Fr)?',
          back: 'Mr digunakan untuk sebatian kovalen (molekul), manakala Fr digunakan untuk sebatian ionik.'
        },
        {
          id: 't4-b3-s1-fc4',
          front: 'Hitung Jisim Formula Relatif bagi kalsium nitrat, Ca(NO₃)₂. [Ar: Ca=40, N=14, O=16]',
          back: 'Fr = 40 + 2[14 + 3(16)] = 40 + 2(62) = 40 + 124 = 164 (tanpa unit).'
        },
        {
          id: 't4-b3-s1-fc5',
          front: 'Adakah Jisim Atom Relatif (Ar) mempunyai unit?',
          back: 'TIDAK mempunyai unit kerana Ar merupakan nilai nisbah perbandingan antara dua jisim.'
        }
      ],
      quiz: [
        {
          id: 't4-b3-s1-q1',
          question: 'Pernyataan manakah yang mentakrifkan Jisim Atom Relatif (Ar) sesuatu unsur mengikut skala piawai antarabangsa?',
          options: [
            'Jisim satu atom unsur berbanding dengan jisim satu atom hidrogen',
            'Jisim purata satu atom unsur berbanding dengan 1/12 kali jisim satu atom karbon-12',
            'Jisim satu mol atom unsur berbanding dengan 1/16 kali jisim satu atom oksigen-16',
            'Jumlah jisim proton dan neutron di dalam nukleus atom unsur'
          ],
          answerIndex: 1,
          explanation: 'Takrifan piawai IUPAC bagi Ar ialah jisim purata satu atom unsur berbanding dengan 1/12 kali jisim satu atom karbon-12.',
          level: 'Rendah',
          spmReference: 'SPM 2021 Kertas 1'
        },
        {
          id: 't4-b3-s1-q2',
          question: 'Antara sebab berikut, yang manakah BENAR mengapa karbon-12 dipilih sebagai piawai menggantikan hidrogen dan oksigen?',
          options: [
            'Karbon-12 adalah gas yang lengai dan tidak bertindak balas',
            'Karbon-12 wujud sebagai pepejal pada suhu bilik dan mudah dikendalikan',
            'Karbon-12 mempunyai bilangan elektron yang paling sedikit',
            'Karbon-12 merupakan bahan radioaktif yang mudah dikesan'
          ],
          answerIndex: 1,
          explanation: 'Karbon-12 wujud dalam keadaan pepejal pada suhu bilik, menjadikannya jauh lebih mudah ditimbang dan dikendalikan berbanding gas hidrogen atau gas oksigen.',
          level: 'Rendah'
        },
        {
          id: 't4-b3-s1-q3',
          question: 'Berapakah Jisim Formula Relatif bagi kuprum(II) sulfat terhidrat, CuSO₄·5H₂O? [Jisim atom relatif: Cu=64, S=32, O=16, H=1]',
          options: [
            '160',
            '178',
            '250',
            '890'
          ],
          answerIndex: 2,
          explanation: 'Fr = [64 + 32 + 4(16)] + 5[2(1) + 16] = 160 + 5(18) = 160 + 90 = 250.',
          level: 'Sederhana',
          spmReference: 'Percubaan SPM Terengganu 2023'
        },
        {
          id: 't4-b3-s1-q4',
          question: 'Satu molekul gas X mempunyai jisim 4 kali ganda lebih berat daripada satu atom oksigen. Apakah Jisim Molekul Relatif bagi gas X? [Ar: O=16]',
          options: [
            '16',
            '32',
            '64',
            '128'
          ],
          answerIndex: 2,
          explanation: 'Jisim satu molekul X = 4 × Ar Oksigen = 4 × 16 = 64.',
          level: 'Sederhana'
        },
        {
          id: 't4-b3-s1-q5',
          question: 'Suatu sebatian mempunyai formula kimia M₂(SO₄)₃ dan mempunyai Jisim Formula Relatif sebanyak 342. Berapakah Jisim Atom Relatif bagi unsur M? [Ar: S=32, O=16]',
          options: [
            '27',
            '54',
            '56',
            '108'
          ],
          answerIndex: 0,
          explanation: '2(M) + 3[32 + 4(16)] = 342 → 2M + 3(96) = 342 → 2M + 288 = 342 → 2M = 54 → M = 27 (iaitu unsur Aluminium, Al).',
          level: 'Tinggi (KBAT)',
          spmReference: 'Soalan Pengiraan SPM Kertas 2'
        },
        {
          id: 't4-b3-s1-q6',
          question: 'Jisim bagi 2 atom unsur Y adalah sama dengan jisim bagi 3 atom karbon-12. Berapakah Jisim Atom Relatif bagi unsur Y?',
          options: [
            '12',
            '18',
            '24',
            '36'
          ],
          answerIndex: 1,
          explanation: '2 × Ar(Y) = 3 × 12 = 36 → Ar(Y) = 36 ÷ 2 = 18.',
          level: 'Sederhana'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // SUBTOPIK 3.2
    // -------------------------------------------------------------------------
    {
      id: 't4-b3-s2',
      code: '3.2',
      title: 'Konsep Mol',
      learningStandard: 'SP 3.2.1, 3.2.2, 3.2.3, 3.2.4, 3.2.5, 3.2.6, 3.2.7',
      durationMinutes: 35,
      tldr: [
        'Mol (simbol: mol) ialah unit SI kuantiti bahan. Satu mol mengandungi 6.02 × 10²³ entiti asas (Pemalar Avogadro, NA).',
        'Jisim Molar ialah jisim bagi satu mol bahan dalam unit g mol⁻¹. Nilai berangka jisim molar adalah sama dengan Ar atau Mr.',
        'Isi Padu Molar Gas: 1 mol sebarang gas menempati 22.4 dm³ pada STP (0°C, 1 atm) dan 24.0 dm³ pada Keadaan Bilik (25°C, 1 atm).',
        'Jambatan Mol SPM: Bilangan Zarah = Mol × NA; Jisim = Mol × Jisim Molar; Isi Padu Gas = Mol × Isi Padu Molar.'
      ],
      concepts: [
        {
          id: 't4-b3-s2-c1',
          title: 'Definisi Mol dan Pemalar Avogadro (NA)',
          badge: 'Unit Asas SI',
          content: `
            <p>
              Di dalam kimia, <b>mol</b> bertindak seperti perkataan "dozen" (1 dozen = 12 unit). Oleh kerana saiz atom terlalu seni, ahli kimia mengelompokkan zarah dalam unit mol.
            </p>
            <p>
              <b>Satu mol</b> ialah kuantiti bahan yang mengandungi bilangan entiti asas yang sama dengan bilangan atom di dalam tepat 12 g karbon-12, iaitu <span class="blur-target"><b>6.02 × 10²³ zarah</b></span>.
            </p>
            <p class="text-xs text-slate-700 mt-1">
              Nombor tetap ini dinamakan <b>Pemalar Avogadro ($N_A$)</b>:
              <br />
              <span class="font-mono text-indigo-700 font-bold">$N_A = 6.02 \\times 10^{23}\\text{ mol}^{-1}$</span>
            </p>
          `
        },
        {
          id: 't4-b3-s2-c2',
          title: 'Jisim Molar dan Isi Padu Molar Gas',
          badge: 'Kuantiti Molar',
          content: `
            <div class="space-y-3 mt-2">
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-sky-800 text-sm">1. Jisim Molar (Molar Mass)</span>
                <p class="text-slate-600 mt-1">
                  <b>Jisim bagi satu mol sesuatu bahan</b>, dinyatakan dalam unit <span class="blur-target"><b>g mol⁻¹</b></span>. Nilai numerik jisim molar adalah tepat sama dengan nilai $A_r$, $M_r$, atau $F_r$ bahan tersebut.
                </p>
                <div class="text-[11px] text-slate-500 font-mono mt-1">
                  Contoh: Jisim molar atom Karbon = 12 g mol⁻¹; Jisim molar molekul H₂O = 18 g mol⁻¹.
                </div>
              </div>

              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-teal-800 text-sm">2. Isi Padu Molar Gas (Molar Volume of Gas)</span>
                <p class="text-slate-600 mt-1">
                  <b>Isi padu yang dipenuhi oleh satu mol sebarang gas</b> pada suhu dan tekanan tertentu.
                </p>
                <ul class="list-disc pl-5 space-y-1 text-slate-700 text-[11px] mt-1">
                  <li>
                    Pada <b>Suhu dan Tekanan Piawai (STP: 0°C, 1 atm):</b> <span class="blur-target"><b>22.4 dm³ mol⁻¹</b></span> (atau 22,400 cm³ mol⁻¹).
                  </li>
                  <li>
                    Pada <b>Keadaan Bilik (Room Conditions: 25°C, 1 atm):</b> <span class="blur-target"><b>24.0 dm³ mol⁻¹</b></span> (atau 24,000 cm³ mol⁻¹).
                  </li>
                </ul>
              </div>
            </div>
          `
        },
        {
          id: 't4-b3-s2-c3',
          title: 'Formula Segi Tiga Jambatan Mol (The Mole Bridge Formula)',
          badge: 'Formula Wajib Kuasai',
          content: `
            <p>
              Semua pengiraan kuantitatif dalam Kimia SPM berpaksikan <b>bilangan mol ($n$)</b> sebagai jambatan perantara:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-2">
              <div class="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-center text-xs">
                <span class="font-bold text-sky-900 block">Bilangan Zarah</span>
                <div class="font-mono text-sky-700 font-black text-sm my-1">Zarah = Mol × Nₐ</div>
                <span class="text-[10px] text-slate-500">Mol = Zarah ÷ Nₐ</span>
              </div>

              <div class="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-center text-xs">
                <span class="font-bold text-indigo-900 block">Jisim Bahan (g)</span>
                <div class="font-mono text-indigo-700 font-black text-sm my-1">Jisim = Mol × Molar</div>
                <span class="text-[10px] text-slate-500">Mol = Jisim ÷ Molar</span>
              </div>

              <div class="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-center text-xs">
                <span class="font-bold text-teal-900 block">Isi Padu Gas (dm³)</span>
                <div class="font-mono text-teal-700 font-black text-sm my-1">V = Mol × Vₘ</div>
                <span class="text-[10px] text-slate-500">Mol = Isi Padu ÷ Vₘ</span>
              </div>
            </div>
            <div class="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-950">
              💡 <b>Pertukaran Unit Isi Padu:</b> $1\\text{ dm}^3 = 1000\\text{ cm}^3$. Untuk menukar $\\text{cm}^3$ kepada $\\text{dm}^3$, bahagikan dengan 1000!
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menggunakan nilai isi padu molar gas 22.4 dm³ mol⁻¹ semasa soalan menyatakan "pada keadaan bilik".',
          correction: 'Semak keadaan soalan: Jika "STP", gunakan 22.4 dm³ mol⁻¹. Jika "keadaan bilik" (room condition), gunakan 24.0 dm³ mol⁻¹.',
          why: 'Gas mengembang pada suhu lebih tinggi (25°C berbanding 0°C), maka isi padu molar pada keadaan bilik adalah lebih besar.',
          spmTip: 'Bulatkan perkataan "STP" atau "keadaan bilik" pada kertas soalan sebelum memulakan pengiraan.'
        },
        {
          mistake: 'Mengabaikan bilangan atom dalam molekul apabila soalan meminta "bilangan atom" dan bukannya "bilangan molekul".',
          correction: 'Jika mengira bilangan atom dalam 1 mol gas oksigen (O₂): 1 mol O₂ mengandungi 1 mol molekul O₂ = 6.02 × 10²³ molekul, TETAPI mengandungi 2 mol atom O = 2 × 6.02 × 10²³ = 1.204 × 10²⁴ atom!',
          why: 'Setiap molekul O₂ terbina daripada dua atom oksigen yang terikat bersama.',
          spmTip: 'Perhatikan sama ada soalan meminta "bilangan molekul", "bilangan atom", atau "bilangan ion".'
        }
      ],
      flashcards: [
        {
          id: 't4-b3-s2-fc1',
          front: 'Berapakah nilai Pemalar Avogadro (NA)?',
          back: '6.02 × 10²³ mol⁻¹ (menunjukkan bilangan zarah dalam satu mol bahan).'
        },
        {
          id: 't4-b3-s2-fc2',
          front: 'Berapakah isi padu molar bagi sebarang gas pada STP dan pada keadaan bilik?',
          back: 'STP = 22.4 dm³ mol⁻¹ (22,400 cm³ mol⁻¹).\nKeadaan Bilik = 24.0 dm³ mol⁻¹ (24,000 cm³ mol⁻¹).'
        },
        {
          id: 't4-b3-s2-fc3',
          front: 'Nyatakan formula mencari bilangan mol daripada jisim bahan.',
          back: 'Bilangan mol (n) = Jisim (g) ÷ Jisim Molar (g mol⁻¹).'
        },
        {
          id: 't4-b3-s2-fc4',
          front: 'Berapakah bilangan mol molekul yang terdapat dalam 4.4 g gas karbon dioksida, CO₂? [Mr CO₂ = 44]',
          back: 'Mol = 4.4 g ÷ 44 g mol⁻¹ = 0.1 mol CO₂.'
        },
        {
          id: 't4-b3-s2-fc5',
          front: 'Berapakah isi padu gas nitrogen yang ditempati oleh 0.5 mol gas tersebut pada keadaan bilik?',
          back: 'Isi padu = 0.5 mol × 24.0 dm³ mol⁻¹ = 12.0 dm³ (atau 12,000 cm³).'
        }
      ],
      quiz: [
        {
          id: 't4-b3-s2-q1',
          question: 'Berapakah bilangan atom yang terdapat di dalam 0.5 mol gas helium, He? [Pemalar Avogadro, NA = 6.02 × 10²³ mol⁻¹]',
          options: [
            '3.01 × 10²³ atom',
            '6.02 × 10²³ atom',
            '1.204 × 10²⁴ atom',
            '2.408 × 10²⁴ atom'
          ],
          answerIndex: 0,
          explanation: 'Helium ialah gas monoatom (atom tunggal). Bilangan atom = mol × NA = 0.5 × 6.02 × 10²³ = 3.01 × 10²³ atom.',
          level: 'Rendah',
          spmReference: 'SPM 2021 Kertas 1'
        },
        {
          id: 't4-b3-s2-q2',
          question: 'Berapakah jisim bagi 0.2 mol kuprum(II) sulfat, CuSO₄? [Jisim atom relatif: Cu=64, S=32, O=16]',
          options: [
            '16.0 g',
            '32.0 g',
            '160.0 g',
            '80.0 g'
          ],
          answerIndex: 1,
          explanation: 'Molar CuSO₄ = 64 + 32 + 4(16) = 160 g mol⁻¹. Jisim = mol × molar = 0.2 × 160 = 32.0 g.',
          level: 'Rendah'
        },
        {
          id: 't4-b3-s2-q3',
          question: 'Berapakah isi padu gas oksigen, O₂ pada keadaan bilik yang mengandungi 3.01 × 10²² molekul gas? [NA = 6.02 × 10²³ mol⁻¹; Isi padu molar gas pada keadaan bilik = 24 dm³ mol⁻¹]',
          options: [
            '0.12 dm³',
            '1.20 dm³',
            '12.0 dm³',
            '24.0 dm³'
          ],
          answerIndex: 1,
          explanation: 'Mol = (3.01 × 10²²) ÷ (6.02 × 10²³) = 0.05 mol. Isi padu = 0.05 mol × 24 dm³ mol⁻¹ = 1.2 dm³.',
          level: 'Sederhana',
          spmReference: 'Percubaan SPM SBP 2022'
        },
        {
          id: 't4-b3-s2-q4',
          question: 'Sampel gas manakah yang mengandungi bilangan atom yang PALING BANYAK? [Ar: H=1, C=12, O=16, N=14]',
          options: [
            '1 mol gas helium, He',
            '1 mol gas oksigen, O₂',
            '1 mol gas metana, CH₄',
            '0.5 mol gas ammonia, NH₃'
          ],
          answerIndex: 2,
          explanation: '1 mol CH₄ mengandungi 5 mol atom (1 atom C + 4 atom H) = 5 × NA atom = 3.01 × 10²⁴ atom, iaitu paling banyak antara pilihan yang diberi.',
          level: 'Sederhana'
        },
        {
          id: 't4-b3-s2-q5',
          question: 'Sebuah belon mengandungi 480 cm³ gas metana, CH₄ pada keadaan bilik. Berapakah jisim gas metana di dalam belon tersebut? [Ar: H=1, C=12; Isi padu molar gas pada keadaan bilik = 24,000 cm³ mol⁻¹]',
          options: [
            '0.02 g',
            '0.32 g',
            '3.20 g',
            '16.0 g'
          ],
          answerIndex: 1,
          explanation: 'Mol CH₄ = 480 cm³ ÷ 24,000 cm³ mol⁻¹ = 0.02 mol. Jisim molar CH₄ = 12 + 4(1) = 16 g mol⁻¹. Jisim = 0.02 mol × 16 g mol⁻¹ = 0.32 g.',
          level: 'Sederhana',
          spmReference: 'SPM 2023 Kertas 1'
        },
        {
          id: 't4-b3-s2-q6',
          question: 'Berapakah bilangan ion klorida, Cl⁻ yang terdapat di dalam 11.1 g kalsium klorida, CaCl₂? [Ar: Ca=40, Cl=35.5; NA = 6.02 × 10²³ mol⁻¹]',
          options: [
            '6.02 × 10²²',
            '1.204 × 10²³',
            '1.806 × 10²³',
            '6.02 × 10²³'
          ],
          answerIndex: 1,
          explanation: 'Molar CaCl₂ = 40 + 2(35.5) = 111 g mol⁻¹. Mol CaCl₂ = 11.1 ÷ 111 = 0.1 mol. Setiap unit CaCl₂ menghasilkan 2 ion Cl⁻ (CaCl₂ → Ca²⁺ + 2Cl⁻). Maka mol ion Cl⁻ = 0.1 × 2 = 0.2 mol. Bilangan ion Cl⁻ = 0.2 × 6.02 × 10²³ = 1.204 × 10²³ ion.',
          level: 'Tinggi (KBAT)',
          spmReference: 'Soalan KBAT Pengiraan Ion SPM'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // SUBTOPIK 3.3
    // -------------------------------------------------------------------------
    {
      id: 't4-b3-s3',
      code: '3.3',
      title: 'Formula Kimia (Empirik & Molekul)',
      learningStandard: 'SP 3.3.1, 3.3.2, 3.3.3, 3.3.4, 3.3.5',
      durationMinutes: 35,
      tldr: [
        'Formula Empirik ialah formula kimia yang menunjukkan nisbah nombor bulat teringkas atom bagi setiap unsur dalam sebatian.',
        'Formula Molekul ialah formula kimia yang menunjukkan bilangan sebenar atom bagi setiap unsur dalam satu molekul sebatian. Hubungan: Formula Molekul = (Formula Empirik)ₙ.',
        'Eksperimen Formula Empirik MgO: Logam reaktif (Mg) dibakar dalam mangkuk pijar. Penutup dibuka berkala dan ditutup segera, penyejukan & penimbangan diulang hingga jisim malar diperoleh.',
        'Eksperimen Formula Empirik CuO: Logam kurang reaktif (Cu) diturunkan oleh gas hidrogen kering dalam tiub pembakaran. Sejukkan dalam aliran gas H₂ berterusan untuk elak pengoksidaan semula.'
      ],
      simulationRef: {
        id: 'formula-empirik-mgo',
        title: 'Makmal Maya Formula Empirik Magnesium Oksida',
        description: 'Bakar pita magnesium dalam mangkuk pijar, buka penutup berkala, timbang hingga jisim malar & hitung formula empirik MgO.',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=formula-empirik-mgo',
        previewBadge: 'Simulasi Bab 3.3'
      },
      concepts: [
        {
          id: 't4-b3-s3-c1',
          title: 'Perbezaan Antara Formula Empirik dan Formula Molekul',
          badge: 'Definisi Skema SPM',
          content: `
            <div class="space-y-2 mt-2">
              <div class="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-950">
                <span class="font-bold text-sky-900 block text-sm">Formula Empirik:</span>
                Formula kimia yang menunjukkan <span class="blur-target"><b>nisbah nombor bulat paling ringkas</b></span> bagi atom setiap unsur yang terdapat di dalam sesuatu sebatian.
              </div>

              <div class="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950">
                <span class="font-bold text-indigo-900 block text-sm">Formula Molekul:</span>
                Formula kimia yang menunjukkan <span class="blur-target"><b>bilangan sebenar atom</b></span> bagi setiap unsur yang terdapat di dalam satu molekul sebatian.
              </div>
            </div>
            <div class="p-3.5 rounded-2xl bg-slate-900 text-center font-mono text-white text-xs my-2">
              <span class="text-sky-300 font-bold">Formula Molekul = (Formula Empirik)ₙ</span>
              <br />
              <span class="text-slate-300 text-[11px]">di mana n = 1, 2, 3... dan n = (Jisim Molar Sebatian) ÷ (Jisim Molar Formula Empirik)</span>
            </div>
          `,
          comparisonTable: {
            headers: ['Sebatian', 'Formula Molekul', 'Nisbah Teringkas (n)', 'Formula Empirik'],
            rows: [
              ['Air', 'H₂O', '1', 'H₂O (Sama)'],
              ['Glukosa', 'C₆H₁₂O₆', '6', 'CH₂O'],
              ['Hidrogen peroksida', 'H₂O₂', '2', 'HO'],
              ['Etena', 'C₂H₄', '2', 'CH₂'],
              ['Butana', 'C₄H₁₀', '2', 'C₂H₅']
            ]
          }
        },
        {
          id: 't4-b3-s3-c2',
          title: '2 Eksperimen Penentuan Formula Empirik dalam Makmal',
          badge: 'Eksperimen Wajib SPM',
          content: `
            <p>
              Kaedah penentuan formula empirik bergantung kepada <b>kereaktifan logam</b> terhadap oksigen:
            </p>
            <div class="space-y-3 mt-2">
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span class="font-bold text-sky-800 text-sm">Kaedah 1: Pembakaran Pita Magnesium (MgO)</span>
                <p class="text-slate-600">
                  Digunakan untuk <b>logam reaktif</b> yang lebih reaktif daripada hidrogen dalam siri kereaktifan logam seperti <span class="blur-target"><b>Magnesium (Mg), Aluminium (Al), dan Zink (Zn)</b></span>.
                </p>
                <div class="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-700 space-y-1">
                  <b>Langkah Berjaga-jaga Wajib Hafal:</b>
                  <br />
                  1. <i>Gosok pita magnesium dengan kertas pasir:</i> Menyingkirkan lapisan oksida pada permukaan logam.
                  <br />
                  2. <i>Buka penutup mangkuk pijar sedikit secara berkala:</i> Membenarkan gas oksigen masuk untuk pembakaran lengkap.
                  <br />
                  3. <i>Tutup penutup mangkuk pijar dengan serta-merta:</i> Mengelakkan <span class="blur-target"><b>wasap putih magnesium oksida daripada terbebas</b></span> ke udara (mengelakkan kehilangan jisim hasil).
                  <br />
                  4. <i>Ulang proses pemanasan, penyejukan dan penimbangan:</i> Sehingga mendapat <span class="blur-target"><b>jisim malar</b></span> bagi memastikan magnesium bertindak balas dengan lengkap.
                </div>
              </div>

              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span class="font-bold text-teal-800 text-sm">Kaedah 2: Penurunan Kuprum(II) Oksida oleh Gas Hidrogen (CuO)</span>
                <p class="text-slate-600">
                  Digunakan untuk <b>logam kurang reaktif</b> yang berada di bawah hidrogen dalam siri kereaktifan logam seperti <span class="blur-target"><b>Kuprum (Cu), Plumbum (Pb), dan Timah (Sn)</b></span>.
                </p>
                <div class="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-700 space-y-1">
                  <b>Langkah Berjaga-jaga Wajib Hafal:</b>
                  <br />
                  1. <i>Alirkan gas hidrogen selama 5–10 saat sebelum pemanasan:</i> Mengusir semua udara/oksigen di dalam tiub pembakaran bagi <span class="blur-target"><b>mengelakkan letupan campuran gas hidrogen dan udara</b></span> apabila dipanaskan.
                  <br />
                  2. <i>Uji gas hidrogen yang keluar dengan kayu uji menyala:</i> Sehingga tiada bunyi 'pop' sebelum memulakan pemanasan.
                  <br />
                  3. <i>Aliran gas hidrogen diteruskan semasa penyejukan:</i> Menghalang kuprum panas daripada bertindak balas semula dengan oksigen udara membentuk CuO semula.
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't4-b3-s3-c3',
          title: 'Jadual Standard Pengiraan Formula Empirik SPM',
          badge: 'Teknik Penskoran 4 Markah',
          content: `
            <p>
              Dalam Kertas 2 SPM, pengiraan formula empirik diperuntukkan 3–4 markah. Murid WAJIB membina jadual 5 baris berikut:
            </p>
            <div class="overflow-x-auto rounded-2xl border border-slate-200 my-2 text-xs">
              <table class="w-full text-left">
                <thead class="bg-slate-100 font-bold text-slate-700">
                  <tr>
                    <th class="p-2.5">Langkah Kerja</th>
                    <th class="p-2.5">Unsur 1 (cth: Mg)</th>
                    <th class="p-2.5">Unsur 2 (cth: O)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 bg-white">
                  <tr>
                    <td class="p-2.5 font-semibold">1. Jisim unsur (g)</td>
                    <td class="p-2.5">2.4 g</td>
                    <td class="p-2.5">1.6 g</td>
                  </tr>
                  <tr>
                    <td class="p-2.5 font-semibold">2. Bilangan mol (Jisim ÷ Ar)</td>
                    <td class="p-2.5">2.4 ÷ 24 = 0.1 mol</td>
                    <td class="p-2.5">1.6 ÷ 16 = 0.1 mol</td>
                  </tr>
                  <tr>
                    <td class="p-2.5 font-semibold">3. Nisbah mol (bahagi nilai terkecil)</td>
                    <td class="p-2.5">0.1 ÷ 0.1 = 1</td>
                    <td class="p-2.5">0.1 ÷ 0.1 = 1</td>
                  </tr>
                  <tr>
                    <td class="p-2.5 font-semibold">4. Nisbah nombor bulat teringkas</td>
                    <td class="p-2.5">1</td>
                    <td class="p-2.5">1</td>
                  </tr>
                  <tr class="bg-sky-50 font-bold text-sky-900">
                    <td class="p-2.5">5. Formula Empirik</td>
                    <td colspan="2" class="p-2.5 text-center font-mono text-sm">MgO</td>
                  </tr>
                </tbody>
              </table>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menggunakan mangkuk pijar untuk menentukan formula empirik kuprum(II) oksida (CuO).',
          correction: 'Kuprum(II) oksida tidak boleh dibakar dengan oksigen di dalam mangkuk pijar kerana ia sudah menjadi oksida! CuO mesti diturunkan menggunakan gas hidrogen di dalam tiub pembakaran.',
          why: 'Logam Cu kurang reaktif daripada hidrogen, maka gas hidrogen berupaya menyingkirkan oksigen daripada CuO (CuO + H₂ → Cu + H₂O).',
          spmTip: 'Ingat: Logam atas hidrogen (Mg) guna mangkuk pijar; Logam bawah hidrogen (Cu, Pb) guna tiub pembakaran + aliran gas H₂.'
        },
        {
          mistake: 'Membundarkan nisbah mol 1 : 1.5 secara terus menjadi 1 : 2.',
          correction: 'Jika nisbah mol mengandungi pecahan perpuluhan 1.5, darabkan SEMUA nombor dengan 2 (cth: 1 × 2 = 2, 1.5 × 2 = 3 → Nisbah nombor bulat ialah 2 : 3).',
          why: 'Membundarkan 1.5 kepada 2 mengubah formula kimia sebatian sebenar (cth: Fe₂O₃ menjadi FeO₂ yang salah).',
          spmTip: 'Nisbah .5 darab 2; Nisbah .33 darab 3.'
        }
      ],
      flashcards: [
        {
          id: 't4-b3-s3-fc1',
          front: 'Apakah perbezaan definisi antara Formula Empirik dan Formula Molekul?',
          back: 'Formula empirik menunjukkan nisbah nombor bulat teringkas atom unsur, manakala formula molekul menunjukkan bilangan sebenar atom unsur dalam molekul.'
        },
        {
          id: 't4-b3-s3-fc2',
          front: 'Mengapakah penutup mangkuk pijar perlu dibuka sedikit secara berkala semasa pemanasan pita magnesium?',
          back: 'Untuk membenarkan gas oksigen dari udara masuk bagi memastikan magnesium terbakar dengan lengkap.'
        },
        {
          id: 't4-b3-s3-fc3',
          front: 'Mengapakah penutup mangkuk pijar mesti ditutup dengan serta-merta selepas dibuka sedikit?',
          back: 'Untuk mengelakkan wasap putih magnesium oksida (MgO) daripada terbebas keluar dan menyebabkan kehilangan jisim.'
        },
        {
          id: 't4-b3-s3-fc4',
          front: 'Mengapakah gas hidrogen perlu dialirkan selama beberapa saat sebelum memanaskan kuprum(II) oksida?',
          back: 'Untuk menyingkirkan semua udara di dalam tiub pembakaran bagi mengelakkan letupan campuran gas hidrogen dan oksigen.'
        },
        {
          id: 't4-b3-s3-fc5',
          front: 'Suatu hidrokarbon mempunyai formula empirik CH₂ dan jisim molar 56 g mol⁻¹. Apakah formula molekulnya? [Ar: C=12, H=1]',
          back: 'Jisim molar CH₂ = 12 + 2(1) = 14.\nn = 56 ÷ 14 = 4.\nFormula Molekul = (CH₂)₄ = C₄H₈ (butena).'
        }
      ],
      quiz: [
        {
          id: 't4-b3-s3-q1',
          question: 'Sebatian manakah yang mempunyai formula empirik yang SAMA dengan formula molekulnya?',
          options: [
            'Glukosa, C₆H₁₂O₆',
            'Air, H₂O',
            'Etena, C₂H₄',
            'Butana, C₄H₁₀'
          ],
          answerIndex: 1,
          explanation: 'Formula molekul air ialah H₂O. Nisbah atom H kepada O ialah 2:1 (sudah paling ringkas), maka formula empirik dan formula molekulnya adalah sama.',
          level: 'Rendah'
        },
        {
          id: 't4-b3-s3-q2',
          question: 'Antara oksida logam berikut, yang manakah formula empiriknya SESUAI ditentukan menggunakan kaedah tiub pembakaran dengan aliran gas hidrogen kering?',
          options: [
            'Magnesium oksida, MgO',
            'Aluminium oksida, Al₂O₃',
            'Kuprum(II) oksida, CuO',
            'Kalsium oksida, CaO'
          ],
          answerIndex: 2,
          explanation: 'Kaedah tiub pembakaran dengan aliran gas H₂ hanya boleh digunakan untuk oksida logam yang kurang reaktif daripada hidrogen (seperti CuO dan PbO). Logam reaktif seperti Mg, Al, Ca tidak dapat diturunkan oleh gas hidrogen.',
          level: 'Sederhana',
          spmReference: 'SPM 2021 Kertas 1'
        },
        {
          id: 't4-b3-s3-q3',
          question: 'Semasa menentukan formula empirik magnesium oksida, seorang murid mendapati jisim mangkuk pijar + penutup + hasil ialah: Pemanasan 1 = 28.50 g, Pemanasan 2 = 28.35 g, Pemanasan 3 = 28.35 g. Mengapakah proses pemanasan diulang berkali-kali?',
          options: [
            'Untuk mengeringkan wap air daripada mangkuk pijar',
            'Bagi memastikan semua magnesium telah bertindak balas secara lengkap dengan oksigen (mencapai jisim malar)',
            'Untuk mengelakkan mangkuk pijar daripada retak',
            'Bagi membuang bendasing karbon dioksida'
          ],
          answerIndex: 1,
          explanation: 'Pemanasan, penyejukan dan penimbangan diulang sehingga bacaan jisim adalah sama (jisim malar) bagi memastikan semua pita magnesium telah bertindak balas lengkap.',
          level: 'Sederhana',
          spmReference: 'Percubaan SPM MRSM 2023'
        },
        {
          id: 't4-b3-s3-q4',
          question: 'Dalam satu eksperimen, 3.2 g kuprum berpadu dengan 0.8 g oksigen membentuk kuprum oksida. Apakah formula empirik bagi kuprum oksida tersebut? [Ar: Cu=64, O=16]',
          options: [
            'CuO',
            'Cu₂O',
            'CuO₂',
            'Cu₂O₃'
          ],
          answerIndex: 0,
          explanation: 'Mol Cu = 3.2 ÷ 64 = 0.05 mol. Mol O = 0.8 ÷ 16 = 0.05 mol. Nisbah Cu : O = 0.05 : 0.05 = 1 : 1. Formula empirik = CuO.',
          level: 'Sederhana'
        },
        {
          id: 't4-b3-s3-q5',
          question: 'Suatu sebatian mengandungi 85.7% karbon dan 14.3% hidrogen mengikut jisim. Jisim molekul relatif sebatian ini ialah 42. Apakah formula molekul bagi sebatian tersebut? [Ar: C=12, H=1]',
          options: [
            'CH₂',
            'C₂H₄',
            'C₃H₆',
            'C₄H₈'
          ],
          answerIndex: 2,
          explanation: 'Mol C = 85.7 ÷ 12 = 7.14; Mol H = 14.3 ÷ 1 = 14.3. Nisbah = 7.14 : 14.3 = 1 : 2 → Formula empirik = CH₂. Jisim molar CH₂ = 12 + 2 = 14. n = 42 ÷ 14 = 3. Formula Molekul = (CH₂)₃ = C₃H₆ (propena).',
          level: 'Tinggi (KBAT)',
          spmReference: 'SPM 2022 Kertas 2 Bahagian B'
        },
        {
          id: 't4-b3-s3-q6',
          question: 'Mengapakah aliran gas hidrogen mesti diteruskan semasa tiub pembakaran dibiarkan menyejuk selepas pemanasan kuprum(II) oksida dihentikan?',
          options: [
            'Untuk mengelakkan tiub pembakaran daripada retak akibat perubahan suhu mendadak',
            'Bagi menghalang kuprum panas yang terbentuk daripada bertindak balas semula dengan oksigen udara menghasilkan CuO semula',
            'Untuk mempercepatkan pemeluwapan wap air',
            'Supaya gas hidrogen yang berlebihan dapat dikitar semula'
          ],
          answerIndex: 1,
          explanation: 'Kuprum yang masih panas sangat mudah bertindak balas semula dengan oksigen dalam udara menghasilkan lapisan hitam CuO sekiranya aliran gas hidrogen dihentikan sebelum sejuk.',
          level: 'Tinggi (KBAT)',
          spmReference: 'Soalan KBAT Amali Kertas 3 SPM'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // SUBTOPIK 3.4
    // -------------------------------------------------------------------------
    {
      id: 't4-b3-s4',
      code: '3.4',
      title: 'Persamaan Kimia dan Stoikiometri',
      learningStandard: 'SP 3.4.1, 3.4.2, 3.4.3',
      durationMinutes: 25,
      tldr: [
        'Persamaan kimia mewakili tindak balas menggunakan formula kimia bahan dan hasil tindak balas serta simbol keadaan fizik: (s) pepejal, (l) cecair, (g) gas, dan (aq) larutan akueus.',
        'Hukum Keabadian Jisim menyatakan atom tidak boleh dicipta atau dimusnahkan. Oleh itu bilangan setiap jenis atom di sebelah kiri (reaktan) MESTI sama dengan di sebelah kanan (produk).',
        'Pekali stoikiometri dalam persamaan kimia berimbang mewakili nisbah mol antara bahan tindak balas dan hasil tindak balas.',
        'Kaedah 3 Langkah Stoikiometri SPM: 1. Imbangkan persamaan kimia → 2. Tukarkan maklumat yang diberi kepada bilangan mol → 3. Gunakan nisbah mol untuk mencari kuantiti yang dikehendaki.'
      ],
      simulationRef: {
        id: 'penyeimbangan-persamaan-kimia',
        title: 'Makmal Maya Penyeimbangan Persamaan Kimia',
        description: 'Imbangkan persamaan kimia secara visual dengan model molekul interaktif masa nyata.',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=penyeimbangan-persamaan-kimia',
        previewBadge: 'Simulasi Bab 3.4'
      },
      concepts: [
        {
          id: 't4-b3-s4-c1',
          title: 'Format Penulisan Persamaan Kimia Berimbang',
          badge: 'Format Rasmi SPM',
          content: `
            <p>
              Persamaan kimia menghubungkan <b>bahan tindak balas (reaktan)</b> di sebelah kiri anak panah dengan <b>hasil tindak balas (produk)</b> di sebelah kanan anak panah:
            </p>
            <div class="p-3.5 rounded-2xl bg-slate-900 text-center font-mono text-white text-xs my-2">
              <span class="text-sky-300 font-bold">2Mg (s) + O₂ (g) → 2MgO (s)</span>
            </div>
            <p class="text-xs text-slate-700 leading-relaxed">
              <b>Simbol Keadaan Fizik:</b>
              <br />
              • $(s)$ = pepejal (*solid*)
              <br />
              • $(l)$ = cecair (*liquid*)
              <br />
              • $(g)$ = gas
              <br />
              • $(aq)$ = larutan akueus (*larut dalam air*)
            </p>
          `
        },
        {
          id: 't4-b3-s4-c2',
          title: 'Tafsiran Persamaan Kimia Secara Kualitatif dan Kuantitatif',
          badge: 'Wajib Kuasai SPM',
          content: `
            <p>
              Pertimbangkan persamaan kimia berimbang berikut:
            </p>
            <div class="p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-center font-mono text-indigo-950 text-xs my-2 font-bold">
              2H₂ (g) + O₂ (g) → 2H₂O (l)
            </div>
            <div class="space-y-2 mt-2">
              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-sky-800">1. Tafsiran Kualitatif:</span>
                <p class="text-slate-600 mt-0.5">
                  Gas hidrogen bertindak balas dengan gas oksigen untuk menghasilkan cecair air.
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span class="font-bold text-teal-800">2. Tafsiran Kuantitatif (Nisbah Mol):</span>
                <p class="text-slate-600 mt-0.5">
                  <span class="blur-target"><b>2 mol gas hidrogen</b></span> bertindak balas dengan <span class="blur-target"><b>1 mol gas oksigen</b></span> untuk menghasilkan <span class="blur-target"><b>2 mol cecair air</b></span>.
                </p>
              </div>
            </div>
          `
        },
        {
          id: 't4-b3-s4-c3',
          title: 'Panduan 3 Langkah Pengiraan Stoikiometri SPM',
          badge: 'Teknik Menjawab Kertas 2',
          content: `
            <p>
              Untuk menyelesaikan sebarang masalah stoikiometri dalam peperiksaan SPM:
            </p>
            <div class="space-y-2.5 my-2">
              <div class="p-3 rounded-2xl bg-sky-50 border border-sky-200 text-xs">
                <span class="font-bold text-sky-900 block">Langkah 1: Tulis & Seimbangkan Persamaan Kimia</span>
                <span class="text-slate-600 font-mono text-[11px]">Cth: CaCO₃ (s) + 2HCl (aq) → CaCl₂ (aq) + H₂O (l) + CO₂ (g)</span>
              </div>

              <div class="p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs">
                <span class="font-bold text-indigo-900 block">Langkah 2: Hitung Bilangan Mol Bahan yang Diberi</span>
                <span class="text-slate-600 font-mono text-[11px]">Mol CaCO₃ = Jisim ÷ Jisim Molar = 10 g ÷ 100 g mol⁻¹ = 0.1 mol</span>
              </div>

              <div class="p-3 rounded-2xl bg-teal-50 border border-teal-200 text-xs">
                <span class="font-bold text-teal-900 block">Langkah 3: Gunakan Nisbah Mol Persamaan untuk Cari Hasil</span>
                <span class="text-slate-600 text-[11px] leading-relaxed block mt-0.5">
                  Berdasarkan persamaan: 1 mol CaCO₃ menghasilkan 1 mol CO₂.
                  <br />
                  Maka 0.1 mol CaCO₃ menghasilkan <b>0.1 mol CO₂</b>.
                  <br />
                  Isi padu CO₂ pada keadaan bilik = 0.1 mol × 24 dm³ mol⁻¹ = <b>2.4 dm³ (2400 cm³)</b>.
                </span>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Mengubah nombor formula kimia (subskrip) untuk mengimbangi persamaan kimia.',
          correction: 'HANYA laras nombor pekali di hadapan formula kimia! JANGAN ubah formula kimia asal. Contoh: Untuk mengimbangi O₂, tambah pekali 2 di hadapan H₂O (2H₂O), BUKAN menukar H₂O menjadi H₂O₂.',
          why: 'Mengubah subskrip nombor menghasilkan sebatian kimia yang berbeza sama sekali (H₂O₂ ialah hidrogen peroksida, bukan air).',
          spmTip: 'Sentiasa imbangkan atom logam terlebih dahulu, diikuti bukan logam, hidrogen, dan akhir sekali oksigen.'
        },
        {
          mistake: 'Terus membandingkan jisim bahan secara langsung tanpa menukar kepada bilangan mol terlebih dahulu.',
          correction: 'Nisbah pekali dalam persamaan kimia ialah NISBAH MOL, bukan nisbah jisim! Wajib tukar jisim kepada mol dahulu.',
          why: 'Atom-atom unsur mempunyai jisim atom relatif yang berbeza, maka 1 gram bahan A tidak mengandungi bilangan zarah yang sama dengan 1 gram bahan B.',
          spmTip: 'Kunci stoikiometri SPM: Maklumat Diberi → Tukar ke Mol → Nisbah Mol → Kuantiti Ditanya.'
        }
      ],
      flashcards: [
        {
          id: 't4-b3-s4-fc1',
          front: 'Apakah maksud simbol keadaan fizik (s), (l), (g), dan (aq)?',
          back: '(s) = pepejal, (l) = cecair, (g) = gas, (aq) = larutan akueus (larut dalam air).'
        },
        {
          id: 't4-b3-s4-fc2',
          front: 'Apakah yang diwakili oleh nombor pekali di hadapan formula kimia dalam persamaan berimbang?',
          back: 'Mewakili nisbah mol antara bahan tindak balas dan hasil tindak balas.'
        },
        {
          id: 't4-b3-s4-fc3',
          front: 'Tuliskan persamaan kimia berimbang bagi penguraian terma kuprum(II) karbonat, CuCO₃.',
          back: 'CuCO₃ (s) → CuO (s) + CO₂ (g)'
        },
        {
          id: 't4-b3-s4-fc4',
          front: 'Nyatakan 3 langkah utama menyelesaikan masalah stoikiometri numerikal.',
          back: '1. Imbangkan persamaan kimia.\n2. Tukar kuantiti yang diberi kepada bilangan mol.\n3. Gunakan nisbah mol untuk hitung kuantiti yang dicari.'
        },
        {
          id: 't4-b3-s4-fc5',
          front: 'Berapakah isi padu gas CO₂ terbebas pada keadaan bilik apabila 0.05 mol CaCO₃ bertindak balas lengkap dengan asid hidroklorik berlebihan? [Isi padu molar = 24 dm³ mol⁻¹]',
          back: 'Nisbah mol CaCO₃ : CO₂ = 1 : 1. Mol CO₂ = 0.05 mol. Isi padu = 0.05 × 24 = 1.2 dm³ (1,200 cm³).'
        }
      ],
      quiz: [
        {
          id: 't4-b3-s4-q1',
          question: 'Persamaan kimia berikut belum seimbang: aAl + bO₂ → cAl₂O₃. Apakah nilai pekali a, b, dan c yang betul?',
          options: [
            'a = 2, b = 3, c = 1',
            'a = 4, b = 3, c = 2',
            'a = 4, b = 2, c = 2',
            'a = 2, b = 1, c = 1'
          ],
          answerIndex: 1,
          explanation: '4Al + 3O₂ → 2Al₂O₃. Sebelah kiri: 4 atom Al, 6 atom O. Sebelah kanan: 2 × 2 = 4 atom Al, 2 × 3 = 6 atom O. Persamaan seimbang!',
          level: 'Rendah',
          spmReference: 'SPM 2021 Kertas 1'
        },
        {
          id: 't4-b3-s4-q2',
          question: 'Pembakaran lengkap gas propana diwakili oleh persamaan: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. Berapakah isi padu gas oksigen yang diperlukan untuk membakar 2.2 g gas propana dengan lengkap pada keadaan bilik? [Ar: H=1, C=12; Isi padu molar = 24 dm³ mol⁻¹]',
          options: [
            '1.2 dm³',
            '2.4 dm³',
            '6.0 dm³',
            '12.0 dm³'
          ],
          answerIndex: 2,
          explanation: 'Molar C₃H₈ = 3(12) + 8(1) = 44 g mol⁻¹. Mol C₃H₈ = 2.2 ÷ 44 = 0.05 mol. Daripada persamaan: 1 mol C₃H₈ memerlukan 5 mol O₂. Maka mol O₂ = 0.05 × 5 = 0.25 mol. Isi padu O₂ = 0.25 mol × 24 dm³ mol⁻¹ = 6.0 dm³.',
          level: 'Sederhana',
          spmReference: 'Percubaan SPM SBP 2023'
        },
        {
          id: 't4-b3-s4-q3',
          question: 'Penguraian terma kalsium nitrat diwakili oleh persamaan: 2Ca(NO₃)₂ (s) → 2CaO (s) + 4NO₂ (g) + O₂ (g). Jika 0.1 mol Ca(NO₃)₂ terurai dengan lengkap, berapakah JUMLAH isi padu gas (NO₂ + O₂) yang terbebas pada keadaan bilik? [Isi padu molar = 24 dm³ mol⁻¹]',
          options: [
            '2.4 dm³',
            '4.8 dm³',
            '6.0 dm³',
            '12.0 dm³'
          ],
          answerIndex: 2,
          explanation: '2 mol Ca(NO₃)₂ menghasilkan (4 + 1) = 5 mol gas. Maka 0.1 mol Ca(NO₃)₂ menghasilkan: (5 ÷ 2) × 0.1 = 0.25 mol gas. Jumlah isi padu gas = 0.25 mol × 24 dm³ mol⁻¹ = 6.0 dm³.',
          level: 'Tinggi (KBAT)',
          spmReference: 'Soalan Aplikasi Kertas 2 SPM'
        },
        {
          id: 't4-b3-s4-q4',
          question: 'Persamaan kimia berikut menunjukkan tindak balas penyesaran: Zn (s) + CuSO₄ (aq) → ZnSO₄ (aq) + Cu (s). Jika 6.5 g zink ditambah kepada larutan kuprum(II) sulfat berlebihan, berapakah jisim kuprum yang termendap? [Ar: Zn=65, Cu=64]',
          options: [
            '3.2 g',
            '6.4 g',
            '12.8 g',
            '64.0 g'
          ],
          answerIndex: 1,
          explanation: 'Mol Zn = 6.5 ÷ 65 = 0.1 mol. Nisbah mol Zn : Cu = 1 : 1. Maka mol Cu termendap = 0.1 mol. Jisim Cu = 0.1 mol × 64 g mol⁻¹ = 6.4 g.',
          level: 'Sederhana'
        },
        {
          id: 't4-b3-s4-q5',
          question: 'Apakah yang dimaksudkan dengan simbol "(aq)" yang ditulis selepas formula kimia sesuatu bahan tindak balas?',
          options: [
            'Bahan tersebut wujud dalam fasa cecair tulen',
            'Bahan tersebut telah dilarutkan di dalam air membentuk larutan akueus',
            'Bahan tersebut ialah gas yang mudah terpeluwap',
            'Bahan tersebut ialah mendakan tidak larut'
          ],
          answerIndex: 1,
          explanation: 'Simbol (aq) bermaksud akueus (aqueous), iaitu bahan tersebut terlarut di dalam air sebagai pelarut.',
          level: 'Rendah'
        },
        {
          id: 't4-b3-s4-q6',
          question: '10.8 g serbuk aluminium bertindak balas lengkap dengan asid sulfurik mengikut persamaan: 2Al + 3H₂SO₄ → Al₂(SO₄)₃ + 3H₂. Berapakah bilangan molekul gas hidrogen yang terhasil? [Ar: Al=27; NA = 6.02 × 10²³ mol⁻¹]',
          options: [
            '1.806 × 10²³',
            '3.612 × 10²³',
            '6.02 × 10²³',
            '1.204 × 10²⁴'
          ],
          answerIndex: 1,
          explanation: 'Mol Al = 10.8 ÷ 27 = 0.4 mol. Nisbah mol 2 mol Al : 3 mol H₂. Maka mol H₂ = (3 ÷ 2) × 0.4 = 0.6 mol H₂. Bilangan molekul H₂ = 0.6 × 6.02 × 10²³ = 3.612 × 10²³ molekul.',
          level: 'Tinggi (KBAT)',
          spmReference: 'SPM Kertas 2 Stoikiometri Gas'
        }
      ]
    }
  ]
};
