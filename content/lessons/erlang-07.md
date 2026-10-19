# Starting with Erlang

Erlang enters the LP curriculum as the canonical **actor-oriented**, soft-real-time language: lightweight processes, message passing, and “let it crash” resilience. Exams test basic syntax, pattern matching, guards, and how processes differ from OS threads—foundations before actors and distribution.

## Installation and shell workflow

```bash
erl
1> 1 + 2.
3
2> H = "hello".
"hello"
3> halt().
```

Compile modules to bytecode:

```bash
erlc hello.erl
erl -s hello main -s init stop
```

> [!TIP] Module naming
> File `hello.erl` must define `-module(hello).` Atom module names match filenames (lowercase).

## Modules, exports, and functions

```erlang
-module(greet).
-export([hello/1]).

hello(Name) ->
    io:format("Hello, ~s~n", [Name]).
```

Arity matters: `hello/1` is a different function from `hello/2`. Clauses pattern-match top to bottom:

```erlang
classify(X) when X < 0 -> negative;
classify(0) -> zero;
classify(X) when X > 0 -> positive.
```

## Atoms, tuples, lists, and strings

```erlang
Atom = ok.
Tuple = {point, 1, 2}.
List = [1, 2, 3 | []].
String = "hi".   %% list of character codes
```

Cons cells `[H | T]` mirror ML’s `::`; **strings are lists** unless you use binaries (`<<"text">>`).

| Type | Example | Notes |
|------|---------|-------|
| Atom | `ok`, `error` | constants, tags |
| Tuple | `{a, 1}` | fixed arity |
| List | `[1,2,3]` | linked structure |
| Binary | `<<1,2>>` | efficient buffers |

## Pattern matching and failure

```erlang
point({point, X, Y}) -> X + Y;
point(_) -> error(badarg).
```

No match → **badmatch** exception. Use `_` for don’t-care; bind variables once per clause.

> [!WARNING] Variable scope
> Variables are **single-assignment** per scope. `X = 1, X = 2` fails unless the second `X` is a new pattern that happens to unify (rare trap in exams).

## Guards and recursion

```erlang
fact(0) -> 1;
fact(N) when N > 0 -> N * fact(N - 1).
```

Guards are limited (no user-defined functions in older Erlang). List recursion:

```erlang
length([]) -> 0;
length([_|T]) -> 1 + length(T).
```

## Processes at a glance

```erlang
Pid = spawn(fun() -> io:format("child~n") end).
is_process_alive(Pid).
self().
```

Each process has a mailbox; `spawn` returns a **pid**. Full actor semantics come in the next lesson—here, know that concurrency is the default tool, not shared memory.

> [!EXAM] Process vs function
> `spawn(Module, Function, Args)` vs `spawn(Fun)` — exams ask which creates a linked process and what `self()` returns in parent vs child.

## Binaries at a glance

```erlang
<<1, 2, 3>>.
<< "tag", Len:8, Payload/binary >>.
```

Binaries are the standard wire format for distribution and file I/O; contrast with `"string"` as a char list when the question mentions network packets.

## Common pitfalls and exam traps

- Confusing **`=`** (match) with assignment in imperative languages.
- Using **string lists** where **binaries** are required for I/O efficiency—know both exist.
- Forgetting **module export list** — functions not exported are not callable from outside.
- **Tail recursion** on lists: only the recursive call in tail position gets constant stack (BEAM optimizes).

> [!RECAP] Cheat sheet
> - `Module:Function(Args)` remote call
> - Pattern match + guards on clauses
> - `[H|T]` lists, `{Tag, ...}` tuples
> - `spawn` → new process, returns pid

## Further reading

- [Learn You Some Erlang — Starting out](https://learnyousomeerlang.com/introduction)
- [Erlang/OTP documentation](https://www.erlang.org/doc/)
- [Real World OCaml](https://dev.realworldocaml.org/) — functional contrast (immutable ML vs Erlang processes)
- [Tour of Scala](https://docs.scala-lang.org/tour/tour-of-scala.html) — JVM concurrency comparison (high level)
