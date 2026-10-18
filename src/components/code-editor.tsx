"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const Monaco = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const LANG_MAP = {
  ocaml: "ocaml",
  erlang: "erlang",
  scala: "scala",
} as const;

export function CodeEditor({
  language,
  value,
  onChange,
  height = 220,
  readOnly = false,
}: {
  language: keyof typeof LANG_MAP;
  value: string;
  onChange?: (v: string) => void;
  height?: number;
  readOnly?: boolean;
}) {
  const { resolvedTheme } = useTheme();

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Monaco
        height={height}
        language={LANG_MAP[language]}
        theme={resolvedTheme === "light" ? "vs-light" : "vs-dark"}
        value={value}
        onChange={(v) => onChange?.(v ?? "")}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 13,
          scrollBeyondLastLine: false,
          wordWrap: "on",
          padding: { top: 12 },
        }}
      />
    </div>
  );
}
