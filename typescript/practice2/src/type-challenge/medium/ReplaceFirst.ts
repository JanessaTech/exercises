import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<ReplaceFirst<[1, 2, 3], 3, 4>, [1, 2, 4]>>,
    Expect<Equal<ReplaceFirst<['A', 'B', 'C'], 'C', 'D'>, ['A', 'B', 'D']>>,
    Expect<Equal<ReplaceFirst<[true, true, true], true, false>, [false, true, true]>>,
    Expect<Equal<ReplaceFirst<[string, boolean, number], boolean, string>, [string, string, number]>>,
    Expect<Equal<ReplaceFirst<[1, 'two', 3], string, 2>, [1, 2, 3]>>,
    Expect<Equal<ReplaceFirst<['six', 'eight', 'ten'], 'eleven', 'twelve'>, ['six', 'eight', 'ten']>>,
  ]

type ReplaceFirst<T, S, D, acc extends unknown[] = []> = T extends [infer F, ...infer R] 
? F extends S
  ? ReplaceFirst<[], S, D, [...acc, D, ...R]>
  : ReplaceFirst<R, S, D, [...acc, F]>
: acc

