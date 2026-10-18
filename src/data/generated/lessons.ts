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
    "content": "## Why functional programming?\n\nIn **programmazione funzionale**, functions are **first-class**: they can be passed, returned, and stored like any value. Control flow relies heavily on **recursion** (ricorsione) instead of mutable loops. Many FP languages discourage **side effects** (effetti collaterali): prefer expressions over statements.\n\n## λ-Calculus (calcolo lambda)\n\nChurch's λ-calculus models computation with:\n- **Variables** and **constants**\n- **Abstraction** `λx.M` (in OCaml: `fun x -> M`)\n- **Application** `(M N)`\n\nEverything is a function. Currying is built in: `fun x y -> x + y` is really `fun x -> fun y -> x + y`.\n\n## OCaml functions & pattern matching\n\n```ocaml\nlet rec fact n =\n  if n <= 1 then 1 else n * fact (n - 1)\n\nlet rec fib = function\n  | 0 -> 0\n  | 1 -> 1\n  | n -> fib (n - 1) + fib (n - 2)\n```\n\n**Pattern matching** on constructors is the idiomatic way to destructure data.\n\n## Tail recursion (ricorsione di coda)\n\nA call is *tail* if it is the last operation. The compiler reuses stack frames:\n\n```ocaml\nlet fact n =\n  let rec aux acc = function\n    | 0 -> acc\n    | k -> aux (k * acc) (k - 1)\n  in aux 1 n\n```\n\n## Towers of Hanoi (Torre di Hanoi)\n\nMove `n` disks from source to target using auxiliary peg — classic divide-and-conquer recursion.",
    "codeExamples": [
      {
        "title": "Tail-recursive sum",
        "language": "ocaml",
        "code": "let sum lst =\n  let rec go acc = function [] -> acc | h :: t -> go (acc + h) t in\n  go 0 lst"
      }
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
        "title": "Warm-up: recursion",
        "prompt": "Write `length : 'a list -> int` without using `List.length`.",
        "starterCode": "let length lst =\n  (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "Empty list has length 0.",
          "Non-empty: 1 + length tail."
        ],
        "solution": "let rec length = function [] -> 0 | _ :: t -> 1 + length t",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-01-e2",
        "title": "Pattern matching",
        "prompt": "Write `is_sorted : int list -> bool` checking non-decreasing order.",
        "starterCode": "let is_sorted lst =\n  (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "Single element lists are sorted.",
          "Compare adjacent pairs recursively."
        ],
        "solution": "let rec is_sorted = function\n  | [] | [_] -> true\n  | a :: (b :: _ as t) -> a <= b && is_sorted (b :: t)",
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
    "content": "## Primitive types\n\n`bool`, `int`, `float`, `char`, `string` — plus structured types.\n\n## Lists (liste)\n\nThe workhorse type: `'a list` is either `[]` or `h :: t`.\n\n```ocaml\nlet rec length = function [] -> 0 | _ :: t -> 1 + length t\nlet rec append l1 l2 = match l1 with [] -> l2 | h :: t -> h :: append t l2\n```\n\n## Tuples, records, arrays\n\n- **Tuples**: `(1, \"a\")` — anonymous product types\n- **Records**: named fields `{ name = \"Be\"; number = 4 }`\n- **Arrays**: mutable `Array.make n x`\n\n## Variants (tipi algebrici)\n\n```ocaml\ntype temperature =\n  | Celsius of float\n  | Fahrenheit of float\n  | Kelvin of float\n\nlet to_celsius = function\n  | Celsius c -> c\n  | Fahrenheit f -> (f -. 32.) *. 5. /. 9.\n  | Kelvin k -> k -. 273.15\n```\n\nVariants + pattern matching replace many class hierarchies.",
    "codeExamples": [
      {
        "title": "Variant for shapes",
        "language": "ocaml",
        "code": "type shape = Circle of float | Rect of float * float\nlet area = function\n  | Circle r -> Float.pi *. r *. r\n  | Rect (w, h) -> w *. h"
      }
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
        "title": "Warm-up: recursion",
        "prompt": "Write `length : 'a list -> int` without using `List.length`.",
        "starterCode": "let length lst =\n  (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "Empty list has length 0.",
          "Non-empty: 1 + length tail."
        ],
        "solution": "let rec length = function [] -> 0 | _ :: t -> 1 + length t",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-02-e2",
        "title": "Pattern matching",
        "prompt": "Write `is_sorted : int list -> bool` checking non-decreasing order.",
        "starterCode": "let is_sorted lst =\n  (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "Single element lists are sorted.",
          "Compare adjacent pairs recursively."
        ],
        "solution": "let rec is_sorted = function\n  | [] | [_] -> true\n  | a :: (b :: _ as t) -> a <= b && is_sorted (b :: t)",
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
    "content": "## Module system (sistema dei moduli)\n\nOCaml separates **implementation** from **interface**:\n\n```ocaml\nmodule StackImpl = struct\n  type 'a t = 'a list\n  let empty = []\n  let push x s = x :: s\n  let pop = function [] -> None | h :: t -> Some (h, t)\nend\n\nmodule type STACK = sig\n  type 'a t\n  val empty : 'a t\n  val push : 'a -> 'a t -> 'a t\n  val pop : 'a t -> ('a * 'a t) option\nend\n```\n\n## Signatures & abstraction\n\nA **signature** (`sig ... end`) hides representation details — clients cannot construct invalid stacks.\n\n## Functors\n\nFunctors are modules parameterized by other modules:\n\n```ocaml\nmodule MakeStack (Elt : sig type t end) = struct\n  type t = Elt.t list\n  let empty = []\n  let push x s = x :: s\nend\n```\n\nUse functors to reuse algorithms (e.g. Polish calculator over any stack implementation).",
    "codeExamples": [
      {
        "title": "Functor sketch",
        "language": "ocaml",
        "code": "module Id = struct type t = int let zero = 0 end\nmodule Add = functor (R : sig type t val zero : t end) -> struct\n  let add x y = x + y  (* exam: generalize with R's operations *)\nend"
      }
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
        "title": "Warm-up: recursion",
        "prompt": "Write `length : 'a list -> int` without using `List.length`.",
        "starterCode": "let length lst =\n  (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "Empty list has length 0.",
          "Non-empty: 1 + length tail."
        ],
        "solution": "let rec length = function [] -> 0 | _ :: t -> 1 + length t",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-03-e2",
        "title": "Pattern matching",
        "prompt": "Write `is_sorted : int list -> bool` checking non-decreasing order.",
        "starterCode": "let is_sorted lst =\n  (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "Single element lists are sorted.",
          "Compare adjacent pairs recursively."
        ],
        "solution": "let rec is_sorted = function\n  | [] | [_] -> true\n  | a :: (b :: _ as t) -> a <= b && is_sorted (b :: t)",
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
    "content": "## Polymorphism taxonomy\n\n- **Parametric**: generic over types (`'a list`)\n- **Ad hoc**: overloading (not native in core OCaml)\n- **Subtype**: objects/classes (OCaml has a separate object system)\n\n## Type inference\n\nOCaml infers principal types. **Weak type variables** (`'a`) appear when values are mutable or used heterogeneously.\n\n## Polymorphic ADT example: Stack\n\n```ocaml\nmodule PolyStack = struct\n  type 'a t = 'a list\n  let empty = []\n  let push x s = x :: s\n  let pop = function [] -> None | h :: t -> Some (h, t)\nend\n```\n\n## Sorting polymorphically\n\nQuicksort on lists works for any ordered type:\n\n```ocaml\nlet rec quicksort = function\n  | [] -> []\n  | pivot :: rest ->\n      let left, right = List.partition (fun x -> x <= pivot) rest in\n      quicksort left @ pivot :: quicksort right\n```",
    "codeExamples": [
      {
        "title": "Polymorphic map",
        "language": "ocaml",
        "code": "let rec map f = function [] -> [] | h :: t -> f h :: map f t"
      }
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
        "title": "Warm-up: recursion",
        "prompt": "Write `length : 'a list -> int` without using `List.length`.",
        "starterCode": "let length lst =\n  (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "Empty list has length 0.",
          "Non-empty: 1 + length tail."
        ],
        "solution": "let rec length = function [] -> 0 | _ :: t -> 1 + length t",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-04-e2",
        "title": "Pattern matching",
        "prompt": "Write `is_sorted : int list -> bool` checking non-decreasing order.",
        "starterCode": "let is_sorted lst =\n  (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "Single element lists are sorted.",
          "Compare adjacent pairs recursively."
        ],
        "solution": "let rec is_sorted = function\n  | [] | [_] -> true\n  | a :: (b :: _ as t) -> a <= b && is_sorted (b :: t)",
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
    "content": "## Currying & partial application\n\n`add` has type `int -> int -> int`. Supply one argument to get a function waiting for the rest:\n\n```ocaml\nlet add x y = x + y\nlet inc = add 1        (* int -> int *)\nList.map (add 3) [1;2;3]  (* [4;5;6] *)\n```\n\n## Map, filter, fold\n\n| Name | Type idea | Purpose |\n|------|-----------|---------|\n| `map` | `('a -> 'b) -> 'a list -> 'b list` | transform each element |\n| `filter` | `('a -> bool) -> 'a list -> 'a list` | keep satisfying elements |\n| `fold_left` | `('b -> 'a -> 'b) -> 'b -> 'a list -> 'b` | accumulate left-to-right |\n\n```ocaml\nList.fold_left (+) 0 [1;2;3]  (* 6 *)\nList.filter (fun x -> x mod 2 = 0) [1..10]\n```\n\nImplement `map` and `fold` yourself to internalize exam patterns.",
    "codeExamples": [
      {
        "title": "Fold from scratch",
        "language": "ocaml",
        "code": "let rec fold_left f acc = function\n  | [] -> acc\n  | h :: t -> fold_left f (f acc h) t"
      }
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
        "title": "Warm-up: recursion",
        "prompt": "Write `length : 'a list -> int` without using `List.length`.",
        "starterCode": "let length lst =\n  (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "Empty list has length 0.",
          "Non-empty: 1 + length tail."
        ],
        "solution": "let rec length = function [] -> 0 | _ :: t -> 1 + length t",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-05-e2",
        "title": "Pattern matching",
        "prompt": "Write `is_sorted : int list -> bool` checking non-decreasing order.",
        "starterCode": "let is_sorted lst =\n  (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "Single element lists are sorted.",
          "Compare adjacent pairs recursively."
        ],
        "solution": "let rec is_sorted = function\n  | [] | [_] -> true\n  | a :: (b :: _ as t) -> a <= b && is_sorted (b :: t)",
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
    "content": "## Graphs for exam-style problems\n\nRepresent a **directed graph** as adjacency lists or a record with nodes and edges.\n\n```ocaml\ntype 'a graph = {\n  nodes : 'a list;\n  edges : ('a * 'a) list;\n}\n```\n\n## DFS (Depth First Search)\n\nDFS explores as deep as possible before backtracking — use a **visited** set and recursion or an explicit stack:\n\n```ocaml\nlet neighbors g v =\n  List.filter_map (fun (a, b) -> if a = v then Some b else None) g.edges\n\nlet rec dfs g v visited =\n  if List.mem v visited then visited\n  else\n    let visited = v :: visited in\n    List.fold_left (fun acc u -> dfs g u acc) visited (neighbors g v)\n```\n\nSocial networks (Lab 2) are graphs: nodes = people, edges = relationships.",
    "codeExamples": [
      {
        "title": "DFS reachability",
        "language": "ocaml",
        "code": "let reachable g start target =\n  let rec visit seen v =\n    if v = target then true\n    else if List.mem v seen then false\n    else List.exists (visit (v :: seen)) (neighbors g v)\n  in visit [] start"
      }
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
        "title": "Warm-up: recursion",
        "prompt": "Write `length : 'a list -> int` without using `List.length`.",
        "starterCode": "let length lst =\n  (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "Empty list has length 0.",
          "Non-empty: 1 + length tail."
        ],
        "solution": "let rec length = function [] -> 0 | _ :: t -> 1 + length t",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "ocaml-06-e2",
        "title": "Pattern matching",
        "prompt": "Write `is_sorted : int list -> bool` checking non-decreasing order.",
        "starterCode": "let is_sorted lst =\n  (* TODO *)\n",
        "language": "ocaml",
        "hints": [
          "Single element lists are sorted.",
          "Compare adjacent pairs recursively."
        ],
        "solution": "let rec is_sorted = function\n  | [] | [_] -> true\n  | a :: (b :: _ as t) -> a <= b && is_sorted (b :: t)",
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
    "content": "## Erlang data model\n\n- **Numbers** and **atoms** (`ok`, `error`, `hello`)\n- **Tuples** `{ok, 42}`, **lists** `[1,2,3|Tail]`\n- **Variables** start with uppercase; **= is pattern matching**, not assignment\n\n```erlang\nfactorial(0) -> 1;\nfactorial(N) when N > 0 -> N * factorial(N - 1).\n```\n\n## Guards\n\nGuard sequences (`when`) refine clauses without nested `if`.\n\n## Higher-order list processing\n\n`lists:map/2`, `lists:filter/2`, `lists:foldl/3` mirror ML. **List comprehensions**:\n\n```erlang\n[X*X || X <- Lists, X rem 2 =:= 0].\n```",
    "codeExamples": [
      {
        "title": "List comprehension",
        "language": "erlang",
        "code": "squared_evens(Ls) -> [X*X || X <- Ls, is_integer(X), X rem 2 =:= 0]."
      }
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
        "title": "List processing",
        "prompt": "Implement `sum/1` using recursion (no lists:sum).",
        "starterCode": "sum(L) ->\n  % TODO\n.",
        "language": "erlang",
        "hints": [
          "Base case empty list.",
          "Head + sum of tail."
        ],
        "solution": "sum([]) -> 0;\nsum([H|T]) -> H + sum(T).",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      },
      {
        "id": "erlang-07-e2",
        "title": "Guards",
        "prompt": "Write `classify/1` returning atom positive, negative, or zero.",
        "starterCode": "classify(N) when is_integer(N) ->\n  % TODO\n.",
        "language": "erlang",
        "hints": [
          "Use separate clauses with guards.",
          "0 is its own case."
        ],
        "solution": "classify(N) when N > 0 -> positive;\nclassify(N) when N < 0 -> negative;\nclassify(0) -> zero.",
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
    "content": "## Actor model\n\nNo shared mutable state: processes communicate by **asynchronous messages**.\n\n```erlang\nPid = spawn(fun() -> receive {hello, From} -> From ! {reply, hi} end end),\nPid ! {hello, self()},\nreceive {reply, Msg} -> io:format(\"~p~n\", [Msg]) end.\n```\n\n## spawn / send / receive\n\n- `spawn(Fun)` creates a process\n- `Pid ! Msg` sends asynchronously\n- `receive ... end` blocks until a matching message\n\n## Registered names\n\n`register(Name, Pid)` gives stable aliases — used in echo servers and IRC-lite.",
    "codeExamples": [
      {
        "title": "Spawn and reply",
        "language": "erlang",
        "code": "loop() ->\n  receive\n    {ping, From} -> From ! pong, loop();\n    stop -> ok\n  end."
      }
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
        "title": "List processing",
        "prompt": "Implement `sum/1` using recursion (no lists:sum).",
        "starterCode": "sum(L) ->\n  % TODO\n.",
        "language": "erlang",
        "hints": [
          "Base case empty list.",
          "Head + sum of tail."
        ],
        "solution": "sum([]) -> 0;\nsum([H|T]) -> H + sum(T).",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      },
      {
        "id": "erlang-08-e2",
        "title": "Guards",
        "prompt": "Write `classify/1` returning atom positive, negative, or zero.",
        "starterCode": "classify(N) when is_integer(N) ->\n  % TODO\n.",
        "language": "erlang",
        "hints": [
          "Use separate clauses with guards.",
          "0 is its own case."
        ],
        "solution": "classify(N) when N > 0 -> positive;\nclassify(N) when N < 0 -> negative;\nclassify(0) -> zero.",
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
    "content": "## Links vs monitors\n\n- **link/1**: bidirectional — if one dies, the other gets an exit signal\n- **monitor/2**: unidirectional notification (`{'DOWN', Ref, process, Pid, Reason}`)\n\n## Trapping exits\n\n`process_flag(trap_exit, true)` lets a process convert crashes into messages instead of dying immediately — basis of supervisors (master/slave labs).\n\n## Error handling pattern\n\nLet linked workers fail; master traps exits, logs, and **restarts** the worker (see Lab 4 master-slave).",
    "codeExamples": [
      {
        "title": "Monitor",
        "language": "erlang",
        "code": "Ref = monitor(process, Pid),\nreceive\n  {'DOWN', Ref, process, Pid, Reason} -> io:format(\"~p~n\", [Reason])\nend."
      }
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
        "title": "List processing",
        "prompt": "Implement `sum/1` using recursion (no lists:sum).",
        "starterCode": "sum(L) ->\n  % TODO\n.",
        "language": "erlang",
        "hints": [
          "Base case empty list.",
          "Head + sum of tail."
        ],
        "solution": "sum([]) -> 0;\nsum([H|T]) -> H + sum(T).",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      },
      {
        "id": "erlang-09-e2",
        "title": "Guards",
        "prompt": "Write `classify/1` returning atom positive, negative, or zero.",
        "starterCode": "classify(N) when is_integer(N) ->\n  % TODO\n.",
        "language": "erlang",
        "hints": [
          "Use separate clauses with guards.",
          "0 is its own case."
        ],
        "solution": "classify(N) when N > 0 -> positive;\nclassify(N) when N < 0 -> negative;\nclassify(0) -> zero.",
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
    "content": "## Distributed Erlang\n\nNodes connect with the same **cookie**:\n\n```erlang\nnet_kernel:start([mynode@localhost]),\nrpc:call(othernode@host, module, function, [Args]).\n```\n\n## Remote spawn\n\n`spawn(Node, Fun)` starts work elsewhere — used in replicated key-value stores (Lab 4).\n\n## Design cautions\n\nUpdates must reach all replicas; lookups can hit any replica; network partitions require careful testing.",
    "codeExamples": [
      {
        "title": "RPC call",
        "language": "erlang",
        "code": "rpc:call('node2@host', erlang, list_to_atom, [\"hello\"])."
      }
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
        "title": "List processing",
        "prompt": "Implement `sum/1` using recursion (no lists:sum).",
        "starterCode": "sum(L) ->\n  % TODO\n.",
        "language": "erlang",
        "hints": [
          "Base case empty list.",
          "Head + sum of tail."
        ],
        "solution": "sum([]) -> 0;\nsum([H|T]) -> H + sum(T).",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      },
      {
        "id": "erlang-10-e2",
        "title": "Guards",
        "prompt": "Write `classify/1` returning atom positive, negative, or zero.",
        "starterCode": "classify(N) when is_integer(N) ->\n  % TODO\n.",
        "language": "erlang",
        "hints": [
          "Use separate clauses with guards.",
          "0 is its own case."
        ],
        "solution": "classify(N) when N > 0 -> positive;\nclassify(N) when N < 0 -> negative;\nclassify(0) -> zero.",
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
    "content": "## IRC-lite architecture\n\nTypical layers:\n1. **Client** — user I/O\n2. **Chat controller** — session routing\n3. **Chat server** — channel state\n4. **Group manager** — membership\n\nProcesses exchange structured messages; names (`register`) stabilize addresses.\n\n## Exam angle\n\nRe-implement slices: echo with hidden process, counting server, or P2P channel propagation (Lab 4 ex. 5).",
    "codeExamples": [
      {
        "title": "Registered echo",
        "language": "erlang",
        "code": "register(chat_server, spawn(fun server_loop/0))."
      }
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
        "title": "List processing",
        "prompt": "Implement `sum/1` using recursion (no lists:sum).",
        "starterCode": "sum(L) ->\n  % TODO\n.",
        "language": "erlang",
        "hints": [
          "Base case empty list.",
          "Head + sum of tail."
        ],
        "solution": "sum([]) -> 0;\nsum([H|T]) -> H + sum(T).",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      },
      {
        "id": "erlang-11-e2",
        "title": "Guards",
        "prompt": "Write `classify/1` returning atom positive, negative, or zero.",
        "starterCode": "classify(N) when is_integer(N) ->\n  % TODO\n.",
        "language": "erlang",
        "hints": [
          "Use separate clauses with guards.",
          "0 is its own case."
        ],
        "solution": "classify(N) when N > 0 -> positive;\nclassify(N) when N < 0 -> negative;\nclassify(0) -> zero.",
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
    "content": "## Scala: scalable language\n\nRuns on JVM; mixes **OO** and **functional** styles. Everything is an object (no static primitives).\n\n```scala\nobject Hello {\n  def main(args: Array[String]): Unit =\n    println(\"Hello, world!\")\n}\n```\n\n## Case classes & Option\n\n```scala\ncase class Person(name: String, age: Int)\nsealed trait Option[+A]\ncase object None extends Option[Nothing]\ncase class Some[+A](value: A) extends Option[A]\n```\n\nAvoid `null` — use `Option`.\n\n## Methods vs functions\n\n`def` defines methods; eta-expansion turns them into functions: `list.map(inc _)`.",
    "codeExamples": [
      {
        "title": "Case class + match",
        "language": "scala",
        "code": "sealed trait Expr\ncase class Num(n: Int) extends Expr\ncase class Add(a: Expr, b: Expr) extends Expr"
      }
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
        "title": "Collections",
        "prompt": "Implement `sum(nums: List[Int]): Int` without `.sum`.",
        "starterCode": "def sum(nums: List[Int]): Int = {\n  // TODO\n}",
        "language": "scala",
        "hints": [
          "Use pattern matching on lists.",
          "Tail recursion optional."
        ],
        "solution": "def sum(nums: List[Int]): Int = nums match {\n  case Nil => 0\n  case h :: t => h + sum(t)\n}",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      },
      {
        "id": "scala-12-e2",
        "title": "Option",
        "prompt": "Write `firstPositive(nums: List[Int]): Option[Int]`.",
        "starterCode": "def firstPositive(nums: List[Int]): Option[Int] = {\n  // TODO\n}",
        "language": "scala",
        "hints": [
          "Return None if none positive.",
          "Scan left to right."
        ],
        "solution": "def firstPositive(nums: List[Int]): Option[Int] =\n  nums.find(_ > 0)",
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
    "content": "## Traits as mixins\n\n```scala\ntrait Logging { self =>\n  def log(msg: String): Unit = println(s\"[log] $msg\")\n}\n\nclass Service extends Logging {\n  def run(): Unit = log(\"running\")\n}\n```\n\n## Stackable traits\n\nOrder matters: `new Service with Audit with Metrics` — each trait wraps behavior.\n\n## Observer pattern\n\nSubjects notify registered observers — classic exam trait composition question.",
    "codeExamples": [
      {
        "title": "Stackable trait",
        "language": "scala",
        "code": "trait Core { def work: String = \"core\" }\ntrait Decor extends Core { override def work = super.work + \"+decor\" }"
      }
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
        "title": "Collections",
        "prompt": "Implement `sum(nums: List[Int]): Int` without `.sum`.",
        "starterCode": "def sum(nums: List[Int]): Int = {\n  // TODO\n}",
        "language": "scala",
        "hints": [
          "Use pattern matching on lists.",
          "Tail recursion optional."
        ],
        "solution": "def sum(nums: List[Int]): Int = nums match {\n  case Nil => 0\n  case h :: t => h + sum(t)\n}",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      },
      {
        "id": "scala-13-e2",
        "title": "Option",
        "prompt": "Write `firstPositive(nums: List[Int]): Option[Int]`.",
        "starterCode": "def firstPositive(nums: List[Int]): Option[Int] = {\n  // TODO\n}",
        "language": "scala",
        "hints": [
          "Return None if none positive.",
          "Scan left to right."
        ],
        "solution": "def firstPositive(nums: List[Int]): Option[Int] =\n  nums.find(_ > 0)",
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
    "content": "## Linearization (algoritmo di linearizzazione)\n\nScala resolves **diamond inheritance** with C3 linearization. Method lookup follows the linear order.\n\n```scala\ntrait A { def greet = \"A\" }\ntrait B extends A { override def greet = \"B\" }\ntrait C extends A { override def greet = \"C\" }\nclass D extends B with C  // greet from C (rightmost wins among traits)\n```\n\n## `override` keyword\n\nRequired when overriding concrete members. **Abstract type members** can be refined in subclasses.\n\n## Companion objects\n\nSame name as class — factory methods and implicit scope:\n\n```scala\nobject Matrix { def zeros(rows: Int, cols: Int): Matrix = ??? }\n```",
    "codeExamples": [
      {
        "title": "Linearization demo",
        "language": "scala",
        "code": "class Z extends X with Y  // method resolution follows linearization order"
      }
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
        "title": "Collections",
        "prompt": "Implement `sum(nums: List[Int]): Int` without `.sum`.",
        "starterCode": "def sum(nums: List[Int]): Int = {\n  // TODO\n}",
        "language": "scala",
        "hints": [
          "Use pattern matching on lists.",
          "Tail recursion optional."
        ],
        "solution": "def sum(nums: List[Int]): Int = nums match {\n  case Nil => 0\n  case h :: t => h + sum(t)\n}",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      },
      {
        "id": "scala-14-e2",
        "title": "Option",
        "prompt": "Write `firstPositive(nums: List[Int]): Option[Int]`.",
        "starterCode": "def firstPositive(nums: List[Int]): Option[Int] = {\n  // TODO\n}",
        "language": "scala",
        "hints": [
          "Return None if none positive.",
          "Scan left to right."
        ],
        "solution": "def firstPositive(nums: List[Int]): Option[Int] =\n  nums.find(_ > 0)",
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
    "content": "## Internal vs external DSL\n\n- **Internal**: embedded in host language (Scala) — type-checked, IDE support\n- **External**: separate grammar parsed by combinator or parser generator\n\n## Embedded DSL techniques\n\n- Implicit conversions (use sparingly)\n- By-name parameters\n- Infix methods for readability\n\n```scala\ncase class Money(amount: BigDecimal) {\n  def +(other: Money): Money = Money(amount + other.amount)\n}\n```\n\nLab 6 calculator DSL extends expressions with variables and assignment.",
    "codeExamples": [
      {
        "title": "Fluent DSL",
        "language": "scala",
        "code": "class Grid { def row(values: Int*): Grid = this; def build(): Unit = () }"
      }
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
        "title": "Collections",
        "prompt": "Implement `sum(nums: List[Int]): Int` without `.sum`.",
        "starterCode": "def sum(nums: List[Int]): Int = {\n  // TODO\n}",
        "language": "scala",
        "hints": [
          "Use pattern matching on lists.",
          "Tail recursion optional."
        ],
        "solution": "def sum(nums: List[Int]): Int = nums match {\n  case Nil => 0\n  case h :: t => h + sum(t)\n}",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      },
      {
        "id": "scala-15-e2",
        "title": "Option",
        "prompt": "Write `firstPositive(nums: List[Int]): Option[Int]`.",
        "starterCode": "def firstPositive(nums: List[Int]): Option[Int] = {\n  // TODO\n}",
        "language": "scala",
        "hints": [
          "Return None if none positive.",
          "Scan left to right."
        ],
        "solution": "def firstPositive(nums: List[Int]): Option[Int] =\n  nums.find(_ > 0)",
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
    "content": "## Parser combinators (combinatori di parser)\n\nBuilt from small parsers combined with `flatMap`, `map`, `| |`:\n\n```scala\nimport scala.util.parsing.combinator._\n\nobject ExprParser extends RegexParsers {\n  def number: Parser[Int] = \"\"\"\\d+\"\"\".r ^^ (_.toInt)\n  def expr: Parser[Int] = number\n}\n```\n\n## Pipeline\n\n1. Define grammar\n2. Parse input → AST\n3. Evaluate AST (semantics)\n\nPayroll DSL from lectures: parse lines, compute wages, print results.",
    "codeExamples": [
      {
        "title": "Combinator chain",
        "language": "scala",
        "code": "def token: Parser[String] = \"\"\"\\w+\"\"\".r\ndef phrase: Parser[List[String]] = rep(token)"
      }
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
        "title": "Collections",
        "prompt": "Implement `sum(nums: List[Int]): Int` without `.sum`.",
        "starterCode": "def sum(nums: List[Int]): Int = {\n  // TODO\n}",
        "language": "scala",
        "hints": [
          "Use pattern matching on lists.",
          "Tail recursion optional."
        ],
        "solution": "def sum(nums: List[Int]): Int = nums match {\n  case Nil => 0\n  case h :: t => h + sum(t)\n}",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      },
      {
        "id": "scala-16-e2",
        "title": "Option",
        "prompt": "Write `firstPositive(nums: List[Int]): Option[Int]`.",
        "starterCode": "def firstPositive(nums: List[Int]): Option[Int] = {\n  // TODO\n}",
        "language": "scala",
        "hints": [
          "Return None if none positive.",
          "Scan left to right."
        ],
        "solution": "def firstPositive(nums: List[Int]): Option[Int] =\n  nums.find(_ > 0)",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      }
    ]
  }
];
