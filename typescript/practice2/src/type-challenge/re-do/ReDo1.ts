import {Expect, Equal, Alike, NotEqual, ExpectExtends} from "../test-utils";

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>,
  Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>,
]

type Push<T extends unknown[], U> = [...T, U]