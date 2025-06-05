import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<Unshift<[], 1>, [1]>>,
    Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
    Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>,
  ]

  type Unshift<L extends any[], E> = [E, ...L]