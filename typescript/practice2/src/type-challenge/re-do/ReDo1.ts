import {Expect, Equal, Alike, NotEqual, ExpectExtends} from "../test-utils";

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type First<T extends any[]> = T extends [infer F, ...infer R] ? F : never