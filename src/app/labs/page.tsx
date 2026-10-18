import Link from "next/link";
import { labProblems } from "@/data";

export default function LabsPage() {
  const byLab = labProblems.reduce(
    (acc, p) => {
      const key = `Lab ${p.lab} (${p.track})`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(p);
      return acc;
    },
    {} as Record<string, typeof labProblems>
  );

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <header>
        <h1 className="text-3xl font-bold">Lab practice</h1>
        <p className="text-muted-foreground">
          All exercises from LP Lab sheets 01–06 (original prompts, exam-style solutions).
        </p>
      </header>
      {Object.entries(byLab).map(([group, problems]) => (
        <section key={group}>
          <h2 className="mb-3 text-lg font-semibold">{group}</h2>
          <ul className="space-y-2">
            {problems.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/labs/${p.id}`}
                  className="block rounded-lg border border-border px-4 py-3 hover:bg-muted/50"
                >
                  <span className="font-medium">
                    Ex. {p.number}: {p.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
