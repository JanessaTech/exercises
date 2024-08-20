import { Equal, Expect} from "../test-utils"


type cases = [
    Expect<Equal<Without<[1, 2], 1>, [2]>>,
    Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
    Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
  ]

type Include<T, E> = T extends [infer F, ...infer R]
? F extends E  // F == E
    ? true
    : Include<R, E>
: false 

type Without<T extends unknown[], S, acc extends unknown[] = [], filter = S extends unknown[] ? S : [S]> = T extends [infer E, ...infer R]
? Include<filter, E> extends true
    ? Without<R, S, acc>
    : Without<R, S, [...acc, E]>
: acc 