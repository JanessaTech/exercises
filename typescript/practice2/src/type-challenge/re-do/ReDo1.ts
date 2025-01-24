import {Expect, Equal, Alike, NotEqual} from "../test-utils";

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]

type Inlcude<L, E> = L extends [infer F, ...infer R]
? Equal<E, F> extends true
  ? true
  : Inlcude<R, E>
: false

type Without<T, U, acc extends unknown[]= [], filter = U extends unknown[] ? U : [U]> = T extends [infer F, ...infer R]
? Inlcude<filter, F> extends true
  ? Without<R, U, acc>
  : Without<R, U, [...acc, F]>
: acc