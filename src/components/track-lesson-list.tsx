import Link from "next/link";
import type { Language } from "@/lib/types";
import { getLessonsByTrack } from "@/data";
import { formatTrack } from "@/lib/utils";

export function TrackLessonList({ track }: { track: Language }) {
  const items = getLessonsByTrack(track);

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <header>
        <h1 className="text-3xl font-bold">{formatTrack(track)} track</h1>
        <p className="text-muted-foreground">{items.length} lessons in course order</p>
      </header>
      <ol className="space-y-3">
        {items.map((l) => (
          <li key={l.id}>
            <Link
              href={`/learn/${track}/${l.id}`}
              className="block rounded-xl border border-border bg-card p-4 hover:border-primary/50"
            >
              <span className="text-xs text-muted-foreground">Lesson {l.number}</span>
              <h2 className="font-semibold">{l.title}</h2>
              <p className="text-sm text-muted-foreground line-clamp-2">{l.summary}</p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
