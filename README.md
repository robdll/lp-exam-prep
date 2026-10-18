# LP Exam Prep — Linguaggi di Programmazione

Interactive study site for the **Linguaggi di Programmazione** written exam (Prof. Walter Cazzola, University of Milan), aligned with the 2025–26 course topic order: OCaml (lectures 1–6), Erlang (7–11), Scala (12–16), plus Lab 01–06.

**Exam format:** 4 hours at the computer, three exercises (OCaml, Erlang, Scala), each graded 0–11 (minimum 6 per exercise).

## Features

- 16 lessons with summaries, code examples, quizzes, and exam-style exercises (hints + revealable solutions)
- 35 lab-sheet practice problems with solutions
- 3 timed mock exams (4-hour timer) with self-grading rubrics
- Study plan (OCaml → midterm Oct 2026, Erlang Nov, Scala Dec, mocks Jan)
- Progress tracking in `localStorage`
- Monaco editor with OCaml, Erlang, and Scala syntax highlighting
- Dark / light mode, mobile-friendly layout

Course PDFs are **not** included in this repo (copyright). Content is original English summaries derived from public lab sheets and lecture outlines.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port you choose).

### Running code locally

The editor does not execute code in the browser. Use:

| Language | Tool |
|----------|------|
| OCaml | `utop` or `ocaml` |
| Erlang | `erl` then `c(module).` |
| Scala | `scala-cli run file.scala` |

Regenerate embedded content after editing `scripts/generate-content.mjs`:

```bash
node scripts/generate-content.mjs
```

## Deploy on Vercel

1. Push this repository to GitHub (or connect your Vercel Git integration).
2. Import the project in [Vercel](https://vercel.com/new).
3. Framework preset: **Next.js** (defaults are fine).
4. Build command: `npm run build` · Output: Next.js default.
5. No environment variables required (static/SSG pages, no backend).

Alternatively:

```bash
npx vercel
```

## Project structure

```
src/
  app/                 # Next.js App Router pages
  components/          # UI, Monaco, quiz, exercises
  data/generated/      # Lessons, labs, mock exams (generated TS)
  lib/                 # Types, progress (localStorage), utils
scripts/
  generate-content.mjs # Content generator from course outline
```

## License

Study materials and UI code in this repository are provided for personal exam preparation. Course slides remain the property of the instructor and UniMi.
