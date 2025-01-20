import { Equal, Expect } from "../test-utils";

type cases = [
    Expect<Equal<First<[3, 2, 1]>, 3>>,
    Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
    Expect<Equal<First<[]>, never>>,
    Expect<Equal<First<[undefined]>, undefined>>,
  ]
  
  type errors = [
    // @ts-expect-error
    First<'notArray'>,
    // @ts-expect-error
    First<{ 0: 'arrayLike' }>,
  ]

  type First<T extends unknown[]> = T extends [infer F, ...infer R] ? F : never