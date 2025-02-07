import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<AllCombinations<''>, ''>>,
    Expect<Equal<AllCombinations<'A'>, '' | 'A'>>,
    Expect<Equal<AllCombinations<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
    Expect<Equal<AllCombinations<'ABC'>, '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'>>,
    Expect<Equal<AllCombinations<'ABCD'>, '' | 'A' | 'B' | 'C' | 'D' | 'AB' | 'AC' | 'AD' | 'BA' | 'BC' | 'BD' | 'CA' | 'CB' | 'CD' | 'DA' | 'DB' | 'DC' | 'ABC' | 'ABD' | 'ACB' | 'ACD' | 'ADB' | 'ADC' | 'BAC' | 'BAD' | 'BCA' | 'BCD' | 'BDA' | 'BDC' | 'CAB' | 'CAD' | 'CBA' | 'CBD' | 'CDA' | 'CDB' | 'DAB' | 'DAC' | 'DBA' | 'DBC' | 'DCA' | 'DCB' | 'ABCD' | 'ABDC' | 'ACBD' | 'ACDB' | 'ADBC' | 'ADCB' | 'BACD' | 'BADC' | 'BCAD' | 'BCDA' | 'BDAC' | 'BDCA' | 'CABD' | 'CADB' | 'CBAD' | 'CBDA' | 'CDAB' | 'CDBA' | 'DABC' | 'DACB' | 'DBAC' | 'DBCA' | 'DCAB' | 'DCBA'>>,
  ]

type StringToUnion<S extends string> = S extends `${infer F}${infer R}` 
? F | StringToUnion<R>
: never

type ArrayToString<A> = A extends [infer F, ...infer R]
? `${string &F}${ArrayToString<R>}`
: ''

type Comb<C, path extends any[] = [], ans = never,  A = C> = [C] extends [never]
? ans | ArrayToString<path>
: C extends any
  ? Comb<Exclude<A, C>,  [...path, C], ans | ArrayToString<path>>
  : never

type AllCombinations<S extends string> = Comb<StringToUnion<S>>


type SU = StringToUnion<'AB'>
type AU = ArrayToString<['']>
type test = Comb<StringToUnion<'AB'>>
type test1 = AllCombinations<'AB'>

// type Com<U, path extends unknown[] = [], acc = never, A = U> = [U] extends [never]
// ? ArrayToString<acc | path>
// : U extends any
//   ? Com<Exclude<A, U>, [...path, U], acc | path>
//   : never

// type AllCombinations<S> = Com<StringToUnion<S>>
