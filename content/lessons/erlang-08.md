# Actors in Erlang

An Erlang **process** is an actor: it has private state, communicates only by asynchronous messages, and can spawn other actors. LP exams expect you to diagram mailboxes, explain selective receive, and implement small client/server loops without shared variables.

## Message passing basics

```erlang
send(Pid, Msg) -> ok.   %% syntax: Pid ! Msg

server_loop() ->
    receive
        {get, From} ->
            From ! {self(), 42},
            server_loop();
        stop ->
            ok
    end.

start() ->
    spawn(fun server_loop/0).
```

The server replies with `{self(), Value}` so the client knows which process answered.

> [!TIP] Always tag messages
> Use records or tagged tuples `{request, Id, Payload}` so multiple clients do not confuse replies.

## Spawn, register, and name lookup

```erlang
Pid = spawn(fun server_loop/0),
register(my_server, Pid),
my_server ! {get, self()}.
```

`register/2` fails if the name exists. For exams, distinguish **pid** (dynamic) vs **registered atom** (well-known).

## Selective receive and ordering

Messages queue in arrival order; **receive** scans for the first matching pattern:

```erlang
client(Pid) ->
    Pid ! {work, self()},
    receive
        {result, Data} -> Data
    after 1000 ->
        timeout
    end.
```

`after` adds a timeout (milliseconds). Starvation happens if a process only handles one message type—know the tradeoff.

> [!WARNING] Mailbox inspection
> You cannot peek the mailbox; design protocols so unexpected messages are logged or discarded explicitly.

## Links and monitors (failure signals)

**Links** are bidirectional: if one dies, the other gets an exit signal (unless trapping exits).

```erlang
link(Pid),
spawn(fun () -> exit(Pid, kill) end).
```

**Monitors** are unidirectional notifications:

```erlang
Ref = monitor(process, Pid),
receive
    {'DOWN', Ref, process, Pid, Reason} -> handle_down(Reason)
end.
```

| Mechanism | Direction | Typical exam question |
|-----------|-----------|------------------------|
| `link/1` | both ways | supervisor trees |
| `monitor/2` | observer only | wait for completion |
| `spawn_link` | start linked | fail together |

## Client/server template

```erlang
handle_request({add, A, B}, State) ->
    {A + B, State};
handle_request(stop, State) ->
    {stopped, State}.

loop(State) ->
    receive
        {From, Req} ->
            {Reply, NewState} = handle_request(Req, State),
            From ! Reply,
            loop(NewState)
    end.
```

State lives in the loop parameter—**no shared heap mutation** between processes.

> [!EXAM] Draw the sequence
> Client `!` request, server `receive`, server `!` reply, client `receive`. Examiners award marks for labeling pids and message shapes.

## Comparison with other LP languages

| Aspect | Erlang actors | OCaml | Scala |
|--------|---------------|-------|-------|
| Concurrency unit | process | (usually sequential) | thread / Future / Akka actor |
| Shared memory | avoided | single process | JVM shared heap |
| Failure | links, supervisors | exceptions | try/catch, supervision in Akka |

## Common pitfalls and exam traps

- Sending to **wrong pid** — no compile-time check; silent mailbox growth.
- **Deadlock** with synchronous RPC if both sides `receive` without sending.
- Forgetting **`!` is asynchronous** — sender does not block on handler completion unless you implement ack/reply.
- Using **global mutable ETS** when the question requires pure message passing.

> [!RECAP] Cheat sheet
> - `Pid ! Msg` send; `receive` match
> - Loop carries process state
> - `link` / `monitor` for failure
> - Tag messages; reply includes sender or ref

## Further reading

- [Learn You Some Erlang — The Hitchhiker's Guide to Concurrency](https://learnyousomeerlang.com/introduction)
- [Erlang — Processes documentation](https://www.erlang.org/doc/reference_manual/processes.html)
- [Learn You Some Erlang — Errors and processes](https://learnyousomeerlang.com/errors-and-processes)
- [Scala docs — Futures and parallelism](https://docs.scala-lang.org/overviews/scala-book/concurrency.html)
