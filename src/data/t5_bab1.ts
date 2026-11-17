import { Chapter } from '../types/nota';

export const T5_BAB1: Chapter = {
  id: 't5-b1',
  form: 'T5',
  chapterNumber: 1,
  title: 'Keseimbangan Redoks',
  theme: 'Proses Kimia',
  durationMinutes: 210,
  subtopicCount: 6,
  iconName: 'Zap',
  description: 'Menguasai 4 takrifan redoks, keupayaan elektrod piawai (E°), sel kimia & notasi sel, sel elektrolisis leburan dan akueus, pengekstrakan logam (relau bagas & elektrolisis alumina) serta mekanisme pengaratan besi.',
  subtopics: [
    // ==========================================
    // SUBTOPIK 1.1
    // ==========================================
    {
      id: 't5-b1-s1',
      code: '1.1',
      title: 'Pengoksidaan dan Penurunan',
      learningStandard: 'SP 1.1.1, 1.1.2, 1.1.3',
      durationMinutes: 35,
      tldr: [
        'Tindak balas redoks ialah tindak balas kimia di mana pengoksidaan dan penurunan berlaku serentak.',
        'Pengoksidaan: penerimaan oksigen, kehilangan hidrogen, pelepasan elektron (OIL), atau pertambahan nombor pengoksidaan.',
        'Penurunan: kehilangan oksigen, penerimaan hidrogen, penerimaan elektron (RIG), atau pengurangan nombor pengoksidaan.',
        'Agen pengoksidaan mengoksidakan bahan lain dan mengalami penurunan (menerima elektron). Agen penurunan menurunkan bahan lain dan mengalami pengoksidaan (menderma elektron).',
        'Radas tiub-U membuktikan pemindahan elektron pada suatu jarak melalui litar luar dengan elektrolit sebagai jambatan garam.'
      ],
      concepts: [
        {
          id: 't5-b1-s1-c1',
          title: '4 Cara Pentakrifan Tindak Balas Redoks',
          badge: 'Asas Redoks SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">4 Aspek Takrifan Rasmi DSKP KSSM</span>
                <div class="overflow-x-auto">
                  <table class="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr class="bg-slate-100 text-slate-700 border-b border-slate-200">
                        <th class="p-2 font-bold">Aspek Takrifan</th>
                        <th class="p-2 font-bold text-emerald-800">Pengoksidaan (Oxidation)</th>
                        <th class="p-2 font-bold text-rose-800">Penurunan (Reduction)</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 text-slate-700">
                      <tr>
                        <td class="p-2 font-medium">1. Oksigen</td>
                        <td class="p-2 text-emerald-700 font-semibold">Menerima / Menambah Oksigen</td>
                        <td class="p-2 text-rose-700 font-semibold">Kehilangan Oksigen</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-medium">2. Hidrogen</td>
                        <td class="p-2 text-emerald-700 font-semibold">Kehilangan Hidrogen</td>
                        <td class="p-2 text-rose-700 font-semibold">Menerima / Menambah Hidrogen</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-medium">3. Pemindahan Elektron</td>
                        <td class="p-2 text-emerald-700 font-semibold">Kehilangan / Pelepasan Elektron (OIL)</td>
                        <td class="p-2 text-rose-700 font-semibold">Penerimaan Elektron (RIG)</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-medium">4. Nombor Pengoksidaan</td>
                        <td class="p-2 text-emerald-700 font-semibold">Nombor pengoksidaan BERTAMBAH</td>
                        <td class="p-2 text-rose-700 font-semibold">Nombor pengoksidaan BERKURANG</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                  <b>💡 Mnemonik Emas Pemindahan Elektron:</b> <b>OIL RIG</b> — <b>O</b>xidation <b>I</b>s <b>L</b>oss of electrons, <b>R</b>eduction <b>I</b>s <b>G</b>ain of electrons.
                </div>
              </div>

              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-indigo-900 uppercase tracking-wider block mb-2">Tindak Balas Redoks vs Bukan Redoks</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-2">
                  Bukan semua tindak balas kimia ialah redoks. Jika <b>tiada perubahan nombor pengoksidaan</b> bagi mana-mana unsur, tindak balas itu ialah <b>bukan redoks</b>:
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
                    <b class="text-rose-900 block font-bold mb-1">Contoh Bukan Redoks:</b>
                    <ul class="list-disc pl-4 space-y-0.5 text-[11px]">
                      <li><b>Peneutralan asid-bes:</b> HCl + NaOH → NaCl + H₂O (Semua nombor pengoksidaan kekal sama).</li>
                      <li><b>Pemendakan garam (Penguraian ganda dua):</b> AgNO₃ + NaCl → AgCl + NaNO₃.</li>
                    </ul>
                  </div>
                  <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                    <b class="text-emerald-900 block font-bold mb-1">Contoh Redoks Pasti:</b>
                    <ul class="list-disc pl-4 space-y-0.5 text-[11px]">
                      <li><b>Pembakaran sebatian:</b> CH₄ + 2O₂ → CO₂ + 2H₂O.</li>
                      <li><b>Penyesaran logam / halogen:</b> Zn + CuSO₄ → ZnSO₄ + Cu.</li>
                      <li><b>Tindak balas melibatkan unsur bebas:</b> Sebarang tindak balas yang melibatkan unsur bebas (O.N. = 0) membentuk sebatian sentiasa redoks!</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b1-s1-c2',
          title: 'Pemindahan Elektron pada Suatu Jarak (Radas Tiub-U)',
          badge: 'Eksperimen SPM Popular',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">Prinsip Operasi Litar Tiub-U</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Eksperimen Tiub-U membuktikan pemindahan elektron boleh berlaku tanpa sentuhan fizikal secara langsung antara agen pengoksidaan dan agen penurunan:
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-rose-900 block mb-1">Lengan Anod (Terminal Negatif):</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      <li>Diisi larutan <b>agen penurunan</b> (contoh: larutan FeSO₄ atau KI).</li>
                      <li>Berlaku <b>pengoksidaan</b> (melepaskan elektron).</li>
                      <li>Elektron mengalir keluar ke wayar litar luar.</li>
                      <li>Contoh: <span class="font-mono text-rose-800 font-bold">Fe²⁺(ak) → Fe³⁺(ak) + e⁻</span> (larutan hijau muda bertukar perang).</li>
                    </ul>
                  </div>

                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-sky-900 block mb-1">Lengan Katod (Terminal Positif):</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      <li>Diisi larutan <b>agen pengoksidaan</b> (contoh: air bromin Br₂ atau KMnO₄ berasid).</li>
                      <li>Berlaku <b>penurunan</b> (menerima elektron).</li>
                      <li>Elektron diterima daripada wayar litar luar.</li>
                      <li>Contoh: <span class="font-mono text-sky-800 font-bold">Br₂(ak) + 2e⁻ → 2Br⁻(ak)</span> (air bromin perang dinyahwarnakan).</li>
                    </ul>
                  </div>
                </div>

                <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                  <b class="text-amber-900 block font-bold mb-1">Peranan Asid Sulfurik Cair di Dasar Tiub-U:</b>
                  <ol class="list-decimal pl-5 space-y-1 text-[11px] text-amber-900">
                    <li>Bertindak sebagai <b>jambatan garam</b> untuk membenarkan pengaliran ion bagi mengimbangi cas larutan.</li>
                    <li>Melengkapkan litar elektrik.</li>
                    <li>Memisahkan kedua-dua larutan daripada bercampur secara langsung.</li>
                  </ol>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b1-s1-c3',
          title: 'Penukaran Bersaling Ion Fe²⁺ ⇌ Fe³⁺ & Penyesaran Halogen',
          badge: 'Ujian Kation & Halogen SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-purple-900 uppercase tracking-wider block mb-2">Penukaran Bersaling Fe²⁺ ⇌ Fe³⁺</span>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                  <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <b class="text-emerald-900 block mb-1">Pengoksidaan: Fe²⁺ → Fe³⁺ + e⁻</b>
                    <p class="text-[11px] text-slate-700 mb-1">Warna larutan: <b>Hijau muda → Perang</b>.</p>
                    <p class="text-[11px] text-emerald-950"><b>Agen Pengoksidaan:</b> Air bromin (Br₂), air klorin (Cl₂), larutan KMnO₄ berasid, atau H₂O₂ berasid.</p>
                  </div>

                  <div class="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
                    <b class="text-blue-900 block mb-1">Penurunan: Fe³⁺ + e⁻ → Fe²⁺</b>
                    <p class="text-[11px] text-slate-700 mb-1">Warna larutan: <b>Perang → Hijau muda</b>.</p>
                    <p class="text-[11px] text-blue-950"><b>Agen Penurunan:</b> Logam reaktif seperti serbuk zink (Zn), serbuk magnesium (Mg), atau serbuk ferum (Fe).</p>
                  </div>
                </div>

                <!-- JADUAL REAGEN PENGESAHAN -->
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">Ujian Pengesahan Ion Ferum SPM</span>
                <div class="overflow-x-auto">
                  <table class="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr class="bg-slate-100 text-slate-700 border-b border-slate-200">
                        <th class="p-2 font-bold">Reagen Pengesahan</th>
                        <th class="p-2 font-bold text-emerald-800">Ion Ferum(II), Fe²⁺</th>
                        <th class="p-2 font-bold text-rose-800">Ion Ferum(III), Fe³⁺</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 text-slate-700 text-[11px]">
                      <tr>
                        <td class="p-2 font-medium">Larutan NaOH / NH₃</td>
                        <td class="p-2 text-emerald-700">Mendakan hijau kotor (tak larut dalam berlebihan)</td>
                        <td class="p-2 text-rose-700">Mendakan perang (tak larut dalam berlebihan)</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-medium">Kalium Heksasianoferat(II), K₄[Fe(CN)₆]</td>
                        <td class="p-2 text-sky-700 font-semibold">Mendakan biru muda</td>
                        <td class="p-2 text-blue-900 font-bold">Mendakan biru tua pekat</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-medium">Kalium Heksasianoferat(III), K₃[Fe(CN)₆]</td>
                        <td class="p-2 text-blue-900 font-bold">Mendakan biru tua pekat</td>
                        <td class="p-2 text-amber-800 font-semibold">Mendakan / larutan perang kehijauan</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-medium">Kalium Tiosianat, KSCN</td>
                        <td class="p-2 text-slate-500">Tiada perubahan (merah pudar)</td>
                        <td class="p-2 text-rose-700 font-black">Warna merah darah pekat (blood-red)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- PENYESARAN HALOGEN -->
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">Penyesaran Halogen daripada Larutan Halida</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-2">
                  Kereaktifan halogen sebagai agen pengoksidaan <b>berkurang menuruni Kumpulan 17</b>: <span class="font-mono font-bold text-sky-900">Cl₂ &gt; Br₂ &gt; I₂</span>. Halogen di atas yang lebih reaktif boleh menyesarkan ion halida di bawahnya daripada larutan akueus.
                </p>
                <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <b class="text-slate-800 block mb-1">Ujian Warna dalam Pelarut Organik (1,1,1-trikloroetana / CH₂Cl₂):</b>
                  <div class="grid grid-cols-3 gap-2 text-center text-[11px] mt-1">
                    <div class="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                      <b>Klorin (Cl₂)</b><br/>Kuning pucat
                    </div>
                    <div class="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
                      <b>Bromin (Br₂)</b><br/>Perang / Jingga
                    </div>
                    <div class="p-2 rounded-lg bg-purple-50 border border-purple-200 text-purple-900">
                      <b>Iodin (I₂)</b><br/>Ungu (Purple)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menganggap agen pengoksidaan mengalami tindak balas pengoksidaan.',
          correction: 'Agen pengoksidaan mengoksidakan bahan lain dan DIRINYA SENDIRI MENGALAMI PENURUNAN (menerima elektron)!',
          why: 'Ini adalah kekeliruan istilah yang paling kerap menyebabkan calon kehilangan markah SPM.'
        },
        {
          mistake: 'Menyatakan elektron bergerak melalui jambatan garam atau elektrolit.',
          correction: 'Elektron HANYA mengalir melalui wayar litar luar. Di dalam elektrolit atau jambatan garam, arus dibawa oleh pergerakan ION!',
          why: 'Elektron bebas tidak wujud dalam larutan akueus.'
        }
      ],
      simulationRef: {
        id: 'pemindahan-elektron-tiub-u',
        title: 'Makmal Maya Pemindahan Elektron pada Suatu Jarak (Tiub-U)',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=pemindahan-elektron-tiub-u',
        description: 'Perhatikan pengaliran elektron melalui litar luar, pesongan jarum galvanometer, dan jalankan ujian titisan penitis NaOH untuk mengesahkan ion hasil.',
        previewBadge: 'Simulasi Tiub-U KSSM'
      },
      flashcards: [
        {
          id: 't5-b1-s1-fc1',
          front: 'Apakah takrifan agen pengoksidaan dari segi pemindahan elektron?',
          back: 'Agen pengoksidaan ialah bahan yang menerima elektron daripada bahan lain dan dirinya sendiri mengalami penurunan.'
        },
        {
          id: 't5-b1-s1-fc2',
          front: 'Apakah fungsi utama asid sulfurik cair di bahagian bawah tiub-U?',
          back: 'Bertindak sebagai jambatan garam untuk melengkapkan litar elektrik dengan membenarkan pengaliran ion serta memisahkan dua larutan yang bertindak balas.'
        },
        {
          id: 't5-b1-s1-fc3',
          front: 'Apakah perubahan warna yang berlaku apabila ion Fe²⁺ dioksidakan menjadi ion Fe³⁺?',
          back: 'Larutan berwarna hijau muda bertukar menjadi perang (atau kuning keperangan).'
        },
        {
          id: 't5-b1-s1-fc4',
          front: 'Nyatakan satu reagen kimia yang boleh digunakan untuk mengesahkan kehadiran ion Fe³⁺ dalam larutan.',
          back: 'Larutan kalium tiosianat, KSCN (membentuk warna merah darah) atau larutan kalium heksasianoferat(II), K₄[Fe(CN)₆] (membentuk mendakan biru tua).'
        },
        {
          id: 't5-b1-s1-fc5',
          front: 'Apakah warna lapisan organik 1,1,1-trikloroetana apabila molekul iodin (I₂) terbebas?',
          back: 'Lapisan organik bertukar menjadi warna ungu.'
        }
      ],
      quiz: [
        {
          id: 't5-b1-s1-q1',
          question: 'Persamaan berikut mewakili satu tindak balas redoks:\nCuO(p) + H₂(g) → Cu(p) + H₂O(c)\nBahan manakah yang bertindak sebagai agen penurunan?',
          options: ['CuO', 'H₂', 'Cu', 'H₂O'],
          answerIndex: 1,
          explanation: 'H₂ menerima oksigen untuk membentuk H₂O (mengalami pengoksidaan). Oleh itu, H₂ bertindak sebagai agen penurunan kepada CuO.',
          level: 'Rendah'
        },
        {
          id: 't5-b1-s1-q2',
          question: 'Dalam radas tiub-U, lengan X mengandungi larutan kalium iodida, KI manakala lengan Y mengandungi larutan kalium dikromat(VI) berasid, K₂Cr₂O₇. Antara berikut, apakah pemerhatian yang betul di lengan Y?',
          options: [
            'Larutan berwarna tanpa warna bertukar menjadi kuning',
            'Larutan berwarna jingga bertukar menjadi hijau',
            'Mendakan putih terbentuk di dasar tiub',
            'Gas tanpa warna mengeruhkan air kapur terbebas'
          ],
          answerIndex: 1,
          explanation: 'Ion dikromat(VI), Cr₂O₇²⁻ (berwarna jingga) menerima elektron dan diturunkan kepada ion kromium(III), Cr³⁺ (berwarna hijau).',
          level: 'Sederhana',
          spmReference: 'SPM 2021 Kertas 1'
        },
        {
          id: 't5-b1-s1-q3',
          question: 'Berapakah nombor pengoksidaan bagi atom mangan dalam ion permanganat, MnO₄⁻?',
          options: ['+2', '+4', '+6', '+7'],
          answerIndex: 3,
          explanation: 'Mn + 4(-2) = -1 → Mn - 8 = -1 → Mn = +7.',
          level: 'Rendah'
        },
        {
          id: 't5-b1-s1-q4',
          question: 'Air bromin, Br₂ ditambah ke dalam tabung uji yang mengandungi larutan ferum(II) sulfat, FeSO₄. Antara berikut, yang manakah pemerhatian dan peranan air bromin yang tepat?',
          options: [
            'Warna perang air bromin dinyahwarnakan; air bromin ialah agen pengoksidaan',
            'Warna larutan kekal hijau; air bromin ialah agen penurunan',
            'Gas berbau sengit terbebas; air bromin mengalami pengoksidaan',
            'Mendakan putih terbentuk; air bromin memendakkan ion sulfat'
          ],
          answerIndex: 0,
          explanation: 'Air bromin menerima elektron (diturunkan kepada Br⁻) dan mengoksidakan Fe²⁺ kepada Fe³⁺. Warna perang air bromin dinyahwarnakan dan ia bertindak sebagai agen pengoksidaan.',
          level: 'Sederhana'
        },
        {
          id: 't5-b1-s1-q5',
          question: 'Gas klorin dialirkan ke dalam larutan kalium bromida, KBr. Persamaan ion ialah:\nCl₂(g) + 2Br⁻(ak) → 2Cl⁻(ak) + Br₂(ak)\nPernyataan manakah yang menerangkan pemindahan elektron dengan betul?',
          options: [
            'Ion Br⁻ menerima elektron dan dioksidakan',
            'Molekul Cl₂ menerima elektron dan bertindak sebagai agen pengoksidaan',
            'Ion Br⁻ mendermakan elektron kepada molekul Cl₂ dan diturunkan',
            'Molekul Cl₂ kehilangan elektron untuk membentuk ion klorida'
          ],
          answerIndex: 1,
          explanation: 'Cl₂ menerima elektron (diturunkan kepada Cl⁻) dan bertindak sebagai agen pengoksidaan. Ion Br⁻ melepaskan elektron (dioksidakan kepada Br₂).',
          level: 'Sederhana'
        },
        {
          id: 't5-b1-s1-q6',
          question: 'Seorang murid menitiskan larutan kalium tiosianat, KSCN ke dalam dua tabung uji P dan Q. Tabung uji P menghasilkan warna merah darah pekat manakala tabung uji Q kekal tanpa perubahan ketara. Apakah kesimpulan murid tersebut mengenai kation dalam tabung uji P?',
          options: [
            'Tabung uji P mengandungi ion Fe²⁺ yang telah diturunkan',
            'Tabung uji P mengandungi ion Fe³⁺ yang mengesahkan tindak balas pengoksidaan telah berlaku',
            'Tabung uji P mengandungi ion Cu²⁺',
            'Tabung uji P mengandungi ion Pb²⁺'
          ],
          answerIndex: 1,
          explanation: 'KSCN membentuk kompleks merah darah pekat [Fe(SCN)]²⁺ khusus dengan kehadiran ion Fe³⁺, membuktikan pengoksidaan Fe²⁺ kepada Fe³⁺ telah berjaya.',
          level: 'Tinggi (KBAT)'
        }
      ]
    },

    // ==========================================
    // SUBTOPIK 1.2
    // ==========================================
    {
      id: 't5-b1-s2',
      code: '1.2',
      title: 'Keupayaan Elektrod Piawai (E°)',
      learningStandard: 'SP 1.2.1, 1.2.2, 1.2.3',
      durationMinutes: 30,
      tldr: [
        'Keupayaan elektrod piawai (E°) diukur berbanding Elektrod Hidrogen Piawai (SHE) yang ditetapkan pada 0.00 V.',
        '3 keadaan piawai: kepekatan ion 1.0 mol dm⁻³, suhu 25 °C (298 K), dan tekanan gas 1 atm (101 kPa).',
        'Semua persamaan setengah ditulis dalam bentuk PENURUNAN (penerimaan elektron).',
        'Nilai E° lebih NEGATIF: mudah melepaskan elektron → agen penurunan lebih kuat (mudah dioksidakan).',
        'Nilai E° lebih POSITIF: mudah menerima elektron → agen pengoksidaan lebih kuat (mudah diturunkan).',
        'Tindak balas redoks adalah SPONTAN jika nilai E°sel = E°katod - E°anod adalah POSITIF (> 0).'
      ],
      concepts: [
        {
          id: 't5-b1-s2-c1',
          title: 'Definisi & Keadaan Piawai Pengukuran E° (SHE)',
          badge: 'Konsep Asas Elektrokimia',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">Elektrod Hidrogen Piawai (SHE)</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  <b>Keupayaan elektrod piawai, E°</b> ialah beza keupayaan yang terhasil apabila sesuatu setengah sel digabungkan dengan <b>Elektrod Hidrogen Piawai (Standard Hydrogen Electrode, SHE)</b> yang ditetapkan nilainya sebagai <b>E° = 0.00 V</b>.
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs mb-3">
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <b class="text-slate-800 block text-[11px] mb-0.5">Kepekatan Ion</b>
                    <span class="text-sky-800 font-bold text-sm">1.0 mol dm⁻³</span>
                  </div>
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <b class="text-slate-800 block text-[11px] mb-0.5">Suhu Piawai</b>
                    <span class="text-sky-800 font-bold text-sm">25 °C (298 K)</span>
                  </div>
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <b class="text-slate-800 block text-[11px] mb-0.5">Tekanan Gas</b>
                    <span class="text-sky-800 font-bold text-sm">1 atm (101 kPa)</span>
                  </div>
                </div>

                <div class="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950">
                  <b>Struktur SHE:</b> Menggunakan <b>elektrod platinum bersalut platinum hitam</b> dicelup dalam asid monoprotik 1.0 M (contoh: HCl 1.0 M) dengan gas hidrogen tulen dialirkan pada tekanan 1 atm.
                  Persamaan setengah: <span class="font-mono text-blue-900 font-bold">2H⁺(ak) + 2e⁻ ⇌ H₂(g)  (E° = 0.00 V)</span>.
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b1-s2-c2',
          title: 'Prinsip Nilai E° & Kekuatan Agen Redoks',
          badge: 'Siri Elektrokimia Moden SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">Tafsiran Nilai E° Rasmi DSKP</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Dalam jadual keupayaan elektrod piawai, semua persamaan ditulis secara <b>penurunan (menerima elektron)</b>:
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <b class="text-emerald-900 block mb-1">Nilai E° Lebih NEGATIF:</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      <li>Kecenderungan untuk <b>melepaskan elektron lebih tinggi</b>.</li>
                      <li>Merupakan <b>agen penurunan yang lebih kuat</b>.</li>
                      <li>Lebih mudah mengalami <b>pengoksidaan</b>.</li>
                      <li>Contoh: <span class="font-mono font-bold text-emerald-800">Mg²⁺ + 2e⁻ ⇌ Mg (E° = -2.38 V)</span>. Atom Mg sangat mudah melepaskan elektron.</li>
                    </ul>
                  </div>

                  <div class="p-3 rounded-xl bg-rose-50 border border-rose-200">
                    <b class="text-rose-900 block mb-1">Nilai E° Lebih POSITIF:</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      <li>Kecenderungan untuk <b>menerima elektron lebih tinggi</b>.</li>
                      <li>Merupakan <b>agen pengoksidaan yang lebih kuat</b>.</li>
                      <li>Lebih mudah mengalami <b>penurunan</b>.</li>
                      <li>Contoh: <span class="font-mono font-bold text-rose-800">F₂ + 2e⁻ ⇌ 2F⁻ (E° = +2.87 V)</span>. Molekul F₂ ialah agen pengoksidaan paling kuat.</li>
                    </ul>
                  </div>
                </div>

                <div class="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-950">
                  <b class="text-purple-900 block font-bold mb-1">Meramalkan Kespontanan Tindak Balas:</b>
                  <p class="leading-relaxed text-[11px]">
                    Voltan sel dikira menggunakan rumus: <span class="font-mono font-bold text-purple-900">E°sel = E°(katod) - E°(anod)</span><br/>
                    • Jika <b>E°sel &gt; 0 (Positif)</b>: Tindak balas adalah <b>spontan</b> dan boleh berlaku secara semula jadi.<br/>
                    • Jika <b>E°sel ≤ 0 (Negatif)</b>: Tindak balas adalah <b>tidak spontan</b> dan tidak boleh berlaku tanpa bekalan tenaga luar.
                  </p>
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Mengubah tanda nilai E° apabila mendarab pekali stoikiometri persamaan setengah.',
          correction: 'Nilai E° TIDAK BERUBAH walaupun pekali digandakan! E° ialah sifat intensif larutan.',
          why: 'Contoh: Cu²⁺ + 2e⁻ ⇌ Cu (E° = +0.34 V). Jika didarab 2: 2Cu²⁺ + 4e⁻ ⇌ 2Cu, nilainya KEKAL +0.34 V!'
        },
        {
          mistake: 'Terbalik memilih katod dan anod semasa mengira E°sel.',
          correction: 'Spesies dengan nilai E° lebih positif sentiasa bertindak sebagai KATOD (menerima elektron), manakala yang lebih negatif sebagai ANOD (melepaskan elektron).',
          why: 'E°sel mesti bernilai positif untuk sel kimia berfungsi secara spontan.'
        }
      ],
      simulationRef: {
        id: 'penyesaran-halogen',
        title: 'Makmal Maya Penyesaran Halogen daripada Larutan Halida',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=penyesaran-halogen',
        description: 'Uji tindak balas penyesaran antara klorin, bromin, dan iodin dengan larutan halida serta perhatikan warna lapisan organik 1,1,1-trikloroetana.',
        previewBadge: 'Simulasi Penyesaran KSSM'
      },
      flashcards: [
        {
          id: 't5-b1-s2-fc1',
          front: 'Apakah nilai keupayaan elektrod bagi Elektrod Hidrogen Piawai (SHE)?',
          back: '0.00 V (Volt) pada semua keadaan piawai.'
        },
        {
          id: 't5-b1-s2-fc2',
          front: 'Nyatakan 3 syarat keadaan piawai dalam pengukuran nilai E°.',
          back: 'Suhu 25 °C (298 K), tekanan gas 1 atm (101 kPa), dan kepekatan larutan ion 1.0 mol dm⁻³.'
        },
        {
          id: 't5-b1-s2-fc3',
          front: 'Jika suatu spesies mempunyai nilai E° yang sangat negatif, apakah ciri sifat redoksnya?',
          back: 'Ia merupakan agen penurunan yang sangat kuat (sangat mudah melepaskan elektron / mudah dioksidakan).'
        },
        {
          id: 't5-b1-s2-fc4',
          front: 'Apakah agen pengoksidaan paling kuat dalam jadual nilai E° siri elektrokimia KSSM?',
          back: 'Gas fluorin, F₂ (E° = +2.87 V) kerana nilai E° nya paling positif.'
        },
        {
          id: 't5-b1-s2-fc5',
          front: 'Bagaimanakah nilai E°sel digunakan untuk menentukan kespontanan sesuatu tindak balas?',
          back: 'Jika nilai E°sel (E°katod - E°anod) bernilai positif (> 0), tindak balas adalah spontan. Jika negatif (< 0), tindak balas tidak spontan.'
        }
      ],
      quiz: [
        {
          id: 't5-b1-s2-q1',
          question: 'Diberi nilai keupayaan elektrod piawai berikut:\nZn²⁺ + 2e⁻ ⇌ Zn   E° = -0.76 V\nCu²⁺ + 2e⁻ ⇌ Cu   E° = +0.34 V\nPernyataan manakah yang BENAR?',
          options: [
            'Zn²⁺ adalah agen pengoksidaan yang lebih kuat berbanding Cu²⁺',
            'Zink lebih mudah menerima elektron berbanding kuprum',
            'Zink adalah agen penurunan yang lebih kuat berbanding kuprum',
            'Ion Cu²⁺ lebih sukar diturunkan berbanding ion Zn²⁺'
          ],
          answerIndex: 2,
          explanation: 'Nilai E° zink lebih negatif (-0.76 V) berbanding kuprum (+0.34 V), maka atom Zn lebih mudah melepaskan elektron dan merupakan agen penurunan yang lebih kuat.',
          level: 'Sederhana'
        },
        {
          id: 't5-b1-s2-q2',
          question: 'Antara berikut, yang manakah BUKAN keadaan piawai bagi penentuan keupayaan elektrod piawai (E°)?',
          options: [
            'Suhu 25 °C',
            'Tekanan gas 1 atm',
            'Kepekatan ion 1.0 mol dm⁻³',
            'Isi padu larutan elektrolit mestilah tepat 100 cm³'
          ],
          answerIndex: 3,
          explanation: 'Isi padu larutan tidak terhad kepada 100 cm³. Keadaan piawai hanya menetapkan kepekatan (1.0 M), suhu (25 °C), dan tekanan gas (1 atm).',
          level: 'Rendah'
        },
        {
          id: 't5-b1-s2-q3',
          question: 'Diberi:\nMg²⁺ + 2e⁻ ⇌ Mg   E° = -2.38 V\nFe²⁺ + 2e⁻ ⇌ Fe   E° = -0.44 V\nAdakah tindak balas Mg(p) + Fe²⁺(ak) → Mg²⁺(ak) + Fe(p) berlaku secara spontan?',
          options: [
            'Ya, kerana E°sel = +1.94 V (positif)',
            'Tidak, kerana E°sel = -1.94 V (negatif)',
            'Tidak, kerana kedua-dua nilai E° adalah negatif',
            'Ya, kerana atom Mg tidak mengion'
          ],
          answerIndex: 0,
          explanation: 'E°sel = E°katod(Fe²⁺) - E°anod(Mg) = -0.44 - (-2.38) = +1.94 V. Nilai E°sel positif (> 0) membuktikan tindak balas berlaku secara spontan.',
          level: 'Sederhana'
        },
        {
          id: 't5-b1-s2-q4',
          question: 'Spesies manakah yang merupakan agen pengoksidaan paling kuat berdasarkan nilai E° berikut?\nAg⁺ + e⁻ ⇌ Ag   E° = +0.80 V\nCl₂ + 2e⁻ ⇌ 2Cl⁻   E° = +1.36 V\nNa⁺ + e⁻ ⇌ Na   E° = -2.71 V\nBr₂ + 2e⁻ ⇌ 2Br⁻   E° = +1.07 V',
          options: ['Ag⁺', 'Cl₂', 'Na⁺', 'Br₂'],
          answerIndex: 1,
          explanation: 'Nilai E° paling positif menunjukkan keupayaan paling tinggi untuk menerima elektron (agen pengoksidaan terkuat). Cl₂ mempunyai nilai E° = +1.36 V, paling tinggi antara yang disenaraikan.',
          level: 'Rendah'
        },
        {
          id: 't5-b1-s2-q5',
          question: 'Bolehkah larutan kuprum(II) sulfat disimpan dalam bekas yang diperbuat daripada logam ferum? [Diberi: Fe²⁺/Fe = -0.44 V, Cu²⁺/Cu = +0.34 V]',
          options: [
            'Boleh, kerana ferum tidak bertindak balas dengan kuprum',
            'Tidak boleh, kerana ferum menyesarkan ion kuprum(II) dan melarut menyebabkan bekas berlubang',
            'Boleh, kerana kedua-dua logam ialah konduktor elektrik',
            'Boleh, kerana ion sulfat menghalang pengaratan'
          ],
          answerIndex: 1,
          explanation: 'Nilai E° Fe (-0.44 V) lebih negatif daripada Cu (+0.34 V). E°sel = +0.34 - (-0.44) = +0.78 V (spontan). Besi akan teroksida dan melarut mengikis bekas tersebut: Fe + Cu²⁺ → Fe²⁺ + Cu.',
          level: 'Tinggi (KBAT)'
        },
        {
          id: 't5-b1-s2-q6',
          question: 'Diberi persamaan berikut:\nBr₂ + 2e⁻ ⇌ 2Br⁻  (E° = +1.07 V)\nI₂ + 2e⁻ ⇌ 2I⁻  (E° = +0.54 V)\nApakah yang berlaku apabila air bromin ditambah ke dalam larutan kalium iodida, KI?',
          options: [
            'Tiada tindak balas berlaku kerana iodin lebih reaktif',
            'Bromin menyesarkan iodin menghasilkan larutan berwarna perang yang bertukar ungu dalam pelarut organik',
            'Gas bromin terbebas dengan serta merta',
            'Mendakan putih kalium bromida terbentuk'
          ],
          answerIndex: 1,
          explanation: 'E° Br₂ (+1.07 V) lebih positif daripada I₂ (+0.54 V), jadi Br₂ bertindak sebagai agen pengoksidaan yang lebih kuat dan menyesarkan ion I⁻ kepada I₂: Br₂ + 2I⁻ → 2Br⁻ + I₂. Iodin memberikan warna ungu dalam pelarut organik.',
          level: 'Tinggi (KBAT)'
        }
      ]
    },

    // ==========================================
    // SUBTOPIK 1.3
    // ==========================================
    {
      id: 't5-b1-s3',
      code: '1.3',
      title: 'Sel Kimia (Sel Volt) & Notasi Sel',
      learningStandard: 'SP 1.3.1, 1.3.2, 1.3.3',
      durationMinutes: 35,
      tldr: [
        'Sel kimia menukarkan tenaga kimia kepada tenaga elektrik melalui tindak balas redoks spontan.',
        'Terminal Negatif (Anod): Elektrod dengan nilai E° lebih negatif, mengalami pengoksidaan (pelepasan elektron) dan melarut/menipis.',
        'Terminal Positif (Katod): Elektrod dengan nilai E° lebih positif, mengalami penurunan (penerimaan elektron) dan enapan terbentuk/menebal.',
        'Elektron mengalir dari Anod ke Katod melalui wayar penyambung litar luar.',
        'Jambatan garam atau pasu berliang melengkapkan litar dan membenarkan migrasi ion untuk meneutralkan cas larutan.',
        'Format Notasi Sel Piawai: Anod(p) | Ion Anod(ak) || Ion Katod(ak) | Katod(p).'
      ],
      concepts: [
        {
          id: 't5-b1-s3-c1',
          title: 'Struktur Sel Daniell & Fungsi Jambatan Garam',
          badge: 'Sel Kimia Piawai SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">Sel Daniell (Zn - Cu)</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Sel Daniell terdiri daripada kepingan zink dicelup dalam larutan ZnSO₄ 1.0 M dan kepingan kuprum dicelup dalam larutan CuSO₄ 1.0 M, dipisahkan oleh pasu berliang atau jambatan garam:
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-rose-900 block mb-1">Terminal Negatif (Anod - Zink):</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      <li>Nilai E° = -0.76 V (lebih negatif).</li>
                      <li>Zink melepaskan elektron dan melarut (Pengoksidaan).</li>
                      <li>Persamaan setengah: <span class="font-mono text-rose-800 font-bold">Zn(p) → Zn²⁺(ak) + 2e⁻</span>.</li>
                      <li>Pemerhatian: Kepingan zink menjadi semakin nipis.</li>
                    </ul>
                  </div>

                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-sky-900 block mb-1">Terminal Positif (Katod - Kuprum):</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      <li>Nilai E° = +0.34 V (lebih positif).</li>
                      <li>Ion Cu²⁺ menerima elektron dan mendak sebagai logam Cu (Penurunan).</li>
                      <li>Persamaan setengah: <span class="font-mono text-sky-800 font-bold">Cu²⁺(ak) + 2e⁻ → Cu(p)</span>.</li>
                      <li>Pemerhatian: Enapan perang terenap pada elektrod kuprum & warna biru larutan CuSO₄ memudar.</li>
                    </ul>
                  </div>
                </div>

                <div class="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                  <b class="text-amber-900 block font-bold mb-1">Dua Fungsi Utama Jambatan Garam / Pasu Berliang:</b>
                  <ol class="list-decimal pl-5 space-y-1 text-[11px] text-amber-900">
                    <li><b>Melengkapkan litar elektrik</b> tanpa membenarkan percampuran pantas kedua-dua larutan.</li>
                    <li><b>Membenarkan pengaliran ion</b> untuk mengimbangi pengumpulan cas berlebihan di kedua-dua bahagian larutan.</li>
                  </ol>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b1-s3-c2',
          title: 'Notasi Sel Piawai KSSM (Cell Notation)',
          badge: 'Format Wajib SPM Kertas 2',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">Konvensyen Penulisan Notasi Sel</span>
                <div class="p-3 rounded-xl bg-slate-900 text-white font-mono text-center text-xs mb-3 shadow-inner">
                  <span class="text-rose-400 font-bold">Elektrod Anod (p)</span> | 
                  <span class="text-rose-200">Ion Anod (ak)</span> || 
                  <span class="text-sky-200">Ion Katod (ak)</span> | 
                  <span class="text-sky-400 font-bold">Elektrod Katod (p)</span>
                </div>

                <ul class="list-disc pl-5 space-y-1 text-xs text-slate-700 mb-3">
                  <li>Garis tegak tunggal (<span class="font-bold">|</span>) mewakili <b>sempadan fasa</b> (contoh: pepejal elektrod bersempadan dengan larutan akueus).</li>
                  <li>Garis tegak berkembar (<span class="font-bold">||</span>) mewakili <b>jambatan garam</b> atau dinding pasu berliang.</li>
                  <li>Susunan WAJIB bermula dengan <b>ANOD di sebelah kiri</b> dan <b>KATOD di sebelah kanan</b> (mengikut arah pengaliran elektron dari kiri ke kanan).</li>
                </ul>

                <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                  <b>Contoh Sel Daniell Lengkap:</b><br/>
                  <span class="font-mono font-bold text-emerald-900">Zn(p) | Zn²⁺(ak, 1.0 M) || Cu²⁺(ak, 1.0 M) | Cu(p)</span><br/>
                  <span class="text-[11px] text-emerald-800 mt-1 block">Voltan Sel Piawai: E°sel = E°katod - E°anod = +0.34 V - (-0.76 V) = <b>+1.10 V</b>.</span>
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menulis susunan notasi sel terbalik dengan meletakkan katod di sebelah kiri.',
          correction: 'Konvensyen IUPAC mewajibkan ANOD di sebelah kiri dan KATOD di sebelah kanan (Anod | Ion Anod || Ion Katod | Katod)!',
          why: 'Ini adalah peraturan antarabangsa yang digunapakai dalam skema Lembaga Peperiksaan Malaysia.'
        },
        {
          mistake: 'Menyatakan elektron mengalir daripada elektrod kuprum ke elektrod zink.',
          correction: 'Elektron mengalir dari elektrod dengan nilai E° lebih negatif (Zink/Anod) ke elektrod dengan nilai E° lebih positif (Kuprum/Katod).',
          why: 'Zink melepaskan elektron manakala ion kuprum(II) di katod menerima elektron.'
        }
      ],
      simulationRef: {
        id: 'sel-kimia-voltan',
        title: 'Makmal Maya Sel Kimia & Sel Daniell',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=sel-kimia-voltan',
        description: 'Tukar ganti pelbagai pasangan elektrod logam dan perhatikan nilai voltan sel E°sel masa nyata serta arah aliran elektron.',
        previewBadge: 'Simulasi Sel Kimia KSSM'
      },
      flashcards: [
        {
          id: 't5-b1-s3-fc1',
          front: 'Apakah perubahan bentuk tenaga yang berlaku dalam suatu sel kimia (sel volt)?',
          back: 'Tenaga kimia bertukar kepada tenaga elektrik melalui tindak balas redoks spontan.'
        },
        {
          id: 't5-b1-s3-fc2',
          front: 'Bagaimanakah kita menentukan elektrod yang bertindak sebagai terminal negatif dalam sel kimia?',
          back: 'Elektrod logam yang mempunyai nilai E° lebih negatif bertindak sebagai terminal negatif (anod).'
        },
        {
          id: 't5-b1-s3-fc3',
          front: 'Berapakah nilai voltan piawai (E°sel) bagi Sel Daniell (pasangan elektrod zink dan kuprum)?',
          back: 'E°sel = +0.34 V - (-0.76 V) = +1.10 V.'
        },
        {
          id: 't5-b1-s3-fc4',
          front: 'Apakah yang menyebabkan keamatan warna biru larutan CuSO₄ memudar semasa sel berfungsi?',
          back: 'Kepekatan ion Cu²⁺ berkurang kerana ion Cu²⁺ menerima elektron di katod dan dienapkan sebagai atom kuprum pepejal.'
        },
        {
          id: 't5-b1-s3-fc5',
          front: 'Tuliskan notasi sel piawai bagi sel kimia yang menggunakan elektrod magnesium dan elektrod argentum.',
          back: 'Mg(p) | Mg²⁺(ak, 1.0 M) || Ag⁺(ak, 1.0 M) | Ag(p)'
        }
      ],
      quiz: [
        {
          id: 't5-b1-s3-q1',
          question: 'Satu sel kimia dibina menggunakan elektrod magnesium dan elektrod kuprum yang dicelup ke dalam larutan garam masing-masing. Antara berikut, yang manakah BENAR mengenai terminal negatif sel tersebut?\n[E°: Mg²⁺/Mg = -2.38 V, Cu²⁺/Cu = +0.34 V]',
          options: [
            'Elektrod kuprum ialah terminal negatif',
            'Magnesium mengalami pengoksidaan dan menipis',
            'Elektron mengalir dari elektrod kuprum ke elektrod magnesium',
            'Ion magnesium menerima elektron di terminal negatif'
          ],
          answerIndex: 1,
          explanation: 'Mg mempunyai nilai E° lebih negatif (-2.38 V), bertindak sebagai terminal negatif (anod), melepaskan elektron (mengalami pengoksidaan) dan menipis.',
          level: 'Rendah'
        },
        {
          id: 't5-b1-s3-q2',
          question: 'Hitung voltan sel piawai, E°sel bagi sel kimia yang diwakili oleh notasi sel berikut:\nZn(p) | Zn²⁺(ak) || Ag⁺(ak) | Ag(p)\n[Diberi: E° Zn²⁺/Zn = -0.76 V, E° Ag⁺/Ag = +0.80 V]',
          options: ['+0.04 V', '+1.56 V', '-1.56 V', '+0.84 V'],
          answerIndex: 1,
          explanation: 'E°sel = E°katod - E°anod = E°(Ag⁺/Ag) - E°(Zn²⁺/Zn) = +0.80 V - (-0.76 V) = +1.56 V.',
          level: 'Sederhana'
        },
        {
          id: 't5-b1-s3-q3',
          question: 'Antara bahan berikut, yang manakah paling sesuai digunakan untuk menyediakan jambatan garam?',
          options: [
            'Jalur kertas turas yang dibasahi larutan kalium nitrat, KNO₃ tepu',
            'Batang kuprum yang telah digosok dengan kertas pasir',
            'Kepingan kaca kering yang bersih',
            'Jalur kertas litmus merah'
          ],
          answerIndex: 0,
          explanation: 'Kertas turas dibasahi larutan elektrolit lengai seperti KNO₃ atau KCl membenarkan pergerakan ion bebas untuk mengimbangi cas dan melengkapkan litar tanpa bertindak balas dengan larutan sel.',
          level: 'Rendah'
        },
        {
          id: 't5-b1-s3-q4',
          question: 'Apakah persamaan ion keseluruhan bagi sel kimia yang diwakili oleh notasi sel:\nAl(p) | Al³⁺(ak) || Cu²⁺(ak) | Cu(p)?',
          options: [
            'Al + Cu²⁺ → Al³⁺ + Cu',
            '2Al + 3Cu²⁺ → 2Al³⁺ + 3Cu',
            '3Al + 2Cu²⁺ → 3Al³⁺ + 2Cu',
            '2Al³⁺ + 3Cu → 2Al + 3Cu²⁺'
          ],
          answerIndex: 1,
          explanation: 'Al melepaskan 3e⁻ (2Al → 2Al³⁺ + 6e⁻) dan Cu²⁺ menerima 2e⁻ (3Cu²⁺ + 6e⁻ → 3Cu). Hasil tambah persamaan ion seimbang ialah 2Al + 3Cu²⁺ → 2Al³⁺ + 3Cu.',
          level: 'Sederhana'
        },
        {
          id: 't5-b1-s3-q5',
          question: 'Dalam suatu sel volt yang dibiarkan berfungsi selama beberapa jam, bacaan voltmeter merosot kepada 0 V. Apakah punca utama perkara ini berlaku?',
          options: [
            'Suhu persekitaran telah menurun mendadak',
            'Tindak balas kimia telah mencapai keseimbangan (reagen pembatas seperti kation di katod habis)',
            'Semua ion di jambatan garam telah musnah sepenuhnya',
            'Elektron terhenti kerana rintangan wayar menjadi sifar'
          ],
          answerIndex: 1,
          explanation: 'Apabila sel mencapai keseimbangan kimia atau bahan pembatas (seperti ion di katod atau elektrod anod) telah habis digunakan, beza keupayaan menjadi sifar dan arus berhenti mengalir.',
          level: 'Tinggi (KBAT)'
        },
        {
          id: 't5-b1-s3-q6',
          question: 'Dua sel kimia dibina: Sel I (pasangan Fe-Cu) dan Sel II (pasangan Mg-Cu). Antara pernyataan berikut, yang manakah BENAR mengenai perbandingan voltan kedua-dua sel tersebut?\n[E°: Mg²⁺/Mg = -2.38 V, Fe²⁺/Fe = -0.44 V, Cu²⁺/Cu = +0.34 V]',
          options: [
            'Sel I menghasilkan voltan lebih tinggi kerana besi lebih stabil berbanding magnesium',
            'Sel II menghasilkan voltan lebih tinggi kerana jurang perbezaan nilai E° antara Mg dan Cu lebih besar',
            'Kedua-dua sel menghasilkan nilai voltan yang sama kerana katodnya sama iaitu kuprum',
            'Sel I tidak menghasilkan arus elektrik kerana kedua-duanya logam peralihan'
          ],
          answerIndex: 1,
          explanation: 'Voltan Sel I = +0.34 - (-0.44) = 0.78 V. Voltan Sel II = +0.34 - (-2.38) = 2.72 V. Semakin jauh jarak antara dua nilai E° dalam siri elektrokimia, semakin besar voltan sel yang dihasilkan.',
          level: 'Tinggi (KBAT)'
        }
      ]
    },

    // ==========================================
    // SUBTOPIK 1.4
    // ==========================================
    {
      id: 't5-b1-s4',
      code: '1.4',
      title: 'Sel Elektrolisis (Leburan & Larutan Akueus)',
      learningStandard: 'SP 1.4.1, 1.4.2, 1.4.3',
      durationMinutes: 35,
      tldr: [
        'Elektrolisis ialah proses penguraian suatu sebatian elektrolit kepada unsur juzuknya oleh arus elektrik.',
        'Anod disambung ke terminal positif bateri (berlaku pengoksidaan), Katod disambung ke terminal negatif bateri (berlaku penurunan) [Mnemonik: PANIC].',
        'Elektrolisis sebatian leburan hanya mengandungi satu jenis kation dan satu jenis anion yang bebas bergerak.',
        'Elektrolisis larutan akueus melibatkan ion daripada elektrolit dan ion H⁺ & OH⁻ daripada pengionan separa air.',
        '3 Faktor Pemilihan Nyahcas Ion di Elektrod: (1) Nilai E°, (2) Kepekatan ion (khusus ion halida), dan (3) Jenis elektrod (elektrod aktif vs lengai).'
      ],
      concepts: [
        {
          id: 't5-b1-s4-c1',
          title: '3 Faktor Pemilihan Nyahcas Ion di Elektrod',
          badge: 'Penentu Nyahcas Elektrolisis',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">3 Faktor Pemilihan Ion Mengikut DSKP KSSM</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Apabila larutan akueus dielektrolisiskan, terdapat lebih daripada satu jenis ion yang tertarik ke anod dan katod. Pemilihan ion yang dinyahcas ditentukan oleh 3 faktor:
                </p>

                <div class="space-y-2.5 text-xs">
                  <!-- FAKTOR 1 -->
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-800 block mb-1">1. Faktor Nilai Keupayaan Elektrod Piawai (E°):</b>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700">
                      <div>
                        <b>Di Katod (Terminal Negatif):</b><br/>
                        Kation dengan nilai <b>E° lebih POSITIF</b> dipilih untuk dinyahcas (menerima elektron / penurunan).<br/>
                        <i>Contoh: Antara Cu²⁺ (+0.34 V) dan H⁺ (0.00 V), ion Cu²⁺ dipilih!</i>
                      </div>
                      <div>
                        <b>Di Anod (Terminal Positif):</b><br/>
                        Anion dengan nilai <b>E° lebih NEGATIF</b> dipilih untuk dinyahcas (melepaskan elektron / pengoksidaan).<br/>
                        <i>Contoh: Antara SO₄²⁻ (+2.01 V) dan OH⁻ (+0.40 V), ion OH⁻ dipilih!</i>
                      </div>
                    </div>
                  </div>

                  <!-- FAKTOR 2 -->
                  <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
                    <b class="text-amber-900 block mb-1">2. Faktor Kepekatan Ion dalam Larutan (Khusus Anod Halida):</b>
                    <p class="text-[11px] leading-relaxed">
                      Jika larutan mengandungi ion halida (Cl⁻, Br⁻, I⁻) pada <b>kepekatan tinggi (contoh: NaCl 1.0 M atau HCl 2.0 M)</b>, <b>ion halida akan dipilih dinyahcas di anod</b> dan bukannya ion OH⁻ walaupun nilai E° ion OH⁻ lebih negatif! Gas klorin, Cl₂ atau wap bromin, Br₂ akan terbebas.<br/>
                      <i>*Nota: Jika larutan sangat cair (contoh: NaCl 0.001 M), ion OH⁻ tetap dinyahcas menghasilkan gas oksigen, O₂!</i>
                    </p>
                  </div>

                  <!-- FAKTOR 3 -->
                  <div class="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-950">
                    <b class="text-purple-900 block mb-1">3. Faktor Jenis Elektrod (Elektrod Aktif vs Lengai):</b>
                    <p class="text-[11px] leading-relaxed">
                      • Jika elektrod <b>lengai (karbon/grafit atau platinum)</b> digunakan: Ion dalam elektrolit yang dinyahcas mengikut faktor E° atau kepekatan.<br/>
                      • Jika elektrod <b>aktif (contoh: logam kuprum atau argentum)</b> digunakan di anod: <b>Atom elektrod anod itu sendiri melarut</b> melepaskan elektron (<span class="font-mono font-bold">Cu → Cu²⁺ + 2e⁻</span>) dan tiada sebarang anion dinyahcas di anod!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b1-s4-c2',
          title: 'Aplikasi Elektrolisis dalam Industri: Penulenan & Penyaduran Logam',
          badge: 'Aplikasi Industri KSSM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">Dua Aplikasi Industri Utama</span>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <!-- PENULENAN -->
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-sky-900 block mb-1">1. Penulenan Kuprum Tak Tulen:</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      <li><b>Anod (+):</b> Kepingan kuprum <b>tak tulen</b> (melarut: <span class="font-mono">Cu → Cu²⁺ + 2e⁻</span>, enapan bendasing terkumpul di dasar).</li>
                      <li><b>Katod (-):</b> Kepingan kuprum <b>tulen nipis</b> (menebal: <span class="font-mono">Cu²⁺ + 2e⁻ → Cu</span>).</li>
                      <li><b>Elektrolit:</b> Larutan akueus garam kuprum (contoh: CuSO₄).</li>
                      <li><b>Warna elektrolit:</b> Keamatan warna biru larutan CuSO₄ kekal tidak berubah kerana kadar pengionan di anod sama dengan kadar nyahcas di katod!</li>
                    </ul>
                  </div>

                  <!-- PENYADURAN -->
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-purple-900 block mb-1">2. Penyaduran Logam (Contoh: Sadur Sudu Besi):</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      <li><b>Anod (+):</b> Logam penyadur tulen (contoh: kepingan argentum, Ag melarut).</li>
                      <li><b>Katod (-):</b> Objek yang hendak disadur (contoh: sudu besi dibersihkan dahulu).</li>
                      <li><b>Elektrolit:</b> Larutan garam logam penyadur (contoh: larutan AgNO₃).</li>
                      <li><b>Syarat Saduran Cantik & Sekata:</b> Arus elektrik kecil digunakan, masa saduran lama, dan elektrolit dikacau perlahan.</li>
                    </ul>
                  </div>
                </div>

                <div class="overflow-x-auto">
                  <table class="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr class="bg-slate-100 text-slate-700 border-b border-slate-200">
                        <th class="p-2 font-bold">Ciri Perbandingan</th>
                        <th class="p-2 font-bold text-sky-800">Sel Elektrolisis</th>
                        <th class="p-2 font-bold text-emerald-800">Sel Kimia (Sel Volt)</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 text-slate-700 text-[11px]">
                      <tr>
                        <td class="p-2 font-medium">Perubahan Tenaga</td>
                        <td class="p-2 text-sky-800">Tenaga elektrik → Tenaga kimia</td>
                        <td class="p-2 text-emerald-800">Tenaga kimia → Tenaga elektrik</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-medium">Keperluan Bateri</td>
                        <td class="p-2 text-sky-800">Memerlukan bateri / sumber voltan</td>
                        <td class="p-2 text-emerald-800">Tidak perlu bateri (menghasilkan voltan)</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-medium">Kekutuban Anod</td>
                        <td class="p-2 text-sky-800 font-bold">Terminal Positif (+)</td>
                        <td class="p-2 text-emerald-800 font-bold">Terminal Negatif (-)</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-medium">Kekutuban Katod</td>
                        <td class="p-2 text-sky-800 font-bold">Terminal Negatif (-)</td>
                        <td class="p-2 text-emerald-800 font-bold">Terminal Positif (+)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menganggap gas klorin sentiasa terbebas di anod apabila mengelektrolisis larutan NaCl.',
          correction: 'Hanya jika larutan NaCl adalah PEKAT (≥ 1.0 mol dm⁻³), ion Cl⁻ dinyahcas menghasilkan gas klorin. Jika NaCl CAIR, ion OH⁻ dinyahcas menghasilkan gas oksigen!',
          why: 'Faktor kepekatan mengatasi faktor nilai E° hanya untuk larutan pekat ion halida.'
        },
        {
          mistake: 'Salah meletakkan objek yang hendak disadur pada terminal positif (anod).',
          correction: 'Objek yang hendak disadur MESTI disambung ke KATOD (terminal negatif bateri) supaya kation logam penyadur tertarik dan terenap di atas permukaannya!',
          why: 'Jika diletakkan di anod, objek tersebut akan melarut dan terkikis.'
        }
      ],
      simulationRef: {
        id: 'elektrolisis',
        title: 'Makmal Multi-Aras Elektrolisis Johnstone',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=elektrolisis',
        description: 'Kaji elektrolisis leburan & larutan akueus, elektrod lengai vs aktif, dan zum submikroskopik ion untuk melihat pergerakan ion secara nyata.',
        previewBadge: 'Simulasi Elektrolisis KSSM'
      },
      flashcards: [
        {
          id: 't5-b1-s4-fc1',
          front: 'Apakah mnemonik kekutuban elektrod dalam sel elektrolisis?',
          back: 'PANIC: Positive is Anode, Negative Is Cathode.'
        },
        {
          id: 't5-b1-s4-fc2',
          front: 'Apakah hasil tindak balas di anod semasa elektrolisis larutan natrium sulfat, Na₂SO₄ cair menggunakan elektrod karbon?',
          back: 'Gas oksigen, O₂ (hasil daripada nyahcas ion OH⁻ kerana nilai E° nya lebih negatif daripada ion SO₄²⁻).'
        },
        {
          id: 't5-b1-s4-fc3',
          front: 'Tuliskan persamaan setengah bagi nyahcas ion hidroksida, OH⁻ di anod.',
          back: '4OH⁻(ak) → O₂(g) + 2H₂O(c) + 4e⁻'
        },
        {
          id: 't5-b1-s4-fc4',
          front: 'Apakah pemerhatian di anod jika larutan CuSO₄ dielektrolisis menggunakan elektrod kuprum aktif?',
          back: 'Anod kuprum melarut dan menipis (Cu → Cu²⁺ + 2e⁻) dan tiada gas terbebas.'
        },
        {
          id: 't5-b1-s4-fc5',
          front: 'Semasa penyaduran sudu besi dengan perak, sudu besi mesti disambungkan pada terminal mana?',
          back: 'Katod (terminal negatif bateri), manakala kepingan perak tulen disambung ke anod (terminal positif).'
        }
      ],
      quiz: [
        {
          id: 't5-b1-s4-q1',
          question: 'Antara sebatian berikut, yang manakah boleh bertindak sebagai elektrolit dalam keadaan leburan?',
          options: ['Glukosa, C₆H₁₂O₆', 'Plumbum(II) bromida, PbBr₂', 'Naftalena, C₁₀H₈', 'Etanol, C₂H₅OH'],
          answerIndex: 1,
          explanation: 'PbBr₂ ialah sebatian ion yang mempunyai ion Pb²⁺ dan Br⁻ bebas bergerak apabila dileburkan, menjadikannya konduktor elektrolit.',
          level: 'Rendah'
        },
        {
          id: 't5-b1-s4-q2',
          question: 'Larutan asid hidroklorik pekat 2.0 mol dm⁻³ dielektrolisiskan menggunakan elektrod karbon. Apakah gas yang terbebas di anod?',
          options: ['Gas oksigen', 'Gas hidrogen', 'Gas klorin', 'Gas karbon monoksida'],
          answerIndex: 2,
          explanation: 'Kerana kepekatan ion klorida sangat tinggi (2.0 M), faktor kepekatan mengatasi nilai E°, menyebabkan ion Cl⁻ dipilih untuk dinyahcas di anod menghasilkan gas klorin, Cl₂.',
          level: 'Sederhana',
          spmReference: 'SPM 2022 Kertas 1'
        },
        {
          id: 't5-b1-s4-q3',
          question: 'Dalam penulenan logam kuprum tak tulen melalui elektrolisis, bahan manakah yang mesti disambungkan sebagai anod?',
          options: ['Kepingan kuprum tulen', 'Kepingan kuprum tak tulen', 'Elektrod platinum lengai', 'Rod grafit karbon'],
          answerIndex: 1,
          explanation: 'Kuprum tak tulen disambung di anod supaya atom kuprum melarut menjadi ion Cu²⁺ (Cu → Cu²⁺ + 2e⁻) dan terenap semula sebagai kuprum tulen di katod.',
          level: 'Rendah'
        },
        {
          id: 't5-b1-s4-q4',
          question: 'Semasa elektrolisis larutan CuSO₄ dengan elektrod kuprum, keamatan warna biru larutan tidak berubah sepanjang proses. Mengapa?',
          options: [
            'Ion sulfat tidak bergerak ke elektrod',
            'Kadar ion Cu²⁺ terbentuk di anod adalah sama tepat dengan kadar ion Cu²⁺ dinyahcas di katod',
            'Kuprum bertindak sebagai mangkin dalam elektrolit',
            'Warna biru berpunca daripada molekul air'
          ],
          answerIndex: 1,
          explanation: 'Anod kuprum melarut menghasilkan ion Cu²⁺ pada kadar yang sama persis dengan enapan ion Cu²⁺ di katod, mengekalkan kepekatan ion Cu²⁺ dalam larutan secara berterusan.',
          level: 'Sederhana'
        },
        {
          id: 't5-b1-s4-q5',
          question: 'Seorang murid ingin menyadur cincin besi dengan emas. Susunan radas yang betul ialah:',
          options: [
            'Anod: Cincin besi, Katod: Kepingan emas, Elektrolit: Larutan FeSO₄',
            'Anod: Kepingan emas, Katod: Cincin besi, Elektrolit: Larutan mengandungi ion emas',
            'Anod: Kepingan emas, Katod: Cincin besi, Elektrolit: Larutan FeSO₄',
            'Anod: Cincin besi, Katod: Kepingan emas, Elektrolit: Larutan mengandungi ion emas'
          ],
          answerIndex: 1,
          explanation: 'Bahan yang hendak disadur (cincin besi) mesti di katod (terminal negatif). Logam penyadur (emas) di anod (terminal positif), dan elektrolit mesti mengandungi ion logam penyadur (ion emas).',
          level: 'Sederhana'
        },
        {
          id: 't5-b1-s4-q6',
          question: 'Larutan natrium klorida sangat cair 0.001 mol dm⁻³ dielektrolisis menggunakan elektrod karbon. Ujian gas manakah yang akan memberi keputusan positif pada tabung uji di anod?',
          options: [
            'Menyahwarnakan kertas litmus merah lembap',
            'Menyalakan kayu uji berbara',
            'Menghasilkan bunyi "pop" dengan kayu uji menyala',
            'Mengeruhkan air kapur'
          ],
          answerIndex: 1,
          explanation: 'Kerana larutan NaCl sangat cair, faktor nilai E° beroperasi: ion OH⁻ dinyahcas di anod (bukan Cl⁻) menghasilkan gas oksigen, O₂ (4OH⁻ → O₂ + 2H₂O + 4e⁻). Gas oksigen menyalakan kayu uji berbara.',
          level: 'Tinggi (KBAT)'
        }
      ]
    },

    // ==========================================
    // SUBTOPIK 1.5 (Pengekstrakan Logam)
    // ==========================================
    {
      id: 't5-b1-s5',
      code: '1.5',
      title: 'Pengekstrakan Logam daripada Bijihnya',
      learningStandard: 'SP 1.5.1, 1.5.2, 1.5.3',
      durationMinutes: 40,
      tldr: [
        'Pengekstrakan logam ialah proses memperoleh logam tulen daripada bijih mineral semulajadi melalui tindak balas redoks.',
        'Siri Kereaktifan Logam (SKL) menentukan kaedah pengekstrakan berasaskan kedudukan Karbon dan Hidrogen.',
        'Logam lebih reaktif daripada Karbon (K, Na, Ca, Mg, Al) diekstrak melalui ELEKTROLISIS leburan bijihnya (contoh: Bauksit / Alumina).',
        'Logam kurang reaktif daripada Karbon (Zn, Fe, Sn, Pb) diekstrak melalui PENURUNAN OLEH KARBON (kok) atau karbon monoksida dalam RELAU BAGAS.',
        'Logam tidak reaktif (Ag, Au) wujud sebagai unsur bebas dalam kerak bumi.',
        'Isu alam sekitar merangkumi hakisan tanah, pelepasan gas CO₂ dan SO₂, serta sisa lumpur merah bauksit.'
      ],
      concepts: [
        {
          id: 't5-b1-s5-c1',
          title: 'Siri Kereaktifan Logam (SKL) & Kaedah Pengekstrakan',
          badge: 'Penentu Kaedah Metalurgi',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">Kedudukan Karbon &amp; Hidrogen dalam SKL</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Siri Kereaktifan Logam menyusun kereaktifan logam terhadap oksigen. Kedudukan <b>Karbon (C)</b> dan <b>Hidrogen (H)</b> diselitkan untuk menentukan kaedah pengekstrakan:
                </p>

                <div class="p-3 rounded-xl bg-slate-900 text-white font-mono text-center text-xs mb-3 shadow-inner">
                  <span class="text-emerald-400 font-bold">K, Na, Ca, Mg, Al</span> 
                  <span class="text-amber-400 font-black px-1.5 py-0.5 rounded bg-amber-950/80 mx-1 border border-amber-500/50">[ C ]</span> 
                  <span class="text-sky-300 font-bold">Zn</span> 
                  <span class="text-amber-400 font-black px-1.5 py-0.5 rounded bg-amber-950/80 mx-1 border border-amber-500/50">[ H ]</span> 
                  <span class="text-sky-300 font-bold">Fe, Sn, Pb</span> | 
                  <span class="text-purple-300">Cu, Hg</span> | 
                  <span class="text-slate-400">Ag, Au</span>
                </div>

                <div class="overflow-x-auto">
                  <table class="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr class="bg-slate-100 text-slate-700 border-b border-slate-200">
                        <th class="p-2 font-bold">Kategori Kereaktifan Logam</th>
                        <th class="p-2 font-bold">Logam Terlibat</th>
                        <th class="p-2 font-bold text-sky-800">Kaedah Pengekstrakan</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 text-slate-700 text-[11px]">
                      <tr>
                        <td class="p-2 font-semibold text-emerald-800">Lebih reaktif daripada Karbon</td>
                        <td class="p-2">K, Na, Ca, Mg, Al</td>
                        <td class="p-2 text-emerald-900 font-bold">Elektrolisis leburan sebatiannya (tenaga elektrik tinggi)</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-semibold text-amber-800">Kurang reaktif daripada Karbon</td>
                        <td class="p-2">Zn, Fe, Sn, Pb</td>
                        <td class="p-2 text-amber-900 font-bold">Penurunan oleh Karbon (kok) atau Karbon Monoksida (CO) dalam relau bagas</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-semibold text-blue-800">Kurang reaktif daripada Hidrogen</td>
                        <td class="p-2">Cu, Pb</td>
                        <td class="p-2 text-blue-900">Penurunan oleh gas hidrogen atau pemanasan terus dalam udara</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-semibold text-slate-600">Sangat tidak reaktif</td>
                        <td class="p-2">Ag, Au</td>
                        <td class="p-2 text-slate-700">Wujud sebagai logam asli bebas dalam kerak bumi (hanya perlu penapisan fizikal)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b1-s5-c2',
          title: 'Pengekstrakan Besi dalam Relau Bagas (Blast Furnace)',
          badge: 'Industri Besi SPM Popular',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">Tindak Balas Kimia Mengikut Zon Relau Bagas</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Bahan mentah yang dimasukkan dari atas relau: <b>Bijih hematit (Fe₂O₃)</b>, <b>kok (karbon, C)</b>, dan <b>batu kapur (CaCO₃)</b>. Udara panas ditiup dari bahagian bawah.
                </p>

                <div class="space-y-2.5 text-xs">
                  <!-- ZON 1 -->
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-rose-900 block font-bold mb-0.5">Zon 1: Pembakaran Kok (Penjanaan Haba Eksotermik)</b>
                    <p class="text-[11px] text-slate-700">
                      Kok terbakar dalam oksigen udara panas menghasilkan gas karbon dioksida dan membebaskan haba yang banyak sehingga suhu mencecah 1600 °C:<br/>
                      <span class="font-mono font-bold text-rose-800">C(p) + O₂(g) → CO₂(g)   (ΔH negatif)</span>
                    </p>
                  </div>

                  <!-- ZON 2 -->
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-amber-900 block font-bold mb-0.5">Zon 2: Pembentukan Agen Penurunan Utama (CO)</b>
                    <p class="text-[11px] text-slate-700">
                      Gas CO₂ naik ke atas dan bertindak balas dengan kok yang belum terbakar membentuk gas <b>karbon monoksida (CO)</b> yang bertindak sebagai agen penurunan yang sangat kuat:<br/>
                      <span class="font-mono font-bold text-amber-800">CO₂(g) + C(p) → 2CO(g)</span>
                    </p>
                  </div>

                  <!-- ZON 3 -->
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-emerald-900 block font-bold mb-0.5">Zon 3: Penurunan Bijih Besi kepada Besi Lebur</b>
                    <p class="text-[11px] text-slate-700">
                      Gas karbon monoksida dan kok menurunkan hematit kepada leburan ferum yang mengalir ke dasar relau:<br/>
                      <span class="font-mono font-bold text-emerald-800">Fe₂O₃(p) + 3CO(g) → 2Fe(c) + 3CO₂(g)</span><br/>
                      <span class="font-mono text-emerald-700">Fe₂O₃(p) + 3C(p) → 2Fe(c) + 3CO(g)</span>
                    </p>
                  </div>

                  <!-- PENYINGKIRAN BENDASING -->
                  <div class="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-950">
                    <b class="text-purple-900 block font-bold mb-1">Penyingkiran Bendasing Silika (Pasir, SiO₂) oleh Batu Kapur (CaCO₃):</b>
                    <p class="text-[11px] leading-relaxed">
                      1. Batu kapur terurai oleh haba tinggi membentuk kalsium oksida (bes):<br/>
                      <span class="font-mono font-bold text-purple-900">CaCO₃(p) → CaO(p) + CO₂(g)</span><br/>
                      2. Kalsium oksida (bes) bertindak balas dengan silika (oksida asid) membentuk <b>sangga (kalsium silikat, CaSiO₃)</b>:<br/>
                      <span class="font-mono font-bold text-purple-900">CaO(p) + SiO₂(p) → CaSiO₃(c)  (Sangga / Slag)</span><br/>
                      <b>💡 Kepentingan Sangga:</b> Sangga <b>kurang tumpat</b> daripada leburan ferum, maka ia terapung di atas permukaan leburan besi dan <b>menghalang besi lebur daripada dioksidakan semula</b> oleh udara panas! Sangga dikeluarkan melalui saluran berasingan untuk dijadikan bahan asas turapan jalan dan simen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b1-s5-c3',
          title: 'Pengekstrakan Aluminium daripada Bauksit (Proses Elektrolisis Alumina)',
          badge: 'Proses Hall-Héroult KSSM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">Elektrolisis Leburan Alumina &amp; Kriolit</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Bijih bauksit ditulenkan kepada aluminium oksida (alumina, Al₂O₃). Oleh kerana Al lebih reaktif daripada C, pengekstrakan dijalankan melalui elektrolisis leburan dengan elektrod karbon:
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-rose-900 block mb-1">Anod Karbon (Grafit):</b>
                    <p class="text-[11px] text-slate-700 mb-1">
                      Ion oksida dinyahcas melepaskan elektron menghasilkan gas oksigen:<br/>
                      <span class="font-mono font-bold text-rose-800">2O²⁻(c) → O₂(g) + 4e⁻</span>
                    </p>
                    <div class="p-2 rounded-lg bg-rose-50 border border-rose-200 text-[10px] text-rose-950 mt-1.5">
                      <b>⚠️ Hakisan Anod Karbon:</b> Pada suhu operasi yang sangat tinggi (950 °C), gas O₂ yang terbebas bertindak balas dengan anod karbon membentuk gas CO₂ (<span class="font-mono">C + O₂ → CO₂</span>). Oleh itu, <b>anod karbon terhakis dan mesti diganti secara berkala</b>!
                    </div>
                  </div>

                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-sky-900 block mb-1">Katod Karbon (Dinding Sel):</b>
                    <p class="text-[11px] text-slate-700 mb-1">
                      Ion aluminium menerima elektron diturunkan kepada leburan aluminium:<br/>
                      <span class="font-mono font-bold text-sky-800">Al³⁺(c) + 3e⁻ → Al(c)</span>
                    </p>
                    <p class="text-[11px] text-slate-600 mt-2">
                      Leburan aluminium yang lebih tumpat terenap di bahagian dasar sel dan dialirkan keluar secara berterusan.
                    </p>
                  </div>
                </div>

                <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                  <b class="text-amber-900 block font-bold mb-1">Peranan Utama Kriolit (Na₃AlF₆):</b>
                  <p class="text-[11px] leading-relaxed">
                    Alumina tulen mempunyai takat lebur yang amat tinggi iaitu <b>2072 °C</b>. Penambahan <b>kriolit lebur bertindak sebagai pelarut yang merendahkan takat lebur campuran kepada sekitar 950 °C</b> dan meningkatkan kekonduksian elektrik. Ini menjimatkan penggunaan tenaga elektrik dan kos operasi industri secara besar-besaran!
                  </p>
                </div>
              </div>

              <!-- ISU ALAM SEKITAR -->
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">Isu Alam Sekitar &amp; Kitar Semula Logam</span>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
                    <b class="text-rose-900 block font-bold mb-1">Impak Negatif Perlombongan:</b>
                    <ul class="list-disc pl-4 space-y-0.5 text-[11px]">
                      <li>Pelepasan gas rumah hijau (CO₂) dan gas berasid (SO₂) punca hujan asid.</li>
                      <li>Hakisan tanah, tanah runtuh dan kepupusan habitat flora fauna.</li>
                      <li>Penjanaan sisa <b>lumpur merah (red mud)</b> daripada penulenan bauksit yang sangat beralkali dan mencemarkan punca air bawah tanah.</li>
                    </ul>
                  </div>

                  <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                    <b class="text-emerald-900 block font-bold mb-1">Kepentingan Kitar Semula Logam:</b>
                    <ul class="list-disc pl-4 space-y-0.5 text-[11px]">
                      <li>Kitar semula aluminium menjimatkan sehingga <b>95% tenaga elektrik</b> berbanding mengekstrak daripada bauksit baru.</li>
                      <li>Memelihara simpanan bijih logam semulajadi yang tidak boleh diperbaharui.</li>
                      <li>Mengurangkan pembuangan sisa pepejal dan pelepasan gas pencemar ke atmosfera.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menyatakan besi diekstrak daripada bijihnya melalui proses elektrolisis akueus.',
          correction: 'Besi diekstrak melalui penurunan oleh karbon/karbon monoksida dalam relau bagas kerana kosnya jauh lebih murah dan besi berada di bawah karbon dalam SKL!',
          why: 'Elektrolisis hanya digunakan untuk logam yang lebih reaktif daripada karbon seperti Al, Mg, Na.'
        },
        {
          mistake: 'Lupa menyatakan fungsi sangga (CaSiO₃) selain daripada menyingkirkan bendasing silika.',
          correction: 'Sangga juga berfungsi melindungi leburan ferum daripada dioksidakan semula oleh oksigen udara panas kerana sangga terapung di atas besi lebur!',
          why: 'Poin ini sering membawa markah bonus dalam soalan struktur dan esei SPM.'
        }
      ],
      simulationRef: {
        id: 'pengekstrakan-besi',
        title: 'Makmal Maya Pengekstrakan Besi dalam Relau Bagas',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=pengekstrakan-besi',
        description: 'Kaji tindak balas kimia zon demi zon relau bagas, penyingkiran bendasing silika oleh batu kapur, dan pemisahan sangga daripada leburan besi.',
        previewBadge: 'Simulasi Relau Bagas KSSM'
      },
      flashcards: [
        {
          id: 't5-b1-s5-fc1',
          front: 'Logam manakah dalam Siri Kereaktifan Logam yang diekstrak melalui elektrolisis leburan bijihnya?',
          back: 'Logam yang lebih reaktif daripada Karbon: Kalium (K), Natrium (Na), Kalsium (Ca), Magnesium (Mg), dan Aluminium (Al).'
        },
        {
          id: 't5-b1-s5-fc2',
          front: 'Apakah agen penurunan utama yang menurunkan ferum(III) oksida dalam relau bagas?',
          back: 'Gas karbon monoksida, CO (dan juga karbon/kok, C).'
        },
        {
          id: 't5-b1-s5-fc3',
          front: 'Apakah peranan batu kapur (kalsium karbonat, CaCO₃) dalam pengekstrakan besi dalam relau bagas?',
          back: 'Batu kapur terurai membentuk kalsium oksida, CaO yang bertindak balas dengan bendasing pasir (SiO₂) membentuk sangga (CaSiO₃).'
        },
        {
          id: 't5-b1-s5-fc4',
          front: 'Apakah dua fungsi penambahan kriolit (Na₃AlF₆) ke dalam alumina lebur semasa pengekstrakan aluminium?',
          back: 'Merendahkan takat lebur alumina dari 2072 °C ke ~950 °C dan meningkatkan kekonduksian elektrik larutan leburan.'
        },
        {
          id: 't5-b1-s5-fc5',
          front: 'Mengapakah elektrod anod karbon dalam sel pengekstrakan aluminium perlu diganti dari semasa ke semasa?',
          back: 'Gas oksigen yang terhasil di anod bertindak balas dengan karbon pada suhu tinggi membentuk gas CO₂ (C + O₂ → CO₂), menyebabkan anod karbon terhakis.'
        }
      ],
      quiz: [
        {
          id: 't5-b1-s5-q1',
          question: 'Antara logam berikut, yang manakah diekstrak daripada bijihnya melalui kaedah penurunan menggunakan serbuk kok (karbon) dalam relau bagas?',
          options: ['Aluminium', 'Magnesium', 'Besi (Ferum)', 'Natrium'],
          answerIndex: 2,
          explanation: 'Besi terletak di bawah karbon dalam Siri Kereaktifan Logam, membolehkan oksida besinya diturunkan oleh karbon atau karbon monoksida secara ekonomik.',
          level: 'Rendah'
        },
        {
          id: 't5-b1-s5-q2',
          question: 'Persamaan berikut mewakili tindak balas pembentukan sangga dalam relau bagas:\nCaO(p) + SiO₂(p) → CaSiO₃(c)\nApakah sifat kimia bagi CaO dan SiO₂ dalam tindak balas ini?',
          options: [
            'CaO ialah oksida bes manakala SiO₂ ialah oksida asid',
            'CaO ialah oksida asid manakala SiO₂ ialah oksida bes',
            'Kedua-duanya ialah oksida neutral',
            'Kedua-duanya ialah oksida amfoterik'
          ],
          answerIndex: 0,
          explanation: 'CaO ialah oksida logam yang bersifat bes, manakala SiO₂ (silika/pasir) ialah oksida bukan logam yang bersifat asid. Tindak balas ini meneutralkan bendasing membentuk kalsium silikat (sangga).',
          level: 'Sederhana',
          spmReference: 'SPM 2022 Kertas 1'
        },
        {
          id: 't5-b1-s5-q3',
          question: 'Dalam pengekstrakan aluminium daripada bauksit secara elektrolisis leburan alumina, apakah fungsi utama penambahan kriolit?',
          options: [
            'Bertindak sebagai mangkin untuk mempercepatkan penguraian alumina',
            'Merendahkan takat lebur alumina daripada 2072 °C kepada sekitar 950 °C',
            'Menghalang pembentukan gas karbon dioksida di anod',
            'Menghalang pengaratan dinding keluli sel elektrolisis'
          ],
          answerIndex: 1,
          explanation: 'Kriolit (Na₃AlF₆) bertindak sebagai pelarut yang merendahkan takat lebur campuran dari 2072 °C ke ~950 °C, menjimatkan kos tenaga elektrik dengan amat ketara.',
          level: 'Rendah'
        },
        {
          id: 't5-b1-s5-q4',
          question: 'Semasa pengekstrakan aluminium secara elektrolisis leburan, jisim elektrod anod karbon berkurang secara beransur-ansur. Apakah penjelasan kimia bagi fenomena ini?',
          options: [
            'Karbon melarut dalam kriolit lebur',
            'Gas oksigen yang terbebas di anod bertindak balas dengan anod karbon pada suhu tinggi membentuk gas karbon dioksida',
            'Karbon mengalami penurunan menjadi metana',
            'Ion Al³⁺ menghakis permukaan karbon'
          ],
          answerIndex: 1,
          explanation: 'Di anod, ion O²⁻ dinyahcas menghasilkan gas O₂. Pada suhu operasi ~950 °C, gas O₂ bertindak balas dengan grafit membentuk gas CO₂ (C + O₂ → CO₂), menyebabkan anod karbon terhakis.',
          level: 'Sederhana'
        },
        {
          id: 't5-b1-s5-q5',
          question: 'Mengapakah sangga (CaSiO₃) terapung di atas leburan ferum di bahagian dasar relau bagas dan apakah faedahnya kepada industri?',
          options: [
            'Sangga lebih tumpat daripada leburan ferum; ia mempercepatkan penyejukan ferum',
            'Sangga kurang tumpat daripada leburan ferum; ia menghalang leburan ferum daripada dioksidakan semula oleh oksigen udara',
            'Sangga bertindak sebagai penebat elektrik bagi mengelakkan litar pintas',
            'Sangga menyerap karbon daripada ferum untuk menjadikannya keluli tulen'
          ],
          answerIndex: 1,
          explanation: 'Ketumpatan sangga lebih rendah daripada leburan ferum, menjadikannya terapung di lapisan atas, lalu melindungi besi lebur daripada bersentuhan dengan udara panas dan teroksida semula.',
          level: 'Tinggi (KBAT)'
        },
        {
          id: 't5-b1-s5-q6',
          question: 'Kitar semula tin minuman aluminium terpakai semakin giat dipromosikan di seluruh dunia. Berapakah anggaran penjimatan tenaga yang dicapai melalui kitar semula aluminium berbanding mengekstrak daripada bijih bauksit?',
          options: [
            'Sekitar 20% penjimatan tenaga',
            'Sekitar 50% penjimatan tenaga',
            'Sehingga 95% penjimatan tenaga elektrik',
            'Tiada penjimatan kerana kos pengangkutan aluminium tinggi'
          ],
          answerIndex: 2,
          explanation: 'Kitar semula aluminium hanya memerlukan peleburan semula sisa pada suhu ~660 °C, menjimatkan sehingga 95% tenaga elektrik berbanding elektrolisis alumina yang memerlukan suhu tinggi dan arus ribuan ampere.',
          level: 'Sederhana'
        }
      ]
    },

    // ==========================================
    // SUBTOPIK 1.6
    // ==========================================
    {
      id: 't5-b1-s6',
      code: '1.6',
      title: 'Pengaratan Besi (Kakisan Logam)',
      learningStandard: 'SP 1.6.1, 1.6.2',
      durationMinutes: 30,
      tldr: [
        'Pengaratan besi ialah kakisan redoks semula jadi yang menukarkan besi kepada ferum(III) oksida terhidrat, Fe₂O₃·xH₂O.',
        'Dua syarat wajib pengaratan: kehadiran AIR (H₂O) dan OKSIGEN (O₂) serentak.',
        'Pengaratan berlaku melalui sel elektrokimia mikroskopik: pusat titisan air (kepekatan O₂ rendah) menjadi Anod, tepi titisan air (kepekatan O₂ tinggi) menjadi Katod.',
        'Logam dengan E° lebih negatif daripada besi (contoh: Mg, Zn) bertindak sebagai ANOD KORBAN dan melindungi besi.',
        'Logam dengan E° lebih positif daripada besi (contoh: Cu, Sn) mempercepatkan pengaratan besi apabila lapisan pelindung tercalar.',
        'Larutan K₃[Fe(CN)₆] mengesan ion Fe²⁺ (tompok biru tua), manakala penunjuk fenolftalein mengesan ion OH⁻ (warna merah jambu).'
      ],
      concepts: [
        {
          id: 't5-b1-s6-c1',
          title: 'Mekanisme Redoks Pengaratan Besi (Rajah Titisan Air SPM)',
          badge: 'Mekanisme Elektrokimia SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">Sel Elektrokimia pada Titisan Air</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Apabila titisan air berada di atas permukaan besi terdedah, sel elektrokimia mikroskopik terbentuk secara spontan:
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-rose-900 block mb-1">Anod (Pusat Titisan Air - Kepekatan O₂ Rendah):</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      <li>Atom ferum melepaskan elektron dan dioksidakan menjadi ion Fe²⁺.</li>
                      <li>Persamaan setengah: <span class="font-mono font-bold text-rose-800">Fe(p) → Fe²⁺(ak) + 2e⁻</span>.</li>
                      <li>Permukaan besi berlubang dan berlekuk.</li>
                    </ul>
                  </div>

                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-sky-900 block mb-1">Katod (Tepi Titisan Air - Kepekatan O₂ Tinggi):</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      <li>Elektron mengalir melalui besi dari pusat ke tepi titisan air.</li>
                      <li>Molekul oksigen terlarut dan air menerima elektron dan diturunkan menjadi ion hidroksida, OH⁻.</li>
                      <li>Persamaan setengah: <span class="font-mono font-bold text-sky-800">O₂(g) + 2H₂O(c) + 4e⁻ → 4OH⁻(ak)</span>.</li>
                    </ul>
                  </div>
                </div>

                <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                  <b class="text-amber-900 block font-bold mb-1">Pembentukan Karat Perang:</b>
                  <p class="text-[11px] leading-relaxed">
                    1. Ion Fe²⁺ bertindak balas dengan ion OH⁻ membentuk mendakan hijau ferum(II) hidroksida:<br/>
                    <span class="font-mono font-bold text-amber-900">Fe²⁺(ak) + 2OH⁻(ak) → Fe(OH)₂(p)</span><br/>
                    2. Fe(OH)₂ terus dioksidakan oleh oksigen membentuk karat ferum(III) oksida terhidrat yang rapuh dan berliang:<br/>
                    <span class="font-mono font-bold text-amber-900">Fe(OH)₂(p) + O₂ + H₂O → Fe₂O₃·xH₂O(p)  (Karat Perang)</span>
                  </p>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b1-s6-c2',
          title: 'Kesan Sentuhan Logam Lain Terhadap Pengaratan & Kaedah Pencegahan',
          badge: 'Eksperimen Agar-Agar SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">Eksperimen Paku Besi dalam Agar-agar Berpenunjuk</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-2">
                  Penunjuk digunakan: <b>K₃[Fe(CN)₆]</b> (mengesan ion Fe²⁺ → tompok biru tua) dan <b>fenolftalein</b> (mengesan ion OH⁻ → warna merah jambu).
                </p>

                <div class="overflow-x-auto mb-3">
                  <table class="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr class="bg-slate-100 text-slate-700 border-b border-slate-200">
                        <th class="p-2 font-bold">Pasangan Logam</th>
                        <th class="p-2 font-bold">Nilai E° Relatif</th>
                        <th class="p-2 font-bold text-blue-800">Tompok Biru Tua</th>
                        <th class="p-2 font-bold text-rose-800">Warna Merah Jambu</th>
                        <th class="p-2 font-bold">Kesan ke atas Besi</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 text-slate-700 text-[11px]">
                      <tr>
                        <td class="p-2 font-semibold">Fe + Mg</td>
                        <td class="p-2">Mg (-2.38 V) &lt; Fe (-0.44 V)</td>
                        <td class="p-2 text-slate-400">Tiada</td>
                        <td class="p-2 text-rose-600 font-bold">Merah jambu terang</td>
                        <td class="p-2 text-emerald-800 font-bold">Terlindung (Mg berkorban)</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-semibold">Fe + Zn</td>
                        <td class="p-2">Zn (-0.76 V) &lt; Fe (-0.44 V)</td>
                        <td class="p-2 text-slate-400">Tiada</td>
                        <td class="p-2 text-rose-600 font-semibold">Merah jambu</td>
                        <td class="p-2 text-emerald-800 font-bold">Terlindung (Zn berkorban)</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-semibold">Fe sahaja</td>
                        <td class="p-2">Kawalan</td>
                        <td class="p-2 text-blue-700">Tompok biru pudar</td>
                        <td class="p-2 text-rose-400">Merah jambu pudar</td>
                        <td class="p-2 text-slate-700">Berkarat perlahan</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-semibold">Fe + Sn</td>
                        <td class="p-2">Sn (-0.14 V) &gt; Fe (-0.44 V)</td>
                        <td class="p-2 text-blue-800 font-semibold">Tompok biru sederhana</td>
                        <td class="p-2 text-slate-400">Pudar</td>
                        <td class="p-2 text-rose-700 font-semibold">Berkarat lebih cepat</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-semibold">Fe + Cu</td>
                        <td class="p-2">Cu (+0.34 V) &gt;&gt; Fe (-0.44 V)</td>
                        <td class="p-2 text-blue-900 font-black">Tompok biru amat banyak</td>
                        <td class="p-2 text-slate-400">Tiada</td>
                        <td class="p-2 text-rose-900 font-black">Berkarat PALING CEPAT</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-800 block mb-1">1. Lapisan Pelindung Fizikal</b>
                    <p class="text-[11px] text-slate-600">Mengecat, menyapu minyak/gris, menyalut plastik, dan penyaduran timah (tin makanan).</p>
                  </div>
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-800 block mb-1">2. Perlindungan Katod (Logam Korban)</b>
                    <p class="text-[11px] text-slate-600">Blok zink pada badan kapal keluli atau blok magnesium pada paip gas bawah tanah.</p>
                  </div>
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-800 block mb-1">3. Pengaloian (Alloy)</b>
                    <p class="text-[11px] text-slate-600">Keluli tahan karat (Fe + Cr + Ni) membentuk lapisan pasif oksida kromium yang kalis air.</p>
                  </div>
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menyatakan tin makanan keluli disadur timah (Sn) kerana timah bertindak sebagai logam korban.',
          correction: 'Timah (Sn) mempunyai E° lebih positif (-0.14 V) berbanding besi (-0.44 V). Timah hanya bertindak sebagai pelindung fizikal. Apabila lapisan timah tercalar, besi berkarat JAUH LEBIH PANTAS!',
          why: 'Ini adalah soalan aplikasi KBAT paling kerap diuji dalam SPM Kertas 2.'
        },
        {
          mistake: 'Menganggap kehadiran air sahaja sudah cukup untuk membolehkan pengaratan besi berlaku.',
          correction: 'Pengaratan besi WAJIB memerlukan kehadiran kedua-dua AIR dan OKSIGEN serentak!',
          why: 'Besi di dalam air didih yang ditutup dengan lapisan minyak tidak akan berkarat kerana tiada oksigen terlarut.'
        }
      ],
      simulationRef: {
        id: 'pengaratan-besi-sentuhan-logam',
        title: 'Makmal Maya Pengaratan Besi & Logam Korban',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=pengaratan-besi-sentuhan-logam',
        description: 'Simulasi 5 tabung uji agar-agar dengan peluncur masa 0-48 jam untuk memerhati keamatan tompok biru K₃[Fe(CN)₆] dan merah jambu fenolftalein secara dinamik.',
        previewBadge: 'Simulasi Pengaratan KSSM'
      },
      flashcards: [
        {
          id: 't5-b1-s6-fc1',
          front: 'Apakah formula kimia bagi karat besi?',
          back: 'Ferum(III) oksida terhidrat, Fe₂O₃·xH₂O.'
        },
        {
          id: 't5-b1-s6-fc2',
          front: 'Apakah dua bahan yang wajib hadir serentak untuk membolehkan pengaratan besi berlaku?',
          back: 'Oksigen (O₂) dan air (H₂O).'
        },
        {
          id: 't5-b1-s6-fc3',
          front: 'Apakah fungsi larutan kalium heksasianoferat(III), K₃[Fe(CN)₆] dalam eksperimen pengaratan?',
          back: 'Mengesan kehadiran ion ferum(II), Fe²⁺ (membentuk tompok mendakan berwarna biru tua pekat).'
        },
        {
          id: 't5-b1-s6-fc4',
          front: 'Mengapakah blok zink atau magnesium disambungkan pada badan kapal keluli atau paip bawah tanah?',
          back: 'Sebagai anod korban (perlindungan katod). Logam ini mempunyai E° lebih negatif, jadi ia melepaskan elektron dan terhakis bagi melindungi besi.'
        },
        {
          id: 't5-b1-s6-fc5',
          front: 'Apakah yang diperhatikan apabila paku besi yang dililit wayar kuprum diletakkan dalam agar-agar berpenunjuk?',
          back: 'Tompok biru tua pekat yang sangat banyak terbentuk dengan cepat, membuktikan besi berkarat dengan amat pantas.'
        }
      ],
      quiz: [
        {
          id: 't5-b1-s6-q1',
          question: 'Antara berikut, yang manakah persamaan setengah bagi proses penurunan yang berlaku di bahagian katod semasa pengaratan besi?',
          options: [
            'Fe(p) → Fe²⁺(ak) + 2e⁻',
            'O₂(g) + 2H₂O(c) + 4e⁻ → 4OH⁻(ak)',
            'Fe²⁺(ak) + 2e⁻ → Fe(p)',
            '2H⁺(ak) + 2e⁻ → H₂(g)'
          ],
          answerIndex: 1,
          explanation: 'Di katod (tepi titisan air di mana kepekatan oksigen tinggi), molekul oksigen terlarut dan air menerima elektron dan diturunkan kepada ion hidroksida: O₂ + 2H₂O + 4e⁻ → 4OH⁻.',
          level: 'Sederhana'
        },
        {
          id: 't5-b1-s6-q2',
          question: 'Satu eksperimen dijalankan untuk mengkaji kesan sentuhan logam ke atas pengaratan paku besi dalam medium agar-agar. Pasangan logam manakah yang menghasilkan keamatan tompok biru tua K₃[Fe(CN)₆] PALING TINGGI?',
          options: [
            'Paku besi + Jalur Magnesium',
            'Paku besi + Jalur Zink',
            'Paku besi sahaja (kawalan)',
            'Paku besi + Jalur Kuprum'
          ],
          answerIndex: 3,
          explanation: 'Kuprum mempunyai nilai E° (+0.34 V) yang jauh lebih positif daripada besi (-0.44 V). Ini memaksa besi bertindak sebagai anod dan melepaskan elektron dengan sangat pantas, menghasilkan kepekatan ion Fe²⁺ paling tinggi (tompok biru paling pekat).',
          level: 'Sederhana',
          spmReference: 'SPM 2023 Kertas 1'
        },
        {
          id: 't5-b1-s6-q3',
          question: 'Tin makanan keluli disadur dengan lapisan timah nipis. Apakah yang berlaku apabila tin tersebut kemek dan permukaannya tercalar sehingga mendedahkan besi kepada udara lembap?',
          options: [
            'Besi berkarat lebih cepat berbanding jika tiada lapisan timah',
            'Timah bertindak sebagai anod korban dan berkarat dahulu',
            'Besi kekal terlindung daripada pengaratan',
            'Tin makanan menjadi kalis asid semula jadi'
          ],
          answerIndex: 0,
          explanation: 'Nilai E° timah (-0.14 V) lebih positif daripada besi (-0.44 V). Apabila tercalar, besi menjadi terminal negatif (anod) dan melepaskan elektron dengan lebih pantas kepada timah, menyebabkan besi berkarat dengan jauh lebih cepat!',
          level: 'Sederhana'
        },
        {
          id: 't5-b1-s6-q4',
          question: 'Paip besi bawah tanah dilindungi daripada pengaratan dengan menyambungkannya kepada blok logam korban X. Logam manakah yang paling sesuai sebagai X?',
          options: ['Kuprum', 'Plumbum', 'Magnesium', 'Perak'],
          answerIndex: 2,
          explanation: 'Magnesium mempunyai nilai E° yang sangat negatif (-2.38 V), membolehkannya bertindak sebagai anod korban dengan melepaskan elektron secara berterusan bagi melindungi paip besi.',
          level: 'Rendah'
        },
        {
          id: 't5-b1-s6-q5',
          question: 'Mengapakah keluli tahan karat (stainless steel) tidak mudah berkarat berbanding besi tulen?',
          options: [
            'Ia mengandungi karbon yang menyerap air daripada permukaan',
            'Penambahan kromium dan nikel membentuk lapisan oksida kromium pasif yang padat, kuat dan tidak telus air atau oksigen',
            'Keluli tahan karat tidak mempunyai elektron bebas untuk bertindak balas',
            'Ia mempunyai nilai E° yang sama persis dengan emas tulen'
          ],
          answerIndex: 1,
          explanation: 'Kromium dalam keluli tahan karat bertindak balas dengan oksigen membentuk lapisan kromium(III) oksida pelindung yang nipis, padat dan menghalang oksigen serta air daripada menembusi besi di bawahnya.',
          level: 'Tinggi (KBAT)'
        },
        {
          id: 't5-b1-s6-q6',
          question: 'Sebatang paku besi dimasukkan ke dalam tabung uji berisi air suling yang dididihkan dan dilapisi minyak di atasnya. Selepas seminggu, tiada sebarang karat terbentuk. Mengapa?',
          options: [
            'Pendidihan air suling telah menyingkirkan semua oksigen terlarut dan lapisan minyak menghalang oksigen atmosfera melarut semula',
            'Lapisan minyak menukar air suling menjadi alkali',
            'Paku besi telah mengion sepenuhnya dalam air panas',
            'Air didih tidak mengandungi ion ferum'
          ],
          answerIndex: 0,
          explanation: 'Mendidihkan air menyingkirkan gas oksigen terlarut, dan lapisan minyak menghalang oksigen dari udara melarut semula ke dalam air. Tanpa kehadiran oksigen, pengaratan besi mustahil boleh berlaku.',
          level: 'Sederhana'
        }
      ]
    }
  ]
};
