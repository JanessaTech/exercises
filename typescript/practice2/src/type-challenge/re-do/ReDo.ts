import { Alike, Expect, Equal, NotEqual } from "../test-utils";

type cases = [
  Expect<Equal<Trunc<0.1>, '0'>>,
  Expect<Equal<Trunc<0.2>, '0'>>,
  Expect<Equal<Trunc<1.234>, '1'>>,
  Expect<Equal<Trunc<12.345>, '12'>>,
  Expect<Equal<Trunc<-5.1>, '-5'>>,
  Expect<Equal<Trunc<'.3'>, '0'>>,
  Expect<Equal<Trunc<'1.234'>, '1'>>,
  Expect<Equal<Trunc<'-.3'>, '-0'>>,
  Expect<Equal<Trunc<'-10.234'>, '-10'>>,
  Expect<Equal<Trunc<10>, '10'>>,
]


type Trunc<T extends string | number> = `${T}` extends `${infer left}.${infer right}`
? left extends `-${infer rest}`
  ? rest extends ''
   ? '-0'
   : `-${rest}`
  : left extends ''
    ? '0'
    : left
: `${T}`

type test = Trunc<'.3'>
