/** Per-lesson exam-style drills (3–4 each). Imported by generate-content.mjs */

const runOcaml = `# utop or ocaml\n# Paste your solution, or: ocamlc -o prog main.ml && ./prog`;
const runErlang = `# erl\n# c(module).\n# module:function().`;
const runScala = `# scala-cli run solution.scala\n# or: scalac Solution.scala && scala Solution`;

function ex(id, title, prompt, starterCode, language, hints, solution, runInstructions) {
  return { id, title, prompt, starterCode, language, hints, solution, runInstructions };
}

export const exercisesByLesson = {
  "ocaml-01": [
    ex("ocaml-01-e1", "List length", "Write `length : 'a list -> int` without `List.length`.", "let length lst =\n  (* TODO *)\n", "ocaml", ["Empty → 0.", "Peel head with pattern match."], "let rec length = function [] -> 0 | _ :: t -> 1 + length t", runOcaml),
    ex("ocaml-01-e2", "Tail-recursive sum", "Write `sum : int list -> int` using tail recursion.", "let sum lst =\n  (* TODO *)\n", "ocaml", ["Inner `go acc` helper.", "Last call must be `go`."], "let sum lst =\n  let rec go acc = function [] -> acc | h :: t -> go (acc + h) t in\n  go 0 lst", runOcaml),
    ex("ocaml-01-e3", "Hanoi moves", "Write `hanoi n : int` returning the number of moves for `n` disks (classic recurrence).", "let hanoi n =\n  (* TODO *)\n", "ocaml", ["Base: 0 disks → 0 moves.", "Recurrence: 2 * hanoi (n-1) + 1."], "let rec hanoi = function 0 -> 0 | n -> 2 * hanoi (n - 1) + 1", runOcaml),
    ex("ocaml-01-e4", "Curried add", "Write `add : int -> int -> int` and use it as `List.map (add 10) [1;2;3]` → `[11;12;13]`.", "let add x y = (* TODO *)\nlet bump10 = (* partial application *)\n", "ocaml", ["`add` is two-arg function.", "`add 10` is `fun y -> add 10 y`."], "let add x y = x + y\nlet bump10 = add 10", runOcaml),
  ],
  "ocaml-02": [
    ex("ocaml-02-e1", "Variant conversion", "Given `type temp = C of float | F of float`, write `to_celsius : temp -> float`.", "type temp = C of float | F of float\nlet to_celsius = function\n  (* TODO *)\n", "ocaml", ["C stays.", "F uses (f -. 32.) *. 5. /. 9."], "let to_celsius = function C c -> c | F f -> (f -. 32.) *. 5. /. 9.", runOcaml),
    ex("ocaml-02-e2", "Record update", "Define `{name; age}` person and `birthday p` incrementing age.", "type person = { name : string; age : int }\nlet birthday p = (* TODO *)\n", "ocaml", ["Use `{ p with age = p.age + 1 }`."], "let birthday p = { p with age = p.age + 1 }", runOcaml),
    ex("ocaml-02-e3", "List append", "Implement `append : 'a list -> 'a list -> 'a list` without `@`.", "let rec append l1 l2 =\n  (* TODO *)\n", "ocaml", ["[] ++ l2 = l2.", "Head preserved in order."], "let rec append l1 l2 = match l1 with [] -> l2 | h :: t -> h :: append t l2", runOcaml),
    ex("ocaml-02-e4", "Option safe head", "Write `head : 'a list -> 'a option`.", "let head = function\n  (* TODO *)\n", "ocaml", ["[] → None.", "h :: _ → Some h."], "let head = function [] -> None | h :: _ -> Some h", runOcaml),
  ],
  "ocaml-03": [
    ex("ocaml-03-e1", "Stack signature", "Fill in `STACK` signature for int stack with push/pop.", "module type STACK = sig\n  type 'a t\n  val empty : 'a t\n  val push : 'a -> 'a t -> 'a t\n  val pop : 'a t -> ('a * 'a t) option\nend\n", "ocaml", ["Already a template — implement module below."], "module IntStack = struct\n  type 'a t = 'a list\n  let empty = []\n  let push x s = x :: s\n  let pop = function [] -> None | h :: t -> Some (h, t)\nend", runOcaml),
    ex("ocaml-03-e2", "Abstract type", "Why can't clients of `STACK` build `1 :: empty` if `t` is abstract?", "(* Explain in comment, then implement MakeListStack *)\n", "ocaml", ["Representation hidden outside module."], "(* Clients only use push/pop — cannot pattern-match hidden list *)", runOcaml),
    ex("ocaml-03-e3", "Functor map", "Sketch `MakeMap (Ord : ORD)` storing `'a list` per key — just `empty` and `add`.", "module type ORD = sig type t val compare : t -> t -> int end\nmodule MakeMap (Ord : ORD) = struct\n  (* TODO *)\nend\n", "ocaml", ["Use association list or Map if allowed.", "Exam: show functor header + type."], "module MakeMap (Ord : ORD) = struct\n  type 'a t = (Ord.t * 'a) list\n  let empty = []\n  let add k v m = (k, v) :: m\nend", runOcaml),
    ex("ocaml-03-e4", "Include vs open", "Write two lines: `include` Stack in Calculator module vs `open Stack`. Comment trade-off.", "(* TODO *)\n", "ocaml", ["include merges module type into current scope."], "(* include adds definitions; open only brings names unqualified *)", runOcaml),
  ],
  "ocaml-04": [
    ex("ocaml-04-e1", "Polymorphic id", "Give the principal type of `let id x = x` and `let pair x y = (x, y)`.", "let id x = x\nlet pair x y = (x, y)\n", "ocaml", ["Generalize with 'a, 'b."], "(* id : 'a -> 'a ; pair : 'a -> 'b -> 'a * 'b *)", runOcaml),
    ex("ocaml-04-e2", "Polymorphic queue", "Type `'a queue` as `{ front; rear }` lists — write `enqueue` and `dequeue`.", "type 'a queue = { front : 'a list; rear : 'a list }\nlet empty = { front = []; rear = [] }\n", "ocaml", ["Amortized: push rear, pop front.", "Reverse front when empty."], "let enqueue x q = { q with rear = x :: q.rear }\nlet dequeue q = match q.front with h :: t -> Some (h, { q with front = t }) | [] -> (match List.rev q.rear with h :: t -> Some (h, { front = t; rear = [] }) | [] -> None)", runOcaml),
    ex("ocaml-04-e3", "Weak typing trap", "Why might `let v = ref []` break when you `v := [1]; v := [true]`?", "(* answer in comment *)\n", "ocaml", ["First use fixes 'a ref for monomorphism."], "(* 'a becomes int list after first assignment; bool list fails *)", runOcaml),
    ex("ocaml-04-e4", "Polymorphic map", "Write `map : ('a -> 'b) -> 'a list -> 'b list`.", "let rec map f = function\n  (* TODO *)\n", "ocaml", ["Same structure as length."], "let rec map f = function [] -> [] | h :: t -> f h :: map f t", runOcaml),
  ],
  "ocaml-05": [
    ex("ocaml-05-e1", "fold_left sum", "Compute sum with `List.fold_left` without `+` in recursive call on list spine.", "let sum = List.fold_left (fun acc x -> acc + x) 0\n", "ocaml", ["Starter given — predict `[1;2;3]`."], "let sum = List.fold_left (fun acc x -> acc + x) 0", runOcaml),
    ex("ocaml-05-e2", "filter positive", "Write `positive : int list -> int list` with `filter` or recursion.", "let positive lst = (* TODO *)\n", "ocaml", ["Keep x when x > 0."], "let positive = List.filter (fun x -> x > 0)", runOcaml),
    ex("ocaml-05-e3", "Compose", "Write `compose f g x = f (g x)` and use on `List.map (compose ((+) 1) (( * ) 2)) [0;1;2]`.", "let compose f g x = (* TODO *)\n", "ocaml", ["Order: g then f."], "let compose f g x = f (g x)", runOcaml),
    ex("ocaml-05-e4", "fold_right vs left", "Explain difference in one comment; eval `fold_left (-) 0 [1;2;3]` vs `fold_right (-) [1;2;3] 0`.", "(* TODO *)\n", "ocaml", ["Left: (((0-1)-2)-3).", "Right: (1-(2-(3-0)))."], "(* -6 vs 2 *)", runOcaml),
  ],
  "ocaml-06": [
    ex("ocaml-06-e1", "Neighbors", "Given adjacency `('a * 'a) list`, write `neighbors g v`.", "let neighbors edges v =\n  (* TODO *)\n", "ocaml", ["Filter pairs where fst = v.", "Map snd."], "let neighbors edges v = List.map snd (List.filter (fun (a, _) -> a = v) edges)", runOcaml),
    ex("ocaml-06-e2", "DFS reachability", "Write `reachable edges start target` returning bool.", "let rec reachable edges start target =\n  (* TODO *)\n", "ocaml", ["Maintain visited list.", "Base: start = target."], "let rec visit seen v =\n  if v = target then true\n  else if List.mem v seen then false\n  else List.exists (fun n -> visit (v :: seen) n) (neighbors edges v)\nin visit [] start", runOcaml),
    ex("ocaml-06-e3", "BFS sketch", "Write `bfs` using a queue type (list as queue OK) for shortest path length.", "let bfs edges start target = (* TODO: return int option depth *)\n", "ocaml", ["Layer-by-layer.", "Track distance in queue entries."], "(* exam sketch: queue of (node, dist) *)", runOcaml),
    ex("ocaml-06-e4", "Cycle detect", "Return true if directed graph has a cycle (DFS with recursion stack).", "let has_cycle edges = (* TODO *)\n", "ocaml", ["Back edge in DFS."], "(* standard three-color DFS *)", runOcaml),
  ],
  "erlang-07": [
    ex("erlang-07-e1", "Sum list", "Implement `sum/1` recursively.", "sum([]) -> 0;\nsum([H|T]) -> (* TODO *).\n", "erlang", ["Classic list recursion."], "sum([]) -> 0;\nsum([H|T]) -> H + sum(T).", runErlang),
    ex("erlang-07-e2", "Comprehension", "Write `doubled_evens(Ls)` using list comprehension.", "doubled_evens(Ls) ->\n  (* TODO *).\n", "erlang", ["`[F(X) || X <- Ls, Guard]`."], "doubled_evens(Ls) -> [2*X || X <- Ls, is_integer(X), X rem 2 =:= 0].", runErlang),
    ex("erlang-07-e3", "Pattern match", "Function `grade/1` mapping 90+ → excellent, 70+ → good, _ → study.", "grade(Score) when is_integer(Score) ->\n  (* TODO *).\n", "erlang", ["Separate clauses + guards."], "grade(S) when S >= 90 -> excellent;\ngrade(S) when S >= 70 -> good;\ngrade(_) -> study.", runErlang),
    ex("erlang-07-e4", "Atoms vs tuples", "Predict: `{ok, 42} = {ok, X}.` and `{error, bad} = {ok, X}.` outcomes.", "(* comment answers *)\n", "erlang", ["Match must succeed.", "Second throws badmatch."], "(* X=42 ; second raises badmatch *)", runErlang),
  ],
  "erlang-08": [
    ex("erlang-08-e1", "Echo process", "Write `echo_loop/0` replying `{ok, Msg}` to `{echo, From, Msg}`.", "echo_loop() ->\n  receive\n    (* TODO *)\n  end.\n", "erlang", ["Reply then loop.", "From ! {ok, Msg}."], "echo_loop() ->\n  receive\n    {echo, From, Msg} -> From ! {ok, Msg}, echo_loop()\n  end.", runErlang),
    ex("erlang-08-e2", "Spawn", "Spawn echo and send one message from shell (comment steps).", "(* TODO: shell commands as comments *)\n", "erlang", ["Pid = spawn(fun echo_loop/0).", "Pid ! {echo, self(), hi}."], "(* Pid=spawn(...), Pid!{echo,self(),hi}, receive {ok,M}->M end. *)", runErlang),
    ex("erlang-08-e3", "Register", "Register server as `my_echo` and send via atom.", "register(my_echo, spawn(fun echo_loop/0)).\n", "erlang", ["Use name instead of Pid."], "my_echo ! {echo, self(), hello}.", runErlang),
    ex("erlang-08-e4", "Compare OCaml", "In one comment: Erlang process vs OCaml thread — message passing vs shared memory.", "(* TODO *)\n", "erlang", ["Erlang: no shared mutable state between processes."], "(* Erlang isolates heap per process; sync via messages *)", runErlang),
  ],
  "erlang-09": [
    ex("erlang-09-e1", "Link", "Spawn worker linked to self; worker exits with `exit(normal)` — what does parent receive?", "(* TODO comment *)\n", "erlang", ["Link is bidirectional signal."], "(* {'EXIT', Pid, normal} unless trapping *)", runErlang),
    ex("erlang-09-e2", "trap_exit", "Set `trap_exit true` and handle `{'EXIT', Pid, Reason}` in loop.", "master_loop() ->\n  process_flag(trap_exit, true),\n  receive\n    (* TODO *)\n  end.\n", "erlang", ["Convert exit to message."], "master_loop() ->\n  process_flag(trap_exit, true),\n  receive\n    {'EXIT', P, R} -> io:format(\"~p ~p~n\", [P, R]), master_loop()\n  end.", runErlang),
    ex("erlang-09-e3", "Monitor", "Monitor a pid and print DOWN reason.", "watch(Pid) ->\n  Ref = monitor(process, Pid),\n  receive\n    (* TODO *)\n  end.\n", "erlang", ["{'DOWN', Ref, process, Pid, Reason}."], "watch(Pid) ->\n  Ref = monitor(process, Pid),\n  receive {'DOWN', Ref, process, Pid, R} -> io:format(\"~p~n\", [R]) end.", runErlang),
    ex("erlang-09-e4", "Restart sketch", "Pseudocode master restarting worker on `{worker, crash}`.", "(* TODO *)\n", "erlang", ["Spawn new worker on DOWN."], "(* on DOWN -> spawn new worker, link again *)", runErlang),
  ],
  "erlang-10": [
    ex("erlang-10-e1", "Cookie", "Why must nodes share cookie? One sentence.", "(* TODO *)\n", "erlang", ["Cluster security."], "(* Prevents random nodes joining the cluster *)", runErlang),
    ex("erlang-10-e2", "rpc:call", "Write rpc call to `lists:reverse([1,2,3])` on `node2@host`.", "(* TODO *)\n", "erlang", ["rpc:call(Node, Mod, Fun, Args)."], "rpc:call('node2@host', lists, reverse, [[1,2,3]]).", runErlang),
    ex("erlang-10-e3", "Remote spawn", "Comment steps to spawn fun on remote node.", "(* TODO *)\n", "erlang", ["spawn(Node, Fun)."], "(* net_kernel:start, spawn('r@h', fun()->ok end) *)", runErlang),
    ex("erlang-10-e4", "Replication", "Put to two registered replicas — sketch message protocol.", "put(Key, Val) ->\n  (* TODO *)\n.", "erlang", ["Cast to both.", "Get from either."], "put(K,V) -> [R ! {put,K,V} || R <- [store1, store2]], ok.", runErlang),
  ],
  "erlang-11": [
    ex("erlang-11-e1", "Client message", "Define record `#chat{user, text}` and send to server.", "(* TODO types + send *)\n", "erlang", ["Server receives {chat, From, Rec}."], "-record(chat, {user, text}).\nserver ! {chat, self(), #chat{user=u, text=t}}.", runErlang),
    ex("erlang-11-e2", "Broadcast", "Server loop forwarding message to all Pids in list.", "server_loop(Members) ->\n  receive\n    (* TODO *)\n  end.\n", "erlang", ["lists:foreach to send."], "server_loop(Ms) ->\n  receive\n    {chat, From, Msg} -> [P ! {msg, From, Msg} || P <- Ms, P =/= From], server_loop(Ms)\n  end.", runErlang),
    ex("erlang-11-e3", "Register", "Register chat server and join with `{join, self()}`.", "(* TODO *)\n", "erlang", ["Stable name for clients."], "register(chat_srv, spawn(fun() -> server_loop([]) end)).", runErlang),
    ex("erlang-11-e4", "Architecture", "List four process roles in IRC-lite in comments.", "(* TODO *)\n", "erlang", ["Client, controller, server, group mgr."], "(* client, chat_controller, chat_server, group_manager *)", runErlang),
  ],
  "scala-12": [
    ex("scala-12-e1", "Case class", "Define `case class Point(x: Int, y: Int)` and `origin`.", "case class Point(x: Int, y: Int)\nval origin = (* TODO *)\n", "scala", ["Automatic apply/unapply."], "val origin = Point(0, 0)", runScala),
    ex("scala-12-e2", "Option", "Write `safeDiv(a: Int, b: Int): Option[Double]`.", "def safeDiv(a: Int, b: Int): Option[Double] = ???\n", "scala", ["b=0 → None."], "def safeDiv(a: Int, b: Int): Option[Double] = if (b == 0) None else Some(a.toDouble / b)", runScala),
    ex("scala-12-e3", "Match expr", "Sealed `Expr` with Num and Add — eval with pattern match.", "sealed trait Expr\ncase class Num(n: Int) extends Expr\ncase class Add(a: Expr, b: Expr) extends Expr\ndef eval: Expr => Int = ???\n", "scala", ["Recursive on Add."], "def eval: Expr => Int = { case Num(n) => n; case Add(a,b) => eval(a)+eval(b) }", runScala),
    ex("scala-12-e4", "For-comprehension", "Rewrite `for (x <- List(1,2); y <- List(10)) yield x+y`.", "val r = (* TODO *)\n", "scala", ["Cartesian product.", "Result length 2."], "val r = List(1,2).flatMap(x => List(10).map(y => x+y))", runScala),
  ],
  "scala-13": [
    ex("scala-13-e1", "Trait mixin", "Trait `Timestamped` overriding `toString` with prefix.", "trait Timestamped { self =>\n  abstract override def toString: String = s\"[@${System.currentTimeMillis}] ${super.toString}\"\n}\n", "scala", ["Need parent with toString."], "class Item(val n: Int) extends AnyRef { override def toString = s\"Item($n)\" }", runScala),
    ex("scala-13-e2", "Stackable", "Order `new Core with Audit with Log` — which `start()` runs?", "(* comment *)\n", "scala", ["Linearization rightmost first."], "(* Log.start calls super → Audit → Core *)", runScala),
    ex("scala-13-e3", "Observer", "Sketch `Subject` with `attach` and `notify`.", "trait Observer { def update(): Unit }\nclass Subject {\n  // TODO\n}\n", "scala", ["List of observers."], "private var obs = List.empty[Observer]\ndef attach(o: Observer) = obs = o :: obs\ndef notify() = obs.foreach(_.update())", runScala),
    ex("scala-13-e4", "vs Java interface", "One sentence: Scala trait with concrete method vs Java 8 default.", "(* TODO *)\n", "scala", ["Linearization vs single inheritance."], "(* Scala resolves diamond with linearization; Java class wins over interface default *)", runScala),
  ],
  "scala-14": [
    ex("scala-14-e1", "Linearization", "Predict `greet` for `class D extends A with B with C` each defining greet.", "(* TODO *)\n", "scala", ["Rightmost trait wins."], "(* C.greet if all override same *)", runScala),
    ex("scala-14-e2", "override", "Add `override` to fix compile error in trait stack.", "trait A { def n = 1 }\ntrait B extends A { override def n = 2 }\n", "scala", ["Concrete override needs keyword."], "trait B extends A { override def n = 2 }", runScala),
    ex("scala-14-e3", "Companion", "Object `Matrix` factory `zeros(rows, cols)`.", "class Matrix private (val rows: Int, val cols: Int)\nobject Matrix {\n  def zeros(r: Int, c: Int): Matrix = ???\n}\n", "scala", ["Private ctor + factory on companion."], "def zeros(r: Int, c: Int) = new Matrix(r, c)", runScala),
    ex("scala-14-e4", "Abstract type", "Trait with `type Elem` and `def zero: Elem`.", "trait Monoid {\n  type Elem\n  def zero: Elem\n  def combine(a: Elem, b: Elem): Elem\n}\n", "scala", ["Hide concrete type."], "object IntAdd extends Monoid { type Elem = Int; def zero = 0; def combine(a,b)=a+b }", runScala),
  ],
  "scala-15": [
    ex("scala-15-e1", "Fluent builder", "Method chaining `grid.row(1,2).row(3,4).build()`.", "class Grid { def row(ns: Int*): Grid = this; def build(): Unit = () }\n", "scala", ["Return this."], "class Grid { def row(ns: Int*): Grid = { /* add */ this }; def build() = () }", runScala),
    ex("scala-15-e2", "Implicit (sketch)", "Comment when implicit conversion helps DSL syntax.", "(* TODO *)\n", "scala", ["Wrap Int in Lit(_)."], "(* implicit def intToLit(n:Int)=Lit(n) enables 1 + 2 in DSL *)", runScala),
    ex("scala-15-e3", "Internal vs external", "Compare SQL string DSL vs Scala-embedded payroll DSL.", "(* TODO *)\n", "scala", ["Internal = typechecked host syntax."], "(* external parsed at runtime; internal uses Scala types *)", runScala),
    ex("scala-15-e4", "By-name", "Use by-name param for `repeat(n)(body)`.", "def repeat(n: Int)(body: => Unit): Unit = ???\n", "scala", ["Evaluate body each iteration."], "def repeat(n: Int)(body: => Unit) = for (_ <- 1 to n) body", runScala),
  ],
  "scala-16": [
    ex("scala-16-e1", "Regex parser", "Parser `digits` for one or more digits as Int.", "import scala.util.parsing.combinator._\nobject P extends RegexParsers {\n  def digits: Parser[Int] = ???\n}\n", "scala", ["\"\"\"\\d+\"\"\".r ^^ (_.toInt)"], "def digits: Parser[Int] = \"\"\"\\d+\"\"\".r ^^ (_.toInt)", runScala),
    ex("scala-16-e2", "Sequence", "Parse two ints separated by comma: `pair`.", "def pair: Parser[(Int,Int)] = ???\n", "scala", ["Use ~ operator."], "def pair: Parser[(Int,Int)] = digits ~ \",\" ~ digits ^^ { case a ~ _ ~ b => (a,b) }", runScala),
    ex("scala-16-e3", "Eval AST", "Given `sealed trait E; case class Num(n:Int); case class Add(a:E,b:E)`, write eval.", "def eval(e: E): Int = ???\n", "scala", ["Match like OCaml."], "def eval(e: E): Int = e match { case Num(n)=>n; case Add(a,b)=>eval(a)+eval(b) }", runScala),
    ex("scala-16-e4", "Payroll line", "Sketch grammar for `name = expr` assignment line.", "def stmt: Parser[???] = ???\n", "scala", ["ident ~ \"=\" ~ expr."], "def ident: Parser[String] = \"\"\"\\w+\"\"\".r", runScala),
  ],
};
