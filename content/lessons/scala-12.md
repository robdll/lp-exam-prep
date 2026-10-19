# Scala Overview

Scala sits on the JVM as the LP course’s **multi-paradigm** counterpoint: functional collections and immutability, plus objects, traits, and pattern matching. Exams test interop with Java, `val` vs `var`, case classes, and how Scala 2/3 syntax differs on the surface while core concepts stay stable.

## Values, types, and inference

```scala
val x: Int = 41
val y = x + 1          // Int inferred

def id[A](a: A): A = a

val f: Int => Int = _ + 1
```

**`val`** is immutable binding; **`var`** is reassignable (avoid in functional solutions unless asked).

Methods vs functions:

```scala
def square(x: Int): Int = x * x
val sq: Int => Int = square _
```

> [!TIP] Expression-oriented syntax
> `if`, `match`, and blocks return values—no `return` required. Exam code should omit unnecessary `return`.

## Collections and higher-order methods

```scala
val xs = List(1, 2, 3)
val ys = xs.map(_ * 2).filter(_ > 2)
// List(4, 6)

val sum = xs.foldLeft(0)(_ + _)
```

Immutability by default: `map`/`filter` return new lists.

| OCaml | Scala |
|-------|-------|
| `List.map f xs` | `xs.map(f)` |
| `List.fold_left f z xs` | `xs.foldLeft(z)(f)` |
| `'a list` | `List[A]` |

## Case classes and pattern matching

```scala
case class Point(x: Double, y: Double)

def norm(p: Point): Double = p match {
  case Point(x, y) => math.hypot(x, y)
}
```

Case classes get structural equality, `copy`, and extractor patterns—exam staple for ADTs.

```scala
sealed trait Shape
case class Circle(r: Double) extends Shape
case class Rect(w: Double, h: Double) extends Shape

def area(s: Shape): Double = s match {
  case Circle(r) => math.Pi * r * r
  case Rect(w, h) => w * h
}
```

**Sealed** hierarchies enable exhaustivity checking (like OCaml variants).

> [!WARNING] Default case
> Wildcard `case _ =>` silences exhaustivity warnings—LP rubrics prefer explicit cases for sealed types.

## Objects, companions, and apply

```scala
object Point {
  def apply(x: Double, y: Double): Point = new Point(x, y)
}
```

Companion objects hold factory methods and implicits (advanced courses). `Point(1, 0)` desugars to `apply`.

## Interop and main entry

```scala
@main def hello(): Unit =
  println("LP exam ready")
```

Scala 3 `@main` replaces older `def main(args: Array[String])`. Know JVM types: `Int` maps to `int`, `Unit` to void.

> [!EXAM] Null and Option
> Java interop may expose `null`; idiomatic Scala uses `Option[A]`. Questions: “What is the type of `Some(1).map(_ + 1)`?” → `Option[Int]`.

## Three-language snapshot

| Topic | Scala | OCaml | Erlang |
|-------|-------|-------|--------|
| ADT | sealed + case class | variant | tagged tuples |
| Null safety | Option | option type | atoms / undefined |
| Concurrency | Futures, actors lib | sequential | processes |

## Common pitfalls and exam traps

- Confusing **`def`** (re-evaluated body) with **`val`** (once) in nested scopes.
- Using **`var`** where immutable fold solves the problem— loses functional style marks.
- **`==`** on case classes is structural; on arbitrary classes may be reference equality unless overridden.
- Mixing **Scala 2** and **3** syntax in one answer (`=>` vs `:` indentation rules).

> [!RECAP] Cheat sheet
> - `val` immutable, `case class` for ADTs
> - `match` for pattern matching
> - Collections: `map`, `filter`, `foldLeft`
> - Sealed traits for exhaustivity

## Further reading

- [Tour of Scala](https://docs.scala-lang.org/tour/tour-of-scala.html)
- [Scala 3 Book](https://docs.scala-lang.org/scala3/book/introduction.html)
- [Scala documentation hub](https://docs.scala-lang.org/)
- [Real World OCaml](https://dev.realworldocaml.org/) — functional ML baseline for comparison
