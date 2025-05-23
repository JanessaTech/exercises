import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
    Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
    Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
    Expect<Equal<Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>, [string, number, 1, 'a', 2, 'b']>>,
    Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>,
  ]

type Unique<T, acc extends unknown[]= []> = T extends [infer F, ... infer R]
? Include<acc, F> extends true
  ? Unique<R, acc>
  : Unique<R, [...acc,F]>
: acc

type Include<T extends unknown[], U> = T extends [infer F, ... infer R]
? Equal<F, U> extends true
  ? true
  : Include<R, U>
: false

//type Unique<T> = any