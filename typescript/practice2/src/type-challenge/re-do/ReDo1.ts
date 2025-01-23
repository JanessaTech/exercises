import {Expect, Equal, Alike, NotEqual} from "../test-utils";






type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd']>, ['a', 'b', 'c']>>,
  Expect<Equal<Pop<[]>, []>>,
]

type Pop<T extends any[]> = T extends [...infer R, infer L]
? R
: []