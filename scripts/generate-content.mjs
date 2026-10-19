/**
 * Generates lesson metadata, quizzes, exercises, labs, and mock exams.
 * Lesson bodies live in content/lessons/{id}.md — run after editing markdown.
 * Run: node scripts/generate-content.mjs
 */
import fs from "fs";
import path from "path";
import { exercisesByLesson } from "./lesson-exercises.mjs";

const outDir = path.join(process.cwd(), "src/data/generated");
const lessonMdDir = path.join(process.cwd(), "content/lessons");
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(lessonMdDir, { recursive: true });

const runOcaml = `# utop or ocaml
# Paste your solution, or: ocamlc -o prog main.ml && ./prog`;

const runErlang = `# erl
# c(module).
# module:function().`;

const runScala = `# scala-cli run solution.scala
# or: scalac Solution.scala && scala Solution`;

function quiz(id, prompt, options, correctIndex, explanation) {
  return { id, prompt, options, correctIndex, explanation };
}

function ex(id, title, prompt, starterCode, language, hints, solution, runInstructions) {
  return { id, title, prompt, starterCode, language, hints, solution, runInstructions };
}

const lessonMeta = [
  {
    id: "ocaml-01",
    track: "ocaml",
    number: 1,
    title: "λ-Calculus, ML & Recursion",
    italianTitle: "Programmazione funzionale e ricorsione",
    summary:
      "Functional programming foundations: λ-calculus, OCaml functions, pattern matching, recursion, and tail recursion (ricorsione di coda).",
    labRefs: ["lab1-1", "lab1-2"],
  },
  {
    id: "ocaml-02",
    track: "ocaml",
    number: 2,
    title: "Datatypes in ML",
    italianTitle: "Tipi di dato in ML",
    summary: "Lists, tuples, records, arrays, and user-defined variants (tipi algebrici).",
    labRefs: ["lab1-3", "lab1-4"],
  },
  {
    id: "ocaml-03",
    track: "ocaml",
    number: 3,
    title: "Modules & Functors",
    italianTitle: "Moduli e functor",
    summary: "Structures, signatures, separate compilation, and parametric modules (functor).",
    labRefs: ["lab1-7", "lab2-2"],
  },
  {
    id: "ocaml-04",
    track: "ocaml",
    number: 4,
    title: "Polymorphism",
    italianTitle: "Polimorfismo",
    summary: "Parametric polymorphism, type inference, weak typing, and polymorphic ADTs.",
    labRefs: ["lab2-5"],
  },
  {
    id: "ocaml-05",
    track: "ocaml",
    number: 5,
    title: "Currying & map/filter/fold",
    italianTitle: "Currying, map, filter, fold",
    summary: "Partial application, higher-order list processing, and folds.",
    labRefs: ["lab1-5", "lab1-6"],
  },
  {
    id: "ocaml-06",
    track: "ocaml",
    number: 6,
    title: "ML in Action: Graph DFS",
    italianTitle: "ML in action — DFS su grafi",
    summary: "Graph ADTs and depth-first search (ricerca in profondità) on directed graphs.",
    labRefs: ["lab2-1"],
  },
  {
    id: "erlang-07",
    track: "erlang",
    number: 7,
    title: "Starting with Erlang",
    italianTitle: "Introduzione a Erlang",
    summary: "Atoms, tuples, lists, pattern matching, guards, map/filter/reduce, list comprehensions.",
    labRefs: ["lab3-1", "lab3-2"],
  },
  {
    id: "erlang-08",
    track: "erlang",
    number: 8,
    title: "Actors in Erlang",
    italianTitle: "Attori in Erlang",
    summary: "Processes, spawn/send/receive, registered names, and message-passing concurrency.",
    labRefs: ["lab3-3", "lab3-4"],
  },
  {
    id: "erlang-09",
    track: "erlang",
    number: 9,
    title: "Error Handling",
    italianTitle: "Gestione degli errori",
    summary: "Links, exit signals, trapping exits, and monitors (link unidirezionali).",
    labRefs: ["lab3-4", "lab3-5"],
  },
  {
    id: "erlang-10",
    track: "erlang",
    number: 10,
    title: "Distribution",
    italianTitle: "Programmazione distribuita",
    summary: "Nodes, cookies, remote spawn, and distributed name services.",
    labRefs: ["lab4-2", "lab4-3"],
  },
  {
    id: "erlang-11",
    track: "erlang",
    number: 11,
    title: "Erlang in Action: IRC-lite",
    italianTitle: "IRC-lite",
    summary: "Multi-process chat architecture: client, controller, server, group manager.",
    labRefs: ["lab4-5"],
  },
  {
    id: "scala-12",
    track: "scala",
    number: 12,
    title: "Scala Overview",
    italianTitle: "Panoramica su Scala",
    summary: "Scala types, pure OO model, case classes, Option, methods vs functions, comprehensions.",
    labRefs: ["lab5-1", "lab5-2"],
  },
  {
    id: "scala-13",
    track: "scala",
    number: 13,
    title: "Traits",
    italianTitle: "Trait",
    summary: "Mixin composition, observer pattern, stackable traits, and trait construction.",
    labRefs: ["lab5-8"],
  },
  {
    id: "scala-14",
    track: "scala",
    number: 14,
    title: "Advanced OO & Linearization",
    italianTitle: "OO avanzato e linearizzazione",
    summary: "override, linearization algorithm (C3), abstract type members, companion objects.",
    labRefs: ["lab5-7"],
  },
  {
    id: "scala-15",
    track: "scala",
    number: 15,
    title: "DSLs",
    italianTitle: "Domain Specific Languages",
    summary: "Internal vs external DSLs, embedded DSLs, and fluent APIs in Scala.",
    labRefs: ["lab6-1"],
  },
  {
    id: "scala-16",
    track: "scala",
    number: 16,
    title: "Parser Combinators",
    italianTitle: "Parser combinator",
    summary: "Combinator parsers, grammars, parsing payroll DSL, and semantics.",
    labRefs: ["lab6-2", "lab6-4"],
  },
];

