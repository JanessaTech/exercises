import { Equal, Expect } from "../test-utils"


type cases = [
    Expect<Equal<Trim<'str'>, 'str'>>,
    Expect<Equal<Trim<' str'>, 'str'>>,
    Expect<Equal<Trim<'     str'>, 'str'>>,
    Expect<Equal<Trim<'str   '>, 'str'>>,
    Expect<Equal<Trim<'     str     '>, 'str'>>,
    Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
    Expect<Equal<Trim<''>, ''>>,
    Expect<Equal<Trim<' \n\t '>, ''>>,
  ]
type TrimLeft<T extends string> = T extends `${' ' | '\n' | '\t'}${infer rest}`
? TrimLeft<rest>
: T

type TrimRight<T extends string> = T extends `${infer rest}${' ' | '\n' | '\t'}`
? TrimRight<rest>
: T

type Trim<T extends string> = TrimRight<TrimLeft<T>>