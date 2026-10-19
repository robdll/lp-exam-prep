import { cacheLife } from "next/cache";
import { createHighlighter, type Highlighter } from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

export function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: ["ocaml", "erlang", "scala", "bash", "text", "json"],
    });
  }
  return highlighterPromise;
}

export async function highlightCode(code: string, lang: string): Promise<string> {
  "use cache";
  cacheLife("max");
  const highlighter = await getHighlighter();
  const language = highlighter.getLoadedLanguages().includes(lang as never) ? lang : "text";
  return highlighter.codeToHtml(code.trimEnd(), {
    lang: language,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}
