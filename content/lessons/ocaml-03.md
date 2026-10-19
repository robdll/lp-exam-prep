# Modules & Functors

OCaml’s module system separates **interfaces** (signatures) from **implementations** (structures) and lets you parameterize modules with **functors**. LP exams use this to test abstraction, representation hiding, and reusable libraries—think stacks, maps, and “plugin” implementations swapped at compile time.

## Structures and signatures

A **structure** bundles values and types; a **signature** is the exported view.

```ocaml
module Stack = struct
  type 'a t = 'a list
  let empty = []
  let push x s = x :: s
  let pop = function [] -> None | h :: t -> Some (h, t)
end

module type STACK = sig
  type 'a t
  val empty : 'a t
  val push : 'a -> 'a t -> 'a t
  val pop : 'a t -> ('a * 'a t) option
end
```

`Stack` can be ascribed to `STACK` with `(Stack : STACK)` if every signature item is implemented.

> [!TIP] Abstraction via signature ascription
> Writing `(struct … end : STACK)` hides the fact that `'a t = 'a list` from clients—essential for exam questions on representation independence.

## Functors: modules as functions

A **functor** maps one module to another:

```ocaml
module MakeStack (Elt : sig type t val compare : t -> t -> int end) = struct
  type t = Elt.t list
  let empty = []
  let push x s = x :: s
  let pop = function [] -> None | h :: t -> Some (h, t)
end

module IntStack = MakeStack (struct
  type t = int
  let compare = compare
end)
```

Application syntax is `MakeStack (ArgModule)`, not `MakeStack ArgModule` at the value level—modules are not first-class values in core OCaml.

## Including and extending modules

```ocaml
module ExtendedStack = struct
  include Stack
  let top = function [] -> None | h :: _ -> Some h
end
```

`include` copies definitions; conflicts must be resolved explicitly. Exams may ask what names are visible after `include`.

| Mechanism | Purpose | Exam keyword |
|-----------|---------|--------------|
| `sig … end` | interface | specification |
| `struct … end` | implementation | body |
| `module M = …` | define module | binding |
| `functor (X : S) -> …` | parameterized module | generic library |

## Maps and sets (standard library pattern)

The library functors `Map.Make` and `Set.Make` expect an ordered type:

```ocaml
module StringMap = Map.Make (String)

let m = StringMap.empty |> StringMap.add "exam" 1
let _ = StringMap.find "exam" m  (* 1 *)
```

> [!WARNING] Comparable input
> Functors require a `compare : t -> t -> int` (or `Ord` in newer code) that is a **total order**. Wrong compare breaks invariants silently in trees.

## First-class modules (light touch)

Local abstraction packages a module as a value:

```ocaml
let pack (type s) (module M : sig type t val v : t end) =
  M.v
```

Advanced exams may show `(module S)` types; know they exist for plugins and runtime choice of implementation.

> [!EXAM] Functor application order
> `F (G (X))` vs nested structures: draw the module DAG on paper. Marks drop when students apply functors to structures that do not match the argument signature.

## Design exercise mindset

Typical exam task: specify `MAP` with `empty`, `add`, `find`, then implement twice (list vs tree) behind the same signature. Clients must compile against `MAP` only.

```ocaml
module type MAP = sig
  type key
  type 'a t
  val empty : 'a t
  val add : key -> 'a -> 'a t -> 'a t
  val find : key -> 'a t -> 'a option
end
```

## Common pitfalls and exam traps

- Treating **functors** like functions on values—they run at **compile time** and produce modules.
- Forgetting **generative** vs **transparent** type aliases in `with` constraints (`with type t = …`).
- **Duplicate definitions** after `include` without `open` discipline.
- Assuming modules are **recursive** by default—mutual recursion needs `module rec` (advanced).

> [!RECAP] Cheat sheet
> - Signature = contract; structure = implementation
> - Functor = `(Arg : S) -> struct … end`
> - `include` = copy module contents
> - Hide reps with `: SIG` ascription

## Further reading

- [Real World OCaml — Modules](https://dev.realworldocaml.org/modules.html)
- [Real World OCaml — Functors](https://dev.realworldocaml.org/functors.html)
- [OCaml.org — Modules and functors](https://ocaml.org/docs/manual)
- [Scala docs — Objects and traits](https://docs.scala-lang.org/scala3/book/scala-for-java-programmers.html) — contrast with mixin composition