/** @deprecated bodies moved to content/lessons/*.md — kept empty for reference during migration */
const _legacyLessonBodies = {
  "ocaml-01": `## Why functional programming?

In **programmazione funzionale**, functions are **first-class**: they can be passed, returned, and stored like any value. Control flow relies heavily on **recursion** (ricorsione) instead of mutable loops. Many FP languages discourage **side effects** (effetti collaterali): prefer expressions over statements.

## λ-Calculus (calcolo lambda)

Church's λ-calculus models computation with:
- **Variables** and **constants**
- **Abstraction** \`λx.M\` (in OCaml: \`fun x -> M\`)
- **Application** \`(M N)\`

Everything is a function. Currying is built in: \`fun x y -> x + y\` is really \`fun x -> fun y -> x + y\`.

## OCaml functions & pattern matching

\`\`\`ocaml
let rec fact n =
  if n <= 1 then 1 else n * fact (n - 1)

let rec fib = function
  | 0 -> 0
  | 1 -> 1
  | n -> fib (n - 1) + fib (n - 2)
\`\`\`

**Pattern matching** on constructors is the idiomatic way to destructure data.

## Tail recursion (ricorsione di coda)

A call is *tail* if it is the last operation. The compiler reuses stack frames:

\`\`\`ocaml
let fact n =
  let rec aux acc = function
    | 0 -> acc
    | k -> aux (k * acc) (k - 1)
  in aux 1 n
\`\`\`

## Towers of Hanoi (Torre di Hanoi)

Move \`n\` disks from source to target using auxiliary peg — classic divide-and-conquer recursion.`,
  "ocaml-02": `## Primitive types

\`bool\`, \`int\`, \`float\`, \`char\`, \`string\` — plus structured types.

## Lists (liste)

The workhorse type: \`'a list\` is either \`[]\` or \`h :: t\`.

\`\`\`ocaml
let rec length = function [] -> 0 | _ :: t -> 1 + length t
let rec append l1 l2 = match l1 with [] -> l2 | h :: t -> h :: append t l2
\`\`\`

## Tuples, records, arrays

- **Tuples**: \`(1, "a")\` — anonymous product types
- **Records**: named fields \`{ name = "Be"; number = 4 }\`
- **Arrays**: mutable \`Array.make n x\`

## Variants (tipi algebrici)

\`\`\`ocaml
type temperature =
  | Celsius of float
  | Fahrenheit of float
  | Kelvin of float

let to_celsius = function
  | Celsius c -> c
  | Fahrenheit f -> (f -. 32.) *. 5. /. 9.
  | Kelvin k -> k -. 273.15
\`\`\`

Variants + pattern matching replace many class hierarchies.`,
  "ocaml-03": `## Module system (sistema dei moduli)

OCaml separates **implementation** from **interface**:

\`\`\`ocaml
module StackImpl = struct
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
\`\`\`

## Signatures & abstraction

A **signature** (\`sig ... end\`) hides representation details — clients cannot construct invalid stacks.

## Functors

Functors are modules parameterized by other modules:

\`\`\`ocaml
module MakeStack (Elt : sig type t end) = struct
  type t = Elt.t list
  let empty = []
  let push x s = x :: s
end
\`\`\`

Use functors to reuse algorithms (e.g. Polish calculator over any stack implementation).`,
  "ocaml-04": `## Polymorphism taxonomy

- **Parametric**: generic over types (\`'a list\`)
- **Ad hoc**: overloading (not native in core OCaml)
- **Subtype**: objects/classes (OCaml has a separate object system)

## Type inference

OCaml infers principal types. **Weak type variables** (\`'a\`) appear when values are mutable or used heterogeneously.

## Polymorphic ADT example: Stack

\`\`\`ocaml
module PolyStack = struct
  type 'a t = 'a list
  let empty = []
  let push x s = x :: s
  let pop = function [] -> None | h :: t -> Some (h, t)
end
\`\`\`

## Sorting polymorphically

Quicksort on lists works for any ordered type:

\`\`\`ocaml
let rec quicksort = function
  | [] -> []
  | pivot :: rest ->
      let left, right = List.partition (fun x -> x <= pivot) rest in
      quicksort left @ pivot :: quicksort right
\`\`\``,
  "ocaml-05": `## Currying & partial application

\`add\` has type \`int -> int -> int\`. Supply one argument to get a function waiting for the rest:

\`\`\`ocaml
let add x y = x + y
let inc = add 1        (* int -> int *)
List.map (add 3) [1;2;3]  (* [4;5;6] *)
\`\`\`

## Map, filter, fold

| Name | Type idea | Purpose |
|------|-----------|---------|
| \`map\` | \`('a -> 'b) -> 'a list -> 'b list\` | transform each element |
| \`filter\` | \`('a -> bool) -> 'a list -> 'a list\` | keep satisfying elements |
| \`fold_left\` | \`('b -> 'a -> 'b) -> 'b -> 'a list -> 'b\` | accumulate left-to-right |

\`\`\`ocaml
List.fold_left (+) 0 [1;2;3]  (* 6 *)
List.filter (fun x -> x mod 2 = 0) [1..10]
\`\`\`

Implement \`map\` and \`fold\` yourself to internalize exam patterns.`,
  "ocaml-06": `## Graphs for exam-style problems

Represent a **directed graph** as adjacency lists or a record with nodes and edges.

\`\`\`ocaml
type 'a graph = {
  nodes : 'a list;
  edges : ('a * 'a) list;
}
\`\`\`

## DFS (Depth First Search)

DFS explores as deep as possible before backtracking — use a **visited** set and recursion or an explicit stack:

\`\`\`ocaml
let neighbors g v =
  List.filter_map (fun (a, b) -> if a = v then Some b else None) g.edges

let rec dfs g v visited =
  if List.mem v visited then visited
  else
    let visited = v :: visited in
    List.fold_left (fun acc u -> dfs g u acc) visited (neighbors g v)
\`\`\`

Social networks (Lab 2) are graphs: nodes = people, edges = relationships.`,
  "erlang-07": `## Erlang data model

- **Numbers** and **atoms** (\`ok\`, \`error\`, \`hello\`)
- **Tuples** \`{ok, 42}\`, **lists** \`[1,2,3|Tail]\`
- **Variables** start with uppercase; **= is pattern matching**, not assignment

\`\`\`erlang
factorial(0) -> 1;
factorial(N) when N > 0 -> N * factorial(N - 1).
\`\`\`

## Guards

Guard sequences (\`when\`) refine clauses without nested \`if\`.

## Higher-order list processing

\`lists:map/2\`, \`lists:filter/2\`, \`lists:foldl/3\` mirror ML. **List comprehensions**:

\`\`\`erlang
[X*X || X <- Lists, X rem 2 =:= 0].
\`\`\``,
  "erlang-08": `## Actor model

No shared mutable state: processes communicate by **asynchronous messages**.

\`\`\`erlang
Pid = spawn(fun() -> receive {hello, From} -> From ! {reply, hi} end end),
Pid ! {hello, self()},
receive {reply, Msg} -> io:format("~p~n", [Msg]) end.
\`\`\`

## spawn / send / receive

- \`spawn(Fun)\` creates a process
- \`Pid ! Msg\` sends asynchronously
- \`receive ... end\` blocks until a matching message

## Registered names

\`register(Name, Pid)\` gives stable aliases — used in echo servers and IRC-lite.`,
  "erlang-09": `## Links vs monitors

- **link/1**: bidirectional — if one dies, the other gets an exit signal
- **monitor/2**: unidirectional notification (\`{'DOWN', Ref, process, Pid, Reason}\`)

## Trapping exits

\`process_flag(trap_exit, true)\` lets a process convert crashes into messages instead of dying immediately — basis of supervisors (master/slave labs).

## Error handling pattern

Let linked workers fail; master traps exits, logs, and **restarts** the worker (see Lab 4 master-slave).`,
  "erlang-10": `## Distributed Erlang

Nodes connect with the same **cookie**:

\`\`\`erlang
net_kernel:start([mynode@localhost]),
rpc:call(othernode@host, module, function, [Args]).
\`\`\`

## Remote spawn

\`spawn(Node, Fun)\` starts work elsewhere — used in replicated key-value stores (Lab 4).

## Design cautions

Updates must reach all replicas; lookups can hit any replica; network partitions require careful testing.`,
  "erlang-11": `## IRC-lite architecture

Typical layers:
1. **Client** — user I/O
2. **Chat controller** — session routing
3. **Chat server** — channel state
4. **Group manager** — membership

Processes exchange structured messages; names (\`register\`) stabilize addresses.

## Exam angle

Re-implement slices: echo with hidden process, counting server, or P2P channel propagation (Lab 4 ex. 5).`,
  "scala-12": `## Scala: scalable language

Runs on JVM; mixes **OO** and **functional** styles. Everything is an object (no static primitives).

\`\`\`scala
object Hello {
  def main(args: Array[String]): Unit =
    println("Hello, world!")
}
\`\`\`

## Case classes & Option

\`\`\`scala
case class Person(name: String, age: Int)
sealed trait Option[+A]
case object None extends Option[Nothing]
case class Some[+A](value: A) extends Option[A]
\`\`\`

Avoid \`null\` — use \`Option\`.

## Methods vs functions

\`def\` defines methods; eta-expansion turns them into functions: \`list.map(inc _)\`.`,
  "scala-13": `## Traits as mixins

\`\`\`scala
trait Logging { self =>
  def log(msg: String): Unit = println(s"[log] $msg")
}

class Service extends Logging {
  def run(): Unit = log("running")
}
\`\`\`

## Stackable traits

Order matters: \`new Service with Audit with Metrics\` — each trait wraps behavior.

## Observer pattern

Subjects notify registered observers — classic exam trait composition question.`,
  "scala-14": `## Linearization (algoritmo di linearizzazione)

Scala resolves **diamond inheritance** with C3 linearization. Method lookup follows the linear order.

\`\`\`scala
trait A { def greet = "A" }
trait B extends A { override def greet = "B" }
trait C extends A { override def greet = "C" }
class D extends B with C  // greet from C (rightmost wins among traits)
\`\`\`

## \`override\` keyword

Required when overriding concrete members. **Abstract type members** can be refined in subclasses.

## Companion objects

Same name as class — factory methods and implicit scope:

\`\`\`scala
object Matrix { def zeros(rows: Int, cols: Int): Matrix = ??? }
\`\`\``,
  "scala-15": `## Internal vs external DSL

- **Internal**: embedded in host language (Scala) — type-checked, IDE support
- **External**: separate grammar parsed by combinator or parser generator

## Embedded DSL techniques

- Implicit conversions (use sparingly)
- By-name parameters
- Infix methods for readability

\`\`\`scala
case class Money(amount: BigDecimal) {
  def +(other: Money): Money = Money(amount + other.amount)
}
\`\`\`

Lab 6 calculator DSL extends expressions with variables and assignment.`,
  "scala-16": `## Parser combinators (combinatori di parser)

Built from small parsers combined with \`flatMap\`, \`map\`, \`| |\`:

\`\`\`scala
import scala.util.parsing.combinator._

object ExprParser extends RegexParsers {
  def number: Parser[Int] = """\\d+""".r ^^ (_.toInt)
  def expr: Parser[Int] = number
}
\`\`\`

## Pipeline

1. Define grammar
2. Parse input → AST
3. Evaluate AST (semantics)

Payroll DSL from lectures: parse lines, compute wages, print results.`,
};

