import { Equal, Expect } from "../test-utils"

type cases = [
  Expect<Equal<CheckRepeatedTuple<[number, number, string, boolean]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[number, string]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 3]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 1]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[]>, false>>,
  Expect<Equal<CheckRepeatedTuple<string[]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[number, 1, string, '1', boolean, true, false, unknown, any]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[never, any, never]>, true>>,
]

type Include<E, L> = L extends [infer F, ...infer R]
? Equal<E, F> extends true
  ? true
  : Include<E, R>
: false

type CheckRepeatedTuple<T extends unknown[]> = T extends [infer F, ...infer R]
? Include<F, R> extends true
  ? true
  : CheckRepeatedTuple<R>
: false