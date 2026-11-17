import { Chapter } from '../types/nota';

export const T5_BAB4: Chapter = {
  id: 't5-b4',
  form: 'T5',
  chapterNumber: 4,
  title: 'Kimia Polimer',
  theme: 'Bahan & Pempolimeran',
  durationMinutes: 120,
  subtopicCount: 3,
  iconName: 'Network',
  description: 'Meneroka polimer semula jadi & sintetik, mekanisme pempolimeran penambahan & kondensasi, ciri-ciri getah asli, penggumpalan lateks, pemvulkanan getah, getah sintetik serta kelestarian pengurusan sisa polimer.',
  subtopics: [
    // ==========================================
    // SUBTOPIK 4.1
    // ==========================================
    {
      id: 't5-b4-s1',
      code: '4.1',
      title: 'Polimer',
      learningStandard: 'SP 4.1.1, 4.1.2, 4.1.3',
      durationMinutes: 40,
      tldr: [
        'Polimer ialah molekul berantai panjang yang terbina daripada cantuman berulang unit-unit kecil yang dipanggil monomer.',
        'Pengelasan berasaskan sumber: Polimer Semula Jadi (getah asli, kanji, selulosa, protein) dan Polimer Sintetik (politena, polipropena, PVC, nilon, terilena).',
        'Pengelasan ciri haba: Termoplastik (boleh diacu berulang kali), Termoset (hanya boleh diacu sekali, hangus jika dipanaskan), dan Elastomer (sangat kenyal, kembali ke bentuk asal).',
        'Pempolimeran Penambahan melibatkan monomer dengan ikatan ganda dua C=C tanpa sebarang hasil sampingan.',
        'Pempolimeran Kondensasi melibatkan monomer berbeza kumpulan berfungsi bersama penyingkiran molekul kecil seperti air (H₂O) atau hidrogen klorida (HCl).'
      ],
      concepts: [
        {
          id: 't5-b4-s1-c1',
          title: 'Maksud Polimer & Pengelasan Polimer',
          badge: 'Klasifikasi Polimer SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">Definisi Polimer &amp; Monomer</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  <b>Polimer</b> ialah molekul berantai panjang dengan jisim molekul relatif yang sangat besar, terbentuk daripada gabungan berulang banyak unit molekul kecil yang dikenali sebagai <b>monomer</b> melalui tindak balas <b>pempolimeran</b>.
                </p>

                <!-- PENGELASAN BERASASKAN SUMBER -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <b class="text-emerald-900 block font-bold mb-1">1. Polimer Semula Jadi:</b>
                    <p class="text-[11px] text-slate-700 mb-2">Polimer yang wujud secara semula jadi dalam hidupan tumbuhan dan haiwan:</p>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      <li><b>Getah Asli:</b> Monomernya ialah <i>isoprena</i> (2-metilbuta-1,3-diena).</li>
                      <li><b>Kanji:</b> Monomernya ialah <i>glukosa</i> (simpanan tenaga tumbuhan).</li>
                      <li><b>Selulosa:</b> Monomernya ialah <i>glukosa</i> (dinding sel tumbuhan).</li>
                      <li><b>Protein:</b> Monomernya ialah <i>asid amino</i> (otot, rambut, enzim).</li>
                    </ul>
                  </div>

                  <div class="p-3 rounded-xl bg-blue-50 border border-blue-200">
                    <b class="text-blue-900 block font-bold mb-1">2. Polimer Sintetik:</b>
                    <p class="text-[11px] text-slate-700 mb-2">Polimer buatan manusia yang disintesis daripada bahan kimia petroleum:</p>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      <li><b>Politena (Polietilena):</b> Monomer etena (beg plastik, botol).</li>
                      <li><b>Polipropena:</b> Monomer propena (tali plastik, bekas makanan).</li>
                      <li><b>Polivinil klorida (PVC):</b> Monomer kloroetena (paip air, penebat wayar).</li>
                      <li><b>Nilon (Poliamida):</b> Gentian sintetik (tali pancing, fabrik pakaian).</li>
                      <li><b>Terilena / Dacron (Poliester):</b> Gentian tekstil (baju kemeja, payung).</li>
                    </ul>
                  </div>
                </div>

                <!-- PENGELASAN CIRI HABA -->
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">Pengelasan Berasaskan Ciri-Ciri terhadap Haba</span>
                <div class="overflow-x-auto">
                  <table class="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr class="bg-slate-100 text-slate-700 border-b border-slate-200">
                        <th class="p-2 font-bold">Kategori Polimer</th>
                        <th class="p-2 font-bold">Ciri terhadap Pemanasan</th>
                        <th class="p-2 font-bold">Struktur Rantai Molekul</th>
                        <th class="p-2 font-bold">Contoh Polimer</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 text-slate-700 text-[11px]">
                      <tr>
                        <td class="p-2 font-bold text-sky-800">Termoplastik</td>
                        <td class="p-2">Melembut apabila dipanaskan dan mengeras apabila disejukkan; boleh diacu semula berulang kali.</td>
                        <td class="p-2">Rantai linear atau bercabang; tiada rangkai silang antara rantai.</td>
                        <td class="p-2">Politena, PVC, Polipropena, Polistirena.</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-bold text-rose-800">Termoset</td>
                        <td class="p-2">Hanya boleh diacu sekali sahaja semasa pembuatan; tidak melebur apabila dipanaskan semula tetapi mengurai/hangus pada suhu tinggi.</td>
                        <td class="p-2">Mempunyai banyak rangkai silang tiga dimensi yang sangat kuat antara rantai.</td>
                        <td class="p-2">Bakelit (palam elektrik, pemegang kuali), Melamina, Resin epoksi.</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-bold text-emerald-800">Elastomer</td>
                        <td class="p-2">Sangat kenyal; boleh diregangkan dan akan kembali kepada bentuk dan saiz asal apabila daya tarikan dilepaskan.</td>
                        <td class="p-2">Rantai bergelung dengan sedikit rangkai silang yang bertindak seperti pegas.</td>
                        <td class="p-2">Getah tervulkan, Getah stirena-butadiena (SBR), Neoprena.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b4-s1-c2',
          title: 'Tindak Balas Pempolimeran: Penambahan vs Kondensasi',
          badge: 'Mekanisme Pempolimeran SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">Perbandingan Dua Kaedah Pempolimeran</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Terdapat dua kaedah utama sintesis polimer dalam industri kimia:
                </p>

                <div class="space-y-3 text-xs">
                  <!-- PEMPOLIMERAN PENAMBAHAN -->
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-sky-900 block font-bold mb-1">1. Pempolimeran Penambahan (Addition Polymerisation):</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px] mb-2">
                      <li><b>Syarat Monomer:</b> Monomer WAJIB mempunyai <b>ikatan ganda dua antara atom karbon (C=C)</b> (hidrokarbon tak tepu).</li>
                      <li><b>Mekanisme:</b> Semasa tindak balas, ikatan ganda dua terbuka untuk membentuk ikatan kovalen tunggal dengan monomer bersebelahan.</li>
                      <li><b>Hasil Sampingan:</b> <b>TIADA</b> molekul sampingan yang terbentuk (hanya satu produk polimer terhasil).</li>
                    </ul>
                    <div class="p-2.5 rounded-lg bg-sky-50 border border-sky-200 font-mono text-[11px] text-sky-950">
                      <b>Contoh Pembentukan Politena:</b><br/>
                      n CH₂=CH₂  →  [ — CH₂ — CH₂ — ]ₙ<br/>
                      <span class="text-[10px] text-sky-800 font-sans block mt-0.5">Etena (Monomer) → Politena (Polimer dengan n unit berulang)</span>
                    </div>
                  </div>

                  <!-- PEMPOLIMERAN KONDENSASI -->
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-purple-900 block font-bold mb-1">2. Pempolimeran Kondensasi (Condensation Polymerisation):</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px] mb-2">
                      <li><b>Syarat Monomer:</b> Melibatkan monomer yang mempunyai <b>dua kumpulan berfungsi berbeza</b> (contoh: —COOH dan —NH₂ atau —COOH dan —OH).</li>
                      <li><b>Mekanisme:</b> Kumpulan berfungsi bertindak balas membentuk ikatan baharu (ikatan amida atau ikatan ester).</li>
                      <li><b>Hasil Sampingan:</b> Menyingkirkan <b>molekul kecil</b> seperti air (H₂O) atau hidrogen klorida (HCl).</li>
                    </ul>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                      <div class="p-2.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-950 font-sans">
                        <b class="text-purple-900 block font-bold mb-0.5">Nilon-6,6 (Poliamida):</b>
                        <span class="text-[10px] text-slate-700 block mb-1">Heksana-1,6-diamina + Asid heksanadioik → Nilon-6,6 + Air</span>
                        <div class="font-mono text-[10px] text-purple-900 font-bold bg-white p-1 rounded border border-purple-200">
                          Ikatan Amida: — CO — NH —
                        </div>
                      </div>

                      <div class="p-2.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-950 font-sans">
                        <b class="text-purple-900 block font-bold mb-0.5">Terilena / Dacron (Poliester):</b>
                        <span class="text-[10px] text-slate-700 block mb-1">Asid benzena-1,4-dikarboksilik + Etana-1,2-diol → Terilena + Air</span>
                        <div class="font-mono text-[10px] text-purple-900 font-bold bg-white p-1 rounded border border-purple-200">
                          Ikatan Ester: — COO —
                        </div>
                      </div>
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
          mistake: 'Menganggap polimer pempolimeran penambahan menyingkirkan molekul air seperti ester.',
          correction: 'Pempolimeran penambahan TIDAK menyingkirkan sebarang molekul kecil! Hanya pempolimeran kondensasi yang menghasilkan molekul sampingan seperti H₂O atau HCl.',
          why: 'Ikatan ganda dua C=C hanya terbuka dan bersambung secara penambahan langsung.'
        },
        {
          mistake: 'Menyatakan bakelit ialah termoplastik kerana boleh dibentuk menjadi tombol suis.',
          correction: 'Bakelit ialah polimer TERMOSET! Ia dibentuk sekali sahaja semasa pengilangan dan tidak boleh dileburkan semula kerana mempunyai rangkaian silang yang sangat padat.',
          why: 'Jika dipanaskan kuat, termoset akan terbakar/hangus dan rosak kekal.'
        }
      ],
      flashcards: [
        {
          id: 't5-b4-s1-fc1',
          front: 'Apakah maksud monomer dan polimer?',
          back: 'Monomer ialah molekul kecil yang bergabung membina rantai panjang polimer, manakala polimer ialah molekul berantai panjang yang terbina daripada gabungan berulang banyak monomer.'
        },
        {
          id: 't5-b4-s1-fc2',
          front: 'Nyatakan 2 contoh polimer semula jadi beserta monomernya.',
          back: '1. Kanji / Selulosa (monomernya glukosa)\n2. Getah asli (monomernya isoprena)\n3. Protein (monomernya asid amino).'
        },
        {
          id: 't5-b4-s1-fc3',
          front: 'Apakah perbezaan utama antara polimer termoplastik dan polimer termoset?',
          back: 'Termoplastik boleh dileburkan dan diacu berulang kali tanpa mengubah struktur kimianya (tiada rangkai silang), manakala termoset tidak boleh diacu semula dan akan mengurai jika dipanaskan (banyak rangkai silang).'
        },
        {
          id: 't5-b4-s1-fc4',
          front: 'Apakah syarat utama untuk sesuatu monomer menjalani pempolimeran penambahan?',
          back: 'Monomer mestilah mempunyai sekurang-kurangnya satu ikatan ganda dua antara atom karbon (C=C).'
        },
        {
          id: 't5-b4-s1-fc5',
          front: 'Apakah jenis ikatan yang terbentuk antara unit monomer dalam polimer Nilon-6,6?',
          back: 'Ikatan amida (—CO—NH—), menjadikannya sejenis poliamida.'
        }
      ],
      quiz: [
        {
          id: 't5-b4-s1-q1',
          question: 'Antara polimer berikut, yang manakah merupakan polimer semula jadi?',
          options: ['Polistirena', 'Selulosa', 'Polivinil klorida (PVC)', 'Terilena'],
          answerIndex: 1,
          explanation: 'Selulosa ialah polimer semula jadi yang terbina daripada monomer glukosa dalam dinding sel tumbuhan. Polistirena, PVC, dan terilena ialah polimer sintetik buatan manusia.',
          level: 'Rendah'
        },
        {
          id: 't5-b4-s1-q2',
          question: 'Persamaan berikut mewakili satu proses pempolimeran:\nn CH₂=CH(CH₃) → [ — CH₂ — CH(CH₃) — ]ₙ\nApakah jenis tindak balas pempolimeran dan nama polimer yang terhasil?',
          options: [
            'Pempolimeran penambahan; Polipropena',
            'Pempolimeran kondensasi; Politena',
            'Pempolimeran penambahan; Polistirena',
            'Pempolimeran kondensasi; Polivinil klorida'
          ],
          answerIndex: 0,
          explanation: 'Monomer mempunyai ikatan ganda dua C=C (propena) yang terbuka untuk membentuk ikatan kovalen tunggal tanpa hasil sampingan. Ini ialah pempolimeran penambahan menghasilkan polipropena.',
          level: 'Sederhana',
          spmReference: 'SPM 2021 Kertas 1'
        },
        {
          id: 't5-b4-s1-q3',
          question: 'Mengapakah pinggan mangkuk melamina dan palam suis elektrik bakelit tidak melebur apabila terdedah kepada suhu panas?',
          options: [
            'Ia mengandungi ikatan ion yang sangat kuat',
            'Ia mempunyai struktur rangkaian silang tiga dimensi yang tegar menghalang rantai molekul daripada menggelongsor',
            'Ia diperbuat daripada gentian getah asli',
            'Ia merupakan polimer linear berketumpatan rendah'
          ],
          answerIndex: 1,
          explanation: 'Melamina dan bakelit ialah polimer termoset yang mempunyai banyak rangkai silang tiga dimensi yang kuat antara rantai polimer, menjadikannya tahan haba tinggi dan tidak melebur.',
          level: 'Sederhana'
        },
        {
          id: 't5-b4-s1-q4',
          question: 'Semasa sintesis gentian sintetik Terilena (Dacron), molekul kecil air disingkirkan. Apakah nama kumpulan berfungsi ikatan yang menghubungkan unit-unit monomer dalam Terilena?',
          options: ['Ikatan peptida', 'Ikatan ester (—COO—)', 'Ikatan glikosidik', 'Ikatan amida (—CONH—)'],
          answerIndex: 1,
          explanation: 'Terilena ialah sejenis poliester yang terhasil daripada tindak balas antara asid dikarboksilik dan diol melalui pempolimeran kondensasi membentuk ikatan ester (—COO—) dengan penyingkiran air.',
          level: 'Rendah'
        },
        {
          id: 't5-b4-s1-q5',
          question: 'Satu polimer sintetik mempunyai formula struktur berikut:\n[ — NH — (CH₂)₆ — NH — CO — (CH₂)₄ — CO — ]ₙ\nApakah monomer yang digunakan untuk menghasilkan polimer ini?',
          options: [
            'Heksana-1,6-diol dan asid heksanadioik',
            'Heksana-1,6-diamina dan asid heksanadioik',
            'Etena dan kloroetena',
            'Asid amino dan glukosa'
          ],
          answerIndex: 1,
          explanation: 'Formula tersebut menunjukkan struktur Nilon-6,6 yang mengandungi ikatan amida. Monomernya ialah heksana-1,6-diamina (H₂N—(CH₂)₆—NH₂) dan asid heksanadioik (HOOC—(CH₂)₄—COOH).',
          level: 'Tinggi (KBAT)'
        },
        {
          id: 't5-b4-s1-q6',
          question: 'Polimer X melembut apabila dipanaskan dan boleh diacu semula ke dalam pelbagai bentuk berbeza beberapa kali. Manakala polimer Y mengurai dan hangus menjadi arang apabila dipanaskan kuat. Apakah pengelasan yang betul bagi X dan Y?',
          options: [
            'X: Termoset; Y: Termoplastik',
            'X: Elastomer; Y: Termoset',
            'X: Termoplastik; Y: Termoset',
            'X: Polimer semula jadi; Y: Elastomer'
          ],
          answerIndex: 2,
          explanation: 'Polimer yang boleh diacu berulang kali ialah termoplastik (X), manakala polimer yang tidak boleh diacu semula dan mengurai apabila dipanaskan ialah termoset (Y).',
          level: 'Sederhana'
        }
      ]
    },

    // ==========================================
    // SUBTOPIK 4.2
    // ==========================================
    {
      id: 't5-b4-s2',
      code: '4.2',
      title: 'Getah Asli',
      learningStandard: 'SP 4.2.1, 4.2.2',
      durationMinutes: 40,
      tldr: [
        'Getah asli ialah polimer semula jadi yang dinamakan poliisoprena, terbentuk daripada monomer isoprena (2-metilbuta-1,3-diena).',
        'Zarah lateks diselaputi membran protein yang bercas negatif pada permukaannya, menyebabkan zarah saling menolak dan lateks kekal cair.',
        'Penambahan asid (ion H⁺) meneutralkan cas negatif membran protein, menyebabkan zarah berlanggar, membran pecah dan rantai polimer getah menggumpal.',
        'Penambahan alkali (ion OH⁻ seperti larutan ammonia) meneutralkan ion H⁺ asid laktik bakteria, mengekalkan cas negatif dan menghalang penggumpalan lateks.',
        'Getah asli bersifat lembut, mudah teroksida oleh udara (kerana kehadiran ikatan C=C), tidak tahan haba dan tidak telus air.'
      ],
      concepts: [
        {
          id: 't5-b4-s2-c1',
          title: 'Struktur Poliisoprena & Ciri Fizik Getah Asli',
          badge: 'Struktur Polimer Asli',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">Monomer &amp; Struktur Poliisoprena</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Getah asli diekstrak daripada pokok getah (<i>Hevea brasiliensis</i>) dalam bentuk cecair putih susu yang dipanggil <b>lateks</b>. Polimer getah asli dinamakan <b>poliisoprena</b>:
                </p>

                <div class="p-3 rounded-xl bg-slate-900 text-white font-mono text-center text-xs mb-3 shadow-inner">
                  <div class="text-amber-300 font-bold mb-1">Monomer: Isoprena (2-metilbuta-1,3-diena)</div>
                  <span class="text-sky-300">CH₂ = C(CH₃) — CH = CH₂</span>
                  <div class="text-slate-400 text-[10px] mt-1">↓ Pempolimeran Penambahan</div>
                  <span class="text-emerald-400 font-bold">[ — CH₂ — C(CH₃) = CH — CH₂ — ]ₙ</span>
                  <div class="text-emerald-300 text-[10px] mt-0.5">Poliisoprena (Getah Asli)</div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-800 block mb-1">Ciri-Ciri Fizik Getah Asli:</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      <li><b>Kenyal pada suhu bilik:</b> Rantai polimer bergelung boleh meregang apabila ditarik dan kembali ke asal jika daya kecil.</li>
                      <li><b>Lembut &amp; Melekit apabila Panas:</b> Tidak tahan haba; menjadi rapuh dan keras apabila sejuk.</li>
                      <li><b>Penebat Elektrik &amp; Haba yang Baik:</b> Tidak mempunyai elektron bebas atau ion bebas.</li>
                      <li><b>Kalis Air:</b> Tidak larut dalam air tetapi mengembang dan larut dalam pelarut organik (seperti benzena, petrol).</li>
                    </ul>
                  </div>

                  <div class="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
                    <b class="text-rose-900 block font-bold mb-1">Kelemahan Utama Getah Asli:</b>
                    <p class="text-[11px] leading-relaxed mb-1.5">
                      Setiap unit berulang dalam poliisoprena masih mempunyai <b>satu ikatan ganda dua C=C</b>.
                    </p>
                    <p class="text-[11px] leading-relaxed">
                      Ikatan ganda dua ini menyebabkan getah asli <b>sangat mudah diserang dan dioksidakan oleh oksigen dan ozon</b> dalam udara, menjadikan getah menjadi keras, retak, dan hilang keanjalannya dengan cepat apabila terdedah kepada cahaya matahari.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b4-s2-c2',
          title: 'Mekanisme Penggumpalan & Pencegahan Penggumpalan Lateks',
          badge: 'Eksperimen SPM Popular',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">Struktur Zarah Lateks Mengapa Lateks Cecair?</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Setiap zarah getah dalam lateks terdiri daripada molekul polimer getah yang diselaputi oleh satu <b>lapisan membran protein bercas negatif</b> di bahagian luar. Cas negatif ini menyebabkan zarah-zarah getah <b>saling menolak antara satu sama lain</b> apabila mendekati, menghalang zarah daripada bercantum dan mengekalkan lateks dalam bentuk ampaian cecair putih.
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <!-- PENGGUMPALAN ASID -->
                  <div class="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
                    <b class="text-rose-900 block font-bold mb-1">A. Penggumpalan Lateks (Tambah Asid):</b>
                    <ol class="list-decimal pl-4 space-y-1 text-[11px]">
                      <li>Asid lemah seperti <b>asid metanoik (asid formik)</b> atau asid etanoik ditambah ke dalam lateks.</li>
                      <li><b>Ion hidrogen, H⁺</b> daripada asid meneutralkan cas negatif pada membran protein zarah getah.</li>
                      <li>Zarah-zarah getah menjadi <b>neutral secara elektrik</b>.</li>
                      <li>Zarah-zarah neutral saling <b>berlanggar</b> antara satu sama lain apabila bergerak bebas.</li>
                      <li>Membran protein pecah, membebaskan molekul polimer getah yang <b>saling membelit dan menggumpal</b> membentuk pepejal getah putih.</li>
                    </ol>
                  </div>

                  <!-- PENCEGAHAN ALKALI -->
                  <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                    <b class="text-emerald-900 block font-bold mb-1">B. Pencegahan Penggumpalan (Tambah Alkali):</b>
                    <ol class="list-decimal pl-4 space-y-1 text-[11px]">
                      <li>Larutan alkali seperti <b>larutan ammonia, NH₃</b> ditambah ke dalam lateks segar di ladang.</li>
                      <li><b>Ion hidroksida, OH⁻</b> daripada larutan ammonia meneutralkan sebarang ion H⁺ yang dihasilkan oleh tindakan bakteria udara: <span class="font-mono">H⁺ + OH⁻ → H₂O</span>.</li>
                      <li>Membran protein zarah getah <b>kekal bercas negatif</b>.</li>
                      <li>Daya tolakan elektrostatik antara zarah getah berterusan, menghalang perlanggaran dan penggumpalan.</li>
                      <li>Lateks kekal dalam keadaan cecair untuk pengangkutan selamat ke kilang pemprosesan.</li>
                    </ol>
                  </div>
                </div>

                <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                  <b class="text-amber-900 block font-bold mb-1">Penggumpalan Semula Jadi Lateks Tanpa Asid:</b>
                  <p class="text-[11px] leading-relaxed">
                    Jika lateks segar dibiarkan terdedah kepada udara selama beberapa hari, bakteria dalam udara merembeskan <b>asid laktik</b>. Ion H⁺ asid laktik meneutralkan membran protein secara perlahan-lahan menyebabkan lateks menggumpal secara semula jadi, tetapi gumpalan berbau busuk akibat pereputan protein oleh bakteria.
                  </p>
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menyatakan ion hidroksida (OH⁻) daripada ammonia menambah cas negatif pada membran protein.',
          correction: 'Ion OH⁻ bertindak MENEUTRALKAN ion H⁺ yang dihasilkan oleh bakteria, mengekalkan cas negatif asal membran protein zarah getah!',
          why: 'Ini adalah ketepatan konsep SPM yang sering dinilai dalam soalan esei.'
        },
        {
          mistake: 'Menganggap penambahan sebarang asid kuat seperti asid sulfurik pekat disyorkan untuk menggumpalkan lateks.',
          correction: 'Asid metanoik (asid formik) atau asid etanoik cair digunakan. Asid pekat merosakkan struktur rantai polimer getah dan menjadikannya rapuh.',
          why: 'Asid organik lemah menghasilkan getah gumpal berkualiti tinggi.'
        }
      ],
      simulationRef: {
        id: 'penggumpalan-lateks',
        title: 'Makmal Maya Penggumpalan Lateks & Zarah Getah',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=penggumpalan-lateks',
        description: 'Uji tindakan asid metanoik, larutan ammonia, dan tindakan bakteria ke atas ampaian lateks serta lihat simulasi submikroskopik perlanggaran zarah getah beranimasi.',
        previewBadge: 'Simulasi Lateks KSSM'
      },
      flashcards: [
        {
          id: 't5-b4-s2-fc1',
          front: 'Apakah nama monomer dan nama polimer bagi getah asli?',
          back: 'Monomer: Isoprena (nama IUPAC: 2-metilbuta-1,3-diena)\nPolimer: Poliisoprena.'
        },
        {
          id: 't5-b4-s2-fc2',
          front: 'Mengapakah lateks segar kekal dalam bentuk cecair ampaian putih?',
          back: 'Zarah getah diselaputi membran protein yang bercas negatif pada permukaannya, menyebabkan zarah getah saling menolak dan tidak bercantum.'
        },
        {
          id: 't5-b4-s2-fc3',
          front: 'Bagaimanakah asid metanoik menyebabkan lateks menggumpal?',
          back: 'Ion H⁺ daripada asid meneutralkan cas negatif membran protein. Zarah getah menjadi neutral, berlanggar, memecahkan membran dan rantai polimer membelit membentuk gumpalan pepejal.'
        },
        {
          id: 't5-b4-s2-fc4',
          front: 'Apakah fungsi penambahan larutan ammonia (NH₃) ke dalam lateks di ladang getah?',
          back: 'Ion OH⁻ daripada ammonia meneutralkan ion H⁺ yang dihasilkan oleh aktiviti bakteria, mengekalkan cas negatif membran protein dan mengelakkan lateks daripada menggumpal.'
        },
        {
          id: 't5-b4-s2-fc5',
          front: 'Mengapakah getah asli mudah teroksida dan hilang keanjalannya apabila terdedah kepada udara dan cahaya matahari?',
          back: 'Kerana rantai poliisoprena getah asli mengandungi ikatan ganda dua antara atom karbon (C=C) yang mudah bertindak balas dengan oksigen dan gas ozon dalam udara.'
        }
      ],
      quiz: [
        {
          id: 't5-b4-s2-q1',
          question: 'Apakah nama IUPAC bagi monomer getah asli?',
          options: ['2-metilbuta-1,3-diena', 'But-1-ena', '2-metilbut-2-ena', 'Kloroetena'],
          answerIndex: 0,
          explanation: 'Monomer getah asli ialah isoprena yang mempunyai nama IUPAC rasmi 2-metilbuta-1,3-diena dengan formula struktur CH₂=C(CH₃)—CH=CH₂.',
          level: 'Rendah'
        },
        {
          id: 't5-b4-s2-q2',
          question: 'Seorang penoreh getah mendapati lateks yang dikumpulkannya telah menggumpal selepas dibiarkan semalaman tanpa sebarang bahan tambahan. Apakah yang menyebabkan penggumpalan semula jadi ini berlaku?',
          options: [
            'Lateks bertindak balas dengan nitrogen dalam udara',
            'Bakteria dalam udara menghasilkan asid laktik yang membekalkan ion H⁺ untuk meneutralkan membran protein zarah getah',
            'Air dalam lateks telah tersejat sepenuhnya',
            'Zarah lateks kehilangan molekul polimer getah'
          ],
          answerIndex: 1,
          explanation: 'Bakteria daripada udara membiak dalam lateks dan merembeskan asid laktik. Ion H⁺ daripada asid laktik meneutralkan cas negatif membran protein zarah getah, menyebabkan lateks menggumpal secara semula jadi.',
          level: 'Sederhana',
          spmReference: 'SPM 2022 Kertas 1'
        },
        {
          id: 't5-b4-s2-q3',
          question: 'Bahan manakah yang paling sesuai ditambah ke dalam tangki lori tangki pengangkut lateks segar untuk memastikan lateks kekal dalam keadaan cecair sepanjang perjalanan ke kilang?',
          options: ['Asid hidroklorik', 'Larutan ammonia, NH₃', 'Asid etanoik', 'Larutan natrium klorida'],
          answerIndex: 1,
          explanation: 'Larutan ammonia membekalkan ion OH⁻ yang meneutralkan asid hasil tindakan bakteria, mengekalkan cas negatif membran protein supaya zarah-zarah getah terus menolak antara satu sama lain.',
          level: 'Rendah'
        },
        {
          id: 't5-b4-s2-q4',
          question: 'Rajah berikut menunjukkan urutan proses penggumpalan lateks:\nZarah getah bercas negatif → Zarah P → Perlanggaran zarah → Gumpalan getah terbentuk\nApakah keadaan bagi Zarah P?',
          options: [
            'Zarah getah bercas positif',
            'Zarah getah neutral selepas cas negatifnya dineutralkan oleh ion H⁺',
            'Zarah getah yang kehilangan rantai polimer',
            'Zarah getah yang membentuk rangkai silang sulfur'
          ],
          answerIndex: 1,
          explanation: 'Apabila ion H⁺ daripada asid meneutralkan cas negatif pada membran protein, zarah getah menjadi neutral (Zarah P). Apabila neutral, daya tolakan elektrostatik tiada lagi dan zarah saling berlanggar sehingga membran pecah.',
          level: 'Sederhana'
        },
        {
          id: 't5-b4-s2-q5',
          question: 'Kepingan getah asli yang terdedah kepada udara luar dan cahaya terik matahari menjadi melekit, lembik dan akhirnya retak serta hilang kekenyalannya. Apakah punca utama kemerosotan sifat getah asli ini?',
          options: [
            'Penyejatan molekul isoprena ke udara',
            'Pengoksidaan ikatan ganda dua C=C dalam rantai poliisoprena oleh oksigen dan ozon atmosfera',
            'Pertambahan rangkai silang sulfur dalam getah',
            'Pengurangan jisim molekul relatif akibat penguraian protein'
          ],
          answerIndex: 1,
          explanation: 'Kehadiran ikatan ganda dua C=C yang tak tepu pada setiap unit berulang poliisoprena menjadikan getah asli sangat mudah dioksidakan oleh gas oksigen dan ozon dalam udara.',
          level: 'Tinggi (KBAT)'
        },
        {
          id: 't5-b4-s2-q6',
          question: 'Dua bikar A dan B masing-masing mengandungi 50 cm³ lateks segar. Bikar A ditambah 5 cm³ asid metanoik manakala Bikar B ditambah 5 cm³ larutan natrium hidroksida cair. Apakah pemerhatian selepas 30 minit?',
          options: [
            'Bikar A kekal cecair; Bikar B membentuk gumpalan pepejal putih',
            'Bikar A membentuk gumpalan pepejal putih; Bikar B kekal dalam keadaan cecair putih',
            'Kedua-dua bikar membentuk gumpalan pepejal',
            'Kedua-dua bikar kekal dalam keadaan cecair'
          ],
          answerIndex: 1,
          explanation: 'Asid metanoik dalam Bikar A membekalkan ion H⁺ yang menggumpalkan lateks menjadi pepejal putih. Bikar B mengandungi alkali (NaOH) yang mengekalkan lateks dalam keadaan cecair.',
          level: 'Sederhana'
        }
      ]
    },

    // ==========================================
    // SUBTOPIK 4.3
    // ==========================================
    {
      id: 't5-b4-s3',
      code: '4.3',
      title: 'Getah Sintetik & Pemvulkanan Getah',
      learningStandard: 'SP 4.3.1, 4.3.2, 4.3.3',
      durationMinutes: 40,
      tldr: [
        'Pemvulkanan ialah proses memanaskan getah asli bersama sulfur untuk membentuk rangkai silang sulfur antara rantai polimer poliisoprena.',
        'Rangkai silang sulfur menghalang rantai polimer daripada menggelongsor secara kekal apabila diregang dan menarik rantai kembali ke bentuk asal serta-merta.',
        'Getah tervulkan lebih kenyal, lebih kuat, lebih keras, tahan haba tinggi dan lebih tahan terhadap pengoksidaan berbanding getah asli.',
        'Getah sintetik ialah polimer buatan manusia dengan sifat elastomer (contoh: Neoprena, SBR, Getah Nitril) yang tahan minyak, haba dan lelasan.',
        'Pelupusan polimer yang tidak terancang mencemarkan alam sekitar kerana sifat tidak terbiodegradasi; langkah kelestarian merangkumi amalan 3R, pirolisis tayar dan polimer terbiodegradasi (PLA).'
      ],
      concepts: [
        {
          id: 't5-b4-s3-c1',
          title: 'Proses Pemvulkanan Getah & Rangkai Silang Sulfur',
          badge: 'Teknologi Pemvulkanan Goodyear',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">Maksud &amp; Kaedah Pemvulkanan</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  <b>Pemvulkanan</b> ialah proses kimia di mana getah asli dipanaskan bersama <b>sulfur</b> (pada suhu sekitar 140 °C dengan mangkin zink oksida) atau direndam dalam larutan <b>disulfur diklorida (S₂Cl₂)</b> dalam pelarut metilbenzena:
                </p>

                <div class="p-3 rounded-xl bg-slate-900 text-white text-xs mb-3 shadow-inner font-mono">
                  <div class="text-amber-300 font-bold mb-1">Mekanisme Pembentukan Rangkai Silang Sulfur:</div>
                  <p class="text-slate-300 text-[11px] font-sans leading-relaxed">
                    Atom-atom sulfur bertindak balas pada tapak <b>ikatan ganda dua C=C</b> antara atom karbon pada rantai poliisoprena. Ikatan ganda dua terbuka dan atom sulfur membentuk <b>jambatan atau rangkai silang sulfur (— S — S —)</b> antara rantai-rantai polimer yang bersebelahan.
                  </p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-800 block mb-1">Mengapa Getah Tervulkan Sangat Kenyal?</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      <li>Apabila getah tervulkan <b>diregangkan</b>, rantai polimer melurus dan menggelongsor sedikit, tetapi <b>rangkai silang sulfur menghalang rantai daripada menggelongsor melepasi satu sama lain secara kekal</b>.</li>
                      <li>Apabila daya regangan <b>dilepaskan</b>, rangkai silang sulfur yang bertindak seperti pegas elastik akan <b>menarik kembali rantai polimer kepada bentuk dan kedudukan asalnya</b> serta-merta!</li>
                    </ul>
                  </div>

                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-800 block mb-1">Mengapa Lebih Tahan Pengoksidaan &amp; Haba?</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      <li><b>Tahan Pengoksidaan:</b> Kebanyakan ikatan ganda dua C=C telah digantikan oleh ikatan kovalen tunggal semasa pembentukan rangkai silang sulfur, mengurangkan tapak aktif untuk tindak balas pengoksidaan dengan gas oksigen dan ozon.</li>
                      <li><b>Tahan Haba:</b> Rangkai silang sulfur yang kuat memerlukan tenaga haba yang amat tinggi untuk diputuskan.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b4-s3-c2',
          title: 'Perbandingan Sifat: Getah Asli vs Getah Tervulkan',
          badge: 'Jadual Perbandingan SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">Jadual Perbandingan Komprehensif</span>
                <div class="overflow-x-auto">
                  <table class="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr class="bg-slate-100 text-slate-700 border-b border-slate-200">
                        <th class="p-2 font-bold">Sifat Fizik</th>
                        <th class="p-2 font-bold text-amber-800">Getah Asli</th>
                        <th class="p-2 font-bold text-emerald-800">Getah Tervulkan</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 text-slate-700 text-[11px]">
                      <tr>
                        <td class="p-2 font-medium">Keanjalan (Kekenyalan)</td>
                        <td class="p-2 text-amber-800 font-medium">Kurang kenyal (sukar kembali ke bentuk asal jika diregang kuat)</td>
                        <td class="p-2 text-emerald-800 font-bold">Sangat kenyal (mudah kembali ke bentuk dan saiz asal)</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-medium">Kekerasan &amp; Kekuatan</td>
                        <td class="p-2">Lebih lembut dan kekuatan regangan rendah</td>
                        <td class="p-2 font-bold text-emerald-800">Lebih keras, kuat dan sukar putus</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-medium">Ketahanan terhadap Haba</td>
                        <td class="p-2 text-rose-700">Rendah; melekit pada suhu tinggi dan rapuh pada suhu rendah</td>
                        <td class="p-2 font-bold text-emerald-800">Tinggi; tahan haba dan tidak mudah melekit</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-medium">Ketahanan terhadap Pengoksidaan</td>
                        <td class="p-2 text-rose-700">Rendah; mudah teroksida oleh oksigen dan ozon</td>
                        <td class="p-2 font-bold text-emerald-800">Tinggi; lebih sukar dioksidakan</td>
                      </tr>
                      <tr>
                        <td class="p-2 font-medium">Keterlarutan dalam Pelarut Organik</td>
                        <td class="p-2">Mengembang dan larut dalam benzena/petrol</td>
                        <td class="p-2 font-bold text-emerald-800">Tidak larut dan tidak mengembang</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b4-s3-c3',
          title: 'Getah Sintetik & Isu Kelestarian Alam Sekitar',
          badge: 'Elastomer Sintetik & 3R',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">Getah Sintetik (Elastomer Sintetik)</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  <b>Getah sintetik</b> ialah sebarang polimer sintetik buatan manusia yang mempunyai sifat elastomer (boleh meregang dan kembali ke asal).
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs mb-3">
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-800 block mb-0.5">1. Neoprena (Polikloroprena)</b>
                    <p class="text-[11px] text-slate-600">Sangat tahan minyak, petrol dan bahan kimia; tahan haba dan api. Digunakan untuk hos minyak, tali sawat, pakaian selam.</p>
                  </div>
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-800 block mb-0.5">2. Getah SBR (Stirena-Butadiena)</b>
                    <p class="text-[11px] text-slate-600">Sangat tahan geseran dan lelasan jalan raya. Digunakan secara meluas untuk membuat tayar kenderaan dan tapak kasut sukan.</p>
                  </div>
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-800 block mb-0.5">3. Getah Nitril (NBR)</b>
                    <p class="text-[11px] text-slate-600">Sangat tahan bahan kimia dan minyak pelincir. Digunakan untuk membuat sarung tangan perubatan nitril dan pengedap enjin.</p>
                  </div>
                </div>

                <!-- ISU ALAM SEKITAR -->
                <span class="text-xs font-bold text-rose-900 uppercase tracking-wider block mb-2">Isu Pengurusan Sisa Polimer &amp; Kelestarian Alam</span>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
                    <b class="text-rose-900 block font-bold mb-1">Impak Pembuangan Sisa Polimer:</b>
                    <ul class="list-disc pl-4 space-y-0.5 text-[11px]">
                      <li><b>Tidak Terbiodegradasi:</b> Polimer sintetik mengambil masa beratus-ratus tahun untuk terurai.</li>
                      <li><b>Pencemaran Udara:</b> Pembakaran terbuka membebaskan gas beracun (HCl daripada PVC, HCN, dan gas rumah hijau CO₂).</li>
                      <li><b>Banjir Kilat:</b> Sisa beg plastik menyumbat saliran air dan parit.</li>
                      <li><b>Longgokan Tayar:</b> Menakung air hujan menjadi sarang pembiakan nyamuk Aedes pembawa denggi.</li>
                    </ul>
                  </div>

                  <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                    <b class="text-emerald-900 block font-bold mb-1">Langkah Pengurusan Lestari:</b>
                    <ul class="list-disc pl-4 space-y-0.5 text-[11px]">
                      <li><b>Amalan 3R:</b> Kurangkan (Reduce), Guna Semula (Reuse), dan Kitar Semula (Recycle).</li>
                      <li><b>Pirolisis Sisa Getah:</b> Pemanasan tayar terpakai tanpa oksigen untuk menghasilkan minyak bahan api, karbon hitam dan keluli kitar semula.</li>
                      <li><b>Polimer Terbiodegradasi:</b> Membangunkan bioplastik seperti <b>asid polilaktik (PLA)</b> daripada kanji jagung yang boleh diurai oleh mikroorganisma tanah dalam beberapa bulan.</li>
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
          mistake: 'Menyatakan pemvulkanan menambah ikatan ganda dua C=C dalam getah.',
          correction: 'Pemvulkanan MEMECAHKAN ikatan ganda dua C=C untuk membentuk rangkai silang sulfur tunggal antara rantai polimer!',
          why: 'Pengurangan ikatan C=C inilah sebab mengapa getah tervulkan lebih tahan pengoksidaan.'
        },
        {
          mistake: 'Menganggap tayar kenderaan diperbuat daripada getah asli tulen.',
          correction: 'Tayar kenderaan dibuat daripada getah tervulkan atau campuran getah sintetik SBR bersama karbon hitam bagi meningkatkan kekuatan mekanikal dan ketahanan lelasan.',
          why: 'Getah asli tanpa tervulkan akan melekit dan cair akibat geseran panas di jalan raya.'
        }
      ],
      simulationRef: {
        id: 'pemvulkanan-getah',
        title: 'Makmal Maya Pemvulkanan & Ujian Keanjalan Getah',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=pemvulkanan-getah',
        description: 'Bandingkan pemanjangan jalur getah asli vs getah tervulkan di bawah pelbagai beban pemberat, perhatikan pemulihan panjang asal, dan zum struktur rangkai silang sulfur.',
        previewBadge: 'Simulasi Pemvulkanan KSSM'
      },
      flashcards: [
        {
          id: 't5-b4-s3-fc1',
          front: 'Apakah maksud proses pemvulkanan getah?',
          back: 'Proses memanaskan getah asli bersama sulfur (atau merendam dalam disulfur diklorida) untuk menghasilkan rangkai silang sulfur antara rantai polimer poliisoprena.'
        },
        {
          id: 't5-b4-s3-fc2',
          front: 'Bagaimanakah kehadiran rangkai silang sulfur meningkatkan keanjalan getah tervulkan?',
          back: 'Rangkai silang sulfur menghalang rantai polimer getah daripada menggelongsor secara kekal apabila diregang dan menarik rantai kembali kepada kedudukan asal serta-merta apabila daya dilepaskan.'
        },
        {
          id: 't5-b4-s3-fc3',
          front: 'Nyatakan dua perbezaan sifat antara getah asli dan getah tervulkan.',
          back: '1. Getah tervulkan lebih kenyal dan lebih keras daripada getah asli.\n2. Getah tervulkan lebih tahan haba tinggi dan lebih tahan terhadap pengoksidaan berbanding getah asli.'
        },
        {
          id: 't5-b4-s3-fc4',
          front: 'Berikan satu contoh getah sintetik dan satu kegunaan utamanya.',
          back: 'Getah SBR (Stirena-Butadiena): digunakan untuk tayar kenderaan dan tapak kasut sukan kerana sangat tahan geseran lelasan (atau Neoprena untuk hos minyak).'
        },
        {
          id: 't5-b4-s3-fc5',
          front: 'Apakah kelebihan polimer terbiodegradasi seperti asid polilaktik (PLA) berbanding plastik konvensional?',
          back: 'PLA diperbuat daripada sumber boleh diperbaharui (kanji jagung) dan boleh diuraikan oleh mikroorganisma tanah secara semula jadi kepada air dan karbon dioksida tanpa mencemarkan alam.'
        }
      ],
      quiz: [
        {
          id: 't5-b4-s3-q1',
          question: 'Bahan kimia manakah yang digunakan untuk memvulkan getah asli di dalam makmal?',
          options: ['Larutan ammonia', 'Serbuk sulfur atau disulfur diklorida', 'Asid metanoik cair', 'Kalsium karbonat'],
          answerIndex: 1,
          explanation: 'Pemvulkanan memerlukan sulfur yang bertindak balas pada ikatan ganda dua C=C rantai getah untuk membentuk rangkai silang sulfur (atau menggunakan cecair disulfur diklorida, S₂Cl₂ dalam pelarut metilbenzena).',
          level: 'Rendah'
        },
        {
          id: 't5-b4-s3-q2',
          question: 'Dua jalur getah P (getah asli) dan Q (getah tervulkan) yang sama saiz digantung dengan pemberat 100 g selama 30 minit. Selepas pemberat ditanggalkan, panjang akhir jalur diukur. Apakah jangkaan keputusan yang betul?',
          options: [
            'Panjang jalur P kembali tepat kepada panjang asal manakala jalur Q kekal memanjang',
            'Panjang jalur Q kembali tepat kepada panjang asal manakala jalur P kekal memanjang sedikit',
            'Kedua-dua jalur getah mengalami pemanjangan kekal yang sama',
            'Jalur Q putus manakala jalur P tidak putus'
          ],
          answerIndex: 1,
          explanation: 'Getah tervulkan (Q) mempunyai rangkai silang sulfur yang menghalang gelongsoran kekal rantai polimer, membolehkannya kembali kepada panjang asal. Getah asli (P) mengalami gelongsoran rantai kekal dan tidak kembali sepenuhnya kepada panjang asal.',
          level: 'Sederhana',
          spmReference: 'SPM 2021 Kertas 1'
        },
        {
          id: 't5-b4-s3-q3',
          question: 'Mengapakah getah tervulkan lebih sukar dioksidakan oleh oksigen dan ozon atmosfera berbanding getah asli?',
          options: [
            'Rantai polimer getah tervulkan tidak mengandungi atom karbon',
            'Atom sulfur bertindak balas memecahkan kebanyakan ikatan ganda dua C=C pada rantai polimer, mengurangkan tapak pengoksidaan',
            'Sulfur bertindak sebagai agen pengoksidaan yang kuat',
            'Getah tervulkan menyerap cahaya matahari sepenuhnya'
          ],
          answerIndex: 1,
          explanation: 'Pengoksidaan getah berlaku pada ikatan ganda dua C=C. Semasa pemvulkanan, atom sulfur membentuk rangkai silang merentasi ikatan ganda dua tersebut, menjadikan bilangan ikatan C=C berkurang dan lebih stabil terhadap serangan oksigen/ozon.',
          level: 'Sederhana'
        },
        {
          id: 't5-b4-s3-q4',
          question: 'Sebuah syarikat petroleum memerlukan paip hos yang fleksibel untuk memindahkan minyak petrol dan bahan kimia organik di pelabuhan. Getah manakah yang paling sesuai digunakan untuk membuat paip hos tersebut?',
          options: ['Getah asli tanpa tervulkan', 'Neoprena (getah sintetik polikloroprena)', 'Polistirena', 'Getah lembut lateks'],
          answerIndex: 1,
          explanation: 'Neoprena ialah getah sintetik yang sangat tahan terhadap minyak, pelarut organik, bahan kimia dan haba, menjadikannya bahan terbaik untuk hos pemindahan petroleum.',
          level: 'Rendah'
        },
        {
          id: 't5-b4-s3-q5',
          question: 'Tayar terpakai yang dilupuskan di tapak pelupusan sampah menimbulkan pelbagai ancaman alam sekitar dan kesihatan awam. Antara berikut, kaedah pengurusan manakah yang paling mesra alam dan bernilai ekonomi tinggi?',
          options: [
            'Membakar tayar secara terbuka di kawasan lapang',
            'Menanam tayar di dalam tanah di kawasan tadahan air',
            'Menjalankan proses pirolisis untuk menghasilkan minyak bahan api, karbon hitam dan keluli kitar semula',
            'Membuang tayar ke dalam dasar tasik'
          ],
          answerIndex: 2,
          explanation: 'Pirolisis menguraikan tayar getah pada suhu tinggi tanpa oksigen, menghasilkan produk bernilai komersial seperti minyak hidrokarbon bahan api, karbon hitam industri, dan dawai keluli tanpa membebaskan asap beracun.',
          level: 'Tinggi (KBAT)'
        },
        {
          id: 't5-b4-s3-q6',
          question: 'Bioplastik yang diperbuat daripada asid polilaktik (PLA) kini mula menggantikan beg plastik polietilena konvensional di pasar raya. Mengapakah PLA dianggap lebih mampan untuk alam sekitar?',
          options: [
            'PLA mengalirkan arus elektrik dengan baik',
            'PLA dihasilkan daripada kanji jagung atau ubi kayu dan boleh diuraikan oleh mikrob tanah kepada bahan tidak berbahaya dalam masa beberapa bulan',
            'PLA tidak boleh terbakar langsung',
            'PLA mempunyai takat lebur yang lebih tinggi daripada keluli'
          ],
          answerIndex: 1,
          explanation: 'PLA dihasilkan daripada sumber biomassa boleh diperbaharui (kanji tanaman) dan bersifat terbiodegradasi (biodegradable) sepenuhnya menjadi CO₂ dan H₂O oleh mikroorganisma pengurai dalam tanah.',
          level: 'Tinggi (KBAT)'
        }
      ]
    }
  ]
};