const codeExamples = {
  "ocaml-01": [
    {
      title: "Tail-recursive sum",
      language: "ocaml",
      code: `let sum lst =
  let rec go acc = function [] -> acc | h :: t -> go (acc + h) t in
  go 0 lst`,
    },
  ],
  "ocaml-02": [
    {
      title: "Variant for shapes",
      language: "ocaml",
      code: `type shape = Circle of float | Rect of float * float
let area = function
  | Circle r -> Float.pi *. r *. r
  | Rect (w, h) -> w *. h`,
    },
  ],
  "ocaml-03": [
    {
      title: "Functor sketch",
      language: "ocaml",
      code: `module Id = struct type t = int let zero = 0 end
module Add = functor (R : sig type t val zero : t end) -> struct
  let add x y = x + y  (* exam: generalize with R's operations *)
end`,
    },
  ],
  "ocaml-04": [
    {
      title: "Polymorphic map",
      language: "ocaml",
      code: `let rec map f = function [] -> [] | h :: t -> f h :: map f t`,
    },
  ],
  "ocaml-05": [
    {
      title: "Fold from scratch",
      language: "ocaml",
      code: `let rec fold_left f acc = function
  | [] -> acc
  | h :: t -> fold_left f (f acc h) t`,
    },
  ],
  "ocaml-06": [
    {
      title: "DFS reachability",
      language: "ocaml",
      code: `let reachable g start target =
  let rec visit seen v =
    if v = target then true
    else if List.mem v seen then false
    else List.exists (visit (v :: seen)) (neighbors g v)
  in visit [] start`,
    },
  ],
  "erlang-07": [
    {
      title: "List comprehension",
      language: "erlang",
      code: `squared_evens(Ls) -> [X*X || X <- Ls, is_integer(X), X rem 2 =:= 0].`,
    },
  ],
  "erlang-08": [
    {
      title: "Spawn and reply",
      language: "erlang",
      code: `loop() ->
  receive
    {ping, From} -> From ! pong, loop();
    stop -> ok
  end.`,
    },
  ],
  "erlang-09": [
    {
      title: "Monitor",
      language: "erlang",
      code: `Ref = monitor(process, Pid),
receive
  {'DOWN', Ref, process, Pid, Reason} -> io:format("~p~n", [Reason])
end.`,
    },
  ],
  "erlang-10": [
    {
      title: "RPC call",
      language: "erlang",
      code: `rpc:call('node2@host', erlang, list_to_atom, ["hello"]).`,
    },
  ],
  "erlang-11": [
    {
      title: "Registered echo",
      language: "erlang",
      code: `register(chat_server, spawn(fun server_loop/0)).`,
    },
  ],
  "scala-12": [
    {
      title: "Case class + match",
      language: "scala",
      code: `sealed trait Expr
case class Num(n: Int) extends Expr
case class Add(a: Expr, b: Expr) extends Expr`,
    },
  ],
  "scala-13": [
    {
      title: "Stackable trait",
      language: "scala",
      code: `trait Core { def work: String = "core" }
trait Decor extends Core { override def work = super.work + "+decor" }`,
    },
  ],
  "scala-14": [
    {
      title: "Linearization demo",
      language: "scala",
      code: `class Z extends X with Y  // method resolution follows linearization order`,
    },
  ],
  "scala-15": [
    {
      title: "Fluent DSL",
      language: "scala",
      code: `class Grid { def row(values: Int*): Grid = this; def build(): Unit = () }`,
    },
  ],
  "scala-16": [
    {
      title: "Combinator chain",
      language: "scala",
      code: `def token: Parser[String] = """\\w+""".r
def phrase: Parser[List[String]] = rep(token)`,
    },
  ],
};

