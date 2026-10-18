"use client";

import { useState } from "react";
import { CodeEditor } from "./code-editor";
import { toggleExerciseSolved } from "@/lib/progress";
import type { LabProblem } from "@/lib/types";

export function LabProblemView({ problem }: { problem: LabProblem }) {
  const [hintIndex, setHintIndex] = useState(-1);
  const [showSolution, setShowSolution] = useState(false);

  return (
    <article className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <header className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Lab {problem.lab} · {problem.track} · Exercise {problem.number}
        </p>
        <h1 className="text-3xl font-bold">{problem.title}</h1>
      </header>
      <p className="whitespace-pre-wrap text-muted-foreground">{problem.prompt}</p>
      <CodeEditor
        language={problem.language}
        value={`(* ${problem.id} — your solution *)\n`}
        height={200}
      />
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted"
          onClick={() => setHintIndex((i) => Math.min(i + 1, problem.hints.length - 1))}
        >
          Next hint
        </button>
        <button
          type="button"
          className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted"
          onClick={() => setShowSolution((s) => !s)}
        >
          {showSolution ? "Hide" : "Show"} solution
        </button>
        <button
          type="button"
          className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground"
          onClick={() => toggleExerciseSolved(problem.id)}
        >
          Mark solved
        </button>
      </div>
      {hintIndex >= 0 && (
        <ul className="list-inside list-disc text-sm text-muted-foreground">
          {problem.hints.slice(0, hintIndex + 1).map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
      {showSolution && (
        <CodeEditor language={problem.language} value={problem.solution} readOnly height={240} />
      )}
      <pre className="rounded-md border border-dashed border-border p-3 text-xs text-muted-foreground whitespace-pre-wrap">
        {problem.runInstructions}
      </pre>
    </article>
  );
}
