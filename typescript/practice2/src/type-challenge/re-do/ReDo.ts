import { Alike, Expect, Equal, NotEqual } from "../test-utils";

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]

type ToArray<T> = T extends `${infer F}${infer R}`
? [F , ...ToArray<R>]
: []
type Test = ToArray<''>

type LengthOfString<S extends string> = ToArray<S>['length']





