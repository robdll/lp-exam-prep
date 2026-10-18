"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, BookOpen, FlaskConical, Timer, Calendar, BarChart3 } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home", icon: BookOpen },
  { href: "/study-plan", label: "Study plan", icon: Calendar },
  { href: "/ocaml", label: "OCaml", icon: null },
  { href: "/erlang", label: "Erlang", icon: null },
  { href: "/scala", label: "Scala", icon: null },
  { href: "/labs", label: "Labs", icon: FlaskConical },
  { href: "/mock-exams", label: "Mock exams", icon: Timer },
  { href: "/progress", label: "Progress", icon: BarChart3 },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight text-foreground">
          LP Exam Prep
          <span className="ml-2 hidden text-sm font-normal text-muted-foreground sm:inline">
            UniMi · Cazzola
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-1 text-sm">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-md px-2.5 py-1.5 transition-colors hover:bg-muted",
                pathname === href || (href !== "/" && pathname.startsWith(href))
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {label}
            </Link>
          ))}
          <button
            type="button"
            aria-label="Toggle theme"
            className="ml-1 rounded-md p-2 hover:bg-muted"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </nav>
      </div>
    </header>
  );
}
