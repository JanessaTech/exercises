import { Alike, Expect, Equal, NotEqual, ExpectExtends } from "../test-utils";

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

type Diff<O, O1> = {
  [K in keyof (O & O1) as Exclude<K, keyof(O | O1)>] : (O & O1)[K]
}

