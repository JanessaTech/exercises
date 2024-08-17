import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<Last<[2]>, 2>>,
    Expect<Equal<Last<[3, 2, 1]>, 1>>,
    Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
  ]

type Last<T extends unknown[]> = T extends [infer F, ...infer R]
? R extends []
  ? F
  : Last<R>
: never