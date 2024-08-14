import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<CheckRepeatedTuple<[number, number, string, boolean]>, true>>,
    Expect<Equal<CheckRepeatedTuple<[number, string]>, false>>,
    Expect<Equal<CheckRepeatedTuple<[1, 2, 3]>, false>>,
    Expect<Equal<CheckRepeatedTuple<[1, 2, 1]>, true>>,
    Expect<Equal<CheckRepeatedTuple<[]>, false>>,
    Expect<Equal<CheckRepeatedTuple<string[]>, false>>,
  ]

type CheckRepeatedTuple<T extends unknown[]> = T extends [infer F, ... infer L]
? F extends L[number]
  ? true
  : CheckRepeatedTuple<L>
: false