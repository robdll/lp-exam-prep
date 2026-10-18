import type { ProgressState } from "./types";

export type { ProgressState };

const STORAGE_KEY = "lp-exam-prep-progress-v1";

export const defaultProgress: ProgressState = {
  lessonsCompleted: [],
  quizScores: {},
  exercisesSolved: [],
  mockExamNotes: {},
};

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(state: ProgressState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function markLessonComplete(lessonId: string): ProgressState {
  const current = loadProgress();
  if (current.lessonsCompleted.includes(lessonId)) return current;
  const next = {
    ...current,
    lessonsCompleted: [...current.lessonsCompleted, lessonId],
  };
  saveProgress(next);
  return next;
}

export function saveQuizScore(
  lessonId: string,
  score: number,
  total: number
): ProgressState {
  const current = loadProgress();
  const next = {
    ...current,
    quizScores: {
      ...current.quizScores,
      [lessonId]: { score, total, at: new Date().toISOString() },
    },
  };
  saveProgress(next);
  return next;
}

export function toggleExerciseSolved(exerciseId: string): ProgressState {
  const current = loadProgress();
  const exists = current.exercisesSolved.includes(exerciseId);
  const next = {
    ...current,
    exercisesSolved: exists
      ? current.exercisesSolved.filter((id) => id !== exerciseId)
      : [...current.exercisesSolved, exerciseId],
  };
  saveProgress(next);
  return next;
}

export function saveMockSelfScores(
  examId: string,
  selfScores: Record<string, number>
): ProgressState {
  const current = loadProgress();
  const next = {
    ...current,
    mockExamNotes: {
      ...current.mockExamNotes,
      [examId]: { selfScores, at: new Date().toISOString() },
    },
  };
  saveProgress(next);
  return next;
}

export function resetProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
