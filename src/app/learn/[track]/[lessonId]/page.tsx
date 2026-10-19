import { notFound } from "next/navigation";
import { LessonView } from "@/components/lesson-view";
import { MarkdownContent } from "@/components/markdown-content";
import { getLesson, getLessonsByTrack, lessons } from "@/data";
import { extractHeadings, loadLessonMarkdown } from "@/lib/lesson-markdown";
import { prepareLessonMarkdown } from "@/lib/render-lesson-markdown";
import type { Language } from "@/lib/types";

const tracks: Language[] = ["ocaml", "erlang", "scala"];

export function generateStaticParams() {
  return lessons.map((l) => ({ track: l.track, lessonId: l.id }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ track: string; lessonId: string }>;
}) {
  const { track, lessonId } = await params;
  if (!tracks.includes(track as Language)) notFound();

  const lesson = getLesson(lessonId);
  if (!lesson || lesson.track !== track) notFound();

  const trackLessons = getLessonsByTrack(track as Language);
  const idx = trackLessons.findIndex((l) => l.id === lessonId);

  const rawMd = loadLessonMarkdown(lessonId);
  const headings = extractHeadings(rawMd);
  const renderedMd = await prepareLessonMarkdown(rawMd);

  const { content: _omit, ...lessonMeta } = lesson;

  return (
    <LessonView
      lesson={lessonMeta}
      headings={headings}
      prevId={idx > 0 ? trackLessons[idx - 1].id : undefined}
      nextId={idx < trackLessons.length - 1 ? trackLessons[idx + 1].id : undefined}
    >
      <MarkdownContent content={renderedMd} />
    </LessonView>
  );
}