const quizzes = {
  "ocaml-01": [
    quiz(
      "q1",
      "What is the result of `let f x y = x + y in f 3` in OCaml?",
      ["`3` (int)", "`int -> int`", "`unit`", "Type error"],
      1,
      "Currying: applying one argument to a two-argument function yields a function waiting for the second argument."
    ),
    quiz(
      "q2",
      "Tail recursion is important because…",
      [
        "It always runs faster on small inputs",
        "The compiler can reuse stack space (constant stack)",
        "It disables pattern matching",
        "It requires mutable variables",
      ],
      1,
      "Tail calls can be compiled to jumps — essential for deep recursion on exam-sized inputs."
    ),
    quiz(
      "q3",
      "In λ-calculus, `λx.x` is…",
      ["The identity function", "The zero function", "A syntax error", "A list constructor"],
      0,
      "Abstraction λx.x maps every input to itself."
    ),
  ],
  "ocaml-02": [
    quiz(
      "q1",
      "`match Some 42 with None -> 0 | Some x -> x` evaluates to:",
      ["0", "42", "None", "Type error"],
      1,
      "Some 42 matches the second branch binding x = 42."
    ),
    quiz(
      "q2",
      "Which type does `[1; 2; 3]` have?",
      ["int list", "int array", "int * int * int", "'a list without constraint"],
      0,
      "All elements are int, so the list is int list."
    ),
  ],
  "ocaml-03": [
    quiz(
      "q1",
      "A functor in OCaml is…",
      ["A function on lists", "A module parameterized by another module", "A type alias", "An exception handler"],
      1,
      "Functors map module signatures to modules — key for generic stacks/calculators."
    ),
  ],
  "ocaml-04": [
    quiz(
      "q1",
      "`let id x = x` has type:",
      ["int -> int", "'a -> 'a", "unit -> unit", "'a -> 'b"],
      1,
      "Classic parametric polymorphism: id works at any type."
    ),
  ],
  "ocaml-05": [
    quiz(
      "q1",
      "`List.fold_left (-) 0 [1;2;3]` in OCaml equals:",
      ["6", "-6", "0", "2"],
      1,
      "(((0-1)-2)-3) = -6 — fold_left is left-associative."
    ),
  ],
  "ocaml-06": [
    quiz(
      "q1",
      "DFS uses which auxiliary structure (typical recursive version)?",
      ["Queue only", "Visited set/list", "Priority heap only", "No auxiliary structure ever"],
      1,
      "Track visited nodes to avoid infinite loops on cyclic graphs."
    ),
  ],
  "erlang-07": [
    quiz(
      "q1",
      "In Erlang, variables must…",
      ["Start with lowercase", "Start with uppercase", "Be prefixed with $", "Be declared with var"],
      1,
      "Atoms are lowercase; variables are Uppercase or _."
    ),
    quiz(
      "q2",
      "`[H|T] = [1,2,3]` binds T to:",
      ["[2,3]", "3", "[1,2]", "[1,2,3]"],
      0,
      "Standard list head/tail pattern."
    ),
  ],
  "erlang-08": [
    quiz(
      "q1",
      "Message sending `Pid ! Msg` is:",
      ["Synchronous", "Asynchronous", "Transactional", "Always blocking for sender"],
      1,
      "Send is async; receive blocks in the target process."
    ),
  ],
  "erlang-09": [
    quiz(
      "q1",
      "Monitors differ from links because monitors are:",
      ["Bidirectional and always crash both processes", "Unidirectional notifications", "Only for ETS tables", "Compile-time only"],
      1,
      "Monitor delivers DOWN without linking the monitor's fate to the target."
    ),
  ],
  "erlang-10": [
    quiz(
      "q1",
      "Distributed Erlang nodes authenticate with:",
      ["SSH keys only", "Shared cookie", "Database password", "Compile flags"],
      1,
      "Same cookie allows node clustering."
    ),
  ],
  "erlang-11": [
    quiz(
      "q1",
      "IRC-lite uses many processes because:",
      ["Erlang has no functions", "Actors isolate state and failures", "Lists are forbidden", "TCP requires processes"],
      1,
      "Concurrency model maps cleanly to chat sessions and groups."
    ),
  ],
  "scala-12": [
    quiz(
      "q1",
      "`val x: Option[Int] = None` — safe access idiomatically uses:",
      ["x.get always", "pattern match or map/flatMap", "null coalescing ??", "cast to Int"],
      1,
      "Option eliminates null; get is unsafe."
    ),
  ],
  "scala-13": [
    quiz(
      "q1",
      "Stackable traits are primarily used for:",
      ["Memory management", "Composable behavior layers", "Parsing only", "Disabling override"],
      1,
      "Layer cross-cutting behavior without deep inheritance trees."
    ),
  ],
  "scala-14": [
    quiz(
      "q1",
      "In `class C extends T1 with T2`, trait method precedence (default) favors:",
      ["T1 always", "Rightmost trait (T2) among traits", "Random", "JVM order"],
      1,
      "Rightmost trait wins conflicts in the trait prefix."
    ),
  ],
  "scala-15": [
    quiz(
      "q1",
      "An internal DSL is:",
      ["Parsed by yacc externally", "Embedded in Scala syntax", "Always XML", "Only for SQL"],
      1,
      "Host language constructs form the DSL."
    ),
  ],
  "scala-16": [
    quiz(
      "q1",
      "Parser combinator `p ~ q` typically means:",
      ["Parse p then q sequentially", "Parse p or q", "Parse p many times", "Skip q"],
      0,
      "Sequencing combinator — critical for grammars."
    ),
  ],
};

