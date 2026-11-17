import { Chapter } from '../types/nota';

export const T4_BAB6: Chapter = {
  id: 't4-b6',
  form: 'T4',
  chapterNumber: 6,
  title: 'Asid, Bes dan Garam',
  theme: 'Interaksi Antara Jirim',
  durationMinutes: 240,
  subtopicCount: 11,
  iconName: 'FlaskConical',
  description: 'Memahami konsep asid, bes, nilai pH, kekuatan & kepekatan asid-alkali, penyediaan larutan piawai, pentitratan, sintesis garam, tindakan haba serta analisis kualitatif kation, anion dan gas SPM.',
  subtopics: [
    {
      id: 't4-b6-s1',
      code: '6.1',
      title: 'Peranan Air dalam Menunjukkan Sifat Asid dan Alkali',
      learningStandard: 'SP 6.1.1, 6.1.2, 6.1.3',
      durationMinutes: 15,
      tldr: [
        'Asid hanya menunjukkan sifat keasidannya dengan kehadiran air kerana molekul asid mengion menghasilkan ion hidrogen, H⁺ (atau ion hidroksonium, H₃O⁺).',
        'Tanpa air (contoh: dalam pelarut organik seperti propanon atau metilbenzena), asid kekal sebagai molekul neutral ringkas tanpa ion H⁺ bebas bergerak.',
        'Alkali ialah bes yang larut dalam air dan mengion menghasilkan ion hidroksida, OH⁻ bebas bergerak.',
        'Kertas litmus biru kekal biru dalam asid glasial atau pelarut organik kering kerana tiada ion H⁺ untuk bertindak balas.'
      ],
      concepts: [
        {
          id: 'c1_1',
          title: 'Definisi Asid Mengikut Teori Arrhenius (KSSM)',
          content: 'Asid ialah sebatian kimia yang <b>mengion di dalam air</b> untuk menghasilkan <span class="blur-target"><b>ion hidrogen, H⁺</b></span> atau ion hidroksonium, H₃O⁺ sebagai satu-satunya ion positif.<br/><br/>Contoh pembentukan ion hidroksonium:<br/>Molekul air mendermakan sepasang elektron bebas kepada ion H⁺ membentuk ikatan datif.',
          equations: [
            {
              equation: 'HCl(g) + H₂O(c) → H₃O⁺(ak) + Cl⁻(ak)',
              qualitative: 'Gas hidrogen klorida mengion sepenuhnya dalam air membentuk ion hidroksonium dan ion klorida.',
              quantitative: '1 mol gas HCl bertindak balas dengan air menghasilkan 1 mol ion H₃O⁺ dan 1 mol ion Cl⁻.'
            }
          ]
        },
        {
          id: 'c1_2',
          title: 'Perbandingan Asid dalam Air vs Pelarut Organik',
          content: 'Dalam SPM, eksperimen membandingkan asid oksalik atau asid etanoik dalam air suling dan propanon sering disoal dalam Kertas 2 Bahagian B/C.',
          comparisonTable: {
            headers: ['Ciri / Pemerhatian', 'Asid Etanoik Glasial + Air', 'Asid Etanoik Glasial + Propanon'],
            rows: [
              ['Jenis Zarah', '<span class="blur-target">Ion H⁺ dan ion CH₃COO⁻</span> bebas bergerak', '<span class="blur-target">Molekul CH₃COOH neutral</span> sahaja'],
              ['Kertas Litmus Biru Kering', 'Bertukar dari <span class="blur-target">biru ke merah</span>', '<span class="blur-target">Kekal biru</span> (tiada perubahan)'],
              ['Kekonduksian Elektrik', '<span class="blur-target">Mengalirkan arus elektrik</span> (jarum terpesong)', '<span class="blur-target">Tidak mengalirkan arus</span>'],
              ['Tindak Balas dengan Logam Mg', '<span class="blur-target">Pembuakan gas hidrogen, H₂</span> terhasil', '<span class="blur-target">Tiada perubahan</span>']
            ]
          }
        },
        {
          id: 'c1_3',
          title: 'Definisi Bes dan Alkali',
          content: 'Bes ialah bahan yang bertindak balas dengan asid untuk menghasilkan <b>garam dan air sahaja</b> (biasanya oksida logam atau hidroksida logam).<br/><br/><b>Alkali</b> ialah <span class="blur-target">bes yang LARUT dalam air</span> dan mengion menghasilkan <b>ion hidroksida, OH⁻</b>.<br/><i>Ingat: Semua alkali adalah bes, tetapi bukan semua bes adalah alkali!</i> (Contoh bes tak larut: CuO, Fe(OH)₃, PbO).'
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menyatakan "asid berasid kerana ada atom hidrogen".',
          correction: 'Asid menunjukkan sifat asid kerana mengion menghasilkan ion hidrogen, H⁺ bebas dalam air, BUKAN sekadar ada atom hidrogen.',
          why: 'Bahan seperti glukosa (C₆H₁₂O₆) atau etanol (C₂H₅OH) mempunyai atom hidrogen tetapi neutral kerana tidak mengion menghasilkan ion H⁺.',
          spmTip: 'Wajib sebut "mengion dalam air menghasilkan ion H⁺" dalam skema definisi!'
        },
        {
          mistake: 'Menggunakan kertas litmus biru lembap untuk asid dalam pelarut organik.',
          correction: 'Jika kertas litmus lembap digunakan, air pada kertas litmus akan menyebabkan asid mengion dan menukarkan warna kertas litmus! Kertas litmus KERING mesti digunakan.',
          why: 'Air pada kertas litmus mencukupi untuk memicu pengionan asid.'
        }
      ],
      simulationRef: {
        id: 'pentitratan-asid-alkali',
        title: 'Makmal Maya Sifat Asid & Pentitratan',
        url: 'https://simulasikimia.cikguhafreez.my/',
        description: 'Uji tindakan asid dengan pelbagai pelarut dan perhatikan kehadiran zarah ion H⁺ di bawah kanta submikroskopik.',
        previewBadge: 'Simulasi Berkaitan'
      },
      flashcards: [
        { id: 'fc1_1', front: 'Apakah zarah yang bertanggungjawab menunjukkan sifat keasidan?', back: 'Ion hidrogen, H⁺ (atau ion hidroksonium, H₃O⁺) yang bebas bergerak dalam larutan akueus.' },
        { id: 'fc1_2', front: 'Mengapakah asid etanoik dalam propanon tidak menukarkan kertas litmus biru kering?', back: 'Kerana tiada air. Asid etanoik kekal wujud sebagai molekul neutral ringkas dan tidak mengion, maka tiada ion H⁺ hadir.' },
        { id: 'fc1_3', front: 'Apakah perbezaan antara bes dan alkali?', back: 'Bes ialah sebatian yang meneutralkan asid menghasilkan garam + air. Alkali ialah bes yang LARUT dalam air dan menghasilkan ion OH⁻.' },
        { id: 'fc1_4', front: 'Berikan satu contoh bes yang bukan alkali.', back: 'Kuprum(II) oksida, CuO atau ferum(III) hidroksida, Fe(OH)₃ (kerana kedua-duanya tidak larut dalam air).' },
        { id: 'fc1_5', front: 'Bagaimanakah ikatan datif terbentuk dalam ion H₃O⁺?', back: 'Atom oksigen dalam molekul air menyumbangkan sepasang elektron bebas untuk dikongsi dengan ion H⁺ yang tidak mempunyai elektron.' }
      ],
      quiz: [
        {
          id: 'q1_1',
          question: 'Antara bahan berikut, yang manakah akan menukarkan warna kertas litmus biru kering kepada merah?',
          options: [
            'Gas hidrogen klorida terlarut dalam metilbenzena',
            'Ketulan asid sitrik kering',
            'Asid etanoik glasial ditambah air suling',
            'Larutan glukosa dalam air'
          ],
          answerIndex: 2,
          explanation: 'Asid etanoik glasial hanya mengion menghasilkan ion H⁺ yang bertanggungjawab untuk menukarkan kertas litmus biru ke merah apabila air hadir.',
          level: 'Rendah'
        },
        {
          id: 'q1_2',
          question: 'Suatu pepejal putih X tidak menunjukkan sebarang kesan terhadap kertas litmus biru kering. Apabila dilarutkan dalam air, larutan yang terhasil bertindak balas dengan pita magnesium untuk menghasilkan gas yang menyala dengan bunyi "pop". Apakah pepejal X?',
          options: ['Natrium hidroksida', 'Asid tartarik', 'Glukosa', 'Kuprum(II) sulfat'],
          answerIndex: 1,
          explanation: 'Asid tartarik pepejal kering tidak mengion. Dalam air, ia mengion menghasilkan ion H⁺ yang bertindak balas dengan pita magnesium menghasilkan gas hidrogen, H₂.',
          level: 'Sederhana',
          spmReference: 'SPM 2021 Kertas 1'
        },
        {
          id: 'q1_3',
          question: 'Rajah menunjukkan sebuah litar elektrik di mana elektrod karbon dicelup ke dalam asid etanoik dalam pelarut propanon. Mentol tidak menyala. Apakah penerangan mikroskopik yang paling tepat?',
          options: [
            'Terdapat terlalu banyak elektron bebas dalam propanon',
            'Asid etanoik terurai menjadi gas metana',
            'Asid etanoik wujud sebagai molekul neutral dan tiada ion bebas bergerak',
            'Propanon bertindak sebagai elektrolit kuat'
          ],
          answerIndex: 2,
          explanation: 'Tanpa kehadiran air, asid etanoik wujud semata-mata sebagai molekul kovalen neutral CH₃COOH tanpa sebarang ion bebas bergerak untuk mengalirkan arus.',
          level: 'Sederhana'
        },
        {
          id: 'q1_4',
          question: 'Antara pasangan sebatian berikut, yang manakah kedua-duanya merupakan alkali?',
          options: ['NaOH dan CuO', 'KOH dan Ba(OH)₂', 'Ca(OH)₂ dan Fe(OH)₃', 'NH₃ dan PbO'],
          answerIndex: 1,
          explanation: 'Kalium hidroksida (KOH) dan barium hidroksida (Ba(OH)₂) adalah hidroksida logam yang larut dalam air, menjadikannya alkali. CuO, Fe(OH)₃ dan PbO tidak larut dalam air.',
          level: 'Rendah'
        },
        {
          id: 'q1_5',
          question: 'Seorang murid mendapati larutan asid hidroklorik 1.0 mol dm⁻³ mengalirkan arus lebih tinggi berbanding asid etanoik 1.0 mol dm⁻³. Apakah inferens yang tepat?',
          options: [
            'Asid hidroklorik ialah asid kuat yang mengion lengkap menghasilkan kepekatan ion H⁺ yang lebih tinggi',
            'Asid etanoik mempunyai jisim molar yang lebih besar',
            'Asid hidroklorik mempunyai nilai pH yang lebih tinggi',
            'Asid etanoik tidak mengandungi molekul air'
          ],
          answerIndex: 0,
          explanation: 'HCl mengion lengkap 100% menghasilkan kepekatan ion H⁺ bebas yang tinggi, manakala asid etanoik hanya mengion separa, menghasilkan kepekatan ion yang jauh lebih rendah.',
          level: 'Tinggi (KBAT)'
        },
        {
          id: 'q1_6',
          question: 'Gas ammonia kering dilarutkan ke dalam triklorometana. Apakah pemerhatian apabila sehelai kertas litmus merah kering dicelupkan ke dalam larutan tersebut?',
          options: [
            'Kertas litmus merah kekal merah',
            'Kertas litmus merah bertukar biru',
            'Kertas litmus merah dinyahwarnakan',
            'Kertas litmus merah bertukar hijau'
          ],
          answerIndex: 0,
          explanation: 'Dalam pelarut organik bukan akueus seperti triklorometana, molekul ammonia tidak mengion dan tiada ion OH⁻ terhasil. Maka kertas litmus merah kering kekal merah.',
          level: 'Sederhana'
        }
      ]
    },
    {
      id: 't4-b6-s2',
      code: '6.2',
      title: 'Nilai pH dan Kegunaannya',
      learningStandard: 'SP 6.2.1, 6.2.2, 6.2.3',
      durationMinutes: 15,
      tldr: [
        'pH ialah ukuran logaritma kepekatan ion hidrogen dalam larutan: pH = -log₁₀[H⁺].',
        'pOH ialah ukuran kepekatan ion hidroksida: pOH = -log₁₀[OH⁻], dan pada 25 °C: pH + pOH = 14.',
        'Semakin tinggi kepekatan ion H⁺, semakin rendah nilai pH (semakin berasid).',
        'Perubahan 1 unit skala pH mewakili perubahan 10 kali ganda kepekatan ion H⁺.'
      ],
      concepts: [
        {
          id: 'c2_1',
          title: 'Rumus Matematik Skala pH KSSM',
          content: 'Dalam silibus KSSM Kimia Tingkatan 4, murid wajib boleh mengira nilai pH menggunakan fungsi logaritma asas 10:<br/><br/>' +
                   '<div class="chem-equation"><b>pH = -log₁₀[H⁺]</b><br/><b>pOH = -log₁₀[OH⁻]</b><br/><b>pH + pOH = 14</b></div><br/>' +
                   'Di mana <b>[H⁺]</b> ialah kepekatan ion hidrogen dalam unit <b>mol dm⁻³</b>.',
          tips: 'Gunakan kalkulator saintifik: tekan (-) kemudian [log] kemudian masukkan nilai kepekatan ion.'
        },
        {
          id: 'c2_2',
          title: 'Hubungan Antara Kepekatan Ion H⁺ dan Nilai pH',
          content: 'Apabila kepekatan ion H⁺ bertambah sebanyak <b>10 kali ganda</b>, nilai pH berkurang sebanyak <span class="blur-target"><b>1 unit</b></span>.<br/>' +
                   'Contoh:<br/>' +
                   '• [H⁺] = 0.1 mol dm⁻³ (10⁻¹ M) → pH = 1<br/>' +
                   '• [H⁺] = 0.01 mol dm⁻³ (10⁻² M) → pH = 2<br/>' +
                   '• [H⁺] = 0.001 mol dm⁻³ (10⁻³ M) → pH = 3'
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menganggap larutan dengan pH 2 mempunyai kepekatan H⁺ dua kali ganda berbanding pH 1.',
          correction: 'Skala pH adalah skala logaritma (kuasa 10). pH 1 mempunyai kepekatan ion H⁺ 10 kali ganda lebih pekat daripada pH 2!',
          why: 'Logaritma berasas 10, jadi perbezaan 1 unit mewakili faktor 10x.'
        }
      ],
      flashcards: [
        { id: 'fc2_1', front: 'Apakah rumus bagi pengiraan nilai pH?', back: 'pH = -log₁₀[H⁺]' },
        { id: 'fc2_2', front: 'Berapakah nilai pH bagi larutan asid hidroklorik, HCl 0.001 mol dm⁻³?', back: 'pH = -log(0.001) = -log(10⁻³) = 3.0' },
        { id: 'fc2_3', front: 'Berapakah hubungan antara pH dan pOH pada suhu 25 °C?', back: 'pH + pOH = 14' },
        { id: 'fc2_4', front: 'Jika larutan NaOH mempunyai [OH⁻] = 0.01 mol dm⁻³, hitung nilai pH.', back: 'pOH = -log(0.01) = 2.0 → pH = 14 - 2 = 12.0' },
        { id: 'fc2_5', front: 'Apakah yang berlaku kepada nilai pH apabila asid dicairkan dengan air suling?', back: 'Nilai pH akan meningkat mendekati 7 (kepekatan ion H⁺ berkurang).' }
      ],
      quiz: [
        {
          id: 'q2_1',
          question: 'Hitung nilai pH bagi larutan asid nitrik, HNO₃ yang mempunyai kepekatan 0.05 mol dm⁻³.',
          options: ['1.30', '2.00', '0.50', '2.30'],
          answerIndex: 0,
          explanation: 'pH = -log(0.05) = 1.301 ≈ 1.30.',
          level: 'Rendah'
        },
        {
          id: 'q2_2',
          question: 'Satu larutan natrium hidroksida, NaOH mempunyai kepekatan 0.001 mol dm⁻³. Berapakah nilai pH larutan tersebut?',
          options: ['3.0', '11.0', '13.0', '7.0'],
          answerIndex: 1,
          explanation: 'pOH = -log(0.001) = 3. Oleh itu, pH = 14 - pOH = 14 - 3 = 11.0.',
          level: 'Sederhana'
        },
        {
          id: 'q2_3',
          question: 'Sebanyak 10 cm³ asid hidroklorik dengan pH 2 dicairkan dengan air suling sehingga menjadi 1000 cm³. Apakah nilai pH larutan baharu?',
          options: ['pH 1', 'pH 3', 'pH 4', 'pH 5'],
          answerIndex: 2,
          explanation: 'Pencairan 100 kali ganda (10 cm³ kepada 1000 cm³) menyebabkan [H⁺] berkurang sebanyak 10² kali ganda. Maka pH bertambah sebanyak 2 unit (dari pH 2 menjadi pH 4).',
          level: 'Tinggi (KBAT)'
        },
        {
          id: 'q2_4',
          question: 'Antara pasangan kepekatan ion hidrogen berikut, yang manakah menghasilkan perbezaan pH sebanyak 2 unit?',
          options: [
            '[H⁺] = 0.2 mol dm⁻³ dan 0.1 mol dm⁻³',
            '[H⁺] = 0.1 mol dm⁻³ dan 0.001 mol dm⁻³',
            '[H⁺] = 0.02 mol dm⁻³ dan 0.01 mol dm⁻³',
            '[H⁺] = 0.5 mol dm⁻³ dan 0.25 mol dm⁻³'
          ],
          answerIndex: 1,
          explanation: 'Perbezaan 2 unit pH mewakili perubahan faktor 10² = 100 kali ganda. 0.1 / 0.001 = 100 kali ganda.',
          level: 'Sederhana'
        },
        {
          id: 'q2_5',
          question: 'Larutan asid sulfurik, H₂SO₄ 0.01 mol dm⁻³ mempunyai nilai pH yang lebih rendah berbanding asid hidroklorik, HCl 0.01 mol dm⁻³. Mengapa?',
          options: [
            'Asid sulfurik ialah asid diprotik yang menghasilkan 2 mol ion H⁺ per mol asid',
            'Asid sulfurik mempunyai jisim molar yang lebih besar',
            'Asid hidroklorik ialah asid lemah',
            'Asid sulfurik mempunyai darjah pengionan separa'
          ],
          answerIndex: 0,
          explanation: 'H₂SO₄ ialah asid diprotik: H₂SO₄ → 2H⁺ + SO₄²⁻. Larutan 0.01 mol dm⁻³ H₂SO₄ menghasilkan [H⁺] = 0.02 mol dm⁻³, menghasilkan pH = -log(0.02) = 1.70, berbanding HCl [H⁺] = 0.01 mol dm⁻³ (pH = 2.0).',
          level: 'Sederhana'
        },
        {
          id: 'q2_6',
          question: 'Diberi nilai pH bagi darah manusia yang sihat adalah sekitar 7.4. Apakah nilai pOH bagi darah tersebut?',
          options: ['6.6', '7.0', '7.4', '8.6'],
          answerIndex: 0,
          explanation: 'pH + pOH = 14 pada 25 °C. Maka pOH = 14 - 7.4 = 6.6.',
          level: 'Rendah'
        }
      ]
    },
    {
      id: 't4-b6-s3',
      code: '6.3',
      title: 'Kekuatan Asid dan Alkali',
      learningStandard: 'SP 6.3.1, 6.3.2',
      durationMinutes: 20,
      tldr: [
        'Kekuatan asid/alkali merujuk kepada darjah penceraian atau darjah pengionan (α) dalam air, BUKAN kepekatannya.',
        'Asid kuat (HCl, HNO₃, H₂SO₄) mengion LENGKAP (100%) dalam air menghasilkan kepekatan ion H⁺ yang tinggi.',
        'Asid lemah (CH₃COOH) mengion SEPARA (<1%) dalam air dan kebanyakan molekul kekal tidak mengion.',
        'Alkali kuat (NaOH, KOH) mengion lengkap membentuk kepekatan ion OH⁻ tinggi; alkali lemah (NH₃) mengion separa.',
        'Kebasan asid merujuk kepada bilangan mol ion H⁺ yang dapat dihasilkan oleh satu mol molekul asid (monoprotik, diprotik, triprotik).'
      ],
      concepts: [
        {
          id: 'c3_1',
          title: 'Asid Kuat vs Asid Lemah (Darjah Pengionan, α)',
          content: '• <b>Asid Kuat:</b> Asid yang <span class="blur-target"><b>mengion lengkap di dalam air</b></span> untuk menghasilkan kepekatan <b>ion hidrogen, H⁺</b> yang tinggi.<br/>' +
                   '  Persamaan pengionan lengkap (anak panah satu hala →):<br/>' +
                   '  <span class="chem-formula">HCl(ak) → H⁺(ak) + Cl⁻(ak)</span> (100% zarah menjadi ion)<br/><br/>' +
                   '• <b>Asid Lemah:</b> Asid yang <span class="blur-target"><b>mengion separa di dalam air</b></span> untuk menghasilkan kepekatan <b>ion hidrogen, H⁺</b> yang rendah.<br/>' +
                   '  Persamaan pengionan berbalik (anak panah berbalik ⇌):<br/>' +
                   '  <span class="chem-formula">CH₃COOH(ak) ⇌ CH₃COO⁻(ak) + H⁺(ak)</span> (< 1% zarah mengion, > 99% kekal molekul neutral)'
        },
        {
          id: 'c3_2',
          title: 'Alkali Kuat vs Alkali Lemah',
          content: '• <b>Alkali Kuat:</b> Mengion lengkap dalam air membentuk kepekatan ion OH⁻ yang tinggi (Contoh: NaOH, KOH).<br/>' +
                   '  <span class="chem-formula">NaOH(p) → Na⁺(ak) + OH⁻(ak)</span><br/><br/>' +
                   '• <b>Alkali Lemah:</b> Mengion separa dalam air membentuk kepekatan ion OH⁻ yang rendah (Contoh: larutan akueus ammonia, NH₃).<br/>' +
                   '  <span class="chem-formula">NH₃(g) + H₂O(c) ⇌ NH₄⁺(ak) + OH⁻(ak)</span>'
        },
        {
          id: 'c3_3',
          title: 'Kebasan Asid (Basicity of Acids)',
          content: 'Kebasan asid ialah <span class="blur-target">bilangan mol ion H⁺</span> yang dihasilkan oleh satu mol asid apabila mengion dalam air:',
          comparisonTable: {
            headers: ['Jenis Kebasan Asid', 'Bilangan Ion H⁺ per Mol Asid', 'Contoh Asid', 'Persamaan Pengionan'],
            rows: [
              ['Asid Monoprotik', '1 mol ion H⁺', 'HCl, HNO₃, CH₃COOH', 'HCl → H⁺ + Cl⁻ ; CH₃COOH ⇌ CH₃COO⁻ + H⁺'],
              ['Asid Diprotik', '2 mol ion H⁺', 'H₂SO₄, H₂CO₃', 'H₂SO₄ → 2H⁺ + SO₄²⁻'],
              ['Asid Triprotik', '3 mol ion H⁺', 'H₃PO₄ (Asid fosforik)', 'H₃PO₄ ⇌ 3H⁺ + PO₄³⁻']
            ]
          }
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menganggap asid etanoik ialah asid tetraprotik kerana ada 4 atom hidrogen dalam formula CH₃COOH.',
          correction: 'Hanya SATU atom hidrogen pada kumpulan karboksil (-COOH) yang boleh mengion menjadi ion H⁺! 3 atom hidrogen pada -CH₃ tidak boleh mengion. Maka CH₃COOH ialah asid MONOPROTIK.',
          why: 'Ikatan C-H sangat kuat dan tidak mengion dalam air.'
        },
        {
          mistake: 'Menyamakan istilah "asid kuat" dengan "asid pekat".',
          correction: '"Kuat/Lemah" merujuk kepada DARJAH PENGIONAN. "Pekat/Cair" merujuk kepada KUANTITI ZAT TERLARUT per unit isi padu larutan. Asid etanoik 5.0 mol dm⁻³ ialah asid pekat tetapi asid lemah!',
          why: 'Kekuatan ialah sifat hakiki bahan; kepekatan boleh diubah melalui pencairan.'
        }
      ],
      flashcards: [
        { id: 'fc3_1', front: 'Apakah takrifan asid kuat menurut skema SPM?', back: 'Asid yang mengion lengkap di dalam air untuk menghasilkan kepekatan ion hidrogen, H⁺ yang tinggi.' },
        { id: 'fc3_2', front: 'Apakah jenis kebasan bagi asid etanoik, CH₃COOH?', back: 'Asid monoprotik (hanya menghasilkan 1 mol ion H⁺ bagi setiap 1 mol asid).' },
        { id: 'fc3_3', front: 'Tuliskan persamaan pengionan bagi larutan ammonia dalam air.', back: 'NH₃(ak) + H₂O(c) ⇌ NH₄⁺(ak) + OH⁻(ak)' },
        { id: 'fc3_4', front: 'Mengapakah nilai pH bagi HCl 0.1 M lebih rendah daripada CH₃COOH 0.1 M walaupun kepekatannya sama?', back: 'Kerana HCl ialah asid kuat yang mengion lengkap menghasilkan kepekatan ion H⁺ yang jauh lebih tinggi daripada CH₃COOH yang mengion separa.' },
        { id: 'fc3_5', front: 'Bolehkah sesuatu asid itu cair tetapi kuat? Berikan contoh.', back: 'Boleh. Contohnya larutan asid hidroklorik, HCl 0.001 mol dm⁻³ (cair kerana mol zat sedikit, tetapi kuat kerana mengion lengkap 100%).' }
      ],
      quiz: [
        {
          id: 'q3_1',
          question: 'Antara asid berikut, yang manakah merupakan asid diprotik?',
          options: ['Asid hidroklorik, HCl', 'Asid nitrik, HNO₃', 'Asid sulfurik, H₂SO₄', 'Asid etanoik, CH₃COOH'],
          answerIndex: 2,
          explanation: 'H₂SO₄ mengion dalam air menghasilkan 2 mol ion H⁺ per mol asid: H₂SO₄ → 2H⁺ + SO₄²⁻.',
          level: 'Rendah'
        },
        {
          id: 'q3_2',
          question: 'Asid etanoik, CH₃COOH dikelaskan sebagai asid lemah kerana ia:',
          options: [
            'Hanya mengion separa di dalam air membentuk kepekatan ion H⁺ yang rendah',
            'Mempunyai kepekatan yang sangat rendah',
            'Tidak bertindak balas dengan logam magnesium',
            'Tidak mengandungi atom oksigen'
          ],
          answerIndex: 0,
          explanation: 'Takrifan asid lemah: asid yang mengion separa di dalam air menghasilkan kepekatan ion H⁺ yang rendah.',
          level: 'Rendah'
        },
        {
          id: 'q3_3',
          question: 'Dua larutan asid X dan Y masing-masing mempunyai kepekatan 0.1 mol dm⁻³. Nilai pH larutan X ialah 1 manakala nilai pH larutan Y ialah 4. Antara pernyataan berikut, yang manakah BENAR?',
          options: [
            'Larutan X mengandungi molekul asid yang tidak mengion',
            'Darjah pengionan asid X lebih tinggi daripada asid Y',
            'Asid Y ialah asid kuat',
            'Asid X mempunyai kepekatan ion H⁺ yang lebih rendah berbanding Y'
          ],
          answerIndex: 1,
          explanation: 'pH 1 menunjukkan [H⁺] = 0.1 mol dm⁻³ (mengion 100% - asid kuat). pH 4 menunjukkan [H⁺] = 10⁻⁴ mol dm⁻³ (mengion separa - asid lemah). Maka darjah pengionan X jauh lebih tinggi.',
          level: 'Sederhana',
          spmReference: 'SPM 2022 Kertas 1'
        },
        {
          id: 'q3_4',
          question: 'Apakah zarah-zarah yang hadir di dalam larutan akueus asid etanoik?',
          options: [
            'Ion CH₃COO⁻ dan ion H⁺ sahaja',
            'Molekul CH₃COOH sahaja',
            'Molekul CH₃COOH, ion CH₃COO⁻, ion H⁺ dan molekul H₂O',
            'Molekul CH₃COOH dan gas hidrogen'
          ],
          answerIndex: 2,
          explanation: 'Kerana asid etanoik mengion separa dalam keseimbangan berbalik (CH₃COOH ⇌ CH₃COO⁻ + H⁺), terdapat molekul CH₃COOH yang tidak mengion, ion CH₃COO⁻, ion H⁺, serta molekul pelarut H₂O.',
          level: 'Tinggi (KBAT)'
        },
        {
          id: 'q3_5',
          question: 'Antara bahan berikut, yang manakah akan menunjukkan bacaan ammeter paling tinggi apabila diuji menggunakan litar kekonduksian elektrik?',
          options: [
            'Larutan ammonia, NH₃ 0.1 mol dm⁻³',
            'Larutan natrium hidroksida, NaOH 0.1 mol dm⁻³',
            'Larutan asid etanoik, CH₃COOH 0.1 mol dm⁻³',
            'Glukosa, C₆H₁₂O₆ 0.1 mol dm⁻³'
          ],
          answerIndex: 1,
          explanation: 'NaOH ialah alkali kuat yang mengion lengkap menghasilkan kepekatan ion Na⁺ dan OH⁻ bebas bergerak yang tinggi, memberikan kekonduksian elektrik tertinggi.',
          level: 'Sederhana'
        },
        {
          id: 'q3_6',
          question: 'Berapakah bilangan mol ion hidrogen yang terhasil apabila 1 mol asid fosforik, H₃PO₄ mengion lengkap di dalam air?',
          options: ['1 mol', '2 mol', '3 mol', '4 mol'],
          answerIndex: 2,
          explanation: 'H₃PO₄ ialah asid triprotik: H₃PO₄ → 3H⁺ + PO₄³⁻, menghasilkan 3 mol ion H⁺.',
          level: 'Rendah'
        }
      ]
    },
    {
      id: 't4-b6-s4',
      code: '6.4',
      title: 'Sifat-sifat Kimia Asid dan Alkali',
      learningStandard: 'SP 6.4.1, 6.4.2',
      durationMinutes: 20,
      tldr: [
        'Asid menunjukkan 3 sifat kimia utama: bertindak balas dengan bes (garam + air), logam reaktif (garam + H₂), dan karbonat logam (garam + air + CO₂).',
        'Alkali menunjukkan 3 sifat kimia utama: bertindak balas dengan asid (peneutralan), garam ammonium (garam + air + gas NH₃), dan mendakan ion logam.',
        'Gas hidrogen diuji dengan kayu uji bernyala (bunyi "pop"); gas CO₂ diuji dengan air kapur (menjadi keruh).',
        'Gas ammonia beralkali, berbau sengit dan menukarkan kertas litmus merah lembap kepada biru.'
      ],
      concepts: [
        {
          id: 'c4_1',
          title: '3 Tindak Balas Kimia Khas Asid',
          content: 'Dalam SPM Kertas 2 Bahagian B & C, calon kerap diminta menulis persamaan kimia seimbang bagi 3 tindak balas ini:<br/><br/>' +
                   '<b>1. Asid + Bes / Oksida Logam → Garam + Air</b><br/>' +
                   'Contoh: <span class="chem-formula">H₂SO₄(ak) + CuO(p) → CuSO₄(ak) + H₂O(c)</span><br/>' +
                   '<i>Pemerhatian: Serbuk hitam kuprum(II) oksida melarut membentuk larutan biru.</i><br/><br/>' +
                   '<b>2. Asid + Logam Reaktif → Garam + Gas Hidrogen, H₂</b><br/>' +
                   'Contoh: <span class="chem-formula">2HCl(ak) + Mg(p) → MgCl₂(ak) + H₂(g)</span><br/>' +
                   '<i>Pemerhatian: Pembuakan berlaku. Gas tanpa warna menyala dengan bunyi "pop" apabila diuji dengan kayu uji bernyala. (Nota: Cu, Ag, Au tidak bertindak balas kerana berada di bawah hidrogen).</i><br/><br/>' +
                   '<b>3. Asid + Karbonat Logam → Garam + Air + Gas Karbon Dioksida, CO₂</b><br/>' +
                   'Contoh: <span class="chem-formula">2HNO₃(ak) + CaCO₃(p) → Ca(NO₃)₂(ak) + H₂O(c) + CO₂(g)</span><br/>' +
                   '<i>Pemerhatian: Pembuakan berlaku. Gas membebaskan air kapur menjadi keruh.</i>'
        },
        {
          id: 'c4_2',
          title: '3 Tindak Balas Kimia Khas Alkali',
          content: '<b>1. Alkali + Asid → Garam + Air (Peneutralan)</b><br/>' +
                   '<span class="chem-formula">NaOH(ak) + HCl(ak) → NaCl(ak) + H₂O(c)</span><br/><br/>' +
                   '<b>2. Alkali + Garam Ammonium + Panaskan → Garam + Air + Gas Ammonia, NH₃</b><br/>' +
                   '<span class="chem-formula">NaOH(ak) + NH₄Cl(ak) → NaCl(ak) + H₂O(c) + NH₃(g)</span><br/>' +
                   '<i>Pemerhatian: Gas berbau sengit terbebas yang menukarkan kertas litmus merah lembap menjadi biru.</i><br/><br/>' +
                   '<b>3. Alkali + Larutan Garam Ion Logam → Mendakan Hidroksida Logam Tak Larut</b><br/>' +
                   '<span class="chem-formula">2NaOH(ak) + CuSO₄(ak) → Cu(OH)₂(p) + Na₂SO₄(ak)</span><br/>' +
                   '<i>Pemerhatian: Mendakan biru kuprum(II) hidroksida terbentuk.</i>'
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menggunakan kuprum (Cu) untuk bertindak balas dengan asid hidroklorik bagi menghasilkan gas hidrogen.',
          correction: 'Kuprum berada di bawah hidrogen dalam Siri Kereaktifan Logam dan Siri Elektrokimia, maka kuprum TIDAK BOLEH bertindak balas dengan asid cair untuk menghasilkan gas hidrogen!',
          why: 'Hanya logam di atas hidrogen (seperti Mg, Zn, Fe) yang boleh membebaskan H₂ daripada asid cair.'
        }
      ],
      flashcards: [
        { id: 'fc4_1', front: 'Apakah hasil tindak balas antara asid dengan karbonat logam?', back: 'Garam + Air + Gas Karbon Dioksida (CO₂).' },
        { id: 'fc4_2', front: 'Bagaimanakah gas hidrogen dikenal pasti di makmal?', back: 'Dekatkan kayu uji bernyala ke mulut tabung uji; bunyi "pop" tajam akan terhasil.' },
        { id: 'fc4_3', front: 'Apakah gas yang terbebas apabila campuran natrium hidroksida dan ammonium sulfat dipanaskan?', back: 'Gas ammonia, NH₃ (berbau sengit & menukarkan kertas litmus merah lembap ke biru).' },
        { id: 'fc4_4', front: 'Mengapakah kuprum tidak bertindak balas dengan asid sulfurik cair?', back: 'Kerana kuprum kurang reaktif daripada hidrogen dalam Siri Kereaktifan Logam (nilai E° Cu²⁺/Cu = +0.34 V lebih positif daripada H⁺/H₂ = 0.00 V).' },
        { id: 'fc4_5', front: 'Tuliskan persamaan kimia antara asid hidroklorik dengan kalsium karbonat.', back: '2HCl + CaCO₃ → CaCl₂ + H₂O + CO₂' }
      ],
      quiz: [
        {
          id: 'q4_1',
          question: 'Antara logam berikut, yang manakah TIDAK BERTINDAK BALAS dengan asid sulfurik cair untuk menghasilkan gas hidrogen?',
          options: ['Zink, Zn', 'Magnesium, Mg', 'Ferum, Fe', 'Kuprum, Cu'],
          answerIndex: 3,
          explanation: 'Kuprum berada di bawah hidrogen dalam siri kereaktifan logam, jadi ia tidak dapat menyesarkan hidrogen daripada asid cair.',
          level: 'Rendah'
        },
        {
          id: 'q4_2',
          question: 'Apabila serbuk pepejal P ditambahkan ke dalam asid hidroklorik cair, pembuakan berlaku dan gas yang mengeruhkan air kapur terbebas. Apakah pepejal P yang mungkin?',
          options: ['Zink hidroksida', 'Kalsium karbonat', 'Magnesium oksida', 'Kuprum(II) sulfat'],
          answerIndex: 1,
          explanation: 'Garam karbonat bertindak balas dengan asid menghasilkan gas karbon dioksida, CO₂ yang mengeruhkan air kapur.',
          level: 'Rendah'
        },
        {
          id: 'q4_3',
          question: 'Campuran pepejal ammonium klorida dan larutan kalium hidroksida dipanaskan dalam tabung uji. Apakah pemerhatian pada sehelai kertas litmus merah lembap yang diletakkan di mulut tabung uji?',
          options: [
            'Kertas litmus merah kekal merah',
            'Kertas litmus merah bertukar biru',
            'Kertas litmus merah dilunturkan menjadi putih',
            'Kertas litmus merah terbakar'
          ],
          answerIndex: 1,
          explanation: 'Tindak balas alkali dengan garam ammonium menghasilkan gas ammonia, NH₃ yang bersifat alkali dan menukarkan kertas litmus merah lembap menjadi biru.',
          level: 'Sederhana'
        },
        {
          id: 'q4_4',
          question: 'Persamaan berikut mewakili tindak balas antara asid X dengan zink:\nZn(p) + 2X(ak) → ZnCl₂(ak) + H₂(g)\nApakah asid X dan berapakah isi padu gas H₂ yang terbebas pada keadaan bilik jika 0.1 mol Zn bertindak balas lengkap? [Isi padu molar = 24 dm³ mol⁻¹]',
          options: [
            'Asid X: HCl ; Isi padu H₂ = 2.4 dm³',
            'Asid X: HNO₃ ; Isi padu H₂ = 1.2 dm³',
            'Asid X: H₂SO₄ ; Isi padu H₂ = 2.4 dm³',
            'Asid X: HCl ; Isi padu H₂ = 4.8 dm³'
          ],
          answerIndex: 0,
          explanation: 'Asid X ialah HCl (menghasilkan ZnCl₂). Nisbah mol Zn : H₂ = 1 : 1. Mol H₂ = 0.1 mol. Isi padu = 0.1 × 24 dm³ = 2.4 dm³.',
          level: 'Sederhana'
        },
        {
          id: 'q4_5',
          question: 'Satu eksperimen menunjukkan bahawa pepejal zink oksida bertindak balas dengan asid nitrik dan juga larutan natrium hidroksida pekat. Apakah sifat zink oksida?',
          options: ['Oksida bes', 'Oksida asid', 'Oksida amfoterik', 'Oksida neutral'],
          answerIndex: 2,
          explanation: 'Zink oksida (ZnO), plumbum(II) oksida (PbO) dan aluminium oksida (Al₂O₃) bersifat amfoterik kerana boleh bertindak balas dengan kedua-dua asid dan alkali kuat.',
          level: 'Tinggi (KBAT)'
        },
        {
          id: 'q4_6',
          question: 'Apakah warna larutan yang terbentuk apabila serbuk kuprum(II) oksida yang berwarna hitam larut lengkap di dalam asid sulfurik panas?',
          options: ['Kuning', 'Hijau muda', 'Biru', 'Tanpa warna'],
          answerIndex: 2,
          explanation: 'CuO + H₂SO₄ → CuSO₄ + H₂O. Pembentukan ion Cu²⁺ akueus memberikan warna biru pada larutan kuprum(II) sulfat.',
          level: 'Rendah'
        }
      ]
    },
    {
      id: 't4-b6-s5',
      code: '6.5',
      title: 'Kepekatan Larutan Akueus',
      learningStandard: 'SP 6.5.1, 6.5.2',
      durationMinutes: 20,
      tldr: [
        'Kepekatan larutan ialah ukuran kuantiti zat terlarut dalam seunit isi padu larutan (biasanya 1 dm³).',
        'Unit kepekatan biasa: gram per desimeter padu (g dm⁻³) dan mol per desimeter padu (mol dm⁻³ atau Kemolaran, M).',
        'Rumus penukaran unit: Kemolaran (mol dm⁻³) = Kepekatan (g dm⁻³) / Jisim Molar (g mol⁻¹).',
        'Bilangan mol dalam larutan: n = (M × V) / 1000 jika V dalam cm³, atau n = M × V jika V dalam dm³.'
      ],
      concepts: [
        {
          id: 'c5_1',
          title: 'Definisi & Rumus Penukaran Kepekatan KSSM',
          content: '• <b>Kepekatan dalam g dm⁻³:</b><br/>' +
                   '<div class="chem-equation"><b>Kepekatan (g dm⁻³) = Jisim zat terlarut (g) / Isi padu larutan (dm³)</b></div><br/>' +
                   '• <b>Kemolaran (mol dm⁻³ atau M):</b><br/>' +
                   '<div class="chem-equation"><b>Kemolaran (mol dm⁻³) = Bilangan mol zat terlarut (mol) / Isi padu larutan (dm³)</b></div><br/>' +
                   '• <b>Segi Tiga Penukaran Emas:</b><br/>' +
                   '<div class="chem-equation"><b>Kepekatan (g dm⁻³) = Kemolaran (mol dm⁻³) × Jisim Molar (g mol⁻¹)</b><br/>' +
                   '<b>Kemolaran (mol dm⁻³) = Kepekatan (g dm⁻³) / Jisim Molar (g mol⁻¹)</b></div>'
        },
        {
          id: 'c5_2',
          title: 'Pengiraan Bilangan Mol dalam Isi Padu Tertentu',
          content: 'Jika isi padu larutan diberi dalam unit <b>sentimeter padu (cm³)</b>:<br/>' +
                   '<div class="chem-equation"><b>n = (M × V) / 1000</b></div><br/>' +
                   'Contoh:<br/>' +
                   'Berapakah mol NaOH dalam 250 cm³ larutan NaOH 0.4 mol dm⁻³?<br/>' +
                   'n = (0.4 × 250) / 1000 = <span class="blur-target"><b>0.1 mol</b></span>.'
        }
      ],
      commonMistakes: [
        {
          mistake: 'Lupa membahagi dengan 1000 semasa mengira bilangan mol daripada isi padu dalam cm³.',
          correction: '1 dm³ = 1000 cm³. Jika isi padu adalah cm³, WAJIB bahagi 1000 untuk menukarnya kepada dm³!',
          why: 'Kesilapan unit paling lazim calon SPM yang mengakibatkan kehilangan markah pengiraan.'
        }
      ],
      flashcards: [
        { id: 'fc5_1', front: 'Apakah unit bagi kemolaran?', back: 'mol dm⁻³ (atau Molar, M).' },
        { id: 'fc5_2', front: 'Bagaimanakah menukarkan kepekatan dalam g dm⁻³ kepada kemolaran dalam mol dm⁻³?', back: 'Bahagikan kepekatan (g dm⁻³) dengan jisim molar zat terlarut (g mol⁻¹).' },
        { id: 'fc5_3', front: 'Hitung kemolaran larutan NaOH yang mempunyai kepekatan 8.0 g dm⁻³. [JMR NaOH = 40]', back: 'Kemolaran = 8.0 / 40 = 0.2 mol dm⁻³.' },
        { id: 'fc5_4', front: 'Berapakah bilangan mol ion hidrogen dalam 50 cm³ asid sulfurik, H₂SO₄ 0.5 mol dm⁻³?', back: 'Mol H₂SO₄ = (0.5 × 50)/1000 = 0.025 mol. Kerana H₂SO₄ diprotik, mol H⁺ = 2 × 0.025 = 0.05 mol.' },
        { id: 'fc5_5', front: 'Berapakah jisim KOH yang terdapat dalam 500 cm³ larutan KOH 1.0 mol dm⁻³? [JAR: K=39, O=16, H=1]', back: 'Mol = (1.0 × 500)/1000 = 0.5 mol. JMR KOH = 56 g mol⁻¹. Jisim = 0.5 × 56 = 28.0 g.' }
      ],
      quiz: [
        {
          id: 'q5_1',
          question: 'Hitung kemolaran bagi larutan kalium hidroksida, KOH yang mengandungi 5.6 g KOH dalam 250 cm³ larutan. [JAR: K=39, O=16, H=1]',
          options: ['0.10 mol dm⁻³', '0.20 mol dm⁻³', '0.40 mol dm⁻³', '0.05 mol dm⁻³'],
          answerIndex: 2,
          explanation: 'JMR KOH = 39 + 16 + 1 = 56 g mol⁻¹. Mol KOH = 5.6 / 56 = 0.1 mol. Isi padu = 250/1000 = 0.25 dm³. Kemolaran = 0.1 / 0.25 = 0.40 mol dm⁻³.',
          level: 'Sederhana'
        },
        {
          id: 'q5_2',
          question: 'Satu larutan natrium klorida, NaCl mempunyai kepekatan 11.7 g dm⁻³. Berapakah kemolaran larutan tersebut? [JAR: Na=23, Cl=35.5]',
          options: ['0.1 mol dm⁻³', '0.2 mol dm⁻³', '0.5 mol dm⁻³', '1.0 mol dm⁻³'],
          answerIndex: 1,
          explanation: 'JMR NaCl = 23 + 35.5 = 58.5 g mol⁻¹. Kemolaran = 11.7 / 58.5 = 0.20 mol dm⁻³.',
          level: 'Rendah'
        },
        {
          id: 'q5_3',
          question: 'Berapakah bilangan mol ion klorida, Cl⁻ yang hadir dalam 100 cm³ larutan zink klorida, ZnCl₂ 0.5 mol dm⁻³?',
          options: ['0.05 mol', '0.10 mol', '0.15 mol', '0.20 mol'],
          answerIndex: 1,
          explanation: 'Mol ZnCl₂ = (0.5 × 100)/1000 = 0.05 mol. Formula ZnCl₂ mempunyai 2 ion Cl⁻ per formula: ZnCl₂ → Zn²⁺ + 2Cl⁻. Maka mol Cl⁻ = 2 × 0.05 = 0.10 mol.',
          level: 'Sederhana',
          spmReference: 'SPM 2021 Kertas 1'
        },
        {
          id: 'q5_4',
          question: 'Sebanyak 2.0 g natrium hidroksida pepejal dilarutkan ke dalam air suling untuk menghasilkan larutan dengan kemolaran 0.2 mol dm⁻³. Apakah isi padu larutan yang terhasil? [JAR: Na=23, O=16, H=1]',
          options: ['100 cm³', '200 cm³', '250 cm³', '500 cm³'],
          answerIndex: 2,
          explanation: 'Mol NaOH = 2.0 / 40 = 0.05 mol. Isi padu (dm³) = mol / Kemolaran = 0.05 / 0.2 = 0.25 dm³ = 250 cm³.',
          level: 'Sederhana'
        },
        {
          id: 'q5_5',
          question: 'Seorang pembantu makmal ingin menyediakan 2.0 dm³ asid hidroklorik 0.05 mol dm⁻³ daripada asid hidroklorik pekat 10.0 mol dm⁻³. Berapakah isi padu asid pekat yang diperlukan?',
          options: ['5.0 cm³', '10.0 cm³', '20.0 cm³', '50.0 cm³'],
          answerIndex: 1,
          explanation: 'M₁V₁ = M₂V₂ → (10.0)(V₁) = (0.05)(2000 cm³) → V₁ = 100 / 10.0 = 10.0 cm³.',
          level: 'Sederhana'
        },
        {
          id: 'q5_6',
          question: 'Antara larutan berikut, yang manakah mempunyai kepekatan ion klorida paling tinggi?',
          options: [
            '100 cm³ larutan NaCl 1.0 mol dm⁻³',
            '100 cm³ larutan BaCl₂ 0.8 mol dm⁻³',
            '100 cm³ larutan AlCl₃ 0.6 mol dm⁻³',
            '100 cm³ larutan KCl 1.2 mol dm⁻³'
          ],
          answerIndex: 2,
          explanation: 'Kepekatan ion klorida: NaCl = 1.0 M. BaCl₂ = 2 × 0.8 = 1.6 M. AlCl₃ = 3 × 0.6 = 1.8 M. KCl = 1.2 M. AlCl₃ menghasilkan kepekatan [Cl⁻] tertinggi iaitu 1.8 mol dm⁻³.',
          level: 'Tinggi (KBAT)'
        }
      ]
    },
    {
      id: 't4-b6-s6',
      code: '6.6',
      title: 'Larutan Piawai (Penyediaan & Pencairan)',
      learningStandard: 'SP 6.6.1, 6.6.2, 6.6.3',
      durationMinutes: 20,
      tldr: [
        'Larutan piawai ialah larutan yang kepekatannya diketahui dengan tepat dan jitu.',
        'Penyediaan larutan piawai menggunakan kelalang volumetrik bersama corong turas, penitis dan dibilas dengan air suling.',
        'Kaedah pencairan mengikut hukum keabadian mol: bilangan mol zat terlarut sebelum pencairan = bilangan mol selepas pencairan.',
        'Rumus pencairan: M₁V₁ = M₂V₂ di mana V₂ ialah isi padu akhir (V₁ + isi padu air suling ditambah).'
      ],
      concepts: [
        {
          id: 'c6_1',
          title: 'Definisi & Kaedah Penyediaan Larutan Piawai daripada Pepejal',
          content: '<b>Larutan piawai</b> ialah <span class="blur-target"><b>larutan yang kepekatannya diketahui dengan jitu</b></span>.<br/><br/>' +
                   '<b>Langkah Kunci Penyediaan (Eksperimen SPM):</b><br/>' +
                   '1. Timbang jisim pepejal (contoh: serbuk natrium karbonat, Na₂CO₃) dengan tepat menggunakan neraca elektronik.<br/>' +
                   '2. Larutkan pepejal dalam bikar dengan sedikit air suling menggunakan rod kaca.<br/>' +
                   '3. Pindahkan larutan ke dalam <b>kelalang volumetrik</b> menggunakan corong turas.<br/>' +
                   '4. Bilas bikar, corong turas dan rod kaca dengan air suling beberapa kali dan tuangkan ke dalam kelalang volumetrik.<br/>' +
                   '5. Tambah air suling sehingga menghampiri tanda senggatan, kemudian gunakan <b>penitis</b> supaya <b>meniskus larutan menyentuh aras tanda senggatan</b> pada paras mata.<br/>' +
                   '6. Pasang penutup kelalang dan telangkupkan kelalang beberapa kali untuk memastikan larutan bercampur homogen.'
        },
        {
          id: 'c6_2',
          title: 'Konsep & Rumus Pencairan (Dilution Method)',
          content: 'Semasa proses pencairan, hanya air suling ditambah. <b>Bilangan mol zat terlarut adalah TETAP</b> sebelum dan selepas pencairan.<br/><br/>' +
                   '<div class="chem-equation"><b>M₁V₁ = M₂V₂</b><br/>' +
                   'Isi padu air suling ditambah = <b>V₂ - V₁</b></div>'
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menganggap V₂ ialah isi padu air yang ditambah.',
          correction: 'V₂ ialah ISI PADU KESELURUHAN larutan akhir yang dicairkan. Isi padu air yang ditambah ialah (V₂ - V₁).',
          why: 'Ini perangkap pengiraan yang sangat lazim dalam SPM Kertas 2!'
        },
        {
          mistake: 'Melarutkan pepejal terus di dalam kelalang volumetrik.',
          correction: 'Pepejal MESTI dilarutkan dalam bikar terlebih dahulu, kemudian dipindahkan ke dalam kelalang volumetrik dan dibilas.',
          why: 'Leher kelalang volumetrik sempit dan sukar untuk mengacau larutan sehingga larut sempurna.'
        }
      ],
      simulationRef: {
        id: 'penyediaan-larutan-piawai',
        title: 'Makmal Maya Penyediaan & Pencairan Larutan Piawai',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=penyediaan-larutan-piawai',
        description: 'Lakukan simulasi seret-dan-lepas untuk menimbang pepejal, membilas corong turas dan melaraskan meniskus kelalang volumetrik.',
        previewBadge: 'Simulasi Interaktif'
      },
      flashcards: [
        { id: 'fc6_1', front: 'Apakah maksud larutan piawai?', back: 'Larutan yang kepekatannya diketahui secara tepat dan jitu.' },
        { id: 'fc6_2', front: 'Mengapakah bikar dan corong turas mesti dibilas dengan air suling?', back: 'Untuk memastikan semua baki zat terlarut dipindahkan ke dalam kelalang volumetrik supaya kepekatan larutan tepat.' },
        { id: 'fc6_3', front: 'Apakah radas yang digunakan untuk menyediakan larutan piawai dengan isi padu yang tepat?', back: 'Kelalang volumetrik (volumetric flask).' },
        { id: 'fc6_4', front: 'Apakah kuantiti yang kekal malar semasa proses pencairan sesuatu larutan?', back: 'Bilangan mol zat terlarut (mol = M₁V₁ = M₂V₂).' },
        { id: 'fc6_5', front: 'Berapakah isi padu air suling perlu ditambah kepada 50 cm³ larutan 2.0 mol dm⁻³ untuk menghasilkan larutan 0.5 mol dm⁻³?', back: 'M₁V₁ = M₂V₂ → (2.0)(50) = (0.5)(V₂) → V₂ = 200 cm³. Air ditambah = 200 - 50 = 150 cm³.' }
      ],
      quiz: [
        {
          id: 'q6_1',
          question: 'Hitung jisim natrium hidroksida, NaOH yang diperlukan untuk menyediakan 250 cm³ larutan piawai NaOH 0.2 mol dm⁻³. [JAR: Na=23, O=16, H=1]',
          options: ['2.0 g', '4.0 g', '0.2 g', '8.0 g'],
          answerIndex: 0,
          explanation: 'Mol = MV/1000 = (0.2 × 250)/1000 = 0.05 mol. Jisim Molar NaOH = 23 + 16 + 1 = 40 g mol⁻¹. Jisim = mol × JMR = 0.05 × 40 = 2.0 g.',
          level: 'Sederhana'
        },
        {
          id: 'q6_2',
          question: 'Antara langkah berikut, yang manakah TIDAK BENAR dalam penyediaan larutan piawai?',
          options: [
            'Melarutkan pepejal terus di dalam kelalang volumetrik menggunakan rod kaca',
            'Membilas bikar dan corong turas dengan air suling',
            'Menggunakan penitis untuk menambah air suling sehingga meniskus menyentuh tanda senggatan',
            'Menelangkupkan kelalang beberapa kali dengan penutupnya terpasang'
          ],
          answerIndex: 0,
          explanation: 'Pepejal tidak boleh dilarutkan terus dalam kelalang volumetrik. Ia mesti dilarutkan dalam bikar terlebih dahulu sebelum dipindahkan ke dalam kelalang.',
          level: 'Rendah'
        },
        {
          id: 'q6_3',
          question: 'Berapakah isi padu air suling yang mesti ditambah kepada 20 cm³ asid hidroklorik 1.0 mol dm⁻³ supaya kepekatannya berkurang kepada 0.2 mol dm⁻³?',
          options: ['100 cm³', '80 cm³', '20 cm³', '50 cm³'],
          answerIndex: 1,
          explanation: 'M₁V₁ = M₂V₂ → (1.0)(20) = (0.2)(V₂) → V₂ = 100 cm³. Isi padu air yang perlu ditambah = V₂ - V₁ = 100 - 20 = 80 cm³.',
          level: 'Sederhana',
          spmReference: 'SPM 2022 Kertas 1'
        },
        {
          id: 'q6_4',
          question: 'Semasa melaraskan aras cecair pada tanda senggatan kelalang volumetrik, kedudukan mata murid yang betul ialah:',
          options: [
            'Di atas tanda senggatan untuk melihat buih',
            'Di bawah tanda senggatan untuk mengelakkan pantulan',
            'Aras mata selaras dengan bahagian dasar meniskus cecair',
            'Mana-mana sudut asalkan garis senggatan kelihatan'
          ],
          answerIndex: 2,
          explanation: 'Untuk mengelakkan ralat paralaks, mata mesti selaras secara mendatar dengan bahagian bawah (dasar) meniskus cecair larutan.',
          level: 'Rendah'
        },
        {
          id: 'q6_5',
          question: 'Seorang murid ingin menyediakan larutan CuSO₄ 0.1 mol dm⁻³ daripada larutan stok 1.0 mol dm⁻³. Radas yang paling sesuai untuk menyukat 25.0 cm³ larutan stok tersebut dengan kejituan tinggi ialah:',
          options: ['Silinder penyukat 50 cm³', 'Pipet 25 cm³', 'Bikar 100 cm³', 'Kelalang kon 250 cm³'],
          answerIndex: 1,
          explanation: 'Pipet 25 cm³ memberikan kejituan yang sangat tinggi (± 0.05 cm³) untuk memindahkan isi padu tetap larutan stok.',
          level: 'Rendah'
        },
        {
          id: 'q6_6',
          question: 'Jika 50 cm³ larutan natrium karbonat 0.2 mol dm⁻³ dicampurkan dengan 150 cm³ larutan natrium karbonat 0.4 mol dm⁻³, apakah kemolaran larutan campuran yang terhasil?',
          options: ['0.30 mol dm⁻³', '0.35 mol dm⁻³', '0.25 mol dm⁻³', '0.28 mol dm⁻³'],
          answerIndex: 1,
          explanation: 'Jumlah mol = (0.2 × 50)/1000 + (0.4 × 150)/1000 = 0.01 + 0.06 = 0.07 mol. Jumlah isi padu = 50 + 150 = 200 cm³ = 0.20 dm³. Kemolaran campuran = 0.07 / 0.20 = 0.35 mol dm⁻³.',
          level: 'Tinggi (KBAT)'
        }
      ]
    },
    {
      id: 't4-b6-s7',
      code: '6.7',
      title: 'Peneutralan (Pentitratan Asid-Alkali)',
      learningStandard: 'SP 6.7.1, 6.7.2, 6.7.3',
      durationMinutes: 20,
      tldr: [
        'Peneutralan ialah tindak balas antara asid dengan bes/alkali menghasilkan garam dan air sahaja.',
        'Persamaan ion bagi peneutralan: H⁺(ak) + OH⁻(ak) → H₂O(c).',
        'Takat akhir pentitratan dikesan apabila penunjuk asid-bes bertukar warna dengan tepat.',
        'Rumus stoikiometri pentitratan: (M_a × V_a) / (M_b × V_b) = a / b.'
      ],
      concepts: [
        {
          id: 'c7_1',
          title: 'Penunjuk Asid-Bes & Perubahan Warna Takat Akhir',
          content: 'Takat akhir pentitratan ialah takat di mana tindak balas peneutralan selesai sepenuhnya.',
          comparisonTable: {
            headers: ['Penunjuk Asid-Bes', 'Medium Asid', 'Takat Akhir Peneutralan', 'Medium Alkali'],
            rows: [
              ['Fenolftalein', '<span class="blur-target">Tanpa warna</span>', '<span class="blur-target">Merah jambu pudar</span>', '<span class="blur-target">Merah jambu</span>'],
              ['Metil Jingga', '<span class="blur-target">Merah</span>', '<span class="blur-target">Jingga</span>', '<span class="blur-target">Kuning</span>']
            ]
          }
        },
        {
          id: 'c7_2',
          title: 'Pengiraan Stoikiometri Pentitratan',
          content: 'Langkah-langkah penyelesaian:<br/>' +
                   '1. Tulis persamaan kimia yang seimbang.<br/>' +
                   '2. Tentukan nisbah stoikiometri asid (a) dan alkali (b).<br/>' +
                   '3. Gunakan rumus:<br/>' +
                   '<div class="chem-equation"><b>(M_a × V_a) / (M_b × V_b) = a / b</b></div>',
          equations: [
            {
              equation: 'H₂SO₄(ak) + 2NaOH(ak) → Na₂SO₄(ak) + 2H₂O(c)',
              qualitative: '1 mol asid sulfurik meneutralkan 2 mol natrium hidroksida menghasilkan natrium sulfat dan air.',
              quantitative: 'a = 1, b = 2 → (M_a × V_a) / (M_b × V_b) = 1 / 2'
            }
          ]
        }
      ],
      commonMistakes: [
        {
          mistake: 'Lupa membilas buret dengan larutan asid yang akan digunakan.',
          correction: 'Buret mesti dibilas dengan air suling terlebih dahulu, diikuti dengan larutan asid yang akan diisikan.',
          why: 'Jika buret hanya dibilas dengan air suling, titisan air di dinding dalam buret akan mencairkan asid dan menyebabkan ralat pengiraan.'
        }
      ],
      simulationRef: {
        id: 'pentitratan-asid-alkali',
        title: 'Makmal Maya Pentitratan Asid Alkali',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=pentitratan-asid-alkali',
        description: 'Kawal pili buret, perhatikan perubahan warna fenolftalein di takat akhir dan kira kemolaran asid/alkali.',
        previewBadge: 'Simulasi Pentitratan'
      },
      flashcards: [
        { id: 'fc7_1', front: 'Apakah persamaan ion bagi tindak balas peneutralan?', back: 'H⁺(ak) + OH⁻(ak) → H₂O(c)' },
        { id: 'fc7_2', front: 'Apakah warna fenolftalein pada takat akhir apabila asid dititrat ke dalam alkali?', back: 'Merah jambu bertukar menjadi merah jambu sangat pudar / tanpa warna tepat pada takat akhir.' },
        { id: 'fc7_3', front: 'Apakah kegunaan jubin putih yang diletakkan di bawah kelalang kon semasa pentitratan?', back: 'Supaya perubahan warna penunjuk pada takat akhir dapat dilihat dengan lebih jelas dan tepat.' },
        { id: 'fc7_4', front: '25.0 cm³ NaOH 0.1 mol dm⁻³ dineutralkan oleh 12.5 cm³ asid H₂SO₄. Hitung kemolaran H₂SO₄.', back: '(M_a × 12.5) / (0.1 × 25.0) = 1/2 → M_a = (1 × 2.5) / (2 × 12.5) = 0.1 mol dm⁻³.' },
        { id: 'fc7_5', front: 'Mengapakah dinding dalam kelalang kon dibilas dengan air suling semasa pentitratan?', back: 'Untuk memastikan semua titisan asid/alkali yang terpercik pada dinding kelalang mengalir turun ke dalam larutan tanpa mengubah bilangan mol bahan.' }
      ],
      quiz: [
        {
          id: 'q7_1',
          question: 'Dalam suatu eksperimen pentitratan, 25.0 cm³ larutan kalium hidroksida, KOH memerlukan 20.0 cm³ asid sulfurik, H₂SO₄ 0.25 mol dm⁻³ untuk peneutralan lengkap. Hitung kemolaran larutan KOH itu.',
          options: ['0.20 mol dm⁻³', '0.40 mol dm⁻³', '0.10 mol dm⁻³', '0.50 mol dm⁻³'],
          answerIndex: 1,
          explanation: 'Persamaan: H₂SO₄ + 2KOH → K₂SO₄ + 2H₂O. Nisbah a/b = 1/2. (M_a × V_a)/(M_b × V_b) = 1/2 → (0.25 × 20.0)/(M_b × 25.0) = 1/2 → M_b = (2 × 0.25 × 20.0) / 25.0 = 0.40 mol dm⁻³.',
          level: 'Sederhana'
        },
        {
          id: 'q7_2',
          question: 'Apakah pemerhatian pada takat akhir apabila asid hidroklorik ditambahkan ke dalam kelalang kon yang mengandungi larutan natrium hidroksida dengan beberapa titis metil jingga?',
          options: [
            'Warna kuning bertukar kepada jingga',
            'Warna merah bertukar kepada kuning',
            'Warna tanpa warna bertukar kepada merah jambu',
            'Warna jingga bertukar kepada merah'
          ],
          answerIndex: 0,
          explanation: 'Metil jingga dalam alkali berwarna kuning. Pada takat akhir peneutralan, warnanya bertukar kepada jingga.',
          level: 'Rendah'
        },
        {
          id: 'q7_3',
          question: 'Mengapakah penambahan air suling ke dalam kelalang kon semasa membilas dinding kelalang tidak mengubah keputusan isi padu takat akhir pentitratan?',
          options: [
            'Air suling bertindak balas dengan asid',
            'Bilangan mol alkali di dalam kelalang kon tetap sama',
            'Kepekatan asid dalam buret meningkat',
            'pH larutan tidak dipengaruhi oleh air'
          ],
          answerIndex: 1,
          explanation: 'Air suling tidak mengubah bilangan mol zarah alkali asal yang telah dipipetkan ke dalam kelalang kon.',
          level: 'Sederhana'
        },
        {
          id: 'q7_4',
          question: 'Antara berikut, yang manakah merupakan aplikasi peneutralan dalam kehidupan harian?',
          options: [
            'Penggunaan cuka untuk membersihkan kerak cerek',
            'Penggunaan ubat antasid (mengandungi magnesium hidroksida) untuk meredakan gastrik',
            'Penggunaan serbuk penaik untuk menaikkan kek',
            'Penggunaan garam biasa untuk mengawet ikan'
          ],
          answerIndex: 1,
          explanation: 'Magnesium hidroksida atau aluminium hidroksida dalam ubat antasid bersifat bes dan meneutralkan asid hidroklorik berlebihan dalam perut.',
          level: 'Rendah'
        },
        {
          id: 'q7_5',
          question: 'Sebanyak 50.0 cm³ asid nitrik, HNO₃ 0.5 mol dm⁻³ bertindak balas dengan kalsium karbonat berlebihan. Berapakah isi padu gas CO₂ yang terbebas pada keadaan bilik? [Isi padu molar gas pada keadaan bilik = 24 dm³ mol⁻¹]',
          options: ['0.30 dm³', '0.60 dm³', '1.20 dm³', '2.40 dm³'],
          answerIndex: 0,
          explanation: '2HNO₃ + CaCO₃ → Ca(NO₃)₂ + CO₂ + H₂O. Mol HNO₃ = (0.5 × 50)/1000 = 0.025 mol. Daripada persamaan, 2 mol HNO₃ menghasilkan 1 mol CO₂. Mol CO₂ = 0.025 / 2 = 0.0125 mol. Isi padu CO₂ = 0.0125 × 24 dm³ = 0.30 dm³ (300 cm³).',
          level: 'Tinggi (KBAT)'
        },
        {
          id: 'q7_6',
          question: 'Semasa pentitratan 25.0 cm³ asid hidroklorik dengan larutan natrium hidroksida menggunakan penunjuk fenolftalein, bacaan buret awal ialah 2.40 cm³ dan bacaan akhir ialah 27.50 cm³. Berapakah isi padu titratan NaOH?',
          options: ['25.10 cm³', '27.50 cm³', '29.90 cm³', '25.00 cm³'],
          answerIndex: 0,
          explanation: 'Isi padu NaOH = Bacaan akhir - Bacaan awal = 27.50 - 2.40 = 25.10 cm³.',
          level: 'Rendah'
        }
      ]
    },
    {
      id: 't4-b6-s8',
      code: '6.8',
      title: 'Garam, Keterlarutan dan Kegunaan dalam Kehidupan Harian',
      learningStandard: 'SP 6.8.1, 6.8.2',
      durationMinutes: 15,
      tldr: [
        'Garam ialah sebatian ion yang terbentuk apabila ion H⁺ daripada asid digantikan oleh ion logam atau ion ammonium (NH₄⁺).',
        'Penamaan garam: kation (logam/ammonium) mendahului anion (daripada asid asalnya).',
        'Garam wujud secara semula jadi (contoh: garam batu halit, batu kapur kalsium karbonat) dan disintesis di makmal.',
        'Kegunaan garam merangkumi bidang pertanian (baja), perubatan (antiseptik, simen plaster Paris, barium meal), pengawetan dan perasa makanan.'
      ],
      concepts: [
        {
          id: 'c8_1',
          title: 'Definisi Rasmi Garam Mengikut Skema SPM',
          content: '<b>Garam</b> ialah <span class="blur-target"><b>sebatian ion</b></span> yang terbentuk apabila <span class="blur-target"><b>ion hidrogen, H⁺ daripada asid digantikan</b></span> oleh <b>ion logam</b> atau <b>ion ammonium, NH₄⁺</b>.<br/><br/>' +
                   '<b>Contoh Pembentukan & Asal-usul Ion Garam:</b><br/>' +
                   '• Garam <b>Natrium Klorida, NaCl</b>: Ion Na⁺ daripada alkali/bes (NaOH), ion Cl⁻ daripada asid hidroklorik (HCl).<br/>' +
                   '• Garam <b>Kuprum(II) Sulfat, CuSO₄</b>: Ion Cu²⁺ daripada CuO, ion SO₄²⁻ daripada asid sulfurik (H₂SO₄).<br/>' +
                   '• Garam <b>Ammonium Nitrat, NH₄NO₃</b>: Ion NH₄⁺ daripada ammonia (NH₃), ion NO₃⁻ daripada asid nitrik (HNO₃).'
        },
        {
          id: 'c8_2',
          title: 'Aplikasi & Kegunaan Garam dalam Industri & Kehidupan',
          content: 'Soalan SPM Kertas 1 dan Kertas 2 Bahagian A kerap menyoal aplikasi garam berikut:',
          comparisonTable: {
            headers: ['Bidang Aplikasi', 'Nama Garam', 'Formula Kimia', 'Fungsi / Kegunaan'],
            rows: [
              ['Pertanian', 'Ammonium nitrat & Ammonium sulfat', 'NH₄NO₃ / (NH₄)₂SO₄', 'Baja bernitrogen untuk merangsang tumbesaran daun hijau'],
              ['Perubatan', 'Barium sulfat', 'BaSO₄', 'Bahan kontras ("Barium meal") untuk pengimejan sinar-X saluran pencernaan kerana tidak larut dan legap radioaktif'],
              ['Perubatan', 'Kalsium sulfat terhidrat (Plaster of Paris)', 'CaSO₄·½H₂O', 'Menyokong tulang yang patah / retak'],
              ['Perubatan', 'Kalium manganat(VII)', 'KMnO₄', 'Antiseptik dan penyahjangkitan luka kulit'],
              ['Pengawetan Makanan', 'Natrium klorida / Natrium benzoat', 'NaCl / C₆H₅COONa', 'Mengawet ikan masin / menghalang pertumbuhan kulat dan bakteria'],
              ['Perasa Makanan', 'Mononatrium glutamat (MSG)', 'C₅H₈NO₄Na', 'Penambah perasa makanan (umami)']
            ]
          }
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menganggap barium sulfat, BaSO₄ berbahaya diminum oleh pesakit kerana barium adalah logam toksik.',
          correction: 'Walaupun ion Ba²⁺ bebas adalah toksik, BaSO₄ adalah GARAM TAK TERLARUTKAN (PBC). Ia langsung tidak melarut di dalam saluran usus pesakit dan disingkirkan dengan selamat tanpa diserap ke dalam darah!',
          why: 'Fakta keterlarutan inilah yang menjadikannya selamat sebagai bahan kontras sinar-X.'
        }
      ],
      flashcards: [
        { id: 'fc8_1', front: 'Apakah takrifan garam?', back: 'Sebatian ion yang terbentuk apabila ion hidrogen, H⁺ daripada asid digantikan oleh ion logam atau ion ammonium, NH₄⁺.' },
        { id: 'fc8_2', front: 'Garam manakah yang digunakan sebagai bahan kontras ("barium meal") untuk sinar-X saluran gastrousus pesakit?', back: 'Barium sulfat, BaSO₄ (kerana ia tidak larut dalam air dan menghalang sinar-X).' },
        { id: 'fc8_3', front: 'Apakah kegunaan ammonium nitrat, NH₄NO₃ dalam bidang pertanian?', back: 'Digunakan sebagai baja kimia untuk membekalkan unsur nitrogen kepada tumbuhan.' },
        { id: 'fc8_4', front: 'Apakah nama kimia bagi Plaster of Paris yang digunakan untuk merawat tulang patah?', back: 'Kalsium sulfat, CaSO₄ (terhidrat).' },
        { id: 'fc8_5', front: 'Nyatakan dua kegunaan natrium klorida, NaCl dalam kehidupan harian.', back: 'Sebagai perasa makanan dan bahan pengawet untuk mengeluarkan air daripada sel mikroorganisma (ikan/daging masin).' }
      ],
      quiz: [
        {
          id: 'q8_1',
          question: 'Garam manakah yang digunakan oleh doktor sebagai bahan penyerap sinar-X sebelum mengambil gambar radiografi perut pesakit?',
          options: ['Barium klorida, BaCl₂', 'Barium sulfat, BaSO₄', 'Barium nitrat, Ba(NO₃)₂', 'Barium karbonat, BaCO₃'],
          answerIndex: 1,
          explanation: 'BaSO₄ tidak larut dalam air dan legap kepada sinar-X. Ketaklarutannya menghalang ion barium toksik daripada diserap ke dalam saluran darah.',
          level: 'Rendah'
        },
        {
          id: 'q8_2',
          question: 'Antara garam berikut, yang manakah digunakan secara meluas sebagai baja bernitrogen dalam bidang pertanian?',
          options: ['Ammonium fosfat', 'Kalsium sulfat', 'Magnesium klorida', 'Plumbum(II) nitrat'],
          answerIndex: 0,
          explanation: 'Garam ammonium seperti ammonium fosfat dan ammonium nitrat mengandungi kandungan nitrogen yang tinggi untuk tumbesaran daun dan pokok.',
          level: 'Rendah'
        },
        {
          id: 'q8_3',
          question: 'Garam manakah yang terbentuk apabila ion hidrogen dalam asid sulfurik digantikan oleh ion ammonium?',
          options: ['Ammonium sulfida', 'Ammonium sulfat', 'Ammonium sulfit', 'Ammonium nitrat'],
          answerIndex: 1,
          explanation: 'Penggantian ion H⁺ dalam H₂SO₄ oleh ion NH₄⁺ menghasilkan ammonium sulfat, (NH₄)₂SO₄.',
          level: 'Rendah'
        },
        {
          id: 'q8_4',
          question: 'Antara berikut, yang manakah BUKAN kegunaan garam dalam industri atau kehidupan harian?',
          options: [
            'Natrium benzoat sebagai pengawet jem dan sos',
            'Kalsium klorida sebagai agen pengering',
            'Barium sulfat sebagai pemutih pakaian',
            'Kalium manganat(VII) sebagai pembasmi kuman'
          ],
          answerIndex: 2,
          explanation: 'Barium sulfat digunakan sebagai agen kontras sinar-X dan pigmen cat, bukan sebagai pemutih pakaian (pemutih pakaian biasanya menggunakan natrium hipoklorit, NaOCl).',
          level: 'Sederhana'
        },
        {
          id: 'q8_5',
          question: 'Bagaimanakah penambahan garam natrium klorida berkepekatan tinggi dapat mengawet ikan masin daripada reput?',
          options: [
            'Garam menurunkan nilai pH ikan menjadi sangat berasid',
            'Garam menyebabkan air meresap keluar daripada sel bakteria melalui osmosis, merencatkan pertumbuhannya',
            'Garam bertindak balas dengan protein ikan untuk menghasilkan lapisan plastik',
            'Garam membebaskan gas klorin yang membunuh bakteria'
          ],
          answerIndex: 1,
          explanation: 'Kepekatan garam tinggi mewujudkan medium hipertonik. Air ditarik keluar daripada sel mikroorganisma melalui osmosis, menyebabkan bakteria mati atau ternyahaktif.',
          level: 'Tinggi (KBAT)'
        }
      ]
    },
    {
      id: 't4-b6-s9',
      code: '6.9',
      title: 'Penyediaan Garam (Terlarutkan & Tak Terlarutkan)',
      learningStandard: 'SP 6.9.1, 6.9.2, 6.9.3, 6.9.4',
      durationMinutes: 25,
      tldr: [
        'Semua garam Nitrat (NO₃⁻), Ammonium (NH₄⁺), Natrium (Na⁺), dan Kalium (K⁺) larut dalam air (Formula mnemonik: "NO ANaK").',
        'Garam Sulfat larut KECUALI PbSO₄, BaSO₄, CaSO₄ ("PBC").',
        'Garam Klorida larut KECUALI PbCl₂, AgCl, Hg₂Cl₂ ("PAH / HPA"). PbCl₂ dan PbI₂ larut dalam air panas!',
        'Garam terlarutkan disediakan melalui tindak balas asid, manakala garam tak terlarutkan disediakan melalui Tindak Balas Penguraian Ganda Dua (Pemendakan).'
      ],
      concepts: [
        {
          id: 'c9_1',
          title: 'Peraturan Keterlarutan Garam KSSM (Formula Mnemonik Emas)',
          content: 'Hafal peraturan keterlarutan garam SPM dengan mnemonik ini:<br/><br/>' +
                   '• <b>Semua garam <span class="blur-target">NO ANaK</span> larut</b>: <b>N</b>itrat, <b>A</b>mmonium, <b>Na</b>trium, <b>K</b>alium.<br/>' +
                   '• <b>Semua garam Sulfat larut</b> KECUALI <span class="blur-target"><b>P B C</b> (Pb²⁺, Ba²⁺, Ca²⁺)</span>.<br/>' +
                   '• <b>Semua garam Klorida larut</b> KECUALI <span class="blur-target"><b>H P A</b> (Hg²⁺, Pb²⁺, Ag⁺)</span>.<br/>' +
                   '• <b>Semua garam Karbonat TAK LARUT</b> KECUALI garam <span class="blur-target">ANaK</span> (Ammonium, Natrium, Kalium).<br/><br/>' +
                   '<b>Keistimewaan Plumbum(II) Halida:</b><br/>' +
                   '<span class="blur-target">PbCl₂ dan PbI₂</span> <b>tidak larut dalam air sejuk</b> tetapi <b>LARUT dalam air panas</b> membentuk larutan tanpa warna, dan mendak semula apabila disejukkan!'
        },
        {
          id: 'c9_2',
          title: '3 Kaedah Penyediaan Garam Berdasarkan Jenis Garam',
          content: 'Pilihan kaedah bergantung kepada sama ada garam terlarutkan ANaK, bukan ANaK, atau garam tak terlarutkan:',
          comparisonTable: {
            headers: ['Jenis Garam', 'Kaedah Tindak Balas', 'Bahan Tindak Balas', 'Kaedah Pembersihan'],
            rows: [
              ['Garam Terlarutkan (ANaK)', '<span class="blur-target">Pentitratan Asid-Alkali</span>', 'Asid + Alkali (menggunakan penunjuk fenolftalein)', 'Penyejatan & Penghabluran semula'],
              ['Garam Terlarutkan (Bukan ANaK)', '<span class="blur-target">Tindak Balas Asid + Pepejal Berlebihan</span>', 'Asid + Logam / Oksida Logam / Karbonat Logam (berlebihan)', 'Turas baki pepejal berlebihan, panaskan hasil turasan hingga tepu, hablurkan'],
              ['Garam Tak Terlarutkan', '<span class="blur-target">Tindak Balas Penguraian Ganda Dua (Pemendakan)</span>', 'Dua larutan akueus garam terlarutkan dicampurkan', 'Turas mendakan, bilas dengan air suling, keringkan antara kertas turas']
            ]
          }
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menggunakan kuprum (Cu) dengan asid untuk menyediakan kuprum(II) sulfat, CuSO₄.',
          correction: 'Kuprum berada di bawah hidrogen dalam Siri Kereaktifan Logam dan TIDAK bertindak balas dengan asid cair! Gunakan CuO atau CuCO₃ bersama asid sulfurik.',
          why: 'Logam di bawah hidrogen tidak boleh menyesarkan hidrogen daripada asid.'
        },
        {
          mistake: 'Memanaskan larutan garam sehingga kering sepenuhnya untuk mendapatkan hablur.',
          correction: 'Larutan garam hanya dipanaskan sehingga LARUTAN TEPU (kira-kira 1/3 daripada isi padu asal), kemudian dibiarkan menyejuk pada suhu bilik untuk penghabluran.',
          why: 'Pemanasan sehingga kering menghasilkan serbuk amorfus dan boleh menguraikan garam terhidrat.'
        }
      ],
      simulationRef: {
        id: 'keterlarutan-garam',
        title: 'Makmal Maya Keterlarutan Garam Dalam Air',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=keterlarutan-garam',
        description: 'Bina garam daripada kation dan anion, masukkan ke dalam air sejuk dan panas untuk melihat keterlarutannya.',
        previewBadge: 'Simulasi Garam'
      },
      flashcards: [
        { id: 'fc9_1', front: 'Apakah garam sulfat yang tidak larut dalam air?', back: 'Plumbum(II) sulfat (PbSO₄), Barium sulfat (BaSO₄), dan Kalsium sulfat (CaSO₄) [Mnemonik: PBC].' },
        { id: 'fc9_2', front: 'Apakah kaedah terbaik menyediakan garam zink sulfat, ZnSO₄?', back: 'Tindak balas asid sulfurik cair dengan serbuk zink (atau ZnO/ZnCO₃) berlebihan, turas, dan hablurkan.' },
        { id: 'fc9_3', front: 'Bagaimanakah mendakan plumbum(II) iodida, PbI₂ boleh dibersihkan dan dikeringkan?', back: 'Turas campuran mendakan, bilas mendakan pada kertas turas dengan air suling, dan tekan antara dua keping kertas turas.' },
        { id: 'fc9_4', front: 'Mengapakah pepejal oksida logam ditambah secara berlebihan dalam penyediaan garam terlarut bukan ANaK?', back: 'Untuk memastikan kesemua asid habis bertindak balas sepenuhnya supaya garam yang terhasil tidak tercemar dengan asid.' },
        { id: 'fc9_5', front: 'Apakah sifat unik PbCl₂ dan PbI₂ apabila dipanaskan dalam air?', back: 'Tidak larut dalam air sejuk, tetapi larut dalam air mendidih membentuk larutan tanpa warna, dan mendak semula sebagai kristal apabila disejukkan.' }
      ],
      quiz: [
        {
          id: 'q9_1',
          question: 'Antara garam berikut, yang manakah TIDAK LARUT dalam air?',
          options: ['Kalium karbonat, K₂CO₃', 'Barium sulfat, BaSO₄', 'Zink klorida, ZnCl₂', 'Magnesium nitrat, Mg(NO₃)₂'],
          answerIndex: 1,
          explanation: 'Barium sulfat (BaSO₄) adalah garam sulfat tak larut (PBC). Semua nitrat larut, garam kalium larut, dan zink klorida larut.',
          level: 'Rendah'
        },
        {
          id: 'q9_2',
          question: 'Apakah bahan tindak balas yang paling sesuai untuk menyediakan mendakan plumbum(II) sulfat, PbSO₄?',
          options: [
            'Larutan plumbum(II) nitrat dan larutan natrium sulfat',
            'Logam plumbum dan asid sulfurik cair',
            'Serbuk plumbum(II) oksida dan asid sulfurik cair',
            'Pepejal plumbum(II) karbonat dan larutan kalium sulfat'
          ],
          answerIndex: 0,
          explanation: 'Garam tak larut disediakan melalui tindak balas penguraian ganda dua yang memerlukan DUA LARUTAN AKUEUS GARAM TERLARUTKAN. Pb(NO₃)₂ dan Na₂SO₄ kedua-duanya larut dalam air.',
          level: 'Sederhana',
          spmReference: 'SPM 2020 Kertas 2'
        },
        {
          id: 'q9_3',
          question: 'Seorang murid ingin menyediakan hablur tulen kuprum(II) sulfat di makmal. Mengapakah kuprum tidak boleh ditambah terus ke dalam asid sulfurik cair?',
          options: [
            'Kuprum bertindak balas terlalu cergas dan meletup',
            'Kuprum kurang reaktif daripada hidrogen dalam Siri Kereaktifan Logam',
            'Tindak balas itu menghasilkan gas toksik SO₂',
            'Kuprum membentuk lapisan oksida yang tebal'
          ],
          answerIndex: 1,
          explanation: 'Kuprum berada di bawah hidrogen dalam siri kereaktifan logam, jadi ia tidak dapat menyesarkan hidrogen daripada asid cair.',
          level: 'Sederhana'
        },
        {
          id: 'q9_4',
          question: 'Dalam penyediaan hablur garam terlarutkan, bagaimanakah kita dapat menguji sama ada sesuatu larutan garam telah mencapai tahap larutan tepu?',
          options: [
            'Uji larutan dengan kertas litmus merah',
            'Celup rod kaca ke dalam larutan panas; hablur terbentuk pada rod kaca apabila ditiup perlahan',
            'Perhatikan sama ada warna larutan bertukar menjadi gelap',
            'Ukur suhu larutan sehingga mencapai 100 °C'
          ],
          answerIndex: 1,
          explanation: 'Ujian rod kaca: celup rod kaca dan tiup. Jika hablur halus terbentuk dengan cepat pada rod kaca, larutan itu telah mencapai takat tepu.',
          level: 'Sederhana'
        },
        {
          id: 'q9_5',
          question: 'Persamaan ion berikut mewakili tindak balas pembentukan satu mendakan:\nAg⁺(ak) + Cl⁻(ak) → AgCl(p)\nJika 20 cm³ larutan AgNO₃ 0.5 mol dm⁻³ dicampurkan dengan 30 cm³ larutan NaCl 0.5 mol dm⁻³, hitung jisim mendakan AgCl yang terbentuk. [JAR: Ag=108, Cl=35.5]',
          options: ['1.435 g', '2.870 g', '0.718 g', '2.152 g'],
          answerIndex: 0,
          explanation: 'Mol Ag⁺ = (0.5 × 20)/1000 = 0.01 mol. Mol Cl⁻ = (0.5 × 30)/1000 = 0.015 mol. Ag⁺ adalah reagen pembatas (0.01 mol). Mol AgCl terbentuk = 0.01 mol. JMR AgCl = 108 + 35.5 = 143.5 g mol⁻¹. Jisim = 0.01 × 143.5 = 1.435 g.',
          level: 'Tinggi (KBAT)'
        },
        {
          id: 'q9_6',
          question: 'Antara garam klorida berikut, yang manakah LARUT di dalam air panas tetapi mendak semula apabila disejukkan ke suhu bilik?',
          options: ['Argentum klorida, AgCl', 'Plumbum(II) klorida, PbCl₂', 'Barium klorida, BaCl₂', 'Zink klorida, ZnCl₂'],
          answerIndex: 1,
          explanation: 'PbCl₂ (dan juga PbI₂) adalah garam halida plumbum yang mempunyai sifat keterlarutan istimewa: tidak larut dalam air sejuk, tetapi larut dalam air panas menghasilkan larutan tanpa warna.',
          level: 'Sederhana'
        }
      ]
    },
    {
      id: 't4-b6-s10',
      code: '6.10',
      title: 'Tindakan Haba ke atas Garam',
      learningStandard: 'SP 6.10.1, 6.10.2',
      durationMinutes: 25,
      tldr: [
        'Pemanasan garam menyebabkan penguraian terma menghasilkan baki pepejal oksida logam dan gas-gas tertentu.',
        'Semua garam Karbonat terurai membebaskan gas CO₂ (air kapur keruh) KECUALI Na₂CO₃ dan K₂CO₃ yang sangat stabil terhadap haba.',
        'Semua garam Nitrat terurai membebaskan gas perang NO₂ dan gas O₂ KECUALI NaNO₃ dan KNO₃ yang hanya membebaskan gas O₂ sahaja.',
        'Hafal warna baki oksida logam: ZnO (Kuning panas, Putih sejuk), PbO (Perang panas, Kuning sejuk), CuO (Hitam panas dan sejuk).'
      ],
      concepts: [
        {
          id: 'c10_1',
          title: 'Warna Baki Oksida Logam Semasa Panas vs Sejuk (Wajib Hafal SPM)',
          content: 'Pemerhatian warna baki pemanasan adalah klu paling kritikal dalam soalan inferens kualitatif Kertas 2 dan Kertas 3:',
          comparisonTable: {
            headers: ['Baki Oksida Logam', 'Formula Kimia', 'Warna Semasa Panas', 'Warna Semasa Sejuk', 'Inferens Kation'],
            rows: [
              ['Zink oksida', 'ZnO', '<span class="blur-target"><b>Kuning</b></span>', '<span class="blur-target"><b>Putih</b></span>', 'Ion Zink, Zn²⁺'],
              ['Plumbum(II) oksida', 'PbO', '<span class="blur-target"><b>Perang</b></span>', '<span class="blur-target"><b>Kuning</b></span>', 'Ion Plumbum(II), Pb²⁺'],
              ['Kuprum(II) oksida', 'CuO', '<span class="blur-target"><b>Hitam</b></span>', '<span class="blur-target"><b>Hitam</b></span>', 'Ion Kuprum(II), Cu²⁺'],
              ['Ferum(III) oksida', 'Fe₂O₃', '<span class="blur-target"><b>Perang Kemerahan</b></span>', '<span class="blur-target"><b>Perang Kemerahan</b></span>', 'Ion Ferum(III), Fe³⁺']
            ]
          }
        },
        {
          id: 'c10_2',
          title: 'Tindakan Haba ke atas Garam Karbonat',
          content: 'Kebanyakan garam karbonat terurai apabila dipanaskan untuk menghasilkan oksida logam dan gas karbon dioksida, CO₂:<br/><br/>' +
                   '<span class="chem-formula"><b>Karbonat Logam → Oksida Logam + Gas CO₂</b></span><br/><br/>' +
                   '• Contoh: <span class="chem-formula">ZnCO₃(p) → ZnO(p) + CO₂(g)</span> (Serbuk putih bertukar kuning semasa panas, putih semasa sejuk; air kapur keruh).<br/>' +
                   '• Contoh: <span class="chem-formula">CuCO₃(p) → CuO(p) + CO₂(g)</span> (Serbuk hijau bertukar hitam).<br/>' +
                   '• <b>Pengecualian Khas SPM:</b> <span class="blur-target"><b>Na₂CO₃ dan K₂CO₃ TIDAK TERURAI</b></span> oleh haba penunu Bunsen kerana ikatan ion yang amat stabil!<br/>' +
                   '• Garam ammonium karbonat: <span class="chem-formula">(NH₄)₂CO₃(p) → 2NH₃(g) + H₂O(c) + CO₂(g)</span> (Tiada baki pepejal tertinggal).'
        },
        {
          id: 'c10_3',
          title: 'Tindakan Haba ke atas Garam Nitrat',
          content: '<b>1. Nitrat Logam Sangat Reaktif (Na, K):</b><br/>' +
                   'Terurai menghasilkan garam <b>nitrit logam</b> dan <b>gas oksigen, O₂ sahaja</b> (kayu uji berbara menyala semula; tiada gas perang!):<br/>' +
                   '<span class="chem-formula">2NaNO₃(p) → 2NaNO₂(p) + O₂(g)</span><br/><br/>' +
                   '<b>2. Nitrat Logam Sederhana & Kurang Reaktif (Mg, Al, Zn, Fe, Pb, Cu):</b><br/>' +
                   'Terurai menghasilkan <b>oksida logam + gas nitrogen dioksida, NO₂ (perang & berbau sengit) + gas oksigen, O₂</b>:<br/>' +
                   '<span class="chem-formula">2Pb(NO₃)₂(p) → 2PbO(p) + 4NO₂(g) + O₂(g)</span><br/>' +
                   '<span class="chem-formula">2Cu(NO₃)₂(p) → 2CuO(p) + 4NO₂(g) + O₂(g)</span>'
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menganggap semua garam karbonat terurai apabila dipanaskan dengan penunu Bunsen.',
          correction: 'Natrium karbonat (Na₂CO₃) dan kalium karbonat (K₂CO₃) TIDAK TERURAI oleh haba penunu Bunsen makmal biasa!',
          why: 'Ion Na⁺ dan K⁺ sangat elektropositif dan membentuk kekisi hablur ion yang sangat stabil.'
        },
        {
          mistake: 'Menganggap hanya satu gas terbebas semasa pemanasan plumbum(II) nitrat.',
          correction: 'Pemanasan nitrat logam seperti Pb(NO₃)₂ membebaskan DUA jenis gas serentak: gas perang nitrogen dioksida (NO₂) dan gas tanpa warna oksigen (O₂)!',
          why: 'Persamaan seimbang: 2Pb(NO₃)₂ → 2PbO + 4NO₂ + O₂.'
        }
      ],
      simulationRef: {
        id: 'ujian-gas',
        title: 'Makmal Maya Pemanasan Garam & Ujian Gas',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=ujian-gas',
        description: 'Panaskan pelbagai sampel garam karbonat dan nitrat, uji gas terbebas dengan air kapur dan kayu uji.',
        previewBadge: 'Simulasi Haba Garam'
      },
      flashcards: [
        { id: 'fc10_1', front: 'Apakah warna baki zink oksida semasa panas dan semasa sejuk?', back: 'Kuning semasa panas, putih apabila sejuk.' },
        { id: 'fc10_2', front: 'Apakah warna baki plumbum(II) oksida semasa panas dan semasa sejuk?', back: 'Perang semasa panas, kuning apabila sejuk.' },
        { id: 'fc10_3', front: 'Apakah dua garam karbonat yang tidak terurai oleh pemanasan penunu Bunsen?', back: 'Natrium karbonat (Na₂CO₃) dan kalium karbonat (K₂CO₃).' },
        { id: 'fc10_4', front: 'Apakah dua jenis gas yang terbebas apabila kuprum(II) nitrat dipanaskan kuat?', back: 'Gas nitrogen dioksida, NO₂ (gas perang berasid) dan gas oksigen, O₂ (menyalakan kayu uji berbara).' },
        { id: 'fc10_5', front: 'Apakah perubahan warna apabila pepejal kuprum(II) karbonat dipanaskan?', back: 'Serbuk hijau kuprum(II) karbonat bertukar menjadi serbuk hitam kuprum(II) oksida.' }
      ],
      quiz: [
        {
          id: 'q10_1',
          question: 'Suatu serbuk putih dipanaskan dengan kuat dalam tabung uji. Baki yang terbentuk berwarna kuning semasa panas dan bertukar putih apabila sejuk. Gas yang terbebas mengeruhkan air kapur. Apakah serbuk putih itu?',
          options: ['Zink nitrat', 'Zink karbonat', 'Plumbum(II) karbonat', 'Magnesium karbonat'],
          answerIndex: 1,
          explanation: 'Baki kuning panas/putih sejuk menunjukkan ZnO (ion Zn²⁺). Gas mengeruhkan air kapur menunjukkan gas CO₂ daripada ion karbonat, CO₃²⁻. Maka garam asal ialah zink karbonat, ZnCO₃.',
          level: 'Sederhana',
          spmReference: 'SPM 2022 Kertas 2'
        },
        {
          id: 'q10_2',
          question: 'Antara garam karbonat berikut, yang manakah TIDAK TERURAI apabila dipanaskan menggunakan penunu Bunsen di makmal?',
          options: ['Kalsium karbonat, CaCO₃', 'Kuprum(II) karbonat, CuCO₃', 'Natrium karbonat, Na₂CO₃', 'Zink karbonat, ZnCO₃'],
          answerIndex: 2,
          explanation: 'Natrium karbonat (Na₂CO₃) dan kalium karbonat (K₂CO₃) sangat stabil terhadap haba dan tidak terurai pada suhu penunu Bunsen.',
          level: 'Rendah'
        },
        {
          id: 'q10_3',
          question: 'Pemanasan pepejal plumbum(II) nitrat, Pb(NO₃)₂ membebaskan:',
          options: [
            'Gas oksigen sahaja',
            'Gas nitrogen dioksida dan gas oksigen',
            'Gas nitrogen sahaja',
            'Gas karbon dioksida dan gas oksigen'
          ],
          answerIndex: 1,
          explanation: '2Pb(NO₃)₂(p) → 2PbO(p) + 4NO₂(g) + O₂(g). Gas perang NO₂ dan gas O₂ dibebaskan serentak.',
          level: 'Rendah'
        },
        {
          id: 'q10_4',
          question: 'Berapakah jisim zink oksida yang terbentuk apabila 12.5 g zink karbonat dipanaskan sehingga terurai lengkap? [JAR: Zn=65, C=12, O=16]',
          options: ['8.1 g', '4.05 g', '6.5 g', '10.2 g'],
          answerIndex: 0,
          explanation: 'JMR ZnCO₃ = 65 + 12 + 48 = 125 g mol⁻¹. Mol ZnCO₃ = 12.5 / 125 = 0.1 mol. ZnCO₃ → ZnO + CO₂. Mol ZnO = 0.1 mol. JMR ZnO = 65 + 16 = 81 g mol⁻¹. Jisim ZnO = 0.1 × 81 = 8.1 g.',
          level: 'Sederhana'
        },
        {
          id: 'q10_5',
          question: 'Apabila garam X dipanaskan, tiada baki pepejal tertinggal di dalam tabung uji. Apakah garam X yang mungkin?',
          options: ['Natrium nitrat', 'Ammonium karbonat', 'Kuprum(II) nitrat', 'Plumbum(II) karbonat'],
          answerIndex: 1,
          explanation: 'Ammonium karbonat terurai sepenuhnya kepada gas-gas: (NH₄)₂CO₃(p) → 2NH₃(g) + H₂O(g) + CO₂(g). Oleh itu, tiada baki pepejal tertinggal.',
          level: 'Tinggi (KBAT)'
        },
        {
          id: 'q10_6',
          question: 'Garam nitrat manakah yang HANYA membebaskan gas oksigen apabila dipanaskan tanpa membebaskan gas perang nitrogen dioksida?',
          options: ['Kalium nitrat, KNO₃', 'Magnesium nitrat, Mg(NO₃)₂', 'Zink nitrat, Zn(NO₃)₂', 'Kuprum(II) nitrat, Cu(NO₃)₂'],
          answerIndex: 0,
          explanation: 'Nitrat logam K dan Na sangat stabil dan hanya terurai separa kepada nitrit logam + gas O₂: 2KNO₃ → 2KNO₂ + O₂.',
          level: 'Sederhana'
        }
      ]
    },
    {
      id: 't4-b6-s11',
      code: '6.11',
      title: 'Analisis Kualitatif Garam (Kation, Anion & Gas)',
      learningStandard: 'SP 6.11.1, 6.11.2, 6.11.3',
      durationMinutes: 30,
      tldr: [
        'Ujian kation menggunakan larutan Natrium Hidroksida (NaOH) dan larutan Ammonia (NH₃) secara sedikit demi sedikit hingga berlebihan.',
        'Zn²⁺ adalah satu-satunya kation yang menghasilkan mendakan putih yang LARUT dalam KEDUA-DUA NaOH berlebihan dan NH₃ berlebihan.',
        'Al³⁺ dan Pb²⁺ dibezakan dengan larutan Kalium Iodida (KI) di mana Pb²⁺ menghasilkan mendakan KUNING PbI₂.',
        'Ujian pengesahan Fe²⁺ menghasilkan larutan biru tua dengan K₃[Fe(CN)₆], manakala Fe³⁺ menghasilkan larutan merah darah dengan KSCN.'
      ],
      concepts: [
        {
          id: 'c11_1',
          title: 'Carta Alir Tindak Balas Kation dengan NaOH dan NH₃',
          content: 'Ujian kation merupakan soalan wajib dalam SPM Kertas 2 dan Kertas 3. Hafal corak pemerhatian berikut:<br/><br/>' +
                   '<b>Kation dengan Mendakan Berwarna:</b><br/>' +
                   '• <span class="blur-target">Cu²⁺</span>: Mendakan BIRU. Tak larut dalam NaOH berlebihan; LARUT dalam NH₃ berlebihan membentuk larutan BIRU TUA yang sangat pekat.<br/>' +
                   '• <span class="blur-target">Fe²⁺</span>: Mendakan HIJAU kotor. Tidak larut dalam kedua-dua NaOH dan NH₃ berlebihan.<br/>' +
                   '• <span class="blur-target">Fe³⁺</span>: Mendakan PERANG kemerahan. Tidak larut dalam kedua-dua NaOH dan NH₃ berlebihan.<br/><br/>' +
                   '<b>Kation dengan Mendakan Putih:</b><br/>' +
                   '• <span class="blur-target">Zn²⁺</span>: Larut dalam KEDUA-DUA NaOH dan NH₃ berlebihan menghasilkan larutan tanpa warna.<br/>' +
                   '• <span class="blur-target">Al³⁺ & Pb²⁺</span>: Larut dalam NaOH berlebihan, tetapi TAK LARUT dalam NH₃ berlebihan.<br/>' +
                   '• <span class="blur-target">Mg²⁺</span>: Tak larut dalam NaOH berlebihan, dan TAK LARUT dalam NH₃ berlebihan.<br/>' +
                   '• <span class="blur-target">Ca²⁺</span>: Tak larut dalam NaOH berlebihan, dan TIADA MENDAKAN terbentuk dalam NH₃.<br/>' +
                   '• <span class="blur-target">NH₄⁺</span>: TIADA MENDAKAN dalam kedua-dua reagen. Panaskan bersama NaOH untuk membebaskan gas ammonia yang berbau sengit.'
        },
        {
          id: 'c11_2',
          title: 'Ujian Pengesahan Penting SPM',
          content: '<b>1. Membezakan Al³⁺ dan Pb²⁺:</b><br/>' +
                   'Tambah larutan <b>Kalium Iodida, KI</b>:<br/>' +
                   '• Pb²⁺ menghasilkan <span class="blur-target"><b>mendakan kuning</b> (PbI₂)</span>.<br/>' +
                   '• Al³⁺ menghasilkan <b>tiada perubahan / larutan tanpa warna</b>.<br/><br/>' +
                   '<b>2. Ujian Pengesahan Fe²⁺ dan Fe³⁺:</b><br/>' +
                   '• Fe²⁺ + Kalium heksasianoferat(III), K₃[Fe(CN)₆] → <span class="blur-target"><b>Mendakan Biru Tua</b></span>.<br/>' +
                   '• Fe³⁺ + Kalium tiosianat, KSCN → <span class="blur-target"><b>Larutan Merah Darah</b></span>.<br/><br/>' +
                   '<b>3. Ujian Anion (CO₃²⁻, Cl⁻, SO₄²⁻, NO₃⁻):</b><br/>' +
                   '• CO₃²⁻: Asid cair → Gas CO₂ (air kapur keruh).<br/>' +
                   '• Cl⁻: Asid nitrik + larutan AgNO₃ → Mendakan PUTIH AgCl.<br/>' +
                   '• SO₄²⁻: Asid hidroklorik + larutan BaCl₂ → Mendakan PUTIH BaSO₄.<br/>' +
                   '• NO₃⁻: H₂SO₄ cair + FeSO₄ + H₂SO₄ pekat → CINCIN PERANG terbentuk.'
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menulis "mendakan larut" tanpa menyatakan warna larutan yang terbentuk.',
          correction: 'Mesti tulis "mendakan putih larut dalam larutan NaOH berlebihan menghasilkan LARUTAN TANPA WARNA".',
          why: 'Skema pemarkahan SPM menolak jawapan yang tidak menyatakan keadaan/warna larutan akhir.'
        },
        {
          mistake: 'Mengelirukan ujian pengesahan Fe²⁺ dan Fe³⁺.',
          correction: 'Ingat: Fe²⁺ guna K₃ (angka 3) untuk hasilkan biru tua; Fe³⁺ guna KSCN menghasilkan merah darah pekat.',
          why: 'Perangkap biasa soalan objektif dan struktur SPM.'
        }
      ],
      simulationRef: {
        id: 'ujian-kation',
        title: 'Makmal Maya Analisis Kualitatif Kation',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=ujian-kation',
        description: 'Titiskan NaOH dan NH₃ ke dalam tabung uji, perhatikan warna mendakan dan uji kation misteri.',
        previewBadge: 'Makmal Maya Kation'
      },
      flashcards: [
        { id: 'fc11_1', front: 'Kation manakah menghasilkan mendakan putih yang larut dalam kedua-dua NaOH dan NH₃ berlebihan?', back: 'Ion Zink, Zn²⁺.' },
        { id: 'fc11_2', front: 'Bagaimanakah anda mengesahkan kehadiran ion plumbum(II), Pb²⁺ berbanding aluminium, Al³⁺?', back: 'Tambah larutan Kalium Iodida, KI. Mendakan kuning plumbum(II) iodida, PbI₂ akan terbentuk bagi Pb²⁺.' },
        { id: 'fc11_3', front: 'Apakah pemerhatian apabila larutan ammonia, NH₃ ditambah secara berlebihan kepada larutan Cu²⁺?', back: 'Mendakan biru pada awalnya larut dalam NH₃ berlebihan untuk membentuk larutan biru tua yang amat pekat.' },
        { id: 'fc11_4', front: 'Apakah reagen yang digunakan untuk menguji ion nitrat, NO₃⁻ bagi membentuk cincin perang?', back: 'Asid sulfurik cair + larutan ferum(II) sulfat + titisan asid sulfurik PEKAT melalui dinding tabung uji tanpa digoncang.' },
        { id: 'fc11_5', front: 'Apakah pemerhatian bagi ujian gas klorin, Cl₂?', back: 'Gas berwarna kuning kehijauan menukarkan kertas litmus biru lembap kepada merah dan kemudian melunturkannya menjadi putih.' }
      ],
      quiz: [
        {
          id: 'q11_1',
          question: 'Ujian kualitatif ke atas larutan X memberikan pemerhatian berikut:\n• Mendakan putih terbentuk apabila ditambah beberapa titis larutan NaOH, dan larut dalam NaOH berlebihan.\n• Mendakan putih terbentuk apabila ditambah beberapa titis larutan NH₃, dan TIDAK larut dalam NH₃ berlebihan.\n• Tiada mendakan terbentuk apabila larutan kalium iodida, KI ditambah.\nApakah kation yang hadir dalam larutan X?',
          options: ['Zn²⁺', 'Pb²⁺', 'Al³⁺', 'Mg²⁺'],
          answerIndex: 2,
          explanation: 'Mendakan putih larut dalam NaOH lebih tetapi tak larut dalam NH₃ lebih menunjukkan sama ada Al³⁺ atau Pb²⁺. Ujian negatif dengan KI (tiada mendakan kuning) mengesahkan kehadiran ion Al³⁺.',
          level: 'Sederhana',
          spmReference: 'SPM 2023 Kertas 2'
        },
        {
          id: 'q11_2',
          question: 'Antara reagen berikut, yang manakah menghasilkan larutan merah darah apabila ditambah kepada larutan yang mengandungi ion Fe³⁺?',
          options: [
            'Larutan Kalium Tiosianat, KSCN',
            'Larutan Kalium Heksasianoferat(III), K₃[Fe(CN)₆]',
            'Larutan Barium Klorida, BaCl₂',
            'Larutan Natrium Klorida, NaCl'
          ],
          answerIndex: 0,
          explanation: 'KSCN bertindak balas dengan ion Fe³⁺ membentuk kompleks tiosianatoferum(III) yang berwarna merah darah pekat.',
          level: 'Rendah'
        },
        {
          id: 'q11_3',
          question: 'Apabila sedikit larutan ammonia ditambah kepada suatu larutan garam Y, mendakan biru terbentuk. Apabila larutan ammonia berlebihan ditambah, mendakan biru tersebut larut menghasilkan larutan biru tua. Apakah kation dalam garam Y?',
          options: ['Fe²⁺', 'Cu²⁺', 'Al³⁺', 'Zn²⁺'],
          answerIndex: 1,
          explanation: 'Ion kuprum(II), Cu²⁺ membentuk mendakan biru Cu(OH)₂ dengan sedikit NH₃, dan larut dalam NH₃ berlebihan membentuk kompleks ion tetraaminakuprum(II), [Cu(NH₃)₄]²⁺ yang berwarna biru tua.',
          level: 'Rendah'
        },
        {
          id: 'q11_4',
          question: 'Ujian cincin perang dijalankan ke atas suatu larutan garam untuk mengesahkan kehadiran ion:',
          options: ['Sulfat, SO₄²⁻', 'Klorida, Cl⁻', 'Nitrat, NO₃⁻', 'Karbonat, CO₃²⁻'],
          answerIndex: 2,
          explanation: 'Ujian cincin perang (FeSO₄ + H₂SO₄ pekat) adalah ujian pengesahan khusus untuk ion nitrat, NO₃⁻.',
          level: 'Rendah'
        },
        {
          id: 'q11_5',
          question: 'Suatu serbuk garam hijau dipanaskan dengan kuat dalam tabung uji. Serbuk hitam terbentuk dan gas yang mengeruhkan air kapur terbebas. Apakah serbuk garam asal itu?',
          options: ['Kuprum(II) sulfat', 'Kuprum(II) karbonat', 'Ferum(II) klorida', 'Zink karbonat'],
          answerIndex: 1,
          explanation: 'Kuprum(II) karbonat (CuCO₃) berwarna hijau. Apabila dipanaskan terurai menghasilkan kuprum(II) oksida (CuO - pepejal hitam) dan gas CO₂ yang mengeruhkan air kapur: CuCO₃(p) → CuO(p) + CO₂(g).',
          level: 'Tinggi (KBAT)'
        },
        {
          id: 'q11_6',
          question: 'Apakah reagen yang perlu ditambah kepada suatu larutan garam untuk mengesahkan kehadiran ion sulfat, SO₄²⁻?',
          options: [
            'Asid hidroklorik cair diikuti larutan barium klorida',
            'Asid nitrik cair diikuti larutan argentum nitrat',
            'Larutan natrium hidroksida diikuti pemanasan',
            'Larutan kalium iodida'
          ],
          answerIndex: 0,
          explanation: 'Ujian ion sulfat, SO₄²⁻ menggunakan asid hidroklorik cair diikuti dengan larutan barium klorida, BaCl₂ menghasilkan mendakan putih barium sulfat, BaSO₄ yang tidak larut.',
          level: 'Rendah'
        },
        {
          id: 'q11_7',
          question: 'Dua titis larutan natrium hidroksida ditambah ke dalam tabung uji yang mengandungi larutan ion kalsium, Ca²⁺ dan tabung uji lain mengandungi ion magnesium, Mg²⁺. Kedua-duanya menghasilkan mendakan putih yang tidak larut dalam NaOH berlebihan. Bagaimanakah cara termudah membezakan kedua-dua kation ini?',
          options: [
            'Tambah larutan ammonia, NH₃: Mg²⁺ membentuk mendakan putih, Ca²⁺ tiada mendakan',
            'Panaskan larutan dengan penunu Bunsen',
            'Tambah larutan kalium tiosianat, KSCN',
            'Uji dengan kertas litmus biru'
          ],
          answerIndex: 0,
          explanation: 'Larutan ammonia, NH₃ membezakan Ca²⁺ dan Mg²⁺. Mg²⁺ membentuk mendakan putih Mg(OH)₂ dengan NH₃, manakala Ca²⁺ TIADA MENDAKAN terbentuk kerana kepekatan ion OH⁻ dalam NH₃ tidak mencukupi untuk melepasi hasil darab keterlarutan Ca(OH)₂.',
          level: 'Tinggi (KBAT)'
        }
      ]
    }
  ]
};
