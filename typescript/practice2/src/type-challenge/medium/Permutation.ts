import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<Permutation<'A'>, ['A']>>,
    Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
    Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
    Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
    Expect<Equal<Permutation<never>, []>>,
  ]

  type Permutation<A, acc = never, path extends unknown[] = [], T = A> = [T] extends [never]
  ? path['length'] extends 0
    ? []
    : acc | path
  : T extends any
    ? Permutation<Exclude<A, T>, acc, [...path, T]>
    : never


// type Merge<E, T extends unknown[]> = T extends any
// ? [E, ...T]
// : never

// type Permutation<T, all = T> = [T] extends [never]
// ? []
// : T extends any
//   ? Merge<T, Permutation<Exclude<all, T>>>
//   : never