import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { calloutStyles } from "@/lib/callout-markdown";
import { slugifyHeading } from "@/lib/lesson-markdown";
import type { Components } from "react-markdown";

function CalloutBlock({ kind, title, children }: { kind: string; title: string; children: React.ReactNode }) {
  const style = calloutStyles[kind] ?? calloutStyles.note;
  const label = title || style.label;
  return (
    <aside
      className={`not-prose my-6 rounded-lg border-l-4 px-4 py-3 ${style.border} ${style.bg}`}
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="prose prose-neutral dark:prose-invert max-w-none text-sm prose-p:my-2">{children}</div>
    </aside>
  );
}

const components: Components = {
  h2({ children }) {
    const text = String(children);
    return (
      <h2 id={slugifyHeading(text)} className="scroll-mt-24 text-xl font-semibold tracking-tight md:text-2xl">
        {children}
      </h2>
    );
  },
  h3({ children }) {
    const text = String(children);
    return (
      <h3 id={slugifyHeading(text)} className="scroll-mt-24 text-lg font-semibold tracking-tight">
        {children}
      </h3>
    );
  },
  table({ children }) {
    return (
      <div className="not-prose my-6 overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[480px] border-collapse text-sm">{children}</table>
      </div>
    );
  },
  th({ children }) {
    return (
      <th className="border-b border-border bg-muted/50 px-3 py-2 text-left font-semibold">{children}</th>
    );
  },
  td({ children }) {
    return <td className="border-b border-border px-3 py-2 align-top">{children}</td>;
  },
  figure({ node, children }) {
    const lang = node?.properties?.dataCodeLang as string | undefined;
    return (
      <figure className="not-prose my-6 overflow-hidden rounded-lg border border-border">
        {lang && lang !== "text" && (
          <figcaption className="border-b border-border bg-muted/60 px-3 py-1.5 font-mono text-xs text-muted-foreground">
            {lang}
          </figcaption>
        )}
        <div className="shiki-wrap overflow-x-auto p-4 text-sm [&_.shiki]:!bg-transparent [&_.shiki]:m-0">
          {children}
        </div>
      </figure>
    );
  },
  aside({ node, children }) {
    const kind = String(node?.properties?.dataCallout ?? "note");
    const title = String(node?.properties?.dataTitle ?? "");
    return (
      <CalloutBlock kind={kind} title={title}>
        {children}
      </CalloutBlock>
    );
  },
  code({ className, children }) {
    if (className) return <code className={className}>{children}</code>;
    return (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-foreground">
        {children}
      </code>
    );
  },
};

export function MarkdownContent({ content }: { content: string }) {
  return (
    <article className="lesson-prose prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-p:leading-relaxed prose-p:text-[1.05rem] prose-li:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
