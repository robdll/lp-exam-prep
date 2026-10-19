# Traits

Traits are Scala’s reusable interface + implementation units: they support mixin composition multiple times per class, stackable modifications, and delayed initialization of abstract members. LP exams compare traits to Java interfaces, OCaml module inclusion, and Erlang behaviours—focus on linearization order preview and abstract vs concrete members.

## Defining and using traits

```scala
trait Greeter {
  def greet(name: String): String = s"Hello, $name"
}

trait Loud extends Greeter {
  abstract override def greet(name: String): String =
    super.greet(name).toUpperCase
}

class Person extends Greeter {
  def title = "Mr"
}
```

Classes **`extends`** one superclass (if any) and **`with`** traits:

```scala
class Host extends Person with Loud
```

> [!TIP] abstract override
> `stackable trait` pattern requires `abstract override` when overriding concrete methods from a parent trait—exam questions spot missing `abstract`.

## Abstract members

```scala
trait Repository {
  type Entity
  def find(id: Int): Option[Entity]
}

class UserRepo extends Repository {
  type Entity = String
  def find(id: Int): Option[String] = Some(s"user-$id")
}
```

**Type members** (`type Entity`) abstract over concrete types—similar spirit to OCaml module signatures.

## Trait vs abstract class

| | Trait | Abstract class |
|---|-------|----------------|
| Multiple inheritance | yes (`with`) | single extends |
| Constructor params | no (Scala 2); check Scala 3 | yes |
| JVM view | interfaces + default methods | class |

Use traits for **capabilities**; abstract class when you need a shared constructor or Java-facing hierarchy.

> [!WARNING] Initialization order
> Traits’ `val`/`lazy val` initialization can surprise you in linearization—advanced exams may show diamond examples; see next lesson for full linearization.

## Self types and dependencies

```scala
trait Logging { self: Repository =>
  def logFind(id: Int): Option[Entity] = {
    val r = find(id)
    println(s"find $id -> $r")
    r
  }
}
```

`self: Repository` declares that any concrete class mixing `Logging` must also be a `Repository`—dependency injection without inheritance.

## Comparison across LP languages

| Mechanism | Scala traits | OCaml | Erlang |
|-----------|--------------|-------|--------|
| Code reuse | mixin, override | `include` module | behaviour callback |
| Multiple | many traits | functors + includes | one behaviour module |
| Type abstraction | type members | signatures | opaque records |

> [!EXAM] Override rules
> “Can a trait extend a class?” — In Scala 2, traits cannot extend a class with a constructor chain conflict; class extends class, with traits. Know `super` refers to linearization predecessor.

## Practical exam example

```scala
trait Draw {
  def draw(): Unit
}

trait Border extends Draw {
  abstract override def draw(): Unit = {
    println("+-+")
    super.draw()
    println("+-+")
  }
}

class Picture extends Draw {
  def draw(): Unit = println("| |")
}

new Picture with Border draw()
// prints border, picture, border
```

Trace **`super.draw()`** using linearization (right-most trait first for `super`).

## Common pitfalls and exam traps

- Forgetting **`with`** order affects `super` resolution.
- Using **`trait` with constructor parameters** in Scala 2 (illegal)—use class or Scala 3 trait parameters if allowed.
- **`override` missing** on concrete parent methods → compile error.
- Confusing **trait object** (singleton) with **trait** mixed into instances.

> [!RECAP] Cheat sheet
> - `extends` class, `with` traits
> - `abstract override` for stackable traits
> - `type` members for abstract types
> - `self =>` for required dependencies

## Further reading

- [Tour of Scala — Traits](https://docs.scala-lang.org/tour/traits.html)
- [Scala 3 Book — Traits and classes](https://docs.scala-lang.org/scala3/book/classes-and-methods.html)
- [Real World OCaml — Modules](https://dev.realworldocaml.org/modules.html) — compare abstraction
- [Erlang — behaviours](https://www.erlang.org/doc/man/gen_server.html)
