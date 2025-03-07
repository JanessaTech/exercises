import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
    Expect<Equal<If<false, 'a', 2>, 2>>,
    Expect<Equal<If<boolean, 'a', 2>, 'a' | 2>>,
  ]
  
  // @ts-expect-error
  type error = If<null, 'a', 'b'>

  type If<C extends boolean, T, F> = C extends true
  ? T
  : C extends false
    ? F
    : T | F