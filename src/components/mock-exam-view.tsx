"use client";

import { useEffect, useState } from "react";
import { CodeEditor } from "./code-editor";
import { saveMockSelfScores } from "@/lib/progress";
import type { MockExam } from "@/lib/types";
import { formatTrack } from "@/lib/utils";

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function MockExamView({ exam }: { exam: MockExam }) {
  const totalSeconds = exam.durationHours * 3600;
  const [remaining, setRemaining] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const [selfScores, setSelfScores] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!running || remaining <= 0) return;
    const t = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(t);
  }, [running, remaining]);

  function saveScores() {
    saveMockSelfScores(exam.id, selfScores);
    alert("Self-scores saved to progress (localStorage).");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">{exam.title}</h1>
        <p className="text-muted-foreground">{exam.description}</p>
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4">
          <div className="text-2xl font-mono font-semibold tabular-nums">
            {formatTime(remaining)}
          </div>
          <span className="text-sm text-muted-foreground">
            of {exam.durationHours}h exam window (written at computer, three exercises)
          </span>
          {!running ? (
            <button
              type="button"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              onClick={() => setRunning(true)}
            >
              Start timer
            </button>
          ) : (
            <button
              type="button"
              className="rounded-md border border-border px-4 py-2 text-sm"
              onClick={() => setRunning(false)}
            >
              Pause
            </button>
          )}
          {remaining === 0 && (
            <p className="w-full text-sm text-amber-600 dark:text-amber-400">
              Time is up — review solutions and self-grade (pass threshold: 6/11 per exercise).
            </p>
          )}
        </div>
      </header>

      {exam.exercises.map((ex, i) => (
        <section key={ex.id} className="space-y-4 rounded-xl border border-border bg-card p-5">
          <h2 className="text-lg font-semibold">
            Exercise {i + 1} — {formatTrack(ex.track)}: {ex.title}
          </h2>
          <p className="whitespace-pre-wrap text-sm text-muted-foreground">{ex.prompt}</p>
          <CodeEditor language={ex.language} value={ex.solution.split("\n").slice(0, 8).join("\n") + "\n(* your work here *)"} height={180} />
          <details className="space-y-2">
            <summary className="cursor-pointer text-sm font-medium">Hints</summary>
            <ul className="list-inside list-disc text-sm text-muted-foreground">
              {ex.hints.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </details>
          <details>
            <summary className="cursor-pointer text-sm font-medium">Model solution</summary>
            <div className="mt-2">
              <CodeEditor language={ex.language} value={ex.solution} readOnly height={220} />
            </div>
            <pre className="mt-2 text-xs text-muted-foreground">{ex.runInstructions}</pre>
          </details>
          <div className="space-y-2">
            <p className="text-sm font-medium">Self-grading rubric (0–11, need ≥6)</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {ex.rubric.map((r) => (
                <li key={r.score}>
                  <strong>{r.score}:</strong> {r.description}
                </li>
              ))}
            </ul>
            <label className="flex items-center gap-2 text-sm">
              Your score:
              <input
                type="number"
                min={0}
                max={11}
                className="w-16 rounded border border-border bg-background px-2 py-1"
                value={selfScores[ex.id] ?? ""}
                onChange={(e) =>
                  setSelfScores((s) => ({
                    ...s,
                    [ex.id]: Math.min(11, Math.max(0, Number(e.target.value) || 0)),
                  }))
                }
              />
            </label>
          </div>
        </section>
      ))}

      <button
        type="button"
        className="rounded-md bg-secondary px-4 py-2 text-sm font-medium"
        onClick={saveScores}
      >
        Save self-scores to progress
      </button>
    </div>
  );
}
