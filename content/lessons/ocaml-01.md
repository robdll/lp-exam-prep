# λ-Calculus, ML & Recursion

Programming language exams at UniMi-style courses rarely ask you to prove Church–Rosser by hand, but they expect you to *think* like the λ-calculus and ML: functions as values, minimal syntax, and recursion without mutable loops. This lesson connects the formal λ-calculus to OCaml’s core, then builds the recursion patterns that appear in almost every functional-programming exam question.

## From λ-calculus to ML expressions

In untyped λ-calculus, abstraction and application are the only primitives:

```text
(λx. x) y          →  y                    (* identity *)
(λx. λy. x) a b    →  a                    (* constant / K combinator *)
(λf. (λx. f (x x)) (λx. f (x x)))          (* Y combinator — fixed point *)
```

ML family languages *implement* this idea with named functions, pattern matching, and static types. An OCaml function `fun x -> x` is syntactic sugar for a λ-abstraction; application is juxtaposition or explicit parentheses.

```ocaml
let id x = x
let const a b = a

(* Application associates left: f x y = (f x) y *)
let twice f x = f (f x)
```

> [!TIP] Read types as function arrows
> The type of `const` is `'a -> 'b -> 'a`: first argument is “stored,” second is ignored. Examiners love asking what type inference assigns when you eta-reduce or reorder arguments.

## Recursion: structural vs general

Exams distinguish **structural recursion** (induction on datatypes) from **general recursion** (any recursive call pattern).

**Structural** — recurse on strictly smaller subterms (lists, natural numbers):

```ocaml
let rec length = function
  | [] -> 0
  | _ :: tl -> 1 + length tl

let rec fact n =
  if n <= 0 then 1 else n * fact (n - 1)
```

**Mutually recursive** functions share one `rec` block:

```ocaml
let rec even n = n = 0 || odd (n - 1)
and odd n = n <> 0 && even (n - 1)
```

> [!WARNING] Non-structural recursion
> `fact` on integers is not structurally decreasing in the datatype sense; courses still allow it but may contrast with `Nat`-style encodings. Know when your grader expects a `match` on constructors only.

## Fixed points without the Y combinator

OCaml provides `let rec` so you rarely implement Y. Conceptually, `let rec f = … f …` is a fixed point of a functional `F` where `f = F f`.

```ocaml
(* Ackermann — not primitive recursive; shows deep recursion *)
let rec ack m n =
  match m, n with
  | 0, n -> n + 1
  | m, 0 -> ack (m - 1) 1
  | m, n -> ack (m - 1) (ack m (n - 1))
```

For exam sketches, you should be able to write a **lazy** fixed-point combinator’s *idea* (thunks delay self-application) even if OCaml code uses `let rec`.

## ML evaluation model (call-by-value)

OCaml is **call-by-value**: arguments are evaluated before the function body. That affects how you reason about `if`, `&&`, and `||`.

```ocaml
let rec loop () = loop ()  (* diverges *)
let f x = 0
(* f (loop ())  (* would not terminate if evaluated — avoid *) *)

let safe b = if b then 1 else 0  (* condition evaluated first *)
```

| Concept | λ-calculus | OCaml |
|--------|------------|-------|
| Abstraction | `λx. e` | `fun x -> e` / `let f x = …` |
| Application | `(e1 e2)` | `e1 e2` |
| Fixed point | Y combinator | `let rec` |
| Reduction | β-reduction | Function call (by value) |

## Recursion on lists and trees (exam bread-and-butter)

Master one **template** per datatype:

```ocaml
let rec sum_list = function
  | [] -> 0
  | h :: t -> h + sum_list t

type 'a tree = Leaf of 'a | Node of 'a tree * 'a * 'a tree

let rec inorder = function
  | Leaf x -> [x]
  | Node (l, x, r) -> inorder l @ [x] @ inorder r
```

> [!EXAM] Base case completeness
> Missing `[]` or `Leaf` in a `match` is a compile error in OCaml — but in written exams, partial matches lose marks. Always list *all* constructors.

## Common pitfalls and exam traps

- Confusing **currying** with tupling: `f x y` vs `f (x, y)` changes types and evaluation order.
- Writing `let rec f = …` where the recursive call is not on a **smaller** input when the rubric asks for “induction on the datatype.”
- Assuming **lazy** semantics like Haskell: `if false then loop () else 0` is safe in OCaml only because the condition is evaluated first, not because branches are lazy.
- Forgetting that **shadowing** `let x = … in let x = … in …` is legal but confusing in proofs about scope.

> [!RECAP] Cheat sheet
> - λ-abstraction ↔ `fun` / `let f x =`
> - Structural recursion ↔ `match` on one constructor layer
> - `let rec … and …` ↔ mutual recursion
> - CBV ↔ evaluate args before call

## Further reading

- [Real World OCaml](https://dev.realworldocaml.org/) — Chapters on functions and recursive types
- [OCaml.org — Language manual](https://ocaml.org/docs/manual)
- [Tour of Scala](https://docs.scala-lang.org/tour/tour-of-scala.html) — contrast with JVM OO (optional cross-reference)
