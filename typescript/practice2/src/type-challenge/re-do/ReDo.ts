import { Alike, Expect, Equal, NotEqual, ExpectExtends } from "../test-utils";

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<'butter fly!', ''>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', '!'>, 'butter fly'>>,
  Expect<Equal<DropChar<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
]

type DropChar<S extends string, C extends string, acc extends string = ''> =  C extends ''
? S
: S extends ''
  ? acc
  : S extends `${infer L}${C}${infer R}`
    ? DropChar<R, C, `${acc}${L}`>
    : DropChar<'', C, `${acc}${S}`>