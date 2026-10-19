# Datatypes in ML

Algebraic datatypes are the spine of ML exams: you define the shape of data once, then let the compiler enforce exhaustiveness and type safety. UniMi-style questions often ask you to design a type, write recursive functions over it, or explain why two types are isomorphic—skills that start here.

## Sum and product types

A **product** is a tuple or record; a **sum** is a variant with multiple constructors.

```ocaml
type point = { x : float; y : float }

type shape =
  | Circle of float
  | Rect of float * float

let area = function
  | Circle r -> Float.pi *. r *. r
  | Rect (w, h) -> w *. h
```

Each constructor tag is injected into the sum; `match` eliminates it.

> [!TIP] Read variants as “or”
> `shape` is “circle *or* rectangle.” The type of `area` is `shape -> float` because both branches return the same type.

## Records, variants, and polymorphic datatypes

Parametric types quantify over type variables:

```ocaml
type 'a option = None | Some of 'a
type ('k, 'v) assoc = Empty | Bind of 'k * 'v * ('k, 'v) assoc

let rec lookup k = function
  | Empty -> None
  | Bind (k', v, rest) ->
      if k = k' then Some v else lookup k rest
```

Nested patterns expose structure in one step:

```ocaml
let head_opt = function
  | [] -> None
  | h :: _ -> Some h
```

## Recursive datatypes and induction

Lists and trees are the standard exam datatypes:

```ocaml
type 'a bin_tree =
  | Empty
  | Branch of 'a bin_tree * 'a * 'a bin_tree

let rec height = function
  | Empty -> 0
  | Branch (l, _, r) -> 1 + max (height l) (height r)
```

Proofs on paper follow **structural induction** on the number of constructors below the root.

> [!WARNING] Ambiguous constructors
> Constructor names must be unique per type in a scope, but different types can reuse names (`Empty` on lists vs trees). In exams, qualify clearly which type you mean.

## Type synonyms vs abstract types

```ocaml
type celsius = float
type fahrenheit = float
(* Both are float at runtime — no safety unless you use modules *)
```

For exam contrast: **synonyms** are transparent to the type checker; **abstract** types (modules) hide representation.

| Feature | OCaml variant | Erlang term | Scala case class |
|--------|---------------|-------------|------------------|
| Sum type | `A \| B` constructors | tagged tuples / records | `sealed trait` + cases |
| Exhaustive match | yes (compiler) | pattern match runtime | yes if sealed |
| Parametric | `'a list` | conventions only | `[A]` |

## Enumerations and exceptions

Simple enums are variants without payloads:

```ocaml
type color = Red | Green | Blue

exception Not_found of string

let find pred lst =
  let rec go = function
    | [] -> raise (Not_found "empty")
    | h :: t -> if pred h then h else go t
  in
  go lst
```

Exams may ask when to use `option` vs exceptions: **option** for expected failure; **exceptions** for exceptional control flow or deep stacks.

## Lists as the canonical datatype

```ocaml
(* Built-in list is a variant: [] | (::) *)
let rec append l1 l2 =
  match l1 with
  | [] -> l2
  | h :: t -> h :: append t l2

(* Expected: append [1;2] [3] = [1;2;3] *)
```

Understand **tail recursion** on lists: accumulator + reverse, or direct tail call on `t` with acc.

> [!EXAM] Isomorphism questions
> “Is `('a * 'b) list` isomorphic to `'a list * 'b list`?” — Usually **no**: zip/unzip only work for equal lengths. Be ready with a counterexample or partial function argument.

## Common pitfalls and exam traps

- Using **polymorphic comparison** (`=`) on functions or non-comparable types—know that `'a -> 'b` is not typically comparable in OCaml.
- Forgetting that **`::` is a constructor**, not an infix function you can partially apply without wrapping.
- **Shadowing** type names in nested modules—exam snippets may reuse `'a tree` with different shapes.
- Confusing **`option`** with exceptions: `None` is data; `raise` unwinds the stack.

> [!RECAP] Cheat sheet
> - Sum = multiple constructors; product = tuple/record fields
> - `match` must cover all constructors
> - Recursive types → structural induction
> - `'a` in type definition = polymorphic datatype

## Further reading

- [Real World OCaml — Variants](https://dev.realworldocaml.org/variants.html)
- [OCaml.org — Polymorphism and variants](https://ocaml.org/docs/manual)
- [Learn You Some Erlang — Types and records](https://learnyousomeerlang.com/types) — compare dynamic typing
- [Scala 3 — Case classes](https://docs.scala-lang.org/scala3/book/domain-modeling-tools.html)
