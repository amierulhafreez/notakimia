import { FULL_CHAPTERS } from './chaptersIndex';
import { EXTRA_T5_EXAM_QUESTIONS } from './extraExamQuestionsT5';

export interface ExamQuestion {
  id: string;
  form: 'T4' | 'T5';
  chapterNumber: number;
  chapterTitle: string;
  subtopicCode: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  level: 'Rendah' | 'Sederhana' | 'Tinggi (KBAT)';
  spmReference?: string;
}

export type ExamMode = 'T4' | 'T5' | 'ALL';

// Harvest all questions from FULL_CHAPTERS
const harvestChapterQuestions = (): { t4: ExamQuestion[]; t5: ExamQuestion[] } => {
  const t4: ExamQuestion[] = [];
  const t5: ExamQuestion[] = [];

  for (const chapter of FULL_CHAPTERS) {
    for (const subtopic of chapter.subtopics) {
      if (subtopic.quiz && subtopic.quiz.length > 0) {
        for (const q of subtopic.quiz) {
          const item: ExamQuestion = {
            id: q.id,
            form: chapter.form,
            chapterNumber: chapter.chapterNumber,
            chapterTitle: chapter.title,
            subtopicCode: subtopic.code,
            question: q.question,
            options: q.options,
            answerIndex: q.answerIndex,
            explanation: q.explanation,
            level: q.level || 'Sederhana',
            spmReference: q.spmReference || `Silibus KSSM ${chapter.form} Bab ${chapter.chapterNumber}`,
          };

          if (chapter.form === 'T4') {
            t4.push(item);
          } else {
            t5.push(item);
          }
        }
      }
    }
  }

  // Add the extra 60 curated questions for Tingkatan 5 to achieve >200 bank
  for (const extra of EXTRA_T5_EXAM_QUESTIONS) {
    t5.push({
      id: extra.id,
      form: 'T5',
      chapterNumber: extra.chapterNumber,
      chapterTitle: extra.chapterTitle,
      subtopicCode: extra.subtopicCode,
      question: extra.question,
      options: extra.options,
      answerIndex: extra.answerIndex,
      explanation: extra.explanation,
      level: extra.level,
      spmReference: extra.spmReference,
    });
  }

  return { t4, t5 };
};

const { t4: ALL_T4_QUESTIONS, t5: ALL_T5_QUESTIONS } = harvestChapterQuestions();

export const EXAM_BANK_T4: ExamQuestion[] = ALL_T4_QUESTIONS;
export const EXAM_BANK_T5: ExamQuestion[] = ALL_T5_QUESTIONS;
export const EXAM_BANK_ALL: ExamQuestion[] = [...ALL_T4_QUESTIONS, ...ALL_T5_QUESTIONS];

/**
 * Uniform Fisher-Yates shuffle algorithm to generate 10 unique, random questions
 */
export const getRandomExamQuestions = (mode: ExamMode, count = 10): ExamQuestion[] => {
  let source: ExamQuestion[];

  switch (mode) {
    case 'T4':
      source = [...EXAM_BANK_T4];
      break;
    case 'T5':
      source = [...EXAM_BANK_T5];
      break;
    case 'ALL':
    default:
      source = [...EXAM_BANK_ALL];
      break;
  }

  // Fisher-Yates Shuffle
  for (let i = source.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [source[i], source[j]] = [source[j], source[i]];
  }

  return source.slice(0, count);
};

export const getExamModeLabel = (mode: ExamMode): { title: string; subtitle: string; badge: string; color: string } => {
  switch (mode) {
    case 'T4':
      return {
        title: 'Mod Peperiksaan Tingkatan 4',
        subtitle: '10 Soalan Rawak • Merangkumi Bab 1 hingga Bab 8 KSSM',
        badge: 'Tingkatan 4',
        color: 'sky',
      };
    case 'T5':
      return {
        title: 'Mod Peperiksaan Tingkatan 5',
        subtitle: '10 Soalan Rawak • Merangkumi Bab 1 hingga Bab 5 KSSM',
        badge: 'Tingkatan 5',
        color: 'indigo',
      };
    case 'ALL':
    default:
      return {
        title: 'Mod Peperiksaan SPM Maya',
        subtitle: '10 Soalan Rawak • Silibus Penuh SPM KSSM (Tingkatan 4 & 5)',
        badge: 'SPM Maya',
        color: 'amber',
      };
  }
};
