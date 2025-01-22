import {Expect, Equal, Alike, NotEqual} from "../test-utils";

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
]

type CreateArray<T extends number, R extends unknown[] = []> = T extends R['length']
? R
: CreateArray<T, [...R, unknown]>

type two = CreateArray<2>['length']

type MinusOne<T extends number> = CreateArray<T> extends [...infer R, infer L]
? R['length']
: never