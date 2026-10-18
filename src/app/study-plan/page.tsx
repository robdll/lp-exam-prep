import Link from "next/link";

const phases = [
  {
    when: "Now → Oct 27, 2026",
    title: "OCaml sprint (midterm)",
    focus: "Lessons 1–6, Lab 01–02, daily quizzes",
    href: "/ocaml",
    urgent: true,
  },
  {
    when: "November 2026",
    title: "Erlang & concurrency",
    focus: "Lessons 7–11, Lab 03–04, process rings & master-slave",
    href: "/erlang",
  },
  {
    when: "December 2026",
    title: "Scala & DSLs",
    focus: "Lessons 12–16, Lab 05–06, traits + parser combinators",
    href: "/scala",
  },
  {
    when: "January 2027",
    title: "Mock exams & review",
    focus: "Three 4-hour mocks, self-grade ≥6/11 per language, weak-topic drills",
    href: "/mock-exams",
  },
];

export default function StudyPlanPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold">Study plan</h1>
        <p className="mt-2 text-muted-foreground">
          Suggested pacing for the January 2027 written exam at the computer. Adjust to your
          midterm replacements (each language midterm can replace one exam exercise if passed).
        </p>
      </div>

      <ol className="relative space-y-6 border-l border-border pl-6">
        {phases.map((p) => (
          <li key={p.title} className="relative">
            <span
              className={`absolute -left-[1.6rem] top-1 h-3 w-3 rounded-full ${p.urgent ? "bg-amber-500" : "bg-primary"}`}
            />
            <p className="text-sm font-medium text-muted-foreground">{p.when}</p>
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p className="text-sm text-muted-foreground">{p.focus}</p>
            <Link href={p.href} className="mt-2 inline-block text-sm text-primary hover:underline">
              Go to track →
            </Link>
          </li>
        ))}
      </ol>

      <section className="rounded-xl border border-border bg-muted/30 p-5 text-sm">
        <h2 className="font-semibold">Weekly checklist</h2>
        <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
          <li>Complete 1–2 lessons (read + quiz + 2 exercises)</li>
          <li>Solve 1 lab problem without peeking at hints first</li>
          <li>Re-run one exercise in utop / erl / scala-cli to build muscle memory</li>
          <li>Track progress on the Progress page (localStorage)</li>
        </ul>
      </section>
    </div>
  );
}
