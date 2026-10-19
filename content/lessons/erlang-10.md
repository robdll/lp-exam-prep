# Distribution

Distributed Erlang treats remote nodes as an extension of the local runtime: processes have global names (pids can be remote), and messages cross the network with the same `!` and `receive` syntax—when security and connectivity allow. Exams focus on node naming, cookies, RPC patterns, and failure modes (network partitions), not full Kubernetes deployment.

## Nodes and cookies

Start two nodes in shells:

```bash
erl -sname alpha
erl -sname beta
```

Connect in the REPL:

```erlang
net_adm:ping('beta@host').
%% pong | pang
```

Nodes sharing a **cookie** (secret atom) may connect:

```bash
erl -sname alpha -setcookie lp_exam_secret
```

> [!TIP] Atom node names
> `-sname` gives short names (`alpha@Host`); `-name` gives fully qualified names for DNS environments. Exam snippets usually use short names.

## Remote spawn and messaging

Once connected, pids from remote nodes are opaque but sendable:

```erlang
RemotePid = spawn('beta@host', fun () -> io:format("remote~n") end),
RemotePid ! hello.
```

Register on one node, message from another:

```erlang
register(global_counter, spawn(fun counter_loop/0)),
global_counter ! {inc, self()}.
```

For real clusters, **`global`** module registers names cluster-wide—know the idea even if you implement simple ping-pong on two nodes.

## RPC and `rpc:call/4`

Blocking remote procedure call:

```erlang
rpc:call('beta@host', lists, reverse, [[1,2,3]]).
%% [3,2,1]
```

Contrast with asynchronous `spawn` + message reply—exams ask tradeoffs: **latency**, **failure detection**, **timeouts**.

> [!WARNING] Partial failure
> Remote process may be unreachable; `rpc:call` can hang unless you use `rpc:call(Node, M, F, A, Timeout)` or monitors. Partition → processes may appear alive incorrectly (split-brain)—conceptual question only at LP level.

## Distribution vs local actors

| Concern | Local | Distributed |
|---------|-------|-------------|
| Latency | microseconds | milliseconds+ |
| Failure | exit signals | network + exit |
| Pid equality | exact | includes node |
| Security | n/a | cookie, TLS (advanced) |

## Simple distributed task sketch

```erlang
%% On coordinator node
Workers = [spawn(Node, fun worker/0) || Node <- NodeList],
lists:foreach(fun (W) -> W ! {task, Data} end, Workers),
collect(length(Workers), []).
```

`collect` receives `{result, Pid, Value}` messages—pattern for map-reduce oral exams.

> [!EXAM] Transparency
> “Is message passing location-transparent?” — Mostly yes syntactically (`Pid ! Msg`), but you must **know** if `Pid` is remote for performance and failure handling. No automatic shared memory.

## Network partitions (conceptual)

When nodes split, each side may continue independently. CAP-style questions: Erlang favors **availability** within a cluster partition at the cost of consistency unless you add external coordination (Mnesia, Raft—usually not detailed on LP exams).

## Hidden local node name

Your own node appears in `node()`:

```erlang
node().   %% 'alpha@myhost'
self().  %% local pid, e.g. <0.44.0>
```

Remote pids look like `<9034.44.0>`—the first number identifies the node. Exam sketches: given two pids, state whether `node(Pid1) =:= node(Pid2)`.

## Comparison table (LP triplet)

| Feature | Erlang distribution | OCaml | Scala |
|---------|----------------------|-------|-------|
| Remote processes | built-in | not in language | Akka remoting, gRPC |
| Serialization | ETF terms | N/A | Java serialization / JSON |
| Fault isolation | per-node VM | single OS process | JVM, optional actors |

## Common pitfalls and exam traps

- Forgetting **matching cookies** → `pang` on ping.
- Assuming **local pid** after node restart—pids are not durable identifiers.
- Using **`spawn` remote** without module loaded on remote node—code must exist on all nodes (or use OTP release).
- Blocking **`rpc:call`** without timeout in exam design scenarios.

> [!RECAP] Cheat sheet
> - `-sname` / `-name` start nodes
> - `net_adm:ping/1` connectivity
> - Remote `spawn`, `!`, `receive` same syntax
> - `rpc:call` for synchronous remote M:F(A)

## Further reading

- [Learn You Some Erlang — Distributed OTP applications](https://learnyousomeerlang.org/distribunomicon)
- [Erlang — Distributed Erlang](https://www.erlang.org/doc/reference_manual/distributed.html)
- [Erlang/OTP — net_adm, rpc](https://www.erlang.org/doc/man/net_adm.html)
- [Scala docs — Parallel collections / Akka (overview)](https://docs.scala-lang.org/overviews/scala-book/concurrency.html)
