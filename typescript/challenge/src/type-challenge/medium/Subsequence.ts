import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
    Expect<Equal<Subsequence<[1, 2, 3]>, [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3]>>,
    Expect<Equal<Subsequence<[1, 2, 3, 4, 5]>, [] |
    [1] | [2] | [3] | [4] | [5] |
    [1, 2] | [1, 3] | [1, 4] | [1, 5] | [2, 3] | [2, 4] | [2, 5] | [3, 4] | [3, 5] | [4, 5] |
    [1, 2, 3] | [1, 2, 4] | [1, 2, 5] | [1, 3, 4] | [1, 3, 5] | [1, 4, 5] | [2, 3, 4] | [2, 3, 5] | [2, 4, 5] | [3, 4, 5] |
    [1, 2, 3, 4] | [1, 2, 3, 5] | [1, 2, 4, 5] | [1, 3, 4, 5] | [2, 3, 4, 5] |
    [1, 2, 3, 4, 5] >>,
    Expect<Equal<Subsequence<['a', 'b', 'c']>, [] |
    ['a'] | ['b'] | ['c'] |
    ['a', 'b'] | ['a', 'c'] | ['b', 'c'] |
    ['a', 'b', 'c'] >>,
    Expect<Equal<Subsequence<['x', 'y']>, [] |
    ['x'] | ['y'] |
    ['x', 'y'] >>,
  ]


  type Merge<U extends unknown[], E> = U extends any
  ? [E, ...U]
  : never
  
  type Subsequence<T extends any[]> = T extends [infer F, ...infer R]
  ? Merge<Subsequence<R>, F> | Subsequence<R>
  : []

  //type Subsequence<T> = any
  
  type merge = Merge<[2] | [], 1>