function defaultExercises(lessonId, track) {
  const lang = track;
  const run =
    lang === "ocaml" ? runOcaml : lang === "erlang" ? runErlang : runScala;
  const templates = {
    ocaml: [
      ex(
        `${lessonId}-e1`,
        "Warm-up: recursion",
        "Write `length : 'a list -> int` without using `List.length`.",
        `let length lst =\n  (* TODO *)\n`,
        "ocaml",
        ["Empty list has length 0.", "Non-empty: 1 + length tail."],
        `let rec length = function [] -> 0 | _ :: t -> 1 + length t`,
        run
      ),
      ex(
        `${lessonId}-e2`,
        "Pattern matching",
        "Write `is_sorted : int list -> bool` checking non-decreasing order.",
        `let is_sorted lst =\n  (* TODO *)\n`,
        "ocaml",
        ["Single element lists are sorted.", "Compare adjacent pairs recursively."],
        `let rec is_sorted = function
  | [] | [_] -> true
  | a :: (b :: _ as t) -> a <= b && is_sorted (b :: t)`,
        run
      ),
    ],
    erlang: [
      ex(
        `${lessonId}-e1`,
        "List processing",
        "Implement `sum/1` using recursion (no lists:sum).",
        `sum(L) ->\n  % TODO\n.`,
        "erlang",
        ["Base case empty list.", "Head + sum of tail."],
        `sum([]) -> 0;
sum([H|T]) -> H + sum(T).`,
        run
      ),
      ex(
        `${lessonId}-e2`,
        "Guards",
        "Write `classify/1` returning atom positive, negative, or zero.",
        `classify(N) when is_integer(N) ->\n  % TODO\n.`,
        "erlang",
        ["Use separate clauses with guards.", "0 is its own case."],
        `classify(N) when N > 0 -> positive;
classify(N) when N < 0 -> negative;
classify(0) -> zero.`,
        run
      ),
    ],
    scala: [
      ex(
        `${lessonId}-e1`,
        "Collections",
        "Implement `sum(nums: List[Int]): Int` without `.sum`.",
        `def sum(nums: List[Int]): Int = {\n  // TODO\n}`,
        "scala",
        ["Use pattern matching on lists.", "Tail recursion optional."],
        `def sum(nums: List[Int]): Int = nums match {
  case Nil => 0
  case h :: t => h + sum(t)
}`,
        run
      ),
      ex(
        `${lessonId}-e2`,
        "Option",
        "Write `firstPositive(nums: List[Int]): Option[Int]`.",
        `def firstPositive(nums: List[Int]): Option[Int] = {\n  // TODO\n}`,
        "scala",
        ["Return None if none positive.", "Scan left to right."],
        `def firstPositive(nums: List[Int]): Option[Int] =
  nums.find(_ > 0)`,
        run
      ),
    ],
  };
  return templates[track];
}

for (const meta of lessonMeta) {
  const mdPath = path.join(lessonMdDir, `${meta.id}.md`);
  if (!fs.existsSync(mdPath)) {
    console.warn(`Warning: missing ${mdPath} — add markdown before release.`);
  }
}

const lessons = lessonMeta.map((meta) => ({
  ...meta,
  quiz: quizzes[meta.id] || [
    quiz(`${meta.id}-q1`, `Review: ${meta.title}?`, ["Yes", "Partially", "Need slides", "No"], 0, "Re-read the lesson and drills."),
  ],
  exercises: exercisesByLesson[meta.id] ?? defaultExercises(meta.id, meta.track),
}));

// Lab problems from course sheets
const labProblems = [];

function lab(id, labNum, track, num, title, prompt, language, hints, solution) {
  const run =
    language === "ocaml" ? runOcaml : language === "erlang" ? runErlang : runScala;
  labProblems.push({ id, lab: labNum, track, number: num, title, prompt, language, hints, solution, runInstructions: run });
}

// OCaml Lab 1
lab("lab1-1", 1, "ocaml", 1, "Alkaline earth metals & noble gases",
  "Define lists of atomic numbers, max element, sort, merge to (name, Z) pairs sorted by name.",
  "ocaml",
  ["Use association lists or records.", "Sort with List.sort using compare on names."],
  `let alkaline_earth_metals = [4;12;20;38;56;88]
let noble_gases = [2;10;18;36;54;86]
let names = [("Be",4);("Mg",12);("Ca",20);("Sr",38);("Ba",56);("Ra",88);
             ("He",2);("Ne",10);("Ar",18);("Kr",36);("Xe",54);("Rn",86)]
let by_name = List.sort (fun (a,_) (b,_) -> compare a b) names`);

lab("lab1-2", 1, "ocaml", 2, "Temperature conversion system",
  "Model scales as a variant; convert a value among 8 scales; given scale+value return all equivalents.",
  "ocaml",
  ["Convert everything via Celsius as hub.", "Use pattern matching per constructor."],
  `type scale = Celsius | Fahrenheit | Kelvin | Rankine | Delisle | Newton | Reaumur | Romer
let to_celsius v = function (* ... implement formulas from Wikipedia table ... *)
  | Celsius x -> x`);

lab("lab1-3", 1, "ocaml", 3, "Matrix calculi",
  "Implement zeroes, identity, init, transpose, + and * for non-square matrices.",
  "ocaml",
  ["Represent as float array array or int list list.", "Check dimensions before multiply."],
  `type matrix = int list list
let zeroes n m = List.init n (fun _ -> List.init m (fun _ -> 0))`);

lab("lab1-4", 1, "ocaml", 4, "Word frequencies",
  "Read a text file, normalize case, strip punctuation, count word frequencies.",
  "ocaml",
  ["In_channel for reading.", "Split on non-alphabetic chars."],
  `open Printf
let normalize w = String.lowercase_ascii w`);

lab("lab1-5", 1, "ocaml", 5, "Strings: palindrome, subtract, anagram",
  "Implement is_palindrome, (-) on strings, anagram against dictionary.",
  "ocaml",
  ["Palindrome: filter alnum + lowercase.", "Subtract: filter chars from left string."],
  `let is_alnum c = Char.is_alnum c
let clean s = String.lowercase_ascii (String.filter is_alnum s)`);

