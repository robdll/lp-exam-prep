/* AUTO-GENERATED — run node scripts/generate-content.mjs */
import type { Lesson } from "@/lib/types";
export const lessons: Lesson[] = [
  {
    "id": "ocaml-01",
    "track": "ocaml",
    "number": 1,
    "title": "λ-Calculus, ML & Recursion",
    "italianTitle": "Programmazione funzionale e ricorsione",
    "summary": "Functional programming foundations: λ-calculus, OCaml functions, pattern matching, recursion, and tail recursion (ricorsione di coda).",
    "labRefs": [
      "lab1-1",
      "lab1-2"
    ],
    "quiz": [
      {
        "id": "q1",
        "prompt": "What is the result of `let f x y = x + y in f 3` in OCaml?",
        "options": [
          "`3` (int)",
          "`int -> int`",
          "`unit`",
          "Type error"
        ],
        "correctIndex": 1,
        "explanation": "Currying: applying one argument to a two-argument function yields a function waiting for the second argument."
      },
      {
        "id": "q2",
        "prompt": "Tail recursion is important because…",
        "options": [
          "It always runs faster on small inputs",
          "The compiler can reuse stack space (constant stack)",
          "It disables pattern matching",
          "It requires mutable variables"
        ],
        "correctIndex": 1,
        "explanation": "Tail calls can be compiled to jumps — essential for deep recursion on exam-sized inputs."
      },
      {
        "id": "q3",
        "prompt": "In λ-calculus, `λx.x` is…",
        "options": [
          "The identity function",
          "The zero function",
          "A syntax error",
          "A list constructor"
        ],
        "correctIndex": 0,
        "explanation": "Abstraction λx.x maps every input to itself."
      }
    ],
    "exercises": [
      {
        "id": "ocaml-01-e1",
        "title": "List length",
        "prompt": "Write `length : 'a list -> int` without `List.length`.",
        "starterCode": "let length lst =\n  (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "Empty → 0.",
          "Peel head with pattern match."
        ],
        "solution": "let rec length = function [] -> 0 | _ :: t -> 1 + length t",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-01-e2",
        "title": "Tail-recursive sum",
        "prompt": "Write `sum : int list -> int` using tail recursion.",
        "starterCode": "let sum lst =\n  (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "Inner `go acc` helper.",
          "Last call must be `go`."
        ],
        "solution": "let sum lst =\n  let rec go acc = function [] -> acc | h :: t -> go (acc + h) t in\n  go 0 lst",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-01-e3",
        "title": "Hanoi moves",
        "prompt": "Write `hanoi n : int` returning the number of moves for `n` disks (classic recurrence).",
        "starterCode": "let hanoi n =\n  (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "Base: 0 disks → 0 moves.",
          "Recurrence: 2 * hanoi (n-1) + 1."
        ],
        "solution": "let rec hanoi = function 0 -> 0 | n -> 2 * hanoi (n - 1) + 1",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-01-e4",
        "title": "Curried add",
        "prompt": "Write `add : int -> int -> int` and use it as `List.map (add 10) [1;2;3]` → `[11;12;13]`.",
        "starterCode": "let add x y = (* TODO *)\nlet bump10 = (* partial application *)\n",
        "language": "ocaml",
        "hints": [
          "`add` is two-arg function.",
          "`add 10` is `fun y -> add 10 y`."
        ],
        "solution": "let add x y = x + y\nlet bump10 = add 10",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      }
    ]
  },
  {
    "id": "ocaml-02",
    "track": "ocaml",
    "number": 2,
    "title": "Datatypes in ML",
    "italianTitle": "Tipi di dato in ML",
    "summary": "Lists, tuples, records, arrays, and user-defined variants (tipi algebrici).",
    "labRefs": [
      "lab1-3",
      "lab1-4"
    ],
    "quiz": [
      {
        "id": "q1",
        "prompt": "`match Some 42 with None -> 0 | Some x -> x` evaluates to:",
        "options": [
          "0",
          "42",
          "None",
          "Type error"
        ],
        "correctIndex": 1,
        "explanation": "Some 42 matches the second branch binding x = 42."
      },
      {
        "id": "q2",
        "prompt": "Which type does `[1; 2; 3]` have?",
        "options": [
          "int list",
          "int array",
          "int * int * int",
          "'a list without constraint"
        ],
        "correctIndex": 0,
        "explanation": "All elements are int, so the list is int list."
      }
    ],
    "exercises": [
      {
        "id": "ocaml-02-e1",
        "title": "Variant conversion",
        "prompt": "Given `type temp = C of float | F of float`, write `to_celsius : temp -> float`.",
        "starterCode": "type temp = C of float | F of float\nlet to_celsius = function\n  (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "C stays.",
          "F uses (f -. 32.) *. 5. /. 9."
        ],
        "solution": "let to_celsius = function C c -> c | F f -> (f -. 32.) *. 5. /. 9.",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-02-e2",
        "title": "Record update",
        "prompt": "Define `{name; age}` person and `birthday p` incrementing age.",
        "starterCode": "type person = { name : string; age : int }\nlet birthday p = (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "Use `{ p with age = p.age + 1 }`."
        ],
        "solution": "let birthday p = { p with age = p.age + 1 }",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-02-e3",
        "title": "List append",
        "prompt": "Implement `append : 'a list -> 'a list -> 'a list` without `@`.",
        "starterCode": "let rec append l1 l2 =\n  (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "[] ++ l2 = l2.",
          "Head preserved in order."
        ],
        "solution": "let rec append l1 l2 = match l1 with [] -> l2 | h :: t -> h :: append t l2",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-02-e4",
        "title": "Option safe head",
        "prompt": "Write `head : 'a list -> 'a option`.",
        "starterCode": "let head = function\n  (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "[] → None.",
          "h :: _ → Some h."
        ],
        "solution": "let head = function [] -> None | h :: _ -> Some h",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      }
    ]
  },
  {
    "id": "ocaml-03",
    "track": "ocaml",
    "number": 3,
    "title": "Modules & Functors",
    "italianTitle": "Moduli e functor",
    "summary": "Structures, signatures, separate compilation, and parametric modules (functor).",
    "labRefs": [
      "lab1-7",
      "lab2-2"
    ],
    "quiz": [
      {
        "id": "q1",
        "prompt": "A functor in OCaml is…",
        "options": [
          "A function on lists",
          "A module parameterized by another module",
          "A type alias",
          "An exception handler"
        ],
        "correctIndex": 1,
        "explanation": "Functors map module signatures to modules — key for generic stacks/calculators."
      }
    ],
    "exercises": [
      {
        "id": "ocaml-03-e1",
        "title": "Stack signature",
        "prompt": "Fill in `STACK` signature for int stack with push/pop.",
        "starterCode": "module type STACK = sig\n  type 'a t\n  val empty : 'a t\n  val push : 'a -> 'a t -> 'a t\n  val pop : 'a t -> ('a * 'a t) option\nend\n",
        "language": "ocaml",
        "hints": [
          "Already a template — implement module below."
        ],
        "solution": "module IntStack = struct\n  type 'a t = 'a list\n  let empty = []\n  let push x s = x :: s\n  let pop = function [] -> None | h :: t -> Some (h, t)\nend",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-03-e2",
        "title": "Abstract type",
        "prompt": "Why can't clients of `STACK` build `1 :: empty` if `t` is abstract?",
        "starterCode": "(* Explain in comment, then implement MakeListStack *)\n",
        "language": "ocaml",
        "hints": [
          "Representation hidden outside module."
        ],
        "solution": "(* Clients only use push/pop — cannot pattern-match hidden list *)",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-03-e3",
        "title": "Functor map",
        "prompt": "Sketch `MakeMap (Ord : ORD)` storing `'a list` per key — just `empty` and `add`.",
        "starterCode": "module type ORD = sig type t val compare : t -> t -> int end\nmodule MakeMap (Ord : ORD) = struct\n  (* TODO *)\nend\n",
        "language": "ocaml",
        "hints": [
          "Use association list or Map if allowed.",
          "Exam: show functor header + type."
        ],
        "solution": "module MakeMap (Ord : ORD) = struct\n  type 'a t = (Ord.t * 'a) list\n  let empty = []\n  let add k v m = (k, v) :: m\nend",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-03-e4",
        "title": "Include vs open",
        "prompt": "Write two lines: `include` Stack in Calculator module vs `open Stack`. Comment trade-off.",
        "starterCode": "(* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "include merges module type into current scope."
        ],
        "solution": "(* include adds definitions; open only brings names unqualified *)",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      }
    ]
  },
  {
    "id": "ocaml-04",
    "track": "ocaml",
    "number": 4,
    "title": "Polymorphism",
    "italianTitle": "Polimorfismo",
    "summary": "Parametric polymorphism, type inference, weak typing, and polymorphic ADTs.",
    "labRefs": [
      "lab2-5"
    ],
    "quiz": [
      {
        "id": "q1",
        "prompt": "`let id x = x` has type:",
        "options": [
          "int -> int",
          "'a -> 'a",
          "unit -> unit",
          "'a -> 'b"
        ],
        "correctIndex": 1,
        "explanation": "Classic parametric polymorphism: id works at any type."
      }
    ],
    "exercises": [
      {
        "id": "ocaml-04-e1",
        "title": "Polymorphic id",
        "prompt": "Give the principal type of `let id x = x` and `let pair x y = (x, y)`.",
        "starterCode": "let id x = x\nlet pair x y = (x, y)\n",
        "language": "ocaml",
        "hints": [
          "Generalize with 'a, 'b."
        ],
        "solution": "(* id : 'a -> 'a ; pair : 'a -> 'b -> 'a * 'b *)",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-04-e2",
        "title": "Polymorphic queue",
        "prompt": "Type `'a queue` as `{ front; rear }` lists — write `enqueue` and `dequeue`.",
        "starterCode": "type 'a queue = { front : 'a list; rear : 'a list }\nlet empty = { front = []; rear = [] }\n",
        "language": "ocaml",
        "hints": [
          "Amortized: push rear, pop front.",
          "Reverse front when empty."
        ],
        "solution": "let enqueue x q = { q with rear = x :: q.rear }\nlet dequeue q = match q.front with h :: t -> Some (h, { q with front = t }) | [] -> (match List.rev q.rear with h :: t -> Some (h, { front = t; rear = [] }) | [] -> None)",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-04-e3",
        "title": "Weak typing trap",
        "prompt": "Why might `let v = ref []` break when you `v := [1]; v := [true]`?",
        "starterCode": "(* answer in comment *)\n",
        "language": "ocaml",
        "hints": [
          "First use fixes 'a ref for monomorphism."
        ],
        "solution": "(* 'a becomes int list after first assignment; bool list fails *)",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-04-e4",
        "title": "Polymorphic map",
        "prompt": "Write `map : ('a -> 'b) -> 'a list -> 'b list`.",
        "starterCode": "let rec map f = function\n  (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "Same structure as length."
        ],
        "solution": "let rec map f = function [] -> [] | h :: t -> f h :: map f t",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      }
    ]
  },
  {
    "id": "ocaml-05",
    "track": "ocaml",
    "number": 5,
    "title": "Currying & map/filter/fold",
    "italianTitle": "Currying, map, filter, fold",
    "summary": "Partial application, higher-order list processing, and folds.",
    "labRefs": [
      "lab1-5",
      "lab1-6"
    ],
    "quiz": [
      {
        "id": "q1",
        "prompt": "`List.fold_left (-) 0 [1;2;3]` in OCaml equals:",
        "options": [
          "6",
          "-6",
          "0",
          "2"
        ],
        "correctIndex": 1,
        "explanation": "(((0-1)-2)-3) = -6 — fold_left is left-associative."
      }
    ],
    "exercises": [
      {
        "id": "ocaml-05-e1",
        "title": "fold_left sum",
        "prompt": "Compute sum with `List.fold_left` without `+` in recursive call on list spine.",
        "starterCode": "let sum = List.fold_left (fun acc x -> acc + x) 0\n",
        "language": "ocaml",
        "hints": [
          "Starter given — predict `[1;2;3]`."
        ],
        "solution": "let sum = List.fold_left (fun acc x -> acc + x) 0",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-05-e2",
        "title": "filter positive",
        "prompt": "Write `positive : int list -> int list` with `filter` or recursion.",
        "starterCode": "let positive lst = (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "Keep x when x > 0."
        ],
        "solution": "let positive = List.filter (fun x -> x > 0)",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-05-e3",
        "title": "Compose",
        "prompt": "Write `compose f g x = f (g x)` and use on `List.map (compose ((+) 1) (( * ) 2)) [0;1;2]`.",
        "starterCode": "let compose f g x = (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "Order: g then f."
        ],
        "solution": "let compose f g x = f (g x)",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-05-e4",
        "title": "fold_right vs left",
        "prompt": "Explain difference in one comment; eval `fold_left (-) 0 [1;2;3]` vs `fold_right (-) [1;2;3] 0`.",
        "starterCode": "(* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "Left: (((0-1)-2)-3).",
          "Right: (1-(2-(3-0)))."
        ],
        "solution": "(* -6 vs 2 *)",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      }
    ]
  },
  {
    "id": "ocaml-06",
    "track": "ocaml",
    "number": 6,
    "title": "ML in Action: Graph DFS",
    "italianTitle": "ML in action — DFS su grafi",
    "summary": "Graph ADTs and depth-first search (ricerca in profondità) on directed graphs.",
    "labRefs": [
      "lab2-1"
    ],
    "quiz": [
      {
        "id": "q1",
        "prompt": "DFS uses which auxiliary structure (typical recursive version)?",
        "options": [
          "Queue only",
          "Visited set/list",
          "Priority heap only",
          "No auxiliary structure ever"
        ],
        "correctIndex": 1,
        "explanation": "Track visited nodes to avoid infinite loops on cyclic graphs."
      }
    ],
    "exercises": [
      {
        "id": "ocaml-06-e1",
        "title": "Neighbors",
        "prompt": "Given adjacency `('a * 'a) list`, write `neighbors g v`.",
        "starterCode": "let neighbors edges v =\n  (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "Filter pairs where fst = v.",
          "Map snd."
        ],
        "solution": "let neighbors edges v = List.map snd (List.filter (fun (a, _) -> a = v) edges)",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-06-e2",
        "title": "DFS reachability",
        "prompt": "Write `reachable edges start target` returning bool.",
        "starterCode": "let rec reachable edges start target =\n  (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "Maintain visited list.",
          "Base: start = target."
        ],
        "solution": "let rec visit seen v =\n  if v = target then true\n  else if List.mem v seen then false\n  else List.exists (fun n -> visit (v :: seen) n) (neighbors edges v)\nin visit [] start",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-06-e3",
        "title": "BFS sketch",
        "prompt": "Write `bfs` using a queue type (list as queue OK) for shortest path length.",
        "starterCode": "let bfs edges start target = (* TODO: return int option depth *)\n",
        "language": "ocaml",
        "hints": [
          "Layer-by-layer.",
          "Track distance in queue entries."
        ],
        "solution": "(* exam sketch: queue of (node, dist) *)",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-06-e4",
        "title": "Cycle detect",
        "prompt": "Return true if directed graph has a cycle (DFS with recursion stack).",
        "starterCode": "let has_cycle edges = (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "Back edge in DFS."
        ],
        "solution": "(* standard three-color DFS *)",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      }
    ]
  },
  {
    "id": "erlang-07",
    "track": "erlang",
    "number": 7,
    "title": "Starting with Erlang",
    "italianTitle": "Introduzione a Erlang",
    "summary": "Atoms, tuples, lists, pattern matching, guards, map/filter/reduce, list comprehensions.",
    "labRefs": [
      "lab3-1",
      "lab3-2"
    ],
    "quiz": [
      {
        "id": "q1",
        "prompt": "In Erlang, variables must…",
        "options": [
          "Start with lowercase",
          "Start with uppercase",
          "Be prefixed with $",
          "Be declared with var"
        ],
        "correctIndex": 1,
        "explanation": "Atoms are lowercase; variables are Uppercase or _."
      },
      {
        "id": "q2",
        "prompt": "`[H|T] = [1,2,3]` binds T to:",
        "options": [
          "[2,3]",
          "3",
          "[1,2]",
          "[1,2,3]"
        ],
        "correctIndex": 0,
        "explanation": "Standard list head/tail pattern."
      }
    ],
    "exercises": [
      {
        "id": "erlang-07-e1",
        "title": "Sum list",
        "prompt": "Implement `sum/1` recursively.",
        "starterCode": "sum([]) -> 0;\nsum([H|T]) -> (* TODO *).\n",
        "language": "erlang",
        "hints": [
          "Classic list recursion."
        ],
        "solution": "sum([]) -> 0;\nsum([H|T]) -> H + sum(T).",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      },
      {
        "id": "erlang-07-e2",
        "title": "Comprehension",
        "prompt": "Write `doubled_evens(Ls)` using list comprehension.",
        "starterCode": "doubled_evens(Ls) ->\n  (* TODO *).\n",
        "language": "erlang",
        "hints": [
          "`[F(X) || X <- Ls, Guard]`."
        ],
        "solution": "doubled_evens(Ls) -> [2*X || X <- Ls, is_integer(X), X rem 2 =:= 0].",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      },
      {
        "id": "erlang-07-e3",
        "title": "Pattern match",
        "prompt": "Function `grade/1` mapping 90+ → excellent, 70+ → good, _ → study.",
        "starterCode": "grade(Score) when is_integer(Score) ->\n  (* TODO *).\n",
        "language": "erlang",
        "hints": [
          "Separate clauses + guards."
        ],
        "solution": "grade(S) when S >= 90 -> excellent;\ngrade(S) when S >= 70 -> good;\ngrade(_) -> study.",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      },
      {
        "id": "erlang-07-e4",
        "title": "Atoms vs tuples",
        "prompt": "Predict: `{ok, 42} = {ok, X}.` and `{error, bad} = {ok, X}.` outcomes.",
        "starterCode": "(* comment answers *)\n",
        "language": "erlang",
        "hints": [
          "Match must succeed.",
          "Second throws badmatch."
        ],
        "solution": "(* X=42 ; second raises badmatch *)",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      }
    ]
  },
  {
    "id": "erlang-08",
    "track": "erlang",
    "number": 8,
    "title": "Actors in Erlang",
    "italianTitle": "Attori in Erlang",
    "summary": "Processes, spawn/send/receive, registered names, and message-passing concurrency.",
    "labRefs": [
      "lab3-3",
      "lab3-4"
    ],
    "quiz": [
      {
        "id": "q1",
        "prompt": "Message sending `Pid ! Msg` is:",
        "options": [
          "Synchronous",
          "Asynchronous",
          "Transactional",
          "Always blocking for sender"
        ],
        "correctIndex": 1,
        "explanation": "Send is async; receive blocks in the target process."
      }
    ],
    "exercises": [
      {
        "id": "erlang-08-e1",
        "title": "Echo process",
        "prompt": "Write `echo_loop/0` replying `{ok, Msg}` to `{echo, From, Msg}`.",
        "starterCode": "echo_loop() ->\n  receive\n    (* TODO *)\n  end.\n",
        "language": "erlang",
        "hints": [
          "Reply then loop.",
          "From ! {ok, Msg}."
        ],
        "solution": "echo_loop() ->\n  receive\n    {echo, From, Msg} -> From ! {ok, Msg}, echo_loop()\n  end.",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      },
      {
        "id": "erlang-08-e2",
        "title": "Spawn",
        "prompt": "Spawn echo and send one message from shell (comment steps).",
        "starterCode": "(* TODO: shell commands as comments *)\n",
        "language": "erlang",
        "hints": [
          "Pid = spawn(fun echo_loop/0).",
          "Pid ! {echo, self(), hi}."
        ],
        "solution": "(* Pid=spawn(...), Pid!{echo,self(),hi}, receive {ok,M}->M end. *)",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      },
      {
        "id": "erlang-08-e3",
        "title": "Register",
        "prompt": "Register server as `my_echo` and send via atom.",
        "starterCode": "register(my_echo, spawn(fun echo_loop/0)).\n",
        "language": "erlang",
        "hints": [
          "Use name instead of Pid."
        ],
        "solution": "my_echo ! {echo, self(), hello}.",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      },
      {
        "id": "erlang-08-e4",
        "title": "Compare OCaml",
        "prompt": "In one comment: Erlang process vs OCaml thread — message passing vs shared memory.",
        "starterCode": "(* TODO *)\n",
        "language": "erlang",
        "hints": [
          "Erlang: no shared mutable state between processes."
        ],
        "solution": "(* Erlang isolates heap per process; sync via messages *)",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      }
    ]
  },
  {
    "id": "erlang-09",
    "track": "erlang",
    "number": 9,
    "title": "Error Handling",
    "italianTitle": "Gestione degli errori",
    "summary": "Links, exit signals, trapping exits, and monitors (link unidirezionali).",
    "labRefs": [
      "lab3-4",
      "lab3-5"
    ],
    "quiz": [
      {
        "id": "q1",
        "prompt": "Monitors differ from links because monitors are:",
        "options": [
          "Bidirectional and always crash both processes",
          "Unidirectional notifications",
          "Only for ETS tables",
          "Compile-time only"
        ],
        "correctIndex": 1,
        "explanation": "Monitor delivers DOWN without linking the monitor's fate to the target."
      }
    ],
    "exercises": [
      {
        "id": "erlang-09-e1",
        "title": "Link",
        "prompt": "Spawn worker linked to self; worker exits with `exit(normal)` — what does parent receive?",
        "starterCode": "(* TODO comment *)\n",
        "language": "erlang",
        "hints": [
          "Link is bidirectional signal."
        ],
        "solution": "(* {'EXIT', Pid, normal} unless trapping *)",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      },
      {
        "id": "erlang-09-e2",
        "title": "trap_exit",
        "prompt": "Set `trap_exit true` and handle `{'EXIT', Pid, Reason}` in loop.",
        "starterCode": "master_loop() ->\n  process_flag(trap_exit, true),\n  receive\n    (* TODO *)\n  end.\n",
        "language": "erlang",
        "hints": [
          "Convert exit to message."
        ],
        "solution": "master_loop() ->\n  process_flag(trap_exit, true),\n  receive\n    {'EXIT', P, R} -> io:format(\"~p ~p~n\", [P, R]), master_loop()\n  end.",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      },
      {
        "id": "erlang-09-e3",
        "title": "Monitor",
        "prompt": "Monitor a pid and print DOWN reason.",
        "starterCode": "watch(Pid) ->\n  Ref = monitor(process, Pid),\n  receive\n    (* TODO *)\n  end.\n",
        "language": "erlang",
        "hints": [
          "{'DOWN', Ref, process, Pid, Reason}."
        ],
        "solution": "watch(Pid) ->\n  Ref = monitor(process, Pid),\n  receive {'DOWN', Ref, process, Pid, R} -> io:format(\"~p~n\", [R]) end.",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      },
      {
        "id": "erlang-09-e4",
        "title": "Restart sketch",
        "prompt": "Pseudocode master restarting worker on `{worker, crash}`.",
        "starterCode": "(* TODO *)\n",
        "language": "erlang",
        "hints": [
          "Spawn new worker on DOWN."
        ],
        "solution": "(* on DOWN -> spawn new worker, link again *)",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      }
    ]
  },
  {
    "id": "erlang-10",
    "track": "erlang",
    "number": 10,
    "title": "Distribution",
    "italianTitle": "Programmazione distribuita",
    "summary": "Nodes, cookies, remote spawn, and distributed name services.",
    "labRefs": [
      "lab4-2",
      "lab4-3"
    ],
    "quiz": [
      {
        "id": "q1",
        "prompt": "Distributed Erlang nodes authenticate with:",
        "options": [
          "SSH keys only",
          "Shared cookie",
          "Database password",
          "Compile flags"
        ],
        "correctIndex": 1,
        "explanation": "Same cookie allows node clustering."
      }
    ],
    "exercises": [
      {
        "id": "erlang-10-e1",
        "title": "Cookie",
        "prompt": "Why must nodes share cookie? One sentence.",
        "starterCode": "(* TODO *)\n",
        "language": "erlang",
        "hints": [
          "Cluster security."
        ],
        "solution": "(* Prevents random nodes joining the cluster *)",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      },
      {
        "id": "erlang-10-e2",
        "title": "rpc:call",
        "prompt": "Write rpc call to `lists:reverse([1,2,3])` on `node2@host`.",
        "starterCode": "(* TODO *)\n",
        "language": "erlang",
        "hints": [
          "rpc:call(Node, Mod, Fun, Args)."
        ],
        "solution": "rpc:call('node2@host', lists, reverse, [[1,2,3]]).",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      },
      {
        "id": "erlang-10-e3",
        "title": "Remote spawn",
        "prompt": "Comment steps to spawn fun on remote node.",
        "starterCode": "(* TODO *)\n",
        "language": "erlang",
        "hints": [
          "spawn(Node, Fun)."
        ],
        "solution": "(* net_kernel:start, spawn('r@h', fun()->ok end) *)",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      },
      {
        "id": "erlang-10-e4",
        "title": "Replication",
        "prompt": "Put to two registered replicas — sketch message protocol.",
        "starterCode": "put(Key, Val) ->\n  (* TODO *)\n.",
        "language": "erlang",
        "hints": [
          "Cast to both.",
          "Get from either."
        ],
        "solution": "put(K,V) -> [R ! {put,K,V} || R <- [store1, store2]], ok.",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      }
    ]
  },
  {
    "id": "erlang-11",
    "track": "erlang",
    "number": 11,
    "title": "Erlang in Action: IRC-lite",
    "italianTitle": "IRC-lite",
    "summary": "Multi-process chat architecture: client, controller, server, group manager.",
    "labRefs": [
      "lab4-5"
    ],
    "quiz": [
      {
        "id": "q1",
        "prompt": "IRC-lite uses many processes because:",
        "options": [
          "Erlang has no functions",
          "Actors isolate state and failures",
          "Lists are forbidden",
          "TCP requires processes"
        ],
        "correctIndex": 1,
        "explanation": "Concurrency model maps cleanly to chat sessions and groups."
      }
    ],
    "exercises": [
      {
        "id": "erlang-11-e1",
        "title": "Client message",
        "prompt": "Define record `#chat{user, text}` and send to server.",
        "starterCode": "(* TODO types + send *)\n",
        "language": "erlang",
        "hints": [
          "Server receives {chat, From, Rec}."
        ],
        "solution": "-record(chat, {user, text}).\nserver ! {chat, self(), #chat{user=u, text=t}}.",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      },
      {
        "id": "erlang-11-e2",
        "title": "Broadcast",
        "prompt": "Server loop forwarding message to all Pids in list.",
        "starterCode": "server_loop(Members) ->\n  receive\n    (* TODO *)\n  end.\n",
        "language": "erlang",
        "hints": [
          "lists:foreach to send."
        ],
        "solution": "server_loop(Ms) ->\n  receive\n    {chat, From, Msg} -> [P ! {msg, From, Msg} || P <- Ms, P =/= From], server_loop(Ms)\n  end.",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      },
      {
        "id": "erlang-11-e3",
        "title": "Register",
        "prompt": "Register chat server and join with `{join, self()}`.",
        "starterCode": "(* TODO *)\n",
        "language": "erlang",
        "hints": [
          "Stable name for clients."
        ],
        "solution": "register(chat_srv, spawn(fun() -> server_loop([]) end)).",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      },
      {
        "id": "erlang-11-e4",
        "title": "Architecture",
        "prompt": "List four process roles in IRC-lite in comments.",
        "starterCode": "(* TODO *)\n",
        "language": "erlang",
        "hints": [
          "Client, controller, server, group mgr."
        ],
        "solution": "(* client, chat_controller, chat_server, group_manager *)",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      }
    ]
  },
  {
    "id": "scala-12",
    "track": "scala",
    "number": 12,
    "title": "Scala Overview",
    "italianTitle": "Panoramica su Scala",
    "summary": "Scala types, pure OO model, case classes, Option, methods vs functions, comprehensions.",
    "labRefs": [
      "lab5-1",
      "lab5-2"
    ],
    "quiz": [
      {
        "id": "q1",
        "prompt": "`val x: Option[Int] = None` — safe access idiomatically uses:",
        "options": [
          "x.get always",
          "pattern match or map/flatMap",
          "null coalescing ??",
          "cast to Int"
        ],
        "correctIndex": 1,
        "explanation": "Option eliminates null; get is unsafe."
      }
    ],
    "exercises": [
      {
        "id": "scala-12-e1",
        "title": "Case class",
        "prompt": "Define `case class Point(x: Int, y: Int)` and `origin`.",
        "starterCode": "case class Point(x: Int, y: Int)\nval origin = (* TODO *)\n",
        "language": "scala",
        "hints": [
          "Automatic apply/unapply."
        ],
        "solution": "val origin = Point(0, 0)",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      },
      {
        "id": "scala-12-e2",
        "title": "Option",
        "prompt": "Write `safeDiv(a: Int, b: Int): Option[Double]`.",
        "starterCode": "def safeDiv(a: Int, b: Int): Option[Double] = ???\n",
        "language": "scala",
        "hints": [
          "b=0 → None."
        ],
        "solution": "def safeDiv(a: Int, b: Int): Option[Double] = if (b == 0) None else Some(a.toDouble / b)",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      },
      {
        "id": "scala-12-e3",
        "title": "Match expr",
        "prompt": "Sealed `Expr` with Num and Add — eval with pattern match.",
        "starterCode": "sealed trait Expr\ncase class Num(n: Int) extends Expr\ncase class Add(a: Expr, b: Expr) extends Expr\ndef eval: Expr => Int = ???\n",
        "language": "scala",
        "hints": [
          "Recursive on Add."
        ],
        "solution": "def eval: Expr => Int = { case Num(n) => n; case Add(a,b) => eval(a)+eval(b) }",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      },
      {
        "id": "scala-12-e4",
        "title": "For-comprehension",
        "prompt": "Rewrite `for (x <- List(1,2); y <- List(10)) yield x+y`.",
        "starterCode": "val r = (* TODO *)\n",
        "language": "scala",
        "hints": [
          "Cartesian product.",
          "Result length 2."
        ],
        "solution": "val r = List(1,2).flatMap(x => List(10).map(y => x+y))",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      }
    ]
  },
  {
    "id": "scala-13",
    "track": "scala",
    "number": 13,
    "title": "Traits",
    "italianTitle": "Trait",
    "summary": "Mixin composition, observer pattern, stackable traits, and trait construction.",
    "labRefs": [
      "lab5-8"
    ],
    "quiz": [
      {
        "id": "q1",
        "prompt": "Stackable traits are primarily used for:",
        "options": [
          "Memory management",
          "Composable behavior layers",
          "Parsing only",
          "Disabling override"
        ],
        "correctIndex": 1,
        "explanation": "Layer cross-cutting behavior without deep inheritance trees."
      }
    ],
    "exercises": [
      {
        "id": "scala-13-e1",
        "title": "Trait mixin",
        "prompt": "Trait `Timestamped` overriding `toString` with prefix.",
        "starterCode": "trait Timestamped { self =>\n  abstract override def toString: String = s\"[@${System.currentTimeMillis}] ${super.toString}\"\n}\n",
        "language": "scala",
        "hints": [
          "Need parent with toString."
        ],
        "solution": "class Item(val n: Int) extends AnyRef { override def toString = s\"Item($n)\" }",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      },
      {
        "id": "scala-13-e2",
        "title": "Stackable",
        "prompt": "Order `new Core with Audit with Log` — which `start()` runs?",
        "starterCode": "(* comment *)\n",
        "language": "scala",
        "hints": [
          "Linearization rightmost first."
        ],
        "solution": "(* Log.start calls super → Audit → Core *)",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      },
      {
        "id": "scala-13-e3",
        "title": "Observer",
        "prompt": "Sketch `Subject` with `attach` and `notify`.",
        "starterCode": "trait Observer { def update(): Unit }\nclass Subject {\n  // TODO\n}\n",
        "language": "scala",
        "hints": [
          "List of observers."
        ],
        "solution": "private var obs = List.empty[Observer]\ndef attach(o: Observer) = obs = o :: obs\ndef notify() = obs.foreach(_.update())",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      },
      {
        "id": "scala-13-e4",
        "title": "vs Java interface",
        "prompt": "One sentence: Scala trait with concrete method vs Java 8 default.",
        "starterCode": "(* TODO *)\n",
        "language": "scala",
        "hints": [
          "Linearization vs single inheritance."
        ],
        "solution": "(* Scala resolves diamond with linearization; Java class wins over interface default *)",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      }
    ]
  },
  {
    "id": "scala-14",
    "track": "scala",
    "number": 14,
    "title": "Advanced OO & Linearization",
    "italianTitle": "OO avanzato e linearizzazione",
    "summary": "override, linearization algorithm (C3), abstract type members, companion objects.",
    "labRefs": [
      "lab5-7"
    ],
    "quiz": [
      {
        "id": "q1",
        "prompt": "In `class C extends T1 with T2`, trait method precedence (default) favors:",
        "options": [
          "T1 always",
          "Rightmost trait (T2) among traits",
          "Random",
          "JVM order"
        ],
        "correctIndex": 1,
        "explanation": "Rightmost trait wins conflicts in the trait prefix."
      }
    ],
    "exercises": [
      {
        "id": "scala-14-e1",
        "title": "Linearization",
        "prompt": "Predict `greet` for `class D extends A with B with C` each defining greet.",
        "starterCode": "(* TODO *)\n",
        "language": "scala",
        "hints": [
          "Rightmost trait wins."
        ],
        "solution": "(* C.greet if all override same *)",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      },
      {
        "id": "scala-14-e2",
        "title": "override",
        "prompt": "Add `override` to fix compile error in trait stack.",
        "starterCode": "trait A { def n = 1 }\ntrait B extends A { override def n = 2 }\n",
        "language": "scala",
        "hints": [
          "Concrete override needs keyword."
        ],
        "solution": "trait B extends A { override def n = 2 }",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      },
      {
        "id": "scala-14-e3",
        "title": "Companion",
        "prompt": "Object `Matrix` factory `zeros(rows, cols)`.",
        "starterCode": "class Matrix private (val rows: Int, val cols: Int)\nobject Matrix {\n  def zeros(r: Int, c: Int): Matrix = ???\n}\n",
        "language": "scala",
        "hints": [
          "Private ctor + factory on companion."
        ],
        "solution": "def zeros(r: Int, c: Int) = new Matrix(r, c)",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      },
      {
        "id": "scala-14-e4",
        "title": "Abstract type",
        "prompt": "Trait with `type Elem` and `def zero: Elem`.",
        "starterCode": "trait Monoid {\n  type Elem\n  def zero: Elem\n  def combine(a: Elem, b: Elem): Elem\n}\n",
        "language": "scala",
        "hints": [
          "Hide concrete type."
        ],
        "solution": "object IntAdd extends Monoid { type Elem = Int; def zero = 0; def combine(a,b)=a+b }",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      }
    ]
  },
  {
    "id": "scala-15",
    "track": "scala",
    "number": 15,
    "title": "DSLs",
    "italianTitle": "Domain Specific Languages",
    "summary": "Internal vs external DSLs, embedded DSLs, and fluent APIs in Scala.",
    "labRefs": [
      "lab6-1"
    ],
    "quiz": [
      {
        "id": "q1",
        "prompt": "An internal DSL is:",
        "options": [
          "Parsed by yacc externally",
          "Embedded in Scala syntax",
          "Always XML",
          "Only for SQL"
        ],
        "correctIndex": 1,
        "explanation": "Host language constructs form the DSL."
      }
    ],
    "exercises": [
      {
        "id": "scala-15-e1",
        "title": "Fluent builder",
        "prompt": "Method chaining `grid.row(1,2).row(3,4).build()`.",
        "starterCode": "class Grid { def row(ns: Int*): Grid = this; def build(): Unit = () }\n",
        "language": "scala",
        "hints": [
          "Return this."
        ],
        "solution": "class Grid { def row(ns: Int*): Grid = { /* add */ this }; def build() = () }",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      },
      {
        "id": "scala-15-e2",
        "title": "Implicit (sketch)",
        "prompt": "Comment when implicit conversion helps DSL syntax.",
        "starterCode": "(* TODO *)\n",
        "language": "scala",
        "hints": [
          "Wrap Int in Lit(_)."
        ],
        "solution": "(* implicit def intToLit(n:Int)=Lit(n) enables 1 + 2 in DSL *)",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      },
      {
        "id": "scala-15-e3",
        "title": "Internal vs external",
        "prompt": "Compare SQL string DSL vs Scala-embedded payroll DSL.",
        "starterCode": "(* TODO *)\n",
        "language": "scala",
        "hints": [
          "Internal = typechecked host syntax."
        ],
        "solution": "(* external parsed at runtime; internal uses Scala types *)",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      },
      {
        "id": "scala-15-e4",
        "title": "By-name",
        "prompt": "Use by-name param for `repeat(n)(body)`.",
        "starterCode": "def repeat(n: Int)(body: => Unit): Unit = ???\n",
        "language": "scala",
        "hints": [
          "Evaluate body each iteration."
        ],
        "solution": "def repeat(n: Int)(body: => Unit) = for (_ <- 1 to n) body",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      }
    ]
  },
  {
    "id": "scala-16",
    "track": "scala",
    "number": 16,
    "title": "Parser Combinators",
    "italianTitle": "Parser combinator",
    "summary": "Combinator parsers, grammars, parsing payroll DSL, and semantics.",
    "labRefs": [
      "lab6-2",
      "lab6-4"
    ],
    "quiz": [
      {
        "id": "q1",
        "prompt": "Parser combinator `p ~ q` typically means:",
        "options": [
          "Parse p then q sequentially",
          "Parse p or q",
          "Parse p many times",
          "Skip q"
        ],
        "correctIndex": 0,
        "explanation": "Sequencing combinator — critical for grammars."
      }
    ],
    "exercises": [
      {
        "id": "scala-16-e1",
        "title": "Regex parser",
        "prompt": "Parser `digits` for one or more digits as Int.",
        "starterCode": "import scala.util.parsing.combinator._\nobject P extends RegexParsers {\n  def digits: Parser[Int] = ???\n}\n",
        "language": "scala",
        "hints": [
          "\"\"\"\\d+\"\"\".r ^^ (_.toInt)"
        ],
        "solution": "def digits: Parser[Int] = \"\"\"\\d+\"\"\".r ^^ (_.toInt)",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      },
      {
        "id": "scala-16-e2",
        "title": "Sequence",
        "prompt": "Parse two ints separated by comma: `pair`.",
        "starterCode": "def pair: Parser[(Int,Int)] = ???\n",
        "language": "scala",
        "hints": [
          "Use ~ operator."
        ],
        "solution": "def pair: Parser[(Int,Int)] = digits ~ \",\" ~ digits ^^ { case a ~ _ ~ b => (a,b) }",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      },
      {
        "id": "scala-16-e3",
        "title": "Eval AST",
        "prompt": "Given `sealed trait E; case class Num(n:Int); case class Add(a:E,b:E)`, write eval.",
        "starterCode": "def eval(e: E): Int = ???\n",
        "language": "scala",
        "hints": [
          "Match like OCaml."
        ],
        "solution": "def eval(e: E): Int = e match { case Num(n)=>n; case Add(a,b)=>eval(a)+eval(b) }",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      },
      {
        "id": "scala-16-e4",
        "title": "Payroll line",
        "prompt": "Sketch grammar for `name = expr` assignment line.",
        "starterCode": "def stmt: Parser[???] = ???\n",
        "language": "scala",
        "hints": [
          "ident ~ \"=\" ~ expr."
        ],
        "solution": "def ident: Parser[String] = \"\"\"\\w+\"\"\".r",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      }
    ]
  }
];
