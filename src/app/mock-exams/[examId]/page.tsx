import { notFound } from "next/navigation";
import { MockExamView } from "@/components/mock-exam-view";
import { getMockExam, mockExams } from "@/data";

export function generateStaticParams() {
  return mockExams.map((m) => ({ examId: m.id }));
}

export default async function MockExamPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;
  const exam = getMockExam(examId);
  if (!exam) notFound();
  return <MockExamView exam={exam} />;
}
