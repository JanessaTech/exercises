import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<TrimRight<'str'>, 'str'>>,
    Expect<Equal<TrimRight<'str '>, 'str'>>,
    Expect<Equal<TrimRight<'str     '>, 'str'>>,
    Expect<Equal<TrimRight<'     str     '>, '     str'>>,
    Expect<Equal<TrimRight<'   foo bar  \n\t '>, '   foo bar'>>,
    Expect<Equal<TrimRight<''>, ''>>,
    Expect<Equal<TrimRight<'\n\t '>, ''>>,
  ]

type TrimRight<T extends string> = T extends `${infer rest}${' ' | '\t' | '\n'}`
? TrimRight<rest>
: T