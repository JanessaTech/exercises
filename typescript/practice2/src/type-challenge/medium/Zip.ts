import { Equal, Expect} from "../test-utils"

type cases = [
    Expect<Equal<Zip<[], []>, []>>,
    Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
    Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
    Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
    Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
  ]

type Zip<T, U, acc extends unknown[] = []> = T extends [infer T_First, ...infer T_Rest]
? U extends [infer U_First, ...infer U_Rest]
  ? Zip<T_Rest, U_Rest, [...acc, [T_First, U_First]]>
  : acc
: acc