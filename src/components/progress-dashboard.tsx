"use client";

import { useEffect, useState } from "react";
import { lessons, labProblems, mockExams } from "@/data";
import {
  loadProgress,
  resetProgress,
  defaultProgress,
  type ProgressState,
} from "@/lib/progress";

export function ProgressDashboard() {
  const [progress, setProgress] = useState<ProgressState>(defaultProgress);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const lessonPct = Math.round((progress.lessonsCompleted.length / lessons.length) * 100);
  const exPct = Math.round((progress.exercisesSolved.length / (lessons.length * 2)) * 100);

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <h1 className="text-3xl font-bold">Your progress</h1>
      <p className="text-muted-foreground">
        Stored in <code className="text-sm">localStorage</code> on this browser only.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard label="Lessons completed" value={`${progress.lessonsCompleted.length}/${lessons.length}`} sub={`${lessonPct}%`} />
        <StatCard label="Exercises marked solved" value={`${progress.exercisesSolved.length}`} sub={`~${exPct}% of lesson drills`} />
        <StatCard label="Lab problems available" value={`${labProblems.length}`} sub="Open Labs section" />
        <StatCard label="Quizzes taken" value={`${Object.keys(progress.quizScores).length}`} sub="Per lesson scores saved" />
      </div>

      <section className="rounded-xl border border-border p-4">
        <h2 className="font-semibold">Quiz scores</h2>
        {Object.keys(progress.quizScores).length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">No quizzes submitted yet.</p>
        ) : (
          <ul className="mt-2 space-y-1 text-sm">
            {Object.entries(progress.quizScores).map(([id, s]) => (
              <li key={id}>
                {id}: {s.score}/{s.total}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-xl border border-border p-4">
        <h2 className="font-semibold">Mock exam self-scores</h2>
        {Object.keys(progress.mockExamNotes).length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">No mock exams graded yet.</p>
        ) : (
          <ul className="mt-2 space-y-2 text-sm">
            {Object.entries(progress.mockExamNotes).map(([examId, note]) => (
              <li key={examId}>
                <strong>{examId}</strong>
                <ul className="ml-4 list-disc">
                  {Object.entries(note.selfScores).map(([exId, sc]) => (
                    <li key={exId}>
                      {exId}: {sc}/11 {sc >= 6 ? "✓ pass" : "✗ below 6"}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </section>

      <button
        type="button"
        className="rounded-md border border-red-500/50 px-4 py-2 text-sm text-red-600 hover:bg-red-500/10 dark:text-red-400"
        onClick={() => {
          if (confirm("Reset all progress?")) {
            resetProgress();
            setProgress(defaultProgress);
          }
        }}
      >
        Reset progress
      </button>
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}