lab("lab1-6", 1, "ocaml", 6, "Taylor trigonometry module",
  "Module approximating sin/cos/tan/log via Taylor series to n terms.",
  "ocaml",
  ["Use recursive term generation.", "Compare with Stdlib sin at growing n."],
  `module Taylor = struct
  let rec fact n = if n <= 1 then 1 else n * fact (n-1)
  let sin x n = (* sum terms *) 0.0
end`);

lab("lab1-7", 1, "ocaml", 7, "Polish calculator (functor)",
  "Expr type, parse polish string, eval; use functor over Stack module.",
  "ocaml",
  ["Tokenizer splits on spaces.", "Stack push numbers/operators."],
  `type expr = Num of int | Add of expr * expr | Mul of expr * expr`);

// OCaml Lab 2
lab("lab2-1", 2, "ocaml", 1, "Social network graph",
  "Graph ADT + visit (DFS/BFS) on dummy network.",
  "ocaml",
  ["Adjacency list map.", "DFS with visited list."],
  `type 'a graph = { nodes : 'a list; edges : ('a * 'a) list }`);

lab("lab2-2", 2, "ocaml", 2, "Monoid, Group, Ring modules",
  "Parametric modules checking algebraic laws on finite samples.",
  "ocaml",
  ["Represent operations as records.", "Check associativity on cartesian product sample."],
  `module type MONOID = sig type t val zero : t val add : t -> t -> t end`);

lab("lab2-3", 2, "ocaml", 3, "KWIC index",
  "Build keyword-in-context index from title file with formatting rules.",
  "ocaml",
  ["Rotate words per line.", "Minor words length <= 2."],
  `let minor w = String.length w <= 2`);

lab("lab2-4", 2, "ocaml", 4, "Goldbach conjecture",
  "goldbach/1 and goldbach_list/2 for even integers.",
  "ocaml",
  ["Sieve primes up to n.", "Search pairs (p, n-p)."],
  `let is_prime n = (* trial division *)
  let rec go d = d * d > n || (n mod d <> 0 && go (d+1)) in n > 1 && go 2`);

lab("lab2-5", 2, "ocaml", 5, "Parametric Matrix module",
  "Matrix module with equivalence, arithmetic, norm, exceptions.",
  "ocaml",
  ["Define MatrixNotCompatible exception.", "1-norm: max column sum of abs values."],
  `exception MatrixNotCompatible
type matrix = int array array`);

// Erlang Lab 3
lab("lab3-1", 3, "erlang", 1, "Sequential Erlang",
  "is_palindrome, is_an_anagram, factors, is_proper (perfect number).",
  "erlang",
  ["Reuse string normalization.", "factors: divide trial primes."],
  `is_proper(N) when N > 1 ->
  Divs = [D || D <- lists:seq(1, N-1), N rem D =:= 0],
  lists:sum(Divs) =:= N.`);

lab("lab3-2", 3, "erlang", 2, "Expression parser & evaluator",
  "Parse fully parenthesized expr AST; extend with if-then-else (0 test).",
  "erlang",
  ["AST: {plus, A, B}.", "Evaluator returns integer."],
  `eval({num, V}) -> V;
eval({plus, A, B}) -> eval(A) + eval(B).`);

lab("lab3-3", 3, "erlang", 3, "Process ring",
  "ring:start(M, N, Message) — two strategies (central vs spawn chain).",
  "erlang",
  ["Pass Pid of next process.", "Quit message propagates."],
  `-module(ring).
-export([start/3]).
start(M, N, Msg) -> (* spawn ring, send M messages *) ok.`);

lab("lab3-4", 3, "erlang", 4, "Echo server & linked client",
  "echo:start/print/stop with register; abnormal stop kills linked client.",
  "erlang",
  ["Internal protocol atom print.", "link/1 both processes."],
  `-module(echo).
-export([start/0, print/1, stop/0]).`);

lab("lab3-5", 3, "erlang", 5, "Counting server",
  "Module counting with dummy services + tot returning per-service counts.",
  "erlang",
  ["Server state = map of service -> count.", "Cast increments."],
  `-module(counting).
-export([dummy1/0, tot/0]).`);

// Erlang Lab 4
lab("lab4-1", 4, "erlang", 1, "List comprehensions",
  "squared_int, intersect, symmetric_difference.",
  "erlang",
  ["Guard is_integer in comprehension.", "Use sets via lists:usort."],
  `intersect(L1, L2) -> [X || X <- L1, lists:member(X, L2)].`);

lab("lab4-2", 4, "erlang", 2, "Distributed associative store",
  "Tag/value store replicated on two nodes; random/alternate lookup routing.",
  "erlang",
  ["Use register on each node.", "Updates broadcast to all replicas."],
  `-module(store).
-export([put/2, get/1]).`);

lab("lab4-3", 4, "erlang", 3, "Master and slaves",
  "ms:start(N), ms:to_slave(Msg, N), restart on die, trap_exit.",
  "erlang",
  ["Master keeps [{Id, Pid}].", "Slave prints messages except die."],
  `-module(ms).
-export([start/1, to_slave/2]).`);

lab("lab4-4", 4, "erlang", 4, "Distributed reverse string",
  "Master splits string into 10 parts, slaves reverse, join; generalize to M.",
  "erlang",
  ["Compute chunk sizes with length rem 10.", "Use spawn_link per slave."],
  `long_reverse_string(W) -> long_reverse_string(W, 10).`);

lab("lab4-5", 4, "erlang", 5, "IRC-lite P2P",
  "Re-engineer IRC-lite so clients mesh peer-to-peer on a channel.",
  "erlang",
  ["Propagate join/leave to all peers.", "Sockets between clients."],
  `-module(irc_p2p).
-export([join/1, send/1]).`);

// Scala Lab 5 (exercises 1-8 from sheet)
lab("lab5-1", 5, "scala", 1, "Functional Scala",
  "is_palindrome, is_an_anagram, factors, is_proper — same spec as Erlang lab3-1.",
  "scala",
  ["Use List methods + recursion.", "Perfect: sum divisors < n."],
  `def isProper(n: Int): Boolean = (1 until n).filter(n % _ == 0).sum == n`);

lab("lab5-2", 5, "scala", 2, "List comprehensions for-comprehensions",
  "squared_numbers (recursive on substructures), intersect, symmetric_difference.",
  "scala",
  ["for/yield with guards.", "Traverse nested lists in squared_numbers."],
  `def intersect[A](a: List[A], b: List[A]): List[A] = a.filter(b.contains)`);

lab("lab5-3", 5, "scala", 3, "Distributed reverse string (actors)",
  "Master/slave actor decomposition for long reverse — like Erlang lab4-4.",
  "scala",
  ["Use scala.concurrent or Pekko-style actors per course.", "Same chunk size formula."],
  `// Master splits, asks slaves, collects reversed chunks in order`);

