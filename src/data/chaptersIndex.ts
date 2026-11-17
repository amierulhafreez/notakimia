import { Chapter, ChapterMeta, SearchResultItem } from '../types/nota';
import { T4_BAB1 } from './t4_bab1';
import { T4_BAB2 } from './t4_bab2';
import { T4_BAB3 } from './t4_bab3';
import { T4_BAB4 } from './t4_bab4';
import { T4_BAB5 } from './t4_bab5';
import { T4_BAB6 } from './t4_bab6';
import { T4_BAB7 } from './t4_bab7';
import { T4_BAB8 } from './t4_bab8';
import { T5_BAB1 } from './t5_bab1';
import { T5_BAB2 } from './t5_bab2';
import { T5_BAB3 } from './t5_bab3';
import { T5_BAB4 } from './t5_bab4';
import { T5_BAB5 } from './t5_bab5';

export const CHAPTERS_METADATA: ChapterMeta[] = [
  // Tingkatan 4 (8 Bab)
  {
    id: 't4-b1',
    form: 'T4',
    chapterNumber: 1,
    title: 'Pengenalan kepada Kimia',
    theme: 'Kaedah Saintifik',
    durationMinutes: 60,
    description: 'Meneroka maksud kimia, bahan kimia lazim dalam kehidupan, kaedah saintifik, pengurusan radas makmal, PPE, dan langkah keselamatan tumpahan merkuri.',
    iconName: 'Microscope',
    subtopicCount: 3,
    hasFullContent: true
  },
  {
    id: 't4-b2',
    form: 'T4',
    chapterNumber: 2,
    title: 'Jirim dan Struktur Atom',
    theme: 'Asas Kimia',
    durationMinutes: 90,
    description: 'Teori kinetik jirim, lengkung pemanasan & penyejukan naftalena, perkembangan model atom, nombor proton & nukleon, serta aplikasi isotop.',
    iconName: 'Atom',
    subtopicCount: 4,
    hasFullContent: true
  },
  {
    id: 't4-b3',
    form: 'T4',
    chapterNumber: 3,
    title: 'Konsep Mol, Formula dan Persamaan Kimia',
    theme: 'Asas Kimia',
    durationMinutes: 120,
    description: 'Jisim atom relatif, pemalar Avogadro, jambatan mol, formula empirik (eksperimen MgO & CuO), pembinaan formula kimia, dan stoikiometri persamaan kimia.',
    iconName: 'Binary',
    subtopicCount: 4,
    hasFullContent: true
  },
  {
    id: 't4-b4',
    form: 'T4',
    chapterNumber: 4,
    title: 'Jadual Berkala Unsur',
    theme: 'Interaksi Antara Jirim',
    durationMinutes: 120,
    description: 'Prinsip susunan berkala, Kumpulan 18 (gas nadir), Kumpulan 1 (logam alkali), Kumpulan 17 (halogen), unsur Kala 3, unsur peralihan.',
    iconName: 'Grid',
    subtopicCount: 7,
    hasFullContent: true
  },
  {
    id: 't4-b5',
    form: 'T4',
    chapterNumber: 5,
    title: 'Ikatan Kimia',
    theme: 'Interaksi Antara Jirim',
    durationMinutes: 120,
    description: 'Kestabilan duplet dan oktet, pembentukan ikatan ion, ikatan kovalen (tunggal, ganda dua, ganda tiga), ikatan hidrogen, ikatan datif, ikatan logam dan perbandingan sifat fizik sebatian.',
    iconName: 'Share2',
    subtopicCount: 7,
    hasFullContent: true
  },
  {
    id: 't4-b6',
    form: 'T4',
    chapterNumber: 6,
    title: 'Asid, Bes dan Garam',
    theme: 'Interaksi Antara Jirim',
    durationMinutes: 180,
    description: 'Peranan air, skala pH, asid/bes kuat & lemah, penyediaan larutan piawai, pentitratan asid-bes, sintesis garam, dan analisis kualitatif SPM.',
    iconName: 'FlaskConical',
    subtopicCount: 11,
    hasFullContent: true
  },
  {
    id: 't4-b7',
    form: 'T4',
    chapterNumber: 7,
    title: 'Kadar Tindak Balas',
    theme: 'Interaksi Antara Jirim',
    durationMinutes: 120,
    description: 'Penentuan kadar tindak balas purata dan seketika, 4 faktor mempengaruhi kadar (saiz, kepekatan, suhu, pemangkin), aplikasi harian & industri, dan Teori Perlanggaran dengan gambar rajah profil tenaga.',
    iconName: 'Gauge',
    subtopicCount: 4,
    hasFullContent: true
  },
  {
    id: 't4-b8',
    form: 'T4',
    chapterNumber: 8,
    title: 'Bahan Buatan dalam Industri',
    theme: 'Penerokaan Unsur dalam Kimia',
    durationMinutes: 90,
    description: 'Aloi dan kegunaannya, komposisi kaca dan seramik, bahan komposit moden serta kepentingannya dalam teknologi masa kini.',
    iconName: 'Layers',
    subtopicCount: 4,
    hasFullContent: true
  },

  // Tingkatan 5 (5 Bab)
  {
    id: 't5-b1',
    form: 'T5',
    chapterNumber: 1,
    title: 'Keseimbangan Redoks',
    theme: 'Proses Kimia',
    durationMinutes: 180,
    description: '4 takrifan redoks, Tiub-U pemindahan elektron, siri keupayaan elektrod piawai (E°), sel kimia, sel elektrolisis, pengekstrakan logam, pengaratan besi.',
    iconName: 'Zap',
    subtopicCount: 6,
    hasFullContent: true
  },
  {
    id: 't5-b2',
    form: 'T5',
    chapterNumber: 2,
    title: 'Sebatian Karbon',
    theme: 'Kimia Organik',
    durationMinutes: 180,
    description: 'Hidrokarbon tepu & tak tepu, alkana, alkena, alkuna, alkohol, asid karboksilik, esterifikasi, dan keisomeran struktur.',
    iconName: 'Boxes',
    subtopicCount: 6,
    hasFullContent: true
  },
  {
    id: 't5-b3',
    form: 'T5',
    chapterNumber: 3,
    title: 'Termokimia',
    theme: 'Haba & Tenaga',
    durationMinutes: 120,
    description: 'Tindak balas eksotermik & endotermik, gambar rajah aras tenaga, haba pemendakan, haba penyesaran, haba peneutralan, haba pembakaran & nilai bahan api.',
    iconName: 'Flame',
    subtopicCount: 4,
    hasFullContent: true
  },
  {
    id: 't5-b4',
    form: 'T5',
    chapterNumber: 4,
    title: 'Kimia Polimer',
    theme: 'Bahan & Pempolimeran',
    durationMinutes: 120,
    description: 'Polimer semula jadi & sintetik, pempolimeran penambahan & kondensasi, getah asli, penggumpalan lateks, dan pemvulkanan getah.',
    iconName: 'Network',
    subtopicCount: 3,
    hasFullContent: true
  },
  {
    id: 't5-b5',
    form: 'T5',
    chapterNumber: 5,
    title: 'Kimia Konsumer dan Industri',
    theme: 'Aplikasi Sains',
    durationMinutes: 150,
    description: 'Minyak dan lemak, sabun dan detergen serta tindakan pencucian dalam air liat, bahan tambah makanan, ubat-ubatan, kosmetik dan teknologi nano.',
    iconName: 'Sparkles',
    subtopicCount: 5,
    hasFullContent: true
  }
];

