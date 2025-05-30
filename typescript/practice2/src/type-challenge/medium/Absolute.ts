import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<Absolute<0>, '0'>>,
    Expect<Equal<Absolute<-0>, '0'>>,
    Expect<Equal<Absolute<10>, '10'>>,
    Expect<Equal<Absolute<-5>, '5'>>,
    Expect<Equal<Absolute<'0'>, '0'>>,
    Expect<Equal<Absolute<'-0'>, '0'>>,
    Expect<Equal<Absolute<'10'>, '10'>>,
    Expect<Equal<Absolute<'-5'>, '5'>>,
    Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
    Expect<Equal<Absolute<9_999n>, '9999'>>,
  ]

type Absolute<T extends string | number | bigint> = `${T}` extends `-${infer N}` ? N : `${T}`

  type num = 1_000_000n
  type str = `${num}`

// type Absolute<T> = any