import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LP Exam Prep | Linguaggi di Programmazione",
  description:
    "Interactive study guide for UniMi LP exam (OCaml, Erlang, Scala) — Prof. Walter Cazzola, January 2027.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
            Original summaries for study — course slides © Walter Cazzola / UniMi. Not affiliated.
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
