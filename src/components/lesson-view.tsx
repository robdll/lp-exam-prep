"use client";

import Link from "next/link";
import { QuizBlock } from "./quiz-block";
import { ExerciseBlock } from "./exercise-block";
import { LessonToc } from "./lesson-toc";
import { markLessonComplete } from "@/lib/progress";
import type { Lesson } from "@/lib/types";
import type { TocHeading } from "@/lib/lesson-markdown";
import { formatTrack } from "@/lib/utils";

export function LessonView({
  lesson,
  prevId,
  nextId,
  headings,
  children,
}: {
  lesson: Omit<Lesson, "content">;
  prevId?: string;
  nextId?: string;
  headings: TocHeading[];
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 lg:py-10">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_15rem] xl:gap-12">
        <div className="min-w-0 space-y-10">
          <header className="space-y-3 border-b border-border pb-8">
            <p className="text-sm text-muted-foreground">
              Lesson {lesson.number} · {formatTrack(lesson.track)}
              {lesson.italianTitle ? ` · ${lesson.italianTitle}` : ""}
            </p>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{lesson.title}</h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{lesson.summary}</p>
            <button
              type="button"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              onClick={() => markLessonComplete(lesson.id)}
            >
              Mark lesson complete
            </button>
          </header>

          <div className="max-w-3xl">{children}</div>

          <QuizBlock lessonId={lesson.id} questions={lesson.quiz} />

          <section className="max-w-3xl space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Exam-style drills</h2>
            <p className="text-sm text-muted-foreground">
              Write solutions in the editor, then compare with the reference. These mirror the kind of small
              programs the written exam expects.
            </p>
            {lesson.exercises.map((ex) => (
              <ExerciseBlock key={ex.id} exercise={ex} />
            ))}
          </section>

          {lesson.labRefs && lesson.labRefs.length > 0 && (
            <section className="max-w-3xl rounded-xl border border-border bg-muted/30 p-5">
              <h2 className="font-semibold">Related lab problems</h2>
              <ul className="mt-2 list-inside list-disc text-sm">
                {lesson.labRefs.map((id) => (
                  <li key={id}>
                    <Link
                      href={`/labs/${id}`}
                      className="text-primary underline-offset-2 hover:underline"
                    >
                      {id}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <nav className="flex flex-wrap justify-between gap-4 border-t border-border pt-8 text-sm">
            {prevId ? (
              <Link
                href={`/learn/${lesson.track}/${prevId}`}
                className="font-medium text-primary hover:underline"
              >
                ← Previous lesson
              </Link>
            ) : (
              <span />
            )}
            {nextId ? (
              <Link
                href={`/learn/${lesson.track}/${nextId}`}
                className="font-medium text-primary hover:underline"
              >
                Next lesson →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>

        <aside className="hidden lg:block">
          <LessonToc headings={headings} />
        </aside>
      </div>
    </div>
  );
}
