/* AUTO-GENERATED */
import type { MockExam } from "@/lib/types";
export const mockExams: MockExam[] = [
  {
    "id": "mock-1",
    "title": "Mock Exam A — Foundations",
    "description": "OCaml datatypes + Erlang actors + Scala traits (midterm difficulty).",
    "durationHours": 4,
    "exercises": [
      {
        "id": "mock-1-ocaml",
        "track": "ocaml",
        "title": "OCaml: Polish notation evaluator",
        "prompt": "Implement type `expr`, function `of_polish : string -> expr` for integers with + - * / ** (space-separated), and `eval : expr -> int`. Handle unary minus. (~45 min)",
        "language": "ocaml",
        "rubric": [
          {
            "score": 0,
            "description": "No submission or completely wrong approach."
          },
          {
            "score": 4,
            "description": "Partial AST or eval with bugs on nested ops."
          },
          {
            "score": 6,
            "description": "Correct eval on provided samples; parser fragile."
          },
          {
            "score": 8,
            "description": "Solid parser+eval; handles unary minus; clear types."
          },
          {
            "score": 11,
            "description": "Complete, idiomatic, robust on edge cases."
          }
        ],
        "hints": [
          "Split string on spaces.",
          "Use variant type for AST.",
          "Stack-based parse is acceptable."
        ],
        "solution": "type expr = Num of int | Neg of expr | Bin of char * expr * expr\nlet rec eval = function\n  | Num n -> n | Neg e -> - eval e\n  | Bin ('+', a, b) -> eval a + eval b\n  | Bin ('*', a, b) -> eval a * eval b\n  | _ -> failwith \"op\"",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "mock-1-erlang",
        "track": "erlang",
        "title": "Erlang: Echo API with register",
        "prompt": "Module `echo` with start/0, print/1, stop/0 hiding a registered process. Internal protocol must not treat user term `stop` as shutdown. Link client and demonstrate exit propagation. (~60 min)",
        "language": "erlang",
        "rubric": [
          {
            "score": 0,
            "description": "Missing process or no API."
          },
          {
            "score": 4,
            "description": "Process works but no register or wrong stop."
          },
          {
            "score": 6,
            "description": "API ok; stop works; linking incomplete."
          },
          {
            "score": 8,
            "description": "Register + safe protocol + link demo."
          },
          {
            "score": 11,
            "description": "Production-quality loop, tests from shell documented."
          }
        ],
        "hints": [
          "Use {internal, print, T}.",
          "register(echo, Pid).",
          "link/1 in client."
        ],
        "solution": "-module(echo).\n-export([start/0, print/1, stop/0]).\nstart() -> register(echo, spawn(fun loop/0)), ok.\nprint(T) -> echo ! {internal, print, T}, ok.\nstop() -> echo ! internal_stop, ok.\nloop() -> receive\n  {internal, print, T} -> io:format(\"~p~n\",[T]), loop();\n  internal_stop -> ok end.",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      },
      {
        "id": "mock-1-scala",
        "track": "scala",
        "title": "Scala: Observer with stackable logging",
        "prompt": "Model a `Sensor` subject with attach/detach observers. Mix in `Logging` and `Audit` traits (stackable) so updates print audit trail. Demonstrate linearization order affects output. (~60 min)",
        "language": "scala",
        "rubric": [
          {
            "score": 0,
            "description": "No trait structure."
          },
          {
            "score": 4,
            "description": "Observer without stackable order."
          },
          {
            "score": 6,
            "description": "Working notify; logging partial."
          },
          {
            "score": 8,
            "description": "Stackable traits + demo of order."
          },
          {
            "score": 11,
            "description": "Clean design, typed observers, clear demo main."
          }
        ],
        "hints": [
          "Trait Sensor { observers: List[Observer] }",
          "override def notify",
          "new Sensor with Logging with Audit"
        ],
        "solution": "trait Observer { def update(msg: String): Unit }\ntrait Subject { def observers: scala.collection.mutable.Buffer[Observer]\n  def notify(msg: String): Unit = observers.foreach(_.update(msg)) }\ntrait Logging extends Subject { abstract override def notify(msg: String) = { println(s\"log:$msg\"); super.notify(msg) } }",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      }
    ]
  },
  {
    "id": "mock-2",
    "title": "Mock Exam B — Concurrency & Modules",
    "description": "Graph DFS, master-slave, matrix/OO (exam-style mix).",
    "durationHours": 4,
    "exercises": [
      {
        "id": "mock-2-ocaml",
        "track": "ocaml",
        "title": "OCaml: Social graph reachability",
        "prompt": "Define graph type over `'a` nodes, `neighbors`, and `reachable g src dst`. Use DFS. Include small test graph. (~50 min)",
        "language": "ocaml",
        "rubric": [
          {
            "score": 0,
            "description": "No graph model."
          },
          {
            "score": 4,
            "description": "Graph ok; search wrong on cycles."
          },
          {
            "score": 6,
            "description": "DFS works on DAG; visited mishandled."
          },
          {
            "score": 8,
            "description": "Correct on cyclic graphs."
          },
          {
            "score": 11,
            "description": "Clean API + tests + optional BFS comment."
          }
        ],
        "hints": [
          "Edges as (node*node) list.",
          "Maintain visited set."
        ],
        "solution": "type 'a graph = { edges : ('a * 'a) list }\nlet neighbors g v = List.filter_map (fun (a,b)-> if a=v then Some b else None) g.edges",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "mock-2-erlang",
        "track": "erlang",
        "title": "Erlang: Master-slave ms module",
        "prompt": "Implement `ms:start(N)` and `ms:to_slave(Msg, K)` with restart on `die`, trap_exit, numbered slaves. (~70 min)",
        "language": "erlang",
        "rubric": [
          {
            "score": 0,
            "description": "Not implemented."
          },
          {
            "score": 4,
            "description": "Slaves spawn without restart."
          },
          {
            "score": 6,
            "description": "Restart works; numbering bugs."
          },
          {
            "score": 8,
            "description": "Spec met with logging."
          },
          {
            "score": 11,
            "description": "Robust edge cases (bad index, already dead)."
          }
        ],
        "hints": [
          "process_flag(trap_exit, true).",
          "Slaves print non-die messages."
        ],
        "solution": "-module(ms).\n-export([start/1, to_slave/2]).\nstart(N) -> register(master, spawn(fun() -> master_loop(N) end)), ok.",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      },
      {
        "id": "mock-2-scala",
        "track": "scala",
        "title": "Scala: Matrix 1-norm and addition",
        "prompt": "Case class Matrix with + and * (int matrices), dimension checks, and `norm1`. (~60 min)",
        "language": "scala",
        "rubric": [
          {
            "score": 0,
            "description": "Empty."
          },
          {
            "score": 4,
            "description": "Partial operators."
          },
          {
            "score": 6,
            "description": "+ and norm mostly correct."
          },
          {
            "score": 8,
            "description": "+ * norm with exceptions."
          },
          {
            "score": 11,
            "description": "Complete per lab spec."
          }
        ],
        "hints": [
          "cols of A = rows of B for *.",
          "norm1: max column sum abs."
        ],
        "solution": "case class Matrix(rows: Vector[Vector[Int]]) {\n  def +(o: Matrix): Matrix = ??? // require same size\n  def norm1: Int = (0 until cols).map(c => rows.map(_(c)).map(math.abs).sum).max\n}",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      }
    ]
  },
  {
    "id": "mock-3",
    "title": "Mock Exam C — DSL & Distribution",
    "description": "Full exam simulation: modules, distributed store sketch, parser combinator DSL.",
    "durationHours": 4,
    "exercises": [
      {
        "id": "mock-3-ocaml",
        "track": "ocaml",
        "title": "OCaml: Functor stack for calculator",
        "prompt": "Signature STACK, module StackList, functor MakeEval(Stack) parsing polish expressions. (~70 min)",
        "language": "ocaml",
        "rubric": [
          {
            "score": 0,
            "description": "Missing."
          },
          {
            "score": 4,
            "description": "Stack only."
          },
          {
            "score": 6,
            "description": "Eval without functor."
          },
          {
            "score": 8,
            "description": "Functor works for one stack."
          },
          {
            "score": 11,
            "description": "Clean signatures, extension point."
          }
        ],
        "hints": [
          "Reuse lab1 ex7.",
          "Hide stack representation."
        ],
        "solution": "module type STACK = sig type 'a t val empty : 'a t val push : 'a -> 'a t -> 'a t val pop : 'a t -> ('a * 'a t) option end",
        "runInstructions": "# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog"
      },
      {
        "id": "mock-3-erlang",
        "track": "erlang",
        "title": "Erlang: Replicated tag store (2 nodes)",
        "prompt": "Design `store:put(Tag, Val)` and `store:get(Tag)` with updates to two registered replicas on one host; document remote-node pitfalls. (~70 min)",
        "language": "erlang",
        "rubric": [
          {
            "score": 0,
            "description": "No design."
          },
          {
            "score": 4,
            "description": "Single node dict only."
          },
          {
            "score": 6,
            "description": "Two processes; lookup random."
          },
          {
            "score": 8,
            "description": "Updates replicated; test generator sketched."
          },
          {
            "score": 11,
            "description": "Complete API + random ops test loop."
          }
        ],
        "hints": [
          "register(store1, Pid).",
          "cast to both on put."
        ],
        "solution": "-module(store).\n-export([put/2, get/1]).\nput(T,V) -> [Pid ! {put,T,V} || Pid <- replicas()], ok.",
        "runInstructions": "# erl\n# c(module).\n# module:function()."
      },
      {
        "id": "mock-3-scala",
        "track": "scala",
        "title": "Scala: Mini calculator combinator DSL",
        "prompt": "Parse lines `var = expr` and arithmetic with +,-,*,/, sin, cos; print result per line. (~80 min)",
        "language": "scala",
        "rubric": [
          {
            "score": 0,
            "description": "No parser."
          },
          {
            "score": 4,
            "description": "Eval without variables."
          },
          {
            "score": 6,
            "description": "Variables with bugs."
          },
          {
            "score": 8,
            "description": "Grammar + env for vars."
          },
          {
            "score": 11,
            "description": "Combinator solution with error messages."
          }
        ],
        "hints": [
          "Map[String, Double] env.",
          "Assignment line special case."
        ],
        "solution": "import scala.util.parsing.combinator._\nobject LinesParser extends RegexParsers { /* def stmt, def expr */ }",
        "runInstructions": "# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution"
      }
    ]
  }
];
