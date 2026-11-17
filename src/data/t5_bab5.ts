import { Chapter } from '../types/nota';

export const T5_BAB5: Chapter = {
  id: 't5-b5',
  form: 'T5',
  chapterNumber: 5,
  title: 'Kimia Konsumer dan Industri',
  theme: 'Aplikasi Sains',
  durationMinutes: 150,
  subtopicCount: 5,
  iconName: 'Sparkles',
  description: 'Meneroka komposisi minyak dan lemak, proses saponifikasi pembuatan sabun, tindakan pencucian sabun vs detergen dalam air liat, fungsi bahan tambah makanan, ubat-ubatan & kosmetik serta inovasi nanoteknologi dan Teknologi Hijau.',
  subtopics: [
    // ==========================================
    // SUBTOPIK 5.1
    // ==========================================
    {
      id: 't5-b5-s1',
      code: '5.1',
      title: 'Minyak dan Lemak',
      learningStandard: 'SP 5.1.1, 5.1.2, 5.1.3',
      durationMinutes: 30,
      tldr: [
        'Minyak dan lemak ialah ester semula jadi yang dikenali sebagai trigliserida, terbentuk daripada 1 molekul gliserol dan 3 molekul asid lemak.',
        'Minyak cecair pada suhu bilik daripada tumbuhan (takat lebur rendah), manakala lemak pepejal daripada haiwan (takat lebur tinggi).',
        'Lemak tepu hanya mengandungi ikatan kovalen tunggal C—C dalam rantai hidrokarbon asid lemak.',
        'Lemak tak tepu mengandungi sekurang-kurangnya satu ikatan ganda dua C=C dalam rantai hidrokarbon.',
        'Penghidrogenan minyak sayuran (mangkin nikel pada 180 °C) menukarkan ikatan ganda dua C=C kepada ikatan tunggal untuk menghasilkan marjerin pepejal.'
      ],
      concepts: [
        {
          id: 't5-b5-s1-c1',
          title: 'Struktur Trigliserida: Gliserol & Asid Lemak',
          badge: 'Struktur Kimia Minyak & Lemak',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">Komposisi Trigliserida</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  <b>Minyak dan lemak</b> ialah ester organik semula jadi yang tergolong dalam kumpulan <b>trigliserida</b> (triester gliserol). Trigliserida terbentuk daripada tindak balas pengesteran antara satu molekul <b>gliserol (propana-1,2,3-triol)</b> dengan tiga molekul <b>asid lemak</b> berantai panjang:
                </p>

                <div class="p-3 rounded-xl bg-slate-900 text-white font-mono text-center text-xs mb-3 shadow-inner">
                  <span class="text-sky-300">Gliserol</span> + 
                  <span class="text-amber-300">3 Asid Lemak</span> ⇌ 
                  <span class="text-emerald-400 font-bold">Trigliserida (Minyak/Lemak)</span> + 
                  <span class="text-sky-200">3 Air (H₂O)</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-800 block mb-1">Minyak (Tumbuhan):</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      <li><b>Keadaan fizik:</b> Cecair pada suhu bilik.</li>
                      <li><b>Takat lebur:</b> Rendah (kerana banyak ikatan ganda dua C=C membengkokkan rantai dan melemahkan daya Van der Waals).</li>
                      <li><b>Sumber lazim:</b> Kelapa sawit, buah zaitun, jagung, kacang soya.</li>
                    </ul>
                  </div>

                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-800 block mb-1">Lemak (Haiwan):</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      <li><b>Keadaan fizik:</b> Pepejal pada suhu bilik.</li>
                      <li><b>Takat lebur:</b> Tinggi (rantai lurus tepu tersusun padat menghasilkan daya Van der Waals yang kuat).</li>
                      <li><b>Sumber lazim:</b> Lemak lembu, lemak kambing, mentega, keju.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b5-s1-c2',
          title: 'Lemak Tepu vs Lemak Tak Tepu & Proses Penghidrogenan Marjerin',
          badge: 'Penghidrogenan Minyak Industri',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">Perbandingan Lemak Tepu vs Tak Tepu</span>
                <div class="overflow-x-auto mb-3">
                  <table class="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr class="bg-slate-100 text-slate-700 border-b border-slate-200">
                        <th class="p-2 font-bold">Ciri Perbandingan</th>
                        <th class="p-2 font-bold text-amber-800">Lemak Tepu</th>
                        <th class="p-2 font-bold text-emerald-800">Lemak Tak Tepu</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 text-slate-700 text-[11px]">
                      <tr>
                        <td class="p-2 font-medium">Jenis Ikatan Karbon</td>
                        <td class="p-2">Hanya ikatan tunggal C—C</td>
                        <td class="p-2 text-emerald-800 font-bold">Mengandungi sekurang-kurangnya satu ikatan ganda dua C=C</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-medium">Contoh Asid Lemak</td>
                        <td class="p-2">Asid stearik, asid palmitik</td>
                        <td class="p-2">Asid oleik, asid linoleik</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-medium">Takat Lebur</td>
                        <td class="p-2 font-semibold">Tinggi (pepejal pada suhu bilik)</td>
                        <td class="p-2 font-semibold">Rendah (cecair pada suhu bilik)</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-medium">Kesan Kesihatan</td>
                        <td class="p-2 text-rose-700">Meningkatkan kolesterol jahat (LDL)</td>
                        <td class="p-2 text-emerald-800">Meningkatkan kolesterol baik (HDL)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- PENGHIDROGENAN -->
                <div class="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-950">
                  <b class="text-purple-900 block font-bold mb-1">Proses Penghidrogenan Minyak (Pembuatan Marjerin):</b>
                  <p class="text-[11px] leading-relaxed mb-1.5">
                    Minyak sayuran tak tepu ditukarkan kepada marjerin pepejal melalui tindak balas penambahan gas hidrogen, H₂:
                  </p>
                  <ul class="list-disc pl-4 space-y-0.5 text-[11px] text-purple-900">
                    <li><b>Keadaan Tindak Balas:</b> Suhu <b>180 °C</b> dengan kehadiran mangkin serbuk <b>nikel (Ni)</b>.</li>
                    <li><b>Perubahan Kimia:</b> Gas hidrogen memutuskan ikatan ganda dua C=C dan menambah atom hidrogen, menukarkan lemak tak tepu cecair kepada lemak tepu pepejal yang mudah disapu pada roti.</li>
                  </ul>
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menganggap minyak dan lemak adalah hidrokarbon.',
          correction: 'Minyak dan lemak ialah ESTER (trigliserida) yang mengandungi karbon, hidrogen, dan OKSIGEN! Hidrokarbon hanya mengandungi karbon dan hidrogen.',
          why: 'Minyak dan lemak mengandungi 3 kumpulan berfungsi ester (—COO—).'
        },
        {
          mistake: 'Lupa menyatakan kehadiran mangkin nikel dan suhu 180 °C dalam penghidrogenan minyak.',
          correction: 'Tindak balas penghidrogenan memerlukan gas hidrogen, suhu 180 °C dan mangkin nikel untuk menukar minyak menjadi marjerin.',
          why: 'Keadaan tindak balas membawa markah penting dalam SPM Kertas 2.'
        }
      ],
      flashcards: [
        {
          id: 't5-b5-s1-fc1',
          front: 'Apakah maksud trigliserida dalam kimia minyak dan lemak?',
          back: 'Trigliserida ialah triester semula jadi yang terbentuk daripada tindak balas pengesteran antara 1 molekul gliserol dengan 3 molekul asid lemak.'
        },
        {
          id: 't5-b5-s1-fc2',
          front: 'Apakah perbezaan utama dari segi ikatan karbon antara lemak tepu dan lemak tak tepu?',
          back: 'Lemak tepu hanya mengandungi ikatan kovalen tunggal C—C, manakala lemak tak tepu mengandungi sekurang-kurangnya satu ikatan ganda dua C=C dalam rantai hidrokarbonnya.'
        },
        {
          id: 't5-b5-s1-fc3',
          front: 'Bagaimanakah marjerin pepejal dihasilkan daripada minyak sayuran cecair dalam industri?',
          back: 'Melalui proses penghidrogenan, di mana gas hidrogen dialirkan ke dalam minyak sayuran pada suhu 180 °C dengan kehadiran mangkin nikel.'
        },
        {
          id: 't5-b5-s1-fc4',
          front: 'Mengapakah minyak sawit mempunyai takat lebur yang lebih rendah berbanding lemak lembu?',
          back: 'Minyak sawit mengandungi banyak asid lemak tak tepu dengan ikatan C=C yang membengkokkan rantai molekul, menjadikannya sukar tersusun padat dan menghasilkan daya tarikan Van der Waals yang lebih lemah.'
        },
        {
          id: 't5-b5-s1-fc5',
          front: 'Apakah kesan pengambilan lemak tepu dan lemak trans yang berlebihan terhadap sistem kardiovaskular?',
          back: 'Meningkatkan aras lipoprotein berketumpatan rendah (kolesterol LDL jahat) dalam darah yang boleh menyebabkan pembentukan plak aterosklerosis dan serangan jantung.'
        }
      ],
      quiz: [
        {
          id: 't5-b5-s1-q1',
          question: 'Minyak dan lemak tergolong dalam siri homolog sebatian karbon yang manakah?',
          options: ['Alkohol', 'Asid karboksilik', 'Ester', 'Alkena'],
          answerIndex: 2,
          explanation: 'Minyak dan lemak ialah ester semula jadi (trigliserida) yang terbentuk daripada tindak balas pengesteran antara gliserol dan asid lemak.',
          level: 'Rendah'
        },
        {
          id: 't5-b5-s1-q2',
          question: 'Persamaan berikut mewakili pembentukan satu molekul trigliserida:\nGliserol + 3 Asid Stearik ⇌ Sebatian X + 3 H₂O\nApakah nama sebatian X dan kelas makanannya?',
          options: [
            'Gliseril tristearat; Lemak tepu',
            'Gliseril trioleat; Lemak tak tepu',
            'Natrium stearat; Sabun',
            'Propil stearat; Ester perisa'
          ],
          answerIndex: 0,
          explanation: 'Asid stearik ialah asid lemak tepu. Tindak balas 1 mol gliserol dengan 3 mol asid stearik menghasilkan trigliserida gliseril tristearat yang merupakan sejenis lemak tepu pepejal.',
          level: 'Sederhana'
        },
        {
          id: 't5-b5-s1-q3',
          question: 'Dalam industri pembuatan marjerin, minyak bunga matahari ditukarkan kepada marjerin pepejal. Apakah mangkin dan suhu yang digunakan dalam proses penghidrogenan ini?',
          options: [
            'Mangkin serbuk nikel, Ni pada suhu 180 °C',
            'Mangkin asid sulfurik pekat pada suhu 60 °C',
            'Mangkin besi, Fe pada suhu 450 °C',
            'Mangkin platinum, Pt pada suhu bilik'
          ],
          answerIndex: 0,
          explanation: 'Penghidrogenan industri minyak menggunakan serbuk nikel (Ni) sebagai mangkin pada suhu 180 °C untuk membolehkan gas hidrogen bertindak balas merentasi ikatan C=C.',
          level: 'Rendah'
        },
        {
          id: 't5-b5-s1-q4',
          question: 'Asid oleik mempunyai formula C₁₇H₃₃COOH manakala asid stearik mempunyai formula C₁₇H₃₅COOH. Pernyataan manakah yang BENAR mengenai kedua-dua asid lemak ini?',
          options: [
            'Asid oleik ialah asid lemak tepu kerana mempunyai kurang atom hidrogen',
            'Asid oleik mengandungi satu ikatan ganda dua C=C menjadikannya asid lemak tak tepu',
            'Asid stearik mempunyai takat lebur yang lebih rendah daripada asid oleik',
            'Kedua-dua asid lemak adalah cecair pada suhu bilik'
          ],
          answerIndex: 1,
          explanation: 'Asid oleik kehilangan 2 atom H (C₁₇H₃₃) berbanding rantai alkil tepu (C₁₇H₃₅), menunjukkan kehadiran satu ikatan ganda dua C=C menjadikannya asid lemak tak tepu.',
          level: 'Sederhana'
        },
        {
          id: 't5-b5-s1-q5',
          question: 'Mengapakah minyak sawit yang kaya dengan lemak tak tepu lebih baik untuk kesihatan kardiovaskular berbanding lemak haiwan tepu?',
          options: [
            'Ia mengurangkan aras kolesterol LDL jahat dan meningkatkan kolesterol HDL baik',
            'Ia menghalang penyerapan glukosa dalam usus',
            'Ia mengandungi kalsium yang tinggi',
            'Ia tidak boleh dihadamkan oleh enzim manusia'
          ],
          answerIndex: 0,
          explanation: 'Lemak tak tepu membantu mengurangkan aras kolesterol LDL (Low Density Lipoprotein) dan meningkatkan aras HDL (High Density Lipoprotein), mengurangkan risiko penyumbatan arteri darah.',
          level: 'Sederhana'
        },
        {
          id: 't5-b5-s1-q6',
          question: 'Minyak jagung cecair boleh diuji untuk membuktikan sifat ketaktepuannya di dalam makmal sekolah. Ujian manakah yang memberikan keputusan positif bagi kehadiran ikatan ganda dua C=C dalam minyak jagung?',
          options: [
            'Menyahwarnakan warna perang air bromin',
            'Menukarkan kertas litmus biru lembap kepada merah',
            'Menghasilkan bunyi "pop" dengan kayu uji menyala',
            'Membentuk mendakan putih dengan air kapur'
          ],
          answerIndex: 0,
          explanation: 'Ikatan ganda dua C=C dalam asid lemak tak tepu menjalani tindak balas penambahan dengan air bromin, menyahwarnakan warna perang air bromin dengan serta-merta.',
          level: 'Tinggi (KBAT)'
        }
      ]
    },

    // ==========================================
    // SUBTOPIK 5.2
    // ==========================================
    {
      id: 't5-b5-s2',
      code: '5.2',
      title: 'Bahan Pencuci (Sabun dan Detergen)',
      learningStandard: 'SP 5.2.1, 5.2.2, 5.2.3',
      durationMinutes: 40,
      tldr: [
        'Sabun ialah garam natrium atau kalium bagi asid lemak berantai panjang, disediakan melalui proses saponifikasi (hidrolisis beralkali minyak/lemak).',
        'Penambahan larutan natrium klorida (NaCl) tepu memendakkan sabun melalui pengurangan keterlarutan (kesan ion sepunya).',
        'Detergen ialah garam natrium bagi asid sulfonik atau asid alkil hidrogen sulfat yang disintesis daripada petroleum.',
        'Struktur molekul bahan pencuci mempunyai kepala hidrofilik (larut dalam air) dan ekor hidrofobik (larut dalam gris/minyak).',
        'Dalam air liat (mengandungi Ca²⁺ dan Mg²⁺), sabun membentuk mendakan tak larut yang dipanggil KEKAT (scum), manakala detergen TIDAK membentuk kekat dan kekal berbuih berkesan.'
      ],
      concepts: [
        {
          id: 't5-b5-s2-c1',
          title: 'Pembuatan Sabun (Saponifikasi) & Pemendakan oleh NaCl',
          badge: 'Saponifikasi Industri & Makmal',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">Tindak Balas Saponifikasi</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  <b>Saponifikasi</b> ialah proses hidrolisis beralkali ester minyak atau lemak menggunakan larutan alkali pekat seperti <b>natrium hidroksida (NaOH)</b> atau <b>kalium hidroksida (KOH)</b>:
                </p>

                <div class="p-3 rounded-xl bg-slate-900 text-white font-mono text-center text-xs mb-3 shadow-inner">
                  <span class="text-amber-300">Minyak / Lemak (Trigliserida)</span> + 
                  <span class="text-sky-300">3 NaOH pekat</span> 
                  <span class="text-rose-400 font-sans block text-[10px] my-0.5">→ Panaskan 30 minit</span>
                  <span class="text-emerald-400 font-bold">3 Garam Sabun (R—COONa)</span> + 
                  <span class="text-purple-300">Gliserol</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-800 block mb-1">Sabun Natrium vs Sabun Kalium:</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      <li><b>Guna NaOH:</b> Menghasilkan <i>sabun natrium</i> yang keras (sesuai untuk sabun buku / bar mandian dan sabun basuh).</li>
                      <li><b>Guna KOH:</b> Menghasilkan <i>sabun kalium</i> yang lembut dan lebih larut dalam air (sesuai untuk gel mandian cecair dan krim pencuci muka).</li>
                    </ul>
                  </div>

                  <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                    <b class="text-amber-900 block font-bold mb-1">Fungsi Penambahan Larutan NaCl Tepu:</b>
                    <p class="text-[11px] leading-relaxed">
                      Selepas minyak dan alkali dididihkan, sabun yang terhasil masih larut dalam campuran air. Penambahan <b>larutan natrium klorida, NaCl tepu</b> meningkatkan kepekatan ion Na⁺ secara mendadak (kesan ion sepunya) yang <b>mengurangkan keterlarutan sabun dalam air</b>, lalu memendakkan pepejal sabun putih timbul ke permukaan cecair!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b5-s2-c2',
          title: 'Struktur Molekul & Mekanisme Tindakan Pencucian Sabun / Detergen',
          badge: 'Mekanisme Pembersihan & Misel',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">Dua Bahagian Utama Molekul Bahan Pencuci</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Setiap molekul sabun atau detergen mempunyai struktur dwi-sifat yang unik:
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <div class="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
                    <b class="text-rose-900 block mb-1">1. Ekor Hidrofobik:</b>
                    <ul class="list-disc pl-4 space-y-1 text-[11px]">
                      <li>Rantai hidrokarbon panjang yang tidak berkutub / tak bercas.</li>
                      <li><b>Takut air (hidrofobik)</b>: Tidak larut dalam air.</li>
                      <li><b>Larut dalam gris dan minyak</b> kotoran.</li>
                    </ul>
                  </div>

                  <div class="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-950">
                    <b class="text-sky-900 block mb-1">2. Kepala Hidrofilik:</b>
                    <ul class="list-disc pl-4 space-y-1 text-[11px]">
                      <li>Kumpulan ionik bercas negatif (sabun: —COO⁻; detergen: —SO₃⁻ atau —OSO₃⁻).</li>
                      <li><b>Suka air (hidrofilik)</b>: Sangat larut dalam air.</li>
                      <li>Tidak larut dalam gris / minyak.</li>
                    </ul>
                  </div>
                </div>

                <!-- LANGKAH MEKANISME -->
                <span class="text-xs font-bold text-purple-900 uppercase tracking-wider block mb-2">5 Langkah Tindakan Pencucian SPM</span>
                <div class="space-y-1.5 text-xs text-slate-700">
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px]">
                    <b>1. Menurunkan Ketegangan Permukaan Air:</b> Sabun mengurangkan ketegangan permukaan air membolehkan air membasahi fabrik secara menyeluruh.
                  </div>
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px]">
                    <b>2. Penembusan Gris:</b> Ekor hidrofobik melarut dan melekat ke dalam titisan gris pada fabrik, manakala kepala hidrofilik kekal melarut dalam air.
                  </div>
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px]">
                    <b>3. Pengocokan Mekanikal:</b> Gosokan dan pusaran air menarik molekul sabun, menanggalkan kotoran gris daripada permukaan fabrik.
                  </div>
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px]">
                    <b>4. Pembentukan Emulsi (Misel):</b> Gris pecah menjadi titisan kecil yang diselaputi molekul sabun dengan kepala bercas negatif menghadap ke luar.
                  </div>
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px]">
                    <b>5. Tolakan Elektrostatik:</b> Cas negatif pada permukaan luar titisan-titisan gris saling menolak, menghalang gris daripada bercantum semula dan membolehkan gris disingkirkan semasa bilasan air.
                  </div>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b5-s2-c3',
          title: 'Perbandingan Keberkesanan Sabun vs Detergen dalam Air Liat & Air Berasid',
          badge: 'Air Liat & Kekat SPM Popular',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">Mengapa Detergen Lebih Berkesan dalam Air Liat?</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  <b>Air liat (hard water)</b> ialah air semula jadi yang mengandungi kepekatan ion kalsium (Ca²⁺) dan ion magnesium (Mg²⁺) yang tinggi:
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <!-- SABUN DALAM AIR LIAT -->
                  <div class="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
                    <b class="text-rose-900 block font-bold mb-1">A. Sabun dalam Air Liat:</b>
                    <ul class="list-disc pl-4 space-y-1 text-[11px]">
                      <li>Anion sabun bertindak balas dengan ion Ca²⁺ dan Mg²⁺ membentuk mendakan pepejal kelabu yang tidak larut dipanggil <b>KEKAT (SCUM)</b>:</li>
                      <li class="font-mono text-[10px] text-rose-900 font-bold">2 R—COO⁻ + Ca²⁺ → (R—COO)₂Ca(p)  (Kekat)</li>
                      <li><b>Kesan Negatif:</b> Membazirkan sabun, mengotorkan fabrik dengan tompok kelabu, dan buih hanya terbentuk selepas semua ion Ca²⁺ dan Mg²⁺ habis dimendakkan!</li>
                    </ul>
                  </div>

                  <!-- DETERGEN DALAM AIR LIAT -->
                  <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                    <b class="text-emerald-900 block font-bold mb-1">B. Detergen dalam Air Liat:</b>
                    <ul class="list-disc pl-4 space-y-1 text-[11px]">
                      <li>Anion detergen bertindak balas dengan ion Ca²⁺ dan Mg²⁺ membentuk garam kalsium atau magnesium sulfonat yang <b>LARUT DALAM AIR</b>.</li>
                      <li><b>TIADA KEKAT TERBENTUK!</b></li>
                      <li>Detergen kekal berbuih dengan banyak dan mengekalkan kuasa pembersihan optimum walaupun dalam air liat dan air berasid.</li>
                    </ul>
                  </div>
                </div>

                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <b class="text-slate-800 block mb-1">Bahan Tambah Utama dalam Detergen Komersial:</b>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] mt-1">
                    <div class="p-2 rounded-lg bg-white border border-slate-200">
                      <b>Enzim Biologi</b><br/>Protease &amp; amilase menyingkirkan kotoran protein (darah) dan kanji.
                    </div>
                    <div class="p-2 rounded-lg bg-white border border-slate-200">
                      <b>Agen Pemutih Optik</b><br/>Menyerap sinaran UV dan memancarkan cahaya biru menjadikan fabrik kelihatan lebih putih berseri.
                    </div>
                    <div class="p-2 rounded-lg bg-white border border-slate-200">
                      <b>Natrium Tripolifosfat</b><br/>Melembutkan air liat dengan mengikat ion Ca²⁺ dan Mg²⁺.
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
          mistake: 'Menganggap detergen tidak bertindak balas langsung dengan ion Ca²⁺ dan Mg²⁺ dalam air liat.',
          correction: 'Detergen MEMANG bertindak balas dengan ion Ca²⁺ dan Mg²⁺, TETAPI garam yang terhasil adalah LARUT DALAM AIR, maka tiada kekat terbentuk!',
          why: 'Garam kalsium sulfonat detergen larut, manakala garam kalsium karboksilat sabun tidak larut.'
        },
        {
          mistake: 'Menyatakan fungsi NaCl dalam saponifikasi adalah sebagai mangkin.',
          correction: 'NaCl BUKAN mangkin! Fungsinya ialah untuk memendakkan sabun melalui pengurangan keterlarutan (kesan ion sepunya Na⁺).',
          why: 'Alkali NaOH/KOH ialah reagen tindak balas saponifikasi.'
        }
      ],
      simulationRef: {
        id: 'pembuatan-sabun',
        title: 'Makmal Maya Pembuatan Sabun (Saponifikasi)',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=pembuatan-sabun',
        description: 'Jalankan eksperimen pendidihan minyak sawit dengan larutan NaOH pekat, tambah NaCl tepu untuk memendakkan sabun, dan terokai misel sabun secara interaktif.',
        previewBadge: 'Simulasi Sabun KSSM'
      },
      flashcards: [
        {
          id: 't5-b5-s2-fc1',
          front: 'Apakah nama proses penyediaan sabun dalam industri dan makmal?',
          back: 'Saponifikasi, iaitu hidrolisis beralkali bagi minyak atau lemak oleh larutan alkali pekat.'
        },
        {
          id: 't5-b5-s2-fc2',
          front: 'Apakah fungsi penambahan larutan natrium klorida (NaCl) tepu semasa pembuatan sabun?',
          back: 'Mengurangkan keterlarutan sabun dalam air (melalui kesan ion sepunya Na⁺) supaya mendakan pepejal sabun terapung ke permukaan.'
        },
        {
          id: 't5-b5-s2-fc3',
          front: 'Namakan dua bahagian utama dalam satu molekul sabun beserta sifat keterlarutannya.',
          back: '1. Ekor hidrofobik: rantai hidrokarbon panjang yang larut dalam gris/minyak dan tidak larut dalam air.\n2. Kepala hidrofilik: kumpulan ionik (—COO⁻) yang larut dalam air dan tidak larut dalam gris.'
        },
        {
          id: 't5-b5-s2-fc4',
          front: 'Apakah yang dimaksudkan dengan kekat (scum)?',
          back: 'Kekat ialah mendakan kelabu tak larut yang terbentuk apabila anion sabun bertindak balas dengan ion Ca²⁺ atau Mg²⁺ dalam air liat.'
        },
        {
          id: 't5-b5-s2-fc5',
          front: 'Mengapakah detergen lebih berkesan mencuci kotoran dalam air liat berbanding sabun?',
          back: 'Detergen tidak membentuk kekat kerana garam kalsium atau magnesium sulfonat yang terbentuk adalah larut dalam air.'
        }
      ],
      quiz: [
        {
          id: 't5-b5-s2-q1',
          question: 'Persamaan perkataan berikut mewakili penyediaan sabun di dalam makmal:\nMinyak sawit + Larutan natrium hidroksida pekat → Sabun + Sebatian Y\nApakah sebatian Y yang terhasil sebagai produk sampingan?',
          options: ['Etanol', 'Gliserol', 'Asid etanoik', 'Glukosa'],
          answerIndex: 1,
          explanation: 'Hidrolisis beralkali trigliserida memecahkan ikatan ester menghasilkan garam sabun dan gliserol (propana-1,2,3-triol) sebagai hasil sampingan.',
          level: 'Rendah'
        },
        {
          id: 't5-b5-s2-q2',
          question: 'Seorang murid mendidihkan minyak jagung bersama larutan kalium hidroksida, KOH pekat. Apakah sifat sabun yang terhasil berbanding jika menggunakan larutan natrium hidroksida, NaOH?',
          options: [
            'Sabun kalium lebih keras dan sukar larut dalam air',
            'Sabun kalium lebih lembut dan sesuai dijadikan cecair mandian atau krim pencuci muka',
            'Tiada sabun terbentuk kerana KOH bukan alkali kuat',
            'Sabun kalium menghasilkan kekat dalam air lembut'
          ],
          answerIndex: 1,
          explanation: 'Garam kalium bagi asid lemak (sabun kalium) mempunyai struktur lebih lembut dan mudah larut, lazimnya digunakan untuk membuat sabun mandi cecair dan krim pencuci muka.',
          level: 'Sederhana'
        },
        {
          id: 't5-b5-s2-q3',
          question: 'Semasa mencuci pakaian bergris menggunakan sabun dalam air bukit yang mengandungi ion kalsium (Ca²⁺), seorang suri rumah mendapati buih sukar terbentuk dan tompok mendakan kelabu melekat pada baju. Apakah bahan mendakan kelabu tersebut?',
          options: ['Kalsium karbonat', 'Kekat (Garam kalsium stearat/palmitat tak larut)', 'Gliserol pepejal', 'Natrium klorida'],
          answerIndex: 1,
          explanation: 'Air bukit ialah air liat yang kaya ion Ca²⁺. Anion sabun bertindak balas membentuk kalsium karboksilat tak larut yang dipanggil kekat (scum).',
          level: 'Rendah'
        },
        {
          id: 't5-b5-s2-q4',
          question: 'Bagaimanakah molekul sabun menghalang titisan gris yang telah ditanggalkan daripada bercantum semula dan mendak kembali ke atas fabrik?',
          options: [
            'Ekor hidrokarbon meneutralkan cas gris',
            'Kepala hidrofilik yang bercas negatif pada permukaan luar titisan emulsi gris saling menolak antara satu sama lain',
            'Gliserol membekukan titisan gris menjadi pepejal',
            'Molekul air memecahkan gris menjadi gas karbon dioksida'
          ],
          answerIndex: 1,
          explanation: 'Misel gris dikelilingi oleh kepala hidrofilik yang bercas negatif (—COO⁻). Cas negatif yang sama pada permukaan titisan gris saling menolak secara elektrostatik, menghalangnya daripada bercantum semula.',
          level: 'Sederhana',
          spmReference: 'SPM 2022 Kertas 1'
        },
        {
          id: 't5-b5-s2-q5',
          question: 'Detergen komersial sering ditambah dengan enzim biologi seperti protease dan amilase. Apakah fungsi utama enzim protease dalam serbuk pencuci?',
          options: [
            'Menanggalkan kotoran berasaskan protein seperti darah, telur dan susu pada suhu sederhana',
            'Menukarkan air liat menjadi air lembut',
            'Mewangikan fabrik dengan aroma buah-buahan',
            'Mencegah pembentukan buih berlebihan dalam mesin basuh'
          ],
          answerIndex: 0,
          explanation: 'Enzim protease memangkinkan hidrolisis kotoran protein degil (seperti darah dan telur) kepada asid amino larut air pada suhu basuhan biasa (30–40 °C).',
          level: 'Sederhana'
        },
        {
          id: 't5-b5-s2-q6',
          question: 'Pencemaran tasik dan sungai sering dikaitkan dengan pelepasan sisa detergen yang mengandungi sebatian natrium tripolifosfat (STPP). Apakah fenomena alam sekitar yang berlaku akibat kehadiran ion fosfat berlebihan ini?',
          options: [
            'Penipisan lapisan ozon',
            'Hujan asid',
            'Eutrofikasi yang menyebabkan pertumbuhan alga melampau dan kekurangan oksigen terlarut',
            'Kesan rumah hijau'
          ],
          answerIndex: 2,
          explanation: 'Ion fosfat bertindak sebagai nutrien yang menyuburkan pembiakan alga secara mendadak (algal bloom). Penguraian alga mati menggunakan banyak oksigen terlarut (BOD meningkat) menyebabkan hidupan akuatik mati lemas.',
          level: 'Tinggi (KBAT)'
        }
      ]
    },

    // ==========================================
    // SUBTOPIK 5.3
    // ==========================================
    {
      id: 't5-b5-s3',
      code: '5.3',
      title: 'Bahan Tambah Makanan',
      learningStandard: 'SP 5.3.1, 5.3.2',
      durationMinutes: 25,
      tldr: [
        'Bahan tambah makanan ialah bahan semula jadi atau sintetik yang ditambah ke dalam makanan untuk memelihara, memperelok rupa, rasa, dan tekstur makanan.',
        '7 Jenis bahan tambah: Pengawet, Pengantioksida, Perisa, Penstabil, Pemekat, Pewarna, dan Pengemulsi.',
        'Pengawet (cth: natrium benzoat, natrium nitrit, sulfur dioksida) melambatkan kerosakan makanan oleh mikroorganisma.',
        'Pengantioksida (cth: asid askorbik/Vitamin C, tokoferol, BHA) melambatkan pengoksidaan lemak/minyak daripada menjadi tengik.',
        'Pengambilan berlebihan boleh menyebabkan kesan sampingan seperti alergi, kanser (nitrosamina daripada nitrit), dan hiperaktif kanak-kanak (pewarna tiruan azo).'
      ],
      concepts: [
        {
          id: 't5-b5-s3-c1',
          title: '7 Jenis Bahan Tambah Makanan Rasmi DSKP & Fungsinya',
          badge: 'Klasifikasi Bahan Tambah Makanan',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">7 Kategori Bahan Tambah Makanan</span>
                <div class="overflow-x-auto">
                  <table class="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr class="bg-slate-100 text-slate-700 border-b border-slate-200">
                        <th class="p-2 font-bold">Kategori</th>
                        <th class="p-2 font-bold">Fungsi Utama</th>
                        <th class="p-2 font-bold">Contoh Bahan Kimia</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 text-slate-700 text-[11px]">
                      <tr>
                        <td class="p-2 font-bold text-rose-800">1. Pengawet</td>
                        <td class="p-2">Melambatkan atau menghalang pertumbuhan bakteria dan kulat supaya makanan tahan lebih lama.</td>
                        <td class="p-2">Natrium benzoat (jus/sos), Natrium nitrit/nitrat (sosej/burger), Sulfur dioksida (buah kering).</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-bold text-emerald-800">2. Pengantioksida</td>
                        <td class="p-2">Melambatkan pengoksidaan lemak dan minyak dalam makanan daripada menghasilkan bau dan rasa tengik.</td>
                        <td class="p-2">Asid askorbik (Vitamin C), Tokoferol (Vitamin E), BHA dan BHT.</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-bold text-amber-800">3. Perisa</td>
                        <td class="p-2">Meningkatkan rasa sedap atau aroma makanan serta menggantikan kehilangan rasa semasa pemprosesan.</td>
                        <td class="p-2">Mononatrium glutamat (MSG - umami), Aspartam (pemanis tiruan), Ester sintetik (etil etanoat).</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-bold text-purple-800">4. Penstabil</td>
                        <td class="p-2">Membantu mengekalkan campuran dua bahan yang tidak larut agar kekal sebati tanpa terpisah.</td>
                        <td class="p-2">Gelatin, Gam akasia, Agar-agar.</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-bold text-blue-800">5. Pemekat</td>
                        <td class="p-2">Memekatkan cecair makanan dan memberikan tekstur yang lebih licin dan pekat.</td>
                        <td class="p-2">Kanji termodifikasi, Pektin (jem buah), Gam xanthan.</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-bold text-indigo-800">6. Pewarna</td>
                        <td class="p-2">Menambah atau mengembalikan warna asal makanan yang hilang semasa pemprosesan.</td>
                        <td class="p-2">Tartrazina (kuning), Sunset Yellow, Karotenoid (semula jadi), Klorofil (hijau).</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-bold text-teal-800">7. Pengemulsi</td>
                        <td class="p-2">Membolehkan minyak dan air bercampur secara seragam membentuk emulsi yang stabil.</td>
                        <td class="p-2">Lesitin (dalam mayonis dan coklat), Monogliserida.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- KESAN SAMPINGAN -->
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-rose-900 uppercase tracking-wider block mb-2">Kesan Sampingan Pengambilan Berlebihan</span>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
                    <b class="text-rose-900 block mb-0.5">Karsinogenik (Kanser)</b>
                    <p class="text-[11px]">Natrium nitrit dalam daging burger boleh bertindak balas dengan amina membentuk <i>nitrosamina</i> yang boleh mencetuskan kanser usus.</p>
                  </div>
                  <div class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
                    <b class="text-rose-900 block mb-0.5">Alergi &amp; Asma</b>
                    <p class="text-[11px]">Sulfur dioksida dan natrium benzoat boleh mencetuskan serangan lelah (asma) dan gatal-gatal kulit pada individu sensitif.</p>
                  </div>
                  <div class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
                    <b class="text-rose-900 block mb-0.5">Hiperaktif Kanak-Kanak</b>
                    <p class="text-[11px]">Pewarna tiruan seperti tartrazina dikaitkan dengan sindrom kurang tumpuan dan hiperaktif (ADHD) dalam kalangan kanak-kanak.</p>
                  </div>
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menganggap pengantioksida membunuh bakteria seperti pengawet.',
          correction: 'Pengantioksida menghalang PENGOKSIDAAN LEMAK menjadi tengik, manakala pengawet menghalang pertumbuhan MIKROORGANISMA (bakteria/kulat)!',
          why: 'Ini adalah dua fungsi berbeza yang kerap tertukar dalam peperiksaan.'
        }
      ],
      flashcards: [
        {
          id: 't5-b5-s3-fc1',
          front: 'Apakah fungsi bahan pengawet dalam makanan?',
          back: 'Melambatkan atau menghalang pembiakan bakteria dan kulat supaya makanan tidak cepat rosak dan tahan lebih lama.'
        },
        {
          id: 't5-b5-s3-fc2',
          front: 'Bagaimanakah bahan pengantioksida berfungsi melindungi makanan berminyak?',
          back: 'Ia bertindak balas dengan radikal bebas oksigen untuk menghalang lemak atau minyak daripada dioksidakan dan menjadi tengik.'
        },
        {
          id: 't5-b5-s3-fc3',
          front: 'Berikan satu contoh bahan pengemulsi semula jadi dan makanan yang menggunakannya.',
          back: 'Lesitin (kuning telur), digunakan dalam mayonis dan coklat untuk mencampurkan fasa minyak dan fasa air secara seragam.'
        },
        {
          id: 't5-b5-s3-fc4',
          front: 'Mengapakah natrium nitrit digunakan dalam pemprosesan daging burger dan sosej?',
          back: 'Sebagai pengawet untuk mencegah bakteria Clostridium botulinum dan mengekalkan warna merah segar daging.'
        },
        {
          id: 't5-b5-s3-fc5',
          front: 'Apakah risiko kesihatan yang dikaitkan dengan pengambilan pewarna tiruan tartrazina secara berlebihan oleh kanak-kanak?',
          back: 'Boleh menyebabkan alahan kulit, ruam gatal dan masalah tingkah laku hiperaktif (ADHD).'
        }
      ],
      quiz: [
        {
          id: 't5-b5-s3-q1',
          question: 'Bahan kimia manakah yang ditambah ke dalam jus buah-buahan dan sos cili untuk bertindak sebagai pengawet?',
          options: ['Natrium benzoat', 'Asid askorbik', 'Tartrazina', 'Aspartam'],
          answerIndex: 0,
          explanation: 'Natrium benzoat ialah bahan pengawet yang sangat berkesan merencatkan pembiakan kulat dan yis dalam makanan dan minuman berasid seperti jus dan sos.',
          level: 'Rendah'
        },
        {
          id: 't5-b5-s3-q2',
          question: 'Kerepek kentang yang dibungkus dalam beg kerajang aluminium sering ditambah dengan asid askorbik (Vitamin C). Apakah fungsi asid askorbik dalam kerepek kentang ini?',
          options: [
            'Menambah rasa manis',
            'Bertindak sebagai pengantioksida untuk menghalang minyak daripada dioksidakan menjadi tengik',
            'Memberikan warna kuning keemasan',
            'Memekatkan larutan perisa'
          ],
          answerIndex: 1,
          explanation: 'Asid askorbik bertindak sebagai pengantioksida yang menghalang minyak pada kerepek daripada dioksidakan oleh oksigen udara yang menyebabkan bau dan rasa tengik.',
          level: 'Sederhana'
        },
        {
          id: 't5-b5-s3-q3',
          question: 'Mayonis mengandungi campuran minyak sayuran dan cuka yang tidak boleh bercampur secara semula jadi. Apakah bahan tambah yang ditambah untuk menstabilkan emulsi mayonis tersebut?',
          options: ['Pengemulsi seperti lesitin', 'Pengawet natrium nitrat', 'Pewarna sunset yellow', 'Pemanis sakarin'],
          answerIndex: 0,
          explanation: 'Lesitin dalam kuning telur bertindak sebagai pengemulsi yang mempunyai bahagian larut air dan bahagian larut minyak, membolehkan minyak dan cuka bercampur membentuk emulsi mayonis yang stabil.',
          level: 'Rendah'
        },
        {
          id: 't5-b5-s3-q4',
          question: 'Pemanasan berlebihan daging yang diawet dengan natrium nitrit boleh menghasilkan sebatian kimia toksik yang berbahaya kepada kesihatan. Apakah nama sebatian tersebut?',
          options: ['Nitrosamina yang bersifat karsinogenik', 'Asid hidroklorik', 'Gas sulfur dioksida', 'Mononatrium glutamat'],
          answerIndex: 0,
          explanation: 'Pada suhu memasak yang tinggi (seperti menggoreng burger/bacon), ion nitrit bertindak balas dengan amina dalam protein daging membentuk nitrosamina yang terbukti merupakan bahan karsinogenik (pencetus kanser).',
          level: 'Sederhana'
        },
        {
          id: 't5-b5-s3-q5',
          question: 'Seorang pesakit kencing manis (diabetes) ingin menikmati minuman manis tanpa meningkatkan aras glukosa darahnya. Bahan tambah makanan manakah yang paling sesuai disyorkan?',
          options: ['Gula tebu (Sukrosa)', 'Aspartam atau Stevia', 'Mononatrium glutamat (MSG)', 'Kanji termodifikasi'],
          answerIndex: 1,
          explanation: 'Aspartam dan stevia ialah pemanis tiruan berintensiti tinggi yang memberikan rasa manis tanpa membekalkan kalori atau meningkatkan paras glukosa dalam darah.',
          level: 'Rendah'
        },
        {
          id: 't5-b5-s3-q6',
          question: 'Pekatan puri buah nanas yang diproses menjadi jem memerlukan penambahan pektin. Apakah peranan pektin dalam pembuatan jem buah?',
          options: [
            'Bertindak sebagai pemekat yang membentuk tekstur gel likat pada jem',
            'Sebagai pewarna kuning tiruan',
            'Sebagai agen pemutih',
            'Sebagai antibakteria kuat'
          ],
          answerIndex: 0,
          explanation: 'Pektin ialah polimer karbohidrat semula jadi yang bertindak sebagai pemekat membentuk konsistensi gel likat yang sempurna pada jem buah-buahan.',
          level: 'Sederhana'
        }
      ]
    },

    // ==========================================
    // SUBTOPIK 5.4
    // ==========================================
    {
      id: 't5-b5-s4',
      code: '5.4',
      title: 'Ubat-ubatan dan Kosmetik',
      learningStandard: 'SP 5.4.1, 5.4.2, 5.4.3',
      durationMinutes: 30,
      tldr: [
        'Ubat tradisional diperoleh terus daripada sumber tumbuhan atau haiwan herba tanpa pemprosesan kimia (cth: halia, kunyit, aloe vera).',
        'Ubat moden dikelaskan kepada: Analgesik (aspirin, parasetamol, kodeina), Antibiotik (penisilin), Ubat Psikotik (stimulan, antidepresan), Antialergi (antihistamin), dan Kortikosteroid.',
        'Aspirin bersifat asid dan boleh menyebabkan pendarahan dalaman perut serta dilarang untuk kanak-kanak.',
        'Antibiotik WAJIB dihabiskan mengikut dos preskripsi bagi mengelakkan bakteria rintang/kebal.',
        'Kosmetik terbahagi kepada rias, rawatan dan pewangi; bahan terlarang seperti merkuri, hidrokuinon dan plumbum merosakkan kulit, buah pinggang dan sistem saraf.'
      ],
      concepts: [
        {
          id: 't5-b5-s4-c1',
          title: 'Ubat Tradisional vs Ubat Moden (Analgesik & Antibiotik)',
          badge: 'Farmakologi SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">Perbandingan Sumber Perubatan</span>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <b class="text-emerald-900 block font-bold mb-1">Ubat Tradisional (Herba Semula Jadi):</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      <li><b>Halia:</b> Menyingkirkan angin dalam badan dan melegakan loya.</li>
                      <li><b>Lidah buaya (Aloe vera):</b> Merawat luka lecur dan melembapkan kulit.</li>
                      <li><b>Kunyit:</b> Mengandungi kurkumin sebagai antioksida dan antiseptik.</li>
                      <li><b>Misai kucing:</b> Merawat darah tinggi dan melancarkan perkumuhan air kencing.</li>
                    </ul>
                  </div>

                  <div class="p-3 rounded-xl bg-blue-50 border border-blue-200">
                    <b class="text-blue-900 block font-bold mb-1">Ubat Moden Disintesis:</b>
                    <p class="text-[11px] text-slate-700 mb-1">Dihasilkan melalui sintesis kimia berpandukan kajian klinikal dos tepat:</p>
                    <ul class="list-disc pl-4 space-y-0.5 text-slate-700 text-[11px]">
                      <li>Analgesik (melegakan kesakitan).</li>
                      <li>Antibiotik (membunuh jangkitan bakteria).</li>
                      <li>Ubat psikotik (merawat gangguan mental).</li>
                      <li>Kortikosteroid (antiradang parah).</li>
                    </ul>
                  </div>
                </div>

                <!-- ANALGESIK -->
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">3 Jenis Analgesik Utama (Ubat Tahan Sakit)</span>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-rose-900 block mb-0.5">Aspirin (Asid Asetilsalisilik)</b>
                    <p class="text-[11px] text-slate-700">Bersifat asid. Melegakan sakit kepala dan mengelakkan pembekuan darah. <b>Awas:</b> Menyebabkan ulser perut; dilarang untuk kanak-kanak kerana risiko sindrom Reye.</p>
                  </div>
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-sky-900 block mb-0.5">Parasetamol</b>
                    <p class="text-[11px] text-slate-700">Melegakan demam dan sakit ringan. Selamat untuk perut dan kanak-kanak. <b>Awas:</b> Dos berlebihan menyebabkan kerosakan organ hati yang parah.</p>
                  </div>
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-purple-900 block mb-0.5">Kodeina (Narkotik)</b>
                    <p class="text-[11px] text-slate-700">Ubat tahan sakit kuat berasaskan candu untuk melegakan batuk kering dan sakit teruk. Boleh menyebabkan ketagihan jika disalahgunakan.</p>
                  </div>
                </div>

                <div class="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                  <b class="text-amber-900 block font-bold mb-1">Kepentingan Menghabiskan Dos Antibiotik:</b>
                  <p class="text-[11px] leading-relaxed">
                    Antibiotik (contoh: penisilin, amoksisilin) membunuh bakteria patogen. Pesakit <b>WAJIB menghabiskan seluruh dos antibiotik yang dipreskripsikan oleh doktor</b> walaupun telah sembuh. Jika tidak, bakteria yang masih hidup akan bermutasi dan membentuk <b>ketahanan antibiotik (rintangan bakteria / superbug)</b> yang sukar diubati pada masa hadapan!
                  </p>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b5-s4-c2',
          title: 'Kosmetik & Bahaya Bahan Kimia Terlarang',
          badge: 'Keselamatan Kosmetik',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">3 Kategori Kosmetik</span>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs mb-3">
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-800 block mb-0.5">Kosmetik Rias</b>
                    <p class="text-[11px] text-slate-600">Mencantikkan wajah (gincu, bedak asas, maskara, pemerah pipi).</p>
                  </div>
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-800 block mb-0.5">Kosmetik Rawatan</b>
                    <p class="text-[11px] text-slate-600">Merawat kulit (krim pelembap, losyen jerawat, pembersih muka).</p>
                  </div>
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-800 block mb-0.5">Kosmetik Pewangi</b>
                    <p class="text-[11px] text-slate-600">Memberikan aroma harum (minyak wangi, semburan badan, deodoran).</p>
                  </div>
                </div>

                <!-- RACUN TERLARANG -->
                <span class="text-xs font-bold text-rose-900 uppercase tracking-wider block mb-2">Bahan Kimia Terlarang Berbahaya dalam Kosmetik</span>
                <div class="space-y-2 text-xs">
                  <div class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
                    <b class="text-rose-900 block font-bold mb-0.5">1. Merkuri (Raksa):</b>
                    <p class="text-[11px]">Sering dicampur secara haram dalam krim pemutih wajah. Merosakkan buah pinggang, sistem saraf, dan menyebabkan ruam serta kerengsaan kulit yang teruk.</p>
                  </div>
                  <div class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
                    <b class="text-rose-900 block font-bold mb-0.5">2. Hidrokuinon &amp; Tretinoin:</b>
                    <p class="text-[11px]">Menghalang penghasilan melanin untuk memutihkan kulit secara agresif. Menyebabkan kulit menjadi nipis, merah terbakar, pigmentasi kekal, dan hipersensitif terhadap sinaran UV.</p>
                  </div>
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Mengesyorkan aspirin untuk kanak-kanak yang mengalami demam denggi atau demam campak.',
          correction: 'Aspirin DILARANG sama sekali untuk pesakit demam denggi/kanak-kanak kerana sifat anti-pembekuan darahnya boleh mencetuskan pendarahan dalaman perut yang membawa maut!',
          why: 'Parasetamol adalah analgesik yang selamat untuk kanak-kanak dan pesakit demam denggi.'
        }
      ],
      flashcards: [
        {
          id: 't5-b5-s4-fc1',
          front: 'Mengapakah aspirin tidak sesuai diambil oleh pesakit yang menghidap gastrik atau ulser perut?',
          back: 'Aspirin bersifat asid (asid asetilsalisilik) dan boleh menghakis lapisan mukosa dinding perut menyebabkan pedih ulu hati dan pendarahan dalaman.'
        },
        {
          id: 't5-b5-s4-fc2',
          front: 'Mengapakah pesakit wajib menghabiskan seluruh dos antibiotik yang dipreskripsikan oleh doktor?',
          back: 'Bagi memastikan semua bakteria penyebab penyakit dibunuh sepenuhnya dan mengelakkan bakteria bermutasi menjadi kebal (rintangan antibiotik).'
        },
        {
          id: 't5-b5-s4-fc3',
          front: 'Apakah perbezaan kegunaan antara analgesik parasetamol dan kodeina?',
          back: 'Parasetamol melegakan kesakitan ringan dan demam tanpa rasa khayal, manakala kodeina ialah ubat narkotik kuat untuk melegakan kesakitan teruk dan batuk kering.'
        },
        {
          id: 't5-b5-s4-fc4',
          front: 'Namakan satu tumbuhan herba tradisional tempatan dan nyatakan khasiat perubatannya.',
          back: 'Halia (membuang angin/melegakan loya) ATAU Lidah buaya (merawat luka lecur kulit) ATAU Kunyit (antiseptik/antioksida).'
        },
        {
          id: 't5-b5-s4-fc5',
          front: 'Apakah kesan sampingan merkuri yang dicampur secara haram ke dalam krim pemutih kosmetik?',
          back: 'Merkuri diserap melalui kulit merosakkan buah pinggang, mengganggu sistem saraf otak, dan menyebabkan kulit mengelupas teruk.'
        }
      ],
      quiz: [
        {
          id: 't5-b5-s4-q1',
          question: 'Seorang pesakit mengalami sakit kepala dan ulser gastrik pada masa yang sama. Ubat tahan sakit (analgesik) manakah yang paling selamat diambil oleh pesakit ini?',
          options: ['Aspirin', 'Parasetamol', 'Asid asetilsalisilik', 'Kodeina dos tinggi'],
          answerIndex: 1,
          explanation: 'Parasetamol tidak berasid dan tidak merengsakan lapisan dinding perut, menjadikannya pilihan selamat untuk pesakit yang mempunyai ulser gastrik.',
          level: 'Rendah'
        },
        {
          id: 't5-b5-s4-q2',
          question: 'Seorang remaja berhenti mengambil ubat antibiotik penisilin pada hari ketiga kerana berasa sudah sihat, walaupun doktor mempreskripsikan dos untuk tujuh hari. Apakah akibat jangka panjang daripada tindakannya itu?',
          options: [
            'Badannya akan menghasilkan lebih banyak antibodi',
            'Bakteria yang belum mati akan berkembang biak dan menjadi kebal terhadap penisilin (rintangan antibiotik)',
            'Dia akan menghidap penyakit anemia',
            'Suhu badannya akan turun di bawah paras normal'
          ],
          answerIndex: 1,
          explanation: 'Menghentikan antibiotik sebelum tamat tempoh membolehkan bakteria yang tinggal bermutasi menghasilkan strain bakteria kebal (antibiotic resistance) yang tidak lagi bertindak balas terhadap antibiotik tersebut.',
          level: 'Sederhana',
          spmReference: 'SPM 2023 Kertas 1'
        },
        {
          id: 't5-b5-s4-q3',
          question: 'Apakah kegunaan utama ubat jenis kortikosteroid dalam bidang perubatan?',
          options: [
            'Membunuh bakteria tuberkulosis',
            'Mengurangkan keradangan dan bengkak parah bagi pesakit asma dan artritis',
            'Menurunkan tekanan darah tinggi',
            'Menggantikan cecair elektrolit badan'
          ],
          answerIndex: 1,
          explanation: 'Kortikosteroid (seperti prednisolon) ialah ubat antiradang yang sangat kuat untuk mengurangkan pembengkakan saluran pernafasan pesakit asma dan radang sendi.',
          level: 'Sederhana'
        },
        {
          id: 't5-b5-s4-q4',
          question: 'Kementerian Kesihatan Malaysia (KKM) telah mengharamkan penjualan produk krim pencerah kulit X kerana dikesan mengandungi merkuri. Apakah bahaya merkuri kepada pengguna?',
          options: [
            'Menyebabkan gigi reput',
            'Kerosakan buah pinggang dan kerosakan sistem saraf',
            'Menyebabkan keguguran rambut secara kekal',
            'Menjadikan kulit kebal terhadap sabun'
          ],
          answerIndex: 1,
          explanation: 'Merkuri (raksa) diserap melalui liang roma kulit ke dalam aliran darah dan terkumpul di buah pinggang dan sistem saraf otak, menyebabkan kerosakan organ kekal.',
          level: 'Rendah'
        },
        {
          id: 't5-b5-s4-q5',
          question: 'Tumbuhan herba manakah yang sering digunakan secara tradisional untuk merawat luka terbakar atau kesan lecur pada kulit?',
          options: ['Halia', 'Lidah buaya (Aloe vera)', 'Ginseng', 'Bunga cengkih'],
          answerIndex: 1,
          explanation: 'Gel lendir lidah buaya mengandungi sebatian yang menyejukkan, melembapkan, dan mempercepatkan penyembuhan tisu kulit yang terbakar atau luka lecur.',
          level: 'Rendah'
        },
        {
          id: 't5-b5-s4-q6',
          question: 'Ubat penenang (tranquiliser) tergolong dalam kumpulan ubat psikotik. Apakah fungsi utama ubat penenang ini?',
          options: [
            'Meredakan rasa resah, cemas dan merawat ketegangan saraf emosi',
            'Membunuh virus influenza',
            'Meningkatkan kadar denyutan jantung secara mendadak',
            'Mempercepatkan pembekuan darah luka'
          ],
          answerIndex: 0,
          explanation: 'Ubat penenang (antidepresan/tranquiliser seperti diazepam) bertindak ke atas sistem saraf pusat untuk meredakan kegelisahan, kebimbangan dan membantu pesakit tidur tenang.',
          level: 'Sederhana'
        }
      ]
    },

    // ==========================================
    // SUBTOPIK 5.5
    // ==========================================
    {
      id: 't5-b5-s5',
      code: '5.5',
      title: 'Aplikasi Nanoteknologi dalam Industri & Teknologi Hijau',
      learningStandard: 'SP 5.5.1, 5.5.2',
      durationMinutes: 25,
      tldr: [
        'Nanoteknologi ialah sains memanipulasi bahan pada skala saiz 1 hingga 100 nanometer (1 nm = 10⁻⁹ m).',
        'Zarah skala nano mempunyai nisbah luas permukaan kepada isi padu yang amat tinggi, mengubah sifat fizikal, kimia dan optik bahan secara dramatik.',
        'Grafen ialah alotrop karbon kepingan satu atom tebal yang 100 kali lebih kuat daripada keluli, konduktor elektrik/haba terunggul dan lut sinar.',
        'Zarah nano zink oksida (ZnO) dan titanium dioksida (TiO₂) dalam krim pelindung matahari bertindak lut sinar dan menghalang sinaran UV.',
        'Teknologi Hijau memelihara alam sekitar melalui pengurangan pelepasan karbon, kereta elektrik (EV), tenaga solar, dan rawatan sisa mampan.'
      ],
      concepts: [
        {
          id: 't5-b5-s5-c1',
          title: 'Definisi Nanoteknologi & Keajaiban Alotrop Grafen',
          badge: 'Sains Bahan Termaju',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">Skala Nano (1 hingga 100 nm)</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  <b>Nanoteknologi</b> melibatkan penerokaan, pemprosesan dan manipulasi zarah jirim pada dimensi antara <b>1 hingga 100 nanometer (nm)</b>, di mana <span class="font-mono font-bold text-sky-900">1 nm = 10⁻⁹ meter</span> (seperseribu juta meter!).
                </p>

                <!-- GRAFEN -->
                <div class="p-3.5 rounded-2xl bg-slate-900 text-white mb-3 shadow-inner">
                  <div class="text-xs font-bold text-sky-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-sky-400"></span>
                    Grafen (Graphene) — Bahan Ajaib Abad Ke-21
                  </div>
                  <p class="text-[11px] text-slate-300 leading-relaxed mb-2">
                    Grafen ialah alotrop karbon yang terdiri daripada satu lapisan atom karbon tunggal yang tersusun dalam kekisi heksagon seperti sarang lebah:
                  </p>
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px]">
                    <div class="p-2 rounded-lg bg-white/10 border border-white/10">
                      <b class="text-sky-300 block text-xs">Kekuatan Tinggi</b>
                      100–300 kali lebih kuat daripada keluli
                    </div>
                    <div class="p-2 rounded-lg bg-white/10 border border-white/10">
                      <b class="text-emerald-300 block text-xs">Konduktor Cemerlang</b>
                      Mengalirkan elektrik &amp; haba lebih pantas dari kuprum
                    </div>
                    <div class="p-2 rounded-lg bg-white/10 border border-white/10">
                      <b class="text-amber-300 block text-xs">Ketelusan Cahaya</b>
                      97.7% lut sinar kepada cahaya tampak
                    </div>
                    <div class="p-2 rounded-lg bg-white/10 border border-white/10">
                      <b class="text-purple-300 block text-xs">Sangat Fleksibel</b>
                      Boleh dilentur dan diregang sehingga 20%
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-800 block mb-1">Aplikasi Zarah Nano Kosmetik:</b>
                    <p class="text-[11px] text-slate-700 leading-relaxed">
                      Zarah <b>zink oksida (ZnO)</b> dan <b>titanium dioksida (TiO₂)</b> pada saiz nano digunakan dalam krim pelindung matahari (sunscreen). Pada skala nano, bahan ini menjadi <b>lut sinar sepenuhnya</b> (tidak meninggalkan kesan tompok putih kapur pada kulit) di samping memantulkan sinaran UV berbahaya dengan sangat berkesan.
                    </p>
                  </div>

                  <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                    <b class="text-emerald-900 block font-bold mb-1">Teknologi Hijau (Green Technology):</b>
                    <p class="text-[11px] leading-relaxed">
                      Pembangunan teknologi mampan yang mengurangkan pelepasan gas rumah hijau, menjimatkan tenaga dan memelihara alam sekitar:
                    </p>
                    <ul class="list-disc pl-4 space-y-0.5 text-[10px] text-emerald-900 mt-1">
                      <li>Kenderaan elektrik (EV) dengan bateri litium-ion / grafen berkecekapan tinggi.</li>
                      <li>Tenaga solar fotovoltaik dan hidrogen hijau.</li>
                      <li>Bioplastik terbiodegradasi menggantikan plastik petroleum.</li>
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
          mistake: 'Menganggap grafen dan grafit mempunyai sifat kekonduksian dan kekuatan yang sama.',
          correction: 'Grafit terdiri daripada banyak lapisan yang menggelongsor (lembut), manakala grafen ialah SATU LAPISAN TUNGGAL yang amat kuat (100x lebih kuat daripada keluli)!',
          why: 'Ketebalan satu atom menjadikan grafen bahan terkuat di dunia.'
        }
      ],
      flashcards: [
        {
          id: 't5-b5-s5-fc1',
          front: 'Berapakah julat saiz zarah bagi bahan dalam bidang nanoteknologi?',
          back: 'Antara 1 hingga 100 nanometer (1 nm = 10⁻⁹ meter).'
        },
        {
          id: 't5-b5-s5-fc2',
          front: 'Apakah grafen dan bagaimanakah susunan atom karbonnya?',
          back: 'Grafen ialah alotrop karbon kepingan satu atom tebal yang tersusun dalam bentuk kekisi heksagon dua dimensi sarang lebah.'
        },
        {
          id: 't5-b5-s5-fc3',
          front: 'Nyatakan dua kelebihan luar biasa grafen berbanding bahan konvensional.',
          back: '1. Amat kuat (100–300 kali lebih kuat daripada keluli).\n2. Konduktor elektrik dan haba terbaik di dunia serta lut sinar dan sangat fleksibel.'
        },
        {
          id: 't5-b5-s5-fc4',
          front: 'Apakah kelebihan penggunaan zarah nano zink oksida (ZnO) dalam krim pelindung matahari?',
          back: 'Ia bersifat lut sinar pada kulit tanpa meninggalkan kesan putih kapur sambil memantulkan sinaran ultraungu (UV) dengan sangat berkesan.'
        },
        {
          id: 't5-b5-s5-fc5',
          front: 'Apakah matlamat utama pengamalan Teknologi Hijau dalam industri kimia?',
          back: 'Mengurangkan pelepasan karbon dan bahan buangan toksik, memulihara sumber tenaga serta meminimumkan impak negatif aktiviti manusia terhadap alam sekitar.'
        }
      ],
      quiz: [
        {
          id: 't5-b5-s5-q1',
          question: 'Satu nanometer bersamaan dengan berapakah nilai dalam unit meter?',
          options: ['10⁻³ m', '10⁻⁶ m', '10⁻⁹ m', '10⁻¹² m'],
          answerIndex: 2,
          explanation: '1 nanometer (nm) ialah satu per seribu juta meter, iaitu 10⁻⁹ m.',
          level: 'Rendah'
        },
        {
          id: 't5-b5-s5-q2',
          question: 'Antara berikut, pernyataan manakah yang BENAR mengenai alotrop karbon grafen?',
          options: [
            'Ia merupakan penebat elektrik yang sangat kuat',
            'Ia terdiri daripada lapisan atom karbon setebal satu atom dengan kekisi heksagon yang 100 kali lebih kuat daripada keluli',
            'Ia mudah reput apabila terdedah kepada udara',
            'Ia legap sepenuhnya dan menyerap semua cahaya'
          ],
          answerIndex: 1,
          explanation: 'Grafen ialah kepingan karbon setebal satu atom dengan susunan heksagon sarang lebah, mempunyai kekuatan mekanikal 100–300 kali lebih kuat daripada keluli.',
          level: 'Rendah'
        },
        {
          id: 't5-b5-s5-q3',
          question: 'Mengapakah zarah bahan pada skala nano (1–100 nm) mempamerkan kadar tindak balas dan kereaktifan kimia yang jauh lebih tinggi berbanding saiz pukalnya?',
          options: [
            'Kerana zarah nano mempunyai nisbah luas permukaan kepada isi padu yang amat tinggi',
            'Kerana zarah nano mengandungi cas elektrik tambahan',
            'Kerana zarah nano tidak mempunyai nukleus atom',
            'Kerana takat leburnya meningkat secara mendadak'
          ],
          answerIndex: 0,
          explanation: 'Saiz zarah yang amat halus menghasilkan nisbah jumlah luas permukaan kepada isi padu yang sangat besar, mendedahkan lebih banyak atom di permukaan untuk bertindak balas dengan pantas.',
          level: 'Sederhana'
        },
        {
          id: 't5-b5-s5-q4',
          question: 'Krim pelindung matahari moden menggunakan formulasi zarah nano zink oksida (ZnO). Apakah kelebihan estetik utama krim pelindung matahari berasaskan nanoteknologi ini kepada pengguna?',
          options: [
            'Ia memberikan warna kulit menjadi perang keemasan',
            'Ia menjadi lut sinar sepenuhnya pada kulit tanpa meninggalkan sisa tompokan putih kapur',
            'Ia mewangikan kulit sepanjang hari',
            'Ia bertindak sebagai ubat antibiotik jerawat'
          ],
          answerIndex: 1,
          explanation: 'Zarah nano ZnO terlalu halus untuk menyerakkan cahaya tampak, menjadikannya kelihatan jernih/lut sinar pada kulit sambil mengekalkan keupayaan memantulkan sinaran UV berbahaya.',
          level: 'Sederhana'
        },
        {
          id: 't5-b5-s5-q5',
          question: 'Antara berikut, yang manakah merupakan aplikasi Teknologi Hijau dalam sektor pengangkutan?',
          options: [
            'Penggunaan arang batu sebagai bahan api kereta api',
            'Pembangunan kenderaan elektrik (EV) yang dikuasakan oleh bateri berkecekapan tinggi tanpa pelepasan ekzos',
            'Penambahan sulfur dalam petrol kenderaan',
            'Membakar tayar untuk menggerakkan turbin enjin'
          ],
          answerIndex: 1,
          explanation: 'Kenderaan elektrik (EV) mengurangkan kebergantungan kepada bahan api fosil dan mempunyai sifar pelepasan gas ekzos rumah hijau (zero emission), merupakan tunjang Teknologi Hijau pengangkutan.',
          level: 'Rendah'
        },
        {
          id: 't5-b5-s5-q6',
          question: 'Grafen sangat berpotensi digunakan untuk menghasilkan skrin sesentuh telefon pintar generasi baharu. Apakah dua sifat fizikal grafen yang menyokong aplikasi canggih ini?',
          options: [
            'Lut sinar kepada cahaya tampak dan mempunyai kekonduksian elektrik yang sangat tinggi serta fleksibel',
            'Legap dan bersifat magnetik',
            'Takat lebur sangat rendah dan mudah larut dalam air',
            'Penebat elektrik dan sangat rapuh'
          ],
          answerIndex: 0,
          explanation: 'Grafen adalah 97.7% telus kepada cahaya (lut sinar), konduktor elektrik cemerlang untuk penderiaan sentuhan, dan sangat elastik/fleksibel untuk skrin boleh lipat.',
          level: 'Tinggi (KBAT)'
        }
      ]
    }
  ]
};
