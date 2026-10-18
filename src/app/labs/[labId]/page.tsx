import { notFound } from "next/navigation";
import { LabProblemView } from "@/components/lab-problem-view";
import { getLab, labProblems } from "@/data";

export function generateStaticParams() {
  return labProblems.map((p) => ({ labId: p.id }));
}

export default async function LabProblemPage({
  params,
}: {
  params: Promise<{ labId: string }>;
}) {
  const { labId } = await params;
  const problem = getLab(labId);
  if (!problem) notFound();
  return <LabProblemView problem={problem} />;
}
