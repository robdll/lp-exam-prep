import Link from "next/link";
import { mockExams } from "@/data";

export default function MockExamsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <header>
        <h1 className="text-3xl font-bold">Mock exams</h1>
        <p className="text-muted-foreground">
          Each mock simulates the real exam: 4 hours, one OCaml + one Erlang + one Scala exercise.
          Use the timer, then self-grade with the 0–11 rubric (pass ≥ 6 per exercise).
        </p>
      </header>
      <ul className="space-y-4">
        {mockExams.map((m) => (
          <li key={m.id}>
            <Link
              href={`/mock-exams/${m.id}`}
              className="block rounded-xl border border-border bg-card p-5 hover:border-primary/40"
            >
              <h2 className="text-xl font-semibold">{m.title}</h2>
              <p className="text-sm text-muted-foreground">{m.description}</p>
              <p className="mt-2 text-xs text-muted-foreground">{m.durationHours}h timer · 3 exercises</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
