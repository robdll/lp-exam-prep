# Polymorphism

Parametric polymorphism lets you write one function for all types (`'a -> 'a`) while the type checker rejects unsafe instantiations (`'a -> int` assigned to `'a -> 'a`). Exam questions probe inference, value restriction, and the difference between polymorphic functions and ad hoc overloading (which OCaml handles separately via modules and classes).

## Polymorphic functions and type variables

```ocaml
let id x = x                    (* 'a -> 'a *)
let pair x y = (x, y)           (* 'a -> 'b -> 'a * 'b *)

let f g x = g (g x)             (* ('a -> 'a) -> 'a -> 'a *)
```

Type inference **generalizes** free type variables at `let` bindings to schemes `∀α. τ`.

```ocaml
let compose f g x = f (g x)     (* ('b -> 'c) -> ('a -> 'b) -> 'a -> 'c *)
```

> [!TIP] Hindley-Milner intuition
> If branches of an `if` or `match` disagree, unification fails. Collect constraints mentally: “this application forces `'a` to be both `int` and `bool`” → type error.

## Let-polymorphism and the value restriction

```ocaml
let not_id = ref id   (* ('_a -> '_a) ref — weakly polymorphic *)
```

Mutable fields and certain expressions get **weak** polymorphism: you cannot use `!not_id` at arbitrary types without copying to a monomorphic binding.

```ocaml
let r = ref []      (* '_a list ref, not 'a list ref *)
(* r := [1]; r := ["hi"]  (* second line may fail type check *)
```

> [!WARNING] Value restriction
> Exams love “why is this not polymorphic?” Answer: `ref` is not a **syntactic value** in the sense required for generalization, so `'a` becomes scoped (weak).

## Polymorphic datatypes

```ocaml
type 'a box = B of 'a

let unwrap (B x) = x   (* 'a box -> 'a *)
```

Functions over polymorphic types must respect abstraction: you cannot branch on `'a` being `int` without constraints (no type-case in standard OCaml).

| Polymorphism style | OCaml | Erlang | Scala |
|-------------------|-------|--------|-------|
| Parametric | `'a`, inference | dynamic / specs | `[A]`, generics |
| Ad hoc | modules, classes | N/A (conventions) | implicits, overloading |
| Subtyping | objects (separate) | N/A | `<:` bounds |

## Higher-order polymorphism

Passing polymorphic functions requires **higher-rank** types occasionally:

```ocaml
let apply_twice f x = f (f x)

(* Rank-2 example (explicit annotation sometimes needed): *)
let mono f = (f 1, f true)  (* error unless f is overloaded differently *)
```

Exam level: know that **universal** quantification appears at `let`, while **existential** types hide concrete representations (modules, objects).

## Coercions vs polymorphism

OCaml has no implicit coercions between `'a` and `'b`. Subtyping exists in the **object** system:

```ocaml
(* Objects — separate track from `'a` polymorphism *)
let o = object method m = 1 end
```

Do not mix object subtyping answers with `'a list` parametricity unless the question says so.

> [!EXAM] Free vs bound type variables
> In `type 'a t = …`, `'a` is bound in the type definition. In `let f (x : 'a) = …` without proper context, `'a` may be an error—unbound variable. Spot unbound `'a` in wrong exam snippets.

## Practical polymorphic code

```ocaml
let rec length : 'a. 'a list -> int = function
  | [] -> 0
  | _ :: t -> 1 + length t

(* Explicit polymorphism with -polytypes in GADT-heavy code; exams rarely need this syntax *)
```

List functions showcase polymorphism:

```ocaml
let rec map f = function
  | [] -> []
  | h :: t -> f h :: map f t
(* ('a -> 'b) -> 'a list -> 'b list *)
```

Instantiation on paper: `map String.length ["a"; "bb"]` forces `'a = string`, `'b = int`, result `[1; 2]`. Polymorphism lives in the **function definition**; each call site picks monomorphic types via unification.

## Common pitfalls and exam traps

- Assuming **`'a list ref`** is polymorphic—it is not under value restriction.
- Confusing **polymorphic** `map` with **monomorphic** built-ins after partial application.
- Writing **heterogeneous lists** without variants or objects—OCaml core needs a common type.
- Forgetting that **comparison polymorphism** `'a. 'a -> 'a -> bool` is magic for built-in `=`, not for all types.

> [!RECAP] Cheat sheet
> - `'a` = type variable; generalize at `let` for values
> - Value restriction → weak types at `ref`, `Array.make`, etc.
> - HM inference = unify application, `if`, `match` branches
> - Ad hoc overload ≠ parametric polymorphism

## Further reading

- [Real World OCaml — Polymorphism](https://dev.realworldocaml.org/polymorphism.html)
- [OCaml.org — Polymorphism](https://ocaml.org/docs/manual)
- [Scala docs — Generics](https://docs.scala-lang.org/tour/generic-classes.html)
- [Tour of Scala](https://docs.scala-lang.org/tour/tour-of-scala.html)
