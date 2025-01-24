import {Expect, Equal, Alike, NotEqual} from "../test-utils";

type cases = [
  Expect<Equal<Reverse<[]>, []>>,
  Expect<Equal<Reverse<['a', 'b']>, ['b', 'a']>>,
  Expect<Equal<Reverse<['a', 'b', 'c']>, ['c', 'b', 'a']>>,
]

type errors = [
  // @ts-expect-error
  Reverse<'string'>,
  // @ts-expect-error
  Reverse<{ key: 'value' }>,
]

type Reverse<T extends unknown[], acc extends unknown[] = []> = T extends [infer F, ...infer R]
? Reverse<R, [F, ...acc]>
: acc
