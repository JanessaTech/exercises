import { Alike, Expect, Equal, NotEqual, ExpectExtends } from "../test-utils";


type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]


type UPPERCASE = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'G' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
type KebabCase<T extends string, acc extends string = ''> = T extends ''
? acc
: T extends `${infer F}${infer R}`
  ? F extends UPPERCASE
    ? acc extends ''
      ? KebabCase<R, Lowercase<F>>
      : KebabCase<R, `${acc}-${Lowercase<F>}`>
    : KebabCase<R, `${acc}${F}`>
  : never