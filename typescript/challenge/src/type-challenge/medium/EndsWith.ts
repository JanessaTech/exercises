import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<EndsWith<'abc', 'bc'>, true>>,
    Expect<Equal<EndsWith<'abc', 'abc'>, true>>,
    Expect<Equal<EndsWith<'abc', 'd'>, false>>,
    Expect<Equal<EndsWith<'abc', 'ac'>, false>>,
    Expect<Equal<EndsWith<'abc', ''>, true>>,
    Expect<Equal<EndsWith<'abc', ' '>, false>>,
  ]

  type EndsWith<T extends string, U extends string> = T extends `${any}${U}`
  ? true
  : false