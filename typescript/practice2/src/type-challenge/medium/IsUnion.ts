import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<IsUnion<string>, false>>,
    Expect<Equal<IsUnion<string | number>, true>>,
    Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
    Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
    Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
    Expect<Equal<IsUnion<{ a: string | number }>, false>>,
    Expect<Equal<IsUnion<[string | number]>, false>>,
    // Cases where T resolves to a non-union type.
    Expect<Equal<IsUnion<string | never>, false>>,
    Expect<Equal<IsUnion<string | unknown>, false>>,
    Expect<Equal<IsUnion<string | any>, false>>,
    Expect<Equal<IsUnion<string | 'a'>, false>>,
    Expect<Equal<IsUnion<never>, false>>,
  ]

type IsUnion<T, C = T> = [T] extends [never]
? false
: T extends any 
    ? [C] extends [T] 
        ? false 
        : true 
    : never

//type IsUnion<T> = any
