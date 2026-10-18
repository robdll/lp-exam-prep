export { lessons } from "./generated/lessons";
export { labProblems } from "./generated/labs";
export { mockExams } from "./generated/mock-exams";

import { lessons } from "./generated/lessons";
import { labProblems } from "./generated/labs";
import { mockExams } from "./generated/mock-exams";
import type { Language } from "@/lib/types";

export function getLessonsByTrack(track: Language) {
  return lessons.filter((l) => l.track === track).sort((a, b) => a.number - b.number);
}

export function getLesson(id: string) {
  return lessons.find((l) => l.id === id);
}

export function getLab(id: string) {
  return labProblems.find((l: (typeof labProblems)[number]) => l.id === id);
}

export function getMockExam(id: string) {
  return mockExams.find((m: (typeof mockExams)[number]) => m.id === id);
}
