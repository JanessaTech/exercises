import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
    Expect<Equal<TupleToUnion<[123]>, 123>>,
  ]

type TupleToUnion<T extends unknown[]> = T extends [infer F, ... infer R]
? F | TupleToUnion<R>
: never