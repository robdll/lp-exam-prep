export type Language = "ocaml" | "erlang" | "scala";

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type CodingExercise = {
  id: string;
  title: string;
  prompt: string;
  starterCode: string;
  language: Language;
  hints: string[];
  solution: string;
  runInstructions: string;
};

export type Lesson = {
  id: string;
  track: Language;
  number: number;
  title: string;
  italianTitle?: string;
  summary: string;
  /** Lesson body lives in content/lessons/{id}.md — omitted from generated bundle. */
  content?: string;
  quiz: QuizQuestion[];
  exercises: CodingExercise[];
  labRefs?: string[];
};

export type LabProblem = {
  id: string;
  lab: number;
  track: Language;
  number: number;
  title: string;
  prompt: string;
  language: Language;
  hints: string[];
  solution: string;
  runInstructions: string;
};

export type MockExamExercise = {
  id: string;
  track: Language;
  title: string;
  prompt: string;
  language: Language;
  rubric: { score: number; description: string }[];
  hints: string[];
  solution: string;
  runInstructions: string;
};

export type MockExam = {
  id: string;
  title: string;
  description: string;
  durationHours: number;
  exercises: [MockExamExercise, MockExamExercise, MockExamExercise];
};

export type ProgressState = {
  lessonsCompleted: string[];
  quizScores: Record<string, { score: number; total: number; at: string }>;
  exercisesSolved: string[];
  mockExamNotes: Record<string, { selfScores: Record<string, number>; at: string }>;
};