lab("lab5-4", 5, "scala", 4, "Monoid, Group, Ring classes",
  "Parametric classes verifying laws on finite samples.",
  "scala",
  ["Trait with add/mul/zero.", "Property tests on sample sets."],
  `trait Monoid[A] { def zero: A; def add: (A, A) => A }`);

lab("lab5-5", 5, "scala", 5, "KWIC index",
  "KWIC from file — 4-digit line numbers, column 40 keyword alignment.",
  "scala",
  ["Articles/conjunctions minor.", "Max line width 79."],
  `object KWIC extends App { /* read file, emit rotated lines */ }`);

lab("lab5-6", 5, "scala", 6, "Goldbach",
  "goldbach and goldbach_list for even range.",
  "scala",
  ["Prime sieve.", "Return (p, q) with p <= q."],
  `def goldbach(n: Int): (Int, Int) = ???`);

lab("lab5-7", 5, "scala", 7, "Matrix class",
  "Integer matrix with operators and 1-norm.",
  "scala",
  ["Dimension checks throw.", "Override +, * as methods."],
  `class Matrix(val rows: Vector[Vector[Int]]) { def +(other: Matrix): Matrix = ??? }`);

lab("lab5-8", 5, "scala", 8, "Ex line editor (vi-style)",
  "Implement editor class with x, dw, i, iw, l, h; traits Debug and UndoRedo (u, ctrlr) with linear undo model.",
  "scala",
  ["Track cursor index in line.", "Debug trait wraps methods to log caller.", "Undo stack on each mutating command."],
  `class Editor(var text: String, var cursor: Int = 0) {
  def x(): Unit = ???
  def u(): Unit = ???
}`);

// Scala Lab 6
lab("lab6-1", 6, "scala", 1, "Calculator DSL without combinators",
  "Line-by-line script: +,-,*,/,^, sqrt, sin, cos, tan; then variables with assignment.",
  "scala",
  ["Assignment right-to-left.", "Uninitialized variable error."],
  `object CalcDSL { def eval(script: String): List[Double] = ??? }`);

lab("lab6-2", 6, "scala", 2, "Calculator DSL with parser combinators",
  "Formal grammar + combinator implementation for exercise 1.",
  "scala",
  ["Use RegexParsers or similar.", "Separate lexer for identifiers."],
  `object CalcParser extends RegexParsers { /* grammar */ }`);

lab("lab6-3", 6, "scala", 3, "Primary-school arithmetic script",
  "Parse vertically aligned addition/subtraction scripts; validate result row.",
  "scala",
  ["Right-align numbers.", "Dashed separator length rule."],
  `def validatePrimaryScript(text: String): Boolean = ???`);

lab("lab6-4", 6, "scala", 4, "Brainfuck interpreter",
  "Parse BF grammar; run on 30k byte tape with I/O.",
  "scala",
  ["Match brackets for loops.", "Ignore spurious characters."],
  `def run(program: String, input: String = ""): String = ???`);

