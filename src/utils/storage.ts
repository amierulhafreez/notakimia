import { UserStudyProgress } from '../types/nota';

const STORAGE_KEY = 'nota_kimia_user_progress_v1';

export const getInitialProgress = (): UserStudyProgress => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load progress from localStorage', e);
  }
  return {
    completedSubtopics: [],
    lastReadSubtopicId: null,
    lastReadChapterId: null,
    quizScores: {},
  };
};

export const saveProgress = (progress: UserStudyProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
};

export const toggleSubtopicComplete = (
  subtopicId: string,
  progress: UserStudyProgress
): UserStudyProgress => {
  const isCompleted = progress.completedSubtopics.includes(subtopicId);
  const updatedCompleted = isCompleted
    ? progress.completedSubtopics.filter((id) => id !== subtopicId)
    : [...progress.completedSubtopics, subtopicId];

  const newProgress: UserStudyProgress = {
    ...progress,
    completedSubtopics: updatedCompleted,
  };
  saveProgress(newProgress);
  return newProgress;
};

export const recordLastRead = (
  chapterId: string,
  subtopicId: string,
  progress: UserStudyProgress
): UserStudyProgress => {
  const newProgress: UserStudyProgress = {
    ...progress,
    lastReadChapterId: chapterId,
    lastReadSubtopicId: subtopicId,
  };
  saveProgress(newProgress);
  return newProgress;
};

export const recordQuizScore = (
  subtopicId: string,
  score: number,
  total: number,
  progress: UserStudyProgress
): UserStudyProgress => {
  const newProgress: UserStudyProgress = {
    ...progress,
    quizScores: {
      ...progress.quizScores,
      [subtopicId]: {
        score,
        total,
        timestamp: Date.now(),
      },
    },
  };
  saveProgress(newProgress);
  return newProgress;
};
