import { Chapter } from '../types/nota';

export const T5_BAB3: Chapter = {
  id: 't5-b3',
  form: 'T5',
  chapterNumber: 3,
  title: 'Termokimia',
  theme: 'Haba & Tenaga',
  durationMinutes: 120,
  subtopicCount: 4,
  iconName: 'Flame',
  description: 'Meneroka perubahan tenaga haba dalam tindak balas kimia, perbezaan tindak balas eksotermik & endotermik, gambar rajah profil aras tenaga, serta penentuan haba pemendakan, haba penyesaran, haba peneutralan, haba pembakaran dan analisis nilai bahan api.',
  subtopics: [
    // ==========================================
    // SUBTOPIK 3.1
    // ==========================================
    {
      id: 't5-b3-s1',
      code: '3.1',
      title: 'Perubahan Haba dalam Tindak Balas (Eksotermik & Endotermik)',
      learningStandard: 'SP 3.1.1, 3.1.2, 3.1.3',
      durationMinutes: 30,
      tldr: [
        'Tindak balas eksotermik membebaskan haba ke persekitaran; suhu persekitaran meningkat, entalpi tindak balas bernilai negatif (ΔH < 0).',
        'Tindak balas endotermik menyerap haba dari persekitaran; suhu persekitaran menurun, entalpi tindak balas bernilai positif (ΔH > 0).',
        'Pemecahan ikatan kimia memerlukan penyerapan haba (endotermik), manakala pembentukan ikatan kimia membebaskan haba (eksotermik).',
        'Tenaga pengaktifan (Ea) ialah tenaga minimum yang diperlukan oleh zarah bahan tindak balas untuk memulakan tindak balas kimia.',
        'Aplikasi: Pek panas segera menggunakan kalsium klorida kontang/magnesium sulfat kontang, manakala pek sejuk segera menggunakan ammonium nitrat.'
      ],
      simulationRef: {
        id: 'termokimia-eksotermik-endotermik',
        title: 'Makmal Maya Termokimia: Eksotermik & Endotermik',
        description: 'Eksperimen interaktif profil aras tenaga, pembebasan haba, tenaga pengaktifan dan simulasi pek sejuk/panas.',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=termokimia-asas',
        previewBadge: 'Simulasi Termokimia KSSM'
      },
      concepts: [
        {
          id: 't5-b3-s1-c1',
          title: 'Konsep Asas Tindak Balas Eksotermik & Endotermik',
          badge: 'Prinsip Termokimia SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">Definisi Eksotermik vs Endotermik</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Semasa tindak balas kimia berlaku, tenaga kimia ditukar kepada tenaga haba atau sebaliknya. <b>Persekitaran</b> merujuk kepada bekas tindak balas, pelarut (air), udara sekeliling dan termometer yang menyentuh campuran:
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <div class="p-3 rounded-xl bg-rose-50/80 border border-rose-200">
                    <b class="text-rose-950 block font-bold mb-1">1. Tindak Balas Eksotermik:</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      <li>Haba <b>dibebaskan</b> dari sistem tindak balas ke persekitaran.</li>
                      <li>Suhu campuran / persekitaran <b>meningkat</b> (bacaan termometer naik).</li>
                      <li>Jumlah kandungan tenaga hasil lebih rendah daripada bahan tindak balas: <b>ΔH adalah negatif (−)</b>.</li>
                      <li><b>Contoh:</b> Pembakaran bahan api, peneutralan asid-alkali, tindak balas logam reaktif dengan asid, respirasi.</li>
                    </ul>
                  </div>

                  <div class="p-3 rounded-xl bg-sky-50/80 border border-sky-200">
                    <b class="text-sky-950 block font-bold mb-1">2. Tindak Balas Endotermik:</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      <li>Haba <b>diserap</b> dari persekitaran ke dalam sistem tindak balas.</li>
                      <li>Suhu campuran / persekitaran <b>menurun</b> (bacaan termometer turun).</li>
                      <li>Jumlah kandungan tenaga hasil lebih tinggi daripada bahan tindak balas: <b>ΔH adalah positif (+)</b>.</li>
                      <li><b>Contoh:</b> Penguraian terma garam karbonat &amp; nitrat (cth: CaCO₃ dipanaskan), fotosintesis, pelarutan garam ammonium dalam air.</li>
                    </ul>
                  </div>
                </div>

                <!-- ANALISIS PEMECAHAN & PEMBENTUKAN IKATAN -->
                <div class="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs">
                  <b class="text-amber-950 block font-bold mb-1 flex items-center gap-1.5">
                    <span>🔑</span> Hubungan Pemecahan dan Pembentukan Ikatan:
                  </b>
                  <p class="text-[11px] text-slate-700 leading-relaxed">
                    • <b>Pemecahan ikatan (Bahan Tindak Balas):</b> Proses yang <b>menyerap tenaga</b> (Endotermik).<br />
                    • <b>Pembentukan ikatan (Hasil Tindak Balas):</b> Proses yang <b>membebaskan tenaga</b> (Eksotermik).<br />
                    • Jika <b>tenaga yang dibebaskan</b> semasa pembentukan ikatan &gt; <b>tenaga yang diserap</b> semasa pemecahan ikatan ➔ Tindak balas adalah <b>EKSOTERMIK</b>.<br />
                    • Jika <b>tenaga yang diserap</b> semasa pemecahan ikatan &gt; <b>tenaga yang dibebaskan</b> semasa pembentukan ikatan ➔ Tindak balas adalah <b>ENDOTERMIK</b>.
                  </p>
                </div>
              </div>
            </div>
          `,
          comparisonTable: {
            headers: ['Ciri Perbandingan', 'Tindak Balas Eksotermik', 'Tindak Balas Endotermik'],
            rows: [
              ['Aliran Tenaga Haba', 'Haba dibebaskan ke persekitaran', 'Haba diserap dari persekitaran'],
              ['Perubahan Suhu', 'Suhu persekitaran meningkat (panas)', 'Suhu persekitaran menurun (sejuk)'],
              ['Tanda Entalpi (ΔH)', 'Nilai negatif (−ΔH)', 'Nilai positif (+ΔH)'],
              ['Kandungan Tenaga', 'H_hasil < H_bahan (Hasil lebih stabil)', 'H_hasil > H_bahan (Bahan lebih stabil)'],
              ['Tenaga Ikatan', 'Tenaga pembebasan ikatan > Tenaga pemecahan ikatan', 'Tenaga pemecahan ikatan > Tenaga pembebasan ikatan'],
              ['Contoh Lazim SPM', 'Peneutralan HCl + NaOH, pembakaran metanol', 'Penguraian terma CaCO₃, pelarutan NH₄NO₃']
            ]
          }
        },
        {
          id: 't5-b3-s1-c2',
          title: 'Gambar Rajah Profil Aras Tenaga & Tenaga Pengaktifan (Ea)',
          badge: 'Kemahiran Graf SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">Ciri Utama Gambar Rajah Profil Aras Tenaga</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Dalam soalan Kertas 2 Bahagian B/C SPM, calon wajib menguasai 4 elemen utama semasa melukis gambar rajah profil aras tenaga:
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <!-- Eksotermik Profile Box -->
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-900 block font-bold mb-1.5 text-center text-sm">Graf Profil Eksotermik (ΔH &lt; 0)</b>
                    <div class="p-3 rounded-xl bg-white border border-slate-200 text-center font-mono text-xs space-y-2">
                      <div class="text-slate-600">Puncak Lengkung (Keadaan Peralihan)</div>
                      <div class="flex items-center justify-between px-2 text-[11px]">
                        <span class="p-1 rounded bg-sky-100 font-bold text-sky-900">Bahan: H₁ (Tinggi)</span>
                        <span class="text-rose-600 font-bold">➔ ΔH = − (Menurun)</span>
                        <span class="p-1 rounded bg-indigo-100 font-bold text-indigo-900">Hasil: H₂ (Rendah)</span>
                      </div>
                    </div>
                    <ul class="list-disc pl-4 space-y-1 text-slate-600 text-[11px] mt-2">
                      <li>Aras bahan tindak balas <b>lebih tinggi</b> daripada aras hasil.</li>
                      <li>Anak panah ΔH menghala <b>ke bawah</b> dengan tanda negatif (−).</li>
                      <li>Anak panah Tenaga Pengaktifan (Ea) menghala dari aras bahan ke puncak graf.</li>
                    </ul>
                  </div>

                  <!-- Endotermik Profile Box -->
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <b class="text-slate-900 block font-bold mb-1.5 text-center text-sm">Graf Profil Endotermik (ΔH &gt; 0)</b>
                    <div class="p-3 rounded-xl bg-white border border-slate-200 text-center font-mono text-xs space-y-2">
                      <div class="text-slate-600">Puncak Lengkung (Keadaan Peralihan)</div>
                      <div class="flex items-center justify-between px-2 text-[11px]">
                        <span class="p-1 rounded bg-indigo-100 font-bold text-indigo-900">Bahan: H₁ (Rendah)</span>
                        <span class="text-emerald-600 font-bold">➔ ΔH = + (Menaik)</span>
                        <span class="p-1 rounded bg-sky-100 font-bold text-sky-900">Hasil: H₂ (Tinggi)</span>
                      </div>
                    </div>
                    <ul class="list-disc pl-4 space-y-1 text-slate-600 text-[11px] mt-2">
                      <li>Aras bahan tindak balas <b>lebih rendah</b> daripada aras hasil.</li>
                      <li>Anak panah ΔH menghala <b>ke atas</b> dengan tanda positif (+).</li>
                      <li>Ea adalah jarak menegak dari aras bahan tindak balas hingga ke puncak lengkung.</li>
                    </ul>
                  </div>
                </div>

                <!-- PERINGATAN PEMARKAHAN SPM -->
                <div class="p-3 rounded-xl bg-sky-50/80 border border-sky-200 text-xs">
                  <b class="text-sky-950 block font-bold mb-1 flex items-center gap-1.5">
                    <span>📝</span> Kriteria Penskoran Wajib SPM:
                  </b>
                  <p class="text-[11px] text-slate-700 leading-relaxed">
                    1. <b>Paksi menegak:</b> Dilabelkan dengan perkataan <b>Tenaga</b> (tanpa unit).<br />
                    2. <b>Aras bahan &amp; hasil:</b> Formula kimia bahan dan hasil ditulis pada garisan mendatar yang betul.<br />
                    3. <b>Anak panah Ea &amp; ΔH:</b> Wajib bersentuhan dengan tepat pada garisan aras bahan dan puncak/hasil.<br />
                    4. <b>Tanda Nilai ΔH:</b> Wajib letak tanda positif (+) atau negatif (−) beserta unit kJ mol⁻¹.
                  </p>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b3-s1-c3',
          title: 'Aplikasi Kehidupan Harian: Pek Panas & Pek Sejuk Segera',
          badge: 'Aplikasi Sains SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">Prinsip Kerja Pek Segera Komersial</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Pek panas dan sejuk segera mengandungi dua beg berasingan di dalamnya (beg luar yang kuat mengandungi serbuk bahan kimia dan beg dalam yang nipis mengandungi air). Apabila dipicit, beg dalam pecah membenarkan tindak balas pelarutan berlaku:
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                  <div class="p-3 rounded-xl bg-orange-50/80 border border-orange-200">
                    <b class="text-orange-950 block font-bold mb-1">🔥 Pek Panas Segera (Eksotermik):</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      <li><b>Bahan kimia:</b> Kalsium klorida kontang, CaCl₂ atau magnesium sulfat kontang, MgSO₄.</li>
                      <li><b>Tindak balas:</b> Pelarutan kalsium klorida dalam air membebaskan tenaga haba hidrat yang tinggi (Eksotermik).</li>
                      <li><b>Kegunaan:</b> Melegakan kekejangan otot, meredakan sakit sendi, menghangatkan tangan semasa cuaca sejuk beku.</li>
                    </ul>
                  </div>

                  <div class="p-3 rounded-xl bg-cyan-50/80 border border-cyan-200">
                    <b class="text-cyan-950 block font-bold mb-1">❄️ Pek Sejuk Segera (Endotermik):</b>
                    <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      <li><b>Bahan kimia:</b> Ammonium nitrat, NH₄NO₃ atau ammonium klorida, NH₄Cl atau urea.</li>
                      <li><b>Tindak balas:</b> Pemecahan kekisi kristal garam ammonium menyerap tenaga haba dari persekitaran (Endotermik).</li>
                      <li><b>Kegunaan:</b> Merawat kecederaan sukan akut (terseliuh), mengecutkan salur darah untuk kurangkan bengkak dan lebam.</li>
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
          mistake: 'Menyatakan bahawa pembentukan ikatan menyerap tenaga manakala pemecahan ikatan membebaskan tenaga.',
          correction: 'Pemecahan ikatan sentiasa MENYERAP tenaga (endotermik) manakala pembentukan ikatan baharu sentiasa MEMBEBASKAN tenaga (eksotermik).',
          why: 'Ini prinsip asas hukum keabadian tenaga termokimia yang sering terbalik ditulis calon SPM.',
          spmTip: 'Ingat akronim: P-P (Pecah = Perlu tenaga / Serap) dan B-B (Bentuk = Bebas tenaga)!'
        },
        {
          mistake: 'Terlupa meletakkan tanda negatif (−) pada nilai entalpi ΔH bagi tindak balas eksotermik.',
          correction: 'Wajib tulis tanda positif (+) atau negatif (−) beserta unit kJ mol⁻¹ dalam jawapan entalpi.',
          why: 'Kehilangan tanda entalpi menyebabkan calon kehilangan 1 markah akhir dalam Kertas 2.'
        }
      ],
      flashcards: [
        {
          id: 'fc-t5-b3-s1-1',
          front: 'Apakah takrifan tindak balas eksotermik dan nyatakan tanda bagi perubahan entalpi (ΔH)?',
          back: 'Tindak balas eksotermik ialah tindak balas kimia yang membebaskan haba ke persekitaran, menyebabkan suhu persekitaran meningkat. Nilai ΔH adalah negatif (−ΔH).'
        },
        {
          id: 'fc-t5-b3-s1-2',
          front: 'Apakah takrifan tindak balas endotermik dan nyatakan tanda bagi perubahan entalpi (ΔH)?',
          back: 'Tindak balas endotermik ialah tindak balas kimia yang menyerap haba dari persekitaran, menyebabkan suhu persekitaran menurun. Nilai ΔH adalah positif (+ΔH).'
        },
        {
          id: 'fc-t5-b3-s1-3',
          front: 'Mengapakah pemecahan ikatan merupakan proses endotermik manakala pembentukan ikatan ialah proses eksotermik?',
          back: 'Pemecahan ikatan memerlukan tenaga haba diserap untuk mengatasi daya tarikan antara atom/zarah. Pembentukan ikatan baharu pula menstabilkan zarah dan membebaskan lebihan tenaga haba ke persekitaran.'
        },
        {
          id: 'fc-t5-b3-s1-4',
          front: 'Apakah bahan kimia aktif yang digunakan di dalam pek sejuk segera dan pek panas segera?',
          back: 'Pek sejuk segera menggunakan ammonium nitrat (NH₄NO₃) atau ammonium klorida (NH₄Cl). Pek panas segera menggunakan kalsium klorida kontang (CaCl₂) atau magnesium sulfat kontang (MgSO₄).'
        },
        {
          id: 'fc-t5-b3-s1-5',
          front: 'Apakah yang dimaksudkan dengan tenaga pengaktifan (Ea)?',
          back: 'Tenaga pengaktifan (Ea) ialah kuantiti tenaga minimum yang mesti dimiliki oleh zarah bahan tindak balas sebelum perlanggaran berkesan dapat menghasilkan tindak balas kimia.'
        }
      ],
      quiz: [
        {
          id: 'q-t5-b3-s1-1',
          question: 'Antara tindak balas berikut, yang manakah merupakan tindak balas endotermik?',
          options: [
            'Pembakaran gas propana dalam oksigen',
            'Peneutralan asid sulfurik dengan natrium hidroksida',
            'Penguraian terma kalsium karbonat menghasilkan kalsium oksida dan karbon dioksida',
            'Tindak balas antara asid hidroklorik dengan serbuk zink'
          ],
          answerIndex: 2,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'Penguraian terma kalsium karbonat (CaCO₃ → CaO + CO₂) memerlukan penyerapan haba yang berterusan pada suhu tinggi (~900°C), menjadikannya tindak balas endotermik (ΔH > 0).'
        },
        {
          id: 'q-t5-b3-s1-2',
          question: 'Apabila pepejal ammonium klorida dilarutkan ke dalam sebuah bikar yang mengandungi air suling, bacaan termometer menurun daripada 28°C kepada 22°C. Kesimpulan manakah yang betul?',
          options: [
            'Tindak balas adalah eksotermik kerana haba dibebaskan',
            'Tindak balas adalah endotermik kerana haba diserap dari air suling',
            'Kandungan tenaga hasil tindak balas lebih rendah daripada bahan tindak balas',
            'Perubahan entalpi tindak balas bernilai negatif (ΔH < 0)'
          ],
          answerIndex: 1,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'Penurunan bacaan termometer menandakan bahawa haba telah diserap dari persekitaran (pelarut air) oleh garam ammonium, membuktikan ia ialah proses endotermik (ΔH bernilai positif).'
        },
        {
          id: 'q-t5-b3-s1-3',
          question: 'Mengapakah tindak balas pembakaran metana (CH₄ + 2O₂ → CO₂ + 2H₂O) bersifat eksotermik?',
          options: [
            'Jumlah tenaga yang diserap untuk memecahkan ikatan dalam CH₄ dan O₂ adalah lebih besar daripada tenaga yang dibebaskan semasa pembentukan ikatan',
            'Jumlah tenaga yang dibebaskan semasa pembentukan ikatan dalam CO₂ dan H₂O adalah lebih besar daripada tenaga yang diserap untuk memecahkan ikatan bahan',
            'Molekul metana tidak memerlukan sebarang tenaga pengaktifan untuk bertindak balas',
            'Tiada ikatan kimia yang dipecahkan sepanjang pembakaran'
          ],
          answerIndex: 1,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'Tindak balas bersifat eksotermik apabila jumlah tenaga yang dibebaskan semasa pembentukan ikatan baharu dalam hasil (CO₂ dan H₂O) melebihi jumlah tenaga yang diserap untuk memecahkan ikatan bahan (CH₄ dan O₂).'
        },
        {
          id: 'q-t5-b3-s1-4',
          question: 'Dalam gambar rajah profil aras tenaga bagi tindak balas eksotermik, anak panah perubahan entalpi (ΔH) sentiasa:',
          options: [
            'Menghala ke atas dari aras hasil ke aras bahan',
            'Menghala ke bawah dari aras bahan ke aras hasil tindak balas',
            'Menghala dari dasar paksi ke puncak tenaga pengaktifan',
            'Bersifat mendatar selari dengan paksi masa'
          ],
          answerIndex: 1,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'Bagi tindak balas eksotermik, aras tenaga bahan lebih tinggi daripada aras hasil, maka anak panah ΔH menghala ke bawah dari garisan aras bahan ke garisan aras hasil, menandakan pembebasan haba.'
        },
        {
          id: 'q-t5-b3-s1-5',
          question: 'Seorang atlet terseliuh buku lalinya semasa acara larian. Bahan kimia manakah yang paling sesuai dimasukkan ke dalam pek pertolongan cemas untuk merawat bengkak atlet tersebut?',
          options: [
            'Kalsium klorida kontang dan air',
            'Magnesium sulfat kontang dan air',
            'Ammonium nitrat dan air',
            'Asid sulfurik pekat dan air'
          ],
          answerIndex: 2,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'Kecederaan akut seperti bengkak dan terseliuh memerlukan pek sejuk segera untuk mengecutkan salur darah. Ammonium nitrat menyerap haba apabila larut dalam air (endotermik) dan menyejukkan kawasan cedera.'
        },
        {
          id: 'q-t5-b3-s1-6',
          question: 'Diberi persamaan termokimia: N₂ (g) + 3H₂ (g) → 2NH₃ (g), ΔH = −92 kJ mol⁻¹. Antara pernyataan berikut, yang manakah BENAR?',
          options: [
            'Sebanyak 92 kJ haba diserap apabila 1 mol gas ammonia terbentuk',
            'Sebanyak 92 kJ haba dibebaskan apabila 2 mol gas ammonia terbentuk',
            'Tindak balas ini menyebabkan suhu persekitaran menurun',
            'Kandungan tenaga 2 mol NH₃ adalah lebih tinggi daripada kandungan tenaga 1 mol N₂ dan 3 mol H₂'
          ],
          answerIndex: 1,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'Berdasarkan pekali stoikiometri persamaan, pembentukan 2 mol gas NH₃ membebaskan 92 kJ tenaga haba (tanda negatif menunjukkan haba dibebaskan / eksotermik).'
        }
      ]
    },

    // ==========================================
    // SUBTOPIK 3.2
    // ==========================================
    {
      id: 't5-b3-s2',
      code: '3.2',
      title: 'Haba Pemendakan dan Haba Penyesaran',
      learningStandard: 'SP 3.2.1, 3.2.2',
      durationMinutes: 30,
      tldr: [
        'Haba pemendakan ialah perubahan haba apabila 1 mol mendakan terbentuk daripada ion-ionnya dalam larutan akueus.',
        'Haba penyesaran ialah perubahan haba apabila 1 mol logam disesarkan daripada larutan garamnya oleh logam yang lebih elektropositif.',
        'Kaedah pengiraan SPM: Haba yang dibebaskan, Q = mcθ; Perubahan entalpi, ΔH = −(Q / n) dalam unit kJ mol⁻¹.',
        'Andaian eksperimen kalorimeter cawan polistirena: ketumpatan larutan = 1 g cm⁻³, muatan haba tentu c = 4.2 J g⁻¹ °C⁻¹, tiada haba hilang ke persekitaran.',
        'Langkah berjaga-jaga: Cawan polistirena digunakan sebagai penebat haba, campuran dikacau perlahan-lahan dan sekata, suhu awal diambil selepas termometer dibiarkan seketika.'
      ],
      simulationRef: {
        id: 'haba-pemendakan',
        title: 'Makmal Maya Haba Pemendakan Garam Tak Larut',
        description: 'Eksperimen pembentukan mendakan BaSO₄ & AgCl, rakaman suhu awal dan suhu akhir serta pengiraan ΔH.',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=haba-pemendakan',
        previewBadge: 'Simulasi Pemendakan SPM'
      },
      concepts: [
        {
          id: 't5-b3-s2-c1',
          title: 'Haba Pemendakan & Kaedah Pengiraan Termokimia',
          badge: 'Pengiraan Kimia SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">Definisi Rasmi Haba Pemendakan</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  <b>Haba pemendakan</b> ialah perubahan haba apabila <b>1 mol mendakan</b> terbentuk daripada ion-ionnya di dalam larutan akueus:
                </p>

                <!-- CONTOH TINDAK BALAS PEMENDAKAN -->
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs mb-3 space-y-2">
                  <div class="font-mono font-bold text-sky-950 text-center bg-white p-2 rounded-lg border border-slate-200">
                    Ba²⁺ (ak) + SO₄²⁻ (ak) ➔ BaSO₄ (p) &nbsp;&nbsp; ΔH = −42 kJ mol⁻¹
                  </div>
                  <div class="font-mono font-bold text-sky-950 text-center bg-white p-2 rounded-lg border border-slate-200">
                    Ag⁺ (ak) + Cl⁻ (ak) ➔ AgCl (p) &nbsp;&nbsp; ΔH = −65.5 kJ mol⁻¹
                  </div>
                  <p class="text-[11px] text-slate-600">
                    Ion spektator seperti Na⁺ dan NO₃⁻ tidak mengambil bahagian dalam tindak balas pemendakan dan tidak mempengaruhi kuantiti haba yang dibebaskan.
                  </p>
                </div>

                <!-- 4 LANGKAH PENGIRAAN SPM WAJIB -->
                <div class="p-3 rounded-xl bg-indigo-50/80 border border-indigo-200 text-xs">
                  <b class="text-indigo-950 block font-bold mb-2 flex items-center gap-1.5">
                    <span>📐</span> 4 Langkah Pengiraan Termokimia SPM:
                  </b>
                  <ol class="list-decimal pl-5 space-y-1.5 text-slate-800 text-[11px]">
                    <li><b>Hitung bilangan mol bahan penghad (n):</b> n = (M × V) ÷ 1000.</li>
                    <li><b>Hitung perubahan suhu (θ):</b> θ = Suhu tertinggi − Suhu awal purata.</li>
                    <li><b>Hitung kuantiti haba (Q):</b> Q = m × c × θ (di mana m = V₁ + V₂ dalam gram, c = 4.2 J g⁻¹ °C⁻¹).</li>
                    <li><b>Hitung Haba Tindak Balas (ΔH):</b> ΔH = − (Q ÷ 1000) ÷ n (Unit: kJ mol⁻¹, tanda negatif jika suhu naik).</li>
                  </ol>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b3-s2-c2',
          title: 'Haba Penyesaran Logam',
          badge: 'Termokimia Redoks SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">Konsep Haba Penyesaran</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  <b>Haba penyesaran</b> ialah perubahan haba apabila <b>1 mol logam</b> disesarkan daripada larutan garamnya oleh logam yang lebih elektropositif:
                </p>

                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs mb-3 space-y-1.5">
                  <div class="font-mono font-bold text-center bg-white p-2 rounded-lg border border-slate-200 text-slate-900">
                    Zn (p) + Cu²⁺ (ak) ➔ Zn²⁺ (ak) + Cu (p) &nbsp;&nbsp; ΔH = −210 kJ mol⁻¹
                  </div>
                  <p class="text-[11px] text-slate-600">
                    <b>Pemerhatian SPM:</b> Serbuk kelabu zink melarut, keamatan warna biru larutan kuprum(II) sulfat menyahwarna menjadi tanpa warna, pepejal perang terenap di dasar cawan, dan bacaan termometer meningkat.
                  </p>
                </div>

                <div class="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs">
                  <b class="text-amber-950 block font-bold mb-1 flex items-center gap-1.5">
                    <span>⚠️</span> Punca Nilai Eksperimen Lebih Rendah daripada Teori:
                  </b>
                  <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                    <li>Sebahagian tenaga haba telah <b>hilang ke persekitaran</b> melalui udara dan cawan.</li>
                    <li>Sebahagian haba telah <b>diserap oleh bekas cawan polistirena dan termometer</b>.</li>
                    <li>Tindak balas penyesaran mungkin berlaku terlalu perlahan jika serbuk zink berketul.</li>
                  </ul>
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menganggap bilangan mol mendakan atau logam disesarkan dihitung menggunakan jumlah isi padu kedua-dua larutan.',
          correction: 'Gunakan formula n = (MV) ÷ 1000 untuk larutan bahan tindak balas penghad (limiting reagent) sahaja.',
          why: 'Bahan berlebihan tidak menentukan jumlah mol mendakan atau logam yang terbentuk.'
        },
        {
          mistake: 'Mengabaikan penukaran unit kuantiti haba Q daripada Joule (J) kepada kilojoule (kJ) sebelum membahagi dengan mol.',
          correction: 'Nilai Q mesti dibahagi 1000 terlebih dahulu supaya entalpi ΔH mempunyai unit kJ mol⁻¹.',
          why: 'Jawapan akhir yang tertinggal bahagi 1000 akan menghasilkan nilai entalpi 1000 kali ganda terlalu besar.'
        }
      ],
      flashcards: [
        {
          id: 'fc-t5-b3-s2-1',
          front: 'Apakah takrifan rasmi haba pemendakan?',
          back: 'Haba pemendakan ialah perubahan haba apabila 1 mol mendakan terbentuk daripada ion-ionnya di dalam larutan akueus.'
        },
        {
          id: 'fc-t5-b3-s2-2',
          front: 'Apakah takrifan rasmi haba penyesaran?',
          back: 'Haba penyesaran ialah perubahan haba apabila 1 mol logam disesarkan daripada larutan garamnya oleh logam yang lebih elektropositif.'
        },
        {
          id: 'fc-t5-b3-s2-3',
          front: 'Apakah rumus bagi mengira kuantiti haba yang dibebaskan (Q) dan apakah maksud simbol-simbolnya?',
          back: 'Q = mcθ, di mana m = jisim larutan campuran (g), c = muatan haba tentu larutan (4.2 J g⁻¹ °C⁻¹), dan θ = perubahan suhu larutan (°C).'
        },
        {
          id: 'fc-t5-b3-s2-4',
          front: 'Mengapakah cawan polistirena digunakan dalam eksperimen kalorimeter termokimia?',
          back: 'Cawan polistirena ialah penebat haba yang sangat baik dan menyerap haba yang sangat sedikit, mengurangkan kehilangan haba ke persekitaran.'
        },
        {
          id: 'fc-t5-b3-s2-5',
          front: 'Bagaimanakah menentukan bahan tindak balas penghad (limiting reagent) dalam pengiraan ΔH?',
          back: 'Bandingkan bilangan mol bahan menggunakan formula n = (M × V) ÷ 1000 dengan nisbah pekali persamaan kimia. Bahan yang mempunyai nisbah mol paling kecil ialah bahan penghad.'
        }
      ],
      quiz: [
        {
          id: 'q-t5-b3-s2-1',
          question: 'Sebanyak 50 cm³ larutan natrium sulfat, Na₂SO₄ 0.5 mol dm⁻³ dicampurkan kepada 50 cm³ larutan barium nitrat, Ba(NO₃)₂ 0.5 mol dm⁻³. Kenaikan suhu campuran ialah 4.0°C. Berapakah kuantiti haba yang dibebaskan? [Muatan haba tentu larutan = 4.2 J g⁻¹ °C⁻¹; Ketumpatan larutan = 1.0 g cm⁻³]',
          options: [
            '840 J',
            '1,680 J',
            '2,100 J',
            '3,360 J'
          ],
          answerIndex: 1,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'Jumlah isi padu campuran = 50 + 50 = 100 cm³ (jisim m = 100 g). Q = mcθ = 100 g × 4.2 J g⁻¹ °C⁻¹ × 4.0°C = 1,680 J.'
        },
        {
          id: 'q-t5-b3-s2-2',
          question: 'Berdasarkan soalan sebelumnya, berapakah haba pemendakan barium sulfat, BaSO₄?',
          options: [
            '−33.6 kJ mol⁻¹',
            '−67.2 kJ mol⁻¹',
            '+67.2 kJ mol⁻¹',
            '−134.4 kJ mol⁻¹'
          ],
          answerIndex: 1,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'Bilangan mol BaSO₄ terbentuk: n = (50 × 0.5) ÷ 1000 = 0.025 mol. ΔH = −(1,680 J ÷ 1000) ÷ 0.025 mol = −67.2 kJ mol⁻¹.'
        },
        {
          id: 'q-t5-b3-s2-3',
          question: 'Serbuk zink berlebihan ditambah ke dalam 50 cm³ larutan kuprum(II) sulfat 0.2 mol dm⁻³. Suhu larutan meningkat sebanyak 10°C. Berapakah haba penyesaran kuprum oleh zink?',
          options: [
            '−105 kJ mol⁻¹',
            '−210 kJ mol⁻¹',
            '+210 kJ mol⁻¹',
            '−420 kJ mol⁻¹'
          ],
          answerIndex: 1,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'Q = mcθ = 50 × 4.2 × 10 = 2,100 J = 2.1 kJ. Mol Cu²⁺ = (50 × 0.2) ÷ 1000 = 0.01 mol. ΔH = −(2.1 kJ ÷ 0.01 mol) = −210 kJ mol⁻¹.'
        },
        {
          id: 'q-t5-b3-s2-4',
          question: 'Mengapakah nilai haba penyesaran kuprum yang diperoleh daripada amali di makmal sekolah sentiasa lebih rendah berbanding nilai teori dalam buku teks?',
          options: [
            'Zink bertindak balas secara endotermik dengan air',
            'Sebahagian haba hilang ke persekitaran dan diserap oleh cawan polistirena',
            'Kuprum(II) sulfat terurai sebelum bertindak balas',
            'Ketumpatan larutan kuprum(II) sulfat jauh melebihi 10 g cm⁻³'
          ],
          answerIndex: 1,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'Kehilangan haba ke udara dan penyerapan haba oleh dinding cawan polistirena serta termometer menyebabkan kenaikan suhu maksimum yang diukur lebih rendah daripada nilai sebenar.'
        },
        {
          id: 'q-t5-b3-s2-5',
          question: 'Persamaan ion bagi suatu tindak balas pemendakan ialah: Ag⁺ (ak) + Cl⁻ (ak) → AgCl (p), ΔH = −65.5 kJ mol⁻¹. Berapakah kenaikan suhu jika 25 cm³ AgNO₃ 1.0 mol dm⁻³ dicampurkan dengan 25 cm³ NaCl 1.0 mol dm⁻³? [c = 4.2 J g⁻¹ °C⁻¹]',
          options: [
            '3.9°C',
            '7.8°C',
            '15.6°C',
            '20.0°C'
          ],
          answerIndex: 1,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'n AgCl = (25 × 1.0) ÷ 1000 = 0.025 mol. Q = n × |ΔH| = 0.025 mol × 65,500 J mol⁻¹ = 1,637.5 J. Jumlah jisim m = 50 g. θ = Q ÷ (mc) = 1,637.5 ÷ (50 × 4.2) ≈ 7.8°C.'
        },
        {
          id: 'q-t5-b3-s2-6',
          question: 'Jika serbuk magnesium menggantikan serbuk zink untuk menyesarkan kuprum daripada larutan kuprum(II) sulfat berkepekatan sama, apakah jangkaan nilai haba penyesarannya?',
          options: [
            'Sama seperti zink (−210 kJ mol⁻¹)',
            'Lebih negatif daripada zink (cth: −350 kJ mol⁻¹) kerana magnesium lebih elektropositif',
            'Kurang negatif daripada zink (cth: −100 kJ mol⁻¹)',
            'Nilai bertukar menjadi positif (+210 kJ mol⁻¹)'
          ],
          answerIndex: 1,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'Magnesium berada lebih tinggi daripada zink dalam Siri Elektrokimia (jarak antara Mg dan Cu lebih jauh berbanding Zn dan Cu), maka kuasa penurunannya lebih kuat dan haba yang dibebaskan lebih tinggi.'
        }
      ]
    },

    // ==========================================
    // SUBTOPIK 3.3
    // ==========================================
    {
      id: 't5-b3-s3',
      code: '3.3',
      title: 'Haba Peneutralan',
      learningStandard: 'SP 3.2.3, 3.2.4',
      durationMinutes: 30,
      tldr: [
        'Haba peneutralan ialah perubahan haba apabila 1 mol air terbentuk daripada tindak balas peneutralan antara asid dan alkali.',
        'Persamaan ion teras peneutralan: H⁺ (ak) + OH⁻ (ak) ➔ H₂O (ce), ΔH ≈ −57 kJ mol⁻¹.',
        'Tindak balas asid kuat dengan alkali kuat sentiasa menghasilkan nilai haba peneutralan yang malar iaitu sekitar −57 kJ mol⁻¹ kerana kedua-duanya mengion lengkap 100% dalam air.',
        'Tindak balas melibatkan asid lemah (seperti CH₃COOH) atau alkali lemah menghasilkan nilai haba peneutralan yang KURANG daripada −57 kJ mol⁻¹ kerana sebahagian haba diserap untuk mengionkan molekul asid lemah sepenuhnya.',
        'Asid sulfurik (H₂SO₄) merupakan asid diprotik; peneutralan lengkap 1 mol H₂SO₄ membebaskan haba DUA KALI GANDA (~114 kJ) kerana menghasilkan 2 mol air.'
      ],
      simulationRef: {
        id: 'haba-peneutralan',
        title: 'Makmal Maya Kalorimeter Haba Peneutralan',
        description: 'Bandingkan peneutralan asid kuat vs asid lemah, asid monoprotik vs diprotik (H₂SO₄) dalam kalorimeter polistirena.',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=haba-peneutralan',
        previewBadge: 'Simulasi Peneutralan SPM'
      },
      concepts: [
        {
          id: 't5-b3-s3-c1',
          title: 'Definisi & Asas Haba Peneutralan',
          badge: 'Konsep Teras SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">Maksud Haba Peneutralan</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  <b>Haba peneutralan</b> ialah haba yang dibebaskan apabila <b>1 mol air</b> terbentuk daripada tindak balas antara ion hidrogen, H⁺ daripada asid dan ion hidroksida, OH⁻ daripada alkali:
                </p>

                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs mb-3 space-y-1.5">
                  <div class="font-mono font-bold text-center bg-white p-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm">
                    H⁺ (ak) + OH⁻ (ak) ➔ H₂O (ce) &nbsp;&nbsp; ΔH ≈ −57 kJ mol⁻¹
                  </div>
                  <p class="text-[11px] text-slate-600 text-center">
                    Semua tindak balas peneutralan adalah <b>EKSOTERMIK</b> (ΔH sentiasa bertanda negatif).
                  </p>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 't5-b3-s3-c2',
          title: 'Perbandingan Haba Peneutralan: Asid Kuat vs Asid Lemah & Asid Diprotik',
          badge: 'Soalan Esei Emas SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">Faktor Mempengaruhi Nilai Haba Peneutralan</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  Perbezaan kekuatan asid dan kebesan asid menghasilkan nilai haba peneutralan yang berbeza:
                </p>

                <div class="space-y-3 text-xs mb-3">
                  <!-- 1. Asid kuat + Alkali kuat -->
                  <div class="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200">
                    <b class="text-emerald-950 block font-bold mb-1">1. Asid Kuat + Alkali Kuat (ΔH ≈ −57 kJ mol⁻¹):</b>
                    <p class="text-[11px] text-slate-700 leading-relaxed">
                      Contoh: HCl + NaOH ➔ NaCl + H₂O (ΔH = −57.1 kJ mol⁻¹)<br />
                      HNO₃ + KOH ➔ KNO₃ + H₂O (ΔH = −57.3 kJ mol⁻¹)<br />
                      <b>Penerangan Skema SPM:</b> Kedua-dua asid kuat dan alkali kuat <b>mengion lengkap 100%</b> di dalam air menghasilkan ion H⁺ dan OH⁻ bebas. Tindak balas yang berlaku bagi kesemua pasangan ini adalah sama, iaitu pembentukan 1 mol air daripada ion H⁺ dan OH⁻.
                    </p>
                  </div>

                  <!-- 2. Asid lemah + Alkali kuat -->
                  <div class="p-3 rounded-xl bg-amber-50/80 border border-amber-200">
                    <b class="text-amber-950 block font-bold mb-1">2. Asid Lemah + Alkali Kuat (ΔH &lt; −57 kJ mol⁻¹, cth: −54 kJ mol⁻¹):</b>
                    <p class="text-[11px] text-slate-700 leading-relaxed">
                      Contoh: CH₃COOH + NaOH ➔ CH₃COONa + H₂O (ΔH = −54.6 kJ mol⁻¹)<br />
                      <b>Penerangan Skema SPM Wajib:</b> Asid etanoik ialah asid lemah yang <b>mengion separa</b> dalam air dan sebahagian besarnya kekal sebagai molekul. <b>Sebahagian tenaga haba yang dibebaskan diserap semula</b> untuk memecahkan ikatan dan mengionkan molekul asid etanoik secara lengkap dalam air. Maka, jumlah bersih haba yang dibebaskan ke persekitaran adalah lebih rendah.
                    </p>
                  </div>

                  <!-- 3. Asid diprotik (H2SO4) + Alkali kuat -->
                  <div class="p-3 rounded-xl bg-indigo-50/80 border border-indigo-200">
                    <b class="text-indigo-950 block font-bold mb-1">3. Asid Diprotik (H₂SO₄) + Alkali Kuat:</b>
                    <p class="text-[11px] text-slate-700 leading-relaxed">
                      Contoh: H₂SO₄ + 2NaOH ➔ Na₂SO₄ + 2H₂O<br />
                      <b>Penerangan Skema SPM:</b> 1 mol asid sulfurik mengion menghasilkan <b>2 mol ion H⁺</b>. Peneutralan lengkap dengan 2 mol NaOH menghasilkan <b>2 mol air</b>. Oleh itu, kuantiti haba yang dibebaskan adalah <b>dua kali ganda</b> (~114 kJ). Walau bagaimanapun, <b>haba peneutralan per mol air</b> yang terbentuk tetap sekitar −57 kJ mol⁻¹ air!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          `,
          comparisonTable: {
            headers: ['Campuran Tindak Balas Peneutralan', 'Kekuatan Bahan', 'Nilai ΔH (kJ mol⁻¹ air)', 'Penerangan Saintifik SPM'],
            rows: [
              ['HCl + NaOH', 'Asid kuat + Alkali kuat', '−57.1', 'Mengion lengkap 100%, hanya tindak balas H⁺ + OH⁻ → H₂O'],
              ['HNO₃ + KOH', 'Asid kuat + Alkali kuat', '−57.3', 'Mengion lengkap 100%, nilai malar piawai'],
              ['CH₃COOH + NaOH', 'Asid lemah + Alkali kuat', '−54.6', 'Haba lebih rendah kerana sebahagian haba diserap untuk mengionkan CH₃COOH'],
              ['HCl + NH₃ (ak)', 'Asid kuat + Alkali lemah', '−52.2', 'Haba diserap untuk mengionkan molekul NH₃ secara lengkap'],
              ['H₂SO₄ + 2NaOH', 'Asid diprotik kuat + Alkali kuat', '−57.2 (per mol H₂O)', 'Menghasilkan 2 mol air; jumlah haba dibebaskan 2 kali ganda (114 kJ)']
            ]
          }
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menyatakan haba peneutralan asid sulfurik dengan natrium hidroksida adalah dua kali ganda (−114 kJ mol⁻¹).',
          correction: 'Jumlah haba yang dibebaskan adalah 2 kali ganda (114 kJ), tetapi HABA PENEUTRALAN PER MOL AIR tetap sekitar −57 kJ mol⁻¹ air!',
          why: 'Definisi haba peneutralan adalah khusus per mol air yang terbentuk, bukan per mol asid.'
        },
        {
          mistake: 'Menulis nilai haba peneutralan asid etanoik sama dengan asid hidroklorik.',
          correction: 'Haba peneutralan asid etanoik lebih rendah (< −57 kJ mol⁻¹) kerana sebahagian haba diserap untuk mengionkannya lengkap dalam air.',
          why: 'Ini soalan perbandingan esei Kertas 2 SPM yang popular (3 markah).'
        }
      ],
      flashcards: [
        {
          id: 'fc-t5-b3-s3-1',
          front: 'Apakah takrifan rasmi haba peneutralan?',
          back: 'Haba peneutralan ialah haba yang dibebaskan apabila satu mol air terbentuk daripada tindak balas peneutralan antara asid dan alkali.'
        },
        {
          id: 'fc-t5-b3-s3-2',
          front: 'Mengapakah nilai haba peneutralan antara asid kuat dan alkali kuat sentiasa malar pada sekitar −57 kJ mol⁻¹?',
          back: 'Kerana kedua-dua asid kuat dan alkali kuat mengion lengkap dalam air, maka tindak balas yang sebenarnya berlaku untuk semua asid dan alkali kuat adalah sama: H⁺ (ak) + OH⁻ (ak) → H₂O (ce).'
        },
        {
          id: 'fc-t5-b3-s3-3',
          front: 'Mengapakah haba peneutralan asid etanoik dengan natrium hidroksida kurang daripada −57 kJ mol⁻¹?',
          back: 'Asid etanoik ialah asid lemah yang mengion separa dalam air. Sebahagian daripada haba yang dibebaskan diserap semula untuk mengionkan molekul asid etanoik secara lengkap.'
        },
        {
          id: 'fc-t5-b3-s3-4',
          front: 'Berapakah bilangan mol air yang terbentuk jika 50 cm³ H₂SO₄ 1.0 mol dm⁻³ dineutralkan sepenuhnya oleh NaOH berlebihan?',
          back: 'Mol H₂SO₄ = (50 × 1.0) ÷ 1000 = 0.05 mol. Kerana H₂SO₄ ialah asid diprotik (nisbah 1 H₂SO₄ : 2 H₂O), bilangan mol air yang terbentuk ialah 0.05 × 2 = 0.10 mol air.'
        },
        {
          id: 'fc-t5-b3-s3-5',
          front: 'Apakah langkah berjaga-jaga eksperimen kalorimeter cawan polistirena semasa menyukat haba peneutralan?',
          back: 'Gunakan cawan polistirena berdinding tebal berserta penutup, campurkan kedua-dua larutan dengan cepat dan cermat, dan kacau campuran secara berterusan untuk meratakan suhu.'
        }
      ],
      quiz: [
        {
          id: 'q-t5-b3-s3-1',
          question: 'Persamaan berikut mewakili tindak balas peneutralan: HCl + KOH → KCl + H₂O, ΔH = −57 kJ mol⁻¹. Berapakah kuantiti haba yang dibebaskan apabila 50 cm³ asid hidroklorik 1.0 mol dm⁻³ dicampurkan dengan 50 cm³ larutan kalium hidroksida 1.0 mol dm⁻³?',
          options: [
            '2.85 kJ',
            '5.70 kJ',
            '28.5 kJ',
            '57.0 kJ'
          ],
          answerIndex: 0,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'Mol air terbentuk: n = (50 × 1.0) ÷ 1000 = 0.05 mol. Haba dibebaskan Q = n × |ΔH| = 0.05 mol × 57 kJ mol⁻¹ = 2.85 kJ.'
        },
        {
          id: 'q-t5-b3-s3-2',
          question: 'Antara pasangan asid dan alkali berikut, yang manakah menghasilkan haba peneutralan PALING RENDAH (paling kurang negatif)?',
          options: [
            'Asid hidroklorik dan natrium hidroksida',
            'Asid nitrik dan kalium hidroksida',
            'Asid etanoik dan larutan ammonia',
            'Asid sulfurik dan natrium hidroksida'
          ],
          answerIndex: 2,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'Asid etanoik (asid lemah) dan ammonia (alkali lemah) kedua-duanya mengion separa dalam air. Banyak haba diserap untuk mengionkan kedua-dua molekul asid dan alkali lemah tersebut, menjadikan haba peneutralan bersih paling rendah.'
        },
        {
          id: 'q-t5-b3-s3-3',
          question: 'Apabila 50 cm³ asid sulfurik 0.5 mol dm⁻³ dicampurkan dengan 50 cm³ natrium hidroksida 1.0 mol dm⁻³, kenaikan suhu ialah T₁°C. Dalam eksperimen kedua, 50 cm³ asid hidroklorik 1.0 mol dm⁻³ digunakan menggantikan asid sulfurik dengan 50 cm³ natrium hidroksida 1.0 mol dm⁻³, menghasilkan kenaikan suhu T₂°C. Apakah hubungan antara T₁ dan T₂?',
          options: [
            'T₁ = 2 × T₂',
            'T₁ = T₂',
            'T₁ = 0.5 × T₂',
            'T₁ = 4 × T₂'
          ],
          answerIndex: 1,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'Dalam eksperimen 1: 50 cm³ H₂SO₄ 0.5 M membekalkan 0.05 mol H⁺, bertindak balas dengan 0.05 mol OH⁻ menghasilkan 0.05 mol air. Dalam eksperimen 2: 50 cm³ HCl 1.0 M membekalkan 0.05 mol H⁺, bertindak balas menghasilkan 0.05 mol air. Kedua-duanya membebaskan kuantiti haba yang sama ke dalam jumlah isi padu campuran yang sama (100 cm³), maka kenaikan suhu adalah sama (T₁ = T₂).'
        },
        {
          id: 'q-t5-b3-s3-4',
          question: 'Mengapakah nilai haba peneutralan antara asid nitrik (HNO₃) dan natrium hidroksida (NaOH) hampir sama dengan nilai haba peneutralan antara asid hidroklorik (HCl) dan kalium hidroksida (KOH)?',
          options: [
            'Kedua-dua tindak balas menghasilkan mendakan putih yang sama',
            'Kedua-dua asid dan alkali adalah elektrolit kuat yang mengion lengkap 100% menghasilkan ion H⁺ dan OH⁻',
            'Ion nitrat dan ion klorida bertindak sebagai mangkin yang membebaskan haba',
            'Jisim molar bagi semua garam yang terbentuk adalah serupa'
          ],
          answerIndex: 1,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'Kedua-dua asid kuat dan alkali kuat mengion secara lengkap di dalam larutan akueus. Oleh itu, tindak balas ion bersih bagi kedua-dua eksperimen adalah sama: H⁺ (ak) + OH⁻ (ak) → H₂O (ce).'
        },
        {
          id: 'q-t5-b3-s3-5',
          question: 'Dalam eksperimen peneutralan, 100 cm³ larutan asid hidroklorik 2.0 mol dm⁻³ dicampurkan dengan 100 cm³ larutan natrium hidroksida 2.0 mol dm⁻³. Kenaikan suhu campuran ialah 13.0°C. Berapakah nilai haba peneutralan yang dihitung? [c = 4.2 J g⁻¹ °C⁻¹]',
          options: [
            '−27.3 kJ mol⁻¹',
            '−54.6 kJ mol⁻¹',
            '−109.2 kJ mol⁻¹',
            '−57.0 kJ mol⁻¹'
          ],
          answerIndex: 1,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'm = 200 g. Q = mcθ = 200 × 4.2 × 13.0 = 10,920 J = 10.92 kJ. Mol air: n = (100 × 2.0) ÷ 1000 = 0.20 mol. ΔH = −(10.92 kJ ÷ 0.20 mol) = −54.6 kJ mol⁻¹.'
        },
        {
          id: 'q-t5-b3-s3-6',
          question: 'Bagaimanakah cara untuk memastikan ralat kehilangan haba ke persekitaran dapat diminimumkan semasa menjalankan eksperimen haba peneutralan di makmal?',
          options: [
            'Gunakan bikar kaca nipis dan biarkan terdedah kepada angin kipas',
            'Gunakan cawan polistirena bersarang dan tutup dengan penutup polistirena',
            'Kacau larutan menggunakan rod kaca secara laju sehingga buih terhasil',
            'Panaskan larutan asid sebelum mencampurkannya dengan alkali'
          ],
          answerIndex: 1,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'Penggunaan dua cawan polistirena bersarang (double-cup) yang bertutup bertindak sebagai penebat haba yang berkesan untuk menghalang pembebasan haba ke persekitaran.'
        }
      ]
    },

    // ==========================================
    // SUBTOPIK 3.4
    // ==========================================
    {
      id: 't5-b3-s4',
      code: '3.4',
      title: 'Haba Pembakaran & Nilai Bahan Api',
      learningStandard: 'SP 3.2.5, 3.3.1',
      durationMinutes: 30,
      tldr: [
        'Haba pembakaran ialah haba yang dibebaskan apabila 1 mol bahan api terbakar lengkap dalam oksigen berlebihan.',
        'Siri homolog alkohol: semakin bertambah bilangan atom karbon per molekul alkohol, semakin bertambah haba pembakarannya.',
        'Penerangan: Pertambahan atom karbon menghasilkan lebih banyak molekul CO₂ dan H₂O, membentuk lebih banyak ikatan baharu yang membebaskan lebih banyak tenaga haba.',
        'Langkah berjaga-jaga eksperimen: Gunakan bekas kuprum (konduktor haba baik), pasang penghadang angin, kacau air berterusan, dan timbang pelita sejurus selepas padam.',
        'Nilai bahan api ialah kuantiti tenaga haba yang dibebaskan apabila 1 gram bahan api terbakar lengkap (Nilai Bahan Api = ΔH ÷ Jisim Molar, unit: kJ g⁻¹).'
      ],
      simulationRef: {
        id: 'haba-pembakaran',
        title: 'Makmal Maya Kalorimeter Haba Pembakaran Alkohol',
        description: 'Bakar metanol, etanol, propanol & butanol untuk memanaskan air, kaji pengaruh bilangan atom karbon dan analisis nilai bahan api.',
        url: 'https://simulasikimia.cikguhafreez.my/?sim=haba-pembakaran',
        previewBadge: 'Simulasi Pembakaran SPM'
      },
      concepts: [
        {
          id: 't5-b3-s4-c1',
          title: 'Haba Pembakaran Alkohol & Siri Homolog',
          badge: 'Eksperimen SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">Definisi Haba Pembakaran</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  <b>Haba pembakaran</b> ialah haba yang dibebaskan apabila <b>1 mol bahan api</b> terbakar secara lengkap di dalam oksigen, O₂ berlebihan:
                </p>

                <!-- PERSAMAAN PEMBAKARAN ALKOHOL -->
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs mb-3 space-y-1.5 font-mono">
                  <div class="text-slate-900 font-bold bg-white p-2 rounded-lg border border-slate-200 text-center">
                    C₂H₅OH (ce) + 3O₂ (g) ➔ 2CO₂ (g) + 3H₂O (ce) &nbsp;&nbsp; ΔH = −1376 kJ mol⁻¹
                  </div>
                  <p class="text-[11px] text-slate-600 font-sans">
                    Semua tindak balas pembakaran bahan api adalah tindak balas <b>EKSOTERMIK</b>.
                  </p>
                </div>

                <!-- TREND SIRI HOMOLOG ALKOHOL -->
                <div class="p-3 rounded-xl bg-indigo-50/80 border border-indigo-200 text-xs">
                  <b class="text-indigo-950 block font-bold mb-1 flex items-center gap-1.5">
                    <span>📈</span> Trend Haba Pembakaran Siri Homolog Alkohol:
                  </b>
                  <p class="text-[11px] text-slate-700 leading-relaxed">
                    Metanol (CH₃OH: −726 kJ mol⁻¹) &lt; Etanol (C₂H₅OH: −1,376 kJ mol⁻¹) &lt; Propanol (C₃H₇OH: −2,021 kJ mol⁻¹) &lt; Butanol (C₄H₉OH: −2,676 kJ mol⁻¹).<br />
                    <b>Sebab Mengikut Skema SPM:</b><br />
                    1. Semakin bertambah bilangan atom karbon dan hidrogen per molekul alkohol, semakin banyak molekul <b>karbon dioksida (CO₂) dan air (H₂O)</b> yang terhasil.<br />
                    2. Oleh itu, <b>lebih banyak ikatan kovalen baharu</b> terbentuk dalam hasil tindak balas.<br />
                    3. Pembentukan lebih banyak ikatan membebaskan <b>kuantiti tenaga haba yang lebih besar</b>.
                  </p>
                </div>
              </div>
            </div>
          `,
          comparisonTable: {
            headers: ['Nama Alkohol', 'Formula Molekul', 'Bil. Atom Karbon', 'Jisim Molar (g mol⁻¹)', 'Haba Pembakaran, ΔH (kJ mol⁻¹)', 'Nilai Bahan Api (kJ g⁻¹)'],
            rows: [
              ['Metanol', 'CH₃OH', '1', '32', '−726', '22.7'],
              ['Etanol', 'C₂H₅OH', '2', '46', '−1,376', '29.9'],
              ['Propan-1-ol', 'C₃H₇OH', '3', '60', '−2,021', '33.7'],
              ['Butan-1-ol', 'C₄H₉OH', '4', '74', '−2,676', '36.2']
            ]
          }
        },
        {
          id: 't5-b3-s4-c2',
          title: 'Nilai Bahan Api & Aspek Pemilihan Bahan Api',
          badge: 'Aplikasi Kelestarian SPM',
          content: `
            <div class="space-y-3 my-2">
              <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span class="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-2">Konsep Nilai Bahan Api</span>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                  <b>Nilai bahan api</b> ialah kuantiti tenaga haba yang dibebaskan apabila <b>satu gram</b> bahan api dibakar secara lengkap dalam oksigen berlebihan:
                </p>

                <!-- RUMUS NILAI BAHAN API TEXTBOOK STYLE -->
                <div class="p-3.5 rounded-xl bg-amber-50/80 border border-amber-300 text-xs mb-3 text-center">
                  <div class="font-bold text-slate-900 text-sm mb-1">
                    Nilai Bahan Api (kJ g⁻¹) = Haba Pembakaran, ΔH (kJ mol⁻¹) ÷ Jisim Molar (g mol⁻¹)
                  </div>
                  <span class="text-[11px] text-amber-900 font-medium">(Gunakan nilai mutlak positif tanpa tanda cas)</span>
                </div>

                <!-- CIRI PEMILIHAN BAHAN API -->
                <div class="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs">
                  <b class="text-emerald-950 block font-bold mb-1 flex items-center gap-1.5">
                    <span>🌿</span> Kriteria Pemilihan Bahan Api yang Baik:
                  </b>
                  <ul class="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                    <li><b>Nilai bahan api yang tinggi:</b> Menghasilkan banyak tenaga bagi setiap gram bahan yang dibakar.</li>
                    <li><b>Ketersediaan dan kos:</b> Mudah didapati dengan kos yang berpatutan dan munasabah.</li>
                    <li><b>Mesra alam:</b> Pembakaran bersih tanpa menghasilkan jelaga tebal, gas beracun (CO, SO₂) atau gas rumah hijau berlebihan. Gas hidrogen (H₂) mempunyai nilai bahan api paling tinggi (142 kJ g⁻¹) dan hasil pembakarannya hanyalah air tulen.</li>
                  </ul>
                </div>
              </div>
            </div>
          `
        }
      ],
      commonMistakes: [
        {
          mistake: 'Menggunakan jisim pelita yang terbakar untuk nilai m dalam formula Q = mcθ.',
          correction: 'Nilai m dalam Q = mcθ ialah JISIM AIR yang dipanaskan dalam bekas kuprum (cth: 200 cm³ air = 200 g), BUKAN jisim bahan api!',
          why: 'Haba diserap oleh air, manakala jisim alkohol yang hilang hanya digunakan untuk mencari bilangan mol n = m ÷ JMR.'
        },
        {
          mistake: 'Meletakkan tanda negatif (−) pada Nilai Bahan Api.',
          correction: 'Nilai bahan api ialah kuantiti tenaga mutlak tanpa tanda negatif (+/−), cth: 29.9 kJ g⁻¹.',
          why: 'Nilai bahan api ialah nilai tenaga skalar per gram, bukan entalpi tindak balas.'
        }
      ],
      flashcards: [
        {
          id: 'fc-t5-b3-s4-1',
          front: 'Apakah takrifan rasmi haba pembakaran?',
          back: 'Haba pembakaran ialah haba yang dibebaskan apabila 1 mol bahan api terbakar secara lengkap di dalam oksigen berlebihan.'
        },
        {
          id: 'fc-t5-b3-s4-2',
          front: 'Bagaimanakah haba pembakaran berubah apabila menuruni siri homolog alkohol?',
          back: 'Haba pembakaran semakin meningkat. Pertambahan bilangan atom karbon dan hidrogen menghasilkan lebih banyak molekul CO₂ dan H₂O, membentuk lebih banyak ikatan baharu yang membebaskan lebih banyak tenaga haba.'
        },
        {
          id: 'fc-t5-b3-s4-3',
          front: 'Apakah rumus untuk mengira Nilai Bahan Api dan apakah unitnya?',
          back: 'Nilai Bahan Api = Haba Pembakaran (kJ mol⁻¹) ÷ Jisim Molar (g mol⁻¹). Unitnya ialah kJ g⁻¹.'
        },
        {
          id: 'fc-t5-b3-s4-4',
          front: 'Mengapakah bekas kuprum digunakan dan bukannya bikar kaca dalam eksperimen haba pembakaran alkohol?',
          back: 'Kuprum ialah konduktor haba yang sangat baik, membolehkan haba daripada nyalaan pelita dipindahkan dengan cepat dan cekap kepada air.'
        },
        {
          id: 'fc-t5-b3-s4-5',
          front: 'Mengapakah gas hidrogen dianggap sebagai bahan api masa hadapan yang unggul?',
          back: 'Gas hidrogen mempunyai nilai bahan api yang sangat tinggi (142 kJ g⁻¹) dan tidak mencemarkan alam sekitar kerana hasil pembakarannya hanyalah air (H₂O).'
        }
      ],
      quiz: [
        {
          id: 'q-t5-b3-s4-1',
          question: 'Persamaan termokimia bagi pembakaran lengkap etanol ialah: C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O, ΔH = −1,376 kJ mol⁻¹. Berapakah kuantiti haba yang dibebaskan apabila 2.3 g etanol terbakar lengkap? [Jisim Molar C₂H₅OH = 46 g mol⁻¹]',
          options: [
            '34.4 kJ',
            '68.8 kJ',
            '137.6 kJ',
            '275.2 kJ'
          ],
          answerIndex: 1,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'Mol etanol: n = 2.3 g ÷ 46 g mol⁻¹ = 0.05 mol. Haba dibebaskan Q = 0.05 mol × 1,376 kJ mol⁻¹ = 68.8 kJ.'
        },
        {
          id: 'q-t5-b3-s4-2',
          question: 'Antara alkohol berikut, yang manakah membebaskan kuantiti haba pembakaran PALING BESAR per mol?',
          options: [
            'Metanol (CH₃OH)',
            'Etanol (C₂H₅OH)',
            'Propan-1-ol (C₃H₇OH)',
            'Butan-1-ol (C₄H₉OH)'
          ],
          answerIndex: 3,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'Butan-1-ol mempunyai bilangan atom karbon tertinggi (4 atom C per molekul), menghasilkan paling banyak molekul CO₂ dan H₂O serta membebaskan paling banyak haba pembentukan ikatan.'
        },
        {
          id: 'q-t5-b3-s4-3',
          question: 'Haba pembakaran butanol, C₄H₉OH ialah −2,676 kJ mol⁻¹. Berapakah nilai bahan api bagi butanol? [Jisim Atom Relatif: H=1, C=12, O=16]',
          options: [
            '24.8 kJ g⁻¹',
            '36.2 kJ g⁻¹',
            '45.6 kJ g⁻¹',
            '58.2 kJ g⁻¹'
          ],
          answerIndex: 1,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'Jisim molar butanol C₄H₉OH = (4×12) + (10×1) + 16 = 74 g mol⁻¹. Nilai bahan api = 2,676 kJ mol⁻¹ ÷ 74 g mol⁻¹ ≈ 36.2 kJ g⁻¹.'
        },
        {
          id: 'q-t5-b3-s4-4',
          question: 'Apakah fungsi memasang penghadang angin (wooden shield) di sekeliling susunan radas eksperimen penentuan haba pembakaran alkohol?',
          options: [
            'Menghalang oksigen daripada memasuki nyalaan pelita',
            'Memastikan nyalaan pelita tidak terpesong dan mengurangkan kehilangan haba ke persekitaran',
            'Mempercepatkan pembakaran sumbu pelita',
            'Mengekalkan suhu air pada takat didih malar'
          ],
          answerIndex: 1,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'Penghadang angin menghalang arus udara daripada meniup nyalaan pelita, membolehkan haba difokuskan tepat ke bawah bekas kuprum dan mengurangkan kehilangan haba ke persekitaran.'
        },
        {
          id: 'q-t5-b3-s4-5',
          question: 'Dalam suatu eksperimen pembakaran metanol, 200 cm³ air dipanaskan daripada 28°C kepada 53°C oleh pembakaran 0.8 g metanol (CH₃OH). Berapakah haba pembakaran metanol yang dihitung? [c = 4.2 J g⁻¹ °C⁻¹; JMR CH₃OH = 32]',
          options: [
            '−420 kJ mol⁻¹',
            '−840 kJ mol⁻¹',
            '+840 kJ mol⁻¹',
            '−1,050 kJ mol⁻¹'
          ],
          answerIndex: 1,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'Q = mcθ = 200 × 4.2 × (53 − 28) = 21,000 J = 21 kJ. Mol metanol = 0.8 ÷ 32 = 0.025 mol. ΔH = −(21 kJ ÷ 0.025 mol) = −840 kJ mol⁻¹.'
        },
        {
          id: 'q-t5-b3-s4-6',
          question: 'Antara bahan api berikut, yang manakah mempunyai nilai bahan api paling tinggi dan menghasilkan pencemaran alam sekitar paling minimum?',
          options: [
            'Arang batu',
            'Gas asli (metana)',
            'Gas hidrogen',
            'Petrol (oktana)'
          ],
          answerIndex: 2,
          level: 'Sederhana',
          spmReference: 'Format Peperiksaan SPM',
          explanation: 'Gas hidrogen (H₂) mempunyai nilai bahan api tertinggi iaitu sekitar 142 kJ g⁻¹, dan pembakarannya hanya membebaskan wap air tulen (2H₂ + O₂ → 2H₂O) tanpa gas karbon dioksida atau jelaga.'
        }
      ]
    }
  ]
};
