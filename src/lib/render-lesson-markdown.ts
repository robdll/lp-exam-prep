import { cacheLife } from "next/cache";
import { highlightCode } from "@/lib/shiki-highlighter";

const FENCE_RE = /```(\w*)\n([\s\S]*?)```/g;
const ALERT_BLOCK_RE = /^>\s*\[!(\w+)\]\s*(.*)\n((?:> ?.*\n?)*)/gm;

function calloutHtml(kind: string, title: string, body: string): string {
  const label = title || kind;
  const paragraphs = body
    .split("\n")
    .map((l) => l.replace(/^>\s?/, "").trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("");
  return `<aside data-callout="${kind.toLowerCase()}" data-title="${escapeHtml(label)}">${paragraphs}</aside>\n\n`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function preprocessAlertCallouts(markdown: string): string {
  return markdown.replace(ALERT_BLOCK_RE, (_, kind, title, rest) => {
    return calloutHtml(kind, title.trim(), rest);
  });
}

export async function preprocessCodeFences(markdown: string): Promise<string> {
  const parts: string[] = [];
  let last = 0;
  const matches = [...markdown.matchAll(FENCE_RE)];

  for (const m of matches) {
    const [full, lang, code] = m;
    const index = m.index ?? 0;
    parts.push(markdown.slice(last, index));
    const language = lang || "text";
    const html = await highlightCode(code, language);
    parts.push(
      `<figure data-code-lang="${language}"><figcaption>${language}</figcaption>${html}</figure>\n\n`
    );
    last = index + full.length;
  }
  parts.push(markdown.slice(last));
  return parts.join("");
}

export async function prepareLessonMarkdown(raw: string): Promise<string> {
  "use cache";
  cacheLife("max");
  let md = preprocessAlertCallouts(raw);
  md = await preprocessCodeFences(md);
  return md;
}
