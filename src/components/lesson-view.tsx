"use client";

import Link from "next/link";
import { MarkdownContent } from "./markdown-content";
import { QuizBlock } from "./quiz-block";
import { ExerciseBlock } from "./exercise-block";
import { CodeEditor } from "./code-editor";
import { markLessonComplete } from "@/lib/progress";
import type { Lesson } from "@/lib/types";
import { formatTrack } from "@/lib/utils";

export function LessonView({
  lesson,
  prevId,
  nextId,
}: {
  lesson: Lesson;
  prevId?: string;
  nextId?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          {formatTrack(lesson.track)} · Lesson {lesson.number}
          {lesson.italianTitle ? ` · ${lesson.italianTitle}` : ""}
        </p>
        <h1 className="text-3xl font-bold tracking-tight">{lesson.title}</h1>
        <p className="text-muted-foreground">{lesson.summary}</p>
        <button
          type="button"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          onClick={() => markLessonComplete(lesson.id)}
        >
          Mark lesson complete
        </button>
      </div>

      <MarkdownContent content={lesson.content} />

      {lesson.codeExamples.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Code examples</h2>
          {lesson.codeExamples.map((ex) => (
            <div key={ex.title}>
              <p className="mb-2 text-sm font-medium">{ex.title}</p>
              <CodeEditor language={ex.language} value={ex.code} readOnly height={160} />
            </div>
          ))}
        </section>
      )}

      <QuizBlock lessonId={lesson.id} questions={lesson.quiz} />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Exam-style exercises</h2>
        {lesson.exercises.map((ex) => (
          <ExerciseBlock key={ex.id} exercise={ex} />
        ))}
      </section>

      {lesson.labRefs && lesson.labRefs.length > 0 && (
        <section className="rounded-xl border border-border bg-muted/30 p-4">
          <h2 className="font-semibold">Related lab problems</h2>
          <ul className="mt-2 list-inside list-disc text-sm">
            {lesson.labRefs.map((id) => (
              <li key={id}>
                <Link href={`/labs/${id}`} className="text-primary underline-offset-2 hover:underline">
                  {id}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav className="flex justify-between border-t border-border pt-6 text-sm">
        {prevId ? (
          <Link href={`/learn/${lesson.track}/${prevId}`} className="text-primary hover:underline">
            ← Previous
          </Link>
        ) : (
          <span />
        )}
        {nextId ? (
          <Link href={`/learn/${lesson.track}/${nextId}`} className="text-primary hover:underline">
            Next →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
