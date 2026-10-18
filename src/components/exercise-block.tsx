"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { CodeEditor } from "./code-editor";
import { toggleExerciseSolved } from "@/lib/progress";
import type { CodingExercise } from "@/lib/types";

export function ExerciseBlock({ exercise }: { exercise: CodingExercise }) {
  const [code, setCode] = useState(exercise.starterCode);
  const [hintIndex, setHintIndex] = useState(-1);
  const [showSolution, setShowSolution] = useState(false);
  const [solved, setSolved] = useState(false);

  function markSolved() {
    toggleExerciseSolved(exercise.id);
    setSolved(true);
  }

  return (
    <article className="space-y-4 rounded-xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-semibold">{exercise.title}</h3>
        {solved && (
          <span className="inline-flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" /> Marked solved
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{exercise.prompt}</p>
      <CodeEditor language={exercise.language} value={code} onChange={setCode} height={200} />
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted"
          onClick={() => setHintIndex((i) => Math.min(i + 1, exercise.hints.length - 1))}
          disabled={hintIndex >= exercise.hints.length - 1}
        >
          Next hint ({hintIndex + 1}/{exercise.hints.length})
        </button>
        <button
          type="button"
          className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted"
          onClick={() => setShowSolution((s) => !s)}
        >
          {showSolution ? "Hide" : "Reveal"} model solution
        </button>
        <button
          type="button"
          className="rounded-md bg-secondary px-3 py-1.5 text-sm font-medium hover:opacity-90"
          onClick={markSolved}
        >
          Mark as solved
        </button>
      </div>
      {hintIndex >= 0 && (
        <ul className="list-inside list-disc text-sm text-muted-foreground">
          {exercise.hints.slice(0, hintIndex + 1).map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
      {showSolution && (
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Model solution
          </p>
          <CodeEditor
            language={exercise.language}
            value={exercise.solution}
            readOnly
            height={Math.min(320, 80 + exercise.solution.split("\n").length * 18)}
          />
        </div>
      )}
      <details className="rounded-md border border-dashed border-border p-3 text-sm">
        <summary className="cursor-pointer font-medium">Run locally</summary>
        <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-muted-foreground">
          {exercise.runInstructions}
        </pre>
      </details>
    </article>
  );
}
