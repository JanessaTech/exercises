import { Equal, Expect } from "../test-utils"

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
type Tr<T extends string> = T extends `${infer rest}${'.'}${any}`
? rest extends '-'
  ? '-0'
  : rest extends ''
    ? '0'
    : rest
: T


//type Trunc<T extends string> = any

type Trunc<T extends number | string> = Tr<`${T}`>


// type Trunc<T extends string | number> = `${T}` extends `${infer left}.${infer right}`
// ? left extends `-${infer rest}`
//   ? rest extends ''
//    ? '-0'
//    : `-${rest}`
//   : left extends ''
//     ? '0'
//     : left
// : `${T}`


// type Trunc<T extends string | number> = `${T}` extends `${infer L}${'.'}${infer R}`
// ? Trunc<L>
// : `${T}` extends `${'-'}${infer R}`
//   ?  R extends ''
//     ? '-0'
//     : `-${R}`
//   : `${T}` extends ''
//     ? '0'
//     : `${T}`


// type Trunc<T extends string | number> = `${T}` extends `${infer L}${'.'}${infer R}`
// ? L extends '-'
//   ? '-0'
//   : L extends ''
//     ? '0'
//     : L
// : `${T}`