export const FULL_CHAPTERS: Chapter[] = [
  T4_BAB1,
  T4_BAB2,
  T4_BAB3,
  T4_BAB4,
  T4_BAB5,
  T4_BAB6,
  T4_BAB7,
  T4_BAB8,
  T5_BAB1,
  T5_BAB2,
  T5_BAB3,
  T5_BAB4,
  T5_BAB5
];

export const getChapterById = (id: string): Chapter | undefined => {
  return FULL_CHAPTERS.find((ch) => ch.id === id);
};

export const searchNotes = (query: string): SearchResultItem[] => {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];

  const results: SearchResultItem[] = [];

  // Search within full chapters
  for (const chapter of FULL_CHAPTERS) {
    // Check chapter title/description
    if (chapter.title.toLowerCase().includes(cleanQuery) || chapter.description.toLowerCase().includes(cleanQuery)) {
      results.push({
        type: 'chapter',
        form: chapter.form,
        chapterId: chapter.id,
        chapterNumber: chapter.chapterNumber,
        chapterTitle: chapter.title,
        title: chapter.title,
        matchSnippet: chapter.description
      });
    }

    // Search inside subtopics
    for (const sub of chapter.subtopics) {
      if (sub.title.toLowerCase().includes(cleanQuery) || sub.learningStandard.toLowerCase().includes(cleanQuery)) {
        results.push({
          type: 'subtopic',
          form: chapter.form,
          chapterId: chapter.id,
          chapterNumber: chapter.chapterNumber,
          chapterTitle: chapter.title,
          subtopicId: sub.id,
          subtopicCode: sub.code,
          subtopicTitle: sub.title,
          title: `${sub.code} ${sub.title}`,
          matchSnippet: sub.tldr[0] || sub.title
        });
      }

      // Search in concepts
      for (const concept of sub.concepts) {
        const textContent = concept.content.replace(/<[^>]*>/g, '');
        if (concept.title.toLowerCase().includes(cleanQuery) || textContent.toLowerCase().includes(cleanQuery)) {
          const idx = textContent.toLowerCase().indexOf(cleanQuery);
          const start = Math.max(0, idx - 40);
          const end = Math.min(textContent.length, idx + cleanQuery.length + 50);
          const snippet = (start > 0 ? '...' : '') + textContent.substring(start, end) + (end < textContent.length ? '...' : '');

          results.push({
            type: 'concept',
            form: chapter.form,
            chapterId: chapter.id,
            chapterNumber: chapter.chapterNumber,
            chapterTitle: chapter.title,
            subtopicId: sub.id,
            subtopicCode: sub.code,
            subtopicTitle: sub.title,
            title: concept.title,
            matchSnippet: snippet
          });
        }
      }

      // Search in common mistakes
      for (const m of sub.commonMistakes) {
        if (m.mistake.toLowerCase().includes(cleanQuery) || m.correction.toLowerCase().includes(cleanQuery)) {
          results.push({
            type: 'mistake',
            form: chapter.form,
            chapterId: chapter.id,
            chapterNumber: chapter.chapterNumber,
            chapterTitle: chapter.title,
            subtopicId: sub.id,
            subtopicCode: sub.code,
            subtopicTitle: sub.title,
            title: `Awas SPM: ${m.mistake}`,
            matchSnippet: m.correction
          });
        }
      }
    }
  }

  // Also search metadata for other chapters
  for (const meta of CHAPTERS_METADATA) {
    if (!FULL_CHAPTERS.some(fc => fc.id === meta.id)) {
      if (meta.title.toLowerCase().includes(cleanQuery) || meta.description.toLowerCase().includes(cleanQuery)) {
        results.push({
          type: 'chapter',
          form: meta.form,
          chapterId: meta.id,
          chapterNumber: meta.chapterNumber,
          chapterTitle: meta.title,
          title: `Bab ${meta.chapterNumber}: ${meta.title} (Akan Datang)`,
          matchSnippet: meta.description
        });
      }
    }
  }

  return results.slice(0, 15);
};
