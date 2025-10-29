import { Alike, Equal, Expect, ExpectExtends, NotAny } from "../test-utils"

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string, gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string, gender: number }>>,
]


type Diff<T, U> = {
  [K in keyof (T & U) as K extends keyof (T | U) ? never : K]: (T & U)[K]
}