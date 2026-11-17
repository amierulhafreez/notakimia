import { Chapter } from '../types/nota';

export const T4_BAB7: Chapter = {
  id: 't4-b7',
  form: 'T4',
  chapterNumber: 7,
  title: 'Kadar Tindak Balas',
  theme: 'Interaksi Antara Jirim',
  durationMinutes: 120,
  description:
    'Pengukuran dan penentuan kadar tindak balas purata dan seketika daripada graf isipadu gas, 4 faktor utama mempengaruhi kadar tindak balas (saiz, kepekatan, suhu, mangkin), aplikasi industri dan kehidupan harian, serta Teori Perlanggaran dan gambar rajah profil aras tenaga.',
  iconName: 'Gauge',
  subtopicCount: 4,
  subtopics: [
    // -------------------------------------------------------------
    // SUBTOPIK 7.1: PENENTUAN KADAR TINDAK BALAS
    // -------------------------------------------------------------
    {
      id: 't4-b7-s1',
      code: '7.1',
      title: 'Penentuan Kadar Tindak Balas',
      learningStandard: 'SP 7.1.1, 7.1.2, 7.1.3, 7.1.4, 7.1.5',
      durationMinutes: 30,
      tldr: [
        'Kadar tindak balas (KTR) ditakrifkan sebagai perubahan kuantiti bahan tindak balas atau hasil tindak balas per unit masa: Kadar = (Perubahan kuantiti) / (Masa yang diambil).',
        'Tindak balas cepat berlaku dalam masa singkat (cth letupan mercun, pembakaran gas metana); tindak balas perlahan mengambil masa yang panjang (cth pengaratan besi, fotosintesis, penapaian glukosa).',
        'Perubahan yang boleh diukur: Pertambahan isi padu gas terbebas (cm³ s⁻¹), pengurangan jisim kelalang kon (g s⁻¹), atau masa untuk pembentukan mendakan sulfur menutup tanda "X" (s⁻¹).',
        'Kadar tindak balas purata dikira bagi satu selang masa tertentu, manakala kadar tindak balas pada masa tertentu (seketika) dihitung daripada kecerunan tangen pada lengkung graf kuantiti melawan masa (dy/dx).'
      ],
      simulationRef: {
        id: 'kadar-saiz-bahan',
        title: 'Makmal Maya Pengukuran Kadar Tindak Balas (Isi Padu Gas vs Masa)',
        description: 'Jalankan tindak balas kalsium karbonat dengan asid hidroklorik, rekodkan isi padu gas CO₂ dalam buret setiap 30 saat, dan bina graf masa nyata.',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=kadar-saiz-bahan',
        previewBadge: 'Simulasi Bab 7.1'
      },
      concepts: [
        {
          id: 't4-b7-s1-c1',
          title: 'Definisi dan Kaedah Pengukuran Kadar Tindak Balas',
          badge: 'Konsep Asas SPM',
          content: `
            <p>
              <b>Kadar tindak balas</b> ialah ukuran kepantasan sesuatu tindak balas kimia berlaku. Secara kuantitatif:
            </p>
            <div class="p-3 rounded-2xl bg-sky-50 border border-sky-200 text-sky-950 text-xs font-mono my-2 text-center">
              Kadar Tindak Balas = Perubahan Kuantiti Bahan atau Hasil / Masa Diambil
            </div>
            <p class="text-xs text-slate-700 leading-relaxed mt-2">
              Dalam amali makmal SPM, perubahan yang lazim diperhatikan dan diukur merangkumi:
            </p>
            <ul class="list-disc pl-5 text-xs text-slate-700 space-y-1 mt-1">
              <li><b>Pembebasan Gas:</b> Mengukur isi padu gas yang dikumpul menggunakan picagari gas atau buret tertonggang di atas air (cth: tindak balas asid dengan logam reaktif atau karbonat logam).</li>
              <li><b>Pengurangan Jisim:</b> Menimbang kelalang kon yang diletakkan di atas penimbang elektronik apabila gas terbebas ke udara.</li>
              <li><b>Pembentukan Mendakan:</b> Mengukur masa yang diambil untuk mendakan pepejal (seperti sulfur kuning) mengaburkan tanda pangkah 'X' pada kertas di bawah kelalang kon.</li>
            </ul>
          `
        },
        {
          id: 't4-b7-s1-c2',
          title: 'Kaedah Pengukuran Kadar: Sesaran Air & Analisis Graf',
          badge: 'Kemahiran Amali & Graf SPM',
          content: `
            <div class="space-y-3 my-2">
              <!-- KAD 1: SUSUNAN RADAS PENGUMPULAN GAS -->
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                  Susunan Radas Piawai Pengumpulan Gas (Buku Teks m/s 213)
                </span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Kaedah pengumpulan gas melalui sesaran air ke bawah digunakan bagi tindak balas yang membebaskan gas yang tidak larut atau sukar larut dalam air (seperti gas hidrogen, H₂ daripada tindak balas asid dan logam zink).
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-800">1. Kelalang Kon &amp; Bahan:</b>
                    <p class="text-slate-600 mt-0.5">Berisi asid (cth H₂SO₄ cair) dan serbuk/ketulan zink. Gas H₂ terbebas serta-merta.</p>
                  </div>
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-800">2. Salur Penghantar &amp; Penyumbat:</b>
                    <p class="text-slate-600 mt-0.5">Penyumbat getah kedap gas menghalang kebocoran gas ke atmosfera.</p>
                  </div>
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-800">3. Buret Tertonggang (50 cm³):</b>
                    <p class="text-slate-600 mt-0.5">Diisi penuh dengan air dan diterbalikkan ke dalam besen air, dipegang oleh pengapit kaki retort.</p>
                  </div>
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-800">4. Jam Randik:</b>
                    <p class="text-slate-600 mt-0.5">Dimulakan serentak sebaik sahaja zink dimasukkan dan bacaan buret dicatat setiap 30 saat.</p>
                  </div>
                </div>
                <div class="mt-2.5 p-2 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                  <b>Peringatan Amali SPM:</b> Bagi gas yang mudah larut dalam air seperti gas karbon dioksida (CO₂) atau sulfur dioksida (SO₂), <b>picagari gas (gas syringe)</b> digunakan bagi menggantikan buret tertonggang.
                </div>
              </div>

              <!-- KAD 2: TAFSIRAN BENTUK LENGKUNG GRAF ISI PADU GAS -->
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                  Tafsiran Bentuk Graf Isi Padu Gas Melawan Masa
                </span>
                <div class="space-y-2 text-xs">
                  <div class="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
                    <b class="text-blue-900">• Peringkat Awal (Masa t = 0):</b>
                    <span class="text-blue-800"> Kecerunan tangen paling curam. Kadar tindak balas adalah <b>maksimum</b> kerana kepekatan bahan tindak balas berada pada tahap paling tinggi.</span>
                  </div>
                  <div class="p-2.5 rounded-xl bg-sky-50 border border-sky-200">
                    <b class="text-sky-900">• Peringkat Pertengahan:</b>
                    <span class="text-sky-800"> Kecerunan tangen semakin berkurang (semakin landai). Kadar tindak balas <b>semakin berkurang</b> kerana kepekatan bahan tindak balas semakin menyusut.</span>
                  </div>
                  <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <b class="text-emerald-900">• Peringkat Akhir (Graf Mendatar):</b>
                    <span class="text-emerald-800"> Kecerunan tangen = 0. Kadar tindak balas adalah <b>sifar (tindak balas telah lengkap berhenti)</b> kerana salah satu bahan tindak balas telah habis digunakan sepenuhnya (bahan pengehad).</span>
                  </div>
                </div>
              </div>

              <!-- KAD 3: PANDUAN PENGIRAAN SPM -->
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                  Langkah Menghitung Kadar Purata &amp; Kadar pada Masa Tertentu (Buku Teks m/s 226)
                </span>
                
                <div class="space-y-2.5 text-xs text-slate-700">
                  <div class="p-3 rounded-xl bg-white border border-slate-200">
                    <b class="text-sky-900 block mb-1">A. Kadar Tindak Balas Purata:</b>
                    <ul class="list-disc pl-5 space-y-1 font-mono text-slate-800">
                      <li>Kadar purata t saat pertama = (Isi padu gas pada masa t) / t cm³ s⁻¹</li>
                      <li>Kadar purata dari masa t₁ hingga t₂ = (V₂ - V₁) / (t₂ - t₁) cm³ s⁻¹</li>
                      <li>Kadar purata keseluruhan = Isi padu gas maksimum (V_maks) / Masa tindak balas lengkap cm³ s⁻¹</li>
                    </ul>
                  </div>

                  <div class="p-3 rounded-xl bg-white border border-slate-200">
                    <b class="text-rose-900 block mb-1">B. Kadar Tindak Balas pada Masa Tertentu (Kadar Seketika):</b>
                    <p class="text-slate-600 mb-2">Diperoleh daripada <b>kecerunan tangen</b> kepada lengkung graf pada masa $t$ melalui 3 langkah penskoran SPM:</p>
                    <ol class="list-decimal pl-5 space-y-1 text-slate-700">
                      <li><b>Langkah 1:</b> Lukis garis tangen lurus yang menyentuh lengkung graf tepat pada titik masa $t$.</li>
                      <li><b>Langkah 2:</b> Bina segi tiga bersudut tegak yang besar dengan jarak mencancang Δy = (V₂ - V₁) dan jarak mengufuk Δx = (t₂ - t₁).</li>
                      <li><b>Langkah 3:</b> Hitung kecerunan: 
                        <span class="font-mono font-bold text-rose-700 ml-1">Kadar pada masa t = (V₂ - V₁) / (t₂ - t₁) cm³ s⁻¹</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Mengira kadar tindak balas pada masa t dengan hanya membahagikan isi padu pada masa itu dengan masa (V/t).',
          correction: 'Mesti melukis garisan tangen yang menyentuh lengkung pada masa t, kemudian hitung kecerunan tangen tersebut (ΔV / Δt).',
          why: 'Kadar tindak balas berubah secara berterusan sepanjang masa; V/t hanyalah kadar purata dari masa 0 hingga t, bukan kadar seketika.',
          spmTip: 'Sentiasa bina segi tiga tangen yang besar untuk mengira kecerunan bagi mengurangkan ralat pembacaan.'
        },
        {
          mistake: 'Menganggap tindak balas berhenti apabila isi padu gas mencecah nilai sifar.',
          correction: 'Tindak balas berhenti apabila graf menjadi mendatar (isipadu gas tidak lagi bertambah, kecerunan tangen = 0).',
          why: 'Pada peringkat akhir, salah satu bahan tindak balas telah habis bertindak balas sepenuhnya (bahan pengehad).',
          spmTip: 'Takat mendatar pertama menunjukkan masa tindak balas lengkap.'
        }
      ],
      flashcards: [
        {
          id: 't4-b7-s1-fc1',
          front: 'Apakah takrifan kadar tindak balas secara saintifik?',
          back: 'Perubahan kuantiti bahan tindak balas atau hasil tindak balas per unit masa.'
        },
        {
          id: 't4-b7-s1-fc2',
          front: 'Bagaimanakah kadar tindak balas seketika pada masa t ditentukan daripada graf isi padu gas melawan masa?',
          back: 'Dengan melukis tangen pada titik masa t pada lengkung graf, kemudian menghitung kecerunan tangen tersebut (dy/dx).'
        },
        {
          id: 't4-b7-s1-fc3',
          front: 'Mengapakah kecerunan lengkung graf isi padu gas melawan masa semakin berkurang apabila masa berlalu?',
          back: 'Kerana kepekatan/jisim bahan tindak balas semakin berkurang, menyebabkan frekuensi perlanggaran antara zarah berkurang.'
        },
        {
          id: 't4-b7-s1-fc4',
          front: 'Apakah yang ditunjukkan oleh bahagian mendatar pada graf isi padu gas melawan masa?',
          back: 'Tindak balas telah selesai/lengkap sepenuhnya kerana bahan tindak balas pengehad telah habis digunakan (kadar = 0).'
        },
        {
          id: 't4-b7-s1-fc5',
          front: 'Berikan satu contoh tindak balas kimia yang cepat dan satu yang perlahan dalam kehidupan harian.',
          back: 'Cepat: Pembakaran gas memasak / letupan mercun. Perlahan: Pengaratan pagar besi / fotosintesis.'
        }
      ],
      quiz: [
        {
          id: 't4-b7-s1-q1',
          question: 'Antara yang berikut, tindak balas manakah yang mempunyai kadar tindak balas paling tinggi?',
          options: [
            'Pengaratan paku besi di udara terbuka',
            'Tindak balas peneutralan antara asid hidroklorik dengan natrium hidroksida',
            'Penapaian larutan glukosa oleh yis',
            'Pembentukan stalaktit dan stalagmit dalam gua'
          ],
          answerIndex: 1,
          explanation: 'Peneutralan asid-alkali ialah tindak balas ionik yang berlaku serta-merta dalam beberapa saat, menjadikannya tindak balas sangat cepat.',
          level: 'Rendah'
        },
        {
          id: 't4-b7-s1-q2',
          question: 'Dalam satu eksperimen, 50 cm³ gas hidrogen dikumpulkan dalam masa 20 saat. Berapakah kadar tindak balas purata bagi eksperimen ini?',
          options: ['0.4 cm³ s⁻¹', '2.5 cm³ s⁻¹', '70 cm³ s⁻¹', '1000 cm³ s⁻¹'],
          answerIndex: 1,
          explanation: 'Kadar purata = Isi padu gas / Masa = 50 cm³ ÷ 20 s = 2.5 cm³ s⁻¹.',
          level: 'Rendah'
        },
        {
          id: 't4-b7-s1-q3',
          question: 'Rajah graf menunjukkan isi padu gas melawan masa. Bilakah kadar tindak balas berada pada tahap paling maksimum?',
          options: [
            'Pada masa t = 0 saat (pada permulaan tindak balas)',
            'Pada separuh masa tindak balas',
            'Apabila graf mula menjadi mendatar',
            'Selepas tindak balas lengkap sepenuhnya'
          ],
          answerIndex: 0,
          explanation: 'Pada t = 0 s, kepekatan bahan tindak balas berada pada paras tertinggi, maka kecerunan tangen paling curam dan kadar tindak balas adalah maksimum.',
          level: 'Sederhana'
        },
        {
          id: 't4-b7-s1-q4',
          question: 'Antara kaedah berikut, yang manakah TIDAK SESUAI digunakan untuk mengukur kadar tindak balas antara larutan natrium tiosulfat dengan asid sulfurik?',
          options: [
            'Mengukur masa untuk tanda "X" tidak kelihatan',
            'Mengumpul isi padu gas menggunakan buret tertonggang',
            'Mengukur keamatan warna mendakan kuning sulfur menggunakan fotometer',
            'Menentukan nilai 1/masa bagi mendakan sulfur terbentuk'
          ],
          answerIndex: 1,
          explanation: 'Tindak balas ini membebaskan mendakan sulfur pepejal kuning dan gas SO₂ yang sangat larut dalam air, maka ia tidak diukur melalui pengumpulan gas dalam buret.',
          level: 'Sederhana'
        },
        {
          id: 't4-b7-s1-q5',
          question: 'Pada minit ke-2, tangen dilukis pada graf isi padu gas melawan masa dan melalui titik (1 minit, 15 cm³) dan (3 minit, 45 cm³). Hitung kadar tindak balas pada minit ke-2.',
          options: ['10 cm³ min⁻¹', '15 cm³ min⁻¹', '20 cm³ min⁻¹', '30 cm³ min⁻¹'],
          answerIndex: 1,
          explanation: 'Kecerunan tangen = (45 - 15) cm³ ÷ (3 - 1) min = 30 ÷ 2 = 15 cm³ min⁻¹.',
          level: 'Sederhana'
        },
        {
          id: 't4-b7-s1-q6',
          question: 'Eksperimen I menggunakan 2 g ketulan marmar berlebihan dengan 25 cm³ asid HCl 0.1 mol dm⁻³. Eksperimen II diulang menggunakan 2 g ketulan marmar berlebihan dengan 50 cm³ asid HCl 0.1 mol dm⁻³. Apakah perbandingan kecerunan awal dan isi padu maksimum gas antara Eksperimen I dan II?',
          options: [
            'Kecerunan awal sama, isi padu gas maksimum Eksperimen II adalah dua kali ganda Eksperimen I',
            'Kecerunan awal Eksperimen II dua kali ganda lebih curam, isi padu gas maksimum sama',
            'Kecerunan awal dan isi padu maksimum kedua-dua eksperimen adalah sama',
            'Kecerunan awal Eksperimen II lebih landai, isi padu gas maksimum lebih sedikit'
          ],
          answerIndex: 0,
          explanation: 'Kepekatan asid sama (0.1 M) maka kecerunan awal sama. Bilangan mol asid dalam Eksperimen II (0.005 mol) adalah dua kali ganda Eksperimen I (0.0025 mol), menghasilkan dua kali ganda isi padu gas CO₂.',
          level: 'Tinggi (KBAT)'
        }
      ]
    },

    // -------------------------------------------------------------
    // SUBTOPIK 7.2: FAKTOR YANG MEMPENGARUHI KADAR TINDAK BALAS
    // -------------------------------------------------------------
    {
      id: 't4-b7-s2',
      code: '7.2',
      title: 'Faktor yang Mempengaruhi Kadar Tindak Balas',
      learningStandard: 'SP 7.2.1',
      durationMinutes: 35,
      tldr: [
        'Terdapat 4 faktor utama yang mempengaruhi kadar tindak balas mengikut sukatan SPM: Saiz bahan tindak balas pepejal, Kepekatan bahan tindak balas akueus, Suhu campuran tindak balas, dan Kehadiran Mangkin (serta Tekanan bagi gas).',
        '1. Saiz Pepejal: Saiz lebih kecil → Jumlah luas permukaan terdedah lebih besar → Kadar tindak balas lebih tinggi.',
        '2. Kepekatan Larutan: Kepekatan lebih tinggi → Bilangan zarah per unit isi padu lebih banyak → Kadar tindak balas lebih tinggi.',
        '3. Suhu: Suhu lebih tinggi → Zarah bergerak lebih pantas dan memperoleh tenaga kinetik lebih tinggi → Kadar tindak balas bertambah.',
        '4. Mangkin: Mangkin menyediakan laluan alternatif dengan tenaga pengaktifan (Ea) yang lebih rendah → Kadar tindak balas meningkat. Mangkin tidak berubah secara kimia pada akhir tindak balas.'
      ],
      simulationRef: {
        id: 'kadar-kepekatan',
        title: 'Makmal Maya Ujian Faktor Kadar Tindak Balas (Eksperimen Tanda X)',
        description: 'Uji pengaruh kepekatan natrium tiosulfat dan suhu terhadap masa kehilangan tanda pangkah secara interaktif dengan graf 1/masa.',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=kadar-kepekatan',
        previewBadge: 'Simulasi Bab 7.2'
      },
      concepts: [
        {
          id: 't4-b7-s2-c1',
          title: '4 Faktor Utama Kadar Tindak Balas (Buku Teks KSSM)',
          badge: 'Faktor Teras SPM',
          content: `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 my-2">
              <div class="p-3 rounded-2xl bg-white border border-slate-200">
                <span class="text-xs font-bold text-sky-800 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-sky-500"></span> 1. Saiz Bahan Pepejal
                </span>
                <p class="text-xs text-slate-600 mt-1 leading-relaxed">
                  Apabila ketulan besar dipecahkan kepada ketulan kecil atau serbuk halus, <b>jumlah luas permukaan yang terdedah kepada perlanggaran menjadi lebih besar</b>. Ini membolehkan lebih banyak perlanggaran berlaku pada satu-satu masa.
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-white border border-slate-200">
                <span class="text-xs font-bold text-teal-800 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-teal-500"></span> 2. Kepekatan Larutan
                </span>
                <p class="text-xs text-slate-600 mt-1 leading-relaxed">
                  Larutan yang lebih pekat mengandungi <b>bilangan zarah bahan tindak balas per unit isi padu yang lebih banyak</b>. Zarah-zarah berada lebih rapat antara satu sama lain.
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-white border border-slate-200">
                <span class="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-amber-500"></span> 3. Suhu Campuran
                </span>
                <p class="text-xs text-slate-600 mt-1 leading-relaxed">
                  Peningkatan suhu menyebabkan zarah-zarah <b>memperoleh tenaga kinetik yang lebih tinggi</b> dan bergerak dengan lebih laju.
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-white border border-slate-200">
                <span class="text-xs font-bold text-indigo-800 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-indigo-500"></span> 4. Kehadiran Mangkin
                </span>
                <p class="text-xs text-slate-600 mt-1 leading-relaxed">
                  Mangkin ialah bahan kimia yang mengubah kadar tindak balas tanpa mengalami perubahan kimia pada akhir tindak balas dengan menyediakan <b>laluan alternatif dengan tenaga pengaktifan yang lebih rendah</b>.
                </p>
              </div>
            </div>
          `
        },
        {
          id: 't4-b7-s2-c2',
          title: 'Analisis Bentuk Lengkung Graf Kesan Faktor',
          badge: 'Tafsiran Lengkung Graf SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-indigo-900 uppercase tracking-wider block mb-2 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                  Perbandingan Bentuk Lengkung Graf Bagi Kadar Berbeza (Buku Teks m/s 238)
                </span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Dalam amali SPM, eksperimen lazimnya diulang dengan memanipulasikan satu faktor (cth: ketulan vs serbuk, kepekatan tinggi vs rendah, bersuhu bilik vs dipanaskan, atau tanpa mangkin vs bermangkin). Dua lengkung graf akan terhasil:
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <div class="p-3 rounded-xl bg-rose-50 border border-rose-200">
                    <b class="text-rose-900 flex items-center gap-1.5 mb-1">
                      <span class="w-2 h-2 rounded-full bg-rose-500"></span> Lengkung I (Kadar Lebih Tinggi)
                    </b>
                    <ul class="list-disc pl-4 space-y-1 text-rose-800">
                      <li>Kecerunan lengkung awal <b>lebih curam</b>.</li>
                      <li>Masa tindak balas lengkap (t₁) <b>lebih singkat / cepat</b>.</li>
                      <li>Punca: Serbuk halus / Kepekatan tinggi / Suhu tinggi / Kehadiran mangkin.</li>
                    </ul>
                  </div>

                  <div class="p-3 rounded-xl bg-blue-50 border border-blue-200">
                    <b class="text-blue-900 flex items-center gap-1.5 mb-1">
                      <span class="w-2 h-2 rounded-full bg-blue-500"></span> Lengkung II (Kadar Lebih Rendah)
                    </b>
                    <ul class="list-disc pl-4 space-y-1 text-blue-800">
                      <li>Kecerunan lengkung awal <b>lebih landai</b>.</li>
                      <li>Masa tindak balas lengkap (t₂) <b>lebih panjang / lambat</b> (t₂ > t₁).</li>
                      <li>Punca: Ketulan besar / Kepekatan rendah / Suhu bilik / Tanpa mangkin.</li>
                    </ul>
                  </div>
                </div>

                <!-- PRINSIP EMAS TAFSIRAN GRAF SPM -->
                <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1.5">
                  <b class="text-amber-900 block font-bold">★ Prinsip Emas Menjawab Soalan Graf SPM:</b>
                  <p class="leading-relaxed">
                    <b>1. Kecerunan Awal Graf:</b> Ditentukan oleh <b>kadar tindak balas</b> (faktor saiz, kepekatan, suhu, atau mangkin). Kecerunan curam = kadar tinggi.
                  </p>
                  <p class="leading-relaxed">
                    <b>2. Paras Mendatar Maksimum (V_maks):</b> Ditentukan HANYA oleh <b>bilangan mol bahan pengehad</b> ($n = MV/1000$ atau $n = \\text{jisim}/\\text{JAR}$).
                  </p>
                  <div class="p-2 rounded-lg bg-white border border-amber-300 font-semibold text-amber-900 text-[11px]">
                    Ingat: Faktor suhu, mangkin, dan saiz pepejal TIDAK MENGUBAH ketinggian mendatar V_maks sekiranya kuantiti mol bahan tindak balas tidak berubah!
                  </div>
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menyatakan serbuk mempunyai jumlah luas permukaan yang lebih kecil kerana saiznya kecil.',
          correction: 'Bagi jisim yang sama, serbuk halus mempunyai JUMLAH LUAS PERMUKAAN YANG LEBIH BESAR berbanding ketulan besar.',
          why: 'Memecahkan pepejal mendedahkan banyak permukaan dalaman baharu kepada zarah bahan tindak balas.',
          spmTip: 'Sentiasa tulis perkataan lengkap: "jumlah luas permukaan yang terdedah".'
        },
        {
          mistake: 'Menganggap mangkin meningkatkan kuantiti hasil tindak balas pada akhir eksperimen.',
          correction: 'Mangkin HANYA mempercepatkan masa tindak balas mencapai kesudahan; ia TIDAK mengubah kuantiti atau isi padu maksimum hasil tindak balas.',
          why: 'Kuantiti hasil ditentukan sepenuhnya oleh stoikiometri dan bilangan mol bahan pengehad.',
          spmTip: 'Graf dengan mangkin lebih curam tetapi mendatar pada aras V_maks yang sama.'
        }
      ],
      flashcards: [
        {
          id: 't4-b7-s2-fc1',
          front: 'Bagaimanakah saiz bahan tindak balas pepejal mempengaruhi kadar tindak balas?',
          back: 'Saiz pepejal lebih kecil mempunyai jumlah luas permukaan terdedah yang lebih besar, membolehkan lebih banyak perlanggaran berlaku, maka kadar tindak balas meningkat.'
        },
        {
          id: 't4-b7-s2-fc2',
          front: 'Mengapakah peningkatan kepekatan larutan meningkatkan kadar tindak balas?',
          back: 'Kepekatan lebih tinggi mengandungi bilangan zarah per unit isi padu yang lebih banyak, menyebabkan zarah berada lebih rapat.'
        },
        {
          id: 't4-b7-s2-fc3',
          front: 'Apakah kesan peningkatan suhu ke atas tenaga kinetik zarah?',
          back: 'Peningkatan suhu membekalkan tenaga haba yang ditukar kepada tenaga kinetik, menyebabkan zarah bergerak lebih laju.'
        },
        {
          id: 't4-b7-s2-fc4',
          front: 'Apakah peranan mangkin dalam meningkatkan kadar tindak balas?',
          back: 'Mangkin menyediakan laluan alternatif dengan tenaga pengaktifan yang lebih rendah tanpa mengubah sifat kimianya sendiri.'
        },
        {
          id: 't4-b7-s2-fc5',
          front: 'Namakan mangkin yang digunakan dalam tindak balas penguraian hidrogen peroksida, H₂O₂.',
          back: 'Mangan(IV) oksida, MnO₂ (serbuk hitam).'
        }
      ],
      quiz: [
        {
          id: 't4-b7-s2-q1',
          question: 'Antara yang berikut, yang manakah meningkatkan kadar tindak balas antara zink dengan asid hidroklorik?',
          options: [
            'Menggunakan ketulan zink yang lebih besar',
            'Menambah air suling ke dalam asid hidroklorik',
            'Menaikkan suhu campuran tindak balas dari 30°C ke 50°C',
            'Mengurangkan kepekatan asid hidroklorik'
          ],
          answerIndex: 2,
          explanation: 'Peningkatan suhu membekalkan lebih banyak tenaga kinetik kepada zarah, mempercepatkan tindak balas.',
          level: 'Rendah'
        },
        {
          id: 't4-b7-s2-q2',
          question: 'Bagi jisim yang sama iaitu 5 g kalsium karbonat, bentuk manakah yang mempunyai jumlah luas permukaan terdedah paling besar?',
          options: ['Ketulan besar', 'Cip bersaiz sederhana', 'Serbuk halus', 'Bongkah padat'],
          answerIndex: 2,
          explanation: 'Serbuk halus mempunyai zarah terkecil dan oleh itu mempunyai jumlah luas permukaan terdedah yang paling besar bagi jisim yang sama.',
          level: 'Rendah'
        },
        {
          id: 't4-b7-s2-q3',
          question: 'Apakah yang berlaku kepada jisim dan sifat kimia sesuatu mangkin pada akhir tindak balas kimia?',
          options: [
            'Jisim berkurang dan sifat kimianya berubah',
            'Jisim tidak berubah dan sifat kimianya tidak berubah',
            'Jisim bertambah kerana menyerap bahan tindak balas',
            'Mangkin terurai menjadi gas'
          ],
          answerIndex: 1,
          explanation: 'Mengikut definisi mangkin, jisim dan komposisi kimianya kekal tidak berubah sebelum dan selepas tindak balas.',
          level: 'Sederhana'
        },
        {
          id: 't4-b7-s2-q4',
          question: 'Satu eksperimen tanda "X" dijalankan dengan memanaskan larutan natrium tiosulfat kepada suhu 30°C, 40°C, 50°C, dan 60°C. Apakah hubungan antara suhu dengan masa, t untuk tanda "X" hilang?',
          options: [
            'Semakin tinggi suhu, semakin panjang masa t',
            'Semakin tinggi suhu, semakin pendek masa t (kadar 1/t bertambah)',
            'Suhu tidak mempengaruhi masa t',
            'Masa t berkadar terus dengan suhu'
          ],
          answerIndex: 1,
          explanation: 'Suhu tinggi meningkatkan kadar tindak balas, maka masa yang diambil untuk pembentukan mendakan sulfur menutup tanda X menjadi semakin singkat.',
          level: 'Sederhana'
        },
        {
          id: 't4-b7-s2-q5',
          question: 'Dalam penyediaan gas oksigen di makmal melalui penguraian H₂O₂, penambahan 1 g serbuk MnO₂ menyebabkan pembuakan gas berlaku serta-merta. Apakah fungsi MnO₂?',
          options: [
            'Sebagai agen pengoksidaan yang menggunakan elektron',
            'Sebagai mangkin positif yang merendahkan tenaga pengaktifan',
            'Meningkatkan suhu tindak balas secara mendadak',
            'Menambah bilangan mol gas oksigen terhasil'
          ],
          answerIndex: 1,
          explanation: 'MnO₂ bertindak sebagai mangkin yang menyediakan laluan alternatif dengan tenaga pengaktifan lebih rendah bagi penguraian H₂O₂.',
          level: 'Sederhana'
        },
        {
          id: 't4-b7-s2-q6',
          question: 'Eksperimen mereaksikan 5 g ketulan CaCO₃ dengan 50 cm³ HCl 1.0 mol dm⁻³. Antara perubahan berikut, yang manakah akan meningkatkan kadar awal tindak balas TETAPI menghasilkan isi padu maksimum gas CO₂ yang SAMA?',
          options: [
            'Gantikan dengan 50 cm³ HCl 2.0 mol dm⁻³',
            'Gantikan ketulan CaCO₃ dengan 5 g serbuk CaCO₃',
            'Gantikan dengan 10 g ketulan CaCO₃',
            'Tambah 50 cm³ air suling ke dalam asid'
          ],
          answerIndex: 1,
          explanation: 'Menggantikan ketulan dengan serbuk berjisim sama (5 g) meningkatkan luas permukaan (kadar lebih tinggi), tetapi bilangan mol bahan kekal sama maka isi padu maksimum gas tetap sama.',
          level: 'Tinggi (KBAT)'
        }
      ]
    },

    // -------------------------------------------------------------
    // SUBTOPIK 7.3: APLIKASI KADAR TINDAK BALAS DALAM KEHIDUPAN & INDUSTRI
    // -------------------------------------------------------------
    {
      id: 't4-b7-s3',
      code: '7.3',
      title: 'Aplikasi Kadar Tindak Balas dalam Kehidupan',
      learningStandard: 'SP 7.3.1',
      durationMinutes: 20,
      tldr: [
        'Aplikasi faktor saiz dalam aktiviti harian: Memotong daging atau kentang kepada kepingan kecil supaya masak lebih cepat; menggunakan serbuk arang untuk menyalakan api lebih pantas.',
        'Aplikasi faktor suhu: Menyimpan makanan dalam peti sejuk melambatkan aktiviti bakteria dan penguraian makanan; memasak dalam periuk tekanan pada suhu > 100°C mempercepatkan masa memasak.',
        'Aplikasi mangkin dalam industri kimia berskala besar (Wajib SPM):',
        '1. Proses Haber (Penghasilan Ammonia): Mangkin Serbuk Besi (Fe), suhu 450°C - 500°C, tekanan 200 atm.',
        '2. Proses Sentuh (Penghasilan Asid Sulfurik): Mangkin Vanadium(V) oksida (V₂O₅), suhu 450°C, tekanan 1 atm.',
        '3. Proses Ostwald (Penghasilan Asid Nitrik): Mangkin Platinum (Pt), suhu 850°C.',
        '4. Penghidrogenan Minyak Sawit (Marjerin): Mangkin Nikel (Ni), suhu 180°C.'
      ],
      concepts: [
        {
          id: 't4-b7-s3-c1',
          title: 'Aplikasi Harian: Memasak, Penyimpanan Makanan & Kebakaran',
          badge: 'Contoh Kehidupan Harian',
          content: `
            <div class="space-y-2.5 mt-2">
              <div class="p-3 rounded-2xl bg-white border border-slate-200">
                <span class="text-xs font-bold text-slate-900 block mb-1">1. Penyimpanan Makanan dalam Peti Sejuk (Faktor Suhu)</span>
                <p class="text-xs text-slate-600 leading-relaxed">
                  Pada suhu rendah di dalam peti sejuk (kira-kira 4°C) atau ruang beku (-18°C), kadar tindak balas biokimia dan pembiakan bakteria menjadi sangat perlahan. Ini melambatkan kerosakan dan pereputan makanan.
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-white border border-slate-200">
                <span class="text-xs font-bold text-slate-900 block mb-1">2. Periuk Tekanan Tinggi (Faktor Tekanan & Suhu)</span>
                <p class="text-xs text-slate-600 leading-relaxed">
                  Di dalam periuk tekanan tertutup, tekanan tinggi meningkatkan takat didih air melebihi 100°C (mencecah 120°C). Suhu air yang lebih tinggi ini membolehkan makanan menyerap haba lebih cepat dan masak dalam masa separuh daripada masa biasa.
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-white border border-slate-200">
                <span class="text-xs font-bold text-slate-900 block mb-1">3. Saiz Potongan Makanan & Kayu Api (Faktor Saiz)</span>
                <p class="text-xs text-slate-600 leading-relaxed">
                  Daging yang dihiris nipis atau kentang yang dipotong kecil mempunyai jumlah luas permukaan terdedah yang lebih besar untuk menyerap haba, menjadikannya empuk dan masak lebih cepat.
                </p>
              </div>
            </div>
          `
        },
        {
          id: 't4-b7-s3-c2',
          title: 'Aplikasi Mangkin dalam Industri Kimia Berskala Besar (Jadual Wajib SPM)',
          badge: 'Jadual Industri SPM',
          content: `
            <div class="overflow-x-auto my-2">
              <table class="w-full text-xs text-left border-collapse border border-slate-200">
                <thead>
                  <tr class="bg-slate-100 text-slate-800">
                    <th class="p-2 border border-slate-200">Proses Industri</th>
                    <th class="p-2 border border-slate-200">Hasil Industri</th>
                    <th class="p-2 border border-slate-200">Mangkin Digunakan</th>
                    <th class="p-2 border border-slate-200">Keadaan Optimum</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td class="p-2 font-bold text-sky-900">Proses Haber</td>
                    <td class="p-2">Ammonia, NH₃</td>
                    <td class="p-2 font-mono font-semibold">Serbuk Besi, Fe</td>
                    <td class="p-2">450°C - 500°C, 200 atm</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-bold text-teal-900">Proses Sentuh</td>
                    <td class="p-2">Asid sulfurik, H₂SO₄</td>
                    <td class="p-2 font-mono font-semibold">Vanadium(V) oksida, V₂O₅</td>
                    <td class="p-2">450°C, 1 atm</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-bold text-amber-900">Proses Ostwald</td>
                    <td class="p-2">Asid nitrik, HNO₃</td>
                    <td class="p-2 font-mono font-semibold">Platinum, Pt</td>
                    <td class="p-2">850°C, 5 atm</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-bold text-indigo-900">Penghidrogenan Minyak</td>
                    <td class="p-2">Marjerin</td>
                    <td class="p-2 font-mono font-semibold">Nikel, Ni</td>
                    <td class="p-2">180°C, 4 atm</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-bold text-rose-900">Pengubah Bermangkin (Kereta)</td>
                    <td class="p-2">Tukar CO & NOₓ kepada CO₂ & N₂</td>
                    <td class="p-2 font-mono font-semibold">Platinum (Pt) & Rodium (Rh)</td>
                    <td class="p-2">Suhu ekzos kenderaan</td>
                  </tr>
                </tbody>
              </table>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Tertukar mangkin antara Proses Haber dan Proses Sentuh.',
          correction: 'Proses Haber menggunakan Serbuk Besi (Fe), manakala Proses Sentuh menggunakan Vanadium(V) oksida (V₂O₅).',
          why: 'Kedua-dua proses melibatkan tindak balas gas yang memerlukan mangkin peralihan khusus untuk menurunkan tenaga pengaktifan.',
          spmTip: 'Mnemonic: "Haber ada Besi (Fe), Sentuh ada Vanadium (V₂O₅)".'
        },
        {
          mistake: 'Menganggap periuk tekanan memasak lebih cepat kerana makanan dihimpit oleh tekanan mekanikal.',
          correction: 'Tekanan tinggi menyebabkan TAKAT DIDIH AIR MENINGKAT melebihi 100°C, maka suhu memasak menjadi lebih tinggi.',
          why: 'Faktor sebenar yang mempercepatkan tindak balas pematangan makanan ialah suhu yang lebih tinggi, bukan daya tekanan fizikal.',
          spmTip: 'Jawapan SPM: "Suhu air meningkat melebihi 100°C di bawah tekanan tinggi".'
        }
      ],
      flashcards: [
        {
          id: 't4-b7-s3-fc1',
          front: 'Apakah mangkin dan keadaan optimum yang digunakan dalam Proses Haber?',
          back: 'Mangkin: Serbuk besi (Fe). Suhu: 450°C - 500°C. Tekanan: 200 atmosfera.'
        },
        {
          id: 't4-b7-s3-fc2',
          front: 'Apakah mangkin yang digunakan dalam Proses Sentuh bagi menghasilkan asid sulfurik?',
          back: 'Vanadium(V) oksida, V₂O₅ pada suhu 450°C dan tekanan 1 atmosfera.'
        },
        {
          id: 't4-b7-s3-fc3',
          front: 'Mengapakah makanan dalam periuk tekanan memasak lebih pantas berbanding periuk biasa?',
          back: 'Tekanan tinggi meningkatkan takat didih air melebihi 100°C, membolehkan makanan menyerap lebih banyak haba pada suhu tinggi.'
        },
        {
          id: 't4-b7-s3-fc4',
          front: 'Bagaimanakah peti sejuk melambatkan kerosakan makanan?',
          back: 'Suhu rendah melambatkan kadar tindak balas biokimia dan pembiakan bakteria perosak makanan.'
        },
        {
          id: 't4-b7-s3-fc5',
          front: 'Apakah fungsi penukar bermangkin (catalytic converter) dalam sistem ekzos kereta?',
          back: 'Menggunakan mangkin platinum/rodium untuk menukarkan gas toksik (CO, NOₓ, hidrokarbon) kepada gas tidak berbahaya (CO₂, N₂, H₂O).'
        }
      ],
      quiz: [
        {
          id: 't4-b7-s3-q1',
          question: 'Apakah mangkin yang digunakan dalam industri untuk mengubah minyak cecair sawit kepada pepejal marjerin?',
          options: ['Serbuk besi, Fe', 'Logam nikel, Ni', 'Vanadium(V) oksida, V₂O₅', 'Kuprum(II) sulfat, CuSO₄'],
          answerIndex: 1,
          explanation: 'Nikel digunakan sebagai pemangkin dalam tindak balas penghidrogenan minyak sayuran kepada marjerin pada suhu sekitar 180°C.',
          level: 'Rendah'
        },
        {
          id: 't4-b7-s3-q2',
          question: 'Dalam Proses Sentuh bagi pembuatan asid sulfurik, tindak balas penukaran sulfur dioksida kepada sulfur trioksida memerlukan mangkin:',
          options: ['Serbuk zink', 'Mangan(IV) oksida', 'Vanadium(V) oksida', 'Asid klorida pekat'],
          answerIndex: 2,
          explanation: 'Vanadium(V) oksida (V₂O₅) ialah mangkin khusus untuk mengoksidakan SO₂ kepada SO₃: 2SO₂ + O₂ ⇌ 2SO₃.',
          level: 'Rendah'
        },
        {
          id: 't4-b7-s3-q3',
          question: 'Mengapakah seorang tukang masak memotong daging lembu kepada kiub kecil sebelum memasak rendang?',
          options: [
            'Untuk mengurangkan kandungan lemak daging',
            'Menambahkan jumlah luas permukaan daging supaya haba diserap lebih cepat dan daging cepat empuk',
            'Mengurangkan tenaga pengaktifan tindak balas pereputan',
            'Membolehkan daging menyerap gas oksigen dengan lebih banyak'
          ],
          answerIndex: 1,
          explanation: 'Saiz potongan yang lebih kecil meningkatkan jumlah luas permukaan terdedah, meningkatkan pemindahan haba dan kadar kemasakan.',
          level: 'Sederhana'
        },
        {
          id: 't4-b7-s3-q4',
          question: 'Apakah gas yang dihasilkan dalam Proses Haber yang menggunakan mangkin serbuk besi (Fe)?',
          options: ['Gas klorin', 'Gas sulfur trioksida', 'Gas ammonia', 'Gas karbon monoksida'],
          answerIndex: 2,
          explanation: 'Proses Haber menggabungkan gas nitrogen dan hidrogen untuk menghasilkan gas ammonia: N₂ + 3H₂ ⇌ 2NH₃.',
          level: 'Sederhana'
        },
        {
          id: 't4-b7-s3-q5',
          question: 'Seorang saintis mendapati susu segar masam dalam masa 6 jam pada suhu bilik (30°C) tetapi kekal elok selama 5 hari pada suhu 4°C. Fenomena ini dijelaskan oleh:',
          options: [
            'Bakteria musnah sepenuhnya pada suhu 4°C',
            'Suhu rendah mengurangkan tenaga kinetik dan merendahkan kadar tindak balas penapaian bakteria',
            'Air dalam susu membeku dan menghentikan pengaliran cecair',
            'Susu menyerap gas nitrogen pada suhu sejuk'
          ],
          answerIndex: 1,
          explanation: 'Pada 4°C, kadar tindak balas bakteria asid laktik sangat perlahan kerana tenaga kinetik zarah rendah, melambatkan proses penapaian.',
          level: 'Sederhana'
        },
        {
          id: 't4-b7-s3-q6',
          question: 'Dalam industri pembuatan ammonia (Proses Haber), suhu 450°C digunakan walaupun tindak balas ke hadapan adalah eksotermik (di mana suhu lebih rendah secara teori menghasilkan lebih banyak peratusan hasil). Mengapakah suhu 450°C tetap dipilih?',
          options: [
            'Suhu 450°C diperlukan untuk mengelakkan mangkin besi daripada lebur',
            'Sebagai suhu kompromi untuk memastikan kadar tindak balas cukup pantas secara ekonomi',
            'Suhu rendah menyebabkan gas hidrogen meletup',
            'Suhu 450°C membolehkan tekanan dikurangkan kepada 1 atmosfera'
          ],
          answerIndex: 1,
          explanation: 'Pada suhu terlalu rendah, tindak balas berlaku terlalu lambat (tidak ekonomik). Suhu 450°C ialah suhu kompromi optimum antara kadar tindak balas dan hasil keseimbangan.',
          level: 'Tinggi (KBAT)'
        }
      ]
    },

    // -------------------------------------------------------------
    // SUBTOPIK 7.4: TEORI PERLANGGARAN & PROFIL ARAS TENAGA
    // -------------------------------------------------------------
    {
      id: 't4-b7-s4',
      code: '7.4',
      title: 'Teori Perlanggaran',
      learningStandard: 'SP 7.4.1, 7.4.2, 7.4.3',
      durationMinutes: 35,
      tldr: [
        'Teori Perlanggaran menyatakan bahawa zarah-zarah bahan tindak balas MESTI berlanggar antara satu sama lain untuk membolehkan tindak balas berlaku.',
        'Dua syarat wajib bagi menghasilkan PERLANGGARAN BERKESAN (tindak balas berlaku):',
        '1. Zarah berlanggar mesti mempunyai tenaga yang sama atau melebihi Tenaga Pengaktifan (Tenaga Kinetik ≥ Ea).',
        '2. Zarah mesti berlanggar pada orientasi yang betul (susunan ruang yang tepat).',
        'Tenaga Pengaktifan (Ea): Tenaga minimum yang diperlukan oleh zarah bahan tindak balas untuk memulakan tindak balas kimia.',
        'Hubungan Kunci SPM: Kadar tindak balas berkadar terus dengan Frekuensi Perlanggaran Berkesan antara zarah-zarah.',
        'Gambar rajah profil aras tenaga: Menunjukkan perbezaan aras tenaga bahan dan hasil serta puncak tenaga pengaktifan (Ea) bagi tindak balas eksotermik (ΔH negatif) dan endotermik (ΔH positif).'
      ],
      simulationRef: {
        id: 'kadar-mangkin',
        title: 'Makmal Maya Teori Perlanggaran & Profil Aras Tenaga',
        description: 'Visualkan pergerakan zarah, perlanggaran berkesan, dan kesan mangkin yang merendahkan puncak tenaga pengaktifan (Ea).',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=kadar-mangkin',
        previewBadge: 'Simulasi Bab 7.4'
      },
      concepts: [
        {
          id: 't4-b7-s4-c1',
          title: 'Prinsip Teori Perlanggaran & Syarat Perlanggaran Berkesan',
          badge: 'Teori Perlanggaran KSSM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Dua Syarat Utama Perlanggaran Berkesan (Buku Teks m/s 244)
                </span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Menurut Teori Perlanggaran, zarah-zarah bahan tindak balas mestilah berlanggar antara satu sama lain untuk membolehkan tindak balas kimia berlaku. Namun begitu, <b>bukan semua perlanggaran menghasilkan tindak balas</b>. Hanya <b>perlanggaran berkesan</b> yang membentuk hasil tindak balas apabila memenuhi dua syarat:
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <b class="text-emerald-900 block mb-1">1. Tenaga Pengaktifan (E ≥ Ea):</b>
                    <p class="text-emerald-800 leading-relaxed">
                      Zarah-zarah mesti berlanggar dengan tenaga kinetik yang sekurang-kurangnya <b>sama dengan atau melebihi Tenaga Pengaktifan (Ea)</b> supaya halangan tenaga dapat diatasi dan ikatan kimia asal dapat diputuskan.
                    </p>
                  </div>

                  <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <b class="text-emerald-900 block mb-1">2. Orientasi Perlanggaran yang Tepat:</b>
                    <p class="text-emerald-800 leading-relaxed">
                      Zarah-zarah mesti berlanggar pada <b>kedudukan atau orientasi ruang 3D yang tepat</b> supaya atom-atom yang terlibat dapat bersentuhan secara langsung untuk membina ikatan kimia baharu.
                    </p>
                  </div>
                </div>

                <div class="space-y-2 text-xs">
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-emerald-700">✓ Perlanggaran Berkesan (Hasil Terbentuk):</b>
                    <span class="text-slate-700"> Zarah mempunyai tenaga kinetik ≥ Ea DAN berlanggar pada orientasi tepat → Ikatan lama terputus, ikatan baharu terhasil → Menghasilkan molekul hasil tindak balas.</span>
                  </div>
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-rose-700">✗ Perlanggaran Tidak Berkesan (Tiada Tindak Balas):</b>
                    <span class="text-slate-700"> Zarah mempunyai tenaga kinetik &lt; Ea ATAU berlanggar pada orientasi yang salah → Zarah hanya melantun semula secara anjal tanpa tindak balas kimia berlaku.</span>
                  </div>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't4-b7-s4-c2',
          title: 'Gambar Rajah Profil Aras Tenaga & Peranan Mangkin',
          badge: 'Profil Tenaga & Mangkin SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-rose-900 uppercase tracking-wider block mb-2 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  Gambar Rajah Profil Aras Tenaga Eksotermik &amp; Endotermik (Buku Teks m/s 244 &amp; 247)
                </span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Gambar rajah profil aras tenaga menunjukkan perubahan kandungan tenaga sepanjang lintasan tindak balas serta perbezaan tenaga antara bahan tindak balas dan hasil tindak balas:
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-sky-900 block mb-1">(a) Tindak Balas Eksotermik:</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700">
                      <li>Aras tenaga bahan tindak balas <b>lebih tinggi</b> daripada hasil tindak balas.</li>
                      <li>Haba dibebaskan ke persekitaran (ΔH bernilai <b>negatif</b>, ΔH &lt; 0).</li>
                      <li>Tenaga pengaktifan, Ea diukur dari aras bahan ke puncak lengkung.</li>
                    </ul>
                  </div>

                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-amber-900 block mb-1">(b) Tindak Balas Endotermik:</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700">
                      <li>Aras tenaga bahan tindak balas <b>lebih rendah</b> daripada hasil tindak balas.</li>
                      <li>Haba diserap dari persekitaran (ΔH bernilai <b>positif</b>, ΔH &gt; 0).</li>
                      <li>Tenaga pengaktifan, Ea memerlukan penyerapan tenaga lebih tinggi untuk mencecah puncak halangan.</li>
                    </ul>
                  </div>
                </div>

                <!-- TINDAKAN MANGKIN -->
                <div class="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-950 mb-3">
                  <b class="text-purple-900 block font-bold mb-1">Peranan Mangkin dalam Profil Aras Tenaga:</b>
                  <p class="leading-relaxed">
                    Kehadiran mangkin menyediakan <b>laluan alternatif dengan tenaga pengaktifan yang lebih rendah (Ea')</b>. Puncak lengkung tenaga diturunkan, membolehkan lebih banyak zarah memenuhi syarat tenaga untuk bertindak balas. Walau bagaimanapun, <b>nilai haba tindak balas (ΔH) kekal sama dan tidak berubah</b>!
                  </p>
                </div>

                <!-- SKEMA PENSKORAN SPM -->
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800">
                  <b class="text-slate-900 block font-bold mb-1">Skema Penskoran Esei SPM (Kesan Mangkin Menggunakan Teori Perlanggaran):</b>
                  <ol class="list-decimal pl-5 space-y-1 text-slate-700">
                    <li>Kehadiran mangkin menyediakan <b>laluan tindak balas alternatif</b> yang memerlukan <b>tenaga pengaktifan yang lebih rendah (Ea')</b>.</li>
                    <li>Lebih banyak zarah bahan tindak balas mempunyai tenaga kinetik yang <b>mencukupi untuk mengatasi tenaga pengaktifan Ea'</b> yang lebih rendah itu.</li>
                    <li><b>Frekuensi perlanggaran berkesan</b> antara zarah-zarah meningkat.</li>
                    <li>Maka, <b>kadar tindak balas meningkat</b>.</li>
                  </ol>
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menyatakan semua perlanggaran antara zarah akan menghasilkan tindak balas kimia.',
          correction: 'HANYA perlanggaran berkesan (iaitu yang mempunyai tenaga ≥ Ea dan orientasi betul) yang menghasilkan tindak balas.',
          why: 'Zarah yang berlanggar dengan tenaga kurang daripada Ea hanya akan melantun tanpa memecahkan ikatan.',
          spmTip: 'Sentiasa sebut perkataan "perlanggaran berkesan", bukan sekadar "perlanggaran".'
        },
        {
          mistake: 'Menyatakan mangkin merendahkan tenaga haba tindak balas (ΔH).',
          correction: 'Mangkin TIDAK mengubah nilai haba tindak balas (ΔH) sama sekali; ia hanya merendahkan Tenaga Pengaktifan (Ea).',
          why: 'Aras tenaga bahan dan hasil tindak balas tidak berubah, hanya puncak tenaga halangan sahaja yang diturunkan.',
          spmTip: 'ΔH kekal sama; hanya Ea menjadi lebih rendah.'
        }
      ],
      flashcards: [
        {
          id: 't4-b7-s4-fc1',
          front: 'Nyatakan dua syarat utama bagi berlakunya sesuatu perlanggaran berkesan.',
          back: '1. Zarah berlanggar mesti mempunyai tenaga yang sama atau melebihi Tenaga Pengaktifan (E ≥ Ea). 2. Zarah mesti berlanggar pada orientasi yang betul.'
        },
        {
          id: 't4-b7-s4-fc2',
          front: 'Apakah maksud Tenaga Pengaktifan (Ea)?',
          back: 'Tenaga minimum yang mesti dicapai oleh zarah bahan tindak balas sebelum tindak balas kimia boleh berlaku.'
        },
        {
          id: 't4-b7-s4-fc3',
          front: 'Bagaimanakah peningkatan suhu meningkatkan frekuensi perlanggaran berkesan?',
          back: 'Zarah memperoleh lebih banyak tenaga kinetik, maka lebih banyak zarah mempunyai tenaga ≥ Ea, meningkatkan frekuensi perlanggaran berkesan.'
        },
        {
          id: 't4-b7-s4-fc4',
          front: 'Apakah kesan mangkin terhadap gambar rajah profil aras tenaga?',
          back: 'Menurunkan puncak tenaga pengaktifan (Ea) dengan menyediakan laluan alternatif bagi tindak balas.'
        },
        {
          id: 't4-b7-s4-fc5',
          front: 'Apakah hubungan antara kadar tindak balas dengan frekuensi perlanggaran berkesan?',
          back: 'Kadar tindak balas berkadar terus dengan frekuensi perlanggaran berkesan antara zarah-zarah.'
        }
      ],
      quiz: [
        {
          id: 't4-b7-s4-q1',
          question: 'Menurut Teori Perlanggaran, mengapakah tidak semua perlanggaran antara zarah bahan tindak balas menghasilkan hasil tindak balas?',
          options: [
            'Kerana sesetengah zarah tidak mempunyai jisim yang mencukupi',
            'Kerana zarah-zarah tersebut berlanggar pada orientasi salah atau mempunyai tenaga kurang daripada tenaga pengaktifan',
            'Kerana zarah-zarah sentiasa berada dalam fasa pepejal',
            'Kerana daya graviti menolak zarah daripada bersentuhan'
          ],
          answerIndex: 1,
          explanation: 'Perlanggaran hanya berkesan jika zarah berlanggar pada orientasi yang betul dan mempunyai tenaga kinetik yang sekurang-kurangnya menyamai tenaga pengaktifan (Ea).',
          level: 'Rendah'
        },
        {
          id: 't4-b7-s4-q2',
          question: 'Tenaga Pengaktifan, Ea ditakrifkan sebagai:',
          options: [
            'Tenaga maksimum yang dibebaskan semasa pembentukan ikatan',
            'Tenaga minimum yang diperlukan oleh zarah bahan tindak balas untuk memulakan tindak balas',
            'Perbezaan tenaga antara bahan tindak balas dan hasil tindak balas',
            'Jumlah tenaga kinetik semua molekul pada 0 Kelvin'
          ],
          answerIndex: 1,
          explanation: 'Tenaga Pengaktifan ialah halangan tenaga minimum yang mesti diatasi oleh zarah-zarah sebelum ikatan lama dapat diputuskan.',
          level: 'Rendah'
        },
        {
          id: 't4-b7-s4-q3',
          question: 'Bagaimanakah penambahan mangkin mempercepatkan kadar sesuatu tindak balas kimia?',
          options: [
            'Meningkatkan tenaga kinetik purata zarah bahan tindak balas',
            'Menyediakan laluan alternatif dengan tenaga pengaktifan yang lebih rendah',
            'Meningkatkan jumlah bilangan zarah per unit isi padu',
            'Menaikkan suhu campuran tindak balas secara berterusan'
          ],
          answerIndex: 1,
          explanation: 'Mangkin menyediakan laluan tindak balas alternatif yang memerlukan tenaga pengaktifan (Ea) lebih rendah, membolehkan lebih banyak zarah memenuhi syarat tenaga untuk bertindak balas.',
          level: 'Sederhana'
        },
        {
          id: 't4-b7-s4-q4',
          question: 'Berdasarkan Teori Perlanggaran, mengapakah peningkatan kepekatan bahan tindak balas akueus meningkatkan kadar tindak balas?',
          options: [
            'Tenaga pengaktifan tindak balas menjadi lebih rendah',
            'Bilangan zarah per unit isi padu bertambah, maka frekuensi perlanggaran antara zarah bertambah',
            'Zarah-zarah bergerak dengan halaju yang lebih tinggi',
            'Zarah-zarah berubah menjadi ion-ion bebas bercas tinggi'
          ],
          answerIndex: 1,
          explanation: 'Kepekatan lebih tinggi bermaksud bilangan zarah per unit isi padu lebih banyak, jarak antara zarah lebih rapat, menyebabkan frekuensi perlanggaran (dan perlanggaran berkesan) meningkat.',
          level: 'Sederhana'
        },
        {
          id: 't4-b7-s4-q5',
          question: 'Dalam gambar rajah profil aras tenaga bagi tindak balas eksotermik, aras tenaga bahan tindak balas adalah:',
          options: [
            'Lebih tinggi daripada aras tenaga hasil tindak balas (ΔH bernilai negatif)',
            'Lebih rendah daripada aras tenaga hasil tindak balas (ΔH bernilai positif)',
            'Sama tinggi dengan aras tenaga hasil tindak balas',
            'Sentiasa berada pada paras sifar'
          ],
          answerIndex: 0,
          explanation: 'Tindak balas eksotermik membebaskan haba ke persekitaran, maka bahan tindak balas mempunyai kandungan tenaga lebih tinggi berbanding hasil tindak balas (ΔH < 0).',
          level: 'Sederhana'
        },
        {
          id: 't4-b7-s4-q6',
          question: 'Kenaikan suhu sebanyak 10°C lazimnya menggandakan kadar sesuatu tindak balas kimia. Mengapakah kenaikan suhu yang kecil ini memberi kesan yang amat besar kepada kadar tindak balas?',
          options: [
            'Kerana tenaga pengaktifan berkurang kepada separuh nilai asalnya',
            'Kerana peningkatan pecahan zarah yang mempunyai tenaga kinetik ≥ Ea meningkat dengan ketara',
            'Kerana bilangan zarah bahan tindak balas bertambah dua kali ganda',
            'Kerana orientasi perlanggaran zarah terkunci secara kekal'
          ],
          answerIndex: 1,
          explanation: 'Peningkatan suhu sedikit menganjakkan taburan tenaga Maxwell-Boltzmann, menyebabkan pertambahan ketara bilangan zarah yang mempunyai tenaga melebihi tenaga pengaktifan (E ≥ Ea).',
          level: 'Tinggi (KBAT)'
        }
      ]
    }
  ]
};
