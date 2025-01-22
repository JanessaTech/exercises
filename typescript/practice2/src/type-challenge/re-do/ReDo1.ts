import {Expect, Equal, Alike, NotEqual} from "../test-utils";

type cases = [
  Expect<Equal<Last<[]>, never>>,
  Expect<Equal<Last<[2]>, 2>>,
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]

type Last<T extends any[]> = T extends [...infer R, infer L]
? L
: never

