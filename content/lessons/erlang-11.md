# Erlang in Action: IRC-lite

Building a minimal IRC-like chat exercises **many-to-one registration**, **broadcast**, and **selective receive**—the same patterns OTP hides behind gen_server but exams want you to write by hand. This lesson designs a single room server and clients that join, post, and leave.

## Architecture

One **room process** holds the set of client pids. Clients send `{join, Nick}` to register and `{say, Text}` to broadcast. The server never shares state with clients except via messages.

```erlang
-module(irc_lite).
-export([start/0, client/1]).

start() ->
    register(irc_room, spawn(fun room/0)),
    ok.

room() ->
    room_loop(sets:new()).

room_loop(Clients) ->
    receive
        {join, Pid, Nick} ->
            Pid ! {ok, joined},
            room_loop(sets:add_element(Pid, Clients));
        {say, Pid, Text} ->
            broadcast(Clients, {msg, Pid, Text}),
            room_loop(Clients);
        {leave, Pid} ->
            room_loop(sets:del_element(Pid, Clients))
    end.

broadcast(Clients, Msg) ->
    sets:fold(fun (C) -> C ! Msg end, ok, Clients).
```

> [!TIP] Nicknames vs pids
> Store `{Pid, Nick}` in a dict if the exam requires display names; pids uniquely identify clients on one node.

## Client loop

```erlang
client(Nick) ->
    irc_room ! {join, self(), Nick},
    receive {ok, joined} -> ok end,
    client_loop(Nick).

client_loop(Nick) ->
    receive
        {msg, From, Text} ->
            io:format("[~s] ~p says: ~s~n", [Nick, From, Text]),
            client_loop(Nick);
        {say, Text} ->
            irc_room ! {say, self(), Text},
            client_loop(Nick)
    end.
```

External UI can `Pid ! {say, "hello"}` to inject messages.

> [!WARNING] Dead clients
> Production servers use `monitor` on clients and remove pids on `{'DOWN', …}`. Exam bonus: mention monitors when asked about reliability.

## Testing in the shell

```erlang
1> irc_lite:start().
ok
2> C1 = spawn(fun () -> irc_lite:client("alice") end).
3> C2 = spawn(fun () -> irc_lite:client("bob") end).
4> C1 ! {say, "hi room"}.
```

Expected: both client loops print a line with `hi room` (modulo interleaving).

## Multiple rooms (extension)

Register `irc_room_ch1`, `irc_room_ch2`, or pass **RoomPid** to clients instead of a global atom—exam follow-up: compare **atom registration** vs **pid argument** for scalability.

| Design | Pros | Cons |
|--------|------|------|
| Global name | easy demo | single bottleneck |
| Pid per room | multi-channel | clients need discovery |
| gen_server | OTP standards | more boilerplate |

> [!EXAM] Message protocol
> Examiners score a clear table: `{join, Pid, Nick}`, `{say, Pid, Text}`, `{msg, From, Text}`. Ambiguous atoms lose marks.

## Cross-language note

OCaml would use a single thread or Lwt/async for chat; Scala might use Akka `Broadcast`. Erlang’s natural fit is **one process per room + one per client**.

## Graceful shutdown (written exam variant)

Extend the protocol with `{shutdown, From}` handled only by the room owner:

```erlang
room_loop(Clients) ->
    receive
        shutdown ->
            sets:fold(fun (C) -> C ! room_closed end, ok, Clients);
        ...
    end.
```

Clients exit their loop on `room_closed`. This shows **broadcast control messages** distinct from user chat—often one mark in LP oral exams.

| Aspect | Erlang IRC-lite | Typical OCaml | Scala Akka |
|--------|-----------------|---------------|------------|
| State location | room process | server value | actor mailbox |
| Broadcast | fold over set | map over subscribers | `Broadcast` message |

## Common pitfalls and exam traps

- **Forgotten join** — client sends `{say, …}` before server tracks pid.
- Broadcasting to **including sender** — clarify spec; IRC often shows echo to sender.
- Using **list of pids** without removing dead pids — memory leak in long-running questions.
- Race: two `{join, same_pid, …}` — last wins; mention idempotency if asked.

> [!RECAP] Cheat sheet
> - One server process owns client set
> - Clients: join → loop with receive
> - Broadcast = fold/send to all members
> - Monitors for cleanup (bonus)

## Further reading

- [Learn You Some Erlang — Clients and servers](https://learnyousomeerlang.com/clients-and-servers)
- [Erlang — gen_server behaviour](https://www.erlang.org/doc/man/gen_server.html)
- [Learn You Some Erlang — OTP supervisors](https://learnyousomeerlang.com/what-is-otp)
- [Real World OCaml — Concurrent programming (comparison)](https://dev.realworldocaml.org/concurrent-programming.html)
