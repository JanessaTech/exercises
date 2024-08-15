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

type Chunk<T, N, acc extends unknown[] = [], TMP extends unknown[] = []> = T extends [infer first, ... infer rest]
? TMP['length'] extends N
  ? Chunk<[first, ...rest], N, [...acc, TMP], []>
  : Chunk<rest, N, acc, [...TMP, first]>
: TMP extends []
  ? acc
  : [...acc, TMP]
