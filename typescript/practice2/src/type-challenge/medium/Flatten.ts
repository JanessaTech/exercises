import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<Flatten<[]>, []>>,
    Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
    Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
    Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
    Expect<Equal<Flatten<[{ foo: 'bar', 2: 10 }, 'foobar']>, [{ foo: 'bar', 2: 10 }, 'foobar']>>,
  ]
  
  // @ts-expect-error
  type error = Flatten<'1'>

  type Flatten<T extends unknown[], acc extends unknown[] = []> = T extends [infer F, ...infer R]
  ? F extends unknown[]
    ? Flatten<R, [...acc, ...Flatten<F, []>]>
    : Flatten<R, [...acc, F]>
  : acc

  // type Flatten<T extends unknown[]> = T extends [infer F, ... infer E]
  // ? F extends unknown[]
  //   ? [...Flatten<F>, ...Flatten<E>]
  //   : [F, ...Flatten<E>]
  // : []