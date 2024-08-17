import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
    Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
    Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
    Expect<Equal<LastIndexOf<[string, 2, number, 'a', number, 1], number>, 4>>,
    Expect<Equal<LastIndexOf<[string, any, 1, number, 'a', any, 1], any>, 5>>,
  ]

  type LastIndexOf<T extends unknown[], target extends number, CUR extends number = 0, RES extends number = -1> = T extends [infer F, ...infer R]
  ? F extends target 
   ? never
   : never
  : RES