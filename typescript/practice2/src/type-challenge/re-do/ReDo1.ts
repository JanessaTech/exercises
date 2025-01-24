import {Expect, Equal, Alike, NotEqual} from "../test-utils";

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]

type Zip<T, U, acc extends unknown[] = []> = T extends [infer T1, ...infer TR]
? U extends [infer U1, ...infer UR]
  ? Zip<TR, UR, [...acc, [T1, U1]]>
  : acc
: acc


// type Zip<T, U, acc extends unknown[] = []> = [T, U] extends [[infer T1, ...infer TR], [infer U1, ...infer UR]]
// ? Zip<TR, UR, [...acc, [T1, U1]]>
// : acc