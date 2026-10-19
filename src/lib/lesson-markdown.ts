import fs from "fs";
import path from "path";

export type TocHeading = { id: string; text: string; level: 2 | 3 };

const contentDir = path.join(process.cwd(), "content/lessons");

export function loadLessonMarkdown(lessonId: string): string {
  const filePath = path.join(contentDir, `${lessonId}.md`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing lesson markdown: ${filePath}`);
  }
  return fs.readFileSync(filePath, "utf-8");
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Extract h2/h3 headings for table of contents (skips fenced code blocks). */
export function extractHeadings(markdown: string): TocHeading[] {
  const headings: TocHeading[] = [];
  let inFence = false;

  for (const line of markdown.split("\n")) {
    if (line.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) continue;
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/\*\*/g, "").trim();
    headings.push({ id: slugifyHeading(text), text, level });
  }

  return headings;
}
