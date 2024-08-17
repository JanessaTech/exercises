import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<LengthOfString<''>, 0>>,
    Expect<Equal<LengthOfString<'kumiko'>, 6>>,
    Expect<Equal<LengthOfString<'reina'>, 5>>,
    Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
  ]

type LengthOfString<T extends string, A extends unknown[] = []> = T extends `${infer F}${infer R}`
? LengthOfString<R, [...A, F]>
: A['length']