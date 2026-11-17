export type FormLevel = 'T4' | 'T5';

export interface ChemicalEquation {
  equation: string;
  name?: string;
  qualitative?: string;
  quantitative?: string;
  notes?: string;
}

export interface ComparisonTable {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface ConceptItem {
  id: string;
  title: string;
  content: string; // supports HTML formatting, <b> for keywords, special tags
  badge?: string;
  equations?: ChemicalEquation[];
  comparisonTable?: ComparisonTable;
  bulletPoints?: string[];
  tips?: string;
}

export interface CommonMistake {
  mistake: string;
  correction: string;
  why: string;
  spmTip?: string;
}

export interface SimulationRef {
  id: string;
  title: string;
  url: string;
  description: string;
  previewBadge: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  level: 'Rendah' | 'Sederhana' | 'Tinggi (KBAT)';
  spmReference?: string;
}

export interface Subtopic {
  id: string;
  code: string; // e.g. "6.1"
  title: string;
  learningStandard: string; // e.g. "SP 6.1.1, 6.1.2"
  durationMinutes: number;
  tldr: string[];
  concepts: ConceptItem[];
  commonMistakes: CommonMistake[];
  simulationRef?: SimulationRef;
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
}

export interface Chapter {
  id: string; // e.g. "t4-b6"
  form: FormLevel;
  chapterNumber: number;
  title: string;
  theme: string;
  durationMinutes: number;
  description: string;
  iconName: string;
  subtopicCount: number;
  subtopics: Subtopic[];
}

export interface ChapterMeta {
  id: string;
  form: FormLevel;
  chapterNumber: number;
  title: string;
  theme: string;
  durationMinutes: number;
  description: string;
  iconName: string;
  subtopicCount: number;
  hasFullContent: boolean;
}

export interface UserStudyProgress {
  completedSubtopics: string[];
  lastReadSubtopicId: string | null;
  lastReadChapterId: string | null;
  quizScores: Record<string, { score: number; total: number; timestamp: number }>;
}

export interface SearchResultItem {
  type: 'chapter' | 'subtopic' | 'concept' | 'mistake';
  form: FormLevel;
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
  subtopicId?: string;
  subtopicCode?: string;
  subtopicTitle?: string;
  title: string;
  matchSnippet: string;
}
