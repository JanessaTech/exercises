import { Equal, Expect } from "../test-utils"

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

  type DropChar<S, C, acc extends string = ''> = S extends `${infer F}${infer R}`
  ? F extends C
    ? DropChar<R, C, acc>
    : DropChar<R, C, `${acc}${F}`>
  : acc

//   type DropChar<T, S> = T extends `${infer F}${infer R}`
// ? F extends S
//   ? DropChar<R, S>
//   : `${F}${DropChar<R, S>}`
// : 