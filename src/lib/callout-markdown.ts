/** GitHub-style alerts: > [!TIP] Title\n> body */
const ALERT_RE = /^>\s*\[!(\w+)\]\s*(.*)$/;

export type ParsedCallout = { kind: string; title: string; lines: string[] };

export function parseAlertBlockquote(lines: string[]): ParsedCallout | null {
  if (lines.length === 0) return null;
  const first = lines[0].replace(/^>\s?/, "");
  const m = ALERT_RE.exec(first);
  if (!m) return null;
  const kind = m[1].toLowerCase();
  const title = m[2].trim();
  const bodyLines = lines.slice(1).map((l) => l.replace(/^>\s?/, ""));
  return { kind, title, lines: bodyLines };
}

export const calloutStyles: Record<
  string,
  { border: string; bg: string; label: string }
> = {
  tip: {
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/10",
    label: "Tip",
  },
  note: {
    border: "border-sky-500/40",
    bg: "bg-sky-500/10",
    label: "Note",
  },
  warning: {
    border: "border-amber-500/40",
    bg: "bg-amber-500/10",
    label: "Warning",
  },
  exam: {
    border: "border-primary/40",
    bg: "bg-primary/10",
    label: "Exam trap",
  },
  recap: {
    border: "border-violet-500/40",
    bg: "bg-violet-500/10",
    label: "Recap",
  },
};
