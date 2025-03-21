import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<Chunk<[], 1>, []>>,
    Expect<Equal<Chunk<[1], 1>, [[1]]>>,
    Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
    Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
    Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
    Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
    Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
  ]

  type Chunk<T extends unknown[], N, acc extends unknown[] = [], sub extends unknown[] = []> = T extends [infer F, ...infer R]
  ? sub['length'] extends N
    ? Chunk<R, N, [...acc, sub], [F]>
    : Chunk<R, N, acc, [...sub, F]>
  : sub extends []
    ? acc
    : [...acc, sub]
