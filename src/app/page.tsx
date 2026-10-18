import Link from "next/link";
import { lessons, labProblems, mockExams } from "@/data";

const tracks = [
  {
    slug: "ocaml",
    name: "OCaml",
    blurb: "λ-calculus, datatypes, modules, polymorphism, folds, graph DFS — midterm Oct 27, 2026.",
    lessons: 6,
    color: "from-amber-500/20 to-orange-600/10",
  },
  {
    slug: "erlang",
    name: "Erlang",
    blurb: "Sequential Erlang, actors, links/monitors, distribution, IRC-lite.",
    lessons: 5,
    color: "from-red-500/20 to-rose-600/10",
  },
  {
    slug: "scala",
    name: "Scala",
    blurb: "OO + FP, traits, linearization, DSLs, parser combinators.",
    lessons: 5,
    color: "from-emerald-500/20 to-teal-600/10",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-10">
      <section className="space-y-4 text-center sm:text-left">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">
          Linguaggi di Programmazione · Exam Jan 2027
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Prepare for the written computer exam
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Four hours, three exercises (OCaml, Erlang, Scala), each scored 0–11 with at least 6
          required. This site follows Prof. Walter Cazzola&apos;s lecture order with quizzes,
          lab-style drills, and timed mock exams.
        </p>
        <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
          <Link
            href="/study-plan"
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Open study plan
          </Link>
          <Link
            href="/mock-exams"
            className="rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted"
          >
            Mock exams ({mockExams.length})
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {tracks.map((t) => (
          <Link
            key={t.slug}
            href={`/${t.slug}`}
            className={`rounded-2xl border border-border bg-gradient-to-br ${t.color} p-5 transition hover:border-primary/40`}
          >
            <h2 className="text-xl font-semibold">{t.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.blurb}</p>
            <p className="mt-4 text-sm font-medium">{t.lessons} lessons →</p>
          </Link>
        ))}
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-2xl font-semibold">{lessons.length}</p>
          <p className="text-sm text-muted-foreground">Interactive lessons</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-2xl font-semibold">{labProblems.length}</p>
          <p className="text-sm text-muted-foreground">Lab sheet problems + solutions</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-2xl font-semibold">Monaco</p>
          <p className="text-sm text-muted-foreground">In-browser editor (run locally with ocaml/erl/scala-cli)</p>
        </div>
      </section>
    </div>
  );
}
