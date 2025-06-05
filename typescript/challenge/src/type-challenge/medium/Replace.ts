import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
    Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
    Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
    Expect<Equal<Replace<'foobarbar', 'bar', ''>, 'foobar'>>,
    Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
    Expect<Equal<Replace<'', '', ''>, ''>>,
  ]

  type Replace<T, S extends string, D extends string> = S extends ''
  ? T
  : T extends `${infer left}${S}${infer right}`
    ? `${left}${D}${right}`
    : T