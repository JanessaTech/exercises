import { Equal, Expect } from "../test-utils"


type cases = [
  Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobar', 'bag', 'foo'>, 'foobar'>>,
  Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
  Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
  Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
  Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
  Expect<Equal<ReplaceAll<'', '', ''>, ''>>,
]


type test = ReplaceAll<'foobar', 'bar', 'foo'>

type ReplaceAll<S extends string, From extends string, To extends string, acc extends string= ''> = From extends ''
? S
: S extends ''
  ? acc
  : S extends `${infer L}${From}${infer R}`
    ? ReplaceAll<R, From, To, `${acc}${L}${To}`>
    : ReplaceAll<'', From, To, `${acc}${S}`>