# Advanced OO & Linearization

When a class mixes several traits that override the same method, Scala resolves calls using **linearization**: a total order of types from the instance class toward `AnyRef`. LP exams ask you to compute that order, predict `super` targets, and debug initialization quirks in diamond-shaped hierarchies.

## Class linearization algorithm (exam version)

For `class C extends A with B with D`:

1. Start with `C, D, B, A` (class, then traits **right to left**, each trait’s own supers recursively, dedupe keeping first occurrence).
2. Append `AnyRef, Any` (for reference types).

Example:

```scala
class Base { def msg = "base" }
trait T1 extends Base { override def msg = "t1" }
trait T2 extends Base { override def msg = "t2" }
class C extends Base with T1 with T2
```

Linearization of `C`: `C, T2, T1, Base, AnyRef, Any`. Runtime dispatch on `msg` picks **T2** (first in order defining override).

> [!TIP] Draw the graph
> On paper, list traits from left to right in the `with` clause, then expand each trait’s parents. Remove duplicates from the left.

## super and nested traits

```scala
trait A { def f = "A" }
trait B extends A { override def f = "B" + super.f }
trait C extends A { override def f = "C" + super.f }
class D extends A with B with C

new D().f   // "CB" + ??? — compute: C calls super → B, B calls super → A
```

Trace: `C.f` runs, `super.f` is `B.f` → `"B" + super.f` → `"BA"`, prefixed by `C` → `"CBA"` if C wraps as `"C" + super.f`. **Write the exact concatenation** the exam snippet uses.

> [!WARNING] Not Java default methods only
> Scala linearization applies to all overrides; do not assume Java 8 interface defaults unless mixing Java interfaces explicitly.

## Initialization order

Fields initialize **before** subclass bodies, in linearization order from **base to derived** for traits, but mixed models cause **null or default** surprises:

```scala
trait T { println("T init") }
trait U { println("U init") }
class C extends Base with T with U { println("C body") }
```

Constructors print in an order derived from linearization—exams may ask you to list println order without running code.

| Stage | What runs |
|-------|-----------|
| Superclass ctor | parent fields |
| Trait init blocks | in linearization |
| Class body | final statements |

## Abstract override chains

Stackable traits rely on linearization for `super`:

```scala
abstract class Window {
  def draw(): Unit = println("window")
}

trait Border extends Window {
  abstract override def draw(): Unit = {
    println("border")
    super.draw()
  }
}

trait Scroll extends Window {
  abstract override def draw(): Unit = {
    println("scroll")
    super.draw()
  }
}

(new Window with Scroll with Border).draw()
```

Order of `with` changes border vs scroll wrapping—**exam gold** to swap traits and predict output.

## Worked linearization (copy this template)

For `class C extends A with M with N`:

1. Write `C, N, M, …parents of N…, …parents of M…, A, AnyRef, Any`.
2. Remove later duplicates (keep the leftmost occurrence).
3. For each `super.m`, walk the list after the defining trait until you find `m`.

Practice once on paper with three traits sharing one override—examiners reuse that pattern.

> [!EXAM] Write linearization first
> Full credit often requires the type list before the printed trace. Skipping straight to output loses method marks.

## Comparison table

| Language | Multiple inheritance resolution |
|----------|----------------------------------|
| Scala | linearization (C3-like) |
| OCaml | no class MI; modules separate |
| Erlang | no OO MI |
| Java | single class + default interfaces |

## Common pitfalls and exam traps

- Reading **`with` left-to-right** as `super` order — **`super` walks right-to-left** among traits.
- Forgetting to **dedupe** repeated bases in linearization list.
- **Lazy val** in traits masking init order bugs—know `lazy val` delays evaluation until first access.
- Mixing **Java classes** with Scala traits without checking bytecode name mangling (rare on LP exams).

> [!RECAP] Cheat sheet
> - Linearization: class, traits R→L, expand parents, dedupe
> - Dynamic dispatch = first override in linearization
> - `super` = next trait/class in order
> - Init prints follow linearization + ctor rules

## Further reading

- [Scala Specification — Class linearization](https://scala-lang.org/files/archive/spec/2.13/05-classes-and-objects.html#class-linearization)
- [Tour of Scala — Traits and linearization (overview)](https://docs.scala-lang.org/tour/traits.html)
- [Scala 3 Book — Object orientation](https://docs.scala-lang.org/scala3/book/scala-for-java-programmers.html)
- [Real World OCaml — Objects (contrast)](https://dev.realworldocaml.org/objects.html)
