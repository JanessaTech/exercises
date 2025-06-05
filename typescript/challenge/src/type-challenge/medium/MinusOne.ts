import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<MinusOne<1>, 0>>,
    Expect<Equal<MinusOne<55>, 54>>,
    Expect<Equal<MinusOne<3>, 2>>,
    Expect<Equal<MinusOne<100>, 99>>,
    Expect<Equal<MinusOne<1101>, 1100>>,
    Expect<Equal<MinusOne<0>, -1>>,
    Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
  ]

  
  type Tupe<L extends number, R extends unknown[] = []> = L extends R['length']
  ? R
  : Tupe<L, [...R, unknown]>
  type Test = Tupe<0>['length']

  type MinusOne<T extends number> = Tupe<T> extends [...infer R, infer end] 
  ? R['length']
  : -1

 