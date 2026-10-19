"use client";

import type { TocHeading } from "@/lib/lesson-markdown";

export function LessonToc({ headings }: { headings: TocHeading[] }) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page" className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto text-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        On this page
      </p>
      <ul className="space-y-2 border-l border-border pl-3">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-3" : undefined}>
            <a
              href={`#${h.id}`}
              className="block text-muted-foreground transition-colors hover:text-foreground"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
