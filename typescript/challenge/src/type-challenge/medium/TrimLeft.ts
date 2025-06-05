import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<TrimLeft<'str'>, 'str'>>,
    Expect<Equal<TrimLeft<' str'>, 'str'>>,
    Expect<Equal<TrimLeft<'     str'>, 'str'>>,
    Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
    Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
    Expect<Equal<TrimLeft<''>, ''>>,
    Expect<Equal<TrimLeft<' \n\t'>, ''>>,
  ]

  type TrimLeft<T extends string> = T extends `${' ' | '\n' | '\t'}${infer rest}`
  ? TrimLeft<rest>
  : T