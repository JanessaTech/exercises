import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
    Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
    Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
    Expect<Equal<Join<['o'], 'u'>, 'o'>>,
    Expect<Equal<Join<[], 'u'>, ''>>,
    Expect<Equal<Join<['1', '1', '1']>, '1,1,1'>>,
  ]

  type Join<T extends unknown[], U extends string | number = ',', acc extends string = ''> = T extends [infer F extends string, ...infer R]
  ? Join<R, U, `${acc}${F}${R extends [] ? '' : U}`>
  : acc

//   type Join<T, U extends string | number = ','> = T extends [infer F extends string, ... infer R]
// ? R extends []
//   ? F
//   : `${F}${U}${Join<R, U>}`
// :

// type Join<T, U extends string | number = ',', acc extends string = ''> = T extends [infer F extends string, ...infer R]
// ? R extends []
//   ? Join<R, U, `${acc}${F}`>
//   : Join<R, U, `${acc}${F}${U}`>
// : acc
