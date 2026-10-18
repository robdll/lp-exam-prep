/* AUTO-GENERATED */
import type { LabProblem } from "@/lib/types";
export const labProblems: LabProblem[] = [
  {
    "id": "lab1-1",
    "lab": 1,
    "track": "ocaml",
    "number": 1,
    "title": "Alkaline earth metals & noble gases",
    "prompt": "Define lists of atomic numbers, max element, sort, merge to (name, Z) pairs sorted by name.",
    "language": "ocaml",
    "hints": [
      "Use association lists or records.",
      "Sort with List.sort using compare on names."
    ],
    "solution": "let alkaline_earth_metals = [4;12;20;38;56;88]\nlet noble_gases = [2;10;18;36;54;86]\nlet names = [(\"Be\",4);(\"Mg\",12);(\"Ca\",20);(\"Sr\",38);(\"Ba\",56);(\"Ra\",88);\n             (\"He\",2);(\"Ne\",10);(\"Ar\",18);(\"Kr\",36);(\"Xe\",54);(\"Rn\",86)]\nlet by_name = List.sort (fun (a,_) (b,_) -> compare a b) names",
    "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
  },
  {
    "id": "lab1-2",
    "lab": 1,
    "track": "ocaml",
    "number": 2,
    "title": "Temperature conversion system",
    "prompt": "Model scales as a variant; convert a value among 8 scales; given scale+value return all equivalents.",
    "language": "ocaml",
    "hints": [
      "Convert everything via Celsius as hub.",
      "Use pattern matching per constructor."
    ],
    "solution": "type scale = Celsius | Fahrenheit | Kelvin | Rankine | Delisle | Newton | Reaumur | Romer\nlet to_celsius v = function (* ... implement formulas from Wikipedia table ... *)\n  | Celsius x -> x",
    "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
  },
  {
    "id": "lab1-3",
    "lab": 1,
    "track": "ocaml",
    "number": 3,
    "title": "Matrix calculi",
    "prompt": "Implement zeroes, identity, init, transpose, + and * for non-square matrices.",
    "language": "ocaml",
    "hints": [
      "Represent as float array array or int list list.",
      "Check dimensions before multiply."
    ],
    "solution": "type matrix = int list list\nlet zeroes n m = List.init n (fun _ -> List.init m (fun _ -> 0))",
    "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
  },
  {
    "id": "lab1-4",
    "lab": 1,
    "track": "ocaml",
    "number": 4,
    "title": "Word frequencies",
    "prompt": "Read a text file, normalize case, strip punctuation, count word frequencies.",
    "language": "ocaml",
    "hints": [
      "In_channel for reading.",
      "Split on non-alphabetic chars."
    ],
    "solution": "open Printf\nlet normalize w = String.lowercase_ascii w",
    "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
  },
  {
    "id": "lab1-5",
    "lab": 1,
    "track": "ocaml",
    "number": 5,
    "title": "Strings: palindrome, subtract, anagram",
    "prompt": "Implement is_palindrome, (-) on strings, anagram against dictionary.",
    "language": "ocaml",
    "hints": [
      "Palindrome: filter alnum + lowercase.",
      "Subtract: filter chars from left string."
    ],
    "solution": "let is_alnum c = Char.is_alnum c\nlet clean s = String.lowercase_ascii (String.filter is_alnum s)",
    "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
  },
  {
    "id": "lab1-6",
    "lab": 1,
    "track": "ocaml",
    "number": 6,
    "title": "Taylor trigonometry module",
    "prompt": "Module approximating sin/cos/tan/log via Taylor series to n terms.",
    "language": "ocaml",
    "hints": [
      "Use recursive term generation.",
      "Compare with Stdlib sin at growing n."
    ],
    "solution": "module Taylor = struct\n  let rec fact n = if n <= 1 then 1 else n * fact (n-1)\n  let sin x n = (* sum terms *) 0.0\nend",
    "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
  },
  {
    "id": "lab1-7",
    "lab": 1,
    "track": "ocaml",
    "number": 7,
    "title": "Polish calculator (functor)",
    "prompt": "Expr type, parse polish string, eval; use functor over Stack module.",
    "language": "ocaml",
    "hints": [
      "Tokenizer splits on spaces.",
      "Stack push numbers/operators."
    ],
    "solution": "type expr = Num of int | Add of expr * expr | Mul of expr * expr",
    "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
  },
  {
    "id": "lab2-1",
    "lab": 2,
    "track": "ocaml",
    "number": 1,
    "title": "Social network graph",
    "prompt": "Graph ADT + visit (DFS/BFS) on dummy network.",
    "language": "ocaml",
    "hints": [
      "Adjacency list map.",
      "DFS with visited list."
    ],
    "solution": "type 'a graph = { nodes : 'a list; edges : ('a * 'a) list }",
    "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
  },
  {
    "id": "lab2-2",
    "lab": 2,
    "track": "ocaml",
    "number": 2,
    "title": "Monoid, Group, Ring modules",
    "prompt": "Parametric modules checking algebraic laws on finite samples.",
    "language": "ocaml",
    "hints": [
      "Represent operations as records.",
      "Check associativity on cartesian product sample."
    ],
    "solution": "module type MONOID = sig type t val zero : t val add : t -> t -> t end",
    "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
  },
  {
    "id": "lab2-3",
    "lab": 2,
    "track": "ocaml",
    "number": 3,
    "title": "KWIC index",
    "prompt": "Build keyword-in-context index from title file with formatting rules.",
    "language": "ocaml",
    "hints": [
      "Rotate words per line.",
      "Minor words length <= 2."
    ],
    "solution": "let minor w = String.length w <= 2",
    "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
  },
  {
    "id": "lab2-4",
    "lab": 2,
    "track": "ocaml",
    "number": 4,
    "title": "Goldbach conjecture",
    "prompt": "goldbach/1 and goldbach_list/2 for even integers.",
    "language": "ocaml",
    "hints": [
      "Sieve primes up to n.",
      "Search pairs (p, n-p)."
    ],
    "solution": "let is_prime n = (* trial division *)\n  let rec go d = d * d > n || (n mod d <> 0 && go (d+1)) in n > 1 && go 2",
    "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
  },
  {
    "id": "lab2-5",
    "lab": 2,
    "track": "ocaml",
    "number": 5,
    "title": "Parametric Matrix module",
    "prompt": "Matrix module with equivalence, arithmetic, norm, exceptions.",
    "language": "ocaml",
    "hints": [
      "Define MatrixNotCompatible exception.",
      "1-norm: max column sum of abs values."
    ],
    "solution": "exception MatrixNotCompatible\ntype matrix = int array array",
    "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
  },
  {
    "id": "lab3-1",
    "lab": 3,
    "track": "erlang",
    "number": 1,
    "title": "Sequential Erlang",
    "prompt": "is_palindrome, is_an_anagram, factors, is_proper (perfect number).",
    "language": "erlang",
    "hints": [
      "Reuse string normalization.",
      "factors: divide trial primes."
    ],
    "solution": "is_proper(N) when N > 1 ->\n  Divs = [D || D <- lists:seq(1, N-1), N rem D =:= 0],\n  lists:sum(Divs) =:= N.",
    "runInstructions": "# erl\n# c(module).\n# module:function()."
  },
  {
    "id": "lab3-2",
    "lab": 3,
    "track": "erlang",
    "number": 2,
    "title": "Expression parser & evaluator",
    "prompt": "Parse fully parenthesized expr AST; extend with if-then-else (0 test).",
    "language": "erlang",
    "hints": [
      "AST: {plus, A, B}.",
      "Evaluator returns integer."
    ],
    "solution": "eval({num, V}) -> V;\neval({plus, A, B}) -> eval(A) + eval(B).",
    "runInstructions": "# erl\n# c(module).\n# module:function()."
  },
  {
    "id": "lab3-3",
    "lab": 3,
    "track": "erlang",
    "number": 3,
    "title": "Process ring",
    "prompt": "ring:start(M, N, Message) — two strategies (central vs spawn chain).",
    "language": "erlang",
    "hints": [
      "Pass Pid of next process.",
      "Quit message propagates."
    ],
    "solution": "-module(ring).\n-export([start/3]).\nstart(M, N, Msg) -> (* spawn ring, send M messages *) ok.",
    "runInstructions": "# erl\n# c(module).\n# module:function()."
  },
  {
    "id": "lab3-4",
    "lab": 3,
    "track": "erlang",
    "number": 4,
    "title": "Echo server & linked client",
    "prompt": "echo:start/print/stop with register; abnormal stop kills linked client.",
    "language": "erlang",
    "hints": [
      "Internal protocol atom print.",
      "link/1 both processes."
    ],
    "solution": "-module(echo).\n-export([start/0, print/1, stop/0]).",
    "runInstructions": "# erl\n# c(module).\n# module:function()."
  },
  {
    "id": "lab3-5",
    "lab": 3,
    "track": "erlang",
    "number": 5,
    "title": "Counting server",
    "prompt": "Module counting with dummy services + tot returning per-service counts.",
    "language": "erlang",
    "hints": [
      "Server state = map of service -> count.",
      "Cast increments."
    ],
    "solution": "-module(counting).\n-export([dummy1/0, tot/0]).",
    "runInstructions": "# erl\n# c(module).\n# module:function()."
  },
  {
    "id": "lab4-1",
    "lab": 4,
    "track": "erlang",
    "number": 1,
    "title": "List comprehensions",
    "prompt": "squared_int, intersect, symmetric_difference.",
    "language": "erlang",
    "hints": [
      "Guard is_integer in comprehension.",
      "Use sets via lists:usort."
    ],
    "solution": "intersect(L1, L2) -> [X || X <- L1, lists:member(X, L2)].",
    "runInstructions": "# erl\n# c(module).\n# module:function()."
  },
  {
    "id": "lab4-2",
    "lab": 4,
    "track": "erlang",
    "number": 2,
    "title": "Distributed associative store",
    "prompt": "Tag/value store replicated on two nodes; random/alternate lookup routing.",
    "language": "erlang",
    "hints": [
      "Use register on each node.",
      "Updates broadcast to all replicas."
    ],
    "solution": "-module(store).\n-export([put/2, get/1]).",
    "runInstructions": "# erl\n# c(module).\n# module:function()."
  },
  {
    "id": "lab4-3",
    "lab": 4,
    "track": "erlang",
    "number": 3,
    "title": "Master and slaves",
    "prompt": "ms:start(N), ms:to_slave(Msg, N), restart on die, trap_exit.",
    "language": "erlang",
    "hints": [
      "Master keeps [{Id, Pid}].",
      "Slave prints messages except die."
    ],
    "solution": "-module(ms).\n-export([start/1, to_slave/2]).",
    "runInstructions": "# erl\n# c(module).\n# module:function()."
  },
  {
    "id": "lab4-4",
    "lab": 4,
    "track": "erlang",
    "number": 4,
    "title": "Distributed reverse string",
    "prompt": "Master splits string into 10 parts, slaves reverse, join; generalize to M.",
    "language": "erlang",
    "hints": [
      "Compute chunk sizes with length rem 10.",
      "Use spawn_link per slave."
    ],
    "solution": "long_reverse_string(W) -> long_reverse_string(W, 10).",
    "runInstructions": "# erl\n# c(module).\n# module:function()."
  },
  {
    "id": "lab4-5",
    "lab": 4,
    "track": "erlang",
    "number": 5,
    "title": "IRC-lite P2P",
    "prompt": "Re-engineer IRC-lite so clients mesh peer-to-peer on a channel.",
    "language": "erlang",
    "hints": [
      "Propagate join/leave to all peers.",
      "Sockets between clients."
    ],
    "solution": "-module(irc_p2p).\n-export([join/1, send/1]).",
    "runInstructions": "# erl\n# c(module).\n# module:function()."
  },
  {
    "id": "lab5-1",
    "lab": 5,
    "track": "scala",
    "number": 1,
    "title": "Functional Scala",
    "prompt": "is_palindrome, is_an_anagram, factors, is_proper — same spec as Erlang lab3-1.",
    "language": "scala",
    "hints": [
      "Use List methods + recursion.",
      "Perfect: sum divisors < n."
    ],
    "solution": "def isProper(n: Int): Boolean = (1 until n).filter(n % _ == 0).sum == n",
    "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
  },
  {
    "id": "lab5-2",
    "lab": 5,
    "track": "scala",
    "number": 2,
    "title": "List comprehensions for-comprehensions",
    "prompt": "squared_numbers (recursive on substructures), intersect, symmetric_difference.",
    "language": "scala",
    "hints": [
      "for/yield with guards.",
      "Traverse nested lists in squared_numbers."
    ],
    "solution": "def intersect[A](a: List[A], b: List[A]): List[A] = a.filter(b.contains)",
    "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
  },
  {
    "id": "lab5-3",
    "lab": 5,
    "track": "scala",
    "number": 3,
    "title": "Distributed reverse string (actors)",
    "prompt": "Master/slave actor decomposition for long reverse — like Erlang lab4-4.",
    "language": "scala",
    "hints": [
      "Use scala.concurrent or Pekko-style actors per course.",
      "Same chunk size formula."
    ],
    "solution": "// Master splits, asks slaves, collects reversed chunks in order",
    "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
  },
  {
    "id": "lab5-4",
    "lab": 5,
    "track": "scala",
    "number": 4,
    "title": "Monoid, Group, Ring classes",
    "prompt": "Parametric classes verifying laws on finite samples.",
    "language": "scala",
    "hints": [
      "Trait with add/mul/zero.",
      "Property tests on sample sets."
    ],
    "solution": "trait Monoid[A] { def zero: A; def add: (A, A) => A }",
    "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
  },
  {
    "id": "lab5-5",
    "lab": 5,
    "track": "scala",
    "number": 5,
    "title": "KWIC index",
    "prompt": "KWIC from file — 4-digit line numbers, column 40 keyword alignment.",
    "language": "scala",
    "hints": [
      "Articles/conjunctions minor.",
      "Max line width 79."
    ],
    "solution": "object KWIC extends App { /* read file, emit rotated lines */ }",
    "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
  },
  {
    "id": "lab5-6",
    "lab": 5,
    "track": "scala",
    "number": 6,
    "title": "Goldbach",
    "prompt": "goldbach and goldbach_list for even range.",
    "language": "scala",
    "hints": [
      "Prime sieve.",
      "Return (p, q) with p <= q."
    ],
    "solution": "def goldbach(n: Int): (Int, Int) = ???",
    "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
  },
  {
    "id": "lab5-7",
    "lab": 5,
    "track": "scala",
    "number": 7,
    "title": "Matrix class",
    "prompt": "Integer matrix with operators and 1-norm.",
    "language": "scala",
    "hints": [
      "Dimension checks throw.",
      "Override +, * as methods."
    ],
    "solution": "class Matrix(val rows: Vector[Vector[Int]]) { def +(other: Matrix): Matrix = ??? }",
    "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
  },
  {
    "id": "lab5-8",
    "lab": 5,
    "track": "scala",
    "number": 8,
    "title": "Ex line editor (vi-style)",
    "prompt": "Implement editor class with x, dw, i, iw, l, h; traits Debug and UndoRedo (u, ctrlr) with linear undo model.",
    "language": "scala",
    "hints": [
      "Track cursor index in line.",
      "Debug trait wraps methods to log caller.",
      "Undo stack on each mutating command."
    ],
    "solution": "class Editor(var text: String, var cursor: Int = 0) {\n  def x(): Unit = ???\n  def u(): Unit = ???\n}",
    "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
  },
  {
    "id": "lab6-1",
    "lab": 6,
    "track": "scala",
    "number": 1,
    "title": "Calculator DSL without combinators",
    "prompt": "Line-by-line script: +,-,*,/,^, sqrt, sin, cos, tan; then variables with assignment.",
    "language": "scala",
    "hints": [
      "Assignment right-to-left.",
      "Uninitialized variable error."
    ],
    "solution": "object CalcDSL { def eval(script: String): List[Double] = ??? }",
    "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
  },
  {
    "id": "lab6-2",
    "lab": 6,
    "track": "scala",
    "number": 2,
    "title": "Calculator DSL with parser combinators",
    "prompt": "Formal grammar + combinator implementation for exercise 1.",
    "language": "scala",
    "hints": [
      "Use RegexParsers or similar.",
      "Separate lexer for identifiers."
    ],
    "solution": "object CalcParser extends RegexParsers { /* grammar */ }",
    "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
  },
  {
    "id": "lab6-3",
    "lab": 6,
    "track": "scala",
    "number": 3,
    "title": "Primary-school arithmetic script",
    "prompt": "Parse vertically aligned addition/subtraction scripts; validate result row.",
    "language": "scala",
    "hints": [
      "Right-align numbers.",
      "Dashed separator length rule."
    ],
    "solution": "def validatePrimaryScript(text: String): Boolean = ???",
    "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
  },
  {
    "id": "lab6-4",
    "lab": 6,
    "track": "scala",
    "number": 4,
    "title": "Brainfuck interpreter",
    "prompt": "Parse BF grammar; run on 30k byte tape with I/O.",
    "language": "scala",
    "hints": [
      "Match brackets for loops.",
      "Ignore spurious characters."
    ],
    "solution": "def run(program: String, input: String = \"\"): String = ???",
    "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
  }
];
