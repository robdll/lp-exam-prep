# Currying & map/filter/fold

Higher-order list processing is the fastest path to compact, correct OCaml on exams: currying lets you specialize functions by supplying arguments one at a time, while `map`, `filter`, and `fold` encode the three canonical recursion schemes over lists. Master these and most “write a function over lists” questions become a short composition.

## Currying and partial application

Every function of type `'a -> 'b -> 'c` is really `'a -> ('b -> 'c)`:

```ocaml
let add x y = x + y
let add5 = add 5        (* int -> int *)
let _ = add5 3          (* 6 *)

let prefix s t = s ^ t
let greet = prefix "Hello, "
let _ = greet "LP"      (* "Hello, LP" *)
```

The **uncurry** form uses tuples:

```ocaml
let add_pair (x, y) = x + y   (* int * int -> int *)
```

Exams may ask for types of partially applied expressions—expand curried types left-to-right.

> [!TIP] Operator sections
> `(+)` is `fun x y -> x + y`; `(+ 1)` is `fun x -> x + 1`. Infix operators are curried functions in disguise.

## map: transform element-wise

```ocaml
let rec map f = function
  | [] -> []
  | h :: t -> f h :: map f t

let squares = List.map (fun x -> x * x) [1; 2; 3]
(* [1; 4; 9] *)
```

Fusion on paper: `map f (map g xs) = map (f ∘ g) xs`.

## filter: keep by predicate

```ocaml
let rec filter p = function
  | [] -> []
  | h :: t -> if p h then h :: filter p t else filter p t

let evens = List.filter (fun x -> x mod 2 = 0) [1; 2; 3; 4]
(* [2; 4] *)
```

Combine with `map`:

```ocaml
let double_evens xs =
  xs |> List.filter (fun x -> x mod 2 = 0) |> List.map (( * ) 2)
```

## fold: the universal list eliminator

**Left fold** (`fold_left`) is tail-recursive and strict left-to-right:

```ocaml
let rec fold_left f acc = function
  | [] -> acc
  | h :: t -> fold_left f (f acc h) t

let sum = List.fold_left (+) 0 [1; 2; 3]   (* 6 *)
let rev = List.fold_left (fun acc x -> x :: acc) [] [1; 2; 3]
(* [3; 2; 1] *)
```

**Right fold** (`fold_right`) mirrors list structure (not always tail-recursive):

```ocaml
let rec fold_right f = function
  | [] -> acc_default
  | h :: t -> f h (fold_right f t)
```

Standard library:

```ocaml
let append l1 l2 = List.fold_right (fun x acc -> x :: acc) l1 l2
```

> [!WARNING] fold_right and laziness
> `List.fold_right` is not tail-recursive on huge lists. Exams asking for efficiency want `fold_left` with an accumulator.

| Combinator | Type shape (conceptual) | Typical use |
|------------|-------------------------|-------------|
| map | (`a→`b) → `a list` → `b list` | transform |
| filter | (`a→bool) → `a list` → `a list` | select |
| fold_left | (`b→`a→`b) → `b` → `a list` → `b` | aggregate, reverse |

## From fold to map and filter (exam theory)

Any structurally recursive function on lists can be expressed with `fold`—know the *idea* even if you code with `List.map`:

```ocaml
let length xs = List.fold_left (fun n _ -> n + 1) 0 xs

let any p xs =
  List.fold_left (fun b x -> b || p x) false xs
```

> [!EXAM] Order of evaluation
> `fold_left f z [a;b;c]` computes `f (f (f z a) b) c`. `fold_right f [a;b;c] z` computes `f a (f b (f c z))`. Trace one step on paper when asked.

## Pipelines and readability

OCaml 4.08+ pipe:

```ocaml
let process xs =
  xs
  |> List.filter (fun x -> x > 0)
  |> List.map String.of_int
  |> String.concat ","
(* "1,2,3" for input [1;-1;2;3] *)
```

Cross-language comparison:

| Idiom | OCaml | Erlang | Scala |
|-------|-------|--------|-------|
| Map | `List.map` | `lists:map/2` | `list.map` |
| Filter | `List.filter` | `lists:filter/2` | `list.filter` |
| Fold | `List.fold_left` | `lists:foldl/3` | `foldLeft` |

## Common pitfalls and exam traps

- Using **`fold_right` with a non-associative** `f` when order matters (subtraction: `1 - 2 - 3` ≠ right vs left fold semantics in expressions).
- Forgetting **`List.map f` returns a list**—do not expect side effects inside `f` unless intentional.
- Partial application ** arity mistakes**: `List.map [1;2]` is a type error; first arg must be a function.
- Confusing **`::` and `@`**: `fold` builds lists; appending with `@` is O(n) on the left list.

> [!RECAP] Cheat sheet
> - Currying: multi-arg functions = nested single-arg functions
> - `map` / `filter` / `fold_left` cover most list exams
> - Pipe `|>` reads left-to-right data flow
> - Trace folds with small lists [1;2;3]

## Further reading

- [Real World OCaml — Lists and higher-order functions](https://dev.realworldocaml.org/lists-and-patterns.html)
- [OCaml.org — Standard library List](https://ocaml.org/api/List.html)
- [Learn You Some Erlang — Higher-order functions](https://learnyousomeerlang.com/higher-order-functions)
- [Tour of Scala — Higher-order functions](https://docs.scala-lang.org/tour/higher-order-functions.html)
