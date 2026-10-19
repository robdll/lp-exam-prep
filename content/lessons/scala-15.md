# DSLs

Domain-specific languages embed a problem’s vocabulary in Scala syntax: fluent builders, implicit conversions, and infix ops make `portfolio buy 100 of "AAPL"` readable. LP exams focus on **internal DSLs** (embedded in Scala) using implicits, wrapper classes, and type classes—not full parser generators (see parser combinators lesson).

## By-name parameters and blocks

```scala
class QueryBuilder {
  def select(fields: => String): QueryBuilder = { /* ... */ this }
  def from(table: => String): QueryBuilder = this
}

new QueryBuilder select "name, age" from "users"
```

By-name `=>` lets callers use identifier-like tokens without extra commas if you design wrappers carefully.

> [!TIP] Scoping looks like English
> Exam graders check whether your DSL is **legal Scala** after desugaring—not magic syntax extensions.

## Implicit classes (extension syntax)

```scala
implicit class RichInt(val x: Int) extends AnyVal {
  def days: Duration = Duration(x, DAYS)
}

import scala.concurrent.duration._
val t = 3.days
```

Implicits convert `3` to `RichInt` to enable `.days`. Know **import scope** and **one implicit conversion** rule limits.

## Type classes (Scala 3 `given` / `using`)

```scala
trait Show[A]:
  def show(a: A): String

given Show[Int] with
  def show(a: Int) = a.toString

def printIt[A](a: A)(using s: Show[A]) = println(s.show(a))
```

Exams compare to OCaml modules and Haskell type classes: ad hoc polymorphism without inheritance.

| Approach | Mechanism | Exam risk |
|----------|-----------|-----------|
| Implicit class | syntax sugar | ambiguous implicits |
| Type class | instance search | orphan instances |
| Builder | mutable/finalize | fluent API typing |

> [!WARNING] Implicit ambiguity
> Two implicits for the same type → compile error. DSL design questions: “Add one implicit for `String` ops”—show you avoid clashes.

## Embedded control DSL (example)

```scala
case class Cmd(run: () => Unit)

def when(cond: Boolean)(blk: => Unit): Unit =
  if cond then blk

def repeat(n: Int)(blk: => Unit): Unit =
  (1 to n).foreach(_ => blk)

when(2 > 1) {
  repeat(2) { println("step") }
}
```

Expected output: two lines `step`. This is a **internal DSL** using normal functions and by-name blocks.

## DSL vs deep embedding

- **Shallow**: build Scala values (`Query(...)`)
- **Deep**: build AST nodes interpreted later (common with parser combinators + eval)

Exam short answer: shallow DSLs inherit Scala semantics; deep DSLs can reject ill-formed programs at construction time.

## Operator notation and infix chains

Scala allows method names like `::` and user-defined ops when used as infix:

```scala
case class Port(n: Int)
case class Host(name: String) {
  def on(p: Port): String = s"$name:${p.n}"
}

val url = Host("localhost") on Port(8080)
// "localhost:8080"
```

Chaining reads left-to-right; each call must return an object that exposes the next method. On exams, rewrite fluent chains into nested calls to verify types: `Host("x").on(Port(1))`.

> [!EXAM] Hygiene
> “Why not use strings for SQL?” — Injection, no static checks. DSL should compose values, not concatenate strings unchecked.

## Cross-language comparison

| Feature | Scala DSL | OCaml | Erlang |
|---------|-----------|-------|--------|
| Syntax extension | implicits, by-name | camlp4/ppx (mention) | macros limited |
| Safety | types + implicits | modules | runtime match |
| Typical use | builders, HTML | format strings, logs | config terms |

## Common pitfalls and exam traps

- **Overusing implicits** — resolution errors confuse graders and compilers.
- Forgetting **`import`** for implicit enrichments.
- DSL that **executes side effects** during building when only construction was intended.
- Confusing **Scala 2** `implicit def` with Scala 3 `given` syntax in the same answer.

> [!RECAP] Cheat sheet
> - Internal DSL = valid Scala + fluent API
> - `implicit class` / `given` for syntax and type classes
> - By-name params for `{ block }` syntax
> - Prefer shallow embedding unless AST required

## Further reading

- [Scala 3 Book — Contextual abstractions](https://docs.scala-lang.org/scala3/book/contextual-abstractions.html)
- [Tour of Scala — Implicit classes](https://docs.scala-lang.org/tour/implicit-conversions.html)
- [Scala docs — Type classes pattern](https://docs.scala-lang.org/scala3/book/types-of-types.html)
- [Real World OCaml — Camlp4/ppx note](https://dev.realworldocaml.org/) — external DSL contrast
