# Parser Combinators

Parser combinators describe grammars as composable functions `Parser[T]`, typically using alternation, sequencing, and repetition—ideal for LP exam questions on recursive descent without hand-rolled lexer state. Scala’s `scala-parser-combinators` library (and similar APIs) maps directly to formal grammar rules.

## Parser type and basic combinators

Conceptual signature:

```scala
type Parser[+T] = Input => ParseResult[T]
```

In practice you import library helpers:

```scala
import scala.util.parsing.combinator._

object Arith extends JavaTokenParsers {
  def expr: Parser[Int] = term ~ rep("+" ~ term | "-" ~ term) ^^ {
    case t ~ ops =>
      ops.foldLeft(t) {
        case acc, "+" ~ x => acc + x
        case acc, "-" ~ x => acc - x
      }
  }
  def term: Parser[Int] = wholeNumber.map(_.toInt)
}
```

Parse with `parseAll`:

```scala
import Arith._
parseAll(expr, "1+2+3")   // Success(6, ...)
```

> [!TIP] `^^` is map
> `p ^^ f` transforms result; `~` sequences; `|` alternates. Know these operators for written exams even if your course uses Scala 3 combinator variants.

## Sequencing and repetition

```scala
def ident: Parser[String] = """[a-z]+""".r
def listOfNums: Parser[List[Int]] =
  repsep(wholeNumber.map(_.toInt), ",")
```

- **`rep`** — zero or more
- **`repsep`** — separated list
- **`opt`** — optional

```scala
parseAll(listOfNums, "1,2,3")   // List(1, 2, 3)
```

> [!WARNING] Left recursion
> Naive `expr = expr ~ term` loops forever. Use classic factoring: `expr = term ~ rep(op ~ term)` as above.

## Lexer integration

`JavaTokenParsers` skips whitespace and provides `ident`, `wholeNumber`. Custom tokens:

```scala
def boolLit: Parser[Boolean] = "true" ^^^ true | "false" ^^^ false
```

`^^^` replaces result with constant.

## Error reporting (exam level)

Combinators return `Failure` with message and position. Improving errors (label, `failure` map) may appear as bonus—know that **backtracking** from `|` can hide good error messages unless using committed choice (`|||`) in some libraries.

| Combinator | Meaning |
|------------|---------|
| `p | q` | try p, else q |
| `p ~ q` | p then q, pair results |
| `p ^^ f` | map success value |
| `rep(p)` | list of p |

> [!EXAM] Grammar to combinator
> Given `S -> aSb | ε`, write `def s: Parser[String] = ...` using recursion—expect base case `""` or `success("")`.

## Mini expression language

```scala
sealed trait Exp
case class Num(n: Int) extends Exp
case class Add(l: Exp, r: Exp) extends Exp

def num: Parser[Exp] = wholeNumber.map(n => Num(n.toInt))
def parens: Parser[Exp] = "(" ~> expr <~ ")"
def factor: Parser[Exp] = num | parens
def expr: Parser[Exp] =
  factor ~ rep("+" ~ factor) ^^ {
    case x ~ rest =>
      rest.foldLeft(x) { case (acc, "+" ~ y) => Add(acc, y) }
  }
```

`~>` / `<~` discard a side of sequence—keep only the meaningful AST part.

## Cross-language comparison

| Tooling | Scala | OCaml | Erlang |
|---------|-------|-------|--------|
| Combinators | scala-parser-combinators | menhir, angstrom | leex/yecc |
| AST | case classes | variants | tuples |
| Whitespace | token parsers | lexer modules | yecc tokens |

## Common pitfalls and exam traps

- **Left-recursive** rules without factoring.
- Forgetting **`map`/`^^` arity** — parser returns `String` but AST needs `Int`.
- **`rep` greedy** consumption leaving trailing input—use `end` or `parseAll` vs `parse`.
- Mixing **regex parsers** with token parsers inconsistently (spaces).

> [!RECAP] Cheat sheet
> - Factor recursion: `term ~ rep(op ~ term)`
> - `~` sequence, `|` choice, `^^` map
> - `rep` / `repsep` for lists
> - Build AST with case classes

## Further reading

- [Scala Parser Combinators documentation](https://github.com/scala/scala-parser-combinators)
- [Tour of Scala — For comprehensions (related composition)](https://docs.scala-lang.org/tour/for-comprehensions.html)
- [Scala docs — StringContext and parsing context](https://docs.scala-lang.org/overviews/core/string-context.html)
- [Real World OCaml — Parsing (Menhir)](https://dev.realworldocaml.org/parsing-with-ocamllex-and-menhir.html)
- [Learn You Some Erlang — leex and yecc](https://learnyousomeerlang.com/core-otp-modules)
