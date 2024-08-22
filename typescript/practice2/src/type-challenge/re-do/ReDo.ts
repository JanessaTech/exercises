import { Alike, Expect, Equal, NotEqual } from "../test-utils";

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]

type Zip<T, U> = [T, U] extends [[infer T1, ...infer T2], [infer U1, ...infer U2]]
? [[T1, U1], ...Zip<T2, U2>]
: []


