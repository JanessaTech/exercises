import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<EndsWith<'abc', 'bc'>, true>>,
    Expect<Equal<EndsWith<'abc', 'abc'>, true>>,
    Expect<Equal<EndsWith<'abc', 'd'>, false>>,
    Expect<Equal<EndsWith<'abc', 'ac'>, false>>,
    Expect<Equal<EndsWith<'abc', ''>, true>>,
    Expect<Equal<EndsWith<'abc', ' '>, false>>,
  ]

  type EndsWith<T extends string, U extends string, acc extends string = ''> = U extends ''
  ? true
  : T extends `${infer rest}${infer end}`
    ? end extends ''
        ? `${rest}${acc}` extends U ? true : false
        : `${end}${acc}` extends U ? true : EndsWith<rest, U, `${end}${acc}`>
    : never