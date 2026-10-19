# Error Handling

Erlang’s error model favors **explicit failure signals** and supervision instead of defensive try/catch everywhere. LP exams contrast `try/catch` (exception style), `exit/1`, `throw/1`, and **supervisor** restarts—plus the cultural rule: “let it crash” when state is unrecoverable.

## Exceptions: throw, error, exit

```erlang
try
    1 div 0
catch
    error:badarith -> io:format("math error~n")
end.
```

- **`error:Reason`** — faults (badmatch, function_clause)
- **`throw:Reason`** — non-local return, catchable
- **`exit:Reason`** — process termination signal

```erlang
throw({not_found, Key}).

fetch(Key, Dict) ->
    case dict:find(Key, Dict) of
        {ok, V} -> V;
        error -> throw({not_found, Key})
    end.
```

> [!TIP] Catch scope
> `catch` also catches exits in some contexts—read the question carefully. Production code prefers explicit `try … of … catch`.

## Let it crash

A worker with corrupt state should **die**; a supervisor spawns a fresh one. Exams ask *when* to recover locally vs escalate:

```erlang
worker_loop(State) ->
    receive
        {do, Work} ->
            NewState = safe_handle(Work, State),
            worker_loop(NewState);
        bad_msg ->
            exit(invalid_message)
    end.
```

Local `try` suits **transient external errors** (network blip); poisoned gen_state state → crash.

> [!WARNING] Catch-all clauses
> Hiding all errors with `_ -> ok` violates let-it-crash and loses exam marks for supervision design.

## Links, exits, and trapping

When a linked process exits, the peer receives `{'EXIT', Pid, Reason}` unless it traps exits:

```erlang
process_flag(trap_exit, true),
receive
    {'EXIT', Pid, Reason} -> cleanup(Pid, Reason)
end.
```

Supervisors use links to restart children with strategies `one_for_one`, `one_for_all`, etc. (conceptual level for LP).

| Signal | Typical source | Handler |
|--------|----------------|---------|
| `error` | badmatch, case | try/catch |
| `exit` | `exit(Pid, Reason)` | link/monitor |
| `throw` | user control flow | try/catch |

## gen_server-style errors (conceptual)

OTP behaviours wrap the receive loop:

```erlang
%% Pseudocode shape for exams
handle_call(Req, _From, State) ->
    case do_work(Req, State) of
        {ok, Reply, NewState} -> {reply, Reply, NewState};
        {error, Reason} -> {stop, Reason, State}
    end.
```

`{stop, Reason, State}` tells the supervisor to restart depending on intensity/frequency limits.

> [!EXAM] Match vs case vs try
> Written questions: “What happens if `function_clause` in a gen_server callback?” Answer: callback fails, generic server may terminate the process unless caught—know default behaviour.

## Comparison across languages

| Style | Erlang | OCaml | Scala |
|-------|--------|-------|-------|
| Primary | exit + supervisor | exceptions + types | exceptions + `Try` |
| Typed errors | optional specs | `result`, `option` | `Either`, `Try` |
| Process isolation | yes | no (single process) | optional actors |

## Practical pattern: result tuples

Non-exception style still appears:

```erlang
parse_int(String) ->
    case string:to_integer(String) of
        {Int, ""} -> {ok, Int};
        _ -> {error, not_an_integer}
    end.
```

Exams may ask to translate between `{ok, V} | {error, E}` and exceptions.

## Common pitfalls and exam traps

- Using **`exit(normal)`** thinking it is an error—it is a clean shutdown.
- **Catching all** in a supervisor child instead of failing fast.
- Confusing **`throw`** with **`exit`** across process boundaries—throws do not kill processes unless uncaught.
- Ignoring **supervision intensity**: too many restarts → supervisor dies.

> [!RECAP] Cheat sheet
> - try/catch for catchable errors in one process
> - exit + link for process death
> - let it crash + supervisor for recovery
> - `{ok,_}` / `{error,_}` for expected failures

## Further reading

- [Learn You Some Erlang — Errors and processes](https://learnyousomeerlang.com/errors-and-processes)
- [Erlang — Errors](https://www.erlang.org/doc/reference_manual/errors.html)
- [Real World OCaml — Error handling](https://dev.realworldocaml.org/error-handling.html)
- [Scala docs — Exception handling](https://docs.scala-lang.org/scala3/book/effective-programming.html)
