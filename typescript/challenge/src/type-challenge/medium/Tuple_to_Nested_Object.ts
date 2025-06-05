import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
    Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
    Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
    Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
  ]

type TupleToNestedObject<T extends unknown[], U> = T extends [infer F extends string, ... infer R]
? {[P in F]: TupleToNestedObject<R, U>}
: U