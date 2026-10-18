"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/types";
import { saveQuizScore } from "@/lib/progress";
import { cn } from "@/lib/utils";

export function QuizBlock({
  lessonId,
  questions,
}: {
  lessonId: string;
  questions: QuizQuestion[];
}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = questions.reduce(
    (acc, q) => acc + (answers[q.id] === q.correctIndex ? 1 : 0),
    0
  );

  function submit() {
    setSubmitted(true);
    saveQuizScore(lessonId, score, questions.length);
  }

  return (
    <section className="space-y-6 rounded-xl border border-border bg-card p-5">
      <h2 className="text-lg font-semibold">Quick quiz</h2>
      {questions.map((q, qi) => (
        <fieldset key={q.id} className="space-y-2">
          <legend className="text-sm font-medium">
            {qi + 1}. {q.prompt}
          </legend>
          <div className="flex flex-col gap-2">
            {q.options.map((opt, oi) => {
              const selected = answers[q.id] === oi;
              const show = submitted;
              const correct = oi === q.correctIndex;
              return (
                <label
                  key={opt}
                  className={cn(
                    "flex cursor-pointer items-start gap-2 rounded-md border px-3 py-2 text-sm",
                    selected && "border-primary bg-primary/5",
                    show && correct && "border-emerald-600/60 bg-emerald-500/10",
                    show && selected && !correct && "border-red-500/50 bg-red-500/10"
                  )}
                >
                  <input
                    type="radio"
                    name={q.id}
                    className="mt-1"
                    checked={selected}
                    disabled={submitted}
                    onChange={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                  />
                  <span>{opt}</span>
                </label>
              );
            })}
          </div>
          {submitted && (
            <p className="text-sm text-muted-foreground">{q.explanation}</p>
          )}
        </fieldset>
      ))}
      {!submitted ? (
        <button
          type="button"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
          disabled={Object.keys(answers).length < questions.length}
          onClick={submit}
        >
          Check answers
        </button>
      ) : (
        <p className="font-medium">
          Score: {score}/{questions.length} — saved to progress
        </p>
      )}
    </section>
  );
}
