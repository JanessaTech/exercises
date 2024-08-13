import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
    Expect<Equal<If<false, 'a', 2>, 2>>,
    Expect<Equal<If<boolean, 'a', 2>, 'a' | 2>>,
  ]
  
  // @ts-expect-error
  type error = If<null, 'a', 'b'>

  type If<U extends boolean, V, M> = U extends true ? V : U extends false ? M : V | M