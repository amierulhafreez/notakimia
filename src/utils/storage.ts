import { UserStudyProgress } from '../types/nota';

const LEGACY_STORAGE_KEY = 'nota_kimia_user_progress_v1';
const STORAGE_KEY_PREFIX = 'nota_kimia_user_progress_v2_';

// Remove legacy un-scoped shared progress key so progress never leaks between accounts
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  }
} catch (e) {
  // ignore
}

export const createEmptyProgress = (): UserStudyProgress => ({
  completedSubtopics: [],
  lastReadSubtopicId: null,
  lastReadChapterId: null,
  quizScores: {},
});

export const getProgressStorageKey = (userKey?: string | null): string => {
  if (!userKey || !userKey.trim()) {
    return `${STORAGE_KEY_PREFIX}guest`;
  }
  const cleanKey = userKey.toLowerCase().trim().replace(/[^a-z0-9@._-]/g, '_');
  return `${STORAGE_KEY_PREFIX}${cleanKey}`;
};

export const getInitialProgress = (userKey?: string | null): UserStudyProgress => {
  if (!userKey || !userKey.trim()) {
    return createEmptyProgress();
  }
  try {
    const key = getProgressStorageKey(userKey);
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        completedSubtopics: Array.isArray(parsed.completedSubtopics) ? parsed.completedSubtopics : [],
        lastReadSubtopicId: parsed.lastReadSubtopicId || null,
        lastReadChapterId: parsed.lastReadChapterId || null,
        quizScores: parsed.quizScores && typeof parsed.quizScores === 'object' ? parsed.quizScores : {},
      };
    }
  } catch (e) {
    console.error('Failed to load user progress from localStorage', e);
  }
  return createEmptyProgress();
};

export const saveProgress = (progress: UserStudyProgress, userKey?: string | null): void => {
  try {
    const key = getProgressStorageKey(userKey);
    localStorage.setItem(key, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save user progress to localStorage', e);
  }
};

export const clearGuestProgress = (): void => {
  try {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}guest`);
  } catch (e) {
    // ignore
  }
};

export const toggleSubtopicComplete = (
  subtopicId: string,
  progress: UserStudyProgress,
  userKey?: string | null
): UserStudyProgress => {
  const isCompleted = progress.completedSubtopics.includes(subtopicId);
  const updatedCompleted = isCompleted
    ? progress.completedSubtopics.filter((id) => id !== subtopicId)
    : [...progress.completedSubtopics, subtopicId];

  const newProgress: UserStudyProgress = {
    ...progress,
    completedSubtopics: updatedCompleted,
  };
  saveProgress(newProgress, userKey);
  return newProgress;
};

export const recordLastRead = (
  chapterId: string,
  subtopicId: string,
  progress: UserStudyProgress,
  userKey?: string | null
): UserStudyProgress => {
  const newProgress: UserStudyProgress = {
    ...progress,
    lastReadChapterId: chapterId,
    lastReadSubtopicId: subtopicId,
  };
  saveProgress(newProgress, userKey);
  return newProgress;
};

export const recordQuizScore = (
  subtopicId: string,
  score: number,
  total: number,
  progress: UserStudyProgress,
  userKey?: string | null
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
  saveProgress(newProgress, userKey);
  return newProgress;
};