const mockExams = [
  {
    id: "mock-1",
    title: "Mock Exam A — Foundations",
    description: "OCaml datatypes + Erlang actors + Scala traits (midterm difficulty).",
    durationHours: 4,
    exercises: [
      {
        id: "mock-1-ocaml",
        track: "ocaml",
        title: "OCaml: Polish notation evaluator",
        prompt:
          "Implement type `expr`, function `of_polish : string -> expr` for integers with + - * / ** (space-separated), and `eval : expr -> int`. Handle unary minus. (~45 min)",
        language: "ocaml",
        rubric: [
          { score: 0, description: "No submission or completely wrong approach." },
          { score: 4, description: "Partial AST or eval with bugs on nested ops." },
          { score: 6, description: "Correct eval on provided samples; parser fragile." },
          { score: 8, description: "Solid parser+eval; handles unary minus; clear types." },
          { score: 11, description: "Complete, idiomatic, robust on edge cases." },
        ],
        hints: ["Split string on spaces.", "Use variant type for AST.", "Stack-based parse is acceptable."],
        solution: `type expr = Num of int | Neg of expr | Bin of char * expr * expr
let rec eval = function
  | Num n -> n | Neg e -> - eval e
  | Bin ('+', a, b) -> eval a + eval b
  | Bin ('*', a, b) -> eval a * eval b
  | _ -> failwith "op"`,
        runInstructions: runOcaml,
      },
      {
        id: "mock-1-erlang",
        track: "erlang",
        title: "Erlang: Echo API with register",
        prompt:
          "Module `echo` with start/0, print/1, stop/0 hiding a registered process. Internal protocol must not treat user term `stop` as shutdown. Link client and demonstrate exit propagation. (~60 min)",
        language: "erlang",
        rubric: [
          { score: 0, description: "Missing process or no API." },
          { score: 4, description: "Process works but no register or wrong stop." },
          { score: 6, description: "API ok; stop works; linking incomplete." },
          { score: 8, description: "Register + safe protocol + link demo." },
          { score: 11, description: "Production-quality loop, tests from shell documented." },
        ],
        hints: ["Use {internal, print, T}.", "register(echo, Pid).", "link/1 in client."],
        solution: `-module(echo).
-export([start/0, print/1, stop/0]).
start() -> register(echo, spawn(fun loop/0)), ok.
print(T) -> echo ! {internal, print, T}, ok.
stop() -> echo ! internal_stop, ok.
loop() -> receive
  {internal, print, T} -> io:format("~p~n",[T]), loop();
  internal_stop -> ok end.`,
        runInstructions: runErlang,
      },
      {
        id: "mock-1-scala",
        track: "scala",
        title: "Scala: Observer with stackable logging",
        prompt:
          "Model a `Sensor` subject with attach/detach observers. Mix in `Logging` and `Audit` traits (stackable) so updates print audit trail. Demonstrate linearization order affects output. (~60 min)",
        language: "scala",
        rubric: [
          { score: 0, description: "No trait structure." },
          { score: 4, description: "Observer without stackable order." },
          { score: 6, description: "Working notify; logging partial." },
          { score: 8, description: "Stackable traits + demo of order." },
          { score: 11, description: "Clean design, typed observers, clear demo main." },
        ],
        hints: ["Trait Sensor { observers: List[Observer] }", "override def notify", "new Sensor with Logging with Audit"],
        solution: `trait Observer { def update(msg: String): Unit }
trait Subject { def observers: scala.collection.mutable.Buffer[Observer]
  def notify(msg: String): Unit = observers.foreach(_.update(msg)) }
trait Logging extends Subject { abstract override def notify(msg: String) = { println(s"log:$msg"); super.notify(msg) } }`,
        runInstructions: runScala,
      },
    ],
  },
  {
    id: "mock-2",
    title: "Mock Exam B — Concurrency & Modules",
    description: "Graph DFS, master-slave, matrix/OO (exam-style mix).",
    durationHours: 4,
    exercises: [
      {
        id: "mock-2-ocaml",
        track: "ocaml",
        title: "OCaml: Social graph reachability",
        prompt:
          "Define graph type over `'a` nodes, `neighbors`, and `reachable g src dst`. Use DFS. Include small test graph. (~50 min)",
        language: "ocaml",
        rubric: [
          { score: 0, description: "No graph model." },
          { score: 4, description: "Graph ok; search wrong on cycles." },
          { score: 6, description: "DFS works on DAG; visited mishandled." },
          { score: 8, description: "Correct on cyclic graphs." },
          { score: 11, description: "Clean API + tests + optional BFS comment." },
        ],
        hints: ["Edges as (node*node) list.", "Maintain visited set."],
        solution: `type 'a graph = { edges : ('a * 'a) list }
let neighbors g v = List.filter_map (fun (a,b)-> if a=v then Some b else None) g.edges`,
        runInstructions: runOcaml,
      },
      {
        id: "mock-2-erlang",
        track: "erlang",
        title: "Erlang: Master-slave ms module",
        prompt: "Implement `ms:start(N)` and `ms:to_slave(Msg, K)` with restart on `die`, trap_exit, numbered slaves. (~70 min)",
        language: "erlang",
        rubric: [
          { score: 0, description: "Not implemented." },
          { score: 4, description: "Slaves spawn without restart." },
          { score: 6, description: "Restart works; numbering bugs." },
          { score: 8, description: "Spec met with logging." },
          { score: 11, description: "Robust edge cases (bad index, already dead)." },
        ],
        hints: ["process_flag(trap_exit, true).", "Slaves print non-die messages."],
        solution: `-module(ms).
-export([start/1, to_slave/2]).
start(N) -> register(master, spawn(fun() -> master_loop(N) end)), ok.`,
        runInstructions: runErlang,
      },
      {
        id: "mock-2-scala",
        track: "scala",
        title: "Scala: Matrix 1-norm and addition",
        prompt:
          "Case class Matrix with + and * (int matrices), dimension checks, and `norm1`. (~60 min)",
        language: "scala",
        rubric: [
          { score: 0, description: "Empty." },
          { score: 4, description: "Partial operators." },
          { score: 6, description: "+ and norm mostly correct." },
          { score: 8, description: "+ * norm with exceptions." },
          { score: 11, description: "Complete per lab spec." },
        ],
        hints: ["cols of A = rows of B for *.", "norm1: max column sum abs."],
        solution: `case class Matrix(rows: Vector[Vector[Int]]) {
  def +(o: Matrix): Matrix = ??? // require same size
  def norm1: Int = (0 until cols).map(c => rows.map(_(c)).map(math.abs).sum).max
}`,
        runInstructions: runScala,
      },
    ],
  },
  {
    id: "mock-3",
    title: "Mock Exam C — DSL & Distribution",
    description: "Full exam simulation: modules, distributed store sketch, parser combinator DSL.",
    durationHours: 4,
    exercises: [
      {
        id: "mock-3-ocaml",
        track: "ocaml",
        title: "OCaml: Functor stack for calculator",
        prompt:
          "Signature STACK, module StackList, functor MakeEval(Stack) parsing polish expressions. (~70 min)",
        language: "ocaml",
        rubric: [
          { score: 0, description: "Missing." },
          { score: 4, description: "Stack only." },
          { score: 6, description: "Eval without functor." },
          { score: 8, description: "Functor works for one stack." },
          { score: 11, description: "Clean signatures, extension point." },
        ],
        hints: ["Reuse lab1 ex7.", "Hide stack representation."],
        solution: `module type STACK = sig type 'a t val empty : 'a t val push : 'a -> 'a t -> 'a t val pop : 'a t -> ('a * 'a t) option end`,
        runInstructions: runOcaml,
      },
      {
        id: "mock-3-erlang",
        track: "erlang",
        title: "Erlang: Replicated tag store (2 nodes)",
        prompt:
          "Design `store:put(Tag, Val)` and `store:get(Tag)` with updates to two registered replicas on one host; document remote-node pitfalls. (~70 min)",
        language: "erlang",
        rubric: [
          { score: 0, description: "No design." },
          { score: 4, description: "Single node dict only." },
          { score: 6, description: "Two processes; lookup random." },
          { score: 8, description: "Updates replicated; test generator sketched." },
          { score: 11, description: "Complete API + random ops test loop." },
        ],
        hints: ["register(store1, Pid).", "cast to both on put."],
        solution: `-module(store).
-export([put/2, get/1]).
put(T,V) -> [Pid ! {put,T,V} || Pid <- replicas()], ok.`,
        runInstructions: runErlang,
      },
      {
        id: "mock-3-scala",
        track: "scala",
        title: "Scala: Mini calculator combinator DSL",
        prompt:
          "Parse lines `var = expr` and arithmetic with +,-,*,/, sin, cos; print result per line. (~80 min)",
        language: "scala",
        rubric: [
          { score: 0, description: "No parser." },
          { score: 4, description: "Eval without variables." },
          { score: 6, description: "Variables with bugs." },
          { score: 8, description: "Grammar + env for vars." },
          { score: 11, description: "Combinator solution with error messages." },
        ],
        hints: ["Map[String, Double] env.", "Assignment line special case."],
        solution: `import scala.util.parsing.combinator._
object LinesParser extends RegexParsers { /* def stmt, def expr */ }`,
        runInstructions: runScala,
      },
    ],
  },
];

fs.writeFileSync(
  path.join(outDir, "lessons.ts"),
  `/* AUTO-GENERATED — run node scripts/generate-content.mjs */
import type { Lesson } from "@/lib/types";
export const lessons: Lesson[] = ${JSON.stringify(lessons, null, 2)};
`
);

fs.writeFileSync(
  path.join(outDir, "labs.ts"),
  `/* AUTO-GENERATED */
import type { LabProblem } from "@/lib/types";
export const labProblems: LabProblem[] = ${JSON.stringify(labProblems, null, 2)};
`
);

fs.writeFileSync(
  path.join(outDir, "mock-exams.ts"),
  `/* AUTO-GENERATED */
import type { MockExam } from "@/lib/types";
export const mockExams: MockExam[] = ${JSON.stringify(mockExams, null, 2)};
`
);

console.log(`Generated ${lessons.length} lessons, ${labProblems.length} labs, ${mockExams.length} mock exams.`);
