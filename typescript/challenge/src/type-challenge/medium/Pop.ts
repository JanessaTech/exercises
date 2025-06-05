import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
    Expect<Equal<Pop<['a', 'b', 'c', 'd']>, ['a', 'b', 'c']>>,
    Expect<Equal<Pop<[]>, []>>,
  ]

type Pop<L extends unknown[]> = L extends [...infer F, infer L]
? F
: []