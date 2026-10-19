# ML in Action: Graph DFS

Graph algorithms on exams test whether you can model state with immutable data, avoid hidden mutation, and implement DFS/BFS cleanly—often on adjacency lists. This lesson walks through depth-first search in OCaml, the same logic you would adapt for connectivity, cycle detection, or topological sort follow-ups.

## Representing graphs

An **adjacency list** maps each vertex to its neighbors. Vertices can be integers or any comparable type.

```ocaml
module IntSet = Set.Make (Int)

type graph = IntSet.t IntMap.t

let empty =
  List.fold_left
    (fun g v -> IntMap.add v IntSet.empty g)
    IntMap.empty [0; 1; 2; 3]

let add_edge g u v =
  let neigh = IntMap.find u g |> IntSet.add v in
  IntMap.add u neigh g

(* Undirected edge: add both directions *)
let add_undirected g u v = add_edge (add_edge g u v) v u
```

> [!TIP] Use the stdlib functor graph
> `Map.Make` / `Set.Make` give log-time operations; for tiny exam graphs, `int list` neighbors also work—state complexity expectations on the rubric.

## DFS with a visited set

Depth-first search explores as far as possible before backtracking. With immutable sets, “mark visited” means passing a new set:

```ocaml
let rec dfs g v visited =
  if IntSet.mem v visited then visited
  else
    let visited = IntSet.add v visited in
    let neigh = IntMap.find v g in
    IntSet.fold
      (fun u acc -> dfs g u acc)
      neigh visited

let dfs_all g start = dfs g start IntSet.empty
```

For **pre-order listing** of visit order, accumulate a list:

```ocaml
let rec dfs_order g v (visited, order) =
  if IntSet.mem v visited then (visited, order)
  else
    let visited = IntSet.add v visited in
    let order = v :: order in
    IntMap.find v g
    |> IntSet.fold (fun u acc -> dfs_order g u acc) (visited, order)

let traverse g start =
  dfs_order g start (IntSet.empty, []) |> snd |> List.rev
```

Expected on a path graph `0—1—2`: start at `0` yields `[0; 1; 2]` (depending on neighbor iteration order).

> [!WARNING] Neighbor order
> `Set` iteration is ascending; exam traces must match the stated order. If the question uses unsorted lists, sort or follow the given adjacency list order.

## Detecting cycles in directed graphs

DFS with a **recursion stack** (gray set) detects back edges:

```ocaml
let has_cycle g =
  let rec visit v (visited, stack) =
    if IntSet.mem v stack then true
    else if IntSet.mem v visited then false
    else
      let stack = IntSet.add v stack in
      let visited = IntSet.add v visited in
      let neigh = IntMap.find v g in
      IntSet.exists (fun u -> visit u (visited, stack)) neigh
  in
  IntMap.fold (fun v _ acc -> acc || visit v (IntSet.empty, IntSet.empty)) g false
```

## BFS contrast (one paragraph, often asked)

Breadth-first search uses a queue for shortest **unweighted** paths:

```ocaml
let bfs g start target =
  let rec loop q visited =
    match Queue.take_opt q with
    | None -> None
    | Some v ->
        if v = target then Some v
        else if IntSet.mem v visited then loop q visited
        else (
          let visited = IntSet.add v visited in
          IntMap.find v g |> IntSet.iter (fun u -> Queue.add u q);
          loop q visited)
  in
  let q = Queue.create () in
  Queue.add start q;
  loop q IntSet.empty
```

| Algorithm | Structure | Use on exam |
|-----------|-----------|-------------|
| DFS | stack / recursion | components, cycles, topo |
| BFS | queue | shortest path (unweighted) |

## End-to-end example

```ocaml
let example () =
  let g = empty |> add_undirected 0 1 |> add_undirected 1 2 in
  traverse g 0
(* [0; 1; 2] if neighbors sorted *)
```

> [!EXAM] Connected components
> Loop all vertices; run DFS from each unvisited node; increment component count. Write pseudocode in three lines—examiners reward clear structure over clever hacks.

## Common pitfalls and exam traps

- **Mutating** a global visited array when the course forbids impurity—use `Set`/`Map` threading.
- Forgetting **isolated vertices** in `IntMap` keys when building `empty`.
- Directed vs **undirected** edge duplication—one edge vs two directed edges.
- Infinite loops when **re-visiting** without checking `visited` before recursion.

> [!RECAP] Cheat sheet
> - Adjacency list: `vertex -> neighbors`
> - DFS: recurse on neighbors; thread visited set
> - Cycle: track stack (directed) or parent (undirected)
> - BFS: queue for layer-by-layer exploration

## Further reading

- [Real World OCaml — Maps and sets](https://dev.realworldocaml.org/maps-and-hashtables.html)
- [OCaml.org — Map / Set modules](https://ocaml.org/api/Map.html)
- [Learn You Some Erlang — Graphs (ETS + processes)](https://learnyousomeerlang.com) — different concurrency model
- [Scala docs — Collections](https://docs.scala-lang.org/overviews/collections-2.13/overview.html)
